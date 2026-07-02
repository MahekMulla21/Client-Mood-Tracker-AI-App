import axios from "axios";
import AsyncStorage from "expo-async-storage";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auth Services
export const authService = {
  register: (data) => api.post("/auth/register", data),
  login: (data) => api.post("/auth/login", data),
  getMe: () => api.get("/auth/me"),
};

// Mood Services
export const moodService = {
  createMood: (data) => api.post("/moods", data),
  getMoods: (startDate, endDate) => {
    let url = "/moods";
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    if (params.toString()) {
      url += "?" + params.toString();
    }
    return api.get(url);
  },
  getMoodStats: (period = "week") => api.get(`/moods/stats?period=${period}`),
  getMoodById: (id) => api.get(`/moods/${id}`),
  updateMood: (id, data) => api.put(`/moods/${id}`, data),
  deleteMood: (id) => api.delete(`/moods/${id}`),
};

export const healthCheck = () => api.get("/health");

export default api;
