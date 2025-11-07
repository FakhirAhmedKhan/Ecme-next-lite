import { SummaryCard } from "../InvoiceStatsCard/Bestcard";
import { AlertCircle, CheckCircle2, DollarSign } from "lucide-react";

export const InvoiceStats: React.FC<{ invoices: Invoice[]; totalReceivable: number }> = ({
  invoices,
  totalReceivable = 0
}) => {
  const items = Array.isArray(invoices) ? invoices : [];
  const pendingPayments = items.filter((inv) => Number(inv.totalAmount) > Number(inv.paidAmount)).length;
  const paidInvoices = items.filter((inv) => Number(inv.totalAmount) === Number(inv.paidAmount)).length;
  const safeTotal = Number(totalReceivable ?? 0) || 0;

  return (
    <div className= "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" >
    <SummaryCard
        value={ pendingPayments }
  title = "Pending Payments"
  statusText = "Awaiting Payment"
  iconBgClass = "p-3 bg-rose-100 rounded-xl text-rose-600"
  icon = { AlertCircle }
  BorderClasses = "border border-rose-200 shadow-rose-100/50"
    />
    <SummaryCard
        value={ paidInvoices }
  title = "Paid Invoices"
  statusText = "Completed"
  iconBgClass = "p-3 bg-emerald-100 rounded-xl text-emerald-600"
  icon = { CheckCircle2 }
  BorderClasses = "border border-emerald-200 shadow-emerald-100/50"
    />
    <SummaryCard
        value={ safeTotal }
  title = "Total Receivable"
  statusText = "Outstanding Amount"
  icon = { DollarSign }
  iconBgClass = "p-3 bg-indigo-100 rounded-xl text-indigo-600"
  BorderClasses = "shadow-indigo-100/50 border border-indigo-200"
    />
    </div>
  );
};
