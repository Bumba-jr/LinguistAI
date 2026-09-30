// Chinese HSK-3 lectures part 2 — Serial Verbs & Coverbs, Measure Words
// Deep-Dive, Directions & Location, Opinions & Reasons. Same format.

import type { HskLesson } from './hskService';
import { BASE_GLOSSARY, type ChineseGlossEntry } from './chineseLessonBase';
import type { WarmupItem, VerbTableBlock, UseCaseBlock, ShadowingBlock } from './frenchLessons';
import type { StaticChineseLesson } from './chineseLessons';

// ── HSK 3 · Serial Verbs & Coverbs ──────────────────────────────────────────
const h3Serial: StaticChineseLesson = {
    title: 'Serial Verbs & Coverbs',
    objective: 'Chain two verbs under one subject (我去买东西), deploy the coverbs 给/跟/对/用/帮 that set up the main action, and keep every verb bare — the sentence shape behind half of all natural Chinese.',

    vocabulary: [
        { hanzi: '给', pinyin: 'gěi', en: 'to / for (coverb)', example: { hanzi: '我 给 你 打 电 话 。', pinyin: 'wǒ gěi nǐ dǎ diànhuà .', en: 'I\u2019ll call you (give-you a call).' }, related: [{ hanzi: '给 我', pinyin: 'gěi wǒ', en: 'for me' }] },
        { hanzi: '跟', pinyin: 'gēn', en: 'with / to (a person)', example: { hanzi: '我 跟 你 去 。', pinyin: 'wǒ gēn nǐ qù .', en: 'I\u2019ll go with you.' }, related: [{ hanzi: '跟 他 说', pinyin: 'gēn tā shuō', en: 'say to him' }] },
        { hanzi: '对', pinyin: 'duì', en: 'toward (a person/thing)', example: { hanzi: '别 对 我 发 脾 气 。', pinyin: 'bié duì wǒ fā píqi .', en: 'Don\u2019t lose your temper at me.' }, related: [{ hanzi: '对 孩 子 好', pinyin: 'duì háizi hǎo', en: 'good to kids' }] },
        { hanzi: '用', pinyin: 'yòng', en: 'to use / with (a tool)', example: { hanzi: '用 筷 子 吃 饭 。', pinyin: 'yòng kuàizi chī fàn .', en: 'Eat with chopsticks.' }, related: [{ hanzi: '用 手 机 付', pinyin: 'yòng shǒujī fù', en: 'pay by phone' }] },
        { hanzi: '帮', pinyin: 'bāng', en: 'to help', example: { hanzi: '我 帮 你 学 汉 语 。', pinyin: 'wǒ bāng nǐ xué Hànyǔ .', en: 'I\u2019ll help you study Chinese.' }, related: [{ hanzi: '帮 忙', pinyin: 'bāngmáng', en: 'do a favor' }] },
        { hanzi: '一 边 … 一 边 …', pinyin: 'yìbiān … yìbiān …', en: 'while (doing two things at once)', example: { hanzi: '他 一 边 喝 茶 一 边 看 书 。', pinyin: 'tā yìbiān hē chá yìbiān kàn shū .', en: 'He reads while drinking tea.' }, related: [{ hanzi: '又 … 又 …', pinyin: 'yòu … yòu …', en: 'both…and (qualities)' }] },
        { hanzi: '先 … 再 …', pinyin: 'xiān … zài …', en: 'first … then …', example: { hanzi: '先 买 票 ， 再 上 车 。', pinyin: 'xiān mǎi piào , zài shàng chē .', en: 'Buy the ticket first, then board.' }, related: [{ hanzi: '然 后', pinyin: 'ránhòu', en: 'after that' }] },
        { hanzi: '打 算', pinyin: 'dǎsuàn', en: 'to plan / intend', example: { hanzi: '我 打 算 去 北 京 工 作 。', pinyin: 'wǒ dǎsuàn qù Běijīng gōngzuò .', en: 'I plan to work in Beijing.' }, related: [{ hanzi: '计 划', pinyin: 'jìhuà', en: 'plan (noun/verb)' }] },
        { hanzi: '陪', pinyin: 'péi', en: 'to accompany', example: { hanzi: '我 陪 你 去 医 院 。', pinyin: 'wǒ péi nǐ qù yīyuàn .', en: 'I\u2019ll accompany you to the hospital.' }, related: [{ hanzi: '陪 我 聊 聊', pinyin: 'péi wǒ liáoliáo', en: 'keep me company chatting' }] },
        { hanzi: '替', pinyin: 'tì', en: 'on behalf of / for', example: { hanzi: '替 我 问 他 好 。', pinyin: 'tì wǒ wèn tā hǎo .', en: 'Say hi to him for me.' }, related: [{ hanzi: '代 替', pinyin: 'dàitì', en: 'replace' }] },
    ],

    characters: [
        { hanzi: '跟', pinyin: 'gēn', en: 'with / to follow', components: '足(foot) + 艮', mnemonic: 'FOOT radical — 跟 originally the heel; to follow on foot. Now: with (跟你去) — your feet next to mine.' },
        { hanzi: '对', pinyin: 'duì', en: 'toward / correct', components: '又(hand) + 寸(inch)', mnemonic: 'HAND + INCH measuring — facing something precisely. 对我笑 = smile TOWARD me.' },
        { hanzi: '用', pinyin: 'yòng', en: 'to use', components: 'a bucket with a handle', mnemonic: 'The picture: a wooden bucket in use. 用筷子 = use chopsticks — the tool coverb.' },
        { hanzi: '帮', pinyin: 'bāng', en: 'to help', components: '邦(country) + 巾(cloth)', mnemonic: 'CLOTH below — 帮 was the shoe-upper, then "to aid". Now: 帮我 = help me.' },
        { hanzi: '陪', pinyin: 'péi', en: 'to accompany', components: '阝(mound) + 咅', mnemonic: 'The MOUND radical 阝 — 陪 originally earthen mounds together; now accompanying — standing beside.' },
        { hanzi: '算', pinyin: 'suàn', en: 'to calculate (in 打算)', components: '竹(bamboo) + 目 + 廾', mnemonic: 'BAMBOO + EYE + hands — counting on bamboo rods. 打算 = the mind\u2019s abacus.' },
    ],

    pronunciation: [
        { hanzi: '给 (coverb)', pinyin: 'gěi', toneNote: '3rd, half-dipped: gěi nǐ dǎ diànhuà flows as three quick dips.', en: 'The busiest coverb.' },
        { hanzi: '跟', pinyin: 'gēn', toneNote: '1st — level: 跟我去 stays flat.', en: 'with = flat voice.' },
        { hanzi: '一 边 … 一 边', pinyin: 'yíbiàn … yíbiàn', toneNote: '一 sandhi: both go yí before 4th (边).', en: 'while = two matching yí\u2019s.' },
        { hanzi: '打 算', pinyin: 'dǎsuàn', toneNote: '3-4: half-dip then stomp.', en: 'plan = dip-stomp.' },
        { hanzi: '替', pinyin: 'tì', toneNote: '4th — same sound as 剃 (shave) and 汹 (no) — context rules.', en: 'on-behalf-of.' },
        { hanzi: '陪', pinyin: 'péi', toneNote: '2nd — rising, friendly. 陪你 = I\u2019ll keep you company.', en: 'accompany.' },
    ],

    grammar: {
        rule: 'Two verb shapes: SERIAL (subject + V1 + V2 — 我去书店买书: go-to-bookstore [in order to] buy books) and COVERB (subject + 给/跟/对/用/帮 + target + main verb — 我给你打电话). Every verb stays BARE; tense lives in the sentence, not the verbs.',
        explanation: 'Chinese chains actions without conjunctions: 我去书店买书 reads "I go bookstore buy books" — V1 (去书店) is the MEANS or path, V2 (买书) the PURPOSE. The order is chronological: 先买票，再上车 (first buy, then board). The coverb family sets up the main verb\u2019s circumstances: 给 (for/to — 给你打电话 make-you a call), 跟 (with — 跟我去 come-with-me; 跟他说 tell-him), 对 (toward — 对我好 be-good-to-me), 用 (with a tool — 用筷子吃 eat-with-chopsticks), 帮 (help — 帮你学 help-you-study), 替 (instead-of — 替我问 ask-for-me), 陪 (accompany — 陪你去 go-with-you). The simultaneous pair 一边…一边… links two same-subject actions happening together (一边喝茶一边看书), while 先…再… sequences them. Object pronouns stay after coverbs; the main verb keeps its own object. And the tense marker (了/过/在) attaches to whichever verb carries it — usually the last.',
        examples: [
            { hanzi: '我 去 书 店 买 书 。', pinyin: 'wǒ qù shūdiàn mǎi shū .', en: 'I\u2019m going to the bookstore to buy a book.', breakdown: ['去书店 = V1 (go — the path)', '买书 = V2 (buy — the purpose)', 'one subject 我, two bare verbs'] },
            { hanzi: '我 给 你 打 电 话 。', pinyin: 'wǒ gěi nǐ dǎ diànhuà .', en: 'I\u2019ll give you a call.', breakdown: ['给你 = coverb (for/to you)', '打电话 = main verb', 'the call\u2019s setup'] },
            { hanzi: '他 一 边 喝 茶 一 边 看 书 。', pinyin: 'tā yìbiān hē chá yìbiān kàn shū .', en: 'He drinks tea while reading.', breakdown: ['一边 V1 一边 V2', 'same subject, same moment', 'neither verb carries 了'] },
            { hanzi: '先 买 票 ， 再 上 车 。', pinyin: 'xiān mǎi piào , zài shàng chē .', en: 'Buy the ticket first, then board.', breakdown: ['先 V1 = first', '再 V2 = then', 'chronological chain'] },
            { hanzi: '我 用 手 机 付 钱 。', pinyin: 'wǒ yòng shǒujī fù qián .', en: 'I pay with my phone.', breakdown: ['用 = with (tool)', '手机 = the tool', '付钱 = main verb'] },
            { hanzi: '替 我 问 他 好 。', pinyin: 'tì wǒ wèn tā hǎo .', en: 'Say hello to him for me.', breakdown: ['替 = on behalf of', '我 = the absent person', '问他好 = the action'] },
        ],
        commonMistakes: [
            'Conjugating the second verb: 我去买了书 — WRONG for serial intent. Serial verbs are all bare: 我去书店买书; 了 lands on the LAST verb only when the whole chain completed: 我去书店买了一本书.',
            '把-style objects inside coverbs: 给电话打你 — WRONG. Coverb + target comes FIRST, main verb + object after: 给你打电话.',
            '一边 with different subjects: 我一边喝茶他一边看书 — WRONG. 一边…一边… needs ONE subject: 他一边喝茶一边看书.',
            '跟 for tools: 用筷子吃，not 跟筷子吃 — 跟 is for PEOPLE (with); tools take 用.',
        ],
    },

    patterns: [
        { type: 'Purpose chain', hanzi: '去 + place + V2', pinyin: 'wǒ qù shūdiàn mǎi shū .', en: 'go there to do it' },
        { type: '给 coverb', hanzi: '给 + person + V', pinyin: 'gěi nǐ dǎ diànhuà .', en: 'do it for/to you' },
        { type: '跟 coverb', hanzi: '跟 + person + V', pinyin: 'gēn tā shuō .', en: 'do it with/to him' },
        { type: '用 coverb', hanzi: '用 + tool + V', pinyin: 'yòng kuàizi chī .', en: 'do it with a tool' },
        { type: 'Simultaneous', hanzi: '一 边 V1 一 边 V2', pinyin: 'yìbiān hē chá yìbiān kàn shū .', en: 'same subject, same moment' },
        { type: 'Sequence', hanzi: '先 V1 ， 再 V2', pinyin: 'xiān mǎi piào , zài shàng chē .', en: 'first this, then that' },
    ],

    sentenceBuilding: [
        { hanzi: '我 去 买 咖 啡 。', pinyin: 'wǒ qù mǎi kāfēi .', en: 'I\u2019m going to buy coffee.' },
        { hanzi: '我 去 咖 啡 馆 买 咖 啡 。', pinyin: 'wǒ qù kāfēiguǎn mǎi kāfēi .', en: 'I\u2019m going to the café to buy coffee.' },
        { hanzi: '我 要 去 咖 啡 馆 给 你 买 一 杯 咖 啡 。', pinyin: 'wǒ yào qù kāfēiguǎn gěi nǐ mǎi yì bēi kāfēi .', en: 'I\u2019ll go to the café and get you a coffee.' },
        { hanzi: '你 先 上 课 ， 我 在 咖 啡 馆 一 边 看 书 一 边 等 你 。', pinyin: 'nǐ xiān shàng kè , wǒ zài kāfēiguǎn yìbiān kàn shū yìbiān děng nǐ .', en: 'You go to class first; I\u2019ll wait at the café, reading.' },
        { hanzi: '等 你 下 课 ， 我 们 一 起 回 家 ， 路 上 再 聊 。', pinyin: 'děng nǐ xiàkè , wǒmen yìqǐ huí jiā , lù shang zài liáo .', en: 'When class ends we\u2019ll head home together and chat on the way.' },
    ],

    practice: [
        { instruction: 'Pick the coverb (person):', question: '我 ___ 你 打 电 话 。', answer: '给 — 给你打电话' },
        { instruction: 'Pick the coverb (tool):', question: '___ 筷 子 吃 饭 。', answer: '用 — tools take 用' },
        { instruction: 'Pick the coverb (accompany):', question: '我 ___ 你 去 。', answer: '跟/陪 — with/accompany' },
        { instruction: 'Simultaneous pair:', question: '他 ___ 唱 歌 ___ 洗 澡 。', answer: '一边…一边… — one subject only' },
        { instruction: 'Sequence:', question: '___ 关 门 ， ___ 开 灯 。', answer: '先…再… — first, then' },
        { instruction: 'The purpose chain:', question: '我 去 饭 馆 ___ 饭 。', answer: '吃 — 去饭馆吃饭' },
    ],

    translationPractice: [
        { en: 'I\u2019m going to the bookstore to buy a book.', hanzi: '我 去 书 店 买 书 。', pinyin: 'wǒ qù shūdiàn mǎi shū .' },
        { en: 'I\u2019ll call you tonight.', hanzi: '我 晚 上 给 你 打 电 话 。', pinyin: 'wǒ wǎnshang gěi nǐ dǎ diànhuà .' },
        { en: 'I go to work by subway (ride subway to work).', hanzi: '我 坐 地 铁 去 上 班 。', pinyin: 'wǒ zuò dìtiě qù shàngbān .' },
        { en: 'He chats while walking.', hanzi: '他 一 边 走 一 边 聊 天 。', pinyin: 'tā yìbiān zǒu yìbiān liáotiān .' },
        { en: 'First do homework, then watch TV.', hanzi: '先 写 作 业 ， 再 看 电 视 。', pinyin: 'xiān xiě zuòyè , zài kàn diànshì .' },
        { en: 'I\u2019ll help you review Chinese.', hanzi: '我 帮 你 复 习 汉 语 。', pinyin: 'wǒ bāng nǐ fùxí Hànyǔ .' },
    ],

    reverseTranslation: [
        { hanzi: '我 陪 你 去 医 院 。', pinyin: 'wǒ péi nǐ qù yīyuàn .', en: 'I\u2019ll go with you to the hospital.' },
        { hanzi: '替 我 给 你 妈 妈 打 个 电 话 。', pinyin: 'tì wǒ gěi nǐ māma dǎ ge diànhuà .', en: 'Call your mom for me.' },
        { hanzi: '他 用 手 机 看 新 闻 。', pinyin: 'tā yòng shǒujī kàn xīnwén .', en: 'He reads the news on his phone.' },
        { hanzi: '我 打 算 明 年 去 中 国 留 学 。', pinyin: 'wǒ dǎsuàn míngnián qù Zhōngguó liúxué .', en: 'I plan to study abroad in China next year.' },
    ],

    register: {
        casual: '回 头 我 给 你 发 微 信 。 — 回头 (later) + 给 + 微信 = the chat-app coverb life.',
        polite: '让 我 来 帮 您 搬 吧 。 — 让我来 = allow-me-to, the polite volunteer.',
        formal: '本 公 司 将 为 您 提 供 服 务 。 — 将/为 = the written coverbs of service language.',
    },

    culture: 'Serial-verb thinking explains why Chinese has no word for "and then" between most actions — the chain IS the grammar: 我去买菜做饭 is one breath (go market-grocery, cook). The coverb 给 also powers China\u2019s app verbs: 给我发个微信 (shoot me a WeChat), 给他点个赞 (like his post) — grammar unchanged, nouns modern. And 一边…一边… describes the national multitask: eating drama-watching (一边吃饭一边看剧) is a HSK-3 essay staple about phone habits.',

    freeProduction: 'Record your tomorrow as a verb chain (8–10 lines): 我打算… (plan), then chain the day: 去…买/办/见…, one 给 sentence (给你妈妈打电话), one 用 sentence (用手机…), one 一边…一边…, one 先…再…. Every verb bare — the chain carries the time.',

    miniTest: [
        { question: 'I\u2019m going to the bookstore TO buy a book:', options: ['我 去 书 店 买 书 。', '我 买 书 去 书 店 。', '我 去 买 书 店 书 。', '我 在 书 店 去 买 书 。'], answer: '我 去 书 店 买 书 。 — path verb first, purpose second' },
        { question: 'The tool coverb is:', options: ['跟', '给', '用', '对'], answer: '用 — 用筷子吃' },
        { question: '一 边…一 边… needs:', options: ['two subjects', 'one subject', '了 on both verbs', 'past time'], answer: 'one subject — two simultaneous actions' },
        { question: 'Call you (on the phone):', options: ['跟 你 打 电 话', '给 你 打 电 话', '用 你 打 电 话', '对 你 来 电 话'], answer: '给 你 打 电 话 — 给 marks the recipient' },
        { question: 'In serial verbs, the verbs are:', options: ['conjugated', 'all bare', 'doubled', 'negated'], answer: 'all bare — tense lives in the sentence' },
    ],

    review: [
        'The aspect lecture\u2019s backdrop+event combo (V着…，V了…) is serial grammar\u2019s cousin — same bare verbs.',
        'Next: measure words deep-dive — the 个-shelf grows to 只/条/张/辆/双.',
    ],

    traps: [
        '了 lands on the LAST verb of a completed chain: 我去书店买了一本书 — never on every verb.',
        '跟 = with PEOPLE; 用 = with TOOLS. 跟筷子吃 is a fork-in-the-road error.',
        '一边…一边… demands one subject and no 了: 他一边喝茶一边看书.',
        'Coverb + target comes FIRST: 给你打电话 — never 打电话给你 at HSK 3 writing (that\u2019s the spoken variant).',
    ],

    homework: {
        intro: 'Chains and coverbs: purpose, tools, companions, and the 一边 pair.',
        translation: [
            { prompt: 'I\u2019m going to the bookstore to buy a book.', answer: '我 去 书 店 买 书 。', alt: ['我去书店买书。'], explanation: '去+place + purpose verb — the purpose chain.' },
            { prompt: 'I\u2019ll give you a call tonight.', answer: '我 晚 上 给 你 打 电 话 。', alt: ['我晚上给你打电话。'], explanation: '给 + person + 打电话; time word before the coverb phrase.' },
            { prompt: 'Eat with chopsticks.', answer: '用 筷 子 吃 饭 。', alt: ['用筷子吃饭。'], explanation: '用 + tool — tools take 用, people take 跟.' },
            { prompt: 'He reads while drinking tea.', answer: '他 一 边 喝 茶 一 边 看 书 。', alt: ['他一边喝茶一边看书。'], explanation: '一边V1一边V2 — one subject, no 了.' },
            { prompt: 'Buy the ticket first, then board.', answer: '先 买 票 ， 再 上 车 。', alt: ['先买票，再上车。'], explanation: '先…再… — the sequence pair.' },
            { prompt: 'I plan to work in Beijing.', answer: '我 打 算 去 北 京 工 作 。', alt: ['我打算去北京工作。'], explanation: '打算 + verb chain — plans are chains too.' },
        ],
        blanks: [
            { prompt: '我 ___ 你 打 电 话 。 (to you)', answer: '给', explanation: '给 = the recipient coverb.' },
            { prompt: '___ 筷 子 吃 饭 。 (with chopsticks)', answer: '用', explanation: '用 = tool coverb.' },
            { prompt: '我 ___ 你 去 医 院 。 (accompany)', answer: '陪', explanation: '陪 = go along with.' },
            { prompt: '他 ___ 唱 歌 ___ 洗 澡 。 (while)', answer: '一边…一边', explanation: '一边 V1 一 边 V2 — two simultaneous actions, one subject, no 了.' },
            { prompt: '___ 写 作 业 ， ___ 看 电 视 。 (first, then)', answer: '先…再', explanation: '先…再… the sequence.' },
            { prompt: '替 ___ 问 他 好 。 (for me)', answer: '我', explanation: '替我 = on MY behalf.' },
        ],
        corrections: [
            { prompt: '我 去 书 店 买 了 书 ， 看 了 书 。', answer: '我 去 书 店 买 了 一 本 书 ， 看 了 一 下 午 。', explanation: 'How the mistake happens: 了 on every verb. Why it does not work: in a chain, 了 lands on the FINAL verb (or last of each completed stage). How to fix it: 买了一本书.' },
            { prompt: '我 用 我 朋 友 去 机 场 。', answer: '我 跟 我 朋 友 去 机 场 。', explanation: 'How the mistake happens: 用 for company. Why it does not work: 用 takes tools; people take 跟/陪. How to fix it: 跟朋友去.' },
            { prompt: '我 一 边 喝 茶 他 一 边 看 书 。', answer: '他 一 边 喝 茶 一 边 看 书 。', explanation: 'How the mistake happens: two subjects in the 一边 frame. Why it does not work: 一边…一边… chains ONE person\u2019s actions. How to fix it: one subject, both verbs.' },
            { prompt: '给 打 电 话 你 。', answer: '给 你 打 电 话 。', explanation: 'How the mistake happens: verb-first habit. Why it does not work: coverb + target + main verb + object is the fixed order. How to fix it: 给你打电话.' },
            { prompt: '先 我 买 票 再 上 车 。', answer: '先 买 票 ， 再 上 车 。 (subject optional before both)', explanation: 'How the mistake happens: splitting subject between clauses. Why it does not work: the chain shares ONE subject, stated once at the front. How to fix it: 我先买票，再上车.' },
        ],
        writing: {
            task: 'Write your Saturday plan (10–12 lines) as chains: 打算 opening, three purpose chains (去…买/办/见…), one 给 sentence (给你朋友打电话), one 用 sentence, one 一边…一边…, one 先…再…, and one 替我… request to a family member.',
            requirements: [
                'Three purpose chains (去 + place + verb)',
                'One 给 + person + verb',
                'One 用 + tool + verb',
                'One 一边…一边… (single subject)',
                'One 先…再… and one 替 request',
            ],
            minWords: 55,
        },
        checklist: [
            'I chain purpose: 去 + place + verb (all bare)',
            'I deploy coverbs: 给/跟/对/用/帮/替/陪 before the main verb',
            'I match 跟 (people) vs 用 (tools)',
            'I link simultaneous actions with 一边…一边… (one subject)',
            'I sequence with 先…再… and keep 了 on the last verb',
            'I make plans with 打算 + chain',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The coverb shelf: 给 (to/for), 跟 (with a person), 对 (toward), 用 (with a tool), 帮 (help), 替 (instead of), 陪 (accompany). Each sets up the main verb.',
            examples: [
                { hanzi: '给 你 打 电 话 · 跟 他 聊 · 对 我 笑 · 用 手 机 付', pinyin: 'gěi nǐ dǎ diànhuà · gēn tā liáo · duì wǒ xiào · yòng shǒujī fù', en: 'call you · chat with him · smile at me · pay by phone' },
            ],
        },
        {
            explanation: 'Purpose chains: V1 (motion) + V2 (purpose): 去书店买书, 回家吃饭, 来中国留学. The second verb is the WHY of the first.',
            examples: [
                { hanzi: '回 家 吃 饭 。', pinyin: 'huí jiā chī fàn .', en: 'Go home to eat.' },
            ],
        },
        {
            explanation: 'The simultaneous pair: 一边V1一边V2 — one subject, two same-moment actions, no 了: 他一边开车一边唱歌 (dangerous!).',
            examples: [
                { hanzi: '一 边 走 一 边 聊 。', pinyin: 'yìbiān zǒu yìbiān liáo .', en: 'Chat while walking.' },
            ],
        },
        {
            explanation: 'The sequence pair: 先V1，再V2 — ticket before boarding, homework before TV. 然后 upgrades to "after that".',
            examples: [
                { hanzi: '先 洗 手 ， 再 吃 饭 。', pinyin: 'xiān xǐ shǒu , zài chī fàn .', en: 'Wash hands first, then eat.' },
            ],
        },
        {
            explanation: '了 lands on the LAST verb of a completed chain: 我去书店买了一本书. Earlier verbs stay bare.',
            examples: [
                { hanzi: '我 去 超 市 买 了 水 果 。', pinyin: 'wǒ qù chāoshì mǎi le shuǐguǒ .', en: 'I went to the supermarket and bought fruit.' },
            ],
        },
        {
            explanation: '打/开/坐 poly-verbs: 打电话 (make a call), 打篮球 (play ball), 开会 (hold a meeting), 坐车 (ride) — learn verb+object as one unit.',
            examples: [
                { hanzi: '打 电 话 · 打 篮 球 · 开 会 · 坐 地 铁', pinyin: 'dǎ diànhuà · dǎ lánqiú · kāihuì · zuò dìtiě', en: 'call · play ball · meet · ride' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '给': { en: 'to/for (coverb) / give', pron: 'gěi', tone: '3', note: '给你打电话 — coverb before main verb.' },
        '跟': { en: 'with / to follow', pron: 'gēn', tone: '1', note: '跟 person; 跟我读 = repeat after me.' },
        '对': { en: 'toward / correct', pron: 'duì', tone: '4', note: '对我好 = good to me; 对不起 = sorry.' },
        '用': { en: 'to use / with (tool)', pron: 'yòng', tone: '4', note: '用筷子 — the tool coverb.' },
        '帮': { en: 'to help', pron: 'bāng', tone: '1', note: '帮你学 = help you study.' },
        '陪': { en: 'to accompany', pron: 'péi', tone: '2', note: '陪你去 = go along with you.' },
        '替': { en: 'instead of / for', pron: 'tì', tone: '4', note: '替我问 = ask for me.' },
        '打算': { en: 'to plan / intend', pron: 'dǎsuàn', tone: '3-4', note: '打算 + verb chain.' },
        '一边…一边…': { en: 'while (two actions)', pron: 'yíbiān … yíbiān …', tone: '2-4…2-4', note: 'One subject, simultaneous.' },
        '先…再…': { en: 'first… then…', pron: 'xiān … zài …', tone: '1…4', note: 'Sequence pair.' },
        '聊天': { en: 'to chat', pron: 'liáotiān', tone: '2-1', note: '聊天儿 in the north.' },
        '留学': { en: 'to study abroad', pron: 'liúxué', tone: '2-2', note: '去中国留学 — the study-abroad chain.' },
    },
};

// ── HSK 3 · Measure Words Deep-Dive ─────────────────────────────────────────
const h3Measure: StaticChineseLesson = {
    title: 'Measure Words Deep-Dive',
    objective: 'Go beyond 个 — deploy the shape-and-family measures (只/条/张/辆/件/双/把/本/杯), know when the measure is obligatory, default to 个 safely, and double measures for each-and-every (个个/天天).',

    vocabulary: [
        { hanzi: '只', pinyin: 'zhī', en: 'measure (animals, one of a pair)', example: { hanzi: '一 只 猫 ', pinyin: 'yì zhī māo', en: 'a cat' }, related: [{ hanzi: '一 只 手', pinyin: 'yì zhī shǒu', en: 'one hand (single!)' }] },
        { hanzi: '条', pinyin: 'tiáo', en: 'measure (long things: rivers, pants, dogs, news)', example: { hanzi: '一 条 河', pinyin: 'yì tiáo hé', en: 'a river' }, related: [{ hanzi: '一 条 新 闻', pinyin: 'yì tiáo xīnwén', en: 'a piece of news' }] },
        { hanzi: '张', pinyin: 'zhāng', en: 'measure (flat things: paper, tickets, tables, faces)', example: { hanzi: '两 张 票', pinyin: 'liǎng zhāng piào', en: 'two tickets' }, related: [{ hanzi: '一 张 桌 子', pinyin: 'yì zhāng zhuōzi', en: 'a table' }] },
        { hanzi: '辆', pinyin: 'liàng', en: 'measure (vehicles)', example: { hanzi: '一 辆 车', pinyin: 'yí liàng chē', en: 'a car' }, related: [{ hanzi: '三 辆 自 行 车', pinyin: 'sān liàng zìxíngchē', en: 'three bikes' }] },
        { hanzi: '把', pinyin: 'bǎ', en: 'measure (handled things: knife, umbrella, chair)', example: { hanzi: '一 把 刀', pinyin: 'yì bǎ dāo', en: 'a knife' }, related: [{ hanzi: '一 把 伞', pinyin: 'yì bǎ sǎn', en: 'an umbrella' }] },
        { hanzi: '双', pinyin: 'shuāng', en: 'measure (pairs)', example: { hanzi: '一 双 鞋', pinyin: 'yì shuāng xié', en: 'a pair of shoes' }, related: [{ hanzi: '一 双 手', pinyin: 'yì shuāng shǒu', en: 'a pair of hands' }] },
        { hanzi: '本', pinyin: 'běn', en: 'measure (books)', example: { hanzi: '三 本 汉 语 书', pinyin: 'sān běn Hànyǔ shū', en: 'three Chinese textbooks' }, related: [{ hanzi: '一 本 词 典', pinyin: 'yì běn cídiǎn', en: 'a dictionary' }] },
        { hanzi: '杯', pinyin: 'bēi', en: 'measure (cup of)', example: { hanzi: '一 杯 咖 啡', pinyin: 'yì bēi kāfēi', en: 'a cup of coffee' }, related: [{ hanzi: '两 杯 茶', pinyin: 'liǎng bēi chá', en: 'two teas' }] },
        { hanzi: '件', pinyin: 'jiàn', en: 'measure (clothes, matters)', example: { hanzi: '一 件 衬 衫 · 一 件 事', pinyin: 'yí jiàn chènshān · yí jiàn shì', en: 'a shirt · a matter' }, related: [{ hanzi: '两 件 事', pinyin: 'liǎng jiàn shì', en: 'two matters' }] },
        { hanzi: '群', pinyin: 'qún', en: 'measure (crowd/flock)', example: { hanzi: '一 群 人', pinyin: 'yì qún rén', en: 'a crowd of people' }, related: [{ hanzi: '一 群 朋 友', pinyin: 'yì qún péngyou', en: 'a group of friends' }] },
    ],

    characters: [
        { hanzi: '只', pinyin: 'zhī', en: 'measure (animals/single)', components: '口 + 八', mnemonic: 'Originally a single bird caught in a net — one of a PAIR: 一只手 (one hand), 一只鞋 (ONE shoe — the other is missing!).' },
        { hanzi: '条', pinyin: 'tiáo', en: 'measure (long things)', components: '夂 + 木-with-branches', mnemonic: 'The old form was a BRANCH — long and flexible: rivers, tails, pants, dogs, news. Anything 条-shaped.' },
        { hanzi: '张', pinyin: 'zhāng', en: 'measure (flat things) / to open', components: '弓(bow) + 长(long)', mnemonic: 'A BOW drawn LONG — flat things spread out: paper, tickets, tables, faces, mouths (一张嘴!).' },
        { hanzi: '辆', pinyin: 'liàng', en: 'measure (vehicles)', components: '车 + 两', mnemonic: ' vehicle + TWO wheels-at-least — cars, bikes, taxis all ride 辆.' },
        { hanzi: '群', pinyin: 'qún', en: 'crowd / flock', components: '君 + 羊(sheep)', mnemonic: 'A SHEEP gentleman herds — 羊 signals the flock: 一群羊, and by extension any crowd.' },
        { hanzi: '双', pinyin: 'shuāng', en: 'pair / double', components: '又 又 (two right hands)', mnemonic: 'TWO HANDS 又+又 — pairs: 一双手, 一双鞋, 双号 (even numbers).' },
    ],

    pronunciation: [
        { hanzi: '只', pinyin: 'zhī', toneNote: '1st as measure; zhǐ (only) is 3rd — different word!', en: 'zhī measure vs zhǐ only.' },
        { hanzi: '条', pinyin: 'tiáo', toneNote: '2nd — rising: tiáo tiáo dà lù (long long road).', en: 'the long measure.' },
        { hanzi: '张', pinyin: 'zhāng', toneNote: '1st — flat, like the paper it counts.', en: 'tickets and tables.' },
        { hanzi: '辆', pinyin: 'liàng', toneNote: '4th — stomp: yí liàng chē (一 sandhi → yí).', en: 'vehicles stomp.' },
        { hanzi: '双', pinyin: 'shuāng', toneNote: '1st — level: shuāng shǒu (both hands).', en: 'pairs stay level.' },
        { hanzi: '群', pinyin: 'qún', toneNote: '2nd — the hidden-ü family after q! qún = qün.', en: 'crowd with rounded lips.' },
    ],

    grammar: {
        rule: 'The number CANNOT touch the noun: number + measure + noun (三本书). The measure is obligatory in speech and writing; 个 is the universal default; each measure sees SHAPE or FAMILY (只 animals/single, 条 long, 张 flat, 辆 vehicles, 把 handled, 双 pairs). Reduplication (个个/天天) means each-and-every.',
        explanation: 'Chinese grammar has no plural — number lives in the measure phrase: 三本书 (three BOOK-volumes). The full pattern: ( demonstrator + ) number + measure + noun (这两本书). 个 covers anything in a pinch (一个人, 一个问题), but the exam rewards the precise measure: animals take 只 (一只猫), long/flexible things take 条 (一条河, 一条裤子, 一条狗, 一条新闻!), flat things take 张 (一张票, 一张桌子, 一张照片, 一张嘴), vehicles take 辆, gripped things take 把 (一把刀, 一把伞), pairs take 双 (一双鞋), books 本, cups 杯, clothes/matters 件, crowds 群, occurrences 次. People take 个 (or 名/位 polite). When the measure reduplicates — 个个, 天天, 人人 — it means EACH AND EVERY: 个个都很努力 (every single one works hard). Omitting the measure (三书) is the most visible A2 fingerprint; over-using 个 for animals/vehicles is the A2.5 one.',
        examples: [
            { hanzi: '我 买 了 一 只 猫 。', pinyin: 'wǒ mǎi le yì zhī māo .', en: 'I bought a cat.', breakdown: ['一 + 只 (animal measure)', '猫 = cat', '个 would sound foreign here'] },
            { hanzi: '桌 子 上 有 三 张 纸 。', pinyin: 'zhuōzi shàng yǒu sān zhāng zhǐ .', en: 'There are three sheets of paper on the desk.', breakdown: ['三 张 = flat measure', '纸 = paper (uncountable → counted by sheets)', '有 existence frame'] },
            { hanzi: '路 上 有 很 多 辆 车 。', pinyin: 'lù shang yǒu hěn duō liàng chē .', en: 'There are lots of cars on the road.', breakdown: ['很多 + 辆 + 车', 'vehicles ride 辆', 'existence: 有'] },
            { hanzi: '这 条 新 闻 很 有 意 思 。', pinyin: 'zhè tiáo xīnwén hěn yǒu yìsi .', en: 'This piece of news is interesting.', breakdown: ['条 counts NEWS too', '很有意思 = interesting (很-frame)', 'long-things family surprises'] },
            { hanzi: '学 生 们 个 个 都 很 努 力 。', pinyin: 'xuéshengmen gè ge dōu hěn nǔlì .', en: 'The students — every single one — work hard.', breakdown: ['个个 = each and every', '都 mandatory with 个个', 'the reduplicated measure'] },
            { hanzi: '请 再 说 一 遍 。', pinyin: 'qǐng zài shuō yí biàn .', en: 'Please say it one more time.', breakdown: ['遍 = pass-through measure', '说一遍 = say once through', 'actions count too!'] },
        ],
        commonMistakes: [
            'Number straight onto noun: 三书 — WRONG. The measure word is not optional: 三本书. Speech without it sounds broken.',
            '只 for one of a pair vs 双 for the pair: 一只手 (ONE hand) vs 一双手 (BOTH hands) — one character flips the meaning.',
            '条 for everything long-ish humans: 一个人 never 一个人条…; 条 is for things shaped/behaving long (river, dog, pants, news) — people stay 个/位.',
            'Forgetting 次/遍 for actions: actions count with their own measures — 去过三次 (次), 读了一遍 (遍, one pass-through).',
        ],
    },

    patterns: [
        { type: 'The obligatory frame', hanzi: '(这/那) + number + measure + noun', pinyin: 'zhè sān běn shū .', en: 'no measure, no number' },
        { type: 'Animals & singles', hanzi: '只', pinyin: 'yì zhī māo · yì zhī shǒu', en: 'cats, dogs, birds, ONE hand' },
        { type: 'Long & flexible', hanzi: '条', pinyin: 'yì tiáo hé · yì tiáo kùzi', en: 'rivers, pants, dogs, news' },
        { type: 'Flat & spread', hanzi: '张', pinyin: 'yì zhāng piào · yì zhāng zhào piàn', en: 'tickets, photos, tables, faces' },
        { type: 'Each-and-every', hanzi: 'measure reduplicated + 都', pinyin: 'gè ge dōu hěn nǔlì .', en: '个个/天天/人人 + 都' },
        { type: 'Action measures', hanzi: 'V + 次 / 遍 / 下', pinyin: 'qù guo sān cì · dú yí biàn · qiāo yí xià', en: 'occurrences, pass-throughs, quick taps' },
    ],

    sentenceBuilding: [
        { hanzi: '我 家 有 一 只 猫 。', pinyin: 'wǒ jiā yǒu yì zhī māo .', en: 'My family has a cat.' },
        { hanzi: '我 家 有 一 只 猫 、 两 条 狗 和 三 条 鱼 。', pinyin: '… liǎng tiáo gǒu hé sān tiáo yú .', en: '… a cat, two dogs and three fish.' },
        { hanzi: '动 物 园 里 有 五 只 大 熊 猫 ， 每 只 都 很 可 爱 。', pinyin: 'dòngwùyuán lǐ yǒu wǔ zhī dàxióngmāo , měi zhī dōu hěn kě\u2019ài .', en: 'The zoo has five pandas — every one adorable.' },
        { hanzi: '请 给 我 两 张 去 上 海 的 票 。', pinyin: 'qǐng gěi wǒ liǎng zhāng qù Shànghǎi de piào .', en: 'Two tickets to Shanghai, please.' },
        { hanzi: '这 些 学 生 个 个 都 会 说 三 种 语 言 。', pinyin: 'zhèxiē xuéshengmen gè ge dōu huì shuō sān zhǒng yǔyán .', en: 'These students — every one — speak three languages.' },
    ],

    practice: [
        { instruction: 'Measure the cat:', question: '一 ___ 猫', answer: '只 — animals take 只' },
        { instruction: 'Measure the river:', question: '一 ___ 河', answer: '条 — long things' },
        { instruction: 'Measure the ticket:', question: '两 ___ 票', answer: '张 — flat things' },
        { instruction: 'Measure the car:', question: '一 ___ 车', answer: '辆 — vehicles' },
        { instruction: 'One hand vs a pair of hands:', question: '一 ___ 手 (ONE) / 一 ___ 手 (BOTH)', answer: '只 … 双 — single vs pair' },
        { instruction: 'Every single one:', question: '学 生 们 ___ ___ 都 很 努 力 。', answer: '个 个 — reduplicated measure' },
    ],

    translationPractice: [
        { en: 'My family has a cat.', hanzi: '我 家 有 一 只 猫 。', pinyin: 'wǒ jiā yǒu yì zhī māo .' },
        { en: 'Two tickets to Shanghai, please.', hanzi: '请 给 我 两 张 去 上 海 的 票 。', pinyin: 'qǐng gěi wǒ liǎng zhāng qù Shànghǎi de piào .' },
        { en: 'This piece of news is interesting.', hanzi: '这 条 新 闻 很 有 意 思 。', pinyin: 'zhè tiáo xīnwén hěn yǒu yìsi .' },
        { en: 'I bought three books and a dictionary.', hanzi: '我 买 了 三 本 书 和 一 本 词 典 。', pinyin: 'wǒ mǎi le sān běn shū hé yì běn cídiǎn .' },
        { en: 'Every student works hard.', hanzi: '学 生 们 个 个 都 很 努 力 。', pinyin: 'xuéshengmen gè ge dōu hěn nǔlì .' },
        { en: 'I\u2019ve been to Beijing three times.', hanzi: '我 去 过 三 次 北 京 。', pinyin: 'wǒ qù guo sān cì Běijīng .' },
    ],

    reverseTranslation: [
        { hanzi: '路 上 有 十 几 辆 出 租 车 。', pinyin: 'lù shang yǒu shí jǐ liàng chūzūchē .', en: 'There are a dozen-odd taxis on the road.' },
        { hanzi: '一 群 孩 子 在 公 园 里 玩 。', pinyin: 'yì qún háizi zài gōngyuán lǐ wán .', en: 'A crowd of kids plays in the park.' },
        { hanzi: '请 再 读 一 遍 。', pinyin: 'qǐng zài dú yí biàn .', en: 'Please read it once more.' },
        { hanzi: '他 送 了 我 一 束 花 。', pinyin: 'tā sòng le wǒ yí shù huā .', en: 'He gave me a bouquet of flowers. (束 = bouquet measure)' },
    ],

    register: {
        casual: '来 瓶 水 ！ — drop the number: the measure alone orders it (a water!).',
        polite: '给 我 拿 两 双 筷 子 ， 谢 谢 。 — full frame at the restaurant.',
        formal: '本 店 限 购 两 件 。 — the limit notice: 两件 per customer.',
    },

    culture: 'Measure words are Chinese folk taxonomy: dogs are 条 (long, loyal, alive), cats are 只 (little crouching things), horses are 匹 (pǐ — the noble exception), and news is 条 too (a long thread of story). Poets exploit them: 一叶知秋 (one LEAF knows autumn) uses 叶 as a measure-poem. In markets, 斤 still rules produce; in ticket halls, 张 rules paper; on roads, 辆 counts the traffic jam. And the reduplication culture — 天天, 人人, 年年 — gives slogans their beat: 天天向上 (improve every day).',

    freeProduction: 'Record an inventory of your room/home (8–10 lines) with SIX different measures: 一张床, 两把椅子, 三本书, 一只猫, 一条狗/一条鱼, 一双鞋, plus one reduplicated sentence (个个都…). Then count your life: 去过…次, 学了…年, 办了…张卡. No 个 allowed except once, deliberately.',

    miniTest: [
        { question: 'A cat:', options: ['一 个 猫', '一 只 猫', '一 条 猫', '一 张 猫'], answer: '一 只 猫 — animals ride 只' },
        { question: 'A piece of news:', options: ['一 个 新 闻', '一 条 新 闻', '一 张 新 闻', '一 只 新 闻'], answer: '一 条 新 闻 — news is long too' },
        { question: 'ONE hand (the other lost):', options: ['一 双 手', '一 只 手', '两 个 手', '一 把 手'], answer: '一 只 手 — single of a pair' },
        { question: '个个都很努力 means:', options: ['some work hard', 'every single one works hard', 'work hard together', 'hardly any work'], answer: 'every single one works hard — reduplicated measure + 都' },
        { question: 'Count "read it once through":', options: ['读 一 次', '读 一 遍', '读 一 只', '读 一 张'], answer: '读 一 遍 — 遍 = one pass-through' },
    ],

    review: [
        'The shopping lecture\u2019s 件/本/斤 set was the preview — this lecture adds shape-logic and action measures.',
        'Next: location — 上/下/里/外 on the noun\u2019s tail, and the 在/有/是 existence trio.',
    ],

    traps: [
        'The measure is NEVER optional: 三本书, not 三书 — and 两 before the measure (两个人), not 二.',
        '只 vs 双: 一只手 = one hand; 一双手 = a pair of hands. Animals also 只 — 一只猫, 一只狗.',
        '条 surprises: 一条狗 (dog!), 一条新闻 (news), 一条裤子 (pants) — long, flexy, alive or thread-like.',
        'Actions have measures too: 次 (occurrences), 遍 (pass-throughs), 下 (quick taps): 敲了三下.',
    ],

    homework: {
        intro: 'The measure zoo: shape logic, the 个 default, reduplication, and action counting.',
        translation: [
            { prompt: 'My family has a cat.', answer: '我 家 有 一 只 猫 。', alt: ['我家有一只猫。'], explanation: '只 = animal measure.' },
            { prompt: 'Two tickets to Shanghai, please.', answer: '请 给 我 两 张 去 上 海 的 票 。', alt: ['请给我两张去上海的票。'], explanation: '张 for flat tickets; 的 links destination.' },
            { prompt: 'This piece of news is interesting.', answer: '这 条 新 闻 很 有 意 思 。', alt: ['这条新闻很有意思。'], explanation: '条 counts news — the long-thread family.' },
            { prompt: 'Every student works hard.', answer: '学 生 们 个 个 都 很 努 力 。', alt: ['学生们个个都很努力。'], explanation: '个个 + 都 = each and every.' },
            { prompt: 'I\u2019ve been to Beijing three times.', answer: '我 去 过 三 次 北 京 。', alt: ['我去过三次北京。'], explanation: '次 counts occurrences with 过.' },
            { prompt: 'A pair of shoes costs two hundred kuai.', answer: '一 双 鞋 二 百 块 钱 。', alt: ['一双鞋二百块钱。'], explanation: '双 for pairs; number+measure+price frame.' },
        ],
        blanks: [
            { prompt: '一 ___ 河 。 (river)', answer: '条', explanation: '条 = long/flexible things.' },
            { prompt: '两 ___ 票 。 (tickets)', answer: '张', explanation: '张 = flat things.' },
            { prompt: '一 ___ 车 。 (vehicle)', answer: '辆', explanation: '辆 = vehicles.' },
            { prompt: '一 ___ 鞋 。 (pair)', answer: '双', explanation: '双 = pairs of things — shoes, hands, chopsticks.' },
            { prompt: '一 群 孩 子 个 ___ 都 很 可 爱 。', answer: '个', explanation: '个个 = each and every + 都.' },
            { prompt: '读 一 ___ 。 (one pass-through)', answer: '遍', explanation: '遍 = one pass through a text/action.' },
        ],
        corrections: [
            { prompt: '我 买 了 三 书 。', answer: '我 买 了 三 本 书 。', explanation: 'How the mistake happens: dropping the measure. Why it does not work: number cannot touch noun directly. How to fix it: 三本书.' },
            { prompt: '我 买 了 两 个 鞋 。', answer: '我 买 了 一 双 鞋 。', explanation: 'How the mistake happens: 个 + pluralizing. Why it does not work: shoes are PAIRS — 双; and Chinese counts the pair, not two shoes. How to fix it: 一双鞋.' },
            { prompt: '一 条 人 在 门 口 。', answer: '一 个 人 在 门 口 。', explanation: 'How the mistake happens: over-extending 条. Why it does not work: people take 个/位 — 条 is for long THINGS and a few animals. How to fix it: 一个人.' },
            { prompt: '学 生 们 个 个 很 努 力 。', answer: '学 生 们 个 个 都 很 努 力 。', explanation: 'How the mistake happens: reduplication without 都. Why it does not work: 个个/天天/人人 pull 都 with them. How to fix it: 个个都…' },
            { prompt: '我 去 过 中 国 三 遍 。', answer: '我 去 过 中 国 三 次 。', explanation: 'How the mistake happens: 遍 for visits. Why it does not work: 遍 = pass-throughs of repeatable actions (读一遍); trips count with 次. How to fix it: 三次.' },
        ],
        writing: {
            task: 'Write your home-and-life inventory (10–12 lines): six different measure words (只/条/张/辆/把/双/本/杯), one reduplicated 个个/天天 + 都 sentence, one action count with 次 or 遍, and one deliberate 个 with a note why it fits.',
            requirements: [
                'Six different measures used correctly',
                'One reduplicated measure + 都 (个个/天天/人人)',
                'One action count (三次 / 一遍 / 一下)',
                'One 两 before a measure (not 二)',
                'One 有-existence sentence with measures',
            ],
            minWords: 55,
        },
        checklist: [
            'I place a measure between number and noun — always',
            'I sort by shape/family: 只 animals · 条 long · 张 flat · 辆 vehicles · 把 handled · 双 pairs · 本 books',
            'I default to 个 safely when unsure',
            'I reduplicate for each-and-every: 个个/天天/人人 + 都',
            'I count actions with 次/遍/下',
            'I use 两 before measures, 二 in compounds',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The shape shelf: 张 FLAT (paper/tickets/tables/faces) · 条 LONG (rivers/pants/dogs/news) · 只 SMALL-ANIMAL/single-of-pair · 辆 VEHICLES · 把 HANDLED (knife/umbrella/chair) · 双 PAIRS.',
            examples: [
                { hanzi: '一 张 票 · 一 条 河 · 一 只 猫 · 一 辆 车 · 一 把 伞 · 一 双 鞋', pinyin: 'the six-shape zoo', en: 'a ticket · a river · a cat · a car · an umbrella · a pair of shoes' },
            ],
        },
        {
            explanation: 'The people set: 个 (default), 位 (polite: 三位客人), 名 (formal: 两名学生). Families: 家 (一家店), 口 (四口人).',
            examples: [
                { hanzi: '三 位 客 人 · 两 名 学 生', pinyin: 'sān wèi kèrén · liǎng míng xuésheng', en: 'three guests · two students' },
            ],
        },
        {
            explanation: 'Action measures: 次 (occurrences: 去过三次), 遍 (pass-throughs: 读一遍), 下 (quick taps: 敲三下), 顿 (meals: 一顿饭).',
            examples: [
                { hanzi: '看 了 三 遍 · 敲 了 两 下', pinyin: 'kàn le sān biàn · qiāo le liǎng xià', en: 'watched three times · knocked twice' },
            ],
        },
        {
            explanation: 'Reduplication = each-and-every, and it pulls 都: 个个都会, 天天加班, 人人喜欢.',
            examples: [
                { hanzi: '天 天 都 很 忙 。', pinyin: 'tiān tiān dōu hěn máng .', en: 'Busy every single day.' },
            ],
        },
        {
            explanation: '两 vs 二 inside measures: 两本书 ✓ · 二本书 ✗ — but 十二本书 ✓ (二 lives inside compounds).',
            examples: [
                { hanzi: '两 本 书 · 十 二 本 书', pinyin: 'liǎng běn shū · shí\u2019èr běn shū', en: 'two books · twelve books' },
            ],
        },
        {
            explanation: 'The polite/fancy measures: 位 (people, respectful), 份 (portions: 一份礼物), 束 (bouquets: 一束花), 台 (machines: 一台电脑).',
            examples: [
                { hanzi: '一 份 礼 物 · 一 台 电 脑 · 一 束 花', pinyin: 'yí fèn lǐwù · yì tái diànnǎo · yí shù huā', en: 'a gift · a computer · a bouquet' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '只': { en: 'measure: animals, one of a pair', pron: 'zhī', tone: '1', note: '一只猫 · 一只手. vs 只 zhǐ (only).' },
        '条': { en: 'measure: long things', pron: 'tiáo', tone: '2', note: '河/裤子/狗/新闻 — the flexible family.' },
        '张': { en: 'measure: flat things', pron: 'zhāng', tone: '1', note: '票/纸/桌子/照片/嘴.' },
        '辆': { en: 'measure: vehicles', pron: 'liàng', tone: '4', note: '车/自行车/出租车.' },
        '双': { en: 'measure: pairs', pron: 'shuāng', tone: '1', note: '鞋/手/筷子 — two-of-a-kind.' },
        '群': { en: 'measure: crowd/flock', pron: 'qún', tone: '2', note: '一群人/一群羊 — hidden ü after q!' },
        '位': { en: 'measure: people (polite)', pron: 'wèi', tone: '4', note: '三位客人 — the respectful 个.' },
        '份': { en: 'measure: portions/copies', pron: 'fèn', tone: '4', note: '一份礼物/报纸.' },
        '束': { en: 'measure: bouquets', pron: 'shù', tone: '4', note: '一束花 — tied flowers.' },
        '遍': { en: 'measure: pass-throughs', pron: 'biàn', tone: '4', note: '读一遍 = read once through.' },
        '努力': { en: 'to work hard / diligent', pron: 'nǔlì', tone: '3-4', note: '个个都很努力 — the effort compliment.' },
        '动物园': { en: 'zoo', pron: 'dòngwùyuán', tone: '4-4-2', note: 'Animal-measure paradise.' },
    },
};

// ── HSK 3 · Directions & Location ───────────────────────────────────────────
const h3Location: StaticChineseLesson = {
    title: 'Directions & Location',
    objective: 'Locate everything with the direction suffixes (上/下/里/外/前/后/旁边), choose among 在/有/是 for existence, and level up change with 越来越 — the spatial grammar of every address, description and photo description.',

    vocabulary: [
        { hanzi: '上 面', pinyin: 'shàngmiàn', en: 'on top / above', example: { hanzi: '桌 子 上 面 有 一 本 书 。', pinyin: 'zhuōzi shàngmiàn yǒu yì běn shū .', en: 'There\u2019s a book on the desk.' }, related: [{ hanzi: '下 面', pinyin: 'xiàmiàn', en: 'under' }] },
        { hanzi: '里 面', pinyin: 'lǐmiàn', en: 'inside', example: { hanzi: '房 间 里 面 很 干 净 。', pinyin: 'fángjiān lǐmiàn hěn gānjìng .', en: 'Inside the room is clean.' }, related: [{ hanzi: '外 面', pinyin: 'wàimiàn', en: 'outside' }] },
        { hanzi: '前 面', pinyin: 'qiánmiàn', en: 'in front', example: { hanzi: '学 校 前 面 有 一 家 银 行 。', pinyin: 'xuéxiào qiánmiàn yǒu yì jiā yínháng .', en: 'There\u2019s a bank in front of the school.' }, related: [{ hanzi: '后 面', pinyin: 'hòumiàn', en: 'behind' }] },
        { hanzi: '旁 边', pinyin: 'pángbiān', en: 'beside / next to', example: { hanzi: '车 站 旁 边 有 一 个 超 市 。', pinyin: 'chēzhàn pángbiān yǒu yí ge chāoshì .', en: 'There\u2019s a supermarket beside the station.' }, related: [{ hanzi: '左 边', pinyin: 'zuǒbian', en: 'on the left' }] },
        { hanzi: '离', pinyin: 'lí', en: 'away from (distance)', example: { hanzi: '我 家 离 学 校 很 近 。', pinyin: 'wǒ jiā lí xuéxiào hěn jìn .', en: 'My home is close to school.' }, related: [{ hanzi: '离 远', pinyin: 'lí yuǎn', en: 'far from' }] },
        { hanzi: '往', pinyin: 'wǎng', en: 'toward (a direction)', example: { hanzi: '往 前 走 。', pinyin: 'wǎng qián zǒu .', en: 'Walk straight ahead.' }, related: [{ hanzi: '往 左 拐', pinyin: 'wǎng zuǒ guǎi', en: 'turn left' }] },
        { hanzi: '越 来 越', pinyin: 'yuèláiyuè', en: 'more and more', example: { hanzi: '中 国 越 来 越 漂 亮 。', pinyin: 'Zhōngguó yuèláiyuè piàoliang .', en: 'China is more and more beautiful.' }, related: [{ hanzi: '越 … 越 …', pinyin: 'yuè … yuè …', en: 'the more… the more…' }] },
        { hanzi: '对 面', pinyin: 'duìmiàn', en: 'across / opposite', example: { hanzi: '银 行 对 面 是 一 家 咖 啡 馆 。', pinyin: 'yínháng duìmiàn shì yì jiā kāfēiguǎn .', en: 'Opposite the bank is a café.' }, related: [{ hanzi: '对面 的 店', pinyin: 'duìmiàn de diàn', en: 'the shop across' }] },
        { hanzi: '附 近', pinyin: 'fùjìn', en: 'nearby', example: { hanzi: '附 近 有 没 有 地 铁 站 ？', pinyin: 'fùjìn yǒu méiyǒu dìtiě zhàn ?', en: 'Is there a subway station nearby?' }, related: [{ hanzi: '附 近 的 饭 馆', pinyin: 'fùjìn de fànguǎn', en: 'a nearby restaurant' }] },
        { hanzi: '地 图', pinyin: 'dìtú', en: 'map', measureWord: '张', example: { hanzi: '给 我 一 张 地 图 。', pinyin: 'gěi wǒ yì zhāng dìtú .', en: 'Give me a map.' }, related: [{ hanzi: '看 地 图', pinyin: 'kàn dìtú', en: 'read the map' }] },
    ],

    characters: [
        { hanzi: '面', pinyin: 'miàn', en: 'face / side', components: 'a face with an eye', mnemonic: 'The FACE picture — 上面/下面 are the faces a thing shows. Also noodles: 面条.' },
        { hanzi: '旁', pinyin: 'páng', en: 'beside', components: '亠 + 方-ish', mnemonic: '旁 sounds like 胖 (pàng, fat) — the friendly neighbor standing beside you: 旁边.' },
        { hanzi: '离', pinyin: 'lí', en: 'away from / leave', components: '亠 + 凶 + 禸', mnemonic: '离 = leave — 离开 (leave), 距离 (distance). The distance-frame opener: 离…近/远.' },
        { hanzi: '越', pinyin: 'yuè', en: 'to exceed / more-and-more', components: '走(walk) + 戉(axe)', mnemonic: 'WALK past the AXE line — to exceed. 越来越 = walking further each time.' },
        { hanzi: '图', pinyin: 'tú', en: 'picture / map', components: '囗(enclosure) + 冬', mnemonic: 'WINTER inside a FRAME — a picture frames a scene. 地图 = earth-picture = map.' },
        { hanzi: '附', pinyin: 'fù', en: 'near / attach (in 附近)', components: '阝(mound) + 付', mnemonic: 'The MOUND radical 阝 marks places: 附 (nearby), 院 (courtyard), 郊 (suburbs).' },
    ],

    pronunciation: [
        { hanzi: '上 面', pinyin: 'shàngmiàn', toneNote: '4-4: both stomp; 面 can neutralize in fast speech (shàngmian).', en: 'on-top.' },
        { hanzi: '旁 边', pinyin: 'pángbiān', toneNote: '2-1: rise then flat.', en: 'beside.' },
        { hanzi: '附 近', pinyin: 'fùjìn', toneNote: '4-4: two stomps — the fù is firm.', en: 'nearby.' },
        { hanzi: '越 来 越', pinyin: 'yuèláiyuè', toneNote: '4-2-4: stomp-rise-stomp — the intensifier wave.', en: 'more and more.' },
        { hanzi: '离', pinyin: 'lí', toneNote: '2nd rising — 离开, 距离 both rise.', en: 'away-from.' },
        { hanzi: '往 前', pinyin: 'wǎng qián', toneNote: '3-2: the 往 half-dips before the rising 前.', en: 'toward-front.' },
    ],

    grammar: {
        rule: 'Location suffixes attach AFTER the noun: 桌子上, 房间里, 学校前面. Existence picks 在 (specific), 有 (introducing something new), 是 (identifying): 学校前面有一个银行 (有) / 银行对面是咖啡馆 (是). Distance frames with 离 (我家离学校很近), direction with 往 (往前走), and change with 越来越 (越来越好).',
        explanation: 'Chinese builds locations by stacking the direction word AFTER the noun: 桌子上面 (desk-top), 房间里面 (room-inside), 学校前面 (school-front), 车站旁边 (station-beside). The 面可以 drop in speech (桌子上). Existence sentences then choose a head verb: 有 introduces something NEW into the scene (桌子上有一本书 — there IS a book); 是 identifies a KNOWN specific thing (银行对面是咖啡馆 — the thing across IS that café); 在 states where a KNOWN thing sits (书在桌子上). Getting the 有/是 choice right is the HSK-3 photo-description skill. Distance uses the 离 frame: 我家离学校很近/很远 — 离 never takes the place first (离学校我家近 ✗). Directions for movement use 往: 往前走, 往左拐. And 越来越 + adjective tracks change over time (越来越贵), while 越V越A chains two clauses (越说越高兴).',
        examples: [
            { hanzi: '桌 子 上 有 一 本 书 。', pinyin: 'zhuōzi shàng yǒu yì běn shū .', en: 'There\u2019s a book on the desk.', breakdown: ['桌子上 = desk-top (suffix AFTER noun)', '有 = introduces the new book', 'measure 本 returns'] },
            { hanzi: '银 行 对 面 是 咖 啡 馆 。', pinyin: 'yínháng duìmiàn shì kāfēiguǎn .', en: 'Across from the bank is a café.', breakdown: ['对面 = across', '是 = identifies the known building', 'not 有 — the café is specific'] },
            { hanzi: '我 家 离 公 司 不 远 。', pinyin: 'wǒ jiā lí gōngsī bù yuǎn .', en: 'My home isn\u2019t far from the office.', breakdown: ['离 frame: A 离 B + 近/远', '不 远 = not far', 'no 在 needed'] },
            { hanzi: '往 前 走 ， 然 后 往 左 拐 。', pinyin: 'wǎng qián zǒu , ránhòu wǎng zuǒ guǎi .', en: 'Go straight, then turn left.', breakdown: ['往 + direction + verb', '然后 = then', 'the standard direction script'] },
            { hanzi: '这 个 城 市 越 来 越 漂 亮 。', pinyin: 'zhè ge chéngshì yuèláiyuè piàoliang .', en: 'This city is more and more beautiful.', breakdown: ['越来越 + adjective', 'change over time', 'no 了 needed'] },
            { hanzi: '书 在 桌 子 上 ， 不 在 抽 屉 里 。', pinyin: 'shū zài zhuōzi shàng , bú zài chōuti lǐ .', en: 'The book is ON the desk, not IN the drawer.', breakdown: ['在 = the known book\u2019s location', '里 = inside', 'negation of location'] },
        ],
        commonMistakes: [
            'Pre-noun placement: 上面桌子有书 — WRONG. The direction word attaches AFTER the noun: 桌子上面. Chinese locations are suffixes, not prefixes.',
            '是 vs 有 swapped: 学校前面是一个银行 (introducing something new) wants 有: 学校前面有一个银行. 是 identifies knowns.',
            '在 for existence: 桌子上在有一本书 — 在 states where KNOWN things sit; introducing new things takes 有.',
            'Distance without 离: 我家很近学校 — WRONG. The 离 frame: 我家离学校很近.',
        ],
    },

    patterns: [
        { type: 'The suffix stack', hanzi: 'noun + 上/下/里/外/前/后/旁边', pinyin: 'zhuōzi shàng .', en: 'location attaches after the noun' },
        { type: 'Introduce new (有)', hanzi: 'place + 有 + noun', pinyin: 'zhuōzi shàng yǒu yì běn shū .', en: 'there is…' },
        { type: 'Identify known (是)', hanzi: 'place + 是 + specific', pinyin: 'duìmiàn shì yì jiā kāfēiguǎn .', en: 'across is THAT café' },
        { type: 'Locate known (在)', hanzi: 'thing + 在 + place', pinyin: 'shū zài zhuōzi shàng .', en: 'the book is on the desk' },
        { type: 'Distance', hanzi: 'A + 离 + B + 近/远', pinyin: 'wǒ jiā lí gōngsī hěn jìn .', en: 'A is close to B' },
        { type: 'Direction of travel', hanzi: '往 + direction + V', pinyin: 'wǎng qián zǒu .', en: 'walk toward-front' },
        { type: 'Change over time', hanzi: '越 来 越 + adj', pinyin: 'yuèláiyuè guì .', en: 'more and more…' },
    ],

    sentenceBuilding: [
        { hanzi: '我 家 附 近 有 一 个 公 园 。', pinyin: 'wǒ jiā fùjìn yǒu yí ge gōngyuán .', en: 'There\u2019s a park near my home.' },
        { hanzi: '公 园 里 面 有 一 个 湖 ， 湖 边 上 有 很 多 树 。', pinyin: 'gōngyuán lǐmiàn yǒu yí ge hú , hú biān shang yǒu hěn duō shù .', en: 'Inside the park there\u2019s a lake; around the lake, many trees.' },
        { hanzi: '湖 的 对 面 是 一 家 咖 啡 馆 ， 咖 啡 馆 后 面 是 图 书 馆 。', pinyin: 'hú de duìmiàn shì yì jiā kāfēiguǎn , kāfēiguǎn hòumiàn shì túshūguǎn .', en: 'Across the lake is a café; behind the café, the library.' },
        { hanzi: '从 我 家 到 公 园 很 近 ， 骑 车 五 分 钟 就 到 。', pinyin: 'cóng wǒ jiā dào gōngyuán hěn jìn , qíchē wǔ fēnzhōng jiù dào .', en: 'From home to the park is close — five minutes by bike.' },
        { hanzi: '这 个 城 市 的 交 通 越 来 越 方 便 ， 我 越 来 越 喜 欢 这 里 了 。', pinyin: 'zhè ge chéngshì de jiāotōng yuèláiyuè fāngbiàn , wǒ yuèláiyuè xǐhuan zhèlǐ le .', en: 'The city\u2019s transit keeps getting better — I like it here more and more.' },
    ],

    practice: [
        { instruction: 'Suffix the location:', question: '桌 子 ___ (on) 有 一 本 书 。', answer: '上 — 桌子上' },
        { instruction: '有 or 是?', question: '学 校 前 面 ___ 一 个 银 行 。 (new info)', answer: '有 — introducing something new' },
        { instruction: '有 or 是?', question: '银 行 对 面 ___ 咖 啡 馆 。 (that specific café)', answer: '是 — identifying the known one' },
        { instruction: 'The distance frame:', question: '我 家 ___ 学 校 很 近 。', answer: '离 — A 离 B 近/远' },
        { instruction: 'Direction of travel:', question: '___ 前 走 ， 然 后 左 拐 。', answer: '往 — 往前走' },
        { instruction: 'Change over time:', question: '物 价 ___ ___ 高 。', answer: '越 来 越 — 越来越高' },
    ],

    translationPractice: [
        { en: 'There\u2019s a book on the desk.', hanzi: '桌 子 上 有 一 本 书 。', pinyin: 'zhuōzi shàng yǒu yì běn shū .' },
        { en: 'There\u2019s a bank in front of the school.', hanzi: '学 校 前 面 有 一 家 银 行 。', pinyin: 'xuéxiào qiánmiàn yǒu yì jiā yínháng .' },
        { en: 'Opposite the bank is a café.', hanzi: '银 行 对 面 是 咖 啡 馆 。', pinyin: 'yínháng duìmiàn shì kāfēiguǎn .' },
        { en: 'My home is close to the school.', hanzi: '我 家 离 学 校 很 近 。', pinyin: 'wǒ jiā lí xuéxiào hěn jìn .' },
        { en: 'Go straight, then turn left.', hanzi: '往 前 走 ， 然 后 往 左 拐 。', pinyin: 'wǎng qián zǒu , ránhòu wǎng zuǒ guǎi .' },
        { en: 'The city is more and more beautiful.', hanzi: '这 个 城 市 越 来 越 漂 亮 。', pinyin: 'zhè ge chéngshì yuèláiyuè piàoliang .' },
    ],

    reverseTranslation: [
        { hanzi: '房 间 里 面 有 一 只 猫 。', pinyin: 'fángjiān lǐmiàn yǒu yì zhī māo .', en: 'There\u2019s a cat inside the room.' },
        { hanzi: '车 站 旁 边 有 一 个 超 市 。', pinyin: 'chēzhàn pángbiān yǒu yí ge chāoshì .', en: 'There\u2019s a supermarket next to the station.' },
        { hanzi: '附 近 有 没 有 地 铁 站 ？', pinyin: 'fùjìn yǒu méiyǒu dìtiě zhàn ?', en: 'Is there a subway station nearby?' },
        { hanzi: '物 价 越 来 越 高 了 。', pinyin: 'wùjià yuèláiyuè gāo le .', en: 'Prices are getting higher and higher.' },
    ],

    register: {
        casual: '就 在 前 面 儿 ， 走 两 步 就 到 ！ — 就 + 两步 = the reassuring direction.',
        polite: '您 一 直 往 前 走 ， 到 红 绿 灯 往 左 拐 。 — 您 + the full script.',
        formal: '本 馆 位 于 市 中 心 ， 交 通 便 利 。 — 位于 = the written located-at of signs.',
    },

    culture: 'Chinese addresses run big-to-small (country → city → district → street → number), mirroring the date system — and the direction words inside them are ancient: 北京 means NORTH-capital, 南京 south-capital, 武汉 spans east+west of two rivers (武昌+汉口). The 越来越 frame is modern China\u2019s favorite self-description: 越来越多的人学汉语 — the exam essay\u2019s favorite opener. And the 是/有 distinction saves lives at the doctors: 心脏左边是胃 (the stomach IS to the left of the heart — specific) vs 身体里有很多器官 (there are many organs — general).',

    freeProduction: 'Record a neighborhood tour (9–11 lines): 我家附近有… (three places with 有), locations of each (…前面/旁边/对面), one 是-identification, distances with 离 (…离…很近), directions from the bus stop (往…走，往…拐), and a 越来越 closer (这个区越来越方便). Then draw the map as you speak — the listener should be able to find your home.',

    miniTest: [
        { question: 'There\u2019s a book ON the desk:', options: ['上 面 桌 子 有 一 本 书 。', '桌 子 上 有 一 本 书 。', '桌 子 是 一 本 书 。', '桌 子 有 在 一 本 书 。'], answer: '桌 子 上 有 一 本 书 。 — suffix after noun + 有' },
        { question: 'Introducing a NEW bank (unspecific):', options: ['学 校 前 面 是 一 个 银 行 。', '学 校 前 面 有 一 个 银 行 。', '学 校 有 在 前 面 银 行 。', '银 行 有 学 校 前 面 。'], answer: '学 校 前 面 有 一 个 银 行 。 — 有 introduces new things' },
        { question: '我 家 离 学 校 很 近 — 离 frames:', options: ['time', 'distance', 'weather', 'opinion'], answer: 'distance — A 离 B 近/远' },
        { question: 'Walk straight ahead:', options: ['前 往 走 。', '往 前 走 。', '走 往 前 。', '前 往 走 走 。'], answer: '往 前 走 。 — 往 + direction + verb' },
        { question: '越 来 越 + adjective means:', options: ['very', 'more and more', 'the most', 'a bit too'], answer: 'more and more — change over time' },
    ],

    review: [
        'The transport lecture\u2019s 怎么走 directions now have their full script: 往…走，往…拐.',
        'Next: opinions — 觉得/认为 with the connector upgrades (不但…而且…, 虽然…但是…).',
    ],

    traps: [
        'Direction words are SUFFIXES: 桌子上, not 上面桌子. The noun comes first, the location rides after.',
        '有 introduces NEW things; 是 identifies KNOWN ones: 前面有一个银行 (new) vs 对面是那家咖啡馆 (that one).',
        '在 locates KNOWN things: 书在桌子上 — it does not introduce new existences.',
        '离 opens the distance frame: A 离 B 近/远 — and never reverses (离B A近 ✗).',
    ],

    homework: {
        intro: 'Suffixes, the existence trio, 离 distances, 往 directions, 越来越 change — your neighborhood, mapped.',
        translation: [
            { prompt: 'There\u2019s a book on the desk.', answer: '桌 子 上 有 一 本 书 。', alt: ['桌子上有一本书。'], explanation: 'noun + 上 suffix + 有 + new thing.' },
            { prompt: 'There\u2019s a bank in front of the school.', answer: '学 校 前 面 有 一 家 银 行 。', alt: ['学校前面有一家银行。'], explanation: '家 measures banks/shops too.' },
            { prompt: 'Opposite the bank is a café.', answer: '银 行 对 面 是 咖 啡 馆 。', alt: ['银行对面是咖啡馆。'], explanation: '是 identifies the known specific café.' },
            { prompt: 'My home is close to the school.', answer: '我 家 离 学 校 很 近 。', alt: ['我家离学校很近。'], explanation: '离 frame: A 离 B + 近/远.' },
            { prompt: 'Go straight, then turn left.', answer: '往 前 走 ， 然 后 往 左 拐 。', alt: ['往前走，然后往左拐。'], explanation: '往 + direction + verb, twice.' },
            { prompt: 'Prices are getting higher and higher.', answer: '物 价 越 来 越 高 。', alt: ['物价越来越高。'], explanation: '越来越 + adjective — no 了 needed.' },
        ],
        blanks: [
            { prompt: '桌 子 ___ 有 一 本 书 。 (on)', answer: '上', explanation: 'noun + 上 = on top.' },
            { prompt: '学 校 前 ___ 有 一 家 银 行 。 (in front)', answer: '面', explanation: '前面 — in front (面 droppable in speech).' },
            { prompt: '银 行 对 ___ 是 咖 啡 馆 。 (across)', answer: '面', explanation: '对面 = across.' },
            { prompt: '我 家 ___ 学 校 很 近 。 (from)', answer: '离', explanation: '离 frames distance.' },
            { prompt: '___ 前 走 ， 然 后 左 拐 。 (toward)', answer: '往', explanation: '往 + direction.' },
            { prompt: '物 价 越 来 越 ___ 。 (high)', answer: '高', explanation: '越来越高 + adjective.' },
        ],
        corrections: [
            { prompt: '上 面 桌 子 有 一 本 书 。', answer: '桌 子 上 有 一 本 书 。', explanation: 'How the mistake happens: prefix locations like English. Why it does not work: Chinese directions attach AFTER the noun. How to fix it: 桌子上.' },
            { prompt: '学 校 前 面 是 一 个 银 行 。 (first mention)', answer: '学 校 前 面 有 一 个 银 行 。', explanation: 'How the mistake happens: 是 for existence. Why it does not work: 是 identifies KNOWN things; new things arrive with 有. How to fix it: 有一个银行.' },
            { prompt: '我 家 很 近 学 校 。', answer: '我 家 离 学 校 很 近 。', explanation: 'How the mistake happens: near-to word order. Why it does not work: distance needs the 离 frame. How to fix it: 离学校很近.' },
            { prompt: '桌 子 上 在 有 一 本 书 。', answer: '桌 子 上 有 一 本 书 。', explanation: 'How the mistake happens: 在 + 有 stacked. Why it does not work: 在 locates known things; 有 introduces new ones — one head verb per sentence. How to fix it: drop 在.' },
            { prompt: '这 个 城 市 越 来 越 漂 亮 了 很 多 。', answer: '这 个 城 市 越 来 越 漂 亮 。', explanation: 'How the mistake happens: doubling change markers. Why it does not work: 越来越 already carries the change — no extra 了/很多. How to fix it: 越来越漂亮.' },
        ],
        writing: {
            task: 'Write your neighborhood map (10–12 lines): three places with 有 (one with a measure word: 一家/一个/一条), one 是-identification, two suffix locations (…上面/前面/旁边), one 离 distance, one 往-direction route, and a 越来越 closer.',
            requirements: [
                'Three 有 sentences with different suffix locations',
                'One 是 identification of a known place',
                'One 离 distance frame',
                'One 往…走/拐 direction line',
                'One 越来越 closer',
            ],
            minWords: 55,
        },
        checklist: [
            'I attach directions AFTER the noun (桌子上/房间里面/学校前面)',
            'I choose 有 (new) vs 是 (known) vs 在 (locate known things)',
            'I frame distances with 离: A 离 B 很近/很远',
            'I direct with 往 + direction + verb (往前走，往左拐)',
            'I track change with 越来越 + adjective',
            'I know the existence trio cold: 在/有/是',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The suffix shelf: 上面/上面儿 · 下面 · 里面 · 外面 · 前面 · 后面 · 旁边 · 对面 — all attach AFTER the noun: 桌子上, 学校前面.',
            examples: [
                { hanzi: '桌 子 上 · 房 间 里 · 学 校 前 面 · 车 站 旁 边', pinyin: 'zhuōzi shàng · fángjiān lǐ · xuéxiào qiánmiàn · chēzhàn pángbiān', en: 'on the desk · in the room · in front of the school · beside the station' },
            ],
        },
        {
            explanation: 'The existence trio: 有 introduces new things (前面有一个银行); 是 identifies known ones (对面是那家店); 在 locates known things (书在桌子上).',
            examples: [
                { hanzi: '前 面 有 一 个 银 行 。 · 对 面 是 邮 局 。 · 书 在 桌 子 上 。', pinyin: 'the trio in three lines', en: 'there is · it is · it is located' },
            ],
        },
        {
            explanation: '离 distance frame: A 离 B + 近/远 — 我家离公司很远. No 在, no 很-fronting.',
            examples: [
                { hanzi: '机 场 离 市 中 心 很 远 。', pinyin: 'jīchǎng lí shì zhōngxīn hěn yuǎn .', en: 'The airport is far from downtown.' },
            ],
        },
        {
            explanation: 'The direction script: 往前走 → 到红绿灯 → 往左拐 → 就到了. 往 + direction, then the verb.',
            examples: [
                { hanzi: '往 前 走 ， 到 红 绿 灯 往 左 拐 。', pinyin: 'wǎng qián zǒu , dào hónglǜdēng wǎng zuǒ guǎi .', en: 'Straight ahead; at the light, turn left.' },
            ],
        },
        {
            explanation: '越来越 tracks change: 越来越贵/方便/漂亮 — and the chain 越V越A (越说越高兴, the more I say the happier).',
            examples: [
                { hanzi: '越 说 越 高 兴 。', pinyin: 'yuè shuō yuè gāoxìng .', en: 'The more we talk, the happier we get.' },
            ],
        },
        {
            explanation: 'Existence can layer: 桌子上有一本书，书旁边有一杯茶 — each 有 introduces the next landmark. The photo-description chain.',
            examples: [
                { hanzi: '桌 子 上 有 一 本 书 ， 书 旁 边 有 一 杯 茶 。', pinyin: 'zhuōzi shàng yǒu yì běn shū , shū pángbiān yǒu yì bēi chá .', en: 'On the desk there\u2019s a book; next to it, a cup of tea.' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '上面': { en: 'on top / above', pron: 'shàngmiàn', tone: '4-4', note: 'Attaches after noun: 桌子上面.' },
        '里面': { en: 'inside', pron: 'lǐmiàn', tone: '3-4', note: '房间里面; 面 droppable: 屋里.' },
        '前面': { en: 'in front', pron: 'qiánmiàn', tone: '2-4', note: '学校前面; also "before" in time: 以前.' },
        '后面': { en: 'behind', pron: 'hòumiàn', tone: '4-4', note: '图书馆在商店后面.' },
        '旁边': { en: 'beside', pron: 'pángbiān', tone: '2-1', note: '车站旁边 — the neighbor word.' },
        '对面': { en: 'across / opposite', pron: 'duìmiàn', tone: '4-4', note: '银行对面 — the street-facing pair.' },
        '附近': { en: 'nearby', pron: 'fùjìn', tone: '4-4', note: '附近有没有…？ — the search question.' },
        '离': { en: 'away from (distance)', pron: 'lí', tone: '2', note: 'A 离 B 近/远 — the distance frame.' },
        '往': { en: 'toward (direction)', pron: 'wǎng', tone: '3', note: '往前走/往左拐.' },
        '拐': { en: 'to turn (corner)', pron: 'guǎi', tone: '3', note: '往左拐 = turn left.' },
        '越来越': { en: 'more and more', pron: 'yuèláiyuè', tone: '4-2-4', note: '越来越好 — the change frame.' },
        '地图': { en: 'map', pron: 'dìtú', tone: '4-2', measure: '张', note: 'Flat thing — 张 measures it.' },
        '位于': { en: 'to be located at (formal)', pron: 'wèiyú', tone: '4-2', note: '本馆位于市中心 — the sign register.' },
    },
};

// ── HSK 3 · Opinions & Reasons ──────────────────────────────────────────────
const h3Opinions: StaticChineseLesson = {
    title: 'Opinions & Reasons',
    objective: 'Hold a position and defend it — 觉得 for feelings, 认为 for considered views, the connector upgrades 不但…而且, 虽然…但是, 如果…就 — and close with a summary — the essay spine of HSK 3 writing.',

    vocabulary: [
        { hanzi: '认 为', pinyin: 'rènwéi', en: 'to hold / consider (strong opinion)', example: { hanzi: '我 认 为 他 说 得 对 。', pinyin: 'wǒ rènwéi tā shuō de duì .', en: 'I hold that he’s right.' }, related: [{ hanzi: '看 法', pinyin: 'kànfǎ', en: 'view / opinion (noun)' }] },
        { hanzi: '不 但 … 而 且 …', pinyin: 'búdàn … érqiě …', en: 'not only … but also …', example: { hanzi: '他 不 但 会 汉 语 ， 而 且 会 日 语 。', pinyin: 'tā búdàn huì Hànyǔ , érqiě huì Rìyǔ .', en: 'He speaks not only Chinese but also Japanese.' }, related: [{ hanzi: '并 且', pinyin: 'bìngqiě', en: 'moreover (written)' }] },
        { hanzi: '虽 然 … 但 是 …', pinyin: 'suīrán … dànshì …', en: 'although … (but) …', example: { hanzi: '虽 然 贵 一 点 儿 ， 但 是 值 得 。', pinyin: 'suīrán guì yìdiǎnr , dànshì zhídé .', en: 'Though a bit pricey, it’s worth it.' }, related: [{ hanzi: '值 得', pinyin: 'zhídé', en: 'worth it' }] },
        { hanzi: '如 果 … 就 …', pinyin: 'rúguǒ … jiù …', en: 'if … then …', example: { hanzi: '如 果 下 雨 ， 我 们 就 在 家 看 电 影 。', pinyin: 'rúguǒ xià yǔ , wǒmen jiù zài jiā kàn diànyǐng .', en: 'If it rains, we’ll watch a movie at home.' }, related: [{ hanzi: '要 是', pinyin: 'yàoshi', en: 'if (spoken)' }] },
        { hanzi: '环 保', pinyin: 'huánbǎo', en: 'environmental protection', example: { hanzi: '环 保 很 重 要 。', pinyin: 'huánbǎo hěn zhòngyào .', en: 'Environmental protection matters.' }, related: [{ hanzi: '垃 圾 分 类', pinyin: 'lājī fēnlèi', en: 'trash sorting' }] },
        { hanzi: '重 要', pinyin: 'zhòngyào', en: 'important', example: { hanzi: '健 康 比 钱 重 要 。', pinyin: 'jiànkāng bǐ qián zhòngyào .', en: 'Health matters more than money.' }, related: [{ hanzi: '主 要', pinyin: 'zhǔyào', en: 'main / primary' }] },
        { hanzi: '值 得', pinyin: 'zhídé', en: 'to be worth', example: { hanzi: '这 部 电 影 值 得 看 。', pinyin: 'zhè bù diànyǐng zhídé kàn .', en: 'This movie is worth watching.' }, related: [{ hanzi: '不 值 得', pinyin: 'bù zhídé', en: 'not worth it' }] },
        { hanzi: '看 法', pinyin: 'kànfǎ', en: 'view / opinion (noun)', example: { hanzi: '你 的 看 法 呢 ？', pinyin: 'nǐ de kànfǎ ne ?', en: 'And your view?' }, related: [{ hanzi: '看 法 不 同', pinyin: 'kànfǎ bùtóng', en: 'different views' }] },
        { hanzi: '同 意', pinyin: 'tóngyì', en: 'to agree', example: { hanzi: '我 同 意 你 的 看 法 。', pinyin: 'wǒ tóngyì nǐ de kànfǎ .', en: 'I agree with your view.' }, related: [{ hanzi: '不 同 意', pinyin: 'bù tóngyì', en: 'disagree' }] },
        { hanzi: '既 然', pinyin: 'jìrán', en: 'since (it is so)', example: { hanzi: '既 然 来 了 ， 就 坐 吧 。', pinyin: 'jìrán lái le , jiù zuò ba .', en: 'Since you’re here, have a seat.' }, related: [{ hanzi: '既 然 … 就 …', pinyin: 'jìrán … jiù …', en: 'since… then…' }] },
    ],

    characters: [
        { hanzi: '认', pinyin: 'rèn', en: 'to recognize / hold', components: '讫(speech) + 忍', mnemonic: 'SPEECH + endure — a held position, spoken and kept. 认 为 = hold-as; 认 识 = recognize.' },
        { hanzi: '值', pinyin: 'zhí', en: 'to be worth', components: '亻(person) + 直(straight)', mnemonic: 'A PERSON standing STRAIGHT for it — worth it. 值 得 = worth-deserving.' },
        { hanzi: '虽', pinyin: 'suī', en: 'although (in 虽然)', components: '口 + 虫', mnemonic: 'MOUTH + insect — the little "although" bug that crawls into your sentence before the 但是.' },
        { hanzi: '同', pinyin: 'tóng', en: 'same / agree', components: '冂 + 一 + 口', mnemonic: 'ONE MOUTH inside one frame — same view. 同 意 = same-intent = agree; 同 学 = same-study.' },
        { hanzi: '既', pinyin: 'jì', en: 'since / already (既 然)', components: '旣 — a person finishing a meal', mnemonic: 'A PERSON turning away from a FINISHED meal — since that’s already so, then… 既 然 … 就 …' },
        { hanzi: '环', pinyin: 'huán', en: 'ring / (environment)', components: '王(jade) + 不', mnemonic: 'JADE ring — 环 保 = protect the environment (the ring of nature). 循环 = cycle.' },
    ],

    pronunciation: [
        { hanzi: '认 为', pinyin: 'rènwéi', toneNote: '4-2: stomp then rise — firm and climbing.', en: 'the essay verb.' },
        { hanzi: '不 但 … 而 且', pinyin: 'búdàn … érqiě', toneNote: '不 sandhi: búdàn. 而且: 2-2 rising pair.', en: 'the upgrade pair.' },
        { hanzi: '虽 然', pinyin: 'suīrán', toneNote: '1-2: plateau then rise.', en: 'although — always paired with 但 是.' },
        { hanzi: '值 得', pinyin: 'zhídé', toneNote: '2-2: two risings — worth climbing for.', en: 'worth it.' },
        { hanzi: '既 然', pinyin: 'jìrán', toneNote: '4-2: stomp-rise.', en: 'since-it-is-so.' },
        { hanzi: '同 意', pinyin: 'tóngyì', toneNote: '2-4: rise then stomp — agreement lands firmly.', en: 'agree.' },
    ],

    grammar: {
        rule: 'Opinions: 觉得 (feel) < 认为 (hold). Connectors upgrade: 不但…而且… (add), 虽然…但是… (concede), 如果…就… (condition), 既然…就… (since-then). Every opinion sentence = position + connector + reason.',
        explanation: 'HSK-3 opinion prose has a fixed spine: POSITION (我觉得/我认为…), CONNECTOR (不但…而且… adding weight; 虽然…但是… conceding; 因为…所以… explaining; 如果…就… hypothesizing), REASON, and sometimes a CLOSER (总之 in sum). 认为 is the strong verb: 我认为是这样 (I hold it to be so) — essays and debates use 认为; chats use 觉得. The connectors are FIXED PAIRS — 虽然 must meet 但是 (dropping 但是 leaves the concession hanging), 不但 pulls 而且. Note the subject placement: in 不但…而且…, a SHARED subject sits before 不但 (他不但…而且…), while different subjects put each at its clause head. 既然…就… closes the deal: 既然来了，就坐下吧 — since you came, then sit. And the summary 之 is 总之 (in sum) — the essay’s final drum.',
        examples: [
            { hanzi: '我 觉 得 网 上 购 物 很 方 便 。', pinyin: 'wǒ juéde wǎngshàng gòuwù hěn fāngbiàn .', en: 'I feel online shopping is convenient.', breakdown: ['觉得 = feel (light opinion)', '网上购物 = online shopping', '很方便 = the quality'] },
            { hanzi: '我 认 为 环 保 比 发 展 更 重 要 。', pinyin: 'wǒ rènwéi huánbǎo bǐ fāzhǎn gèng zhòngyào .', en: 'I hold that protection matters more than growth.', breakdown: ['认为 = hold (strong)', '比…更 = comparative upgrade', 'the essay opener'] },
            { hanzi: '他 不 但 会 做 饭 ， 而 且 做 得 很 好 。', pinyin: 'tā búdàn huì zuò fàn , érqiě zuò de hěn hǎo .', en: 'He not only cooks — he cooks well.', breakdown: ['不但 V1，而且 V2', 'shared subject before 不但', '得 quality after'] },
            { hanzi: '虽 然 贵 一 点 儿 ， 但 是 值 得 。', pinyin: 'suīrán guì yìdiǎnr , dànshì zhídé .', en: 'Though pricier, it’s worth it.', breakdown: ['虽然 + concession', '但是 + the turn', '一点儿 + 值得'] },
            { hanzi: '既 然 你 来 了 ， 就 一 起 吃 晚 饭 吧 。', pinyin: 'jìrán nǐ lái le , jiù yìqǐ chī wǎnfàn ba .', en: 'Since you’re here, stay for dinner.', breakdown: ['既然…就…', '了 confirms the fact', '吧 softens the conclusion'] },
            { hanzi: '总 之 ， 学 习 汉 语 要 天 天 练 习 。', pinyin: 'zǒngzhī , xuéxí Hànyǔ yào tiāntiān liànxí .', en: 'In sum: learning Chinese takes daily practice.', breakdown: ['总之 = in sum', '要 + verb phrase', '天天练习 reduplicated'] },
        ],
        commonMistakes: [
            '虽然 without 但是: 虽然贵一点儿，我很喜欢 — the concession dangles. 虽然 pulls 但是 (spoken) / 可是: 虽然贵一点儿，但是我很喜欢.',
            '不但…而且 with swapped subjects: 不但他会汉语，而且我会日语 — grammatical but changes the subject mid-pair; shared subject goes FIRST: 他不但…而且….',
            '认为 with feel-adjectives alone: 我认为很好 is weak — 认为 carries a CLAUSE with a reason: 我认为这样更好，因为….',
            '如果…就 with a question: 如果下雨吗？ — WRONG. 如果 is a statement-frame: 如果下雨，我们就不去了 (no 吗).',
        ],
    },

    patterns: [
        { type: 'Feel opinion', hanzi: '我 觉 得 …', pinyin: 'wǒ juéde …', en: 'light personal view' },
        { type: 'Held position', hanzi: '我 认 为 …', pinyin: 'wǒ rènwéi …', en: 'considered view (essays)' },
        { type: 'Add weight', hanzi: '不 但 … 而 且 …', pinyin: 'búdàn … érqiě …', en: 'not only but also' },
        { type: 'Concede', hanzi: '虽 然 … 但 是 …', pinyin: 'suīrán … dànshì …', en: 'although…but' },
        { type: 'Hypothesize', hanzi: '如 果 … 就 …', pinyin: 'rúguǒ … jiù …', en: 'if…then' },
        { type: 'Since-then', hanzi: '既 然 … 就 …', pinyin: 'jìrán … jiù …', en: 'since it’s so, then…' },
        { type: 'In sum', hanzi: '总 之 ， …', pinyin: 'zǒngzhī , …', en: 'the essay closer' },
    ],

    sentenceBuilding: [
        { hanzi: '我 觉 得 环 保 很 重 要 。', pinyin: 'wǒ juéde huánbǎo hěn zhòngyào .', en: 'I feel environmental protection matters.' },
        { hanzi: '我 认 为 环 保 很 重 要 ， 因 为 我 们 只 有 一 个 地 球 。', pinyin: 'wǒ rènwéi huánbǎo hěn zhòngyào , yīnwèi wǒmen zhǐ yǒu yí ge dìqiú .', en: 'I hold that it matters — we only have one Earth.' },
        { hanzi: '环 保 不 但 省 钱 ， 而 且 对 健 康 好 。', pinyin: 'huánbǎo búdàn shěng qián , érqiě duì jiànkāng hǎo .', en: 'Going green not only saves money — it’s good for health.' },
        { hanzi: '虽 然 垃 圾 分 类 有 点 儿 麻 烦 ， 但 是 值 得 做 。', pinyin: 'suīrán lājī fēnlèi yǒudiǎnr máfan , dànshì zhídé zuò .', en: 'Though sorting trash is a bit of a hassle, it’s worth doing.' },
        { hanzi: '总 之 ， 如 果 每 个 人 都 出 一 分 力 ， 城 市 就 会 越 来 越 干 净 。', pinyin: 'zǒngzhī , rúguǒ měi ge rén dōu chū yì fēn lì , chéngshì jiù huì yuèláiyuè gānjìng .', en: 'In sum: if everyone does their bit, the city keeps getting cleaner.' },
    ],

    practice: [
        { instruction: 'Feel or hold?', question: '我 ___ 他 说 得 对 。 (essay register)', answer: '认 为 — considered position' },
        { instruction: 'Complete the pair:', question: '虽 然 贵 一 点 儿 ， ___ 值 得 。', answer: '但 是 — 虽然…但是…' },
        { instruction: 'Complete the pair:', question: '他 不 但 会 汉 语 ， ___ 会 日 语 。', answer: '而 且 — not only but also' },
        { instruction: 'Hypothesis:', question: '___ 下 雨 ， 我 们 就 不 去 了 。', answer: '如 果 — 如果…就…' },
        { instruction: 'Since-then:', question: '___ 你 来 了 ， 就 坐 吧 。', answer: '既 然 — 既然…就…' },
        { instruction: 'The closer:', question: '___ ， 学 汉 语 要 天 天 练 习 。', answer: '总 之 — in sum' },
    ],

    translationPractice: [
        { en: 'I feel online shopping is convenient.', hanzi: '我 觉 得 网 上 购 物 很 方 便 。', pinyin: 'wǒ juéde wǎngshàng gòuwù hěn fāngbiàn .' },
        { en: 'I hold that he is right.', hanzi: '我 认 为 他 说 得 对 。', pinyin: 'wǒ rènwéi tā shuō de duì .' },
        { en: 'He not only cooks — he cooks well.', hanzi: '他 不 但 会 做 饭 ， 而 且 做 得 很 好 。', pinyin: 'tā búdàn huì zuò fàn , érqiě zuò de hěn hǎo .' },
        { en: 'Though it’s a bit pricey, it’s worth it.', hanzi: '虽 然 贵 一 点 儿 ， 但 是 值 得 。', pinyin: 'suīrán guì yìdiǎnr , dànshì zhídé .' },
        { en: 'Since you’re here, stay for dinner.', hanzi: '既 然 你 来 了 ， 就 一 起 吃 晚 饭 吧 。', pinyin: 'jìrán nǐ lái le , jiù yìqǐ chī wǎnfàn ba .' },
        { en: 'In sum: practice every day.', hanzi: '总 之 ， 要 天 天 练 习 。', pinyin: 'zǒngzhī , yào tiāntiān liànxí .' },
    ],

    reverseTranslation: [
        { hanzi: '我 认 为 这 个 主 意 不 错 。', pinyin: 'wǒ rènwéi zhè ge zhǔyì búcuò .', en: 'I think this idea is not bad.' },
        { hanzi: '她 不 但 聪 明 ， 而 且 很 努 力 。', pinyin: 'tā búdàn cōngming , érqiě hěn nǔlì .', en: 'She’s not only smart but hardworking.' },
        { hanzi: '如 果 你 去 ， 我 也 去 。', pinyin: 'rúguǒ nǐ qù , wǒ yě qù .', en: 'If you go, I’ll go too.' },
        { hanzi: '虽 然 房 子 小 一 点 儿 ， 但 是 很 温 馨 。', pinyin: 'suīrán fángzi xiǎo yìdiǎnr , dànshì hěn wēnxīn .', en: 'Though the place is small, it’s cozy.' },
    ],

    register: {
        casual: '我 觉 得 吧 ， 还 行 。 — 觉得吧 = the hedging opener of chats.',
        polite: '我 个 人 的 看 法 是 …… — 我个人的看法 = my personal view (softening ownership).',
        formal: '综 上 所 述 ， …… — the formal 总之 of essays (综述 register).',
    },

    culture: 'Chinese opinion culture prizes the BALANCED turn: state the other side first (虽然…), then your view (但是…) — direct disagreement without concession reads as immature. The essay formula 总分总 (general-specific-general) runs from primary school: opening claim, reasons with 不但/而且, closing 总之. And internet opinion language has its own flavors: 我觉得OK, 没毛病 (no flaw = I agree), 双击666 — but the exam wants the classic spine: 我认为…，因为…，所以….',

    freeProduction: 'Record a mini-essay (10–12 lines) on one of: 网上购物 / 垃圾分类 / 学汉语: state your position with 我认为, add weight with 不但…而且, concede with 虽然…但是, hypothesize with 如果…就, explain once with 因为…所以, and close 总之. Every connector at least once — the connectors ARE the grade.',

    miniTest: [
        { question: 'The strong opinion verb (essays):', options: ['觉 得', '认 为', '想', '知 道'], answer: '认 为 — considered position' },
        { question: '虽然 must pair with:', options: ['而 且', '但 是', '因 为', '如 果'], answer: '但 是 — the concession pair' },
        { question: 'Not only…but also:', options: ['虽 然…但 是', '不 但…而 且', '因 为…所 以', '如 果…就'], answer: '不 但…而 且' },
        { question: '既 然…就… means:', options: ['although', 'since (it is so), then', 'if', 'because'], answer: 'since (it is so), then — 既 然 你 来 了 ， 就 坐 吧' },
        { question: 'The essay closer is:', options: ['总 之', '但 是', '不 但', '虽 然'], answer: '总 之 — in sum' },
    ],

    review: [
        'The B2 argumentation lecture (French equivalent) used ORECC — the Chinese spine is the same: position, connectors, concession, summary.',
        'HSK-3 is now complete — 7 lectures. Next level: HSK-4 (是…的, the three de’s, connectors, focus, conditionals, work topics, complements, China life).',
    ],

    traps: [
        '虽 然 always pairs with 但 是 — the dangling concession is the #1 HSK-3 writing error.',
        '不 但 … 而 且 shares the subject: 他不但…而且… — subject before 不 但.',
        '认为 carries a clause + reason; 认为 + bare adjective is weak essay style.',
        '如果…就 is a statement frame — no 吗 inside: 如果下雨，我们就不去。',
    ],

    homework: {
        intro: 'The essay spine: positions, paired connectors, and the 总之 closer.',
        translation: [
            { prompt: 'I hold that he is right.', answer: '我 认 为 他 说 得 对 。', alt: ['我认为他说得对。'], explanation: '认为 + clause; 说得对 uses the 得-degree complement (HSK 4 preview).' },
            { prompt: 'He not only cooks — he cooks well.', answer: '他 不 但 会 做 饭 ， 而 且 做 得 很 好 。', alt: ['他不但会做饭，而且做得很好。'], explanation: '不 但…而 且 with shared subject; 得-quality inside.' },
            { prompt: 'Though it’s a bit pricey, it’s worth it.', answer: '虽 然 贵 一 点 儿 ， 但 是 值 得 。', alt: ['虽然贵一点儿，但是值得。'], explanation: '虽 然…但 是 pair + 一点儿 + 值得.' },
            { prompt: 'If it rains, we’ll watch a movie at home.', answer: '如 果 下 雨 ， 我 们 就 在 家 看 电 影 。', alt: ['如果下雨，我们就在家看电影。'], explanation: '如 果…就… statement frame — no 吗.' },
            { prompt: 'Since you’re here, stay for dinner.', answer: '既 然 你 来 了 ， 就 一 起 吃 晚 饭 吧 。', alt: ['既然你来了，就一起吃晚饭吧。'], explanation: '既 然…就… + 吧 conclusion.' },
            { prompt: 'In sum: practice every day.', answer: '总 之 ， 要 天 天 练 习 。', alt: ['总之，要天天练习。'], explanation: '总 之 closer + 天 天 reduplication.' },
        ],
        blanks: [
            { prompt: '我 ___ 他 说 得 对 。 (hold — essay)', answer: '认 为', explanation: '认为 = the strong opinion verb.' },
            { prompt: '虽 然 贵 一 点 儿 ， ___ 值 得 。', answer: '但 是', explanation: '虽 然…但 是 pair.' },
            { prompt: '他 不 但 会 汉 语 ， ___ 会 日 语 。', answer: '而 且', explanation: '不 但 … 而 且 — not only Chinese but also Japanese.' },
            { prompt: '___ 下 雨 ， 我 们 就 不 去 了 。', answer: '如 果', explanation: '如 果…就… hypothesis.' },
            { prompt: '既 然 你 来 了 ， ___ 一 起 吃 饭 吧 。', answer: '就', explanation: '既 然…就… the since-then.' },
            { prompt: '___ ， 学 汉 语 要 天 天 练 习 。 (in sum)', answer: '总 之', explanation: '总 之 = the essay closer.' },
        ],
        corrections: [
            { prompt: '虽 然 贵 一 点 儿 ， 我 很 喜 欢 。', answer: '虽 然 贵 一 点 儿 ， 但 是 我 很 喜 欢 。', explanation: 'How the mistake happens: dropping the 但 是. Why it does not work: 虽然 must meet its pair. How to fix it: add 但 是.' },
            { prompt: '不 但 他 会 汉 语 ， 而 且 他 会 日 语 。 (same subject)', answer: '他 不 但 会 汉 语 ， 而 且 会 日 语 。', explanation: 'How the mistake happens: subject inside both clauses. Why it does not work: with a SHARED subject, put it before 不 但. How to fix it: subject-first.' },
            { prompt: '我 认 为 好 。', answer: '我 认 为 这 样 更 好 。 (or 我 觉 得 不 错 。)', explanation: 'How the mistake happens: 认为 + bare adjective. Why it does not work: 认为 carries a considered CLAUSE. How to fix it: add the what-and-why.' },
            { prompt: '如 果 下 雨 吗 ？', answer: '如 果 下 雨 ， 我 们 就 不 去 。', explanation: 'How the mistake happens: 吗 on a condition frame. Why it does not work: 如 果…就… is a statement pair — questions come from its clauses. How to fix it: full frame.' },
            { prompt: '总 之 我 觉 得 吧 差 不 多 。', answer: '总 之 ， 我 觉 得 还 可 以 。', explanation: 'How the mistake happens: hedging-pileup. Why it does not work: one closer + one hedge is enough. How to fix it: 总之 + clean clause.' },
        ],
        writing: {
            task: 'Write a mini-essay (12–16 lines) on 网上购物 or 垃圾分类: 我认为 position → 不 但…而 且 add → 虽 然…但 是 concede → 如 果…就 hypothesize → 因 为…所 以 explain → 总 之 close. Every paired connector complete; one 觉 得 for the light personal note.',
            requirements: [
                '认 为 position + reason',
                '不 但…而 且 (shared subject before 不 但)',
                '虽 然…但 是 (complete pair)',
                '如 果…就 and 既 然…就 (one each)',
                '总 之 closer',
            ],
            minWords: 70,
        },
        checklist: [
            'I ladder opinions: 觉 得 (feel) → 认 为 (hold)',
            'I complete every connector pair: 不 但…而 且 · 虽 然…但 是 · 如 果…就 · 既 然…就',
            'I place shared subjects before 不 但',
            'I close essays with 总 之',
            'I answer 看 法 questions with a position + 因为 reason',
            'I keep 如 果 frames statement-shaped (no 吗)',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The opinion ladder: 觉 得 (personal feel) → 看 法 (one’s view, noun) → 认 为 (held position, essays) → 主 张 (advocate, HSK 5 preview).',
            examples: [
                { hanzi: '我 觉 得 不 错 。 · 我 的 看 法 是 …… · 我 认 为 ……', pinyin: 'wǒ juéde búcuò · wǒ de kànfǎ shì …… · wǒ rènwéi ……', en: 'I feel it’s decent · my view is… · I hold that…' },
            ],
        },
        {
            explanation: 'The add-pair: 不 但 A ， 而 且 B — shared subject before 不 但; different subjects may repeat at each clause head.',
            examples: [
                { hanzi: '她 不 但 聪 明 ， 而 且 努 力 。', pinyin: 'tā búdàn cōngming , érqiě nǔlì .', en: 'She’s not only smart but hardworking.' },
            ],
        },
        {
            explanation: 'The concede-pair: 虽 然 A ， 但 是 B — the B clause carries your real position. 可 是 is the spoken 但 是.',
            examples: [
                { hanzi: '虽 然 小 ， 但 是 温 馨 。', pinyin: 'suīrán xiǎo , dànshì wēnxīn .', en: 'Small, but cozy.' },
            ],
        },
        {
            explanation: 'The condition pair: 如 果/要 是 A ， 就 B — 就 lands the consequence. Spoken: 要 是 (casual).',
            examples: [
                { hanzi: '要 是 下 雨 ， 我 们 就 改 天 。', pinyin: 'yàoshi xià yǔ , wǒmen jiù gǎitiān .', en: 'If it rains, we’ll reschedule.' },
            ],
        },
        {
            explanation: 'The since-pair: 既 然 A (了) ， 就 B — the fact acknowledged, the conclusion follows.',
            examples: [
                { hanzi: '既 然 来 了 ， 就 多 坐 会 儿 。', pinyin: 'jìrán lái le , jiù duō zuò huìr .', en: 'Since you’re here, stay a while.' },
            ],
        },
        {
            explanation: 'The closer shelf: 总 之 (in sum) · 综 上 所 述 (formal) · 一 句 话 (in one line). One closer, one sentence, one position.',
            examples: [
                { hanzi: '总 之 ， 我 支 持 这 个 计 划 。', pinyin: 'zǒngzhī , wǒ zhīchí zhè ge jìhuà .', en: 'In sum: I support this plan.' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '认为': { en: 'to hold / consider', pron: 'rènwéi', tone: '4-2', note: 'The essay opinion verb: 我认为…' },
        '看法': { en: 'view / opinion', pron: 'kànfǎ', tone: '4-3', note: '你 的 看 法 呢？ — the noun of opinions.' },
        '同意': { en: 'to agree', pron: 'tóngyì', tone: '2-4', note: '同 意 你 的 看 法.' },
        '不但…而且…': { en: 'not only… but also…', pron: 'búdàn … érqiě …', tone: '2-4…2-3', note: 'Shared subject before 不 但.' },
        '虽然…但是…': { en: 'although… but…', pron: 'suīrán … dànshì …', tone: '1-2…4-4', note: 'The concession pair — complete it.' },
        '如果…就…': { en: 'if… then…', pron: 'rúguǒ … jiù …', tone: '2-3…4', note: 'Statement frame — no 吗.' },
        '既然…就…': { en: 'since… then…', pron: 'jìrán … jiù …', tone: '4-2…4', note: '既 然 来 了 ， 就 坐 吧.' },
        '值得': { en: 'to be worth', pron: 'zhídé', tone: '2-2', note: '值得看/值得做 — worth doing.' },
        '环保': { en: 'environmental protection', pron: 'huánbǎo', tone: '2-3', note: 'The essay topic of the decade.' },
        '重要': { en: 'important', pron: 'zhòngyào', tone: '4-4', note: '很 重 要 — two stomps.' },
        '总之': { en: 'in sum', pron: 'zǒngzhī', tone: '3-1', note: 'The essay closer.' },
        '主意': { en: 'idea / plan', pron: 'zhǔyì', tone: '3-4', note: '好 主 意！ = great idea!' },
    },
};

export const CHINESE_B1_PART2: Record<string, StaticChineseLesson> = {
    '3:serial-verbs': h3Serial,
    '3:measure': h3Measure,
    '3:location': h3Location,
    '3:opinions': h3Opinions,
};

export const CHINESE_B1_PART2_EXTRAS: Record<string, { warmup?: WarmupItem[]; verbTables?: VerbTableBlock[]; useCases?: UseCaseBlock[]; shadowing?: ShadowingBlock }> = {
    '3:serial-verbs': {
        warmup: [
            { q: 'The three aspect markers?', a: '了 completed · 过 experience · 着 state (+ 在/正在 for action).' },
            { q: 'Where does 没 go with 被?', a: 'BEFORE 被: 手机没被偷.' },
            { q: '手机被偷了 — who stole it?', a: 'Unknown — the agent is optional after 被.' },
            { q: 'The notional passive?', a: 'No marker: 饭吃完了，问题解决了.' },
            { q: '睡着 (zháo) means?', a: 'Fell asleep — achieved; 在睡觉 = is sleeping.' },
        ],
        verbTables: [
            {
                title: 'The coverb shelf',
                rows: [
                    { label: 'to/for (person)', form: '给 你 打 电 话', pron: 'gěi nǐ dǎ diànhuà' },
                    { label: 'with (person)', form: '跟 朋 友 去', pron: 'gēn péngyou qù' },
                    { label: 'toward', form: '对 我 笑', pron: 'duì wǒ xiào' },
                    { label: 'tool', form: '用 手 机 付', pron: 'yòng shǒujī fù' },
                    { label: 'help', form: '帮 我 学', pron: 'bāng wǒ xué' },
                    { label: 'instead of', form: '替 我 问', pron: 'tì wǒ wèn' },
                ],
            },
            {
                title: 'The chain orders',
                rows: [
                    { label: 'purpose', form: '去 + place + V2', pron: 'qù shūdiàn mǎi shū' },
                    { label: 'simultaneous', form: '一 边 V1 一 边 V2', pron: 'yìbiān … yìbiān …' },
                    { label: 'sequence', form: '先 V1 ， 再 V2', pron: 'xiān … zài …' },
                    { label: '了 lands last', form: '去 超 市 买 了 水 果', pron: 'qù chāoshì mǎi le shuǐguǒ' },
                ],
            },
        ],
        useCases: [
            {
                word: '给 — four faces',
                uses: [
                    { use: 'coverb (to/for)', examples: [{ fr: '给 你 打 电 话 。', en: 'Call you.' }] },
                    { use: 'give (main verb)', examples: [{ fr: '给 我 一 杯 水 。', en: 'Give me a water.' }] },
                    { use: '被\u2019s colloquial twin', examples: [{ fr: '杯 子 给 他 打 破 了 。', en: 'The cup got broken by him (spoken).' }] },
                    { use: '让/叫 also work', examples: [{ fr: '让 他 拿 走 了 。', en: 'Let/taken away by him.' }] },
                ],
            },
            {
                word: '跟 vs 对 vs 和',
                uses: [
                    { use: '跟 — accompany/with person', examples: [{ fr: '跟 朋 友 去 。', en: 'Go with a friend.' }] },
                    { use: '对 — toward (direction of action)', examples: [{ fr: '对 他 说 。', en: 'Say TO him.' }] },
                    { use: '和 — and (nouns only)', examples: [{ fr: '爸 爸 和 妈 妈', en: 'dad and mom' }] },
                    { use: 'the exam swap', examples: [{ fr: '对 不 起 (toward-you apology) · 跟 我 来 (follow me)', en: 'fixed pairs to memorize' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Chain rhythm: coverb sets up, main verb lands. Read each line as one breath.',
            lines: [
                { fr: '我 给 你 打 电 话 。', pron: 'wǒ gěi nǐ dǎ diànhuà .', en: 'I\u2019ll give you a call.' },
                { fr: '我 跟 朋 友 一 起 去 。', pron: 'wǒ gēn péngyou yìqǐ qù .', en: 'I\u2019ll go together with a friend.' },
                { fr: '用 手 机 付 钱 就 行 。', pron: 'yòng shǒujī fù qián jiù xíng .', en: 'Just pay by phone.' },
                { fr: '一 边 走 一 边 聊 。', pron: 'yìbiān zǒu yìbiān liáo .', en: 'Walk and chat.' },
                { fr: '先 买 票 ， 再 上 车 。', pron: 'xiān mǎi piào , zài shàng chē .', en: 'Ticket first, then board.' },
                { fr: '替 我 问 你 妈 妈 好 。', pron: 'tì wǒ wèn nǐ māma hǎo .', en: 'Say hi to your mom for me.' },
            ],
        },
    },
    '3:measure': {
        warmup: [
            { q: 'The three question forms?', a: '+吗 · A-not-A · question word in place.' },
            { q: '把 demands…?', a: 'A specific object + verb + result.' },
            { q: '没/别/都 sit where with 把?', a: 'BEFORE 把.' },
            { q: 'The colloquial passive?', a: '叫/让/给 — 杯子叫他打破了.' },
            { q: '饭吃完了 is…?', a: 'A notional passive — no 被 needed.' },
        ],
        verbTables: [
            {
                title: 'The shape shelf (full HSK-3 set)',
                rows: [
                    { label: 'animals/single', form: '一 只 猫 · 一 只 手', pron: 'yì zhī māo · yì zhī shǒu' },
                    { label: 'long things', form: '一 条 河 · 一 条 狗 · 一 条 新 闻', pron: 'yì tiáo hé · gǒu · xīnwén' },
                    { label: 'flat things', form: '一 张 票 · 一 张 照 片', pron: 'yì zhāng piào · zhàopiàn' },
                    { label: 'vehicles', form: '一 辆 车', pron: 'yí liàng chē' },
                    { label: 'handled', form: '一 把 刀 · 一 把 伞', pron: 'yì bǎ dāo · sǎn' },
                    { label: 'pairs', form: '一 双 鞋 · 一 双 手', pron: 'yì shuāng xié · shǒu' },
                ],
            },
            {
                title: 'The action counters',
                rows: [
                    { label: 'occurrences', form: '去 过 三 次', pron: 'qù guo sān cì' },
                    { label: 'pass-throughs', form: '读 一 遍', pron: 'dú yí biàn' },
                    { label: 'quick taps', form: '敲 了 两 下', pron: 'qiāo le liǎng xià' },
                    { label: 'meals', form: '一 顿 饭', pron: 'yí dùn fàn' },
                ],
            },
        ],
        useCases: [
            {
                word: '个 — the safe default (and its limits)',
                uses: [
                    { use: 'works for most things', examples: [{ fr: '一 个 人 · 一 个 问 题 · 一 个 手 机', en: 'a person · a question · a phone' }] },
                    { use: 'sounds foreign for animals', examples: [{ fr: '✗ 一 个 猫 → ✓ 一 只 猫', en: 'cats ride 只' }] },
                    { use: 'sounds foreign for long things', examples: [{ fr: '✗ 一 个 河 → ✓ 一 条 河', en: 'rivers ride 条' }] },
                    { use: 'reduplicates', examples: [{ fr: '个 个 都 会 。', en: 'Every single one can.' }] },
                ],
            },
            {
                word: '只 vs 双 — the pair split',
                uses: [
                    { use: 'one of a pair (只)', examples: [{ fr: '一 只 手 · 一 只 鞋', en: 'ONE hand · ONE shoe' }] },
                    { use: 'the pair (双)', examples: [{ fr: '一 双 手 · 一 双 鞋', en: 'a pair of hands · a pair of shoes' }] },
                    { use: 'animals are 只', examples: [{ fr: '一 只 狗 · 两 只 猫', en: 'a dog · two cats' }] },
                    { use: 'the exam trick', examples: [{ fr: '一 只 鞋 in the lost-property box', en: 'one shoe = 只; the pair = 双' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Measure rhythm: number taps once, measure taps once, noun lands. Read each line counting on your fingers.',
            lines: [
                { fr: '一 只 猫 ， 两 条 狗 ， 三 条 鱼 。', pron: 'yì zhī māo , liǎng tiáo gǒu , sān tiáo yú .', en: 'One cat, two dogs, three fish.' },
                { fr: '请 给 我 两 张 票 。', pron: 'qǐng gěi wǒ liǎng zhāng piào .', en: 'Two tickets, please.' },
                { fr: '我 买 了 三 本 书 。', pron: 'wǒ mǎi le sān běn shū .', en: 'I bought three books.' },
                { fr: '一 群 孩 子 在 公 园 里 。', pron: 'yì qún háizi zài gōngyuán lǐ .', en: 'A crowd of kids in the park.' },
                { fr: '学 生 们 个 个 都 很 努 力 。', pron: 'xuéshengmen gè ge dōu hěn nǔlì .', en: 'Every single student works hard.' },
                { fr: '请 再 读 一 遍 。', pron: 'qǐng zài dú yí biàn .', en: 'Please read it once more.' },
            ],
        },
    },
    '3:location': {
        warmup: [
            { q: 'Name four shape measures.', a: '只 animals · 条 long · 张 flat · 辆 vehicles (+ 把 handled, 双 pairs).' },
            { q: '一双手 vs 一只手?', a: '双 = the pair; 只 = one of the pair.' },
            { q: 'The action counters?', a: '次 occurrences · 遍 pass-throughs · 下 taps.' },
            { q: '个个都很努力 means?', a: 'Every single one works hard (reduplication + 都).' },
            { q: '三书 — what\u2019s missing?', a: 'The measure: 三本书 — number never touches noun.' },
        ],
        verbTables: [
            {
                title: 'The suffix shelf',
                rows: [
                    { label: 'on', form: '桌 子 上', pron: 'zhuōzi shàng' },
                    { label: 'in', form: '房 间 里', pron: 'fángjiān lǐ' },
                    { label: 'front', form: '学 校 前 面', pron: 'xuéxiào qiánmiàn' },
                    { label: 'beside', form: '车 站 旁 边', pron: 'chēzhàn pángbiān' },
                    { label: 'across', form: '银 行 对 面', pron: 'yínháng duìmiàn' },
                    { label: 'nearby', form: '附 近', pron: 'fùjìn' },
                ],
            },
            {
                title: 'The existence trio',
                rows: [
                    { label: 'introduce new', form: '前 面 有 一 个 银 行 。', pron: 'qiánmiàn yǒu …' },
                    { label: 'identify known', form: '对 面 是 邮 局 。', pron: 'duìmiàn shì yóujú .' },
                    { label: 'locate known', form: '书 在 桌 子 上 。', pron: 'shū zài zhuōzi shàng .' },
                    { label: 'negate existence', form: '附 近 没 有 地 铁 站 。', pron: 'fùjìn méiyǒu dìtiězhàn .' },
                ],
            },
        ],
        useCases: [
            {
                word: '在 — three jobs recap',
                uses: [
                    { use: 'locate known', examples: [{ fr: '书 在 桌 子 上 。', en: 'The book is on the desk.' }] },
                    { use: 'progress (在 + verb)', examples: [{ fr: '他 在 睡 觉 。', en: 'He\u2019s sleeping.' }] },
                    { use: 'live/ be at', examples: [{ fr: '我 在 北 京 工作 。', en: 'I work in Beijing.' }] },
                    { use: 'never introduces new things', examples: [{ fr: '✗ 桌 上 在 有 书', en: 'new things take 有' }] },
                ],
            },
            {
                word: '越来越 — and its cousins',
                uses: [
                    { use: 'change over time', examples: [{ fr: '越 来 越 贵 。', en: 'Pricier and pricier.' }] },
                    { use: 'double chain', examples: [{ fr: '越 说 越 高 兴 。', en: 'The more we talk, the happier.' }] },
                    { use: 'vs 越来越多的人', examples: [{ fr: '越 来 越 多 的 人 学 汉 语 。', en: 'More and more people study Chinese.' }] },
                    { use: 'no 了 needed', examples: [{ fr: '✗ 越 来 越 贵 了 很 多', en: 'the frame carries the change' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Location rhythm: noun first, direction riding after. Read each line while pointing at an imaginary map.',
            lines: [
                { fr: '桌 子 上 有 一 本 书 。', pron: 'zhuōzi shàng yǒu yì běn shū .', en: 'On the desk there\u2019s a book.' },
                { fr: '学 校 前 面 有 一 家 银 行 。', pron: 'xuéxiào qiánmiàn yǒu yì jiā yínháng .', en: 'In front of the school there\u2019s a bank.' },
                { fr: '银 行 对 面 是 一 家 咖 啡 馆 。', pron: 'yínháng duìmiàn shì yì jiā kāfēiguǎn .', en: 'Across from the bank is a café.' },
                { fr: '我 家 离 学 校 很 近 。', pron: 'wǒ jiā lí xuéxiào hěn jìn .', en: 'My home is close to school.' },
                { fr: '往 前 走 ， 然 后 往 左 拐 。', pron: 'wǎng qián zǒu , ránhòu wǎng zuǒ guǎi .', en: 'Straight ahead, then turn left.' },
                { fr: '这 个 城 市 越 来 越 漂 亮 。', pron: 'zhè ge chéngshì yuèláiyuè piàoliang .', en: 'The city keeps getting prettier.' },
            ],
        },
    },
    '3:opinions': {
        warmup: [
            { q: 'The suffix shelf — name four.', a: '上面 · 里面 · 前面 · 旁边 (+对面/附近) — attached AFTER the noun.' },
            { q: '有 vs 是 for places?', a: '有 introduces new; 是 identifies known: 前面有一个银行 vs 对面是邮局.' },
            { q: 'The distance frame?', a: 'A 离 B 近/远 — 我家离学校很近.' },
            { q: 'The direction script?', a: '往前走，到…往左拐.' },
            { q: '越来越 + adjective means?', a: 'More and more — change over time, no 了.' },
        ],
        verbTables: [
            {
                title: 'The opinion verbs',
                rows: [
                    { label: 'feel (light)', form: '我 觉 得 很 好 。', pron: 'wǒ juéde hěn hǎo .' },
                    { label: 'consider (strong)', form: '我 认 为 …', pron: 'wǒ rènwéi …' },
                    { label: 'agree', form: '我 同 意 你 的 看 法 。', pron: 'wǒ tóngyì nǐ de kànfǎ .' },
                    { label: 'disagree softly', form: '我 不 太 同 意 。', pron: 'wǒ bú tài tóngyì .' },
                ],
            },
            {
                title: 'The connector upgrades (HSK 3 set)',
                rows: [
                    { label: 'not only…but also', form: '不 但 … 而 且 …', pron: 'búdàn … érqiě …' },
                    { label: 'although…but', form: '虽 然 … 但 是 …', pron: 'suīrán … dànshì …' },
                    { label: 'because…so', form: '因 为 … 所 以 …', pron: 'yīnwèi … suǒyǐ …' },
                    { label: 'if…then', form: '如 果 … 就 …', pron: 'rúguǒ … jiù …' },
                ],
            },
        ],
        useCases: [
            {
                word: '觉得 vs 认为 — feel vs hold',
                uses: [
                    { use: '觉得 — personal feel', examples: [{ fr: '我 觉 得 这 部 电 影 不 错 。', en: 'I feel this movie is decent.' }] },
                    { use: '认为 — considered position', examples: [{ fr: '我 认 为 他 说 得 对 。', en: 'I hold that he\u2019s right.' }] },
                    { use: '看 法 — the view (noun)', examples: [{ fr: '你 的 看 法 是 什 么 ？', en: 'What\u2019s your view?' }] },
                    { use: 'register shift', examples: [{ fr: 'essays: 认为 · chats: 觉得', en: 'the exam wants both' }] },
                ],
            },
            {
                word: '不但…而且… — the upgrade pair',
                uses: [
                    { use: 'not only…but also', examples: [{ fr: '他 不 但 会 汉 语 ， 而 且 会 日 语 。', en: 'He speaks not only Chinese but also Japanese.' }] },
                    { use: 'subject shared', examples: [{ fr: '她 不 但 漂 亮 ， 而 且 聪 明 。', en: 'She\u2019s not just pretty but smart.' }] },
                    { use: '而且 alone works', examples: [{ fr: '很 好 吃 ， 而 且 便 宜 。', en: 'Tasty — and cheap too.' }] },
                    { use: 'vs 并且', examples: [{ fr: '并 且 = formal 而且', en: 'written register' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Opinion rhythm: position first, connector second, reason lands last. Read each line as a mini-essay sentence.',
            lines: [
                { fr: '我 觉 得 网 上 购 物 很 方 便 。', pron: 'wǒ juéde wǎngshàng gòuwù hěn fāngbiàn .', en: 'I think online shopping is convenient.' },
                { fr: '我 认 为 环 保 很 重 要 。', pron: 'wǒ rènwéi huánbǎo hěn zhòngyào .', en: 'I hold that environmental protection matters.' },
                { fr: '他 不 但 会 做 饭 ， 而 且 做 得 很 好 。', pron: 'tā búdàn huì zuò fàn , érqiě zuò de hěn hǎo .', en: 'He not only cooks — he cooks well.' },
                { fr: '虽 然 贵 一 点 儿 ， 但 是 值 得 。', pron: 'suīrán guì yìdiǎnr , dànshì zhídé .', en: 'Though pricier, it\u2019s worth it.' },
                { fr: '因 为 交 通 方 便 ， 所 以 我 喜 欢 这 个 区 。', pron: 'yīnwèi jiāotōng fāngbiàn , suǒyǐ wǒ xǐhuan zhè ge qū .', en: 'Because transit\u2019s easy, I like this district.' },
                { fr: '你 的 看 法 呢 ？', pron: 'nǐ de kànfǎ ne ?', en: 'And your view?' },
            ],
        },
    },
};
