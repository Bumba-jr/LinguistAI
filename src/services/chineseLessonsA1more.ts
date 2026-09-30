// Chinese HSK-1 lectures part 2 — Food & Drinks, Questions & Negation.
// Same format; ALL text pre-segmented. Extras exported for the registry merge.

import type { HskLesson } from './hskService';
import { BASE_GLOSSARY, type ChineseGlossEntry } from './chineseLessonBase';
import type { WarmupItem, VerbTableBlock, UseCaseBlock, ShadowingBlock } from './frenchLessons';
import type { StaticChineseLesson } from './chineseLessons';

// ── HSK 1 · Food, Drinks & Eating ───────────────────────────────────────────
const h1Food: StaticChineseLesson = {
    title: 'Food, Drinks & Eating',
    objective: 'Order food and drinks with 要 and 想, eat and drink with 吃/喝, place the action with 在 + place + verb, ask the price with 多少钱, and pay in 块 — the café-and-canteen skill HSK 1 listening actually tests.',

    vocabulary: [
        { hanzi: '吃 饭', pinyin: 'chī fàn', en: 'to eat (lit. eat rice = have a meal)', example: { hanzi: '我 们 十 二 点 吃 饭 。', pinyin: 'wǒmen shí\u2019èr diǎn chī fàn .', en: 'We eat at twelve.' }, related: [{ hanzi: '米 饭', pinyin: 'mǐfàn', en: 'cooked rice' }] },
        { hanzi: '喝', pinyin: 'hē', en: 'to drink', example: { hanzi: '我 喝 茶 。', pinyin: 'wǒ hē chá .', en: 'I drink tea.' }, related: [{ hanzi: '喝 水', pinyin: 'hē shuǐ', en: 'drink water' }] },
        { hanzi: '茶', pinyin: 'chá', en: 'tea', measureWord: '杯', example: { hanzi: '一 杯 茶', pinyin: 'yì bēi chá', en: 'a cup of tea' }, related: [{ hanzi: '绿 茶', pinyin: 'lǜchá', en: 'green tea (hidden ü!)' }] },
        { hanzi: '水', pinyin: 'shuǐ', en: 'water', measureWord: '杯', example: { hanzi: '请 给 我 水 。', pinyin: 'qǐng gěi wǒ shuǐ .', en: 'Please give me water.' }, related: [{ hanzi: '喝 水', pinyin: 'hē shuǐ', en: 'drink water' }] },
        { hanzi: '菜', pinyin: 'cài', en: 'dish / vegetable / cuisine', measureWord: '个', example: { hanzi: '这 个 菜 很 好 吃 。', pinyin: 'zhè ge cài hěn hǎochī .', en: 'This dish is delicious.' }, related: [{ hanzi: '中 国 菜', pinyin: 'Zhōngguó cài', en: 'Chinese food' }] },
        { hanzi: '苹 果', pinyin: 'píngguǒ', en: 'apple', measureWord: '个', example: { hanzi: '我 要 一 个 苹 果 。', pinyin: 'wǒ yào yí ge píngguǒ .', en: 'I\u2019ll have an apple.' }, related: [{ hanzi: '水 果', pinyin: 'shuǐguǒ', en: 'fruit' }] },
        { hanzi: '要', pinyin: 'yào', en: 'to want / will have (ordering)', example: { hanzi: '我 要 一 杯 茶 。', pinyin: 'wǒ yào yì bēi chá .', en: 'I\u2019ll have a tea.' }, related: [{ hanzi: '想', pinyin: 'xiǎng', en: 'would like (softer)' }] },
        { hanzi: '想', pinyin: 'xiǎng', en: 'would like / want to / miss', example: { hanzi: '我 想 喝 水 。', pinyin: 'wǒ xiǎng hē shuǐ .', en: 'I\u2019d like some water.' }, related: [{ hanzi: '想 吃', pinyin: 'xiǎng chī', en: 'feel like eating' }] },
        { hanzi: '饭 馆', pinyin: 'fànguǎn', en: 'restaurant', measureWord: '家', example: { hanzi: '饭 馆 在 哪 儿 ？', pinyin: 'fànguǎn zài nǎr ?', en: 'Where is the restaurant?' }, related: [{ hanzi: '中 国 饭 馆', pinyin: 'Zhōngguó fànguǎn', en: 'Chinese restaurant' }] },
        { hanzi: '多 少 钱', pinyin: 'duōshao qián', en: 'how much money', example: { hanzi: '一 杯 茶 多 少 钱 ？', pinyin: 'yì bēi chá duōshao qián ?', en: 'How much is a tea?' }, related: [{ hanzi: '块', pinyin: 'kuài', en: 'yuan (money measure)' }] },
        { hanzi: '好 吃', pinyin: 'hǎochī', en: 'delicious (lit. good-eat)', example: { hanzi: '中 国 菜 很 好 吃 。', pinyin: 'Zhōngguó cài hěn hǎochī .', en: 'Chinese food is delicious.' }, related: [{ hanzi: '很 好 喝', pinyin: 'hěn hǎohē', en: 'very tasty (to drink!)' }] },
        { hanzi: '给', pinyin: 'gěi', en: 'to give / for', example: { hanzi: '请 给 我 一 杯 水 。', pinyin: 'qǐng gěi wǒ yì bēi shuǐ .', en: 'Please give me a water.' }, related: [{ hanzi: '给 你', pinyin: 'gěi nǐ', en: 'for you / here you go' }] },
    ],

    characters: [
        { hanzi: '吃', pinyin: 'chī', en: 'to eat', components: '口(mouth) + 乞(beg)', mnemonic: 'A MOUTH + beg — eating begins at the mouth. Every eating/drinking verb carries 口: 吃 喝 叫 问.' },
        { hanzi: '喝', pinyin: 'hē', en: 'to drink', components: '口(mouth) + 曷', mnemonic: 'MOUTH again — the drinking mouth. Pairs with 吃 in the exam\u2019s favourite double: 吃 喝.' },
        { hanzi: '茶', pinyin: 'chá', en: 'tea', components: '艹(grass) + 人 + 木(tree)', mnemonic: 'A PERSON among the GRASS and TREES — tea leaves picked between the plants. The world\u2019s oldest beverage character.' },
        { hanzi: '菜', pinyin: 'cài', en: 'dish / vegetable', components: '艹(grass) + 采(pick)', mnemonic: 'GRASS that is PICKED = vegetables = dishes. The 艹 top radical marks the plant foods: 菜 苹 茶.' },
        { hanzi: '饭', pinyin: 'fàn', en: 'cooked rice / meal', components: '饣(food) + 反', mnemonic: 'The FOOD radical 饣 (a little rice-pot). 饭 means the meal itself — 吃饭 is "eat rice" = eat a meal.' },
        { hanzi: '给', pinyin: 'gěi', en: 'to give', components: '纟(silk) + 合(combine)', mnemonic: 'Silk thread + join — giving ties people together. 请给我 = please-give-me.' },
    ],

    pronunciation: [
        { hanzi: '吃 vs 喝', pinyin: 'chī · hē', toneNote: 'Both 1st tone, both 口-verbs: ch- is retroflex (curl), h- is a soft throat h.', en: 'The eating/drinking pair — keep the initials apart.' },
        { hanzi: '茶', pinyin: 'chá', toneNote: 'Rising 2nd tone — the word that travelled the world as "cha".', en: 'Same word in chai, tea\u2019s cousin.' },
        { hanzi: '水 果', pinyin: 'shuǐguǒ', toneNote: '3-3 sandhi again: shuǐguǒ → shuíguǒ.', en: 'Fruit: two dips become rise-dip.' },
        { hanzi: '多 少 钱', pinyin: 'duōshao qián', toneNote: '少 neutral in this fixed question; 钱 rises.', en: 'The price question\u2019s exact music.' },
        { hanzi: '很 好 吃', pinyin: 'hěn hǎochī', toneNote: '3-3 sandhi: hěn hǎo → hén hǎo, then 吃 high-flat.', en: 'The compliment chain: hén hǎochī.' },
        { hanzi: '绿 茶', pinyin: 'lǜchá', toneNote: 'THE ü word: lǜ — dots stay after l! Rounded lips, 4th tone.', en: 'Green tea: lü + cha.' },
    ],

    grammar: {
        rule: 'Ordering: 要 (I\u2019ll have — firm) and 想 (I\u2019d like — soft) + the thing, no prepositions. Place the action with 在 + place + verb (我在家吃饭). Ask prices with 多少钱 and pay in 块. Compliments: 很好吃 for food, 很好喝 for drinks.',
        explanation: 'Chinese food-talk is verb + object with nothing in between: 吃米饭 (eat rice), 喝茶 (drink tea) — no articles, no "some". Between 要 and 想: 要 states your order (我要一杯茶 — I\u2019ll HAVE a tea; a decision), 想 softens it (我想喝咖啡 — I FEEL LIKE coffee). Both keep the second verb bare: 想吃, 要喝. Location joins the sentence BEFORE the verb: 我在家吃饭 (I at-home eat = I eat at home), 他在饭馆喝茶. Prices: 这个多少钱？answered in 块 (colloquial yuan): 十块 (ten kuai), or 十五块五 (15.5). The measure words pair up with containers: 一杯茶 (a CUP of tea), 一瓶水 (a BOTTLE of water), 一碗饭 (a BOWL of rice) — the container IS the measure word. Compliments split by sense: food is 好吃 (good-eat), drinks are 好喝 (good-drink) — 好吃 for tea sounds charmingly wrong to natives.',
        examples: [
            { hanzi: '我 要 一 杯 茶 。', pinyin: 'wǒ yào yì bēi chá .', en: 'I\u2019ll have a cup of tea.', breakdown: ['要 = will-have (ordering)', '一杯 = one CUP (measure)', '茶 = tea'] },
            { hanzi: '我 想 吃 米 饭 。', pinyin: 'wǒ xiǎng chī mǐfàn .', en: 'I feel like eating rice.', breakdown: ['想 = would like', '吃 = eat (bare verb)', '米饭 = cooked rice'] },
            { hanzi: '我 在 家 吃 饭 。', pinyin: 'wǒ zài jiā chī fàn .', en: 'I eat at home.', breakdown: ['在 = at (place BEFORE verb)', '家 = home', '吃饭 = eat a meal'] },
            { hanzi: '这 个 多 少 钱 ？ —— 十 五 块 。', pinyin: 'zhè ge duōshao qián ? —— shíwǔ kuài .', en: 'How much is this? — Fifteen kuai.', breakdown: ['多少钱 = how-much money', '块 = the colloquial yuan', 'no verb in the answer'] },
            { hanzi: '中 国 菜 很 好 吃 ！', pinyin: 'Zhōngguó cài hěn hǎochī !', en: 'Chinese food is delicious!', breakdown: ['中国菜 = Chinese cuisine', '很好吃 = very good-EAT', 'food compliment'] },
            { hanzi: '请 给 我 一 瓶 水 。', pinyin: 'qǐng gěi wǒ yì píng shuǐ .', en: 'Please give me a bottle of water.', breakdown: ['请给我 = please-give-me', '一瓶 = one BOTTLE', '水 = water'] },
        ],
        commonMistakes: [
            '好吃 for drinks: 茶很好吃 — WRONG. Food is 好吃 (good-EAT), drinks are 好喝 (good-DRINK). The exam listening loves this pair.',
            'Forgetting the container measure: 一茶 — WRONG. Liquids ride in containers: 一杯茶, 一瓶水, 一碗饭. 个 works for apples, not for tea.',
            'Prepositions sneaking in: 我喝茶在英语? No — English "I drink tea at home" → 在 home goes BEFORE the verb: 我在家喝茶, never ✗ 我喝茶在家.',
            '要 vs 想 register mix-up at a counter: 要 is firm and normal for ordering; 想 alone can sound wistful — 想要 combines them politely when unsure.',
        ],
    },

    patterns: [
        { type: 'Order firmly', hanzi: '我 要 一 杯 茶 。', pinyin: 'wǒ yào yì bēi chá .', en: 'I\u2019ll have a tea.' },
        { type: 'Soften it', hanzi: '我 想 喝 咖 啡 。', pinyin: 'wǒ xiǎng hē kāfēi .', en: 'I\u2019d like a coffee.' },
        { type: 'Place the meal', hanzi: '我 在 饭 馆 吃 饭 。', pinyin: 'wǒ zài fànguǎn chī fàn .', en: 'I eat at the restaurant.' },
        { type: 'Ask the price', hanzi: '这 个 多 少 钱 ？', pinyin: 'zhè ge duōshao qián ?', en: 'How much is this?' },
        { type: 'Compliment food', hanzi: '很 好 吃 ！', pinyin: 'hěn hǎochī !', en: 'Delicious! (food)' },
        { type: 'Compliment drink', hanzi: '很 好 喝 ！', pinyin: 'hěn hǎohē !', en: 'Delicious! (drink)' },
    ],

    sentenceBuilding: [
        { hanzi: '我 喝 茶 。', pinyin: 'wǒ hē chá .', en: 'I drink tea.' },
        { hanzi: '我 在 家 喝 茶 。', pinyin: 'wǒ zài jiā hē chá .', en: 'I drink tea at home.' },
        { hanzi: '我 在 家 喝 中 国 茶 ， 很 好 喝 。', pinyin: 'wǒ zài jiā hē Zhōngguó chá , hěn hǎohē .', en: 'I drink Chinese tea at home — it\u2019s delicious.' },
        { hanzi: '今 天 我 在 饭 馆 吃 中 国 菜 ， 花 了 三 十 块 钱 。', pinyin: 'jīntiān wǒ zài fànguǎn chī Zhōngguó cài , huā le sānshí kuài qián .', en: 'Today I ate Chinese food at a restaurant; it cost 30 kuai.' },
        { hanzi: '这 家 饭 馆 的 菜 很 好 吃 ， 我 明 天 还 想 来 。', pinyin: 'zhè jiā fànguǎn de cài hěn hǎochī , wǒ míngtiān hái xiǎng lái .', en: 'This restaurant\u2019s food is delicious — I want to come again tomorrow.' },
    ],

    practice: [
        { instruction: 'Order it (firm):', question: '我 ___ 一 杯 茶 。', answer: '要 — the decision verb for ordering' },
        { instruction: 'Soften it:', question: '我 ___ 喝 咖 啡 。', answer: '想 — would-like' },
        { instruction: 'Place the meal:', question: '我 ___ 家 吃 饭 。', answer: '在 — 在 + place BEFORE the verb' },
        { instruction: 'Measure the tea:', question: '一 ___ 茶 。', answer: '杯 — the container measure' },
        { instruction: 'Compliment the tea:', question: '这 茶 很 ___ 。', answer: '好喝 — drinks take 好喝' },
        { instruction: 'Ask the price:', question: '这 个 ___ 钱 ？', answer: '多少 — 多少钱' },
    ],

    translationPractice: [
        { en: 'I\u2019ll have a cup of tea.', hanzi: '我 要 一 杯 茶 。', pinyin: 'wǒ yào yì bēi chá .' },
        { en: 'I\u2019d like some water.', hanzi: '我 想 喝 水 。', pinyin: 'wǒ xiǎng hē shuǐ .' },
        { en: 'We eat at home.', hanzi: '我 们 在 家 吃 饭 。', pinyin: 'wǒmen zài jiā chī fàn .' },
        { en: 'This dish is delicious.', hanzi: '这 个 菜 很 好 吃 。', pinyin: 'zhè ge cài hěn hǎochī .' },
        { en: 'How much is the apple?', hanzi: '苹 果 多 少 钱 ？', pinyin: 'píngguǒ duōshao qián ?' },
        { en: 'Please give me a bottle of water.', hanzi: '请 给 我 一 瓶 水 。', pinyin: 'qǐng gěi wǒ yì píng shuǐ .' },
    ],

    reverseTranslation: [
        { hanzi: '我 在 饭 馆 吃 中 国 菜 。', pinyin: 'wǒ zài fànguǎn chī Zhōngguó cài .', en: 'I eat Chinese food at the restaurant.' },
        { hanzi: '一 杯 绿 茶 多 少 钱 ？', pinyin: 'yì bēi lǜchá duōshao qián ?', en: 'How much is a cup of green tea?' },
        { hanzi: '妈 妈 说 这 个 菜 很 好 吃 。', pinyin: 'māma shuō zhè ge cài hěn hǎochī .', en: 'Mom says this dish is delicious.' },
        { hanzi: '我 明 天 还 想 来 。', pinyin: 'wǒ míngtiān hái xiǎng lái .', en: 'I want to come again tomorrow.' },
    ],

    register: {
        casual: '来 杯 茶 ！ — drop everything: "give us a tea!" (with friends, at the canteen)',
        polite: '服 务 员 ， 我 要 一 杯 茶 ， 谢 谢 。 — address the server, order, thank.',
        formal: '请 允 许 我 为 您 上 茶 。 — ceremonial tea-serving language (recognize in formal listening).',
    },

    culture: 'To eat in Chinese is literally to eat RICE — 吃饭 — and 吃了吗？ (eaten yet?) is the traditional hello between neighbours. Meals are SHARED: dishes land in the middle, everyone reaches with their own chopsticks, and the host piles food onto your plate as affection — refuse twice, accept the third. Tea (茶) arrives unsweetened and refills forever; tipping does not exist. And the number gesture at markets: prices in 块 (kuai, slang for yuan) negotiated with one hand — six is the pinky-pinky hook, ten is a crossed fist. When a Chinese friend says 好吃好吃! while serving you more, that is love, not grammar.',

    freeProduction: 'Record your food day (7–9 lines): what you eat in the morning (我早上吃…), where (在家/在学校食堂), what you drink (喝…), your favourite Chinese dish and its compliment (很好吃!), one price you know (…块钱), and what you want to try tomorrow (我想吃…). Then role-play ordering: the waiter asks 您喝什么？ — answer with 要 + container + drink.',

    miniTest: [
        { question: 'Order a tea firmly:', options: ['我 想 一 杯 茶 。', '我 要 一 杯 茶 。', '我 吃 一 杯 茶 。', '我 在 一 杯 茶 。'], answer: '我 要 一 杯 茶 。 — 要 orders; 茶 needs a container measure' },
        { question: 'Compliment the tea:', options: ['很 好 吃', '很 好 喝', '很 是 好', '很 有 茶'], answer: '很 好 喝 — drinks take 好喝' },
        { question: 'I eat AT home:', options: ['我 吃 饭 在 家 。', '我 在 家 吃 饭 。', '我 家 在 吃 饭 。', '我 在 吃 家 饭 。'], answer: '我 在 家 吃 饭 。 — 在 + place BEFORE the verb' },
        { question: 'One bottle of water:', options: ['一 个 水', '一 杯 水', '一 瓶 水', '一 碗 水'], answer: '一 瓶 水 — the container is the measure' },
        { question: 'The price answer 十五块 means:', options: ['15 kuai (yuan)', '50 kuai', '5.15 kuai', '15 people'], answer: '15 kuai (yuan)' },
    ],

    review: [
        'The numbers lecture\u2019s 多少钱 and 块 return for every bill here.',
        '要/想 are your first modals — the ability lecture (会/能/可以) completes the HSK-1 modal set next.',
    ],

    traps: [
        '好吃 (food) vs 好喝 (drinks) — misusing them is the exam\u2019s cutest trap. 茶很好吃 is wrong.',
        'Liquids take container measures: 一杯茶, 一瓶水, 一碗饭 — bare 一茶 does not exist.',
        '在 + place goes BEFORE the verb: 我在家吃饭 — moving it after the verb is a word-order error.',
        '要 = decided order; 想 = feeling like it. At the counter use 要 (or 想要 to hedge politely).',
    ],

    homework: {
        intro: 'The café engine: 要/想 + container + drink, 在-place meals, 好吃/好喝 compliments, 块 prices.',
        translation: [
            { prompt: 'I\u2019ll have a cup of tea.', answer: '我 要 一 杯 茶 。', alt: ['我要一杯茶。'], explanation: '要 + 一 + container (杯) + drink. 一 → yí before 杯 (2nd? 杯 is 1st — so yì bēi).' },
            { prompt: 'I\u2019d like to eat Chinese food.', answer: '我 想 吃 中 国 菜 。', alt: ['我想吃中国菜。'], explanation: '想 + bare verb 吃; the cuisine noun follows directly.' },
            { prompt: 'We eat at the restaurant.', answer: '我 们 在 饭 馆 吃 饭 。', alt: ['我们在饭馆吃饭。'], explanation: '在 + place BEFORE the verb — the location slot is pre-verbal.' },
            { prompt: 'How much is this dish?', answer: '这 个 菜 多 少 钱 ？', alt: ['这个菜多少钱？'], explanation: '多少钱 ends the question; 这 is the pointing word.' },
            { prompt: 'This tea is very good (to drink).', answer: '这 茶 很 好 喝 。', alt: ['这茶很好喝。'], explanation: 'Drinks take 好喝 — the drink-compliment.' },
            { prompt: 'Please give me a bottle of water.', answer: '请 给 我 一 瓶 水 。', alt: ['请给我一瓶水。'], explanation: '请给我 + thing; 瓶 = bottle-measure.' },
        ],
        blanks: [
            { prompt: '我 ___ 一 杯 咖 啡 。 (firm order)', answer: '要', explanation: '要 = the ordering verb.' },
            { prompt: '我 ___ 吃 米 饭 。 (would like)', answer: '想', explanation: '想 = feel-like/would-like + bare verb.' },
            { prompt: '我 在 饭 ___ 吃 饭 。 (restaurant)', answer: '馆', explanation: '饭馆 — restaurant; 家 is also its measure (一家饭馆).' },
            { prompt: '一 ___ 水 。 (bottle)', answer: '瓶', explanation: '瓶 = the bottle measure for liquids.' },
            { prompt: '这 个 菜 很 ___ 。 (delicious — food)', answer: '好吃', explanation: '好吃 = good-EAT for food.' },
            { prompt: '二 十 ___ 钱 。 (kuai)', answer: '块', explanation: '块 = the colloquial yuan measure.' },
        ],
        corrections: [
            { prompt: '这 个 茶 很 好 吃 。', answer: '这 个 茶 很 好 喝 。', explanation: 'How the mistake happens: one compliment word. Why it does not work: 好吃 is EAT-food only; drinks take 好喝. How to fix it: 很好喝 for tea, coffee, water.' },
            { prompt: '我 喝 茶 在 家 。', answer: '我 在 家 喝 茶 。', explanation: 'How the mistake happens: English word order (verb first). Why it does not work: the place slot sits BEFORE the verb in Chinese. How to fix it: 我在家喝茶.' },
            { prompt: '我 要 茶 。', answer: '我 要 一 杯 茶 。', explanation: 'How the mistake happens: dropping the container. Why it does not work: liquids need container measures (杯/瓶/碗). How to fix it: 一杯茶.' },
            { prompt: '我 想 在 家 吃 饭 的 菜 。', answer: '我 想 吃 家 里 的 菜 。 / 我 在 家 吃 菜 。', explanation: 'How the mistake happens: stacking 想 + 在 + 的-phrase into one blob. Why it does not work: two jobs (want + place) need two clean slots. How to fix it: 我在…吃… or 我想吃…的菜.' },
            { prompt: '多 少 钱 这 个 ？', answer: '这 个 多 少 钱 ？', explanation: 'How the mistake happens: English "how much is this". Why it does not work: the question word stays in the object slot, topic first. How to fix it: 这个多少钱？' },
        ],
        writing: {
            task: 'Write your eating day (7–9 short sentences): three meals with places (早上在家吃…, 中午在学校食堂吃…), one drink with container (一杯茶/一瓶水), one compliment (很好吃/很好喝), one price (…块钱), and one tomorrow-wish (我明天想吃…).',
            requirements: [
                'One 在 + place + verb sentence',
                'One container measure (杯/瓶/碗)',
                'Both compliments used once each: 很好吃 + 很好喝',
                'One 块 price',
                'One 想 + verb wish',
            ],
            minWords: 45,
        },
        checklist: [
            'I order with 要 and soften with 想 (+ bare verb)',
            'I place meals with 在 + place BEFORE the verb',
            'I pick container measures: 杯 (cup), 瓶 (bottle), 碗 (bowl)',
            'I compliment food with 好吃 and drinks with 好喝',
            'I ask and answer prices: 多少钱？——…块(钱)',
            'I know the food characters: 吃 喝 茶 菜 饭 — all mouths and plants',
        ],
    },
    checklistRemedial: [
        {
            explanation: '要 vs 想: 要 = the decided order (我要一杯茶); 想 = the soft wish (我想喝咖啡). Polite hedge: 我想要一杯茶.',
            examples: [
                { hanzi: '我 要 一 杯 茶 。 · 我 想 喝 咖 啡 。', pinyin: 'wǒ yào yì bēi chá · wǒ xiǎng hē kāfēi', en: 'I\u2019ll have a tea · I\u2019d like a coffee' },
            ],
        },
        {
            explanation: 'Container measures ARE the measure words for liquids and servings: 杯 (cup), 瓶 (bottle), 碗 (bowl), 盘 (plate): 一杯茶, 一瓶水, 一碗米饭.',
            examples: [
                { hanzi: '一 杯 茶 · 一 瓶 水 · 一 碗 米 饭', pinyin: 'yì bēi chá · yì píng shuǐ · yì wǎn mǐfàn', en: 'a tea · a water · a bowl of rice' },
            ],
        },
        {
            explanation: 'Location slot: 在 + place comes BEFORE the verb — 我在家吃饭, 他在饭馆喝茶. The verb never moves right.',
            examples: [
                { hanzi: '我 在 家 吃 饭 。 · 他 在 学 校 吃 饭 。', pinyin: 'wǒ zài jiā chī fàn · tā zài xuéxiào chī fàn', en: 'I eat at home · he eats at school' },
            ],
        },
        {
            explanation: 'Compliments split by sense: 好吃 = good-EAT (food), 好喝 = good-DRINK (tea, soup counts as drink-able!). Both take 很.',
            examples: [
                { hanzi: '菜 很 好 吃 。 茶 很 好 喝 。', pinyin: 'cài hěn hǎochī · chá hěn hǎohē', en: 'The food\u2019s delicious · the tea\u2019s delicious' },
            ],
        },
        {
            explanation: 'Prices: 多少钱？ answered in 块 (colloquial yuan) — 十五块, or with 毛/角 for dimes: 十五块五. 块钱 and 块 are the same.',
            examples: [
                { hanzi: '—— 多 少 钱 ？ —— 二 十 五 块 。', pinyin: 'duōshao qián ? — èrshíwǔ kuài .', en: 'How much? — 25 kuai.' },
            ],
        },
        {
            explanation: 'The 口-verbs: 吃 喝 叫 问 唱 — anything done with a mouth carries the 口 radical. Spot it and you can guess the verb\u2019s family.',
            examples: [
                { hanzi: '吃 · 喝 · 叫 · 问', pinyin: 'chī · hē · jiào · wèn', en: 'eat · drink · call · ask — all mouths' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '吃饭': { en: 'to eat / have a meal', pron: 'chī fàn', tone: '1-4', note: 'Lit. eat-rice. 吃了吗？ = the traditional hello.' },
        '米饭': { en: 'cooked rice', pron: 'mǐfàn', tone: '3-4', measure: '碗', note: 'The staple — 饭 alone often means it.' },
        '茶': { en: 'tea', pron: 'chá', tone: '2', measure: '杯', note: 'Unsweetened, refilled forever. 绿茶/红茶 = green/black tea.' },
        '水': { en: 'water', pron: 'shuǐ', tone: '3', measure: '瓶/杯', note: '3rd tone — the dip. 喝水 = drink water.' },
        '菜': { en: 'dish / vegetable', pron: 'cài', tone: '4', measure: '个', note: 'Also cuisine: 中国菜.' },
        '苹果': { en: 'apple', pron: 'píngguǒ', tone: '2-3', measure: '个', note: '3-3 sandhi inside: píngguǒ → píngguǒ (guǒ half-dips).' },
        '饭馆': { en: 'restaurant', pron: 'fànguǎn', tone: '4-3', measure: '家', note: 'Restaurants counted with 家 (一家饭馆)!' },
        '好吃': { en: 'delicious (food)', pron: 'hǎochī', tone: '3-1', note: '3-3? No — 好 + 吃 = hǎo chī (好 half-dips before 1st).' },
        '好喝': { en: 'delicious (drink)', pron: 'hǎohē', tone: '3-1', note: 'The drink-compliment.' },
        '给': { en: 'to give / for', pron: 'gěi', tone: '3', note: '给我 = for me / to me. 请给我 = please give me.' },
        '咖啡馆': { en: 'café', pron: 'kāfēiguǎn', tone: '1-1-3', measure: '家', note: '咖啡 = coffee (a lovely loanword).' },
        '服务 员': { en: 'server / waiter', pron: 'fúwùyuán', tone: '2-4-2', note: 'The person you order from: 服务员，我要…' },
        '瓶': { en: 'bottle (measure)', pron: 'píng', tone: '2', note: '一瓶水 — the bottle measure.' },
        '杯': { en: 'cup (measure)', pron: 'bēi', tone: '1', note: '一杯茶/咖啡/水 — the cup measure.' },
    },
};

// ── HSK 1 · Questions & Negation ────────────────────────────────────────────
const h1Questions: StaticChineseLesson = {
    title: 'Questions & Negation',
    objective: 'Master the three question forms (吗, A-not-A, question-word-in-place), split the negations correctly (不 vs 没), answer naturally without a word for "yes", and place every question word exactly where its answer would sit — the grammar spine of HSK 1.',

    vocabulary: [
        { hanzi: '吗', pinyin: 'ma', en: 'yes/no question particle', example: { hanzi: '你 是 学 生 吗 ？', pinyin: 'nǐ shì xuésheng ma ?', en: 'Are you a student?' }, related: [{ hanzi: '呢', pinyin: 'ne', en: 'and you?' }] },
        { hanzi: '呢', pinyin: 'ne', en: 'and …? (echo)', example: { hanzi: '我 很 好 ， 你 呢 ？', pinyin: 'wǒ hěn hǎo , nǐ ne ?', en: 'I\u2019m fine — and you?' }, related: [{ hanzi: '他 呢 ？', pinyin: 'tā ne ?', en: 'and him?' }] },
        { hanzi: '什 么', pinyin: 'shénme', en: 'what', example: { hanzi: '你 说 什 么 ？', pinyin: 'nǐ shuō shénme ?', en: 'What are you saying?' }, related: [{ hanzi: '为 什 么', pinyin: 'wèishénme', en: 'why' }] },
        { hanzi: '谁', pinyin: 'shéi', en: 'who', example: { hanzi: '他 是 谁 ？', pinyin: 'tā shì shéi ?', en: 'Who is he?' }, related: [{ hanzi: '找 谁', pinyin: 'zhǎo shéi', en: 'look for whom' }] },
        { hanzi: '哪 儿', pinyin: 'nǎr', en: 'where', example: { hanzi: '饭 馆 在 哪 儿 ？', pinyin: 'fànguǎn zài nǎr ?', en: 'Where is the restaurant?' }, related: [{ hanzi: '哪 里', pinyin: 'nǎlǐ', en: 'where (southern form)' }] },
        { hanzi: '几', pinyin: 'jǐ', en: 'how many (small)', example: { hanzi: '你 家 有 几 口 人 ？', pinyin: 'nǐ jiā yǒu jǐ kǒu rén ?', en: 'How many people in your family?' }, related: [{ hanzi: '多 少', pinyin: 'duōshao', en: 'how many/much' }] },
        { hanzi: '不', pinyin: 'bù', en: 'not (present/future)', example: { hanzi: '我 不 去 。', pinyin: 'wǒ bú qù .', en: 'I\u2019m not going.' }, related: [{ hanzi: '不 是', pinyin: 'bú shì', en: 'is not' }] },
        { hanzi: '没', pinyin: 'méi', en: 'not (past) / do not have', example: { hanzi: '我 没 有 时 间 。', pinyin: 'wǒ méiyǒu shíjiān .', en: 'I don\u2019t have time.' }, related: [{ hanzi: '没 去', pinyin: 'méi qù', en: 'didn\u2019t go' }] },
        { hanzi: '对', pinyin: 'duì', en: 'correct / yes (that\u2019s right)', example: { hanzi: '— 你 是 学 生 吗 ？ — 对 。', pinyin: '— nǐ shì xuésheng ma ? — duì .', en: '— Are you a student? — Right.' }, related: [{ hanzi: '是 的', pinyin: 'shì de', en: 'yes (that\u2019s so)' }] },
        { hanzi: '不 对', pinyin: 'bú duì', en: 'not correct / no', example: { hanzi: '— 不 对 ， 我 不 是 老 师 。', pinyin: '— bú duì , wǒ bú shì lǎoshī .', en: '— No, I\u2019m not a teacher.' }, related: [{ hanzi: '对 不 起', pinyin: 'duìbuqǐ', en: 'sorry' }] },
        { hanzi: '为 什 么', pinyin: 'wèishénme', en: 'why', example: { hanzi: '你 为 什 么 学 汉 语 ？', pinyin: 'nǐ wèishénme xué Hànyǔ ?', en: 'Why do you study Chinese?' }, related: [{ hanzi: '因 为', pinyin: 'yīnwèi', en: 'because' }] },
        { hanzi: 'A 不 A', pinyin: 'A-bù-A', en: 'the A-not-A question form', example: { hanzi: '你 是 不 是 学 生 ？', pinyin: 'nǐ shì bú shì xuésheng ?', en: 'Are you or are you not a student?' }, related: [{ hanzi: '有 没 有', pinyin: 'yǒu méiyǒu', en: 'do you have or not' }] },
    ],

    characters: [
        { hanzi: '吗', pinyin: 'ma', en: 'question particle', components: '口(mouth) + 马(horse)', mnemonic: 'A MOUTH asking about a HORSE — the yes/no particle is just a mouth-sound at the end of the sentence.' },
        { hanzi: '呢', pinyin: 'ne', en: 'echo particle', components: '口(mouth) + 尼', mnemonic: 'Another MOUTH particle — 呢 throws the question back: 你呢？' },
        { hanzi: '谁', pinyin: 'shéi', en: 'who', components: '讫(speech) + 隹(short-tailed bird)', mnemonic: 'SPEECH + bird — who said that? The speech radical marks word-meanings about saying/asking.' },
        { hanzi: '哪', pinyin: 'nǎ', en: 'which / where', components: '口(mouth) + 那(that)', mnemonic: 'A MOUTH pointing at THAT — which one? Add 儿 for 哪儿 (where).' },
        { hanzi: '对', pinyin: 'duì', en: 'correct', components: '又(again) + 寸(inch)', mnemonic: 'Two hands measuring — a perfect match = CORRECT. 对 is also the everyday "yes, right".' },
        { hanzi: '因', pinyin: 'yīn', en: 'cause (in 因为)', components: '囗(enclosure) + 大', mnemonic: 'BIG inside an ENCLOSURE — the cause is enclosed in the box. 因为…所以… = because…so…' },
    ],

    pronunciation: [
        { hanzi: '吗', pinyin: 'ma', toneNote: 'Always neutral — light and weightless at the sentence end.', en: 'The softest syllable in Chinese.' },
        { hanzi: '什 么', pinyin: 'shénme', toneNote: '么 goes neutral — SHEN-muh, not shén-mè.', en: 'The question word\u2019s tail goes light.' },
        { hanzi: '不 的 两 副 面 孔', pinyin: 'bù / bú', toneNote: 'bù alone; bú before a 4th tone (不去 bú qù, 不是 bú shì).', en: 'One character, two musics.' },
        { hanzi: 'A 不 A', pinyin: 'shì bú shì', toneNote: 'Inside A-not-A, the 不 sandhi applies to what FOLLOWS it: 是(4th) → bú.', en: '是不是 = shì bú shì.' },
        { hanzi: '谁', pinyin: 'shéi / shuí', toneNote: 'Two accepted readings — shéi (colloquial) or shuí (careful/formal). Both correct; shéi dominates speech.', en: 'The two-face word.' },
        { hanzi: '为 什 么', pinyin: 'wèishénme', toneNote: '为 is 4th, 么 neutral — WESH-muh rhythm.', en: 'Why: three beats, last one light.' },
    ],

    grammar: {
        rule: 'Three ways to ask: (1) statement + 吗, (2) verb-not-verb (A-not-A), (3) question word in the answer\u2019s slot. Negation splits: 不 for present/future verbs, adjectives and 是; 没 for 有 and finished actions. Chinese has no word for plain "yes" — answer with the verb (是/对/有/去).',
        explanation: 'Form 1, the 吗-machine: keep the statement 100% intact and glue 吗: 你是老师 → 你是老师吗？ Form 2, A-not-A: repeat the verb with 不 between — 你是不是学生？ — same meaning, slightly more insistent; the 有 version is 有没有 (你有没有时间？). Form 3: question words replace the ANSWER in its own slot — 他是谁？(he is WHO), 你找谁？(you look-for WHOM), 你在哪儿吃饭？(you at-WHERE eat). Word order never changes for questions — this is the deepest difference from English. Negation: 不 wraps present/future verbs, adjectives and 是 (我不去, 不好, 不是); 没 negates 有 (没有时间) and completed actions (我没去 — I didn\u2019t go); the two never swap. Answers: Chinese lacks a universal "yes" — echo the verb: 是。/ 对。/ 有。/ 去。 with negated echoes for no (不去。/没有。). And 你呢？ recycles the whole question onto the next person.',
        examples: [
            { hanzi: '你 是 学 生 吗 ？', pinyin: 'nǐ shì xuésheng ma ?', en: 'Are you a student?', breakdown: ['statement untouched', '吗 at the very end', 'neutral tone'] },
            { hanzi: '你 是 不 是 学 生 ？', pinyin: 'nǐ shì bú shì xuésheng ?', en: 'Are you or aren\u2019t you a student?', breakdown: ['A-not-A: 是 不 是', 'sandhi: bú shì', 'more insistent than 吗'] },
            { hanzi: '你 找 谁 ？', pinyin: 'nǐ zhǎo shéi ?', en: 'Whom are you looking for?', breakdown: ['找 = look for', '谁 in the object slot', 'no word-order change'] },
            { hanzi: '你 在 哪 儿 学 汉 语 ？', pinyin: 'nǐ zài nǎr xué Hànyǔ ?', en: 'Where do you study Chinese?', breakdown: ['哪儿 replaces the place', 'stays after 在', 'the answer would sit exactly there'] },
            { hanzi: '我 没 有 弟 弟 。', pinyin: 'wǒ méiyǒu dìdi .', en: 'I don\u2019t have a younger brother.', breakdown: ['有 negated by 没 only', '没 有 or just 没', 'never 不有'] },
            { hanzi: '—— 你 去 吗 ？ —— 去 ， 你 呢 ？', pinyin: '— nǐ qù ma ? — qù , nǐ ne ?', en: '— Are you going? — Going. And you?', breakdown: ['the verb IS the answer', 'no "yes" word needed', '呢 passes the question on'] },
        ],
        commonMistakes: [
            'Question-word fronting: 什么你吃？ — WRONG. The question word replaces the answer IN ITS OWN SLOT: 你吃什么？(You eat WHAT?). English moves; Chinese doesn\u2019t.',
            '不有时间 — WRONG: 有 is negated by 没 only (没有时间). And completed actions too: 没去, not 不去 (for a done deed).',
            'Double-marking questions: 你是谁吗？ — WRONG. 吗 and question words are different machines; you use ONE per question.',
            'Answering 有 questions with 是: 是 for 有没有 → answer 有/没有. And there is no standalone "yes" — 是的/对 work only for 是/identity-type confirmations.',
        ],
    },

    patterns: [
        { type: 'Form 1 — 吗', hanzi: '… 吗 ？', pinyin: '… ma ?', en: 'statement + 吗 = yes/no question' },
        { type: 'Form 2 — A-not-A', hanzi: '是 不 是 … ？ 有 没 有 … ？', pinyin: 'shì bú shì … ? yǒu méiyǒu … ?', en: 'verb-not-verb — more insistent' },
        { type: 'Form 3 — in place', hanzi: '你 找 谁 ？ 你 在 哪 儿 吃 饭 ？', pinyin: 'nǐ zhǎo shéi ? nǐ zài nǎr chī fàn ?', en: 'question word sits where the answer sits' },
        { type: 'Negate present', hanzi: '不 + verb', pinyin: 'wǒ bú qù .', en: 'I\u2019m not going (now/future)' },
        { type: 'Negate 有/past', hanzi: '没(有) …', pinyin: 'wǒ méiyǒu shíjiān . wǒ méi qù .', en: 'no time · didn\u2019t go' },
        { type: 'Echo question', hanzi: '… 呢 ？', pinyin: '… ne ?', en: 'and…? — recycle the question' },
    ],

    sentenceBuilding: [
        { hanzi: '你 是 学 生 吗 ？', pinyin: 'nǐ shì xuésheng ma ?', en: 'Are you a student?' },
        { hanzi: '你 是 不 是 学 生 ？', pinyin: 'nǐ shì bú shì xuésheng ?', en: 'Are you a student (or not)?' },
        { hanzi: '你 学 什 么 ？ —— 我 学 汉 语 。', pinyin: 'nǐ xué shénme ? —— wǒ xué Hànyǔ .', en: 'What do you study? — Chinese.' },
        { hanzi: '你 在 哪 儿 学 汉 语 ？ —— 在 学 校 。', pinyin: 'nǐ zài nǎr xué Hànyǔ ? —— zài xuéxiào .', en: 'Where do you study Chinese? — At school.' },
        { hanzi: '你 为 什 么 学 汉 语 ？ —— 因 为 我 想 去 中 国 。', pinyin: 'nǐ wèishénme xué Hànyǔ ? —— yīnwèi wǒ xiǎng qù Zhōngguó .', en: 'Why do you study Chinese? — Because I want to go to China.' },
    ],

    practice: [
        { instruction: 'Pick the form:', question: '你 会 说 汉 语 ___ ？ (simple yes/no)', answer: '吗 — statement + 吗' },
        { instruction: 'A-not-A it:', question: '你 ___ 是 中 国 人 ？', answer: '是 不 是 — 是不是中国人？' },
        { instruction: 'In-place question:', question: '你 吃 ___ ？ (what)', answer: '什 么 — 你吃什么？ the word replaces the answer' },
        { instruction: 'Negate 有:', question: '我 ___ 时 间 。', answer: '没(有) — 没有 time' },
        { instruction: 'Negate a finished action:', question: '我 昨 天 ___ 去 。', answer: '没 — 没去 = didn\u2019t go' },
        { instruction: 'Answer naturally:', question: '—— 你 有 钱 吗 ？ —— ___. (yes)', answer: '有 。 — echo the verb; no "yes" word' },
    ],

    translationPractice: [
        { en: 'Are you a teacher?', hanzi: '你 是 老 师 吗 ？', pinyin: 'nǐ shì lǎoshī ma ?' },
        { en: 'Is he Chinese or not?', hanzi: '他 是 不 是 中 国 人 ？', pinyin: 'tā shì bú shì Zhōngguó rén ?' },
        { en: 'What do you want to eat?', hanzi: '你 想 吃 什 么 ？', pinyin: 'nǐ xiǎng chī shénme ?' },
        { en: 'Where do you live?', hanzi: '你 在 哪 儿 住 ？', pinyin: 'nǐ zài nǎr zhù ?' },
        { en: 'I don\u2019t have time today.', hanzi: '我 今 天 没 有 时 间 。', pinyin: 'wǒ jīntiān méiyǒu shíjiān .' },
        { en: 'Why do you drink tea? — Because I like it.', hanzi: '你 为 什 么 喝 茶 ？ —— 因 为 我 喜 欢 。', pinyin: 'nǐ wèishénme hē chá ? —— yīnwèi wǒ xǐhuan .', },
    ],

    reverseTranslation: [
        { hanzi: '你 爸 爸 是 不 是 大 夫 ？', pinyin: 'nǐ bàba shì bú shì dàifu ?', en: 'Is your dad a doctor (or not)?' },
        { hanzi: '他 为 什 么 没 来 ？', pinyin: 'tā wèishénme méi lái ?', en: 'Why didn\u2019t he come?' },
        { hanzi: '—— 你 有 没 有 弟 弟 ？ —— 没 有 。', pinyin: '— nǐ yǒu méiyǒu dìdi ? — méiyǒu .', en: '— Do you have a younger brother? — No.' },
        { hanzi: '谁 想 喝 茶 ？', pinyin: 'shéi xiǎng hē chá ?', en: 'Who wants tea?' },
    ],

    register: {
        casual: '你 去 不 去 ？ — A-not-A is the spoken favourite; 吗 can sound slightly stiff with friends.',
        polite: '请 问 ， 您 是 不 是 王 老 师 ？ — 请问 + 您 + A-not-A.',
        formal: '请 问 贵 姓 ？ — the formal name question (your honorable surname — recognize it).',
    },

    culture: 'Because Chinese has no "yes", answers are VERBS — and that makes confirmation culture precise: 对 (right), 是的 (it is so), 好 (okay), 有 (have), 行 (works). A-question answered with 吧 seek agreement; 嗯/噢 are the listening-noises of someone following you. And the A-not-A form carries a subtle push — parents use it (作业写完没写完？) — so exam dialogues often put it in the mouths of people who need a straight answer. 最后一个文化点: 哪儿 vs 哪里 quietly maps north vs south China — 北京人说哪儿, 上海人说哪里 — both in HSK 1 listening.',

    freeProduction: 'Record an interview with yourself (10 exchanges): ask and answer using ALL three forms once — one 吗 question (你是学生吗？), one A-not-A (你是不是大夫？), one in-place question word (你为什么学汉语？/你在哪儿住？) — with 不/没 negations in two answers, and one 呢 echo. Then re-listen: every question word should sit exactly where its answer sat.',

    miniTest: [
        { question: 'Which is correct?', options: ['什 么 你 吃 ？', '你 吃 什 么 ？', '你 什 么 吃 ？', '吃 你 什 么 ？'], answer: '你 吃 什 么 ？ — the question word replaces the answer in place' },
        { question: 'Negate 我 有 时 间 :', options: ['我 不 有 时 间 。', '我 没 时 间 。', '我 是 没 时 间 。', '我 不 没 时 间 。'], answer: '我 没 时 间 。 — 没 negates 有' },
        { question: 'A-not-A of 你是老师 :', options: ['你 是 不 是 老 师 ？', '你 是 老 师 不 ？', '你 不 是 老 师 吗 是 ？', '你 是 老 师 吗 不 吗 ？'], answer: '你 是 不 是 老 师 ？' },
        { question: '我昨天没去 means:', options: ['I\u2019m not going', 'I didn\u2019t go', 'I don\u2019t go usually', 'I will not go'], answer: 'I didn\u2019t go — 没 negates finished actions' },
        { question: 'Answer naturally: 你有钱吗？', options: ['是 。', '对 。', '有 。', '好吧。'], answer: '有 。 — echo the verb' },
    ],

    review: [
        'The three question forms combine with everything so far: 吗 on any statement, A-not-A for push, question words in place — the exam\u2019s listening answers live in these slots.',
        'Negation split (不 vs 没) joins the 两/二 and 点/小时 splits as HSK 1\u2019s big three distinctions.',
    ],

    traps: [
        'Question words NEVER move: 你找谁？(whom), 你吃什么？(what) — the word replaces the answer in its own slot. Fronting it is the #1 structural error.',
        '不 vs 没: 不 → verbs (present/future), adjectives, 是; 没 → 有 and FINISHED actions. 没去 = didn\u2019t go; 不去 = not going.',
        'One question machine per question: no 吗 together with question words (你是谁 ✓, 你是谁吗 ✗).',
        'No universal "yes": echo the verb (去。/有。/对。) — 是的 only confirms 是-type statements.',
    ],

    homework: {
        intro: 'The three question machines + the 不/没 split — every item is one exam listening exchange.',
        translation: [
            { prompt: 'Are you a teacher?', answer: '你 是 老 师 吗 ？', alt: ['你是老师吗？'], explanation: 'Form 1: statement + 吗, untouched.' },
            { prompt: 'Is he Chinese or not?', answer: '他 是 不 是 中 国 人 ？', alt: ['他是不是中国人？'], explanation: 'Form 2: A-not-A with sandhi bú shì.' },
            { prompt: 'What do you want to eat?', answer: '你 想 吃 什 么 ？', alt: ['你想吃什么？'], explanation: 'Form 3: 什么 in the object slot — where the food answer would sit.' },
            { prompt: 'I don\u2019t have time.', answer: '我 没 有 时 间 。', alt: ['我没有时间。', '我没时间。'], explanation: '有 → 没(有). Never 不有.' },
            { prompt: 'Why do you study Chinese?', answer: '你 为 什 么 学 汉 语 ？', alt: ['你为什么学汉语？'], explanation: '为什么 + statement order; answers open with 因为.' },
            { prompt: 'I\u2019m not going tomorrow.', answer: '我 明 天 不 去 。', alt: ['我明天不去。'], explanation: '不 for future actions; time word before the verb.' },
        ],
        blanks: [
            { prompt: '你 是 老 师 ___ ？ (yes/no)', answer: '吗', explanation: 'Form 1 particle.' },
            { prompt: '你 有 ___ 有 弟 弟 ？ (A-not-A)', answer: '没', explanation: '有没有 — the 有 version of A-not-A.' },
            { prompt: '你 去 ___ ？ (where)', answer: '哪 儿', explanation: '哪儿 in the place slot after 去.' },
            { prompt: '我 今 天 ___ 去 学 校 。 (didn\u2019t)', answer: '没', explanation: 'Finished action → 没.' },
            { prompt: '—— 你 去 吗 ？ —— 我 ___ 去 。 (no)', answer: '不', explanation: 'Future refusal with 不: bú qù.' },
            { prompt: '你 为 什 么 学 汉 语 ？ —— ___ 我 想 去 中 国 。', answer: '因 为', explanation: '因为 answers 为什么.' },
        ],
        corrections: [
            { prompt: '什 么 你 想 吃 ？', answer: '你 想 吃 什 么 ？', explanation: 'How the mistake happens: fronting the question word like English. Why it does not work: Chinese question words replace the answer in its own slot. How to fix it: 你想吃什么？' },
            { prompt: '我 不 有 钱 。', answer: '我 没 有 钱 。', explanation: 'How the mistake happens: 不 as all-purpose not. Why it does not work: 有 is negated by 没 only. How to fix it: 没有钱.' },
            { prompt: '你 是 谁 吗 ？', answer: '你 是 谁 ？', explanation: 'How the mistake happens: stacking question machines. Why it does not work: question words and 吗 are alternatives — one per question. How to fix it: 你是谁？' },
            { prompt: '—— 你 去 吗 ？ —— 是 的 ， 我 去 。 (asked about going)', answer: '—— 去 。 / 对 ， 我 去 。', explanation: 'How the mistake happens: mapping "yes" onto 是. Why it does not work: answers echo the VERB of the question. How to fix it: 去。(是的 confirms identity-statements.)' },
            { prompt: '你 有 没 有 时 间 吗 ？', answer: '你 有 没 有 时 间 ？', explanation: 'How the mistake happens: adding 吗 out of habit. Why it does not work: A-not-A is already a question — 吗 would double it. How to fix it: 有没有…？ alone.' },
        ],
        writing: {
            task: 'Write a Q&A mini-dialogue (5 exchanges = 10 lines) with a partner about their life: one 吗 question, one A-not-A question, one in-place question word (什么/谁/哪儿/为什么), one 没-negated answer, one 不-negated answer, and one 呢 echo. Both roles written out.',
            requirements: [
                'All three question forms, once each',
                'One 没 negation (of 有 or a past action)',
                'One 不 negation (present/future)',
                'Answers that echo the verb (no 是-for-yes)',
                'One 呢 echo question',
            ],
            minWords: 45,
        },
        checklist: [
            'I build questions three ways: +吗, A-not-A, question-word-in-place',
            'I keep question words in the answer\u2019s slot — never fronted',
            'I split negation: 不 for present/future/adjectives/是; 没 for 有 and finished actions',
            'I answer by echoing the verb (有。/去。/对。) — no universal "yes"',
            'I use one question machine per question (no 吗 + question word)',
            'I recycle questions with 呢',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The three forms compared: 吗 (neutral yes/no), A-not-A (insistent yes/no), question-word-in-place (open questions). Pick by what you want back.',
            examples: [
                { hanzi: '你 去 吗 ？ · 你 去 不 去 ？ · 你 去 哪 儿 ？', pinyin: 'nǐ qù ma ? · nǐ qù bú qù ? · nǐ qù nǎr ?', en: 'Are you going? · Going or not? · Where to?' },
            ],
        },
        {
            explanation: 'The negation split: 不 — present/future verbs, adjectives, 是 (不去, 不好, 不是); 没 — 有 and completed actions (没有钱, 没去, 没吃).',
            examples: [
                { hanzi: '我 不 去 。 · 我 没 去 。', pinyin: 'wǒ bú qù · wǒ méi qù', en: 'I\u2019m not going · I didn\u2019t go' },
            ],
        },
        {
            explanation: 'In-place rule: the question word replaces the ANSWER: 你找谁？(object slot), 你在哪儿住？(place slot after 在), 你几点起床？(time slot).',
            examples: [
                { hanzi: '你 找 谁 ？ · 你 在 哪 儿 住 ？', pinyin: 'nǐ zhǎo shéi ? · nǐ zài nǎr zhù ?', en: 'Whom are you looking for? · Where do you live?' },
            ],
        },
        {
            explanation: 'Answering without "yes": echo the verb — 去。/ 有。/ 对。/ 是的。 Negated answers echo the negation — 不去。/ 没有。',
            examples: [
                { hanzi: '—— 你 有 哥 哥 吗 ？ —— 有 。', pinyin: '— nǐ yǒu gēge ma ? — yǒu .', en: '— Do you have an older brother? — Yes (have).' },
            ],
        },
        {
            explanation: '呢 recycles: 我很好，你呢？ · 他去，她呢？ The particle carries the whole previous question onto the new person.',
            examples: [
                { hanzi: '我 很 好 ， 你 呢 ？', pinyin: 'wǒ hěn hǎo , nǐ ne ?', en: 'I\u2019m fine — and you?' },
            ],
        },
        {
            explanation: '为什么 ↔ 因为: the question keeps statement order; the answer may use 因为…所以… or 因为 alone.',
            examples: [
                { hanzi: '你 为 什 么 学 汉 语 ？ —— 因 为 我 想 去 中 国 。', pinyin: 'nǐ wèishénme xué Hànyǔ ? —— yīnwèi wǒ xiǎng qù Zhōngguó .', en: 'Why do you study Chinese? — Because I want to go to China.' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '对': { en: 'correct / right (yes)', pron: 'duì', tone: '4', note: 'The everyday yes: 对！ Also 对不起\u2019s first half.' },
        '不对': { en: 'not right / no', pron: 'bú duì', tone: '2-4', note: 'The gentle disagreement.' },
        '是的': { en: 'yes (that is so)', pron: 'shì de', tone: '4-neutral', note: 'Confirms 是-type statements; not a universal yes.' },
        '找': { en: 'to look for', pron: 'zhǎo', tone: '3', note: '你找谁？ — in-place question showcase.' },
        '住': { en: 'to live / reside', pron: 'zhù', tone: '4', note: '你在哪儿住？/ 我住在北京.' },
        '时间': { en: 'time', pron: 'shíjiān', tone: '2-1', note: '没有时间 = no time — 没\u2019s favourite patient.' },
        '有没有': { en: 'do you have or not', pron: 'yǒu méiyǒu', tone: '3-2-3', note: 'A-not-A for 有.' },
        '是不是': { en: 'is or isn\u2019t', pron: 'shì bú shì', tone: '4-2-4', note: 'A-not-A for 是 — sandhi inside!' },
        '知道': { en: 'to know (facts)', pron: 'zhīdào', tone: '1-4', note: '我不知道 = I don\u2019t know.' },
        '因为…所以…': { en: 'because… so…', pron: 'yīnwèi … suǒyǐ …', tone: '1-4 … 3-3', note: 'The cause-effect pair; both halves may appear or just 因为.' },
        '别': { en: 'don\u2019t (prohibition)', pron: 'bié', tone: '2', note: '别去！= Don\u2019t go! — commands, not statements.' },
    },
};

export const CHINESE_A1_PART2: Record<string, StaticChineseLesson> = {
    '1:food': h1Food,
    '1:questions': h1Questions,
};

export const CHINESE_A1_PART2_EXTRAS: Record<string, { warmup?: WarmupItem[]; verbTables?: VerbTableBlock[]; useCases?: UseCaseBlock[]; shadowing?: ShadowingBlock }> = {
    '1:food': {
        warmup: [
            { q: 'The three question forms?', a: '+吗 · A-not-A (是不是/有没有) · question word in the answer\u2019s slot.' },
            { q: '不 vs 没 — one line each.', a: '不: present/future verbs, adjectives, 是. 没: 有 and finished actions.' },
            { q: '谁 in a sentence — does it move?', a: 'No — it replaces the answer in its slot: 你找谁？' },
            { q: 'How do you answer 你有哥哥吗？', a: 'Echo the verb: 有。/ 没有。 — there is no word for plain "yes".' },
            { q: '因为 pairs with…?', a: '所以 — 因为…所以… (because… so…).' },
        ],
        verbTables: [
            {
                title: '要 vs 想 — the ordering dial',
                note: 'Both keep the second verb BARE. 想 adds the missing feeling; 要 commits.',
                rows: [
                    { label: 'firm order', form: '我 要 一 杯 茶', pron: 'wǒ yào yì bēi chá' },
                    { label: 'soft wish', form: '我 想 喝 咖 啡', pron: 'wǒ xiǎng hē kāfēi' },
                    { label: 'polite hedge', form: '我 想 要 一 杯 水', pron: 'wǒ xiǎng yào yì bēi shuǐ' },
                    { label: 'want to DO', form: '我 想 吃 米 饭', pron: 'wǒ xiǎng chī mǐfàn' },
                    { label: 'miss (bonus)', form: '我 想 你', pron: 'wǒ xiǎng nǐ' },
                ],
            },
            {
                title: 'Container measures — the tableware set',
                rows: [
                    { label: 'cup', form: '一 杯 茶 / 咖 啡', pron: 'yì bēi chá' },
                    { label: 'bottle', form: '一 瓶 水', pron: 'yì píng shuǐ' },
                    { label: 'bowl', form: '一 碗 米 饭', pron: 'yì wǎn mǐfàn' },
                    { label: 'plate', form: '一 盘 菜', pron: 'yì pán cài' },
                    { label: 'default', form: '一 个 苹 果', pron: 'yí ge píngguǒ' },
                ],
            },
        ],
        useCases: [
            {
                word: '在 — at, in progress, and the location slot',
                uses: [
                    { use: 'located at', examples: [{ fr: '我 在 北 京 。', en: 'I\u2019m in Beijing.' }] },
                    { use: 'place + verb (the meal slot)', examples: [{ fr: '我 在 家 吃 饭 。', en: 'I eat at home.' }] },
                    { use: 'right-now progress', examples: [{ fr: '我 在 学 汉 语 。', en: 'I\u2019m studying Chinese (now).' }] },
                    { use: 'never after the verb', examples: [{ fr: '✗ 我 吃 饭 在 家 → ✓ 我 在 家 吃 饭', en: 'the place slot is pre-verbal' }] },
                ],
            },
            {
                word: '好吃 vs 好喝 vs 好 — the compliment split',
                uses: [
                    { use: 'food → 好吃', examples: [{ fr: '中 国 菜 很 好 吃 。', en: 'Chinese food is delicious.' }] },
                    { use: 'drinks → 好喝', examples: [{ fr: '这 个 茶 很 好 喝 。', en: 'This tea is delicious.' }] },
                    { use: 'general good → 好', examples: [{ fr: '这 个 人 很 好 。', en: 'This person is good/kind.' }] },
                    { use: 'fun bonus', examples: [{ fr: '汤 呢 ？ —— 也 很 好 喝 。', en: 'And the soup? — Also delicious (soup drinks!).' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Restaurant rhythm: order firm, compliment warm, price quick. Read each line twice — once as customer, once as waiter.',
            lines: [
                { fr: '服 务 员 ， 我 要 一 杯 茶 。', pron: 'fúwùyuán , wǒ yào yì bēi chá .', en: 'Waiter — I\u2019ll have a tea.' },
                { fr: '我 想 吃 中 国 菜 。', pron: 'wǒ xiǎng chī Zhōngguó cài .', en: 'I\u2019d like to eat Chinese food.' },
                { fr: '这 个 菜 很 好 吃 ！', pron: 'zhè ge cài hěn hǎochī !', en: 'This dish is delicious!' },
                { fr: '一 杯 绿 茶 多 少 钱 ？', pron: 'yì bēi lǜchá duōshao qián ?', en: 'How much is a green tea?' },
                { fr: '我 在 家 吃 饭 ， 不 在 饭 馆 。', pron: 'wǒ zài jiā chī fàn , bú zài fànguǎn .', en: 'I eat at home, not at restaurants.' },
                { fr: '请 给 我 一 瓶 水 。 谢 谢 ！', pron: 'qǐng gěi wǒ yì píng shuǐ . xièxie !', en: 'A bottle of water, please. Thanks!' },
            ],
        },
    },
    '1:questions': {
        warmup: [
            { q: 'Order a tea and soften it — two sentences.', a: '我 要 一 杯 茶 。 · 我 想 喝 咖 啡 。' },
            { q: 'Where does 在 + place go?', a: 'BEFORE the verb: 我 在 家 吃 饭 。' },
            { q: 'The drink compliment?', a: '好喝 — 很好喝！ (food takes 好吃.)' },
            { q: 'One cup / one bottle / one bowl?', a: '一 杯 · 一 瓶 · 一 碗 — the container is the measure.' },
            { q: '块 means…?', a: 'Yuan (colloquial): 十五块 = 15 yuan.' },
        ],
        verbTables: [
            {
                title: 'The three question machines',
                note: 'One machine per question. 吗 = neutral, A-not-A = insistent, question word = open.',
                rows: [
                    { label: 'form 1', form: '你 去 吗 ？', pron: 'nǐ qù ma ?' },
                    { label: 'form 2', form: '你 去 不 去 ？', pron: 'nǐ qù bú qù ?' },
                    { label: 'form 3', form: '你 去 哪 儿 ？', pron: 'nǐ qù nǎr ?' },
                    { label: 'form 2 (有)', form: '你 有 没 有 时 间 ？', pron: 'nǐ yǒu méiyǒu shíjiān ?' },
                    { label: 'form 3 (who)', form: '你 找 谁 ？', pron: 'nǐ zhǎo shéi ?' },
                ],
            },
            {
                title: 'The negation split — 不 vs 没',
                rows: [
                    { label: 'present/future', form: '我 不 去 。', pron: 'wǒ bú qù .' },
                    { label: 'adjectives', form: '不 好 · 不 忙', pron: 'bù hǎo · bù máng' },
                    { label: '是', form: '我 不 是 老 师 。', pron: 'wǒ bú shì lǎoshī .' },
                    { label: '有', form: '我 没 有 时 间 。', pron: 'wǒ méiyǒu shíjiān .' },
                    { label: 'finished actions', form: '我 昨 天 没 去 。', pron: 'wǒ zuótiān méi qù .' },
                ],
            },
        ],
        useCases: [
            {
                word: '吗 vs 呢 vs 吧 — the sentence-end trio',
                uses: [
                    { use: '吗 — real yes/no question', examples: [{ fr: '你 是 学 生 吗 ？', en: 'Are you a student?' }] },
                    { use: '呢 — echo to the next person', examples: [{ fr: '我 去 ， 你 呢 ？', en: 'I\u2019m going — and you?' }] },
                    { use: '吧 — seeking agreement', examples: [{ fr: '我 们 走 吧 。', en: 'Let\u2019s go, shall we?' }] },
                    { use: 'never two at once', examples: [{ fr: '✗ 你 是 谁 吗 ？ → ✓ 你 是 谁 ？', en: 'one machine per question' }] },
                ],
            },
            {
                word: 'the answer system — no word for "yes"',
                uses: [
                    { use: 'echo the verb', examples: [{ fr: '—— 你 去 吗 ？ —— 去 。', en: '— Going? — Going.' }] },
                    { use: 'negated echo', examples: [{ fr: '—— 不 去 。', en: '— Not going.' }] },
                    { use: '有 questions', examples: [{ fr: '—— 有 。 / 没 有 。', en: '— Have. / Don\u2019t have.' }] },
                    { use: 'identity confirmations', examples: [{ fr: '—— 对 。 / 是 的 。', en: '— Right. / That\u2019s so.' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Question music: 吗 floats light at the end, A-not-A punches the middle, question words stay home. Read each exchange twice.',
            lines: [
                { fr: '你 是 学 生 吗 ？ —— 对 ， 我 是 学 生 。', pron: 'nǐ shì xuésheng ma ? — duì , wǒ shì xuésheng .', en: 'Are you a student? — Right, I am.' },
                { fr: '你 去 不 去 ？ —— 不 去 ， 我 没 时 间 。', pron: 'nǐ qù bú qù ? — bú qù , wǒ méi shíjiān .', en: 'Going or not? — Not going; no time.' },
                { fr: '你 在 哪 儿 学 汉 语 ？', pron: 'nǐ zài nǎr xué Hànyǔ ?', en: 'Where do you study Chinese?' },
                { fr: '他 为 什 么 没 来 ？', pron: 'tā wèishénme méi lái ?', en: 'Why didn\u2019t he come?' },
                { fr: '你 想 吃 什 么 ？ —— 我 想 吃 米 饭 。 你 呢 ？', pron: 'nǐ xiǎng chī shénme ? — wǒ xiǎng chī mǐfàn . nǐ ne ?', en: 'What do you want to eat? — Rice. And you?' },
                { fr: '这 个 多 少 钱 ？ —— 二 十 五 块 。', pron: 'zhè ge duōshao qián ? — èrshíwǔ kuài .', en: 'How much is this? — 25 kuai.' },
            ],
        },
    },
};
