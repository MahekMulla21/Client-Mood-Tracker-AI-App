import React from "react";

const MoodCard = ({ mood, onDelete, onEdit }) => {
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

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="mood-card">
      <div className="mood-card-header">
        <div className="mood-emoji-label">
          <span className="mood-emoji">{getMoodEmoji(mood.mood)}</span>
          <span className="mood-label">{mood.mood}</span>
        </div>
        <span className="mood-date">{formatDate(mood.createdAt)}</span>
      </div>

      <div className="mood-card-content">
        <p className="mood-reason">
          <strong>Reason:</strong> {mood.reason}
        </p>
        {mood.suggestion && (
          <div className="mood-suggestion">
            <strong>💡 Suggestion:</strong>
            <p>{mood.suggestion}</p>
          </div>
        )}
      </div>

      <div className="mood-card-actions">
        <button className="btn-edit" onClick={() => onEdit(mood._id)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(mood._id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default MoodCard;
