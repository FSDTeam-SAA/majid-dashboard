import { StatsCards } from "@/features/dashboard/components/StatsCards";
import { OverviewChart } from "@/features/dashboard/components/OverviewChart";
import { AiStatusCard } from "@/features/dashboard/components/AiStatusCard";
import { RecentUsersTable } from "@/features/dashboard/components/RecentUsersTable";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Real-time device integrity metrics and verification health.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-12 gap-6 items-stretch">
        <OverviewChart />
        <AiStatusCard />
      </div>

      <RecentUsersTable />
    </div>
  );
}
