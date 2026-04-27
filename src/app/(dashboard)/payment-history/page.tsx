import { PaymentHistoryTable } from "@/features/payments/components/PaymentHistoryTable";

export default function PaymentHistoryPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Payment History</h1>
        <p className="text-sm text-muted-foreground">
          Track your payment status and invoices.
        </p>
      </div>

      <PaymentHistoryTable />
    </div>
  );
}
