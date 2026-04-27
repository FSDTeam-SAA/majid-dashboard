"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Download, Trash2, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { InvoicePreviewModal } from "./InvoicePreviewModal";

export interface Invoice {
  id: string;
  customer: string;
  amount: string;
  date: string;
  status: "PAID" | "PENDING" | "OVERDUE";
}

const mockData: Invoice[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `INV-8842`,
  customer: "Sarah Jenkins",
  amount: "$1,200.00",
  date: "Oct 12, 2023",
  status: "PAID",
}));

import { cn } from "@/lib/utils";

export function InvoiceTable() {
  const [page, setPage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: "id",
      header: "INVOICE ID",
      cell: ({ row }) => (
        <span className="text-blue-500 font-medium">#{row.original.id}</span>
      ),
    },
    {
      accessorKey: "customer",
      header: "CUSTOMER",
    },
    {
      accessorKey: "amount",
      header: "AMOUNT",
      cell: ({ row }) => (
        <span className="font-bold">{row.original.amount}</span>
      ),
    },
    {
      accessorKey: "date",
      header: "DATE",
    },
    {
      accessorKey: "status",
      header: "STATUS",
      cell: ({ row }) => (
        <Badge
          className={cn(
            "rounded-md px-3 py-1 font-semibold text-[10px]",
            row.original.status === "PAID"
              ? "bg-green-100 text-green-600 hover:bg-green-100"
              : row.original.status === "PENDING"
                ? "bg-orange-100 text-orange-600 hover:bg-orange-100"
                : "bg-red-100 text-red-600 hover:bg-red-100",
          )}
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-primary"
            onClick={() => setSelectedInvoice(row.original)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-primary"
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, customer..."
            className="pl-10 h-11 bg-card border-border/50 rounded-lg"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-[120px] h-11 bg-card">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="h-11 w-11 bg-card">
            <Calendar className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <DataTable columns={columns} data={mockData} />

      <div className="flex items-center justify-between mt-6">
        <p className="text-xs text-muted-foreground">
          Showing 1 to 10 of 1,482 invoices
        </p>
        <Pagination
          currentPage={page}
          totalPages={148}
          onPageChange={setPage}
        />
      </div>

      <InvoicePreviewModal
        isOpen={!!selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
        invoiceData={selectedInvoice}
      />
    </div>
  );
}
