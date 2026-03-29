import { Question, QuestionType, Difficulty, Lecture, Language } from "../store/useAppStore";

const MODEL = "llama-3.1-8b-instant";
const MODEL_LARGE = "llama-3.3-70b-versatile";
const MODEL_FALLBACK = "gemma2-9b-it";
const OPENAI_MODEL = "gpt-4o";

// OpenAI chat — used for quiz generation and explanations
const chatOpenAI = async (system: string, user: string, maxTokens = 2048): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not configured');
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.4,
      max_tokens: maxTokens,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    }),
  });
  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`OpenAI API error ${res.status}: ${errBody}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
};

const chat = async (system: string, user: string, maxTokens = 8192, large = false): Promise<string> => {
  const primary = large ? MODEL_LARGE : MODEL;
  const tryModel = async (model: string) => {
    const res = await fetch('/api/groq/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model,
        temperature: 0.3,
        max_tokens: maxTokens,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });
    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`API error ${res.status}: ${errBody}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '';
  };

  try {
    return await tryModel(primary);
  } catch (err: any) {
    console.warn('[aiService] Primary model failed, trying fallback:', err?.message);
    try {
      return await tryModel(large ? MODEL_FALLBACK : MODEL_LARGE);
    } catch (err2: any) {
      console.error('[aiService] Both models failed:', err2?.message);
      throw err2;
    }
  }
};

const parseJSON = (raw: string): any => {
  let s = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
  const start = s.indexOf("{");
  const end = s.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object found in response");
  s = s.slice(start, end + 1);

  try { return JSON.parse(s); } catch { /* fall through */ }

  s = s.replace(/,\s*([}\]])/g, "$1");
  try { return JSON.parse(s); } catch { /* fall through */ }

  s = s.replace(/("(?:[^"\\]|\\.)*")/gs, (match) =>
    match.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t")
  );
  try { return JSON.parse(s); } catch { /* fall through */ }

  console.error("[parseJSON] Failed. Raw:\n", raw);
  throw new Error("Failed to parse JSON from AI response");
};

export const generateChatResponse = async (
  messages: { role: "user" | "assistant" | "system"; content: string }[],
  targetLanguage: Language,
  scenario?: string,
  difficultyScore = 30,
  grammarMode: 'strict' | 'fluency' = 'strict'
) => {
  const scenarioCtx = scenario ? ` The conversation scenario is: "${scenario}". Stay in character for this scenario.` : '';
  const level = difficultyScore < 34 ? 'beginner' : difficultyScore < 67 ? 'intermediate' : 'advanced';
  const levelCtx = ` Adapt your vocabulary and sentence complexity to a ${level} learner (difficulty score: ${difficultyScore}/100).`;
  const grammarCtx = grammarMode === 'fluency'
    ? ' Only correct mistakes that break meaning or cause confusion — ignore minor grammar errors to keep the conversation flowing naturally.'
    : ' Correct ALL grammar mistakes, even minor ones, to help the student improve accuracy.';
  const system = `You are a friendly language conversation partner for a student learning ${targetLanguage}.${scenarioCtx}${levelCtx}${grammarCtx}
Speak primarily in ${targetLanguage}. Gently correct mistakes and provide English translations in brackets when needed. Ask open-ended questions to keep the conversation going.
Return ONLY valid JSON:
{
  "reply": "your conversational reply in ${targetLanguage}",
  "translation": "full English translation of your reply",
  "correction": null or {"original":"the user's mistake","corrected":"the correct form","explanation":"brief English explanation why"},
  "newWords": [{"word":"${targetLanguage} word you used","translation":"English meaning"}]
}
"newWords" should list 1-3 key ${targetLanguage} words from your reply that the student may not know yet. Keep "newWords" short.`;

  const raw = await chat(system, JSON.stringify(messages.map(m => ({ role: m.role, content: m.content }))), 1024);
  try {
    const d = parseJSON(raw);
    return {
      reply: d.reply || raw,
      translation: d.translation || null,
      correction: d.correction || null,
      newWords: Array.isArray(d.newWords) ? d.newWords : [],
    };
  } catch {
    return { reply: raw, translation: null, correction: null, newWords: [] };
  }
};

export const extractTextWithAI = async (_file: File): Promise<string> => "";

export const generateLecture = async (
  content: string,
  difficulty: Difficulty,
  targetLanguage: Language = "French"
): Promise<Lecture> => {
  const system = `You are a professional ${targetLanguage} language tutor. Convert student notes into a LONG, detailed, comprehensive lesson. Return ONLY valid JSON.

RULES:
- Only use information from the notes. You may expand explanations but do not introduce unrelated topics.
- Write DETAILED explanations — at least 6–8 sentences per section. Break them into clear, readable parts.
- Each section MUST have at least 5–6 examples with both ${targetLanguage} and English. More is better.
- Each section MUST have at least 4–5 practice exercises mixing: translate to English, translate to ${targetLanguage}, fill in the blank, and complete the sentence.
- Use real-life relatable examples students can connect with (food, travel, school, daily life).
- Generate at least 4–6 sections — do NOT produce fewer than 4 sections.
- Each section must have at least 5 vocabulary items with pronunciation, register, and usage notes.
- Each section must have 1–3 grammar rule callout cards in "grammarNotes" (e.g. adjective placement, verb conjugation rules, gender rules).
- Match difficulty: ${difficulty}.
- "level" field must be one of: "Beginner", "Intermediate", "Advanced".
- "pronunciation" is a flat array of ALL example sentences from the lesson for speech playback.
- Do NOT truncate or shorten the output. Produce the FULL lesson.

JSON schema (return exactly this structure):
{
  "title": "string",
  "level": "Beginner|Intermediate|Advanced",
  "sections": [
    {
      "title": "string",
      "text": "string (detailed explanation in English, 6-8 sentences, covering grammar rules, usage context, common patterns, and tips)",
      "vocabulary": [
        {"word":"string","translations":["string"],"pronunciation":"string","register":"formal|informal|neutral","notes":"string","phrase":[],"partOfSpeech":"string","conjugations":[{"form":"string","value":"string"}]}
      ],
      "examples": [
        {"target":"string","english":"string"}
      ],
      "practice": [
        {"instruction":"string","question":"string","answer":"string"}
      ],
      "grammarNotes": [
        {"rule":"string","explanation":"string","example":"string"}
      ]
    }
  ],
  "pronunciation": [{"text":"string"}]
}`;

  const user = `Language: ${targetLanguage} | Difficulty: ${difficulty}\nNotes:\n${content}`;
  const raw = await chat(system, user, 8192, true);
  const result = parseJSON(raw);
  const sections = Array.isArray(result.sections) ? result.sections : [];

  return {
    id: `lecture-${Date.now()}`,
    title: result.title || "Untitled Lecture",
    level: result.level || difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
    language: targetLanguage,
    pronunciation: Array.isArray(result.pronunciation) ? result.pronunciation : [],
    sections: sections.map((s: any) => ({
      title: s.title || "",
      text: s.text || "",
      vocabulary: (Array.isArray(s.vocabulary) ? s.vocabulary : []).map((v: any) => ({
        word: v.word || "",
        translations: Array.isArray(v.translations) ? v.translations : [],
        pronunciation: v.pronunciation || "",
        register: v.register || "neutral",
        notes: v.notes || "",
        phrase: Array.isArray(v.phrase) ? v.phrase : null,
        partOfSpeech: v.partOfSpeech || "",
        conjugations: Array.isArray(v.conjugations) && v.conjugations.length > 0 ? v.conjugations : undefined,
      })),
      examples: (Array.isArray(s.examples) ? s.examples : []).map((e: any) => ({
        target: e.target || "",
        english: e.english || "",
      })),
      practice: (Array.isArray(s.practice) ? s.practice : []).map((p: any) => ({
        instruction: p.instruction || "",
        question: p.question || "",
        answer: p.answer || "",
      })),
      grammarNotes: (Array.isArray(s.grammarNotes) ? s.grammarNotes : []).map((g: any) => ({
        rule: g.rule || "",
        explanation: g.explanation || "",
        example: g.example || "",
      })),
    })),
  };
};

export const generateQuestions = async (
  content: string,
  count: number,
  type: QuestionType,
  difficulty: Difficulty,
  targetLanguage: Language = "French"
): Promise<Question[]> => {

  const difficultyGuide = {
    beginner: `
BLOOM'S TAXONOMY TARGET: 40% Remember, 40% Understand, 20% Apply
- Vocabulary: common everyday words (greetings, numbers, colors, food, family)
- Grammar: present tense only, simple sentence structures, articles
- Remember questions: "What does [word] mean?" → options must ALL be English meanings
- Understand questions: "Which sentence uses [word] correctly?" → options are full sentences
- Apply questions: "Complete this sentence: ___" → fill-in-the-blank with context
- Distractors: clearly different words from the same semantic category`,
    intermediate: `
BLOOM'S TAXONOMY TARGET: 25% Remember, 30% Understand, 30% Apply, 15% Analyze
- Vocabulary: travel, work, emotions, descriptions, time expressions
- Grammar: passé composé, future, adjective agreement, pronouns
- Remember: vocabulary definitions and translations
- Understand: choosing correct tense/form in context
- Apply: verb conjugation in sentences, pronoun placement
- Analyze: identifying grammatical errors, explaining why a form is wrong
- Distractors: same verb different conjugations, similar-sounding words with different meanings`,
    advanced: `
BLOOM'S TAXONOMY TARGET: 15% Remember, 20% Understand, 25% Apply, 25% Analyze, 10% Evaluate, 5% Create
- Vocabulary: idiomatic expressions, formal/informal register, false cognates
- Grammar: subjunctive, conditional, passive voice, reported speech, complex clauses
- Analyze: subtle grammar distinctions, register appropriateness
- Evaluate: choosing the most natural/appropriate phrasing for a context
- Create: completing complex sentences requiring synthesis of multiple rules
- Distractors: grammatically plausible but semantically wrong, near-synonyms with different connotations`,
  };

  // For non-mixed types, ALL questions must be that type
  const typeInstruction = type === 'mixed'
    ? `Distribute the ${count} questions across all three types: roughly equal split between "multiple_choice", "fill_in_the_blank", and "pronunciation".`
    : `ALL ${count} questions MUST be of type "${type}". Do not use any other type. Every single question in the array must have "type": "${type}".`;

  const system = `You are an expert ${targetLanguage} language examiner. Return ONLY valid JSON, no markdown.

Generate exactly ${count} language learning questions in ${targetLanguage}.

PROFICIENCY LEVEL: ${difficulty.toUpperCase()}
${difficultyGuide[difficulty]}

QUESTION TYPE RULE (CRITICAL):
${typeInstruction}

BANNED QUESTION PATTERNS — never generate these:
❌ "Quel est le sens de X?" / "What does X mean?" — trivially answered by re-reading
❌ "Quel est le mot qui signifie X?" / "What is the word for X?" — same problem
❌ "Quelle est la traduction de X?" — translation lookup
❌ Fill-in-the-blank where only one word could logically fit
❌ Any question where the answer appears quoted in the question text
❌ Proper names (Pierre, Jean, Marie, Marc) as options — any name is equally valid
❌ "Laquelle de ces phrases est correcte?" with no specific grammar rule being tested — too vague, all options may be grammatically valid in different contexts
❌ Greeting questions that depend on the gender of the person being greeted, unless the gender is EXPLICITLY stated in the question (e.g. "une professeure" not "un enseignant")
❌ Questions where multiple options are all correct in different contexts — there must be ONE clearly correct answer
❌ Duplicate options — every option must be completely different
❌ Questions testing social context/politeness where the "correct" answer is debatable (e.g. "best way to greet someone you just met" — both "Bonjour, comment allez-vous?" and "Je suis ravi de vous rencontrer" are valid)

GOOD QUESTION PATTERNS — use these instead:
✅ Grammar: "Complétez: Hier, je ___ au marché." → options: suis allé / allais / vais / aller (tests passé composé vs imparfait)
✅ Vocabulary in context: "Quel mot complète: Elle porte une ___ bleue." → options: robe / livre / chaise / stylo (clothing vs random nouns)
✅ Article agreement: "Choisissez le bon article: ___ soleil brille." → options: Le / La / Les / Un
✅ Verb conjugation: "Nous ___ contents de vous voir." → options: sommes / êtes / sont / suis
✅ Sentence correction: "Quelle phrase utilise correctement le passé composé?" → 4 sentences with clear grammatical differences
✅ Pronunciation: a natural sentence to read aloud

QUESTION QUALITY CHECKLIST — before including a question, verify:
☑ There is exactly ONE correct answer that any French teacher would agree on
☑ The 3 wrong options are clearly wrong for a specific, explainable reason
☑ The question cannot be answered by guessing based on context alone
☑ No option is a proper name unless the question is specifically about names
☑ If gender matters, the question explicitly states the gender

GOOD QUESTION PATTERNS — use these instead:
✅ "Laquelle de ces phrases est correcte?" → test grammar with 4 full sentences as options
✅ "Complétez: Je ___ au café hier." → test verb conjugation (options: suis allé / allais / vais / aller)
✅ "Quel mot complète cette phrase: Elle porte un ___ rouge." → options are clothing items
✅ "Choisissez la bonne forme: Nous ___ contents." → options: sommes / êtes / sont / suis
✅ "Quelle phrase est grammaticalement correcte?" → 4 sentences, only one is correct
✅ Pronunciation: a natural sentence to read aloud

STRICT RULES:
1. For "multiple_choice": question in ${targetLanguage}. Exactly 4 options. "answer" MUST match one option exactly character-for-character.
2. For "fill_in_the_blank": ${targetLanguage} sentence with ___. "answer" is the missing word. "translation" is the COMPLETE English sentence with the answer filled in — never ___ in translation. The blank must have at least 3 plausible options.
3. For "pronunciation": a natural ${targetLanguage} sentence. "answer" is that sentence.
4. ALL 4 options must be the SAME TYPE — all ${targetLanguage} words/phrases, OR all English words. NEVER mix languages in options.
5. The correct answer must NOT appear in the question text.
6. Every question tests a DIFFERENT concept — no repeats across the ${count} questions.
7. Distractors must be plausible — same word category, similar length, grammatically consistent.
8. Distribute correct answer position: roughly 25% each at positions 1/2/3/4.
9. NEVER use "all of the above", "none of the above", or nonsense options.

Return JSON exactly:
{"questions":[{"question":"string","translation":"string","type":"${type === 'mixed' ? 'multiple_choice|fill_in_the_blank|pronunciation' : type}","options":["string","string","string","string"],"answer":"string"}]}`;

  const userPrompt = `Generate questions based on this content. The student is a ${difficulty} learner${difficulty === 'beginner' ? ' — every question MUST have a clear English "translation" field that explains what the question is asking in plain English' : difficulty === 'intermediate' ? ' — include an English "translation" hint for complex questions' : ' — no English translations needed, the student is advanced'}.\n\n${content}`;
  // Use GPT-4o for quiz generation, fall back to Groq large model
  let raw: string;
  try {
    raw = await chatOpenAI(system, userPrompt, 2048);
  } catch (err: any) {
    console.warn('[quiz] OpenAI failed, falling back to Groq:', err?.message);
    raw = await chat(system, userPrompt, 2048, true);
  }
  const result = parseJSON(raw);
  const questions = Array.isArray(result.questions) ? result.questions : [];

  return questions.map((q: any, i: number) => {
    const options: string[] = Array.isArray(q.options) ? q.options : [];
    let answer: string = q.answer || "";
    // Enforce correct type when not mixed
    const resolvedType = type !== 'mixed' ? type : (q.type || 'multiple_choice');

    // Safety: if answer isn't in options for multiple choice, pick the closest match
    if (resolvedType === "multiple_choice" && options.length > 0 && !options.includes(answer)) {
      const lower = answer.toLowerCase().trim();
      const match = options.find(o => o.toLowerCase().trim() === lower);
      answer = match ?? options[0];
    }

    // Deduplicate options — remove questions with duplicate option values
    if (resolvedType === 'multiple_choice') {
      const uniqueOpts = new Set(options.map(o => o.toLowerCase().trim()));
      if (uniqueOpts.size < options.length) return null as any; // will be filtered
    }
    // (filtered out below, replaced with null and removed)

    return {
      id: `q-${i}-${Date.now()}`,
      question: q.question || "",
      translation: q.translation || "",
      type: resolvedType,
      options,
      answer,
    };
  }).filter((q): q is NonNullable<typeof q> => {
    if (!q) return false;
    if (q.type !== 'multiple_choice') return true;
    // Remove circular questions where the answer word appears verbatim in the question text
    const qLower = q.question.toLowerCase();
    const ansLower = q.answer.toLowerCase().trim();
    if (ansLower.length > 1 && qLower.includes(`'${ansLower}'`) || qLower.includes(`"${ansLower}"`)) return false;
    return true;
  }).filter((q, idx, arr) => {
    // Deduplicate — remove questions with the same answer or near-identical question text
    const ansLower = q.answer.toLowerCase().trim();
    const qLower = q.question.toLowerCase().trim().slice(0, 60);
    return arr.findIndex(other =>
      other.answer.toLowerCase().trim() === ansLower ||
      other.question.toLowerCase().trim().slice(0, 60) === qLower
    ) === idx;
  });
};

export const generateAnswerExplanation = async (
  question: string,
  correctAnswer: string,
  userAnswer: string,
  targetLanguage: Language,
  difficulty: Difficulty
): Promise<string> => {
  const isAdvanced = difficulty === 'advanced';
  const system = `You are a ${targetLanguage} language tutor. Return ONLY valid JSON: {"explanation":"string"}

Write a helpful explanation${isAdvanced ? ` in ${targetLanguage}` : ' in ENGLISH'} covering ALL of these points:
1. What the correct answer "${correctAnswer}" means in English — always translate it, e.g. "Bonjour, je suis heureux de vous rencontrer = Hello, I am happy to meet you"
2. Why it is the right answer (grammar rule, context, register, or usage reason)
3. Why the student's answer "${userAnswer}" is wrong — be specific about what it means and why it doesn't fit
4. A short memory tip if helpful

Keep it under 80 words. ${isAdvanced ? '' : 'Use plain English. When mentioning any French phrase, always add its English translation in parentheses immediately after.'}`;
  try {
    let raw: string;
    try {
      raw = await chatOpenAI(system, `Question: "${question}"\nCorrect answer: "${correctAnswer}"\nStudent answered: "${userAnswer}"`, 400);
    } catch {
      raw = await chat(system, `Question: "${question}"\nCorrect answer: "${correctAnswer}"\nStudent answered: "${userAnswer}"`, 400, true);
    }
    const d = parseJSON(raw);
    return d.explanation || '';
  } catch {
    return '';
  }
};

export const getWordDetails = async (
  word: string,
  targetLanguage: Language
): Promise<{
  summary: string; register: string; notes: string; pronunciation: string;
  partOfSpeech: string; gender?: string; plural?: string;
  conjugations?: { form: string; value: string }[];
  culturalNote?: string; commonMistakes?: string;
  alternatives: { text: string; register: string; notes: string }[];
  examples: { target: string; english: string }[];
}> => {
  const system = `You are a ${targetLanguage} language expert. Return ONLY valid JSON with these fields:
{"summary":"string","register":"formal|informal|neutral","notes":"string","pronunciation":"string","partOfSpeech":"string","gender":"string","plural":"string","conjugations":[{"form":"string","value":"string"}],"culturalNote":"string","commonMistakes":"string","alternatives":[{"text":"string","register":"string","notes":"string"}],"examples":[{"target":"string","english":"string"}]}
Provide 2-3 alternatives, 2-3 examples, conjugations only for verbs.`;

  const raw = await chat(system, `Give me full details for the ${targetLanguage} word: "${word}". Do not use any other word.`, 1024);
  const d = parseJSON(raw);
  return {
    summary: d.summary || "",
    register: d.register || "neutral",
    notes: d.notes || "",
    pronunciation: d.pronunciation || "",
    partOfSpeech: d.partOfSpeech || "",
    gender: d.gender || undefined,
    plural: d.plural || undefined,
    conjugations: Array.isArray(d.conjugations) ? d.conjugations : undefined,
    culturalNote: d.culturalNote || undefined,
    commonMistakes: d.commonMistakes || undefined,
    alternatives: Array.isArray(d.alternatives) ? d.alternatives : [],
    examples: Array.isArray(d.examples) ? d.examples : [],
  };
};

export const generateSessionSummary = async (
  messages: { role: string; content: string }[],
  targetLanguage: Language,
  wordsLearned: number,
  correctionsCount: number
): Promise<{ recap: string; strengths: string; improvements: string }> => {
  const system = `You are a ${targetLanguage} language coach. Summarize a conversation practice session.
Return ONLY valid JSON:
{"recap":"2-3 sentence summary of what was practiced","strengths":"one sentence on what the student did well","improvements":"one sentence on what to focus on next"}`;
  const convo = messages.map(m => `${m.role}: ${m.content}`).join('\n');
  const raw = await chat(system, `Session (${wordsLearned} new words, ${correctionsCount} corrections):\n${convo}`, 512);
  const d = parseJSON(raw);
  return {
    recap: d.recap || '',
    strengths: d.strengths || '',
    improvements: d.improvements || '',
  };
};

// Feature 2: Word of the day
export const getWordOfTheDay = async (targetLanguage: Language): Promise<{ word: string; translation: string; pronunciation: string; example: string; exampleTranslation: string }> => {
  const system = `You are a ${targetLanguage} language teacher. Pick one interesting, practical ${targetLanguage} word suitable for learners.
Return ONLY valid JSON: {"word":"string","translation":"string","pronunciation":"string","example":"string","exampleTranslation":"string"}`;
  const raw = await chat(system, `Give me a word of the day for ${targetLanguage} learners. Today's seed: ${new Date().toDateString()}`, 256);
  const d = parseJSON(raw);
  return { word: d.word || '', translation: d.translation || '', pronunciation: d.pronunciation || '', example: d.example || '', exampleTranslation: d.exampleTranslation || '' };
};

// Feature 3: Conversation challenge generation
export const generateChallenge = async (targetLanguage: Language, level: string): Promise<{ title: string; description: string; targetPhrases: string[]; successCriteria: string }> => {
  const system = `You are a ${targetLanguage} language coach. Create a short conversation challenge for a ${level} learner.
Return ONLY valid JSON: {"title":"string","description":"string","targetPhrases":["phrase1","phrase2","phrase3"],"successCriteria":"string"}
targetPhrases: 3 specific ${targetLanguage} phrases the student must use. successCriteria: how to know they completed it.`;
  const raw = await chat(system, `Create a fun conversation challenge for a ${level} ${targetLanguage} learner.`, 512);
  const d = parseJSON(raw);
  return { title: d.title || '', description: d.description || '', targetPhrases: Array.isArray(d.targetPhrases) ? d.targetPhrases : [], successCriteria: d.successCriteria || '' };
};

// Feature 4: Tone/emotion coaching — check if message tone fits scenario
export const analyzeTone = async (userMessage: string, scenario: string, targetLanguage: Language): Promise<{ isAppropriate: boolean; toneTip: string | null; betterAlternative: string | null }> => {
  const system = `You are a ${targetLanguage} language coach. Analyze if the student's message has the right tone/register for the scenario.
Return ONLY valid JSON: {"isAppropriate":true|false,"toneTip":null or "brief English tip","betterAlternative":null or "${targetLanguage} alternative phrase"}`;
  const raw = await chat(system, `Scenario: "${scenario}"\nStudent said: "${userMessage}"\nIs the tone/register appropriate?`, 256);
  const d = parseJSON(raw);
  return { isAppropriate: !!d.isAppropriate, toneTip: d.toneTip || null, betterAlternative: d.betterAlternative || null };
};

// Feature 8: Custom scenario generation
export const generateCustomScenario = async (userDescription: string, targetLanguage: Language): Promise<{ title: string; description: string; prompt: string; starterPhrases: string[] }> => {
  const system = `You are a ${targetLanguage} language teacher. Create a roleplay scenario based on the user's description.
Return ONLY valid JSON: {"title":"string","description":"string","prompt":"string","starterPhrases":["phrase1","phrase2","phrase3"]}
prompt: detailed instructions for the AI to play its role. starterPhrases: 3 opening phrases in ${targetLanguage} the student can use.`;
  const raw = await chat(system, `Create a ${targetLanguage} conversation scenario: "${userDescription}"`, 512);
  const d = parseJSON(raw);
  return { title: d.title || userDescription, description: d.description || '', prompt: d.prompt || '', starterPhrases: Array.isArray(d.starterPhrases) ? d.starterPhrases : [] };
};

// Feature 9: Post-session vocab quiz — context-aware, multi-type
export const generateVocabQuiz = async (
  words: { word: string; translation: string }[],
  targetLanguage: Language,
  chatContext: string,
  count: number
): Promise<{ type: 'mcq' | 'fill' | 'arrange'; question: string; options?: string[]; answer: string; blankedSentence?: string; words?: string[] }[]> => {
  if (words.length === 0 && !chatContext) return [];

  // distribute types as evenly as possible
  const types = ['mcq', 'fill', 'arrange'] as const;
  const typeDistribution = Array.from({ length: count }, (_, i) => types[i % 3]);

  const system = `You are a ${targetLanguage} language teacher. Create a quiz based on the student's conversation.
Return ONLY valid JSON: {"questions":[...]}

STRICT RULES:
- Every question MUST use a DIFFERENT word, phrase, or sentence from the conversation. NO repeats.
- Each question tests something UNIQUE — never ask about the same word twice.
- You must produce EXACTLY ${count} questions in this exact type order: ${typeDistribution.join(', ')}

Type formats:
- mcq: {"type":"mcq","question":"What does '[word from chat]' mean?","options":["a","b","c","d"],"answer":"correct option"}
  → options must include 3 plausible wrong answers, all different from each other
  → answer MUST be the FULL TEXT of the correct option, NOT a letter like "a", "b", "c". Example: if options are ["Goodbye","Hello","Welcome","How are you"] and Welcome is correct, answer must be "Welcome"
- fill: {"type":"fill","question":"Fill in the blank","blankedSentence":"[sentence from chat with ONE word replaced by ___]","answer":"[the blanked word]"}
  → use a DIFFERENT sentence for each fill question
- arrange: {"type":"arrange","question":"Arrange into a correct sentence","words":["word1","word2","word3","word4"],"answer":"word1 word2 word3 word4"}
  → use a DIFFERENT sentence for each arrange question, 3-6 words

Pull questions from different parts of the conversation — beginning, middle, and end.`;

  const raw = await chat(system,
    `Conversation:\n${chatContext}\n\nVocabulary encountered: ${JSON.stringify(words)}\n\nGenerate exactly ${count} questions (types in order: ${typeDistribution.join(', ')}).`,
    2000
  );
  const d = parseJSON(raw);
  if (!Array.isArray(d.questions)) return [];

  // deduplicate by answer to prevent repeats
  const seen = new Set<string>();
  const unique = d.questions
    .map((q: any) => {
      // safety net: if answer is a single letter (a/b/c/d), resolve it to the actual option text
      if (q.type === 'mcq' && Array.isArray(q.options) && /^[a-dA-D]$/.test((q.answer || '').trim())) {
        const letterIndex = q.answer.trim().toLowerCase().charCodeAt(0) - 97; // a=0, b=1, c=2, d=3
        if (q.options[letterIndex]) q.answer = q.options[letterIndex];
      }
      return q;
    })
    .filter((q: any) => {
      const key = (q.answer || '').toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  return unique.slice(0, count);
};
export const translateWord = async (
  word: string,
  targetLanguage: Language
): Promise<{ translation: string; speechLang: string; isSourceEnglish: boolean; register?: string; notes?: string; alternatives?: { text: string; register: string; notes: string }[] }> => {
  const system = `You are a ${targetLanguage} language teacher.
The user will give you a word or phrase. It may be in English OR in ${targetLanguage}.
- If the input is in English → translate it to ${targetLanguage}. Set "isSourceEnglish": true.
- If the input is in ${targetLanguage} → translate it to English. Set "isSourceEnglish": false.
Return ONLY valid JSON:
{"translation":"string","isSourceEnglish":true|false,"register":"formal|informal|neutral","notes":"string","alternatives":[{"text":"string","register":"string","notes":"string"}]}
IMPORTANT: "translation" is always the OTHER language from the input.`;

  const raw = await chat(system, word, 512);
  const d = parseJSON(raw);
  return {
    translation: d.translation || "",
    speechLang: d.isSourceEnglish ? targetLanguage : "English",
    isSourceEnglish: !!d.isSourceEnglish,
    register: d.register || "neutral",
    notes: d.notes || "",
    alternatives: Array.isArray(d.alternatives) ? d.alternatives : [],
  };
};

// Grade user pronunciation attempt against the target word
export const gradePronunciation = async (
  spokenText: string,
  targetWord: string,
  targetLanguage: Language
): Promise<{ verdict: 'correct' | 'close' | 'wrong'; feedback: string; tip?: string }> => {
  const system = `You are a ${targetLanguage} pronunciation coach.
The student was asked to say the word "${targetWord}" in ${targetLanguage}.
The speech recognition captured: "${spokenText}".
Compare what was said to the target word and grade it.
Return ONLY valid JSON:
{"verdict":"correct"|"close"|"wrong","feedback":"one short sentence in English","tip":"optional short pronunciation tip or null"}
- "correct": sounds right or very close phonetically
- "close": recognisable but has a clear accent/error
- "wrong": clearly different word or unintelligible`;
  const raw = await chat(system, `Target: ${targetWord}\nSpoken: ${spokenText}`, 200);
  const d = parseJSON(raw);
  return {
    verdict: ['correct', 'close', 'wrong'].includes(d.verdict) ? d.verdict : 'wrong',
    feedback: d.feedback || 'Could not grade pronunciation.',
    tip: d.tip || undefined,
  };
};

export const getRelatedWords = async (
  word: string,
  language: Language
): Promise<{ word: string; translation: string; relation: string }[]> => {
  const system = `You are a ${language} vocabulary expert.
Return ONLY valid JSON array of related words for "${word}" in ${language}.
Include synonyms, antonyms, and words in the same semantic family.
Format: [{"word":"${language} word","translation":"English meaning","relation":"synonym|antonym|related"}]
Return 6-8 items max.`;
  const raw = await chat(system, `Word: ${word}`, 600);
  const d = parseJSON(raw);
  return Array.isArray(d) ? d : [];
};

export const getWordEtymology = async (
  word: string,
  language: Language
): Promise<{ origin: string; root: string; evolution: string }> => {
  const system = `You are a linguistics expert specializing in ${language} etymology.
Return ONLY valid JSON with the etymology of "${word}":
{"origin":"language of origin (e.g. Latin, Greek, Old French)","root":"the root word/morpheme","evolution":"1-2 sentences on how the word evolved to its current meaning"}`;
  const raw = await chat(system, `Word: ${word}`, 300);
  const d = parseJSON(raw);
  return { origin: d.origin || '', root: d.root || '', evolution: d.evolution || '' };
};

export const getSimilarConfusableWords = async (
  word: string,
  deckWords: string[],
  language: Language
): Promise<{ word: string; translation: string; difference: string }[]> => {
  if (deckWords.length === 0) return [];
  const system = `You are a ${language} language teacher.
Given the word "${word}" and this list of other words the student knows: ${deckWords.slice(0, 30).join(', ')}.
Identify up to 3 words from the list that are easily confused with "${word}" (similar spelling, sound, or meaning).
Return ONLY valid JSON array: [{"word":"confusable word","translation":"its English meaning","difference":"one sentence explaining the key difference"}]
If none are confusable, return [].`;
  const raw = await chat(system, `Target: ${word}\nDeck: ${deckWords.join(', ')}`, 400);
  const d = parseJSON(raw);
  return Array.isArray(d) ? d.slice(0, 3) : [];
};

export const getWordUsageTips = async (
  word: string,
  language: Language
): Promise<{ tip: string; example: string }[]> => {
  const system = `You are a ${language} language teacher.
Give 3 practical usage tips for the word "${word}" in ${language}.
Each tip should help a learner use the word correctly in real conversation.
Return ONLY valid JSON array: [{"tip":"short practical tip","example":"example sentence in ${language}"}]`;
  const raw = await chat(system, `Word: ${word}`, 500);
  const d = parseJSON(raw);
  return Array.isArray(d) ? d.slice(0, 3) : [];
};

export const generateSectionQuiz = async (
  section: { title: string; text: string; vocabulary: { word: string; translations: string[] }[]; examples: { target: string; english: string }[] },
  language: Language
): Promise<{ instruction: string; question: string; answer: string; hint?: string }[]> => {
  const vocabList = section.vocabulary.slice(0, 8).map(v => `${v.word} = ${v.translations[0]}`).join(', ');
  const exampleList = section.examples.slice(0, 4).map(e => `${e.target} → ${e.english}`).join('\n');
  const system = `You are a ${language} language quiz generator.
Generate exactly 5 fill-in-the-blank questions based on the section content.
Format: A ${language} sentence with one word replaced by _______.
Include a hint showing the English meaning of the missing word so the student knows what to fill in (in ${language}).

Return ONLY valid JSON array:
[{"instruction":"Fill in the blank","question":"${language} sentence with _______","answer":"the missing ${language} word only","hint":"English meaning of the missing word"}]

Rules:
- The question is a ${language} sentence with exactly one blank (_______)
- The answer is ONLY the missing ${language} word (not the full sentence)
- The hint is the English translation of the missing word (e.g. "sweater", "to eat", "beautiful")
- Base questions on the vocabulary and examples from this section
- Do not repeat the same word twice
- Vary difficulty across the 5 questions`;
  const user = `Section: ${section.title}\nContent: ${section.text.slice(0, 400)}\nVocabulary: ${vocabList}\nExamples:\n${exampleList}`;
  const raw = await chat(system, user, 1000);
  const d = parseJSON(raw);
  return Array.isArray(d) ? d.slice(0, 5) : [];
};


// ── Feature 6: Story mode ─────────────────────────────────────────────────────
export interface StoryNode {
  id: string;
  text: string;
  translation: string;
  choices: { id: string; text: string; translation: string }[];
  vocabulary: { word: string; translation: string }[];
  isEnding?: boolean;
}

export const generateStoryStart = async (
  targetLanguage: Language,
  difficulty: Difficulty,
  theme: string
): Promise<StoryNode> => {
  const system = `You are a ${targetLanguage} interactive story writer for language learners. Return ONLY valid JSON.
Create the opening of an interactive story in ${targetLanguage} at ${difficulty} level with theme: "${theme}".
{"id":"start","text":"story opening in ${targetLanguage} (3-4 sentences)","translation":"English translation","choices":[{"id":"a","text":"choice in ${targetLanguage}","translation":"English"},{"id":"b","text":"choice in ${targetLanguage}","translation":"English"},{"id":"c","text":"choice in ${targetLanguage}","translation":"English"}],"vocabulary":[{"word":"${targetLanguage} word","translation":"English"}]}
Include 2-3 vocabulary items from the story text.`;
  const raw = await chat(system, `Create a ${difficulty} ${targetLanguage} story about: ${theme}`, 1024, true);
  const d = parseJSON(raw);
  return { id: 'start', text: d.text || '', translation: d.translation || '', choices: d.choices || [], vocabulary: d.vocabulary || [] };
};

export const continueStory = async (
  targetLanguage: Language,
  difficulty: Difficulty,
  storyHistory: string,
  choiceText: string,
  turnNumber: number
): Promise<StoryNode> => {
  const isNearEnd = turnNumber >= 4;
  const system = `You are a ${targetLanguage} interactive story writer. Return ONLY valid JSON.
Continue the story based on the player's choice. ${isNearEnd ? 'This should be the final scene — wrap up the story.' : 'Continue the adventure with 2-3 more choices.'}
{"id":"node-${turnNumber}","text":"continuation in ${targetLanguage} (3-4 sentences)","translation":"English translation","choices":${isNearEnd ? '[]' : '[{"id":"a","text":"choice","translation":"English"},{"id":"b","text":"choice","translation":"English"}]'},"vocabulary":[{"word":"word","translation":"English"}],"isEnding":${isNearEnd}}`;
  const raw = await chat(system, `Story so far:\n${storyHistory}\n\nPlayer chose: "${choiceText}"`, 1024, true);
  const d = parseJSON(raw);
  // Force ending if we're at/past turn 4, or if AI flagged it, or if no choices returned
  const forceEnding = isNearEnd || !!d.isEnding || (Array.isArray(d.choices) && d.choices.length === 0);
  return {
    id: `node-${turnNumber}`,
    text: d.text || '',
    translation: d.translation || '',
    choices: forceEnding ? [] : (d.choices || []),
    vocabulary: d.vocabulary || [],
    isEnding: forceEnding,
  };
};

// ── Feature 7: Grammar drill ──────────────────────────────────────────────────
export const generateGrammarDrill = async (
  targetLanguage: Language,
  grammarRule: string,
  difficulty: Difficulty,
  count = 10
): Promise<Question[]> => {
  const system = `You are an expert ${targetLanguage} grammar teacher. Return ONLY valid JSON.
Generate exactly ${count} rapid-fire multiple choice questions ALL testing this specific grammar rule: "${grammarRule}" in ${targetLanguage} at ${difficulty} level.
Every question must test a DIFFERENT aspect or example of the rule. No repeats.
{"questions":[{"question":"string","translation":"string","type":"multiple_choice","options":["a","b","c","d"],"answer":"string"}]}
Rules: answer MUST be one of the 4 options exactly. All options same language type. No circular questions.`;
  try {
    let raw: string;
    try { raw = await chatOpenAI(system, `Generate ${count} grammar drill questions for: ${grammarRule}`, 2048); }
    catch { raw = await chat(system, `Generate ${count} grammar drill questions for: ${grammarRule}`, 2048, true); }
    const result = parseJSON(raw);
    return (Array.isArray(result.questions) ? result.questions : []).map((q: any, i: number) => ({
      id: `drill-${i}-${Date.now()}`,
      question: q.question || '',
      translation: q.translation || '',
      type: 'multiple_choice' as QuestionType,
      options: Array.isArray(q.options) ? q.options : [],
      answer: q.answer || '',
    }));
  } catch { return []; }
};

// ── Pronunciation scoring ─────────────────────────────────────────────────────
// Normalized string similarity (0–1) ignoring punctuation, accents, case
const stringSimilarity = (a: string, b: string): number => {
  const normalize = (s: string) =>
    s.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents
      .replace(/[^\w\s]/g, '') // strip punctuation
      .replace(/\s+/g, ' ').trim();
  const na = normalize(a);
  const nb = normalize(b);
  if (na === nb) return 1;
  const wordsA = na.split(' ');
  const wordsB = nb.split(' ');
  const setA = new Set(wordsA);
  const setB = new Set(wordsB);
  let matches = 0;
  setA.forEach(w => { if (setB.has(w)) matches++; });
  return (2 * matches) / (setA.size + setB.size);
};

export const scorePronunciation = async (
  targetPhrase: string,
  spokenText: string,
  targetLanguage: Language
): Promise<{ score: number; feedback: string; corrections: { word: string; tip: string }[] }> => {
  const system = `You are a ${targetLanguage} pronunciation coach. Return ONLY valid JSON.

The student was asked to say: "${targetPhrase}"
Speech recognition transcribed what they said as: "${spokenText}"

IMPORTANT: Speech recognition transcribes what it HEARS phonetically. The transcription may differ in:
- Capitalization (ignore it)
- Punctuation (ignore it)  
- Accent marks (may be dropped by speech recognition — do NOT penalize this)
- Minor word order variations
- Contracted vs full forms

Score their pronunciation based on how close the spoken words sound to the target, NOT on exact text matching.
If the transcription matches the target words closely (even without accents/punctuation), score 85-100.

{"score": 0-100, "feedback": "brief encouraging feedback in English (1-2 sentences)", "corrections": [{"word": "string", "tip": "pronunciation tip in English"}]}
Score guide: 90-100 = excellent, 75-89 = good, 55-74 = needs work, below 55 = significant errors.
Only add corrections for genuinely mispronounced words. If the student got it right, return empty corrections array.`;
  try {
    const raw = await chatOpenAI(system, `Target: "${targetPhrase}"\nTranscribed: "${spokenText}"\nLanguage: ${targetLanguage}`, 512);
    const d = parseJSON(raw);
    return { score: d.score ?? 0, feedback: d.feedback ?? '', corrections: d.corrections ?? [] };
  } catch {
    // Fallback: normalized word-overlap similarity score
    const sim = stringSimilarity(targetPhrase, spokenText);
    const score = Math.round(sim * 100);
    const feedback = score >= 85 ? 'Great job! Your pronunciation was very close.'
      : score >= 60 ? 'Good effort! Keep practicing for more accuracy.'
        : 'Keep practicing — try listening to the phrase first, then repeat.';
    return { score, feedback, corrections: [] };
  }
};

export const generatePronunciationPhrases = async (
  targetLanguage: Language,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  count: number,
  topic?: string
): Promise<{ phrase: string; translation: string; level: string }[]> => {
  const topicCtx = topic ? ` Topic focus: "${topic}".` : '';
  // Random seed injected into the prompt forces the model to generate different phrases every call
  const seed = Math.random().toString(36).slice(2, 8);
  const sessionId = Date.now();

  // Large pool of varied categories to pick from randomly so phrases span many real-life contexts
  const allCategories = [
    'shopping', 'weather', 'directions', 'family', 'work', 'school', 'health', 'sports',
    'food & cooking', 'travel & transport', 'emotions & feelings', 'hobbies', 'technology',
    'nature & environment', 'time & schedules', 'money & banking', 'housing', 'clothing',
    'entertainment', 'social situations', 'opinions & preferences', 'past events', 'future plans',
    'describing people', 'describing places', 'problems & solutions', 'culture & traditions',
  ];
  // Pick 4–6 random categories to spread the phrases across
  const shuffled = allCategories.sort(() => Math.random() - 0.5);
  const chosen = shuffled.slice(0, Math.min(6, Math.ceil(count / 2)));
  const categoryCtx = `Spread the phrases across these real-life categories: ${chosen.join(', ')}.`;

  const diffGuide = difficulty === 'beginner'
    ? '5–8 words per sentence, present tense, common everyday vocabulary, no complex grammar'
    : difficulty === 'intermediate'
      ? '8–14 words, mix of tenses, idiomatic expressions, varied sentence structures'
      : '12–20 words, subjunctive/conditional/complex clauses, formal and informal registers, nuanced vocabulary';

  const system = `You are a ${targetLanguage} language teacher creating pronunciation practice material.
Session ID: ${sessionId} | Seed: ${seed}${topicCtx}
${categoryCtx}

Generate EXACTLY ${count} UNIQUE ${targetLanguage} sentences for pronunciation practice.
Difficulty: ${difficulty} — ${diffGuide}

STRICT RULES — violations will make the output useless:
❌ NEVER use: "Bonjour comment ça va", "Je m'appelle", "Je suis fatigué", "Je vais à la plage", "Il fait beau", "Comment allez-vous" or any other cliché beginner phrases
❌ NEVER repeat the same sentence structure more than once
❌ NEVER generate greetings-only phrases — vary the content widely
✅ Each sentence must come from a DIFFERENT real-life situation
✅ Sentences must sound like something a real person would actually say
✅ Include a mix of statements, questions, and exclamations
✅ Use varied vocabulary — no word should appear in more than 2 sentences

Return ONLY valid JSON:
{"phrases":[{"phrase":"${targetLanguage} sentence","translation":"English translation"}]}
Exactly ${count} phrases, no more, no less.`;

  const userMsg = `Generate ${count} fresh, varied ${difficulty} ${targetLanguage} pronunciation sentences. Session: ${seed}. Make every sentence different from typical textbook examples.${topic ? ` Focus on: ${topic}.` : ''}`;

  // Use temperature 0.9 via the large model for maximum variety
  const res = await fetch('/api/groq/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL_LARGE,
      temperature: 0.9,
      max_tokens: 2048,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: userMsg },
      ],
    }),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || '';
  const d = parseJSON(raw);
  return (Array.isArray(d.phrases) ? d.phrases : []).map((p: any) => ({
    phrase: p.phrase || '',
    translation: p.translation || '',
    level: difficulty,
  })).filter((p: any) => p.phrase);
};

export const translateToLanguage = async (
  text: string,
  targetLanguage: Language
): Promise<{ phrase: string; translation: string }> => {
  const system = `You are a translator. Translate the given text into ${targetLanguage}.
Return ONLY valid JSON: {"phrase":"translated text in ${targetLanguage}","translation":"original English text"}`;
  const raw = await chat(system, `Translate to ${targetLanguage}: "${text}"`, 256);
  const d = parseJSON(raw);
  return { phrase: d.phrase || text, translation: d.translation || text };
};
