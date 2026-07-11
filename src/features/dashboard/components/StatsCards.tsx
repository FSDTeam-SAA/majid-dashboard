"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardOverview } from "../hooks/useDashboardOverview";

export function StatsCards() {
  const { summary, formattedSummary, isLoading, isFetching } =
    useDashboardOverview();

  const stats = [
    {
      label: "Total Users",
      value: formattedSummary.totalUsers,
      meta: `${summary.totalPayments} total payments tracked`,
    },
    {
      label: "Active Shopkeepers",
      value: formattedSummary.totalShopkeepers,
      meta: `${formattedSummary.memberMix} of all accounts are shopkeepers`,
    },
    {
      label: "Total Credit",
      value: formattedSummary.totalCredit,
      meta: `${summary.totalPayments} payment records from backend`,
    },
    {
      label: "Used Credit",
      value: formattedSummary.usedCredit,
      meta: `${summary.completedPayments} completed payments`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="border-none shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </span>
              <div className="flex items-baseline justify-between mt-2">
                {isLoading ? (
                  <Skeleton className="h-8 w-28" />
                ) : (
                  <span className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </span>
                )}
              </div>
              <span className="mt-2 text-xs text-muted-foreground">
                {isLoading
                  ? "Loading live backend metrics..."
                  : isFetching
                    ? "Refreshing metrics..."
                    : stat.meta}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
