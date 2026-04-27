import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getDashboardStats() {
  const res = await axios.get(`${BASE_URL}/dashboard/stats`);
  return res.data;
}

export async function getDashboardOverview() {
  const res = await axios.get(`${BASE_URL}/dashboard/overview`);
  return res.data;
}
