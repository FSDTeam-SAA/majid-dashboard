import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getInvoices(params?: Record<string, unknown>) {
  const res = await axios.get(`${BASE_URL}/invoices`, { params });
  return res.data;
}

export async function getInvoiceById(id: string) {
  const res = await axios.get(`${BASE_URL}/invoices/${id}`);
  return res.data;
}
