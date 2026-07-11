"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { TransactionDetailsModal } from "./TransactionDetailsModal";

import {
  useAllPayments,
  useDeletePayment,
  useUpdatePaymentStatus,
} from "../hooks/usePayments";

export interface Payment {
  id: string;
  originalId: string;
  user: string;
  amount: string;
  date: string;
  dateTime: string;
  status: "PAID" | "PENDING" | "FAILED";
  rawStatus: "pending" | "paid" | "failed";
  method: string;
}

interface PaymentApiRecord {
  _id: string;
  userId?: {
    firstName?: string;
    lastName?: string;
  };
  amount: number;
  createdAt: string;
  paymentStatus?: "pending" | "paid" | "failed";
  paymentMethod?: string;
}

const ITEMS_PER_PAGE = 10;

export function PaymentHistoryTable() {
  const [page, setPage] = useState(1);
  const { data: paymentsData, isLoading } = useAllPayments();
  const updateStatusMutation = useUpdatePaymentStatus();
  const deletePaymentMutation = useDeletePayment();
  const [selectedTransaction, setSelectedTransaction] =
    useState<Payment | null>(null);

  const paymentRecords: PaymentApiRecord[] = Array.isArray(paymentsData?.data)
    ? paymentsData.data
    : [];

  const payments: Payment[] = paymentRecords.map((p) => ({
    id: p._id.substring(0, 8).toUpperCase(),
    originalId: p._id,
    user: p.userId?.firstName
      ? `${p.userId.firstName} ${p.userId.lastName ?? ""}`.trim()
      : "Unknown User",
    amount: `$${(p.amount || 0).toFixed(2)}`,
    date: new Date(p.createdAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    dateTime: new Date(p.createdAt).toLocaleString(),
    status:
      p.paymentStatus === "paid"
        ? "PAID"
        : p.paymentStatus === "failed"
          ? "FAILED"
          : "PENDING",
    rawStatus: p.paymentStatus || "pending",
    method: p.paymentMethod || "Stripe",
  }));

  const totalPages =
    paymentsData?.meta?.totalPage ||
    paymentsData?.meta?.totalPages ||
    Math.max(1, Math.ceil(payments.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);

  const paginatedPayments = payments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "id",
      header: "TRANSACTION ID",
      cell: ({ row }) => (
        <span className="text-blue-500 font-medium">#{row.original.id}</span>
      ),
    },
    {
      accessorKey: "user",
      header: "USER",
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
              : row.original.status === "FAILED"
                ? "bg-red-100 text-red-600 hover:bg-red-100"
                : "bg-orange-100 text-orange-600 hover:bg-orange-100",
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
            onClick={() => setSelectedTransaction(row.original)}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-destructive"
            onClick={() => setSelectedTransaction(row.original)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DataTable
        columns={columns}
        data={paginatedPayments}
        isLoading={isLoading}
      />
      <div className="flex items-center justify-center mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <TransactionDetailsModal
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        transactionData={selectedTransaction}
        isUpdating={updateStatusMutation.isPending}
        isDeleting={deletePaymentMutation.isPending}
        onStatusChange={async (paymentStatus) => {
          if (!selectedTransaction) return;

          try {
            await updateStatusMutation.mutateAsync({
              id: selectedTransaction.originalId,
              paymentStatus,
            });

            setSelectedTransaction((current) =>
              current
                ? {
                    ...current,
                    rawStatus: paymentStatus,
                    status:
                      paymentStatus === "paid"
                        ? "PAID"
                        : paymentStatus === "failed"
                          ? "FAILED"
                          : "PENDING",
                  }
                : current,
            );
            toast.success("Payment status updated successfully");
          } catch (error: unknown) {
            const message =
              typeof error === "object" &&
              error !== null &&
              "response" in error &&
              typeof (error as { response?: { data?: { message?: string } } })
                .response?.data?.message === "string"
                ? (error as { response?: { data?: { message?: string } } })
                    .response?.data?.message
                : "Failed to update payment status";

            toast.error(message);
          }
        }}
        onDelete={async () => {
          if (!selectedTransaction) return;

          try {
            await deletePaymentMutation.mutateAsync(
              selectedTransaction.originalId,
            );
            toast.success("Payment deleted successfully");
            setSelectedTransaction(null);
          } catch (error: unknown) {
            const message =
              typeof error === "object" &&
              error !== null &&
              "response" in error &&
              typeof (error as { response?: { data?: { message?: string } } })
                .response?.data?.message === "string"
                ? (error as { response?: { data?: { message?: string } } })
                    .response?.data?.message
                : "Failed to delete payment";

            toast.error(message);
          }
        }}
      />
    </div>
  );
}
