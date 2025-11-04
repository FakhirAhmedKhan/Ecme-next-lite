// src/utils/hooks/useStock.ts
'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'

// ✅ Stock type
export interface Stock {
  id: string
  stockTitle: string
  suppliarName: string
  totalQuantity: number
  stockPrice: number
  totalProfit: number
  quantityAvailable: number
  reorderLevel: number
  createdAt: string
}

// ✅ Mock data (optional for testing)
const mockStocks: Stock[] = Array.from({ length: 25 }).map((_, i) => ({
  id: `${i + 1}`,
  stockTitle: `Stock Item ${i + 1}`,
  suppliarName: `Supplier ${i + 1}`,
  totalQuantity: 10 + i,
  stockPrice: 100 * (i + 1),
  totalProfit: 20 * (i + 1),
  quantityAvailable: 5 + i,
  reorderLevel: 10,
  createdAt: new Date().toISOString(),
}))

export const useStock = () => {
  const navigate = useRouter()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [stocks, setStocks] = useState<Stock[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  // ✅ Fetch stocks (replace mockStocks with real API call if needed)
  const fetchStocks = useCallback(async () => {
    setIsLoading(true)
    try {
      // Replace this with your API call
      // const data = await getStocks(pageNumber, pageSize, searchTerm)
      const data = {
        items: mockStocks.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        totalPages: Math.ceil(mockStocks.length / pageSize),
      }
      setStocks(data.items ?? [])
      setTotalPages(data.totalPages ?? 1)
    } catch (error) {
      console.error('Error fetching stocks:', error)
      setStocks([])
      setTotalPages(1)
    } finally {
      setIsLoading(false)
    }
  }, [pageNumber, pageSize, searchTerm])

  useEffect(() => {
    fetchStocks()
  }, [fetchStocks])

  // ✅ Submit new stock (mock)
  const submitStock = async (newStock: Stock) => {
    setIsLoading(true)
    try {
      // await postStock(newStock) // replace with API call
      mockStocks.push(newStock) // mock
      fetchStocks()
      setTimeout(() => {
        setIsModalOpen(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      }, 200)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewDetails = (stockId: string) => {
    navigate(`/stock/${stockId}`)
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

  // ✅ Stats
  const stats = useMemo(
    () => ({
      totalItems: stocks.reduce((sum, s) => sum + s.totalQuantity, 0),
      totalValue: stocks.reduce((sum, s) => sum + s.stockPrice, 0),
      lowStock: stocks.filter((s) => s.quantityAvailable <= s.reorderLevel).length,
      totalProfit: stocks.reduce((sum, s) => sum + s.totalProfit, 0),
    }),
    [stocks]
  )

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
