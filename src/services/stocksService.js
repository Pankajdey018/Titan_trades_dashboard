import { apiClient } from "./apiClient";

export const fetchStocks = async (params = {}) => {
  const response = await apiClient.get("/stocks", { params });
  return response.data;
};

export const searchStocks = async (query) => {
  const response = await apiClient.get("/stocks/search", {
    params: { q: query },
  });
  return response.data;
};

export const fetchStockBySymbol = async (symbol) => {
  const response = await apiClient.get(`/stocks/${symbol}`);
  return response.data;
};

export const fetchStockHistory = async (symbol, params = {}) => {
  const response = await apiClient.get(`/stocks/${symbol}/history`, { params });
  return response.data;
};
