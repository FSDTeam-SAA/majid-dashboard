"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, FileText, Smartphone } from "lucide-react";
import { Invoice } from "./InvoiceTable";

interface InvoicePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceData: Partial<Invoice> | null;
}

export function InvoicePreviewModal({
  isOpen,
  onClose,
  invoiceData,
}: InvoicePreviewModalProps) {
  if (!invoiceData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-none shadow-lg rounded-2xl">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xs font-bold tracking-wider text-muted-foreground uppercase flex justify-between items-center">
            Quick Preview
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center pt-2 pb-6 px-6">
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Invoice #{invoiceData.id?.replace("INV-", "") || "8841"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Issued to {invoiceData.customer}
          </p>

          <Badge className="mt-4 bg-green-50 text-green-600 hover:bg-green-50 px-3 py-1 font-semibold flex items-center gap-1 rounded-full text-xs">
            <Check className="w-3 h-3" />
            Success
          </Badge>
        </div>

        <div className="bg-slate-50 px-8 py-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
              Summary
            </h3>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-muted-foreground">Subtotal</span>
              <span>$800.00</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span className="text-muted-foreground">Tax (5%)</span>
              <span>$50.00</span>
            </div>
            <div className="flex justify-between text-base font-bold pt-2 border-t border-border/50">
              <span className="text-foreground">Total Due</span>
              <span className="text-blue-600">$850.00</span>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">
              Items
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white border border-border rounded-lg flex items-center justify-center text-muted-foreground shadow-sm">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    iPhone 14 Pro Max
                  </span>
                  <span className="text-xs text-muted-foreground">
                    IMEI: 3567. 2109
                  </span>
                </div>
              </div>
              <span className="text-sm font-bold">$850</span>
            </div>
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full rounded-full border-primary text-primary hover:bg-primary/5 font-bold h-12"
            >
              Download Pdf
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
