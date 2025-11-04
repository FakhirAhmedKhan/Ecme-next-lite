import { ShoppingCart, RotateCcw, Wrench } from 'lucide-react'

export default function ProductTabs({ activeTab, setActiveTab, product }: any) {
  const tabs = [
    {
      key: 'orders',
      label: 'Orders',
      count: product.orders?.length ?? 0,
      icon: ShoppingCart,
    },
    {
      key: 'returns',
      label: 'Returns',
      count: product.returns?.length ?? 0,
      icon: RotateCcw,
    },
    {
      key: 'repairs',
      label: 'Repairs',
      count: product.repairs?.length ?? 0,
      icon: Wrench,
    },
  ]

  return (
    <div className="border-b border-slate-100 bg-slate-50">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold transition-all ${activeTab === tab.key
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === tab.key
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-200 text-slate-600'
                  }`}
              >
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
