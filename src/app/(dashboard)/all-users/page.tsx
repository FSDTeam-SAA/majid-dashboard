import { UsersTable } from "@/features/users/components/UsersTable";

export default function AllUsersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Recent All Users</h1>
        <p className="text-sm text-muted-foreground">
          Real-time device integrity metrics and verification health.
        </p>
      </div>

      <UsersTable />
    </div>
  );
}
