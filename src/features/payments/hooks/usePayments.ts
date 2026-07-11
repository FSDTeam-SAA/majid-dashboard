import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllPayments,
  getMyPayments,
  createPaymentSession,
  updatePaymentStatus,
  deletePayment,
} from "../api/payments.api";

export function useAllPayments() {
  return useQuery({
    queryKey: ["all-payments"],
    queryFn: getAllPayments,
  });
}

export function useMyPayments() {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
}

export function useCreatePaymentSession() {
  return useMutation({
    mutationFn: createPaymentSession,
  });
}

export function useUpdatePaymentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      paymentStatus,
    }: {
      id: string;
      paymentStatus: "pending" | "paid" | "failed";
    }) => updatePaymentStatus(id, paymentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-payments"] });
      queryClient.invalidateQueries({ queryKey: ["my-payments"] });
    },
  });
}

export function useDeletePayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-payments"] });
      queryClient.invalidateQueries({ queryKey: ["my-payments"] });
    },
  });
}
