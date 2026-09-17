import type { VercelRequest, VercelResponse } from '@vercel/node';

// Server-side proxy for OpenAI — keeps OPENAI_API_KEY out of the browser bundle.
// Handles both JSON APIs (chat) and binary responses (TTS audio).
export default async function handler(req: VercelRequest, res: VercelResponse) {
    const openaiPath = (req.url ?? '').replace(/^\/api\/openai/, '') || '/';
    const openaiUrl = `https://api.openai.com${openaiPath}`;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'OPENAI_API_KEY is not set on the server' });
    }

    const response = await fetch(openaiUrl, {
        method: req.method ?? 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
        // Binary payload (e.g. audio/mpeg from TTS) — stream it through untouched
        const buffer = await response.arrayBuffer();
        res.setHeader('Content-Type', contentType);
        return res.status(response.status).send(Buffer.from(buffer));
    }

    const data = await response.json();
    return res.status(response.status).json(data);
}
