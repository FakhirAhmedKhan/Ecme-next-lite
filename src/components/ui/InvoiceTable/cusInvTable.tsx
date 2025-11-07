import {
  ChevronDown,
  ChevronRight,
  Plus,
  FileDown,
  Printer,
  CheckCircle2,
  AlertCircle,
  CreditCard,
} from 'lucide-react'
import { SmartEmailButton } from '../SmartEmailButton/SmartEmailButton'
import React, { useCallback, useMemo } from 'react'

interface InvoiceCusTableProps {
  inv: CustomerInvoice
  expandedInvoices: Set<string>
  isExpanded: boolean
  toggleExpand: (id: string) => void
  openPaymentModal: (invoice: CustomerInvoice) => void
  handleDownload: (invoice: CustomerInvoice) => void
  handlePrint: (invoice: CustomerInvoice) => void
}

const InvoiceCusTable: React.FC<InvoiceCusTableProps> = ({
  inv,
  isExpanded,
  toggleExpand,
  openPaymentModal,
  handleDownload,
  handlePrint,
}) => {
  // 🔹 Derived values
  const outstanding = useMemo(
    () => Math.max(0, inv.totalAmount - inv.paidAmount),
    [inv.totalAmount, inv.paidAmount]
  )

  // 🔹 Status badge
  const getStatusBadge = useCallback(() => {
    if (outstanding === 0)
      return (
        <Badge color="emerald" icon={CheckCircle2}>
          Paid
        </Badge>
      )
    if (inv.paidAmount > 0)
      return (
        <Badge color="amber" icon={AlertCircle}>
          Partial
        </Badge>
      )
    return (
      <Badge color="rose" icon={AlertCircle}>
        Unpaid
      </Badge>
    )
  }, [outstanding, inv.paidAmount])

  // 🔹 Generic badge subcomponent
  const Badge = ({
    color,
    children,
    icon: Icon,
  }: {
    color: string
    children: React.ReactNode
    icon: React.ElementType
  }) => (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-${color}-50 text-${color}-700 border border-${color}-200`}
    >
      <Icon className="w-3 h-3" />
      {children}
    </span>
  )

  // 🔹 Format date
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  return (
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-100/50 border border-gray-200 overflow-hidden transition-all hover:shadow-xl">
      <div className="p-6">
        {/* ─── Header Row ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Expand toggle + Info */}
          <div className="flex-1 flex items-start gap-4">
            <button
              onClick={() => toggleExpand(inv.id)}
              className="mt-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle invoice details"
            >
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-500" />
              )}
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-gray-900">#{inv.id}</h3>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-gray-500">{formatDate(inv.createdAt)}</p>
            </div>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-3 gap-6 md:min-w-[500px]">
            <AmountBlock label="Total Amount" value={inv.totalAmount} color="gray" />
            <AmountBlock label="Paid" value={inv.paidAmount} color="emerald" />
            <AmountBlock
              label="Outstanding"
              value={outstanding}
              color={outstanding > 0 ? 'rose' : 'emerald'}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <ActionButton
              onClick={() => openPaymentModal(inv)}
              disabled={outstanding <= 0}
              title="Add Payment"
              color="indigo"
              icon={Plus}
            />
            <ActionButton
              onClick={(e) => {
                e.stopPropagation()
                handleDownload(inv)
              }}
              title="Download PDF"
              color="gray"
              icon={FileDown}
            />
            <ActionButton
              onClick={(e) => {
                e.stopPropagation()
                handlePrint(inv)
              }}
              title="Print"
              color="gray"
              icon={Printer}
            />
            <SmartEmailButton email={inv.email} />
          </div>
        </div>
      </div>

      {/* ─── Expanded Section ─────────────────────────── */}
      {isExpanded && (
        <div className="border-t border-gray-100 bg-gradient-to-br from-gray-50 to-slate-50 p-6 space-y-6">
          <PaymentSection payments={inv.payments} />
          {inv.returns?.length > 0 && <ReturnSection returns={inv.returns} />}
        </div>
      )}
    </div>
  )
}

/* ─── Reusable Subcomponents ─────────────────────────── */

const AmountBlock = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="text-center">
    <p className="text-xs text-gray-500 mb-1 font-medium">{label}</p>
    <p className={`text-lg font-bold text-${color}-700`}>{value.toLocaleString() || 0}</p>
  </div>
)

const ActionButton = ({
  onClick,
  disabled,
  title,
  color,
  icon: Icon,
}: {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  title: string
  color: string
  icon: React.ElementType
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-3 rounded-xl bg-${color}-600 text-white hover:bg-${color}-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-${color}-200/50`}
    title={title}
  >
    <Icon className="w-5 h-5" />
  </button>
)

const PaymentSection = ({ payments }: { payments?: any[] }) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <CreditCard className="w-5 h-5 text-indigo-600" />
      <h4 className="font-semibold text-gray-900">Payment History</h4>
      <span className="text-sm text-gray-500">({payments?.length || 0} payments)</span>
    </div>

    {payments?.length ? (
      <div className="space-y-3">
        {payments.map((p, index) => (
          <div
            key={p.id}
            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-indigo-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 mb-1">#{index + 1}</p>
                <p className="text-sm text-gray-500">
                  {new Date(p.paidAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <span className="font-bold text-emerald-700 text-lg bg-emerald-50 px-4 py-2 rounded-lg">
                {p.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <EmptyState icon={CreditCard} text="No payments recorded yet" />
    )}
  </div>
)

const ReturnSection = ({ returns }: { returns: any[] }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <AlertCircle className="w-5 h-5 text-rose-600" />
      <h4 className="font-semibold text-gray-900">Return History</h4>
      <span className="text-sm text-gray-500">
        ({returns.length} {returns.length === 1 ? 'return' : 'returns'})
      </span>
    </div>
    <div className="space-y-3">
      {returns.map((r, idx) => (
        <div
          key={r.id}
          className="bg-white rounded-xl p-4 border border-gray-200 hover:border-rose-200 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 mb-1">
                #{idx + 1} — {r.narration || 'Return'}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(r.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <span className="font-bold text-rose-700 text-lg bg-rose-50 px-4 py-2 rounded-lg">
              {r.amount.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
)

const EmptyState = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
  <div className="text-center py-8">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-3">
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
    <p className="text-gray-500">{text}</p>
  </div>
)

export default InvoiceCusTable
