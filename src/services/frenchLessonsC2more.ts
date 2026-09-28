// C2 lectures part 2 — Rhetoric, Allusion & Irony; Long-Form Synthesis &
// Commentary. Same gold-standard format. Extras in frenchLessonExtras.ts.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── C2 · Rhetoric, Allusion & Irony ─────────────────────────────────────────
const c2Rhetorique: StaticFrenchLesson = {
    title: 'Rhetoric, Allusion & Irony',
    objective: 'Dissect dense public discourse like a correcteur — name the device (prétérition, gradation, chiasme, parataxe), decode the allusion (historical, biblical, literary), and read irony in structure rather than in tone: what is claimed, what is repeated, what is conspicuously left out.',

    vocabulary: [
        { fr: 'la prétérition', en: 'pretending not to say what you say', pron: 'lah pray-tay-ree-SYOHN', gender: 'feminine', register: 'formal', example: { fr: 'Je ne vous parlerai pas de son courage…', en: 'I shall not speak of his courage… (speaking of it)' }, related: [{ fr: 'l\u2019insinuation', en: 'the insinuation' }] },
        { fr: 'la gradation', en: 'gradation / climax (rising series)', pron: 'lah grah-dah-SYOHN', gender: 'feminine', register: 'formal', example: { fr: 'C\u2019est le nez qui…, c\u2019est le menton…, c\u2019est le cou (Cyrano).', en: 'It\u2019s the nose…, the chin…, the neck (Cyrano\u2019s rising list).' }, related: [{ fr: 'l\u2019énumération', en: 'the enumeration' }] },
        { fr: 'le chiasme', en: 'chiasmus (ABBA structure)', pron: 'luh kyah-smuh', gender: 'masculine', register: 'formal', example: { fr: 'Il faut manger pour vivre et non vivre pour manger.', en: 'One must eat to live, not live to eat (Molière).' }, related: [{ fr: 'le parallélisme', en: 'parallelism' }] },
        { fr: 'la parataxe', en: 'parataxis (short clauses, no connectives)', pron: 'lah pah-rah-TAHKSS', gender: 'feminine', register: 'formal', example: { fr: 'Je suis venu, j\u2019ai vu, j\u2019ai vaincu.', en: 'I came, I saw, I conquered.' }, related: [{ fr: 'l\u2019asyndète', en: 'asyndeton (no ands)' }] },
        { fr: 'l\u2019hyperbole', en: 'hyperbole', pron: 'lee-pair-boh-LEUH → leez payr-boh-LEUH', gender: 'feminine', register: 'formal', example: { fr: 'Mourir de rire, expirer sous une montagne de papiers.', en: 'Dying of laughter, suffocating under a mountain of paperwork.' }, related: [{ fr: 'l\u2019exagération', en: 'exaggeration (plain)' }] },
        { fr: 'l\u2019allusion', en: 'the allusion (untold reference)', pron: 'lah-lü-ZYOHN', gender: 'feminine', register: 'formal', example: { fr: 'Un 18 Juin dans le discours — l\u2019allusion est claire.', en: 'A "June 18th" in the speech — the allusion is clear.' }, related: [{ fr: 'la référence', en: 'the reference (explicit)' }] },
        { fr: 'l\u2019ironie de structure', en: 'structural irony (in the arrangement)', pron: 'lee-roh-NEE duh sür-kü-TÜR', gender: 'feminine', register: 'formal', example: { fr: 'Trois éloges, puis un « cependant » : l\u2019ironie est dans l\u2019architecture.', en: 'Three praises, then a "however": the irony is in the architecture.' }, related: [{ fr: 'le second degré', en: 'the second degree (implicit layer)' }] },
        { fr: 'le second degré', en: 'the second degree (what is really meant)', pron: 'luh suh-KOHN duh-GREH', gender: 'masculine', register: 'neutral', example: { fr: 'Tout le communiqué est au second degré.', en: 'The whole statement is tongue-in-cheek.' }, related: [{ fr: 'le premier degré', en: 'the literal level' }] },
        { fr: 'la visée', en: 'the aim / purpose (of a text)', pron: 'lah vee-ZAY', gender: 'feminine', register: 'formal', example: { fr: 'La visée du texte est polémique.', en: 'The text\u2019s aim is polemical.' }, related: [{ fr: 'l\u2019intention', en: 'the intention' }] },
        { fr: 'sous-entendu', en: 'understood but unspoken', pron: 'soo-zahn-tahn-DÜ', gender: 'masculine', plural: 'sous-entendus', register: 'neutral', example: { fr: 'Les sous-entendus portent plus que les mots.', en: 'The implications carry more than the words.' }, related: [{ fr: 'l\u2019implicite', en: 'the implicit' }] },
        { fr: 'prendre au premier degré', en: 'to take literally (the classic C2 mistake)', pron: 'prahn-druh oh pruh-MYEH duh-GREH', type: 'phrase', register: 'neutral', example: { fr: 'Ne prenez pas tout au premier degré.', en: 'Don\u2019t take everything literally.' }, related: [{ fr: 'au second degré', en: 'with a wink' }] },
        { fr: 'l\u2019éloge', en: 'the praise / eulogy', pron: 'lay-LOHZH', gender: 'masculine', plural: 'éloges', register: 'formal', example: { fr: 'Trois éloges avant le « cependant » fatal.', en: 'Three praises before the fatal "however".' }, related: [{ fr: 'le blâme', en: 'the blame (opposite)' }] },
    ],

    pronunciation: [
        { fr: 'prétérition', approx: 'pray-tay-ree-SYOHN', en: 'five syllables, stress on -TION' },
        { fr: 'chiasme', approx: 'KYAH-smuh', en: 'the ch = "k" — Greek heritage' },
        { fr: 'parataxe', approx: 'pah-rah-TAHKSS', en: 'final x silent: "TAHKS"' },
        { fr: 'l\u2019hyperbole', approx: 'leez-pair-BOHL', en: 'French says "eez-pair-BOHL" — h mute, s liaises' },
        { fr: 'second degré', approx: 'suh-GOHN duh-GREH', en: 'the g of second sounds "zh" — "suh-ZOHN"' },
        { fr: 'éloge', approx: 'ay-LOHZH', en: 'final -ge = "zh"' },
    ],

    grammar: {
        rule: 'Irony at C2 lives in STRUCTURE: the prétérition announces what it delivers (je ne parlerai pas de…), the éloge-then-cependant flip, the repetition that becomes mockery, and the conspicuous omission. Name the device, then state its effect (la visée).',
        explanation: 'The devices form a toolbox, each with a job: PRÉTÉRITION — deny speaking of X while speaking of it at length (je ne vous parlerai pas de son courage — courage just got a paragraph); GRADATION — a rising series that ends on the point (Cyrano\u2019s nose monologue); CHIASME — ABBA mirror (manger pour vivre / vivre pour manger — the reversal IS the argument); PARATAXE — clipped clauses, no connectives (veni vidi vici: inevitability through rhythm); HYPERBOLE — excess that signals either passion or mockery (depending on context); ANTITHÈSE — balanced opposites. Allusion types: HISTORICAL (un 18 Juin = De Gaulle\u2019s 1940 appeal), BIBLICAL/CLASSICAL (un chant des sirènes, la boîte de Pandore, un talon d\u2019Achille), LITERARY (un Horla, une boîte de Pandore). The examiner\u2019s question is never "what device?" but "what does the device DO?" — answer with la visée: the text polémique, élogieuse, mélancolique. The éloge-cependant flip is structural irony\u2019s favourite: three lines of praise, one mais, and the praise was the setup.',
        examples: [
            { fr: 'Je ne vous ferai pas l\u2019injure de rappeler les dépassements de budget — vous les avez subis.', en: 'I shall not insult you by recalling the budget overruns — you lived them.', breakdown: ['prétérition: denying the recall while performing it', 'l\u2019injure = the insult (formal)', 'the subordinated clause does the damage'] },
            { fr: 'Il est ponctuel ; il est prévenant ; il est, dirons-nous, créatif avec les chiffres.', en: 'He is punctual; he is considerate; he is, shall we say, creative with the numbers.', breakdown: ['gradation of praise', 'dirons-nous = the modal wink', 'créatif = euphemistic irony (fudging)'] },
            { fr: 'Ce n\u2019est pas une réforme, c\u2019est une abdication ; ce n\u2019est pas un plan, c\u2019est une prière.', en: 'It is not a reform, it is an abdication; it is not a plan, it is a prayer.', breakdown: ['antithèse × 2', 'parataxe = no connectors', 'the rhythm carries the verdict'] },
            { fr: 'Un 18 Juin au micro, des mots de Londres — chacun a compris l\u2019allusion.', en: 'A June 18th at the microphone, words of London — everyone understood the allusion.', breakdown: ['historical allusion (De Gaulle, 1940)', 'the date does the citing', 'no source named — by design'] },
            { fr: 'Le communiqué salue « une transparence exemplaire » : le rapport, lui, compte 47 pages de annexes confidentielles.', en: 'The statement hails "exemplary transparency": the report, for its part, counts 47 pages of confidential annexes.', breakdown: ['scare-quotes = first irony', 'the counter-fact = structural irony', 'salue = hails (ironic verb)'] },
            { fr: 'Chacun sa méthode : elle corrige les copies ; il corrige les statistiques.', en: 'To each their method: she grades the papers; he grades the statistics.', breakdown: ['chiasme-like reversal (corrige × 2)', 'the parallel exposes the fraud', 'chacun sa… = proverb frame'] },
        ],
        commonMistakes: [
            'Naming the device but not its effect: "c\u2019est une prétérition" scores half — the graded answer is "la prétérition permet d\u2019insister sur le courage tout en feignant la retenue".',
            'Taking éloges at face value: in polemical texts, praise before mais is the trap — read the connector before trusting the adjective.',
            'Missing the allusion\u2019s source culture: un chant des sirènes needs the Odyssey; un 18 Juin needs 1940 — C2 texts assume a shared cultural shelf.',
            'Confusing irony with sarcasm: sarcasm attacks a person bluntly; irony operates through structure and can be affectionate (l\u2019ironie bienveillante).',
        ],
    },

    transformations: [
        { type: 'Direct praise', fr: 'Son courage était remarquable.', en: 'His courage was remarkable.' },
        { type: 'Prétérition', fr: 'Je ne vous parlerai pas de son courage…', en: 'I shall not speak of his courage… (speaking of it)' },
        { type: 'Plain list', fr: 'Il est ponctuel, prévenant et inventif avec les chiffres.', en: 'He is punctual, considerate and inventive with figures.' },
        { type: 'Gradation + wink', fr: 'Il est ponctuel ; prévenant ; créatif, dirons-nous, avec les chiffres.', en: 'Punctual; considerate; creative, shall we say, with figures.' },
        { type: 'Statement', fr: 'Ce n\u2019est pas une réforme.', en: 'It is not a reform.' },
        { type: 'Antithèse', fr: 'Ce n\u2019est pas une réforme, c\u2019est une abdication.', en: 'It is not a reform, it is an abdication.' },
        { type: 'Citation', fr: 'Comme disait De Gaulle en 1940…', en: 'As De Gaulle said in 1940… (explicit)' },
        { type: 'Allusion', fr: 'Un 18 Juin au micro…', en: 'A June 18th at the microphone… (implicit)' },
    ],

    sentenceBuilding: [
        { fr: 'Le discours s\u2019ouvre sur trois éloges.', en: 'The speech opens on three praises.' },
        { fr: 'Le discours s\u2019ouvre sur trois éloges — ponctuel, travailleur, loyal.', en: 'The speech opens on three praises — punctual, hard-working, loyal.' },
        { fr: 'Trois éloges, donc : ponctuel, travailleur, loyal. Puis un « cependant » retentit, et tout s\u2019inverse.', en: 'Three praises, then: punctual, hard-working, loyal. Then a "however" resounds, and everything flips.', breakdown: ['the éloge-cependant flip staged'] },
        { fr: 'Car c\u2019est là toute l\u2019ironie de structure : ce qu\u2019on loue d\u2019abord sert d\u2019appui à ce qu\u2019on accuse ensuite.', en: 'For there lies the whole structural irony: what is praised first props up what is accused next.', breakdown: ['the device explained in the text itself'] },
        { fr: 'Et la chute de tomber, froide : « Loyal, disons-le, envers ceux qui le payent. »', en: 'And the punchline falls, cold: "Loyal, let us say, to those who pay him."', breakdown: ['chute + quotation', 'the litote in the quote'] },
    ],

    practice: [
        { instruction: 'Name the device:', question: 'Je ne vous parlerai pas de son courage…', answer: 'prétérition — denying while delivering' },
        { instruction: 'Name the device:', question: 'Il faut manger pour vivre et non vivre pour manger.', answer: 'chiasme — ABBA mirror (Molière)' },
        { instruction: 'Name the device:', question: 'Je suis venu, j\u2019ai vu, j\u2019ai vaincu.', answer: 'parataxe — clipped inevitability' },
        { instruction: 'Decode the allusion:', question: 'Un discours, un 18 Juin, des mots depuis Londres.', answer: 'De Gaulle\u2019s 1940 appeal — historical allusion' },
        { instruction: 'Read the structure:', question: 'Trois éloges… puis un « cependant ».', answer: 'structural irony — the praise was the setup; trust the mais' },
        { instruction: 'State the visée:', question: 'After decoding, what does the text want?', answer: 'Formulate it: la visée est polémique / satirique / mélancolique — device + effect' },
    ],

    translationPractice: [
        { en: 'I shall not speak of his courage… (pretending not to)', fr: 'Je ne vous parlerai pas de son courage…' },
        { en: 'One must eat to live, not live to eat.', fr: 'Il faut manger pour vivre et non vivre pour manger.' },
        { en: 'It is not a reform, it is an abdication.', fr: 'Ce n\u2019est pas une réforme, c\u2019est une abdication.' },
        { en: 'A June 18th at the microphone — everyone got the allusion.', fr: 'Un 18 Juin au micro — tout le monde a compris l\u2019allusion.' },
        { en: 'The statement hails an "exemplary transparency". (ironic)', fr: 'Le communiqué salue une « transparence exemplaire ».' },
        { en: 'The implications carry more than the words.', fr: 'Les sous-entendus portent plus que les mots.' },
    ],

    reverseTranslation: [
        { fr: 'Trois éloges, puis le « cependant » fatal.', en: 'Three praises, then the fatal "however".' },
        { fr: 'Tout le communiqué est au second degré.', en: 'The whole statement is tongue-in-cheek.' },
        { fr: 'La visée du texte est franchement satirique.', en: 'The text\u2019s aim is frankly satirical.' },
        { fr: 'Ne prenez pas ce titre au premier degré.', en: 'Don\u2019t take this headline literally.' },
    ],

    register: {
        informal: 'Ah oui, vraiment "transparent" comme dossier… (spoken irony — one word in quotes does it)',
        neutral: 'Le texte félicite la transparence, tout en annonçant des annexes confidentielles.',
        formal: 'L\u2019ironie de structure — un éloge d\u2019ouverture renversé par un « cependant » final — révèle la visée satirique de l\u2019éditorial.',
    },

    culture: 'French public rhetoric is device-conscious: schoolchildren dissect la plaidoirie, speeches end with chutes, and columnists deploy prétérition the way anglophone ones deploy scare-quotes. The cultural shelf matters: un 18 Juin (De Gaulle 1940), un I Have a Dream (anaphore universelle), une boîte de Pandore, un chant des sirènes — C2 reading assumes you can catch the reference half-named. Molière\u2019s chiasme (manger pour vivre) and Cyrano\u2019s gradation remain the canonical classroom examples — quote them once and the correcteur knows you were raised on the shelf.',

    freeProduction: 'Write a satirical short column (12–16 lines) about an invented public figure using: one prétérition opener, a gradation of three éloges, the cependant flip, one historical allusion (dated), and a cold chute. Then annotate your own text: name each device and state its visée in one sentence — you are the correcteur now.',

    miniTest: [
        { question: 'Je ne vous parlerai pas de son courage is:', options: ['sincere silence', 'a prétérition', 'a chiasme', 'a litote'], answer: 'a prétérition — announcing the omission while performing it' },
        { question: 'Manger pour vivre / vivre pour manger is:', options: ['an anaphore', 'a chiasme', 'a gradation', 'an hyperbole'], answer: 'a chiasme — ABBA mirror' },
        { question: 'Three éloges + one « cependant » means:', options: ['balanced review', 'structural irony', 'an error', 'a citation'], answer: 'structural irony — the praise was the setup' },
        { question: 'Un 18 Juin au micro alludes to:', options: ['Bastille Day', 'De Gaulle 1940', 'D-Day', 'the Republic\u2019s founding'], answer: 'De Gaulle 1940 — the appeal from London' },
        { question: 'The graded answer to "what device?" includes:', options: ['the name only', 'the name + its effect (la visée)', 'the author\u2019s name', 'the word count'], answer: 'the name + its effect (la visée) — device and purpose together' },
    ],

    review: [
        'The devices named in C2:litteraire (anaphore, antithèse, métaphore filée, chute) are here given their jobs — same toolbox, now weaponized.',
        'The irony particles from C1:oral-implicite (ben voyons, super) are the spoken face of the structural irony decoded here.',
    ],

    traps: [
        'Device + effect or nothing: naming prétérition without its purpose earns half marks. Always finish: …ce qui lui permet d\u2019insister sur…',
        'In polemical texts, éloges before mais are bait — the connector outranks the adjective. Read the mais first, then re-read the praise.',
        'Allusions cite by fragment: a date, a place, a name is enough (un 18 Juin, une boîte de Pandore). Missing the fragment = missing the paragraph.',
        'Irony ≠ sarcasm: sarcasm names the target; irony hides it in structure. The exam\u2019s attitude questions reward the second-degree reading.',
    ],

    homework: {
        intro: 'Decode, name, effect: every item ends with the device\u2019s job in the sentence, not just its label.',
        translation: [
            { prompt: 'I shall not speak of his courage… (pretending not to)', answer: 'Je ne vous parlerai pas de son courage…', explanation: 'prétérition — the denial performs the praise; vous + parler de.' },
            { prompt: 'One must eat to live, not live to eat.', answer: 'Il faut manger pour vivre et non vivre pour manger.', explanation: 'chiasme (ABBA); the reversal is the moral — Molière\u2019s canonical line.' },
            { prompt: 'It is not a reform, it is an abdication.', answer: 'Ce n\u2019est pas une réforme, c\u2019est une abdication.', explanation: 'antithèse with the ce n\u2019est pas… c\u2019est frame — the polemic opener.' },
            { prompt: 'A June 18th at the microphone — everyone understood the allusion.', answer: 'Un 18 Juin au micro — tout le monde a compris l\u2019allusion.', explanation: 'historical allusion: the date cites De Gaulle 1940 without naming him.' },
            { prompt: 'The statement hails an "exemplary transparency".', answer: 'Le communiqué salue une « transparence exemplaire ».', explanation: 'scare-quotes + saluer = ironic praise; the guillemets are the tone of voice.' },
            { prompt: 'The implications carry more than the words.', answer: 'Les sous-entendus portent plus que les mots.', explanation: 'sous-entendu = the unspoken; porter = carry — both technical here.' },
        ],
        blanks: [
            { prompt: 'Je ne vous ferai pas l\u2019______ de rappeler les retards. (prétérition frame)', answer: 'injure', explanation: 'faire l\u2019injure de + infinitive — politeness performing the attack.' },
            { prompt: 'Il est ponctuel ; prévenant ; ______, dirons-nous, avec les chiffres. (ironic praise)', answer: 'créatif', explanation: 'créatif avec les chiffres = fudging — the euphemism carries the irony.' },
            { prompt: 'Ce n\u2019est pas un plan, c\u2019est une ______. (antithesis: hope without action)', answer: 'prière', explanation: 'prière (a prayer) contrasts plan — all hope, no mechanism.' },
            { prompt: 'Il faut manger pour vivre et non vivre ______ manger.', answer: 'pour', explanation: 'The chiasme mirrors pour: eat-to-live / live-to-eat.' },
            { prompt: 'Le communiqué salue une ______ transparence. (scare-quotes)', answer: '«', alt: ['“', '"'], explanation: 'The guillemets are the irony — French uses « » for the second-degree voice.' },
            { prompt: 'La ______ du texte est franchement satirique. (aim)', answer: 'visée', explanation: 'la visée = the text\u2019s purpose — the word the correcteur wants after the device.' },
        ],
        corrections: [
            { prompt: 'C\u2019est une prétérition, je crois, ou peut-être autre chose.', answer: 'C\u2019est une prétérition : elle feint d\u2019omettre le courage pour mieux l\u2019imposer.', explanation: 'How the mistake happens: naming without effect. Why it does not work: the graded answer pairs the device with its job. How to fix it: device + ce qu\u2019il permet + sur quoi il insiste.' },
            { prompt: 'Le texte est très gentil au début, donc positif.', answer: 'Les trois éloges d\u2019ouverture préparent le « cependant » final : l\u2019éloge est le piège.', explanation: 'How the mistake happens: trusting praise before reading the connector. Why it does not work: in polemic structure, the mais governs. How to fix it: locate the connector first, then re-weight the éloges.' },
            { prompt: 'Un 18 Juin au micro — c\u2019était le 18 juin 2024, probablement.', answer: 'L\u2019allusion renvoie à l\u2019appel du 18 Juin 1940 (De Gaulle).', explanation: 'How the mistake happens: reading the allusion literally. Why it does not work: the date is the citation — no year needed in the text because culture supplies it. How to fix it: catch the reference, then explain its work.' },
            { prompt: 'C\u2019est de la sarcasme, c\u2019est clair.', answer: 'C\u2019est de l\u2019ironie de structure : la félicitation et le fait secret se contredisent.', explanation: 'How the mistake happens: calling all irony sarcasm. Why it does not work: sarcasme attacks bluntly; the text\u2019s irony is built from a contradiction of facts. How to fix it: name the mechanism, not the temper.' },
            { prompt: 'La chute du texte est à la fin, évidemment.', answer: 'La chute — dernière phrase qui renverse le propos — repose sur le contraste « loyal… envers ceux qui le payent ».', explanation: 'How the mistake happens: defining la chute as "the end". Why it does not work: la chute is the REFRAMING final sentence, not just the last line. How to fix it: identify what it reframes.' },
        ],
        writing: {
            task: 'Write a satirical column (12–16 lines) about an invented official: prétérition opener, a gradation of three éloges, the cependant flip, one dated allusion (un 18 Juin, une boîte de Pandore…), a cold chute in quotation. Then annotate: under each device write its name and its effect (la visée) — device + effect, always.',
            requirements: [
                'One prétérition opener',
                'Gradation of three éloges + the cependant flip',
                'One dated/cultural allusion, correctly deployed',
                'A chute in guillemets',
                'Annotations: device + effect for each of the four',
            ],
            minWords: 100,
        },
        checklist: [
            'I name the device AND its effect (device + ce qu\u2019il permet)',
            'I read the connector before trusting the adjectives (éloge → cependant = trap)',
            'I catch fragment allusions (un 18 Juin, une boîte de Pandore, un chant des sirènes)',
            'I distinguish irony (structural) from sarcasm (blunt attack)',
            'I deploy scare-quotes and the second degré in my own writing',
            'I can state la visée of a text in one sentence after decoding',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Device → job: PRÉTÉRITION — insist while feigning restraint · GRADATION — rise to the point · CHIASME — the mirror IS the argument · PARATAXE — inevitability by rhythm · ANTITHÈSE — the balance frames the verdict · HYPERBOLE — passion or mockery (context decides).',
            examples: [
                { fr: 'Je ne parlerai pas de son courage… · manger pour vivre / vivre pour manger', en: 'two devices at work' },
            ],
        },
        {
            explanation: 'The éloge-cependant flip: three praises, one mais — the praise props up the accusation. Locate the connector FIRST, then re-weight everything before it.',
            examples: [
                { fr: 'Ponctuel, travailleur, loyal — mais loyal envers ceux qui le payent.', en: 'the flip in one line' },
            ],
        },
        {
            explanation: 'Allusion shelf: HISTORICAL — un 18 Juin (1940), une nuit du 4 août (1789) · CLASSICAL — un chant des sirènes, la boîte de Pandore, un talon d\u2019Achille · LITERARY — un Horla, un Meursault. The fragment cites; culture completes.',
            examples: [
                { fr: 'Un talon d\u2019Achille dans le dossier. = the file\u2019s one weakness.', en: 'classical fragment at work' },
            ],
        },
        {
            explanation: 'Structural irony signals: scare-quotes (« transparence exemplaire ») · the saluer + counter-fact pair · conspicuous omission (what the report does NOT count) · the repetition turned mockery (encore une "réunion" de consensus).',
            examples: [
                { fr: 'Le communiqué salue la « transparence » ; 47 pages restent confidentielles.', en: 'irony by arithmetic' },
            ],
        },
        {
            explanation: 'Answer template for device questions: [Device] + [what it allows] + [what it stresses]. Ex.: La prétérition permet à l\u2019auteur d\u2019insister sur le courage tout en feignant la retenue — the correcteur\u2019s full band.',
            examples: [
                { fr: 'L\u2019antithèse permet d\u2019opposer le discours aux faits.', en: 'the template at work' },
            ],
        },
        {
            explanation: 'Irony vs sarcasm: SARCASM names and attacks (bravo, bravo…) ; IRONY hides in structure (praise + counter-fact, prétérition, omission) and can be affectionate — l\u2019ironie bienveillante de la radio française.',
            examples: [
                { fr: 'Ah bravo. (sarcasme) · Le communiqué salue… (ironie)', en: 'two tempers, two channels' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'prétérition': { en: 'pretending not to say what you say', pron: 'pray-tay-ree-SYOHN', gender: 'feminine', plural: 'prétéritions', type: 'noun', register: 'formal', note: 'je ne vous parlerai pas de… — the denial performs the content.' },
        'gradation': { en: 'climax / rising series', pron: 'grah-dah-SYOHN', gender: 'feminine', plural: 'gradations', type: 'noun', register: 'formal', note: 'Cyrano\u2019s nose monologue is the classroom classic.' },
        'chiasme': { en: 'chiasmus (ABBA)', pron: 'KYAH-smuh', gender: 'masculine', plural: 'chiasmes', type: 'noun', register: 'formal', note: 'manger pour vivre et non vivre pour manger (Molière).' },
        'parataxe': { en: 'parataxis (clipped clauses)', pron: 'pah-rah-TAHKSS', gender: 'feminine', type: 'noun', register: 'formal', note: 'veni, vidi, vici — inevitability by rhythm.' },
        'hyperbole': { en: 'hyperbole', pron: 'leez-pair-BOHL', gender: 'feminine', plural: 'hyperboles', type: 'noun', register: 'formal', note: 'the h is mute and the s liaises: "leez-pair-BOHL".' },
        'allusion': { en: 'allusion (untold reference)', pron: 'ah-lü-ZYOHN', gender: 'feminine', plural: 'allusions', type: 'noun', register: 'formal', note: 'the fragment cites: a date, a name, a place.' },
        'sous-entendu': { en: 'implication / what is left unsaid', pron: 'soo-zahn-tahn-DÜ', gender: 'masculine', plural: 'sous-entendus', type: 'noun', note: 'porter plus que les mots — the C2 unit of meaning.' },
        'second degré': { en: 'the implicit layer / tongue-in-cheek', pron: 'suh-ZOHN duh-GREH', gender: 'masculine', type: 'phrase', note: 'au second degré = not literally; the g sounds "zh".' },
        'visée': { en: 'aim / purpose (of a text)', pron: 'vee-ZAY', gender: 'feminine', plural: 'visées', type: 'noun', register: 'formal', note: 'la visée polémique / satirique / mélancolique — always name it.' },
        'éloge': { en: 'praise / eulogy', pron: 'ay-LOHZH', gender: 'masculine', plural: 'éloges', type: 'noun', register: 'formal', note: 'faire l\u2019éloge de; three éloges + mais = the trap.' },
        'blâme': { en: 'blame / censure', pron: 'BLAHM', gender: 'masculine', plural: 'blâmes', type: 'noun', register: 'formal', note: 'l\u2019éloge et le blâme — the two poles of judgement.' },
        'insinuation': { en: 'insinuation', pron: 'ahn-see-nü-ah-SYOHN', gender: 'feminine', plural: 'insinuations', type: 'noun', register: 'formal', note: 'the prétérition\u2019s sharper cousin — suggesting without stating.' },
        'rendre': { en: 'to give back / render', pron: 'RAHN-druh', type: 'verb', note: 'rendre hommage à = pay tribute; le texte rend hommage… (ironic in context).' },
        'injure': { en: 'insult', pron: 'an-ZÜR', gender: 'feminine', plural: 'injures', type: 'noun', register: 'formal', note: 'faire l\u2019injure de = to have the gall to — prétérition\u2019s politeness frame.' },
        'abdication': { en: 'abdication / giving up duty', pron: 'ahb-dee-kah-SYOHN', gender: 'feminine', plural: 'abdications', type: 'noun', register: 'formal', note: 'c\u2019est une abdication — the antithesis partner of réforme.' },
        'satirique': { en: 'satirical (both genders)', pron: 'sah-tee-REEK', type: 'adjective', note: 'la visée satirique — the standard effect-label of polemical texts.' },
        'mélancolique': { en: 'melancholic (both genders)', pron: 'may-lahn-koh-LEEK', type: 'adjective', note: 'the elegy label — the other common visée.' },
        'coulisse': { en: 'backstage / wings', pron: 'koo-LEESS', gender: 'feminine', plural: 'coulisses', type: 'noun', note: 'en coulisses — behind the scenes of power (also C1:oral-implicite).' },
        'talon d\u2019Achille': { en: 'Achilles\u2019 heel (weak point)', pron: 'tah-lohn dah-SHEE-yuh', gender: 'masculine', type: 'expression', note: 'classical allusion = the one weakness of an otherwise strong thing.' },
        'boîte de Pandore': { en: 'Pandora\u2019s box', pron: 'bwat duh pahn-DOR', gender: 'feminine', type: 'expression', note: 'ouvrir une boîte de Pandore = unleash uncontrollable consequences.' },
    },
};

// ── C2 · Long-Form Synthesis & Commentary ───────────────────────────────────
const c2Commentaire: StaticFrenchLesson = {
    title: 'Long-Form Synthesis & Commentary',
    objective: 'Combine several sources into a coherent commentary at C2 length — build the problématique, keep three levels of reading separated (literal / implicit / interpretive), attribute every claim, weigh evidence against interpretation, and deliver a commentary whose own voice is measurable.',

    vocabulary: [
        { fr: 'le commentaire', en: 'the commentary (analytic essay)', pron: 'luh kohn-mahn-TAHR', gender: 'masculine', register: 'formal', example: { fr: 'Le commentaire suit le mouvement du texte.', en: 'The commentary follows the text\u2019s movement.' }, related: [{ fr: 'la synthèse', en: 'the synthesis (C1\u2019s shorter form)' }] },
        { fr: 'il est révélateur que', en: 'it is revealing that (+ subjunctive)', pron: 'eel eh ray-vay-lah-TUHR kuh', type: 'phrase', register: 'formal', example: { fr: 'Il est révélateur que le chiffre ait disparu.', en: 'It is revealing that the figure disappeared.' }, related: [{ fr: 'il est significatif que', en: 'it is significant that' }] },
        { fr: 'mettre en évidence', en: 'to highlight / bring to light', pron: 'meh-TRUH ahn nay-vee-DAHNSS', type: 'phrase', register: 'formal', example: { fr: 'Ce passage met en évidence le basculement.', en: 'This passage highlights the pivot.' }, related: [{ fr: 'souligner', en: 'to stress' }] },
        { fr: 'au niveau littéral', en: 'at the literal level', pron: 'oh nuh-VEH lee-tay-RAHL', type: 'phrase', register: 'formal', example: { fr: 'Au niveau littéral, rien n\u2019est affirmé.', en: 'At the literal level, nothing is asserted.' }, related: [{ fr: 'au second degré', en: 'at the implicit level' }] },
        { fr: 'on peut inférer que', en: 'one can infer that', pron: 'ohn puh an-feh-RAY kuh', type: 'phrase', register: 'formal', example: { fr: 'On peut inférer que la décision était prise.', en: 'One can infer the decision was already made.' }, related: [{ fr: 'laisser entendre', en: 'to imply' }] },
        { fr: 'la portée', en: 'the scope / significance', pron: 'lah por-TAY', gender: 'feminine', register: 'formal', example: { fr: 'La portée du texte dépasse son sujet.', en: 'The text\u2019s significance exceeds its subject.' }, related: [{ fr: 'la portée symbolique', en: 'the symbolic weight' }] },
        { fr: 'le basculement', en: 'the pivot / shift', pron: 'luh bahs-kül-MAHN', gender: 'masculine', register: 'formal', example: { fr: 'Le basculement s\u2019opère au troisième paragraphe.', en: 'The pivot occurs in the third paragraph.' }, related: [{ fr: 'basculer', en: 'to tip over' }] },
        { fr: 'en miroir', en: 'mirroring (structures that echo)', pron: 'ahn mee-RWAHR', type: 'phrase', register: 'formal', example: { fr: 'Les deux documents se répondent en miroir.', en: 'The two documents answer each other in mirror.' }, related: [{ fr: 'en écho', en: 'in echo' }] },
        { fr: 'distinguer le dit de l\u2019interprété', en: 'to separate what is said from what is inferred', pron: 'dees-teen-GAY luh DEE duh lan-tehr-pray-TAY', type: 'phrase', register: 'formal', example: { fr: 'Le commentaire doit distinguer le dit de l\u2019interprété.', en: 'The commentary must separate the said from the inferred.' }, related: [{ fr: 'le littéral / l\u2019implicite', en: 'literal / implicit' }] },
        { fr: 'nuancer', en: 'to qualify / refine', pron: 'nü-AHN-say', type: 'verb', register: 'formal', example: { fr: 'Nuancer, ce n\u2019est pas se contredire.', en: 'Qualifying is not contradicting oneself.' }, related: [{ fr: 'moduler', en: 'to modulate' }] },
        { fr: 'la ligne éditoriale', en: 'the editorial line', pron: 'lah lee-NYAY ay-dee-toh-RYAHL', gender: 'feminine', register: 'formal', example: { fr: 'Le choix des sources suit la ligne éditoriale.', en: 'The choice of sources follows the editorial line.' }, related: [{ fr: 'le point de vue', en: 'the standpoint' }] },
        { fr: 'en définitive', en: 'ultimately / on balance', pron: 'ahn day-fee-nee-TEEV', type: 'phrase', register: 'formal', example: { fr: 'En définitive, le texte convainc à moitié.', en: 'Ultimately, the text convinces by half.' }, related: [{ fr: 'tout bien pesé', en: 'all things weighed' }] },
    ],

    pronunciation: [
        { fr: 'révélateur', approx: 'ray-vay-lah-TUHR', en: 'final -teur keeps the r: "TURR"' },
        { fr: 'mettre en évidence', approx: 'MEH-truh ahn nay-vee-DAHNSS', en: 'double t shortens: "meh-truh"' },
        { fr: 'inférer', approx: 'an-feh-RAY', en: 'è in nose forms: on infère' },
        { fr: 'basculement', approx: 'bahs-kül-MAHN', en: 'three beats, stress last' },
        { fr: 'en définitive', approx: 'ahn day-fee-nee-TEEV', en: 'final -ive = "EEV"' },
        { fr: 'miroir', approx: 'mee-RWAHR', en: 'the oi-r glide: "rwahr"' },
    ],

    grammar: {
        rule: 'The long commentary runs on three separated levels: LITERAL (le texte dit que… — indicative, quotable), IMPLICIT (le texte laisse entendre / on peut inférer que…), INTERPRETIVE (il est révélateur que… + subjunctive; la portée est…). Attribute, hedge, and mark the joins between documents (en miroir, en écho).',
        explanation: 'C1\u2019s synthesis re-presented sources neutrally; the C2 commentary analyses them and takes measured responsibility for the reading. The machinery: level 1 — what is literally said (le texte indique que les délais doublent; quote or reformulate, indicative); level 2 — what is implied (on peut inférer que la décision était mûre; le titre laisse entendre une causalité — C1\u2019s instruments); level 3 — interpretation (il est révélateur que + SUBJUNCTIVE; ce choix n\u2019est pas neutre; la portée en est symbolique). The commentary\u2019s skeleton: problématique (the question the sources answer differently) → constat (level 1 across documents, marked with en miroir / en écho) → analyse (level 2) → interprétation (level 3) → portée (en définitive…). The discipline that separates C2 from cleverness: never let interpretation masquerade as fact — distinguer le dit de l\u2019interprété is the graded reflex, and nuancer is the verb that keeps you honest.',
        examples: [
            { fr: 'Le texte indique que les délais ont doublé ; il ne dit pas pourquoi.', en: 'The text indicates the delays doubled; it does not say why.', breakdown: ['level 1: literal, indicative', 'the refusal to over-read is itself graded', ' pourquoi left open — deliberately'] },
            { fr: 'On peut toutefois inférer que la décision était prise avant la consultation.', en: 'One can nevertheless infer the decision was made before the consultation.', breakdown: ['level 2: inference, hedged', 'toutefois = the analytic however', 'inférer que + indicative'] },
            { fr: 'Il est révélateur que le chiffre ait disparu de la version finale.', en: 'It is revealing that the figure disappeared from the final version.', breakdown: ['level 3: interpretation', 'révélateur que + subjunctive (ait)', 'the disappearance speaks'] },
            { fr: 'Les deux documents se répondent en miroir : l\u2019un célèbre la mesure, l\u2019autre en compte les coûts.', en: 'The two documents mirror each other: one celebrates the measure, the other counts its costs.', breakdown: ['en miroir = structural echo', 'célébrer / compter = paired verbs', 'cross-document join'] },
            { fr: 'Nuancer n\u2019est pas céder : la portée du texte est réelle, mais elle repose sur un échantillon unique.', en: 'Qualifying is not conceding: the text\u2019s significance is real, but it rests on a single sample.', breakdown: ['nuancer = the honesty verb', 'la portée = significance', 'the weighing is explicit'] },
            { fr: 'En définitive, le commentaire retient ceci : le dit est modeste, l\u2019interprété est riche — et c\u2019est précisément ce décalage qui fait le texte.', en: 'Ultimately, the commentary retains this: the said is modest, the inferred is rich — and precisely that gap makes the text.', breakdown: ['en définitive = the measured close', 'le dit / l\u2019interprété = the two levels named', 'the aphorism seals it'] },
        ],
        commonMistakes: [
            'Melting the levels: writing "le texte prouve que la décision était cachée" — prouve belongs to level 1, cachée to level 3. Tag each claim with its level verb (indique / laisse entendre / il est révélateur que).',
            'Forgetting the subjunctive after il est révélateur que / il est significatif que: these are judgement frames — ait, soit, puisse. Il est clair que stays indicative.',
            'Producing a summary in disguise: if every sentence reports (le texte dit…), there is no commentary. At least a third of sentences must analyse (mettre en évidence, inférer, la portée).',
            'Ignoring the joins: sources treated one by one without en miroir / en écho / à l\u2019appui de read as three mini-essays, not one commentary.',
        ],
    },

    transformations: [
        { type: 'Reported (level 1)', fr: 'Le texte indique que les délais doublent.', en: 'The text indicates the delays double.' },
        { type: 'Inferred (level 2)', fr: 'On peut inférer que la décision était mûre.', en: 'One can infer the decision was ripe.' },
        { type: 'Interpreted (level 3)', fr: 'Il est révélateur que le chiffre ait disparu.', en: 'It is revealing that the figure disappeared.' },
        { type: 'Overclaim (wrong)', fr: 'Le texte prouve que tout était caché.', en: 'The text proves everything was hidden. (levels melted)' },
        { type: 'Join between sources', fr: 'Les deux textes se répondent en miroir.', en: 'The two texts mirror each other.' },
        { type: 'Summary-only (wrong)', fr: 'Le document A dit X. Le document B dit Y.', en: 'A says X. B says Y. (no commentary)' },
        { type: 'Weighted', fr: 'Nuancer n\u2019est pas céder : la portée est réelle, l\u2019échantillon unique.', en: 'Qualifying isn\u2019t conceding: significance real, sample single.' },
        { type: 'Close', fr: 'En définitive, le dit est modeste, l\u2019interprété riche.', en: 'Ultimately: the said modest, the inferred rich.' },
    ],

    sentenceBuilding: [
        { fr: 'Deux documents, une même mesure, deux comptes.', en: 'Two documents, one same measure, two accounts.' },
        { fr: 'Deux documents traitent de la même mesure — et leurs comptes ne concordent pas.', en: 'Two documents deal with the same measure — and their accounts don\u2019t tally.', breakdown: ['the problématique in one sentence'] },
        { fr: 'Au niveau littéral, l\u2019un indique une hausse de 8 %, l\u2019autre de 2 % ; aucun ne ment sur ses propres chiffres.', en: 'At the literal level, one reports an 8% rise, the other 2%; neither lies about its own figures.', breakdown: ['level 1 with figures + fairness'] },
        { fr: 'On peut inférer que les périmètres diffèrent ; il est en effet révélateur que le second n\u2019ait pas publié sa méthode.', en: 'One can infer the scopes differ; it is indeed revealing that the second did not publish its method.', breakdown: ['level 2 → level 3, subjunctive (ait)'] },
        { fr: 'En définitive, le commentaire retient le décalage lui-même : entre un dit prudent et un implicite abondant, c\u2019est le silence qui documente.', en: 'Ultimately, the commentary retains the gap itself: between a prudent said and an abundant implicit, it is the silence that documents.', breakdown: ['the aphoristic close'] },
    ],

    practice: [
        { instruction: 'Tag the level:', question: 'Le texte indique que les délais doublent.', answer: 'Level 1 — literal, indicative, quotable' },
        { instruction: 'Tag the level:', question: 'On peut inférer que la décision était mûre.', answer: 'Level 2 — inference, hedged by on peut' },
        { instruction: 'Tag the level + mood:', question: 'Il est révélateur que le chiffre ______ (disparaître).', answer: 'disparaisse — level 3 judgement frame → subjunctive' },
        { instruction: 'Fix the overclaim:', question: 'Le texte prouve que tout était caché.', answer: 'Le texte n\u2019explique pas l\u2019écart ; on peut inférer une dissimulation, qu\u2019il est révélateur que rien ne démente.' },
        { instruction: 'Join the sources:', question: 'One celebrates, the other counts costs.', answer: 'Les deux documents se répondent en miroir…' },
        { instruction: 'Close measured:', question: 'Your final sentence.', answer: 'En définitive, … — the dit/interprété gap, named' },
    ],

    translationPractice: [
        { en: 'The text indicates the delays doubled.', fr: 'Le texte indique que les délais ont doublé.' },
        { en: 'One can infer the decision was made earlier.', fr: 'On peut inférer que la décision avait été prise plus tôt.' },
        { en: 'It is revealing that the figure disappeared.', fr: 'Il est révélateur que le chiffre ait disparu.' },
        { en: 'This passage highlights the pivot.', fr: 'Ce passage met en évidence le basculement.' },
        { en: 'The two documents mirror each other.', fr: 'Les deux documents se répondent en miroir.' },
        { en: 'Ultimately, the said is modest, the inferred rich.', fr: 'En définitive, le dit est modeste, l\u2019interprété riche.' },
    ],

    reverseTranslation: [
        { fr: 'La portée du texte dépasse son sujet immédiat.', en: 'The text\u2019s significance exceeds its immediate subject.' },
        { fr: 'Le commentaire doit distinguer le dit de l\u2019interprété.', en: 'The commentary must separate the said from the inferred.' },
        { fr: 'Le basculement s\u2019opère au troisième paragraphe.', en: 'The pivot occurs in the third paragraph.' },
        { fr: 'Tout bien pesé, le texte convainc à moitié.', en: 'All things weighed, the text convinces by half.' },
    ],

    register: {
        informal: 'En gros, les deux articles ne racontent pas la même affaire… (spoken draft — the essay follows)',
        neutral: 'Les deux textes ne concordent pas sur les chiffres.',
        formal: 'Au niveau littéral, les comptes divergent ; au niveau interprétatif, il est révélateur qu\u2019aucun des deux n\u2019ait publié sa méthode — et c\u2019est ce silence qui fait le sujet.',
    },

    culture: 'The commentaire composé is the sacred exercise of French higher education — hypokhâgne, khâgne, law faculties — and the C2 TCF\u2019s written expression scales it to exam size. Its ethic is inherited from the dissertation: separate the dit from the interprété, quote exactly, weigh before concluding. Canadian French-language universities mark the same reflex; le Devoir\u2019s analysis pages model it daily. The exam\u2019s longest writing task is essentially: can you be smart on record, measurably, without once overclaiming?',

    freeProduction: 'Write a commentary (160–220 words) on two invented documents about the same policy (one favourable, one critical): problématique → literal level with one figure from each (attributed) → one inference (on peut inférer que…) → one interpretation (il est révélateur que + subjunctive) → the join (en miroir) → close on the dit/interprété gap (en définitive…). Three levels, visibly separated.',

    miniTest: [
        { question: 'Le texte indique que les délais doublent — level:', options: ['interpretive', 'literal', 'symbolic', 'rhetorical'], answer: 'literal — indicative, quotable' },
        { question: 'Il est révélateur que le chiffre ______:', options: ['disparaît', 'disparaisse', 'disparaîtra', 'disparu'], answer: 'disparaisse — judgement frame → subjunctive' },
        { question: 'The join between two opposed sources is marked by:', options: ['d\u2019abord… ensuite', 'en miroir', 'tout au plus', 'sans doute'], answer: 'en miroir — structural echo' },
        { question: 'A commentary where every sentence says "le texte dit…" is:', options: ['perfect', 'a summary in disguise', 'too long', 'too formal'], answer: 'a summary in disguise — a third must analyse' },
        { question: 'The graded reflex of the long commentary is:', options: ['quoting more', 'distinguishing le dit from l\u2019interprété', 'longer sentences', 'more sources'], answer: 'distinguishing le dit from l\u2019interprété — level discipline' },
    ],

    review: [
        'C1:synthese built the attribution frames (selon, d\u2019après, il ressort) — here they carry analysis, not just reporting.',
        'The hedge moods from C1:argumentation-avancee (il semblerait que + subj) govern level 2 and 3 throughout this lecture.',
    ],

    traps: [
        'Level discipline: indique (literal) / laisse entendre (implicit) / il est révélateur que (interpretive) — one verb per claim, chosen deliberately.',
        'Judgement frames take the subjunctive: il est révélateur/significatif que + ait, soit; il est clair/évident que + indicative. The mood IS the analysis.',
        'The commentary is not three summaries glued: joins (en miroir, en écho, à l\u2019appui de) must appear, or the text reads as parallel bookkeeping.',
        'Close on the gap, not on a verdict of victory: en définitive + the dit/interprété décalage — measured, quotable, C2.',
    ],

    homework: {
        intro: 'Every item moves a level or a join: literal, inferred, interpreted, or the mirror between sources. Tag before you write.',
        translation: [
            { prompt: 'The text indicates the delays doubled.', answer: 'Le texte indique que les délais ont doublé.', explanation: 'Level 1: literal — indiquer que + indicative; no interpretation smuggled in.' },
            { prompt: 'One can infer the decision was made earlier.', answer: 'On peut inférer que la décision avait été prise plus tôt.', explanation: 'Level 2: on peut inférer que + indicative; plus-que-parfait for the earlier act.' },
            { prompt: 'It is revealing that the figure disappeared.', answer: 'Il est révélateur que le chiffre ait disparu.', explanation: 'Level 3: judgement frame → subjunctive (ait). The mood performs the analysis.' },
            { prompt: 'This passage highlights the pivot.', answer: 'Ce passage met en évidence le basculement.', explanation: 'mettre en évidence = highlight; basculement = the structural pivot word.' },
            { prompt: 'The two documents mirror each other.', answer: 'Les deux documents se répondent en miroir.', explanation: 'se répondre + en miroir — the cross-source join of any long commentary.' },
            { prompt: 'Ultimately: the said is modest, the inferred rich.', answer: 'En définitive, le dit est modeste, l\u2019interprété riche.', explanation: 'en définitive = the measured close; the dit/l\u2019interprété pair names the levels.' },
        ],
        blanks: [
            { prompt: 'Il est ______ que le chiffre ait disparu. (revealing)', answer: 'révélateur', explanation: 'révélateur que + subjunctive — the level-3 frame. Fem: révélatrice.' },
            { prompt: 'On peut ______ que la décision était mûre. (infer)', answer: 'inférer', explanation: 'inférer que + indicative — inference keeps the indicative under on peut.' },
            { prompt: 'Ce passage met en ______ le basculement. (highlights)', answer: 'évidence', explanation: 'mettre en évidence — the analytic highlight; à évidence noun pair with évident.' },
            { prompt: 'Les deux documents se répondent ______. (in mirror)', answer: 'en miroir', explanation: 'en miroir — structural echo between sources.' },
            { prompt: '______, le dit est modeste, l\u2019interprété riche. (ultimately)', answer: 'En définitive', alt: ['Tout bien pesé'], explanation: 'The measured close: en définitive / tout bien pesé.' },
            { prompt: 'Le commentaire doit distinguer le dit de l\u2019______. (inferred)', answer: 'interprété', explanation: 'le dit / l\u2019interprété — the two levels, named as nouns.' },
        ],
        corrections: [
            { prompt: 'Le texte prouve que tout était caché.', answer: 'Le texte n\u2019explique pas l\u2019écart ; on peut inférer une dissimulation, qu\u2019il est révélateur que rien ne démente.', explanation: 'How the mistake happens: melting the levels — prouve (literal) carrying caché (interpretive). Why it does not work: the overclaim reads as bias, not analysis. How to fix it: split the claim into its levels and tag each.' },
            { prompt: 'Il est révélateur que le chiffre disparaît.', answer: 'Il est révélateur que le chiffre disparaisse.', explanation: 'How the mistake happens: indicative under a judgement frame. Why it does not work: révélateur que + subjunctive — the mood is the analysis. How to fix it: disparaisse.' },
            { prompt: 'Document A dit X. Document B dit Y. Voilà.', answer: 'Au niveau littéral, A indique X ; B, Y — mais les deux se répondent en miroir, et c\u2019est leur désaccord qui pose la question.', explanation: 'How the mistake happens: parallel summaries without commentary. Why it does not work: no analysis, no join, no problématique. How to fix it: level-1 attribution + the miroir join + what the disagreement means.' },
            { prompt: 'Le document B a peut-être oublié de publier sa méthode — c\u2019est prouvé qu\u2019il cache.', answer: 'Il est révélateur que B n\u2019ait pas publié sa méthode ; rien ne permet d\u2019affirmer l\u2019intention.', explanation: 'How the mistake happens: interpreting an omission as proven intent. Why it does not work: the C1 refusal-to-overclaim still governs at C2. How to fix it: révélateur + subjunctive, then the explicit refusal.' },
            { prompt: 'En conclusion, B a complètement tort et A a raison.', answer: 'En définitive, les comptes de B reposent sur un périmètre plus étroit — ce qui n\u2019invalide ni l\u2019un ni l\u2019autre, mais déplace la question.', explanation: 'How the mistake happens: verdict of victory. Why it does not work: the C2 close names the décalage and moves the question. How to fix it: en définitive + what differs + what that changes.' },
        ],
        writing: {
            task: 'Write the full commentary (160–220 words) on two invented documents about one policy: problématique (1 sentence) → literal level with one attributed figure each → one inference (on peut inférer que…) → one interpretation (il est révélateur que + subjunctive) → the join (en miroir or à l\u2019appui de) → close on the dit/interprété gap (en définitive…). Add level-tags in the margin ([1] [2] [3]) as you write.',
            requirements: [
                'Problématique stated once, early',
                'Literal level: two attributed claims (indicative)',
                'One inference + one interpretation with correct moods',
                'One explicit join between sources (en miroir / en écho / à l\u2019appui de)',
                'Close on the dit/interprété gap — no victory verdict',
            ],
            minWords: 150,
        },
        checklist: [
            'I separate three levels and tag them: indique (1) / laisse entendre-infère (2) / il est révélateur que (3)',
            'I keep judgement frames subjunctive (révélateur, significatif) and clarity frames indicative (clair, évident)',
            'I join my sources explicitly (en miroir, en écho, à l\u2019appui de)',
            'I keep at least a third of the text analytic — not reporting',
            'I weigh with nuancer / la portée without surrendering the reading',
            'I close on the dit/interprété gap (en définitive) — never on a victory verdict',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The level kit: LITERAL — le texte indique/rapporte que + indicatif · IMPLICIT — on peut inférer que · le texte laisse entendre que · INTERPRETIVE — il est révélateur/significatif que + subjonctif · la portée est….',
            examples: [
                { fr: 'Le texte indique X. → On peut inférer Y. → Il est révélateur que Z ait…', en: 'the three-step ladder' },
            ],
        },
        {
            explanation: 'Mood map of the frames: SUBJONCTIF — il est révélateur/significatif/possible que; INDICATIF — il est clair/évident/ probable que, on peut inférer que. The mood distinguishes judgement from observation.',
            examples: [
                { fr: 'Il est révélateur que le chiffre ait disparu. · Il est clair que les délais doublent.', en: 'one subj, one indic' },
            ],
        },
        {
            explanation: 'Joins between sources: en miroir (mirror) · en écho (echo) · à l\u2019appui de (supporting) · là où A…, B… (contrast) · la divergence porte sur… (the precise disagreement).',
            examples: [
                { fr: 'L\u2019un célèbre la mesure ; l\u2019autre en compte les coûts — en miroir.', en: 'the join in one line' },
            ],
        },
        {
            explanation: 'The commentary skeleton: PROBLÉMATIQUE (one sentence) → CONSTAT (level 1, attributed) → ANALYSE (level 2) → INTERPRÉTATION (level 3) → PORTÉE (en définitive). Proportions: roughly 1/4 constat, 1/2 analyse+interprétation, 1/4 portée.',
            examples: [
                { fr: 'Le commentaire suit le mouvement du texte, pas le sien.', en: 'the skeleton\u2019s law' },
            ],
        },
        {
            explanation: 'Analytic verbs that ARE the register: mettre en évidence · basculer (le basculement) · souligner · relativiser · porter sur · déborder (la portée déborde le sujet) · révéler. One per paragraph keeps the voice analytic.',
            examples: [
                { fr: 'Ce choix révèle une priorité ; ce silence, une contrainte.', en: 'two verbs, two readings' },
            ],
        },
        {
            explanation: 'The measured close: en définitive / tout bien pesé + the dit/interprété décalage + what it changes. Never "B a tort" — always "le décalage déplace la question".',
            examples: [
                { fr: 'En définitive, c\u2019est le silence qui documente.', en: 'the quotable close' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        'révélateur': { en: 'revealing (masc)', pron: 'ray-vay-lah-TUHR', type: 'adjective', fem: { word: 'révélatrice', en: 'revealing (fem —trice)' }, note: 'il est révélateur que + SUBJONCTIVE — the level-3 frame.' },
        'inférer': { en: 'to infer', pron: 'an-feh-RAY', type: 'verb', register: 'formal', note: 'on peut inférer que + indicative; infère/infèrent keep the è.' },
        'la portée': { en: 'scope / significance', pron: 'lah por-TAY', gender: 'feminine', plural: 'portées', type: 'noun', register: 'formal', note: 'la portée du texte déborde son sujet — significance beyond topic.' },
        'basculement': { en: 'pivot / tipping point', pron: 'bahs-kül-MAHN', gender: 'masculine', plural: 'basculements', type: 'noun', register: 'formal', note: 'le basculement s\u2019opère au paragraphe trois — the structural shift.' },
        'en miroir': { en: 'in mirror (echoing structure)', pron: 'ahn mee-RWAHR', type: 'phrase', register: 'formal', note: 'les documents se répondent en miroir — the cross-source join.' },
        'en écho': { en: 'in echo (lighter mirror)', pron: 'ahn-nay-KOH', type: 'phrase', register: 'formal', note: 'l\u2019annexe fait écho au corps du texte.' },
        'le dit': { en: 'what is said (the literal level)', pron: 'luh DEE', gender: 'masculine', type: 'noun', register: 'formal', note: 'distinguer le dit de l\u2019interprété — the two levels as nouns.' },
        'l\u2019interprété': { en: 'what is inferred/read into', pron: 'lan-tehr-pray-TAY', gender: 'masculine', type: 'noun', register: 'formal', note: 'the level-2/3 content — never smuggled into level 1.' },
        'mettre en évidence': { en: 'to highlight / bring to light', pron: 'meh-truh ahn nay-vee-DAHNSS', type: 'phrase', register: 'formal', note: 'the analytic highlight — stronger than mentionner.' },
        'en définitive': { en: 'ultimately / on balance', pron: 'ahn day-fee-nee-TEEV', type: 'phrase', register: 'formal', note: 'the measured close; cousin: tout bien pesé.' },
        'périmètre': { en: 'scope / perimeter (of a study)', pron: 'pay-ree-METR', gender: 'masculine', plural: 'périmètres', type: 'noun', register: 'formal', note: 'les périmètres diffèrent — why two accounts disagree.' },
        'ligne éditoriale': { en: 'editorial line', pron: 'lee-NYAY ay-dee-toh-RYAHL', gender: 'feminine', plural: 'lignes éditoriales', type: 'phrase', register: 'formal', note: 'the choice of sources follows it — media-analysis word.' },
        'démenti': { en: 'denial / refutation', pron: 'day-mahn-TEE', gender: 'masculine', plural: 'démentis', type: 'noun', register: 'formal', note: 'rien ne vient le démentir — nothing comes to deny it; plural démentis.' },
        'concorder': { en: 'to tally / agree', pron: 'kohn-kor-DAY', type: 'verb', register: 'formal', note: 'les comptes ne concordent pas — the numbers-disagreement verb.' },
        'décalage': { en: 'gap / discrepancy', pron: 'day-kah-LAHZH', gender: 'masculine', plural: 'décalages', type: 'noun', note: 'le décalage entre le dit et l\u2019interprété — the commentary\u2019s final object.' },
        'relever': { en: 'to note / pick up', pron: 'ruh-luh-VAY', type: 'verb', register: 'formal', note: 'on relève que… — the commentary\u2019s observation verb; also relever un défi.' },
        'sous-financer': { en: 'to underfund', pron: 'soo-fee-nahn-SAY', type: 'verb', register: 'formal', note: 'C1 heritage word — nominalized: le sous-financement.' },
        'méthodologie': { en: 'methodology', pron: 'may-toh-doh-loh-ZHEE', gender: 'feminine', plural: 'méthodologies', type: 'noun', register: 'formal', note: 'publier sa méthodologie — the evidence check of sources.' },
        'convaincre à moitié': { en: 'to convince by half', pron: 'kohn-vahnkr ah mwa-TYAY', type: 'expression', note: 'le texte convainc à moitié — the measured-verdict formula.' },
    },
};

export const STATIC_C2_PART2: Record<string, StaticFrenchLesson> = {
    'C2:rhetorique': c2Rhetorique,
    'C2:commentaire-long': c2Commentaire,
};
