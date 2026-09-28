// B2 lectures part 2 — Passive Voice & Complex Clauses, Canadian Society Themes.
// Same gold-standard format: full lesson + traps + homework (A–E) +
// checklistRemedial + glossary. Extras live in frenchLessonExtras.ts.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── B2 · Passive Voice & Complex Clauses ────────────────────────────────────
const b2Passif: StaticFrenchLesson = {
    title: 'Passive Voice & Complex Clauses',
    objective: 'Build and use the passive (être + participle, agreement, par-agent), choose the se-passive when French prefers it, and chain clauses with the gerund (en travaillant) and après avoir / avant de structures — the written-French machinery of reports and news.',

    vocabulary: [
        { fr: 'la voix passive', en: 'the passive voice', pron: 'lah vwah pah-SEEV', gender: 'feminine', register: 'formal', example: { fr: 'La décision a été prise hier.', en: 'The decision was made yesterday.' }, related: [{ fr: 'la voix active', en: 'the active voice' }] },
        { fr: 'être + participe passé', en: 'be + past participle (the passive build)', pron: 'etr pahr-tee-SEEP pah-SAY', type: 'phrase', register: 'formal', example: { fr: 'Le pont sera construit en 2027.', en: 'The bridge will be built in 2027.' }, related: [{ fr: 'construire', en: 'to build' }] },
        { fr: 'par', en: 'by (the agent of a passive)', pron: 'pahr', type: 'particle', register: 'neutral', example: { fr: 'Ce roman a été écrit par Camus.', en: 'This novel was written by Camus.' }, related: [{ fr: 'de', en: 'by (feelings: aimé de tous)' }] },
        { fr: 'se vendre', en: 'to sell / be sold (se-passive)', pron: 'suh VAHN-druh', type: 'verb', register: 'neutral', example: { fr: 'Ce produit se vend bien.', en: 'This product sells well.' }, related: [{ fr: 'se faire + inf.', en: 'to get …-ed (causal)' }] },
        { fr: 'en travaillant', en: 'by working / while working (gerund)', pron: 'ahn trah-vah-YAHN', type: 'phrase', register: 'neutral', example: { fr: 'On apprend en pratiquant.', en: 'One learns by practising.' }, related: [{ fr: 'le gérondif', en: 'the gerund' }] },
        { fr: 'après avoir + participe', en: 'after having + participle', pron: 'ah-PRAY ah-VWAHR', type: 'phrase', register: 'formal', example: { fr: 'Après avoir lu le rapport, il a signé.', en: 'After reading the report, he signed.' }, related: [{ fr: 'après être + participe', en: 'after being (motion verbs)' }] },
        { fr: 'avant de + infinitif', en: 'before + infinitive', pron: 'ah-vahn duh', type: 'phrase', register: 'neutral', example: { fr: 'Vérifie avant de cliquer.', en: 'Check before clicking.' }, related: [{ fr: 'après + nom', en: 'after + noun' }] },
        { fr: 'se faire + infinitif', en: 'to get something done / get …-ed', pron: 'suh fehr', type: 'phrase', register: 'neutral', example: { fr: 'Il s\u2019est fait virer. / Je me suis fait couper les cheveux.', en: 'He got fired. / I got my hair cut.' }, related: [{ fr: 'faire faire', en: 'to have something done' }] },
        { fr: 'le gérondif', en: 'the gerund (en + participe présent)', pron: 'luh zhay-rohn-DEEF', gender: 'masculine', register: 'formal', example: { fr: 'Le gérondif exprime la manière.', en: 'The gerund expresses manner.' }, related: [{ fr: 'le participe présent', en: 'the present participle' }] },
        { fr: 'l\u2019agent', en: 'the agent (doer of a passive)', pron: 'lah-ZHAHN', gender: 'masculine', register: 'formal', example: { fr: 'L\u2019agent est introduit par par.', en: 'The agent is introduced by par.' }, related: [{ fr: 'l\u2019agence', en: 'the agency (different word!)' }] },
        { fr: 'remédier à', en: 'to remedy', pron: 'ruh-may-DYAY ah', type: 'verb', register: 'formal', example: { fr: 'Ce problème peut être remédié. / des mesures pour y remédier', en: 'This problem can be remedied / measures to remedy it.' }, related: [{ fr: 'la mesure', en: 'the measure' }] },
        { fr: 'effectuer', en: 'to carry out (formal faire)', pron: 'eh-fek-TÜAY', type: 'verb', register: 'formal', example: { fr: 'Les travaux seront effectués en été.', en: 'The works will be carried out in summer.' }, related: [{ fr: 'la réalisation', en: 'the completion' }] },
    ],

    pronunciation: [
        { fr: 'a été pris', approx: 'ah ay-TAY PREE', en: 'the double été glues: "ah-ay-TAY"' },
        { fr: 'sera construit', approx: 'suh-RAH kohns-TRÜEE', en: 'construit ends in a written t — pronounced here? No: "kohns-TRÜEE"' },
        { fr: 'ce produit se vend bien', approx: 'suh proh-DÜEE suh VAHN byan', en: 'the two se\u2019s stay light and unstressed' },
        { fr: 'en travaillant', approx: 'ahn trah-vah-YAHN', en: 'the -ant ending is one nasal "AHN"' },
        { fr: 'après avoir lu', approx: 'ah-PRAYZ ah-VWAHR LÜ', en: 'liaison: après avoir → "ah-pray-ZAH-vwar"' },
        { fr: 'il s\u2019est fait virer', approx: 'eel seh feh vee-RAY', en: 's\u2019est fait runs together: "seh-feh"' },
    ],

    grammar: {
        rule: 'Passive = être (in any tense) + past participle, and the participle AGREES like an adjective. Agent → par. French prefers the se-passive (ce produit se vend) when the doer is generic. Complex clauses: en + participe présent (manner), après avoir/être + participle (sequence), avant de + infinitive (anticipation).',
        explanation: 'The passive moves the object into subject position: Le comité a approuvé la proposition → La proposition a été approuvée (par le comité). The participle agrees with the NEW subject (approuvée, approuvés) — the same agreement logic as être-verbs in the passé composé. Passive exists in every tense: est construit, a été construit, sera construit, peut être construit. But French uses the passive less than English: when the doer is people-in-general, the se-passive is the natural choice (ça se dit, ça se fait, ce vin se boit jeune), and when the agent matters it stays active. The gerund (en + participe présent, formed from the nous-present: nous travaillons → en travaillant) packs two simultaneous actions into one clause: Il est arrivé en courant (he arrived running). It can also mean if/by: En travaillant plus, tu progresseras. Sequence structures: après avoir fini (after finishing — the action BEFORE), avant de finir (before finishing). Verbs of motion/reflexive take après être: après être parti. In formal writing these structures replace entire sub-clauses — that is why reports use them constantly.',
        examples: [
            { fr: 'La loi a été votée à l\u2019unanimité.', en: 'The law was voted through unanimously.', breakdown: ['a été votée = PC passive, feminine agreement', 'à l\u2019unanimité = unanimously (fixed phrase)', 'no agent — obvious from context'] },
            { fr: 'Ce rapport a été rédigé par notre équipe.', en: 'This report was written by our team.', breakdown: ['a été rédigé = PC passive', 'par notre équipe = the agent', 'rédiger = to write (formal)'] },
            { fr: 'Le nouveau stade sera construit d\u2019ici 2027.', en: 'The new stadium will be built by 2027.', breakdown: ['sera construit = future passive', 'd\u2019ici 2027 = by (before) 2027', 'agent omitted'] },
            { fr: 'Ces pommes se vendent au kilo.', en: 'These apples are sold by the kilo.', breakdown: ['se vendent = se-passive', 'au kilo = by the kilo', 'doer generic → no par'] },
            { fr: 'Elle a décroché son poste en travaillant le soir.', en: 'She landed the position by working evenings.', breakdown: ['en travaillant = by …ing (means)', 'décrocher = to land (a job)', 'poste = position'] },
            { fr: 'Après avoir vérifié les données, le contrôleur a signé.', en: 'After checking the data, the controller signed.', breakdown: ['après avoir vérifié = sequence BEFORE the main verb', 'les données = the data', 'the subject of both verbs is the same (le contrôleur)'] },
        ],
        commonMistakes: [
            'Using avoir instead of être in the passive: "La loi a eu votée" — the passive auxiliary is ALWAYS être.',
            'Forgetting the agreement: la loi a été voté → votée. The passive participle agrees with its subject like an adjective.',
            'Over-using the passive like English: "Il a été décidé par nous de partir" — French prefers active (nous avons décidé) or se-passive (ça s\u2019est décidé).',
            'Confusing the gerund with the present participle: en étant is rare — the gérondif is en + participle, and cannot have a different subject from the main clause.',
        ],
    },

    transformations: [
        { type: 'Active', fr: 'Le comité a approuvé la proposition.', en: 'The committee approved the proposal.' },
        { type: 'Passive', fr: 'La proposition a été approuvée (par le comité).', en: 'The proposal was approved (by the committee).' },
        { type: 'Future passive', fr: 'La proposition sera approuvée demain.', en: 'The proposal will be approved tomorrow.' },
        { type: 'Se-passive', fr: 'Ça se dit comme ça, en France.', en: 'That\u2019s how it\u2019s said, in France.' },
        { type: 'Gerund (manner)', fr: 'Il est parti en courant.', en: 'He left running.' },
        { type: 'Gerund (means)', fr: 'Tu progresseras en lisant chaque jour.', en: 'You\u2019ll progress by reading daily.' },
        { type: 'Sequence', fr: 'Après avoir fini, elle est rentrée.', en: 'After finishing, she went home.' },
        { type: 'Causal', fr: 'Il s\u2019est fait réveiller à six heures.', en: 'He got woken up at six.' },
    ],

    sentenceBuilding: [
        { fr: 'La nouvelle bibliothèque sera inaugurée en mai.', en: 'The new library will be inaugurated in May.' },
        { fr: 'La nouvelle bibliothèque sera inaugurée en mai par la mairesse, après deux ans de travaux.', en: 'The new library will be inaugurated in May by the mayor, after two years of work.' },
        { fr: 'Conçue en écoutant les habitants, la bibliothèque sera inaugurée en mai par la mairesse.', en: 'Designed by listening to residents, the library will be inaugurated in May by the mayor.' },
        { fr: 'Conçue en écoutant les habitants et financée par la ville, elle ouvrira ses portes en mai, après que le mobilier aura été installé.', en: 'Designed by listening to residents and funded by the city, it will open in May, after the furniture has been installed.' },
        { fr: 'Tout en respectant le budget, la ville a livré un équipement dont elle peut être fière — et que tout le quartier s\u2019appropriera.', en: 'While respecting the budget, the city delivered a facility it can be proud of — and one the whole neighbourhood will make its own.' },
    ],

    practice: [
        { instruction: 'Make it passive:', question: 'Le gouvernement a adopté la loi.', answer: 'La loi a été adoptée (par le gouvernement). — être + participle, agreement with la loi' },
        { instruction: 'Make it passive (future):', question: 'On construira l\u2019école ici.', answer: 'L\u2019école sera construite ici. — future être + agreed participle' },
        { instruction: 'Se-passive or passive:', question: 'Ce vin ______ (boire) jeune.', answer: 'se boit — generic doer → se-passive, present' },
        { instruction: 'Form the gerund:', question: 'nous écoutons → en ______', answer: 'écoutant — nous-stem + -ant' },
        { instruction: 'Sequence:', question: '______ (after / finish) son café, il est parti.', answer: 'Après avoir fini — après avoir + participle' },
        { instruction: 'Causal:', question: 'Je ______ (get / cut) les cheveux hier.', answer: 'me suis fait couper — se faire + infinitive' },
    ],

    translationPractice: [
        { en: 'The decision was made yesterday.', fr: 'La décision a été prise hier.' },
        { en: 'This novel was written by a Québécois author.', fr: 'Ce roman a été écrit par un auteur québécois.' },
        { en: 'That\u2019s not how it\u2019s said in French.', fr: 'Ça ne se dit pas comme ça en français.' },
        { en: 'You learn by making mistakes.', fr: 'On apprend en faisant des erreurs.' },
        { en: 'After checking the documents, she signed.', fr: 'Après avoir vérifié les documents, elle a signé.' },
        { en: 'He got his car repaired.', fr: 'Il a fait réparer sa voiture. / Il s\u2019est fait réparer sa voiture.' },
    ],

    reverseTranslation: [
        { fr: 'Les travaux seront effectués pendant l\u2019été.', en: 'The works will be carried out during the summer.' },
        { fr: 'Ce logiciel se met à jour automatiquement.', en: 'This software updates itself automatically.' },
        { fr: 'En relisant ton texte, tu trouveras les fautes.', en: 'By rereading your text, you\u2019ll find the mistakes.' },
        { fr: 'Avant de signer, lisez les petites lignes.', en: 'Before signing, read the small print.' },
    ],

    register: {
        informal: 'Il s\u2019est fait virer ! — et le projet a été annulé, forcément. (se faire + infinitive is the everyday "got …-ed")',
        neutral: 'La réunion a été reportée à lundi, en raison d\u2019un imprévu.',
        formal: 'Les modalités d\u2019application seront précisées par décret, après consultation des parties prenantes.',
    },

    culture: 'The passive is the sound of officialdom: minutes, notices, exam questions and news headlines all write "des mesures ont été annoncées" rather than naming a doer. French bureaucracy even has a name for agentless writing — style administratif. Journalists mix passive (le député a été interpellé) with the elegant gérondif (en s\u2019exprimant devant la presse). Reading a real CBC-Radio-Canada article and underlining every être + participle is the fastest way to absorb the reflex.',

    freeProduction: 'Write a short "works notice" or "project update" (8–10 sentences) about something happening in your neighbourhood or company: what has been decided, what will be built/carried out, by whom, when — using at least four passives in different tenses, two se-passives, two gerunds (en + participe), and one après avoir + participle. Then say it aloud as a 45-second announcement.',

    miniTest: [
        { question: 'The passive auxiliary is always:', options: ['avoir', 'être', 'faire', 'devenir'], answer: 'être — a été pris, sera prise, peut être pris' },
        { question: 'La loi a été ______ (voter):', options: ['voté', 'votée', 'voter', 'vote'], answer: 'votée — passive participle agrees with la loi' },
        { question: 'Ce produit ______ bien (sell):', options: ['est vendu', 'se vend', 'a vendu', 'vend'], answer: 'se vend — generic doer → se-passive' },
        { question: 'Gerund of "nous finissons":', options: ['en finissant', 'en finissons', 'finissant', 'en finir'], answer: 'en finissant — nous-stem + -ant' },
        { question: '______ avoir mangé, il est sorti:', options: ['Avant', 'Après', 'En', 'Pour'], answer: 'Après — après avoir + participle = sequence' },
    ],

    review: [
        'The participle agreement rules from A2/B1 apply unchanged — the passive just makes the subject a former object.',
        'The se-passive joins se-family verbs from A1:routine — same pronoun machinery, different meaning (generic doer).',
    ],

    traps: [
        'Passive participle agrees: les mesures ont été annoncées, la décision sera prise — and the être-auxiliary rules from A2 apply to the whole verb group.',
        'The agent takes par (écrit par) but verbs of feeling take de (aimé de tous, apprécié de ses collègues) — tests pair them.',
        'The gerund\u2019s subject must be the main clause\u2019s subject: "En lisant le livre, les idées sont venues" is wrong — someone read the book, not the ideas.',
        'se faire + infinitive is CAUSAL/getting-it-done (il s\u2019est fait opérer), not the se-passive (ça se fait) — one is about a person, the other about a thing.',
    ],

    homework: {
        intro: 'Passives in three tenses, se-passives, gerunds and sequences — build each answer in report register and make every participle agree.',
        translation: [
            { prompt: 'The proposal was approved yesterday.', answer: 'La proposition a été approuvée hier.', explanation: 'PC passive: a été + participle agreeing with la proposition (fem → approuvée). Agent dropped — normal when obvious.' },
            { prompt: 'The bridge will be built by a local company.', answer: 'Le pont sera construit par une entreprise locale.', explanation: 'Future passive: sera + construit (masc singular). Agent introduced by par — building verbs take par.' },
            { prompt: 'That\u2019s not done here. (generic doer)', answer: 'Ça ne se fait pas ici.', explanation: 'se-passive with a generic doer — French\u2019s natural alternative to "it is not done". Present tense, no agent possible.' },
            { prompt: 'You\u2019ll improve by practising every day.', answer: 'Tu t\u2019amélioreras en pratiquant chaque jour.', alt: ['Tu t’amélioreras en t’entraînant chaque jour'], explanation: 'gerund of manner/means: en + nous-stem + -ant (nous pratiquons → en pratiquant).' },
            { prompt: 'After reading the report, I called her.', answer: 'Après avoir lu le rapport, je l\u2019ai appelée.', explanation: 'après avoir + participle for the earlier action; appelée agrees with l\u2019 (her) — preceding direct object.' },
            { prompt: 'The works will be carried out in spring.', answer: 'Les travaux seront effectués au printemps.', explanation: 'effectuer = formal carry out; passive plural: effectués. au + season (au printemps).' },
        ],
        blanks: [
            { prompt: 'La loi ______ (être / adopter) à l\u2019unanimité.', answer: 'a été adoptée', explanation: 'PC passive with agreement: a été adoptée (la loi, fem). Auxiliary être throughout.' },
            { prompt: 'Ces robes ______ (se vendre) bien en été.', answer: 'se vendent', explanation: 'se-passive present: generic shoppers, no agent — se vendent.' },
            { prompt: 'Il a décroché son stage ______ (en / travailler) le week-end.', answer: 'en travaillant', explanation: 'gerund of means: en + travaillant (nous travaillons → travaill- + ant).' },
            { prompt: '______ (after / receive) ta lettre, j\u2019ai répondu tout de suite.', answer: 'Après avoir reçu', explanation: 'après avoir + participle — the action that happened BEFORE the main verb.' },
            { prompt: 'Elle est appréciée ______ tous ses collègues. (by)', answer: 'de', explanation: 'Verbs of FEELING take de as the passive agent: apprécié de, aimé de, connu de.' },
            { prompt: 'Je me ______ (get / cut) les cheveux demain.', answer: 'suis fait couper', alt: ['ferai couper'], explanation: 'se faire + infinitive: je me suis fait couper (got it done). Futur alternative: je me ferai couper.' },
        ],
        corrections: [
            { prompt: 'La décision a eu prise hier soir.', answer: 'La décision a été prise hier soir.', explanation: 'How the mistake happens: mixing the avoir-auxiliary habits of the active PC. Why it does not work: the passive auxiliary is être in every tense. How to fix it: a été prise — with feminine agreement.' },
            { prompt: 'Les mesures ont été annoncé ce matin.', answer: 'Les mesures ont été annoncées ce matin.', explanation: 'How the mistake happens: forgetting passive agreement. Why it does not work: être + participle behaves like an adjective — plural subject → -es. How to fix it: annoncées.' },
            { prompt: 'Ce livre est écrit en 1957.', answer: 'Ce livre a été écrit en 1957. / Ce livre a été écrit par Camus.', explanation: 'How the mistake happens: using the present passive for a dated event. Why it does not work: the present passive describes a general state (il est écrit à la main); dated events take the PC passive. How to fix it: a été écrit.' },
            { prompt: 'En lisant le journal, les nouvelles m\u2019ont surpris.', answer: 'En lisant le journal, j\u2019ai été surpris par les nouvelles.', explanation: 'How the mistake happens: changing subject between the gerund and the main clause. Why it does not work: the gerund shares the main subject — the news didn\u2019t read the paper. How to fix it: keep j\u2019 as the subject of both verbs.' },
            { prompt: 'Le formulaire doit rempli avant vendredi.', answer: 'Le formulaire doit être rempli avant vendredi.', explanation: 'How the mistake happens: dropping être after a modal in the passive. Why it does not work: devoir + être + participle is the full build — the être is obligatory. How to fix it: doit être rempli.' },
        ],
        writing: {
            task: 'Write a neighbourhood project update (10–14 sentences) in report register: what has been decided (PC passive), what will be carried out and when (future passive + effectuer), by whom (par-agent once), what sells/is said generically (two se-passives), and how the work is progressing (two gerunds + one après avoir). Close with one il convient de sentence.',
            requirements: [
                'Four passives across three different tenses, all participles agreeing',
                'One par-agent and one de-agent (feeling verb)',
                'Two se-passives',
                'Two gerunds (en + participe) and one après avoir + participle',
                'One il convient de + infinitive closing',
            ],
            minWords: 100,
        },
        checklist: [
            'I build the passive in any tense: être (varied) + agreeing participle',
            'I introduce the agent with par (actions) and de (feelings)',
            'I choose the se-passive when the doer is generic (ça se dit, ça se vend)',
            'I form the gerund from the nous-present (nous écoutons → en écoutant)',
            'I sequence with après avoir/être + participle and anticipate with avant de + infinitive',
            'I keep one subject across a gerund and its main clause',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The passive in every tense: présent — il est construit · PC — il a été construit · imparfait — il était construit · futur — il sera construit · modal — il peut être construit. The participle ALWAYS agrees with the subject.',
            examples: [
                { fr: 'La loi est votée. · La loi a été votée. · La loi sera votée. · La loi doit être votée.', en: 'one agreement, four tenses' },
            ],
        },
        {
            explanation: 'Agents: par for actions (votée par l\u2019assemblée, écrit par Hugo), de for feelings (aimé de tous, respecté de ses pairs, connu de personne). No agent at all when context knows the doer.',
            examples: [
                { fr: 'Ce pont a été construit par Eiffel. · Ce professeur est apprécié de ses élèves.', en: 'par vs de' },
            ],
        },
        {
            explanation: 'The se-passive replaces the passive when the doer is people-in-general: ça se dit, ça se fait, ça se mange, ce livre se lit facilement. Present tense, no par possible.',
            examples: [
                { fr: 'Comment ça se dit ? = How is that said? · Ça ne se fait pas ici.', en: 'the everyday passive' },
            ],
        },
        {
            explanation: 'Gerund = en + participe présent, built from the nous-present: nous parlons → en parlant, nous faisons → en faisant, nous prenons → en prenant. It expresses simultaneity (en souriant), means (en travaillant), or condition (en insistant).',
            examples: [
                { fr: 'Il est arrivé en chantant. · On réussit en pratiquant.', en: 'manner and means' },
            ],
        },
        {
            explanation: 'Sequences: après avoir + participle (earlier action, same subject) / après être + participle (motion-reflexive verbs: après être rentré); avant de + infinitive (later action); après que + indicative clause.',
            examples: [
                { fr: 'Après avoir vérifié, elle a signé. · Après être parti, il m\u2019a appelée.', en: 'before-the-main-verb structures' },
            ],
        },
        {
            explanation: 'Getting-things-done: se faire + infinitive (je me suis fait couper les cheveux, il s\u2019est fait avoir = he got fooled) and faire + infinitive (j\u2019ai fait réparer la voiture) — two levels of the causal, both exam favourites.',
            examples: [
                { fr: 'Elle s\u2019est fait rembourser. = She got refunded.', en: 'se faire in real life' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'voix passive': { en: 'passive voice', pron: 'vwah pah-SEEV', gender: 'feminine', type: 'noun', note: 'être + participe passé, agent introduced by par.' },
        'votée': { en: 'voted (fem — PC of voter)', pron: 'voh-TAY', type: 'verb', base: { form: 'voter', en: 'to vote' }, note: 'la loi a été votée — passive agreement in action.' },
        'adoptée': { en: 'adopted / passed (fem)', pron: 'ah-dohp-TAY', type: 'verb', base: { form: 'adopter', en: 'to adopt' }, note: 'adopted a law = adopter une loi.' },
        'construit': { en: 'built (past participle of construire)', pron: 'kohns-TRÜEE', type: 'verb', base: { form: 'construire', en: 'to build' }, note: 'irregular participle; sera construit / construite.' },
        'rédigé': { en: 'written / drafted (PC of rédiger)', pron: 'ray-dee-ZHAY', type: 'verb', base: { form: 'rédiger', en: 'to draft / write up' }, note: 'report-register write: rédiger un rapport.' },
        'effectué': { en: 'carried out (PC of effectuer)', pron: 'eh-fek-TÜAY', type: 'verb', base: { form: 'effectuer', en: 'to carry out' }, note: 'les travaux seront effectués — the administrative faire.' },
        'inaugurée': { en: 'inaugurated (fem)', pron: 'ee-noh-gü-RAY', type: 'verb', base: { form: 'inaugurer', en: 'to inaugurate' }, note: 'la bibliothèque sera inaugurée — opening ceremonies.' },
        'vérifié': { en: 'checked (PC of vérifier)', pron: 'vay-ree-FYAY', type: 'verb', base: { form: 'vérifier', en: 'to check' }, note: 'après avoir vérifié… — the sequence opener.' },
        'approuvée': { en: 'approved (fem)', pron: 'ah-proo-VAY', type: 'verb', base: { form: 'approuver', en: 'to approve' }, note: 'la proposition a été approuvée.' },
        'apprécié': { en: 'appreciated / liked (masc)', pron: 'ah-pray-SYAY', type: 'verb', base: { form: 'apprécier', en: 'to appreciate' }, note: 'apprécié DE ses collègues — feeling verbs take de as agent.' },
        'rembourser': { en: 'to refund / pay back', pron: 'rahm-boor-SAY', type: 'verb', note: 'se faire rembourser = to get a refund.' },
        'virer': { en: 'to fire (slang) / to turn', pron: 'vee-RAY', type: 'verb', register: 'informal', note: 'se faire virer = to get fired. Formal: être licencié.' },
        'licencié': { en: 'dismissed / laid off (formal)', pron: 'lee-sahn-SYAY', type: 'verb', base: { form: 'licencier', en: 'to dismiss / lay off' }, note: 'être licencié — the formal passive of virer.' },
        'gérondif': { en: 'gerund (en + participle)', pron: 'zhay-rohn-DEEF', gender: 'masculine', type: 'noun', note: 'en travaillant — manner, means, condition in one word.' },
        'unanimité': { en: 'unanimity', pron: 'ü-nah-nee-MAY', gender: 'feminine', type: 'noun', note: 'à l\u2019unanimité = unanimously — vote vocabulary.' },
        'modalités': { en: 'terms / arrangements (plural)', pron: 'moh-dah-lee-TAY', gender: 'feminine', type: 'noun', note: 'les modalités d\u2019application — administrative set phrase.' },
        'données': { en: 'data (plural)', pron: 'doh-NAY', gender: 'feminine', type: 'noun', note: 'les données = the data; vérifier les données.' },
        'contrôleur': { en: 'controller / inspector', pron: 'kohn-troh-LUHR', gender: 'masculine', type: 'noun', fem: { word: 'contrôleuse', en: 'controller (fem)' }, note: 'le contrôle des contrôles — inspection vocabulary.' },
        'mobilier': { en: 'furniture (collective)', pron: 'moh-bee-LYAY', gender: 'masculine', type: 'noun', note: 'le mobilier urbain = street furniture (benches, signs).' },
        's\u2019approprier': { en: 'to make one\u2019s own / take ownership of', pron: 'sah-pro-pree-AY', type: 'verb', note: 'le quartier s\u2019en appropriera — reflexive, essay register.' },
    },
};

// ── B2 · Canadian Society Themes ────────────────────────────────────────────
const b2Societe: StaticFrenchLesson = {
    title: 'Canadian Society Themes',
    objective: 'Discuss healthcare, employment, housing and the environment with essay-ready vocabulary and trend language — the TCF Canada\u2019s favourite reading, listening and essay territory — using statistics phrases, trend verbs and impersonal commentary structures.',

    vocabulary: [
        { fr: 'le système de santé', en: 'the healthcare system', pron: 'luh sees-TEHM duh sahn-TAY', gender: 'masculine', register: 'neutral', example: { fr: 'Le système de santé est sous pression.', en: 'The healthcare system is under pressure.' }, related: [{ fr: 'l\u2019assurance-maladie', en: 'health insurance' }] },
        { fr: 'un médecin de famille', en: 'a family doctor', pron: 'uhn meh-duh-SAN duh fah-MEE-yuh', gender: 'masculine', register: 'neutral', example: { fr: 'Trouver un médecin de famille est difficile.', en: 'Finding a family doctor is difficult.' }, related: [{ fr: 'la liste d\u2019attente', en: 'the waiting list' }] },
        { fr: 'les urgences', en: 'the emergency room', pron: 'layz ür-ZHAHNSS', gender: 'feminine', register: 'neutral', example: { fr: 'Les urgences débordent chaque hiver.', en: 'The ER overflows every winter.' }, related: [{ fr: 'un cas urgent', en: 'an urgent case' }] },
        { fr: 'le chômage', en: 'unemployment', pron: 'luh shoh-MAHZH', gender: 'masculine', register: 'neutral', example: { fr: 'Le taux de chômage baisse lentement.', en: 'The unemployment rate is slowly falling.' }, related: [{ fr: 'un chômeur', en: 'an unemployed person' }] },
        { fr: 'l\u2019embauche', en: 'hiring', pron: 'lahm-BOHSH', gender: 'feminine', register: 'neutral', example: { fr: 'L\u2019embauche a repris au printemps.', en: 'Hiring picked up in spring.' }, related: [{ fr: 'embaucher', en: 'to hire' }] },
        { fr: 'le salaire minimum', en: 'the minimum wage', pron: 'luh sah-LAIR mee-nee-MOHM', gender: 'masculine', register: 'neutral', example: { fr: 'Le salaire minimum a augmenté.', en: 'The minimum wage went up.' }, related: [{ fr: 'le SMIC (France)', en: 'the French minimum wage' }] },
        { fr: 'la pénurie de logements', en: 'the housing shortage', pron: 'lah pay-nü-REE duh lohzh-MAHN', gender: 'feminine', register: 'neutral', example: { fr: 'La pénurie de logements frappe les grandes villes.', en: 'The housing shortage hits big cities.' }, related: [{ fr: 'un logement abordable', en: 'affordable housing' }] },
        { fr: 'le changement climatique', en: 'climate change', pron: 'luh shahnzh-MAHN klee-mah-TEEK', gender: 'masculine', register: 'neutral', example: { fr: 'Le changement climatique transforme l\u2019Arctique.', en: 'Climate change is transforming the Arctic.' }, related: [{ fr: 'le réchauffement', en: 'the warming' }] },
        { fr: 'le recyclage', en: 'recycling', pron: 'luh ruh-see-klah-ZHAH', gender: 'masculine', register: 'neutral', example: { fr: 'Le recyclage progresse au Québec.', en: 'Recycling is progressing in Quebec.' }, related: [{ fr: 'recycler', en: 'to recycle' }] },
        { fr: 'les transports en commun', en: 'public transit', pron: 'lay trahn-SPOR ahn kuh-MÜN', gender: 'masculine', register: 'neutral', example: { fr: 'Investir dans les transports en commun réduit la pollution.', en: 'Investing in transit reduces pollution.' }, related: [{ fr: 'le réseau', en: 'the network' }] },
        { fr: 'le taux de', en: 'the rate of', pron: 'luh TOH duh', type: 'phrase', register: 'formal', example: { fr: 'Le taux d\u2019immigration atteint un record.', en: 'The immigration rate is hitting a record.' }, related: [{ fr: 'en hausse / en baisse', en: 'rising / falling' }] },
        { fr: 'il convient de souligner', en: 'it should be pointed out', pron: 'eel kohn-VYEN duh soo-lee-NYAY', type: 'phrase', register: 'formal', example: { fr: 'Il convient de souligner les progrès réalisés.', en: 'The progress made should be pointed out.' }, related: [{ fr: 'on remarque que', en: 'we note that' }] },
    ],

    pronunciation: [
        { fr: 'les urgences', approx: 'lay-zür-ZHAHNSS', en: 'liaison: les urgences → "lay-zur"' },
        { fr: 'le chômage', approx: 'luh shoh-MAHZH', en: 'the circumflex lengthens the o: "shoh"' },
        { fr: 'l\u2019embauche', approx: 'lahm-BOHSH', en: 'final -che = "sh"' },
        { fr: 'pénurie', approx: 'pay-nü-REE', en: 'stress on the last syllable, u says "ü"' },
        { fr: 'climatique', approx: 'klee-mah-TEEK', en: 'not "CLY-matic" — three clean i/e sounds' },
        { fr: 'il convient de souligner', approx: 'eel kohn-VYEN duh soo-lee-NYAY', en: 'the essay voice: even stress, clear nasal -gn-"NYA".' },
    ],

    grammar: {
        rule: 'Society essays run on three machines: trend verbs (augmenter, baisser, progresser, exploser), statistics frames (le taux de, environ, près de, une hausse de X %), and impersonal commentary (on constate que, il convient de souligner, il est admis que).',
        explanation: 'Describe trends with precision: augmenter/baisser for steady movement (les prix augmentent de 3 %), progresser/exploser for pace (le télétravail explose), stagner/ fluctuer for nuance (le marché stagne). Attach numbers the French way: une hausse de 5 % (a rise OF 5 %), augmenter de 5 % (to rise BY), passer de X à Y (move from X to Y), atteindre un record, près de / environ / plus de + number. Commentary verbs impersonalize: on constate que + indicative (observation), il est admis que (consensus), il convient de souligner que (formal emphasis), cela s\u2019explique par (explanation). Cause and consequence reuse the B1/B2 connector families, but with society nouns: grâce à (des investissements), en raison de (la pénurie), ce phénomène s\u2019explique par…. Vocabulary arrives in themed clusters — health (système de santé, urgence, liste d\u2019attente), work (embauche, chômage, salaire), environment (climat, recyclage, réseau) — and the essay scores by recombining clusters with the trend machines.',
        examples: [
            { fr: 'Le taux de chômage est passé de 7 % à 5,4 % en deux ans.', en: 'The unemployment rate went from 7% to 5.4% in two years.', breakdown: ['passer de … à = from … to (trend structure)', 'le taux de = the rate of', 'en deux ans = within two years'] },
            { fr: 'On constate une hausse de 12 % des loyers à Toronto.', en: 'A 12% rise in rents is observed in Toronto.', breakdown: ['on constate = impersonal observation', 'une hausse de 12 % = a rise OF 12 %', 'des loyers = rents'] },
            { fr: 'Les urgences débordent en raison de la pénurie de médecins.', en: 'ERs overflow because of the doctor shortage.', breakdown: ['déborder = to overflow', 'en raison de = due to (formal cause)', 'la pénurie de = shortage of'] },
            { fr: 'Il convient de souligner que le recyclage progresse, grâce aux nouvelles collectes.', en: 'It should be noted that recycling is progressing, thanks to new collections.', breakdown: ['il convient de souligner = formal emphasis', 'progresse = steady positive trend', 'grâce à = thanks to (positive cause)'] },
            { fr: 'Environ un tiers des jeunes quittent la région pour l\u2019emploi.', en: 'About a third of young people leave the region for work.', breakdown: ['environ = about', 'un tiers = a third (fractions: un demi, un quart, un tiers)', 'pour l\u2019emploi = for work'] },
            { fr: 'Ce phénomène s\u2019explique par la hausse du coût de la vie.', en: 'This phenomenon is explained by the rising cost of living.', breakdown: ['s\u2019expliquer par = is explained by', 'le coût de la vie = cost of living', 'impersonal explanation'] },
        ],
        commonMistakes: [
            'Translating "rose by 5%" as augmenté à 5 % — by takes de: augmenté de 5 %. À marks the ENDPOINT (monté à 12 %).',
            'Using plus de / environ without a number noun: environ les jeunes is wrong — environ + quantity (environ 200 personnes, un tiers).',
            'Saying le chômage est baissé — baisser is intransitive here: le chômage baisse. Only the passive/active mix drops auxiliary choice by accident.',
            'Writing santé for the system: la santé (health) vs le système de santé (the system) — essays need the full noun for the institution.',
        ],
    },

    transformations: [
        { type: 'Plain fact', fr: 'Il y a moins de logements.', en: 'There is less housing.' },
        { type: 'Trend + number', fr: 'Les mises en chantier ont baissé de 8 %.', en: 'Housing starts fell by 8%.' },
        { type: 'Rate frame', fr: 'Le taux d\u2019inoccupation atteint 1,5 %.', en: 'The vacancy rate stands at 1.5%.' },
        { type: 'Observation', fr: 'On constate une pénurie de main-d\u2019œuvre.', en: 'A labour shortage is observed.' },
        { type: 'Explanation', fr: 'Ce phénomène s\u2019explique par la reprise.', en: 'This phenomenon is explained by the recovery.' },
        { type: 'Emphasis', fr: 'Il convient de souligner l\u2019urgence du dossier.', en: 'The urgency of the file should be stressed.' },
        { type: 'Cause', fr: 'Grâce aux investissements, le réseau s\u2019étend.', en: 'Thanks to investment, the network is expanding.' },
        { type: 'Counter', fr: 'Néanmoins, les inégalités persistent.', en: 'Nevertheless, inequalities persist.' },
    ],

    sentenceBuilding: [
        { fr: 'Les dépenses de santé augmentent chaque année.', en: 'Health spending rises every year.' },
        { fr: 'Les dépenses de santé augmentent de 5 % par an, notamment à cause du vieillissement de la population.', en: 'Health spending rises 5% a year, notably because of the ageing population.' },
        { fr: 'On constate que les délais d\u2019attente s\u2019allongent, en particulier aux urgences, où le personnel manque.', en: 'Waiting times are observed to lengthen, especially in the ER, where staff are lacking.' },
        { fr: 'Ce phénomène s\u2019explique par deux facteurs : le vieillissement démographique et la pénurie de médecins de famille.', en: 'This phenomenon is explained by two factors: demographic ageing and the family-doctor shortage.' },
        { fr: 'Il convient de souligner que des solutions existent — cliniques réseau, télémédecine — et que leur financement l\u2019emporte sur son coût.', en: 'It should be noted that solutions exist — network clinics, telemedicine — and that funding them outweighs its cost.' },
    ],

    practice: [
        { instruction: 'Trend verb:', question: 'Les prix ______ (augmenter) de 4 % cette année.', answer: 'augmentent — present for an ongoing trend; de for BY' },
        { instruction: 'Statistics frame:', question: 'Une ______ (rise) de 10 % des loyers.', answer: 'hausse — une hausse de 10 % (la baisse is the opposite)' },
        { instruction: 'Rate:', question: 'Le ______ (rate) de chômage atteint 5,2 %.', answer: 'taux — invariable plural: les taux' },
        { instruction: 'Impersonal:', question: '______ constate une pénurie de personnel.', answer: 'On — on constate que + indicative' },
        { instruction: 'Explanation:', question: 'Ce phénomène ______ explique par la reprise.', answer: 's\u2019 — s\u2019expliquer par = is explained by' },
        { instruction: 'Fraction:', question: '______ tiers des logements sont locatifs.', answer: 'Un — un tiers = a third' },
    ],

    translationPractice: [
        { en: 'The unemployment rate fell by half a point.', fr: 'Le taux de chômage a baissé d\u2019un demi-point.' },
        { en: 'About 40% of newcomers settle in Montreal.', fr: 'Environ 40 % des nouveaux arrivants s\u2019installent à Montréal.' },
        { en: 'The housing shortage is explained by population growth.', fr: 'La pénurie de logements s\u2019explique par la croissance démographique.' },
        { en: 'It should be noted that hiring has picked up.', fr: 'Il convient de souligner que l\u2019embauche a repris.' },
        { en: 'Thanks to recycling, waste is decreasing.', fr: 'Grâce au recyclage, les déchets diminuent.' },
        { en: 'Waiting times keep getting longer in the ER.', fr: 'Les délais d\u2019attente s\u2019allongent toujours plus aux urgences.' },
    ],

    reverseTranslation: [
        { fr: 'Le salaire minimum augmente de 3 % en octobre.', en: 'The minimum wage rises by 3% in October.' },
        { fr: 'On remarque une baisse de la natalité depuis dix ans.', en: 'A drop in the birth rate has been noted for ten years.' },
        { fr: 'Investir dans le réseau de transport coûte cher, mais l\u2019emporte sur l\u2019inaction.', en: 'Investing in the transit network is costly, but outweighs inaction.' },
        { fr: 'Un quart des emplois seront transformés d\u2019ici 2030.', en: 'A quarter of jobs will be transformed by 2030.' },
    ],

    register: {
        informal: 'Encore des retards à l\u2019hôpital… c\u2019est le monde à l\u2019envers ! (spoken frustration — the essay version follows)',
        neutral: 'Les délais aux urgences s\u2019allongent, surtout en hiver.',
        formal: 'Il convient de souligner que les délais aux urgences s\u2019allongent en raison d\u2019une pénurie structurelle de personnel, phénomène qui s\u2019explique par le sous-financement chronique du système.',
    },

    culture: 'The TCF Canada chooses its documents from exactly these fields: RAMQ and health-card notices, Statistique Canada tables, housing-market reports, transit announcements. Canadians write society essays with numbers — the correcteur expects at least one figure and one trend verb per development. Quebec specifics worth knowing: la RAMQ (public health insurance), le régime mixte of healthcare, la Loi 101 for language policy — one real reference in an essay reads as genuine settlement knowledge.',

    freeProduction: 'Write a mini-essay (120–160 words) on: "La pénurie de logements au Canada" — open with an impersonal observation (on constate…), give two statistics (une hausse de X %, environ…), explain with s\u2019explique par + two causes, weigh a solution (il convient de…), close with l\u2019emporter sur. Use at least six vocabulary items from the health/work/housing/environment clusters.',

    miniTest: [
        { question: 'Les prix ont augmenté ______ 5 %.', options: ['à', 'de', 'sur', 'pour'], answer: 'de — rise BY takes de; à marks the endpoint' },
        { question: 'The emergency room is:', options: ['les urgences', 'le secours', 'l\u2019urgence voiture', 'l\u2019hôpital rapide'], answer: 'les urgences — always plural' },
        { question: '______ constate une hausse des loyers.', options: ['Il', 'On', 'Cela', 'Celui'], answer: 'On — impersonal observation frame' },
        { question: 'Ce phénomène ______ explique par la reprise:', options: ['se', 's\u2019', 'y', 'en'], answer: 's\u2019 — s\u2019expliquer par' },
        { question: 'Un tiers means:', options: ['a third', 'three', 'a tenth', 'thirty'], answer: 'a third — un demi (half), un quart (quarter), un tiers (third)' },
    ],

    review: [
        'The counter-argument machinery from B2:argumentation slots straight into society essays: certes, le coût est élevé ; néanmoins…',
        'The passive from B2:passif is how statistics are reported: une hausse a été enregistrée, des mesures ont été annoncées.',
    ],

    traps: [
        'augmenter DE 5 % (by) vs augmenter À 5 % (up to) — the preposition flips the meaning; exams test both in the same item.',
        'on constate que + INDICATIVE (fact), il est possible que + subjunctive (possibility) — commentary verbs differ in mood; don\u2019t homogenize them.',
        'environ / près de / plus de need a quantity: environ 30 %, près de 200 000 personnes — never a bare noun.',
        'Invariable plural trap: les taux (rates), les urgences (the ER) — memorize the plural forms because articles agree with them (aux urgences).',
    ],

    homework: {
        intro: 'Society-essay machinery: trend verbs with de/à, statistics frames, impersonal commentary, and the four vocabulary clusters. Answer in report register.',
        translation: [
            { prompt: 'The unemployment rate fell by half a point.', answer: 'Le taux de chômage a baissé d\u2019un demi-point.', explanation: 'baisser DE + amount (by); demi-point (masc) — demie only for heure. taux stays singular here.' },
            { prompt: 'Rents rose by 10% this year.', answer: 'Les loyers ont augmenté de 10 % cette année.', explanation: 'augmenter de = rise by. Percentage written with a space before %.' },
            { prompt: 'It should be noted that hiring has picked up.', answer: 'Il convient de souligner que l\u2019embauche a repris.', explanation: 'il convient de + infinitive; reprendre (recommencer) for recovery — PC because the turnaround is an event.' },
            { prompt: 'The shortage is explained by demographic growth.', answer: 'La pénurie s\u2019explique par la croissance démographique.', alt: ['La pénurie de logements s’explique par la croissance démographique'], explanation: 's\u2019expliquer par = impersonal explanation; croissance démographique is the set phrase.' },
            { prompt: 'Thanks to transit, pollution is decreasing.', answer: 'Grâce aux transports en commun, la pollution diminue.', explanation: 'grâce à + positive cause (aux = à + les); diminuer — intransitive, no auxiliary drama.' },
            { prompt: 'A 20% rise in ER visits has been recorded.', answer: 'Une hausse de 20 % des visites aux urgences a été enregistrée.', explanation: 'passive + statistics: une hausse de X % … a été enregistrée — the reporting frame of news French.' },
        ],
        blanks: [
            { prompt: 'Le taux de chômage est passé ______ 6 % à 4,8 %.', answer: 'de', explanation: 'passer DE X À Y — from … to …; both prepositions in the same frame.' },
            { prompt: '______ un tiers des jeunes quittent la région.', answer: 'Environ', explanation: 'environ + fraction/quantity. un tiers = one third.' },
            { prompt: 'Les urgences débordent en ______ de la pénurie de personnel.', answer: 'raison', explanation: 'en raison de = due to (formal cause). à cause de also works but en raison de is the essay choice.' },
            { prompt: 'On ______ que les délais s\u2019allongent. (observe — indicative!)', answer: 'constate', explanation: 'on constate que + indicative: it reports a fact. The subjunctive would belong to doubt verbs.' },
            { prompt: 'Le recyclage ______ (progress) grâce aux nouvelles collectes.', answer: 'progresse', explanation: 'progresser — steady positive trend verb, present for an ongoing development.' },
            { prompt: 'Les dépenses de santé ont ______ (rise) de 5 %.', answer: 'augmenté', alt: ['bondi'], explanation: 'augmenter (rise) takes avoir in the active PC. bondir = jump (stronger).' },
        ],
        corrections: [
            { prompt: 'Les prix ont augmenté à 5 % cette année.', answer: 'Les prix ont augmenté de 5 % cette année.', explanation: 'How the mistake happens: translating "by" as à. Why it does not work: à marks the ENDPOINT (monté à 5 %); de marks the change. How to fix it: augmenté de 5 %.' },
            { prompt: 'Il constate une pénurie de logements.', answer: 'On constate une pénurie de logements.', explanation: 'How the mistake happens: using il for the impersonal observation. Why it does not work: the observation frame is on constate — il constate means a specific he. How to fix it: On constate…' },
            { prompt: 'Le chômage est baissé de deux points.', answer: 'Le chômage a baissé de deux points.', explanation: 'How the mistake happens: treating baisser as a motion verb. Why it does not work: baisser (intransitive) takes avoir. How to fix it: a baissé. ( être baisse exists only as transitive passive: le store est baissé.)' },
            { prompt: 'Environ les jeunes quittent la région.', answer: 'Environ un tiers des jeunes quittent la région. / Près de 30 % des jeunes…', explanation: 'How the mistake happens: attaching environ to a bare noun. Why it does not work: environ/près de/plus de quantify — they need a number or fraction. How to fix it: add the quantity.' },
            { prompt: 'Ce phénomène est explique par la reprise.', answer: 'Ce phénomène s\u2019explique par la reprise.', explanation: 'How the mistake happens: mixing passive and pronominal forms. Why it does not work: s\u2019expliquer par is reflexive-explaining, not passive. How to fix it: s\u2019explique par — one pronoun, no été.' },
        ],
        writing: {
            task: 'Mini-essay (120–160 words) on one of: housing shortage, healthcare wait times, or public transit investment. Structure: on constate observation with a figure → trend verbs with de/à → s\u2019explique par + two causes → il convient de solution + l\u2019emporter sur weighing. Four vocabulary clusters minimum.',
            requirements: [
                'One impersonal observation (on constate / on remarque)',
                'Two statistics frames (une hausse de X %, environ, près de)',
                'Two different trend verbs, one with de, one with à',
                'One s\u2019expliquer par explanation with two causes',
                'One il convient de / il est admis que + a l\u2019emporter sur close',
            ],
            minWords: 110,
        },
        checklist: [
            'I use trend verbs with the right preposition: augmenter de (by), monter à (up to), passer de X à Y',
            'I frame statistics: le taux de, une hausse/baisse de X %, environ, près de, un tiers',
            'I comment impersonally: on constate que + indicative, il convient de souligner',
            'I explain with s\u2019expliquer par + cause nouns',
            'I control the four clusters: health, work, housing, environment',
            'I weigh with l\u2019emporter sur and counter with néanmoins / certes… mais',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Trend verb pairs: augmenter / la hausse · baisser / la baisse · progresser / les progrès · stagner / la stagnation · exploser / le boom · diminuer / la diminution. Verbs move, nouns report (une hausse de X %).',
            examples: [
                { fr: 'Les prix augmentent. → On constate une hausse des prix.', en: 'verb to noun' },
            ],
        },
        {
            explanation: 'The de/à dial: augmenter DE 5 % (by 5), monter À 5 % (up to 5), passer de 3 % à 5 % (from… to), atteindre 5 % (reach). Four prepositions, four meanings — rehearse them as one set.',
            examples: [
                { fr: 'Le taux est passé de 5 % à 3 % (baissé de deux points).', en: 'the full sentence' },
            ],
        },
        {
            explanation: 'Quantity quantifiers need numbers: environ 30 % · près de 200 000 · plus de la moitié · un tiers / un quart / un demi. Fractions: la moitié (half), le quart (quarter), le tiers (third).',
            examples: [
                { fr: 'Environ un quart des logements sont locatifs.', en: 'fraction in the wild' },
            ],
        },
        {
            explanation: 'Commentary ladder: on constate que (observed fact) → il est admis que (consensus) → il convient de souligner que (formal emphasis) → il est possible que + SUBJ (possibility). Mood follows the verb.',
            examples: [
                { fr: 'On constate que le taux baisse. · Il est possible que le taux baisse.', en: 'indicative vs subjunctive commentary' },
            ],
        },
        {
            explanation: 'Cluster sets: HEALTH — le système de santé, les urgences, la liste d\u2019attente, un médecin de famille. WORK — l\u2019embauche, le chômage, le salaire minimum, la main-d\u2019œuvre. HOUSING — la pénurie, le loyer, un logement abordable, la mise en chantier. ENVIRONMENT — le changement climatique, le recyclage, le réseau, les émissions.',
            examples: [
                { fr: 'La pénurie de main-d\u2019œuvre freine l\u2019embauche dans le système de santé.', en: 'three clusters in one sentence' },
            ],
        },
        {
            explanation: 'Canadian anchors worth naming: la RAMQ (Quebec health insurance), Statistique Canada (statistics), la Loi 101 (language law), les provinces / le fédéral. One real institution per essay reads as lived knowledge.',
            examples: [
                { fr: 'Selon Statistique Canada, l\u2019embauche a repris au Québec.', en: 'the citable source frame' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'système de santé': { en: 'healthcare system', pron: 'sees-TEHM duh sahn-TAY', gender: 'masculine', plural: 'systèmes de santé', type: 'noun', note: 'the institution — not just la santé (health).' },
        'médecin de famille': { en: 'family doctor', pron: 'meh-duh-SAN duh fah-MEE-yuh', gender: 'masculine', plural: 'médecins de famille', type: 'noun', note: 'Canada\u2019s gatekeeper doctor; trouver un médecin de famille = the classic difficulty.' },
        'urgences': { en: 'emergency room (always plural)', pron: 'ür-ZHAHNSS', gender: 'feminine', type: 'noun', note: 'aux urgences = in the ER; débordées = overcrowded every winter.' },
        'chômage': { en: 'unemployment', pron: 'shoh-MAHZH', gender: 'masculine', type: 'noun', note: 'le taux de chômage; être au chômage = to be unemployed.' },
        'embauche': { en: 'hiring', pron: 'ahm-BOHSH', gender: 'feminine', type: 'noun', note: 'l\u2019embauche a repris = hiring picked up; embaucher quelqu\u2019un = to hire.' },
        'salaire minimum': { en: 'minimum wage', pron: 'sah-LAIR mee-nee-MOHM', gender: 'masculine', plural: 'salaires minimums/minimum', type: 'noun', note: 'France: le SMIC. augmenter le salaire minimum — classic essay subject.' },
        'pénurie': { en: 'shortage', pron: 'pay-nü-REE', gender: 'feminine', plural: 'pénuries', type: 'noun', note: 'une pénurie de + noun: de logements, de main-d\u2019œuvre, de personnel.' },
        'logement': { en: 'housing / dwelling', pron: 'lohzh-MAHN', gender: 'masculine', plural: 'logements', type: 'noun', note: 'un logement abordable = affordable housing — the policy phrase.' },
        'changement climatique': { en: 'climate change', pron: 'shahnzh-MAHN klee-mah-TEEK', gender: 'masculine', type: 'noun', note: 'le réchauffement climatique = global warming; les émissions de GES (gaz à effet de serre).' },
        'recyclage': { en: 'recycling', pron: 'ruh-see-klah-ZHAH', gender: 'masculine', type: 'noun', note: 'faire le recyclage; la collecte = pickup/collection.' },
        'transports en commun': { en: 'public transit', pron: 'trahn-SPOR ahn kuh-MÜN', gender: 'masculine', type: 'noun', note: 'investir dans les transports en commun; le réseau = the network.' },
        'taux': { en: 'rate (invariable plural)', pron: 'TOH', gender: 'masculine', type: 'noun', note: 'le taux de chômage / les taux d\u2019intérêt — same form singular and plural.' },
        'hausse': { en: 'rise / increase', pron: 'OHSS', gender: 'feminine', plural: 'hausses', type: 'noun', note: 'une hausse de X %; en hausse = rising. Opposite: la baisse.' },
        'baisse': { en: 'drop / decrease', pron: 'BEHSS', gender: 'feminine', plural: 'baisses', type: 'noun', note: 'une baisse de X %; en baisse = falling.' },
        'constate': { en: 'observes / notes (on constate)', pron: 'kohns-TAHT', type: 'verb', base: { form: 'constater', en: 'to observe' }, note: 'on constate que + INDICATIVE — the reporting frame of essays.' },
        'souligner': { en: 'to stress / underline', pron: 'soo-lee-NYAY', type: 'verb', register: 'formal', note: 'il convient de souligner que… — the emphasis frame.' },
        'vieillissement': { en: 'ageing', pron: 'vyay-EESS-MAHN', gender: 'masculine', type: 'noun', note: 'le vieillissement de la population — the demographic cause.' },
        'croissance': { en: 'growth', pron: 'krwah-SAHNSS', gender: 'feminine', type: 'noun', note: 'la croissance démographique / économique.' },
        'main-d\u2019œuvre': { en: 'workforce / labour', pron: 'man-DUVR', gender: 'feminine', type: 'noun', note: 'une pénurie de main-d\u2019œuvre — the labour-shortage phrase.' },
        'délais': { en: 'timeframes / waits', pron: 'day-LEH', gender: 'masculine', type: 'noun', note: 'les délais d\u2019attente = waiting times; s\u2019allonger = to lengthen.' },
        's\u2019allonger': { en: 'to lengthen / grow longer', pron: 'sah-lohn-ZHAY', type: 'verb', note: 'les délais s\u2019allongent — pronominal trend verb.' },
        'enregistrée': { en: 'recorded (fem — PC of enregistrer)', pron: 'ahn-ruh-JEE-STRAY', type: 'verb', base: { form: 'enregistrer', en: 'to record' }, note: 'une hausse a été enregistrée — the news-reporting passive.' },
        'RAMQ': { en: 'Régie de l\u2019assurance-maladie du Québec (public health insurance)', pron: 'rahm-KÜ', gender: 'feminine', type: 'noun', note: 'la carte RAMQ = the Quebec health card — cite it in Canada essays.' },
        'démographique': { en: 'demographic', pron: 'day-moh-grah-FEEK', type: 'adjective', note: 'la croissance démographique — adjective stays the same for both genders.' },
    },
};

export const STATIC_B2_PART2: Record<string, StaticFrenchLesson> = {
    'B2:passif': b2Passif,
    'B2:societe': b2Societe,
};
