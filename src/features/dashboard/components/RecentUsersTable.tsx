"use client";

import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserDetailsModal } from "../../users/components/UserDetailsModal";
import {
  DashboardUserRow,
  useDashboardOverview,
} from "../hooks/useDashboardOverview";

export function RecentUsersTable() {
  const [selectedUser, setSelectedUser] = useState<DashboardUserRow | null>(
    null,
  );
  const { recentUsers, isLoading } = useDashboardOverview();

  const columns: ColumnDef<DashboardUserRow>[] = [
    {
      accessorKey: "name",
      header: "USER NAME",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={row.original.avatar} />
            <AvatarFallback>{row.original.name[0]}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "deviceName",
      header: "DEVICE NAME",
    },
    {
      accessorKey: "price",
      header: "PRICE",
    },
    {
      accessorKey: "date",
      header: "DATE",
    },
    {
      accessorKey: "contract",
      header: "CONTRACT",
    },
    {
      id: "actions",
      header: "ACTION",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          className="h-8 rounded-full border-primary text-primary px-6"
          onClick={() => setSelectedUser(row.original)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Recent Users</h2>
        <p className="text-xs text-muted-foreground">
          Latest users from the backend, sorted by registration date.
        </p>
      </div>
      <DataTable columns={columns} data={recentUsers} isLoading={isLoading} />
      <div className="flex justify-end mt-4">
        <Link href="/all-users">
          <Button className="rounded-lg px-8">View All</Button>
        </Link>
      </div>

      <UserDetailsModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        userData={selectedUser}
      />
    </div>
  );
}
