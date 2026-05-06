"use client";

import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserDetailsModal } from "../../users/components/UserDetailsModal";
import { useUsers } from "../../users/hooks/useUsers";

interface User {
  id: string;
  name: string;
  deviceName: string;
  price: string;
  date: string;
  contract: string;
  avatar: string;
}

interface UserApiRecord {
  _id: string;
  firstName: string;
  lastName: string;
  deviceName?: string;
  price?: string;
  createdAt?: string;
  phone?: string;
  email: string;
  image?: { url: string };
}

export function RecentUsersTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: usersData, isLoading } = useUsers();

  const users: User[] =
    usersData?.data?.slice(0, 5).map((u: UserApiRecord) => ({
      id: u._id,
      name: `${u.firstName} ${u.lastName}`,
      deviceName: u.deviceName || "N/A",
      price: u.price || "$0.00",
      date: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A",
      contract: u.phone || u.email,
      avatar: u.image?.url || `https://i.pravatar.cc/150?u=${u._id}`,
    })) || [];

  const columns: ColumnDef<User>[] = [
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
          Real-time device integrity metrics and verification health.
        </p>
      </div>
      <DataTable columns={columns} data={users} isLoading={isLoading} />
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
