import type { VerbTableBlock, UseCaseBlock, ShadowingBlock, WarmupItem } from './frenchLessons';

// ── Lecture extras — the missing pieces of the gold-standard format ─────────
// Part 0 warm-up (retrieval from the previous lesson), full conjugation tables
// with pronunciation rendered in the lesson body, "one word, every job"
// use-case tables, and Homework Section E (pronunciation & shadowing drill).
// Keyed by `${level}:${slug}` and merged onto STATIC_FRENCH_LESSONS at load.

interface LessonExtras {
    warmup?: WarmupItem[];
    verbTables?: VerbTableBlock[];
    useCases?: UseCaseBlock[];
    shadowing?: ShadowingBlock;
}

// Shared tables reused across lectures
const ETRE_PRESENT = {
    title: 'être (to be) — full present tense',
    note: 'être is irregular everywhere — learn each form as its own word.',
    rows: [
        { label: 'je', form: 'suis', pron: 'süee' },
        { label: 'tu', form: 'es', pron: 'eh' },
        { label: 'il / elle / on', form: 'est', pron: 'eh' },
        { label: 'nous', form: 'sommes', pron: 'som' },
        { label: 'vous', form: 'êtes', pron: 'et' },
        { label: 'ils / elles', form: 'sont', pron: 'sohn' },
    ],
} as VerbTableBlock;

const AVOIR_PRESENT = {
    title: 'avoir (to have) — full present tense',
    note: 'The n drops out before a vowel: j\u2019ai. The ils form keeps the -v-: ils ont (ilz ohn).',
    rows: [
        { label: 'j\u2019', form: 'ai', pron: 'ay' },
        { label: 'tu', form: 'as', pron: 'ah' },
        { label: 'il / elle / on', form: 'a', pron: 'ah' },
        { label: 'nous', form: 'avons', pron: 'ah-vohn' },
        { label: 'vous', form: 'avez', pron: 'ah-vay' },
        { label: 'ils / elles', form: 'ont', pron: 'ohn' },
    ],
} as VerbTableBlock;

const ALLER_PRESENT = {
    title: 'aller (to go) — full present tense',
    note: 'Two stems: va- in the singular, all- in the plural. vous allez — never "vous allez" with -ez. This is the verb of futur proche.',
    rows: [
        { label: 'je', form: 'vais', pron: 'veh' },
        { label: 'tu', form: 'vas', pron: 'vah' },
        { label: 'il / elle / on', form: 'va', pron: 'vah' },
        { label: 'nous', form: 'allons', pron: 'ah-lohn' },
        { label: 'vous', form: 'allez', pron: 'ah-lay' },
        { label: 'ils / elles', form: 'vont', pron: 'vohn' },
    ],
} as VerbTableBlock;

// ── A1 · Greetings & Introductions ───────────────────────────────────────────
const a1Greetings: LessonExtras = {
    warmup: [
        { q: 'What are the THREE ways to ask a question in French? (You met them in the previous lesson.)', a: 'Rising intonation, est-ce que + statement, inversion (verb-subject).' },
        { q: 'How do you make a sentence negative?', a: 'ne + verb + pas: Je parle → Je ne parle pas.' },
        { q: 'What is the nous form of parler?', a: 'nous parlons (par-lOHn).' },
        { q: 'How do you say "What time is it?"', a: 'Quelle heure est-il ?' },
        { q: 'Translate: "I don\u2019t work on Sunday."', a: 'Je ne travaille pas le dimanche.' },
    ],
    verbTables: [
        ETRE_PRESENT,
        AVOIR_PRESENT,
        {
            title: 's\u2019appeler (to be called) — full present tense',
            note: 'A reflexive -e_er verb: the e inside appeler doubles before a mute syllable (je m\u2019appelle, ils s\u2019appellent) but not before -ons/-ez.',
            rows: [
                { label: 'je', form: 'm\u2019appelle', pron: 'mah-pel' },
                { label: 'tu', form: 't\u2019appelles', pron: 'tah-pel' },
                { label: 'il / elle / on', form: 's\u2019appelle', pron: 'sah-pel' },
                { label: 'nous', form: 'nous appelons', pron: 'nah-pay-lohn' },
                { label: 'vous', form: 'vous appelez', pron: 'voo-zah-play' },
                { label: 'ils / elles', form: 's\u2019appellent', pron: 'sah-pel' },
            ],
        },
        {
            title: 'aller (to go) — you need it for "Comment allez-vous ?"',
            rows: ALLER_PRESENT.rows,
        },
    ],
    useCases: [
        {
            word: 'tu vs vous — "you", two words',
            note: 'French splits English "you" into two words, and picking the wrong one is a social error, not a grammar one.',
            uses: [
                { use: 'tu — one person you know well, or a child', examples: [{ fr: 'Salut Marie, comment vas-tu ?', en: 'Hi Marie, how are you?' }] },
                { use: 'vous — one stranger, elder, or official', examples: [{ fr: 'Bonjour Madame, comment allez-vous ?', en: 'Hello ma\u2019am, how are you?' }] },
                { use: 'vous — TWO or more people, always (even friends)', examples: [{ fr: 'Salut les gars, vous allez bien ?', en: 'Hi guys, are you all well?' }] },
                { use: 'on — "we" in real conversation (90% of spoken French)', examples: [{ fr: 'On s\u2019appelle demain ?', en: 'Shall we call each other tomorrow?' }] },
            ],
        },
        {
            word: 'bonjour — one word, many moments',
            uses: [
                { use: 'greeting, morning to ~6pm', examples: [{ fr: 'Bonjour, un café s\u2019il vous plaît.', en: 'Hello, a coffee please.' }] },
                { use: 'greeting, evening', examples: [{ fr: 'Bonsoir, vous avez réservé ?', en: 'Good evening, do you have a reservation?' }] },
                { use: 'answer to a phone call (formal)', examples: [{ fr: 'Allô, bonjour !', en: 'Hello, good day!' }] },
                { use: 'leaving a shop in the morning', examples: [{ fr: 'Merci, bonne journée !', en: 'Thanks, have a good day!' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Read each line OUT LOUD three times: once slow with the pronunciation guide, once at normal speed with the audio button, once from memory matching the rhythm. French is a syllable-timed language — every syllable gets a beat.',
        lines: [
            { fr: 'Bonjour, comment allez-vous ?', pron: 'bohn-ZHOOR kuh-mohn tah-lay VOO', en: 'Hello, how are you? (formal)' },
            { fr: 'Ça va très bien, merci. Et vous ?', pron: 'sah vah treh BYEN mair-see ay VOO', en: 'I\u2019m very well, thanks. And you?' },
            { fr: 'Je m\u2019appelle David. Enchanté !', pron: 'zhuh mah-PEL dah-VEED ahn-shahn-TAY', en: 'My name is David. Nice to meet you!' },
            { fr: 'Vous êtes d\u2019où ?', pron: 'voo-ZET doo', en: 'Where are you from?' },
            { fr: 'Au revoir, à bientôt !', pron: 'oh ruh-VWAHR ah byen-TOH', en: 'Goodbye, see you soon!' },
            { fr: 'Pardon, vous parlez anglais ?', pron: 'pahr-DOHN voo pahrlay ahn-GLEH', en: 'Excuse me, do you speak English?' },
        ],
    },
};

// ── A1 · Numbers, Dates & Time ───────────────────────────────────────────────
const a1Numbers: LessonExtras = {
    warmup: [
        { q: 'How do you greet someone formally after 6pm?', a: 'Bonsoir, comment allez-vous ?' },
        { q: 'What is the difference between tu and vous?', a: 'tu = one person you know well; vous = a stranger, or two or more people.' },
        { q: 'Give the tu form of être.', a: 'tu es (too eh).' },
        { q: 'How do you say your name, two ways?', a: 'Je m\u2019appelle… or Moi, c\u2019est…' },
        { q: 'What does "Enchanté" literally mean?', a: 'Delighted (short for je suis enchanté de vous rencontrer).' },
    ],
    verbTables: [
        AVOIR_PRESENT,
        {
            title: 'être vs avoir — age is the opposite of English',
            note: 'English says "I AM 30"; French says "I HAVE 30 years": j\u2019ai trente ans. Use être for what you ARE: description, profession, nationality.',
            rows: [
                { label: 'age → avoir', form: 'J\u2019ai trente ans.', pron: 'zhay trahnt ahn' },
                { label: 'description → être', form: 'Je suis grand(e).', pron: 'zhuh süee grahn(d)' },
                { label: 'profession → être', form: 'Je suis étudiant.', pron: 'zhuh süee zay-tü-dyahn' },
                { label: 'feeling → être', form: 'Je suis fatigué(e).', pron: 'zhuh süee fah-tee-GAY' },
            ],
        },
        {
            title: 'finir (to finish) — the -ir model, present',
            note: 'Numbers of minutes/hours ride on these forms: "The film finishes at 9." Le film finit à neuf heures.',
            rows: [
                { label: 'je', form: 'finis', pron: 'fee-nee' },
                { label: 'tu', form: 'finis', pron: 'fee-nee' },
                { label: 'il / elle / on', form: 'finit', pron: 'fee-nee' },
                { label: 'nous', form: 'finissons', pron: 'fee-nee-sohn' },
                { label: 'vous', form: 'finissez', pron: 'fee-nee-say' },
                { label: 'ils / elles', form: 'finissent', pron: 'fee-nees' },
            ],
        },
    ],
    useCases: [
        {
            word: 'à — time, dates, and "at"',
            note: 'à does three separate jobs with time. Each use has its own translation in English — do not map one English "at" onto all of them.',
            uses: [
                { use: 'clock time — at (3 o\u2019clock)', examples: [{ fr: 'Le train part à trois heures.', en: 'The train leaves at three.' }, { fr: 'Rendez-vous à midi.', en: 'Meeting at noon.' }] },
                { use: 'dates — on (March 8)', examples: [{ fr: 'Le concert est le huit mars.', en: 'The concert is on March 8th.' }, { fr: 'à Noël / à Pâques', en: 'at Christmas / Easter (holidays only)' }] },
                { use: 'recurring future — see you on Monday', examples: [{ fr: 'À lundi ! À demain ! À bientôt !', en: 'See you Monday! Tomorrow! Soon!' }] },
                { use: 'age range / per', examples: [{ fr: 'une réunion d\u2019une heure, deux fois par semaine', en: 'a one-hour meeting, twice a week' }] },
            ],
        },
        {
            word: 'le vs lundi — "on Monday" vs "Mondays"',
            note: 'The article changes the meaning completely.',
            uses: [
                { use: 'le lundi — every Monday (habit)', examples: [{ fr: 'Je travaille le samedi.', en: 'I work on Saturdays (every Saturday).' }] },
                { use: 'lundi — this coming Monday (one time)', examples: [{ fr: 'Je travaille samedi.', en: 'I\u2019m working this Saturday.' }] },
                { use: 'ce samedi — this Saturday (specific)', examples: [{ fr: 'On se voit ce samedi ?', en: 'See you this Saturday?' }] },
            ],
        },
        {
            word: 'il est vs il y a — telling time',
            uses: [
                { use: 'exact time — il est + heure(s)', examples: [{ fr: 'Quelle heure est-il ? — Il est huit heures et quart.', en: 'What time is it? — It\u2019s quarter past eight.' }] },
                { use: 'existence — il y a (there is/are)', examples: [{ fr: 'Il y a un train à dix heures.', en: 'There\u2019s a train at ten.' }] },
                { use: 'duration — il y a + time = ago', examples: [{ fr: 'Il est arrivé il y a deux heures.', en: 'He arrived two hours ago.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Numbers are the sound French examiners test first. Read each line aloud three times; the liaison in "sept heures" (set-TUHR) and "six heures" (see-ZUHR) must be automatic.',
        lines: [
            { fr: 'Il est sept heures et demie.', pron: 'eel eh SET tuhr ay duh-MEE', en: 'It\u2019s half past seven.' },
            { fr: 'Le train part à huit heures moins le quart.', pron: 'luh trehn pahr ah WEET tuhr mwan luh KAHR', en: 'The train leaves at quarter to eight.' },
            { fr: 'J\u2019ai trente-deux ans.', pron: 'zhay trahnt-DEUZ ahn', en: 'I\u2019m thirty-two years old.' },
            { fr: 'On se voit à midi, d\u2019accord ?', pron: 'ohn suh VWAH ah mee-DEE dah-kor', en: 'See you at noon, okay?' },
            { fr: 'Je travaille le lundi et le mercredi.', pron: 'zhuh trah-VAY luh luhn-DEE ay luh mehr-kruh-DEE', en: 'I work on Mondays and Wednesdays.' },
            { fr: 'Mon anniversaire est le trois mai.', pron: 'mohn ah-nee-vair-SAIRE eh luh trwah MEH', en: 'My birthday is on May 3rd.' },
        ],
    },
};

// ── A1 · Family & People ─────────────────────────────────────────────────────
const a1Family: LessonExtras = {
    warmup: [
        { q: 'Say your age in French.', a: 'J\u2019ai … ans.' },
        { q: 'What is the difference between "le samedi" and "samedi"?', a: 'le samedi = every Saturday (habit); samedi = this Saturday (one time).' },
        { q: 'How do you say "quarter to eight"?', a: 'huit heures moins le quart.' },
        { q: 'What are the four seasons?', a: 'le printemps, l\u2019été, l\u2019automne, l\u2019hiver.' },
        { q: 'Translate: "The concert is on March 8th."', a: 'Le concert est le huit mars.' },
    ],
    verbTables: [
        AVOIR_PRESENT,
        ETRE_PRESENT,
        {
            title: 'habiter (to live) — a regular -er verb, present',
            note: 'The -er ending has FOUR different spellings but only TWO sounds: è/é (mute e) for je/tu/il/elles, -ons/-ez for nous/vous. C\u2019est la règle d\u2019or of -er verbs.',
            rows: [
                { label: 'j\u2019', form: 'habite', pron: 'ah-BEET' },
                { label: 'tu', form: 'habites', pron: 'ah-BEET' },
                { label: 'il / elle / on', form: 'habite', pron: 'ah-BEET' },
                { label: 'nous', form: 'habitons', pron: 'ah-bee-TOHN' },
                { label: 'vous', form: 'habitez', pron: 'ah-bee-TAY' },
                { label: 'ils / elles', form: 'habitent', pron: 'ah-BEET' },
            ],
        },
    ],
    useCases: [
        {
            word: 'de — possession, quantity, origin',
            note: 'de is the busiest little word in French. In this lesson it marks who something belongs to.',
            uses: [
                { use: 'possession — X\u2019s (reversed: the book of Paul)', examples: [{ fr: 'la voiture de mon père', en: 'my father\u2019s car' }, { fr: 'les amis de Marie', en: 'Marie\u2019s friends' }] },
                { use: 'from — origin of a person', examples: [{ fr: 'Elle vient de Lyon.', en: 'She comes from Lyon.' }] },
                { use: 'of — quantity', examples: [{ fr: 'une tasse de café', en: 'a cup of coffee' }] },
            ],
        },
        {
            word: 'mon, ma, mes — my, changing with the THING owned',
            note: 'The possessive agrees with the OBJECT, not the owner. A father says mon fils AND ma fille — because fille is feminine, not because the father is.',
            uses: [
                { use: 'mon — masculine singular thing', examples: [{ fr: 'mon frère, mon père, mon chien', en: 'my brother, my father, my dog' }] },
                { use: 'ma — feminine singular thing', examples: [{ fr: 'ma sœur, ma mère, ma voiture', en: 'my sister, my mother, my car' }] },
                { use: 'mes — any plural', examples: [{ fr: 'mes parents, mes enfants', en: 'my parents, my children' }] },
                { use: 'son/sa/ses — his AND her (agrees with thing)', examples: [{ fr: 'son frère', en: 'his or her brother' }, { fr: 'sa sœur', en: 'his or her sister' }] },
            ],
        },
        {
            word: 'avoir — one verb, four jobs',
            uses: [
                { use: 'owning', examples: [{ fr: 'J\u2019ai deux frères.', en: 'I have two brothers.' }] },
                { use: 'age (French uses HAVE, not BE)', examples: [{ fr: 'Mon fils a six ans.', en: 'My son is six (has six years).' }] },
                { use: 'hunger, thirst, cold, hot, fear', examples: [{ fr: 'J\u2019ai froid. Tu as faim ?', en: 'I\u2019m cold. Are you hungry?' }] },
                { use: 'obligation — avoir besoin de', examples: [{ fr: 'J\u2019ai besoin d\u2019aide.', en: 'I need help.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Family words are full of liaison (vowels gluing onto consonants) and the tricky nasal -un/-on. Read each line aloud three times.',
        lines: [
            { fr: 'J\u2019ai un frère et deux sœurs.', pron: 'zhay uhn FRARE ay duh SUHR', en: 'I have one brother and two sisters.' },
            { fr: 'Mon père s\u2019appelle Jacques.', pron: 'mohn PAIR sah-PEL zhahk', en: 'My father\u2019s name is Jacques.' },
            { fr: 'Mes parents habitent à Ottawa.', pron: 'may pah-RAHN-zah-BEET ah oh-TAH-wah', en: 'My parents live in Ottawa.' },
            { fr: 'Nous avons un chat et un chien.', pron: 'noo-zah-VOHN uhn shah ay uhn shyen', en: 'We have a cat and a dog.' },
            { fr: 'C\u2019est la femme de mon oncle — ma tante.', pron: 'seh lah FAM duh mohn OHN-kluh mah tahnt', en: 'She\u2019s my uncle\u2019s wife — my aunt.' },
            { fr: 'Ma sœur a vingt ans.', pron: 'mah SUHR ah vahnt AHN', en: 'My sister is twenty.' },
        ],
    },
};

// ── A1 · Food & Everyday Objects ─────────────────────────────────────────────
const a1Food: LessonExtras = {
    warmup: [
        { q: 'How do you say "my mother\u2019s car"?', a: 'la voiture de ma mère (French reverses the \u2019s).' },
        { q: 'When do you use mes instead of mon/ma?', a: 'Before any plural noun: mes parents.' },
        { q: 'How does French say age — with être or avoir?', a: 'avoir: J\u2019ai trente ans.' },
        { q: 'Translate: "I have two brothers."', a: 'J\u2019ai deux frères.' },
        { q: 'What does "J\u2019ai besoin d\u2019aide" mean?', a: 'I need help (literally: I have need of help).' },
    ],
    verbTables: [
        {
            title: 'prendre (to take / to have — food) — full present tense',
            note: 'The one -re verb you meet at every café table. Notice the double-n in the plural.',
            rows: [
                { label: 'je', form: 'prends', pron: 'prahn' },
                { label: 'tu', form: 'prends', pron: 'prahn' },
                { label: 'il / elle / on', form: 'prend', pron: 'prahn' },
                { label: 'nous', form: 'prenons', pron: 'pruh-NOHN' },
                { label: 'vous', form: 'prenez', pron: 'pruh-NAY' },
                { label: 'ils / elles', form: 'prennent', pron: 'pren' },
            ],
        },
        {
            title: 'boire (to drink) — two stems',
            note: 'boi- in the singular, buv- in the plural. English never splits like this; drill it until it is automatic.',
            rows: [
                { label: 'je', form: 'bois', pron: 'bwah' },
                { label: 'tu', form: 'bois', pron: 'bwah' },
                { label: 'il / elle / on', form: 'boit', pron: 'bwah' },
                { label: 'nous', form: 'buvons', pron: 'bü-VOHN' },
                { label: 'vous', form: 'buvez', pron: 'bü-VAY' },
                { label: 'ils / elles', form: 'boivent', pron: 'bwahv' },
            ],
        },
        {
            title: 'vouloir (to want) — present',
            note: 'vouloir, c\u2019est pouvoir — "where there\u2019s a will there\u2019s a way." Je voudrais (conditional) is the polite form for ordering.',
            rows: [
                { label: 'je', form: 'veux / voudrais', pron: 'vuh / voo-DREH' },
                { label: 'tu', form: 'veux', pron: 'vuh' },
                { label: 'il / elle / on', form: 'veut', pron: 'vuh' },
                { label: 'nous', form: 'voulons', pron: 'voo-LOHN' },
                { label: 'vous', form: 'voulez', pron: 'voo-LAY' },
                { label: 'ils / elles', form: 'veulent', pron: 'vuhl' },
            ],
        },
    ],
    useCases: [
        {
            word: 'du, de la, des — "some", the partitive',
            note: 'English drops "some" but French refuses: eating BREAD means manger du pain. The partitive = de + le/la/les, contracted.',
            uses: [
                { use: 'du — de + le, masculine food', examples: [{ fr: 'Je mange du fromage.', en: 'I\u2019m eating (some) cheese.' }] },
                { use: 'de la — feminine food', examples: [{ fr: 'Je bois de la bière.', en: 'I drink beer.' }] },
                { use: 'de l\u2019 — before a vowel (either gender)', examples: [{ fr: 'Je prends de l\u2019eau. / de l\u2019huile', en: 'I\u2019ll have water / oil' }] },
                { use: 'des — plural food (de + les)', examples: [{ fr: 'Je mange des légumes.', en: 'I eat vegetables.' }] },
                { use: 'whole vs part — definite article switches it off', examples: [{ fr: 'J\u2019aime le fromage (cheese in general) vs Je mange du fromage (some now)', en: 'I like cheese vs I\u2019m eating some cheese' }] },
            ],
        },
        {
            word: 'au, à la, aux — "to the / at the" restaurant & café',
            uses: [
                { use: 'au — masculine place', examples: [{ fr: 'Je vais au restaurant.', en: 'I\u2019m going to the restaurant.' }] },
                { use: 'à la — feminine place', examples: [{ fr: 'Je vais à la boulangerie.', en: 'I\u2019m going to the bakery.' }] },
                { use: 'aux — plural place', examples: [{ fr: 'Je vais aux toilettes.', en: 'I\u2019m going to the washroom.' }] },
                { use: 'chez — at someone\u2019s place', examples: [{ fr: 'Je dîne chez Léa.', en: 'I\u2019m having dinner at Léa\u2019s.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Food is where the partitive (du/de la/des) lives — the sound must glue: "du pain" (dü PAN), "de l\u2019eau" (duh LOH). Three read-aloud passes per line.',
        lines: [
            { fr: 'Je voudrais un café au lait, s\u2019il vous plaît.', pron: 'zhuh voo-DREH uhn kah-FAY oh LEH seel voo PLEH', en: 'I\u2019d like a café au lait, please.' },
            { fr: 'Le matin, je mange du pain avec de la confiture.', pron: 'luh mah-TAN zhuh mahnzh dü PAN ah-VEK duh la kohn-fee-TÜR', en: 'In the morning I eat bread with jam.' },
            { fr: 'Nous buvons de l\u2019eau gazeuse.', pron: 'noo bü-VOHN duh LOH gah-ZUHZ', en: 'We drink sparkling water.' },
            { fr: 'Vous prenez un dessert ?', pron: 'voo pruh-NAY uhn deh-SAIRE', en: 'Are you having a dessert?' },
            { fr: 'J\u2019ai faim ! Allons manger.', pron: 'zhay FAN ah-lohn mahn-ZHAY', en: 'I\u2019m hungry! Let\u2019s go eat.' },
            { fr: 'Je n\u2019aime pas le poisson, mais j\u2019adore les fruits de mer.', pron: 'zhuh nem pah luh pwah-SOHN meh zha-DOR lay früee duh MAIR', en: 'I don\u2019t like fish, but I love seafood.' },
        ],
    },
};

// ── A1 · Daily Routine ───────────────────────────────────────────────────────
const a1Routine: LessonExtras = {
    warmup: [
        { q: 'How do you order "I\u2019d like a coffee" politely?', a: 'Je voudrais un café, s\u2019il vous plaît.' },
        { q: 'Which article: Je mange ___ fromage (some cheese)?', a: 'du — du fromage (partitive).' },
        { q: 'du, de la, de l\u2019, des — what do they all mean?', a: 'some / any — de + the definite article, contracted.' },
        { q: 'Give the nous form of boire.', a: 'nous buvons (bü-VOHN).' },
        { q: 'Translate: "I\u2019m going to the bakery."', a: 'Je vais à la boulangerie.' },
    ],
    verbTables: [
        {
            title: 'se lever (to get up) — reflexive, present',
            note: 'Reflexive verb = the action bounces back on you. The pronoun agrees: je ME lève, tu TE lèves… The ne…pas wraps the WHOLE thing: je ne me lève pas.',
            rows: [
                { label: 'je', form: 'me lève', pron: 'muh LEHV' },
                { label: 'tu', form: 'te lèves', pron: 'tuh LEHV' },
                { label: 'il / elle / on', form: 'se lève', pron: 'suh LEHV' },
                { label: 'nous', form: 'nous levons', pron: 'noo luh-VOHN' },
                { label: 'vous', form: 'vous levez', pron: 'voo luh-VAY' },
                { label: 'ils / elles', form: 'se lèvent', pron: 'suh LEHV' },
            ],
        },
        {
            title: 'se coucher (to go to bed) — same machinery',
            rows: [
                { label: 'je', form: 'me couche', pron: 'muh KOOSH' },
                { label: 'tu', form: 'te couches', pron: 'tuh KOOSH' },
                { label: 'il / elle / on', form: 'se couche', pron: 'suh KOOSH' },
                { label: 'nous', form: 'nous couchons', pron: 'noo koo-SHOHN' },
                { label: 'vous', form: 'vous couchez', pron: 'voo koo-SHAY' },
                { label: 'ils / elles', form: 'se couchent', pron: 'suh KOOSH' },
            ],
        },
        {
            title: 'se réveiller (to wake up)',
            rows: [
                { label: 'je', form: 'me réveille', pron: 'muh ray-VEH-yuh' },
                { label: 'tu', form: 'te réveilles', pron: 'tuh ray-VEH-yuh' },
                { label: 'il / elle / on', form: 'se réveille', pron: 'suh ray-VEH-yuh' },
                { label: 'nous', form: 'nous réveillons', pron: 'noo ray-veh-YOHN' },
                { label: 'vous', form: 'vous réveillez', pron: 'voo ray-veh-YAY' },
                { label: 'ils / elles', form: 'se réveillent', pron: 'suh ray-VEH-yuh' },
            ],
        },
    ],
    useCases: [
        {
            word: 'à + clock vs le + day vs de + period',
            note: 'Three prepositions, three jobs — the routine sentence uses all three at once.',
            uses: [
                { use: 'à — the moment on the clock', examples: [{ fr: 'Je me lève à six heures et demie.', en: 'I get up at half past six.' }] },
                { use: 'le — the day of the week (habit)', examples: [{ fr: 'Le week-end, je me lève tard.', en: 'On weekends I get up late.' }] },
                { use: 'le matin / l\u2019après-midi / le soir — parts of the day', examples: [{ fr: 'Le soir, je regarde la télé.', en: 'In the evening I watch TV.' }] },
                { use: 'dans — duration until (in an hour)', examples: [{ fr: 'Je rentre dans une heure.', en: 'I\u2019m coming home in an hour.' }] },
                { use: 'de … à — from … to', examples: [{ fr: 'Je travaille de neuf heures à cinq heures.', en: 'I work from nine to five.' }] },
            ],
        },
        {
            word: 'se lever vs lever — the pronoun changes the meaning',
            uses: [
                { use: 'se lever — get yourself up', examples: [{ fr: 'Je me lève à sept heures.', en: 'I get up at seven.' }] },
                { use: 'lever — lift something else', examples: [{ fr: 'Je lève la main.', en: 'I raise my hand.' }] },
                { use: 'se laver — wash yourself', examples: [{ fr: 'Je me lave les mains.', en: 'I wash my hands (lit. wash THE hands).' }] },
                { use: 'body parts take THE article, not my', examples: [{ fr: 'Je me brosse les dents.', en: 'I brush my teeth (lit. brush the teeth).' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Routine verbs are mostly reflexive — the me/te/se must not be swallowed. Read aloud three times, tapping the syllables.',
        lines: [
            { fr: 'Je me réveille à six heures, mais je me lève à six heures et quart.', pron: 'zhuh muh ray-VEH-yuh ah see ZUHR meh zhuh muh LEHV ah see ZUHR ay KAHR', en: 'I wake up at six, but I get up at quarter past.' },
            { fr: 'Le matin, je prends mon petit-déjeuner en écoutant la radio.', pron: 'luh mah-TAN zhuh prahn mohn puh-tee-day-zhuh-NAIR ahn ay-koo-TAHN lah rah-DYO', en: 'In the morning I have breakfast listening to the radio.' },
            { fr: 'Je me brosse les dents et je m\u2019habille.', pron: 'zhuh muh BRUS lay dahn ay zhuh mah-BEE-yuh', en: 'I brush my teeth and get dressed.' },
            { fr: 'Je travaille de neuf heures à cinq heures.', pron: 'zhuh trah-VAY duh nuh ZUHR ah sank ZUHR', en: 'I work from nine to five.' },
            { fr: 'Le soir, je dîne vers huit heures et je me couche à onze heures.', pron: 'luh SAIR zhuh DEEN vairz WEET ZUHR ay zhuh muh KOOSH ah ohnz ZUHR', en: 'In the evening I have dinner around eight and go to bed at eleven.' },
            { fr: 'D\u2019habitude, je me couche tard le week-end.', pron: 'dah-bee-TÜD zhuh muh KOOSH tahr luh wee-KEND', en: 'Usually I go to bed late on weekends.' },
        ],
    },
};

// ── A1 · Questions & Negation ────────────────────────────────────────────────
const a1Questions: LessonExtras = {
    warmup: [
        { q: 'Say: "I get up at seven o\u2019clock."', a: 'Je me lève à sept heures.' },
        { q: 'Where does ne…pas go in "je me lève pas" (I don\u2019t get up)?', a: 'Je NE me lève PAS — the whole reflexive group is wrapped: ne + me + lève + pas.' },
        { q: 'How do you say "I wash my hands"?', a: 'Je me lave les mains — body parts take THE article.' },
        { q: 'Translate: "on weekends I get up late."', a: 'Le week-end, je me lève tard.' },
        { q: 'se coucher — give the vous form.', a: 'vous vous couchez.' },
    ],
    verbTables: [
        {
            title: 'faire (to do / to make) — full present tense',
            note: 'The most-used irregular verb after être/avoir/aller. Fair- in the singular, f- in the plural. Questions ride on it: Qu\u2019est-ce que tu fais ?',
            rows: [
                { label: 'je', form: 'fais', pron: 'feh' },
                { label: 'tu', form: 'fais', pron: 'feh' },
                { label: 'il / elle / on', form: 'fait', pron: 'feh' },
                { label: 'nous', form: 'faisons', pron: 'fuh-ZOHN' },
                { label: 'vous', form: 'faites', pron: 'FET' },
                { label: 'ils / elles', form: 'font', pron: 'fohn' },
            ],
        },
        {
            title: 'parler through all three question forms',
            note: 'One verb, three registers. Intonation = spoken casual, est-ce que = neutral, inversion = written/formal.',
            rows: [
                { label: 'intonation', form: 'Tu parles français ?', pron: 'tü pahrl frahn-SEH' },
                { label: 'est-ce que', form: 'Est-ce que tu parles français ?', pron: 'es-kuh tü pahrl frahn-SEH' },
                { label: 'inversion', form: 'Parlez-vous français ?', pron: 'pahrlay voo frahn-SEH' },
                { label: 'n\u2019est-ce pas tag', form: 'Tu parles français, n\u2019est-ce pas ?', pron: 'nes-pah', },
            ],
        },
    ],
    useCases: [
        {
            word: 'ne … pas — negation has FOUR moving parts',
            note: 'The verb is a sandwich filling: ne before it, pas after it. With auxiliaries or modals, the sandwich wraps the CONJUGATED verb only.',
            uses: [
                { use: 'simple verb', examples: [{ fr: 'Je ne parle pas anglais.', en: 'I don\u2019t speak English.' }] },
                { use: 'modal (pouvoir, vouloir, devoir…)', examples: [{ fr: 'Je ne peux pas venir.', en: 'I can\u2019t come.' }] },
                { use: 'reflexive — wraps the whole group', examples: [{ fr: 'Je ne me lève pas tôt.', en: 'I don\u2019t get up early.' }] },
                { use: 'pas de — the article disappears after negation', examples: [{ fr: 'Je n\u2019ai pas de frère. (not "pas un frère")', en: 'I have no brother.' }] },
                { use: 'ne alone = literary; pas alone = spoken', examples: [{ fr: 'Je sais pas. (dropped ne, casual speech)', en: 'I dunno.' }] },
            ],
        },
        {
            word: 'qu\u2019est-ce que vs qu\u2019est-ce qui — WHAT, two versions',
            uses: [
                { use: 'qu\u2019est-ce que + what as object', examples: [{ fr: 'Qu\u2019est-ce que tu manges ?', en: 'What are you eating?' }] },
                { use: 'qu\u2019est-ce qui + what as subject', examples: [{ fr: 'Qu\u2019est-ce qui se passe ?', en: 'What\u2019s happening?' }] },
                { use: 'qui est-ce qui — who as subject', examples: [{ fr: 'Qui est-ce qui vient ?', en: 'Who\u2019s coming?' }] },
                { use: 'qui — who as object', examples: [{ fr: 'Tu regardes qui ?', en: 'Who are you looking at?' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Negation and questions change the music: the ne glides into a vowel (je n\u2019ai), and rising intonation carries a question without any words at all. Three passes per line.',
        lines: [
            { fr: 'Qu\u2019est-ce que tu fais le week-end ?', pron: 'KESS-kuh tü feh luh wee-KEND', en: 'What do you do on weekends?' },
            { fr: 'Je ne travaille pas le samedi.', pron: 'zhuh nuh trah-VYAH pah luh sam-DEE', en: 'I don\u2019t work on Saturdays.' },
            { fr: 'Est-ce que tu parles français ?', pron: 'es-kuh tü pahrl frahn-SEH', en: 'Do you speak French?' },
            { fr: 'Je n\u2019ai pas de temps aujourd\u2019hui.', pron: 'zhuh nay pah duh tahn oh-zhoor-DUEE', en: 'I don\u2019t have time today.' },
            { fr: 'Pourquoi est-ce que tu ne viens pas avec nous ?', pron: 'poor-KWAH es-kuh tü nuh vyen pah ah-VEK noo', en: 'Why aren\u2019t you coming with us?' },
            { fr: 'Qu\u2019est-ce qui se passe ? — Rien du tout.', pron: 'KESS-kee suh PAHSS ryan dü TOH', en: 'What\u2019s going on? — Nothing at all.' },
        ],
    },
};

export const A1_EXTRAS: Record<string, LessonExtras> = {
    'A1:greetings': a1Greetings,
    'A1:numbers': a1Numbers,
    'A1:family': a1Family,
    'A1:food': a1Food,
    'A1:routine': a1Routine,
    'A1:questions': a1Questions,
};

// ── A2 · Passé Composé ───────────────────────────────────────────────────────
const a2PasseCompose: LessonExtras = {
    warmup: [
        { q: 'What is the negation sandwich around a simple verb?', a: 'ne + verb + pas: je ne travaille pas.' },
        { q: 'How do you ask "What do you do?"', a: 'Qu\u2019est-ce que tu fais ? (object) — or Qu\u2019est-ce qui se passe ? for subject questions.' },
        { q: 'Give the ils form of faire.', a: 'ils font (fohn).' },
        { q: 'After negation, what happens to the article? "I have a car" → negative.', a: 'It becomes de: Je n\u2019ai pas de voiture.' },
        { q: 'Where does ne…pas go with a modal verb?', a: 'Around the MODAL: Je ne peux pas venir.' },
    ],
    verbTables: [
        {
            title: 'avoir in the passé composé — the machine that runs most verbs',
            note: 'present avoir + past participle. The auxiliary carries the person; the participle never changes with avoir.',
            rows: [
                { label: 'j\u2019', form: 'ai parlé', pron: 'ay pahrl-LAY' },
                { label: 'tu', form: 'as parlé', pron: 'ah pahrl-LAY' },
                { label: 'il / elle / on', form: 'a parlé', pron: 'ah pahrl-LAY' },
                { label: 'nous', form: 'avons parlé', pron: 'ah-vohn pahrl-LAY' },
                { label: 'vous', form: 'avez parlé', pron: 'ah-vay pahrl-LAY' },
                { label: 'ils / elles', form: 'ont parlé', pron: 'ohn pahrl-LAY' },
            ],
        },
        {
            title: 'être in the passé composé — the house-and-motion machine',
            note: 'With être the participle AGREES like an adjective: -e feminine, -s plural, -es feminine plural.',
            rows: [
                { label: 'je (m)', form: 'suis allé', pron: 'süee ahn-LAY' },
                { label: 'je (f)', form: 'suis allée', pron: 'süee ahn-LAY' },
                { label: 'nous (m or mixed)', form: 'sommes allés', pron: 'som ahn-LAY' },
                { label: 'nous (f)', form: 'sommes allées', pron: 'som ahn-LAY' },
                { label: 'il est / elle est', form: 'est allé / allée', pron: 'eh ahn-LAY' },
                { label: 'ils / elles', form: 'sont allés / allées', pron: 'sohn ahn-LAY' },
            ],
        },
        {
            title: 'The être-verbs (DR MRS VANDERTRAMP + passer)',
            note: 'Passé composé uses être with these 17 verbs of coming, going, and life changes — plus every reflexive verb. Memorize as a chant.',
            rows: [
                { label: 'aller', form: 'allé', pron: 'gone/went' },
                { label: 'arriver', form: 'arrivé', pron: 'arrive' },
                { label: 'devenir', form: 'devenu', pron: 'become' },
                { label: 'descendre', form: 'descendu', pron: 'go down' },
                { label: 'entrer', form: 'entré', pron: 'enter' },
                { label: 'monter', form: 'monté', pron: 'go up' },
                { label: 'mourir', form: 'mort', pron: 'die — irregular participle!' },
                { label: 'naître', form: 'né', pron: 'be born' },
                { label: 'partir', form: 'parti', pron: 'leave' },
                { label: 'passer', form: 'passé', pron: 'pass by (only with être for this meaning)' },
                { label: 'rentrer', form: 'rentré', pron: 'go home' },
                { label: 'rester', form: 'resté', pron: 'stay' },
                { label: 'retourner', form: 'retourné', pron: 'return' },
                { label: 'revenir', form: 'revenu', pron: 'come back' },
                { label: 'sortir', form: 'sorti', pron: 'go out' },
                { label: 'tomber', form: 'tombé', pron: 'fall' },
                { label: 'venir', form: 'venu', pron: 'come' },
            ],
        },
        {
            title: 'Irregular past participles with avoir',
            rows: [
                { label: 'faire', form: 'fait', pron: 'J\u2019ai fait mes devoirs.' },
                { label: 'prendre', form: 'pris', pron: 'J\u2019ai pris un café.' },
                { label: 'mettre', form: 'mis', pron: 'J\u2019ai mis mon manteau.' },
                { label: 'dire', form: 'dit', pron: 'Il a dit la vérité.' },
                { label: 'écrire', form: 'écrit', pron: 'J\u2019ai écrit un message.' },
                { label: 'ouvrir', form: 'ouvert', pron: 'Elle a ouvert la porte.' },
                { label: 'boire', form: 'bu', pron: 'Nous avons bu du vin.' },
                { label: 'voir', form: 'vu', pron: 'J\u2019ai vu le film.' },
                { label: 'lire', form: 'lu', pron: 'Elle a lu le livre.' },
                { label: 'pouvoir', form: 'pu', pron: 'Je n\u2019ai pas pu venir.' },
                { label: 'vouloir', form: 'voulu', pron: 'Il a voulu payer.' },
                { label: 'devoir', form: 'dû', pron: 'J\u2019ai dû attendre.' },
                { label: 'être', form: 'été', pron: 'J\u2019ai été malade.' },
                { label: 'avoir', form: 'eu', pron: 'Il a eu une idée.' },
                { label: 'savoir', form: 'su', pron: 'J\u2019ai su la réponse.' },
            ],
        },
    ],
    useCases: [
        {
            word: 'the negative de rule — where beginners lose points',
            note: 'In the passé composé the negation wraps the AUXILIARY, and any article after a negated avoir verb becomes de.',
            uses: [
                { use: 'ne + ai + pas — sandwich around the helper', examples: [{ fr: 'Je n\u2019ai pas parlé.', en: 'I didn\u2019t speak.' }] },
                { use: 'un/une/des → de after a negated verb', examples: [{ fr: 'J\u2019ai mangé une pomme. → Je n\u2019ai pas mangé de pomme.', en: 'I ate an apple. → I didn\u2019t eat an apple.' }] },
                { use: 'du/de la also collapse to de', examples: [{ fr: 'Je n\u2019ai pas bu de vin.', en: 'I didn\u2019t drink wine.' }] },
                { use: 'être-verbs: wraps the être', examples: [{ fr: 'Elle n\u2019est pas venue.', en: 'She didn\u2019t come.' }] },
                { use: 'reflexives: ne + me/te/se + helper + pas', examples: [{ fr: 'Je ne me suis pas levé tôt.', en: 'I didn\u2019t get up early.' }] },
            ],
        },
        {
            word: 'déjà / encore / jamais — time adverbs slot INSIDE the sandwich',
            uses: [
                { use: 'déjà — already', examples: [{ fr: 'J\u2019ai déjà vu ce film.', en: 'I\u2019ve already seen that film.' }] },
                { use: 'jamais — never (replaces pas)', examples: [{ fr: 'Je n\u2019ai jamais visité Paris.', en: 'I\u2019ve never visited Paris.' }] },
                { use: 'encore — still / again', examples: [{ fr: 'Il n\u2019est pas encore arrivé.', en: 'He hasn\u2019t arrived yet.' }] },
                { use: 'tout — right after the helper', examples: [{ fr: 'J\u2019ai tout mangé.', en: 'I ate everything.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'The passé composé has two beats: the helper is quiet, the participle is loud. Read each line stressing the final participle — that is how it sounds natural.',
        lines: [
            { fr: 'Hier, j\u2019ai travaillé toute la journée.', pron: 'ee-YAIR zhay trah-vah-YAY toot lah zhoor-NAY', en: 'Yesterday I worked all day.' },
            { fr: 'Nous avons mangé au restaurant italien.', pron: 'noo-zah-VOHN mahn-ZHAY oh res-tau-RAHN ee-tah-LYEN', en: 'We ate at the Italian restaurant.' },
            { fr: 'Elle est arrivée à huit heures et elle est partie à dix.', pron: 'el eh tah-ree-VAY ah weet ZUHR ay el eh pahr-TEE ah dees', en: 'She arrived at eight and left at ten.' },
            { fr: 'Je n\u2019ai pas vu ton message.', pron: 'zhuh nay pah VÜ tohn mes-SAHZH', en: 'I didn\u2019t see your message.' },
            { fr: 'Ils sont allés au cinéma, puis ils ont pris un café.', pron: 'eel sohn tah-LAY oh see-nay-MAH püee eel ohn pree uhn kah-FAY', en: 'They went to the movies, then had a coffee.' },
            { fr: 'Tu as dormi combien d\u2019heures ?', pron: 'tü ah dor-MEE kohn-BYEN duhr', en: 'How many hours did you sleep?' },
        ],
    },
};

// ── A2 · Imparfait ───────────────────────────────────────────────────────────
const a2Imparfait: LessonExtras = {
    warmup: [
        { q: 'How do you form the passé composé of parler?', a: 'avoir in the present + parlé: j\u2019ai parlé.' },
        { q: 'Name five verbs that use être in the passé composé.', a: 'aller, venir, arriver, partir, sortir (DR MRS VANDERTRAMP).' },
        { q: 'What happens to "une pomme" after a negated avoir verb?', a: 'It becomes de: Je n\u2019ai pas mangé de pomme.' },
        { q: 'Translate: "She didn\u2019t come."', a: 'Elle n\u2019est pas venue. (être-verb + agreement)' },
        { q: 'How do you say "I have already seen this film"?', a: 'J\u2019ai déjà vu ce film. — adverb inside the sandwich.' },
    ],
    verbTables: [
        {
            title: 'The imparfait engine: nous-form stem + imparfait endings',
            note: 'One rule builds the imparfait for ~95% of verbs: take the NOUS present form, drop -ons, add -ais/-ais/-ait/-ions/-iez/-aient.',
            rows: [
                { label: 'parler → parl-', form: 'je parlais, tu parlais, il parlait', pron: 'pahrl-LEH, pahrl-LEH, pahrl-LEH' },
                { label: '', form: 'nous parlions, vous parliez, ils parlaient', pron: 'pahrl-LYOHN, pahrl-LYAY, pahrl-LEH' },
                { label: 'finir → finiss-', form: 'je finissais, ils finissaient', pron: 'fee-nee-SEH, fee-nee-SEH' },
                { label: 'boire → buv-', form: 'je buvais, vous buviez', pron: 'bü-VEH, bü-VYAY' },
                { label: 'prendre → pren-', form: 'je prenais, ils prenaient', pron: 'pruh-NEH, pruh-NEH' },
                { label: 'faire → fais-', form: 'je faisais, nous faisions', pron: 'fuh-ZEH, fuh-ZYOHN' },
                { label: 'aller → all-', form: 'j\u2019allais, ils allaient', pron: 'zah-LEH, zah-LEH' },
            ],
        },
        {
            title: 'être — the ONLY irregular imparfait',
            note: 'The nous form sommes gives "som-" which is wrong — être uses ét- instead. Everything else follows the engine.',
            rows: [
                { label: 'j\u2019', form: 'étais', pron: 'ay-TEH' },
                { label: 'tu', form: 'étais', pron: 'ay-TEH' },
                { label: 'il / elle / on', form: 'était', pron: 'ay-TEH' },
                { label: 'nous', form: 'étions', pron: 'ay-TYOHN' },
                { label: 'vous', form: 'étiez', pron: 'ay-TYAY' },
                { label: 'ils / elles', form: 'étaient', pron: 'ay-TEH' },
            ],
        },
    ],
    useCases: [
        {
            word: 'imparfait vs passé composé — background vs event',
            note: 'The A2 scoring question. Imparfait paints the scene (weather, feelings, habits, ongoing states); passé composé snaps the photo (one finished event).',
            uses: [
                { use: 'description / background — imparfait', examples: [{ fr: 'Il pleuvait. Les rues étaient vides.', en: 'It was raining. The streets were empty.' }] },
                { use: 'event inside that scene — passé composé', examples: [{ fr: 'Soudain, mon téléphone a sonné.', en: 'Suddenly, my phone rang.' }] },
                { use: 'habits (used to) — imparfait', examples: [{ fr: 'Quand j\u2019étais petit, je jouais au hockey.', en: 'When I was little, I used to play hockey.' }] },
                { use: 'one-time finished action — passé composé', examples: [{ fr: 'Hier, j\u2019ai joué au hockey.', en: 'Yesterday I played hockey (once).' }] },
                { use: 'quand + PC — interruption combo', examples: [{ fr: 'Je lisais quand tu as appelé.', en: 'I was reading when you called.' }] },
            ],
        },
        {
            word: 'time markers that FORCE one tense or the other',
            uses: [
                { use: 'imparfait signals: toujours, chaque, d\u2019habitude, souvent', examples: [{ fr: 'D\u2019habitude, il neigeait en janvier.', en: 'Usually it snowed in January.' }] },
                { use: 'passé composé signals: hier, soudain, une fois, tout à coup', examples: [{ fr: 'Une fois, j\u2019ai vu un orignal !', en: 'Once, I saw a moose!' }] },
                { use: 'pendant + duration + finished event → PC', examples: [{ fr: 'J\u2019ai attendu pendant deux heures.', en: 'I waited for two hours (finished).' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'The imparfait sounds soft and level — three matching nasal endings (-ais, -ait, -aient all sound "eh"). Read each line twice: once tense by tense, once flowing.',
        lines: [
            { fr: 'Quand j\u2019étais petit, nous habitions à Québec.', pron: 'kahn zhay-TEH puh-TEE noo-zah-bee-TYOHN ah kuh-BEK', en: 'When I was little, we lived in Quebec City.' },
            { fr: 'Il faisait beau et les oiseaux chantaient.', pron: 'eel fuh-ZEH bo ay lay zwah-ZOHN shahn-TEH', en: 'The weather was nice and the birds were singing.' },
            { fr: 'Je lisais quand tu as téléphoné.', pron: 'zhuh lee-ZEH kahn tü ah tay-lay-fon-AY', en: 'I was reading when you phoned.' },
            { fr: 'Chaque été, nous allions au lac.', pron: 'shahk ay-TAY noo-zah-LYOHN oh lahk', en: 'Every summer we used to go to the lake.' },
            { fr: 'Elle était fatiguée parce qu\u2019elle travaillait beaucoup.', pron: 'el ay-TEH fah-tee-GAY pair-kuh el trah-vah-YEH boh-KOO', en: 'She was tired because she was working a lot.' },
            { fr: 'Il pleuvait, alors je suis resté à la maison.', pron: 'eel pluh-VEH ah-LOR zhuh süee res-TAY ah lah meh-ZOHN', en: 'It was raining, so I stayed home.' },
        ],
    },
};

// ── A2 · Futur Proche & Futur Simple ─────────────────────────────────────────
const a2Futur: LessonExtras = {
    warmup: [
        { q: 'Which auxiliary does "I was reading" take — and which tense is it?', a: 'It\u2019s imparfait: je lisais.' },
        { q: 'Give the imparfait of être for "she was".', a: 'elle était — être is the only irregular imparfait.' },
        { q: 'Which tense paints background, which snaps events?', a: 'Imparfait = background/habits; passé composé = finished events.' },
        { q: 'Translate: "It was raining, so I stayed home."', a: 'Il pleuvait, alors je suis resté(e) à la maison.' },
        { q: 'What does "soudain" trigger — imparfait or passé composé?', a: 'Passé composé — it marks a sudden finished event.' },
    ],
    verbTables: [
        {
            title: 'futur simple endings: one set for every verb',
            note: 'Infinitive + -ai, -as, -a, -ons, -ez, -ont. The -ai is stressed: je parlerai (parl-reh-AY).',
            rows: [
                { label: 'parler', form: 'je parlerai, tu parleras, il parlera', pron: 'pahrl-ruh-RAY, pahrl-ruh-RAH, pahrl-ruh-RAH' },
                { label: '', form: 'nous parlerons, vous parlerez, ils parleront', pron: 'pahrl-ruh-ROHN, pahrl-ruh-RAY, pahrl-ruh-ROHN' },
                { label: 'finir', form: 'je finirai', pron: 'fee-nee-REH' },
                { label: 'répondre', form: 'je répondrai', pron: 'ray-pohn-DREH' },
            ],
        },
        {
            title: '12 irregular futur stems — learn them as words',
            rows: [
                { label: 'être', form: 'ser- → je serai', pron: 'suh-REH' },
                { label: 'avoir', form: 'aur- → j\u2019aurai', pron: 'oh-REH' },
                { label: 'aller', form: 'ir- → j\u2019irai', pron: 'ee-REH' },
                { label: 'faire', form: 'fer- → je ferai', pron: 'fuh-REH' },
                { label: 'venir', form: 'viendr- → je viendrai', pron: 'vyen-DREH' },
                { label: 'voir', form: 'verr- → je verrai', pron: 'vuh-REH' },
                { label: 'pouvoir', form: 'pourr- → je pourrai', pron: 'poo-REH' },
                { label: 'vouloir', form: 'voudr- → je voudrai', pron: 'voo-DREH' },
                { label: 'devoir', form: 'devr- → je devrai', pron: 'duh-DREH' },
                { label: 'savoir', form: 'saur- → je saurai', pron: 'soh-REH' },
                { label: 'recevoir', form: 'recevr- → je recevrai', pron: 'ruh-suh-VREH' },
                { label: 'falloir', form: 'il faudra', pron: 'eel foh-DRAH' },
            ],
        },
        {
            title: 'futur proche: aller + infinitive',
            rows: [
                { label: 'je', form: 'vais parler', pron: 'veh pahrl-LAY' },
                { label: 'tu', form: 'vas parler', pron: 'vah pahrl-LAY' },
                { label: 'il / elle / on', form: 'va parler', pron: 'vah pahrl-LAY' },
                { label: 'nous', form: 'allons parler', pron: 'ah-lohn pahrl-LAY' },
                { label: 'vous', form: 'allez parler', pron: 'ah-lay pahrl-LAY' },
                { label: 'ils / elles', form: 'vont parler', pron: 'vohn pahrl-LAY' },
            ],
        },
    ],
    useCases: [
        {
            word: 'after quand, the future is REQUIRED — where English uses present',
            note: 'The #1 A2 trap. English says "when I HAVE time"; French says quand j\u2019aurai — future after quand, lorsque, dès que, aussitôt que.',
            uses: [
                { use: 'quand + futur simple', examples: [{ fr: 'Quand j\u2019aurai le temps, je t\u2019appellerai.', en: 'When I have time, I\u2019ll call you.' }] },
                { use: 'dès que + futur simple', examples: [{ fr: 'Dès qu\u2019il arrivera, on mangera.', en: 'As soon as he arrives, we\u2019ll eat.' }] },
                { use: 'futur proche is fine there too', examples: [{ fr: 'Quand je vais finir, je te préviens.', en: 'When I\u2019m about to finish, I\u2019ll let you know.' }] },
                { use: 'never the present after quand for future events', examples: [{ fr: 'NOT: Quand j\u2019ai le temps, je t\u2019appellerai.', en: '— that reads as a habit, not a plan' }] },
            ],
        },
        {
            word: 'futur proche vs futur simple — near vs far',
            uses: [
                { use: 'futur proche — about to happen, decided plan', examples: [{ fr: 'Je vais partir dans cinq minutes.', en: 'I\u2019m leaving in five minutes.' }] },
                { use: 'futur simple — prediction, promise, distant plan', examples: [{ fr: 'Un jour, je vivrai au Québec.', en: 'Someday I\u2019ll live in Quebec.' }] },
                { use: 'promises use futur simple', examples: [{ fr: 'Je te rappellerai, promis !', en: 'I\u2019ll call you back, promise!' }] },
                { use: 'weather forecast: futur simple', examples: [{ fr: 'Il fera beau demain.', en: 'It\u2019ll be nice tomorrow.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Futur simple endings stress the LAST syllable: parler-AI, ser-AI. Read each line twice — once fast with futur proche, once with futur simple, and feel the register shift.',
        lines: [
            { fr: 'Demain, je vais visiter le musée.', pron: 'duh-MAN zhuh veh vee-zee-TAY luh mü-ZAY', en: 'Tomorrow I\u2019m going to visit the museum.' },
            { fr: 'Quand j\u2019aurai le temps, je t\u2019appellerai.', pron: 'kahn zhoh-REH luh tahn zhuh tah-pel-REH', en: 'When I have time, I\u2019ll call you.' },
            { fr: 'Il fera beau ce week-end, on ira au parc.', pron: 'eel fuh-rah boh suh wee-KEND oh nee-RAH oh pahrk', en: 'It\u2019ll be nice this weekend, we\u2019ll go to the park.' },
            { fr: 'Je te promets : je ne serai jamais en retard.', pron: 'zhuh tuh pruh-MEH zhuh nuh suh-REH zha-MEHZ ahn ruh-TAHR', en: 'I promise: I\u2019ll never be late.' },
            { fr: 'Dès que tu arriveras, nous commencerons la réunion.', pron: 'deh kuh tü ah-ree-vruh-RAH noo kuh-mahn-suh-ROHN lah ray-ü-NYOHN', en: 'As soon as you arrive, we\u2019ll start the meeting.' },
            { fr: 'Dans dix ans, j\u2019aurai ma propre entreprise.', pron: 'dahn deez AHNZ zhoh-REH mah PRUP-ruh ahn-truh-PREEZ', en: 'In ten years I\u2019ll have my own business.' },
        ],
    },
};

// ── A2 · Shopping & Money ────────────────────────────────────────────────────
const a2Shopping: LessonExtras = {
    warmup: [
        { q: 'Translate: "When I have time, I\u2019ll call you."', a: 'Quand j\u2019aurai le temps, je t\u2019appellerai. — future after quand!' },
        { q: 'Give the futur simple stem of être and avoir.', a: 'ser- and aur-: je serai, j\u2019aurai.' },
        { q: 'Futur proche or futur simple for "I\u2019m leaving in five minutes"?', a: 'Futur proche — je vais partir dans cinq minutes.' },
        { q: 'Which futur for promises and predictions?', a: 'Futur simple: je te rappellerai, il fera beau.' },
        { q: 'Say the futur simple of aller for "we".', a: 'nous irons (noo-zee-ROHN).' },
    ],
    verbTables: [
        {
            title: 'pouvoir (can) — present + passé composé participle',
            rows: [
                { label: 'je', form: 'peux', pron: 'puh' },
                { label: 'tu', form: 'peux', pron: 'puh' },
                { label: 'il / elle / on', form: 'peut', pron: 'puh' },
                { label: 'nous', form: 'pouvons', pron: 'poo-VOHN' },
                { label: 'vous', form: 'pouvez', pron: 'poo-VAY' },
                { label: 'ils / elles', form: 'peuvent', pron: 'puhv' },
                { label: 'past participle', form: 'pu', pron: 'Je n\u2019ai pas pu acheter.' },
            ],
        },
        {
            title: 'devoir (must / to owe) — two meanings, one verb',
            note: 'devoir + money = to owe. devoir + verb = must. In the passé composé it means "had to".',
            rows: [
                { label: 'je', form: 'dois', pron: 'dwah' },
                { label: 'tu', form: 'dois', pron: 'dwah' },
                { label: 'il / elle / on', form: 'doit', pron: 'dwah' },
                { label: 'nous', form: 'devons', pron: 'duh-VOHN' },
                { label: 'vous', form: 'devez', pron: 'duh-VAY' },
                { label: 'ils / elles', form: 'doivent', pron: 'dwahv' },
                { label: 'past participle', form: 'dû', pron: 'J\u2019ai dû payer 20 $. = I had to pay $20.' },
            ],
        },
        {
            title: 'acheter (to buy) — e_er verb, same doubling as appeler',
            rows: [
                { label: 'j\u2019', form: 'achète', pron: 'ah-SHET' },
                { label: 'tu', form: 'achètes', pron: 'ah-SHET' },
                { label: 'il / elle / on', form: 'achète', pron: 'ah-SHET' },
                { label: 'nous', form: 'achetons', pron: 'ahsh-TOHN' },
                { label: 'vous', form: 'achetez', pron: 'ahsh-TAY' },
                { label: 'ils / elles', form: 'achètent', pron: 'ah-SHET' },
            ],
        },
    ],
    useCases: [
        {
            word: 'comparatives: plus / moins / aussi … que',
            note: 'Every comparison is built on QUE, not THAN. The irregulars (bon → meilleur, mauvais → pire) never take plus.',
            uses: [
                { use: 'more … than', examples: [{ fr: 'Ce manteau est plus cher que l\u2019autre.', en: 'This coat is more expensive than the other.' }] },
                { use: 'less … than', examples: [{ fr: 'Ce sac est moins pratique.', en: 'This bag is less practical.' }] },
                { use: 'as … as', examples: [{ fr: 'Elle est aussi gentille que sa sœur.', en: 'She\u2019s as kind as her sister.' }] },
                { use: 'bon → meilleur (BETTER, irregular)', examples: [{ fr: 'Ce pain est meilleur que celui-là.', en: 'This bread is better than that one.' }] },
                { use: 'mauvais → pire (WORSE, irregular)', examples: [{ fr: 'Le temps est pire qu\u2019hier.', en: 'The weather is worse than yesterday.' }] },
            ],
        },
        {
            word: 'money talk: combien, coûter, payer',
            uses: [
                { use: 'asking a price', examples: [{ fr: 'Combien coûte ce livre ? / Il coûte combien ?', en: 'How much is this book?' }] },
                { use: 'costing a price — coûter', examples: [{ fr: 'Ça coûte quinze dollars.', en: 'It costs fifteen dollars.' }] },
                { use: 'paying — payer par carte / en espèces', examples: [{ fr: 'Je peux payer par carte ?', en: 'Can I pay by card?' }] },
                { use: 'choosing — celui-ci / celle-là', examples: [{ fr: 'Je voudrais celui-ci, s\u2019il vous plaît.', en: 'I\u2019ll take this one, please.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Shopping French lives on the que of comparison and the liaison in "plus cher" (plü SHEHR). Three read-aloud passes per line.',
        lines: [
            { fr: 'Combien coûte ce pull ?', pron: 'kohn-BYEN koot suh PÜL', en: 'How much is this sweater?' },
            { fr: 'Il est moins cher que celui-là.', pron: 'eel eh mwan SHEHR kuh suh-gee-LAH', en: 'It\u2019s cheaper than that one.' },
            { fr: 'Je peux payer par carte, s\u2019il vous plaît ?', pron: 'zhuh puh pah-YAY pahr KART seel voo PLEH', en: 'Can I pay by card, please?' },
            { fr: 'C\u2019est le meilleur restaurant du quartier.', pron: 'seh luh muh-YUHR res-tau-RAHN dü kar-TYAY', en: 'It\u2019s the best restaurant in the neighbourhood.' },
            { fr: 'Vous avez ça en plus grand ?', pron: 'voo-zah-VAY sah ahn plü GRAHN', en: 'Do you have this in a bigger size?' },
            { fr: 'Je voudrais échanger celui-ci — il est trop petit.', pron: 'zhuh voo-DREHZ ay-shahn-ZHAY suh-gee-SEE eel eh troh puh-TEE', en: 'I\u2019d like to exchange this one — it\u2019s too small.' },
        ],
    },
};

// ── A2 · Travel & Transport ──────────────────────────────────────────────────
const a2Travel: LessonExtras = {
    warmup: [
        { q: 'Translate: "This coat is more expensive than the other."', a: 'Ce manteau est plus cher que l\u2019autre.' },
        { q: 'What are the two irregular comparatives?', a: 'bon → meilleur (better), mauvais → pire (worse).' },
        { q: 'How do you ask a price two ways?', a: 'Combien coûte… ? / Il coûte combien ?' },
        { q: 'Give the je form of devoir and its past participle.', a: 'je dois; dû (j\u2019ai dû = I had to).' },
        { q: '"I\u2019ll take this one" — say it.', a: 'Je voudrais celui-ci, s\u2019il vous plaît.' },
    ],
    verbTables: [
        {
            title: 'venir (to come) — present + the venir-de machine',
            note: 'venir de + infinitive = to have just done it. The ven- stem of present becomes viendr- in the future.',
            rows: [
                { label: 'je', form: 'viens', pron: 'vyen' },
                { label: 'tu', form: 'viens', pron: 'vyen' },
                { label: 'il / elle / on', form: 'vient', pron: 'vyen' },
                { label: 'nous', form: 'venons', pron: 'vuh-NOHN' },
                { label: 'vous', form: 'venez', pron: 'vuh-NAY' },
                { label: 'ils / elles', form: 'viennent', pron: 'vyen' },
                { label: 'passé récent', form: 'Je viens d\u2019arriver.', pron: 'zhuh vyen dah-ree-VAY' },
            ],
        },
        {
            title: 'prendre + transport, and devoir with travel',
            rows: [
                { label: 'take the train', form: 'Je prends le train.', pron: 'zhuh prahn luh TREHN' },
                { label: 'take the bus', form: 'Nous prenons le bus.', pron: 'noo pruh-NOHN luh BÜS' },
                { label: 'had to take a taxi', form: 'J\u2019ai dû prendre un taxi.', pron: 'zhay dü prahn-druhn tahk-SEE' },
                { label: 'fly', form: 'prendre l\u2019avion', pron: 'prahn-druh lah-VYOHN' },
            ],
        },
    ],
    useCases: [
        {
            word: 'en vs à — by train, on foot, by bike',
            note: 'Transport splits into two teams: EN for motorized vehicles (en avion, en bus, en voiture, en taxi, en métro), À for muscle power (à pied, à vélo, à cheval, à ski).',
            uses: [
                { use: 'en — motorized vehicles', examples: [{ fr: 'Je voyage en train / en avion / en bus.', en: 'I travel by train / plane / bus.' }] },
                { use: 'à — muscle-powered', examples: [{ fr: 'Je vais au bureau à pied / à vélo.', en: 'I go to the office on foot / by bike.' }] },
                { use: 'car exception: en voiture, NOT à voiture', examples: [{ fr: 'Elle est venue en voiture.', en: 'She came by car.' }] },
                { use: 'no article at all — the preposition replaces it', examples: [{ fr: 'NOT: en le train — always en train', en: 'the article disappears' }] },
            ],
        },
        {
            word: 'depuis — "for/since" with the PRESENT tense',
            note: 'The A2 timing trap: French uses the present for an action still running. "I\u2019ve been waiting for an hour" = j\u2019attends DEPUIS une heure (present, not past!).',
            uses: [
                { use: 'since — starting point', examples: [{ fr: 'J\u2019habite ici depuis 2020.', en: 'I\u2019ve lived here since 2020 (still do).' }] },
                { use: 'for — duration still running', examples: [{ fr: 'J\u2019attends depuis une heure !', en: 'I\u2019ve been waiting for an hour!' }] },
                { use: 'vs pendant — duration, finished', examples: [{ fr: 'J\u2019ai attendu pendant une heure. (done)', en: 'I waited for an hour.' }] },
                { use: 'vs il y a — ago', examples: [{ fr: 'Je suis arrivé il y a une heure.', en: 'I arrived an hour ago.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Travel sentences chain prepositions: en train, à pied, depuis midi. Read each line three times and tap the preposition on the desk.',
        lines: [
            { fr: 'Je prends le métro tous les jours.', pron: 'zhuh prahn luh may-TROH too lay ZHOOR', en: 'I take the metro every day.' },
            { fr: 'Nous sommes allés à Montréal en avion.', pron: 'noo som-zah-LAY ah mohn-ray-AL ah-nah-VYOHN', en: 'We went to Montreal by plane.' },
            { fr: 'J\u2019attends le bus depuis vingt minutes !', pron: 'zhah-TAHN luh BÜS duh-püee van mee-NÜT', en: 'I\u2019ve been waiting for the bus for twenty minutes!' },
            { fr: 'Le train part du quai neuf.', pron: 'luh trehn pahr dü keh NUHV', en: 'The train leaves from platform nine.' },
            { fr: 'Je viens de réserver un hôtel près de la gare.', pron: 'zhuh vyen duh ray-zair-VAY uhn oh-TEL preh duh lah GAHR', en: 'I\u2019ve just booked a hotel near the station.' },
            { fr: 'En cas de retard, appelez ce numéro.', pron: 'ahn kah duh ruh-TAHR ah-play suh noo-may-ROH', en: 'In case of delay, call this number.' },
        ],
    },
};

// ── A2 · Work & Daily Life ───────────────────────────────────────────────────
const a2Work: LessonExtras = {
    warmup: [
        { q: 'Which preposition for "by bike"? And "by car"?', a: 'à vélo (muscle power) — but en voiture (motorized exception).' },
        { q: 'How do you say "I\u2019ve been waiting for an hour" (still waiting)?', a: 'J\u2019attends depuis une heure. — present tense with depuis.' },
        { q: 'depuis vs pendant vs il y a — one phrase each.', a: 'depuis = since/still; pendant = for (finished); il y a = ago.' },
        { q: '"I\u2019ve just booked a hotel" — say it with venir de.', a: 'Je viens de réserver un hôtel.' },
        { q: 'Which team is "à ski" on?', a: 'Muscle power — à ski, à pied, à vélo, à cheval.' },
    ],
    verbTables: [
        {
            title: 'falloir — the impersonal "must" (il faut only)',
            note: 'falloir exists only in the il form: il faut. Past: il a fallu. Future: il faudra. The person who must do it follows with de + infinitive.',
            rows: [
                { label: 'present', form: 'Il faut travailler.', pron: 'eel foh trah-vah-YAY' },
                { label: 'past', form: 'Il a fallu partir tôt.', pron: 'eel ah fah-lü pahr-TEER toh' },
                { label: 'future', form: 'Il faudra attendre.', pron: 'eel foh-DRAH ah-tahn-druh' },
                { label: 'someone must do it', form: 'Il faut que je parte.', pron: 'eel foh kuh zhuh pahrt (subjunctive — A2+ preview)' },
            ],
        },
        {
            title: 'The four modals + infinitive — your sentence bracket',
            note: 'Modal present + infinitive = the workhorse of professional French. Negation wraps the MODAL, not the infinitive.',
            rows: [
                { label: 'pouvoir', form: 'Je peux télétravailler demain.', pron: 'zhuh puh tay-lay-trah-vah-YAY' },
                { label: 'vouloir', form: 'Je veux changer de poste.', pron: 'zhuh vuh shahn-ZHAY duh PUST' },
                { label: 'devoir', form: 'Je dois préparer un rapport.', pron: 'zhuh dwah pray-pah-RAY uhn rah-POR' },
                { label: 'savoir', form: 'Je sais parler en public.', pron: 'zhuh seh pahrl-LAY ahn pü-BLEEK' },
                { label: 'negation', form: 'Je ne peux pas venir lundi.', pron: 'zhuh nuh puh pah vuh-NEER' },
            ],
        },
        {
            title: 'travailler family — present',
            rows: [
                { label: 'je', form: 'travaille', pron: 'trah-VAH-yuh' },
                { label: 'tu', form: 'travailles', pron: 'trah-VAH-yuh' },
                { label: 'il / elle / on', form: 'travaille', pron: 'trah-VAH-yuh' },
                { label: 'nous', form: 'travaillons', pron: 'trah-vah-YOHN' },
                { label: 'vous', form: 'travaillez', pron: 'trah-vah-YAY' },
                { label: 'ils / elles', form: 'travaillent', pron: 'trah-VAH-yuh' },
            ],
        },
    ],
    useCases: [
        {
            word: 'il faut vs devoir — obligation, two flavors',
            uses: [
                { use: 'il faut — general, impersonal necessity', examples: [{ fr: 'Il faut être à l\u2019heure.', en: 'One must be on time.' }] },
                { use: 'devoir — personal duty', examples: [{ fr: 'Je dois être à l\u2019heure.', en: 'I have to be on time.' }] },
                { use: 'il faut + noun = need', examples: [{ fr: 'Il faut plus de temps.', en: 'We need more time.' }] },
                { use: 'past obligations', examples: [{ fr: 'Il a fallu que je parte. / J\u2019ai dû partir.', en: 'I had to leave.' }] },
            ],
        },
        {
            word: 'work-day phrases built on à / en / de',
            uses: [
                { use: 'en — duration or state', examples: [{ fr: 'Je suis en réunion / en congé.', en: 'I\u2019m in a meeting / on leave.' }] },
                { use: 'de — what you\u2019re in charge of', examples: [{ fr: 'Je m\u2019occupe de la facturation.', en: 'I handle the invoicing.' }] },
                { use: 'pour — purpose', examples: [{ fr: 'Je travaille pour une entreprise publique.', en: 'I work for a public company.' }] },
                { use: 'chercher à — trying to', examples: [{ fr: 'Elle cherche à améliorer son français.', en: 'She\u2019s trying to improve her French.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Work French is all about the bracket: modal…infinitive. Read each line stressing the infinitive at the end — that final beat is where the meaning lands.',
        lines: [
            { fr: 'Il faut que je parte, j\u2019ai une réunion.', pron: 'eel foh kuh zhuh pahrt zhay ün ray-ü-NYOHN', en: 'I have to go, I have a meeting.' },
            { fr: 'Je dois envoyer ce rapport avant midi.', pron: 'zhuh dwahZ ahn-vwah-YAY suh rah-POR ah-VAN mee-DEE', en: 'I have to send this report before noon.' },
            { fr: 'On peut se parler demain matin ?', pron: 'ohn puh suh pahrl-LAY duh-MAN mah-TAN', en: 'Can we talk tomorrow morning?' },
            { fr: 'Je ne peux pas venir lundi, je suis en congé.', pron: 'zhuh nuh puh pah vuh-NEER luhn-DEE zhuh süeeZ ahn kohn-ZHAY', en: 'I can\u2019t come Monday, I\u2019m on leave.' },
            { fr: 'Elle travaille depuis cinq ans dans cette entreprise.', pron: 'el trah-VYAY duh-püee sank AHN dahn SET ahn-truh-PREEZ', en: 'She\u2019s been working at this company for five years.' },
            { fr: 'Il faudra tout vérifier avant la publication.', pron: 'eel foh-DRAH too veh-ree-fee-AY ah-VAN lah pü-blee-kah-SYOHN', en: 'Everything will have to be checked before publishing.' },
        ],
    },
};

export const A2_EXTRAS: Record<string, LessonExtras> = {
    'A2:passe-compose': a2PasseCompose,
    'A2:imparfait': a2Imparfait,
    'A2:futur': a2Futur,
    'A2:shopping': a2Shopping,
    'A2:travel': a2Travel,
    'A2:work': a2Work,
};

// Merged registry — consumed by frenchLessons.ts
export const LESSON_EXTRAS: Record<string, LessonExtras> = {
    ...A1_EXTRAS,
    ...A2_EXTRAS,
};

export type { LessonExtras };
export const _tables = { ETRE_PRESENT, AVOIR_PRESENT, ALLER_PRESENT };
