import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { GraduationCap, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight, BookOpen, Sparkles, Languages, Check, Zap, Brain, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Mode = 'login' | 'signup' | 'reset';

const WORDS = [
    // French
    { word: 'Bonjour', translation: 'Hello', lang: 'FRENCH', phonetic: '/ bɔ̃.ʒuʁ /', formal: 'Bonjour, Monsieur', informal: 'Salut !' },
    { word: 'Merci', translation: 'Thank you', lang: 'FRENCH', phonetic: '/ mɛʁ.si /', formal: 'Je vous remercie', informal: 'Merci !' },
    { word: 'Liberté', translation: 'Freedom', lang: 'FRENCH', phonetic: '/ li.bɛʁ.te /', formal: 'La liberté', informal: 'Liberté !' },
    { word: 'Amour', translation: 'Love', lang: 'FRENCH', phonetic: '/ a.muʁ /', formal: "L'amour", informal: 'Mon amour' },
    { word: 'Soleil', translation: 'Sun', lang: 'FRENCH', phonetic: '/ sɔ.lɛj /', formal: 'Le soleil', informal: 'Soleil !' },
    { word: 'Papillon', translation: 'Butterfly', lang: 'FRENCH', phonetic: '/ pa.pi.jɔ̃ /', formal: 'Le papillon', informal: 'Papillon !' },
    { word: 'Château', translation: 'Castle', lang: 'FRENCH', phonetic: '/ ʃɑ.to /', formal: 'Le château', informal: 'Château !' },
    { word: 'Étoile', translation: 'Star', lang: 'FRENCH', phonetic: '/ e.twal /', formal: "L'étoile", informal: 'Étoile !' },
    { word: 'Rêve', translation: 'Dream', lang: 'FRENCH', phonetic: '/ ʁɛv /', formal: 'Le rêve', informal: 'Mon rêve' },
    // Spanish
    { word: 'Hola', translation: 'Hello', lang: 'SPANISH', phonetic: '/ ˈo.la /', formal: 'Buenos días', informal: 'Hola !' },
    { word: 'Gracias', translation: 'Thank you', lang: 'SPANISH', phonetic: '/ ˈɡɾa.θjas /', formal: 'Muchas gracias', informal: 'Gracias !' },
    { word: 'Corazón', translation: 'Heart', lang: 'SPANISH', phonetic: '/ ko.ɾa.ˈθon /', formal: 'El corazón', informal: 'Corazón !' },
    { word: 'Mariposa', translation: 'Butterfly', lang: 'SPANISH', phonetic: '/ ma.ɾi.ˈpo.sa /', formal: 'La mariposa', informal: 'Mariposa !' },
    { word: 'Cielo', translation: 'Sky', lang: 'SPANISH', phonetic: '/ ˈθje.lo /', formal: 'El cielo', informal: 'Cielo !' },
    { word: 'Fuego', translation: 'Fire', lang: 'SPANISH', phonetic: '/ ˈfwe.ɣo /', formal: 'El fuego', informal: 'Fuego !' },
    { word: 'Sueño', translation: 'Dream', lang: 'SPANISH', phonetic: '/ ˈswe.ɲo /', formal: 'El sueño', informal: 'Sueño !' },
    { word: 'Estrella', translation: 'Star', lang: 'SPANISH', phonetic: '/ es.ˈtɾe.ʎa /', formal: 'La estrella', informal: 'Estrella !' },
    { word: 'Libertad', translation: 'Freedom', lang: 'SPANISH', phonetic: '/ li.βeɾ.ˈtað /', formal: 'La libertad', informal: 'Libertad !' },
    // Italian
    { word: 'Ciao', translation: 'Hello/Bye', lang: 'ITALIAN', phonetic: '/ tʃaʊ /', formal: 'Buongiorno', informal: 'Ciao !' },
    { word: 'Grazie', translation: 'Thank you', lang: 'ITALIAN', phonetic: '/ ˈɡrat.tsje /', formal: 'La ringrazio', informal: 'Grazie !' },
    { word: 'Amore', translation: 'Love', lang: 'ITALIAN', phonetic: '/ aˈmo.re /', formal: "L'amore", informal: 'Amore !' },
    { word: 'Bellezza', translation: 'Beauty', lang: 'ITALIAN', phonetic: '/ bel.ˈlet.tsa /', formal: 'La bellezza', informal: 'Bellezza !' },
    { word: 'Farfalla', translation: 'Butterfly', lang: 'ITALIAN', phonetic: '/ far.ˈfal.la /', formal: 'La farfalla', informal: 'Farfalla !' },
    { word: 'Sole', translation: 'Sun', lang: 'ITALIAN', phonetic: '/ ˈso.le /', formal: 'Il sole', informal: 'Sole !' },
    { word: 'Sogno', translation: 'Dream', lang: 'ITALIAN', phonetic: '/ ˈsoɲ.ɲo /', formal: 'Il sogno', informal: 'Sogno !' },
    { word: 'Stella', translation: 'Star', lang: 'ITALIAN', phonetic: '/ ˈstel.la /', formal: 'La stella', informal: 'Stella !' },
    // German
    { word: 'Hallo', translation: 'Hello', lang: 'GERMAN', phonetic: '/ ˈhalo /', formal: 'Guten Morgen', informal: 'Hey !' },
    { word: 'Danke', translation: 'Thank you', lang: 'GERMAN', phonetic: '/ ˈdaŋ.kə /', formal: 'Vielen Dank', informal: 'Danke !' },
    { word: 'Freiheit', translation: 'Freedom', lang: 'GERMAN', phonetic: '/ ˈfʁaɪ.haɪt /', formal: 'Die Freiheit', informal: 'Freiheit !' },
    { word: 'Schmetterling', translation: 'Butterfly', lang: 'GERMAN', phonetic: '/ ˈʃmɛ.tɐ.lɪŋ /', formal: 'Der Schmetterling', informal: 'Schmetterling !' },
    { word: 'Traum', translation: 'Dream', lang: 'GERMAN', phonetic: '/ tʁaʊm /', formal: 'Der Traum', informal: 'Traum !' },
    { word: 'Stern', translation: 'Star', lang: 'GERMAN', phonetic: '/ ʃtɛʁn /', formal: 'Der Stern', informal: 'Stern !' },
    { word: 'Liebe', translation: 'Love', lang: 'GERMAN', phonetic: '/ ˈliː.bə /', formal: 'Die Liebe', informal: 'Liebe !' },
    { word: 'Sonne', translation: 'Sun', lang: 'GERMAN', phonetic: '/ ˈzɔ.nə /', formal: 'Die Sonne', informal: 'Sonne !' },
    // Japanese
    { word: '桜', translation: 'Cherry blossom', lang: 'JAPANESE', phonetic: '/ sa.ku.ra /', formal: '桜の花', informal: '桜！' },
    { word: '夢', translation: 'Dream', lang: 'JAPANESE', phonetic: '/ yu.me /', formal: '夢を見る', informal: '夢！' },
    { word: '愛', translation: 'Love', lang: 'JAPANESE', phonetic: '/ a.i /', formal: '愛情', informal: '愛！' },
    { word: '空', translation: 'Sky', lang: 'JAPANESE', phonetic: '/ so.ra /', formal: '青い空', informal: '空！' },
    { word: '星', translation: 'Star', lang: 'JAPANESE', phonetic: '/ ho.shi /', formal: '星空', informal: '星！' },
    { word: '海', translation: 'Ocean', lang: 'JAPANESE', phonetic: '/ u.mi /', formal: '大海原', informal: '海！' },
    { word: '光', translation: 'Light', lang: 'JAPANESE', phonetic: '/ hi.ka.ri /', formal: '光明', informal: '光！' },
    // Portuguese
    { word: 'Olá', translation: 'Hello', lang: 'PORTUGUESE', phonetic: '/ o.ˈla /', formal: 'Bom dia', informal: 'Olá !' },
    { word: 'Obrigado', translation: 'Thank you', lang: 'PORTUGUESE', phonetic: '/ o.bɾi.ˈɡa.du /', formal: 'Muito obrigado', informal: 'Obrigado !' },
    { word: 'Saudade', translation: 'Longing', lang: 'PORTUGUESE', phonetic: '/ saw.ˈda.dɨ /', formal: 'A saudade', informal: 'Saudade !' },
    { word: 'Borboleta', translation: 'Butterfly', lang: 'PORTUGUESE', phonetic: '/ boʁ.bo.ˈle.ta /', formal: 'A borboleta', informal: 'Borboleta !' },
    { word: 'Estrela', translation: 'Star', lang: 'PORTUGUESE', phonetic: '/ es.ˈtɾe.la /', formal: 'A estrela', informal: 'Estrela !' },
    { word: 'Sonho', translation: 'Dream', lang: 'PORTUGUESE', phonetic: '/ ˈso.ɲu /', formal: 'O sonho', informal: 'Sonho !' },
    { word: 'Liberdade', translation: 'Freedom', lang: 'PORTUGUESE', phonetic: '/ li.beʁ.ˈda.dɨ /', formal: 'A liberdade', informal: 'Liberdade !' },
    // Chinese
    { word: '你好', translation: 'Hello', lang: 'CHINESE', phonetic: '/ nǐ hǎo /', formal: '您好', informal: '你好！' },
    { word: '谢谢', translation: 'Thank you', lang: 'CHINESE', phonetic: '/ xiè xiè /', formal: '非常感谢', informal: '谢谢！' },
    { word: '梦想', translation: 'Dream', lang: 'CHINESE', phonetic: '/ mèng xiǎng /', formal: '梦想成真', informal: '梦想！' },
    { word: '自由', translation: 'Freedom', lang: 'CHINESE', phonetic: '/ zì yóu /', formal: '自由民主', informal: '自由！' },
    { word: '星星', translation: 'Star', lang: 'CHINESE', phonetic: '/ xīng xīng /', formal: '星星点点', informal: '星星！' },
    { word: '蝴蝶', translation: 'Butterfly', lang: 'CHINESE', phonetic: '/ hú dié /', formal: '蝴蝶飞舞', informal: '蝴蝶！' },
    { word: '阳光', translation: 'Sunshine', lang: 'CHINESE', phonetic: '/ yáng guāng /', formal: '阳光明媚', informal: '阳光！' },
];

const LANGUAGES = [
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'jp', name: 'Japanese' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'cn', name: 'Chinese' },
];

const MINI_CARDS = [
    { front: 'Merci', back: 'Thank you', lang: 'FR' },
    { front: '愛', back: 'Love', lang: 'JP' },
    { front: 'Gracias', back: 'Thank you', lang: 'ES' },
    { front: 'Sogno', back: 'Dream', lang: 'IT' },
    { front: '星星', back: 'Star', lang: 'ZH' },
    { front: 'Freiheit', back: 'Freedom', lang: 'DE' },
    { front: 'Bonjour', back: 'Hello', lang: 'FR' },
    { front: 'Saudade', back: 'Longing', lang: 'PT' },
    { front: 'Amore', back: 'Love', lang: 'IT' },
    { front: 'Hallo', back: 'Hello', lang: 'DE' },
    { front: '桜', back: 'Cherry blossom', lang: 'JP' },
    { front: 'Olá', back: 'Hello', lang: 'PT' },
    { front: 'Cielo', back: 'Sky', lang: 'ES' },
    { front: '夢', back: 'Dream', lang: 'JP' },
    { front: 'Liberté', back: 'Freedom', lang: 'FR' },
    { front: '谢谢', back: 'Thank you', lang: 'ZH' },
    { front: 'Bellezza', back: 'Beauty', lang: 'IT' },
    { front: 'Estrella', back: 'Star', lang: 'ES' },
    { front: 'Danke', back: 'Thank you', lang: 'DE' },
    { front: '空', back: 'Sky', lang: 'JP' },
    { front: 'Borboleta', back: 'Butterfly', lang: 'PT' },
    { front: 'Amour', back: 'Love', lang: 'FR' },
    { front: 'Fuego', back: 'Fire', lang: 'ES' },
    { front: 'Farfalla', back: 'Butterfly', lang: 'IT' },
    { front: '自由', back: 'Freedom', lang: 'ZH' },
    { front: 'Traum', back: 'Dream', lang: 'DE' },
    { front: '海', back: 'Ocean', lang: 'JP' },
    { front: 'Sonho', back: 'Dream', lang: 'PT' },
    { front: 'Étoile', back: 'Star', lang: 'FR' },
    { front: 'Corazón', back: 'Heart', lang: 'ES' },
    { front: 'Sole', back: 'Sun', lang: 'IT' },
    { front: '阳光', back: 'Sunshine', lang: 'ZH' },
    { front: 'Liebe', back: 'Love', lang: 'DE' },
    { front: '光', back: 'Light', lang: 'JP' },
    { front: 'Estrela', back: 'Star', lang: 'PT' },
    { front: 'Rêve', back: 'Dream', lang: 'FR' },
    { front: 'Mariposa', back: 'Butterfly', lang: 'ES' },
    { front: 'Stella', back: 'Star', lang: 'IT' },
    { front: '蝴蝶', back: 'Butterfly', lang: 'ZH' },
    { front: 'Sonne', back: 'Sun', lang: 'DE' },
    { front: '星', back: 'Star', lang: 'JP' },
    { front: 'Liberdade', back: 'Freedom', lang: 'PT' },
    { front: 'Soleil', back: 'Sun', lang: 'FR' },
    { front: 'Sueño', back: 'Dream', lang: 'ES' },
    { front: 'Sogno', back: 'Dream', lang: 'IT' },
    { front: '梦想', back: 'Dream', lang: 'ZH' },
    { front: 'Stern', back: 'Star', lang: 'DE' },
    { front: 'Obrigado', back: 'Thank you', lang: 'PT' },
    { front: 'Papillon', back: 'Butterfly', lang: 'FR' },
    { front: 'Libertad', back: 'Freedom', lang: 'ES' },
    { front: 'Grazie', back: 'Thank you', lang: 'IT' },
    { front: '你好', back: 'Hello', lang: 'ZH' },
    { front: 'Château', back: 'Castle', lang: 'FR' },
];

const FloatingFlashcard = () => {
    const [queue] = useState<typeof MINI_CARDS>(() =>
        [...MINI_CARDS].sort(() => Math.random() - 0.5)
    );
    const [cardIdx, setCardIdx] = useState(0);
    const [visible, setVisible] = useState(true);

    React.useEffect(() => {
        const t = setInterval(() => {
            setVisible(false);
            setTimeout(() => {
                setCardIdx(i => (i + 1) % queue.length);
                setVisible(true);
            }, 350);
        }, 2800);
        return () => clearInterval(t);
    }, [queue.length]);

    const card = queue[cardIdx];

    return (
        <div className="absolute pointer-events-none" style={{ top: '28%', right: 32, zIndex: 1 }}>
            <motion.div
                animate={{ y: [0, -10, 0], rotate: [2, 4, 2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <AnimatePresence mode="wait">
                    {visible && (
                        <motion.div
                            key={cardIdx}
                            initial={{ opacity: 0, scale: 0.92, y: 6 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: -6 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            style={{
                                width: 110, height: 70,
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 12,
                                backdropFilter: 'blur(10px)',
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', gap: 4,
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                            }}
                        >
                            <span style={{ fontSize: 9, fontWeight: 700, color: '#34d399', letterSpacing: '0.12em' }}>{card.lang}</span>
                            <span style={{ fontSize: 20, fontWeight: 900, color: 'white', lineHeight: 1 }}>{card.front}</span>
                            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{card.back}</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

// 4. Typing tagline
const TAGLINES = [
    'Turn notes into full AI lessons — instantly.',
    'Master any language with spaced repetition.',
    'Chat with your AI tutor in any language.',
    'Upload a PDF. Get flashcards in seconds.',
];

const TypingTagline = () => {
    const [lineIdx, setLineIdx] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [typing, setTyping] = useState(true);

    React.useEffect(() => {
        const line = TAGLINES[lineIdx];
        if (typing) {
            if (displayed.length < line.length) {
                const t = setTimeout(() => setDisplayed(line.slice(0, displayed.length + 1)), 38);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setTyping(false), 1800);
                return () => clearTimeout(t);
            }
        } else {
            if (displayed.length > 0) {
                const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 18);
                return () => clearTimeout(t);
            } else {
                setLineIdx(i => (i + 1) % TAGLINES.length);
                setTyping(true);
            }
        }
    }, [displayed, typing, lineIdx]);

    return (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, minHeight: 44 }}>
            {displayed}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: '#34d399', fontWeight: 700 }}
            >|</motion.span>
        </p>
    );
};

// 5. Floating letter particles — canvas rAF
const LETTERS = [
    'A', 'あ', '你', 'α', 'ب', 'B', 'い', '好', 'β', 'C',
    'う', '爱', 'γ', 'D', 'え', 'δ', 'E', 'お', 'ε', 'F',
    'か', 'ζ', 'G', 'き', 'η', 'H', 'く', 'θ', 'I', 'け',
];

const FloatingLetters = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        type Particle = {
            x: number; y: number; letter: string;
            size: number; opacity: number; speed: number; color: string;
        };

        const particles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
            letter: LETTERS[i % LETTERS.length],
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: 12 + Math.floor(Math.random() * 18),
            opacity: 0.06 + Math.random() * 0.08,
            speed: 0.2 + Math.random() * 0.35,
            color: i % 3 === 0 ? '52,211,153' : '255,255,255',
        }));

        let animId: number;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.font = `700 ${p.size}px Inter, sans-serif`;
                ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
                ctx.fillText(p.letter, p.x, p.y);
                p.y -= p.speed;
                if (p.y < -30) {
                    p.y = canvas.height + 20;
                    p.x = Math.random() * canvas.width;
                }
            });
            animId = requestAnimationFrame(draw);
        };
        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="absolute pointer-events-none" style={{ top: 0, left: 0, right: 0, height: '10%', zIndex: 0, WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)', maskImage: 'linear-gradient(to top, transparent 0%, black 40%)' }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

const AnimatedLeftPanel = () => {
    const [queue, setQueue] = useState<typeof WORDS>(() => {
        const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
        return shuffled;
    });
    const [idx, setIdx] = useState(0);

    React.useEffect(() => {
        const t = setInterval(() => {
            setIdx(i => {
                const next = i + 1;
                if (next >= queue.length) {
                    // reshuffle when exhausted
                    setQueue([...WORDS].sort(() => Math.random() - 0.5));
                    return 0;
                }
                return next;
            });
        }, 3500);
        return () => clearInterval(t);
    }, [queue.length]);

    const w = queue[idx];

    return (
        <div className="hidden lg:flex lg:w-3/5 flex-col relative overflow-hidden"
            style={{ background: '#0d1117' }}>

            {/* Glow blobs */}
            <div className="absolute pointer-events-none" style={{ top: -100, left: -60, width: 480, height: 480, background: 'radial-gradient(circle, rgba(16,185,129,0.11) 0%, transparent 70%)' }} />
            <div className="absolute pointer-events-none" style={{ bottom: -80, right: -60, width: 360, height: 360, background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />

            {/* Diagonal green shape */}
            <div className="absolute pointer-events-none" style={{
                bottom: 0, left: 0, right: 0, height: '32%',
                background: 'linear-gradient(150deg, #10b981 0%, #059669 55%, #047857 100%)',
                clipPath: 'polygon(100% 0%, 100% 90%, 100% 100%, 0% 100%)',
                // clipPath: 'polygon(45% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }} />
            {/* Dot grid overlay on green */}
            <div className="absolute pointer-events-none" style={{
                bottom: 0, left: 0, right: 0, height: '32%',
                clipPath: 'polygon(100% 0%, 100% 90%, 100% 100%, 0% 100%)',
                // clipPath: 'polygon(45% 0%, 100% 0%, 100% 100%, 0% 100%)',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '22px 22px',
            }} />

            {/* Floating letter particles */}
            <FloatingLetters />

            {/* Floating mini flashcard */}
            <FloatingFlashcard />

            <div className="relative z-10 flex flex-col h-full p-10" style={{ gap: 0 }}>

                {/* Logo + top-right icon */}
                <div className="flex items-center justify-between" style={{ marginBottom: 32 }}>
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                            <GraduationCap className="text-white w-4 h-4" />
                        </div>
                        <span className="text-white font-bold text-base tracking-tight">
                            Linguist<span className="text-emerald-400">AI</span>
                        </span>
                    </div>
                    {/* Top-right decorative cluster */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                        {/* Main icon badge */}
                        <motion.div
                            animate={{ rotate: [0, 6, -6, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            style={{
                                width: 42, height: 42, borderRadius: 12,
                                background: 'linear-gradient(135deg, rgba(52,211,153,0.18) 0%, rgba(16,185,129,0.08) 100%)',
                                border: '1px solid rgba(52,211,153,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative',
                                boxShadow: '0 0 16px rgba(52,211,153,0.12)',
                            }}
                        >
                            {/* Orbiting dot */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                style={{ position: 'absolute', inset: 0 }}
                            >
                                <div style={{
                                    position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
                                    width: 8, height: 8, borderRadius: '50%',
                                    background: '#34d399',
                                    boxShadow: '0 0 8px #34d399',
                                }} />
                            </motion.div>
                            {/* Second orbiting dot offset */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                                style={{ position: 'absolute', inset: 4 }}
                            >
                                <div style={{
                                    position: 'absolute', bottom: -3, right: 0,
                                    width: 5, height: 5, borderRadius: '50%',
                                    background: 'rgba(167,139,250,0.8)',
                                    boxShadow: '0 0 6px rgba(167,139,250,0.6)',
                                }} />
                            </motion.div>
                            <Languages size={18} style={{ color: '#34d399' }} />
                        </motion.div>
                    </div>
                </div>

                {/* Headline */}
                <div style={{ marginBottom: 16 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
                        Your AI Language Tutor
                    </p>
                    {(['Learn.', 'Practice.', 'Fluent.'] as const).map((word, i) => (
                        <motion.div key={word}
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            style={{
                                fontSize: 'clamp(7rem, 3.6vw, 3.4rem)',
                                fontWeight: word === 'Fluent.' ? 300 : 900,
                                letterSpacing: '-0.02em',
                                lineHeight: 1.06,
                                color: word === 'Fluent.' ? 'transparent' : 'white',
                                WebkitTextStroke: word === 'Fluent.' ? '1.5px rgba(255,255,255,0.7)' : '0px',
                                display: 'block',
                            }}
                        >{word}</motion.div>
                    ))}
                </div>

                {/* Tagline — typing effect */}
                <TypingTagline />

                {/* Word card + marquee pushed to bottom */}
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

                    {/* Word of the day card */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.35 }}
                            style={{
                                background: 'rgba(255,255,255,0.07)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 14,
                                padding: '16px 20px',
                                maxWidth: 280,
                                backdropFilter: 'blur(12px)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                    Word of the day
                                </span>
                                <span style={{ fontSize: 10, fontWeight: 800, color: '#34d399', background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: 6, padding: '2px 8px', letterSpacing: '0.1em' }}>
                                    {w.lang}
                                </span>
                            </div>
                            <p style={{ fontSize: 26, fontWeight: 900, color: 'white', lineHeight: 1.1, marginBottom: 2 }}>{w.word}</p>
                            <p style={{ fontSize: 12, color: '#34d399', fontWeight: 600, marginBottom: 2 }}>{w.translation}</p>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 12 }}>{w.phonetic}</p>
                            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Formal</span>
                                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>{w.formal}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Informal</span>
                                    <span style={{ fontSize: 11, color: '#34d399', fontWeight: 700 }}>{w.informal}</span>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Language marquee */}
                    <div>
                        <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.22)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
                            7 languages supported
                        </p>
                        <div style={{ overflow: 'hidden', WebkitMaskImage: 'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)' }}>
                            <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 20s linear infinite' }}>
                                {[...LANGUAGES, ...LANGUAGES, ...LANGUAGES].map((lang, i) => (
                                    <div key={i} style={{
                                        display: 'flex', alignItems: 'center', gap: 6,
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: 999,
                                        padding: '4px 11px',
                                        marginRight: 8,
                                        whiteSpace: 'nowrap',
                                        flexShrink: 0,
                                    }}>
                                        <img
                                            src={`https://flagicons.lipis.dev/flags/4x3/${lang.code}.svg`}
                                            alt={lang.name}
                                            style={{ width: 18, height: 14, borderRadius: 2, objectFit: 'cover' }}
                                        />
                                        <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.55)' }}>{lang.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer — bottom right */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.12)' }}>© 2026 LinguistAI</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Confetti canvas
const Confetti = ({ trigger }: { trigger: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);

    useEffect(() => {
        if (!trigger) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const colors = ['#10b981', '#34d399', '#6366f1', '#f59e0b', '#ec4899', '#3b82f6', '#fff'];
        type Particle = { x: number; y: number; vx: number; vy: number; color: string; size: number; alpha: number; rot: number; rotV: number };
        const particles: Particle[] = Array.from({ length: 80 }, () => ({
            x: canvas.width / 2,
            y: canvas.height * 0.7,
            vx: (Math.random() - 0.5) * 14,
            vy: -(Math.random() * 12 + 4),
            color: colors[Math.floor(Math.random() * colors.length)],
            size: 4 + Math.random() * 5,
            alpha: 1,
            rot: Math.random() * Math.PI * 2,
            rotV: (Math.random() - 0.5) * 0.2,
        }));

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.35;
                p.alpha -= 0.013;
                p.rot += p.rotV;
                if (p.alpha <= 0) return;
                alive = true;
                ctx.save();
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rot);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5);
                ctx.restore();
            });
            if (alive) animRef.current = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(animRef.current);
    }, [trigger]);

    return (
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%', zIndex: 20 }} />
    );
};

// Password strength helper
const getStrength = (p: string) => {
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
};
const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

const LEARN_LANGS = [
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' },
    { code: 'de', name: 'German' },
    { code: 'jp', name: 'Japanese' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'cn', name: 'Chinese' },
];

const AVATARS = [
    { initials: 'AK', bg: '#6366f1' },
    { initials: 'MR', bg: '#ec4899' },
    { initials: 'JL', bg: '#f59e0b' },
    { initials: 'TS', bg: '#10b981' },
    { initials: 'PW', bg: '#3b82f6' },
];

export default function AuthPage() {
    const [mode, setMode] = useState<Mode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [selectedLang, setSelectedLang] = useState<string | null>(null);
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success'>('idle');
    const [confetti, setConfetti] = useState(false);
    const [studyingCount, setStudyingCount] = useState(() => 230 + Math.floor(Math.random() * 40));

    // Live studying counter — ticks ±1 every 3–6s
    useEffect(() => {
        const tick = () => {
            setStudyingCount(n => Math.max(200, Math.min(320, n + (Math.random() > 0.5 ? 1 : -1))));
        };
        const schedule = () => {
            const delay = 3000 + Math.random() * 3000;
            return setTimeout(() => { tick(); timerId = schedule(); }, delay);
        };
        let timerId = schedule();
        return () => clearTimeout(timerId);
    }, []);

    const strength = getStrength(password);
    const reset = () => { setError(null); setSuccess(null); };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        reset();
        setLoading(true);
        setSubmitState('loading');
        try {
            if (mode === 'signup' && password !== confirmPassword) {
                setError('Passwords do not match.');
                setSubmitState('idle');
                setLoading(false);
                return;
            }
            if (mode === 'login') {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                setSubmitState('success');
            } else if (mode === 'signup') {
                const { error } = await supabase.auth.signUp({
                    email, password,
                    options: { data: { first_name: firstName, last_name: lastName, full_name: `${firstName} ${lastName}`.trim() } },
                });
                if (error) throw error;
                setSubmitState('success');
                setConfetti(true);
                setTimeout(() => setConfetti(false), 2500);
                setSuccess('Check your email to confirm your account, then sign in.');
                setTimeout(() => setMode('login'), 2000);
            } else {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin,
                });
                if (error) throw error;
                setSubmitState('success');
                setSuccess('Password reset link sent — check your inbox.');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong.');
            setSubmitState('idle');
        } finally {
            setLoading(false);
            setTimeout(() => setSubmitState('idle'), 2000);
        }
    };

    const handleGoogle = async () => {
        reset();
        setGoogleLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: { redirectTo: window.location.origin },
        });
        if (error) { setError(error.message); setGoogleLoading(false); }
    };

    const titles: Record<Mode, string> = {
        login: 'Welcome back',
        signup: 'Create account',
        reset: 'Reset password',
    };

    return (
        <div className="min-h-screen flex" style={{ background: '#f8fafc' }}>
            <AnimatedLeftPanel />

            {/* Right panel — animated background */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 relative overflow-hidden">

                {/* Confetti canvas */}
                <Confetti trigger={confetti} />

                {/* 4. Subtle animated background blobs */}
                <motion.div className="absolute pointer-events-none"
                    animate={{ scale: [1, 1.15, 1], x: [0, 20, 0], y: [0, -15, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }}
                />
                <motion.div className="absolute pointer-events-none"
                    animate={{ scale: [1, 1.1, 1], x: [0, -15, 0], y: [0, 20, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                    style={{ bottom: -60, left: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)' }}
                />

                <div className="w-full max-w-sm relative z-10">
                    {/* Mobile logo */}
                    <div className="flex items-center gap-2 mb-10 lg:hidden">
                        <div className="w-9 h-9 bg-emerald-500 rounded-xl flex items-center justify-center">
                            <GraduationCap className="text-white w-5 h-5" />
                        </div>
                        <span className="text-stone-900 text-lg font-bold">Linguist<span className="text-emerald-500">AI</span></span>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div key={mode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }}>

                            <h1 className="text-3xl font-black text-stone-900 mb-1">{titles[mode]}</h1>

                            {/* 2. Social proof */}
                            {mode !== 'reset' && (
                                <div className="flex items-center gap-2 mb-5">
                                    <div className="flex items-center">
                                        {AVATARS.map((a, i) => (
                                            <div key={i} style={{
                                                width: 22, height: 22, borderRadius: '50%',
                                                background: a.bg,
                                                border: '2px solid white',
                                                marginLeft: i === 0 ? 0 : -6,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 7, fontWeight: 800, color: 'white',
                                                zIndex: AVATARS.length - i,
                                                position: 'relative',
                                            }}>{a.initials}</div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-stone-400 font-medium">Join <span className="text-stone-700 font-bold">12,400+</span> learners</p>
                                </div>
                            )}

                            <p className="text-stone-400 text-sm mb-6">
                                {mode === 'login' && 'Sign in to continue learning.'}
                                {mode === 'signup' && 'Start your language journey today.'}
                                {mode === 'reset' && "We'll send you a reset link."}
                            </p>

                            {/* 3. Live studying counter */}
                            {mode !== 'reset' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 mb-5 px-3 py-2 rounded-xl"
                                    style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)', width: 'fit-content' }}
                                >
                                    <motion.div
                                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', flexShrink: 0 }}
                                    />
                                    <span className="text-xs font-semibold" style={{ color: '#059669' }}>
                                        <motion.span
                                            key={studyingCount}
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.2 }}
                                            style={{ display: 'inline-block' }}
                                        >{studyingCount}</motion.span> people studying right now
                                    </span>
                                </motion.div>
                            )}

                            {mode !== 'reset' && (
                                <button onClick={handleGoogle} disabled={googleLoading}
                                    className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all shadow-sm mb-5 disabled:opacity-60">
                                    {googleLoading ? <Loader2 size={16} className="animate-spin" /> : (
                                        <svg width="18" height="18" viewBox="0 0 18 18">
                                            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
                                            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
                                            <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" />
                                            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
                                        </svg>
                                    )}
                                    Continue with Google
                                </button>
                            )}

                            {mode !== 'reset' && (
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="flex-1 h-px bg-stone-100" />
                                    <span className="text-xs text-stone-300 font-medium">or</span>
                                    <div className="flex-1 h-px bg-stone-100" />
                                </div>
                            )}

                            {error && (
                                <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4 text-red-600 text-sm">
                                    <AlertCircle size={15} className="shrink-0 mt-0.5" />{error}
                                </div>
                            )}
                            {success && (
                                <div className="bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-4 text-emerald-700 text-sm">{success}</div>
                            )}

                            {/* 1. Animated form fields */}
                            <form onSubmit={handleSubmit} className="space-y-3">

                                {/* First + Last name — signup only */}
                                {mode === 'signup' && (
                                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                                        <motion.div className="relative flex-1" animate={{ scale: focusedField === 'firstName' ? 1.01 : 1 }} transition={{ duration: 0.15 }}>
                                            <input
                                                type="text" required placeholder="First name" value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
                                                onFocus={() => setFocusedField('firstName')}
                                                onBlur={() => setFocusedField(null)}
                                                style={{ boxShadow: focusedField === 'firstName' ? '0 0 0 3px rgba(16,185,129,0.12)' : 'none' }}
                                                className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-emerald-400 transition-all"
                                            />
                                        </motion.div>
                                        <motion.div className="relative flex-1" animate={{ scale: focusedField === 'lastName' ? 1.01 : 1 }} transition={{ duration: 0.15 }}>
                                            <input
                                                type="text" required placeholder="Last name" value={lastName}
                                                onChange={e => setLastName(e.target.value)}
                                                onFocus={() => setFocusedField('lastName')}
                                                onBlur={() => setFocusedField(null)}
                                                style={{ boxShadow: focusedField === 'lastName' ? '0 0 0 3px rgba(16,185,129,0.12)' : 'none' }}
                                                className="w-full px-4 py-3.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-emerald-400 transition-all"
                                            />
                                        </motion.div>
                                    </motion.div>
                                )}

                                <motion.div className="relative" animate={{ scale: focusedField === 'email' ? 1.01 : 1 }} transition={{ duration: 0.15 }}>
                                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                                        style={{ color: focusedField === 'email' ? '#10b981' : '#d1d5db' }} />
                                    <input type="email" required placeholder="Email address" value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        style={{ boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(16,185,129,0.12)' : 'none' }}
                                        className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-emerald-400 transition-all" />
                                </motion.div>

                                {mode !== 'reset' && (
                                    <div>
                                        <motion.div className="relative" animate={{ scale: focusedField === 'password' ? 1.01 : 1 }} transition={{ duration: 0.15 }}>
                                            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                                                style={{ color: focusedField === 'password' ? '#10b981' : '#d1d5db' }} />
                                            <input type={showPassword ? 'text' : 'password'} required placeholder="Password" value={password}
                                                onChange={e => setPassword(e.target.value)}
                                                onFocus={() => setFocusedField('password')}
                                                onBlur={() => setFocusedField(null)}
                                                style={{ boxShadow: focusedField === 'password' ? '0 0 0 3px rgba(16,185,129,0.12)' : 'none' }}
                                                className="w-full pl-11 pr-11 py-3.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-emerald-400 transition-all" />
                                            <button type="button" onClick={() => setShowPassword(s => !s)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 transition-colors">
                                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </motion.div>

                                        {/* 5. Password strength */}
                                        {mode === 'signup' && password.length > 0 && (
                                            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 space-y-1">
                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4].map(n => (
                                                        <div key={n} className="flex-1 h-1 rounded-full transition-all duration-300"
                                                            style={{ background: n <= strength ? strengthColor[strength] : '#e5e7eb' }} />
                                                    ))}
                                                </div>
                                                <p className="text-xs font-medium transition-colors" style={{ color: strengthColor[strength] }}>
                                                    {strengthLabel[strength]}
                                                </p>
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                {/* Confirm password — signup only */}
                                {mode === 'signup' && (
                                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}>
                                        <motion.div className="relative" animate={{ scale: focusedField === 'confirmPassword' ? 1.01 : 1 }} transition={{ duration: 0.15 }}>
                                            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-colors"
                                                style={{ color: focusedField === 'confirmPassword' ? '#10b981' : '#d1d5db' }} />
                                            <input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                required
                                                placeholder="Confirm password"
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                                onFocus={() => setFocusedField('confirmPassword')}
                                                onBlur={() => setFocusedField(null)}
                                                style={{
                                                    boxShadow: focusedField === 'confirmPassword' ? '0 0 0 3px rgba(16,185,129,0.12)' : 'none',
                                                    borderColor: confirmPassword.length > 0 && confirmPassword !== password ? '#ef4444' : undefined,
                                                }}
                                                className="w-full pl-11 pr-11 py-3.5 bg-white border border-stone-200 rounded-xl text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-emerald-400 transition-all"
                                            />
                                            <button type="button" onClick={() => setShowConfirmPassword(s => !s)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300 hover:text-stone-500 transition-colors">
                                                {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                            </button>
                                        </motion.div>
                                        <AnimatePresence>
                                            {confirmPassword.length > 0 && confirmPassword !== password && (
                                                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                    className="text-xs mt-1.5 font-medium" style={{ color: '#ef4444' }}>
                                                    Passwords do not match
                                                </motion.p>
                                            )}
                                            {confirmPassword.length > 0 && confirmPassword === password && (
                                                <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                    className="text-xs mt-1.5 font-medium flex items-center gap-1" style={{ color: '#10b981' }}>
                                                    <Check size={11} strokeWidth={3} /> Passwords match
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}

                                {mode === 'login' && (
                                    <div className="text-right">
                                        <button type="button" onClick={() => { setMode('reset'); reset(); }}
                                            className="text-xs text-stone-400 hover:text-emerald-600 transition-colors font-medium">
                                            Forgot password?
                                        </button>
                                    </div>
                                )}

                                {/* 3. Language selector on signup */}
                                {mode === 'signup' && (
                                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                                        <p className="text-xs font-semibold text-stone-400 mb-2">I want to learn:</p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {LEARN_LANGS.map(l => (
                                                <button key={l.code} type="button" onClick={() => setSelectedLang(l.code === selectedLang ? null : l.code)}
                                                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                                    style={{
                                                        background: selectedLang === l.code ? 'rgba(16,185,129,0.1)' : '#f1f5f9',
                                                        border: `1px solid ${selectedLang === l.code ? '#10b981' : 'transparent'}`,
                                                        color: selectedLang === l.code ? '#059669' : '#64748b',
                                                    }}>
                                                    <img src={`https://flagicons.lipis.dev/flags/4x3/${l.code}.svg`} alt={l.name}
                                                        style={{ width: 14, height: 11, borderRadius: 2, objectFit: 'cover' }} />
                                                    {l.name}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* 1. What you'll get checklist — signup only */}
                                {mode === 'signup' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        style={{
                                            background: 'rgba(16,185,129,0.04)',
                                            border: '1px solid rgba(16,185,129,0.12)',
                                            borderRadius: 12,
                                            padding: '12px 14px',
                                        }}
                                    >
                                        <p className="text-xs font-bold text-stone-500 mb-2.5 uppercase tracking-wide">What you'll get</p>
                                        {[
                                            { icon: Brain, text: 'AI lessons from your own notes & PDFs' },
                                            { icon: Zap, text: 'Flashcards with spaced repetition' },
                                            { icon: MessageCircle, text: 'Chat with your AI tutor in any language' },
                                        ].map(({ icon: Icon, text }, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 + i * 0.07 }}
                                                className="flex items-center gap-2.5 mb-1.5 last:mb-0"
                                            >
                                                <div style={{ width: 18, height: 18, borderRadius: 6, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                    <Icon size={10} style={{ color: '#10b981' }} />
                                                </div>
                                                <span className="text-xs text-stone-500">{text}</span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}

                                {/* 4. Keyboard shortcut hint — login only, both fields filled */}
                                <AnimatePresence>
                                    {mode === 'login' && email.length > 0 && password.length > 0 && (
                                        <motion.p
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 4 }}
                                            transition={{ duration: 0.2 }}
                                            className="text-center text-xs text-stone-300 font-medium"
                                        >
                                            Press <kbd style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: 4, padding: '1px 5px', fontSize: 11, color: '#64748b', fontFamily: 'monospace' }}>↵</kbd> to sign in
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                {/* 2. Animated submit button with shimmer + checkmark */}
                                <motion.button
                                    type="submit"
                                    disabled={submitState !== 'idle'}
                                    whileHover={submitState === 'idle' ? { scale: 1.01 } : {}}
                                    whileTap={submitState === 'idle' ? { scale: 0.98 } : {}}
                                    className="w-full relative flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold mt-1 overflow-hidden disabled:cursor-not-allowed"
                                    style={{
                                        background: submitState === 'success' ? '#10b981' : '#18181b',
                                        color: 'white',
                                        transition: 'background 0.4s ease',
                                        border: 'none',
                                        cursor: submitState !== 'idle' ? 'not-allowed' : 'pointer',
                                    }}
                                >
                                    {submitState === 'idle' && (
                                        <motion.div
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
                                                backgroundSize: '200% 100%',
                                            }}
                                            animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                                            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                                        />
                                    )}
                                    <AnimatePresence mode="wait">
                                        {submitState === 'loading' && (
                                            <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                <Loader2 size={16} className="animate-spin" />
                                            </motion.span>
                                        )}
                                        {submitState === 'success' && (
                                            <motion.span key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: 'spring', stiffness: 400 }}>
                                                <Check size={18} strokeWidth={3} />
                                            </motion.span>
                                        )}
                                        {submitState === 'idle' && (
                                            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                                {mode === 'login' ? 'Sign in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
                                                <ArrowRight size={15} />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.button>
                            </form>

                            <p className="text-center text-sm text-stone-400 mt-6">
                                {mode === 'login' ? (
                                    <>Don't have an account?{' '}<button onClick={() => { setMode('signup'); reset(); }} className="text-emerald-600 font-semibold hover:underline">Sign up</button></>
                                ) : (
                                    <>Already have an account?{' '}<button onClick={() => { setMode('login'); reset(); }} className="text-emerald-600 font-semibold hover:underline">Sign in</button></>
                                )}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
