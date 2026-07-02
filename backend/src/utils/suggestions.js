/**
 * Generate mood-based suggestions
 * @param {String} mood - The user's mood
 * @returns {String} Suggestion for the mood
 */
const generateSuggestion = (mood) => {
  const suggestions = {
    Happy: [
      "Great! Keep spreading positivity. Try gratitude journaling - write down 3 things you appreciate.",
      "Your happiness is infectious! Share this joy with someone you care about.",
      "Perfect mood for accomplishing goals. Keep riding this positive wave!",
    ],
    Sad: [
      "Sorry to hear you're feeling down. Try some deep breathing exercises: breathe in for 4 counts, hold for 4, exhale for 4.",
      "Consider journaling your thoughts to process what you're feeling. Writing can be therapeutic.",
      "This mood is temporary. Listen to your favorite music or watch something uplifting.",
    ],
    Angry: [
      "Take a walk to cool off. Physical activity can help regulate emotions.",
      "Try the 5-4-3-2-1 grounding technique: Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.",
      "Deep breathing can help: Breathe in slowly, hold, and exhale even slower. Repeat 5 times.",
    ],
    Anxious: [
      "Use the 5-4-3-2-1 grounding technique to bring yourself to the present moment.",
      "Try progressive muscle relaxation: tense and relax each muscle group for 5 seconds.",
      "Anxiety is temporary. Do something calming like deep breathing, meditation, or a warm bath.",
    ],
    Stressed: [
      "Take a short break and do a quick breathing reset: inhale for 4, hold for 4, exhale for 6.",
      "Try a brief walk or stretch to release tension and reset your focus.",
      "Write down the top three priorities for today to reduce mental clutter.",
    ],
    Neutral: [
      "You're in a neutral state. This is a good time to reflect on your day.",
      "Consider doing an activity you enjoy to boost your mood or increase mindfulness.",
      "Take time to appreciate the calm. Sometimes neutral moods are peaceful.",
    ],
    Excited: [
      "Channel this energy productively! It's a great time to start that project you've been thinking about.",
      "Your excitement is powerful. Use this motivation to achieve your goals!",
      "Share this excitement with others. Positive energy is contagious!",
    ],
    Tired: [
      "Your body is telling you it needs rest. Consider taking a nap or getting quality sleep tonight.",
      "Tired? Try a short walk or light stretching to boost energy naturally.",
      "It's okay to rest. Listen to your body and get the sleep you need for tomorrow.",
    ],
  };

  const moodSuggestions = suggestions[mood] || [];
  return moodSuggestions[Math.floor(Math.random() * moodSuggestions.length)];
};

module.exports = { generateSuggestion };
