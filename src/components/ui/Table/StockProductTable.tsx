import React, { useState } from 'react'
import { Package } from 'lucide-react'
import StockProductRow from './StockProductRow'
import { StockProductTableProps } from '@/@types/stock'

const StockProductTable: React.FC<StockProductTableProps> = ({ products, onEdit }) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const totalPages = Math.ceil(products.length / pageSize)
  const paginated = products.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize,
  )

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              {[
                'Barcode',
                'Name',
                'Condition',
                'Price',
                'Status',
                'Storage',
                'Action',
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Package className="w-12 h-12 text-gray-300" />
                    <p className="text-gray-500 font-medium">
                      No products found
                    </p>
                    <p className="text-gray-400 text-sm">
                      Try adjusting your search
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((p) => (
                <StockProductRow
                  key={p.id}
                  product={p}
                  onEdit={onEdit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* <StockProductPagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
      /> */}
    </div>
  )
}

export default StockProductTable
