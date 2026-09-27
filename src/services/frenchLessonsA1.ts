// A1 lectures part 1 — Numbers & Dates/Time, Family & People.
// Same gold-standard format as the approved A1:greetings template:
// full lesson + traps + homework (A–D) + checklistRemedial + glossary
// (spread over BASE_GLOSSARY so shared function words are covered).

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── A1 · Numbers, Dates & Time ───────────────────────────────────────────────
const a1Numbers: StaticFrenchLesson = {
    title: 'Numbers, Dates & Time',
    objective: 'Count and use the numbers that matter, tell the time with il est, say the days and months, and give the time or day of an appointment — in and out of the 24-hour clock.',

    vocabulary: [
        { fr: 'vingt', en: 'twenty', example: { fr: 'J\u2019ai vingt ans.', en: 'I am twenty (years old).' }, related: [{ fr: 'vingt et un', en: 'twenty-one' }, { fr: 'vingt-cinq', en: 'twenty-five' }] },
        { fr: 'trente', en: 'thirty', example: { fr: 'Il a trente ans.', en: 'He is thirty.' }, related: [{ fr: 'trente et un', en: 'thirty-one' }] },
        { fr: 'quarante', en: 'forty', example: { fr: 'Il est quarante heures ? Non !', en: 'Forty hours? No! (joke — hours stop at 24)' }, related: [{ fr: 'cinquante', en: 'fifty' }] },
        { fr: 'soixante', en: 'sixty', example: { fr: 'Soixante et dix = 70.', en: 'Sixty and ten = 70.' }, related: [{ fr: 'soixante-dix', en: 'seventy (60+10)' }] },
        { fr: 'quatre-vingts', en: 'eighty (lit. four twenties)', example: { fr: 'Il y a quatre-vingts étudiants.', en: 'There are eighty students.' }, related: [{ fr: 'quatre-vingt-dix', en: 'ninety (4×20+10)' }] },
        { fr: 'cent', en: 'hundred', example: { fr: 'Cent euros, s\u2019il vous plaît.', en: 'A hundred euros, please.' }, related: [{ fr: 'deux cents', en: 'two hundred (with -s)' }] },
        { fr: 'quelle heure est-il ?', en: 'what time is it?', example: { fr: 'Pardon, quelle heure est-il ?', en: 'Excuse me, what time is it?' }, related: [{ fr: 'vous avez l\u2019heure ?', en: 'do you have the time?' }] },
        { fr: 'il est… heures', en: 'it is … o\u2019clock', example: { fr: 'Il est trois heures.', en: 'It is three o\u2019clock.' }, related: [{ fr: 'midi', en: 'noon (12pm)' }, { fr: 'minuit', en: 'midnight' }] },
        { fr: 'et quart', en: 'quarter past', example: { fr: 'Il est dix heures et quart.', en: 'It is quarter past ten.' }, related: [{ fr: 'et demie', en: 'half past' }, { fr: 'moins le quart', en: 'quarter to' }] },
        { fr: 'lundi', en: 'Monday', example: { fr: 'Le cours est lundi.', en: 'The class is on Monday.' }, related: [{ fr: 'mardi', en: 'Tuesday' }, { fr: 'mercredi', en: 'Wednesday' }] },
        { fr: 'jeudi', en: 'Thursday', example: { fr: 'On se voit jeudi ?', en: 'See you Thursday?' }, related: [{ fr: 'vendredi', en: 'Friday' }, { fr: 'samedi', en: 'Saturday' }] },
        { fr: 'dimanche', en: 'Sunday', example: { fr: 'Le dimanche, je me repose.', en: 'On Sundays I rest.' }, related: [{ fr: 'le week-end', en: 'the weekend' }] },
        { fr: 'la semaine', en: 'the week', gender: 'feminine', example: { fr: 'La semaine commence lundi.', en: 'The week starts on Monday.' }, related: [{ fr: 'le mois', en: 'the month' }, { fr: 'l\u2019année', en: 'the year' }] },
        { fr: 'le rendez-vous', en: 'the appointment / meeting', gender: 'masculine', example: { fr: 'Mon rendez-vous est à dix heures.', en: 'My appointment is at ten.' }, related: [{ fr: 'le cours', en: 'the class' }, { fr: 'la réunion', en: 'the meeting' }] },
    ],

    pronunciation: [
        { fr: 'six', approx: 'SEESS', en: 'six — but in "six ans" it links: "seez-AHN"' },
        { fr: 'huit', approx: 'WHEET', en: 'the h is silent; the t comes alive before a vowel: huit heures = "weet-EUR"' },
        { fr: 'neuf heures', approx: 'nuh-VEUR', en: 'nine hours — the f of neuf sounds like a v before heures' },
        { fr: 'quatre-vingts', approx: 'KAH-truh-VAN', en: 'four-twenties — the final s is silent' },
        { fr: 'vingt ans', approx: 'van-TAHN', en: 'twenty years — the t links into ans' },
        { fr: 'mois', approx: 'MWAH', en: 'month — one syllable, no s sound' },
    ],

    grammar: {
        rule: 'Time always uses IL EST (never c\u2019est); French counts 70/80/90 with addition (60+10, 4×20, 4×20+10); days and months are lowercase and take no preposition after il est.',
        explanation: 'English says "it is 3 o\u2019clock" — French also uses il est, and the il is impersonal: you can never replace it. For 70/80/90 French keeps its old counting system: soixante-dix is 60+10, quatre-vingts is 4×20, quatre-vingt-dix is 4×20+10 — Belgium and Switzerland say septante and nonante instead, but the exam uses the French system. Days and months are NOT capitalized (lundi, janvier) — capitalizing them is a written exam error. And "on Mondays" is le lundi: the article makes it habitual.',
        examples: [
            { fr: 'Il est dix heures du matin.', en: 'It is ten in the morning.', breakdown: ['il est = it is (impersonal)', 'dix heures = ten o\u2019clock', 'du matin = of the morning (am)'] },
            { fr: 'Il est quatre-vingt-dix heures ? Non, c\u2019est impossible !', en: 'It is ninety o\u2019clock? No, that is impossible!', breakdown: ['quatre-vingt-dix = 90 (4×20+10)', 'impossible = impossible'] },
            { fr: 'Le train part à quatorze heures trente.', en: 'The train leaves at 2:30pm (14:30).', breakdown: ['le train = the train', 'part = leaves (partir)', 'à = at', 'quatorze heures trente = 14:30 — the 24-hour clock'] },
            { fr: 'Le lundi, je travaille de neuf heures à cinq heures.', en: 'On Mondays I work from nine to five.', breakdown: ['le lundi = on Mondays (habitual)', 'je travaille = I work', 'de…à… = from…to…'] },
            { fr: 'Nous sommes le trois mai.', en: 'It is May 3rd.', breakdown: ['nous sommes = it is (for the date)', 'le trois mai = the third of May — cardinals, lowercase month'] },
            { fr: 'Mon rendez-vous est à midi et quart.', en: 'My appointment is at quarter past noon.', breakdown: ['mon rendez-vous = my appointment', 'à midi = at noon (no heures after midi!)', 'et quart = quarter past'] },
        ],
        commonMistakes: [
            'Saying "C\u2019est trois heures" — time is impersonal: IL est trois heures. (But for a date you say nous sommes le 3 mai or on est le 3 mai.)',
            'Writing days or months with a capital: lundi, juillet — NOT Lundi/Juillet (English habit).',
            '"Quatre-vingt" without the -s for 80 standing alone: quatre-vingts. But 81 = quatre-vingt-un (no -s before another number).',
            'Using en with days: en lundi is wrong — on Monday = lundi alone or le lundi for the habitual.',
        ],
    },

    transformations: [
        { type: 'Positive', fr: 'Le rendez-vous est à dix heures.', en: 'The appointment is at ten o\u2019clock.' },
        { type: 'Negative', fr: 'Le rendez-vous n\u2019est pas à dix heures.', en: 'The appointment is not at ten o\u2019clock.' },
        { type: 'Question (est-ce que)', fr: 'Est-ce que le rendez-vous est à dix heures ?', en: 'Is the appointment at ten o\u2019clock?' },
        { type: 'Question word', fr: 'À quelle heure est le rendez-vous ?', en: 'At what time is the appointment?' },
        { type: 'Plural', fr: 'Les rendez-vous sont à dix heures.', en: 'The appointments are at ten o\u2019clock.' },
        { type: 'Past (imparfait)', fr: 'Le rendez-vous était à dix heures.', en: 'The appointment was at ten o\u2019clock.' },
        { type: 'Future', fr: 'Le rendez-vous sera à dix heures.', en: 'The appointment will be at ten o\u2019clock.' },
        { type: 'With half past', fr: 'Le rendez-vous est à dix heures et demie.', en: 'The appointment is at half past ten.' },
    ],

    sentenceBuilding: [
        { fr: 'Il est dix heures.', en: 'It is ten o\u2019clock.' },
        { fr: 'Il est dix heures et quart.', en: 'It is quarter past ten.' },
        { fr: 'Mon cours est à dix heures et quart le lundi.', en: 'My class is at quarter past ten on Mondays.' },
        { fr: 'Mon cours de français est à dix heures et quart le lundi matin.', en: 'My French class is at quarter past ten on Monday mornings.' },
        { fr: 'Mon cours de français est à dix heures et quart le lundi matin, dans la salle numéro douze.', en: 'My French class is at quarter past ten on Monday mornings, in room number twelve.' },
    ],

    practice: [
        { instruction: 'Write 80 in French (standing alone):', question: '80 = ?', answer: 'quatre-vingts (with -s — but 81 = quatre-vingt-un, no -s)' },
        { instruction: 'Give the time in words:', question: 'Il est 14 h 30.', answer: 'Il est quatorze heures trente. (the 24-hour clock)' },
        { instruction: 'Correct or wrong — "C\u2019est midi"?', question: 'It is noon.', answer: 'Wrong: Il est midi. (midi and minuit take no heures)' },
        { instruction: 'Say "on Wednesdays":', question: 'le mercredi or en mercredi ?', answer: 'le mercredi — days take le for the habitual, never en' },
        { instruction: 'Translate:', question: 'The meeting is at quarter to five.', answer: 'La réunion est à cinq heures moins le quart.' },
        { instruction: 'Fill in:', question: 'Le mois après juillet est ______.', answer: 'août (August — and it has no accent!)' },
    ],

    translationPractice: [
        { en: 'I am twenty-five years old.', fr: 'J\u2019ai vingt-cinq ans.' },
        { en: 'It is three o\u2019clock.', fr: 'Il est trois heures.' },
        { en: 'The train leaves at 2:30pm.', fr: 'Le train part à quatorze heures trente.' },
        { en: 'Today is Monday.', fr: 'Aujourd\u2019hui, c\u2019est lundi.' },
        { en: 'It is quarter to five.', fr: 'Il est cinq heures moins le quart.' },
        { en: 'I work from nine to five.', fr: 'Je travaille de neuf heures à cinq heures.' },
    ],

    reverseTranslation: [
        { fr: 'Il est dix heures et demie.', en: 'It is half past ten.' },
        { fr: 'Le rendez-vous est à midi.', en: 'The appointment is at noon.' },
        { fr: 'Le samedi, je ne travaille pas.', en: 'On Saturdays I do not work.' },
        { fr: 'Nous sommes le quinze mars.', en: 'It is March 15th.' },
    ],

    register: {
        informal: 'Il est dix heures ? On y va ? — Ouais, cinq minutes ! (spoken: numbers and times get shortened, on instead of nous)',
        neutral: 'Le cours est à dix heures et quart le lundi.',
        formal: 'La réunion du lundi commence à quatorze heures trente. (the 24-hour clock is the formal written standard)',
    },

    culture: 'France runs on the 24-hour clock — a cinema ticket says 20 h 30, not 8:30pm, and train times are always 24-hour. The week starts on Monday (lundi), and Sunday shops are closed by law in most cities. The strange numbers 80 (quatre-vingts = four twenties) and 90 come from ancient Gaulish counting in twenties — Belgium gave up and says septante (70) and nonante (90).',

    freeProduction: 'Write or record your real weekly schedule (5–7 sentences). Guiding questions: What do you do on Monday morning, and at what time? Which day is your busiest — what happens at each hour? What do you do on Saturday? Is there a day you never work? What time do you usually wake up and go to bed?',

    miniTest: [
        { question: 'How do you write 80?', options: ['quatre-vingt', 'quatre-vingts', 'quatre-vingte', 'huitante'], answer: 'quatre-vingts' },
        { question: 'Which sentence is correct for "It is 3 o\u2019clock"?', options: ['C\u2019est trois heures.', 'Il est trois heures.', 'Il a trois heures.', 'Elle est trois heures.'], answer: 'Il est trois heures.' },
        { question: '"Le lundi" means…', options: ['this Monday', 'next Monday', 'on Mondays (habitual)', 'last Monday'], answer: 'on Mondays (habitual)' },
        { question: 'It is quarter past noon. You say…', options: ['Il est midi et quart.', 'Il est midi et demie.', 'Il est douze et quart.', 'C\u2019est midi moins le quart.'], answer: 'Il est midi et quart.' },
        { question: 'Which is WRITTEN correctly?', options: ['Le Lundi je travaille.', 'le Lundi je travaille.', 'Le lundi je travaille.', 'le lundi Je travaille.'], answer: 'Le lundi je travaille.' },
    ],

    review: [
        'Keep the greetings warm — every time drill here can open with Bonjour and close with À bientôt.',
        'Next lesson: Family & People — you will need numbers for ages (j\u2019ai… ans) and possessives for family members.',
    ],

    traps: [
        'Saying "C\u2019est trois heures" for time — time is impersonal IL EST, always.',
        'Capitalizing days and months (Lundi, Juillet) — English habit, French error. Lowercase, always.',
        'quatre-vingt without the -s for 80, or quatre-vingts for 81 — the -s appears only when nothing follows.',
        'Mixing en + days (en lundi) — days take le (le lundi = on Mondays); en is for months, seasons and years (en juillet, en été, en 2026).',
    ],

    homework: {
        intro: 'Four sections. Numbers punish guesswork — write them out in full, then check and read every explanation.',
        translation: [
            { prompt: 'I am thirty years old.', answer: 'J\u2019ai trente ans.', alt: ["J'ai trente ans"], explanation: 'Age uses AVOIR (to have), never être — "j\u2019ai trente ans" is literally "I have thirty years".' },
            { prompt: 'It is twelve o\u2019clock.', answer: 'Il est midi.', alt: ['Il est midi !'], explanation: 'midi (noon) and minuit take no heures: il est midi, il est minuit — never "il est douze heures" for noon.' },
            { prompt: 'The class is on Wednesday.', answer: 'Le cours est mercredi.', alt: ['Le cours est le mercredi'], explanation: 'A single day takes no preposition: le cours est mercredi. Adding le (le mercredi) changes the meaning to "on Wednesdays (habitually)".' },
            { prompt: 'It is quarter past six.', answer: 'Il est six heures et quart.', alt: ['Il est 6 heures et quart'], explanation: 'et quart = quarter past; it comes AFTER the hour: six heures et quart.' },
            { prompt: 'The meeting is at 9:30am.', answer: 'La réunion est à neuf heures et demie.', alt: ["La réunion est à 9 heures et demie"], explanation: 'à + time for appointments; et demie = half past. With spoken times, demie agrees with heures (feminine).' },
            { prompt: 'We are Sunday, May 5th.', answer: 'Nous sommes dimanche le cinq mai.', alt: ["Aujourd'hui, c'est dimanche le cinq mai"], explanation: 'The date formula: nous sommes + day + le + cardinal number + month — le cinq mai, never "le cinquième mai" except the 1st (le premier).' },
            { prompt: 'The museum opens at ten in the morning.', answer: 'Le musée ouvre à dix heures du matin.', alt: ["Le musée ouvre à 10 heures"], explanation: 'à dix heures du matin — du matin marks AM; in the 24-hour clock you would simply write 10 h.' },
            { prompt: 'I do not work on Saturdays.', answer: 'Je ne travaille pas le samedi.', alt: ["Je ne travaille pas samedi"], explanation: 'le samedi (habitual) or samedi (this/next Saturday). The negation sandwich wraps travaille: ne travaille pas.' },
        ],
        blanks: [
            { prompt: '70 = ______', answer: 'soixante-dix', alt: ['soixante et dix'], explanation: '60+10 — literally "sixty-ten". Belgium says septante, but the exam expects soixante-dix.' },
            { prompt: '80 = ______', answer: 'quatre-vingts', explanation: 'lit. four twenties. The -s appears because nothing follows; 81 = quatre-vingt-un drops it.' },
            { prompt: '90 = ______', answer: 'quatre-vingt-dix', explanation: '4×20+10 — no -s anywhere, because dix follows.' },
            { prompt: 'Il est cinq heures et ______ (quarter past five).', answer: 'quart', explanation: 'et quart = quarter past; moins le quart = quarter to. The quart family always uses et / moins le.' },
            { prompt: 'Le film commence à neuf heures et ______ (half past nine).', answer: 'demie', explanation: 'et demie agrees with heures (feminine). After midi/minuit you hear et demie too, though purists say et demie only with heures.' },
            { prompt: 'J\u2019ai ______ ans. (40)', answer: 'quarante', explanation: 'Age = avoir + number + ans. Quarante has no q — and do not confuse it with quatorze (14).' },
        ],
        corrections: [
            { prompt: 'C\u2019est trois heures et demie.', answer: 'Il est trois heures et demie.', explanation: 'How the mistake happens: English "it is" translates word-for-word to c\u2019est. Why it does not work: clock time is impersonal IL est — c\u2019est is for identifying things (c\u2019est mon livre). How to fix it: all clock times start il est.' },
            { prompt: 'Le Lundi, je travaille.', answer: 'Le lundi, je travaille.', explanation: 'How the mistake happens: English capitalizes Monday. Why it does not work: French days and months are ordinary nouns — no capital. How to fix it: lowercase lundi, mardi… janvier, juillet — always. (A capital is fine only at the start of a sentence.)' },
            { prompt: 'J\u2019ai quatre-vingts ans.', answer: 'J\u2019ai quatre-vingts ans — correct!', explanation: 'Trick question — this one was RIGHT: 80 standing alone keeps its -s. But 81 = quatre-vingt-un drops the -s before un. The -s rule depends on what follows.' },
            { prompt: 'Je suis vingt-cinq ans.', answer: 'J\u2019ai vingt-cinq ans.', explanation: 'How the mistake happens: English "I am 25". Why it does not work: French treats age as a possession — you HAVE years. How to fix it: avoir + number + ans. Je suis + ans is an instant A1-flag error.' },
            { prompt: 'Il est en lundi.', answer: 'C\u2019est lundi. (or: Nous sommes lundi.)', explanation: 'How the mistake happens: mixing the en of months with days. Why it does not work: days take no preposition for a single date — c\u2019est lundi; and le lundi means "on Mondays". How to fix it: c\u2019est + day for today; le + day for habituals.' },
        ],
        writing: {
            task: 'Write your real weekly schedule (6–8 sentences): pick three days of the week and say what you do on each and at what times (use à … heures, et demie, et quart). Add one question about the reader\u2019s schedule (Et vous… ?).',
            requirements: [
                'Three different days of the week (lowercase!)',
                'At least five different time expressions (à … heures, et quart, et demie, midi, minuit)',
                'One 24-hour time (like quatorze heures trente)',
                'One question to the reader (Et vous, … ?)',
                'IL est for clock time — never c\u2019est',
            ],
            minWords: 50,
        },
        checklist: [
            'I can count 0–69 and understand the 70/80/90 system (soixante-dix, quatre-vingts, quatre-vingt-dix)',
            'I use il est for clock time, never c\u2019est — and midi/minuit take no heures',
            'I can tell time with et quart / et demie / moins le quart',
            'Days and months are lowercase, and I know le lundi means "on Mondays"',
            'I use en for months/seasons/years and le + number for dates (le cinq mai)',
            'I can say my weekly schedule out loud with at least five time expressions',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'The 70/80/90 system is addition, not new words: 70 = 60+10 (soixante-dix), 80 = 4×20 (quatre-vingts), 90 = 4×20+10 (quatre-vingt-dix). Say the addition out loud as you write: "sixty-ten", "four twenties", "four twenties ten". The -s on quatre-vingts appears only when the number stands alone.',
                examples: [
                    { fr: '75 = soixante-quinze (60+15) · 85 = quatre-vingt-cinq · 95 = quatre-vingt-quinze', en: '75 · 85 · 95 — the addition never changes' },
                    { fr: 'Il y a quatre-vingts pages. — le page quatre-vingt-un', en: 'There are 80 pages. — page 81 (no -s before un)' },
                ],
            },
            {
                explanation: 'Clock time is impersonal: il est + heure(s). The il does not mean "he" — it is a fixed impersonal like English "it". C\u2019est is only for identifying things. And midi/minuit replace the hour word entirely: il est midi, il est minuit — never "il est douze heures" for noon.',
                examples: [
                    { fr: 'Quelle heure est-il ? — Il est huit heures.', en: 'What time is it? — It is eight o\u2019clock.' },
                    { fr: 'Il est midi. / Il est minuit.', en: 'It is noon. / It is midnight.' },
                ],
            },
            {
                explanation: 'Minutes come AFTER the hour with et (past) or moins (to): dix heures et quart (quarter past ten), dix heures et demie (half past ten), dix heures moins le quart (quarter to ten). Demie agrees with heures; at midi/minuit just add et quart.',
                examples: [
                    { fr: 'Il est deux heures et quart. / Il est trois heures moins dix.', en: 'It is quarter past two. / It is ten to three.' },
                    { fr: 'Il est midi et quart.', en: 'It is quarter past noon.' },
                ],
            },
            {
                explanation: 'Days and months are ordinary French nouns — no capitals (English habit). For a single day use the bare day (le cours est lundi); for the habitual use le + day (le lundi = on Mondays). Months take en (en juillet), dates take le + cardinal (le cinq mai).',
                examples: [
                    { fr: 'Le cours est lundi. / Le lundi, j\u2019ai cours.', en: 'The class is on Monday. / On Mondays I have class.' },
                    { fr: 'Mon anniversaire est le dix août, en août.', en: 'My birthday is August 10th — in August.' },
                ],
            },
            {
                explanation: 'Dates use CARDINAL numbers with le: le cinq mai (the 5th of May) — the only exception is the 1st: le premier mai. And the 24-hour clock is the written standard for schedules: 14 h 30 = quatorze heures trente.',
                examples: [
                    { fr: 'Nous sommes le premier avril. — Le train part à quatorze heures trente.', en: 'It is April 1st. — The train leaves at 2:30pm.' },
                    { fr: 'Le concert est le vingt-deux octobre à vingt heures.', en: 'The concert is on October 22nd at 8pm.' },
                ],
            },
            {
                explanation: 'A schedule is just sentences with aller/faire/avoir + à + time. Chain them with et, puis (then), le matin (in the morning), l\u2019après-midi (in the afternoon), le soir (in the evening). Say it out loud three times — the exam opens with schedule questions.',
                examples: [
                    { fr: 'Le lundi, je travaille de neuf heures à cinq heures. Le soir, je regarde la télé.', en: 'On Mondays I work from nine to five. In the evening I watch TV.' },
                    { fr: 'Et vous, quels sont vos horaires ?', en: 'And you, what is your schedule?' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'zéro': { en: 'zero', register: 'neutral' },
        'un': { en: 'one / a (masc)', gender: 'masculine', register: 'neutral' },
        'deux': { en: 'two', register: 'neutral', note: 'links before a vowel: deux ans = "duh-ZAHN"' },
        'trois': { en: 'three', register: 'neutral' },
        'quatre': { en: 'four', register: 'neutral' },
        'cinq': { en: 'five', register: 'neutral', note: 'final q sound: "sank"' },
        'six': { en: 'six', register: 'neutral', note: 'SEESS alone, "seez" before a vowel' },
        'sept': { en: 'seven', register: 'neutral', note: 'pronounced SET' },
        'huit': { en: 'eight', register: 'neutral', note: 'silent h — WHEET' },
        'neuf': { en: 'nine', register: 'neutral', note: 'f sounds like v before heures: neuf heures' },
        'dix': { en: 'ten', register: 'neutral', note: 'DEESS alone, "deez" before a vowel' },
        'onze': { en: 'eleven', register: 'neutral' },
        
        'treize': { en: 'thirteen', register: 'neutral' },
        'quatorze': { en: 'fourteen', register: 'neutral' },
        'quinze': { en: 'fifteen', register: 'neutral' },
        'seize': { en: 'sixteen', register: 'neutral' },
        'dix-sept': { en: 'seventeen', register: 'neutral' },
        'dix-huit': { en: 'eighteen', register: 'neutral' },
        'dix-neuf': { en: 'nineteen', register: 'neutral' },
        'vingt': { en: 'twenty', register: 'neutral', note: 'vingt ans — t links' },
        'trente': { en: 'thirty', register: 'neutral' },
        'quarante': { en: 'forty', register: 'neutral' },
        'cinquante': { en: 'fifty', register: 'neutral' },
        'soixante': { en: 'sixty', register: 'neutral' },
        'soixante-dix': { en: 'seventy (60+10)', register: 'neutral' },
        'quatre-vingts': { en: 'eighty (4×20)', register: 'neutral', note: '-s only standing alone' },
        'quatre-vingt-dix': { en: 'ninety (4×20+10)', register: 'neutral' },
        'cent': { en: 'hundred', gender: 'masculine', register: 'neutral', note: 'deux cents with -s; deux cent un without' },
        'midi': { en: 'noon (12pm)', gender: 'masculine', register: 'neutral', note: 'no heures after midi' },
        'minuit': { en: 'midnight', gender: 'masculine', register: 'neutral' },
        'heure': { en: 'hour / o\u2019clock', gender: 'feminine', plural: 'heures', register: 'neutral' },
        'heures': { en: 'hours / o\u2019clock (plural)', gender: 'feminine', register: 'neutral' },
        'et quart': { en: 'quarter past', register: 'neutral' },
        'et demie': { en: 'half past', register: 'neutral', note: 'demie agrees with heures' },
        'moins le quart': { en: 'quarter to', register: 'neutral' },
        'quelle heure est-il': { en: 'what time is it?', register: 'neutral' },
        'lundi': { en: 'Monday', gender: 'masculine', register: 'neutral', note: 'lowercase — days are ordinary nouns' },
        'mardi': { en: 'Tuesday', gender: 'masculine', register: 'neutral' },
        'mercredi': { en: 'Wednesday', gender: 'masculine', register: 'neutral', note: 'mer-CRUH-dee — the first r is silent' },
        'jeudi': { en: 'Thursday', gender: 'masculine', register: 'neutral' },
        'vendredi': { en: 'Friday', gender: 'masculine', register: 'neutral' },
        'samedi': { en: 'Saturday', gender: 'masculine', register: 'neutral' },
        'dimanche': { en: 'Sunday', gender: 'masculine', register: 'neutral' },
        'le week-end': { en: 'the weekend', gender: 'masculine', register: 'neutral' },
        'semaine': { en: 'week', gender: 'feminine', register: 'neutral' },
        'mois': { en: 'month', gender: 'masculine', register: 'neutral', note: 'pronounced MWAH — one syllable' },
        'année': { en: 'year (the whole year)', gender: 'feminine', register: 'neutral' },
        'janvier': { en: 'January', gender: 'masculine', register: 'neutral' },
        'juillet': { en: 'July', gender: 'masculine', register: 'neutral' },
        'août': { en: 'August', gender: 'masculine', register: 'neutral', note: 'no accent — and starts with a vowel' },
        'rendez-vous': { en: 'appointment / meeting', gender: 'masculine', register: 'neutral', note: 'same singular and plural' },
        'réunion': { en: 'meeting', gender: 'feminine', register: 'neutral' },
        'le train part': { en: 'the train leaves', register: 'neutral' },
        'part': { en: 'leaves (from partir)', register: 'neutral' },
        'travaille': { en: 'work(s) (from travailler)', register: 'neutral' },
        'du matin': { en: 'in the morning (am)', register: 'neutral' },
        'regarde': { en: 'watch / look at', register: 'neutral' },
        'horaires': { en: 'schedule / hours', gender: 'masculine', register: 'neutral', note: 'quels sont vos horaires ? = what are your hours' },
        'commence': { en: 'starts / begins', register: 'neutral' },
        'salle': { en: 'room', gender: 'feminine', register: 'neutral' },
        'douze': { en: 'twelve', register: 'neutral' },
    },
};

// ── A1 · Family & People ─────────────────────────────────────────────────────
const a1Family: StaticFrenchLesson = {
    title: 'Family & People',
    objective: 'Present your family with the right possessive (mon/ma/mes), describe people with agreeing adjectives, and ask about someone else\u2019s family — the personal ground the TCF covers in every format.',

    vocabulary: [
        { fr: 'la famille', en: 'the family', gender: 'feminine', example: { fr: 'J\u2019ai une grande famille.', en: 'I have a big family.' }, related: [{ fr: 'les parents', en: 'the parents' }] },
        { fr: 'le père', en: 'the father', gender: 'masculine', example: { fr: 'Mon père est professeur.', en: 'My father is a teacher.' }, related: [{ fr: 'papa', en: 'dad (informal)' }] },
        { fr: 'la mère', en: 'the mother', gender: 'feminine', example: { fr: 'Ma mère s\u2019appelle Anne.', en: 'My mother\u2019s name is Anne.' }, related: [{ fr: 'maman', en: 'mum (informal)' }] },
        { fr: 'le frère', en: 'the brother', gender: 'masculine', plural: 'frères', example: { fr: 'J\u2019ai deux frères.', en: 'I have two brothers.' }, related: [{ fr: 'la sœur', en: 'the sister' }] },
        { fr: 'la sœur', en: 'the sister', gender: 'feminine', plural: 'sœurs', example: { fr: 'Ma sœur a dix ans.', en: 'My sister is ten.' }, related: [{ fr: 'le frère', en: 'the brother' }] },
        { fr: 'le fils', en: 'the son', gender: 'masculine', plural: 'fils', example: { fr: 'Mon fils a cinq ans.', en: 'My son is five.' }, related: [{ fr: 'la fille', en: 'the daughter / girl' }] },
        { fr: 'la fille', en: 'the daughter / girl', gender: 'feminine', plural: 'filles', example: { fr: 'Nous avons une fille.', en: 'We have a daughter.' }, related: [{ fr: 'le garçon', en: 'the boy' }] },
        { fr: 'les parents', en: 'the parents', gender: 'masculine', example: { fr: 'Mes parents habitent à Lyon.', en: 'My parents live in Lyon.' }, related: [{ fr: 'les grands-parents', en: 'the grandparents' }] },
        { fr: 'le grand-père', en: 'the grandfather', gender: 'masculine', example: { fr: 'Mon grand-père a soixante-dix ans.', en: 'My grandfather is seventy.' }, related: [{ fr: 'la grand-mère', en: 'the grandmother' }] },
        { fr: 'le mari', en: 'the husband', gender: 'masculine', example: { fr: 'Son mari est médecin.', en: 'Her husband is a doctor.' }, related: [{ fr: 'la femme', en: 'the wife / woman' }] },
        { fr: 'marié(e)', en: 'married', register: 'neutral', note: 'add -e for a woman: mariée', example: { fr: 'Je suis marié. — Elle est mariée.', en: 'I am married (man). — She is married.' }, related: [{ fr: 'célibataire', en: 'single (same for both genders)' }] },
        { fr: 'l\u2019oncle', en: 'the uncle', gender: 'masculine', example: { fr: 'Mon oncle habite à Marseille.', en: 'My uncle lives in Marseille.' }, related: [{ fr: 'la tante', en: 'the aunt' }] },
        { fr: 'grand(e)', en: 'tall / big', register: 'neutral', note: 'feminine grande, plural grands/grandes', example: { fr: 'Mon frère est très grand.', en: 'My brother is very tall.' }, related: [{ fr: 'petit(e)', en: 'small / short' }] },
        { fr: 'gentil(le)', en: 'kind / nice', register: 'neutral', note: 'feminine gentille with double l', example: { fr: 'Ma sœur est très gentille.', en: 'My sister is very kind.' }, related: [{ fr: 'sympa', en: 'nice (informal, invariable)' }] },
    ],

    pronunciation: [
        { fr: 'père', approx: 'PAIR', en: 'open è — like the ea in bear' },
        { fr: 'sœur', approx: 'SURH', en: 'the œ is one sound — rounded like the i in bird (British)' },
        { fr: 'fils', approx: 'FEECE', en: 'son — the l is SILENT! fils = "feece", never "filz"' },
        { fr: 'fille', approx: 'FEE-yuh', en: 'double l after i sounds like a y: "fee-y"' },
        { fr: 'gentille', approx: 'zhon-TEE-yuh', en: 'the g is soft (zh) before e' },
        { fr: 'grands', approx: 'GRAHN', en: 'the final -s is silent, the d too: one nasal sound' },
    ],

    grammar: {
        rule: 'The possessive agrees with the THING OWNED (not the owner), and adjectives agree with the person described — both rules happen in the same sentence about family.',
        explanation: 'English "his sister" and "her sister" both become sa sœur, because sœur is feminine — the possessive follows the NOUN. And when you describe the person, the adjective follows THEM: mon frère est grand (masc) but ma sœur est grande (fem +e). The only wrinkle: a feminine noun starting with a vowel takes the masculine possessive for sound — mon amie, not ma amie. Family is where all three systems meet: possessives, agreement and s\u2019appeler.',
        examples: [
            { fr: 'Mon frère s\u2019appelle Paul et ma sœur s\u2019appelle Marie.', en: 'My brother is called Paul and my sister is called Marie.', breakdown: ['mon frère = my brother (masc → mon)', 'ma sœur = my sister (fem → ma)', 's\u2019appelle = is called'] },
            { fr: 'C\u2019est ma mère. Elle est professeure.', en: 'This is my mother. She is a teacher.', breakdown: ['c\u2019est = this is', 'ma mère = my mother', 'elle est professeure = she is a teacher — no article'] },
            { fr: 'Mon grand-père est très grand.', en: 'My grandfather is very tall.', breakdown: ['mon grand-père = my grandfather', 'très = very', 'grand = tall (masc — matches grand-père)'] },
            { fr: 'Ma grand-mère est petite et gentille.', en: 'My grandmother is short and kind.', breakdown: ['ma grand-mère = my grandmother', 'petite = short (fem +e)', 'gentille = kind (fem, double l)'] },
            { fr: 'J\u2019ai deux frères et une sœur.', en: 'I have two brothers and one sister.', breakdown: ['j\u2019ai = I have', 'deux frères = two brothers (plural -s)', 'une sœur = one sister'] },
            { fr: 'Leurs enfants sont très gentils.', en: 'Their children are very kind.', breakdown: ['leurs enfants = their children', 'sont = are', 'gentils = kind (masc plural +s)'] },
        ],
        commonMistakes: [
            'Saying "sa frère" for his brother — the possessive follows FRÈRE (masculine): mon/ton/son frère, whatever the owner\u2019s gender.',
            'Writing "ma amie" — feminine nouns starting with a vowel take the masculine possessive for sound: mon amie (the noun stays feminine!).',
            '"Mon père est grande" — the adjective agrees with the person described: un père is masculine → grand.',
            'Capitalizing "Maman" mid-sentence — maman/papa are lowercase unless starting the sentence (they are ordinary nouns).',
        ],
    },

    transformations: [
        { type: 'Positive', fr: 'C\u2019est mon frère.', en: 'This is my brother.' },
        { type: 'Negative', fr: 'Ce n\u2019est pas mon frère.', en: 'This is not my brother.' },
        { type: 'Question', fr: 'Est-ce que c\u2019est ton frère ?', en: 'Is this your brother?' },
        { type: 'Plural', fr: 'Ce sont mes frères.', en: 'These are my brothers.' },
        { type: 'His / her swap', fr: 'C\u2019est sa sœur. (his AND her — sœur is feminine)', en: 'This is his/her sister.' },
        { type: 'Description (masc)', fr: 'Mon frère est grand et gentil.', en: 'My brother is tall and kind.' },
        { type: 'Description (fem)', fr: 'Ma sœur est grande et gentille.', en: 'My sister is tall and kind.' },
        { type: 'With age', fr: 'Ma sœur a dix ans.', en: 'My sister is ten (years old).' },
    ],

    sentenceBuilding: [
        { fr: 'J\u2019ai un frère.', en: 'I have a brother.' },
        { fr: 'J\u2019ai un frère et une sœur.', en: 'I have a brother and a sister.' },
        { fr: 'J\u2019ai un frère et une sœur. Mon frère s\u2019appelle Paul.', en: 'I have a brother and a sister. My brother is called Paul.' },
        { fr: 'J\u2019ai un frère et une sœur. Mon frère s\u2019appelle Paul et il est très grand.', en: 'I have a brother and a sister. My brother is called Paul and he is very tall.' },
        { fr: 'J\u2019ai un frère et une sœur. Mon frère s\u2019appelle Paul, il est très grand, et ma sœur, Marie, est très gentille.', en: 'I have a brother and a sister. My brother is called Paul, he is very tall, and my sister, Marie, is very kind.' },
    ],

    practice: [
        { instruction: 'his brother →', question: 'sa frère / son frère / leur frère ?', answer: 'son frère — the possessive agrees with FRÈRE (masculine), whatever the owner' },
        { instruction: 'my mother →', question: 'mon mère / ma mère / mes mère ?', answer: 'ma mère — mère is feminine' },
        { instruction: 'my friend (a girl, "amie") →', question: 'ma amie / mon amie / mes amie ?', answer: 'mon amie — masculine possessive before a vowel; the noun stays feminine' },
        { instruction: 'Make the adjective agree:', question: 'Ma sœur est ______ (grand).', answer: 'grande — feminine subject takes +e' },
        { instruction: 'Translate:', question: 'Their children are kind.', answer: 'Leurs enfants sont gentils. (leurs — plural object; gentils — masc plural)' },
        { instruction: 'Which is correct for "his wife"?', question: 'son femme / sa femme / ses femme ?', answer: 'sa femme — femme is feminine (sa follows FEMME, even for a husband speaking)' },
    ],

    translationPractice: [
        { en: 'I have one brother and two sisters.', fr: 'J\u2019ai un frère et deux sœurs.' },
        { en: 'My mother is a teacher.', fr: 'Ma mère est professeure.' },
        { en: 'His father is very tall.', fr: 'Son père est très grand.' },
        { en: 'My grandmother is very kind.', fr: 'Ma grand-mère est très gentille.' },
        { en: 'We have three children.', fr: 'Nous avons trois enfants.' },
        { en: 'My parents live in Lyon.', fr: 'Mes parents habitent à Lyon.' },
    ],

    reverseTranslation: [
        { fr: 'Ma sœur s\u2019appelle Marie.', en: 'My sister is called Marie.' },
        { fr: 'Mon grand-père a quatre-vingts ans.', en: 'My grandfather is eighty (years old).' },
        { fr: 'Ce sont mes parents.', en: 'These are my parents.' },
        { fr: 'Mon frère n\u2019est pas petit, il est très grand.', en: 'My brother is not short, he is very tall.' },
    ],

    register: {
        informal: 'Moi c\u2019est Marie. Là, c\u2019est mon petit frère, Paul — il est sympa ! (spoken introductions are loose: là, c\u2019est…, sympa)',
        neutral: 'Voici ma famille : mon père, ma mère, mon frère Paul et ma sœur Marie.',
        formal: 'Je vous présente ma famille : mon père, ma mère, mon frère et ma sœur. (je vous présente = the formal introduction formula)',
    },

    culture: 'Family stays close in France — Sunday lunch at the grandparents\u2019 is a tradition, and la famille often includes close friends called tata/tonton (aunt/uncle) as affectionate titles. One trap for learners: French people traditionally use vous with their in-laws (parents-beau-frère) until invited otherwise — using tu with your belle-mère too early is a real social slip. And marriage status is asked directly (vous êtes marié ?) without the shyness English speakers feel.',

    freeProduction: 'Write or record your family presentation (6–8 sentences). Guiding questions: How many people are you in the family? What are their names and ages (j\u2019ai… ans / il a… ans)? What do your parents do? Describe two family members with two adjectives each (grand, gentil, intelligent…). Do you have pets (un chat, un chien)?',

    miniTest: [
        { question: 'How do you say "his sister"?', options: ['son frère', 'sa sœur', 'sa frère', 'ses sœur'], answer: 'sa sœur' },
        { question: 'My friend (a girl) — you say…', options: ['ma amie', 'mon amie', 'mes amie', 'ma amis'], answer: 'mon amie' },
        { question: '"Fils" means…', options: ['daughter', 'son', 'girl', 'wife'], answer: 'son — and the l is silent' },
        { question: 'Make it agree: Ma sœur est ______ (gentil).', options: ['gentil', 'gentille', 'gentils', 'gentillement'], answer: 'gentille' },
        { question: 'Which sentence is WRONG?', options: ['J\u2019ai deux frères.', 'Mon père est grand.', 'Ma mère est professeure.', 'Mon mère est grande.'], answer: 'Mon mère est grande. (mère is feminine → ma mère)' },
    ],

    review: [
        'Numbers stay warm: every family member needs an age — j\u2019ai… ans, il a… ans.',
        'The possessive grid returns in the Questions & Negation lecture — keep mon/ma/mes ready.',
    ],

    traps: [
        'sa frère for "his brother" — the possessive follows the OBJECT: frère is masculine → son frère, even for a woman speaking.',
        'ma amie — two vowels clash. Feminine nouns starting with a vowel take mon/ton/son: mon amie. The noun stays feminine.',
        'Pronouncing the l in fils (son) — it is silent: "feece". Confusing fils (son) with fille (daughter) is a classic listening trap.',
        'Adjectives that do not agree: "ma sœur est grand" — sœur is feminine → grande. The -e is written, almost silent, but graded.',
    ],

    homework: {
        intro: 'Possessives + agreement in every section. Check each answer and read the explanation — even the ones you nail.',
        translation: [
            { prompt: 'My mother is kind.', answer: 'Ma mère est gentille.', explanation: 'mère is feminine → ma; the adjective takes the feminine -e (gentille, double l).' },
            { prompt: 'His brother is tall.', answer: 'Son frère est grand.', explanation: 'frère is masculine → son (even for "her" brother); grand is masculine — no -e.' },
            { prompt: 'I have two sisters.', answer: 'J\u2019ai deux sœurs.', explanation: 'sœur is feminine: une sœur → deux sœurs (-s only). Beware fils (sons) — the l is silent.' },
            { prompt: 'Her grandmother is seventy.', answer: 'Sa grand-mère a soixante-dix ans.', explanation: 'grand-mère is feminine → sa; age = avoir + ans; 70 = soixante-dix (60+10).' },
            { prompt: 'Their children are very kind.', answer: 'Leurs enfants sont très gentils.', explanation: 'enfants is plural masculine → leurs + gentils (-s). If all children were girls: gentilles.' },
            { prompt: 'This is my friend (a girl). Her name is Marie.', answer: 'C\u2019est mon amie. Elle s\u2019appelle Marie.', explanation: 'amie starts with a vowel → mon (sound rule), but the noun stays feminine. s\u2019appeler for names.' },
            { prompt: 'My uncle is not married.', answer: 'Mon oncle n\u2019est pas marié.', explanation: 'oncle is masculine → mon; the negation sandwich wraps est: n\u2019est pas; marié — no -e for a man.' },
            { prompt: 'We are a big family.', answer: 'Nous sommes une grande famille.', explanation: 'famille is feminine → une + grande (fem +e). Note: grande famille, not "grande grand".' },
        ],
        blanks: [
            { prompt: 'C\u2019est ______ frère. (my)', answer: 'mon', explanation: 'frère is masculine → mon.' },
            { prompt: 'C\u2019est ______ sœur. (his)', answer: 'sa', explanation: 'The possessive agrees with SŒUR (feminine) — sa — even when the owner is a man.' },
            { prompt: '______ parents habitent à Paris. (our)', answer: 'Nos', explanation: 'parents is plural → nos. The capital is only because the sentence starts here.' },
            { prompt: 'Ma sœur est ______. (tall)', answer: 'grande', explanation: 'sœur is feminine → grande (+e). Pronounced — the final d comes alive: "gron-DE."' },
            { prompt: 'Mes frères sont ______. (kind)', answer: 'gentils', explanation: 'frères is masculine plural → gentils (+s). For sisters only: gentilles.' },
            { prompt: 'Mon oncle a ______ ans. (60)', answer: 'soixante', explanation: 'Age = avoir + number. 60 is the clean one — the addition madness starts at 70.' },
        ],
        corrections: [
            { prompt: 'Sa frère s\u2019appelle Paul.', answer: 'Son frère s\u2019appelle Paul.', explanation: 'How the mistake happens: translating "his" word-for-word. Why it does not work: the possessive agrees with the OWNED noun — frère is masculine → son. How to fix it: son for masculine objects (his AND her), sa for feminine, ses for plural.' },
            { prompt: 'Ma mère est grand.', answer: 'Ma mère est grande.', explanation: 'How the mistake happens: forgetting agreement. Why it does not work: the adjective must match mère (feminine) — grand is the masculine form. How to fix it: add -e for feminine: grande. The d then sounds: "gron-DE".' },
            { prompt: 'J\u2019ai deux frère.', answer: 'J\u2019ai deux frères.', explanation: 'How the mistake happens: numbers do not pluralize in English minds — "two brother". Why it does not work: French nouns take the plural -s after numbers (except with exact-sound rules). How to fix it: deux frères, trois sœurs — the number never changes, the noun does.' },
            { prompt: 'Mon mère est professeur.', answer: 'Ma mère est professeure.', explanation: 'How the mistake happens: possessive picked by ear. Why it does not work: mère is feminine → ma. And the modern feminine of professeur is professeure (or professeuse). How to fix it: ma mère est professeure.' },
            { prompt: 'Leurs enfant est gentille.', answer: 'Leur enfant est gentille.', explanation: 'How the mistake happens: leurs looks plural. Why it does not work: leur/leurs agrees with the OBJECT — one child (sing) → leur enfant; several children → leurs enfants. How to fix it: count the owned thing, not the owners.' },
        ],
        writing: {
            task: 'Present your family in writing (6–8 sentences): who is in it, their names and ages, one physical description and one character adjective for two members, and one thing you all have together (nous avons…). Finish with one question about the reader\u2019s family.',
            requirements: [
                'At least four different family members with mon/ma/mes correct',
                'Two ages with avoir (il a… ans)',
                'Two agreeing adjectives (one masculine, one feminine)',
                'One plural possessive (mes parents, ses frères…)',
                'One question to the reader at the end (Et vous… ?)',
            ],
            minWords: 55,
        },
        checklist: [
            'I know the family vocabulary: père, mère, frère, sœur, fils, fille, grand-père, grand-mère',
            'My possessive follows the OWNED object: son frère (his), sa sœur (her) — owner irrelevant',
            'I use mon before feminine nouns starting with a vowel: mon amie',
            'My adjectives agree with the person described: grand (m) / grande (f) / gentils (pl)',
            'I know fils (son) has a silent l and is not fille (daughter)',
            'I can present my whole family out loud in six sentences',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'Family nouns: memorize each WITH its article — le père, la mère, le frère, la sœur, le fils (silent l!), la fille, le grand-père, la grand-mère, les parents. The article is the memory hook for the gender the possessives need.',
                examples: [
                    { fr: 'Mon père et ma mère habitent à Lyon.', en: 'My father and my mother live in Lyon.' },
                    { fr: 'Mon fils a une fille. — my son has a daughter', en: 'Note fils (son) vs fille (daughter) — one letter, two people.' },
                ],
            },
            {
                explanation: 'The possessive agrees with the OWNED noun: son frère (his brother), sa sœur (her sister), ses parents (his parents). "His sister" and "her sister" are the same: sa sœur. Owner gender is invisible in French.',
                examples: [
                    { fr: 'Paul → son frère. Marie → son frère aussi ! (her brother)', en: 'Both are "son frère" because frère is masculine.' },
                    { fr: 'Marie → sa sœur. Paul → sa sœur aussi !', en: 'Both "sa sœur" — sœur is feminine.' },
                ],
            },
            {
                explanation: 'The vowel rule: ma/ta/sa become mon/ton/son before a feminine noun starting with a vowel or silent h — for SOUND. The noun stays feminine: mon amie is still "my (female) friend".',
                examples: [
                    { fr: 'mon amie (not ma amie) · ton école · son histoire', en: 'my friend · your school · his story' },
                    { fr: 'Son amie est gentille. — the amie is a girl, the adjective says gentille', en: 'The possessive changed for sound; the adjective still agrees with the noun.' },
                ],
            },
            {
                explanation: 'Adjective agreement with PEOPLE: masculine = base (grand, gentil), feminine = +e (grande, gentille), plural = +s (grands), fem plural = +es (grandes). Special: gentil → gentille (double l), beau/bel/belle. The -e and -s are written even when silent.',
                examples: [
                    { fr: 'Mon frère est grand et gentil.', en: 'My brother is tall and kind.' },
                    { fr: 'Ma sœur est grande et gentille.', en: 'My sister is tall and kind.' },
                ],
            },
            {
                explanation: 'Fils (son) has a SILENT l — "feece". Fille (daughter/girl) has the y-glide — "fee-yuh". In listening, the verb and context tell you which: mon fils a dix ans vs ma fille a dix ans.',
                examples: [
                    { fr: 'Mon fils s\u2019appelle Léo.', en: 'My son is called Léo.' },
                    { fr: 'Ma fille s\u2019appelle Léa.', en: 'My daughter is called Léa.' },
                ],
            },
            {
                explanation: 'A family presentation is a chain: who → name → age → description. Practise the chain in one breath per person: "Mon frère, Paul, il a quinze ans, il est grand et très sympa." Six chains = a complete presentation.',
                examples: [
                    { fr: 'Voici ma famille. Mon père, Jean, a cinquante ans — il est grand. Ma mère, Anne, est professeure — elle est très gentille.', en: 'Here is my family. My father, Jean, is 50 — he is tall. My mother, Anne, is a teacher — she is very kind.' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'famille': { en: 'family', gender: 'feminine', register: 'neutral' },
        'père': { en: 'father', gender: 'masculine', register: 'neutral', note: 'open è like "bear"' },
        'mère': { en: 'mother', gender: 'feminine', register: 'neutral' },
        'frère': { en: 'brother', gender: 'masculine', plural: 'frères', register: 'neutral' },
        'sœur': { en: 'sister', gender: 'feminine', plural: 'sœurs', register: 'neutral', note: 'œ is one sound — British "bird"' },
        'fils': { en: 'son', gender: 'masculine', plural: 'fils', register: 'neutral', note: 'SILENT l — "feece"' },
        'fille': { en: 'daughter / girl', gender: 'feminine', plural: 'filles', register: 'neutral', note: 'll = y-glide: "fee-yuh"' },
        'garçon': { en: 'boy', gender: 'masculine', register: 'neutral' },
        'parents': { en: 'parents', gender: 'masculine', register: 'neutral', note: 'masc plural even for mum + dad' },
        'grands-parents': { en: 'grandparents', gender: 'masculine', register: 'neutral' },
        'grand-père': { en: 'grandfather', gender: 'masculine', register: 'neutral' },
        'grand-mère': { en: 'grandmother', gender: 'feminine', register: 'neutral' },
        'mari': { en: 'husband', gender: 'masculine', register: 'neutral' },
        'oncle': { en: 'uncle', gender: 'masculine', register: 'neutral', note: 'vowel start → l\u2019oncle' },
        'tante': { en: 'aunt', gender: 'feminine', register: 'neutral' },
        'cousin': { en: 'cousin (male)', gender: 'masculine', register: 'neutral' },
        'cousine': { en: 'cousin (female)', gender: 'feminine', register: 'neutral' },
        'bébé': { en: 'baby', gender: 'masculine', register: 'neutral' },
        'marié': { en: 'married (man)', register: 'neutral' },
        'mariée': { en: 'married (woman)', register: 'neutral' },
        'célibataire': { en: 'single', register: 'neutral', note: 'same form for both genders' },
        'grand': { en: 'tall / big', gender: 'masculine', register: 'neutral', note: 'feminine: grande — the d then sounds' },
        'grande': { en: 'tall / big (fem)', gender: 'feminine', register: 'neutral' },
        'petit': { en: 'small / short', gender: 'masculine', register: 'neutral' },
        'petite': { en: 'small / short (fem)', gender: 'feminine', register: 'neutral' },
        'gentil': { en: 'kind (masc)', gender: 'masculine', register: 'neutral', note: 'feminine: gentille' },
        'gentille': { en: 'kind (fem)', gender: 'feminine', register: 'neutral' },
        'sympa': { en: 'nice (informal)', register: 'informal', note: 'invariable — no agreement' },
        'professeure': { en: 'teacher (woman)', gender: 'feminine', register: 'neutral' },
        'habite': { en: 'live(s) (from habiter)', register: 'neutral' },
        'voici': { en: 'here is', register: 'neutral' },
        'petit frère': { en: 'little brother', gender: 'masculine', register: 'informal' },
        'très sympa': { en: 'very nice', register: 'informal' },
    },
};

export const STATIC_A1_PART1: Record<string, StaticFrenchLesson> = {
    'A1:numbers': a1Numbers,
    'A1:family': a1Family,
};
