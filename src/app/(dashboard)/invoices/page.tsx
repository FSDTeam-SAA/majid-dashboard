import { InvoiceTable } from "@/features/invoices/components/InvoiceTable";

export default function InvoicesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Invoice List</h1>
        <p className="text-sm text-muted-foreground">
          Track payments and manage records effortlessly
        </p>
      </div>

      <InvoiceTable />
    </div>
  );
}
