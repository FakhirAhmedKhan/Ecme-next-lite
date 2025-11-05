'use client'

import { PanelRight, AlertCircle } from 'lucide-react'
import Header from '../ui/Head/head'
import { FaBoxOpen } from 'react-icons/fa6'
import useDashboard from '@/utils/hooks/useDashboard'
import { useStockDetails } from '@/utils/hooks/useStockDetails'
import { StockSummaryPanel } from '../ui/Table/StockSummaryPanel'
import { StockTabs } from '../ui/Table/StockTabs'
import type { Stock } from '@/@types/stock'
import type { StockTabInfo, StockTab } from '@/@types/stock-details'
import type { StockDetails as IStockDetails } from '@/@types/stock-details'
import type { HeaderProps } from '@/@types/header'

export default function StockDetails() {
  const { data, isVisible, time } = useDashboard()
  const {
    stockId,
    stock,
    isLoading,
    error,
    isPanelVisible,
    setIsPanelVisible,
    activeTab,
    setActiveTab,
    fetchStockDetails,
    handleOrderCreated,
    tabs,
    handleTabClick,
    netProfit,
    formattedExpiry,
    expiryStatus,
    expiryColor,
    filteredStocks,
    firstStock,
  } = useStockDetails()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100 transition-all dark:from-gray-950 dark:via-slate-900 dark:to-gray-950 duration-500 p-4">
      <Header
        H1Heading="Stock Details"
        Paragraph="Manage your stock details and track performance"
        BtnText="Add Stock"
        Updates="3 New Updates"
        StutsUpdates="All Systems Operational"
        setData={data}
        isVisible={isVisible}
        time={time}
        showRangePicker={false}
        Icon={<FaBoxOpen size={28} className="text-white" />}
        showButton={false}
        setChartData={(data: any) => {}}
        setIsModalOpen={() => {}}
      />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row mt-10 relative gap-6 lg:gap-8">
        {/* Floating Show Panel Button */}
        {!isPanelVisible && (
          <button
            onClick={() => setIsPanelVisible(true)}
            aria-label="Show summary panel"
            className="fixed top-24 left-4 z-50 p-3.5 bg-white/80 border border-blue-200/60 rounded-2xl shadow-[0_6px_20px_rgba(0,0,0,0.06)] transition-all dark:bg-gray-800/80 dark:border-blue-700/50 hover:shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:bg-blue-50/50 dark:hover:bg-blue-900/20 backdrop-blur-lg duration-300 group lg:absolute lg:top-4 lg:left-0"
          >
            <PanelRight
              size={22}
              className="text-blue-600 transition-colors dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300"
            />
          </button>
        )}

        {/* Left Summary Panel */}
        {isPanelVisible && (
          <div className="flex-shrink-0 w-full lg:w-96 lg:sticky lg:top-6 lg:self-start">
            <StockSummaryPanel
              stock={firstStock as unknown as Stock}
              onClose={() => setIsPanelVisible(false)}
              isLoading={isLoading}
              pieData={{
                labels: ['Available', 'Sold', 'In Repair'],
                data: [60, 30, 10]
              }}
              netProfit={netProfit}
              formattedExpiry={formattedExpiry}
              expiryStatus={expiryStatus}
              expiryColor={expiryColor}
            />
          </div>
        )}

        {/* Right Main Section */}
        <div className="flex-1 w-full bg-white/80 dark:bg-gray-900/90 border border-gray-100/70 dark:border-gray-800/70 rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 overflow-hidden">
          {/* Error State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center h-[500px] text-red-600 dark:text-red-400 p-8">
              <div className="bg-red-50 dark:bg-red-900/20 rounded-full p-6 mb-6">
                <AlertCircle className="w-16 h-16" />
              </div>
              <p className="text-lg font-semibold mb-2">Error Loading Stock</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
                {error}
              </p>
              <button
                onClick={() => fetchStockDetails()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition duration-200 shadow-md hover:shadow-lg"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-[500px] text-gray-500 dark:text-gray-400">
              <div className="relative">
                <div className="animate-spin border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 rounded-full h-16 w-16 mb-6"></div>
                <div className="absolute inset-0 animate-ping border-4 border-blue-200 dark:border-blue-800 rounded-full h-16 w-16 opacity-20"></div>
              </div>
              <p className="text-base font-medium text-gray-700 dark:text-gray-300">Loading stock details...</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Please wait a moment</p>
            </div>
          )}

          {/* Success State with Data */}
          {!isLoading && !error && stock && (
            <div className="p-6 sm:p-8">
              <StockTabs
                stock={firstStock as unknown as Stock}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onOrderCreated={handleOrderCreated}
                onStockUpdated={() => fetchStockDetails(false)}
                isLoading={isLoading}
                stockId={stockId}
                handleTabClick={handleTabClick}
                tabs={tabs as unknown as StockTabInfo[]}
              />
            </div>
          )}

          {/* Empty State (No Data) */}
          {!isLoading && !error && !stock && (
            <div className="flex flex-col items-center justify-center h-[500px] text-gray-500 dark:text-gray-400">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-full p-8 mb-6 shadow-inner">
                <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No Stock Data Found</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">The requested stock could not be located</p>
              <button
                onClick={() => fetchStockDetails()}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition duration-200 shadow-md hover:shadow-lg"
              >
                Reload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}