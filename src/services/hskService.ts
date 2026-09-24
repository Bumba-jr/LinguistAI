// HSK Chinese preparation — AI generation + exam constants.
// This course content is explicitly HSK 2.0 (six levels). CTI now publishes
// the HSK 3.0 three-stage, nine-level syllabus; its exam formats and skill
// coverage must not be mixed with these older practice estimates.
// HSK 1 = 20L/20R ~40min · HSK 2 = 35L/25R ~55min ·
// HSK 3 = 40L/30R/10W ~90min · HSK 4 = 45L/40R/15W ~105min ·
// HSK 5 = 45L/45R/10W ~120min · HSK 6 = 50L/50R/essay ~140min.
// Scoring: HSK 1-2 total 200 (pass 120); HSK 3-6 total 300, 100/section (pass 180, total-based).
// Speaking is the separate HSKK (100 pts, pass 60).
// Pedagogy: pinyin+tone pairs FIRST, every word in THREE forms (汉字—pinyin—English),
// characters via radicals/mnemonics, sentence PATTERNS instead of conjugations.
import type { Language } from '../store/useAppStore';
import { chat, parseJSON } from './aiService';

export type HskLevel = '1' | '2' | '3' | '4' | '5' | '6';
export type HskVersion = '2.0' | '3.0';

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
        { title: 'Serial Verbs & Coverbs', slug: 'serial-verbs', focus: 'Chained verbs with one subject (我去买东西 I go buy things), coverbs 给/跟/对/用 setting up the action' },
        { title: 'Measure Words Deep-Dive', slug: 'measure', focus: '只/条/张/辆/件/双, when measure words are obligatory, 个 as default' },
        { title: 'Directions & Location', slug: 'location', focus: '上/下/里/外/前/后, 在/有/是 for existence, 越来越' },
        { title: 'Opinions & Reasons', slug: 'opinions', focus: '觉得/认为, 因为…所以, 不但…而且, giving simple arguments' },
    ],
    '4': [
        { title: '是…的 & Emphasis', slug: 'shi-de', focus: 'Focusing on when/how/where with 是…的, topic-comment structure' },
        { title: '的 / 得 / 地 — The Three de', slug: 'three-de', focus: 'possession 的 (我的书), degree 得 (说得快), manner 地 (慢慢地) — the classic confusion, settled forever' },
        { title: 'Connectors: 虽然…但是， 除了…以外', slug: 'connectors', focus: 'Although/but, apart from, no matter, either/or — linking ideas the exam expects' },
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
        { title: 'Long Listening & Argument Tracking', slug: 'advanced-listening', focus: 'Follow native-speed interviews and talks, identify claims and evidence, and infer the speaker’s stance' },
        { title: 'Vocabulary in Context & Paraphrase', slug: 'context-paraphrase', focus: 'Infer advanced vocabulary from context, recognize paraphrases, and distinguish near-synonyms in long passages' },
        { title: 'Cohesive Argumentative Writing', slug: 'cohesion', focus: 'Develop a clear position with evidence, concessions, logical connectors and a concise conclusion' },
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

// ═══════════════════════════════════════════════════════════════════════════════
// PINYIN FOUNDATION COURSE DATA — the complete system: initials → finals → tones
// → syllables → words → sentences (Phase 0-4 of the master Chinese syllabus).
// A syllable = Initial + Final + Tone. ~400 base syllables, 1000+ with tones.
// ═══════════════════════════════════════════════════════════════════════════════

export const MANDARIN_FACTS = {
    intro: 'Pinyin (拼音, pīnyīn) is NOT the Chinese alphabet — it is a pronunciation system (romanisation) that tells you how to say the characters. The characters (汉字, hànzì) are the actual writing. You are learning TWO systems at once: Pinyin for the ear and mouth, 汉字 for the eye and hand.',
    order: 'Pinyin → Initials → Finals → Tones → Syllables → Words → Sentences → Characters',
    syllableMath: 'There are 21 initials, 36 finals, and 4 tones + neutral. Not every initial combines with every final: Mandarin has ~400 valid base syllables, and over 1,000 distinct pronunciations once tones are counted. You do NOT memorise 1,000 sounds — you learn the ~60 building blocks and combine them.',
    simplifiedNote: 'This portal teaches SIMPLIFIED characters (简体字) — the mainland China standard used by the HSK. Traditional (繁體字) is used in Taiwan, Hong Kong and most overseas communities. Read the shapes differently, speak the same.',
    cantoneseNote: 'Mandarin (普通话 Pǔtōnghuà, "common speech") is the standard language of mainland China and Taiwan — the only thing the HSK tests. Cantonese (粤语 Yuèyǔ) is a separate spoken language, NOT a dialect of Mandarin: Guangzhou/Hong Kong speech is mutually unintelligible with Mandarin even though both write characters. Learn Mandarin first — it works everywhere.',
    example: { hanzi: '我爱你', pinyin: 'Wǒ ài nǐ', en: 'I love you — pinyin lets you SAY the sentence before you can write a single character of it' },
};

export interface PinyinInitial { sound: string; english: string; mouth: string; mistake: string; sample: { hanzi: string; pinyin: string; en: string }; }
export const PINYIN_INITIAL_GROUPS: { group: string; note: string; initials: PinyinInitial[] }[] = [
    {
        group: 'b p m f', note: 'The labial sounds — made with the lips.',
        initials: [
            { sound: 'b', english: 'like "b" in SPIN — no puff of air (unaspirated)', mouth: 'Lips close, then open. English b has no air puff either here — it is already close.', mistake: 'Adding an English "b" puff makes it sound like p.', sample: { hanzi: '爸', pinyin: 'bà', en: 'dad' } },
            { sound: 'p', english: 'like "p" in PIN — strong puff of air (aspirated)', mouth: 'Same lip position as b, but release with a strong puff of air you can feel on your hand.', mistake: 'Not aspirating enough — b and p must sound clearly different.', sample: { hanzi: '怕', pinyin: 'pà', en: 'to fear' } },
            { sound: 'm', english: 'exactly like English m', mouth: 'Lips together, hum through the nose.', mistake: 'None — this one is free.', sample: { hanzi: '妈', pinyin: 'mā', en: 'mum' } },
            { sound: 'f', english: 'exactly like English f', mouth: 'Top teeth on bottom lip, blow.', mistake: 'None — this one is free.', sample: { hanzi: '飞', pinyin: 'fēi', en: 'to fly' } },
        ],
    },
    {
        group: 'd t n l', note: 'Tongue-tip sounds at the ridge behind your top teeth.',
        initials: [
            { sound: 'd', english: 'like "d" in STAND — no puff of air', mouth: 'Tongue tip on the ridge, release without a puff.', mistake: 'Aspirating it (turning it into t).', sample: { hanzi: '大', pinyin: 'dà', en: 'big' } },
            { sound: 't', english: 'like "t" in TOP — strong puff of air', mouth: 'Same position as d, release with a strong puff.', mistake: 'Under-aspirating — d and t must contrast.', sample: { hanzi: '他', pinyin: 'tā', en: 'he' } },
            { sound: 'n', english: 'exactly like English n', mouth: 'Tongue tip on the ridge, air through the nose.', mistake: 'Confusing with l at the end of syllables (nán vs lán).', sample: { hanzi: '你', pinyin: 'nǐ', en: 'you' } },
            { sound: 'l', english: 'exactly like English l', mouth: 'Tongue tip on the ridge, air around the sides.', mistake: 'Confusing with n — practise nǐ (you) vs lǐ (plum).', sample: { hanzi: '来', pinyin: 'lái', en: 'to come' } },
        ],
    },
    {
        group: 'g k h', note: 'Back-of-the-mouth sounds.',
        initials: [
            { sound: 'g', english: 'like "g" in SKY — no puff of air (never a hard English "g" in "go" with extra force)', mouth: 'Back of the tongue touches the soft palate, release without a puff.', mistake: 'Adding aspiration.', sample: { hanzi: '哥', pinyin: 'gē', en: 'older brother' } },
            { sound: 'k', english: 'like "k" in KITE — strong puff of air', mouth: 'Same position as g, with a strong puff.', mistake: 'Under-aspirating.', sample: { hanzi: '课', pinyin: 'kè', en: 'lesson' } },
            { sound: 'h', english: 'like English h but further back — almost a soft throat sound', mouth: 'Back of tongue near the soft palate, gentle friction — like breathing on glasses.', mistake: 'Making it too soft (silent) or too harsh (like German ach).', sample: { hanzi: '好', pinyin: 'hǎo', en: 'good' } },
        ],
    },
    {
        group: 'j q x', note: 'THE sounds to train specifically — no true English equivalents. Tongue FORWARD (flat, at the hard ridge), lips spread.',
        initials: [
            { sound: 'j', english: 'between "j" in JEEP and "tch" — but made with the tongue forward and a smile', mouth: 'Tongue tip DOWN behind the bottom teeth, the flat blade of the tongue touches the hard ridge. Lips spread wide.', mistake: 'Saying English "j" (tongue pulled back, lips rounded) — completely wrong sound.', sample: { hanzi: '家', pinyin: 'jiā', en: 'home' } },
            { sound: 'q', english: 'same family as j but strongly aspirated — like a hissy "ch"', mouth: 'Same forward tongue position as j, release with a strong puff of air.', mistake: 'Saying English "q" (kw sound) — q in pinyin is NOTHING like English.', sample: { hanzi: '七', pinyin: 'qī', en: 'seven' } },
            { sound: 'x', english: 'a soft hissing "sh", made further forward than English sh', mouth: 'Forward tongue like j/q, long soft friction — like a gentle hiss. Lips spread.', mistake: 'Saying English "x" (ks) — wrong language entirely. Also confusing with sh (tongue back).', sample: { hanzi: '先', pinyin: 'xiān', en: 'first' } },
        ],
    },
    {
        group: 'zh ch sh r', note: 'The RETROFLEX series — tongue curled slightly BACK. Treat zh/ch/sh as single initial sounds, not letter combos.',
        initials: [
            { sound: 'zh', english: 'like a "j"-ish sound with the tongue curled back', mouth: 'Curl the tongue tip up toward the hard palate (roof), make a voiced stop.', mistake: 'Merging with z — zh is curled back, z is flat. 站 zhàn ≠ 赞 zàn.', sample: { hanzi: '中', pinyin: 'zhōng', en: 'middle / China' } },
            { sound: 'ch', english: 'same family as zh, but strongly aspirated', mouth: 'Curled-back tongue like zh, with a strong puff of air.', mistake: 'Merging with c — 吃 chī ≠ 次 cì.', sample: { hanzi: '吃', pinyin: 'chī', en: 'to eat' } },
            { sound: 'sh', english: 'like English sh, but tongue curled back and further up', mouth: 'Retroflex the tongue tip, long friction.', mistake: 'Merging with s — 是 shì ≠ 四 sì. This is THE classic listening mistake.', sample: { hanzi: '是', pinyin: 'shì', en: 'to be' } },
            { sound: 'r', english: 'NOT the English r — closer to the "s" in MEASURE (ʒ) with a curled tongue', mouth: 'Same retroflex position as sh, but voiced with a buzz.', mistake: 'Saying English "r" (lips rounded) — keep lips unrounded and buzz.', sample: { hanzi: '人', pinyin: 'rén', en: 'person' } },
        ],
    },
    {
        group: 'z c s', note: 'The DENTAL series — tongue FLAT against the back of the teeth. The zh/z, ch/c, sh/s contrasts are critical for listening.',
        initials: [
            { sound: 'z', english: 'like "ds" in KIDS — a buzzing dz', mouth: 'Flat tongue against the teeth, voiced buzz.', mistake: 'Merging with zh (curled back).', sample: { hanzi: '字', pinyin: 'zì', en: 'character / word' } },
            { sound: 'c', english: 'like "ts" in CATS — strongly aspirated (NEVER a k sound!)', mouth: 'Flat tongue at the teeth, release a strong ts puff.', mistake: 'Saying English "c/k" — 菜 cài (vegetable) is "tsai", never "kai".', sample: { hanzi: '菜', pinyin: 'cài', en: 'vegetable / dish' } },
            { sound: 's', english: 'exactly like English s', mouth: 'Flat tongue, thin stream of air.', mistake: 'Merging with sh (curled back).', sample: { hanzi: '三', pinyin: 'sān', en: 'three' } },
        ],
    },
];

export interface PinyinFinalGroup { name: string; finals: { sound: string; english: string; sample?: { hanzi: string; pinyin: string; en: string } }[]; note: string; }
export const PINYIN_FINAL_GROUPS: PinyinFinalGroup[] = [
    {
        name: 'Simple finals (the 6 building blocks)', note: 'Every other final is built from these. Learn the ones that differ from English especially well.',
        finals: [
            { sound: 'a', english: 'like "ah" — open and bright', sample: { hanzi: '妈', pinyin: 'mā', en: 'mum' } },
            { sound: 'o', english: 'like "aw" — rounded lips (after b/p/m/f it is actually "uo")', sample: { hanzi: '我', pinyin: 'wǒ', en: 'I / me' } },
            { sound: 'e', english: 'like the "u" in "uh" — a relaxed mid sound, NOT English "e"', sample: { hanzi: '饿', pinyin: 'è', en: 'hungry' } },
            { sound: 'i', english: 'like "ee" — BUT after zh/ch/sh/r/z/c/s it becomes a buzzing continuation of that consonant (shì is not "shee")', sample: { hanzi: '你', pinyin: 'nǐ', en: 'you' } },
            { sound: 'u', english: 'like "oo" in food', sample: { hanzi: '不', pinyin: 'bù', en: 'not' } },
            { sound: 'ü', english: 'like French "u" / German "ü" — say "ee" with rounded lips. English has no equivalent', sample: { hanzi: '绿', pinyin: 'lǜ', en: 'green' } },
        ],
    },
    { name: 'Compound finals', note: 'Two vowels gliding together.', finals: [
        { sound: 'ai', english: 'like "eye"', sample: { hanzi: '爱', pinyin: 'ài', en: 'to love' } },
        { sound: 'ei', english: 'like "ay" in "say"', sample: { hanzi: '杯', pinyin: 'bēi', en: 'cup' } },
        { sound: 'ao', english: 'like "ow" in "cow"', sample: { hanzi: '好', pinyin: 'hǎo', en: 'good' } },
        { sound: 'ou', english: 'like "oh" gliding from an o', sample: { hanzi: '都', pinyin: 'dōu', en: 'all' } },
    ]},
    { name: 'Nasal finals (end in n or ng)', note: 'The n/ng contrast is one of the most important listening skills — an vs ang, en vs eng, in vs ing.', finals: [
        { sound: 'an', english: 'like "ahn" ending with n (tongue forward)', sample: { hanzi: '班', pinyin: 'bān', en: 'class' } },
        { sound: 'en', english: 'like "un" in "fun" ending with n', sample: { hanzi: '人', pinyin: 'rén', en: 'person' } },
        { sound: 'ang', english: 'like "ahng" — open, ending with ng (tongue back)', sample: { hanzi: '帮', pinyin: 'bāng', en: 'to help' } },
        { sound: 'eng', english: 'like "ung" ending with ng', sample: { hanzi: '风', pinyin: 'fēng', en: 'wind' } },
        { sound: 'ong', english: 'like "ong" — starts rounded, unique to Mandarin', sample: { hanzi: '中', pinyin: 'zhōng', en: 'middle' } },
    ]},
    { name: 'i-family finals', note: 'i + another sound gliding through.', finals: [
        { sound: 'ia / ie / iao / iu', english: 'ya / yeh / yao (like "meow") / yo (like "yo-yo")', sample: { hanzi: '叫', pinyin: 'jiào', en: 'to be called' } },
        { sound: 'ian / in', english: 'yen / een', sample: { hanzi: '钱', pinyin: 'qián', en: 'money' } },
        { sound: 'iang / ing', english: 'yahng / eeng', sample: { hanzi: '明', pinyin: 'míng', en: 'bright' } },
    ]},
    { name: 'u-family finals', note: 'u + another sound gliding through.', finals: [
        { sound: 'ua / uo / uai / ui', english: 'wa / wo / why / way', sample: { hanzi: '水', pinyin: 'shuǐ', en: 'water' } },
        { sound: 'uan / un / uang', english: 'wan / wun / wahng', sample: { hanzi: '饭', pinyin: 'fàn', en: 'rice / meal' } },
    ]},
    { name: 'ü-family finals', note: 'After j / q / x, ü loses its dots in writing (ju qu xu) but still SOUNDS like ü.', finals: [
        { sound: 'üe / üan / ün', english: 'üweh / üwen / ün — written ue/uan/un after j q x (and y)', sample: { hanzi: '月', pinyin: 'yuè', en: 'moon / month' } },
    ]},
];

export const SPELLING_RULES = [
    { rule: 'ü after j / q / x / y', detail: 'ü loses its two dots: 去 qù (go), 月 yuè (month). It still SOUNDS like ü — the dots are just not written. Everywhere else (nü, lü) the dots stay: 绿 lǜ.' },
    { rule: 'i alone / starting a syllable', detail: 'written y: 一 yī, 也 yě. After zh/ch/sh/r/z/c/s, the i is a buzz, not "ee": 是 shì, 字 zì.' },
    { rule: 'u alone / starting a syllable', detail: 'written w: 五 wǔ, 我 wǒ (w+o).' },
    { rule: 'Tone mark placement', detail: 'The mark goes on the main vowel: on a if there is one, else on o/e, else on the LAST vowel. The dot on i is dropped under a tone mark: 你 nǐ.' },
    { rule: 'Apostrophe before a- o- e- syllables', detail: 'When a syllable starting with a/o/e follows another syllable, separate with an apostrophe: 西安 Xī\'ān (Xi\'an), not "Xīān".' },
    { rule: 'The neutral tone', detail: 'Never gets a tone mark: the second syllable of 妈妈 māma, 谢谢 xièxie, 朋友 péngyou is light and unstressed.' },
];

// All 16 two-syllable tone combinations, with a real word for each (Unit 14 — tone pairs)
export const TONE_PAIR_WORDS: { pair: string; hanzi: string; pinyin: string; en: string }[] = [
    { pair: '1+1', hanzi: '咖啡', pinyin: 'kāfēi', en: 'coffee' },
    { pair: '1+2', hanzi: '中国', pinyin: 'Zhōngguó', en: 'China' },
    { pair: '1+3', hanzi: '开始', pinyin: 'kāishǐ', en: 'to begin' },
    { pair: '1+4', hanzi: '工作', pinyin: 'gōngzuò', en: 'work' },
    { pair: '2+1', hanzi: '回家', pinyin: 'huíjiā', en: 'to go home' },
    { pair: '2+2', hanzi: '学习', pinyin: 'xuéxí', en: 'to study' },
    { pair: '2+3', hanzi: '牛奶', pinyin: 'niúnǎi', en: 'milk' },
    { pair: '2+4', hanzi: '决定', pinyin: 'juédìng', en: 'to decide' },
    { pair: '3+1', hanzi: '老师', pinyin: 'lǎoshī', en: 'teacher' },
    { pair: '3+2', hanzi: '旅行', pinyin: 'lǚxíng', en: 'to travel' },
    { pair: '3+3', hanzi: '你好', pinyin: 'nǐ hǎo (→ní hǎo)', en: 'hello — sandhi!' },
    { pair: '3+4', hanzi: '米饭', pinyin: 'mǐfàn', en: 'cooked rice' },
    { pair: '4+1', hanzi: '大家', pinyin: 'dàjiā', en: 'everyone' },
    { pair: '4+2', hanzi: '电梯', pinyin: 'diàntí', en: 'lift / elevator' },
    { pair: '4+3', hanzi: '汉语', pinyin: 'Hànyǔ', en: 'Chinese language' },
    { pair: '4+4', hanzi: '再见', pinyin: 'zàijiàn', en: 'goodbye' },
];

// Difficult sound contrasts — minimal pairs for listening discrimination (Unit 16)
export interface SoundContrast { contrast: string; tip: string; a: { hanzi: string; pinyin: string; en: string }; b: { hanzi: string; pinyin: string; en: string }; }
export const SOUND_CONTRASTS: SoundContrast[] = [
    { contrast: 'sh vs s', tip: 'sh: tongue curled back · s: tongue flat. The #1 listening mistake.', a: { hanzi: '是', pinyin: 'shì', en: 'to be' }, b: { hanzi: '四', pinyin: 'sì', en: 'four' } },
    { contrast: 'ch vs c', tip: 'ch: retroflex + puff · c: flat tongue ts.', a: { hanzi: '吃', pinyin: 'chī', en: 'to eat' }, b: { hanzi: '次', pinyin: 'cì', en: 'time / occurrence' } },
    { contrast: 'zh vs z', tip: 'zh: curled back · z: flat dental dz.', a: { hanzi: '纸', pinyin: 'zhǐ', en: 'paper' }, b: { hanzi: '字', pinyin: 'zì', en: 'character' } },
    { contrast: 'b vs p', tip: 'b: no puff of air · p: strong puff.', a: { hanzi: '爸', pinyin: 'bà', en: 'dad' }, b: { hanzi: '怕', pinyin: 'pà', en: 'to fear' } },
    { contrast: 'd vs t', tip: 'd: no puff · t: strong puff.', a: { hanzi: '肚', pinyin: 'dù', en: 'belly' }, b: { hanzi: '兔', pinyin: 'tù', en: 'rabbit' } },
    { contrast: 'g vs k', tip: 'g: no puff · k: strong puff.', a: { hanzi: '歌', pinyin: 'gē', en: 'song' }, b: { hanzi: '渴', pinyin: 'kě', en: 'thirsty' } },
    { contrast: 'j vs q', tip: 'both tongue-forward: j voiced, q aspirated hiss.', a: { hanzi: '鸡', pinyin: 'jī', en: 'chicken' }, b: { hanzi: '七', pinyin: 'qī', en: 'seven' } },
    { contrast: 'x vs sh', tip: 'x: tongue FORWARD, lips spread · sh: tongue BACK.', a: { hanzi: '西', pinyin: 'xī', en: 'west' }, b: { hanzi: '十', pinyin: 'shí', en: 'ten' } },
    { contrast: 'n vs l', tip: 'n: air through the nose · l: air around the sides.', a: { hanzi: '你', pinyin: 'nǐ', en: 'you' }, b: { hanzi: '李', pinyin: 'lǐ', en: 'Li (surname)' } },
    { contrast: 'r vs l', tip: 'r: retroflex buzz, lips NOT rounded — not an English r.', a: { hanzi: '热', pinyin: 'rè', en: 'hot' }, b: { hanzi: '乐', pinyin: 'lè', en: 'happy' } },
    { contrast: 'an vs ang', tip: 'an ends with the tongue FORWARD · ang ends back, more open.', a: { hanzi: '班', pinyin: 'bān', en: 'class' }, b: { hanzi: '帮', pinyin: 'bāng', en: 'to help' } },
    { contrast: 'en vs eng', tip: 'en: forward n ending · eng: back ng ending.', a: { hanzi: '分', pinyin: 'fēn', en: 'minute' }, b: { hanzi: '风', pinyin: 'fēng', en: 'wind' } },
    { contrast: 'in vs ing', tip: 'in: forward · ing: back and slightly longer.', a: { hanzi: '心', pinyin: 'xīn', en: 'heart' }, b: { hanzi: '星', pinyin: 'xīng', en: 'star' } },
    { contrast: 'ü vs u', tip: 'ü: say "ee" with rounded lips · u: plain "oo".', a: { hanzi: '绿', pinyin: 'lǜ', en: 'green' }, b: { hanzi: '路', pinyin: 'lù', en: 'road' } },
];

// ── Characters: the stroke system (Phase 5 of the master syllabus) ───────────
export const BASIC_STROKES = [
    { hanzi: '横', pinyin: 'héng', en: 'horizontal stroke — write left → right' },
    { hanzi: '竖', pinyin: 'shù', en: 'vertical stroke — write top → bottom' },
    { hanzi: '撇', pinyin: 'piě', en: 'left-falling slash' },
    { hanzi: '捺', pinyin: 'nà', en: 'right-falling slash' },
    { hanzi: '点', pinyin: 'diǎn', en: 'dot' },
    { hanzi: '提', pinyin: 'tí', en: 'rising stroke (bottom-left → up-right)' },
    { hanzi: '折', pinyin: 'zhé', en: 'turning stroke (a bend, e.g. horizontal then down)' },
    { hanzi: '钩', pinyin: 'gōu', en: 'hook (a stroke that flicks at the end)' },
];

export const STROKE_ORDER_RULES = [
    { rule: 'Top → bottom', example: '三 sān: the three horizontals, top one first' },
    { rule: 'Left → right', example: '你 nǐ: 亻 before 尔' },
    { rule: 'Horizontal before vertical', example: '十 shí: the horizontal first, then the vertical' },
    { rule: 'Outside → inside', example: '月 yuè: the frame first' },
    { rule: 'Inside before closing', example: '回 huí: fill the inside, then seal the bottom' },
    { rule: 'Centre before symmetric sides', example: '小 xiǎo: the centre hook first' },
];

// ── What are characters? (Unit 17 — components, radicals, phono-semantic) ───
export const CHARACTER_INTRO = {
    intro: 'A character (汉字) is not a letter, and not always a word — it is a meaning-bearing unit. Most Chinese words are 1–2 characters: 人 rén = person, but 中 + 文 = 中文 Zhōngwén (Chinese language). Characters are built from reusable components — learn the components and thousands of characters become familiar combinations instead of random drawings.',
    radicals: [
        { radical: '氵', name: 'water (three-dot water)', appearsIn: '河 hé river · 湖 hú lake · 喝 hē drink' },
        { radical: '口', name: 'mouth / opening', appearsIn: '吃 chī eat · 叫 jiào to call · 唱 chàng to sing' },
        { radical: '亻', name: 'person', appearsIn: '你 nǐ you · 他 tā he · 们 men (plural)' },
        { radical: '心', name: 'heart / mind', appearsIn: '想 xiǎng to think · 忘 wàng to forget · 情qíng feeling' },
        { radical: '女', name: 'woman', appearsIn: '妈 mā mum · 姐 jiě older sister · 她 tā she' },
        { radical: '讠', name: 'speech / words', appearsIn: '说 shuō to speak · 读 dú to read · 话 huà speech' },
    ],
    phonetic: {
        hanzi: '妈',
        parts: '女 (woman → MEANING) + 马 mǎ (horse → SOUND)',
        result: 'mā = mum. One component carries the meaning family, the other tells you roughly how it sounds.',
        note: 'Roughly 80% of characters are phono-semantic compounds like this — one part for meaning, one part for sound. Once you know ~100 common components, new characters start explaining themselves.',
    },
};

// ── Vocabulary: themed sets (the syllabus's vocab phases 6/18/23) ────────────
// AI-generated per (level, topic) and cached in localStorage.
export const VOCAB_TOPICS: { id: string; label: string; hint: string }[] = [
    { id: 'essentials', label: 'HSK Core Words', hint: 'the absolute highest-frequency words for this HSK level — pronouns, key verbs, essential nouns and function words the exam repeats constantly' },
    { id: 'introductions', label: 'Introductions', hint: 'introducing yourself: names, nationalities, jobs, where you live, asking people about themselves' },
    { id: 'family', label: 'Family & People', hint: 'family members, relationships, describing people, talking about your family' },
    { id: 'food', label: 'Food & Drink', hint: 'food, drinks, meals, ordering in a restaurant, flavours, cooking' },
    { id: 'shopping', label: 'Shopping & Money', hint: 'buying things, prices, bargains, sizes, paying, shops and markets' },
    { id: 'transport', label: 'Transport & Directions', hint: 'buses, trains, taxis, asking and giving directions, locations, getting around a city' },
    { id: 'work', label: 'Work & Office', hint: 'jobs, workplaces, meetings, colleagues, career plans, professional life' },
    { id: 'home', label: 'Home & Daily Life', hint: 'housing, furniture, rooms, daily routines, chores, everyday objects' },
    { id: 'health', label: 'Health & Body', hint: 'body parts, being ill, seeing a doctor, medicine, healthy habits' },
    { id: 'travel', label: 'Travel', hint: 'trips, hotels, tickets, sightseeing, holidays, travel plans' },
    { id: 'tech', label: 'Technology & Internet', hint: 'phones, apps, the internet, social media, online life, modern gadgets' },
    { id: 'school', label: 'School & Study', hint: 'studying, classes, exams, university, teachers and students, learning a language' },
    { id: 'time-weather', label: 'Time & Weather', hint: 'dates, clock times, seasons, weather, scheduling, making appointments' },
    { id: 'feelings', label: 'Feelings & Opinions', hint: 'emotions, liking and disliking, giving opinions, agreeing and disagreeing' },
];

// ── The Cheat Sheet — one compact reference for everything essential ─────────
export const CHEAT_SHEET: { title: string; items: { label: string; detail: string; say?: string }[] }[] = [
    { title: 'Tones', items: [
        { label: '1st ā', detail: 'high & flat ─────' },
        { label: '2nd á', detail: 'rising ╱ (like "Really?")' },
        { label: '3rd ǎ', detail: 'low dip ╲╱ — don\'t over-exaggerate' },
        { label: '4th à', detail: 'sharp fall ╲' },
        { label: 'neutral a', detail: 'light & unstressed — 妈妈 māma' },
    ]},
    { title: 'Tone sandhi', items: [
        { label: '3rd + 3rd', detail: 'say 2nd + 3rd — nǐ hǎo → ní hǎo' },
        { label: '一 yī', detail: 'yí before a 4th tone, yì otherwise — 一个 yí ge' },
        { label: '不 bù', detail: 'becomes bú before a 4th tone — 不是 bú shì' },
    ]},
    { title: 'Word order', items: [
        { label: 'S + V + O', detail: '我吃饭 Wǒ chī fàn — the verb NEVER conjugates' },
        { label: 'Time first', detail: '我明天去 — time comes before the verb' },
        { label: 'Past', detail: 'time word + verb + 了: 我昨天吃了' },
        { label: 'Future', detail: '要…了: 我明天要去' },
        { label: 'Question', detail: 'statement + 吗 ma: 你好吗？' },
        { label: 'Negation', detail: '不 bù (don\'t/won\'t) vs 没 méi (didn\'t / don\'t have)' },
    ]},
    { title: 'Particles', items: [
        { label: '了 le', detail: 'completed action — 吃了 chī le' },
        { label: '过 guo', detail: 'past experience — 去过 qù guo (have been)' },
        { label: '着 zhe', detail: 'ongoing state — 穿着 chuān zhe (wearing)' },
        { label: '的 de', detail: 'possession / description — 我的书 my book' },
        { label: '得 de', detail: 'degree after a verb — 说得快 speaks fast' },
        { label: '地 de', detail: 'manner before a verb — 慢慢地 slowly' },
        { label: '吗 / 呢 / 吧', detail: 'yes-no? / follow-up? / suggestion' },
    ]},
    { title: 'Measure words', items: [
        { label: '个 gè', detail: 'the default — 一个人 one person' },
        { label: '本 běn', detail: 'books — 一本书' },
        { label: '张 zhāng', detail: 'flat things — 一张纸 a paper' },
        { label: '杯 bēi', detail: 'cups — 一杯水 a glass of water' },
        { label: '件 jiàn', detail: 'clothes / matters — 一件衣服' },
        { label: '只 zhī', detail: 'animals — 一只猫 a cat' },
        { label: '条 tiáo', detail: 'long things — 一条路 a road' },
        { label: '块 kuài', detail: 'money / yuan — 五块钱 5 kuai' },
    ]},
    { title: 'Question words', items: [
        { label: '什么 shénme', detail: 'what' },
        { label: '谁 shéi', detail: 'who' },
        { label: '哪里 / 哪儿', detail: 'nǎlǐ / nǎr — where' },
        { label: '什么时候', detail: 'shénme shíhou — when' },
        { label: '为什么', detail: 'wèishénme — why' },
        { label: '怎么 zěnme', detail: 'how' },
        { label: '多少 duōshao', detail: 'how many / how much' },
    ]},
    { title: 'Connectors', items: [
        { label: '因为…所以…', detail: 'because… therefore…' },
        { label: '虽然…但是…', detail: 'although… but…' },
        { label: '不但…而且…', detail: 'not only… but also…' },
        { label: '如果…就…', detail: 'if… then…' },
        { label: '除了…以外', detail: 'apart from… (以外)' },
        { label: '要么…要么…', detail: 'either… or…' },
    ]},
    { title: 'Comparing', items: [
        { label: '比 bǐ', detail: 'A 比 B + adjective — A is more … than B' },
        { label: '更 gèng', detail: 'even more' },
        { label: '最 zuì', detail: 'the most' },
        { label: '一样 yíyàng', detail: 'the same — 和…一样' },
    ]},
    { title: 'Numbers', items: [
        { label: '1–10', detail: '一 二 三 四 五 六 七 八 九 十' },
        { label: '11–19', detail: '十 + digit — 十一 shíyī eleven' },
        { label: 'Tens', detail: 'digit + 十 — 二十 èrshí twenty' },
        { label: 'Big units', detail: '百 hundred · 千 thousand · 万 10,000' },
        { label: 'Phone numbers', detail: 'read digit by digit — 一三九… (1 yāo for 1)' },
    ]},
    { title: 'Time words', items: [
        { label: '今天 / 明天 / 昨天', detail: 'today / tomorrow / yesterday' },
        { label: '现在 xiànzài', detail: 'now' },
        { label: '早上 / 中午 / 晚上', detail: 'morning / noon / evening' },
        { label: '…点…分', detail: '…diǎn…fēn — 3:05 三点零五' },
        { label: '星期一…星期天', detail: 'Monday… Sunday' },
    ]},
    { title: 'Survival phrases', items: [
        { label: '你好 nǐ hǎo', detail: 'hello', say: '你好' },
        { label: '谢谢 xièxie', detail: 'thank you', say: '谢谢' },
        { label: '对不起 duìbuqǐ', detail: 'sorry', say: '对不起' },
        { label: '多少钱？', detail: 'duōshao qián — how much?', say: '多少钱' },
        { label: '…在哪儿？', detail: '… zài nǎr — where is…?', say: '厕所在哪儿' },
        { label: '我不明白', detail: 'Wǒ bù míngbai — I don\'t understand', say: '我不明白' },
        { label: '请再说一遍', detail: 'please say it again', say: '请再说一遍' },
        { label: '我要这个', detail: 'Wǒ yào zhège — I want this one', say: '我要这个' },
    ]},
];
