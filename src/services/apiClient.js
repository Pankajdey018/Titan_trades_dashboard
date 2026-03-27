import axios from "axios";

const API_ROOT = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: `${API_ROOT}/api/v1`,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const setAuthToken = (token) => {
  if (!token) {
    localStorage.removeItem("authToken");
    return;
  }

  localStorage.setItem("authToken", token);
};
