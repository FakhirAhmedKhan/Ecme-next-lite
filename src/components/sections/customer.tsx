'use client'
import React from 'react'
import { Users } from 'lucide-react';
import { Table } from '../ui/Table/table'
import Header from "../ui/Head/head";
import SearchBar from '../ui/searchbar/searchbar'
import { EmptyStatus } from '../ui/Loader/EmptyStatu'
import useDashboard from '@/utils/hooks/useDashboard';
import { useCustomer } from '@/utils/hooks/useCustomer'
import { Pagination } from '../ui/pagenation/Pagination'
import CustomerModalForm from '../ui/Models/CustomerModalForm'

const Customer = () => {
  const {
    isLoading,
    Customer,
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
  } = useCustomer()
  const {
    data,
    chartData,
    isVisible,
    time,
    greeting,
  } = useDashboard();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">

      <Header
        setIsModalOpen={setIsModalOpen}
        H1Heading="Customer Management"
        Paragraph="Manage your Customer and track performance"
        BtnText="Add Customer"
        Updates="3 New Updates"
        StutsUpdates="All Systems Operational"
        setChartData={chartData}
        setData={data}
        isVisible={isVisible}
        time={time}
        greeting={greeting}
        showRangePicker={false}
        Icon={<Users className="text-white" size={28} />} // ✅ dynamic icon

      />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <EmptyStatus
        isLoading={isLoading}
        entityName={'Customer'}
        filteredCustomerLength={Customer}
        totalCount={pageSize} loadingText={'Loading...'}
      />

      <Table
        setIsModalOpen={setIsModalOpen}
        data={Customer}
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

      <CustomerModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onSave={handleSave}
        // fetchSuppliers={Customer}
        // createSupplier={createSupplier}
        H2Tittle="Add New Customer"
        Paragraph="Fill in the Customer details below"
        ModelLabel="Customer Name"
        Numberlabel="Phone Number"
        showSuccessText="Customer created successfully!"
      />
    </div>

  )
}

export default Customer
