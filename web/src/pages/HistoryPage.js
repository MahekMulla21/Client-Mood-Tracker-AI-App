import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { moodService } from "../services/api";
import MoodCard from "../components/MoodCard";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "../styles/history.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const HistoryPage = () => {
  const [moods, setMoods] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("week");
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [period]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [moodsRes, statsRes] = await Promise.all([
        moodService.getMoods(),
        moodService.getMoodStats(period),
      ]);

      setMoods(moodsRes.data.data);
      setStats(statsRes.data.stats);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMood = async (id) => {
    if (window.confirm("Are you sure you want to delete this mood entry?")) {
      try {
        await moodService.deleteMood(id);
        setMoods(moods.filter((m) => m._id !== id));
      } catch (err) {
        alert("Failed to delete mood entry");
      }
    }
  };

  const handleEditMood = (id) => {
    // For now, just navigate to mood entry page
    // In a full implementation, you would prefill the form with existing data
    navigate(`/mood-entry`);
  };

  const chartData = {
    labels: stats?.weeklyData ? Object.keys(stats.weeklyData) : [],
    datasets: [
      {
        label: "Mood Entries",
        data: stats?.weeklyData ? Object.values(stats.weeklyData) : [],
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const moodCountData = {
    labels: stats?.moodCounts ? Object.keys(stats.moodCounts) : [],
    datasets: [
      {
        label: "Mood Count",
        data: stats?.moodCounts ? Object.values(stats.moodCounts) : [],
        backgroundColor: [
          "#10b981",
          "#ef4444",
          "#f97316",
          "#a855f7",
          "#f59e0b",
          "#6b7280",
          "#ec4899",
          "#84cc16",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return <div className="loading-container">Loading history...</div>;
  }

  return (
    <div className="history-page">
      <div className="history-header">
        <button className="btn-back" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
        <h1>Mood History</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Period Filter */}
      <div className="period-filter">
        <button
          className={`period-btn ${period === "week" ? "active" : ""}`}
          onClick={() => setPeriod("week")}
        >
          This Week
        </button>
        <button
          className={`period-btn ${period === "month" ? "active" : ""}`}
          onClick={() => setPeriod("month")}
        >
          This Month
        </button>
        <button
          className={`period-btn ${period === "all" ? "active" : ""}`}
          onClick={() => setPeriod("all")}
        >
          All Time
        </button>
      </div>

      {/* Charts Section */}
      {stats && (
        <div className="charts-section">
          <div className="chart-container">
            <h2>Weekly Trend</h2>
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="chart-container">
            <h2>Mood Distribution</h2>
            <Bar data={moodCountData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Moods List */}
      <div className="moods-list-section">
        <h2>Your Mood Entries</h2>

        {moods.length === 0 ? (
          <div className="empty-state">
            <p>No mood entries yet. Start tracking your mood!</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/mood-entry")}
            >
              ➕ Log Your First Mood
            </button>
          </div>
        ) : (
          <div className="moods-list">
            {moods.map((mood) => (
              <MoodCard
                key={mood._id}
                mood={mood}
                onDelete={handleDeleteMood}
                onEdit={handleEditMood}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
