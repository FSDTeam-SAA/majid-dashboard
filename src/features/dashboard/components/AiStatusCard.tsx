import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function AiStatusCard() {
  return (
    <Card className="col-span-full lg:col-span-4 border-none shadow-sm h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <div className="bg-primary/10 p-2 rounded-lg">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#84c225"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="flex flex-col">
          <CardTitle className="text-sm font-bold">AI Engine Status</CardTitle>
          <span className="text-[10px] text-muted-foreground">
            Neural Core v4.2.0
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-between gap-6 py-4">
        {/* Progress Bars */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-muted-foreground uppercase font-semibold">
                Inference Accuracy
              </span>
              <span className="text-primary font-bold">99.82%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "99.82%" }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px]">
              <span className="text-muted-foreground uppercase font-semibold">
                Processing Latency
              </span>
              <span className="text-foreground font-bold">12ms</span>
            </div>
            <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full"
                style={{ width: "30%" }}
              />
            </div>
          </div>
        </div>

        {/* Circular Gauge Placeholder */}
        <div className="flex items-center gap-4 mt-auto">
          <div className="relative w-16 h-16">
            <svg
              viewBox="0 0 36 36"
              className="w-full h-full transform -rotate-90"
            >
              <path
                className="stroke-secondary"
                strokeWidth="4"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="stroke-primary"
                strokeWidth="4"
                strokeDasharray="70, 100"
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold">70%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold">Market Utilization</span>
            <span className="text-[9px] text-muted-foreground">
              Active nodes vs licensed capacity
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
