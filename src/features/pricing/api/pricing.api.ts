import { api } from "@/lib/api";
import {
  CreateSubscriptionValues,
  SubscriptionResponse,
  SingleSubscriptionResponse,
} from "../types";

export const getAllSubscriptions = async (): Promise<SubscriptionResponse> => {
  const response = await api.get("/subscription/all");
  return response.data;
};

export const createSubscription = async (
  data: CreateSubscriptionValues,
): Promise<SingleSubscriptionResponse> => {
  const response = await api.post("/subscription/create", data);
  return response.data;
};

export const updateSubscription = async (
  id: string,
  data: Partial<CreateSubscriptionValues>,
): Promise<SingleSubscriptionResponse> => {
  const response = await api.put(`/subscription/update/${id}`, data);
  return response.data;
};
