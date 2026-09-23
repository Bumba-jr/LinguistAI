// Spanish Foundations — the static course (mirror of frenchFoundation.ts).
// Sources: the A0→C2 master syllabus + Instituto Cervantes DELE format (Sep 2026).
export const SPANISH_WRITING_FACTS = {
    intro: 'Spanish uses the same Latin alphabet English does — 27 letters, one more than English: Ñ. There is no separate character system to learn. The real work is in four things English speakers underestimate: the five pure vowels (never reduced like English), stress rules + written accents (tildes), the silent H, and the ¿¡ opening punctuation pair.',
    example: { fr: '¿Cómo estás?', say: '¿Cómo estás?', en: 'How are you? — note the upside-down question mark that opens the sentence' },
    parallel: 'Every accented letter (á é í ó ú) is still the same letter with a mark — but Ñ is NOT an accented N. It is its own letter, alphabetised after N, with its own sound ("ny" as in canyon).',
    examNote: 'DELE notes: spelling, accents and punctuation are explicitly graded in the writing exam — a missing tilde counts as a spelling error, not a typo.',
};

// 27 letters — RAE official alphabet since 2010. Tap to hear the letter name.
export const SPANISH_ALPHABET: { letter: string; name: string; note?: string }[] = [
    { letter: 'A', name: 'a' },
    { letter: 'B', name: 'be', note: 'also called "be larga" or "be alta" in many countries' },
    { letter: 'C', name: 'ce' },
    { letter: 'D', name: 'de' },
    { letter: 'E', name: 'e' },
    { letter: 'F', name: 'efe' },
    { letter: 'G', name: 'ge', note: 'before e/i it sounds like the Spanish J' },
    { letter: 'H', name: 'hache', note: 'ALWAYS silent: hola = "OH-la"' },
    { letter: 'I', name: 'i', note: 'never the English "eye" — always "ee"' },
    { letter: 'J', name: 'jota', note: 'breathy h sound, stronger than English h' },
    { letter: 'K', name: 'ka', note: 'rare — loanwords only (kilo, kayak)' },
    { letter: 'L', name: 'ele' },
    { letter: 'M', name: 'eme' },
    { letter: 'N', name: 'ene' },
    { letter: 'Ñ', name: 'eñe', note: 'the 27th letter: cañón, España, niño' },
    { letter: 'O', name: 'o', note: 'always pure "oh" — never the English reduced "uh"' },
    { letter: 'P', name: 'pe', note: 'no puff of air: "pa" not English "pha"' },
    { letter: 'Q', name: 'cu', note: 'only in qu + e/i, where u is silent: que, qui' },
    { letter: 'R', name: 'erre', note: 'single r between vowels is SOFT; at word start or after n/l/s it is ROLLED' },
    { letter: 'S', name: 'ese' },
    { letter: 'T', name: 'te', note: 'dental — tongue touches the teeth, not the ridge' },
    { letter: 'U', name: 'u', note: 'always "oo" — never English "you"' },
    { letter: 'V', name: 'uve', note: 'pronounced exactly like B in standard Spanish' },
    { letter: 'W', name: 'uve doble', note: 'loanwords only: whisky, wifi' },
    { letter: 'X', name: 'equis', note: 'but México is pronounced "Méjico" by tradition' },
    { letter: 'Y', name: 'ye', note: 'as a vowel = "ee" (y); as consonant = "y" in yes (ya)' },
    { letter: 'Z', name: 'zeta', note: 'Latin America: "s". Spain: soft "th" (casa/zar in Madrid has the lisp)' },
];

export const SPANISH_VOWELS = [
    { letter: 'A', sound: 'ah', note: 'the "a" in father — always, everywhere', sample: 'casa' },
    { letter: 'E', sound: 'eh', note: 'the "e" in bet — never the English "ay" diphthong', sample: 'mesa' },
    { letter: 'I', sound: 'ee', note: 'machine "ee" — short and pure', sample: 'sí' },
    { letter: 'O', sound: 'oh', note: 'pure o — lips rounded, no glide, no "uh"', sample: 'loco' },
    { letter: 'U', sound: 'oo', note: 'food "oo" — never English "you" (that adds a y-glide)', sample: 'tú' },
];

// Strong vowels (a e o) can carry stress; weak vowels (i u) cannot unless written with a tilde.
export const VOWEL_STRENGTH = {
    strong: ['a', 'e', 'o'],
    weak: ['i', 'u'],
    why: 'This one fact explains ALL Spanish accent marks: strong vowels (a, e, o) dominate syllables; weak vowels (i, u) merge with their neighbour into a diphthong. A tilde on a weak vowel (í, ú) breaks the merge and forces stress onto it — that is literally all tildes on í/ú ever do: sí, mí, tú, aquí, baúl.',
};

// Diphthongs and tricky vowel combinations — tap to hear.
export const SPANISH_VOWEL_COMBINATIONS: { combo: string; sound: string; sample: { w: string; spoken: string; en: string } }[] = [
    { combo: 'ai / ay', sound: 'eye', sample: { w: 'aire', spoken: 'EYE-reh', en: 'air' } },
    { combo: 'ei', sound: 'ay', sample: { w: 'seis', spoken: 'SAYS', en: 'six' } },
    { combo: 'oi / oy', sound: 'oy', sample: { w: 'hoy', spoken: 'OY', en: 'today' } },
    { combo: 'au', sound: 'ow', sample: { w: 'auto', spoken: 'OW-toh', en: 'car' } },
    { combo: 'eu', sound: 'eh-oo (glided)', sample: { w: 'Europa', spoken: 'eh-oo-ROH-pah', en: 'Europe' } },
    { combo: 'ua', sound: 'wah', sample: { w: 'cuatro', spoken: 'KWAH-troh', en: 'four' } },
    { combo: 'ue', sound: 'weh', sample: { w: 'bueno', spoken: 'BWEH-noh', en: 'good' } },
    { combo: 'uo', sound: 'woh', sample: { w: 'antiguo', spoken: 'an-TEE-gwoh', en: 'old' } },
    { combo: 'ie', sound: 'yeh', sample: { w: 'tierra', spoken: 'TYEH-rrah', en: 'land' } },
    { combo: 'ui', sound: 'wee (u silent after g: guita)', sample: { w: 'cuidado', spoken: 'kwee-DAH-doh', en: 'careful' } },
];

// Consonant sounds that behave differently from English — the real traps.
export const SPANISH_CONSONANT_SOUNDS: { sound: string; english: string; mouth: string; sample: { w: string; spoken: string; en: string } }[] = [
    { sound: 'C + e/i', english: 's (Latin America) or soft th (Spain)', mouth: 'ce/ci = "seh"/"see" in Mexico; "theh"/"thee" in Madrid — but never hard k', sample: { w: 'cielo', spoken: 'SYEH-loh / THYEH-loh', en: 'sky' } },
    { sound: 'C + a/o/u', english: 'k', mouth: 'hard k always: casa, coche, cuba', sample: { w: 'cosa', spoken: 'KOH-sah', en: 'thing' } },
    { sound: 'G + e/i', english: 'harsh h', mouth: 'same sound as Spanish J —gente and jento rhyme', sample: { w: 'gente', spoken: 'HEN-teh', en: 'people' } },
    { sound: 'G + a/o/u', english: 'hard g', mouth: 'as in go — gato, gota, gusto', sample: { w: 'gato', spoken: 'GAH-toh', en: 'cat' } },
    { sound: 'GU + e/i', english: 'hard g (u silent)', mouth: 'the u is a shield: guerra = "GEH-rrah". To make the u sound, write ü: pingüino', sample: { w: 'guerra', spoken: 'GEH-rrah', en: 'war' } },
    { sound: 'H', english: 'always silent', mouth: 'hola = "OH-lah". The letter exists only on paper — and in "ch" where it makes "ch"', sample: { w: 'hospital', spoken: 'os-pee-TAHL', en: 'hospital' } },
    { sound: 'J', english: 'breathy h (stronger)', mouth: 'raspy, from the throat: jardín, trabajo, José — strength varies by region (soft in the Caribbean, raspy in Spain)', sample: { w: 'trabajo', spoken: 'trah-BAH-hoh', en: 'work' } },
    { sound: 'LL', english: 'y (most regions) / zh (Argentina)', mouth: 'llamar = "yah-MAR" in most of the Spanish-speaking world; in Argentina/Uruguay it becomes "zhah-MAR" (sh/zh)', sample: { w: 'llave', spoken: 'YAH-veh / ZHAH-veh', en: 'key' } },
    { sound: 'Ñ', english: 'ny in canyon', mouth: 'one single sound, one tap of the tongue: año has it, ano without the ñ is a very different (embarrassing) word', sample: { w: 'año', spoken: 'AH-nyoh', en: 'year' } },
    { sound: 'R (single, between vowels)', english: 'soft tap', mouth: 'one quick tap like the tt in American "butter": pero, caro, mano', sample: { w: 'pero', spoken: 'PEH-roh', en: 'but' } },
    { sound: 'RR / r at word start', english: 'rolled (trilled)', mouth: 'tongue flaps repeatedly — perro, rojo, alrededor. Beginners: start with "butter-butter-butter" speeding up', sample: { w: 'perro', spoken: 'PEH-rroh', en: 'dog' } },
    { sound: 'B / V', english: 'identical sounds', mouth: 'Spanish has ONE sound for both — softer than English b, lips barely touch: vino and bino sound the same. Spelling is memorised, not heard', sample: { w: 'vino', spoken: 'BEE-noh', en: 'wine' } },
    { sound: 'D (between vowels)', english: 'soft th of "the"', mouth: 'cada = "KAH-thah" (soft) — not a hard English d', sample: { w: 'cada', spoken: 'KAH-thah', en: 'each' } },
    { sound: 'Z', english: 's (LatAm) / soft th (Spain)', mouth: 'zapato = "sah-PAH-toh" everywhere except central Spain: "thah-PAH-toh"', sample: { w: 'zapato', spoken: 'sah-PAH-toh', en: 'shoe' } },
];

// Stress — the three (four) rules that decide where every accent mark goes.
export const STRESS_RULES = [
    {
        type: 'Aguda',
        rule: 'Stress on the LAST syllable',
        default: 'No written accent needed if it ends in a vowel, -n or -s. Accent REQUIRED if it ends in any other consonant.',
        examples: [{ w: 'papá', why: 'stress on last syllable, ends in vowel → tilde' }, { w: 'reloj', why: 'stress on last syllable, ends in j → no tilde needed' }, { w: 'camión', why: 'ends in n, stressed last → tilde' }],
    },
    {
        type: 'Llana / grave',
        rule: 'Stress on the SECOND-TO-LAST syllable',
        default: 'No accent if it ends in a vowel, -n or -s. Accent REQUIRED if it ends in any other consonant.',
        examples: [{ w: 'casa', why: 'CA-sa, ends in vowel → no tilde' }, { w: 'árbol', why: 'AR-bol, ends in l → tilde' }, { w: 'examen', why: 'exa-MEN, ends in n → no tilde' }],
    },
    {
        type: 'Esdrújula',
        rule: 'Stress on the THIRD-TO-LAST syllable',
        default: 'ALWAYS takes a written accent. No exceptions — learn the type, never memorise individual words.',
        examples: [{ w: 'teléfono', why: 'te-LE-fo-no → tilde on the le' }, { w: 'música', why: 'MU-si-ca → tilde on the mu' }, { w: 'esdrújula', why: 'it names itself' }],
    },
    {
        type: 'Sobresdrújula',
        rule: 'Stress BEFORE the third-to-last syllable',
        default: 'Always accented too — rare, usually verbs with clitic pronouns.',
        examples: [{ w: 'dígamelo', why: 'dí-ga-me-lo → stress on dí' }, { w: 'fácilmente', why: 'fá-cil-men-te → stress on fá' }],
    },
];

// Tilde pairs that change meaning — reading comprehension depends on them.
export const ACCENT_MEANING_TRAPS: { pair: [string, string]; note: string }[] = [
    { pair: ['sí', 'si'], note: 'sí = yes / si = if' },
    { pair: ['tú', 'tu'], note: 'tú = you / tu = your' },
    { pair: ['él', 'el'], note: 'él = he / el = the' },
    { pair: ['más', 'mas'], note: 'más = more / mas = but (literary)' },
    { pair: ['sé', 'se'], note: 'sé = I know / se = reflexive pronoun' },
    { pair: ['qué', 'que'], note: 'qué = what (in questions) / que = that' },
    { pair: ['cómo', 'como'], note: 'cómo = how (questions) / como = as, like, I eat' },
    { pair: ['papá', 'papa'], note: 'papá = dad / papa = potato' },
    { pair: ['aún', 'aun'], note: 'aún = still / aun = even' },
    { pair: ['está', 'esta'], note: 'está = he/she is / esta = this (feminine)' },
];

// Tú / usted / vos / vosotros — the register system (DELE explicitly tests it).
export const TU_USTED_VOS = [
    { form: 'tú', use: 'Informal you — Spain + all of Latin America', example: '¿Cómo estás?', region: 'universal informal' },
    { form: 'usted', use: 'Formal you — everywhere; in parts of Latin America (Colombia, Costa Rica) it is the everyday form even with family', example: '¿Cómo está usted?', region: 'universal formal' },
    { form: 'vos', use: 'Informal you replacing tú, with its own verb forms (vos tenés, vos hablás)', example: '¿Vos de dónde sos?', region: 'Argentina, Uruguay, Paraguay, parts of Central America' },
    { form: 'vosotros/as', use: 'Plural informal you — used in Spain only; Latin America uses ustedes for every plural you', example: '¿Vosotros estáis cansados?', region: 'Spain' },
    { form: 'ustedes', use: 'Plural you — the ONLY plural in Latin America (formal or informal); formal plural in Spain', example: '¿Ustedes están listos?', region: 'universal' },
];

// Number quirks English speakers get wrong (mirror of NUMBER_QUIRKS).
export const NUMBER_QUIRKS = [
    { pattern: 'veintiuno, veintidós…', why: '21–29 are one word (veinti-), and only 22–29 carry accents; 31+ split into words: treinta y uno' },
    { pattern: 'cien → ciento', why: '100 alone = cien, but 101+ = ciento uno, doscientos (two hundreds plural!)' },
    { pattern: 'quinientos, setecientos, novecientos', why: '500/700/900 are irregular — never "cinco cientos"' },
    { pattern: 'un millón de dólares', why: 'millón is a noun: "de" before the counted thing, and millions are plural: dos millones de' },
    { pattern: 'son las tres y media', why: 'time is "ser": Es la una / Son las cuatro — singular for one, plural for the rest' },
];

// Number + gender + date facts used in the foundations course.
export const SPANISH_NUMBER_FACTS = [
    'Genders agree even in numbers: doscientos coches / doscientas casas.',
    'Dates use ser + number, never ordinal: Es el cinco de mayo — except primero for the 1st.',
    'Thousands use a period for decimals in Spain/LatAm official writing: 1.000.000 habitantes, 3,5 euros.',
];

// ── Syllable division — Part 9 of the master syllabus ────────────────────────
// Stress rules and tilde placement are DEFINED on syllables, so this comes first.
export const SYLLABLE_DIVISION = {
    why: 'Every stress rule on this page is really a rule about SYLLABLES — "stress the last syllable" means the last syllable, not the last letter. Split words into syllables first, then the accent system becomes mechanical instead of guesswork.',
    rules: [
        { rule: 'One consonant between vowels → the consonant goes with the SECOND vowel', examples: 'ca-sa, me-sa, lo-co' },
        { rule: 'Digraphs ch, ll, rr are ONE sound and never split', examples: 'pe-rro (not per-ro), mu-cha-cho' },
        { rule: 'Consonant + L/R stay together (bl, cr, gr, tr, pr, fl…)', examples: 'ha-blar, a-brir, ma-dre, a-zúl' },
        { rule: 'Two strong vowels (a e o) split into separate syllables', examples: 'le-er, ca-er, a-zo-te, ma-estro' },
        { rule: 'Strong + weak vowel (or two weak) merge into one diphthong syllable', examples: 'bue-no, ciu-dad, a-gua, vier-nes' },
        { rule: 'A tilde on a weak vowel BREAKS the diphthong', examples: 'ma-íz (maíz, not *mai-z), dí-a, bá-ul' },
    ],
};

// ── Regional varieties — Part 52: recognise, don't memorise ──────────────────
export const REGIONAL_VARIETIES = [
    {
        region: '🇪🇸 Spain (Castilian)',
        features: ['distinción: c/z before e/i pronounced "th" (cielo = THYE-lo)', 'vosotros/as used for informal plural you', 'strong, raspy j'],
    },
    {
        region: '🇲🇽 Mexico (+ most of central north)',
        features: ['seseo: c/z always "s" (cielo = SYE-lo)', 'ustedes for every plural you', ' diminutives everywhere: ahorita, tacita'],
    },
    {
        region: '🇦🇷 Argentina & 🇺🇾 Uruguay (Rioplatense)',
        features: ['voseo: vos tenés, vos sabés (own verb forms!)', 'sheísmo: ll/y pronounced "zh/sh" (llave = SHAVE)', 'Italian-influenced intonation'],
    },
    {
        region: '🏝️ Caribbean (Cuba, PR, Dominican R.)',
        features: ['final s aspirated or dropped: "loh perroh"', 'fast, clipped rhythm', 'soft j — the weakest in the Spanish-speaking world'],
    },
    {
        region: '🇨🇴 Colombia & 🇨🇷 Costa Rica',
        features: ['usted used even with family and friends', 'exceptionally clear, "neutral" pronunciation (Bogotá, Medellín accent prized by learners)'],
    },
];

export const REGIONAL_GOAL = 'The goal is NOT to memorise every dialect: speak one consistent standard (neutral Latin American or Castilian) while UNDERSTANDING the rest. DELE accepts all regional standards — consistency is what is graded.';

// The DELE strategy card (mirror of TCF_STRATEGY) — Instituto Cervantes format.
export const DELE_STRATEGY: { skill: string; color: string; points: string[] }[] = [
    {
        skill: 'Reading (Comprensión de lectura)', color: 'indigo',
        points: [
            '4-5 tasks, 25-40 items, 45-80 min depending on level — scan the task instruction FIRST so you know what to hunt for',
            'Multiple choice: wrong options copy exact words from the text but reverse or exaggerate — the right answer paraphrases',
            'Match tasks (which person said what) — read the profiles first, underline each person\'s constraint, eliminate as you go',
            'Never leave blanks — DELE has no penalty for guessing',
        ],
    },
    {
        skill: 'Listening (Comprensión auditiva)', color: 'violet',
        points: [
            'Audio plays ONCE — read the questions during the instruction pause so you know what to listen for',
            'Options often repeat the transcript\'s words with a twisted meaning — trust the global message, not word matches',
            'Announcements/dialogues: focus on WHO, WHERE, WHEN, and what the speaker actually wants',
            'Train with different accents early: Spain (distinción), Mexico/Colombia (clear s), Argentina (zh/sh ll)',
        ],
    },
    {
        skill: 'Writing (Expresión e interacción escritas)', color: 'emerald',
        points: [
            '2 tasks, 45-150 min depending on level: a functional text (email/letter/blog) + a composition/argument with sources',
            'Respect the register the task names: informal (tú, greetings+closing) vs formal (usted, usted attiende…)',
            'Structure scores: opening line, organised body, closing line — examiners read for coherence first',
            'Accents and spelling are graded as spelling errors — leave 2-3 minutes to re-read for tildes and gender agreement',
        ],
    },
    {
        skill: 'Speaking (Expresión e interacción orales)', color: 'amber',
        points: [
            '2-4 tasks: a prepared monologue (you get 15-20 min prep) + interaction/dialogue with the examiner',
            'In the monologue, describe → compare → give opinion; use connectors aloud — they are explicitly graded',
            'In the dialogue you must REACT, not just answer: disagree politely, propose alternatives (¿Y si…? / Prefiero… porque…)',
            'Speak continuously — long pauses cost more than small mistakes; self-correct fast and move on',
        ],
    },
];

// The master cheat sheet (16 sections — mirrors the syllabus's sheet).
export const SPANISH_CHEAT_SHEET: { title: string; items: { label: string; detail: string; say?: string }[] }[] = [
    {
        title: 'Articles — the gender gate', items: [
            { label: 'el / los', detail: 'the (masculine singular/plural) — el libro, los libros', say: 'el libro' },
            { label: 'la / las', detail: 'the (feminine singular/plural) — la casa, las casas', say: 'la casa' },
            { label: 'un / unos', detail: 'a, an / some (masculine) — un problema (masculine despite -a!)', say: 'un problema' },
            { label: 'una / unas', detail: 'a / some (feminine) — una mano (feminine despite -o!)', say: 'una mano' },
            { label: 'lo', detail: 'the neuter article for abstract ideas: lo importante = the important thing', say: 'lo importante' },
        ],
    },
    {
        title: 'Gender traps — endings do NOT decide everything', items: [
            { label: '-ma words are masculine', detail: 'el problema, el idioma, el sistema, el clima (Greek origin)' },
            { label: '-e can be either', detail: 'el parque / la clase — memorise with the article, never the bare noun' },
            { label: '-ión feminine', detail: 'la canción, la información, la televisión' },
            { label: '-ista both', detail: 'el/la dentista, turista — gender shows in the article/adjective' },
            { label: 'shortcut -or/-ora', detail: 'profesor/profesora, trabajador/trabajadora — animate nouns follow endings' },
        ],
    },
    {
        title: 'Subject pronouns', items: [
            { label: 'yo / tú / usted', detail: 'I / you (informal) / you (formal)', say: 'yo' },
            { label: 'él / ella', detail: 'he / she', say: 'ella' },
            { label: 'nosotros/as', detail: 'we (masc/fem)', say: 'nosotros' },
            { label: 'vosotros/as', detail: 'you all — Spain only', say: 'vosotros' },
            { label: 'ustedes', detail: 'you all (LatAm always; Spain formal)', say: 'ustedes' },
            { label: 'ellos / ellas', detail: 'they (masc/fem)', say: 'ellos' },
            { label: 'drop the pronoun', detail: 'the verb ending already says who: "Hablo español" — "yo" only for contrast' },
        ],
    },
    {
        title: 'Present tense — the three families', items: [
            { label: '-AR: hablo hablas habla', detail: 'hablamos habláis hablan — o, as, a, amos, áis, an', say: 'hablo, hablas, habla' },
            { label: '-ER: como comes come', detail: 'comemos coméis comen — o, es, e, emos, éis, en', say: 'como, comes, come' },
            { label: '-IR: vivo vives vive', detail: 'vivimos vivís viven — same as -ER except nosotros/vosotros', say: 'vivo, vives, vive' },
            { label: 'the big irregulars', detail: 'ser (soy eres es), estar (estoy estás está), ir (voy vas va), tener (tengo), hacer (hago), saber (sé), poder (puedo)' },
            { label: 'stem-changers', detail: 'e→ie (quiero), o→ue (puedo), e→i (pido) in all forms except nosotros/vosotros' },
        ],
    },
    {
        title: 'Tense map', items: [
            { label: 'presente', detail: 'I speak — hablo' },
            { label: 'pretérito indefinido', detail: 'I spoke (completed event) — hablé, comió, fui', say: 'hablé' },
            { label: 'imperfecto', detail: 'I used to / was speaking — hablaba, comía, iba', say: 'hablaba' },
            { label: 'pretérito perfecto', detail: 'I have spoken — he hablado (Spain uses it for today)' },
            { label: 'pluscuamperfecto', detail: 'I had spoken — había hablado' },
            { label: 'futuro simple', detail: 'I will speak — hablaré; everyday future: ir a + infinitive (voy a hablar)', say: 'hablaré' },
            { label: 'condicional', detail: 'I would speak — hablaría; polite: ¿Podría…?', say: 'hablaría' },
            { label: 'subjuntivo', detail: 'hables, tenga, vaya — doubt/desire/emotion/influence' },
            { label: 'imperativo', detail: 'Habla. / No hables. — affirmative uses different form than negative' },
        ],
    },
    {
        title: 'SER vs ESTAR — the classic', items: [
            { label: 'SER = essence', detail: 'identity, origin, profession, time, inherent traits: Soy estudiante. Es de México. Son las dos.', say: 'Soy estudiante' },
            { label: 'ESTAR = state', detail: 'location, condition, mood, progressive: Estoy cansado. Está en casa. Estoy comiendo.', say: 'Estoy cansado' },
            { label: 'the meaning shift', detail: 'ser aburrido = to be boring / estar aburrido = to be bored; ser listo = clever / estar listo = ready' },
            { label: 'death & lateness', detail: 'está muerto (state), es tarde (time) — memorise the exceptions' },
        ],
    },
    {
        title: 'POR vs PARA — the two "fors"', items: [
            { label: 'POR = cause/through', detail: 'reason, exchange, duration, movement through: gracias POR, por dos euros, por la mañana, caminar por el parque' },
            { label: 'PARA = purpose/goal', detail: 'destination, deadline, recipient, "in order to": PARA ti, para mañana, este regalo es para María, para aprender' },
            { label: 'the test', detail: 'ask WHY (→ por) or WHAT FOR (→ para): "Por trabajo" (why I travel) vs "Para trabajar" (what for)' },
        ],
    },
    {
        title: 'SABER vs CONOCER', items: [
            { label: 'saber', detail: 'facts + skills: sé la respuesta, sé nadar, ¿sabes qué hora es?' },
            { label: 'conocer', detail: 'people + places + familiarity: conozco a María, conozco Madrid' },
            { label: 'personal a', detail: 'direct objects that are people take "a": Veo a mi hermana' },
        ],
    },
    {
        title: 'Object pronouns — before the verb', items: [
            { label: 'direct: lo la los las', detail: 'Lo veo = I see it/him; La compro = I buy it (fem)' },
            { label: 'indirect: le les', detail: 'Le doy el libro = I give him/her the book (to whom)' },
            { label: 'le → se with lo/la', detail: 'Se lo doy = I give it to him — NEVER "le lo"', say: 'Se lo doy' },
            { label: 'attached after infinitive/gerund', detail: 'Voy a dárselo / Dámelo — same pronouns, different position' },
        ],
    },
    {
        title: 'Question words (all carry tildes)', items: [
            { label: '¿Qué?', detail: 'what — ¿Qué es esto?', say: '¿Qué es esto?' },
            { label: '¿Quién?', detail: 'who — ¿Quién es?' },
            { label: '¿Dónde?', detail: 'where — ¿Dónde vives?; ¿adónde? = to where' },
            { label: '¿Cuándo?', detail: 'when — ¿Cuándo llegas?' },
            { label: '¿Por qué?', detail: 'why — and porque = because (no accent, one word)' },
            { label: '¿Cómo?', detail: 'how — ¿Cómo se dice…? = how do you say…' },
            { label: '¿Cuál?', detail: 'which — ¿Cuál prefieres? (never "¿Qué…?" before de + noun: ¿cuál de los dos?)' },
            { label: '¿Cuánto/a/os/as?', detail: 'how much/many — agrees: ¿Cuántos años tienes?' },
        ],
    },
    {
        title: 'Negation — double negatives are CORRECT', items: [
            { label: 'no + verb', detail: 'No hablo español — "no" directly before the verb', say: 'No hablo español' },
            { label: 'nada / nadie / nunca', detail: 'No veo nada = I see NOTHING (keep the no!)' },
            { label: 'tampoco', detail: 'Yo tampoco = me neither' },
            { label: 'ninguno → ningún', detail: 'ningún problema — drops the o before a masculine noun' },
        ],
    },
    {
        title: 'Connectors — buy coherence points', items: [
            { label: 'y / pero / o', detail: 'and / but / or (y → e before i- words: e Historia)' },
            { label: 'porque / ya que', detail: 'because / since (cause)' },
            { label: 'por eso / por lo tanto', detail: 'that\'s why / therefore (consequence)' },
            { label: 'sin embargo / aunque', detail: 'however / although (contrast — aunque + subjunctive for hypothetical)' },
            { label: 'además', detail: 'furthermore (addition)' },
            { label: 'para que + subjunctive', detail: 'so that — purpose clause: Te llamo para que vengas' },
            { label: 'si + imperfecto subjuntivo', detail: 'Si tuviera dinero, viajaría = If I had money, I would travel' },
        ],
    },
    {
        title: 'Reflexive verbs — the day routine engine', items: [
            { label: 'levantarse', detail: 'Me levanto a las siete = I get up at seven', say: 'Me levanto a las siete' },
            { label: 'ducharse / bañarse', detail: 'Me ducho, me baño — shower/bathe' },
            { label: 'vestirse (e→i)', detail: 'Me visto = I get dressed' },
            { label: 'irse / acostarse', detail: 'Me voy, me acuesto — leave / go to bed' },
            { label: 'reciprocal se', detail: 'Nos vemos = we see each other; se conocieron = they met' },
        ],
    },
    {
        title: 'Punctuation Spanish adds', items: [
            { label: '¿ … ?', detail: 'the question OPENS with an upside-down mark: ¿Cómo estás? — you know it\'s a question from the first word', say: '¿Cómo estás?' },
            { label: '¡ … !', detail: 'same for exclamations: ¡Qué bonito!', say: '¡Qué bonito!' },
            { label: 'tildes', detail: 'á é í ó ú — spelling errors in DELE writing; leave re-read time' },
            { label: 'ü', detail: 'only after g + e/i: pingüino, vergüenza — forces the u sound' },
        ],
    },
    {
        title: 'Register — tú vs usted in DELE', items: [
            { label: 'the task names the register', detail: '"Escribe a un amigo" → tú + Hola/Un abrazo. "Escribe al director" → usted + Estimado señor/Atentamente' },
            { label: 'formal openers', detail: 'Estimado/a…, Le escribo para…, Quedo a la espera de su respuesta, Atentamente' },
            { label: 'informal openers', detail: 'Hola…, ¿Qué tal?, Escríbeme pronto, Un abrazo / Besos' },
            { label: 'usted verbs', detail: 'usted uses 3rd-person forms: ¿Tiene…? ¿Podría…? — mixing tú/usted in one letter is a classic point-loser' },
        ],
    },
    {
        title: 'The BIG distinctions (exam favourites)', items: [
            { label: 'ser vs estar', detail: 'essence vs state — see the SER/ESTAR section' },
            { label: 'por vs para', detail: 'cause vs purpose' },
            { label: 'saber vs conocer', detail: 'facts/skills vs people/places' },
            { label: 'qué vs cuál', detail: '¿Qué es? (definition) vs ¿Cuál prefieres? (selection)' },
            { label: 'muy vs mucho', detail: 'muy + adjective (muy bueno) / mucho + noun or verb (mucho frío, trabajo mucho)' },
            { label: 'bien vs bueno', detail: 'bien = well (adverb, ¡muy bien!) / bueno = good (adjective, un libro bueno)' },
            { label: 'mal vs malo', detail: 'mal = badly / malo = bad' },
            { label: 'ir vs venir', detail: 'ir = to go (away from speaker) / venir = to come (toward speaker)' },
            { label: 'llevar vs traer', detail: 'llevar = take there / traer = bring here' },
            { label: 'ir vs salir', detail: 'ir = go to a place / salir = leave, go out' },
        ],
    },
    {
        title: 'Plurals — three spelling rules, not just +s', items: [
            { label: 'vowel ending → +s', detail: 'casa → casas, libro → libros', say: 'casas' },
            { label: 'consonant ending → +es', detail: 'papel → papeles, ciudad → ciudades, profesor → profesores', say: 'papeles' },
            { label: '-z → -ces', detail: 'lápiz → lápices, voz → voces, pez → peces', say: 'lápices' },
            { label: 'stressed vowel ending keeps its tilde +s', detail: 'sofá → sofás, menú → menús, gitano → but: mamá → mamás (accent stays)' },
            { label: 'unstressed diphthong +s drops nothing', detail: 'coche → coches; but -és/-és nouns keep it: inglés → ingleses' },
            { label: 'invariable (same singular/plural)', detail: 'el/los martes, la/las crisis — and stress moves where spelling demands: el examen → los exámenes (new tilde)', say: 'los exámenes' },
        ],
    },
    {
        title: 'The only two contractions in Spanish', items: [
            { label: 'de + el = del', detail: 'el coche del profesor = the teacher\'s car (NEVER "de el")', say: 'el coche del profesor' },
            { label: 'a + el = al', detail: 'Voy al mercado = I go to the market (NEVER "a el")', say: 'Voy al mercado' },
            { label: 'feminine never contracts', detail: 'de la casa, a la playa — written in full' },
            { label: 'but a el(?) watch pronouns', detail: 'this rule is ONLY for the masculine article el — the pronoun él never contracts: "a él" stays separate' },
        ],
    },
    {
        title: 'Essential prepositions', items: [
            { label: 'a', detail: 'to / at — Voy a Madrid; motion + personal a (Veo a María)' },
            { label: 'de', detail: 'of / from — Soy de México; possession: el libro de Ana' },
            { label: 'en', detail: 'in / on / by — en casa, en el coche (NOT "en" for "into": entrar EN)' },
            { label: 'con / sin', detail: 'with / without — conmigo, contigo (special forms!)' },
            { label: 'sobre / entre', detail: 'on / about — sobre la mesa, una película sobre la guerra; entre = between' },
            { label: 'desde / hasta', detail: 'from / until — desde las nueve hasta las cinco' },
            { label: 'tras / durante', detail: 'after / during — tras la cena, durante el verano' },
            { label: 'por vs para', detail: 'the two "fors" — full section above' },
        ],
    },
    {
        title: 'Adjectives — agreement, position, meaning shifts', items: [
            { label: 'agreement', detail: '-o/-a/-os/-as: pequeño, pequeña, pequeños, pequeñas; -e and -ista take only number: grande/grandes, idealista/idealistas' },
            { label: 'default position = AFTER the noun', detail: 'una casa grande (English does the reverse!) — before the noun is emphatic/literary' },
            { label: 'gran = great', detail: 'grande shortens to gran BEFORE a noun and changes meaning: una casa grande (big) / una gran casa (great)', say: 'una gran casa' },
            { label: 'position changes meaning', detail: 'un hombre grande (a big man) / un gran hombre (a great man); mi amigo viejo (old in age) / mi viejo amigo (long-time friend)' },
            { label: 'apocopated forms', detail: 'buen(o), mal(o), primer(o), tercer(o), algun(o), cualquier(a) — shorten BEFORE a singular noun: un buen día, el primer día' },
        ],
    },
    {
        title: 'Demonstratives — three distances', items: [
            { label: 'este/esta/estos/estas', detail: 'THIS (near me) — este libro (in my hand)', say: 'este libro' },
            { label: 'ese/esa/esos/esas', detail: 'THAT (near you) — ese libro (in your hand)' },
            { label: 'aquel/aquella/aquellos/aquellas', detail: 'THAT over there (far from both) — aquel libro (across the room)' },
            { label: 'neuter forms', detail: 'esto, eso, aquello — for ideas/unknown things: ¿Qué es esto? (no gender noun behind it)' },
            { label: 'no tildes anymore', detail: 'old este/ese tildes are gone per RAE — only qué/cómo/… question words carry them' },
        ],
    },
    {
        title: 'Possessives — two families', items: [
            { label: 'short form (before noun)', detail: 'mi, tu, su, nuestro/a, vuestro/a, su — agrees in NUMBER not gender: mis casas (not "mías casas")', say: 'mis casas' },
            { label: 'su = his/her/their/your(formal)', detail: 'the ambiguity is solved with de: el coche de él / de ella / de ellos', say: 'su coche' },
            { label: 'long form (after noun/verb)', detail: 'mío/a, tuyo/a, suyo/a, nuestro/a… for emphasis or predicates: la casa mía, ¿Es tuyo?' },
            { label: 'body parts skip the possessive', detail: 'Me lavo las manos (not "mis manos") — article + reflexive marks possession' },
        ],
    },
    {
        title: 'Relative pronouns — connect like B2', items: [
            { label: 'que', detail: 'the workhorse: el libro que leí = the book that I read (people and things)', say: 'el libro que leí' },
            { label: 'quien', detail: 'after prepositions or for people: la mujer a quien vi; mi hermano, quien vive en Lima,…' },
            { label: 'el que / la que', detail: 'the clarity form: la casa en la que vivo = the house I live in (agrees + repeats the article)' },
            { label: 'cuyo/a/os/as', detail: 'whose — agrees with what FOLLOWS: el autor cuya novela leímos', say: 'el autor cuya novela leímos' },
            { label: 'donde', detail: 'where: la ciudad donde nací — also: desde donde, hacia donde' },
        ],
    },
    {
        title: 'Progressive — estar + gerund', items: [
            { label: '-AR → -ando', detail: 'hablar → hablando: Estoy hablando = I am speaking', say: 'Estoy hablando' },
            { label: '-ER/-IR → -iendo', detail: 'comer → comiendo, vivir → viviendo' },
            { label: 'irregular gerunds', detail: 'leer → leyendo, oír → oyendo, dormir → durmiendo (o→u), pedir → pidiendo (e→i)' },
            { label: 'pronouns attach', detail: 'Estoy duchán(d)oME → Me estoy duchando or Estoy duchándome — both correct' },
            { label: 'NOT for the future', detail: 'Spanish never uses progressive for future (English "I\'m seeing him tomorrow") → Lo veo mañana / Voy a verlo' },
        ],
    },
    {
        title: 'TENER — the "have" idioms English uses "be" for', items: [
            { label: 'tener X años', detail: 'Tengo veinte años = I am 20 (lit. "I hold 20 years" — never "soy veinte")', say: 'Tengo veinte años' },
            { label: 'sensations', detail: 'tener hambre / sed / frío / calor / sueño / miedo = to be hungry / thirsty / cold / hot / sleepy / afraid', say: 'Tengo hambre' },
            { label: 'states', detail: 'tener razón (be right), no tener razón, tener prisa (be in a hurry), tener éxito, tener suerte', say: 'Tienes razón' },
            { label: 'tener que + infinitive', detail: 'obligation: Tengo que estudiar = I have to study', say: 'Tengo que estudiar' },
            { label: 'tener ganas de', detail: 'to feel like: Tengo ganas de viajar = I feel like travelling', say: 'Tengo ganas de viajar' },
        ],
    },
    {
        title: 'GUSTAR & company — the backwards verbs', items: [
            { label: 'me gusta(n)', detail: 'literally "it pleases me": Me gusta el café (singular) / Me gustan los libros (plural — verb agrees with the THING)', say: 'Me gustan los libros' },
            { label: 'the person goes in the pronoun', detail: 'me, te, le, nos, os, les — le gusta = he/she likes; never "yo gusto"' },
            { label: 'with verbs it is always singular', detail: 'Me gusta viajar, leer y cocinar (one activity set = gusta)' },
            { label: 'the family', detail: 'encantar (love), doler (hurt: Me duele la cabeza), importar (matter: No me importa), faltar (miss/need), molestar (bother)' },
            { label: 'emphasis with a', detail: 'A María le gusta el té = María likes tea (clarifies who "le" is)' },
        ],
    },
    {
        title: 'Time words — the everyday timeline', items: [
            { label: 'hoy / ayer / anoche', detail: 'today / yesterday / last night', say: 'ayer' },
            { label: 'mañana / la semana que viene', detail: 'tomorrow / next week (¡mañana = morning AND tomorrow! — por la mañana clears it up)' },
            { label: 'ahora / luego / enseguida', detail: 'now / later / right away' },
            { label: 'antes / después', detail: 'before / after — antes de + infinitive (antes de comer)' },
            { label: 'siempre / nunca / a veces', detail: 'always / never / sometimes — nunca can also START the sentence (verb before subject!)' },
            { label: 'ya / todavía', detail: 'already / still: Ya comí. — Todavía no he comido. (ya no = no longer)' },
            { label: 'desde hace', detail: 'duration until now: Vivo aquí desde hace dos años = I have lived here for 2 years (present tense in Spanish!)' },
        ],
    },
];
