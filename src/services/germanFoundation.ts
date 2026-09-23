// German Foundations — the static course (Goethe-Zertifikat oriented).
// Sources: the A0→C2 master syllabus + Goethe-Institut exam structure (Sep 2026).
export const GERMAN_WRITING_FACTS = {
    intro: 'German uses the Latin alphabet — 26 letters plus four special characters: the umlauts Ä Ö Ü and the sharp S (ß, "Eszett"). The real work is NOT the writing system. It is three systems English lacks entirely: every noun has a GENDER you must memorise with it, every article changes with the CASE (der/den/dem/des…), and the VERB sits in position 2 of a main clause but flies to the END of a subordinate clause.',
    example: { fr: 'Ich weiß, dass er heute kommt.', say: 'Ich weiß, dass er heute kommt.', en: 'I know that he is coming today — the conjugated verb "kommt" is pushed to the END of the dass-clause' },
    parallel: 'Umlauts are not decoration: ä ö ü are distinct letters with distinct sounds, and they can change meaning (schon = already / schön = beautiful). ß is simply a sharp s-sound: Straße, heiße.',
    examNote: 'Goethe notes: the Schreiben exam grades your Schreibschema — spelling, comma rules, and above all capitalisation of ALL nouns (das Haus, die Schule). Forgetting a capital is a real point loss.',
};

// 30 characters — A-Z plus Ä Ö Ü ß. Tap to hear the letter name.
export const GERMAN_ALPHABET: { letter: string; name: string; note?: string }[] = [
    { letter: 'A', name: 'ah' },
    { letter: 'B', name: 'beh' },
    { letter: 'C', name: 'tseh' },
    { letter: 'D', name: 'deh' },
    { letter: 'E', name: 'eh' },
    { letter: 'F', name: 'eff' },
    { letter: 'G', name: 'geh', note: 'hard g — never the English soft g' },
    { letter: 'H', name: 'hah', note: 'after a vowel it only LENGTHENS it — verkehrt = "fer-KEHRT"' },
    { letter: 'I', name: 'ee' },
    { letter: 'J', name: 'yot', note: 'always the English y: ja = "yah", Jahr = "yahr"' },
    { letter: 'K', name: 'kah' },
    { letter: 'L', name: 'ell' },
    { letter: 'M', name: 'emm' },
    { letter: 'N', name: 'enn' },
    { letter: 'O', name: 'oh' },
    { letter: 'P', name: 'peh' },
    { letter: 'Q', name: 'koo', note: 'only in qu = "kv": Quelle = "KVelle"' },
    { letter: 'R', name: 'err', note: 'uvular — gargled at the back, or vowel-like at word end: wir = "vee-ah"' },
    { letter: 'S', name: 'ess', note: 'before vowel = z sound: Sonne = "Zonne"' },
    { letter: 'T', name: 'teh' },
    { letter: 'U', name: 'oo' },
    { letter: 'V', name: 'fau', note: 'usually the f sound: Vater = "FAH-ter" (v = w in loanwords: Vase)' },
    { letter: 'W', name: 'veh', note: 'always the English v: Wasser = "VAH-ser"' },
    { letter: 'X', name: 'iks' },
    { letter: 'Y', name: 'uepsilon', note: 'rare — sounds like ü: Typ, System' },
    { letter: 'Z', name: 'tsett', note: 'always "ts": Zeit = "tsite", nicht "zite"' },
    { letter: 'Ä', name: 'a-Umlaut', note: 'like "air" without the r: Käse, spät' },
    { letter: 'Ö', name: 'o-Umlaut', note: 'say "ay" and round your lips: schön, König' },
    { letter: 'Ü', name: 'u-Umlaut', note: 'say "ee" and round your lips: über, Tür' },
    { letter: 'ß', name: 'Eszett', note: 'sharp s — only after long vowels/diphthongs: Straße, heiße, groß' },
];

// The three umlauts deserve their own drill — they change sound AND meaning.
export const GERMAN_UMLAUTS = [
    { pair: ['a', 'ä'], sound: 'a → "air"', meaning: 'Mann (man) → Männer (men); schon is different from schön!', sample: 'Käse' },
    { pair: ['o', 'ö'], sound: 'o → rounded "ay"', meaning: 'no English equivalent — start with "ay" then round the lips: schön, zwölf', sample: 'schön' },
    { pair: ['u', 'ü'], sound: 'u → rounded "ee"', meaning: 'start with "ee" then round the lips: über, Tür, müde', sample: 'Tür' },
];

// Long vs short vowels — meaning-changing in German.
export const VOWEL_LENGTH = {
    why: 'German vowels come in SHORT and LONG pairs and the difference changes words: Bett (bed) vs beet-like "eh" in Beet; Stadt (city) vs Staat (state). Rules of thumb: a vowel is LONG before a single consonant or h (Tag, Bahn), SHORT before two consonants (Tages, dann). i is long in ie (Liebe) — never confuse ei (eye!) with ie (ee).',
    pairs: [
        { short: 'Bett', long: 'Beet', shortEn: 'bed', longEn: 'flower bed' },
        { short: 'Stadt', long: 'Staat', shortEn: 'city', longEn: 'state' },
        { short: 'Sinn', long: 'Sühne-like ü', shortEn: 'sense', longEn: '(long u sound)' },
    ],
};

// Vowel combinations — ei vs ie is THE trap.
export const GERMAN_VOWEL_COMBINATIONS: { combo: string; sound: string; sample: { w: string; spoken: string; en: string } }[] = [
    { combo: 'ei', sound: 'EYE (never "ee"!)', sample: { w: 'nein', spoken: 'nine', en: 'no' } },
    { combo: 'ie', sound: 'long ee', sample: { w: 'Liebe', spoken: 'LEE-beh', en: 'love' } },
    { combo: 'eu / äu', sound: 'oy', sample: { w: 'neun / Häuser', spoken: 'noyn / HOY-zer', en: 'nine / houses' } },
    { combo: 'au', sound: 'ow', sample: { w: 'Haus', spoken: 'howss', en: 'house' } },
    { combo: 'ah / eh / oh', sound: 'long vowels', sample: { w: 'Bahn, gehen, Sohn', spoken: 'bahn, GAY-en, zohn', en: 'railway, to go, son' } },
];

// Consonant combinations that don't behave like English.
export const GERMAN_CONSONANT_SOUNDS: { sound: string; english: string; mouth: string; sample: { w: string; spoken: string; en: string } }[] = [
    { sound: 'ch (after i, e, ü, ö)', english: 'soft "h" hiss', mouth: 'tongue near the palate — like hissing gently: ich, nicht, Bücher', sample: { w: 'ich', spoken: 'ikh', en: 'I' } },
    { sound: 'ch (after a, o, u)', english: 'throaty like Scottish "loch"', mouth: 'back of the mouth: auch, Buch, machen', sample: { w: 'Buch', spoken: 'bookh', en: 'book' } },
    { sound: 'sch', english: 'sh', mouth: 'like English shoe: Schule, schön, Tasche', sample: { w: 'Schule', spoken: 'SHOO-leh', en: 'school' } },
    { sound: 'sp / st (word start)', english: 'shp / sht', mouth: 'ALWAYS sh at the start: sprechen = "shpreh-hen", Stadt = "Shtat" (but middle of word: "spst" normal s)', sample: { w: 'Straße', spoken: 'SHTRAH-seh', en: 'street' } },
    { sound: 'z', english: 'ts', mouth: 'always "ts" — never English z: Zeit, zug, kurz', sample: { w: 'Zeit', spoken: 'tsite', en: 'time' } },
    { sound: 'w', english: 'v', mouth: 'Wasser, wir, Woche — the English w sound does not exist in German', sample: { w: 'Wasser', spoken: 'VAH-ser', en: 'water' } },
    { sound: 'v', english: 'f', mouth: 'Vater, viel, von — v sounds like f (except loanwords: Vase = "VAH-zeh")', sample: { w: 'von', spoken: 'fon', en: 'of/from' } },
    { sound: 'j', english: 'y', mouth: 'ja, Jahr, Jensen — always the English y sound', sample: { w: 'ja', spoken: 'yah', en: 'yes' } },
    { sound: 'pf', english: 'pf (aspirated)', mouth: 'one sound: p with a strong puff — Pferd, Apfel, Pflanze', sample: { w: 'Pferd', spoken: 'pfehrt', en: 'horse' } },
    { sound: 'r (standard)', english: 'uvular gargle', mouth: 'back of throat, French-like; at word END it becomes a vowel: wir = "vee-ah", Uhr = "oo-ah"', sample: { w: 'rot', spoken: 'roat', en: 'red' } },
    { sound: 'h (after vowel)', english: 'silent lengthener', mouth: 'it only stretches the vowel: gehen, Wohnen, Jahr', sample: { w: 'gehen', spoken: 'GAY-en', en: 'to go' } },
    { sound: '-er (word end)', english: 'weak "ah"', mouth: 'unstress it: Mutter = "MUTT-ah", Wasser = "VAH-ser"', sample: { w: 'Mutter', spoken: 'MUTT-ah', en: 'mother' } },
];

// Capitalisation — the rule English broke and German kept.
export const CAPITALIZATION_RULE = {
    rule: 'Every noun is capitalised — always: das Haus, die Schule, der Mann, die Zeit, das Glück.',
    why: 'This is written German\'s most visible feature. It also helps you read: any capitalised word mid-sentence is a NOUN (so you know its role). In the Goethe Schreiben exam it is explicitly graded.',
    traps: 'Trap pairs: morgen (tomorrow, adverb — small) vs der Morgen (the morning, noun — capital); recht (right, adjective) vs das Recht (the law/right, noun).',
};

// The case system — the heart of German.
export const CASE_TABLE = {
    header: ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
    rows: [
        ['Nominativ (subject)', 'der', 'die', 'das', 'die'],
        ['Akkusativ (direct object)', 'den', 'die', 'das', 'die'],
        ['Dativ (indirect object)', 'dem', 'der', 'dem', 'den'],
        ['Genitiv (possession)', 'des', 'der', 'des', 'der'],
    ],
    why: 'Only the MASCULINE visibly changes in most forms (der→den→dem→des) — anchor everything on der-words first. The article carries the grammar, so learn every noun WITH its der/die/das: not "Tisch" but "der Tisch".',
    quick: 'Quick checks: WHO does the action → Nominativ. WHO/WHAT receives it → Akkusativ. TO/FOR whom (and after mit, bei, zu…) → Dativ. WHOSE (and after wegen, während…) → Genitiv.',
};

// du / Sie — the register system.
export const DU_SIE = [
    { form: 'du', use: 'Informal you — friends, family, children, colleagues who offer it', example: 'Wie geht es dir?', region: 'universal informal' },
    { form: 'ihr', use: 'Informal you PLURAL — a group of friends', example: 'Wie geht es euch?', region: 'universal informal plural' },
    { form: 'Sie', use: 'Formal you — strangers, officials, shops, elders. ALWAYS capitalised, singular AND plural', example: 'Wie geht es Ihnen?', region: 'universal formal' },
    { form: 'the verb', use: 'The verb form changes: du kommst / ihr kommt / Sie kommen', example: 'Kommen Sie mit?', region: 'graded in Goethe Sprechen' },
];

// The word-order system — the single most German thing there is.
export const WORD_ORDER_RULES = [
    { pattern: 'Main clause: VERB = POSITION 2', examples: 'Ich lerne Deutsch. / Heute lerne ich Deutsch. (adverb first → subject slides after the verb!)' },
    { pattern: 'Yes/no question: VERB = POSITION 1', examples: 'Lernst du Deutsch? / Kommst du mit?' },
    { pattern: 'W-question: question word, then VERB, then subject', examples: 'Wo wohnst du? / Warum lernst du Deutsch?' },
    { pattern: 'Subordinate clause: VERB GOES TO THE END', examples: 'Ich weiß, dass er heute kommt. / …, weil ich Zeit habe.', },
    { pattern: 'Modal verbs: modal in position 2, infinitive AT THE END', examples: 'Ich muss heute arbeiten. / Kannst du morgen kommen?' },
    { pattern: 'Perfect: auxiliary in position 2, Partizip II at the end', examples: 'Ich habe Deutsch gelernt. / Wir sind nach Berlin gefahren.' },
    { pattern: 'Separable verbs: prefix flies to the end', examples: 'Ich stehe um sieben auf. (aufstehen = get up)', },
];

// Number quirks.
export const GERMAN_NUMBER_QUIRKS = [
    { pattern: 'einundzwanzig (one-and-twenty)', why: 'units come FIRST: 21 = einundzwanzig, 34 = vierunddreißig — say the ones digit before the tens' },
    { pattern: 'zwanzig → dreißig', why: '30 is dreißig with ß (irregular), all others end -zig: vierzig, fünfzig' },
    { pattern: 'der erste Mai', why: 'dates use ordinals: am ersten Mai — the 1st is "der erste", unlike Spanish' },
    { pattern: 'ein Euro, zwei Euro', why: 'Euro never takes an -s in the plural: das kostet fünf Euro' },
    { pattern: 'Uhr', why: 'time uses Uhr: es ist drei Uhr — and half past is "halb" the NEXT hour: halb drei = 2:30!' },
];

// Goethe strategy card.
export const GOETHE_STRATEGY: { skill: string; color: string; points: string[] }[] = [
    {
        skill: 'Lesen (Reading)', color: 'indigo',
        points: [
            'Match tasks (emails → people) are common: read the profiles FIRST, underline each person\'s condition, eliminate as you go',
            'Wrong options copy exact words from the text with twisted meaning — the right answer paraphrases',
            'Signs/ads/notices: read the category label (Warnung, Angebot, Verbot) before the fine print',
            'Never leave blanks — Goethe has no penalty for guessing',
        ],
    },
    {
        skill: 'Hören (Listening)', color: 'violet',
        points: [
            'Read the questions during the instruction pause — know WHAT to listen for (name, time, price, place)',
            'Announcements and phone messages often hide the key detail mid-sentence: stay on numbers and times',
            'Train with real speed — Goethe audio does not slow down after B1',
            'Answers often come in conversational pairs ("Should we meet at 3? — Better at 4.") — the SECOND answer is usually the answer',
        ],
    },
    {
        skill: 'Schreiben (Writing)', color: 'emerald',
        points: [
            'Every task lists content points — hit ALL of them, they are graded one by one',
            'Respect the register the task names: du for friends, Sie + "Sehr geehrte Damen und Herren" for formal',
            'Noun capitalisation, comma before dass/weil/und-clauses, and case endings are the graded details',
            'Structure: opening line → all content points → closing line (Ich freue mich auf deine Antwort / Mit freundlichen Grüßen)',
        ],
    },
    {
        skill: 'Sprechen (Speaking)', color: 'amber',
        points: [
            'Part 1 is usually introducing yourself with word cards — prepare your 6-sentence self-introduction cold',
            'B1+ is done in PAIRS: you must ASK your partner questions, not just answer — the interaction itself is graded',
            'For picture tasks: describe → speculate (vielleicht, wahrscheinlich) → react',
            'Speak continuously; self-correct fast. Hesitation costs more than small mistakes',
        ],
    },
];

// The master cheat sheet.
export const GERMAN_CHEAT_SHEET: { title: string; items: { label: string; detail: string; say?: string }[] }[] = [
    {
        title: 'Gender — learn the noun WITH its article', items: [
            { label: 'der (masculine)', detail: 'der Mann, der Tisch, der Tag — most -en/-er profession words, days/months/seasons', say: 'der Mann' },
            { label: 'die (feminine)', detail: 'die Frau, die Schule — most -ung, -heit, -keit, -schaft, -ion, -tät endings', say: 'die Schule' },
            { label: 'das (neuter)', detail: 'das Kind, das Buch — diminutives -chen and -lein are ALWAYS neuter: das Mädchen (girl!)', say: 'das Kind' },
            { label: 'die (plural)', detail: 'ALL plurals are die — and the plural must be memorised per noun: der Tisch → die Tische', say: 'die Tische' },
            { label: 'der/die/das ≠ gender rules', detail: 'no reliable pattern — memorise "der Tisch", never bare "Tisch"' },
        ],
    },
    {
        title: 'The four cases — the case master table', items: [
            { label: 'Nominativ', detail: 'the subject (who does it): Der Mann liest.' },
            { label: 'Akkusativ', detail: 'the direct object (only masculine visibly changes: der→den): Ich sehe den Mann.', say: 'Ich sehe den Mann' },
            { label: 'Dativ', detail: 'indirect object + after mit/bei/zu/aus/seit: Ich gebe dem Mann das Buch. (to whom)', say: 'Ich gebe dem Mann das Buch' },
            { label: 'Genitiv', detail: 'possession: das Auto des Mannes (written/formal; spoken German uses von + Dativ)' },
            { label: 'the table', detail: 'NOM: der die das die · AKK: den die das die · DAT: dem der dem den · GEN: des der des der' },
        ],
    },
    {
        title: 'Personal pronouns + du/Sie', items: [
            { label: 'ich, du, er/sie/es', detail: 'I, you (informal), he/she/it', say: 'ich, du, er, sie, es' },
            { label: 'wir, ihr, sie, Sie', detail: 'we, you all, they, you-formal (capitalised!)' },
            { label: 'case forms', detail: 'Akkusativ: mich dich ihn sie es uns euch sie · Dativ: mir dir ihm ihr ihm uns euch ihnen' },
            { label: 'du vs Sie', detail: 'du = friends/family; Sie = strangers/formal — the verb changes: du kommst / Sie kommen' },
        ],
    },
    {
        title: 'Word order — the three positions', items: [
            { label: 'verb position 2 (main clause)', detail: 'Heute lerne ich Deutsch. — something else first? verb STAYS second, subject moves', say: 'Heute lerne ich Deutsch' },
            { label: 'verb position 1 (yes/no question)', detail: 'Lernst du Deutsch? Kommst du mit?' },
            { label: 'verb-final (subordinate)', detail: '…, dass ich Deutsch lerne. — weil, dass, wenn, ob, obwohl all push it back', say: 'Ich weiß, dass er heute kommt' },
            { label: 'sentence brackets', detail: 'modal + infinitive / haben + Partizip: Ich muss heute arbeiten. — the two verbs WRAP the middle' },
            { label: 'time-manner-place', detail: 'order of adverbials: Ich fahre morgen mit dem Zug nach Berlin (when-how-where)' },
        ],
    },
    {
        title: 'Core verbs', items: [
            { label: 'sein (to be)', detail: 'ich bin, du bist, er ist, wir sind, ihr seid, sie sind', say: 'ich bin, du bist, er ist' },
            { label: 'haben (to have)', detail: 'ich habe, du hast, er hat — and the main perfect-tense auxiliary', say: 'ich habe' },
            { label: 'werden', detail: 'become AND future auxiliary: ich werde… lernen' },
            { label: 'irregular you-forms', detail: 'du isst (essen), du nimmst (nehmen), du liest (lesen), du sprichst (sprechen)' },
            { label: 'wissen vs kennen', detail: 'wissen = know a fact (Ich weiß es) / kennen = know a person/place (Ich kenne ihn)' },
        ],
    },
    {
        title: 'Modal verbs — the sentence brackets', items: [
            { label: 'können', detail: 'can — Ich kann gut schwimmen.', say: 'Ich kann gut schwimmen' },
            { label: 'müssen', detail: 'must — Ich muss heute arbeiten.' },
            { label: 'wollen / möchten', detail: 'want to (strong) / would like (polite): Ich möchte einen Kaffee.' },
            { label: 'sollen / dürfen', detail: 'should (supposed to) / may-be allowed: Hier darf man nicht rauchen.' },
            { label: 'the rule', detail: 'modal in position 2, bare infinitive AT THE END — the sentence bracket' },
        ],
    },
    {
        title: 'Tense map — what Germans actually use', items: [
            { label: 'Präsens', detail: 'present (also near future): Ich lerne Deutsch.' },
            { label: 'Perfekt', detail: 'THE conversational past: Ich habe Deutsch gelernt. — haben/sein + Partizip II at the end', say: 'Ich habe Deutsch gelernt' },
            { label: 'Präteritum', detail: 'written/narrative past — but sein/haben/modals USE it in speech: ich war, ich hatte, ich konnte, ich musste' },
            { label: 'Plusquamperfekt', detail: 'had done: Ich hatte Deutsch gelernt.' },
            { label: 'Futur I', detail: 'will: Ich werde Deutsch lernen. — but spoken future is usually Präsens + time word (Morgen komme ich)' },
            { label: 'sein vs haben in Perfekt', detail: 'motion/change of state → sein (gehen, fahren, werden, bleiben); everything else → haben' },
        ],
    },
    {
        title: 'Negation — nicht vs kein', items: [
            { label: 'kein', detail: 'negates NOUNS (with ein-words): Ich habe kein Auto. Ich trinke keinen Kaffee (Akkusativ!).', say: 'Ich habe kein Auto' },
            { label: 'nicht', detail: 'negates verbs/adjectives/positions — placement matters: Ich komme nicht heute (but tomorrow). / Ich komme heute nicht (at all).' },
            { label: 'nie / nichts / niemand', detail: 'never / nothing / nobody — niemand + Dativ: Mit niemandem.' },
        ],
    },
    {
        title: 'Question words', items: [
            { label: 'wer / was', detail: 'who / what — Wer ist das?', say: 'Wer ist das?' },
            { label: 'wo / wohin / woher', detail: 'where (at) / where TO / where FROM — the motion matters: Woher kommst du?' },
            { label: 'wann / warum / wie', detail: 'when / why / how — Warum lernst du Deutsch?' },
            { label: 'welcher/welche/welches', detail: 'which — changes with gender/case like der-words' },
            { label: 'wie viel / wie viele', detail: 'how much / how many' },
        ],
    },
    {
        title: 'Prepositions by case — memorise the group', items: [
            { label: 'always Akkusativ', detail: 'durch, für, gegen, ohne, um — ohne mich, für dich' },
            { label: 'always Dativ', detail: 'mit, bei, nach, aus, zu, von, seit — mit dem Auto, zu Hause', say: 'mit dem Auto' },
            { label: 'two-way (location→Dativ, movement→Akk)', detail: 'in, an, auf, unter, über, vor, hinter, neben, zwischen: Ich bin in der Stadt (D) / Ich gehe in die Stadt (A)' },
            { label: 'the test', detail: 'WHERE at? → Dativ. WHERE TO? → Akkusativ: Ich hänge das Bild an die Wand (to) / Das Bild hängt an der Wand (at)' },
        ],
    },
    {
        title: 'Two-way prepositions in action', items: [
            { label: 'in', detail: 'in (at) / into: Ich bin in dem Haus / Ich gehe in das (ins) Haus', say: 'Ich gehe ins Haus' },
            { label: 'auf', detail: 'on (at) / onto: Das Buch liegt auf dem Tisch / Ich lege es auf den Tisch' },
            { label: 'an', detail: 'at/on (vertical, edge) / onto: an der Wand / an die Wand' },
            { label: 'movement verbs tell you', detail: 'gehen/fahren/legen/stellen/hängen(?) → Akkusativ; sein/liegen/stehen/bleiben → Dativ' },
        ],
    },
    {
        title: 'Separable verbs — the flying prefix', items: [
            { label: 'aufstehen', detail: 'Ich stehe um sieben auf. — prefix to the END of the main clause', say: 'Ich stehe um sieben auf' },
            { label: 'einkaufen / mitkommen', detail: 'Ich kaufe ein. Kommst du mit?' },
            { label: 'but NOT in subordinate clauses', detail: '…, weil ich früh aufstehe. (reunited at the end)' },
            { label: 'and NOT with modals', detail: 'Ich muss früh aufstehen. (bare infinitive stays whole)' },
            { label: 'Perfekt', detail: 'Ich bin früh aufgestanden. (ge- goes INSIDE: auf·ge·standen)' },
        ],
    },
    {
        title: 'Konjunktiv II — wishes and would', items: [
            { label: 'würde + infinitive', detail: 'Ich würde Deutsch lernen. = I would learn German', say: 'Ich würde Deutsch lernen' },
            { label: 'sein/haben special forms', detail: 'ich wäre (would be), ich hätte (would have) — NOT "würde sein/haben"' },
            { label: 'could/should/would', detail: 'könnte, sollte, würde — Ich könnte kommen, aber ich müsste arbeiten.' },
            { label: 'the conditional pattern', detail: 'Wenn ich mehr Zeit hätte, würde ich mehr lernen. (hätte → würde…)' },
            { label: 'politeness', detail: 'Könnten Sie mir helfen? / Ich hätte gern… — would-questions are the polite standard' },
        ],
    },
    {
        title: 'Adjective endings — the A2/B1 milestone', items: [
            { label: 'after der-words', detail: '-e or -en: der gute Mann, den guten Mann, die guten Männer' },
            { label: 'after ein-words', detail: 'masculine nominative/ neuter nominative-akkusative show the gender: ein guter Mann, ein gutes Kind (but: einen guten Mann)' },
            { label: 'no article', detail: 'full der-endings: guter Wein, gutes Wetter' },
            { label: 'Dativ plural always -en', detail: 'mit guten Freunden — the one ending you can always trust' },
        ],
    },
    {
        title: 'da-words — pointing at ideas', items: [
            { label: 'darauf / daran', detail: 'on it / about it: Ich freue mich darauf (on the trip)' },
            { label: 'damit / davon', detail: 'with it / of it: Damit kann ich leben.' },
            { label: 'dafür / dagegen', detail: 'for it / against it: Ich bin dagegen.' },
            { label: 'wo-questions', detail: 'Worauf wartest du? Womit schreibst du? — the question form of the same idea' },
            { label: 'why they exist', detail: 'German can\'t say "about it" with a bare pronoun for things — da + preposition replaces it' },
        ],
    },
    {
        title: 'Infinitive constructions — zu and its friends', items: [
            { label: 'zu + infinitive', detail: 'Es ist wichtig, früh zu schlafen. — zu goes INSIDE separable verbs: aufzuhören, einzukaufen' },
            { label: 'um … zu', detail: 'in order to: Ich lerne Deutsch, um in Berlin zu studieren. (different subject? → damit-clause)', say: 'Ich lerne Deutsch, um in Berlin zu studieren' },
            { label: 'ohne … zu', detail: 'without: Er ging, ohne ein Wort zu sagen.' },
            { label: 'statt … zu', detail: 'instead of: Statt zu arbeiten, spielt er.' },
            { label: 'verb pairs that take zu', detail: 'versprechen, vergessen, versuchen, planen, anfangen, aufhören + zu…; but modal-ish verbs (möchte, können…) take the bare infinitive' },
        ],
    },
    {
        title: 'Redemittel — Goethe exam phrase kit', items: [
            { label: 'starting a presentation', detail: 'Ich möchte über das Thema … sprechen. / Zuerst möchte ich sagen, dass…', say: 'Ich möchte über das Thema sprechen' },
            { label: 'structuring', detail: 'einerseits … andererseits / zunächst, dann, zum Schluss / Ein Beispiel dafür ist…' },
            { label: 'giving opinions', detail: 'Ich bin der Meinung, dass… / Meiner Ansicht nach… / Ich finde, man sollte…' },
            { label: 'agreeing / disagreeing', detail: 'Da stimme ich dir/Ihnen zu. / Da bin ich (leider) anderer Meinung, weil…' },
            { label: 'conceding', detail: 'Es stimmt, dass…, aber… / Das ist ein guter Punkt, trotzdem…' },
            { label: 'speculating', detail: 'vielleicht, wahrscheinlich, es könnte sein, dass…' },
            { label: 'closing', detail: 'Zusammenfassend kann man sagen, dass… / Ich freue mich auf eure/Ihre Fragen.' },
        ],
    },
    {
        title: 'The BIG distinctions (exam favourites)', items: [
            { label: 'wissen vs kennen', detail: 'know a fact vs know a person/place' },
            { label: 'nicht vs kein', detail: 'negating verbs vs negating nouns' },
            { label: 'sein vs haben (Perfekt)', detail: 'motion/change vs everything else: ich bin gegangen / ich habe gemacht' },
            { label: 'in vs zu vs nach', detail: 'in + inside places with articles / zu + people & businesses / nach + cities & countries (no article)' },
            { label: 'wohin vs wo', detail: 'direction vs location — the two-way preposition trigger' },
            { label: 'möchten vs wollen', detail: 'polite wish vs blunt want — use möchten with strangers' },
            { label: 'als vs wie', detail: 'comparisons: bigger THAN = als (gleich/so… wie for equality)' },
            { label: ' wann vs wenn', detail: 'wann = when? (question) / wenn = if, whenever, when (clause)' },
        ],
    },
];
