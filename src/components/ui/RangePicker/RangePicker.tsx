"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarRange } from "lucide-react";
import { getDashboardData, getSalesChart } from "@/services/DashBoardService";
import { FullDashboardData } from "@/@types/Types";

interface RangePickerProps {
  onDashboardFetched?: (data: FullDashboardData) => void;
  onChartFetched?: (data: any[]) => void;
}

export default function RangePicker({ onDashboardFetched, onChartFetched }: RangePickerProps) {
  const [range, setRange] = useState({ start: "", end: "" });
  const [activePreset, setActivePreset] = useState<string | null>("7days");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Format date to yyyy-mm-dd
  // ✅ Format date to yyyy-mm-dd (+1 day helper)
  const formatDate = (date: Date, addDays = 0) => {
    const d = new Date(date);
    d.setDate(d.getDate() + addDays); // Add offset (default 0)
    return d.toISOString().split("T")[0];
  };

  // ✅ Preset ranges with +1 day applied to endDate
  // ✅ Preset ranges with +7-day future end date logic
  const handlePreset = (preset: string) => {
    const today = new Date();
    let start: Date, end: Date;

    switch (preset) {
      case "today":
        start = today;
        end = new Date(today);
        end.setDate(today.getDate() + 7); // ✅ 7 days ahead
        break;

      case "7days":
        start = new Date(today);
        start.setDate(today.getDate() - 5); // previous range start
        end = new Date(today);
        end.setDate(today.getDate() + 7); // ✅ 7 days ahead of today
        break;

      case "month":
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today);
        end.setDate(today.getDate() + 7); // ✅ extend 7 days into future
        break;

      default:
        return;
    }

    // ✅ Add +1 day buffer if needed
    setRange({
      start: formatDate(start),
      end: formatDate(end),
    });

    setActivePreset(preset);
  };
  ;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivePreset(null);
    setRange({ ...range, [e.target.name]: e.target.value });
  };

  // ✅ Fetch function triggered only on Apply
  const fetchData = async () => {
    if (!range.start || !range.end) return;

    if (new Date(range.end) < new Date(range.start)) {
      setError("⚠️ End date cannot be before start date");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const [dashboardRes, chartRes] = await Promise.all([
        getDashboardData(range.start, range.end),
        getSalesChart("custom", range.start, range.end),
      ]);
      const dashboardData = dashboardRes?.data?.data ?? dashboardRes?.data ?? dashboardRes;
      const chartData = chartRes ?? chartRes?.data ?? chartRes;
      onDashboardFetched?.(dashboardData);
      onChartFetched?.(chartData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load default preset initially
  useEffect(() => {
    handlePreset("7days");
  }, []);

  useEffect(() => {
    if (activePreset) fetchData();
  }, [range.start, range.end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full md:w-[360px] bg-white dark:bg-gray-900 border border-gray-200 
                 dark:border-gray-700 rounded-2xl shadow-sm p-5 relative overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <CalendarRange className="w-5 h-5 text-indigo-600" />
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          Select Date Range
        </h2>
      </div>

      {/* Preset Buttons */}
      <div className="flex gap-2 mb-4">
        {[
          { key: "today", label: "Today" },
          { key: "7days", label: "Last 7 Days" },
          { key: "month", label: "This Month" },
        ].map((p) => (
          <button
            key={p.key}
            onClick={() => handlePreset(p.key)}
            className={`text-xs font-medium px-2.5 py-1.5 rounded-md border transition-all duration-200 
              ${activePreset === p.key
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Date Inputs */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="start"
            value={range.start}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md 
                       px-2 py-1.5 text-sm text-gray-800 dark:text-white 
                       bg-gray-50 dark:bg-gray-800 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="end"
            value={range.end}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md 
                       px-2 py-1.5 text-sm text-gray-800 dark:text-white 
                       bg-gray-50 dark:bg-gray-800 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={fetchData}
        disabled={loading}
        className="w-full bg-indigo-600 text-white text-sm font-medium rounded-md py-2 hover:bg-indigo-700 transition-all"
      >
        {loading ? "Fetching..." : "Apply Range"}
      </button>

      {/* Error Message */}
      {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center 
                        bg-white/80 dark:bg-gray-900/70 rounded-2xl z-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
            className="border-4 border-indigo-500 border-t-transparent rounded-full w-6 h-6"
          />
        </div>
      )}
    </motion.div>
  );
}

