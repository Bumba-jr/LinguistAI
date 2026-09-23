// Japanese Foundations — the static course (JLPT N5→N1 oriented).
// Sources: the A0→C2 master syllabus + JLPT published structure (Sep 2026).
export const JAPANESE_WRITING_FACTS = {
    intro: 'Japanese uses THREE writing systems mixed together. Hiragana (ひらがな) carries grammar and particles, Katakana (カタカナ) carries loanwords and emphasis, and Kanji (漢字) carry meaning — often several readings each. The pronunciation system is Rōmaji, but only as scaffolding: the goal is 私は日本語を勉強します。 read directly, not Watashi wa nihongo o benkyou shimasu forever.',
    example: { fr: '私は学生です。', say: 'わたしはがくせいです', en: 'Watashi wa gakusei desu — I am a student: kanji 私 + hiragana particles/ending + polite copula' },
    parallel: 'Rōmaji is NOT Japanese\'s Pinyin — Japanese\'s native "pronunciation scaffolding" is furigana: small kana printed above Kanji. Rōmaji is only the learner\'s bridge; furigana is how Japan itself supports readers.',
    examNote: 'JLPT notes: the JLPT has NO speaking or writing sections — only Language Knowledge (Vocabulary/Grammar), Reading and Listening. Pass requires the overall minimum AND at least 19/60 in every scored section.',
};

// The full hiragana gojūon + katakana equivalents — learn both at once.
export const KANA_ROWS: { row: string; cells: { hira: string; kata: string; romaji: string }[] }[] = [
    { row: '—', cells: [
        { hira: 'あ', kata: 'ア', romaji: 'a' }, { hira: 'い', kata: 'イ', romaji: 'i' },
        { hira: 'う', kata: 'ウ', romaji: 'u' }, { hira: 'え', kata: 'エ', romaji: 'e' },
        { hira: 'お', kata: 'オ', romaji: 'o' },
    ] },
    { row: 'K', cells: [
        { hira: 'か', kata: 'カ', romaji: 'ka' }, { hira: 'き', kata: 'キ', romaji: 'ki' },
        { hira: 'く', kata: 'ク', romaji: 'ku' }, { hira: 'け', kata: 'ケ', romaji: 'ke' },
        { hira: 'こ', kata: 'コ', romaji: 'ko' },
    ] },
    { row: 'S', cells: [
        { hira: 'さ', kata: 'サ', romaji: 'sa' }, { hira: 'し', kata: 'シ', romaji: 'shi' },
        { hira: 'す', kata: 'ス', romaji: 'su' }, { hira: 'せ', kata: 'セ', romaji: 'se' },
        { hira: 'そ', kata: 'ソ', romaji: 'so' },
    ] },
    { row: 'T', cells: [
        { hira: 'た', kata: 'タ', romaji: 'ta' }, { hira: 'ち', kata: 'チ', romaji: 'chi' },
        { hira: 'つ', kata: 'ツ', romaji: 'tsu' }, { hira: 'て', kata: 'テ', romaji: 'te' },
        { hira: 'と', kata: 'ト', romaji: 'to' },
    ] },
    { row: 'N', cells: [
        { hira: 'な', kata: 'ナ', romaji: 'na' }, { hira: 'に', kata: 'ニ', romaji: 'ni' },
        { hira: 'ぬ', kata: 'ヌ', romaji: 'nu' }, { hira: 'ね', kata: 'ネ', romaji: 'ne' },
        { hira: 'の', kata: 'ノ', romaji: 'no' },
    ] },
    { row: 'H', cells: [
        { hira: 'は', kata: 'ハ', romaji: 'ha' }, { hira: 'ひ', kata: 'ヒ', romaji: 'hi' },
        { hira: 'ふ', kata: 'フ', romaji: 'fu' }, { hira: 'へ', kata: 'ヘ', romaji: 'he' },
        { hira: 'ほ', kata: 'ホ', romaji: 'ho' },
    ] },
    { row: 'M', cells: [
        { hira: 'ま', kata: 'マ', romaji: 'ma' }, { hira: 'み', kata: 'ミ', romaji: 'mi' },
        { hira: 'む', kata: 'ム', romaji: 'mu' }, { hira: 'め', kata: 'メ', romaji: 'me' },
        { hira: 'も', kata: 'モ', romaji: 'mo' },
    ] },
    { row: 'Y', cells: [
        { hira: 'や', kata: 'ヤ', romaji: 'ya' }, { hira: 'ゆ', kata: 'ユ', romaji: 'yu' },
        { hira: 'よ', kata: 'ヨ', romaji: 'yo' },
    ] },
    { row: 'R', cells: [
        { hira: 'ら', kata: 'ラ', romaji: 'ra' }, { hira: 'り', kata: 'リ', romaji: 'ri' },
        { hira: 'る', kata: 'ル', romaji: 'ru' }, { hira: 'れ', kata: 'レ', romaji: 're' },
        { hira: 'ろ', kata: 'ロ', romaji: 'ro' },
    ] },
    { row: 'W', cells: [
        { hira: 'わ', kata: 'ワ', romaji: 'wa' },
        { hira: 'を', kata: 'ヲ', romaji: 'o (particle)' },
    ] },
    { row: 'N', cells: [ { hira: 'ん', kata: 'ン', romaji: 'n' } ] },
];

// Dakuten / handakuten transformations.
export const DAKUTEN_RULES = [
    { rule: 'か行 + ゛ → voiced', examples: 'か→が (ka→ga), さ→ざ (sa→za), た→だ (ta→da)' },
    { rule: 'は行 + ゛ → b sound', examples: 'は→ば (ha→ba), ひ→び (hi→bi)' },
    { rule: 'は行 + ゜ → p sound (handakuten)', examples: 'は→ぱ (ha→pa), ほ→ぽ (ho→po)' },
    { rule: 'Katakana long vowel ー', examples: 'コーヒー (kōhī, coffee), ケーキ (kēki, cake) — a dash stretches the vowel' },
];

// Small つ (sokuon) — the doubled consonant.
export const SOKUON = {
    why: 'Small っ (and ッ) means a DOUBLED consonant — a full extra mora of silence before the next sound. きて (kite, come) vs きって (kitte, stamp); おばさん (obasan, aunt) vs おばあさん (obaasan, grandmother) — long vowels and doubled consonants change meaning, and the JLPT listening section loves these pairs.',
    pairs: [
        { short: 'きて (kite)', long: 'きって (kitte)', shortEn: 'come', longEn: 'stamp' },
        { short: 'おばさん (obasan)', long: 'おばあさん (obaasan)', shortEn: 'aunt', longEn: 'grandmother' },
        { short: 'ゆき (yuki)', long: 'ゆっくり (yukkuri)', shortEn: 'snow', longEn: 'slowly' },
    ],
};

// The five particles every sentence needs — then the rest.
export const PARTICLE_MASTER = [
    { p: 'は (wa)', role: 'TOPIC — "as for X"', example: '私は学生です。 (Watashi wa gakusei desu — I am a student)', note: 'written は, pronounced wa' },
    { p: 'が (ga)', role: 'SUBJECT — new information / emphasis / with いる・ある', example: '猫がいます。 (Neko ga imasu — There is a cat)' },
    { p: 'を (o)', role: 'DIRECT OBJECT', example: '水を飲みます。 (Mizu o nomimasu — I drink water)', note: 'written を, pronounced o' },
    { p: 'に (ni)', role: 'destination, time, existence location, recipient', example: '七時に起きます。 (Shichiji ni okimasu — I get up at seven)' },
    { p: 'で (de)', role: 'WHERE an action happens, means/instrument', example: '図書館で勉強します。 (Toshokan de benkyou shimasu — I study at the library)' },
    { p: 'の (no)', role: 'possession, modification', example: '私の本 (Watashi no hon — my book)' },
    { p: 'と (to)', role: 'and (exhaustive), with, quotation', example: '友達と話します。 (Tomodachi to hanashimasu — I talk with a friend)' },
    { p: 'も (mo)', role: 'also/too', example: '私も。 (Watashi mo — Me too.)' },
    { p: 'へ (e)', role: 'direction (written へ, pronounced e)', example: '日本へ行きます。 (Nihon e ikimasu — I go to Japan)' },
    { p: 'から / まで', role: 'from / until', example: '九時から五時まで (kuji kara goji made — from 9 to 5)' },
    { p: 'や', role: 'and (partial list), often …など', example: 'りんごやみかん (ringo ya mikan — apples and mandarins among other things)' },
    { p: 'だけ / しか', role: 'only — しか always takes the NEGATIVE', example: '水しか飲みません。 (Mizu shika nomimasen — I drink only water)' },
];

// Verb groups + the conjugation engine.
export const VERB_GROUPS = [
    { group: 'Group 1 — Godan (う-verbs)', examples: '飲む (nomu, drink), 書く (kaku, write), 話す (hanasu, speak) — the stem ending changes through the row' },
    { group: 'Group 2 — Ichidan (る-verbs)', examples: '食べる (taberu, eat), 見る (miru, see), 起きる (okiru, wake) — drop る and add endings' },
    { group: 'Group 3 — Irregular', examples: 'する (suru, do) and 来る (kuru, come) — learn every form of these two' },
];

export const VERB_FORMS = [
    { form: 'ます (polite non-past)', example: '食べます (tabemasu) — eat/will eat', say: 'たべます' },
    { form: 'ません (polite negative)', example: '食べません (tabemasen) — do not eat', say: 'たべません' },
    { form: 'ました (polite past)', example: '食べました (tabemashita) — ate', say: 'たべました' },
    { form: 'ない (plain negative)', example: '食べない (tabenai) — do not eat', say: 'たべない' },
    { form: 'た (plain past)', example: '食べた (tabeta) — ate', say: 'たべた' },
    { form: 'て (te-form)', example: '食べて (tabete) — the connecting form: requests, progressive, permission…', say: 'たべて' },
    { form: 'られる (potential/passive)', example: '食べられる (taberareru) — can eat / be eaten', say: 'たべられる' },
    { form: 'させる (causative)', example: '食べさせる (tabesaseru) — make/let someone eat', say: 'たべさせる' },
    { form: 'ば (conditional)', example: '食べれば (tabereba) — if one eats', say: 'たべれば' },
    { form: 'たら (if/when)', example: '食べたら (tabetara) — if/when one eats', say: 'たべたら' },
];

// Te-form uses — the master connector.
export const TE_FORM_USES = [
    { use: 'request', example: '食べてください。 (Tabete kudasai — Please eat.)', say: 'たべてください' },
    { use: 'progressive', example: '食べています。 (Tabete imasu — I am eating.)', say: 'たべています' },
    { use: 'permission', example: '食べてもいいです。 (Tabete mo ii desu — You may eat.)', say: 'たべてもいいです' },
    { use: 'prohibition', example: '食べてはいけません。 (Tabete wa ikemasen — You must not eat.)', say: 'たべてはいけません' },
    { use: 'sequential actions', example: '朝起きて、シャワーを浴びて、学校に行きます。 (I get up, shower, and go to school.)' },
];

// Adjectives — two systems.
export const ADJECTIVE_SYSTEM = [
    { type: 'い-adjectives', examples: '高い (takai, expensive), 大きい (ookii, big)', pattern: 'neg: 高くない; past: 高かった; adverb: 高く', say: 'たかい' },
    { type: 'な-adjectives', examples: '静か (shizuka, quiet), 有名 (yuumei, famous)', pattern: 'need な before nouns: 静かな町; neg: 静かじゃない; adverb: 静かに', say: 'しずかなまち' },
];

// Counters with irregulars.
export const COUNTER_SYSTEM = [
    { counter: '人 (people)', pattern: '一人 hitori, 二人 futari, 三人 sannin — the first two are IRREGULAR' },
    { counter: '本 (long objects)', pattern: '一本 ippon, 二本 nihon, 三本 sanbon — ぽ/ぼ/ぽ sound changes!' },
    { counter: '枚 (flat things)', pattern: '一枚 ichimai, 二枚 nimai — regular' },
    { counter: '冊 (books)', pattern: '一冊 issatsu, 三冊 sansatsu — small tsu appears' },
    { counter: '台 (machines)', pattern: '一台 ichidai, 二台 nidai' },
    { counter: '回 (times)', pattern: '一回 ikkai, 二回 nikai, 六回 rokkai' },
    { counter: '階 (floors)', pattern: '一階 ikkai, 二階 nikai — same sound as 回, different kanji' },
    { counter: '歳 (age)', pattern: '一歳 issai, 八歳 hassai, 二十歳 hatachi (special word!)' },
    { counter: '円 (yen)', pattern: '一円 en, 二円 ni en — NO counter sound after 円' },
    { counter: '時間/分/秒', pattern: '一時間 ichijikan, 十分 juppun (10 min!), 三十秒 sanjuubyou' },
];

// こそあど — the demonstrative grid.
export const DEMONSTRATIVE_GRID = [
    { series: 'thing', near: 'これ (kore, this)', listener: 'それ (sore, that)', far: 'あれ (are, that over there)', question: 'どれ (dore, which)' },
    { series: 'modifier', near: 'この + noun', listener: 'その + noun', far: 'あの + noun', question: 'どの + noun' },
    { series: 'place', near: 'ここ (koko)', listener: 'そこ (soko)', far: 'あそこ (asoko)', question: 'どこ (doko, where)' },
    { series: 'polite direction', near: 'こちら', listener: 'そちら', far: 'あちら', question: 'どちら' },
];

// keigo overview.
export const KEIGO_SYSTEM = [
    { type: '丁寧語 (teineigo)', use: 'polite language — the ます/です form', example: '食べます' },
    { type: '尊敬語 (sonkeigo)', use: 'RESPECT language — elevates the OTHER person', example: '召し上がる (meshiagaru — honorific "to eat"), いらっしゃる (to be/go/come)' },
    { type: '謙譲語 (kenjougo)', use: 'HUMBLE language — lowers yourself/your group', example: '伺う (ukagau — humble "to ask/visit"), 申し上げる (moushiageru — humble "to say")' },
];

// JLPT strategy card.
export const JLPT_STRATEGY: { skill: string; color: string; points: string[] }[] = [
    {
        skill: '言語知識 (Vocabulary/Grammar)', color: 'indigo',
        points: [
            'Kanji reading questions test ON vs KUN readings — learn words, not isolated characters',
            'Orthography questions (kana → kanji) reward writing practice',
            'Grammar selection: think about what the SECOND half of the sentence needs — the particle/form is decided by the ending',
            'Star every unfamiliar item on a first pass, return with remaining time',
        ],
    },
    {
        skill: '読解 (Reading)', color: 'teal',
        points: [
            'Read the QUESTION first, then the passage — JLPT reading is a scavenger hunt at N3+',
            'Information retrieval (tables, notices) is free time — do it fast and bank minutes',
            'For "what does the author think" questions, look at sentence-final expressions and よね/だろう register markers',
            'Long passages: the first and last sentences of each paragraph carry the argument',
        ],
    },
    {
        skill: '聴解 (Listening)', color: 'violet',
        points: [
            'Task-based questions show pictures/options — read them BEFORE the audio starts',
            'The conversation often revises the plan ("まず…それから…あ、やっぱり") — the FINAL decision is the answer',
            'Quick-response questions are pure reflex — train shadowing to make common replies automatic',
            'Fillers (えーと, あの…) usually signal a change of plan is coming',
        ],
    },
    {
        skill: 'General exam craft', color: 'amber',
        points: [
            'JLPT has NO speaking or writing — but train them anyway: real ability holds the exam skills together',
            'Every scored section has a 19/60 minimum — a brilliant reading score cannot rescue a failed listening',
            'Mock under real timing: the N2/N1 reading sections are a stamina test',
            'Score ~70% in practice consistently before booking the real exam',
        ],
    },
];

// The master cheat sheet.
export const JAPANESE_CHEAT_SHEET: { title: string; items: { label: string; detail: string; say?: string }[] }[] = [
    {
        title: 'Particles — the sentence glue', items: [
            { label: 'は vs が', detail: 'は = known topic (as for X…) / が = new info, emphasis, or with いる・ある — THE classic distinction', say: 'わたしはがくせいです' },
            { label: 'を', detail: 'direct object: 水を飲みます' },
            { label: 'に vs で', detail: 'に = destination/time/existence / で = action location/means: 学校に行く vs 学校で勉強する' },
            { label: 'の', detail: 'possession and clause-linking: 私の本; nominalizer after verbs: 勉強すること' },
            { label: 'と / や', detail: 'と = complete "and" / や = partial list (…など)' },
            { label: 'しか + negative', detail: '水しか飲みません = I drink only water — the verb MUST be negative' },
            { label: 'から / まで', detail: 'from / until (time and place): 九時から五時まで' },
            { label: 'も', detail: 'also: 私も = me too' },
        ],
    },
    {
        title: 'Word order — the verb goes LAST', items: [
            { label: 'SOV', detail: '私はご飯を食べます。= I + rice + eat — the verb closes the sentence', say: 'わたしはごはんをたべます' },
            { label: 'modifiers come first', detail: 'adjectives and relative clauses go BEFORE the noun: 昨日買った本 (the book I bought yesterday)' },
            { label: 'questions in place', detail: 'question words stay where the answer would go: 何を食べますか？' },
            { label: 'か = question marker', detail: 'no word order change: 行きますか？ — just add か' },
        ],
    },
    {
        title: 'です/だ and existence', items: [
            { label: 'です / でした', detail: 'polite copula: 学生です。/ 学生でした。' },
            { label: 'じゃない / じゃなかった', detail: 'plain negative copula: 学生じゃない。' },
            { label: 'ある vs いる', detail: 'ある = things exist / いる = people & animals exist: 本があります / 猫がいます', say: 'ねこがいます' },
            { label: 'でした vs だった', detail: 'past polite vs past plain — register consistency matters' },
        ],
    },
    {
        title: 'Adjectives — two families', items: [
            { label: 'い-adjectives conjugate', detail: '高い → 高くない → 高かった → 高くなかった' },
            { label: 'な-adjectives need な', detail: '静かな町 (a quiet town); as predicate: 町は静かです' },
            { label: 'adverb forms', detail: '高く (expensively) / 静かに (quietly) — different rules per family!' },
            { label: 'noun modification', detail: 'both go before nouns: 高い山 / 静かな町' },
        ],
    },
    {
        title: 'Verb forms — the engine', items: [
            { label: 'ます form', detail: 'polite non-past: 食べます (eat/will eat)' },
            { label: 'て form', detail: 'THE connector: requests, progressive, permission, linking', say: 'たべてください' },
            { label: 'た form', detail: 'past + used for たことがある (experience)' },
            { label: 'ない form', detail: 'negative + ないでください (please don\u2019t)' },
            { label: 'たい (want to)', detail: '日本語を勉強したいです — たい behaves like an い-adjective' },
            { label: 'ことができます', detail: 'ability: 日本語を話すことができます (can speak Japanese)' },
            { label: 'なければなりません', detail: 'obligation: must — 勉強しなければなりません' },
            { label: 'てもいい / てはいけない', detail: 'permission vs prohibition' },
        ],
    },
    {
        title: 'Question words', items: [
            { label: '何 (なに/なん)', detail: 'what — 何を食べますか' },
            { label: '誰 (だれ)', detail: 'who — 誰が来ますか' },
            { label: 'どこ / いつ', detail: 'where / when — どこへ行きますか' },
            { label: 'どうして / なぜ', detail: 'why — answer with から/ので' },
            { label: 'いくら / いくつ', detail: 'how much (money) / how many, how old' },
            { label: 'どう / どうやって', detail: 'how / how (by what means)' },
        ],
    },
    {
        title: 'Counters — sound changes matter', items: [
            { label: '人', detail: '一人 hitori, 二人 futari, 三人 sannin (irregulars!)' },
            { label: '本', detail: '一本 ippon, 三本 sanbon, 十本 juppon — ぽ/ぼ sound changes' },
            { label: '枚 / 冊 / 台', detail: 'flat things / books / machines: 一枚, 一冊 issatsu, 一台' },
            { label: '階 / 回', detail: 'both "kai": 一階 (1st floor) vs 一回 (once)' },
            { label: '歳 / 時 / 分', detail: '二十歳 hatachi (special!); 四時 yoji, 七時 shichiji, 九時 kuji (time irregulars); 十分 juppun' },
        ],
    },
    {
        title: 'こそあど — demonstratives', items: [
            { label: 'これ / それ / あれ / どれ', detail: 'this / that (near you) / that over there / which — standalone things' },
            { label: 'この / その / あの / どの', detail: 'same idea + a noun: この本 (this book)' },
            { label: 'ここ / そこ / あそこ / どこ', detail: 'places' },
            { label: 'こちら / どちら', detail: 'polite direction/people — どちら from = where (from), politely' },
        ],
    },
    {
        title: 'Connectors & clause building', items: [
            { label: 'そして / それから', detail: 'and then' },
            { label: 'でも / しかし / けど', detail: 'but (polite / formal / casual)' },
            { label: 'だから / なぜなら', detail: 'therefore / because (formal intro)' },
            { label: '〜から / 〜ので', detail: 'because — ので is softer/more formal' },
            { label: '〜のに', detail: 'although (with frustration nuance)' },
            { label: '〜たら / 〜ば / 〜と', detail: 'if/when — と = inevitable result, ば = general condition, たら = one-off' },
            { label: '〜ながら', detail: 'while doing: 音楽を聞きながら勉強します' },
        ],
    },
    {
        title: 'Keigo — the three politeness systems', items: [
            { label: '丁寧語', detail: 'polite ます/です — the default safe register' },
            { label: '尊敬語', detail: 'elevate the other: 召し上がる (eat), いらっしゃる (be/go/come)', say: 'めしあがる' },
            { label: '謙譲語', detail: 'humble yourself: 伺う (ask/visit), 申し上げる (say), いただく (receive/eat)' },
            { label: 'お〜になる', detail: 'productive honorific: お待ちになる (to wait, honorific)' },
            { label: 'お/ご〜します', detail: 'productive humble: お願いします, ご説明します' },
        ],
    },
    {
        title: 'Onomatopoeia — Giongo/Gitaigo', items: [
            { label: 'ドキドキ', detail: 'heart pounding (nervous/excited)', say: 'どきどき' },
            { label: 'ワクワク', detail: 'excited anticipation', say: 'わくわく' },
            { label: 'ザーザー', detail: 'heavy pouring rain' },
            { label: 'ぺこぺこ', detail: 'starving (very hungry)' },
            { label: 'きらきら', detail: 'sparkling/glittering' },
        ],
    },
    {
        title: 'The BIG distinctions (exam favourites)', items: [
            { label: 'は vs が', detail: 'known topic vs new information — the #1 particle question' },
            { label: 'に vs で', detail: 'destination/existence vs action location' },
            { label: 'ある vs いる', detail: 'things vs animate beings' },
            { label: 'を vs が (desire/ability)', detail: '水が飲みたい (want to drink) — たい and potential shift を to が' },
            { label: 'それ vs あれ', detail: 'near the LISTENER vs far from both speaker and listener' },
            { label: 'ます vs る form', detail: 'polite vs plain — mixing registers in one sentence is the classic error' },
            { label: 'おばさん vs おばあさん', detail: 'aunt vs grandmother — long vowel changes people!' },
            { label: 'しか + negative vs だけ', detail: 'both mean "only" but しか forces the negative' },
        ],
    },
];
