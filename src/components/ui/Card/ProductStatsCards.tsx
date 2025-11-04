// import { CurrencyLogo } from '@/views/stats/CurrencyLogo'
import { DollarSign, TrendingUp, Wrench } from 'lucide-react'

export default function ProductStatsCards({ product }: { product: any }) {
  const profit = product.totalProfit ?? 0

  return (
    <div className="space-y-4">
      <Card
        title="Pricing"
        icon={<DollarSign className="text-blue-600" size={20} />}
        color="blue"
      >
        <Stat label="Unit Price" value={`${product.price}`} />
        <Stat label="Total Cost" value={`${product.totalCost}`} />
        <Stat
          label="Profit / Loss"
          value={`${profit}`}
          color={profit >= 0 ? 'text-emerald-600' : 'text-red-600'}
        />
      </Card>

      <Card
        title="Repairs"
        icon={<Wrench className="text-purple-600" size={20} />}
        color="purple"
      >
        <Stat
          label="Total Repairing Cost"
          value={`${product.totalRepairingCost}`}
        />
      </Card>

      <Card
        title="Stock Info"
        icon={<TrendingUp className="text-emerald-600" size={20} />}
        color="emerald"
      >
        <Stat label="Stock Title" value={product.stockTitle} />
        <Stat label="Total Quantity" value={product.totalQuantity} />
      </Card>
    </div>
  )
}

function Card({ title, icon, color, children }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-10 h-10 bg-${color}-100 rounded-xl flex items-center justify-center`}
        >
          {icon}
        </div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Stat({ label, value, color = 'text-slate-900' }: any) {
  // const showCurrency =
  //   /price|cost|profit|loss|repair/i.test(label)

  return (
    <div>
      <p className="text-sm text-slate-600 mb-1">{label}</p>
      <div className="flex items-center gap-2">
        {/* {showCurrency && (
          <CurrencyLogo className="w-5 h-5 shrink-0 text-indigo-600" />
        )} */}
        <p className={`text-lg font-semibold ${color}`}>{value}</p>
      </div>
    </div>
  )
}
