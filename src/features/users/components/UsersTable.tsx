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

function getInitials(name?: string) {
  if (!name || !name.trim()) return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function extractAvatarUrl(image: unknown): string {
  if (!image) return "";
  if (typeof image === "string" && image.trim().startsWith("http")) {
    return image.trim();
  }
  if (typeof image === "object" && image !== null && "url" in image) {
    const url = (image as { url?: unknown }).url;
    if (typeof url === "string" && url.trim().startsWith("http")) {
      return url.trim();
    }
  }
  return "";
}

export function UsersTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: usersData, isLoading } = useUsers();

  const users: User[] =
    usersData?.data?.map((u: UserApiRecord) => ({
      id: u._id,
      name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || "Unknown User",
      deviceName: u.deviceName || "N/A",
      price: `$${u.balance || 0}`,
      date: u.createdAt
        ? new Date(u.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "N/A",
      contract: u.phone || u.email || "N/A",
      email: u.email || "",
      balance: u.balance || 0,
      avatar: extractAvatarUrl(u.image),
    })) || [];

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "USER NAME",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9 border border-border/40 shrink-0">
            {row.original.avatar ? (
              <AvatarImage
                src={row.original.avatar}
                alt={row.original.name}
                className="object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
              {getInitials(row.original.name)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-foreground">
            {row.original.name}
          </span>
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
