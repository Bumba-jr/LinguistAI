// A2 lectures part 1 — Passé Composé, Imparfait, Futur Proche & Futur Simple.
// Same gold-standard format as the approved A1:greetings template:
// full lesson + traps + homework (A–D) + checklistRemedial + glossary
// (spread over BASE_GLOSSARY so shared function words are covered).

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── A2 · Passé Composé ───────────────────────────────────────────────────────
const a2PasseCompose: StaticFrenchLesson = {
    title: 'Passé Composé',
    objective: 'Talk about completed past events using the passé composé with the correct auxiliary (avoir or être), form irregular past participles from memory, and make the agreement with être — the most used past tense in spoken French.',

    vocabulary: [
        { fr: 'j\u2019ai mangé', en: 'I ate / I have eaten', pron: 'zhay mahn-ZHAY', type: 'verb', register: 'neutral', example: { fr: 'J\u2019ai mangé une pizza hier.', en: 'I ate a pizza yesterday.' }, related: [{ fr: 'tu as mangé', en: 'you ate' }] },
        { fr: 'je suis allé(e)', en: 'I went (masc/fem)', pron: 'zhuh swee zah-LAY', type: 'verb', register: 'neutral', example: { fr: 'Je suis allé au cinéma.', en: 'I went to the cinema.' }, related: [{ fr: 'elle est allée', en: 'she went (+e)' }] },
        { fr: 'j\u2019ai fait', en: 'I did / made', pron: 'zhay FEH', type: 'verb', register: 'neutral', example: { fr: 'Qu\u2019est-ce que tu as fait ?', en: 'What did you do?' }, related: [{ fr: 'faire → fait (irregular participle)', en: 'related form' }] },
        { fr: 'j\u2019ai vu', en: 'I saw', pron: 'zhay VOO', type: 'verb', register: 'neutral', example: { fr: 'J\u2019ai vu un film génial.', en: 'I saw a great film.' }, related: [{ fr: 'voir → vu', en: 'to see → seen' }] },
        { fr: 'j\u2019ai pris', en: 'I took', pron: 'zhay PREE', type: 'verb', register: 'neutral', example: { fr: 'J\u2019ai pris le train.', en: 'I took the train.' }, related: [{ fr: 'prendre → pris', en: 'to take → taken' }] },
        { fr: 'il est parti', en: 'he left', pron: 'eel pahr-TEE', type: 'verb', register: 'neutral', example: { fr: 'Il est parti à huit heures.', en: 'He left at eight.' }, related: [{ fr: 'partir → parti', en: 'to leave → left (être verb!)' }] },
        { fr: 'nous avons fini', en: 'we finished', pron: 'noo zah-VOHN fee-NEE', type: 'verb', register: 'neutral', example: { fr: 'Nous avons fini le travail.', en: 'We finished the work.' }, related: [{ fr: 'finir → fini', en: 'to finish → finished (regular)' }] },
        { fr: 'hier', en: 'yesterday', pron: 'ee-YEHR', gender: 'masculine', register: 'neutral', example: { fr: 'Hier, j\u2019ai travaillé.', en: 'Yesterday I worked.' }, related: [{ fr: 'hier soir', en: 'last night' }] },
        { fr: 'la semaine dernière', en: 'last week', gender: 'feminine', register: 'neutral', example: { fr: 'La semaine dernière, je suis allé à Paris.', en: 'Last week I went to Paris.' }, related: [{ fr: 'l\u2019année dernière', en: 'last year' }] },
        { fr: 'd\u2019abord', en: 'first', pron: 'dah-BOR', register: 'neutral', example: { fr: 'D\u2019abord, j\u2019ai mangé.', en: 'First, I ate.' }, related: [{ fr: 'ensuite', en: 'then' }, { fr: 'enfin', en: 'finally' }] },
        { fr: 'irrégulier', en: 'irregular', gender: 'masculine', register: 'neutral', example: { fr: 'Le participe passé de faire est irrégulier.', en: 'The past participle of faire is irregular.' }, related: [{ fr: 'régulier', en: 'regular' }] },
        { fr: 'être né(e)', en: 'to be born (lit. to be born-masc/fem)', register: 'neutral', example: { fr: 'Je suis né au Nigeria.', en: 'I was born in Nigeria. (masc speaker)' }, related: [{ fr: 'elle est née', en: 'she was born (+e)' }] },
    ],

    pronunciation: [
        { fr: 'j\u2019ai mangé', approx: 'zhay mahn-ZHAY', en: 'the é is a closed "ay" — never "eh"' },
        { fr: 'il est parti', approx: 'eel eh pahr-TEE', en: 'être aux + parti — two words pronounced as three syllables' },
        { fr: 'elles sont allées', approx: 'el sohn tah-LAY', en: 'triple agreement: all-É-E-S — but still one "ay" sound' },
        { fr: 'nous avons fini', approx: 'noo zah-VOHN fee-NEE', en: 'avons is nasal "zah-VOHN"' },
        { fr: 'il a fait', approx: 'eel ah FEH', en: 'il a (he has) sounds like "eel-AH" — vs ils ont "eel-OHN"' },
        { fr: 'j\u2019ai pris', approx: 'zhay PREE', en: 'pris sounds like "pree" — rhymes with ici' },
    ],

    grammar: {
        rule: 'Passé composé = auxiliary (avoir OR être) + past participle. 90% of verbs use avoir. 16 motion/reflexive verbs use être. With être, the participle AGREES with the subject.',
        explanation: 'The passé composé is built like English "have eaten": auxiliary + past participle. Choose avoir for most verbs (manger, faire, voir…), but être for motion and change-of-state verbs (aller, venir, partir, naître, mourir, rester…) and ALL reflexive verbs. With être, the participle acts like an adjective: a woman says elle est allée (+e), plural adds -s, feminine plural -es. With avoir, the participle does NOT agree with the subject — but it DOES agree with a preceding direct object (les pommes que j\u2019ai mangées). Irregular participles must be memorized: faire → fait, voir → vu, prendre → pris, être → été, avoir → eu, lire → lu, écrire → écrit, mettre → mis, dire → dit, ouvrir → ouvert, pouvoir → pu, vouloir → voulu, devoir → dû, savoir → su, recevoir → reçu, vivre → vécu.',
        examples: [
            { fr: 'J\u2019ai mangé une pizza hier soir.', en: 'I ate a pizza last night.', breakdown: ['j\u2019ai = I have (avoir auxiliary)', 'mangé = eaten (manger → mang- + é)', 'une pizza = a pizza', 'hier soir = last night'] },
            { fr: 'Elle est allée au cinéma avec ses amis.', en: 'She went to the cinema with her friends.', breakdown: ['elle est = she is (être auxiliary!)', 'allée = gone (+e — feminine agreement)', 'au cinéma = to the cinema', 'ses amis = her friends'] },
            { fr: 'Ils sont partis très tôt.', en: 'They left very early.', breakdown: ['ils sont = they are (être)', 'partis = left (masc plural +s)', 'très tôt = very early'] },
            { fr: 'Nous avons fini à dix heures.', en: 'We finished at ten o\u2019clock.', breakdown: ['nous avons = we have', 'fini = finished (regular -ir → -i)', 'à dix heures = at ten'] },
            { fr: 'Tu as vu le nouveau film ?', en: 'Have you seen the new film?', breakdown: ['tu as = you have', 'vu = seen (voir → vu, irregular)', 'le nouveau film = the new film'] },
            { fr: 'Elle s\u2019est levée à six heures.', en: 'She got up at six.', breakdown: ['elle s\u2019est = she (reflexive être aux)', 'levée = gotten up (+e — feminine with être)', 'à six heures = at six'] },
        ],
        commonMistakes: [
            'Using être for "Je suis mangé" — 90% of verbs take AVOIR: j\u2019ai mangé. Only motion verbs (aller, venir, partir…) and reflexives take être.',
            'Forgetting agreement with être verbs: a woman must say "elle est alléE" — the +e is graded.',
            'Making the participle agree with avoir: "Elle a mangéE la pizza" — WRONG with avoir (unless a preceding direct object: la pizza qu\u2019elle a mangée).',
            'Writing "j\u2019ai allé" — aller is a Motion verb and ALWAYS takes être: je suis allé(e).',
        ],
    },

    transformations: [
        { type: 'Present', fr: 'Je mange une pizza.', en: 'I eat a pizza.' },
        { type: 'Passé composé (avoir)', fr: 'J\u2019ai mangé une pizza.', en: 'I ate a pizza.' },
        { type: 'Negative', fr: 'Je n\u2019ai pas mangé de pizza.', en: 'I did not eat pizza. (des → de!)' },
        { type: 'Question (est-ce que)', fr: 'Est-ce que tu as mangé ?', en: 'Did you eat?' },
        { type: 'Motion verb (être)', fr: 'Je suis allé au cinéma.', en: 'I went to the cinema.' },
        { type: 'Feminine agreement', fr: 'Elle est allée au cinéma.', en: 'She went to the cinema. (+e)' },
        { type: 'Reflexive', fr: 'Je me suis levé(e) à sept heures.', en: 'I got up at seven.' },
        { type: 'Irregular participle', fr: 'J\u2019ai fait mes devoirs.', en: 'I did my homework. (faire → fait)' },
    ],

    sentenceBuilding: [
        { fr: 'Hier, j\u2019ai mangé au restaurant.', en: 'Yesterday I ate at the restaurant.' },
        { fr: 'Hier, j\u2019ai mangé au restaurant avec mes amis.', en: 'Yesterday I ate at the restaurant with my friends.' },
        { fr: 'Hier, j\u2019ai mangé au restaurant avec mes amis et ensuite nous sommes allés au cinéma.', en: 'Yesterday I ate at the restaurant with my friends and then we went to the cinema.' },
        { fr: 'Hier soir, j\u2019ai mangé au restaurant avec mes amis. Ensuite, nous sommes allés au cinéma et nous avons vu un film français.', en: 'Last night I ate at the restaurant with my friends. Then we went to the cinema and saw a French film.' },
        { fr: 'Hier soir, j\u2019ai mangé au restaurant avec mes amis. Ensuite, nous sommes allés au cinéma et nous avons vu un film français qui était fantastique.', en: 'Last night I ate at the restaurant with my friends. Then we went to the cinema and saw a French film that was fantastic.' },
    ],

    practice: [
        { instruction: 'Choose the auxiliary:', question: 'Je ______ (aller) au cinéma hier.', answer: 'Je suis allé(e) — aller is a Motion verb, ALWAYS être' },
        { instruction: 'Irregular participle:', question: 'faire →', answer: 'fait — J\u2019ai fait mes devoirs' },
        { instruction: 'Irregular participle:', question: 'voir →', answer: 'vu — J\u2019ai vu le film' },
        { instruction: 'Make it agree:', question: 'Elle ______ (partir) à huit heures.', answer: 'Elle est partie à huit heures. (être + partI + e for feminine)' },
        { instruction: 'Negative of:', question: 'J\u2019ai mangé du pain.', answer: 'Je n\u2019ai pas mangé de pain. (des/du → de in negatives)' },
        { instruction: 'Reflexive in passé composé:', question: 'Je ______ (se lever) à six heures.', answer: 'Je me suis levé(e) à six heures. (reflexive = être aux + agreement)' },
    ],

    translationPractice: [
        { en: 'I ate a pizza yesterday.', fr: 'J\u2019ai mangé une pizza hier.' },
        { en: 'She went to Paris last week.', fr: 'Elle est allée à Paris la semaine dernière.' },
        { en: 'We finished at five o\u2019clock.', fr: 'Nous avons fini à cinq heures.' },
        { en: 'Did you see the film?', fr: 'As-tu vu le film ?' },
        { en: 'They (fem) left early.', fr: 'Elles sont parties tôt.' },
        { en: 'I did not do my homework.', fr: 'Je n\u2019ai pas fait mes devoirs.' },
    ],

    reverseTranslation: [
        { fr: 'Elle est née en 1995.', en: 'She was born in 1995.' },
        { fr: 'Nous avons vu un film français.', en: 'We saw a French film.' },
        { fr: 'Il est parti très tôt ce matin.', en: 'He left very early this morning.' },
        { fr: 'Qu\u2019est-ce que tu as fait hier ?', en: 'What did you do yesterday?' },
    ],

    register: {
        informal: 'J\u2019ai mangé une pizza hier soir — c\u2019était trop bon ! (spoken: c\u2019était instead of il était)',
        neutral: 'Hier, j\u2019ai mangé au restaurant et ensuite je suis allé(e) au cinéma.',
        formal: 'La semaine dernière, j\u2019ai assisté à une conférence sur la francophonie. (assister à = formal "attend")',
    },

    culture: 'The passé composé is the EVERYDAY past tense — it is what you use to tell a friend what you did yesterday. The imparfait (next lecture) is for descriptions and habits. The passé simple (il mangea) exists only in literature — you will never need to speak it. In Quebec and parts of Africa, the passé composé can also describe ongoing past actions where France would use the imparfait — but for the TCF, stick to the standard division.',

    freeProduction: 'Write or record what you did yesterday (8–10 sentences), in order using d\u2019abord, ensuite, après, enfin. Guiding questions: What time did you wake up (je me suis réveillé(e) à…)? What did you eat for breakfast? Where did you go? Who did you see? What did you watch or read? What time did you go to bed?',

    miniTest: [
        { question: 'Which auxiliary does ALLER take?', options: ['avoir', 'être', 'faire', 'devoir'], answer: 'être — motion verb' },
        { question: 'Past participle of "faire"?', options: ['faisé', 'fait', 'faisu', 'fairé'], answer: 'fait' },
        { question: 'A woman says "I went" — she says…', options: ['Je suis allé', 'Je suis allée', 'J\u2019ai allé', 'J\u2019ai allée'], answer: 'Je suis allée — être + agreement' },
        { question: 'Negative of "J\u2019ai mangé du pain"?', options: ['Je n\u2019ai pas mangé du pain.', 'Je n\u2019ai pas mangé de pain.', 'Je ne ai mangé pas de pain.', 'Je n\u2019ai mangé pas du pain.'], answer: 'Je n\u2019ai pas mangé de pain.' },
        { question: 'Past participle of "prendre"?', options: ['prendé', 'prendu', 'pris', 'prenu'], answer: 'pris' },
    ],

    review: [
        'The avoir-expressions from A1 still use the PRESENT: j\u2019ai faim (not j\u2019ai eu faim — unless telling a story).',
        'Negation from A1 applies here too: ne + auxiliary + pas + de + noun — je n\u2019ai pas mangé de pain.',
    ],

    traps: [
        'Using avoir for motion verbs — aller, venir, partir, entrer, sortir, naître, mourir, rester ALL take être: je suis allé(e), je suis parti(e).',
        'Forgetting the -e agreement with être verbs: elle est allé → elle est alléE. The exam grades this.',
        'Making the participle agree with avoir (unless a preceding direct object): elle a mangé (no -e!) — but les pommes qu\u2019elle a mangées (+es because "les" comes before).',
        'Irregular participles: faire → fait (not fairé), voir → vu (not voyé), prendre → pris (not prendu), mettre → mis (not mettu).',
    ],

    homework: {
        intro: 'The passé composé in every section. Choose the right auxiliary, spell the participle correctly, and make the agreement with être.',
        translation: [
            { prompt: 'I ate at the restaurant yesterday.', answer: 'J\u2019ai mangé au restaurant hier.', alt: ["J'ai mangé au restaurant hier"], explanation: 'manger takes AVOIR. The participle mangé does NOT agree with the subject (no -e for a woman).' },
            { prompt: 'She went to Paris last week.', answer: 'Elle est allée à Paris la semaine dernière.', explanation: 'aller takes ÊTRE. The participle AGREES: allée (+e for feminine). La semaine dernière = last week.' },
            { prompt: 'We finished the work.', answer: 'Nous avons fini le travail.', explanation: 'finir is a regular -ir verb: fini. It takes AVOIR. No agreement with the subject.' },
            { prompt: 'They (masc) left early.', answer: 'Ils sont partis tôt.', explanation: 'partir takes ÊTRE. Masculine plural → partis (+s). For feminine: parties (+es).' },
            { prompt: 'Did you see the film?', answer: 'As-tu vu le film ?', alt: ["Est-ce que tu as vu le film ?"], explanation: 'voir → vu (irregular). Inversion: as-tu vu. The direct object (le film) comes AFTER, so no agreement.' },
            { prompt: 'She got up at six o\u2019clock.', answer: 'Elle s\u2019est levée à six heures.', explanation: 'Reflexive verbs ALWAYS take être. The participle agrees: levée (+e for feminine). For a man: levé.' },
            { prompt: 'I did not do my homework.', answer: 'Je n\u2019ai pas fait mes devoirs.', explanation: 'faire → fait (irregular). Negation wraps the auxiliary: n\u2019ai pas fait.' },
            { prompt: 'He was born in 1995.', answer: 'Il est né en 1995.', explanation: 'naître → né (irregular). Takes être. A woman: née. En + year for dates.' },
        ],
        blanks: [
            { prompt: 'J\u2019______ (manger) une pizza.', answer: 'ai mangé', alt: ["ai mangé"], explanation: 'avoir auxiliary (j\u2019ai) + past participle mangé. No agreement with avoir.' },
            { prompt: 'Elle ______ (aller) au marché.', answer: 'est allée', explanation: 'aller takes être. Feminine subject → allée (+e).' },
            { prompt: 'Nous ______ (finir) le travail.', answer: 'avons fini', explanation: 'finir takes avoir. Regular -ir → -i. nous avons fini.' },
            { prompt: 'Ils ______ (partir) tôt.', answer: 'sont partis', explanation: 'partir takes être. Masculine plural → partis (+s).' },
            { prompt: 'Tu ______ (faire) tes devoirs ?', answer: 'as fait', explanation: 'faire → fait (irregular participle). avoir auxiliary: tu as fait.' },
            { prompt: 'Elle ______ (se lever) à six heures.', answer: 's\u2019est levée', explanation: 'Reflexive verbs take être. The participle agrees: levée (+e for feminine).' },
        ],
        corrections: [
            { prompt: 'J\u2019ai allé au cinéma.', answer: 'Je suis allé(e) au cinéma.', explanation: 'How the mistake happens: applying avoir to every verb. Why it does not work: aller is a MOTION verb — it ALWAYS takes être. How to fix it: je suis allé (masc) / je suis allée (fem). Memorize the 16 être verbs.' },
            { prompt: 'Elle est allé au cinéma.', answer: 'Elle est allée au cinéma.', explanation: 'How the mistake happens: forgetting the agreement. Why it does not work: with être, the participle AGREES with the subject — elle is feminine → allée (+e). How to fix it: check the subject\u2019s gender before writing the participle.' },
            { prompt: 'Elle a mangéE la pizza.', answer: 'Elle a mangé la pizza.', explanation: 'How the mistake happens: over-applying agreement. Why it does not work: with AVOIR, the participle does NOT agree with the subject. How to fix it: no agreement unless a preceding DIRECT object (la pizza qu\u2019elle a mangée).' },
            { prompt: 'J\u2019ai prendu le train.', answer: 'J\u2019ai pris le train.', explanation: 'How the mistake happens: assuming all participles end in -é or -u. Why it does not work: prendre → pris is IRREGULAR. How to fix it: memorize the irregular participles: faire → fait, voir → vu, prendre → pris, mettre → mis, dire → dit.' },
            { prompt: 'Il a parti à huit heures.', answer: 'Il est parti à huit heures.', explanation: 'How the mistake happens: same as "j\u2019ai allé" — using avoir for everything. Why it does not work: partir is a MOTION verb → être. How to fix it: il est parti. The 16 être verbs: aller, venir, partir, sortir, entrer, arriver, retourner, rester, naître, mourir, descendre, monter, tomber, passer, devenir, revenir.' },
        ],
        writing: {
            task: 'Write what you did last weekend (8–10 sentences) using the passé composé throughout. Use at least two être verbs (aller, partir, rester…), two irregular participles (fait, vu, pris…), one reflexive verb (je me suis levé(e)…), and sequence words (d\u2019abord, ensuite, après, enfin).',
            requirements: [
                'At least two être verbs with correct agreement',
                'At least two irregular participles',
                'One reflexive verb with agreement',
                'Sequence words (d\u2019abord, ensuite, après, enfin)',
                'One negative (je n\u2019ai pas…)',
            ],
            minWords: 60,
        },
        checklist: [
            'I choose avoir or être correctly for every verb',
            'I know the irregular participles: fait, vu, pris, mis, dit, écrit, été, eu',
            'I make the agreement with être: allée (fem), partis (masc pl), allées (fem pl)',
            'I do NOT make the participle agree with avoir (unless preceding direct object)',
            'I can form the negative: je n\u2019ai pas mangé de pain (des → de)',
            'I can tell a story about my weekend in the passé composé out loud',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'The 16 être verbs: aller, venir, partir, sortir, entrer, arriver, retourner, rester, naître, mourir, descendre, monter, tomber, passer, devenir, revenir. These are MOTION or CHANGE-OF-STATE verbs. ALL reflexive verbs also take être. Everything else takes avoir.',
                examples: [
                    { fr: 'Je suis allé(e) · Je suis parti(e) · Je me suis levé(e)', en: 'I went · I left · I got up — all use être + agreement' },
                ],
            },
            {
                explanation: 'Regular participles: -ER verbs → -é (mangé), -IR verbs → -i (fini), -RE verbs → -u (vendu). The participle looks like the past participle in English: mangé = eaten, fini = finished, vendu = sold.',
                examples: [
                    { fr: 'parler → parlé · finir → fini · vendre → vendu', en: 'the three regular patterns' },
                ],
            },
            {
                explanation: 'The agreement rule: with ÊTRE, the participle acts like an ADJECTIVE — it agrees with the subject. With AVOIR, it does NOT agree with the subject (unless a preceding direct object).',
                examples: [
                    { fr: 'Elle est allée. (fem +e) · Ils sont partis. (masc pl +s)', en: 'agreement with être' },
                    { fr: 'Elle a mangé. (no +e with avoir!)', en: 'no agreement with avoir' },
                ],
            },
            {
                explanation: 'Irregular participles you MUST memorize: faire → fait, voir → vu, prendre → pris, mettre → mis, dire → dit, écrire → écrit, être → été, avoir → eu, lire → lu, ouvrir → ouvert, pouvoir → pu, vouloir → voulu, devoir → dû, savoir → su, recevoir → reçu, vivre → vécu.',
                examples: [
                    { fr: 'J\u2019ai fait mes devoirs · J\u2019ai vu le film · J\u2019ai pris le train', en: 'I did my homework · I saw the film · I took the train' },
                ],
            },
            {
                explanation: 'The negative de rule still applies in the passé composé: the ne…pas wraps the AUXILIARY, and un/une/des become de: j\u2019ai mangé du pain → je n\u2019ai pas mangé de pain.',
                examples: [
                    { fr: 'J\u2019ai mangé du pain. → Je n\u2019ai pas mangé de pain.', en: 'the partitive becomes de in negatives' },
                ],
            },
            {
                explanation: 'In questions, the auxiliary inverts (not the participle): as-tu vu ? est-elle allée ? avez-vous fini ? The participle stays at the end.',
                examples: [
                    { fr: 'As-tu vu le film ? — Oui, je l\u2019ai vu hier.', en: 'Did you see the film? — Yes, I saw it yesterday.' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'mangé': { en: 'eaten (past participle of manger)', pron: 'mahn-ZHAY', type: 'verb', register: 'neutral' },
        'allé': { en: 'gone / went (masc — past participle of aller)', pron: 'zah-LAY', type: 'verb', register: 'neutral', note: 'agrees with être: allée, allés, allées' },
        'allée': { en: 'gone / went (fem)', pron: 'zah-LAY', type: 'verb', register: 'neutral' },
        'fait': { en: 'done / made (past participle of faire)', pron: 'feh', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'vu': { en: 'seen (past participle of voir)', pron: 'voo', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'pris': { en: 'taken (past participle of prendre)', pron: 'pree', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'parti': { en: 'left (past participle of partir)', pron: 'pahr-TEE', type: 'verb', register: 'neutral' },
        'partie': { en: 'left (fem — past participle of partir)', pron: 'pahr-TEE', type: 'verb', register: 'neutral' },
        'fini': { en: 'finished (past participle of finir)', pron: 'fee-NEE', type: 'verb', register: 'neutral', note: 'regular -ir → -i' },
        'mis': { en: 'put / put on (past participle of mettre)', pron: 'mee', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'dit': { en: 'said (past participle of dire)', pron: 'dee', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'écrit': { en: 'written (past participle of écrire)', pron: 'ay-KREE', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'été': { en: 'been (past participle of être)', pron: 'ay-TAY', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'eu': { en: 'had (past participle of avoir)', pron: 'oo', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'lu': { en: 'read (past participle of lire)', pron: 'loo', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'ouvert': { en: 'opened (past participle of ouvrir)', pron: 'oo-VEHR', type: 'verb', register: 'neutral', note: 'IRREGULAR' },
        'voulu': { en: 'wanted (past participle of vouloir)', pron: 'voo-LOO', type: 'verb', register: 'neutral' },
        'pouvu': { en: 'been able (past participle of pouvoir)', pron: 'poo-VOO', type: 'verb', register: 'neutral' },
        'dû': { en: 'had to (past participle of devoir)', pron: 'doo', type: 'verb', register: 'neutral', note: 'circumflex!' },
        'su': { en: 'known (past participle of savoir)', pron: 'soo', type: 'verb', register: 'neutral' },
        'reçu': { en: 'received (past participle of recevoir)', pron: 'ruh-SEW', type: 'verb', register: 'neutral' },
        'vécu': { en: 'lived (past participle of vivre)', pron: 'vay-SEW', type: 'verb', register: 'neutral' },
        'hier soir': { en: 'last night', register: 'neutral' },
        'semaine dernière': { en: 'last week', gender: 'feminine', register: 'neutral' },
        'année dernière': { en: 'last year', gender: 'feminine', register: 'neutral' },
        'est allé': { en: 'went (he — être + aller)', pron: 'eh-tah-LAY', type: 'verb', register: 'neutral' },
        'est allée': { en: 'went (she — être + aller + e)', pron: 'eh-tah-LAY', type: 'verb', register: 'neutral' },
        'sont partis': { en: 'they left (masc — être + partir)', pron: 'sohn pahr-TEE', type: 'verb', register: 'neutral' },
        'nées': { en: 'born (fem pl — from naître)', register: 'neutral' },
        'cinéma': { en: 'cinema / movie theater', gender: 'masculine', register: 'neutral' },
        'devoirs': { en: 'homework', gender: 'masculine', register: 'neutral', note: 'always plural in French' },
        'assisté': { en: 'attended (from assister à)', pron: 'ah-see-STEY', type: 'verb', register: 'formal' },
        'conférence': { en: 'conference / lecture', gender: 'feminine', register: 'neutral' },
    },
};

// ── A2 · Imparfait ───────────────────────────────────────────────────────────
const a2Imparfait: StaticFrenchLesson = {
    title: 'Imparfait',
    objective: 'Describe the past — habits, ongoing situations, backgrounds, and childhood memories — using the imparfait. Know when to use imparfait vs passé composé, the classic TCF challenge.',

    vocabulary: [
        { fr: 'quand j\u2019étais petit(e)', en: 'when I was little', pron: 'kahn zhay-TEH puh-TEE', type: 'phrase', register: 'neutral', example: { fr: 'Quand j\u2019étais petit, je jouais dehors.', en: 'When I was little, I played outside.' }, related: [{ fr: 'enfant', en: 'child' }] },
        { fr: 'je jouais', en: 'I used to play', pron: 'zhoo ZHOO-WEH', type: 'verb', register: 'neutral', example: { fr: 'Je jouais au foot tous les jours.', en: 'I used to play football every day.' }, related: [{ fr: 'jouer', en: 'to play' }] },
        { fr: 'nous habitions', en: 'we used to live', pron: 'noo zah-BEE-tyohn', type: 'verb', register: 'neutral', example: { fr: 'Nous habitions à Marseille.', en: 'We used to live in Marseille.' }, related: [{ fr: 'habiter', en: 'to live' }] },
        { fr: 'c\u2019était', en: 'it was', pron: 'say-TEH', type: 'verb', register: 'neutral', example: { fr: 'C\u2019était génial !', en: 'It was great!' }, related: [{ fr: 'c\u2019était très bon', en: 'it was very good' }] },
        { fr: 'd\u2019habitude', en: 'usually', pron: 'dah-bee-TEWD', register: 'neutral', example: { fr: 'D\u2019habitude, je me couchais tard.', en: 'Usually I used to go to bed late.' }, related: [{ fr: 'toujours', en: 'always' }] },
        { fr: 'le week-end', en: 'the weekend / on weekends', pron: 'luh wee-KEND', gender: 'masculine', register: 'neutral', example: { fr: 'Le week-end, nous allions à la plage.', en: 'On weekends we used to go to the beach.' }, related: [{ fr: 'la plage', en: 'the beach' }] },
        { fr: 'il y avait', en: 'there was / there were', pron: 'eel yah-VEH', type: 'verb', register: 'neutral', example: { fr: 'Il y avait beaucoup d\u2019enfants.', en: 'There were a lot of children.' }, related: [{ fr: 'il y a', en: 'there is/are (present)' }] },
        { fr: 'je pensais', en: 'I thought / I was thinking', pron: 'zhuh pahn-SEH', type: 'verb', register: 'neutral', example: { fr: 'Je pensais que c\u2019était facile.', en: 'I thought it was easy.' }, related: [{ fr: 'penser', en: 'to think' }] },
        { fr: 'il pleuvait', en: 'it was raining', pron: 'eel pluh-VEH', type: 'verb', register: 'neutral', example: { fr: 'Il pleuvait tous les jours.', en: 'It rained every day.' }, related: [{ fr: 'la pluie', en: 'the rain' }] },
        { fr: 'je lisais', en: 'I used to read', pron: 'zhuh lee-ZEH', type: 'verb', register: 'neutral', example: { fr: 'Je lisais beaucoup de livres.', en: 'I used to read a lot of books.' }, related: [{ fr: 'lire', en: 'to read' }] },
        { fr: 'toujours', en: 'always / still', pron: 'too-ZHOOR', register: 'neutral', example: { fr: 'Il était toujours en retard.', en: 'He was always late.' }, related: [{ fr: 'jamais', en: 'never (ne…jamais)' }] },
        { fr: 'souvent', en: 'often', pron: 'soo-VAHN', register: 'neutral', example: { fr: 'Nous allions souvent au parc.', en: 'We often went to the park.' }, related: [{ fr: 'de temps en temps', en: 'from time to time' }] },
    ],

    pronunciation: [
        { fr: 'je jouais', approx: 'zhoo zhoo-WEH', en: 'the imparfait -ais sounds like "eh" — NOT "ay"' },
        { fr: 'nous finissions', approx: 'noo fee-nee-SOHN', en: 'the imparfait nous form doubles the i for -ir verbs: fini + ssions' },
        { fr: 'c\u2019était', approx: 'say-TEH', en: 'the only irregular imparfait — from être: était' },
        { fr: 'il pleuvait', approx: 'eel pluh-VEH', en: 'pleuvoir is only used impersonally: il pleuvait' },
        { fr: 'ils jouaient', approx: 'eel zhoo-WEH', en: 'the -aient ending is silent — sounds the same as je jouais' },
        { fr: 'nous étions', approx: 'noo zay-TYOHN', en: 'être imparfait: j\u2019étais, tu étais, il était, nous étions, vous étiez, ils étaient' },
    ],

    grammar: {
        rule: 'The imparfait is ONE stem (the nous present form minus -ons) + ONE set of endings: -ais, -ais, -ait, -ions, -iez, -aient. The ONLY irregular verb is être → ét-. It describes habits, backgrounds, and ongoing past situations.',
        explanation: 'The imparfait is the easiest tense to FORM — take the nous present form, drop -ons, add the endings. parler → nous parlons → parl- → je parlais. Even irregular verbs use their nous stem: boire → nous buvons → buv- → je buvais. The ONLY exception is être → ét- (j\u2019étais). The hard part is knowing WHEN to use it: imparfait for ongoing, habitual, or descriptive past actions (it was raining, I used to play, she was tall); passé composé for completed, one-time events (I ate, she left). Think of it this way: imparfait paints the BACKGROUND, passé composé takes the PHOTO.',
        examples: [
            { fr: 'Quand j\u2019étais petit, je jouais au foot tous les jours.', en: 'When I was little, I used to play football every day.', breakdown: ['quand j\u2019étais = when I was', 'petit = little', 'je jouais = I used to play (habitual)', 'tous les jours = every day'] },
            { fr: 'Il pleuvait et nous restions à la maison.', en: 'It was raining and we were staying home.', breakdown: ['il pleuvait = it was raining (background)', 'nous restions = we were staying (ongoing)'] },
            { fr: 'Ma grand-mère faisait toujours des gâteaux.', en: 'My grandmother was always making cakes.', breakdown: ['ma grand-mère = my grandmother', 'faisait = was making (faire → fais- + ait)', 'toujours = always'] },
            { fr: 'Il y avait un grand jardin derrière la maison.', en: 'There was a big garden behind the house.', breakdown: ['il y avait = there was', 'un grand jardin = a big garden', 'derrière = behind'] },
            { fr: 'Nous étions très contents quand nous avons eu les résultats.', en: 'We were very happy when we got the results.', breakdown: ['nous étions = we were (description)', 'très contents = very happy', 'nous avons eu = we got (event — passé composé!)'] },
            { fr: 'Je lisais un livre quand le téléphone a sonné.', en: 'I was reading a book when the phone rang.', breakdown: ['je lisais = I was reading (ongoing — imparfait)', 'quand = when', 'le téléphone a sonné = the phone rang (event — passé composé!)'] },
        ],
        commonMistakes: [
            'Using imparfait for a completed event: "J\u2019ai mangé une pizza" (done, over) vs "Je mangeais de la pizza tous les jours" (habit).',
            'Forgetting that être is the ONLY irregular imparfait: je était → j\u2019étais. All other verbs use their nous stem.',
            'Doubling letters that should not be doubled: je mangeais (from mange + ais), not je mangais.',
            'Using imparfait after quand for the EVENT: "Quand le téléphone a sonné" — the interruption is passé composé; the ongoing action is imparfait.',
        ],
    },

    transformations: [
        { type: 'Present', fr: 'Je joue au foot.', en: 'I play football.' },
        { type: 'Imparfait (habit)', fr: 'Je jouais au foot tous les jours.', en: 'I used to play football every day.' },
        { type: 'Imparfait (ongoing)', fr: 'Je lisais un livre.', en: 'I was reading a book.' },
        { type: 'Negative', fr: 'Je ne jouais pas au foot.', en: 'I did not play football.' },
        { type: 'Passé composé (event)', fr: 'J\u2019ai joué au foot hier.', en: 'I played football yesterday (one time).' },
        { type: 'Imparfait + PC combo', fr: 'Je lisais quand tu as téléphoné.', en: 'I was reading when you phoned.' },
        { type: 'Description', fr: 'Il faisait beau et il y avait beaucoup de monde.', en: 'The weather was nice and there were a lot of people.' },
        { type: 'With toujours', fr: 'Elle oubliait toujours ses clés.', en: 'She was always forgetting her keys.' },
    ],

    sentenceBuilding: [
        { fr: 'Quand j\u2019étais petit, je jouais au foot.', en: 'When I was little, I used to play football.' },
        { fr: 'Quand j\u2019étais petit, je jouais au foot tous les jours avec mes amis.', en: 'When I was little, I used to play football every day with my friends.' },
        { fr: 'Quand j\u2019étais petit, nous habitions à Lyon et je jouais au foot tous les jours.', en: 'When I was little, we lived in Lyon and I used to play football every day.' },
        { fr: 'Quand j\u2019étais petit, nous habitions à Lyon. Il y avait un grand parc et je jouais au foot tous les jours avec mes copains.', en: 'When I was little, we lived in Lyon. There was a big park and I used to play football every day with my friends.' },
        { fr: 'Quand j\u2019étais petit, nous habitions à Lyon. Il y avait un grand parc derrière notre immeuble et j\u2019y jouais au foot tous les jours avec mes copains de l\u2019école.', en: 'When I was little, we lived in Lyon. There was a big park behind our building and I used to play football there every day with my school friends.' },
    ],

    practice: [
        { instruction: 'Conjugate imparfait:', question: 'Je ______ (jouer) au tennis.', answer: 'jouais — jou- + ais' },
        { instruction: 'Irregular imparfait:', question: 'Je ______ (être) content.', answer: 'étais — the ONLY irregular imparfait verb' },
        { instruction: 'Conjugate from nous stem:', question: 'Nous ______ (boire) du lait.', answer: 'buvions — nous buvons → buv- + ions' },
        { instruction: 'Choose the tense:', question: 'Hier, il ______ (pleuvoir) toute la journée.', answer: 'pleuvait — ongoing, all day = imparfait' },
        { instruction: 'Choose the tense:', question: 'Le téléphone ______ (sonner) pendant que je dormais.', answer: 'a sonné — the interruption is passé composé; dormais is imparfait' },
        { instruction: 'Make it negative:', question: 'Il faisait beau.', answer: 'Il ne faisait pas beau. (ne wraps faisait)' },
    ],

    translationPractice: [
        { en: 'When I was little, I used to play outside.', fr: 'Quand j\u2019étais petit(e), je jouais dehors.' },
        { en: 'It was raining and we were at home.', fr: 'Il pleuvait et nous étions à la maison.' },
        { en: 'My grandmother was always making cakes.', fr: 'Ma grand-mère faisait toujours des gâteaux.' },
        { en: 'There were a lot of people.', fr: 'Il y avait beaucoup de monde.' },
        { en: 'I was reading when the phone rang.', fr: 'Je lisais quand le téléphone a sonné.' },
        { en: 'We used to go to the beach every summer.', fr: 'Nous allions à la plage tous les étés.' },
    ],

    reverseTranslation: [
        { fr: 'Quand j\u2019étais petit, nous habitions à Lyon.', en: 'When I was little, we lived in Lyon.' },
        { fr: 'C\u2019était magnifique !', en: 'It was magnificent!' },
        { fr: 'Il faisait très chaud.', en: 'It was very hot.' },
        { fr: 'Je pensais que tu étais malade.', en: 'I thought you were sick.' },
    ],

    register: {
        informal: 'C\u2019était trop bien ! On jouait au foot tous les jours. (spoken: c\u2019était instead of il était)',
        neutral: 'Quand j\u2019étais petit, nous habitions à Lyon et je jouais au foot tous les jours.',
        formal: 'À l\u2019époque, la vie était plus simple. Les enfants passaient leurs journées à l\u2019extérieur. (formal description uses imparfait throughout)',
    },

    culture: 'French storytelling uses the imparfait to set every scene — "Il était une fois" (once upon a time) is how every fairy tale starts. The imparfait vs passé composé distinction is THE grammar challenge of A2/B1 — it is what separates beginners from intermediate speakers. Master the concept: imparfait = the film set (lights, weather, mood, what was happening), passé composé = the action shots (what happened, what interrupted).',

    freeProduction: 'Write or record a childhood memory (8–10 sentences). Guiding questions: Where did you live when you were little (nous habitions…)? What did you used to do after school (je jouais, je regardais…)? What was the weather usually like (il faisait…)? Who was your best friend and what were they like (il était…)? What was one specific thing that happened one day (passé composé)?',

    miniTest: [
        { question: 'The imparfait stem comes from…', options: ['the je form', 'the ils form', 'the nous form minus -ons', 'the infinitive'], answer: 'the nous form minus -ons' },
        { question: 'Which verb is IRREGULAR in the imparfait?', options: ['parler', 'finir', 'être', 'boire'], answer: 'être — j\\u2019étais' },
        { question: 'Choose the tense: "The phone rang while I was reading."', options: ['Both imparfait', 'Both passé composé', 'Reading = imparfait, rang = PC', 'Reading = PC, rang = imparfait'], answer: 'Reading = imparfait, rang = PC' },
        { question: 'Imparfait of "nous buvons"?', options: ['nous buvions', 'nous buvions', 'nous buvions', 'nous buvions'], answer: 'nous buvions — buv- + ions' },
        { question: '"Il était une fois" is used for…', options: ['telling time', 'starting a fairy tale', 'talking about the future', 'giving orders'], answer: 'starting a fairy tale (once upon a time)' },
    ],

    review: [
        'The passé composé from last lecture pairs with the imparfait: imparfait paints the background, PC takes the photo.',
        'Time expressions from A1 still work: le lundi (habitual → imparfait), hier (event → passé composé).',
    ],

    traps: [
        'Using imparfait for a one-time completed event: "J\u2019ai mangé une pizza" (PC — done) vs "Je mangeais de la pizza tous les jours" (imparfait — habit).',
        'Writing "je était" instead of "j\u2019étais" — être is the ONLY irregular imparfait. Everything else uses the nous stem.',
        'Forgetting the double s in -ger and -cer nous forms in imparfait: nous mangions (not mangions — the i comes from the imparfait ending, not the stem).',
        'Mixing imparfait and PC in the wrong places after quand: "Quand je suis arrivé, il pleuvait" — the arrival is PC (event), the rain is imparfait (ongoing background).',
    ],

    homework: {
        intro: 'Imparfait formation is easy — the USE is the challenge. Write the correct form AND know why it is imparfait (habit? description? ongoing?) vs passé composé (completed event?).',
        translation: [
            { prompt: 'When I was little, I played outside every day.', answer: 'Quand j\u2019étais petit(e), je jouais dehors tous les jours.', explanation: 'étais = imparfait of être (irregular). jouais = habitual action → imparfait. tous les jours confirms the habit.' },
            { prompt: 'It was raining when I left.', answer: 'Il pleuvait quand je suis parti(e).', explanation: 'pleuvait = ongoing background (imparfait). je suis parti = the one-time event of leaving (passé composé). The combo is the classic pattern.' },
            { prompt: 'My grandmother was always making cakes.', answer: 'Ma grand-mère faisait toujours des gâteaux.', explanation: 'faisait = imparfait (faire → fais- + ait). toujours confirms the habitual action.' },
            { prompt: 'There was a big garden behind the house.', answer: 'Il y avait un grand jardin derrière la maison.', explanation: 'il y avait = imparfait of il y a. Descriptions of what existed → imparfait.' },
            { prompt: 'We were very happy when we received the results.', answer: 'Nous étions très contents quand nous avons reçu les résultats.', explanation: 'étions = description (how we felt — imparfait). avons reçu = the specific event (passé composé).' },
            { prompt: 'They used to live in Lyon.', answer: 'Ils habitaient à Lyon.', alt: ["Elles habitaient à Lyon"], explanation: 'habitaient = imparfait (habit- + aient). A past habit or living situation.' },
            { prompt: 'I was reading when she arrived.', answer: 'Je lisais quand elle est arrivée.', explanation: 'lisais = ongoing action (imparfait). est arrivée = the interruption (PC, with être + agreement).' },
            { prompt: 'The weather was beautiful every summer.', answer: 'Il faisait très beau tous les étés.', explanation: 'faisait = imparfait of faire (weather expression). tous les étés confirms the habit.' },
        ],
        blanks: [
            { prompt: 'Quand j\u2019étais petit, je ______ (jouer) au foot.', answer: 'jouais', explanation: 'jou- + ais = jouais. Habitual past action → imparfait.' },
            { prompt: 'Nous ______ (habiter) à Lyon quand nous étions jeunes.', answer: 'habitions', explanation: 'habit- + ions = habitions. Past living situation → imparfait.' },
            { prompt: 'Il ______ (pleuvoir) quand nous sommes sortis.', answer: 'pleuvait', explanation: 'pleuvait = ongoing weather (imparfait) vs sommes sortis = event (PC).' },
            { prompt: 'Je ______ (être) très content.', answer: 'étais', explanation: 'être is the ONLY irregular imparfait: j\u2019étais, tu étais, il était…' },
            { prompt: 'Elle ______ (lire) un livre quand je suis arrivé.', answer: 'lisait', explanation: 'lisais = was reading (ongoing — imparfait). suis arrivé = the interruption (PC).' },
            { prompt: 'Il y ______ beaucoup de monde.', answer: 'avait', explanation: 'il y avait = there was/were. Always imparfait for describing what existed.' },
        ],
        corrections: [
            { prompt: 'Quand j\u2019étais petit, j\u2019ai joué au foot tous les jours.', answer: 'Quand j\u2019étais petit, je jouais au foot tous les jours.', explanation: 'How the mistake happens: "tous les jours" feels like a completed period. Why it does not work: "tous les jours" signals a HABIT — repeated, not one-time. Habits use imparfait. How to fix it: look for frequency words (toujours, souvent, tous les jours, d\u2019habitude) — they signal imparfait.' },
            { prompt: 'Je était très content.', answer: 'J\u2019étais très content.', explanation: 'How the mistake happens: applying the regular imparfait pattern to être. Why it does not work: être is the ONLY irregular imparfait — it does not use the nous stem. How to fix it: memorize j\\u2019étais, tu étais, il était, nous étions, vous étiez, ils étaient.' },
            { prompt: 'Il pleuvait et il a fait froid.', answer: 'Il pleuvait et il faisait froid.', explanation: 'How the mistake happens: using PC for weather. Why it does not work: weather is BACKGROUND description — it was already raining and cold. How to fix it: weather, feelings, and descriptions are imparfait. Save PC for the event.' },
            { prompt: 'Je mangeais une pizza hier soir.', answer: 'J\u2019ai mangé une pizza hier soir.', explanation: 'How the mistake happens: over-using imparfait. Why it does not work: "hier soir" pinpoints a SPECIFIC completed meal — that is a one-time event → PC. How to fix it: specific time + completed action = PC. Habitual + ongoing = imparfait.' },
            { prompt: 'Nous avons habités à Lyon.', answer: 'Nous avons habité à Lyon.', explanation: 'How the mistake happens: adding agreement with avoir. Why it does not work: with AVOIR, the participle does NOT agree with the subject. How to fix it: nous avons habité — no -s. (But with être: nous sommes allés — agreement!)' },
        ],
        writing: {
            task: 'Write a childhood memory (8–10 sentences) using BOTH imparfait and passé composé. Use imparfait for the background (where you lived, what the weather was like, what you used to do) and passé composé for the specific event that happened one day (the day something memorable happened).',
            requirements: [
                'At least four imparfait verbs (étais, jouais, habitait, il y avait…)',
                'At least three passé composé verbs (j\u2019ai mangé, je suis allé…)',
                'At least one imparfait + PC combo (je lisais quand… a sonné)',
                'Time markers: quand j\u2019étais petit(e), tous les jours, un jour',
                'One weather description (il faisait… / il pleuvait)',
            ],
            minWords: 65,
        },
        checklist: [
            'I form the imparfait from the nous stem + -ais/-ais/-ait/-ions/-iez/-aient',
            'I know être is the ONLY irregular imparfait: j\\u2019étais (never je était)',
            'I use imparfait for habits, descriptions, and ongoing past actions',
            'I use passé composé for one-time completed events',
            'I can combine both: je lisais quand le téléphone a sonné',
            'I can tell a childhood story using both tenses out loud',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'The imparfait formation: take the NOUS present form, drop -ons, add the endings. parler → nous parlons → parl- → je parlais. Even irregular verbs use this rule: boire → nous buvons → buv- → je buvais. The ONLY exception: être → ét-.',
                examples: [
                    { fr: 'nous finissons → je finissais · nous prenons → je prenais · nous lisons → je lisais', en: 'the nous-stem rule works for ALL verbs except être' },
                ],
            },
            {
                explanation: 'The imparfait endings are ALWAYS the same: -ais, -ais, -ait, -ions, -iez, -aient. No exceptions (except the stem of être). And -ions/-iez/-aient are ALL pronounced.',
                examples: [
                    { fr: 'je mangeais · tu mangeais · il mangeait · nous mangions · vous mangiez · ils mangeaient', en: 'one set of endings for every verb' },
                ],
            },
            {
                explanation: 'The core distinction: IMPARFAIT = the film set (background, weather, what was happening, what used to happen). PASSÉ COMPOSÉ = the action shot (what happened, what interrupted, the specific event). Every story needs both.',
                examples: [
                    { fr: 'Il pleuvait (imparfait — background) quand je suis sorti (PC — action).', en: 'It was raining when I went out.' },
                ],
            },
            {
                explanation: 'Frequency words signal imparfait: toujours (always), souvent (often), tous les jours (every day), d\\u2019habitude (usually), de temps en temps (from time to time), ne…jamais (never). These describe REPEATED actions → imparfait.',
                examples: [
                    { fr: 'Nous allions souvent à la plage. · Il oubliait toujours ses clés.', en: 'We often went to the beach. · He always forgot his keys.' },
                ],
            },
            {
                explanation: 'Imparfait for DESCRIPTIONS of people, places, weather, and feelings in the past: il faisait chaud, elle était belle, il y avait beaucoup de monde, je pensais que…. These are not actions — they are the scene.',
                examples: [
                    { fr: 'Il faisait très chaud. La mer était calme. Mes parents se reposaient.', en: 'It was very hot. The sea was calm. My parents were resting.' },
                ],
            },
            {
                explanation: 'The combo pattern is the exam classic: imparfait (ongoing) + quand + passé composé (interruption). The imparfait action was in progress; the PC action cut it short.',
                examples: [
                    { fr: 'Je dormais quand tu as téléphoné. · Elle cuisinait quand il est arrivé.', en: 'I was sleeping when you phoned. · She was cooking when he arrived.' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'étais': { en: 'was (je — imparfait of être)', pron: 'ay-TEH', type: 'verb', register: 'neutral', note: 'the ONLY irregular imparfait' },
        'étais petit': { en: 'when I was little (masc)', register: 'neutral' },
        'jouais': { en: 'used to play (imparfait of jouer)', pron: 'zhoo-WEH', type: 'verb', register: 'neutral' },
        'habitions': { en: 'used to live (imparfait of habiter)', pron: 'zah-BEE-tyohn', type: 'verb', register: 'neutral' },
        'c\\u2019était': { en: 'it was', pron: 'say-TEH', type: 'verb', register: 'neutral', note: 'c\u2019est in the past' },
        'pleuvait': { en: 'was raining (imparfait of pleuvoir)', pron: 'pluh-VEH', type: 'verb', register: 'neutral', note: 'impersonal — only il pleuvait' },
        'lisais': { en: 'was reading (imparfait of lire)', pron: 'lee-ZEH', type: 'verb', register: 'neutral' },
        'pensais': { en: 'was thinking / thought', pron: 'pahn-SEH', type: 'verb', register: 'neutral' },
        'faisait': { en: 'was making / was doing', pron: 'fuh-ZEH', type: 'verb', register: 'neutral' },
        'faisait beau': { en: 'was nice weather', register: 'neutral', note: 'faire for weather: il faisait beau/chaud/froid' },
        'il y avait': { en: 'there was / there were', pron: 'eel yah-VEH', type: 'verb', register: 'neutral' },
        'rester': { en: 'to stay / remain', register: 'neutral', note: 'être verb in passé composé!' },
        'la plage': { en: 'the beach', gender: 'feminine', register: 'neutral' },
        'derrière': { en: 'behind', register: 'neutral' },
        'immeuble': { en: 'building', gender: 'masculine', register: 'neutral' },
        'copains': { en: 'friends (informal)', gender: 'masculine', register: 'informal' },
        'résultats': { en: 'results', gender: 'masculine', register: 'neutral' },
        'magnifique': { en: 'magnificent', register: 'neutral' },
        'malade': { en: 'sick / ill', register: 'neutral', note: 'same for both genders' },
        'jouer au foot': { en: 'to play football', register: 'neutral', note: 'jouer À for sports' },
        'tous les étés': { en: 'every summer', register: 'neutral' },
        'de temps en temps': { en: 'from time to time', register: 'neutral' },
        'il faisait chaud': { en: 'it was hot (weather)', register: 'neutral' },
        'la mer': { en: 'the sea', gender: 'feminine', register: 'neutral' },
    },
};

export const STATIC_A2_PART1: Record<string, StaticFrenchLesson> = {
    'A2:passe-compose': a2PasseCompose,
    'A2:imparfait': a2Imparfait,
};
