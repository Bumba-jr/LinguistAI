// Chinese BASE_GLOSSARY — the function-word stratum every HSK lecture spreads.
// Entries are keyed by the SEGMENTED word (hanzi), with pinyin (tone marks) as
// pron. All lesson text in Chinese lectures is authored pre-segmented with
// spaces, so the shared word-tap pipeline (RichWord → resolveGlossary) works
// unchanged. Tap-card schema: en · pron (pinyin) · note (usage + trap).

export interface ChineseGlossEntry {
    en: string;
    pron: string;            // pinyin with tone marks, e.g. "nǐ hǎo"
    tone?: string;           // tone numbers: "3-3"
    note?: string;
    example?: { hanzi: string; pinyin: string; en: string };
    pattern?: string;        // grammar pattern label shown in caps on the card
    measure?: string;        // its measure word for nouns
}

export const BASE_GLOSSARY: Record<string, ChineseGlossEntry> = {
    // ── pronouns ──
    '我': { en: 'I / me', pron: 'wǒ', tone: '3', note: 'One form for subject AND object: 我 爱 你 = I love you. Never changes shape — no conjugation exists.' },
    '你': { en: 'you (informal)', pron: 'nǐ', tone: '3', note: 'One person you know. The polite form is 您 nín. Plural: add 们 → 你们.' },
    '您': { en: 'you (polite)', pron: 'nín', tone: '2', note: 'Formal you — for elders, strangers, service situations. HSK 1 bonus word.' },
    '他': { en: 'he / him', pron: 'tā', tone: '1', note: 'Same sound as 她 (she) and 它 (it) — tā. The character shows the meaning; the ear cannot tell.' },
    '她': { en: 'she / her', pron: 'tā', tone: '1', note: 'Sounds identical to 他 — context or characters disambiguate.' },
    '我们': { en: 'we / us', pron: 'wǒmen', tone: '3-neutral', note: '我 + 们 = the plural maker. 你们, 他们, 她们 work the same way.' },
    '你们': { en: 'you (plural)', pron: 'nǐmen', tone: '3-neutral', note: '你们 好 = hello (to several people).' },
    '他们': { en: 'they / them', pron: 'tāmen', tone: '1-neutral', note: 'Mixed or male group. All-female: 她们 — same sound tāmen.' },
    '们': { en: 'plural maker (for people)', pron: 'men', tone: 'neutral', note: 'Only after pronouns and people-nouns. Never on objects: ✗ 苹果们.' },

    // ── the verb 是 + its machinery ──
    '是': { en: 'to be (identity only)', pron: 'shì', tone: '4', pattern: 'A + 是 + B (identity)',
        note: 'Links two NOUNS: 我是 学生 (I am a student). NEVER before adjectives — 饿 uses 很: 我 很 忙, never ✗ 我是 忙. Negation: 不是.',
        example: { hanzi: '我 是 学生 。', pinyin: 'wǒ shì xuésheng .', en: 'I am a student.' } },
    '不是': { en: 'is not / am not (identity)', pron: 'bú shì', tone: '2-4', note: '是\u2019s negation. The 不 flips to bú before a 4th tone — tone sandhi you will hear everywhere.' },
    '很': { en: 'very (the adjective filler)', pron: 'hěn', tone: '3', pattern: 'A + 很 + adjective',
        note: 'Chinese sentences need SOMETHING before an adjective: 我 很 忙 (I am busy) — even when 很 means nothing strong. 我 忙 alone sounds like a comparison.' },

    // ── negation & aspect ──
    '不': { en: 'not (present/future negation)', pron: 'bù', tone: '4→2', note: 'Negates actions and adjectives: 我 不 知道. Tone sandhi: bù → bú before 4th tone (不是 bú shì).' },
    '没': { en: 'not (past negation) / do not have', pron: 'méi', tone: '2', note: 'Two jobs: negates 有 (我 没 时间 — I don\u2019t have time) and negates completed actions (我 没 去 — I didn\u2019t go). 不 never negates 有.' },
    '了': { en: 'completed-action marker', pron: 'le', tone: 'neutral', pattern: 'verb + 了 (it happened)',
        note: 'After the verb = it\u2019s done: 我 吃 了 (I ate). The verb itself NEVER changes — 了 carries the completion. Placed at sentence-end it means "new situation": 下雨 了 (it\u2019s raining now).' },

    // ── particles ──
    '吗': { en: 'question particle (yes/no)', pron: 'ma', tone: 'neutral', pattern: 'statement + 吗 = yes/no question',
        note: 'Turns any statement into a question with zero word changes: 你 是 老师 吗 ? (Are you a teacher?)' },
    '呢': { en: 'and you? / what about…?', pron: 'ne', tone: 'neutral', pattern: 'X + 呢 ?',
        note: 'The echo question: 你 呢 ? = And you? Reuses the previous question\u2019s verb.' },
    '的': { en: "'s / of (possession)", pron: 'de', tone: 'neutral', pattern: 'A + 的 + B (A owns B)',
        note: 'Flips English possession: 我 的 书 = my book (literally I-OF book). Also chains: 老师 的 书 = the teacher\u2019s book.' },

    // ── question words ──
    '什么': { en: 'what', pron: 'shénme', tone: '2-neutral', note: 'Stays in the statement\u2019s slot — Chinese moves NOTHING: 你 说 什么 ? (You say what? = What are you saying?)' },
    '谁': { en: 'who / whom', pron: 'shéi', tone: '2', note: 'Same no-movement rule: 你 看 谁 ? (You see whom?)' },
    '哪儿': { en: 'where', pron: 'nǎr', tone: '3', note: 'Northern/standard form (北京话 flavor). The south says 哪里 nǎlǐ. Both mean where.' },
    '哪': { en: 'which', pron: 'nǎ', tone: '3', note: 'Building block: 哪儿 (where), 哪个 (which one), 哪国 (which country).' },
    '几': { en: 'how many (small numbers)', pron: 'jǐ', tone: '3', note: 'For numbers under ~10 and gentle questions: 几 点 ? (what time?), 你 几 岁 ? For big/unknown numbers use 多少.' },
    '多少': { en: 'how many / how much', pron: 'duōshao', tone: '1-neutral', note: 'The neutral question number: 多少 钱 ? = how much money? (shao loses its tone here).' },
    '怎么样': { en: 'how is…? / how about…?', pron: 'zěnmeyàng', tone: '3-neutral-4', note: 'The open quality question: 你 最近 怎么样 ? = How have you been?' },
    '为什么': { en: 'why', pron: 'wèishénme', tone: '4-2-neutral', note: '为什么 + statement-order answer with 因为: 因为 我 很 忙.' },
    '因为': { en: 'because', pron: 'yīnwèi', tone: '1-4', note: 'Pairs with 所以 (so): 因为 … 所以 …. One pair, two halves.' },
    '所以': { en: 'so / therefore', pron: 'suǒyǐ', tone: '3-3', note: 'Second half of 因为…所以…. Tone sandhi: suó yǐ in real speech.' },

    // ── numbers & measure words ──
    '一': { en: 'one', pron: 'yī', tone: '1', note: 'Tone sandhi trio: yì (before 4th: 一个 yí ge… yī→yí before 4th tone), yì (before 1st/2nd/3rd). You will hear both.' },
    '二': { en: 'two (counting)', pron: 'èr', tone: '4', note: 'For counting and phone numbers. With measure words use 两: 两 个 人, never ✗ 二 个.' },
    '两': { en: 'two (with measure words)', pron: 'liǎng', tone: '3', note: '两 个 人, 两 点 (two o\u2019clock). The measure-word two.' },
    '三': { en: 'three', pron: 'sān', tone: '1' },
    '四': { en: 'four', pron: 'sì', tone: '4', note: 'Sounds exactly like 死 (to die) — culturally avoided floors/numbers.' },
    '五': { en: 'five', pron: 'wǔ', tone: '3' },
    '六': { en: 'six', pron: 'liù', tone: '4' },
    '七': { en: 'seven', pron: 'qī', tone: '1' },
    '八': { en: 'eight', pron: 'bā', tone: '1', note: 'Lucky number — 八 sounds like 发 (get rich).' },
    '九': { en: 'nine', pron: 'jiǔ', tone: '3' },
    '十': { en: 'ten', pron: 'shí', tone: '2', note: '二十一 = 21 (two-ten-one). Chinese numbers are pure arithmetic.' },
    '个': { en: 'measure word (the default one)', pron: 'gè', tone: 'neutral', pattern: 'number + 个 + noun',
        note: 'THE universal measure word: 一 个 人, 一 个 问题. When you forget the proper measure word, 个 usually rescues you.' },
    '口': { en: 'measure word (family members, mouths)', pron: 'kǒu', tone: '3', note: '你 家 有 几 口 人 ? = How many people in your family? (Counted by mouths!)' },

    // ── core verbs ──
    '有': { en: 'to have / there is', pron: 'yǒu', tone: '3', pattern: 'A + 有 + B',
        note: 'Possession AND existence: 我 有 一 个 问题 · 桌子 上 有 一 本 书. Negated ONLY by 没: 没 有.' },
    '叫': { en: 'to be called / to call', pron: 'jiào', tone: '4', pattern: '我 + 叫 + name',
        note: '我 叫 小明 = I\u2019m called Xiaoming — the natural way to give your name (not 我是 + name).' },
    '吃': { en: 'to eat', pron: 'chī', tone: '1', note: '吃 饭 (eat rice/food), 吃 药 (take medicine). Object directly after — no prepositions in Chinese.' },
    '喝': { en: 'to drink', pron: 'hē', tone: '1', note: '喝 茶, 喝 水, 喝 咖啡 — drinks take no measure word when general.' },
    '想': { en: 'to want to / to think / to miss', pron: 'xiǎng', tone: '3', note: 'Three jobs: 想 去 (want to go), 我想 你 (I miss you), 我 想… (I think). Verb stays infinitive after: 想 + verb.' },
    '要': { en: 'to want / will / going to', pron: 'yào', tone: '4', note: 'Stronger than 想: 要 一 杯 茶 (I\u2019ll have a tea — ordering). Also the future helper: 我 要 去.' },
    '去': { en: 'to go', pron: 'qù', tone: '4', note: 'Place BEFORE the verb: 我 去 中国 (I go to China) — never ✗ 我 去 到 中国.' },
    '来': { en: 'to come', pron: 'lái', tone: '2', note: 'Motion TOWARD the speaker (去 = away from). 来 一 杯 茶 ! = Bring a tea! (ordering to a waiter).' },
    '看': { en: 'to look / watch / read (a look-able thing)', pron: 'kàn', tone: '4', note: '看 书 (read a book), 看 电影 (watch a movie), 看 一 下 (take a look).' },
    '工作': { en: 'to work / job', pron: 'gōngzuò', tone: '1-4', note: 'Verb AND noun with no change: 我 工作 (I work) · 我 的 工作 (my job).' },
    '学习': { en: 'to study / study (noun)', pron: 'xuéxí', tone: '2-2', note: '学 习 汉语 — study Chinese. 我 在 学习 = I\u2019m studying (right now).' },
    '喜欢': { en: 'to like', pron: 'xǐhuan', tone: '3-neutral', note: '喜欢 + noun or verb, directly: 我 喜欢 喝 茶. The huan often goes neutral.' },
    '知道': { en: 'to know (a fact)', pron: 'zhīdào', tone: '1-4', note: '我 不 知道 = I don\u2019t know. Chinese distinguishes knowing-facts (知道) from knowing-people/places (认识).' },
    '认识': { en: 'to know / be acquainted with', pron: 'rènshi', tone: '4-neutral', note: '认识 人 (know people), 认识 路 (know the way) — for people and places, not facts.' },
    '会': { en: 'can (learned skill)', pron: 'huì', tone: '4', note: '会 说 汉语 = can speak Chinese (a learned ability). The first of the three cans (会/能/可以).' },

    // ── glue words ──
    '和': { en: 'and (between nouns only)', pron: 'hé', tone: '2', note: 'Joins NOUNS: 爸爸 和 妈妈. Never joins clauses — Chinese links sentences without "and".' },
    '在': { en: 'at / in / to be located + present-progress marker', pron: 'zài', tone: '4', pattern: 'A + 在 + place · 在 + place + verb',
        note: 'Two jobs: 我 在 北京 (I\u2019m in Beijing) and 我 在 学习 (I\u2019m studying — right now).' },
    '的 vs 得 vs 地': { en: 'the three de\u2019s', pron: 'de · de · de', note: '的 = possession (我的), 得 = degree after verb (说 得 快), 地 = manner before verb (慢慢 地 说). Same sound, three jobs.' },
    '也': { en: 'also / too', pron: 'yě', tone: '3', note: 'BEFORE the verb, never sentence-final: 我 也 是 学生 (I am ALSO a student).' },
    '都': { en: 'all / both', pron: 'dōu', tone: '1', note: 'Also before the verb: 我们 都 是 学生 (we are ALL students).' },
    '人': { en: 'person / people', pron: 'rén', tone: '2', measure: '个', note: '中国 人 (Chinese person), 好 人 (good person). Building block of dozens of words.' },
};
