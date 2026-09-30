// Chinese HSK-2 lectures part 2 — Ability (会/能/可以), Experience & Comparison
// (过/比), Weather & Feelings. Same gold-standard format; ALL text pre-segmented.

import type { HskLesson } from './hskService';
import { BASE_GLOSSARY, type ChineseGlossEntry } from './chineseLessonBase';
import type { WarmupItem, VerbTableBlock, UseCaseBlock, ShadowingBlock } from './frenchLessons';
import type { StaticChineseLesson } from './chineseLessons';

// ── HSK 2 · Ability & Permission — the three cans ───────────────────────────
const h2Ability: StaticChineseLesson = {
    title: 'Ability & Permission',
    objective: 'Split "can" three ways — 会 (learned skill), 能 (ability/circumstance), 可以 (permission) — negate each correctly (不会/不能/不可以), ask permission the polite way (能不能/可以…吗), and use the modal bracket with bare verbs that never conjugate.',

    vocabulary: [
        { hanzi: '会', pinyin: 'huì', en: 'can (learned skill)', example: { hanzi: '我 会 说 汉 语 。', pinyin: 'wǒ huì shuō Hànyǔ .', en: 'I can speak Chinese (I learned).' }, related: [{ hanzi: '会 开 车', pinyin: 'huì kāichē', en: 'can drive' }] },
        { hanzi: '能', pinyin: 'néng', en: 'can (ability / circumstance)', example: { hanzi: '今 天 我 不 能 来 。', pinyin: 'jīntiān wǒ bùnéng lái .', en: 'I can\u2019t come today (circumstances).' }, related: [{ hanzi: '能 来 吗', pinyin: 'néng lái ma', en: 'can you make it?' }] },
        { hanzi: '可 以', pinyin: 'kěyǐ', en: 'may / permission', example: { hanzi: '这 里 可 以 吸 烟 吗 ？', pinyin: 'zhèlǐ kěyǐ xīyān ma ?', en: 'May I smoke here?' }, related: [{ hanzi: '可 以 进 吗', pinyin: 'kěyǐ jìn ma', en: 'may I come in?' }] },
        { hanzi: '游 泳', pinyin: 'yóuyǒng', en: 'to swim', example: { hanzi: '我 弟 弟 会 游 泳 。', pinyin: 'wǒ dìdi huì yóuyǒng .', en: 'My younger brother can swim.' }, related: [{ hanzi: '会 游 泳', pinyin: 'huì yóuyǒng', en: 'learned to swim' }] },
        { hanzi: '开 车', pinyin: 'kāichē', en: 'to drive', example: { hanzi: '你 会 开 车 吗 ？', pinyin: 'nǐ huì kāichē ma ?', en: 'Can you drive?' }, related: [{ hanzi: '开 得 快', pinyin: 'kāi de kuài', en: 'drives fast (HSK 4 preview)' }] },
        { hanzi: '打 (电 话 / 球)', pinyin: 'dǎ', en: 'to hit / play (ball) / make (a call)', example: { hanzi: '我 会 打 篮 球 。', pinyin: 'wǒ huì dǎ lánqiú .', en: 'I can play basketball.' }, related: [{ hanzi: '打 电 话', pinyin: 'dǎ diànhuà', en: 'make a phone call' }] },
        { hanzi: '吸 烟', pinyin: 'xīyān', en: 'to smoke', example: { hanzi: '这 里 不 能 吸 烟 。', pinyin: 'zhèlǐ bùnéng xīyān .', en: 'No smoking here (not allowed).' }, related: [{ hanzi: '禁 止 吸 烟', pinyin: 'jìnzhǐ xīyān', en: 'smoking forbidden (sign)' }] },
        { hanzi: '应 该', pinyin: 'yīnggāi', en: 'should / ought to', example: { hanzi: '你 应 该 早 点 儿 睡 。', pinyin: 'nǐ yīnggāi zǎo diǎnr shuì .', en: 'You should sleep earlier.' }, related: [{ hanzi: '不 应 该', pinyin: 'bù yīnggāi', en: 'shouldn\u2019t' }] },
        { hanzi: '试 一 试', pinyin: 'shì yi shì', en: 'give it a try', example: { hanzi: '我 可 以 试 一 试 吗 ？', pinyin: 'wǒ kěyǐ shì yi shì ma ?', en: 'May I give it a try?' }, related: [{ hanzi: '试 试', pinyin: 'shìshi', en: 'try a bit (doubled)' }] },
        { hanzi: '问 题', pinyin: 'wèntí', en: 'question / problem', measureWord: '个', example: { hanzi: '没 有 问 题 ！', pinyin: 'méiyǒu wèntí !', en: 'No problem!' }, related: [{ hanzi: '问 一 个 问 题', pinyin: 'wèn yí ge wèntí', en: 'ask a question' }] },
        { hanzi: '帮 忙', pinyin: 'bāngmáng', en: 'to help (out)', example: { hanzi: '你 能 帮 我 一 个 忙 吗 ？', pinyin: 'nǐ néng bāng wǒ yí ge máng ma ?', en: 'Can you do me a favor?' }, related: [{ hanzi: '帮 助', pinyin: 'bāngzhù', en: 'to help (formal)' }] },
        { hanzi: '一 定', pinyin: 'yídìng', en: 'definitely / must (promise)', example: { hanzi: '我 一 定 会 来 。', pinyin: 'wǒ yídìng huì lái .', en: 'I will definitely come.' }, related: [{ hanzi: '一 定 要', pinyin: 'yídìng yào', en: 'absolutely must' }] },
    ],

    characters: [
        { hanzi: '会', pinyin: 'huì', en: 'can (learned)', components: '人 + 云', mnemonic: 'A PERSON above CLOUDS — skills lift you. 会 also means "will" (a learned certainty about the future): 明天会下雨.' },
        { hanzi: '能', pinyin: 'néng', en: 'can (ability)', components: 'a bear-like power drawing', mnemonic: 'The original picture was a BEAR — raw physical power. 能 is the strength-and-circumstance can.' },
        { hanzi: '可', pinyin: 'kě', en: 'may (in 可以)', components: '口(mouth) + 丁', mnemonic: 'A MOUTH granting something — permission passes through the mouth: 可以, 可是 (but), 同意.' },
        { hanzi: '吸', pinyin: 'xī', en: 'to inhale (smoke)', components: '口(mouth) + 及', mnemonic: 'MOUTH + reach — the mouth reaching for smoke. 吸烟 = inhale-smoke.' },
        { hanzi: '该', pinyin: 'gāi', en: 'ought (in 应该)', components: '讫(speech) + 亥', mnemonic: 'SPEECH + sound — duty is something SAID to you. 应该 = the should of expectation.' },
        { hanzi: '忙', pinyin: 'máng', en: 'busy', components: '忄(heart) + 亡', mnemonic: 'HEART + lost — when you are busy, your heart is lost. The 忄 radical marks feelings: 忙 快 怕.' },
    ],

    pronunciation: [
        { hanzi: '会 vs 能', pinyin: 'huì · néng', toneNote: '4 vs 2 — the meaning split is total: 会 learned, 能 possible. 听력 loves the swap.', en: 'The exam\u2019s favourite can-pair.' },
        { hanzi: '可 以', pinyin: 'kěyǐ', toneNote: '3-3 sandhi! kěyǐ is SAID kéyǐ — write 3-3, say 2-3.', en: 'The hidden sandhi in the permission word.' },
        { hanzi: '应 该', pinyin: 'yīnggāi', toneNote: '1-1 — two flat plateaus; the 该 stays level.', en: 'Should = level voice.' },
        { hanzi: '吸 烟', pinyin: 'xīyān', toneNote: '1-1: keep both flat; the q-sound of x is a smile-wide sh.', en: 'No smoking signs read this aloud.' },
        { hanzi: '没 问 题', pinyin: 'méi wèntí', toneNote: '2-4-2: the 题 rises at the end of "no problem!"', en: 'The friendly guarantee.' },
        { hanzi: '一 定', pinyin: 'yídìng', toneNote: '一 sandhi: yí before 4th (定). And it keeps the promise-music.', en: 'definitely = yídìng.' },
    ],

    grammar: {
        rule: 'Three cans: 会 = learned skill (我会说汉语), 能 = ability or circumstance (今天我不能来), 可以 = permission (这里可以吸烟吗？). All three take a BARE verb after them, and negation is 不会/不能/不可以 — each with its own nuance.',
        explanation: 'English collapses three ideas into "can"; Chinese separates them, and the exam tests the split. 会 is the skill you LEARNED — swimming, driving, speaking: 我会游泳 means I acquired the ability; its negation 不会 means never learned. 能 is possibility granted by body or circumstance: 我能吃三十个饺子 (I can physically eat 30 dumplings), 今天我不能来 (circumstances prevent me); its negation 不能 blocks the action. 可以 is permission from rules or the host: 这里可以吸烟吗？; 不能 answers it (不可以/不行), and 可以…吗 is the polite request frame. All three modals take a bare verb — 我会游泳 never conjugates, and two modals never stack (想会 is wrong; 想学会 works — want-to-learn). The bracket rule from A1 holds: negation wraps the MODAL (我不能去), and the polite favor frame is 你能不能帮我一个忙？One nuance: 对不会来的人说你能来吗？ is rude — permission and ability live in different questions.',
        examples: [
            { hanzi: '我 会 说 汉 语 。', pinyin: 'wǒ huì shuō Hànyǔ .', en: 'I can speak Chinese.', breakdown: ['会 = learned skill', '说 汉语 = bare verb + object', 'no conjugation anywhere'] },
            { hanzi: '今 天 我 不 能 来 。', pinyin: 'jīntiān wǒ bùnéng lái .', en: 'I can\u2019t come today.', breakdown: ['能 = circumstance', 'negation wraps the MODAL', '来 bare after'] },
            { hanzi: '这 里 可 以 吸 烟 吗 ？', pinyin: 'zhèlǐ kěyǐ xīyān ma ?', en: 'May I smoke here?', breakdown: ['可以 = permission', '…吗 = the polite question', '回答: 可以 / 不行'] },
            { hanzi: '你 会 游 泳 吗 ？ —— 不 会 ， 我 没 学 过 。', pinyin: 'nǐ huì yóuyǒng ma ? —— bú huì , wǒ méi xué guo .', en: 'Can you swim? — No, I never learned.', breakdown: ['会-question', '不会 = never acquired', '过 previews experience'] },
            { hanzi: '你 能 不 能 帮 我 一 个 忙 ？', pinyin: 'nǐ néng bùnéng bāng wǒ yí ge máng ?', en: 'Can you do me a favor?', breakdown: ['A-not-A with 能', '帮…忙 = the favor frame', 'the polite ask'] },
            { hanzi: '你 应 该 早 点 儿 睡 。', pinyin: 'nǐ yīnggāi zǎo diǎnr shuì .', en: 'You should sleep earlier.', breakdown: ['应该 = should', '早点儿 = a bit early', 'bare verb 睡'] },
        ],
        commonMistakes: [
            'Using 会 for permission: 我会进来吗？ — WRONG. Permission is 可以/能: 我可以进来吗？ 会 only covers learned skills.',
            'Stacking modals: 我想要会能游泳 — WRONG. One modal per verb; 想学会游泳 (want-to-learn-to-swim) is the correct chain.',
            'Negating 会-circumstances: 今天我会不来 — WRONG. Circumstance-blocked is 不能: 今天我不能来. 会不来 means "will (surprisingly) not come".',
            'Forgetting the bare verb: 我会说汉语的 — the 的 trails off. After a modal the verb is naked: 会说汉语. Nothing attaches.',
        ],
    },

    patterns: [
        { type: 'Learned skill', hanzi: '会 + verb', pinyin: 'wǒ huì yóuyǒng .', en: 'I acquired this skill' },
        { type: 'Ability/circumstance', hanzi: '能 + verb', pinyin: 'jīntiān wǒ bùnéng lái .', en: 'body/circumstance allows (or not)' },
        { type: 'Permission', hanzi: '可以 + verb + 吗 ？', pinyin: 'zhèlǐ kěyǐ xīyān ma ?', en: 'asking the rules or the host' },
        { type: 'Polite request', hanzi: '能 不 能 … ？', pinyin: 'néng bùnéng bāng wǒ … ?', en: 'A-not-A softener' },
        { type: 'Advice', hanzi: '应 该 + verb', pinyin: 'nǐ yīnggāi zǎo diǎnr shuì .', en: 'should — expectation' },
        { type: 'Promise', hanzi: '一 定 会 …', pinyin: 'wǒ yídìng huì lái .', en: 'definitely will (learned certainty)' },
    ],

    sentenceBuilding: [
        { hanzi: '我 会 游 泳 。', pinyin: 'wǒ huì yóuyǒng .', en: 'I can swim.' },
        { hanzi: '我 会 游 泳 ， 但 是 我 不 会 打 篮 球 。', pinyin: 'wǒ huì yóuyǒng , dànshì wǒ bú huì dǎ lánqiú .', en: 'I can swim, but I can\u2019t play basketball.' },
        { hanzi: '我 会 游 泳 ， 不 会 打 篮 球 —— 你 呢 ？', pinyin: '… nǐ ne ?', en: '… — and you?' },
        { hanzi: '今 天 晚 上 我 不 能 来 ， 因 为 我 得 上 班 。', pinyin: 'jīntiān wǎnshang wǒ bùnéng lái , yīnwèi wǒ děi shàngbān .', en: 'I can\u2019t come tonight because I have to work.' },
        { hanzi: '老 师 ， 我 可 以 试 一 试 吗 ？ —— 当 然 可 以 ， 没 问 题 ！', pinyin: 'lǎoshī , wǒ kěyǐ shì yi shì ma ? —— dāngrán kěyǐ , méi wèntí !', en: 'Teacher, may I try? — Of course, no problem!' },
    ],

    practice: [
        { instruction: 'Which can (learned)?', question: '我 ___ 说 汉 语 。', answer: '会 — a skill you learned' },
        { instruction: 'Which can (circumstance)?', question: '今 天 我 ___ 来 。', answer: '能 — circumstance blocks/allows' },
        { instruction: 'Which can (permission)?', question: '这 里 ___ 吸 烟 吗 ？', answer: '可以 — asking the rules' },
        { instruction: 'Negate the skill:', question: '我 ___ 游 泳 。 (never learned)', answer: '不 会 — 不会游泳' },
        { instruction: 'The polite favor frame:', question: '你 ___ 不 ___ 帮 我 一 个 忙 ？', answer: '能 … 能 — 能不能' },
        { instruction: 'The advice modal:', question: '你 ___ 睡 早 一 点 儿 。', answer: '应 该 — should' },
    ],

    translationPractice: [
        { en: 'I can speak Chinese.', hanzi: '我 会 说 汉 语 。', pinyin: 'wǒ huì shuō Hànyǔ .' },
        { en: 'I can\u2019t come today.', hanzi: '今 天 我 不 能 来 。', pinyin: 'jīntiān wǒ bùnéng lái .' },
        { en: 'May I smoke here? — No.', hanzi: '这 里 可 以 吸 烟 吗 ？ —— 不 行 。', pinyin: 'zhèlǐ kěyǐ xīyān ma ? —— bùxíng .' },
        { en: 'Can you drive?', hanzi: '你 会 开 车 吗 ？', pinyin: 'nǐ huì kāichē ma ?' },
        { en: 'You should sleep earlier.', hanzi: '你 应 该 早 点 儿 睡 。', pinyin: 'nǐ yīnggāi zǎo diǎnr shuì .' },
        { en: 'I will definitely come.', hanzi: '我 一 定 会 来 。', pinyin: 'wǒ yídìng huì lái .' },
    ],

    reverseTranslation: [
        { hanzi: '我 弟 弟 不 会 游 泳 。', pinyin: 'wǒ dìdi bú huì yóuyǒng .', en: 'My younger brother can\u2019t swim (never learned).' },
        { hanzi: '老 师 ， 我 可 以 进 来 吗 ？', pinyin: 'lǎoshī , wǒ kěyǐ jìnlái ma ?', en: 'Teacher, may I come in?' },
        { hanzi: '你 能 帮 我 一 个 忙 吗 ？', pinyin: 'nǐ néng bāng wǒ yí ge máng ma ?', en: 'Can you do me a favor?' },
        { hanzi: '明 天 会 下 雨 吗 ？', pinyin: 'míngtiān huì xià yǔ ma ?', en: 'Will it rain tomorrow? (会 = will, prediction)' },
    ],

    register: {
        casual: '能 来 不 ？ — the clipped A-not-A of friends (不 alone).',
        polite: '老 师 ， 我 可 以 问 一 个 问 题 吗 ？ — 可以…吗 with a title.',
        formal: '未 经 允 许 ， 不 得 入 内 。 — the written prohibition (不得 = must-not; signs only).',
    },

    culture: 'The three cans encode Chinese social physics: 会 is about FACE (skills you learned can be praised — 你汉语说得真好！), 能 is about SITUATION (refusing with 不能来 blames circumstances, never the person — the polite no), and 可以 is about RULES and HOSTS (the guest asks 可以…吗, the host grants 可以/请便). Note also the grammar of Chinese "can" in signs: 禁止吸烟 (forbidden) is colder than 请勿吸烟 (please-refrain) — public language grades its commands, and HSK 2 listening plays these announcements constantly.',

    freeProduction: 'Record a skills-and-rules interview (8–10 lines): three 会 skills (我会…×3), one 不会 admission, one 能-circumstance refusal with 因为, one 可以…吗 permission question and its answer, one 应该 advice, and a promise with 一定会. Then flip roles and interview a partner — count their 会 skills.',

    miniTest: [
        { question: 'I LEARNED to swim:', options: ['我 能 游 泳 。', '我 会 游 泳 。', '我 可 以 游 泳 。', '我 应 该 游 泳 。'], answer: '我 会 游 泳 。 — learned skill = 会' },
        { question: 'Circumstances block me today:', options: ['今 天 我 不 会 来 。', '今 天 我 不 能 来 。', '今 天 我 不 可 以 来 。', '今 天 我 不 应 该 来 。'], answer: '今 天 我 不 能 来 。 — circumstance = 能' },
        { question: 'Ask permission to smoke:', options: ['我 会 吸 烟 吗 ？', '我 能 吸 烟 吗 吗 ？', '这 里 可 以 吸 烟 吗 ？', '我 应 该 吸 烟 吗 ？'], answer: '这 里 可 以 吸 烟 吗 ？ — permission = 可以' },
        { question: 'The negation of 会:', options: ['没 会', '不 会', '别 会', '没 有 会'], answer: '不 会 — 不会 = never learned' },
        { question: 'After a modal, the verb is:', options: ['conjugated', 'bare (infinitive-like)', 'doubled', 'dropped'], answer: 'bare (infinitive-like) — modals take the naked verb' },
    ],

    review: [
        'The food lecture\u2019s 要/想 modals already used the bare-verb bracket — 会/能/可以 complete the HSK-2 modal set.',
        'Next: comparison — 过 (experience) and 比 (than), with 有点儿 vs 一点儿 (the B2-style nuance pair at HSK 2).',
    ],

    traps: [
        '会 = learned, 能 = possible, 可以 = permitted. The exam swaps them in listening: 我会来 (I know how/I will) vs 我能来 (I\u2019m able) vs 我可以来 (I may).',
        'One modal per verb: 想学会游泳 works (want + learn), 想要会能游泳 is modal soup.',
        'Negation wraps the MODAL: 我不能来 — never 我能不来 for "can\u2019t" (that means "can choose-not-to").',
        '对不会的人问能吗 is rude: ability questions (会吗) ask skills; permission questions (可以吗) ask rules. Match the modal to the question.',
    ],

    homework: {
        intro: 'The three cans, the advice modal, and the favor frame — every item is one exam dialogue.',
        translation: [
            { prompt: 'I can speak Chinese (learned).', answer: '我 会 说 汉 语 。', alt: ['我会说汉语。'], explanation: '会 = learned skill; the verb 说 stays bare.' },
            { prompt: 'I can\u2019t come today (circumstances).', answer: '今 天 我 不 能 来 。', alt: ['我今天不能来。'], explanation: '能 = circumstance; negation wraps the modal: 不能.' },
            { prompt: 'May I smoke here?', answer: '这 里 可 以 吸 烟 吗 ？', alt: ['这里可以吸烟吗？'], explanation: '可以…吗 asks the rules; answer: 可以 / 不行.' },
            { prompt: 'You should sleep earlier.', answer: '你 应 该 早 点 儿 睡 。', alt: ['你应该早点儿睡。'], explanation: '应该 + bare verb; 早点儿 = a bit earlier.' },
            { prompt: 'Can you do me a favor?', answer: '你 能 不 能 帮 我 一 个 忙 ？', alt: ['你能帮我一个忙吗？'], explanation: 'A-not-A (能不能) + the 帮…忙 favor frame.' },
            { prompt: 'I will definitely come.', answer: '我 一 定 会 来 。', alt: ['我一定会来。'], explanation: '一定 + 会 = the learned-certainty promise.' },
        ],
        blanks: [
            { prompt: '我 ___ 游 泳 。 (learned skill)', answer: '会', explanation: '会 + bare verb.' },
            { prompt: '今 天 我 不 ___ 来 。 (circumstance)', answer: '能', explanation: '不能 = circumstance-blocked.' },
            { prompt: '这 里 可 以 ___ 烟 吗 ？ (smoke)', answer: '吸', explanation: '可以 + bare verb 吸烟.' },
            { prompt: '你 ___ 该 早 点 儿 睡 。', answer: '应', explanation: '应该 = should.' },
            { prompt: '你 能 不 能 帮 我 一 个 ___ ？ (favor)', answer: '忙', explanation: '帮…忙 = the favor frame.' },
            { prompt: '我 一 定 ___ 来 。 (will definitely)', answer: '会', explanation: '一定会 = the promise form.' },
        ],
        corrections: [
            { prompt: '我 可 以 游 泳 （我 learned last year）.', answer: '我 会 游 泳 。', explanation: 'How the mistake happens: one can for all. Why it does not work: learned skills take 会; 可以 is permission. How to fix it: 我会游泳.' },
            { prompt: '今 天 我 不 会 来 （circumstances）.', answer: '今 天 我 不 能 来 。', explanation: 'How the mistake happens: 会 as all-purpose. Why it does not work: 会不来 reads "will (surprisingly) not come"; circumstance-blocked takes 不能. How to fix it: 不能来.' },
            { prompt: '这 里 会 吸 烟 吗 ？', answer: '这 里 可 以 吸 烟 吗 ？', explanation: 'How the mistake happens: 会 for rules. Why it does not work: 会 asks skills/prediction; permission asks 可以. How to fix it: 可以…吗.' },
            { prompt: '我 想 要 会 能 游 泳 。', answer: '我 想 学 会 游 泳 。', explanation: 'How the mistake happens: stacking modals. Why it does not work: one modal per verb — chain instead: 想 + 学会 (learn-to). How to fix it: 想学会游泳.' },
            { prompt: '你 不 能 帮 我 吗 的 帮 我 。', answer: '你 能 不 能 帮 我 ？', explanation: 'How the mistake happens: re-stacking fragments. Why it does not work: the A-not-A frame is complete by itself. How to fix it: 能不能帮我(一个忙)？' },
        ],
        writing: {
            task: 'Write your ability card (8–10 sentences): three 会 skills (我会…), one 不会 admission with a 学习 promise (我想学会…), one 能-circumstance refusal with 因为, one 可以…吗 permission question (at school/work) with the answer, one 应该 advice to a friend, and one 一定会 promise.',
            requirements: [
                'Three different 会 skills',
                'One 不会 + 我想学会… chain',
                'One 不能 refusal with 因为',
                'One 可以…吗 exchange (question + answer)',
                'One 应该 advice and one 一定会 promise',
            ],
            minWords: 55,
        },
        checklist: [
            'I split can three ways: 会 (learned) / 能 (circumstance) / 可以 (permission)',
            'I keep the verb BARE after every modal',
            'I wrap negation around the modal (不会 / 不能 / 不可以)',
            'I ask favors with 能不能帮我…忙？',
            'I give advice with 应该 and promise with 一定会',
            'I answer permission questions with 可以 / 不行',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The three-can map: 会 LEARNED (游泳, 开车, 说汉语) · 能 POSSIBLE (身体/ circumstances) · 可以 PERMITTED (rules, hosts). Swap = wrong nuance.',
            examples: [
                { hanzi: '我 会 游 泳 。 · 今 天 我 不 能 来 。 · 这 里 可 以 吸 烟 吗 ？', pinyin: 'the trio in one breath', en: 'skill · circumstance · permission' },
            ],
        },
        {
            explanation: 'The bare-verb bracket: modal + verb, nothing between or after-attached. 会说汉语 · 能来 · 可以进. The verb never conjugates, never doubles, never takes 的.',
            examples: [
                { hanzi: '我 会 开 车 。 · 我 能 来 。 · 你 可 以 进 。', pinyin: 'wǒ huì kāichē · wǒ néng lái · nǐ kěyǐ jìn', en: 'I can drive · I can come · you may enter' },
            ],
        },
        {
            explanation: 'Negation nuances: 不会 = never learned (会\u2019s only negation); 不能 = blocked/circumstance or prohibition; 不行 = the firm refusal; 不可以 = the rule\u2019s no.',
            examples: [
                { hanzi: '—— 可 以 吗 ？ —— 不 行 。', pinyin: 'kěyǐ ma ? — bùxíng .', en: 'May I? — No (firm).' },
            ],
        },
        {
            explanation: 'The favor frame: 帮 + person + 一个忙 — 你能不能帮我一个忙？ Answer: 没问题！/ 当然可以！',
            examples: [
                { hanzi: '你 能 不 能 帮 我 一 个 忙 ？ —— 没 问 题 ！', pinyin: 'nǐ néng bùnéng bāng wǒ yí ge máng ? —— méi wèntí !', en: 'Favor? — No problem!' },
            ],
        },
        {
            explanation: '会 as future-prediction: 明天会下雨 (it WILL rain) — learned-certainty about tomorrow. The exam contrasts 会下雨 (prediction) with 能下雨 (possibility).',
            examples: [
                { hanzi: '明 天 会 下 雨 。', pinyin: 'míngtiān huì xià yǔ .', en: 'It will rain tomorrow.' },
            ],
        },
        {
            explanation: 'The politeness ladder for asks: 你能…吗 (neutral) → 你能不能… (softer A-not-A) → 我可以…吗 (permission frame) → 不知能不能麻烦你… (very soft — HSK 4 preview).',
            examples: [
                { hanzi: '我 可 以 问 一 个 问 题 吗 ？', pinyin: 'wǒ kěyǐ wèn yí ge wèntí ma ?', en: 'May I ask a question?' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '会': { en: 'can (learned) / will', pron: 'huì', tone: '4', note: 'Skill or prediction: 会游泳 · 明天会下雨. Negation 不会.' },
        '能': { en: 'can (ability/circumstance)', pron: 'néng', tone: '2', note: 'Body/circumstance can. Negation 不能 = blocked.' },
        '可以': { en: 'may / permission', pron: 'kéyǐ (said)', tone: '3-3', note: 'Sandhi: said kéyǐ. Permission frame: 可以…吗？' },
        '应该': { en: 'should', pron: 'yīnggāi', tone: '1-1', note: 'The expectation-modal: 应该 + bare verb.' },
        '游泳': { en: 'to swim', pron: 'yóuyǒng', tone: '2-3', note: 'The classic 会 example.' },
        '吸烟': { en: 'to smoke', pron: 'xīyān', tone: '1-1', note: '禁止吸烟 = no-smoking signs.' },
        '帮忙': { en: 'to help out / do a favor', pron: 'bāngmáng', tone: '1-2', note: '帮 + person + 一个忙 — the favor frame.' },
        '问题': { en: 'question / problem', pron: 'wèntí', tone: '4-2', measure: '个', note: '没问题 = no problem — the friendly guarantee.' },
        '一定': { en: 'definitely', pron: 'yídìng', tone: '2-4', note: '一 sandhi: yídìng. 一定会 = the promise.' },
        '试试': { en: 'try a bit', pron: 'shìshi', tone: '4-neutral', note: 'Verb-doubling softens: 试一试 / 试试.' },
        '当然': { en: 'of course', pron: 'dāngrán', tone: '1-2', note: '当然可以！= Of course you may!' },
        '开车': { en: 'to drive', pron: 'kāichē', tone: '1-1', note: '会开车 = can drive (learned).' },
    },
};

// ── HSK 2 · Experience & Comparison ─────────────────────────────────────────
const h2Compare: StaticChineseLesson = {
    title: 'Experience & Comparison',
    objective: 'Talk about life experience with 过 (我去过中国), compare with 比 (北京比上海大), grade with 一点儿 vs 有点儿, and measure sameness with 一样/差不多 — the A-not-A of quantity that HSK 2 reading lives on.',

    vocabulary: [
        { hanzi: '过', pinyin: 'guo', en: 'experience particle (have ever…)', example: { hanzi: '我 去 过 中 国 。', pinyin: 'wǒ qù guo Zhōngguó .', en: 'I have been to China.' }, related: [{ hanzi: '没 … 过', pinyin: 'méi … guo', en: 'never have …ed' }] },
        { hanzi: '比', pinyin: 'bǐ', en: 'than (comparison)', example: { hanzi: '北 京 比 上 海 大 。', pinyin: 'Běijīng bǐ Shànghǎi dà .', en: 'Beijing is bigger than Shanghai.' }, related: [{ hanzi: '比 较', pinyin: 'bǐjiào', en: 'relatively / compare' }] },
        { hanzi: '一 点 儿', pinyin: 'yìdiǎnr', en: 'a little (more/less — the adjuster)', example: { hanzi: '便 宜 一 点 儿 。', pinyin: 'piányi yìdiǎnr .', en: 'a bit cheaper.' }, related: [{ hanzi: '快 一 点', pinyin: 'kuài yìdiǎn', en: 'a bit faster' }] },
        { hanzi: '有 点 儿', pinyin: 'yǒudiǎnr', en: 'a bit (too — before negative adjectives)', example: { hanzi: '有 点 儿 贵 。', pinyin: 'yǒudiǎnr guì .', en: 'It\u2019s a bit (too) expensive.' }, related: [{ hanzi: '有 点 儿 累', pinyin: 'yǒudiǎnr lèi', en: 'a bit tired' }] },
        { hanzi: '差 不 多', pinyin: 'chàbuduō', en: 'almost / about the same', example: { hanzi: '我 们 差 不 多 大 。', pinyin: 'wǒmen chàbuduō dà .', en: 'We\u2019re about the same age.' }, related: [{ hanzi: '差 不 多 了', pinyin: 'chàbuduō le', en: 'it\u2019s about done' }] },
        { hanzi: '一 样', pinyin: 'yíyàng', en: 'the same', example: { hanzi: '我 们 一 样 大 。', pinyin: 'wǒmen yíyàng dà .', en: 'We\u2019re equally old/big.' }, related: [{ hanzi: '跟 … 一 样', pinyin: 'gēn … yíyàng', en: 'same as…' }] },
        { hanzi: '觉 得', pinyin: 'juéde', en: 'to feel / think (opinion)', example: { hanzi: '我 觉 得 很 好 。', pinyin: 'wǒ juéde hěn hǎo .', en: 'I think it\u2019s good.' }, related: [{ hanzi: '你 觉 得 呢', pinyin: 'nǐ juéde ne', en: 'what do you think?' }] },
        { hanzi: '最', pinyin: 'zuì', en: 'most (-est)', example: { hanzi: '北 京 最 大 。', pinyin: 'Běijīng zuì dà .', en: 'Beijing is the biggest.' }, related: [{ hanzi: '最 好', pinyin: 'zuìhǎo', en: 'the best' }] },
        { hanzi: '次', pinyin: 'cì', en: 'time (occurrence measure)', measureWord: undefined, example: { hanzi: '我 去 过 两 次 。', pinyin: 'wǒ qù guo liǎng cì .', en: 'I\u2019ve been twice.' }, related: [{ hanzi: '第 一 次', pinyin: 'dì-yī cì', en: 'the first time' }] },
        { hanzi: '还', pinyin: 'hái', en: 'still / also / even more', example: { hanzi: '今 天 还 冷 。', pinyin: 'jīntiān hái lěng .', en: 'Today it\u2019s even colder.' }, related: [{ hanzi: '还 有', pinyin: 'háiyǒu', en: 'and also / there\u2019s still' }] },
        { hanzi: '更', pinyin: 'gèng', en: 'even more', example: { hanzi: '这 个 更 好 。', pinyin: 'zhè ge gèng hǎo .', en: 'This one is even better.' }, related: [{ hanzi: '更 大', pinyin: 'gèng dà', en: 'even bigger' }] },
        { hanzi: '以 前', pinyin: 'yǐqián', en: 'before / in the past', example: { hanzi: '以 前 我 不 会 游 泳 。', pinyin: 'yǐqián wǒ bú huì yóuyǒng .', en: 'Before, I couldn\u2019t swim.' }, related: [{ hanzi: '以 后', pinyin: 'yǐhòu', en: 'after / later' }] },
    ],

    characters: [
        { hanzi: '过', pinyin: 'guo', en: 'experience marker', components: '辶(walk) + 寸(inch)', mnemonic: 'WALK + measure — you walked THROUGH it once. 过 = been-there-done-that; also to cross (过马路 cross the street).' },
        { hanzi: '比', pinyin: 'bǐ', en: 'than / compare', components: 'two people side by side', mnemonic: 'TWO figures side-by-side — comparison is two people standing together. 比 also means to compete.' },
        { hanzi: '样', pinyin: 'yàng', en: 'kind / appearance', components: '木(tree) + 羊(sheep)', mnemonic: 'TREE + SHEEP — the sample cut from the tree, the same kind of flock: 一样 = one-kind = the same.' },
        { hanzi: '点', pinyin: 'diǎnr', en: 'a bit / point', components: '占 + 灬(four dots = fire)', mnemonic: 'The four dots are FIRE — a little spark is A BIT. 一点儿 = a small point.' },
        { hanzi: '差', pinyin: 'chà', en: 'to differ / poor (grade)', components: '羊(sheep) + 工(craft)', mnemonic: 'Sheep + work — uneven craftsmanship = 差 (lacking). 差不多 = the difference is not much.' },
        { hanzi: '觉', pinyin: 'jué', en: 'to feel (in 觉得)', components: 'cover + 见(see)', mnemonic: 'COVERED SEEING — feeling is seeing under the surface. 觉得 = the opinion verb.' },
    ],

    pronunciation: [
        { hanzi: '过', pinyin: 'guo', toneNote: 'Neutral as experience marker; as a full verb (cross) it is 4th: guò马路.', en: 'One character, two weights.' },
        { hanzi: '一 点 儿', pinyin: 'yìdiǎnr', toneNote: '一 sandhi: yí before 3rd? No — 一点儿 is yì (before 3rd it goes yì). erhua melts 儿 into the vowel.', en: 'The northern flavor.' },
        { hanzi: '有 点 儿', pinyin: 'yǒudiǎnr', toneNote: '3-3 sandhi: yóudiǎnr — SAY yóu (2nd) diǎnr.', en: 'Write 3-3, say 2-3 again.' },
        { hanzi: '差 不 多', pinyin: 'chàbuduō', toneNote: '不 neutral here: chà-bu-duō.', en: 'The softening of 不 in fixed words.' },
        { hanzi: '一 样', pinyin: 'yíyàng', toneNote: '一 → yí before 4th (样). Same chameleon.', en: 'yíyàng, not yīyàng.' },
        { hanzi: '最', pinyin: 'zuì', toneNote: '4th — sharp and final, like its meaning (the most).', en: 'The -est stomp.' },
    ],

    grammar: {
        rule: 'Experience: verb + 过 (我去过中国 — I have BEEN there). Comparison: A + 比 + B + adjective (北京比上海大) — the adjective never repeats 比\u2019s degree words. Adjust with 一点儿 (verb+adj+一点儿) and complain with 有点儿 + adjective. Equality: 跟…一样. Superlative: 最.',
        explanation: '过 is the experience passport: verb + 过 means you have done it at least once in your life — 我去过中国，我吃过北京烤鸭. Its negation and question both use 没: 我没去过 (never been), 你去过没有？ And it counts: 去过两次 (been twice, 次 the occurrence measure). Comparison runs A 比 B + adjective — 北京比上海大 — and the adjective stands NAKED: never 比更/很 inside the frame (很 disappears; 更 adds on top: 上海比南京更大 = even bigger). Adjusting degree splits by politeness logic: 一点儿 is the ADJUSTER (便宜一点儿 = a bit cheaper — what you ask for) while 有点儿 is the COMPLAINER (有点儿贵 = a bit TOO expensive — what you observe); 有点儿 never follows the verb. Equality uses 跟/和…一样: 他跟我一样大. The superlative 最 needs no 比: 最好, 最大, 我最喜欢北京. And 觉得 feeds opinions into all of it: 我觉得北京比上海好玩.',
        examples: [
            { hanzi: '我 去 过 两 次 上 海 。', pinyin: 'wǒ qù guo liǎng cì Shànghǎi .', en: 'I\u2019ve been to Shanghai twice.', breakdown: ['去 + 过 = life experience', '两次 = twice (occurrence measure)', 'place after'] },
            { hanzi: '北 京 比 上 海 大 。', pinyin: 'Běijīng bǐ Shànghǎi dà .', en: 'Beijing is bigger than Shanghai.', breakdown: ['A 比 B', 'bare adjective', 'no 很/很 inside'] },
            { hanzi: '这 个 有 点 儿 贵 。', pinyin: 'zhè ge yǒudiǎnr guì .', en: 'This is a bit too expensive.', breakdown: ['有点儿 = complainer', 'BEFORE the adjective', 'the shopping wince'] },
            { hanzi: '能 不 能 便 宜 一 点 儿 ？', pinyin: 'néng bùnéng piányi yìdiǎnr ?', en: 'Can it be a bit cheaper?', breakdown: ['一点儿 = adjuster', 'AFTER the adjective', 'the haggle\u2019s softener'] },
            { hanzi: '我 跟 你 一 样 大 。', pinyin: 'wǒ gēn nǐ yíyàng dà .', en: 'I\u2019m as old as you.', breakdown: ['跟…一样 = same-as frame', '一样 + adjective', 'equality, not superiority'] },
            { hanzi: '我 觉 得 北 京 的 秋 天 最 好 。', pinyin: 'wǒ juéde Běijīng de qiūtiān zuì hǎo .', en: 'I think Beijing\u2019s autumn is the best.', breakdown: ['觉得 = opinion verb', '最 = superlative', '的 possession: 北京的秋天'] },
        ],
        commonMistakes: [
            '很 inside 比: 北京比上海很大 — WRONG. The 比 frame takes a bare adjective; degree words (很/太) drop out. 很大 answers "how is it"; 比大 answers "which of the two".',
            '一点儿 before adjectives: 便宜一点儿 is the fix; 有点儿便宜 accidentally says "a bit too CHEAP". Direction: 有点儿 + negative-lean adjectives; adjective + 一点儿 for the wanted change.',
            '了 with 过 for experience: 我去了中国 twice in life-story context — experience uses 过 (去过); 了 reports the single completed trip. 我去了上海，我以前去过 — both can coexist for different jobs.',
            'Superlative with 比: 最 needs no 比 — 北京最大. Saying 最比 is a stutter, not grammar.',
        ],
    },

    patterns: [
        { type: 'Life experience', hanzi: 'verb + 过', pinyin: 'wǒ qù guo Zhōngguó .', en: 'have ever done it' },
        { type: 'Negate experience', hanzi: '没 + verb + 过', pinyin: 'wǒ méi qù guo .', en: 'never have done it' },
        { type: 'The 比 frame', hanzi: 'A 比 B + adj', pinyin: 'Běijīng bǐ Shànghǎi dà .', en: 'bare adjective only' },
        { type: 'The complainer', hanzi: '有 点 儿 + adj', pinyin: 'yǒudiǎnr guì .', en: 'a bit TOO…' },
        { type: 'The adjuster', hanzi: 'adj + 一 点 儿', pinyin: 'piányi yìdiǎnr .', en: 'a bit MORE (wanted)' },
        { type: 'Equality', hanzi: '跟 … 一 样 + adj', pinyin: 'wǒ gēn nǐ yíyàng dà .', en: 'as … as' },
        { type: 'Superlative', hanzi: '最 + adj', pinyin: 'zuì hǎo .', en: 'the -est, no 比 needed' },
    ],

    sentenceBuilding: [
        { hanzi: '我 去 过 上 海 。', pinyin: 'wǒ qù guo Shànghǎi .', en: 'I\u2019ve been to Shanghai.' },
        { hanzi: '我 去 过 两 次 上 海 ， 北 京 还 没 去 过 。', pinyin: '… Běijīng hái méi qù guo .', en: 'I\u2019ve been to Shanghai twice; Beijing I haven\u2019t yet.' },
        { hanzi: '大 家 都 说 北 京 比 上 海 大 ， 也 比 上 海 冷 。', pinyin: 'dàjiā dōu shuō Běijīng bǐ Shànghǎi dà , yě bǐ Shànghǎi lěng .', en: 'Everyone says Beijing is bigger than Shanghai, and colder too.' },
        { hanzi: '我 觉 得 上 海 的 东 西 有 点 儿 贵 ， 但 是 更 好 吃 。', pinyin: '… yǒudiǎnr guì , dànshì gèng hǎochī .', en: 'I think Shanghai\u2019s food is a bit pricey but even tastier.' },
        { hanzi: '总 之 ， 两 个 城 市 差 不 多 —— 你 去 过 哪 个 ？', pinyin: 'zǒngzhī , liǎng ge chéngshì chàbuduō —— nǐ qù guo nǎ ge ?', en: 'Anyway, the two cities are about the same — which have you been to?' },
    ],

    practice: [
        { instruction: 'Mark the experience:', question: '我 去 ___ 中 国 两 次 。', answer: '过 — 去过 = been there' },
        { instruction: 'Negate experience:', question: '我 ___ 去 过 北 京 。', answer: '没 — 没去过' },
        { instruction: 'Build 比:', question: '北 京 ___ 上 海 大 。', answer: '比 — A 比 B + adjective' },
        { instruction: 'The complainer:', question: '这 个 ___ 贵 。 (a bit too)', answer: '有 点 儿 — 有点儿贵' },
        { instruction: 'The adjuster:', question: '便 宜 ___ 。 (a bit cheaper)', answer: '一 点 儿 — after the adjective' },
        { instruction: 'Equality:', question: '我 跟 你 ___ 大 。', answer: '一 样 — 一样大' },
    ],

    translationPractice: [
        { en: 'I have been to China twice.', hanzi: '我 去 过 两 次 中 国 。', pinyin: 'wǒ qù guo liǎng cì Zhōngguó .' },
        { en: 'Beijing is colder than Shanghai.', hanzi: '北 京 比 上 海 冷 。', pinyin: 'Běijīng bǐ Shànghǎi lěng .' },
        { en: 'This one is a bit too expensive.', hanzi: '这 个 有 点 儿 贵 。', pinyin: 'zhè ge yǒudiǎnr guì .' },
        { en: 'Can it be a bit cheaper?', hanzi: '能 不 能 便 宜 一 点 儿 ？', pinyin: 'néng bùnéng piányi yìdiǎnr ?' },
        { en: 'I think this one is even better.', hanzi: '我 觉 得 这 个 更 好 。', pinyin: 'wǒ juéde zhè ge gèng hǎo .' },
        { en: 'I\u2019m as tall as my older brother.', hanzi: '我 跟 我 哥 哥 一 样 高 。', pinyin: 'wǒ gēn wǒ gēge yíyàng gāo .' },
    ],

    reverseTranslation: [
        { hanzi: '我 没 去 过 北 京 。', pinyin: 'wǒ méi qù guo Běijīng .', en: 'I have never been to Beijing.' },
        { hanzi: '今 天 比 昨 天 还 冷 。', pinyin: 'jīntiān bǐ zuótiān hái lěng .', en: 'Today is even colder than yesterday.' },
        { hanzi: '我 妈 做 的 菜 最 好 吃 。', pinyin: 'wǒ mā zuò de cài zuì hǎochī .', en: 'Mom\u2019s cooking is the most delicious.' },
        { hanzi: '这 两 个 手 机 差 不 多 。', pinyin: 'zhè liǎng ge shǒujī chàbuduō .', en: 'These two phones are about the same.' },
    ],

    register: {
        casual: '中 国 城 的 菜 好 吃 得 多 ！ — 好吃得多 (much tastier) is the spoken degree-booster.',
        polite: '我 觉 得 各 有 各 的 好 。 — each has its own merits (the polite comparison-out).',
        formal: '相 比 之 下 ， 北 方 更 冷 。 — 相比之下 = by comparison (written register).',
    },

    culture: 'Comparison is a politeness minefield in Chinese: friends deflect direct 比 praise about family (你家孩子比我家聪明！ answered with 哪里哪里！ — "where, where!" the traditional modest-deflection). 过-stories are social currency: 去过 conversation openers (你去过云南吗？) travel further than any opinion. And the food-comparison hierarchy is sacred: 妈妈做的菜最好吃 (mom\u2019s cooking is the best) is the ONE comparison everyone is expected to make — disagreeing with it is the real grammar error.',

    freeProduction: 'Record two cities you know (8–10 lines): state which you\u2019ve been to (去过) and how many times (两次), compare them with three 比 sentences (大/冷/好吃), one 有点儿 complaint, one 更 upgrade, one 一样/差不多 equalizer, and close with 最 (我觉得…最…). Then ask 你去过…吗？ and respond to the answer with 我也没去过 (me neither).',

    miniTest: [
        { question: 'I have BEEN to China (life experience):', options: ['我 去 了 中 国 。', '我 去 过 中 国 。', '我 过 去 中 国 。', '我 去 中 国 了 。'], answer: '我 去 过 中 国 。 — V+过 = life experience' },
        { question: '北京比上海大 — the adjective is:', options: ['带 很 (with 很)', 'bare — just 大', '带 最', 'repeated twice'], answer: 'bare — just 大 (no 很/太 in 比 frames)' },
        { question: '有点儿贵 means:', options: ['please make it cheaper', 'a bit too expensive', 'as expensive as', 'very expensive'], answer: 'a bit too expensive — the complainer' },
        { question: '便 宜 一 点 儿 means:', options: ['a bit too cheap', 'a bit cheaper (wanted)', 'very cheap', 'the cheapest'], answer: 'a bit cheaper (wanted) — the adjuster' },
        { question: 'The -est word is:', options: ['比', '很', '最', '过'], answer: '最 — superlative, no 比 needed' },
    ],

    review: [
        'The shopping haggle used 有点儿/一点儿 — this lecture explains WHY they sit on different sides of the adjective.',
        'Next: weather & feelings — 下雨/下雪 verbs, 很-states, 觉得 opinions, and 因为…所以… full sentences.',
    ],

    traps: [
        '比 frames take a BARE adjective: 比很大 ✗ → 比大 ✓. Degree words (很/太) never enter the 比 frame.',
        '有点儿 (complain, BEFORE adj) vs 一点儿 (adjust, AFTER adj): 有点儿贵 = a bit too pricey; 便宜一点儿 = make it a bit cheaper.',
        '过 for life experience, 了 for the single completed event: 去过 (been in my life) vs 去了 (went, this once).',
        '最 stands alone: 最大 — no 比, no 很. And 更 (even more) CAN enter 比: 比我更高.',
    ],

    homework: {
        intro: '过-experience, 比-comparison, and the degree pair — your life story, graded.',
        translation: [
            { prompt: 'I have been to China twice.', answer: '我 去 过 两 次 中 国 。', alt: ['我去过两次中国。'], explanation: 'V+过 + 次 (occurrence measure) + place.' },
            { prompt: 'Beijing is bigger than Shanghai.', answer: '北 京 比 上 海 大 。', alt: ['北京比上海大。'], explanation: 'A 比 B + bare adjective — no 很.' },
            { prompt: 'This one is a bit too expensive.', answer: '这 个 有 点 儿 贵 。', alt: ['这个有点儿贵。'], explanation: '有点儿 + adjective = the complaint.' },
            { prompt: 'Can it be a bit cheaper?', answer: '能 不 能 便 宜 一 点 儿 ？', alt: ['能不能便宜一点儿？'], explanation: 'adjective + 一点儿 = the requested adjustment.' },
            { prompt: 'I think this one is even better.', answer: '我 觉 得 这 个 更 好 。', alt: ['我觉得这个更好。'], explanation: '觉得 feeds opinions; 更 adds degree INSIDE or outside 比.' },
            { prompt: 'I\u2019m as tall as my older brother.', answer: '我 跟 我 哥 哥 一 样 高 。', alt: ['我跟我哥哥一样高。'], explanation: '跟…一样 + adjective — equality.' },
        ],
        blanks: [
            { prompt: '我 去 ___ 中 国 。 (life experience)', answer: '过', explanation: 'V+过 = been-there.' },
            { prompt: '北 京 ___ 上 海 大 。 (than)', answer: '比', explanation: 'A 比 B + adjective.' },
            { prompt: '这 个 有 点 儿 ___ 。 (expensive — complaint)', answer: '贵', explanation: '有点儿 + negative-lean adjective.' },
            { prompt: '快 ___ 。 (a bit faster — request)', answer: '一 点 儿', explanation: 'adjective + 一点儿.' },
            { prompt: '我 跟 你 一 ___ 大 。 (same)', answer: '样', explanation: '一样 = the same.' },
            { prompt: '我 觉 得 北 京 的 秋 天 最 ___ 。 (best)', answer: '好', explanation: '最 + adjective = superlative.' },
        ],
        corrections: [
            { prompt: '北 京 比 上 海 很 大 。', answer: '北 京 比 上 海 大 。', explanation: 'How the mistake happens: keeping 很 out of habit. Why it does not work: 比 frames take a bare adjective — degree words drop. How to fix it: 比上海大.' },
            { prompt: '便 宜 有 点 儿 。', answer: '有 点 儿 便 宜 。', explanation: 'How the mistake happens: mixing the pair\u2019s positions. Why it does not work: 有点儿 goes BEFORE the adjective (and complains); 一点儿 goes AFTER (and requests). How to fix it: 有点儿便宜 = a bit too cheap.' },
            { prompt: '我 去 了 中 国 三 次 。 (life story)', answer: '我 去 过 三 次 中 国 。', explanation: 'How the mistake happens: 了 for all pasts. Why it does not work: life experience takes 过. How to fix it: 去过三次.' },
            { prompt: '我 比 我 哥 哥 最 高 。', answer: '我 哥 哥 比 我 高 。 / 我 最 高 。', explanation: 'How the mistake happens: 最 + 比 together. Why it does not work: 最 is superlative (no 比); 比 is comparative (no 最). How to fix it: pick one frame.' },
            { prompt: '我 跟 你 一 样 。 (about height)', answer: '我 跟 你 一 样 高 。', explanation: 'How the mistake happens: dropping the compared quality. Why it does not work: 一样 needs the adjective it equates. How to fix it: 一样高/一样大.' },
        ],
        writing: {
            task: 'Write two-cities comparison (10–12 sentences): which you have been to (去过/没去过 + 次), three 比 comparisons (size/cold/food), one 有点儿 complaint, one 更 upgrade, one 跟…一样 equality, one 最 conclusion with 觉得.',
            requirements: [
                'Two 过 experience sentences (one negated with 没…过)',
                'Three 比 frames with bare adjectives',
                'One 有点儿 complaint + one adjective+一点儿 request',
                'One 跟…一样 and one 更',
                'One 最 conclusion with 我觉得',
            ],
            minWords: 60,
        },
        checklist: [
            'I mark life experience with V+过 and negate with 没…过',
            'I count occurrences with 次 (去过两次)',
            'I build A 比 B + bare adjective — no degree words inside',
            'I complain with 有点儿 + adj and request with adj + 一点儿',
            'I equalize with 跟…一样 and top with 最',
            'I feed opinions through 觉得',
        ],
    },
    checklistRemedial: [
        {
            explanation: '过 = the experience passport: V+过 = have ever done it. Negation 没+V+过; question V+过没有？ Counts with 次: 去过两次.',
            examples: [
                { hanzi: '我 去 过 中 国 。 · 我 没 坐 过 飞 机 。', pinyin: 'wǒ qù guo Zhōngguó · wǒ méi zuò guo fēijī', en: 'I\u2019ve been to China · I\u2019ve never flown' },
            ],
        },
        {
            explanation: 'The 比 frame: A 比 B + BARE adjective. 很/太 leave the room; 更 may enter for "even more".',
            examples: [
                { hanzi: '北 京 比 上 海 大 。 · 今 天 比 昨 天 更 冷 。', pinyin: 'Běijīng bǐ Shànghǎi dà · jīntiān bǐ zuótiān gèng lěng', en: 'Beijing is bigger than Shanghai · today even colder than yesterday' },
            ],
        },
        {
            explanation: 'The degree pair: 有点儿 + adjective = a bit TOO (complaint, before); adjective + 一点儿 = a bit MORE (request, after).',
            examples: [
                { hanzi: '有 点 儿 贵 。 · 便 宜 一 点 儿 。', pinyin: 'yǒudiǎnr guì · piányi yìdiǎnr', en: 'a bit too pricey · a bit cheaper please' },
            ],
        },
        {
            explanation: 'Equality and near-equality: 跟/和…一样 + adjective; 差不多 = about the same (stands alone or before adjectives).',
            examples: [
                { hanzi: '我 跟 你 一 样 大 。 · 我 们 差 不 多 。', pinyin: 'wǒ gēn nǐ yíyàng dà · wǒmen chàbuduō', en: 'I\u2019m as old as you · we\u2019re about equal' },
            ],
        },
        {
            explanation: 'Superlative 最: no 比, no 很 — 最 + adjective directly: 最好, 最大, 我最喜欢北京.',
            examples: [
                { hanzi: '妈 妈 做 的 菜 最 好 吃 。', pinyin: 'māma zuò de cài zuì hǎochī .', en: 'Mom\u2019s cooking is the best.' },
            ],
        },
        {
            explanation: '觉得 + opinion feeds every frame: 我觉得这个比那个好 — the opinion verb takes a full clause.',
            examples: [
                { hanzi: '我 觉 得 这 个 比 那 个 好 。', pinyin: 'wǒ juéde zhè ge bǐ nà ge hǎo .', en: 'I think this one beats that one.' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '过': { en: 'experience marker / to cross', pron: 'guo / guò', tone: 'neutral / 4', note: 'V+过 = have ever; 过马路 = cross the street (4th).' },
        '次': { en: 'time (occurrence)', pron: 'cì', tone: '4', note: '去过两次; 第一次 = the first time.' },
        '觉得': { en: 'to feel / think', pron: 'juéde', tone: '2-neutral', note: 'The opinion verb: 我觉得… + full clause.' },
        '最': { en: 'most (-est)', pron: 'zuì', tone: '4', note: '最好/最大/最喜欢 — no 比 needed.' },
        '更': { en: 'even more', pron: 'gèng', tone: '4', note: '更好 = even better; works inside 比.' },
        '差不多': { en: 'about the same / almost', pron: 'chàbuduō', tone: '4-neutral-1', note: '不 neutral in the fixed word.' },
        '一样': { en: 'the same', pron: 'yíyàng', tone: '2-4', note: '跟…一样 + adjective.' },
        '以前': { en: 'before / in the past', pron: 'yǐqián', tone: '3-2', note: '以前不会 = couldn\u2019t before (pairs with 现在).' },
        '以后': { en: 'after / later', pron: 'yǐhòu', tone: '3-4', note: '以后再说 = talk about it later.' },
        '有点儿': { en: 'a bit (too)', pron: 'yǒudiǎnr', tone: '3-3-neutral', note: 'BEFORE the adjective; sandhi yóudiǎnr.' },
        '北京烤鸭': { en: 'Peking duck', pron: 'Běijīng kǎoyā', tone: '3-1-1', note: 'The 经典 过-experience food: 吃过北京烤鸭吗？' },
        '秋天': { en: 'autumn', pron: 'qiūtiān', tone: '1-1', note: '北京 的 秋 天 最 好 — the season of comparison essays.' },
    },
};

// ── HSK 2 · Weather & Feelings ──────────────────────────────────────────────
const h2Weather: StaticChineseLesson = {
    title: 'Weather & Feelings',
    objective: 'Report the sky with 下 (雨/雪) and the temperature with 冷/热, describe states with the 很-frame, give opinions with 觉得, and link cause to effect with 因为…所以… — the small-talk engine of every HSK 2 dialogue.',

    vocabulary: [
        { hanzi: '天 气', pinyin: 'tiānqì', en: 'weather', example: { hanzi: '今 天 天 气 怎 么 样 ？', pinyin: 'jīntiān tiānqì zěnmeyàng ?', en: 'How\u2019s the weather today?' }, related: [{ hanzi: '天 气 预 报', pinyin: 'tiānqì yùbào', en: 'weather forecast' }] },
        { hanzi: '下 雨', pinyin: 'xià yǔ', en: 'to rain (lit. drop-rain)', example: { hanzi: '下 雨 了 ！', pinyin: 'xià yǔ le !', en: 'It\u2019s raining (now)!' }, related: [{ hanzi: '下 雪', pinyin: 'xià xuě', en: 'to snow' }] },
        { hanzi: '冷', pinyin: 'lěng', en: 'cold', example: { hanzi: '今 天 很 冷 。', pinyin: 'jīntiān hěn lěng .', en: 'It\u2019s very cold today.' }, related: [{ hanzi: '热', pinyin: 'rè', en: 'hot' }] },
        { hanzi: '晴', pinyin: 'qíng', en: 'sunny / clear', example: { hanzi: '明 天 晴 。', pinyin: 'míngtiān qíng .', en: 'Tomorrow will be clear.' }, related: [{ hanzi: '阴', pinyin: 'yīn', en: 'overcast' }] },
        { hanzi: '因 为 … 所 以 …', pinyin: 'yīnwèi … suǒyǐ …', en: 'because … so …', example: { hanzi: '因 为 下 雨 ， 所 以 我 没 去 。', pinyin: 'yīnwèi xià yǔ , suǒyǐ wǒ méi qù .', en: 'Because it rained, I didn\u2019t go.' }, related: [{ hanzi: '所 以', pinyin: 'suǒyǐ', en: 'so / therefore' }] },
        { hanzi: '高 兴', pinyin: 'gāoxìng', en: 'happy / glad', example: { hanzi: '我 很 高 兴 。', pinyin: 'wǒ hěn gāoxìng .', en: 'I\u2019m very happy.' }, related: [{ hanzi: '开 心', pinyin: 'kāixīn', en: 'happy (lit. open-heart)' }] },
        { hanzi: '累', pinyin: 'lèi', en: 'tired', example: { hanzi: '我 有 点 儿 累 。', pinyin: 'wǒ yǒudiǎnr lèi .', en: 'I\u2019m a bit tired.' }, related: [{ hanzi: '困', pinyin: 'kùn', en: 'sleepy' }] },
        { hanzi: '觉 得', pinyin: 'juéde', en: 'to feel / think', example: { hanzi: '你 觉 得 这 部 电 影 怎 么 样 ？', pinyin: 'nǐ juéde zhè bù diànyǐng zěnmeyàng ?', en: 'How did you find the movie?' }, related: [{ hanzi: '我 觉 得 …', pinyin: 'wǒ juéde …', en: 'I think…' }] },
        { hanzi: '身 体', pinyin: 'shēntǐ', en: 'body / health', example: { hanzi: '你 身 体 好 吗 ？', pinyin: 'nǐ shēntǐ hǎo ma ?', en: 'How is your health?' }, related: [{ hanzi: '身 体 很 好', pinyin: 'shēntǐ hěn hǎo', en: 'in good health' }] },
        { hanzi: '风', pinyin: 'fēng', en: 'wind', example: { hanzi: '今 天 风 很 大 。', pinyin: 'jīntiān fēng hěn dà .', en: 'It\u2019s very windy today (wind is big).' }, related: [{ hanzi: '刮 风', pinyin: 'guā fēng', en: 'the wind blows' }] },
        { hanzi: ' 带', pinyin: 'dài', en: 'to bring / take along / wear', example: { hanzi: '带 一 把 伞 吧 。', pinyin: 'dài yì bǎ sǎn ba .', en: 'Take an umbrella.' }, related: [{ hanzi: '带 伞', pinyin: 'dài sǎn', en: 'carry an umbrella' }] },
        { hanzi: '伞', pinyin: 'sǎn', en: 'umbrella', measureWord: '把', example: { hanzi: '我 的 伞 在 哪 儿 ？', pinyin: 'wǒ de sǎn zài nǎr ?', en: 'Where is my umbrella?' }, related: [{ hanzi: '雨 伞', pinyin: 'yǔsǎn', en: 'umbrella (rain version)' }] },
    ],

    characters: [
        { hanzi: '雪', pinyin: 'xuě', en: 'snow', components: '雨(rain) + 彐(hand)', mnemonic: 'The RAIN radical 雨 on top — 雪 is rain\u2019s winter sibling. 雨-family: 雪 雾 霜 — all sky-water.' },
        { hanzi: '冷', pinyin: 'lěng', en: 'cold', components: '冫(ice) + 令', mnemonic: 'The ICE radical 冫 — two drops of frost on the left. Its twin 氵(water) marks liquids: 冷 has ice, 河 has water.' },
        { hanzi: '晴', pinyin: 'qíng', en: 'sunny/clear', components: '日(sun) + 青', mnemonic: 'The SUN radical 日 — 晴 is the sun\u2019s weather word. 日-family: 晴 春 晚 (time-of-day words).' },
        { hanzi: '累', pinyin: 'lèi', en: 'tired', components: '田(field) + 糸(silk)', mnemonic: 'FIELD + silk thread — tired from spinning in the fields. The feeling radical 忄 is absent; 累 is body-tired.' },
        { hanzi: '伞', pinyin: 'sǎn', en: 'umbrella', components: 'a person under a canopy', mnemonic: 'The character IS the picture: a canopy 人 with a handle. One of the oldest pictographs still obvious.' },
        { hanzi: '阴', pinyin: 'yīn', en: 'overcast / yin', components: '阝(hill) + 月(moon)', mnemonic: 'The MOON at the hill — moonlight blocked = overcast. 阴天 = a yin-sky day (and yes, yin-yang\u2019s yin).' },
    ],

    pronunciation: [
        { hanzi: '天 气', pinyin: 'tiānqì', toneNote: '1-4 — the plateau then the stomp.', en: 'The small-talk opener.' },
        { hanzi: '下 雨 了', pinyin: 'xià yǔ le', toneNote: '4-3-neutral: 雨 full-dips before 了\u2019s lightness.', en: 'The completed-weather announcement.' },
        { hanzi: '冷 vs 热', pinyin: 'lěng · rè', toneNote: '3 vs 4 — dip vs stomp; the antonym pair with opposite musics.', en: 'cold vs hot.' },
        { hanzi: '因 为 … 所 以 …', pinyin: 'yīnwèi … suǒyǐ …', toneNote: '1-4 … 3-3(said suóyǐ): the 3-3 sandhi lives in 所以.', en: 'The cause-effect music.' },
        { hanzi: '舒 服', pinyin: 'shūfu', toneNote: '服 neutral — SHU-fu light tail. 不舒服 = unwell.', en: 'The comfort word.' },
        { hanzi: '觉 得', pinyin: 'juéde', toneNote: '觉 reads jué here (2nd) — same character as jiào (sleep) in 睡觉!', en: 'The double-reading again.' },
    ],

    grammar: {
        rule: 'Weather verbs rain and snow with 下: 下雨了. States describe with the 很-frame (今天很冷 — never 是). Opinions run through 觉得. Cause-effect uses the pair 因为…所以… — both halves optional but elegant together.',
        explanation: 'Weather treats rain and snow as OBJECTS the sky drops: 下雨 (drop-rain), 下雪 (drop-snow), with 了 announcing the change: 下雨了！ (it has STARTED raining). Temperature and states use the adjective frame from A1 — 今天很冷 — where 很 is the obligatory filler, and the real degree lives in 太…了 (太冷了！). Feelings are the same frame: 我很高兴, 我有点儿累 (the complainer from the comparison lecture). Opinions route through 觉得: 我觉得今天很冷 (I FIND it cold). The cause-effect couple 因为…所以… links two full clauses: 因为下雨，所以我没去 — either half may drop (因为下雨，我没去 / 下雨了，所以我没去), but the exam rewards using both. Body talk is polite small talk: 你身体好吗？ answered 身体很好，你呢？ And the umbrella imperative uses 带: 带伞吧 (take an umbrella) — remember: in Chinese, BRING and TAKE are the same verb.',
        examples: [
            { hanzi: '今 天 天 气 很 好 。', pinyin: 'jīntiān tiānqì hěn hǎo .', en: 'The weather is great today.', breakdown: ['天气 = weather', '很 好 = the adjective frame', 'no 是 anywhere'] },
            { hanzi: '下 雨 了 ， 带 伞 吧 。', pinyin: 'xià yǔ le , dài sǎn ba .', en: 'It\u2019s raining — take an umbrella.', breakdown: ['下 雨 + 了 = started raining', '带 伞 = take umbrella', '吧 = the let\u2019s tone'] },
            { hanzi: '因 为 下 雪 ， 所 以 学 校 不 上 课 。', pinyin: 'yīnwèi xià xuě , suǒyǐ xuéxiào bú shàng kè .', en: 'Because it snowed, school is off.', breakdown: ['因为 = cause clause', '所以 = effect clause', '不 上 课 = no class'] },
            { hanzi: '我 有 点 儿 累 ， 想 回 家 。', pinyin: 'wǒ yǒudiǎnr lèi , xiǎng huí jiā .', en: 'I\u2019m a bit tired — I want to go home.', breakdown: ['有点儿 = complaint', '想 + verb = the wish', '回 家 = return home'] },
            { hanzi: '你 觉 得 北 京 的 冬 天 怎 么 样 ？', pinyin: 'nǐ juéde Běijīng de dōngtiān zěnmeyàng ?', en: 'What do you think of Beijing\u2019s winter?', breakdown: ['觉得 = opinion verb', '的 possession: 北京的冬天', '怎么样 = the open question'] },
            { hanzi: '风 太 大 了 ， 别 骑 车 了 。', pinyin: 'fēng tài dà le , bié qíchē le .', en: 'The wind is way too strong — don\u2019t bike.', breakdown: ['风 大 = windy (wind is BIG)', '别 = don\u2019t (prohibition)', '了 softens the command'] },
        ],
        commonMistakes: [
            'It is rain: 是雨 — WRONG. Weather drops its precipitation with 下: 下雨, 下雪. And wind BLOWS: 刮风 or 风很大 (wind is big) — never 是风.',
            'Using 是 for states: 今天是很冷 — WRONG. Weather/feelings take the 很-frame: 今天很冷. 是 stays with identity.',
            'Dropping 因为/所以 logic-mates: 因为下雨 links to 所以…; using 所以 alone to START a conversation-answer is fine, but inside one sentence keep the pair tidy.',
            '带 vs 拿: 带伞 = take along (for the journey); 拿伞 = grab it (right now, in hand). The exam tests the journey sense.',
        ],
    },

    patterns: [
        { type: 'Ask the weather', hanzi: '今 天 天 气 怎 么 样 ？', pinyin: 'jīntiān tiānqì zěnmeyàng ?', en: 'the small-talk opener' },
        { type: 'Report precipitation', hanzi: '下 雨 / 下 雪 (+ 了)', pinyin: 'xià yǔ le !', en: 'the sky drops things' },
        { type: 'Temperature state', hanzi: '今 天 很 冷 / 太 热 了', pinyin: 'jīntiān hěn lěng .', en: '很-frame; 太…了 for excess' },
        { type: 'Feelings', hanzi: '我 很 高 兴 / 有 点 儿 累', pinyin: 'wǒ hěn gāoxìng .', en: 'same frame, inner weather' },
        { type: 'Opinion', hanzi: '我 觉 得 …', pinyin: 'wǒ juéde jīntiān hěn lěng .', en: 'opinion takes a full clause' },
        { type: 'Cause-effect', hanzi: '因 为 … ， 所 以 …', pinyin: 'yīnwèi xià yǔ , suǒyǐ wǒ méi qù .', en: 'the two-clause couple' },
    ],

    sentenceBuilding: [
        { hanzi: '今 天 天 气 很 好 。', pinyin: 'jīntiān tiānqì hěn hǎo .', en: 'The weather is great today.' },
        { hanzi: '今 天 天 气 很 好 ， 我 们 去 公 园 吧 。', pinyin: '… wǒmen qù gōngyuán ba .', en: '… let\u2019s go to the park.' },
        { hanzi: '明 天 可 能 下 雨 ， 带 伞 吧 。', pinyin: 'míngtiān kěnéng xià yǔ , dài sǎn ba .', en: 'It might rain tomorrow — take an umbrella.' },
        { hanzi: '因 为 昨 天 太 冷 了 ， 我 没 有 去 跑 步 。', pinyin: 'yīnwèi zuótiān tài lěng le , wǒ méiyǒu qù pǎobù .', en: 'Because it was too cold yesterday, I skipped the run.' },
        { hanzi: '我 觉 得 春 天 最 好 —— 不 冷 不 热 ， 还 有 花 。', pinyin: 'wǒ juéde chūntiān zuì hǎo —— bù lěng bú rè , hái yǒu huā .', en: 'I think spring is best — neither cold nor hot, plus flowers.' },
    ],

    practice: [
        { instruction: 'Rain or snow — which verb?', question: '冬 天 常 常 ___ 。', answer: '下 雪 — the sky drops snow' },
        { instruction: 'The state frame:', question: '今 天 天 气 很 ___ 。 (good)', answer: '好 — 很好, never 是好' },
        { instruction: 'Started raining:', question: '___ 了 ！ 带 伞 吧 。', answer: '下 雨 — 下雨了 = it has started' },
        { instruction: 'The complaint degree:', question: '今 天 ___ 热 。 (way too hot)', answer: '太 … 了 — 太热了' },
        { instruction: 'The cause word:', question: '___ 下 雨 ， 我 没 去 。', answer: '因 为 — 因为…所以…' },
        { instruction: 'The opinion verb:', question: '你 ___ 今 天 怎 么 样 ？', answer: '觉 得 — 你觉得…' },
    ],

    translationPractice: [
        { en: 'How\u2019s the weather today? — It\u2019s snowing.', hanzi: '今 天 天 气 怎 么 样 ？ —— 下 雪 了 。', pinyin: 'jīntiān tiānqì zěnmeyàng ? —— xià xuě le .' },
        { en: 'It\u2019s very cold — take an umbrella.', hanzi: '天 气 很 冷 ， 带 伞 吧 。', pinyin: 'tiānqì hěn lěng , dài sǎn ba .' },
        { en: 'Because it rained, I didn\u2019t go.', hanzi: '因 为 下 雨 ， 所 以 我 没 去 。', pinyin: 'yīnwèi xià yǔ , suǒyǐ wǒ méi qù .' },
        { en: 'I\u2019m a bit tired today.', hanzi: '我 今 天 有 点 儿 累 。', pinyin: 'wǒ jīntiān yǒudiǎnr lèi .' },
        { en: 'I think spring is the best season.', hanzi: '我 觉 得 春 天 是 最 好 的 季 节 。', pinyin: 'wǒ juéde chūntiān shì zuì hǎo de jìjié .' },
        { en: 'The wind is too strong today.', hanzi: '今 天 风 太 大 了 。', pinyin: 'jīntiān fēng tài dà le .' },
    ],

    reverseTranslation: [
        { hanzi: '明 天 晴 ， 后 天 下 雨 。', pinyin: 'míngtiān qíng , hòutiān xià yǔ .', en: 'Tomorrow clear; the day after, rain.' },
        { hanzi: '我 身 体 很 好 ， 你 呢 ？', pinyin: 'wǒ shēntǐ hěn hǎo , nǐ ne ?', en: 'I\u2019m in good health — and you?' },
        { hanzi: '因 为 太 累 了 ， 我 很 早 就 睡 了 。', pinyin: 'yīnwèi tài lèi le , wǒ hěn zǎo jiù shuì le .', en: 'Because I was too tired, I slept very early.' },
        { hanzi: '别 忘 了 带 伞 ！', pinyin: 'bié wàng le dài sǎn !', en: 'Don\u2019t forget to take an umbrella!' },
    ],

    register: {
        casual: '今 儿 真 冷 ！ — Beijing-flavor: 今儿 (today) + 真 (really).',
        polite: '您 觉 得 今 天 天 气 怎 么 样 ？ — 您 + 觉得 = the polite small-talk.',
        formal: '据 天 气 预 报 ， 明 日 有 雨 。 — 据 forecastspeak: 明日 (written tomorrow), 有雨 (there will be rain).',
    },

    culture: 'Weather talk in China starts with the food clock: the aunt asks 吃了吗 then complains about the cold in the same breath. 北方 (the north) heats with 暖气 (central heating) from November — 南方 (the south) famously shivers without it, making 冷 vs 湿冷 (dry cold vs damp cold) a national debate. The umbrella rule is practical: 看天吃饭 (eat according to the sky) — delivery riders, street vendors and school pick-ups all move when 天气预报 says so. And because…所以 thinking is taught in primary school — Chinese essays are built on the pair, so the exam\u2019s writing graders look for it by name.',

    freeProduction: 'Record a weather-and-mood report (8–10 lines): today\u2019s weather (今天…, 下…了), temperature complaint (太冷了/太热了), what you therefore did or skipped (因为…所以…), your mood with 很/有点儿 (我很高兴 / 我有点儿累), one 觉得 opinion about your city\u2019s seasons (我觉得…最…), and one advice line (带伞吧/多穿点儿).',

    miniTest: [
        { question: 'It\u2019s raining (announcing the change):', options: ['是 雨 。', '下 雨 了 。', '有 雨 了 。', '雨 太 了 。'], answer: '下 雨 了 。 — the sky DROPS rain; 了 = it started' },
        { question: '今天很冷 — why 很?', options: ['it means very here', 'adjectives need a filler before them', '为了 polite', '因为 weather words are strong'], answer: 'adjectives need a filler before them (the 很-frame)' },
        { question: 'Because it rained, I didn\u2019t go:', options: ['因 为 下 雨 ， 所 以 我 没 去 。', '所 以 下 雨 ， 因 为 我 没 去 。', '下 雨 因 为 我 所 以 去 。', '因 为 我 没 去 ， 所 以 下 雨 。'], answer: '因 为 下 雨 ， 所 以 我 没 去 。 — cause first, effect second' },
        { question: '我有点儿累 means:', options: ['I\u2019m very tired', 'I\u2019m a bit too tired', 'I want to rest', 'I\u2019m not tired'], answer: 'I\u2019m a bit too tired — 有点儿 complains' },
        { question: 'The opinion verb is:', options: ['是', '有', '觉 得', '下'], answer: '觉 得 — opinions route through it' },
    ],

    review: [
        'The comparison lecture\u2019s 有点儿 returns as the feeling-complainer (有点儿累) — same rule, new adjectives.',
        '因为…所以… also closes the opinions lecture\u2019s loop: cause connectors are now complete for HSK 2.',
    ],

    traps: [
        'Weather DROPS: 下雨/下雪/刮风 (the wind blows). 是 never introduces weather: 今天下雨 ✓, 今天是雨 ✗.',
        'States take the 很-frame: 今天很冷 — 是 + adjective stays wrong forever.',
        '因为 and 所以 are a couple: 因为…所以… — but either may drop; both together is the exam-bonus form.',
        '带 = take along (journey); 拿 = grab (in hand). 带伞吧 is the journey advice.',
    ],

    homework: {
        intro: 'Sky verbs, the 很-frame, 觉得 opinions, and the 因为…所以… couple — weather as grammar practice.',
        translation: [
            { prompt: 'How\u2019s the weather today? — It\u2019s raining.', answer: '今 天 天 气 怎 么 样 ？ —— 下 雨 了 。', alt: ['今天天气怎么样？——下雨了。'], explanation: '怎么样 asks quality; 下雨了 announces the change.' },
            { prompt: 'It\u2019s very cold today.', answer: '今 天 很 冷 。', alt: ['今天很冷。'], explanation: '很-frame — 天气 may be dropped when context holds.' },
            { prompt: 'Because it snowed, school is off.', answer: '因 为 下 雪 ， 所 以 学 校 不 上 课 。', alt: ['因为下雪，所以学校不上课。'], explanation: 'Full 因为…所以… couple; 不上课 = no class (negated verb).' },
            { prompt: 'I\u2019m a bit tired — I want to go home.', answer: '我 有 点 儿 累 ， 想 回 家 。', alt: ['我有点儿累，想回家。'], explanation: '有点儿 complaint + 想 + verb wish.' },
            { prompt: 'I think Beijing\u2019s winter is too cold.', answer: '我 觉 得 北 京 的 冬 天 太 冷 了 。', alt: ['我觉得北京的冬天太冷了。'], explanation: '觉得 + full clause; 太…了 inside the opinion.' },
            { prompt: 'Take an umbrella — it might rain.', answer: '带 伞 吧 —— 明 天 可 能 下 雨 。', alt: ['带伞吧——明天可能下雨。'], explanation: '带 + object + 吧; 可能 = might (HSK 2 adverb).' },
        ],
        blanks: [
            { prompt: '今 天 下 ___ ， 带 伞 吧 。 (rain)', answer: '雨', explanation: '下雨 = drop-rain.' },
            { prompt: '北 京 的 冬 天 很 ___ 。 (cold)', answer: '冷', explanation: '很-frame for states.' },
            { prompt: '___ 为 太 热 了 ， 我 没 出 门 。', answer: '因', explanation: '因为 opens the cause clause.' },
            { prompt: '我 觉 ___ 今 天 很 晴 。', answer: '得', explanation: '觉得 = the opinion verb (juéde).' },
            { prompt: '风 太 ___ 了 ！ (big/strong)', answer: '大', explanation: 'Wind is BIG in Chinese: 风很大.' },
            { prompt: '我 有 点 儿 ___ ， 想 睡 觉 。 (sleepy-tired)', answer: '累', explanation: '累 = body-tired; 困 = sleepy.' },
        ],
        corrections: [
            { prompt: '今 天 是 很 冷 。', answer: '今 天 很 冷 。', explanation: 'How the mistake happens: English "it IS cold". Why it does not work: states take the 很-frame, never 是. How to fix it: 今天很冷.' },
            { prompt: '下 雨 了 吗 ？ —— 是 ， 下 雨 。', answer: '下 雨 了 吗 ？ —— 下 了 。 / 对 ， 下 了 。', explanation: 'How the mistake happens: answering with the bare weather. Why it does not work: confirmations echo the verb+了. How to fix it: 下了/对，下了.' },
            { prompt: '所 以 下 雨 ， 我 没 去 。', answer: '因 为 下 雨 ， 所 以 我 没 去 。', explanation: 'How the mistake happens: 所以 leading the cause. Why it does not work: 因为 introduces the CAUSE; 所以 introduces the RESULT. How to fix it: 因为下雨，所以…' },
            { prompt: '我 很 想 累 。', answer: '我 有 点 儿 累 。', explanation: 'How the mistake happens: 很 + everything. Why it does not work: 很 想 = really want; tiredness complains with 有点儿. How to fix it: 有点儿累.' },
            { prompt: '拿 伞 吧 ， 明 天 可 能 下 雨 。 (journey advice)', answer: '带 伞 吧 —— 明 天 可 能 下 雨 。', explanation: 'How the mistake happens: 拿 = grab. Why it does not work: taking things ALONG on a journey is 带. How to fix it: 带伞.' },
        ],
        writing: {
            task: 'Write a weather-and-mood diary (9–11 sentences): today\u2019s sky (晴/下雨/下雪), a 太…了 temperature complaint, one 因 为…所 以… consequence, your mood (很高兴/有点儿累), one 觉得 opinion about the seasons (我觉得…最…), and two advice lines with 带 (带伞/多穿点儿).',
            requirements: [
                'One 下 + precipitation with 了',
                'One 太…了 temperature complaint',
                'One full 因为…所以… couple',
                'Two feeling sentences (很 + one, 有点儿 + one)',
                'One 觉得 + 最 opinion and one 带 advice',
            ],
            minWords: 55,
        },
        checklist: [
            'I report weather with 下雨/下雪/刮风 + 了 for changes',
            'I describe states with the 很-frame — never 是',
            'I complain with 太…了 and feel with 很/有点儿',
            'I link cause and effect with 因为…所以…',
            'I give opinions through 觉得',
            'I advise with 带 (伞) and 别 (别忘带伞)',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The sky-verb family: 下雨, 下雪, 刮风 (the wind blows), 出太阳 (the sun comes out). Weather DROPS and BLOWS — 是 never introduces it.',
            examples: [
                { hanzi: '下 雨 了 。 · 刮 风 了 。 · 出 太 阳 了 。', pinyin: 'xià yǔ le · guā fēng le · chū tàiyáng le', en: 'It\u2019s raining · windy now · sunny now' },
            ],
        },
        {
            explanation: 'The temperature/state frame: 今天很冷/热 — 很 is the filler; real degree rides 太…了: 太冷了！',
            examples: [
                { hanzi: '今 天 很 冷 。 · 昨 天 太 热 了 ！', pinyin: 'jīntiān hěn lěng · zuótiān tài rè le !', en: 'Today cold · yesterday TOO hot' },
            ],
        },
        {
            explanation: '因为…所以…: cause clause first, effect clause second; either half may drop but the pair is the essay gold.',
            examples: [
                { hanzi: '因 为 下 雨 ， 所 以 我 没 去 。', pinyin: 'yīnwèi xià yǔ , suǒyǐ wǒ méi qù .', en: 'Because it rained, I didn\u2019t go.' },
            ],
        },
        {
            explanation: 'Feelings ride the same frame: 很高兴 / 很累 / 有点儿困 (a bit sleepy) — 有点儿 complains, 很 states.',
            examples: [
                { hanzi: '我 很 高 兴 。 · 我 有 点 儿 困 。', pinyin: 'wǒ hěn gāoxìng · wǒ yǒudiǎnr kùn', en: 'I\u2019m happy · I\u2019m a bit sleepy' },
            ],
        },
        {
            explanation: '觉得 opens opinions: 我觉得… + a full clause (天气/电影/城市). Follow-up: 你觉得呢？',
            examples: [
                { hanzi: '我 觉 得 秋 天 最 好 。 你 觉 得 呢 ？', pinyin: 'wǒ juéde qiūtiān zuì hǎo . nǐ juéde ne ?', en: 'I think autumn is best. What do you think?' },
            ],
        },
        {
            explanation: 'Advice with 带 and 别: 带伞吧 · 多穿点儿 (wear more) · 别忘 了带伞 — the weather-care phrases natives actually say.',
            examples: [
                { hanzi: '别 忘 了 带 伞 ， 多 穿 点 儿 ！', pinyin: 'bié wàng le dài sǎn , duō chuān diǎnr !', en: 'Don\u2019t forget the umbrella — dress warm!' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '天气': { en: 'weather', pron: 'tiānqì', tone: '1-4', note: '天气预报 = the forecast.' },
        '下雨': { en: 'to rain', pron: 'xià yǔ', tone: '4-3', note: '下 = drop; 了 announces the change: 下雨了.' },
        '下雪': { en: 'to snow', pron: 'xià xuě', tone: '4-3', note: 'Same 下-machine.' },
        '晴': { en: 'sunny / clear', pron: 'qíng', tone: '2', note: 'Forecast word: 明天晴.' },
        '阴': { en: 'overcast', pron: 'yīn', tone: '1', note: '阴天 = yin-sky day.' },
        '风': { en: 'wind', pron: 'fēng', tone: '1', note: '风很大 = windy (wind is BIG); 刮风 = the wind blows.' },
        '冷': { en: 'cold', pron: 'lěng', tone: '3', note: 'Ice radical 冫.' },
        '热': { en: 'hot', pron: 'rè', tone: '4', note: 'Also heat-the-food: 热饭.' },
        '舒服': { en: 'comfortable', pron: 'shūfu', tone: '1-neutral', note: '不 舒服 = unwell (body).' },
        '累': { en: 'tired', pron: 'lèi', tone: '4', note: 'Body-tired; 困 = sleepy.' },
        '身体': { en: 'body / health', pron: 'shēntǐ', tone: '1-3', note: '身体好吗？ = the health small-talk.' },
        '带': { en: 'to bring / take along', pron: 'dài', tone: '4', note: '带伞 = take an umbrella (journey sense).' },
        '伞': { en: 'umbrella', pron: 'sǎn', tone: '3', measure: '把', note: '一把伞 — 把 measures handled things.' },
        '可能': { en: 'might / possible', pron: 'kěnéng', tone: '3-2', note: '明天可能下雨 — the HSK-2 might.' },
        '多穿点儿': { en: 'dress warm (lit. wear more a bit)', pron: 'duō chuān diǎnr', tone: '1-1-3-2', note: 'The caring goodbye.' },
    },
};

export const CHINESE_A2_PART2: Record<string, StaticChineseLesson> = {
    '2:ability': h2Ability,
    '2:compare': h2Compare,
    '2:weather': h2Weather,
};

export const CHINESE_A2_PART2_EXTRAS: Record<string, { warmup?: WarmupItem[]; verbTables?: VerbTableBlock[]; useCases?: UseCaseBlock[]; shadowing?: ShadowingBlock }> = {
    '2:ability': {
        warmup: [
            { q: 'The three cans and their jobs?', a: '会 learned skill · 能 ability/circumstance · 可以 permission.' },
            { q: 'Negate each.', a: '不会 (never learned) · 不能 (blocked) · 不可以 (rule says no).' },
            { q: '可以 said aloud sounds like…?', a: 'kéyǐ — the 3-3 sandhi again.' },
            { q: 'The favor frame?', a: '你能不能帮我一个忙？' },
            { q: 'After a modal the verb is…?', a: 'BARE — 会说汉语, no conjugation, no attachments.' },
        ],
        verbTables: [
            {
                title: 'The three cans — side by side',
                rows: [
                    { label: 'learned skill', form: '我 会 游 泳 。', pron: 'wǒ huì yóuyǒng .' },
                    { label: 'circumstance', form: '今 天 我 不 能 来 。', pron: 'jīntiān wǒ bùnéng lái .' },
                    { label: 'permission', form: '这 里 可 以 吸 烟 吗 ？', pron: 'zhèlǐ kěyǐ xīyān ma ?' },
                    { label: 'advice', form: '你 应 该 睡 早 点 儿 。', pron: 'nǐ yīnggāi shuì zǎo diǎnr .' },
                    { label: 'promise', form: '我 一 定 会 来 。', pron: 'wǒ yídìng huì lái .' },
                ],
            },
            {
                title: 'The negation nuances',
                rows: [
                    { label: 'never learned', form: '我 不 会 游 泳 。', pron: 'wǒ bú huì yóuyǒng .' },
                    { label: 'blocked', form: '今 天 不 能 来 。', pron: 'jīntiān bùnéng lái .' },
                    { label: 'rule says no', form: '这 里 不 可 以 吸 烟 。', pron: 'zhèlǐ bù kěyǐ xīyān .' },
                    { label: 'firm refusal', form: '不 行 ！', pron: 'bùxíng !' },
                ],
            },
        ],
        useCases: [
            {
                word: '会 — skill AND prediction',
                uses: [
                    { use: 'learned skill', examples: [{ fr: '我 会 开 车 。', en: 'I can drive (learned).' }] },
                    { use: 'future prediction', examples: [{ fr: '明 天 会 下 雨 。', en: 'It will rain tomorrow.' }] },
                    { use: 'promise', examples: [{ fr: '我 一 定 会 来 。', en: 'I will definitely come.' }] },
                    { use: 'never for permission', examples: [{ fr: '✗ 我 会 进 来 吗 ？ → ✓ 可 以 进 来 吗 ？', en: 'permission asks 可以' }] },
                ],
            },
            {
                word: 'the ask-ladder',
                uses: [
                    { use: 'neutral', examples: [{ fr: '你 能 帮 我 吗 ？', en: 'Can you help me?' }] },
                    { use: 'softer (A-not-A)', examples: [{ fr: '你 能 不 能 帮 我 ？', en: 'Could you help me?' }] },
                    { use: 'permission frame', examples: [{ fr: '我 可 以 问 一 个 问 题 吗 ？', en: 'May I ask a question?' }] },
                    { use: 'the favor frame', examples: [{ fr: '帮 我 一 个 忙 ', en: 'do me a favor' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Modal music: 会 firm, 能 neutral, 可以 polite. Read each exchange as a mini-dialogue — both roles.',
            lines: [
                { fr: '你 会 说 汉 语 吗 ？ —— 会 一 点 儿 。', pron: 'nǐ huì shuō Hànyǔ ma ? — huì yìdiǎnr .', en: 'Can you speak Chinese? — A little.' },
                { fr: '今 天 晚 上 你 能 来 吗 ？ —— 不 能 ， 我 得 上 班 。', pron: 'jīntiān wǎnshang nǐ néng lái ma ? — bùnéng , wǒ děi shàngbān .', en: 'Can you come tonight? — Can\u2019t; I have to work.' },
                { fr: '老 师 ， 我 可 以 进 来 吗 ？ —— 当 然 可 以 。', pron: 'lǎoshī , wǒ kěyǐ jìnlái ma ? — dāngrán kěyǐ .', en: 'Teacher, may I come in? — Of course.' },
                { fr: '你 能 不 能 帮 我 一 个 忙 ？ —— 没 问 题 ！', pron: 'nǐ néng bùnéng bāng wǒ yí ge máng ? — méi wèntí !', en: 'Favor? — No problem!' },
                { fr: '你 应 该 早 点 儿 睡 觉 。', pron: 'nǐ yīnggāi zǎo diǎnr shuìjiào .', en: 'You should sleep earlier.' },
                { fr: '我 一 定 会 学 会 的 。', pron: 'wǒ yídìng huì xuéhuì de .', en: 'I will definitely learn it.' },
            ],
        },
    },
    '2:compare': {
        warmup: [
            { q: 'The three cans?', a: '会 learned · 能 circumstance · 可以 permission.' },
            { q: 'Negate the learned can.', a: '不 会 — 不会游泳.' },
            { q: 'Verb after a modal is…?', a: 'Bare — 会说汉语.' },
            { q: 'The favor frame?', a: '你能不能帮我一个忙？' },
            { q: '明天下雨 uses which modal (prediction)?', a: '会 — 明天会下雨.' },
        ],
        verbTables: [
            {
                title: 'The 比 frame — and what stays out',
                rows: [
                    { label: 'correct', form: '北 京 比 上 海 大 。', pron: 'Běijīng bǐ Shànghǎi dà .' },
                    { label: 'wrong (很 inside)', form: '✗ 比 上 海 很 大', pron: 'degree words banned' },
                    { label: 'even more', form: '比 上 海 更 大', pron: 'gèng allowed' },
                    { label: 'with a bit', form: '比 我 高 一 点 儿', pron: 'a tad taller than me' },
                ],
            },
            {
                title: 'The degree pair — positions',
                rows: [
                    { label: 'complainer (before)', form: '有 点 儿 贵 。', pron: 'yǒudiǎnr guì .' },
                    { label: 'adjuster (after)', form: '便 宜 一 点 儿 。', pron: 'piányi yìdiǎnr .' },
                    { label: 'equality', form: '跟 我 一 样 大 。', pron: 'gēn wǒ yíyàng dà .' },
                    { label: 'superlative', form: '最 好 。', pron: 'zuì hǎo .' },
                ],
            },
        ],
        useCases: [
            {
                word: '过 — the experience passport',
                uses: [
                    { use: 'been there', examples: [{ fr: '我 去 过 中 国 。', en: 'I\u2019ve been to China.' }] },
                    { use: 'eaten that', examples: [{ fr: '我 吃 过 北 京 烤 鸭 。', en: 'I\u2019ve eaten Peking duck.' }] },
                    { use: 'never', examples: [{ fr: '我 没 坐 过 飞 机 。', en: 'I\u2019ve never flown.' }] },
                    { use: 'counted', examples: [{ fr: '去 过 两 次 。', en: 'been twice.' }] },
                ],
            },
            {
                word: '比 vs 最 vs 一样',
                uses: [
                    { use: 'comparative', examples: [{ fr: 'A 比 B 大 。', en: 'A is bigger than B.' }] },
                    { use: 'superlative', examples: [{ fr: 'A 最 大 。', en: 'A is the biggest.' }] },
                    { use: 'equality', examples: [{ fr: 'A 跟 B 一 样 大 。', en: 'A is as big as B.' }] },
                    { use: 'near-equality', examples: [{ fr: '差 不 多 。', en: 'about the same.' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Comparison rhythm: 比 drops the degree words, 过 rides the verb lightly. Read each line twice.',
            lines: [
                { fr: '我 去 过 两 次 上 海 。', pron: 'wǒ qù guo liǎng cì Shànghǎi .', en: 'I\u2019ve been to Shanghai twice.' },
                { fr: '北 京 比 上 海 冷 。', pron: 'Běijīng bǐ Shànghǎi lěng .', en: 'Beijing is colder than Shanghai.' },
                { fr: '这 个 有 点 儿 贵 。', pron: 'zhè ge yǒudiǎnr guì .', en: 'This one is a bit pricey.' },
                { fr: '便 宜 一 点 儿 吧 ！', pron: 'piányi yìdiǎnr ba !', en: 'Make it a bit cheaper!' },
                { fr: '我 跟 我 哥 一 样 高 。', pron: 'wǒ gēn wǒ gē yíyàng gāo .', en: 'I\u2019m as tall as my brother.' },
                { fr: '我 觉 得 春 天 最 好 。', pron: 'wǒ juéde chūntiān zuì hǎo .', en: 'I think spring is the best.' },
            ],
        },
    },
    '2:weather': {
        warmup: [
            { q: 'V+过 means…?', a: 'Life experience — 去过中国 = have been to China.' },
            { q: 'The 比 frame takes which adjectives?', a: 'BARE ones — no 很/太 inside.' },
            { q: '有点儿 sits where?', a: 'BEFORE the adjective — and it complains: 有点儿贵.' },
            { q: '一点儿 sits where?', a: 'AFTER the adjective — and it requests: 便宜一点儿.' },
            { q: 'The -est word?', a: '最 — 最好, no 比 needed.' },
        ],
        verbTables: [
            {
                title: 'The sky verbs — 下 family',
                rows: [
                    { label: 'rain', form: '下 雨 (了)', pron: 'xià yǔ (le)' },
                    { label: 'snow', form: '下 雪 (了)', pron: 'xià xuě (le)' },
                    { label: 'wind blows', form: '刮 风 了', pron: 'guā fēng le' },
                    { label: 'sun out', form: '出 太 阳 了', pron: 'chū tàiyáng le' },
                    { label: 'forecast form', form: '明 天 有 雨', pron: 'míngtiān yǒu yǔ' },
                ],
            },
            {
                title: 'The feeling frame',
                rows: [
                    { label: 'state', form: '我 很 高 兴 。', pron: 'wǒ hěn gāoxìng .' },
                    { label: 'complaint', form: '我 有 点 儿 累 。', pron: 'wǒ yǒudiǎnr lèi .' },
                    { label: 'opinion', form: '我 觉 得 …', pron: 'wǒ juéde …' },
                    { label: 'excess', form: '太 热 了 ！', pron: 'tài rè le !' },
                    { label: 'body check', form: '你 身 体 好 吗 ？', pron: 'nǐ shēntǐ hǎo ma ?' },
                ],
            },
        ],
        useCases: [
            {
                word: '天气 words — the forecast set',
                uses: [
                    { use: 'sunny', examples: [{ fr: '今 天 晴 。', en: 'Clear today.' }] },
                    { use: 'overcast', examples: [{ fr: '阴 天 。', en: 'Overcast.' }] },
                    { use: 'windy', examples: [{ fr: '风 很 大 。', en: 'Very windy (wind is big).' }] },
                    { use: 'raining', examples: [{ fr: '下 雨 了 。', en: 'It\u2019s raining (started).' }] },
                ],
            },
            {
                word: '带 — bring, take along, wear',
                uses: [
                    { use: 'take along (journey)', examples: [{ fr: '带 伞 吧 。', en: 'Take an umbrella.' }] },
                    { use: 'bring here', examples: [{ fr: '明 天 带 书 来 。', en: 'Bring the book tomorrow.' }] },
                    { use: 'wear (accessories)', examples: [{ fr: '戴 帽 子 / 带 孩 子', en: '戴 = wear (hat); 带 = bring (kid) — different characters!' }] },
                    { use: 'don\u2019t forget', examples: [{ fr: '别 忘 了 带 伞 。', en: 'Don\u2019t forget the umbrella.' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Weather small-talk music: report, complain, advise. Read each line as if to a neighbor you like.',
            lines: [
                { fr: '今 天 天 气 怎 么 样 ？ —— 下 雨 了 。', pron: 'jīntiān tiānqì zěnmeyàng ? — xià yǔ le .', en: 'How\u2019s the weather? — Raining now.' },
                { fr: '太 冷 了 ！ 多 穿 点 儿 。', pron: 'tài lěng le ! duō chuān diǎnr .', en: 'So cold! Dress warm.' },
                { fr: '因 为 下 雪 ， 学 校 不 上 课 。', pron: 'yīnwèi xià xuě , xuéxiào bú shàng kè .', en: 'Because of the snow, school\u2019s off.' },
                { fr: '我 有 点 儿 累 ， 想 回 家 。', pron: 'wǒ yǒudiǎnr lèi , xiǎng huí jiā .', en: 'A bit tired — I want to go home.' },
                { fr: '我 觉 得 秋 天 最 舒 服 。', pron: 'wǒ juéde qiūtiān zuì shūfu .', en: 'I think autumn is the most comfortable.' },
                { fr: '别 忘 了 带 伞 ！', pron: 'bié wàng le dài sǎn !', en: 'Don\u2019t forget the umbrella!' },
            ],
        },
    },
};
