// HSK Chinese preparation — AI generation + exam constants.
// Format verified Sep 2026 (HSK 2.0 levels 1-6 still administered; HSK 3.0 nine-level
// rollout began 2026): HSK 1 = 20L/20R ~40min · HSK 2 = 35L/25R ~55min ·
// HSK 3 = 40L/30R/10W ~90min · HSK 4 = 45L/40R/15W ~105min ·
// HSK 5 = 45L/45R/10W ~120min · HSK 6 = 50L/50R/essay ~140min.
// Scoring: HSK 1-2 total 200 (pass 120); HSK 3-6 total 300, 100/section (pass 180, total-based).
// Speaking is the separate HSKK (100 pts, pass 60).
// Pedagogy: pinyin+tone pairs FIRST, every word in THREE forms (汉字—pinyin—English),
// characters via radicals/mnemonics, sentence PATTERNS instead of conjugations.
import type { Language } from '../store/useAppStore';
import { chat, parseJSON } from './aiService';

export type HskLevel = '1' | '2' | '3' | '4' | '5' | '6';

export const HSK_LEVEL_INFO: Record<HskLevel, { label: string; words: string; cefr: string; format: string }> = {
    '1': { label: 'HSK 1', words: '150 words', cefr: '≈ A1', format: '20 listening + 20 reading · ~40 min · no writing' },
    '2': { label: 'HSK 2', words: '300 words', cefr: '≈ A1+', format: '35 listening + 25 reading · ~55 min · no writing' },
    '3': { label: 'HSK 3', words: '600 words', cefr: '≈ B1', format: '40 listening + 30 reading + 10 writing · ~90 min' },
    '4': { label: 'HSK 4', words: '1,200 words', cefr: '≈ B2', format: '45 listening + 40 reading + 15 writing · ~105 min' },
    '5': { label: 'HSK 5', words: '2,500 words', cefr: '≈ C1', format: '45 listening + 45 reading + writing · ~120 min' },
    '6': { label: 'HSK 6', words: '5,000+ words', cefr: '≈ C2', format: '50 listening + 50 reading + essay · ~140 min' },
};

// Total-score bands: HSK 1-2 out of 200 (pass 120), HSK 3-6 out of 300 (pass 180, total-based)
export const practiceToScore = (pct: number, level: HskLevel): { score: number; total: number; verdict: string } => {
    const total = Number(level) <= 2 ? 200 : 300;
    const pass = total === 200 ? 120 : 180;
    const score = Math.round((pct / 100) * total);
    const verdict = score >= pass + 60 ? 'Strong pass' : score >= pass ? 'Pass (est.)' : score >= pass - 30 ? 'Borderline' : 'Below pass';
    return { score, total, verdict };
};

// ── Writing tasks (writing enters at HSK 3; HSK 1-2 drill typing/arranging instead) ──
export const HSK_WRITING_TASKS: { id: string; levels: HskLevel[]; label: string; guide: string; minChars: number; minutes: number; prompt: string }[] = [
    {
        id: 'arrange', levels: ['1', '2'], label: 'Sentence building drill',
        guide: 'HSK 1-2 have NO writing section — this drill trains the skill early: write simple sentences answering the questions. Use pinyin if you cannot type the characters yet.',
        minChars: 40, minutes: 10,
        prompt: 'Answer these questions in full Chinese sentences: 你叫什么名字？你是哪国人？你喜欢吃什么？你爸爸做什么工作？',
    },
    {
        id: 'w3', levels: ['3'], label: 'HSK 3 — Rearrange & write',
        guide: 'The real HSK 3 writing: arrange words into sentences, then write characters for pinyin. Here: answer 3 questions with complete sentences (~5+ sentences).',
        minChars: 60, minutes: 15,
        prompt: 'Write about your typical weekend: When do you get up? What do you do in the morning? Who do you meet? What do you buy? How do you feel in the evening?',
    },
    {
        id: 'w4', levels: ['4'], label: 'HSK 4 — Short note (80 chars)',
        guide: 'Real HSK 4 writing ends with a 80-character note/email. Write with proper structure: greeting, body, closing.',
        minChars: 60, minutes: 20,
        prompt: 'Your Chinese friend helped you a lot when you first arrived in China. Write them a short note (about 80 characters): thank them, say what they helped with, and invite them to dinner.',
    },
    {
        id: 'w5', levels: ['5'], label: 'HSK 5 — Two short compositions',
        guide: 'Real HSK 5 writing: use a word in a sentence (~80 chars), then describe a picture/scene (~100 chars). Two mini-compositions.',
        minChars: 120, minutes: 40,
        prompt: 'Part 1: Use the word 到底 (dàodǐ, "after all / on earth") in a short paragraph. Part 2: Describe the street market near your home — the people, the sounds, the smells, what you usually buy.',
    },
    {
        id: 'w6', levels: ['6'], label: 'HSK 6 — Essay (~400 chars)',
        guide: 'Real HSK 6 writing: read a short article and write a 400-character essay summarising it and giving your opinion within 45 minutes.',
        minChars: 250, minutes: 45,
        prompt: 'Essay: "读万卷书，行万里路" — Read ten thousand books, travel ten thousand miles. Which teaches you more? Give your opinion with examples and a clear structure.',
    },
];

// ── Speaking tasks (HSKK — separate exam, 100 pts, pass 60) ──────────────────
export const HSK_SPEAKING_TASKS = [
    {
        id: 'repeat', label: 'HSKK — Listen & repeat',
        guide: 'Question type 1 in every HSKK level: you hear a sentence and repeat it EXACTLY — same words, same tone. 15 sentences in the Beginner exam.',
        seconds: 90,
        prompt: 'I will say 3 sentences in Chinese. After each one, repeat it back exactly as you heard it — same words, same tones. (I say them one at a time.)',
    },
    {
        id: 'answer', label: 'HSKK — Listen & answer',
        guide: 'Question type 2: you hear a question, then answer it in a complete sentence. Tests comprehension + production.',
        seconds: 120,
        prompt: 'I will ask you 3 simple questions in Chinese. Listen, then answer each one in a complete sentence. (Ask them one at a time.)',
    },
    {
        id: 'talk', label: 'HSKK — Talk about a topic',
        guide: 'The production task (Intermediate/Advanced use picture description & retelling — this trains the same skill): speak continuously on a topic.',
        seconds: 150,
        prompt: 'Talk about your best friend: who they are, how you met, what you do together, and why you get along well. Speak for at least 90 seconds in Chinese.',
    },
];

// ── Curriculum syllabus — built from the user's Chinese learning map ─────────
// Stage mapping: HSK 1-2 = Foundation + Survival · HSK 3 = Sentence Building ·
// HSK 4 = Intermediate patterns · HSK 5-6 = Advanced/formal.
export const HSK_SYLLABUS: Record<HskLevel, { title: string; slug: string; focus: string }[]> = {
    '1': [
        { title: 'Pinyin, Tones & Your First Words', slug: 'pinyin-start', focus: 'The four tones + neutral tone with minimal pairs (妈麻马骂), tone pair drilling, greeting people' },
        { title: 'Greetings & Introductions', slug: 'greetings', focus: '你好/谢谢/再见, 我叫…, 我是…, asking 你呢？ — SVO word order' },
        { title: 'Numbers, Dates & Time', slug: 'numbers', focus: 'Counting 1-100, 一…就 patterns, 点/分, days & months, asking 几点' },
        { title: 'Family & People', slug: 'family', focus: '爸爸/妈妈/他/她, 的 possession, measure word 个, describing people' },
        { title: 'Food, Drinks & Eating', slug: 'food', focus: '吃/喝, wanting 要/想, 在 place + verb, ordering simply' },
        { title: 'Questions & Negation', slug: 'questions', focus: '吗 questions, 不 vs 没 negation, question words 谁/什么/哪儿, A-not-A' },
    ],
    '2': [
        { title: 'Time, Days & Routines', slug: 'time', focus: '了 for completed actions, time expressions before the verb, 每天/有时候' },
        { title: 'Movement & Transport', slug: 'transport', focus: '来/去/到, 在/从/到, taking the bus 坐, asking directions simply' },
        { title: 'Shopping & Money', slug: 'shopping', focus: '多少钱, measure words 块/件/本/斤, too expensive 太…了, buying & bargaining' },
        { title: 'Ability & Permission', slug: 'ability', focus: '会/能/可以 — the three kinds of "can", asking permission politely' },
        { title: 'Experience & Comparison', slug: 'compare', focus: '过 for past experience, 比 comparisons, 一点儿 a little' },
        { title: 'Weather & Feelings', slug: 'weather', focus: '天气/冷/热, 因为…所以, describing states with 很' },
    ],
    '3': [
        { title: '把 Sentences — Moving Objects', slug: 'ba', focus: '把 structure: verb the object into a result, when 把 is required, classic mistakes' },
        { title: '被 & Passive Meaning', slug: 'bei', focus: '被 passive, notional passives (饭吃了), when Chinese avoids the passive' },
        { title: '了, 过 & 着 — Aspect Masterclass', slug: 'aspect', focus: 'The three aspect markers, perfective vs experiential vs continuative, verb never changes' },
        { title: 'Measure Words Deep-Dive', slug: 'measure', focus: '只/条/张/辆/件/双, when measure words are obligatory, 个 as default' },
        { title: 'Directions & Location', slug: 'location', focus: '上/下/里/外/前/后, 在/有/是 for existence, 越来越' },
        { title: 'Opinions & Reasons', slug: 'opinions', focus: '觉得/认为, 因为…所以, 不但…而且, giving simple arguments' },
    ],
    '4': [
        { title: '是…的 & Emphasis', slug: 'shi-de', focus: 'Focusing on when/how/where with 是…的, topic-comment structure' },
        { title: '连…都/也, 甚至 & Focus', slug: 'focus', focus: 'Even/everything structures, exaggeration, stressing a point' },
        { title: 'Conditionals & Concessions', slug: 'conditionals', focus: '如果…就, 要是, 不管…都, 即使…也' },
        { title: 'Work & Society Topics', slug: 'work', focus: 'Interviews, offices, plans; 毕业/负责/机会 — exam-ready vocabulary' },
        { title: '补语 Complements', slug: 'complements', focus: '结果补语 (完/好/到), direction complements (起来/下去), potential 看/听不懂' },
        { title: 'China Life & Culture', slug: 'china', focus: 'Housing, transport apps, social life — [China] context for living there' },
    ],
    '5': [
        { title: 'Formal & Written Chinese', slug: 'formal', focus: '书面语 vs spoken, 因此/然而/此外, moving between registers' },
        { title: 'Idioms & 惯用语', slug: 'idioms', focus: 'Four-character idioms 成语, 半途而废-style patterns, natural expressions' },
        { title: 'News & Media Comprehension', slug: 'news', focus: 'Headline grammar, reporting language, hot-topic vocabulary' },
        { title: 'Complex Sentences', slug: 'complex', focus: 'Layered clauses, 无论/既然/万一, embedding, paragraph logic' },
        { title: 'Academic & Professional Chinese', slug: 'academic', focus: 'Essays, meetings, presentations — precision vocabulary' },
    ],
    '6': [
        { title: 'Advanced Essay Writing', slug: 'essay', focus: '400-character essays, structure, cohesion, style' },
        { title: 'Literary & Rhetorical Chinese', slug: 'literary', focus: 'Metaphor, parallelism, classical echoes in modern writing' },
        { title: 'Native-speed Comprehension', slug: 'native', focus: 'Fast speech, slang, implicit meaning, debate language' },
    ],
};

// ── Lesson generation — the Chinese adaptation of the master lesson structure ─
export interface HskLesson {
    title: string;
    objective: string;
    vocabulary: { hanzi: string; pinyin: string; en: string; measureWord?: string; example?: { hanzi: string; pinyin: string; en: string }; related?: { hanzi: string; pinyin: string; en: string }[] }[];
    characters: { hanzi: string; pinyin: string; en: string; components: string; mnemonic: string }[];
    pronunciation: { hanzi: string; pinyin: string; toneNote: string; en: string }[];
    grammar: { rule: string; explanation: string; examples: { hanzi: string; pinyin: string; en: string; breakdown: string[] }[]; commonMistakes: string[] };
    patterns: { type: string; hanzi: string; pinyin: string; en: string }[];
    sentenceBuilding: { hanzi: string; pinyin: string; en: string }[];
    practice: { instruction: string; question: string; answer: string }[];
    translationPractice: { en: string; hanzi: string; pinyin: string }[];
    reverseTranslation: { hanzi: string; pinyin: string; en: string }[];
    register: { casual: string; polite: string; formal: string };
    culture: string;
    freeProduction: string;
    miniTest: { question: string; options: string[]; answer: string }[];
    review: string[];
}

export const generateHskLesson = async (
    level: HskLevel,
    topicTitle: string,
    focus: string
): Promise<HskLesson> => {
    const system = `You are an expert Mandarin Chinese teacher creating a COMPLETE, LONG, DETAILED lesson for the HSK ${level} exam. The student is an ENGLISH speaker at HSK ${level} (${HSK_LEVEL_INFO[level].words} vocabulary). This lesson is the student's main study material — thorough enough to learn from alone. Do NOT be brief; depth and breadth are the requirement.

ABSOLUTE RULES:
- THREE FORMS RULE: every Chinese word, sentence and example MUST show all three forms: 汉字 (characters), pinyin WITH tone marks (e.g. nǐ hǎo), and English meaning.
- WORD ORDER IS THE GRAMMAR: Mandarin verbs NEVER conjugate. When showing how meaning changes (past, negative, question...), explain that the VERB stays identical and show what actually changes: 了/没/吗/要/时间词/word order.
- For every grammar example include a word-by-word breakdown array (["我 = I", "吃 = eat (never changes form)", ...]).
- CHARACTERS: teach via components/radicals — break 2-3 key characters into their parts, explain the radical's meaning, and give a one-line memory mnemonic. Do NOT require handwriting (typing/recognition is the modern exam standard).
- TONES: flag tone pairs, tone sandhi (nǐ hǎo → ní hǎo) and neutral tones wherever they occur.
- Explain the WHY behind every rule and contrast with English structure.
- Do not teach above HSK ${level}, but be exhaustive WITHIN it.
- Where living/studying in China is relevant, include it and label [China].

Return ONLY valid JSON with ALL of these fields, fully populated:
{
 "title":"lesson title",
 "objective":"what the learner can DO after this lesson",
 "vocabulary":[12-16 items, each {"hanzi":"汉字","pinyin":"with tone marks","en":"English","measureWord":"the measure word if this is a noun (omitted otherwise)","example":{"hanzi":"sentence","pinyin":"with tone marks","en":"English"},"related":[{"hanzi":"related word","pinyin":"...","en":"..."}]} — include related words for at least 6 items],
 "characters":[3-4 items {"hanzi":"one key character","pinyin":"...","en":"meaning","components":"radical + component breakdown with each part's meaning","mnemonic":"one-line memorable story connecting the parts to the meaning"}],
 "pronunciation":[4-6 items {"hanzi":"word","pinyin":"...","toneNote":"the tone(s), any sandhi or neutral tone to watch","en":"meaning"}],
 "grammar":{"rule":"the pattern in one line","explanation":"4-6 sentences: structure, WHY Chinese does it this way, contrast with English","examples":[5-6 items {"hanzi":"example","pinyin":"...","en":"English","breakdown":["word = meaning", ...]} — vary: statement, negative, question, with time word...],"commonMistakes":[3-4 items "the mistake English speakers make + the correct Chinese pattern"]},
 "patterns":[6-8 items showing ONE core meaning transformed: {"type":"Positive|Negative|Question|Past (了)|Future (要…了)|Experience (过)|Emphasis| Polite request","hanzi":"the sentence","pinyin":"...","en":"English"} — ALL use the SAME verb unchanged; show what actually changes],
 "sentenceBuilding":[4-5 items from very short to fully expanded, each {"hanzi":"...","pinyin":"...","en":"..."}],
 "practice":[6 exercises {"instruction":"what to do (rearrange/transform/answer/choose measure word)","question":"exercise (Chinese with pinyin where helpful)","answer":"the answer"}] — easy to hard,
 "translationPractice":[6 items EN→ZH {"en":"English sentence","hanzi":"correct Chinese","pinyin":"..."}],
 "reverseTranslation":[4 items ZH→EN {"hanzi":"Chinese","pinyin":"...","en":"English"}],
 "register":{"casual":"how friends say this (with example)","polite":"the everyday polite standard","formal":"the written/exam version with an example"},
 "culture":"a short cultural or [China]-context note connected to the topic",
 "freeProduction":"a personal production task with 3-4 guiding questions",
 "miniTest":[5 MCQs {"question":"question (mix: choose meaning, choose correct pinyin/tone, fill measure word, choose correct particle)","options":["a","b","c","d"],"answer":"correct option"}],
 "review":["2-3 items to review from earlier in the level, tied to this lesson"]
}
Do not omit any field. Do not shorten. This is the student's textbook chapter.`;
    const raw = await chat(system, `Create the complete HSK ${level} lesson: "${topicTitle}". Focus: ${focus}.`, 8000, true);
    return parseJSON(raw);
};

// ── Listening exercise ────────────────────────────────────────────────────────
export interface HskListening {
    scenario: string;
    lines: { speaker: string; hanzi: string; pinyin: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateHskListening = async (level: HskLevel): Promise<HskListening> => {
    const system = `You create HSK ${level} LISTENING practice. Real HSK ${level} listening: short dialogues/announcements heard ONCE, then MCQs.
Create a realistic recording script for an HSK ${level} learner (within the ${HSK_LEVEL_INFO[level].words} vocabulary). Return ONLY valid JSON:
{"scenario":"one line describing the situation (e.g. 'A phone call about a delivery')","lines":[{"speaker":"Name or Role","hanzi":"what they say","pinyin":"with tone marks","en":"English translation"}],"questions":[{"question":"MCQ in ENGLISH about main idea, details, numbers, speaker intention or inference","options":["4 options"],"answer":"correct option"}]}
Rules:
- 5-7 short lines of natural spoken Mandarin.
- 4 questions testing DIFFERENT skills: main idea, a detail (number/time/place), speaker intention, one inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create an HSK ${level} listening exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Reading exercise ──────────────────────────────────────────────────────────
export interface HskReading {
    title: string;
    paragraphs: { hanzi: string; pinyin: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateHskReading = async (level: HskLevel): Promise<HskReading> => {
    const system = `You create HSK ${level} READING practice. Real HSK ${level} reading: progressive MCQs on notices, messages, short texts — testing scanning, detail, paraphrase and inference.
Create one realistic document for an HSK ${level} learner (within the ${HSK_LEVEL_INFO[level].words} vocabulary). Return ONLY valid JSON:
{"title":"document type + title (e.g. '通知 — Building notice')","paragraphs":[{"hanzi":"the Chinese text","pinyin":"with tone marks","en":"English translation (hidden until after)"}],"questions":[{"question":"MCQ in ENGLISH","options":["4 options"],"answer":"correct option"}]}
Rules:
- 3-4 short paragraphs of authentic-style Chinese (notice, WeChat message, email, short article).
- 4 questions testing DIFFERENT skills: main idea, detail location, paraphrase recognition, inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create an HSK ${level} reading exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Writing evaluation ────────────────────────────────────────────────────────
export interface HskWritingFeedback {
    estimatedLevel: string;
    score100: number;
    strengths: string[];
    corrections: { original: string; corrected: string; why: string }[];
    improvements: string[];
    taskCompletion: string;
}
export const evaluateHskWriting = async (
    taskLabel: string, taskGuide: string, minChars: number, text: string, level: HskLevel
): Promise<HskWritingFeedback> => {
    const system = `You are an HSK ${level} examiner evaluating a practice writing submission for ${taskLabel} (${taskGuide}). The section is scored out of 100.
Grade strictly but encouragingly. Return ONLY valid JSON:
{"estimatedLevel":"HSK level estimate of THIS text (e.g. 'HSK ${level}' or one below/above)","score100":0-100,"strengths":["2-3 things done well"],"corrections":[{"original":"the student's exact wrong sentence/phrase (or pinyin if they wrote pinyin)","corrected":"the corrected Chinese (characters + pinyin)","why":"the grammar/character/word-order reason in English"}],"improvements":["3-4 concrete prioritised improvements tied to HSK writing criteria: task completion, grammar patterns, word choice, character accuracy, complexity"],"taskCompletion":"did the text answer the task, use appropriate patterns, and respect the length? Be specific."}
Rules: correct EVERY meaningful error — word order, missing measure words, wrong/misplaced 了, aspect errors, literal translations from English. If the student wrote pinyin instead of characters, note it and grade the grammar, recommending characters. This is a practice estimate, never an official score.`;
    const raw = await chat(system, `Student submission (min ${minChars} characters):\n\n${text}`, 3000, true);
    return parseJSON(raw);
};

// ── Speaking evaluation (HSKK) ───────────────────────────────────────────────
export interface HskSpeakingFeedback {
    estimatedLevel: string;
    score100: number;
    strengths: string[];
    transcriptCorrections: { original: string; corrected: string; why: string }[];
    fluencyTips: string[];
    nextAttempt: string;
}
export const evaluateHskSpeaking = async (
    taskLabel: string, taskGuide: string, taskPrompt: string, transcript: string, level: HskLevel
): Promise<HskSpeakingFeedback> => {
    const system = `You are an HSKK examiner evaluating a SPOKEN practice attempt (transcribed by speech-to-text, so ignore spelling — judge grammar, vocabulary and patterns from the words). Task: ${taskLabel} — ${taskGuide}. The prompt was: "${taskPrompt}". Student level: HSK ${level}. HSKK is scored out of 100 (pronunciation ~30, fluency ~30, vocabulary & grammar ~40).
Return ONLY valid JSON:
{"estimatedLevel":"HSK level estimate of THIS performance","score100":0-100,"strengths":["2-3 strengths"],"transcriptCorrections":[{"original":"what was said (from transcript)","corrected":"better Chinese (characters + pinyin)","why":"reason in English"}],"fluencyTips":["2-3 tips on flow, tones, fillers for the HSKK format"],"nextAttempt":"one concrete thing to do differently next time"}
Correct grammar from the transcript (if the transcript is in pinyin, judge it as spoken Chinese). This is a practice estimate, never an official score.`;
    const raw = await chat(system, `Transcript of the student's spoken answer:\n\n${transcript || '(silence or nothing transcribed)'}`, 2500, true);
    return parseJSON(raw);
};

// ── Tone pair drill data (static — the pedagogy says drill tone pairs early) ─
export interface ToneSet { syllable: string; items: { hanzi: string; pinyin: string; tone: number; en: string }[]; }
export const TONE_SETS: ToneSet[] = [
    { syllable: 'ma', items: [
        { hanzi: '妈', pinyin: 'mā', tone: 1, en: 'mother' },
        { hanzi: '麻', pinyin: 'má', tone: 2, en: 'hemp / numb' },
        { hanzi: '马', pinyin: 'mǎ', tone: 3, en: 'horse' },
        { hanzi: '骂', pinyin: 'mà', tone: 4, en: 'to scold' },
    ]},
    { syllable: 'shi', items: [
        { hanzi: '师', pinyin: 'shī', tone: 1, en: 'teacher / master' },
        { hanzi: '十', pinyin: 'shí', tone: 2, en: 'ten' },
        { hanzi: '使', pinyin: 'shǐ', tone: 3, en: 'to make / cause' },
        { hanzi: '是', pinyin: 'shì', tone: 4, en: 'to be' },
    ]},
    { syllable: 'yi', items: [
        { hanzi: '一', pinyin: 'yī', tone: 1, en: 'one' },
        { hanzi: '移', pinyin: 'yí', tone: 2, en: 'to move / shift' },
        { hanzi: '椅', pinyin: 'yǐ', tone: 3, en: 'chair' },
        { hanzi: '亿', pinyin: 'yì', tone: 4, en: 'hundred million' },
    ]},
    { syllable: 'tang', items: [
        { hanzi: '汤', pinyin: 'tāng', tone: 1, en: 'soup' },
        { hanzi: '糖', pinyin: 'táng', tone: 2, en: 'sugar / candy' },
        { hanzi: '躺', pinyin: 'tǎng', tone: 3, en: 'to lie down' },
        { hanzi: '烫', pinyin: 'tàng', tone: 4, en: 'scalding hot' },
    ]},
    { syllable: 'wen', items: [
        { hanzi: '温', pinyin: 'wēn', tone: 1, en: 'warm' },
        { hanzi: '文', pinyin: 'wén', tone: 2, en: 'writing / language' },
        { hanzi: '吻', pinyin: 'wěn', tone: 3, en: 'to kiss' },
        { hanzi: '问', pinyin: 'wèn', tone: 4, en: 'to ask' },
    ]},
    { syllable: 'bao', items: [
        { hanzi: '包', pinyin: 'bāo', tone: 1, en: 'bag / to wrap' },
        { hanzi: '薄', pinyin: 'báo', tone: 2, en: 'thin' },
        { hanzi: '饱', pinyin: 'bǎo', tone: 3, en: 'full (from eating)' },
        { hanzi: '报', pinyin: 'bào', tone: 4, en: 'newspaper / to report' },
    ]},
    { syllable: 'xi', items: [
        { hanzi: '西', pinyin: 'xī', tone: 1, en: 'west' },
        { hanzi: '习', pinyin: 'xí', tone: 2, en: 'to practise' },
        { hanzi: '洗', pinyin: 'xǐ', tone: 3, en: 'to wash' },
        { hanzi: '戏', pinyin: 'xì', tone: 4, en: 'play / drama' },
    ]},
    { syllable: 'hu', items: [
        { hanzi: '呼', pinyin: 'hū', tone: 1, en: 'to call out' },
        { hanzi: '湖', pinyin: 'hú', tone: 2, en: 'lake' },
        { hanzi: '虎', pinyin: 'hǔ', tone: 3, en: 'tiger' },
        { hanzi: '护', pinyin: 'hù', tone: 4, en: 'to protect' },
    ]},
];

// Neutral tone examples — unstressed second syllable, common in everyday words
export const NEUTRAL_TONE_WORDS = [
    { hanzi: '妈妈', pinyin: 'māma', en: 'mum — 2nd syllable unstressed' },
    { hanzi: '谢谢', pinyin: 'xièxie', en: 'thanks — neutral at the end' },
    { hanzi: '朋友', pinyin: 'péngyou', en: 'friend — 友 neutral' },
    { hanzi: '漂亮', pinyin: 'piàoliang', en: 'pretty — 亮 neutral' },
    { hanzi: '我们', pinyin: 'wǒmen', en: 'we — 们 neutral' },
];

// Tone sandhi — the #1 thing that makes learned tones "sound wrong" in real speech
export const TONE_SANDHI = [
    { rule: '3rd + 3rd → 2nd + 3rd', example: { hanzi: '你好', spoken: 'ní hǎo', written: 'nǐ hǎo', en: 'hello — the first 3rd tone becomes a rising 2nd tone in speech' } },
    { rule: '一 yī changes tone', example: { hanzi: '一个', spoken: 'yí ge', written: 'yī gè', en: 'one — 一 is yí before 4th tone, yì before 1st/2nd/3rd' } },
    { rule: '不 bù changes tone', example: { hanzi: '不是', spoken: 'bú shì', written: 'bù shì', en: 'to not be — 不 becomes bú before a 4th tone' } },
];
