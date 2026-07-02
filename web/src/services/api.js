import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

console.log("API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

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

  analyzeMood: (message, saveEntry = false) =>
    api.post("/moods/analyze", { message, saveEntry }),

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

// Health Check
export const healthCheck = () => api.get("/health");

export default api;
