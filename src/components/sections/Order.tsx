'use client'
import React from 'react'
import { Users } from 'lucide-react'
import { Table } from '../ui/Table/table'
import Header from '../ui/Head/head'
import SearchBar from '../ui/searchbar/searchbar'
import { EmptyStatus } from '../ui/Loader/EmptyStatu'
import useDashboard from '@/utils/hooks/useDashboard'
import { Pagination } from '../ui/pagenation/Pagination'
import { usePagination } from '@/utils/hooks/usePagination'
import { useOrder } from '@/utils/hooks/useOrder'

const Order = () => {
  const {
    isLoading,
    orders,
    totalCount,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    itemsPerPage,
  } = useOrder()

  const { data, chartData, isVisible, time, greeting } = useDashboard()

  const {
    pageNumber,
    handlePageJump,
    setPageNumber,
    getPageNumbers,
    pageSize,
    setPageSize,
    totalPages,
  } = usePagination(itemsPerPage)

  // 🧩 Optional edit handler
  const handleEdit = (order: any) => {
    console.log('Edit order:', order)
  }

  // 🧩 Modal state (if you plan to add Add/Edit modal later)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
      <Header
        H1Heading="Order Management"
        Paragraph="Manage your Orders and track performance"
        BtnText="Add Order"
        Updates="3 New Updates"
        StutsUpdates="All Systems Operational"
        setChartData={chartData}
        setData={data}
        isVisible={isVisible}
        time={time}
        greeting={greeting}
        showRangePicker={false}
        Icon={<Users className="text-white" size={28} />}
        showButton={false}
      />

      {/* ✅ Search */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* ✅ Empty or loading status */}
      <EmptyStatus
        isLoading={isLoading}
        entityName="Order"
        filteredLength={orders.length}
        totalCount={totalCount}
        loadingText="Loading..."
      />

      {/* ✅ Table */}
      {!isLoading && orders.length > 0 && (
        <Table setIsModalOpen={setIsModalOpen} data={orders} onEdit={handleEdit}
          showButton={false} />
      )}

      {/* ✅ Pagination */}
      <Pagination
        pageNumber={currentPage}
        setPageNumber={setCurrentPage}
        pageSize={itemsPerPage}
        setPageSize={setPageSize}
        totalPages={Math.ceil(totalCount / itemsPerPage)}
        handlePageJump={handlePageJump}
        getPageNumbers={getPageNumbers}
      />
    </div>
  )
}

export default Order
