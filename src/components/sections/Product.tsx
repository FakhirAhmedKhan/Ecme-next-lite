import { useCallback, useEffect, useState } from 'react'
// import ProductModal from './components/ProductModal'
// import { editProduct, getProduct } from '@/services/ProductService'
// import StockProductTable from './components/StockProductTable'
import SearchBar from '../ui/searchbar/searchbar'
import StockProductTable from '../ui/Table/StockProductTable'
import useProduct from '@/utils/hooks/useProductTab'

import { Stock } from '@/@types/stock';

interface ProductProps {
  stock: Stock;
}

const Product: React.FC<ProductProps> = ({ stock }) => {
  const {
    products,
    isLoading,
    searchTerm,
    setSearchTerm,
    handleEdit,
    isModalOpen,
    setIsModalOpen,
    selectedProduct,
  } = useProduct()
  if (!stock.stockId) { return null }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {isLoading ? (<div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
        ) : (<StockProductTable products={products} onEdit={handleEdit} />)}

        {/* <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} onSave={handleSave} */}
        {/* /> */}
      </div>
    </div>
  )
}

export default Product