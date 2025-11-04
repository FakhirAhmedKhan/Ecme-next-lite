'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useRouter, useParams } from 'next/navigation'
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
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string | undefined

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'available' | 'sold'>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState<Stock[]>([])
  const [product, setProduct] = useState<Stock | null>(null)
  const [activeTab, setActiveTab] = useState<'orders' | 'returns' | 'repairs'>('orders')

  const { pageNumber, pageSize, setTotalPages } = usePagination(10)

  // 🔹 Fetch single product by ID (for details view)
  useEffect(() => {
    if (!id) return

    setIsLoading(true)
    // Simulate API call - replace with actual API call
    setTimeout(() => {
      const foundProduct = mockProducts.find(p => p.id === id)
      setProduct(foundProduct || null)
      setIsLoading(false)
    }, 300)
  }, [id])

  // 🔹 Fetch products list with pagination and filtering
  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      let filtered = mockProducts.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )

      // Apply status filter
      if (selectedStatus !== 'all') {
        filtered = filtered.filter(item => item.status === selectedStatus)
      }

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
  }, [searchTerm, selectedStatus, pageNumber, pageSize, setTotalPages])

  useEffect(() => {
    // Only fetch product list if we're not on a detail page
    if (!id) {
      fetchProducts()
    }
  }, [fetchProducts, id])

  // 🔹 Navigation handler for viewing product details
  const handleViewDetails = useCallback((productId: string) => {
    router.push(`/Product/${productId}`)
  }, [router])

  const navigate = useCallback((path: string) => {
    router.push(path)
  }, [router])

  return {
    // List view data
    searchTerm,
    setSearchTerm,
    selectedStatus,
    setSelectedStatus,
    products,

    // Detail view data
    product,
    activeTab,
    setActiveTab,

    // Common
    isLoading,
    handleViewDetails,
    navigate,
  }
}