import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Strip /api/groq prefix, forward the rest to Groq
    const groqPath = (req.url ?? '').replace(/^\/api\/groq/, '') || '/';
    const groqUrl = `https://api.groq.com${groqPath}`;

    const apiKey = process.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'VITE_GROQ_API_KEY is not set' });
    }

    const response = await fetch(groqUrl, {
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
