import { useState, useCallback, useEffect } from 'react'
import { useStock } from '@/utils/hooks/useStock'
import { Product } from '@/@types/stock'

interface ProductResponse {
  items: Product[];
}

// 🧪 Mock API function (replace with real API call later)
const mockProducts: Product[] = [
  { 
    id: '1', 
    name: 'Product 1', 
    price: 10, 
    quantity: 5,
    status: 0,
    barcode: 'BAR001',
    condition: 'Excellent',
    storage: 'Warehouse A'
  },
  { 
    id: '2', 
    name: 'Product 2', 
    price: 20, 
    quantity: 8,
    status: 1,
    barcode: 'BAR002',
    condition: 'Good',
    storage: 'Warehouse B'
  },
  { 
    id: '3', 
    name: 'Product 3', 
    price: 15, 
    quantity: 3,
    status: 2,
    barcode: 'BAR003',
    condition: 'Fair',
    storage: 'Warehouse C'
  },
]

const getProduct = async (
  stockId: string,
  filter: string,
  page: number,
  limit: number,
  searchTerm: string
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const items = mockProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      resolve({ items })
    }, 500)
  })
}

const editProduct = async (product: Product): Promise<void> => {
  console.log('Mock editing product:', product)
  return new Promise((resolve) => setTimeout(resolve, 300))
}

// 🔗 Hook to manage product data
export default function useProduct() {
  const { filteredStocks } = useStock() // from your existing hook

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const stock = filteredStocks?.[0] // Example: using first stock as current

  const fetchProducts = useCallback(async () => {
    if (!stock?.id) return
    setIsLoading(true)

    try {
      const data = await getProduct(stock.id, 'All', 1, 10, searchTerm) as ProductResponse
      setProducts(data.items ?? [])
    } catch (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }, [stock?.id, searchTerm])

  useEffect(() => {
    fetchProducts()
  }, [stock?.id, searchTerm])

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleSave = async (product: Product) => {
    try {
      setIsModalOpen(false)
      await editProduct(product)
      fetchProducts()
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  return {
    products,
    isLoading,
    isModalOpen,
    selectedProduct,
    searchTerm,
    setSearchTerm,
    handleEdit,
    handleSave,
    setIsModalOpen,
    filteredStocks, // from useStock()
  }
}
