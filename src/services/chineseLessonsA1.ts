// Chinese HSK-1 lectures part 1 — Pinyin & Tones, Numbers/Dates/Time, Family.
// Same gold-standard format as '1:greetings'. ALL Chinese text is pre-segmented
// with spaces (CJK rule). Extras exported for the registry merge.

import type { HskLesson } from './hskService';
import { BASE_GLOSSARY, type ChineseGlossEntry } from './chineseLessonBase';
import type { WarmupItem, VerbTableBlock, UseCaseBlock, ShadowingBlock } from './frenchLessons';
import type { StaticChineseLesson, ChineseRemedial } from './chineseLessons';

const homeworkShadow = (hw: StaticChineseLesson['homework'], shadowing: ShadowingBlock) => ({ ...hw, shadowing });

// ── HSK 1 · Pinyin, Tones & Your First Words ────────────────────────────────
const h1Pinyin: StaticChineseLesson = {
    title: 'Pinyin, Tones & Your First Words',
    objective: 'Read any pinyin syllable with its tone mark, produce the four tones plus the neutral tone by voice, apply the two sandhi rules (3-3 → 2-3 and bù/bù → bú), and spell the pinyin traps (yi/wu/yu, the apostrophe) — the sound system every later lecture rides on.',

    vocabulary: [
        { hanzi: '妈', pinyin: 'mā', en: 'mother (1st tone — high and flat)', example: { hanzi: '我 妈 是 老 师 。', pinyin: 'wǒ mā shì lǎoshī .', en: 'My mom is a teacher.' }, related: [{ hanzi: '爸 爸', pinyin: 'bàba', en: 'dad' }] },
        { hanzi: '麻', pinyin: 'má', en: 'hemp / numb (2nd tone — rising, like a question)', example: { hanzi: '麻 烦', pinyin: 'máfan', en: 'troublesome (HSK 2 preview)' }, related: [{ hanzi: '木', pinyin: 'mù', en: 'wood — another m-sound' }] },
        { hanzi: '马', pinyin: 'mǎ', en: 'horse (3rd tone — dip down then up)', example: { hanzi: '大 马', pinyin: 'dà mǎ', en: 'a big horse' }, related: [{ hanzi: '骑 马', pinyin: 'qí mǎ', en: 'to ride a horse' }] },
        { hanzi: '骂', pinyin: 'mà', en: 'to scold (4th tone — sharp fall)', example: { hanzi: '妈 妈 骂 我 。', pinyin: 'māma mà wǒ .', en: 'Mom scolds me.' }, related: [{ hanzi: '骂 人', pinyin: 'mà rén', en: 'to insult someone' }] },
        { hanzi: '一', pinyin: 'yī', en: 'one (sandhi champion: yì / yí)', example: { hanzi: '一 个 人', pinyin: 'yí ge rén', en: 'one person (yí before 4th tone!)' }, related: [{ hanzi: '十 一', pinyin: 'shíyī', en: 'eleven (no sandhi at number end)' }] },
        { hanzi: '不', pinyin: 'bù', en: 'not (bú before 4th tones)', example: { hanzi: '不 是', pinyin: 'bú shì', en: 'is not — bú!' }, related: [{ hanzi: '我 不 去 。', pinyin: 'wǒ bú qù .', en: 'I\u2019m not going — qù is 4th, so bú' }] },
        { hanzi: '请 问', pinyin: 'qǐngwèn', en: 'excuse me (may I ask)', example: { hanzi: '请 问 ， 你 叫 什 么 ？', pinyin: 'qǐngwèn , nǐ jiào shénme ?', en: 'Excuse me, what\u2019s your name?' }, related: [{ hanzi: '请 坐', pinyin: 'qǐng zuò', en: 'please sit' }] },
        { hanzi: '再 见', pinyin: 'zàijiàn', en: 'goodbye (4-4, both fall hard)', example: { hanzi: '老 师 再 见 ！', pinyin: 'lǎoshī zàijiàn !', en: 'Goodbye, teacher!' }, related: [{ hanzi: '明 天 见', pinyin: 'míngtiān jiàn', en: 'see you tomorrow' }] },
        { hanzi: '汉 语', pinyin: 'Hànyǔ', en: 'the Chinese language (spoken)', example: { hanzi: '我 学 汉 语 。', pinyin: 'wǒ xué Hànyǔ .', en: 'I study Chinese.' }, related: [{ hanzi: '中 文', pinyin: 'Zhōngwén', en: 'Chinese (written/general)' }] },
        { hanzi: '人', pinyin: 'rén', en: 'person (the 2nd tone rising curve)', measureWord: '个', example: { hanzi: '三 个 人', pinyin: 'sān ge rén', en: 'three people' }, related: [{ hanzi: '中 国 人', pinyin: 'Zhōngguó rén', en: 'Chinese person' }] },
    ],

    characters: [
        { hanzi: '一', pinyin: 'yī', en: 'one', components: 'one horizontal stroke', mnemonic: 'THE simplest character in existence — a single line. Chinese numbers are literally counting strokes: 一 二 三.' },
        { hanzi: '马', pinyin: 'mǎ', en: 'horse', components: 'a galloping horse, simplified from 馬', mnemonic: 'The simplified form gallops: three horizontal strokes + a kicking leg. Meet it in 妈 (woman + horse = ma).' },
        { hanzi: '妈', pinyin: 'mā', en: 'mother', components: '女(woman) + 马(horse)', mnemonic: 'WOMAN + HORSE that sounds like ma — female + sound = meaning+sound character (形声字), the most common type in Chinese.' },
        { hanzi: '问', pinyin: 'wèn', en: 'to ask', components: '门(door) + 口(mouth)', mnemonic: 'A MOUTH (口) at a DOOR (门) asking a question. 请问 = please-let-my-mouth-through-the-door.' },
        { hanzi: '请', pinyin: 'qǐng', en: 'please / to invite', components: '讫(speech) + 青', mnemonic: 'SPEECH radical 讫 + the green 青 for sound. Politeness is something you SAY in Chinese.' },
        { hanzi: '汉', pinyin: 'hàn', en: 'Chinese (Han)', components: '氵(water) + 又', mnemonic: 'The WATER radical: the Han 汉 ethnic group named for the Han RIVER — 汉语 is literally "the Han speech".' },
    ],

    pronunciation: [
        { hanzi: 'first tone', pinyin: 'mā · ā · shī', toneNote: 'HIGH and FLAT — hold a note like singing "laaa". Do not let it drift down.', en: 'Tone 1: the plateau.' },
        { hanzi: 'second tone', pinyin: 'má · rén · hán', toneNote: 'RISING, mid-to-high — the "Huh??" intonation of English surprise.', en: 'Tone 2: the question curve.' },
        { hanzi: 'third tone', pinyin: 'mǎ · hěn · wǒ', toneNote: 'DIP down, then up. Before other tones it usually stays only HALF-dipped (half-third).', en: 'Tone 3: the ditch you drive through.' },
        { hanzi: 'fourth tone', pinyin: 'mà · shì · jiù', toneNote: 'SHARP FALL, high to low — the emphatic "NO!" of English.', en: 'Tone 4: the stomp.' },
        { hanzi: 'neutral tone', pinyin: 'ma · ne · le · xièxie', toneNote: 'LIGHT and short, no mark — particles and second syllables of doubled words.', en: 'Tone 0: the whisper beat.' },
        { hanzi: '3-3 sandhi', pinyin: 'nǐ hǎo → ní hǎo', toneNote: 'When TWO 3rd tones meet, the first becomes 2nd tone. Very common (你好, 很好, 你好).', en: 'You WRITE 3-3, you SAY 2-3.' },
        { hanzi: '不 & 一 sandhi', pinyin: 'bú shì · yí ge · yì tiān', toneNote: '不 and 一 change tone before certain tones: bù→bú before 4th; yī→yí before 4th, yì before 1/2/3.', en: 'The two chameleon words.' },
        { hanzi: 'pinyin spelling traps', pinyin: 'yi · wu · yu · iě → yě', toneNote: 'Standalone i becomes yi, u becomes wu, ü becomes yu; after j/q/x, ü loses its dots (ju = jü).', en: 'Read ju/qu/xu with rounded lips — that hidden ü is everywhere (去 qù!).' },
    ],

    grammar: {
        rule: 'Pinyin is the spelling of the sounds; tones are the MEANING. One syllable = one character = one tone (or neutral). The four tones are mā má mǎ mà — mother, hemp, horse, scold — and choosing wrong changes the word, not the accent.',
        explanation: 'Every Chinese syllable has three parts: an INITIAL (b p m f d t n l g k h j q x zh ch sh r z c s y w — or none), a FINAL (a o e i u ü and their compounds), and a TONE. The tone is grammar, not decoration: mǎ (horse) and mà (scold) are as different as "cat" and "cut" in English. The neutral tone is a light, short syllable with no mark — it lives on particles (吗, 呢, 了) and the second halves of doubled words (谢谢). Two sandhi rules run constantly: (1) two 3rd tones in a row → the first becomes 2nd tone (你好 nǐ hǎo is SAID ní hǎo); (2) 不 and 一 shift: 不 becomes bú before a 4th tone (不是 bú shì), 一 becomes yí before a 4th tone and yì before 1st/2nd/3rd (一个 yí ge, 一天 yì tiān). Spelling traps: standalone i is written yi (也 yě, not "iě"), standalone u is wu, standalone ü is yu; after j q x the two-dots of ü vanish (去 qù is really qü), and an apostrophe separates syllables before a/o/e (Xi\u2019an). At HSK 1 your job is to HEAR the four tones apart and SAY them apart — minimal pairs (妈麻马骂) are the gym.',
        examples: [
            { hanzi: '妈 妈 骂 马 。', pinyin: 'māma mà mǎ .', en: 'Mom scolds the horse.', breakdown: ['māma = mom (1-neutral)', 'mà = scold (4th)', 'mǎ = horse (3rd) — three m-words, three meanings'] },
            { hanzi: '你 好 ！', pinyin: 'nǐ hǎo ! → SAID: ní hǎo !', en: 'Hello!', breakdown: ['你 = 3rd tone', '好 = 3rd tone', 'sandhi: first dips become a rise'] },
            { hanzi: '我 不 是 中 国 人 。', pinyin: 'wǒ bú shì Zhōngguó rén .', en: 'I am not Chinese.', breakdown: ['不 before 是 (4th) → bú', '中国 = Zhōng + guó (1-2)', '人 = rén (2nd, rising)'] },
            { hanzi: '请 问 ， 现 在 几 点 ？', pinyin: 'qǐngwèn , xiànzài jǐ diǎn ?', en: 'Excuse me, what time is it now?', breakdown: ['请问 = 3-4 polite opener', '现在 = 4-4 (both fall!)', '几点 = 3-3 → jǐ diǎn SAID jí diǎn'] },
            { hanzi: '我 去 上 海 。', pinyin: 'wǒ qù Shànghǎi .', en: 'I go to Shanghai.', breakdown: ['去 = qù — the HIDDEN Ü (spelled qu, said qü)', '上海 = Shànghǎi 4-3', 'the ü dots vanished after q — spelling rule'] },
            { hanzi: '一 个 人 。', pinyin: 'yí ge rén .', en: 'One person.', breakdown: ['一 before 个 (4th/neutral) → yí', '个 = the default measure word', '人 = rén, rising'] },
        ],
        commonMistakes: [
            'Reading tones as English intonation: English pitch shows emotion; Chinese pitch IS the word. mā/má/mǎ/mà are four different words — practice minimal pairs until the difference feels physical.',
            'Forgetting 3-3 sandhi: saying "nǐ hǎo" with two full dips sounds foreign and tires the listener. Write nǐ hǎo, SAY ní hǎo.',
            'Misreading ju/qu/xu with an English "u": after j/q/x the sound is Ü (rounded lips). 去 is "chü", not "choo".',
            'Saying every syllable at full strength: particles (吗, 呢, 了) and second doubles (谢谢) go NEUTRAL — light and quick. Full-toning them sounds robotic.',
        ],
    },

    patterns: [
        { type: 'Minimal pair drill', hanzi: '妈 — 麻 — 马 — 骂', pinyin: 'mā — má — mǎ — mà', en: 'mother — hemp — horse — scold: the four tones as four words' },
        { type: 'Sandhi 3-3', hanzi: '你 好 → 说: ní hǎo', pinyin: 'nǐ hǎo (written) → ní hǎo (spoken)', en: 'Two thirds → first goes rising' },
        { type: 'Sandhi 不', hanzi: '不 是 → bú shì', pinyin: 'bù shì → bú shì', en: '不 goes 2nd before a 4th tone' },
        { type: 'Sandhi 一', hanzi: '一 个 → yí ge · 一 天 → yì tiān', pinyin: 'yí ge · yì tiān', en: '一 goes yí before 4th, yì before 1/2/3' },
        { type: 'Neutral tone', hanzi: '谢 谢 · 吗 · 呢 · 了', pinyin: 'xièxie · ma · ne · le', en: 'Light, short, no mark — the soft beats' },
        { type: 'The hidden ü', hanzi: '去 · 绿 · 女', pinyin: 'qù · lǜ · nǚ', en: 'ju/qu/xu are REALLY jü/qü/xü — round your lips' },
    ],

    sentenceBuilding: [
        { hanzi: '你 好 。', pinyin: 'ní hǎo .', en: 'Hello. (sandhi included from day one)' },
        { hanzi: '你 好 ， 我 是 学 生 。', pinyin: 'ní hǎo , wǒ shì xuésheng .', en: 'Hello, I am a student.' },
        { hanzi: '你 好 ， 我 是 学 生 。 请 问 ， 你 呢 ？', pinyin: 'ní hǎo , wǒ shì xuésheng . qǐngwèn , nǐ ne ?', en: 'Hello, I am a student. May I ask — and you?' },
        { hanzi: '你 好 ！ 我 是 学 生 ， 我 学 汉 语 。 你 呢 ？', pinyin: 'ní hǎo ! wǒ shì xuésheng , wǒ xué Hànyǔ . nǐ ne ?', en: 'Hello! I\u2019m a student, I study Chinese. And you?' },
        { hanzi: '老 师 ， 您 好 ！ 我 学 汉 语 。 再 见 ！', pinyin: 'lǎoshī , nín hǎo ! wǒ xué Hànyǔ . zàijiàn !', en: 'Teacher, hello! I study Chinese. Goodbye!' },
    ],

    practice: [
        { instruction: 'Name the tone:', question: 'mǎ (horse)', answer: '3rd tone — the dip. Half-dip before other tones.' },
        { instruction: 'Say it with sandhi:', question: '你 好 (nǐ hǎo)', answer: 'ní hǎo — 3-3 becomes 2-3' },
        { instruction: 'Say it with sandhi:', question: '不 是 (bù shì)', answer: 'bú shì — 不 flips to 2nd before a 4th' },
        { instruction: '一 before a 4th tone:', question: '一 个 (yī ge)', answer: 'yí ge — 一 rises before 4th' },
        { instruction: 'Read the hidden ü:', question: '去 qù', answer: 'qü — rounded lips; the dots vanish after j/q/x' },
        { instruction: 'Neutral or not:', question: '谢 谢 的 第 二 个 谢', answer: 'Neutral — light and short: xièxie' },
    ],

    translationPractice: [
        { en: 'Hello, teacher!', hanzi: '老 师 ， 您 好 ！', pinyin: 'lǎoshī , nín hǎo !' },
        { en: 'I study Chinese.', hanzi: '我 学 汉 语 。', pinyin: 'wǒ xué Hànyǔ .' },
        { en: 'Goodbye — see you tomorrow!', hanzi: '再 见 ， 明 天 见 ！', pinyin: 'zàijiàn , míngtiān jiàn !' },
        { en: 'Excuse me, what is your name?', hanzi: '请 问 ， 你 叫 什 么 名 字 ？', pinyin: 'qǐngwèn , nǐ jiào shénme míngzi ?' },
        { en: 'I am not a teacher.', hanzi: '我 不 是 老 师 。', pinyin: 'wǒ bú shì lǎoshī .' },
        { en: 'Three people.', hanzi: '三 个 人 。', pinyin: 'sān ge rén .' },
    ],

    reverseTranslation: [
        { hanzi: '妈 妈 骂 马 。', pinyin: 'māma mà mǎ .', en: 'Mom scolds the horse. (the classic minimal-pair sentence)' },
        { hanzi: '我 去 上 海 。', pinyin: 'wǒ qù Shànghǎi .', en: 'I go to Shanghai.' },
        { hanzi: '请 问 ， 现 在 几 点 ？', pinyin: 'qǐngwèn , xiànzài jǐ diǎn ?', en: 'Excuse me, what time is it now?' },
        { hanzi: '很 高 兴 认 识 你 。', pinyin: 'hěn gāoxìng rènshi nǐ .', en: 'Very glad to meet you.' },
    ],

    register: {
        casual: '你 好 ！ 我 叫 小 明 。 — short tones, relaxed rhythm, full sandhi.',
        polite: '请 问 …… 老 师 ， 您 好 。 — 请问 before questions; 您 for the person.',
        formal: '各 位 好 。 欢 迎 学 习 汉 语 。 — formal welcome formulas (recognize in listening; HSK 2+ preview).',
    },

    culture: 'Pinyin (拼 音 = "spell sounds") was standardized in 1958 and is the single most useful tool a learner owns — every dictionary, textbook and keyboard in China uses it. Typing Chinese IS typing pinyin: type ni hao and the候选 bar offers 你好. Two cultural sound-facts worth knowing: tone 3 alone is usually half-dipped (native speakers rarely do the full rise), and the 一/不 sandhi pair is so automatic that natives correct themselves mid-sentence when reading numbers aloud. When in doubt in real life, slower + clearer tones beats faster + fuzzier every time.',

    freeProduction: 'Record yourself reading the four-tone column (妈麻马骂) then the three sentences: 你好！我不是老师，我是学生。请问，你叫什么名字？Listen back and grade ONLY the tones. Then record 这是什么？是谁？—— the pure question-music of Chinese.',

    miniTest: [
        { question: 'Which tone is 骂 (scold)?', options: ['1st — flat', '2nd — rising', '3rd — dip', '4th — fall'], answer: '4th — fall' },
        { question: '你好 is SAID:', options: ['nǐ hǎo exactly as written', 'ní hǎo', 'nī hǎo', 'nì hǎo'], answer: 'ní hǎo — 3-3 sandhi' },
        { question: '不是 is SAID:', options: ['bù shì', 'bú shì', 'bū shì', 'bu shì (full 4th)'], answer: 'bú shì — 不 flips before a 4th tone' },
        { question: '去 (qù) really sounds like:', options: ['choo', 'chü — rounded ü', 'chuh', 'chou'], answer: 'chü — rounded ü (after j/q/x, u is hidden ü)' },
        { question: 'The second 谢 in 谢谢 is:', options: ['4th tone', '1st tone', 'neutral — light and short', '2nd tone'], answer: 'neutral — light and short' },
    ],

    review: [
        'Next lecture uses these sounds for real: greetings put the sandhi to work (你好! 谢谢!) — tones are the exam\u2019s listening half of every question.',
        'The three-form rule starts here: 汉字 — pinyin — English, every word, forever.',
    ],

    traps: [
        'Tones are MEANING, not accent: mā (mom) vs mà (scold) — the exam listening lives and dies here. Drill minimal pairs out loud.',
        'You WRITE nǐ hǎo and SAY ní hǎo (3-3 sandhi). Same for 很好, 也可以, 请问 (jǐ diǎn → jí diǎn).',
        'The 一/不 chameleons: 不 → bú before 4th (不是, 不去); 一 → yí before 4th (一个), yì before 1/2/3 (一天).',
        'Spelling traps: standalone i → yi (也 yě), u → wu, ü → yu; after j/q/x the ü dots vanish (去 qù = qü). And Xi\u2019an needs its apostrophe.',
    ],

    homework: {
        intro: 'The sound system in every section: tones named, sandhi applied, spelling traps dodged.',
        translation: [
            { prompt: 'Hello! (to a teacher — polite)', answer: '老 师 ， 您 好 ！', alt: ['老师，您好！'], explanation: '您 + 好 — the polite you. Note 老师 is also the address (Teacher!).' },
            { prompt: 'I study Chinese.', answer: '我 学 汉 语 。', alt: ['我学习汉语。'], explanation: '学 or 学习 both work; 汉语 = spoken Chinese. No conjugation, no articles — three words.' },
            { prompt: 'I am not a teacher.', answer: '我 不 是 老 师 。', alt: ['我不是老师。'], explanation: '不 before 是, said bú shì (sandhi).' },
            { prompt: 'One person.', answer: '一 个 人 。', alt: ['一个人。'], explanation: '一 → yí before 个; the measure word 个 is obligatory between number and noun.' },
            { prompt: 'Excuse me, what\u2019s your name?', answer: '请 问 ， 你 叫 什 么 名 字 ？', alt: ['请问，你叫什么名字？'], explanation: '请问 opens the question politely; the question word 什么 stays in the object slot.' },
            { prompt: 'Goodbye!', answer: '再 见 ！', alt: ['再见！'], explanation: '4-4 — both tones fall hard. See-again as one word.' },
        ],
        blanks: [
            { prompt: '两 个 人 → say the 一-type sandhi: 一 个 人 = ___ ge rén', answer: 'yí', explanation: '一 → yí before 4th/neutral-ish 个.' },
            { prompt: '不 好 → bù stays. 不 是 → bú shì because 是 is ___ tone.', answer: '4th', explanation: '不 flips to bú before a 4th tone.' },
            { prompt: '你 好 — two 3rd tones — say: ___ hǎo', answer: 'ní', explanation: '3-3 sandhi: first 3rd becomes 2nd.' },
            { prompt: 'j / q / x + u is really j/q/x + ___.', answer: 'ü', explanation: 'The dots vanish in spelling only: 去 = qü.' },
            { prompt: 'Standalone "i" is written ___ in pinyin (也).', answer: 'ye', explanation: 'i alone → yi: 也 yě, 一 yī.' },
            { prompt: '吗 / 呢 / 了 carry which tone?', answer: 'neutral', explanation: 'Particles are toneless-light: ma, ne, le.' },
        ],
        corrections: [
            { prompt: 'Saying 你好 with two full 3rd-tone dips.', answer: '你 好 — SAY ní hǎo (2-3).', explanation: 'How the mistake happens: applying both full dips. Why it does not work: two full 3rds in a row are unpronounceable — sandhi exists to fix this. How to fix it: first 3rd → 2nd: ní hǎo.' },
            { prompt: 'Reading 去 as "choo".', answer: '去 = qü (rounded lips, like the French u).', explanation: 'How the mistake happens: English "u" after q. Why it does not work: after j/q/x the sound is ü — the dots are hidden by spelling rules. How to fix it: round the lips: qü, jü (ju), xü (xu).' },
            { prompt: 'Writing 我 是 不 学 生 。', answer: '我 不 是 学 生 。', explanation: 'How the mistake happens: English "I am not a student" word order. Why it does not work: 不 sits BEFORE the verb it negates. How to fix it: subject + 不 + verb.' },
            { prompt: 'Full-toning the second 谢 (xièxiè).', answer: '谢 谢 = xièxie (4th + neutral).', explanation: 'How the mistake happens: giving every syllable a tone. Why it does not work: doubled words and particles go neutral — light and quick. How to fix it: de-stress the second syllable.' },
            { prompt: 'Reading 一天 as "yī tiān".', answer: '一 天 = yì tiān.', explanation: 'How the mistake happens: 一 always as yī. Why it does not work: 一 shifts — yí before 4th (一个), yì before 1st/2nd/3rd (一天). How to fix it: look at the NEXT syllable\u2019s tone.' },
        ],
        writing: {
            task: 'Write (pinyin or characters) a mini sound-diary (5–7 lines): greet a teacher with sandhi noted (您好 — note nín 2nd tone), introduce yourself, state you study Chinese (我学汉语), ask a name with 请问, and sign off with 再见 — marking every sandhi you say in brackets.',
            requirements: [
                'At least one 3-3 sandhi marked (nǐ hǎo → ní hǎo)',
                'At least one 不 or 一 sandhi marked',
                'One j/q/x + ü word used correctly (去/句/女儿)',
                'One neutral-tone word (吗/呢/了/谢谢)',
                'The 请问 opener before your question',
            ],
            minWords: 40,
        },
        checklist: [
            'I can produce all four tones + neutral on demand (妈麻马骂)',
            'I apply 3-3 sandhi automatically (ní hǎo)',
            'I apply the 不 and 一 sandhi by looking at the next tone',
            'I read ju/qu/xu with hidden ü',
            'I spell standalone i/u/ü as yi/wu/yu',
            'I de-stress particles and second doubles (吗/呢/了/谢谢)',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The four tones as gestures: 1 = hold a high plateau; 2 = rise like a surprised "huh?"; 3 = drive through a ditch (half-dip usually); 4 = stomp down. Neutral = no gesture, quick and light.',
            examples: [
                { hanzi: '妈 mā · 麻 má · 马 mǎ · 骂 mà · 吗 ma', pinyin: 'the five-beat scale', en: 'mother · hemp · horse · scold · question particle' },
            ],
        },
        {
            explanation: '3-3 sandhi: two 3rd tones in a row → the FIRST becomes 2nd. Chains of three 3rds split in pairs (我很好 → wó hén hǎo). Write one thing, say another.',
            examples: [
                { hanzi: '你 好 → ní hǎo · 很 好 → hén hǎo · 也 很 好 → yé hén hǎo', pinyin: '3-3 chains', en: 'hello · very good · also very good' },
            ],
        },
        {
            explanation: '不 and 一 are chameleons: 不 → bú before a 4th tone; 一 → yí before a 4th, yì before 1st/2nd/3rd. Numbers list intonation keeps 一 as yī only at the end (十一 shíyī).',
            examples: [
                { hanzi: '不 是 → bú shì · 不 去 → bú qù · 一 个 → yí ge · 一 天 → yì tiān', pinyin: 'the chameleon pair', en: 'isn\u2019t · not going · one · one day' },
            ],
        },
        {
            explanation: 'The hidden ü: after j/q/x, write u but SAY ü (rounded lips). 去 qù = qü, 句 jù = jü, 女 nǚ keeps her dots (n+ü keeps ü after n/l).',
            examples: [
                { hanzi: '去 qù · 句 jù · 女 nǚ · 绿 lǜ', pinyin: 'jü · jü · nü · lü', en: 'go · sentence · woman · green' },
            ],
        },
        {
            explanation: 'Neutral tone syllables: 吗 呢 了 and second doubles (谢谢, 妈妈, 爸爸). They are SHORT and attach to the previous beat — full-toning them is the #1 robotic-sound marker.',
            examples: [
                { hanzi: '你 是 吗 ？ 谢 谢 · 爸 爸 · 我 来 了 。', pinyin: 'ma · xièxie · bàba · wǒ lái le', en: '…? · thanks · dad · I came' },
            ],
        },
        {
            explanation: 'Pinyin spelling rules: i alone → yi, u alone → wu, ü alone → yu; apostrophe before a/o/e syllables (Xi\u2019an); zh/ch/sh are retroflex (curl the tongue), z/c/s are flat.',
            examples: [
                { hanzi: '也 yě · 我 wǒ · 鱼 yú · 西 安 Xī \u2019ān', pinyin: 'spelling traps', en: 'also · I/me · fish · Xi\u2019an' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '妈': { en: 'mother', pron: 'mā', tone: '1', measure: '个', note: 'Tone-1 anchor of the 妈麻马骂 minimal set. 妈 妈 with neutral second syllable.' },
        '麻': { en: 'hemp / numb', pron: 'má', tone: '2', note: 'The rising-tone anchor: 麻烦 máfan (troublesome) is the everyday word.' },
        '骂': { en: 'to scold', pron: 'mà', tone: '4', note: 'The falling-tone anchor: 骂 人 = insult someone.' },
        '汉语': { en: 'the Chinese language', pron: 'Hànyǔ', tone: '4-3', note: 'Han-speech. 学 汉语 = study Chinese. 中文 = the written/general term.' },
        '学习': { en: 'to study', pron: 'xuéxí', tone: '2-2', note: 'Two risings in a row — keep both climbing.' },
        '骑': { en: 'to ride', pron: 'qí', tone: '2', note: '骑 马 ride a horse — and the hidden-ü family (qí = chí with q).' },
        '麻烦': { en: 'troublesome / to trouble', pron: 'máfan', tone: '2-neutral', note: 'HSK 2 preview; 麻烦 你 了 = sorry to trouble you.' },
    },
};

// ── HSK 1 · Numbers, Dates & Time ───────────────────────────────────────────
const h1Numbers: StaticChineseLesson = {
    title: 'Numbers, Dates & Time',
    objective: 'Count 1–100 as pure arithmetic, use 两 with measure words, tell time (现在几点？), give days and dates (星期/月/号), state your age with 岁, and ask all of it back with 几/多少 — the exam\u2019s favourite listening numbers.',

    vocabulary: [
        { hanzi: '零', pinyin: 'líng', en: 'zero', example: { hanzi: '一 零 零', pinyin: 'yì bǎi líng yī', en: '101 — the zero must be said!' }, related: [{ hanzi: '〇', pinyin: 'líng', en: 'the circle form' }] },
        { hanzi: '百', pinyin: 'bǎi', en: 'hundred', example: { hanzi: '一 百', pinyin: 'yìbǎi', en: 'one hundred' }, related: [{ hanzi: '二 百', pinyin: 'èrbǎi', en: 'two hundred' }] },
        { hanzi: '点', pinyin: 'diǎn', en: "o'clock (point of time)", example: { hanzi: '现 在 三 点 。', pinyin: 'xiànzài sān diǎn .', en: 'It\u2019s three o\u2019clock now.' }, related: [{ hanzi: '一 点 儿', pinyin: 'yìdiǎnr', en: 'a little' }] },
        { hanzi: '分', pinyin: 'fēn', en: 'minute', example: { hanzi: '三 点 二 十 分 。', pinyin: 'sān diǎn èrshí fēn .', en: '3:20.' }, related: [{ hanzi: '十 分', pinyin: 'shí fēn', en: 'ten minutes' }] },
        { hanzi: '现 在', pinyin: 'xiànzài', en: 'now', example: { hanzi: '现 在 几 点 ？', pinyin: 'xiànzài jǐ diǎn ?', en: 'What time is it now?' }, related: [{ hanzi: '今 天', pinyin: 'jīntiān', en: 'today' }] },
        { hanzi: '今 天', pinyin: 'jīntiān', en: 'today', example: { hanzi: '今 天 星 期 几 ？', pinyin: 'jīntiān xīngqī jǐ ?', en: 'What day is it today?' }, related: [{ hanzi: '明 天', pinyin: 'míngtiān', en: 'tomorrow' }] },
        { hanzi: '星 期', pinyin: 'xīngqī', en: 'week', example: { hanzi: '星 期 一', pinyin: 'xīngqīyī', en: 'Monday (week-one)' }, related: [{ hanzi: '星 期 天', pinyin: 'xīngqītiān', en: 'Sunday' }] },
        { hanzi: '月', pinyin: 'yuè', en: 'month / moon', example: { hanzi: '五 月', pinyin: 'wǔ yuè', en: 'May (month-five)' }, related: [{ hanzi: '一 号', pinyin: 'yí hào', en: 'the 1st' }] },
        { hanzi: '号', pinyin: 'hào', en: 'day of the month / number', example: { hanzi: '五 月 一 号', pinyin: 'wǔ yuè yí hào', en: 'May 1st' }, related: [{ hanzi: '几 号', pinyin: 'jǐ hào', en: 'which date' }] },
        { hanzi: '岁', pinyin: 'suì', en: 'years of age (measure word)', example: { hanzi: '我 二 十 岁 。', pinyin: 'wǒ èrshí suì .', en: 'I\u2019m twenty.' }, related: [{ hanzi: '你 多 大 ？', pinyin: 'nǐ duō dà ?', en: 'how old are you? (casual)' }] },
        { hanzi: '两', pinyin: 'liǎng', en: 'two (with measure words)', example: { hanzi: '两 个 人', pinyin: 'liǎng ge rén', en: 'two people — never 二个' }, related: [{ hanzi: '二', pinyin: 'èr', en: 'two (counting)' }] },
        { hanzi: '多 少 钱', pinyin: 'duōshao qián', en: 'how much money', example: { hanzi: '这 个 多 少 钱 ？', pinyin: 'zhè ge duōshao qián ?', en: 'How much is this?' }, related: [{ hanzi: '钱', pinyin: 'qián', en: 'money' }] },
    ],

    characters: [
        { hanzi: '百', pinyin: 'bǎi', en: 'hundred', components: '一 + 白', mnemonic: 'ONE (一) on top of WHITE (白) — "one white" = hundred. The stroke says the number.' },
        { hanzi: '分', pinyin: 'fēn', en: 'minute / divide', components: '八 + 刀', mnemonic: 'EIGHT (八) + KNIFE (刀) — dividing into eight with a knife = a minute is a DIVISION of the hour.' },
        { hanzi: '星', pinyin: 'xīng', en: 'star', components: '日(sun) + 生(born)', mnemonic: 'A SUN that is BORN in the sky = a star. 星期 = the star-period = week.' },
        { hanzi: '现', pinyin: 'xiàn', en: 'present/now', components: '王(jade) + 见(see)', mnemonic: 'JADE (王) that is SEEN (见) right now — 现在 = the appearing-present.' },
        { hanzi: '钱', pinyin: 'qián', en: 'money', components: '钅(metal) + 戋', mnemonic: 'The METAL radical 钅 — money was metal coins. Learn this radical and money-wordsannounce themselves.' },
        { hanzi: '岁', pinyin: 'suì', en: 'year of age', components: '山 + 夕', mnemonic: 'MOUNTAIN + evening — years pile up like mountains of evenings. It is a MEASURE word: 二十岁, never 二十个岁.' },
    ],

    pronunciation: [
        { hanzi: '四 vs 十', pinyin: 'sì (4) · shí (10)', toneNote: 'The deadly pair: s- is flat-tongue, sh- is curled. 四 falls (4th), 十 rises (2nd).', en: 'The exam\u2019s favourite listening trap.' },
        { hanzi: '一 hundred', pinyin: 'yìbǎi', toneNote: '一 before 百 (3rd) → yì. The chameleon again.', en: 'yí ge … yì bǎi … yì tiān.' },
        { hanzi: '几 点', pinyin: 'jǐ diǎn', toneNote: '3-3 sandhi → jí diǎn. Same rule, new words.', en: 'Two dips → rise + dip.' },
        { hanzi: '星 期 天', pinyin: 'xīngqītiān', toneNote: '1-1-1 — three flat plateaus in a row. Keep them level.', en: 'Sunday: week-sky-day.' },
        { hanzi: '多 少', pinyin: 'duōshao', toneNote: '少 loses its tone in this question word — duōshao, light ending.', en: 'Neutral again.' },
        { hanzi: '两 个', pinyin: 'liǎng ge', toneNote: '3-neutral: half-dip then light. 两 vs 四 — liǎng vs sì — is the other listening pair.', en: 'two people, two o\u2019clock (两点).' },
    ],

    grammar: {
        rule: 'Numbers are arithmetic: 十二 (12) = ten-two, 二十一 (21) = two-ten-one, 一百零一 (101) says the zero. Time = number + 点 (+ 分). Days = 星期 + number. Dates = month + 号. Age = number + 岁. And 两, not 二, stands before measure words.',
        explanation: 'Chinese numbers never inflect — no singular/plural, no "teen" irregularity: 十三 is ten-three, 九十 is nine-ten. Zero is REQUIRED mid-number: 101 = 一百零一 (you must say líng). With measure words, 两 replaces 二: 两个人, 两点 — 二 survives only in counting aloud, phone numbers, and 十二/二十/二十二. Telling time stacks straight: 现在 (now) + 几点？answer: 三点 (three o\u2019clock), 三点二十分 (3:20), with 半 (half) for 3:30 = 三点半, and 刻 (quarter) = 三点一刻. Days repeat 星期 + number with only two oddities: Sunday is 星期天 (or 星期日), and there is no 星期七. Dates go big-to-small: year → month → 号: 二零二五年五月一号 — every digit read separately, with 零 for zeros. Age uses the measure 岁: 我二十岁 — and the question is 你多大？(casual) or 你几岁？(to children). For prices, 多少钱 gets the neutral-shao. All of this rides the tone pairs 四/十 and 两/四 — the exam\u2019s two most-loved listening traps.',
        examples: [
            { hanzi: '二 十 一 = 21 。', pinyin: 'èrshíyī .', en: '21 = two-ten-one.', breakdown: ['二十 = twenty (two-ten)', '一 = the last digit', 'no "teen" tricks anywhere'] },
            { hanzi: '现 在 几 点 ？ — 三 点 半 。', pinyin: 'xiànzài jǐ diǎn ? — sān diǎnbàn .', en: 'What time is it now? — 3:30.', breakdown: ['现在 = now (fronted)', '几点 = which-point', '半 = half hour'] },
            { hanzi: '我 家 有 四 口 人 。', pinyin: 'wǒ jiā yǒu sì kǒu rén .', en: 'My family has four people.', breakdown: ['有 = there-is/has', '四 口 = four MOUTHS (family measure)', '人 = people'] },
            { hanzi: '今 天 星 期 几 ？ — 星 期 五 。', pinyin: 'jīntiān xīngqī jǐ ? — xīngqīwǔ .', en: 'What day is it today? — Friday.', breakdown: ['星期几 = week-which', '星期五 = week-five', 'Sunday is the odd one: 星期天/日'] },
            { hanzi: '我 二 十 岁 。 你 呢 ？', pinyin: 'wǒ èrshí suì . nǐ ne ?', en: 'I\u2019m twenty. And you?', breakdown: ['岁 = the age measure', '二十 with 二 (no measure word here)', '呢 echoes'] },
            { hanzi: '五 月 一 号 是 星 期 几 ？', pinyin: 'wǔ yuè yí hào shì xīngqī jǐ ?', en: 'What weekday is May 1st?', breakdown: ['大 to small: month → 号', '一 号 sandhi: yí hào', '是 links date to weekday'] },
        ],
        commonMistakes: [
            '二个 — WRONG: before measure words two becomes 两: 两个人, 两点. 二 stays in counting, phone numbers, and 十二/二十/二十二.',
            'Saying 101 as 一百一: mid-number zero is obligatory — 一百零一. Drop the 零 and you have said 110.',
            'Time as 三小时 for o\u2019clock: 小时 is DURATION (three hours long); the clock time is 三点. 三点 vs 三个小时 — the exam loves this pair.',
            'Forgetting that dates go big-to-small: 2025年5月1号 (year → month → day), and years read digit by digit: 二零二五, never 二千二十五.',
        ],
    },

    patterns: [
        { type: 'Ask the time', hanzi: '现 在 几 点 ？', pinyin: 'xiànzài jǐ diǎn ?', en: 'What time is it now?' },
        { type: 'Tell the time', hanzi: '现 在 三 点 二 十 分 。', pinyin: 'xiànzài sān diǎn èrshí fēn .', en: 'It\u2019s 3:20 now.' },
        { type: 'Ask the day', hanzi: '今 天 星 期 几 ？', pinyin: 'jīntiān xīngqī jǐ ?', en: 'What day is it today?' },
        { type: 'Ask the date', hanzi: '今 天 几 月 几 号 ？', pinyin: 'jīntiān jǐ yuè jǐ hào ?', en: 'What\u2019s today\u2019s date?' },
        { type: 'Age', hanzi: '你 多 大 ？ — 我 二 十 岁 。', pinyin: 'nǐ duō dà ? — wǒ èrshí suì .', en: 'How old are you? — I\u2019m twenty.' },
        { type: 'Price', hanzi: '这 个 多 少 钱 ？', pinyin: 'zhè ge duōshao qián ?', en: 'How much is this one?' },
    ],

    sentenceBuilding: [
        { hanzi: '现 在 三 点 。', pinyin: 'xiànzài sān diǎn .', en: 'It\u2019s three o\u2019clock now.' },
        { hanzi: '现 在 三 点 二 十 分 。', pinyin: 'xiànzài sān diǎn èrshí fēn .', en: 'It\u2019s 3:20 now.' },
        { hanzi: '今 天 星 期 五 ， 我 很 忙 。', pinyin: 'jīntiān xīngqīwǔ , wǒ hěn máng .', en: 'Today is Friday; I\u2019m very busy.' },
        { hanzi: '今 天 星 期 五 ， 我 们 两 点 半 上 课 。', pinyin: 'jīntiān xīngqīwǔ , wǒmen liǎng diǎnbàn shàng kè .', en: 'Today is Friday; we have class at 2:30.' },
        { hanzi: '今 天 星 期 五 ， 我 们 两 点 半 上 课 —— 你 呢 ？', pinyin: '… nǐ ne ?', en: '… — and you?' },
    ],

    practice: [
        { instruction: 'Choose the two:', question: '___ 个 人 (two people)', answer: '两 — 两 replaces 二 before measure words' },
        { instruction: 'Say 101:', question: '一百 + ?', answer: '一百零一 — mid-number zero is obligatory' },
        { instruction: 'Clock or duration:', question: '三 ___ (it\u2019s 3 o\u2019clock)', answer: '点 — 三点 is the time; 三个小时 is duration' },
        { instruction: 'Sunday:', question: '星期 ___ ?', answer: '天 (or 日) — there is no 星期七' },
        { instruction: 'The listening pair:', question: 'sì (4) vs ___ (10)?', answer: 'shí — flat s vs curled sh, 4th vs 2nd' },
        { instruction: 'Age measure:', question: '我 二十 ___ 。', answer: '岁 — the age measure word' },
    ],

    translationPractice: [
        { en: 'What time is it now? — 4:10.', hanzi: '现 在 几 点 ？ — 四 点 十 分 。', pinyin: 'xiànzài jǐ diǎn ? — sì diǎn shí fēn .' },
        { en: 'Today is Monday.', hanzi: '今 天 星 期 一 。', pinyin: 'jīntiān xīngqīyī .' },
        { en: 'My family has five people.', hanzi: '我 家 有 五 口 人 。', pinyin: 'wǒ jiā yǒu wǔ kǒu rén .' },
        { en: 'I am twenty-one years old.', hanzi: '我 二 十 一 岁 。', pinyin: 'wǒ èrshíyī suì .' },
        { en: 'How much is this?', hanzi: '这 个 多 少 钱 ？', pinyin: 'zhè ge duōshao qián ?' },
        { en: 'May 1st is what weekday?', hanzi: '五 月 一 号 是 星 期 几 ？', pinyin: 'wǔ yuè yí hào shì xīngqī jǐ ?' },
    ],

    reverseTranslation: [
        { hanzi: '现 在 两 点 半 。', pinyin: 'xiànzài liǎng diǎnbàn .', en: 'It\u2019s 2:30 now. (两 even for the clock!)' },
        { hanzi: '我 妈 六 十 岁 。', pinyin: 'wǒ mā liùshí suì .', en: 'My mom is sixty.' },
        { hanzi: '一 百 零 一 块 钱 。', pinyin: 'yìbǎi líng yī kuài qián .', en: '101 yuan. (the 零 is compulsory)' },
        { hanzi: '明 天 星 期 天 。', pinyin: 'míngtiān xīngqītiān .', en: 'Tomorrow is Sunday.' },
    ],

    register: {
        casual: '几 点 了 ？ — the 了 adds "already": what time is it ALREADY? (friends)',
        polite: '请 问 ， 现 在 几 点 ？ — 请问 first, always, with strangers.',
        formal: '会 议 于 三 点 整 开 始 。 — the meeting starts at 3:00 SHARP (整 = exactly; written/announcement style).',
    },

    culture: 'Chinese number culture is alive: 8 (八) is lucky (sounds like 发, get-rich — the Beijing Olympics opened 8/8/2008 at 8:08), while 4 (四) is avoided because it sounds like 死 (death) — buildings skip fourth floors and phone numbers with 4 cost less. On the street, prices are negotiated with these very numbers, and age is asked freely (你多大？) as a friendliness marker — answering with your zodiac animal (属狗！) is a classic deflection. And gestures matter: counting on one hand differs from the West — a crossed index and middle finger means ten.',

    freeProduction: 'Record a "life on the clock" mini-monologue (6–8 lines): what day today is (今天是星期…), what time you get up (我七点起床), when class/work starts (几点上课/上班), today\u2019s date (几月几号), your age, and how much your lunch costs (十块钱). Then ask all five questions back to a partner — 几点/星期几/几号/多大/多少钱.',

    miniTest: [
        { question: 'Two people is:', options: ['二个人', '两个人', '两是人', '二十人'], answer: '两个人 — 两 before measure words' },
        { question: '101 is:', options: ['一百一', '一百零一', '一零一', '十一百'], answer: '一百零一 — mid-number 零 is obligatory' },
        { question: 'It\u2019s 3:30:', options: ['三点三十分 only', '三点半', '三半点', '三点三十'], answer: '三点半 — 半 does the half-hour job' },
        { question: 'Sunday is:', options: ['星期七', '星期天 / 星期日', '星期零', '周末天'], answer: '星期天 / 星期日 — there is no 星期七' },
        { question: 'The 4-vs-10 listening trap is:', options: ['sì vs shí — flat vs curled s', 'both shí', 'both sì', 'a tone trick only'], answer: 'sì vs shí — flat vs curled s (4th vs 2nd tone)' },
    ],

    review: [
        'The greetings lecture\u2019s sandhi rules run through every number: 一个 → yí ge, 不是 → bú shì — numbers just gave them a workout.',
        'Next: family — 的 possession (我的妈妈) and 有 for counting the household (我家有四口人).',
    ],

    traps: [
        '两 vs 二: measure words demand 两 (两个人, 两点); 二 lives in counting, phone numbers, and compounds (十二, 二十).',
        'Mid-number zero is compulsory: 101 = 一百零一, 305 = 三百零五. Skipping 零 changes the number.',
        '点 (clock time) vs 小时 (duration): 三点 = 3 o\u2019clock; 三个小时 = three hours. The exam tests this distinction hard.',
        'The sì/shí listening trap (4 vs 10) — flat tongue vs curled, 4th vs 2nd. Drill it until your ear flinches correctly.',
    ],

    homework: {
        intro: 'Numbers as arithmetic, 两 with measures, clock and calendar — every item is an exam listening question in disguise.',
        translation: [
            { prompt: 'What time is it now? — It\u2019s 3:20.', answer: '现 在 几 点 ？ —— 三 点 二 十 分 。', alt: ['现在几点？——三点二十分。'], explanation: '现在 fronted; 点 + 分 stack; no verb needed — Chinese clock sentences are verbless.' },
            { prompt: 'Today is Friday.', answer: '今 天 星 期 五 。', alt: ['今天是星期五。'], explanation: '星期 + number; 是 optional before the weekday — both forms are natural.' },
            { prompt: 'My family has four people.', answer: '我 家 有 四 口 人 。', alt: ['我家有四口人。'], explanation: '有 = there-is; 口 counts family members (mouths); no 的 needed inside 我家 as a set phrase.' },
            { prompt: 'I am twenty-one years old.', answer: '我 二 十 一 岁 。', alt: ['我二十一岁。'], explanation: '岁 is the age measure — number + 岁, no 是, no 有.' },
            { prompt: 'How much is this?', answer: '这 个 多 少 钱 ？', alt: ['这个多少钱？'], explanation: '多少 = how-many; the question word sits in the object slot — nothing moves.' },
            { prompt: 'Two o\u2019clock.', answer: '两 点 。', alt: ['两点。'], explanation: 'Even the CLOCK uses 两 (两点半). 二 appears only in counting and compounds.' },
        ],
        blanks: [
            { prompt: '我 家 有 四 ___ 人 。', answer: '口', explanation: '口 = the family-members measure (by mouths).' },
            { prompt: '现 在 十 二 ___ 。 (12:00)', answer: '点', explanation: '点 = o\u2019clock. 十二点 = noon.' },
            { prompt: '今 天 星 期 ___ ， 明 天 星 期 天 。 (the day before Sunday)', answer: '六', explanation: 'Saturday = week-six; Sunday is the odd one (天/日).' },
            { prompt: '五 月 一 ___ 是 我 的 生 日 。', answer: '号', explanation: '号 = day-of-month in speech (日 in writing).' },
            { prompt: '我 妹 妹 十 ___ 岁 。 (10)', answer: '十', explanation: '十岁 — plain 十, no 两/二 needed for round ten.' },
            { prompt: '这 个 ___ 钱 ？ (how much)', answer: '多 少', explanation: '多少钱 — with the neutral shao.' },
        ],
        corrections: [
            { prompt: '我 有 二 个 妹 妹 。', answer: '我 有 两 个 妹 妹 。', explanation: 'How the mistake happens: 二 = two, everywhere. Why it does not work: measure words demand 两. How to fix it: 两个妹妹. 二 survives in 十二, 二十二, phone numbers.' },
            { prompt: '现 在 三 个 小 时 。', answer: '现 在 三 点 。', explanation: 'How the mistake happens: hours = hours. Why it does not work: 小时 measures DURATION; the clock reads 点. How to fix it: 现在三点。 (三个小时 = "for three hours").' },
            { prompt: '一 百 一 零 五 。 (105)', answer: '一 百 零 五 。', explanation: 'How the mistake happens: reading digits 1-1-0-5. Why it does not work: mid-number zero is ONE 零 regardless of zero-count. How to fix it: 一百零五.' },
            { prompt: '今 天 星 期 七 。', answer: '今 天 星 期 天 。 (或 星 期 日)', explanation: 'How the mistake happens: arithmetic week-days. Why it does not work: Chinese week has no seven-slot — Sunday is 天 (sky-day) or 日. How to fix it: 星期天/星期日.' },
            { prompt: '二 零 二 五 年 五 月 一 号 = 两 千 二 百 二十 五 年 。', answer: '二 零 二 五 年 。', explanation: 'How the mistake happens: reading years as full numbers. Why it does not work: years read DIGIT BY DIGIT. How to fix it: 二零二五年 — each digit separate.' },
        ],
        writing: {
            task: 'Write your week on the clock (6–8 short sentences): today\u2019s day and date (今天是几月几号，星期几), two fixed times (我七点起床 / 我们九点上课), your age (我…岁), and one price you know (一杯茶五块钱). End with one question to the reader: 你呢？',
            requirements: [
                'One 星期 + number day',
                'One 点 + 分 (or 半) clock time',
                'One 两 used with a measure word',
                'One 岁 age sentence',
                'One 多少钱 price or 一百零一-style number with 零',
            ],
            minWords: 40,
        },
        checklist: [
            'I count 1–100 as arithmetic (二十一, 一百零一 with the compulsory 零)',
            'I use 两 before measure words and keep 二 for counting/compounds',
            'I tell time with 点/分/半 and ask 现在几点？',
            'I give days (星期几) and dates (几月几号) big-to-small, years digit by digit',
            'I state age with 岁 and ask 你多大？/ 你几岁？',
            'My ear flinches correctly at 四/十 and 两/四',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'Number arithmetic: 13 = 十三, 30 = 三十, 21 = 二十一; hundreds stack (二百 = 200), and mid-number zeros are SAID: 105 = 一百零五, 101 = 一百零一.',
            examples: [
                { hanzi: '三 十 五 · 一 百 零 一 · 二 百 零 七', pinyin: 'sānshíwǔ · yìbǎi líng yī · èrbǎi líng qī', en: '35 · 101 · 207' },
            ],
        },
        {
            explanation: '两 vs 二: 两 + measure word (两个人, 两点, 两岁); 二 in counting, phone numbers, and inside compounds (十二, 二十二, 第二).',
            examples: [
                { hanzi: '两 个 人 · 十 二 岁 · 第 二 ', pinyin: 'liǎng ge rén · shí\u2019èr suì · dì\u2019èr', en: 'two people · twelve years old · the second' },
            ],
        },
        {
            explanation: 'Time frames: 点 = clock point (三点), 分 = minutes (三点二十), 半 = half past (三点半), 刻 = quarter (三点一刻), 小时 = DURATION (三个小时).',
            examples: [
                { hanzi: '三 点 半 · 三 点 一 刻 · 三 个 小 时', pinyin: 'sān diǎnbàn · sān diǎn yí kè · sān ge xiǎoshí', en: '3:30 · 3:15 · three hours' },
            ],
        },
        {
            explanation: 'Calendar: days = 星期 + number (Sunday: 天/日); dates = 月 + 号 big-to-small; years read digit-by-digit with 零 for zeros.',
            examples: [
                { hanzi: '星 期 四 · 五 月 十 号 · 二 零 二 五 年', pinyin: 'xīngqīsì · wǔ yuè shí hào · èr líng èr wǔ nián', en: 'Thursday · May 10 · year 2025' },
            ],
        },
        {
            explanation: 'Age has its own measure: 岁 — 我二十岁 (no 是, no 有). The question: 你多大？ (adults, casual) or 你几岁？ (children).',
            examples: [
                { hanzi: '我 二 十 岁 。 你 多 大 ？', pinyin: 'wǒ èrshí suì . nǐ duō dà ?', en: 'I\u2019m twenty. How old are you?' },
            ],
        },
        {
            explanation: 'The listening traps: sì (4, flat s, 4th tone) vs shí (10, curled sh, 2nd tone); liǎng (两) vs nǐ/liù. Examiners pick these precisely because learners blur them.',
            examples: [
                { hanzi: '四 点 · 十 点 · 两 点', pinyin: 'sì diǎn · shí diǎn · liǎng diǎn', en: '4 o\u2019clock · 10 o\u2019clock · 2 o\u2019clock' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '零': { en: 'zero', pron: 'líng', tone: '2', note: 'Compulsory mid-number: 101 = 一百零一.' },
        '百': { en: 'hundred', pron: 'bǎi', tone: '3', note: '二百 = 200 (二 here — no measure word).' },
        '点': { en: "o'clock / point", pron: 'diǎn', tone: '3', measure: '个', note: 'Clock point: 三点. Also 一点儿 = a little.' },
        '分': { en: 'minute', pron: 'fēn', tone: '1', note: '三点二十分; also divide/score (一百分 = 100 points).' },
        '小时': { en: 'hour (duration)', pron: 'xiǎoshí', tone: '3-2', measure: '个', note: 'DURATION only: 三个小时 = for three hours. Never for clock time.' },
        '现在': { en: 'now', pron: 'xiànzài', tone: '4-4', note: 'Two falling tones — both land.' },
        '今天': { en: 'today', pron: 'jīntiān', tone: '1-1', note: '明天 tomorrow, 昨天 yesterday — the 天 family.' },
        '星期': { en: 'week', pron: 'xīngqī', tone: '1-1', note: '星期一 Monday … 星期六 Saturday; Sunday = 星期天/日.' },
        '月': { en: 'month / moon', pron: 'yuè', tone: '4', note: '一月 = January; 一个月 = one month (measure 个).' },
        '号': { en: 'date / number', pron: 'hào', tone: '4', note: '一号 = the 1st; also numbers of seats/phones.' },
        '岁': { en: 'year of age', pron: 'suì', tone: '4', note: 'The age measure — 我二十岁.' },
        '多少钱': { en: 'how much money', pron: 'duōshao qián', tone: '1-neutral-2', note: '少 goes neutral here. The shopping question of HSK 1.' },
        '上课': { en: 'to have class / attend class', pron: 'shàng kè', tone: '4-4', note: '上 = attend + 课 = lesson; Separable: 上了两节课.' },
        '起床': { en: 'to get up', pron: 'qǐ chuáng', tone: '3-2', note: '起 = rise + 床 = bed. 七点起床.' },
    },
};

// ── HSK 1 · Family & People ─────────────────────────────────────────────────
const h1Family: StaticChineseLesson = {
    title: 'Family & People',
    objective: 'Name every family member precisely (no generic "sibling" in Chinese!), claim them with 的 (我的妈妈), count the household with 有…口人, and describe people with 很 — while learning the kinship precision that Chinese exams adore.',

    vocabulary: [
        { hanzi: '家', pinyin: 'jiā', en: 'home / family', measureWord: '个', example: { hanzi: '我 家 有 五 口 人 。', pinyin: 'wǒ jiā yǒu wǔ kǒu rén .', en: 'My family has five people.' }, related: [{ hanzi: '回 家', pinyin: 'huí jiā', en: 'to go home' }] },
        { hanzi: '爸 爸', pinyin: 'bàba', en: 'dad', example: { hanzi: '我 爸 爸 是 大 夫 。', pinyin: 'wǒ bàba shì dàifu .', en: 'My dad is a doctor.' }, related: [{ hanzi: '妈 妈', pinyin: 'māma', en: 'mom' }] },
        { hanzi: '妈 妈', pinyin: 'māma', en: 'mom', example: { hanzi: '我 妈 妈 很 忙 。', pinyin: 'wǒ māma hěn máng .', en: 'My mom is very busy.' }, related: [{ hanzi: '爸 爸', pinyin: 'bàba', en: 'dad' }] },
        { hanzi: '哥 哥', pinyin: 'gēge', en: 'OLDER brother', example: { hanzi: '我 哥 哥 二 十 五 岁 。', pinyin: 'wǒ gēge èrshíwǔ suì .', en: 'My older brother is 25.' }, related: [{ hanzi: '弟 弟', pinyin: 'dìdi', en: 'YOUNGER brother' }] },
        { hanzi: '姐 姐', pinyin: 'jiějie', en: 'OLDER sister', example: { hanzi: '她 是 我 姐 姐 。', pinyin: 'tā shì wǒ jiějie .', en: 'She is my older sister.' }, related: [{ hanzi: '妹 妹', pinyin: 'mèimei', en: 'YOUNGER sister' }] },
        { hanzi: '弟 弟', pinyin: 'dìdi', en: 'younger brother', example: { hanzi: '我 弟 弟 十 岁 。', pinyin: 'wǒ dìdi shí suì .', en: 'My younger brother is ten.' }, related: [{ hanzi: '哥 哥', pinyin: 'gēge', en: 'older brother' }] },
        { hanzi: '妹 妹', pinyin: 'mèimei', en: 'younger sister', example: { hanzi: '我 妹 妹 很 高 兴 。', pinyin: 'wǒ mèimei hěn gāoxìng .', en: 'My younger sister is very glad.' }, related: [{ hanzi: '姐 姐', pinyin: 'jiějie', en: 'older sister' }] },
        { hanzi: '儿 子', pinyin: 'érzi', en: 'son', example: { hanzi: '他 有 一 个 儿 子 。', pinyin: 'tā yǒu yí ge érzi .', en: 'He has a son.' }, related: [{ hanzi: '女 儿', pinyin: 'nǚ\u2019ér', en: 'daughter (hidden ü!)' }] },
        { hanzi: '女 儿', pinyin: 'nǚ\u2019ér', en: 'daughter', example: { hanzi: '她 的 女 儿 很 可 爱 。', pinyin: 'tā de nǚ\u2019ér hěn kě\u2019ài .', en: 'Her daughter is very cute.' }, related: [{ hanzi: '儿 子', pinyin: 'érzi', en: 'son' }] },
        { hanzi: '的', pinyin: 'de', en: "'s (possession glue)", example: { hanzi: '我 的 爸 爸 ， 你 的 书 。', pinyin: 'wǒ de bàba , nǐ de shū .', en: 'my dad, your book.' }, related: [{ hanzi: '三 个 de', pinyin: 'sān ge de', en: '的/得/地 — the three de\u2019s (HSK 4 preview)' }] },
        { hanzi: '同 学', pinyin: 'tóngxué', en: 'classmate', measureWord: '个', example: { hanzi: '他 是 我 同 学 。', pinyin: 'tā shì wǒ tóngxué .', en: 'He is my classmate.' }, related: [{ hanzi: '学 生', pinyin: 'xuésheng', en: 'student' }] },
        { hanzi: '大 夫', pinyin: 'dàifu', en: 'doctor', measureWord: '个', example: { hanzi: '我 妈 是 大 夫 。', pinyin: 'wǒ mā shì dàifu .', en: 'My mom is a doctor.' }, related: [{ hanzi: '医 生', pinyin: 'yīshēng', en: 'doctor (same meaning)' }] },
    ],

    characters: [
        { hanzi: '家', pinyin: 'jiā', en: 'home/family', components: '宀(roof) + 豕(pig)', mnemonic: 'A ROOF with a PIG under it — in ancient China, the family pig WAS the household. Home = where your pig lives.' },
        { hanzi: '的', pinyin: 'de', en: 'possession glue', components: '白(white) + 勺(spoon)', mnemonic: 'WHITE + SPOON — the most common character in Chinese (appears in ~4% of all text). It is glue: it never stands alone.' },
        { hanzi: '爸', pinyin: 'bà', en: 'dad', components: '父(father) + 巴', mnemonic: 'The FATHER radical 父 on top — the top radical shows the family role.' },
        { hanzi: '姐', pinyin: 'jiě', en: 'older sister', components: '女(woman) + 且', mnemonic: 'WOMAN radical + sound. The 女 radical marks the female kin set: 妈 姐 妹 她 — one radical, one family album.' },
        { hanzi: '弟', pinyin: 'dì', en: 'younger brother', components: 'a bow shooting downwards', mnemonic: 'Picture a younger brother bowing — 弟弟 comes AFTER 哥哥 in age and in the dictionary.' },
        { hanzi: '男', pinyin: 'nán', en: 'male / man', components: '田(field) + 力(strength)', mnemonic: 'FIELD + STRENGTH — the ancient division of labour fossilized in a character (and a talking point for modern China!).' },
    ],

    pronunciation: [
        { hanzi: '爸 爸', pinyin: 'bàba', toneNote: '4-neutral: the second 爸 is light — dad, not DAD-dad.', en: 'Family doubles go neutral.' },
        { hanzi: '妈 妈', pinyin: 'māma', toneNote: '1-neutral — same pattern.', en: 'The kinship doubles all share it.' },
        { hanzi: '女 儿', pinyin: 'nǚ\u2019ér', toneNote: 'THE apostrophe showcase: nǚ ends in ü, ér begins with a vowel — without the apostrophe it reads nüér as "nüe".', en: 'Hidden ü + apostrophe in one word.' },
        { hanzi: '哥 哥 vs 弟 弟', pinyin: 'gēge vs dìdi', toneNote: 'g vs d initials, both neutral-second. The EXAM contrasts them in listening.', en: 'older vs younger — never interchangeable.' },
        { hanzi: '大 夫', pinyin: 'dàifu', toneNote: '4-neutral: the 夫 is light. Also 医生 (1-1) — recognize both.', en: 'Two words for doctor.' },
        { hanzi: '同 学', pinyin: 'tóngxué', toneNote: '2-2 — two risings; keep both climbing.', en: 'same-study = classmate.' },
    ],

    grammar: {
        rule: 'Possession = owner + 的 + thing: 我的妈妈 (my mom). Family members are counted with 有…口人 for the household, and Chinese has NO generic siblings — 哥哥/弟弟/姐姐/妹妹 each name an exact relationship. Adjectives describe with 很, never 是.',
        explanation: '的 is the possession glue, and it reverses English order: the OWNER comes first, 的, then the owned — 我的书 (my book, lit. I-DE book), 妈妈的书 (mom\u2019s book). Pronouns take it too: 他的女儿. For the household count, Chinese uses 有: 我家有五口人 (my family HAS five mouths-of-people) — 口 is the respectful family measure. Negate with 没: 我家没有弟弟 (I don\u2019t HAVE a younger brother). The kinship set is precise: 哥哥 (older brother) and 弟弟 (younger) are different WORDS, and the age order is baked into the vocabulary — Chinese never makes you guess who is older. Describing people uses the 很-adjective frame from the greetings lecture: 我姐姐很漂亮 (my older sister is very pretty); with 会 for skills: 我弟弟会游泳. And professions use the identity 是: 我是学生，他是大夫. One more exam favourite: 和 joins people (爸爸和妈妈) but never clauses.',
        examples: [
            { hanzi: '这 是 我 的 妈 妈 。', pinyin: 'zhè shì wǒ de māma .', en: 'This is my mom.', breakdown: ['这 是 = this is', '我 的 = my (I + de)', '妈妈 = mom'] },
            { hanzi: '我 家 有 五 口 人 。', pinyin: 'wǒ jiā yǒu wǔ kǒu rén .', en: 'My family has five people.', breakdown: ['我家 = my family', '有 = has', '五口 = five MOUTHS + 人'] },
            { hanzi: '我 没 有 弟 弟 ， 我 有 姐 姐 。', pinyin: 'wǒ méiyǒu dìdi , wǒ yǒu jiějie .', en: 'I don\u2019t have a younger brother — I have an older sister.', breakdown: ['没有 = negates 有', '两个 different kin words', 'no 是 anywhere'] },
            { hanzi: '我 哥 哥 会 说 汉 语 。', pinyin: 'wǒ gēge huì shuō Hànyǔ .', en: 'My older brother can speak Chinese.', breakdown: ['会 = can (learned skill)', '说 汉语 = speak Chinese', 'verb stays bare after 会'] },
            { hanzi: '你 爸 爸 做 什 么 工 作 ？', pinyin: 'nǐ bàba zuò shénme gōngzuò ?', en: 'What does your dad do (for work)?', breakdown: ['做 = do', '什么 in the object slot', '工作 = work/job'] },
            { hanzi: '爸 爸 和 妈 妈 都 在 家 。', pinyin: 'bàba hé māma dōu zài jiā .', en: 'Dad and mom are BOTH home.', breakdown: ['和 joins the two nouns', '都 = both, before 在', '在 家 = at home'] },
        ],
        commonMistakes: [
            'Translating "brother/sister" directly: Chinese has NO generic sibling — pick 哥哥 (older) or 弟弟 (younger), 姐姐 or 妹妹. Saying 我的弟弟 for an older brother is a meaning error, not a grammar one.',
            'Dropping 的 with pronouns\u2019 family: 我的妈妈 and 我妈妈 are BOTH heard, but the exam wants the full 我的 in writing; with close family the 的 may drop in speech (我妈妈) — know both, write the full form.',
            'Using 是 for "there is": 我家是五口人 — WRONG. Existence/possession is 有: 我家有五口人.',
            '和 joining clauses: 我在家和他在学校 — WRONG. 和 joins NOUNS only; link clauses by just putting them next to each other or with 也/都.',
        ],
    },

    patterns: [
        { type: 'Claim a relative', hanzi: '这 是 我 的 … 。', pinyin: 'zhè shì wǒ de … .', en: 'This is my…' },
        { type: 'Count the household', hanzi: '我 家 有 … 口 人 。', pinyin: 'wǒ jiā yǒu … kǒu rén .', en: 'My family has … people.' },
        { type: 'Ask the profession', hanzi: '你 爸 爸 做 什 么 工 作 ？', pinyin: 'nǐ bàba zuò shénme gōngzuò ?', en: 'What does your dad do?' },
        { type: 'Describe a person', hanzi: '我 妈 妈 很 忙 。', pinyin: 'wǒ māma hěn máng .', en: 'My mom is very busy.' },
        { type: 'Skill of a person', hanzi: '我 哥 哥 会 游 泳 。', pinyin: 'wǒ gēge huì yóuyǒng .', en: 'My older brother can swim.' },
        { type: 'Both / all', hanzi: '爸 爸 和 妈 妈 都 …', pinyin: 'bàba hé māma dōu …', en: 'Dad and mom both…' },
    ],

    sentenceBuilding: [
        { hanzi: '这 是 我 妈 妈 。', pinyin: 'zhè shì wǒ māma .', en: 'This is my mom.' },
        { hanzi: '这 是 我 的 妈 妈 ， 她 是 大 夫 。', pinyin: 'zhè shì wǒ de māma , tā shì dàifu .', en: 'This is my mom; she is a doctor.' },
        { hanzi: '这 是 我 的 妈 妈 ， 她 是 大 夫 ， 她 很 忙 。', pinyin: '… tā hěn máng .', en: '… she is a doctor; she is very busy.' },
        { hanzi: '这 是 我 的 妈 妈 。 她 是 大 夫 ， 很 忙 ， 但 是 她 每 天 都 在 家 吃 饭 。', pinyin: '… dànshì tā měitiān dōu zài jiā chī fàn .', en: '… but she eats at home every day.' },
        { hanzi: '我 家 有 五 口 人 ： 爸 爸 、 妈 妈 、 哥 哥 、 妹 妹 和 我 。', pinyin: 'wǒ jiā yǒu wǔ kǒu rén : bàba 、 māma 、 gēge 、 mèimei hé wǒ .', en: 'My family has five people: dad, mom, older brother, younger sister and me.' },
    ],

    practice: [
        { instruction: 'Pick the kin word:', question: 'My mother\u2019s son, older than me:', answer: '哥哥 — older brother (弟弟 would be younger)' },
        { instruction: 'Glue the possession:', question: '我 ___ 书 (my book)', answer: '的 — owner + 的 + thing' },
        { instruction: '有 or 是:', question: '我 家 ___ 四 口 人 。', answer: '有 — existence/possession' },
        { instruction: 'Negate it:', question: '我 家 ___ 弟 弟 。', answer: '没(有) — 没 negates 有' },
        { instruction: 'Join the nouns:', question: '爸 爸 ___ 妈 妈', answer: '和 — noun + 和 + noun only' },
        { instruction: 'The both-word:', question: '爸 爸 和 妈 妈 ___ 在 家 。', answer: '都 — both, BEFORE the verb' },
    ],

    translationPractice: [
        { en: 'This is my older sister.', hanzi: '这 是 我 姐 姐 。', pinyin: 'zhè shì wǒ jiějie .' },
        { en: 'My family has six people.', hanzi: '我 家 有 六 口 人 。', pinyin: 'wǒ jiā yǒu liù kǒu rén .' },
        { en: 'My dad is a doctor; my mom is a teacher.', hanzi: '我 爸 爸 是 大 夫 ， 我 妈 妈 是 老 师 。', pinyin: 'wǒ bàba shì dàifu , wǒ māma shì lǎoshī .' },
        { en: 'I don\u2019t have a younger brother.', hanzi: '我 没 有 弟 弟 。', pinyin: 'wǒ méiyǒu dìdi .' },
        { en: 'My older brother can swim.', hanzi: '我 哥 哥 会 游 泳 。', pinyin: 'wǒ gēge huì yóuyǒng .' },
        { en: 'What does your mom do?', hanzi: '你 妈 妈 做 什 么 工 作 ？', pinyin: 'nǐ māma zuò shénme gōngzuò ?' },
    ],

    reverseTranslation: [
        { hanzi: '我 家 有 四 口 人 ： 爸 爸 、 妈 妈 和 我 。', pinyin: 'wǒ jiā yǒu sì kǒu rén : bàba , māma hé wǒ .', en: 'My family has four people: dad, mom and me.' },
        { hanzi: '他 的 女 儿 会 说 汉 语 。', pinyin: 'tā de nǚ\u2019ér huì shuō Hànyǔ .', en: 'His daughter can speak Chinese.' },
        { hanzi: '我 哥 哥 和 我 弟 弟 都 是 学 生 。', pinyin: 'wǒ gēge hé wǒ dìdi dōu shì xuésheng .', en: 'My older brother and my younger brother are both students.' },
        { hanzi: '你 妈 妈 很 忙 吗 ？', pinyin: 'nǐ māma hěn máng ma ?', en: 'Is your mom very busy?' },
    ],

    register: {
        casual: '我 爸 / 我 妈 — spoken shortcuts for dad/mom with friends.',
        polite: '我 爸 爸 、 我 妈 妈 — the full doubles: standard and always safe.',
        formal: '父 亲 、 母 亲 — the written/formal parents (recognize in reading; never say to a friend\u2019s face).',
    },

    culture: 'Chinese kinship terms are a map of the society: every relative has an EXACT title — 哥哥/弟弟/姐姐/妹妹 encode relative age, and the extended family doubles down (舅舅 vs 叔叔 for maternal vs paternal uncles). Age order matters socially: the older brother 哥哥 carries responsibility, and addressing someone as 哥/姐 (even strangers — 服务员小姐姐!) signals friendly respect. The one-child generation (80s–2015) made 独生子女 (only child) the default answer to 你家有几个人？, and the modern exam answers now include 二孩 families. And the household measure 口 — counting mouths — survives from granary-era bookkeeping.',

    freeProduction: 'Draw your family tree, then record a tour (7–9 lines): 我家有…口人, name each member with 这是我…, give one profession (是大夫/是老师) and one 很-adjective per person, add one 会-skill, and finish with 都 (我们都很高兴). Then ask a partner 你家有几个人？ and 你爸爸做什么工作？ — and paraphrase their answer back.',

    miniTest: [
        { question: 'My mother\u2019s older son (older than me) is my:', options: ['弟弟', '哥哥', '妹妹', '姐姐'], answer: '哥哥 — older brother' },
        { question: 'The possession glue is:', options: ['很', '和', '的', '有'], answer: '的 — owner + 的 + thing' },
        { question: '我家有四口人 uses 口 because:', options: ['口 means house', 'family members are counted by mouths', '口 = door', 'it is polite'], answer: 'family members are counted by mouths' },
        { question: 'Negate 有:', options: ['不有', '没(有)', '不是', '别'], answer: '没(有) — 不 never negates 有' },
        { question: '爸爸和妈妈都在家 — 都 means:', options: ['also', 'both/all (before the verb)', 'and', 'at'], answer: 'both/all (before the verb)' },
    ],

    review: [
        'The numbers lecture gave us 两 + measure — it returns here: 两 个 弟 弟 (two younger brothers).',
        'Next: food & eating — 吃/喝, 要/想 for ordering, and 在 + place + verb (我在家吃饭).',
    ],

    traps: [
        'No generic siblings: 哥哥 ≠ 弟弟, 姐姐 ≠ 妹妹 — relative age is INSIDE the word. The exam\u2019s family tree questions live on this.',
        '的 order: OWNER first — 我的妈妈, never 妈妈的我. With pronouns keep 的 in writing (我的); speech may drop it (我妈妈).',
        '有 for possession/existence, 是 for identity, 很 for qualities — 我家有三口人 (有), 我是学生 (是), 我妈妈很忙 (很).',
        '和 joins NOUNS ONLY (爸爸和妈妈). Two clauses stand side by side with no "and": 我在家，他在学校.',
    ],

    homework: {
        intro: '的-possession, the 口 count, kinship precision, and the 很 description — your family album in Chinese.',
        translation: [
            { prompt: 'This is my mom.', answer: '这 是 我 妈 妈 。', alt: ['这是我妈妈。'], explanation: '这 是 + person. The 的 may drop with close family in speech; the written exam accepts both but prefers 这是我妈妈.' },
            { prompt: 'My family has five people.', answer: '我 家 有 五 口 人 。', alt: ['我家有五口人。'], explanation: '有 + number + 口 + 人 — the fixed household frame.' },
            { prompt: 'My dad is a doctor.', answer: '我 爸 爸 是 大 夫 。', alt: ['我爸爸是医生。'], explanation: 'Identity = 是. 大夫 and 医生 are both doctor — recognize both, say either.' },
            { prompt: 'I don\u2019t have an older brother.', answer: '我 没 有 哥 哥 。', alt: ['我没有哥哥。'], explanation: '没有 negates possession. 不有 does not exist.' },
            { prompt: 'My older sister can speak Chinese.', answer: '我 姐 姐 会 说 汉 语 。', alt: ['我姐姐会说汉语。'], explanation: '会 + bare verb for learned skills; the second verb never conjugates.' },
            { prompt: 'What does your dad do for work?', answer: '你 爸 爸 做 什 么 工 作 ？', alt: ['你爸爸做什么工作？'], explanation: '做 + 什么 + 工作 — the question word sits where the answer will sit.' },
        ],
        blanks: [
            { prompt: '这 是 我 ___ 妈 妈 。 (possession glue)', answer: '的', explanation: '的 glues owner to owned: 我的妈妈.' },
            { prompt: '我 家 有 五 ___ 人 。', answer: '口', explanation: '口 = family-members measure.' },
            { prompt: '她 是 我 妈 妈 的 女 ___ 。 (daughter)', answer: '儿', explanation: '女儿 — with the hidden-ü + apostrophe: nǚ\u2019ér.' },
            { prompt: '我 哥 哥 ___ 游 泳 。 (can swim)', answer: '会', explanation: '会 = learned ability: 会游泳.' },
            { prompt: '爸 爸 和 妈 妈 ___ 在 家 。 (both)', answer: '都', explanation: '都 = both/all, placed before the verb.' },
            { prompt: '我 弟 弟 十 ___ 。 (ten years old)', answer: '岁', explanation: '岁 = the age measure: 十岁.' },
        ],
        corrections: [
            { prompt: '我 有 二 个 哥 哥 。', answer: '我 有 两 个 哥 哥 。', explanation: 'How the mistake happens: 二 = two. Why it does not work: measure words take 两. How to fix it: 两个哥哥 — and note 哥哥 = OLDER brother specifically.' },
            { prompt: '我 家 是 五 口 人 。', answer: '我 家 有 五 口 人 。', explanation: 'How the mistake happens: English "my family IS five people". Why it does not work: counting/existence takes 有. How to fix it: 我家有五口人.' },
            { prompt: '我 弟 弟 会 说 汉 语 吗 。', answer: '我 弟 弟 会 说 汉 语 吗 ？', explanation: 'How the mistake happens: forgetting the question mark, or dropping 吗. Why it does not work: a written 吗-question must end with ？. How to fix it: keep 吗 + ？ together.' },
            { prompt: '我 和 你 妈 妈 都 是 老 师 和 你 爸 爸 都 是 大 夫 。', answer: '我 和 你 妈 妈 都 是 老 师 ， 你 爸 爸 都 是 大 夫 。 → better: 你 爸 爸 是 大 夫 。', explanation: 'How the mistake happens: 和 chaining clauses. Why it does not work: 和 joins nouns only. How to fix it: two sentences, or a comma — no 和 between clauses.' },
            { prompt: '这 是 我 妈 妈 的 。 (introducing "this is my mom")', answer: '这 是 我 妈 妈 。', explanation: 'How the mistake happens: adding 的 after every 我. Why it does not work: 的 needs an owned NOUN after it (我的书); a bare 我的 ends the sentence meaning "mine". How to fix it: 这是我妈妈.' },
        ],
        writing: {
            task: 'Write your family album (7–9 short sentences): 我家有…口人, introduce each member (这是我…), one profession each for two people, one 很-adjective each for two people, one 会-skill, and close with 我们都很…。',
            requirements: [
                '有…口人 frame once',
                'Four different kin words used correctly (age order matters!)',
                'Two 的 possessions',
                'One 会 + verb skill',
                'One 都 sentence and no 和 between clauses',
            ],
            minWords: 45,
        },
        checklist: [
            'I choose 哥哥/弟弟/姐姐/妹妹 by relative age, not translation habit',
            'I build possession with owner + 的 + thing (我的书)',
            'I count the household with 有…口人 and negate it with 没(有)',
            'I describe people with 很 + adjective (never 是 + adjective)',
            'I use 会 + bare verb for skills (会游泳, 会说汉语)',
            'I join nouns with 和 and clauses with nothing (or 也/都)',
        ],
    },
    checklistRemedial: [
        {
            explanation: 'The kin grid: older generation 爸爸/妈妈; your generation splits by GENDER and AGE — 哥哥 (older male), 弟弟 (younger male), 姐姐 (older female), 妹妹 (younger female). Children: 儿子/女儿.',
            examples: [
                { hanzi: '哥 哥 · 弟 弟 · 姐 姐 · 妹 妹', pinyin: 'gēge · dìdi · jiějie · mèimei', en: 'older brother · younger brother · older sister · younger sister' },
            ],
        },
        {
            explanation: '的 = the possession glue, owner FIRST: 我的书, 妈妈的手机, 老师的书. With close family speech drops it (我妈), writing keeps it.',
            examples: [
                { hanzi: '我 的 书 · 你 的 手 机 · 老 师 的 书', pinyin: 'wǒ de shū · nǐ de shǒujī · lǎoshī de shū', en: 'my book · your phone · the teacher\u2019s book' },
            ],
        },
        {
            explanation: '有 does possession AND existence: 我有一个妹妹 (I have…) · 桌上有一本书 (there is…). Negation: 没有. Never 是.',
            examples: [
                { hanzi: '我 有 一 个 问 题 。 · 桌 上 有 一 本 书 。', pinyin: 'wǒ yǒu yí ge wèntí · zhuō shàng yǒu yì běn shū', en: 'I have a question · There\u2019s a book on the desk' },
            ],
        },
        {
            explanation: '口 counts family members: 我家有四口人. Ask back: 你家有几个人？ (个 also works in the question) — answer with 口.',
            examples: [
                { hanzi: '你 家 有 几 口 人 ？ —— 四 口 。', pinyin: 'nǐ jiā yǒu jǐ kǒu rén ? — sì kǒu .', en: 'How many people in your family? — Four.' },
            ],
        },
        {
            explanation: 'Describing people: 很 + adjective (我姐姐很忙); skills: 会 + verb (他会游泳); profession: 是 + job (他是大夫). One person, three frames.',
            examples: [
                { hanzi: '她 很 忙 。 她 会 游 泳 。 她 是 大 夫 。', pinyin: 'tā hěn máng · tā huì yóuyǒng · tā shì dàifu', en: 'She\u2019s busy · she can swim · she\u2019s a doctor' },
            ],
        },
        {
            explanation: '和 = noun-and only. 爸爸和妈妈 ✓ · 我在家和他在学校 ✗. For 都: place it BEFORE the verb — 我们都是学生.',
            examples: [
                { hanzi: '爸 爸 和 妈 妈 都 在 家 。', pinyin: 'bàba hé māma dōu zài jiā .', en: 'Dad and mom are both home.' },
            ],
        },
    ],

    glossary: {
        ...BASE_GLOSSARY,
        '家': { en: 'home / family', pron: 'jiā', tone: '1', measure: '个', note: '回家 = go home; 大家 = everyone.' },
        '爸爸': { en: 'dad', pron: 'bàba', tone: '4-neutral', note: 'Neutral second syllable; formal: 父亲.' },
        '妈妈': { en: 'mom', pron: 'māma', tone: '1-neutral', note: 'Neutral second syllable; formal: 母亲.' },
        '哥哥': { en: 'older brother', pron: 'gēge', tone: '1-neutral', note: 'OLDER than the speaker — 弟弟 is younger.' },
        '姐姐': { en: 'older sister', pron: 'jiějie', tone: '3-neutral', note: '姐 carries the 女 radical.' },
        '弟弟': { en: 'younger brother', pron: 'dìdi', tone: '4-neutral', note: 'YOUNGER than the speaker.' },
        '妹妹': { en: 'younger sister', pron: 'mèimei', tone: '4-neutral', note: 'YOUNGER sister.' },
        '儿子': { en: 'son', pron: 'érzi', tone: '2-neutral', note: '儿 alone is a suffix too (花儿 = flower, Beijing-flavor).' },
        '女儿': { en: 'daughter', pron: 'nǚ\u2019ér', tone: '3-2', note: 'Hidden ü + apostrophe showcase.' },
        '大夫': { en: 'doctor', pron: 'dàifu', tone: '4-neutral', note: 'Same as 医生 — recognize both.' },
        '同学': { en: 'classmate', pron: 'tóngxué', tone: '2-2', note: '同学 = same-study; 同事 (HSK 2) = same-work = colleague.' },
        '可爱': { en: 'cute', pron: 'kě\u2019ài', tone: '3-4', note: 'Another apostrophe word: kě + ài.' },
        '漂亮': { en: 'pretty', pron: 'piàoliang', tone: '4-neutral', note: 'The default compliment for appearance.' },
        '游泳': { en: 'to swim', pron: 'yóuyǒng', tone: '2-3', note: '会游泳 = can swim — the classic 会 example.' },
        '生日': { en: 'birthday', pron: 'shēngrì', tone: '1-4', note: 'Lit. birth-day: 我的生日 is 五月一号.' },
    },
};

export const CHINESE_A1_PART1: Record<string, StaticChineseLesson> = {
    '1:pinyin-start': h1Pinyin,
    '1:numbers': h1Numbers,
    '1:family': h1Family,
};

export const CHINESE_A1_PART1_EXTRAS: Record<string, { warmup?: WarmupItem[]; verbTables?: VerbTableBlock[]; useCases?: UseCaseBlock[]; shadowing?: ShadowingBlock }> = {
    '1:pinyin-start': {
        warmup: [
            { q: 'The four tones as four m-words?', a: '妈 mā (mom, 1) · 麻 má (hemp, 2) · 马 mǎ (horse, 3) · 骂 mà (scold, 4).' },
            { q: '你 好 — what happens to the first tone when you SAY it?', a: '3-3 sandhi: nǐ → ní. Written 3-3, spoken 2-3.' },
            { q: '不 是 — which tone does 不 take?', a: 'bú — 不 flips to 2nd before a 4th tone.' },
            { q: '去 — what vowel is really there after q?', a: 'ü (rounded lips) — the dots vanish after j/q/x: qù = qü.' },
            { q: 'Name three neutral-tone syllables.', a: '吗 ma · 呢 ne · 了 le — and second doubles (谢谢 xièxie).' },
        ],
        verbTables: [
            {
                title: 'The four tones + neutral — the sound ladder',
                note: 'One syllable, five musics. Drill as gestures: plateau · rise · ditch · stomp · whisper.',
                rows: [
                    { label: '1st', form: '妈 mā', pron: 'high flat' },
                    { label: '2nd', form: '麻 má', pron: 'rising' },
                    { label: '3rd', form: '马 mǎ', pron: 'dip (half-dip in flow)' },
                    { label: '4th', form: '骂 mà', pron: 'sharp fall' },
                    { label: 'neutral', form: '吗 ma', pron: 'light, short, no mark' },
                ],
            },
            {
                title: 'The sandhi pair — 不 & 一',
                rows: [
                    { label: '不 + 4th', form: '不 是 → bú shì', pron: '2nd' },
                    { label: '不 + others', form: '不 去 → bú qù (qù is 4th too!) · 不 忙 → bù máng', pron: 'bú / bù' },
                    { label: '一 + 4th', form: '一 个 → yí ge', pron: '2nd' },
                    { label: '一 + 1/2/3', form: '一 天 → yì tiān', pron: '4th' },
                    { label: '一 at end', form: '十 一 → shíyī', pron: 'plain 1st' },
                ],
            },
        ],
        useCases: [
            {
                word: 'the neutral tone — where it lives',
                uses: [
                    { use: 'particles', examples: [{ fr: '吗 ma · 呢 ne · 了 le', en: 'the three question/aspect particles' }] },
                    { use: 'second doubles', examples: [{ fr: '谢 谢 · 爸 爸 · 妈 妈', en: 'xièxie · bàba · māma — second syllable light' }] },
                    { use: 'fixed words', examples: [{ fr: '多 少 (duōshao) · 漂 亮 (piàoliang)', en: 'the tail goes light in set words' }] },
                ],
            },
            {
                word: 'yi / wu / yu — the spelling chameleons',
                uses: [
                    { use: 'standalone i → yi', examples: [{ fr: '也 yě · 一 yī · 医 yī', en: 'also · one · medicine' }] },
                    { use: 'standalone u → wu', examples: [{ fr: '我 wǒ (o!) · 五 wǔ · 屋 wū', en: 'I · five · room' }] },
                    { use: 'standalone ü → yu', examples: [{ fr: '鱼 yú · 月 yuè · 元 yuán', en: 'fish · month · yuan' }] },
                    { use: 'j/q/x hide the dots', examples: [{ fr: '去 qù · 句 jù · 女 nǚ (dots stay after n/l)', en: 'go · sentence · woman' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Tone gym: read each line slowly, tapping one beat per character, then fast with sandhi. Exaggerate the tones — normal speed will shrink them naturally.',
            lines: [
                { fr: '妈 妈 骂 马 。', pron: 'māma mà mǎ .', en: 'Mom scolds the horse.' },
                { fr: '你 好 ！ 请 问 ， 你 叫 什 么 ？', pron: 'ní hǎo ! qǐngwèn , nǐ jiào shénme ?', en: 'Hello! May I ask — what\u2019s your name?' },
                { fr: '我 不 是 老 师 ， 我 是 学 生 。', pron: 'wǒ bú shì lǎoshī , wǒ shì xuésheng .', en: 'I\u2019m not a teacher; I\u2019m a student.' },
                { fr: '我 学 汉 语 。 你 呢 ？', pron: 'wǒ xué Hànyǔ . nǐ ne ?', en: 'I study Chinese. And you?' },
                { fr: '请 问 ， 现 在 几 点 ？', pron: 'qǐngwèn , xiànzài jǐ diǎn ?', en: 'Excuse me, what time is it?' },
                { fr: '老 师 ， 再 见 ！ 明 天 见 ！', pron: 'lǎoshī , zàijiàn ! míngtiān jiàn !', en: 'Goodbye, teacher! See you tomorrow!' },
            ],
        },
    },
    '1:numbers': {
        warmup: [
            { q: 'The three-be rule: two 3rd tones in a row?', a: 'First becomes 2nd: nǐ hǎo → ní hǎo.' },
            { q: '不 before a 4th tone?', a: 'bú — 不 是 bú shì, 不 去 bú qù.' },
            { q: '一 before 个?', a: 'yí — 一 个 yí ge (一 rises before 4th).' },
            { q: 'Which syllables go neutral?', a: 'Particles 吗/呢/了 and second doubles: 谢谢, 妈妈, 爸爸.' },
            { q: 'j/q/x + u is really which vowel?', a: 'ü — 去 qù = qü, rounded lips.' },
        ],
        verbTables: [
            {
                title: 'Numbers 1–10 as arithmetic',
                note: 'No teens, no inflection: 十一 = ten-one, 三十 = thirty. 二十一 = two-ten-one.',
                rows: [
                    { label: '1–5', form: '一 二 三 四 五', pron: 'yī èr sān sì wǔ' },
                    { label: '6–10', form: '六 七 八 九 十', pron: 'liù qī bā jiǔ shí' },
                    { label: '11–19', form: '十 + digit (十二…十九)', pron: 'shí\u2019èr … shíjiǔ' },
                    { label: '21', form: '二 十 一', pron: 'èrshíyī' },
                    { label: '100', form: '一 百', pron: 'yìbǎi' },
                    { label: '101', form: '一 百 零 一', pron: 'yìbǎi líng yī — 零 compulsory!' },
                ],
            },
            {
                title: 'The clock & calendar frames',
                rows: [
                    { label: 'ask time', form: '现 在 几 点 ？', pron: 'xiànzài jǐ diǎn ?' },
                    { label: 'tell time', form: '三 点 二 十 (分) · 三 点 半', pron: 'sān diǎn èrshí fēn · sān diǎnbàn' },
                    { label: 'ask day', form: '今 天 星 期 几 ？', pron: 'jīntiān xīngqī jǐ ?' },
                    { label: 'ask date', form: '今 天 几 月 几 号 ？', pron: 'jīntiān jǐ yuè jǐ hào ?' },
                    { label: 'age', form: '我 二 十 岁 。 你 多 大 ？', pron: 'wǒ èrshí suì . nǐ duō dà ?' },
                    { label: 'price', form: '多 少 钱 ？', pron: 'duōshao qián ?' },
                ],
            },
        ],
        useCases: [
            {
                word: '两 vs 二 vs 两点钟',
                uses: [
                    { use: '二 — counting, compounds', examples: [{ fr: '一 、 二 、 三 · 十 二 · 二 十 二', en: '1,2,3 · 12 · 22' }] },
                    { use: '两 + measure word', examples: [{ fr: '两 个 人 · 两 点 · 两 岁', en: 'two people · 2 o\u2019clock · two years old' }] },
                    { use: '两 even on the clock', examples: [{ fr: '现 在 两 点 半 。', en: 'It\u2019s 2:30 now.' }] },
                    { use: 'phone digits', examples: [{ fr: '一 三 九 二 二 二 二 …', en: 'phone numbers read digit by digit — 二 allowed' }] },
                ],
            },
            {
                word: '点 vs 小时 — the clock/duration split',
                uses: [
                    { use: '点 — the point on the clock', examples: [{ fr: '现 在 三 点 。', en: 'It\u2019s three now.' }] },
                    { use: '小时 — how LONG', examples: [{ fr: '我 睡 了 八 个 小 时 。', en: 'I slept eight hours.' }] },
                    { use: '分钟 — minutes of duration', examples: [{ fr: '十 分 钟 。', en: 'ten minutes (long).' }] },
                    { use: 'exam trap', examples: [{ fr: '三 点 ≠ 三 个 小 时', en: '3 o\u2019clock ≠ three hours' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Number rhythm: every syllable one beat — and the sì/shí trap must land correctly at speed.',
            lines: [
                { fr: '一 ， 二 ， 三 ， 四 ， 五 。', pron: 'yī èr sān sì wǔ .', en: '1, 2, 3, 4, 5.' },
                { fr: '现 在 几 点 ？ —— 三 点 二 十 分 。', pron: 'xiànzài jǐ diǎn ? — sān diǎn èrshí fēn .', en: 'What time is it? — 3:20.' },
                { fr: '今 天 星 期 几 ？ —— 星 期 四 。', pron: 'jīntiān xīngqī jǐ ? — xīngqīsì .', en: 'What day is it? — Thursday.' },
                { fr: '我 家 有 四 口 人 。', pron: 'wǒ jiā yǒu sì kǒu rén .', en: 'My family has four people.' },
                { fr: '我 二 十 一 岁 ， 我 哥 哥 二 十 五 岁 。', pron: 'wǒ èrshíyī suì , wǒ gēge èrshíwǔ suì .', en: 'I\u2019m 21; my older brother is 25.' },
                { fr: '一 百 零 一 块 钱 。', pron: 'yìbǎi líng yī kuài qián .', en: '101 yuan.' },
            ],
        },
    },
    '1:family': {
        warmup: [
            { q: 'Two people = 两 or 二 before 个?', a: '两 — 两 个 人. 二 only counts and compounds (十二, 二十二).' },
            { q: '101 in Chinese?', a: '一 百 零 一 — mid-number zero compulsory.' },
            { q: 'Clock time or duration: 三点 vs 三个小时?', a: '点 = the point on the clock; 小时 = how long.' },
            { q: '星期天 is which day?', a: 'Sunday — the week has no 星期七.' },
            { q: '你多大 asks…?', a: 'Your age — answer with 岁: 我二十岁.' },
        ],
        verbTables: [
            {
                title: 'The kin grid — gender × age',
                note: 'There is no generic "sibling": pick by BOTH gender and relative age.',
                rows: [
                    { label: 'older male', form: '哥 哥', pron: 'gēge' },
                    { label: 'younger male', form: '弟 弟', pron: 'dìdi' },
                    { label: 'older female', form: '姐 姐', pron: 'jiějie' },
                    { label: 'younger female', form: '妹 妹', pron: 'mèimei' },
                    { label: 'parents', form: '爸 爸 · 妈 妈', pron: 'bàba · māma' },
                    { label: 'children', form: '儿 子 · 女 儿', pron: 'érzi · nǚ\u2019ér' },
                ],
            },
            {
                title: '的 — the possession machine',
                rows: [
                    { label: 'my', form: '我 的 书', pron: 'wǒ de shū' },
                    { label: 'your', form: '你 的 手 机', pron: 'nǐ de shǒujī' },
                    { label: 'his/her', form: '他 的 女 儿', pron: 'tā de nǚ\u2019ér' },
                    { label: 'teacher\u2019s', form: '老 师 的 书', pron: 'lǎoshī de shū' },
                    { label: 'speech shortcut', form: '我 妈 / 我 爸', pron: 'wǒ mā / wǒ bà' },
                ],
            },
        ],
        useCases: [
            {
                word: '有 — possession, existence, and the household count',
                uses: [
                    { use: 'I have…', examples: [{ fr: '我 有 一 个 妹 妹 。', en: 'I have a younger sister.' }] },
                    { use: 'there is…', examples: [{ fr: '桌 上 有 一 本 书 。', en: 'There\u2019s a book on the desk.' }] },
                    { use: 'household count (口!)', examples: [{ fr: '我 家 有 四 口 人 。', en: 'My family has four people.' }] },
                    { use: 'negated only by 没', examples: [{ fr: '我 没 有 弟 弟 。', en: 'I don\u2019t have a younger brother.' }] },
                ],
            },
            {
                word: '很 vs 会 vs 是 — describing a person three ways',
                uses: [
                    { use: 'quality — 很 + adj', examples: [{ fr: '我 妈 妈 很 忙 。', en: 'My mom is very busy.' }] },
                    { use: 'skill — 会 + verb', examples: [{ fr: '我 哥 哥 会 游 泳 。', en: 'My older brother can swim.' }] },
                    { use: 'identity — 是 + noun', examples: [{ fr: '我 爸 爸 是 大 夫 。', en: 'My dad is a doctor.' }] },
                    { use: 'all three in one breath', examples: [{ fr: '她 是 大 夫 ， 很 忙 ， 会 说 汉 语 。', en: 'She\u2019s a doctor, very busy, and speaks Chinese.' }] },
                ],
            },
        ],
        shadowing: {
            intro: 'Family doubles go neutral on the second syllable — light and quick: bàba, māma, gēge. Read each line twice.',
            lines: [
                { fr: '这 是 我 爸 爸 ， 这 是 我 妈 妈 。', pron: 'zhè shì wǒ bàba , zhè shì wǒ māma .', en: 'This is my dad; this is my mom.' },
                { fr: '我 家 有 五 口 人 。', pron: 'wǒ jiā yǒu wǔ kǒu rén .', en: 'My family has five people.' },
                { fr: '我 哥 哥 会 说 汉 语 。', pron: 'wǒ gēge huì shuō Hànyǔ .', en: 'My older brother can speak Chinese.' },
                { fr: '我 妹 妹 很 可 爱 。', pron: 'wǒ mèimei hěn kě\u2019ài .', en: 'My younger sister is very cute.' },
                { fr: '你 爸 爸 做 什 么 工 作 ？', pron: 'nǐ bàba zuò shénme gōngzuò ?', en: 'What does your dad do?' },
                { fr: '爸 爸 和 妈 妈 都 在 家 。', pron: 'bàba hé māma dōu zài jiā .', en: 'Dad and mom are both home.' },
            ],
        },
    },
};
