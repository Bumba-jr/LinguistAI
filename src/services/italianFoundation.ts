// Italian Foundations — the static course (CILS/CELI/PLIDA oriented).
// Sources: the A0→C2 master syllabus + CLIQ/CILS certification framework (Sep 2026).
export const ITALIAN_WRITING_FACTS = {
    intro: 'Italian uses the Latin alphabet — but only 21 letters are native: J, K, W, X and Y appear almost exclusively in loanwords (il jogging, il wifi, lo yogurt). The real work is three things English speakers underestimate: DOUBLE consonants are genuinely longer and change meaning (pala shovel vs palla ball), c and g have hard/soft rules with ch/gh spell-shields, and words ending in a stressed vowel carry a written accent (perché, città).',
    example: { fr: 'Ho mangiato una pizza abbastanza buona.', say: 'Ho mangiato una pizza abbastanza buona.', en: 'I ate a pretty good pizza — every double consonant (mangiato, pizza, abbastanza) is held longer' },
    parallel: 'Italian has NO neuter gender (unlike German): every noun is masculine or feminine, and the article is so rich — il, lo, l\', la, i, gli, le — that the article tells you the gender, number AND the sound that follows.',
    examNote: 'CILS notes: spelling, accents and double consonants are graded in the Scritta — a single/double consonant error is a meaning error, not a typo. The exam grades each SKILL independently; you can retake only the parts you failed.',
};

// 21 native letters + the 5 foreign ones. Tap to hear the name.
export const ITALIAN_ALPHABET: { letter: string; name: string; note?: string }[] = [
    { letter: 'A', name: 'ah' },
    { letter: 'B', name: 'bee', note: 'always soft — no hard/soft b distinction' },
    { letter: 'C', name: 'chee', note: 'hard before a/o/u, soft ch before e/i — ch shields the hard sound' },
    { letter: 'D', name: 'dee' },
    { letter: 'E', name: 'eh', note: 'open è or closed é — two sounds, two accents' },
    { letter: 'F', name: 'effeh' },
    { letter: 'G', name: 'gee', note: 'hard before a/o/u, soft j before e/i — gh shields the hard sound' },
    { letter: 'H', name: 'acca', note: 'ALWAYS silent — exists only to harden c/g (chi, spaghetti) and in ho, hai, ha, hanno' },
    { letter: 'I', name: 'ee', note: 'often a glide: ia, io, iu — ciao = "chao"' },
    { letter: 'L', name: 'elleh' },
    { letter: 'M', name: 'emmeh' },
    { letter: 'N', name: 'enné' },
    { letter: 'O', name: 'oh', note: 'open ò or closed ó — two sounds, two accents' },
    { letter: 'P', name: 'pee' },
    { letter: 'Q', name: 'koo', note: 'always in qu, and the u SOUNDS: quattro = "KWAT-tro"' },
    { letter: 'R', name: 'erré', note: 'tapped/rolled — one tap between vowels, longer when doubled' },
    { letter: 'S', name: 'esseh', note: 's between vowels often sounds like z: rosa = "RO-za"' },
    { letter: 'T', name: 'tee' },
    { letter: 'U', name: 'oo', note: 'often a glide: ua, ue, uo — suo = "SWO"' },
    { letter: 'V', name: 'vee', note: 'always the English v — never w' },
    { letter: 'Z', name: 'zeta', note: 'ts in pizza, dz in zero — both exist' },
    { letter: 'J', name: 'i lunga', note: 'foreign only: jogging, Juventus' },
    { letter: 'K', name: 'kappa', note: 'foreign only: km, karaoke' },
    { letter: 'W', name: 'doppia vu', note: 'foreign only: wifi, wafer' },
    { letter: 'X', name: 'ics', note: 'foreign only: taxi' },
    { letter: 'Y', name: 'ipsilon', note: 'foreign only: yogurt, yacht' },
];

// Double consonants — THE Italian feature English speakers ignore.
export const DOUBLE_CONSONANTS = {
    why: 'A double consonant is HELD roughly twice as long — it is not spelled the same and forgotten. Single vs double changes meaning, so listening comprehension depends on hearing it: nono (ninth) vs nonno (grandfather), pala (shovel) vs palla (ball), sete (thirst) vs sette (seven), caro (dear) vs carro (cart), casa (house) vs cassa (cash register).',
    drill: 'Drill: hold the consonant like a mini pause — "no-nno". English has the same sound in "big gift" (two g\'s across words) — Italian just puts it inside words constantly.',
    pairs: [
        { single: 'nono', double: 'nonno', singleEn: 'ninth', doubleEn: 'grandfather' },
        { single: 'pala', double: 'palla', singleEn: 'shovel', doubleEn: 'ball' },
        { single: 'sete', double: 'sette', singleEn: 'thirst', doubleEn: 'seven' },
        { single: 'caro', double: 'carro', singleEn: 'dear/expensive', doubleEn: 'cart' },
    ],
};

// c and g — the hard/soft system with ch/gh shields.
export const C_G_RULES = [
    { rule: 'c + a, o, u = hard k', examples: 'casa, cosa, cuore' },
    { rule: 'c + e, i = soft ch', examples: 'cento, cinema, cibo' },
    { rule: 'ch + e/i = HARD c (shield)', examples: 'che, chi, Chianti — chi = "kee", never "chee"' },
    { rule: 'g + a, o, u = hard g', examples: 'gatto, gonna, gusto' },
    { rule: 'g + e, i = soft j', examples: 'gentile, giro, gelato' },
    { rule: 'gh + e/i = HARD g (shield)', examples: 'spaghetti, alberghi, lunghe — gh keeps the g hard before e/i' },
    { rule: 'sc + e/i = sh', examples: 'scena, uscito, pesce — but sca/sco/scu = "sk": scuola, bosco' },
];

// The characteristic sound units.
export const SOUND_UNITS = [
    { sound: 'gn', english: 'ny in canyon', examples: 'signore, ognuno, bagno, lasagne', sample: 'bagno' },
    { sound: 'gli', english: 'lli in million', examples: 'famiglia, figlio, meglio, figli — but glicine and gl- beginnings keep hard gl', sample: 'famiglia' },
    { sound: 'h', english: 'always silent', examples: 'ho, hai, hanno, hotel — it only hardens c/g: chi, spaghetti', sample: 'hanno' },
    { sound: 'z', english: 'ts or dz', examples: 'pizza (ts), zero (dz), zio (ts), zona (dz)', sample: 'zio' },
    { sound: 'r', english: 'tapped/rolled', examples: 'one tap between vowels (caro), held when doubled (terra, guerra)', sample: 'terra' },
];

// Accents — stress marking on final vowels.
export const ITALIAN_ACCENTS = [
    { pair: ['è', 'é'], note: 'è = open (è bellissimo) / é = closed (perché) — both mean "is/and" only via position: è = is, e = and (NO accent = and!)' },
    { pair: ['ò', 'ó'], note: 'open/closed o — only written on final stressed vowels: però, ciò' },
    { pair: ['à ì ù'], note: 'only ever open: città, così, più — written when the stress is on the LAST syllable' },
    { pair: ['perché'], note: 'the classic: accented because stress is final — never "perche/perchè" both wrong; also ciò, così, più, già, là' },
    { pair: ['dà / dì'], note: 'a few verbs force accents to distinguish: dà (he/she gives) vs da (from); dì (tell!) vs di (of)' },
];

// Gender & articles — the rich Italian article system.
export const ARTICLE_SYSTEM = {
    definite: [
        { article: 'il', before: 'most masculine consonants', sample: 'il libro' },
        { article: 'lo', before: 's+consonant, z, gn, ps, pn, x, y', sample: 'lo studente, lo zaino, lo gnomo, lo psichiatra' },
        { article: "l'", before: 'any vowel', sample: "l'amico, l'amica" },
        { article: 'la', before: 'feminine consonants', sample: 'la casa' },
        { article: 'i', before: 'plural of il-words', sample: 'i libri' },
        { article: 'gli', before: 'plural of lo/l\'-words', sample: 'gli studenti, gli amici, gli zaini' },
        { article: 'le', before: 'ALL feminine plurals', sample: 'le case, le amiche (invariant!)' },
    ],
    indefinite: [
        { article: 'un', before: 'most masculine consonants + vowels', sample: 'un libro, un amico' },
        { article: 'uno', before: 's+consonant, z, gn, ps… (same triggers as lo)', sample: 'uno studente, uno zaino' },
        { article: 'una', before: 'feminine consonants', sample: 'una casa' },
        { article: "un'", before: 'feminine vowels', sample: "un'amica" },
    ],
    why: 'Learn every noun WITH its article — lo studente, not bare "studente" — because the article is the memory hook for gender AND plural AND the spelling rules.',
};

// Plural patterns — not just -s.
export const PLURAL_PATTERNS = [
    { pattern: '-o → -i (masculine)', examples: 'libro → libri, anno → anni' },
    { pattern: '-a → -e (feminine)', examples: 'casa → case, scuola → scuole' },
    { pattern: '-e → -i (both genders)', examples: 'pane → pani, notte → notti, studente → studenti' },
    { pattern: '-ista both, -i plural', examples: 'il dentista → i dentisti, la dentista → le dentiste' },
    { pattern: '-zione → -zioni', examples: 'informazione → informazioni, stazione → stazioni' },
    { pattern: '-tà invariable', examples: 'la città → le città, l\'università → le università (accent stays!)' },
    { pattern: '-co/-go often → -chi/-ghi', examples: 'fuoco → fuochi, banco → banchi, lago → laghi (but: amico → amici, medico → medici — memorise!)' },
    { pattern: 'invariable', examples: 'il film → i film, il bar → i bar, il re → i re (vowel-final foreign words)' },
];

// Pro-drop + tu/Lei.
export const PRONOUN_SYSTEM = [
    { form: 'io / tu', use: 'I / you (informal)', example: 'Io studio, tu lavori.' },
    { form: 'lui / lei', use: 'he / she', example: 'Lui parla italiano.' },
    { form: 'Lei', use: 'you FORMAL — capitalised, takes 3rd-person verb: Lei parla italiano', example: 'Come sta, Lei?' },
    { form: 'noi / voi / loro', use: 'we / you all / they', example: 'Noi studiamo, voi guardate, loro dormono.' },
    { form: 'pro-drop', use: 'the ending already says who — "Studio italiano" is complete; use io/tu only for contrast or emphasis', example: '—Parli italiano? —Sì, parlo.' },
];

// Number quirks.
export const ITALIAN_NUMBER_QUIRKS = [
    { pattern: 'ventuno, ventotto', why: '21 and 28 DROP the final vowel before venti-words: ventuno (not ventitré-style vent+uno), ventotto — and they act like singulars' },
    { pattern: 'ventitré', why: '23 takes an accent (tré) — ventitré, trentatré…; 22 = ventidue (no accent)' },
    { pattern: 'un milione di euro', why: 'milione is a noun: due milioni di euro — and euro is invariable: un euro, due euro' },
    { pattern: 'il primo maggio', why: 'dates: il primo/5 maggio — only the 1st uses the ordinal; essere + article: è il 5 maggio' },
    { pattern: 'le tre e mezza', why: 'time: Sono le tre — plural for all but one (È l\'una). mezza/quinici… half past = e mezza' },
];

// CILS strategy card.
export const CILS_STRATEGY: { skill: string; color: string; points: string[] }[] = [
    {
        skill: 'Ascolto (Listening)', color: 'indigo',
        points: [
            'Read the questions during the instruction pause — hunt for names, times, prices, places',
            'Announcements and dialogues hide key details mid-sentence; track numbers carefully',
            'Conversational pairs: the SECOND answer usually counts ("Ci vediamo alle 3? — Meglio alle 4")',
            'Each skill is graded independently — do not sacrifice listening practice because speaking feels stronger',
        ],
    },
    {
        skill: 'Lettura (Reading)', color: 'teal',
        points: [
            'Match tasks (people → texts): read the profiles first, underline each person\'s condition, eliminate as you go',
            'Wrong options copy exact words with twisted meaning — trust paraphrase',
            'Skim the title and first line for global meaning before reading in detail',
            'Never leave blanks — no penalty for guessing',
        ],
    },
    {
        skill: 'Scritta (Writing)', color: 'emerald',
        points: [
            'Hit ALL the content points the task lists — they are graded one by one',
            'Register matters: tu for friends, Lei + "Gentile Direttore" for formal — mismatch loses points',
            'Double consonants and accents are spelling errors: pizza, abbastanza, perché, città',
            'Structure: opening line → all points → closing line (Ti aspetto! / In attesa di un Suo cortese riscontro…)',
        ],
    },
    {
        skill: 'Orale (Speaking)', color: 'amber',
        points: [
            'Prepare your self-introduction cold — it opens almost every level',
            'Describe → speculate (forse, probabilmente) → react; keep talking, do not stop after one sentence',
            'In dialogue tasks you must ASK questions too — interaction is graded',
            'Hold your double consonants aloud — "sete vs sette" confusion is audible to examiners',
        ],
    },
];

// The master cheat sheet.
export const ITALIAN_CHEAT_SHEET: { title: string; items: { label: string; detail: string; say?: string }[] }[] = [
    {
        title: 'Articles — the full system', items: [
            { label: 'il / i', detail: 'most masculine: il libro → i libri', say: 'il libro' },
            { label: 'lo / gli', detail: 's+cons, z, gn, ps, y: lo studente → gli studenti, lo zaino → gli zaini', say: 'gli studenti' },
            { label: "l' / gli", detail: 'masculine vowels: l\'amico → gli amici', say: "gli amici" },
            { label: 'la / le', detail: 'feminine: la casa → le case (le never elides!)', say: 'le case' },
            { label: 'un / uno / una / un\'', detail: 'un libro, uno zaino, una casa, un\'amica' },
            { label: 'lo also before', detail: 'gn, ps, pn, x: lo gnomo, lo psichiatra, lo xilofono' },
        ],
    },
    {
        title: 'Gender traps — endings mislead', items: [
            { label: '-ma is masculine', detail: 'il problema, il sistema, il cinema, il clima (Greek origin)' },
            { label: '-ione is feminine', detail: 'la stazione, la televisione, la lezione' },
            { label: '-e either', detail: 'il pane / la notte — memorise with the article' },
            { label: '-ista both', detail: 'il/la dentista — gender shows in the article/adjective' },
            { label: 'shortened feminines', detail: 'la mano (f!), l\'auto (f), la radio (f), la moto (f), la foto (f — from la fotografia)' },
        ],
    },
    {
        title: 'Plurals — five patterns, not just +s', items: [
            { label: '-o → -i', detail: 'libro → libri', say: 'libri' },
            { label: '-a → -e', detail: 'casa → case' },
            { label: '-e → -i', detail: 'notte → notti, studente → studenti' },
            { label: '-tà never changes', detail: 'la città → le città, la felicità → le felicità' },
            { label: '-co/-go → -chi/-ghi', detail: 'fuochi, banchi, laghi — but amici, medici (memorise!)' },
            { label: 'invariable', detail: 'i film, i bar, i re; le foto (shortened words keep singular -o!)' },
        ],
    },
    {
        title: 'Pronouns & pro-drop', items: [
            { label: 'drop the subject', detail: 'the ending says who: Studio italiano. — add io only to contrast' },
            { label: 'Lei = you formal', detail: '3rd-person verb: Come sta? (not Come stai!) — capitalised in writing' },
            { label: 'direct: lo la li le', detail: 'Lo vedo = I see him/it; Li compro = I buy them' },
            { label: 'indirect: mi ti gli le ci vi gli/loro', detail: 'Gli parlo = I speak to him; Le scrivo = I write to her' },
            { label: 'combined', detail: 'mi lo → me lo, ti lo → te lo, gli lo → glielo: Glielo do = I give it to him', say: 'Glielo do' },
            { label: 'attach to infinitives', detail: 'Voglio vederlo / Vedo… lo? No: Voglio vederlo — attach after infinitive' },
        ],
    },
    {
        title: 'ci & ne — the fluency milestone', items: [
            { label: 'ci = there/about it', detail: 'Ci vado = I go there; Ci penso = I\'ll think about it; Ci sono = there are', say: 'Ci vado' },
            { label: 'ci with verbs', detail: 'crederci (believe it), volerci (take/need): Quanto ci vuole?' },
            { label: 'ne = of it/them', detail: 'Ne voglio due = I want two of them; Quante ne prendi?', say: 'Ne voglio due' },
            { label: 'ne for partitives', detail: 'Ne ho mangiata mezza = I ate half of it (agrees!)' },
        ],
    },
    {
        title: 'Three verb groups + -isc', items: [
            { label: '-ARE: parlo parli parla', detail: 'parliamo parlate parlano', say: 'parlo, parli, parla' },
            { label: '-ERE: vedo vedi vede', detail: 'vediamo vedete vedono', say: 'vedo, vedi, vede' },
            { label: '-IRE: dormo dormi dorme', detail: 'dormiamo dormite dormono' },
            { label: '-ISC verbs (-ire)', detail: 'capire → capisco capisci capisce, capiamo capite capiscono — also finire, pulire, preferire' },
            { label: 'the big irregulars', detail: 'essere (sono sei è), avere (ho hai ha), andare (vado vai va), fare (faccio), stare (sto), dare (do), venire (vengo), potere (posso), volere (voglio), dovere (devo)' },
        ],
    },
    {
        title: 'Tense map — what Italians actually use', items: [
            { label: 'presente', detail: 'present + near future: Domani studio.' },
            { label: 'passato prossimo', detail: 'THE spoken past: Ho mangiato. — avere/essere + participle', say: 'Ho mangiato' },
            { label: 'imperfetto', detail: 'habits/background: Da bambino giocavo sempre fuori.' },
            { label: 'trapassato prossimo', detail: 'had done: Avevo mangiato.' },
            { label: 'passato remoto', detail: 'historical/literary past — RECOGNISE at B2+: Dante visse nel Trecento. (Southern spoken use too)' },
            { label: 'futuro semplice', detail: 'will + probability: Sarà fuori. — but spoken future often presente + time word' },
            { label: 'condizionale', detail: 'would + politeness + hearsay: Mangerei volentieri. Secondo i giornali sarebbe ricco.' },
            { label: 'congiuntivo', detail: 'Penso che tu studi… — doubt/opinion/emotion; the B2 milestone' },
        ],
    },
    {
        title: 'Passato prossimo — the auxiliary choice', items: [
            { label: 'avere + most verbs', detail: 'Ho mangiato, ho letto, ho comprato.' },
            { label: 'essere + motion & change', detail: 'Sono andato/a, sono uscito/a, sono nato/a, mi sono svegliato/a', say: 'Sono andato a Roma' },
            { label: 'agreement with essere', detail: 'the participle AGREES: Lucia è andata a casa (f!)' },
            { label: 'agreement with avere (lo/li)', detail: 'Li ho visti (m pl) / Le ho viste (f pl) — with preceding lo/la/li/le the participle agrees' },
            { label: 'irregular participles', detail: 'fatto, detto, scritto, letto, visto, venuto, aperto, chiuso, preso, messo, bevuto' },
        ],
    },
    {
        title: 'Articulated prepositions — di+il = del', items: [
            { label: 'di → del della dei delle', detail: 'il libro dello studente, la casa dei Rossi' },
            { label: 'a → al alla ai alle', detail: 'Vado al mercato; dai nonni = at the grandparents\' place — dai from da + i', say: 'Vado al mercato' },
            { label: 'da → dal dalla dai dalle', detail: 'Vengo dal medico = I come from the doctor' },
            { label: 'in → nel nella negli nelle', detail: 'nel sacchetto, negli Stati Uniti' },
            { label: 'su → sul sulla sugli sulle', detail: 'sul tavolo, sugli scaffali' },
            { label: 'con/per never combine', detail: 'con il padre (col in literary), per gli amici — mostly separate' },
        ],
    },
    {
        title: 'Negation & questions', items: [
            { label: 'non + verb', detail: 'Non parlo italiano. — non directly before the verb', say: 'Non parlo italiano' },
            { label: 'mai / niente / nulla', detail: 'Non mangio mai carne — keep the non!' },
            { label: 'nessuno / neanche / nemmeno', detail: 'Non viene nessuno. Neanche io.' },
            { label: 'questions = intonation', detail: 'Parli italiano? — no inversion, no helper word, just ? and rising tone' },
            { label: 'question words', detail: 'chi, che cosa/cosa, dove, quando, perché, come, quale, quanto — perché = why AND because!' },
        ],
    },
    {
        title: 'Comparisons & superlatives', items: [
            { label: 'più / meno … di', detail: 'più grande di Roma — di before quantities/nouns' },
            { label: '… di quanto', detail: 'più interessante di quanto pensassi (with verbs)' },
            { label: 'come / quanto', detail: 'equality: È alto come me' },
            { label: 'relative superlative', detail: 'il più grande DELLA città — article + più' },
            { label: 'absolute superlative', detail: '-issimo: grandissimo, bellissimo — very/extremely big', say: 'bellissimo' },
            { label: 'irregulars', detail: 'buono → migliore, cattivo → peggiore, grande → maggiore, piccolo → minore' },
        ],
    },
    {
        title: 'più vs di — the comparison connectors', items: [
            { label: 'di vs che', detail: 'più di + noun/pronoun: più di te; più che + verbs/adj: mangiare è più bello che dormire' },
            { label: 'the rule of thumb', detail: 'same role compared → di; two parts of the same thing → che: È più stanco che arrabbiato' },
        ],
    },
    {
        title: 'Redemittel — CILS exam phrase kit', items: [
            { label: 'starting', detail: 'Vorrei parlare di… / Innanzitutto… / Il tema che ho scelto è…' },
            { label: 'structuring', detail: 'da un lato … dall\'altro lato / in primo luogo, inoltre, infine' },
            { label: 'opinions', detail: 'Secondo me… / A mio parere… / Ritengo che… (+ congiuntivo!)' },
            { label: 'agreeing / disagreeing', detail: 'Sono d\'accordo con te. / Capisco il tuo punto, però…' },
            { label: 'speculating', detail: 'forse, probabilmente, mi sembra che (+ congiuntivo)' },
            { label: 'closing', detail: 'In conclusione… / Per concludere, direi che…' },
        ],
    },
    {
        title: 'The BIG distinctions (exam favourites)', items: [
            { label: 'essere vs stare', detail: 'essere = to be (Sono stanco) / stare = to stay/feel (Sto bene) — stare + gerundio: Sto studiando' },
            { label: 'sapere vs conoscere', detail: 'know facts/how (So nuotare) vs know people/places (Conosco Roma)' },
            { label: 'da vs di', detail: 'da = from/by/at someone\'s (Vengo da Roma, dal dottore) / di = of (il libro di Maria)' },
            { label: 'a vs in', detail: 'a + cities & places (a Roma, al mare) / in + rooms, countries with article, transport (in Italia, in macchina)' },
            { label: 'bene vs buono', detail: 'well (adverb, Sto bene!) vs good (adjective, un film buono)' },
            { label: 'male vs cattivo', detail: 'badly (adverb) vs bad (adjective)' },
            { label: 'andare vs venire', detail: 'go (away from speaker) vs come (toward speaker)' },
            { label: 'portare vs prendere', detail: 'bring/carry vs take — Portami un caffè / Prendiamo il treno' },
            { label: 'e vs ed, o vs od', detail: 'e → ed before vowels (ed io), o → od (od ora) — euphony' },
        ],
    },
];
