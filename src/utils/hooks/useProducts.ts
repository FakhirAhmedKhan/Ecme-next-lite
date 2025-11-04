'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { usePagination } from './usePagination'

export interface Stock {
  id: string
  name: string
  barcode: string
  price: number
  condition: string
  status: 'available' | 'sold'
  stockTitle: string
  createdAt: string | null
  totalOrders: number
  totalValue: number
}

// 🔹 Mock data for local development
const mockProducts: Stock[] = [
  {
    id: '1',
    name: 'Wireless Mouse',
    barcode: '1002001',
    price: 45,
    condition: 'New',
    status: 'available',
    stockTitle: 'Electronics',
    createdAt: '2025-10-20',
    totalOrders: 10,
    totalValue: 450,
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    barcode: '1002002',
    price: 120,
    condition: 'New',
    status: 'sold',
    stockTitle: 'Peripherals',
    createdAt: '2025-09-14',
    totalOrders: 7,
    totalValue: 840,
  },
  {
    id: '3',
    name: 'Gaming Headset',
    barcode: '1002003',
    price: 80,
    condition: 'Used',
    status: 'available',
    stockTitle: 'Audio',
    createdAt: '2025-11-01',
    totalOrders: 4,
    totalValue: 320,
  },
  {
    id: '4',
    name: 'LED Monitor',
    barcode: '1002004',
    price: 250,
    condition: 'New',
    status: 'sold',
    stockTitle: 'Display',
    createdAt: '2025-09-22',
    totalOrders: 5,
    totalValue: 1250,
  },
  {
    id: '5',
    name: 'Laptop Stand',
    barcode: '1002005',
    price: 30,
    condition: 'New',
    status: 'available',
    stockTitle: 'Accessories',
    createdAt: '2025-10-25',
    totalOrders: 12,
    totalValue: 360,
  },
]

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'available' | 'sold'>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Stock[]>([])

  const router = useRouter()
  const { pageNumber, pageSize, setTotalPages } = usePagination(10)

  // 🔹 Mock API + pagination + filtering
  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const filtered = mockProducts.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

      const start = (pageNumber - 1) * pageSize
      const end = start + pageSize
      const paginated = filtered.slice(start, end)

      setProducts(paginated)
      setTotalPages(Math.ceil(filtered.length / pageSize))
    } catch (err) {
      console.error('Error fetching mock products:', err)
    } finally {
      setIsLoading(false)
    }
  }, [searchTerm, pageNumber, pageSize, setTotalPages])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const filteredProducts = useMemo(() => {
    return products.filter(
      (p) => selectedStatus === 'all' || p.status === selectedStatus
    )
  }, [products, selectedStatus])

  const handleViewDetails = (productId: string) => {
    router.push(`/product/${productId}`)
  }

  return {
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    products: filteredProducts,
    isLoading,
    handleViewDetails,
  }
}
