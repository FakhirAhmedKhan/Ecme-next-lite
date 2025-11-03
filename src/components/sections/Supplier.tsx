'use client'
import React from 'react'
import Header from "../ui/Head/head";
import { Table } from '../ui/Table/table'
import { UserPlus2, } from 'lucide-react';
import SearchBar from '../ui/searchbar/searchbar'
import { EmptyStatus } from '../ui/Loader/EmptyStatu'
import useDashboard from '@/utils/hooks/useDashboard';
import { Pagination } from '../ui/pagenation/Pagination'
import { useSuppliers } from '@/utils/hooks/useSuppliers'
import SupplierModalForm from '../ui/Models/SupplierModels'

const Supplier = () => {
  const {
    isLoading,
    suppliers,
    searchTerm,
    setSearchTerm,
    handleEdit,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    totalPages,
    getPageNumbers,
    handlePageJump,
    isModalOpen,
    setIsModalOpen,
  } = useSuppliers()
  const {
    chartData,
    data,
    isVisible,
    time,
    greeting,
  } = useDashboard();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">

      <Header
        setIsModalOpen={setIsModalOpen}
        H1Heading="Supplier Management"
        Paragraph="Manage your suppliers and track performance"
        BtnText="Add supplier"
        setChartData={chartData}
        Updates="3 New Updates"
        StutsUpdates="All Systems Operational"
        setData={data}
        isVisible={isVisible}
        time={time}
        showRangePicker={false}
        Icon={<UserPlus2 className="text-white" size={28} />} // ✅ dynamic icon
        greeting={greeting}
      />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <EmptyStatus
        isLoading={isLoading}
        entityName={'supplier'}
        filteredSuppliersLength={suppliers}
        totalCount={pageSize} loadingText={'Loading...'}
      />

      <Table
        setIsModalOpen={setIsModalOpen}
        data={suppliers}
        onEdit={handleEdit}
      />

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalPages={totalPages}
        handlePageJump={handlePageJump}
        getPageNumbers={getPageNumbers}
      />

      <SupplierModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onSave={handleSave}
        // fetchSuppliers={suppliers}
        // createSupplier={createSupplier}
        H2Tittle="Add New Supplier"
        Paragraph="Fill in the supplier details below"
        ModelLabel="Supplier Name"
        Numberlabel="Phone Number"
        showSuccessText="Supplier created successfully!"
      />
    </div>

  )
}

export default Supplier
