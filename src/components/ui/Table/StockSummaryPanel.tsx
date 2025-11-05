import { Calendar, Package, PanelLeft, Wrench, TrendingUp, Tag, AlertTriangle, TrendingDown } from 'lucide-react'
import { CiMoneyBill } from "react-icons/ci"
import { ChartSection } from '../Chart/ChartSection'
import { InfoCard } from '../Card/InfoCard'
import { StockSummaryPanelProps } from '@/@types/stock'

export const StockSummaryPanel: React.FC<StockSummaryPanelProps> = ({ stock, pieData, onClose, isLoading, netProfit, formattedExpiry, expiryStatus, expiryColor }) => {
  return (
    <div className="w-full lg:w-76 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 relative">

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Close panel"
      >
        <PanelLeft size={20} />
      </button>

      {/* Chart */}
      {/* <div className="p-6">
        <ChartSection stock={stock} isLoading={isLoading} />
      </div> */}

      {/* Details Section */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {/* --- Product Name --- */}
        <div className="col-span-1 sm:col-span-2">
          <div className="p-4 rounded-2xl border border-indigo-100 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950 dark:to-gray-900 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500/90 p-2 rounded-xl shadow-inner">
                <Tag className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Product Name</h3>
                {/* <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {stock.stockTitle || '—'}
                </p> */}
              </div>
            </div>
          </div>
        </div>

        {/* --- Expiry Section (Only if Food) --- */}
        {/* {stock.category === "Food" && (
          <div className="col-span-1 sm:col-span-2">
            <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/90 p-2 rounded-xl shadow-inner">
                  <Calendar className="text-white w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm text-gray-500 dark:text-gray-400">Expiry Date</h3>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {formattedExpiry}
                  </p>
                </div>
                {/* Expiry badge */}
                {/* <div className={"px-3 py-1.5 rounded-full text-xs font-semibold" + expiryColor}>
                  {expiryStatus}
                </div>
              </div>
            </div>
          </div>
        )}  */}

        {/* --- Other Info --- */}
        {/* <InfoCard icon={Package} label="Quantity" value={stock.totalQuantity || '—'} /> */}
        {/* <InfoCard icon={Package} label="Available" value={stock.quantityAvailable || '—'} /> */}
        {/* <InfoCard icon={CiMoneyBill} label="Unit Price" value={stock.unitPrice.toFixed(2) || '—'} showCurrency />
        <InfoCard icon={CiMoneyBill} label="Total Stock Value" value={stock.stockPrice.toLocaleString() || '—'} showCurrency />
        <InfoCard icon={TrendingUp} label="Total Profit" value={stock.totalProfit.toLocaleString() || '—'} showCurrency />
        <InfoCard icon={TrendingDown} label="Total Shrink" value={stock.totalLoss.toLocaleString() || '—'} showCurrency />
        <InfoCard icon={Wrench} label="Repair Costs" value={stock.repairningCost.toLocaleString() || '—'} showCurrency />
        <InfoCard icon={CiMoneyBill} label="Net Profit" value={netProfit.toLocaleString() || '—'} showCurrency />
        <InfoCard icon={Calendar} label="Created" value={new Date(stock.createdAt).toLocaleDateString() || '—'} /> */}
      </div>
    </div>
  )
}