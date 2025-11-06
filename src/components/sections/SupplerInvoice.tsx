"use client"
import React from 'react'
import Header from '../ui/Head/head'
import useDashboard from '@/utils/hooks/useDashboard'
import SummaryCard from '../ui/InvoiceStatsCard/Bestcard'
import { AlertCircle, CheckCircle2, DollarSign } from 'lucide-react'

interface InvoiceStatsProps {
  invoices: any[] | { items: any[] }
  totalReceivable?: number
}

const InvoiceStats: React.FC<InvoiceStatsProps> = ({ invoices, totalReceivable = 0 }) => {
  const items = Array.isArray(invoices) ? invoices : invoices?.items || []

  const pendingPayments = items.filter((inv) => Number(inv.totalAmount) > Number(inv.paidAmount)).length
  const paidInvoices = items.filter((inv) => Number(inv.totalAmount) === Number(inv.paidAmount)).length
  const safeTotal = Number(totalReceivable ?? 0) || 0

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <SummaryCard
        value={pendingPayments}
        title="Pending Payments"
        statusText="Pending"
        iconBgClass="p-3 bg-rose-100 rounded-xl"
        icon={AlertCircle}
        BorderClasses="border border-red-200 shadow-red-100/50"
      />
      <SummaryCard
        value={paidInvoices}
        title="Paid Invoices"
        statusText="Paid"
        iconBgClass="p-3 bg-emerald-100 rounded-xl"
        icon={CheckCircle2}
        BorderClasses="border border-emerald-100 shadow-emerald-100/50"
      />
      <SummaryCard
        value={safeTotal}
        title="Total Receivable"
        statusText="Total"
        icon={DollarSign}
        iconBgClass="p-3 bg-indigo-100 rounded-xl"
        BorderClasses="shadow-indigo-100/50 border border-indigo-100"
      />
    </div>
  )
}

export const SupplerInvoice = () => {
  const { data, chartData, isVisible, time, greeting } = useDashboard()

  return (
    <div>
      <Header
        H1Heading="Supplier Invoice"
        paragraph="Real-time insights and analytics at your fingertips."
        Updates="3 New Updates"
        StutsUpdates="All Systems Operational"
        setChartData={chartData}
        setData={data}
        isVisible={isVisible}
        time={time}
        greeting={greeting}
        showButton={false}
        showRangePicker={false}
      />

      {/* Example usage of InvoiceStats */}
      <InvoiceStats
        invoices={data?.invoices || []}
        totalReceivable={data?.totalReceivable}
      />
    </div>
  )
}
