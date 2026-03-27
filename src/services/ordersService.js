import { apiClient } from "./apiClient";

const normalizeOrderList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.orders)) return payload.orders;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

export const createOrder = async (payload) => {
  const response = await apiClient.post("/orders", payload);
  return response.data;
};

export const fetchOrders = async (params = {}) => {
  const response = await apiClient.get("/orders", { params });
  return normalizeOrderList(response.data);
};

export const fetchOrderById = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await apiClient.post(`/orders/${id}/cancel`);
  return response.data;
};
