// import CustomerList from "../Customer/Customer"
// import ReturnList from "../Return/Return"
// import RepairingList from "../Repairing/Repairing"
// import Order from "../Order/Order"
// import ProductImageUpload from "../ImageTab/components/Images/ProductImageUpload"
// import ImageUploadTab, { ImageTab } from "../ImageTab/ImageUploadTab"

import Product from "@/components/sections/Product"

import { StockTabsProps } from '@/@types/stock';

export const StockTabs: React.FC<StockTabsProps> = ({ stock, stockId, activeTab, setActiveTab, isLoading, onOrderCreated, onStockUpdated, handleTabClick, tabs }) => {

  return (
    <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-20 rounded-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      <div className="border-b border-gray-200 bg-gray-50/50">
        <div className="flex overflow-x-auto no-scrollbar">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => handleTabClick(id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium text-sm whitespace-nowrap transition-all duration-200 border-b-2 ${activeTab === id
                ? 'text-indigo-600 border-indigo-600 bg-white'
                : 'text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-100/50'
                }`}
            >
              <Icon className="w-[18px] h-[18px]" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'Product' && <Product stock={stock} />}
        {/* {activeTab === 'Order' && <Order stock={stock} onOrderCreated={onOrderCreated} />}
        {activeTab === 'Customers' && <CustomerList customers={stock.customerDtos ?? []} />}
        {activeTab === 'Return' && <ReturnList stock={stock} Return={stock.ReturnDto ?? []} onStockUpdated={onStockUpdated} />}
        {activeTab === 'Repairing' && <RepairingList stock={stock} onStockUpdated={onStockUpdated} />}
        {activeTab === 'Images' && <ImageUploadTab stock={stock} onStockUpdated={onStockUpdated} />} */}
      </div>
    </div>
  )
}