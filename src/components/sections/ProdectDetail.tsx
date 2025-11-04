// ============================================
// ProductDetailsView.tsx - FIXED VERSION
// ============================================
"use client"
import { ArrowLeft } from 'lucide-react'
import { useProducts } from '@/utils/hooks/useProducts'
import ProductHeader from '../ui/Head/ProductHeader'
import ProductStatsCards from '../ui/Card/ProductStatsCards'
import ProductTabs from '../ui/Card/ProductTabs'
import ProductTabContent from '../ui/Card/productTabContent'

export default function ProductDetailsView() {
  const {
    product,
    isLoading,
    activeTab,
    setActiveTab,
    navigate,
  } = useProducts()

  if (isLoading) {
    return (
      <p className="text-center text-slate-500 py-10">
        Loading product...
      </p>
    )
  }

  if (!product) {
    return (
      <div className="text-center text-slate-600 py-12">
        Product not found
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 mb-6 bg-white rounded-xl hover:bg-slate-50 transition-all shadow-sm border border-slate-200 font-medium text-slate-700"
          onClick={() => navigate('/Product')}
          aria-label="Back to Products"
        >
          <ArrowLeft size={18} />
          <span>Back to Products</span>
        </button>

        {/* Header */}
        <ProductHeader product={product} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProductStatsCards product={product} />
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <ProductTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                product={product}
              />
              <ProductTabContent
                activeTab={activeTab}
                product={product}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}