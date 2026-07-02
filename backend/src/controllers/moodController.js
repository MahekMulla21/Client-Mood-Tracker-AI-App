const Mood = require("../models/Mood");
const { generateSuggestion } = require("../utils/suggestions");
const { analyzeTextForMood } = require("../utils/moodAnalysis");

// Create a new mood entry
exports.createMood = async (req, res) => {
  try {
    const { mood, reason } = req.body;
    const userId = req.user.id;

    // Validation
    if (!mood || !reason) {
      return res.status(400).json({
        success: false,
        message: "Please provide mood and reason",
      });
    }

    // Generate suggestion
    const suggestion = generateSuggestion(mood);

    // Create mood entry
    const moodEntry = await Mood.create({
      userId,
      mood,
      reason,
      suggestion,
    });

    // Fetch updated entry with populated user data
    const populatedMood = await Mood.findById(moodEntry._id).populate(
      "userId",
      "name email",
    );

    res.status(201).json({
      success: true,
      data: populatedMood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Get all moods for current user
exports.getAllMoods = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    let filter = { userId };

    // Add date filtering if provided
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) {
        filter.createdAt.$gte = new Date(startDate);
      }
      if (endDate) {
        filter.createdAt.$lte = new Date(endDate);
      }
    }

    const moods = await Mood.find(filter)
      .sort({ createdAt: -1 })
      .populate("userId", "name email");

    res.status(200).json({
      success: true,
      count: moods.length,
      data: moods,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Get mood statistics
exports.getMoodStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { period = "week" } = req.query; // week, month, all

    let dateFilter = {};
    const now = new Date();

    if (period === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { $gte: weekAgo } };
    } else if (period === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      dateFilter = { createdAt: { $gte: monthAgo } };
    }

    const moods = await Mood.find({ userId, ...dateFilter });

    // Calculate statistics
    const moodCounts = {};
    moods.forEach((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });

    // Find most frequent mood
    let mostFrequentMood = null;
    let maxCount = 0;
    for (const [mood, count] of Object.entries(moodCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentMood = mood;
      }
    }

    // Check for emergency alert (Sad mood more than 5 times in a week)
    let emergencyAlert = false;
    let alertMessage = null;

    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const sadMoodsThisWeek = await Mood.countDocuments({
      userId,
      mood: "Sad",
      createdAt: { $gte: weekAgo },
    });

    if (sadMoodsThisWeek > 5) {
      emergencyAlert = true;
      alertMessage =
        "You have reported feeling sad more than 5 times this week. Consider talking to a counselor.";
    }

    // Get weekly data for chart
    const weeklyData = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];
      weeklyData[dateStr] = 0;
    }

    moods.forEach((entry) => {
      const dateStr = entry.createdAt.toISOString().split("T")[0];
      if (weeklyData.hasOwnProperty(dateStr)) {
        weeklyData[dateStr]++;
      }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalEntries: moods.length,
        moodCounts,
        mostFrequentMood,
        period,
        weeklyData,
        emergencyAlert,
        alertMessage,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Get single mood entry
exports.getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id).populate(
      "userId",
      "name email",
    );

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood entry not found",
      });
    }

    // Verify ownership
    if (mood.userId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this mood entry",
      });
    }

    res.status(200).json({
      success: true,
      data: mood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Update mood entry
exports.updateMood = async (req, res) => {
  try {
    let mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood entry not found",
      });
    }

    // Verify ownership
    if (mood.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this mood entry",
      });
    }

    const { mood: moodValue, reason } = req.body;

    if (moodValue) {
      mood.mood = moodValue;
    }

    if (reason) {
      mood.reason = reason;
      // Regenerate suggestion with new mood/reason
      mood.suggestion = generateSuggestion(mood.mood);
    }

    mood = await mood.save();

    const populatedMood = await Mood.findById(mood._id).populate(
      "userId",
      "name email",
    );

    res.status(200).json({
      success: true,
      data: populatedMood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Delete mood entry
exports.deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);

    if (!mood) {
      return res.status(404).json({
        success: false,
        message: "Mood entry not found",
      });
    }

    // Verify ownership
    if (mood.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this mood entry",
      });
    }

    await Mood.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Mood entry deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// Analyze message and optionally save as mood entry
exports.analyzeMood = async (req, res) => {
  try {
    const { message, saveEntry = false } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message to analyze",
      });
    }

    const analysis = analyzeTextForMood(message);
    let savedEntry = null;

    if (saveEntry) {
      const userId = req.user.id;
      const suggestion = generateSuggestion(analysis.mood);

      savedEntry = await Mood.create({
        userId,
        mood: analysis.mood,
        reason: message.trim(),
        suggestion,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...analysis,
        savedEntry,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
