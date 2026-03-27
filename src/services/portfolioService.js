import { apiClient } from "./apiClient";

export const normalizePositionsPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.positions)) return payload.positions;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const normalizeHoldingsPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.holdings)) return payload.holdings;
  if (Array.isArray(payload?.allHoldings)) return payload.allHoldings;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchPortfolioPositions = async () => {
  const response = await apiClient.get("/portfolio/positions");
  return normalizePositionsPayload(response.data);
};

export const fetchPortfolioHoldings = async () => {
  const response = await apiClient.get("/portfolio/holdings");
  return normalizeHoldingsPayload(response.data);
};
