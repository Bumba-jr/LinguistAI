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

// ── B1 · Passé Composé vs Imparfait ─────────────────────────────────────────
const b1PasseVsImparfait: LessonExtras = {
    warmup: [
        { q: 'How do you build the imparfait? Give the rule and one example.', a: 'nous-form stem + -ais/-ais/-ait/-ions/-iez/-aient: nous parlons → je parlais.' },
        { q: 'How do you build the passé composé of "elle / se lever"?', a: 'elle s\u2019est levée — reflexive → être auxiliary + agreement.' },
        { q: 'Name the tense each marker forces: hier / chaque jour / soudain / tous les matins.', a: 'hier → PC, chaque jour → imparfait, soudain → PC, tous les matins → imparfait.' },
        { q: 'How do you say "It was raining" and "It snowed (once)"?', a: 'Il pleuvait (imparfait — scene) vs il a plu (PC — event).' },
        { q: 'Translate: "I was reading when you called."', a: 'Je lisais quand tu as appelé. — imparfait + quand + PC.' },
    ],
    verbTables: [
        {
            title: 'The choice table: what forces which tense',
            note: 'Read the marker FIRST. The verb follows the marker, not the other way around.',
            rows: [
                { label: 'habit → imparfait', form: 'Chaque jour, je jouais dehors.', pron: 'chaque / tous les / d\u2019habitude' },
                { label: 'event → PC', form: 'Hier, j\u2019ai joué un match.', pron: 'hier / un jour / une fois / deux fois' },
                { label: 'sudden → PC', form: 'Soudain, le téléphone a sonné.', pron: 'soudain / tout à coup' },
                { label: 'scene → imparfait', form: 'Il neigeait et il y avait du brouillard.', pron: 'weather, time, age, feelings' },
                { label: 'interruption', form: 'Je dormais quand l\u2019alarme a sonné.', pron: 'imparfait quand PC — the combo' },
                { label: 'simultaneous', form: 'Pendant que je lisais, il dormait.', pron: 'both clauses imparfait' },
            ],
        },
        {
            title: 'il y avait vs il y a eu — scene vs event',
            rows: [
                { label: 'scene', form: 'Il y avait beaucoup de monde.', pron: 'eel yah-VEH' },
                { label: 'event', form: 'Il y a eu un accident.', pron: 'eel ya Ü' },
                { label: 'state', form: 'C\u2019était magnifique.', pron: 'say-TEH' },
                { label: 'event (spoken)', form: 'C\u2019a été génial !', pron: 'sah ay-TAY' },
            ],
        },
    ],
    useCases: [
        {
            word: 'quand, pendant que, comme — the three joins',
            note: 'The join decides nothing by itself; the ASPECT of each verb decides its tense. Ongoing action → imparfait, finished event → PC.',
            uses: [
                { use: 'quand — when (one action meets another)', examples: [{ fr: 'Je sortais quand il a commencé à pleuvoir.', en: 'I was leaving when it started to rain.' }] },
                { use: 'pendant que — while (two ongoing actions)', examples: [{ fr: 'Pendant que je lisais, il écoutait de la musique.', en: 'While I read, he listened to music.' }] },
                { use: 'comme — as / just as (formal narrative)', examples: [{ fr: 'Comme je descendais, j\u2019ai croisé le facteur.', en: 'As I was coming down, I ran into the postman.' }] },
                { use: 'two events back to back', examples: [{ fr: 'Quand il a sonné, j\u2019ai ouvert la porte.', en: 'When he rang, I opened the door. (both PC)' }] },
            ],
        },
        {
            word: 'state verbs vs action verbs — the hidden bias',
            uses: [
                { use: 'state verbs lean imparfait: être, avoir, savoir, penser, vouloir, pouvoir, croire', examples: [{ fr: 'Je ne savais pas quoi faire.', en: 'I didn\u2019t know what to do.' }] },
                { use: 'punctual verbs lean PC: partir, arriver, se lever, crier, tomber', examples: [{ fr: 'Elle a crié une seule fois.', en: 'She screamed once.' }] },
                { use: 'but context overrides: "j\u2019ai su" = I found out (change of state)', examples: [{ fr: 'Quand j\u2019ai su la vérité, j\u2019étais furieux.', en: 'When I found out the truth, I was furious.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Storytelling rhythm: the imparfait flows, the PC lands. Read each line, tapping the desk ONCE per passé composé verb.',
        lines: [
            { fr: 'Il faisait beau, les oiseaux chantaient, et soudain il a commencé à pleuvoir.', pron: 'eel fuh-ZEH bo… süe-DAN eel ah koh-mahn-SAY ah pluh-VWAHR', en: 'The weather was nice, birds were singing, and suddenly it started raining.' },
            { fr: 'Quand j\u2019étais petit, nous allions chez mes grands-parents chaque dimanche.', pron: 'kahn zhay-TEH puh-TEE noo-zah-LYOHN shay meh grahn-pah-RAHN', en: 'When I was little, we went to my grandparents\u2019 every Sunday.' },
            { fr: 'Je lisais tranquillement quand tu as frappé à la porte.', pron: 'zhuh lee-ZEH trahn-kee-yul-MAHN kahn tü ah frah-PAY', en: 'I was reading quietly when you knocked on the door.' },
            { fr: 'Il y avait une longue file ; il y a eu une alerte au feu.', pron: 'eel yah-VEH ün lohnzh FEEL eel ya Ü ün ah-LERT oh fuh', en: 'There was a long queue; there was a fire alert.' },
            { fr: 'Elle était fatiguée, alors elle s\u2019est couchée avant minuit.', pron: 'el ay-TEH fah-tee-GAY ah-LOR el suh koo-SHAY', en: 'She was tired, so she went to bed before midnight.' },
            { fr: 'D\u2019abord il a crié, ensuite il a éclaté en rires — c\u2019était sa façon de dire bonjour.', pron: 'dah-BOR eel ah kree-YAY ahn-SWEE eel ah ehk-lah-TAY', en: 'First he shouted, then he burst out laughing — that was his way of saying hello.' },
        ],
    },
};

// ── B1 · Conditional & Politeness ───────────────────────────────────────────
const b1Conditionnel: LessonExtras = {
    warmup: [
        { q: 'Give the futur simple of être and avoir (je form).', a: 'je serai, j\u2019aurai — the conditional reuses these stems.' },
        { q: 'How does French say "It was raining, so I stayed home"? (the pattern you\u2019ll reuse)', a: 'Il pleuvait, alors je suis resté(e) — background + event.' },
        { q: 'What does soudain trigger, and what triggers chaque jour?', a: 'soudain → PC; chaque jour → imparfait.' },
        { q: 'Name the two verbs where even French speakers slip on agreement.', a: 'Any être-verb question: elle s\u2019est levée, ils sont partis — agreement is graded.' },
        { q: 'How do you say "There were a lot of people"?', a: 'Il y avait beaucoup de monde. (scene → imparfait)' },
    ],
    verbTables: [
        {
            title: 'The conditional endings — one set, every verb',
            note: 'Futur stem + imparfait endings. The -ais/-ait/-aient all sound "eh"; -ions/-iez rhyme with "yon/yay".',
            rows: [
                { label: 'je', form: '-ais', pron: 'parlerais → pahrl-ruh-REH' },
                { label: 'tu', form: '-ais', pron: 'parlerais' },
                { label: 'il / elle / on', form: '-ait', pron: 'parlerait' },
                { label: 'nous', form: '-ions', pron: 'parlerions → pahrl-ruh-RYOHN' },
                { label: 'vous', form: '-iez', pron: 'parleriez → pahrl-ruh-RYAY' },
                { label: 'ils / elles', form: '-aient', pron: 'parleraient' },
            ],
        },
        {
            title: 'The politeness ladder — one request, four registers',
            rows: [
                { label: 'blunt', form: 'Ouvre la fenêtre.', pron: 'imperative — friends only' },
                { label: 'careful', form: 'Tu peux ouvrir la fenêtre ?', pron: 'present — neutral spoken' },
                { label: 'polite', form: 'Tu pourrais ouvrir la fenêtre ?', pron: 'conditional — softer' },
                { label: 'formal', form: 'Pourriez-vous ouvrir la fenêtre, s\u2019il vous plaît ?', pron: 'full politeness' },
                { label: 'written', form: 'Je vous serais reconnaissant de bien vouloir l\u2019ouvrir.', pron: 'letter register' },
            ],
        },
        {
            title: 'The si-system — all three patterns together',
            rows: [
                { label: 'real future', form: 'Si j\u2019ai le temps, je viendrai.', pron: 'si + présent → futur' },
                { label: 'unreal now', form: 'Si j\u2019avais le temps, je viendrais.', pron: 'si + imparfait → conditionnel' },
                { label: 'regret (past)', form: 'Si j\u2019avais eu le temps, je serais venu.', pron: 'si + PQP → cond. passé (B2 preview)' },
                { label: 'NEVER', form: 'Si j\u2019aurais… / si je viendrais…', pron: 'conditional banned after si' },
            ],
        },
    ],
    useCases: [
        {
            word: 'je voudrais — one phrase, many jobs',
            uses: [
                { use: 'ordering (food, tickets, services)', examples: [{ fr: 'Je voudrais un croissant et un café, s\u2019il vous plaît.', en: 'I\u2019d like a croissant and a coffee, please.' }] },
                { use: 'booking appointments', examples: [{ fr: 'Je voudrais prendre rendez-vous pour jeudi.', en: 'I\u2019d like to book an appointment for Thursday.' }] },
                { use: 'asking information softly', examples: [{ fr: 'Je voudrais savoir si la ligne est directe.', en: 'I\u2019d like to know whether the line is direct.' }] },
                { use: 'hypothetical wanting', examples: [{ fr: 'Je voudrais bien venir, mais je bosse.', en: 'I\u2019d love to come, but I\u2019m working.' }] },
            ],
        },
        {
            word: 'devoir & falloir — softening obligations',
            uses: [
                { use: 'hard duty: tu dois / il faut', examples: [{ fr: 'Tu dois confirmer avant vendredi. Il faut payer d\u2019avance.', en: 'You must confirm by Friday. Payment is required in advance.' }] },
                { use: 'soft advice: tu devrais / il faudrait', examples: [{ fr: 'Tu devrais confirmer avant vendredi.', en: 'You should confirm by Friday.' }] },
                { use: 'regret: j\u2019aurais dû', examples: [{ fr: 'J\u2019aurais dû écouter ma mère.', en: 'I should have listened to my mother.' }] },
                { use: 'team suggestion: on devrait / on pourrait', examples: [{ fr: 'On devrait réserver une table.', en: 'We should book a table.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'The conditional\u2019s final -ais/-ait/-aient all sound "eh" — the register lives in the ending. Read each line twice: once formal (vous forms), once casual (tu/on).',
        lines: [
            { fr: 'Je voudrais réserver une table pour deux, s\u2019il vous plaît.', pron: 'zhuh voo-DREH ray-zair-VAY ün TAH-bluh poor DUH', en: 'I\u2019d like to book a table for two, please.' },
            { fr: 'Pourriez-vous m\u2019indiquer où se trouve la salle 204 ?', pron: 'poo-ree voo-zan-dee-KAY oo suh TROOV lah sahl duh-sahn-KAHR', en: 'Could you tell me where room 204 is?' },
            { fr: 'Si j\u2019avais le temps, j\u2019apprendrais le japonais.', pron: 'see zhah-VEH luh tahn zhah-prahn-DREH luh zhah-poh-NEH', en: 'If I had time, I\u2019d learn Japanese.' },
            { fr: 'Tu devrais tester ce restaurant — on y mangerait très bien.', pron: 'tü duh-VREH tes-TAY suh res-tau-RAHN oh nee mahnzh-REH', en: 'You should try that restaurant — we\u2019d eat very well there.' },
            { fr: 'Ça m\u2019arrangerait de passer à 15 h plutôt qu\u2019à 14 h.', pron: 'sah mah-rahnzh-REH duh pah-SAY ah kahnz UR plü TAHN', en: 'It would suit me better to come at 3 pm rather than 2.' },
            { fr: 'J\u2019aurais aimé te dire au revoir, mais le train partait déjà.', pron: 'zhoh-REHZ eh-MAY tuh deer oh ruh-VWAHR', en: 'I would have liked to say goodbye to you, but the train was already leaving.' },
        ],
    },
};

// ── B1 · Relative Pronouns ──────────────────────────────────────────────────
const b1Relatifs: LessonExtras = {
    warmup: [
        { q: 'Give a conditional sentence for "if I were rich…" with the correct si-rule.', a: 'Si j\u2019étais riche, j\u2019achèterais une maison — imparfait after si, conditional in the main clause.' },
        { q: 'Turn into a polite request: "Ouvre la porte."', a: 'Pourriez-vous ouvrir la porte, s\u2019il vous plaît ? / Tu pourrais ouvrir la porte ?' },
        { q: 'Give the conditional of pouvoir (je form) and devoir (tu form).', a: 'je pourrais; tu devrais.' },
        { q: 'Which stem does the conditional borrow — imparfait\u2019s or futur\u2019s?', a: 'The futur\u2019s stem (ser-, aur-, ir-, voudr-…), with imparfait endings.' },
        { q: 'How do you politely soften "il faut payer d\u2019avance"?', a: 'Il faudrait payer d\u2019avance.' },
    ],
    verbTables: [
        {
            title: 'The decision table: qui / que / dont / où',
            note: 'Cover the relative and ask what the clause is missing: a subject (qui), an object (que), a de-phrase (dont), a place or time (où).',
            rows: [
                { label: 'subject → qui', form: 'L\u2019homme QUI parle est mon oncle.', pron: 'verb follows the gap' },
                { label: 'object → que', form: 'Le film QUE j\u2019ai vu est vieux.', pron: 'subject+verb follow; qu\u2019 before vowel' },
                { label: 'de-phrase → dont', form: 'Le film DONT je parle sort demain.', pron: 'parler de, se souvenir de, avoir besoin de' },
                { label: 'place → où', form: 'La ville OÙ je suis né…', pron: 'where' },
                { label: 'time → où', form: 'Le jour OÙ tu es arrivé…', pron: 'when — still où, never que' },
                { label: 'no noun → ce qui / ce que', form: 'CE QUI m\u2019étonne… / CE QUE tu dis…', pron: 'standalone "what"' },
            ],
        },
        {
            title: 'The dont-verbs — memorize this de-family',
            rows: [
                { label: 'parler de', form: 'le sujet dont il parle', pron: 'the subject he\u2019s talking about' },
                { label: 'se souvenir de', form: 'la chanson dont je me souviens', pron: 'the song I remember' },
                { label: 'avoir besoin de', form: 'le document dont j\u2019ai besoin', pron: 'the document I need' },
                { label: 'être content de', form: 'la nouvelle dont il est content', pron: 'the news he\u2019s happy about' },
                { label: 'se servir de', form: 'l\u2019outil dont je me sers', pron: 'the tool I use' },
                { label: 'être fier de', form: 'le projet dont elle est fière', pron: 'the project she\u2019s proud of' },
            ],
        },
    ],
    useCases: [
        {
            word: 'que — the agreement magnet',
            note: 'A fronted direct object before an avoir verb forces the participle to agree. The relative que creates exactly that position.',
            uses: [
                { use: 'feminine singular', examples: [{ fr: 'La ville que j\u2019ai visitée était belle.', en: 'The city I visited was beautiful.' }] },
                { use: 'masculine plural', examples: [{ fr: 'Les films que nous avons vus…', en: 'The films we saw…' }] },
                { use: 'feminine plural', examples: [{ fr: 'Les pommes qu\u2019elle a achetées…', en: 'The apples she bought…' }] },
                { use: 'no agreement (object after)', examples: [{ fr: 'Elle a acheté les pommes.', en: 'She bought the apples — object follows, no agreement' }] },
            ],
        },
        {
            word: 'où — the two-dimension pronoun',
            uses: [
                { use: 'physical place', examples: [{ fr: 'Le café où on s\u2019est rencontrés a fermé.', en: 'The café where we met has closed.' }] },
                { use: 'time point', examples: [{ fr: 'Le moment où tout a changé…', en: 'The moment everything changed…' }] },
                { use: 'extended: partout où, d\u2019où', examples: [{ fr: 'Partout où je vais, je prends des notes. D\u2019où viens-tu ?', en: 'Everywhere I go, I take notes. Where do you come from?' }] },
                { use: 'fronted time: le jour où vs aujourd\u2019hui', examples: [{ fr: 'Le jour où il a neigé, on est restés dedans.', en: 'The day it snowed, we stayed inside.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Relative pronouns are one-beat words — the music is in what surrounds them. Read each line slowly enough to hear the pronoun click into place.',
        lines: [
            { fr: 'Le livre que tu m\u2019as prêté est génial — je l\u2019ai lu en deux jours.', pron: 'luh LEE-vruh küh tü mah preh-TAY', en: 'The book you lent me is great — I read it in two days.' },
            { fr: 'La ville où je suis né a beaucoup changé depuis.', pron: 'lah VEEL oo zhuh süee NAY', en: 'The city where I was born has changed a lot since.' },
            { fr: 'Le prof dont je t\u2019ai parlé accepte encore des élèves.', pron: 'luh PROHF dohn zhuh tay pahr-LAY', en: 'The teacher I told you about is still taking students.' },
            { fr: 'Ce qui me frappe, c\u2019est la lumière de cette ville.', pron: 'suh KEE muh FRAP', en: 'What strikes me is the light of this city.' },
            { fr: 'Les amis dont j\u2019ai le plus besoin sont ceux qui écoutent.', pron: 'lay-zah-MEE dohn zhay luh plü buh-ZWAN', en: 'The friends I need most are the ones who listen.' },
            { fr: 'Il y a un moment où il faut choisir — et ce que je choisis, c\u2019est d\u2019avancer.', pron: 'eel ya ün moh-MAHN oo eel foh shwah-ZEER', en: 'There comes a moment when you must choose — and what I choose is to move forward.' },
        ],
    },
};

// ── B1 · Immigration & Settlement ───────────────────────────────────────────
const b1Immigration: LessonExtras = {
    warmup: [
        { q: 'Ask "Could you tell me where room 204 is?" formally.', a: 'Pourriez-vous m\u2019indiquer où se trouve la salle 204 ?' },
        { q: 'Give the three si-patterns with one example each.', a: 'si + présent → futur; si + imparfait → conditionnel; (B2: si + PQP → cond. passé).' },
        { q: 'Say "The book I lent you…" with a relative.', a: 'Le livre que je t\u2019ai prêté…' },
        { q: 'When do you use dont?', a: 'With de-verbs and de-phrases: parler de, se souvenir de, avoir besoin de, être content de.' },
        { q: 'Correct or not: "La ville que j\u2019ai visité" — and why?', a: 'Not correct — la ville is a fronted feminine object: que j\u2019ai visitée.' },
    ],
    verbTables: [
        {
            title: 'The obligation toolbox — three ways to say "must"',
            rows: [
                { label: 'impersonal', form: 'Il faut renouveler le titre de séjour.', pron: 'eel foh ruh-noo-vluh-LAY' },
                { label: 'personal', form: 'Je dois fournir trois documents.', pron: 'zhuh dwah foor-NEER' },
                { label: 'formal', form: 'Nous sommes obligés de tout traduire.', pron: 'noo som-zoh-BLEE-ZHAY' },
                { label: 'past duty', form: 'Il a fallu attendre deux mois.', pron: 'eel ah fah-lü' },
                { label: 'future duty', form: 'Il faudra payer les frais.', pron: 'eel foh-DRAH' },
                { label: 'softened', form: 'Il faudrait vérifier, non ?', pron: 'suggestive — see conditionnel' },
            ],
        },
        {
            title: 'The letter skeleton — five fixed parts',
            note: 'Every formal email reuses this frame. Learn it as blocks, not words.',
            rows: [
                { label: '1 · greeting', form: 'Madame, Monsieur,', pron: 'never "Cher" to an office' },
                { label: '2 · opening', form: 'Je me permets de vous écrire au sujet de…', pron: 'I am writing to you about…' },
                { label: '3 · request', form: 'Je vous prie de bien vouloir + infinitif', pron: 'I kindly ask you to…' },
                { label: '4 · waiting line', form: 'Dans l\u2019attente de votre réponse,…', pron: 'while awaiting your reply' },
                { label: '5 · closing', form: 'je vous prie d\u2019agréer… salutations distinguées', pron: 'the full formula, unchanged' },
            ],
        },
    ],
    useCases: [
        {
            word: 'depuis / pendant / il y a — the three duration prepositions',
            uses: [
                { use: 'depuis — started, still running → PRESENT', examples: [{ fr: 'J\u2019attends ma carte depuis trois mois.', en: 'I\u2019ve been waiting for my card for three months.' }] },
                { use: 'pendant — finished duration → past tense', examples: [{ fr: 'J\u2019ai attendu pendant trois mois. (reçu !)', en: 'I waited for three months. (got it!)' }] },
                { use: 'il y a — ago → past event', examples: [{ fr: 'J\u2019ai déposé le dossier il y a deux semaines.', en: 'I submitted the file two weeks ago.' }] },
                { use: 'pour — planned duration (future)', examples: [{ fr: 'Je pars au Japon pour deux semaines.', en: 'I\u2019m going to Japan for two weeks.' }] },
            ],
        },
        {
            word: 'the paperwork verbs — what offices actually write',
            uses: [
                { use: 'déposer — submit', examples: [{ fr: 'J\u2019ai déposé mon dossier le 3 février.', en: 'I submitted my file on Feb 3.' }] },
                { use: 'fournir — provide', examples: [{ fr: 'Vous devez fournir une preuve de domicile.', en: 'You must provide proof of address.' }] },
                { use: 'renouveler — renew', examples: [{ fr: 'Il faut renouveler le passeport avant l\u2019expiration.', en: 'The passport must be renewed before expiry.' }] },
                { use: 'transmettre / joindre — send / attach', examples: [{ fr: 'Je vous prie de trouver ci-joint les documents demandés.', en: 'Please find attached the requested documents.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Administrative French has a beat: obligation… details… request. Read each line with a tiny pause at the commas — offices hear your punctuation.',
        lines: [
            { fr: 'Bonjour, je vous appelle au sujet de mon dossier de résidence permanente.', pron: 'bohn-ZHOOR zhuh voo-zah-PEL oh soo-ZHEH duh mohn doh-SYAY', en: 'Hello, I\u2019m calling about my permanent-residence file.' },
            { fr: 'J\u2019habite à Ottawa depuis 2023 et j\u2019attends une réponse depuis avril.', pron: 'zhah-BEET ah oh-tah-WAH duh-püee duh-MEE vahnt vwa', en: 'I\u2019ve lived in Ottawa since 2023 and I\u2019ve been waiting for a reply since April.' },
            { fr: 'Pourriez-vous m\u2019indiquer quels documents sont encore requis ?', pron: 'poo-ree voo-zan-dee-KAY kehl doh-kü-MAHN', en: 'Could you tell me which documents are still required?' },
            { fr: 'Il faudrait que je renouvelle mon bail avant le premier du mois.', pron: 'eel foh-DREH kuh zhuh ruh-noo-VEL mohn BAH-yuh', en: 'I need to renew my lease before the first of the month.' },
            { fr: 'Dans l\u2019attente de votre réponse, je vous remercie par avance.', pron: 'dahn lahn-TAHNT duh voh-truh ray-POHNSS', en: 'While awaiting your reply, I thank you in advance.' },
            { fr: 'Je vous prie d\u2019agréer, Madame, Monsieur, mes salutations distinguées.', pron: 'zhuh voo pree dah-gray mah-DAM muh-SYUH', en: 'Please accept, Madam or Sir, my distinguished greetings.' },
        ],
    },
};

// ── B1 · Opinions & Arguments ───────────────────────────────────────────────
const b1Opinions: LessonExtras = {
    warmup: [
        { q: 'Report "Je suis fatigué" in indirect speech after "il a dit que…".', a: 'Il a dit qu\u2019il était fatigué. — présent slides to imparfait.' },
        { q: 'Report "Tu viens demain ?" after "il m\u2019a demandé…".', a: 'Il m\u2019a demandé si je venais le lendemain. — si + backshift + time shift.' },
        { q: 'Report "Ferme la porte !" after "il m\u2019a dit…".', a: 'Il m\u2019a dit de fermer la porte. — imperative → de + infinitive.' },
        { q: 'What does the passé composé become in reported speech?', a: 'The plus-que-parfait: a fini → avait fini.' },
        { q: 'When does NO backshift happen?', a: 'When the reporter is present: il dit que c\u2019est… — only past reporters shift.' },
    ],
    verbTables: [
        {
            title: 'The connector families — one argument, four moves',
            note: 'Every TCF opinion answer is these four moves in order. Memorize one example per family.',
            rows: [
                { label: 'claim', form: 'À mon avis, le télétravail est une chance.', pron: 'à mon avis / je pense que / il me semble que' },
                { label: 'cause', form: '…parce qu\u2019on gagne du temps.', pron: 'parce que / puisque / comme / car' },
                { label: 'consequence', form: '…donc les entreprises y gagnent.', pron: 'donc / alors / c\u2019est pourquoi' },
                { label: 'contrast', form: 'Cependant, tout le monde n\u2019y est pas prêt.', pron: 'cependant / en revanche / par contre' },
                { label: 'concession', form: 'Même si ce n\u2019est pas parfait, je continue.', pron: 'même si (+ indicatif)' },
                { label: 'conclusion', form: 'En conclusion, le jeu en vaut la chandelle.', pron: 'en conclusion / pour conclure / bref' },
            ],
        },
        {
            title: 'Cause words with attitude: grâce à vs à cause de',
            rows: [
                { label: 'positive', form: 'Grâce à ta préparation, tout a réussi.', pron: 'grahs ah' },
                { label: 'negative', form: 'À cause du trafic, j\u2019ai raté le train.', pron: 'ah KOHZ dü' },
                { label: 'neutral', form: 'En raison de la grève, service réduit.', pron: 'ahn rai-ZOHN — written/formal' },
                { label: 'lack', form: 'Faute de temps, on reporte.', pron: 'foht duh — for lack of' },
            ],
        },
    ],
    useCases: [
        {
            word: 'je pense que — indicative vs subjunctive',
            note: 'Affirmative belief + INDICATIVE. Negation or doubt flips it to the subjunctive (B2) — at B1, feel the border, stay indicative.',
            uses: [
                { use: 'affirmative → indicative', examples: [{ fr: 'Je pense que c\u2019est une bonne idée.', en: 'I think it\u2019s a good idea.' }] },
                { use: 'negated → subjunctive (preview)', examples: [{ fr: 'Je ne pense pas que ce soit une bonne idée.', en: 'I don\u2019t think it\u2019s a good idea.' }] },
                { use: 'doubt → subjunctive (preview)', examples: [{ fr: 'Je doute qu\u2019il vienne.', en: 'I doubt he\u2019s coming.' }] },
                { use: 'hedged → conditional', examples: [{ fr: 'Je dirais que c\u2019est correct.', en: 'I\u2019d say it\u2019s correct.' }] },
            ],
        },
        {
            word: 'agreement & disagreement — say it at the right strength',
            uses: [
                { use: 'total agreement', examples: [{ fr: 'Je suis tout à fait d\u2019accord.', en: 'I completely agree.' }] },
                { use: 'partial', examples: [{ fr: 'Je suis d\u2019accord sur le fond, pas sur la forme.', en: 'I agree on substance, not form.' }] },
                { use: 'polite disagreement', examples: [{ fr: 'Je vois ce que tu veux dire, mais…', en: 'I see what you mean, but…' }] },
                { use: 'firm refusal of the idea', examples: [{ fr: 'Là, je ne suis pas du tout d\u2019accord.', en: 'There, I don\u2019t agree at all.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Argument rhythm: claim loud, connectors quiet, conclusion firm. Read each line and physically point at each connector as you say it.',
        lines: [
            { fr: 'À mon avis, les transports en commun devraient être gratuits.', pron: 'ah mohn ah-VEE lay trahn-SPOR ahn kuh-MÜN', en: 'In my opinion, public transport should be free.' },
            { fr: 'Puisque la pollution augmente, il faut agir — donc chaque geste compte.', pron: 'püee-SKUH lah poh-lü-SYOHN ohg-MAHNT', en: 'Since pollution is rising, we must act — so every gesture counts.' },
            { fr: 'C\u2019est cher ; en revanche, la qualité est au rendez-vous.', pron: 'seh SHAIR ahn ruh-VAHNsh', en: 'It\u2019s expensive; on the other hand, the quality is there.' },
            { fr: 'Même si ce n\u2019est pas facile, je ne renonce pas à mon projet.', pron: 'mem see suh neh pah fah-SEEL', en: 'Even if it\u2019s not easy, I\u2019m not giving up my project.' },
            { fr: 'Je suis d\u2019accord sur le fond, mais je nuancerais deux points.', pron: 'zhuh süee dah-KOR sür luh FOHN', en: 'I agree on the substance, but I would qualify two points.' },
            { fr: 'En conclusion, les avantages l\u2019emportent largement sur les inconvénients.', pron: 'ahn kohn-klü-ZYOHN lay-zah-vahn-TAHZH', en: 'In conclusion, the advantages clearly outweigh the drawbacks.' },
        ],
    },
};

// ── B1 · Reported Speech ────────────────────────────────────────────────────
const b1Discours: LessonExtras = {
    warmup: [
        { q: 'Give one connector per family: cause, consequence, contrast, conclusion.', a: 'parce que; donc; cependant / en revanche; en conclusion.' },
        { q: 'grâce à or à cause de: "____ ta faute, on a raté le train."', a: 'À cause de ta faute — negative cause.' },
        { q: 'Fill: Je pense que le projet ______ (être) réaliste.', a: 'est — affirmative je pense que + indicative.' },
        { q: 'How do you disagree politely, one sentence?', a: 'Je vois ce que tu veux dire, mais je ne suis pas d\u2019accord. / Je nuancerais ce point.' },
        { q: 'Fronted reason: start with "it was late" — ?', a: 'Comme il était tard, nous avons pris un taxi.' },
    ],
    verbTables: [
        {
            title: 'The backshift machine — direct → reported',
            note: 'Runs ONLY when the reporting verb is past (a dit, a demandé). Present reporters leave everything in place.',
            rows: [
                { label: 'présent', form: '« Je suis là » → il a dit qu\u2019il ÉTAIT là', pron: 'est → était' },
                { label: 'passé composé', form: '« J\u2019ai fini » → il a dit qu\u2019il AVAIT fini', pron: 'PC → plus-que-parfait' },
                { label: 'futur', form: '« Je viendrai » → il a dit qu\u2019il VIENDRAIT', pron: 'futur → conditionnel' },
                { label: 'impératif', form: '« Attends ! » → il m\u2019a dit D\u2019ATTENDRE', pron: 'command → de + infinitive' },
                { label: 'yes/no question', form: '« Tu viens ? » → il a demandé SI je venais', pron: 'si + imparfait, no conditional' },
                { label: 'wh-question', form: '« Où vas-tu ? » → il a demandé où j\u2019ALLAIS', pron: 'wh-word kept, inversion dropped' },
            ],
        },
        {
            title: 'Time & place shifts in reported speech',
            rows: [
                { label: 'hier', form: '→ la veille', pron: 'lah veh-yuh' },
                { label: 'demain', form: '→ le lendemain', pron: 'luh lahn-duh-MAN' },
                { label: 'aujourd\u2019hui', form: '→ ce jour-là', pron: 'suh zhoor-LAH' },
                { label: 'il y a deux jours', form: '→ deux jours auparavant', pron: 'oh-pah-rah-VAHN' },
                { label: 'ici', form: '→ là-bas', pron: 'lah-BAH' },
            ],
        },
    ],
    useCases: [
        {
            word: 'reporting verbs — pick the one that carries attitude',
            uses: [
                { use: 'neutral: dire que / répondre que', examples: [{ fr: 'Il a répondu qu\u2019il ne savait pas.', en: 'He answered that he didn\u2019t know.' }] },
                { use: 'explanatory: expliquer / préciser que', examples: [{ fr: 'Elle a précisé que le bureau fermait à 17 h.', en: 'She specified the office closed at 5 pm.' }] },
                { use: 'official: déclarer / annoncer que', examples: [{ fr: 'On m\u2019a annoncé que le vol était retardé.', en: 'I was told the flight was delayed.' }] },
                { use: 'skeptical: prétendre que', examples: [{ fr: 'Il prétend qu\u2019il était malade.', en: 'He claims he was sick.' }] },
            ],
        },
        {
            word: 'si — three different jobs, one little word',
            uses: [
                { use: 'reported yes/no question', examples: [{ fr: 'Il m\u2019a demandé si j\u2019avais mon passeport.', en: 'He asked me if I had my passport.' }] },
                { use: 'hypothetical condition', examples: [{ fr: 'Si j\u2019avais su, j\u2019aurais réagi.', en: 'If I had known, I would have reacted.' }] },
                { use: 'real condition', examples: [{ fr: 'Si tu peux venir, préviens-moi.', en: 'If you can come, let me know.' }] },
                { use: 'never a "whether" after espérer/savoir with que', examples: [{ fr: 'Je ne sais pas SI il viendra — but je pense QU\u2019il viendra', en: 'si for alternatives, que for beliefs' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Reported speech runs in one breath: reporter… pause… reported clause. Read each line so the backshifted verb lands softly — it carries no stress.',
        lines: [
            { fr: 'Elle m\u2019a dit qu\u2019elle serait en route vers midi.', pron: 'el mah DEE kel suh-REH ahn ROOT vair mee-DEE', en: 'She told me she would be on the way around noon.' },
            { fr: 'Il m\u2019a demandé si j\u2019avais déjà réservé la salle.', pron: 'eel mah duh-mahn-DAY see zhah-VEH day-zhah lahl', en: 'He asked me if I had already booked the room.' },
            { fr: 'Le directeur a annoncé que la réunion serait reportée au lendemain.', pron: 'luh deer-ek-TUHR ah ah-non-SAY', en: 'The director announced the meeting would be postponed to the next day.' },
            { fr: 'Elle m\u2019a demandé de ne rien dire avant vendredi.', pron: 'el mah duh-mahn-DAY duh nuh RYEN deer', en: 'She asked me not to say anything before Friday.' },
            { fr: 'Il a expliqué qu\u2019il avait raté le dernier métro la veille.', pron: 'eel ah eh-splee-KAY kee-lah-VEH rah-TAY', en: 'He explained he had missed the last metro the day before.' },
            { fr: 'On m\u2019a répondu que le dossier était complet et qu\u2019on me rappellerait.', pron: 'ohn mah ray-pohn-DÜ kuh luh doh-SYAY', en: 'I was told the file was complete and that they would call me back.' },
        ],
    },
};

export const B1_EXTRAS: Record<string, LessonExtras> = {
    'B1:passe-vs-imparfait': b1PasseVsImparfait,
    'B1:conditionnel': b1Conditionnel,
    'B1:relatifs': b1Relatifs,
    'B1:immigration': b1Immigration,
    'B1:opinions': b1Opinions,
    'B1:discours': b1Discours,
};

// ── B2 · Subjunctive Masterclass ────────────────────────────────────────────
const b2Subjonctif: LessonExtras = {
    warmup: [
        { q: 'Report: "Je viendrai demain" after "il a dit que…".', a: 'Il a dit qu\u2019il viendrait le lendemain — futur → conditionnel + time shift.' },
        { q: 'Counter-argument hinge: concede it\u2019s expensive, bounce back. One sentence.', a: 'Certes, c\u2019est coûteux ; néanmoins, les bénéfices l\u2019emportent.' },
        { q: 'Upgrade these B1 connectors to B2: donc, mais, parce que.', a: 'par conséquent, néanmoins/toutefois, car/en effet.' },
        { q: 'Give the subjunctive… wait — first: indicative or subjunctive after "il est probable que"?', a: 'Indicative — probable = positive expectation. Only doubt takes the subjunctive.' },
        { q: 'One sentence with l\u2019emporter sur.', a: 'Les avantages l\u2019emportent sur les inconvénients.' },
    ],
    verbTables: [
        {
            title: 'Subjunctive endings — one set, built from the ils-stem',
            note: 'ils parlent → parl- → que je parle. The nous/vous forms take the ILS stem too, plus -i-: que nous parlions, que vous parliez.',
            rows: [
                { label: 'que je', form: '-e', pron: 'parle → pahrl' },
                { label: 'que tu', form: '-es', pron: 'parles → pahrl' },
                { label: 'qu\u2019il / elle', form: '-e', pron: 'parle → pahrl' },
                { label: 'que nous', form: '-ions', pron: 'parlions → pahrl-YOHN' },
                { label: 'que vous', form: '-iez', pron: 'parliez → pahrl-YAY' },
                { label: 'qu\u2019ils / elles', form: '-ent', pron: 'parlent → pahrl' },
            ],
        },
        {
            title: 'The seven irregular stems — chant them',
            rows: [
                { label: 'être', form: 'que je sois', pron: 'SWAH' },
                { label: 'avoir', form: 'que j\u2019aie', pron: 'EH' },
                { label: 'aller', form: 'que j\u2019aille', pron: 'EYE' },
                { label: 'faire', form: 'que je fasse', pron: 'FAHSS' },
                { label: 'pouvoir', form: 'que je puisse', pron: 'püEESS' },
                { label: 'savoir', form: 'que je sache', pron: 'SAHSS' },
                { label: 'vouloir', form: 'que je veuille', pron: 'vuh-EE-yuh' },
            ],
        },
        {
            title: 'The belief dial — what keeps the indicative',
            rows: [
                { label: 'affirmative belief', form: 'Je pense qu\u2019il VIENT.', pron: 'indicative' },
                { label: 'negated belief', form: 'Je ne pense pas qu\u2019il VIENNE.', pron: 'subjunctive' },
                { label: 'doubt', form: 'Je doute qu\u2019il VIENNE.', pron: 'subjunctive' },
                { label: 'confident hope', form: 'J\u2019espère qu\u2019il VIENDRA.', pron: 'indicative — even in the future!' },
                { label: 'probability', form: 'Il est probable que ce SERA dur.', pron: 'indicative' },
                { label: 'possibility', form: 'Il est possible que ce SOIT dur.', pron: 'subjunctive' },
            ],
        },
    ],
    useCases: [
        {
            word: 'il faut que vs devoir vs il faut + infinitif — three levels of must',
            uses: [
                { use: 'same subject → il faut + infinitive (no subjunctive)', examples: [{ fr: 'Il faut partir tôt.', en: 'We have to leave early.' }] },
                { use: 'different subject → il faut que + subjunctive', examples: [{ fr: 'Il faut que TU partieS tôt.', en: 'YOU have to leave early.' }] },
                { use: 'personal duty → devoir + infinitive', examples: [{ fr: 'Tu dois partir tôt.', en: 'You must leave early.' }] },
                { use: 'spoken shortcut → Faut que + subjunctive', examples: [{ fr: 'Faut que j\u2019y aille !', en: 'Gotta go!' }] },
            ],
        },
        {
            word: 'avant que vs après que — one subjunctive, one indicative',
            uses: [
                { use: 'avant que — anticipates → subjunctive (+ expletive ne)', examples: [{ fr: 'Pars avant qu\u2019il (ne) pleuve.', en: 'Leave before it rains.' }] },
                { use: 'après que — reports a fact → indicative', examples: [{ fr: 'On est sortis après qu\u2019il a plu.', en: 'We went out after it rained.' }] },
                { use: 'jusqu\u2019à ce que — limit → subjunctive', examples: [{ fr: 'Attends jusqu\u2019à ce qu\u2019il revienne.', en: 'Wait until he comes back.' }] },
                { use: 'depuis que — ongoing fact → indicative', examples: [{ fr: 'Je dors mieux depuis que j\u2019ai déménagé.', en: 'I sleep better since I moved.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'The subjunctive sounds soft and final: -e endings are silent, so qu\u2019il parte and il part sound nearly identical — the trigger word carries the meaning. Read each line, leaning on the trigger.',
        lines: [
            { fr: 'Il faut que tu viennes avant qu\u2019il ne soit trop tard.', pron: 'eel foh kuh tü VYEN ah-VAN keel nuh SWAH', en: 'You must come before it\u2019s too late.' },
            { fr: 'Bien que ce soit cher, je suis content qu\u2019elle ait accepté.', pron: 'byan kuh suh SWAH SHAIR', en: 'Although it\u2019s expensive, I\u2019m glad she accepted.' },
            { fr: 'Je te le répète pour que tu puisses le répéter.', pron: 'zhuh tuh luh ray-PET poor kuh tü püEESS', en: 'I\u2019m repeating it so that you can repeat it.' },
            { fr: 'Je doute qu\u2019il fasse beau demain, mais j\u2019espère qu\u2019il fera beau.', pron: 'zhuh doot keel FAHSS boh duh-MAN', en: 'I doubt the weather will be nice tomorrow, but I hope it will be.' },
            { fr: 'Faut que j\u2019y aille — on veut que tu restes !', pron: 'foh kuh zhy EYE oh vuh kuh tü REST', en: 'Gotta go! — We want you to stay!' },
            { fr: 'À condition que vous soyez là à l\u2019heure, tout se passera bien.', pron: 'ah koh-dee-SYOHN kuh voo swah-YAY', en: 'Provided you\u2019re there on time, everything will go well.' },
        ],
    },
};

// ── B2 · Formal vs Informal Register ────────────────────────────────────────
const b2Registre: LessonExtras = {
    warmup: [
        { q: 'Form the subjunctive: "Il faut qu\u2019il (faire) attention."', a: 'qu\u2019il fasse attention — irregular stem fass-.' },
        { q: 'Indicative or subjunctive: "J\u2019espère que tu (venir) demain"?', a: 'Indicative — j\u2019espère que tu viendras (future).' },
        { q: 'Concede and bounce: "the delay is real… but solutions exist."', a: 'Certes, le retard est réel ; néanmoins, des solutions existent.' },
        { q: 'What does bien que take after it?', a: 'The subjunctive: bien que ce soit difficile.' },
        { q: 'Give one upgraded pair: donc → ? ; mais → ?', a: 'par conséquent ; néanmoins / toutefois.' },
    ],
    verbTables: [
        {
            title: 'The four register dials — one sentence, both ends',
            rows: [
                { label: 'pronouns', form: 'Nous allons partir. / On va partir.', pron: 'written vs spoken' },
                { label: 'negation', form: 'Je ne sais pas. / Je sais pas.', pron: 'ne kept vs dropped' },
                { label: 'questions', form: 'Viendrez-vous ? / Tu viens ?', pron: 'inversion vs intonation' },
                { label: 'vocabulary', form: 'Cela m\u2019intéresse. / Ça m\u2019intéresse.', pron: 'cela vs ça' },
                { label: 'full formal', form: 'Nous ne savons pas si vous viendrez.', pron: 'all four left' },
                { label: 'full casual', form: 'On sait pas si tu viens ?', pron: 'all four right' },
            ],
        },
        {
            title: 'Vocabulary ladders — the same idea at three levels',
            rows: [
                { label: 'work', form: 'taf → boulot → travail/emploi', pron: 'casual → neutral → formal' },
                { label: 'money', form: 'pognon → fric → argent/fonds', pron: 'never fric in letters' },
                { label: 'car', form: 'bagnole → caisse → voiture/véhicule', pron: 'bagnole = very slang' },
                { label: 'come', form: 'venir → venir → se déplacer', pron: 'the formal twist' },
                { label: 'say', form: 'dire → dire → informer/faire savoir', pron: 'informer QUE' },
                { label: 'clothes', form: 'fringues → habits → vêtements', pron: 'fringues = slang' },
            ],
        },
        {
            title: 'Email formulas — opens and closes ranked',
            rows: [
                { label: 'friends', form: 'Coucou ! … À plus !', pron: 'texting register' },
                { label: 'casual work', form: 'Bonjour Karim, … Cordialement,', pron: 'the everyday default' },
                { label: 'warm-formal', form: 'Bonjour Madame Roy, … Bien à vous,', pron: 'vous-relationship' },
                { label: 'administrative', form: 'Madame, Monsieur, … Je vous prie d\u2019agréer…', pron: 'unknown recipient' },
            ],
        },
    ],
    useCases: [
        {
            word: 'nous vs on — the single most visible register dial',
            uses: [
                { use: 'on — the spoken we', examples: [{ fr: 'On va au ciné ce soir ?', en: 'Shall we go to the movies tonight?' }] },
                { use: 'nous — the written/formal we', examples: [{ fr: 'Nous vous informons que le local fermera tôt.', en: 'We inform you the building will close early.' }] },
                { use: 'on = one/people in general (both registers)', examples: [{ fr: 'Ici, on parle français.', en: 'French is spoken here.' }] },
                { use: 'nous = ceremonial we (royal/institutional)', examples: [{ fr: 'Nous, soussignés, certifions que…', en: 'We, the undersigned, certify that…' }] },
            ],
        },
        {
            word: 'tu vs vous — beyond the A1 rule',
            uses: [
                { use: 'vous to one adult stranger — default', examples: [{ fr: 'Bonjour, vous cherchez quelque chose ?', en: 'Hello, are you looking for something?' }] },
                { use: 'tu among colleagues — ask first', examples: [{ fr: 'On peut se tutoyer ?', en: 'Shall we use tu?' }] },
                { use: 'vous for one senior official — always', examples: [{ fr: 'Monsieur le Directeur, pourriez-vous…', en: 'Dear Director, could you…' }] },
                { use: 'flipping by mistake is a social event', examples: [{ fr: 'Pardon, je ne voulais pas vous tutoyer.', en: 'Sorry, I didn\u2019t mean to use tu with you.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Register lives in rhythm: formal lines stretch, casual lines rush. Read each pair of lines twice — once stiff, once relaxed — and feel the same words change shape.',
        lines: [
            { fr: 'Nous ne savons pas si nous pourrons nous déplacer.', pron: 'noo nuh sah-VOHN pah see noo poor-ROHN', en: 'We don\u2019t know whether we\u2019ll be able to come. (formal)' },
            { fr: 'On sait pas si on pourra venir.', pron: 'ohn seh PAH see ohn poo-RAH', en: 'We dunno if we can come. (casual)' },
            { fr: 'Veuillez trouver ci-joint les documents demandés.', pron: 'vuh-YAY troo-VAY see-ZHWAN', en: 'Please find attached the requested documents.' },
            { fr: 'Tiens, je t\u2019envoie les papiers tout à l\u2019heure.', pron: 'TYAN zhuh tah-vwah lay pah-PYAY', en: 'Hey, I\u2019ll send you the papers later.' },
            { fr: 'Je vous remercie par avance de votre compréhension.', pron: 'zhuh voo ruh-mair-SEE pah-zah-VAHNSS', en: 'I thank you in advance for your understanding.' },
            { fr: 'Merci d\u2019avance, c\u2019est top !', pron: 'mair-SEE dah-VAHNSS seh TOP', en: 'Thanks in advance, that\u2019s great! (casual)' },
        ],
    },
};

// ── B2 · Structured Argumentation ───────────────────────────────────────────
const b2Argumentation: LessonExtras = {
    warmup: [
        { q: 'Move all four register dials into one formal sentence for "On sait pas si on viendra."', a: 'Nous ne savons pas si nous viendrons.' },
        { q: 'Which email close for a stranger at the mairie?', a: 'Madame, Monsieur, … Je vous prie d\u2019agréer mes salutations distinguées.' },
        { q: 'taf, fric, bagnole — upgrade all three.', a: 'travail/emploi, argent/fonds, voiture/véhicule.' },
        { q: 'Veuillez + ? — build one full sentence.', a: 'Veuillez trouver ci-joint les documents demandés.' },
        { q: 'When is on correct in formal writing?', a: 'As "people in general": Ici, on parle français. Never as the institutional "we".' },
    ],
    verbTables: [
        {
            title: 'ORECC — the skeleton and its connectors',
            rows: [
                { label: 'O — opinion', form: 'Je considère que / il me semble que', pron: 'state it plainly' },
                { label: 'R — reasons', form: 'En effet… / car…', pron: 'proof-introducer' },
                { label: 'E — examples', form: 'Notamment… / à l\u2019image de…', pron: 'concrete instance' },
                { label: 'C — counter', form: 'Certes… mais / néanmoins', pron: 'concede AND return' },
                { label: 'C — conclusion', form: 'En somme… / l\u2019emportent sur', pron: 'one-sentence verdict' },
            ],
        },
        {
            title: 'The B1 → B2 connector upgrade table',
            rows: [
                { label: 'donc', form: '→ par conséquent', pron: 'ahn kohn-SEE-kwahn' },
                { label: 'mais', form: '→ néanmoins / toutefois', pron: 'one per joint' },
                { label: 'parce que', form: '→ car / en effet', pron: 'written reasons' },
                { label: 'beaucoup de', form: '→ de nombreux / de nombreuses', pron: 'essay quantifier' },
                { label: 'très', form: '→ particulièrement', pron: 'measured intensity' },
                { label: 'c\u2019est bien', form: '→ cela constitue un progrès', pron: 'verdict verbs' },
            ],
        },
    ],
    useCases: [
        {
            word: 'certes… mais — the hinge, used properly',
            uses: [
                { use: 'concede a real point', examples: [{ fr: 'Certes, le projet coûte cher.', en: 'Admittedly, the project is expensive.' }] },
                { use: 'label the objection', examples: [{ fr: 'On objectera que les délais sont longs.', en: 'One might object that the delays are long.' }] },
                { use: 'bounce back', examples: [{ fr: 'Néanmoins, l\u2019investissement se rentabilise.', en: 'Nevertheless, the investment pays for itself.' }] },
                { use: 'outweigh and close', examples: [{ fr: 'Les bénéfices l\u2019emportent largement sur les coûts.', en: 'The benefits clearly outweigh the costs.' }] },
            ],
        },
        {
            word: 'qualification kit — measured claims score higher',
            uses: [
                { use: 'partial agreement', examples: [{ fr: 'Dans une certaine mesure, c\u2019est exact.', en: 'To a certain extent, that\u2019s right.' }] },
                { use: 'condition', examples: [{ fr: 'À condition que le financement suive.', en: 'Provided the funding follows.' }] },
                { use: 'soft probability', examples: [{ fr: 'Sans doute cette mesure aidera-t-elle.', en: 'This measure will no doubt help.' }] },
                { use: 'it depends', examples: [{ fr: 'Tout dépend du contexte.', en: 'It all depends on the context.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Essay rhythm: claim — pause — proof — pause — bend — bounce. Read each line with a comma-length pause at every connector and stress the connector itself.',
        lines: [
            { fr: 'Je considère que cette mesure constitue un progrès notable.', pron: 'zhuh kohn-SEE-DAIR kuh set meh-ZÜR', en: 'I consider this measure a notable step forward.' },
            { fr: 'En effet, les chiffres confirment la tendance observée depuis deux ans.', pron: 'ahn eh-FEH lay SHEE-fruh', en: 'Indeed, the figures confirm the trend observed for two years.' },
            { fr: 'Certes, des réticences subsistent ; néanmoins, elles ne suffisent pas à condamner le projet.', pron: 'sairt day ray-tee-SAHNSS süb-SEEST', en: 'Admittedly, reservations remain; nevertheless, they don\u2019t suffice to condemn the project.' },
            { fr: 'Bien que la solution soit imparfaite, elle mérite d\u2019être soutenue.', pron: 'byan kuh lah soh-lü-SYOHN swah-zam-pair-FET', en: 'Although the solution is imperfect, it deserves support.' },
            { fr: 'Il convient de nuancer ce constat : tout dépend du territoire.', pron: 'eel kohn-VYEN duh nü-ahn-SAY', en: 'This finding should be qualified: it all depends on the region.' },
            { fr: 'En somme, les avantages l\u2019emportent largement sur les contraintes.', pron: 'ahn SAWM lay-zah-vahn-TAHZH', en: 'In short, the advantages clearly outweigh the constraints.' },
        ],
    },
};

// ── B2 · Passive Voice & Complex Clauses ────────────────────────────────────
const b2Passif: LessonExtras = {
    warmup: [
        { q: 'Build the hinge: concede the cost, bounce back with néanmoins.', a: 'Certes, c\u2019est coûteux ; néanmoins, cela se rentabilise rapidement.' },
        { q: 'One bien que + subjunctive sentence about the weather.', a: 'Bien qu\u2019il pleuve, la collecte aura lieu. (pleuve = subj of pleuvoir)' },
        { q: 'Upgrade: "Il y a beaucoup de problèmes" → essay register.', a: 'De nombreux défis se posent.' },
        { q: 'Qualify a claim softly, two ways.', a: 'Dans une certaine mesure… / tout dépend du contexte.' },
        { q: 'What connector opens a proof?', a: 'En effet — followed by the fact or figure.' },
    ],
    verbTables: [
        {
            title: 'The passive across tenses — la loi / voter',
            note: 'être in the tense you need + agreeing participle. Agreement never rests.',
            rows: [
                { label: 'présent', form: 'La loi est votée.', pron: 'eh voh-TAY' },
                { label: 'passé composé', form: 'La loi a été votée.', pron: 'ah ay-TAY voh-TAY' },
                { label: 'imparfait', form: 'La loi était votée.', pron: 'ay-TEH' },
                { label: 'futur', form: 'La loi sera votée.', pron: 'suh-RAH' },
                { label: 'modal', form: 'La loi doit être votée.', pron: 'dwah ETR' },
                { label: 'agent', form: 'La loi a été votée par l\u2019assemblée.', pron: 'pahr lah-sahn-BLAY' },
            ],
        },
        {
            title: 'Gerund formation — nous-present + -ant',
            rows: [
                { label: 'nous parlons', form: 'en parlant', pron: 'ahn pahr-LAHN' },
                { label: 'nous faisons', form: 'en faisant', pron: 'ahn fuh-ZAHN' },
                { label: 'nous prenons', form: 'en prenant', pron: 'ahn pruh-NAHN' },
                { label: 'nous mangeons', form: 'en mangeant', pron: 'ahn mahn-ZHAHN' },
                { label: 'nous étudions', form: 'en étudiant', pron: 'ahn-nay-tü-DYAHN' },
            ],
        },
    ],
    useCases: [
        {
            word: 'passive vs se-passive — who is the doer?',
            uses: [
                { use: 'specific doer → active is better', examples: [{ fr: 'Le comité a approuvé la proposition.', en: 'The committee approved the proposal.' }] },
                { use: 'important result, doer obvious → passive', examples: [{ fr: 'La proposition a été approuvée hier.', en: 'The proposal was approved yesterday.' }] },
                { use: 'doer = people in general → se-passive', examples: [{ fr: 'Ce fromage se mange jeune.', en: 'This cheese is eaten young.' }] },
                { use: 'rules and customs → se-passive or impersonal', examples: [{ fr: 'Ça ne se fait pas ici. / Il est interdit de fumer.', en: 'That\u2019s not done here. / Smoking is forbidden.' }] },
            ],
        },
        {
            word: 'getting things done — se faire vs faire faire',
            uses: [
                { use: 'se faire + inf. — it happens TO you', examples: [{ fr: 'Il s\u2019est fait avoir. / Elle s\u2019est fait opérer.', en: 'He got fooled. / She got surgery.' }] },
                { use: 'faire + inf. — you arranged it', examples: [{ fr: 'J\u2019ai fait réparer la voiture.', en: 'I had the car repaired.' }] },
                { use: 'faire faire — you commissioned it', examples: [{ fr: 'Elle a fait faire un costume.', en: 'She had a suit made.' }] },
                { use: 'passive of causation', examples: [{ fr: 'La maison a été construite par son père.', en: 'The house was built by her father.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Official French lands on the participle: a été votée — the last syllable carries the agreement. Read each line stressing that final beat.',
        lines: [
            { fr: 'La décision a été prise hier soir, après consultation.', pron: 'lah day-see-ZYOHN ah ay-TAY PREEZ', en: 'The decision was made last night, after consultation.' },
            { fr: 'Les travaux seront effectués au printemps par une entreprise locale.', pron: 'lay trah-VOH suh-ROHNZ eh-fek-TÜAY', en: 'The works will be carried out in spring by a local company.' },
            { fr: 'Ce produit se vend très bien — ça se dit même à l\u2019international.', pron: 'suh proh-DÜEE suh VAHN', en: 'This product sells very well — it\u2019s even said internationally.' },
            { fr: 'En relisant chaque paragraphe, vous éliminerez la plupart des fautes.', pron: 'ahn ruh-LEE-ZAHN shahk pah-rah-GRAHF', en: 'By rereading each paragraph, you\u2019ll eliminate most mistakes.' },
            { fr: 'Après avoir vérifié les données, le contrôleur a signé le rapport.', pron: 'ah-PRAYZ ah-VWAHR vay-ree-FYAY lay doh-NAY', en: 'After checking the data, the controller signed the report.' },
            { fr: 'Il s\u2019est fait rembourser sans difficulté — le formulaire a été accepté.', pron: 'eel seh feh ruh-boor-SAY', en: 'He got his refund without difficulty — the form was accepted.' },
        ],
    },
};

// ── B2 · Canadian Society Themes ────────────────────────────────────────────
const b2Societe: LessonExtras = {
    warmup: [
        { q: 'Passive in the future: "On construira l\u2019école ici."', a: 'L\u2019école sera construite ici — être + agreeing participle.' },
        { q: 'Se-passive or passive? "This cheese (eat) young."', a: 'Ce fromage se mange jeune — generic doer → se-passive.' },
        { q: 'Gerund: "You learn by practising."', a: 'On apprend en pratiquant — nous-pratiquons → en pratiquant.' },
        { q: 'Sequence opener for "After checking, she signed."', a: 'Après avoir vérifié, elle a signé.' },
        { q: 'Agent preposition for feelings: "liked BY all"?', a: 'aimé DE tous — feeling verbs take de.' },
    ],
    verbTables: [
        {
            title: 'The trend machine — verbs and their nouns',
            rows: [
                { label: 'rise', form: 'augmenter / la hausse', pron: 'ohg-mahn-TAY / lah OHSS' },
                { label: 'fall', form: 'baisser / la baisse', pron: 'beh-SAY / lah BEHSS' },
                { label: 'progress', form: 'progresser / les progrès', pron: 'proh-greh-SAY' },
                { label: 'stall', form: 'stagner / la stagnation', pron: 'stahg-NAY' },
                { label: 'explode', form: 'exploser / le boom', pron: 'ehk-sploy-ZAY' },
                { label: 'lengthen', form: 's\u2019allonger / l\u2019allongement', pron: 'sah-lohn-ZHAY' },
            ],
        },
        {
            title: 'The de / à dial — by vs up to',
            rows: [
                { label: 'by', form: 'augmenter DE 5 %', pron: 'the size of the change' },
                { label: 'up to', form: 'monter À 5 %', pron: 'the endpoint' },
                { label: 'from… to', form: 'passer de 3 % à 5 %', pron: 'both at once' },
                { label: 'reach', form: 'atteindre un record', pron: 'ah-TAN-druh' },
                { label: 'half a point', form: 'un demi-point', pron: 'masc — demie only for heure' },
            ],
        },
        {
            title: 'Commentary ladder — impersonal frames',
            rows: [
                { label: 'observed fact', form: 'On constate que + indicatif', pron: 'kohns-TAHT' },
                { label: 'consensus', form: 'Il est admis que + indicatif', pron: 'ah-MEE' },
                { label: 'emphasis', form: 'Il convient de souligner que…', pron: 'soo-lee-NYAY' },
                { label: 'explanation', form: 'Ce phénomène s\u2019explique par…', pron: 'feh-noh-MEN' },
                { label: 'possibility', form: 'Il est possible que + SUBJONCTIF', pron: 'pos-EE-bluh' },
            ],
        },
    ],
    useCases: [
        {
            word: 'statistics — the four frames every essay needs',
            uses: [
                { use: 'rate of', examples: [{ fr: 'Le taux de chômage atteint 5,2 %.', en: 'The unemployment rate stands at 5.2%.' }] },
                { use: 'rise of X %', examples: [{ fr: 'Une hausse de 10 % des loyers a été enregistrée.', en: 'A 10% rise in rents was recorded.' }] },
                { use: 'about / nearly', examples: [{ fr: 'Environ 40 % des nouveaux arrivants… / Près de 200 000 personnes…', en: 'About 40% of newcomers… / Nearly 200,000 people…' }] },
                { use: 'fractions', examples: [{ fr: 'Un tiers des logements sont locatifs. (un demi, un quart, un tiers)', en: 'A third of homes are rented.' }] },
            ],
        },
        {
            word: 'the four society clusters — one sentence each',
            uses: [
                { use: 'health', examples: [{ fr: 'Les délais d\u2019attente aux urgences s\u2019allongent en raison de la pénurie de médecins.', en: 'ER waiting times are lengthening due to the doctor shortage.' }] },
                { use: 'work', examples: [{ fr: 'L\u2019embauche a repris, mais la pénurie de main-d\u2019œuvre persiste.', en: 'Hiring has picked up, but the labour shortage persists.' }] },
                { use: 'housing', examples: [{ fr: 'La pénurie de logements frappe surtout les grandes villes.', en: 'The housing shortage hits big cities hardest.' }] },
                { use: 'environment', examples: [{ fr: 'Grâce au recyclage, les déchets diminuent, mais les émissions stagnent.', en: 'Thanks to recycling, waste is falling, but emissions are stalling.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'News-anchor voice: flat, even, numbers crisp. Read each line as if reading a Statistique Canada headline — no drama, all precision.',
        lines: [
            { fr: 'Le taux de chômage est passé de 6 % à 4,8 % en deux ans.', pron: 'luh TOH duh shoh-MAHZH', en: 'The unemployment rate went from 6% to 4.8% in two years.' },
            { fr: 'Une hausse de 12 % des loyers a été enregistrée à Toronto.', pron: 'ün OHSS duh dooz uh-RAHN', en: 'A 12% rise in rents was recorded in Toronto.' },
            { fr: 'Les délais d\u2019attente aux urgences s\u2019allongent, en particulier en hiver.', pron: 'lay day-LEH dah-TAHNT oh-zür-ZHAHNSS', en: 'Waiting times in the ER are lengthening, especially in winter.' },
            { fr: 'Ce phénomène s\u2019explique par le vieillissement de la population.', pron: 'suh feh-noh-MEN sek-SPLEEK', en: 'This phenomenon is explained by the ageing of the population.' },
            { fr: 'Il convient de souligner que le recyclage progresse au Québec.', pron: 'eel kohn-VYEN duh soo-lee-NYAY', en: 'It should be noted that recycling is progressing in Quebec.' },
            { fr: 'Néanmoins, les émissions de gaz à effet de serre stagnent depuis dix ans.', pron: 'nay-ahn-MWAN lay-zay-MISS-YOHN', en: 'Nevertheless, greenhouse-gas emissions have stalled for ten years.' },
        ],
    },
};

export const B2_EXTRAS: Record<string, LessonExtras> = {
    'B2:subjonctif': b2Subjonctif,
    'B2:registre': b2Registre,
    'B2:argumentation': b2Argumentation,
    'B2:passif': b2Passif,
    'B2:societe': b2Societe,
};

// ── C1 · Idioms & Register Control ──────────────────────────────────────────
const c1Idiomes: LessonExtras = {
    warmup: [
        { q: 'Give the spoken and written forms of "there is" and "I don\u2019t know".', a: 'y\u2019a / il y a · chais pas / je ne sais pas — speech deletes, writing restores.' },
        { q: 'Build the debate close: the disagreement is about means, not ends.', a: 'Pour conclure : le désaccord porte sur les moyens, non sur les fins.' },
        { q: 'What does il semblerait que take after it?', a: 'The subjunctive: il semblerait que ce soit…' },
        { q: 'Which certainty verb for a 40-person survey: démontrer or suggérer?', a: 'suggérer — the sample forbids the strong verb.' },
        { q: 'Interject politely on a panel.', a: 'Excusez-moi de vous couper, mais… (then offer the floor back).' },
    ],
    verbTables: [
        {
            title: 'The register ladder for one idea — "it was disappointing"',
            rows: [
                { label: 'slang', form: 'C\u2019était nul, carrément.', pron: 'friends only' },
                { label: 'casual', form: 'Pas terrible, franchement.', pron: 'negated positive' },
                { label: 'neutral', form: 'C\u2019était décevant.', pron: 'décevoir → décevant' },
                { label: 'formal', form: 'Le bilan est en deçà des attentes.', pron: 'en deçà de = below' },
                { label: 'understated', form: 'Ce n\u2019était pas génial…', pron: 'the C1 signature' },
            ],
        },
        {
            title: 'The irony kit — one particle flips the sentence',
            rows: [
                { label: 'yeah right', form: 'Ben voyons !', pron: 'bahn vway-OHN' },
                { label: 'sure sure', form: 'C\u2019est ça…', pron: 'with a flat tone' },
                { label: 'great…', form: 'Super, encore une panne !', pron: 'sarcasm after bad news' },
                { label: 'what a party', form: 'C\u2019est la fête…', pron: 'after an ordeal' },
                { label: 'voice quotes', form: 'Il a « oublié » son tour.', pron: 'flat repetition = irony' },
            ],
        },
        {
            title: 'Five frozen images — articles and number never move',
            rows: [
                { label: 'stand up', form: 'poser UN lapin', pron: 'never des lapins' },
                { label: 'make a fuss', form: 'en faire tout UN fromage', pron: 'en obligatory' },
                { label: 'cost a fortune', form: 'coûter LES yeux de la tête', pron: 'fixed plural article' },
                { label: 'faint', form: 'tomber dans LES pommes', pron: 'familier — use s\u2019évanouir formally' },
                { label: 'love at first sight', form: 'le coup de foudre', pron: 'lightning-bolt image' },
            ],
        },
    ],
    useCases: [
        {
            word: 'pas mal / pas génial / pas faux — the direction dial',
            uses: [
                { use: 'pas mal (du tout) = quite good', examples: [{ fr: '— Comment c\u2019était ? — Pas mal du tout !', en: '— How was it? — Pretty good!' }] },
                { use: 'pas terrible / pas génial = bad', examples: [{ fr: 'Le service ? Pas terrible…', en: 'The service? Not great… (= poor)' }] },
                { use: 'pas faux = right (understated agreement)', examples: [{ fr: '— Le fond est juste. — C\u2019est pas faux.', en: '— The substance is right. — Can\u2019t argue.' }] },
                { use: 'pas désagréable = pleasant (litotes)', examples: [{ fr: 'La soirée n\u2019était pas désagréable.', en: 'The evening was rather pleasant.' }] },
            ],
        },
        {
            word: 'euphemism — saying less to soften more',
            uses: [
                { use: 'death', examples: [{ fr: 'Il nous a quittés la semaine dernière.', en: 'He left us last week. (= died)' }] },
                { use: 'firing', examples: [{ fr: 'La direction s\u2019en est séparée.', en: 'Management parted ways with her. (= fired)' }] },
                { use: 'old age', examples: [{ fr: 'Il n\u2019est plus tout jeune.', en: 'He\u2019s not as young as he was.' }] },
                { use: 'naming it', examples: [{ fr: '« Restructuration » — en clair, des licenciements.', en: '"Restructuring" — plainly, layoffs.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Idioms are delivered deadpan — no wink in the voice. Read each line flat; the listener hears the image and decodes alone.',
        lines: [
            { fr: 'Elle m\u2019a posé un lapin — trente minutes sous la pluie, merci.', pron: 'el mah poh-ZAY ün lah-PAN', en: 'She stood me up — thirty minutes in the rain, thanks.' },
            { fr: 'N\u2019en fais pas tout un fromage : c\u2019est cinq minutes de retard.', pron: 'nahn fay pah too tuhn fro-MAHZH', en: 'Don\u2019t make a fuss: it\u2019s five minutes late.' },
            { fr: 'Le réparateur ? Encore trois semaines, et ça m\u2019a coûté les yeux de la tête.', pron: 'luh ray-pah-rah-TUHR', en: 'The repairman? Three more weeks, and it cost me a fortune.' },
            { fr: 'La conférence ? Ce n\u2019était pas génial, pour ne pas dire plus.', pron: 'lah kohn-feh-RAHNSS suh neh-TAY pah zhay-NYAHL', en: 'The conference? Not great, to say the least.' },
            { fr: 'Il a encore « oublié » son tour de cuisine — ben voyons.', pron: 'eel ah ahn-KOR oo-blee-AY', en: 'He "forgot" his cooking turn again — yeah right.' },
            { fr: 'Bref, c\u2019est plié : samedi, on refait tout — et je ne dirais pas non à une main.', pron: 'bref seh plee-AY sam-DEE', en: 'Anyway, it\u2019s settled: Saturday we redo everything — and I wouldn\u2019t say no to a hand.' },
        ],
    },
};

// ── C1 · Synthesis & Critical Reading ───────────────────────────────────────
const c1Synthese: LessonExtras = {
    warmup: [
        { q: 'Decode: Il a encore « oublié » son tour de cuisine.', a: 'Irony via voice-quotes — he didn\u2019t forget; the speaker implies intent.' },
        { q: 'Ce n\u2019était pas terrible — good or bad?', a: 'Bad — the negated positive points at the base adjective\u2019s opposite.' },
        { q: 'Formal way to say someone fainted?', a: 'Elle s\u2019est évanouie / elle a perdu connaissance — tomber dans les pommes is familier.' },
        { q: 'One euphemism for firing, one for dying.', a: 'La direction s\u2019en est séparée · il nous a quittés.' },
        { q: 'Complete: J\u2019ai d\u2019autres ______ à fouetter.', a: 'chats — bigger fish to fry.' },
    ],
    verbTables: [
        {
            title: 'Attribution frames — who says what',
            rows: [
                { label: 'light', form: 'Selon le document A, …', pron: 'courant register' },
                { label: 'literary', form: 'D\u2019après l\u2019auteure, …', pron: 'no preposition doubling!' },
                { label: 'with stress', form: 'L\u2019auteure souligne que…', pron: 'indicative after que' },
                { label: 'emergence', form: 'Il ressort du rapport que…', pron: 'fixed impersonal frame' },
                { label: 'skeptical', form: 'À en croire le rapport, …', pron: 'suspends judgment' },
            ],
        },
        {
            title: 'Nominalization — clause into noun phrase',
            rows: [
                { label: 'aware', form: 'prendre conscience → la prise de conscience', pron: 'the model upgrade' },
                { label: 'implement', form: 'mettre en place → la mise en place', pron: 'report staple' },
                { label: 'carry out', form: 'mettre en œuvre → la mise en œuvre', pron: 'administration loves it' },
                { label: 'underfund', form: 'être sous-financé → le sous-financement', pron: 'accusation, nominalized' },
                { label: 'oppose', form: 'les habitants s\u2019opposent → l\u2019opposition des habitants', pron: 'people become a force' },
            ],
        },
        {
            title: 'Convergence vs divergence — grouping sources',
            rows: [
                { label: 'converge', form: 'Dans le même ordre d\u2019idées, C évoque…', pron: 'group the agreeing' },
                { label: 'likewise', form: 'De même, B insiste sur…', pron: 'lighter convergence' },
                { label: 'in the style of', form: 'À l\u2019instar de A, B dénonce…', pron: 'formal grouping' },
                { label: 'diverge', form: 'Tandis que A insiste…, B met l\u2019accent sur…', pron: 'set against' },
                { label: 'conversely', form: 'À l\u2019inverse, C minimise…', pron: 'sharp contrast' },
                { label: 'where A sees…', form: 'Là où A voit une chance, B voit un risque.', pron: 'the elegant hinge' },
            ],
        },
    ],
    useCases: [
        {
            word: 'selon vs d\u2019après — same job, both correct',
            uses: [
                { use: 'selon + source (light, everywhere)', examples: [{ fr: 'Selon une étude de 2024, le lien est faible.', en: 'According to a 2024 study, the link is weak.' }] },
                { use: 'd\u2019après + source (slightly literary)', examples: [{ fr: 'D\u2019après l\u2019auteure, le constat est partagé.', en: 'In the author\u2019s view, the finding is shared.' }] },
                { use: 'never double the preposition', examples: [{ fr: 'NOT: selon à l\u2019auteure / d\u2019après de l\u2019étude', en: 'the source attaches directly' }] },
                { use: 'relative form: selon lequel', examples: [{ fr: 'le rapport selon lequel les délais s\u2019allongent', en: 'the report according to which…' }] },
            ],
        },
        {
            word: 'the neutrality rules of the synthesis',
            uses: [
                { use: 'no first person', examples: [{ fr: 'NOT: je pense que B a raison', en: 'the synthesis re-presents, it does not judge' }] },
                { use: 'attributed comparison only', examples: [{ fr: 'La thèse de B paraît la mieux étayée des trois.', en: 'the only judgment allowed' }] },
                { use: 'no outside knowledge', examples: [{ fr: 'Le corpus suffit — pas de chiffres invented de mémoire.', en: 'stay inside the documents' }] },
                { use: 'reformulate, never copy', examples: [{ fr: '« les délais s\u2019allongent » → les délais d\u2019attente ne cessent de s\u2019allonger', en: 'same idea, new words' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Synthesis voice is flat and even: every attribution frame lands level, no enthusiasm anywhere. Read each line like a news anchor reading someone else\u2019s findings.',
        lines: [
            { fr: 'D\u2019après le document A, le système souffre d\u2019un sous-financement chronique.', pron: 'dah-PRAY luh doh-kü-MAHN ah', en: 'According to document A, the system suffers chronic underfunding.' },
            { fr: 'Tandis que B insiste sur les délais, C met l\u2019accent sur la prévention.', pron: 'tahn-DEE kuh bay an-SEEST', en: 'While B stresses delays, C focuses on prevention.' },
            { fr: 'Dans le même ordre d\u2019idées, l\u2019éditorial évoque la pénurie de médecins de famille.', pron: 'dahn luh mem ord day-DEH', en: 'Along the same lines, the editorial mentions the family-doctor shortage.' },
            { fr: 'Il ressort de l\u2019ensemble que la prise de conscience est réelle, mais la mise en œuvre reste lente.', pron: 'eel ruh-SOR düh lahn-SAHM-bluh', en: 'It emerges from the whole that awareness is real, but implementation remains slow.' },
            { fr: 'Ces convergences masquent néanmoins une divergence de fond sur le financement.', pron: 'say kohn-vair-ZHAHNSS mahss-KAY', en: 'These convergences nevertheless mask a fundamental divergence on funding.' },
            { fr: 'La thèse du document C paraît la mieux étayée des trois.', pron: 'lah TEHZ dü doh-kü-MAHN say', en: 'Document C\u2019s thesis appears the best supported of the three.' },
        ],
    },
};

// ── C1 · Formal Speaking & Debate ───────────────────────────────────────────
const c1Debat: LessonExtras = {
    warmup: [
        { q: 'Attribute: "the system is underfunded" (source: document A).', a: 'D\u2019après le document A, le système est sous-financé.' },
        { q: 'Divergence or convergence: tandis que / dans le même ordre d\u2019idées ?', a: 'tandis que = divergence; dans le même ordre d\u2019idées = convergence.' },
        { q: 'Nominalize: "les gens prennent conscience du problème".', a: 'la prise de conscience du problème.' },
        { q: 'Backshift: "L\u2019auteure a écrit que les chiffres (être) faux."', a: 'étaient — past reporter + indicative.' },
        { q: 'May a synthesis contain "je pense que…"?', a: 'No — attribute judgments instead: la thèse de B paraît mieux étayée.' },
    ],
    verbTables: [
        {
            title: 'The debate choreography — five moves in order',
            rows: [
                { label: '1 · open', form: 'Permettez-moi de prendre la parole.', pron: 'formal floor-opener' },
                { label: '2 · buy time', form: 'Vous posez une question essentielle ; d\u2019y répondre en deux temps.', pron: 'graceful seconds' },
                { label: '3 · check', form: 'Si je comprends bien, vous me demandez si… — c\u2019est bien cela ?', pron: 'reformulate first' },
                { label: '4 · bounce', form: 'Je vous accorde que… ; sauf que…', pron: 'concede, then return' },
                { label: '5 · close', form: 'Pour conclure : le désaccord porte sur X, non sur Y.', pron: 'one precise verdict' },
            ],
        },
        {
            title: 'Filler register map — swap these in panels',
            rows: [
                { label: 'du coup →', form: 'par conséquent', pron: 'formal consequence' },
                { label: 'genre →', form: 'notamment', pron: 'formal example' },
                { label: 'quoi →', form: 'en somme', pron: 'formal close' },
                { label: 'ben →', form: 'voyez-vous / écoutez', pron: 'panel-approved openers' },
                { label: 'ouais →', form: 'tout à fait', pron: 'formal agreement' },
            ],
        },
    ],
    useCases: [
        {
            word: 'taking and yielding the floor',
            uses: [
                { use: 'take it', examples: [{ fr: 'Permettez-moi de prendre la parole sur ce point.', en: 'Allow me to take the floor on this point.' }] },
                { use: 'build on someone', examples: [{ fr: 'Pour rebondir sur ce que vient de dire Marie…', en: 'To build on what Marie just said…' }] },
                { use: 'yield it', examples: [{ fr: 'Je cède la parole à mon collègue.', en: 'I yield the floor to my colleague.' }] },
                { use: 'cut in politely', examples: [{ fr: 'Excusez-moi de vous couper — puis-je terminer une idée ?', en: 'Sorry to cut in — may I finish one thought?' }] },
            ],
        },
        {
            word: 'granting and disputing points',
            uses: [
                { use: 'grant the point', examples: [{ fr: 'Vous me donnez raison sur le fond.', en: 'You concede I\u2019m right on the substance.' }] },
                { use: 'flatly dispute', examples: [{ fr: 'Je m\u2019inscris en faux contre ce chiffre.', en: 'I flatly dispute that figure.' }] },
                { use: 'argue formally', examples: [{ fr: 'Elle fait valoir que le délai a tenu.', en: 'She argues that the deadline held.' }] },
                { use: 'qualify', examples: [{ fr: 'Je nuancerais toutefois cette affirmation.', en: 'I would nevertheless qualify that claim.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Panel rhythm: level openings, a small pause at every semicolon, stress on the verdict words. Read each line as if the microphone is live.',
        lines: [
            { fr: 'Merci. Permettez-moi de prendre la parole sur ce point précis.', pron: 'pair-meh-TAY MWAH duh prahn-druh lah pah-ROHL', en: 'Thank you. Allow me to take the floor on this precise point.' },
            { fr: 'Vous posez une question essentielle ; permettez-moi d\u2019y répondre en deux temps.', pron: 'voo poh-ZAY ün kwes-TYOHN ah-sahn-SYEL', en: 'You raise an essential question; let me answer it in two parts.' },
            { fr: 'Si je comprends bien, vous me demandez si le coût est justifié — c\u2019est bien cela ?', pron: 'see zhuh kohn-PRAN byan', en: 'If I understand correctly, you\u2019re asking whether the cost is justified — right?' },
            { fr: 'Je vous accorde que le délai est serré ; sauf que la méthode a fait ses preuves.', pron: 'zhuh voo zah-KORD kuh luh day-LYEH', en: 'I grant you the deadline is tight; except the method has proven itself.' },
            { fr: 'Excusez-moi de vous couper, mais les données disent l\u2019inverse — je vous en prie.', pron: 'ehks-kü-zay MWAH duh voo koo-PAY', en: 'Sorry to cut you off, but the data says otherwise — please, go ahead.' },
            { fr: 'Pour conclure : au fond, le désaccord porte sur le calendrier, non sur le principe.', pron: 'poor kohn-KLOOD oh FOHN', en: 'To conclude: at bottom, the disagreement is about timing, not principle.' },
        ],
    },
};

// ── C1 · Evidence-Based Argumentation ───────────────────────────────────────
const c1ArgumentationAvancee: LessonExtras = {
    warmup: [
        { q: 'Open a panel turn formally.', a: 'Permettez-moi de prendre la parole. / Si je peux me permettre…' },
        { q: 'Buy time when the question is hard.', a: 'Vous posez une question essentielle ; permettez-moi d\u2019y répondre en deux temps.' },
        { q: 'Check you understood a question.', a: 'Si je comprends bien, vous me demandez si… — c\u2019est bien cela ?' },
        { q: 'Concede and bounce: the deadline is tight, but the method works.', a: 'Je vous accorde que le délai est serré ; sauf que la méthode a fait ses preuves.' },
        { q: 'Replace three casual fillers formally: du coup, genre, quoi.', a: 'par conséquent, notamment, en somme.' },
    ],
    verbTables: [
        {
            title: 'The certainty ladder — verb by verb',
            note: 'The verb IS the claim\u2019s strength. Pick it before the sentence.',
            rows: [
                { label: 'proven', form: 'L\u2019étude démontre que… (indicatif)', pron: 'established results only' },
                { label: 'observed', form: 'Les données indiquent que… (indicatif)', pron: 'co-movement, measured' },
                { label: 'suggestive', form: 'Les résultats suggèrent que… (indicatif)', pron: 'honest middle rung' },
                { label: 'your hedge', form: 'Il semblerait que… (+ SUBJONCTIF)', pron: 'sahm-bluh-REH' },
                { label: 'exposed spin', form: 'Le titre laisse croire que…', pron: 'you distrust the implication' },
                { label: 'refusal', form: 'Rien ne permet d\u2019affirmer que…', pron: 'the anti-overclaim' },
            ],
        },
        {
            title: 'Hedge moods — subjunctive vs indicative',
            rows: [
                { label: 'SUBJ', form: 'Il semblerait que ce soit…', pron: 'semblerait, possible' },
                { label: 'SUBJ', form: 'Il est possible/vraisemblable que ce soit…', pron: 'uncertainty' },
                { label: 'IND', form: 'Il est probable que c\u2019est vrai. (indicatif)', pron: 'probable = indicative' },
                { label: 'IND', form: 'Il est certain/évident que… (indicatif)', pron: 'full confidence' },
            ],
        },
    ],
    useCases: [
        {
            word: 'correlation discipline — say the link, refuse the cause',
            uses: [
                { use: 'state the co-movement', examples: [{ fr: 'Les deux courbes coïncident depuis trois ans.', en: 'Both curves have coincided for three years.' }] },
                { use: 'refuse the mechanism', examples: [{ fr: 'Sans que la causalité soit établie.', en: 'Without causation being established.' }] },
                { use: 'the formula', examples: [{ fr: 'Corrélation n\u2019est pas causalité.', en: 'Correlation is not causation.' }] },
                { use: 'conditional acceptance', examples: [{ fr: 'Le lien semble réel, à condition d\u2019isoler les autres facteurs.', en: 'The link seems real, provided other factors are isolated.' }] },
            ],
        },
        {
            word: 'critical attribution — reading the fine print aloud',
            uses: [
                { use: 'suspend judgment', examples: [{ fr: 'À en croire le rapport, tout irait bien.', en: 'If we believe the report, all would be well.' }] },
                { use: 'expose the spin', examples: [{ fr: 'Le titre laisse croire une causalité que le texte ne soutient pas.', en: 'The headline implies a causation the text doesn\u2019t support.' }] },
                { use: 'quote the caveat', examples: [{ fr: 'Ses auteurs reconnaissent eux-mêmes les limites de l\u2019échantillon.', en: 'Its authors themselves acknowledge the sample\u2019s limits.' }] },
                { use: 'conditional verdict', examples: [{ fr: 'Sous réserve d\u2019une évaluation indépendante, le bilan plaide pour la prolongation.', en: 'Subject to independent evaluation, the verdict favours extension.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Analyst voice: slow verbs, fast figures, zero emphasis words. Read each line leaning on the certainty verb and pausing at the dashes.',
        lines: [
            { fr: 'Une étude de 2024 démontre une réduction de 12 % des émissions.', pron: 'ün ay-TÜD duh duh-MEE-lyuh', en: 'A 2024 study demonstrates a 12% cut in emissions.' },
            { fr: 'Les données suggèrent — elles ne prouvent pas — un effet d\u2019entraînement.', pron: 'lay doh-NAY süg-ZHAIR', en: 'The data suggests — it doesn\u2019t prove — a knock-on effect.' },
            { fr: 'Il semblerait que le programme porte ses fruits, sans qu\u2019on puisse isoler sa part.', pron: 'eel sahm-bluh-REH kuh luh pro-grahm PORT', en: 'It would seem the program is bearing fruit, without one isolating its share.' },
            { fr: 'Corrélation n\u2019est pas causalité : les courbes montent ensemble, rien de plus.', pron: 'koh-ray-lah-SYOHN neh pah koh-zah-lee-TAY', en: 'Correlation is not causation: the curves rise together, nothing more.' },
            { fr: 'Certains objectent le coût ; or, l\u2019évaluation indépendante conclut à un bilan positif.', pron: 'sair-TANZ ohb-zheh-TAY luh KOO', en: 'Some object to the cost; yet the independent evaluation concludes positively.' },
            { fr: 'Rien ne permet d\u2019affirmer la causalité, mais l\u2019ensemble plaide pour une action rapide.', pron: 'ryen nuh pair-MEH dah-feer-MAY', en: 'Nothing allows asserting causation, but the whole argues for swift action.' },
        ],
    },
};

// ── C1 · Fast Speech & Implied Attitude ─────────────────────────────────────
const c1OralImplicite: LessonExtras = {
    warmup: [
        { q: 'Order the certainty verbs: suggérer, démontrer, laisser croire.', a: 'démontrer (proven) > suggérer (suggestive) > laisser croire (spin you distrust).' },
        { q: 'Mood: Il semblerait que la mesure (être) efficace.', a: 'soit — hedge → subjunctive.' },
        { q: 'Mood: Il est probable que le lien (être) faible.', a: 'est — probable keeps the indicative.' },
        { q: 'Complete the discipline formula.', a: 'Corrélation n\u2019est pas causalité.' },
        { q: 'Refuse to overclaim in one frame.', a: 'Rien ne permet d\u2019affirmer que…' },
    ],
    verbTables: [
        {
            title: 'The deletion ladder — strongest first',
            rows: [
                { label: 'ne drops', form: 'C\u2019est pas faux. (ce n\u2019est pas faux)', pron: 'always, in speech' },
                { label: 'il drops', form: 'Y\u2019a du monde. / Faut qu\u2019j\u2019y aille.', pron: 'il y a, il faut' },
                { label: 'tu → t\u2019', form: 'T\u2019as vu ? T\u2019es là ?', pron: 'before a vowel' },
                { label: 'si + il glues', form: 'Chais pas s\u2019y\u2019aura du monde.', pron: 'three elisions in a row' },
                { label: 'subjunctive survives', form: 'Faut qu\u2019j\u2019y AILLE — subjonctif intact.', pron: 'grammar beats phonology' },
            ],
        },
        {
            title: 'Attitude particles — the stance stamps',
            rows: [
                { label: 'ben', form: 'Ben oui / ben non / ben voyons', pron: 'obviously / yeah right' },
                { label: 'quoi', form: 'On part, quoi.', pron: 'sentence-final "you know"' },
                { label: 'du coup', form: 'J\u2019ai raté le train, du coup j\u2019ai marché.', pron: 'spoken donc' },
                { label: 'genre', form: 'Il était genre épuisé.', pron: 'vagueness' },
                { label: 'histoire de', form: 'Je passe, histoire de saluer.', pron: 'just to…' },
                { label: 'enfin', form: 'Enfin, on verra…', pron: 'resigned self-correction' },
            ],
        },
        {
            title: 'Distance tags — hearsay without vouching',
            rows: [
                { label: 'conditional', form: 'Il démissionnerait.', pron: 'the mood does the work' },
                { label: 'tag', form: '…, paraît-il.', pron: 'pah-reh-TEEL' },
                { label: 'tag', form: '…, dit-on.', pron: 'literary rumour' },
                { label: 'adverb', form: 'Soi-disant malade, il serait au golf.', pron: 'sceptical allegedly' },
                { label: 'frame', form: 'Il paraît que… / on dit que…', pron: 'softer distance' },
            ],
        },
    ],
    useCases: [
        {
            word: 'the two channels — same message, twice',
            uses: [
                { use: 'to a friend (voice note)', examples: [{ fr: 'Chais pas, faut qu\u2019j\u2019y aille — y\u2019a du taf, quoi.', en: 'Dunno, gotta go — there\u2019s work, you know.' }] },
                { use: 'to your manager (email)', examples: [{ fr: 'Je ne sais pas encore si je pourrai venir ; j\u2019ai une contrainte professionnelle.', en: 'I don\u2019t yet know if I can come; I have a work constraint.' }] },
                { use: 'the switch table', examples: [{ fr: 'chais pas → je ne sais pas · y\u2019a → il y a · t\u2019as → tu as · du coup → par conséquent', en: 'four rows, one habit' }] },
                { use: 'the rule', examples: [{ fr: 'Speech deletes; writing restores. The exam grades the channel, not the fanciest words.', en: '—' }] },
            ],
        },
        {
            word: 'implied stance — what the exam actually asks',
            uses: [
                { use: 'irony', examples: [{ fr: 'Il a encore « oublié » son tour.', en: 'He "forgot" again — the quotes are the message.' }] },
                { use: 'resignation', examples: [{ fr: 'Enfin, on est habitués…', en: 'Well, we\u2019re used to it…' }] },
                { use: 'pushback', examples: [{ fr: 'Ben non ! On a tout préparé, quoi.', en: 'Obviously not! We\u2019ve prepped everything, you know.' }] },
                { use: 'rumour distance', examples: [{ fr: 'Le budget serait en baisse, paraît-il.', en: 'The budget is allegedly shrinking, so they say.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Radio speed: read each line twice — once at full speed (elisions live), once at half speed spelling out the full forms. Both must feel natural.',
        lines: [
            { fr: '— Tu viens ? — Chais pas, j\u2019ai du taf, et puis y\u2019a la pluie.', pron: 'sheh PAH zhay dü TAHF', en: '— Coming? — Dunno, got work, plus there\u2019s the rain.' },
            { fr: 'Faut qu\u2019j\u2019y aille — les enfants, tu sais comment c\u2019est.', pron: 'foh kuh zhy EYE', en: 'Gotta go — the kids, you know how it is.' },
            { fr: 'Il a encore "oublié" son tour de cuisine, histoire de nous tester.', pron: 'eel ah ahn-KOR oo-blee-AY', en: 'He "forgot" his cooking turn again — just to test us.' },
            { fr: 'C\u2019est dire si le dossier traîne : trois mois pour une signature.', pron: 'seh DEER see luh doh-SYAY tren', en: 'That says a lot about how the file drags: three months for one signature.' },
            { fr: 'Le maire serait candidat, paraît-il ; enfin, c\u2019est ce qu\u2019on dit en coulisse.', pron: 'luh MAIR suh-REH kahn-dee-DAH', en: 'The mayor is allegedly running; well, that\u2019s what\u2019s going around backstage.' },
            { fr: '— On annule ? — Ben non ! On a tout préparé, quoi.', pron: 'bahn NOHN oh ah too preh-pah-RAY KWAH', en: '— Cancelling? — Obviously not! We\u2019ve prepped everything, you know.' },
        ],
    },
};

export const C1_EXTRAS: Record<string, LessonExtras> = {
    'C1:idiomes': c1Idiomes,
    'C1:synthese': c1Synthese,
    'C1:debat': c1Debat,
    'C1:argumentation-avancee': c1ArgumentationAvancee,
    'C1:oral-implicite': c1OralImplicite,
};

// ── C2 · Stylistic Nuance ───────────────────────────────────────────────────
const c2Style: LessonExtras = {
    warmup: [
        { q: 'Build the measured close of a commentary: the said is modest, the inferred rich.', a: 'En définitive, le dit est modeste, l\u2019interprété riche.' },
        { q: 'Tag the level: "Le texte indique que les délais doublent."', a: 'Level 1 — literal, indicative.' },
        { q: 'Mood: Il est révélateur que le chiffre (disparaître).', a: 'disparaisse — judgement frame → subjunctive.' },
        { q: 'Join two opposed sources in one phrase.', a: 'Les deux documents se répondent en miroir.' },
        { q: 'What does distinguer le dit de l\u2019interprété mean?', a: 'Separate what is literally said from what you read into it — the graded reflex.' },
    ],
    verbTables: [
        {
            title: 'The three intensity ladders side by side',
            note: 'One rung per sentence — never stack two.',
            rows: [
                { label: 'intensity', form: 'un peu → assez → passablement → très → extrêmement', pron: 'pick by proportion' },
                { label: 'assertion', form: 'dire → affirmer → soutenir → prétendre (doubt)', pron: 'the verb vouches or not' },
                { label: 'probability', form: 'peut-être → vraisemblablement → sans doute → assurément', pron: 'sans doute = probably!' },
                { label: 'completion', form: 'presque (70 %) → quasiment (95 %) → entièrement (100 %)', pron: 'light → strong → done' },
            ],
        },
        {
            title: 'Modulation formulas — the attitude each carries',
            rows: [
                { label: 'soften', form: 'pour ainsi dire / si l\u2019on veut', pron: 'claim analogy, not identity' },
                { label: 'concede', form: 'disons / mettons', pron: 'the spoken calibration' },
                { label: 'confess', form: 'à vrai dire / en toute franchise', pron: 'before the honest bit' },
                { label: 'stand firm', form: 'il n\u2019empêche que / cela étant', pron: 'after the concession' },
                { label: 'cap', form: 'tout au plus / au grand maximum', pron: 'the calibrated ceiling' },
            ],
        },
        {
            title: 'Placement — seulement scope pair',
            rows: [
                { label: 'verb scope', form: 'Il a seulement hésité.', pron: 'the action was minimal' },
                { label: 'number scope', form: 'Seulement deux ont hésité.', pron: 'the quantity was scarce' },
                { label: 'literary wrap', form: 'Il ne fait qu\u2019hésiter.', pron: 'ne…que = written only' },
            ],
        },
    ],
    useCases: [
        {
            word: 'sans doute — the word everyone misreads',
            uses: [
                { use: 'modern French = probably', examples: [{ fr: 'Sans doute viendra-t-il demain.', en: 'He\u2019ll probably come tomorrow.' }] },
                { use: 'full certainty = sans aucun doute', examples: [{ fr: 'C\u2019est, sans aucun doute, le meilleur dossier.', en: 'It\u2019s, without any doubt, the best file.' }] },
                { use: 'formal inversion flourish', examples: [{ fr: 'Sans doute cette mesure aidera-t-elle.', en: 'This measure will no doubt help.' }] },
                { use: 'the certainty rung above', examples: [{ fr: 'Il viendra assurément.', en: 'He will assuredly come.' }] },
            ],
        },
        {
            word: 'presque vs quasiment vs presque-plus',
            uses: [
                { use: 'presque — light, oral, 60-80 %', examples: [{ fr: 'Il est presque six heures.', en: 'It\u2019s almost six (i.e. 5:55).' }] },
                { use: 'quasiment — strong, written, 90 %+', examples: [{ fr: 'Le dossier est quasiment clos.', en: 'The file is all but closed.' }] },
                { use: 'quasi- prefix — adjective form', examples: [{ fr: 'un quasi-consensus, une quasi-certitude', en: 'a virtual consensus / certainty' }] },
                { use: 'entièrement — actually done', examples: [{ fr: 'C\u2019est entièrement réglé.', en: 'It\u2019s entirely settled.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Nuance lives in the rung, not the volume: read each line twice — once on the lighter rung, once on the firmer — and keep the facts identical.',
        lines: [
            { fr: 'Le dossier est quasiment clos — tout au plus une annexe attendue.', pron: 'luh doh-SYAY eh kwah-zeem-AHN KLOH', en: 'The file is all but closed — at most an appendix awaited.' },
            { fr: 'À vrai dire, la mesure était passablement impopulaire.', pron: 'ah vreh DEER lah muh-ZÜR', en: 'Truth be told, the measure was quite unpopular.' },
            { fr: 'Il n\u2019empêche que les délais ont doublé depuis mars.', pron: 'eel nam-PESH kuh lay day-LYEH', en: 'That said, the delays have doubled since March.' },
            { fr: 'Il soutient que le devis a été respecté ; les factures, elles, disent autre chose.', pron: 'eel soo-TYEN kuh luh duh-VEE', en: 'He maintains the estimate was respected; the invoices, for their part, say otherwise.' },
            { fr: 'Seulement deux candidats ont osé postuler — il ne manque que le courageux.', pron: 'suhl-mahn duh kahn-dee-DAH', en: 'Only two candidates dared apply — only the brave one is missing.' },
            { fr: 'Désormais officiel, le calendrier tient — quasiment, pour ainsi dire.', pron: 'day-zor-MEH oh-fee-SYEL', en: 'Now official, the calendar holds — virtually, so to speak.' },
        ],
    },
};

// ── C2 · Literary & Journalistic French ─────────────────────────────────────
const c2Litteraire: LessonExtras = {
    warmup: [
        { q: 'Pick the rung: 95 % done — presque or quasiment ?', a: 'quasiment — presque would undersell it.' },
        { q: 'Scope: "Il a seulement refusé deux fois" — what is limited?', a: 'The refusals (verb scope) — for the count: il n\u2019a refusé que deux fois.' },
        { q: 'Modulation to stand firm after a concession?', a: 'Il n\u2019empêche que…' },
        { q: 'Assertion verb for a claim you doubt?', a: 'prétendre — affirmer would vouch for it.' },
        { q: 'One sentence with sans doute used correctly.', a: 'Sans doute viendra-t-il — probably, not certainly.' },
    ],
    verbTables: [
        {
            title: 'The six passé simples you meet most',
            note: 'Recognition only — you will never speak them.',
            rows: [
                { label: 'être', form: 'il fut / ils furent', pron: 'eel FÜ / eel fü-R' },
                { label: 'avoir', form: 'il eut / ils eurent', pron: 'eel Ü / eelz ü-R' },
                { label: 'aller', form: 'il alla / ils allèrent', pron: 'eel ah-LAH' },
                { label: 'venir', form: 'il vint / ils vinrent', pron: 'eel VAN' },
                { label: 'faire', form: 'il fit / ils firent', pron: 'eel FEE' },
                { label: 'voir', form: 'il vit / ils virent', pron: 'eel VEE' },
            ],
        },
        {
            title: 'The press code — ranked by reliability',
            rows: [
                { label: 'insider', form: 'De source proche du dossier, …', pron: 'unnamed, close to the case' },
                { label: 'corroborated', form: 'De source concordante, …', pron: 'several agree' },
                { label: 'own reporting', form: 'Selon nos informations, …', pron: 'the paper knows, won\u2019t vouch' },
                { label: 'emergence', form: 'Il ressort du rapport que…', pron: 'it emerges from' },
                { label: 'weakest', form: 'Des rumeurs circulent selon lesquelles…', pron: 'rumour distance' },
            ],
        },
        {
            title: 'Devices with their jobs',
            rows: [
                { label: 'anaphore', form: 'Je veux… je veux… — momentum', pron: 'repeated openings' },
                { label: 'antithèse', form: 'je veux / je refuse — balance', pron: 'opposites framed' },
                { label: 'métaphore filée', form: 'tempête → navire → quai — coherence', pron: 'one image extended' },
                { label: 'chute', form: 'the last line that flips everything', pron: 'the reframing close' },
                { label: 'litote', form: 'Il n\u2019y manqua pas — praise by negation', pron: 'literary understatement' },
            ],
        },
    ],
    useCases: [
        {
            word: 'il fut vs il eut — the pair that grades the paragraph',
            uses: [
                { use: 'il fut = he was (être)', examples: [{ fr: 'Il fut un temps où tout semblait simple.', en: 'There was a time when everything seemed simple.' }] },
                { use: 'il eut = he had (avoir)', examples: [{ fr: 'Il eut trois enfants et un prix.', en: 'He had three children and a prize.' }] },
                { use: 'inverted narration', examples: [{ fr: 'Puis vint le temps des doutes.', en: 'Then came the time of doubts.' }] },
                { use: 'plural pair', examples: [{ fr: 'Ils furent nombreux ; ils eurent raison.', en: 'They were many; they were right.' }] },
            ],
        },
        {
            word: 'conclure à vs conclure que — the verdict frames',
            uses: [
                { use: 'conclure à + noun', examples: [{ fr: 'Le rapport conclut à une erreur de procédure.', en: 'The report concludes that a procedural error occurred.' }] },
                { use: 'conclure que + clause', examples: [{ fr: 'Le rapport conclut que la procédure a été violée.', en: 'The report concludes the procedure was breached.' }] },
                { use: 'conclure en faveur de', examples: [{ fr: 'L\u2019enquête conclut en faveur du plaignant.', en: 'The inquiry concludes in the complainant\u2019s favour.' }] },
                { use: 'never mix', examples: [{ fr: 'NOT: conclut que fraude', en: 'a noun needs à' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Two voices in one drill: read each pair first as press (flat, coded), then as literature (inverted, singing). Same events, two centuries.',
        lines: [
            { fr: 'Selon nos informations, rien n\u2019est encore signé.', pron: 'sü-LÖN nohz an-for-mah-SYOHN', en: 'According to our information, nothing is signed yet.' },
            { fr: 'Il fut un temps où tout semblait plus simple.', pron: 'eel FÜ ün TAHN', en: 'There was a time when everything seemed simpler.' },
            { fr: 'De source proche du dossier, la date avance.', pron: 'duh SOORS prosh dü doh-SYAY', en: 'From a source close to the case, the date is moving up.' },
            { fr: 'Puis vint le temps des doutes — il n\u2019y manqua pas.', pron: 'püee VAN luh tahn day DOOT', en: 'Then came the time of doubts — he did not fail it.' },
            { fr: 'En substance, le rapport conclut à une erreur de procédure, non à une fraude.', pron: 'ahn süb-STAHNSS', en: 'In substance, the report concludes a procedural error, not fraud.' },
            { fr: 'La chute renverse tout : tant que rien n\u2019est signé, tout est signable.', pron: 'lah SHÜT rahn-VAHRS too', en: 'The punchline flips everything: as long as nothing is signed, everything is signable.' },
        ],
    },
};

// ── C2 · Francophone Variation & Context ────────────────────────────────────
const c2Francophonie: LessonExtras = {
    warmup: [
        { q: 'Which passé simple: "Il ______ un temps où tout semblait simple."?', a: 'fut — il fut un temps; eut would mean "he had".' },
        { q: 'Decode: "La signature interviendrait avant vendredi."', a: 'Hearsay conditional — the paper refuses to vouch.' },
        { q: 'Name the device: "Je veux savoir ; je veux comprendre ; je veux agir."', a: 'anaphore — repeated openings build momentum.' },
        { q: 'What does la chute mean in a text-criticism context?', a: 'The final line that reframes everything — the punchline.' },
        { q: 'Why is an unnamed source ("de source proche du dossier") not checkable?', a: 'The code exists to protect the source — the reader gets proximity, not identity.' },
    ],
    verbTables: [
        {
            title: 'The meal table — the exam\u2019s favourite trap',
            rows: [
                { label: 'FRANCE', form: 'petit-déjeuner · déjeuner · dîner', pron: 'breakfast · lunch · dinner' },
                { label: 'QUÉBEC', form: 'déjeuner · dîner · souper', pron: 'the old French system' },
                { label: 'the hour test', form: 'On dîne à midi (QC) = On déjeune à midi (FR)', pron: 'same noon, two words' },
                { label: 'evening', form: 'On soupe à 18 h (QC) — le dîner à 20 h (FR)', pron: 'two dinner cultures' },
            ],
        },
        {
            title: 'Numbers across the francophone world',
            rows: [
                { label: 'FRANCE / CANADA', form: 'soixante-dix · quatre-vingts · quatre-vingt-dix', pron: '70 · 80 · 90' },
                { label: 'BELGIQUE / RDC', form: 'septante · quatre-vingts · nonante', pron: '70 · 80 · 90' },
                { label: 'SUISSE', form: 'septante · huitante · nonante', pron: 'huitante = weet-TAHNT' },
                { label: 'archaic', form: 'octante — historical, unused today', pron: 'never say it' },
            ],
        },
        {
            title: 'Quebec essentials — decode on contact',
            rows: [
                { label: 'weekend', form: 'la fin de semaine', pron: 'France: le week-end' },
                { label: 'corner store', form: 'le dépanneur', pron: 'FR: repairman!' },
                { label: 'college', form: 'le cégep', pron: 'final p pronounced' },
                { label: 'all good', form: 'c\u2019est correct', pron: 'FR: pas de souci' },
                { label: 'so', form: 'fait que', pron: 'ça fait que → du coup' },
            ],
        },
    ],
    useCases: [
        {
            word: 'collège — the false friend of the francophone world',
            uses: [
                { use: 'France: middle school (11-15)', examples: [{ fr: 'Il entre au collège à onze ans.', en: 'He enters middle school at eleven. (France)' }] },
                { use: 'university = la fac', examples: [{ fr: 'Après le lycée, direction la fac.', en: 'After high school, off to university.' }] },
                { use: 'Quebec track', examples: [{ fr: 'Après le secondaire, le cégep, puis l\u2019université.', en: 'After high school, CEGEP, then university.' }] },
                { use: 'the trap sentence', examples: [{ fr: 'NOT: il est entré au collège à 18 ans (France)', en: 'that would be l\u2019université' }] },
            ],
        },
        {
            word: 'accent — describe, don\u2019t prescribe',
            uses: [
                { use: 'the C2 stance', examples: [{ fr: 'Un accent n\u2019est pas une faute : c\u2019est une adresse.', en: 'An accent is not a mistake: it\u2019s an address.' }] },
                { use: 'light, non-judgemental', examples: [{ fr: 'Elle a un léger accent québécois.', en: 'She has a light Quebec accent.' }] },
                { use: 'variation as heritage', examples: [{ fr: 'La diversité de la francophonie est un patrimoine, pas un écart.', en: 'Francophone diversity is heritage, not deviation.' }] },
                { use: 'one variety per text', examples: [{ fr: 'Gardez le même système dans un texte — les repas ou les chiffres.', en: 'hold one system per text' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Three accents, one sentence: read each line once in neutral French, once with the regional marker leaned on lightly. Respectful imitation, not caricature.',
        lines: [
            { fr: 'Au Québec, on déjeune à sept heures, on dîne à midi, on soupe à dix-huit heures.', pron: 'oh kü-BEK', en: 'In Quebec: breakfast at seven, lunch at noon, dinner at six.' },
            { fr: 'À Paris, le dîner n\u2019arrive qu\u2019à vingt heures — le déjeuner, c\u2019est midi.', pron: 'ah pah-REE luh dee-NAY', en: 'In Paris, dinner only comes at eight — lunch is noon.' },
            { fr: 'En Belgique, ça coûte septante euros ; en Suisse, huitante pages.', pron: 'ahn bel-ZEEK sah koot sehp-TAHNT', en: 'In Belgium it costs 70 euros; in Switzerland, 80 pages.' },
            { fr: 'Après le secondaire, direction le cégep — puis l\u2019université.', pron: 'ah-pray luh suh-kohn-DAIR', en: 'After secondary school, off to CEGEP — then university.' },
            { fr: '— Désolé pour le retard. — C\u2019est correct, on n\u2019a rien commencé.', pron: 'seh kuh-REHKT', en: '— Sorry I\u2019m late. — All good, we haven\u2019t started. (Quebec)' },
            { fr: 'Un accent n\u2019est pas une faute : c\u2019est une adresse.', pron: 'uhn-nak-SAHN neh pah-TÜN fohT', en: 'An accent is not a mistake: it\u2019s an address.' },
        ],
    },
};

// ── C2 · Rhetoric, Allusion & Irony ─────────────────────────────────────────
const c2Rhetorique: LessonExtras = {
    warmup: [
        { q: 'The meal words: dinner in Quebec vs dinner in France?', a: 'Quebec: souper. France: dîner (déjeuner = lunch there).' },
        { q: '90 in Belgian French?', a: 'nonante — France/Canada: quatre-vingt-dix.' },
        { q: 'What is a cégep?', a: 'Quebec\u2019s two-year college between high school and university.' },
        { q: 'In France, un collège is…', a: 'middle school (11-15) — university is la fac.' },
        { q: 'The C2 sentence about accents?', a: 'Un accent n\u2019est pas une faute : c\u2019est une adresse.' },
    ],
    verbTables: [
        {
            title: 'Device → job — the correcteur\u2019s table',
            rows: [
                { label: 'prétérition', form: 'Je ne parlerai pas de son courage… — insist while feigning restraint', pron: 'the denial performs' },
                { label: 'gradation', form: 'ponctuel ; prévenant ; créatif… — rise to the point', pron: 'Cyrano\u2019s engine' },
                { label: 'chiasme', form: 'manger pour vivre / vivre pour manger — the mirror IS the argument', pron: 'ABBA' },
                { label: 'parataxe', form: 'veni, vidi, vici — inevitability by rhythm', pron: 'no connectives' },
                { label: 'antithèse', form: 'réforme / abdication — the balance frames the verdict', pron: 'je veux / je refuse' },
            ],
        },
        {
            title: 'The éloge → cependant flip (structural irony)',
            rows: [
                { label: 'setup', form: 'Il est ponctuel ; il est prévenant ; il est loyal.', pron: 'three praises' },
                { label: 'flip', form: 'Cependant, il est loyal… envers ceux qui le payent.', pron: 'the mais governs' },
                { label: 'lesson', form: 'Read the connector FIRST, then re-weight the adjectives.', pron: 'the graded reflex' },
            ],
        },
        {
            title: 'Answer template for device questions',
            rows: [
                { label: 'name', form: 'C\u2019est une prétérition…', pron: 'identify' },
                { label: 'mechanism', form: '…qui feint d\u2019omettre…', pron: 'how it works' },
                { label: 'effect', form: '…pour mieux insister sur le courage.', pron: 'what it allows' },
                { label: 'visée', form: 'La visée du passage est satirique.', pron: 'the purpose, named' },
            ],
        },
    ],
    useCases: [
        {
            word: 'allusion fragments — the cultural shelf',
            uses: [
                { use: 'historical', examples: [{ fr: 'Un 18 Juin au micro — De Gaulle 1940.', en: 'the date does the citing' }] },
                { use: 'classical', examples: [{ fr: 'Le talon d\u2019Achille du dossier.', en: 'the file\u2019s one weakness' }] },
                { use: 'mythological', examples: [{ fr: 'Ouvrir une boîte de Pandore.', en: 'unleash the uncontrollable' }] },
                { use: 'the rule', examples: [{ fr: 'The fragment cites; culture completes — catch it, name its work.', en: '—' }] },
            ],
        },
        {
            word: 'irony vs sarcasm — two tempers',
            uses: [
                { use: 'sarcasm (blunt)', examples: [{ fr: 'Ah bravo, encore raté !', en: 'Well done, failed again! — names the target' }] },
                { use: 'irony (structural)', examples: [{ fr: 'Le communiqué salue la « transparence » ; 47 pages restent confidentielles.', en: 'praise + counter-fact' }] },
                { use: 'affectionate irony', examples: [{ fr: 'Il a encore "oublié" — ce grand étourdi.', en: 'He "forgot" again, the dear scatterbrain.' }] },
                { use: 'the exam', examples: [{ fr: 'Attitude questions reward the second-degree reading — structure over tone.', en: '—' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Read each line flat — the devices carry the meaning without vocal drama. The quieter you read, the clearer the irony.',
        lines: [
            { fr: 'Je ne vous ferai pas l\u2019injure de rappeler les dépassements de budget.', pron: 'zhuh nuh voo fair-AY lee-ZHÜR', en: 'I shan\u2019t insult you by recalling the budget overruns.' },
            { fr: 'Il est ponctuel ; il est prévenant ; il est, dirons-nous, créatif avec les chiffres.', pron: 'dee-ROHN NOO', en: 'He is punctual; considerate; creative, shall we say, with figures.' },
            { fr: 'Ce n\u2019est pas une réforme, c\u2019est une abdication ; ce n\u2019est pas un plan, c\u2019est une prière.', pron: 'suh neh PAH ün ray-FORM', en: 'It is not a reform, it is an abdication; not a plan, a prayer.' },
            { fr: 'Un 18 Juin au micro, des mots de Londres — chacun a compris l\u2019allusion.', pron: 'uhn kehn-ZEEN duh ZHÜAN', en: 'A June 18th at the microphone, words from London — everyone got it.' },
            { fr: 'Le communiqué salue « une transparence exemplaire » — le rapport compte 47 pages confidentielles.', pron: 'luh koh-mü-ni-KAY sah-LOO', en: 'The statement hails "exemplary transparency" — the report counts 47 confidential pages.' },
            { fr: 'Chacun sa méthode : elle corrige les copies ; il corrige les statistiques.', pron: 'shah-KÜN sah meh-TOD', en: 'To each their method: she grades papers; he grades statistics.' },
        ],
    },
};

// ── C2 · Long-Form Synthesis & Commentary ───────────────────────────────────
const c2Commentaire: LessonExtras = {
    warmup: [
        { q: 'Name the device: "Je ne vous parlerai pas de son courage…"', a: 'prétérition — it denies while it praises.' },
        { q: 'Effect of three éloges + one « cependant » ?', a: 'Structural irony — the praise was the setup; read the connector first.' },
        { q: 'What does "un 18 Juin au micro" allude to?', a: 'De Gaulle\u2019s 1940 appeal from London.' },
        { q: 'State the visée of a text after decoding.', a: 'La visée est satirique / polémique / mélancolique — device + purpose.' },
        { q: 'Irony or sarcasm: praise + a contradicting fact?', a: 'Irony — structural; sarcasm names and attacks bluntly.' },
    ],
    verbTables: [
        {
            title: 'The three reading levels — verbs and moods',
            rows: [
                { label: '1 · literal', form: 'Le texte indique/rapporte que… (indicatif)', pron: 'quotable facts' },
                { label: '2 · implicit', form: 'On peut inférer que… / le texte laisse entendre que…', pron: 'hedged inference' },
                { label: '3 · interpretive', form: 'Il est révélateur/significatif que… (+ SUBJONCTIF)', pron: 'the judgement frame' },
                { label: 'mood contrast', form: 'révélateur que + ait · clair que + est', pron: 'the mood IS the analysis' },
            ],
        },
        {
            title: 'The commentary skeleton — proportions matter',
            rows: [
                { label: 'problématique', form: 'One sentence — the question the sources answer differently.', pron: 'early, explicit' },
                { label: 'constat [1]', form: 'Literal claims, attributed, with figures.', pron: '~1/4 of the text' },
                { label: 'analyse [2-3]', form: 'Inference + interpretation, moods correct.', pron: '~1/2 of the text' },
                { label: 'portée', form: 'En définitive + the dit/interprété gap.', pron: 'the measured close' },
            ],
        },
        {
            title: 'Joins between sources',
            rows: [
                { label: 'mirror', form: 'Les deux textes se répondent en miroir.', pron: 'structural echo' },
                { label: 'echo', form: 'L\u2019annexe fait écho au corps du rapport.', pron: 'lighter join' },
                { label: 'support', form: 'Deux évaluations à l\u2019appui de cette lecture.', pron: 'converging sources' },
                { label: 'contrast', form: 'Là où A célèbre, B compte les coûts.', pron: 'the elegant hinge' },
            ],
        },
    ],
    useCases: [
        {
            word: 'la visée — purpose labels of texts',
            uses: [
                { use: 'satirique', examples: [{ fr: 'La visée est satirique : l\u2019éloge prépare l\u2019accusation.', en: 'the praise sets up the charge.' }] },
                { use: 'polémique', examples: [{ fr: 'Une visée polémique : chaque phrase attaque.', en: 'polemical — attack mode.' }] },
                { use: 'mélancolique', examples: [{ fr: 'Visée mélancolique : il fut un temps…', en: 'elegiac — the literary opener.' }] },
                { use: 'didactique', examples: [{ fr: 'Visée didactique : le texte explique, il ne plaide pas.', en: 'teaching, not arguing.' }] },
            ],
        },
        {
            word: 'weighing without surrendering',
            uses: [
                { use: 'qualify', examples: [{ fr: 'Nuancer n\u2019est pas céder.', en: 'Qualifying is not conceding.' }] },
                { use: 'weigh', examples: [{ fr: 'La portée du texte est réelle, mais l\u2019échantillon est unique.', en: 'significance real, sample single.' }] },
                { use: 'conditional acceptance', examples: [{ fr: 'Sous réserve de la méthode, la lecture tient.', en: 'subject to method, the reading stands.' }] },
                { use: 'close on the gap', examples: [{ fr: 'En définitive, le décalage déplace la question.', en: 'the gap moves the question.' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'The commentary voice: level, precise, no drama — every level-tag lands softly. Read each line as if a jury were taking notes.',
        lines: [
            { fr: 'Le texte indique que les délais ont doublé ; il ne dit pas pourquoi.', pron: 'luh TEHKS-tan-DEEK', en: 'The text indicates the delays doubled; it does not say why.' },
            { fr: 'On peut toutefois inférer que la décision était prise avant la consultation.', pron: 'ohn puh tooh-foh-ZAN-feh-RAY', en: 'One can nevertheless infer the decision predated the consultation.' },
            { fr: 'Il est révélateur que le chiffre ait disparu de la version finale.', pron: 'eel eh ray-vay-lah-TUHR kuh', en: 'It is revealing that the figure vanished from the final version.' },
            { fr: 'Les deux documents se répondent en miroir : l\u2019un célèbre, l\u2019autre compte.', pron: 'luh duh doh-kü-MAHN', en: 'The two documents mirror each other: one celebrates, one counts.' },
            { fr: 'Nuancer n\u2019est pas céder : la portée est réelle, l\u2019échantillon unique.', pron: 'nü-AHN-say neh pah say-DAY', en: 'Qualifying is not conceding: significance real, sample single.' },
            { fr: 'En définitive, le dit est modeste, l\u2019interprété riche — et ce décalage fait le texte.', pron: 'ahn day-fee-nee-TEEV', en: 'Ultimately: the said modest, the inferred rich — and that gap makes the text.' },
        ],
    },
};

export const C2_EXTRAS: Record<string, LessonExtras> = {
    'C2:style': c2Style,
    'C2:litteraire': c2Litteraire,
    'C2:francophonie': c2Francophonie,
    'C2:rhetorique': c2Rhetorique,
    'C2:commentaire-long': c2Commentaire,
};

// Merged registry — consumed by frenchLessons.ts
export const LESSON_EXTRAS: Record<string, LessonExtras> = {
    ...A1_EXTRAS,
    ...A2_EXTRAS,
    ...B1_EXTRAS,
    ...B2_EXTRAS,
    ...C1_EXTRAS,
    ...C2_EXTRAS,
};

export type { LessonExtras };
export const _tables = { ETRE_PRESENT, AVOIR_PRESENT, ALLER_PRESENT };
