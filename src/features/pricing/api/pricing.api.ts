import { api } from "@/lib/api";

export const getAllSubscriptions = async () => {
  const response = await api.get("/subscription/all");
  return response.data;
};

export const createSubscription = async (data: Record<string, unknown>) => {
  const response = await api.post("/subscription/create", data);
  return response.data;
};

export const updateSubscription = async (
  id: string,
  data: Record<string, unknown>,
) => {
  const response = await api.put(`/subscription/update/${id}`, data);
  return response.data;
};
