'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { useStock } from './useStock'
import type { Stock } from '@/@types/stock'
import type { StockTab } from '@/@types/stock-details'
import { Box, History, Images, LineChart, Package, RefreshCw, ShoppingCart, Users, Wrench } from 'lucide-react'

// ✅ Stock details type
interface StockDetails {
  id: string
  stockTitle: string
  supplierName: string
  totalQuantity: number
  quantityAvailable: number
  stockPrice: number
  totalProfit: number
  reorderLevel: number
  createdAt: string
  updatedAt: string
  description?: string
  expiryDate?: string
  category?: string // Product category (e.g., Food, Electronics)
  totalLoss?: number // Total shrinkage/loss value
  repairningCost?: number // Repair and maintenance costs
  unitPrice?: number // Price per unit
}

// ✅ Helper: Calculate expiry details
const getExpiryDetails = (expiryDate?: string) => {
  if (!expiryDate) {
    return {
      formattedExpiry: 'No expiry date',
      expiryStatus: 'Unknown',
      expiryColor: 'text-gray-500',
      daysUntilExpiry: null
    }
  }

  const expiry = new Date(expiryDate)
  const today = new Date()
  const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  let expiryStatus = 'Valid'
  let expiryColor = 'text-green-600'

  if (daysUntilExpiry < 0) {
    expiryStatus = 'Expired'
    expiryColor = 'text-red-600'
  } else if (daysUntilExpiry < 30) {
    expiryStatus = 'Expiring Soon'
    expiryColor = 'text-orange-600'
  } else if (daysUntilExpiry < 90) {
    expiryStatus = 'Warning'
    expiryColor = 'text-yellow-600'
  }

  return {
    formattedExpiry: expiry.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    expiryStatus,
    expiryColor,
    daysUntilExpiry
  }
}

// ✅ Hook: useStockDetails
export const useStockDetails = () => {
  const params = useParams<{ id: string }>()
  const stockId = params?.id || ''

  const [stock, setStock] = useState<StockDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPanelVisible, setIsPanelVisible] = useState(true)
  const [activeTab, setActiveTab] = useState<StockTab>('Product')

  // ✅ Tab configuration
  const tabs = useMemo(() => [
    { id: 'Product', icon: Package, label: 'Products' },
    { id: 'Order', icon: ShoppingCart, label: 'Orders' },
    { id: 'Customers', icon: Users, label: 'Customers' },
    { id: 'Return', icon: RefreshCw, label: 'Returns' },
    { id: 'Repairing', icon: Wrench, label: 'Repairs' },
    { id: 'Images', icon: Images, label: 'Images' },
  ], [])
  const {
    filteredStocks,
  } = useStock()
  // ✅ Calculat`e net profit from all stocks
  const netProfit = useMemo(() => {
    return filteredStocks.reduce((sum, s) => sum + s.totalProfit, 0)
  }, [filteredStocks])

  // ✅ Get expiry details for current stock
  const expiryDetails = useMemo(() => {
    return getExpiryDetails(filteredStocks[0]?.expiryDate)
  }, [filteredStocks])

  // ✅ Simulated API fetch with proper error handling
  const fetchStockDetails = useCallback(async (showLoader = true) => {
    if (!stockId) {
      setError('No stock ID provided')
      return
    }

    try {
      if (showLoader) setIsLoading(true)
      setError(null)

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 600))

      // Mock API call to get stock details
      const foundStock = {
        id: stockId,
        stockTitle: `Stock Item ${stockId}`,
        supplierName: `Supplier ${stockId}`,
        totalQuantity: 100,
        quantityAvailable: 50,
        stockPrice: 1000,
        totalProfit: 200,
        reorderLevel: 20,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: 'Mock stock description',
        expiryDate: new Date(2024, 11, 31).toISOString(),
        category: 'Electronics',
        totalLoss: 0,
        repairningCost: 0,
        unitPrice: 100
      }

      if (!foundStock) {
        throw new Error('Stock not found')
      }

      // Normalize foundStock to StockDetails shape to satisfy state type
      const stockDetails: StockDetails = {
        id: (foundStock as any).id ?? '',
        stockTitle: (foundStock as any).stockTitle ?? (foundStock as any).title ?? '',
        supplierName: (foundStock as any).supplierName ?? 'Unknown Supplier',
        totalQuantity: (foundStock as any).totalQuantity ?? (foundStock as any).quantity ?? 0,
        quantityAvailable: (foundStock as any).quantityAvailable ?? (foundStock as any).available ?? 0,
        stockPrice: (foundStock as any).stockPrice ?? (foundStock as any).price ?? 0,
        totalProfit: (foundStock as any).totalProfit ?? 0,
        reorderLevel: (foundStock as any).reorderLevel ?? 0,
        createdAt: (foundStock as any).createdAt ?? new Date().toISOString(),
        updatedAt: (foundStock as any).updatedAt ?? (foundStock as any).createdAt ?? new Date().toISOString(),
        description: (foundStock as any).description ?? undefined,
        expiryDate: (foundStock as any).expiryDate ?? undefined,
        category: (foundStock as any).category ?? undefined,
        totalLoss: (foundStock as any).totalLoss ?? undefined,
        repairningCost: (foundStock as any).repairningCost ?? undefined,
        unitPrice: (foundStock as any).unitPrice ?? undefined
      }

      setStock(stockDetails)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch stock details'
      setError(errorMessage)
      setStock(null)
    } finally {
      setIsLoading(false)
    }
  }, [stockId])

  // ✅ Handle order creation (callback for child components)
  const handleOrderCreated = useCallback(() => {
    // Refresh stock data without showing loader
    fetchStockDetails(false)
  }, [fetchStockDetails])

  // ✅ Handle tab clicks
  const handleTabClick = useCallback((tabId: StockTab) => {
    setActiveTab(tabId)
  }, [])

  // ✅ Initial fetch on mount or stockId change
  useEffect(() => {
    if (stockId) {
      fetchStockDetails()
    }
  }, [stockId, fetchStockDetails])

  return {
    // Stock data
    stock,
    stockId,
    isLoading,
    error,

    // UI state
    isPanelVisible,
    setIsPanelVisible,
    activeTab,
    setActiveTab,

    // Actions
    fetchStockDetails,
    handleOrderCreated,
    handleTabClick,

    // Computed values
    tabs,
    netProfit,
    formattedExpiry: expiryDetails.formattedExpiry,
    expiryStatus: expiryDetails.expiryStatus,
    expiryColor: expiryDetails.expiryColor,
    daysUntilExpiry: expiryDetails.daysUntilExpiry,

    // All stocks for panel display
    filteredStocks: filteredStocks,
    firstStock: stock,
  }
}