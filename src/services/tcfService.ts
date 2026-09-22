// TCF Canada preparation — AI generation + exam constants.
// Format verified against France Éducation international (Sep 2026):
// Listening 39 MCQ / 35 min (each audio once) · Reading 39 MCQ / 60 min ·
// Writing 3 tasks / 60 min (/20 each) · Speaking 3 tasks / 12 min.
import type { Language } from '../store/useAppStore';
import { chat, parseJSON } from './aiService';

export type TcfLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// Official TCF Canada tasks (France Éducation international)
export const TCF_WRITING_TASKS = [
    {
        id: 'w1',
        label: 'Task 1 — Short message',
        guide: 'Write a short message/letter of at least 60 words. Friendly register. ~10 minutes.',
        minWords: 60,
        minutes: 10,
        prompt: 'Write a message to a friend inviting them to your birthday party next Saturday. Tell them the day, the time, the place, and what you have planned.',
    },
    {
        id: 'w2',
        label: 'Task 2 — Article / experience',
        guide: 'Write an article/blog post or describe an experience of 120+ words. ~15 minutes.',
        minWords: 120,
        minutes: 15,
        prompt: 'You moved to a new city recently. Write an article for your blog describing your new neighbourhood, what you like about it, and one thing you would change.',
    },
    {
        id: 'w3',
        label: 'Task 3 — Compare two viewpoints',
        guide: 'Compare two documents/viewpoints and give your opinion in 120–180 words. Formal register. ~25 minutes.',
        minWords: 120,
        maxWords: 180,
        minutes: 25,
        prompt: 'Document A says remote work is better for families. Document B says working in an office builds better careers. Compare both viewpoints and say which one you find more convincing, giving your reasons.',
    },
];

export const TCF_SPEAKING_TASKS = [
    {
        id: 's1',
        label: 'Task 1 — Interview (no preparation)',
        guide: 'Answer the examiner\'s questions about yourself. Speak continuously for ~2 minutes.',
        seconds: 120,
        prompt: 'The examiner asks: Please introduce yourself. Tell me about your family, your work or studies, and why you are learning French.',
    },
    {
        id: 's2',
        label: 'Task 2 — Situation & argumentation',
        guide: 'You are in a situation — ask questions, make requests, convince. ~5 minutes 30.',
        seconds: 330,
        prompt: 'Situation: You saw an advertisement for an apartment to rent. Call the landlord: ask about the rent, the neighbourhood, and the conditions. Then convince them you are a great tenant even though you have a cat and no job history in Canada.',
    },
    {
        id: 's3',
        label: 'Task 3 — Opinion',
        guide: 'Present and defend your opinion on a topic with examples and a counter-argument. ~4 minutes 30.',
        seconds: 270,
        prompt: 'Give your opinion: "New immigrants should prioritise learning the official language before looking for their dream job." Do you agree? Use the framework: opinion → reason → example → counterpoint → response → conclusion.',
    },
];

// Approximate official score→NCLC conversion (France Éducation international bands)
export const NCLC_BANDS = [
    { nclc: '10+', min: 587, label: 'NCLC 10+' },
    { nclc: '9', min: 549, label: 'NCLC 9' },
    { nclc: '8', min: 523, label: 'NCLC 8' },
    { nclc: '7', min: 458, label: 'NCLC 7' },
    { nclc: '6', min: 394, label: 'NCLC 6' },
    { nclc: '5', min: 361, label: 'NCLC 5' },
    { nclc: '4', min: 331, label: 'NCLC 4' },
];

// Map a practice % (0-100) to an approximate score + NCLC label (labelled as estimate)
export const practiceToScore = (pct: number): { score: number; nclc: string } => {
    const score = Math.round(100 + (pct / 100) * 599);
    const band = NCLC_BANDS.find(b => score >= b.min);
    return { score, nclc: band ? band.nclc : '<4' };
};

// ── Vocabulary: TCF Canada themed domains (master curriculum Phase 33) ──────
// AI-generated per (level, topic) and cached in localStorage.
export const TCF_VOCAB_TOPICS: { id: string; label: string; hint: string }[] = [
    { id: 'core', label: 'TCF Core Words', hint: 'the absolute highest-frequency words for this CEFR level — pronouns, key verbs, essential nouns and function words the exam repeats constantly' },
    { id: 'housing', label: 'Housing', hint: 'apartments, rent, leases, landlords, furnishing, utilities, searching for housing in Canada' },
    { id: 'employment', label: 'Employment', hint: 'jobs, interviews, CVs, workplaces, salaries, contracts, work permits, career plans' },
    { id: 'education', label: 'Education', hint: 'school, university, diplomas, exams, studying, enrolling, student life' },
    { id: 'immigration', label: 'Immigration', hint: 'immigrating to Canada: visas, permanent residence, applications, customs, integration, citizenship' },
    { id: 'transport', label: 'Transportation', hint: 'public transit, driving, tickets, commuting, airports, getting around a Canadian city' },
    { id: 'environment', label: 'Environment', hint: 'climate, pollution, recycling, energy, protecting nature, weather events' },
    { id: 'health', label: 'Health', hint: 'the body, illness, doctors, hospitals, health insurance, appointments, healthy habits' },
    { id: 'tech', label: 'Technology', hint: 'phones, computers, the internet, apps, social media, AI, online life' },
    { id: 'family', label: 'Family & Society', hint: 'family members, relationships, community, social life, helping others' },
    { id: 'government', label: 'Government & Services', hint: 'government, public services, taxes, rights, administration, dealing with offices' },
    { id: 'culture', label: 'Culture & Media', hint: 'culture, cinema, music, books, news, press, weekends and leisure, [Canada] cultural context' },
    { id: 'economy', label: 'Economy & Money', hint: 'money, banking, prices, budgeting, shopping, consumer life, spending and saving' },
    { id: 'travel', label: 'Tourism & Travel', hint: 'travelling, hotels, holidays, sightseeing, reservations, travel problems' },
    { id: 'daily', label: 'Daily Life', hint: 'everyday routines, food, cooking, errands, appointments, weather, neighbours' },
];

// ── Curriculum syllabus (per the master teaching framework) ───────────────────
export const TCF_SYLLABUS: Record<TcfLevel, { title: string; slug: string; focus: string }[]> = {
    A1: [
        { title: 'Greetings & Introductions', slug: 'greetings', focus: 'Bonjour/salut register, introducing yourself, the verbs être and avoir' },
        { title: 'Numbers, Dates & Time', slug: 'numbers', focus: 'Counting, telling time, days, months, asking when' },
        { title: 'Family & People', slug: 'family', focus: 'Family vocabulary, possessives (mon/ma/mes), descriptions with adjectives' },
        { title: 'Food & Everyday Objects', slug: 'food', focus: 'Food words, partitive articles (du/de la/des), ordering simply' },
        { title: 'Daily Routine (Present Tense)', slug: 'routine', focus: 'Present tense -er verbs, reflexive basics, saying when you do things' },
        { title: 'Questions & Negation', slug: 'questions', focus: 'Est-ce que, inversion basics, ne...pas' },
    ],
    A2: [
        { title: 'Passé Composé', slug: 'passe-compose', focus: 'Talking about the past with avoir/être, agreement rules' },
        { title: 'Imparfait', slug: 'imparfait', focus: 'Describing the past, childhood memories, habits' },
        { title: 'Futur Proche & Futur Simple', slug: 'futur', focus: 'Plans and predictions' },
        { title: 'Shopping & Money', slug: 'shopping', focus: 'Prices, quantities, comparing, roleplay at a store' },
        { title: 'Travel & Transport', slug: 'travel', focus: 'Tickets, directions, accommodation vocabulary' },
        { title: 'Work & Daily Life', slug: 'work', focus: 'Jobs, routine descriptions, invitations and requests' },
    ],
    B1: [
        { title: 'Passé Composé vs Imparfait', slug: 'passe-vs-imparfait', focus: 'Choosing the right past tense — the classic TCF challenge' },
        { title: 'Conditional & Politeness', slug: 'conditionnel', focus: 'Would/should, polite requests, hypotheticals' },
        { title: 'Relative Pronouns', slug: 'relatifs', focus: 'qui, que, dont, où — connecting ideas' },
        { title: 'Immigration & Settlement', slug: 'immigration', focus: 'TCF Canada themes: documents, housing, services, community' },
        { title: 'Opinions & Arguments', slug: 'opinions', focus: 'Giving reasons, cause/consequence connectors' },
        { title: 'Reported Speech', slug: 'discours', focus: 'Saying what someone else said' },
    ],
    B2: [
        { title: 'Subjunctive Masterclass', slug: 'subjonctif', focus: 'Il faut que, doubts, emotions, advanced triggers' },
        { title: 'Formal vs Informal Register', slug: 'registre', focus: 'Choosing the right French for the situation (exam register!)' },
        { title: 'Structured Argumentation', slug: 'argumentation', focus: 'ORECC framework, counter-arguments, connectors' },
        { title: 'Passive Voice & Complex Clauses', slug: 'passif', focus: 'Professional and written French structures' },
        { title: 'Canadian Society Themes', slug: 'societe', focus: 'Healthcare, employment, environment — essay-ready vocabulary' },
    ],
    C1: [
        { title: 'Idioms & Register Control', slug: 'idiomes', focus: 'Natural French, nuance, implicit meaning' },
        { title: 'Synthesis & Critical Reading', slug: 'synthese', focus: 'Summarising multiple documents' },
        { title: 'Formal Speaking & Debate', slug: 'debat', focus: 'Spontaneous sophisticated discourse' },
    ],
    C2: [
        { title: 'Stylistic Nuance', slug: 'style', focus: 'Precision, flexibility, subtle registers' },
        { title: 'Literary & Journalistic French', slug: 'litteraire', focus: 'Advanced authentic material' },
    ],
};

// ── Lesson generation (follows the master lesson structure — LONG & DETAILED) ─
export interface TcfLesson {
    title: string;
    objective: string;
    vocabulary: { fr: string; en: string; gender?: string; example?: { fr: string; en: string }; related?: { fr: string; en: string }[] }[];
    pronunciation: { fr: string; approx: string; en: string }[];
    grammar: { rule: string; explanation: string; examples: { fr: string; en: string; breakdown: string[] }[]; commonMistakes: string[] };
    transformations: { type: string; fr: string; en: string }[];
    sentenceBuilding: { fr: string; en: string }[];
    practice: { instruction: string; question: string; answer: string }[];
    translationPractice: { en: string; fr: string }[];
    reverseTranslation: { fr: string; en: string }[];
    register: { informal: string; neutral: string; formal: string };
    culture: string;
    freeProduction: string;
    miniTest: { question: string; options: string[]; answer: string }[];
    review: string[];
}

export const generateTcfLesson = async (
    level: TcfLevel,
    topicTitle: string,
    focus: string,
    language: Language = 'French'
): Promise<TcfLesson> => {
    const system = `You are an expert French teacher creating a COMPLETE, LONG, DETAILED lesson for the TCF Canada exam. The student is an ENGLISH speaker at CEFR ${level}. This lesson is the student's main study material — it must be thorough enough to learn from alone. Do NOT be brief; depth and breadth are the requirement.

ABSOLUTE RULES:
- Every French sentence, phrase and word MUST be immediately followed by its English translation.
- For every important grammar example, include a word-by-word breakdown array (["je = I", "parle = speak", ...]).
- Teach French STRUCTURE, never word-for-word English substitution — when French constructs an idea differently from English (e.g. "J'ai besoin d'aide" = "I have need of help"), explain WHY.
- Explain the reason behind every rule; never just state it.
- Do not teach content above ${level} level, but be exhaustive WITHIN it.
- Where Canadian/immigration context is useful (work, housing, services), include it and label it [Canada].

Return ONLY valid JSON with ALL of these fields, fully populated:
{
 "title":"lesson title",
 "objective":"what the learner will be able to DO after this lesson",
 "vocabulary":[12-16 items, each {"fr":"word/phrase","en":"English","gender":"FOR EVERY NOUN include 'masculine' or 'feminine' (never omit for nouns); omit for verbs/phrases","example":{"fr":"example sentence using it","en":"English"},"related":[{"fr":"related word","en":"meaning"}]} — include related words for at least 6 items],
 "pronunciation":[4-6 items {"fr":"word/phrase","approx":"simple honest English approximation (admit when imperfect)","en":"meaning"}],
 "grammar":{"rule":"the rule in one line","explanation":"4-6 sentences: the rule, the structure, WHY French does it this way, contrast with English","examples":[5-6 items {"fr":"example","en":"English","breakdown":["word = meaning", ...]} — vary: statement, negative, question, plural...],"commonMistakes":[3-4 items "the mistake English speakers make + the correct pattern"]},
 "transformations":[7-8 items showing the KEY verb of the lesson transformed: {"type":"Positive|Negative|Past|Past negative|Future|Future negative|Conditional|Question","fr":"transformed sentence","en":"English"} — all forms of the same core sentence],
 "sentenceBuilding":[4-5 items from very short to fully expanded, each {"fr":"...","en":"..."}],
 "practice":[6 exercises {"instruction":"what to do (conjugate/transform/fill in)","question":"exercise in French","answer":"the answer"}] — progress from easy to harder,
 "translationPractice":[6 items EN→FR {"en":"English sentence","fr":"correct French"}],
 "reverseTranslation":[4 items FR→EN {"fr":"French sentence","en":"English"}],
 "register":{"informal":"how this topic is expressed casually with friends, with an example","neutral":"the everyday standard version","formal":"the professional/exam version with an example"},
 "culture":"a short cultural or [Canada]-context note connected to the lesson topic",
 "freeProduction":"a personal production task with 3-4 guiding questions the student should answer",
 "miniTest":[5 MCQs {"question":"question","options":["a","b","c","d"],"answer":"correct option"}] covering different parts of the lesson,
 "review":["2-3 items to review from earlier in the level, tied to this lesson"]
}
Do not omit any field. Do not shorten. This is the student's textbook chapter.`;
    const raw = await chat(system, `Create the complete ${level} TCF Canada lesson: "${topicTitle}". Focus: ${focus}.`, 8000, true);
    return parseJSON(raw);
};

// ── Listening exercise ────────────────────────────────────────────────────────
export interface TcfListening {
    scenario: string;
    lines: { speaker: string; fr: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateTcfListening = async (level: TcfLevel, language: Language = 'French'): Promise<TcfListening> => {
    const system = `You create TCF Canada LISTENING practice. TCF Canada listening: short authentic-style recordings (announcements, dialogues, interviews, voicemails), each heard ONCE, difficulty A1→C2.
Create a realistic recording script for a ${level} learner. Return ONLY valid JSON:
{"scenario":"one line describing the situation (e.g. 'A voicemail from the landlord')","lines":[{"speaker":"Name or Role","fr":"what they say","en":"English translation"}],"questions":[{"question":"MCQ in ENGLISH about main idea, details, numbers, speaker intention or inference","options":["4 options"],"answer":"correct option"}]}
Rules:
- 5-7 short lines of natural spoken French for the recording.
- 4 questions testing DIFFERENT skills: main idea, a detail (number/time/place), speaker intention, and one inference.
- Questions and options in ENGLISH (they test comprehension of the French audio).`;
    const raw = await chat(system, `Create a ${level} TCF Canada listening exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Reading exercise ──────────────────────────────────────────────────────────
export interface TcfReading {
    title: string;
    paragraphs: { fr: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateTcfReading = async (level: TcfLevel, language: Language = 'French'): Promise<TcfReading> => {
    const system = `You create TCF Canada READING practice. TCF Canada reading: 39 progressive MCQs (announcements → articles), testing skimming, scanning, detail, paraphrase and inference.
Create one realistic document for a ${level} learner. Return ONLY valid JSON:
{"title":"document type + title (e.g. 'Notice — Building rules')","paragraphs":[{"fr":"the French text","en":"English translation (hidden until after)"}],"questions":[{"question":"MCQ in ENGLISH","options":["4 options"],"answer":"correct option"}]}
Rules:
- 3-4 short paragraphs of authentic-style French writing (notice, ad, email, article...).
- 4 questions testing DIFFERENT skills: main idea, detail location, paraphrase recognition, inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create a ${level} TCF Canada reading exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Writing evaluation ────────────────────────────────────────────────────────
export interface TcfWritingFeedback {
    estimatedLevel: string;
    score20: number;
    strengths: string[];
    corrections: { original: string; corrected: string; why: string }[];
    improvements: string[];
    taskCompletion: string;
}
export const evaluateTcfWriting = async (
    taskLabel: string, taskGuide: string, minWords: number, text: string, level: TcfLevel
): Promise<TcfWritingFeedback> => {
    const system = `You are a TCF Canada examiner evaluating a practice submission for ${taskLabel} (${taskGuide}). Target level of the student: ${level}. The official tasks are scored /20.
Grade strictly but encouragingly. Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS text","score20":0-20,"strengths":["2-3 things done well"],"corrections":[{"original":"the student's exact wrong sentence/phrase","corrected":"the corrected version","why":"the grammar reason in English"}],"improvements":["3-4 concrete prioritised improvements for the NEXT attempt, tied to the TCF criteria: task completion, coherence, vocabulary, grammar, spelling"],"taskCompletion":"did the text answer the task, use the right register and respect the length? Be specific."}
Rules: correct EVERY meaningful error (grammar, gender, articles, agreement, prepositions, word order, spelling/accents). Use the format your/why. Never invent an official score — this is a practice estimate; refer to it as an estimate.`;
    const raw = await chat(system, `Student submission (min ${minWords} words):\n\n${text}`, 3000, true);
    return parseJSON(raw);
};

// ── Speaking evaluation ───────────────────────────────────────────────────────
export interface TcfSpeakingFeedback {
    estimatedLevel: string;
    strengths: string[];
    transcriptCorrections: { original: string; corrected: string; why: string }[];
    fluencyTips: string[];
    nextAttempt: string;
}
export const evaluateTcfSpeaking = async (
    taskLabel: string, taskGuide: string, taskPrompt: string, transcript: string, level: TcfLevel
): Promise<TcfSpeakingFeedback> => {
    const system = `You are a TCF Canada examiner evaluating a SPOKEN practice attempt (transcribed by speech-to-text, so ignore spelling — judge grammar and vocabulary from the words). Task: ${taskLabel} — ${taskGuide}. The prompt was: "${taskPrompt}". Target level: ${level}.
Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS performance","strengths":["2-3 strengths"],"transcriptCorrections":[{"original":"what was said (from transcript)","corrected":"better French","why":"reason in English"}],"fluencyTips":["2-3 tips on flow, speed, connectors for the TCF speaking format"],"nextAttempt":"one concrete thing to do differently next time"}
Correct grammar from the transcript. This is a practice estimate, never an official score.`;
    const raw = await chat(system, `Transcript of the student's spoken answer:\n\n${transcript || '(silence or nothing transcribed)'}`, 2500, true);
    return parseJSON(raw);
};
