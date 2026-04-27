"use client";

import {
  LineChart,
  Line,
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

const data = [
  { name: "Jan", users: 10000, shopkeepers: 8000 },
  { name: "Feb", users: 15000, shopkeepers: 11000 },
  { name: "Mar", users: 12000, shopkeepers: 9500 },
  { name: "Apr", users: 18000, shopkeepers: 13000 },
  { name: "May", users: 16000, shopkeepers: 12000 },
  { name: "Jun", users: 22000, shopkeepers: 15000 },
  { name: "Jul", users: 20000, shopkeepers: 14000 },
  { name: "Aug", users: 25000, shopkeepers: 18000 },
  { name: "Sep", users: 23000, shopkeepers: 16000 },
  { name: "Oct", users: 28000, shopkeepers: 20000 },
  { name: "Nov", users: 26000, shopkeepers: 19000 },
  { name: "Dec", users: 32000, shopkeepers: 22000 },
];

export function OverviewChart() {
  return (
    <Card className="col-span-full lg:col-span-8 border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <CardTitle className="text-lg font-bold">New Members</CardTitle>
        <Tabs defaultValue="30days">
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
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
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
        </div>
      </CardContent>
    </Card>
  );
}
