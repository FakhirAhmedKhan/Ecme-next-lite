import { AlertCircle, CheckCircle2, ChevronDown, ChevronRight, CreditCard, FileDownIcon, Mail, Plus, Printer } from "lucide-react";

export const InvoiceTableRow = ({
  inv,
  isExpanded,
  toggleExpand,
  openPaymentModal,
  handleDownload,
  handlePrint
}: {
  inv: CustomerInvoice;
  isExpanded: boolean;
  toggleExpand: (id: string) => void;
  openPaymentModal: (invoice: CustomerInvoice) => void;
  handleDownload: (invoice: CustomerInvoice) => void;
  handlePrint: (invoice: CustomerInvoice) => void;
}) => {
  const outstanding = Math.max(0, inv.totalAmount - inv.paidAmount);
  const StatusBadge = ({ status }: { status: string }) => {
    const configs = {
      Paid: { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
      Partial: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: AlertCircle },
      Unpaid: { color: 'bg-rose-50 text-rose-700 border-rose-200', icon: AlertCircle },
      Pending: { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: AlertCircle },
      Overdue: { color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle }
    };

    const config = configs[status as keyof typeof configs] || configs.Unpaid;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    );
  };
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

  const handleEmailClick = () => {
    if (inv.email) {
      window.location.href = `mailto:${inv.email}?subject=Invoice ${inv.id}`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all mb-4">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Left: Expand + Info */}
          <div className="flex-1 flex items-start gap-3">
            <button
              onClick={() => toggleExpand(inv.id)}
              className="mt-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle details"
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-900">{inv.id}</h3>
                <StatusBadge status={inv.status} />
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">{inv.customerName}</p>
              <p className="text-xs text-gray-500">{formatDate(inv.createdAt)}</p>
            </div>
          </div>

          {/* Middle: Amounts */}
          <div className="grid grid-cols-3 gap-4 lg:min-w-[400px]">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1 font-medium">Total</p>
              <p className="text-base font-bold text-gray-700">${inv.totalAmount.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1 font-medium">Paid</p>
              <p className="text-base font-bold text-emerald-700">${inv.paidAmount.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-1 font-medium">Outstanding</p>
              <p className={`text-base font-bold ${outstanding > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                ${outstanding.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => openPaymentModal(inv)}
              disabled={outstanding <= 0}
              className="p-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md"
              title="Add Payment"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDownload(inv)}
              className="p-3 rounded-xl bg-gray-600 text-white hover:bg-gray-700 transition-all shadow-md"
              title="Download PDF"
            >
              <FileDownIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => handlePrint(inv)}
              className="p-3 rounded-xl bg-gray-600 text-white hover:bg-gray-700 transition-all shadow-md"
              title="Print"
            >
              <Printer className="w-5 h-5" />
            </button>
            {inv.email && (
              <button
                onClick={handleEmailClick}
                className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Section */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-slate-50 p-6 space-y-6">
          {/* Payment History */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <h4 className="font-semibold text-gray-900">Payment History</h4>
              <span className="text-sm text-gray-500">({inv.payments?.length || 0})</span>
            </div>

            {inv.payments?.length ? (
              <div className="space-y-3">
                {inv.payments.map((p, idx) => (
                  <div key={p.id} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Payment #{idx + 1}</p>
                        <p className="text-sm text-gray-500">{formatDate(p.paidAt)}</p>
                      </div>
                      <span className="font-bold text-emerald-700 text-lg bg-emerald-50 px-4 py-2 rounded-lg">
                        ${p.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500">No payments recorded yet</p>
              </div>
            )}
          </div>

          {/* Return History */}
          {inv.returns?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <h4 className="font-semibold text-gray-900">Return History</h4>
                <span className="text-sm text-gray-500">({inv.returns.length})</span>
              </div>
              <div className="space-y-3">
                {inv.returns.map((r, idx) => (
                  <div key={r.id} className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Return #{idx + 1}</p>
                        {r.narration && <p className="text-sm text-gray-600">{r.narration}</p>}
                        <p className="text-sm text-gray-500">{formatDate(r.createdAt)}</p>
                      </div>
                      <span className="font-bold text-rose-700 text-lg bg-rose-50 px-4 py-2 rounded-lg">
                        ${r.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
