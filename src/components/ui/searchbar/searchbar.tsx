import React from 'react'
import { Search, Grid3x3, List } from 'lucide-react'

export default function SearchBar({
  searchTerm,
  // selectedStatus,
  // setSelectedStatus,
  // viewMode,
  // setViewMode,
  setSearchTerm,
}: {
  searchTerm: string
  // selectedStatus: string
  // setSelectedStatus: (status: string) => void
  // viewMode: 'grid' | 'table'
  // setViewMode: (mode: 'grid' | 'table') => void
  setSearchTerm: (v: string) => void
}) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by product name or barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* <div className="flex gap-2">
          <div className="flex bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-4 py-3 transition-all ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
