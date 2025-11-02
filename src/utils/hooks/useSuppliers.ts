'use client'
import { getSupplier } from '@/services/supplierService'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { usePagination } from './usePagination'

export interface Supplier {
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
const mockSuppliers: Supplier[] = Array.from({ length: 45 }, (_, i) => ({
  id: `sup-${i + 1}`,
  Name: `Supplier ${i + 1}`,
  name: `Supplier ${i + 1}`,
  email: `supplier${i + 1}@example.com`,
  phoneNumber: `+123456789${i}`,
  createdAt: new Date().toISOString(),
  activeStatus: i % 2 === 0,
  totalOrders: Math.floor(Math.random() * 100),
  totalValue: Math.floor(Math.random() * 10000),
}))

export const useSuppliers = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const { pageNumber, handlePageJump, setPageNumber, getPageNumbers, pageSize, setPageSize, totalPages, setTotalPages } =
    usePagination(10)

  const fetchSuppliers = useCallback(async () => {
    try {
      setIsLoading(true)

      // 🔹 Mock pagination logic (replace with API call)
      const start = (pageNumber - 1) * pageSize
      const end = start + pageSize
      const paginated = mockSuppliers.slice(start, end)

      const data = {
        items: paginated,
        totalCount: mockSuppliers.length,
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

      setSuppliers(mapped)
      setTotalPages(Math.ceil(data.totalCount / pageSize))
    } finally {
      setIsLoading(false)
    }
  }, [pageNumber, pageSize, searchTerm])

  useEffect(() => {
    fetchSuppliers()
  }, [fetchSuppliers])

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((supplier) => {
      const text = searchTerm.toLowerCase()
      const matchesSearch =
        supplier.Name.toLowerCase().includes(text) ||
        supplier.email.toLowerCase().includes(text) ||
        supplier.phoneNumber.includes(searchTerm)

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && supplier.activeStatus) ||
        (statusFilter === 'inactive' && !supplier.activeStatus)

      return matchesSearch && matchesStatus
    })
  }, [suppliers, searchTerm, statusFilter])

  const handleSaveUser = useCallback(async () => {
    setIsModalOpen(false)
    setPageNumber(1)
    await fetchSuppliers()
  }, [fetchSuppliers])

  const handleEdit = (supplier: Supplier) => {
    console.log('Edit supplier:', supplier)
  }

  return {
    isLoading,
    isModalOpen,
    setIsModalOpen,
    suppliers: filteredSuppliers,
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