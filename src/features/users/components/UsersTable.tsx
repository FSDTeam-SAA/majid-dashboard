"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserDetailsModal } from "./UserDetailsModal";
import { useUsers } from "../hooks/useUsers";

export interface User {
  id: string;
  name: string;
  deviceName: string;
  price: string;
  date: string;
  contract: string;
  avatar: string;
  email: string;
  balance: number;
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
  balance?: number;
  image?: { url: string } | string;
}

export function UsersTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: usersData, isLoading } = useUsers();

  const users: User[] =
    usersData?.data?.map((u: UserApiRecord) => ({
      id: u._id,
      name: `${u.firstName} ${u.lastName}`,
      deviceName: u.deviceName || "N/A",
      price: `$${u.balance || 0}`,
      date: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A",
      contract: u.phone || u.email,
      email: u.email,
      balance: u.balance || 0,
      avatar:
        (typeof u.image === "string" ? u.image : u.image?.url) ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(u.firstName + " " + u.lastName)}&background=random`,
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
      accessorKey: "date",
      header: "DATE",
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
    <div className="space-y-6">
      <DataTable columns={columns} data={users} isLoading={isLoading} />

      <UserDetailsModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        userData={selectedUser}
      />
    </div>
  );
}
