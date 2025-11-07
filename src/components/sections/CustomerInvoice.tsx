"use client"
import { SummaryCard } from "../ui/InvoiceStatsCard/Bestcard";
import { PaymentModal } from "../ui/Models/PaymentModal";
import { Pagination1 } from "../ui/pagenation/pagenation1";
import { useCustomerInvoice } from "@/utils/hooks/useCustomerInvoice";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  FileDown,
  Printer,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  DollarSign,
  X,
  Mail
} from 'lucide-react';
import { InvoiceTableRow } from "../ui/Table/InvoiceTableRow";
export default function CustomerInvoice() {
 


  const {
    invoices,
    expandedInvoices,
    toggleExpand,
    openPaymentModal,
    handleDownload,
    handlePrint,
    summary,
    isModalOpen,
    selectedInvoice,
    amount,
    setAmount,
    submitError,
    isSubmitting,
    closePaymentModal,
    handleSubmitPayment,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    totalPages,
    isLoading
  } = useCustomerInvoice({ useMock: true });

  // Calculate stats
  const paidCount = invoices.filter(i => i.status === 'Paid').length;
  const pendingCount = invoices.filter(i => i.status === 'Pending').length;
  const overdueCount = invoices.filter(i => i.status === 'Overdue').length;
  const partialCount = invoices.filter(i => i.status === 'Partial').length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading invoices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Customer Invoices</h1>
          <p className="text-gray-600">Manage and track all customer invoices</p>
        </div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <SummaryCard
            icon={DollarSign}
            color="indigo"
            label="Total Receivable"
            value={`$${summary.totalReceivable.toLocaleString()}`}
          />
          <SummaryCard
            icon={CheckCircle2}
            color="emerald"
            label="Paid Invoices"
            value={paidCount}
          />
          <SummaryCard
            icon={AlertCircle}
            color="amber"
            label="Partial + Pending"
            value={partialCount + pendingCount}
          />
          <SummaryCard
            icon={AlertCircle}
            color="rose"
            label="Overdue Invoices"
            value={overdueCount}
          />
        </div>

        {/* Invoice List */}
        <div>
          {invoices.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-500">No invoices found</p>
            </div>
          ) : (
            <>
              {invoices.map(inv => (
                <InvoiceTableRow
                  key={inv.id}
                  inv={inv}
                  isExpanded={expandedInvoices.has(inv.id)}
                  toggleExpand={toggleExpand}
                  openPaymentModal={openPaymentModal}
                  handleDownload={handleDownload}
                  handlePrint={handlePrint}
                />
              ))}
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination1
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalPages={totalPages}
          />
        )}

        {/* Payment Modal */}
        <PaymentModal
          isOpen={isModalOpen}
          invoice={selectedInvoice}
          amount={amount}
          setAmount={setAmount}
          submitError={submitError}
          isSubmitting={isSubmitting}
          onClose={closePaymentModal}
          onSubmit={handleSubmitPayment}
        />
      </div>
    </div>
  );
}