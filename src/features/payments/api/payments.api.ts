import { api } from "@/lib/api";

export const getAllPayments = async () => {
  const response = await api.get("/payment/all-payments");
  return response.data;
};

export const getMyPayments = async () => {
  const response = await api.get("/payment/my-payments");
  return response.data;
};

export const createPaymentSession = async (data: {
  amount: number;
  subscriptionId: string;
}) => {
  const response = await api.post("/payment/create-payment", data);
  return response.data;
};

export const updatePaymentStatus = async (
  id: string,
  paymentStatus: "pending" | "paid" | "failed",
) => {
  const response = await api.patch(`/payment/status/${id}`, { paymentStatus });
  return response.data;
};

export const deletePayment = async (id: string) => {
  const response = await api.delete(`/payment/${id}`);
  return response.data;
};
