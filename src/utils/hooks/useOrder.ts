'use client'
import React, { useCallback, useEffect, useState } from 'react'

export type Order = {
  id: string | number
  customerName: string
  email: string
  phoneNumber: string
  createdAt: string
  activeStatus: boolean
  totalOrders: number
  totalValue: number
  stockTitle: string
  quantity: number
  unitPrice: number
  totalPrice: number
  orderDate: string
}

// 🧩 Mock data for demo
const MOCK_ORDERS: Order[] = Array.from({ length: 42 }).map((_, i) => ({
  id: i + 1,
  customerName: `Customer ${i + 1}`,
  email: `customer${i + 1}@example.com`,
  phoneNumber: `+9715${Math.floor(10000000 + Math.random() * 89999999)}`,
  createdAt: `2025-10-${(i % 30) + 1}`,
  activeStatus: i % 2 === 0,
  totalOrders: Math.floor(Math.random() * 10) + 1,
  totalValue: Math.floor(Math.random() * 5000) + 500,
  stockTitle: `Product ${i + 1}`,
  quantity: Math.floor(Math.random() * 10) + 1,
  unitPrice: Math.floor(Math.random() * 300) + 20,
  totalPrice: Math.floor(Math.random() * 5000) + 100,
  orderDate: `2025-10-${(i % 30) + 1}`,
}))

// 🧠 Simulated API call
async function getAllOrders(
  page: number,
  size: number,
  term: string,
  status: 'all' | 'active' | 'inactive'
): Promise<{ items: Order[]; totalCount: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...MOCK_ORDERS]

      if (term) {
        filtered = filtered.filter((o) =>
          o.customerName.toLowerCase().includes(term.toLowerCase())
        )
      }

      if (status !== 'all') {
        filtered = filtered.filter((o) =>
          status === 'active' ? o.activeStatus : !o.activeStatus
        )
      }

      const start = (page - 1) * size
      const items = filtered.slice(start, start + size)
      resolve({ items, totalCount: filtered.length })
    }, 400) // simulate delay
  })
}

export const useOrder = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')

  // ✅ Fetch orders
  const fetchOrders = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getAllOrders(currentPage, itemsPerPage, searchTerm, statusFilter)
      setOrders(data.items)
      setTotalCount(data.totalCount)
    } catch (error) {
      console.error('Error fetching mock orders:', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, searchTerm, statusFilter])

  // ✅ Load data
  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  // ✅ Debounce search
  useEffect(() => {
    const timeout = setTimeout(fetchOrders, 300)
    return () => clearTimeout(timeout)
  }, [searchTerm, fetchOrders])

  // ✅ Reset pagination when search or filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

  return {
    isLoading,
    orders,
    totalCount,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
  }
}
