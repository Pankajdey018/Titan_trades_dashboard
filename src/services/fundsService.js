import { apiClient } from "./apiClient";

export const fetchFunds = async () => {
  const response = await apiClient.get("/funds");
  return response.data;
};

export const addFunds = async (payload) => {
  const response = await apiClient.post("/funds/add", payload);
  return response.data;
};

export const fetchFundTransactions = async (params = {}) => {
  const response = await apiClient.get("/funds/transactions", { params });
  return response.data;
};
