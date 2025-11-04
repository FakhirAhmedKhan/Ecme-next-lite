'use client'
import { useProducts } from '@/utils/hooks/useProducts'
import { LiaCartArrowDownSolid } from 'react-icons/lia'
import useDashboard from '@/utils/hooks/useDashboard'
import { usePagination } from '@/utils/hooks/usePagination'
import Header from '../ui/Head/head'
import SearchBar from '../ui/searchbar/searchbar'
import { EmptyStatus } from '../ui/Loader/EmptyStatu'
import ProductTable from '../ui/Table/ProductTable'
import { Pagination } from '../ui/pagenation/Pagination'

export default function ProductSection() {
  const {
    products,
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    isLoading,
    handleViewDetails,
  } = useProducts()

  const {
    pageNumber,
    handlePageJump,
    setPageNumber,
    getPageNumbers,
    pageSize,
    setPageSize,
    totalPages,
  } = usePagination(10)
  const statusConfig = {
    available: { label: 'Available', color: 'text-green-600 border-green-200 bg-green-50' },
    sold: { label: 'Sold', color: 'text-red-600 border-red-200 bg-red-50' },
  }
  const { data, chartData, isVisible, time, greeting } = useDashboard()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-9xl mx-auto">
        <div className="mb-8">
          <Header
            H1Heading="Product Management"
            Paragraph="Manage your Product and track performance"
            BtnText="Add Product"
            Updates="3 New Updates"
            StutsUpdates="All Systems Operational"
            setData={data}
            isVisible={isVisible}
            time={time}
            showRangePicker={false}
            Icon={<LiaCartArrowDownSolid className="text-white" size={28} />}
            showButton={false}
          // setChartData={''}
          // setIsModalOpen={() => { }}
          />
        </div>

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <EmptyStatus
          isLoading={isLoading}
          entityName="Product"
          filteredStatusPropsLength={products.length}
          totalCount={products.length}
          loadingText="Loading..."
        />

        <ProductTable
          products={products}
          handleViewDetails={handleViewDetails}
          statusConfig={statusConfig}
          
        />

        {products.length > 0 && (
          <Pagination
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalPages={totalPages}
            handlePageJump={handlePageJump}
            getPageNumbers={getPageNumbers}
          />
        )}
      </div>
    </div>
  )
}
