"use client";
import React, { useEffect, useState } from "react";
import { FullDashboardData } from "@/@types/Types";
import { Users, Package, Building2, TrendingUp } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* 🧠 MOCK DATA FUNCTION - Replace this with real API later                   */
/* -------------------------------------------------------------------------- */
const getDashboardData = async (): Promise<FullDashboardData> => {
  await new Promise((res) => setTimeout(res, 1000)); // Simulate delay

  return {
    totalUsers: 1200,
    totalSuppliers: 45,
    totalOrders: 320,
    totalRevenue: 84500,
    topSuppliers: [
      { id: "1", name: "Alpha Supplies", totalOrders: 50, totalValue: 12000 },
      { id: "2", name: "Beta Traders", totalOrders: 35, totalValue: 9800 },
      { id: "3", name: "Gamma Distributors", totalOrders: 25, totalValue: 7200 },
    ],
    recentOrders: [
      { id: "101", customer: "John Doe", amount: 230, date: "2025-11-01" },
      { id: "102", customer: "Jane Smith", amount: 420, date: "2025-11-02" },
      { id: "103", customer: "Michael Lee", amount: 150, date: "2025-11-03" },
    ],
    monthlyRevenue: [
      { month: "Jan", revenue: 5000 },
      { month: "Feb", revenue: 6800 },
      { month: "Mar", revenue: 7200 },
      { month: "Apr", revenue: 8100 },
      { month: "May", revenue: 9100 },
      { month: "Jun", revenue: 10000 },
      { month: "Jul", revenue: 9200 },
      { month: "Aug", revenue: 8900 },
      { month: "Sep", revenue: 9500 },
      { month: "Oct", revenue: 10300 },
      { month: "Nov", revenue: 11000 },
      { month: "Dec", revenue: 12000 },
    ],
  };
};

/* -------------------------------------------------------------------------- */
/* ⚙️ DASHBOARD HOOK                                                         */
/* -------------------------------------------------------------------------- */
const useDashboard = () => {
  const [data, setData] = useState<FullDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  // 🧩 Fetch data and initialize visibility
  useEffect(() => {
    setIsVisible(true);
    
    const fetchDashboardData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // 🕐 Live Time Update
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 🕐 Greeting Message
  const greeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  /* ---------------------------------------------------------------------- */
  /* 📊 Chart Configuration                                                 */
  /* ---------------------------------------------------------------------- */
  const chartData = data
    ? {
        labels: data.monthlyRevenue.map((item) => item.month),
        datasets: [
          {
            label: "Revenue",
            data: data.monthlyRevenue.map((item) => item.revenue),
            borderColor: "#6366f1",
            backgroundColor: "rgba(99,102,241,0.15)",
            fill: true,
            tension: 0.4,
            borderWidth: 3,
          },
        ],
      }
    : { labels: [], datasets: [] };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 900, easing: "easeInOutQuart" as const },
    plugins: {
      legend: { display: true, position: "top" as const },
      tooltip: { enabled: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: "rgba(148,163,184,0.1)" },
        ticks: {
          callback: (val: string | number) => {
            const numVal = typeof val === "string" ? parseFloat(val) : val;
            return numVal >= 1000 ? `${(numVal / 1000).toFixed(0)}k` : numVal;
          },
        },
      },
    },
  };

  /* ---------------------------------------------------------------------- */
  /* 💳 Financial Cards (all numeric values)                                 */
  /* ---------------------------------------------------------------------- */
  const financialCards = data
    ? [
        {
          title: "Total Profit",
          value: data.totalRevenue,
          icon: TrendingUp,
          bgColor: "bg-gradient-to-br from-emerald-50 to-teal-50",
          iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
          showCurrency: true,
        },
        {
          title: "Total Orders",
          value: data.totalOrders,
          icon: Package,
          bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
          iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        },
        {
          title: "Total Customers",
          value: data.totalUsers,
          icon: Users,
          bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
          iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
        },
        {
          title: "Total Suppliers",
          value: data.totalSuppliers,
          icon: Building2,
          bgColor: "bg-gradient-to-br from-orange-50 to-yellow-50",
          iconBg: "bg-gradient-to-br from-orange-500 to-yellow-600",
        },
      ]
    : [];

  return {
    isVisible,
    data,
    loading,
    error,
    greeting: greeting(),
    time,
    chartData,
    chartOptions,
    financialCards,
  };
};

export default useDashboard;