import { Calendar, Clock, User } from 'lucide-react'

type TabType = 'orders' | 'returns' | 'repairs';

export default function ProductTabContent({ activeTab, product }: { activeTab: TabType; product: any }) {
  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })

  const emptyMsg = {
    orders: 'No orders available',
    returns: 'No returns available',
    repairs: 'No repairs available',
  }[activeTab]

  const list = product[activeTab] ?? []

  if (!list.length)
    return <p className="text-center text-slate-500 py-6">{emptyMsg}</p>

  return (
    <div className="p-6 space-y-4">
      {activeTab === 'orders' &&
        list.map((order: any) => (
          <div
            key={order.orderId}
            className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-semibold text-slate-900 mb-1">
                  Order #{order.orderId}
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar size={14} />
                  <span>{formatDate(order.orderDate)}</span>
                </div>
              </div>
              <StatusBadge text={order.status} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 mb-1">Customer</p>
                <div className="flex items-center gap-2">
                  <User size={16} className="text-slate-400" />
                  <p className="font-semibold text-slate-900">
                    {order.customerName}
                  </p>
                </div>
              </div>

              {/* ✅ Updated Total Price Section with CurrencyLogo */}
              <div>
                <p className="text-xs text-slate-500 mb-1">Total Price</p>
                <div className="flex items-center gap-2 text-lg font-bold text-indigo-600">
                  {/* <CurrencyLogo className="w-5 h-5" /> */}
                  <span>${order.totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

      {activeTab === 'returns' &&
        list.map((r: any) => (
          <div
            key={r.returnId}
            className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all"
          >
            <p className="font-semibold text-slate-900 mb-2">
              Return #{r.returnId}
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
              <Clock size={14} />
              {formatDate(r.createdAt)}
            </div>
            <p className="text-sm text-slate-900 mb-1">{r.narration}</p>
            <p className="text-xs text-slate-500">Quantity: {r.quantity}</p>
          </div>
        ))}

      {activeTab === 'repairs' &&
        list.map((rep: any) => (
          <div
            key={rep.repairId}
            className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all"
          >
            <p className="font-semibold text-slate-900 mb-2">
              Repair #{rep.repairId}
            </p>
            <p className="text-sm text-slate-600 mb-2">{rep.itemStatus}</p>
            <p className="text-sm text-slate-900">
              Technician: {rep.technician || 'N/A'}
            </p>
            <p className="flex items-center gap-2 text-sm text-purple-600 font-semibold mt-1">
              {/* <CurrencyLogo className="w-4 h-4" /> */}
              <span>{rep.repairingCost}</span>
            </p>
          </div>
        ))}
    </div>
  )
}

function StatusBadge({ text }: { text: string }) {
  const map: any = {
    completed: 'bg-blue-100 text-blue-700 border-blue-200',
    pending: 'bg-amber-100 text-amber-700 border-amber-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  }
  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${map[text] || 'bg-gray-100 text-gray-700 border-gray-200'
        }`}
    >
      {text || 'N/A'}
    </span>
  )
}
