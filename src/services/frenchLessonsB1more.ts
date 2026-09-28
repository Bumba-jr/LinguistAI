// B1 lectures part 2 — Immigration & Settlement (TCF Canada theme),
// Opinions & Arguments, Reported Speech. Same gold-standard format:
// full lesson + traps + homework (A–D) + checklistRemedial + glossary.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── B1 · Immigration & Settlement ───────────────────────────────────────────
const b1Immigration: StaticFrenchLesson = {
    title: 'Immigration & Settlement',
    objective: 'Handle the TCF Canada\u2019s signature themes — housing, official documents, appointments, services and community — with the formal register that immigration offices expect: il faut + devoir constructions, polite written requests, and depuis + present for your situation.',

    vocabulary: [
        { fr: 'le logement', en: 'housing / accommodation', pron: 'luh lohzh-MAHN', gender: 'masculine', register: 'neutral', example: { fr: 'Le logement est cher à Toronto.', en: 'Housing is expensive in Toronto.' }, related: [{ fr: 'se loger', en: 'to find lodging' }] },
        { fr: 'le loyer', en: 'the rent', pron: 'luh lwah-YAY', gender: 'masculine', register: 'neutral', example: { fr: 'Le loyer est de 1 200 $ par mois.', en: 'The rent is $1,200 a month.' }, related: [{ fr: 'le bail', en: 'the lease' }] },
        { fr: 'le propriétaire', en: 'the landlord / owner', pron: 'luh proh-pree-yeh-TEHR', gender: 'masculine', register: 'neutral', example: { fr: 'Le propriétaire a augmenté le loyer.', en: 'The landlord raised the rent.' }, related: [{ fr: 'la propriétaire', en: 'the landlady' }] },
        { fr: 'le locataire', en: 'the tenant', pron: 'luh loh-kah-TEHR', gender: 'masculine', register: 'neutral', example: { fr: 'Le locataire doit donner un préavis.', en: 'The tenant must give notice.' }, related: [{ fr: 'le préavis', en: 'the notice period' }] },
        { fr: 'déménager', en: 'to move (house)', pron: 'day-may-nah-ZHAY', type: 'verb', register: 'neutral', example: { fr: 'Je déménage le premier du mois.', en: 'I\u2019m moving on the first of the month.' }, related: [{ fr: 'un déménagement', en: 'a move / moving day' }] },
        { fr: 'le titre de séjour', en: 'the residence permit', pron: 'luh tee-truh duh say-ZHOOR', gender: 'masculine', register: 'formal', example: { fr: 'Mon titre de séjour expire en mars.', en: 'My residence permit expires in March.' }, related: [{ fr: 'la résidence permanente', en: 'permanent residency' }] },
        { fr: 'la préfecture', en: 'the immigration/prefecture office', pron: 'lah pray-fek-TÜR', gender: 'feminine', register: 'formal', example: { fr: 'J\u2019ai rendez-vous à la préfecture.', en: 'I have an appointment at the prefecture.' }, related: [{ fr: 'la mairie', en: 'the city hall' }] },
        { fr: 'un dossier', en: 'a file / application package', pron: 'uhn doh-SYAY', gender: 'masculine', register: 'neutral', example: { fr: 'Mon dossier est complet.', en: 'My file is complete.' }, related: [{ fr: 'déposer un dossier', en: 'to submit an application' }] },
        { fr: 'un formulaire', en: 'a form', pron: 'uhn for-mü-LAIR', gender: 'masculine', register: 'neutral', example: { fr: 'Remplissez le formulaire en lettres majuscules.', en: 'Fill in the form in capital letters.' }, related: [{ fr: 'remplir', en: 'to fill in' }] },
        { fr: 'un rendez-vous', en: 'an appointment', pron: 'ruhn ruh-day VOO', gender: 'masculine', register: 'neutral', example: { fr: 'Je voudrais reporter mon rendez-vous.', en: 'I would like to reschedule my appointment.' }, related: [{ fr: 'annuler', en: 'to cancel' }] },
        { fr: 'le quartier', en: 'the neighbourhood', pron: 'luh kar-TYAY', gender: 'masculine', register: 'neutral', example: { fr: 'J\u2019habite dans un quartier calme.', en: 'I live in a quiet neighbourhood.' }, related: [{ fr: 'le voisinage', en: 'the neighbours (collective)' }] },
        { fr: 'la communauté', en: 'the community', pron: 'lah koh-mü-noo-TAY', gender: 'feminine', register: 'neutral', example: { fr: 'La communauté d\u2019accueil m\u2019a aidé.', en: 'The welcoming community helped me.' }, related: [{ fr: 's\u2019intégrer', en: 'to integrate' }] },
    ],

    pronunciation: [
        { fr: 'le loyer', approx: 'luh lwah-YAY', en: 'oy = "wah" glide — loyer rhymes with voir' },
        { fr: 'déménager', approx: 'day-may-nah-ZHAY', en: 'the g before e is a "zh" sound' },
        { fr: 'préfecture', approx: 'pray-fek-TÜR', en: 'stress stays on the final syllable' },
        { fr: 'titre de séjour', approx: 'TEE-truh duh say-ZHOOR', en: 'séjour = "say-ZHOOR", nasal-free' },
        { fr: 'locataire', approx: 'loh-kah-TEHR', en: 'final -aire = "ehr"' },
        { fr: 'rendez-vous', approx: 'rahn-day VOO', en: 'the final -z of rendez is silent' },
    ],

    grammar: {
        rule: 'Immigration French runs on obligation (il faut, devoir, être obligé de), polite written requests (je voudrais + conditionnel, je vous prie de), and depuis + PRESENT for ongoing situations.',
        explanation: 'Administrative French is systematic: obligations use il faut + infinitive or devoir (il faut renouveler le titre de séjour avant son expiration); requests use the conditional from the politeness lecture (je voudrais prendre rendez-vous, pourriez-vous m\u2019indiquer…); and your own situation uses the present with depuis because it is still running (j\u2019habite ici depuis deux ans, j\u2019attends ma carte depuis trois mois). Formal letters follow a fixed skeleton: Madame, Monsieur, (opening: Je me permets de vous écrire au sujet de…), (body: one paragraph per point), (request: Je vous prie de bien vouloir…), (closing: Je vous prie d\u2019agréer, Madame, Monsieur, l\u2019expression de mes salutations distinguées). Learn the skeleton once — every TCF Canada writing task reuses it.',
        examples: [
            { fr: 'Il faut renouveler mon titre de séjour avant mars.', en: 'My residence permit has to be renewed before March.', breakdown: ['il faut = it is necessary (impersonal)', 'renouveler = to renew', 'avant mars = before March'] },
            { fr: 'Je voudrais prendre rendez-vous pour le permis de travail.', en: 'I would like to book an appointment for the work permit.', breakdown: ['je voudrais = I would like (conditional)', 'prendre rendez-vous = to book an appointment', 'le permis de travail = work permit'] },
            { fr: 'J\u2019habite à Montréal depuis 2023.', en: 'I have lived in Montreal since 2023.', breakdown: ['j\u2019habite = I live (PRESENT — still true)', 'depuis = since', '2023 = the starting point'] },
            { fr: 'Je vous prie de bien vouloir me répondre rapidement.', en: 'I kindly ask you to reply quickly.', breakdown: ['je vous prie de = I ask you to (formal)', 'bien vouloir = to be willing', 'rapidement = quickly'] },
            { fr: 'Nous sommes obligés de tout traduire en français.', en: 'We are required to translate everything into French.', breakdown: ['être obligé de = to be required to', 'tout = everything', 'en français = into French'] },
            { fr: 'Le loyer comprend les charges.', en: 'The rent includes utilities.', breakdown: ['le loyer = the rent', 'comprend = includes', 'les charges = utilities/building fees'] },
        ],
        commonMistakes: [
            'Using the passé composé with depuis: "J\u2019ai habité ici depuis deux ans" — for a situation still true, French uses the PRESENT: j\u2019habite ici depuis deux ans.',
            'Writing je veux / envoyez-moi in official emails — administrative French expects je voudrais, je vous prie de, pourriez-vous.',
            'Confusing locataire (tenant — you) and propriétaire (landlord — they): mix them and the rental story reverses.',
            'Translating "I am here for two years" as je suis ici pour deux ans (a planned duration) instead of depuis deux ans (elapsed time so far).',
        ],
    },

    transformations: [
        { type: 'Present situation', fr: 'J\u2019attends ma carte depuis trois mois.', en: 'I\u2019ve been waiting for my card for three months.' },
        { type: 'Obligation (il faut)', fr: 'Il faut déposer le dossier avant le 15.', en: 'The file must be submitted before the 15th.' },
        { type: 'Personal duty', fr: 'Je dois fournir trois documents.', en: 'I have to provide three documents.' },
        { type: 'Written request', fr: 'Je vous prie de me transmettre une attestation.', en: 'I kindly ask you to send me a certificate.' },
        { type: 'Polite booking', fr: 'Je voudrais reporter mon rendez-vous.', en: 'I would like to reschedule my appointment.' },
        { type: 'Explain a problem', fr: 'Mon loyer a augmenté sans préavis.', en: 'My rent went up without notice.' },
        { type: 'Ask for information', fr: 'Pourriez-vous m\u2019indiquer les documents requis ?', en: 'Could you tell me the required documents?' },
        { type: 'Duration (finished)', fr: 'J\u2019ai attendu pendant six mois. (clos)', en: 'I waited for six months. (over)' },
    ],

    sentenceBuilding: [
        { fr: 'Je suis arrivé(e) au Canada en 2023.', en: 'I arrived in Canada in 2023.' },
        { fr: 'Je suis arrivé(e) au Canada en 2023 et j\u2019habite à Ottawa depuis cette date.', en: 'I arrived in Canada in 2023 and I\u2019ve lived in Ottawa since then.' },
        { fr: 'Je suis arrivé(e) au Canada en 2023, j\u2019habite à Ottawa depuis cette date, et j\u2019ai déposé mon dossier de résidence permanente il y a six mois.', en: 'I arrived in Canada in 2023, I\u2019ve lived in Ottawa since then, and I submitted my permanent-residence file six months ago.' },
        { fr: 'Aujourd\u2019hui, je voudrais savoir où en est mon dossier, car il faut que je renouvelle mon titre de séjour en mars.', en: 'Today, I would like to know where my file stands, because I need to renew my residence permit in March.' },
        { fr: 'Je vous remercie d\u2019avance pour votre aide et je vous prie d\u2019agréer, Madame, Monsieur, l\u2019expression de mes salutations distinguées.', en: 'Thank you in advance for your help, and please accept, Madam or Sir, the expression of my distinguished greetings.' },
    ],

    practice: [
        { instruction: 'Obligation:', question: 'il faut / renouveler / le bail', answer: 'Il faut renouveler le bail. — impersonal obligation + infinitive' },
        { instruction: 'Depuis + tense:', question: 'J\u2019______ (attendre) ma carte depuis avril.', answer: 'attends — still running → present + depuis' },
        { instruction: 'Written request:', question: 'je vous prier / envoyer / une attestation', answer: 'Je vous prie de bien vouloir m\u2019envoyer une attestation.' },
        { instruction: 'Polite booking:', question: 'je voudrais / annuler / mon rendez-vous', answer: 'Je voudrais annuler mon rendez-vous, s\u2019il vous plaît.' },
        { instruction: 'Who is who:', question: 'Le ______ (landlord) a refusé.', answer: 'propriétaire — the owner; the locataire is you' },
        { instruction: 'Finished duration:', question: 'J\u2019ai attendu ______ (for) six mois. (clos)', answer: 'pendant — finished duration; depuis would mean still waiting' },
    ],

    translationPractice: [
        { en: 'I have lived in this neighbourhood for two years.', fr: 'J\u2019habite dans ce quartier depuis deux ans.' },
        { en: 'You have to fill in this form in capital letters.', fr: 'Il faut remplir ce formulaire en lettres majuscules.' },
        { en: 'Could you tell me what documents are required?', fr: 'Pourriez-vous m\u2019indiquer quels documents sont requis ?' },
        { en: 'The landlord raised the rent without notice.', fr: 'Le propriétaire a augmenté le loyer sans préavis.' },
        { en: 'I would like to reschedule my appointment.', fr: 'Je voudrais reporter mon rendez-vous.' },
        { en: 'We are required to provide a proof of address.', fr: 'Nous sommes obligés de fournir une preuve de domicile.' },
    ],

    reverseTranslation: [
        { fr: 'Mon titre de séjour expire le mois prochain.', en: 'My residence permit expires next month.' },
        { fr: 'Le loyer comprend les charges et internet.', en: 'The rent includes utilities and internet.' },
        { fr: 'Je vous remercie de votre compréhension.', en: 'Thank you for your understanding.' },
        { fr: 'Il me faudrait une attestation de travail.', en: 'I would need a proof of employment.' },
    ],

    register: {
        informal: 'Je déménage le mois prochain — tu connais un camion ? (spoken: no formal frames)',
        neutral: 'J\u2019attends ma carte de résident depuis trois mois et j\u2019aimerais savoir où en est mon dossier.',
        formal: 'Je me permets de vous écrire au sujet de ma demande de résidence permanente déposée le 3 février. Je vous prie d\u2019agréer, Madame, Monsieur, l\u2019expression de mes salutations distinguées.',
    },

    culture: 'This is the TCF Canada\u2019s home ground: the exam was designed for immigration to Canada, and its reading/listening tasks are full of rental notices, government letters, and community-news items. In Quebec, settlement services run through the Ministère de l\u2019Immigration; elsewhere in Canada through IRCC. French letters you write must follow the skeleton taught here — examiners grade the frames (je vous prie de…, dans l\u2019attente de votre réponse…) as heavily as the grammar.',

    freeProduction: 'Write a formal email (10–14 lines) to a housing office about a rent increase without notice: open with the formal skeleton, give the facts in order (dates, amounts, what happened), make one request with je vous prie de / pourriez-vous, and close with the full formula. Then record a 60-second voicemail version of the same request in spoken register.',

    miniTest: [
        { question: 'J\u2019habite ici ______ deux ans.', options: ['pour', 'pendant', 'depuis', 'il y a'], answer: 'depuis — still true → present + depuis' },
        { question: 'The TENANT is:', options: ['le propriétaire', 'le locataire', 'le bail', 'le loyer'], answer: 'le locataire — the person renting' },
        { question: 'Most formal request:', options: ['Envoie-moi le document.', 'Tu peux m\u2019envoyer…?', 'Je vous prie de bien vouloir m\u2019envoyer…', 'Envoie le document vite.'], answer: 'Je vous prie de bien vouloir m\u2019envoyer…' },
        { question: 'Il faut ______ le dossier avant vendredi.', options: ['déposé', 'déposer', 'dépôt', 'dépose'], answer: 'déposer — il faut + infinitive' },
        { question: 'Le bail is:', options: ['the rent', 'the lease', 'the tenant', 'the notice'], answer: 'the lease — the contract' },
    ],

    review: [
        'The conditional politeness toolkit from B1:conditionnel is the register of every request in this lecture.',
        'depuis + present vs pendant + past comes from A2:travel — here it carries immigration situations.',
    ],

    traps: [
        'depuis + PRESENT for ongoing situations (j\u2019attends depuis trois mois); passé composé + pendant for closed ones (j\u2019ai attendu pendant trois mois).',
        'locataire vs propriétaire — tenant vs landlord. Check which side of the lease the sentence is on before answering.',
        'il faut is impersonal (il faut renouveler) but devoir carries a person (je dois renouveler) — "il faut je renouvelle" is wrong.',
        'Formal letters need the closing formula — Je vous prie d\u2019agréer… salutations distinguées — or the writing task loses register points.',
    ],

    homework: {
        intro: 'Immigration-office French: obligations, depuis + present, formal requests and the letter skeleton. Every answer uses the administrative register.',
        translation: [
            { prompt: 'I have been waiting for my residence permit for four months.', answer: 'J\u2019attends ma résidence permanente depuis quatre mois.', explanation: 'Still waiting → PRESENT + depuis. "J\u2019ai attendu… pendant" would mean the wait is over.' },
            { prompt: 'You have to renew your lease before the first of the month.', answer: 'Il faut renouveler le bail avant le premier du mois.', alt: ['Vous devez renouveler le bail avant le premier du mois'], explanation: 'Impersonal il faut + infinitive, or personal vous devez. Both administrative-correct.' },
            { prompt: 'Could you tell me where the file stands?', answer: 'Pourriez-vous m\u2019indiquer où en est mon dossier ?', explanation: 'où en est… ? = where does … stand (fixed administrative idiom).' },
            { prompt: 'The tenant must give one month\u2019s notice.', answer: 'Le locataire doit donner un préavis d\u2019un mois.', explanation: 'Personal duty with devoir. préavis = the notice period (masc).' },
            { prompt: 'I kindly ask you to send me a proof of address.', answer: 'Je vous prie de bien vouloir m\u2019envoyer une preuve de domicile.', alt: ['Je vous prie de bien vouloir m’envoyer un justificatif de domicile'], explanation: 'je vous prie de bien vouloir + infinitive — the standard written request. preuve/justificatif de domicile are both accepted.' },
            { prompt: 'We moved last spring.', answer: 'Nous avons déménagé le printemps dernier.', alt: ['Nous avons déménagé au printemps dernier'], explanation: 'One finished event → PC. déménager takes avoir.' },
        ],
        blanks: [
            { prompt: 'J\u2019______ (habiter) à Toronto depuis 2021.', answer: 'habite', explanation: 'Since 2021 and still living there → present tense with depuis.' },
            { prompt: 'Il ______ (falloir) fournir deux photos d\u2019identité.', answer: 'faut', explanation: 'il faut + infinitive. Past: il a fallu; future: il faudra.' },
            { prompt: 'Le ______ (landlord) a fixé le rendez-vous pour vendredi.', answer: 'propriétaire', explanation: 'The owner/landlord. The tenant (locataire) is the one renting.' },
            { prompt: 'Je vous prie ______ bien vouloir confirmer par courriel.', answer: 'de', explanation: 'prier DE + infinitive: je vous prie DE venir, DE confirmer…' },
            { prompt: 'Nous sommes ______ (obligé) de traduire tous les documents.', answer: 'obligés', explanation: 's\u2019accorde avec nous → obligés (plural). Obligées if the group is all women.' },
            { prompt: 'J\u2019ai déposé mon dossier il ______ trois mois. (ago)', answer: 'y a', explanation: 'il y a + duration = ago (finished point in time). Compare depuis + present (still running).' },
        ],
        corrections: [
            { prompt: 'J\u2019ai habité ici depuis deux ans.', answer: 'J\u2019habite ici depuis deux ans.', explanation: 'How the mistake happens: copying English present perfect into French. Why it does not work: the situation is still true — French keeps it in the present. How to fix it: j\u2019habite + depuis. Use passé composé + pendant only when the period is closed.' },
            { prompt: 'Le locataire a augmenté le loyer.', answer: 'Le propriétaire a augmenté le loyer.', explanation: 'How the mistake happens: swapping the two parties of the lease. Why it does not work: locataire = tenant (pays), propriétaire = landlord (charges). How to fix it: check who acts — raising rent is the owner\u2019s move.' },
            { prompt: 'Envoyez-moi vite les documents.', answer: 'Je vous prie de bien vouloir m\u2019envoyer les documents.', explanation: 'How the mistake happens: imperative + vite in writing. Why it does not work: administrative register requires the request frame. How to fix it: je vous prie de bien vouloir + infinitive.' },
            { prompt: 'Il faut que je dois renouveler mon passeport.', answer: 'Il faut que je renouvelle mon passeport. / Je dois renouveler mon passeport.', explanation: 'How the mistake happens: stacking two obligation structures. Why it does not work: il faut que + subjunctive and devoir + infinitive are alternatives, not a pair. How to fix it: pick one — the B1-safe option is je dois + infinitive.' },
            { prompt: 'Je suis ici pour deux ans.', answer: 'Je suis ici depuis deux ans.', explanation: 'How the mistake happens: translating "for two years" as pour. Why it does not work: pour marks a planned future duration; depuis marks elapsed time. How to fix it: depuis deux ans.' },
        ],
        writing: {
            task: 'Write a formal email (12–16 lines) to an immigration office: subject line, Madame, Monsieur, opening frame (je me permets de vous écrire au sujet de…), two factual paragraphs (arrival date with depuis, current status), one request (je vous prie de bien vouloir… or pourriez-vous…), closing formula (je vous prie d\u2019agréer… salutations distinguées).',
            requirements: [
                'Formal opening and closing formulas, complete',
                'At least one depuis + present sentence',
                'One obligation (il faut / je dois / être obligé de)',
                'One request in the conditional register',
                'No imperative, no je veux',
            ],
            minWords: 90,
        },
        checklist: [
            'I use depuis + PRESENT for ongoing situations and pendant + past for closed ones',
            'I know the housing words: loyer, bail, propriétaire, locataire, préavis, déménager',
            'I can build obligations three ways: il faut + inf., devoir, être obligé de',
            'I make written requests with je vous prie de bien vouloir / pourriez-vous',
            'I know the letter skeleton: opening, facts, request, closing formula',
            'I never use the imperative or je veux in administrative writing',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'depuis + present = started in the past, still true (j\u2019habite ici depuis deux ans). Passé composé + pendant = the period closed (j\u2019ai habité à Lyon pendant deux ans). il y a + duration = ago (je suis arrivé il y a deux ans).',
            examples: [
                { fr: 'J\u2019attends depuis mars. / J\u2019ai attendu pendant un mois. / J\u2019ai reçu la réponse il y a une semaine.', en: 'running · closed · ago' },
            ],
        },
        {
            explanation: 'Housing set: le logement (housing), le loyer (rent), le bail (lease), le propriétaire (landlord), le locataire (tenant), le préavis (notice), les charges (utilities), déménager (to move).',
            examples: [
                { fr: 'Le locataire paie le loyer au propriétaire selon le bail.', en: 'the whole cast in one sentence' },
            ],
        },
        {
            explanation: 'Obligations: impersonal il faut + infinitive; personal devoir + infinitive; formal être obligé de + infinitive (agrees: obligé/obligés/obligées).',
            examples: [
                { fr: 'Il faut renouveler. · Je dois renouveler. · Je suis obligé(e) de renouveler.', en: 'one duty, three frames' },
            ],
        },
        {
            explanation: 'Written requests: je voudrais… (soft opener), pourriez-vous + infinitive ? (polite question), je vous prie de bien vouloir + infinitive (letter standard).',
            examples: [
                { fr: 'Je vous prie de bien vouloir m\u2019indiquer les étapes suivantes.', en: 'the request you will reuse forever' },
            ],
        },
        {
            explanation: 'The letter skeleton: (1) Madame, Monsieur, (2) Je me permets de vous écrire au sujet de…, (3) facts in order, (4) request, (5) Dans l\u2019attente de votre réponse, je vous prie d\u2019agréer… salutations distinguées.',
            examples: [
                { fr: 'Dans l\u2019attente de votre réponse, je vous prie d\u2019agréer, Madame, Monsieur, mes salutations distinguées.', en: 'the closing formula' },
            ],
        },
        {
            explanation: 'Status idioms: où en est mon dossier ? (where does my file stand), déposer un dossier (submit an application), fournir des documents (provide documents), une preuve/justificatif de domicile (proof of address).',
            examples: [
                { fr: 'Où en est ma demande ? J\u2019ai déposé le dossier il y a deux mois.', en: 'the natural follow-up pair' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'loyer': { en: 'rent', pron: 'lwah-YAY', gender: 'masculine', type: 'noun', note: 'le loyer est de X = the rent is X' },
        'bail': { en: 'lease', pron: 'bah-yuh', gender: 'masculine', plural: 'baux', type: 'noun', note: 'irregular plural: des baux' },
        'propriétaire': { en: 'landlord / owner', pron: 'proh-pree-yeh-TEHR', gender: 'mf', type: 'noun', note: 'same form for both genders — the article changes' },
        'locataire': { en: 'tenant', pron: 'loh-kah-TEHR', gender: 'mf', type: 'noun', note: 'same form for both genders' },
        'préavis': { en: 'notice (period)', pron: 'pray-ah-VEE', gender: 'masculine', type: 'noun', note: 'sans préavis = without notice' },
        'déménager': { en: 'to move house', pron: 'day-may-nah-ZHAY', type: 'verb', note: 'déménager prend avoir: j\u2019ai déménagé' },
        'titre de séjour': { en: 'residence permit', pron: 'tee-truh duh say-ZHOOR', gender: 'masculine', type: 'noun', note: 'renewal: renouveler le titre de séjour' },
        'préfecture': { en: 'prefecture / immigration office', pron: 'pray-fek-TÜR', gender: 'feminine', type: 'noun', note: 'French system; in Canada: IRCC / le ministère' },
        'dossier': { en: 'file / application', pron: 'doh-SYAY', gender: 'masculine', type: 'noun', note: 'déposer un dossier = submit an application' },
        'formulaire': { en: 'form', pron: 'for-mü-LAIR', gender: 'masculine', type: 'noun', note: 'remplir un formulaire = fill in a form' },
        'rendez-vous': { en: 'appointment', pron: 'rahn-day VOO', gender: 'masculine', type: 'noun', note: 'invariable plural: des rendez-vous' },
        'quartier': { en: 'neighbourhood', pron: 'kar-TYAY', gender: 'masculine', type: 'noun' },
        'comprend': { en: 'includes (present of comprendre)', pron: 'kohn-PRAHN', type: 'verb', base: { form: 'comprendre', en: 'to understand / include' }, note: 'le loyer comprend les charges' },
        'renouveler': { en: 'to renew', pron: 'ruh-noo-vluh-LAY', type: 'verb', note: 'e_er verb: je renouvelle, nous renouvelons' },
        'fournir': { en: 'to provide', pron: 'foor-NEER', type: 'verb', note: 'fournir des documents = provide documents' },
        'attestation': { en: 'certificate / written proof', pron: 'ah-tehs-tah-SYOHN', gender: 'feminine', type: 'noun', note: 'demander une attestation' },
        'justificatif': { en: 'proof (document)', pron: 'jüs-tee-fee-kah-TEEF', gender: 'masculine', type: 'noun', note: 'un justificatif de domicile = proof of address' },
        'majuscules': { en: 'capital letters', pron: 'mah-zhüs-KÜL', gender: 'feminine', type: 'noun', note: 'en lettres majuscules = in block capitals' },
    },
};

// ── B1 · Opinions & Arguments ───────────────────────────────────────────────
const b1Opinions: StaticFrenchLesson = {
    title: 'Opinions & Arguments',
    objective: 'Give, soften, and defend an opinion with the connector system — cause (parce que, car, puisque), consequence (donc, alors), contrast (mais, cependant, en revanche) — and structure a two-sides answer the way the TCF speaking and writing grids reward.',

    vocabulary: [
        { fr: 'à mon avis', en: 'in my opinion', pron: 'ah mohn ah-VEE', register: 'neutral', example: { fr: 'À mon avis, c\u2019est une bonne idée.', en: 'In my opinion, it\u2019s a good idea.' }, related: [{ fr: 'selon moi', en: 'in my view' }] },
        { fr: 'je pense que', en: 'I think that', pron: 'zhuh pahnss kuh', type: 'phrase', register: 'neutral', example: { fr: 'Je pense que les téléphones aident beaucoup.', en: 'I think phones help a lot.' }, related: [{ fr: 'je crois que', en: 'I believe that' }] },
        { fr: 'parce que', en: 'because (answer to why)', pron: 'pahr-skuh', type: 'particle', register: 'neutral', example: { fr: 'J\u2019apprends le français parce que je veux travailler ici.', en: 'I\u2019m learning French because I want to work here.' }, related: [{ fr: 'car', en: 'for / because (written)' }] },
        { fr: 'puisque', en: 'since (given reason)', pron: 'püee-skuh', type: 'particle', register: 'neutral', example: { fr: 'Puisque tu es libre, aide-moi.', en: 'Since you\u2019re free, help me.' }, related: [{ fr: 'comme', en: 'as / since (fronted)' }] },
        { fr: 'donc', en: 'so / therefore', pron: 'dohnk', type: 'particle', register: 'neutral', example: { fr: 'Il pleut, donc on reste ici.', en: 'It\u2019s raining, so we\u2019re staying.' }, related: [{ fr: 'alors', en: 'so / then' }] },
        { fr: 'cependant', en: 'however', pron: 'suh-pahn-DAHN', type: 'particle', register: 'formal', example: { fr: 'Cependant, il y a un inconvénient.', en: 'However, there is a drawback.' }, related: [{ fr: 'en revanche', en: 'on the other hand' }] },
        { fr: 'en revanche', en: 'on the other hand', pron: 'ahn ruh-vahnsh', type: 'particle', register: 'formal', example: { fr: 'C\u2019est cher ; en revanche, c\u2019est rapide.', en: 'It\u2019s expensive; on the other hand, it\u2019s fast.' }, related: [{ fr: 'par contre', en: 'on the flip side (spoken)' }] },
        { fr: 'd\u2019une part… d\u2019autre part', en: 'on the one hand… on the other', pron: 'dün pahr… doh-truh pahr', type: 'phrase', register: 'formal', example: { fr: 'D\u2019une part c\u2019est utile ; d\u2019autre part, c\u2019est coûteux.', en: 'On one hand it\u2019s useful; on the other, it\u2019s costly.' }, related: [{ fr: 'premièrement… deuxièmement', en: 'first… secondly' }] },
        { fr: 'grâce à', en: 'thanks to (positive cause)', pron: 'grahs ah', type: 'phrase', register: 'neutral', example: { fr: 'Grâce à ce cours, je progresse.', en: 'Thanks to this course, I\u2019m progressing.' }, related: [{ fr: 'à cause de', en: 'because of (negative cause)' }] },
        { fr: 'à cause de', en: 'because of (negative cause)', pron: 'ah koz duh', type: 'phrase', register: 'neutral', example: { fr: 'À cause du trafic, je suis en retard.', en: 'Because of traffic, I\u2019m late.' }, related: [{ fr: 'faute de', en: 'for lack of' }] },
        { fr: 'un inconvénient', en: 'a drawback', pron: 'an in-kohn-vay-NYAN', gender: 'masculine', register: 'neutral', example: { fr: 'Le principal inconvénient, c\u2019est le prix.', en: 'The main drawback is the price.' }, related: [{ fr: 'un avantage', en: 'an advantage' }] },
        { fr: 'je suis d\u2019accord', en: 'I agree', pron: 'zhuh süee dah-KOR', type: 'phrase', register: 'neutral', example: { fr: 'Je suis d\u2019accord avec toi sur ce point.', en: 'I agree with you on this point.' }, related: [{ fr: 'je ne suis pas d\u2019accord', en: 'I disagree' }] },
    ],

    pronunciation: [
        { fr: 'parce que', approx: 'pahr-skuh', en: 'one beat in speech — "pahrskuh"' },
        { fr: 'cependant', approx: 'suh-pahn-DAHN', en: 'two nasals: sahn-DAHN' },
        { fr: 'en revanche', approx: 'ahn ruh-VAHNsh', en: 'the final -che = "sh"' },
        { fr: 'à cause de', approx: 'ah KOHZ duh', en: 's-v sound: "ah-kohz"' },
        { fr: 'd\u2019accord', approx: 'dah-kor', en: 'the d\u2019 glues onto accord' },
        { fr: 'inconvénient', approx: 'an-kohn-vay-NYAN', en: 'four syllables, stress on the last' },
    ],

    grammar: {
        rule: 'Opinion + justification: [À mon avis / Je pense que] + claim, then link your reasons with cause connectors, consequences with donc, and the other side with en revanche / cependant.',
        explanation: 'The TCF rewards structure, not just grammar. Build opinions in layers: (1) the claim — à mon avis, je pense que, il me semble que, je trouve que; (2) reasons — parce que (answer to pourquoi), car (written "for"), puisque (a reason both speakers know), comme (fronted because); (3) consequence — donc, alors, c\u2019est pourquoi; (4) the other side — mais, cependant, en revanche, par contre; (5) concession — même si, bien que (+ subjunctive, B2 preview), malgré + noun. Cause of good/bad: grâce à (positive), à cause de (negative) — choosing the wrong one flips your meaning. After je pense que / je crois que use the INDICATIVE (je pense que c\u2019est vrai); the subjunctive appears with negation and doubt (je ne pense pas que ce soit vrai — B2 preview).',
        examples: [
            { fr: 'À mon avis, le télétravail est une chance, parce qu\u2019on gagne du temps.', en: 'In my opinion, remote work is an opportunity, because you save time.', breakdown: ['à mon avis = opinion frame', 'une chance = an opportunity', 'parce qu\u2019on = because we (elision)'] },
            { fr: 'Puisque les prix montent, beaucoup de familles déménagent.', en: 'Since prices are rising, many families are moving.', breakdown: ['puisque = since (known fact)', 'montent = are rising (monter)', 'beaucoup de = many'] },
            { fr: 'Ce quartier est bruyant ; en revanche, les transports y sont parfaits.', en: 'This neighbourhood is noisy; on the other hand, transit there is perfect.', breakdown: ['en revanche = on the other hand', 'y = there (pronoun)', 'parfaits agrees with transports'] },
            { fr: 'Grâce au français, j\u2019ai trouvé un meilleur emploi ; à cause du stress, j\u2019ai dormi mal.', en: 'Thanks to French, I found a better job; because of stress, I slept badly.', breakdown: ['grâce à = thanks to (positive)', 'à cause de = because of (negative)', 'meilleur = better (irregular comparative)'] },
            { fr: 'Je suis d\u2019accord sur le fond, mais pas sur la méthode.', en: 'I agree on the substance, but not on the method.', breakdown: ['sur le fond = on the substance', 'mais = but', 'la méthode = the method'] },
            { fr: 'Il me semble que cette décision aura des conséquences.', en: 'It seems to me that this decision will have consequences.', breakdown: ['il me semble que = it seems to me that', 'cette décision = this decision', 'aura = will have (futur)'] },
        ],
        commonMistakes: [
            'Using parce que to start a clause when a full connector is wanted at the front — for a fronted reason use comme: "Comme il était tard, on est rentrés."',
            'Flipping grâce à and à cause de: grâce à = positive outcome, à cause de = negative. "À cause de toi, j\u2019ai réussi" accidentally insults.',
            'Putting a subjunctive after je pense que (affirmative): je pense que c\u2019est + indicative. The subjunctive arrives with negation or doubt.',
            'Translating "even though" as même que — the connectors are même si (+ indicative) and bien que (+ subjunctive).',
        ],
    },

    transformations: [
        { type: 'Claim', fr: 'Le français est utile au Canada.', en: 'French is useful in Canada.' },
        { type: 'Opinion frame', fr: 'À mon avis, le français est utile au Canada.', en: 'In my opinion, French is useful in Canada.' },
        { type: 'Cause', fr: 'Le français est utile parce que les deux langues sont officielles.', en: 'French is useful because both languages are official.' },
        { type: 'Consequence', fr: 'Les deux langues sont officielles, donc le français aide à trouver un emploi.', en: 'Both languages are official, so French helps find a job.' },
        { type: 'Contrast', fr: 'L\u2019apprentissage est long ; en revanche, les bénéfices sont durables.', en: 'Learning is long; on the other hand, the benefits last.' },
        { type: 'Concession', fr: 'Même si c\u2019est difficile, je continue.', en: 'Even though it\u2019s hard, I keep going.' },
        { type: 'Agreement', fr: 'Je suis tout à fait d\u2019accord avec cet argument.', en: 'I completely agree with that argument.' },
        { type: 'Disagreement', fr: 'Je ne suis pas d\u2019accord : l\u2019exemple ne prouve rien.', en: 'I disagree: the example proves nothing.' },
    ],

    sentenceBuilding: [
        { fr: 'À mon avis, apprendre une langue vaut la peine.', en: 'In my opinion, learning a language is worth it.' },
        { fr: 'À mon avis, apprendre une langue vaut la peine, parce qu\u2019elle ouvre des portes professionnelles.', en: 'In my opinion, learning a language is worth it, because it opens professional doors.' },
        { fr: 'Elle ouvre des portes, donc les efforts d\u2019aujourd\u2019hui deviennent des opportunités demain.', en: 'It opens doors, so today\u2019s efforts become tomorrow\u2019s opportunities.' },
        { fr: 'Cependant, tout le monde n\u2019a pas le temps d\u2019étudier chaque jour.', en: 'However, not everyone has time to study every day.' },
        { fr: 'En conclusion, même si le chemin est long, le jeu en vaut la chandelle.', en: 'In conclusion, even if the road is long, the game is worth the candle.' },
    ],

    practice: [
        { instruction: 'Choose the connector:', question: 'Il pleut, ______ le match est annulé.', answer: 'donc — consequence' },
        { instruction: 'Choose the connector:', question: '______ tu es fatigué, va te coucher.', answer: 'Puisque — reason both know, fronted' },
        { instruction: 'Positive or negative cause:', question: '______ ta préparation, tout s\u2019est bien passé.', answer: 'Grâce à — positive outcome' },
        { instruction: 'Contrast:', question: 'C\u2019est cher ; ______, c\u2019est de bonne qualité.', answer: 'cependant / en revanche / par contre — all three work' },
        { instruction: 'Indicative or subjunctive:', question: 'Je pense que c\u2019______ vrai.', answer: 'est — affirmative je pense que + indicative' },
        { instruction: 'Concession:', question: '______ c\u2019est difficile, je continue.', answer: 'Même si — + indicative for B1' },
    ],

    translationPractice: [
        { en: 'In my opinion, this film is overrated.', fr: 'À mon avis, ce film est surestimé.' },
        { en: 'I\u2019m learning French because I want to work in Quebec.', fr: 'J\u2019apprends le français parce que je veux travailler au Québec.' },
        { en: 'It\u2019s expensive; however, it\u2019s worth it.', fr: 'C\u2019est cher ; cependant, ça vaut la peine.' },
        { en: 'Thanks to my neighbours, I settled in quickly.', fr: 'Grâce à mes voisins, je me suis installé rapidement.' },
        { en: 'On the one hand it saves time; on the other, it isolates.', fr: 'D\u2019une part, ça fait gagner du temps ; d\u2019autre part, ça isole.' },
        { en: 'I agree with you on the substance.', fr: 'Je suis d\u2019accord avec toi sur le fond.' },
    ],

    reverseTranslation: [
        { fr: 'À cause de la grève, les trains ne circulent pas.', en: 'Because of the strike, the trains aren\u2019t running.' },
        { fr: 'Je ne suis pas du tout d\u2019accord avec cette idée.', en: 'I don\u2019t agree with that idea at all.' },
        { fr: 'En conclusion, les avantages l\u2019emportent sur les inconvénients.', en: 'In conclusion, the advantages outweigh the drawbacks.' },
        { fr: 'Il me semble que tu as oublié un point important.', en: 'It seems to me you forgot an important point.' },
    ],

    register: {
        informal: 'Franchement, c\u2019est trop bien — et puis c\u2019est gratuit ! (franchement, et puis = spoken opinion glue)',
        neutral: 'Je pense que c\u2019est une bonne idée, même si elle a des limites.',
        formal: 'Il convient de souligner que cette mesure présente des avantages notables ; néanmoins, des questions demeurent.',
    },

    culture: 'Debate culture values qualification: French examiners reward nuance markers (il me semble, dans une certaine mesure, tout dépend de) over absolutes. The TCF speaking task "exprimez votre opinion" explicitly grades the connector chain — cause, consequence, contrast — and the writing task expects a conclusion (en conclusion, pour conclure). Steal the essay skeleton taught here for every opinion task.',

    freeProduction: 'Take a side on: "Les villes sont-elles meilleures que les campagnes pour les jeunes ?" (8–10 sentences): opinion frame → two reasons (parce que / puisque) → one consequence (donc) → the other side (en revanche) → a concession (même si) → conclusion (en conclusion…). Then record the same argument in 60 seconds of spoken French.',

    miniTest: [
        { question: '______ le trafic, je suis en retard.', options: ['Grâce à', 'À cause de', 'Puisque', 'Donc'], answer: 'À cause de — negative cause' },
        { question: 'Je pense que c\u2019______ une bonne idée.', options: ['soit', 'est', 'sois', 'sera'], answer: 'est — affirmative + indicative' },
        { question: 'Which connector shows contrast?', options: ['donc', 'parce que', 'cependant', 'puisque'], answer: 'cependant' },
        { question: '______ tu es libre, viens avec nous.', options: ['Parce que', 'Puisque', 'À cause de', 'Donc'], answer: 'Puisque — known reason' },
        { question: '"Thanks to" (positive) is:', options: ['à cause de', 'grâce à', 'en revanche', 'malgré'], answer: 'grâce à' },
    ],

    review: [
        'The conditional from B1:conditionnel softens opinions: il me semblerait que…, je dirais que…',
        'Relative pronouns chain reasons into one sentence: la raison pour laquelle…, l\u2019argument dont il parle…',
    ],

    traps: [
        'grâce à (positive) vs à cause de (negative) — misplacing them reverses your stance. Tests love this pair.',
        'parce que answers pourquoi inside the sentence; puisque and comme open the clause. Car is the written "for".',
        'Affirmative je pense que / je crois que + INDICATIVE. The subjunctive appears only under negation or doubt (je ne crois pas que ce soit…).',
        'même si + indicative, bien que + subjunctive. At B1, use même si — bien que too early causes agreement errors.',
    ],

    homework: {
        intro: 'Opinion machinery: frames, the four connector families, indicative after je pense que, and the two-sided structure.',
        translation: [
            { prompt: 'In my opinion, public transport should be free.', answer: 'À mon avis, les transports en commun devraient être gratuits.', explanation: 'Opinion frame + conditional of devoir (devraient) for "should". Note: transports en commun = public transport.' },
            { prompt: 'I\u2019m learning French because it opens doors.', answer: 'J\u2019apprends le français parce que ça ouvre des portes.', alt: ['J’apprends le français parce qu’il ouvre des portes'], explanation: 'parce que answers the implicit pourquoi; ça keeps it spoken. Fronted alternative: Comme le français ouvre des portes…' },
            { prompt: 'It\u2019s noisy; on the other hand, the rent is low.', answer: 'C\u2019est bruyant ; en revanche, le loyer est bas.', alt: ['C’est bruyant ; par contre, le loyer est bas'], explanation: 'en revanche (written/neutral) or par contre (spoken). Low rent: bas / peu cher.' },
            { prompt: 'Because of the strike, I worked from home.', answer: 'À cause de la grève, j\u2019ai travaillé à distance.', alt: ['À cause de la grève, j’ai travaillé de la maison'], explanation: 'à cause de + noun (negative cause) + PC for the finished event.' },
            { prompt: 'I don\u2019t agree, but I understand your point.', answer: 'Je ne suis pas d\u2019accord, mais je comprends ton point de vue.', alt: ['Je ne suis pas d’accord, mais je comprends ton point'], explanation: 'Balanced disagreement — mais links the concession. ton point de vue = your viewpoint.' },
            { prompt: 'Thanks to practice, my level improved.', answer: 'Grâce à la pratique, mon niveau s\u2019est amélioré.', explanation: 'grâce à (positive) + reflexive PC: s\u2019est amélioré (masc; améliorée fem).' },
        ],
        blanks: [
            { prompt: 'Il pleut, ______ le pique-nique est annulé.', answer: 'donc', explanation: 'Consequence connector: donc. Alors also works in speech.' },
            { prompt: '______ il était tard, nous avons pris un taxi.', answer: 'Comme', explanation: 'Fronted reason → comme (+ comma). Parce que stays inside the clause.' },
            { prompt: 'Je pense que le projet ______ (être) réaliste.', answer: 'est', explanation: 'Affirmative je pense que + indicative: est. The subjunctive (soit) would need negation.' },
            { prompt: '______ la formation, j\u2019ai décroché un emploi.', answer: 'Grâce à', explanation: 'Positive cause → grâce à. à cause de would blame the training.' },
            { prompt: 'D\u2019une part, c\u2019est pratique ; d\u2019______ part, c\u2019est coûteux.', answer: 'autre', explanation: 'The balanced pair: d\u2019une part… d\u2019autre part — the essay skeleton in miniature.' },
            { prompt: '______ si c\u2019est difficile, je ne renonce pas.', answer: 'Même', explanation: 'même si + indicative = even though. B1-safe concession.' },
        ],
        corrections: [
            { prompt: 'À cause de toi, j\u2019ai réussi mon examen !', answer: 'Grâce à toi, j\u2019ai réussi mon examen !', explanation: 'How the mistake happens: one connector for both cause types. Why it does not work: à cause de blames its object — you just told your friend it was their fault. How to fix it: grâce à for positive outcomes.' },
            { prompt: 'Je pense que ce soit une bonne idée.', answer: 'Je pense que c\u2019est une bonne idée.', explanation: 'How the mistake happens: over-applying the subjunctive rule. Why it does not work: affirmative je pense que takes the indicative. How to fix it: c\u2019est. (Negation changes it: je ne pense pas que ce soit…)' },
            { prompt: 'Il est riche, malgré il travaille beaucoup.', answer: 'Il est riche, malgré son travail acharné. / Il est riche même s\u2019il travaille beaucoup.', explanation: 'How the mistake happens: putting a clause after malgré. Why it does not work: malgré takes a NOUN. How to fix it: malgré + noun, or même si + clause.' },
            { prompt: 'Parce que il pleut, on reste ici.', answer: 'Comme il pleut, on reste ici. / Il pleut, donc on reste ici.', explanation: 'How the mistake happens: fronting parce que. Why it does not work: parce que sits inside the clause; fronted reasons use comme. How to fix it: Comme…, or restructure with donc.' },
            { prompt: 'C\u2019est cher, mais en revanche c\u2019est bien, donc cependant j\u2019achète.', answer: 'C\u2019est cher ; en revanche, c\u2019est de bonne qualité, donc je l\u2019achète.', explanation: 'How the mistake happens: stacking connectors without jobs. Why it does not work: mais + en revanche + cependant all mark contrast/shift — one per link. How to fix it: one connector per relationship: contrast (en revanche), consequence (donc).' },
        ],
        writing: {
            task: 'Write a two-sided opinion piece (10–14 sentences) on: "Faut-il apprendre plusieurs langues ?" Structure: opinion frame → argument 1 with cause → consequence → contrast to the other side (en revanche) → concession (même si) → conclusion (en conclusion). Use each connector family at least once.',
            requirements: [
                'Opinion frame (à mon avis / je pense que)',
                'One cause connector (parce que, puisque, comme, car)',
                'One consequence (donc, alors, c\u2019est pourquoi)',
                'One contrast (cependant, en revanche, par contre)',
                'One concession (même si) + en conclusion closing',
            ],
            minWords: 80,
        },
        checklist: [
            'I open opinions with à mon avis / je pense que / il me semble que',
            'I pick cause connectors by job: parce que (why), puisque/comme (fronted), car (written)',
            'I distinguish grâce à (positive) from à cause de (negative)',
            'I link consequences with donc / alors and contrast with cependant / en revanche',
            'I keep the indicative after affirmative je pense que',
            'I can run the full structure: claim → cause → consequence → contrast → conclusion',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Opinion frames by register: spoken — franchement, moi je trouve que; neutral — à mon avis, je pense que, je trouve que; formal — il me semble que, il convient de noter que.',
            examples: [
                { fr: 'Moi, je trouve que… / À mon avis… / Il me semble que…', en: 'the three-level ladder' },
            ],
        },
        {
            explanation: 'Cause family: parce que (inside sentence), comme (fronted + comma), puisque (known to both), car (written for), grâce à (good), à cause de (bad), grâce au fait que (good, formal).',
            examples: [
                { fr: 'Comme il pleuvait, on est restés. · Grâce à elle, on a fini. · À cause de la grève, rien ne circulait.', en: 'the whole family at work' },
            ],
        },
        {
            explanation: 'Consequence family: donc (so), alors (then/so), c\u2019est pourquoi (that\u2019s why), par conséquent (consequently, formal).',
            examples: [
                { fr: 'Le loyer monte, donc beaucoup déménagent. · C\u2019est pourquoi j\u2019ai réagi vite.', en: 'cause → consequence chains' },
            ],
        },
        {
            explanation: 'Contrast family: mais (but), cependant / toutefois (however, formal), en revanche (on the other hand), par contre (spoken), alors que (whereas).',
            examples: [
                { fr: 'C\u2019est rapide ; en revanche, c\u2019est cher. · Je viendrai, par contre je serai en retard.', en: 'register variants of "but"' },
            ],
        },
        {
            explanation: 'Concession: même si + indicative (even if) at B1; malgré + NOUN (despite); bien que + subjunctive at B2. Never malgré + clause.',
            examples: [
                { fr: 'Même si c\u2019est dur, je continue. · Malgré la pluie, on sort.', en: 'clause vs noun' },
            ],
        },
        {
            explanation: 'Conclusion kit: en conclusion, pour conclure, bref (spoken), tout bien pesé (formal). One line is enough — restate the claim and one reason.',
            examples: [
                { fr: 'En conclusion, le jeu en vaut la chandelle.', en: 'the closer' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'parce que': { en: 'because', pron: 'pahr-skuh', type: 'particle', note: 'answers pourquoi inside the sentence' },
        'puisque': { en: 'since (known reason)', pron: 'püee-skuh', type: 'particle', note: 'fronted or inside; reason both speakers accept' },
        'comme': { en: 'as / since (fronted) / like', pron: 'kohm', type: 'particle', note: 'fronted reason + comma: Comme il pleuvait,…' },
        'car': { en: 'for / because (written)', pron: 'kahr', type: 'particle', note: 'conjunction of written argument' },
        'donc': { en: 'so / therefore', pron: 'dohnk', type: 'particle', note: 'consequence connector' },
        'cependant': { en: 'however', pron: 'suh-pahn-DAHN', type: 'particle', register: 'formal', note: 'contrast, written register' },
        'en revanche': { en: 'on the other hand', pron: 'ahn ruh-VAHNsh', type: 'particle', note: 'balances two sides' },
        'par contre': { en: 'on the flip side', pron: 'pahr kohn-TRUH', type: 'particle', register: 'informal', note: 'spoken cousin of en revanche' },
        'grâce à': { en: 'thanks to (positive cause)', pron: 'grahs ah', type: 'phrase', note: 'grâce à + noun/pronoun' },
        'à cause de': { en: 'because of (negative cause)', pron: 'ah koz duh', type: 'phrase', note: 'à cause de + noun; blames its object' },
        'même si': { en: 'even if / even though', pron: 'mem see', type: 'phrase', note: '+ indicative at B1' },
        'malgré': { en: 'despite (+ NOUN)', pron: 'mahl-GREH', type: 'particle', note: 'malgré la pluie — never malgré il pleut' },
        'surestimé': { en: 'overrated (masc)', pron: 'sür-es-tee-MAY', gender: 'masculine', type: 'adjective', fem: { word: 'surestimée', en: 'overrated' }, note: 'from surestimer' },
        'bruyant': { en: 'noisy (masc)', pron: 'brüee-YAHN', gender: 'masculine', type: 'adjective', fem: { word: 'bruyante', en: 'noisy' }, plural: 'bruyants / bruyantes' },
        'inconvénient': { en: 'drawback', pron: 'an-kohn-vay-NYAN', gender: 'masculine', type: 'noun', note: 'opposite: un avantage' },
        'grève': { en: 'strike', pron: 'grehv', gender: 'feminine', type: 'noun', note: 'faire grève = to go on strike' },
        'le fond': { en: 'the substance / bottom', pron: 'luh FOHN', gender: 'masculine', type: 'noun', note: 'd\u2019accord sur le fond = agree on substance (vs la forme)' },
        'valoir la peine': { en: 'to be worth it', pron: 'vah-LWAHR luh PEN', type: 'expression', note: 'ça vaut la peine = it\u2019s worth it' },
    },
};

// ── B1 · Reported Speech ────────────────────────────────────────────────────
const b1Discours: StaticFrenchLesson = {
    title: 'Reported Speech',
    objective: 'Report what someone said with the tense-backshift system (présent → imparfait, passé composé → plus-que-parfait, futur → conditionnel), report questions with si, and report commands with de + infinitive.',

    vocabulary: [
        { fr: 'il a dit que', en: 'he said that', pron: 'eel ah DEE kuh', type: 'phrase', register: 'neutral', example: { fr: 'Il a dit qu\u2019il serait en retard.', en: 'He said he would be late.' }, related: [{ fr: 'elle a dit que', en: 'she said that' }] },
        { fr: 'il m\u2019a dit que', en: 'he told me that', pron: 'eel mah DEE kuh', type: 'phrase', register: 'neutral', example: { fr: 'Il m\u2019a dit que le cours était annulé.', en: 'He told me the class was cancelled.' }, related: [{ fr: 'dire à quelqu\u2019un', en: 'to tell someone' }] },
        { fr: 'demander si', en: 'to ask whether', pron: 'duh-mahn-DAY see', type: 'phrase', register: 'neutral', example: { fr: 'Il m\u2019a demandé si j\u2019étais libre.', en: 'He asked me if I was free.' }, related: [{ fr: 'demander ce que', en: 'to ask what' }] },
        { fr: 'dire de + infinitif', en: 'to tell (someone) to do', pron: 'deer duh', type: 'phrase', register: 'neutral', example: { fr: 'Elle m\u2019a dit de patienter.', en: 'She told me to wait.' }, related: [{ fr: 'demander de + inf.', en: 'to ask to' }] },
        { fr: 'répondre que', en: 'to answer that', pron: 'ray-pohn-druh kuh', type: 'phrase', register: 'neutral', example: { fr: 'Il a répondu qu\u2019il ne savait pas.', en: 'He answered that he didn\u2019t know.' }, related: [{ fr: 'rétorquer', en: 'to retort' }] },
        { fr: 'expliquer que', en: 'to explain that', pron: 'ehs-plee-KAY kuh', type: 'phrase', register: 'neutral', example: { fr: 'Elle a expliqué qu\u2019elle avait raté le bus.', en: 'She explained that she had missed the bus.' }, related: [{ fr: 'préciser que', en: 'to specify that' }] },
        { fr: 'le disque → le discours indirect', en: 'reported speech', pron: 'le dees-KOOR an-dee-REKT', gender: 'masculine', register: 'neutral', example: { fr: 'Le discours indirect recule les temps.', en: 'Reported speech shifts tenses back.' }, related: [{ fr: 'la concordance', en: 'the sequence of tenses' }] },
        { fr: 'plus-que-parfait', en: 'past perfect (had done)', pron: 'plüs-kuh-pahr-FEH', gender: 'masculine', register: 'neutral', example: { fr: 'Il a dit qu\u2019il avait déjà mangé.', en: 'He said he had already eaten.' }, related: [{ fr: 'imparfait + participe', en: 'its build' }] },
        { fr: 'prétendre que', en: 'to claim that', pron: 'pray-tahn-druh kuh', type: 'phrase', register: 'neutral', example: { fr: 'Il prétend qu\u2019il était chez lui.', en: 'He claims he was home.' }, related: [{ fr: 'affirmer que', en: 'to state that' }] },
        { fr: 'les paroles', en: 'the words / what was said', pron: 'lay pah-ROHL', gender: 'feminine', register: 'neutral', example: { fr: 'Rapporte ses paroles au style indirect.', en: 'Report his words in indirect style.' }, related: [{ fr: 'le style direct', en: 'direct speech' }] },
        { fr: 'rapporter', en: 'to report / bring back', pron: 'rah-por-TAY', type: 'verb', register: 'neutral', example: { fr: 'Rapporte ce qu\u2019il a dit.', en: 'Report what he said.' }, related: [{ fr: 'le rapport', en: 'the report' }] },
        { fr: 'la veille', en: 'the day before', pron: 'lah veh-yuh', gender: 'feminine', register: 'formal', example: { fr: 'Il est arrivé la veille.', en: 'He arrived the day before.' }, related: [{ fr: 'le lendemain', en: 'the next day' }] },
    ],

    pronunciation: [
        { fr: 'il a dit qu\u2019il', approx: 'eel ah DEE keel', en: 'que elides before il: "keel"' },
        { fr: 'qu\u2019il viendrait', approx: 'keel vyen-DREH', en: 'backshifted future = conditional sound' },
        { fr: 'qu\u2019il avait mangé', approx: 'kee-lah-VEH mahn-ZHAY', en: 'plus-que-parfait: avait + participle' },
        { fr: 'si j\u2019étais libre', approx: 'see zhay-TEH LEE-bruh', en: 'si keeps its full vowel here' },
        { fr: 'la veille', approx: 'lah VEH-yuh', en: 'the double l = "y" glide' },
        { fr: 'le lendemain', approx: 'luh lahn-duh-MAN', en: 'nasal ending, stress on -MAIN' },
    ],

    grammar: {
        rule: 'When the reporting verb is in the past (a dit, a demandé), every tense inside shifts back one step: présent → imparfait, PC → plus-que-parfait, futur → conditionnel, impératif → de + infinitif.',
        explanation: 'Reported speech is a time machine: "Il a dit : « Je suis fatigué »" becomes Il a dit qu\u2019il était fatigué (present slides to imparfait). "« J\u2019ai fini »" becomes Il a dit qu\u2019il avait fini (PC slides to plus-que-parfait: imparfait avoir/être + participle). "« Je viendrai »" becomes Il a dit qu\u2019il viendrait (futur slides to conditional). Yes/no questions take si: « Tu viens ? » → Il m\u2019a demandé si je venais. Wh-questions keep their question word: « Où habites-tu ? » → Il m\u2019a demandé où j\u2019habitais. Commands become de + infinitive: « Attends ici ! » → Il m\u2019a dit d\u2019attendre ici. Time words shift too: hier → la veille, demain → le lendemain, aujourd\u2019hui → ce jour-là. If the reporting verb is present (il dit que…), nothing shifts — only past reporters trigger the machine.',
        examples: [
            { fr: 'Direct: « Je suis fatigué. » → Il a dit qu\u2019il était fatigué.', en: 'He said he was tired.', breakdown: ['présent suis → imparfait était', 'que elides: qu\u2019il', 'agreement: fatigué (masc) / fatiguée (fem)'] },
            { fr: 'Direct: « J\u2019ai déjà mangé. » → Elle a dit qu\u2019elle avait déjà mangé.', en: 'She said she had already eaten.', breakdown: ['PC → plus-que-parfait', 'avait = had (imparfait of avoir)', 'mangé stays — avoir auxiliary'] },
            { fr: 'Direct: « Je viendrai demain. » → Il a dit qu\u2019il viendrait le lendemain.', en: 'He said he would come the next day.', breakdown: ['futur → conditionnel', 'demain → le lendemain (time shift)'] },
            { fr: 'Direct: « Tu viens avec nous ? » → Il m\u2019a demandé si je venais avec eux.', en: 'He asked me if I was coming with them.', breakdown: ['yes/no question → si', 'viens → venais (backshift)', 'nous → eux (pronoun shift)'] },
            { fr: 'Direct: « Où travailles-tu ? » → Elle m\u2019a demandé où je travaillais.', en: 'She asked me where I worked.', breakdown: ['question word où stays', 'no inversion in the reported question', 'travailles → travaillais'] },
            { fr: 'Direct: « Ferme la porte ! » → Il m\u2019a dit de fermer la porte.', en: 'He told me to close the door.', breakdown: ['imperative → de + infinitive', 'same verb fermer', 'negative: de ne pas fermer'] },
        ],
        commonMistakes: [
            'Forgetting the backshift: Il a dit qu\u2019il EST là — with a past reporter the present must slide: qu\u2019il était là.',
            'Putting the conditional after si in reported yes/no questions: si + imparfait here too — Il a demandé si je viendrais is wrong for « Tu viens ? » (→ si je venais).',
            'Keeping inversion in reported questions: Il a demandé où habitais-je is wrong — the reported question reverts to subject-first: où j\u2019habitais.',
            'Using que after demandé: Il m\u2019a demandé que je vienne — questions report with si or a question word, never que.',
        ],
    },

    transformations: [
        { type: 'Direct', fr: '« Je suis en retard », dit-il.', en: '"I\u2019m late," he says.' },
        { type: 'Reported', fr: 'Il dit qu\u2019il est en retard. (no shift — present reporter)', en: 'He says he\u2019s late.' },
        { type: 'Past reporter', fr: 'Il a dit qu\u2019il était en retard.', en: 'He said he was late.' },
        { type: 'PC → PQP', fr: '« J\u2019ai perdu mes clés » → Il a dit qu\u2019il avait perdu ses clés.', en: 'He said he had lost his keys.' },
        { type: 'Futur → cond.', fr: '« Je rappellerai » → Il a promis qu\u2019il rappellerait.', en: 'He promised he would call back.' },
        { type: 'Yes/no question', fr: '« Tu viens ? » → Il a demandé si je venais.', en: 'He asked if I was coming.' },
        { type: 'Wh-question', fr: '« Quand pars-tu ? » → Elle a demandé quand je partais.', en: 'She asked when I was leaving.' },
        { type: 'Command', fr: '« Sortez ! » → Le prof nous a dit de sortir.', en: 'The teacher told us to go out.' },
    ],

    sentenceBuilding: [
        { fr: 'Ma voisine m\u2019a dit que le boiler était cassé.', en: 'My neighbour told me the water heater was broken.' },
        { fr: 'Elle m\u2019a expliqué qu\u2019elle avait appelé un plombier la veille.', en: 'She explained she had called a plumber the day before.' },
        { fr: 'Elle m\u2019a demandé si j\u2019étais à la maison le lendemain matin.', en: 'She asked me if I would be home the next morning.' },
        { fr: 'Comme je répondais que oui, elle m\u2019a dit de laisser la porte déverrouillée.', en: 'As I was answering yes, she told me to leave the door unlocked.' },
        { fr: 'Finalement, le plombier a affirmé qu\u2019il faudrait changer toute la pièce — ce que personne n\u2019avait prévu.', en: 'In the end, the plumber stated that the whole room would need redoing — which nobody had expected.' },
    ],

    practice: [
        { instruction: 'Backshift the tense:', question: '« Je pars à midi. » → Il a dit qu\u2019il ______ à midi.', answer: 'partait — présent → imparfait' },
        { instruction: 'Backshift the tense:', question: '« J\u2019ai terminé. » → Elle a dit qu\u2019elle ______ terminé.', answer: 'avait — PC → plus-que-parfait' },
        { instruction: 'Backshift the tense:', question: '« Je t\u2019aiderai. » → Il a dit qu\u2019il m\u2019______.', answer: 'aiderait — futur → conditionnel' },
        { instruction: 'Report the question:', question: '« Tu as vu Paul ? » → Il a demandé ______ j\u2019avais vu Paul.', answer: 'si — yes/no question → si' },
        { instruction: 'Report the question:', question: '« Comment tu t\u2019appelles ? » → Elle a demandé comment je ______.', answer: 'm\u2019appelais — question word kept, tense backshifted, no inversion' },
        { instruction: 'Report the command:', question: '« Attends ici ! » → Il m\u2019a dit d\u2019______ ici.', answer: 'attendre — imperative → de + infinitive' },
    ],

    translationPractice: [
        { en: 'He said he was busy.', fr: 'Il a dit qu\u2019il était occupé.' },
        { en: 'She told me she had already sent the file.', fr: 'Elle m\u2019a dit qu\u2019elle avait déjà envoyé le dossier.' },
        { en: 'They asked me if I spoke French.', fr: 'Ils m\u2019ont demandé si je parlais français.' },
        { en: 'The teacher told us to write an essay.', fr: 'Le prof nous a dit de rédiger une dissertation.' },
        { en: 'He explained that he would arrive late.', fr: 'Il a expliqué qu\u2019il arriverait en retard.' },
        { en: 'She asked me where I had bought it.', fr: 'Elle m\u2019a demandé où je l\u2019avais acheté.' },
    ],

    reverseTranslation: [
        { fr: 'Il m\u2019a répondu qu\u2019il ne pouvait pas venir.', en: 'He answered me that he couldn\u2019t come.' },
        { fr: 'Elle a précisé que le rendez-vous aurait lieu le lendemain.', en: 'She specified the appointment would take place the next day.' },
        { fr: 'Il m\u2019a demandé de ne pas dire quoi que ce soit.', en: 'He asked me not to tell anyone.' },
        { fr: 'On m\u2019a annoncé que la réunion était reportée.', en: 'I was told the meeting had been postponed.' },
    ],

    register: {
        informal: 'Il m\u2019a dit qu\u2019il baignait pas trop — genre il avait des problèmes. (spoken: que survives, words get clipped)',
        neutral: 'Elle m\u2019a dit qu\u2019elle viendrait vers six heures.',
        formal: 'Le porte-parole a déclaré que le projet serait réexaminé dans les meilleurs délais.',
    },

    culture: 'Reported speech is the grammar of the news: every TCF listening item paraphrases an interview ("l\u2019interviewé a déclaré que…"), and the reading section rewrites quotes as indirect speech. It is also the grammar of office life — relaying a message ("elle a dit de rappeler à 15 h") is a daily act. Master the backshift table and half the comprehension questions answer themselves.',

    freeProduction: 'Report a real conversation from this week (8–10 sentences): someone asked you something (Il/Elle m\u2019a demandé si…), told you something (m\u2019a dit que…), and gave you an instruction (m\u2019a dit de…). Add one future report (a dit qu\u2019il/elle ferait…) and one plus-que-parfait (a expliqué qu\u2019il/elle avait déjà…).',

    miniTest: [
        { question: '« Je viens » → Il a dit qu\u2019il ______.', options: ['vient', 'venait', 'viendra', 'viendrait'], answer: 'venait — présent → imparfait' },
        { question: '« J\u2019ai fini » → Il a dit qu\u2019il ______ fini.', options: ['a', 'avait', 'aura', 'aurait'], answer: 'avait — PC → plus-que-parfait' },
        { question: 'Yes/no question reported with:', options: ['que', 'si', 'qui', 'quoi'], answer: 'si' },
        { question: '« Attends ! » → Il m\u2019a dit ______ attendre.', options: ['que', 'de', 'à', 'pour'], answer: 'de — imperative → de + infinitive' },
        { question: '« Je viendrai » → Il a dit qu\u2019il ______.', options: ['viendra', 'viendrait', 'venait', 'vient'], answer: 'viendrait — futur → conditionnel' },
    ],

    review: [
        'The conditional you learned in B1:conditionnel is exactly the backshifted future — same stems, same endings.',
        'The imparfait and plus-que-parfait reuse the imparfait engine from B1:passe-vs-imparfait.',
    ],

    traps: [
        'Backshift only happens when the REPORTER is past: il dit que c\u2019est… (no shift) vs il a dit que c\u2019était… (shift).',
        'Reported yes/no questions use si + backshifted imparfait — never the conditional: a demandé si je venais.',
        'No inversion inside reported questions: où j\u2019habitais, quand je partais — subject first, verb second.',
        'Negative commands: « ne pars pas ! » → Il m\u2019a dit de NE PAS partir — the negation wraps the infinitive after de.',
    ],

    homework: {
        intro: 'The backshift machine in every direction: statements, questions, commands, and the time-word shifts (hier → la veille, demain → le lendemain).',
        translation: [
            { prompt: 'He said he was tired.', answer: 'Il a dit qu\u2019il était fatigué.', explanation: 'Past reporter → present slides to imparfait. Fatigué agrees with the male speaker; fatiguée for a woman.' },
            { prompt: 'She told me she had already finished.', answer: 'Elle m\u2019a dit qu\u2019elle avait déjà fini.', explanation: 'PC (a fini) slides to plus-que-parfait: avait fini. Time adverb déjà stays put, before the participle.' },
            { prompt: 'They asked me if I liked the city.', answer: 'Ils m\u2019ont demandé si j\u2019aimais la ville.', explanation: 'Yes/no question → si; the reported verb backshifts: aime → aimais. No conditional after si.' },
            { prompt: 'The manager told us to send the report.', answer: 'Le responsable nous a dit d\u2019envoyer le rapport.', explanation: 'Imperative → de + infinitive. Note the elision: dit d\u2019envoyer before a vowel.' },
            { prompt: 'He explained that he would arrive the next day.', answer: 'Il a expliqué qu\u2019il arriverait le lendemain.', explanation: 'Futur → conditionnel (arriverait), and demain → le lendemain (time shift).' },
            { prompt: 'She asked me where I had bought the table.', answer: 'Elle m\u2019a demandé où je l\u2019avais achetée.', explanation: 'Wh-word kept (où), PC backshifts to plus-que-parfait (l\u2019avais achetée), and the fronted object (la table → l\u2019) forces agreement: achetée.' },
        ],
        blanks: [
            { prompt: '« Je suis malade. » → Il a dit qu\u2019il ______ malade.', answer: 'était', explanation: 'présent → imparfait under a past reporter.' },
            { prompt: '« J\u2019ai perdu mon passeport. » → Elle a dit qu\u2019elle ______ perdu son passeport.', answer: 'avait', explanation: 'PC → plus-que-parfait: imparfait of avoir + participle.' },
            { prompt: '« Tu viens demain ? » → Il m\u2019a demandé ______ je venais le lendemain.', answer: 'si', explanation: 'Yes/no question → si, and demain shifts to le lendemain.' },
            { prompt: '« Rends le livre ! » → Elle m\u2019a dit de ______ le livre.', answer: 'rendre', explanation: 'Imperative → de + infinitive: the verb returns to its infinitive form.' },
            { prompt: '« Je t\u2019appellerai. » → Il a promis qu\u2019il m\u2019______.', answer: 'appellerait', explanation: 'Futur → conditionnel; appeler doubles the l: appellerait.' },
            { prompt: '« Où est la gare ? » → Il m\u2019a demandé où ______ la gare.', answer: 'était', explanation: 'Wh-question keeps où; the verb backshifts est → était; no inversion remains.' },
        ],
        corrections: [
            { prompt: 'Il a dit qu\u2019il est occupé.', answer: 'Il a dit qu\u2019il était occupé.', explanation: 'How the mistake happens: keeping the original tense. Why it does not work: a past reporter (a dit) drags the reported clause back one step. How to fix it: est → était.' },
            { prompt: 'Il m\u2019a demandé que je vienne.', answer: 'Il m\u2019a demandé si je venais. / Il m\u2019a demandé de venir.', explanation: 'How the mistake happens: attaching que to a reported question or request. Why it does not work: questions report with si; commands with de + infinitive. How to fix it: choose the right linker.' },
            { prompt: 'Elle a demandé où habitais-je.', answer: 'Elle a demandé où j\u2019habitais.', explanation: 'How the mistake happens: keeping the inversion of direct speech. Why it does not work: reported questions return to normal word order. How to fix it: subject first — où j\u2019habitais.' },
            { prompt: 'Il m\u2019a dit de ne pas que je parte.', answer: 'Il m\u2019a dit de ne pas partir.', explanation: 'How the mistake happens: mixing a conjugated clause into a de + infinitive report. Why it does not work: after de, the verb is an infinitive and the negation wraps it. How to fix it: de ne pas + infinitive.' },
            { prompt: 'Elle a dit qu\u2019elle viendra le lendemain.', answer: 'Elle a dit qu\u2019elle viendrait le lendemain.', explanation: 'How the mistake happens: backshifting the time word but not the verb. Why it does not work: under a past reporter the futur slides to the conditional. How to fix it: viendra → viendrait. (If the plan still holds you may keep it spoken: elle a dit qu\u2019elle viendra — but the exam wants the shift.)' },
        ],
        writing: {
            task: 'Report a two-person conversation (10–14 sentences): what each said (a dit que…), asked (a demandé si / où / quand…), and instructed (a dit de…). Include one futur→conditional report, one PC→plus-que-parfait report, one time-word shift (hier → la veille or demain → le lendemain), and one negative instruction (de ne pas…).',
            requirements: [
                'At least four a dit que / a expliqué que statements',
                'Two reported questions (one si, one wh-word)',
                'One command with de + infinitive and one with de ne pas + infinitive',
                'One plus-que-parfait and one conditional report',
                'One time-word shift',
            ],
            minWords: 80,
        },
        checklist: [
            'I backshift when the reporter is past: présent → imparfait, PC → plus-que-parfait, futur → conditionnel',
            'I report yes/no questions with si + backshifted verb (never conditional after si)',
            'I keep wh-words but drop the inversion (où j\u2019habitais)',
            'I report commands with de + infinitive, negation as de ne pas + infinitive',
            'I shift time words: hier → la veille, demain → le lendemain, aujourd\u2019hui → ce jour-là',
            'I build the plus-que-parfait: imparfait avoir/être + participle',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The backshift ladder under a past reporter: présent → imparfait (est → était); PC → plus-que-parfait (a fini → avait fini); futur → conditionnel (viendra → viendrait); impératif → de + infinitif (attends → d\u2019attendre).',
            examples: [
                { fr: '« Je pars » → il a dit qu\u2019il partait · « j\u2019ai vu » → il a dit qu\u2019il avait vu · « je viendrai » → il a dit qu\u2019il viendrait', en: 'the three rungs' },
            ],
        },
        {
            explanation: 'The plus-que-parfait = imparfait of avoir/être + participle: j\u2019avais fini, elle était partie. It is simply "the past before the past".',
            examples: [
                { fr: 'Il a dit qu\u2019il avait déjà envoyé le courriel.', en: 'he said he had already sent the email' },
            ],
        },
        {
            explanation: 'Question reporting: yes/no → si (Il a demandé si je venais); wh-words stay (où, quand, comment, pourquoi) but the clause reverts to subject-first order and the verb backshifts.',
            examples: [
                { fr: '« Quand arrives-tu ? » → Elle m\u2019a demandé quand j\u2019arrivais.', en: 'wh-word kept, inversion dropped' },
            ],
        },
        {
            explanation: 'Commands and requests: dire/demander à quelqu\u2019un DE + infinitif. Negation wraps the infinitive: de ne pas sortir.',
            examples: [
                { fr: 'Il m\u2019a dit d\u2019attendre. · Elle m\u2019a demandé de ne rien dire.', en: 'positive and negative reports' },
            ],
        },
        {
            explanation: 'Time and place shifts: hier → la veille, demain → le lendemain, aujourd\u2019hui → ce jour-là, il y a deux jours → deux jours auparavant, ici → là-bas.',
            examples: [
                { fr: '« Je repars demain » → Il a dit qu\u2019il repartait le lendemain.', en: 'verb and time word shift together' },
            ],
        },
        {
            explanation: 'No shift with a present reporter: il dit qu\u2019il est là, elle demande si tu viens. The machine only runs when the reporting verb is past.',
            examples: [
                { fr: 'Il dit qu\u2019il viendra. (still future) vs Il a dit qu\u2019il viendrait.', en: 'reporter tense decides' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'discours indirect': { en: 'reported (indirect) speech', pron: 'dees-KOOR an-dee-REKT', gender: 'masculine', type: 'noun', note: 'also: le style indirect' },
        'plus-que-parfait': { en: 'past perfect (had + participle)', pron: 'plüs-kuh-pahr-FEH', gender: 'masculine', type: 'noun', note: 'imparfait avoir/être + participle' },
        'concordance': { en: 'sequence of tenses', pron: 'kohn-kor-dahnss', gender: 'feminine', type: 'noun', note: 'la concordance des temps' },
        'la veille': { en: 'the day before', pron: 'lah veh-yuh', gender: 'feminine', type: 'noun', note: 'shifts hier in reported speech' },
        'le lendemain': { en: 'the next day', pron: 'luh lahn-duh-MAN', gender: 'masculine', type: 'noun', note: 'shifts demain in reported speech' },
        'auparavant': { en: 'before / previously', pron: 'oh-pah-rah-VAHN', type: 'adverb', note: 'shifts il y a … in formal reported speech' },
        'déclaré': { en: 'declared / stated (PC of déclarer)', pron: 'day-klah-RAY', type: 'verb', base: { form: 'déclarer', en: 'to declare' }, note: 'news verb: a déclaré que' },
        'précisé': { en: 'specified (PC of préciser)', pron: 'pray-see-ZAY', type: 'verb', base: { form: 'préciser', en: 'to specify' }, note: 'a précisé que = added precisely that' },
        'annoncé': { en: 'announced (PC of annoncer)', pron: 'ah-non-SAY', type: 'verb', base: { form: 'annoncer', en: 'to announce' }, note: 'on m\u2019a annoncé que… = I was told that…' },
        'promis': { en: 'promised (PC of promettre)', pron: 'proh-MEE', type: 'verb', base: { form: 'promettre', en: 'to promise' }, note: 'irregular participle, like mettre → mis' },
        'rétorqué': { en: 'retorted (PC of rétorquer)', pron: 'ray-tor-KAY', type: 'verb', base: { form: 'rétorquer', en: 'to retort' }, note: 'argumentative verb' },
        'porte-parole': { en: 'spokesperson', pron: 'port-pah-ROHL', gender: 'masculine', type: 'noun', note: 'invariable plural' },
        'délais': { en: 'timeframe (plural form)', pron: 'day-LEH', gender: 'masculine', type: 'noun', note: 'dans les meilleurs délais = as soon as possible' },
        'reportée': { en: 'postponed (fem — PC of reporter)', pron: 'ruh-por-TAY', type: 'verb', base: { form: 'reporter', en: 'to postpone' }, note: 'la réunion est reportée — être verb sense' },
        'déverrouillée': { en: 'unlocked (fem)', pron: 'day-vuh-roo-YAY', type: 'adjective', masc: { word: 'déverrouillé', en: 'unlocked' }, note: 'laisser la porte déverrouillée' },
    },
};

export const STATIC_B1_PART2: Record<string, StaticFrenchLesson> = {
    'B1:immigration': b1Immigration,
    'B1:opinions': b1Opinions,
    'B1:discours': b1Discours,
};
