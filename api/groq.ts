import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAuthenticatedRequest } from '../src/server/apiShared';

export const config = { api: { bodyParser: false } };

const readRequestBody = async (req: VercelRequest, maxBytes: number): Promise<Buffer> => {
    const chunks: Buffer[] = [];
    let totalBytes = 0;
    for await (const chunk of req) {
        const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
        totalBytes += buffer.length;
        if (totalBytes > maxBytes) throw new RangeError('Request is too large');
        chunks.push(buffer);
    }
    return Buffer.concat(chunks);
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }
    if (!(await requireAuthenticatedRequest(req, res))) return;

    // Only expose the two Groq endpoints the app uses; never turn this into
    // an open proxy to arbitrary provider APIs.
    const groqPath = (req.url ?? '').replace(/^\/api\/groq/, '').split('?')[0] || '/';
    if (!['/openai/v1/chat/completions', '/openai/v1/audio/transcriptions'].includes(groqPath)) {
        return res.status(404).json({ error: 'Unsupported Groq endpoint' });
    }
    const groqUrl = `https://api.groq.com${groqPath}`;

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'GROQ_API_KEY is not set on the server' });
    }

    // The app only uses JSON completions and Whisper transcription. Reject any
    // other body/path pairing so the authenticated proxy cannot be repurposed.
    const contentType = String(req.headers['content-type'] || '');
    const isMultipart = contentType.includes('multipart/form-data');
    const isTranscription = groqPath === '/openai/v1/audio/transcriptions';
    if (isMultipart !== isTranscription || (!isMultipart && !contentType.includes('application/json'))) {
        return res.status(415).json({ error: 'Use JSON or multipart form data.' });
    }
    const contentLength = Number(req.headers['content-length'] ?? 0);
    const maxRequestSize = groqPath.endsWith('/audio/transcriptions') ? 4_000_000 : 1_000_000;
    if (contentLength > maxRequestSize) {
        return res.status(413).json({ error: 'Request is too large.' });
    }

    let rawBody: Buffer;
    try {
        rawBody = await readRequestBody(req, maxRequestSize);
    } catch (error) {
        if (error instanceof RangeError) return res.status(413).json({ error: 'Request is too large.' });
        return res.status(400).json({ error: 'The request body is invalid.' });
    }

    const headers: Record<string, string> = {
        'Authorization': `Bearer ${apiKey}`,
    };
    let body: BodyInit;
    if (isTranscription) {
        try {
            const incomingForm = await new Request('https://api.groq.com/', {
                method: 'POST', headers: { 'Content-Type': contentType }, body: rawBody,
            }).formData();
            const uploadedFile = incomingForm.get('file');
            const model = incomingForm.get('model');
            const language = incomingForm.get('language');
            const supportedLanguages = new Set(['fr', 'es', 'de', 'it', 'ja', 'pt', 'zh', 'en']);
            if (!(uploadedFile instanceof Blob) || uploadedFile.size < 1 || uploadedFile.size > 3_900_000
                || model !== 'whisper-large-v3-turbo'
                || (language !== null && (typeof language !== 'string' || !supportedLanguages.has(language)))) {
                return res.status(400).json({ error: 'Invalid audio transcription request.' });
            }
            const upstreamForm = new FormData();
            upstreamForm.append('file', uploadedFile, 'recording.webm');
            upstreamForm.set('model', 'whisper-large-v3-turbo');
            upstreamForm.set('response_format', 'json');
            if (typeof language === 'string') upstreamForm.set('language', language);
            body = upstreamForm;
        } catch {
            return res.status(400).json({ error: 'The audio upload is invalid.' });
        }
    } else {
        let payload: any;
        try { payload = JSON.parse(rawBody.toString('utf8')); }
        catch { return res.status(400).json({ error: 'The request body is invalid.' }); }

        const allowedModels = new Set(['qwen/qwen3.8-27b', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b']);
        const maxTokens = payload?.max_tokens;
        const messages = payload?.messages;
        const validMessages = Array.isArray(messages) && messages.length === 2
            && messages[0]?.role === 'system' && typeof messages[0]?.content === 'string'
            && messages[1]?.role === 'user' && typeof messages[1]?.content === 'string';
        if (!payload || typeof payload !== 'object' || !allowedModels.has(payload.model)
            || !Number.isInteger(maxTokens) || maxTokens < 1 || maxTokens > 8192
            || !validMessages || payload?.response_format?.type !== 'json_object'
            || typeof payload?.temperature !== 'number' || payload.temperature < 0 || payload.temperature > 1) {
            return res.status(400).json({ error: 'Invalid chat completion request.' });
        }
        const sanitized = {
            model: payload.model,
            temperature: payload.temperature,
            max_tokens: maxTokens,
            response_format: { type: 'json_object' },
            messages,
            ...(payload.model.startsWith('openai/gpt-oss') ? { reasoning_effort: 'low' } : {}),
        };
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(sanitized);
    }

    try {
        const response = await fetch(groqUrl, { method: 'POST', headers, body });
        const contentType = response.headers.get('content-type') || '';
        const responseBody = await response.text();
        res.setHeader('Content-Type', contentType || 'application/json');
        return res.status(response.status).send(responseBody);
    } catch (error) {
        console.error('[api/groq] Provider request failed:', error instanceof Error ? error.message : 'unknown error');
        return res.status(502).json({ error: 'The AI provider could not be reached.' });
    }
}
