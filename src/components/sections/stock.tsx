'use client'
import React from 'react'
import { Users } from 'lucide-react'
import Header from '../ui/Head/head'
import SearchBar from '../ui/searchbar/searchbar'
import { Table } from '../ui/Table/table'
import { EmptyStatus } from '../ui/Loader/EmptyStatu'
import { Pagination } from '../ui/pagenation/Pagination'
import { usePagination } from '@/utils/hooks/usePagination'
import useDashboard from '@/utils/hooks/useDashboard'
import { useStock } from '@/utils/hooks/useStock'
import StockTable from '../ui/Table/StockTable'

const Stock = () => {
  const { data, chartData, isVisible, time, greeting } = useDashboard()
  const {
    filteredStocks,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    searchTerm,
    setSearchTerm,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    totalPages,
  } = useStock()

  const { pageNumber: p, handlePageJump, setPageNumber: setPN, getPageNumbers } = usePagination(pageSize)

  const statusConfig = {
    active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700' },
    inactive: { label: 'Inactive', color: 'bg-slate-200 text-slate-600' },
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <Header
        H1Heading="Stock Management"
        Paragraph="Manage your stocks and track performance"
        BtnText="Add Stock"
        Updates="3 New Updates"
        StutsUpdates="All Systems Operational"
        setData={data}
        isVisible={isVisible}
        time={time}
        greeting={greeting}
        showRangePicker={false}
        Icon={<Users className="text-white" size={28} />}
        showButton={false}
      />

      {/* Search */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Empty/loading */}
      <EmptyStatus
        isLoading={isLoading}
        entityName="Stock"
        filteredLength={filteredStocks.length}
        totalCount={totalPages * pageSize}
        loadingText="Loading..."
      />

      {/* Table */}
      {!isLoading && filteredStocks.length > 0 && (
        <StockTable
          stocks={filteredStocks}
          // handleViewDetails={handleViewDetails}
          statusConfig={statusConfig}
        />
      )}

      {/* Pagination */}
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
        handlePageJump={handlePageJump}
        getPageNumbers={getPageNumbers}
      />
    </div>
  )
}

export default Stock
