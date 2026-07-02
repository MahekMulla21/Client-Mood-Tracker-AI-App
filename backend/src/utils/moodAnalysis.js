const MOOD_RULES = {
  Happy: {
    keywords: [
      "happy",
      "good",
      "great",
      "joy",
      "excited",
      "grateful",
      "content",
    ],
    phrases: ["good day", "feeling great", "so happy", "really happy"],
  },
  Sad: {
    keywords: ["sad", "down", "upset", "lonely", "depressed", "tearful"],
    phrases: ["feel low", "feeling down", "not okay"],
  },
  Angry: {
    keywords: ["angry", "mad", "furious", "irritated", "annoyed"],
    phrases: ["so mad", "really angry", "fed up"],
  },
  Anxious: {
    keywords: ["anxious", "worried", "nervous", "panic", "uneasy"],
    phrases: ["panic attack", "on edge"],
  },
  Stressed: {
    keywords: [
      "stressed",
      "overwhelmed",
      "pressure",
      "burnout",
      "burned",
      "tense",
    ],
    phrases: ["burned out", "too much", "under pressure"],
  },
  Neutral: {
    keywords: ["okay", "fine", "neutral", "meh", "alright"],
    phrases: ["just okay", "nothing special"],
  },
};

const MOOD_PRIORITY = [
  "Happy",
  "Sad",
  "Angry",
  "Anxious",
  "Stressed",
  "Neutral",
];

const normalizeText = (text) => text.toLowerCase();

const tokenize = (text) => text.match(/[a-z']+/g) || [];

const analyzeTextForMood = (text) => {
  const safeText = typeof text === "string" ? text.trim() : "";
  const normalized = normalizeText(safeText);
  const tokens = tokenize(normalized);

  const scores = {};
  const matchedKeywords = {};

  Object.keys(MOOD_RULES).forEach((mood) => {
    scores[mood] = 0;
    matchedKeywords[mood] = new Set();
  });

  Object.entries(MOOD_RULES).forEach(([mood, rule]) => {
    rule.keywords.forEach((keyword) => {
      if (tokens.includes(keyword)) {
        scores[mood] += 1;
        matchedKeywords[mood].add(keyword);
      }
    });

    rule.phrases.forEach((phrase) => {
      if (normalized.includes(phrase)) {
        scores[mood] += 2;
        matchedKeywords[mood].add(phrase);
      }
    });
  });

  const totalScore = Object.values(scores).reduce(
    (sum, value) => sum + value,
    0,
  );
  let detectedMood = "Neutral";
  let topScore = 0;

  Object.entries(scores).forEach(([mood, score]) => {
    if (score > topScore) {
      topScore = score;
      detectedMood = mood;
    } else if (score === topScore && score > 0) {
      const currentPriority = MOOD_PRIORITY.indexOf(detectedMood);
      const nextPriority = MOOD_PRIORITY.indexOf(mood);
      if (nextPriority !== -1 && nextPriority < currentPriority) {
        detectedMood = mood;
      }
    }
  });

  if (totalScore === 0) {
    detectedMood = "Neutral";
  }

  const confidence =
    totalScore === 0 ? 0.4 : Number((topScore / totalScore).toFixed(2));

  return {
    mood: detectedMood,
    confidence,
    keywords: Array.from(matchedKeywords[detectedMood]),
    tokens,
  };
};

module.exports = { analyzeTextForMood };
