"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";
import { Payment } from "./PaymentHistoryTable";

interface TransactionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData: Partial<Payment> | null;
}

export function TransactionDetailsModal({
  isOpen,
  onClose,
  transactionData,
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

          <Badge className="mt-2 bg-green-50 text-green-600 hover:bg-green-50 px-3 py-1 font-semibold flex items-center gap-1 rounded-full text-xs">
            <Check className="w-3 h-3" />
            Success
          </Badge>
        </div>

        <div className="px-8 pb-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-medium text-foreground">TXN-84732</span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Date & Time</span>
              <span className="font-medium text-foreground">
                Oct 24, 2023, 14:32 PM
              </span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">User</span>
              <span className="font-medium text-foreground">
                {transactionData.user}
              </span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium text-foreground">Top-up</span>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Payment Method</span>
              <div className="flex items-center gap-2 font-medium text-foreground">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                Visa ending in 4242
              </div>
            </div>
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground">Billing Address</span>
              <div className="text-right font-medium text-foreground flex flex-col">
                <span>123 Main St, Suite 400</span>
                <span>San Francisco, CA 94105</span>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-bold h-12">
              Download Receipt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
