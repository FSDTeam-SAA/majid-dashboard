import { api } from "@/lib/api";

export const getAllPayments = async () => {
  const response = await api.get("/api/v1/payment/all-payments");
  return response.data;
};

export const getMyPayments = async () => {
  const response = await api.get("/api/v1/payment/my-payments");
  return response.data;
};

export const createPaymentSession = async (data: {
  amount: number;
  subscriptionId: string;
}) => {
  const response = await api.post("/api/v1/payment/create-payment", data);
  return response.data;
};
