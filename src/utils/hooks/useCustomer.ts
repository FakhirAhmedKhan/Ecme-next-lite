'use client'
// import { getSupplier } from '@/services/supplierService'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { usePagination } from './usePagination'

export interface Customer {
  id: string
  Name: string
  name: string
  email: string
  phoneNumber: string
  createdAt: string
  activeStatus: boolean
  totalOrders: number
  totalValue: number
}

// Mock data (remove when API ready)
const mockcustomer: Customer[] = Array.from({ length: 45 }, (_, i) => ({
  id: `sup-${i + 1}`,
  Name: `Customer ${i + 1}`,
  name: `Customer ${i + 1}`,
  email: `Customer${i + 1}@example.com`,
  phoneNumber: `+123456789${i}`,
  createdAt: new Date().toISOString(),
  activeStatus: i % 2 === 0,
  totalOrders: Math.floor(Math.random() * 100),
  totalValue: Math.floor(Math.random() * 10000),
}))

export const useCustomer = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [Customer, setCustomer] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState('Customer')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const { pageNumber, handlePageJump, setPageNumber, getPageNumbers, pageSize, setPageSize, totalPages, setTotalPages } =
    usePagination(10)

  const fetchCustomer = useCallback(async () => {
    try {
      setIsLoading(true)

      // 🔹 Mock pagination logic (replace with API call)
      const start = (pageNumber - 1) * pageSize
      const end = start + pageSize
      const paginated = mockcustomer.slice(start, end)

      const data = {
        items: paginated,
        totalCount: mockcustomer.length,
      }

      // If using real API, uncomment:
      // const data: any = await getSupplier(pageNumber, pageSize, searchTerm)

      const mapped = (data.items ?? []).map((item: any) => ({
        id: item.id,
        Name: item.Name ?? item.name ?? '',
        email: item.email ?? '',
        phoneNumber: item.phoneNumber ?? item.phone ?? '',
        createdAt: item.createdAt,
        activeStatus: item.activeStatus ?? true,
        totalOrders: Number(item.totalOrders ?? 0),
        totalValue: Number(item.totalValue ?? 0),
      }))

      setCustomer(mapped)
      setTotalPages(Math.ceil(data.totalCount / pageSize))
    } finally {
      setIsLoading(false)
    }
  }, [pageNumber, pageSize, searchTerm])

  useEffect(() => {
    fetchCustomer()
  }, [fetchCustomer])

  const filteredCustomer = useMemo(() => {
    return Customer.filter((customer) => {
      const text = searchTerm.toLowerCase()
      const matchesSearch =
        customer.Name.toLowerCase().includes(text) ||
        customer.email.toLowerCase().includes(text) ||
        customer.phoneNumber.includes(searchTerm)

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && customer.activeStatus) ||
        (statusFilter === 'inactive' && !customer.activeStatus)

      return matchesSearch && matchesStatus
    })
  }, [Customer, searchTerm, statusFilter])

  const handleSaveUser = useCallback(async () => {
    setIsModalOpen(false)
    setPageNumber(1)
    await fetchCustomer()
  }, [fetchCustomer])

  const handleEdit = (customer: Customer) => {
    console.log('Edit customer:', Customer)
  }

  return {
    isLoading,
    isModalOpen,
    setIsModalOpen,
    Customer: filteredCustomer,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    handleSaveUser,
    handleEdit,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    totalPages,
    getPageNumbers,
    handlePageJump,
  }
}