import React from 'react'
import { AlertCircle } from 'lucide-react'

export default function SummaryCard({
  containerClass = 'bg-white rounded-2xl p-6 shadow-lg',
  icon: Icon = AlertCircle,
  iconBgClass = 'p-3 bg-rose-100 rounded-xl',
  iconColor = 'text-rose-600',
  statusText = 'Pending',
  statusTextClass = 'text-xs font-medium text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full',
  title = 'Pending Payments',
  titleClass = 'text-sm font-medium text-gray-600 mb-1',
  value,
  valueClass = 'text-3xl font-bold text-gray-900',
  BorderClasses = 'border border-rose-100', // ✅ Default border class
}) {
  return (
    <div className={`${containerClass} ${BorderClasses}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={iconBgClass}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <span className={statusTextClass}>{statusText}</span>
      </div>
      <h3 className={titleClass}>{title}</h3>
      <p className={valueClass}>{value}</p>
    </div>
  )
}
