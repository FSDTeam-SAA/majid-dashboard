"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  deviceName: string;
  price: string;
  date: string;
  contract: string;
  avatar: string;
}

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
    cell: () => (
      <Button
        variant="outline"
        size="sm"
        className="h-8 rounded-full border-primary text-primary hover:bg-primary hover:text-white px-6"
      >
        View
      </Button>
    ),
  },
];

const data: User[] = [
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
];

export function RecentUsersTable() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-bold">Recent Users</h2>
        <p className="text-xs text-muted-foreground">
          Real-time device integrity metrics and verification health.
        </p>
      </div>
      <DataTable columns={columns} data={data} />
      <div className="flex justify-end mt-4">
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-8">
          View All
        </Button>
      </div>
    </div>
  );
}
