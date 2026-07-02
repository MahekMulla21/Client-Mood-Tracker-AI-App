import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { moodService } from "../services/api";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";

const DashboardPage = () => {
  const [latestMood, setLatestMood] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [moodsRes, statsRes] = await Promise.all([
        moodService.getMoods(),
        moodService.getMoodStats("week"),
      ]);

      const moods = moodsRes.data.data;
      if (moods.length > 0) {
        setLatestMood(moods[0]);
      }

      setStats(statsRes.data.stats);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div className="loading-container">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user?.name || "User"}!</h1>
          <p>Track your mood and emotional wellbeing</p>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {stats?.emergencyAlert && (
        <div className="alert-box alert-warning">⚠️ {stats.alertMessage}</div>
      )}

      <div className="dashboard-content">
        {/* Latest Mood */}
        {latestMood && (
          <div className="latest-mood-section">
            <h2>Your Latest Mood</h2>
            <div className="latest-mood-card">
              <div className="latest-mood-emoji">
                {getMoodEmoji(latestMood.mood)}
              </div>
              <div className="latest-mood-info">
                <h3>{latestMood.mood}</h3>
                <p className="mood-reason">{latestMood.reason}</p>
              </div>
              <button
                className="btn-secondary"
                onClick={() => navigate("/mood-entry")}
              >
                Update Mood
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="stats-section">
            <h2>This Week's Statistics</h2>
            <div className="stats-grid">
              <StatCard
                icon="📊"
                label="Total Entries"
                value={stats.totalEntries}
                color="#6366f1"
              />
              <StatCard
                icon="🎯"
                label="Most Frequent"
                value={stats.mostFrequentMood || "N/A"}
                color="#ec4899"
              />
              <StatCard
                icon="📈"
                label="This Week"
                value={`${stats.period}`}
                color="#10b981"
              />
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/mood-entry")}
            >
              ➕ Log New Mood
            </button>
            <button className="btn-secondary" onClick={() => navigate("/chat")}>
              💬 Open Chat
            </button>
            <button
              className="btn-secondary"
              onClick={() => navigate("/history")}
            >
              📋 View History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
