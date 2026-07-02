const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  mood: {
    type: String,
    required: [true, "Please select a mood"],
    enum: [
      "Happy",
      "Sad",
      "Angry",
      "Anxious",
      "Stressed",
      "Neutral",
      "Excited",
      "Tired",
    ],
  },
  reason: {
    type: String,
    required: [true, "Please provide a reason"],
    maxlength: 500,
  },
  suggestion: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for better query performance
moodSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Mood", moodSchema);
