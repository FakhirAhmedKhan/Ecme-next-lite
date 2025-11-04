import { Package } from 'lucide-react'

const statusConfig: Record<number | string, { label: string; color: string }> =
{
  0: {
    label: 'Available',
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  1: {
    label: 'Sold',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  2: {
    label: 'Reserved',
    color: 'bg-amber-100 text-amber-700 border-amber-200',
  },
}

export default function ProductHeader({ product }: { product: any }) {
  const status = statusConfig?.[product?.status] ?? statusConfig[0];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="flex gap-6">
          <div className="w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center shadow-inner">
            <Package size={48} className="text-slate-400" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold text-slate-900">
                {product?.name}
              </h1>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${status.color}`}
              >
                {status.label}
              </span>
            </div>
            <p className="text-slate-600 mb-4">
              Product ID:{' '}
              <span className="font-semibold text-blue-600">
                {product?.barcode}
              </span>
            </p>

            <div className="flex flex-wrap gap-3">
              <InfoPill
                label="Storage"
                value={product?.storage || '—'}
                color="blue"
              />
              <InfoPill
                label="Color"
                value={product?.color || '—'}
                color="purple"
              />
              <InfoPill
                label="Condition"
                value={product?.condition || '—'}
                color="emerald"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoPill({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div
      className={`px-4 py-2 bg-${color}-50 rounded-lg border border-${color}-100`}
    >
      <p className={`text-xs text-${color}-600 font-medium mb-1`}>
        {label}
      </p>
      <p className={`text-sm font-bold text-${color}-900`}>{value}</p>
    </div>
  )
}
