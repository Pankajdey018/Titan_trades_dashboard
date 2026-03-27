import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const normalizeHoldingsPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.holdings)) return payload.holdings;
  if (Array.isArray(payload?.allHoldings)) return payload.allHoldings;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchHoldings = async () => {
  const response = await axios.get(`${API_BASE_URL}/allHoldings`);
  return normalizeHoldingsPayload(response.data);
};
