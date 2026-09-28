// B2 lectures part 1 — Subjunctive Masterclass, Formal vs Informal Register,
// Structured Argumentation. Same gold-standard format: full lesson + traps +
// homework (A–E) + checklistRemedial + glossary. Extras live in frenchLessonExtras.ts.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── B2 · Subjunctive Masterclass ────────────────────────────────────────────
const b2Subjonctif: StaticFrenchLesson = {
    title: 'Subjunctive Masterclass',
    objective: 'Form the present subjunctive for every verb (regular, stem-changing, irregular), trigger it with the right expressions (il faut que, bien que, pour que, emotions, doubt), and keep the indicative where French demands it — the tense that separates B1 from B2 writing.',

    vocabulary: [
        { fr: 'il faut que', en: 'it is necessary that (→ subjunctive)', pron: 'eel foh kuh', type: 'phrase', register: 'neutral', example: { fr: 'Il faut que tu viennes demain.', en: 'You have to come tomorrow.' }, related: [{ fr: 'il faudra que', en: 'it will be necessary that' }] },
        { fr: 'bien que', en: 'although (→ subjunctive)', pron: 'byan kuh', type: 'phrase', register: 'formal', example: { fr: 'Bien qu\u2019il soit tard, je travaille.', en: 'Although it\u2019s late, I\u2019m working.' }, related: [{ fr: 'quoique', en: 'although (→ subj.)' }] },
        { fr: 'pour que', en: 'so that (→ subjunctive)', pron: 'poor kuh', type: 'phrase', register: 'neutral', example: { fr: 'Je t\u2019explique pour que tu comprennes.', en: 'I\u2019m explaining so that you understand.' }, related: [{ fr: 'afin que', en: 'in order that (formal)' }] },
        { fr: 'je doute que', en: 'I doubt that (→ subjunctive)', pron: 'zhuh doot kuh', type: 'phrase', register: 'neutral', example: { fr: 'Je doute qu\u2019il pleuve demain.', en: 'I doubt it will rain tomorrow.' }, related: [{ fr: 'il est peu probable que', en: 'it\u2019s unlikely that' }] },
        { fr: 'je suis content que', en: 'I\u2019m happy that (→ subjunctive)', pron: 'zhuh süee kohn-TAHN kuh', type: 'phrase', register: 'neutral', example: { fr: 'Je suis content que tu sois là.', en: 'I\u2019m happy you\u2019re here.' }, related: [{ fr: 'je suis ravi que', en: 'I\u2019m delighted that' }] },
        { fr: 'avoir peur que', en: 'to be afraid that (→ subjunctive)', pron: 'ah-VWAHR puhr kuh', type: 'phrase', register: 'neutral', example: { fr: 'J\u2019ai peur qu\u2019il ne pleuve.', en: 'I\u2019m afraid it might rain (expletive ne).' }, related: [{ fr: 'craindre que', en: 'to fear that (formal)' }] },
        { fr: 'avant que', en: 'before (→ subjunctive)', pron: 'ah-vahn kuh', type: 'phrase', register: 'neutral', example: { fr: 'Pars avant qu\u2019il ne soit trop tard.', en: 'Leave before it\u2019s too late.' }, related: [{ fr: 'après que', en: 'after (→ INDICATIVE!)' }] },
        { fr: 'à condition que', en: 'provided that (→ subjunctive)', pron: 'ah koh-DEE-syoHN kuh', type: 'phrase', register: 'formal', example: { fr: 'Tu sortiras, à condition que tu finisses.', en: 'You may go out, provided you finish.' }, related: [{ fr: 'pourvu que', en: 'provided that (spoken)' }] },
        { fr: 'sans que', en: 'without (→ subjunctive)', pron: 'sahn kuh', type: 'phrase', register: 'neutral', example: { fr: 'Il est parti sans que je le voie.', en: 'He left without my seeing him.' }, related: [{ fr: 'jusqu\u2019à ce que', en: 'until (→ subj.)' }] },
        { fr: 'le déclencheur', en: 'the trigger', pron: 'luh day-lahn-SHUHR', gender: 'masculine', register: 'neutral', example: { fr: 'Les déclencheurs du subjonctif…', en: 'The triggers of the subjunctive…' }, related: [{ fr: 'déclencher', en: 'to trigger' }] },
        { fr: 'l\u2019expletif ne', en: 'the expletive ne (optional literary ne)', pron: 'lehks-pluh-TEEF nuh', gender: 'masculine', register: 'formal', example: { fr: 'J\u2019ai peur qu\u2019il ne vienne.', en: 'I\u2019m afraid he might come (ne adds nothing).' }, related: [{ fr: 'avant que + ne', en: 'the same pattern' }] },
        { fr: 'souhaiter que', en: 'to wish that (→ subjunctive)', pron: 'soo-eh-TAY kuh', type: 'phrase', register: 'neutral', example: { fr: 'Je souhaite que tu réussisses.', en: 'I wish you success.' }, related: [{ fr: 'espérer que', en: 'to hope (→ INDICATIVE!)' }] },
    ],

    pronunciation: [
        { fr: 'il faut que tu viennes', approx: 'eel foh kuh tü VYEN', en: 'que shrinks to "kuh"; viennes rhymes with "yen"' },
        { fr: 'bien qu\u2019il soit', approx: 'byan keel SWAH', en: 'qu\u2019elides before il: "keel"' },
        { fr: 'pour que tu comprennes', approx: 'poor kuh tü kohn-PREN', en: 'comprennes = "kohn-PREN" — double n, one nasal' },
        { fr: 'il faut qu\u2019il soit', approx: 'eel foh keel SWAH', en: 'be careful: soit (subj) vs soie (silk) same sound' },
        { fr: 'quoique ce soit', approx: 'kwah-kuh suh SWAH', en: 'two "kwa" syllables glued together' },
        { fr: 'avant qu\u2019il parte', approx: 'ah-vahn keel PAHRT', en: 'the final t of avant sounds only before a vowel' },
    ],

    grammar: {
        rule: 'Subjunctive = ils-present stem + -e, -es, -e, -ions, -iez, -ent. A small set of irregulars (soit, ait, aille, fasse, puisse, sache, veuille) must be memorized. It appears after will, emotion, doubt, judgment, necessity — never after real belief.',
        explanation: 'Build it from the ILS form: ils parlent → parl- → que je parle, que nous parlions, que vous parliez. Stem-changers follow their nous-form in the plural (nous finiss-ions; nous buv-ions) and their soft stem in the singular (que je boive). The seven essential irregulars: être → que je sois; avoir → que j\u2019aie; aller → que j\u2019aille; faire → que je fasse; pouvoir → que je puisse; savoir → que je sache; vouloir → que je veuille (plus falloir → qu\u2019il faille, valoir → qu\u2019il vaille). The subjunctive lives inside a QUE-clause when the main clause expresses: necessity (il faut que, il est indispensable que), will (vouloir que, exiger que), emotion (être content/triste/furieux que, avoir peur que, craindre que), doubt (douter que, il est possible que, il est peu probable que), judgment (c\u2019est dommage que, il vaut mieux que), purpose (pour que, afin que), concession (bien que, quoique), time-limit (avant que, jusqu\u2019à ce que, sans que, à condition que). Keep the INDICATIVE after real belief and probability: je pense que c\u2019est, il est probable que ce sera, espérer que viendra (espérer is positive!). Note ne…pas goes around the MAIN verb (je ne pense pas que ce soit) and the literary expletive ne may appear after avant que / craindre que without making the sentence negative.',
        examples: [
            { fr: 'Il faut que nous partions avant midi.', en: 'We have to leave before noon.', breakdown: ['il faut que = necessity trigger', 'nous partions = subjunctive of partir (ils part-ent → part-)', 'avant midi = before noon'] },
            { fr: 'Je suis désolé que tu sois malade.', en: 'I\u2019m sorry you\u2019re sick.', breakdown: ['je suis désolé que = emotion trigger', 'tu sois = subjunctive of être (irregular!)', 'malade = sick'] },
            { fr: 'Bien qu\u2019il pleuve, on ira à pied.', en: 'Although it\u2019s raining, we\u2019ll walk.', breakdown: ['bien que = concession trigger (+ subj)', 'il pleuve = irregular subj of pleuvoir', 'à pied = on foot'] },
            { fr: 'Je te le répète pour que tu le retiennes.', en: 'I repeat it so that you remember it.', breakdown: ['pour que = purpose trigger', 'tu le retiennes = subj of retenir', 'le = it (pronoun before verb)'] },
            { fr: 'Je ne pense pas que ce soit une bonne idée.', en: 'I don\u2019t think it\u2019s a good idea.', breakdown: ['negation in main clause → subjunctive', 'ce soit = subj of être', 'contrast: je pense que c\u2019est (+ indic)'] },
            { fr: 'Espérons qu\u2019il fera beau demain.', en: 'Let\u2019s hope the weather will be nice tomorrow.', breakdown: ['espérer = POSITIVE hope → indicative', 'fera = future (not subjunctive!)', 'the classic trap verb'] },
        ],
        commonMistakes: [
            'Using the subjunctive after espérer or il est probable: they express POSITIVE expectation — keep the indicative (j\u2019espère qu\u2019il viendra).',
            'Forgetting the irregular stems: "il faut qu\u2019il est" instead of qu\u2019il soit, "bien qu\u2019il pleut" instead of qu\u2019il pleuve — the seven irregulars are the whole game.',
            'Using the same stem everywhere in stem-changing verbs: que je boive but nous buvions — the plural takes the nous-form stem.',
            'Putting ne…pas inside the que-clause: Je pense que ce ne soit pas… is wrong — the negation belongs to the main clause: Je ne pense pas que ce soit…',
        ],
    },

    transformations: [
        { type: 'Indicative', fr: 'Il est malade.', en: 'He is sick.' },
        { type: 'Necessity', fr: 'Il faut qu\u2019il soit là.', en: 'He has to be there.' },
        { type: 'Emotion', fr: 'Je suis content qu\u2019il soit là.', en: 'I\u2019m happy he\u2019s there.' },
        { type: 'Doubt (→ subj)', fr: 'Je doute qu\u2019il vienne.', en: 'I doubt he\u2019s coming.' },
        { type: 'Belief (→ indic)', fr: 'Je pense qu\u2019il vient.', en: 'I think he\u2019s coming.' },
        { type: 'Negated belief (→ subj)', fr: 'Je ne pense pas qu\u2019il vienne.', en: 'I don\u2019t think he\u2019s coming.' },
        { type: 'Purpose', fr: 'Je le dis pour qu\u2019il comprenne.', en: 'I say it so that he understands.' },
        { type: 'Concession', fr: 'Bien qu\u2019il soit fatigué, il continue.', en: 'Although he\u2019s tired, he keeps going.' },
    ],

    sentenceBuilding: [
        { fr: 'Il est essentiel que tu finisses ce rapport.', en: 'It\u2019s essential that you finish this report.' },
        { fr: 'Il est essentiel que tu finisses ce rapport, bien que tu sois débordé.', en: 'It\u2019s essential that you finish this report, although you\u2019re swamped.' },
        { fr: 'Il est essentiel que tu finisses ce rapport bien que tu sois débordé, pour que le client le reçoive vendredi.', en: 'It\u2019s essential that you finish this report although you\u2019re swamped, so that the client receives it Friday.' },
        { fr: 'Je doute que le client le lise avant lundi, mais il faut que ce soit prêt — à condition que personne ne touche au fichier.', en: 'I doubt the client will read it before Monday, but it must be ready — provided nobody touches the file.' },
        { fr: 'C\u2019est dommage que tu n\u2019aies pas prévenu plus tôt ; on aurait pu organiser ça sans que tu perdes ton week-end.', en: 'It\u2019s a pity you didn\u2019t warn us earlier; we could have organized it without you losing your weekend.' },
    ],

    practice: [
        { instruction: 'Subjunctive or indicative:', question: 'Il faut que tu ______ (être) là à huit heures.', answer: 'sois — necessity trigger → subjunctive of être' },
        { instruction: 'Subjunctive or indicative:', question: 'J\u2019espère que tu ______ (venir) demain.', answer: 'viendras — espérer takes the INDICATIVE (future here)' },
        { instruction: 'Conjugate:', question: 'Bien qu\u2019il ______ (faire) froid, je sors.', answer: 'fasse — irregular stem fass-' },
        { instruction: 'Conjugate:', question: 'Je doute qu\u2019ils ______ (savoir) la réponse.', answer: 'sachent — irregular stem sach-' },
        { instruction: 'Purpose:', question: 'Parle plus fort ______ qu\u2019il t\u2019entende.', answer: 'pour — pour que + subjunctive (qu\u2019il entende)' },
        { instruction: 'Find the negation:', question: 'Je ne crois pas que ce ______ vrai.', answer: 'soit — negated belief → subjunctive of être' },
    ],

    translationPractice: [
        { en: 'It\u2019s necessary that he leave immediately.', fr: 'Il faut qu\u2019il parte tout de suite.' },
        { en: 'Although she\u2019s tired, she continues.', fr: 'Bien qu\u2019elle soit fatiguée, elle continue.' },
        { en: 'I\u2019m explaining so that everyone understands.', fr: 'J\u2019explique pour que tout le monde comprenne.' },
        { en: 'I don\u2019t think that\u2019s possible.', fr: 'Je ne pense pas que ce soit possible.' },
        { en: 'We\u2019re afraid he might be late.', fr: 'Nous avons peur qu\u2019il soit en retard.' },
        { en: 'I hope you will come. (careful!)', fr: 'J\u2019espère que tu viendras.' },
    ],

    reverseTranslation: [
        { fr: 'Il vaut mieux que tu restes ici.', en: 'You\u2019d better stay here.' },
        { fr: 'Je suis heureux que vous ayez accepté.', en: 'I\u2019m happy you accepted.' },
        { fr: 'Avant qu\u2019il ne parte, parle-lui.', en: 'Speak to him before he leaves.' },
        { fr: 'Il est peu probable que ce soit gratuit.', en: 'It\u2019s unlikely to be free.' },
    ],

    register: {
        informal: 'Faut que j\u2019y aille ! (dropped il and que — spoken French eats the trigger, but the SUBJUNCTIVE survives: aille)',
        neutral: 'Il faut que tu termines avant vendredi, même si ce n\u2019est pas facile.',
        formal: 'Il convient que le comité examine cette proposition avant toute décision, afin que les parties concernées soient informées.',
    },

    culture: 'The subjunctive is the sociological tense of French: using it correctly signals education, and bureaucrats, professors and examiners hear it instantly. In casual speech many speakers replace il faut que + subj with devoir + infinitive (tu dois venir) — but the TCF writing and speaking grids explicitly reward subjunctive triggers. Quebec French keeps the subjunctive alive in exactly these high-frequency frames: faut que tu partes, bien que ce soit cher.',

    freeProduction: 'Write or record a "complaint and request" scenario (8–10 sentences) to a landlord or manager using at least five different subjunctive triggers: il faut que…, je suis furieux que…, je doute que…, pour que…, bien que…, avant que…, il vaut mieux que…. Guiding frame: the problem (indicative facts), the emotion (subjunctive), the demand (il faut que), the deadline (avant que / pour que).',

    miniTest: [
        { question: 'Il faut qu\u2019il ______ là.', options: ['est', 'soit', 'sera', 'était'], answer: 'soit — necessity → irregular subjunctive of être' },
        { question: 'J\u2019espère que tu ______ demain.', options: ['vienne', 'viennes', 'viendras', 'viennes'], answer: 'viendras — espérer takes the indicative (future)' },
        { question: 'Bien qu\u2019il ______ froid, je sors.', options: ['fait', 'faites', 'fasse', 'fera'], answer: 'fasse — bien que + subjunctive; faire → fass-' },
        { question: 'Je ne pense pas que ce ______ vrai.', options: ['est', 'soit', 'était', 'sera'], answer: 'soit — negated belief → subjunctive' },
        { question: 'Which trigger does NOT take the subjunctive?', options: ['bien que', 'pour que', 'avant que', 'espérer que'], answer: 'espérer que — positive hope keeps the indicative' },
    ],

    review: [
        'The si-system from B1: si + imparfait → conditional, and the conditional stems you learned (fass- is new, but ser-, puiss-… wait — puisse is subjunctive; the conditional of pouvoir is pourr-).',
        'Concession connectors from B1:opinions — même si + indicative; bien que + subjunctive is the B2 upgrade.',
    ],

    traps: [
        'espérer que, il est probable que, il est certain que take the INDICATIVE — they express positive expectation. Only doubt triggers the subjunctive.',
        'The seven irregular stems: sois, aie, aille, fasse, puisse, sache, veuille — "qu\u2019il va", "qu\u2019il fait", "qu\u2019il peut" are B1 errors in a B2 exam.',
        'Stem-changing verbs switch stems mid-paradigm: que je boive / que nous buvions; que je vienne / que nous venions — plural follows the nous-present.',
        'après que takes the INDICATIVE (it reports a fact), avant que takes the subjunctive (it anticipates one) — examiners pair them precisely.',
    ],

    homework: {
        intro: 'Every item tests a trigger: necessity, emotion, doubt, purpose, concession, or the indicative traps (espérer, probable). Watch the seven irregular stems.',
        translation: [
            { prompt: 'It\u2019s necessary that she come tomorrow.', answer: 'Il faut qu\u2019elle vienne demain.', explanation: 'necessity trigger → subjunctive. venir → vienn- (soft stem): qu\u2019elle vienne. A2\u2019s il faut + infinitive becomes il faut QUE + subjunctive when the subject changes.' },
            { prompt: 'Although it\u2019s expensive, I\u2019ll buy it.', answer: 'Bien qu\u2019il soit cher, je l\u2019achèterai.', alt: ['Bien qu’il soit cher, je l’achète'], explanation: 'bien que + subjunctive: il → qu\u2019il soit (irregular). Main clause stays future/indicative — the subjunctive only lives in the que-clause.' },
            { prompt: 'I\u2019m telling you so that you understand.', answer: 'Je te le dis pour que tu comprennes.', explanation: 'pour que + subjunctive: comprendre → comprennes. Purpose clauses always point forward with the subjunctive.' },
            { prompt: 'I doubt they know the answer.', answer: 'Je doute qu\u2019ils sachent la réponse.', explanation: 'doubt trigger → subjunctive. savoir → sach- (irregular): qu\u2019ils sachent. Never "qu\u2019ils savent".' },
            { prompt: 'I\u2019m happy that you are here.', answer: 'Je suis content que tu sois là.', alt: ['Je suis content(e) que tu sois là'], explanation: 'emotion trigger → subjunctive of être: que tu sois. Add -e to content if the speaker is a woman.' },
            { prompt: 'I hope you will be there. (careful!)', answer: 'J\u2019espère que tu seras là.', explanation: 'espérer is POSITIVE expectation → INDICATIVE. The future seras, never the subjunctive sois. The #1 B2 trap verb.' },
        ],
        blanks: [
            { prompt: 'Il faut que nous ______ (partir) avant midi.', answer: 'partions', explanation: 'ils partent → part- + ions: que nous partions. Plural subjunctive takes the ils-stem.' },
            { prompt: 'Bien qu\u2019il ______ (pleuvoir), on sort.', answer: 'pleuve', explanation: 'pleuvoir is irregular in the subjunctive: qu\u2019il pleuve — like qu\u2019il puisse, qu\u2019il fasse, it must be memorized.' },
            { prompt: 'Je ne crois pas qu\u2019il ______ (avoir) raison.', answer: 'ait', explanation: 'negated belief → subjunctive of avoir: qu\u2019il ait. One syllable — but it changes everything for the grader.' },
            { prompt: 'Parle-lui avant qu\u2019il ne ______ (partir).', answer: 'parte', explanation: 'avant que + subjunctive, with the optional literary ne (expletive): avant qu\u2019il ne parte. The ne is not a negation.' },
            { prompt: 'J\u2019ai peur qu\u2019elle ne ______ (venir) pas.', answer: 'vienne', explanation: 'avoir peur que + subjunctive. The real negation (pas) sits in the que-clause: qu\u2019elle ne vienne pas — here the ne IS negative with pas.' },
            { prompt: 'Espérons qu\u2019il ______ (faire) beau samedi.', answer: 'fera', explanation: 'espérer + INDICATIVE: the future fera. This item is the trap dressed as a gift — the subjunctive would be marked wrong.' },
        ],
        corrections: [
            { prompt: 'Il faut qu\u2019il est là à huit heures.', answer: 'Il faut qu\u2019il soit là à huit heures.', explanation: 'How the mistake happens: keeping the indicative inside a que-clause. Why it does not work: il faut que is a necessity trigger — the que-clause must be subjunctive. How to fix it: qu\u2019il soit (irregular stem of être).' },
            { prompt: 'Bien qu\u2019il fait froid, on sort.', answer: 'Bien qu\u2019il fasse froid, on sort.', explanation: 'How the mistake happens: treating bien que like parce que. Why it does not work: concession triggers (bien que, quoique) always take the subjunctive. How to fix it: qu\u2019il fasse — faire\u2019s irregular subjunctive stem fass-.' },
            { prompt: 'J\u2019espère que tu viennes demain.', answer: 'J\u2019espère que tu viendras demain.', explanation: 'How the mistake happens: over-applying the subjunctive to all emotion verbs. Why it does not work: espérer expresses confident hope → indicative. How to fix it: the future viendras. Contrast: je doute que tu viennes (doubt → subj).' },
            { prompt: 'Je pense que ce ne soit pas une bonne idée.', answer: 'Je ne pense pas que ce soit une bonne idée.', explanation: 'How the mistake happens: putting the negation inside the que-clause. Why it does not work: the belief is negated, not the fact — ne…pas wraps the MAIN verb. How to fix it: je ne pense pas que ce soit…' },
            { prompt: 'Je te le dis pour que tu comprends.', answer: 'Je te le dis pour que tu comprennes.', explanation: 'How the mistake happens: forgetting that pour que is a trigger. Why it does not work: purpose clauses (pour que, afin que) require the subjunctive. How to fix it: que tu comprennes — comprenn- + es.' },
        ],
        writing: {
            task: 'Write a formal complaint email (10–14 lines) about a noisy neighbour or a late delivery using at least five subjunctive triggers: il faut que…, je suis mécontent que…, je doute que…, pour que…, bien que…, avant que…. Include one indicative after espérer or il est probable, and close with a B1-style letter formula.',
            requirements: [
                'Five different subjunctive triggers, correctly conjugated',
                'One irregular subjunctive (soit, ait, fasse, puisse, aille, sache, veuille)',
                'One indicative after espérer / il est probable',
                'One stem-changing paradigm (que je vienne / que nous venions)',
                'Formal opening and closing formulas',
            ],
            minWords: 90,
        },
        checklist: [
            'I form the subjunctive from the ils-stem + -e, -es, -e, -ions, -iez, -ent',
            'I know the seven irregular stems: sois, aie, aille, fasse, puisse, sache, veuille',
            'I trigger it with necessity, will, emotion, doubt, judgment, purpose, concession',
            'I keep the indicative after espérer, il est probable, je pense que (affirmative)',
            'I flip to the subjunctive when je pense/croire is negated',
            'I place ne…pas around the main verb, and I recognize the expletive ne after avant que / craindre que',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Formation: take the ILS-present, drop -ent, add -e/-es/-e/-ions/-iez/-ent. ils parlent → que je parle; ils finissent → que je finisse; ils prennent → que je prenne. The nous/vous forms use the ILS stem too here (que nous parlions — not parl-ons!).',
            examples: [
                { fr: 'que je parle · que tu finisses · qu\u2019il prenne · que nous parlions · que vous finissiez · qu\u2019ils prennent', en: 'one stem, six endings' },
            ],
        },
        {
            explanation: 'The seven irregulars (chant them): être → sois · avoir → aie · aller → aille · faire → fasse · pouvoir → puisse · savoir → sache · vouloir → veuille. Plus impersonals: falloir → faille, valoir → vaille, pleuvoir → pleuve.',
            examples: [
                { fr: 'qu\u2019il soit là · que j\u2019aie le temps · qu\u2019il aille voir · que je fasse de mon mieux · pour que je puisse venir · que tu saches · je veux que tu veuilles', en: 'the seven at work' },
            ],
        },
        {
            explanation: 'Trigger families: NECESSITY — il faut que, il est indispensable que; WILL — vouloir que, exiger que; EMOTION — être content/désolé/furieux que, avoir peur que, craindre que; DOUBT — douter que, il est possible/peu probable que; JUDGMENT — c\u2019est dommage que, il vaut mieux que; PURPOSE — pour que, afin que; CONCESSION — bien que, quoique; TIME — avant que, jusqu\u2019à ce que, sans que, à condition que.',
            examples: [
                { fr: 'Il faut qu\u2019il parte · Je suis content qu\u2019il parte · Je doute qu\u2019il parte · pour qu\u2019il parte', en: 'one clause, four triggers' },
            ],
        },
        {
            explanation: 'The indicative keepers: espérer que (confident hope), il est probable/certain/évident que, je pense/crois que (affirmative). Negation or doubt flips to subjunctive: je ne pense pas que, je ne suis pas sûr que.',
            examples: [
                { fr: 'J\u2019espère qu\u2019il viendra (indic) · Je doute qu\u2019il vienne (subj) · Je ne pense pas qu\u2019il vienne (subj)', en: 'the belief dial' },
            ],
        },
        {
            explanation: 'avant que (anticipation) → subjunctive, often with expletive ne: avant qu\u2019il ne parte. après que (reported fact) → indicative: après qu\u2019il est parti. Same pairing in craindre que + ne (fear) vs dire que (fact).',
            examples: [
                { fr: 'Pars avant qu\u2019il (ne) pleuve. · On est sortis après qu\u2019il a plu.', en: 'before vs after' },
            ],
        },
        {
            explanation: 'Spoken shortcuts that stay grammatical: drop il and que from il faut que (Faut que j\u2019y aille !) — the subjunctive aille remains. Alternatively upgrade to devoir: tu dois venir (infinitive, no subjunctive needed).',
            examples: [
                { fr: 'Faut que j\u2019y aille ! · Tu dois venir. · Il faut que tu viennes.', en: 'three registers of necessity' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'soit': { en: 'be (subjunctive of être)', pron: 'SWAH', type: 'verb', base: { form: 'être', en: 'to be' }, note: 'que je sois, que tu sois, qu\u2019il soit… — THE irregular you must not confuse with soit (or) / soie (silk), same sound.' },
        'ait': { en: 'have (subjunctive of avoir)', pron: 'EH', type: 'verb', base: { form: 'avoir', en: 'to have' }, note: 'que j\u2019aie, qu\u2019il ait — one letter from ai but a different world grammatically.' },
        'aille': { en: 'go (subjunctive of aller)', pron: 'EYE', type: 'verb', base: { form: 'aller', en: 'to go' }, note: 'Faut que j\u2019y aille ! — even in dropped-que speech, the subjunctive survives.' },
        'fasse': { en: 'do (subjunctive of faire)', pron: 'FAHSS', type: 'verb', base: { form: 'faire', en: 'to do / make' }, note: 'bien qu\u2019il fasse froid — irregular stem fass-.' },
        'puisse': { en: 'can / may (subjunctive of pouvoir)', pron: 'püEESS', type: 'verb', base: { form: 'pouvoir', en: 'can / to be able' }, note: 'pour que je puisse venir — purpose clauses need it constantly.' },
        'sache': { en: 'know (subjunctive of savoir)', pron: 'FAHSS→SAHSS', type: 'verb', base: { form: 'savoir', en: 'to know' }, note: 'je doute qu\u2019il sache — irregular stem sach- (pronounced "SAHSS").' },
        'veuille': { en: 'want (subjunctive of vouloir)', pron: 'vuh-EE-yuh', type: 'verb', base: { form: 'vouloir', en: 'to want' }, note: 'je veux que tu veuilles — rare but graded; also in je voudrais… qu\u2019il veuille bien.' },
        'viennes': { en: 'come (subjunctive — tu form of venir)', pron: 'VYEN', type: 'verb', base: { form: 'venir', en: 'to come' }, note: 'que tu viennes / que nous venions — the plural switches to the nous-stem ven-.' },
        'comprennes': { en: 'understand (subjunctive — tu form)', pron: 'kohn-PREN', type: 'verb', base: { form: 'comprendre', en: 'to understand' }, note: 'pour que tu comprennes — ils comprennent → comprenn-.' },
        'partions': { en: 'leave (subjunctive — nous form of partir)', pron: 'pahr-TYOHN', type: 'verb', base: { form: 'partir', en: 'to leave' }, note: 'il faut que nous partions — the -ions ending rhymes "yohn".' },
        'finisses': { en: 'finish (subjunctive — tu form of finir)', pron: 'fee-NEESS', type: 'verb', base: { form: 'finir', en: 'to finish' }, note: 'à condition que tu finisses — final -sses sounds "sess".' },
        'réussisses': { en: 'succeed (subjunctive — tu form of réussir)', pron: 'ray-ü-SEESS', type: 'verb', base: { form: 'réussir', en: 'to succeed' }, note: 'je souhaite que tu réussisses — double s before e throughout.' },
        'désolé': { en: 'sorry (masc)', pron: 'day-zoh-LAY', type: 'adjective', fem: { word: 'désolée', en: 'sorry (fem)' }, note: 'je suis désolé(e) que + subjunctive — the standard apology-opener.' },
        'furieux': { en: 'furious (masc)', pron: 'fü-ryuh', type: 'adjective', fem: { word: 'furieuse', en: 'furious (fem)' }, note: 'elle est furieuse que… — emotion trigger.' },
        'mécontent': { en: 'displeased / unhappy (masc)', pron: 'may-kohn-TAHN', type: 'adjective', fem: { word: 'mécontente', en: 'displeased (fem)' }, note: 'the formal word for "not satisfied" in complaints.' },
        'comité': { en: 'committee', pron: 'koh-mee-TAY', gender: 'masculine', plural: 'comités', type: 'noun', note: 'le comité examine — impersonal institutional subject.' },
        'débordé': { en: 'swamped / overwhelmed (masc)', pron: 'day-bor-DAY', type: 'adjective', fem: { word: 'débordée', en: 'swamped (fem)' }, note: 'être débordé(e) — workplace small talk and excuses.' },
        'exiger': { en: 'to require / demand', pron: 'ehg-zee-ZHAY', type: 'verb', note: 'exiger que + subjunctive — the strong will-trigger.' },
        'craindre': { en: 'to fear', pron: 'KRAN-druh', type: 'verb', note: 'craindre que + subjunctive (+ optional ne): je crains qu\u2019il ne vienne. Participle craint.' },
        'quoique': { en: 'although (→ subjunctive)', pron: 'KWAH-kuh', type: 'particle', note: 'quoique ce soit cher… = bien que ce soit cher. NOT quoi que (whatever) — one word vs two.' },
        'pourvu que': { en: 'provided that (→ subjunctive)', pron: 'poor-VÜ kuh', type: 'phrase', note: 'Pourvu qu\u2019il fasse beau ! — also a hopeful exclamation.' },
        'jusqu\u2019à ce que': { en: 'until (→ subjunctive)', pron: 'zhüs-kah suh kuh', type: 'phrase', note: 'Attends jusqu\u2019à ce qu\u2019il revienne.' },
    },
};

// ── B2 · Formal vs Informal Register ────────────────────────────────────────
const b2Registre: StaticFrenchLesson = {
    title: 'Formal vs Informal Register',
    objective: 'Move deliberately along the register ladder — nous vs on, ne kept vs dropped, inversion vs intonation, courrier vs texto vocabulary — and produce the same message in three levels of formality, the skill the TCF\u2019s writing and speaking tasks grade explicitly.',

    vocabulary: [
        { fr: 'le boulot', en: 'the job / work (informal for travail)', pron: 'luh boo-LOH', gender: 'masculine', register: 'informal', example: { fr: 'J\u2019ai trop de boulot cette semaine.', en: 'I\u2019ve got too much work this week.' }, related: [{ fr: 'le travail', en: 'work (neutral)' }, { fr: 'l\u2019emploi', en: 'employment (formal)' }] },
        { fr: 'le fric', en: 'the cash / money (slang)', pron: 'luh FREEK', gender: 'masculine', register: 'informal', example: { fr: 'Il me manque du fric.', en: 'I\u2019m short on cash.' }, related: [{ fr: 'l\u2019argent', en: 'money (neutral)' }, { fr: 'les finances', en: 'finances (formal)' }] },
        { fr: 'une caisse', en: 'a car (slang) / a checkout', pron: 'ün KESS', gender: 'feminine', register: 'informal', example: { fr: 'Il m\u2019a prêté sa caisse.', en: 'He lent me his car (slang).' }, related: [{ fr: 'la voiture', en: 'car (neutral)' }, { fr: 'le véhicule', en: 'vehicle (formal)' }] },
        { fr: 'faire savoir', en: 'to let know / convey (formal for dire)', pron: 'fehr sah-VWAHR', type: 'phrase', register: 'formal', example: { fr: 'Faites-moi savoir votre décision.', en: 'Let me know your decision (formal).' }, related: [{ fr: 'dire', en: 'to say (neutral)' }] },
        { fr: 'Cordialement', en: 'Best regards (standard email close)', pron: 'kor-dyah-MAHN', register: 'neutral', example: { fr: 'Merci d\u2019avance. Cordialement, Karim.', en: 'Thanks in advance. Best regards, Karim.' }, related: [{ fr: 'Bien à vous', en: 'All the best (warm-formal)' }] },
        { fr: 'Je vous en prie', en: 'You\u2019re very welcome (formal)', pron: 'zhuh voo-zahn PREE', type: 'phrase', register: 'formal', example: { fr: '— Merci beaucoup. — Je vous en prie.', en: '— Thank you very much. — You\u2019re very welcome.' }, related: [{ fr: 'de rien', en: 'you\u2019re welcome (casual)' }] },
        { fr: 'cela', en: 'that (formal for ça)', pron: 'suh-LAH', type: 'pronoun', register: 'formal', example: { fr: 'Cela m\u2019intéresse beaucoup.', en: 'That interests me greatly.' }, related: [{ fr: 'ça', en: 'that (spoken)' }] },
        { fr: 'se déplacer', en: 'to come / travel over (formal for venir)', pron: 'suh day-plah-SAY', type: 'verb', register: 'formal', example: { fr: 'Merci de vous déplacer.', en: 'Thank you for coming (formal).' }, related: [{ fr: 'venir', en: 'to come (neutral)' }] },
        { fr: 'un texto', en: 'a text message (informal)', pron: 'uhn TEHKS-toh', gender: 'masculine', register: 'informal', example: { fr: 'Envoie-moi un texto.', en: 'Send me a text.' }, related: [{ fr: 'un message', en: 'a message (neutral)' }, { fr: 'un courriel', en: 'an email (Canada/formal)' }] },
        { fr: 'l\u2019inscription', en: 'the registration', pron: 'lan-skree-SYOHN', gender: 'feminine', register: 'formal', example: { fr: 'L\u2019inscription est ouverte.', en: 'Registration is open.' }, related: [{ fr: 's\u2019inscrire', en: 'to register' }] },
        { fr: 'informer', en: 'to inform (formal for dire)', pron: 'an-for-MAY', type: 'verb', register: 'formal', example: { fr: 'Je vous informe que le local fermera tôt.', en: 'I am informing you the building will close early.' }, related: [{ fr: 'prévenir', en: 'to let know (neutral)' }] },
        { fr: 'néanmoins', en: 'nevertheless', pron: 'nay-ahn-MWAN', type: 'adverb', register: 'formal', example: { fr: 'Néanmoins, je maintiens ma demande.', en: 'Nevertheless, I maintain my request.' }, related: [{ fr: 'cependant', en: 'however' }] },
    ],

    pronunciation: [
        { fr: 'Cordialement', approx: 'kor-dyah-MAHN', en: 'final -ent is nasal: "MAHN", no t' },
        { fr: 'cela', approx: 'suh-LAH', en: 'stress the second syllable — ça rushes, cela breathes' },
        { fr: 'je vous en prie', approx: 'zhuh voo-zahn PREE', en: 'en glues to vous: "voo-ZAHN"' },
        { fr: 'se déplacer', approx: 'suh day-plah-SAY', en: 'the é of dé- lengthens the first beat' },
        { fr: 'néanmoins', approx: 'nay-ahn-MWAN', en: 'two nasals back to back' },
        { fr: 'l\u2019inscription', approx: 'lan-skree-SYOHN', en: 'the i of ins- is "an" nasal? No — "lan-skree"; keep it light' },
    ],

    grammar: {
        rule: 'Register is four dials at once: pronouns (nous vs on), negation (ne kept vs dropped), question form (inversion vs intonation), and vocabulary (ladder pairs like travail/boulot). Formal writing uses all four formal dials; casual speech drops all four.',
        explanation: 'The same idea changes shape across the ladder. Pronouns: on va au ciné ? (spoken) vs nous allons au cinéma (written). Negation: je sais pas (ne dropped in fast speech) vs je ne sais pas (careful speech and all writing). Questions: tu viens ? (intonation) vs est-ce que tu viens ? (neutral) vs viens-tu ? / venez-vous ? (formal inversion — writing, speeches). Vocabulary ladders: each concept has a casual, neutral, and formal word (travail/boulot/emploi; argent/fric/finances; ça/cela; dire/faire savoir/informer). Written formulas are fixed: a formal email opens Madame, Monsieur, and closes Je vous prie d\u2019agréer… salutations distinguées; a semi-formal one closes Cordialement or Bien à vous. The exam\u2019s register task shows you a situation and grades whether your level matches it: a text to a friend in letter-language loses points, a complaint to a landlord in texto-language loses more.',
        examples: [
            { fr: 'On y va ? — Ouais, j\u2019arrive !', en: 'Shall we go? — Yeah, coming!', breakdown: ['on = we (spoken)', 'y va = elided allons-y', 'ouais = yeah (informal oui)'] },
            { fr: 'Nous y allons à sept heures précises.', en: 'We\u2019re going at seven sharp.', breakdown: ['nous allons = written register', 'précises = exactly (formal touch)', 'no contractions, full negation'] },
            { fr: 'Je ne sais pas si je pourrai me déplacer.', en: 'I don\u2019t know whether I\u2019ll be able to come.', breakdown: ['ne…pas kept (written)', 'pourrai = future (careful form)', 'se déplacer = formal come'] },
            { fr: 'Je vous informe que votre demande a été approuvée.', en: 'I am informing you that your request has been approved.', breakdown: ['informer = administrative register', 'a été approuvée = passive (formal)', 'votre = your (formal)'] },
            { fr: 'Merci d\u2019avance et bien à vous,', en: 'Thanks in advance and all the best,', breakdown: ['bien à vous = warm-formal close', 'd\u2019avance = in advance', 'email context'] },
            { fr: 'C\u2019est bon, j\u2019ai fini mon boulot — on se fait un ciné ?', en: 'All good, finished work — movie?', breakdown: ['boulot = casual job', 'se faire un ciné = slang "catch a film"', 'double casual marker'] },
        ],
        commonMistakes: [
            'Mixing levels inside one sentence: "Monsieur, on va pas se déplacer pour du fric" — the formal opener collides with slang. Pick a lane and hold it.',
            'Writing on where nous is needed: formal writing prefers nous (nous vous informons que…), on reads casual even in emails.',
            'Using tu with an official: contacts at the mairie, bank, or examiner stay vous throughout — one slip colors the whole text.',
            'Dropping ne in writing: je sais pas is speech; on the TCF written task, every dropped ne costs.',
        ],
    },

    transformations: [
        { type: 'Casual', fr: 'On va manger dehors ? Ça me dit !', en: 'Shall we eat out? Sounds good to me!' },
        { type: 'Neutral', fr: 'Voulez-vous déjeuner dehors ? Ça me convient.', en: 'Would you like to have lunch out? That suits me.' },
        { type: 'Formal', fr: 'Souhaitez-vous que nous déjeunions à l\u2019extérieur ? Cela m\u2019arrangerait.', en: 'Would you like us to have lunch outside? That would suit me.' },
        { type: 'Casual close', fr: 'Allez, à plus !', en: 'OK, see ya!' },
        { type: 'Formal close', fr: 'Je vous prie d\u2019agréer mes salutations distinguées.', en: 'Please accept my distinguished greetings.' },
        { type: 'Casual question', fr: 'Tu peux m\u2019envoyer le doc ?', en: 'Can you send me the doc?' },
        { type: 'Formal question', fr: 'Pourriez-vous m\u2019adresser le document ?', en: 'Could you send me the document?' },
        { type: 'Same request, one ladder', fr: 'Donne-moi du fric → Prête-moi de l\u2019argent → Pourriez-vous m\u2019avancer des fonds ?', en: 'three steps up the money ladder' },
    ],

    sentenceBuilding: [
        { fr: 'Je vous écris au sujet de votre annonce.', en: 'I am writing about your advertisement.' },
        { fr: 'Je vous écris au sujet de votre annonce parue dans le journal de mardi.', en: 'I am writing about your advertisement published in Tuesday\u2019s paper.' },
        { fr: 'Je me permets de vous écrire au sujet de votre annonce parue mardi, qui a retenu toute mon attention.', en: 'I am taking the liberty of writing about your advertisement published Tuesday, which caught my full attention.' },
        { fr: 'Je me permets de vous écrire au sujet de votre annonce parue mardi ; je souhaiterais obtenir des renseignements complémentaires sur le logement et sur les conditions de location.', en: 'I am taking the liberty of writing about your Tuesday advertisement; I would like further details about the housing and the rental terms.' },
        { fr: 'Dans l\u2019attente de votre réponse, je vous remercie par avance et vous prie d\u2019agréer, Madame, Monsieur, mes salutations distinguées.', en: 'While awaiting your reply, I thank you in advance and remain, Madam or Sir, yours faithfully.' },
    ],

    practice: [
        { instruction: 'Raise the register:', question: 'J\u2019ai pas trop de fric ce mois-ci.', answer: 'Je ne dispose pas de fonds suffisants ce mois-ci. — ne kept, fric → fonds, verb upgraded' },
        { instruction: 'Lower the register:', question: 'Je ne puis vous recevoir cette semaine.', answer: 'Je peux pas te recevoir cette semaine. — ne dropped, vous → te, puis → peux' },
        { instruction: 'Formal question form:', question: 'Vous venez demain ? (make it formal)', answer: 'Viendrez-vous demain ? — inversion + future = written register' },
        { instruction: 'Choose the pronoun:', question: '______ (formal we) vous informons que…', answer: 'Nous — institutional writing uses nous, never on' },
        { instruction: 'Email close:', question: 'Semi-formal email to a colleague\u2019s boss:', answer: 'Cordialement, — or Bien à vous. Distinguées is overkill here.' },
        { instruction: 'Spot the register clash:', question: 'Salut Monsieur, ça roule ?', answer: 'Clash: Salut/ça roule are casual, Monsieur is formal — pick Bonjour Monsieur or drop the title' },
    ],

    translationPractice: [
        { en: 'I have too much work this week. (casual)', fr: 'J\u2019ai trop de boulot cette semaine.' },
        { en: 'We are writing to inform you that… (formal)', fr: 'Nous vous écrivons pour vous informer que…' },
        { en: 'Could you send me the document, please? (formal)', fr: 'Pourriez-vous m\u2019adresser le document, s\u2019il vous plaît ?' },
        { en: 'That doesn\u2019t interest me. (casual)', fr: 'Ça m\u2019intéresse pas.' },
        { en: 'I don\u2019t know if I can come. (formal)', fr: 'Je ne sais pas si je pourrai me déplacer.' },
        { en: 'Best regards, Marie. (standard close)', fr: 'Cordialement, Marie.' },
    ],

    reverseTranslation: [
        { fr: 'Néanmoins, je maintiens ma demande initiale.', en: 'Nevertheless, I maintain my initial request.' },
        { fr: 'On s\u2019appelle ce soir ?', en: 'Shall we call each other tonight?' },
        { fr: 'Je vous remercie par avance de votre compréhension.', en: 'I thank you in advance for your understanding.' },
        { fr: 'Il me manque des fonds pour le projet.', en: 'I\u2019m short on funds for the project.' },
    ],

    register: {
        informal: 'Coucou ! Alors, tu viens ce soir ou quoi ? Ça serait top ! (coucou, ou quoi, top = three casual markers in one text)',
        neutral: 'Bonjour, est-ce que tu penses venir ce soir ? Ce serait bien.',
        formal: 'Madame, Monsieur, Je me permets de vous contacter afin de savoir si votre présence serait souhaitée ce soir. Bien à vous.',
    },

    culture: 'French is the most register-conscious major language: schools teach tu/vous as grammar, and using tutoiement with a stranger can genuinely offend. Institutions write in a fixed administrative style — passive voice, nous, full negation — that learners must read daily (notices, contracts, letters). Quebec French is famously warmer (bonjour–hi, quick tutoiement in shops) but the TCF still grades metropolitan formal conventions; match the register the task names, not the one you hear in sitcoms.',

    freeProduction: 'Take one message ("I can\u2019t come to the meeting on Friday") and write it three times: a texto to a friend, a short email to a colleague (vous), and a formal note to your manager. Keep the facts identical and move all four dials — pronouns, negation, question forms, vocabulary. Then read all three aloud and hear the ladder.',

    miniTest: [
        { question: 'Most formal way to say "we":', options: ['on', 'nous', 'les gens', 'tout le monde'], answer: 'nous — institutional and written register' },
        { question: 'Boulot belongs to:', options: ['formal writing', 'casual speech', 'legal texts', 'neither'], answer: 'casual speech — travail is the neutral word' },
        { question: 'Formal email opening:', options: ['Salut !', 'Bonjour,', 'Madame, Monsieur,', 'Coucou !'], answer: 'Madame, Monsieur, — when the recipient is unknown' },
        { question: 'Je sais pas is acceptable:', options: ['in formal letters', 'in casual speech', 'on exams', 'nowhere'], answer: 'in casual speech — writing keeps ne' },
        { question: 'Cordialement is:', options: ['slang', 'neutral-standard close', 'too casual for work', 'a greeting'], answer: 'neutral-standard close — the default work email sign-off' },
    ],

    review: [
        'The conditional politeness kit from B1 (je voudrais, pourriez-vous) is the entry floor of formal register — this lecture adds the rest of the ladder.',
        'The formal letter skeleton from B1:immigration is reused here word for word; this lecture adds the casual end of the scale.',
    ],

    traps: [
        'One register per text: mixing Salut ! with salutations distinguées, or Monsieur with ça roule, is the single biggest register penalty.',
        'Formal ≠ stiff everywhere: Cordialement fits 90% of work emails; over-formal closings to colleagues read oddly.',
        'on in formal writing is wrong even though it is grammatically correct — the examiner grades choice, not just correctness.',
        'Dropped ne (je sais pas) and intonation questions are SPEECH features: they never belong on the written exam, whatever you hear at home.',
    ],

    homework: {
        intro: 'Every item moves a dial: pronouns, negation, questions, or vocabulary ladders. Name the register before you translate.',
        translation: [
            { prompt: 'I\u2019ve got too much work this week. (casual)', answer: 'J\u2019ai trop de boulot cette semaine.', explanation: 'boulot marks casual register; travail would neutralize it. One vocabulary choice sets the whole tone.' },
            { prompt: 'We are pleased to inform you that… (formal)', answer: 'Nous avons le plaisir de vous informer que…', explanation: 'nous (not on) + informer + the fixed pleasure-formula — institutional French at full formality.' },
            { prompt: 'Could you come to the office tomorrow? (formal)', answer: 'Pourriez-vous vous déplacer au bureau demain ?', explanation: 'pourriez-vous + se déplacer — the formal pair for a simple come. Double politeness markers.' },
            { prompt: 'I don\u2019t know if that\u2019s a good idea. (careful speech)', answer: 'Je ne sais pas si c\u2019est une bonne idée.', explanation: 'ne kept (careful/written), si reports the yes/no alternative, indicative c\u2019est after si (not a belief verb).' },
            { prompt: 'Send me a text when you\u2019re done. (casual)', answer: 'Envoie-moi un texto quand t\u2019as fini.', alt: ['Envoie-moi un texto quand tu as fini'], explanation: 'imperative + texto + optional t\u2019as — all casual markers. In writing keep tu as: quand tu as fini.' },
            { prompt: 'Nevertheless, I maintain my request. (formal)', answer: 'Néanmoins, je maintiens ma demande.', alt: ['Néanmoins, je maintiens ma requête'], explanation: 'néanmoins = however in letter register; maintiens (maintenir) — the formal verb for standing your ground.' },
        ],
        blanks: [
            { prompt: '______ (formal we) vous remercions de votre patience.', answer: 'Nous', explanation: 'Institutional writing: Nous vous remercions — on never appears in this frame.' },
            { prompt: 'Je ne ______ (pouvoir, formal je) accepter cette offre.', answer: 'puis', explanation: 'je puis = archaic-formal je peux, still alive in fixed phrases: je ne puis vous répondre. Safe alternative: je ne peux pas.' },
            { prompt: 'Merci de ______ déplacer aussi tôt. (formal you-plural)', answer: 'vous', explanation: 'se déplacer conjugates with vous: merci de vous déplacer — the formal way to thank someone for coming.' },
            { prompt: 'Ça ne m\u2019intéresse pas du ______. (casual intensifier)', answer: 'tout', explanation: 'pas du tout = not at all; the whole phrase stays casual thanks to ça. Formal: cela ne m\u2019intéresse nullement.' },
            { prompt: 'Bien à ______, — (warm-formal email close)', answer: 'vous', explanation: 'Bien à vous sits between Cordialement and the distinguées formula — for people you address as vous but know a bit.' },
            { prompt: 'J\u2019ai un truc à te ______. (casual: tell)', answer: 'dire', explanation: 'truc is already casual; dire completes the informal frame. Formal: je souhaiterais vous entretenir d\u2019un sujet.' },
        ],
        corrections: [
            { prompt: 'Salut Monsieur, ça roule ? Je vous écris pour du fric.', answer: 'Bonjour Monsieur, Je vous écris au sujet d\u2019une question financière.', explanation: 'How the mistake happens: importing casual words into a formal frame. Why it does not work: one casual marker poisons the register. How to fix it: Bonjour + au sujet de + neutral vocabulary, all the way through.' },
            { prompt: 'On vous informe que votre demande a été acceptée.', answer: 'Nous vous informons que votre demande a été acceptée.', explanation: 'How the mistake happens: spoken on slipping into administrative writing. Why it does not work: institutions write with nous. How to fix it: Nous vous informons — the passive (a été acceptée) is already correct.' },
            { prompt: 'Je vous prie d\u2019agréer mes salutations distinguées. Bisous, Karim', answer: 'Je vous prie d\u2019agréer mes salutations distinguées. Karim', explanation: 'How the mistake happens: formal body + casual close. Why it does not work: the close is what the reader remembers — bisous destroys the register built above. How to fix it: end with the formula alone, then the name.' },
            { prompt: 'Je sais pas si je pourrai venir, Monsieur.', answer: 'Je ne sais pas si je pourrai venir, Monsieur.', explanation: 'How the mistake happens: speech negation in a formal context. Why it does not work: dropped ne is a speech feature; with Monsieur the text is formal. How to fix it: keep ne…pas whenever vous/Monsieur/Madame sets the level.' },
            { prompt: 'Pourriez-vous me filer un coup de main au bureau ?', answer: 'Pourriez-vous m\u2019aider au bureau ? / Pourriez-vous me prêter main-forte ?', explanation: 'How the mistake happens: formal opener + slang request (filer un coup de main). Why it does not work: the ladders must match. How to fix it: aider (neutral) or prêter main-forte (formal idiom).' },
        ],
        writing: {
            task: 'One message, three registers (about 8 lines each): you cannot attend a Friday meeting. (1) texto to a friend, (2) email to a colleague vous-relationship, (3) formal note to your manager with letter formulas. Move all four dials each time and keep the facts identical.',
            requirements: [
                'Three distinct registers, each internally consistent',
                'All four dials moved: pronouns, negation, questions, vocabulary',
                'Formal version contains opening + closing formulas',
                'Casual version contains at least two casual markers (boulot-type words, dropped ne, intonation question)',
                'No register mixing within any version',
            ],
            minWords: 100,
        },
        checklist: [
            'I can state the four register dials: pronouns, negation, questions, vocabulary',
            'I hold one register through a whole message — no mixing',
            'I choose nous in formal writing and on in speech',
            'I keep ne…pas in writing and drop it only in casual speech',
            'I use the vocabulary ladders (travail/boulot, argent/fric, cela/ça) deliberately',
            'I match email formulas to the relationship (distinguées / Cordialement / à plus)',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The four dials, all at once: PRONOUNS nous vs on · NEGATION ne…pas vs ne dropped · QUESTIONS inversion vs est-ce que vs intonation · VOCABULARY ladder pairs. Formal = all four left, casual = all four right.',
            examples: [
                { fr: 'Nous ne savons pas si vous viendrez. / On sait pas si tu viens ?', en: 'the same sentence, both ends' },
            ],
        },
        {
            explanation: 'Vocabulary ladders to memorize as triplets: travail–boulot–taf · argent–fric–pognon · voiture–caisse–bagnole · cela–ça · venir–se déplacer · dire–informer/faire savoir · intéressant–sympa–chouette.',
            examples: [
                { fr: 'boulot (casual) · travail (neutral) · emploi/occupation professionnelle (formal)', en: 'one ladder, three rungs' },
            ],
        },
        {
            explanation: 'Email closes ranked: à plus / bises (friends) → Cordialement (standard work) → Bien à vous (warm-formal vous) → Je vous prie d\u2019agréer… salutations distinguées (administrative). Opens rank the same way: coucou → bonjour → Madame, Monsieur.',
            examples: [
                { fr: 'Madame, Monsieur,… Cordialement, — the safe middle pair for unknown recipients', en: 'the default work email' },
            ],
        },
        {
            explanation: 'Spoken-only features to keep OFF the written exam: dropped ne (je sais pas), intonation questions (tu viens ?), ouais/ouf/top as fillers, on for nous. They are correct in speech — the exam grades context fit.',
            examples: [
                { fr: 'Tu viens ? (speech) · Est-ce que tu viens ? (neutral written) · Viendrez-vous ? (formal written)', en: 'one question, three levels' },
            ],
        },
        {
            explanation: 'Institutional frames to recognize on sight: Nous vous informons que… · Veuillez trouver ci-joint… · Dans l\u2019attente de votre réponse… · Nous vous prions d\u2019agréer… These run contracts, notices and letters.',
            examples: [
                { fr: 'Veuillez agréer mes excuses. = Please accept my apologies.', en: 'veuillez + infinitive = please (very formal)' },
            ],
        },
        {
            explanation: 'Register repair drill: find the one casual word in a formal text and upgrade it — that single word usually sets the grade. Read your text aloud: if a word sounds like a sitcom, upgrade it.',
            examples: [
                { fr: 'Monsieur, ça roule pour vendredi ? → Monsieur, votre proposition me convient pour vendredi.', en: 'one-word repair' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'boulot': { en: 'job / work (casual)', pron: 'boo-LOH', gender: 'masculine', register: 'informal', type: 'noun', note: 'au boulot = at work. Casual half of the travail ladder.' },
        'fric': { en: 'cash / money (slang)', pron: 'FREEK', gender: 'masculine', register: 'informal', type: 'noun', note: 'gagner du fric = to make money. Never in formal writing.' },
        'caisse': { en: 'car (slang) / checkout / box', pron: 'KESS', gender: 'feminine', register: 'informal', type: 'noun', note: 'multiple meanings — context decides: prêter sa caisse (car), à la caisse (checkout).' },
        'cordialement': { en: 'best regards (email close)', pron: 'kor-dyah-MAHN', register: 'neutral', type: 'expression', note: 'the default work-email sign-off; adverb form of cordial.' },
        'bien à vous': { en: 'all the best (warm-formal close)', pron: 'byan ah VOO', register: 'formal', type: 'expression', note: 'between Cordialement and distinguées in formality.' },
        'cela': { en: 'that (formal)', pron: 'suh-LAH', type: 'pronoun', register: 'formal', note: 'written twin of ça. Cela dit = that said.' },
        'se déplacer': { en: 'to come / travel over (formal)', pron: 'suh day-plah-SAY', type: 'verb', register: 'formal', note: 'merci de vous déplacer = thank you for coming. The polite venire.' },
        'texto': { en: 'text message (casual)', pron: 'TEHKS-toh', gender: 'masculine', plural: 'textos', register: 'informal', type: 'noun', note: 'official word: SMS. un texto / des textos.' },
        'courriel': { en: 'email (Canada)', pron: 'koo-RYEHL', gender: 'masculine', plural: 'courriels', type: 'noun', note: 'the Canadian word; France says mail / e-mail informally, courrier électronique formally.' },
        'informer': { en: 'to inform', pron: 'an-for-MAY', type: 'verb', register: 'formal', note: 'informer QUELQU\u2019UN QUE… — institutional verb of notices.' },
        'néanmoins': { en: 'nevertheless', pron: 'nay-ahn-MWAN', type: 'adverb', register: 'formal', note: 'stronger than cependant; letter and essay register.' },
        'maintenir': { en: 'to maintain / keep', pron: 'man-tuh-NEER', type: 'verb', note: 'je maintiens ma demande = I stand by my request. Participle maintenu.' },
        'renseignements': { en: 'information (formal, plural)', pron: 'rahn-sehn-mahn', gender: 'masculine', type: 'noun', note: 'demander des renseignements = to ask for information — never infos in writing.' },
        'fonds': { en: 'funds (formal)', pron: 'FOHN', gender: 'masculine', type: 'noun', note: 'des fonds suffisants = sufficient funds — the formal fric.' },
        'ouais': { en: 'yeah (casual)', pron: 'WEH', register: 'informal', type: 'expression', note: 'spoken oui; writing keeps oui.' },
        'sympa': { en: 'nice / cool (casual)', pron: 'SAN-PAH', register: 'informal', type: 'adjective', note: 'invariable and informal — short for sympathique.' },
        'nullement': { en: 'not at all (formal)', pron: 'nül-MAHN', type: 'adverb', register: 'formal', note: 'cela ne m\u2019intéresse nullement — the formal pas du tout.' },
        'veuillez': { en: 'please (very formal — veuillez + infinitive)', pron: 'vuh-YAY', type: 'verb', register: 'formal', base: { form: 'vouloir', en: 'to want' }, note: 'Veuillez trouver ci-joint… = please find attached. Imperative of vouloir, polite by convention.' },
        'faire savoir': { en: 'to let know / convey (formal)', pron: 'fehr sah-VWAHR', type: 'expression', register: 'formal', note: 'faites-moi savoir si… — the formal way to say "let me know".' },
    },
};

// ── B2 · Structured Argumentation ───────────────────────────────────────────
const b2Argumentation: StaticFrenchLesson = {
    title: 'Structured Argumentation',
    objective: 'Build a graded-ready argument with the ORECC skeleton — Opinion, Reasons, Examples, Counter-argument, Conclusion — chain it with essay connectors (en effet, en outre, néanmoins, en somme) and the B2 concessions (bien que + subjunctive, certes… mais).',

    vocabulary: [
        { fr: 'en effet', en: 'indeed (introduces proof)', pron: 'ahn eh-FEH', type: 'phrase', register: 'formal', example: { fr: 'Le télétravail aide ; en effet, il supprime les trajets.', en: 'Remote work helps; indeed, it removes commutes.' }, related: [{ fr: 'de fait', en: 'in fact (very formal)' }] },
        { fr: 'en outre', en: 'moreover (adds a reason)', pron: 'ahn oot-ROOT', type: 'phrase', register: 'formal', example: { fr: 'En outre, cela réduit les coûts.', en: 'Moreover, it cuts costs.' }, related: [{ fr: 'de plus', en: 'in addition' }] },
        { fr: 'néanmoins', en: 'nevertheless', pron: 'nay-ahn-MWAN', type: 'adverb', register: 'formal', example: { fr: 'Néanmoins, des limites existent.', en: 'Nevertheless, limits exist.' }, related: [{ fr: 'toutefois', en: 'however' }] },
        { fr: 'certes… mais', en: 'admittedly… but (the counter-argument pair)', pron: 'sairt meh', type: 'phrase', register: 'formal', example: { fr: 'Certes, c\u2019est coûteux, mais l\u2019investissement paie.', en: 'Admittedly it\u2019s costly, but the investment pays.' }, related: [{ fr: 'il est vrai que… cependant', en: 'it\u2019s true that… however' }] },
        { fr: 'en somme', en: 'in short (conclusion)', pron: 'ahn SAWM', type: 'phrase', register: 'formal', example: { fr: 'En somme, les avantages dominent.', en: 'In short, the advantages dominate.' }, related: [{ fr: 'en conclusion', en: 'in conclusion' }] },
        { fr: 'il convient de', en: 'it is appropriate to (formal must)', pron: 'eel kohn-VYEN duh', type: 'phrase', register: 'formal', example: { fr: 'Il convient de nuancer ce constat.', en: 'This finding should be qualified.' }, related: [{ fr: 'il s\u2019agit de', en: 'it is a matter of' }] },
        { fr: 'constater', en: 'to observe / note (a fact)', pron: 'kohns-tah-TAY', type: 'verb', register: 'formal', example: { fr: 'On constate une hausse des prix.', en: 'A rise in prices is observed.' }, related: [{ fr: 'le constat', en: 'the finding' }] },
        { fr: 'nuancer', en: 'to qualify / add nuance', pron: 'nü-ahn-SAY', type: 'verb', register: 'formal', example: { fr: 'Je nuancerais ce point.', en: 'I would qualify that point.' }, related: [{ fr: 'la nuance', en: 'the nuance' }] },
        { fr: 'l\u2019emporter sur', en: 'to outweigh / prevail over', pron: 'lahm-por-TAY sür', type: 'verb', register: 'formal', example: { fr: 'Les avantages l\u2019emportent sur les inconvénients.', en: 'The advantages outweigh the drawbacks.' }, related: [{ fr: 'dominer', en: 'to dominate' }] },
        { fr: 'un contre-argument', en: 'a counter-argument', pron: 'uhn kohn-truhr-gü-MAHN', gender: 'masculine', register: 'formal', example: { fr: 'Anticiper le contre-argument impressionne le correcteur.', en: 'Anticipating the counter-argument impresses the examiner.' }, related: [{ fr: 'réfuter', en: 'to refute' }] },
        { fr: 'dans une certaine mesure', en: 'to a certain extent', pron: 'dahn ün sair-TEN muh-ZÜR', type: 'phrase', register: 'formal', example: { fr: 'C\u2019est vrai, dans une certaine mesure.', en: 'That\u2019s true, to a certain extent.' }, related: [{ fr: 'jusqu\u2019à un certain point', en: 'up to a point' }] },
        { fr: 'en guise de conclusion', en: 'by way of conclusion', pron: 'ahn geez duh kohn-klü-ZYOHN', type: 'phrase', register: 'formal', example: { fr: 'En guise de conclusion, gardons l\u2019essentiel.', en: 'By way of conclusion, let\u2019s keep the essential.' }, related: [{ fr: 'pour conclure', en: 'to conclude' }] },
    ],

    pronunciation: [
        { fr: 'en effet', approx: 'ahn eh-FEH', en: 'two nasals then a clean "FEH"' },
        { fr: 'en outre', approx: 'ahn oot-ROOT', en: 'the ou-tr-e glide: "oot-ROOT"' },
        { fr: 'néanmoins', approx: 'nay-ahn-MWAN', en: 'three syllables, stress the last nasal' },
        { fr: 'certes', approx: 'SAIRT', en: 'the -tes sounds "t" — one syllable total' },
        { fr: 'l\u2019emporte', approx: 'lahm-PORT', en: 'emporte keeps its e before the s of l\u2019emportent (same sound)' },
        { fr: 'en somme', approx: 'ahn SAWM', en: 'double m keeps the o closed: "SAWM"' },
    ],

    grammar: {
        rule: 'ORECC: Opinion → Reasons (en effet, car) → Examples/Explanation (notamment, par exemple, de plus) → Counter-argument (certes… mais, néanmoins) → Conclusion (en somme, en guise de conclusion). Each move has its own connector family — never stack two connectors of the same family in a row.',
        explanation: 'The TCF\u2019s written production (and the B2/C1 speaking tasks) grade STRUCTURE as heavily as grammar. Build each paragraph as one ORECC unit: state the opinion plainly (je considère que…), support it with a proof-introducer (en effet, il est prouvé que), add a second reason (en outre, de plus) with a concrete example (notamment, à l\u2019image de), then bend to the other side (certes, il est vrai que…) before bouncing back (mais, néanmoins, toutefois) — and close by weighing (les avantages l\u2019emportent sur les inconvénients). Concession now goes subjunctive: bien que cette solution soit coûteuse, elle… (B1\u2019s même si + indicative becomes bien que + subjunctive). Qualify everything: dans une certaine mesure, il convient de nuancer, tout dépend de — French grading rewards measured claims over absolutes. Avoid the B1 connectors (donc, mais) as paragraph openers in B2 writing; upgrade them (par conséquent, néanmoins).',
        examples: [
            { fr: 'Je considère que le télétravail présente davantage d\u2019avantages que d\u2019inconvénients.', en: 'I consider that remote work has more advantages than drawbacks.', breakdown: ['je considère que = strong opinion frame', 'davantage de = more (formal than plus de)', 'que d\u2019inconvénients = than drawbacks'] },
            { fr: 'En effet, les employés gagnent un temps considérable en supprimant les trajets quotidiens.', en: 'Indeed, employees save considerable time by removing daily commutes.', breakdown: ['en effet = proof-introducer', 'en supprimant = gerund (by …ing)', 'quotidiens = daily (formal adjective)'] },
            { fr: 'De plus, certaines entreprises constatent une hausse de productivité, notamment chez les développeurs.', en: 'Moreover, some companies observe a productivity rise, notably among developers.', breakdown: ['de plus = second reason', 'constatent = observe (formal)', 'notamment = notably (example marker)'] },
            { fr: 'Certes, l\u2019isolement constitue un risque réel ; néanmoins, des mesures simples permettent d\u2019y remédier.', en: 'Admittedly, isolation is a real risk; nevertheless, simple measures can remedy it.', breakdown: ['certes… néanmoins = the counter-argument hinge', 'constitue = constitutes (formal for est)', 'y remédier = remedy it (y + de-verb)'] },
            { fr: 'Bien que cette organisation ne convienne pas à tous les métiers, elle mérite d\u2019être généralisée.', en: 'Although this arrangement doesn\u2019t suit every profession, it deserves to be generalized.', breakdown: ['bien que + subjunctive (convienne)', 'mériter de = deserve to', 'généralisée = passive participle'] },
            { fr: 'En somme, malgré les réticences initiales, le jeu en vaut la chandelle : les bénéfices l\u2019emportent largement.', en: 'In short, despite initial reluctance, the game is worth the candle: the benefits clearly prevail.', breakdown: ['en somme = conclusion marker', 'malgré + noun', 'l\u2019emportent = prevail'] },
        ],
        commonMistakes: [
            'Opening every paragraph with donc or mais — at B2 the graders expect upgraded connectors (par conséquent, néanmoins) and variety.',
            'Doubling connectors of the same family: "mais cependant néanmoins" — one contrast connector per joint, as in B1:opinions.',
            'Using même si where the task demands bien que: at B2 writing, concession should show the subjunctive (bien que ce soit…) at least once.',
            'Forgetting the counter-argument entirely — an ORECC essay without certes… mais reads as one-sided and caps at mid-band.',
        ],
    },

    transformations: [
        { type: 'B1 contrast', fr: 'Mais le télétravail a des limites.', en: 'But remote work has limits.' },
        { type: 'B2 contrast', fr: 'Néanmoins, cette organisation comporte des limites.', en: 'Nevertheless, this arrangement has limits.' },
        { type: 'B1 because', fr: '…parce qu\u2019on gagne du temps.', en: '…because we save time.' },
        { type: 'B2 proof', fr: '…en effet, un temps considérable est économisé.', en: '…indeed, considerable time is saved.' },
        { type: 'B1 concession', fr: 'Même si c\u2019est coûteux, ça vaut la peine.', en: 'Even if it\u2019s costly, it\u2019s worth it.' },
        { type: 'B2 concession', fr: 'Bien que ce soit coûteux, cela vaut la peine.', en: 'Although it\u2019s costly, it\u2019s worth it.' },
        { type: 'Counter-argument', fr: 'Certes, l\u2019isolement est réel, mais il se gère.', en: 'Admittedly, isolation is real, but it can be managed.' },
        { type: 'Conclusion', fr: 'En somme, le rapport bénéfices-coûts est favorable.', en: 'In short, the benefit-cost ratio is favorable.' },
    ],

    sentenceBuilding: [
        { fr: 'Il est indéniable que les villes attirent les jeunes.', en: 'It is undeniable that cities attract young people.' },
        { fr: 'Il est indéniable que les villes attirent les jeunes : en effet, l\u2019emploi et les études s\u2019y concentrent.', en: 'It is undeniable that cities attract young people: indeed, jobs and studies concentrate there.' },
        { fr: 'En outre, les transports et la culture y sont plus accessibles, notamment le soir et le week-end.', en: 'Moreover, transit and culture are more accessible there, notably in the evening and on weekends.' },
        { fr: 'Certes, le coût du logement constitue un obstacle majeur ; néanmoins, la colocation et les banlieues connectées offrent des solutions.', en: 'Admittedly, housing costs are a major obstacle; nevertheless, shared housing and connected suburbs offer solutions.' },
        { fr: 'En somme, bien que la vie urbaine exige des compromis, les opportunités l\u2019emportent largement sur les contraintes.', en: 'In short, although urban life demands compromises, the opportunities clearly outweigh the constraints.' },
    ],

    practice: [
        { instruction: 'Choose the connector:', question: '______, les prix ont augmenté de 10 % (introducing proof).', answer: 'En effet — proof-introducer after a claim' },
        { instruction: 'Upgrade the connector:', question: 'Mais il y a des risques. (B2 writing)', answer: 'Néanmoins, des risques existent. / Toutefois… — formal contrast' },
        { instruction: 'Counter-argument hinge:', question: '______, c\u2019est cher, ______ l\u2019investissement paie.', answer: 'Certes… mais — the two-part concession' },
        { instruction: 'Concession + mood:', question: 'Bien que cette idée ______ (être) séduisante, elle est risquée.', answer: 'soit — bien que + subjunctive' },
        { instruction: 'Weighing:', question: 'Les avantages ______ sur les inconvénients.', answer: 'l\u2019emportent — l\u2019emporter sur = outweigh' },
        { instruction: 'Qualify:', question: 'C\u2019est vrai, ______ une certaine mesure.', answer: 'dans — dans une certaine mesure = measured agreement' },
    ],

    translationPractice: [
        { en: 'Indeed, the figures confirm this trend.', fr: 'En effet, les chiffres confirment cette tendance.' },
        { en: 'Moreover, it would create jobs.', fr: 'En outre, cela créerait des emplois.' },
        { en: 'Admittedly it\u2019s slow; however, it\u2019s reliable.', fr: 'Certes, c\u2019est lent ; néanmoins, c\u2019est fiable.' },
        { en: 'Although the measure is unpopular, it\u2019s necessary.', fr: 'Bien que la mesure soit impopulaire, elle est nécessaire.' },
        { en: 'The advantages outweigh the drawbacks.', fr: 'Les avantages l\u2019emportent sur les inconvénients.' },
        { en: 'In short, this policy deserves support.', fr: 'En somme, cette politique mérite d\u2019être soutenue.' },
    ],

    reverseTranslation: [
        { fr: 'Il convient de nuancer ce constat.', en: 'This finding should be qualified.' },
        { fr: 'On constate une baisse du chômage chez les jeunes.', en: 'A drop in youth unemployment is observed.' },
        { fr: 'En guise de conclusion, retenons l\u2019essentiel.', en: 'By way of conclusion, let\u2019s keep the essential.' },
        { fr: 'Cette solution mérite d\u2019être examinée de plus près.', en: 'This solution deserves a closer look.' },
    ],

    register: {
        informal: 'Bref, c\u2019est le pied, mais bon, y a des défauts quoi. (bref, mais bon, quoi = spoken argument glue — never in essays)',
        neutral: 'Je pense que c\u2019est une bonne idée, même s\u2019il y a des risques.',
        formal: 'Je considère que cette mesure, bien qu\u2019imparfaite, constitue un progrès notable : les bénéfices l\u2019emportent sur les contraintes.',
    },

    culture: 'French academic culture inherited dissertation-style structure from the lycée: thesis, antithesis, synthesis. The TCF\u2019s written production rubric explicitly rewards organised paragraphs, connectors and the counter-argument — examiners call it "anticiper l\u2019objection". Canadians write the same way in French-language universities. One page, four ORECC paragraphs, and a measured conclusion is the classic 450-word B2 essay shape.',

    freeProduction: 'Write a four-paragraph ORECC essay (120–160 words) on: "Le télétravail est-il l\u2019avenir du travail ?" Paragraph 1 opinion + en effet proof; paragraph 2 en outre + notably example; paragraph 3 certes… néanmoins counter-argument with one bien que + subjunctive; paragraph 4 en somme + l\u2019emporter sur. Then record a 90-second spoken version using the same skeleton.',

    miniTest: [
        { question: 'Introduces a proof:', options: ['en somme', 'en effet', 'certes', 'en guise de'], answer: 'en effet — indeed, after the claim' },
        { question: 'The counter-argument hinge is:', options: ['certes… mais', 'de plus… donc', 'enfin… puis', 'car… parce que'], answer: 'certes… mais — concede, then bounce' },
        { question: 'Bien que + ______:', options: ['indicative', 'subjunctive', 'imperative', 'infinitive'], answer: 'subjunctive — the B2 concession' },
        { question: 'Les avantages ______ sur les inconvénients:', options: ['gagnent', 'l\u2019emportent', 'gagnent sur', 'dépensent'], answer: 'l\u2019emportent — l\u2019emporter sur = outweigh' },
        { question: 'Best conclusion opener at B2:', options: ['bref', 'donc', 'en somme', 'alors'], answer: 'en somme — formal essay conclusion' },
    ],

    review: [
        'The connector families from B1:opinions are the foundation — B2 upgrades them (donc → par conséquent, mais → néanmoins) and adds the counter-argument.',
        'The subjunctive from B2:subjonctif powers the concessions: bien que + subjunctive replaces B1\u2019s même si + indicative in formal writing.',
    ],

    traps: [
        'One connector per joint: mais + cependant + néanmoins in the same sentence triples the contrast signal and reads as panic. Choose and move on.',
        'bien que + subjunctive, not indicative: "bien que c\u2019est" is the most common B2 essay error — rehearse soit/ait/fasse inside concessions.',
        'Don\u2019t concede and forget to return: certes… must be answered with mais/néanmoins before the conclusion, or the essay concedes the debate.',
        'Word count discipline: the ORECC skeleton fits 120–160 words; padding with repeated connectors loses structure points faster than it gains length.',
    ],

    homework: {
        intro: 'Every item builds one ORECC move: proof, addition, counter-argument, qualification, or conclusion. Use the essay register throughout.',
        translation: [
            { prompt: 'Indeed, the figures confirm the trend.', answer: 'En effet, les chiffres confirment la tendance.', explanation: 'en effet follows the claim it proves; confirmer takes a direct object — no de.' },
            { prompt: 'Moreover, this would create jobs.', answer: 'En outre, cela créerait des emplois.', explanation: 'en outre adds a second reason; the conditional créerait marks the hypothesis (B1:conditionnel reused in essay register).' },
            { prompt: 'Admittedly it\u2019s expensive; nevertheless, it\u2019s efficient.', answer: 'Certes, c\u2019est coûteux ; néanmoins, c\u2019est efficace.', alt: ['Certes, c’est cher ; néanmoins, c’est efficace'], explanation: 'certes concedes, néanmoins bounces back — the counter-argument hinge in two words each.' },
            { prompt: 'Although the solution is imperfect, it deserves support.', answer: 'Bien que la solution soit imparfaite, elle mérite d\u2019être soutenue.', explanation: 'bien que + subjunctive (soit); mériter de + infinitive, passive infinitive here (d\u2019être soutenue).' },
            { prompt: 'In short, the benefits outweigh the risks.', answer: 'En somme, les bénéfices l\u2019emportent sur les risques.', explanation: 'en somme closes; l\u2019emporter sur = outweigh — the standard weighing formula the examiner expects.' },
            { prompt: 'This should be qualified.', answer: 'Il convient de nuancer ce constat.', explanation: 'il convient de + infinitive = formal must; nuancer is the measured-claim verb French essays love.' },
        ],
        blanks: [
            { prompt: 'Le projet est ambitieux ; ______, il reste réaliste.', answer: 'néanmoins', alt: ['toutefois', 'cependant'], explanation: 'Contrast after a positive statement — the formal family: néanmoins, toutefois, cependant.' },
            { prompt: '______, la productivité a augmenté de 15 % (proof).', answer: 'En effet', explanation: 'en effet introduces the fact that proves the previous claim; a figure is the classic proof.' },
            { prompt: '______ ce soit difficile, je maintiens ma position.', answer: 'Bien que', alt: ['Quoique'], explanation: 'bien que/quoique + subjunctive: the B2 concession. même si (indicative) would drop a register level.' },
            { prompt: 'Les coûts initiaux sont élevés ; ______, l\u2019investissement se rentabilise en deux ans.', answer: 'cependant', alt: ['néanmoins', 'toutefois'], explanation: 'One contrast connector per joint; cependant pairs well with a following explanation.' },
            { prompt: '______, retenons que l\u2019équilibre est possible. (conclusion)', answer: 'En guise de conclusion', alt: ['En somme'], explanation: 'The essay closer family: en guise de conclusion, en somme, pour conclure.' },
            { prompt: 'Cette mesure mérite d\u2019______ étudiée. (passive infinitive)', answer: 'être', explanation: 'mériter de + être + participle = deserves to be …-ed: mérite d\u2019être étudiée (agrees with la mesure).' },
        ],
        corrections: [
            { prompt: 'Donc, en conclusion, je pense que c\u2019est bien, mais bon.', answer: 'En somme, cette solution mérite d\u2019être soutenue.', explanation: 'How the mistake happens: spoken glue (donc, mais bon) in an essay close. Why it does not work: the conclusion is the most-graded sentence — vague praise scores nothing. How to fix it: en somme + one precise verdict (mérite d\u2019être soutenue).' },
            { prompt: 'Bien que c\u2019est coûteux, on devrait l\u2019essayer.', answer: 'Bien que ce soit coûteux, on devrait l\u2019essayer.', explanation: 'How the mistake happens: keeping the indicative after bien que. Why it does not work: concession triggers the subjunctive at B2. How to fix it: ce soit (être → sois/soit/soient).' },
            { prompt: 'Certes, c\u2019est cher. C\u2019est pourquoi je refuse.', answer: 'Certes, c\u2019est cher ; néanmoins, les bénéfices l\u2019emportent.', explanation: 'How the mistake happens: conceding then never returning. Why it does not work: certes without a mais/néanmoins rebound hands the debate to the other side. How to fix it: complete the hinge — concede AND outweigh.' },
            { prompt: 'Mais donc néanmoins le projet est risqué.', answer: 'Néanmoins, le projet est risqué.', explanation: 'How the mistake happens: stacking connectors for emphasis. Why it does not work: mais, donc and néanmoins belong to different families and one joint takes one connector. How to fix it: pick the contrast (néanmoins) and delete the rest.' },
            { prompt: 'Les inconvénients gagnent sur les avantages.', answer: 'Les inconvénients l\u2019emportent sur les avantages.', explanation: 'How the mistake happens: translating "win over" literally. Why it does not work: gagner sur is not the essay idiom. How to fix it: l\u2019emporter sur — memorize it as one unit.' },
        ],
        writing: {
            task: 'Full ORECC essay (120–160 words) on: "Faut-il rendre les transports en commun gratuits ?" P1 opinion + en effet + a figure; P2 en outre + notamment example; P3 certes… néanmoins counter-argument + one bien que + subjunctive; P4 en somme + l\u2019emporter sur. Use il convient de once.',
            requirements: [
                'Four paragraphs, one ORECC move each',
                'en effet, en outre, certes… néanmoins, en somme all present',
                'One bien que + subjunctive',
                'One il convient de / nuancer qualification',
                'No B1 connectors (donc, mais, parce que) opening a paragraph',
            ],
            minWords: 110,
        },
        checklist: [
            'I run the ORECC skeleton: Opinion, Reasons, Examples, Counter-argument, Conclusion',
            'I use the B2 connectors: en effet, en outre, néanmoins/toutefois, en somme',
            'I build the hinge: certes… mais / néanmoins, conceding and returning',
            'I concede with bien que + subjunctive in formal writing',
            'I qualify claims: dans une certaine mesure, il convient de nuancer, tout dépend de',
            'I weigh with l\u2019emporter sur and close with a one-sentence verdict',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'ORECC mapped to connectors: OPINION — je considère que, il me semble que; REASONS — en effet, car, puisque; EXAMPLES — notamment, par exemple, à l\u2019image de; COUNTER — certes… mais, il est vrai que… néanmoins; CONCLUSION — en somme, en guise de conclusion.',
            examples: [
                { fr: 'Je considère que… En effet… Notamment… Certes… néanmoins… En somme…', en: 'the whole skeleton in six words' },
            ],
        },
        {
            explanation: 'Upgrade table B1 → B2: donc → par conséquent · mais → néanmoins/toutefois · parce que → car/en effet · beaucoup de → de nombreux/nombreuses · très → particulièrement · chose → élément/aspect.',
            examples: [
                { fr: 'Il y a beaucoup de problèmes → De nombreux défis se posent.', en: 'one sentence, upgraded' },
            ],
        },
        {
            explanation: 'The counter-argument moves: 1) concede with certes / il est vrai que; 2) label the objection (on objectera que…); 3) bounce with mais / néanmoins; 4) outweigh with l\u2019emporter sur.',
            examples: [
                { fr: 'Certes, l\u2019isolement est réel ; on objectera qu\u2019il coûte cher… mais des solutions existent et les bénéfices l\u2019emportent.', en: 'the full four-move hinge' },
            ],
        },
        {
            explanation: 'Qualification kit: dans une certaine mesure · jusqu\u2019à un certain point · il convient de nuancer · tout dépend de · à condition que + subjunctive · sans doute (probably — not "without doubt"!).',
            examples: [
                { fr: 'Sans doute cette mesure aidera-t-elle, dans une certaine mesure.', en: 'measured claim, inversion flourish' },
            ],
        },
        {
            explanation: 'Formal verbs that replace est/a: constituer (constitue un risque), représenter (représente un défi), s\u2019agir de (il s\u2019agit de…), permettre de (permet d\u2019économiser), mériter de (mérite d\u2019être étudié).',
            examples: [
                { fr: 'Le coût est un problème → Le coût constitue un obstacle majeur.', en: 'same idea, essay register' },
            ],
        },
        {
            explanation: 'Conclusion discipline: one sentence, one verdict. Template: En somme, bien que + concession (subj), [verdict clause with l\u2019emportent sur / mérite d\u2019être…].',
            examples: [
                { fr: 'En somme, bien que le chemin soit long, le jeu en vaut la chandelle.', en: 'the closing formula to reuse' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'en effet': { en: 'indeed (introduces proof)', pron: 'ahn eh-FEH', type: 'expression', register: 'formal', note: 'follows the claim it proves — the essay\u2019s "because here\u2019s why".' },
        'en outre': { en: 'moreover', pron: 'ahn oot-ROOT', type: 'expression', register: 'formal', note: 'adds a second reason; lighter than de surcroît.' },
        'toutefois': { en: 'however', pron: 'too-tuh-FWAH', type: 'adverb', register: 'formal', note: 'contrast family with néanmoins, cependant — pick one per joint.' },
        'certes': { en: 'admittedly / certainly (concedes)', pron: 'SAIRT', type: 'adverb', register: 'formal', note: 'always paired: certes… mais / certes… néanmoins. Never certes alone.' },
        'en somme': { en: 'in short (conclusion)', pron: 'ahn SAWM', type: 'expression', register: 'formal', note: 'the measured essay closer — not bref, not donc.' },
        'il convient de': { en: 'it is appropriate to (formal must)', pron: 'eel kohn-VYEN duh', type: 'phrase', register: 'formal', note: 'il convient de + infinitive; also il convient que + subjunctive.' },
        'nuancer': { en: 'to qualify / add nuance', pron: 'nü-ahn-SAY', type: 'verb', register: 'formal', note: 'je nuancerais ce point — the measured-disagreement verb.' },
        'constater': { en: 'to observe / note (a fact)', pron: 'kohns-tah-TAY', type: 'verb', register: 'formal', note: 'on constate que + indicative — facts, not beliefs. Participle constaté.' },
        'l\u2019emporter sur': { en: 'to outweigh / prevail over', pron: 'lahm-por-TAY sür', type: 'verb', register: 'formal', note: 'les avantages l\u2019emportent sur les inconvénients — the weighing formula.' },
        'notamment': { en: 'notably / in particular', pron: 'noh-tah-MAHN', type: 'adverb', register: 'formal', note: 'example marker: notamment chez les jeunes.' },
        'indéniable': { en: 'undeniable', pron: 'an-day-NYA-bluh', type: 'adjective', register: 'formal', note: 'il est indéniable que + indicative.' },
        'coûteux': { en: 'costly (masc)', pron: 'koo-TUH', type: 'adjective', fem: { word: 'coûteuse', en: 'costly (fem)' }, note: 'essay-register expensive; costs talk uses coûteux/coûteuse.' },
        'mériter de': { en: 'to deserve to', pron: 'may-ree-TAY duh', type: 'verb', note: 'mérite d\u2019être étudié / d\u2019être soutenue — passive infinitives after it.' },
        'constat': { en: 'finding / observation', pron: 'kohns-TAH', gender: 'masculine', plural: 'constats', type: 'noun', register: 'formal', note: 'nuancer ce constat — the noun pair of constater.' },
        'réticence': { en: 'reluctance / reservation', pron: 'ray-tee-SAHNSS', gender: 'feminine', plural: 'réticences', type: 'noun', note: 'malgré les réticences initiales — the polite word for resistance.' },
        'colocation': { en: 'flat-sharing', pron: 'koh-loh-kah-SYOHN', gender: 'feminine', type: 'noun', note: 'vivre en colocation — the standard housing-cost solution in essays.' },
        'compte': { en: 'counts / account', pron: 'KOHNT', gender: 'masculine', type: 'noun', note: 'tenir compte de = to take into account (essay verb); le compte est bon.' },
    },
};

export const STATIC_B2_PART1: Record<string, StaticFrenchLesson> = {
    'B2:subjonctif': b2Subjonctif,
    'B2:registre': b2Registre,
    'B2:argumentation': b2Argumentation,
};
