// Chinese HSK-2 lectures part 1 — Time & Routines (了), Movement & Transport,
// Shopping & Money. Same gold-standard format; ALL text pre-segmented.

import type { HskLesson } from './hskService';
import { BASE_GLOSSARY, type ChineseGlossEntry } from './chineseLessonBase';
import type { WarmupItem, VerbTableBlock, UseCaseBlock, ShadowingBlock } from './frenchLessons';
import type { StaticChineseLesson } from './chineseLessons';

// ── HSK 2 · Time, Days & Routines (了) ──────────────────────────────────────
const h2Time: StaticChineseLesson = {
    title: 'Time, Days & Routines',
    objective: 'Place time expressions BEFORE the verb (我明天去 — never after), mark completed actions with 了 (我吃了), build daily routines with 每天/有时候/常常, and keep 了 out of habits — the tense-by-word-order system that replaces all conjugation.',

    vocabulary: [
        { hanzi: '了', pinyin: 'le', en: 'completion marker (it happened)', example: { hanzi: '我 吃 了 早 饭 。', pinyin: 'wǒ chī le zǎofàn .', en: 'I ate breakfast (done).' }, related: [{ hanzi: '没 有', pinyin: 'méiyǒu', en: 'negates 了-actions' }] },
        { hanzi: '每 天', pinyin: 'měitiān', en: 'every day', example: { hanzi: '我 每 天 七 点 起 床 。', pinyin: 'wǒ měitiān qī diǎn qǐchuáng .', en: 'I get up at seven every day.' }, related: [{ hanzi: '每 周', pinyin: 'měi zhōu', en: 'every week' }] },
        { hanzi: '有 时 候', pinyin: 'yǒushíhou', en: 'sometimes', example: { hanzi: '我 有 时 候 喝 咖 啡 。', pinyin: 'wǒ yǒushíhou hē kāfēi .', en: 'Sometimes I drink coffee.' }, related: [{ hanzi: '常 常', pinyin: 'chángcháng', en: 'often' }] },
        { hanzi: '上 午', pinyin: 'shàngwǔ', en: 'morning (before noon)', example: { hanzi: '上 午 我 上 课 。', pinyin: 'shàngwǔ wǒ shàng kè .', en: 'In the morning I have class.' }, related: [{ hanzi: '下 午', pinyin: 'xiàwǔ', en: 'afternoon' }] },
        { hanzi: '下 午', pinyin: 'xiàwǔ', en: 'afternoon', example: { hanzi: '下 午 三 点 我 去 饭 馆 。', pinyin: 'xiàwǔ sān diǎn wǒ qù fànguǎn .', en: 'At three I go to the restaurant.' }, related: [{ hanzi: '晚 上', pinyin: 'wǎnshang', en: 'evening' }] },
        { hanzi: '早 饭', pinyin: 'zǎofàn', en: 'breakfast', example: { hanzi: '你 吃 早 饭 了 吗 ？', pinyin: 'nǐ chī zǎofàn le ma ?', en: 'Have you eaten breakfast (yet)?' }, related: [{ hanzi: '午 饭', pinyin: 'wǔfàn', en: 'lunch' }] },
        { hanzi: '晚 饭', pinyin: 'wǎnfàn', en: 'dinner / supper', example: { hanzi: '晚 饭 我 们 在 家 吃 。', pinyin: 'wǎnfàn wǒmen zài jiā chī .', en: 'We eat dinner at home.' }, related: [{ hanzi: '中 午', pinyin: 'zhōngwǔ', en: 'noon' }] },
        { hanzi: '睡 觉', pinyin: 'shuìjiào', en: 'to sleep / go to bed', example: { hanzi: '我 十 一 点 睡 觉 。', pinyin: 'wǒ shíyī diǎn shuìjiào .', en: 'I go to bed at eleven.' }, related: [{ hanzi: '起 床', pinyin: 'qǐchuáng', en: 'get up' }] },
        { hanzi: '开 始', pinyin: 'kāishǐ', en: 'to begin / start', example: { hanzi: '八 点 开 始 上 课 。', pinyin: 'bā diǎn kāishǐ shàng kè .', en: 'Class starts at eight.' }, related: [{ hanzi: '下 课', pinyin: 'xiàkè', en: 'class ends' }] },
        { hanzi: '已 经', pinyin: 'yǐjīng', en: 'already', example: { hanzi: '我 已 经 吃 了 。', pinyin: 'wǒ yǐjīng chī le .', en: 'I have already eaten.' }, related: [{ hanzi: '还 没', pinyin: 'hái méi', en: 'not yet' }] },
        { hanzi: '还 没', pinyin: 'hái méi', en: 'not yet', example: { hanzi: '我 还 没 吃 早 饭 。', pinyin: 'wǒ hái méi chī zǎofàn .', en: 'I haven\u2019t eaten breakfast yet.' }, related: [{ hanzi: '已 经', pinyin: 'yǐjīng', en: 'already' }] },
        { hanzi: '最 近', pinyin: 'zuìjìn', en: 'recently', example: { hanzi: '你 最 近 怎 么 样 ？', pinyin: 'nǐ zuìjìn zěnmeyàng ?', en: 'How have you been recently?' }, related: [{ hanzi: '今 后', pinyin: 'jīnhòu', en: 'from now on' }] },
    ],

    characters: [
        { hanzi: '每', pinyin: 'měi', en: 'every', components: '𠂉(person) + 母(mother)', mnemonic: 'EVERY person has a MOTHER — 每 tops all the "every" words: 每天, 每个, 每周.' },
        { hanzi: '觉', pinyin: 'jiào', en: 'to sleep (in 睡觉)', components: '𰃮(learn/cover) + 见(see)', mnemonic: 'The LEARN-cover over SEE — sleep is when you stop seeing. 睡觉 = sleep + the 睡觉 sleep-feel.' },
        { hanzi: '开', pinyin: 'kāi', en: 'to open / begin', components: 'two hands pulling doors open', mnemonic: 'The original form was a door with two hands — OPEN. 开 始 = open + begin.' },
        { hanzi: '已', pinyin: 'yǐ', en: 'already', components: 'a half-open door', mnemonic: 'The door is PART-way open — already happened, partially done. 已 经 doubles it.' },
        { hanzi: '晚', pinyin: 'wǎn', en: 'late / evening', components: '日(sun) + 免(exempt)', mnemonic: 'The SUN is EXEMPT — gone — so it is evening. 晚 饭, 晚 上, 晚会.' },
        { hanzi: '上', pinyin: 'shàng', en: 'up / on / previous', components: 'a stroke above a base line', mnemonic: 'The little stroke sits ABOVE the line. 上 午 (before noon = upper), 上 课 (attend-up). Also 上周 = last week!' },
    ],

    pronunciation: [
        { hanzi: '了', pinyin: 'le', toneNote: 'Always neutral in this job — weightless. 了 with a 3rd tone (liǎo) is a different word (了解).', en: 'The lightest syllable in the sentence.' },
        { hanzi: '睡 觉', pinyin: 'shuìjiào', toneNote: '4-4: both fall hard. 觉 also reads jué (感觉 feel) — two words, one character.', en: 'The double-reading character.' },
        { hanzi: '时 候', pinyin: 'shíhou', toneNote: '候 goes neutral: SHEN-hou lightness in 有时候.', en: 'The set word\u2019s tail.' },
        { hanzi: '早 晚 对 比', pinyin: 'zǎofàn · wǎnfàn', toneNote: '3-4 then 3-4 — 早 half-dips before 饭.', en: 'Breakfast vs dinner: same music.' },
        { hanzi: '常 常', pinyin: 'chángcháng', toneNote: 'Two full risings — keep both climbing.', en: 'The doubled adverb keeps its tones.' },
        { hanzi: '已 经', pinyin: 'yǐjīng', toneNote: '3-1: the 已 half-dips before the flat 经.', en: 'half-third + first.' },
    ],

    grammar: {
        rule: 'Time travels BEFORE the verb: S + TIME + VERB (我明天去). 了 after the verb marks COMPLETION (我吃了 — I ate it), not past tense. Habits (每天/常常/有时候) never take 了. Negate completed actions with 没: 我没吃.',
        explanation: 'Chinese expresses tense through word order and markers. The time expression sits between subject and verb: 我明天去 (I TOMORROW go), 你上午上课吗？ — putting it after the verb (我去明天) is the classic A1→A2 error. The completion marker 了 goes right after the verb: 我吃了早饭 (I ate the breakfast — done), 我买了三本书 (I bought three books). But 了 is NOT a past tense: it marks the action as completed — yesterday, or five minutes from now when it finishes (好了！ = done!). Habits and routines take NO 了: 我每天七点起床 (I get up at seven EVERY DAY) — adding 了 would make it a one-time completed event. Negation of a 了-action flips to 没 and drops the 了: 我没吃早饭 (I didn\u2019t eat breakfast); the question: 吃了没有？/ …了吗？ The routine adverbs 每天 (every day), 常常 (often), 有时候 (sometimes) sit before the verb, and already/not-yet pair up: 已经…了 vs 还没…呢.',
        examples: [
            { hanzi: '我 明 天 去 上 海 。', pinyin: 'wǒ míngtiān qù Shànghǎi .', en: 'I go to Shanghai tomorrow.', breakdown: ['我 = subject', '明 天 = time, BEFORE the verb', '去 = verb — no change'] },
            { hanzi: '我 吃 了 早 饭 。', pinyin: 'wǒ chī le zǎofàn .', en: 'I ate breakfast.', breakdown: ['吃 + 了 = completed', '早饭 after', 'question: 吃了没有？'] },
            { hanzi: '我 每 天 七 点 起 床 。', pinyin: 'wǒ měitiān qī diǎn qǐchuáng .', en: 'I get up at seven every day.', breakdown: ['每天 = habit marker', '七 点 = clock time', 'NO 了 — it is a routine'] },
            { hanzi: '我 没 吃 早 饭 。', pinyin: 'wǒ méi chī zǎofàn .', en: 'I didn\u2019t eat breakfast.', breakdown: ['没 negates the completion', '了 drops out', 'never ✗ 我不吃早饭 (that = I refuse to eat)'] },
            { hanzi: '你 吃 早 饭 了 吗 ？ —— 还 没 呢 。', pinyin: 'nǐ chī zǎofàn le ma ? —— hái méi ne .', en: 'Have you eaten breakfast? — Not yet.', breakdown: ['V+了+吗 = yet-question', '还没 = not yet', '呢 softens the answer'] },
            { hanzi: '我 已 经 写 完 作 业 了 。', pinyin: 'wǒ yǐjīng xiě wán zuòyè le .', en: 'I have already finished the homework.', breakdown: ['已经 = already', '写 完 = write-to-completion', 'sentence-final 了 = new situation'] },
        ],
        commonMistakes: [
            'Time after the verb: 我去明天 — WRONG. The time slot sits between subject and verb: 我明天去. This order is tested in nearly every HSK-2 listening item.',
            '了 on habits: 我每天吃了七点起床 — WRONG. 了 marks ONE completed action; routines drop it: 我每天七点起床.',
            '不 negating a completed action: 我不吃早饭了 yesterday-style — WRONG. Finished actions negate with 没 (没吃), while 不 negates intention/future (不吃 = I won\u2019t eat).',
            'Reading 了 as "past tense" everywhere: 了 is completion — 它 will appear in future sentences too (到了给我打电话 — call me WHEN you arrive).',
        ],
    },

    patterns: [
        { type: 'Future by time-slot', hanzi: '我 明 天 去 。', pinyin: 'wǒ míngtiān qù .', en: 'S + TIME + V — tomorrow rides before the verb' },
        { type: 'Completion', hanzi: '我 吃 了 早 饭 。', pinyin: 'wǒ chī le zǎofàn .', en: 'V + 了 = the action is done' },
        { type: 'Routine', hanzi: '我 每 天 七 点 起 床 。', pinyin: 'wǒ měitiān qī diǎn qǐchuáng .', en: 'habit — no 了 allowed' },
        { type: 'Frequency ladder', hanzi: '常 常 · 有 时 候 · 从 不', pinyin: 'chángcháng · yǒushíhou · cóngbú', en: 'often · sometimes · never (从不 = never!)' },
        { type: 'Already / not yet', hanzi: '已 经 … 了 · 还 没 … 呢', pinyin: 'yǐjīng … le · hái méi … ne', en: 'the completion pair' },
        { type: 'Yet-question', hanzi: '… 了 没 有 ？ / … 了 吗 ？', pinyin: '… le méiyǒu ? / … le ma ?', en: 'have you … yet?' },
    ],

    sentenceBuilding: [
        { hanzi: '我 每 天 六 点 起 床 。', pinyin: 'wǒ měitiān liù diǎn qǐchuáng .', en: 'I get up at six every day.' },
        { hanzi: '我 每 天 六 点 起 床 ， 七 点 吃 早 饭 。', pinyin: '… qī diǎn chī zǎofàn .', en: '… at seven I eat breakfast.' },
        { hanzi: '今 天 我 七 点 才 起 床 ， 没 吃 早 饭 。', pinyin: 'jīntiān wǒ qī diǎn cái qǐchuáng , méi chī zǎofàn .', en: 'Today I only got up at seven and skipped breakfast.' },
        { hanzi: '因 为 我 没 吃 早 饭 ， 所 以 我 现 在 很 饿 。', pinyin: 'yīnwèi wǒ méi chī zǎofàn , suǒyǐ wǒ xiànzài hěn è .', en: 'Because I skipped breakfast, I\u2019m hungry now.' },
        { hanzi: '明 天 我 一 定 七 点 起 床 ， 还 要 去 跑 步 ！', pinyin: 'míngtiān wǒ yídìng qī diǎn qǐchuáng , hái yào qù pǎobù !', en: 'Tomorrow I will definitely get up at seven — and go running!' },
    ],

    practice: [
        { instruction: 'Place the time:', question: '我 去 北京 (明天)', answer: '我 明 天 去 北京 — time before the verb' },
        { instruction: 'Add completion:', question: '我 吃 早 饭 。 (it\u2019s done)', answer: '我 吃 了 早 饭 。' },
        { instruction: 'Routine or event?', question: '我 每 天 睡 觉 (add 了 or not?)', answer: 'NO 了 — habits never take it' },
        { instruction: 'Negate the completion:', question: '我 吃 了 早 饭 。 → negative', answer: '我 没 吃 早 饭 。 — 没 + verb, 了 drops' },
        { instruction: 'Not yet:', question: '你 吃 了 吗 ？ —— 我 ___ 吃 。', answer: '还 没 — 还没吃呢' },
        { instruction: 'Sometimes:', question: '我 ___ 喝 咖 啡 。', answer: '有 时 候 — adverb before the verb' },
    ],

    translationPractice: [
        { en: 'I go to Beijing tomorrow.', hanzi: '我 明 天 去 北 京 。', pinyin: 'wǒ míngtiān qù Běijīng .' },
        { en: 'I have already eaten lunch.', hanzi: '我 已 经 吃 午 饭 了 。', pinyin: 'wǒ yǐjīng chī wǔfàn le .' },
        { en: 'Every day I get up at six.', hanzi: '我 每 天 六 点 起 床 。', pinyin: 'wǒ měitiān liù diǎn qǐchuáng .' },
        { en: 'I sometimes drink coffee in the afternoon.', hanzi: '我 下 午 有 时 候 喝 咖 啡 。', pinyin: 'wǒ xiàwǔ yǒushíhou hē kāfēi .' },
        { en: 'I didn\u2019t eat breakfast today.', hanzi: '我 今 天 没 吃 早 饭 。', pinyin: 'wǒ jīntiān méi chī zǎofàn .' },
        { en: 'Have you eaten (yet)? — Not yet.', hanzi: '你 吃 了 吗 ？ —— 还 没 呢 。', pinyin: 'nǐ chī le ma ? —— hái méi ne .' },
    ],

    reverseTranslation: [
        { hanzi: '上 午 我 有 课 ， 下 午 没 课 。', pinyin: 'shàngwǔ wǒ yǒu kè , xiàwǔ méi kè .', en: 'In the morning I have class; in the afternoon, none.' },
        { hanzi: '他 昨 天 十 一 点 才 睡 觉 。', pinyin: 'tā zuótiān shíyī diǎn cái shuìjiào .', en: 'He only went to bed at eleven yesterday.' },
        { hanzi: '我 妈 每 天 都 喝 茶 。', pinyin: 'wǒ mā měitiān dōu hē chá .', en: 'My mom drinks tea every single day.' },
        { hanzi: '你 最 近 常 常 加 班 吗 ？', pinyin: 'nǐ zuìjìn chángcháng jiābān ma ?', en: 'Have you been working late often recently?' },
    ],

    register: {
        casual: '吃 了 没 ？ — the three-character everyday hello (lit. eaten-yet?).',
        polite: '您 吃 过 早 饭 了 吗 ？ — 过 (experience) softens the question.',
        formal: '会 议 已 于 九 点 开 始 。 — 已 + 于 = the written register of announcements.',
    },

    culture: '吃了吗？ ("Eaten yet?") is the great Chinese hello — not a dinner invitation, just warmth, answered with 吃了 (eaten) even if you haven\u2019t. Time culture runs punctual: 上班 (work start) and 下班 (work end) mark the day\u2019s two hinges, and 加班 (overtime) is a national talking point. The 已经/还没 pair is how families check on each other — 已经到家了吗？ (home yet?) — and the exam dialogues are full of exactly these check-ins.',

    freeProduction: 'Record your real day (8–10 lines) with the full frame: 每天几点起床/睡觉 (routine, no 了), today\u2019s completed actions with 了 (今天我吃了…), one negated completion (没…), one 有时候/常常 habit, and one already/not-yet exchange (你已经…了吗？——还没有呢). Every time expression must sit BEFORE its verb.',

    miniTest: [
        { question: 'I go to Shanghai TOMORROW:', options: ['我 去 明 天 上 海 。', '我 明 天 去 上 海 。', '我 上 海 去 明 天 。', '明 天 我 去 上 海 吗 。'], answer: '我 明 天 去 上 海 。 — time before the verb (明天我去上海 also fine)' },
        { question: '我每天七点起床 — add 了 or not?', options: ['我 每 天 七 点 起 床 了 。', '我 每 天 七 点 起 床 。', '我 每 天 了 七 点 起 床 。', '我 起 床 了 每 天 。'], answer: '我 每 天 七 点 起 床 。 — routines take no 了' },
        { question: 'Negate 我吃了早饭 :', options: ['我 不 吃 早 饭 。', '我 没 吃 早 饭 。', '我 没 有 吃 了 。', '我 吃 没 早 饭 。'], answer: '我 没 吃 早 饭 。 — 没 + verb, 了 drops' },
        { question: '还没呢 means:', options: ['already done', 'not yet', 'never again', 'right now'], answer: 'not yet — the 还没…呢 pair' },
        { question: 'Time words sit:', options: ['after the verb', 'at the very end', 'before the verb', 'anywhere'], answer: 'before the verb — S + TIME + V' },
    ],

    review: [
        'HSK-1 gave the clock (几点) — this lecture gives the SLOT it sits in (before the verb) and the completion marker 了.',
        'Next: transport — 去/到 and 从…到… ride the same time-slot rules (我明天坐火车去北京).',
    ],

    traps: [
        'Time BEFORE the verb: 我明天去, never 我去明天. The exam\u2019s word-order questions hunt this.',
        '了 = completion, NOT past: it never appears in routines (每天… without 了) and can appear in future sentences (到了打电话).',
        'Negating completions flips to 没 and DROPS 了: 我没吃. 不吃 means refusing, not failed-to-eat.',
        'The routine adverbs (每天/常常/有时候) sit before the verb — and 从不 (never) takes the sandhi: cóngbú.',
    ],

    homework: {
        intro: 'The time-slot rule, 了 completion, routine habits, and the already/not-yet pair — your day, Chinese-ordered.',
        translation: [
            { prompt: 'I go to Beijing tomorrow.', answer: '我 明 天 去 北 京 。', alt: ['我明天去北京。'], explanation: 'S + TIME + V. The time slot sits before 去 — never after.' },
            { prompt: 'I have already eaten lunch.', answer: '我 已 经 吃 午 饭 了 。', alt: ['我已经吃午饭了。'], explanation: '已经…了 wraps the completed action — the already/not-yet frame.' },
            { prompt: 'Every day I get up at six.', answer: '我 每 天 六 点 起 床 。', alt: ['我每天六点起床。'], explanation: 'Routine: 每天 + clock time + verb — no 了 anywhere.' },
            { prompt: 'I didn\u2019t eat breakfast today.', answer: '我 今 天 没 吃 早 饭 。', alt: ['我今天没吃早饭。'], explanation: '没 negates the completion; 了 disappears in the negative.' },
            { prompt: 'Have you eaten (yet)? — Not yet.', answer: '你 吃 了 吗 ？ —— 还 没 呢 。', alt: ['吃了吗？——还没呢。'], explanation: 'V+了+吗 asks "yet?"; 还没…呢 answers.' },
            { prompt: 'Sometimes I drink coffee in the afternoon.', answer: '我 下 午 有 时 候 喝 咖 啡 。', alt: ['我下午有时候喝咖啡。'], explanation: 'Frequency adverb before the verb; time word before that.' },
        ],
        blanks: [
            { prompt: '我 明 天 ___ 北 京 。 (go)', answer: '去', explanation: 'Time slot first: 明天 + 去. The verb never moves.' },
            { prompt: '我 吃 ___ 早 饭 。 (completed)', answer: '了', explanation: 'V + 了 = done.' },
            { prompt: '我 每 天 七 点 起 ___ 。', answer: '床', explanation: '起床 = get up — no 了 in routines.' },
            { prompt: '我 还 ___ 吃 早 饭 。 (not yet)', answer: '没', explanation: '还没 = not yet (了 drops in the negative).' },
            { prompt: '我 ___ 有 时 候 喝 茶 。 — wait, fix the order in Section C!', answer: '(correct: 我有时候喝茶)', explanation: 'Trick item: 有时候 sits BEFORE the verb, and 我 sometimes… is 我有时候 — never 我喝有时候.' },
            { prompt: '你 吃 了 早 饭 ___ ？ (yet-question particle)', answer: '吗', explanation: 'V+了+吗 = have you yet?' },
        ],
        corrections: [
            { prompt: '我 去 明 天 上 海 。', answer: '我 明 天 去 上 海 。', explanation: 'How the mistake happens: English "I go tomorrow". Why it does not work: Chinese time sits BEFORE the verb, before the place. How to fix it: 我明天去上海.' },
            { prompt: '我 每 天 七 点 起 床 了 。', answer: '我 每 天 七 点 起 床 。', explanation: 'How the mistake happens: adding 了 to sound past-y. Why it does not work: 了 marks ONE completed action — 每天 makes it a routine, which bans 了. How to fix it: drop it.' },
            { prompt: '我 今 天 不 吃 早 饭 (meaning: I skipped it).', answer: '我 今 天 没 吃 早 饭 。', explanation: 'How the mistake happens: 不 as all-purpose not. Why it does not work: 不 = refusal/won\u2019t; a skipped meal is 没 + verb. How to fix it: 今天没吃.' },
            { prompt: '我 吃 了 没 早 饭 。', answer: '我 没 吃 早 饭 。', explanation: 'How the mistake happens: keeping both markers. Why it does not work: 没 replaces 了 in the negative — the two never co-exist. How to fix it: 没 + verb + object.' },
            { prompt: '我 有 时候 喝 咖啡 在 下 午 。', answer: '我 下 午 有 时 候 喝 咖 啡 。', explanation: 'How the mistake happens: English tail-position time. Why it does not work: big time (下午) goes early, frequency (有时候) sits right before the verb. How to fix it: 下午…有时候…喝.' },
        ],
        writing: {
            task: 'Write 你的 一 天 (your day, 8–10 sentences): routine lines with 每天 (起床/吃饭/上课/睡觉 — no 了), today\u2019s completed actions with 了 (今天我吃了…), one 没-negation, one 有时候/常常 habit, and one already/not-yet exchange (你已经…了吗？——还没有呢). Every time expression before its verb.',
            requirements: [
                'At least two 每天 routine sentences (no 了)',
                'At least two V+了 completions',
                'One 没 negation of a completion',
                'One 有时候 or 常常 habit',
                'One 已经…了 or 还没…呢 exchange',
            ],
            minWords: 50,
        },
        checklist: [
            'I place time expressions BEFORE the verb (我明天去)',
            'I mark completions with V+了 and know 了 ≠ past tense',
            'I keep 了 out of habits (每天/常常/有时候… bare verb)',
            'I negate completions with 没 and drop 了',
            'I run the already/not-yet pair: 已经…了 ↔ 还没…呢',
            'I ask yet-questions: …了吗？/ …了没有？',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The word-order ladder: SUBJECT → TIME → (place if any) → VERB → OBJECT. 明天我去上海 · 我上午上课 · 我现在很忙. Time never trails.',
            examples: [
                { hanzi: '我 明 天 去 上 海 。 · 你 上 午 干 什 么 ？', pinyin: 'wǒ míngtiān qù Shànghǎi · nǐ shàngwǔ gàn shénme ?', en: 'I go to Shanghai tomorrow · What are you doing in the morning?' },
            ],
        },
        {
            explanation: '了 placement: right after the verb, before the object: 吃了早饭, 买了三本书. Sentence-final 了 (after the object) marks a new situation: 下雨了 (it\u2019s raining NOW).',
            examples: [
                { hanzi: '我 吃 了 早 饭 。 · 下 雨 了 ！', pinyin: 'wǒ chī le zǎofàn · xià yǔ le !', en: 'I ate breakfast · It\u2019s raining now!' },
            ],
        },
        {
            explanation: 'The habit ban: 每天, 常常, 有时候, 每 + time → NO 了. The action repeats, so nothing is completed.',
            examples: [
                { hanzi: '我 每 天 喝 茶 。 · 他 常 常 加 班 。', pinyin: 'wǒ měitiān hē chá · tā chángcháng jiābān', en: 'I drink tea daily · he often works late' },
            ],
        },
        {
            explanation: 'The negative flip: completed action → 没 + verb, 了 deleted. 我吃了 → 我没吃. (不吃 = I won\u2019t eat — intention, different meaning.)',
            examples: [
                { hanzi: '我 没 去 。 = I didn\u2019t go · 我 不 去 。 = I\u2019m not going.', pinyin: 'wǒ méi qù · wǒ bú qù', en: 'the 没/不 meaning split in one pair' },
            ],
        },
        {
            explanation: '已经…了 ↔ 还没…呢: the completion pair. 已经到家了 (already home) · 还没到家呢 (not home yet).',
            examples: [
                { hanzi: '我 已 经 到 家 了 。 —— 我 还 没 呢 。', pinyin: 'wǒ yǐjīng dào jiā le —— wǒ hái méi ne .', en: 'I\u2019m already home — I\u2019m not yet.' },
            ],
        },
        {
            explanation: 'Yet-questions: V+了+吗 or V+了没有？ Both ask "done yet?" — answer 吃了 / 还没.',
            examples: [
                { hanzi: '你 吃 了 没 有 ？ —— 还 没 。', pinyin: 'nǐ chī le méiyǒu ? —— hái méi .', en: 'Eaten yet? — Not yet.' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '起床': { en: 'to get up', pron: 'qǐchuáng', tone: '3-2', note: 'Routine verb — no 了 in habits.' },
        '睡觉': { en: 'to sleep', pron: 'shuìjiào', tone: '4-4', note: '觉 reads jiào here, jué in 感觉 (feel).' },
        '早饭': { en: 'breakfast', pron: 'zǎofàn', tone: '3-4', note: '午饭 lunch · 晚饭 dinner — the 饭 trio.' },
        '已经开始': { en: 'have already begun', pron: 'yǐjīng kāishǐ le', tone: '3-1-1-3-neutral', note: '已经…了 frame.' },
        '每天': { en: 'every day', pron: 'měitiān', tone: '3-1', note: 'Habit marker — bans 了.' },
        '有时候': { en: 'sometimes', pron: 'yǒushíhou', tone: '3-neutral-4', note: '候 neutral. Before the verb.' },
        '常常': { en: 'often', pron: 'chángcháng', tone: '2-2', note: 'Doubled adverb, keeps both risings.' },
        '从来不': { en: 'never', pron: 'cóngbù', tone: '2-4', note: '从不 + verb — the strong never (sandhi: cóngbú before 4th).' },
        '加班': { en: 'to work overtime', pron: 'jiābān', tone: '1-1', note: '加 + 班 = add a shift.' },
        '饿': { en: 'hungry', pron: 'è', tone: '4', note: '我 很 饿 — 很 again (adjectives need it).' },
        '一定': { en: 'definitely', pron: 'yídìng', tone: '2-4', note: '一定 + verb — the promise adverb.' },
    },
};

// ── HSK 2 · Movement & Transport ────────────────────────────────────────────
const h2Transport: StaticChineseLesson = {
    title: 'Movement & Transport',
    objective: 'Move people and vehicles through Chinese space: 去/来/到 for direction, 从…到… for routes, 坐 + vehicle for riding, 怎么去？ for asking the way — with the pre-verbal word order that keeps destinations in their slot.',

    vocabulary: [
        { hanzi: '去', pinyin: 'qù', en: 'to go (away from speaker)', example: { hanzi: '我 去 学 校 。', pinyin: 'wǒ qù xuéxiào .', en: 'I go to school.' }, related: [{ hanzi: '来', pinyin: 'lái', en: 'to come (toward speaker)' }] },
        { hanzi: '来', pinyin: 'lái', en: 'to come (toward the speaker)', example: { hanzi: '你 什 么 时 候 来 北 京 ？', pinyin: 'nǐ shénme shíhou lái Běijīng ?', en: 'When are you coming to Beijing?' }, related: [{ hanzi: '回 家', pinyin: 'huí jiā', en: 'return home' }] },
        { hanzi: '到', pinyin: 'dào', en: 'to arrive / to (a point)', example: { hanzi: '火 车 十 点 到 。', pinyin: 'huǒchē shí diǎn dào .', en: 'The train arrives at ten.' }, related: [{ hanzi: '到 家', pinyin: 'dào jiā', en: 'arrive home' }] },
        { hanzi: '从 … 到 …', pinyin: 'cóng … dào …', en: 'from … to …', example: { hanzi: '从 北 京 到 上 海 。', pinyin: 'cóng Běijīng dào Shànghǎi .', en: 'From Beijing to Shanghai.' }, related: [{ hanzi: '从 这 儿', pinyin: 'cóng zhèr', en: 'from here' }] },
        { hanzi: '坐', pinyin: 'zuò', en: 'to sit / ride / take (transport)', example: { hanzi: '我 坐 公 共 汽 车 去 。', pinyin: 'wǒ zuò gōnggòng qìchē qù .', en: 'I go by bus.' }, related: [{ hanzi: '请 坐', pinyin: 'qǐng zuò', en: 'please sit' }] },
        { hanzi: '公 共 汽 车', pinyin: 'gōnggòng qìchē', en: 'bus', measureWord: '辆', example: { hanzi: '公 共 汽 车 站 在 哪 儿 ？', pinyin: 'gōnggòng qìchē zhàn zài nǎr ?', en: 'Where is the bus stop?' }, related: [{ hanzi: '出 租 车', pinyin: 'chūzūchē', en: 'taxi' }] },
        { hanzi: '出 租 车', pinyin: 'chūzūchē', en: 'taxi', measureWord: '辆', example: { hanzi: '我 们 坐 出 租 车 吧 。', pinyin: 'wǒmen zuò chūzūchē ba .', en: 'Let\u2019s take a taxi.' }, related: [{ hanzi: '打 车', pinyin: 'dǎchē', en: 'to hail a taxi (spoken)' }] },
        { hanzi: '火 车', pinyin: 'huǒchē', en: 'train', measureWord: '辆/列', example: { hanzi: '火 车 很 快 。', pinyin: 'huǒchē hěn kuài .', en: 'The train is fast.' }, related: [{ hanzi: '飞 机', pinyin: 'fēijī', en: 'airplane' }] },
        { hanzi: '怎 么 去', pinyin: 'zěnme qù', en: 'how do (I) get to…', example: { hanzi: '机 场 怎 么 去 ？', pinyin: 'jīchǎng zěnme qù ?', en: 'How do I get to the airport?' }, related: [{ hanzi: '怎 么 走', pinyin: 'zěnme zǒu', en: 'which way to walk' }] },
        { hanzi: '开 车', pinyin: 'kāichē', en: 'to drive', example: { hanzi: '爸 爸 开 车 送 我 。', pinyin: 'bàba kāichē sòng wǒ .', en: 'Dad drives me (there).' }, related: [{ hanzi: '骑 车', pinyin: 'qíchē', en: 'to ride a bike' }] },
        { hanzi: '路', pinyin: 'lù', en: 'road / way', measureWord: '条', example: { hanzi: '这 条 路 很 长 。', pinyin: 'zhè tiáo lù hěn cháng .', en: 'This road is long.' }, related: [{ hanzi: '走 这 条 路', pinyin: 'zǒu zhè tiáo lù', en: 'take this road' }] },
        { hanzi: '远', pinyin: 'yuǎn', en: 'far', example: { hanzi: '机 场 很 远 。', pinyin: 'jīchǎng hěn yuǎn .', en: 'The airport is very far.' }, related: [{ hanzi: '近', pinyin: 'jìn', en: 'near' }] },
    ],

    characters: [
        { hanzi: '到', pinyin: 'dào', en: 'to arrive', components: '至(arrive) + 刀(knife)', mnemonic: 'The ARRIVE radical 至 (an arrow hitting the ground) + knife-edge precision — arrival is exact.' },
        { hanzi: '坐', pinyin: 'zuò', en: 'to sit', components: 'two 人 on 土(earth)', mnemonic: 'TWO PEOPLE sitting on the GROUND — the original picture. Now also "to ride" (坐车 = sit-in-a-vehicle).' },
        { hanzi: '远', pinyin: 'yuǎn', en: 'far', components: '辶(walk) + 元', mnemonic: 'The WALK radical 辶 marks movement words: 远 近 送 这 — if it has 辶, your feet are involved.' },
        { hanzi: '机', pinyin: 'jī', en: 'machine (in 飞机/手机)', components: '木(wood) + 几', mnemonic: 'WOOD + frame — the machine radical family: 飞机 (fly-machine = plane), 手机 (hand-machine = phone).' },
        { hanzi: '路', pinyin: 'lù', en: 'road', components: '足(foot) + 各(each)', mnemonic: 'FOOT + each — every road is for feet. The 足 radical marks walking: 路 跑 跳.' },
        { hanzi: '站', pinyin: 'zhàn', en: 'station / to stand', components: '立(stand) + 占', mnemonic: 'The STAND radical 立 — a station is where vehicles stand: 火车站, 汽车站.' },
    ],

    pronunciation: [
        { hanzi: '坐 vs 做 vs 作', pinyin: 'zuò × 3', toneNote: 'Three zuò\u2019s: sit/ride (坐), do (做), work-piece (作). Same sound — context and characters decide.', en: 'The zuò triple.' },
        { hanzi: '公 共 汽 车', pinyin: 'gōnggòng qìchē', toneNote: '1-4-4-1: two falls in the middle. Bus-tongue twister until it flows.', en: 'The four-syllable bus.' },
        { hanzi: '机 场', pinyin: 'jīchǎng', toneNote: '1-3: the 场 half-dips. The hidden ü doesn\u2019t appear here — but 去 back does.', en: 'airport = machine-place.' },
        { hanzi: '怎 么', pinyin: 'zěnme', toneNote: '么 neutral again: ZEN-muh. 怎么去 = ZEN-muh-chü.', en: 'The how-word\u2019s light tail.' },
        { hanzi: '出 租 车', pinyin: 'chūzūchē', toneNote: '1-1-1 — three flats: keep them level, do not let 出 rise.', en: 'The taxi is a plateau.' },
        { hanzi: '远 vs 近', pinyin: 'yuǎn · jìn', toneNote: '3-2: 远 full dip, 近 rise. The antonym pair examiners contrast.', en: 'far vs near.' },
    ],

    grammar: {
        rule: 'Motion: 去 (go, away) / 来 (come, toward) + place BEFORE any verb phrase. Route: 从 + A + 到 + B. Vehicle: 坐 + vehicle + 去 + place (坐公共汽车去学校). Ask the way: …怎么去？/ …怎么走？',
        explanation: 'Chinese motion packs the destination before the verb: 去学校 (go-to-school), 来我家 (come-to-my-home) — the verb 去/来 fuses with the place like a compound. 到 adds arrival as its own verb or as a marker: 火车十点到 (the train arrives at ten), 坐到北京 (ride all the way to Beijing). Routes split with the 从…到… frame, which slides anywhere a time word could: 从北京到上海要两个小时 (from Beijing to Shanghai takes two hours). The vehicle rides BEFORE the motion verb: 坐公共汽车去 (go by bus), 坐火车去上海, 开车回家 — the pattern is [person] + [vehicle-坐/开/骑] + [motion-verb]. Asking: place + 怎么去？(how does one get there?), with 走 for the walking variant (这儿怎么走？). Two direction verbs choose sides: 去 moves AWAY from the speaker, 来 moves TOWARD them — 你来吗？ asks if you\u2019ll come HERE.',
        examples: [
            { hanzi: '我 坐 公 共 汽 车 去 学 校 。', pinyin: 'wǒ zuò gōnggòng qìchē qù xuéxiào .', en: 'I go to school by bus.', breakdown: ['坐 = ride', '公共汽车 = bus (vehicle BEFORE the motion verb)', '去学校 = go-to-school'] },
            { hanzi: '从 北 京 到 上 海 要 两 个 小 时 。', pinyin: 'cóng Běijīng dào Shànghǎi yào liǎng ge xiǎoshí .', en: 'From Beijing to Shanghai takes two hours.', breakdown: ['从…到… = the route frame', '要 = takes', '两个小时 = duration (not clock!)'] },
            { hanzi: '飞 机 几 点 到 ？', pinyin: 'fēijī jǐ diǎn dào ?', en: 'When does the plane arrive?', breakdown: ['飞机 = fly-machine', '几点 fronted time question', '到 = arrive'] },
            { hanzi: '火 车 站 怎 么 走 ？', pinyin: 'huǒchēzhàn zěnme zǒu ?', en: 'How do I walk to the train station?', breakdown: ['火车站 = train station', '怎么走 = how-walk', 'the polite ask-direction formula'] },
            { hanzi: '爸 爸 开 车 送 我 到 机 场 。', pinyin: 'bàba kāichē sòng wǒ dào jīchǎng .', en: 'Dad drives me to the airport.', breakdown: ['开车 = drive', '送 = send/escort someone', '到 = all the way to'] },
            { hanzi: '你 什 么 时 候 来 中 国 ？', pinyin: 'nǐ shénme shíhou lái Zhōngguó ?', en: 'When are you coming to China?', breakdown: ['什么时候 = when (in the time slot)', '来 = come (toward speaker)', 'time before verb again'] },
        ],
        commonMistakes: [
            'English preposition order: 我去学校在公共汽车 — WRONG. The vehicle sits BEFORE the motion verb: 我坐公共汽车去学校. The pre-verbal slot rules everything.',
            '去 vs 来 by map, not by speaker: 你明天来我家 ✓ (coming toward ME) vs 我明天来北京 while IN Beijing — choose 来/去 from where the SPEAKER stands.',
            '到 as filler after 去: 我去到学校 (simple motion) — 去 alone covers routine going; 到 marks arrival/completion: 我到了 (I\u2019ve arrived).',
            'Route words reversed: 到上海从北京 — WRONG. 从 (from) always opens the frame: 从北京到上海.',
        ],
    },

    patterns: [
        { type: 'Motion + destination', hanzi: '我 去 学 校 。', pinyin: 'wǒ qù xuéxiào .', en: 'go + place fuses into one verb phrase' },
        { type: 'The vehicle slot', hanzi: '坐 火 车 去 上 海 。', pinyin: 'zuò huǒchē qù Shànghǎi .', en: '坐 + vehicle + 去 + place' },
        { type: 'The route frame', hanzi: '从 … 到 …', pinyin: 'cóng … dào …', en: 'from… to… — slides into the time slot too' },
        { type: 'Arrival', hanzi: '火 车 十 点 到 。', pinyin: 'huǒchē shí diǎn dào .', en: '到 = arrive; subject can be the vehicle' },
        { type: 'Ask the way', hanzi: '… 怎 么 去 ？ / 怎 么 走 ？', pinyin: '… zěnme qù ? / zěnme zǒu ?', en: 'the direction question' },
        { type: 'Duration of a route', hanzi: '要 两 个 小 时 。', pinyin: 'yào liǎng ge xiǎoshí .', en: 'takes two hours — 小时 for duration' },
    ],

    sentenceBuilding: [
        { hanzi: '我 去 北 京 。', pinyin: 'wǒ qù Běijīng .', en: 'I go to Beijing.' },
        { hanzi: '我 明 天 坐 火 车 去 北 京 。', pinyin: 'wǒ míngtiān zuò huǒchē qù Běijīng .', en: 'Tomorrow I take the train to Beijing.' },
        { hanzi: '我 明 天 坐 火 车 去 北 京 ， 从 这 儿 到 北 京 要 五 个 小 时 。', pinyin: '… cóng zhèr dào Běijīng yào wǔ ge xiǎoshí .', en: '… from here to Beijing takes five hours.' },
        { hanzi: '火 车 站 怎 么 走 ？ —— 坐 公 共 汽 车 十 分 钟 就 到 。', pinyin: '… zuò gōnggòng qìchē shí fēnzhōng jiù dào .', en: 'How to the station? — Ten minutes by bus and you\u2019re there.' },
        { hanzi: '爸 爸 说 开 车 太 慢 ， 我 们 还 是 坐 飞 机 去 吧 。', pinyin: 'bàba shuō kāichē tài màn , wǒmen háishi zuò fēijī qù ba .', en: 'Dad says driving is too slow — let\u2019s fly instead.' },
    ],

    practice: [
        { instruction: 'Choose the direction verb:', question: '你 什 么 时 候 ___ 北 京 ？ (I\u2019m in Beijing asking you)', answer: '来 — toward the speaker' },
        { instruction: 'Slot the vehicle:', question: '我 坐 出 租 车 ___ 机 场 。 (go to)', answer: '去 — 坐+vehicle+去+place' },
        { instruction: 'The route frame:', question: '___ 上 海 ___ 北 京 要 一 个 小 时 。', answer: '从…到… — 从上海到北京' },
        { instruction: 'Arrival:', question: '飞 机 八 点 ___ 。', answer: '到 — the plane arrives at eight' },
        { instruction: 'Ask the way:', question: '火 车 站 怎 么 ___ ？ (on foot)', answer: '走 — 怎么走' },
        { instruction: 'Clock or duration:', question: '要 两 个 ___ 。 (it takes two…)', answer: '小 时 — duration' },
    ],

    translationPractice: [
        { en: 'I take the bus to school.', hanzi: '我 坐 公 共 汽 车 去 学 校 。', pinyin: 'wǒ zuò gōnggòng qìchē qù xuéxiào .' },
        { en: 'When does the train arrive?', hanzi: '火 车 几 点 到 ？', pinyin: 'huǒchē jǐ diǎn dào ?' },
        { en: 'From Beijing to Shanghai takes two hours.', hanzi: '从 北 京 到 上 海 要 两 个 小 时 。', pinyin: 'cóng Běijīng dào Shànghǎi yào liǎng ge xiǎoshí .' },
        { en: 'How do I get to the airport?', hanzi: '机 场 怎 么 去 ？', pinyin: 'jīchǎng zěnme qù ?' },
        { en: 'My dad drives me home.', hanzi: '爸 爸 开 车 送 我 回 家 。', pinyin: 'bàba kāichē sòng wǒ huí jiā .' },
        { en: 'Let\u2019s take a taxi — the bus is too slow.', hanzi: '我 们 坐 出 租 车 吧 ， 公 共 汽 车 太 慢 了 。', pinyin: 'wǒmen zuò chūzūchē ba , gōnggòng qìchē tài màn le .' },
    ],

    reverseTranslation: [
        { hanzi: '你 什 么 时 候 来 中 国 ？', pinyin: 'nǐ shénme shíhou lái Zhōngguó ?', en: 'When are you coming to China?' },
        { hanzi: '从 学 校 到 我 家 很 近 。', pinyin: 'cóng xuéxiào dào wǒ jiā hěn jìn .', en: 'From school to my home is very near.' },
        { hanzi: '妈 妈 骑 车 上 班 。', pinyin: 'māma qíchē shàngbān .', en: 'Mom bikes to work.' },
        { hanzi: '这 条 路 不 远 ， 走 十 分 钟 就 到 。', pinyin: 'zhè tiáo lù bù yuǎn , zǒu shí fēnzhōng jiù dào .', en: 'This road isn\u2019t far — ten minutes\u2019 walk and you\u2019re there.' },
    ],

    register: {
        casual: '打 车 走 吧 ！ — 打车 (hail a car) is the spoken word for taxi.',
        polite: '请 问 ， 去 火 车 站 坐 几 路 车 ？ — 几路 = which bus LINE (numbered routes).',
        formal: '列 车 于 十 点 二 十 分 到 达 。 — 到达 = the written ARRIVE of announcements.',
    },

    culture: 'China\u2019s trains are the world\u2019s fastest classroom: 高铁 (gāotiě, the high-speed rail) tops 300 km/h and its ticket system is where every learner meets real numbers, times, and 从…到… — the ticket literally prints the route frame. In the city, 打车 apps (滴滴) replaced the street-hail, and 公交 (the squeezed form of 公共汽车) plus 地铁 (subway) are the daily verbs of student life. Direction etiquette: hosts ask 你怎么来的？ (how did you get here?) as small talk — answer with the vehicle verb and you sound instantly local.',

    freeProduction: 'Record your real route (7–9 lines): how you get to school/work (我坐…去…), how long it takes (要…分钟/小时), whether it\u2019s far (远/近), one 从…到… sentence about a trip, and how a visitor should reach your home (我家怎么走？——坐…). Then ask a partner 怎么去 + a place and paraphrase their answer.',

    miniTest: [
        { question: 'I take the bus to school:', options: ['我 去 学 校 坐 公 共 汽 车 。', '我 坐 公 共 汽 车 去 学 校 。', '我 公 共 汽 车 去 学 校 。', '我 学 校 去 坐 公 共 汽 车 。'], answer: '我 坐 公 共 汽 车 去 学 校 。 — vehicle slot before the motion verb' },
        { question: '从北京到上海要两个小时 — 两个小时 is:', options: ['clock time', 'duration', 'a date', 'a ticket price'], answer: 'duration — 小时 measures HOW LONG' },
        { question: 'The train arrives at ten:', options: ['火 车 十 点 去 。', '火 车 十 点 到 。', '火 车 到 十 点 。', '火 车 十 点 来 了 。'], answer: '火 车 十 点 到 。 — 到 = arrive' },
        { question: 'You are IN Beijing asking a friend when they will visit you. They say:', options: ['我 明 天 去 北 京 。', '我 明 天 来 北 京 。', '我 明 天 回 去 北 京 。', '我 明 天 到 北 京 吧 。'], answer: '我 明 天 来 北 京 。 — 来 moves toward the speaker' },
        { question: 'Ask the way on foot:', options: ['火 车 站 怎 么 去 车 ？', '火 车 站 怎 么 走 ？', '火 车 站 走 什 么 ？', '什 么 火 车 站 走 ？'], answer: '火 车 站 怎 么 走 ？' },
    ],

    review: [
        'The time lecture\u2019s slot rules hold: time and route frames both live before the verb (我明天坐火车去).',
        'Next: shopping — 买, 太…了 complaints, and the measure words 件/本/斤 join the container set.',
    ],

    traps: [
        'The vehicle slot: 坐/开/骑 + vehicle + 去 + place. Moving the vehicle after the verb (我去学校坐公共汽车) changes the meaning to "I go to school IN ORDER TO sit on a bus".',
        '来 vs 去 is speaker-relative: 你来我家 (you come TO me) vs 我去你家 (I go TO you). One trip, two verbs, depending on who stands where.',
        '到 = arrival/completion: 我到了 (I\u2019ve arrived); simple routine going needs only 去.',
        '从 opens the route frame, always: 从北京到上海 — reversing it (到上海从北京) is an instant error.',
    ],

    homework: {
        intro: 'Direction, vehicles, routes, and the way-asking formula — movement with Chinese word order.',
        translation: [
            { prompt: 'I take the bus to school.', answer: '我 坐 公 共 汽 车 去 学 校 。', alt: ['我坐公共汽车去学校。'], explanation: '坐 + vehicle + 去 + place — the vehicle rides in the pre-verbal slot.' },
            { prompt: 'When does the train arrive?', answer: '火 车 几 点 到 ？', alt: ['火车几点到？'], explanation: '到 = arrive; the vehicle can be the subject; time question in the slot.' },
            { prompt: 'From Beijing to Shanghai takes two hours.', answer: '从 北 京 到 上 海 要 两 个 小 时 。', alt: ['从北京到上海要两个小时。'], explanation: '从…到… + 要 + duration (个小时 — never 点).' },
            { prompt: 'How do I get to the airport?', answer: '机 场 怎 么 去 ？', alt: ['机场怎么去？', '去机场怎么走？'], explanation: 'Place + 怎么去； the walking variant: 怎么走.' },
            { prompt: 'My dad drives me home.', answer: '爸 爸 开 车 送 我 回 家 。', alt: ['爸爸开车送我回家。'], explanation: '开车 + 送 (escort) + person + 回 home — 回 is the return verb.' },
            { prompt: 'When are you coming to China?', answer: '你 什 么 时 候 来 中 国 ？', alt: ['你什么时候来中国？'], explanation: '来 because the speaker is (presumably) in China — speaker-relative direction.' },
        ],
        blanks: [
            { prompt: '我 ___ 公 共 汽 车 去 学 校 。', answer: '坐', explanation: '坐 + vehicle = to ride.' },
            { prompt: '从 北 京 ___ 上 海 。 (to)', answer: '到', explanation: '从…到… the route frame.' },
            { prompt: '火 车 十 点 ___ 。 (arrives)', answer: '到', explanation: '到 = arrive — the train arrives.' },
            { prompt: '机 场 怎 么 ___ ？ (walk there)', answer: '走', explanation: '怎么走 = how to walk there.' },
            { prompt: '从 学 校 到 家 很 ___ 。 (near)', answer: '近', explanation: '近 vs 远 — the antonym pair.' },
            { prompt: '爸 爸 开 车 ___ 我 。 (drives ME there)', answer: '送', explanation: '送 = escort/see someone off.' },
        ],
        corrections: [
            { prompt: '我 去 学 校 坐 公 共 汽 车 。', answer: '我 坐 公 共 汽 车 去 学 校 。', explanation: 'How the mistake happens: English "go to school by bus" order. Why it does not work: the vehicle slot sits BEFORE the motion verb. How to fix it: 坐车去学校.' },
            { prompt: '到 上 海 从 北 京 要 五 个 小 时 。', answer: '从 北 京 到 上 海 要 五 个 小 时 。', explanation: 'How the mistake happens: destination-first habit. Why it does not work: 从 opens the frame. How to fix it: 从A到B.' },
            { prompt: '我 去 到 学 校 每 天 。', answer: '我 每 天 去 学 校 。', explanation: 'How the mistake happens: 到 + routine + trailing time. Why it does not work: routines use plain 去; time rides before the verb. How to fix it: 我每天去学校.' },
            { prompt: '你 明 天 去 我 家 吗 ？ (I am asking you to visit ME)', answer: '你 明 天 来 我 家 吗 ？', explanation: 'How the mistake happens: translating "come" by habit. Why it does not work: motion toward the SPEAKER takes 来. How to fix it: 你来我家.' },
            { prompt: '到 机 场 要 两 点 。', answer: '到 机 场 要 两 个 小 时 。', explanation: 'How the mistake happens: 两点 sounds like two. Why it does not work: 两点 is 2 o\u2019clock; duration needs 个小时. How to fix it: 两个小时.' },
        ],
        writing: {
            task: 'Write your routes (8–10 sentences): daily commute (我坐…去…，要…分钟), one long trip with 从…到… and duration, a vehicle comparison (开车太慢，坐飞机快), how a visitor reaches you (我家怎么走？——坐…), and one 太…了 opinion about a transport mode.',
            requirements: [
                'Two vehicle-slot sentences (坐/开/骑 + vehicle + 去)',
                'One 从…到… route with duration (个小时)',
                'One 到 arrival sentence',
                'One 怎么去/怎么走 question',
                'One 太…了 opinion',
            ],
            minWords: 50,
        },
        checklist: [
            'I put the vehicle BEFORE the motion verb (坐车去)',
            'I choose 来/去 relative to the speaker, not the map',
            'I build routes with 从…到… and durations with 小时/分钟',
            'I mark arrival with 到 (火车十点到)',
            'I ask directions: 怎么去？/ 怎么走？',
            'I separate clock (点) from duration (个小时)',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The vehicle slot: [person] + [坐/开/骑 + vehicle] + [去/回/来 + place]. The vehicle phrase is a coverb — it sets the stage before the motion verb.',
            examples: [
                { hanzi: '我 坐 地 铁 去 上 班 。 · 他 骑 车 来 我 家 。', pinyin: 'wǒ zuò dìtiě qù shàngbān · tā qíchē lái wǒ jiā', en: 'I subway to work · he bikes to my place' },
            ],
        },
        {
            explanation: '从…到… frames routes AND times: 从北京到上海 · 从九点到十点. It can even start the sentence as a subject: 从学校到家很近.',
            examples: [
                { hanzi: '从 九 点 到 十 点 我 有 课 。', pinyin: 'cóng jiǔ diǎn dào shí diǎn wǒ yǒu kè .', en: 'From nine to ten I have class.' },
            ],
        },
        {
            explanation: '来/去 are speaker-relative: coming HERE = 来; going THERE = 去. On the phone, both sides may use 来 for the same trip — each speaks from their own feet.',
            examples: [
                { hanzi: '你 来 我 家 吧 。 —— 好 ， 我 去 。', pinyin: 'nǐ lái wǒ jiā ba . —— hǎo , wǒ qù .', en: 'Come to my place. — Okay, I\u2019ll go (come, from my feet).' },
            ],
        },
        {
            explanation: '到 doubles as arrival verb and all-the-way-to marker: 火车十点到 · 坐到北京 · 送到机场.',
            examples: [
                { hanzi: '爸 爸 送 我 到 学 校 。', pinyin: 'bàba sòng wǒ dào xuéxiào .', en: 'Dad sees me all the way to school.' },
            ],
        },
        {
            explanation: 'Direction questions: 怎么去 (by what means) vs 怎么走 (which way on foot). Answer with the vehicle slot: 坐地铁去.',
            examples: [
                { hanzi: '地 铁 站 怎 么 走 ？ —— 往 前 走 ， 然 后 左 拐 。', pinyin: 'dìtiězhàn zěnme zǒu ? —— wǎng qián zǒu , ránhòu zuǒ guǎi .', en: 'How to the subway? — Straight ahead, then left.' },
            ],
        },
        {
            explanation: 'Transport nouns take 辆 (vehicles) or 列/趟 (trains/trips): 一辆公共汽车, 一列火车, 最后一趟车 (the last service).',
            examples: [
                { hanzi: '一 辆 出 租 车 · 最 后 一 趟 火 车', pinyin: 'yí liàng chūzūchē · zuìhòu yí tàng huǒchē', en: 'a taxi · the last train' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '到': { en: 'to arrive / to (a point)', pron: 'dào', tone: '4', note: 'Arrival verb + route-frame end (从…到…).' },
        '从': { en: 'from', pron: 'cóng', tone: '2', note: 'Always opens the frame: 从…到….' },
        '坐': { en: 'to sit / ride', pron: 'zuò', tone: '4', note: 'zuò triple: 坐 sit/ride · 做 do · 作 work-piece.' },
        '开车': { en: 'to drive', pron: 'kāichē', tone: '1-1', note: '开 opens/operates: 开车, 开门, 开会 (hold a meeting).' },
        '飞机': { en: 'airplane', pron: 'fēijī', tone: '1-1', measure: '架', note: 'Fly-machine. 坐飞机去 = go by plane.' },
        '火车站': { en: 'train station', pron: 'huǒchēzhàn', tone: '3-1-4', note: '站 = station/stand; 汽车站 bus station.' },
        '地铁': { en: 'subway', pron: 'dìtiě', tone: '4-3', measure: '条/号线', note: '坐地铁去 — the city verb of student life.' },
        '送': { en: 'to escort / see off / deliver', pron: 'sòng', tone: '4', note: '送我到学校 = see me to school. Also gifting: 送你一本书.' },
        '回': { en: 'to return (home)', pron: 'huí', tone: '2', note: '回家/回国 — the return-verb.' },
        '远': { en: 'far', pron: 'yuǎn', tone: '3', note: '不 远 = not far; 离…很远 = far FROM…' },
        '近': { en: 'near', pron: 'jìn', tone: '4', note: '离学校很近 — 离 frames distance.' },
        '慢': { en: 'slow', pron: 'màn', tone: '4', note: '太慢了！— pairs with 快 (fast).' },
    },
};

// ── HSK 2 · Shopping & Money ────────────────────────────────────────────────
const h2Shopping: StaticChineseLesson = {
    title: 'Shopping & Money',
    objective: 'Buy with 买 and 找 (change), complain and praise with 太…了, deploy the measure-word set (件/本/斤/双/条), handle prices in 块/毛, and ask for a discount the polite way — the market-and-mall skill of HSK 2.',

    vocabulary: [
        { hanzi: '买', pinyin: 'mǎi', en: 'to buy', example: { hanzi: '我 要 买 一 件 毛 衣 。', pinyin: 'wǒ yào mǎi yí jiàn máoyī .', en: 'I want to buy a sweater.' }, related: [{ hanzi: '卖', pinyin: 'mài', en: 'to sell (tones swap!)' }] },
        { hanzi: '东 西', pinyin: 'dōngxi', en: 'things / stuff', measureWord: '个', example: { hanzi: '我 买 了 很 多 东 西 。', pinyin: 'wǒ mǎi le hěn duō dōngxi .', en: 'I bought a lot of stuff.' }, related: [{ hanzi: '购 物', pinyin: 'gòuwù', en: 'shopping (formal)' }] },
        { hanzi: '太 … 了', pinyin: 'tài … le', en: 'too / so (excessive)', example: { hanzi: '太 贵 了 ！', pinyin: 'tài guì le !', en: 'Too expensive!' }, related: [{ hanzi: '太 好 了 ！', pinyin: 'tài hǎo le !', en: 'That\u2019s great!' }] },
        { hanzi: '贵', pinyin: 'guì', en: 'expensive', example: { hanzi: '这 个 太 贵 了 。', pinyin: 'zhè ge tài guì le .', en: 'This is too expensive.' }, related: [{ hanzi: '便 宜', pinyin: 'piányi', en: 'cheap' }] },
        { hanzi: '便 宜', pinyin: 'piányi', en: 'cheap', example: { hanzi: '那 家 店 很 便 宜 。', pinyin: 'nà jiā diàn hěn piányi .', en: 'That shop is cheap.' }, related: [{ hanzi: '贵', pinyin: 'guì', en: 'expensive' }] },
        { hanzi: '件', pinyin: 'jiàn', en: 'measure word (clothes, matters)', example: { hanzi: '两 件 衬 衫', pinyin: 'liǎng jiàn chènshān', en: 'two shirts' }, related: [{ hanzi: '一 件 事', pinyin: 'yí jiàn shì', en: 'one matter' }] },
        { hanzi: '本', pinyin: 'běn', en: 'measure word (books)', example: { hanzi: '我 买 了 三 本 书 。', pinyin: 'wǒ mǎi le sān běn shū .', en: 'I bought three books.' }, related: [{ hanzi: '一 本 汉 语 书', pinyin: 'yì běn Hànyǔ shū', en: 'a Chinese textbook' }] },
        { hanzi: '斤', pinyin: 'jīn', en: 'measure word (half-kilo, weight)', example: { hanzi: '买 两 斤 苹 果 。', pinyin: 'mǎi liǎng jīn píngguǒ .', en: 'Buy two jin of apples.' }, related: [{ hanzi: '公 斤', pinyin: 'gōngjīn', en: 'kilogram' }] },
        { hanzi: '块', pinyin: 'kuài', en: 'yuan (colloquial)', example: { hanzi: '这 个 五 十 块 。', pinyin: 'zhè ge wǔshí kuài .', en: 'This is fifty kuai.' }, related: [{ hanzi: '毛', pinyin: 'máo', en: 'ten cents (dime)' }] },
        { hanzi: '找', pinyin: 'zhǎo', en: 'to look for / give change', example: { hanzi: '找 你 十 块 钱 。', pinyin: 'zhǎo nǐ shí kuài qián .', en: 'Here\u2019s your ten-kuai change.' }, related: [{ hanzi: '找 钱', pinyin: 'zhǎo qián', en: 'give change' }] },
        { hanzi: '便 宜 一 点 儿', pinyin: 'piányi yìdiǎnr', en: 'a bit cheaper', example: { hanzi: '能 不 能 便 宜 一 点 儿 ？', pinyin: 'néng bùnéng piányi yìdiǎnr ?', en: 'Can it be a bit cheaper?' }, related: [{ hanzi: '打 折', pinyin: 'dǎzhé', en: 'discount (percent-off)' }] },
        { hanzi: '付 钱', pinyin: 'fù qián', en: 'to pay', example: { hanzi: '在 哪 儿 付 钱 ？', pinyin: 'zài nǎr fù qián ?', en: 'Where do I pay?' }, related: [{ hanzi: '手 机 付', pinyin: 'shǒujī fù', en: 'pay by phone (QR)' }] },
    ],

    characters: [
        { hanzi: '买', pinyin: 'mǎi', en: 'to buy', components: 'a net over goods', mnemonic: 'The old form 買 showed a NET catching goods — simplified 买 keeps the net-silhouette. Sell 卖 is the same picture + 十 on top (goods going OUT).' },
        { hanzi: '贵', pinyin: 'guì', en: 'expensive', components: '中壳(shell = money) top-bottom', mnemonic: 'The bottom 贝 is the SHELL/MONEY radical — ancient money was cowrie shells. 贝-words are about money: 贵 买 财.' },
        { hanzi: '本', pinyin: 'běn', en: 'root / measure for books', components: '木(tree) + 一', mnemonic: 'A line under the TREE marks its ROOT — 本 means root/origin, and books (a tree\u2019s product!) took its measure word.' },
        { hanzi: '钱', pinyin: 'qián', en: 'money', components: '钅(metal) + 戋', mnemonic: 'METAL radical again — coins. You met it in the numbers lecture; here it pays for everything.' },
        { hanzi: '店', pinyin: 'diàn', en: 'shop', components: '广(broad building) + 占', mnemonic: 'The BROAD-BUILDING radical 广 houses shops: 商店, 书店, 饭店 — the roof means business.' },
        { hanzi: '便', pinyin: 'biàn', en: 'convenient (in 便宜)', components: '亻(person) + 更', mnemonic: 'A PERSON + more — convenience is personal. 便宜 (cheap) and 方便 (convenient) share the character.' },
    ],

    pronunciation: [
        { hanzi: '买 vs 卖', pinyin: 'mǎi · mài', toneNote: 'THE tone trap of commerce: buy = 3rd (dip), sell = 4th (fall). The characters differ by the 十 hat.', en: 'mǎi/mài — get this wrong at a market and roles reverse.' },
        { hanzi: '东 西', pinyin: 'dōngxi', toneNote: '西 neutral — dong-SHI light. As a direction word it is dōngxī (full); as "things" the tail drops.', en: 'One word, two musics.' },
        { hanzi: '便 宜', pinyin: 'piányi', toneNote: 'The 便 reads pián (2nd) here; 宜 goes neutral.', en: 'Neither character sounds like itself alone.' },
        { hanzi: '太 … 了', pinyin: 'tài … le', toneNote: '了 neutral, as always: tài guì LE.', en: 'The exclamation frame\u2019s rhythm.' },
        { hanzi: '块 vs 快', pinyin: 'kuài × 2', toneNote: 'Same sound: 块 (yuan) has the earth-壳, 快 (fast) the heart — homophones the listening test exploits.', en: 'money vs fast.' },
        { hanzi: '一 点 儿', pinyin: 'yìdiǎnr', toneNote: '儿 (ér) melts into the previous syllable in the north: diǎnr. The south says yìdiǎn.', en: 'The erhua flavor.' },
    ],

    grammar: {
        rule: 'The exclamation frame 太 + adjective + 了 (太贵了！). Measure words are obligatory between number and noun: 件 (clothes), 本 (books), 斤 (weight), 双 (pairs), 条 (long things). Prices in 块/毛. Asking cheaper: 能不能便宜一点儿？',
        explanation: '太…了 is the excess frame: 太贵了 (too expensive!), 太好了 (fantastic!) — 了 is grammatically REQUIRED here, even though nothing is completed; the frame itself demands it. Between number and noun the measure word is not optional: 两件毛衣, 三本书, 五斤苹果, 一双鞋 (a pair of shoes), 一条裤子 (a pair of trousers — trousers are LONG things, hence 条). Prices: 多少钱？answered in 块 (kuai = yuan) and 毛 (ten cents): 十五块五毛 (15.50). Change is 找 — the verb the cashier uses (找你十块 — here\u2019s your change) and the learner uses for looking (我找我的钱包). The polite haggle: 能不能便宜一点儿？ (can it be a LITTLE cheaper?) — 一点儿 softens, 太…了 sets the complaint up. And 买/卖 are the tone trap: 我买 (mǎi, 3rd) vs 他卖 (mài, 4th).',
        examples: [
            { hanzi: '这 件 毛 衣 太 贵 了 ！', pinyin: 'zhè jiàn máoyī tài guì le !', en: 'This sweater is too expensive!', breakdown: ['件 = clothes measure', '太…了 = the excess frame', '贵 = expensive'] },
            { hanzi: '我 买 了 三 本 书 。', pinyin: 'wǒ mǎi le sān běn shū .', en: 'I bought three books.', breakdown: ['买 + 了 = completed purchase', '本 = book measure', '三本 = three (volumes)'] },
            { hanzi: '一 斤 苹 果 多 少 钱 ？', pinyin: 'yì jīn píngguǒ duōshao qián ?', en: 'How much is a jin of apples?', breakdown: ['斤 = half-kilo', 'weight foods measure in 斤', '多少钱 question'] },
            { hanzi: '找 你 十 五 块 五 毛 。', pinyin: 'zhǎo nǐ shíwǔ kuài wǔ máo .', en: 'Your change: 15.50.', breakdown: ['找 = give change', '块 + 毛 = yuan + dimes', 'cashier language'] },
            { hanzi: '能 不 能 便 宜 一 点 儿 ？', pinyin: 'néng bùnéng piányi yìdiǎnr ?', en: 'Can it be a little cheaper?', breakdown: ['A-not-A with 能', '便宜一点儿 = a bit cheaper', 'the polite haggle'] },
            { hanzi: '那 家 店 的 东 西 又 便 宜 又 好 。', pinyin: 'nà jiā diàn de dōngxi yòu piányi yòu hǎo .', en: 'That shop\u2019s stuff is both cheap AND good.', breakdown: ['那家 = that (shop measure 家!)', '又…又… = both…and…', 'double compliment'] },
        ],
        commonMistakes: [
            '个 for everything at HSK 2: 两 个 书 — WRONG. HSK 2 demands the right measures: 本 (books), 件 (clothes), 斤 (weight), 双 (pairs), 条 (long things). 个 is the fallback, not the answer.',
            'Dropping the 了 in 太…了: 太贵 — incomplete. The frame is 太…了, always with the tail.',
            'Mixing 买/卖 tones at speed: 他卖 (mài, he sells) vs 我买 (mǎi, I buy) — one tone apart. The listening test loves this pair.',
            'Translating "cheap" as 小: 小 does not mean inexpensive — 便宜 does. 这个很小说的是尺寸, not price.',
        ],
    },

    patterns: [
        { type: 'The excess frame', hanzi: '太 + adj + 了', pinyin: 'tài guì le !', en: 'too/so + adjective + 了 — the required tail' },
        { type: 'Buy + measure', hanzi: '买 两 件 衬 衫', pinyin: 'mǎi liǎng jiàn chènshān', en: 'number + measure + noun — obligatory' },
        { type: 'Price question', hanzi: '… 多 少 钱 ？', pinyin: '… duōshao qián ?', en: 'answered in 块/毛' },
        { type: 'The polite haggle', hanzi: '能 不 能 便 宜 一 点 儿 ？', pinyin: 'néng bùnéng piányi yìdiǎnr ?', en: 'A-not-A + 一点儿 softener' },
        { type: 'Double quality', hanzi: '又 便 宜 又 好', pinyin: 'yòu piányi yòu hǎo', en: '又…又… = both…and…' },
        { type: 'Change given', hanzi: '找 你 十 块 。', pinyin: 'zhǎo nǐ shí kuài .', en: '找 = the cashier\u2019s change verb' },
    ],

    sentenceBuilding: [
        { hanzi: '我 要 买 一 本 书 。', pinyin: 'wǒ yào mǎi yì běn shū .', en: 'I want to buy a book.' },
        { hanzi: '这 本 书 多 少 钱 ？ —— 二 十 块 。', pinyin: 'zhè běn shū duōshao qián ? —— èrshí kuài .', en: 'How much is this book? — Twenty kuai.' },
        { hanzi: '二 十 块 ？ 太 贵 了 ！ 能 不 能 便 宜 一 点 儿 ？', pinyin: 'èrshí kuài ? tài guì le ! néng bùnéng piányi yìdiǎnr ?', en: 'Twenty? Too expensive! Can it be a bit cheaper?' },
        { hanzi: '好 吧 ， 十 八 块 ， 不 能 再 少 了 。', pinyin: 'hǎo ba , shíbā kuài , bùnéng zài shǎo le .', en: 'Fine — eighteen, and not a kuai less.' },
        { hanzi: '那 我 买 两 本 ， 请 给 我 打 包 。', pinyin: 'nà wǒ mǎi liǎng běn , qǐng gěi wǒ dǎbāo .', en: 'Then I\u2019ll take two — please bag them up.' },
    ],

    practice: [
        { instruction: 'Measure the book:', question: '两 ___ 书', answer: '本 — books ride 本' },
        { instruction: 'Measure the shirt:', question: '一 ___ 衬 衫', answer: '件 — clothes ride 件' },
        { instruction: 'Complete the frame:', question: '这 个 太 贵 ___ ！', answer: '了 — 太…了 always closes' },
        { instruction: 'The haggle:', question: '能 不 能 ___ 一 点 儿 ？', answer: '便 宜 — a bit cheaper' },
        { instruction: 'Buy or sell?', question: '他 ___ 苹 果 。 (he SELLS apples)', answer: '卖 — mài, 4th tone' },
        { instruction: 'The change verb:', question: '__ 你 五 块 钱 。', answer: '找 — 找你 = your change' },
    ],

    translationPractice: [
        { en: 'I bought two shirts.', hanzi: '我 买 了 两 件 衬 衫 。', pinyin: 'wǒ mǎi le liǎng jiàn chènshān .' },
        { en: 'This one is too expensive!', hanzi: '这 个 太 贵 了 ！', pinyin: 'zhè ge tài guì le !' },
        { en: 'How much are these apples?', hanzi: '这 些 苹 果 多 少 钱 ？', pinyin: 'zhèxiē píngguǒ duōshao qián ?' },
        { en: 'Can it be a little cheaper?', hanzi: '能 不 能 便 宜 一 点 儿 ？', pinyin: 'néng bùnéng piányi yìdiǎnr ?' },
        { en: 'That shop is cheap and good.', hanzi: '那 家 店 又 便 宜 又 好 。', pinyin: 'nà jiā diàn yòu piányi yòu hǎo .' },
        { en: 'Where do I pay?', hanzi: '在 哪 儿 付 钱 ？', pinyin: 'zài nǎr fù qián ?' },
    ],

    reverseTranslation: [
        { hanzi: '我 妈 买 了 五 斤 苹 果 。', pinyin: 'wǒ mā mǎi le wǔ jīn píngguǒ .', en: 'My mom bought five jin of apples.' },
        { hanzi: '这 双 鞋 不 贵 ， 四 十 块 。', pinyin: 'zhè shuāng xié bú guì , sìshí kuài .', en: 'These shoes aren\u2019t expensive — forty kuai.' },
        { hanzi: '找 你 七 块 五 毛 。', pinyin: 'zhǎo nǐ qī kuài wǔ máo .', en: 'Your change: 7.50.' },
        { hanzi: '这 条 裤 子 太 长 了 。', pinyin: 'zhè tiáo kùzi tài cháng le .', en: 'These trousers are too long.' },
    ],

    register: {
        casual: '老 板 ， 多 少 钱 ？ 便 宜 点 儿 呗 ！ — the market register (老板 = boss/vendor; 呗 = casual let\u2019s).',
        polite: '请 问 这 个 多 少 钱 ？ 能 不 能 便 宜 一 点 儿 ？ — 请问 + A-not-A + softener.',
        formal: '本 店 商 品 概 不 议 价 。 — the no-haggling notice (本店 = this establishment, written style).',
    },

    culture: 'Bargaining is a social dance, not a fight — and it happens at markets (市场), not in supermarkets or convenience stores, where prices are fixed and haggling would embarrass everyone. The dance opens with a wince: 太贵了！ The vendor counters; you meet in the middle over tea. 手机支付 (phone payment via QR) has largely replaced cash — vendors hang QR codes on their stalls — but the bargaining language survives untouched. Numbers culture at the market: 斤 (half-kilo) is the default weight, prices quoted per 斤, and the vendor\u2019s 找你十块 closes the deal as the change hits your palm.',

    freeProduction: 'Record a full market negotiation (8–10 lines) for one item you actually want: ask the price (老板，这个多少钱？), wince (太贵了！), haggle twice (能不能便宜一点儿？/ 五十块，行不行？), settle (好吧，四十五), and close the purchase with the measure word (我买一件). Then switch roles and be the vendor once (找你十块，慢走！).',

    miniTest: [
        { question: 'Two books:', options: ['两 个 书', '两 本 书', '两 件 书', '两 斤 书'], answer: '两 本 书 — books ride 本' },
        { question: '太贵了 — the 了 here:', options: ['completion of buying', 'required by the 太…了 frame', 'past tense', 'optional'], answer: 'required by the 太…了 frame' },
        { question: 'He SELLS apples:', options: ['他 买 苹 果 。', '他 卖 苹 果 。', '他 苹 果 买 。', '他 给 苹 果 。'], answer: '他 卖 苹 果 。 — mài, 4th tone' },
        { question: '一双手 means:', options: ['a pair (of shoes/gloves)', 'one hand', 'two hands', 'a knife'], answer: 'a pair (of shoes/gloves) — 双 measures pairs' },
        { question: 'The polite haggle:', options: ['太 便 宜 了 ！', '能 不 能 便 宜 一 点 儿 ？', '多 少 钱 太 贵 。', '一 点 儿 贵 ！'], answer: '能 不 能 便 宜 一 点 儿 ？' },
    ],

    review: [
        'The transport lecture\u2019s 太慢了 already used the 太…了 frame — here it prices everything.',
        'Next: ability — 会/能/可以, the three cans, which also power the haggle\u2019s 能不能.',
    ],

    traps: [
        '买 (mǎi, buy) vs 卖 (mài, sell) — one tone. Saying 他买苹果 makes him a customer, not a vendor.',
        'The 太…了 frame REQUIRES the 了 tail: 太贵了 — dropping it sounds unfinished.',
        'Measure words are obligatory: 两本书, 两件毛衣, 五斤苹果, 一双鞋, 一条裤子 — 个 is the fallback, not the answer.',
        '块/毛 vs 块/角: spoken = 毛, written/formal = 角. And 找 means BOTH look-for and give-change — context decides.',
    ],

    homework: {
        intro: 'The market toolkit: measures, the 太…了 frame, prices in 块/毛, and the polite haggle.',
        translation: [
            { prompt: 'I bought two shirts.', answer: '我 买 了 两 件 衬 衫 。', alt: ['我买了两件衬衫。'], explanation: '买+了 completed; 件 measures clothes; 两 before the measure.' },
            { prompt: 'This one is too expensive!', answer: '这 个 太 贵 了 ！', alt: ['这个太贵了！'], explanation: '太…了 — the frame needs its 了 tail.' },
            { prompt: 'Can it be a little cheaper?', answer: '能 不 能 便 宜 一 点 儿 ？', alt: ['能不能便宜一点儿？'], explanation: 'A-not-A (能不能) + 便宜 + 一点儿 softener.' },
            { prompt: 'How much are the apples?', answer: '苹 果 多 少 钱 ？', alt: ['苹果多少钱？'], explanation: 'Fruit weighs in 斤 at the market: 一斤…多少钱.' },
            { prompt: 'Your change: seven fifty.', answer: '找 你 七 块 五 毛 。', alt: ['找你七块五毛。'], explanation: '找 = give change; 毛 = ten cents (spoken).' },
            { prompt: 'That shop\u2019s things are cheap and good.', answer: '那 家 店 的 东 西 又 便 宜 又 好 。', alt: ['那家店的东西又便宜又好。'], explanation: '家 measures shops! 又…又… = both…and…' },
        ],
        blanks: [
            { prompt: '我 买 了 三 ___ 书 。', answer: '本', explanation: '本 = the book measure.' },
            { prompt: '这 件 毛 衣 太 ___ 了 ！ (expensive)', answer: '贵', explanation: '太…了 frame with 贵.' },
            { prompt: '买 两 ___ 苹 果 。 (jin)', answer: '斤', explanation: '斤 = half-kilo weight measure.' },
            { prompt: '能 不 能 便 宜 一 ___ ？', answer: '点 儿', explanation: '一点儿 = a little — the softener.' },
            { prompt: '找 你 八 ___ 钱 。 (yuan, colloquial)', answer: '块', explanation: '块 = colloquial yuan.' },
            { prompt: '那 家 ___ 的 东 西 很 便 宜 。 (shop)', answer: '店', explanation: '店 = shop; measured by 家.' },
        ],
        corrections: [
            { prompt: '我 买 了 两 个 书 。', answer: '我 买 了 两 本 书 。', explanation: 'How the mistake happens: 个 as universal. Why it does not work: HSK 2 measures are obligatory for classes of nouns (本 books, 件 clothes). How to fix it: 两本书.' },
            { prompt: '这 个 太 贵 。', answer: '这 个 太 贵 了 。', explanation: 'How the mistake happens: dropping the frame tail. Why it does not work: 太…了 is a fixed frame — 了 required. How to fix it: 太贵了.' },
            { prompt: '他 买 苹 果 。 (he is the vendor)', answer: '他 卖 苹 果 。', explanation: 'How the mistake happens: mǎi/mài tone swap. Why it does not work: 买 = buy (3rd), 卖 = sell (4th). How to fix it: tone + character together.' },
            { prompt: '能 便 宜 一 点 儿 吗 ？', answer: '能 不 能 便 宜 一 点 儿 ？', explanation: 'How the mistake happens: half the A-not-A. Why it does not work: 能不能 is the full form; 能…吗 is a mix of two machines. How to fix it: full A-not-A.' },
            { prompt: '这 个 书 很 小 （我 mean cheap）.', answer: '这 本 书 很 便 宜 。', explanation: 'How the mistake happens: 小 for cheap. Why it does not work: 小 = physically small; price takes 便宜. How to fix it: 这本书很便宜 (and 本, not 个!).' },
        ],
        writing: {
            task: 'Write a market negotiation script (10–14 lines, both roles): 老板 greets, you ask the price (多少钱), wince with 太…了, haggle twice (能不能便宜一点儿 / 五十块行不行), settle, buy with the right measure word, and the 老板 gives change (找你…). One 又…又… compliment somewhere.',
            requirements: [
                'One 太…了 complaint with full frame',
                'One full A-not-A haggle (能不能…)',
                'Two different measure words used correctly (件/本/斤/双/条)',
                'One 又…又… sentence',
                'Change given with 找 + 块/毛',
            ],
            minWords: 55,
        },
        checklist: [
            'I use class measure words: 本 (books), 件 (clothes), 斤 (weight), 双 (pairs), 条 (long things)',
            'I complete the 太…了 frame every time',
            'I keep 买/卖 tones apart (mǎi buy / mài sell)',
            'I haggle politely: 能不能便宜一点儿？',
            'I handle prices: 块 (yuan) and 毛 (dimes), change with 找',
            'I count shops with 家 (一家店) and use 又…又… for double qualities',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The HSK-2 measure set: 件 clothes & matters · 本 books · 斤 weight (half-kilo) · 双 pairs · 条 long things (trousers, roads, dogs!) · 家 shops/restaurants · 辆 vehicles. 个 remains the default fallback.',
            examples: [
                { hanzi: '两 件 衬 衫 · 三 本 书 · 五 斤 苹 果 · 一 双 鞋 · 一 条 裤 子', pinyin: 'liǎng jiàn chènshān · sān běn shū · wǔ jīn píngguǒ · yì shuāng xié · yì tiáo kùzi', en: 'two shirts · three books · five jin of apples · a pair of shoes · a pair of trousers' },
            ],
        },
        {
            explanation: '太…了 = the excess frame, 了 obligatory: 太贵了 · 太好了 · 太远了. It can praise or complain — tone decides.',
            examples: [
                { hanzi: '太 贵 了 ！ · 太 好 了 ！', pinyin: 'tài guì le ! · tài hǎo le !', en: 'Too expensive! · Fantastic!' },
            ],
        },
        {
            explanation: '买/卖: one tone apart — 买 mǎi (3rd, buy), 卖 mài (4th, sell). The characters differ by the 十 hat on 卖 (goods leaving).',
            examples: [
                { hanzi: '我 买 苹 果 。 · 他 卖 苹 果 。', pinyin: 'wǒ mǎi píngguǒ · tā mài píngguǒ', en: 'I buy apples · he sells apples' },
            ],
        },
        {
            explanation: 'Prices: 块 = kuai (yuan, spoken), 毛 = dimes (spoken), 角 = the written form. 十五块五 = 15.50. Change: 找你… (the vendor\u2019s verb).',
            examples: [
                { hanzi: '找 你 十 五 块 五 毛 。', pinyin: 'zhǎo nǐ shíwǔ kuài wǔ máo .', en: 'Your change: 15.50.' },
            ],
        },
        {
            explanation: 'The haggle ladder: 多少钱？→ 太贵了！→ 能不能便宜一点儿？→ 五十块行不行？→ 好吧，成交！ (deal!) — escalate politely, one step at a time.',
            examples: [
                { hanzi: '老 板 ， 能 不 能 便 宜 一 点 儿 ？', pinyin: 'lǎobǎn , néng bùnéng piányi yìdiǎnr ?', en: 'Boss, can it be a bit cheaper?' },
            ],
        },
        {
            explanation: '又…又… joins two qualities in one sentence: 又便宜又好, 又大又甜 (big AND sweet). Both adjectives share the subject.',
            examples: [
                { hanzi: '这 个 苹 果 又 大 又 甜 。', pinyin: 'zhè ge píngguǒ yòu dà yòu tián .', en: 'This apple is big and sweet.' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '东西': { en: 'things / stuff', pron: 'dōngxi', tone: '1-neutral', note: 'Lit. east-west. 西 neutral when meaning things.' },
        '毛衣': { en: 'sweater', pron: 'máoyī', tone: '2-1', measure: '件', note: '毛 (wool) + 衣 (clothing).' },
        '衬衫': { en: 'shirt', pron: 'chènshān', tone: '4-1', measure: '件', note: 'The office shirt.' },
        '鞋': { en: 'shoes', pron: 'xié', tone: '2', measure: '双', note: 'Pairs: 一双鞋.' },
        '裤子': { en: 'trousers', pron: 'kùzi', tone: '4-neutral', measure: '条', note: 'Long things ride 条.' },
        '老板': { en: 'boss / vendor', pron: 'lǎobǎn', tone: '3-3', note: 'Sandhi: lǎobǎn → láobǎn. The market\u2019s addressee.' },
        '打折': { en: 'discount', pron: 'dǎzhé', tone: '3-2', note: '打八折 = 20% off (80% of price — Chinese counts what you PAY).' },
        '付钱': { en: 'to pay', pron: 'fù qián', tone: '4-2', note: '付 + 钱; 手机付 = phone-pay.' },
        '钱包': { en: 'wallet', pron: 'qiánbāo', tone: '2-1', note: 'Money-bag.' },
        '很多': { en: 'many / a lot', pron: 'hěn duō', tone: '3-1', note: '很 works inside 很多 — quantity, not quality.' },
        '试': { en: 'to try on / try', pron: 'shì', tone: '4', note: '试一试 = try a bit; 能试试吗？ at clothing shops.' },
    },
};

export const CHINESE_A2_PART1: Record<string, StaticChineseLesson> = {
    '2:time': h2Time,
    '2:transport': h2Transport,
    '2:shopping': h2Shopping,
};

export const CHINESE_A2_PART1_EXTRAS: Record<string, { warmup?: WarmupItem[]; verbTables?: VerbTableBlock[]; useCases?: UseCaseBlock[]; shadowing?: ShadowingBlock }> = {
    '2:time': {
        warmup: [
            { q: 'Where does the time expression sit?', a: 'BEFORE the verb: 我明天去 — S + TIME + V.' },
            { q: 'What does V+了 mark?', a: 'Completion — the action is done. NOT past tense.' },
            { q: '了 in routines?', a: 'Banned — 每天/常常/有时候 take the bare verb.' },
            { q: 'Negate 我吃了早饭?', a: '我 没 吃 早 饭 — 没 + verb, 了 drops.' },
            { q: 'The already/not-yet pair?', a: '已经…了 ↔ 还没…呢.' },
        ],
        verbTables: [
            {
                title: 'The 了 machine — event vs routine',
                rows: [
                    { label: 'completed', form: '我 吃 了 早 饭 。', pron: 'wǒ chī le zǎofàn .' },
                    { label: 'yet-question', form: '你 吃 了 吗 ？', pron: 'nǐ chī le ma ?' },
                    { label: 'negative', form: '我 没 吃 。', pron: 'wǒ méi chī .' },
                    { label: 'routine (NO 了)', form: '我 每 天 吃 早 饭 。', pron: 'wǒ měitiān chī zǎofàn .' },
                    { label: 'new situation', form: '下 雨 了 ！', pron: 'xià yǔ le !' },
                ],
            },
            {
                title: 'The time-slot ladder',
                rows: [
                    { label: 'subject', form: '我', pron: 'wǒ' },
                    { label: 'time', form: '明 天 / 上 午 / 九 点', pron: 'míngtiān / shàngwǔ / jiǔ diǎn' },
                    { label: 'frequency', form: '每 天 · 常 常 · 有 时 候', pron: 'měitiān · chángcháng · yǒushíhou' },
                    { label: 'verb', form: '去 · 起 床 · 喝', pron: 'qù · qǐchuáng · hē' },
                    { label: 'object', form: '北 京 · 早 饭 · 茶', pron: 'Běijīng · zǎofàn · chá' },
                ],
            },
        ],
        useCases: [
            {
                word: '了 — four faces',
                uses: [
                    { use: 'completed action (V+了)', examples: [{ fr: '我 买 了 三 本 书 。', en: 'I bought three books.' }] },
                    { use: 'new situation (sentence-final)', examples: [{ fr: '下 雨 了 。', en: 'It\u2019s raining now.' }] },
                    { use: 'required by 太…了', examples: [{ fr: '太 好 了 ！', en: 'Fantastic!' }] },
                    { use: 'banned in routines', examples: [{ fr: '✗ 我 每 天 吃 了 早 饭', en: '每天 bans 了' }] },
                ],
            },
            {
                word: 'frequency ladder',
                uses: [
                    { use: 'always/every', examples: [{ fr: '我 每 天 喝 茶 。', en: 'I drink tea every day.' }] },
                    { use: 'often', examples: [{ fr: '我 常 常 加 班 。', en: 'I often work late.' }] },
                    { use: 'sometimes', examples: [{ fr: '我 有 时 候 去 饭 馆 。', en: 'Sometimes I eat out.' }] },
                    { use: 'never', examples: [{ fr: '我 从 不 喝 酒 。', en: 'I never drink alcohol.' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Rhythm drill: time words up front, 了 light as a feather, routines bare. Read each line twice.',
            lines: [
                { fr: '我 明 天 去 上 海 。', pron: 'wǒ míngtiān qù Shànghǎi .', en: 'I go to Shanghai tomorrow.' },
                { fr: '我 已 经 吃 了 午 饭 了 。', pron: 'wǒ yǐjīng chī le wǔfàn le .', en: 'I\u2019ve already had lunch.' },
                { fr: '你 吃 早 饭 了 没 有 ？ —— 还 没 呢 。', pron: 'nǐ chī zǎofàn le méiyǒu ? —— hái méi ne .', en: 'Eaten yet? — Not yet.' },
                { fr: '我 每 天 六 点 起 床 。', pron: 'wǒ měitiān liù diǎn qǐchuáng .', en: 'I get up at six daily.' },
                { fr: '他 常 常 加 班 ， 今 天 也 一 样 。', pron: 'tā chángcháng jiābān , jīntiān yě yíyàng .', en: 'He often works late — today the same.' },
                { fr: '因 为 下 雨 了 ， 所 以 我 没 去 。', pron: 'yīnwèi xià yǔ le , suǒyǐ wǒ méi qù .', en: 'Because it rained, I didn\u2019t go.' },
            ],
        },
    },
    '2:transport': {
        warmup: [
            { q: 'Where does 了 sit?', a: 'Right after the verb: 吃了早饭. Sentence-final 了 = new situation.' },
            { q: '了 in habits?', a: 'Banned: 每天/常常 + bare verb.' },
            { q: 'Negate a completion?', a: '没 + verb, 了 drops: 我没吃.' },
            { q: '已经…了 ↔ ?', a: '还没…呢 — the not-yet twin.' },
            { q: 'Time slot order?', a: 'S + TIME + (frequency) + VERB.' },
        ],
        verbTables: [
            {
                title: 'The vehicle slot — coverbs in order',
                note: 'S + TIME + (坐/开/骑 vehicle) + (从…到…) + motion verb + place.',
                rows: [
                    { label: 'ride', form: '坐 地 铁 去 上 班', pron: 'zuò dìtiě qù shàngbān' },
                    { label: 'drive', form: '开 车 回 家', pron: 'kāichē huí jiā' },
                    { label: 'bike', form: '骑 车 来 我 家', pron: 'qíchē lái wǒ jiā' },
                    { label: 'route', form: '从 学 校 到 车 站', pron: 'cóng xuéxiào dào chēzhàn' },
                    { label: 'duration', form: '要 二 十 分 钟', pron: 'yào èrshí fēnzhōng' },
                ],
            },
            {
                title: 'Transport nouns & their measures',
                rows: [
                    { label: 'bus', form: '公 共 汽 车 · 一 辆', pron: 'gōnggòng qìchē · yí liàng' },
                    { label: 'taxi', form: '出 租 车 · 打 车', pron: 'chūzūchē · dǎchē' },
                    { label: 'train', form: '火 车 · 一 趟', pron: 'huǒchē · yí tàng' },
                    { label: 'plane', form: '飞 机 · 一 架', pron: 'fēijī · yí jià' },
                    { label: 'subway', form: '地 铁 · 二 号 线', pron: 'dìtiě · èr hào xiàn' },
                ],
            },
        ],
        useCases: [
            {
                word: '去 vs 来 vs 回 vs 到',
                uses: [
                    { use: '去 — away from speaker', examples: [{ fr: '我 去 学 校 。', en: 'I go to school.' }] },
                    { use: '来 — toward speaker', examples: [{ fr: '你 来 我 家 吧 。', en: 'Come to my place.' }] },
                    { use: '回 — back to origin', examples: [{ fr: '我 回 家 。', en: 'I\u2019m going home (back).' }] },
                    { use: '到 — arrive at a point', examples: [{ fr: '火 车 十 点 到 。', en: 'The train arrives at ten.' }] },
                ],
            },
            {
                word: '怎么 — the how family',
                uses: [
                    { use: '怎么去 — by what means', examples: [{ fr: '机 场 怎 么 去 ？', en: 'How do I get to the airport?' }] },
                    { use: '怎么走 — which way', examples: [{ fr: '车 站 怎 么 走 ？', en: 'Which way to the station?' }] },
                    { use: '怎么说 — how do you say', examples: [{ fr: '这 个 汉 语 怎 么 说 ？', en: 'How do you say this in Chinese?' }] },
                    { use: '怎么样 — how is it', examples: [{ fr: '你 最 近 怎 么 样 ？', en: 'How have you been?' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Direction drill: destination fuses with 去, the vehicle rides up front. Read each line as if giving directions to a lost friend.',
            lines: [
                { fr: '我 坐 地 铁 去 上 班 。', pron: 'wǒ zuò dìtiě qù shàngbān .', en: 'I take the subway to work.' },
                { fr: '火 车 站 怎 么 走 ？', pron: 'huǒchēzhàn zěnme zǒu ?', en: 'Which way to the train station?' },
                { fr: '从 这 儿 到 机 场 要 一 个 小 时 。', pron: 'cóng zhèr dào jīchǎng yào yí ge xiǎoshí .', en: 'From here to the airport takes an hour.' },
                { fr: '飞 机 十 点 二 十 到 。', pron: 'fēijī shí diǎn èrshí dào .', en: 'The plane arrives at 10:20.' },
                { fr: '开 车 太 慢 了 ， 坐 地 铁 吧 。', pron: 'kāichē tài màn le , zuò dìtiě ba .', en: 'Driving\u2019s too slow — let\u2019s subway.' },
                { fr: '爸 爸 送 我 到 学 校 。', pron: 'bàba sòng wǒ dào xuéxiào .', en: 'Dad sees me to school.' },
            ],
        },
    },
    '2:shopping': {
        warmup: [
            { q: 'The vehicle slot order?', a: '坐/开/骑 + vehicle + 去 + place.' },
            { q: '来 or 去: you ask a friend to visit YOU?', a: '来 — toward the speaker: 你来我家.' },
            { q: '从…到… opens or closes?', a: '从 opens: 从北京到上海.' },
            { q: 'How to ask the way on foot?', a: '…怎么走？' },
            { q: 'Two hours = ?', a: '两 个 小 时 — duration, never 两点.' },
        ],
        verbTables: [
            {
                title: 'The measure-word shelf (HSK 2 set)',
                rows: [
                    { label: 'clothes/matters', form: '一 件 衬 衫 · 一 件 事', pron: 'yí jiàn chènshān' },
                    { label: 'books', form: '三 本 书', pron: 'sān běn shū' },
                    { label: 'weight', form: '五 斤 苹 果', pron: 'wǔ jīn píngguǒ' },
                    { label: 'pairs', form: '一 双 鞋', pron: 'yì shuāng xié' },
                    { label: 'long things', form: '一 条 裤 子', pron: 'yì tiáo kùzi' },
                    { label: 'vehicles', form: '一 辆 车', pron: 'yí liàng chē' },
                ],
            },
            {
                title: 'The market negotiation ladder',
                rows: [
                    { label: 'ask', form: '多 少 钱 ？', pron: 'duōshao qián ?' },
                    { label: 'wince', form: '太 贵 了 ！', pron: 'tài guì le !' },
                    { label: 'haggle', form: '能 不 能 便 宜 一 点 儿 ？', pron: 'néng bùnéng piányi yìdiǎnr ?' },
                    { label: 'counter-offer', form: '五 十 块 行 不 行 ？', pron: 'wǔshí kuài xíng bùxíng ?' },
                    { label: 'close', form: '好 吧 ， 成 交 ！', pron: 'hǎo ba , chéngjiāo !' },
                ],
            },
        ],
        useCases: [
            {
                word: '太…了 — the excess frame',
                uses: [
                    { use: 'complain', examples: [{ fr: '太 贵 了 ！', en: 'Too expensive!' }] },
                    { use: 'praise', examples: [{ fr: '太 好 了 ！', en: 'Fantastic!' }] },
                    { use: 'exhaustion', examples: [{ fr: '今 天 太 累 了 。', en: 'I\u2019m so tired today.' }] },
                    { use: '了 obligatory', examples: [{ fr: '✗ 太 贵 → ✓ 太 贵 了', en: 'the frame needs its tail' }] },
                ],
            },
            {
                word: '又…又… — the double compliment',
                uses: [
                    { use: 'cheap AND good', examples: [{ fr: '又 便 宜 又 好 。', en: 'both cheap and good.' }] },
                    { use: 'big AND sweet', examples: [{ fr: '又 大 又 甜 。', en: 'big and sweet.' }] },
                    { use: 'fast AND cheap', examples: [{ fr: '又 快 又 便 宜 。', en: 'fast and cheap.' }] },
                    { use: 'subject shared', examples: [{ fr: '这 家 店 又 大 又 便 宜 。', en: 'this shop is big and cheap.' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Market music: wince, haggle, settle. Read each line with the vendor\u2019s smile.',
            lines: [
                { fr: '老 板 ， 这 个 多 少 钱 ？', pron: 'lǎobǎn , zhè ge duōshao qián ?', en: 'Boss — how much is this?' },
                { fr: '太 贵 了 ！ 能 不 能 便 宜 一 点 儿 ？', pron: 'tài guì le ! néng bùnéng piányi yìdiǎnr ?', en: 'Too expensive! A bit cheaper?' },
                { fr: '五 十 块 行 不 行 ？ —— 不 行 ， 五 十 五 。', pron: 'wǔshí kuài xíng bùxíng ? — bùxíng , wǔshíwǔ .', en: 'Fifty, okay? — No, fifty-five.' },
                { fr: '那 我 买 两 件 。', pron: 'nà wǒ mǎi liǎng jiàn .', en: 'Then I\u2019ll take two.' },
                { fr: '找 你 十 五 块 五 毛 。', pron: 'zhǎo nǐ shíwǔ kuài wǔ máo .', en: 'Your change: 15.50.' },
                { fr: '这 家 店 又 便 宜 又 好 ！', pron: 'zhè jiā diàn yòu piányi yòu hǎo !', en: 'This shop: cheap AND good!' },
            ],
        },
    },
};
