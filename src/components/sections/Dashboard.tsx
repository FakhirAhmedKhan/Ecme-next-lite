"use client";
import Header from "../ui/Head/head";
import { StatCard } from "../ui/Card/Card";
import useDashboard from "@/utils/hooks/useDashboard";
import { SalesChart } from "../ui/SalesChart/SalesChart";
import ErrorHeanding from "../ui/ErrorHeanding/ErrorHeanding";
import FinancialOverview from "../ui/FinancialOverview/FinancialOverview";
import { Banknote, Receipt, ShoppingCart, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const {
    data,
    loading,
    error,
    chartData,
    chartOptions,
    financialCards,
    isVisible,
    time,
    greeting,
  } = useDashboard();

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-slate-600 font-medium">Loading dashboard...</p>
      </div>
    );

  if (error) return <ErrorHeanding error={error} />;

  const formatNumber = (value?: number) =>
    typeof value === "number" ? value.toLocaleString() : "0";

  return (
    <div className="bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 relative">
      <Header
        H1Heading="Inventory Dashboard"
        paragraph="Real-time insights and analytics at your fingertips."
        Updates="3 New Updates"
        StutsUpdates="All Systems Operational"
        setChartData={chartData}
        setData={data}
        isVisible={isVisible}
        time={time}
        greeting={greeting}
        showButton={false}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8 px-6">
        <StatCard
          label="Stock Value"
          value={formatNumber(data?.totalRevenue)}
          icon={Receipt}
          gradient="bg-gradient-to-br from-purple-400 to-purple-600"
        />
        <StatCard
          label="Total Expense"
          value={formatNumber(25000)}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-emerald-400 to-emerald-600"
        />
        <StatCard
          label="Total Sales"
          value={formatNumber(data?.totalOrders)}
          icon={ShoppingCart}
          gradient="bg-gradient-to-br from-blue-400 to-blue-600"
        />
        <StatCard
          label="Net Profit"
          value={formatNumber(35000)}
          icon={Banknote}
          gradient="bg-gradient-to-br from-teal-400 to-green-600"
        />
        <StatCard
          label="Suppliers"
          value={formatNumber(data?.totalSuppliers)}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-pink-400 to-red-600"
        />
      </div>

      {/* Sales Chart */}
      <div className="px-6">
        <SalesChart
          chartData={chartData}
          chartOptions={chartOptions}
          H3Tittle="Sales Analytics"
          paragraph="Track your revenue performance over time"
          Fallback="No chart data available"
        />

        {/* Financial Overview */}
        <FinancialOverview
          data={data ?? {}}
          financialCards={financialCards}
          H3tittle="Financial Overview"
          paragraph="Real-time financial metrics and insights"
        />
      </div>
    </div>
  );
}
