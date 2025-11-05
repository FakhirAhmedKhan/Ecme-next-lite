import React from 'react'
import { Edit2, X, Check, AlertCircle } from 'lucide-react'
import { StockProductRowProps, StatusConfig } from '@/@types/stock'

const statusConfig: StatusConfig = {
  0: {
    label: 'Available',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: Check,
  },
  1: {
    label: 'In Repair',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: AlertCircle,
  },
  2: {
    label: 'Repaired',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Check,
  },
  3: {
    label: 'Scrap',
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: X,
  },
  4: {
    label: 'Sold',
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: Check,
  },
  5: {
    label: 'Vendor Return',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: AlertCircle,
  },
}

const StockProductRow: React.FC<StockProductRowProps> = ({ product, onEdit }) => {
  const StatusIcon = statusConfig[product.status]?.icon
  return (
    <tr className="hover:bg-blue-50/50 transition-colors">
      <td className="px-6 py-4">
        <span className="font-mono text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {product.barcode}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-900 font-medium">
        {product.name}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium ${product.condition === 'Excellent'
            ? 'bg-green-100 text-green-700'
            : product.condition === 'Good'
              ? 'bg-blue-100 text-blue-700'
              : product.condition === 'Fair'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }`}
        >
          {product.condition}
        </span>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-1">
        {/* <div className="translate-y-[1px]">
          <CurrencyLogo className="w-4 h-4 shrink-0" />
        </div> */}
        <span className="leading-tight">{product.price?.toLocaleString()}</span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${statusConfig[product.status]?.color}`}
        >
          {StatusIcon && <StatusIcon className="w-3.5 h-3.5" />}
          {statusConfig[product.status]?.label}
        </span>
      </td>
      <td className="px-6 py-4 text-gray-900 font-medium">
        {product.storage}
      </td>
      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onEdit(product)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
        >
          <Edit2 className="w-3.5 h-3.5" /> Edit
        </button>
      </td>
    </tr>
  )
}

export default StockProductRow
