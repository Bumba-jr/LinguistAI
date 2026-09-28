// C1 lectures part 1 — Idioms & Register Control, Synthesis & Critical Reading,
// Formal Speaking & Debate. Same gold-standard format: full lesson + traps +
// homework (A–E) + checklistRemedial + glossary. Extras in frenchLessonExtras.ts.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── C1 · Idioms & Register Control ──────────────────────────────────────────
const c1Idiomes: StaticFrenchLesson = {
    title: 'Idioms & Register Control',
    objective: 'Use the high-frequency idioms real speakers reach for (poser un lapin, en faire tout un fromage, tomber dans les pommes), read understatement and irony as a native does, and calibrate the register of every sentence to the person in front of you.',

    vocabulary: [
        { fr: 'poser un lapin', en: 'to stand someone up (not show up)', pron: 'poh-ZAY uhn lah-PAN', type: 'expression', register: 'informal', example: { fr: 'Elle m\u2019a posé un lapin hier soir.', en: 'She stood me up last night.' }, related: [{ fr: 'ne pas venir', en: 'not to come (plain)' }] },
        { fr: 'en faire tout un fromage', en: 'to make a big deal of nothing', pron: 'ahn fehr too tuhn fro-MAHZH', type: 'expression', register: 'informal', example: { fr: 'Ce n\u2019est qu\u2019un retard, n\u2019en fais pas tout un fromage !', en: 'It\u2019s just a delay, don\u2019t make a fuss!' }, related: [{ fr: 'exagérer', en: 'to exaggerate (plain)' }] },
        { fr: 'tomber dans les pommes', en: 'to faint / pass out', pron: 'tohn-BAY dahn lay POM', type: 'expression', register: 'informal', example: { fr: 'De chaleur, elle est tombée dans les pommes.', en: 'From the heat, she passed out.' }, related: [{ fr: 's\u2019évanouir', en: 'to faint (neutral)' }] },
        { fr: 'coûter les yeux de la tête', en: 'to cost an arm and a leg', pron: 'koo-TAY layz YUH duh lah TET', type: 'expression', register: 'neutral', example: { fr: 'Ce voyage m\u2019a coûté les yeux de la tête.', en: 'That trip cost me an arm and a leg.' }, related: [{ fr: 'être hors de prix', en: 'to be exorbitantly expensive' }] },
        { fr: 'avoir le coup de foudre', en: 'love at first sight', pron: 'ah-VWAIR luh koo duh FOOD-ruh', type: 'expression', register: 'neutral', example: { fr: 'Pour cette ville, ce fut le coup de foudre.', en: 'For this city, it was love at first sight.' }, related: [{ fr: 'craquer pour', en: 'to fall for (casual)' }] },
        { fr: 'avoir d\u2019autres chats à fouetter', en: 'to have bigger fish to fry', pron: 'ah-VWAIR doh-truh shah ah fwah-TAY', type: 'expression', register: 'informal', example: { fr: 'Ce détail ? J\u2019ai d\u2019autres chats à fouetter.', en: 'That detail? I have bigger fish to fry.' }, related: [{ fr: 'des priorités', en: 'priorities (plain)' }] },
        { fr: 'ce n\u2019est pas génial', en: 'it\u2019s actually bad (understatement)', pron: 'suh neh pah zhay-NYAHL', type: 'expression', register: 'neutral', example: { fr: 'Le service ? Ce n\u2019était pas génial…', en: 'The service? It wasn\u2019t great… (= it was bad)' }, related: [{ fr: 'passable', en: 'mediocre' }] },
        { fr: 'c\u2019est plié', en: 'it\u2019s in the bag / settled', pron: 'seh plee-AY', type: 'expression', register: 'informal', example: { fr: 'Le contrat ? C\u2019est plié.', en: 'The contract? It\u2019s wrapped up.' }, related: [{ fr: 'être réglé', en: 'to be settled (neutral)' }] },
        { fr: 'mettre la charrue avant les bœufs', en: 'to put the cart before the horse', pron: 'meh-TRUH lah shah-RÜ ah-VAHN lay BUH', type: 'expression', register: 'neutral', example: { fr: 'Recruter avant de définir le poste, c\u2019est mettre la charrue avant les bœufs.', en: 'Hiring before defining the role is putting the cart before the horse.' }, related: [{ fr: 'précipiter les choses', en: 'to rush things' }] },
        { fr: 'il n\u2019y a pas de fumée sans feu', en: 'there\u2019s no smoke without fire', pron: 'eel nyah pah duh fü-MAY sahn FUH', type: 'expression', register: 'neutral', example: { fr: 'Toutes ces rumeurs… il n\u2019y a pas de fumée sans feu.', en: 'All these rumours… there\u2019s no smoke without fire.' }, related: [{ fr: 'la rumeur', en: 'the rumour' }] },
        { fr: 'ben voyons !', en: 'yeah right! (irony marker)', pron: 'bahn vway-OHN', type: 'expression', register: 'informal', example: { fr: 'Il dit qu\u2019il était malade. Ben voyons !', en: 'He says he was sick. Yeah right!' }, related: [{ fr: 'c\u2019est ça !', en: 'sure! (ironic)' }] },
        { fr: 'la nuance', en: 'the nuance / shade of meaning', pron: 'lah nü-AHNSS', gender: 'feminine', register: 'neutral', example: { fr: 'Presque et quasiment : quelle nuance ?', en: 'Presque vs quasiment: what nuance?' }, related: [{ fr: 'nuancer', en: 'to qualify' }] },
    ],

    pronunciation: [
        { fr: 'poser un lapin', approx: 'poh-ZAY uhn lah-PAN', en: 'the idiom sounds literal — no special stress, no wink in the voice' },
        { fr: 'tout un fromage', approx: 'too tuhn fro-MAHZH', en: ' liaison: tout un → "too-tühn"' },
        { fr: 'dans les pommes', approx: 'dahn lay POM', en: 'final s of pommes silent — "POM"' },
        { fr: 'les yeux de la tête', approx: 'layz YUH duh lah TET', en: 'liaison: les yeux → "layz-yuh"' },
        { fr: 'ben voyons', approx: 'bahn vway-OHN', en: 'ben = "bahn" nasal — shortened bien' },
        { fr: 'c\u2019est plié', approx: 'seh plee-AY', en: 'plié like the ballet step, stressed final' },
    ],

    grammar: {
        rule: 'Idioms are fixed images: their words cannot be swapped, pluralized at will, or re-ordered — and their register (familier, courant, soutenu) must match the situation. Understatement and irony carry meaning through what is NOT said.',
        explanation: 'An idiom is grammatically frozen: you pose UN lapin (never des lapins), make tout UN fromage, and the images resist literal paraphrase — "poser un lapin" has nothing to do with rabbits for a French ear. Each idiom carries a register stamp: tomber dans les pommes is familier (use s\u2019évanouir at the doctor\u2019s), coûter les yeux de la tête is courant (fine in an email), while verlan and slang are off-limits in the exam. Beyond idioms, C1 comprehension lives in indirect meaning: understatement uses negation of the positive (ce n\u2019est pas génial = it\u2019s bad; ce n\u2019est pas faux = it\u2019s actually right), irony inverts (ben voyons !, quelle surprise ! after the obvious), and euphemism softens (il nous a quittés = he died). The exam\u2019s C1 listening asks exactly this: "what does the speaker really think?" — and the answer is in the particles, the negated positives, and the register of the vocabulary chosen.',
        examples: [
            { fr: 'Il m\u2019a posé un lapin — trente minutes sous la pluie !', en: 'He stood me up — thirty minutes in the rain!', breakdown: ['poser un lapin = fixed: no article change', 'the anger comes from the added clause', 'register: spoken, between friends'] },
            { fr: 'Ce n\u2019est pas que ça me déplaîse, mais…', en: 'It\u2019s not that I mind, but…', breakdown: ['double negation = polite hesitation', 'déplaire = to displease (formal verb)', 'the mais carries the real message'] },
            { fr: 'Trois heures de queue pour un cachet ? C\u2019est la fête…', en: 'Three hours in line for a pill? What a party…', breakdown: ['c\u2019est la fête = ironic (it\u2019s a party)', 'queue = line (also: tail)', 'the ellipsis does the sarcasm'] },
            { fr: 'Au bureau, on dit qu\u2019elle a « démissionné » — entendez : on l\u2019a poussée dehors.', en: 'At the office they say she "resigned" — meaning: they pushed her out.', breakdown: ['scare quotes signal irony', 'entendez = understand it as (formal)', 'euphemism exposed'] },
            { fr: 'Je ne dirais pas non à un petit café.', en: 'I wouldn\u2019t say no to a little coffee.', breakdown: ['litotes = request via negation', 'petit softens further', 'impeccably polite register'] },
            { fr: 'Le dossier avance doucement — enfin, « doucement » est un euphémisme.', en: 'The file is moving slowly — well, "slowly" is a euphemism.', breakdown: ['enfin = well (self-correction)', 'the speaker corrects their own euphemism', 'doucement is being ironized'] },
        ],
        commonMistakes: [
            'Translating idioms word for word in the other direction: "faire un chat-souris" for "cat and mouse" fails — French has mener une vie de chat or jouer au chat et à la souris. Idioms don\u2019t map; they pair.',
            'Breaking the frozen article: "elle m\u2019a posé deux lapins" or "il en fait un gros fromage" — the idiom is singular and fixed, or it stops being an idiom.',
            'Using familier idioms in soutenu contexts: tomber dans les pommes or c\u2019est plié in a formal letter reads as sloppy, not colourful.',
            'Reading ce n\u2019est pas mal as neutral: the negated positive often means GOOD (pas mal = quite good) — the direction of the understatement depends on the base adjective.',
        ],
    },

    transformations: [
        { type: 'Plain', fr: 'Elle ne s\u2019est pas présentée au rendez-vous.', en: 'She didn\u2019t show up to the meeting.' },
        { type: 'Idiom', fr: 'Elle m\u2019a posé un lapin.', en: 'She stood me up.' },
        { type: 'Plain', fr: 'C\u2019était très cher.', en: 'It was very expensive.' },
        { type: 'Idiom', fr: 'Ça m\u2019a coûté les yeux de la tête.', en: 'It cost me an arm and a leg.' },
        { type: 'Understatement', fr: 'Ce n\u2019était pas génial.', en: 'It wasn\u2019t great. (= it was bad)' },
        { type: 'Irony', fr: 'Super, encore une panne !', en: 'Great, another breakdown! (= how annoying)' },
        { type: 'Litotes request', fr: 'Je ne refuserais pas un verre.', en: 'I wouldn\u2019t refuse a glass. (= yes please)' },
        { type: 'Euphemism', fr: 'On l\u2019a « reclassé » ailleurs.', en: 'He was "reassigned" elsewhere. (= pushed out)' },
    ],

    sentenceBuilding: [
        { fr: 'Lundi, ma cliente m\u2019a posé un lapin.', en: 'Monday, my client stood me up.' },
        { fr: 'Lundi, ma cliente m\u2019a posé un lapin — et ce n\u2019était pas la première fois.', en: 'Monday, my client stood me up — and it wasn\u2019t the first time.' },
        { fr: 'Lundi, ma cliente m\u2019a posé un lapin. J\u2019en ai fait tout un fromage auprès de mon patron, mais il avait d\u2019autres chats à fouetter.', en: 'Monday, my client stood me up. I made a whole cheese of it to my boss, but he had other fish to fry.' },
        { fr: 'En somme : la réunion a coûté les yeux de la tête, le dossier n\u2019a pas avancé d\u2019un pouce, et le seul accompli, c\u2019est que personne n\u2019est tombé dans les pommes.', en: 'In short: the meeting cost an arm and a leg, the file didn\u2019t advance an inch, and the only accomplishment is that nobody passed out.' },
        { fr: 'Ben voyons. La semaine prochaine, c\u2019est moi qui pose un lapin — histoire d\u2019équilibrer les comptes, pour ainsi dire.', en: 'Yeah right. Next week, I\u2019m the one standing someone up — to balance the books, so to speak.' },
    ],

    practice: [
        { instruction: 'Decode the idiom:', question: 'Elle m\u2019a posé un lapin au café.', answer: 'She stood me up — didn\u2019t come' },
        { instruction: 'Register check:', question: 'At the doctor\u2019s: "je suis tombé dans les pommes" — acceptable?', answer: 'No — familier. Say: je me suis évanoui(e) / j\u2019ai perdu connaissance' },
        { instruction: 'Decode the understatement:', question: 'La conférence ? Ce n\u2019était pas génial…', answer: 'It was disappointing — negated positive = negative' },
        { instruction: 'Decode the direction:', question: 'Ce n\u2019est pas mal du tout !', answer: 'It\u2019s actually quite good — pas mal ≈ pretty good' },
        { instruction: 'Irony or sincerity?', question: 'Encore une panne. Super.', answer: 'Irony — super inverts under annoyance' },
        { instruction: 'Complete the idiom:', question: 'Ce détail ? J\u2019ai d\u2019autres ______ à fouetter.', answer: 'chats — avoir d\u2019autres chats à fouetter = bigger fish to fry' },
    ],

    translationPractice: [
        { en: 'She stood me up last night. (idiom)', fr: 'Elle m\u2019a posé un lapin hier soir.' },
        { en: 'Don\u2019t make such a fuss about it! (idiom)', fr: 'N\u2019en fais pas tout un fromage !' },
        { en: 'That trip cost me an arm and a leg. (idiom)', fr: 'Ce voyage m\u2019a coûté les yeux de la tête.' },
        { en: 'The service wasn\u2019t great. (understatement = it was bad)', fr: 'Le service n\u2019était pas génial.' },
        { en: 'I wouldn\u2019t say no to a coffee. (polite request)', fr: 'Je ne dirais pas non à un café.' },
        { en: 'It\u2019s settled — the contract is signed.', fr: 'C\u2019est plié — le contrat est signé.' },
    ],

    reverseTranslation: [
        { fr: 'Pour ce film, ce fut le coup de foudre.', en: 'For this film, it was love at first sight.' },
        { fr: 'Recruter sans fiche de poste, c\u2019est mettre la charrue avant les bœufs.', en: 'Recruiting without a job description is putting the cart before the horse.' },
        { fr: 'Ben voyons — et moi, je suis la reine d\u2019Angleterre.', en: 'Yeah right — and I\u2019m the Queen of England.' },
        { fr: 'Il faut qu\u2019on parle : il n\u2019y a pas de fumée sans feu.', en: 'We need to talk: there\u2019s no smoke without fire.' },
    ],

    register: {
        informal: 'Il s\u2019est pointé deux heures en retard, tranquille comme si de rien n\u2019était. Ben voyons ! (s\u2019est pointé = slang for showed up; ben voyons = the irony stamp)',
        neutral: 'Elle m\u2019a posé un lapin ; heureusement, j\u2019avais un livre.',
        formal: 'La personne convoquée ne s\u2019est pas présentée au rendez-vous fixé, ce qui a entraîné le report du dossier.',
    },

    culture: 'French conversation runs on understatement the way English runs on enthusiasm: the strongest praise is often pas mal du tout, and the strongest criticism ce n\u2019était pas génial. Sitcoms and radio (France Inter\u2019s chroniqueurs are a masterclass) lean on the negated positive and the ironic super. For the TCF Canada\u2019s oral comprehension, the "attitude du locuteur" questions test exactly this — irony, resignation, amused annoyance — so treat every super ! and pas génial as a reading exercise.',

    freeProduction: 'Tell the story of a small disaster (8–10 sentences) using at least five idioms from this lecture in their right register, one understatement, and one ironic comment. Guiding frame: the plan (ce devait être…), the disaster (et là, surprise…), the cost (ça m\u2019a coûté…), the reaction of others (on m\u2019a dit de ne pas en faire tout un fromage), your conclusion (enfin, c\u2019est plié).',

    miniTest: [
        { question: 'Poser un lapin means:', options: ['to pet a rabbit', 'to stand someone up', 'to tell a joke', 'to fall asleep'], answer: 'to stand someone up — fixed image, no rabbits involved' },
        { question: 'Ce n\u2019était pas génial really means:', options: ['it was amazing', 'it was bad', 'it was average', 'it was genial'], answer: 'it was bad — negated positive understates the negative' },
        { question: 'Most formal way to say "she fainted":', options: ['elle est tombée dans les pommes', 'elle s\u2019est évanouie', 'elle a plié', 'elle a pomé'], answer: 'elle s\u2019est évanouie — the idiom is familier' },
        { question: 'J\u2019ai d\u2019autres chats à fouetter =', options: ['I love cats', 'I have bigger fish to fry', 'I\u2019m busy whipping cats', 'I hate fuss'], answer: 'I have bigger fish to fry' },
        { question: '"Super, encore du travail !" said with a sigh is:', options: ['sincere joy', 'irony', 'a question', 'a command'], answer: 'irony — the sigh and encore flip the meaning' },
    ],

    review: [
        'The register dials from B2:registre still apply — idioms add a fifth: the vocabulary stamp (familier / courant / soutenu) on each phrase.',
        'The irony and understatement markers feed straight into the C1:oral-implicite lecture (attitude questions).',
    ],

    traps: [
        'Idioms are frozen: no article swaps (posé UN lapin), no plural (tout UN fromage), no word re-ordering. A modified idiom is a mistake, not a variation.',
        'Register stamp before use: pommes/plié/boulot are spoken-only; the written exam expects s\u2019évanouir, être réglé, le travail.',
        'The direction of understatement: pas mal = good, pas génial = bad, pas faux = right. Read the base adjective, not the negation.',
        'Irony often rides on one particle (ben voyons, super, quelle surprise, c\u2019est ça) plus context — answer attitude questions from the tone words, not the literal words.',
    ],

    homework: {
        intro: 'Every item tests either a frozen image, an understatement, or an attitude read. Keep the register of each answer consistent with its context.',
        translation: [
            { prompt: 'She stood me up at the café. (idiom)', answer: 'Elle m\u2019a posé un lapin au café.', explanation: 'Frozen: poser UN lapin, no plural. au café for the location; au not dans le.' },
            { prompt: 'That apartment cost me an arm and a leg. (idiom)', answer: 'Cet appartement m\u2019a coûté les yeux de la tête.', explanation: 'coûter QUELQUE CHOSE à quelqu\u2019un — indirect object m\u2019a coûté. The image is plural but fixed: les yeux de la tête.' },
            { prompt: 'Don\u2019t make a fuss — it\u2019s just a delay. (idiom)', answer: 'N\u2019en fais pas tout un fromage — ce n\u2019est qu\u2019un retard.', explanation: 'en fais = make OF it (en pronoun); ne…rien que… — ce n\u2019est QUE for only/just.' },
            { prompt: 'The service wasn\u2019t great, to say the least. (understatement)', answer: 'Le service n\u2019était pas génial, pour ne pas dire plus.', explanation: 'negated positive carries the criticism; pour ne pas dire plus = to say the least.' },
            { prompt: 'I wouldn\u2019t say no to a little break. (polite litotes)', answer: 'Je ne dirais pas non à une petite pause.', explanation: 'conditional + negation = the polite request frame; à + pause.' },
            { prompt: 'There\u2019s no smoke without fire. (idiom, proverb register)', answer: 'Il n\u2019y a pas de fumée sans feu.', explanation: 'Proverbs are frozen at soutenu-neutral: no article tweaks, n\u2019y a glued.' },
        ],
        blanks: [
            { prompt: 'Elle m\u2019a posé ______ lapin samedi.', answer: 'un', explanation: 'The idiom is singular and fixed — jamais des lapins.' },
            { prompt: 'Ce dossier m\u2019a coûté ______ yeux de la tête.', answer: 'les', explanation: 'Fixed article: les yeux de la tête — the image is idiomatic, not literal.' },
            { prompt: 'Ne ______ fais pas tout un fromage !', answer: 'en', explanation: 'en = of it: make a whole cheese OF it. The en is obligatory in this idiom.' },
            { prompt: 'De chaleur, il est tombé dans ______ pommes.', answer: 'les', explanation: 'Fixed plural article in the idiom: dans les pommes (familier).' },
            { prompt: 'Le contrat est signé : c\u2019est ______ !', answer: 'plié', explanation: 'c\u2019est plié = it\u2019s wrapped up; familier, spoken contexts.' },
            { prompt: 'Encore du travail le week-end. ______ surprise !', answer: 'Quelle', explanation: 'Quelle surprise ! with heavy tone = irony. Sincere use would add positive context.' },
        ],
        corrections: [
            { prompt: 'Elle m\u2019a posé deux lapins la semaine dernière.', answer: 'Elle m\u2019a posé un lapin la semaine dernière.', explanation: 'How the mistake happens: pluralizing the image. Why it does not work: the idiom is frozen in the singular — deux lapins reads as a literal (absurd) sentence. How to fix it: un lapin per offence; repeat the idiom for repeated offences.' },
            { prompt: 'Au bureau du médecin : « Je suis tombé dans les pommes hier. »', answer: 'Je me suis évanoui hier. / J\u2019ai perdu connaissance hier.', explanation: 'How the mistake happens: using a familier idiom in a soutenu setting. Why it does not work: register must match the institution. How to fix it: s\u2019évanouir / perdre connaissance with the doctor.' },
            { prompt: 'Ce n\u2019était pas génial — j\u2019ai adoré !', answer: 'Ce n\u2019était pas génial… (without j\u2019ai adoré) — or: C\u2019était génial !', explanation: 'How the mistake happens: mixing an understatement with a contradiction. Why it does not work: pas génial signals disappointment; j\u2019ai adoré cancels it and reads as confusion. How to fix it: pick one channel — understatement OR enthusiasm.' },
            { prompt: 'Il en fait un gros fromage de cette histoire.', answer: 'Il en fait tout un fromage de cette histoire.', explanation: 'How the mistake happens: modifying the frozen adjective. Why it does not work: the idiom is tout un fromage — gros breaks the image. How to fix it: en faire tout un fromage, exactly.' },
            { prompt: 'Ben voyons, merci beaucoup pour ton aide sincère !', answer: 'Merci beaucoup pour ton aide sincère ! (drop ben voyons)', explanation: 'How the mistake happens: bolting an irony marker onto a sincere sentence. Why it does not work: ben voyons turns the whole line sarcastic — the opposite of the intended thanks. How to fix it: irony markers only when you mean the opposite.' },
        ],
        writing: {
            task: 'Write a comic complaint email to a friend (10–14 lines) about a service disaster (restaurant, repair, delivery): use five idioms in their correct register, one understatement, one ironic aside, and end with a litotes request (je ne dirais pas non à…). Keep the whole text familier-courant — no slang beyond the idioms themselves.',
            requirements: [
                'Five idioms from this lecture, unmodified',
                'One understatement (negated positive)',
                'One irony marker used correctly',
                'One litotes request',
                'Consistent familier-courant register, no soutenu formulas',
            ],
            minWords: 90,
        },
        checklist: [
            'I keep idioms frozen: articles, singular, word order untouched',
            'I match the idiom\u2019s register stamp to the situation (pommes = spoken, évanouir = neutral)',
            'I read negated positives in the right direction (pas mal = good; pas génial = bad)',
            'I hear irony through particles (ben voyons, super, quelle surprise) plus context',
            'I can use a litotes request (je ne dirais pas non à…)',
            'I know the five images of this lecture without translating them literally',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Idioms are formulas, not sentences: poser UN lapin · en faire tout UN fromage · dans LES pommes · LES yeux de la tête · le coup de foudre. The articles belong to the image.',
            examples: [
                { fr: 'Elle m\u2019a posé un lapin. · N\u2019en fais pas tout un fromage. · Ça m\u2019a coûté les yeux de la tête.', en: 'three formulas, three frozen images' },
            ],
        },
        {
            explanation: 'The register stamp: FAMILIER — tomber dans les pommes, c\u2019est plié, ben voyons; COURANT — poser un lapin, coûter les yeux de la tête; SOUTENU — s\u2019évanouir, être réglé. Match the stamp to the room.',
            examples: [
                { fr: 'Chez le médecin : je me suis évanoui. Entre amis : je suis tombé dans les pommes.', en: 'same fact, two rooms' },
            ],
        },
        {
            explanation: 'Understatement direction: negating a positive adjective signals the OPPOSITE of that adjective\u2019s base — pas mal / pas mal du tout = good; pas génial / pas terrible = bad; pas faux = right; pas désagréable = pleasant.',
            examples: [
                { fr: 'Ce n\u2019est pas mal du tout ! (= nice) · Ce n\u2019était pas terrible… (= poor)', en: 'read the base word' },
            ],
        },
        {
            explanation: 'Irony kit: ben voyons ! · c\u2019est ça ! · super / génial (after bad news) · quelle surprise ! · c\u2019est la fête. The marker inverts the sentence; the sentence tone (sigh, drawn-out syllable) confirms it.',
            examples: [
                { fr: 'Encore une réunion. Super. · Il a promis d\u2019arrêter. Ben voyons.', en: 'the inversion at work' },
            ],
        },
        {
            explanation: 'Litotes and euphemism: request by negation (je ne dirais pas non à…), death softened (il nous a quittés), firing softened (on l\u2019a reclassé / la direction s\u2019en est séparée). C1 listening rewards hearing the softening.',
            examples: [
                { fr: 'Je ne refuserais pas un café. = I\u2019d love a coffee.', en: 'the polite detour' },
            ],
        },
        {
            explanation: 'Idiom-building habit: collect them by verb — faire (tout un fromage, la fête), avoir (d\u2019autres chats à fouetter, le coup de foudre), poser (un lapin), tomber (dans les pommes), mettre (la charrue avant les bœufs) — and rehearse each in one memorable sentence.',
            examples: [
                { fr: 'Faire tout un fromage · avoir le coup de foudre · poser un lapin', en: 'verb-first recall' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'lapin': { en: 'rabbit', pron: 'lah-PAN', gender: 'masculine', plural: 'lapins', type: 'noun', note: 'poser un lapin = stand someone up. Also rabbit stew on menus.' },
        'posé un lapin': { en: 'stood someone up (idiom — PC form)', pron: 'poh-ZAY ün lah-PAN', type: 'expression', register: 'informal', base: { form: 'poser un lapin', en: 'to stand someone up' }, note: 'Elle m\u2019a posé un lapin — frozen: UN lapin, never plural.' },
        'coûté les yeux de la tête': { en: 'cost an arm and a leg (idiom — PC form)', pron: 'koo-TAY layz YUH duh lah TET', type: 'expression', base: { form: 'coûter les yeux de la tête', en: 'to cost an arm and a leg' }, note: 'Ça m\u2019a coûté les yeux de la tête — indirect object: m\u2019a coûté.' },
        'tout un fromage': { en: 'a whole cheese (idiom core)', pron: 'too tuhn fro-MAHZH', gender: 'masculine', type: 'expression', register: 'informal', note: 'en faire tout un fromage = make a fuss; the article and adjective are frozen.' },
        'dans les pommes': { en: 'out cold (idiom core)', pron: 'dahn lay POM', type: 'expression', register: 'informal', note: 'tomber dans les pommes = faint — familier; formal: s\u2019évanouir.' },
        'fromage': { en: 'cheese', pron: 'fro-MAHZH', gender: 'masculine', plural: 'fromages', type: 'noun', note: 'en faire tout un fromage = make a fuss. France eats ~400 kinds.' },
        'pommes': { en: 'apples (idiom: faint)', pron: 'POM', gender: 'feminine', type: 'noun', note: 'tomber dans les pommes = faint (familier); pomme also appears in pomme de terre.' },
        'yeux': { en: 'eyes (plural of œil)', pron: 'YUH', gender: 'masculine', type: 'noun', note: 'coûter les yeux de la tête = cost a fortune. œil → yeux is THE irregular plural.' },
        'coup de foudre': { en: 'love at first sight / lightning strike', pron: 'koo duh FOOD-ruh', gender: 'masculine', type: 'expression', note: 'literally a lightning bolt — the image is the suddenness.' },
        'chats': { en: 'cats', pron: 'shah', gender: 'masculine', type: 'noun', note: 'avoir d\u2019autres chats à fouetter = have better things to do. Singular: chat.' },
        'fouetter': { en: 'to whip', pron: 'fwah-TAY', type: 'verb', note: 'survives mainly in the idiom and in cuisine (fouetter les œufs = whisk).' },
        'charrue': { en: 'plough', pron: 'shah-RÜ', gender: 'feminine', plural: 'charrues', type: 'noun', note: 'mettre la charrue avant les bœufs = cart before the horse.' },
        'bœufs': { en: 'oxen (plural of bœuf)', pron: 'BUH', gender: 'masculine', type: 'noun', note: 'the -œufs are silent: "buh"; singular bœuf = "buhf".' },
        'fumée': { en: 'smoke', pron: 'fü-MAY', gender: 'feminine', plural: 'fumées', type: 'noun', note: 'il n\u2019y a pas de fumée sans feu — proverb register.' },
        'plié': { en: 'folded / settled (idiom)', pron: 'plee-AY', type: 'adjective', base: { form: 'plier', en: 'to fold' }, note: 'c\u2019est plié = it\u2019s in the bag (familier).' },
        'génial': { en: 'great / brilliant', pron: 'zhay-NYAHL', type: 'adjective', fem: { word: 'géniale', en: 'great (fem)' }, note: 'pas génial = disappointing — the understatement base.' },
        's\u2019évanouir': { en: 'to faint (neutral)', pron: 'seh-vay-nweer', type: 'verb', register: 'formal', note: 'être-verb: elle s\u2019est évanouie. The soutenu twin of tomber dans les pommes.' },
        'évanouie': { en: 'fainted (fem)', pron: 'ay-vah-NWEE', type: 'verb', base: { form: 's\u2019évanouir', en: 'to faint' }, note: 'agreement with être: évanoui / évanouie / évanouis / évanouies.' },
        'rumeur': { en: 'rumour', pron: 'rü-MUHR', gender: 'feminine', plural: 'rumeurs', type: 'noun', note: 'les rumeurs courent = rumours are flying.' },
        'déplaire': { en: 'to displease (formal)', pron: 'day-PLEHR', type: 'verb', register: 'formal', note: 'cela ne me déplaît pas — the polite-hesitation verb. Participle déplu.' },
        'queue': { en: 'line / queue / tail', pron: 'KUH', gender: 'feminine', plural: 'queues', type: 'noun', note: 'faire la queue = to queue; one syllable, three meanings.' },
        'cachet': { en: 'pill / flat fee', pron: 'kah-SHEH', gender: 'masculine', plural: 'cachets', type: 'noun', note: 'prendre un cachet (aspirin-era word); un cachet = also an actor\u2019s flat fee.' },
        'euphémisme': { en: 'euphemism', pron: 'uh-fay-MEE-smuh', gender: 'masculine', plural: 'euphémismes', type: 'noun', note: 'doucement est un euphémisme — naming the softening is itself a C1 move.' },
        'litote': { en: 'litotes (saying less to mean more)', pron: 'lee-TOHT', gender: 'feminine', plural: 'litotes', type: 'noun', note: 'je ne dirais pas non — the politeness engine of French requests.' },
        'soutenu': { en: 'formal / elevated (register)', pron: 'soo-tuh-NÜ', type: 'adjective', fem: { word: 'soutenue', en: 'formal (fem)' }, note: 'register labels: familier → courant → soutenu. From soutenir.' },
        'familier': { en: 'casual / familiar (register)', pron: 'fah-mee-LYAY', type: 'adjective', fem: { word: 'familière', en: 'casual (fem)' }, note: 'vocabulaire familier — the stamp you must match to the room.' },
    },
};

// ── C1 · Synthesis & Critical Reading ───────────────────────────────────────
const c1Synthese: StaticFrenchLesson = {
    title: 'Synthesis & Critical Reading',
    objective: 'Read several documents together and produce a synthesis — attribute every idea to its source (selon le document A, d\u2019après l\u2019auteure), mark convergence and divergence, keep your own voice out of the summary, and deliver the whole thing in the nominalized style of French academic writing.',

    vocabulary: [
        { fr: 'le corpus', en: 'the body of documents (exam set)', pron: 'luh kor-PUSS', gender: 'masculine', register: 'formal', example: { fr: 'Le corpus comprend trois documents.', en: 'The corpus comprises three documents.' }, related: [{ fr: 'le dossier', en: 'the file' }] },
        { fr: 'd\u2019après le document A', en: 'according to document A', pron: 'dah-PRAY luh doh-kü-MAHN ah', type: 'phrase', register: 'formal', example: { fr: 'D\u2019après le document A, le télétravail progresse.', en: 'According to document A, remote work is growing.' }, related: [{ fr: 'selon X', en: 'according to X' }] },
        { fr: 'l\u2019auteure souligne que', en: 'the author stresses that', pron: 'loh-TUHR soo-lee-NYUH kuh', type: 'phrase', register: 'formal', example: { fr: 'L\u2019auteure souligne que les chiffres datent.', en: 'The author stresses that the figures are dated.' }, related: [{ fr: 'rapporter', en: 'to report' }] },
        { fr: 'la thèse', en: 'the thesis / central claim', pron: 'lah TEHZ', gender: 'feminine', register: 'formal', example: { fr: 'La thèse des deux textes converge.', en: 'The thesis of both texts converges.' }, related: [{ fr: 'l\u2019antithèse', en: 'the counter-thesis' }] },
        { fr: 'la problématique', en: 'the core question at stake', pron: 'lah proh-blem-ah-TEEK', gender: 'feminine', register: 'formal', example: { fr: 'La problématique commune est claire.', en: 'The shared core question is clear.' }, related: [{ fr: 'la question de fond', en: 'the underlying question' }] },
        { fr: 'confronter les points de vue', en: 'to compare the viewpoints', pron: 'kohn-frohn-TAY lay pwan duh VÜ', type: 'phrase', register: 'formal', example: { fr: 'Il s\u2019agit de confronter les points de vue sans trancher.', en: 'The task is to compare the viewpoints without ruling.' }, related: [{ fr: 'le point de vue', en: 'the viewpoint' }] },
        { fr: 'tandis que', en: 'whereas (divergence)', pron: 'tahn-DEE kuh', type: 'phrase', register: 'formal', example: { fr: 'Tandis que A insiste sur le coût, B vante les gains.', en: 'While A stresses the cost, B praises the gains.' }, related: [{ fr: 'à l\u2019inverse', en: 'conversely' }] },
        { fr: 'dans le même ordre d\u2019idées', en: 'along the same lines (convergence)', pron: 'dahn luh mem ord day-DEH', type: 'phrase', register: 'formal', example: { fr: 'Dans le même ordre d\u2019idées, C évoque…', en: 'Along the same lines, C mentions…' }, related: [{ fr: 'de même', en: 'likewise' }] },
        { fr: 'la prise de conscience', en: 'the growing awareness', pron: 'lah preez duh kohn-see-AHNSS', gender: 'feminine', register: 'formal', example: { fr: 'Les textes traduisent une prise de conscience.', en: 'The texts reflect a growing awareness.' }, related: [{ fr: 'prendre conscience de', en: 'to become aware of' }] },
        { fr: 'résumer', en: 'to summarize', pron: 'ray-zü-MAY', type: 'verb', register: 'neutral', example: { fr: 'Résumer, c\u2019est reformuler — jamais copier.', en: 'To summarize is to reword — never copy.' }, related: [{ fr: 'le résumé', en: 'the summary' }] },
        { fr: 'il ressort de', en: 'it emerges from', pron: 'eel ruh-SOR duh', type: 'phrase', register: 'formal', example: { fr: 'Il ressort de ces documents que…', en: 'It emerges from these documents that…' }, related: [{ fr: 'en ressortir', en: 'to come out of it' }] },
        { fr: 'sous-financer', en: 'to underfund', pron: 'soo-fee-nahn-SAY', type: 'verb', register: 'formal', example: { fr: 'Les deux textes dénoncent un système sous-financé.', en: 'Both texts denounce an underfunded system.' }, related: [{ fr: 'financer', en: 'to fund' }] },
    ],

    pronunciation: [
        { fr: 'le corpus', approx: 'luh kor-PUSS', en: 'Latin plural kept silent — "kor-PÜSS"' },
        { fr: 'd\u2019après le document', approx: 'dah-PRAY luh doh-kü-MAHN', en: 'd\u2019après keeps its accent aigu: "dah-PRAY"' },
        { fr: 'la thèse', approx: 'lah TEHZ', en: 'the -se sounds "z" — "TEHZ"' },
        { fr: 'tandis que', approx: 'tahn-DEE kuh', en: 'first syllable nasal: "tahn"' },
        { fr: 'il ressort de', approx: 'eel ruh-SOR duh', en: 'double s keeps the s clean: "ruh-SOR"' },
        { fr: 'prise de conscience', approx: 'preez duh kohn-SYAHNSS', en: 'liaison: prise de → "preez-duh"' },
    ],

    grammar: {
        rule: 'Synthesis style: attribute every idea (selon / d\u2019après + source), keep the indicative for reported facts, nominalize where possible (la prise de conscience, la mise en place), and mark convergence (dans le même ordre d\u2019idées) vs divergence (tandis que, à l\u2019inverse). Your opinion stays outside.',
        explanation: 'A synthesis (the C1 written task) never quotes and never argues: it re-presents. Attribution frames do the work: selon le document A…, d\u2019après l\u2019auteure…, X souligne que…, il ressort du texte que…. Reported facts keep the indicative and, with a past reporter, the backshift from B1:discours (l\u2019auteure a déclaré que le système était sous-financé). The C1 upgrade is nominalization: clauses become noun phrases — les gens prennent conscience → la prise de conscience; on a mis en place → la mise en place; cela coûte cher → le coût. Convergence connectors group sources that agree (dans le même ordre d\u2019idées, de même, à l\u2019instar de), divergence connectors set them against each other (tandis que, à l\u2019inverse, là où A voit…, B voit…). Two iron rules: no personal opinion (je pense is banned inside the synthesis itself), and no verbatim lifting — reformulate every sentence.',
        examples: [
            { fr: 'D\u2019après le document A, le système de santé souffre d\u2019un sous-financement chronique.', en: 'According to document A, the healthcare system suffers from chronic underfunding.', breakdown: ['d\u2019après = attribution frame', 'souffrir de = to suffer from', 'sous-financement = nominalized accusation'] },
            { fr: 'Tandis que le document B insiste sur les délais d\u2019attente, le document C met l\u2019accent sur la prévention.', en: 'While document B stresses waiting times, document C focuses on prevention.', breakdown: ['tandis que = divergence', 'insister sur / mettre l\u2019accent sur = stress', 'two sources, one sentence'] },
            { fr: 'Dans le même ordre d\u2019idées, l\u2019éditorialiste évoque la pénurie de médecins de famille.', en: 'Along the same lines, the columnist mentions the family-doctor shortage.', breakdown: ['convergence frame', 'évoquer = to mention (formal)', 'pénurie de = shortage of'] },
            { fr: 'Il ressort de l\u2019ensemble que la prise de conscience est réelle, mais que la mise en œuvre reste lente.', en: 'It emerges from the whole that awareness is real, but implementation remains slow.', breakdown: ['il ressort de = it emerges from', 'la mise en œuvre = implementation (nominalized)', 'mais… que parallel structure'] },
            { fr: 'L\u2019auteure a souligné que les chiffres de 2020 étaient dépassés.', en: 'The author stressed that the 2020 figures were outdated.', breakdown: ['past reporter → backshift: sont → étaient', 'dépassé = outdated', 'attribution stays neutral'] },
            { fr: 'Ces convergences masquent néanmoins une divergence de fond sur le rôle de l\u2019État.', en: 'These convergences nevertheless mask a fundamental divergence on the state\u2019s role.', breakdown: ['masquer = to mask (analysis verb)', 'divergence de fond = fundamental divergence', 'synthesis voice: analytic, not personal'] },
        ],
        commonMistakes: [
            'Slipping your opinion into the synthesis: "je trouve que le document B a raison" — the task grades neutrality. Save judgements for a conclusion framed as comparison (la thèse de B paraît mieux étayée).',
            'Copying sentences verbatim: the grader checks reformulation — same words = zero marks for that sentence. Synonymize every clause.',
            'Confusing selon and d\u2019après registers: both are correct; selON is lighter, d\u2019après slightly more literary — but "selon à" or "d\u2019après de" (double prepositions) are wrong.',
            'Forgetting the backshift with past reporters: l\u2019auteure a écrit que le système EST sous-financé should be était (B1:discours applies to synthesis).',
        ],
    },

    transformations: [
        { type: 'Direct claim', fr: 'Le système est sous-financé.', en: 'The system is underfunded.' },
        { type: 'Attributed', fr: 'D\u2019après le document A, le système est sous-financé.', en: 'According to document A, the system is underfunded.' },
        { type: 'Past reporter', fr: 'L\u2019auteure a écrit que le système était sous-financé.', en: 'The author wrote that the system was underfunded.' },
        { type: 'Clause → noun', fr: 'Les gens prennent conscience du problème. → la prise de conscience du problème', en: 'people are becoming aware → the growing awareness' },
        { type: 'Divergence', fr: 'A insiste sur le coût ; B, sur les gains.', en: 'A stresses the cost; B, the gains.' },
        { type: 'Convergence', fr: 'B et C vont dans le même sens.', en: 'B and C go the same way.' },
        { type: 'Verbatim (banned)', fr: '« les délais s\u2019allongent » (copied)', en: 'copied — zero marks' },
        { type: 'Reformulated', fr: 'les délais d\u2019attente ne cessent de s\u2019allonger', en: 'same idea, new words — graded' },
    ],

    sentenceBuilding: [
        { fr: 'Les trois documents traitent du logement abordable.', en: 'The three documents deal with affordable housing.' },
        { fr: 'Les trois documents traitent du logement abordable, mais sous des angles différents.', en: 'The three documents deal with affordable housing, but from different angles.' },
        { fr: 'D\u2019après le document A, la pénurie s\u2019explique par la croissance démographique ; B met en avant la spéculation.', en: 'According to document A, the shortage is explained by demographic growth; B puts speculation forward.' },
        { fr: 'Tandis que A et C dénoncent le manque de construction, B accuse les investisseurs privés — une divergence de diagnostic, non de constat.', en: 'While A and C denounce the lack of construction, B blames private investors — a divergence of diagnosis, not of finding.' },
        { fr: 'Il ressort de l\u2019ensemble que, malgré des analyses opposées, la prise de conscience politique constitue le point commun des trois textes.', en: 'It emerges from the whole that, despite opposing analyses, political awareness is the common point of the three texts.' },
    ],

    practice: [
        { instruction: 'Attribute it:', question: 'Le télétravail progresse. (source: document B)', answer: 'D\u2019après le document B, le télétravail progresse. / Selon B, …' },
        { instruction: 'Convergence or divergence frame?', question: 'A vante les gains ; B, les coûts.', answer: 'Divergence — tandis que / à l\u2019inverse' },
        { instruction: 'Nominalize:', question: 'Les habitants s\u2019opposent au projet. →', answer: 'l\u2019opposition des habitants au projet' },
        { instruction: 'Backshift:', question: 'L\u2019auteure a écrit que les chiffres ______ (être) faux.', answer: 'étaient — past reporter drags the indicative back' },
        { instruction: 'Banned or allowed?', question: '« je pense que le document C exagère » (inside the synthesis)', answer: 'Banned — synthesis stays neutral; reformulate as an attribution' },
        { instruction: 'Emergence frame:', question: '______ de ces trois textes que le constat est partagé.', answer: 'Il ressort — il ressort de + que + indicative' },
    ],

    translationPractice: [
        { en: 'According to document A, hiring has picked up.', fr: 'D\u2019après le document A, l\u2019embauche a repris.' },
        { en: 'Whereas B stresses costs, C praises the results.', fr: 'Tandis que B insiste sur les coûts, C vante les résultats.' },
        { en: 'It emerges from the whole that awareness is growing.', fr: 'Il ressort de l\u2019ensemble que la prise de conscience grandit.' },
        { en: 'The author wrote that the figures were outdated.', fr: 'L\u2019auteure a écrit que les chiffres étaient dépassés.' },
        { en: 'Along the same lines, the editorial mentions the shortage.', fr: 'Dans le même ordre d\u2019idées, l\u2019éditorial évoque la pénurie.' },
        { en: 'These convergences mask a fundamental divergence.', fr: 'Ces convergences masquent une divergence de fond.' },
    ],

    reverseTranslation: [
        { fr: 'Le corpus comprend deux articles et une interview.', en: 'The corpus comprises two articles and an interview.' },
        { fr: 'À l\u2019inverse du document A, B minimise le rôle des prix.', en: 'Contrary to document A, B downplays the role of prices.' },
        { fr: 'La problématique commune aux deux textes est le financement.', en: 'The core question common to both texts is funding.' },
        { fr: 'L\u2019éditorialiste souligne que la mise en œuvre prend du retard.', en: 'The columnist stresses that implementation is falling behind.' },
    ],

    register: {
        informal: 'En gros, les trois articles disent la même chose, sauf le deuxième qui dit tout le contraire. (spoken paraphrase — never in the exam answer)',
        neutral: 'Selon le document B, la situation s\u2019améliore lentement.',
        formal: 'Il ressort de la confrontation des documents que si le diagnostic est partagé, les remèdes proposés divergent profondément.',
    },

    culture: 'The TCF\u2019s C1 written expression is a synthèse de documents — three texts, one page, zero opinions. This exercise descends from French university practice (the fiches de lecture, the dissertation sur corpus) and rewards the impersonal, nominalized style of French academic prose. Canadian French-language universities run the same exercise; le devoir (Montreal\u2019s daily) is a living corpus — read one editorial and one news piece on the same topic and note how the news attributes and the editorial argues.',

    freeProduction: 'Take two texts you know (or invent two positions on housing prices) and write a 120-word synthesis: open with the shared problématique, attribute each claim (d\u2019après A…, tandis que B…), include one nominalized reformulation, mark one convergence and one divergence, and close with il ressort de l\u2019ensemble que…. Zero first person.',

    miniTest: [
        { question: 'Inside a synthesis, your opinion is:', options: ['required', 'allowed once', 'banned', 'the conclusion'], answer: 'banned — the synthesis re-presents, it does not judge' },
        { question: 'Divergence frame:', options: ['dans le même ordre d\u2019idées', 'de même', 'tandis que', 'à l\u2019instar de'], answer: 'tandis que — the others mark convergence' },
        { question: 'L\u2019auteure a écrit que les chiffres ______ faux.', options: ['sont', 'étaient', 'soient', 'seront'], answer: 'étaient — past reporter + indicative backshift' },
        { question: 'La prise de conscience is:', options: ['a conscience problem', 'a nominalized clause', 'an idiom', 'a proverb'], answer: 'a nominalized clause — prendre conscience → la prise de conscience' },
        { question: 'Copying a sentence verbatim earns:', options: ['full marks', 'bonus marks', 'zero marks', 'half marks'], answer: 'zero marks — reformulation is the graded skill' },
    ],

    review: [
        'The backshift machine from B1:discours powers attributed past statements — synthesis just wraps it in selon / d\u2019après.',
        'The B2:argumentation connectors (en effet, néanmoins) still organize your prose; here they group sources instead of your own reasons.',
    ],

    traps: [
        'No first person inside the synthesis — not even in the conclusion. Attribute the judgment: la thèse de B paraît mieux étayée que celle de A.',
        'Past reporter = backshift: a écrit que … était, souligné que … avait. Present reporters (écrit-elle dans un texte actuel) can stay present — check the frame.',
        'Nominalization is style, not decoration: every clause you turn into a noun phrase (la mise en œuvre, la pénurie) lifts the register the grader rewards.',
        'Do not add outside knowledge: the synthesis covers the corpus only — introducing facts from memory loses structure points.',
    ],

    homework: {
        intro: 'Attribution, reformulation, nominalization, convergence/divergence. Every answer stays in the neutral-analytic voice of a synthesis.',
        translation: [
            { prompt: 'According to document A, rents rose by 10%.', answer: 'D\u2019après le document A, les loyers ont augmenté de 10 %.', alt: ['Selon le document A, les loyers ont augmenté de 10 %'], explanation: 'attribution frame + the B2 statistics verb (augmenter de). No opinion markers.' },
            { prompt: 'Whereas B stresses delays, C praises prevention.', answer: 'Tandis que B insiste sur les délais, C vante la prévention.', explanation: 'tandis que sets the sources against each other; insister sur / vanter — analytic verbs.' },
            { prompt: 'It emerges from the documents that the system is underfunded.', answer: 'Il ressort des documents que le système est sous-financé.', explanation: 'il ressort de + que + indicative — the emergence frame; sous-financé keeps the nominalized accusation.' },
            { prompt: 'The author wrote that awareness was growing.', answer: 'L\u2019auteure a écrit que la prise de conscience grandissait.', explanation: 'past reporter → imparfait (grandissait); nominalized subject la prise de conscience.' },
            { prompt: 'Along the same lines, the editorial mentions prevention.', answer: 'Dans le même ordre d\u2019idées, l\u2019éditorial évoque la prévention.', explanation: 'convergence frame; évoquer = mention (formal register of synthesis prose).' },
            { prompt: 'These convergences mask a disagreement on funding.', answer: 'Ces convergences masquent un désaccord sur le financement.', explanation: 'masquer — the analysis verb; nominalized object (le financement), no clause.' },
        ],
        blanks: [
            { prompt: '______ le document A, la pénurie s\u2019explique par la démographie.', answer: 'D\u2019après', alt: ['Selon'], explanation: 'Both attribution frames are correct; no preposition doubling (never selon à / d\u2019après de).' },
            { prompt: 'Tandis que A insiste sur le coût, B met en ______ les gains.', answer: 'avant', explanation: 'mettre en avant = put forward — the balanced pair with insister sur.' },
            { prompt: 'Il ______ de l\u2019ensemble que le constat est partagé.', answer: 'ressort', explanation: 'il ressort de = it emerges from; fixed impersonal frame, indicative after que.' },
            { prompt: 'L\u2019éditorialiste a souligné que la mise en œuvre ______ (être) lente.', answer: 'était', explanation: 'Past reporter → backshift to imparfait. (B1:discours inside synthesis.)' },
            { prompt: 'La ______ de conscience politique constitue le point commun.', answer: 'prise', explanation: 'la prise de conscience — nominalized from prendre conscience.' },
            { prompt: 'Ces convergences ______ néanmoins une divergence de fond.', answer: 'masquent', explanation: 'masquer — analytic voice; the synthesis names what it sees, without judging.' },
        ],
        corrections: [
            { prompt: 'Selon à l\u2019auteure, le système est sous-financé.', answer: 'Selon l\u2019auteure, le système est sous-financé.', explanation: 'How the mistake happens: keeping à after selon. Why it does not work: selon and d\u2019après take their source directly — no preposition. How to fix it: selon l\u2019auteure / d\u2019après l\u2019auteure.' },
            { prompt: 'Je pense que le document B a raison sur tout.', answer: 'La thèse du document B paraît la mieux étayée des trois.', explanation: 'How the mistake happens: personal opinion inside a synthesis. Why it does not work: the task grades neutrality. How to fix it: comparative attribution — which thesis is better supported, stated impersonally.' },
            { prompt: 'L\u2019auteure a souligné que le système est sous-financé.', answer: 'L\u2019auteure a souligné que le système était sous-financé.', explanation: 'How the mistake happens: keeping present under a past reporter. Why it does not work: the backshift machine from B1:discours applies. How to fix it: était. (Present reporter: l\u2019auteure souligne que le système est…)' },
            { prompt: 'Il ressort de l\u2019ensemble que les délais d\u2019attente s\u2019allongent, ont écrit les journalistes.', answer: 'Les journalistes ont écrit que les délais d\u2019attente s\u2019allongeaient.', explanation: 'How the mistake happens: hanging the reporter after an unattributed claim. Why it does not work: the attribution must come first (or be clearly framed). How to fix it: reporter first, reported clause backshifted.' },
            { prompt: 'Les documents sont très intéressants et je les ai beaucoup aimés.', answer: 'Les documents convergent sur le diagnostic tout en divergeant sur les solutions.', explanation: 'How the mistake happens: book-review voice. Why it does not work: synthesis prose describes content, not your enjoyment. How to fix it: state what the texts do (converger, diverger) with analytic verbs.' },
        ],
        writing: {
            task: 'Write a synthesis (120–160 words) of three imagined sources on remote work: open with the shared problématique (no opinion), attribute every claim (d\u2019après A…, selon B…), include one past-reporter backshift, two nominalizations (la prise de conscience, la mise en place…), one tandis que divergence and one convergence frame, closing with il ressort de l\u2019ensemble que…. Zero first person, zero verbatim.',
            requirements: [
                'Attribution frame on every claim (selon / d\u2019après)',
                'One past reporter with correct backshift',
                'Two nominalized reformulations',
                'One tandis que divergence + one convergence connector',
                'No first person, no copied sentences',
            ],
            minWords: 110,
        },
        checklist: [
            'I attribute every idea to its source before reporting it',
            'I backshift under past reporters (a écrit que … était)',
            'I nominalize clauses (prendre conscience → la prise de conscience)',
            'I mark convergence (dans le même ordre d\u2019idées) and divergence (tandis que)',
            'I keep my own voice and outside knowledge out of the synthesis',
            'I reformulate instead of copying — every sentence new words',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Attribution kit: selon X (light, courant) · d\u2019après X (slightly literary) · X souligne/soutient/rappelle que · il ressort de X que · selon lequel (relative form: le rapport selon lequel…). No preposition doubling.',
            examples: [
                { fr: 'Selon A, … · D\u2019après B, … · Il ressort du rapport que…', en: 'three frames, one voice' },
            ],
        },
        {
            explanation: 'Convergence connectors: dans le même ordre d\u2019idées · de même · à l\u2019instar de · B va dans le même sens · les textes convergent sur. Group agreeing sources into one sentence.',
            examples: [
                { fr: 'B et C, à l\u2019instar de A, dénoncent le sous-financement.', en: 'three sources, one clause' },
            ],
        },
        {
            explanation: 'Divergence connectors: tandis que · à l\u2019inverse · là où A voit…, B voit… · B minimise / relativise / conteste. Set the sources against each other — that contrast is the graded content.',
            examples: [
                { fr: 'Là où A salue la mesure, la conteste en raison de son coût.', en: 'the A-vs-B hinge' },
            ],
        },
        {
            explanation: 'Nominalization patterns: prendre conscience → la prise de conscience · mettre en place → la mise en place · mettre en œuvre → la mise en œuvre · être sous-financé → le sous-financement · les habitants s\u2019opposent → l\u2019opposition des habitants.',
            examples: [
                { fr: 'la prise de conscience · la mise en œuvre · le sous-financement', en: 'three upgrades' },
            ],
        },
        {
            explanation: 'Analytic verbs of synthesis prose: traiter de, évoquer, souligner, insister sur, mettre l\u2019accent sur, dénoncer, vanter, minimiser, relativiser, masquer, révéler. These verbs ARE the register.',
            examples: [
                { fr: 'B relativise l\u2019impact ; C dénonce une communication tardive.', en: 'two verbs doing the analysis' },
            ],
        },
        {
            explanation: 'The neutrality rule: judgments appear only as attributed comparisons — la thèse de B paraît mieux étayée · le constat de A est le plus nuancé. Never je pense / il est clair que inside the synthesis.',
            examples: [
                { fr: 'La position de C paraît la plus nuancée des trois.', en: 'the only judgment allowed' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'corpus': { en: 'body of documents', pron: 'kor-PUSS', gender: 'masculine', plural: 'corpus (invariable)', type: 'noun', register: 'formal', note: 'exam word: le corpus des documents.' },
        'd\u2019après': { en: 'according to', pron: 'dah-PRAY', type: 'particle', register: 'formal', note: 'd\u2019après + source, no preposition doubling. Also d\u2019après toi ? = what do you think?' },
        'souligne': { en: 'stresses (present of souligner)', pron: 'soo-LEE-nyuh', type: 'verb', base: { form: 'souligner', en: 'to stress' }, note: 'l\u2019auteure souligne que + indicative — attribution workhorse.' },
        'thèse': { en: 'thesis / claim', pron: 'TEHZ', gender: 'feminine', plural: 'thèses', type: 'noun', register: 'formal', note: 'la thèse de B paraît mieux étayée — the graded comparison.' },
        'problématique': { en: 'the core question at stake', pron: 'proh-blem-ah-TEEK', gender: 'feminine', plural: 'problématiques', type: 'noun', register: 'formal', note: 'French academic word for "the real question" — noun or adjective.' },
        'confronter': { en: 'to compare / confront', pron: 'kohn-frohn-TAY', type: 'verb', register: 'formal', note: 'confronter les points de vue = set the sources side by side.' },
        'tandis que': { en: 'whereas', pron: 'tahn-DEE kuh', type: 'phrase', register: 'formal', note: 'divergence frame; + indicative. Lighter than alors que in some styles.' },
        'ordre d\u2019idées': { en: 'line of thought', pron: 'ord day-DEH', gender: 'masculine', type: 'phrase', note: 'dans le même ordre d\u2019idées = along the same lines (convergence).' },
        'prise de conscience': { en: 'growing awareness', pron: 'preez duh kohn-see-AHNSS', gender: 'feminine', type: 'phrase', register: 'formal', note: 'nominalized prendre conscience — the model reformulation.' },
        'ressort': { en: 'emerges (il ressort de)', pron: 'ruh-SOR', type: 'verb', base: { form: 'ressortir (à)', en: 'to emerge from' }, note: 'il ressort de X que… — fixed impersonal frame, indicative.' },
        'sous-financé': { en: 'underfunded', pron: 'soo-fee-nahn-SAY', type: 'adjective', fem: { word: 'sous-financée', en: 'underfunded (fem)' }, note: 'sous- + financed: the nominalized accusation is le sous-financement.' },
        'mise en œuvre': { en: 'implementation', pron: 'meez ahn UH-vruh', gender: 'feminine', type: 'phrase', register: 'formal', note: 'la mise en œuvre prend du retard — nominalized mettre en œuvre.' },
        'éditorial': { en: 'editorial / op-ed', pron: 'ay-dee-toh-RYAHL', gender: 'masculine', plural: 'éditoriaux', type: 'noun', register: 'formal', note: 'irregular plural in -aux; l\u2019éditorialiste writes it.' },
        'évoquer': { en: 'to mention / evoke', pron: 'ay-voh-KAY', type: 'verb', register: 'formal', note: 'évoque la pénurie — the synthesis verb for "talks about".' },
        'masquer': { en: 'to mask / hide', pron: 'mahs-KAY', type: 'verb', register: 'formal', note: 'ces convergences masquent une divergence — analysis verb.' },
        'étayé': { en: 'supported / backed up (by evidence)', pron: 'ay-tah-YAY', type: 'adjective', fem: { word: 'étayée', en: 'supported (fem)' }, note: 'une thèse bien étayée — the evidence-quality adjective of debates.' },
        'relativiser': { en: 'to put into perspective / downplay', pron: 'ruh-lah-tee-vee-ZAY', type: 'verb', register: 'formal', note: 'B relativise l\u2019impact — the measured-disagreement verb.' },
        'minimiser': { en: 'to minimize / downplay', pron: 'mee-nee-mee-ZAY', type: 'verb', register: 'formal', note: 'stronger than relativiser — B minimise le rôle des prix.' },
        'trancher': { en: 'to rule / decide decisively', pron: 'trahn-SHAY', type: 'verb', register: 'formal', note: 'confronter sans trancher — compare without ruling (synthesis rule).' },
        'dépassé': { en: 'outdated / exceeded (masc)', pron: 'day-pah-SAY', type: 'adjective', fem: { word: 'dépassée', en: 'outdated (fem)' }, note: 'des chiffres dépassés; also être dépassé par les événements.' },
    },
};

// ── C1 · Formal Speaking & Debate ───────────────────────────────────────────
const c1Debat: StaticFrenchLesson = {
    title: 'Formal Speaking & Debate',
    objective: 'Speak spontaneously at C1 level — take the floor with the right opener, handle interruptions gracefully, buy thinking time with native fillers, answer the question actually asked, and close a point with force — the spoken half of the TCF\u2019s top bands.',

    vocabulary: [
        { fr: 'prendre la parole', en: 'to take the floor', pron: 'prahn-druh lah pah-ROHL', type: 'phrase', register: 'formal', example: { fr: 'Permettez-moi de prendre la parole.', en: 'Allow me to take the floor.' }, related: [{ fr: 'la parole est à…', en: 'the floor belongs to…' }] },
        { fr: 'permettez-moi d\u2019ajouter', en: 'allow me to add', pron: 'pair-meh-MWAH dah-zhoo-TAY', type: 'phrase', register: 'formal', example: { fr: 'Permettez-moi d\u2019ajouter une nuance.', en: 'Allow me to add a nuance.' }, related: [{ fr: 'j\u2019ajouterais que', en: 'I would add that' }] },
        { fr: 'pour rebondir', en: 'to build on that (debate move)', pron: 'poor ruh-bohn-DEER', type: 'phrase', register: 'formal', example: { fr: 'Pour rebondir sur ce que vient de dire Marie…', en: 'To build on what Marie just said…' }, related: [{ fr: 'dans la foulée', en: 'right after that (casual)' }] },
        { fr: 'je vous accorde que', en: 'I grant you that', pron: 'zhuh voo zah-kord kuh', type: 'phrase', register: 'formal', example: { fr: 'Je vous accorde que le délai est serré.', en: 'I grant you the deadline is tight.' }, related: [{ fr: 'force est de constater que', en: 'it must be acknowledged that' }] },
        { fr: 'sauf que', en: 'except that (the bounce-back)', pron: 'sof kuh', type: 'phrase', register: 'neutral', example: { fr: 'Je vous accorde le fond, sauf que les chiffres datent.', en: 'I grant the substance, except the figures are dated.' }, related: [{ fr: 'néanmoins', en: 'nevertheless (written twin)' }] },
        { fr: 'écoutez', en: 'look / listen (thinking-time opener)', pron: 'ay-koo-TAY', type: 'expression', register: 'neutral', example: { fr: 'Écoutez, la question est plus large.', en: 'Look, the question is broader.' }, related: [{ fr: 'voyez-vous', en: 'you see (formal filler)' }] },
        { fr: 'c\u2019est-à-dire que', en: 'that is to say (clarifying)', pron: 'seh-tah-DEER kuh', type: 'phrase', register: 'neutral', example: { fr: 'C\u2019est-à-dire que rien n\u2019est encore signé.', en: 'That is to say, nothing is signed yet.' }, related: [{ fr: 'autrement dit', en: 'in other words' }] },
        { fr: 'couper la parole', en: 'to interrupt someone', pron: 'koo-PAY lah pah-ROHL', type: 'phrase', register: 'neutral', example: { fr: 'Excusez-moi de vous couper, mais…', en: 'Sorry to cut you off, but…' }, related: [{ fr: 'laisser finir', en: 'to let finish' }] },
        { fr: 'vous posez une question essentielle', en: 'you raise an essential question (buying time)', pron: 'voo poh-ZAY ün kwes-TYOHN ah-sahn-SYEL', type: 'phrase', register: 'formal', example: { fr: 'Vous posez une question essentielle ; permettez-moi d\u2019y répondre en deux temps.', en: 'You raise an essential question; let me answer it in two parts.' }, related: [{ fr: 'excellente question', en: 'great question (softer)' }] },
        { fr: 'pour conclure', en: 'to conclude (spoken close)', pron: 'poor kohn-KLOOD', type: 'phrase', register: 'formal', example: { fr: 'Pour conclure, le jeu en vaut la chandelle.', en: 'To conclude, the game is worth the candle.' }, related: [{ fr: 'en dernière analyse', en: 'in the final analysis' }] },
        { fr: 'la reformulation', en: 'rephrasing (a debate weapon)', pron: 'lah ruh-for-mü-LAH-SYOHN', gender: 'feminine', register: 'formal', example: { fr: 'Si je comprends bien votre argument…', en: 'If I understand your argument correctly…' }, related: [{ fr: 'reformuler', en: 'to rephrase' }] },
        { fr: 'au fond', en: 'at bottom / deep down', pron: 'oh FOHN', type: 'expression', register: 'neutral', example: { fr: 'Au fond, nous voulons la même chose.', en: 'At bottom, we want the same thing.' }, related: [{ fr: 'en réalité', en: 'in reality' }] },
    ],

    pronunciation: [
        { fr: 'permettez-moi', approx: 'pair-meh-TAY MWAH', en: 'the hyphen splits the beat: per-meh-TAY + MWAH' },
        { fr: 'rebondir', approx: 'ruh-bohn-DEER', en: 'nasal -on- then clean "DEER"' },
        { fr: 'écoutez', approx: 'ay-koo-TAY', en: 'the é opens the word: "AY-koo-tay"' },
        { fr: 'c\u2019est-à-dire', approx: 'seh-tah-DEER', en: 'three glued syllables in fast speech' },
        { fr: 'force est de constater', approx: 'forseh duh kohns-tah-TAY', en: 'force est elides: "forsest"' },
        { fr: 'au fond', approx: 'oh FOHN', en: 'the d is silent — pure nasal' },
    ],

    grammar: {
        rule: 'Spoken C1 = moves, not words: take the floor (permettez-moi de…), buy time (vous posez une question essentielle…), reformulate the question before answering, concede with je vous accorde que… sauf que, and close with pour conclure. Fillers mark the register: voyez-vous (formal) vs écoutez (neutral) vs genre/du coup (casual — banned here).',
        explanation: 'Debate French is choreographed. Openings: permettez-moi de prendre la parole, si je peux me permettre, j\u2019y reviens justement. Thinking time is bought with frames, not silence: vous posez une question essentielle ; permettez-moi d\u2019y répondre en deux temps, c\u2019est une question complexe — voyez-vous… Reformulating the question before answering (si je comprends bien, vous me demandez si…) earns clarity points and steals seconds. The concession-bounce is the debate engine: je vous accorde que… sauf que… / force est de constater que…. Interruptions follow a code: excusez-moi de vous couper, mais… (polite), allowing the other to finish (je vous en prie, terminez) scores respect. Closers: pour conclure, au fond, en dernière analyse + one verdict sentence. Inversion (pouvons-nous ?) and nous (je le maintiens, nous croyons que…) mark the formal spoken register; the casual markers from B2:registre (on, du coup, genre) must not leak in.',
        examples: [
            { fr: 'Merci. Permettez-moi de prendre la parole sur ce point précis.', en: 'Thank you. Allow me to take the floor on this precise point.', breakdown: ['permettez-moi de = formal opener', 'sur ce point précis = narrowing the topic', 'no fillers — clean start'] },
            { fr: 'Vous posez une question essentielle ; permettez-moi d\u2019y répondre en deux temps.', en: 'You raise an essential question; let me answer it in two parts.', breakdown: ['buys seconds gracefully', 'en deux temps = in two stages', 'y responds to la question'] },
            { fr: 'Si je comprends bien, vous me demandez si le coût est justifié — c\u2019est bien cela ?', en: 'If I understand correctly, you\u2019re asking whether the cost is justified — is that right?', breakdown: ['reformulation frame', 'si… bien = checking understanding', 'c\u2019est bien cela ? = confirming politely'] },
            { fr: 'Je vous accorde que le délai est serré ; sauf que la méthode a déjà fait ses preuves.', en: 'I grant you the deadline is tight; except the method has already proven itself.', breakdown: ['accorde… sauf que = concede, bounce', 'faire ses preuves = prove itself (idiom)', 'two moves in one sentence'] },
            { fr: 'Excusez-moi de vous couper, mais les données disent l\u2019inverse — je vous en prie, terminez.', en: 'Sorry to cut you off, but the data says otherwise — please, go ahead and finish.', breakdown: ['polite interruption formula', 'the self-correction restores courtesy', 'data-based rebuttal'] },
            { fr: 'Pour conclure : au fond, le désaccord porte sur le calendrier, non sur le principe.', en: 'To conclude: at bottom, the disagreement is about timing, not principle.', breakdown: ['pour conclure + au fond = double close', 'porter sur = concern (debate verb)', 'the precision close'] },
        ],
        commonMistakes: [
            'Answering before reformulating: at C1 the grader listens for si je comprends bien… — answering cold reads as improvisation, not command.',
            'Casual fillers in formal speech: du coup, genre, quoi leak in from daily speech and instantly drop the register. Their formal replacements: par conséquent, notamment, en somme.',
            'Interrupting without the code: butting in with mais non ! loses the room. Excusez-moi de vous couper, puis-je…? keeps authority AND courtesy.',
            'Closing without a verdict: pour conclure must be followed by one precise sentence — a trailing donc voilà is a B2 tell, not a C1 close.',
        ],
    },

    transformations: [
        { type: 'Casual opener', fr: 'Bon, ben moi je dirais que…', en: 'Well, I\u2019d say…' },
        { type: 'Formal opener', fr: 'Permettez-moi de prendre la parole.', en: 'Allow me to take the floor.' },
        { type: 'Cold answer', fr: 'Le coût est trop élevé.', en: 'The cost is too high.' },
        { type: 'Framed answer', fr: 'Vous posez une question essentielle : le coût. Permettez-moi de la décomposer.', en: 'You raise an essential question: the cost. Allow me to break it down.' },
        { type: 'Concede + bounce', fr: 'Je vous accorde le principe ; sauf que l\u2019exécution coince.', en: 'I grant the principle; except the execution jams.' },
        { type: 'Interruption', fr: 'Excusez-moi de vous couper — une précision s\u2019impose.', en: 'Sorry to cut in — a clarification is needed.' },
        { type: 'Casual close', fr: 'Bref, on verra.', en: 'Anyway, we\u2019ll see.' },
        { type: 'Formal close', fr: 'Pour conclure, le désaccord porte sur le calendrier, non sur le principe.', en: 'To conclude, the disagreement is about timing, not principle.' },
    ],

    sentenceBuilding: [
        { fr: 'Merci de cette question.', en: 'Thank you for that question.' },
        { fr: 'Merci de cette question ; permettez-moi de reformuler pour être sûr de bien y répondre.', en: 'Thank you for that question; allow me to rephrase to be sure I answer it well.' },
        { fr: 'Si je comprends bien, vous me demandez si la mesure est finançable à court terme.', en: 'If I understand correctly, you\u2019re asking whether the measure is fundable in the short term.' },
        { fr: 'Je vous accorde que le financement est le point sensible ; sauf que les économies réalisées dès la deuxième année compensent l\u2019effort initial.', en: 'I grant that funding is the sore point; except the savings from year two offset the initial effort.' },
        { fr: 'Pour conclure : au fond, nous ne différons que sur l\u2019échéance — le principe, lui, ne divise plus personne.', en: 'To conclude: at bottom we differ only on the timeline — the principle divides no one anymore.' },
    ],

    practice: [
        { instruction: 'Choose the register:', question: 'Filler for a formal panel: écoutez / genre / du coup ?', answer: 'écoutez — genre and du coup are casual' },
        { instruction: 'Buy time:', question: 'You\u2019re asked a hard question. One frame + one move.', answer: 'Vous posez une question essentielle ; permettez-moi d\u2019y répondre en deux temps.' },
        { instruction: 'Concede and bounce:', question: 'the deadline is tight BUT the method works.', answer: 'Je vous accorde que le délai est serré ; sauf que la méthode a fait ses preuves.' },
        { instruction: 'Interruption code:', question: 'Cut in politely.', answer: 'Excusez-moi de vous couper, mais… — then offer the floor back' },
        { instruction: 'Reformulate:', question: 'Check you understood a question about funding.', answer: 'Si je comprends bien, vous me demandez si… — c\u2019est bien cela ?' },
        { instruction: 'Close with a verdict:', question: 'One sentence, disagreement about timing not principle.', answer: 'Pour conclure : le désaccord porte sur le calendrier, non sur le principe.' },
    ],

    translationPractice: [
        { en: 'Allow me to add one nuance. (formal)', fr: 'Permettez-moi d\u2019ajouter une nuance.' },
        { en: 'To build on what was just said… (debate move)', fr: 'Pour rebondir sur ce qui vient d\u2019être dit…' },
        { en: 'I grant you the principle; except the timeline is unrealistic.', fr: 'Je vous accorde le principe ; sauf que l\u2019échéance est irréaliste.' },
        { en: 'Sorry to cut you off — may I finish my point first?', fr: 'Excusez-moi de vous couper — puis-je terminer mon idée ?' },
        { en: 'That is to say, nothing is decided yet.', fr: 'C\u2019est-à-dire que rien n\u2019est encore décidé.' },
        { en: 'To conclude: the disagreement is about means, not ends.', fr: 'Pour conclure : le désaccord porte sur les moyens, non sur les fins.' },
    ],

    reverseTranslation: [
        { fr: 'Si je comprends bien, vous me demandez si le budget tiendra.', en: 'If I understand correctly, you\u2019re asking whether the budget will hold.' },
        { fr: 'Force est de constater que l\u2019opposition faiblit.', en: 'It must be acknowledged that opposition is weakening.' },
        { fr: 'Au fond, nous voulons la même chose à des échéances différentes.', en: 'At bottom, we want the same thing on different timelines.' },
        { fr: 'La parole est à notre invitée.', en: 'The floor belongs to our guest.' },
    ],

    register: {
        informal: 'Ben écoute, franchement, c\u2019est pas faux, mais du coup… ouais, on verra. (friends debating — every marker is casual)',
        neutral: 'Écoutez, c\u2019est une vraie question ; je répondrais en deux temps.',
        formal: 'Permettez-moi de reformuler votre question, car elle touche au cœur du dossier : la soutenabilité du financement.',
    },

    culture: 'Radio France (France Inter, France Culture) is the national gymnasium of formal spoken French: chroniqueurs take the floor, concede, bounce and close in polished sentences you can steal whole. The TCF\u2019s top oral bands reward exactly this choreography — the examinateur hears whether you manage turns, reformulate and close. Canadians hear the same code in parliamentary committee coverage on Radio-Canada; watch five minutes and count the je vous accorde que\u2019s.',

    freeProduction: 'Record a 2-minute debate answer on: "Faut-il limiter le travail par écran le soir ?" Use the full choreography once each: formal opener (permettez-moi de…), thinking-time frame (vous posez une question essentielle…), reformulation (si je comprends bien…), concede-bounce (je vous accorde… sauf que…), and a verdict close (pour conclure : le désaccord porte sur…, non sur…).',

    miniTest: [
        { question: 'Formal thinking-time frame:', options: ['attends, attends', 'vous posez une question essentielle', 'ben voyons', 'du coup…'], answer: 'vous posez une question essentielle — buys seconds with respect' },
        { question: 'The debate bounce pair is:', options: ['certes… mais', 'je vous accorde… sauf que', 'd\u2019une part… d\u2019autre part', 'si… alors'], answer: 'je vous accorde… sauf que — spoken concession-bounce' },
        { question: 'Polite interruption:', options: ['mais non !', 'excusez-moi de vous couper', 'tais-toi', 'c\u2019est faux'], answer: 'excusez-moi de vous couper — authority with courtesy' },
        { question: 'Filler banned in formal speech:', options: ['voyez-vous', 'écoutez', 'du coup', 'autrement dit'], answer: 'du coup — casual; par conséquent is its formal twin' },
        { question: 'A C1 close must contain:', options: ['a new question', 'a precise verdict', 'a joke', 'a citation'], answer: 'a precise verdict — one sentence naming where the disagreement really lies' },
    ],

    review: [
        'The formal register dials from B2:registre (nous, ne kept, inversion) apply to everything you say aloud in this lecture.',
        'The certes… mais hinge from B2:argumentation has a spoken twin: je vous accorde que… sauf que…',
    ],

    traps: [
        'Filler slippage: du coup, genre, quoi, ouais belong to friends. In panels use voyez-vous, écoutez, par conséquent — record yourself and audit.',
        'The reformulation is not optional ceremony: misread the question and the whole answer scores on the wrong axis — confirm with c\u2019est bien cela ?',
        'Interruptions have a code: cut with excusez-moi de vous couper, then yield (je vous en prie). Cutting twice in a turn loses the room.',
        'Inversion is spoken formality\u2019s crown (puis-je, pouvons-nous) — overuse sounds stilted; reserve it for openers and key requests.',
    ],

    homework: {
        intro: 'Every item is a spoken move: opener, time-buyer, concession-bounce, interruption, or close. Answer as if a microphone were live.',
        translation: [
            { prompt: 'Allow me to take the floor on this point. (formal)', answer: 'Permettez-moi de prendre la parole sur ce point.', explanation: 'permettez-moi de + infinitive; the vous-form opener of panels. Contrast: je peux parler ? (casual).' },
            { prompt: 'You raise an essential question; let me answer in two parts.', answer: 'Vous posez une question essentielle ; permettez-moi d\u2019y répondre en deux temps.', explanation: 'y responds to la question (à la question → y). en deux temps = in two stages — the time-buying close.' },
            { prompt: 'If I understand correctly, you\u2019re asking whether the cost is justified.', answer: 'Si je comprends bien, vous me demandez si le coût est justifié.', explanation: 'reformulation frame; demander si + indicative — reported yes/no question (B1:discours, present reporter).' },
            { prompt: 'I grant you the deadline is tight; except the method has proven itself.', answer: 'Je vous accorde que le délai est serré ; sauf que la méthode a fait ses preuves.', explanation: 'accorde que + indicative (a real concession); sauf que bounces; faire ses preuves = prove itself.' },
            { prompt: 'Sorry to cut you off, but the data says otherwise.', answer: 'Excusez-moi de vous couper, mais les données disent le contraire.', alt: ['Excusez-moi de vous couper, mais les données disent l’inverse'], explanation: 'the interruption code; dire le contraire / l\u2019inverse — both idiomatic.' },
            { prompt: 'To conclude: at bottom, the disagreement is about timing.', answer: 'Pour conclure : au fond, le désaccord porte sur le calendrier.', explanation: 'double close (pour conclure + au fond); porter sur = concern — the debate verb for "is about".' },
        ],
        blanks: [
            { prompt: '______-moi d\u2019ajouter une précision.', answer: 'Permettez', explanation: 'permettez-moi de + infinitive — the formal floor-opener. Casual twin: je peux ajouter un truc ?' },
            { prompt: 'Pour ______ sur ce que vient de dire Karim…', answer: 'rebondir', explanation: 'rebondir sur = build on (a debate move that credits the previous speaker).' },
            { prompt: 'Si je comprends ______, vous me demandez si le budget tiendra.', answer: 'bien', explanation: 'si je comprends bien — the checking frame before every substantive answer.' },
            { prompt: 'Je vous ______ que le délai est serré ; sauf que…', answer: 'accorde', explanation: 'accorder QUE + indicative — a concession to a real point, then the bounce.' },
            { prompt: 'Excusez-moi de vous ______, mais une précision s\u2019impose.', answer: 'couper', explanation: 'couper la parole à quelqu\u2019un — always wrapped in excusez-moi in formal settings.' },
            { prompt: 'Pour conclure : le désaccord ______ sur les moyens, non sur les fins.', answer: 'porte', explanation: 'porter sur = concern/be about — the precise close; non sur contrasts the object.' },
        ],
        corrections: [
            { prompt: 'Bon, du coup, pour répondre à votre question… (formal panel)', answer: 'Écoutez, pour répondre à votre question… / Permettez-moi de répondre.', explanation: 'How the mistake happens: casual fillers carried onto a panel. Why it does not work: du coup is the register stamp of friends. How to fix it: écoutez (neutral) or permettez-moi de (formal).' },
            { prompt: 'Non non non, c\u2019est faux ! Vous avez tout faux !', answer: 'Je vous accorde le fond, sauf que les chiffres disent l\u2019inverse.', explanation: 'How the mistake happens: frontal contradiction. Why it does not work: blunt negation loses the room and the argument. How to fix it: concede a real part, then bounce with evidence.' },
            { prompt: 'Si je comprends bien, vous me demandez que je réponde vite.', answer: 'Si je comprends bien, vous me demandez de répondre rapidement.', explanation: 'How the mistake happens: que after a reported request. Why it does not work: requests report with de + infinitive (B1:discours). How to fix it: vous me demandez de + infinitive.' },
            { prompt: 'Pour conclure… donc voilà, merci.', answer: 'Pour conclure : le désaccord porte sur le calendrier, non sur le principe.', explanation: 'How the mistake happens: trailing off at the close. Why it does not work: the close is the most-remembered sentence — donc voilà is a B2 tell. How to fix it: one precise verdict sentence.' },
            { prompt: 'Puis-je vous coupe la parole une seconde ?', answer: 'Puis-je vous couper la parole une seconde ?', explanation: 'How the mistake happens: infinitive slip under pressure. Why it does not work: couper stays infinitive after pouvoir (puis-je + INF). How to fix it: couper — and keep the courtesy frame intact.' },
        ],
        writing: {
            task: 'Write a 2-minute debate script (140–180 words) answering: "Le télétravail affaiblit-il les équipes ?" Choreograph every move once: formal opener, thinking-time frame, reformulation (si je comprends bien…), concede-bounce (je vous accorde… sauf que…), one idiom from C1:idiomes, and a verdict close (pour conclure : au fond…). Then record it aloud and audit for casual fillers.',
            requirements: [
                'All five moves present and in order',
                'One reformulation question (c\u2019est bien cela ?)',
                'One idiom used correctly',
                'Zero casual fillers (du coup, genre, quoi)',
                'One inversion (puis-je / permettez-moi) and one porter sur close',
            ],
            minWords: 130,
        },
        checklist: [
            'I open with permettez-moi de… or si je peux me permettre',
            'I buy time with frames (vous posez une question essentielle… en deux temps)',
            'I reformulate before answering (si je comprends bien… c\u2019est bien cela ?)',
            'I concede and bounce (je vous accorde… sauf que…)',
            'I interrupt by the code (excusez-moi de vous couper… je vous en prie)',
            'I close with a precise verdict (pour conclure : … porte sur X, non sur Y)',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The five moves in order: OPEN (permettez-moi de prendre la parole) · BUY (vous posez une question essentielle… en deux temps) · CHECK (si je comprends bien… c\u2019est bien cela ?) · BOUNCE (je vous accorde… sauf que…) · CLOSE (pour conclure : … porte sur…). Rehearse as one choreography.',
            examples: [
                { fr: 'Permettez-moi… · Vous posez… · Si je comprends bien… · Je vous accorde… sauf que… · Pour conclure…', en: 'the whole dance in five lines' },
            ],
        },
        {
            explanation: 'Filler register map: FORMAL — voyez-vous, permettez-moi, par conséquent; NEUTRAL — écoutez, c\u2019est-à-dire, autrement dit; CASUAL (banned in panels) — du coup, genre, quoi, ouais, ben.',
            examples: [
                { fr: 'Du coup → par conséquent · genre → notamment · quoi → en somme', en: 'the upgrade table' },
            ],
        },
        {
            explanation: 'Concession-bounce kit: je vous accorde que… sauf que… · force est de constater que… · soit, mais… · je vous suivrais si…. Each pairs a real concession with a sharper return.',
            examples: [
                { fr: 'Force est de constater que le délai a tenu ; sauf qu\u2019il a coûté cher.', en: 'the formal pair' },
            ],
        },
        {
            explanation: 'Turn management: prendre la parole (take the floor), céder la parole (yield it), couper la parole (cut in — always excused), donner raison/tort à (grant the point to). The vocabulary of fairness.',
            examples: [
                { fr: 'Je cède la parole à ma collègue. · Vous me donnez raison sur le fond.', en: 'floor verbs' },
            ],
        },
        {
            explanation: 'Debate verbs: porter sur (be about), faire valoir (argue), s\u2019inscrire en faux (flatly contradict — the strongest formal disagreement), récuser (reject as inadmissible), nuancer (qualify). Deploy one per turn for precision.',
            examples: [
                { fr: 'Je m\u2019inscris en faux contre ce chiffre. (= I flatly dispute it)', en: 'the strongest formal disagreement' },
            ],
        },
        {
            explanation: 'The verdict close template: Pour conclure : au fond, le désaccord porte sur [X], non sur [Y]. One sentence, two nouns, no trailing donc voilà.',
            examples: [
                { fr: 'Pour conclure : le débat porte sur l\u2019échéance, non sur le principe.', en: 'the closing formula' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'prendre la parole': { en: 'to take the floor', pron: 'prahn-druh lah pah-ROHL', type: 'phrase', register: 'formal', note: 'la parole = speech/word; céder la parole = yield the floor.' },
        'rebondir': { en: 'to bounce back / build on', pron: 'ruh-bohn-DEER', type: 'verb', register: 'formal', note: 'rebondir sur + what was said — credits the other speaker while steering.' },
        'accorde': { en: 'grant (present of accorder)', pron: 'ah-kord', type: 'verb', base: { form: 'accorder', en: 'to grant' }, note: 'je vous accorde que + indicative — a concession to a real point.' },
        'sauf que': { en: 'except that', pron: 'sof kuh', type: 'phrase', note: 'the spoken bounce-back after a concession; written twin: néanmoins.' },
        'couper la parole': { en: 'to interrupt', pron: 'koo-PAY lah pah-ROHL', type: 'phrase', note: 'always wrapped: excusez-moi de vous couper.' },
        's\u2019imposer': { en: 'to be necessary / impose itself', pron: 'seem-POH-zay', type: 'verb', register: 'formal', note: 'une précision s\u2019impose = a clarification is needed.' },
        'au fond': { en: 'at bottom / essentially', pron: 'oh FOHN', type: 'expression', note: 'the deep-issue marker of closings; au fond de = at the bottom of (literal).' },
        'porter sur': { en: 'to concern / be about', pron: 'por-TAY sür', type: 'verb', register: 'formal', note: 'le désaccord porte sur… — names precisely what a debate is about.' },
        'faire ses preuves': { en: 'to prove itself', pron: 'fehr say PRUHV', type: 'expression', note: 'la méthode a fait ses preuves — evidence idiom of debates.' },
        'donner raison à': { en: 'to prove someone right / concede the point', pron: 'doh-nay ray-ZOHN ah', type: 'expression', note: 'vous me donnez raison sur le fond — fairness vocabulary.' },
        's\u2019inscrire en faux': { en: 'to flatly dispute (formal)', pron: 'seen-skree-RAHN FOH', type: 'expression', register: 'formal', note: 'je m\u2019inscris en faux contre ce chiffre — the strongest polite contradiction.' },
        'faire valoir': { en: 'to put forward / argue', pron: 'fehr vah-LWAHR', type: 'expression', register: 'formal', note: 'elle fait valoir que… — the formal argue verb.' },
        'soutenabilité': { en: 'sustainability / viability', pron: 'soo-tuh-nah-bee-lee-TAY', gender: 'feminine', type: 'noun', register: 'formal', note: 'la soutenabilité du financement — administrative-abstraction style.' },
        'échéance': { en: 'deadline / due date', pron: 'ay-shay-AHNSS', gender: 'feminine', plural: 'échéances', type: 'noun', register: 'formal', note: 'l\u2019échéance est serrée = the deadline is tight.' },
        'invitée': { en: 'guest (fem — invited person)', pron: 'an-vee-TAY', gender: 'feminine', plural: 'invités/invitées', type: 'noun', masc: { word: 'invité', en: 'guest (masc)' }, note: 'la parole est à notre invitée — panel language.' },
        'deux temps': { en: 'two stages (en deux temps)', pron: 'duh TAHN', gender: 'masculine', type: 'phrase', note: 'répondre en deux temps = answer in two parts — the time-buying frame.' },
        'reformulation': { en: 'rephrasing', pron: 'ruh-for-mü-LAH-SYOHN', gender: 'feminine', plural: 'reformulations', type: 'noun', register: 'formal', note: 'the C1 weapon: restate the question, then answer.' },
        'procédé': { en: 'method / move', pron: 'proh-SUH-day', gender: 'masculine', plural: 'procédés', type: 'noun', note: 'ce procédé est classique — naming the rhetorical move.' },
        'en dernière analyse': { en: 'in the final analysis', pron: 'ahn dair-NYEHR ah-nah-LEEZ', type: 'phrase', register: 'formal', note: 'closing variant of pour conclure — slightly more written.' },
        'justifié': { en: 'justified (masc)', pron: 'zhüs-tee-FYAY', type: 'adjective', fem: { word: 'justifiée', en: 'justified (fem)' }, note: 'le coût est-il justifié ? — the classic debate question.' },
    },
};

export const STATIC_C1_PART1: Record<string, StaticFrenchLesson> = {
    'C1:idiomes': c1Idiomes,
    'C1:synthese': c1Synthese,
    'C1:debat': c1Debat,
};
