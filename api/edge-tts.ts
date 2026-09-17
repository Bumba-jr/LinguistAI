import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

// Natural neural voices via Microsoft Edge's speech service — free, no API
// key, and covers every language the app supports (Groq's TTS only does
// English/Arabic). Audio is cacheable and identical requests hit the CDN.
const VOICES: Record<string, string> = {
    French: 'fr-FR-DeniseNeural',
    Spanish: 'es-ES-ElviraNeural',
    German: 'de-DE-KatjaNeural',
    Italian: 'it-IT-ElsaNeural',
    Japanese: 'ja-JP-NanamiNeural',
    Portuguese: 'pt-PT-RaquelNeural',
    Chinese: 'zh-CN-XiaoxiaoNeural',
    English: 'en-US-JennyNeural',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const isGet = req.method === 'GET';
    const text = String((isGet ? req.query.text : req.body?.text) ?? '');
    const lang = String((isGet ? req.query.lang : req.body?.lang) ?? 'French');
    const slow = (isGet ? req.query.slow : req.body?.slow) === '1' || (isGet ? req.query.slow : req.body?.slow) === true;

    if (!text.trim() || text.length > 1000) {
        return res.status(400).json({ error: 'Invalid text (1-1000 chars)' });
    }

    const voice = VOICES[lang] || VOICES.French;
    try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        const { audioStream } = tts.toStream(text, { rate: slow ? '-30%' : '+0%' });

        const chunks: Buffer[] = [];
        for await (const chunk of audioStream) chunks.push(Buffer.from(chunk));
        const audio = Buffer.concat(chunks);

        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return res.status(200).send(audio);
    } catch (err: any) {
        console.error('[edge-tts] synthesis failed:', err?.message);
        return res.status(502).json({ error: 'Speech synthesis failed' });
    }
}
