import React from 'react'

import { usePagination } from './usePagination'
export const Pagination = ({ setPageSize, setPageNumber, totalPages, pageNumber, handlePageJump, pageSize, getPageNumbers }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-6 px-4">
      {/* Rows per page selector */}
      <div className="flex items-center gap-3 text-sm">
        <span className="text-gray-600 font-medium">Rows per page:</span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
            setPageNumber(1)
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 bg-white hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
          className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors font-medium"
          aria-label="Previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                  ...
                </span>
              )
            }

            return (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={`min-w-[40px] h-10 px-3 py-2 rounded-lg font-medium transition-all ${pageNumber === page
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
              >
                {page}
              </button>
            )
          })}
        </div>

        {/* Next button */}
        <button
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
          disabled={pageNumber === totalPages}
          className="px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors font-medium"
          aria-label="Next page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Jump to page input */}
        <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
          <span className="text-sm text-gray-600">Go to:</span>
          <input
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            min={1}
            max={totalPages}
            value={pageNumber}
            onChange={handlePageJump}
            className="w-16 text-center border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>
    </div>
  )
}
