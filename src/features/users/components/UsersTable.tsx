"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserDetailsModal } from "./UserDetailsModal";

export interface User {
  id: string;
  name: string;
  deviceName: string;
  price: string;
  date: string;
  contract: string;
  avatar: string;
}

const mockData: User[] = [
  {
    id: "1",
    name: "Edward",
    deviceName: "iPhone 15 Pro",
    price: "$42.00",
    date: "March 13, 2014",
    contract: "(704) 555-0127",
    avatar: "https://i.pravatar.cc/150?u=edward",
  },
  {
    id: "2",
    name: "Sophia",
    deviceName: "Samsung Galaxy S23",
    price: "$39.00",
    date: "February 28, 2023",
    contract: "(202) 555-0198",
    avatar: "https://i.pravatar.cc/150?u=sophia",
  },
  {
    id: "3",
    name: "Liam",
    deviceName: "Google Pixel 7",
    price: "$35.00",
    date: "January 15, 2023",
    contract: "(415) 555-0142",
    avatar: "https://i.pravatar.cc/150?u=liam",
  },
  {
    id: "4",
    name: "Olivia",
    deviceName: "OnePlus 11",
    price: "$32.00",
    date: "April 5, 2023",
    contract: "(305) 555-0186",
    avatar: "https://i.pravatar.cc/150?u=olivia",
  },
  {
    id: "5",
    name: "Edward",
    deviceName: "iPhone 15 Pro",
    price: "$42.00",
    date: "March 13, 2014",
    contract: "(704) 555-0127",
    avatar: "https://i.pravatar.cc/150?u=edward2",
  },
  {
    id: "6",
    name: "Sophia",
    deviceName: "Samsung Galaxy S23",
    price: "$39.00",
    date: "February 28, 2023",
    contract: "(202) 555-0198",
    avatar: "https://i.pravatar.cc/150?u=sophia2",
  },
  {
    id: "7",
    name: "Liam",
    deviceName: "Google Pixel 7",
    price: "$35.00",
    date: "January 15, 2023",
    contract: "(415) 555-0142",
    avatar: "https://i.pravatar.cc/150?u=liam2",
  },
  {
    id: "8",
    name: "Olivia",
    deviceName: "OnePlus 11",
    price: "$32.00",
    date: "April 5, 2023",
    contract: "(305) 555-0186",
    avatar: "https://i.pravatar.cc/150?u=olivia2",
  },
];

export function UsersTable() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
          className="h-8 rounded-full border-primary text-primary hover:bg-primary hover:text-white px-6"
          onClick={() => setSelectedUser(row.original)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable columns={columns} data={mockData} />

      <UserDetailsModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        userData={selectedUser}
      />
    </div>
  );
}
