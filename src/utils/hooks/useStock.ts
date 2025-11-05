// src/utils/hooks/useStock.ts
'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { Stock } from '@/@types/stock'

// ✅ Mock data for testing (replace with API call in production)
const mockStocks: Stock[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `${i + 1}`,
  stockId: `${i + 1}`,
  status: Math.floor(Math.random() * 3),
  expiryDate: new Date(2024, 11, 31).toISOString(),
  suppliarName: `Supplier ${i + 1}`,
  stockTitle: `Stock Item ${i + 1}`,
  totalQuantity: 10 + i,
  quantityAvailable: 5 + i,
  reorderLevel: 10,
  stockPrice: 100 * (i + 1),
  totalProfit: 20 * (i + 1),
  createdAt: new Date().toISOString(),
  unitPrice: 100,
  totalLoss: 0,
  repairningCost: 0
}))

export const useStock = () => {
  const router = useRouter()

  // ✅ States
  const [stocks, setStocks] = useState<Stock[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  // ✅ Fetch stocks (mock for now, replace with API call)
  const fetchStocks = useCallback(async () => {
    setIsLoading(true)
    try {
      const start = (pageNumber - 1) * pageSize
      const end = pageNumber * pageSize
      const items = mockStocks.slice(start, end)
      setStocks(items)
      setTotalPages(Math.ceil(mockStocks.length / pageSize))
    } catch (error) {
      console.error('Error fetching stocks:', error)
      setStocks([])
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }, [pageNumber, pageSize])

  useEffect(() => {
    fetchStocks()
  }, [fetchStocks])

  // ✅ Add new stock (mock)
  const submitStock = async (newStock: Stock) => {
    setIsLoading(true)
    try {
      mockStocks.push(newStock) // mock
      await fetchStocks()
      setTimeout(() => {
        setIsModalOpen(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }, 200)
    } finally {
      setIsLoading(false)
    }
  }

  // ✅ View stock details
  const handleViewDetails = (stockId: string) => {
    router.push(`/stock/${stockId}`)
  }

  // ✅ Filtered stocks by search term
  const filteredStocks = useMemo(
    () =>
      stocks.filter(
        (s) =>
          s.stockTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.suppliarName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [stocks, searchTerm]
  )

  // ✅ Stock stats
  const stats = useMemo(() => ({
    totalItems: stocks.reduce((sum, s) => sum + s.totalQuantity, 0),
    totalValue: stocks.reduce((sum, s) => sum + s.stockPrice, 0),
    lowStock: stocks.filter(s => s.quantityAvailable <= s.reorderLevel).length,
    totalProfit: stocks.reduce((sum, s) => sum + s.totalProfit, 0),
  }), [stocks])

  return {
    stocks,
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
    showSuccess,
    submitStock,
    handleViewDetails,
    stats,
  }
}
