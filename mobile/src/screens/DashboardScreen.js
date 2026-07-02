import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { moodService } from "../services/api";
import colors from "../styles/colors";
import typography from "../styles/typography";

const DashboardScreen = ({ navigation, user, onLogout }) => {
  const [latestMood, setLatestMood] = React.useState(null);
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
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
      Neutral: "😐",
      Excited: "🤩",
      Tired: "😴",
    };
    return emojis[moodType] || "😊";
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            Welcome, {user?.name || "User"}! 👋
          </Text>
          <Text style={styles.headerSubtitle}>
            Track your mood and emotional wellbeing
          </Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {stats?.emergencyAlert && (
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>⚠️ {stats.alertMessage}</Text>
        </View>
      )}

      {latestMood && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Latest Mood</Text>
          <View style={styles.latestMoodCard}>
            <Text style={styles.latestMoodEmoji}>
              {getMoodEmoji(latestMood.mood)}
            </Text>
            <View style={styles.latestMoodInfo}>
              <Text style={styles.latestMoodLabel}>{latestMood.mood}</Text>
              <Text style={styles.latestMoodReason}>{latestMood.reason}</Text>
            </View>
          </View>
        </View>
      )}

      {stats && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This Week's Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Entries</Text>
              <Text style={styles.statValue}>{stats.totalEntries}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Most Frequent</Text>
              <Text style={styles.statValue}>
                {stats.mostFrequentMood || "N/A"}
              </Text>
            </View>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate("MoodEntry")}
        >
          <Text style={styles.actionButtonText}>➕ Log New Mood</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton]}
          onPress={() => navigation.navigate("History")}
        >
          <Text style={styles.secondaryButtonText}>📋 View History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
  },
  loadingText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 10,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    ...typography.heading,
    color: "white",
    fontSize: 22,
    marginBottom: 5,
  },
  headerSubtitle: {
    ...typography.body,
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 13,
  },
  logoutButton: {
    backgroundColor: colors.danger,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: "white",
    ...typography.label,
    fontSize: 12,
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },
  errorText: {
    color: "#991b1b",
    ...typography.body,
    fontSize: 13,
  },
  alertBox: {
    backgroundColor: "#fef3c7",
    marginHorizontal: 20,
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  alertText: {
    color: "#92400e",
    ...typography.body,
    fontSize: 13,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    ...typography.label,
    color: colors.dark,
    fontSize: 16,
    marginBottom: 12,
  },
  latestMoodCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  latestMoodEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  latestMoodInfo: {
    flex: 1,
  },
  latestMoodLabel: {
    ...typography.label,
    color: colors.dark,
    fontSize: 16,
    marginBottom: 4,
  },
  latestMoodReason: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statLabel: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  statValue: {
    ...typography.heading,
    color: colors.dark,
    fontSize: 20,
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 10,
  },
  actionButtonText: {
    color: "white",
    ...typography.label,
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
  },
  secondaryButtonText: {
    color: "white",
    ...typography.label,
    fontSize: 14,
  },
});

export default DashboardScreen;
