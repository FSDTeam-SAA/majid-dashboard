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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";
import { useDashboardChart } from "../hooks/useDashboardChart";

interface ChartDataRecord {
  date: string;
  user: number;
  shopkeeper: number;
}

export function OverviewChart() {
  const [filter, setFilter] = useState("30days");
  const { data: chartData, isLoading } = useDashboardChart(filter);

  const formattedData =
    chartData?.data?.map((d: ChartDataRecord) => ({
      name: new Date(d.date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      users: d.user,
      shopkeepers: d.shopkeeper,
    })) || [];

  return (
    <Card className="col-span-full border-none shadow-sm">
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
          {isLoading ? (
            <div className="w-full h-full bg-muted animate-pulse rounded-xl" />
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
