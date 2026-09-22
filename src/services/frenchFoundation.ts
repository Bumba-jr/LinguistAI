// French Foundations — the static reference course for the TCF portal.
// French has NO characters: it uses the Latin alphabet + accents. Its "pinyin
// equivalent" is the sound system: silent letters, liaison, nasal vowels, gender,
// conjugation. Everything here is the mirror of the Chinese foundation course.

export const FRENCH_WRITING_FACTS = {
    intro: 'French does NOT have characters — it writes with the same 26-letter Latin alphabet as English, plus accented letters (é, è, ê, ç…). So learning to READ and TYPE French is easy from day one. What French spends its difficulty budget on instead: sounds that are spelled nothing like they look (silent letters, liaison), every noun having a gender, and verbs that change with every person.',
    parallel: 'Your Chinese portal taught 汉字 — pinyin — English. French needs only TWO forms: French — English. The "third form" that replaces pinyin is SOUND: you must learn how letter combinations sound (eau = "oh", ai = "eh", ill = "ee-y"), because spelling will not tell you.',
    example: { fr: 'Je vais au marché.', en: 'I go to the market — all 15 letters, but only ~9 sounds: [ʒə vɛ o maʁʃe]', say: 'Je vais au marché' },
    canadaNote: 'Canada uses the same alphabet and spelling as France. Canadian French differs mostly in ACCENT and some vocabulary (magasiner = to shop, dépanneur = corner store) — [Canada] notes in lessons flag these.',
};

// The alphabet with French letter NAMES — the first thing an examiner may ask
export const FRENCH_ALPHABET: { letter: string; name: string; note?: string }[] = [
    { letter: 'A', name: 'ah' },
    { letter: 'B', name: 'bay' },
    { letter: 'C', name: 'say' },
    { letter: 'D', name: 'day' },
    { letter: 'E', name: 'uh', note: 'the trickiest letter — often silent at word ends' },
    { letter: 'F', name: 'eff' },
    { letter: 'G', name: 'zhay', note: 'NOT "jee" — like the s in "measure"' },
    { letter: 'H', name: 'ahsh', note: 'ALWAYS silent in words' },
    { letter: 'I', name: 'ee' },
    { letter: 'J', name: 'zhee', note: 'NOT "jay"' },
    { letter: 'K', name: 'kah', note: 'rare — mostly in borrowed words' },
    { letter: 'L', name: 'ell' },
    { letter: 'M', name: 'emm' },
    { letter: 'N', name: 'enn' },
    { letter: 'O', name: 'oh' },
    { letter: 'P', name: 'pay' },
    { letter: 'Q', name: 'koo', note: 'almost always "qu" = [k]' },
    { letter: 'R', name: 'air', note: 'guttural — back of the throat, never English r' },
    { letter: 'S', name: 'ess' },
    { letter: 'T', name: 'tay' },
    { letter: 'U', name: 'oo (rounded)', note: 'say "ee" with rounded lips — NOT English "you"' },
    { letter: 'V', name: 'vay' },
    { letter: 'W', name: 'double-vay', note: 'rare — mostly borrowed words' },
    { letter: 'X', name: 'eeks' },
    { letter: 'Y', name: 'ee-grek', note: 'i-grec — "Greek i"' },
    { letter: 'Z', name: 'zed' },
];

// Accented letters — what each is called and what it does
export const FRENCH_ACCENTS = [
    { letter: 'é', name: 'e accent aigu (acute)', does: 'always "ay" — café, école, résumé', sample: 'éclair' },
    { letter: 'è', name: 'e accent grave', does: 'open "eh" — père, très, mère', sample: 'très' },
    { letter: 'ê', name: 'e circumflex', does: 'open "eh" — usually a silent S used to follow in English: forêt → forest, hôpital → hospital', sample: 'forêt' },
    { letter: 'ë / ï', name: 'tréma', does: 'SAYS the vowel separately — Noël = no-EL, naïve = na-EEV', sample: 'Noël' },
    { letter: 'ç', name: 'c cédille', does: 'makes c soft before a/o/u — français, garçon (otherwise c is hard)', sample: 'garçon' },
    { letter: 'à / ù', name: 'grave on a / u', does: 'only to separate meanings — a (has) vs à (to); ou (or) vs où (where)', sample: 'où' },
    { letter: 'â / î / ô / û', name: 'circumflex on a/i/o/u', does: 'slightly longer vowels — mostly a spelling history marker (hôtel, île, août)', sample: 'île' },
    { letter: 'œ', name: 'e in the o (ligature)', does: '"uh" sound — cœur (heart), sœur (sister), œuvre (work)', sample: 'cœur' },
];

// Words where the accent CHANGES THE MEANING — classic exam traps
export const ACCENT_MEANING_TRAPS = [
    { a: { w: 'a', en: 'has (il a = he has)' }, b: { w: 'à', en: 'to / at' } },
    { a: { w: 'ou', en: 'or' }, b: { w: 'où', en: 'where' } },
    { a: { w: 'la', en: 'the / her' }, b: { w: 'là', en: 'there' } },
    { a: { w: 'sur', en: 'on' }, b: { w: 'sûr', en: 'sure' } },
    { a: { w: 'du', en: 'of the / some' }, b: { w: 'dû', en: 'owed (past of devoir)' } },
    { a: { w: 'mur', en: 'wall' }, b: { w: 'mûr', en: 'ripe' } },
];

// French sounds English ears must train — the mirror of the Chinese tone table
export const FRENCH_SOUND_GROUPS: { group: string; note: string; sounds: { sound: string; english: string; mouth: string; sample: { w: string; ipa: string; en: string } }[] }[] = [
    {
        group: 'The nasal vowels', note: 'Air through the nose, vowel at the back, FINAL CONSONANT SILENT. THE signature French sound.',
        sounds: [
            { sound: 'an / en / em', english: '"ahng" said through the nose — no n ending', mouth: 'Open like "ah", lower the soft palate, let air hum in the nose. Mouth stays open — do not close to an n.', sample: { w: 'enfant', ipa: '[ah-FAHN]', en: 'child' } },
            { sound: 'on / om', english: '"ohng" through the nose', mouth: 'Round the lips like "oh", hum through the nose.', sample: { w: 'bonbon', ipa: '[bohn-BOHN]', en: 'candy' } },
            { sound: 'in / ain / ein / un', english: '"ang" (like "sang" without the g) through the nose', mouth: 'Say "eh" then nasalise. Modern French merges un into this sound.', sample: { w: 'vin', ipa: '[vang]', en: 'wine' } },
        ],
    },
    {
        group: 'The famous French R', note: 'Never the English r. It lives at the BACK of the mouth.',
        sounds: [
            { sound: 'r', english: 'a soft throat gurgle — like clearing a gentle "k"', mouth: 'Back of the tongue rises near the soft palate (where you make k), but let air friction instead of a stop. Practise: ka → kra → ra.', sample: { w: 'rouge', ipa: '[roozh]', en: 'red' } },
        ],
    },
    {
        group: 'U vs OU — the classic confusion', note: 'Two different vowels that English merges.',
        sounds: [
            { sound: 'u', english: 'say "ee" but with LIPS ROUNDED as for "oo"', mouth: 'Hold "ee", push the lips forward tight. French u = German ü.', sample: { w: 'rue', ipa: '[rü]', en: 'street' } },
            { sound: 'ou', english: 'plain English "oo" in "food"', mouth: 'Relaxed rounding, tongue back.', sample: { w: 'roue', ipa: '[roo]', en: 'wheel' } },
            { sound: 'the pair', english: 'dessus (above) vs dessous (below); rue (street) vs roue (wheel) — get this wrong and you say the other word', mouth: 'Alternate them: ü — oo — ü — oo.', sample: { w: 'dessus / dessous', ipa: '[də-SÜ] / [də-SOO]', en: 'above / below' } },
        ],
    },
    {
        group: 'Other French-only sounds', note: 'The ones English spelling gives no hint about.',
        sounds: [
            { sound: 'eu / œu', english: 'between "uh" and "er" — lips tight and forward', mouth: 'Say "eh" then round the lips hard (like German ö).', sample: { w: 'deux', ipa: '[duh]', en: 'two' } },
            { sound: 'gn', english: 'like "ny" in "canyon"', mouth: 'Tongue flat, middle raised — same as Italian gn.', sample: { w: 'montagne', ipa: '[mohn-TA-nyə]', en: 'mountain' } },
            { sound: 'ill', english: 'usually "ee-y" — a y-glide, NOT "ill"', mouth: 'Say "ee" and slide into the next vowel.', sample: { w: 'famille', ipa: '[fa-MEE-yə]', en: 'family' } },
            { sound: 'eille / ouille', english: '"eh-y" / "oo-y" — full y-glide endings', mouth: 'Vowel + quick y-slide.', sample: { w: 'bouteille', ipa: '[boo-TEH-yə]', en: 'bottle' } },
        ],
    },
];

// Spelling-to-sound rules — the "pinyin rules" of French
export const FRENCH_PRONUNCIATION_RULES = [
    { rule: 'Final consonants are usually SILENT', detail: 'petit, Paris, chaud — the last letter hides. Exceptions: consonants in CaReFuL (C, R, F, L) are pronounced: avec, bonjour, chef, hôtel.', example: { w: 'petit', spoken: '[puh-TEE]', en: 'small — the final t is silent' } },
    { rule: 'Liaison — a silent final consonant comes BACK before a vowel', detail: 'les amis = [lay-ZA-mee], vous avez = [voo-ZA-vay]. Required after short common words (les, des, vos, on, nous, vous, il/ils, est). This is why written and spoken French seem like different languages.', example: { w: 'les‿amis', spoken: '[lay-ZA-mee]', en: 'the friends — the s you never see becomes a z' } },
    { rule: 'Elision — vowels collide and drop', detail: 'je + aime = j\'aime, le + hôtel = l\'hôtel, la + école = l\'école, que + il = qu\'il. One-word vowels (je, me, te, se, le, la, ne, de, que) drop before a vowel.', example: { w: 'j\'aime', spoken: '[ZHEM]', en: 'I like — the e of je is gone' } },
    { rule: 'H is ALWAYS silent — but two kinds', detail: 'h muet: elision + liaison happen (l\'hôtel, les‿hôpitaux). h aspiré: elision blocked (le héros, NOT l\'héros). You must memorise the handful of h aspiré words.', example: { w: 'le héros', spoken: '[luh ay-ROHS]', en: 'the hero — no elision!' } },
    { rule: '-ent at the end of VERBS is silent', detail: 'ils parlent = [il PARL] — exactly like il parle. (But -ent in other words IS pronounced: présent, vent.)', example: { w: 'ils parlent', spoken: '[eel PARL]', en: 'they speak — three extra letters, zero extra sound' } },
    { rule: 'The silent E runs the rhythm', detail: 'A final e (often -es, -ent around it) is not said, BUT it makes the consonant before it audible: parlE vs parl. French rhythm = syllables you can count with your chin.', example: { w: 'petite', spoken: '[puh-TEET]', en: 'small (f) — the t exists because of the e' } },
    { rule: 'Double letters sound single', detail: 'elle, adresse, belle — ll = one l, tt = one t. French doubles letters for spelling, never for sound (except ss between vowels keeps the s sharp).', example: { w: 'elle', spoken: '[EL]', en: 'she' } },
];

// Tu vs Vous — the register system TCF examiners listen for
export const TU_VOUS = [
    { form: 'tu', when: 'friends, family, children, classmates, pets — one person you know well', verb: 'parle, vas, es, as', example: 'Tu vas bien ?' },
    { form: 'vous', when: 'strangers, older people, officials, work — AND always plural, even for friends', verb: 'parlez, allez, êtes, avez', example: 'Comment allez-vous ?' },
    { form: 'exam rule', when: 'In TCF writing/speaking, use VOUS with the examiner unless told otherwise — "tu-ing" an examiner costs register points', verb: '', example: 'Bonjour Monsieur, comment allez-vous ?' },
];

// Numbers 70-99 — the famous French arithmetic
export const NUMBER_QUIRKS = [
    { n: '70', fr: 'soixante-dix', logic: '60 + 10 — "sixty-ten"', say: 'soixante-dix' },
    { n: '75', fr: 'soixante-quinze', logic: '60 + 15', say: 'soixante-quinze' },
    { n: '80', fr: 'quatre-vingts', logic: '4 × 20 — "four twenties"', say: 'quatre-vingts' },
    { n: '85', fr: 'quatre-vingt-cinq', logic: '4×20 + 5', say: 'quatre-vingt-cinq' },
    { n: '90', fr: 'quatre-vingt-dix', logic: '4×20 + 10 — "four-twenty-ten"', say: 'quatre-vingt-dix' },
    { n: '99', fr: 'quatre-vingt-dix-neuf', logic: '4×20 + 10 + 9', say: 'quatre-vingt-dix-neuf' },
];

// ── The French Cheat Sheet — one page of the whole language ─────────────────
export const FRENCH_CHEAT_SHEET: { title: string; items: { label: string; detail: string; say?: string }[] }[] = [
    { title: 'Articles', items: [
        { label: 'le / la / l\' / les', detail: 'the — masculine / feminine / before vowel / plural' },
        { label: 'un / une / des', detail: 'a, some' },
        { label: 'du / de la / de l\'', detail: 'some (uncountable) — du pain, de la viande' },
        { label: 'au / aux', detail: 'à + le = au, à + les = aux — je vais au marché' },
        { label: 'du / des', detail: 'de + le = du, de + les = des — le livre du prof' },
    ]},
    { title: 'Gender quick tips', items: [
        { label: 'usually feminine', detail: '-tion, -sion, -té, -ure, -ette, -ance/-ence — la nation, la santé' },
        { label: 'usually masculine', detail: '-age, -ment, -eau, -isme, days/months/languages — le fromage, le gouvernement' },
        { label: 'agreement', detail: 'adjectives add -e (f), -s (pl): petit → petite → petits → petites' },
        { label: 'learn the article', detail: 'always memorise nouns WITH le/la — the gender is part of the word' },
    ]},
    { title: 'Present tense patterns', items: [
        { label: '-ER (parler)', detail: 'parle, parles, parle, parlons, parlez, parlent — 4 of the 6 sound the same' },
        { label: '-IR (finir)', detail: 'finis, finis, finit, finissons, finissez, finissent' },
        { label: '-RE (vendre)', detail: 'vends, vends, vend, vendons, vendez, vendent' },
        { label: 'être (to be)', detail: 'suis, es, est, sommes, êtes, sont' },
        { label: 'avoir (to have)', detail: 'ai, as, a, avons, avez, ont' },
        { label: 'aller (to go)', detail: 'vais, vas, va, allons, allez, vont' },
        { label: 'faire (to do)', detail: 'fais, fais, fait, faisons, faites, font' },
    ]},
    { title: 'Past & future', items: [
        { label: 'passé composé', detail: 'avoir + past participle: j\'ai mangé' },
        { label: 'être verbs', detail: 'movement/reflexive verbs use être + agreement: je suis allé(e), elle est partie' },
        { label: 'imparfait', detail: 'ongoing/habitual past: -ais, -ais, -ait, -ions, -iez, -aient' },
        { label: 'near future', detail: 'aller + infinitive: je vais partir — I am going to leave' },
        { label: 'future simple', detail: 'infinitive + ai, as, a, ons, ez, ont: je parlerai' },
        { label: 'conditional', detail: 'infinitive + imparfait endings: je voudrais, j\'aimerais' },
    ]},
    { title: 'Questions', items: [
        { label: 'est-ce que', detail: 'statement + est-ce que — Est-ce que tu parles français ?' },
        { label: 'inversion', detail: 'Parlez-vous français ? — formal/exam register' },
        { label: 'qui / que', detail: 'who / what' },
        { label: 'où / quand', detail: 'where / when' },
        { label: 'comment / pourquoi', detail: 'how / why' },
        { label: 'combien', detail: 'how many / how much' },
        { label: 'quel / quelle', detail: 'which / what — Quelle heure est-il ?' },
    ]},
    { title: 'Negation', items: [
        { label: 'ne … pas', detail: 'Je ne parle pas anglais.' },
        { label: 'ne … jamais', detail: 'never — Il ne fume jamais.' },
        { label: 'ne … plus', detail: 'no longer — Je ne travaille plus ici.' },
        { label: 'ne … rien', detail: 'nothing — Je ne vois rien.' },
        { label: 'spoken French', detail: 'the ne often drops: "Je sais pas" — but KEEP it in the exam' },
    ]},
    { title: 'Connectors', items: [
        { label: 'et / ou / mais', detail: 'and / or / but' },
        { label: 'parce que / car', detail: 'because' },
        { label: 'donc / alors', detail: 'so / then' },
        { label: 'si', detail: 'if — AND "yes (contradicting)": "Tu ne viens pas ? — Si !"' },
        { label: 'd\'abord / ensuite / enfin', detail: 'first / then / finally — exam answer structure' },
        { label: 'il y a', detail: 'there is / there are — Il y a un problème.' },
    ]},
    { title: 'Numbers', items: [
        { label: '0–10', detail: 'zéro, un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix' },
        { label: '11–16', detail: 'onze, douze, treize, quatorze, quinze, seize — then 17 = dix-sept' },
        { label: '70 / 80 / 90', detail: 'soixante-dix (60+10), quatre-vingts (4×20), quatre-vingt-dix (4×20+10)' },
        { label: '100 / 1000', detail: 'cent, mille — 200 = deux cents' },
        { label: 'Canada tip', detail: 'Belgium/Switzerland say septante (70), nonante (90) — France does not', say: 'quatre-vingt-dix' },
    ]},
    { title: 'Survival phrases', items: [
        { label: 'Bonjour / Bonsoir', detail: 'hello (day) / good evening', say: 'Bonjour' },
        { label: 'Merci beaucoup', detail: 'thank you very much', say: 'Merci beaucoup' },
        { label: 'Excusez-moi / Pardon', detail: 'excuse me / sorry', say: 'Excusez-moi' },
        { label: 'Je ne comprends pas', detail: 'I don\'t understand', say: 'Je ne comprends pas' },
        { label: 'Pouvez-vous répéter ?', detail: 'can you repeat? (vous — exam register)', say: 'Pouvez-vous répéter' },
        { label: 'Combien ça coûte ?', detail: 'how much does it cost?', say: 'Combien ça coûte' },
        { label: 'Où sont les toilettes ?', detail: 'where is the bathroom?', say: 'Où sont les toilettes' },
        { label: 'Je voudrais…', detail: 'I would like… (polite)', say: 'Je voudrais un café' },
        { label: 'S\'il vous plaît', detail: 'please (vous)', say: 'S\'il vous plaît' },
        { label: 'Enchanté(e)', detail: 'nice to meet you', say: 'Enchanté' },
    ]},
];
