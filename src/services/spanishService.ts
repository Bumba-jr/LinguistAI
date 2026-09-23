// DELE preparation (Diplomas de Español como Lengua Extranjera, Instituto Cervantes)
// — AI generation + exam constants. Mirror of tcfService.ts.
// Format verified against Instituto Cervantes published structure (Sep 2026):
// 4 tests (reading, listening, writing, speaking); reading+listening = Group A,
// writing+speaking = Group B; each group scored /50, pass needs ≥30 in BOTH groups.
import type { Language } from '../store/useAppStore';
import { chat, parseJSON } from './aiService';

export type DeleLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// DELE writing tasks — B1/B2 formats (Instituto Cervantes). Each test scored /25.
export const DELE_WRITING_TASKS = [
    {
        id: 'w1',
        label: 'Task 1 — Functional text',
        guide: 'Write an informal email/blog/comment of 100–120 words. Friendly register (tú). ~20 minutes.',
        minWords: 100,
        maxWords: 120,
        minutes: 20,
        prompt: 'Escribe un mensaje a tu amigo/a español/a: le cuentas que has empezado un curso nuevo, qué estudias, cómo es tu horario y le propones quedar el fin de semana. Escribe entre 100 y 120 palabras.',
    },
    {
        id: 'w2',
        label: 'Task 2 — Composition / opinion',
        guide: 'Write a formal or neutral composition of 130–150 words giving and justifying your opinion. ~25 minutes.',
        minWords: 130,
        maxWords: 150,
        minutes: 25,
        prompt: 'En tu clase de español se debate: "¿Es mejor aprender idiomas desde pequeño o de adulto?" Escribe un texto exponiendo tu opinión con dos o tres razones y un ejemplo personal. Escribe entre 130 y 150 palabras.',
    },
];

// DELE speaking — B1/B2: prepared monologue + interaction with the examiner.
export const DELE_SPEAKING_TASKS = [
    {
        id: 's1',
        label: 'Task 1 — Prepared monologue',
        guide: 'You get 15–20 minutes of preparation. Then speak alone for 3–4 minutes describing, comparing and giving your opinion.',
        seconds: 210,
        prompt: 'Tema del monólogo: "El uso del teléfono móvil". Habla de: cuándo y para qué usas el móvil, las ventajas y los inconvenientes, y cómo era la vida sin móviles. Usa conectores y da tu opinión.',
    },
    {
        id: 's2',
        label: 'Task 2 — Interaction with the examiner',
        guide: 'Dialogue with the examiner: react, ask, propose, agree and disagree politely. 2–3 minutes.',
        seconds: 150,
        prompt: 'Situación: Tú y el examinador organizáis una fiesta de fin de curso. Proponed juntos: el lugar, el día, la comida, la música y el presupuesto. Tienes que proponer, aceptar y rechazar opciones educadamente (¿Y si…?, Prefiero… porque…, Me parece que…).',
    },
    {
        id: 's3',
        label: 'Task 3 — Opinion',
        guide: 'Present and defend your opinion with reasons, an example and a counterpoint. 3–4 minutes.',
        seconds: 210,
        prompt: 'Opinión: "Las redes sociales hacen que aprender idiomas sea más fácil que nunca." ¿Estás de acuerdo? Usa el esquema: opinión → razón → ejemplo personal → contraargumento → respuesta → conclusión.',
    },
];

// ── Per-level task sets — the exam is NOT the same at every level ────────────
type WritingTask = typeof DELE_WRITING_TASKS[number];
type SpeakingTask = typeof DELE_SPEAKING_TASKS[number];

export const DELE_WRITING_TASKS_BY_LEVEL: Record<DeleLevel, WritingTask[]> = {
    A1: [
        { id: 'w1', label: 'Task 1 — Complete the message', guide: 'Fill a short personal message: 15–25 words. Use the word bank of details the task gives you.', minWords: 15, maxWords: 25, minutes: 10, prompt: 'Escribe una tarjeta a tu profesor/a de español: le dices tu nombre, tu nacionalidad y tu edad, y le haces una pregunta sobre el curso. Escribe entre 15 y 25 palabras.' },
        { id: 'w2', label: 'Task 2 — Short personal note', guide: 'Write a short personal message: 30–40 words.', minWords: 30, maxWords: 40, minutes: 15, prompt: 'Escribes un mensaje a tu amigo/a español/a: le describes tu casa o tu apartamento — dónde está, con quién vives y qué te gusta más. Escribe entre 30 y 40 palabras.' },
    ],
    A2: [
        { id: 'w1', label: 'Task 1 — Informal message / blog', guide: 'Write an informal message or blog post: 70–80 words.', minWords: 70, maxWords: 80, minutes: 25, prompt: 'Escribe un mensaje para el blog de tu escuela: tu rutina diaria entre semana y qué haces normalmente el fin de semana. Escribe entre 70 y 80 palabras.' },
        { id: 'w2', label: 'Task 2 — Description', guide: 'Write a short descriptive text: 50–60 words.', minWords: 50, maxWords: 60, minutes: 20, prompt: 'Describe tus últimas vacaciones: a dónde fuiste, con quién, qué hiciste y cómo estuviste. Escribe entre 50 y 60 palabras.' },
    ],
    B1: DELE_WRITING_TASKS,
    B2: [
        { id: 'w1', label: 'Task 1 — Formal letter / report', guide: 'Write a formal text of 150–180 words to an institution. Usted register. ~40 minutes.', minWords: 150, maxWords: 180, minutes: 40, prompt: 'Escribe una carta al ayuntamiento de tu barrio sobre un problema (la basura, el ruido, el transporte público): explica la situación con detalles, describe cómo te afecta y pide soluciones concretas. Entre 150 y 180 palabras.' },
        { id: 'w2', label: 'Task 2 — Essay with source material', guide: 'Write an essay of 150–180 words based on the source text given. ~40 minutes.', minWords: 150, maxWords: 180, minutes: 40, prompt: 'Texto fuente: "Los jóvenes españoles pasan una media de cinco horas al día con pantallas." Escribe un ensayo: ventajas e inconvenientes de este uso de la tecnología y tu opinión razonada. Entre 150 y 180 palabras.' },
    ],
    C1: [
        { id: 'w1', label: 'Task 1 — Formal report', guide: 'Write a formal text of 220–250 words: analysis, data, proposals. High register. ~75 minutes.', minWords: 220, maxWords: 250, minutes: 75, prompt: 'Escribe un informe formal para una ONG medioambiental sobre el consumo de plásticos de un solo uso en tu ciudad: analiza las causas, presenta datos e iniciativas y propón tres medidas. Entre 220 y 250 palabras.' },
        { id: 'w2', label: 'Task 2 — Integrated summary', guide: 'In the real exam you read a text AND listen to an audio; here, respond to the prompt integrating two viewpoints. 150–180 words. ~75 minutes.', minWords: 150, maxWords: 180, minutes: 75, prompt: 'Texto: defiende la semana laboral de cuatro días por productividad y bienestar. Audio (imagina un economista escéptico): advierte sobre costes y desigualdad. Resume ambos puntos de vista con objetividad y luego valora cuál te convence más. Entre 150 y 180 palabras.' },
    ],
    C2: [
        { id: 'w1', label: 'Task 1 — Opinion article', guide: 'Write a newspaper opinion piece of 200–250 words: high register, irony and rhetorical devices allowed. ~40 minutes.', minWords: 200, maxWords: 250, minutes: 40, prompt: 'Escribe un artículo de opinión para un periódico nacional sobre un tema de actualidad que te apasione (la educación, la IA, el urbanismo…): postura clara, argumentación sofisticada, tono literario. Entre 200 y 250 palabras.' },
        { id: 'w2', label: 'Task 2 — Synthesis and response', guide: 'Synthesise two contrasting texts and evaluate their arguments. 150–200 words. ~40 minutes.', minWords: 150, maxWords: 200, minutes: 40, prompt: 'Imagina dos textos contrapuestos sobre el turismo masivo: uno defiende su valor económico, otro denuncia sus efectos sociales. Sintetiza los argumentos de ambos con precisión y valora críticamente sus posiciones. Entre 150 y 200 palabras.' },
    ],
};

export const deleWritingTasksFor = (level: DeleLevel): WritingTask[] =>
    DELE_WRITING_TASKS_BY_LEVEL[level] ?? DELE_WRITING_TASKS;

export const DELE_SPEAKING_TASKS_BY_LEVEL: Record<DeleLevel, SpeakingTask[]> = {
    A1: [
        { id: 's1', label: 'Task 1 — Present yourself', guide: 'Speak about yourself for ~1 minute: name, nationality, family, what you like.', seconds: 60, prompt: 'Preséntate: nombre, nacionalidad, dónde vives, tu familia y dos cosas que te gustan. Habla un minuto.' },
        { id: 's2', label: 'Task 2 — Questions & roleplay', guide: 'Answer the examiner\'s questions about your daily life, then a short roleplay. ~2 minutes.', seconds: 120, prompt: 'El examinador te pregunta: ¿qué haces por la mañana?, ¿qué comes hoy?, ¿tienes hermanos? Después, roleplay: estás en un café, pide un desayuno y la cuenta.' },
    ],
    A2: [
        { id: 's1', label: 'Task 1 — Monologue', guide: 'Speak alone for ~1 minute 30 about routine and plans.', seconds: 90, prompt: 'Habla de tu rutina de ayer (pasado) y de tus planes para el próximo fin de semana (futuro). Usa conectores: primero, después, por la tarde.' },
        { id: 's2', label: 'Task 2 — Dialogue', guide: 'Dialogue with the examiner: book a hotel room or buy tickets. ~2 minutes.', seconds: 120, prompt: 'Estás en una agencia de viajes: reserva un hotel para tus vacaciones (fechas, tipo de habitación, precio, servicios). Pregunta y reacciona a las respuestas.' },
    ],
    B1: DELE_SPEAKING_TASKS.slice(0, 2),
    B2: DELE_SPEAKING_TASKS,
    C1: [
        { id: 's1', label: 'Task 1 — Advanced monologue', guide: 'Analyse causes and consequences, not just describe. ~4 minutes.', seconds: 240, prompt: 'Monólogo: el cambio climático en tu país. Analiza causas, consecuencias y posibles soluciones; matiza tu postura (en mi opinión…, sin embargo…, es cierto que… aunque…).' },
        { id: 's2', label: 'Task 2 — Integrated debate', guide: 'Debate solutions with the examiner; concede and rebut. ~3 minutes.', seconds: 180, prompt: 'Debate con el examinador: ¿deberían prohibirse los coches en los centros de las ciudades? Tienes que rebatir sus argumentos y hacer concesiones parciales (es verdad que…, pero…).' },
    ],
    C2: [
        { id: 's1', label: 'Task 1 — Interview with nuance', guide: 'Defend an unpopular position with elegance, register control and humour. ~4 minutes.', seconds: 240, prompt: 'Defiende una postura impopular con la que NO estás de acuerdo (el examinador elige el tema): demuestra control del registro, matiz y capacidad de improvisación.' },
        { id: 's2', label: 'Task 2 — Complex negotiation', guide: 'Negotiate a multi-party agreement with the examiner. ~3 minutes.', seconds: 180, prompt: 'Negociación: tú y el examinador representáis a dos partes en una empresa en crisis. Llegad a un acuerdo sobre recortes: sueldo, plantilla, horarios. Usa condicionales y subjuntivo con precisión.' },
    ],
};

export const deleSpeakingTasksFor = (level: DeleLevel): SpeakingTask[] =>
    DELE_SPEAKING_TASKS_BY_LEVEL[level] ?? DELE_SPEAKING_TASKS;

// DELE pass rule: two groups of 50 points; minimum 30 in EACH group.
export const DELE_PASS_NOTE = 'Pass = 30/50 in Group A (reading + listening) AND 30/50 in Group B (writing + speaking). Failing one group fails the diploma — balance your study.';

// Official per-level format (Instituto Cervantes, Sep 2026). The exam changes
// shape with every level — A1 writing is 15–40-word forms, B2 demands sources,
// C1 integrates audio+text, C2 restructures into 3 pruebas entirely.
export interface DeleLevelFormat {
    reading: string;
    listening: string;
    writing: string;
    speaking: string;
}
export const DELE_LEVEL_FORMATS: Record<DeleLevel, DeleLevelFormat> = {
    A1: {
        reading: '4 tasks · 25 items · 45 min',
        listening: '4 tasks · 25 items · 20 min',
        writing: '2 tasks · 25 min — short forms of 15–40 words',
        speaking: '4 tasks · ~15 min — introduce yourself, answer questions, dialogue, roleplay',
    },
    A2: {
        reading: '5 tasks · 30 items · 60 min',
        listening: '5 tasks · 30 items · 35 min',
        writing: '2 tasks · 45 min — informal message 70–80 words + description 50–60',
        speaking: '3 tasks · 15 min — monologue, dialogue, description',
    },
    B1: {
        reading: '5 tasks · 40 items · 70 min',
        listening: '5 tasks · 30 items · 40 min',
        writing: '2 tasks · 60 min — email/blog + composition, 100–120 words each',
        speaking: '3 tasks · 15 min + 20 prep — monologue, prediction dialogue, opinion',
    },
    B2: {
        reading: '4 tasks · 36 items · 70 min',
        listening: '5 tasks · 30 items · 40 min',
        writing: '2 tasks · 80 min — formal letter/report + essay WITH sources, 150–180 words',
        speaking: '3 tasks · 20 min + 20 prep — graphic monologue, dialogue, opinion',
    },
    C1: {
        reading: '5 tasks · 40 items · 80 min',
        listening: '5 tasks · 30 items · 40 min',
        writing: '2 tasks · 150 min — formal text 220–250 words + audio/text integration 150–180',
        speaking: '3 tasks · 20 min + 20 prep — includes an integrated audio/text task',
    },
    C2: {
        reading: 'Prueba 1 — use of language + reading · 105 min',
        listening: 'Prueba 2 — listening + integrated comprehension · 45 min',
        writing: 'Prueba 3 · 80 min — report + composition, high register',
        speaking: 'Prueba 3 · 20 min — interview, monologue, complex dialogue',
    },
};

// Map a practice % to an approximate group score /50 (labelled as estimate).
export const practiceToGroupScore = (pct: number) => Math.round((pct / 100) * 50);

// Rough practice %→CEFR level estimate (labels as estimate — DELE has no
// published conversion; this brackets typical course expectations).
export const pctToCefr = (pct: number): string =>
    pct >= 92 ? 'C2' : pct >= 82 ? 'C1' : pct >= 68 ? 'B2' : pct >= 52 ? 'B1' : pct >= 38 ? 'A2' : pct >= 20 ? 'A1' : '<A1';

export const cefrIndex = (l: string) => ['<A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(l);

// ── Vocabulary: DELE-themed domains (AI-generated per level+topic, cached) ───
export const DELE_VOCAB_TOPICS: { id: string; label: string; hint: string }[] = [
    { id: 'core', label: 'Core Words', hint: 'the absolute highest-frequency words for this CEFR level — pronouns, key verbs, essential nouns and function words the DELE repeats constantly' },
    { id: 'daily', label: 'Daily Life', hint: 'everyday routines, food, cooking, errands, appointments, weather, neighbours, the house' },
    { id: 'family', label: 'Family & Relationships', hint: 'family members, relationships, personality, community, social life, celebrations' },
    { id: 'food', label: 'Food & Restaurants', hint: 'food, drinks, cooking, ordering in a restaurant, the menu, complaining politely about an order' },
    { id: 'travel', label: 'Travel & Transport', hint: 'travelling, hotels, holidays, sightseeing, reservations, airports, trains, travel problems' },
    { id: 'shopping', label: 'Shopping & Money', hint: 'shops, prices, comparing, clothes, returns, banking, budgeting, consumer life' },
    { id: 'work', label: 'Work & Professions', hint: 'jobs, interviews, CVs, workplaces, salaries, schedules, career plans, unemployment' },
    { id: 'education', label: 'Education', hint: 'school, university, courses, exams, studying, enrolling, student life, learning languages' },
    { id: 'health', label: 'Health', hint: 'the body, illness, doctors, pharmacies, health insurance, appointments, healthy habits' },
    { id: 'tech', label: 'Technology & Media', hint: 'phones, computers, the internet, apps, social media, news, television, online life' },
    { id: 'environment', label: 'Environment & Climate', hint: 'climate change, pollution, recycling, energy, protecting nature, weather events, sustainability' },
    { id: 'society', label: 'Society & Culture', hint: 'festivals, traditions, music, film, literature, customs of Spain and Latin America, social issues' },
    { id: 'economy', label: 'Economy & Politics', hint: 'money, economy, government, elections, rights, administration, dealing with offices (B1+)' },
    { id: 'expressions', label: 'Idioms & Expressions', hint: 'high-frequency idioms and fixed expressions (tener ganas de, darse cuenta de, echar de menos) that make Spanish natural (B1+)' },
];

// ── Curriculum syllabus (per the master A0→C2 framework) ─────────────────────
export const DELE_SYLLABUS: Record<DeleLevel, { title: string; slug: string; focus: string }[]> = {
    A1: [
        { title: 'Greetings, Introductions & Ser/Estar', slug: 'greetings', focus: 'hola/adiós register, llamarse, ser vs estar basics, tú vs usted' },
        { title: 'Numbers, Dates & Time', slug: 'numbers', focus: 'counting, veintiuno, telling time with ser, days, months, asking when' },
        { title: 'Family & Possessives', slug: 'family', focus: 'family vocabulary, mi/tu/su, describing people with adjectives and agreement' },
        { title: 'Food, Articles & Plurals', slug: 'food', focus: 'el/la/un/una, plural spelling rules, ordering simply, me gusta(n)' },
        { title: 'Daily Routine & Present Tense', slug: 'routine', focus: 'present -AR/-ER/-IR, reflexive verbs (me levanto…), saying when you do things' },
        { title: 'Questions & Negation', slug: 'questions', focus: 'question words with tildes, ¿Cómo estás? intonation, no + double negatives' },
    ],
    A2: [
        { title: 'Pretérito Indefinido', slug: 'indefinido', focus: 'narrating completed past events, the fu-i/fu-e irregulars' },
        { title: 'Imperfecto', slug: 'imperfecto', focus: 'describing the past, childhood memories, habits with antes/podía' },
        { title: 'Future: ir a + infinitive & futuro simple', slug: 'futuro', focus: 'plans and predictions, voy a estudiar vs estudiaré' },
        { title: 'Shopping & Por/Para First Pass', slug: 'shopping', focus: 'prices, quantities, comparing, the purpose/cause distinction begins' },
        { title: 'Travel & Transport', slug: 'travel', focus: 'tickets, directions, accommodation, getting around a Spanish-speaking city' },
        { title: 'Work, Health & Obligation', slug: 'work', focus: 'jobs, appointments, tener que / deber, invitations and requests' },
    ],
    B1: [
        { title: 'Indefinido vs Imperfecto', slug: 'pasados', focus: 'choosing the right past tense — the classic DELE challenge' },
        { title: 'Conditional & Politeness', slug: 'condicional', focus: 'would/should, ¿podría…?, hypotheticals with si' },
        { title: 'Object Pronouns & Se lo doy', slug: 'pronombres', focus: 'lo/la/le/les, double pronouns, position rules' },
        { title: 'Relative Pronouns', slug: 'relativos', focus: 'que, quien, el que, cuyo — connecting ideas into B2-ready sentences' },
        { title: 'Present Subjunctive Introduction', slug: 'subjuntivo-intro', focus: 'doubt, desire, emotion, influence — the triggers' },
        { title: 'Opinions, Cause & Consequence', slug: 'opiniones', focus: 'creo que, connectors, structuring an opinion' },
        { title: 'Reported Speech', slug: 'estilo-indirecto', focus: 'saying what someone else said (dijo que…)' },
    ],
    B2: [
        { title: 'Subjunctive Masterclass', slug: 'subjuntivo-master', focus: 'imperfecto de subjuntivo, si-clauses, advanced triggers, aunque' },
        { title: 'Por vs Para Masterclass', slug: 'por-para', focus: 'the complete system: cause, purpose, exchange, duration, idioms' },
        { title: 'Formal Register & Correspondencia', slug: 'registro', focus: 'usted, formal letters, Estimado/Atentamente — DELE writing register' },
        { title: 'Structured Argumentation', slug: 'argumentacion', focus: 'thesis → arguments → counterpoint → conclusion, advanced connectors' },
        { title: 'Passive, Impersonal & Se Constructions', slug: 'se-construcciones', focus: 'se vende, se sabe que, professional and written structures' },
        { title: 'Idioms & Natural Spanish', slug: 'idiomas', focus: 'echar de menos, darse cuenta de, llevarse bien — expressions as units' },
    ],
    C1: [
        { title: 'Advanced Subjunctive & Hypotheticals', slug: 'subjuntivo-avanzado', focus: 'pluscuamperfecto de subjuntivo, si hubiera… habría…' },
        { title: 'Academic Writing & Synthesis', slug: 'sintesis', focus: 'summarising sources, nominalisation, formal discourse markers' },
        { title: 'Register Control & Nuance', slug: 'matiz', focus: 'implicit meaning, euphemism, sophisticated idioms' },
        { title: 'Formal Debate', slug: 'debate', focus: 'spontaneous sophisticated discourse, conceding and rebutting' },
    ],
    C2: [
        { title: 'Stylistic Precision', slug: 'estilo', focus: 'choosing the exact construction a native would choose' },
        { title: 'Literary & Journalistic Spanish', slug: 'literario', focus: 'authentic material, metaphor, irony, register shifts' },
        { title: 'Regional Variation Mastery', slug: 'regional', focus: 'Spain, Mexico, Argentina, Caribbean — voseo, distinción, ll varieties' },
    ],
};

// ── Lesson generation (the master lesson structure — LONG & DETAILED) ────────
export interface SpanishLesson {
    title: string;
    objective: string;
    vocabulary: { es: string; en: string; gender?: string; example?: { es: string; en: string }; related?: { es: string; en: string }[] }[];
    pronunciation: { es: string; approx: string; en: string }[];
    grammar: { rule: string; explanation: string; examples: { es: string; en: string; breakdown: string[] }[]; commonMistakes: string[] };
    transformations: { type: string; es: string; en: string }[];
    sentenceBuilding: { es: string; en: string }[];
    practice: { instruction: string; question: string; answer: string }[];
    translationPractice: { en: string; es: string }[];
    reverseTranslation: { es: string; en: string }[];
    register: { informal: string; neutral: string; formal: string };
    culture: string;
    freeProduction: string;
    miniTest: { question: string; options: string[]; answer: string }[];
    review: string[];
}

export const generateSpanishLesson = async (
    level: DeleLevel,
    topicTitle: string,
    focus: string,
    language: Language = 'Spanish'
): Promise<SpanishLesson> => {
    const system = `You are an expert Spanish teacher creating a COMPLETE, LONG, DETAILED lesson for the DELE exam (Instituto Cervantes). The student is an ENGLISH speaker at CEFR ${level}. This lesson is the student's main study material — it must be thorough enough to learn from alone. Do NOT be brief; depth and breadth are the requirement.

ABSOLUTE RULES:
- Every Spanish sentence, phrase and word MUST be immediately followed by its English translation.
- Use neutral international Spanish by default; where Spain and Latin America differ (voseo, vosotros, ll, c/z), mention the difference and label it [Spain] or [LatAm].
- For every important grammar example, include a word-by-word breakdown array (["yo = I", "hablo = speak", ...]).
- Teach Spanish STRUCTURE, never word-for-word English substitution — when Spanish constructs an idea differently (e.g. "Tengo hambre" = "I have hunger", "Me gusta" = "it pleases me"), explain WHY.
- Explain the reason behind every rule; never just state it.
- Do not teach content above ${level} level, but be exhaustive WITHIN it.
- Mark every written accent explicitly (tildes are graded spelling in DELE).

Return ONLY valid JSON with ALL of these fields, fully populated:
{
 "title":"lesson title",
 "objective":"what the learner will be able to DO after this lesson",
 "vocabulary":[12-16 items, each {"es":"word/phrase","en":"English","gender":"FOR EVERY NOUN include 'masculine' or 'feminine' (never omit for nouns); omit for verbs/phrases","example":{"es":"example sentence using it","en":"English"},"related":[{"es":"related word","en":"meaning"}]} — include related words for at least 6 items],
 "pronunciation":[4-6 items {"es":"word/phrase","approx":"simple honest English approximation (admit when imperfect)","en":"meaning"}] — include at least one accent/stress or regional note,
 "grammar":{"rule":"the rule in one line","explanation":"4-6 sentences: the rule, the structure, WHY Spanish does it this way, contrast with English","examples":[5-6 items {"es":"example","en":"English","breakdown":["word = meaning", ...]} — vary: statement, negative, question, plural...],"commonMistakes":[3-4 items "the mistake English speakers make + the correct pattern"]},
 "transformations":[7-8 items showing the KEY verb of the lesson transformed: {"type":"Positive|Negative|Past (indefinido)|Imperfect|Future|Conditional|Question|Subjunctive trigger","es":"transformed sentence","en":"English"} — all forms of the same core sentence],
 "sentenceBuilding":[4-5 items from very short to fully expanded, each {"es":"...","en":"..."}],
 "practice":[6 exercises {"instruction":"what to do (conjugate/transform/fill in)","question":"exercise in Spanish","answer":"the answer"}] — progress from easy to harder,
 "translationPractice":[6 items EN→ES {"en":"English sentence","es":"correct Spanish"}],
 "reverseTranslation":[4 items ES→EN {"es":"Spanish sentence","en":"English"}],
 "register":{"informal":"how this topic is expressed casually with friends (tú), with an example","neutral":"the everyday standard version","formal":"the professional/DELE version (usted), with an example"},
 "culture":"a short cultural note connected to the lesson (Spain or Latin America)",
 "freeProduction":"a personal production task with 3-4 guiding questions the student should answer",
 "miniTest":[5 MCQs {"question":"question","options":["a","b","c","d"],"answer":"correct option"}] covering different parts of the lesson,
 "review":["2-3 items to review from earlier in the level, tied to this lesson"]
}
Do not omit any field. Do not shorten. This is the student's textbook chapter.`;
    const raw = await chat(system, `Create the complete ${level} DELE lesson: "${topicTitle}". Focus: ${focus}.`, 8000, true);
    return parseJSON(raw);
};

// ── Listening exercise ────────────────────────────────────────────────────────
export interface SpanishListening {
    scenario: string;
    lines: { speaker: string; es: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateSpanishListening = async (level: DeleLevel, language: Language = 'Spanish'): Promise<SpanishListening> => {
    const system = `You create DELE LISTENING practice. DELE listening: short authentic-style recordings (announcements, dialogues, interviews, voicemails), each heard ONCE, difficulty A1→C2.
Create a realistic recording script for a ${level} learner. Return ONLY valid JSON:
{"scenario":"one line describing the situation (e.g. 'An announcement in a Madrid train station')","lines":[{"speaker":"Name or Role","es":"what they say","en":"English translation"}],"questions":[{"question":"MCQ in ENGLISH about main idea, details, numbers, speaker intention or inference","options":["4 options"],"answer":"correct option"}]}
Rules:
- 5-7 short lines of natural spoken Spanish for the recording.
- 4 questions testing DIFFERENT skills: main idea, a detail (number/time/place), speaker intention, and one inference.
- Questions and options in ENGLISH (they test comprehension of the Spanish audio).`;
    const raw = await chat(system, `Create a ${level} DELE listening exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Reading exercise ──────────────────────────────────────────────────────────
export interface SpanishReading {
    title: string;
    paragraphs: { es: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateSpanishReading = async (level: DeleLevel, language: Language = 'Spanish'): Promise<SpanishReading> => {
    const system = `You create DELE READING practice. DELE reading: progressive MCQs (announcements → articles → opinion texts), testing skimming, scanning, detail, paraphrase and inference.
Create one realistic document for a ${level} learner. Return ONLY valid JSON:
{"title":"document type + title (e.g. 'Cartel — Normas del edificio')","paragraphs":[{"es":"the Spanish text (correct tildes and ¿¡ punctuation!)","en":"English translation (hidden until after)"}],"questions":[{"question":"MCQ in ENGLISH","options":["4 options"],"answer":"correct option"}]}
Rules:
- 3-4 short paragraphs of authentic-style Spanish writing (notice, ad, email, article...).
- 4 questions testing DIFFERENT skills: main idea, detail location, paraphrase recognition, inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create a ${level} DELE reading exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Writing evaluation ────────────────────────────────────────────────────────
export interface SpanishWritingFeedback {
    estimatedLevel: string;
    score25: number;
    strengths: string[];
    corrections: { original: string; corrected: string; why: string }[];
    improvements: string[];
    taskCompletion: string;
}
export const evaluateSpanishWriting = async (
    taskLabel: string, taskGuide: string, minWords: number, text: string, level: DeleLevel
): Promise<SpanishWritingFeedback> => {
    const system = `You are a DELE examiner (Instituto Cervantes criteria) evaluating a practice submission for ${taskLabel} (${taskGuide}). Target level of the student: ${level}. The official tests are scored /25.
Grade strictly but encouragingly. Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS text","score25":0-25,"strengths":["2-3 things done well"],"corrections":[{"original":"the student's exact wrong sentence/phrase","corrected":"the corrected version","why":"the grammar reason in English"}],"improvements":["3-4 concrete prioritised improvements for the NEXT attempt, tied to the DELE criteria: task completion, coherence, range, accuracy, spelling/accents"],"taskCompletion":"did the text answer the task, use the right register (tú/usted) and respect the length? Be specific."}
Rules: correct EVERY meaningful error (grammar, gender, articles, agreement, prepositions, por/para, ser/estar, word order, tildes/accents). Treat missing tildes as spelling errors. Never invent an official score — this is a practice estimate; refer to it as an estimate.`;
    const raw = await chat(system, `Student submission (min ${minWords} words):\n\n${text}`, 3000, true);
    return parseJSON(raw);
};

// ── Speaking evaluation ───────────────────────────────────────────────────────
export interface SpanishSpeakingFeedback {
    estimatedLevel: string;
    strengths: string[];
    transcriptCorrections: { original: string; corrected: string; why: string }[];
    fluencyTips: string[];
    nextAttempt: string;
}
export const evaluateSpanishSpeaking = async (
    taskLabel: string, taskGuide: string, taskPrompt: string, transcript: string, level: DeleLevel
): Promise<SpanishSpeakingFeedback> => {
    const system = `You are a DELE examiner evaluating a SPOKEN practice attempt (transcribed by speech-to-text, so ignore spelling — judge grammar and vocabulary from the words). Task: ${taskLabel} — ${taskGuide}. The prompt was: "${taskPrompt}". Target level: ${level}.
Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS performance","strengths":["2-3 strengths"],"transcriptCorrections":[{"original":"what was said (from transcript)","corrected":"better Spanish","why":"reason in English"}],"fluencyTips":["2-3 tips on flow, connectors, register (tú/usted) for the DELE speaking format"],"nextAttempt":"one concrete thing to do differently next time"}
Correct grammar from the transcript. This is a practice estimate, never an official score.`;
    const raw = await chat(system, `Transcript of the student's spoken answer:\n\n${transcript || '(silence or nothing transcribed)'}`, 2500, true);
    return parseJSON(raw);
};
