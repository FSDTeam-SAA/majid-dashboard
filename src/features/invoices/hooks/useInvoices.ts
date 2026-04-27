import { useQuery } from "@tanstack/react-query";
import { getInvoices, getInvoiceById } from "../api/invoices.api";

export function useInvoices(params?: Record<string, unknown>) {
  return useQuery({
    queryKey: ["invoices", params],
    queryFn: () => getInvoices(params),
  });
}

export function useInvoice(id: string) {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id),
    enabled: !!id,
  });
}
