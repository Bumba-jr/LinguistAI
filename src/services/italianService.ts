// CILS preparation (Certificazione di Italiano come Lingua Straniera, Università
// per Stranieri di Siena) — AI generation + exam constants. Mirror of germanService.ts.
// Framework verified against CLIQ/CILS published structure (Sep 2026): the four
// CLIQ bodies are CILS, CELI, PLIDA and CERT.IT; CILS covers A1→C2 and grades
// each SKILL independently — fail one skill, retake only that skill later.
import type { Language } from '../store/useAppStore';
import { chat, parseJSON } from './aiService';

export type CilsLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// The four CLIQ certification bodies (Italian Ministry of Foreign Affairs).
export const CLIQ_BODIES = [
    { body: 'CILS', org: 'Università per Stranieri di Siena', note: 'our primary framework — official exams A1→C2 with sample papers' },
    { body: 'CELI', org: 'Università per Stranieri di Perugia', note: 'CELI 1–5, mapped to the same CEFR levels' },
    { body: 'PLIDA', org: 'Società Dante Alighieri', note: 'PLIDA A1→C2, mapped to the same CEFR levels' },
    { body: 'CERT.IT', org: 'Università Roma Tre', note: 'mapped to the same CEFR levels' },
];

export const CILS_LEVEL_MAP = [
    { cefr: 'A1', cils: 'CILS A1' },
    { cefr: 'A2', cils: 'CILS A2' },
    { cefr: 'B1', cils: 'CILS UNO-B1' },
    { cefr: 'B2', cils: 'CILS DUE-B2' },
    { cefr: 'C1', cils: 'CILS TRE-C1' },
    { cefr: 'C2', cils: 'CILS QUATTRO-C2' },
];

// Official per-level structure (Centro Valutazione CILS, Sep 2026 — verify your session).
// Distinctive CILS feature at B1/B2: a fifth part, "Analisi delle strutture di
// comunicazione" (grammar-in-context). A1/A2 are scored on a 60-point scale,
// B1→C2 on 100; each skill has its own pass threshold.
export interface CilsLevelFormat {
    listening: string;
    reading: string;
    extra: string;
    writing: string;
    speaking: string;
}
export const CILS_LEVEL_FORMATS: Record<CilsLevel, CilsLevelFormat> = {
    A1: {
        listening: 'Ascolto — 2 tasks · ~20 min · 60-point scale',
        reading: 'Lettura — 2 tasks · ~35 min',
        extra: 'no grammar part at A1',
        writing: 'Scritta — 2 tasks · ~20 min (form + short message)',
        speaking: 'Orale — ~5 min · introduce yourself, ask & answer',
    },
    A2: {
        listening: 'Ascolto — ~25 min · everyday dialogues, announcements',
        reading: 'Lettura — ~40 min · ads, notices, short texts',
        extra: 'no grammar part at A2',
        writing: 'Scritta — 2 tasks · ~30 min (everyday messages)',
        speaking: 'Orale — ~5-10 min · describe, arrange, react',
    },
    B1: {
        listening: 'Ascolto — 30 min · conversations, announcements',
        reading: 'Lettura — 45 min · articles, ads, instructions',
        extra: 'Analisi delle strutture di comunicazione — 30 min (grammar-in-context)',
        writing: 'Scritta — 2 tasks · ~40 min (semi-formal email + composition)',
        speaking: 'Orale — ~10 min · monologue + interaction',
    },
    B2: {
        listening: 'Ascolto — 30 min · interviews, radio, discussions',
        reading: 'Lettura — 45 min · articles, opinion texts',
        extra: 'Analisi delle strutture di comunicazione — 30 min',
        writing: 'Scritta — 2 tasks · ~70 min (email + structured composition)',
        speaking: 'Orale — ~10-15 min · presentation + dialogue',
    },
    C1: {
        listening: 'Ascolto — ~30 min · fast natural speech',
        reading: 'Lettura — ~55 min · complex articles, implicit meaning',
        extra: 'grammar integrated into reading/writing at C1',
        writing: 'Scritta — ~90 min · structured argumentative texts',
        speaking: 'Orale — ~15 min · complex presentation + debate',
    },
    C2: {
        listening: 'Ascolto — ~30 min · idiomatic, reduced, regional speech',
        reading: 'Lettura — ~55 min · literary/journalistic texts, implication',
        extra: 'all sections integrate analysis and production',
        writing: 'Scritta — ~120 min · sophisticated, stylistically controlled texts',
        speaking: 'Orale — ~20 min · spontaneous, precise, rhetorically aware',
    },
};

export const CILS_PASS_NOTE = 'CILS grades each skill independently — every skill must reach its own threshold. Fail one skill and you can retake JUST that skill (you receive an attestato for the parts already passed). A1/A2 use a 60-point scale; B1→C2 use 100. Train all four skills — being great at speaking does not carry the others.';

// Rough practice % → CEFR level estimate.
export const pctToCefr = (pct: number): string =>
    pct >= 92 ? 'C2' : pct >= 82 ? 'C1' : pct >= 68 ? 'B2' : pct >= 52 ? 'B1' : pct >= 38 ? 'A2' : pct >= 20 ? 'A1' : '<A1';
export const cefrIndex = (l: string) => ['<A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(l);

// ── Vocabulary: CILS-themed domains ──────────────────────────────────────────
export const CILS_VOCAB_TOPICS: { id: string; label: string; hint: string }[] = [
    { id: 'core', label: 'Core Words', hint: 'the absolute highest-frequency words for this CEFR level — pronouns, key verbs, essential nouns and function words CILS repeats constantly' },
    { id: 'daily', label: 'Daily Life', hint: 'everyday routines, food, cooking, errands, appointments, weather, la casa, neighbours' },
    { id: 'family', label: 'Family & Relationships', hint: 'family members, relationships, personality, celebrations, social life' },
    { id: 'food', label: 'Food & Restaurants', hint: 'food, drinks, ordering, the menu, Italian food culture (antipasto, coperto), complaining politely' },
    { id: 'travel', label: 'Travel & Transport', hint: 'trains (Frecciarossa!), tickets, hotels, holidays, directions, Italian cities, travel problems' },
    { id: 'shopping', label: 'Shopping & Money', hint: 'shops, prices, clothes, returns, banking, budgeting, markets, consumer life' },
    { id: 'work', label: 'Work & Professions', hint: 'jobs, interviews, CVs, workplaces, salaries, schedules, career plans, Italian workplace culture' },
    { id: 'education', label: 'Education', hint: 'school, university, exams, studying, la maturità, enrolling, student life' },
    { id: 'health', label: 'Health', hint: 'the body, illness, doctors, farmacia, appointments, healthy habits' },
    { id: 'tech', label: 'Technology & Media', hint: 'phones, computers, the internet, apps, social media, news, Italian media' },
    { id: 'environment', label: 'Environment & Climate', hint: 'climate change, pollution, recycling, energy, protecting nature, weather events' },
    { id: 'society', label: 'Society & Culture', hint: 'festivals, traditions, music, film, literature, regional identities, social issues, Italian festival culture' },
    { id: 'economy', label: 'Economy & Politics', hint: 'money, economy, government, elections, rights, administration, dealing with offices — B1+' },
    { id: 'idioms', hint: 'high-frequency Italian idioms and fixed expressions (averne abbastanza, fare la bella figura, non vedo l\u2019ora) that make Italian natural — B1+', label: 'Idioms & Expressions' },
];

// ── Curriculum syllabus (per the master A0→C2 framework) ─────────────────────
export const CILS_SYLLABUS: Record<CilsLevel, { title: string; slug: string; focus: string }[]> = {
    A1: [
        { title: 'Greetings, Introductions & essere/avere', slug: 'greetings', focus: 'ciao/buongiorno register, mi chiamo, tu vs Lei, essere and avere, numbers' },
        { title: 'Articles, Gender & Plurals', slug: 'articoli', focus: 'il/lo/l\u2019/la/i/gli/le, un/uno/una/un\u2019, the five plural patterns' },
        { title: 'Food, Shopping & the Verb Groups', slug: 'shopping', focus: '-ARE/-ERE/-IRE present, -isc verbs, ordering, prices, vorrei' },
        { title: 'Family & Possessives', slug: 'family', focus: 'family words, mio/tuo/suo, describing people, agreement' },
        { title: 'Daily Routine & Reflexives', slug: 'routine', focus: 'mi alzo, mi sveglio, reflexive present, time expressions' },
        { title: 'Questions & Negation', slug: 'questions', focus: 'question words, intonation questions, non + double negatives' },
    ],
    A2: [
        { title: 'Passato Prossimo', slug: 'passato-prossimo', focus: 'avere vs essere auxiliary, participle agreement, irregular participles' },
        { title: 'Imperfetto — First Pass', slug: 'imperfetto', focus: 'habits, background, childhood memories' },
        { title: 'Direct & Indirect Pronouns', slug: 'pronomi', focus: 'lo/la/li/le, mi/ti/gli/le, placement rules' },
        { title: 'Articulated Prepositions', slug: 'preposizioni-articulate', focus: 'del, al, dal, nel, sul — the full grid' },
        { title: 'Comparisons & Futuro', slug: 'confronti', focus: 'più/meno … di, -issimo, futuro semplice, probability use' },
        { title: 'Travel, Health & Everyday Services', slug: 'servizi', focus: 'booking, appointments, farmacia, everyday problem-solving' },
    ],
    B1: [
        { title: 'The Complete Past System', slug: 'passati', focus: 'passato prossimo vs imperfetto — THE classic CILS challenge; trapassato' },
        { title: 'ci & ne', slug: 'ci-ne', focus: 'ci vado, ne voglio due, volerci, crederci — the fluency milestone' },
        { title: 'Condizionale', slug: 'condizionale', focus: 'would, polite requests, hearsay: sarebbe' },
        { title: 'Congiuntivo Introduction', slug: 'congiuntivo-intro', focus: 'penso che, credo che, doubt/opinion/emotion triggers' },
        { title: 'Relative Clauses & Connectors', slug: 'relativi', focus: 'che, cui, il quale; quindi, però, infatti' },
        { title: 'Work, Citizenship Themes & Opinions', slug: 'societa', focus: 'CILS B1 cittadinanza themes, structured opinions with reasons' },
    ],
    B2: [
        { title: 'Congiuntivo Masterclass', slug: 'congiuntivo-master', focus: 'all four tenses, imperfetto vs trapassato, sequence of tenses' },
        { title: 'Passive & Impersonal Constructions', slug: 'passivo', focus: 'venire/essere + participle, si impersonale' },
        { title: 'Argumentation & Discourse Markers', slug: 'argumentation', focus: 'claim → reason → example → counterargument → conclusion' },
        { title: 'Formal Register & Correspondence', slug: 'registro', focus: 'Gentile…, In attesa di un Suo cortese riscontro — formal emails, Lei register' },
        { title: 'Idioms & Natural Italian', slug: 'idiomi', focus: 'fare la bella figura, averne abbastanza, non vedo l\u2019ora — expressions as units' },
        { title: 'Passato Remoto Recognition', slug: 'remoto', focus: 'the historical/literary past — reading comprehension for B2+' },
    ],
    C1: [
        { title: 'Sophisticated Syntax & Nominal Style', slug: 'sintassi', focus: 'nominalisation, subordinate stacking, academic Italian' },
        { title: 'Implicit Meaning & Nuance', slug: 'nuance', focus: 'irony, understatement, implied criticism, register shifts' },
        { title: 'Professional & Academic Writing', slug: 'professionale', focus: 'reports, formal argumentation, hedging' },
        { title: 'Complex Debate', slug: 'dibattito', focus: 'spontaneous sophisticated discourse, conceding and rebutting' },
        { title: 'Long Listening & Argument Mapping', slug: 'ascolto-argomenti', focus: 'Follow interviews and talks, identify claims and evidence, and infer speaker stance from tone and connectors' },
    ],
    C2: [
        { title: 'Stylistic Precision', slug: 'stile', focus: 'choosing the exact construction a native would choose' },
        { title: 'Literary & Journalistic Italian', slug: 'letterario', focus: 'authentic material, metaphor, rhetoric' },
        { title: 'Regional Variation Mastery', slug: 'regionale', focus: 'North/Centre/South, Sicilian and Neapolitan influence — comprehension skill' },
        { title: 'Pragmatics, Humour & Implicature', slug: 'pragmatica', focus: 'Interpret indirect meaning, humour, understatement and culturally situated references in varied registers' },
        { title: 'Rhetoric & Critical Commentary', slug: 'retorica', focus: 'Analyse persuasive structure, allusion and evidence in long-form journalism and public discussion' },
    ],
};

// ── Per-level writing & speaking tasks (CILS format) ─────────────────────────
interface CilsWritingTask { id: string; label: string; guide: string; minWords: number; maxWords?: number; minutes: number; prompt: string }
interface CilsSpeakingTask { id: string; label: string; guide: string; seconds: number; prompt: string }

export const CILS_WRITING_TASKS_BY_LEVEL: Record<CilsLevel, CilsWritingTask[]> = {
    A1: [
        { id: 'w1', label: 'Task 1 — Fill the form', guide: 'Fill a form with your personal details. A few words per field.', minWords: 10, minutes: 8, prompt: 'Compila il modulo di iscrizione al corso d\u2019italiano: nome, cognome, nazionalità, indirizzo, telefono, professione, lingua madre.' },
        { id: 'w2', label: 'Task 2 — Short message', guide: 'Write a short personal message covering 3 points. ~25–40 words.', minWords: 25, maxWords: 40, minutes: 12, prompt: 'Scrivi un biglietto a un amico: scusati perché non puoi venire alla sua festa, spiega il motivo e proponi un altro giorno per vedervi. 25–40 parole.' },
    ],
    A2: [
        { id: 'w1', label: 'Task 1 — Everyday message', guide: 'Write a short everyday message covering the 3 content points. ~40–60 words.', minWords: 40, maxWords: 60, minutes: 20, prompt: 'Scrivi un messaggio al tuo amico/a italiano/a: racconta cosa hai fatto lo weekend scorso, di' + ' che cosa ti è piaciuto di più e proponi di fare qualcosa insieme. 40–60 parole.' },
        { id: 'w2', label: 'Task 2 — Short composition', guide: 'Describe a person, place or memory. ~50 words.', minWords: 40, maxWords: 60, minutes: 20, prompt: 'Descrivi la tua città o il tuo quartiere: cosa c\u2019è, cosa ti piace e cosa cambieresti. 40–60 parole.' },
    ],
    B1: [
        { id: 'w1', label: 'Task 1 — Semi-formal email', guide: 'Write a semi-formal email covering 3 content points. ~80–100 words.', minWords: 80, maxWords: 100, minutes: 25, prompt: 'Hai visto un annuncio per un corso di cucina italiana. Scrivi un\u2019email alla scuola: chiedi informazioni su orari e prezzi, parla della tua esperienza in cucina e spiega perché vuoi partecipare. Copri tutti e tre i punti, 80–100 parole.' },
        { id: 'w2', label: 'Task 2 — Composition', guide: 'Write a structured text expressing your opinion. ~100 words.', minWords: 90, maxWords: 120, minutes: 25, prompt: 'Alcune persone pensano che i social media facciano perdere tempo, altre che siano utili. Scrivi un testo con la tua opinione, due argomenti e un esempio personale. 90–120 parole.' },
    ],
    B2: [
        { id: 'w1', label: 'Task 1 — Formal email', guide: 'Write a formal email covering 3 content points. Lei register. ~120–150 words.', minWords: 120, maxWords: 150, minutes: 40, prompt: 'Hai soggiornato in un hotel in Toscana e ci sono stati problemi. Scrivi una lettera formale alla direzione: spiega i problemi, descrivi come sono stati gestiti e chiedi un rimborso parziale. Usa il registro formale, 120–150 parole.' },
        { id: 'w2', label: 'Task 2 — Structured composition', guide: 'Write an argumentative text on a social topic. ~150 words.', minWords: 130, maxWords: 170, minutes: 30, prompt: 'Molti ragazzi lasciano la propria città per studiare o lavorare. Scrivi un testo argomentativo: vantaggi e svantaggi di questa scelta e la tua opinione motivata. 130–170 parole.' },
    ],
    C1: [
        { id: 'w1', label: 'Task 1 — Formal report / article', guide: 'Write a structured formal text with nuanced argumentation. ~200 words.', minWords: 180, maxWords: 230, minutes: 50, prompt: 'Scrivi un articolo per la rivista della tua università sull\u2019intelligenza artificiale e il futuro del lavoro: analisi della situazione, opportunità e rischi, proposte. Registro alto, 180–230 parole.' },
        { id: 'w2', label: 'Task 2 — Response to source text', guide: 'React to a quoted viewpoint with a structured, nuanced text. ~200 words.', minWords: 180, maxWords: 230, minutes: 40, prompt: '«Il turismo di massa distrugge le città d\u2019arte.» Commenta questa affermazione: riassumi il punto di vista, discutilo con argomenti a favore e contro e formula la tua posizione motivata. 180–230 parole.' },
    ],
    C2: [
        { id: 'w1', label: 'Task 1 — Essay', guide: 'Write a sophisticated essay with stylistic control. ~250–400 words.', minWords: 250, maxWords: 400, minutes: 70, prompt: 'Scrivi un saggio su un tema culturale o sociale d\u2019attualità: tesi chiara, argomentazione sofisticata, registry letterario-giornalistico, ironia ammessa. 250–400 parole.' },
        { id: 'w2', label: 'Task 2 — Synthesis', guide: 'Synthesise two contrasting viewpoints into a coherent text. ~250 words.', minWords: 220, maxWords: 300, minutes: 50, prompt: 'Immagina due articoli contrapposti sul remote work: uno lo celebra, l\u2019altro lo critica. Sintetizza entrambe le posizioni con precisione e formula una valutazione critica personale. 220–300 parole.' },
    ],
};

export const cilsWritingTasksFor = (level: CilsLevel): CilsWritingTask[] => CILS_WRITING_TASKS_BY_LEVEL[level];

export const CILS_SPEAKING_TASKS_BY_LEVEL: Record<CilsLevel, CilsSpeakingTask[]> = {
    A1: [
        { id: 's1', label: 'Task 1 — Introduce yourself', guide: 'Speak about yourself: name, country, work/study, family, hobbies. ~1 minute.', seconds: 60, prompt: 'Presentati: come ti chiami, da dove vieni, dove abiti, che lavoro fai o cosa studi, due hobby.' },
        { id: 's2', label: 'Task 2 — Ask & answer + request', guide: 'Ask the examiner questions, answer theirs, make a simple request. ~1 minute.', seconds: 60, prompt: 'Fai due domande al tuo insegnante (orari del corso, dove mangiare). Rispondi alle sue domande. Poi chiedi un favore semplice (un libro, aiuto con una parola).' },
    ],
    A2: [
        { id: 's1', label: 'Task 1 — Describe your life', guide: 'Describe your routine and what you did recently. ~1 minute.', seconds: 60, prompt: 'Descrivi una giornata tipo e poi racconta cosa hai fatto il weekend scorso (passato prossimo!).' },
        { id: 's2', label: 'Task 2 — Arrange something', guide: 'Arrange plans with the examiner: propose, react, agree. ~1 minute 30.', seconds: 90, prompt: 'Con il tuo insegnante organizzate una gita: dove, quando, come, cosa portare. Fai proposte e reagisci alle sue.' },
    ],
    B1: [
        { id: 's1', label: 'Task 1 — Monologue', guide: 'Speak alone on a topic, organised and complete. ~1 minute 30.', seconds: 90, prompt: 'Tema: "La tecnologia nella mia vita". Parla di quali tecnologie usi, quando e perché, e di un vantaggio e uno svantaggio secondo te.' },
        { id: 's2', label: 'Task 2 — Interaction', guide: 'Dialogue with the examiner: react, ask, propose. ~1 minute 30.', seconds: 90, prompt: 'Situazione: scegliete insieme un regalo per un amico. Fai domande, proponi idee, accetta e rifiuta con cortesia (Forse meglio… / Secondo me no, perché…).' },
    ],
    B2: [
        { id: 's1', label: 'Task 1 — Presentation', guide: 'Present a topic with structure and examples. ~2 minutes.', seconds: 120, prompt: 'Scegli un tema (ambiente, lavoro, media): presenta la situazione attuale, i vantaggi e gli svantaggi, la tua valutazione con esempi.' },
        { id: 's2', label: 'Task 2 — Discussion', guide: 'Discuss with the examiner: defend, concede, rebut. ~2 minutes.', seconds: 120, prompt: 'Discuti con l\u2019esaminatore il tuo tema: rispondi alle sue obiezioni, ammetti i punti validi e ribadisci la tua posizione con nuovi argomenti.' },
    ],
    C1: [
        { id: 's1', label: 'Task 1 — Complex presentation', guide: 'Present a complex topic with nuance and register control. ~3 minutes.', seconds: 180, prompt: 'Presenta un tema complesso (es. "Le città dovrebbero limitare il turismo?"): contesto, analisi, posizioni contrapposte, tua valutazione motivata.' },
        { id: 's2', label: 'Task 2 — Debate', guide: 'Debate with the examiner: concession and rebuttal at natural speed. ~2 minutes.', seconds: 120, prompt: 'Dibatti con l\u2019esaminatore: riformula le sue obiezioni, ammetti ciò che è valido e confuta il resto con argomenti nuovi.' },
    ],
    C2: [
        { id: 's1', label: 'Task 1 — Spontaneous sophisticated speech', guide: 'Speak with precision, nuance and stylistic control. ~3 minutes.', seconds: 180, prompt: 'Scegli un tema d\u2019attualità e parla in modo spontaneo e preciso: usa registro alto, espressioni idiomatiche e struttura retorica chiara.' },
        { id: 's2', label: 'Task 2 — Reaction & counterargument', guide: 'React to counterarguments with irony and nuance where appropriate. ~2 minutes.', seconds: 120, prompt: 'L\u2019esaminatore porta controargomenti forti alla tua posizione. Reagisci con eleganza: concesso, riformulato, ribadito.' },
    ],
};

export const cilsSpeakingTasksFor = (level: CilsLevel): CilsSpeakingTask[] => CILS_SPEAKING_TASKS_BY_LEVEL[level];

// ── Lesson generation (the master lesson structure — LONG & DETAILED) ────────
export interface ItalianLesson {
    title: string;
    objective: string;
    vocabulary: { it: string; en: string; gender?: string; plural?: string; example?: { it: string; en: string }; related?: { it: string; en: string }[] }[];
    pronunciation: { it: string; approx: string; en: string }[];
    grammar: { rule: string; explanation: string; examples: { it: string; en: string; breakdown: string[] }[]; commonMistakes: string[] };
    transformations: { type: string; it: string; en: string }[];
    sentenceBuilding: { it: string; en: string }[];
    practice: { instruction: string; question: string; answer: string }[];
    translationPractice: { en: string; it: string }[];
    reverseTranslation: { it: string; en: string }[];
    register: { informal: string; neutral: string; formal: string };
    culture: string;
    freeProduction: string;
    miniTest: { question: string; options: string[]; answer: string }[];
    review: string[];
}

export const generateItalianLesson = async (
    level: CilsLevel,
    topicTitle: string,
    focus: string,
    language: Language = 'Italian'
): Promise<ItalianLesson> => {
    const system = `You are an expert Italian teacher creating a COMPLETE, LONG, DETAILED lesson for the CILS exam (Università per Stranieri di Siena). The student is an ENGLISH speaker at CEFR ${level}. This lesson is the student's main study material — it must be thorough enough to learn from alone. Do NOT be brief; depth and breadth are the requirement.

ABSOLUTE RULES:
- Every Italian sentence, phrase and word MUST be immediately followed by its English translation.
- FOR EVERY NOUN include the article (il/lo/l'/la) AND the plural — teach "il libro — i libri" as one unit, never a bare noun.
- Hold DOUBLE CONSONANTS explicitly: when a key word has one (pizza, abbastanza, nonno), note it — single/double changes meaning.
- Mark tu vs Lei register explicitly where relevant.
- Italian STRUCTURE is the priority: pronoun placement, essere vs stare, passato prossimo auxiliaries and agreement, ci/ne. When Italian constructs an idea differently from English, explain WHY.
- Explain the reason behind every rule; never just state it.
- Do not teach content above ${level} level, but be exhaustive WITHIN it.
- Where Italian culture helps (festivals, food culture, regional identity), include it.

Return ONLY valid JSON with ALL of these fields, fully populated:
{
 "title":"lesson title",
 "objective":"what the learner will be able to DO after this lesson",
 "vocabulary":[12-16 items, each {"it":"word/phrase WITH article if noun","en":"English","gender":"masculine|feminine for every noun; omit for verbs/phrases","plural":"the plural for every noun (i libri); omit otherwise","example":{"it":"example sentence","en":"English"},"related":[{"it":"related word with article","en":"meaning"}]} — include related words for at least 6 items],
 "pronunciation":[4-6 items {"it":"word/phrase","approx":"simple honest English approximation (admit when imperfect)","en":"meaning"}] — include at least one double-consonant or c/g note,
 "grammar":{"rule":"the rule in one line","explanation":"4-6 sentences: the rule, the structure, WHY Italian does it this way, contrast with English","examples":[5-6 items {"it":"example","en":"English","breakdown":["word = meaning", ...]} — vary: statement, negative, question, pronoun use...],"commonMistakes":[3-4 items "the mistake English speakers make + the correct pattern"]},
 "transformations":[7-8 items showing the KEY sentence transformed: {"type":"Positive|Negative|Question|Passato prossimo|Imperfetto|Futuro|Condizionale|Congiuntivo trigger","it":"transformed sentence","en":"English"} — all forms of the same core sentence],
 "sentenceBuilding":[4-5 items from very short to fully expanded, each {"it":"...","en":"..."}],
 "practice":[6 exercises {"instruction":"what to do (conjugate/transform/fill in)","question":"exercise in Italian","answer":"the answer"}] — progress from easy to harder,
 "translationPractice":[6 items EN→IT {"en":"English sentence","it":"correct Italian"}],
 "reverseTranslation":[4 items IT→EN {"it":"Italian sentence","en":"English"}],
 "register":{"informal":"tu version with an example","neutral":"the everyday standard version","formal":"Lei version with an example"},
 "culture":"a short cultural note connected to the lesson (Italy, its regions and everyday life)",
 "freeProduction":"a personal production task with 3-4 guiding questions the student should answer",
 "miniTest":[5 MCQs {"question":"question","options":["a","b","c","d"],"answer":"correct option"}] covering different parts of the lesson,
 "review":["2-3 items to review from earlier in the level, tied to this lesson"]
}
Do not omit any field. Do not shorten. This is the student's textbook chapter.`;
    const raw = await chat(system, `Create the complete ${level} CILS lesson: "${topicTitle}". Focus: ${focus}.`, 8000, true);
    return parseJSON(raw);
};

// ── Listening exercise ────────────────────────────────────────────────────────
export interface ItalianListening {
    scenario: string;
    lines: { speaker: string; it: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateItalianListening = async (level: CilsLevel, language: Language = 'Italian'): Promise<ItalianListening> => {
    const system = `You create CILS LISTENING practice. CILS listening: announcements, conversations, phone messages, radio items, each heard ONCE, difficulty A1→C2.
Create a realistic recording script for a ${level} learner. Return ONLY valid JSON:
{"scenario":"one line describing the situation (e.g. 'An announcement in Firenze Santa Maria Novella station')","lines":[{"speaker":"Name or Role","it":"what they say","en":"English translation"}],"questions":[{"question":"MCQ in ENGLISH about main idea, details, numbers, speaker intention or inference","options":["4 options"],"answer":"correct option"}]}
Rules:
- 5-7 short lines of natural spoken Italian for the recording.
- 4 questions testing DIFFERENT skills: main idea, a detail (number/time/place), speaker intention, and one inference.
- Questions and options in ENGLISH (they test comprehension of the Italian audio).`;
    const raw = await chat(system, `Create a ${level} CILS listening exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Reading exercise ──────────────────────────────────────────────────────────
export interface ItalianReading {
    title: string;
    paragraphs: { it: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateItalianReading = async (level: CilsLevel, language: Language = 'Italian'): Promise<ItalianReading> => {
    const system = `You create CILS READING practice. CILS reading: signs, ads, notices, emails, articles, testing skimming, scanning, detail, paraphrase and inference.
Create one realistic document for a ${level} learner. Return ONLY valid JSON:
{"title":"document type + title (e.g. 'Avviso — Regole del condominio')","paragraphs":[{"it":"the Italian text (correct double consonants and accents!)","en":"English translation (hidden until after)"}],"questions":[{"question":"MCQ in ENGLISH","options":["4 options"],"answer":"correct option"}]}
Rules:
- 3-4 short paragraphs of authentic-style Italian writing (notice, ad, email, article...).
- 4 questions testing DIFFERENT skills: main idea, detail location, paraphrase recognition, inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create a ${level} CILS reading exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Writing evaluation ────────────────────────────────────────────────────────
export interface ItalianWritingFeedback {
    estimatedLevel: string;
    score100: number;
    strengths: string[];
    corrections: { original: string; corrected: string; why: string }[];
    improvements: string[];
    taskCompletion: string;
}
export const evaluateItalianWriting = async (
    taskLabel: string, taskGuide: string, minWords: number, text: string, level: CilsLevel
): Promise<ItalianWritingFeedback> => {
    const system = `You are a CILS examiner evaluating a practice submission for ${taskLabel} (${taskGuide}). Target level of the student: ${level}. Grade the text on /100 (CILS scale for ${level === 'A1' || level === 'A2' ? 'A-levels the scale is 60 — still report /100 as a practice estimate' : 'B levels and above'}).
Grade strictly but encouragingly. Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS text","score100":0-100,"strengths":["2-3 things done well"],"corrections":[{"original":"the student's exact wrong sentence/phrase","corrected":"the corrected version","why":"the grammar reason in English"}],"improvements":["3-4 concrete prioritised improvements for the NEXT attempt, tied to CILS criteria: task completion (content points!), coherence, vocabulary, grammar (pronoun placement, auxiliary choice!), spelling (double consonants, accents!)"],"taskCompletion":"did the text cover ALL content points, use the right register (tu/Lei) and respect the length? Be specific."}
Rules: correct EVERY meaningful error (pronoun placement, essere/stare, auxiliary choice, double consonants, accents, register). Use original/corrected/why format. Never invent an official score — this is a practice estimate.`;
    const raw = await chat(system, `Student submission (min ${minWords} words):\n\n${text}`, 3000, true);
    return parseJSON(raw);
};

// ── Speaking evaluation ───────────────────────────────────────────────────────
export interface ItalianSpeakingFeedback {
    estimatedLevel: string;
    strengths: string[];
    transcriptCorrections: { original: string; corrected: string; why: string }[];
    fluencyTips: string[];
    nextAttempt: string;
}
export const evaluateItalianSpeaking = async (
    taskLabel: string, taskGuide: string, taskPrompt: string, transcript: string, level: CilsLevel
): Promise<ItalianSpeakingFeedback> => {
    const system = `You are a CILS examiner evaluating a SPOKEN practice attempt (transcribed by speech-to-text, so ignore spelling — judge grammar and vocabulary from the words). Task: ${taskLabel} — ${taskGuide}. The prompt was: "${taskPrompt}". Target level: ${level}.
Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS performance","strengths":["2-3 strengths"],"transcriptCorrections":[{"original":"what was said (from transcript)","corrected":"better Italian","why":"reason in English"}],"fluencyTips":["2-3 tips on flow, connectors, pronoun placement, tu/Lei for the CILS oral format"],"nextAttempt":"one concrete thing to do differently next time"}
Correct grammar from the transcript. This is a practice estimate, never an official score.`;
    const raw = await chat(system, `Transcript of the student's spoken answer:\n\n${transcript || '(silence or nothing transcribed)'}`, 2500, true);
    return parseJSON(raw);
};
