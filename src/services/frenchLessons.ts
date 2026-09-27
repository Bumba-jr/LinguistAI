// Static French lectures — the hardcoded Learn section.
//
// WHY THIS FILE EXISTS: AI-generated lessons mean every user gets a different
// lecture, and if the AI is down the lesson is down. Lessons registered here
// are hand-written, identical for everyone, and work offline.
//
// HOW IT IS CONSUMED: TCFPrepView.openLesson checks STATIC_FRENCH_LESSONS
// first (keyed `${level}:${slug}`, matching TCF_SYLLABUS slugs). If a lesson
// exists here it is served instantly; topics without a static lecture still
// fall back to AI generation until they are written.
//
// SHAPE: TcfLesson (imported from tcfService) — the exact shape the lesson
// renderer already displays, so static and AI lessons look identical.
//
// STATUS: A1:greetings is the gold-standard template. All other topics are
// written following its depth and structure after approval.

import type { TcfLesson } from './tcfService';

// ── Homework & assessment (the Day-1 mega-homework format) ───────────────────
export interface HomeworkCheck {
    prompt: string;        // the English sentence (A), sentence with ______ (B), or wrong sentence (C)
    answer: string;        // the correct French
    alt?: string[];        // accepted variants
    explanation: string;   // how the mistake happens, why, and how to fix it
}
export interface LessonHomework {
    intro?: string;
    translation: HomeworkCheck[];   // Section A — translate EN → FR
    blanks: HomeworkCheck[];        // Section B — fill in the blank
    corrections: HomeworkCheck[];   // Section C — correct the error
    writing: { task: string; requirements: string[]; minWords: number };
    checklist: string[];            // end-of-lesson self check
}
export interface StaticFrenchLesson extends TcfLesson {
    traps?: string[];      // score-destroying traps, shown before the lesson
    homework?: LessonHomework;
}

// ── A1 · Greetings & Introductions ───────────────────────────────────────────
const a1Greetings: StaticFrenchLesson = {
    title: 'Greetings & Introductions',
    objective: 'Greet people at the right time of day and in the right register, introduce yourself with your name, ask someone their name, and exchange the standard how-are-you ritual — formally and informally.',

    vocabulary: [
        { fr: 'bonjour', en: 'hello / good morning (used until early evening)', example: { fr: 'Bonjour, Madame !', en: 'Hello, ma\'am!' }, related: [{ fr: 'bonsoir', en: 'good evening' }, { fr: 'bonne journée', en: 'have a good day' }] },
        { fr: 'bonsoir', en: 'good evening (from ~6pm onward)', example: { fr: 'Bonsoir, entrez !', en: 'Good evening, come in!' }, related: [{ fr: 'bonne soirée', en: 'have a good evening' }] },
        { fr: 'salut', en: 'hi / bye (informal only — friends, family)', example: { fr: 'Salut, ça va ?', en: 'Hi, how are you?' }, related: [{ fr: 'coucou', en: 'hey (very casual, affectionate)' }] },
        { fr: 'au revoir', en: 'goodbye (the standard farewell)', example: { fr: 'Au revoir, à demain !', en: 'Goodbye, see you tomorrow!' }, related: [{ fr: 'à bientôt', en: 'see you soon' }, { fr: 'à tout à l\u2019heure', en: 'see you later (same day)' }] },
        { fr: 'merci', en: 'thank you', example: { fr: 'Merci beaucoup !', en: 'Thank you very much!' }, related: [{ fr: 'de rien', en: 'you\u2019re welcome (casual)' }, { fr: 'je vous en prie', en: 'you\u2019re welcome (formal)' }] },
        { fr: 's\u2019il vous plaît', en: 'please (formal or plural)', example: { fr: 'Un café, s\u2019il vous plaît.', en: 'A coffee, please.' }, related: [{ fr: 's\u2019il te plaît', en: 'please (informal, to one friend)' }] },
        { fr: 'oui / non', en: 'yes / no', example: { fr: 'Tu viens ? — Oui !', en: 'Are you coming? — Yes!' }, related: [{ fr: 'si', en: 'yes (contradicting a negative question)' }] },
        { fr: 'je m\u2019appelle…', en: 'my name is… (literally: I call myself…)', gender: 'verb: s\u2019appeler', example: { fr: 'Je m\u2019appelle Marie.', en: 'My name is Marie.' }, related: [{ fr: 'tu t\u2019appelles comment ?', en: 'what\u2019s your name (informal)' }, { fr: 'vous vous appelez comment ?', en: 'what\u2019s your name (formal)' }] },
        { fr: 'enchanté / enchantée', en: 'nice to meet you (lit. delighted) — add -e if the speaker is a woman', example: { fr: 'Enchantée, Marie.', en: 'Nice to meet you, Marie. (said by a woman)' }, related: [{ fr: 'tout le plaisir est pour moi', en: 'the pleasure is all mine (formal)' }] },
        { fr: 'comment ça va ?', en: 'how are you? (neutral-informal)', example: { fr: 'Salut ! Comment ça va ?', en: 'Hi! How are you?' }, related: [{ fr: 'ça va ?', en: 'you okay? (shortest form)' }, { fr: 'comment vas-tu ?', en: 'how are you? (informal, slightly careful)' }] },
        { fr: 'comment allez-vous ?', en: 'how are you? (formal or plural)', example: { fr: 'Bonjour, comment allez-vous ?', en: 'Hello, how are you? (to a stranger/elder)' }, related: [{ fr: 'je vais bien', en: 'I\u2019m doing well' }] },
        { fr: 'ça va bien, merci', en: 'I\u2019m fine, thanks', example: { fr: 'Ça va ? — Ça va bien, merci.', en: 'How are you? — I\u2019m fine, thanks.' }, related: [{ fr: 'pas mal', en: 'not bad' }, { fr: 'comme ci comme ça', en: 'so-so' }] },
        { fr: 'et toi ? / et vous ?', en: 'and you? (informal / formal)', example: { fr: 'Je vais bien. Et toi ?', en: 'I\u2019m well. And you?' }, related: [{ fr: 'et toi-même ?', en: 'and yourself? (very casual)' }] },
        { fr: 'pardon / excusez-moi', en: 'sorry / excuse me', example: { fr: 'Pardon, je suis en retard.', en: 'Sorry, I\u2019m late.' }, related: [{ fr: 'désolé(e)', en: 'sorry (adjective)' }] },
        { fr: 'à bientôt', en: 'see you soon', example: { fr: 'À bientôt, merci pour tout !', en: 'See you soon, thanks for everything!' }, related: [{ fr: 'à demain', en: 'see you tomorrow' }, { fr: 'à plus tard', en: 'see you later' }] },
    ],

    pronunciation: [
        { fr: 'bonjour', approx: 'bohn-ZHOOR', en: 'the "on" is nasal — no n sound, the "j" is like the s in "measure"' },
        { fr: 's\u2019il vous plaît', approx: 'seel voo PLEH', en: 'final -t is silent in plaît' },
        { fr: 'enchanté', approx: 'ahn-shahn-TAY', en: 'both "en"/"an" are nasal; the é is a closed "ay"' },
        { fr: 'comment allez-vous', approx: 'koh-mahn tah-lay VOO', en: 'comment + allez LIASE: the t becomes "tah" — never "koh-mahn ah-lay"' },
        { fr: 'tu t\u2019appelles', approx: 'too tah-PEHL', en: 'the double l in appelles is pronounced as a single "l" — "tah-PEL"' },
        { fr: 'au revoir', approx: 'oh ruh-VWAHR', en: 'the "re" is barely a sound: oh-r(v)WAHR — French speakers swallow it' },
    ],

    grammar: {
        rule: 'French greetings run on a tu/vous switch: EVERY greeting and question has an informal (tu) and a formal (vous) version — you must pick a lane.',
        explanation: 'English has one "you"; French has two, and the choice shows up everywhere. Use tu with friends, family, children and classmates. Use vous with strangers, shopkeepers, teachers, elders, and when addressing more than one person. The safest A1 habit: start with vous with anyone you don\u2019t know; if they invite you to tutoyer (use tu), they will say "on peut se tutoyer". The name question is built on s\u2019appeler — a reflexive verb meaning "to call oneself": je m\u2019appelle is literally "I call myself", so the pronoun (me/te/se) changes with the person. Questions at A1 have two shapes: you can lift your intonation (Tu t\u2019appelles comment ?) or use est-ce que (Comment est-ce que vous vous appelez ?) — never invert randomly.',
        examples: [
            { fr: 'Bonjour ! Je m\u2019appelle Marie. Et toi ?', en: 'Hello! My name is Marie. And you?', breakdown: ['bonjour = hello', 'je = I', 'm\u2019appelle = call myself (s\u2019appeler, me = myself)', 'Marie = Marie', 'et toi = and you (informal)'] },
            { fr: 'Comment vous appelez-vous ?', en: 'What is your name? (formal)', breakdown: ['comment = how', 'vous = you (formal)', 'vous appelez = call yourselves (vous form of s\u2019appeler)', '-vous = inverted question tag'] },
            { fr: 'Je ne m\u2019appelle pas Paul.', en: 'My name is not Paul.', breakdown: ['je = I', 'ne … pas = not (wraps the verb)', 'm\u2019appelle = call myself', 'Paul = Paul'] },
            { fr: 'Ça va, merci. Et vous, comment allez-vous ?', en: 'I\u2019m fine, thanks. And you, how are you? (formal)', breakdown: ['ça va = it goes (I\u2019m fine)', 'merci = thanks', 'et vous = and you (formal)', 'comment = how', 'allez-vous = do you go/are you (aller, vous form)'] },
            { fr: 'Bonjour, je vous présente mon ami Paul.', en: 'Hello, let me introduce my friend Paul.', breakdown: ['bonjour = hello', 'je = I', 'vous présente = present to you (présenter, vous form)', 'mon ami = my friend (masc)', 'Paul = Paul'] },
            { fr: 'Nous nous appelons Marie et Paul.', en: 'Our names are Marie and Paul.', breakdown: ['nous = we', 'nous appelons = call ourselves (nous form of s\u2019appeler)', 'Marie et Paul = Marie and Paul'] },
        ],
        commonMistakes: [
            'Saying "Comment vas-tu ?" to a stranger or elder — use "Comment allez-vous ?" unless invited to be informal.',
            '"Je suis Marie" sounds odd for names — French introduces with s\u2019appeler: "Je m\u2019appelle Marie" (je suis + name is heard in Belgium/Canada, but the standard is s\u2019appeler).',
            'Writing "enchante" without the accent, or a man writing "enchantée" — the -e agrees with the SPEAKER\u2019S gender.',
            'Forgetting the liaison in "comment allez-vous" — it is "koh-mahn-TAH-lay-voo", the t links.',
        ],
    },

    transformations: [
        { type: 'Positive', fr: 'Je m\u2019appelle Marie.', en: 'My name is Marie.' },
        { type: 'Negative', fr: 'Je ne m\u2019appelle pas Marie.', en: 'My name is not Marie.' },
        { type: 'Question (informal)', fr: 'Tu t\u2019appelles comment ?', en: 'What\u2019s your name? (casual — intonation)' },
        { type: 'Question (formal)', fr: 'Comment vous appelez-vous ?', en: 'What is your name? (formal — inversion)' },
        { type: 'Plural', fr: 'Nous nous appelons Marie et Paul.', en: 'Our names are Marie and Paul.' },
        { type: 'Introduce someone else', fr: 'Il s\u2019appelle Paul.', en: 'His name is Paul.' },
        { type: 'How are you (informal → formal)', fr: 'Ça va ? → Comment vas-tu ? → Comment allez-vous ?', en: 'You okay? → How are you? → How are you? (formal)' },
        { type: 'Farewell upgrade', fr: 'Salut ! → Au revoir ! → Au revoir, à bientôt !', en: 'Bye! → Goodbye! → Goodbye, see you soon!' },
    ],

    sentenceBuilding: [
        { fr: 'Salut !', en: 'Hi!' },
        { fr: 'Salut, je m\u2019appelle Marie.', en: 'Hi, my name is Marie.' },
        { fr: 'Salut, je m\u2019appelle Marie. Et toi, tu t\u2019appelles comment ?', en: 'Hi, my name is Marie. And you, what\u2019s your name?' },
        { fr: 'Salut, je m\u2019appelle Marie. Enchantée ! Ça va ?', en: 'Hi, my name is Marie. Nice to meet you! How are you?' },
        { fr: 'Bonjour, je m\u2019appelle Marie Dupont. Enchantée. Ça va bien, merci, et vous ?', en: 'Hello, my name is Marie Dupont. Nice to meet you. I\u2019m well, thank you, and you?' },
    ],

    practice: [
        { instruction: 'Give the FORMAL version of this question:', question: 'Tu t\u2019appelles comment ?', answer: 'Comment vous appelez-vous ? (or: Comment est-ce que vous vous appelez ?)' },
        { instruction: 'Make it negative:', question: 'Je m\u2019appelle Paul.', answer: 'Je ne m\u2019appelle pas Paul.' },
        { instruction: 'A woman says "nice to meet you" — write it correctly:', question: 'Enchante ___', answer: 'Enchantée (the speaker is a woman → add -e)' },
        { instruction: 'Put the greeting pair in order (morning → evening):', question: 'bonsoir / bonjour', answer: 'bonjour (until ~6pm), then bonsoir' },
        { instruction: 'Which pronoun: you are talking to two strangers?', question: 'tu / vous', answer: 'vous (vous covers plural AND formal)' },
        { instruction: 'Complete the thank-you ritual:', question: 'Merci beaucoup ! — ___', answer: 'De rien ! (casual) or Je vous en prie ! (formal)' },
    ],

    translationPractice: [
        { en: 'Hello! My name is Marie.', fr: 'Bonjour ! Je m\u2019appelle Marie.' },
        { en: 'What\u2019s your name? (informal)', fr: 'Tu t\u2019appelles comment ?' },
        { en: 'I\u2019m fine, thank you. And you?', fr: 'Ça va bien, merci. Et vous ?' },
        { en: 'See you soon, goodbye!', fr: 'À bientôt, au revoir !' },
        { en: 'A coffee, please.', fr: 'Un café, s\u2019il vous plaît.' },
        { en: 'Let me introduce my friend Paul.', fr: 'Je vous présente mon ami Paul.' },
    ],

    reverseTranslation: [
        { fr: 'Bonsoir, comment allez-vous ?', en: 'Good evening, how are you? (formal)' },
        { fr: 'Salut ! Ça va ?', en: 'Hi! How are you? (casual)' },
        { fr: 'Je ne m\u2019appelle pas Paul.', en: 'My name is not Paul.' },
        { fr: 'Pardon, je suis en retard. À demain !', en: 'Sorry, I\u2019m late. See you tomorrow!' },
    ],

    register: {
        informal: 'Salut ! Moi c\u2019est Marie. Ça va ? — Oui, et toi ? ("Moi c\u2019est…" is how young French speakers actually introduce themselves — much more common than "Je m\u2019appelle" with friends.)',
        neutral: 'Bonjour ! Je m\u2019appelle Marie. Comment ça va ? — Ça va bien, merci. Et toi ?',
        formal: 'Bonjour Monsieur. Je m\u2019appelle Marie Dupont. Comment allez-vous ? — Très bien, merci. Je vous en prie.',
    },

    culture: 'La bise: in France people greet friends and family with kisses on the cheek — usually TWO in Paris, but three or four in other regions (and one in some parts). In professional settings you shake hands. Two rules never to break: always say "Bonjour" when entering a shop (skipping it is genuinely rude), and use "vous" with anyone you\u2019d address as "sir/ma\u2019am" in English. When in doubt, vous — adults will invite you to "se tutoyer" when informality is welcome.',

    freeProduction: 'Write or record your own introduction (5–7 sentences). Guiding questions: What is your name — formal version and casual version? How do you greet someone at 9am versus 9pm? How do you ask a new colleague their name formally? How do you answer "Comment allez-vous ?" three different ways (great / fine / so-so)?',

    miniTest: [
        { question: 'You meet your friend\u2019s grandmother. How do you ask her name?', options: ['Tu t\u2019appelles comment ?', 'Comment vous appelez-vous ?', 'Moi c\u2019est comment ?', 'Elle s\u2019appelle comment ?'], answer: 'Comment vous appelez-vous ?' },
        { question: 'Who says "Enchantée" (with -e)?', options: ['A man speaking', 'A woman speaking', 'The person being introduced', 'Both people always'], answer: 'A woman speaking' },
        { question: 'Which is the FORMAL "How are you?"', options: ['Ça va ?', 'Comment vas-tu ?', 'Comment allez-vous ?', 'Quoi de neuf ?'], answer: 'Comment allez-vous ?' },
        { question: '"À bientôt" means…', options: ['Goodbye forever', 'See you soon', 'Good morning', 'You\u2019re welcome'], answer: 'See you soon' },
        { question: 'How do you say "My name is Paul"?', options: ['Je suis appelle Paul.', 'Je m\u2019appelle Paul.', 'Je m\u2019appelles Paul.', 'Me appelle Paul.'], answer: 'Je m\u2019appelle Paul.' },
    ],

    review: [
        'Before the next lesson: practise the tu/vous choice out loud with five imaginary people (friend, shopkeeper, teacher, child, elder).',
        'Next up: Numbers, Dates & Time — you will need "Bonjour" to book things, so keep the greetings warm.',
    ],

    traps: [
        'Pronouncing every letter: final -e, -s, -t, -d, -z, -x are almost always SILENT. Vous = "voo", grand = "gron". (Only C, R, F, L survive at the end — the CaReFuL rule.)',
        'Using "tu" with strangers or elders: it reads as disrespect. Default to vous with everyone you don\u2019t know; the TCF examiners expect vous unless they say otherwise.',
        'Introducing yourself with "Je suis + name": French uses s\u2019appeler — "Je m\u2019appelle Marie". Save "je suis" for professions, nationalities and states.',
        'Forgetting the speaker-gender agreement on enchanté(e): a woman writes enchantée, a man enchanté. The -e matches YOU, not the other person.',
    ],

    homework: {
        intro: 'Four sections, do them in order. Check each answer yourself — read the explanation even when you get it right, so nothing stays "right by luck".',
        translation: [
            { prompt: 'Good evening!', answer: 'Bonsoir !', alt: ['Bonsoir'], explanation: 'Bonsoir takes over from bonjour around 6pm. Saying "bonjour" late at night is a classic time-of-day slip the exam notices.' },
            { prompt: 'My name is Paul.', answer: 'Je m\u2019appelle Paul.', alt: ["Je m'appelle Paul"], explanation: 'Names use s\u2019appeler (to call oneself): je m\u2019appelle. "Je suis Paul" is heard in Canada/Belgium but the standard French introduction is s\u2019appeler.' },
            { prompt: 'What is your name? (asking a stranger)', answer: 'Comment vous appelez-vous ?', alt: ["Comment est-ce que vous vous appelez ?"], explanation: 'A stranger takes vous. Two correct shapes: inversion (Comment vous appelez-vous ?) or est-ce que (Comment est-ce que vous vous appelez ?). The casual "Tu t\u2019appelles comment ?" would be disrespectful here.' },
            { prompt: 'I am fine, thank you. And you? (talking to a friend)', answer: 'Ça va bien, merci. Et toi ?', alt: ["Ca va bien, merci. Et toi ?"], explanation: 'With a friend the ritual is ça va… et toi ? — "Et vous ?" would sound cold between friends. Register consistency is what the exam grades.' },
            { prompt: 'See you tomorrow!', answer: 'À demain !', alt: ["A demain !", "À demain"], explanation: 'à + day/time = see you…: à demain (tomorrow), à bientôt (soon), à tout à l\u2019heure (later today). The accent on À is required.' },
            { prompt: 'A coffee, please. (in a café, to the waiter)', answer: 'Un café, s\u2019il vous plaît.', alt: ["Un café, s'il vous plaît"], explanation: 'Service staff take vous + s\u2019il vous plaît. "S\u2019il te plaît" is only for people you already tutoie.' },
            { prompt: 'Let me introduce my friend Marie. (her name is Marie)', answer: 'Je vous présente mon amie Marie.', alt: ["Je vous presente mon amie Marie"], explanation: 'Two traps in one line: présenter with vous (je vous présente), and amie is feminine — but because it starts with a vowel, the possessive is mon (never "ma amie"). The noun stays feminine.' },
            { prompt: 'My name is not Paul.', answer: 'Je ne m\u2019appelle pas Paul.', alt: ["Je ne m'appelle pas Paul"], explanation: 'The negation sandwich wraps the REFLEXIVE verb: je ne m\u2019appelle pas. Do not put ne/pas around the pronoun (never "je m\u2019appelle ne pas").' },
        ],
        blanks: [
            { prompt: 'Je ______ Marie.', answer: 'm\u2019appelle', alt: ["m'appelle"], explanation: 'je + s\u2019appeler → je m\u2019appelle. The m\u2019 is the reflexive pronoun me elided before a vowel.' },
            { prompt: 'Tu ______ comment ?', answer: 't\u2019appelles', alt: ["t'appelles", "t'appelle"], explanation: 'tu + s\u2019appeler → tu t\u2019appelles. The tu form needs the final -s: t\u2019appelles. (Pronounced the same as je m\u2019appelle — the -s is silent.)' },
            { prompt: 'Elle ______ Sophie.', answer: 's\u2019appelle', alt: ["s'appelle"], explanation: 'elle + s\u2019appeler → elle s\u2019appelle. Third person singular takes s\u2019appelle — one l doubled, no extra -s.' },
            { prompt: 'Nous ______ Marie et Paul.', answer: 'nous appelons', alt: ["nous appelons"], explanation: 'nous + s\u2019appeler → nous nous appelons. Both pronouns appear: the subject nous AND the reflexive nous. Only one "l" in appelons.' },
            { prompt: 'Vous ______ comment ?', answer: 'vous appelez', alt: ["vous appelez"], explanation: 'vous + s\u2019appeler → vous vous appelez. The vous form ends in -ez.' },
            { prompt: 'Je ne ______ pas Paul.', answer: 'm\u2019appelle', alt: ["m'appelle"], explanation: 'The sandwich rule: ne wraps the CONJUGATED VERB — je ne m\u2019appelle pas. The reflexive pronoun sits inside the sandwich with the verb.' },
        ],
        corrections: [
            { prompt: 'Je suis Paul. (introducing yourself)', answer: 'Je m\u2019appelle Paul.', explanation: 'How the mistake happens: English "I am Paul" translates word-for-word to je suis. Why it does not work: French introduces names with the reflexive s\u2019appeler ("I call myself"). How to fix it: je m\u2019appelle + name. Save je suis for profession/nationality/state.' },
            { prompt: 'Comment tu t\u2019appelle ?', answer: 'Comment tu t\u2019appelles ?', explanation: 'How the mistake happens: the -s of the tu form is silent, so the ear never hears it. Why it does not work: s\u2019appeler with tu conjugates as tu t\u2019appelles — written French requires the -s. How to fix it: every tu form of an -ER verb ends in -es (tu t\u2019appelles). Silent but written.' },
            { prompt: 'Enchante ! (written by a woman)', answer: 'Enchantée !', explanation: 'How the mistake happens: pronunciation is identical for both genders. Why it does not work: enchanté behaves like an adjective agreeing with the SPEAKER — a woman adds -e. How to fix it: ask "who is speaking?" — man → enchanté, woman → enchantée.' },
            { prompt: 'Salut, comment allez-vous ? (to your best friend)', answer: 'Salut, ça va ?', explanation: 'How the mistake happens: memorising "comment allez-vous" as THE how-are-you. Why it does not work: salut (informal) clashes with allez-vous (formal) — a register mismatch in one sentence. How to fix it: keep the register consistent: salut pairs with ça va ? / tu t\u2019appelles comment ?; bonjour pairs with allez-vous.' },
            { prompt: 'Bonjour, comment allez-vous ? (said at 9pm)', answer: 'Bonsoir, comment allez-vous ?', explanation: 'How the mistake happens: bonjour is memorised as "hello" for everything. Why it does not work: French splits the day — bonjour until roughly 6pm, bonsoir after. How to fix it: check the clock before the greeting; the rest of the sentence stays the same.' },
        ],
        writing: {
            task: 'Write a short dialogue (6–8 lines) between YOU and a French shopkeeper you meet for the first time at 7pm. Greet, introduce yourself, ask their name, exchange how-are-you, and say goodbye. Then write the SAME dialogue again as if the person were your best friend.',
            requirements: [
                'Two versions: formal (vous) and informal (tu) — every line register-consistent',
                's\u2019appeler for both names (never je suis + name)',
                'Bonsoir for the 7pm greeting in both versions',
                'One enchanté(e) spelled to match your gender',
                'One farewell from the à… family (à bientôt / à demain / au revoir)',
            ],
            minWords: 40,
        },
        checklist: [
            'I can choose tu or vous for: friend, shopkeeper, teacher, child, elder — instantly',
            'I introduce myself with je m\u2019appelle, and I know why je suis + name is non-standard',
            'I wrote the s\u2019appeler column from memory: m\u2019appelle, t\u2019appelles, s\u2019appelle, nous appelons, vous appelez',
            'My enchanté(e) agrees with MY gender, and I know why',
            'I know which final consonants are silent and the CaReFuL exceptions',
            'I can run the full greeting ritual out loud — morning and evening, formal and casual',
        ],
    },
};

// ── Registry ─────────────────────────────────────────────────────────────────
// Key = `${level}:${slug}` matching TCF_SYLLABUS. Add entries here as lectures
// are written; unwritten topics fall back to AI generation automatically.
export const STATIC_FRENCH_LESSONS: Record<string, StaticFrenchLesson> = {
    'A1:greetings': a1Greetings,
};

export const hasStaticFrenchLesson = (level: string, slug: string): boolean =>
    Boolean(STATIC_FRENCH_LESSONS[`${level}:${slug}`]);
