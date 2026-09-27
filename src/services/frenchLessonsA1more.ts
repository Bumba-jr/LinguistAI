// A1 lectures part 2 — Food & Everyday Objects, Daily Routine, Questions & Negation.

import type { TcfLesson } from './tcfService';
import { BASE_GLOSSARY } from './frenchLessonBase';
import type { StaticFrenchLesson } from './frenchLessons';

// ── A1 · Food & Everyday Objects ─────────────────────────────────────────────
const a1Food: StaticFrenchLesson = {
    title: 'Food & Everyday Objects',
    objective: 'Use the partitive articles (du, de la, de l\u2019, des) to talk about food and drink, order simply with je voudrais and prendre, and handle the negative de rule — the A1 ground the TCF reuses in every format.',

    vocabulary: [
        { fr: 'le pain', en: 'the bread', gender: 'masculine', example: { fr: 'Je mange du pain.', en: 'I eat (some) bread.' }, related: [{ fr: 'le croissant', en: 'the croissant' }] },
        { fr: 'le fromage', en: 'the cheese', gender: 'masculine', example: { fr: 'Le fromage français est célèbre.', en: 'French cheese is famous.' }, related: [{ fr: 'le beurre', en: 'the butter' }] },
        { fr: 'la viande', en: 'the meat', gender: 'feminine', example: { fr: 'Je ne mange pas de viande.', en: 'I do not eat meat.' }, related: [{ fr: 'le poulet', en: 'the chicken' }, { fr: 'le poisson', en: 'the fish' }] },
        { fr: 'l\u2019eau', en: 'the water', gender: 'feminine', example: { fr: 'Je bois de l\u2019eau.', en: 'I drink water.' }, related: [{ fr: 'le jus d\u2019orange', en: 'the orange juice' }] },
        { fr: 'le café', en: 'the coffee / café', gender: 'masculine', example: { fr: 'Je prends un café.', en: 'I\u2019ll have a coffee.' }, related: [{ fr: 'le thé', en: 'the tea' }, { fr: 'le lait', en: 'the milk' }] },
        { fr: 'le vin', en: 'the wine', gender: 'masculine', example: { fr: 'Nous buvons du vin rouge.', en: 'We drink red wine.' }, related: [{ fr: 'la bière', en: 'the beer' }] },
        { fr: 'la pomme', en: 'the apple', gender: 'feminine', example: { fr: 'Je mange une pomme.', en: 'I eat an apple.' }, related: [{ fr: 'la banane', en: 'the banana' }] },
        { fr: 'le riz', en: 'the rice', gender: 'masculine', example: { fr: 'Je mange du riz tous les jours.', en: 'I eat rice every day.' }, related: [{ fr: 'la salade', en: 'the salad' }] },
        { fr: 'le petit-déjeuner', en: 'breakfast', gender: 'masculine', example: { fr: 'Je prends mon petit-déjeuner à sept heures.', en: 'I have breakfast at seven.' }, related: [{ fr: 'le déjeuner', en: 'lunch' }, { fr: 'le dîner', en: 'dinner' }] },
        { fr: 'j\u2019ai faim', en: 'I am hungry (lit. I have hunger)', register: 'neutral', example: { fr: 'J\u2019ai faim ! On mange ?', en: 'I\u2019m hungry! Shall we eat?' }, related: [{ fr: 'j\u2019ai soif', en: 'I am thirsty' }] },
        { fr: 'je voudrais', en: 'I would like', register: 'neutral', example: { fr: 'Je voudrais un croissant, s\u2019il vous plaît.', en: 'I would like a croissant, please.' }, related: [{ fr: 'vous désirez ?', en: 'what would you like? (server speak)' }] },
        { fr: 'je prends', en: 'I take / I\u2019ll have (from prendre)', register: 'neutral', example: { fr: 'Je prends le poulet.', en: 'I\u2019ll have the chicken.' }, related: [{ fr: 'tu prends', en: 'you take' }] },
        { fr: 'l\u2019addition', en: 'the bill', gender: 'feminine', example: { fr: 'L\u2019addition, s\u2019il vous plaît !', en: 'The bill, please!' }, related: [{ fr: 'le pourboire', en: 'the tip' }] },
        { fr: 'délicieux', en: 'delicious', register: 'neutral', note: 'feminine délicieuse', example: { fr: 'C\u2019est délicieux !', en: 'It is delicious!' }, related: [{ fr: 'c\u2019est bon !', en: 'it\u2019s good! (casual)' }] },
    ],

    pronunciation: [
        { fr: 'pain', approx: 'PAN (nasal)', en: 'bread — nasal in, no n sound' },
        { fr: 'vin', approx: 'VAN (nasal)', en: 'wine — a DIFFERENT nasal from pain; mixing them is the classic trap' },
        { fr: 'poisson', approx: 'pwa-SOHN', en: 'fish — double s = s sound; poisson (fish) vs poison (poison) — one s changes everything' },
        { fr: 'fromage', approx: 'fro-MAHZH', en: 'cheese — the g before e is soft (zh)' },
        { fr: 'l\u2019eau', approx: 'LOH', en: 'water — one sound, the l and o only' },
        { fr: 'délicieux', approx: 'day-lee-SYUH', en: 'delicious — theieux glide: "syuh"' },
    ],

    grammar: {
        rule: 'Eating and drinking uses the PARTITIVE — du (masc), de la (fem), de l\u2019 (vowel), des (plural) = "some" — and in the negative they ALL become de.',
        explanation: 'English says "I eat bread"; French says "I eat SOME bread" — du pain — because the quantity is unspecific. Which form? The noun decides: du + masculine (du pain), de la + feminine (de la salade), de l\u2019 + vowel (de l\u2019eau), des + plural (des pommes). The big rule: in a negative sentence every partitive becomes de — je ne mange pas DE pain. Two exceptions to memorise early: verbs of preference (aimer, préférer, adorer) drop the partitive and use the definite article — j\u2019aime LE pain (I like bread in general); and quantities (une tasse de café, beaucoup de) keep de.',
        examples: [
            { fr: 'Le matin, je mange du pain et je bois de l\u2019eau.', en: 'In the morning I eat bread and drink water.', breakdown: ['le matin = in the morning', 'du pain = some bread (masc)', 'de l\u2019eau = some water (vowel)'] },
            { fr: 'Elle prend de la salade et du fromage.', en: 'She is having salad and cheese.', breakdown: ['elle prend = she takes/having', 'de la salade = some salad (fem)', 'du fromage = some cheese (masc)'] },
            { fr: 'Nous buvons des jus d\u2019orange.', en: 'We drink (some) orange juices.', breakdown: ['nous buvons = we drink (boire)', 'des = some (plural)'] },
            { fr: 'Je ne mange pas de viande.', en: 'I do not eat meat.', breakdown: ['ne … pas = not', 'de viande = (any) meat — partitive becomes de in negatives'] },
            { fr: 'J\u2019aime le fromage.', en: 'I like cheese.', breakdown: ['j\u2019aime = I like', 'le fromage = THE cheese — preferences use the definite article, not du'] },
            { fr: 'Je voudrais un café et une eau gazeuse, s\u2019il vous plaît.', en: 'I would like a coffee and a sparkling water, please.', breakdown: ['je voudrais = I would like', 'un café = a coffee', 'une eau gazeuse = a sparkling water'] },
        ],
        commonMistakes: [
            '"Je mange du salade" — salade is feminine: de la salade. The noun decides, not the food.',
            'Forgetting the negative de: "Je ne mange pas du fromage" → je ne mange pas DE fromage.',
            'Using du after aimer: j\u2019aime le fromage (definite article for general likes).',
            'Confusing pain (bread, nasal "pan") and vin (wine, nasal "van") — train your ear on the difference.',
        ],
    },

    transformations: [
        { type: 'Positive', fr: 'Je mange du pain.', en: 'I eat (some) bread.' },
        { type: 'Negative', fr: 'Je ne mange pas de pain.', en: 'I do not eat bread.' },
        { type: 'Question (est-ce que)', fr: 'Est-ce que tu manges du pain ?', en: 'Do you eat bread?' },
        { type: 'Question (inversion)', fr: 'Manges-tu du pain ?', en: 'Do you eat bread? (formal)' },
        { type: 'Preference', fr: 'J\u2019aime le pain.', en: 'I like bread.' },
        { type: 'Polite order', fr: 'Je voudrais du pain, s\u2019il vous plaît.', en: 'I would like some bread, please.' },
        { type: 'With prendre', fr: 'Je prends du pain.', en: 'I\u2019ll have some bread.' },
        { type: 'Past (compounds)', fr: 'J\u2019ai mangé du pain.', en: 'I ate (some) bread.' },
    ],

    sentenceBuilding: [
        { fr: 'J\u2019ai faim.', en: 'I am hungry.' },
        { fr: 'J\u2019ai faim. Je mange du pain.', en: 'I am hungry. I eat some bread.' },
        { fr: 'J\u2019ai faim. Je mange du pain et je bois de l\u2019eau.', en: 'I am hungry. I eat bread and drink water.' },
        { fr: 'J\u2019ai faim. Le matin, je mange du pain avec du beurre et je bois de l\u2019eau.', en: 'I am hungry. In the morning I eat bread with butter and drink water.' },
        { fr: 'Tous les matins, j\u2019ai faim : je mange du pain avec du beurre, je bois de l\u2019eau, et quelquefois un jus d\u2019orange.', en: 'Every morning I am hungry: I eat bread with butter, drink water, and sometimes an orange juice.' },
    ],

    practice: [
        { instruction: 'Choose the partitive:', question: 'Je mange ______ (le fromage / du fromage / de le fromage).', answer: 'du fromage — masc singular partitive' },
        { instruction: 'Choose the partitive:', question: 'Elle boit ______ (de la / du / des) salade.', answer: 'de la salade — fem singular' },
        { instruction: 'Make it negative:', question: 'Je bois du café.', answer: 'Je ne bois pas de café. (partitive → de)' },
        { instruction: 'General preference — which article?', question: 'J\u2019aime ______ (du / le / de) chocolat.', answer: 'le chocolat — verbs of preference use the definite article' },
        { instruction: 'Order politely:', question: 'I would like a coffee, please.', answer: 'Je voudrais un café, s\u2019il vous plaît.' },
        { instruction: 'prendre — complete:', question: 'Nous ______ le petit-déjeuner à huit heures.', answer: 'prenons — irregular nous form (prenons, not prenons… note the n)' },
    ],

    translationPractice: [
        { en: 'I drink water.', fr: 'Je bois de l\u2019eau.' },
        { en: 'We eat cheese and bread.', fr: 'Nous mangeons du fromage et du pain.' },
        { en: 'I do not drink coffee.', fr: 'Je ne bois pas de café.' },
        { en: 'She is having chicken.', fr: 'Elle prend du poulet.' },
        { en: 'I would like a croissant, please.', fr: 'Je voudrais un croissant, s\u2019il vous plaît.' },
        { en: 'The bill, please!', fr: 'L\u2019addition, s\u2019il vous plaît !' },
    ],

    reverseTranslation: [
        { fr: 'Le matin, je bois du café.', en: 'In the morning I drink coffee.' },
        { fr: 'Je ne mange pas de viande.', en: 'I do not eat meat.' },
        { fr: 'Nous prenons le petit-déjeuner à huit heures.', en: 'We have breakfast at eight o\u2019clock.' },
        { fr: 'C\u2019est délicieux ! J\u2019ai encore faim.', en: 'It is delicious! I am still hungry.' },
    ],

    register: {
        informal: 'J\u2019ai la dalle ! On mange quoi ? — un kebab ? (la dalle is the slang for hungry; servers say on)',
        neutral: 'Je voudrais un croissant et un café, s\u2019il vous plaît.',
        formal: 'Je vais prendre le menu du jour, s\u2019il vous plaît. Et comme boisson, une carafe d\u2019eau. (restaurant formal: le menu du jour, une carafe d\u2019eau = tap water)',
    },

    culture: 'Food is serious in France. Breakfast (le petit-déjeuner) is small — bread, butter, jam, coffee. Lunch (le déjeuner) traditionally runs 12:00–14:00 and many shops still close for it. Dinner (le dîner) is late, often 19:30–20:30. In restaurants the bill NEVER arrives unasked — call « L\u2019addition, s\u2019il vous plaît ! » — and tipping is optional because service is included (service compris). Bread accompanies every meal; the baguette run happens daily.',

    freeProduction: 'Write or record your food day (6–8 sentences). Guiding questions: What do you eat in the morning (du pain ? des céréales ?)? What do you drink with it? What is your lunch on a workday? What do you never eat (je ne mange jamais de…)? What is your favourite dish — what do you order in a restaurant (je prends toujours…)?',

    miniTest: [
        { question: 'Choose: Je mange ______ riz.', options: ['de la', 'du', 'de l\u2019', 'des'], answer: 'du' },
        { question: 'Negative of "Je bois du café"?', options: ['Je ne bois pas du café.', 'Je ne bois pas de café.', 'Je ne bois pas le café.', 'Je bois ne pas de café.'], answer: 'Je ne bois pas de café.' },
        { question: '"J\u2019ai faim" means…', options: ['I am cold', 'I am thirsty', 'I am hungry', 'I am tired'], answer: 'I am hungry (lit. I have hunger — avoir!)' },
        { question: 'General preference: J\u2019aime ______ fromage.', options: ['du', 'de la', 'le', 'de'], answer: 'le — likes use the definite article' },
        { question: 'You want the bill. You say…', options: ['Le menu, s\u2019il vous plaît !', 'L\u2019addition, s\u2019il vous plaît !', 'Le pourboire, s\u2019il vous plaît !', 'La carte, s\u2019il vous plaît !'], answer: 'L\u2019addition, s\u2019il vous plaît !' },
    ],

    review: [
        'Numbers stay warm — every order needs a price and a time: deux cafés à dix heures.',
        'Keep avoir-expressions active: j\u2019ai faim / j\u2019ai soif come straight from the avoir list.',
    ],

    traps: [
        'du/de la/des chosen by the NOUN\u2019S gender, not the food: du salade is wrong — de la salade (salade is feminine).',
        'Keeping du/des in negatives: "Je ne mange pas DU fromage" — the partitive becomes DE: je ne mange pas de fromage.',
        'Using du after aimer/adorer/préférer: likes take the definite article — j\u2019aime LE chocolat (chocolate in general).',
        'poisson (fish) vs poison (poison) — one s. And pain (bread) vs vin (wine): two different nasal vowels, train them.',
    ],

    homework: {
        intro: 'The partitive in every section. Write the full forms — du, de la, de l\u2019, des — and check why each one is chosen.',
        translation: [
            { prompt: 'I eat cheese.', answer: 'Je mange du fromage.', explanation: 'fromage is masculine singular → du. The partitive = "some" — you eat an unspecified amount.' },
            { prompt: 'She drinks water.', answer: 'Elle boit de l\u2019eau.', explanation: 'eau starts with a vowel → de l\u2019. The l\u2019 has nothing to do with gender — it is the vowel rule.' },
            { prompt: 'We eat salad.', answer: 'Nous mangeons de la salade.', explanation: 'salade is feminine → de la. And manger + nous = mangeons (the e protects the g sound).' },
            { prompt: 'They have apples.', answer: 'Ils ont des pommes.', explanation: 'plural countable → des. Des pommes = some apples / apples in general.' },
            { prompt: 'I do not eat fish.', answer: 'Je ne mange pas de poisson.', explanation: 'Negatives turn du/de la/des into DE — always, whatever the gender.' },
            { prompt: 'I would like a coffee, please.', answer: 'Je voudrais un café, s\u2019il vous plaît.', explanation: 'A specific, countable ONE (a coffee) takes un — the partitive is for unspecified quantity. je voudrais is the polite order formula.' },
            { prompt: 'In the morning, I drink orange juice.', answer: 'Le matin, je bois du jus d\u2019orange.', explanation: 'jus is masculine → du. Watch the elision chain: jus d\u2019orange.' },
            { prompt: 'We are hungry and thirsty.', answer: 'Nous avons faim et soif.', explanation: 'Hunger and thirst use AVOIR: avoir faim, avoir soif — never être.' },
        ],
        blanks: [
            { prompt: 'Je mange ______ pain. (some)', answer: 'du', explanation: 'pain is masculine singular → du pain.' },
            { prompt: 'Elle boit ______ thé. (some)', answer: 'du', explanation: 'thé is masculine → du thé.' },
            { prompt: 'Nous mangeons ______ fromage. (some)', answer: 'du', explanation: 'fromage is masculine → du fromage.' },
            { prompt: 'Tu manges ______ pommes. (some)', answer: 'des', explanation: 'pommes is plural → des pommes.' },
            { prompt: 'Je ne bois pas ______ café.', answer: 'de', explanation: 'The negative de rule: du → de. Je ne bois pas de café.' },
            { prompt: 'Il y a ______ eau sur la table.', answer: 'de l\u2019', explanation: 'eau starts with a vowel → de l\u2019eau, whatever the gender.' },
        ],
        corrections: [
            { prompt: 'Je mange de le fromage.', answer: 'Je mange du fromage.', explanation: 'How the mistake happens: de + le written separately. Why it does not work: de + le MUST contract to du — like English "do not" → "don\u2019t". How to fix it: memorize the four contractions: au, aux, du, des.' },
            { prompt: 'Je ne mange pas du fromage.', answer: 'Je ne mange pas de fromage.', explanation: 'How the mistake happens: keeping the partitive in the negative. Why it does not work: negatives replace du/de la/des with de — the quantity disappears with the action. How to fix it: ne + verb + pas + DE + noun. (Exception: with être — ce n\u2019est pas du beurre, it is real.)' },
            { prompt: 'J\u2019aime du chocolat.', answer: 'J\u2019aime le chocolat.', explanation: 'How the mistake happens: applying the partitive everywhere. Why it does not work: verbs of liking describe a GENERAL preference — French uses the definite article: j\u2019aime le chocolat. How to fix it: aimer/adorer/détester/préférer + le/la/les.' },
            { prompt: 'Elle boit de la eau.', answer: 'Elle boit de l\u2019eau.', explanation: 'How the mistake happens: applying de la mechanically. Why it does not work: la elides before a vowel — two vowels cannot stay together. How to fix it: de l\u2019eau, de l\u2019orangeade — the l\u2019 rule outranks gender.' },
            { prompt: 'Je suis faim.', answer: 'J\u2019ai faim.', explanation: 'How the mistake happens: English "I am hungry". Why it does not work: French owns hunger with avoir — literally "I have hunger". How to fix it: avoir + faim/soif/chaud/froid/peur/raison/tort/… ans. Never être.' },
        ],
        writing: {
            task: 'Write your real food day (6–8 sentences): breakfast, lunch and dinner — what you eat and drink with the partitive, one thing you never eat (je ne mange jamais de…), and one restaurant order (je prends / je voudrais). Finish with a question about the reader\u2019s favourite food.',
            requirements: [
                'At least four different partitives (du, de la, de l\u2019, des)',
                'One negative with de (je ne mange pas de…)',
                'One avoir-expression (j\u2019ai faim / j\u2019ai soif)',
                'One polite order (je voudrais… / je prends…)',
                'One question about the reader (Et vous, quel est votre plat préféré ?)',
            ],
            minWords: 55,
        },
        checklist: [
            'I choose du/de la/de l\u2019/des by the noun\u2019s gender and number',
            'The negative turns all partitives into de',
            'Verbs of liking take the definite article: j\u2019aime le chocolat',
            'I know the avoir-expressions: j\u2019ai faim, j\u2019ai soif, j\u2019ai chaud, j\u2019ai froid',
            'I can order with je voudrais / je prends and ask for l\u2019addition',
            'I know the meal names: petit-déjeuner, déjeuner, dîner — and when they happen',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'The partitive is "some" — unspecific quantity. Choose by the noun: du + masculine (du pain), de la + feminine (de la viande), de l\u2019 + vowel (de l\u2019eau), des + plural (des pommes). Ask "what is this noun?" — the food is irrelevant, the grammar decides.',
                examples: [
                    { fr: 'Je mange du riz. · Je mange de la viande. · Je mange des légumes.', en: 'I eat rice. · meat. · vegetables.' },
                ],
            },
            {
                explanation: 'The negative de rule: du, de la and des ALL become de in a ne…pas sentence, because the quantity is negated away. Only the vowel rule survives: de becomes d\u2019 before a vowel (je n\u2019ai pas d\u2019argent).',
                examples: [
                    { fr: 'Je mange du pain. → Je ne mange pas de pain.', en: 'I eat bread → I do not eat bread.' },
                    { fr: 'Ils boivent des jus. → Ils ne boivent pas de jus.', en: 'They drink juices → They do not drink juice.' },
                ],
            },
            {
                explanation: 'Likes and dislikes use the DEFINITE article because you like the whole category: j\u2019aime le fromage, je déteste le café, je préfère les pommes. This is also why the negative de rule does not apply after aimer: je n\u2019aime pas le fromage (not de).',
                examples: [
                    { fr: 'J\u2019aime le pain. — Je préfère les croissants. — Je déteste le lait.', en: 'I like bread — I prefer croissants — I hate milk.' },
                ],
            },
            {
                explanation: 'The avoir family: faim (hungry), soif (thirsty), chaud (hot), froid (cold), peur (scared), raison (right), tort (wrong), … ans (old). English uses "to be"; French uses AVOIR. Je suis faim is the most famous A1 error in the world.',
                examples: [
                    { fr: 'J\u2019ai faim et j\u2019ai soif. — Tu as froid ? — Il a raison.', en: 'I am hungry and thirsty. — Are you cold? — He is right.' },
                ],
            },
            {
                explanation: 'Ordering: je voudrais (I would like) is the polite all-purpose order; je prends (I\u2019ll have) is the standard restaurant verb — from PRENDRE, an irregular: je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent. The bill: l\u2019addition — it never comes by itself.',
                examples: [
                    { fr: 'Je voudrais un croissant et je prends un café, s\u2019il vous plaît.', en: 'I would like a croissant and I\u2019ll have a coffee, please.' },
                ],
            },
            {
                explanation: 'The three meals: le petit-déjeuner (breakfast — bread, butter, jam, coffee), le déjeuner (lunch — traditionally the big one, 12:00–14:00), le dîner (dinner — late, ~20:00). They are masculine nouns, so au petit-déjeuner, au déjeuner, au dîner.',
                examples: [
                    { fr: 'Au petit-déjeuner, je mange du pain. Au dîner, nous mangeons du poulet.', en: 'For breakfast I eat bread. For dinner we eat chicken.' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'pain': { en: 'bread', gender: 'masculine', register: 'neutral', note: 'nasal — PAN; never the English word pain' },
        'croissant': { en: 'croissant', gender: 'masculine', plural: 'croissants', register: 'neutral' },
        'fromage': { en: 'cheese', gender: 'masculine', plural: 'fromages', register: 'neutral' },
        'beurre': { en: 'butter', gender: 'masculine', register: 'neutral' },
        'viande': { en: 'meat', gender: 'feminine', register: 'neutral' },
        'poulet': { en: 'chicken', gender: 'masculine', register: 'neutral' },
        'poisson': { en: 'fish', gender: 'masculine', register: 'neutral', note: 'double s — poison (one s) means poison!' },
        'riz': { en: 'rice', gender: 'masculine', register: 'neutral' },
        'salade': { en: 'salad', gender: 'feminine', register: 'neutral' },
        'eau': { en: 'water', gender: 'feminine', register: 'neutral', note: 'vowel start → l\u2019eau, de l\u2019eau' },
        'café': { en: 'coffee / café', gender: 'masculine', plural: 'cafés', register: 'neutral' },
        'thé': { en: 'tea', gender: 'masculine', register: 'neutral' },
        'lait': { en: 'milk', gender: 'masculine', register: 'neutral' },
        'vin': { en: 'wine', gender: 'masculine', register: 'neutral', note: 'different nasal from pain' },
        'bière': { en: 'beer', gender: 'feminine', register: 'neutral' },
        'pomme': { en: 'apple', gender: 'feminine', register: 'neutral' },
        'banane': { en: 'banana', gender: 'feminine', register: 'neutral' },
        'jus d\u2019orange': { en: 'orange juice', gender: 'masculine', register: 'neutral' },
        'petit-déjeuner': { en: 'breakfast', gender: 'masculine', register: 'neutral' },
        'déjeuner': { en: 'lunch / to have lunch', gender: 'masculine', register: 'neutral', note: '12:00–14:00 — the big meal' },
        'dîner': { en: 'dinner / to have dinner', gender: 'masculine', register: 'neutral', note: 'late — around 20:00' },
        'addition': { en: 'the bill', gender: 'feminine', register: 'neutral', note: 'never arrives unasked — call for it' },
        'pourboire': { en: 'tip', gender: 'masculine', register: 'neutral', note: 'optional — service compris (service is included)' },
        'délicieux': { en: 'delicious', register: 'neutral', note: 'feminine: délicieuse' },
        'célèbre': { en: 'famous', register: 'neutral' },
        'j\u2019ai faim': { en: 'I am hungry', register: 'neutral', note: 'lit. I have hunger — avoir, never être' },
        'j\u2019ai soif': { en: 'I am thirsty', register: 'neutral' },
        'mange': { en: 'eat(s) (from manger)', register: 'neutral', note: 'nous mangeons — e protects the g' },
        'buvons': { en: 'drink (nous form of boire)', register: 'neutral' },
        'prends': { en: 'take / have (je/tu form of prendre)', register: 'neutral' },
        'prenons': { en: 'take (nous form of prendre)', register: 'neutral', note: 'irregular — preNONS' },
        'mangeons': { en: 'eat (nous form of manger)', register: 'neutral' },
        'menu du jour': { en: 'set menu of the day', gender: 'masculine', register: 'formal' },
        'carafe d\u2019eau': { en: 'tap water (carafe)', gender: 'feminine', register: 'formal', note: 'free tap water — ask for une carafe d\u2019eau' },
        'tous les matins': { en: 'every morning', register: 'neutral' },
        'quelquefois': { en: 'sometimes', register: 'neutral' },
        'on y va': { en: 'shall we go (let\u2019s go)', register: 'informal' },
    },
};

// ── A1 · Daily Routine (Present Tense) ───────────────────────────────────────
const a1Routine: StaticFrenchLesson = {
    title: 'Daily Routine (Present Tense)',
    objective: 'Conjugate regular -ER verbs and reflexive verbs in the present, and narrate your full day in order with time expressions and sequence words — the backbone of every TCF speaking answer.',

    vocabulary: [
        { fr: 'se réveiller', en: 'to wake up', register: 'neutral', example: { fr: 'Je me réveille à six heures.', en: 'I wake up at six.' }, related: [{ fr: 'se lever', en: 'to get up' }] },
        { fr: 'se lever', en: 'to get up', register: 'neutral', example: { fr: 'Je me lève à sept heures.', en: 'I get up at seven.' }, related: [{ fr: 'se coucher', en: 'to go to bed' }] },
        { fr: 'se doucher', en: 'to shower', register: 'neutral', example: { fr: 'Je me douche rapidement.', en: 'I shower quickly.' }, related: [{ fr: 'se brosser les dents', en: 'to brush one\u2019s teeth' }] },
        { fr: 's\u2019habiller', en: 'to get dressed', register: 'neutral', example: { fr: 'Je m\u2019habille et je pars.', en: 'I get dressed and I leave.' }, related: [{ fr: 'se préparer', en: 'to get ready' }] },
        { fr: 'travailler', en: 'to work', register: 'neutral', example: { fr: 'Je travaille de neuf heures à dix-sept heures.', en: 'I work from nine to five.' }, related: [{ fr: 'étudier', en: 'to study' }] },
        { fr: 'manger', en: 'to eat', register: 'neutral', example: { fr: 'Je mange à midi.', en: 'I eat at noon.' }, related: [{ fr: 'boire', en: 'to drink' }] },
        { fr: 'rentrer', en: 'to go back home', register: 'neutral', example: { fr: 'Je rentre à dix-huit heures.', en: 'I get home at six pm.' }, related: [{ fr: 'sortir', en: 'to go out' }] },
        { fr: 'se coucher', en: 'to go to bed', register: 'neutral', example: { fr: 'Je me couche à vingt-deux heures.', en: 'I go to bed at ten pm.' }, related: [{ fr: 'dormir', en: 'to sleep' }] },
        { fr: 'd\u2019abord', en: 'first', register: 'neutral', example: { fr: 'D\u2019abord, je me lève.', en: 'First, I get up.' }, related: [{ fr: 'ensuite', en: 'then / next' }] },
        { fr: 'ensuite', en: 'then / next', register: 'neutral', example: { fr: 'Ensuite, je prends une douche.', en: 'Then I take a shower.' }, related: [{ fr: 'après', en: 'after / afterwards' }] },
        { fr: 'après', en: 'after / afterwards', register: 'neutral', example: { fr: 'Après, je prends mon petit-déjeuner.', en: 'After, I have breakfast.' }, related: [{ fr: 'enfin', en: 'finally' }] },
        { fr: 'enfin', en: 'finally', register: 'neutral', example: { fr: 'Enfin, je me couche vers vingt-trois heures.', en: 'Finally, I go to bed around eleven.' }, related: [{ fr: 'vers', en: 'around (a time)' }] },
        { fr: 'vers', en: 'around (a time)', register: 'neutral', example: { fr: 'Je rentre vers dix-huit heures.', en: 'I get home around six pm.' }, related: [{ fr: 'à', en: 'at (exact time)' }] },
        { fr: 'd\u2019habitude', en: 'usually', register: 'neutral', example: { fr: 'D\u2019habitude, je me lève tôt.', en: 'Usually I get up early.' }, related: [{ fr: 'tôt', en: 'early' }, { fr: 'tard', en: 'late' }] },
    ],

    pronunciation: [
        { fr: 'je me lève', approx: 'zhuh muh LEHV', en: 'the è is open — and it returns in ils se lèvent (lÈVE → lÈVENT)' },
        { fr: 'ils mangent', approx: 'eel MAHNZH', en: 'the -ent ending is COMPLETELY silent — ils mangent sounds like il mange' },
        { fr: 'nous mangeons', approx: 'noo mahn-ZHON', en: 'the e protects the g from going hard — mangeons = "mahn-ZHON"' },
        { fr: 'je me réveille', approx: 'zhuh muh ray-VEH-yuh', en: 'double l after i = y-glide, like fille' },
        { fr: 'je me couche', approx: 'zhuh muh KOOSH', en: 'ch is always sh — never k' },
        { fr: 'tôt', approx: 'TOH', en: 'early — the circumflex marks the long closed o' },
    ],

    grammar: {
        rule: 'Present tense -ER verbs: drop -er, add e/es/e/ons/ez/ent. Reflexive verbs add the matching person pronoun (me/te/se/nous/vous/se) before the verb.',
        explanation: 'Every regular -ER verb (80% of French verbs) works like parler: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent. The endings -e, -es, -e and -ent are ALL silent — only parlons and parlez are heard fully. Reflexive verbs (the daily-routine family) put the person pronoun BEFORE the verb: je me lève, tu te lèves… and in the nous/vous forms the pronoun matches: nous nous levons, vous vous levez. Two spelling wrinkles: manger takes nous mangeons (keep the soft g), and verbs like se lever double the accent in some forms (je me lève, nous nous levons, ils se lèvent).',
        examples: [
            { fr: 'Je me réveille à six heures et je me lève à six heures et quart.', en: 'I wake up at six and get up at quarter past six.', breakdown: ['je me réveille = I wake myself up', 'à six heures = at six', 'je me lève = I get myself up'] },
            { fr: 'D\u2019abord, je prends une douche et ensuite je m\u2019habille.', en: 'First I shower and then I get dressed.', breakdown: ['d\u2019abord = first', 'je prends une douche = I take a shower', 'ensuite = then', 'je m\u2019habille = I dress myself'] },
            { fr: 'Nous travaillons de neuf heures à dix-sept heures.', en: 'We work from nine to five.', breakdown: ['nous travaillons = we work (parler pattern: -ons)', 'de…à… = from…to…'] },
            { fr: 'Vous mangez à la cantine ? — Non, nous mangeons dehors.', en: 'Do you eat at the canteen? — No, we eat outside.', breakdown: ['vous mangez = you eat', 'dehors = outside'] },
            { fr: 'Ils se couchent très tard, vers minuit.', en: 'They go to bed very late, around midnight.', breakdown: ['ils se couchent = they put themselves to bed', 'très tard = very late', 'vers minuit = around midnight'] },
            { fr: 'Le week-end, je ne me lève pas tôt.', en: 'On weekends I do not get up early.', breakdown: ['le week-end = on weekends', 'ne … pas = not', 'tôt = early'] },
        ],
        commonMistakes: [
            'Pronouncing ils mangent with an ending — the -ent is silent: ils mangent = il mange (same sound!).',
            'Forgetting the reflexive pronoun: "Je lève à sept heures" — missing me. It is je ME lève.',
            'Wrong nous form for -ger and reflexives: nous mangeons (not mangons), nous nous levons (both pronouns).',
            'Mixing se lever (get up) and se réveiller (wake up): you wake up IN bed, then get up OUT of bed.',
        ],
    },

    transformations: [
        { type: 'Positive', fr: 'Je me lève à sept heures.', en: 'I get up at seven o\u2019clock.' },
        { type: 'Negative', fr: 'Je ne me lève pas à sept heures.', en: 'I do not get up at seven o\u2019clock.' },
        { type: 'Question (est-ce que)', fr: 'Est-ce que tu te lèves à sept heures ?', en: 'Do you get up at seven o\u2019clock?' },
        { type: 'Question word', fr: 'À quelle heure te lèves-tu ?', en: 'At what time do you get up?' },
        { type: 'Plural', fr: 'Nous nous levons à sept heures.', en: 'We get up at seven o\u2019clock.' },
        { type: 'Someone else', fr: 'Il se lève à sept heures et demie.', en: 'He gets up at half past seven.' },
        { type: 'Sequence', fr: 'Je me lève, je me douche et je prends mon petit-déjeuner.', en: 'I get up, shower, and have breakfast.' },
        { type: 'Frequency', fr: 'D\u2019habitude, je me lève tôt.', en: 'Usually I get up early.' },
    ],

    sentenceBuilding: [
        { fr: 'Je me réveille à six heures.', en: 'I wake up at six o\u2019clock.' },
        { fr: 'Je me réveille à six heures et je me lève à six heures et quart.', en: 'I wake up at six and get up at quarter past six.' },
        { fr: 'Je me réveille à six heures, je me lève à six heures et quart et je me douche.', en: 'I wake up at six, get up at quarter past six, and shower.' },
        { fr: 'Je me réveille à six heures, je me lève à six heures et quart, je me douche et je m\u2019habille.', en: 'I wake up at six, get up at quarter past six, shower, and get dressed.' },
        { fr: 'Je me réveille à six heures, je me lève à six heures et quart, je me douche, je m\u2019habille et enfin je prends mon petit-déjeuner à sept heures.', en: 'I wake up at six, get up at quarter past six, shower, get dressed, and finally have breakfast at seven.' },
    ],

    practice: [
        { instruction: 'Conjugate -ER:', question: 'Nous ______ (parler) français.', answer: 'parlons — the -ons nous ending' },
        { instruction: 'Conjugate the reflexive:', question: 'Je ______ (se lever) à sept heures.', answer: 'me lève — reflexive pronoun me + lève (è)' },
        { instruction: 'Conjugate:', question: 'Ils ______ (manger) à midi.', answer: 'mangent — and the -ent is silent!' },
        { instruction: 'Sequence word:', question: '______, je me douche. (then)', answer: 'Ensuite (or Après)' },
        { instruction: 'Translate:', question: 'They go to bed around eleven.', answer: 'Ils se couchent vers vingt-trois heures. (vers = around)' },
        { instruction: 'Make it negative:', question: 'Je me lève tôt.', answer: 'Je ne me lève pas tôt. (ne wraps the reflexive verb)' },
    ],

    translationPractice: [
        { en: 'I wake up at six o\u2019clock.', fr: 'Je me réveille à six heures.' },
        { en: 'First, I take a shower.', fr: 'D\u2019abord, je prends une douche.' },
        { en: 'We work from nine to five.', fr: 'Nous travaillons de neuf heures à dix-sept heures.' },
        { en: 'They go to bed very late.', fr: 'Ils se couchent très tard.' },
        { en: 'I do not get up early on Sundays.', fr: 'Le dimanche, je ne me lève pas tôt.' },
        { en: 'She gets dressed quickly.', fr: 'Elle s\u2019habille rapidement.' },
    ],

    reverseTranslation: [
        { fr: 'D\u2019abord, je me réveille à six heures.', en: 'First, I wake up at six o\u2019clock.' },
        { fr: 'Ensuite, nous prenons le petit-déjeuner.', en: 'Then we have breakfast.' },
        { fr: 'Je rentre vers dix-huit heures.', en: 'I get home around six pm.' },
        { fr: 'Ils se couchent vers minuit.', en: 'They go to bed around midnight.' },
    ],

    register: {
        informal: 'Je me lève à midi le week-end — la vie est dure ! (spoken: times get rounded, on me lève? no — on se lève is normal)',
        neutral: 'Je me réveille à six heures, je me lève à six heures et quart et je prends mon petit-déjeuner.',
        formal: 'D\u2019habitude, je commence ma journée à huit heures précises et je termine à dix-sept heures.',
    },

    culture: 'The French day has its own rhythm: a small breakfast, lunch at 12:30 sharp (often a full three courses at the cantine), children\u2019s goûter (snack) at 16:00, and dinner rarely before 19:30. Many shops close between 12:00 and 14:00 and on Sundays. Saying your routine is the classic TCF speaking opener — examiners love « Décrivez votre journée typique ».',

    freeProduction: 'Write or record your complete day from waking to sleeping (8–10 sentences). Guiding questions: What time do you wake up and get up (two different verbs!)? What do you do first, then, after? Where do you eat lunch and at what time? What do you do in the evening? What time do you go to bed — early or late? Do you ever sleep in (le week-end) ?',

    miniTest: [
        { question: 'Which is the correct nous form of manger?', options: ['nous mangons', 'nous mangeons', 'nous mangent', 'nous mangez'], answer: 'nous mangeons' },
        { question: 'Complete: Je ______ lève à sept heures.', options: ['me', 'te', 'se', 'le'], answer: 'me' },
        { question: 'The -ent in "ils mangent" is…', options: ['pronounced — MAN-zhent', 'silent — same sound as il mange', 'pronounced only in questions', 'pronounced before a vowel'], answer: 'silent — same sound as il mange' },
        { question: 'Which means "to wake up"?', options: ['se lever', 'se réveiller', 'se coucher', 's\u2019habiller'], answer: 'se réveiller' },
        { question: '"Ensuite" means…', options: ['first', 'finally', 'then / next', 'around'], answer: 'then / next' },
    ],

    review: [
        'Time expressions from the Numbers lecture plug straight in: à six heures, et quart, vers minuit.',
        'Avoir-expressions stay active: after work — j\u2019ai faim !',
    ],

    traps: [
        'Pronouncing ils mangent with a final sound — the -ent is silent: ils mangent sounds EXACTLY like il mange. Context and the verb spelling carry the plural.',
        'Dropping the reflexive pronoun: je ME lève, tu TE lèves. "Je lève à sept heures" is incomplete — lève what?',
        'se réveiller (wake up, eyes open) vs se lever (get up, leave the bed) — they are two different verbs in one morning.',
        'nous forms that break the pattern: nous mangeons (keep g soft), nous commençons (ç before o), nous nous levons (double pronoun).',
    ],

    homework: {
        intro: 'The present tense in every section — conjugate carefully, then read the explanations. The -ent silence and the reflexive pronouns are the graded details.',
        translation: [
            { prompt: 'I get up at seven o\u2019clock.', answer: 'Je me lève à sept heures.', explanation: 'se lever is reflexive: subject pronoun je + reflexive me + lève. The pronoun is mandatory.' },
            { prompt: 'We eat at noon.', answer: 'Nous mangeons à midi.', explanation: 'manger + nous → mangeons (the silent e keeps the g soft — mangons would say "man-GON").' },
            { prompt: 'They go to bed at eleven.', answer: 'Ils se couchent à onze heures.', explanation: 'se coucher reflexive: ils se couchent. The -ent ending is silent — sounds identical to il se couche.' },
            { prompt: 'First, I take a shower.', answer: 'D\u2019abord, je prends une douche.', explanation: 'prendre is irregular: je prends (not prende). D\u2019abord opens the sequence.' },
            { prompt: 'She gets dressed quickly.', answer: 'Elle s\u2019habille rapidement.', explanation: 's\u2019habiller is reflexive: elle s\u2019habille. rapidement = -ment adverb from rapide.' },
            { prompt: 'On Mondays I do not work.', answer: 'Le lundi, je ne travaille pas.', explanation: 'le + day for the habitual; the sandwich ne…pas wraps travaille directly.' },
            { prompt: 'They wake up around eight.', answer: 'Ils se réveillent vers huit heures.', explanation: 'se réveiller + vers for "around". The è appears in ils se réveillent too (not just je).' },
            { prompt: 'You (formal) get up very early.', answer: 'Vous vous levez très tôt.', explanation: 'vous + reflexive vous = vous vous levez. Both pronouns, and the vous form of lever is levez.' },
        ],
        blanks: [
            { prompt: 'Je ______ (se réveiller) à six heures.', answer: 'me réveille', alt: ['me reveille'], explanation: 'je + me + réveille. The reflexive pronoun always precedes the conjugated verb.' },
            { prompt: 'Nous ______ (manger) à midi.', answer: 'mangeons', explanation: 'manger + nous → mangeons. Without the e, g would go hard (mangons = "man-GON").' },
            { prompt: 'Tu ______ (se lever) à quelle heure ?', answer: 'te lèves', explanation: 'tu + te + lèves — the tu form adds -s, silent but written.' },
            { prompt: 'Ils ______ (se coucher) tard.', answer: 'se couchent', explanation: 'ils + se + couchent. The -ent is silent — sounds the same as il se couche.' },
            { prompt: 'Vous ______ (travailler) le samedi ?', answer: 'travaillez', explanation: 'regular -ER vous form: -ez. Always pronounced.' },
            { prompt: 'D\u2019abord je me lève, ______ je me douche. (then)', answer: 'ensuite', alt: ['après'], explanation: 'Sequence words chain the routine: d\u2019abord → ensuite → après → enfin.' },
        ],
        corrections: [
            { prompt: 'Je lève à sept heures.', answer: 'Je me lève à sept heures.', explanation: 'How the mistake happens: English "I get up" has no pronoun. Why it does not work: se lever is reflexive — the action bounces back on the subject, so the pronoun me/te/se is mandatory. How to fix it: subject + me/te/se + verb. je me lève, tu te lèves, il se lève…' },
            { prompt: 'Nous mangons à midi.', answer: 'Nous mangeons à midi.', explanation: 'How the mistake happens: applying the plain -ons rule. Why it does not work: a hard g before o sounds wrong in French — the spelling e keeps it soft. How to fix it: manger → nous mangeons; same family: nous commençons (ç for c).' },
            { prompt: 'Ils mange à midi.', answer: 'Ils mangent à midi.', explanation: 'How the mistake happens: "the -ent is silent, so why write it?" Why it does not work: the ending is silent in SPEECH but mandatory in WRITING — the exam grades your written conjugation. How to fix it: ils/elles + -ent for all regular -ER verbs.' },
            { prompt: 'Je me réveiller à six heures.', answer: 'Je me réveille à six heures.', explanation: 'How the mistake happens: leaving the verb in the infinitive. Why it does not work: the sentence needs a CONJUGATED verb — the infinitive cannot be the main verb. How to fix it: conjugate for je: je me réveille (è in the je/tu/il forms).' },
            { prompt: 'Je me douche et me lève.', answer: 'Je me douche et je me lève.', explanation: 'How the mistake happens: dropping the subject pronoun in the second clause. Why it does not work: French repeats the subject pronoun in each clause of a spoken sequence (unlike English). How to fix it: each clause gets its own subject: je me douche et je me lève.' },
        ],
        writing: {
            task: 'Write your complete typical day from waking to sleeping (8–10 sentences), in order with sequence words (d\u2019abord, ensuite, après, enfin) and at least four time expressions (à … heures, vers, le matin, le soir). Include two reflexive verbs (se lever, se doucher…) and one negation (je ne… pas).',
            requirements: [
                'At least six verbs in the present tense, conjugated correctly',
                'Four reflexive verbs (se réveiller, se lever, se doucher, se coucher…)',
                'Four time expressions (à sept heures, vers midi, le matin, le soir…)',
                'Sequence words: d\u2019abord, ensuite, après, enfin',
                'One negation (je ne… pas)',
            ],
            minWords: 60,
        },
        checklist: [
            'I conjugate regular -ER verbs: -e, -es, -e, -ons, -ez, -ent — and I know the -ent is silent',
            'I use nous mangeons and nous commençons (spelling protectors)',
            'I put the reflexive pronoun before the verb: je me lève, tu te lèves',
            'I know se réveiller (wake up) vs se lever (get up)',
            'I chain my routine with d\u2019abord, ensuite, après, enfin',
            'I can narrate my whole day out loud with times, in under a minute',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'The -ER pattern is one pattern for hundreds of verbs: drop -er, add e / es / e / ons / ez / ent. Only the -ons and -ez endings are heard; je/tu/il endings are silent. And ils/elles…ent is also silent — ils mangent = il mange in sound.',
                examples: [
                    { fr: 'je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent', en: 'I speak, you speak… — one pattern' },
                    { fr: 'ils travaillent = il travaille (same sound)', en: 'They work = He works (sound-identical).' },
                ],
            },
            {
                explanation: 'Reflexive verbs = subject + matching person pronoun + verb. The pronoun family is me, te, se, nous, vous, se — it copies the subject. In the negative, ne…pas wraps pronoun + verb: je ne me lève pas.',
                examples: [
                    { fr: 'je me réveille · tu te lèves · il se douche · nous nous levons · vous vous habillez · ils se couchent', en: 'I wake up · you get up · he showers · we get up · you get dressed · they go to bed' },
                ],
            },
            {
                explanation: 'Two morning verbs, two moments: se réveiller = wake up (in bed, eyes open), se lever = get up (leave the bed). Sequence them: Je me réveille à six heures mais je me lève à six heures et quart.',
                examples: [
                    { fr: 'Je me réveille à six heures mais je me lève à six heures et quart.', en: 'I wake at six but get up at quarter past.' },
                ],
            },
            {
                explanation: 'The nous spelling protectors: manger → nous mangeons (e keeps g soft), commencer → nous commençons (ç keeps c soft). Everywhere else the endings are regular.',
                examples: [
                    { fr: 'Nous mangeons à midi et nous commençons à travailler à treize heures.', en: 'We eat at noon and start working at one pm.' },
                ],
            },
            {
                explanation: 'Sequence words organize the day: d\u2019abord (first), ensuite (then), après (after), enfin (finally). Examiners reward them in every routine answer — one per clause.',
                examples: [
                    { fr: 'D\u2019abord je me douche, ensuite je m\u2019habille, après je prends mon petit-déjeuner et enfin je pars.', en: 'First I shower, then I get dressed, after I have breakfast and finally I leave.' },
                ],
            },
            {
                explanation: 'Time glue: à + exact time (à sept heures), vers + approximate (vers midi), de…à (from…to), le matin/l\u2019après-midi/le soir (parts of day), le + day (habitual). Combine: le lundi, je travaille de neuf heures à dix-sept heures.',
                examples: [
                    { fr: 'Le lundi, je travaille de neuf heures à dix-sept heures et le soir je me repose.', en: 'On Mondays I work nine to five and in the evening I rest.' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'se réveiller': { en: 'to wake up', register: 'neutral', note: 'in bed, eyes open — before se lever' },
        'se lever': { en: 'to get up', register: 'neutral', note: 'leave the bed — after se réveiller' },
        'se doucher': { en: 'to shower', register: 'neutral' },
        's\u2019habiller': { en: 'to get dressed', register: 'neutral' },
        'se brosser les dents': { en: 'to brush one\u2019s teeth', register: 'neutral' },
        'se coucher': { en: 'to go to bed', register: 'neutral' },
        'se préparer': { en: 'to get ready', register: 'neutral' },
        'travailler': { en: 'to work', register: 'neutral' },
        'étudier': { en: 'to study', register: 'neutral' },
        'rentrer': { en: 'to go back home', register: 'neutral' },
        'sortir': { en: 'to go out', register: 'neutral' },
        'dormir': { en: 'to sleep', register: 'neutral' },
        'd\u2019abord': { en: 'first', register: 'neutral' },
        'ensuite': { en: 'then / next', register: 'neutral' },
        'après': { en: 'after / afterwards', register: 'neutral' },
        'enfin': { en: 'finally', register: 'neutral' },
        'vers': { en: 'around (a time)', register: 'neutral' },
        'd\u2019habitude': { en: 'usually', register: 'neutral' },
        'tôt': { en: 'early', register: 'neutral', note: 'long closed o — circumflex' },
        'tard': { en: 'late', register: 'neutral' },
        'rapide': { en: 'fast', register: 'neutral' },
        'rapidement': { en: 'quickly', register: 'neutral', note: '-ment adverb from rapide' },
        'dehors': { en: 'outside', register: 'neutral' },
        'la cantine': { en: 'the canteen', gender: 'feminine', register: 'neutral' },
        'je me réveille': { en: 'I wake up', register: 'neutral' },
        'me lève': { en: '(I) get myself up', register: 'neutral' },
        'te lèves': { en: '(you) get yourself up', register: 'informal' },
        'se couchent': { en: '(they) go to bed', register: 'neutral', note: '-ent silent' },
        'prends une douche': { en: 'take a shower', register: 'neutral' },
        'parle': { en: 'speak(s) (from parler)', register: 'neutral' },
        'parlons': { en: 'speak (nous form of parler)', register: 'neutral' },
        'mangent': { en: 'eat (ils form of manger)', register: 'neutral', note: '-ent silent — same sound as il mange' },
        'regarder': { en: 'to watch / look at', register: 'neutral' },
        'la télé': { en: 'TV (informal)', gender: 'feminine', register: 'informal' },
    },
};

// ── A1 · Questions & Negation ────────────────────────────────────────────────
const a1Questions: StaticFrenchLesson = {
    title: 'Questions & Negation',
    objective: 'Ask any question three ways (intonation, est-ce que, inversion) with the right question word, and negate anything with the ne…pas sandwich, the de rule and the four other negation words.',

    vocabulary: [
        { fr: 'est-ce que', en: 'question marker (lit. is it that)', register: 'neutral', example: { fr: 'Est-ce que tu parles français ?', en: 'Do you speak French?' }, related: [{ fr: 'qu\u2019est-ce que', en: 'what (as object)' }] },
        { fr: 'où', en: 'where', register: 'neutral', example: { fr: 'Où habites-tu ?', en: 'Where do you live?' }, related: [{ fr: 'd\u2019où', en: 'where from' }] },
        { fr: 'quand', en: 'when', register: 'neutral', example: { fr: 'Quand est-ce que tu travailles ?', en: 'When do you work?' }, related: [{ fr: 'combien de temps', en: 'how long' }] },
        { fr: 'pourquoi', en: 'why', register: 'neutral', example: { fr: 'Pourquoi tu apprends le français ?', en: 'Why are you learning French?' }, related: [{ fr: 'parce que', en: 'because' }] },
        { fr: 'combien', en: 'how much / how many', register: 'neutral', example: { fr: 'Combien ça coûte ?', en: 'How much does it cost?' }, related: [{ fr: 'combien de temps', en: 'how long' }] },
        { fr: 'comment', en: 'how', register: 'neutral', example: { fr: 'Comment tu vas ?', en: 'How are you doing?' }, related: [{ fr: 'comment on dit… ?', en: 'how do you say…?' }] },
        { fr: 'jamais', en: 'never', register: 'neutral', example: { fr: 'Je ne fume jamais.', en: 'I never smoke.' }, related: [{ fr: 'toujours', en: 'always' }] },
        { fr: 'rien', en: 'nothing', register: 'neutral', example: { fr: 'Je ne vois rien.', en: 'I see nothing.' }, related: [{ fr: 'quelque chose', en: 'something' }] },
        { fr: 'personne', en: 'nobody', register: 'neutral', example: { fr: 'Je ne connais personne ici.', en: 'I know nobody here.' }, related: [{ fr: 'quelqu\u2019un', en: 'somebody' }] },
        { fr: 'plus', en: 'no longer / not anymore', register: 'neutral', example: { fr: 'Je ne travaille plus ici.', en: 'I no longer work here.' }, related: [{ fr: 'encore', en: 'still / again' }] },
        { fr: 'parce que', en: 'because', register: 'neutral', example: { fr: 'Parce que j\u2019aime la langue.', en: 'Because I love the language.' }, related: [{ fr: 'pour', en: 'for (purpose)' }] },
        { fr: 'd\u2019accord', en: 'okay / agreed', register: 'neutral', example: { fr: 'D\u2019accord, je viens.', en: 'Okay, I am coming.' }, related: [{ fr: 'pas question', en: 'no way (strong refusal)' }] },
    ],

    pronunciation: [
        { fr: 'est-ce que', approx: 'ess-KUH', en: 'two words said as one — "esskuh"' },
        { fr: 'qu\u2019est-ce que', approx: 'KESS-kuh', en: 'what — the qu\u2019 elides before est' },
        { fr: 'parce que', approx: 'par-SUH', en: 'because — final e silent' },
        { fr: 'd\u2019accord', approx: 'dah-kor', en: 'agreed — the d links into accord' },
        { fr: 'combien', approx: 'kohn-BYAN', en: 'how much — nasal com + byan' },
        { fr: 'personne', approx: 'pair-SON', en: 'nobody — double n but one nasal sound' },
    ],

    grammar: {
        rule: 'Three question shapes — intonation (spoken), est-ce que (safe everywhere), inversion (formal writing) — and one negation shape: ne + verb + pas, with un/une/des becoming de.',
        explanation: 'Statements become questions without changing word order: raise your voice (Tu parles français ?) or put est-ce que in front (Est-ce que tu parles français ?) — est-ce que is the safest in the exam. Inversion swaps verb and subject with a hyphen (Parles-tu français ?) and is required in formal writing; when the verb ends in a vowel and the subject is il/elle, insert -t-: parle-t-il ? Negation wraps the CONJUGATED verb: ne + verb + pas. And un/une/des disappear in negatives — je mange du pain → je ne mange pas DE pain. Beyond pas, French negates with jamais (never), rien (nothing), personne (nobody), plus (no longer) — the ne stays.',
        examples: [
            { fr: 'Tu parles français ? — Est-ce que tu parles français ? — Parlez-vous français ?', en: 'Do you speak French? — the same question, three registers.', breakdown: ['intonation = spoken', 'est-ce que = neutral', 'inversion = formal'] },
            { fr: 'Parle-t-il français ?', en: 'Does he speak French?', breakdown: ['parle = speaks', '-t- = inserted between vowel and il for sound', 'il = he'] },
            { fr: 'Je ne parle pas français.', en: 'I do not speak French.', breakdown: ['je = I', 'ne … pas = not (sandwich)', 'parle = speak'] },
            { fr: 'Je n\u2019ai pas de questions.', en: 'I have no questions.', breakdown: ['j\u2019ai = I have', 'n\u2019ai pas = negation', 'de questions = de rule: des → de'] },
            { fr: 'Il ne travaille jamais le dimanche.', en: 'He never works on Sundays.', breakdown: ['il ne travaille jamais = he never works', 'le dimanche = on Sundays'] },
            { fr: 'Pourquoi est-ce que tu apprends le français ? — Parce que j\u2019aime la langue.', en: 'Why are you learning French? — Because I love the language.', breakdown: ['pourquoi = why', 'parce que = because'] },
        ],
        commonMistakes: [
            'Using est-ce que with inversion together: "Est-ce que parles-tu français ?" — pick ONE system per question.',
            'Keeping un/une/des after negation: "Je n\u2019ai pas un frère" (when you mean none) → je n\u2019ai pas DE frère.',
            'Dropping ne in writing: "Je sais pas" is spoken French only — the exam grades the written ne.',
            'Using pourquoi… parce que without the gap: the question is pourquoi, the answer starts parce que — never swap them.',
        ],
    },

    transformations: [
        { type: 'Positive', fr: 'Tu parles français.', en: 'You speak French.' },
        { type: 'Question (intonation)', fr: 'Tu parles français ?', en: 'You speak French? (spoken)' },
        { type: 'Question (est-ce que)', fr: 'Est-ce que tu parles français ?', en: 'Do you speak French?' },
        { type: 'Question (inversion)', fr: 'Parles-tu français ?', en: 'Do you speak French? (formal)' },
        { type: 'Negative', fr: 'Tu ne parles pas français.', en: 'You do not speak French.' },
        { type: 'Negative + never', fr: 'Tu ne parles jamais français.', en: 'You never speak French.' },
        { type: 'Negative question', fr: 'Est-ce que tu ne parles pas français ?', en: 'Do you not speak French?' },
        { type: 'With question word', fr: 'Pourquoi tu ne parles pas français ?', en: 'Why do you not speak French?' },
    ],

    sentenceBuilding: [
        { fr: 'Tu parles français.', en: 'You speak French.' },
        { fr: 'Est-ce que tu parles français ?', en: 'Do you speak French?' },
        { fr: 'Est-ce que tu parles français ? — Oui, un peu.', en: 'Do you speak French? — Yes, a little.' },
        { fr: 'Est-ce que tu parles français ? — Oui, un peu, mais je ne parle pas espagnol.', en: 'Do you speak French? — Yes, a little, but I do not speak Spanish.' },
        { fr: 'Est-ce que tu parles français ? — Un peu, mais je ne parle pas espagnol et je ne comprends rien quand on parle vite.', en: 'Do you speak French? — A little, but I do not speak Spanish and I understand nothing when people speak fast.' },
    ],

    practice: [
        { instruction: 'Make the est-ce que question:', question: 'Tu travailles samedi.', answer: 'Est-ce que tu travailles samedi ?' },
        { instruction: 'Make the inversion question:', question: 'Vous parlez français.', answer: 'Parlez-vous français ?' },
        { instruction: 'Add -t- where needed:', question: 'Il parle français ? (inversion)', answer: 'Parle-t-il français ? (the t saves the vowel clash)' },
        { instruction: 'Make it negative:', question: 'J\u2019ai un frère.', answer: 'Je n\u2019ai pas de frère. (un → de)' },
        { instruction: 'Which negation word: "I see NOTHING"?', question: 'Je ne vois ______.', answer: 'rien — ne…rien = nothing' },
        { instruction: 'Answer with because:', question: 'Pourquoi tu étudies le français ?', answer: 'Parce que… + your reason (parce que j\u2019aime la langue)' },
    ],

    translationPractice: [
        { en: 'Do you speak French? (formal)', fr: 'Parlez-vous français ?' },
        { en: 'Where do you work?', fr: 'Où travaillez-vous ?' },
        { en: 'I do not have any questions.', fr: 'Je n\u2019ai pas de questions.' },
        { en: 'He never works on Sundays.', fr: 'Il ne travaille jamais le dimanche.' },
        { en: 'Why are you learning French?', fr: 'Pourquoi est-ce que tu apprends le français ?' },
        { en: 'Because I love the language.', fr: 'Parce que j\u2019aime la langue.' },
    ],

    reverseTranslation: [
        { fr: 'Est-ce que tu habites à Paris ?', en: 'Do you live in Paris?' },
        { fr: 'Je ne mange jamais de viande.', en: 'I never eat meat.' },
        { fr: 'Combien ça coûte ?', en: 'How much does it cost?' },
        { fr: 'Parle-t-il espagnol ?', en: 'Does he speak Spanish?' },
    ],

    register: {
        informal: 'Tu parles français ? — Ouais, un peu. (intonation only, ne dropped in speech: je sais pas)',
        neutral: 'Est-ce que tu parles français ? — Oui, je parle un peu français.',
        formal: 'Parlez-vous français ? — Oui, je le parle couramment. (inversion + formal reply)',
    },

    culture: 'Spoken French drops the written ne constantly — « je sais pas », « c\u2019est pas grave » — exactly like English "gonna". Understand it, but write the ne: the exam grades written grammar. And questions in French chat often skip est-ce que entirely, riding on intonation alone (« Tu viens ? »). The inversion you hear most is frozen politeness: « Puis-je vous aider ? » (May I help you?), « Comment allez-vous ? ».',

    freeProduction: 'Write or record a mini-interview with a French celebrity (8–10 lines): ask five different questions (est-ce que, inversion, and three question words — où, quand, pourquoi, combien) and write their short answers, two of which use negation (jamais, pas de…).',

    miniTest: [
        { question: 'Which is the SAFEST question form in the exam?', options: ['Tu parles français ?', 'Est-ce que tu parles français ?', 'Parles-tu français ?', 'Français tu parles ?'], answer: 'Est-ce que tu parles français ?' },
        { question: 'Inversion of "Il parle français"?', options: ['Il parle-t-français ?', 'Parle-il français ?', 'Parle-t-il français ?', 'Il parles français ?'], answer: 'Parle-t-il français ?' },
        { question: 'Negative of "J\u2019ai une question"?', options: ['Je n\u2019ai pas une question.', 'Je n\u2019ai pas de question.', 'Je ne ai pas question.', 'Je n\u2019ai question pas.'], answer: 'Je n\u2019ai pas de question.' },
        { question: '"Je ne vois rien" means…', options: ['I see everybody', 'I see nothing', 'I never see', 'I see again'], answer: 'I see nothing (ne…rien)' },
        { question: 'Answer to "Pourquoi ?" starts with…', options: ['pourquoi', 'parce que', 'que', 'quoi'], answer: 'parce que' },
    ],

    review: [
        'The sandwich ne…pas wraps verbs — including the reflexives from the Routine lecture: je ne me lève pas.',
        'Question words recycle everywhere: où, quand, comment appear in every TCF listening.',
    ],

    traps: [
        'Doubling question systems: "Est-ce que parles-tu français ?" — est-ce que OR inversion, never both.',
        'Forgetting -t- in inversion after a vowel: parle-t-il, travaille-t-elle — the t is pure pronunciation glue, but it must be written.',
        'Dropping the written ne because spoken French drops it: "je sais pas" is chat; the exam wants je ne sais pas.',
        'Keeping un/une/des after negation: je n\u2019ai pas DES questions — it is pas DE questions. (Only with être can un survive: ce n\u2019est pas un problème.)',
    ],

    homework: {
        intro: 'Questions in all three shapes, then the negation system. Write the ne even when your ear says it is silent — the ear is wrong for writing.',
        translation: [
            { prompt: 'Do you speak English? (est-ce que)', answer: 'Est-ce que tu parles anglais ?', alt: ["Est-ce que vous parlez anglais ?"], explanation: 'est-ce que + statement, unchanged word order. tu for informal, vous for formal — pick one and stay consistent.' },
            { prompt: 'Do you work on Saturdays? (inversion)', answer: 'Travaillez-vous le samedi ?', explanation: 'Inversion swaps verb and pronoun with a hyphen: travaillez-vous. The formal written question.' },
            { prompt: 'Does he speak Spanish?', answer: 'Parle-t-il espagnol ?', explanation: 'parle ends in a vowel and il starts with one — insert -t-: parle-t-il. Pure pronunciation glue, but it must be written.' },
            { prompt: 'I do not eat meat.', answer: 'Je ne mange pas de viande.', explanation: 'The sandwich ne…pas + the de rule: mangER → ne mange pas, and du… wait, viande takes de la → de in negatives.' },
            { prompt: 'She never watches TV.', answer: 'Elle ne regarde jamais la télé.', explanation: 'ne…jamais = never. jamais sits where pas sits: ne regarde jamais.' },
            { prompt: 'I see nothing.', answer: 'Je ne vois rien.', explanation: 'ne…rien = nothing. Rien goes after the verb, ne before — the sandwich holds.' },
            { prompt: 'Where do you live? (est-ce que)', answer: 'Où est-ce que tu habites ?', alt: ["Où habites-tu ?", "Où vivez-vous ?"], explanation: 'Question word first, then your chosen system: où + est-ce que + tu habites, or où + inversion (où habites-tu ?).' },
            { prompt: 'Why are you learning French? Because I love the language.', answer: 'Pourquoi apprends-tu le français ? Parce que j\u2019aime la langue.', alt: ["Pourquoi est-ce que tu apprends le français ? — Parce que j'aime la langue."], explanation: 'pourquoi asks; parce que answers. And apprendre conjugates: j\u2019apprends, tu apprends, il apprend.' },
        ],
        blanks: [
            { prompt: '______ tu parles français ?', answer: 'Est-ce que', alt: ['Est-ce que'], explanation: 'est-ce que goes BEFORE the statement, word order unchanged.' },
            { prompt: 'Parle-____-il français ?', answer: 't', explanation: 'parle ends in a vowel, il starts with one — insert -t- for pronunciation: parle-t-il.' },
            { prompt: 'Je ______ mange pas de viande.', answer: 'ne', alt: ["n'"], explanation: 'The sandwich needs both halves: ne before the verb, pas after.' },
            { prompt: 'Je ne vois ______. (nothing)', answer: 'rien', explanation: 'ne…rien = nothing. Both words together negate the verb.' },
            { prompt: 'Il ne travaille ______ le dimanche. (never)', answer: 'jamais', explanation: 'ne…jamais = never. Position: between ne and the verb, like pas.' },
            { prompt: '______ est-ce que tu habites ? (where)', answer: 'Où', explanation: 'Question word first (with its accent — où), then est-ce que, then the statement.' },
        ],
        corrections: [
            { prompt: 'Est-ce que tu parles-you français ?', answer: 'Est-ce que tu parles français ? — or — Parles-tu français ?', explanation: 'How the mistake happens: stacking two systems. Why it does not work: est-ce que and inversion are two different machines — combined, the sentence breaks. How to fix it: choose one. est-ce que + statement, OR inversion alone.' },
            { prompt: 'Je n\u2019ai pas des questions.', answer: 'Je n\u2019ai pas de questions.', explanation: 'How the mistake happens: keeping des because questions is plural. Why it does not work: the negative de rule outranks the plural — un/une/des all become de. How to fix it: ne…pas + de + noun (d\u2019 before a vowel).' },
            { prompt: 'Je parle ne pas français.', answer: 'Je ne parle pas français.', explanation: 'How the mistake happens: translating the English word order "I speak not French". Why it does not work: the French sandwich wraps the VERB — ne goes BEFORE it. How to fix it: subject + ne + conjugated verb + pas + rest.' },
            { prompt: 'Pourquoi tu apprends le français ? — Pourquoi j\u2019aime la langue.', answer: 'Pourquoi est-ce que tu apprends le français ? — Parce que j\u2019aime la langue.', explanation: 'How the mistake happens: using pourquoi in the answer. Why it does not work: pourquoi asks; PARCE QUE answers. How to fix it: the answer starts with parce que (+ the reason).' },
            { prompt: 'Il parle français ? — Non, il parle pas.', answer: 'Il parle français ? — Non, il ne parle pas.', explanation: 'How the mistake happens: copying spoken French that drops ne. Why it does not work: the written exam requires the full sandwich. How to fix it: always write ne (or n\u2019 before a vowel): il ne parle pas.' },
        ],
        writing: {
            task: 'Write a mini-interview (8–10 lines) with a French-speaking celebrity: five questions in three different shapes (one est-ce que, one inversion, three with question words — où, quand, pourquoi, combien), and the celebrity\u2019s short answers, two of which contain negation (ne…pas / ne…jamais / pas de).',
            requirements: [
                'At least one est-ce que question',
                'At least one inversion question (with -t- if needed)',
                'At least three different question words',
                'Two answers with negation (ne…pas / ne…jamais / pas de)',
                'One pourquoi… parce que pair',
            ],
            minWords: 50,
        },
        checklist: [
            'I can make a question three ways: intonation, est-ce que, inversion',
            'I insert -t- in inversions like parle-t-il',
            'The negation sandwich wraps the conjugated verb: ne + verb + pas',
            'In negatives, un/une/des become de (je n\u2019ai pas de…)',
            'I know the other negations: ne…jamais, ne…rien, ne…plus, ne…personne',
            'I answer pourquoi with parce que — and I never swap them',
        ],
    },
    checklistRemedial: [
            {
                explanation: 'Question shape 1 — intonation: say the statement, lift your voice. No words change. Perfect for speech, avoid in formal writing. Shape 2 — est-ce que: prefix it to any statement, word order untouched. Shape 3 — inversion: verb + hyphen + subject pronoun (parles-tu ?), required in formal writing.',
                examples: [
                    { fr: 'Tu parles français ? · Est-ce que tu parles français ? · Parlez-vous français ?', en: 'The same question — spoken, neutral, formal.' },
                ],
            },
            {
                explanation: 'The -t- glue: when the inverted verb ends in a vowel and the subject is il/elle/on, insert -t-: parle-t-il ? travaille-t-elle ? a-t-on ? It is pure pronunciation — but it must be written.',
                examples: [
                    { fr: 'Parle-t-il espagnol ? · Travaille-t-elle le samedi ? · A-t-on le temps ?', en: 'Does he speak Spanish? · Does she work Saturdays? · Do we have time?' },
                ],
            },
            {
                explanation: 'The sandwich: subject + ne (n\u2019 before a vowel) + CONJUGATED VERB + pas + rest. With infinitives the sandwich does not apply (refuser de parler). With reflexives it wraps pronoun + verb: je ne me lève pas.',
                examples: [
                    { fr: 'Je ne parle pas espagnol. · Je ne me lève pas tôt. · Je refuse de partir.', en: 'I do not speak Spanish. · I do not get up early. · I refuse to leave.' },
                ],
            },
            {
                explanation: 'The de rule: in negatives, un/une/des become de (d\u2019 before a vowel). The quantity is negated away. Only sentences with être keep the article: ce n\u2019est pas un chat.',
                examples: [
                    { fr: 'J\u2019ai un frère. → Je n\u2019ai pas de frère. · Il y a des livres. → Il n\u2019y a pas de livres.', en: 'I have a brother → no brother. · There are books → no books.' },
                ],
            },
            {
                explanation: 'The negation word family — all use ne: ne…jamais (never), ne…rien (nothing), ne…plus (no longer), ne…personne (nobody). They sit in the pas position. Rien and personne can also start a sentence (then ne follows the verb): Rien n\u2019est facile.',
                examples: [
                    { fr: 'Je ne fume jamais. · Il ne mange rien. · Elle ne sort plus. · Je ne vois personne.', en: 'I never smoke. · He eats nothing. · She no longer goes out. · I see nobody.' },
                ],
            },
            {
                explanation: 'pourquoi asks, parce que answers — never swap them. Also acceptable answers: car (formal because), comme (as/since, at the start). Practise a full exchange: Pourquoi… ? — Parce que… + your reason.',
                examples: [
                    { fr: 'Pourquoi tu apprends le français ? — Parce que j\u2019aime la langue et que c\u2019est utile.', en: 'Why are you learning French? — Because I love the language and it is useful.' },
                ],
            },
        ],

    glossary: {
        ...BASE_GLOSSARY,
        'est-ce que tu parles français': { en: 'do you speak French?', register: 'neutral' },
        'parles-tu': { en: 'do you speak? (inversion)', register: 'formal' },
        'parlez-vous': { en: 'do you speak? (formal inversion)', register: 'formal' },
        'parle-t-il': { en: 'does he speak? (-t- glue)', register: 'neutral', note: '-t- inserted after a vowel-ending verb' },
        'parle': { en: 'speak(s) (from parler)', register: 'neutral' },
        'français': { en: 'French (language/man)', gender: 'masculine', register: 'neutral' },
        'espagnol': { en: 'Spanish (language)', gender: 'masculine', register: 'neutral' },
        'anglais': { en: 'English (language)', gender: 'masculine', register: 'neutral' },
        'comprends': { en: 'understand (je/tu form of comprendre)', register: 'neutral' },
        'comprend': { en: 'understands', register: 'neutral' },
        'quand on parle vite': { en: 'when people speak fast', register: 'neutral' },
        'un peu': { en: 'a little', register: 'neutral' },
        'jamais': { en: 'never', register: 'neutral', note: 'ne…jamais — both words together' },
        'rien': { en: 'nothing', register: 'neutral', note: 'ne…rien — ne stays' },
        'personne': { en: 'nobody', register: 'neutral', note: 'ne…personne; also "a person" in some contexts' },
        'plus': { en: 'no longer / more', register: 'neutral', note: 'ne…plus = not anymore' },
        'parce que j\u2019aime la langue': { en: 'because I love the language', register: 'neutral' },
        'la langue': { en: 'the language / tongue', gender: 'feminine', register: 'neutral' },
        'utile': { en: 'useful', register: 'neutral' },
        'apprends': { en: 'learn (je/tu form of apprendre)', register: 'neutral' },
        'd\u2019accord': { en: 'okay / agreed', register: 'neutral' },
        'pas question': { en: 'no way (strong refusal)', register: 'informal' },
        'puis-je': { en: 'may I (very formal inversion)', register: 'formal', note: 'frozen politeness: Puis-je vous aider ?' },
        'je ne sais pas': { en: 'I do not know', register: 'neutral', note: 'spoken French drops ne: "je sais pas"' },
        'c\u2019est pas grave': { en: 'it is not a big deal (spoken)', register: 'informal', note: 'written: ce n\u2019est pas grave' },
        'sais': { en: 'know (a fact — from savoir)', register: 'neutral', note: 'savoir = know facts vs connaître = know people/places' },
        'vois': { en: 'see (je form of voir)', register: 'neutral' },
        'fume': { en: 'smoke(s) (from fumer)', register: 'neutral' },
        'étudies': { en: 'study (tu form of étudier)', register: 'neutral' },
    },
};

export const STATIC_A1_PART2: Record<string, StaticFrenchLesson> = {
    'A1:food': a1Food,
    'A1:routine': a1Routine,
    'A1:questions': a1Questions,
};
