'use client'
import React from 'react'
import { useSuppliers } from '@/utils/hooks/useSuppliers'
import Header from '../ui/Head/Header'
import SearchBar from '../ui/searchbar/searchbar'
import { EmptyStatus } from '../ui/Loader/EmptyStatu'
import { Table } from '../ui/Table/table'
import { Pagination } from '../ui/pagenation/Pagination'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">

      <Header
        setIsModalOpen={setIsModalOpen}
        H1Heading="Supplier Management"
        Paragraph="Manage your suppliers and track performance"
        BtnText="Add supplier"
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
