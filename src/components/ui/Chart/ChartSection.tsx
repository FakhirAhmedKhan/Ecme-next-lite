import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartSection = ({ stock, isLoading }) => {
  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { width, height, ctx } = chart;
      ctx.restore();
      const data = chart.config.data.datasets[0].data;
      if (!data || data.length === 0) return;

      const available = data[0];
      const total = data.reduce((sum, val) => sum + val, 0) || 1;
      const percent = ((available / total) * 100).toFixed(0);

      ctx.font = "bold 32px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#111827";
      ctx.fillText(`${percent}%`, width / 2, height / 2 - 8);
      ctx.font = "500 12px Inter, sans-serif";
      ctx.fillStyle = "#6B7280";
      ctx.fillText("Available", width / 2, height / 2 + 18);
      ctx.save();
    },
  };

  const pieData = useMemo(() => {
    if (!stock) return { labels: [], datasets: [] };
    const availableQty = stock.quantityAvailable ?? 0;
    const soldQty = (stock.totalQuantity ?? 0) - availableQty;

    return {
      labels: ["Available Stock", "Sold Stock"],
      datasets: [
        {
          data: [availableQty, soldQty],
          backgroundColor: [
            "rgba(16, 185, 129, 0.9)", // Emerald
            "rgba(99, 102, 241, 0.9)", // Indigo
          ],
          borderWidth: 0,
          cutout: "75%",
        },
      ],
    };
  }, [stock]);

  // 🧠 Expiry badge logic
  const expiryDate = stock?.expiery ? new Date(stock.expiery) : null;
  const today = new Date();
  let expiryStatus = "";
  let expiryClass = "";

  if (stock?.category === "Food" && expiryDate) {
    const diffDays = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
    if (diffDays < 0) {
      expiryStatus = "Expired";
      expiryClass =
        "bg-red-100 text-red-700 border border-red-200 dark:bg-red-900/40 dark:text-red-400";
    } else if (diffDays <= 15) {
      expiryStatus = "Expiring Soon";
      expiryClass =
        "bg-yellow-100 text-yellow-800 border border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-400 animate-pulse";
    } else {
      expiryStatus = "Fresh";
      expiryClass =
        "bg-green-100 text-green-700 border border-green-200 dark:bg-green-900/40 dark:text-green-400";
    }
  }

  return (
    <div className="relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-visible">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600 mb-4"></div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Loading chart...
          </p>
        </div>
      ) : (
        <div className="relative w-[220px] h-[220px] flex items-center justify-center">
          {/* Pie Chart */}
          <Pie
            data={pieData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  backgroundColor: "rgba(17, 24, 39, 0.95)",
                  titleColor: "#fff",
                  bodyColor: "#fff",
                  padding: 12,
                  cornerRadius: 8,
                  displayColors: true,
                  callbacks: {
                    label: (context) => {
                      const label = context.label || "";
                      const value = context.parsed || 0;
                      const total = context.dataset.data.reduce(
                        (a, b) => a + b,
                        0
                      );
                      const percent = ((value / total) * 100).toFixed(1);
                      return `${label}: ${value.toLocaleString()} (${percent}%)`;
                    },
                  },
                },
              },
            }}
            plugins={[centerTextPlugin]}
          />

          {/* 🌟 Expiry Badge Overlay */}
          {expiryStatus && (
            <div
              className={`absolute -top-3 -right-3 px-3 py-1 text-[11px] font-semibold rounded-full shadow-md backdrop-blur-sm ${expiryClass}`}
            >
              {expiryStatus}
            </div>
          )}
        </div>
      )}
    </div>
  );
};