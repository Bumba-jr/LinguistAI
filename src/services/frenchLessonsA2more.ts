// A2 lectures part 2 — Futur, Shopping & Money, Travel & Transport, Work & Daily Life.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── A2 · Futur Proche & Futur Simple ─────────────────────────────────────────
const a2Futur: StaticFrenchLesson = {
    title: 'Futur Proche & Futur Simple',
    objective: 'Talk about the future two ways: aller + infinitive (futur proche — plans) and the futur simple (-ai/-as/-a/-ons/-ez/-ont — predictions). Know when French uses the present for the future.',

    vocabulary: [
        { fr: 'je vais + infinitif', en: 'I am going to + verb', pron: 'zhuh veh', type: 'phrase', register: 'neutral', example: { fr: 'Je vais manger.', en: 'I am going to eat.' }, related: [{ fr: 'tu vas manger', en: 'you are going to eat' }] },
        { fr: 'demain', en: 'tomorrow', pron: 'duh-MAN', gender: 'masculine', register: 'neutral', example: { fr: 'Demain, je vais travailler.', en: 'Tomorrow I am going to work.' }, related: [{ fr: 'demain matin', en: 'tomorrow morning' }] },
        { fr: 'la semaine prochaine', en: 'next week', gender: 'feminine', register: 'neutral', example: { fr: 'La semaine prochaine, je vais partir.', en: 'Next week I am going to leave.' }, related: [{ fr: 'le mois prochain', en: 'next month' }] },
        { fr: 'je parlerai', en: 'I will speak', pron: 'zhuh pahr-luh-RAY', type: 'verb', register: 'neutral', example: { fr: 'Je parlerai au professeur.', en: 'I will speak to the teacher.' }, related: [{ fr: 'nous parlerons', en: 'we will speak' }] },
        { fr: 'je serai', en: 'I will be', pron: 'zhuh suh-RAY', type: 'verb', register: 'neutral', example: { fr: 'Je serai médecin.', en: 'I will be a doctor.' }, related: [{ fr: 'être → ser- (irregular stem)', en: 'related form' }] },
        { fr: 'j\u2019aurai', en: 'I will have', pron: 'zhoh-RAY', type: 'verb', register: 'neutral', example: { fr: 'J\u2019aurai vingt-cinq ans.', en: 'I will be twenty-five.' }, related: [{ fr: 'avoir → aur- (irregular stem)', en: 'related form' }] },
        { fr: 'je ferai', en: 'I will do / make', pron: 'zhuh fuh-RAY', type: 'verb', register: 'neutral', example: { fr: 'Je ferai mes devoirs.', en: 'I will do my homework.' }, related: [{ fr: 'faire → fer- (irregular stem)', en: 'related form' }] },
        { fr: 'j\u2019irai', en: 'I will go', pron: 'zhee-RAY', type: 'verb', register: 'neutral', example: { fr: 'J\u2019irai en France.', en: 'I will go to France.' }, related: [{ fr: 'aller → ir- (irregular stem)', en: 'related form' }] },
        { fr: 'je pourrai', en: 'I will be able to', pron: 'zhuh poo-RAY', type: 'verb', register: 'neutral', example: { fr: 'Je pourrai t\u2019aider.', en: 'I will be able to help you.' }, related: [{ fr: 'pouvoir → pourr- (irregular stem)', en: 'related form' }] },
        { fr: 'je voudrai', en: 'I will want', pron: 'zhuh voo-DRAY', type: 'verb', register: 'neutral', example: { fr: 'Je voudrai un café.', en: 'I will want a coffee.' }, related: [{ fr: 'vouloir → voudr- (irregular stem)', en: 'related form' }] },
        { fr: 'il y aura', en: 'there will be', pron: 'eel yah OH-rah', type: 'verb', register: 'neutral', example: { fr: 'Il y aura beaucoup de monde.', en: 'There will be a lot of people.' }, related: [{ fr: 'avoir → aur-', en: 'related form' }] },
        { fr: 'peut-être', en: 'maybe / perhaps', pron: 'puh-TEHTR', register: 'neutral', example: { fr: 'Peut-être qu\u2019il viendra.', en: 'Maybe he will come.' }, related: [{ fr: 'probablement', en: 'probably' }] },
    ],

    pronunciation: [
        { fr: 'je parlerai', approx: 'zhuh pahr-luh-RAY', en: 'the -ai ending sounds like "ay" — rhymes with the infinitive parler' },
        { fr: 'je serai', approx: 'zhuh suh-RAY', en: 'être stem: ser- + ai = serai (NOT je irrai!)' },
        { fr: 'j\u2019irai', approx: 'zhee-RAY', en: 'aller stem: ir- + ai = irai — sounds like "ee-RAY"' },
        { fr: 'il y aura', approx: 'eel yah OH-rah', en: 'avoir stem: aur- + a = aura — "oh-RAH"' },
        { fr: 'je ferai', approx: 'zhuh fuh-RAY', en: 'faire stem: fer- + ai = ferai — sounds like the verb faire' },
        { fr: 'vous serez', approx: 'voo suh-RAY', en: 'vous serez sounds exactly like je serai — context tells you who' },
    ],

    grammar: {
        rule: 'Futur proche = aller (present) + infinitive. Futur simple = infinitive + -ai/-as/-a/-ons/-ez/-ont. Spoken French prefers futur proche; the futur simple is for predictions and formal writing. The present can ALSO express a near future.',
        explanation: 'French has TWO main future forms. The futur proche (aller + infinitive) is what spoken French uses 80% of the time: je vais manger = I am going to eat. The futur simple (infinitive + ai/as/a/ons/ez/ont) is for predictions, promises, and formal writing: je parlerai = I will speak. Twelve verbs have irregular futur simple stems: être → ser-, avoir → aur-, aller → ir-, faire → fer-, pouvoir → pourr-, vouloir → voudr-, venir → viendr-, voir → verr-, envoyer → enverr-, devoir → devr-, savoir → saur-, recevoir → recevr-. And the PRESENT can express a scheduled future: le train part à huit heures (the train leaves at eight — tomorrow).',
        examples: [
            { fr: 'Demain, je vais manger au restaurant.', en: 'Tomorrow I am going to eat at the restaurant.', breakdown: ['demain = tomorrow (future marker)', 'je vais = I am going (aller present)', 'manger = to eat (infinitive)'] },
            { fr: 'La semaine prochaine, nous irons à la plage.', en: 'Next week we will go to the beach.', breakdown: ['la semaine prochaine = next week', 'nous irons = we will go (aller → ir- + ons)', 'à la plage = to the beach'] },
            { fr: 'Il sera médecin quand il sera grand.', en: 'He will be a doctor when he grows up.', breakdown: ['il sera = he will be (être → ser-)', 'médecin = doctor (no article!)', 'quand il sera grand = when he is grown up'] },
            { fr: 'Tu verras, ce sera génial !', en: 'You will see, it will be great!', breakdown: ['tu verras = you will see (voir → verr-)', 'ce sera = it will be'] },
            { fr: 'Le train part à huit heures demain.', en: 'The train leaves at eight tomorrow.', breakdown: ['PRESENT for scheduled future', 'le train part = the train leaves', 'à huit heures = at eight'] },
            { fr: 'Quand j\u2019aurai le temps, je te répondrai.', en: 'When I have time, I will reply to you.', breakdown: ['quand + futur (not present! — French uses the future after quand)', 'j\u2019aurai = I will have', 'je te répondrai = I will reply to you'] },
        ],
        commonMistakes: [
            'Using the PRESENT after quand/when for a future event: "Quand j\u2019ai le temps, je te répondrai" → quand + FUTUR: quand j\u2019aurai le temps. (English uses present; French uses future.)',
            'Forgetting the irregular futur stems: je serai (NOT je êtrerai), j\u2019irai (NOT je allrai), je ferai (NOT je fairai).',
            'Using the futur simple in casual speech where the futur proche is natural: spoken French says je vais manger; je mangerai sounds formal or distant.',
            'Forgetting that aller + infinitive still conjugates aller: "Je vais aller" = I am going to go (double future — this is correct!).',
        ],
    },

    transformations: [
        { type: 'Present', fr: 'Je mange au restaurant.', en: 'I eat at the restaurant.' },
        { type: 'Futur proche', fr: 'Je vais manger au restaurant.', en: 'I am going to eat at the restaurant.' },
        { type: 'Futur simple', fr: 'Je mangerai au restaurant.', en: 'I will eat at the restaurant.' },
        { type: 'Negative (proche)', fr: 'Je ne vais pas manger au restaurant.', en: 'I am not going to eat at the restaurant.' },
        { type: 'Negative (simple)', fr: 'Je ne mangerai pas au restaurant.', en: 'I will not eat at the restaurant.' },
        { type: 'Irregular futur', fr: 'Je serai médecin. — J\u2019irai en France. — Je ferai mes devoirs.', en: 'I will be a doctor. — I will go to France. — I will do my homework.' },
        { type: 'After quand', fr: 'Quand j\u2019aurai le temps, je te répondrai.', en: 'When I have time, I will reply to you.' },
        { type: 'Prediction', fr: 'Dans dix ans, le monde sera différent.', en: 'In ten years, the world will be different.' },
    ],

    sentenceBuilding: [
        { fr: 'Demain, je vais étudier.', en: 'Tomorrow I am going to study.' },
        { fr: 'Demain, je vais étudier le français parce que j\u2019ai un examen.', en: 'Tomorrow I am going to study French because I have an exam.' },
        { fr: 'Demain, je vais étudier le français parce que j\u2019ai un examen la semaine prochaine.', en: 'Tomorrow I am going to study French because I have an exam next week.' },
        { fr: 'Demain, je vais étudier le français toute la journée parce que j\u2019ai un examen la semaine prochaine et je veux réussir.', en: 'Tomorrow I am going to study French all day because I have an exam next week and I want to pass.' },
        { fr: 'Demain, je vais étudier le français toute la journée parce que j\u2019ai un examen la semaine prochaine, et je suis sûr(e) que je réussirai si je travaille assez.', en: 'Tomorrow I am going to study French all day because I have an exam next week, and I am sure I will pass if I work hard enough.' },
    ],

    practice: [
        { instruction: 'Futur proche:', question: 'Je ______ (aller + manger) au restaurant ce soir.', answer: 'vais manger — aller present + infinitive' },
        { instruction: 'Futur simple (regular):', question: 'Nous ______ (parler) au professeur.', answer: 'parlerons — parler + ons' },
        { instruction: 'Irregular futur:', question: 'Je ______ (être) médecin.', answer: 'serai — être → ser- + ai' },
        { instruction: 'Irregular futur:', question: 'Nous ______ (aller) en France.', answer: 'irons — aller → ir- + ons' },
        { instruction: 'After quand:', question: 'Quand j\u2019______ (avoir) le temps, je t\u2019appellerai.', answer: 'aurai — avoir → aur- + ai (FUTURE after quand!)' },
        { instruction: 'Present for scheduled future:', question: 'Le train ______ (partir) à huit heures demain.', answer: 'part — present for scheduled events' },
    ],

    translationPractice: [
        { en: 'Tomorrow I am going to study French.', fr: 'Demain, je vais étudier le français.' },
        { en: 'We will go to the beach next week.', fr: 'Nous irons à la plage la semaine prochaine.' },
        { en: 'I will be a doctor.', fr: 'Je serai médecin.' },
        { en: 'There will be a lot of people.', fr: 'Il y aura beaucoup de monde.' },
        { en: 'When I have time, I will call you.', fr: 'Quand j\u2019aurai le temps, je t\u2019appellerai.' },
        { en: 'The train leaves at eight tomorrow.', fr: 'Le train part à huit heures demain.' },
    ],

    reverseTranslation: [
        { fr: 'Demain, je vais manger au restaurant.', en: 'Tomorrow I am going to eat at the restaurant.' },
        { fr: 'Je serai médecin.', en: 'I will be a doctor.' },
        { fr: 'Il y aura beaucoup de monde.', en: 'There will be a lot of people.' },
        { fr: 'Tu verras, ce sera génial !', en: 'You will see, it will be great!' },
    ],

    register: {
        informal: 'Je vais manger chez moi ce soir — tu viens ? (spoken: futur proche dominates)',
        neutral: 'La semaine prochaine, nous irons à la plage.',
        formal: 'Le comité se réunira le quinze mars afin d\u2019examiner les propositions. (formal futur simple)',
    },

    culture: 'Spoken French uses the futur proche for almost everything — « je vais manger », « on va voir ». The futur simple sounds slightly formal or literary in speech, but is essential for predictions, weather forecasts, and formal writing. After quand (when), French uses the FUTURE — not the present like English: quand j\u2019aurai le temps (when I will have time). This is one of the biggest grammar differences from English.',

    freeProduction: 'Write or record your plans for next weekend AND your life in ten years (8–10 sentences). Guiding questions: What are you going to do next weekend (futur proche)? Where will you be in ten years (futur simple)? What will your job be? Where will you live? Will you speak French fluently? What do you think the world will look like?',

    miniTest: [
        { question: 'Futur proche = …', options: ['infinitive + aller', 'aller (present) + infinitive', 'aller + past participle', 'infinitive + -ai'], answer: 'aller (present) + infinitive' },
        { question: 'Futur simple of "être"?', options: ['je êtrerai', 'je serai', 'je suisrai', 'je etrai'], answer: 'je serai — être → ser-' },
        { question: 'After "quand" in a future sentence, French uses…', options: ['present', 'imparfait', 'futur', 'passé composé'], answer: 'futur — quand j\u2019aurai le temps (not: quand j\u2019ai)' },
        { question: 'Which is the futur simple of "aller"?', options: ['j\u2019allrai', 'j\u2019irai', 'je vais aller', 'j\u2019allerai'], answer: 'j\u2019irai — aller → ir-' },
        { question: 'Spoken French prefers…', options: ['futur simple', 'futur proche', 'présent', 'conditionnel'], answer: 'futur proche — aller + infinitive' },
    ],

    review: [
        'The passé composé from last lecture tells what HAPPENED; the futur tells what WILL happen — same auxiliary logic for compound tenses.',
        'The imparfait from last lecture is the background — often combined with the futur: quand j\u2019étais petit, je pensais que je serai médecin.',
    ],

    traps: [
        'Using the PRESENT after quand for a future event: quand j\u2019ai le temps → quand j\u2019aurai le temps. English uses present; French uses future.',
        'Wrong irregular futur stems: être → ser- (not êtr-), aller → ir- (not all-), faire → fer- (not fair-). Memorize the 12 irregular stems.',
        'Using futur simple in casual speech: je mangerai sounds distant — spoken French says je vais manger.',
        'Forgetting that aller + infinitive conjugates ALLER, not the second verb: tu vas manger (not tu vas manges).',
    ],

    homework: {
        intro: 'Two future forms. Choose the right one for the context: futur proche for plans, futur simple for predictions and formal writing. Watch for irregular stems.',
        translation: [
            { prompt: 'Tomorrow I am going to study French.', answer: 'Demain, je vais étudier le français.', explanation: 'Futur proche: aller (present) + infinitive. The standard spoken future.' },
            { prompt: 'We will go to France next year.', answer: 'Nous irons en France l\u2019année prochaine.', explanation: 'Aller has an IRREGULAR futur stem: ir-. Nous irons. The futur simple is more formal than the futur proche.' },
            { prompt: 'He will be a doctor.', answer: 'Il sera médecin.', explanation: 'être → ser- + a = sera. No article before professions, even in the future.' },
            { prompt: 'There will be a lot of people.', answer: 'Il y aura beaucoup de monde.', explanation: 'avoir → aur- + a = aura. The impersonal il y a becomes il y aura.' },
            { prompt: 'When I have time, I will call you.', answer: 'Quand j\u2019aurai le temps, je t\u2019appellerai.', explanation: 'After quand, French uses the FUTURE (not the present like English): quand + j\u2019aurai. The main verb is also future: je t\u2019appellerai.' },
            { prompt: 'I am going to do my homework tonight.', answer: 'Je vais faire mes devoirs ce soir.', explanation: 'Futur proche with aller + faire (infinitive). The spoken standard.' },
            { prompt: 'You will see, it will be great.', answer: 'Tu verras, ce sera génial !', explanation: 'voir → verr- (irregular). être → ser- (irregular). Both in the same sentence!' },
            { prompt: 'We will finish the work tomorrow.', answer: 'Nous finirons le travail demain.', explanation: 'finir is regular: finir + ons = finirons. The futur simple of -ir verbs uses the full infinitive + ending.' },
        ],
        blanks: [
            { prompt: 'Demain, je ______ (aller + manger) au restaurant.', answer: 'vais manger', explanation: 'Futur proche: vais (aller present) + manger (infinitive).' },
            { prompt: 'Je ______ (être) médecin quand je serai grand.', answer: 'serai', explanation: 'être → ser- + ai = serai. Irregular futur stem.' },
            { prompt: 'Nous ______ (aller) en France l\u2019année prochaine.', answer: 'irons', explanation: 'aller → ir- + ons = irons. Irregular futur stem.' },
            { prompt: 'Il y ______ beaucoup de monde.', answer: 'aura', explanation: 'avoir → aur- + a = aura. The impersonal il y a becomes il y aura.' },
            { prompt: 'Quand j\u2019______ (avoir) le temps, je t\u2019appellerai.', answer: 'aurai', explanation: 'After quand, French uses the FUTURE. avoir → aur- + ai = aurai.' },
            { prompt: 'Le train ______ (partir) à quatorze heures.', answer: 'part', explanation: 'PRESENT for scheduled future events — trains, cinemas, timetables.' },
        ],
        corrections: [
            { prompt: 'Quand j\u2019ai le temps, je te répondrai.', answer: 'Quand j\u2019aurai le temps, je te répondrai.', explanation: 'How the mistake happens: English uses the present after "when". Why it does not work: French uses the FUTURE after quand for future events. How to fix it: quand + futur (quand j\u2019aurai, quand tu viendras, quand il sera…).' },
            { prompt: 'Je être médecin.', answer: 'Je serai médecin.', explanation: 'How the mistake happens: trying to use the infinitive as a future. Why it does not work: the futur simple needs a STEM + ending. être has an irregular stem: ser-. How to fix it: je serai. Irregular stems: ser-, aur-, ir-, fer-, pourr-, voudr-, viendr-, verr-, devr-, saur-, recevr-, enverr-.' },
            { prompt: 'Je vais mangerai au restaurant.', answer: 'Je vais manger au restaurant. — or — Je mangerai au restaurant.', explanation: 'How the mistake happens: mixing the two future forms. Why it does not work: futur proche = aller + INFINITIVE (not conjugated). Futur simple = stem + ending. They are two separate systems. How to fix it: pick one system per verb.' },
            { prompt: 'Il aura parti.', answer: 'Il est parti.', explanation: 'How the mistake happens: confusing futur auxiliary with passé composé auxiliary. Why it does not work: "il aura parti" is the FUTUR ANTÉRIEUR (will have left) — a different tense. How to fix it: for a simple past, use the passé composé: il est parti. For a future perfect: il sera parti.' },
            { prompt: 'Nous allons le cinéma.', answer: 'Nous allons au cinéma.', explanation: 'How the mistake happens: confusing aller (to go) with the futur proche construction. Why it does not work: aller + PLACE needs à/au/à la — it is not the future. How to fix it: nous allons au cinéma = we are going to the cinema (present). For the future: nous irons au cinéma.' },
        ],
        writing: {
            task: 'Write your plans for next year AND your predictions for the world in ten years (8–10 sentences). Use futur proche for your concrete plans, futur simple for predictions, and at least one quand + futur combination.',
            requirements: [
                'At least three futur proche (je vais… / tu vas…)',
                'At least three futur simple (je serai, il y aura, nous irons…)',
                'One irregular futur stem (ser-, aur-, ir-, fer-…)',
                'One quand + futur combination (quand j\u2019aurai…, je…)',
                'One prediction with peut-être or probablement',
            ],
            minWords: 60,
        },
        checklist: [
            'I use futur proche (aller + infinitive) for concrete plans and spoken French',
            'I use futur simple for predictions and formal writing',
            'I know the 12 irregular futur stems: ser-, aur-, ir-, fer-, pourr-, voudr-, viendr-, verr-, devr-, saur-, recevr-, enverr-',
            'I use the FUTURE after quand (quand j\u2019aurai le temps — not quand j\u2019ai)',
            'I know the present can express scheduled future: le train part à huit heures',
            'I can talk about my plans for next week AND my life in ten years out loud',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'The futur proche is the EASIEST future: conjugate ALLER in the present (vais, vas, va, allons, allez, vont) + any infinitive. That is it. No exceptions.',
                examples: [
                    { fr: 'je vais manger · tu vas dormir · il va pleuvoir · nous allons partir · vous allez voir · ils vont réussir', en: 'I am going to eat · you are going to sleep · it is going to rain…' },
                ],
            },
            {
                explanation: 'The futur simple = infinitive + ai, as, a, ons, ez, ont. For -re verbs, drop the e: vendre → vendr- + ai = vendrai. For 12 verbs, the stem is IRREGULAR.',
                examples: [
                    { fr: 'parler → je parlerai · finir → je finirai · vendre → je vendrai', en: 'regular futur simple' },
                ],
            },
            {
                explanation: 'The 12 IRREGULAR futur stems: être → ser- · avoir → aur- · aller → ir- · faire → fer- · pouvoir → pourr- · vouloir → voudr- · venir → viendr- · voir → verr- · devoir → devr- · savoir → saur- · recevoir → recevr- · envoyer → enverr-. All take the same endings: -ai, -as, -a, -ons, -ez, -ont.',
                examples: [
                    { fr: 'je serai · j\u2019aurai · j\u2019irai · je ferai · je pourrai · je voudrai', en: 'the six most common irregular futures' },
                ],
            },
            {
                explanation: 'After quand (when), si (if), dès que (as soon as), and aussitôt que (as soon as), French uses the FUTURE — not the present like English. This is one of the biggest differences from English.',
                examples: [
                    { fr: 'Quand j\u2019aurai le temps, je t\u2019aiderai. (When I HAVE time…)', en: 'The verb after quand is in the FUTURE, not the present.' },
                ],
            },
            {
                explanation: 'The PRESENT can express a scheduled future: le train part à huit heures (the train leaves at eight — tomorrow). This works for timetables and fixed events, not for personal plans.',
                examples: [
                    { fr: 'Le cours commence à dix heures demain. — Je pars ce week-end.', en: 'The class starts at ten tomorrow. — I am leaving this weekend.' },
                ],
            },
            {
                explanation: 'Futur proche vs futur simple: futur proche = a PLAN you already decided (je vais manger au restaurant ce soir). Futur simple = a prediction or a distant future (un jour, je serai médecin). In casual speech, futur proche wins 80% of the time.',
                examples: [
                    { fr: 'Ce soir, je vais regarder un film. (plan — futur proche) · Dans dix ans, je serai riche ! (prediction — futur simple)', en: 'Two futures, two contexts.' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'demain matin': { en: 'tomorrow morning', register: 'neutral' },
        'la semaine prochaine': { en: 'next week', gender: 'feminine', register: 'neutral' },
        'le mois prochain': { en: 'next month', gender: 'masculine', register: 'neutral' },
        'l\u2019année prochaine': { en: 'next year', gender: 'feminine', register: 'neutral' },
        'dans dix ans': { en: 'in ten years', register: 'neutral', note: 'dans + time = in (future)' },
        'vais manger': { en: 'am going to eat (futur proche)', register: 'neutral' },
        'parlerai': { en: 'will speak (futur simple of parler)', pron: 'pahr-luh-RAY', type: 'verb', register: 'neutral', note: 'regular: parler + ai' },
        'serai': { en: 'will be (futur simple of être)', pron: 'suh-RAY', type: 'verb', register: 'neutral', note: 'IRREGULAR: être → ser-' },
        'aurai': { en: 'will have (futur simple of avoir)', pron: 'oh-RAY', type: 'verb', register: 'neutral', note: 'IRREGULAR: avoir → aur-' },
        'irai': { en: 'will go (futur simple of aller)', pron: 'ee-RAY', type: 'verb', register: 'neutral', note: 'IRREGULAR: aller → ir-' },
        'ferai': { en: 'will do (futur simple of faire)', pron: 'fuh-RAY', type: 'verb', register: 'neutral', note: 'IRREGULAR: faire → fer-' },
        'pourrai': { en: 'will be able to', pron: 'poo-RAY', type: 'verb', register: 'neutral', note: 'IRREGULAR: pouvoir → pourr-' },
        'voudrai': { en: 'will want', pron: 'voo-DRAY', type: 'verb', register: 'neutral', note: 'IRREGULAR: vouloir → voudr-' },
        'viendra': { en: 'will come', pron: 'vyahn-DRAH', type: 'verb', register: 'neutral', note: 'IRREGULAR: venir → viendr-' },
        'verras': { en: 'will see (tu form of voir)', pron: 'vuh-RAH', type: 'verb', register: 'neutral', note: 'IRREGULAR: voir → verr-' },
        'aura': { en: 'will have (il/elle form of avoir)', pron: 'oh-RAH', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'sera': { en: 'will be (il/elle form of être)', pron: 'suh-RAH', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'peut-être': { en: 'maybe / perhaps', pron: 'puh-TEHTR', register: 'neutral' },
        'probablement': { en: 'probably', pron: 'proh-bah-BLAH-mahn', register: 'neutral' },
        'examen': { en: 'exam', gender: 'masculine', plural: 'examens', register: 'neutral' },
        'toute la journée': { en: 'all day', gender: 'feminine', register: 'neutral' },
        'réussir': { en: 'to pass / succeed', register: 'neutral' },
        'sûr(e)': { en: 'sure', register: 'neutral', note: 'je suis sûr (masc) / sûre (fem)' },
        'assez': { en: 'enough / quite', register: 'neutral' },
        'monde': { en: 'people / world', gender: 'masculine', register: 'neutral', note: 'beaucoup de monde = a lot of people' },
    },
};

// ── A2 · Shopping & Money ────────────────────────────────────────────────────
const a2Shopping: StaticFrenchLesson = {
    title: 'Shopping & Money',
    objective: 'Shop in French — ask prices, compare with plus/moins/aussi…que, use demonstratives (ce/cet/cette/ces), and handle a full shopping roleplay from browsing to paying.',

    vocabulary: [
        { fr: 'le magasin', en: 'the shop / store', gender: 'masculine', register: 'neutral', example: { fr: 'Je vais au magasin.', en: 'I am going to the shop.' }, related: [{ fr: 'la boutique', en: 'the boutique' }] },
        { fr: 'le prix', en: 'the price', gender: 'masculine', register: 'neutral', example: { fr: 'Quel est le prix ?', en: 'What is the price?' }, related: [{ fr: 'combien ça coûte ?', en: 'how much does it cost?' }] },
        { fr: 'cher', en: 'expensive', pron: 'shehr', type: 'adjective', gender: 'masculine', register: 'neutral', example: { fr: 'C\u2019est trop cher !', en: 'It is too expensive!' }, related: [{ fr: 'pas cher', en: 'cheap / not expensive' }] },
        { fr: 'acheter', en: 'to buy', pron: 'ahsh-tuh-RAY', type: 'verb', register: 'neutral', example: { fr: 'J\u2019achète du pain.', en: 'I buy some bread.' }, related: [{ fr: 'j\u2019achète (e → è in je/tu/il forms)', en: 'stem change' }] },
        { fr: 'payer', en: 'to pay', pron: 'pah-YAY', type: 'verb', register: 'neutral', example: { fr: 'Je peux payer par carte ?', en: 'Can I pay by card?' }, related: [{ fr: 'en espèces', en: 'in cash' }] },
        { fr: 'les vêtements', en: 'the clothes', gender: 'masculine', register: 'neutral', example: { fr: 'J\u2019achète des vêtements.', en: 'I buy some clothes.' }, related: [{ fr: 'un pantalon', en: 'trousers' }] },
        { fr: 'la taille', en: 'the size', gender: 'feminine', register: 'neutral', example: { fr: 'Quelle est votre taille ?', en: 'What is your size?' }, related: [{ fr: 'essayer', en: 'to try on' }] },
        { fr: 'l\u2019argent', en: 'the money', gender: 'masculine', register: 'neutral', example: { fr: 'Je n\u2019ai pas d\u2019argent.', en: 'I do not have money.' }, related: [{ fr: 'le portefeuille', en: 'the wallet' }] },
        { fr: 'essayer', en: 'to try on / to try', pron: 'eh-say-YAY', type: 'verb', register: 'neutral', example: { fr: 'Je peux essayer ?', en: 'Can I try it on?' }, related: [{ fr: 'la cabine d\u2019essayage', en: 'the fitting room' }] },
        { fr: 'trop petit', en: 'too small', register: 'neutral', example: { fr: 'C\u2019est trop petit pour moi.', en: 'It is too small for me.' }, related: [{ fr: 'trop grand', en: 'too big' }] },
        { fr: 'rembourser', en: 'to refund', pron: 'rahm-boor-SAY', type: 'verb', register: 'formal', example: { fr: 'Pouvez-vous me rembourser ?', en: 'Can you refund me?' }, related: [{ fr: 'échanger', en: 'to exchange' }] },
        { fr: 'les soldes', en: 'the sales', gender: 'feminine', register: 'neutral', example: { fr: 'Les soldes commencent demain.', en: 'The sales start tomorrow.' }, related: [{ fr: 'solde', en: 'sale item' }] },
    ],

    pronunciation: [
        { fr: 'j\u2019achète', approx: 'zhah-SHET', en: 'the è appears in je/tu/il forms (stem change) — ah-SHET' },
        { fr: 'cher', approx: 'SHEHR', en: 'expensive — the ch sounds like sh in French' },
        { fr: 'payer', approx: 'pah-YAY', en: 'the y is a glide: "pah-YAY" — also je paie or je paye (both correct)' },
        { fr: 'essayer', approx: 'eh-say-YAY', en: 'double stem change: ess- + ay-YAY' },
        { fr: 'les soldes', approx: 'lay SOLHD', en: 'the sales — final s pronounced in this word' },
        { fr: 'quatre-vingt-dix euros', approx: 'KAH-truh-van-DEES u-ROH', en: 'ninety euros — a tongue twister!' },
    ],

    grammar: {
        rule: 'Comparisons use plus/moins/aussi + adjective + que. Demonstratives agree with the noun: ce (masc), cette (fem), cet (masc before vowel), ces (plural).',
        explanation: 'Comparisons are simpler than English: plus grand que (taller than), moins cher que (less expensive than), aussi bon que (as good as). Four irregular comparatives: meilleur (better), pire (worse), plus grand → majeur, plus petit → mineur. The que can be followed by a noun, pronoun, or clause. Demonstratives also agree: ce livre (this book), cette table (this table), cet ami (this friend — before a vowel), ces livres (these books). And the neuter forms (no gender): c\u2019est ça (that is it), ça me plaît (I like it).',
        examples: [
            { fr: 'Ce livre est plus intéressant que le film.', en: 'This book is more interesting than the film.', breakdown: ['ce livre = this book (masc)', 'plus intéressant = more interesting', 'que = than', 'le film = the film'] },
            { fr: 'Cette robe est moins chère que l\u2019autre.', en: 'This dress is less expensive than the other one.', breakdown: ['cette robe = this dress (fem)', 'moins chère = less expensive (fem — chère +e)', 'que l\u2019autre = than the other one'] },
            { fr: 'Cet aperitif est aussi bon que le vin.', en: 'This aperitif is as good as the wine.', breakdown: ['cet aperitif = this aperitif (masc before vowel)', 'aussi bon que = as good as'] },
            { fr: 'Ces chaussures sont trop chères.', en: 'These shoes are too expensive.', breakdown: ['ces chaussures = these shoes (plural)', 'chères = expensive (fem pl — agrees with chaussures)'] },
            { fr: 'Ce pain est meilleur que celui-là.', en: 'This bread is better than that one.', breakdown: ['meilleur = better (irregular comparative of bon)', 'celui-là = that one (masc)'] },
            { fr: 'Combien coûte cette veste ?', en: 'How much does this jacket cost?', breakdown: ['combien coûte = how much does…cost', 'cette veste = this jacket (fem)'] },
        ],
        commonMistakes: [
            'Using plus bon instead of meilleur — meilleur is the IRREGULAR comparative of bon: ce pain est meilleur (not plus bon).',
            'Forgetting the agreement in comparisons: "Elle est plus grand" → plus grandE (feminine).',
            'Using cet before a consonant: cet livre → CE livre (cet is only before vowels: cet ami).',
            'Forgetting que in comparisons: "plus cher" alone means just "more expensive" — you need plus cher QUE for "more expensive than".',
        ],
    },

    transformations: [
        { type: 'Positive', fr: 'Ce sac est cher.', en: 'This bag is expensive.' },
        { type: 'Comparative', fr: 'Ce sac est plus cher que l\u2019autre.', en: 'This bag is more expensive than the other one.' },
        { type: 'Superlative', fr: 'C\u2019est le sac le plus cher du magasin.', en: 'It is the most expensive bag in the shop.' },
        { type: 'Negative comparison', fr: 'Ce sac est moins cher que l\u2019autre.', en: 'This bag is less expensive than the other one.' },
        { type: 'Equality', fr: 'Ce sac est aussi cher que l\u2019autre.', en: 'This bag is as expensive as the other one.' },
        { type: 'Question', fr: 'Combien coûte ce sac ?', en: 'How much does this bag cost?' },
        { type: 'Demonstrative (fem)', fr: 'Cette robe est belle.', en: 'This dress is beautiful.' },
        { type: 'Irregular comparative', fr: 'Ce pain est meilleur que celui-là.', en: 'This bread is better than that one.' },
    ],

    sentenceBuilding: [
        { fr: 'Je voudrais acheter une chemise.', en: 'I would like to buy a shirt.' },
        { fr: 'Je voudrais acheter une chemise. Quelle est votre taille ?', en: 'I would like to buy a shirt. What is your size?' },
        { fr: 'Je voudrais acheter une chemise bleue. Quelle est votre taille ? — Du quarante.', en: 'I would like to buy a blue shirt. What is your size? — Size forty.' },
        { fr: 'Je voudrais acheter une chemise bleue, mais elle est trop chère. Avez-vous quelque chose de moins cher ?', en: 'I would like to buy a blue shirt, but it is too expensive. Do you have something less expensive?' },
        { fr: 'Je voudrais acheter une chemise bleue, mais elle est trop chère. Avez-vous quelque chose de moins cher ? — Oui, celle-ci coûte seulement vingt euros.', en: 'I would like to buy a blue shirt, but it is too expensive. Do you have something less expensive? — Yes, this one costs only twenty euros.' },
    ],

    practice: [
        { instruction: 'Comparative:', question: 'Le train est ______ rapide ______ le bus. (more)', answer: 'plus rapide que le bus' },
        { instruction: 'Irregular comparative:', question: 'Ce restaurant est ______ (bon) que l\u2019autre.', answer: 'meilleur — bon → meilleur (NOT plus bon)' },
        { instruction: 'Demonstrative (before vowel):', question: '______ arbre est grand.', answer: 'Cet arbre — masc before vowel → cet' },
        { instruction: 'Demonstrative (fem):', question: '______ robe est belle.', answer: 'Cette robe — fem → cette' },
        { instruction: 'Superlative:', question: 'C\u2019est ______ (the most expensive) restaurant de la ville.', answer: 'le restaurant le plus cher de la ville' },
        { instruction: 'Translate:', question: 'How much does this jacket cost?', answer: 'Combien coûte cette veste ? (or: Combien coûte cette veste ?)' },
    ],

    translationPractice: [
        { en: 'This book is more interesting than the film.', fr: 'Ce livre est plus intéressant que le film.' },
        { en: 'These shoes are too expensive.', fr: 'Ces chaussures sont trop chères.' },
        { en: 'This bread is better than that one.', fr: 'Ce pain est meilleur que celui-là.' },
        { en: 'Can I try it on?', fr: 'Je peux l\u2019essayer ?' },
        { en: 'I would like to pay by card.', fr: 'Je voudrais payer par carte.' },
        { en: 'The sales start tomorrow.', fr: 'Les soldes commencent demain.' },
    ],

    reverseTranslation: [
        { fr: 'C\u2019est trop cher pour moi.', en: 'It is too expensive for me.' },
        { fr: 'Cette robe est moins chère que l\u2019autre.', en: 'This dress is less expensive than the other one.' },
        { fr: 'Je peux essayer cette veste ?', en: 'Can I try on this jacket?' },
        { fr: 'Les soldes commencent la semaine prochaine.', en: 'The sales start next week.' },
    ],

    register: {
        informal: 'C\u2019est combien, ça ? — Trop cher, non ? (spoken shopping: ça everywhere, shortened questions)',
        neutral: 'Je voudrais acheter une chemise. Combien coûte-t-elle ?',
        formal: 'Bonjour Monsieur. Je souhaiterais voir cette veste, s\u2019il vous plaît. Avez-vous ma taille ? (formal shopping: souhaiterais instead of voudrais)',
    },

    culture: 'French shops have real sales (les soldes) only twice a year — in January and July — regulated by the government. Fixed prices are the norm (you do not haggle in French shops). The café bill includes service (service compris), so tipping is optional but appreciated. Watch out for the French size system: clothes use European sizes (a French 38 is a UK 10/US 6). And the contactless card limit was raised — most people now pay everything by carte bancaire.',

    freeProduction: 'Write or record a shopping roleplay (8–10 lines): you want to buy clothes. Ask about the price, the size, try it on, say it is too small/expensive, ask for another, compare two items, and decide to buy or not. Guiding questions: What are you shopping for? How much does it cost? Is it too expensive? Do you have it in another size or colour?',

    miniTest: [
        { question: 'The irregular comparative of "bon" is…', options: ['plus bon', 'meilleur', 'bien meilleur', 'mieux'], answer: 'meilleur' },
        { question: 'Which demonstrative goes before "arbre"?', options: ['ce', 'cet', 'cette', 'ces'], answer: 'cet — before a vowel' },
        { question: '"Trop chère" agrees with…', options: ['un homme', 'une femme / feminine noun', 'a plural noun', 'nothing — it is invariable'], answer: 'une femme / feminine noun' },
        { question: 'Comparison structure is…', options: ['plus … que', 'plus … de', 'plus … à', 'que … plus'], answer: 'plus … que' },
        { question: '"Les soldes" means…', options: ['the prices', 'the sales', 'the shops', 'the money'], answer: 'the sales — only twice a year in France!' },
    ],

    review: [
        'The partitive from A1 Food still applies: j\u2019achète du pain, de la viande, des pommes.',
        'The passé composé from this level works for shopping stories: j\u2019ai acheté une chemise hier.',
    ],

    traps: [
        'plus bon instead of meilleur — bon has an IRREGULAR comparative: meilleur. Same family: mauvais → pire.',
        'cet before consonants: cet livre → CE livre. Cet is ONLY before vowels (cet arbre, cet ami).',
        'Forgetting agreement in comparisons: elle est plus grand → plus grandE. The adjective still agrees.',
        'Confusing celui (that one, masc) with celle (that one, fem): celui-là vs celle-là. They agree with the noun they replace.',
    ],

    homework: {
        intro: 'Shopping vocabulary + comparatives + demonstratives in every section. The accents on chère, intéressante and coûtée are graded.',
        translation: [
            { prompt: 'This book is more interesting than the film.', answer: 'Ce livre est plus intéressant que le film.', explanation: 'ce (masc demonstrative) + plus…que (comparative). The adjective intéressant agrees with livre (masc).' },
            { prompt: 'This dress is too expensive.', answer: 'Cette robe est trop chère.', explanation: 'robe is feminine → cette + chère (+e). The adjective agrees with robe.' },
            { prompt: 'This bread is better than that one.', answer: 'Ce pain est meilleur que celui-là.', explanation: 'meilleur = irregular comparative of bon. NEVER plus bon. celui-là = that one (masc).' },
            { prompt: 'I bought these shoes.', answer: 'J\u2019ai acheté ces chaussures.', explanation: 'chaussures is feminine plural → ces. The passé composé from last lecture: j\u2019ai acheté.' },
            { prompt: 'Can I pay by card?', answer: 'Je peux payer par carte ?', explanation: 'pouvoir + infinitive (payer). Par carte = by card. You can also say: je peux payer par carte ?' },
            { prompt: 'These clothes are cheaper than those.', answer: 'Ces vêtements sont moins chers que ceux-là.', explanation: 'vêtements is masculine plural → ces + chers (+s). ceux-là = those ones (masc pl).' },
            { prompt: 'It is the most expensive shop in the city.', answer: 'C\u2019est le magasin le plus cher de la ville.', explanation: 'Superlative: le/la/les + plus/moins + adjective + de + place. le magasin le plus cher.' },
            { prompt: 'Do you have this shirt in a smaller size?', answer: 'Avez-vous cette chemise dans une taille plus petite ?', explanation: 'avoir-vous (inversion) + cette chemise. Plus petite = smaller (fem).' },
        ],
        blanks: [
            { prompt: '______ livre est intéressant. (this — masc)', answer: 'Ce', explanation: 'ce = this (masculine before a consonant). cet before vowels, cette for feminine.' },
            { prompt: '______ arbre est vieux. (this — before vowel)', answer: 'Cet', explanation: 'cet before masculine nouns starting with a vowel: cet arbre, cet ami.' },
            { prompt: 'Cette robe est plus ______ que l\u2019autre. (expensive)', answer: 'chère', explanation: 'chère agrees with robe (feminine) — +e.' },
            { prompt: 'Ce pain est ______ que celui-là. (better)', answer: 'meilleur', explanation: 'bon → meilleur (IRREGULAR comparative). Never plus bon.' },
            { prompt: 'Ces chaussures sont ______ (too small).', answer: 'trop petites', explanation: 'chaussures is fem plural → trop petites (+es).' },
            { prompt: 'Les soldes ______ demain. (start)', answer: 'commencent', explanation: 'commencer + ils/elles → commencent (with ç — the c stays soft).' },
        ],
        corrections: [
            { prompt: 'Ce pain est plus bon que celui-là.', answer: 'Ce pain est meilleur que celui-là.', explanation: 'How the mistake happens: applying the regular plus + adjective rule to bon. Why it does not work: bon has an IRREGULAR comparative — meilleur. How to fix it: meilleur (better), pire (worse), majeur (greater), mineur (smaller). These four never use plus.' },
            { prompt: 'Cet livre est intéressant.', answer: 'Ce livre est intéressant.', explanation: 'How the mistake happens: over-applying cet. Why it does not work: cet is ONLY before vowels (cet ami, cet arbre). Before a consonant, use ce. How to fix it: ce livre, ce pantalon — but cet arbre, cet homme.' },
            { prompt: 'Cette robe est plus cher.', answer: 'Cette robe est plus chère.', explanation: 'How the mistake happens: forgetting adjective agreement. Why it does not work: robe is FEMININE — the adjective needs -e (chère). How to fix it: always check the noun\u2019s gender. chère (fem), chers (masc pl), chères (fem pl).' },
            { prompt: 'Ces chaussures est belles.', answer: 'Ces chaussures sont belles.', explanation: 'How the mistake happens: forgetting the plural verb. Why it does not work: chaussures is PLURAL — the verb must be sont (not est). How to fix it: plural subject → plural verb. ces chaussures SONT belles.' },
            { prompt: 'Ce livre est plus intéressant que le film est.', answer: 'Ce livre est plus intéressant que le film.', explanation: 'How the mistake happens: adding a second verb after que. Why it does not work: the French comparison ends after the second noun/pronoun — no repeated verb. How to fix it: plus X que Y. Full stop.' },
        ],
        writing: {
            task: 'Write a shopping roleplay (8–10 lines) between you and a shop assistant: browse, ask the price, try it on, compare two items with comparatives, negotiate, and decide. Use at least two demonstratives (ce/cet/cette/ces), two comparatives (plus/moins…que), and one superlative (le plus…).',
            requirements: [
                'At least two demonstratives (ce, cet, cette, or ces)',
                'At least two comparatives (plus/moins/aussi…que)',
                'One superlative (le plus… / la moins…)',
                'One question about price or size',
                'One decision (je vais l\u2019acheter / je ne vais pas l\u2019acheter)',
            ],
            minWords: 55,
        },
        checklist: [
            'I choose ce/cet/cette/ces correctly by gender and sound',
            'I use plus/moins/aussi + adjective + que for comparisons',
            'I know the four irregular comparatives: meilleur, pire, majeur, mineur',
            'I can ask the price: combien coûte… ? / quel est le prix ?',
            'I can handle a shopping roleplay: browse, try on, compare, decide',
            'I know the French shopping culture: les soldes twice a year, service compris',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'The demonstratives: ce (masc + consonant), cet (masc + vowel), cette (fem), ces (all plural). They are the THIS/THAT words. The neuter forms are ça, cela, ceci — for ideas and unnamed things.',
                examples: [
                    { fr: 'ce livre · cet arbre · cette table · ces livres · c\u2019est ça !', en: 'this book · this tree · this table · these books · that is it!' },
                ],
            },
            {
                explanation: 'Comparisons have three shapes: plus…que (more than), moins…que (less than), aussi…que (as…as). The adjective ALWAYS agrees with the noun it describes — even inside the comparison.',
                examples: [
                    { fr: 'Elle est plus grande que moi. · Il est moins intelligent que sa sœur. · C\u2019est aussi facile que ça.', en: 'She is taller than me. · He is less smart than his sister. · It is as easy as that.' },
                ],
            },
            {
                explanation: 'Four IRREGULAR comparatives that never use plus: bon → meilleur (better), mauvais → pire (worse), grand → plus grand (or majeur in formal), petit → plus petit (or mineur). Beau/belle → plus beau/belle (regular).',
                examples: [
                    { fr: 'Ce café est meilleur que celui-là. · Ce film est pire que l\u2019autre.', en: 'This coffee is better than that one. · This film is worse than the other.' },
                ],
            },
            {
                explanation: 'Superlatives add the definite article BEFORE the comparative: le plus cher (the most expensive), la moins chère (the least expensive), les meilleurs (the best). Watch the agreement.',
                examples: [
                    { fr: 'C\u2019est le restaurant le plus cher de Paris. · C\u2019est la plus belle ville.', en: 'It is the most expensive restaurant in Paris. · It is the most beautiful city.' },
                ],
            },
            {
                explanation: 'Shopping formulas: je voudrais voir… (I would like to see…), je peux essayer… ? (can I try…?), avez-vous… ? (do you have…?), ça fait combien ? (how much is that?), je peux payer par carte ? (can I pay by card?).',
                examples: [
                    { fr: 'Bonjour, je voudrais voir cette veste, s\u2019il vous plaît. Je peux l\u2019essayer ?', en: 'Hello, I would like to see this jacket, please. Can I try it on?' },
                ],
            },
            {
                explanation: 'European sizes and the shopping culture: clothes use EU sizes (38, 40, 42…), shoes use French sizes. Sales (les soldes) are government-regulated and happen only in January and July. Outside the soldes, prices are fixed — no haggling.',
                examples: [
                    { fr: 'Les soldes d\u2019hiver commencent en janvier. — Vous faites quelle taille ?', en: 'The winter sales start in January. — What size do you wear?' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'magasin': { en: 'shop / store', gender: 'masculine', register: 'neutral' },
        'prix': { en: 'price', gender: 'masculine', register: 'neutral', note: 'same singular and plural' },
        'cher': { en: 'expensive / dear', pron: 'SHEHR', type: 'adjective', gender: 'masculine', register: 'neutral', note: 'ch = sh; feminine: chère' },
        'chère': { en: 'expensive (fem)', pron: 'SHEHR', type: 'adjective', gender: 'feminine', register: 'neutral' },
        'achète': { en: 'buy (je/tu form of acheter)', pron: 'zah-SHET', type: 'verb', register: 'neutral', note: 'è stem change in je/tu/il forms' },
        'payer': { en: 'to pay', pron: 'pah-YAY', type: 'verb', register: 'neutral', note: 'je paie or je paye (both correct)' },
        'vêtements': { en: 'clothes', gender: 'masculine', register: 'neutral' },
        'taille': { en: 'size', gender: 'feminine', register: 'neutral' },
        'essayer': { en: 'to try on / to try', pron: 'eh-say-YAY', type: 'verb', register: 'neutral' },
        'soldes': { en: 'sales (shopping)', gender: 'feminine', register: 'neutral', note: 'twice a year only — January and July' },
        'rembourser': { en: 'to refund', pron: 'rahm-boor-SAY', type: 'verb', register: 'formal' },
        'meilleur': { en: 'better / best (irregular comparative of bon)', pron: 'meh-YEUR', type: 'adjective', gender: 'masculine', register: 'neutral', note: 'feminine: meilleure' },
        'pire': { en: 'worse / worst (irregular comparative of mauvais)', pron: 'PEER', type: 'adjective', register: 'neutral' },
        'celui-là': { en: 'that one (masc)', gender: 'masculine', register: 'neutral' },
        'celle-là': { en: 'that one (fem)', gender: 'feminine', register: 'neutral' },
        'coûte': { en: 'cost(s) (from coûter)', pron: 'koot', type: 'verb', register: 'neutral', note: 'ç makes the c soft' },
        'par carte': { en: 'by card', register: 'neutral' },
        'en espèces': { en: 'in cash', register: 'neutral' },
        'la carte bancaire': { en: 'the bank card', gender: 'feminine', register: 'neutral' },
        'service compris': { en: 'service included (tipping optional)', register: 'neutral' },
        'essaie': { en: 'try / try on (je form of essayer)', register: 'neutral' },
    },
};

// ── A2 · Travel & Transport ──────────────────────────────────────────────────
const a2Travel: StaticFrenchLesson = {
    title: 'Travel & Transport',
    objective: 'Navigate French transport — buy tickets, ask for directions, use venir de (just did) and depuis (for/since), and handle the classic travel roleplay from booking to arriving.',

    vocabulary: [
        { fr: 'le train', en: 'the train', gender: 'masculine', register: 'neutral', example: { fr: 'Je prends le train à huit heures.', en: 'I take the train at eight.' }, related: [{ fr: 'la gare', en: 'the train station' }] },
        { fr: 'la gare', en: 'the train station', gender: 'feminine', register: 'neutral', example: { fr: 'Où est la gare ?', en: 'Where is the train station?' }, related: [{ fr: 'l\u2019aéroport', en: 'the airport' }] },
        { fr: 'le billet', en: 'the ticket', gender: 'masculine', register: 'neutral', example: { fr: 'Un billet pour Paris, s\u2019il vous plaît.', en: 'One ticket to Paris, please.' }, related: [{ fr: 'aller-retour', en: 'round trip' }] },
        { fr: 'l\u2019avion', en: 'the plane', gender: 'masculine', register: 'neutral', example: { fr: 'Je voyage en avion.', en: 'I travel by plane.' }, related: [{ fr: 'l\u2019aéroport', en: 'the airport' }] },
        { fr: 'la voiture', en: 'the car', gender: 'feminine', register: 'neutral', example: { fr: 'Nous voyageons en voiture.', en: 'We travel by car.' }, related: [{ fr: 'le bus', en: 'the bus' }] },
        { fr: 'réserver', en: 'to book / reserve', pron: 'ray-zehr-VAY', type: 'verb', register: 'neutral', example: { fr: 'J\u2019ai réservé un hôtel.', en: 'I booked a hotel.' }, related: [{ fr: 'la réservation', en: 'the reservation' }] },
        { fr: 'l\u2019hôtel', en: 'the hotel', gender: 'masculine', register: 'neutral', example: { fr: 'L\u2019hôtel est près de la gare.', en: 'The hotel is near the station.' }, related: [{ fr: 'une chambre', en: 'a room' }] },
        { fr: 'la chambre', en: 'the room (bedroom)', gender: 'feminine', register: 'neutral', example: { fr: 'Une chambre pour deux personnes.', en: 'A room for two people.' }, related: [{ fr: 'une nuit', en: 'one night' }] },
        { fr: 'venir de', en: 'to have just (done)', register: 'neutral', example: { fr: 'Je viens de arriver.', en: 'I have just arrived.' }, related: [{ fr: 'venir de Paris', en: 'to come from Paris' }] },
        { fr: 'depuis', en: 'since / for', pron: 'duh-PWEE', register: 'neutral', example: { fr: 'J\u2019habite ici depuis deux ans.', en: 'I have lived here for two years.' }, related: [{ fr: 'pendant', en: 'during / for' }] },
        { fr: 'en retard', en: 'late', register: 'neutral', example: { fr: 'Le train est en retard.', en: 'The train is late.' }, related: [{ fr: 'à l\u2019heure', en: 'on time' }] },
        { fr: 'annulé', en: 'cancelled', gender: 'masculine', register: 'neutral', example: { fr: 'Le vol est annulé.', en: 'The flight is cancelled.' }, related: [{ fr: 'supprimé', en: 'removed / cut' }] },
    ],

    pronunciation: [
        { fr: 'la gare', approx: 'lah GAHR', en: 'train station — final e is silent, the r is guttural' },
        { fr: 'l\u2019hôtel', approx: 'loh-TELL', en: 'the h is silent — just "oh-TELL"' },
        { fr: 'depuis', approx: 'duh-PWEE', en: 'since/for — the final s is silent' },
        { fr: 'j\u2019ai réservé', approx: 'zhay ray-zehr-VAY', en: 'booked — the é is closed (ay)' },
        { fr: 'annulé', approx: 'ah-new-LAY', en: 'cancelled — double n at the start' },
        { fr: 'en voiture', approx: 'ahn vwa-TEWR', en: 'by car — the eau in voiture is a single "o" sound' },
    ],

    grammar: {
        rule: 'Venir de + infinitive = "to have just done something" (le passé récent). Depuis + present tense = "for/since" (an action that started in the past and is still happening — English uses the present perfect).',
        explanation: 'Venir de + infinitive is the FRENCH way to say "just did": je viens de manger = I have just eaten. The verb venir is conjugated in the present and followed by an infinitive. Depuis + present tense = for/since with an action that started in the past and is STILL happening: j\u2019habite ici depuis deux ans = I have lived here for two years (present tense in French, present perfect in English). This is one of the biggest differences between French and English tenses. For transport: en + car/train/bus/plane (en voiture, en train, en avion) but à pied (on foot) and à vélo (by bike).',
        examples: [
            { fr: 'Je viens de réserver un hôtel à Paris.', en: 'I have just booked a hotel in Paris.', breakdown: ['je viens de = I have just', 'réserver = to book (infinitive)', 'un hôtel = a hotel'] },
            { fr: 'J\u2019habite ici depuis trois ans.', en: 'I have lived here for three years.', breakdown: ['j\u2019habite = I live (PRESENT — not past!)', 'ici = here', 'depuis trois ans = for three years'] },
            { fr: 'Nous attendons le train depuis vingt minutes.', en: 'We have been waiting for the train for twenty minutes.', breakdown: ['nous attendons = we wait/are waiting (PRESENT)', 'le train = the train', 'depuis vingt minutes = for twenty minutes'] },
            { fr: 'Elle vient de partir.', en: 'She has just left.', breakdown: ['elle vient de = she has just', 'partir = to leave (infinitive)'] },
            { fr: 'Il travaille ici depuis six mois.', en: 'He has been working here for six months.', breakdown: ['il travaille = he works (PRESENT)', 'ici = here', 'depuis six mois = for six months'] },
            { fr: 'Je voyage en train parce que c\u2019est plus agréable.', en: 'I travel by train because it is more pleasant.', breakdown: ['je voyage = I travel', 'en train = by train', 'parce que = because', 'plus agréable = more pleasant'] },
        ],
        commonMistakes: [
            'Using the passé composé with depuis: "J\u2019ai habité ici depuis deux ans" — WRONG if you still live there. Use the PRESENT: j\u2019habite ici depuis deux ans.',
            'Using depuis + passé composé for a finished action: for completed past durations, use pendant: j\u2019ai habité à Lyon pendant deux ans (I lived in Lyon for two years — and I do not anymore).',
            'Forgetting de after venir in the passé récent: "Je viens manger" means "I am coming to eat" — "je viens DE manger" means "I have just eaten".',
            'Using à for transport: en train, en avion, en voiture — but à pied, à vélo. And pour for destinations is wrong: je pars POUR Paris.',
        ],
    },

    transformations: [
        { type: 'Present', fr: 'Je pars demain.', en: 'I am leaving tomorrow.' },
        { type: 'Passé récent', fr: 'Je viens de réserver un hôtel.', en: 'I have just booked a hotel.' },
        { type: 'Depuis + present', fr: 'J\u2019habite ici depuis deux ans.', en: 'I have lived here for two years.' },
        { type: 'Negative', fr: 'Je ne pars pas demain.', en: 'I am not leaving tomorrow.' },
        { type: 'Question', fr: 'Quand est-ce que tu pars ?', en: 'When are you leaving?' },
        { type: 'Imparfait background', fr: 'Il pleuvait et le train était en retard.', en: 'It was raining and the train was late.' },
        { type: 'Passé composé', fr: 'J\u2019ai pris le train à huit heures.', en: 'I took the train at eight.' },
        { type: 'Futur proche', fr: 'Je vais prendre le train de dix heures.', en: 'I am going to take the ten o\u2019clock train.' },
    ],

    sentenceBuilding: [
        { fr: 'Je prends le train.', en: 'I take the train.' },
        { fr: 'Je prends le train à huit heures.', en: 'I take the train at eight o\u2019clock.' },
        { fr: 'Je prends le train à huit heures et j\u2019arrive à dix heures.', en: 'I take the train at eight and arrive at ten.' },
        { fr: 'Je prends le train de huit heures de la gare de Lyon et j\u2019arrive à Marseille vers midi.', en: 'I take the eight o\u2019clock train from Gare de Lyon and arrive in Marseille around noon.' },
        { fr: 'Je prends le TGV de huit heures à la gare de Lyon et j\u2019arrive à Marseille vers midi. J\u2019ai déjà réservé mon billet en ligne.', en: 'I take the eight o\u2019clock TGV from Gare de Lyon and arrive in Marseille around noon. I have already booked my ticket online.' },
    ],

    practice: [
        { instruction: 'Passé récent:', question: 'Je ______ (venir de + finir) mon travail.', answer: 'viens de finir — I have just finished' },
        { instruction: 'Depuis + present:', question: 'J\u2019______ (habiter) ici ______ cinq ans.', answer: 'habite…depuis — present + depuis for ongoing duration' },
        { instruction: 'Transport preposition:', question: 'Je voyage ______ train. (by)', answer: 'en train — en for most transport' },
        { instruction: 'Exception transport:', question: 'Je vais ______ pied. (on)', answer: 'à pied — walking uses à, not en' },
        { instruction: 'Make it negative:', question: 'Le train est en retard.', answer: 'Le train n\u2019est pas en retard.' },
        { instruction: 'Translate:', question: 'One ticket to Marseille, please.', answer: 'Un billet pour Marseille, s\u2019il vous plaît.' },
    ],

    translationPractice: [
        { en: 'I have just arrived in Paris.', fr: 'Je viens d\u2019arriver à Paris.' },
        { en: 'I have lived here for two years.', fr: 'J\u2019habite ici depuis deux ans.' },
        { en: 'One ticket to Marseille, please.', fr: 'Un billet pour Marseille, s\u2019il vous plaît.' },
        { en: 'The train is late.', fr: 'Le train est en retard.' },
        { en: 'I travel by plane.', fr: 'Je voyage en avion.' },
        { en: 'I have booked a hotel room.', fr: 'J\u2019ai réservé une chambre d\u2019hôtel.' },
    ],

    reverseTranslation: [
        { fr: 'Je viens de réserver un hôtel.', en: 'I have just booked a hotel.' },
        { fr: 'Nous attendons le train depuis vingt minutes.', en: 'We have been waiting for the train for twenty minutes.' },
        { fr: 'Le vol est annulé.', en: 'The flight is cancelled.' },
        { fr: 'Elle vient de partir.', en: 'She has just left.' },
    ],

    register: {
        informal: 'On prend le train de dix heures ? — Ouais, et on arrive vers midi. (spoken: on everywhere, times rounded)',
        neutral: 'Je voudrais réserver un billet aller-retour pour Lyon, s\u2019il vous plaît.',
        formal: 'Je souhaite réserver une place en première classe sur le train de dix heures. (formal ticket booking)',
    },

    culture: 'The SNCF (French national railway) runs the TGV — one of the fastest trains in the world (Paris to Marseille in 3 hours). You must validate (composter) your paper ticket before boarding — yellow machines on the platform. French stations use the 24-hour clock exclusively. The Paris Métro is the fastest way to cross the city — line numbers, not names. And strikes (les grèves) are a French institution — check before you travel!',

    freeProduction: 'Write or record a travel story (8–10 sentences): a trip you took or a dream trip. Guiding questions: Where did you go (je suis allé(e) à…)? How did you travel (en train, en avion, en voiture)? How long did the journey take? Where did you stay (j\u2019ai réservé un hôtel)? What did you visit? What was the best part?',

    miniTest: [
        { question: '"Je viens de manger" means…', options: ['I come to eat', 'I have just eaten', 'I used to eat', 'I want to eat'], answer: 'I have just eaten (passé récent)' },
        { question: '"J\u2019habite ici depuis deux ans" uses…', options: ['passé composé', 'imparfait', 'present tense', 'futur'], answer: 'present tense — the action is still happening' },
        { question: 'Which preposition for "by train"?', options: ['à', 'de', 'en', 'par'], answer: 'en — en train, en avion, en voiture' },
        { question: 'Exception: "on foot" is…', options: ['en pied', 'à pied', 'de pied', 'par pied'], answer: 'à pied — walking uses à, not en' },
        { question: '"Le vol est annulé" means…', options: ['The flight is on time', 'The flight is delayed', 'The flight is cancelled', 'The flight is full'], answer: 'The flight is cancelled' },
    ],

    review: [
        'Time expressions from A1 plug in: le train part à huit heures (il est for clock time).',
        'The passé composé from the last lecture works here: j\u2019ai réservé, j\u2019ai pris le train, nous sommes arrivés.',
    ],

    traps: [
        'Using the passé composé with depuis: "J\u2019ai habité ici depuis deux ans" — WRONG if you still live there. Present + depuis for ongoing. Passé composé + pendant for finished.',
        'Forgetting de after venir in the passé récent: "Je viens manger" = I am coming TO eat. "Je viens DE manger" = I have JUST eaten.',
        'Using à for most transport: en train, en avion, en voiture — but à pied, à vélo.',
        'Forgetting to composter (validate) your paper train ticket — the fine is real!',
    ],

    homework: {
        intro: 'The passé récent (venir de), depuis + present, and transport vocabulary. Watch the tense — depuis uses the PRESENT, not the past.',
        translation: [
            { prompt: 'I have just arrived in Paris.', answer: 'Je viens d\u2019arriver à Paris.', explanation: 'venir de + infinitive = the passé récent. The d\u2019 is because arriver starts with a vowel.' },
            { prompt: 'I have lived here for three years.', answer: 'J\u2019habite ici depuis trois ans.', explanation: 'PRESENT tense + depuis for an action that started in the past and is STILL happening. English uses the present perfect — French uses the present.' },
            { prompt: 'One ticket to Marseille, please.', answer: 'Un billet pour Marseille, s\u2019il vous plaît.', explanation: 'pour + destination for tickets. Un billet aller-retour = a return ticket.' },
            { prompt: 'The train is late.', answer: 'Le train est en retard.', explanation: 'en retard = late. The opposite: à l\u2019heure = on time.' },
            { prompt: 'We have been waiting for twenty minutes.', answer: 'Nous attendons depuis vingt minutes.', explanation: 'PRESENT + depuis for an ongoing wait. NOT: nous avons attendu depuis…' },
            { prompt: 'She has just left.', answer: 'Elle vient de partir.', explanation: 'venir de + infinitive. The venir is conjugated (vient), the second verb is an infinitive.' },
            { prompt: 'I travel by plane.', answer: 'Je voyage en avion.', explanation: 'en + transport for most: en train, en avion, en voiture. Exception: à pied, à vélo.' },
            { prompt: 'I booked a hotel room for two nights.', answer: 'J\u2019ai réservé une chambre d\u2019hôtel pour deux nuits.', explanation: 'Passé composé: j\u2019ai réservé (avoir). Une chambre d\u2019hôtel = a hotel room. Pour + duration.' },
        ],
        blanks: [
            { prompt: 'Je ______ de manger. (I have just eaten)', answer: 'viens', explanation: 'venir de + infinitive = passé récent. Je viens de + manger.' },
            { prompt: 'J\u2019______ (habiter) ici depuis cinq ans.', answer: 'habite', explanation: 'PRESENT + depuis for an action that started in the past and is STILL happening.' },
            { prompt: 'Je voyage ______ avion. (by)', answer: 'en', explanation: 'en + transport for most: en train, en avion, en voiture.' },
            { prompt: 'Le train est ______ ______. (late)', answer: 'en retard', explanation: 'en retard = late. The opposite is à l\u2019heure = on time.' },
            { prompt: 'Nous attendons ______ vingt minutes. (for)', answer: 'depuis', explanation: 'depuis + duration for an action that is still happening. Present tense.' },
            { prompt: 'Elle ______ de partir. (has just left)', answer: 'vient', explanation: 'venir de + infinitive. Elle vient de partir = she has just left.' },
        ],
        corrections: [
            { prompt: 'J\u2019ai habité ici depuis deux ans. (and I still do)', answer: 'J\u2019habite ici depuis deux ans.', explanation: 'How the mistake happens: English uses the present perfect ("I have lived"). Why it does not work: if the action is STILL happening, French uses the PRESENT + depuis. How to fix it: present + depuis + duration. Use the passé composé + pendant only if the action is finished.' },
            { prompt: 'Je viens manger. (meaning: I have just eaten)', answer: 'Je viens de manger.', explanation: 'How the mistake happens: forgetting the DE. Why it does not work: venir + infinitive = "to come to do" (a movement). Venir DE + infinitive = "to have just done" (the passé récent). How to fix it: toujours DE after venir for the recent past.' },
            { prompt: 'Je voyage à train.', answer: 'Je voyage en train.', explanation: 'How the mistake happens: confusing à and en for transport. Why it does not work: en is used for most transport (en train, en avion, en voiture). How to fix it: en for the machine, à for walking/biking (à pied, à vélo).' },
            { prompt: 'Je pars pour Paris le train.', answer: 'Je pars pour Paris en train.', explanation: 'How the mistake happens: word order from English. Why it does not work: the transport goes AFTER the destination with en. How to fix it: je pars pour [destination] en [transport].' },
            { prompt: 'Le train est retard.', answer: 'Le train est en retard.', explanation: 'How the mistake happens: translating "is late" word-for-word. Why it does not work: retard is a noun and needs the preposition en: en retard. How to fix it: être en retard = to be late. The opposite: être à l\u2019heure = to be on time.' },
        ],
        writing: {
            task: 'Write about a real or imaginary trip (8–10 sentences). Use venir de for something you just did, depuis + present for how long you have been somewhere, en + transport for how you travelled, and the passé composé for what you did there.',
            requirements: [
                'At least one venir de + infinitive (passé récent)',
                'At least one depuis + present (ongoing duration)',
                'At least two transport words (en train, en avion, en voiture, à pied)',
                'At least three passé composé verbs',
                'One destination (je suis allé(e) à… / pour…)',
            ],
            minWords: 60,
        },
        checklist: [
            'I use venir de + infinitive for "have just done"',
            'I use depuis + PRESENT for ongoing durations (never the passé composé)',
            'I use en + transport (en train, en avion, en voiture) but à pied, à vélo',
            'I can buy a ticket: un billet pour…, aller-retour',
            'I know le train est en retard = the train is late',
            'I can tell a complete travel story out loud',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'The passé récent (venir de + infinitive) is the easiest way to say "just did": je viens de manger = I have just eaten. Conjugate venir in the present (viens, viens, vient, venons, venez, viennent) + de + infinitive.',
                examples: [
                    { fr: 'Je viens d\u2019arriver. · Elle vient de partir. · Nous venons de manger.', en: 'I have just arrived. · She has just left. · We have just eaten.' },
                ],
            },
            {
                explanation: 'Depuis + PRESENT = for/since with an action that started in the past and is STILL happening. English uses the present perfect; French uses the present. If the action is FINISHED, use pendant + passé composé.',
                examples: [
                    { fr: 'J\u2019habite ici depuis deux ans. (still living here — present)', en: 'I have lived here for two years (and still do).' },
                    { fr: 'J\u2019ai habité à Lyon pendant deux ans. (finished — passé composé)', en: 'I lived in Lyon for two years (and moved away).' },
                ],
            },
            {
                explanation: 'Transport: en + vehicle for most (en train, en avion, en voiture, en bus, en taxi). Exceptions: à pied (on foot), à vélo (by bike), à cheval (on horseback).',
                examples: [
                    { fr: 'Je voyage en train. · Elle va au travail en voiture. · Je vais à l\u2019école à pied.', en: 'I travel by train. · She goes to work by car. · I go to school on foot.' },
                ],
            },
            {
                explanation: 'Buying a ticket: un billet aller simple (one-way), un billet aller-retour (return), en deuxième classe (second class), en première classe (first class), non-fumeur (non-smoking), fenêtre (window), couloir (aisle).',
                examples: [
                    { fr: 'Un aller-retour Paris-Lyon, deuxième classe, s\u2019il vous plaît.', en: 'A return ticket Paris-Lyon, second class, please.' },
                ],
            },
            {
                explanation: 'Travel status: le train est en retard (late), à l\u2019heure (on time), annulé (cancelled), supprimé (cut), en gare (at the station), à quai (at the platform). Announcements use the infinitive: « Mesdames et messieurs, le train de Lyon va entrer en gare. »',
                examples: [
                    { fr: 'Le vol AF1234 est en retard d\u2019une heure. — Le train est à l\u2019heure.', en: 'Flight AF1234 is one hour late. — The train is on time.' },
                ],
            },
            {
                explanation: 'depuis vs pendant vs il y a: depuis + present (still happening), pendant + passé composé (finished duration), il y a + passé composé (how long ago).',
                examples: [
                    { fr: 'J\u2019habite ici depuis trois ans. (still) · J\u2019ai habité là-bas pendant trois ans. (finished) · Je suis arrivé il y a trois ans. (three years ago)', en: 'Three ways to talk about past time — each has its own tense.' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'la gare': { en: 'the train station', gender: 'feminine', register: 'neutral' },
        'le billet': { en: 'the ticket', gender: 'masculine', register: 'neutral' },
        'aller-retour': { en: 'return ticket', gender: 'masculine', register: 'neutral' },
        'l\u2019avion': { en: 'the plane', gender: 'masculine', register: 'neutral' },
        'aéroport': { en: 'airport', gender: 'masculine', register: 'neutral', note: 'vowel start → l\u2019aéroport' },
        'voiture': { en: 'car', gender: 'feminine', register: 'neutral' },
        'réserver': { en: 'to book / reserve', pron: 'ray-zehr-VAY', type: 'verb', register: 'neutral' },
        'réservé': { en: 'booked (past participle of réserver)', pron: 'ray-zehr-VAY', type: 'verb', register: 'neutral' },
        'chambre': { en: 'room (bedroom)', gender: 'feminine', register: 'neutral' },
        'nuit': { en: 'night', gender: 'feminine', register: 'neutral' },
        'depuis': { en: 'since / for (still ongoing)', pron: 'duh-PWEE', register: 'neutral', note: 'depuis + PRESENT' },
        'pendant': { en: 'during / for (finished)', register: 'neutral', note: 'pendant + passé composé' },
        'venir de': { en: 'to have just (passé récent)', register: 'neutral', note: 'venir (present) + de + infinitive' },
        'viens de': { en: 'have just (je form)', register: 'neutral' },
        'vient de': { en: 'has just (il/elle form)', register: 'neutral' },
        'en retard': { en: 'late', register: 'neutral' },
        'à l\u2019heure': { en: 'on time', register: 'neutral' },
        'annulé': { en: 'cancelled', gender: 'masculine', register: 'neutral' },
        'vol': { en: 'flight', gender: 'masculine', register: 'neutral' },
        'en voiture': { en: 'by car', register: 'neutral' },
        'en train': { en: 'by train', register: 'neutral' },
        'en avion': { en: 'by plane', register: 'neutral' },
        'à pied': { en: 'on foot', register: 'neutral', note: 'exception — à, not en' },
        'attendre': { en: 'to wait / wait for', register: 'neutral' },
        'attendons': { en: 'wait (nous form of attendre)', register: 'neutral' },
        'TGV': { en: 'high-speed train (Train à Grande Vitesse)', gender: 'masculine', register: 'neutral' },
        'composter': { en: 'to validate (a ticket)', register: 'neutral', note: 'mandatory for paper tickets' },
        'les grèves': { en: 'the strikes', gender: 'feminine', register: 'neutral', note: 'check before travelling!' },
    },
};

// ── A2 · Work & Daily Life ───────────────────────────────────────────────────
const a2Work: StaticFrenchLesson = {
    title: 'Work & Daily Life',
    objective: 'Talk about your job, make invitations and requests with vouloir/pouvoir/devoir + infinitive, use il faut for obligation, and describe your professional life — the personal and professional ground the TCF covers in every format.',

    vocabulary: [
        { fr: 'le travail', en: 'the work / job', gender: 'masculine', register: 'neutral', example: { fr: 'J\u2019ai beaucoup de travail.', en: 'I have a lot of work.' }, related: [{ fr: 'le boulot', en: 'the job (informal)' }] },
        { fr: 'le bureau', en: 'the office / desk', gender: 'masculine', register: 'neutral', example: { fr: 'Je vais au bureau à huit heures.', en: 'I go to the office at eight.' }, related: [{ fr: 'le collègue', en: 'the colleague' }] },
        { fr: 'le patron', en: 'the boss', gender: 'masculine', register: 'neutral', example: { fr: 'Mon patron est sympa.', en: 'My boss is nice.' }, related: [{ fr: 'la patronne', en: 'the boss (fem)' }] },
        { fr: 'le salaire', en: 'the salary', gender: 'masculine', register: 'neutral', example: { fr: 'Il a un bon salaire.', en: 'He has a good salary.' }, related: [{ fr: 'gagner', en: 'to earn' }] },
        { fr: 'il faut', en: 'it is necessary / one must', pron: 'eel foh', type: 'verb', register: 'neutral', example: { fr: 'Il faut travailler.', en: 'One must work.' }, related: [{ fr: 'il faut + infinitive', en: 'impersonal obligation' }] },
        { fr: 'je dois', en: 'I must / I have to', pron: 'zhuh dwah', type: 'verb', register: 'neutral', example: { fr: 'Je dois partir.', en: 'I have to leave.' }, related: [{ fr: 'tu dois', en: 'you must' }] },
        { fr: 'je peux', en: 'I can / I am able', pron: 'zhuh puh', type: 'verb', register: 'neutral', example: { fr: 'Je peux t\u2019aider ?', en: 'Can I help you?' }, related: [{ fr: 'tu peux', en: 'you can' }] },
        { fr: 'je veux', en: 'I want', pron: 'zhuh vuh', type: 'verb', register: 'neutral', example: { fr: 'Je veux apprendre.', en: 'I want to learn.' }, related: [{ fr: 'je voudrais', en: 'I would like (more polite)' }] },
        { fr: 'une réunion', en: 'a meeting', gender: 'feminine', register: 'neutral', example: { fr: 'J\u2019ai une réunion à dix heures.', en: 'I have a meeting at ten.' }, related: [{ fr: 'un entretien', en: 'an interview' }] },
        { fr: 'chercher', en: 'to look for / to search', pron: 'shehr-SHAY', type: 'verb', register: 'neutral', example: { fr: 'Je cherche un travail.', en: 'I am looking for a job.' }, related: [{ fr: 'trouver', en: 'to find' }] },
        { fr: 'gagner', en: 'to earn / to win', pron: 'gah-NYAY', type: 'verb', register: 'neutral', example: { fr: 'Il gagne bien sa vie.', en: 'He earns a good living.' }, related: [{ fr: 'gagner de l\u2019argent', en: 'to earn money' }] },
        { fr: 'envoyer un email', en: 'to send an email', pron: 'ahn-vwah-yay uhn eh-MEEL', type: 'phrase', register: 'neutral', example: { fr: 'J\u2019ai envoyé un email.', en: 'I sent an email.' }, related: [{ fr: 'écrire', en: 'to write' }] },
    ],

    pronunciation: [
        { fr: 'il faut', approx: 'eel FOH', en: 'obligation — the t is pronounced because faut is from falloir' },
        { fr: 'je dois', approx: 'zhuh DWAH', en: 'must — the oi is a glide: "wah"' },
        { fr: 'je peux', approx: 'zhuh PUH', en: 'can — final x silent, like the œ in œuf' },
        { fr: 'je veux', approx: 'zhuh VUH', en: 'want — the eu is rounded like the ü in German' },
        { fr: 'chercher', approx: 'shehr-SHAY', en: 'to look for — ch = sh twice' },
        { fr: 'gagner', approx: 'gah-NYAY', en: 'to earn — the gn sounds like the ny in canyon' },
    ],

    grammar: {
        rule: 'Modal verbs (pouvoir, vouloir, devoir) + infinitive express ability, desire, and obligation. Il faut + infinitive is the impersonal obligation — it never changes form.',
        explanation: 'French modal verbs work like English modals: conjugate the modal, put the second verb in the INFINITIVE. Je peux parler = I can speak. Je dois partir = I must leave. Je veux manger = I want to eat. The sentence bracket: the modal sits in position 2, the infinitive goes at the END. Il faut + infinitive is the impersonal obligation — it NEVER conjugates: il faut partir, il faut manger, il faut travailler. For personal obligation, use devoir: je dois partir. For permission, use pouvoir: je peux sortir ? For wanting, use vouloir or souhaiter (more formal).',
        examples: [
            { fr: 'Je dois travailler demain.', en: 'I have to work tomorrow.', breakdown: ['je dois = I must (devoir present)', 'travailler = to work (infinitive)', 'demain = tomorrow'] },
            { fr: 'Tu peux m\u2019aider ?', en: 'Can you help me?', breakdown: ['tu peux = you can (pouvoir)', 'm\u2019aider = to help me (aider with me attached)'] },
            { fr: 'Il faut partir tôt.', en: 'One must leave early. / It is necessary to leave early.', breakdown: ['il faut = it is necessary (impersonal)', 'partir = to leave (infinitive)', 'tôt = early'] },
            { fr: 'Nous voulons apprendre le français.', en: 'We want to learn French.', breakdown: ['nous voulons = we want (vouloir)', 'apprendre = to learn (infinitive)', 'le français = French'] },
            { fr: 'Elle ne peut pas venir aujourd\u2019hui.', en: 'She cannot come today.', breakdown: ['elle ne peut pas = she cannot', 'venir = to come (infinitive)', 'aujourd\u2019hui = today'] },
            { fr: 'Il faut que je parte.', en: 'I must leave. (with subjunctive — B1 preview!)', breakdown: ['il faut que = it is necessary that', 'je parte = I leave (SUBJUNCTIVE — advanced)'] },
        ],
        commonMistakes: [
            'Conjugating the second verb: "Je dois pars" → je dois PARTIR (infinitive). The modal is conjugated, the second verb stays in the infinitive.',
            'Forgetting il faut is impersonal: "Il faut je parte" is advanced (subjunctive). At A2, use il faut + infinitive only: il faut partir.',
            'Using je veux with strangers — it sounds demanding. Use je voudrais (I would like) for politeness.',
            'Forgetting the sentence bracket: "Je dois le faire" is correct — the modal and the infinitive WRAP the object.',
        ],
    },

    transformations: [
        { type: 'Present', fr: 'Je travaille.', en: 'I work.' },
        { type: 'Obligation (devoir)', fr: 'Je dois travailler.', en: 'I must work.' },
        { type: 'Ability (pouvoir)', fr: 'Je peux travailler.', en: 'I can work.' },
        { type: 'Desire (vouloir)', fr: 'Je veux travailler.', en: 'I want to work.' },
        { type: 'Impersonal (il faut)', fr: 'Il faut travailler.', en: 'One must work.' },
        { type: 'Negative obligation', fr: 'Je ne dois pas travailler dimanche.', en: 'I must not work on Sunday.' },
        { type: 'Negative ability', fr: 'Je ne peux pas venir.', en: 'I cannot come.' },
        { type: 'Polite request', fr: 'Pourriez-vous m\u2019aider ?', en: 'Could you help me? (conditional — B1 preview!)' },
    ],

    sentenceBuilding: [
        { fr: 'Je travaille dans un bureau.', en: 'I work in an office.' },
        { fr: 'Je travaille dans un bureau avec cinq collègues.', en: 'I work in an office with five colleagues.' },
        { fr: 'Je travaille dans un bureau avec cinq collègues et je dois envoyer beaucoup d\u2019emails.', en: 'I work in an office with five colleagues and I have to send a lot of emails.' },
        { fr: 'Je travaille dans un bureau avec cinq collègues. Je dois envoyer beaucoup d\u2019emails et je dois aussi préparer des réunions.', en: 'I work in an office with five colleagues. I have to send a lot of emails and I also have to prepare meetings.' },
        { fr: 'Je travaille dans un bureau avec cinq collègues. Je dois envoyer beaucoup d\u2019emails, préparer des réunions et quelquefois je peux travailler de chez moi.', en: 'I work in an office with five colleagues. I have to send a lot of emails, prepare meetings, and sometimes I can work from home.' },
    ],

    practice: [
        { instruction: 'Modal + infinitive:', question: 'Je ______ (devoir + partir) tôt.', answer: 'dois partir — devoir conjugated + partir infinitive' },
        { instruction: 'Modal + infinitive:', question: 'Tu ______ (pouvoir) m\u2019aider ?', answer: 'peux aider — peux + aider' },
        { instruction: 'Impersonal obligation:', question: '______ travailler dur. (one must)', answer: 'Il faut travailler — il faut never changes' },
        { instruction: 'Negative modal:', question: 'Elle ______ (ne pas pouvoir) venir.', answer: 'ne peut pas venir — ne wraps peut' },
        { instruction: 'Polite want:', question: 'Je ______ (vouloir, polite) un café.', answer: 'voudrais — conditional of vouloir = more polite' },
        { instruction: 'Translate:', question: 'I am looking for a job.', answer: 'Je cherche un travail. (or: un emploi)' },
    ],

    translationPractice: [
        { en: 'I have to work tomorrow.', fr: 'Je dois travailler demain.' },
        { en: 'Can you help me?', fr: 'Peux-tu m\u2019aider ?' },
        { en: 'One must arrive on time.', fr: 'Il faut arriver à l\u2019heure.' },
        { en: 'She cannot come today.', fr: 'Elle ne peut pas venir aujourd\u2019hui.' },
        { en: 'I want to learn French.', fr: 'Je veux apprendre le français.' },
        { en: 'We have a meeting at ten.', fr: 'Nous avons une réunion à dix heures.' },
    ],

    reverseTranslation: [
        { fr: 'Je dois partir tôt demain.', en: 'I have to leave early tomorrow.' },
        { fr: 'Tu peux m\u2019aider ?', en: 'Can you help me?' },
        { fr: 'Il faut être à l\u2019heure.', en: 'One must be on time.' },
        { fr: 'Elle ne veut pas travailler le samedi.', en: 'She does not want to work on Saturdays.' },
    ],

    register: {
        informal: 'Je dois bosser demain — ça craint ! (bosser = slang for travailler; ça craint = it sucks)',
        neutral: 'Je dois travailler demain et j\u2019ai une réunion à dix heures.',
        formal: 'Je suis amené(e) à travailler le week-end. Il m\u2019est impossible d\u2019assister à la réunion. (formal work register)',
    },

    culture: 'The French work week is legally 35 hours (la semaine de trente-cinq heures), and overtime is paid extra. Workers get five weeks of paid holiday (les congés payés) plus public holidays. The lunch break is sacred — many people take a full hour or more. Email culture is more formal than in Anglo countries — start with « Bonjour Monsieur/Madame » and end with « Cordialement » or « Bien à vous ». The RTT (réduction du temps de travail) gives extra days off in some companies.',

    freeProduction: 'Write or record your professional life (8–10 sentences). Guiding questions: What do you do (je suis… / je travaille comme…)? Where do you work? What do you have to do every day (je dois…)? What can you do at your job (je peux…)? Do you like your job (j\u2019aime / je n\u2019aime pas)? What do you want to do in the future (je voudrais…)?',

    miniTest: [
        { question: 'Il faut + …', options: ['conjugated verb', 'infinitive', 'past participle', 'present participle'], answer: 'infinitive — il faut partIR (never il faut partIR)"' },
        { question: 'Which modal means "must / have to"?', options: ['pouvoir', 'vouloir', 'devoir', 'savoir'], answer: 'devoir' },
        { question: 'Complete: Je ______ partir tôt. (can)', options: ['veux', 'peux', 'dois', 'faut'], answer: 'peux' },
        { question: 'More polite than "Je veux un café"?', options: ['Je veux bien un café.', 'Je voudrais un café.', 'Je dois un café.', 'Je peux un café.'], answer: 'Je voudrais un café. — conditional = polite' },
        { question: 'Il faut is…', options: ['conjugated for every person', 'impersonal — never changes', 'used with que at A2', 'only for negative sentences'], answer: 'impersonal — never changes form' },
    ],

    review: [
        'Daily routine verbs from last lecture plug in here: je me lève, je vais au bureau, je travaille.',
        'Time expressions still apply: je travaille de neuf heures à dix-sept heures.',
    ],

    traps: [
        'Conjugating the second verb after a modal: "Je dois pars" → je dois PARTIR. The modal conjugates, the second verb stays in the infinitive.',
        'Using je veux with strangers or in formal contexts — it sounds demanding. Je voudrais is the polite version.',
        'Conjugating il faut — it is ALWAYS il faut (impersonal, never changes). For personal obligation, use devoir: je dois.',
        'Forgetting the sentence bracket: the modal wraps the sentence — anything between the modal and the infinitive stays inside the bracket.',
    ],

    homework: {
        intro: 'Modal verbs + infinitive in every section. The sentence bracket (modal + infinitive) is the key structure — and il faut never changes.',
        translation: [
            { prompt: 'I have to work tomorrow.', answer: 'Je dois travailler demain.', explanation: 'devoir conjugated (je dois) + travailler (infinitive). The sentence bracket wraps demain.' },
            { prompt: 'Can you help me?', answer: 'Peux-tu m\u2019aider ?', alt: ["Est-ce que tu peux m'aider ?"], explanation: 'pouvoir conjugated (tu peux) + aider (infinitive). M\u2019aider = me + aider joined before a vowel.' },
            { prompt: 'One must arrive on time.', answer: 'Il faut arriver à l\u2019heure.', explanation: 'il faut is impersonal — it never changes. The verb stays in the infinitive.' },
            { prompt: 'She cannot come today.', answer: 'Elle ne peut pas venir aujourd\u2019hui.', explanation: 'The negation wraps the MODAL (ne peut pas), not the infinitive. venir stays in the infinitive.' },
            { prompt: 'We want to learn French.', answer: 'Nous voulons apprendre le français.', explanation: 'vouloir conjugated (nous voulons) + apprendre (infinitive).' },
            { prompt: 'I am looking for a job.', answer: 'Je cherche un travail.', explanation: 'chercher = to look for. Also: un emploi (a job — more formal). No preposition after chercher.' },
            { prompt: 'You must arrive on time.', answer: 'Vous devez arriver à l\u2019heure.', explanation: 'devoir vous form: vous devez + arriver (infinitive). à l\u2019heure = on time.' },
            { prompt: 'He can work from home.', answer: 'Il peut travailler de chez lui.', explanation: 'pouvoir conjugated + travailler (infinitive). de chez lui = from his home.' },
        ],
        blanks: [
            { prompt: 'Je ______ (devoir) partir tôt.', answer: 'dois', explanation: 'devoir conjugated for je: je dois. The second verb stays in the infinitive.' },
            { prompt: 'Tu ______ (pouvoir) m\u2019aider ?', answer: 'peux', explanation: 'pouvoir conjugated for tu: tu peux.' },
            { prompt: 'Il ______ falloir partir. (impersonal)', answer: 'faut', explanation: 'il faut is impersonal — it NEVER changes, no matter the subject.' },
            { prompt: 'Nous ______ (vouloir) apprendre.', answer: 'voulons', explanation: 'vouloir conjugated for nous: nous voulons.' },
            { prompt: 'Elle ne ______ pas venir. (can)', answer: 'peut', explanation: 'The negation wraps the MODAL: elle ne peut pas venir.' },
            { prompt: 'Il faut ______ (partir) tôt.', answer: 'partir', explanation: 'il faut + INFINITIVE — always the infinitive, never conjugated.' },
        ],
        corrections: [
            { prompt: 'Je dois pars tôt.', answer: 'Je dois partir tôt.', explanation: 'How the mistake happens: conjugating the second verb like English "I must go" → "I must goes". Why it does not work: after a modal, the second verb stays in the INFINITIVE. How to fix it: modal (conjugated) + infinitive (unchanged). je dois partir, tu dois partir, il doit partir.' },
            { prompt: 'Il faut que je pars.', answer: 'Il faut partir. (A2 level)', explanation: 'How the mistake happens: adding a subject after il faut. Why it does not work: il faut + INFINITIVE is the A2 structure. (The subjunctive il faut que je parte is B1 — you will learn it later.) How to fix it: at A2, always use il faut + infinitive.' },
            { prompt: 'Je veux un café. (to a waiter)', answer: 'Je voudrais un café, s\u2019il vous plaît.', explanation: 'How the mistake happens: using je veux everywhere. Why it does not work: je veux sounds DEMANDING with strangers or in service situations. How to fix it: je voudrais (conditional) = polite. With friends, je veux is fine.' },
            { prompt: 'Elle peut pas venir.', answer: 'Elle ne peut pas venir.', explanation: 'How the mistake happens: copying spoken French that drops ne. Why it does not work: the WRITTEN exam requires the full negation. How to fix it: always write ne (n\u2019 before a vowel): elle ne peut pas.' },
            { prompt: 'Il faut travailler dur pour réussir, n\u2019est-ce pas ? — Oui, il le faut !', answer: 'Correct! Il le faut is an emphatic reply (literally: it is necessary so).', explanation: 'Trick question — this exchange is actually correct! Il le faut is a fixed emphatic expression. But for A2, stick to il faut + infinitive.' },
        ],
        writing: {
            task: 'Write about your work or studies (8–10 sentences): what you do, where, what you have to do every day (je dois…), what you can do (je peux…), what you want to change (je voudrais…), and one thing that is necessary (il faut…). Finish with a question about the reader\u2019s work.',
            requirements: [
                'At least two devoir + infinitive (je dois travailler, tu dois…)',
                'At least one pouvoir + infinitive (je peux…)',
                'One il faut + infinitive',
                'One vouloir or voudrais (what you want)',
                'One question about the reader\u2019s job or studies',
            ],
            minWords: 60,
        },
        checklist: [
            'I conjugate pouvoir, vouloir, devoir for all persons',
            'I put the second verb in the INFINITIVE after every modal',
            'I use il faut + infinitive for impersonal obligation',
            'I know je voudrais is more polite than je veux',
            'The negation wraps the MODAL: je ne peux pas venir',
            'I can describe my work or studies out loud with modals',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'The three modals: pouvoir (can), vouloir (want), devoir (must). Conjugate the modal for the subject, put the second verb in the INFINITIVE. The two verbs form a sentence BRACKET.',
                examples: [
                    { fr: 'je peux partir · tu dois travailler · il veut manger · nous pouvons venir · vous voulez apprendre · ils doivent finir', en: 'can leave · must work · wants to eat · can come · want to learn · must finish' },
                ],
            },
            {
                explanation: 'Il faut = impersonal obligation. It NEVER conjugates. Il faut + infinitive. For personal obligation, use devoir instead: je dois partir.',
                examples: [
                    { fr: 'Il faut travailler. · Il faut partir tôt. · Il faut être patient.', en: 'One must work. · One must leave early. · One must be patient.' },
                ],
            },
            {
                explanation: 'The negation wraps the MODAL, not the infinitive: je ne peux pas venir (not: je peux ne pas venir). The infinitive stays outside the negation.',
                examples: [
                    { fr: 'Je ne peux pas venir. · Tu ne dois pas fumer. · Elle ne veut pas manger.', en: 'I cannot come. · You must not smoke. · She does not want to eat.' },
                ],
            },
            {
                explanation: 'Register matters: je voudrais (conditional) is the POLITE way to want something. Je veux is direct and can sound demanding with strangers or in professional settings.',
                examples: [
                    { fr: 'Je voudrais un café, s\u2019il vous plaît. (polite — waiter)', en: 'I would like a coffee, please.' },
                ],
            },
            {
                explanation: 'Il y a also il y a + infinitive for "there is someone to do something": il y a du travail à faire (there is work to do). This is a passive-like construction.',
                examples: [
                    { fr: 'Il y a beaucoup de travail à faire cette semaine.', en: 'There is a lot of work to do this week.' },
                ],
            },
            {
                explanation: 'Modal verbs in the passé composé: the auxiliary follows the INFINITIVE\u2019s verb (avoir for pouvoir, devoir, vouloir): j\u2019ai pu (I could), j\u2019ai dû (I had to), j\u2019ai voulu (I wanted to).',
                examples: [
                    { fr: 'J\u2019ai pu venir. — J\u2019ai dû partir. — J\u2019ai voulu t\u2019aider.', en: 'I was able to come. · I had to leave. · I wanted to help you.' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'travail': { en: 'work / job', gender: 'masculine', register: 'neutral', note: 'also: le boulot (informal), un emploi (a job position)' },
        'bureau': { en: 'office / desk', gender: 'masculine', register: 'neutral' },
        'patron': { en: 'boss', gender: 'masculine', register: 'neutral', note: 'feminine: la patronne' },
        'salaire': { en: 'salary', gender: 'masculine', register: 'neutral' },
        'réunion': { en: 'meeting', gender: 'feminine', register: 'neutral' },
        'cherche': { en: 'look(s) for / search(es) (from chercher)', register: 'neutral', note: 'no preposition: je cherche un travail' },
        'gagne': { en: 'earn(s) / win(s) (from gagner)', register: 'neutral' },
        'envoyé': { en: 'sent (past participle of envoyer)', pron: 'ahn-vwah-YAY', type: 'verb', register: 'neutral' },
        'il faut': { en: 'it is necessary / one must', pron: 'eel foh', type: 'verb', register: 'neutral', note: 'impersonal — never conjugates' },
        'dois': { en: 'must (je/tu form of devoir)', pron: 'dwah', type: 'verb', register: 'neutral' },
        'doit': { en: 'must (il/elle form of devoir)', pron: 'dwah', type: 'verb', register: 'neutral' },
        'devons': { en: 'must (nous form of devoir)', pron: 'duh-VOHN', type: 'verb', register: 'neutral' },
        'devez': { en: 'must (vous form of devoir)', pron: 'duh-VAY', type: 'verb', register: 'neutral' },
        'peux': { en: 'can (je/tu form of pouvoir)', pron: 'puh', type: 'verb', register: 'neutral' },
        'peut': { en: 'can (il/elle form of pouvoir)', pron: 'puh', type: 'verb', register: 'neutral' },
        'pouvons': { en: 'can (nous form of pouvoir)', pron: 'poo-VOHN', type: 'verb', register: 'neutral' },
        'veux': { en: 'want (je/tu form of vouloir)', pron: 'vuh', type: 'verb', register: 'neutral' },
        'veut': { en: 'want(s) (il/elle form of vouloir)', pron: 'vuh', type: 'verb', register: 'neutral' },
        'voulons': { en: 'want (nous form of vouloir)', pron: 'voo-LOHN', type: 'verb', register: 'neutral' },
        'voudrais': { en: 'would like (conditional of vouloir)', pron: 'voo-DREH', type: 'verb', register: 'neutral', note: 'more polite than je veux' },
        'd\u2019accord': { en: 'okay / agreed', pron: 'dah-KOR', register: 'neutral' },
        'cordialement': { en: 'best regards (email closing)', register: 'formal' },
        'boulot': { en: 'job (slang)', gender: 'masculine', register: 'informal' },
        'gagner sa vie': { en: 'to earn a living', register: 'neutral' },
        'de chez moi': { en: 'from my home (working from home)', register: 'neutral' },
    },
};

export const STATIC_A2_PART2: Record<string, StaticFrenchLesson> = {
    'A2:futur': a2Futur,
    'A2:shopping': a2Shopping,
    'A2:travel': a2Travel,
    'A2:work': a2Work,
};
