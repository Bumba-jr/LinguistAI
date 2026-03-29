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

const getBestVoice = (lang: string): SpeechSynthesisVoice | null => {
  const voices = window.speechSynthesis.getVoices();
  const code = LANG_CODES[lang] || 'en';
  const matches = voices.filter(v => v.lang.toLowerCase().startsWith(code));
  if (!matches.length) return null;
  const priority = ['Natural', 'Neural', 'Online', 'Google', 'Premium', 'Enhanced'];
  for (const kw of priority) {
    const v = matches.find(v => v.name.includes(kw));
    if (v) return v;
  }
  return matches[0];
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

  utterance.onstart = () => startKeepAlive();
  utterance.onend = () => { if (onEnd) onEnd(); };
  utterance.onerror = (e) => {
    // 'interrupted' fires when cancel() is called — not a real error
    if (e.error !== 'interrupted' && e.error !== 'canceled') {
      console.warn('[voiceService] SpeechSynthesis error:', e.error);
    }
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
};

export const speakText = (text: string, lang = 'French', onEnd?: () => void, rate = 0.88) => {
  if (!text.trim()) { onEnd?.(); return; }

  const trySpeak = () => {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    doSpeak(text, lang, onEnd, rate);
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    trySpeak();
  } else {
    // Voices not loaded yet — wait then speak
    const handler = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      trySpeak();
    };
    window.speechSynthesis.addEventListener('voiceschanged', handler);
    // Fallback if event never fires
    setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handler);
      trySpeak();
    }, 600);
  }
};

export const getBestVoiceExport = getBestVoice;
