import type { VercelRequest, VercelResponse } from '@vercel/node';

// Server-side proxy for OpenAI — keeps OPENAI_API_KEY out of the browser bundle.
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

    const data = await response.json();
    return res.status(response.status).json(data);
}
