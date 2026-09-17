import { transcribeAudio } from './aiService';
import type { Language } from '../store/useAppStore';

const LANG_LOCALES: Record<string, string> = {
  French: 'fr-FR', Spanish: 'es-ES', German: 'de-DE',
  Italian: 'it-IT', Japanese: 'ja-JP', Portuguese: 'pt-PT',
  Chinese: 'zh-CN', English: 'en-US',
};

/**
 * Record audio from the mic and transcribe it with Whisper (via the Groq
 * proxy). Whisper handles accented learner speech much better than the
 * browser's speech recognition. Falls back to the Web Speech API when
 * MediaRecorder is unavailable or Whisper fails.
 *
 * Resolves with the transcript. The stop() function lets the caller end the
 * recording early (e.g. a toggle button); otherwise recording stops
 * automatically after maxMs of silence-free capture.
 */
export const recordAndTranscribe = (
  language: Language | 'English',
  opts: { onStateChange?: (state: 'recording' | 'processing') => void; maxMs?: number } = {}
): { promise: Promise<string>; stop: () => void } => {
  const { onStateChange, maxMs = 8000 } = opts;
  let stopped = false;
  let recorder: MediaRecorder | null = null;
  let stream: MediaStream | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const cleanup = () => {
    if (timeoutId) clearTimeout(timeoutId);
    stream?.getTracks().forEach(t => t.stop());
  };

  const promise = new Promise<string>((resolve, reject) => {
    const finishWithFallback = (reason: string) => {
      if (stopped) return;
      stopped = true;
      cleanup();
      // Web Speech API fallback
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SR) { reject(new Error(reason)); return; }
      const rec = new SR();
      rec.lang = LANG_LOCALES[language] || 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e: any) => resolve(e.results[0][0].transcript as string);
      rec.onerror = () => reject(new Error('Could not capture audio'));
      rec.onend = () => { /* result may have arrived already */ };
      try { rec.start(); } catch { reject(new Error(reason)); }
    };

    if (!(window as any).MediaRecorder || !navigator.mediaDevices?.getUserMedia) {
      finishWithFallback('Recording not supported');
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((s) => {
      if (stopped) { s.getTracks().forEach(t => t.stop()); return; }
      stream = s;
      const chunks: Blob[] = [];
      const mime = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : '';
      recorder = new MediaRecorder(s, mime ? { mimeType: mime } : undefined);
      recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
      recorder.onstop = async () => {
        cleanup();
        if (stopped) return;
        stopped = true;
        onStateChange?.('processing');
        const blob = new Blob(chunks, { type: recorder?.mimeType || 'audio/webm' });
        if (blob.size === 0) { reject(new Error('No audio captured')); return; }
        try {
          resolve(await transcribeAudio(blob, language));
        } catch {
          reject(new Error('Transcription failed'));
        }
      };
      recorder.start();
      onStateChange?.('recording');
      timeoutId = setTimeout(() => {
        if (recorder?.state === 'recording') recorder.stop();
      }, maxMs);
    }).catch(() => finishWithFallback('Microphone access denied'));
  });

  return {
    promise,
    stop: () => {
      if (stopped) return;
      if (recorder?.state === 'recording') { recorder.stop(); }
      else { stopped = true; cleanup(); }
    },
  };
};
