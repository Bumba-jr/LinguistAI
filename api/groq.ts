import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Strip /api/groq prefix, forward the rest to Groq
    const groqPath = (req.url ?? '').replace(/^\/api\/groq/, '') || '/';
    const groqUrl = `https://api.groq.com${groqPath}`;

    const apiKey = process.env.VITE_GROQ_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'VITE_GROQ_API_KEY is not set' });
    }

    // Multipart (audio uploads for Whisper) must be forwarded as the raw body
    // with its original boundary — JSON.stringify would corrupt it.
    const contentType = String(req.headers['content-type'] || '');
    const isMultipart = contentType.includes('multipart/form-data');

    const headers: Record<string, string> = {
        'Authorization': `Bearer ${apiKey}`,
    };
    let body: any;
    if (isMultipart) {
        headers['Content-Type'] = contentType;
        // Vercel leaves unparsed content types as a Buffer on req.body
        body = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body as any);
    } else {
        headers['Content-Type'] = 'application/json';
        body = req.method !== 'GET' ? JSON.stringify(req.body) : undefined;
    }

    const response = await fetch(groqUrl, {
        method: req.method ?? 'POST',
        headers,
        body,
    });

    const data = await response.json();
    return res.status(response.status).json(data);
}
