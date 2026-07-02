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

const MoodEntryScreen = ({ navigation }) => {
  const [selectedMood, setSelectedMood] = React.useState("");
  const [reason, setReason] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const moods = [
    "Happy",
    "Sad",
    "Angry",
    "Anxious",
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
      Neutral: "😐",
      Excited: "🤩",
      Tired: "😴",
    };
    return emojis[moodType] || "😊";
  };

  const handleSubmit = async () => {
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
        navigation.navigate("Dashboard");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save mood entry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>
          Select your current mood and tell us why
        </Text>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {success && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>{success}</Text>
          </View>
        )}

        <View style={styles.moodSection}>
          <Text style={styles.sectionLabel}>Select Your Mood</Text>
          <View style={styles.moodGrid}>
            {moods.map((mood) => (
              <TouchableOpacity
                key={mood}
                style={[
                  styles.moodOption,
                  selectedMood === mood && styles.moodOptionSelected,
                ]}
                onPress={() => setSelectedMood(mood)}
              >
                <Text style={styles.moodEmoji}>{getMoodEmoji(mood)}</Text>
                <Text style={styles.moodName}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.reasonSection}>
          <Text style={styles.sectionLabel}>What's the reason? *</Text>
          <View style={styles.inputBox}>
            <input
              style={styles.reasonInput}
              placeholder="Tell us what's going on or what caused this mood..."
              value={reason}
              onChangeText={setReason}
              maxLength={500}
              multiline
            />
          </View>
          <Text style={styles.charCount}>{reason.length}/500 characters</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!selectedMood || !reason.trim() || loading) &&
                styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!selectedMood || !reason.trim() || loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Save Mood Entry</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  contentContainer: {
    paddingBottom: 20,
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
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    ...typography.heading,
    color: colors.dark,
    fontSize: 24,
    marginBottom: 5,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  errorBox: {
    backgroundColor: "#fee2e2",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
  },
  errorText: {
    color: "#991b1b",
    ...typography.body,
    fontSize: 13,
  },
  successBox: {
    backgroundColor: "#dcfce7",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.secondary,
  },
  successText: {
    color: "#166534",
    ...typography.body,
    fontSize: 13,
  },
  moodSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    ...typography.label,
    color: colors.dark,
    fontSize: 14,
    marginBottom: 12,
  },
  moodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  moodOption: {
    width: "32%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.border,
  },
  moodOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: "rgba(99, 102, 241, 0.05)",
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodName: {
    ...typography.body,
    color: colors.dark,
    fontSize: 12,
    fontWeight: "600",
  },
  reasonSection: {
    marginBottom: 24,
  },
  inputBox: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 8,
  },
  reasonInput: {
    fontSize: 14,
    color: colors.dark,
    flex: 1,
  },
  charCount: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: "right",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#9ca3af",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
    ...typography.label,
    fontSize: 14,
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "white",
    ...typography.label,
    fontSize: 14,
  },
});

export default MoodEntryScreen;
