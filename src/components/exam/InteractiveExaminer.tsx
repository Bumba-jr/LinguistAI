import React, { useEffect, useRef, useState } from 'react';
import { Mic, Volume2, Loader2, Square, MessageSquareText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { speakText, stopSpeaking } from '../../services/voiceService';
import { recordAndTranscribe } from '../../services/speechService';
import { examinerTurn, ExaminerHistory } from '../../services/aiService';
import type { Language } from '../../store/useAppStore';

// Shared by both exam portals: a live back-and-forth examiner. The AI asks a
// question (spoken aloud), the student answers by voice, the examiner reacts,
// coaches, and asks the next one — like the real HSKK / TCF interview.
interface InteractiveExaminerProps {
    language: Language;
    levelLabel: string;
    taskLabel: string;
    taskGuide: string;
    onDone: (combinedTranscript: string) => void;   // caller runs the full evaluation
}

const InteractiveExaminer = ({ language, levelLabel, taskLabel, taskGuide, onDone }: InteractiveExaminerProps) => {
    const [history, setHistory] = useState<ExaminerHistory[]>([]);
    const [currentQ, setCurrentQ] = useState('');
    const [thinking, setThinking] = useState(true);
    const [recState, setRecState] = useState<'idle' | 'recording' | 'processing'>('idle');
    const [turns, setTurns] = useState<{ question: string; answer: string; note: string }[]>([]);
    const [error, setError] = useState<string | null>(null);
    const recRef = useRef<{ promise: Promise<string>; stop: () => void } | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => () => stopSpeaking(), []);
    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [turns, thinking, recState]);

    // opening question
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const r = await examinerTurn(language, levelLabel, taskLabel, taskGuide, []);
                if (!alive) return;
                setCurrentQ(r.nextQuestion);
                setThinking(false);
                if (r.nextQuestion) speakText(r.nextQuestion, language);
            } catch {
                if (alive) { setError('The examiner could not start — the AI may be busy. Try again.'); setThinking(false); }
            }
        })();
        return () => { alive = false; };
    }, []);

    const answer = () => {
        if (recState === 'recording') { recRef.current?.stop(); return; }
        setError(null);
        setRecState('recording');
        const rec = recordAndTranscribe(language, { maxMs: 60000, onStateChange: s => { if (s === 'processing') setRecState('processing'); } });
        recRef.current = rec;
        rec.promise.then(async (transcript) => {
            setRecState('idle');
            if (!transcript.trim()) {
                setError('Nothing was transcribed — try answering again.');
                return;
            }
            const nextHistory: ExaminerHistory[] = [...history, { role: 'examiner', content: currentQ }, { role: 'student', content: transcript }];
            setHistory(nextHistory);
            setTurns(prev => [...prev, { question: currentQ, answer: transcript, note: '' }]);
            setThinking(true);
            stopSpeaking();
            try {
                const r = await examinerTurn(language, levelLabel, taskLabel, taskGuide, nextHistory);
                setTurns(prev => prev.map((t, i) => i === prev.length - 1 ? { ...t, note: r.note } : t));
                if (r.nextQuestion) {
                    setCurrentQ(r.nextQuestion);
                    speakText(r.nextQuestion, language);
                }
            } catch {
                setError('The examiner lost the thread — the AI may be busy. You can finish with what you have.');
            } finally { setThinking(false); }
        }).catch(() => {
            setRecState('idle');
            setError('Recording failed — check microphone permissions and try again.');
        });
    };

    const combined = turns.map(t => `Q: ${t.question}\nA: ${t.answer}`).join('\n\n');

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-stone-100 p-5">
                <div className="flex items-center gap-2 mb-1">
                    <MessageSquareText size={15} className="text-rose-500" />
                    <p className="font-black text-stone-800 text-sm">Live examiner — {taskLabel.replace(/^HSKK — /, '').replace(/^Task \d+ — /, '')}</p>
                </div>
                <p className="text-xs text-stone-400">The examiner asks, you answer out loud, it reacts and follows up — {turns.length >= 2 ? 'finish whenever you are ready (2+ turns).' : 'do at least 2 turns for a full evaluation.'}</p>
            </div>

            {/* transcript so far */}
            {turns.length > 0 && (
                <div className="space-y-2">
                    {turns.map((t, i) => (
                        <div key={i} className="space-y-1.5">
                            <div className="bg-stone-100 rounded-2xl rounded-bl-md px-4 py-2.5">
                                <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-0.5">Examiner</p>
                                <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm text-stone-800 flex-1">{t.question}</p>
                                    <button onClick={() => speakText(t.question, language)} className="text-stone-300 hover:text-emerald-500 shrink-0"><Volume2 size={12} /></button>
                                </div>
                            </div>
                            <div className="bg-emerald-50 rounded-2xl rounded-br-md px-4 py-2.5 ml-6">
                                <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-0.5">You</p>
                                <p className="text-sm text-stone-700">{t.answer}</p>
                                {t.note && <p className="text-[11px] text-emerald-700 mt-1.5 pt-1.5 border-t border-emerald-100">💡 {t.note}</p>}
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
            )}

            {error && <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-2xl px-4 py-3 text-red-600 text-sm"><AlertTriangle size={14} /> {error}</div>}

            {/* mic */}
            <div className="bg-white rounded-3xl border border-stone-100 p-6 text-center space-y-3">
                {thinking ? (
                    <div className="flex items-center justify-center gap-2 py-6 text-stone-400">
                        <Loader2 size={16} className="animate-spin" /> The examiner is thinking…
                    </div>
                ) : (
                    <>
                        <button onClick={answer} disabled={recState === 'processing' || thinking}
                            className={cn('w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white shadow-xl transition-all',
                                recState === 'recording' ? 'bg-red-500 scale-110 animate-pulse' : recState === 'processing' ? 'bg-stone-200 text-stone-400' : 'bg-rose-500 hover:bg-rose-600')}>
                            {recState === 'recording' ? <Square size={26} fill="currentColor" /> : recState === 'processing' ? <Loader2 size={26} className="animate-spin" /> : <Mic size={28} />}
                        </button>
                        <p className="text-xs font-bold text-stone-400">
                            {recState === 'idle' && `Answer the examiner's question out loud in ${language}`}
                            {recState === 'recording' && 'Recording — tap to stop'}
                            {recState === 'processing' && 'Transcribing…'}
                        </p>
                    </>
                )}
            </div>

            {turns.length >= 2 && !thinking && recState === 'idle' && (
                <button onClick={() => { stopSpeaking(); onDone(combined); }}
                    className="w-full py-3.5 bg-stone-900 text-white text-sm font-bold rounded-2xl hover:bg-stone-700 transition-colors flex items-center justify-center gap-2">
                    <CheckCircle2 size={15} /> Finish — full evaluation ({turns.length} turns)
                </button>
            )}
        </div>
    );
};

export default InteractiveExaminer;
