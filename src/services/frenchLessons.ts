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

// ── A1 · Greetings & Introductions ───────────────────────────────────────────
const a1Greetings: TcfLesson = {
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
};

// ── Registry ─────────────────────────────────────────────────────────────────
// Key = `${level}:${slug}` matching TCF_SYLLABUS. Add entries here as lectures
// are written; unwritten topics fall back to AI generation automatically.
export const STATIC_FRENCH_LESSONS: Record<string, TcfLesson> = {
    'A1:greetings': a1Greetings,
};

export const hasStaticFrenchLesson = (level: string, slug: string): boolean =>
    Boolean(STATIC_FRENCH_LESSONS[`${level}:${slug}`]);
