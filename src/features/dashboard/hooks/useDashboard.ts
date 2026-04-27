import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getDashboardOverview } from "../api/dashboard.api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
}

export function useDashboardOverview() {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: getDashboardOverview,
  });
}
