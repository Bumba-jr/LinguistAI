// C2 lectures part 1 — Stylistic Nuance, Literary & Journalistic French,
// Francophone Variation & Context. Same gold-standard format: full lesson +
// traps + homework (A–E) + checklistRemedial + glossary. Extras in frenchLessonExtras.ts.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── C2 · Stylistic Nuance ───────────────────────────────────────────────────
const c2Style: StaticFrenchLesson = {
    title: 'Stylistic Nuance',
    objective: 'Command the fine grain of French — intensity ladders (un peu → passablement → extrêmement), verb-precision scales (dire → affirmer → soutient → prétend), placement that changes meaning (seulement vs ne…que), and the modulation formulas (pour ainsi dire, si l\u2019on veut) that let you say exactly what you mean.',

    vocabulary: [
        { fr: 'quasiment', en: 'virtually / all but (stronger than presque)', pron: 'kwah-zeem-AHN', type: 'adverb', register: 'formal', example: { fr: 'Le projet est quasiment terminé.', en: 'The project is all but finished.' }, related: [{ fr: 'presque', en: 'almost (lighter)' }] },
        { fr: 'désormais', en: 'from now on (formal for maintenant)', pron: 'day-zor-MEH', type: 'adverb', register: 'formal', example: { fr: 'Désormais, les demandes se font en ligne.', en: 'From now on, requests are made online.' }, related: [{ fr: 'à compter de ce jour', en: 'as of this day (administrative)' }] },
        { fr: 'passablement', en: 'passably / quite a bit', pron: 'pah-sah-blah-MAHN', type: 'adverb', register: 'neutral', example: { fr: 'Il est passablement fatigué.', en: 'He\u2019s quite tired (more than assez).' }, related: [{ fr: 'assez', en: 'quite' }] },
        { fr: 'dès lors', en: 'from then on (consequence)', pron: 'deh LOR', type: 'phrase', register: 'formal', example: { fr: 'Dès lors, plus rien ne fut pareil.', en: 'From then on, nothing was the same.' }, related: [{ fr: 'à partir de là', en: 'from there on' }] },
        { fr: 'pour ainsi dire', en: 'so to speak', pron: 'poor ahn-SEE deer', type: 'phrase', register: 'formal', example: { fr: 'Il a, pour ainsi dire, tout recommencé.', en: 'He has, so to speak, started over completely.' }, related: [{ fr: 'si l\u2019on veut', en: 'if you like' }] },
        { fr: 'prétendre que', en: 'to claim (that) — with doubt', pron: 'pray-tahn-druh kuh', type: 'verb', register: 'formal', example: { fr: 'Il prétend qu\u2019il n\u2019était pas là.', en: 'He claims he wasn\u2019t there (you doubt it).' }, related: [{ fr: 'affirmer que', en: 'to state firmly (no doubt)' }] },
        { fr: 'seulement', en: 'only (position changes the target)', pron: 'suhl-mahn', type: 'adverb', register: 'neutral', example: { fr: 'Seulement deux places restaient. / Il a seulement hésité.', en: 'Only two seats were left. / He only hesitated (didn\u2019t refuse).' }, related: [{ fr: 'ne…que', en: 'only (literary wrap)' }] },
        { fr: 'tout au plus', en: 'at most', pron: 'too oh PLÜ', type: 'phrase', register: 'formal', example: { fr: 'Cela prendra tout au plus une heure.', en: 'That will take an hour at most.' }, related: [{ fr: 'au minimum', en: 'at least (opposite)' }] },
        { fr: 'à vrai dire', en: 'to tell the truth', pron: 'ah vreh DEER', type: 'phrase', register: 'formal', example: { fr: 'À vrai dire, je n\u2019y avais pas pensé.', en: 'To tell the truth, I hadn\u2019t thought of it.' }, related: [{ fr: 'en toute franchise', en: 'in all frankness' }] },
        { fr: 'un tantinet', en: 'a tiny bit (playful)', pron: 'uhn tahn-tee-NEH', type: 'adverb', register: 'informal', example: { fr: 'Il était un tantinet vexé.', en: 'He was a tiny bit miffed.' }, related: [{ fr: 'légèrement', en: 'slightly (neutral)' }] },
        { fr: 'il n\u2019empêche que', en: 'that said / still', pron: 'eel nahm-PESH kuh', type: 'phrase', register: 'neutral', example: { fr: 'Il n\u2019empêche que le délai a doublé.', en: 'That said, the delay has doubled.' }, related: [{ fr: 'cela étant', en: 'that being so' }] },
        { fr: 'véridique', en: 'truthful / accurate (formal)', pron: 'vay-ree-DEEK', type: 'adjective', register: 'formal', example: { fr: 'Ce témoignage est-il véridique ?', en: 'Is this testimony truthful?' }, related: [{ fr: 'authentique', en: 'authentic' }] },
    ],

    pronunciation: [
        { fr: 'quasiment', approx: 'kwah-zeem-AHN', en: 'the s sounds as z: "kwa-zeem"' },
        { fr: 'désormais', approx: 'day-zor-MEH', en: 'final -mais is a nasal? No: "meh" — the s is silent' },
        { fr: 'passablement', approx: 'pah-sah-blah-MAHN', en: 'double s keeps it crisp: "pah-sah"' },
        { fr: 'dès lors', approx: 'deh LOR', en: 'the grave accent shortens dès: "deh"' },
        { fr: 'un tantinet', approx: 'uhn tahn-tee-NEH', en: 'stress runs to the final syllable' },
        { fr: 'il n\u2019empêche', approx: 'eel nam-PESH', en: 'n\u2019 glues to empêche: "nam-PESH"' },
    ],

    grammar: {
        rule: 'C2 style = choosing the exact rung on three ladders at once: intensity (un peu → passablement → extrêmement), assertion (dire → affirmer → prétendre → laissent croire), and probability (peut-être → vraisemblablement → sans doute). Placement and modulation formulas then fine-tune the meaning.',
        explanation: 'At C2 the examiner hears which word you chose, not just that you spoke. The intensity ladder: un peu (a bit) → assez (quite) → passablement (quite a lot — Quebec-favoured) → très (very) → extrêmement / parfaitement (utterly). The assertion ladder: dire (neutral) → affirmer (assert, confident) → soutenir (maintain under challenge) → prétendre (claim with doubt) → laisser croire (imply — you suspect spin). The probability ladder: peut-être (maybe) → vraisemblablement (probably, formal) → sans doute (probably — beware!) → assurément (assuredly). Placement flips targets: Seulement deux places restent (only TWO — the scarcity) vs Il a seulement hésité (he ONLY hesitated — no refusal); ne…que does the same in writing (il ne fait que hésiter). Modulation formulas let you calibrate: pour ainsi dire (so to speak), si l\u2019on veut (if you like), disons (let\u2019s say), à vrai dire (truth be told), il n\u2019empêche que (that said). Each carries an attitude — disons concedes, à vrai dire confesses, il n\u2019empêche que stands firm.',
        examples: [
            { fr: 'Le dossier est quasiment réglé — tout au plus un détail reste-t-il.', en: 'The file is all but settled — at most one detail remains.', breakdown: ['quasiment = stronger than presque', 'tout au plus = at most', 'the inversion reste-t-il = written flourish'] },
            { fr: 'Il affirme l\u2019avoir vu ; elle prétend le contraire — deux certitudes, un seul fait.', en: 'He asserts he saw it; she claims the opposite — two certainties, one fact.', breakdown: ['affirmer vs prétendre = two trust levels', 'avoir vu = past infinitive', 'the aphorism lands the nuance'] },
            { fr: 'Il ne fait qu\u2019hésiter : seulement deux secondes, mais on les voit.', en: 'He only hesitates: just two seconds, but they show.', breakdown: ['ne…que = literary only', 'seulement + deux secondes = counting', 'the same limit, two angles'] },
            { fr: 'Désormais, tout passe par la plateforme ; dès lors, chaque clic laisse une trace.', en: 'From now on, everything goes through the platform; from then on, every click leaves a trace.', breakdown: ['désormais = forward-looking rule', 'dès lors = consequence in the narrative', 'two time markers, two jobs'] },
            { fr: 'C\u2019est, pour ainsi dire, le même problème — en tout cas, sa cousine germaine.', en: 'It is, so to speak, the same problem — in any case, its first cousin.', breakdown: ['pour ainsi dire = softens the claim', 'en tout cas = in any case', 'the joke stays formal'] },
            { fr: 'À vrai dire, la mesure était passablement impopulaire ; il n\u2019empêche qu\u2019elle a fonctionné.', en: 'Truth be told, the measure was quite unpopular; that said, it worked.', breakdown: ['à vrai dire = confession frame', 'passablement = calibrated intensity', 'il n\u2019empêche que = stands firm'] },
        ],
        commonMistakes: [
            'Reading sans doute as certainty: modern French = probably. For full certainty: sans aucun doute or assurément.',
            'Mixing up presque and quasiment under exam conditions: presque = almost (light, oral), quasiment = virtually (stronger, written). Almost-finished and virtually-finished differ.',
            'Placing seulement vaguely: seulement before the verb scopes the VERB (only hesitated), before the noun scopes the NUMBER (only two). Ambiguity costs precision marks.',
            'Using prétendre as "to intend": it means to CLAIM (with doubt). Intend = avoir l\u2019intention de.',
        ],
    },

    transformations: [
        { type: 'Light', fr: 'Il est un peu fatigué.', en: 'He\u2019s a bit tired.' },
        { type: 'Calibrated', fr: 'Il est passablement fatigué.', en: 'He\u2019s quite a bit tired.' },
        { type: 'Maximal', fr: 'Il est extrêmement fatigué.', en: 'He\u2019s extremely tired.' },
        { type: 'Neutral report', fr: 'Il a dit que tout allait bien.', en: 'He said everything was fine.' },
        { type: 'Confident', fr: 'Il affirme que tout allait bien.', en: 'He asserts everything was fine.' },
        { type: 'Doubtful', fr: 'Il prétend que tout allait bien.', en: 'He claims everything was fine (doubt).' },
        { type: 'Verb scope', fr: 'Il a seulement hésité.', en: 'He only hesitated (didn\u2019t refuse).' },
        { type: 'Number scope', fr: 'Seulement deux ont hésité.', en: 'Only two hesitated (scarcity).' },
    ],

    sentenceBuilding: [
        { fr: 'Le rapport est rendu.', en: 'The report is in.' },
        { fr: 'Le rapport est rendu — quasiment définitif, tout au plus une annexe attendue.', en: 'The report is in — virtually final, at most an appendix awaited.' },
        { fr: 'Le rapport est rendu, quasiment définitif ; à vrai dire, seule l\u2019annexe financière attend encore des chiffres consolidés.', en: 'The report is in, virtually final; truth be told, only the financial appendix still awaits consolidated figures.' },
        { fr: 'Désormais officialisé, il affirme — sans trop de risques — que les délais seront tenus ; il n\u2019empêche que le budget, lui, reste quasiment secret.', en: 'Now officialized, it asserts — without much risk — that deadlines will hold; that said, the budget remains virtually secret.', breakdown: ['four ladders in one breath'] },
        { fr: 'Dès lors, tout se jouera sur l\u2019exécution : pour ainsi dire, le plan est parfait — il ne manque que le réel.', en: 'From then on, everything will hinge on execution: so to speak, the plan is perfect — only the real world is missing.' },
    ],

    practice: [
        { instruction: 'Pick the rung:', question: '90 % done. presque or quasiment ?', answer: 'quasiment — presque would understate; 90 % is "all but"' },
        { instruction: 'Assertion level:', question: 'He says it with confidence, verified sources.', answer: 'affirmer — soutient also works; prétendre would wrongly signal doubt' },
        { instruction: 'Scope check:', question: 'Seulement deux signatures manquent. What is limited?', answer: 'The NUMBER — only two signatures (scarcity), not the missing' },
        { instruction: 'Probability:', question: 'Sans doute viendra-t-il. Will he come?', answer: 'Probably — sans doute = likely, not certain' },
        { instruction: 'Modulation:', question: 'Soften "c\u2019est le même problème" without lying.', answer: 'C\u2019est, pour ainsi dire, le même problème.' },
        { instruction: 'Stand firm:', question: 'Grant the point, keep the objection.', answer: 'Il n\u2019empêche que le délai a doublé.' },
    ],

    translationPractice: [
        { en: 'The project is virtually finished.', fr: 'Le projet est quasiment terminé.' },
        { en: 'From now on, everything is done online. (formal)', fr: 'Désormais, tout se fait en ligne.' },
        { en: 'He claims he wasn\u2019t there. (you doubt it)', fr: 'Il prétend qu\u2019il n\u2019était pas là.' },
        { en: 'That will take an hour at most.', fr: 'Cela prendra tout au plus une heure.' },
        { en: 'To tell the truth, I hadn\u2019t thought of it.', fr: 'À vrai dire, je n\u2019y avais pas pensé.' },
        { en: 'That said, the delay has doubled.', fr: 'Il n\u2019empêche que le délai a doublé.' },
    ],

    reverseTranslation: [
        { fr: 'Il est passablement fatigué — enfin, épuisé, pour ainsi dire.', en: 'He\u2019s quite tired — well, exhausted, so to speak.' },
        { fr: 'Seulement deux candidats ont osé postuler.', en: 'Only two candidates dared to apply.' },
        { fr: 'Elle soutient que le devis a été respecté ; les factures disent autre chose.', en: 'She maintains the estimate was respected; the invoices say otherwise.' },
        { fr: 'Il était un tantinet vexé, mais il ne l\u2019a pas montré.', en: 'He was a tiny bit miffed, but he didn\u2019t show it.' },
    ],

    register: {
        informal: 'C\u2019est presque réglé — enfin, disons, à 90 %. (disons = the spoken calibration)',
        neutral: 'Le projet est presque terminé ; il reste deux vérifications.',
        formal: 'Le dossier est quasiment clos ; désormais, seule l\u2019annexe budgétaire demeure en suspens — tout au plus quelques chiffres consolidés.',
    },

    culture: 'Nuance is the crown jewel of French style — the language of the académiciens, the diplomat and the correcteur. Where English hedges with intonation, French hedges with word choice: the difference between presque and quasiment, entre affirmer and prétendre, is a difference of judgement. Newspaper style guides (Le Monde\u2019s famous one) devote chapters to these ladders; the TCF\u2019s C2 band assumes you hear them. The best training: take one sentence you wrote yesterday and rewrite it three times — lighter, calibrated, maximal — without changing the fact.',

    freeProduction: 'Write one paragraph (8–10 sentences) about a decision at work or school, then produce its two stylistic mirrors: a lighter version (presque, dire, peut-être, seulement-scope on the verb) and a firmer version (quasiment, affirmer, sans doute, tout au plus, dès lors). Every version keeps the same facts — only the rungs move.',

    miniTest: [
        { question: 'Sans doute viendra-t-il means he will:', options: ['certainly come', 'probably come', 'never come', 'doubt coming'], answer: 'probably come — modern sans doute is a hedge' },
        { question: 'Stronger than presque:', options: ['un peu', 'quasiment', 'tantinet', 'assez'], answer: 'quasiment — "all but"' },
        { question: 'Il prétend qu\u2019il était chez lui signals:', options: ['confidence', 'doubt', 'joy', 'a command'], answer: 'doubt — prétendre = claim, not assert' },
        { question: 'Seulement deux places restent limits:', options: ['the verb', 'the number', 'the time', 'the place'], answer: 'the number — scarcity of seats' },
        { question: 'Il n\u2019empêche que introduces:', options: ['a concession', 'a standing objection', 'a question', 'a farewell'], answer: 'a standing objection — "that said, still…"' },
    ],

    review: [
        'The certainty ladder from C1:argumentation-avancee (démontrer → suggérer) is the assertion ladder\u2019s reporting half.',
        'The understatement dial from C1:idiomes (pas mal, pas génial) plugs straight into the intensity ladder here.',
    ],

    traps: [
        'sans doute = probably, assurément = certainly — one word of distance separates them; exam items pair them on purpose.',
        'seulement/ne…que scope: before the verb = the action is minimal; before the noun = the quantity is scarce. Choose deliberately.',
        'presque (oral, light) vs quasiment (written, strong): picking presque for a 95 % completion reads as softness, not humility.',
        'prétendre ≠ intend. prétendre que = claim with doubt; avoir l\u2019intention de = intend. Confusing them changes your whole stance.',
    ],

    homework: {
        intro: 'Every item tunes one rung: intensity, assertion, probability, scope, or a modulation formula. Precision is the answer, not vocabulary size.',
        translation: [
            { prompt: 'The project is virtually finished. (strong, formal)', answer: 'Le projet est quasiment terminé.', explanation: 'quasiment > presque; the s sounds as z: "kwa-zeem-AHN".' },
            { prompt: 'He claims he wasn\u2019t there. (with doubt)', answer: 'Il prétend qu\u2019il n\u2019était pas là.', explanation: 'prétendre = claim with doubt; affirmer would vouch for him.' },
            { prompt: 'It will take an hour at most.', answer: 'Cela prendra tout au plus une heure.', explanation: 'tout au plus = at most; au minimum is the opposite pole.' },
            { prompt: 'To tell the truth, nobody had checked.', answer: 'À vrai dire, personne n\u2019avait vérifié.', explanation: 'à vrai dire = confession frame; plus-que-parfait for the earlier omission.' },
            { prompt: 'That said, the deadline has doubled. (stand firm)', answer: 'Il n\u2019empêche que le délai a doublé.', explanation: 'il n\u2019empêche que + indicative — grants nothing away after a concession.' },
            { prompt: 'Only two seats were left. (scarcity scope)', answer: 'Seulement deux places restaient.', explanation: 'seulement before the NUMBER limits the quantity; before the verb it would limit the act.' },
        ],
        blanks: [
            { prompt: 'Le rapport est ______ terminé (90 %).', answer: 'quasiment', explanation: '90 % = "all but": quasiment. presque would undersell the state.' },
            { prompt: 'Elle ______ que le devis a été respecté. (maintains under challenge)', answer: 'soutient', explanation: 'soutenir = maintain under challenge — one rung above affirmer.' },
            { prompt: '______, chaque demande se fait en ligne. (from now on, formal)', answer: 'Désormais', explanation: 'désormais = from now on; the rule-changing time adverb of notices.' },
            { prompt: 'Cela prendra ______ au ______ deux jours.', answer: 'tout… plus', explanation: 'tout au plus = at most — the calibrated ceiling.' },
            { prompt: 'Il ______ qu\u2019il n\u2019était pas au courant. (claims — you doubt)', answer: 'prétend', explanation: 'prétendre carries the doubt inside the verb; no extra marker needed.' },
            { prompt: '______, le budget reste secret. (that said — stand firm)', answer: 'Il n\u2019empêche que', alt: ['il n’empêche que'], explanation: 'il n\u2019empêche que + indicative — the standing objection.' },
        ],
        corrections: [
            { prompt: 'Sans doute, il viendra certainement demain.', answer: 'Sans doute viendra-t-il demain. / Il viendra assurément demain.', explanation: 'How the mistake happens: stacking a hedge with a certainty adverb. Why it does not work: sans doute already means probably — certainement after it contradicts. How to fix it: one rung per sentence — hedge (sans doute) or certainty (assurément), plus the elegant inversion.' },
            { prompt: 'Le projet est presque terminé, il reste un seul détail sur cinquante.', answer: 'Le projet est quasiment terminé — tout au plus un détail sur cinquante.', explanation: 'How the mistake happens: choosing the light rung for a near-complete state. Why it does not work: 49/50 done is "all but", not "almost" — the intensity must match the proportion. How to fix it: quasiment + tout au plus.' },
            { prompt: 'Il prétend terminer le rapport demain — c\u2019est certain, il me l\u2019a promis.', answer: 'Il affirme (ou : m\u2019a promis) qu\u2019il terminera le rapport demain.', explanation: 'How the mistake happens: prétendre + certainty talk. Why it does not work: prétendre signals your doubt; a promise vouched for is affirmer/assurer. How to fix it: pick the rung your trust actually occupies.' },
            { prompt: 'Il a seulement refusé deux fois le prolongement.', answer: 'Il n\u2019a refusé le prolongement que deux fois. / Deux refus seulement.', explanation: 'How the mistake happens: seulement before the verb scopes the ACTION (the refusals are what\u2019s few). Why it does not work: the intended meaning is the count. How to fix it: place the limiter on the number — que deux fois, or deux refus seulement.' },
            { prompt: 'Dès lors, à partir de maintenant, la procédure change.', answer: 'Désormais, la procédure change.', explanation: 'How the mistake happens: doubling two time markers. Why it does not work: dès lors looks BACK at a turning point; désormais looks FORWARD from now — one is enough. How to fix it: désormais alone (or: dès lors, la procédure changea — narrative).' },
        ],
        writing: {
            task: 'Write the same short news item (about 8 sentences) in three calibrations: light (presque, dire, peut-être), calibrated (quasiment, affirmer, sans doute, tout au plus), and firm (assurément, soutenir, dès lors, il n\u2019empêche que). Facts identical across versions; only the ladders move. Add one scope pair (seulement + verb vs seulement + number).',
            requirements: [
                'Three versions, facts identical',
                'Each version internally consistent on its rungs',
                'One intensity ladder step shown twice (same fact, two intensities)',
                'One seulement scope pair',
                'One modulation formula per version (disons / à vrai dire / il n\u2019empêche que)',
            ],
            minWords: 100,
        },
        checklist: [
            'I choose intensity by proportion (presque < quasiment < entièrement) and register (tantinet = playful)',
            'I match the assertion verb to my trust (dire < affirmer < soutenir; prétendre signals doubt)',
            'I keep probability honest (sans doute = probably; assurément = certainly)',
            'I scope seulement/ne…que deliberately — verb or number',
            'I calibrate with formulas (pour ainsi dire, à vrai dire, il n\u2019empêche que)',
            'I can rewrite the same fact lighter and firmer without changing the truth',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Intensity ladder: un peu → assez → passablement → très → extrêmement / parfaitement. presque (light) vs quasiment (strong) vs entièrement (done). Pick by proportion AND register.',
            examples: [
                { fr: 'presque terminé (70 %) · quasiment terminé (95 %) · entièrement terminé (100 %)', en: 'three honest rungs' },
            ],
        },
        {
            explanation: 'Assertion ladder: dire (neutral) → affirmer (assert) → soutenir (maintain under challenge) → prétendre (claim, doubt) → laisser croire (imply — spin suspected). The verb vouches or doesn\u2019t.',
            examples: [
                { fr: 'Il a dit… · Il affirme… · Il soutient… · Il prétend… · Le titre laisse croire…', en: 'five trust levels' },
            ],
        },
        {
            explanation: 'Probability ladder: peut-être → vraisemblablement → sans doute (probably!) → assurément / sans aucun doute (certain). Never stack two rungs in one sentence.',
            examples: [
                { fr: 'Sans doute viendra-t-il. · Il viendra assurément.', en: 'probably vs certainly' },
            ],
        },
        {
            explanation: 'Scope with seulement / ne…que: before the VERB (il a seulement hésité — he only hesitated) vs before the NUMBER (seulement deux — only two). The limiter lands on what follows it closely.',
            examples: [
                { fr: 'Il ne fait qu\u2019hésiter. · Seulement deux places restent.', en: 'verb scope vs number scope' },
            ],
        },
        {
            explanation: 'Modulation formulas with attitudes: pour ainsi dire (so to speak — soften), si l\u2019on veut (if you like — defer), disons (let\u2019s say — concede), à vrai dire (truth be told — confess), il n\u2019empêche que (that said — stand firm).',
            examples: [
                { fr: 'À vrai dire, c\u2019était passablement cher ; il n\u2019empêche que c\u2019était bon.', en: 'confess then stand' },
            ],
        },
        {
            explanation: 'Time-markers with jobs: désormais (forward rule), dès lors (consequence after a turning point), à compter de ce jour (administrative), dorénavant (désormais\u2019s formal twin). One per sentence.',
            examples: [
                { fr: 'Désormais, tout passe par la plateforme.', en: 'the rule-setting adverb' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'quasiment': { en: 'virtually / all but', pron: 'kwah-zeem-AHN', type: 'adverb', register: 'formal', note: 'stronger than presque: le projet est quasiment terminé.' },
        'désormais': { en: 'from now on', pron: 'day-zor-MEH', type: 'adverb', register: 'formal', note: 'the rule-setting time adverb; twin: dorénavant.' },
        'passablement': { en: 'quite a bit', pron: 'pah-sah-blah-MAHN', type: 'adverb', note: 'between assez and très; Quebec-favoured rung.' },
        'tantinet': { en: 'tiny bit (playful)', pron: 'tahn-tee-NEH', gender: 'masculine', type: 'noun', register: 'informal', note: 'un tantinet vexé — the charming intensifier of understatement.' },
        'prétendre': { en: 'to claim (with doubt)', pron: 'pray-TAHN-druh', type: 'verb', register: 'formal', note: 'NOT "to intend". Il prétend que… = he claims… (you doubt).' },
        'soutient': { en: 'maintains (present of soutenir)', pron: 'soo-TYAN', type: 'verb', base: { form: 'soutenir', en: 'to maintain / support' }, note: 'one rung above affirmer — holding a claim under challenge.' },
        'véridique': { en: 'truthful / accurate', pron: 'vay-ree-DEEK', type: 'adjective', register: 'formal', note: 'un témoignage véridique — formal truth-quality adjective.' },
        'assurément': { en: 'assuredly / certainly', pron: 'ah-sür-ay-MAHN', type: 'adverb', register: 'formal', note: 'the certainty rung above sans doute.' },
        'vraisemblablement': { en: 'presumably / very likely', pron: 'vreh-zahn-blah-blah-MAHN', type: 'adverb', register: 'formal', note: 'probability rung: vraisemblablement il viendra.' },
        'il n\u2019empêche que': { en: 'that said / still (stand firm)', pron: 'eel nam-PESH kuh', type: 'phrase', note: 'grants nothing after a concession: Il n\u2019empêche que le délai a doublé.' },
        'pour ainsi dire': { en: 'so to speak', pron: 'poor ahn-SEE deer', type: 'phrase', register: 'formal', note: 'the softening frame — claims analogy, not identity.' },
        'à vrai dire': { en: 'to tell the truth', pron: 'ah vreh DEER', type: 'phrase', register: 'formal', note: 'the confession frame before an honest admission.' },
        'tout au plus': { en: 'at most', pron: 'too oh PLÜ', type: 'phrase', register: 'formal', note: 'the calibrated ceiling; opposite: au minimum.' },
        'si l\u2019on veut': { en: 'if you like (deferential)', pron: 'see lohn VUH', type: 'phrase', register: 'formal', note: 'offering the label without imposing it.' },
        'disons': { en: 'let\u2019s say (concede)', pron: 'dee-ZOHN', type: 'expression', note: 'the spoken calibration: c\u2019est, disons, à moitié réglé.' },
        'en deçà de': { en: 'below (a threshold)', pron: 'ahn duh-SAH duh', type: 'phrase', register: 'formal', note: 'en deçà des attentes = below expectations; opposite: au-delà de.' },
        'devis': { en: 'estimate / quote', pron: 'duh-VEE', gender: 'masculine', plural: 'devis (invariable)', type: 'noun', note: 'respecter le devis = stay within the quote; faire établir un devis.' },
        'facture': { en: 'invoice', pron: 'fahk-TÜR', gender: 'feminine', plural: 'factures', type: 'noun', note: 'les factures disent autre chose — the evidence against the devis.' },
        'annexe': { en: 'appendix / annex', pron: 'ah-NEHSS', gender: 'feminine', plural: 'annexes', type: 'noun', note: 'l\u2019annexe financière; also the adjective: question annexe.' },
        'en suspens': { en: 'pending / on hold', pron: 'ahn sü-SPAH', type: 'expression', register: 'formal', note: 'rester en suspens — invariable phrase; suspends (infinitive) as noun.' },
        'cousine germaine': { en: 'first cousin (female)', pron: 'koo-ZEEN zhehr-MEN', gender: 'feminine', type: 'noun', note: 'metaphorically: a near-twin problem — sa cousine germaine.' },
    },
};

// ── C2 · Literary & Journalistic French ─────────────────────────────────────
const c2Litteraire: StaticFrenchLesson = {
    title: 'Literary & Journalistic French',
    objective: 'Read the two highest registers at sight — recognize passé simple and literary subjunctive in fiction, decode the coded formulas of the press (de source proche du dossier, selon nos informations), and name the devices (métaphore filée, anaphore, antithèse) that make both registers dense.',

    vocabulary: [
        { fr: 'il fut', en: 'he was (passé simple of être)', pron: 'eel FÜ', type: 'verb', register: 'formal', example: { fr: 'Il fut un temps où tout semblait simple.', en: 'There was a time when everything seemed simple.' }, related: [{ fr: 'il était', en: 'he was (imparfait)' }] },
        { fr: 'il alla', en: 'he went (passé simple of aller)', pron: 'eel ah-LAH', type: 'verb', register: 'formal', example: { fr: 'Il alla jusqu\u2019au bout du couloir.', en: 'He went to the end of the corridor.' }, related: [{ fr: 'il vint', en: 'he came (passé simple)' }] },
        { fr: 'qu\u2019il vînt', en: 'that he come (imparfait du subjonctif)', pron: 'kee VAN', type: 'verb', register: 'formal', example: { fr: 'Il fallait qu\u2019il vînt — aujourd\u2019hui : qu\u2019il vienne.', en: 'He had to come — today: qu\u2019il vienne.' }, related: [{ fr: 'qu\u2019il fût', en: 'that he were (literary subj.)' }] },
        { fr: 'de source proche du dossier', en: 'from a source close to the case (press code)', pron: 'duh soors prosh dü doh-SYAY', type: 'phrase', register: 'formal', example: { fr: 'De source proche du dossier, la date avance.', en: 'From a source close to the case, the date is moving up.' }, related: [{ fr: 'de source concordante', en: 'from a corroborating source' }] },
        { fr: 'selon nos informations', en: 'according to our information', pron: 'sü-LÖN nohz an-for-mah-SYOHN', type: 'phrase', register: 'formal', example: { fr: 'Selon nos informations, rien n\u2019est signé.', en: 'According to our information, nothing is signed.' }, related: [{ fr: 'de nos enquêtes', en: 'from our investigations' }] },
        { fr: 'en substance', en: 'in substance / in essence', pron: 'ahn süb-STAHNSS', type: 'phrase', register: 'formal', example: { fr: 'En substance, la ministre a confirmé.', en: 'In substance, the minister confirmed.' }, related: [{ fr: 'en clair', en: 'plainly' }] },
        { fr: 'la métaphore filée', en: 'the extended metaphor', pron: 'lah may-tah-fohr fee-LAY', gender: 'feminine', register: 'formal', example: { fr: 'Une métaphore filée maritime traverse tout le texte.', en: 'A maritime extended metaphor runs through the text.' }, related: [{ fr: 'l\u2019image', en: 'the image' }] },
        { fr: 'l\u2019anaphore', en: 'anaphora (repeated openings)', pron: 'lah-nah-FOHR', gender: 'feminine', register: 'formal', example: { fr: 'L\u2019anaphore « je veux… je veux… » lance le discours.', en: 'The anaphora "I want… I want…" launches the speech.' }, related: [{ fr: 'la répétition', en: 'repetition (plain)' }] },
        { fr: 'l\u2019antithèse', en: 'antithesis (balanced opposites)', pron: 'lahn-tee-TEHZ', gender: 'feminine', register: 'formal', example: { fr: 'Antithèse : « je veux » / « je refuse ».', en: 'Antithesis: "I want" / "I refuse".' }, related: [{ fr: 'l\u2019oxymore', en: 'the oxymoron' }] },
        { fr: 'la chute', en: 'the punchline / final twist', pron: 'lah SHÜT', gender: 'feminine', register: 'formal', example: { fr: 'La chute du texte renverse tout.', en: 'The final line flips everything.' }, related: [{ fr: 'la conclusion', en: 'the conclusion (plain)' }] },
        { fr: 'conclure à', en: 'to conclude that (formal verdict)', pron: 'kohn-KLOO ah', type: 'verb', register: 'formal', example: { fr: 'Le rapport conclut à une erreur procédurale.', en: 'The report concludes that a procedural error occurred.' }, related: [{ fr: 'conclure que', en: 'to conclude that' }] },
        { fr: 'cerner', en: 'to pin down / grasp precisely', pron: 'sair-NAY', type: 'verb', register: 'formal', example: { fr: 'Difficile de cerner sa position.', en: 'Hard to pin down his position.' }, related: [{ fr: 'définir', en: 'to define' }] },
    ],

    pronunciation: [
        { fr: 'il fut / il eut', approx: 'eel FÜ / eel Ü', en: 'two one-syllable past simples — the u is tight' },
        { fr: 'il alla', approx: 'eel ah-LAH', en: 'final a stressed — the passé simple sings' },
        { fr: 'qu\u2019il vînt', approx: 'kee VAN', en: 'the circumflex shortens: "vAN" not "vAN-uh"' },
        { fr: 'de source proche', approx: 'duh SOORS PROSH', en: 'final -rce keeps the s sound: "soors"' },
        { fr: 'en substance', approx: 'ahn süb-STAHNSS', en: 'final -ce = "ss"' },
        { fr: 'métaphore filée', approx: 'may-tah-FOHR fee-LAY', en: 'filée keeps the é open: "fee-LAY"' },
    ],

    grammar: {
        rule: 'Literary French reads through three fossil tenses — passé simple (il fut, il alla), imparfait du subjonctif (qu\u2019il vînt), passé antérieur (il eut dit) — while journalistic French reads through coded attribution (de source proche du dossier, selon nos informations, en substance). Both lean on named devices: anaphore, antithèse, métaphore filée, chute.',
        explanation: 'You will never WRITE the passé simple, but the C2 reading exam expects you to recognize it instantly: singular il fut / il eut / il alla / il vint / il fit / il vit; plural ils furent / ils eurent / ils allèrent. The imparfait du subjonctif survives only in the most literary prose: qu\u2019il vînt, qu\u2019il fût — today\u2019s French would say qu\u2019il vienne / qu\u2019il soit. The passé antérieur (il eut dit) marks a completed action before another past action — the literary passé antérieur of reports. On the press side, formulas do the attributing and the hedging: de source proche du dossier (close to the case — the insider), de source concordante (corroborating sources), selon nos informations (our reporting suggests), il ressort de… (it emerges), en substance (in essence), conclure à (formally conclude that). The devices give both registers their density: anaphore (repeated openings build momentum), antithèse (balanced opposites: je veux… je refuse…), métaphore filée (one image extended), and the chute — the final sentence that reframes everything.',
        examples: [
            { fr: 'Il fut un temps où la presse s\u2019imprimait la nuit ; puis vint l\u2019heure des réseaux.', en: 'There was a time when the press printed at night; then came the age of networks.', breakdown: ['il fut un temps = literary opener', 'puis vint = inverted passé simple', 'two tenses, one elegy'] },
            { fr: 'Il fallait qu\u2019il fût là avant l\u2019aube — il n\u2019y manqua pas.', en: 'He had to be there before dawn — he did not fail it.', breakdown: ['qu\u2019il fût = imparfait du subjonctif', 'il n\u2019y manqua pas = litotes (passé simple)', 'literary concentration'] },
            { fr: 'Selon nos informations, le dossier avance ; de source concordante, la signature est imminente.', en: 'According to our information, the file is moving; corroborating sources say the signature is imminent.', breakdown: ['two coded attributions', 'imminente = press-word for "any day now"', 'no named source — by design'] },
            { fr: 'En substance, le rapport conclut à une erreur de procédure, non à une fraude.', en: 'In substance, the report concludes that a procedural error occurred, not fraud.', breakdown: ['en substance = the honest summary', 'conclut à = formal verdict verb', 'erreur vs fraude — the calibrated pair'] },
            { fr: 'Je veux comprendre ; je veux réparer ; je refuse d\u2019oublier — l\u2019anaphore porte l\u2019émotion, l\u2019antithèse la discipline.', en: 'I want to understand; I want to repair; I refuse to forget — the anaphora carries the emotion, the antithesis the discipline.', breakdown: ['anaphore: je veux × 2', 'antithèse: veux / refuse', 'devices doing measurable work'] },
            { fr: 'La tempête était passée ; le navire, lui, restait à quai — et la chute du communiqué resta, elle, sans réponse.', en: 'The storm had passed; the ship, however, stayed at dock — and the statement\u2019s punchline remained, for its part, unanswered.', breakdown: ['métaphore filée: tempête → navire → quai', 'lui / elle = contrastive pronouns', 'chute = the final twist'] },
        ],
        commonMistakes: [
            'Confusing il fut (he was) with il eut (he had): both passé simple, both one syllable — fut = être, eut = avoir. The reading grid hinges on that pair.',
            'Translating de source proche du dossier literally into spoken French: it is a CODE — recognize it, quote it, but in your own speech say une personne bien informée.',
            'Mis-reading the literary subjunctive as a typo: qu\u2019il vînt / qu\u2019il fût are correct — the circumflex is the accent of the imparfait du subjonctif, not an accent mistake.',
            'Using conclure à and conclure que interchangeably without care: conclure à + noun (une erreur), conclure que + clause — mixing them stumbles the formal register.',
        ],
    },

    transformations: [
        { type: 'Modern', fr: 'Il est venu très tôt.', en: 'He came very early.' },
        { type: 'Passé simple', fr: 'Il vint de très bonne heure.', en: 'He came at a very early hour. (literary)' },
        { type: 'Modern subj', fr: 'Il fallait qu\u2019il vienne.', en: 'He had to come. (today)' },
        { type: 'Literary subj', fr: 'Il fallait qu\u2019il vînt.', en: 'He had to come. (literary)' },
        { type: 'Speech', fr: 'Un haut responsable a déclaré que…', en: 'A senior official said that…' },
        { type: 'Press code', fr: 'De source proche du dossier, …', en: 'From a source close to the case, …' },
        { type: 'Plain repetition', fr: 'Je veux savoir. Je veux comprendre.', en: 'I want to know. I want to understand.' },
        { type: 'Named device', fr: 'Anaphore : « je veux… je veux… »', en: 'Anaphora: the repetition named' },
    ],

    sentenceBuilding: [
        { fr: 'Le communiqué était bref.', en: 'The statement was brief.' },
        { fr: 'Le communiqué était bref ; en substance : des discussions « avancées ».', en: 'The statement was brief; in substance: "advanced" discussions.', breakdown: ['scare-quotes = press distance'] },
        { fr: 'Selon nos informations, les discussions sont avancées ; de source proche du dossier, la signature interviendrait avant vendredi.', en: 'According to our information, talks are advanced; from a source close to the case, the signature would come before Friday.', breakdown: ['two attributions, one rumour conditional'] },
        { fr: 'Il fut un temps où pareil flou aurait fait la une ; il ressort pourtant de l\u2019ensemble que le marché, lui, n\u2019y voit qu\u2019une étape.', en: 'There was a time when such vagueness would make the front page; yet it emerges from the whole that the market, for its part, sees only a step.', breakdown: ['literary opener + press verb'] },
        { fr: 'La chute reste la même : tant que rien n\u2019est signé, tout est signable — et rien n\u2019est signé.', en: 'The punchline stays the same: as long as nothing is signed, everything is signable — and nothing is signed.', breakdown: ['chute = the quotable close'] },
    ],

    practice: [
        { instruction: 'Identify the tense:', question: 'Il fut un temps où tout semblait possible.', answer: 'passé simple of être — literary narration' },
        { instruction: 'Identify the tense:', question: 'Il fallait qu\u2019il fût là avant l\u2019aube.', answer: 'imparfait du subjonctif (qu\u2019il fût) — today: qu\u2019il soit' },
        { instruction: 'Decode the code:', question: 'De source proche du dossier, la date avance.', answer: 'An unnamed insider — attribution that cannot be checked' },
        { instruction: 'Decode:', question: 'La signature interviendrait avant vendredi.', answer: 'Hearsay conditional — the paper refuses to vouch (C1:oral-implicite)' },
        { instruction: 'Name the device:', question: 'Je veux savoir ; je veux comprendre ; je veux agir.', answer: 'anaphore — repeated openings' },
        { instruction: 'Formal verdict:', question: 'Le rapport conclut ______ une erreur de procédure.', answer: 'à — conclure à + noun (or conclure que + clause)' },
    ],

    translationPractice: [
        { en: 'There was a time when everything seemed simpler. (literary)', fr: 'Il fut un temps où tout semblait plus simple.' },
        { en: 'According to our information, nothing is signed yet.', fr: 'Selon nos informations, rien n\u2019est encore signé.' },
        { en: 'From a source close to the case, the date is moving up.', fr: 'De source proche du dossier, la date avance.' },
        { en: 'In substance, the report concludes a procedural error.', fr: 'En substance, le rapport conclut à une erreur de procédure.' },
        { en: 'Hard to pin down his real position.', fr: 'Difficile de cerner sa véritable position.' },
        { en: 'The final line flips everything.', fr: 'La chute renverse tout.' },
    ],

    reverseTranslation: [
        { fr: 'Puis vint le temps des doutes.', en: 'Then came the time of doubts. (literary inversion)' },
        { fr: 'De source concordante, les pourparlers reprendraient lundi.', en: 'Corroborating sources say talks would resume Monday.' },
        { fr: 'Une métaphore filée navale traverse l\u2019éditorial.', en: 'A naval extended metaphor runs through the editorial.' },
        { fr: 'Il n\u2019y manqua pas. (litotes, passé simple)', en: 'He did not fail it. (= he was there)' },
    ],

    register: {
        informal: 'Alors là, franchement, qui sait vraiment qui signe quoi et quand ? (spoken — the opposite of the press code)',
        neutral: 'Selon le communiqué, des discussions sont en cours.',
        formal: 'Selon nos informations, de source proche du dossier, les pourparlers, en substance « avancés », concluraient avant la fin du mois.',
    },

    culture: 'The press code is a national institution: French journalists legally protect their sources, so formulas like de source proche du dossier are the reader\u2019s only map of reliability. Le Monde\u2019s style guide codified much of this grammar of discretion. On the literary side, the passé simple survives in novels and biographies — and in Quebec, largely vanished from speech but intact in prose. The TCF\u2019s C2 reading texts borrow from both registers precisely because decoding them is the skill being tested.',

    freeProduction: 'Write two paragraphs (about 8 sentences each) on the same invented event: (1) a news lede using three coded formulas (selon nos informations, de source proche du dossier, en substance) and one hearsay conditional; (2) a literary paragraph using passé simple twice (il fut/illet alla…), one literary subjunctive (qu\u2019il fût), and a named device (anaphore or métaphore filée). Finish the literary one with a chute.',

    miniTest: [
        { question: 'Il eut means:', options: ['he was', 'he had', 'he went', 'he came'], answer: 'he had — passé simple of avoir (fut = être)' },
        { question: 'Qu\u2019il vînt is:', options: ['a typo', 'imparfait du subjonctif', 'futur simple', 'conditionnel'], answer: 'imparfait du subjonctif — today: qu\u2019il vienne' },
        { question: 'De source proche du dossier means:', options: ['the author\u2019s opinion', 'an unnamed insider', 'a legal document', 'a rumour online'], answer: 'an unnamed insider — the press code' },
        { question: 'Conclure à takes:', options: ['a clause', 'a noun', 'a question', 'an infinitive'], answer: 'a noun — conclure à une erreur (or conclure que + clause)' },
        { question: '« Je veux… je veux… je refuse… » shows:', options: ['anaphore + antithèse', 'métaphore filée', 'litote', 'euphémisme'], answer: 'anaphore + antithèse — repetition then balance' },
    ],

    review: [
        'The hearsay conditional from C1:oral-implicite (interviendrait) is the press code\u2019s favourite mood.',
        'The devices here (anaphore, antithèse) are what C2:rhetorique dissects in full — this lecture names them, that one weaponizes them.',
    ],

    traps: [
        'The fut/eut pair: fut = être, eut = avoir. One vowel, two verbs — reading comprehension of whole paragraphs hinges on it.',
        'The literary subjunctive\u2019s circumflex (qu\u2019il vînt, qu\u2019il fût) is CORRECT — do not "fix" it when quoting or copying.',
        'Press codes hedge, not confirm: selon nos informations + interviendrait = the paper knows but won\u2019t vouch. Answer attitude questions accordingly.',
        'conclure à + noun vs conclure que + clause — using que with a noun (conclure que fraude) is a register stumble.',
    ],

    homework: {
        intro: 'Recognition before production: identify the fossil tenses, decode the press formulas, name the devices. Every answer cites the evidence in the sentence.',
        translation: [
            { prompt: 'There was a time when everything seemed possible. (literary opener)', answer: 'Il fut un temps où tout semblait possible.', explanation: 'il fut un temps = the classic literary frame; imparfait (semblait) for the background.' },
            { prompt: 'According to our information, nothing is signed yet.', answer: 'Selon nos informations, rien n\u2019est encore signé.', explanation: 'the paper\u2019s hedged attribution — it knows, it won\u2019t vouch.' },
            { prompt: 'From a source close to the case, the date is moving up.', answer: 'De source proche du dossier, la date avance.', explanation: 'coded insider — no name, by design; avance = present for an ongoing shift.' },
            { prompt: 'In substance, the report concludes a procedural error.', answer: 'En substance, le rapport conclut à une erreur de procédure.', explanation: 'en substance = the honest summary frame; conclut à + noun.' },
            { prompt: 'He did not fail it. (litotes, literary)', answer: 'Il n\u2019y manqua pas.', explanation: 'passé simple (manqua) + litotes — the negation praises the punctuality.' },
            { prompt: 'The final line flips everything.', answer: 'La chute renverse tout.', explanation: 'la chute = the punchline; renverser = flip — both are literary-critical vocabulary.' },
        ],
        blanks: [
            { prompt: 'Il ______ un temps où la patience était une vertu. (passé simple of être)', answer: 'fut', explanation: 'il fut un temps — the literary opener. Il eut would mean "there was-had": impossible.' },
            { prompt: 'Puis ______ le temps des doutes. (came — inverted passé simple)', answer: 'vint', explanation: 'puis vint — the inverted narration of venir; subject follows the verb.' },
            { prompt: 'Il fallait qu\u2019il ______ là avant l\u2019aube. (literary subjunctive of être)', answer: 'fût', explanation: 'qu\u2019il fût = imparfait du subjonctif; the circumflex is correct.' },
            { prompt: 'Selon nos ______, rien n\u2019est signé. (information)', answer: 'informations', explanation: 'in French, information is COUNTABLE: une information, des informations.' },
            { prompt: 'Le rapport conclut ______ une erreur de procédure.', answer: 'à', explanation: 'conclure à + noun; conclure que + clause. Two frames, one verdict.' },
            { prompt: 'Difficile de ______ sa véritable position. (pin down)', answer: 'cerner', explanation: 'cerner = grasp precisely — the analyst\u2019s verb for elusive positions.' },
        ],
        corrections: [
            { prompt: 'Il eut un temps où tout semblait simple.', answer: 'Il fut un temps où tout semblait simple.', explanation: 'How the mistake happens: mixing the fut/eut pair. Why it does not work: il eut = he HAD — "there was a time" needs être. How to fix it: il fut un temps. Memorize: fut = was, eut = had.' },
            { prompt: 'Il fallait qu\u2019il vint là avant l\u2019aube.', answer: 'Il fallait qu\u2019il vînt là avant l\u2019aube. (or, modern: qu\u2019il vienne)', explanation: 'How the mistake happens: using the passé simple (vint) after il fallait. Why it does not work: the literary subjunctive takes the circumflex — vînt, not vint. How to fix it: qu\u2019il vînt (literary) or qu\u2019il vienne (modern).' },
            { prompt: 'Le rapport conclut que une erreur de procédure.', answer: 'Le rapport conclut à une erreur de procédure.', explanation: 'How the mistake happens: que before a noun. Why it does not work: conclure que takes a CLAUSE; a noun needs conclure à. How to fix it: conclut à une erreur.' },
            { prompt: 'De source proche du dossier, je te dis que tout est signé, c\u2019est sûr !', answer: 'Une personne bien informée me dit que tout serait signé — à confirmer.', explanation: 'How the mistake happens: speaking the press code aloud with certainty added. Why it does not work: the code exists to hedge; c\u2019est sûr destroys the hedge. How to fix it: a natural spoken attribution + the hearsay conditional.' },
            { prompt: 'Je veux savoir, je veux comprendre — c\u2019est une répétition bête.', answer: 'C\u2019est une anaphore — la répétition y porte l\u2019émotion.', explanation: 'How the mistake happens: judging repetition as clumsy. Why it does not work: anaphora is a deliberate device; at C2 you name it, you don\u2019t correct it. How to fix it: identify the device and its effect.' },
        ],
        writing: {
            task: 'Write a news item (10–14 lines) about an invented negotiation using four coded formulas (selon nos informations, de source proche du dossier, de source concordante, en substance), one hearsay conditional (interviendrait), and one conclure à verdict. Then append a two-sentence literary coda with one passé simple (il fut / vint) and a chute.',
            requirements: [
                'Four press codes used naturally',
                'One hearsay conditional (interviendrait / serait)',
                'One conclure à + noun verdict',
                'Literary coda: one passé simple + one chute',
                'No spoken register in the news body',
            ],
            minWords: 100,
        },
        checklist: [
            'I recognize passé simple on sight: fut/eut, alla/vint, fit/vit, furent/eurent',
            'I recognize the literary subjunctive\u2019s circumflex: qu\u2019il fût, qu\u2019il vînt',
            'I decode the press codes: selon nos informations, de source proche du dossier, de source concordante',
            'I hear the hearsay conditional as distance (interviendrait)',
            'I use conclure à + noun and conclure que + clause correctly',
            'I name the devices: anaphore, antithèse, métaphore filée, chute',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The six passé simples you meet most: il fut (was) · il eut (had) · il alla (went) · il vint (came) · il fit (did) · il vit (saw). Plural: ils furent / eurent / allèrent / vinrent / firent / virent.',
            examples: [
                { fr: 'Il fut roi. · Il eut un fils. · Il vint à Paris. · Il fit le tour.', en: 'four of the six' },
            ],
        },
        {
            explanation: 'The literary subjunctive (imparfait du subjonctif) survives in writing only: qu\u2019il fût (were), qu\u2019il eût (had), qu\u2019il vînt (came), qu\u2019il fît (did). The circumflex marks it — never "correct" it.',
            examples: [
                { fr: 'Il fallait qu\u2019il fût là. — modern: qu\u2019il soit là.', en: 'literary vs modern' },
            ],
        },
        {
            explanation: 'Press codes ranked by closeness: de source proche du dossier (insider) · de source concordante (several agree) · selon nos informations (our own reporting) · il ressort que (it emerges) · des rumeurs circulent (weakest).',
            examples: [
                { fr: 'De source proche du dossier, la signature est imminente.', en: 'the strongest unnamed attribution' },
            ],
        },
        {
            explanation: 'Press verbs of verdict: conclure à (+ noun) · confirmer · démentir (deny) · examiner de près? no: examiner · laisser entendre (imply — distance). The pair confirmer / démentir frames every controversy.',
            examples: [
                { fr: 'Le ministère dément ; de source concordante, l\u2019étude est réelle.', en: 'deny vs corroborate' },
            ],
        },
        {
            explanation: 'Devices with their work: ANAPHORE — momentum (je veux… je veux…) · ANTITHÈSE — balance (je veux / je refuse) · MÉTAPHORE FILÉE — coherence of image (tempête → navire → quai) · CHUTE — reframing close · LITOTE — praise by negation.',
            examples: [
                { fr: 'La tempête est passée ; le navire reste à quai.', en: 'one filée, three stations' },
            ],
        },
        {
            explanation: 'Literary openers worth recognizing: il fut un temps où… · puis vint… · que reste-t-il… · ainsi parla… Each signals fiction or elegy — and a C2 reading passage is near.',
            examples: [
                { fr: 'Il fut un temps où tout semblait simple.', en: 'the classic frame' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'il fut': { en: 'he was (passé simple of être)', pron: 'eel FÜ', type: 'verb', base: { form: 'être', en: 'to be' }, note: 'il fut un temps où… — the literary opener. Pair: il eut = he had.' },
        'il eut': { en: 'he had (passé simple of avoir)', pron: 'eel Ü', type: 'verb', base: { form: 'avoir', en: 'to have' }, note: 'One vowel from il fut — the reading grid\u2019s key pair.' },
        'il alla': { en: 'he went (passé simple of aller)', pron: 'eel ah-LAH', type: 'verb', base: { form: 'aller', en: 'to go' }, note: 'Literary narration: il alla jusqu\u2019au bout.' },
        'il vint': { en: 'he came (passé simple of venir)', pron: 'eel VAN', type: 'verb', base: { form: 'venir', en: 'to come' }, note: 'puis vint… — the inverted narration.' },
        'qu\u2019il vînt': { en: 'that he come (literary subjunctive)', pron: 'kee VAN', type: 'verb', base: { form: 'venir', en: 'to come' }, note: 'imparfait du subjonctif — the circumflex is correct.' },
        'qu\u2019il fût': { en: 'that he were (literary subjunctive)', pron: 'kee FÜ', type: 'verb', base: { form: 'être', en: 'to be' }, note: 'modern: qu\u2019il soit. Survives in fiction and formal prose.' },
        'de source proche du dossier': { en: 'from a source close to the case', pron: 'duh soors prosh dü doh-SYAY', type: 'phrase', register: 'formal', note: 'the press code for an unnamed insider.' },
        'de source concordante': { en: 'from a corroborating source', pron: 'duh soors kohn-kor-DAHN', type: 'phrase', register: 'formal', note: 'several sources agree — slightly stronger than proche du dossier.' },
        'en substance': { en: 'in substance / in essence', pron: 'ahn süb-STAHNSS', type: 'phrase', register: 'formal', note: 'the honest summary frame before the verdict.' },
        'démentir': { en: 'to deny (officially)', pron: 'day-mahn-TEER', type: 'verb', register: 'formal', note: 'le ministère dément — the press verb of denial. Noun: un démenti.' },
        'laisser entendre': { en: 'to imply / let it be understood', pron: 'leh-SAY ahn-TAHN-druh', type: 'expression', register: 'formal', note: 'heavier than suggérer — the deliberate implication.' },
        'métaphore filée': { en: 'extended metaphor', pron: 'may-tah-FOHR fee-LAY', gender: 'feminine', plural: 'métaphores filées', type: 'phrase', register: 'formal', note: 'one image extended across the text: tempête → navire → quai.' },
        'anaphore': { en: 'anaphora (repeated openings)', pron: 'lah-nah-FOHR', gender: 'feminine', plural: 'anaphores', type: 'noun', register: 'formal', note: 'repetition at the start of clauses — momentum device.' },
        'antithèse': { en: 'antithesis', pron: 'ahn-tee-TEHZ', gender: 'feminine', plural: 'antithèses', type: 'noun', register: 'formal', note: 'balanced opposites in one structure: je veux / je refuse.' },
        'chute': { en: 'punchline / final twist', pron: 'lah SHÜT', gender: 'feminine', plural: 'chutes', type: 'noun', note: 'the last sentence that reframes everything; also: a fall.' },
        'oxymore': { en: 'oxymoron', pron: 'ohk-see-MOHR', gender: 'masculine', plural: 'oxymores', type: 'noun', register: 'formal', note: 'un silence assourdissant — two opposites in one phrase.' },
        'conclut': { en: 'concludes (present of conclure)', pron: 'kohn-KLOO', type: 'verb', base: { form: 'conclure', en: 'to conclude' }, note: 'conclut À + noun / conclut QUE + clause — the formal verdict pair.' },
        'cerner': { en: 'to pin down / grasp precisely', pron: 'sair-NAY', type: 'verb', register: 'formal', note: 'cerner un problème, cerner une position — the analyst\u2019s verb.' },
        'imminente': { en: 'imminent (fem)', pron: 'ee-mee-NAHNT', type: 'adjective', masc: { word: 'imminent', en: 'imminent (masc)' }, note: 'press-word for "any day now" without promising a date.' },
        'pourparlers': { en: 'talks / negotiations (in progress)', pron: 'poor-pahr-LAY', gender: 'masculine', type: 'noun', note: 'always plural in this meaning: reprendre les pourparlers.' },
        'procédure': { en: 'procedure', pron: 'proh-say-DÜR', gender: 'feminine', plural: 'procédures', type: 'noun', register: 'formal', note: 'une erreur de procédure — the administrative error vs fraud pair.' },
        'fraude': { en: 'fraud', pron: 'FROHD', gender: 'feminine', plural: 'fraudes', type: 'noun', register: 'formal', note: 'erreur ≠ fraude — the calibrated pair the press must respect.' },
    },
};

// ── C2 · Francophone Variation & Context ────────────────────────────────────
const c2Francophonie: StaticFrenchLesson = {
    title: 'Francophone Variation & Context',
    objective: 'Navigate the French-speaking world without flattening it — map the meals (déjeuner/dîner/souper) across France, Quebec and Belgium, decode Quebec essentials (fin de semaine, cégep, dépanneur), know septante/nonante/huitante, and hear regional accents as accents, not errors.',

    vocabulary: [
        { fr: 'la fin de semaine', en: 'the weekend (Quebec)', pron: 'lah fan duh suh-MEN', gender: 'feminine', register: 'neutral', example: { fr: 'On se voit la fin de semaine ?', en: 'See you on the weekend? (Quebec)' }, related: [{ fr: 'le week-end', en: 'the weekend (France/Europe)' }] },
        { fr: 'le dépanneur', en: 'the convenience store (Quebec)', pron: 'luh day-pah-NUHR', gender: 'masculine', register: 'neutral', example: { fr: 'Je passe au dépanneur acheter du lait.', en: 'I\u2019m popping to the corner store for milk. (Quebec)' }, related: [{ fr: 'l\u2019épicerie', en: 'the grocery store' }] },
        { fr: 'le cégep', en: 'the college between high school and university (Quebec)', pron: 'luh say-GEHP', gender: 'masculine', register: 'neutral', example: { fr: 'Il entre au cégep en sciences.', en: 'He\u2019s entering CEGEP in science. (Quebec)' }, related: [{ fr: 'le lycée', en: 'high school (France)' }] },
        { fr: 'souper', en: 'to have dinner (Quebec) / late supper (France, dated)', pron: 'soo-PAY', type: 'verb', register: 'neutral', example: { fr: 'On soupe à 18 h au Québec.', en: 'We have dinner at 6 pm in Quebec.' }, related: [{ fr: 'dîner', en: 'lunch (Quebec) / dinner (France)' }] },
        { fr: 'septante', en: '70 (Belgium, Switzerland, DRC)', pron: 'sehp-TAHNT', type: 'number', register: 'neutral', example: { fr: 'Il a septante ans — en Belgique.', en: 'He\u2019s seventy — in Belgium.' }, related: [{ fr: 'soixante-dix', en: '70 (France, Canada)' }] },
        { fr: 'nonante', en: '90 (Belgium, Switzerland, DRC)', pron: 'noh-NAHNT', type: 'number', register: 'neutral', example: { fr: 'Le cours coûte nonante euros.', en: 'The course costs ninety euros. (Belgium)' }, related: [{ fr: 'quatre-vingt-dix', en: '90 (France, Canada)' }] },
        { fr: 'huitante', en: '80 (Switzerland, except part of the west)', pron: 'weet-TAHNT', type: 'number', register: 'neutral', example: { fr: 'Huitante pages — en Suisse.', en: 'Eighty pages — in Switzerland.' }, related: [{ fr: 'quatre-vingts', en: '80 (France, Canada, Belgium)' }] },
        { fr: 'la toune', en: 'the song / the car (Quebec slang)', pron: 'lah TOON', gender: 'feminine', register: 'informal', example: { fr: 'Elle a fait une belle toune au spectacle.', en: 'She played a great song at the show. (Quebec)' }, related: [{ fr: 'la chanson', en: 'the song (standard)' }] },
        { fr: 'c\u2019est correct', en: 'it\u2019s fine / all good (Quebec)', pron: 'seh kuh-REHKT', type: 'expression', register: 'informal', example: { fr: '— Désolé pour le retard. — C\u2019est correct.', en: '— Sorry for the delay. — All good. (Quebec)' }, related: [{ fr: 'pas de souci', en: 'no worries (France)' }] },
        { fr: 'checker', en: 'to check / look at (QC anglicism)', pron: 'tshuh-KAY', type: 'verb', register: 'informal', example: { fr: 'Checke ça ! — une toune de malade.', en: 'Check this out! — a crazy good song. (Quebec)' }, related: [{ fr: 'regarder', en: 'to look at (standard)' }] },
        { fr: 'avoir l\u2019air fatigué', en: 'to look tired (air = universal)', pron: 'ah-VWAHR LEHR fah-tee-GAY', type: 'phrase', register: 'neutral', example: { fr: 'Tu as l\u2019air fatigué — partout, on dit pareil.', en: 'You look tired — everywhere, they say it the same.' }, related: [{ fr: 'sembler', en: 'to seem (formal)' }] },
        { fr: 'l\u2019accent', en: 'the accent', pron: 'lahk-SAHN', gender: 'masculine', register: 'neutral', example: { fr: 'Un accent n\u2019est pas une faute : c\u2019est une adresse.', en: 'An accent is not a mistake: it\u2019s an address.' }, related: [{ fr: 'l\u2019intonation', en: 'the intonation' }] },
    ],

    pronunciation: [
        { fr: 'dépanneur', approx: 'day-pah-NUHR', en: 'Quebec keeps the final r strong: "day-pah-NURR"' },
        { fr: 'septante', approx: 'sehp-TAHNT', en: 'final -ante = "TAHNT" nasal-free' },
        { fr: 'huitante', approx: 'weet-TAHNT', en: 'the h is silent: "weet"' },
        { fr: 'c\u2019est correct', approx: 'seh kuh-REHKT', en: 'Quebec tends to keep final consonants audible' },
        { fr: 'la toune', approx: 'lah TOON', en: 'from English tune — anglicism integrated' },
        { fr: 'cégep', approx: 'say-GEHP', en: 'final p IS pronounced in Quebec — acronym of C.E.G.E.P.' },
    ],

    grammar: {
        rule: 'Variation lives in four drawers: MEALS (déjeuner/dîner/souper shift meaning by country), NUMBERS (septante/nonante/huitante vs soixante-dix/quatre-vingts), INSTITUTIONS (cégep, lycée, collège), and REGISTER (c\u2019est correct vs pas de souci). Understand all; speak the one your interlocutor lives in.',
        explanation: 'The meal table is the classic trap: in FRANCE déjeuner = lunch and dîner = dinner (petit-déjeuner = breakfast); in QUEBEC déjeuner = breakfast, dîner = lunch, souper = dinner — the old French system, preserved across the Atlantic. Numbers: France and Canada do soixante-dix / quatre-vingts / quatre-vingt-dix; Belgium and much of Francophone Africa do septante / quatre-vingts (or quarante-vingts historically) / nonante; Switzerland does huitante for 80 and septante/nonante. Institutions: cégep (Quebec\u2019s two-year college), collège (France\u2019s middle school — NOT college!), lycée (high school). Quebec speech keeps final consonants (cégep\u2019s p), borrows happily (la toune, checker), and stamps politeness with c\u2019est correct and fait que. The C2 competence is double: decode everything, produce locally — on the TCF Canada, Quebec usage is home ground; quoting Belgicisms can charm, mixing them carelessly (souper for dinner in a Paris essay) reads as a slip.',
        examples: [
            { fr: 'Au Québec : le déjeuner à 7 h, le dîner à 12 h, le souper à 18 h. En France : le petit-déjeuner, le déjeuner, le dîner.', en: 'In Quebec: breakfast at 7, lunch at noon, dinner at 6. In France: petit-déjeuner, déjeuner, dîner.', breakdown: ['same three words, shifted by one meal', 'the old French system survived overseas', 'context decides, not the dictionary'] },
            { fr: 'En Belgique : septante euros (70) ; en Suisse : huitante pages (80) ; au Québec comme en France : quatre-vingt-dix (90) — mais nonante en Belgique.', en: 'In Belgium: septante euros (70); in Switzerland: huitante pages (80); in Quebec as in France: quatre-vingt-dix (90) — but nonante in Belgium.', breakdown: ['three number systems, one language', 'Belgium: septante/nonante', 'Switzerland: huitante; France/Canada: the compounds'] },
            { fr: 'Après le secondaire, au Québec on entre au cégep ; en France, au lycée puis à la fac.', en: 'After high school, in Quebec you enter CEGEP; in France, lycée then university.', breakdown: ['cégep = Quebec institution', 'lycée = French high school', 'collège (France) = MIDDLE school — false friend of "college"'] },
            { fr: '— Désolé, j\u2019arrive en retard. — C\u2019est correct, on n\u2019a rien commencé.', en: '— Sorry I\u2019m late. — All good, we haven\u2019t started. (Quebec politeness)', breakdown: ['c\u2019est correct = Quebec pas de souci', 'double négation: rien commencé', 'register: casual, warm'] },
            { fr: 'Elle a checké la toune en français — un anglicisme assumé au Québec, une gaucherie à Paris.', en: 'She checked out the song in French — an owned anglicism in Quebec, a stumble in Paris.', breakdown: ['checké = borrowed verb', 'toune = song (Quebec)', 'the SAME word, two verdicts by country'] },
            { fr: 'Il a l\u2019accent du Sud-Ouest ; elle, un léger accent québécois — deux adresses, pas deux erreurs.', en: 'He has a South-West accent; she, a light Quebec accent — two addresses, not two mistakes.', breakdown: ['accent = address, not error', 'léger = light (non-judgemental)', 'the C2 stance on variation'] },
        ],
        commonMistakes: [
            'Using souper for dinner in a France-facing text: in France souper is dated/regional (a late supper). The TCF Canada wants Quebec usage; a France essay wants dîner.',
            'Translating collège as "college": in France, collège = middle school (ages 11–15); university is la fac / l\u2019université.',
            'Assuming septante is "wrong" or folksy: it is the standard 70 in Belgium, Switzerland, DRC — pluricentric French has several correct answers.',
            'Hearing a Quebec accent as an error to fix: dépanneur, c\u2019est correct, fait que are system, not sloppiness — the exam tests comprehension, not correction.',
        ],
    },

    transformations: [
        { type: 'France', fr: 'À midi, on déjeune ; à 20 h, on dîne.', en: 'At noon, we have lunch; at 8 pm, dinner. (France)' },
        { type: 'Quebec', fr: 'À midi, on dîne ; à 18 h, on soupe.', en: 'At noon, we have lunch; at 6 pm, dinner. (Quebec)' },
        { type: 'France/Canada', fr: 'Il a quatre-vingt-dix ans.', en: 'He\u2019s ninety. (France, Canada)' },
        { type: 'Belgique', fr: 'Il a nonante ans.', en: 'He\u2019s ninety. (Belgium, DRC)' },
        { type: 'France', fr: 'Il entre au lycée l\u2019an prochain.', en: 'He\u2019s entering high school next year. (France)' },
        { type: 'Quebec', fr: 'Il entre au cégep l\u2019an prochain.', en: 'He\u2019s entering CEGEP next year. (Quebec)' },
        { type: 'France', fr: 'Pas de souci, on attend.', en: 'No worries, we\u2019ll wait. (France)' },
        { type: 'Quebec', fr: 'C\u2019est correct, on attend.', en: 'All good, we\u2019ll wait. (Quebec)' },
    ],

    sentenceBuilding: [
        { fr: 'La francophonie n\u2019est pas un seul français.', en: 'La Francophonie is not one single French.' },
        { fr: 'La francophonie n\u2019est pas un seul français : elle se décline en accents, en repas et en chiffres.', en: 'La Francophonie is not one single French: it comes in accents, meals, and numbers.' },
        { fr: 'Au Québec, on déjeune tôt, on dîne à midi et on soupe à 18 h ; à Paris, le dîner n\u2019arrive qu\u2019à 20 h.', en: 'In Quebec, breakfast comes early, lunch at noon and dinner at 6 pm; in Paris, dinner only arrives at 8 pm.' },
        { fr: 'Additionnez en Belgique — septante et nonante — et vous verrez que les mathématiques, elles, ne changent pas.', en: 'Do the sums in Belgium — septante and nonante — and you\u2019ll see the math itself doesn\u2019t change.' },
        { fr: 'Bref, un accent n\u2019est pas une faute : c\u2019est une adresse — et la francophonie est pleine d\u2019adresses.', en: 'In short, an accent is not a mistake: it\u2019s an address — and la Francophonie is full of addresses.' },
    ],

    practice: [
        { instruction: 'Which country?', question: 'On soupe à 18 h.', answer: 'Quebec — souper = dinner there (dated late supper in France)' },
        { instruction: 'Which number system?', question: 'nonante étudiants', answer: 'Belgium / DRC (and Swiss French) — 90; France/Canada: quatre-vingt-dix' },
        { instruction: 'Decode the institution:', question: 'Il entre au cégep en sciences de la nature.', answer: 'Quebec\u2019s two-year college between high school and university' },
        { instruction: 'False friend:', question: 'In France, un collège is…', answer: 'middle school (11–15) — NOT college; university = la fac' },
        { instruction: 'Decode the politeness:', question: '— Désolé. — C\u2019est correct.', answer: 'Quebec: all good / no problem; France: pas de souci' },
        { instruction: 'C2 stance:', question: 'Un accent québécois dans un texte officiel ?', answer: 'An accent is an address, not a mistake — comprehension, not correction' },
    ],

    translationPractice: [
        { en: 'See you on the weekend. (Quebec way)', fr: 'On se voit la fin de semaine ?' },
        { en: 'I\u2019m popping to the corner store for milk. (Quebec way)', fr: 'Je passe au dépanneur acheter du lait.' },
        { en: 'He\u2019s seventy years old. (Belgian way)', fr: 'Il a septante ans.' },
        { en: 'We\u2019re having dinner at six. (Quebec way)', fr: 'On soupe à 18 h.' },
        { en: '— Sorry for the delay. — All good. (Quebec way)', fr: '— Désolé pour le retard. — C\u2019est correct.' },
        { en: 'An accent is not a mistake: it\u2019s an address.', fr: 'Un accent n\u2019est pas une faute : c\u2019est une adresse.' },
    ],

    reverseTranslation: [
        { fr: 'En Suisse, ce manuel fait huitante pages.', en: 'In Switzerland, this textbook is eighty pages.' },
        { fr: 'Elle a fait une belle toune au spectacle.', en: 'She played a great song at the show. (Quebec)' },
        { fr: 'Après le secondaire, direction le cégep.', en: 'After high school, off to CEGEP. (Quebec)' },
        { fr: 'Fait que, check, on s\u2019en va. (Quebec casual)', en: 'So, like, we\u2019re off. (Quebec)' },
    ],

    register: {
        informal: 'Fait que, check, on se rejoint au dépanneur et on va souper chez Léa. (full Quebec casual stack)',
        neutral: 'On se voit la fin de semaine au dépanneur, puis on soupe chez Léa.',
        formal: 'La diversité de la francophonie — lexicales, phonétiques, institutionnelles — n\u2019est pas un écart à corriger mais un patrimoine à reconnaître.',
    },

    culture: 'La Francophonie is also an institution: the OIF (Organisation internationale de la Francophonie) counts over 300 million speakers across five continents — Canada, Belgium, Switzerland, Senegal, Côte d\u2019Ivoire, DRC, Vietnam\u2019s francophone heritage and more. The TCF Canada\u2019s listening deliberately includes Quebec voices, and its reading texts sometimes borrow Belgian or African sources: the exam rewards you for treating every variety as standard somewhere. One rule to keep: within a single text, stay in one variety — switching souper/dîner mid-essay reads as confusion, not culture.',

    freeProduction: 'Write a dialogue (10–14 exchanges) between a Parisian and a Québécois planning a dinner: each uses their own meal words, one Quebec filler (fait que / c\u2019est correct), one Belgian number for the bill, and end on the address line (un accent, une adresse). Then record it once in each accent you can imitate — lightly, respectfully.',

    miniTest: [
        { question: 'Au Québec, le souper is:', options: ['breakfast', 'lunch', 'dinner', 'a snack'], answer: 'dinner — the old French system preserved' },
        { question: 'Nonante is 90 in:', options: ['France', 'Belgium', 'Quebec', 'nowhere'], answer: 'Belgium (and DRC, Swiss French) — France/Canada: quatre-vingt-dix' },
        { question: 'Le cégep is:', options: ['a French high school', 'a Quebec college', 'a Swiss gym', 'a store'], answer: 'a Quebec college — between high school and university' },
        { question: 'In France, un collège is:', options: ['university', 'high school', 'middle school', 'a café'], answer: 'middle school (11–15) — the false friend' },
        { question: 'C\u2019est correct is the Quebec twin of:', options: ['c\u2019est juste', 'pas de souci', 'c\u2019est fini', 'c\u2019est fou'], answer: 'pas de souci — the no-problem stamp' },
    ],

    review: [
        'The casual particles from C1:oral-implicite get a Quebec layer here: fait que (du coup), check (like), pantoute (pas du tout).',
        'The number words from A1:numbers have pluricentric answers — soixante-dix / septante, quatre-vingt-dix / nonante.',
    ],

    traps: [
        'The meal words shift by country: déjeuner = lunch (France) but breakfast (Quebec); souper = dated late supper (France) but dinner (Quebec). Always ask: which side of the Atlantic?',
        'collège ≠ college: French collège is middle school; university is la fac. This false friend appears in every C2 reading about education.',
        'septante/nonante/huitante are standard somewhere — calling them "mistakes" is the actual mistake. But keep ONE system per text.',
        'Quebec final consonants (cégep) and anglicisms (checké, la toune) are system, not sloppiness — decode, don\u2019t correct.',
    ],

    homework: {
        intro: 'Every item maps a variation: meals, numbers, institutions, politeness stamps. Name the country before you answer.',
        translation: [
            { prompt: 'See you on the weekend. (Quebec)', answer: 'On se voit la fin de semaine ?', alt: ['On se voit la fin de semaine'], explanation: 'fin de semaine = the Quebec weekend; France/Europe: le week-end.' },
            { prompt: 'I\u2019m going to the corner store for milk. (Quebec)', answer: 'Je passe au dépanneur acheter du lait.', explanation: 'dépanneur = Quebec convenience store; in France un dépanneur is a repairman — the false friend.' },
            { prompt: 'We\u2019re having dinner at six tonight. (Quebec)', answer: 'On soupe à 18 h ce soir.', explanation: 'souper = dinner in Quebec; in France it would read as a dated late supper.' },
            { prompt: 'He\u2019s ninety years old. (Belgian way)', answer: 'Il a nonante ans.', explanation: 'Belgium/DRC/Swiss French: nonante. France/Canada: quatre-vingt-dix.' },
            { prompt: '— Sorry I\u2019m late. — All good. (Quebec)', answer: '— Désolé pour le retard. — C\u2019est correct.', explanation: 'the Quebec no-problem stamp; France: pas de souci.' },
            { prompt: 'An accent is not a mistake: it\u2019s an address.', answer: 'Un accent n\u2019est pas une faute : c\u2019est une adresse.', explanation: 'The C2 stance sentence — variation as identity, not error.' },
        ],
        blanks: [
            { prompt: 'Au Québec, le matin, on prend le ______. (breakfast)', answer: 'déjeuner', explanation: 'Quebec system: déjeuner = breakfast, dîner = lunch, souper = dinner.' },
            { prompt: 'En Belgique, ce cours coûte ______ euros. (70)', answer: 'septante', explanation: 'Belgium: septante; France/Canada: soixante-dix.' },
            { prompt: 'En Suisse, le manuel fait ______ pages. (80)', answer: 'huitante', explanation: 'Swiss French: huitante; France/Canada/Belgium: quatre-vingts.' },
            { prompt: 'Après le secondaire, il entre au ______ en sciences. (Quebec college)', answer: 'cégep', explanation: 'cégep = the Quebec two-year college; the final p is pronounced.' },
            { prompt: 'En France, un ______ est un établissement pour les 11-15 ans. (false friend)', answer: 'collège', explanation: 'collège = middle school in France; university = la fac / l\u2019université.' },
            { prompt: 'Un accent n\u2019est pas une faute : c\u2019est une ______.', answer: 'adresse', explanation: 'The C2 sentence: variation is an address, not an error.' },
        ],
        corrections: [
            { prompt: 'À Paris, on soupe à 18 h au restaurant d\u2019entreprise.', answer: 'À Paris, on dîne à midi à la cantine ; le dîner, c\u2019est le soir.', explanation: 'How the mistake happens: exporting the Quebec meal system to France. Why it does not work: in France, souper is dated/regional and 18 h dinner is early. How to fix it: French system — déjeuner (lunch), dîner (dinner); cantine for the workplace meal.' },
            { prompt: 'Après le collège, il est entré à l\u2019université à 12 ans.', answer: 'Après le collège (11-15 ans), il est entré au lycée, puis à l\u2019université.', explanation: 'How the mistake happens: the collège-college false friend. Why it does not work: collège = middle school in France. How to fix it: lycée between collège and université.' },
            { prompt: 'Il a septante ans — c\u2019est du français incorrect.', answer: 'Il a septante ans — c\u2019est le standard en Belgique et en Suisse francophone.', explanation: 'How the mistake happens: judging pluricentric forms by one country. Why it does not work: septante is standard in several countries. How to fix it: recognize the system behind the word; within one text, pick one system and hold it.' },
            { prompt: 'Le dépanneur a réparé ma voiture. (Quebec context intended)', answer: 'Le garagiste a réparé ma voiture. / (Quebec: j\u2019ai passé au dépanneur pour du lait.)', explanation: 'How the mistake happens: reading dépanneur as "repairman" in Quebec, or "store" in France. Why it does not work: the word flips by country — store (Quebec) vs repairman (France). How to fix it: choose by side of the Atlantic; garagiste for the repairman.' },
            { prompt: 'Ton accent est faux, tu devrais le corriger.', answer: 'Ton accent est le tien — c\u2019est une adresse, pas une faute.', explanation: 'How the mistake happens: treating accent as defect. Why it does not work: accents are systematic, identity-bearing — and the exam tests comprehension. How to fix it: describe, don\u2019t prescribe.' },
        ],
        writing: {
            task: 'Write a dialogue (10–14 exchanges) between a Parisian and a Québécois planning a shared dinner: each keeps their OWN meal words (dîner vs souper), the Quebec side uses two markers (fin de semaine, c\u2019est correct, fait que, dépanneur), the bill is settled with a Belgian number (nonante), and the final exchange lands the address line. Then add a one-paragraph note explaining each variation you used.',
            requirements: [
                'Meal words consistent with each speaker\u2019s country',
                'Two Quebec markers used naturally',
                'One Belgian/Swiss number',
                'One institution word (cégep or collège) used correctly',
                'Final note: 3–4 sentences naming the variations',
            ],
            minWords: 110,
        },
        checklist: [
            'I map the meals: France (déjeuner=lunch, dîner=dinner) vs Quebec (déjeuner=breakfast, dîner=lunch, souper=dinner)',
            'I know the number systems: soixante-dix/quatre-vingt-dix vs septante/nonante vs huitante',
            'I keep institutions straight: cégep (QC), lycée + collège (FR), la fac (university)',
            'I decode Quebec politeness (c\u2019est correct) and fillers (fait que, check, pantoute)',
            'I treat accents as addresses, not errors — and never correct them unprompted',
            'I hold ONE variety per text instead of mixing systems',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The meal table (the exam\u2019s favourite): FRANCE — petit-déjeuner / déjeuner / dîner. QUEBEC — déjeuner / dîner / souper (the old French system). Belgium mostly follows France; souper persists regionally as the evening meal.',
            examples: [
                { fr: 'On dîne à midi (QC) = On déjeune à midi (FR).', en: 'same hour, two words' },
            ],
        },
        {
            explanation: 'Numbers by country: FRANCE/CANADA — soixante-dix, quatre-vingts, quatre-vingt-dix; BELGIQUE/RDC — septante, quatre-vingts, nonante; SUISSE — septante, huitante, nonante. Octante is archaic.',
            examples: [
                { fr: '70 = soixante-dix (FR/QC) = septante (BE/CH/RDC).', en: 'three systems, one sum' },
            ],
        },
        {
            explanation: 'Institutions: cégep (QC — two-year college) · lycée (FR — high school) · collège (FR — middle school!) · la fac (university) · secondaire (QC — high school). The collège false friend appears in every education text.',
            examples: [
                { fr: 'Il entre au cégep (QC) = Il entre au lycée (FR) après le secondaire/collège.', en: 'parallel tracks' },
            ],
        },
        {
            explanation: 'Quebec essentials: fin de semaine (weekend) · dépanneur (corner store) · toune (song) · c\u2019est correct (all good) · fait que (so) · pantoute (not at all) · check (like). System, not slang to fix.',
            examples: [
                { fr: 'Fait que, on se rejoint au dépanneur la fin de semaine.', en: 'four markers in one sentence' },
            ],
        },
        {
            explanation: 'False friends of the francophone world: dépanneur (QC store / FR repairman) · collège (FR middle school / EN college) · gosses (FR kids / QC vulgar) · brunante (QC dusk). Check the map before judging the word.',
            examples: [
                { fr: 'Le dépanneur ferme tard (QC). · Le dépanneur a réglé le four (FR).', en: 'one word, two jobs' },
            ],
        },
        {
            explanation: 'The C2 stance: describe, don\u2019t prescribe. A text may be québécois, belge, ivoirien or hexagonal — all standard somewhere. Within YOUR text, keep one variety and name it in the note if you switch.',
            examples: [
                { fr: 'Un accent n\u2019est pas une faute : c\u2019est une adresse.', en: 'the sentence to remember' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'fin de semaine': { en: 'weekend (Quebec)', pron: 'fan duh suh-MEN', gender: 'feminine', plural: 'fins de semaine', type: 'phrase', note: 'Quebec for le week-end; the older French form kept alive overseas.' },
        'dépanneur': { en: 'convenience store (QC) / repairman (FR)', pron: 'day-pah-NUHR', gender: 'masculine', plural: 'dépanneurs', type: 'noun', note: 'THE false friend: store in Quebec, repairman in France.' },
        'cégep': { en: 'Quebec two-year college', pron: 'say-GEHP', gender: 'masculine', plural: 'cégeps', type: 'noun', note: 'acronym of Collège d\u2019enseignement général et professionnel; final p pronounced.' },
        'souper': { en: 'to have dinner (QC) / late supper (FR, dated)', pron: 'soo-PAY', type: 'verb', note: 'the old French system preserved in Quebec; noun: le souper.' },
        'septante': { en: '70 (BE/CH/RDC)', pron: 'sehp-TAHNT', type: 'number', note: 'standard in Belgium, Swiss French, DRC; France/Canada: soixante-dix.' },
        'nonante': { en: '90 (BE/CH/RDC)', pron: 'noh-NAHNT', type: 'number', note: 'standard in Belgium, Swiss French, DRC; France/Canada: quatre-vingt-dix.' },
        'huitante': { en: '80 (Swiss French)', pron: 'weet-TAHNT', type: 'number', note: 'Switzerland (except part of the west); France/Canada/Belgium: quatre-vingts.' },
        'toune': { en: 'song (QC slang)', pron: 'TOON', gender: 'feminine', plural: 'tounes', type: 'noun', register: 'informal', note: 'from English tune; also an old Quebec word for a car.' },
        'c\u2019est correct': { en: 'all good (QC)', pron: 'seh kuh-REHKT', type: 'expression', register: 'informal', note: 'the Quebec pas de souci; warm, casual.' },
        'fait que': { en: 'so (QC)', pron: 'FEH kuh', type: 'expression', register: 'informal', note: 'short for ça fait que — the Quebec du coup.' },
        'pantoute': { en: 'not at all (QC)', pron: 'pahn-TOOT', type: 'expression', register: 'informal', note: 'pas du tout, Quebec-style; pantoute ≠ en tout (verlan look-alike).' },
        'brunante': { en: 'dusk (QC)', pron: 'brü-NAHNT', gender: 'feminine', type: 'noun', note: 'à la brunante = at dusk — a poetic Quebec hour-word.' },
        'cantine': { en: 'canteen / workplace restaurant', pron: 'kahn-TEEN', gender: 'feminine', plural: 'cantines', type: 'noun', note: 'manger à la cantine — the French workplace/school meal.' },
        'garagiste': { en: 'garage mechanic / garage owner', pron: 'gah-rah-ZEEST', gender: 'mf', type: 'noun', note: 'the repairman — what France calls the person a Quebecer might wrongly expect dépanneur to mean.' },
        'secondaire': { en: 'secondary school (QC) / secondary (adj)', pron: 'suh-kohn-DAIR', gender: 'masculine', type: 'noun', note: 'le secondaire = Quebec high school; en France: le lycée.' },
        'patrimoine': { en: 'heritage', pron: 'pah-tree-MWAH', gender: 'masculine', plural: 'patrimoines', type: 'noun', register: 'formal', note: 'un patrimoine à reconnaître — the heritage framing of variation.' },
        'écart': { en: 'gap / deviation', pron: 'ay-KAHR', gender: 'masculine', plural: 'écarts', type: 'noun', note: 'un écart à corriger vs un patrimoine — the two framings of variation.' },
        'hexagonal': { en: 'mainland-French (of France proper)', pron: 'ehk-sah-goh-NAHL', type: 'adjective', fem: { word: 'hexagonale', en: 'mainland-French (fem)' }, note: 'français hexagonal = the France-standard variety — a neutral, useful label.' },
        'pluricentrique': { en: 'pluricentric (several standards)', pron: 'plü-ree-sahn-TREEK', type: 'adjective', note: 'le français pluricentrique — the linguistic term for one language, several norms.' },
        'OIF': { en: 'Organisation internationale de la Francophonie', pron: 'oh-ee-ehf', gender: 'feminine', type: 'noun', register: 'formal', note: 'the institution behind the Summit of La Francophonie; 300+ million speakers.' },
    },
};

export const STATIC_C2_PART1: Record<string, StaticFrenchLesson> = {
    'C2:style': c2Style,
    'C2:litteraire': c2Litteraire,
    'C2:francophonie': c2Francophonie,
};
