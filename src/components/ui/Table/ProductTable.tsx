import React from 'react'
import { Eye } from 'lucide-react'
import { Product, StatusConfig } from '@/@types/stock'

interface ProductTableProps {
  products: Product[];
  handleViewDetails: (id: string) => void;
  statusConfig: StatusConfig;
}

export default function ProductTable({ products, handleViewDetails, statusConfig }: ProductTableProps) {

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                BarCode
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Storage
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Color
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product: Product, index: number) => (
              <tr
                key={product.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">
                  {product.barcode}
                </td>
                <td className="px-6 py-4 text-sm text-slate-900 font-medium">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {product.storage}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {product.color}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {product.condition}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[product.status]?.color}`}
                  >
                    {statusConfig[product.status]?.label}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-indigo-600">
                  <div className="flex items-center gap-2 text-2xl">
                    <span>{product.price}</span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <button
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                    onClick={() =>
                      handleViewDetails(product.id)
                    }
                  >
                    <Eye
                      size={18}
                      className="text-slate-600 group-hover:text-blue-600 transition-colors"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
