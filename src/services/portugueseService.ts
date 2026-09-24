// CAPLE preparation (Centro de Avaliação de Português Língua Estrangeira,
// Universidade de Lisboa) — AI generation + exam constants. Mirror of japaneseService.ts.
// Framework verified against CAPLE published structure (Sep 2026): ACESSO→DUPLE,
// four skills from B1 (CIPLE combines reading+writing), scored 55–100%.
// European Portuguese is the production target; Brazilian marked [BR].
import type { Language } from '../store/useAppStore';
import { chat, parseJSON } from './aiService';

export type CapleLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// CEFR slot → CAPLE exam.
export const CAPLE_OF_LEVEL: Record<CapleLevel, string> = {
    A1: 'CAPLE ACESSO', A2: 'CAPLE CIPLE', B1: 'CAPLE DEPLE', B2: 'CAPLE DIPLE', C1: 'CAPLE DAPLE', C2: 'CAPLE DUPLE',
};

// Official per-level structure (CAPLE, Universidade de Lisboa, Sep 2026).
export interface CapleLevelFormat {
    reading: string;
    writing: string;
    listening: string;
    speaking: string;
}
export const CAPLE_LEVEL_FORMATS: Record<CapleLevel, CapleLevelFormat> = {
    A1: {
        reading: 'ACESSO — basic signs, forms, simple messages',
        writing: 'short forms and personal messages',
        listening: 'slow, clear Portuguese',
        speaking: 'greetings, personal information, simple requests',
    },
    A2: {
        reading: 'CIPLE — combined with writing: ~1h15 total',
        writing: 'forms, short messages, postcards (combined component)',
        listening: '30 min — everyday dialogues, announcements',
        speaking: '~15 min — introductions, personal information, requests',
    },
    B1: {
        reading: 'DEPLE — advertisements, articles, letters, instructions',
        writing: 'personal letters, narratives, opinions (4 components from B1)',
        listening: 'everyday conversations, announcements',
        speaking: 'interaction, simulated situations, opinions',
    },
    B2: {
        reading: 'DIPLE — 75 min · newspapers, reports, brochures',
        writing: '75 min · Parts I–II 160–180 words each + sentence rewriting',
        listening: '40 min · native-speed conversations, radio',
        speaking: '20 min · identification, negotiation, stimuli response',
    },
    C1: {
        reading: 'DAPLE — 90 min · complex articles, implicit meaning',
        writing: '90 min · formal and professional texts',
        listening: '40 min · lectures, debates, interviews',
        speaking: '25 min · presentation, debate, cultural topics',
    },
    C2: {
        reading: 'DUPLE — 120 min · literary, academic, culturally dense texts',
        writing: '105 min · commentary + task-based text, 250–280 words each + rewriting',
        listening: '40 min · rapid speech, irony, regional variation',
        speaking: '25 min · abstract topics, argument, counterargument',
    },
};

export const CAPLE_PASS_NOTE = 'CAPLE scores 55–100%: Suficiente (55–69%), Bom (70–84%), Muito Bom (85–100%). You do NOT need lower exams first — register directly for your level. CIPLE A2 is the minimum for Portuguese nationality; universities commonly ask DIPLE B2. (Requirements change — recheck before applying.)';

// Rough practice % → CEFR level estimate.
export const pctToCefr = (pct: number): string =>
    pct >= 92 ? 'C2' : pct >= 82 ? 'C1' : pct >= 68 ? 'B2' : pct >= 52 ? 'B1' : pct >= 38 ? 'A2' : pct >= 20 ? 'A1' : '<A1';
export const cefrIndex = (l: string) => ['<A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].indexOf(l);
// CAPLE band label for a practice %
export const capleBand = (pct: number): string => pct >= 85 ? 'Muito Bom' : pct >= 70 ? 'Bom' : pct >= 55 ? 'Suficiente' : 'Insuficiente';

// ── Vocabulary: CAPLE-themed domains ─────────────────────────────────────────
export const CAPLE_VOCAB_TOPICS: { id: string; label: string; hint: string }[] = [
    { id: 'core', label: 'Core Words', hint: 'the absolute highest-frequency words for this CEFR band — verbs, nouns, adjectives and function words CAPLE repeats constantly. European Portuguese forms.' },
    { id: 'daily', label: 'Daily Life', hint: 'everyday routines, food, cooking, errands, appointments, weather, a casa, neighbours, Portuguese daily life' },
    { id: 'family', label: 'Family & Relationships', hint: 'family members, relationships, personality, celebrations, social life' },
    { id: 'food', label: 'Food & Restaurants', hint: 'food, drinks, ordering, a ementa, Portuguese food culture (o café, o pão, o bacalhau), complaining politely' },
    { id: 'travel', label: 'Travel & Transport', hint: 'o autocarro, o comboio, tickets, hotels, directions, Portuguese cities, travel problems' },
    { id: 'shopping', label: 'Shopping & Money', hint: 'shops, prices, clothes, returns, banking, budgeting, markets, consumer life' },
    { id: 'work', label: 'Work & Professions', hint: 'jobs, interviews, CVs, workplaces, salaries, schedules, career plans, Portuguese work culture' },
    { id: 'education', label: 'Education', hint: 'school, university, exams, studying, enrolling, student life, learning languages' },
    { id: 'health', label: 'Health', hint: 'the body, illness, doctors, farmácia, appointments, health insurance, healthy habits' },
    { id: 'tech', label: 'Technology & Media', hint: 'phones, computers, the internet, apps, social media, news, Portuguese media' },
    { id: 'environment', label: 'Environment & Climate', hint: 'climate change, pollution, recycling, energy, protecting nature, weather events' },
    { id: 'society', label: 'Society & Culture', hint: 'festivals, traditions, music (fado!), film, literature, regional identities, social issues, the Lusophone world' },
    { id: 'economy', label: 'Economy & Politics', hint: 'money, economy, government, elections, rights, administration, dealing with offices — B1+' },
    { id: 'idioms', label: 'Idioms & Expressions', hint: 'high-frequency Portuguese idioms and fixed expressions (dar-se bem com, estar à toa, ter um jeito) that make Portuguese natural — B1+' },
];

// ── Curriculum syllabus (per the master A0→C2 framework) ─────────────────────
export const CAPLE_SYLLABUS: Record<CapleLevel, { title: string; slug: string; focus: string }[]> = {
    A1: [
        { title: 'Greetings, Introductions & ser/estar', slug: 'greetings', focus: 'olá/bom dia register, chamar-se, tu vs você, ser and estar, numbers' },
        { title: 'Articles, Gender & the à Contractions', slug: 'articulos', focus: 'o/a/os/as, um/uma, do/da/no/na/ao/à, gender patterns' },
        { title: 'Food, Shopping & Present Tense', slug: 'shopping', focus: '-AR/-ER/-IR present, querer/poder, ordering, prices' },
        { title: 'Family & Possessives', slug: 'family', focus: 'family words, meu/minha, describing people, agreement' },
        { title: 'Daily Routine & Reflexives', slug: 'routine', focus: 'levantar-se, chamar-se, reflexive pronouns, time expressions' },
        { title: 'Questions & Negation', slug: 'questions', focus: 'question words, porquê vs porque, não + word order' },
    ],
    A2: [
        { title: 'Passado Perfeito vs Imperfeito', slug: 'passados', focus: 'narrating completed events vs habits/background — the storytelling pair' },
        { title: 'Object Pronouns & Clitics I', slug: 'pronomes', focus: 'o/a/os/as, lhe, ênclise default: chamo-me, dou-lho' },
        { title: 'Futuro, Condicional & Plans', slug: 'futuro', focus: 'vou + infinitive vs falarei, gostaria de, making arrangements' },
        { title: 'Comparisons & Superlatives', slug: 'comparativos', focus: 'mais…do que, tão…como, melhor/pior/maior/menor' },
        { title: 'Travel, Health & Services', slug: 'servicos', focus: 'booking, appointments, farmácia, everyday problem-solving in Portugal' },
        { title: 'CIPLE Writing Workshop', slug: 'ciple-escrita', focus: 'forms, short messages, postcards — the combined reading/writing component' },
    ],
    B1: [
        { title: 'Complete Past System', slug: 'passados-master', focus: 'perfeito vs imperfeito vs mais-que-perfeito — narration mastery' },
        { title: 'Conjuntivo Introduction', slug: 'conjuntivo-intro', focus: 'espero que, penso que, doubt/desire/emotion triggers' },
        { title: 'Relative Clauses & Connectors', slug: 'relativos', focus: 'que, quem, o qual, cujo; porque, embora, por isso' },
        { title: 'The se System & Impersonal', slug: 'se-sistema', focus: 'reflexive, impersonal se, passive se: fala-se, vendem-se' },
        { title: 'Work, Study & Opinions', slug: 'trabalho', focus: 'DEPLE themes: workplace, education, structured opinions with reasons' },
        { title: 'Idioms & Natural Portuguese', slug: 'idiomas', focus: 'dar-se bem com, estar à toa, ter um jeito — expressions as units' },
    ],
    B2: [
        { title: 'Full Conjuntivo System', slug: 'conjuntivo-master', focus: 'presente, imperfeito, futuro do conjuntivo; se-clauses; sequence of tenses' },
        { title: 'The Personal Infinitive', slug: 'infinitivo-pessoal', focus: 'falarmos, para nos encontrarmos — the Portuguese speciality' },
        { title: 'Clitic Placement Masterclass', slug: 'cliticos', focus: 'próclise triggers vs ênclise, mesóclise in formal writing' },
        { title: 'DIPLE Writing Workshop', slug: 'diple-escrita', focus: 'letters + argumentative texts 160–180 words, sentence rewriting' },
        { title: 'DIPLE Speaking Workshop', slug: 'diple-oral', focus: 'negotiation, proposing, rejecting, compromising — Part II dialogue' },
        { title: 'Newspaper & Formal Portuguese', slug: 'imprensa', focus: 'news vocabulary, formal register, passive structures' },
    ],
    C1: [
        { title: 'Advanced Conjuntivo & Hypotheticals', slug: 'conjuntivo-avancado', focus: 'tivesse feito, teria feito — full conditional system' },
        { title: 'DAPLE Writing Workshop', slug: 'daple-escrita', focus: 'formal reports, academic texts, 90-minute composition strategy' },
        { title: 'Implicit Meaning & Nuance', slug: 'nuance', focus: 'irony, understatement, register shifts, cultural references' },
        { title: 'Complex Debate', slug: 'debate', focus: 'spontaneous sophisticated discourse, conceding and rebutting' },
        { title: 'Lectures, Interviews & Note-Taking', slug: 'escuta-academica', focus: 'Follow long spoken arguments, identify examples and conclusions, and infer stance in fast natural speech' },
    ],
    C2: [
        { title: 'Stylistic Precision', slug: 'estilo', focus: 'choosing the exact construction a native would choose' },
        { title: 'Literary & Journalistic Portuguese', slug: 'literario', focus: 'Saramago, Eça de Queiroz, contemporary press — culturally dense texts' },
        { title: 'Lusophone Variation', slug: 'lusofonia', focus: 'Portugal, Brazil, Angola, Mozambique — comprehension across the Portuguese-speaking world' },
        { title: 'Pragmatics & Idiomatic Interaction', slug: 'pragmatica', focus: 'Interpret indirect requests, humour, politeness and idioms across Portuguese-speaking contexts' },
        { title: 'Rhetorical Reading & Commentary', slug: 'retorica', focus: 'Evaluate argument, allusion, evidence and point of view in dense journalism and cultural writing' },
    ],
};

// ── Per-level writing & speaking tasks (CAPLE format) ────────────────────────
interface CapleWritingTask { id: string; label: string; guide: string; minWords: number; maxWords?: number; minutes: number; prompt: string }
interface CapleSpeakingTask { id: string; label: string; guide: string; seconds: number; prompt: string }

export const CAPLE_WRITING_TASKS_BY_LEVEL: Record<CapleLevel, CapleWritingTask[]> = {
    A1: [
        { id: 'w1', label: 'Task 1 — Fill the form', guide: 'Fill a form with your personal details. A few words per field.', minWords: 10, minutes: 8, prompt: 'Preenche o formulário de inscrição no curso de português: nome, nacionalidade, morada, telefone, profissão, língua materna.' },
        { id: 'w2', label: 'Task 2 — Short message', guide: 'Write a short personal message covering 3 points. ~25–40 words.', minWords: 25, maxWords: 40, minutes: 12, prompt: 'Escreve um bilhete a um amigo: desculpa-te porque não podes ir à festa, explica o motivo e propõe outro dia. 25–40 palavras.' },
    ],
    A2: [
        { id: 'w1', label: 'Task 1 — Postcard / note', guide: 'Write a short everyday message covering 3 points. ~40–60 words.', minWords: 40, maxWords: 60, minutes: 20, prompt: 'Escreve um postal das tuas férias em Portugal: onde estás, o que tens feito e o que mais vais fazer. 40–60 palavras.' },
        { id: 'w2', label: 'Task 2 — Short description', guide: 'Describe a person, place or memory. ~50 words.', minWords: 40, maxWords: 60, minutes: 20, prompt: 'Descreve a tua cidade ou o teu bairro: o que há, o que gostas e o que mudarias. 40–60 palavras.' },
    ],
    B1: [
        { id: 'w1', label: 'Task 1 — Personal letter', guide: 'Write a personal letter covering 3 content points. ~80–100 words.', minWords: 80, maxWords: 100, minutes: 25, prompt: 'Escreve uma carta a um amigo português: conta uma notícia recente tua, descreve como te sentes e faz-lhe uma pergunta sobre a vida dele. 80–100 palavras.' },
        { id: 'w2', label: 'Task 2 — Opinion text', guide: 'Write a structured opinion text. ~100 words.', minWords: 90, maxWords: 120, minutes: 25, prompt: 'As redes sociais aproximam ou afastam as pessoas? Escreve um texto com a tua opinião, dois argumentos e um exemplo pessoal. 90–120 palavras.' },
    ],
    B2: [
        { id: 'w1', label: 'Part I — Personal / institutional letter', guide: 'Write a letter of 160–180 words in the appropriate register.', minWords: 160, maxWords: 180, minutes: 35, prompt: 'Escreve uma carta à câmara municipal do teu bairro sobre um problema (lixo, ruído, transportes): descreve a situação, explica as consequências e propõe soluções. 160–180 palavras.' },
        { id: 'w2', label: 'Part II — Argumentative text + rewriting', guide: 'Write an argumentative text of 160–180 words, then practise rewriting sentences (Part III style).', minWords: 160, maxWords: 180, minutes: 40, prompt: '«Os jovens já não leem livros.» Escreve um texto argumentativo: refere vantagens e desvantagens da leitura na era digital e dá a tua opinião fundamentada. 160–180 palavras.' },
    ],
    C1: [
        { id: 'w1', label: 'Task 1 — Formal report', guide: 'Write a structured formal text of ~250 words. High register.', minWords: 220, maxWords: 280, minutes: 45, prompt: 'Escreve um relatório formal para uma associação ambiental sobre o consumo de plásticos de utilização única em Portugal: análise, dados, propostas. 220–280 palavras.' },
        { id: 'w2', label: 'Task 2 — Response to source text', guide: 'React to a quoted viewpoint with a nuanced, structured text. ~250 words.', minWords: 220, maxWords: 280, minutes: 45, prompt: '«O turismo de massa destrói as cidades históricas.» Comenta esta afirmação: resume o ponto de vista, discute-o com argumentos a favor e contra e formula a tua posição. 220–280 palavras.' },
    ],
    C2: [
        { id: 'w1', label: 'Task 1 — Commentary', guide: 'Write a commentary of 250–280 words with stylistic control. Irony and rhetoric allowed.', minWords: 250, maxWords: 280, minutes: 50, prompt: 'Escreve um comentário para um jornal de referência sobre um tema cultural ou social atual: tese clara, argumentação sofisticada, registos variados. 250–280 palavras.' },
        { id: 'w2', label: 'Task 2 — Task-based text + rewriting', guide: 'Write a task-based text of 250–280 words, then advanced sentence-rewriting exercises.', minWords: 250, maxWords: 280, minutes: 55, prompt: 'Escreve um texto sobre o futuro da língua portuguesa no mundo (a lusofonia, o Brasil, a África lusófona): análise, avaliação crítica e conclusão. 250–280 palavras.' },
    ],
};

export const capleWritingTasksFor = (level: CapleLevel): CapleWritingTask[] => CAPLE_WRITING_TASKS_BY_LEVEL[level];

export const CAPLE_SPEAKING_TASKS_BY_LEVEL: Record<CapleLevel, CapleSpeakingTask[]> = {
    A1: [
        { id: 's1', label: 'Task 1 — Introduce yourself', guide: 'Speak about yourself: name, country, work/study, family, hobbies. ~1 minute.', seconds: 60, prompt: 'Apresenta-te: nome, país, onde moras, trabalho ou estudos, família, dois hobbies.' },
        { id: 's2', label: 'Task 2 — Ask & answer + request', guide: 'Ask the examiner questions, answer theirs, make a simple request. ~1 minute.', seconds: 60, prompt: 'Faz duas perguntas ao teu professor (horários, onde comer). Responde às dele. Depois pede um favor simples (um livro, ajuda com uma palavra).' },
    ],
    A2: [
        { id: 's1', label: 'Task 1 — Describe your life', guide: 'Describe your routine and a recent memory. ~1 minute.', seconds: 60, prompt: 'Descreve a tua rotina diária e depois conta o que fizeste no fim de semana passado (pretérito perfeito!).' },
        { id: 's2', label: 'Task 2 — Arranging something', guide: 'Arrange plans with the examiner: propose, react, agree. ~1 minute 30.', seconds: 90, prompt: 'Tu e o examinador organizam uma visita: onde, quando, como, o que levar. Faz propostas e reage às dele (Que te parece…? / Para mim está bem…).' },
    ],
    B1: [
        { id: 's1', label: 'Task 1 — Monologue', guide: 'Speak alone on a topic, organised and complete. ~1 minute 30.', seconds: 90, prompt: 'Tema: «A tecnologia na minha vida». Fala de que tecnologias usas, quando e porquê, e de uma vantagem e uma desvantagem.' },
        { id: 's2', label: 'Task 2 — Interaction', guide: 'Dialogue with the examiner: react, ask, propose. ~1 minute 30.', seconds: 90, prompt: 'Situação: escolhem juntos um presente para um amigo. Faz perguntas, propõe ideias, aceita e recusa com cortesia (Talvez melhor… / Eu não escolhia, porque…).' },
    ],
    B2: [
        { id: 's1', label: 'Part I — Personal identification', guide: 'Characterise yourself, your life and interests with detail. ~2 minutes.', seconds: 120, prompt: 'Caracteriza-te: trajetória, interesses, planos de futuro, a tua relação com a língua portuguesa. Fala com detalhe e precisão.' },
        { id: 's2', label: 'Parts II–III — Negotiation + stimuli', guide: 'Negotiate an activity with the examiner, then respond to stimuli. ~2 minutes.', seconds: 120, prompt: 'Parte II: negociam juntos um plano (uma viagem, um projeto) — propõe, rejeita, compromete-te. Parte III: reage a afirmações do examinador com justificação (Talvez, mas… / Concordo até certo ponto…).' },
    ],
    C1: [
        { id: 's1', label: 'Task 1 — Complex presentation', guide: 'Present a complex topic with nuance and register control. ~3 minutes.', seconds: 180, prompt: 'Apresenta um tema complexo (ex.: «As cidades devem limitar o turismo?»): contexto, análise, posições contrapostas, avaliação pessoal fundamentada.' },
        { id: 's2', label: 'Task 2 — Debate', guide: 'Debate with the examiner: concession and rebuttal at natural speed. ~2 minutes.', seconds: 120, prompt: 'Debate com o examinador: reformula as objeções dele, admite o que é válido e rebate o resto com argumentos novos.' },
    ],
    C2: [
        { id: 's1', label: 'Task 1 — Spontaneous sophisticated speech', guide: 'Speak with precision, nuance and stylistic control. ~3 minutes.', seconds: 180, prompt: 'Escolhe um tema de atualidade e fala de forma espontânea e precisa: usa registos variados, expressões idiomáticas e estrutura retórica clara.' },
        { id: 's2', label: 'Task 2 — Reaction & counterargument', guide: 'React to counterarguments with irony and nuance where appropriate. ~2 minutes.', seconds: 120, prompt: 'O examinador traz contra-argumentos fortes à tua posição. Reage com elegância: admitido, reformulado, rebatido.' },
    ],
};

export const capleSpeakingTasksFor = (level: CapleLevel): CapleSpeakingTask[] => CAPLE_SPEAKING_TASKS_BY_LEVEL[level];

// ── Lesson generation (the master lesson structure — LONG & DETAILED) ────────
export interface PortugueseLesson {
    title: string;
    objective: string;
    vocabulary: { pt: string; en: string; gender?: string; plural?: string; example?: { pt: string; en: string }; related?: { pt: string; en: string }[] }[];
    pronunciation: { pt: string; approx: string; en: string }[];
    grammar: { rule: string; explanation: string; examples: { pt: string; en: string; breakdown: string[] }[]; commonMistakes: string[] };
    transformations: { type: string; pt: string; en: string }[];
    sentenceBuilding: { pt: string; en: string }[];
    practice: { instruction: string; question: string; answer: string }[];
    translationPractice: { en: string; pt: string }[];
    reverseTranslation: { pt: string; en: string }[];
    register: { informal: string; neutral: string; formal: string };
    culture: string;
    freeProduction: string;
    miniTest: { question: string; options: string[]; answer: string }[];
    review: string[];
}

export const generatePortugueseLesson = async (
    level: CapleLevel,
    topicTitle: string,
    focus: string,
    language: Language = 'Portuguese'
): Promise<PortugueseLesson> => {
    const system = `You are an expert Portuguese teacher creating a COMPLETE, LONG, DETAILED lesson for the CAPLE exam (Universidade de Lisboa). The student is an ENGLISH speaker at CEFR ${level}. This lesson is the student's main study material — it must be thorough enough to learn from alone. Do NOT be brief; depth and breadth are the requirement.

ABSOLUTE RULES:
- Every Portuguese sentence, phrase and word MUST be immediately followed by its English translation.
- Target EUROPEAN PORTUGUESE (Portugal) as the production standard: Estou a estudar (not estudando), chamo-me (not me chamo), tu with 2nd-person verbs. Where Brazilian differs, mention it and label it [BR].
- FOR EVERY NOUN include the article (o/a) AND the plural — teach "o livro — os livros" as one unit, never a bare noun.
- Explain Portuguese STRUCTURE: clitic placement (chamo-me vs não me chamo), estar a + infinitive, personal infinitive, futuro do conjuntivo. When Portuguese constructs an idea differently from English, explain WHY.
- Explain the reason behind every rule; never just state it.
- Do not teach content above ${level} level, but be exhaustive WITHIN it.
- Include Portuguese/Lusophone culture notes connected to the lesson.

Return ONLY valid JSON with ALL of these fields, fully populated:
{
 "title":"lesson title",
 "objective":"what the learner will be able to DO after this lesson",
 "vocabulary":[12-16 items, each {"pt":"word/phrase WITH article if noun","en":"English","gender":"masculine|feminine for every noun; omit for verbs/phrases","plural":"the plural for every noun (os livros); omit otherwise","example":{"pt":"example sentence","en":"English"},"related":[{"pt":"related word with article","en":"meaning"}]} — related words for at least 6 items],
 "pronunciation":[4-6 items {"pt":"word/phrase","approx":"honest English approximation of the EUROPEAN pronunciation (admit when imperfect)","en":"meaning"}] — include at least one nasal-vowel or vowel-reduction note,
 "grammar":{"rule":"the rule in one line","explanation":"4-6 sentences: the rule, the structure, WHY Portuguese does it this way, contrast with English","examples":[5-6 items {"pt":"example","en":"English","breakdown":["word = meaning", ...]} — vary: statement, negative, question, clitic use...],"commonMistakes":[3-4 items "the mistake English speakers make + the correct pattern"]},
 "transformations":[7-8 items showing the KEY sentence transformed: {"type":"Positive|Negative|Question|Perfeito|Imperfeito|Futuro|Condicionais|Conjuntivo trigger","pt":"transformed sentence","en":"English"} — all forms of the same core sentence],
 "sentenceBuilding":[4-5 items from very short to fully expanded, each {"pt":"...","en":"..."}],
 "practice":[6 exercises {"instruction":"what to do (conjugate/transform/fill in)","question":"exercise","answer":"the answer"}] — progress from easy to harder,
 "translationPractice":[6 items EN→PT {"en":"English sentence","pt":"correct Portuguese (European)"}],
 "reverseTranslation":[4 items PT→EN {"pt":"Portuguese sentence","en":"English"}],
 "register":{"informal":"tu version with an example","neutral":"the everyday standard version","formal":"formal version with an example"},
 "culture":"a short cultural note connected to the lesson (Portugal and the Lusophone world)",
 "freeProduction":"a personal production task with 3-4 guiding questions the student should answer",
 "miniTest":[5 MCQs {"question":"question","options":["a","b","c","d"],"answer":"correct option"}] covering different parts of the lesson,
 "review":["2-3 items to review from earlier in the level, tied to this lesson"]
}
Do not omit any field. Do not shorten. This is the student's textbook chapter.`;
    const raw = await chat(system, `Create the complete ${level} CAPLE lesson: "${topicTitle}". Focus: ${focus}.`, 8000, true);
    return parseJSON(raw);
};

// ── Listening exercise ────────────────────────────────────────────────────────
export interface PortugueseListening {
    scenario: string;
    lines: { speaker: string; pt: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generatePortugueseListening = async (level: CapleLevel, language: Language = 'Portuguese'): Promise<PortugueseListening> => {
    const system = `You create CAPLE LISTENING practice in EUROPEAN PORTUGUESE. CAPLE listening: announcements, conversations, phone messages, radio items, each heard ONCE, difficulty A1→C2.
Create a realistic conversation script for a ${level} learner. Return ONLY valid JSON:
{"scenario":"one line describing the situation (e.g. 'An announcement at Lisboa Oriente station')","lines":[{"speaker":"Name or Role","pt":"what they say (European Portuguese)","en":"English translation"}],"questions":[{"question":"MCQ in ENGLISH about main idea, details, numbers, speaker intention or inference","options":["4 options"],"answer":"correct option"}]}
Rules:
- 5-7 short lines of natural spoken European Portuguese for the recording.
- 4 questions testing DIFFERENT skills: main idea, a detail (number/time/place), speaker intention, and one inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create a ${level} CAPLE listening exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Reading exercise ──────────────────────────────────────────────────────────
export interface PortugueseReading {
    title: string;
    paragraphs: { pt: string; en: string }[];
    questions: { question: string; options: string[]; answer: string }[];
}
export const generatePortugueseReading = async (level: CapleLevel, language: Language = 'Portuguese'): Promise<PortugueseReading> => {
    const system = `You create CAPLE READING practice in European Portuguese. CAPLE reading: signs, ads, notices, emails, articles, testing skimming, scanning, detail, paraphrase and inference.
Create one realistic document for a ${level} learner. Return ONLY valid JSON:
{"title":"document type + title (e.g. 'Aviso — Regras do edifício')","paragraphs":[{"pt":"the Portuguese text (correct accents and European usage!)","en":"English translation (hidden until after)"}],"questions":[{"question":"MCQ in ENGLISH","options":["4 options"],"answer":"correct option"}]}
Rules:
- 3-4 short paragraphs of authentic-style Portuguese writing (notice, ad, email, article...).
- 4 questions testing DIFFERENT skills: main idea, detail location, paraphrase recognition, inference.
- Questions and options in ENGLISH.`;
    const raw = await chat(system, `Create a ${level} CAPLE reading exercise.`, 2500, true);
    return parseJSON(raw);
};

// ── Writing evaluation ────────────────────────────────────────────────────────
export interface PortugueseWritingFeedback {
    estimatedLevel: string;
    score100: number;
    band: string;
    strengths: string[];
    corrections: { original: string; corrected: string; why: string }[];
    improvements: string[];
    taskCompletion: string;
}
export const evaluatePortugueseWriting = async (
    taskLabel: string, taskGuide: string, minWords: number, text: string, level: CapleLevel
): Promise<PortugueseWritingFeedback> => {
    const system = `You are a CAPLE examiner evaluating a practice submission for ${taskLabel} (${taskGuide}). Target level of the student: ${level}. CAPLE scores 55–100% with bands: Suficiente (55–69), Bom (70–84), Muito Bom (85–100).
Grade strictly but encouragingly. Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS text","score100":0-100,"band":"Suficiente|Bom|Muito Bom|Insuficiente based on the score","strengths":["2-3 things done well"],"corrections":[{"original":"the student's exact wrong sentence/phrase","corrected":"the corrected version (European Portuguese)","why":"the grammar reason in English"}],"improvements":["3-4 concrete prioritised improvements for the NEXT attempt, tied to CAPLE criteria: task completion, coherence, vocabulary, grammar (clitic placement, ser/estar!), spelling (accents!)"],"taskCompletion":"did the text cover ALL content points, use the right register (tu/você/formal) and respect the length? Be specific."}
Rules: correct EVERY meaningful error (clitic placement, estar a + infinitive vs gerund, ser/estar, accents, gender agreement). Keep the text EUROPEAN Portuguese. This is a practice estimate.`;
    const raw = await chat(system, `Student submission (min ${minWords} words):\n\n${text}`, 3000, true);
    return parseJSON(raw);
};

// ── Speaking evaluation ───────────────────────────────────────────────────────
export interface PortugueseSpeakingFeedback {
    estimatedLevel: string;
    strengths: string[];
    transcriptCorrections: { original: string; corrected: string; why: string }[];
    fluencyTips: string[];
    nextAttempt: string;
}
export const evaluatePortugueseSpeaking = async (
    taskLabel: string, taskGuide: string, taskPrompt: string, transcript: string, level: CapleLevel
): Promise<PortugueseSpeakingFeedback> => {
    const system = `You are a CAPLE examiner evaluating a SPOKEN practice attempt (transcribed by speech-to-text, so ignore spelling — judge grammar and vocabulary from the words). Task: ${taskLabel} — ${taskGuide}. The prompt was: "${taskPrompt}". Target level: ${level}.
Return ONLY valid JSON:
{"estimatedLevel":"A1|A2|B1|B2|C1|C2 estimate of THIS performance","strengths":["2-3 strengths"],"transcriptCorrections":[{"original":"what was said (from transcript)","corrected":"better European Portuguese","why":"reason in English"}],"fluencyTips":["2-3 tips on flow, connectors, register (tu/você), clitic placement for the CAPLE oral"],"nextAttempt":"one concrete thing to do differently next time"}
Correct grammar from the transcript. Keep corrections European Portuguese. This is a practice estimate.`;
    const raw = await chat(system, `Transcript of the student's spoken answer:\n\n${transcript || '(silence or nothing transcribed)'}`, 2500, true);
    return parseJSON(raw);
};
