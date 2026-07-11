"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";
import { useDashboardChart } from "../hooks/useDashboardChart";
import { useDashboardOverview } from "../hooks/useDashboardOverview";

interface ChartDataRecord {
  date: string;
  user: number;
  shopkeeper: number;
}

export function OverviewChart() {
  const [filter, setFilter] = useState("30days");
  const { data: chartData, isLoading, isError } = useDashboardChart(filter);
  const { recentUsers, isLoading: isUsersLoading } = useDashboardOverview();

  const apiData =
    chartData?.data?.map((d: ChartDataRecord) => ({
      name: new Date(d.date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      users: d.user,
      shopkeepers: d.shopkeeper,
    })) || [];

  const fallbackData = recentUsers
    .slice()
    .reverse()
    .map((user) => ({
      name: user.date,
      users: 1,
      shopkeepers: 0,
    }));

  const formattedData = apiData.length > 0 ? apiData : fallbackData;
  const showLoading =
    isLoading || (isUsersLoading && formattedData.length === 0);
  const showEmpty = !showLoading && formattedData.length === 0;

  return (
    <Card className="col-span-full lg:col-span-8 border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-lg font-bold">New Members</CardTitle>
        <Tabs defaultValue="30days" onValueChange={setFilter}>
          <TabsList className="bg-sidebar-accent h-8 p-1">
            <TabsTrigger value="30days" className="text-[10px] h-6 px-3">
              30 Days
            </TabsTrigger>
            <TabsTrigger value="6months" className="text-[10px] h-6 px-3">
              6 Months
            </TabsTrigger>
            <TabsTrigger value="12months" className="text-[10px] h-6 px-3">
              12 Months
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          {showLoading ? (
            <Skeleton className="w-full h-full rounded-xl" />
          ) : showEmpty ? (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
              {isError
                ? "Chart data load korte problem hocche. Backend response check koro."
                : "Chart data available nai."}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#84c225" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#84c225" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorShopkeepers"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B9EE8" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#3B9EE8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: "#94a3b8" }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#84c225"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
                <Area
                  type="monotone"
                  dataKey="shopkeepers"
                  stroke="#3B9EE8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorShopkeepers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
