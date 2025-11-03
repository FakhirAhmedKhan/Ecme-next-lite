import { TrendingUp, Sparkles } from 'lucide-react'
import RangePicker from '../RangePicker/RangePicker'

export default function DashboardHeader({ setChartData, setData, isVisible, time, H1tittlw, paragraph, Updates, StutsUpdates }) {

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-10">
        <div
          className={`flex flex-col md:flex-row md:items-center md:justify-between gap-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          {/* Left section */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-60 animate-pulse" />
                <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
                  <TrendingUp className="text-white" size={28} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-indigo-600 mb-1">
                  {/* {greeting()} */}
                </p>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                  {H1tittlw}
                </h1>
              </div>
            </div>

            <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
              {paragraph}
            </p>

            {/* Quick stats pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="group px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-slate-700">
                    {StutsUpdates}
                  </span>
                </div>
              </div>
              <div className="group px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-amber-500" />
                  <span className="text-sm font-medium text-slate-700">
                    {Updates}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex flex-col gap-4 items-end w-full md:w-auto">
            {/* Range Picker */}
            <div className="w-full md:w-[320px]">
              <RangePicker
                onDashboardFetched={(fetchedData) => {
                  setData(fetchedData)
                }}
                onChartFetched={(chartFetched) => {
                  setChartData(chartFetched)
                }}
              />
            </div>

            {/* Time display */}
            <div className="px-4 py-2 bg-white/60 backdrop-blur-md border border-slate-200/60 rounded-xl shadow-sm">
              <p className="text-sm font-medium text-slate-600">
                {time.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
    </div>
  )
}
