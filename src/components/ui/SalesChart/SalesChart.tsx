import React from "react";
import { Line } from "react-chartjs-2";
import { BarChart3 } from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesChartProps {
  chartData: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill: boolean;
      tension: number;
      borderWidth: number;
    }[];
  };
  chartOptions: any; // Use proper Chart.js options type if available
  H3Tittle: string;
  paragraph: string;
  Fallback: string;
}

export const SalesChart: React.FC<SalesChartProps> = ({
  chartData,
  chartOptions,
  H3Tittle,
  paragraph,
  Fallback,
}) => {
  return (
    <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 col-span-full relative overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="text-indigo-600" size={24} />
            {H3Tittle}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{paragraph}</p>
        </div>
      </div>

      <div className="relative w-full h-80">
        {chartData.labels.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
            {Fallback}
          </div>
        ) : (
          <Line
            key={JSON.stringify(chartData.labels)}
            data={chartData}
            options={chartOptions}
          />
        )}
      </div>
    </div>
  );
};