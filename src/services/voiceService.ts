import { fetchWithAuth } from './apiClient';

const LANG_LOCALES: Record<string, string> = {
  French: 'fr-FR', Spanish: 'es-ES', German: 'de-DE',
  Italian: 'it-IT', Japanese: 'ja-JP', Portuguese: 'pt-PT',
  Chinese: 'zh-CN', English: 'en-US',
};

const LANG_CODES: Record<string, string> = {
  French: 'fr', Spanish: 'es', German: 'de',
  Italian: 'it', Japanese: 'ja', Portuguese: 'pt',
  Chinese: 'zh', English: 'en',
};

// Voice names known to sound good per language in the browser's voice list
const PREFERRED_VOICE_NAMES: Record<string, string[]> = {
  French: ['Amélie', 'Amelie', 'Audrey', 'Aurelie', 'Thomas', 'Google français'],
  Spanish: ['Mónica', 'Monica', 'Paulina', 'Jorge', 'Google español'],
  German: ['Anna', 'Markus', 'Petra', 'Google Deutsch'],
  Italian: ['Alice', 'Luca', 'Google italiano'],
  Japanese: ['Kyoko', 'O-ren', 'Oren', 'Google 日本語'],
  Portuguese: ['Joana', 'Luciana', 'Google português'],
  Chinese: ['Ting-Ting', 'Tingting', 'Mei-Jia', 'Google 中文'],
  English: ['Samantha', 'Serena', 'Daniel', 'Google US English'],
};

const getBestVoice = (lang: string): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();
  const code = LANG_CODES[lang] || 'en';
  const matches = voices.filter(v => v.lang.toLowerCase().startsWith(code));
  if (!matches.length) return null;
  // 1) names known to sound natural in this language
  for (const name of PREFERRED_VOICE_NAMES[lang] || []) {
    const v = matches.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
    if (v) return v;
  }
  // 2) generic quality keywords
  const priority = ['Natural', 'Neural', 'Online', 'Google', 'Premium', 'Enhanced'];
  for (const kw of priority) {
    const v = matches.find(v => v.name.includes(kw));
    if (v) return v;
  }
  return matches[0];
};

// ── HD neural TTS providers, with automatic fallback ─────────────────────────
// 1) Edge/Azure neural voices via /api/edge-tts — free, natural, all languages
// 2) OpenAI TTS via /api/openai — natural, needs credits on the key
// 3) Browser SpeechSynthesis with the best installed voice
// Failed providers are remembered per session so later calls skip them.
let edgeTtsState: 'unknown' | 'ok' | 'failed' = 'unknown';
let hdTtsState: 'unknown' | 'ok' | 'failed' = 'unknown';
let currentAudio: HTMLAudioElement | null = null;
let currentAudioEnd: (() => void) | null = null;

const HD_VOICES: Record<string, string> = {
  French: 'nova', Spanish: 'sage', German: 'alloy', Italian: 'shimmer',
  Japanese: 'coral', Portuguese: 'fable', Chinese: 'ash', English: 'nova',
};

const HD_VOICES_MALE: Record<string, string> = {
  French: 'onyx', Spanish: 'ash', German: 'echo', Italian: 'onyx',
  Japanese: 'echo', Portuguese: 'fable', Chinese: 'onyx', English: 'onyx',
};

const stopHD = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
    const end = currentAudioEnd;
    currentAudioEnd = null;
    end?.();
  }
};

const playBlob = (blob: Blob, onEnd?: () => void) => {
  stopHD();
  const audio = new Audio(URL.createObjectURL(blob));
  currentAudio = audio;
  currentAudioEnd = onEnd ?? null;
  audio.onended = () => {
    URL.revokeObjectURL(audio.src);
    if (currentAudio === audio) { currentAudio = null; currentAudioEnd = null; }
    onEnd?.();
  };
  audio.onerror = () => onEnd?.();
  // play() can reject (no audio device / autoplay block) — that must still end the chain
  return audio.play().catch(() => onEnd?.());
};

const speakEdge = async (text: string, lang: string, onEnd?: () => void, rate = 0.88, gender: 'female' | 'male' = 'female'): Promise<boolean> => {
  if (edgeTtsState === 'failed') return false;
  try {
    const res = await fetchWithAuth('/api/edge-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang, slow: rate < 0.7, gender }),
    });
    if (!res.ok) throw new Error(`edge-tts ${res.status}`);
    const blob = await res.blob();
    if (!blob.type.startsWith('audio')) throw new Error('Not audio');
    await playBlob(blob, onEnd);
    edgeTtsState = 'ok';
    return true;
  } catch {
    edgeTtsState = 'failed'; // remember — don't retry the dead path every time
    return false;
  }
};

const speakOpenAI = async (text: string, lang: string, onEnd?: () => void, rate = 0.88, gender: 'female' | 'male' = 'female'): Promise<boolean> => {
  if (hdTtsState === 'failed') return false;
  try {
    const res = await fetchWithAuth('/api/openai/v1/audio/speech', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini-tts',
        voice: (gender === 'male' ? HD_VOICES_MALE : HD_VOICES)[lang] || 'nova',
        input: text,
        response_format: 'mp3',
        instructions: rate < 0.7
          ? 'Speak slowly and clearly, enunciating each syllable — like a patient teacher helping a learner.'
          : 'Speak naturally and warmly, like a friendly native speaker talking to a student. Pause briefly at commas and periods.',
      }),
    });
    if (!res.ok) throw new Error(`TTS ${res.status}`);
    const blob = await res.blob();
    if (!blob.type.startsWith('audio')) throw new Error('Not audio');
    await playBlob(blob, onEnd);
    hdTtsState = 'ok';
    return true;
  } catch {
    hdTtsState = 'failed'; // remember — don't retry the dead path every time
    return false;
  }
};

// Chrome has a bug where speechSynthesis pauses after ~15s — this keeps it alive
let keepAliveTimer: ReturnType<typeof setInterval> | null = null;
const startKeepAlive = () => {
  if (keepAliveTimer) return;
  keepAliveTimer = setInterval(() => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    } else {
      clearInterval(keepAliveTimer!);
      keepAliveTimer = null;
    }
  }, 10000);
};

const doSpeak = (text: string, lang: string, onEnd?: () => void, rate = 0.88) => {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_LOCALES[lang] || 'en-US';
  utterance.rate = rate;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  const voice = getBestVoice(lang);
  if (voice) utterance.voice = voice;

  let ended = false;
  const finish = () => { if (!ended) { ended = true; onEnd?.(); } };
  utterance.onstart = () => startKeepAlive();
  utterance.onend = finish;
  utterance.onerror = (e) => {
    // 'interrupted' fires when cancel() is called — not a real error
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      console.warn('[voiceService] SpeechSynthesis error:', e.error);
    }
    finish();
  };

  window.speechSynthesis.speak(utterance);
  // watchdog — some environments never fire onend/onerror (no voices, muted);
  // guarantee the callback so waiting UI (playing spinners) never gets stuck
  setTimeout(finish, Math.max(4000, text.length * 120));
};

export const speakText = (text: string, lang = 'French', onEnd?: () => void, rate = 0.88, gender: 'female' | 'male' = 'female') => {
  if (!text.trim()) { onEnd?.(); return; }

  const browserSpeak = () => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    doSpeak(text, lang, onEnd, rate);
  };

  // Neural voices first (realistic), browser voices as last resort
  const tryProviders = async () => {
    if (await speakEdge(text, lang, onEnd, rate, gender)) return;
    if (await speakOpenAI(text, lang, onEnd, rate, gender)) return;
    browserSpeak();
  };
  stopHD();
  window.speechSynthesis.cancel();
  tryProviders();
};

/** Stop any playing speech immediately (used for barge-in). Fires pending onEnd. */
export const stopSpeaking = () => {
  stopHD();
  window.speechSynthesis.cancel();
};

export const getBestVoiceExport = getBestVoice;
