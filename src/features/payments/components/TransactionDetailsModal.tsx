"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, CreditCard, Trash2 } from "lucide-react";
import { Payment } from "./PaymentHistoryTable";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: Partial<Payment> | null;
  onStatusChange: (paymentStatus: "pending" | "paid" | "failed") => void;
  onDelete: () => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
}

export function TransactionDetailsModal({
  isOpen,
  onClose,
  transactionData,
  onStatusChange,
  onDelete,
  isUpdating,
  isDeleting,
}: TransactionDetailsModalProps) {
  if (!transactionData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-none shadow-lg rounded-2xl">
        <DialogHeader className="px-8 pt-6 pb-2">
          <DialogTitle className="text-base font-bold text-foreground">
            Transaction Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center pt-4 pb-8 px-8">
          <h2 className="text-[40px] font-bold text-foreground">
            {transactionData.amount?.includes("+")
              ? transactionData.amount
              : `+${transactionData.amount || "0.00"}`}
          </h2>

          <Badge
            className={
              transactionData.status === "PAID"
                ? "mt-2 bg-green-50 text-green-600 hover:bg-green-50 px-3 py-1 font-semibold flex items-center gap-1 rounded-full text-xs"
                : "mt-2 bg-orange-50 text-orange-600 hover:bg-orange-50 px-3 py-1 font-semibold flex items-center gap-1 rounded-full text-xs"
            }
          >
            <Check className="w-3 h-3" />
            {transactionData.status === "PAID" ? "Success" : "Pending"}
          </Badge>
        </div>

        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-medium text-foreground">
                {transactionData.id ? `#${transactionData.id}` : "N/A"}
              </span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium text-foreground">
                {transactionData.dateTime || transactionData.date || "N/A"}
              </span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">User</span>
              <span className="font-medium text-foreground">
                {transactionData.user}
              </span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <div className="min-w-[160px]">
                <Select
                  value={transactionData.rawStatus || "pending"}
                  onValueChange={(value) =>
                    onStatusChange(value as "pending" | "paid" | "failed")
                  }
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-full bg-background text-foreground">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <div className="flex items-center gap-2 font-medium text-foreground">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                Backend record
              </div>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Reference</span>
              <span className="font-medium text-foreground">
                {transactionData.originalId || "N/A"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 pt-4">
            <Button
              variant="destructive"
              className="w-full rounded-full font-bold h-12"
              onClick={onDelete}
              disabled={isDeleting || transactionData.rawStatus === "paid"}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete Payment"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
