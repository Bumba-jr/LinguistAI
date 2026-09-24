import type { VercelRequest, VercelResponse } from '@vercel/node';
import { requireAuthenticatedRequest } from '../src/server/apiShared';

// Server-side proxy for OpenAI — keeps OPENAI_API_KEY out of the browser bundle.
// Handles both JSON APIs (chat) and binary responses (TTS audio).
export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({ error: 'Method not allowed' });
    }
    const openaiPath = (req.url ?? '').replace(/^\/api\/openai/, '').split('?')[0] || '/';
    if (!['/v1/chat/completions', '/v1/audio/speech'].includes(openaiPath)) {
        return res.status(404).json({ error: 'Unsupported OpenAI endpoint' });
    }
    if (!(await requireAuthenticatedRequest(req, res, openaiPath === '/v1/audio/speech' ? 'tts' : 'ai'))) return;
    const contentLength = Number(req.headers['content-length'] ?? 0);
    let rawRequestBody: string;
    try { rawRequestBody = JSON.stringify(req.body ?? {}); }
    catch { return res.status(400).json({ error: 'The request body is invalid.' }); }
    if (contentLength > 1_000_000 || Buffer.byteLength(rawRequestBody, 'utf8') > 1_000_000) {
        return res.status(413).json({ error: 'Request is too large.' });
    }
    const openaiUrl = `https://api.openai.com${openaiPath}`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'OPENAI_API_KEY is not set on the server' });
    }

    let payload: any;
    try { payload = req.body; }
    catch { return res.status(400).json({ error: 'The request body is invalid.' }); }
    let upstreamBody: string;
    if (openaiPath === '/v1/chat/completions') {
        const messages = payload?.messages;
        const maxTokens = payload?.max_tokens;
        const validMessages = Array.isArray(messages) && messages.length === 2
            && messages[0]?.role === 'system' && typeof messages[0]?.content === 'string'
            && messages[1]?.role === 'user' && typeof messages[1]?.content === 'string';
        if (!payload || payload.model !== 'gpt-4o' || !validMessages
            || !Number.isInteger(maxTokens) || maxTokens < 1 || maxTokens > 2048
            || typeof payload.temperature !== 'number' || payload.temperature < 0 || payload.temperature > 1
            || payload.response_format?.type !== 'json_object') {
            return res.status(400).json({ error: 'Invalid chat completion request.' });
        }
        upstreamBody = JSON.stringify({
            model: 'gpt-4o',
            temperature: payload.temperature,
            max_tokens: maxTokens,
            response_format: { type: 'json_object' },
            messages,
        });
    } else {
        const allowedVoices = new Set(['alloy', 'ash', 'coral', 'echo', 'fable', 'nova', 'onyx', 'sage', 'shimmer']);
        if (!payload || payload.model !== 'gpt-4o-mini-tts'
            || typeof payload.input !== 'string' || !payload.input.trim() || payload.input.length > 4096
            || typeof payload.voice !== 'string' || !allowedVoices.has(payload.voice)
            || payload.response_format !== 'mp3'
            || typeof payload.instructions !== 'string' || payload.instructions.length > 500) {
            return res.status(400).json({ error: 'Invalid speech synthesis request.' });
        }
        upstreamBody = JSON.stringify({
            model: 'gpt-4o-mini-tts',
            input: payload.input,
            voice: payload.voice,
            response_format: 'mp3',
            instructions: payload.instructions,
        });
    }

    let response: Response;
    try {
        response = await fetch(openaiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: upstreamBody,
        });
    } catch (error) {
        console.error('[api/openai] Provider request failed:', error instanceof Error ? error.message : 'unknown error');
        return res.status(502).json({ error: 'The AI provider could not be reached.' });
    }

    const contentType = response.headers.get('content-type') || '';
    res.setHeader('Cache-Control', 'private, no-store');
    if (!contentType.includes('application/json')) {
        // Binary payload (e.g. audio/mpeg from TTS) — stream it through untouched
        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', contentType);
        return res.status(response.status).send(Buffer.from(buffer));
    }

    const data = await response.json();
    return res.status(response.status).json(data);
}
