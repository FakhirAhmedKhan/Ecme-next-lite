'use client'
import React from 'react'
import { Eye } from 'lucide-react'
import { Stock, StatusConfig } from '@/@types/stock'

interface StockTableProps {
  stocks: Stock[]
  handleViewDetails: (id: string) => void
  statusConfig: StatusConfig
}

const StockTable: React.FC<StockTableProps> = ({ stocks, handleViewDetails, statusConfig }) => {
  if (stocks.length === 0) {
    return (
      <div className="text-center py-10 text-slate-500">No stocks found.</div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">#</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Supplier</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Stock Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total Quantity</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Available</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Reorder Level</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Profit</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stocks.map((stock, index) => (
              <tr key={stock.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-blue-600">{stock.suppliarName}</td>
                <td className="px-6 py-4 text-sm font-medium">{stock.stockTitle}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{stock.totalQuantity}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{stock.quantityAvailable}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{stock.reorderLevel}</td>
                <td className="px-6 py-4 text-sm text-slate-600">${stock.stockPrice.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-slate-600">${stock.totalProfit.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig[String(stock.status || 0)]?.color || ''}`}>
                    {statusConfig[String(stock.status || 0)]?.label || 'Unknown'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(stock.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                    onClick={() => handleViewDetails(stock.id)}
                  >
                    <Eye size={18} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
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

export default StockTable
