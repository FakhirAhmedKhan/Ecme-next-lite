// import { CurrencyLogo } from "@/views/stats/CurrencyLogo";
import { TrendingDown, TrendingUp } from "lucide-react";

export const InfoCard = ({
  icon: Icon,
  label,
  value,
  showCurrency = false,
  trend = null,
  color = "indigo",
}) => {
  const colorSchemes = {
    indigo: { bg: "from-indigo-50 to-indigo-100/60 dark:from-indigo-950/30 dark:to-indigo-900/20", icon: "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40" },
    emerald: { bg: "from-emerald-50 to-emerald-100/60 dark:from-emerald-950/30 dark:to-emerald-900/20", icon: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40" },
    amber: { bg: "from-amber-50 to-amber-100/60 dark:from-amber-950/30 dark:to-amber-900/20", icon: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40" },
    rose: { bg: "from-rose-50 to-rose-100/60 dark:from-rose-950/30 dark:to-rose-900/20", icon: "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/40" },
    purple: { bg: "from-purple-50 to-purple-100/60 dark:from-purple-950/30 dark:to-purple-900/20", icon: "text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/40" },
    slate: { bg: "from-slate-50 to-slate-100/60 dark:from-slate-950/30 dark:to-slate-900/20", icon: "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/40" },
  };

  const scheme = colorSchemes[color];

  return (
    <div
      className={`
        relative group rounded-xl p-3 border border-gray-200/60 dark:border-gray-800/60
        bg-gradient-to-br ${scheme.bg} backdrop-blur-sm transition-all duration-300
        hover:shadow-md hover:-translate-y-0.5 overflow-hidden
        min-h-[90px]
      `}
    >
      {/* Glow ring */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-tr from-white/10 via-${color}-200/20 to-transparent`} />

      {/* Top Row: Icon + Label + Trend */}
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <div className={`p-1.5 rounded-lg ${scheme.icon} flex items-center justify-center`}>
            <Icon size={14} strokeWidth={2} />
          </div>
          <span className="text-[11px] font-medium text-gray-600 dark:text-gray-400 leading-none">
            {label}
          </span>
        </div>

        {trend !== null && (
          <div
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold
            ${trend > 0
                ? "text-emerald-700 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/40"
                : "text-rose-700 dark:text-rose-400 bg-rose-100/80 dark:bg-rose-900/40"
              }`}
          >
            {trend > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mt-2 flex items-center gap-1">
        {/* {showCurrency && <CurrencyLogo className="w-3.5 h-3.5 shrink-0 opacity-80" />}
        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-tight leading-none"> */}
        {value ?? "--"}
        {/* </span> */}
      </div>
    </div>
  );
};