// Portuguese Foundations — the static course (CAPLE ACESSO→DUPLE oriented,
// European Portuguese as target). Sources: the A0→C2 master syllabus + CAPLE
// (Universidade de Lisboa) published exam structure (Sep 2026).
export const PORTUGUESE_WRITING_FACTS = {
    intro: 'Portuguese uses the Latin alphabet with a rich accent system: á é í ó ú, the grave à, the circumflex â ê ô, the nasal tilde ã õ, and the cedilla ç. Two things English speakers underestimate: NASAL vowels (ã, õ, and -em/-im endings) are real phonemes that change words, and European Portuguese reduces unstressed vowels so heavily that the spoken language sounds very different from the spelling — and from Brazilian Portuguese.',
    example: { fr: 'Estou a estudar português.', say: 'Estou a estudar português.', en: 'I am studying Portuguese — the European progressive is estar A + infinitive; Brazil says estou estudando' },
    parallel: 'The same spelling can hide two languages: autocarro (PT) vs ônibus (BR) for bus; tu vs você as the everyday "you". This course targets European Portuguese and marks every difference [PT] or [BR].',
    examNote: 'CAPLE notes: exams are scored 55–100% (Suficiente / Bom / Muito Bom). CIPLE A2 is the minimum level for Portuguese nationality; DIPLE B2 is commonly requested by universities. You do NOT need to pass lower exams first — register directly for your level.',
};

// Accents — the five marks and what each does.
export const PORTUGUESE_ACCENTS = [
    { mark: 'á é í ó ú (acute)', does: 'open vowel + stress marking', sample: 'café, você, saúde' },
    { mark: 'à (grave)', does: 'only on the contraction a + a = à (to the)', sample: 'Vou à escola' },
    { mark: 'â ê ô (circumflex)', does: 'CLOSED, stressed vowel', sample: 'avô (grandfather), você, pôde' },
    { mark: 'ã õ (tilde)', does: 'NASAL vowel — a sound English does not have', sample: 'mão (hand), põe (puts), amanhã' },
    { mark: 'ç (cedilla)', does: 'soft s sound before a/o/u', sample: 'coração, ça, açúcar' },
];

// The avó/avô pair — accents change family members!
export const ACCENT_MEANING_TRAPS: { pair: [string, string]; note: string }[] = [
    { pair: ['avó', 'avô'], note: 'avó = grandmother / avô = grandfather — the tilde vs circumflex changes gender!' },
    { pair: ['pais', 'país'], note: 'pais = parents / país = country (final stress takes the accent)' },
    { pair: ['e', 'é'], note: 'e = and / é = is (stress accent)' },
    { pair: ['se', 'sé'], note: 'se = if/oneself / sé = seat/century' },
    { pair: ['pelo', 'pelô'], note: 'pelo = by the (contraction) — watch similar-looking pairs' },
    { pair: ['só', 'so'], note: 'só = only / so appears inside words — final stress needs the accent' },
];

// Nasal vowels and diphthongs.
export const NASAL_SYSTEM = [
    { sound: 'ã / õ', examples: 'mão, amanhã, pões, redondeza — nasal a and o', sample: 'mão' },
    { sound: '-am / -em (word end)', examples: 'falam (they speak), homem (man) — nasal diphthongs', sample: 'falam' },
    { sound: 'im / in / um / un', examples: 'sim (yes), jardim (garden), algum (some)', sample: 'sim' },
    { sound: 'ão → plural -ões or -ãos', examples: 'mão → mãos, coração → corações, pão → pães (three plural patterns!)', sample: 'pão → pães' },
];

// European pronunciation realities — r, s, z, x, h, vowel reduction.
export const PRONUNCIATION_RULES = [
    { sound: 'r / rr (word start, rr)', english: 'guttural h (like French/German r)', mouth: 'raspberry-ish throat sound: rio, carro — NOT the Spanish tapped r', sample: { w: 'carro', spoken: 'KAH-hoo', en: 'car' } },
    { sound: 'r (between vowels)', english: 'light tap', mouth: 'one quick tap: caro, médico — like the American tt in butter', sample: { w: 'caro', spoken: 'KAH-roo', en: 'expensive' } },
    { sound: 's (final, European)', english: 'sh', mouth: 'in Portugal final s sounds like sh: os livros = "oosh LEE-vroosh" — Brazil says s/z', sample: { w: 'livros', spoken: 'LEE-vroosh', en: 'books' } },
    { sound: 'z', english: 'z between vowels, sh/s finally', mouth: 'zero, azul (z); in European speech final z → sh', sample: { w: 'azul', spoken: 'ah-ZOOL', en: 'blue' } },
    { sound: 'x', english: 'four sounds: sh, ks, z, s', mouth: 'xícara/peixe = "sh" (most common), táxi = "ks", exame = "z", próximo = "s" — learn per word', sample: { w: 'peixe', spoken: 'PAY-shi', en: 'fish' } },
    { sound: 'h', english: 'always silent', mouth: 'hora = "OR-ah" — but rh/lh/ch digraphs sound: trabalho (lh = ly), chave (ch = sh)', sample: { w: 'trabalho', spoken: 'trah-BAH-lyoo', en: 'work' } },
    { sound: 'lh / nh', english: 'lli in million / ny in canyon', mouth: 'one sound each: trabalho (work), senhor (sir), ninho (nest)', sample: { w: 'senhor', spoken: 'seh-NYOR', en: 'sir' } },
    { sound: 'vowel reduction (European!)', english: 'unstressed e/o weaken', mouth: 'the defining PT sound: final e/o reduce to a weak "ee/oo" or nearly vanish — menina = "muh-NEE-nuh" in Lisbon vs "meh-NEE-nah" in Brazil', sample: { w: 'menina', spoken: 'muh-NEE-nuh', en: 'girl' } },
];

// Articles + contractions — the à/às system.
export const ARTICLE_SYSTEM = [
    { article: 'o / os', before: 'masculine singular/plural', sample: 'o livro → os livros' },
    { article: 'a / as', before: 'feminine singular/plural', sample: 'a casa → as casas' },
    { article: 'um / uns', before: 'masculine', sample: 'um problema (masculine despite -a!)' },
    { article: 'uma / umas', before: 'feminine', sample: 'uma mão (feminine — ending -ão here, not -o!)' },
];

export const CONTRACTIONS = [
    { rule: 'de + o/a/os/as', result: 'do / da / dos / das', example: 'o livro do aluno = the student\u2019s book' },
    { rule: 'em + o/a/os/as', result: 'no / na / nos / nas', example: 'no café = in the café', say: 'no café' },
    { rule: 'a + o/a/os/as', result: 'ao / à / aos / às', example: 'Vou ao cinema, Vou à escola', say: 'Vou ao cinema' },
    { rule: 'por + o/a', result: 'pelo / pela', example: 'pelo parque = through the park' },
    { rule: 'em + um/uma', result: 'num / numa', example: 'num dia = in one day' },
];

// The clitic system — Portuguese's most distinctive grammar.
export const CLITIC_SYSTEM = [
    { type: 'Ênclise (after the verb)', use: 'the DEFAULT in European Portuguese main clauses', example: 'Chamo-me João. (I call myself João — me attaches AFTER)', say: 'Chamo-me João' },
    { type: 'Próclise (before the verb)', use: 'triggered BEFORE: negation, conjunctions, adverbs, question words', example: 'Não me chamo Pedro. / Quando me chamas?', say: 'Não me chamo Pedro' },
    { type: 'Mesóclise (inside the verb)', use: 'future/conditional in FORMAL writing: dar-lhe-ei', example: 'Dar-lhe-ei o livro (formal — spoken: vou dar-lhe)', say: 'Dar-lhe-ei' },
    { rule: 'the triggers', detail: 'proclise triggers: não, quando, porque, se, que, já, só, também, muito… No trigger → ênclise in PT main clauses' },
    { rule: 'Brazilian contrast', detail: '[BR] almost always uses próclise (Te amo) — European Portuguese keeps ênclise (Amo-te). Mixing systems is the classic learner error' },
];

// European vs Brazilian — the dedicated module.
export const PT_VS_BR = [
    { area: 'Progressive', pt: 'Estou a estudar. (estar a + infinitive)', br: 'Estou estudando. (gerund)' },
    { area: 'you', pt: 'tu (informal, in Portugal) / você (often without naming it)', br: 'você everywhere (with 3rd-person verbs)' },
    { area: 'bus', pt: 'o autocarro', br: 'o ônibus' },
    { area: 'train station', pt: 'a estação de comboios', br: 'a estação de trens' },
    { area: 'breakfast', pt: 'o pequeno-almoço', br: 'o café da manhã' },
    { area: 'cool/interesting', pt: 'fixe!', br: 'legal!' },
    { area: 'pronoun placement', pt: 'ênclise default: Amo-te', br: 'próclise default: Te amo' },
    { area: 'vowels', pt: 'heavy vowel reduction — consonant-heavy sound', br: 'vowels clear and open — singsong rhythm' },
];

// CAPLE strategy card.
export const CAPLE_STRATEGY: { skill: string; color: string; points: string[] }[] = [
    {
        skill: 'Compreensão da Leitura (Reading)', color: 'indigo',
        points: [
            'Match tasks (texts → people) are standard: read the profiles first, underline each condition, eliminate',
            'Wrong options copy exact words with reversed meaning — trust paraphrase',
            'Notices, schedules and menus reward careful scanning — bank time here for longer texts',
            'Never leave blanks — CAPLE scores positively',
        ],
    },
    {
        skill: 'Compreensão do Oral (Listening)', color: 'violet',
        points: [
            'European Portuguese reduces vowels — train with PT audio specifically, not Brazilian series',
            'Read options before the audio; numbers and times are the classic bait',
            'The dialogue usually revises plans — the FINAL agreement is the answer',
            'Use the pauses to anticipate the vocabulary you are about to hear',
        ],
    },
    {
        skill: 'Produção Escrita (Writing)', color: 'emerald',
        points: [
            'DIPLE Parts I and II ask for 160–180 words each; DUPLE commentary 250–280 — word count is graded, practise with a counter',
            'Respect the register: informal letter (tu) vs institutional letter (formal opening/closing formulas)',
            'Sentence-rewriting tasks test grammar precision — practise transformations directly',
            'Plan 5 minutes before writing: paragraph structure earns cohesion points',
        ],
    },
    {
        skill: 'Produção Oral (Speaking)', color: 'amber',
        points: [
            'DIPLE Part II is a NEGOTIATION with the examiner — practise proposing, rejecting, compromising',
            'Part III reacts to stimuli: describe → speculate (talvez, provavelmente) → justify',
            'Keep European vowel reduction consistent — mixing BR and PT pronunciation loses clarity',
            'Recover out loud: self-correct and continue; silence costs more than errors',
        ],
    },
];

// Number quirks.
export const PORTUGUESE_NUMBER_QUIRKS = [
    { pattern: 'mil milhões', why: 'a billion = mil milhões (a thousand millions) — not "bilião" in everyday PT' },
    { pattern: '1.000.000 = um milhão de', why: 'milhão is a noun: dois milhões de euros — and euro is invariable' },
    { pattern: 'às três e meia', why: 'time uses the article: São três horas — and à/meia-noite constructions' },
    { pattern: 'no dia 5 de maio', why: 'dates use cardinals with the article: no dia cinco de maio de 2026' },
    { pattern: 'once/onzes', why: '11 = onze — stress on the FIRST syllable (Ó-nze), a classic mispronunciation' },
];

// The master cheat sheet.
export const PORTUGUESE_CHEAT_SHEET: { title: string; items: { label: string; detail: string; say?: string }[] }[] = [
    {
        title: 'Gender traps — endings mislead', items: [
            { label: '-ção is feminine', detail: 'a informação, a canção, a nação' },
            { label: '-dade / -agem feminine', detail: 'a universidade, a viagem, a garagem' },
            { label: '-ma often masculine', detail: 'o problema, o sistema, o idioma (Greek origin)' },
            { label: '-e either', detail: 'o parque / a ponte — memorise with the article' },
            { label: 'the famous exceptions', detail: 'o dia (masculine despite -a!), a mão (feminine despite -ão!) — memorise these two' },
        ],
    },
    {
        title: 'Plurals — the ão family', items: [
            { label: '-ão → -ões (most abstract)', detail: 'coração → corações, informação → informações', say: 'corações' },
            { label: '-ão → -ães (some tools/people)', detail: 'pão → pães, alemão → alemães, cão → cães' },
            { label: '-ão → -ãos (weight/measure)', detail: 'mão → mãos, irmão → irmãos (both patterns exist!)' },
            { label: '-m → -ns', detail: 'jardim → jardins, algum → alguns', say: 'jardins' },
            { label: '-s / -z → +es', detail: 'país → países, raiz → raízes' },
            { label: 'invariable', detail: 'o lápis → os lápis, o pires → os pires (accentless -is often stays)' },
        ],
    },
    {
        title: 'tu / você / vocês — the European system', items: [
            { label: 'tu', detail: 'informal you (Portugal): tu falas — 2nd-person SINGULAR verb', say: 'tu falas' },
            { label: 'você', detail: 'formal-ish you, takes 3rd-person verbs: você fala — in Portugal often used without saying it' },
            { label: 'vocês', detail: 'you all: vocês falam' },
            { label: 'vós', detail: 'you all (archaic/regional — recognise, rarely produce): vós falais' },
            { label: '[BR] contrast', detail: 'Brazil uses você for everything informal — tu sounds regional there' },
        ],
    },
    {
        title: 'Clitics — before or after the verb?', items: [
            { label: 'Ênclise (default in PT)', detail: 'Chamo-me João. — no trigger → pronoun AFTER', say: 'Chamo-me João' },
            { label: 'Próclise (triggered)', detail: 'Não me chamo. / Quando me chamas? — negation, question words, conjunctions pull it BEFORE' },
            { label: 'Mesóclise (formal)', detail: 'Dar-lhe-ei — only future/conditional, only formal writing' },
            { label: 'contractions', detail: 'me + o → mo? No: give him it = dou-lho (lhe + o = lho) — rare but real', say: 'dou-lho' },
            { label: '[BR] contrast', detail: 'Brazil prefers próclise everywhere: Te amo vs Amo-te' },
        ],
    },
    {
        title: 'Three verb groups + the persons', items: [
            { label: '-AR: falo falas fala', detail: 'falamos falais falam', say: 'falo, falas, fala' },
            { label: '-ER: como comes come', detail: 'comemos comeis comem', say: 'como, comes, come' },
            { label: '-IR: parto partes parte', detail: 'partimos partis partem', say: 'parto, partes, parte' },
            { label: 'the big irregulars', detail: 'ser (sou és é), estar (estou estás está), ter (tenho tem), ir (vou vai), fazer (faço faz), poder (posso), querer (quero), saber (sei), vir (venho)' },
        ],
    },
    {
        title: 'Tense map — the Portuguese system', items: [
            { label: 'presente', detail: 'present: Falo português.' },
            { label: 'pretérito perfeito simples', detail: 'completed past: Falei com ele ontem.', say: 'Falei com ele ontem' },
            { label: 'pretérito imperfeito', detail: 'habitual/background: Falava com ele sempre.' },
            { label: 'pretérito mais-que-perfeito', detail: 'had done (literary form falei→falara; spoken: tinha falado)' },
            { label: 'futuro do indicativo', detail: 'will: Falarei. — spoken future: vou falar' },
            { label: 'condicional', detail: 'would: Falaria. — polite: Poderia…?' },
            { label: 'conjuntivo (subjunctive)', detail: 'espero que fales… — desire/doubt/emotion' },
            { label: 'futuro do conjuntivo', detail: 'PORTUGUESE SPECIAL: quando eu chegar (when I arrive) — after quando/se referring to the future' },
        ],
    },
    {
        title: 'estar a + infinitive — the European progressive', items: [
            { label: '[PT] estar a + infinitive', detail: 'Estou a estudar. = I am studying — THE European form', say: 'Estou a estudar' },
            { label: '[BR] estar + gerund', detail: 'Estou estudando. — Brazilian; recognisable but NOT your production target' },
            { label: 'in the past', detail: 'Estava a estudar quando ligaste. = I was studying when you called' },
        ],
    },
    {
        title: 'The personal infinitive — a Portuguese speciality', items: [
            { label: 'what it is', detail: 'the infinitive conjugated per person: falarmos = for us to speak' },
            { label: 'after prepositions', detail: 'É importante falarmos. (We must speak.) / Antes de saíres… (Before you leave…)', say: 'É importante falarmos' },
            { label: 'vs impessoal', detail: 'É importante falar (impersonal) vs falarmos (personal — who matters)' },
            { label: 'with clitics inside', detail: 'Para nos encontrarmos… (in order for us to meet)' },
        ],
    },
    {
        title: 'ser vs estar & ter vs haver', items: [
            { label: 'ser = essence', detail: 'identity, origin, time: Sou de Lisboa. São duas horas.', say: 'Sou de Lisboa' },
            { label: 'estar = state', detail: 'location, condition: Estou cansado. Está em casa.' },
            { label: 'ter = have/possess', detail: 'Tenho dois irmãos. Tenho frio (I am cold!).', say: 'Tenho frio' },
            { label: 'haver = there is / happen', detail: 'impersonal HÁ: Há muitos turistas. = There are many tourists; O que houve? = What happened?' },
            { label: 'ter vs haver de', detail: 'ter de/que + inf = must; haver de = shall/destined to' },
        ],
    },
    {
        title: 'Question words', items: [
            { label: 'quem / o quê', detail: 'who / what — O quê?! (what?! at the end of a sentence)', say: 'O quê?' },
            { label: 'qual / quais', detail: 'which — Qual preferes?' },
            { label: 'onde / aonde', detail: 'where / where to — Aonde vais?' },
            { label: 'quando / como', detail: 'when / how — Como se diz…? = how do you say…' },
            { label: 'porquê / porque', detail: 'porquê = why (question, one word with accent) / porque = because (no accent) / o porquê = the reason' },
            { label: 'quanto / quantos', detail: 'how much / how many — Quantos anos tens? (age with TER!)' },
        ],
    },
    {
        title: 'Comparisons & superlatives', items: [
            { label: 'mais/menos … do que', detail: 'more/less … than: mais alto do que eu' },
            { label: 'tão … como', detail: 'as … as: tão rápido como' },
            { label: 'irregulars', detail: 'melhor (better), pior (worse), maior (bigger), menor (smaller)' },
            { label: 'relative superlative', detail: 'o melhor DO país — article + superlative' },
            { label: 'absolute superlative', detail: '-íssimo suffix: facilíssimo (very easy), ótimo (excellent) — formal amplification', say: 'facilíssimo' },
        ],
    },
    {
        title: 'The se system', items: [
            { label: 'reflexive se', detail: 'levanta-se = he gets up; chamar-se = to be called' },
            { label: 'impersonal se', detail: 'fala-se português = Portuguese is spoken (here); vive-se bem' },
            { label: 'passive se', detail: 'Vendem-se casas = houses are sold (verb agrees with the object!)' },
            { label: 'reciprocal', detail: 'conhecem-se = they know each other; abraçaram-se = they hugged' },
        ],
    },
    {
        title: 'Connectors', items: [
            { label: 'e / mas / ou / nem', detail: 'and / but / or / nor' },
            { label: 'porque / por isso', detail: 'because / that\u2019s why' },
            { label: 'embora / apesar de', detail: 'although / despite (+ infinitive)' },
            { label: 'enquanto / antes que / depois que', detail: 'while / before / after' },
            { label: 'caso / se', detail: 'in case / if — caso takes the subjunctive: caso precises…' },
            { label: 'para que / a fim de que', detail: 'so that (+ subjunctive) — formal purpose' },
            { label: 'portanto / porém / no entanto', detail: 'therefore / however / nevertheless — essay connectors' },
        ],
    },
    {
        title: 'The BIG distinctions (exam favourites)', items: [
            { label: 'ser vs estar', detail: 'essence vs state — and: é casado vs está casado both exist with nuance!' },
            { label: 'ter vs haver', detail: 'possession vs existence: Tenho um carro / Há um carro' },
            { label: 'saber vs conhecer', detail: 'know facts/how vs know people/places: Sei nadar / Conheço o Porto' },
            { label: 'por vs para', detail: 'cause/through vs purpose/destination — same logic as Spanish' },
            { label: 'este vs esse vs aquele', detail: 'this (near me) / that (near you) / that over there' },
            { label: 'muito vs muito bem', detail: 'muito + adjective stays invariable (muito boas ideias); muito as adverb is invariable too; muito as noun-quantifier agrees' },
            { label: 'grande vs grande', detail: 'um homem grande (big) / um grande homem (great) — position changes meaning' },
            { label: 'conhecer vs saber + cities', detail: 'Conheço Lisboa (visited) / Sei que Lisboa é bonita (fact)' },
        ],
    },
];
