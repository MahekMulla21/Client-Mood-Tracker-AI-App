import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { moodService } from "../services/api";
import "../styles/mood-entry.css";

const MoodEntryPage = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const moods = [
    "Happy",
    "Sad",
    "Angry",
    "Anxious",
    "Stressed",
    "Neutral",
    "Excited",
    "Tired",
  ];

  const getMoodEmoji = (moodType) => {
    const emojis = {
      Happy: "😊",
      Sad: "😢",
      Angry: "😠",
      Anxious: "😰",
      Stressed: "😣",
      Neutral: "😐",
      Excited: "🤩",
      Tired: "😴",
    };
    return emojis[moodType] || "😊";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!selectedMood || !reason.trim()) {
      setError("Please select a mood and provide a reason");
      return;
    }

    setLoading(true);

    try {
      await moodService.createMood({
        mood: selectedMood,
        reason,
      });

      setSuccess("Mood entry saved successfully!");
      setSelectedMood("");
      setReason("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save mood entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mood-entry-page">
      <div className="mood-entry-container">
        <button className="btn-back" onClick={() => navigate("/dashboard")}>
          ← Back
        </button>

        <h1>How are you feeling?</h1>
        <p className="subtitle">Select your current mood and tell us why</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="mood-form">
          {/* Mood Selection */}
          <div className="form-section">
            <label className="form-label">Select Your Mood</label>
            <div className="mood-grid">
              {moods.map((mood) => (
                <button
                  key={mood}
                  type="button"
                  className={`mood-option ${selectedMood === mood ? "selected" : ""}`}
                  onClick={() => setSelectedMood(mood)}
                >
                  <span className="mood-emoji">{getMoodEmoji(mood)}</span>
                  <span className="mood-name">{mood}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reason Input */}
          <div className="form-section">
            <label htmlFor="reason" className="form-label">
              What's the reason? *
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell us what's going on or what caused this mood..."
              rows="6"
              maxLength="500"
              required
            />
            <div className="char-count">{reason.length}/500 characters</div>
          </div>

          {/* Submit */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading || !selectedMood || !reason.trim()}
            >
              {loading ? "Saving..." : "Save Mood Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MoodEntryPage;
