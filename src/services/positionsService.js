import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const normalizePositionsPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.positions)) return payload.positions;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const fetchPositions = async () => {
  const response = await axios.get(`${API_BASE_URL}/positions`);
  return normalizePositionsPayload(response.data);
};
