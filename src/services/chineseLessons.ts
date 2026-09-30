// Chinese lectures — HSK portal. The gold-standard template lecture + registry.
// ALL Chinese text is authored PRE-SEGMENTED with spaces between words so the
// shared word-tap pipeline (StaticFrText-style splitting → RichWord → glossary
// or AI cards) works unchanged. Every string shows three forms: 汉字—pinyin—English.

import type { HskLesson } from './hskService';
import { BASE_GLOSSARY, type ChineseGlossEntry } from './chineseLessonBase';
import type { WarmupItem, VerbTableBlock, UseCaseBlock, ShadowingBlock } from './frenchLessons';

export interface ChineseHomework {
    intro?: string;
    translation: { prompt: string; answer: string; alt?: string[]; explanation: string }[];
    blanks: { prompt: string; answer: string; explanation: string }[];
    corrections: { prompt: string; answer: string; explanation: string }[];
    writing: { task: string; requirements: string[]; minWords: number };
    checklist: string[];
    shadowing?: ShadowingBlock;
}
export interface ChineseRemedial { explanation: string; examples: { hanzi: string; pinyin: string; en: string }[] }

export interface StaticChineseLesson extends HskLesson {
    traps?: string[];
    homework?: ChineseHomework;
    checklistRemedial?: ChineseRemedial[];
    glossary?: Record<string, ChineseGlossEntry | string>;
    warmup?: WarmupItem[];
    verbTables?: VerbTableBlock[];
    useCases?: UseCaseBlock[];
    shadowing?: ShadowingBlock;
}

// ── HSK 1 · Greetings & Introductions — the gold-standard template ──────────
const h1Greetings: StaticChineseLesson = {
    title: 'Greetings & Introductions',
    objective: 'Greet people politely at the right formality (你好/您好), give your name with 我叫…, state who you are with 我是…, bounce the question back with 你呢？, and turn any statement into a yes/no question with 吗 — the SVO engine everything else builds on.',

    vocabulary: [
        { hanzi: '你 好', pinyin: 'nǐ hǎo', en: 'hello (neutral, any time of day)', example: { hanzi: '你 好 ， 小 明 ！', pinyin: 'nǐ hǎo , Xiǎomíng !', en: 'Hello, Xiaoming!' }, related: [{ hanzi: '您 好', pinyin: 'nín hǎo', en: 'hello (polite)' }] },
        { hanzi: '您 好', pinyin: 'nín hǎo', en: 'hello (polite — elders, strangers, service)', example: { hanzi: '老 师 ， 您 好 ！', pinyin: 'lǎoshī , nín hǎo !', en: 'Hello, teacher! (respectful)' }, related: [{ hanzi: '你 好', pinyin: 'nǐ hǎo', en: 'hello (casual)' }] },
        { hanzi: '再 见', pinyin: 'zàijiàn', en: 'goodbye (lit. see again)', example: { hanzi: '老 师 ， 再 见 ！', pinyin: 'lǎoshī , zàijiàn !', en: 'Goodbye, teacher!' }, related: [{ hanzi: '明 天 见', pinyin: 'míngtiān jiàn', en: 'see you tomorrow' }] },
        { hanzi: '谢 谢', pinyin: 'xièxie', en: 'thank you (doubled = light and friendly)', example: { hanzi: '谢 谢 你 ！', pinyin: 'xièxie nǐ !', en: 'Thank you!' }, related: [{ hanzi: '不 客 气', pinyin: 'bú kèqi', en: 'you\u2019re welcome' }] },
        { hanzi: '不 客 气', pinyin: 'bú kèqi', en: 'you\u2019re welcome (lit. no politeness needed)', example: { hanzi: '— 谢 谢 ！ — 不 客 气 。', pinyin: '— xièxie ! — bú kèqi .', en: '— Thanks! — You\u2019re welcome.' }, related: [{ hanzi: '不 用 谢', pinyin: 'búyòng xiè', en: 'no need to thank' }] },
        { hanzi: '对 不 起', pinyin: 'duìbuqǐ', en: 'sorry / excuse me (apology)', example: { hanzi: '对 不 起 ， 老 师 。', pinyin: 'duìbuqǐ , lǎoshī .', en: 'Sorry, teacher.' }, related: [{ hanzi: '没 关 系', pinyin: 'méi guānxi', en: 'it\u2019s fine / no problem' }] },
        { hanzi: '没 关 系', pinyin: 'méi guānxi', en: 'it doesn\u2019t matter / no problem', example: { hanzi: '— 对 不 起 ！ — 没 关 系 。', pinyin: '— duìbuqǐ ! — méi guānxi .', en: '— Sorry! — No problem.' }, related: [{ hanzi: '不 客 气', pinyin: 'bú kèqi', en: 'you\u2019re welcome' }] },
        { hanzi: '请', pinyin: 'qǐng', en: 'please (before an action, not a request-word)', measureWord: undefined, example: { hanzi: '请 坐 。', pinyin: 'qǐng zuò .', en: 'Please sit.' }, related: [{ hanzi: '请 问', pinyin: 'qǐngwèn', en: 'excuse me (may I ask)' }] },
        { hanzi: '我 叫 …', pinyin: 'wǒ jiào …', en: 'my name is… (lit. I am called)', example: { hanzi: '我 叫 小 明 。', pinyin: 'wǒ jiào Xiǎomíng .', en: 'My name is Xiaoming.' }, related: [{ hanzi: '你 叫 什 么 名 字 ？', pinyin: 'nǐ jiào shénme míngzi ?', en: 'what\u2019s your name?' }] },
        { hanzi: '我 是 …', pinyin: 'wǒ shì …', en: 'I am… (identity: job, nationality)', example: { hanzi: '我 是 老 师 。', pinyin: 'wǒ shì lǎoshī .', en: 'I am a teacher.' }, related: [{ hanzi: '他 是 学 生', pinyin: 'tā shì xuésheng', en: 'he is a student' }] },
        { hanzi: '你 呢 ？', pinyin: 'nǐ ne ?', en: 'and you? (the echo question)', example: { hanzi: '我 很 好 ， 你 呢 ？', pinyin: 'wǒ hěn hǎo , nǐ ne ?', en: 'I\u2019m well — and you?' }, related: [{ hanzi: '你 好 吗 ？', pinyin: 'nǐ hǎo ma ?', en: 'how are you?' }] },
        { hanzi: '很 高 兴', pinyin: 'hěn gāoxìng', en: 'very glad (the greeting adjective)', example: { hanzi: '很 高 兴 认 识 你 。', pinyin: 'hěn gāoxìng rènshi nǐ .', en: 'Very glad to meet you.' }, related: [{ hanzi: '认 识 你', pinyin: 'rènshi nǐ', en: 'to meet you (get to know you)' }] },
    ],

    characters: [
        { hanzi: '你', pinyin: 'nǐ', en: 'you', components: '亻(person) + 尔', mnemonic: 'A PERSON standing beside you — the person radical 亻 marks words about people. 尔 gives the sound.' },
        { hanzi: '好', pinyin: 'hǎo', en: 'good', components: '女(woman) + 子(child)', mnemonic: 'A WOMAN with a CHILD = good. The classic first character — meaning comes straight from the two parts.' },
        { hanzi: '叫', pinyin: 'jiào', en: 'to be called / to call', components: '口(mouth) + 丩', mnemonic: 'A MOUTH (口) doing the calling. Any speaking verb leans on 口: 叫, 唱, 吃.' },
        { hanzi: '谢', pinyin: 'xiè', en: 'to thank', components: '讫(speech) + 身(body) + 寸(inch)', mnemonic: 'SPEECH + body + small measure — thanking with your whole body. Doubled (谢谢) it softens.' },
        { hanzi: '他', pinyin: 'tā', en: 'he', components: '亻(person) + 也', mnemonic: 'PERSON + 也 (also) — he, the other person. Swap the radical for 她 (woman radical 女) = she. Same sound tā.' },
        { hanzi: '吗', pinyin: 'ma', en: 'question particle', components: '口(mouth) + 马(horse)', mnemonic: 'A MOUTH (口) asking about a HORSE (马) — the question goes through your mouth. One of the easiest to remember.' },
        { hanzi: '老', pinyin: 'lǎo', en: 'old / venerable (in 老师)', components: '耂(old) + 匕', mnemonic: 'The OLD-man radical 耂 on top. 老 师 = old master = teacher — respect built into the word.' },
    ],

    pronunciation: [
        { hanzi: '你 好', pinyin: 'nǐ hǎo → ní hǎo', toneNote: 'Two 3rd tones meet: the FIRST becomes 2nd tone (tone sandhi). You write nǐ hǎo, you SAY ní hǎo.', en: 'The most famous sandhi in Chinese — hear it everywhere.' },
        { hanzi: '谢 谢', pinyin: 'xièxie', toneNote: '4th tone + neutral: the second 谢 drops its tone entirely — light and fast.', en: 'Doubled words often lose the second tone.' },
        { hanzi: '不 客 气', pinyin: 'bú kèqi', toneNote: '不 (4th) flips to 2nd tone bú before another 4th tone.', en: 'The other big sandhi: bù → bú.' },
        { hanzi: '再 见', pinyin: 'zàijiàn', toneNote: '4-4: keep both falling tones strong — do not flatten the second.', en: 'Two falling tones in a row, both land hard.' },
        { hanzi: '对 不 起', pinyin: 'duìbuqǐ', toneNote: '4-neutral-3: the 不 is neutral here — light middle syllable.', en: '三-syllable rhythm: strong-light-strong.' },
        { hanzi: '我 叫', pinyin: 'wǒ jiào', toneNote: '3-4: the 3rd tone only half-dips before a 4th — wǒ stays low-short.', en: 'Half-third tone: the rule you feel before you learn it.' },
    ],

    grammar: {
        rule: 'Chinese word order is SUBJECT + VERB + OBJECT — like English, with NO conjugation, NO articles, NO plurals. Identity uses 是; questions add 吗 at the end; negation drops 不/没 in front.',
        explanation: 'The verb 是 (shì) links two NOUNS: 我是学生 (I am a student). It is the ONLY linking job it has — qualities (busy, tired, good) never take 是; they take 很: 我很忙 (I am busy). Possession takes 有: 我有一个问题. So Chinese splits English "to be" into three jobs — 是 / 很 / 有 — and choosing wrong is the #1 beginner mistake. Questions need zero rearranging: keep the statement exactly as it is and add 吗 at the end: 你是老师吗？ (You are teacher-MA = Are you a teacher?). Negation: 不 goes in front of the verb (我不是学生 — I am not a student; note bù becomes bú before shì), while 没 negates having and completed actions. There is no "a/an/the": 我是学生 already means "I am A student". Nothing conjugates — the verb 叫 is 叫 for I, you, he, we, they, yesterday and tomorrow. The grammar lives in word order and particles, not in the verb.',
        examples: [
            { hanzi: '我 是 学 生 。', pinyin: 'wǒ shì xuésheng .', en: 'I am a student.', breakdown: ['我 = I', '是 = am (identity)', '学生 = student — no article needed'] },
            { hanzi: '你 是 老 师 吗 ？', pinyin: 'nǐ shì lǎoshī ma ?', en: 'Are you a teacher?', breakdown: ['你 是 老师 = you are a teacher (a statement)', '吗 = question particle at the END', 'nothing else moves'] },
            { hanzi: '我 不 是 老 师 。', pinyin: 'wǒ bú shì lǎoshī .', en: 'I am not a teacher.', breakdown: ['不 = not, BEFORE the verb', '是 → bú shì (sandhi: bù + shì)', '老师 = teacher'] },
            { hanzi: '我 叫 小 明 。', pinyin: 'wǒ jiào Xiǎomíng .', en: 'My name is Xiaoming.', breakdown: ['我 = I', '叫 = am called', '小明 = Xiaoming — no "is", no article'] },
            { hanzi: '我 很 好 ， 你 呢 ？', pinyin: 'wǒ hěn hǎo , nǐ ne ?', en: 'I am well — and you?', breakdown: ['很 好 = well (very-good, 很 as filler)', '呢 = and-you? echo question', 'the previous verb is reused, not repeated'] },
            { hanzi: '很 高 兴 认 识 你 。', pinyin: 'hěn gāoxìng rènshi nǐ .', en: 'Very glad to meet you.', breakdown: ['很高兴 = very glad', '认识 = to know/meet (people)', '你 = you — the object sits after the verb'] },
        ],
        commonMistakes: [
            '我是忙 — WRONG: 是 never joins an adjective. Qualities take 很: 我很忙. Reserve 是 for A-is-B identity (jobs, nationalities, names of things).',
            '我是小明 for giving your name — understandable but unnatural: Chinese uses 我叫小明 (I am CALLED). 是 + name appears only in answers to "who": 是我 (it\u2019s me).',
            '你是老师？吗 — WRONG: 吗 is a SUFFIX at the very end, one word glued to the finished statement: 你是老师吗？',
            '我没能来 / 我不有时间 — mixing the negations: 不 negates 是, adjectives and present/future verbs; 没 negates 有 and completed actions. 我没有时间 · 我没去.',
        ],
    },

    patterns: [
        { type: 'Give your name', hanzi: '我 叫 … 。', pinyin: 'wǒ jiào … .', en: 'My name is… / I\u2019m called…' },
        { type: 'State identity', hanzi: '我 是 … 。', pinyin: 'wǒ shì … .', en: 'I am a… (teacher, student, Chinese person)' },
        { type: 'Yes/no question', hanzi: '… 吗 ？', pinyin: '… ma ?', en: 'Statement + 吗 = Is it true what you just said?' },
        { type: 'Echo question', hanzi: '… 呢 ？', pinyin: '… ne ?', en: 'And …? — reuses the previous question' },
        { type: 'Ask a name', hanzi: '你 叫 什 么 名 字 ？', pinyin: 'nǐ jiào shénme míngzi ?', en: 'What\u2019s your name? (question word stays in place)' },
        { type: 'Greet politely', hanzi: '老 师 ， 您 好 ！', pinyin: 'lǎoshī , nín hǎo !', en: 'Hello, teacher! — 您 for respect' },
    ],

    sentenceBuilding: [
        { hanzi: '你 好 ！', pinyin: 'nǐ hǎo !', en: 'Hello!' },
        { hanzi: '你 好 ， 我 叫 小 明 。', pinyin: 'nǐ hǎo , wǒ jiào Xiǎomíng .', en: 'Hello, my name is Xiaoming.' },
        { hanzi: '你 好 ， 我 叫 小 明 ， 我 是 学 生 。', pinyin: 'nǐ hǎo , wǒ jiào Xiǎomíng , wǒ shì xuésheng .', en: 'Hello, my name is Xiaoming, I am a student.' },
        { hanzi: '你 好 ！ 我 叫 小 明 ， 我 是 学 生 。 你 呢 ？', pinyin: 'nǐ hǎo ! wǒ jiào Xiǎomíng , wǒ shì xuésheng . nǐ ne ?', en: 'Hello! I\u2019m Xiaoming, a student. And you?' },
        { hanzi: '你 好 ！ 我 叫 小 明 ， 我 是 学 生 。 很 高 兴 认 识 你 ！', pinyin: 'nǐ hǎo ! wǒ jiào Xiǎomíng , wǒ shì xuésheng . hěn gāoxìng rènshi nǐ !', en: 'Hello! I\u2019m Xiaoming, a student. Very glad to meet you!' },
    ],

    practice: [
        { instruction: 'Choose the linker:', question: '我 ___ 学生 。 (student)', answer: '是 — identity between two nouns' },
        { instruction: 'Choose the filler:', question: '我 ___ 忙 。 (busy)', answer: '很 — adjectives never take 是' },
        { instruction: 'Make it a question:', question: '你 是 中 国 人 。', answer: '你 是 中 国 人 吗 ？ — 吗 at the very end' },
        { instruction: 'Give your name:', question: '我 ___ 王 小 明 。', answer: '叫 — the natural name-giver' },
        { instruction: 'Negate it:', question: '我 ___ 是 老 师 。', answer: '不 — 我 不 是 老师 (bú shì sandhi)' },
        { instruction: 'Echo it back:', question: '我 很 好 ， ___ ？', answer: '你 呢 — the echo question' },
    ],

    translationPractice: [
        { en: 'Hello!', hanzi: '你 好 ！', pinyin: 'nǐ hǎo !' },
        { en: 'I am a student.', hanzi: '我 是 学 生 。', pinyin: 'wǒ shì xuésheng .' },
        { en: 'My name is Xiaoming.', hanzi: '我 叫 小 明 。', pinyin: 'wǒ jiào Xiǎomíng .' },
        { en: 'Are you a teacher?', hanzi: '你 是 老 师 吗 ？', pinyin: 'nǐ shì lǎoshī ma ?' },
        { en: 'I am not a teacher — I am a student.', hanzi: '我 不 是 老 师 ， 我 是 学 生 。', pinyin: 'wǒ bú shì lǎoshī , wǒ shì xuésheng .' },
        { en: 'I am very well — and you?', hanzi: '我 很 好 ， 你 呢 ？', pinyin: 'wǒ hěn hǎo , nǐ ne ?' },
    ],

    reverseTranslation: [
        { hanzi: '老 师 ， 您 好 ！', pinyin: 'lǎoshī , nín hǎo !', en: 'Hello, teacher! (polite)' },
        { hanzi: '很 高 兴 认 识 你 。', pinyin: 'hěn gāoxìng rènshi nǐ .', en: 'Very glad to meet you.' },
        { hanzi: '他 是 中 国 人 吗 ？', pinyin: 'tā shì Zhōngguó rén ma ?', en: 'Is he Chinese?' },
        { hanzi: '对 不 起 ， 老 师 。', pinyin: 'duìbuqǐ , lǎoshī .', en: 'Sorry, teacher.' },
    ],

    register: {
        casual: '你 好 ！ 我 叫 小 明 。 你 呢 ？ — with friends: 你, plain 你好, quick 谢谢。',
        polite: '老 师 ， 您 好 ！ 很 高 兴 认 识 您 。 — 您 lifts the person; 请 问 opens a question politely.',
        formal: '各 位 老 师 ， 您 们 好 。 请 允 许 我 自 我 介 绍 。 — formal intro formula (HSK 3+ preview; recognize it in listening).',
    },

    culture: 'Chinese has no "how are you" ritual the way English does — 你好吗？ exists but real people more often fire a topic: 吃了吗？ (Have you eaten?) is the classic friendly opener. Names go FAMILY NAME FIRST: in 王小明, 王 is the surname — address people by surname + title (王老师 = Teacher Wang), never by given name alone unless you are close. 您 is respect you HEAR constantly in service and with elders; using it early marks you as polite, never wrong. And the self-intro formula 很高兴认识你 is your safest first sentence with any new Chinese speaker.',

    freeProduction: 'Record or write a full self-introduction (5–7 lines): greet (choose 你/您 wisely), give your name with 我叫…, state what you are with 我是…, ask your partner\u2019s name (你叫什么名字？), react with 很高兴认识你, and close with a thanks + goodbye. Then answer the echo: a partner says 我很好，你呢？ — reply with 很好 or 不很好 + 为什么.',

    miniTest: [
        { question: 'Which one says "I am a teacher"?', options: ['我 是 老 师 。', '我 老 师 。', '我 很 老 师 。', '我 叫 老 师 。'], answer: '我 是 老 师 。 — identity takes 是' },
        { question: 'Why does 我很忙 need 很?', options: ['it means very here', 'adjectives need a word before them', '它 is polite', '为了 grammar only with 吗'], answer: 'adjectives need a word before them — 是 never joins adjectives' },
        { question: 'Make 你是老师 a yes/no question:', options: ['你 是 老 师 吗 ？', '吗 你 是 老 师 ？', '你 吗 是 老 师 ？', '你 是 吗 老 师 ？'], answer: '你 是 老 师 吗 ？ — 吗 glues to the end' },
        { question: 'Negate 我是学生:', options: ['我 不 是 学 生 。', '我 没 是 学 生 。', '我 是 不 学 生 。', '我 不 有 学 生 。'], answer: '我 不 是 学 生 。 — 不 goes before 是' },
        { question: 'After 我很好, the natural follow-up question is:', options: ['你 吗 ？', '你 呢 ？', '你 什 么 ？', '谁 你 ？'], answer: '你 呢 ？ — the echo question' },
    ],

    review: [
        'This is the first lecture — the review links point forward: numbers (一 to 十) arrive next lecture, and 的 possession (我的书) in the family lecture.',
        'The three-form rule (汉字—pinyin—English) applies to EVERYTHING you learn from here on.',
    ],

    traps: [
        '是 links NOUNS ONLY: 我是学生 ✓ · 我是忙 ✗. Qualities take 很 (我很忙), possession takes 有 (我有时间). One English "be", three Chinese jobs.',
        '吗 is a suffix glued to the very END: 你是老师吗？ — moving it anywhere else breaks the question.',
        '不 flips to bú before a 4th tone: 不是 = bú shì. And 没 — never 不 — negates 有: 我没有时间.',
        'Names: 我叫小明 (I\u2019m CALLED). Family name comes FIRST (王小明 = Mr. Wang), and you address people as surname + title: 王老师.',
    ],

    homework: {
        intro: 'The greeting engine in every section: 是/很/有 jobs, 吗 questions, 不 negation, and the name ritual.',
        translation: [
            { prompt: 'Hello!', answer: '你 好 ！', alt: ['你好！'], explanation: 'Two characters, neutral-friendly register. To an elder or teacher: 您好.' },
            { prompt: 'I am a teacher.', answer: '我 是 老 师 。', alt: ['我是老师。'], explanation: '是 links two nouns (I ↔ teacher). No article, no conjugation — three words total.' },
            { prompt: 'My name is Xiaoming.', answer: '我 叫 小 明 。', alt: ['我叫小明。'], explanation: '叫 = am CALLED — the natural name-giver. Not 我是小明.' },
            { prompt: 'Are you a student?', answer: '你 是 学 生 吗 ？', alt: ['你是学生吗？'], explanation: 'The statement 你是学生 + 吗 at the very end. Nothing moves.' },
            { prompt: 'I am not a teacher.', answer: '我 不 是 老 师 。', alt: ['我不是老师。'], explanation: '不 goes BEFORE 是; together they sandhi to bú shì.' },
            { prompt: 'Sorry — no problem!', answer: '对 不 起 —— 没 关 系 ！', alt: ['对不起，没关系！', '对不起！没关系！'], explanation: 'The fixed apology pair: 对不起 always answered by 没关系 (lit. no relationship = doesn\u2019t matter).' },
        ],
        blanks: [
            { prompt: '我 ___ 学 生 。', answer: '是', explanation: 'Identity: 我 是 学生. The only linker between two nouns.' },
            { prompt: '你 是 老 师 ___ ？', answer: '吗', explanation: '吗 at the very end turns the statement into a yes/no question.' },
            { prompt: '我 叫 ___ 。 (your name goes here)', answer: '…(名字)', explanation: '叫 + name. Practice YOUR name\u2019s Chinese rendering here.' },
            { prompt: '— 谢 谢 ！ — 不 ___ 。', answer: '客', explanation: '不 客气 — the standard reply to thanks (客气 = formal/polite airs).' },
            { prompt: '我 很 好 ， 你 ___ ？', answer: '呢', explanation: '呢 = the echo: and you? The previous question repeats itself.' },
            { prompt: '我 ___ 不 是 老 师 。 — wait, fix THIS one in Section C!', answer: '(不 是)', explanation: 'Trick item: correct Chinese is 我 不 是 老师 — 不 sits directly before 是. If you wrote 我是不… you already see the pattern.' },
        ],
        corrections: [
            { prompt: '我 学 生 。', answer: '我 是 学 生 。', explanation: 'How the mistake happens: English "I a student" intuition drops the linker. Why it does not work: two nouns cannot sit naked next to each other — Chinese needs 是 between I and student. How to fix it: 我 是 学生.' },
            { prompt: '我 是 忙 。', answer: '我 很 忙 。', explanation: 'How the mistake happens: translating "I am busy" word-for-word. Why it does not work: 是 joins nouns only — 忙 is an adjective. How to fix it: qualities take 很: 我 很 忙. (是 = identity, 很 = quality, 有 = possession — the three-be map.)' },
            { prompt: '你 是 老 师 ？ 吗', answer: '你 是 老 师 吗 ？', explanation: 'How the mistake happens: treating 吗 like an English auxiliary. Why it does not work: 吗 is a final particle — it glues to the end of the finished statement, nothing moves. How to fix it: statement + 吗, one breath.' },
            { prompt: '我 是 叫 小 明 。', answer: '我 叫 小 明 。', explanation: 'How the mistake happens: stacking 是 with 叫 (I am called). Why it does not work: 叫 alone already carries the linking job — 是 叫 double-marks it. How to fix it: 我 叫 + name.' },
            { prompt: '我 没 是 学 生 。', answer: '我 不 是 学 生 。', explanation: 'How the mistake happens: using 没 as a generic "not". Why it does not work: 没 negates 有 and completed actions only — 是 is negated by 不. How to fix it: 我 不 是 学生 (and say bú shì).' },
        ],
        writing: {
            task: 'Write your self-introduction (5–7 short sentences): greet (你 or 您 — say which and why), give your name (我叫…), state what you are (我是…), ask the reader\u2019s name (你叫什么名字？), say 很高兴认识你, and close with 谢谢 + 再见.',
            requirements: [
                'One 你好 or 您好 — with a one-line reason for the choice',
                '我叫… for the name (not 我是)',
                '我是… for identity (job/status/nationality)',
                'One 吗 question OR one 你呢 echo',
                '很 in at least one adjective sentence (我很高兴)',
            ],
            minWords: 40,
        },
        checklist: [
            'I pick 是 / 很 / 有 correctly (identity / quality / possession)',
            'I form yes/no questions by adding 吗 at the very end — nothing moves',
            'I negate with 不 before the verb — and 没 for 有 and finished actions',
            'I give my name with 我叫… and state identity with 我是…',
            'I echo with 你呢？ and greet with 你好 / 您好 at the right formality',
            'I write 你好/谢谢/再见/老师/学生/是/叫 by hand or by heart',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The three-be map: 是 IDENTITY (我是学生), 很 QUALITY (我很忙), 有 POSSESSION (我有一个问题). English "be" splits into three; pick by what follows.',
            examples: [
                { hanzi: '我 是 学 生 。 · 我 很 忙 。 · 我 有 时 间 。', pinyin: 'wǒ shì xuésheng · wǒ hěn máng · wǒ yǒu shíjiān', en: 'I am a student · I am busy · I have time' },
            ],
        },
        {
            explanation: '吗-machine: keep the statement UNTOUCHED, glue 吗 at the end. 你是老师 → 你是老师吗？ It never moves, never doubles, never combines with question words.',
            examples: [
                { hanzi: '你 好 吗 ？ · 他 是 中 国 人 吗 ？', pinyin: 'nǐ hǎo ma ? · tā shì Zhōngguó rén ma ?', en: 'How are you? · Is he Chinese?' },
            ],
        },
        {
            explanation: 'The negation split: 不 for 是, adjectives and present/future verbs (我不忙, 我不去); 没 for 有 and finished actions (我没有时间, 我没去). And 不 flips to bú before 4th tones.',
            examples: [
                { hanzi: '我 不 去 。 · 我 没 有 时 间 。 · 不 是 → bú shì', pinyin: 'wǒ bú qù · wǒ méiyǒu shíjiān · bú shì', en: 'I\u2019m not going · I don\u2019t have time · isn\u2019t' },
            ],
        },
        {
            explanation: 'The name ritual: 我叫 + name (I am called). 是 + name answers WHO questions (是我 = it\u2019s me) but never introduces you. Family name first: 王小明 = Mr. Wang.',
            examples: [
                { hanzi: '我 叫 王 小 明 。 你 叫 什 么 名 字 ？', pinyin: 'wǒ jiào Wáng Xiǎomíng . nǐ jiào shénme míngzi ?', en: 'I\u2019m called Wang Xiaoming. What\u2019s your name?' },
            ],
        },
        {
            explanation: 'The echo: 你呢？ reuses the previous question\u2019s verb. 我很好，你呢？ = I\u2019m fine, and you? It also works after 吗-questions and 要-questions.',
            examples: [
                { hanzi: '你 是 学 生 吗 ？ —— 是 的 ， 你 呢 ？', pinyin: 'nǐ shì xuésheng ma ? — shì de , nǐ ne ?', en: 'Are you a student? — Yes, and you?' },
            ],
        },
        {
            explanation: 'Politeness dial: 你 (friends, peers) vs 您 (teachers, elders, service — always safe upwards). 您好 + 请问 opens any formal exchange; 对不起 → 没关系 is the apology pair.',
            examples: [
                { hanzi: '老 师 ， 您 好 ！ 请 问 ……', pinyin: 'lǎoshī , nín hǎo ! qǐngwèn ……', en: 'Hello, teacher! May I ask…' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '你好': { en: 'hello', pron: 'nǐ hǎo', tone: '3-3', note: 'Sandhi: say ní hǎo. Neutral any-time greeting; 您好 for respect.' },
        '您好': { en: 'hello (polite)', pron: 'nín hǎo', tone: '2-3', note: '您 = the respectful you. Teachers, elders, customers, strangers-upwards.' },
        '再见': { en: 'goodbye', pron: 'zàijiàn', tone: '4-4', note: 'Lit. see-again. Both 4th tones stay strong.' },
        '谢谢': { en: 'thank you', pron: 'xièxie', tone: '4-neutral', note: 'Doubling softens. 谢谢你 adds warmth; 谢谢您 respects.' },
        '不客气': { en: 'you\u2019re welcome', pron: 'bú kèqi', tone: '2-4-neutral', note: 'Sandhi bú! Lit. no formal-airs-needed.' },
        '对不起': { en: 'sorry', pron: 'duìbuqǐ', tone: '4-neutral-3', note: 'The apology. Escalation: 对不起 → 真对不起 → 太对不起了.' },
        '没关系': { en: 'no problem / it doesn\u2019t matter', pron: 'méi guānxi', tone: '2-2-1', note: 'The answer to 对不起. 没 here = it-doesn\u2019t-even-rise-to-mattering.' },
        '请问': { en: 'excuse me (may I ask)', pron: 'qǐngwèn', tone: '3-4', note: 'Lit. please-ask — the polite opener before ANY question to a stranger.' },
        '老师': { en: 'teacher', pron: 'lǎoshī', tone: '3-1', note: 'Also a respectful address: 王老师 = Teacher Wang.' },
        '学生': { en: 'student', pron: 'xuésheng', tone: '2-neutral', note: 'The sheng goes neutral. 大学生 = university student.' },
        '中国': { en: 'China', pron: 'Zhōngguó', tone: '1-2', note: 'Lit. middle-kingdom. 中国人 = Chinese person.' },
        '美国人': { en: 'American (person)', pron: 'Měiguó rén', tone: '3-2-2', note: 'Country + 人 = nationality. 英国 人, 法国 人 the same way.' },
        '很高兴认识你': { en: 'very glad to meet you', pron: 'hěn gāoxìng rènshi nǐ', tone: '3-4-4-4-3', note: 'The universal first-meeting line. 认识 = get-acquainted.' },
        '名字': { en: 'name', pron: 'míngzi', tone: '2-neutral', note: '你叫什么名字？ — the standard name question.' },
    },
};

import { CHINESE_A1_PART1, CHINESE_A1_PART1_EXTRAS } from './chineseLessonsA1';
import { CHINESE_A1_PART2, CHINESE_A1_PART2_EXTRAS } from './chineseLessonsA1more';

export const STATIC_CHINESE_LESSONS: Record<string, StaticChineseLesson> = {
    '1:greetings': h1Greetings,
    ...CHINESE_A1_PART1,
    ...CHINESE_A1_PART2,
};

// ── Extras (Part 0 warm-up, tables, use cases, shadowing) ───────────────────
const h1GreetingsExtras = {
    warmup: [
        { q: 'What are the FOUR tones + the neutral tone? Give mā má mǎ mà with meanings.', a: 'mā (1, high flat) mother · má (2, rising) hemp · mǎ (3, dip) horse · mà (4, falling) scold · plus the light neutral ma (question particle).' },
        { q: 'Two 3rd tones meet — what happens to the first? (你好)', a: 'It becomes 2nd tone: nǐ hǎo is SAID ní hǎo. Written stays nǐ hǎo.' },
        { q: '不 (4th) before another 4th tone — what happens? (不是)', a: 'It flips to 2nd tone: bú shì.' },
        { q: 'Which syllables carry no tone of their own?', a: 'Neutral-tone syllables: 吗 ma, 呢 ne, 了 le, and second syllables of doubled words (谢谢 xièxie).' },
        { q: 'How do you write and say "thank you" so it sounds friendly and light?', a: '谢谢 xièxie — 4th tone + neutral second syllable.' },
    ],
    verbTables: [
        {
            title: '是 — the identity machine (and its two partners)',
            note: 'The verb NEVER changes. There is no conjugation in Chinese — the person words just swap in front.',
            rows: [
                { label: '我 (I)', form: '是', pron: 'shì' },
                { label: '你 (you)', form: '是', pron: 'shì' },
                { label: '他 / 她 (he/she)', form: '是', pron: 'shì' },
                { label: '我们 (we)', form: '是', pron: 'shì' },
                { label: 'negation', form: '不 是', pron: 'bú shì' },
                { label: 'quality instead', form: '很 + adj', pron: 'hěn + adj' },
                { label: 'possession instead', form: '有', pron: 'yǒu' },
            ],
        },
        {
            title: '吗 — the question machine',
            note: 'Statement in, question out — one particle, zero movement.',
            rows: [
                { label: 'statement', form: '你 是 学 生', pron: 'nǐ shì xuésheng' },
                { label: '+ 吗', form: '你 是 学 生 吗', pron: '…ma?' },
                { label: 'neg. question', form: '你 不 是 学 生 吗', pron: 'nǐ bú shì xuésheng ma?' },
            ],
        },
        {
            title: 'The person grid — 们 makes plurals',
            rows: [
                { label: 'I / we', form: '我 / 我 们', pron: 'wǒ / wǒmen' },
                { label: 'you / you all', form: '你 / 你 们', pron: 'nǐ / nǐmen' },
                { label: 'polite you', form: '您', pron: 'nín' },
                { label: 'he, she / they', form: '他 · 她 / 他 们', pron: 'tā · tā / tāmen' },
            ],
        },
    ],
    useCases: [
        {
            word: '是 vs 很 vs 有 — the three jobs of English "to be"',
            note: 'The #1 beginner error is using 是 for everything. Chinese splits "be" into three jobs by what FOLLOWS.',
            uses: [
                { use: '是 — identity (noun = noun)', examples: [{ fr: '我 是 学 生 。 我 是 中 国 人 。', en: 'I am a student. I am Chinese.' }] },
                { use: '很 — qualities (adjectives)', examples: [{ fr: '我 很 忙 。 她 很 高 兴 。', en: 'I am busy. She is very glad.' }] },
                { use: '有 — possession & existence', examples: [{ fr: '我 有 一 个 问 题 。 桌 上 有 一 本 书 。', en: 'I have a question. There\u2019s a book on the desk.' }] },
                { use: '在 — location', examples: [{ fr: '我 在 北 京 。', en: 'I am IN Beijing.' }] },
            ],
        },
        {
            word: '吗 vs 呢 vs question words',
            uses: [
                { use: '吗 — yes/no (statement unchanged)', examples: [{ fr: '你 是 老 师 吗 ？', en: 'Are you a teacher?' }] },
                { use: '呢 — echo (and you? / and…?)', examples: [{ fr: '我 很 好 ， 你 呢 ？', en: 'I\u2019m fine — and you?' }] },
                { use: 'question word stays in place', examples: [{ fr: '你 叫 什 么 ？ 你 找 谁 ？', en: 'You\u2019re called what? You\u2019re looking for whom?' }] },
                { use: '几 / 多少 — how many', examples: [{ fr: '几 点 ？ 多 少 钱 ？', en: 'What time? How much?' }] },
            ],
        },
    ],
    shadowing: {
        intro: 'Chinese rhythm = one beat per character, tones riding on top. Read each line TWICE: once slow with the pinyin, once fast with the sandhi (nǐ hǎo → ní hǎo).',
        lines: [
            { fr: '你 好 ！ 很 高 兴 认 识 你 。', pron: 'ní hǎo ! hěn gāoxìng rènshi nǐ .', en: 'Hello! Very glad to meet you.' },
            { fr: '我 叫 小 明 。 你 呢 ？', pron: 'wǒ jiào Xiǎomíng . nǐ ne ?', en: 'I\u2019m Xiaoming. And you?' },
            { fr: '你 是 老 师 吗 ？ —— 不 是 ， 我 是 学 生 。', pron: 'nǐ shì lǎoshī ma ? — bú shì , wǒ shì xuésheng .', en: 'Are you a teacher? — No, I\u2019m a student.' },
            { fr: '对 不 起 ！ —— 没 关 系 。', pron: 'duìbuqǐ ! — méi guānxi .', en: 'Sorry! — No problem.' },
            { fr: '谢 谢 你 ！ —— 不 客 气 。', pron: 'xièxie nǐ ! — bú kèqi .', en: 'Thank you! — You\u2019re welcome.' },
            { fr: '老 师 ， 再 见 ！ 明 天 见 ！', pron: 'lǎoshī , zàijiàn ! míngtiān jiàn !', en: 'Goodbye, teacher! See you tomorrow!' },
        ],
    },
};

export const CHINESE_LESSON_EXTRAS: Record<string, { warmup?: WarmupItem[]; verbTables?: VerbTableBlock[]; useCases?: UseCaseBlock[]; shadowing?: ShadowingBlock }> = {
    '1:greetings': h1GreetingsExtras,
    ...CHINESE_A1_PART1_EXTRAS,
    ...CHINESE_A1_PART2_EXTRAS,
};

// Merge the extras onto the registry at load (same pattern as French)
for (const [key, extra] of Object.entries(CHINESE_LESSON_EXTRAS)) {
    const lesson = STATIC_CHINESE_LESSONS[key];
    if (!lesson) continue;
    const { shadowing, ...rest } = extra;
    Object.assign(lesson, rest);
    if (shadowing) {
        lesson.homework = { ...lesson.homework, shadowing } as StaticChineseLesson['homework'];
    }
}
