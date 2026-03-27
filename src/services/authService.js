import { apiClient, setAuthToken } from "./apiClient";

export const registerUser = async (payload) => {
  const response = await apiClient.post("/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await apiClient.post("/auth/login", payload);
  const token = response?.data?.token || response?.data?.accessToken;

  if (token) setAuthToken(token);

  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
};
