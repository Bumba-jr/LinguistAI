// JLPT preparation (Japanese-Language Proficiency Test, Japan Foundation &
// JEES) — AI generation + exam constants. Mirror of italianService.ts.
// Framework verified against JLPT published structure (Sep 2026): N5→N1,
// three scored sections (Language Knowledge, Reading, Listening), no
// speaking/writing; pass needs the section minimum (19/60-style) everywhere.
import type { Language } from '../store/useAppStore';
import { chat, parseJSON } from './aiService';

export type JlptLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// CEFR slot → JLPT level (JF Standard mapping).
export const JLPT_OF_LEVEL: Record<JlptLevel, string> = {
    A1: 'JLPT N5', A2: 'JLPT N4', B1: 'JLPT N3', B2: 'JLPT N2', C1: 'JLPT N1', C2: 'JLPT N1+ (beyond the test)',
};

// Official test times per JLPT level (JLPT, Sep 2026).
export interface JlptLevelFormat {
    knowledge: string;
    reading: string;
    listening: string;
    note: string;
}
export const JLPT_LEVEL_FORMATS: Record<JlptLevel, JlptLevelFormat> = {
    A1: { knowledge: 'Vocabulary — 20 min', reading: 'Grammar + Reading — 40 min', listening: 'Listening — 30 min', note: 'N5 · 3 sections · scored /60 each with section minimums' },
    A2: { knowledge: 'Vocabulary — 25 min', reading: 'Grammar + Reading — 55 min', listening: 'Listening — 35 min', note: 'N4 · 3 sections · scored /60 each with section minimums' },
    B1: { knowledge: 'Vocabulary — 30 min', reading: 'Grammar + Reading — 70 min', listening: 'Listening — 40 min', note: 'N3 · the bridge level · sections scaled to /60 with minimums' },
    B2: { knowledge: 'Language Knowledge + Reading — 105 min', reading: '(combined with knowledge)', listening: 'Listening — 50 min', note: 'N2 · 2 timed blocks · understanding Japanese in a broad range of contexts' },
    C1: { knowledge: 'Language Knowledge + Reading — 110 min', reading: '(combined with knowledge)', listening: 'Listening — 55 min', note: 'N1 · 2 timed blocks · advanced, dense, implicit Japanese' },
    C2: { knowledge: 'Beyond JLPT N1: keigo mastery, literary and business Japanese', reading: 'authentic newspapers, essays, literature', listening: 'natural-speed speech with implied meaning', note: 'JLPT N1 is the last step — C2 is the JF Standard target beyond the test' },
};

export const JLPT_PASS_NOTE = 'JLPT has NO speaking or writing sections — only Language Knowledge, Reading and Listening. Every scored section has a minimum (19/60-style): one brilliant section cannot rescue a failed one. This portal trains speaking and writing TOO (Track A: real Japanese) alongside the exam (Track B).';

// Rough practice % → CEFR level estimate.
export const pctToCefr = (pct: number): string =>
    pct >= 92 ? 'C2' : pct >= 82 ? 'C1' : pct >= 68 ? 'B2' : pct >= 52 ? 'B1' : pct >= 38 ? 'A2' : pct >= 20 ? 'A1' : '<A1';
export const cefrIndex = (l: string) => ['<A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(l);

// ── Vocabulary: JLPT-themed domains ──────────────────────────────────────────
export const JLPT_VOCAB_TOPICS: { id: string; label: string; hint: string }[] = [
    { id: 'core', label: 'Core Words', hint: 'the absolute highest-frequency words for this JLPT band — verbs, nouns, adjectives, adverbs and function words the test repeats constantly. Every word with kanji, kana reading, romaji and English.' },
    { id: 'daily', label: 'Daily Life', hint: 'everyday routines, food, cooking, errands, appointments, weather, the house, family life in Japan' },
    { id: 'family', label: 'Family & People', hint: 'family terms (with the humble/polite variants for your own vs others\u2019 family), relationships, personality' },
    { id: 'food', label: 'Food & Restaurants', hint: 'food, drinks, ordering, the menu, Japanese food culture (itadakimasu, osusume), counters for food' },
    { id: 'travel', label: 'Travel & Transport', hint: 'trains (densha, shinkansen), tickets, hotels, directions, stations, Japanese transport culture, travel problems' },
    { id: 'shopping', label: 'Shopping & Money', hint: 'shops, prices, the konbini, counting with counters, payments, department stores, omotenashi service culture' },
    { id: 'work', label: 'Work & School', hint: 'jobs, offices, meetings, school, university, exams, Japanese workplace hierarchy language' },
    { id: 'health', label: 'Health & Body', hint: 'the body, illness, doctors, hospitals, pharmacies, appointments, healthy habits' },
    { id: 'tech', label: 'Technology & Media', hint: 'phones, computers, the internet, apps, social media, news, katakana loanwords in tech' },
    { id: 'environment', label: 'Nature & Weather', hint: 'weather, seasons (the four seasons matter culturally), nature, disasters (Japanese weather vocabulary is rich)' },
    { id: 'culture', label: 'Culture & Society', hint: 'festivals (matsuri), traditions, etiquette, honorific culture, regional identity, modern Japanese society' },
    { id: 'onomatopoeia', label: 'Onomatopoeia', hint: 'giongo and gitaigo — doki-doki, waku-waku, pika-pika — the sound/manner words that make Japanese vivid and natural' },
    { id: 'kanji', label: 'Kanji Fundamentals', hint: 'the most essential kanji for this band with on\u2019yomi, kun\u2019yomi, stroke-meaning logic and common compounds (numbers, days, people, time, places)' },
    { id: 'keigo', label: 'Keigo & Politeness', hint: 'teineigo, sonkeigo and kenjougo essentials — irassharu, meshiagaru, ukagau, moushiageru, and productive o~ni naru / go~itashimasu patterns — B1+' },
];

// ── Curriculum syllabus (per the master A0→C2 framework) ─────────────────────
export const JLPT_SYLLABUS: Record<JlptLevel, { title: string; slug: string; focus: string }[]> = {
    A1: [
        { title: 'Hiragana & the Sound System', slug: 'hiragana', focus: 'the full kana table, dakuten, small tsu, long vowels — obasan vs obaasan' },
        { title: 'Katakana & Loanwords', slug: 'katakana', focus: 'katakana set, the ー long mark, foreign sounds (ファ ティ ウォ), reading menus and names' },
        { title: 'Particles I: は を に で', slug: 'particles1', focus: 'topic, object, destination/time, action location — SOV word order' },
        { title: 'です and ある/いる', slug: 'desu-aru-iru', focus: 'the copula family, existence verbs, これ/それ/あれ' },
        { title: 'Present, Past & Adjectives', slug: 'tenses-adjectives', focus: 'ます forms, い vs な adjectives, negative and past of everything' },
        { title: 'Numbers, Counters & Time', slug: 'counters', focus: 'counting with 人/本/枚/回/階, telling time, days, や ~ など' },
    ],
    A2: [
        { title: 'The て-Form Master System', slug: 'te-form', focus: 'forming te-forms for all three groups; requests, progressive, permission, linking' },
        { title: 'Particles II: が の と も', slug: 'particles2', focus: 'subject particle, possession, quoting, も — and は vs が properly' },
        { title: 'Plain Form & Casual Speech', slug: 'plain-form', focus: 'dictionary/plain forms, casual negative and past, mixing registers' },
        { title: 'Past Experience & Intentions', slug: 'koto-tsumori', focus: 'たことがある, つもり, でしょう, ようと思う' },
        { title: 'Giving, Receiving & Comparisons', slug: 'ageru-kureru', focus: 'あげる/くれる/もらう, より/のほうが/いちばん' },
        { title: 'Conditionals & Daily Kanji', slug: 'conditionals', focus: 'たら/ば/と conditionals, ~とき, N4 kanji by domain' },
    ],
    B1: [
        { title: 'Passive, Causative & Causative-Passive', slug: 'ukemi', focus: 'られる, させる, させられる — the three-wall system' },
        { title: 'Transitivity Pairs', slug: 'taidoushi', focus: '開く/開ける, 出る/出す — the intransitive/transitive web' },
        { title: 'Conditionals Masterclass', slug: 'jouken', focus: 'たら vs ば vs なら vs と — choosing the right if' },
        { title: 'Nominalisation: の and こと', slug: 'meishika', focus: 'verb nominalisation, ことが好き, のをやめる' },
        { title: 'N3 Kanji & Newspaper Japanese', slug: 'n3-kanji', focus: 'compound readings, formal vocabulary, the けいご doorway' },
        { title: 'Reported Speech & Indirect Style', slug: 'houkoku', focus: 'と言っていた, そうだ, らしい — hearsay and reporting' },
    ],
    B2: [
        { title: 'Keigo Masterclass', slug: 'keigo', focus: '尊敬語/謙譲語 systems: いらっしゃる, 召し上がる, 伺う, お〜になる, ご〜いただく' },
        { title: 'N2 Grammar Patterns', slug: 'n2-bunpou', focus: '〜わけではない, 〜にもかかわらず, 〜次第, formal discourse markers' },
        { title: 'News & Business Japanese', slug: 'news', focus: 'newspaper vocabulary, Sino-Japanese compounds, business email conventions' },
        { title: 'Long-Reading Strategy', slug: 'dokkai', focus: 'argument tracking, author attitude, implicit information' },
        { title: 'Idioms & Collocations', slug: 'idioms', focus: 'four-kanji compounds, body-part idioms, natural collocations' },
    ],
    C1: [
        { title: 'N1 Grammar & Literary Style', slug: 'n1-bunpou', focus: 'classical remnants, literary connectors, dense written Japanese' },
        { title: 'Advanced Kanji & Readings', slug: 'n1-kanji', focus: 'uncommon readings, context-dependent kanji, ateji and names' },
        { title: 'Academic & Professional Japanese', slug: 'academic', focus: 'papers, reports, presentations, formal keigo at full depth' },
        { title: 'Implicit Meaning & Nuance', slug: 'nuance', focus: 'author intention, sarcasm, indirect refusals, register shifts' },
    ],
    C2: [
        { title: 'Beyond N1: Mastery', slug: 'mastery', focus: 'literature, wordplay, historical expressions, regional variety comprehension' },
        { title: 'Dialect & Variation', slug: 'hougen', focus: 'Kansai Japanese, youth language, internet Japanese — comprehension skill' },
    ],
};

// ── Per-level writing & speaking tasks (Track A — real Japanese) ─────────────
interface JlptWritingTask { id: string; label: string; guide: string; minWords: number; maxWords?: number; minutes: number; prompt: string }
interface JlptSpeakingTask { id: string; label: string; guide: string; seconds: number; prompt: string }

export const JLPT_WRITING_TASKS_BY_LEVEL: Record<JlptLevel, JlptWritingTask[]> = {
    A1: [
        { id: 'w1', label: 'Task 1 — Self-introduction card', guide: 'Write a short self-introduction in Japanese (kana + basic kanji). ~6 sentences.', minWords: 20, maxWords: 60, minutes: 12, prompt: 'Write a self-introduction in Japanese (hiragana with basic kanji): name, country, job/school, family, and one hobby. Use です and simple particles. About 6 short sentences.' },
        { id: 'w2', label: 'Task 2 — Daily routine', guide: 'Describe your day with time expressions. ~6 sentences.', minWords: 20, maxWords: 60, minutes: 12, prompt: 'Describe your daily routine in Japanese: when you get up (に), where you work/study (で), what you eat and drink (を), and when you sleep. Use the particles you learned.' },
    ],
    A2: [
        { id: 'w1', label: 'Task 1 — A message to a friend', guide: 'Write an informal message in plain or polite form. ~8 sentences.', minWords: 40, maxWords: 80, minutes: 15, prompt: 'Write a message to your Japanese friend: thank them for last weekend, describe what you did (て-form linking + past tense), and propose a plan for next week.' },
        { id: 'w2', label: 'Task 2 — My town', guide: 'Describe your town using ある/いる and adjectives. ~8 sentences.', minWords: 40, maxWords: 80, minutes: 15, prompt: 'Describe your town: what there is (があります), who lives there (がいます), what is convenient (便利です) and what is not (あまり〜ない).' },
    ],
    B1: [
        { id: 'w1', label: 'Task 1 — Experience essay', guide: 'Tell a story with て-form linking and past narration. ~150–250 characters.', minWords: 60, maxWords: 120, minutes: 25, prompt: 'Write about a memorable experience in Japan or with Japanese (a trip, a festival, a meal): what happened (past narration), how you felt, and why it was memorable. Use て-form chains and た-forms naturally. 150–250 characters.' },
        { id: 'w2', label: 'Task 2 — Opinion message', guide: 'Give an opinion with reasons using と思います. ~150–250 characters.', minWords: 60, maxWords: 120, minutes: 25, prompt: 'Write your opinion on: "Should smartphones be banned in schools?" Structure: your position (〜と思います), two reasons (から/ので), one counterpoint and your response. 150–250 characters.' },
    ],
    B2: [
        { id: 'w1', label: 'Task 1 — Business email', guide: 'Write a formal email with keigo. ~300–400 characters.', minWords: 100, maxWords: 180, minutes: 35, prompt: 'Write a formal email to your Japanese teacher requesting a reference letter: greeting, request with keigo (お願いしたいのですが), background, and formal closing. 300–400 characters.' },
        { id: 'w2', label: 'Task 2 — Argumentative essay', guide: 'Write a structured essay on a social topic. ~400 characters.', minWords: 130, maxWords: 200, minutes: 35, prompt: 'Write an essay on: "Technology makes language learning easier — agree or disagree?" Thesis, two arguments with examples, counterargument and conclusion. 400 characters.' },
    ],
    C1: [
        { id: 'w1', label: 'Task 1 — Formal report', guide: 'Write a structured report in formal written Japanese. ~600 characters.', minWords: 180, maxWords: 280, minutes: 45, prompt: 'Write a report for your company/university on a trend in Japanese society (aging population, remote work, tourism): situation, data-style observations, implications. Formal written style (だ/である or polite keigo consistently). 600 characters.' },
        { id: 'w2', label: 'Task 2 — Newspaper-style piece', guide: 'Write an opinion column in journalistic style. ~500 characters.', minWords: 160, maxWords: 260, minutes: 40, prompt: 'Write a newspaper-style column responding to: "Japan should accept more foreign workers." Use formal written Japanese, discourse markers, and implicit hedging where appropriate. 500 characters.' },
    ],
    C2: [
        { id: 'w1', label: 'Task 1 — Literary / stylistic piece', guide: 'Write with full stylistic control — metaphor, rhythm, register shifts. ~600+ characters.', minWords: 220, maxWords: 350, minutes: 50, prompt: 'Write a personal essay in the style of a Japanese magazine column: nuanced, idiomatic, with rhetorical rhythm and at least one subtle register shift. 600+ characters.' },
        { id: 'w2', label: 'Task 2 — Critical review', guide: 'Review a book/film/show with cultural analysis. ~500 characters.', minWords: 200, maxWords: 320, minutes: 45, prompt: 'Write a critical review of a Japanese book, film or series: summary, analysis of themes, cultural context, evaluation. Assume a reader fluent in Japanese. 500 characters.' },
    ],
};

export const jlptWritingTasksFor = (level: JlptLevel): JlptWritingTask[] => JLPT_WRITING_TASKS_BY_LEVEL[level];

export const JLPT_SPEAKING_TASKS_BY_LEVEL: Record<JlptLevel, JlptSpeakingTask[]> = {
    A1: [
        { id: 's1', label: 'Task 1 — Self-introduction', guide: 'Introduce yourself in polite Japanese. ~1 minute.', seconds: 60, prompt: '日本語で自己紹介をしてください：名前、国、仕事か学校、家族、趣味。' },
        { id: 's2', label: 'Task 2 — Daily questions', guide: 'Answer the examiner\u2019s simple questions. ~1 minute.', seconds: 60, prompt: '答えてください：毎日何時に起きますか。朝、何を食べますか。週末、どこへ行きますか。' },
    ],
    A2: [
        { id: 's1', label: 'Task 1 — My weekend', guide: 'Describe what you did and plan. ~1 minute.', seconds: 60, prompt: '週末に何をしましたか。て-form と past tense で話してください。そして、来週の予定も話してください。' },
        { id: 's2', label: 'Task 2 — Shopping roleplay', guide: 'Roleplay shopping at a konbini/department store. ~1 minute 30.', seconds: 90, prompt: 'デパートで買い物をするロールプレイ：店員と話して、商品を聞いて、値段を聞いて、決めます。' },
    ],
    B1: [
        { id: 's1', label: 'Task 1 — Story time', guide: 'Narrate a memorable experience. ~1 minute 30.', seconds: 90, prompt: '思い出に残っている経験を話してください：いつ、どこで、誰と、何をしましたか。どう感じましたか。' },
        { id: 's2', label: 'Task 2 — Opinion + reasons', guide: 'Give your opinion with two reasons. ~1 minute 30.', seconds: 90, prompt: '「日本語は難しい言語だと思いますか。」あなたの意見を理由を二つ言って話してください。' },
    ],
    B2: [
        { id: 's1', label: 'Task 1 — Presentation', guide: 'Present a topic with structure. ~2 minutes.', seconds: 120, prompt: 'テーマを選んでください（テクノロジー、教育、環境）：現状、良い点と悪い点、あなたの考え。二分間で発表してください。' },
        { id: 's2', label: 'Task 2 — Discussion with keigo', guide: 'Discuss with the examiner using appropriate register. ~2 minutes.', seconds: 120, prompt: '試験官とテーマについて話し合ってください：相手の意見に反応して、丁寧語と簡単な敬語を使い分けてください。' },
    ],
    C1: [
        { id: 's1', label: 'Task 1 — Formal presentation', guide: 'Give a structured presentation with keigo. ~3 minutes.', seconds: 180, prompt: 'ビジネスまたは学術的なテーマについて正式な発表をしてください：背景、分析、提案。敬語を正確に使ってください。' },
        { id: 's2', label: 'Task 2 — Nuanced debate', guide: 'Debate with implied meaning and indirect refusals. ~2 minutes.', seconds: 120, prompt: '試験官の意見に反論してください：日本語の遠回しな表現（ちょっと難しいですね…）も使いながら、丁寧に反对の立場を話してください。' },
    ],
    C2: [
        { id: 's1', label: 'Task 1 — Natural mastery speech', guide: 'Speak with full register control and idiom. ~3 minutes.', seconds: 180, prompt: '複雑なテーマについて、自然なスピードと言葉遣いの使い分けで話してください：慣用句、onomatopoeia（オノマトペ）、丁寧語と普通語の切り替えを入れてください。' },
        { id: 's2', label: 'Task 2 — Register switching', guide: 'Switch registers on demand mid-conversation. ~2 minutes.', seconds: 120, prompt: '同じテーマについて、まず友達に話すように（タメ口）、次に社長に話すように（敬語）、話してください。試験官が途中で話し方を変えるよう頼みます。' },
    ],
};

export const jlptSpeakingTasksFor = (level: JlptLevel): JlptSpeakingTask[] => JLPT_SPEAKING_TASKS_BY_LEVEL[level];

// ── JLPT knowledge-section questions (the third mock section) ────────────────
export interface JlptKnowledge {
    questions: { question: string; options: string[]; answer: string; note: string }[];
}
export const generateJlptKnowledge = async (level: JlptLevel, language: Language = 'Japanese'): Promise<JlptKnowledge> => {
    const system = `You create JLPT Language Knowledge practice questions (文字・語彙・文法) for the ${JLPT_OF_LEVEL[level]} band.
Return ONLY valid JSON:
{"questions":[{"question":"the question — mix kanji readings (カタカナ or kana asked for kanji), particle selection, word choice, and sentence-composition items in JAPANESE with minimal English framing","options":["4 options"],"answer":"correct option","note":"one-line English explanation of WHY, including the grammar point or reading"}]}
Rules:
- 6 questions covering DIFFERENT types: 1-2 kanji reading, 1 orthography, 2 particle/grammar selection, 1-2 vocabulary in context.
- Stay strictly within ${JLPT_OF_LEVEL[level]} vocabulary and grammar.
- The question text is in Japanese (as the real exam is); the note is in English.`;
    const raw = await chat(system, `Create a ${JLPT_OF_LEVEL[level]} Language Knowledge question set.`, 2500, true);
    return parseJSON(raw);
};

// ── Lesson generation (the master lesson structure — LONG & DETAILED) ────────
export interface JapaneseLesson {
    title: string;
    objective: string;
    vocabulary: { jp: string; kana: string; romaji: string; en: string; example?: { jp: string; en: string }; related?: { jp: string; en: string }[] }[];
    pronunciation: { jp: string; approx: string; en: string }[];
    grammar: { rule: string; explanation: string; examples: { jp: string; en: string; breakdown: string[] }[]; commonMistakes: string[] };
    transformations: { type: string; jp: string; en: string }[];
    sentenceBuilding: { jp: string; en: string }[];
    practice: { instruction: string; question: string; answer: string }[];
    translationPractice: { en: string; jp: string }[];
    reverseTranslation: { jp: string; en: string }[];
    register: { informal: string; neutral: string; formal: string };
    culture: string;
    freeProduction: string;
    miniTest: { question: string; options: string[]; answer: string }[];
    review: string[];
}

export const generateJapaneseLesson = async (
    level: JlptLevel,
    topicTitle: string,
    focus: string,
    language: Language = 'Japanese'
): Promise<JapaneseLesson> => {
    const system = `You are an expert Japanese teacher creating a COMPLETE, LONG, DETAILED lesson for a learner at CEFR ${level} (${JLPT_OF_LEVEL[level]}). The student is an ENGLISH speaker. This lesson is the student's main study material — it must be thorough enough to learn from alone. Do NOT be brief; depth and breadth are the requirement.

ABSOLUTE RULES:
- Every Japanese sentence MUST follow the pattern: 日本語 — rōmaji — English. All three, always.
- Teach the FOUR-WAY presentation for key words: Kanji + Kana + Rōmaji + English.
- Explain Japanese STRUCTURE, never word-for-word substitution: SOV order, particles instead of prepositions, verb at the end, は vs が logic. When Japanese constructs an idea differently from English (e.g. 日本語が話せる = "Japanese is speakable-by-me"), explain WHY.
- Mark register (ます/です vs plain, and keigo where relevant) explicitly.
- Explain the reason behind every rule; never just state it.
- Do not teach content above ${level} level (${JLPT_OF_LEVEL[level]}), but be exhaustive WITHIN it.
- Include Japanese culture notes connected to the lesson.

Return ONLY valid JSON with ALL of these fields, fully populated:
{
 "title":"lesson title",
 "objective":"what the learner will be able to DO after this lesson",
 "vocabulary":[10-14 items, each {"jp":"word in natural writing (kanji where appropriate)","kana":"the kana reading","romaji":"rōmaji","en":"English","example":{"jp":"example sentence","en":"English"},"related":[{"jp":"related word","en":"meaning"}]} — related words for at least 6 items],
 "pronunciation":[4-6 items {"jp":"word/phrase","approx":"honest English approximation (admit when imperfect)","en":"meaning"}] — include pitch/mora notes where useful,
 "grammar":{"rule":"the rule in one line","explanation":"4-6 sentences: the rule, the structure, WHY Japanese does it this way, contrast with English","examples":[5-6 items {"jp":"example","en":"English","breakdown":["word = meaning", ...]} — vary: statement, negative, question, different particles...],"commonMistakes":[3-4 items "the mistake English speakers make + the correct pattern"]},
 "transformations":[7-8 items showing the KEY sentence transformed: {"type":"Polite|Negative|Past|Past negative|Question|Casual|Progressive|Desire","jp":"transformed sentence","en":"English"} — all forms of the same core sentence],
 "sentenceBuilding":[4-5 items from very short to fully expanded, each {"jp":"...","en":"..."}],
 "practice":[6 exercises {"instruction":"what to do (conjugate/transform/choose particle)","question":"exercise","answer":"the answer"}] — progress from easy to harder,
 "translationPractice":[6 items EN→JA {"en":"English sentence","jp":"correct Japanese (with kana)"}],
 "reverseTranslation":[4 items JA→EN {"jp":"Japanese sentence","en":"English"}],
 "register":{"informal":"casual/plain version with an example","neutral":"the polite standard version","formal":"business/keigo version with an example"},
 "culture":"a short cultural note connected to the lesson",
 "freeProduction":"a personal production task with 3-4 guiding questions the student should answer",
 "miniTest":[5 MCQs {"question":"question","options":["a","b","c","d"],"answer":"correct option"}] covering different parts of the lesson,
 "review":["2-3 items to review from earlier in the level, tied to this lesson"]
}
Do not omit any field. Do not shorten. This is the student's textbook chapter.`;
    const raw = await chat(system, `Create the complete ${level} lesson (${JLPT_OF_LEVEL[level]}): "${topicTitle}". Focus: ${focus}.`, 8000, true);
    return parseJSON(raw);
};

// ── Listening exercise ────────────────────────────────────────────────────────
export interface JapaneseListening {
    scenario: string;
    lines: { speaker: string; jp: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateJapaneseListening = async (level: JlptLevel, language: Language = 'Japanese'): Promise<JapaneseListening> => {
    const system = `You create JLPT-style LISTENING practice. JLPT listening: task-based (with pictures), point-comprehension, and quick-response items; conversations often REVISE the plan, and the final decision is the answer.
Create a realistic conversation script for a ${level} learner (${JLPT_OF_LEVEL[level]}). Return ONLY valid JSON:
{"scenario":"one line describing the situation (e.g. 'Two friends deciding when to meet at Shibuya station')","lines":[{"speaker":"Name or Role","jp":"what they say","en":"English translation"}],"questions":[{"question":"MCQ in ENGLISH about main idea, details, numbers, speaker intention or inference","options":["4 options"],"answer":"correct option"}]}
Rules:
- 5-7 short lines of natural spoken Japanese (include at least one plan revision or hesitation).
- 4 questions testing DIFFERENT skills: main idea, a detail (number/time/place), speaker intention, and one inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create a ${level} Japanese listening exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Reading exercise ──────────────────────────────────────────────────────────
export interface JapaneseReading {
    title: string;
    paragraphs: { jp: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateJapaneseReading = async (level: JlptLevel, language: Language = 'Japanese'): Promise<JapaneseReading> => {
    const system = `You create JLPT-style READING practice. JLPT reading: short passages, notices, emails, then medium/long passages and information retrieval, testing skimming, detail, paraphrase and inference.
Create one realistic document for a ${level} learner (${JLPT_OF_LEVEL[level]}). Return ONLY valid JSON:
{"title":"document type + title (e.g. 'お知らせ — 図書館の利用について')","paragraphs":[{"jp":"the Japanese text (natural writing: kanji + kana)","en":"English translation (hidden until after)"}],"questions":[{"question":"MCQ in ENGLISH","options":["4 options"],"answer":"correct option"}]}
Rules:
- 3-4 short paragraphs of authentic-style Japanese (notice, email, article...).
- 4 questions testing DIFFERENT skills: main idea, detail location, paraphrase recognition, inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create a ${level} Japanese reading exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Writing evaluation ────────────────────────────────────────────────────────
export interface JapaneseWritingFeedback {
    estimatedLevel: string;
    score100: number;
    strengths: string[];
    corrections: { original: string; corrected: string; why: string }[];
    improvements: string[];
    taskCompletion: string;
}
export const evaluateJapaneseWriting = async (
    taskLabel: string, taskGuide: string, minWords: number, text: string, level: JlptLevel
): Promise<JapaneseWritingFeedback> => {
    const system = `You are a Japanese teacher evaluating a practice submission for ${taskLabel} (${taskGuide}). Target level of the student: ${level} (${JLPT_OF_LEVEL[level]}).
Grade strictly but encouragingly. Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS text","score100":0-100,"strengths":["2-3 things done well"],"corrections":[{"original":"the student's exact wrong sentence/phrase","corrected":"the corrected version","why":"the grammar reason in English"}],"improvements":["3-4 concrete prioritised improvements for the NEXT attempt: particles (は/が/に/で), register consistency (ます/です vs plain), word order, natural expressions"],"taskCompletion":"did the text cover the task, keep a consistent register and appropriate length? Be specific."}
Rules: correct EVERY meaningful error (particles, conjugation, register mixing, word order, kanji usage where expected). Use original/corrected/why format. This is a practice estimate.`;
    const raw = await chat(system, `Student submission (min ${minWords} words):\n\n${text}`, 3000, true);
    return parseJSON(raw);
};

// ── Speaking evaluation ───────────────────────────────────────────────────────
export interface JapaneseSpeakingFeedback {
    estimatedLevel: string;
    strengths: string[];
    transcriptCorrections: { original: string; corrected: string; why: string }[];
    fluencyTips: string[];
    nextAttempt: string;
}
export const evaluateJapaneseSpeaking = async (
    taskLabel: string, taskGuide: string, taskPrompt: string, transcript: string, level: JlptLevel
): Promise<JapaneseSpeakingFeedback> => {
    const system = `You are a Japanese teacher evaluating a SPOKEN practice attempt (transcribed by speech-to-text, so ignore spelling — judge grammar and vocabulary from the words). Task: ${taskLabel} — ${taskGuide}. The prompt was: "${taskPrompt}". Target level: ${level} (${JLPT_OF_LEVEL[level]}).
Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS performance","strengths":["2-3 strengths"],"transcriptCorrections":[{"original":"what was said (from transcript)","corrected":"better Japanese","why":"reason in English"}],"fluencyTips":["2-3 tips on flow, particles, register (ます/です vs plain, keigo) for natural Japanese"],"nextAttempt":"one concrete thing to do differently next time"}
Correct grammar from the transcript. This is a practice estimate.`;
    const raw = await chat(system, `Transcript of the student's spoken answer:\n\n${transcript || '(silence or nothing transcribed)'}`, 2500, true);
    return parseJSON(raw);
};
