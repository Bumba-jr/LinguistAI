// Chinese HSK-3 lectures part 1 — 把 Sentences, 被 Passive, Aspect Masterclass
// (了/过/着). Same gold-standard format; ALL text pre-segmented.

import type { HskLesson } from './hskService';
import { BASE_GLOSSARY, type ChineseGlossEntry } from './chineseLessonBase';
import type { WarmupItem, VerbTableBlock, UseCaseBlock, ShadowingBlock } from './frenchLessons';
import type { StaticChineseLesson } from './chineseLessons';

// ── HSK 3 · 把 Sentences — Moving Objects ───────────────────────────────────
const h3Ba: StaticChineseLesson = {
    title: '把 Sentences — Moving Objects',
    objective: 'Build the 把 structure (把 + object + verb + result) for disposal and relocation, choose the result complement (完/好/到/在/上), know when 把 is REQUIRED vs banned, and negate before 把 — the structure that makes Chinese feel active.',

    vocabulary: [
        { hanzi: '把', pinyin: 'bǎ', en: 'the disposal marker (handle the object)', example: { hanzi: '把 门 关 上 。', pinyin: 'bǎ mén guān shàng .', en: 'Shut the door (do it to the door).' }, related: [{ hanzi: '拿', pinyin: 'ná', en: 'to take/hold' }] },
        { hanzi: '放', pinyin: 'fàng', en: 'to put / place', example: { hanzi: '把 书 放 在 桌 子 上 。', pinyin: 'bǎ shū fàng zài zhuōzi shàng .', en: 'Put the book on the desk.' }, related: [{ hanzi: '放 好', pinyin: 'fàng hǎo', en: 'put away nicely' }] },
        { hanzi: '关', pinyin: 'guān', en: 'to close / turn off', example: { hanzi: '把 灯 关 了 。', pinyin: 'bǎ dēng guān le .', en: 'Turn off the light.' }, related: [{ hanzi: '开', pinyin: 'kāi', en: 'open / turn on' }] },
        { hanzi: '完', pinyin: 'wán', en: 'to finish (result complement)', example: { hanzi: '把 作 业 写 完 。', pinyin: 'bǎ zuòyè xiě wán .', en: 'Finish writing the homework.' }, related: [{ hanzi: '吃 完', pinyin: 'chī wán', en: 'finish eating' }] },
        { hanzi: '弄', pinyin: 'nòng', en: 'to do-to / mess with', example: { hanzi: '别 把 手 机 弄 丢 了 。', pinyin: 'bié bǎ shǒujī nòng diū le .', en: 'Don\u2019t lose your phone.' }, related: [{ hanzi: '弄 脏', pinyin: 'nòng zāng', en: 'make dirty' }] },
        { hanzi: '丢', pinyin: 'diū', en: 'to lose / throw away', example: { hanzi: '我 把 钱 包 丢 了 。', pinyin: 'wǒ bǎ qiánbāo diū le .', en: 'I lost my wallet.' }, related: [{ hanzi: '丢 了', pinyin: 'diū le', en: 'got lost' }] },
        { hanzi: '洗', pinyin: 'xǐ', en: 'to wash', example: { hanzi: '把 手 洗 干 净 。', pinyin: 'bǎ shǒu xǐ gānjìng .', en: 'Wash your hands clean.' }, related: [{ hanzi: '洗 澡', pinyin: 'xǐzǎo', en: 'take a shower' }] },
        { hanzi: '送', pinyin: 'sòng', en: 'to give (a gift) / see off', example: { hanzi: '把 这 本 书 送 给 你 。', pinyin: 'bǎ zhè běn shū sòng gěi nǐ .', en: 'This book is for you (I give it to you).' }, related: [{ hanzi: '送 给', pinyin: 'sòng gěi', en: 'give to' }] },
        { hanzi: '带', pinyin: 'dài', en: 'to bring / take along', example: { hanzi: '把 伞 带 上 。', pinyin: 'bǎ sǎn dài shàng .', en: 'Take the umbrella along.' }, related: [{ hanzi: '带 来', pinyin: 'dài lái', en: 'bring here' }] },
        { hanzi: '翻 译', pinyin: 'fānyì', en: 'to translate', example: { hanzi: '把 这 句 话 翻 译 成 英 语 。', pinyin: 'bǎ zhè jù huà fānyì chéng Yīngyǔ .', en: 'Translate this sentence into English.' }, related: [{ hanzi: '成', pinyin: 'chéng', en: 'into (result)' }] },
    ],

    characters: [
        { hanzi: '把', pinyin: 'bǎ', en: 'disposal marker / grasp', components: '扌(hand) + 巴', mnemonic: 'The HAND radical 扌 — 把 is literally a HANDLE: to grasp, to handle, and finally the grammar word for HANDLING an object. Also a measure word for chairs/knives: 一把刀.' },
        { hanzi: '放', pinyin: 'fàng', en: 'to put / release', components: '方 + 攵(tap)', mnemonic: '方 (square/direction) + a tapping hand — placing something in its square spot. 放 学 = release-from-school.' },
        { hanzi: '关', pinyin: 'guān', en: 'to close', components: 'two doors with a bolt', mnemonic: 'The picture is TWO DOORS barred shut — 关 门 close the door, 关 机 turn off the phone.' },
        { hanzi: '洗', pinyin: 'xǐ', en: 'to wash', components: '氵(water) + 先', mnemonic: 'WATER radical 氵 — washing needs water. 洗 手 wash hands, 洗衣服 wash clothes.' },
        { hanzi: '丢', pinyin: 'diū', en: 'to lose', components: '一 撇 + 去 (a slanted 去)', mnemonic: 'A tilted 去 — when something "goes" crooked, it is LOST. 把钱包丢了 = the wallet went-astray (by my hand).' },
        { hanzi: '拿', pinyin: 'ná', en: 'to take / hold', components: '合 + 手', mnemonic: 'JOIN + HAND — a hand closing on something. 拿 = take-in-hand; 把 needs its object HANDLED first.' },
    ],

    pronunciation: [
        { hanzi: '把', pinyin: 'bǎ', toneNote: '3rd tone, half-dipped in flow. As a measure word (一把刀) same tone.', en: 'The grammar word is weightless-ish.' },
        { hanzi: '放 在', pinyin: 'fàng zài', toneNote: '4-4: both stomp. The combo is the most-spoken 把 result.', en: 'put AT.' },
        { hanzi: '写 完', pinyin: 'xiě wán', toneNote: '3-2: the 写 half-dips before the rising 完.', en: 'write-to-finish.' },
        { hanzi: '弄 丢', pinyin: 'nòng diū', toneNote: '4-1: stomp then plateau — the regret pair.', en: 'do-to-lose.' },
        { hanzi: '翻 译 成', pinyin: 'fānyì chéng', toneNote: '1-4-2: three different tones in a row.', en: 'translate-INTO.' },
        { hanzi: '别 把', pinyin: 'bié bǎ', toneNote: '2-3: the 别 prohibition rides high, 把 dips after.', en: 'don\u2019t-handle.' },
    ],

    grammar: {
        rule: '把 + OBJECT + VERB + RESULT. The object must be SPECIFIC (known to both speakers), the verb must carry a RESULT (完/好/到/在/上/给), and negation/prohibition goes BEFORE 把 (没把/别把). Plain verbs without results cannot take 把.',
        explanation: '把 reorganizes the sentence to spotlight what you DO to a specific thing: 我把作业写完了 (I homework-wrote-finished = I finished the homework). Three conditions must all hold: (1) the object is specific — 把书放那儿 works, 把一本书放那儿 is odd (a random book can\u2019t be handled); (2) the verb is not a bare state — there must be a RESULT or destination: 关上 (shut-tight), 写完 (write-finish), 放在桌上 (put-ON-the-desk), 送给朋友 (give-TO-a-friend); (3) the action is deliberate/disposal — the object gets moved, changed, or affected. Negation and adverbs sit BEFORE 把: 我没把书带来 (I didn\u2019t bring the book), 别把它弄丢了 (don\u2019t lose it). Banned with: mental states (喜欢/知道/觉得), plain perception (看见 without result is fine without 把), and things happening by themselves (下雨 can\u2019t take 把). When unsure, ask: did I DO something TO that specific thing, with an end-state? If yes, 把 fits.',
        examples: [
            { hanzi: '请 把 门 关 上 。', pinyin: 'qǐng bǎ mén guān shàng .', en: 'Please shut the door.', breakdown: ['把 门 = handle the door (specific)', '关 = close', '上 = result: shut TIGHT'] },
            { hanzi: '把 书 放 在 桌 子 上 。', pinyin: 'bǎ shū fàng zài zhuōzi shàng .', en: 'Put the book on the desk.', breakdown: ['放 = put', '在 桌子上 = destination result', 'the location is the end-state'] },
            { hanzi: '把 作 业 写 完 了 。', pinyin: 'bǎ zuòyè xiě wán le .', en: 'Finished the homework.', breakdown: ['写 + 完 = write-to-completion', '了 confirms it happened', 'the classic homework sentence'] },
            { hanzi: '别 把 手 机 弄 丢 了 ！', pinyin: 'bié bǎ shǒujī nòng diū le !', en: 'Don\u2019t lose your phone!', breakdown: ['别 BEFORE 把', '弄丢 = do-to-lose', 'the regret frame'] },
            { hanzi: '我 没 把 钱 包 带 来 。', pinyin: 'wǒ méi bǎ qiánbāo dài lái .', en: 'I didn\u2019t bring the wallet.', breakdown: ['没 BEFORE 把', '带 来 = bring-here result', 'negation never inside'] },
            { hanzi: '把 这 句 话 翻 译 成 英 语 。', pinyin: 'bǎ zhè jù huà fānyì chéng Yīngyǔ .', en: 'Translate this sentence into English.', breakdown: ['成 = INTO (transformation result)', 'translation as disposal', 'the exam\u2019s favourite instruction line'] },
        ],
        commonMistakes: [
            'Bare verb after 把: 我把作业写 — WRONG. 把 demands a result or destination: 写完, 放在…, 送给…. No result, no 把.',
            'Indefinite objects: 把一本书放在桌子上 — odd. 把 handles SPECIFIC things; a random 一本书 stays in the normal SVO sentence.',
            '把 with states/feelings: 我把汉语很喜欢 — catastrophically wrong. 喜欢/知道/觉得 never take 把 — disposal only.',
            'Negating after 把: 把书没带来 — WRONG. 没/别/都 sit BEFORE 把: 没把书带来, 别把它丢了.',
        ],
    },

    patterns: [
        { type: 'Close/switch off', hanzi: '把 + 门/灯/手 机 + 关 上/关 了', pinyin: 'bǎ dēng guān le .', en: 'the switch-off result' },
        { type: 'Put + location', hanzi: '把 + N + 放 在 + place', pinyin: 'bǎ shū fàng zài zhuōzi shàng .', en: 'the relocation result' },
        { type: 'Do-to-completion', hanzi: '把 + N + V + 完', pinyin: 'bǎ zuòyè xiě wán .', en: 'the finish result' },
        { type: 'Do-to-damage', hanzi: '把 + N + 弄 + 丢/脏/坏', pinyin: 'bǎ shǒujī nòng diū le .', en: 'the regret result' },
        { type: 'Give to', hanzi: '把 + N + 送 给 / 给 + person', pinyin: 'bǎ shū sòng gěi nǐ .', en: 'the transfer result' },
        { type: 'Prohibition', hanzi: '别 把 + N + V + result', pinyin: 'bié bǎ shǒujī nòng diū le .', en: '别 BEFORE 把' },
    ],

    sentenceBuilding: [
        { hanzi: '把 门 关 上 。', pinyin: 'bǎ mén guān shàng .', en: 'Shut the door.' },
        { hanzi: '把 门 关 上 ， 把 灯 也 关 了 。', pinyin: 'bǎ mén guān shàng , bǎ dēng yě guān le .', en: 'Shut the door and turn the light off too.' },
        { hanzi: '走 的 时 候 ， 把 门 关 上 ， 把 灯 也 关 了 ， 把 钥 匙 放 在 桌 子 上 。', pinyin: 'zǒu de shíhou , bǎ mén guān shàng , bǎ dēng yě guān le , bǎ yàoshi fàng zài zhuōzi shàng .', en: 'When leaving: shut the door, kill the light, leave the keys on the desk.' },
        { hanzi: '别 忘 了 —— 把 猫 也 带 上 ！', pinyin: 'bié wàng le —— bǎ māo yě dài shàng !', en: 'Don\u2019t forget — bring the cat too!' },
        { hanzi: '要 是 你 把 钥 匙 弄 丢 了 ， 我 们 就 都 进 不 去 了 。', pinyin: 'yàoshi nǐ bǎ yàoshi nòng diū le , wǒmen jiù dōu jìn bu qù le .', en: 'If you lose the keys, none of us gets in.' },
    ],

    practice: [
        { instruction: 'Complete the result:', question: '把 作 业 写 ___ 。 (finish)', answer: '完 — 写完 = write-to-completion' },
        { instruction: 'The location result:', question: '把 书 放 ___ 桌 子 上 。', answer: '在 — 放在 + place' },
        { instruction: 'Negate correctly:', question: '我 把 书 没 带 来。 → fix', answer: '我 没 把 书 带 来 — 没 BEFORE 把' },
        { instruction: 'Spot the banned 把:', question: '我 把 汉 语 很 喜 欢 。 → fix', answer: '我 很 喜 欢 汉 语 — states never take 把' },
        { instruction: 'The transfer:', question: '把 这 本 书 ___ 给 你 。', answer: '送 — 送给 = give to' },
        { instruction: 'The prohibition:', question: '___ 把 手 机 弄 丢 了 ！', answer: '别 — 别把…' },
    ],

    translationPractice: [
        { en: 'Please shut the door.', hanzi: '请 把 门 关 上 。', pinyin: 'qǐng bǎ mén guān shàng .' },
        { en: 'Put the book on the desk.', hanzi: '把 书 放 在 桌 子 上 。', pinyin: 'bǎ shū fàng zài zhuōzi shàng .' },
        { en: 'I finished the homework.', hanzi: '我 把 作 业 写 完 了 。', pinyin: 'wǒ bǎ zuòyè xiě wán le .' },
        { en: 'Don\u2019t lose your phone!', hanzi: '别 把 手 机 弄 丢 了 ！', pinyin: 'bié bǎ shǒujī nòng diū le !' },
        { en: 'I didn\u2019t bring the wallet.', hanzi: '我 没 把 钱 包 带 来 。', pinyin: 'wǒ méi bǎ qiánbāo dài lái .' },
        { en: 'Translate this sentence into English.', hanzi: '把 这 句 话 翻 译 成 英 语 。', pinyin: 'bǎ zhè jù huà fānyì chéng Yīngyǔ .' },
    ],

    reverseTranslation: [
        { hanzi: '把 灯 关 了 ， 把 电 脑 也 关 了 。', pinyin: 'bǎ dēng guān le , bǎ diànnǎo yě guān le .', en: 'Turn off the light and the computer too.' },
        { hanzi: '她 把 我 的 杯 子 打 破 了 。', pinyin: 'tā bǎ wǒ de bēizi dǎ pò le .', en: 'She broke my cup (smashed it).' },
        { hanzi: '把 这 些 苹 果 洗 干 净 。', pinyin: 'bǎ zhèxiē píngguǒ xǐ gānjìng .', en: 'Wash these apples clean.' },
        { hanzi: '你 怎 么 把 我 的 名 字 忘 了 ？', pinyin: 'nǐ zěnme bǎ wǒ de míngzi wàng le ?', en: 'How did you forget my name?' },
    ],

    register: {
        casual: '把 这 个 给 我 呗 。 — casual 呗 ending: hand it over, will ya.',
        polite: '请 把 门 关 一 下 儿 ， 谢 谢 。 — V一下儿 softens the disposal request.',
        formal: '请 将 文 件 翻 译 成 英 文 。 — 将 = the written 把 of contracts and exams.',
    },

    culture: '把 sentences are the grammar of GETTING THINGS DONE — Chinese roommates, parents and bosses speak almost entirely in 把 when assigning tasks: 把垃圾倒了 (take the trash out), 把被子叠了 (fold the quilt), 把房间收拾收拾 (tidy the room). The exam\u2019s picture-description section (HSK 3 writing) practically requires 把: the picture shows someone putting a cat ON a table — 你得说 把猫放在桌子上. Notice also the double-把 tongue-twister potential: 把把手把住 (grab the handle tight) — three 把\u2019s, three jobs.',

    freeProduction: 'Record a chore list for a roommate (8–10 lines, all 把): 把门关上，把桌子擦干净，把垃圾倒了，把快递拿上来，把我的充电器放在…，别忘了把猫喂了。Then write the same list as prohibitions: 别把…弄丢了/弄脏了 ×3. Every 把 must carry a result.',

    miniTest: [
        { question: '把 demands:', options: ['a bare verb', 'a result or destination after the verb', 'an indefinite object', 'negation after it'], answer: 'a result or destination after the verb — no result, no 把' },
        { question: 'Which is CORRECT?', options: ['我 把 汉 语 很 喜 欢 。', '我 把 作 业 写 完 了 。', '把 书 没 带 来 。', '我 把 一 本 书 买 了 。'], answer: '我 把 作 业 写 完 了 。 — specific object + result' },
        { question: 'Negate 把书带来了 :', options: ['把 书 没 带 来 了 。', '我 没 把 书 带 来 。', '把 书 带 没 来 。', '不 把 书 带 来 了 。'], answer: '我 没 把 书 带 来 。 — 没 BEFORE 把' },
        { question: 'Put the book ON the desk:', options: ['把 书 放 桌 子 上 了 。', '把 书 放 在 桌 子 上 。', '把 在 桌 子 上 放 书 。', '把 桌 子 放 书 上 。'], answer: '把 书 放 在 桌 子 上 。 — 放在 + place' },
        { question: 'States/feelings with 把 are:', options: ['required', 'optional', 'banned', 'formal only'], answer: 'banned — 喜欢/知道/觉得 never take 把' },
    ],

    review: [
        'The A2 weather lecture used 把伞吧 — now you know WHY 带 objects ride 把 (they get taken somewhere).',
        'Next: 被 — the same attention to the object, but when things happen TO it (手机被偷了).',
    ],

    traps: [
        'No result, no 把: 把作业写完 ✓ · 把作业写 ✗. The result (完/好/到/在/上/给) is the engine of the sentence.',
        'Object must be specific: 把这本书 ✓ · 把一本书 ✗. Indefinite things stay in normal SVO.',
        '没/别/都 go BEFORE 把: 没把…, 别把… — never inside the frame.',
        'States and feelings are banned: 喜欢/知道/觉得/是 + 把 = instant error.',
    ],

    homework: {
        intro: '把 in every section: results, relocations, regrets, and the banned list.',
        translation: [
            { prompt: 'Please shut the door.', answer: '请 把 门 关 上 。', alt: ['请把门关上。'], explanation: '关上 = close-TIGHT — the directional result.' },
            { prompt: 'Put the book on the desk.', answer: '把 书 放 在 桌 子 上 。', alt: ['把书放在桌子上。'], explanation: '放在 + place — the location result.' },
            { prompt: 'I finished the homework.', answer: '我 把 作 业 写 完 了 。', alt: ['我把作业写完了。'], explanation: '写完 = write-to-finish + 了 confirms.' },
            { prompt: 'Don\u2019t lose your phone!', answer: '别 把 手 机 弄 丢 了 ！', alt: ['别把手机弄丢了！'], explanation: '别 BEFORE 把; 弄丢 = do-to-lose.' },
            { prompt: 'I didn\u2019t bring the wallet.', answer: '我 没 把 钱 包 带 来 。', alt: ['我没把钱包带来。'], explanation: '没 before 把; 带来 = bring-here.' },
            { prompt: 'Translate this sentence into English.', answer: '把 这 句 话 翻 译 成 英 语 。', alt: ['把这句话翻译成英语。'], explanation: '成 = INTO — the transformation result.' },
        ],
        blanks: [
            { prompt: '把 作 业 写 ___ 。 (finish)', answer: '完', explanation: '写完 = write-to-completion.' },
            { prompt: '把 书 放 ___ 桌 子 上 。', answer: '在', explanation: '放在 + place = the location result.' },
            { prompt: '___ 把 手 机 弄 丢 了 ！ (don\u2019t)', answer: '别', explanation: '别 prohibition BEFORE 把.' },
            { prompt: '我 ___ 把 钱 包 带 来 。 (didn\u2019t)', answer: '没', explanation: '没 before 把.' },
            { prompt: '把 这 本 书 ___ 给 你 。 (give)', answer: '送', explanation: '送给 = give-to (transfer result).' },
            { prompt: '把 灯 ___ 了 。 (turn off)', answer: '关', explanation: '把灯关了 — the switch-off.' },
        ],
        corrections: [
            { prompt: '我 把 作 业 写 。', answer: '我 把 作 业 写 完 了 。', explanation: 'How the mistake happens: 把 + bare verb. Why it does not work: 把 demands a result — 写 alone has no end-state. How to fix it: 写完 (or 写好了).' },
            { prompt: '把 一 本 书 放 在 桌 子 上 。', answer: '把 那 本 书 放 在 桌 子 上 。 (or drop 把: 在 桌 子 上 放 了 一 本 书 。)', explanation: 'How the mistake happens: 一本 indefinite object. Why it does not work: 把 handles SPECIFIC things only. How to fix it: make it specific (那本) or use normal word order.' },
            { prompt: '我 把 汉 语 很 喜 欢 。', answer: '我 很 喜 欢 汉 语 。', explanation: 'How the mistake happens: 把 everywhere. Why it does not work: 喜欢 is a feeling — no disposal, no result, no 把. How to fix it: normal SVO.' },
            { prompt: '把 书 没 带 来 。', answer: '没 把 书 带 来 。', explanation: 'How the mistake happens: negation inside the frame. Why it does not work: 没/别/都 stand BEFORE 把. How to fix it: 没把书带来.' },
            { prompt: '把 下 雨 了 。', answer: '下 雨 了 。', explanation: 'How the mistake happens: 把 by reflex. Why it does not work: rain happens BY ITSELF — no disposal, no object handled. How to fix it: plain sentence.' },
        ],
        writing: {
            task: 'Write chore instructions to a forgetful roommate (10–12 lines, all 把): five positive tasks with different results (关上/放在/写完/洗干净/带给), three prohibitions (别把…弄丢/弄脏/打碎), and one 如果…就 consequence (要是你把…弄丢了，我们就…).',
            requirements: [
                'Five 把 sentences with FIVE different results',
                'Three 别把 prohibitions',
                'One 没把 or 要是…把…就… sentence',
                'Every object specific (这本/那个/我的)',
                'No states/feelings with 把',
            ],
            minWords: 55,
        },
        checklist: [
            'I build 把 + object + verb + RESULT (完/好/到/在/上/给/成)',
            'I keep objects specific — no 一本/一个 after 把',
            'I place 没/别/都 BEFORE 把',
            'I ban 把 with states, feelings and self-happening events',
            'I use 将 as the written 把 (exam/contract register)',
            'I can chain three 把 commands naturally',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The result toolbox: 上 (attach/fasten: 关上, 戴上) · 完 (finish: 写完) · 好 (fix nicely: 修好) · 到 (reach: 买到) · 在 (place: 放在) · 给 (transfer: 送给) · 成 (transform into: 翻译成) · 干净/坏 (adjective results).',
            examples: [
                { hanzi: '关 上 · 写 完 · 修 好 · 买 到 · 放 在 · 送 给 · 翻 译 成', pinyin: 'the seven handles', en: 'shut · finish · fix · obtain · place · give · transform' },
            ],
        },
        {
            explanation: 'The specificity rule: 把\u2019s object is known to both speakers — 把那本书 ✓ · 把一本书 ✗. Indefinite objects live in normal SVO: 我买了一本书.',
            examples: [
                { hanzi: '把 那 本 书 给 我 。', pinyin: 'bǎ nà běn shū gěi wǒ .', en: 'Hand me THAT book.' },
            ],
        },
        {
            explanation: 'Before-把 words: 没 (didn\u2019t), 别 (don\u2019t), 都 (also/even), 一定, 常常 — adverbs and negation stand OUTSIDE the frame.',
            examples: [
                { hanzi: '我 没 把 它 带 来 。 · 别 把 它 弄 丢 。', pinyin: 'wǒ méi bǎ tā dài lái · bié bǎ tā nòng diū', en: 'I didn\u2019t bring it · don\u2019t lose it' },
            ],
        },
        {
            explanation: 'The banned list: feelings (喜欢/恨/知道/觉得), states (是/有/像), and self-events (下雨/生病) — no disposal, no 把.',
            examples: [
                { hanzi: '我 喜 欢 汉 语 。 (✗ 我 把 汉 语 喜 欢 )', pinyin: 'wǒ xǐhuan Hànyǔ .', en: 'I like Chinese — plain SVO forever' },
            ],
        },
        {
            explanation: '将 = the written 把: contracts, exams, news. Same rules, colder register.',
            examples: [
                { hanzi: '请 将 文 件 翻 译 成 英 文 。', pinyin: 'qǐng jiāng wénjiàn fānyì chéng Yīngwén .', en: 'Please translate the document into English.' },
            ],
        },
        {
            explanation: '把 also measures handled things: 一把刀 (a knife), 一把伞 (an umbrella), 一把椅子 (a chair) — objects you grip. Different job, same character.',
            examples: [
                { hanzi: '一 把 刀 · 一 把 伞 · 一 把 椅 子', pinyin: 'yì bǎ dāo · yì bǎ sǎn · yì bǎ yǐzi', en: 'a knife · an umbrella · a chair' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '把': { en: 'disposal marker / grasp', pron: 'bǎ', tone: '3', measure: '把 (knives/umbrellas/chairs)', note: '把 + object + verb + RESULT. Also: 一把刀.' },
        '放': { en: 'to put / release', pron: 'fàng', tone: '4', note: '放在 + place — the relocation pair.' },
        '关': { en: 'to close / switch off', pron: 'guān', tone: '1', note: '关门/关灯/关机 — the close-down verb.' },
        '完': { en: 'finish (result)', pron: 'wán', tone: '2', note: 'V+完 = done with it: 写完, 吃完, 用完.' },
        '弄': { en: 'to do-to (make)', pron: 'nòng', tone: '4', note: '弄丢 lose · 弄脏 dirty · 弄坏 break — the regret verbs.' },
        '丢': { en: 'to lose', pron: 'diū', tone: '1', note: '丢 了 = got lost; 丢垃圾 = toss the trash.' },
        '洗': { en: 'to wash', pron: 'xǐ', tone: '3', note: '洗手/洗衣服/洗澡 — the water chores.' },
        '干净': { en: 'clean', pron: 'gānjìng', tone: '1-4', note: 'Adjective result: 洗干净 = wash-clean.' },
        '钥匙': { en: 'key', pron: 'yàoshi', tone: '4-neutral', measure: '把', note: '把钥匙丢了 — the classic regret.' },
        '翻译': { en: 'to translate', pron: 'fānyì', tone: '1-4', note: '翻译成英语 = translate INTO English.' },
        '将': { en: 'the written 把', pron: 'jiāng', tone: '1', note: 'Contracts/exam register: 请将…翻译成…' },
        '拉': { en: 'to pull', pron: 'lā', tone: '1', note: 'Push-pull pair: 推 拉 — on every door in China.' },
    },
};

// ── HSK 3 · 被 & Passive Meaning ────────────────────────────────────────────
const h3Bei: StaticChineseLesson = {
    title: '被 & Passive Meaning',
    objective: 'Build the 被 passive (object + 被 + agent + verb), use the colloquial passives 叫/让/给, recognize notional passives (饭吃完了 — no marker at all), and know when Chinese simply refuses the passive — the reverse lens of 把.',

    vocabulary: [
        { hanzi: '被', pinyin: 'bèi', en: 'by (passive marker)', example: { hanzi: '手 机 被 偷 了 。', pinyin: 'shǒujī bèi tōu le .', en: 'The phone was stolen.' }, related: [{ hanzi: '偷', pinyin: 'tōu', en: 'to steal' }] },
        { hanzi: '叫', pinyin: 'jiào', en: 'by (colloquial passive)', example: { hanzi: '杯 子 叫 他 打 破 了 。', pinyin: 'bēizi jiào tā dǎ pò le .', en: 'The cup got broken by him.' }, related: [{ hanzi: '让', pinyin: 'ràng', en: 'by (colloquial)' }] },
        { hanzi: '打 破', pinyin: 'dǎpò', en: 'to smash / break', example: { hanzi: '杯 子 被 打 破 了 。', pinyin: 'bēizi bèi dǎpò le .', en: 'The cup was smashed.' }, related: [{ hanzi: '破', pinyin: 'pò', en: 'broken' }] },
        { hanzi: '偷', pinyin: 'tōu', en: 'to steal', example: { hanzi: '自 行 车 被 偷 了 。', pinyin: 'zìxíngchē bèi tōu le .', en: 'The bike was stolen.' }, related: [{ hanzi: '小 偷', pinyin: 'xiǎotōu', en: 'thief' }] },
        { hanzi: '骗', pinyin: 'piàn', en: 'to cheat / trick', example: { hanzi: '我 被 他 骗 了 。', pinyin: 'wǒ bèi tā piàn le .', en: 'I was cheated by him.' }, related: [{ hanzi: '受 骗', pinyin: 'shòupiàn', en: 'be fooled' }] },
        { hanzi: '老 板', pinyin: 'lǎobǎn', en: 'boss', example: { hanzi: '他 被 老 板 批 评 了 。', pinyin: 'tā bèi lǎobǎn pīpíng le .', en: 'He was criticized by the boss.' }, related: [{ hanzi: '批 评', pinyin: 'pīpíng', en: 'to criticize' }] },
        { hanzi: '批 评', pinyin: 'pīpíng', en: 'to criticize', example: { hanzi: '别 批 评 孩 子 。', pinyin: 'bié pīpíng háizi .', en: 'Don\u2019t criticize the kid.' }, related: [{ hanzi: '表 扬', pinyin: 'biǎoyáng', en: 'to praise (opposite)' }] },
        { hanzi: '受', pinyin: 'shòu', en: 'to receive / suffer', example: { hanzi: '受 到 影 响', pinyin: 'shòu dào yǐngxiǎng', en: 'be affected' }, related: [{ hanzi: '受 伤', pinyin: 'shòushāng', en: 'get injured' }] },
        { hanzi: '影 响', pinyin: 'yǐngxiǎng', en: 'to influence / effect', example: { hanzi: '天 气 影 响 了 我 的 心 情 。', pinyin: 'tiānqì yǐngxiǎng le wǒ de xīnqíng .', en: 'The weather affected my mood.' }, related: [{ hanzi: '心 情', pinyin: 'xīnqíng', en: 'mood' }] },
        { hanzi: '发 现', pinyin: 'fāxiàn', en: 'to discover / find out', example: { hanzi: '我 发 现 钱 没 了 。', pinyin: 'wǒ fāxiàn qián méi le .', en: 'I discovered the money was gone.' }, related: [{ hanzi: '发 现 了', pinyin: 'fāxiàn le', en: 'found out' }] },
    ],

    characters: [
        { hanzi: '被', pinyin: 'bèi', en: 'by (passive)', components: '衤(clothing) + 皮(skin)', mnemonic: 'CLOTHING + skin — the original meaning was a QUILT (被子). Grammar borrowed it: things get DONE-TO you like a blanket thrown over you. Still means quilt: 一床被子.' },
        { hanzi: '偷', pinyin: 'tōu', en: 'to steal', components: '亻(person) + 俞', mnemonic: 'A PERSON + sound — stealing is a person\u2019s crime. 小偷 = the little-person who steals.' },
        { hanzi: '破', pinyin: 'pò', en: 'broken', components: '石(stone) + 皮(skin)', mnemonic: 'STONE + skin — stone breaks skin. 打破 = hit-break; the result complement family.' },
        { hanzi: '骗', pinyin: 'piàn', en: 'to cheat', components: '马(horse) + 扁', mnemonic: 'HORSE + flat — originally to leap sideways onto a horse (a trick!), now to swindle people. 骗人 = trick people.' },
        { hanzi: '受', pinyin: 'shòu', en: 'to receive/suffer', components: 'a hand receiving a vessel', mnemonic: 'The picture: a HAND passing a dish. 受 receives — both gifts and blows: 受伤 (get hurt), 受欢迎 (be popular).' },
        { hanzi: '批', pinyin: 'pī', en: 'to criticize / batch', components: '扌(hand) + 比(compare)', mnemonic: 'HAND + COMPARE — criticizing is comparing by hand. 批评 = criticize; 批改 = grade (a teacher\u2019s 批).' },
    ],

    pronunciation: [
        { hanzi: '被', pinyin: 'bèi', toneNote: '4th — sharp. Same sound as 被 子 (quilt) and 倍 (times: 一倍).', en: 'One sound, three words.' },
        { hanzi: '被 偷 了', pinyin: 'bèi tōu le', toneNote: '4-1-neutral: stomp, plateau, whisper.', en: 'The stolen-phone rhythm.' },
        { hanzi: '打 破', pinyin: 'dǎpò', toneNote: '3-4: half-dip then stomp.', en: 'hit-break.' },
        { hanzi: '被 骗', pinyin: 'bèi piàn', toneNote: '4-4: two stomps — anger in the tones.', en: 'got-cheated.' },
        { hanzi: '受 到', pinyin: 'shòu dào', toneNote: '4-4: 受 (suffer) + 到 (reach).', en: 'received-affected.' },
        { hanzi: '被 批 评', pinyin: 'bèi pīpíng', toneNote: '4-1-2: the boss\u2019s rhythm.', en: 'got criticized.' },
    ],

    grammar: {
        rule: 'Passive: RECEIVER + 被 + (AGENT) + VERB (+ result): 手机被偷了，杯子被他打破了. Colloquial swaps: 叫/让/给. Notional passives drop the marker entirely: 饭吃完了，作业写完了. Negation 没 goes before 被: 手机没被偷.',
        explanation: '被 moves the RECEIVER into subject position: the phone didn\u2019t DO anything — it GOT stolen. The frame: receiver + 被 + agent (optional!) + verb + result/completion. The agent may vanish when unknown or obvious: 手机被偷了 (the phone got stolen — no thief named). Colloquial speech swaps 被 for 叫/让/给 (杯子叫他打破了), especially with unpleasant events; formal writing keeps 被, and modern colloquial 被 has even invaded pleasant events (被表扬 got praised) — traditionally 被 avoided them. The deepest HSK-3 lesson: Chinese often skips the passive marker completely — 饭吃完了 (the rice is finish-eaten), 作业写完了, 问题解决了 (the problem solved-itself into solution). This notional passive works because Chinese word order alone can make the receiver the subject. Negation: 没 before 被 (手机没被偷); questions: 被偷了吗？/ 是不是被…？ Because 被 leans negative, the exam\u2019s listening uses it for complaints: 我被老师批评了.',
        examples: [
            { hanzi: '手 机 被 偷 了 。', pinyin: 'shǒujī bèi tōu le .', en: 'The phone was stolen.', breakdown: ['手机 = the receiver-subject', '被 + no agent (unknown thief)', '偷 + 了 = the deed done'] },
            { hanzi: '杯 子 被 他 打 破 了 。', pinyin: 'bēizi bèi tā dǎpò le .', en: 'The cup was broken by him.', breakdown: ['被 他 = by him (agent named)', '打 破 = hit-break (result)', 'the full formal frame'] },
            { hanzi: '我 被 老 师 批 评 了 。', pinyin: 'wǒ bèi lǎoshī pīpíng le .', en: 'I got criticized by the teacher.', breakdown: ['被 + agent + verb', 'negative-leaning event', 'the complaint register'] },
            { hanzi: '作 业 写 完 了 。', pinyin: 'zuòyè xiě wán le .', en: 'The homework is finished (done-written).', breakdown: ['NOTIONAL passive', 'no 被 at all', 'receiver as subject, word order does the work'] },
            { hanzi: '手 机 没 被 偷 ， 是 我 落 在 家 里 了 。', pinyin: 'shǒujī méi bèi tōu , shì wǒ là zài jiā lǐ le .', en: 'The phone wasn\u2019t stolen — I left it at home.', breakdown: ['没 BEFORE 被', '是…了 = the explanation frame', '落 = leave behind'] },
            { hanzi: '杯 子 叫 弟 弟 打 破 了 。', pinyin: 'bēizi jiào dìdi dǎpò le .', en: 'The cup got broken by the little brother.', breakdown: ['叫 = the colloquial 被', 'family blame register', 'same meaning, warmer tone'] },
        ],
        commonMistakes: [
            'Using 被 for every English passive: 这本书被很多人喜欢 — grammatical but stiff; Chinese prefers 这本书很多人喜欢 (notional) or reactivates: 很多人喜欢这本书.',
            '被 with pleasant events in formal writing: 被表扬 at HSK 3 essays is accepted colloquially but the safer classic is 得到表扬 (received praise).',
            'Putting the agent first: 被他手机偷了 — WRONG. The RECEIVER is the subject: 手机被他偷了.',
            'Forgetting the completion: 手机被偷 — sounds headline-ish; the natural sentence ends with 了: 手机被偷了.',
        ],
    },

    patterns: [
        { type: 'Full passive', hanzi: 'receiver + 被 + agent + verb', pinyin: 'bēizi bèi tā dǎpò le .', en: 'named agent version' },
        { type: 'Agentless', hanzi: 'receiver + 被 + verb', pinyin: 'shǒujī bèi tōu le .', en: 'unknown/obvious agent' },
        { type: 'Colloquial passives', hanzi: '叫 / 让 / 给 + agent + verb', pinyin: 'bēizi jiào dìdi dǎpò le .', en: 'spoken Chinese\u2019s soft 被' },
        { type: 'Notional passive', hanzi: 'receiver + verb + result (NO marker)', pinyin: 'fàn chī wán le .', en: 'word order alone = passive' },
        { type: 'Negation', hanzi: 'receiver + 没 + 被 + verb', pinyin: 'shǒujī méi bèi tōu .', en: '没 BEFORE 被' },
        { type: '受-words', hanzi: '受 到 / 受 伤 / 受 骗', pinyin: 'shòu dào yǐngxiǎng .', en: 'the receive- family' },
    ],

    sentenceBuilding: [
        { hanzi: '我 的 自 行 车 被 偷 了 。', pinyin: 'wǒ de zìxíngchē bèi tōu le .', en: 'My bike was stolen.' },
        { hanzi: '我 的 自 行 车 昨 天 晚 上 被 偷 了 。', pinyin: '… zuótiān wǎnshang bèi tōu le .', en: 'My bike was stolen last night.' },
        { hanzi: '报 纸 上 说 ， 昨 天 有 十 辆 自 行 车 被 偷 。', pinyin: 'bàozhǐ shàng shuō , zuótiān yǒu shí liàng zìxíngchē bèi tōu .', en: 'The paper says ten bikes were stolen yesterday.' },
        { hanzi: '不 过 我 的 车 没 被 偷 ， 因 为 我 把 它 锁 在 楼 下 了 。', pinyin: 'búguò wǒ de chē méi bèi tōu , yīnwèi wǒ bǎ tā suǒ zài lóu xià le .', en: 'But mine wasn\u2019t stolen — I locked it downstairs (把 returns!).' },
        { hanzi: '警 察 说 小 偷 已 经 被 抓 住 了 。', pinyin: 'jǐngchá shuō xiǎotōu yǐjīng bèi zhuā zhù le .', en: 'The police say the thief has already been caught.' },
    ],

    practice: [
        { instruction: 'Build the passive:', question: '手 机 / 被 / 偷 →', answer: '手 机 被 偷 了 — receiver first, agent optional' },
        { instruction: 'Name the agent:', question: '杯 子 被 ___ 打 破 了 。 (by him)', answer: '他 — 被 + agent + verb' },
        { instruction: 'Negate:', question: '手 机 ___ 被 偷 。', answer: '没 — 没 before 被' },
        { instruction: 'Notional passive:', question: '作 业 写 ___ 了 。', answer: '完 — no 被 needed: 写完了' },
        { instruction: 'Colloquial swap:', question: '杯 子 叫 弟弟 ___ 了 。 (broke)', answer: '打 破 — 叫 = spoken 被' },
        { instruction: 'The receive-family:', question: '受 ___ 影 响 。 (affected)', answer: '到 — 受到影响' },
    ],

    translationPractice: [
        { en: 'My phone was stolen.', hanzi: '我 的 手 机 被 偷 了 。', pinyin: 'wǒ de shǒujī bèi tōu le .' },
        { en: 'The cup was broken by my younger brother.', hanzi: '杯 子 被 弟 弟 打 破 了 。', pinyin: 'bēizi bèi dìdi dǎpò le .' },
        { en: 'The homework is already finished.', hanzi: '作 业 已 经 写 完 了 。', pinyin: 'zuòyè yǐjīng xiě wán le .' },
        { en: 'I was criticized by the boss.', hanzi: '我 被 老 板 批 评 了 。', pinyin: 'wǒ bèi lǎobǎn pīpíng le .' },
        { en: 'The problem has been solved.', hanzi: '问 题 已 经 解 决 了 。', pinyin: 'wèntí yǐjīng jiějué le .' },
        { en: 'The phone wasn\u2019t stolen — I lost it myself.', hanzi: '手 机 没 被 偷 ， 是 我 自 己 丢 的 。', pinyin: 'shǒujī méi bèi tōu , shì wǒ zìjǐ diū de .' },
    ],

    reverseTranslation: [
        { hanzi: '他 被 公 司 开 除 了 。', pinyin: 'tā bèi gōngsī kāichú le .', en: 'He was fired by the company.' },
        { hanzi: '这 部 电 影 被 认 为 是 经 典 。', pinyin: 'zhè bù diànyǐng bèi rènwéi shì jīngdiǎn .', en: 'This film is considered a classic.' },
        { hanzi: '饭 已 经 吃 完 了 。', pinyin: 'fàn yǐjīng chī wán le .', en: 'The food is already finished (notional passive).' },
        { hanzi: '窗 户 叫 风 吹 开 了 。', pinyin: 'chuānghu jiào fēng chuī kāi le .', en: 'The window got blown open by the wind.' },
    ],

    register: {
        casual: '我 手 机 让 人 偷 了 ！ — 让/给 = the angry spoken passive.',
        polite: '对 不 起 ， 您 的 杯 子 被 我 打 破 了 。 — full 被 + apology (formal enough to own the blame).',
        formal: '该 问 题 已 得 到 解 决 。 — 得到 = the written received/solved of reports.',
    },

    culture: '被 has a political biography: originally reserved for misfortune (被偷, 被骗, 被骂), it exploded into new life online — 被就业 (forcibly employed), 被自愿 (volunteered under pressure) — internet users weaponizing the marker for events done TO people without consent. The exam stays classical: expect 被偷/被骗/被批评 and the notional passives of daily life. Also cultural: Chinese avoids blaming-agent sentences in person — 你怎么把杯子打破了？ (the 把 question) sounds softer than 杯子被你打破了？ (the 被 interrogation) — choose 被 only when the receiver deserves the spotlight.',

    freeProduction: 'Write a small-crime report (8–10 lines) about a stolen/lost/broken item: what happened (…被偷了/被骗了), when you discovered it (我发现…的时候), the agent if known (被…) or unknown (不知道被谁), the police/shop response (警察说…), and the resolution (问题已经解决了 / 还没解决呢). Include one 把 sentence for what YOU did about it (我把…锁好了).',

    miniTest: [
        { question: 'The phone was stolen (no agent named):', options: ['手 机 偷 了 。', '手 机 被 偷 了 。', '被 手 机 偷 了 。', '手 机 把 偷 了 。'], answer: '手 机 被 偷 了 。 — agent optional' },
        { question: 'The cup was broken BY HIM:', options: ['杯 子 被 他 打 破 了 。', '他 被 杯 子 打 破 了 。', '杯 子 把 他 打 破 了 。', '被 杯 子 他 打 破 了 。'], answer: '杯 子 被 他 打 破 了 。 — receiver first, 被 + agent' },
        { question: '作 业写完了 is:', options: ['a 被 passive', 'a notional passive (no marker)', 'a 把 sentence', 'wrong'], answer: 'a notional passive (no marker) — word order alone makes it passive' },
        { question: 'Negate 手机被偷了 :', options: ['手 机 不 被 偷 。', '手 机 没 被 偷 。', '被 手 机 没 偷 。', '手 机 被 没 偷 。'], answer: '手 机 没 被 偷 。 — 没 before 被' },
        { question: 'The colloquial passive marker is:', options: ['把', '叫/让/给', '将', '得'], answer: '叫/让/给 — spoken 被' },
    ],

    review: [
        '把 put the object FIRST to spotlight your action; 被 puts it first because things happened TO it. Two lenses, one word order.',
        'Next: aspect masterclass — 了, 过, 着 finally meet in one lecture.',
    ],

    traps: [
        'The RECEIVER is the subject: 手机被他偷了 — never 被他手机偷了.',
        '被 leans negative/unpleasant (被偷/被骗/被批评); for neutral-to-pleasant events Chinese prefers the notional passive or 得到.',
        'The notional passive needs no marker at all: 饭吃完了, 问题解决了 — do not inject 被 into them.',
        '没 goes before 被: 没被偷. And the natural sentence ends with 了: 被偷了.',
    ],

    homework: {
        intro: '被 in every section: stolen phones, broken cups, notional passives, and the 没-splits.',
        translation: [
            { prompt: 'My phone was stolen.', answer: '我 的 手 机 被 偷 了 。', alt: ['我的手机被偷了。'], explanation: 'Receiver-subject + 被 + verb + 了; agent dropped (unknown).' },
            { prompt: 'The cup was broken by my younger brother.', answer: '杯 子 被 弟 弟 打 破 了 。', alt: ['杯子被弟弟打破了。'], explanation: '被 + agent + 打破 (hit-break result).' },
            { prompt: 'The homework is already finished.', answer: '作 业 已 经 写 完 了 。', alt: ['作业已经写完了。'], explanation: 'Notional passive — no 被; word order alone.' },
            { prompt: 'I was criticized by the boss.', answer: '我 被 老 板 批 评 了 。', alt: ['我被老板批评了。'], explanation: 'The complaint register: 被 + agent + verb.' },
            { prompt: 'The problem has been solved.', answer: '问 题 已 经 解 决 了 。', alt: ['问题已经解决了。'], explanation: 'Notional again — 解决 closes its own sentence.' },
            { prompt: 'The phone wasn\u2019t stolen — I lost it myself.', answer: '手 机 没 被 偷 ， 是 我 自 己 丢 的 。', alt: ['手机没被偷，是我自己丢的。'], explanation: '没 before 被; 是…的 explains the truth.' },
        ],
        blanks: [
            { prompt: '手 机 被 ___ 了 。 (stolen)', answer: '偷', explanation: '被偷了 — the classic.' },
            { prompt: '杯 子 被 他 打 ___ 了 。 (smashed)', answer: '破', explanation: '打破 = hit-break result.' },
            { prompt: '手 机 ___ 被 偷 。 (wasn\u2019t)', answer: '没', explanation: '没 before 被.' },
            { prompt: '作 业 写 ___ 了 。 (notional passive: finished)', answer: '完', explanation: '写完了 — no 被 needed.' },
            { prompt: '我 被 他 ___ 了 。 (cheated)', answer: '骗', explanation: '被骗 = got cheated.' },
            { prompt: '他 被 老 板 批 ___ 了 。 (criticized)', answer: '评', explanation: '批评 = criticize.' },
        ],
        corrections: [
            { prompt: '被 他 手 机 偷 了 。', answer: '手 机 被 他 偷 了 。', explanation: 'How the mistake happens: agent-first habit. Why it does not work: the RECEIVER is the subject; the agent follows 被. How to fix it: 手机被他偷了.' },
            { prompt: '手 机 被 偷 。', answer: '手 机 被 偷 了 。', explanation: 'How the mistake happens: headline style. Why it does not work: natural narration completes with 了. How to fix it: 被偷了.' },
            { prompt: '这 本 书 被 很 多 人 很 喜 欢 。', answer: '很 多 人 都 喜 欢 这 本 书 。 (or: 这 本 书 很 受 欢 迎 。)', explanation: 'How the mistake happens: translating English passives 1:1. Why it does not work: Chinese prefers active or 受-frames for likable things. How to fix it: 受欢迎 / active voice.' },
            { prompt: '作 业 被 写 完 了 （everyday speech）.', answer: '作 业 写 完 了 。', explanation: 'How the mistake happens: sprinkling 被 into notional passives. Why it does not work: routine completions need no marker — 被 adds an unlucky flavor. How to fix it: 写完了.' },
            { prompt: '手 机 被 没 偷 。', answer: '手 机 没 被 偷 。', explanation: 'How the mistake happens: 没 inside the frame. Why it does not work: negation stands before 被. How to fix it: 没被偷.' },
        ],
        writing: {
            task: 'Write a mini crime/accident report (10–12 lines): what got stolen/broken/lost (…被偷了/打破了/弄丢了), when discovered (我发现…的时候), agent named or unknown (被邻居的猫 / 不知道被谁), the notional-passive resolutions (问题解决了/作业补完了), one 把 sentence for your fix (我把门锁好了), and one 没…被… defense.',
            requirements: [
                'Three 被 sentences (one with named agent, one without)',
                'One colloquial 叫/让 passive',
                'Two notional passives (no marker)',
                'One 没…被… defense',
                'One 把 repair sentence',
            ],
            minWords: 60,
        },
        checklist: [
            'I build receiver + 被 + (agent) + verb + result/了',
            'I drop the agent when unknown or obvious',
            'I use 叫/让/给 for the spoken passive',
            'I recognize notional passives (饭吃完了) and never inject 被',
            'I place 没 before 被',
            'I keep 被 for unpleasant-leaning events and reach for 把/active otherwise',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The 被 frame: RECEIVER + 被 + AGENT(optional) + VERB + result/了. The agent drops when unknown: 手机被偷了.',
            examples: [
                { hanzi: '手 机 被 偷 了 。 · 杯 子 被 他 打 破 了 。', pinyin: 'shǒujī bèi tōu le · bēizi bèi tā dǎpò le', en: 'phone stolen · cup broken by him' },
            ],
        },
        {
            explanation: 'The colloquial trio: 叫/让/给 replace 被 in speech — 杯子叫他打破了. Formal writing keeps 被; 将 is written 把, not 被.',
            examples: [
                { hanzi: '我 的 车 让 人 撞 了 。', pinyin: 'wǒ de chē ràng rén zhuàng le .', en: 'My car got hit by someone.' },
            ],
        },
        {
            explanation: 'The notional passive: no marker, receiver as subject, result completes it — 饭吃完了, 问题解决了, 作业交了. Chinese\u2019s favorite passive.',
            examples: [
                { hanzi: '问 题 解 决 了 。', pinyin: 'wèntí jiějué le .', en: 'The problem is solved.' },
            ],
        },
        {
            explanation: '被\u2019s mood: it leans misfortune — 被偷/被骗/被批评/被雨淋了. Pleasant events prefer 得到/受到: 得到表扬, 受到欢迎.',
            examples: [
                { hanzi: '他 受 到 老 师 的 表 扬 。', pinyin: 'tā shòu dào lǎoshī de biǎoyáng .', en: 'He received the teacher\u2019s praise.' },
            ],
        },
        {
            explanation: '受-family: 受到影响 (be affected), 受伤 (get injured), 受骗 (be fooled), 受欢迎 (be popular) — fixed receive-words without 被.',
            examples: [
                { hanzi: '我 没 受 伤 。', pinyin: 'wǒ méi shòu shāng .', en: 'I wasn\u2019t hurt.' },
            ],
        },
        {
            explanation: '把 ↔ 被 mirror: 把杯子打破了 (I broke the cup — active blame) vs 杯子被打破了 (the cup got broken — event view). Same fact, two spotlights.',
            examples: [
                { hanzi: '弟 弟 把 杯 子 打 破 了 。 ↔ 杯 子 被 弟 弟 打 破 了 。', pinyin: 'the mirror pair', en: 'blame view · event view' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '被': { en: 'by (passive) / quilt', pron: 'bèi', tone: '4', measure: '床 (quilt)', note: '被偷/被骗/被批评 — misfortune-leaning. 被子 = the quilt.' },
        '偷': { en: 'to steal', pron: 'tōu', tone: '1', note: '被偷了 = got stolen.' },
        '打破': { en: 'to smash', pron: 'dǎpò', tone: '3-4', note: '打 + 破 result.' },
        '骗': { en: 'to cheat', pron: 'piàn', tone: '4', note: '被骗了 = got fooled. 骗人 = trick people.' },
        '批评': { en: 'to criticize', pron: 'pīpíng', tone: '1-2', note: '被批评 = got criticized. Opposite: 表扬.' },
        '表扬': { en: 'to praise', pron: 'biǎoyáng', tone: '3-2', note: '得到表扬 = receive praise (the pleasant passive).' },
        '受到': { en: 'to receive / suffer', pron: 'shòudào', tone: '4-4', note: '受到影响/受到欢迎 — the neutral receive.' },
        '解决': { en: 'to solve', pron: 'jiějué', tone: '3-2', note: '问题解决了 — the notional passive star.' },
        '发现': { en: 'to discover', pron: 'fāxiàn', tone: '1-4', note: '我发现…的时候 = when I found out.' },
        '开除': { en: 'to fire (from a job)', pron: 'kāichú', tone: '1-1', note: '被公司开除了 — the harsh passive.' },
        '锁': { en: 'to lock', pron: 'suǒ', tone: '3', note: '把门锁好 = lock the door tight (把\u2019s friend).' },
        '心情': { en: 'mood', pron: 'xīnqíng', tone: '1-2', note: '心情好/不好 — the inner weather.' },
    },
};

// ── HSK 3 · 了, 过 & 着 — Aspect Masterclass ────────────────────────────────
const h3Aspect: StaticChineseLesson = {
    title: '了, 过 & 着 — Aspect Masterclass',
    objective: 'Command all three aspect markers at once: 了 (perfective — it happened), 过 (experiential — it happened in my life), 着 (continuous state — it is happening/being), plus 在/正在 for right-now — and combine them in one sentence without mixing their jobs.',

    vocabulary: [
        { hanzi: '着', pinyin: 'zhe', en: 'continuous-state marker', example: { hanzi: '门 开 着 。', pinyin: 'mén kāi zhe .', en: 'The door is (standing) open.' }, related: [{ hanzi: '穿 着', pinyin: 'chuān zhe', en: 'be wearing' }] },
        { hanzi: '正 在', pinyin: 'zhèngzài', en: 'in the middle of (right now)', example: { hanzi: '我 正 在 上 课 。', pinyin: 'wǒ zhèngzài shàng kè .', en: 'I\u2019m in class right now.' }, related: [{ hanzi: '在', pinyin: 'zài', en: 'progress marker' }] },
        { hanzi: '戴', pinyin: 'dài', en: 'to wear (on the head/face/hands)', example: { hanzi: '他 戴 着 眼 镜 。', pinyin: 'tā dài zhe yǎnjìng .', en: 'He\u2019s wearing glasses.' }, related: [{ hanzi: '穿', pinyin: 'chuān', en: 'wear (body clothes)' }] },
        { hanzi: '拿 着', pinyin: 'názhe', en: 'holding', example: { hanzi: '她 拿 着 一 杯 茶 。', pinyin: 'tā ná zhe yì bēi chá .', en: 'She\u2019s holding a cup of tea.' }, related: [{ hanzi: '带 着', pinyin: 'dài zhe', en: 'carrying along' }] },
        { hanzi: '记', pinyin: 'jì', en: 'to remember / note', example: { hanzi: '记 着 这 个 词 。', pinyin: 'jì zhe zhè ge cí .', en: 'Keep this word in mind.' }, related: [{ hanzi: '记 住', pinyin: 'jìzhù', en: 'memorize (fix it in)' }] },
        { hanzi: '经 理', pinyin: 'jīnglǐ', en: 'manager', example: { hanzi: '经 理 正 在 开 会 。', pinyin: 'jīnglǐ zhèngzài kāi huì .', en: 'The manager is in a meeting.' }, related: [{ hanzi: '开 会', pinyin: 'kāihuì', en: 'hold a meeting' }] },
        { hanzi: '一 直', pinyin: 'yìzhí', en: 'all along / continuously', example: { hanzi: '我 一 直 在 等 你 。', pinyin: 'wǒ yìzhí zài děng nǐ .', en: 'I\u2019ve been waiting for you the whole time.' }, related: [{ hanzi: '直', pinyin: 'zhí', en: 'straight' }] },
        { hanzi: '丽', pinyin: 'lì', en: 'beautiful (in 漂亮丽? no — in 美丽)', example: { hanzi: '美 丽 的 城 市', pinyin: 'měilì de chéngshì', en: 'a beautiful city' }, related: [{ hanzi: '美 丽', pinyin: 'měilì', en: 'beautiful (written)' }] },
        { hanzi: '关 着', pinyin: 'guānzhe', en: 'closed (state)', example: { hanzi: '店 门 关 着 。', pinyin: 'diàn mén guān zhe .', en: 'The shop door is closed.' }, related: [{ hanzi: '开 着', pinyin: 'kāi zhe', en: 'open (state)' }] },
        { hanzi: '坐 着', pinyin: 'zuòzhe', en: 'sitting', example: { hanzi: '他 坐 着 看 书 。', pinyin: 'tā zuò zhe kàn shū .', en: 'He reads while sitting.' }, related: [{ hanzi: '站 着', pinyin: 'zhàn zhe', en: 'standing' }] },
    ],

    characters: [
        { hanzi: '着', pinyin: 'zhe / zháo / zhāo', en: 'continuous marker', components: '羊(horn) + 目(eye)', mnemonic: 'The SAME character family as 睡觉\u2019s 觉 — three readings: zhe (continuous), zháo (睡着 asleep), zhāo (a move/trick). The multi-personality character.' },
        { hanzi: '戴', pinyin: 'dài', en: 'to wear (head/face)', components: '田 + 共 + 戈', mnemonic: 'A dense character — things you 戴 sit ON you: 眼镜, 帽子, 手表. 穿 clothes, 戴 accessories.' },
        { hanzi: '等', pinyin: 'děng', en: 'to wait', components: '竹(bamboo) + 寺(temple)', mnemonic: 'BAMBOOO + TEMPLE — waiting at the temple with a bamboo mat. 我一直在等你 = the HSK-3 waiting line.' },
        { hanzi: '直', pinyin: 'zhí', en: 'straight', components: '十 + 且-ish eye', mnemonic: 'A straight vertical line with a base — 一直 = straight-along = all along. 直走 = go straight.' },
        { hanzi: '静', pinyin: 'jìng', en: 'quiet', components: '青 + 争', mnemonic: '青 (pure) + 争 (contend) — quiet wins the fight. 安静 = peaceful; the classroom word.' },
        { hanzi: '糊', pinyin: 'hú', en: 'paste / confused (in 糊涂)', components: '米(rice) + 胡', mnemonic: 'RICE + 胡 — rice-paste on the brain = confused. 我有点儿糊涂了. A fun HSK-3 feeling word.' },
    ],

    pronunciation: [
        { hanzi: '着 three ways', pinyin: 'zhe · zháo · zhāo', toneNote: 'zhe = continuous (开着); zháo = achieve (睡着 asleep); zhāo = a trick (高着). Context is king.', en: 'The triple-reader.' },
        { hanzi: '正 在', pinyin: 'zhèngzài', toneNote: '4-4: two stomps — the urgent-now marker.', en: 'right-this-minute.' },
        { hanzi: '一 直', pinyin: 'yìzhí', toneNote: '一 sandhi: yí before 2nd? 一 + 直(2nd) → yì zhí (4th). The chameleon again.', en: 'all along = yìzhí.' },
        { hanzi: '戴 着', pinyin: 'dài zhe', toneNote: '4-neutral: wear-and-be-wearing.', en: 'the state of being dressed.' },
        { hanzi: '拿 着', pinyin: 'ná zhe', toneNote: '2-neutral: rising then light.', en: 'holding.' },
        { hanzi: '安 静', pinyin: 'ānjìng', toneNote: '1-4: plateau then stomp — the library word.', en: 'quiet, please.' },
    ],

    grammar: {
        rule: 'Three markers, three jobs: V+了 = completed (我吃了饭); V+过 = life experience (我去过北京); V+着 = continuous state (门开着). Right-now action = 在/正在 + verb (他在睡觉). The verb NEVER conjugates — the marker carries the aspect.',
        explanation: 'Aspect answers "what KIND of happening", not "when". 了 snaps the action shut: 我吃了饭 (ate it, done) — with the object, 了 sits after the verb; sentence-final 了 announces a new situation (下雨了). 过 stamps life experience: 我去过北京 (been there at least once; negate 没去过; count 去过两次). 着 paints a continuous STATE — doors standing open (开着), people wearing glasses (戴着眼镜), holding cups (拿着), sleeping sitting up (坐着看书) — it describes the BACKDROP of a scene, often the second clause. For action-in-progress, Chinese uses 在/正在 before the verb: 他在睡觉 (he\u2019s sleeping right now) — NOT 睡着 for this job (睡着 means fallen asleep). Combinations: 正在 + verb + 呢 doubles the now (正在上课呢); 了 and 过 never stack on the same verb (吃过了 exists as "have eaten before" = 过 wins the meaning); 着 and 了 can coexist across clauses (他拿着伞出去了 — holding it, he went out).',
        examples: [
            { hanzi: '我 吃 了 早 饭 。', pinyin: 'wǒ chī le zǎofàn .', en: 'I ate breakfast (done).', breakdown: ['V + 了 = perfective', 'object after', 'the A2 machine, recalled'] },
            { hanzi: '我 去 过 北 京 两 次 。', pinyin: 'wǒ qù guo Běijīng liǎng cì .', en: 'I\u2019ve been to Beijing twice.', breakdown: ['V + 过 = life experience', '次数 counts', 'never for today\u2019s single event'] },
            { hanzi: '门 开 着 。', pinyin: 'mén kāi zhe .', en: 'The door is open (state).', breakdown: ['V + 着 = continuous state', 'subject is the thing', 'paints the scene'] },
            { hanzi: '他 正 在 睡 觉 呢 。', pinyin: 'tā zhèngzài shuìjiào ne .', en: 'He\u2019s sleeping right now.', breakdown: ['正在 + verb = in progress', '呢 doubles the now', 'NOT 睡着 (that = fell asleep)'] },
            { hanzi: '她 戴 着 眼 镜 ， 拿 着 一 本 书 。', pinyin: 'tā dài zhe yǎnjìng , ná zhe yì běn shū .', en: 'She\u2019s wearing glasses, holding a book.', breakdown: ['two 着-states as backdrop', '戴 accessories / 穿 clothes', 'the portrait pattern'] },
            { hanzi: '他 拿 着 伞 出 去 了 。', pinyin: 'tā ná zhe sǎn chū qù le .', en: 'Holding an umbrella, he went out.', breakdown: ['V+着 first clause = backdrop', '了 second clause = the event', 'the classic combination'] },
        ],
        commonMistakes: [
            '在 + verb for states: 门在开着 — WRONG. 在/正在 mark ACTION in progress; states take 着: 门开着.',
            '睡着 for "is sleeping": 他睡着 means he FELL ASLEEP (achieved state). "Is sleeping" = 在睡觉/在睡呢.',
            ' Mixing 了 and 过 on one verb: 我吃了过北京 — WRONG. One aspect per verb: 吃了 (this once) OR 吃过 (in my life).',
            '了 for experience counting: 我去了两次中国 (in a narrative) vs 去过两次 (life resume) — the exam asks 你去过…吗 precisely to trigger 过.',
        ],
    },

    patterns: [
        { type: 'Perfective', hanzi: 'V + 了 (+ object)', pinyin: 'wǒ chī le zǎofàn .', en: 'it happened, done' },
        { type: 'Experiential', hanzi: 'V + 过 (+ 次)', pinyin: 'wǒ qù guo liǎng cì .', en: 'it happened in my life' },
        { type: 'Continuous state', hanzi: 'V + 着', pinyin: 'mén kāi zhe .', en: 'the scene\u2019s backdrop' },
        { type: 'In progress', hanzi: '(正) 在 + V (+ 呢)', pinyin: 'tā zhèngzài shuìjiào ne .', en: 'right now' },
        { type: 'Backdrop + event', hanzi: 'V1 + 着 … ， V2 + 了 …', pinyin: 'tā ná zhe sǎn chū qù le .', en: 'holding it, he went' },
        { type: 'Duration state', hanzi: '一 直 + 在 + V', pinyin: 'wǒ yìzhí zài děng nǐ .', en: 'I\u2019ve been waiting all along' },
    ],

    sentenceBuilding: [
        { hanzi: '他 在 睡 觉 。', pinyin: 'tā zài shuìjiào .', en: 'He\u2019s sleeping.' },
        { hanzi: '他 在 睡 觉 ， 门 开 着 ， 灯 也 开 着 。', pinyin: '… mén kāi zhe , dēng yě kāi zhe .', en: 'He\u2019s asleep — door open, light on too.' },
        { hanzi: '他 睡 着 了 ， 可 是 电 视 还 开 着 。', pinyin: 'tā shuì zháo le , kěshì diànshì hái kāi zhe .', en: 'He fell asleep, but the TV is still on.' },
        { hanzi: '我 一 直 在 门 外 站 着 ， 没 敲 门 。', pinyin: 'wǒ yìzhí zài mén wài zhàn zhe , méi qiāo mén .', en: 'I stood outside the whole time and didn\u2019t knock.' },
        { hanzi: '后 来 他 戴 着 眼 镜 拿 着 钥 匙 出 去 了 —— 原 来 是 去 买 早 饭 。', pinyin: 'hòulái tā dài zhe yǎnjìng ná zhe yàoshi chū qù le —— yuánlái shì qù mǎi zǎofàn .', en: 'Later he went out wearing glasses, holding keys — turns out, buying breakfast.' },
    ],

    practice: [
        { instruction: 'Mark completion:', question: '我 吃 ___ 早 饭 。 (done)', answer: '了 — 吃了' },
        { instruction: 'Mark life experience:', question: '我 去 ___ 北 京 。 (been there)', answer: '过 — 去过' },
        { instruction: 'Paint the state:', question: '门 开 ___ 。', answer: '着 — 开着 = standing open' },
        { instruction: 'Right-now action:', question: '他 ___ 睡 觉 呢 。', answer: '正 在 — 正在睡觉呢' },
        { instruction: 'Fallen asleep:', question: '他 睡 ___ 了 。', answer: '着 (zháo) — 睡着了 = achieved sleep' },
        { instruction: 'Backdrop + event:', question: '她 拿 着 伞 出 ___ 了 。', answer: '去 — 拿着…出去了' },
    ],

    translationPractice: [
        { en: 'I ate breakfast (already).', hanzi: '我 吃 了 早 饭 。', pinyin: 'wǒ chī le zǎofàn .' },
        { en: 'I\u2019ve been to Shanghai twice.', hanzi: '我 去 过 两 次 上 海 。', pinyin: 'wǒ qù guo liǎng cì Shànghǎi .' },
        { en: 'The door is open; the window is closed.', hanzi: '门 开 着 ， 窗 户 关 着 。', pinyin: 'mén kāi zhe , chuānghu guān zhe .' },
        { en: 'The manager is in a meeting right now.', hanzi: '经 理 正 在 开 会 。', pinyin: 'jīnglǐ zhèngzài kāi huì .' },
        { en: 'She\u2019s wearing glasses and holding a phone.', hanzi: '她 戴 着 眼 镜 ， 拿 着 手 机 。', pinyin: 'tā dài zhe yǎnjìng , ná zhe shǒujī .' },
        { en: 'I\u2019ve been waiting for you the whole time.', hanzi: '我 一 直 在 等 你 。', pinyin: 'wǒ yìzhí zài děng nǐ .' },
    ],

    reverseTranslation: [
        { hanzi: '他 睡 着 了 。', pinyin: 'tā shuì zháo le .', en: 'He fell asleep.' },
        { hanzi: '外 面 下 着 雨 。', pinyin: 'wàimiàn xià zhe yǔ .', en: 'It\u2019s raining outside (rain falling as backdrop).' },
        { hanzi: '我 没 带 钥 匙 ， 门 关 着 呢 。', pinyin: 'wǒ méi dài yàoshi , mén guān zhe ne .', en: 'I didn\u2019t bring keys — the door\u2019s shut.' },
        { hanzi: '别 站 着 ， 坐 吧 。', pinyin: 'bié zhàn zhe , zuò ba .', en: 'Don\u2019t stand — sit.' },
    ],

    register: {
        casual: '吃 着 呢 ！ — the doubled now: eating-right-now (answering 吃了吗).',
        polite: '您 先 坐 着 ， 我 马 上 来 。 — 您 + 先 + 着 = the polite hold-on.',
        formal: '该 项 目 目 前 正 在 进 行 中 。 — 正在进行中 = the announcement\u2019s in-progress.',
    },

    culture: 'Chinese camera-language: 着 paints the frozen frame (door open, glasses on, rain falling outside 下着雨), 在/正在 hit record (right now!), 了 cuts the scene (done). Storytelling stacks them like film: 他开着车，听着音乐，突然电话响了 — driving, listening, THEN the phone rang. The 着-backdrop is why Chinese descriptions feel cinematic. And the exam\u2019s photo-description task is exactly this skill: say what people are wearing (戴着), holding (拿着), and doing (正在) — three markers, one picture.',

    freeProduction: 'Record a scene description (8–10 lines) like a camera: 我的朋友正坐着呢 — what he\u2019s wearing (穿着/戴着), holding (拿着), the room\u2019s states (门开着/灯关着), what\u2019s happening outside (外面下着雨), what just happened (了), and what he has done in his life (去过…). Every marker used once, minimum.',

    miniTest: [
        { question: 'The door is (standing) open:', options: ['门 开 了 。', '门 开 着 。', '门 在 开 。', '门 开 过 。'], answer: '门 开 着 。 — V+着 = continuous state' },
        { question: 'He FELL asleep:', options: ['他 在 睡 觉 。', '他 睡 着 了 。', '他 睡 了 。', '他 睡 过 。'], answer: '他 睡 着 了 。 — 睡着 (zháo) = achieved sleep' },
        { question: 'I\u2019ve BEEN to Beijing twice:', options: ['我 去 了 两 次 。', '我 去 过 两 次 。', '我 去 着 两 次 。', '我 两 次 去 了 。'], answer: '我 去 过 两 次 。 — V+过 + 次' },
        { question: 'Right-now action takes:', options: ['着', '过', '在/正在', '了'], answer: '在/正在 — 正在上课呢' },
        { question: '她戴着眼镜 — 戴 is for:', options: ['body clothes', 'accessories (glasses/hats/watches)', 'holding things', 'eating'], answer: 'accessories (glasses/hats/watches) — 穿 clothes, 戴 accessories' },
    ],

    review: [
        'HSK-2\u2019s 了/过 split now grows a third sibling: 着 — the scene painter.',
        'Next: serial verbs — two verbs, one subject (我去买东西), the sentence shape behind 拿着…出去了.',
    ],

    traps: [
        '着 = STATE (door open, wearing, holding); 在/正在 = ACTION happening (睡觉呢). 门在开着 ✗ → 门开着 ✓.',
        '睡着 (zháo) = fell asleep (achievement); 在睡觉 = is sleeping. One syllable changes the meaning.',
        '了 and 过 never stack on one verb: 吃了 (this once) OR 吃过 (in my life) — 吃了过 ✗.',
        '着 paints the backdrop clause; the main event takes 了: 拿着伞出去了.',
    ],

    homework: {
        intro: 'Three markers, one picture: 了 snaps, 过 remembers, 着 paints.',
        translation: [
            { prompt: 'I ate breakfast (already).', answer: '我 吃 了 早 饭 。', alt: ['我吃了早饭。'], explanation: '了 = perfective completion.' },
            { prompt: 'I\u2019ve been to Shanghai twice.', answer: '我 去 过 两 次 上 海 。', alt: ['我去过两次上海。'], explanation: '过 + 次 = life experience counted.' },
            { prompt: 'The door is open and the window is closed.', answer: '门 开 着 ， 窗 户 关 着 。', alt: ['门开着，窗户关着。'], explanation: 'Two 着-states paint the scene.' },
            { prompt: 'The manager is in a meeting right now.', answer: '经 理 正 在 开 会 。', alt: ['经理正在开会。'], explanation: '正在 + verb = in progress.' },
            { prompt: 'He fell asleep.', answer: '他 睡 着 了 。', alt: ['他睡着了。'], explanation: '睡着 (zháo) = achieved sleep — not 在睡觉.' },
            { prompt: 'I\u2019ve been waiting for you the whole time.', answer: '我 一 直 在 等 你 。', alt: ['我一直都在等你。'], explanation: '一直 + 在 + verb = continuous duration.' },
        ],
        blanks: [
            { prompt: '我 吃 ___ 早 饭 。 (done)', answer: '了', explanation: 'Perfective 了.' },
            { prompt: '我 去 ___ 北 京 两 次 。 (life)', answer: '过', explanation: '过 + 次 counting.' },
            { prompt: '门 开 ___ 。 (state)', answer: '着', explanation: '着 = the backdrop.' },
            { prompt: '他 正 在 上 课 ___ 。 (right-now softener)', answer: '呢', explanation: '正在…呢 = the now-doubler.' },
            { prompt: '他 睡 ___ 了 。 (fell asleep)', answer: '着', explanation: '睡着 (zháo) = achieved sleep.' },
            { prompt: '她 戴 ___ 眼 镜 。 (wearing)', answer: '着', explanation: '戴着 = wearing (state).' },
        ],
        corrections: [
            { prompt: '门 在 开 着 。', answer: '门 开 着 。', explanation: 'How the mistake happens: 在 for everything ongoing. Why it does not work: 在/正在 marks ACTION; the door\u2019s openness is a STATE — 着. How to fix it: 门开着.' },
            { prompt: '他 睡 着 觉 呢 。', answer: '他 在 睡 觉 呢 。 / 他 睡 着 了 。', explanation: 'How the mistake happens: 着 after the verb of 睡觉. Why it does not work: 在睡觉 = is sleeping; 睡着了 = fell asleep. How to fix it: pick the meaning first.' },
            { prompt: '我 吃 了 过 北 京 烤 鸭 。', answer: '我 吃 过 北 京 烤 鸭 。', explanation: 'How the mistake happens: stacking aspect markers. Why it does not work: one aspect per verb — experience takes 过 alone. How to fix it: 吃过.' },
            { prompt: '她 穿 着 眼 镜 。', answer: '她 戴 着 眼 镜 。', explanation: 'How the mistake happens: 穿 for everything worn. Why it does not work: 穿 = body clothes; accessories (glasses/hats/watches) take 戴. How to fix it: 戴着眼镜.' },
            { prompt: '我 去 了 两 次 中 国 （life resume）.', answer: '我 去 过 两 次 中 国 。', explanation: 'How the mistake happens: 了 for all pasts. Why it does not work: counted life experience = 过 + 次. How to fix it: 去过两次.' },
        ],
        writing: {
            task: 'Write a scene description (10–12 lines) like a camera: what people are wearing/holding (戴着/拿着/穿着), the room\u2019s states (门开着/灯关着), what someone is doing right now (正在…呢), what just happened (了), and one life-experience line (去过…). Then one backdrop+event combination (V着…，V了…).',
            requirements: [
                'Two 着 states (wear/hold OR open/closed)',
                'One 正在…呢 action',
                'One 睡着/记住-style achievement (着 zháo)',
                'One 了 event and one 过 experience',
                'One backdrop+event combo (拿着…出去了)',
            ],
            minWords: 60,
        },
        checklist: [
            'I split the three markers: 了 done · 过 life · 着 state',
            'I use 在/正在 for right-now action — not 着',
            'I know 睡着了 (fell asleep) vs 在睡觉 (is sleeping)',
            'I pick 穿 (body clothes) vs 戴 (accessories)',
            'I paint backdrops then land the event: V着…，V了…',
            'I count experience with 过 + 次',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The three-marker map: 了 = the scene CUT (completed); 过 = the photo album (life experience); 着 = the frozen FRAME (state). 在/正在 = recording now.',
            examples: [
                { hanzi: '吃 了 · 去 过 · 开 着 · 在 睡 觉', pinyin: 'chī le · qù guo · kāi zhe · zài shuìjiào', en: 'ate · have been · standing open · is sleeping' },
            ],
        },
        {
            explanation: '着 with posture and wear: 坐着, 站着, 躺着, 穿着, 戴着, 拿着 — the portrait toolkit. Two in one sentence = a full picture.',
            examples: [
                { hanzi: '他 站 着 ， 拿 着 一 杯 咖 啡 。', pinyin: 'tā zhàn zhe , ná zhe yì bēi kāfēi .', en: 'He stands holding a coffee.' },
            ],
        },
        {
            explanation: '着 as achievement (zháo): 睡着了 (fell asleep), 找着了 (found it), 点着了 (lit it). The 2nd-tone reading = success reached.',
            examples: [
                { hanzi: '钥 匙 找 着 了 ！', pinyin: 'yàoshi zhǎo zháo le !', en: 'Found the keys!' },
            ],
        },
        {
            explanation: 'The backdrop+event combo: first clause V着 (scene), second clause the event with 了: 拿着伞出去了 · 听着音乐睡着了.',
            examples: [
                { hanzi: '听 着 音 乐 睡 着 了 。', pinyin: 'tīng zhe yīnyuè shuì zháo le .', en: 'Fell asleep listening to music.' },
            ],
        },
        {
            explanation: '在/正在/正…呢: three strengths of NOW — 在上课 (am in class) · 正在上课 (in class right this minute) · 上课呢 (casual now).',
            examples: [
                { hanzi: '我 正 在 开 会 呢 。', pinyin: 'wǒ zhèngzài kāi huì ne .', en: 'I\u2019m in a meeting right now.' },
            ],
        },
        {
            explanation: '穿 vs 戴 vs 拿: 穿 clothes on the body (衬衫/鞋), 戴 accessories (眼镜/帽子/手表), 拿 in the hand (手机/伞).',
            examples: [
                { hanzi: '穿 衬 衫 · 戴 帽 子 · 拿 伞', pinyin: 'chuān chènshān · dài màozi · ná sǎn', en: 'wear a shirt · wear a hat · hold an umbrella' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '着': { en: 'continuous marker / zháo-achieve', pron: 'zhe / zháo', tone: 'neutral / 2', note: '开着 (state) · 睡着了 (achieved) · 高着 (trick) — the triple-reader.' },
        '正在': { en: 'right now (in progress)', pron: 'zhèngzài', tone: '4-4', note: '正在 + verb + 呢 — the urgent now.' },
        '一直': { en: 'all along / continuously', pron: 'yìzhí', tone: '4-2', note: '一直在等你 — the waiting word.' },
        '戴': { en: 'to wear (accessories)', pron: 'dài', tone: '4', note: '戴眼镜/帽子/手表 — vs 穿 for clothes.' },
        '穿着': { en: 'wearing (clothes)', pron: 'chuān zhe', tone: '1-neutral', note: '她穿着红衣服 — the portrait.' },
        '拿着': { en: 'holding', pron: 'ná zhe', tone: '2-neutral', note: '拿着手机 — the in-hand state.' },
        '安静': { en: 'quiet', pron: 'ānjìng', tone: '1-4', note: '请安静 — the library word.' },
        '开会': { en: 'to hold a meeting', pron: 'kāihuì', tone: '1-4', note: '正在开会 — the office now.' },
        '糊涂': { en: 'muddled / confused', pron: 'hútu', tone: '2-neutral', note: '我有点儿糊涂了 — the fun feeling word.' },
        '原来': { en: 'it turns out / originally', pron: 'yuánlái', tone: '2-2', note: '原来是… = so THAT\u2019s what happened.' },
        '敲': { en: 'to knock', pron: 'qiāo', tone: '1', note: '敲门 = knock on the door.' },
        '风景': { en: 'scenery', pron: 'fēngjǐng', tone: '1-3', note: '风景很美 — the travel-review word.' },
    },
};

export const CHINESE_B1_PART1: Record<string, StaticChineseLesson> = {
    '3:ba': h3Ba,
    '3:bei': h3Bei,
    '3:aspect': h3Aspect,
};

export const CHINESE_B1_PART1_EXTRAS: Record<string, { warmup?: WarmupItem[]; verbTables?: VerbTableBlock[]; useCases?: UseCaseBlock[]; shadowing?: ShadowingBlock }> = {
    '3:ba': {
        warmup: [
            { q: 'The three aspect markers and their jobs?', a: '了 = completed · 过 = life experience · 着 = continuous state.' },
            { q: 'Right-now action takes…?', a: '在/正在 + verb (正在上课呢).' },
            { q: '睡着了 means?', a: 'FELL asleep (着 = zháo, achieved) — not "is sleeping".' },
            { q: '我戴眼镜 — 戴 or 穿 for glasses?', a: '戴 — accessories; 穿 is body clothes.' },
            { q: 'Been to Beijing twice?', a: '去 过 两 次 北 京 — 过 + 次.' },
        ],
        verbTables: [
            {
                title: 'The result-complement toolbox (把\u2019s engine)',
                rows: [
                    { label: 'finish', form: '写 完 · 吃 完 · 用 完', pron: 'xiě wán · chī wán · yòng wán' },
                    { label: 'nicely done', form: '修 好 · 做 好 · 准 备 好', pron: 'xiū hǎo · zuò hǎo · zhǔnbèi hǎo' },
                    { label: 'reach/obtain', form: '买 到 · 找 到 · 看 到', pron: 'mǎi dào · zhǎo dào · kàn dào' },
                    { label: 'place', form: '放 在 · 坐 在 · 写 在', pron: 'fàng zài · zuò zài · xiě zài' },
                    { label: 'attach', form: '关 上 · 戴 上 · 记 上', pron: 'guān shàng · dài shàng · jì shàng' },
                    { label: 'transform', form: '翻 译 成 · 变 成', pron: 'fānyì chéng · biànchéng' },
                ],
            },
            {
                title: 'The regret family (弄-verbs)',
                rows: [
                    { label: 'lose', form: '弄 丢 了', pron: 'nòng diū le' },
                    { label: 'dirty', form: '弄 脏 了', pron: 'nòng zāng le' },
                    { label: 'break', form: '弄 坏 了', pron: 'nòng huài le' },
                    { label: 'loud', form: '弄 出 声 音', pron: 'nòng chū shēngyīn' },
                ],
            },
        ],
        useCases: [
            {
                word: '把 — three green lights, one red light',
                uses: [
                    { use: 'relocation ✓', examples: [{ fr: '把 书 放 在 桌 子 上 。', en: 'Put the book on the desk.' }] },
                    { use: 'disposal ✓', examples: [{ fr: '把 垃 圆 倒 了 。', en: 'Take the trash out.' }] },
                    { use: 'transformation ✓', examples: [{ fr: '把 英 语 翻 译 成 汉 语 。', en: 'Translate English into Chinese.' }] },
                    { use: 'states/feelings ✗', examples: [{ fr: '✗ 把 汉 语 喜 欢', en: 'feelings never take 把' }] },
                ],
            },
            {
                word: '把 vs 将 — register twins',
                uses: [
                    { use: 'spoken 把', examples: [{ fr: '把 门 关 上 。', en: 'Shut the door (speech).' }] },
                    { use: 'written 将', examples: [{ fr: '请 将 文 件 签 字 。', en: 'Please sign the document (formal).' }] },
                    { use: 'exam instructions', examples: [{ fr: '将 下 面 的 句 子 翻 译 成 英 语 。', en: 'HSK instructions use 将' }] },
                    { use: 'measure word too', examples: [{ fr: '一 把 刀 · 一 把 伞', en: 'gripped things' }] },
                ],
            },
        ],
        shadowing: {
            intro: '把 rhythm: object lifted, verb lands on the result. Read each line as a chore you actually mean.',
            lines: [
                { fr: '把 门 关 上 ， 把 灯 关 了 。', pron: 'bǎ mén guān shàng , bǎ dēng guān le .', en: 'Shut the door; kill the light.' },
                { fr: '把 书 放 在 桌 子 上 。', pron: 'bǎ shū fàng zài zhuōzi shàng .', en: 'Put the book on the desk.' },
                { fr: '把 作 业 写 完 再 玩 。', pron: 'bǎ zuòyè xiě wán zài wán .', en: 'Finish the homework, THEN play.' },
                { fr: '别 把 手 机 弄 丢 了 ！', pron: 'bié bǎ shǒujī nòng diū le !', en: 'Don\u2019t lose the phone!' },
                { fr: '把 这 些 苹 果 洗 干 净 。', pron: 'bǎ zhèxiē píngguǒ xǐ gānjìng .', en: 'Wash these apples clean.' },
                { fr: '要 是 把 钥 匙 丢 了 ， 就 进 不 去 了 。', pron: 'yàoshi bǎ yàoshi diū le , jiù jìn bu qù le .', en: 'Lose the keys and we\u2019re locked out.' },
            ],
        },
    },
    '3:bei': {
        warmup: [
            { q: 'The 把 frame?', a: '把 + specific object + verb + RESULT (完/好/在/上/给/成).' },
            { q: 'Where do 没/别/都 go?', a: 'BEFORE 把: 没把…, 别把….' },
            { q: 'States with 把?', a: 'Banned — 喜欢/是/下雨 never take it.' },
            { q: 'The written 把?', a: '将 — 请将文件翻译成英文.' },
            { q: '一把刀 — what job is 把 here?', a: 'Measure word for gripped things (knife/umbrella/chair).' },
        ],
        verbTables: [
            {
                title: 'The 被 frame — full and short',
                rows: [
                    { label: 'full (agent named)', form: '杯 子 被 他 打 破 了 。', pron: 'bēizi bèi tā dǎpò le .' },
                    { label: 'agentless', form: '手 机 被 偷 了 。', pron: 'shǒujī bèi tōu le .' },
                    { label: 'negated', form: '手 机 没 被 偷 。', pron: 'shǒujī méi bèi tōu .' },
                    { label: 'colloquial', form: '杯 子 叫 弟 弟 打 破 了 。', pron: 'bēizi jiào dìdi dǎpò le .' },
                    { label: 'formal report', form: '问 题 已 得 到 解 决 。', pron: 'wèntí yǐ dédào jiějué .' },
                ],
            },
            {
                title: 'The notional passives — no marker',
                rows: [
                    { label: 'meal', form: '饭 吃 完 了 。', pron: 'fàn chī wán le .' },
                    { label: 'homework', form: '作 业 写 完 了 。', pron: 'zuòyè xiě wán le .' },
                    { label: 'problem', form: '问 题 解 决 了 。', pron: 'wèntí jiějué le .' },
                    { label: 'room', form: '房 间 收 拾 好 了 。', pron: 'fángjiān shōushi hǎo le .' },
                ],
            },
        ],
        useCases: [
            {
                word: '把 vs 被 — the two spotlights',
                uses: [
                    { use: '把 — YOUR action on it', examples: [{ fr: '弟 弟 把 杯 子 打 破 了 。', en: 'The kid broke the cup (blame view).' }] },
                    { use: '被 — what happened TO it', examples: [{ fr: '杯 子 被 打 破 了 。', en: 'The cup got broken (event view).' }] },
                    { use: 'same fact, two frames', examples: [{ fr: 'mirror sentences', en: 'choose the spotlight the story needs' }] },
                    { use: '被 leans unlucky', examples: [{ fr: '被 偷 · 被 骗 · 被 批 评', en: 'stolen · fooled · criticized' }] },
                ],
            },
            {
                word: 'the 受/得到 family — pleasant passives',
                uses: [
                    { use: 'receive praise', examples: [{ fr: '得 到 表 扬', en: 'got praised (formal-safe)' }] },
                    { use: 'be popular', examples: [{ fr: '很 受 欢 迎', en: 'very well-received' }] },
                    { use: 'be affected', examples: [{ fr: '受 到 影 响', en: 'was affected' }] },
                    { use: 'be invited', examples: [{ fr: '受 邀 参 加', en: 'was invited to attend' }] },
                ],
            },
        ],
        shadowing: {
            intro: '被 rhythm: receiver first, misfortune lands. Read each line as a news brief.',
            lines: [
                { fr: '我 的 手 机 被 偷 了 。', pron: 'wǒ de shǒujī bèi tōu le .', en: 'My phone got stolen.' },
                { fr: '杯 子 被 弟 弟 打 破 了 。', pron: 'bēizi bèi dìdi dǎpò le .', en: 'The cup got broken by the kid.' },
                { fr: '他 被 老 板 批 评 了 。', pron: 'tā bèi lǎobǎn pīpíng le .', en: 'He got criticized by the boss.' },
                { fr: '作 业 已 经 写 完 了 。', pron: 'zuòyè yǐjīng xiě wán le .', en: 'The homework is done (notional).' },
                { fr: '手 机 没 被 偷 ， 是 我 丢 的 。', pron: 'shǒujī méi bèi tōu , shì wǒ diū de .', en: 'It wasn\u2019t stolen — I lost it.' },
                { fr: '小 偷 已 经 被 抓 住 了 。', pron: 'xiǎotōu yǐjīng bèi zhuāzhù le .', en: 'The thief has been caught.' },
            ],
        },
    },
    '3:aspect': {
        warmup: [
            { q: 'The 把 result toolbox — name three.', a: '完 (finish), 在 (place), 上 (attach) — plus 好/到/给/成.' },
            { q: 'Where does 没/别 go with 把?', a: 'BEFORE 把: 没把…, 别把….' },
            { q: 'The colloquial passive?', a: '叫/让/给 — 杯子叫他打破了.' },
            { q: '饭吃完了 is…?', a: 'A notional passive — no marker, word order alone.' },
            { q: '把\u2019s written twin?', a: '将 — 请将…翻译成…' },
        ],
        verbTables: [
            {
                title: 'The three markers — one table',
                rows: [
                    { label: '了 perfective', form: '我 吃 了 早 饭 。', pron: 'wǒ chī le zǎofàn .' },
                    { label: '过 experiential', form: '我 去 过 北 京 。', pron: 'wǒ qù guo Běijīng .' },
                    { label: '着 state', form: '门 开 着 。', pron: 'mén kāi zhe .' },
                    { label: '在 progress', form: '他 在 睡 觉 。', pron: 'tā zài shuìjiào .' },
                    { label: 'zháo achievement', form: '他 睡 着 了 。', pron: 'tā shuì zháo le .' },
                ],
            },
            {
                title: 'The wear/hold set (着\u2019s portraits)',
                rows: [
                    { label: 'body clothes', form: '穿 着 衬 衫', pron: 'chuān zhe chènshān' },
                    { label: 'accessories', form: '戴 着 眼 镜', pron: 'dài zhe yǎnjìng' },
                    { label: 'in hand', form: '拿 着 手 机', pron: 'ná zhe shǒujī' },
                    { label: 'posture', form: '坐 着 / 站 着', pron: 'zuò zhe / zhàn zhe' },
                ],
            },
        ],
        useCases: [
            {
                word: '着 vs 在/正在 — state vs action',
                uses: [
                    { use: 'state (着)', examples: [{ fr: '门 开 着 。 他 坐 着 。', en: 'The door stands open. He sits.' }] },
                    { use: 'action (在/正在)', examples: [{ fr: '他 在 睡 觉 。', en: 'He\u2019s sleeping (in progress).' }] },
                    { use: 'fallen-asleep (着 zháo)', examples: [{ fr: '他 睡 着 了 。', en: 'He FELL asleep.' }] },
                    { use: 'backdrop + event', examples: [{ fr: '听 着 音 乐 睡 着 了 。', en: 'Fell asleep listening to music.' }] },
                ],
            },
            {
                word: '了 vs 过 — this once vs in my life',
                uses: [
                    { use: 'this once (了)', examples: [{ fr: '我 今 天 去 了 上 海 。', en: 'I went to Shanghai today.' }] },
                    { use: 'life resume (过)', examples: [{ fr: '我 去 过 上 海 三 次 。', en: 'I\u2019ve been to Shanghai three times.' }] },
                    { use: 'negation differs', examples: [{ fr: '没 去 (didn\u2019t) · 没 去 过 (never been)', en: 'two different negatives' }] },
                    { use: 'question differs', examples: [{ fr: '去 了 吗 ？ · 去 过 吗 ？', en: 'did you · have you ever' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Aspect rhythm: 了 snaps, 过 floats, 着 holds. Read the portrait sentence extra-slowly.',
            lines: [
                { fr: '我 吃 了 早 饭 ， 去 过 银 行 。', pron: 'wǒ chī le zǎofàn , qù guo yínháng .', en: 'I ate breakfast and have been to the bank.' },
                { fr: '门 开 着 ， 灯 关 着 。', pron: 'mén kāi zhe , dēng guān zhe .', en: 'Door open, light off.' },
                { fr: '他 正 在 开 会 呢 。', pron: 'tā zhèngzài kāi huì ne .', en: 'He\u2019s in a meeting right now.' },
                { fr: '她 戴 着 眼 镜 ， 拿 着 伞 出 去 了 。', pron: 'tā dài zhe yǎnjìng , ná zhe sǎn chū qù le .', en: 'Wearing glasses, holding an umbrella, she went out.' },
                { fr: '听 着 音 乐 睡 着 了 。', pron: 'tīng zhe yīnyuè shuì zháo le .', en: 'Fell asleep to music.' },
                { fr: '我 一 直 在 等 你 。', pron: 'wǒ yìzhí zài děng nǐ .', en: 'I\u2019ve been waiting all along.' },
            ],
        },
    },
};
