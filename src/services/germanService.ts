// Goethe-Zertifikat preparation (Goethe-Institut) — AI generation + exam constants.
// Mirror of spanishService.ts. Format verified against Goethe-Institut published
// structure (Sep 2026): four modules (Lesen, Hören, Schreiben, Sprechen), each
// scored /25 → /100; pass ≈ 60/100 overall (at B1+ most modules need ≥15/25).
import type { Language } from '../store/useAppStore';
import { chat, parseJSON } from './aiService';

export type GoetheLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// Official per-level module times (Goethe-Institut, Sep 2026).
export interface GoetheLevelFormat {
    reading: string;
    listening: string;
    writing: string;
    speaking: string;
}
export const GOETHE_LEVEL_FORMATS: Record<GoetheLevel, GoetheLevelFormat> = {
    A1: {
        reading: 'Lesen · 3 tasks · 25 min — signs, ads, short notices',
        listening: 'Hören · 2 tasks · 20 min — announcements, short conversations',
        writing: 'Schreiben · 2 tasks · 20 min — fill a form + short personal message',
        speaking: 'Sprechen · 4 parts · ~15 min (group exam) — introduce yourself, ask & answer, request',
    },
    A2: {
        reading: 'Lesen · 30 min — ads, emails, short articles',
        listening: 'Hören · 30 min — conversations, announcements, phone messages',
        writing: 'Schreiben · 30 min — everyday messages, short email',
        speaking: 'Sprechen · ~15 min (group) — questions about yourself + arranging something',
    },
    B1: {
        reading: 'Lesen · 5 tasks · 65 min — blogs, emails, articles, ads, instructions',
        listening: 'Hören · ~40 min — announcements, talks, conversations, radio',
        writing: 'Schreiben · 2 tasks · 60 min — informal email/forum post + formal email (3 content points each)',
        speaking: 'Sprechen · ~15 min (in PAIRS) — joint planning, presentation, questions',
    },
    B2: {
        reading: 'Lesen · 65 min — forum posts, articles, commentaries, regulations',
        listening: 'Hören · ~40 min — interviews, presentations, radio',
        writing: 'Schreiben · 2 tasks · 75 min — forum post defending an opinion + formal professional message',
        speaking: 'Sprechen · 15 min — short presentation + argument-based discussion',
    },
    C1: {
        reading: 'Lesen · 65 min — articles, commentaries, instructions with implicit meaning',
        listening: 'Hören · 40 min — interviews, presentations, everyday remarks, radio',
        writing: 'Schreiben · 2 tasks · 75 min — opinion forum post + formal professional message',
        speaking: 'Sprechen · 20 min — short lecture on a complex topic + discussion',
    },
    C2: {
        reading: 'Lesen · 80 min — complex texts with implicit meaning (GDS)',
        listening: 'Hören · ~35 min — media reports, expert interviews at natural speed',
        writing: 'Schreiben · 80 min — reword a report extract + structured text (letter to the editor, review)',
        speaking: 'Sprechen · ~15 min — complex-topic presentation + discussion with counterarguments',
    },
};

export const GOETHE_PASS_NOTE = 'Each module is scored /25 (total /100). Pass ≈ 60/100 overall; at B1 and above most modules also require a minimum of 15/25. Guide values for practice estimates — check your level\'s official rules.';

// Rough practice % → /25 module estimate.
export const to25 = (pct: number) => Math.round((pct / 100) * 25);
// Rough practice % → CEFR level estimate.
export const pctToCefr = (pct: number): string =>
    pct >= 92 ? 'C2' : pct >= 82 ? 'C1' : pct >= 68 ? 'B2' : pct >= 52 ? 'B1' : pct >= 38 ? 'A2' : pct >= 20 ? 'A1' : '<A1';
export const cefrIndex = (l: string) => ['<A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(l);

// ── Vocabulary: Goethe-themed domains ────────────────────────────────────────
export const GOETHE_VOCAB_TOPICS: { id: string; label: string; hint: string }[] = [
    { id: 'core', label: 'Core Words', hint: 'the absolute highest-frequency words for this CEFR level — pronouns, key verbs, essential nouns and function words the Goethe exam repeats constantly' },
    { id: 'daily', label: 'Daily Life', hint: 'everyday routines, food, cooking, errands, appointments, weather, neighbours, die Wohnung' },
    { id: 'family', label: 'Family & Relationships', hint: 'family members, relationships, personality, celebrations, social life' },
    { id: 'food', label: 'Food & Restaurants', hint: 'food, drinks, ordering, the menu, German food culture (das Frühstück, die Konditorei), complaining politely' },
    { id: 'travel', label: 'Travel & Transport', hint: 'die Bahn, tickets, hotels, holidays, directions, German trains and cities, travel problems' },
    { id: 'shopping', label: 'Shopping & Money', hint: 'shops, prices, clothes, returns, banking, budgeting, Bürokratie of German purchases (Pfand, Kassenbon)' },
    { id: 'work', label: 'Work & Professions', hint: 'jobs, interviews, CVs, workplaces, salaries, schedules, German work culture, Bewerbung' },
    { id: 'education', label: 'Education', hint: 'school, university, courses, exams, studying, Anmeldung at university, learning languages' },
    { id: 'health', label: 'Health', hint: 'the body, illness, doctors, pharmacies (Apotheke vs Drogerie!), insurance, appointments' },
    { id: 'tech', label: 'Technology & Media', hint: 'phones, computers, the internet, apps, social media, news, German media landscape' },
    { id: 'environment', label: 'Environment & Climate', hint: 'climate change, recycling (Mülltrennung!), energy, protecting nature, German green culture' },
    { id: 'society', label: 'Society & Culture', hint: 'festivals, traditions, music, film, literature, German and Austrian/Swiss customs, social issues' },
    { id: 'economy', label: 'Economy & Politics', hint: 'money, economy, government, elections, rights, German administration (Bürokratie, Ämter) — B1+' },
    { id: 'idioms', label: 'Idioms & Expressions', hint: 'high-frequency German idioms and fixed expressions (es geht um, Lust haben auf, Bescheid wissen) that make German natural — B1+' },
];

// ── Curriculum syllabus (per the master A0→C2 framework) ─────────────────────
export const GOETHE_SYLLABUS: Record<GoetheLevel, { title: string; slug: string; focus: string }[]> = {
    A1: [
        { title: 'Greetings, Introductions & sein/haben', slug: 'greetings', focus: 'Wie heißt du?, du vs Sie, ich bin/ich habe, numbers, Wie geht es Ihnen?' },
        { title: 'Family & Possessives', slug: 'family', focus: 'family words, mein/dein/sein/ihr, describing people,sein vs haben' },
        { title: 'Food, Shopping & der/die/das', slug: 'shopping', focus: 'gender and articles, accusative of der-words (den), prices, ordering, Ich möchte…' },
        { title: 'Daily Routine & Separable Verbs', slug: 'routine', focus: 'aufstehen, einkaufen — the flying prefix, time expressions, um/von/bis' },
        { title: 'Free Time & Modal Verbs', slug: 'freetime', focus: 'können/müssen/wollen/möchten + sentence brackets, hobbies, gern' },
        { title: 'Questions & Negation', slug: 'questions', focus: 'W-questions, verb-first questions, nicht vs kein, W-words' },
    ],
    A2: [
        { title: 'The Four Cases & Articles', slug: 'faelle', focus: 'Nominativ/Akkusativ/Dativ with der- and ein-words, personal pronouns in case' },
        { title: 'Perfekt — the Conversational Past', slug: 'perfekt', focus: 'haben vs sein, Partizip II, ge- inside separable verbs' },
        { title: 'Dative & the Dativ Verbs', slug: 'dativ', focus: 'Dativ objects, mit/bei/zu/aus/seit, helfen/gehören/schmecken + Dativ' },
        { title: 'Two-Way Prepositions', slug: 'wo-wechsel', focus: 'in/an/auf/über…: location → Dativ, movement → Akkusativ, wohin vs wo' },
        { title: 'Subordinate Clauses', slug: 'nebensaetze', focus: 'dass, weil, wenn, ob — verb to the END; als/wenn for time' },
        { title: 'Comparisons & Body/Health', slug: 'vergleich', focus: 'groß/größer/am größten, als vs wie, beim Arzt, Krankheit' },
    ],
    B1: [
        { title: 'Konjunktiv II & Hypotheticals', slug: 'konjunktiv2', focus: 'würde, wäre, hätte, könnte; Wenn…, würde…; polite requests' },
        { title: 'Relative Clauses', slug: 'relativsaetze', focus: 'der/die/das/den/dem + welcher, preposition + relative pronoun, wessen' },
        { title: 'Passive Basics', slug: 'passiv', focus: 'werden + Partizip II: Das wird gemacht, es wird gebaut — impersonal passive' },
        { title: 'Präteritum & Narration', slug: 'praeteritum', focus: 'written past, war/hatte/konnte/musste, telling stories' },
        { title: 'Adjective Declension Complete', slug: 'adjektive', focus: 'after der-words, ein-words and zero article — the A2/B1 milestone' },
        { title: 'Work, Bewerbung & Society', slug: 'arbeit', focus: 'job applications, interviews, German work culture, expressing opinions with reasons' },
    ],
    B2: [
        { title: 'Passive Masterclass & Alternatives', slug: 'passiv-master', focus: 'all tenses passive, von/durch, sich lassen + Infinitiv, sein zu + Infinitiv' },
        { title: 'Konjunktiv I & Indirect Speech', slug: 'konjunktiv1', focus: 'reported speech, journalism: Er sagte, er sei/habe/habe gegessen' },
        { title: 'Argumentation & Connectors', slug: 'argumentation', focus: 'claim → reason → example → counterargument → conclusion; dennoch, allerdings, folglich' },
        { title: 'Nominalization & Participles', slug: 'nominalisierung', focus: 'verb → noun style, Partizip I/II as adjectives, extended attributes' },
        { title: 'Formal Register & Business German', slug: 'register', focus: 'Sehr geehrte…, Mit freundlichen Grüßen, formal emails, Bürokratie German' },
        { title: 'Idioms & Natural German', slug: 'idiome', focus: 'es geht um, Lust haben auf, Bescheid wissen, redewendungen as units' },
    ],
    C1: [
        { title: 'Advanced Syntax & Nominal Style', slug: 'nominalstil', focus: 'participial constructions, extended attributes, academic German' },
        { title: 'Implicit Meaning & Nuance', slug: 'nuance', focus: 'irony, understatement, implied criticism, register shifts' },
        { title: 'Academic & Professional Writing', slug: 'akademisch', focus: 'structured essays, reports, hedging, formal discourse markers' },
        { title: 'Complex Debate', slug: 'debatte', focus: 'spontaneous sophisticated discourse, conceding and rebutting' },
    ],
    C2: [
        { title: 'Stylistic Precision', slug: 'stil', focus: 'choosing the exact construction a native would choose, Umschreibung' },
        { title: 'Literary & Journalistic German', slug: 'literarisch', focus: 'authentic material, metaphor, irony, stylistic registers' },
        { title: 'Regional Variation', slug: 'regional', focus: 'Germany, Austria, Switzerland — vocabulary, pronunciation, culture' },
    ],
};

// ── Per-level writing & speaking tasks (Goethe format) ───────────────────────
interface GoetheWritingTask { id: string; label: string; guide: string; minWords: number; maxWords?: number; minutes: number; prompt: string }
interface GoetheSpeakingTask { id: string; label: string; guide: string; seconds: number; prompt: string }

export const GOETHE_WRITING_TASKS_BY_LEVEL: Record<GoetheLevel, GoetheWritingTask[]> = {
    A1: [
        { id: 'w1', label: 'Task 1 — Fill the form', guide: 'Fill in a form with your details (name, address, country, language). A few words per field.', minWords: 10, minutes: 8, prompt: 'Sie besuchen einen Deutschkurs in Berlin. Füllen Sie das Anmeldeformular aus: Vorname, Nachname, Land, Straße und Hausnummer, Postleitzahl und Stadt, Muttersprache, Beruf.' },
        { id: 'w2', label: 'Task 2 — Short personal message', guide: 'Write a short personal note of ~30 words. Du register.', minWords: 25, maxWords: 40, minutes: 12, prompt: 'Sie sind krank und können tomorrow nicht zum Kurs kommen. Schreiben Sie an Ihren Kursleiter: Entschuldigung, Grund, Bitte um die Hausaufgaben. Etwa 30 Wörter.' },
    ],
    A2: [
        { id: 'w1', label: 'Task 1 — Everyday message', guide: 'Write a short everyday message covering 3 content points. ~40–50 words. Du register.', minWords: 35, maxWords: 55, minutes: 15, prompt: 'Ihr Freund/Ihre Freundin hat Geburtstag. Schreiben Sie eine Nachricht: Glückwünsche, was Sie schenken, eine Einladung zum Essen. Schreiben Sie zu allen drei Punkten.' },
        { id: 'w2', label: 'Task 2 — Short email', guide: 'Write a short email with 3 content points. ~50 words.', minWords: 45, maxWords: 65, minutes: 15, prompt: 'Sie wollen einen Deutschkurs machen. Schreiben Sie an die Sprachschule: Welchen Kurs wollen Sie? Wann und warum? Eine Frage an die Schule. Schreiben Sie zu allen drei Punkten.' },
    ],
    B1: [
        { id: 'w1', label: 'Task 1 — Informal email / forum post', guide: 'Write a personal email or forum post covering 3 content points. ~80 words. Du register.', minWords: 70, maxWords: 90, minutes: 25, prompt: 'Ihr deutscher Freund mochte das letzte Buch, das Sie ihm empfohlen haben. Er fragt nach einem neuen Tipp. Schreiben Sie einen Forum-Beitrag oder eine E-Mail: Welches Buch empfehlen Sie? Worum geht es? Warum gefällt es Ihnen? Schreiben Sie zu allen drei Punkten, etwa 80 Wörter.' },
        { id: 'w2', label: 'Task 2 — Formal email', guide: 'Write a formal email covering 3 content points. ~80 words. Sie register.', minWords: 70, maxWords: 90, minutes: 25, prompt: 'Sie waren letztes Wochenende in einem Hotel und sind nicht zufrieden. Schreiben Sie eine formelle E-Mail an das Hotel: Was war das Problem? Wie haben Sie sich gefühlt? Was erwarten Sie jetzt? Schreiben Sie eine formelle Anrede und Verabschiedung, etwa 80 Wörter.' },
    ],
    B2: [
        { id: 'w1', label: 'Task 1 — Forum post: defend your opinion', guide: 'Defend your opinion on a current social issue in a forum post. ~150 words, argumented.', minWords: 130, maxWords: 170, minutes: 40, prompt: 'In einem Online-Forum diskutieren Sie: "Homeoffice ist die Zukunft der Arbeit." Schreiben Sie Ihren Beitrag: Ihre Position, mindestens zwei Argumente mit Beispielen, einen Gegenargument und Ihre Antwort darauf, ein Fazit. Etwa 150 Wörter.' },
        { id: 'w2', label: 'Task 2 — Formal professional message', guide: 'Write a formal message in a professional context. ~150 words. Sie register.', minWords: 130, maxWords: 170, minutes: 35, prompt: 'Sie arbeiten bei einer Firma in München. Ein wichtiger Kunde hat sich über eine verspätete Lieferung beschwert. Schreiben Sie eine formelle E-Mail: Entschuldigung, Erklärung des Problems, Ihre Lösung, nächste Schritte. Etwa 150 Wörter.' },
    ],
    C1: [
        { id: 'w1', label: 'Task 1 — Argumentative forum post', guide: 'Present and justify your opinion on a complex issue with nuanced argumentation. ~200 words.', minWords: 180, maxWords: 230, minutes: 40, prompt: 'Diskutieren Sie in einem Magazin-Forum: "KI wird mehr Gewinner als Verlierer haben." Schreiben Sie einen differenzierten Beitrag: Ihre These, gestützte Argumente, Gegenpositionen mit Rekonstruktion und Widerlegung, ein ausgewogenes Fazit. Etwa 200 Wörter.' },
        { id: 'w2', label: 'Task 2 — Formal professional message', guide: 'Write a formal professional message with structured content. ~180 words.', minWords: 160, maxWords: 210, minutes: 35, prompt: 'Ihr Vorgesetzter bittet Sie um einen Bericht für die Geschäftsleitung: Ihr Team hat ein Projekt abgeschlossen. Schreiben Sie den Bericht: Ausgangslage, Ergebnis, Probleme und Lösungen, Empfehlungen. Formeller Stil, etwa 180 Wörter.' },
    ],
    C2: [
        { id: 'w1', label: 'Task 1 — Reword a report extract', guide: 'Reword the given extract using different structures (Umschreibung) without changing the meaning.', minWords: 60, maxWords: 100, minutes: 30, prompt: 'Formulieren Sie den folgenden Absatz um (Passiv ↔ Aktiv, Nominalstil ↔ Verbalstil, Synonyme), ohne den Sinn zu verändern: "Die Einführung der neuen Regelung führte zu erheblichen Verzögerungen bei der Bearbeitung von Anträgen. Viele Bürger kritisierten den bürokratischen Aufwand." Schreiben Sie eine Alternative mit gleicher Bedeutung.' },
        { id: 'w2', label: 'Task 2 — Structured text', guide: 'Write a well-structured text: letter to the editor or book review, literary register. ~350 words.', minWords: 300, maxWords: 400, minutes: 50, prompt: 'Schreiben Sie einen Leserbrief an eine überregionale Zeitung zu einem aktuellen Kulturthema Ihrer Wahl: klare Stellungnahme, sophistizierte Argumentation, rhetorische Mittel, literarischer Stil. Etwa 350 Wörter.' },
    ],
};

export const goetheWritingTasksFor = (level: GoetheLevel): GoetheWritingTask[] =>
    GOETHE_WRITING_TASKS_BY_LEVEL[level];

export const GOETHE_SPEAKING_TASKS_BY_LEVEL: Record<GoetheLevel, GoetheSpeakingTask[]> = {
    A1: [
        { id: 's1', label: 'Part 1 — Introduce yourself', guide: 'Speak about yourself with word cards: name, country, job, languages, hobbies. ~1 minute.', seconds: 60, prompt: 'Stellen Sie sich vor: Name, Alter, Land, Beruf, Familie, zwei Hobbys. Sprechen Sie etwa eine Minute.' },
        { id: 's2', label: 'Part 2 — Ask & answer + request', guide: 'Ask the examiner questions from word cards, answer their questions, make a simple request. ~2 minutes.', seconds: 120, prompt: 'Stellen Sie dem Prüfer Fragen (Wann? Wo? Wie viel?) und antworten Sie auf seine Fragen zu Alltagsthemen. Danach: Bitten Sie um etwas (ein Buch, Hilfe, ein Stift).' },
    ],
    A2: [
        { id: 's1', label: 'Part 1 — Questions about yourself', guide: 'Answer questions about yourself, your home, your routine. ~1 minute.', seconds: 60, prompt: 'Antworten Sie: Woher kommen Sie? Wo wohnen Sie? Was machen Sie in Ihrer Freizeit? Wie war Ihr letztes Wochenende?' },
        { id: 's2', label: 'Part 2 — Arrange something', guide: 'Negotiate and arrange something with the examiner (meeting, plans). ~2 minutes.', seconds: 120, prompt: 'Sie und der Prüfer wollen zusammen etwas unternehmen (Kino, Essen, Ausflug). Machen Sie Vorschläge, reagieren Sie auf seine Vorschläge, vereinbaren Sie Zeit und Ort (Wollen wir…? Gut, dann treffen wir uns um…).' },
    ],
    B1: [
        { id: 's1', label: 'Part 1 — Plan something together', guide: 'In the real exam this is done in PAIRS: plan an event, make suggestions, agree and disagree. ~2 minutes.', seconds: 120, prompt: 'Sie und Ihr Partner planen eine Abschlussfeier für Ihren Deutschkurs: Ort, Datum, Essen, Musik, Budget. Machen Sie Vorschläge (Wie wäre es mit…?), stimmen Sie zu, lehnen Sie höflich ab, einigen Sie sich.' },
        { id: 's2', label: 'Part 2 — Presentation + questions', guide: 'Give a short presentation on a topic, then answer questions. ~2 minutes.', seconds: 120, prompt: 'Thema: "Medien in meinem Leben". Präsentieren Sie: welche Medien Sie nutzen, was Sie darüber denken, eine persönliche Erfahrung. Danach beantworten Sie Fragen des Prüfers.' },
    ],
    B2: [
        { id: 's1', label: 'Part 1 — Short presentation', guide: 'Present a topic from a choice, with structure and examples. ~2 minutes.', seconds: 120, prompt: 'Themenwahl: "SozialMedia", "Mobilität", "Arbeitswelt". Präsentieren Sie: aktuelle Situation, Vorteile/Nachteile, Ihre Einschätzung mit Beispielen. Strukturieren Sie deutlich.' },
        { id: 's2', label: 'Part 2 — Discussion', guide: 'Discuss the topic with the examiner: react to arguments, defend and concede. ~2 minutes.', seconds: 120, prompt: 'Diskutieren Sie mit dem Prüfer über Ihr Thema: reagieren Sie auf seine Argumente, verteidigen Sie Ihre Position, räumen Sie berechtigte Punkte ein und halten Sie dagegen.' },
    ],
    C1: [
        { id: 's1', label: 'Part 1 — Short lecture', guide: 'Give a structured mini-lecture on a complex topic. ~3 minutes.', seconds: 180, prompt: 'Halten Sie eine kurze Präsentation zu einem komplexen Thema (z.B. "Digitalisierung der Bildung"): Ausgangslage, Entwicklung, Chancen und Risiken, Ihre bewertete Perspektive.' },
        { id: 's2', label: 'Part 2 — Controversial discussion', guide: 'Discuss a controversial topic: nuanced positions, concessions, rebuttals. ~3 minutes.', seconds: 180, prompt: 'Diskutieren Sie mit dem Prüfer ein kontroverses Thema (z.B. "Recht auf Anonymität im Internet"): differenzieren Sie Positionen, räumen Sie Gegenargumente ein und widerlegen Sie sie präzise.' },
    ],
    C2: [
        { id: 's1', label: 'Part 1 — Complex presentation', guide: 'Present a complex topic with stylistic precision and rhetorical awareness. ~3 minutes.', seconds: 180, prompt: 'Präsentieren Sie ein komplexes Thema Ihrer Wahl (Wissenschaft, Kultur, Gesellschaft) mit klarer Gliederung, präziser Sprache und rhetorischen Mitteln.' },
        { id: 's2', label: 'Part 2 — Discussion with counterarguments', guide: 'Respond to counterarguments spontaneously at natural speed. ~2 minutes.', seconds: 120, prompt: 'Der Prüfer bringt Gegenargumente zu Ihrer Präsentation. Reagieren Sie spontan: differenzieren, einräumen, widerlegen — mit idiomatischem Deutsch.' },
    ],
};

export const goetheSpeakingTasksFor = (level: GoetheLevel): GoetheSpeakingTask[] =>
    GOETHE_SPEAKING_TASKS_BY_LEVEL[level];

// ── Lesson generation (the master lesson structure — LONG & DETAILED) ────────
export interface GermanLesson {
    title: string;
    objective: string;
    vocabulary: { de: string; en: string; gender?: string; plural?: string; example?: { de: string; en: string }; related?: { de: string; en: string }[] }[];
    pronunciation: { de: string; approx: string; en: string }[];
    grammar: { rule: string; explanation: string; examples: { de: string; en: string; breakdown: string[] }[]; commonMistakes: string[] };
    transformations: { type: string; de: string; en: string }[];
    sentenceBuilding: { de: string; en: string }[];
    practice: { instruction: string; question: string; answer: string }[];
    translationPractice: { en: string; de: string }[];
    reverseTranslation: { de: string; en: string }[];
    register: { informal: string; neutral: string; formal: string };
    culture: string;
    freeProduction: string;
    miniTest: { question: string; options: string[]; answer: string }[];
    review: string[];
}

export const generateGermanLesson = async (
    level: GoetheLevel,
    topicTitle: string,
    focus: string,
    language: Language = 'German'
): Promise<GermanLesson> => {
    const system = `You are an expert German teacher creating a COMPLETE, LONG, DETAILED lesson for the Goethe-Zertifikat exam. The student is an ENGLISH speaker at CEFR ${level}. This lesson is the student's main study material — it must be thorough enough to learn from alone. Do NOT be brief; depth and breadth are the requirement.

ABSOLUTE RULES:
- Every German sentence, phrase and word MUST be immediately followed by its English translation.
- FOR EVERY NOUN include gender (der/die/das) AND plural form in the vocabulary — teach "der Tisch — die Tische" as one unit, never a bare noun.
- German STRUCTURE is the priority: word order (verb position 2/1/final), case endings, sentence brackets, separable prefixes. When German constructs an idea differently from English, explain WHY.
- Explain the reason behind every rule; never just state it.
- Mark du/Sie register explicitly where relevant.
- Do not teach content above ${level} level, but be exhaustive WITHIN it.
- Where German/DACH culture helps (Austria, Switzerland included), include it.

Return ONLY valid JSON with ALL of these fields, fully populated:
{
 "title":"lesson title",
 "objective":"what the learner will be able to DO after this lesson",
 "vocabulary":[12-16 items, each {"de":"word/phrase WITH article if noun","en":"English","gender":"der|die|das for every noun; omit for verbs/phrases","plural":"the plural form for every noun (die Tische); omit otherwise","example":{"de":"example sentence","en":"English"},"related":[{"de":"related word with article","en":"meaning"}]} — include related words for at least 6 items],
 "pronunciation":[4-6 items {"de":"word/phrase","approx":"simple honest English approximation (admit when imperfect)","en":"meaning"}] — include at least one umlaut/ch/sp-st note,
 "grammar":{"rule":"the rule in one line","explanation":"4-6 sentences: the rule, the structure, WHY German does it this way, contrast with English","examples":[5-6 items {"de":"example","en":"English","breakdown":["word = meaning", ...]} — vary: statement, negative, question, subordinate clause...],"commonMistakes":[3-4 items "the mistake English speakers make + the correct pattern"]},
 "transformations":[7-8 items showing the KEY sentence transformed: {"type":"Positive|Negative|Question|Perfekt|Präteritum|Futur|Conditional|Subordinate clause","de":"transformed sentence","en":"English"} — all forms of the same core sentence],
 "sentenceBuilding":[4-5 items from very short to fully expanded, each {"de":"...","en":"..."}],
 "practice":[6 exercises {"instruction":"what to do (conjugate/transform/fill in)","question":"exercise in German","answer":"the answer"}] — progress from easy to harder,
 "translationPractice":[6 items EN→DE {"en":"English sentence","de":"correct German"}],
 "reverseTranslation":[4 items DE→EN {"de":"German sentence","en":"English"}],
 "register":{"informal":"du version with an example","neutral":"the everyday standard version","formal":"Sie version with an example"},
 "culture":"a short cultural note connected to the lesson (Germany/Austria/Switzerland)",
 "freeProduction":"a personal production task with 3-4 guiding questions the student should answer",
 "miniTest":[5 MCQs {"question":"question","options":["a","b","c","d"],"answer":"correct option"}] covering different parts of the lesson,
 "review":["2-3 items to review from earlier in the level, tied to this lesson"]
}
Do not omit any field. Do not shorten. This is the student's textbook chapter.`;
    const raw = await chat(system, `Create the complete ${level} Goethe-Zertifikat lesson: "${topicTitle}". Focus: ${focus}.`, 8000, true);
    return parseJSON(raw);
};

// ── Listening exercise ────────────────────────────────────────────────────────
export interface GermanListening {
    scenario: string;
    lines: { speaker: string; de: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateGermanListening = async (level: GoetheLevel, language: Language = 'German'): Promise<GermanListening> => {
    const system = `You create Goethe-Zertifikat LISTENING practice. Goethe listening: announcements, conversations, phone messages, radio items, each heard ONCE, difficulty A1→C2.
Create a realistic recording script for a ${level} learner. Return ONLY valid JSON:
{"scenario":"one line describing the situation (e.g. 'A Bahnsteig announcement at München Hauptbahnhof')","lines":[{"speaker":"Name or Role","de":"what they say","en":"English translation"}],"questions":[{"question":"MCQ in ENGLISH about main idea, details, numbers, speaker intention or inference","options":["4 options"],"answer":"correct option"}]}
Rules:
- 5-7 short lines of natural spoken German for the recording.
- 4 questions testing DIFFERENT skills: main idea, a detail (number/time/place), speaker intention, and one inference.
- Questions and options in ENGLISH (they test comprehension of the German audio).`;
    const raw = await chat(system, `Create a ${level} Goethe-Zertifikat listening exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Reading exercise ──────────────────────────────────────────────────────────
export interface GermanReading {
    title: string;
    paragraphs: { de: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generateGermanReading = async (level: GoetheLevel, language: Language = 'German'): Promise<GermanReading> => {
    const system = `You create Goethe-Zertifikat READING practice. Goethe reading: signs, ads, notices, emails, forum posts, articles, testing skimming, scanning, detail, paraphrase and inference.
Create one realistic document for a ${level} learner. Return ONLY valid JSON:
{"title":"document type + title (e.g. 'Aushang — Hausregeln')","paragraphs":[{"de":"the German text (ALL nouns capitalised, correct commas!)","en":"English translation (hidden until after)"}],"questions":[{"question":"MCQ in ENGLISH","options":["4 options"],"answer":"correct option"}]}
Rules:
- 3-4 short paragraphs of authentic-style German writing (notice, ad, email, article, forum post...).
- 4 questions testing DIFFERENT skills: main idea, detail location, paraphrase recognition, inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create a ${level} Goethe-Zertifikat reading exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Writing evaluation ────────────────────────────────────────────────────────
export interface GermanWritingFeedback {
    estimatedLevel: string;
    score25: number;
    strengths: string[];
    corrections: { original: string; corrected: string; why: string }[];
    improvements: string[];
    taskCompletion: string;
}
export const evaluateGermanWriting = async (
    taskLabel: string, taskGuide: string, minWords: number, text: string, level: GoetheLevel
): Promise<GermanWritingFeedback> => {
    const system = `You are a Goethe-Zertifikat examiner evaluating a practice submission for ${taskLabel} (${taskGuide}). Target level of the student: ${level}. Modules are scored /25.
Grade strictly but encouragingly. Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS text","score25":0-25,"strengths":["2-3 things done well"],"corrections":[{"original":"the student's exact wrong sentence/phrase","corrected":"the corrected version","why":"the grammar reason in English"}],"improvements":["3-4 concrete prioritised improvements for the NEXT attempt, tied to Goethe criteria: task completion (content points!), coherence, vocabulary, grammar (case endings, word order!), spelling (noun capitalisation!)"],"taskCompletion":"did the text cover ALL content points, use the right register (du/Sie) and respect the length? Be specific."}
Rules: correct EVERY meaningful error (case endings, word order, verb position, umlauts, noun capitalisation, commas before subordinate clauses). Use original/corrected/why format. Never invent an official score — this is a practice estimate.`;
    const raw = await chat(system, `Student submission (min ${minWords} words):\n\n${text}`, 3000, true);
    return parseJSON(raw);
};

// ── Speaking evaluation ───────────────────────────────────────────────────────
export interface GermanSpeakingFeedback {
    estimatedLevel: string;
    strengths: string[];
    transcriptCorrections: { original: string; corrected: string; why: string }[];
    fluencyTips: string[];
    nextAttempt: string;
}
export const evaluateGermanSpeaking = async (
    taskLabel: string, taskGuide: string, taskPrompt: string, transcript: string, level: GoetheLevel
): Promise<GermanSpeakingFeedback> => {
    const system = `You are a Goethe-Zertifikat examiner evaluating a SPOKEN practice attempt (transcribed by speech-to-text, so ignore spelling — judge grammar and vocabulary from the words). Task: ${taskLabel} — ${taskGuide}. The prompt was: "${taskPrompt}". Target level: ${level}.
Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS performance","strengths":["2-3 strengths"],"transcriptCorrections":[{"original":"what was said (from transcript)","corrected":"better German","why":"reason in English"}],"fluencyTips":["2-3 tips on flow, connectors, word order, du/Sie for the Goethe speaking format"],"nextAttempt":"one concrete thing to do differently next time"}
Correct grammar from the transcript. This is a practice estimate, never an official score.`;
    const raw = await chat(system, `Transcript of the student's spoken answer:\n\n${transcript || '(silence or nothing transcribed)'}`, 2500, true);
    return parseJSON(raw);
};
