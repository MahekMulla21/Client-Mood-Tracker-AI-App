import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { moodService } from "../services/api";
import colors from "../styles/colors";
import typography from "../styles/typography";

const HistoryScreen = ({ navigation }) => {
  const [moods, setMoods] = React.useState([]);
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [period, setPeriod] = React.useState("week");

  React.useEffect(() => {
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

  const handleDeleteMood = (id) => {
    Alert.alert(
      "Delete Mood Entry",
      "Are you sure you want to delete this mood entry?",
      [
        { text: "Cancel", onPress: () => {}, style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await moodService.deleteMood(id);
              setMoods(moods.filter((m) => m._id !== id));
            } catch (err) {
              Alert.alert("Error", "Failed to delete mood entry");
            }
          },
          style: "destructive",
        },
      ],
    );
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

  const formatDate = (dateString) => {
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const MoodCard = ({ mood }) => (
    <View style={styles.moodCard}>
      <View style={styles.moodCardHeader}>
        <View style={styles.moodInfo}>
          <Text style={styles.moodEmoji}>{getMoodEmoji(mood.mood)}</Text>
          <Text style={styles.moodLabel}>{mood.mood}</Text>
        </View>
        <Text style={styles.moodDate}>{formatDate(mood.createdAt)}</Text>
      </View>

      <Text style={styles.moodReason}>{mood.reason}</Text>

      {mood.suggestion && (
        <View style={styles.suggestionBox}>
          <Text style={styles.suggestionLabel}>💡 Suggestion:</Text>
          <Text style={styles.suggestionText}>{mood.suggestion}</Text>
        </View>
      )}

      <View style={styles.moodActions}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteMood(mood._id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading history...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Mood History</Text>
      </View>

      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.periodFilter}>
        {["week", "month", "all"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.periodButton,
              period === p && styles.periodButtonActive,
            ]}
            onPress={() => setPeriod(p)}
          >
            <Text
              style={[
                styles.periodButtonText,
                period === p && styles.periodButtonTextActive,
              ]}
            >
              {p === "week" ? "Week" : p === "month" ? "Month" : "All"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {moods.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No mood entries yet</Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={() => navigation.navigate("MoodEntry")}
            >
              <Text style={styles.emptyStateButtonText}>
                Log Your First Mood
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          moods.map((mood) => <MoodCard key={mood._id} mood={mood} />)
        )}
      </ScrollView>
    </View>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 40,
  },
  backButton: {
    ...typography.body,
    color: colors.primary,
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    ...typography.heading,
    color: colors.dark,
    fontSize: 24,
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#991b1b",
    ...typography.body,
    fontSize: 13,
  },
  periodFilter: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  periodButton: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.border,
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  periodButtonText: {
    ...typography.label,
    color: colors.text,
    fontSize: 12,
  },
  periodButtonTextActive: {
    color: "white",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  moodCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  moodCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  moodInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodLabel: {
    ...typography.label,
    color: colors.dark,
    fontSize: 14,
  },
  moodDate: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 12,
  },
  moodReason: {
    ...typography.body,
    color: colors.text,
    fontSize: 13,
    marginBottom: 10,
    lineHeight: 18,
  },
  suggestionBox: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  suggestionLabel: {
    ...typography.label,
    color: "#92400e",
    fontSize: 12,
    marginBottom: 4,
  },
  suggestionText: {
    ...typography.body,
    color: "#92400e",
    fontSize: 12,
    lineHeight: 16,
  },
  moodActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: "white",
    ...typography.label,
    fontSize: 12,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  emptyStateButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  emptyStateButtonText: {
    color: "white",
    ...typography.label,
  },
});

export default HistoryScreen;
