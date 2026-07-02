import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { moodService } from "../services/api";
import "../styles/chat.css";

const ChatPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [detectedMood, setDetectedMood] = useState(null);
  const [saveEntry, setSaveEntry] = useState(true);
  const [error, setError] = useState("");

  const moodEmoji = useMemo(
    () => ({
      Happy: "😊",
      Sad: "😢",
      Angry: "😠",
      Anxious: "😰",
      Stressed: "😣",
      Neutral: "😐",
      Excited: "🤩",
      Tired: "😴",
    }),
    [],
  );

  const handleSend = async (event) => {
    event.preventDefault();
    const trimmed = message.trim();

    if (!trimmed || loading) {
      return;
    }

    setError("");
    setLoading(true);

    const userMessage = {
      id: `${Date.now()}-user`,
      role: "client",
      text: trimmed,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const response = await moodService.analyzeMood(trimmed, saveEntry);
      const analysis = response.data.data;

      setDetectedMood({
        mood: analysis.mood,
        confidence: analysis.confidence,
      });

      const systemMessage = {
        id: `${Date.now()}-system`,
        role: "system",
        text: `Detected Mood: ${analysis.mood} ${moodEmoji[analysis.mood] || ""}`,
        timestamp: new Date().toISOString(),
        mood: analysis.mood,
      };

      setMessages((prev) => [...prev, systemMessage]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to analyze message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      <div className="chat-header">
        <div>
          <button className="btn-back" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </button>
          <h1>Client Chat</h1>
          <p className="chat-subtitle">
            Share how you are feeling. We will detect the mood automatically.
          </p>
        </div>
      </div>

      <div className="chat-shell">
        <div className="chat-panel">
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-empty">
                <h3>Start the conversation</h3>
                <p>Type a message to get an instant mood analysis.</p>
              </div>
            ) : (
              messages.map((item) => (
                <div
                  key={item.id}
                  className={`chat-bubble ${item.role === "client" ? "client" : "system"}`}
                >
                  <p>{item.text}</p>
                </div>
              ))
            )}

            {loading && (
              <div className="chat-bubble system typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-text">Analyzing...</span>
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={handleSend}>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Type a message like: Today is a good day..."
              rows={3}
              maxLength={500}
            />
            <div className="chat-actions">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={saveEntry}
                  onChange={(event) => setSaveEntry(event.target.checked)}
                />
                <span className="toggle-label">Save as mood entry</span>
              </label>
              <button
                className="btn-primary"
                type="submit"
                disabled={loading || !message.trim()}
              >
                {loading ? "Analyzing..." : "Send"}
              </button>
            </div>
          </form>

          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="analysis-panel">
          <div className="analysis-card">
            <h3>Detected Mood</h3>
            {detectedMood ? (
              <div className="analysis-result">
                <div className="analysis-emoji">
                  {moodEmoji[detectedMood.mood] || "😊"}
                </div>
                <div>
                  <p className="analysis-mood">{detectedMood.mood}</p>
                  <p className="analysis-confidence">
                    Confidence: {(detectedMood.confidence * 100).toFixed(0)}%
                  </p>
                </div>
              </div>
            ) : (
              <p className="analysis-empty">Awaiting your message...</p>
            )}
          </div>

          <div className="analysis-note">
            <h4>How it works</h4>
            <p>
              The system uses a rule-based sentiment model for now and can be
              upgraded later to an AI or NLP service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
