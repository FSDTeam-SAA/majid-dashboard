import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const stats = [
  { label: "Total Users", value: "842,019", change: "+ 36% ↑" },
  { label: "Active Shopkeepers", value: "12,402", change: "+ 36% ↑" },
  { label: "Total Credit", value: "2.8M", change: "+ 36% ↑" },
  { label: "Used Credit", value: "$142,0.00", change: "+ 36% ↑" },
];

export function StatsCards() {
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
                <span className="text-2xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-primary flex items-center gap-0.5">
                  {stat.change}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
