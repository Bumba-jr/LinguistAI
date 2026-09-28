// C1 lectures part 2 — Evidence-Based Argumentation, Fast Speech & Implied
// Attitude. Same gold-standard format: full lesson + traps + homework (A–E) +
// checklistRemedial + glossary. Extras in frenchLessonExtras.ts.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── C1 · Evidence-Based Argumentation ───────────────────────────────────────
const c1ArgumentationAvancee: StaticFrenchLesson = {
    title: 'Evidence-Based Argumentation',
    objective: 'Build a claim from evidence — cite the source, grade your certainty verb by verb (démontrer > suggérer > laisser croire), hedge like an analyst (il semblerait que + subjunctive), address counterarguments with their evidence, and draw a measured conclusion the grader can quote.',

    vocabulary: [
        { fr: 'démontrer', en: 'to demonstrate / prove', pron: 'day-mohn-TRAY', type: 'verb', register: 'formal', example: { fr: 'L\u2019étude démontre un lien clair.', en: 'The study demonstrates a clear link.' }, related: [{ fr: 'la preuve', en: 'the proof' }] },
        { fr: 'suggérer que', en: 'to suggest that (weaker than prove)', pron: 'süg-zhay kuh', type: 'verb', register: 'formal', example: { fr: 'Les données suggèrent que…', en: 'The data suggests that…' }, related: [{ fr: 'indiquer que', en: 'to indicate that' }] },
        { fr: 'il semblerait que', en: 'it would seem that (hedged claim)', pron: 'eel sahm-bluh-REH kuh', type: 'phrase', register: 'formal', example: { fr: 'Il semblerait que la mesure porte ses fruits.', en: 'It would seem the measure is bearing fruit.' }, related: [{ fr: 'il apparaît que', en: 'it appears that' }] },
        { fr: 'les données probantes', en: 'the evidence (body of proof)', pron: 'lay doh-NAY proh-BAHNT', gender: 'feminine', register: 'formal', example: { fr: 'Les données probantes manquent encore.', en: 'The evidence is still lacking.' }, related: [{ fr: 'une donnée', en: 'a data point' }] },
        { fr: 'une corrélation', en: 'a correlation (not causation!)', pron: 'ün koh-reh-lah-SYOHN', gender: 'feminine', register: 'formal', example: { fr: 'Corrélation n\u2019est pas causalité.', en: 'Correlation is not causation.' }, related: [{ fr: 'la causalité', en: 'causation' }] },
        { fr: 'selon une étude', en: 'according to a study', pron: 'sü-LÖN ün ay-TÜD', type: 'phrase', register: 'formal', example: { fr: 'Selon une étude de 2024, le lien est faible.', en: 'According to a 2024 study, the link is weak.' }, related: [{ fr: 'l\u2019étude de cas', en: 'the case study' }] },
        { fr: 'il convient de rester prudent', en: 'one should remain cautious', pron: 'eel kohn-VYEN duh res-TAH prü-DAHN', type: 'phrase', register: 'formal', example: { fr: 'Il convient de rester prudent sur les causes.', en: 'One should remain cautious about the causes.' }, related: [{ fr: 'la prudence', en: 'caution' }] },
        { fr: 'sans doute', en: 'probably / no doubt (hedge!)', pron: 'sahn DOHT', type: 'expression', register: 'formal', example: { fr: 'Sans doute cette politique aidera-t-elle.', en: 'This policy will no doubt help.' }, related: [{ fr: 'sans aucun doute', en: 'without any doubt (stronger)' }] },
        { fr: 'laisser croire', en: 'to let believe / imply', pron: 'leh-SAY KRWAHR', type: 'phrase', register: 'formal', example: { fr: 'Le titre laisse croire une causalité.', en: 'The headline implies causation.' }, related: [{ fr: 'sous-entendre', en: 'to imply (between the lines)' }] },
        { fr: 'à l\u2019appui de', en: 'in support of', pron: 'ah lah-PÜEE duh', type: 'phrase', register: 'formal', example: { fr: 'Deux études à l\u2019appui de cette thèse.', en: 'Two studies in support of this thesis.' }, related: [{ fr: 'étayer', en: 'to back up' }] },
        { fr: 'étayer', en: 'to back up / bolster (a claim)', pron: 'ay-tah-YAY', type: 'verb', register: 'formal', example: { fr: 'Cette thèse est bien étayée.', en: 'This thesis is well supported.' }, related: [{ fr: 'l\u2019étaiement', en: 'the backing' }] },
        { fr: 'une mesure d\u2019impact', en: 'an impact assessment', pron: 'ün muh-ZÜR dah-PAK', gender: 'feminine', register: 'formal', example: { fr: 'Aucune mesure d\u2019impact n\u2019a été publiée.', en: 'No impact assessment has been published.' }, related: [{ fr: 'évaluer', en: 'to evaluate' }] },
    ],

    pronunciation: [
        { fr: 'il semblerait', approx: 'eel sahm-bluh-REH', en: 'conditional softener — the REH lands last' },
        { fr: 'corrélation', approx: 'koh-ray-lah-SYOHN', en: 'the second é is long: "koh-RAY-lah"' },
        { fr: 'sans doute', approx: 'sahn DOOT', en: 'the t sounds before a vowel: "sahn-DOOT-aide"' },
        { fr: 'à l\u2019appui de', approx: 'ah lah-PÜEE duh', en: 'appui = "ah-PÜEE", no l sound' },
        { fr: 'étayer', approx: 'ay-tah-YAY', en: 'the y glides: "ay-tah-YAY"' },
        { fr: 'données probantes', approx: 'doh-NAY proh-BAHNT', en: 'probantes keeps its nasal: "BAHNT"' },
    ],

    grammar: {
        rule: 'Certainty is graded by the verb: démontrer/prouver > indiquer/révéler > suggérer > laisser croire/sous-entendre. Match the mood to the certainty: facts take the indicative, hedged claims take il semblerait que + SUBJUNCTIVE, and projections take the conditional. Every claim carries its source; every counterargument gets its evidence too.',
        explanation: 'C1 argumentation is epistemology made visible. The claim ladder: une étude DÉMONTRE que (indicative — proven), les données INDIQUENT que / RÉVÈLENT que (indicative — observed), les résultats SUGGÈRENT que (indicative or conditional — suggestive), le titre LAISSE CROIRE que (critical distance — you are exposing an implication), il SEMBLERAIT que + subjunctive (your own hedged claim), il est VRAISEMBLABLE que + subjunctive. Correlation discipline: state the link, refuse the cause — corrélation n\u2019est pas causalité; assign causality only with mechanism or experiment (l\u2019étude randomisée). Attribution keeps you safe: selon l\u2019étude, selon ses auteurs, à en croire le rapport (if we believe the report — already faintly critical). Counterarguments deserve evidence as well: la objection mérite d\u2019être prise au sérieux — deux enquêtes indépendantes toutefois… Conclusion: measured, quotable — rien ne permet d\u2019affirmer X, mais l\u2019ensemble des données plaide pour Y.',
        examples: [
            { fr: 'Une étude de 2024 démontre que la mesure a réduit les émissions de 12 %. ', en: 'A 2024 study demonstrates the measure cut emissions by 12%.', breakdown: ['démontre = strongest verb, indicative', 'de 12 % = by 12% (B2 statistics)', 'source named before the claim'] },
            { fr: 'Les données suggèrent — elles ne prouvent pas — un effet d\u2019entraînement.', en: 'The data suggests — it does not prove — a knock-on effect.', breakdown: ['suggérer = the honest middle rung', 'the dash performs the precision', 'effet d\u2019entraînement = knock-on effect'] },
            { fr: 'Il semblerait que le programme porte ses fruits, sans que l\u2019on puisse isoler sa part exacte.', en: 'It would seem the program is bearing fruit, without one being able to isolate its exact share.', breakdown: ['semblerait + subjunctive (porte)', 'sans que + subjunctive', 'the hedge is the honesty'] },
            { fr: 'Corrélation n\u2019est pas causalité : les deux courbes montent ensemble, mais rien ne prouve que l\u2019une tire l\u2019autre.', en: 'Correlation is not causation: both curves rise together, but nothing proves one pulls the other.', breakdown: ['the discipline formula', 'curves rising = correlation imagery', 'tirer = pull (causation image)'] },
            { fr: 'À en croire le rapport, tout irait bien ; les annexes disent autre chose.', en: 'If we believe the report, all is well; the annexes say otherwise.', breakdown: ['à en croire = faintly critical attribution', 'irait = conditional (reported optimism)', 'annexes = the fine print'] },
            { fr: 'Rien ne permet d\u2019affirmer un lien direct, mais l\u2019ensemble des indices plaide pour une action rapide.', en: 'Nothing allows us to assert a direct link, but the overall evidence argues for swift action.', breakdown: ['rien ne permet de = the refusal to overclaim', 'plaider pour = argue for (final move)', 'measured verdict, two clauses'] },
        ],
        commonMistakes: [
            'Using démontrer for suggestive data: démontrer/prouver are for established results — for weak evidence use suggérer or indiquer, or the grader reads overclaiming.',
            'Putting the indicative after il semblerait que / il est vraisemblable que: these hedges take the SUBJUNCTIVE (il semblerait que ce soit…). Only il est probable que stays indicative.',
            'Sliding from correlation to cause: "les ventes ont monté parce que la pub a changé" needs a mechanism — otherwise "semble lié à" (seems linked to).',
            'Leaving the counterargument evidence-less: addressing "certains objectent que…" without citing what the objectors\u2019 data shows is a straw man — C1 requires both sides\u2019 evidence.',
        ],
    },

    transformations: [
        { type: 'Overclaim', fr: 'La preuve est faite : la pub augmente les ventes.', en: 'It\u2019s proven: ads raise sales.' },
        { type: 'Hedged', fr: 'Les données suggèrent un lien entre publicité et ventes.', en: 'The data suggests a link between advertising and sales.' },
        { type: 'Conditional hedge', fr: 'Il semblerait que la campagne porte ses fruits.', en: 'It would seem the campaign is bearing fruit.' },
        { type: 'Attributed', fr: 'Selon l\u2019étude, le lien reste faible.', en: 'According to the study, the link remains weak.' },
        { type: 'Correlation discipline', fr: 'Les courbes coïncident — sans que la causalité soit établie.', en: 'The curves coincide — without causation being established.' },
        { type: 'Counter-evidence', fr: 'Certains objectent le coût ; or, deux évaluations indépendantes concluent à un bilan positif.', en: 'Some object to the cost; yet two independent evaluations conclude positively.' },
        { type: 'Refusal to overclaim', fr: 'Rien ne permet d\u2019affirmer la causalité.', en: 'Nothing allows us to assert causation.' },
        { type: 'Measured close', fr: 'L\u2019ensemble des indices plaide pour une action rapide.', en: 'The overall evidence argues for swift action.' },
    ],

    sentenceBuilding: [
        { fr: 'Selon une étude de 2023, le lien est réel.', en: 'According to a 2023 study, the link is real.' },
        { fr: 'Selon une étude de 2023, le lien est réel, quoique modeste : environ deux points de productivité.', en: 'According to a 2023 study, the link is real, though modest: about two points of productivity.' },
        { fr: 'Ces résultats suggèrent un effet d\u2019entraînement, sans que la causalité soit établie.', en: 'These results suggest a knock-on effect, without causation being established.' },
        { fr: 'Certains objectent le coût de la mesure ; or, l\u2019évaluation indépendante publiée en mai conclut à un bilan positif dès la deuxième année.', en: 'Some object to the cost of the measure; yet the independent evaluation published in May concludes positively from year two.' },
        { fr: 'Rien ne permet d\u2019affirmer que la causalité est univoque, mais l\u2019ensemble des données probantes plaide pour une généralisation prudente.', en: 'Nothing allows us to assert univocal causation, but the overall evidence argues for cautious generalization.' },
    ],

    practice: [
        { instruction: 'Pick the certainty verb:', question: 'A single 40-person survey found a small link.', answer: 'suggérer / indiquer — not démontrer; the sample forbids the strong verb' },
        { instruction: 'Mood check:', question: 'Il semblerait que la mesure ______ (être) efficace.', answer: 'soit — hedged claim → subjunctive' },
        { instruction: 'Indicative or subjunctive?', question: 'Il est probable que le lien ______ (être) faible.', answer: 'est — probable = indicative (the B2 trap, still true at C1)' },
        { instruction: 'Correlation discipline:', question: 'Both curves rise together. Claim?', answer: 'Un lien est observé, sans que la causalité soit établie.' },
        { instruction: 'Critical attribution:', question: 'The report claims success; you doubt it.', answer: 'À en croire le rapport, tout irait bien ; les annexes disent autre chose.' },
        { instruction: 'Measured close:', question: 'Evidence is partial but leans positive.', answer: 'Rien ne permet d\u2019affirmer…, mais l\u2019ensemble des données plaide pour…' },
    ],

    translationPractice: [
        { en: 'The study demonstrates a clear reduction in emissions.', fr: 'L\u2019étude démontre une nette réduction des émissions.' },
        { en: 'The data suggests — it does not prove — a link.', fr: 'Les données suggèrent — sans le prouver — un lien.' },
        { en: 'It would seem the program is bearing fruit.', fr: 'Il semblerait que le programme porte ses fruits.' },
        { en: 'Correlation is not causation.', fr: 'Corrélation n\u2019est pas causalité.' },
        { en: 'Nothing allows us to assert a direct cause.', fr: 'Rien ne permet d\u2019affirmer une cause directe.' },
        { en: 'The overall evidence argues for cautious action.', fr: 'L\u2019ensemble des données plaide pour une action prudente.' },
    ],

    reverseTranslation: [
        { fr: 'À en croire le rapport, tout irait bien ; les annexes disent autre chose.', en: 'If we believe the report, all is well; the annexes say otherwise.' },
        { fr: 'Deux évaluations indépendantes étayent cette thèse.', en: 'Two independent evaluations back up this thesis.' },
        { fr: 'Les données probantes manquent encore sur le long terme.', en: 'The evidence is still lacking over the long term.' },
        { fr: 'Le titre laisse croire une causalité que le texte ne soutient pas.', en: 'The headline implies a causation the text doesn\u2019t support.' },
    ],

    register: {
        informal: 'Franchement, les chiffres disent ce qu\u2019on veut qu\u2019ils disent, non ? (spoken skepticism — the essay version follows)',
        neutral: 'Selon l\u2019étude, le lien reste modeste.',
        formal: 'Rien ne permet d\u2019affirmer la causalité ; toutefois, l\u2019ensemble des données probantes plaide pour une intervention ciblée, à condition d\u2019en évaluer finement les effets.',
    },

    culture: 'This is the grammar of think tanks, auditors and Radio-Canada\u2019s science desk: Canada\u2019s French-language public sphere runs on données probantes (the official translation of "evidence-based"), and the TCF\u2019s C1 reading texts quote studies precisely to test whether you hear the certainty verbs. The discipline is French academically sacred: a mémoiriste who writes prouve for suggère fails the jury\u2019s confidence — the same jury your examiner sits on.',

    freeProduction: 'Write an evidence brief (140–180 words) on a policy you invent (a curfew for e-scooters, a four-day week pilot): state the claim, cite one study with the right certainty verb, add one correlation-discipline sentence (corrélation n\u2019est pas causalité), give the counterargument its own evidence, and close with rien ne permet d\u2019affirmer…, mais l\u2019ensemble… plaide pour…. One il semblerait que + subjunctive required.',

    miniTest: [
        { question: 'Strongest certainty verb:', options: ['suggérer', 'démontrer', 'laisser croire', 'sembler'], answer: 'démontrer — reserved for established results' },
        { question: 'Il semblerait que la mesure ______ efficace:', options: ['est', 'soit', 'sera', 'était'], answer: 'soit — hedge → subjunctive' },
        { question: 'Il est probable que le lien ______ faible:', options: ['soit', 'est', 'serait', 'soit probable'], answer: 'est — probable keeps the indicative' },
        { question: '"Corrélation n\u2019est pas causalité" warns against:', options: ['using studies', 'confusing link with cause', 'small samples', 'old data'], answer: 'confusing link with cause — the C1 discipline formula' },
        { question: 'À en croire le rapport carries:', options: ['full trust', 'faint criticism', 'a command', 'a question'], answer: 'faint criticism — "if we are to believe…" suspends judgment' },
    ],

    review: [
        'The certainty dial extends B2\u2019s belief verbs: je pense que (indicative) → il semblerait que (subjunctive) → rien ne permet d\u2019affirmer (refusal).',
        'The statistics machinery from B2:societe (une hausse de X %, le taux de) supplies the raw evidence this lecture grades.',
    ],

    traps: [
        'Verb ladder discipline: prouver/démontrer = established; indiquer/révéler = observed; suggérer = suggestive; laisser croire = you suspect manipulation. Using the top rung for weak data is the classic C1 fail.',
        'Hedge verbs take the subjunctive: il semblerait que ce soit, il est vraisemblable que ce soit — but il est probable que ce serait? no: il est probable que ce EST (indicative). Learn the two-column list cold.',
        'sans doute = PROBABLY in modern French, not "without doubt": sans doute il viendra = he\u2019ll probably come. sans aucun doute is the strong form.',
        'Counterarguments need evidence too: objecter without data is a straw man — cite the objectors\u2019 source, then weigh it.',
    ],

    homework: {
        intro: 'Every item grades certainty: the right verb, the right mood, the source attached, and the counterargument carrying its own evidence.',
        translation: [
            { prompt: 'The study demonstrates a clear reduction.', answer: 'L\u2019étude démontre une nette réduction.', explanation: 'démontrer reserved for established results; nette = clear/sharp — the evidence-quality adjective.' },
            { prompt: 'The data suggests — it does not prove — a link.', answer: 'Les données suggèrent, sans le prouver, un lien.', alt: ['Les données suggèrent un lien sans le prouver'], explanation: 'suggérer = the honest middle rung; the gerundless sans le prouver keeps the discipline explicit.' },
            { prompt: 'It would seem the program is bearing fruit.', answer: 'Il semblerait que le programme porte ses fruits.', explanation: 'il semblerait que + SUBJUNCTIVE (porte); porter ses fruits = bear fruit (evidence idiom).' },
            { prompt: 'According to the study, the link remains weak.', answer: 'Selon l\u2019étude, le lien reste faible.', explanation: 'attribution before claim; rester faible — measured adjectives, not absolutes.' },
            { prompt: 'Nothing allows us to assert direct causation.', answer: 'Rien ne permet d\u2019affirmer une causalité directe.', explanation: 'rien ne permet de + infinitive — the refusal-to-overclaim frame; note the de after permettre.' },
            { prompt: 'The overall evidence argues for cautious action.', answer: 'L\u2019ensemble des données plaide pour une action prudente.', explanation: 'plaider pour = argue for; l\u2019ensemble de + singular verb — the collective subject.' },
        ],
        blanks: [
            { prompt: 'Les résultats ______ (suggérer) un effet d\u2019entraînement.', answer: 'suggèrent', explanation: 'suggérer takes è in the nose forms: je suggère, ils suggèrent.' },
            { prompt: 'Il semblerait que la mesure ______ (être) efficace.', answer: 'soit', explanation: 'Hedge verb → subjunctive. Contrast: il est probable que la mesure est efficace (indicative).' },
            { prompt: 'Deux études ______ (étayer) cette thèse.', answer: 'étayent', explanation: 'étayer → j\u2019étaye, ils étayent — y becomes i before a mute e.' },
            { prompt: '______ en croire le rapport, tout irait bien.', answer: 'À', explanation: 'à en croire = if we believe (with suspended judgment); the conditional irait marks the reported optimism.' },
            { prompt: 'Corrélation n\u2019est pas ______ : les courbes montent ensemble, rien de plus.', answer: 'causalité', explanation: 'The discipline formula: correlation ≠ causation. Memorize as one unit.' },
            { prompt: 'L\u2019ensemble des données ______ (plaider) pour une action rapide.', answer: 'plaide', explanation: 'l\u2019ensemble de + plural noun takes a SINGULAR verb: l\u2019ensemble … plaide.' },
        ],
        corrections: [
            { prompt: 'Une enquête sur 40 personnes démontre que le produit est dangereux.', answer: 'Une enquête sur 40 personnes suggère un possible danger.', explanation: 'How the mistake happens: reaching for the strongest verb. Why it does not work: a small sample cannot démontrer — graders read overclaiming as either carelessness or manipulation. How to fix it: suggérer + hedge (un possible danger).' },
            { prompt: 'Il semblerait que la mesure est efficace.', answer: 'Il semblerait que la mesure soit efficace.', explanation: 'How the mistake happens: keeping the indicative under a hedge. Why it does not work: semblerait + subjunctive is the graded pair — same rule as il est possible que. How to fix it: soit.' },
            { prompt: 'Les ventes ont monté parce que la pub a changé.', answer: 'Les ventes semblent liées au changement de publicité, sans que la causalité soit établie.', explanation: 'How the mistake happens: causal parce que without a mechanism. Why it does not work: co-movement is not cause — the C1 discipline formula. How to fix it: sembler lié à + the refusal clause.' },
            { prompt: 'Certains objectent le coût, mais ils ont tort.', answer: 'Certains objectent le coût ; or, les évaluations disponibles concluent à un bilan favorable — à condition de lire les hypothèses.', explanation: 'How the mistake happens: dismissing the objection without evidence. Why it does not work: a straw man is worthless at C1 — both sides carry data. How to fix it: name the objectors\u2019 ground, then weigh with evidence and a condition.' },
            { prompt: 'Sans aucun doute, la politique fonctionnera parfaitement.', answer: 'Sans doute la politique portera-t-elle ses fruits, sous réserve d\u2019une évaluation rigoureuse.', explanation: 'How the mistake happens: stacking certainty (sans aucun doute, parfaitement). Why it does not work: C1 rewards measured claims — absolutes invite the counterexample. How to fix it: sans doute + inversion flourish + sous réserve de.' },
        ],
        writing: {
            task: 'Write an evidence brief (140–180 words) on an invented pilot policy: claim → cited study with the correct certainty verb → one correlation-discipline sentence → the counterargument WITH its evidence → il semblerait que + subjunctive somewhere → measured close (rien ne permet d\u2019affirmer…, mais l\u2019ensemble… plaide pour…).',
            requirements: [
                'Certainty verb matched to evidence strength (no démontrer on weak data)',
                'One il semblerait que + subjunctive',
                'One corrélation/causalité discipline sentence',
                'Counterargument carrying its own evidence',
                'The refusal-to-overclaim close (rien ne permet de…)',
            ],
            minWords: 130,
        },
        checklist: [
            'I match the certainty verb to the evidence (démontrer > indiquer > suggérer > laisser croire)',
            'I hedge with il semblerait que + subjunctive and keep probable + indicative',
            'I state correlations without causes (corrélation n\u2019est pas causalité)',
            'I attribute every claim (selon l\u2019étude, à en croire le rapport)',
            'I give counterarguments their own evidence before weighing',
            'I close measured: rien ne permet d\u2019affirmer…, mais l\u2019ensemble… plaide pour…',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The certainty ladder: DÉMONTRER / PROUVER (established — indicative) · INDIQUER / RÉVÉLER (observed — indicative) · SUGGÉRER (suggestive — indicative or conditional) · LAISSER CROIRE / SOUS-ENTENDRE (you suspect manipulation) · SEMBLER / IL SEMBLERAIT QUE (your hedge — subjunctive).',
            examples: [
                { fr: 'L\u2019étude démontre… · Les données suggèrent… · Le titre laisse croire…', en: 'three rungs, three trusts' },
            ],
        },
        {
            explanation: 'Mood map for hedges: SUBJUNCTIVE — il semblerait que, il est possible/vraisemblable que, bien que; INDICATIVE — il est probable que, il est certain que, il est clair que. Two columns; drill until automatic.',
            examples: [
                { fr: 'Il est possible que ce SOIT tard. · Il est probable que ce EST tard.', en: 'one word apart, two moods' },
            ],
        },
        {
            explanation: 'Correlation kit: un lien est observé · les courbes coïncident · sembler lié à · sans que la causalité soit établie · corrélation n\u2019est pas causalité. State the co-movement, refuse the mechanism until proven.',
            examples: [
                { fr: 'Les deux courbes montent ensemble — sans que l\u2019une tire l\u2019autre.', en: 'the image to reuse' },
            ],
        },
        {
            explanation: 'Critical attribution: à en croire le rapport (suspend judgment) · le titre laisse croire… que le texte ne soutient pas · selon ses auteurs, qui reconnaissent eux-mêmes… · les annexes disent autre chose. Read the fine print out loud.',
            examples: [
                { fr: 'À en croire le communiqué, tout va bien — les chiffres, moins.', en: 'the skeptical one-liner' },
            ],
        },
        {
            explanation: 'Weighing formulas: l\u2019ensemble des données plaide pour… · le rapport coûts-bénéfices penche vers… · au bilan… · à condition de / sous réserve de (the conditional acceptance). The close is where measured lives.',
            examples: [
                { fr: 'Sous réserve d\u2019une évaluation indépendante, le bilan plaide pour la prolongation.', en: 'the conditional verdict' },
            ],
        },
        {
            explanation: 'Evidence vocabulary: les données probantes (evidence — Canadian official style), une étude randomisée, un échantillon (sample), un biais (bias), l\u2019évaluation indépendante, étayer (back up). Name the method, not just the result.',
            examples: [
                { fr: 'L\u2019échantillon reste modeste — un biais de sélection est possible.', en: 'two method words in one sentence' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'démontre': { en: 'demonstrates (present of démontrer)', pron: 'day-mohn-TRUH', type: 'verb', base: { form: 'démontrer', en: 'to demonstrate' }, note: 'strongest certainty verb — established results only.' },
        'suggèrent': { en: 'suggest (present of suggérer — they)', pron: 'süg-ZHAIR', type: 'verb', base: { form: 'suggérer', en: 'to suggest' }, note: 'è appears in nose forms: je suggère, nous suggérons, ils suggèrent.' },
        'semble': { en: 'seems (present of sembler)', pron: 'SAHM-bluh', type: 'verb', base: { form: 'sembler', en: 'to seem' }, note: 'il semble que + subjunctive; il me semble que + indicative (B1 opinion cousin).' },
        'semblerait': { en: 'would seem (conditional of sembler)', pron: 'sahm-bluh-REH', type: 'verb', base: { form: 'sembler', en: 'to seem' }, note: 'il semblerait que + SUBJUNCTIVE — the analyst\u2019s hedge.' },
        'données probantes': { en: 'evidence (official Canadian term)', pron: 'doh-NAY proh-BAHNT', gender: 'feminine', type: 'phrase', register: 'formal', note: 'the official French for "evidence-based" — données probantes.' },
        'corrélation': { en: 'correlation', pron: 'koh-ray-lah-SYOHN', gender: 'feminine', plural: 'corrélations', type: 'noun', register: 'formal', note: 'corrélation n\u2019est pas causalité — memorize the pair.' },
        'causalité': { en: 'causation', pron: 'koh-zah-lee-TAY', gender: 'feminine', type: 'noun', register: 'formal', note: 'établit la causalité = establishes causation — mechanism required.' },
        'à en croire': { en: 'if we are to believe (skeptical attribution)', pron: 'ah ahn KRWAHR', type: 'phrase', register: 'formal', note: 'À en croire le rapport… — suspends judgment with a raised eyebrow.' },
        'étayent': { en: 'back up (present of étayer — they)', pron: 'ay-TAH-yent', type: 'verb', base: { form: 'étayer', en: 'to back up' }, note: 'y → i before mute e: j\u2019étaye, ils étayent. Une thèse bien étayée.' },
        'plaide': { en: 'argues / pleads (present of plaider)', pron: 'PLEHD', type: 'verb', base: { form: 'plaider', en: 'to plead / argue for' }, note: 'plaider POUR = argue in favour of — the verdict verb.' },
        'affirmer': { en: 'to assert / affirm', pron: 'ah-feer-MAY', type: 'verb', register: 'formal', note: 'rien ne permet d\u2019affirmer = nothing allows asserting — the refusal frame.' },
        'sous-entendre': { en: 'to imply / hint at', pron: 'soo-zahn-tahn-DRUH', type: 'verb', register: 'formal', note: 'ce que le texte sous-entend = what it implies between the lines.' },
        'laisse croire': { en: 'implies / lets believe', pron: 'LEHSS KRWAHR', type: 'phrase', register: 'formal', note: 'le titre laisse croire… — exposing an implication you distrust.' },
        'échantillon': { en: 'sample (statistics)', pron: 'ay-shahn-tee-YOHN', gender: 'masculine', plural: 'échantillons', type: 'noun', register: 'formal', note: 'un échantillon de 500 personnes; un échantillon représentatif.' },
        'biais': { en: 'bias', pron: 'BYEH', gender: 'masculine', plural: 'biais (invariable)', type: 'noun', register: 'formal', note: 'un biais de sélection; sans biais. Invariable plural.' },
        'randomisé': { en: 'randomized (masc)', pron: 'rahn-doh-mee-ZAY', type: 'adjective', fem: { word: 'randomisée', en: 'randomized (fem)' }, note: 'une étude randomisée = randomized trial — the gold-standard mention.' },
        'porte ses fruits': { en: 'is bearing fruit', pron: 'port say FrüEE', type: 'expression', note: 'le programme porte ses fruits — evidence idiom; past: a porté ses fruits.' },
        'net': { en: 'clear / sharp (masc)', pron: 'NET', type: 'adjective', fem: { word: 'nette', en: 'clear (fem — t pronounced)' }, note: 'une nette réduction — the evidence-quality adjective.' },
        'sous réserve de': { en: 'subject to / with the reservation of', pron: 'soo ruh-ZAIRV duh', type: 'phrase', register: 'formal', note: 'sous réserve d\u2019évaluation — the conditional acceptance of the close.' },
    },
};

// ── C1 · Fast Speech & Implied Attitude ─────────────────────────────────────
const c1OralImplicite: StaticFrenchLesson = {
    title: 'Fast Speech & Implied Attitude',
    objective: 'Follow real connected speech — elided ne, dropped il, swallowed que — decode the attitude particles (ben, quoi, du coup, histoire de) and the implied stance (irony, resignation, amused annoyance) that C1 listening questions actually test.',

    vocabulary: [
        { fr: 'chais pas', en: 'dunno (ne sais pas, spoken)', pron: 'sheh PAH', type: 'expression', register: 'informal', example: { fr: 'On y va ? — Chais pas, on verra.', en: 'Are we going? — Dunno, we\u2019ll see.' }, related: [{ fr: 'je ne sais pas', en: 'I don\u2019t know (full form)' }] },
        { fr: 'y\u2019a', en: 'there\u2019s (il y a, spoken)', pron: 'YAH', type: 'expression', register: 'informal', example: { fr: 'Y\u2019a personne à la maison.', en: 'There\u2019s nobody home.' }, related: [{ fr: 'il y a', en: 'there is (full form)' }] },
        { fr: 'du coup', en: 'so / as a result (spoken donc)', pron: 'dü KOO', type: 'expression', register: 'informal', example: { fr: 'J\u2019ai raté le train, du coup j\u2019ai marche.', en: 'I missed the train, so I walked.' }, related: [{ fr: 'alors', en: 'so (neutral)' }] },
        { fr: 'genre', en: 'like / kind of (filler)', pron: 'zhahnr', type: 'expression', register: 'informal', example: { fr: 'Il était genre super fatigué.', en: 'He was like super tired.' }, related: [{ fr: 'notamment', en: 'notably (formal twin)' }] },
        { fr: 'histoire de', en: 'just to / so as to (casual purpose)', pron: 'ees-TWAHR duh', type: 'expression', register: 'informal', example: { fr: 'Je passe demain, histoire de voir comment ça va.', en: 'I\u2019ll drop by tomorrow, just to see how things are.' }, related: [{ fr: 'pour que', en: 'so that (neutral)' }] },
        { fr: 'c\u2019est dire si', en: 'that says a lot about how (emphasis)', pron: 'seh DEER see', type: 'phrase', register: 'neutral', example: { fr: 'C\u2019est dire si la situation est tendue.', en: 'That says how tense the situation is.' }, related: [{ fr: 'cela en dit long', en: 'that says a lot' }] },
        { fr: 'faut qu\u2019j\u2019y aille', en: 'gotta go (il faut que j\u2019y aille)', pron: 'foh kuh zhy EYE', type: 'expression', register: 'informal', example: { fr: 'Allez, faut qu\u2019j\u2019y aille !', en: 'Right, gotta go!' }, related: [{ fr: 'il faut que je parte', en: 'I have to leave (full form)' }] },
        { fr: 'ben oui / ben non', en: 'well yes / well no (attitude stamps)', pron: 'bahn NWEe / bahn NOHN', type: 'expression', register: 'informal', example: { fr: 'Tu viens ? — Ben oui, c\u2019est prévu !', en: 'You coming? — Well yeah, it\u2019s planned!' }, related: [{ fr: 'eh oui', en: 'indeed' }] },
        { fr: 'enfin, dit-on', en: 'or so they say (distance marker)', pron: 'ahn-FAN dee-TOHN', type: 'phrase', register: 'formal', example: { fr: 'Le projet est « sur la bonne voie », enfin, dit-on.', en: 'The project is "on track", or so they say.' }, related: [{ fr: 'paraît-il', en: 'it would appear (rumour tag)' }] },
        { fr: 'paraît-il', en: 'it would appear / allegedly', pron: 'pah-reh-TEEL', type: 'expression', register: 'formal', example: { fr: 'Il démissionnerait, paraît-il.', en: 'He\u2019s resigning, allegedly.' }, related: [{ fr: 'il paraît que', en: 'it appears that' }] },
        { fr: 'tout ça pour dire que', en: 'all this to say that (circling back)', pron: 'too sah poor DEER kuh', type: 'phrase', register: 'informal', example: { fr: 'Bref, tout ça pour dire que je serai en retard.', en: 'Anyway, all this to say I\u2019ll be late.' }, related: [{ fr: 'en somme', en: 'in short (essay twin)' }] },
        { fr: 'c\u2019est pas faux', en: 'can\u2019t argue with that (understated agreement)', pron: 'seh pah FOH', type: 'expression', register: 'informal', example: { fr: '— Il a raison sur le fond. — C\u2019est pas faux.', en: '— He\u2019s right on the substance. — Can\u2019t argue with that.' }, related: [{ fr: 'pas faux (Kaamelott legacy)', en: 'the modern agreement stamp' }] },
    ],

    pronunciation: [
        { fr: 'chais pas', approx: 'sheh PAH', en: 'je ne sais pas → three syllables → two: "sh\u2019eh-s-pah" → "shay-pah"' },
        { fr: 'y\u2019a pas', approx: 'yah PAH', en: 'il y a pas → "yah-PAH" — the il vanishes' },
        { fr: 'faut qu\u2019j\u2019y aille', approx: 'foh kuh zhy EYE', en: 'three elisions in four words — the entire sentence shrinks' },
        { fr: 'ben oui', approx: 'bahn NWEe', en: 'ben = nasal "bahn", NOT the English Ben' },
        { fr: 'paraît-il', approx: 'pah-reh-TEEL', en: 'inversion tag pronounced with a rising tail' },
        { fr: 'c\u2019est pas faux', approx: 'seh pah FOH', en: 'the ne is gone; faux carries the whole meaning' },
    ],

    grammar: {
        rule: 'Connected speech deletes the weak links: ne (je sais pas), il (y\u2019a), tu→t\u2019 (t\u2019as), que→qu\u2019, il faut que→faut qu\u2019. Attitude particles (ben, quoi, du coup, genre, histoire de) stamp the speaker\u2019s stance on top of the literal words — the meaning lives in the stamp, not the sentence.',
        explanation: 'Spoken French runs an economy of deletion: the ne of negation vanishes first (je sais pas, c\u2019est pas faux), then il (y\u2019a du monde, faut qu\u2019j\u2019y aille), then tu glides to t\u2019 before a vowel (t\u2019as vu ?), and je+de+le collapse (j\u2019ai, au, du). None of this is sloppiness — it is the living phonology, and the C1 listening exam plays it at full speed. On top of the deletions, particles carry attitude: ben (well — hesitation or pushback), quoi (sentence-final "you know"), du coup (consequence, slightly teenager), genre (likeness, vagueness), histoire de (just to, minimization), enfin (self-correction or resignation), dit-on / paraît-il (rumour distance). Implied stance: the negated positive from C1:idiomes (c\u2019est pas faux = I agree), the ironic super (super, encore du travail), the resigned enfin (on verra, enfin…), the pointed repetition (il a "oublié", he "forgot" — quotes in the voice). The exam\u2019s "quelle est l\u2019attitude du locuteur ?" is answered by collecting particles and deletions, not by translating words.',
        examples: [
            { fr: '— Tu viens ? — Chais pas, j\u2019ai du taf, et puis y\u2019a la pluie.', en: '— Coming? — Dunno, got work, plus there\u2019s the rain.', breakdown: ['chais pas = je ne sais pas compressed', 'du taf = casual work', 'y\u2019a = il y a minus il'] },
            { fr: 'Faut qu\u2019j\u2019y aille — les enfants, tu sais comment c\u2019est.', en: 'Gotta go — the kids, you know how it is.', breakdown: ['faut qu\u2019 = il faut que stripped', 'j\u2019y aille = subjunctive survives the collapse', 'tu sais comment c\u2019est = shrug phrase'] },
            { fr: 'Il a encore "oublié" son tour de cuisine, histoire de nous tester.', en: 'He "forgot" his cooking turn again — just to test us.', breakdown: ['voice-quotes = irony on oublié', 'histoire de = minimising the intent', 'the speaker\u2019s annoyance is the message'] },
            { fr: 'C\u2019est dire si le dossier traîne : trois mois pour une signature.', en: 'That says a lot about how the file drags: three months for one signature.', breakdown: ['c\u2019est dire si = emphatic measurement', 'traîner = drag (file idiom)', 'the figure completes the complaint'] },
            { fr: 'Le maire serait candidat, paraît-il ; enfin, c\u2019est ce qu\u2019on dit en coulisse.', en: 'The mayor is allegedly running, so they say; well, that\u2019s what\u2019s going around backstage.', breakdown: ['serait = conditional of hearsay', 'paraît-il = rumour tag', 'en coulisse = backstage (political idiom)'] },
            { fr: '— On annule ? — Ben non ! On a tout préparé, quoi.', en: '— Are we cancelling? — Well no! We\u2019ve prepped everything, you know.', breakdown: ['ben non = pushback, not just "no"', 'quoi = sentence-final "you know"', 'attitude lives in the stamps'] },
        ],
        commonMistakes: [
            'Writing the spoken forms: chais pas, y\u2019a, t\u2019as in an exam text — the written task expects full forms. Know both, choose by channel.',
            'Hearing ben as the name Ben: it is the compressed bien and signals stance (ben oui = obviously, ben non = obviously not, ben voyons = yeah right).',
            'Missing the subjunctive under the rubble: faut qu\u2019j\u2019y AILLE keeps the subjunctive even when il and que disappear — the deletion strips words, not grammar.',
            'Reading paraît-il / dit-on as confirmation: they are DISTANCE tags — the speaker refuses to vouch for the claim (C1 attitude answer: scepticism).',
        ],
    },

    transformations: [
        { type: 'Full form', fr: 'Je ne sais pas si il y aura du monde.', en: 'I don\u2019t know whether there\u2019ll be people.' },
        { type: 'Spoken', fr: 'Chais pas s\u2019y\u2019aura du monde.', en: 'Dunno if there\u2019ll be anyone.' },
        { type: 'Full form', fr: 'Il faut que j\u2019y aille maintenant.', en: 'I have to go now.' },
        { type: 'Spoken', fr: 'Faut qu\u2019j\u2019y aille !', en: 'Gotta go!' },
        { type: 'Neutral', fr: 'C\u2019est remarquable.', en: 'That\u2019s remarkable.' },
        { type: 'Implied', fr: 'C\u2019est dire si c\u2019est remarquable.', en: 'That says how remarkable it is.' },
        { type: 'Direct claim', fr: 'Il démissionne.', en: 'He\u2019s resigning.' },
        { type: 'Distanced', fr: 'Il démissionnerait, paraît-il.', en: 'He\u2019s allegedly resigning, so they say.' },
    ],

    sentenceBuilding: [
        { fr: 'Bon. Alors, en fait, il se passe un truc.', en: 'Right. So, actually, something\u2019s going on.' },
        { fr: 'Alors, en fait, y\u2019a un truc : la salle qu\u2019on avait réservée est doublée.', en: 'So, actually, here\u2019s the thing: the room we booked is double-booked.' },
        { fr: 'Et le pire, c\u2019est que personne n\u2019a prévenu — enfin, personne de la logistique, quoi.', en: 'And the worst is nobody warned us — well, nobody from logistics, you know.' },
        { fr: 'Du coup, faut qu\u2019on reprogramme, histoire de garder le même conférencier.', en: 'So we\u2019ve got to rebook, just to keep the same speaker.' },
        { fr: 'Enfin, tout ça pour dire que le compte rendu attendra lundi — c\u2019est déjà ça, non ?', en: 'Well, all this to say the minutes will wait till Monday — that\u2019s something, right?' },
    ],

    practice: [
        { instruction: 'Decode the deletion:', question: 'Chais pas s\u2019y\u2019aura du monde.', answer: 'Je ne sais pas s\u2019il y aura du monde — three elisions in seven syllables' },
        { instruction: 'Attitude stamp:', question: '— On annule ? — Ben non !', answer: 'Pushback: obviously not — ben signals stance, not hesitation here' },
        { instruction: 'Attitude stamp:', question: 'Il a encore "oublié" son tour.', answer: 'Irony via voice-quotes — he didn\u2019t forget; the speaker implies intent' },
        { instruction: 'Distance tag:', question: 'Il démissionnerait, paraît-il.', answer: 'Scepticism — conditional + tag = hearsay the speaker won\u2019t vouch for' },
        { instruction: 'Subjunctive check:', question: 'Faut qu\u2019j\u2019y aille — which mood and why?', answer: 'Subjunctive (aille) — il faut que still governs under the elisions' },
        { instruction: 'Register audit:', question: 'Write y\u2019a pas de souci in an email.', answer: 'Il n\u2019y a aucun problème / aucun souci — full forms in writing' },
    ],

    translationPractice: [
        { en: 'Dunno, gotta go — the kids, you know how it is. (spoken)', fr: 'Chais pas, faut qu\u2019j\u2019y aille — les enfants, tu sais comment c\u2019est.' },
        { en: 'There\u2019s nobody home, so I left a note. (spoken)', fr: 'Y\u2019a personne à la maison, du coup j\u2019ai laissé un mot.' },
        { en: 'That says a lot about how tense things are.', fr: 'C\u2019est dire si les choses sont tendues.' },
        { en: 'He\u2019s allegedly resigning, so they say.', fr: 'Il démissionnerait, paraît-il.' },
        { en: 'Anyway, all this to say I\u2019ll be late.', fr: 'Enfin, tout ça pour dire que j\u2019aurai du retard.' },
        { en: '— Can\u2019t argue with that. (understated agreement)', fr: '— C\u2019est pas faux.' },
    ],

    reverseTranslation: [
        { fr: 'Ben voyons — et moi, je serais Napoléon.', en: 'Yeah right — and I\u2019m Napoleon.' },
        { fr: 'Histoire de détendre l\u2019atmosphère, il a sorti sa blague habituelle.', en: 'Just to lighten the mood, he brought out his usual joke.' },
        { fr: 'Enfin, dit-on que le budget serait en baisse.', en: 'Well, or so they say, the budget would be shrinking.' },
        { fr: 'Tu as vu ? Y\u2019a du monde ce soir !', en: 'You seen it? There\u2019s a crowd tonight!' },
    ],

    register: {
        informal: 'Chais pas, c\u2019est genre un peu long, mais bon, du coup on verra, quoi. (the full casual stack — five stamps in one breath)',
        neutral: 'Je ne sais pas encore ; je vous dis ça demain.',
        formal: 'Il semblerait — les rumeurs vont bon train — qu\u2019une candidature soit à l\u2019étude, sans que la direction l\u2019ait confirmée.',
    },

    culture: 'This lecture is the key to French radio and streaming: France Inter\u2019s chroniqueurs, Kaamelott\u2019s c\u2019est pas faux (now a national agreement stamp), and every podcast interview run at native elision speed. Quebec adds its own layer — pantoute (not at all), check (like), fait que (du coup) — which the TCF Canada listening loves in dialogues. The rule of thumb: the faster and more casual the speech, the more the attitude lives in the particles and the less in the vocabulary.',

    freeProduction: 'Record a 90-second voice note retelling a minor annoyance exactly as you would tell a friend: use at least four spoken forms (chais pas, y\u2019a, faut qu\u2019, t\u2019as), three attitude particles (du coup, quoi, histoire de), one irony (voice-quotes), and one distance tag (paraît-il / dit-on). Then transcribe it in FULL written forms and compare — the gap between the two is your spoken-written control.',

    miniTest: [
        { question: 'Chais pas is the spoken form of:', options: ['je sais', 'je ne sais pas', 'chez moi', 'choisir'], answer: 'je ne sais pas — ne and the syllables of sais compress' },
        { question: 'Faut qu\u2019j\u2019y aille keeps which mood?', options: ['indicative', 'subjunctive', 'conditional', 'imperative'], answer: 'subjunctive — elision strips words, not grammar' },
        { question: 'Paraît-il signals:', options: ['certainty', 'rumour distance', 'anger', 'a question'], answer: 'rumour distance — the speaker won\u2019t vouch for it' },
        { question: 'Ben non usually means:', options: ['maybe not', 'obviously not (pushback)', 'polite refusal', 'I forgot'], answer: 'obviously not (pushback) — the stance stamp' },
        { question: 'C\u2019est pas faux expresses:', options: ['confusion', 'understated agreement', 'disagreement', 'a typo'], answer: 'understated agreement — negated positive pointing positive' },
    ],

    review: [
        'The negated positives and irony from C1:idiomes are the semantic engine — this lecture adds their sound (elision) and their stamps (ben, quoi).',
        'The subjunctive from B2:subjonctif survives every elision: faut qu\u2019j\u2019y aille — the grammar is stronger than the pronunciation.',
    ],

    traps: [
        'Spoken forms are for speech only: chais pas / y\u2019a / t\u2019as on a written exam cost register marks. Master both channels and switch deliberately.',
        'The subjunctive hides under the rubble: faut qu\u2019j\u2019y aille, faut qu\u2019on parte — the que-vanishing does not switch on the indicative.',
        'Voice-quotes = irony: a repeated word said flat (il a "oublié", une "réunion") signals the opposite — C1 attitude questions hinge on hearing the quotes.',
        'Conditional of hearsay: il démissionnerait / le budget serait en baisse — the conditional alone turns news into rumour. Do not report it as fact.',
    ],

    homework: {
        intro: 'Decode fast speech, then stamp the attitude: elisions first, particles second, stance third.',
        translation: [
            { prompt: 'Dunno if there\u2019ll be anyone. (spoken)', answer: 'Chais pas s\u2019y\u2019aura du monde.', explanation: 'Triple elision: je ne sais → chais; si il → s\u2019y\u2019; il y a → y\u2019a. Written twin: je ne sais pas s\u2019il y aura du monde.' },
            { prompt: 'Gotta go — the kids, you know how it is.', answer: 'Faut qu\u2019j\u2019y aille — les enfants, tu sais comment c\u2019est.', explanation: 'il faut que → faut qu\u2019; the subjunctive aille survives. tu sais comment c\u2019est = the shrug phrase.' },
            { prompt: 'There\u2019s nobody home, so I left a note. (spoken)', answer: 'Y\u2019a personne à la maison, du coup j\u2019ai laissé un mot.', explanation: 'y\u2019a = il y a minus il; du coup = the spoken donc; PC for the finished act.' },
            { prompt: 'That says a lot about how tense things are.', answer: 'C\u2019est dire si les choses sont tendues.', explanation: 'c\u2019est dire si + clause = emphatic measurement — the formal-speakable emphasis frame.' },
            { prompt: 'He\u2019s allegedly resigning, so they say.', answer: 'Il démissionnerait, paraît-il.', explanation: 'conditional of hearsay + tag: the speaker distances from the claim entirely.' },
            { prompt: 'Can\u2019t argue with that. (understated agreement)', answer: 'C\u2019est pas faux.', explanation: 'negated positive = agreement; the ne dropped marks speech. Written: ce n\u2019est pas faux.' },
        ],
        blanks: [
            { prompt: '______ pas, j\u2019ai du taf ce soir. (spoken: dunno)', answer: 'Chais', explanation: 'je ne sais pas → chais pas. Three syllables become two.' },
            { prompt: '______ du monde à la réunion ? (spoken: is there)', answer: 'Y\u2019a', explanation: 'il y a → y\u2019a; the il vanishes first in fast speech.' },
            { prompt: 'Faut qu\u2019j\u2019______ ! (spoken: gotta go)', answer: 'aille', explanation: 'The subjunctive of aller survives every elision: faut qu\u2019j\u2019y aille.' },
            { prompt: 'Il ______ candidat, paraît-il. (hearsay conditional)', answer: 'serait', explanation: 'The conditional alone = hearsay; paraît-il doubles the distance.' },
            { prompt: 'C\u2019est ______ si le dossier traîne : trois mois !', answer: 'dire', explanation: 'c\u2019est dire si = that says a lot about how — the emphatic frame.' },
            { prompt: 'J\u2019ai repris le dossier, ______ de te simplifier la vie. (casual purpose)', answer: 'histoire', explanation: 'histoire de + infinitive = just to — minimising the purpose, casual register.' },
        ],
        corrections: [
            { prompt: 'Je vous écris pour dire que chais pas si je viens demain.', answer: 'Je vous écris pour vous dire que je ne sais pas encore si je viendrai demain.', explanation: 'How the mistake happens: spoken forms in writing. Why it does not work: chais pas in an email reads as careless. How to fix it: full forms + future for a decision pending (je viendrai).' },
            { prompt: 'Il faut que je vais au marché.', answer: 'Il faut que j\u2019aille au marché. (spoken: faut qu\u2019j\u2019aille)', explanation: 'How the mistake happens: keeping the indicative under faut que. Why it does not work: il faut que + subjunctive, elisions or not. How to fix it: j\u2019aille.' },
            { prompt: 'Le PDG démissionne, paraît-il — je le confirme.', answer: 'Le PDG démissionnerait, paraît-il — la direction n\u2019a rien confirmé.', explanation: 'How the mistake happens: tagging hearsay then vouching for it. Why it does not work: paraît-il + je le confirme contradict — the tag already suspends judgment. How to fix it: keep the conditional and the distance.' },
            { prompt: 'Il a "oublié" son tour — c\u2019était vraiment un oubli.', answer: 'Il a "oublié" son tour — c\u2019était sûrement exprès.', explanation: 'How the mistake happens: irony marks then a literal reading. Why it does not work: the voice-quotes signal the opposite of oubli. How to fix it: commit to the implication (exprès = on purpose).' },
            { prompt: 'Y\u2019a un problème dans le rapport que vous avez signé hier, Monsieur le Directeur.', answer: 'Il y a un problème dans le rapport que vous avez signé hier, Monsieur le Directeur.', explanation: 'How the mistake happens: casual y\u2019a in a formal address. Why it does not work: Monsieur le Directeur sets soutenu register. How to fix it: il y a — the full form costs one syllable and saves the relationship.' },
        ],
        writing: {
            task: 'Write the same incident twice (about 8 lines each): (1) a voice-note transcript to a friend using at least four elisions, three particles and one irony; (2) an email to your manager in full written forms making the identical request. Then list the five pairs of forms you switched — that table is your spoken-written control.',
            requirements: [
                'Version 1: ≥4 spoken forms (chais pas, y\u2019a, faut qu\u2019, t\u2019as…) + ≥3 particles',
                'Version 1: one irony or distance tag',
                'Version 2: zero spoken forms, full negation and il y a',
                'Both versions contain the same facts and request',
                'A five-row switch table (spoken form → written form)',
            ],
            minWords: 110,
        },
        checklist: [
            'I decode the big elisions on contact: chais pas, y\u2019a, t\u2019as, faut qu\u2019, s\u2019y\u2019aura',
            'I hear the subjunctive under the rubble (faut qu\u2019j\u2019aille)',
            'I read attitude from particles: ben (pushback), quoi (you know), du coup (consequence), histoire de (minimising)',
            'I treat paraît-il / dit-on / conditional as distance, not confirmation',
            'I hear voice-quotes as irony and commit to the implied meaning',
            'I keep spoken forms out of writing — full forms on the exam',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The deletion ladder (strongest first): ne drops (c\u2019est pas faux) → il drops (y\u2019a, faut qu\u2019) → tu → t\u2019 (t\u2019as vu ?) → que glues (s\u2019y\u2019aura = si il y aura) → je+de collapse (j\u2019ai, j\u2019y). Understand all five to follow radio-speed French.',
            examples: [
                { fr: 'c\u2019est pas faux · y\u2019a du monde · t\u2019as vu ? · s\u2019y\u2019aura du monde ?', en: 'the ladder in action' },
            ],
        },
        {
            explanation: 'Particle meanings: BEN = well/obviously (ben oui, ben non, ben voyons) · QUOI = you know (sentence-final) · DU COUP = so/then · GENRE = like/kind of · HISTOIRE DE = just to · ENFIN = well/resigned self-correction.',
            examples: [
                { fr: 'Ben non ! · On part, quoi. · Du coup, on reste. · Histoire de rire.', en: 'five stamps, five stances' },
            ],
        },
        {
            explanation: 'Distance tags: paraît-il · dit-on · soi-disant (allegedly — sceptical!) · il paraît que · le conditionnel de l\u2019information (il démissionnerait). Any one of them means: the speaker does NOT vouch.',
            examples: [
                { fr: 'Soi-disant malade, il serait au golf. = Allegedly sick, he\u2019d be at golf.', en: 'double distance in one sentence' },
            ],
        },
        {
            explanation: 'Implied attitude kit: voice-quotes (il a "oublié") = irony · negated positives (c\u2019est pas faux = I agree) · the sigh + enfin = resignation · pointed repetition (encore !) = annoyance · super/génial after bad news = sarcasm.',
            examples: [
                { fr: 'Encore une réunion, super. — enfin, on est habitués.', en: 'three stances in two clauses' },
            ],
        },
        {
            explanation: 'The written-side twins: chais pas → je ne sais pas · y\u2019a → il y a · t\u2019as → tu as · faut qu\u2019j\u2019y aille → il faut que j\u2019y aille · pas de souci → aucun problème. The exam grades the right channel, not the fanciest words.',
            examples: [
                { fr: 'Il n\u2019y a aucun problème. (email) · Y\u2019a pas de souci. (texto)', en: 'same message, two channels' },
            ],
        },
        {
            explanation: 'Quebec listening boosts: fait que = du coup · pantoute = pas du tout · check = like · c\u2019est correct = c\u2019est bon. Recognize them in TCF Canada dialogues; never use them in formal answers.',
            examples: [
                { fr: 'Fait que, check, on s\u2019en va. = So, like, we\u2019re leaving.', en: 'the Quebec casual stack' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'chais pas': { en: 'dunno (je ne sais pas, spoken)', pron: 'sheh PAH', type: 'expression', register: 'informal', note: 'ne gone, syllables compressed. Writing: je ne sais pas.' },
        'y\u2019a': { en: 'there\u2019s (il y a, spoken)', pron: 'YAH', type: 'expression', register: 'informal', note: 'the il vanishes; y\u2019a pas = there isn\u2019t. Writing: il y a.' },
        'du coup': { en: 'so / as a result (spoken)', pron: 'dü KOO', type: 'expression', register: 'informal', note: 'the teenager donc; formal twin: par conséquent.' },
        'genre': { en: 'like / kind of (filler)', pron: 'ZHAHN-ruh', type: 'expression', register: 'informal', note: 'vagueness marker; formal twins: notamment, environ.' },
        'histoire de': { en: 'just to (casual purpose)', pron: 'ees-TWAHR duh', type: 'expression', register: 'informal', note: 'histoire de + infinitive — minimises the goal. Neutral: pour.' },
        'c\u2019est dire si': { en: 'that says a lot about how', pron: 'seh DEER see', type: 'phrase', note: 'emphatic measurement: c\u2019est dire si c\u2019est grave.' },
        'paraît-il': { en: 'allegedly / it would appear', pron: 'pah-reh-TEEL', type: 'expression', register: 'formal', note: 'rumour tag — the speaker refuses to vouch. Twin: dit-on.' },
        'soi-disant': { en: 'self-styled / allegedly (sceptical)', pron: 'swah-dee-ZAHN', type: 'adverb', note: 'invariable; soi-disant malade = "sick", wink wink.' },
        'ben': { en: 'well (stance stamp)', pron: 'BAHN', type: 'expression', register: 'informal', note: 'compressed bien: ben oui (obviously), ben non (obviously not), ben voyons (yeah right).' },
        'quoi': { en: 'you know (sentence-final stamp)', pron: 'KWAH', type: 'expression', register: 'informal', note: 'closes a turn: on part, quoi. Not a question word here.' },
        'enfin': { en: 'well / finally / resignation stamp', pron: 'ahn-FAN', type: 'adverb', note: 'self-correction or resigned sigh: enfin, on verra.' },
        'traîner': { en: 'to drag / linger', pron: 'treh-NAY', type: 'verb', note: 'le dossier traîne = the file drags; traîner dans les parages = hang around.' },
        'coulisse': { en: 'backstage / wings', pron: 'koo-LEESS', gender: 'feminine', plural: 'coulisses', type: 'noun', note: 'en coulisses = backstage; les coulisses du pouvoir = political backrooms.' },
        'c\u2019est pas faux': { en: 'can\u2019t argue with that', pron: 'seh pah FOH', type: 'expression', register: 'informal', note: 'negated positive = agreement; Kaamelott made it a national stamp.' },
        'démissionnerait': { en: 'would resign (hearsay conditional)', pron: 'day-mee-syoh-nuh-REH', type: 'verb', base: { form: 'démissionner', en: 'to resign' }, note: 'conditional of hearsay: reported as rumour, not fact.' },
        'exprès': { en: 'on purpose', pron: 'ehks-PRESS', type: 'adverb', note: 'c\u2019était exprès = it was on purpose; invariable, no accent change (exprès).' },
        'pantoute': { en: 'not at all (Quebec)', pron: 'pahn-TOOT', type: 'expression', register: 'informal', note: 'Quebec pas du tout; France: pas du tout.' },
        'fait que': { en: 'so (Quebec du coup)', pron: 'FEH kuh', type: 'expression', register: 'informal', note: 'short for ça fait que; the Quebec consequence filler.' },
        'blague': { en: 'joke', pron: 'blahg', gender: 'feminine', plural: 'blagues', type: 'noun', note: 'raconter des blagues; c\u2019est une blague ! = you\u2019re kidding!' },
        'compte rendu': { en: 'minutes / report (of a meeting)', pron: 'kohnt rahn-DÜ', gender: 'masculine', plural: 'comptes rendus', type: 'noun', register: 'formal', note: 'le compte rendu de réunion; rédiger un compte rendu.' },
        'logistique': { en: 'logistics (team or function)', pron: 'loh-zhees-TEEK', gender: 'feminine', type: 'noun', note: 'la logistique = the team; adjective also logistic.' },
        'conférencier': { en: 'speaker / lecturer', pron: 'kohn-feh-rahn-SYAY', gender: 'masculine', plural: 'conférenciers', type: 'noun', fem: { word: 'conférencière', en: 'speaker (fem)' }, note: 'garder le même conférencier — event vocabulary.' },
    },
};

export const STATIC_C1_PART2: Record<string, StaticFrenchLesson> = {
    'C1:argumentation-avancee': c1ArgumentationAvancee,
    'C1:oral-implicite': c1OralImplicite,
};
