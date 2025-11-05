import { TrendingUp, Sparkles, Plus } from 'lucide-react'
import { ReactNode } from 'react';
import RangePicker from '../RangePicker/RangePicker';
import type { HeaderProps as HeaderPropsType } from '@/@types/header'

export default function Header({
  BtnText,
  setIsModalOpen,
  setChartData,
  setData,
  isVisible,
  time,
  H1Heading,
  Paragraph,
  Updates,
  StutsUpdates,
  showButton = true,
  showRangePicker = true,
  Icon
}: HeaderPropsType) {

  return (
    <div className="relative bg-gradient-to-br from-violet-50 via-white to-fuchsia-50/40 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-fuchsia-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        <div
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
        >
          {/* Top section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
            {/* Left: Title & Description */}
            <div className="flex-1 space-y-5">
              <div className="flex items-start gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-4 rounded-3xl shadow-2xl shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300">
                    {Icon ? Icon : <TrendingUp className="text-white" size={32} strokeWidth={2.5} />}
                  </div>
                </div>

                <div className="flex-1">
                  <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 bg-clip-text text-transparent leading-tight">
                    {H1Heading}
                  </h1>
                  <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
                    {Paragraph}
                  </p>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex flex-wrap gap-3">
                <div className="group relative px-5 py-2.5 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200/60 rounded-2xl shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center gap-2.5">
                    <div className="relative">
                      <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                    </div>
                    <span className="text-sm font-semibold text-emerald-800">
                      {StutsUpdates}
                    </span>
                  </div>
                </div>

                <div className="group relative px-5 py-2.5 bg-gradient-to-br from-amber-50 to-yellow-50 border-2 border-amber-200/60 rounded-2xl shadow-sm hover:shadow-lg hover:border-amber-300 transition-all duration-300 hover:-translate-y-0.5">
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={16} className="text-amber-600" strokeWidth={2.5} />
                    <span className="text-sm font-semibold text-amber-800">
                      {Updates}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Controls */}
            <div className="flex flex-col gap-4 items-stretch lg:items-end lg:w-80">
              {/* Range Picker */}
              {showRangePicker && (
                <div className="w-full">
                  <RangePicker
                    onDashboardFetched={(fetchedData) => {
                      if (setData) setData(fetchedData)
                    }}
                    onChartFetched={(chartFetched) => {
                      if (setChartData) setChartData(chartFetched)
                    }}
                  />
                </div>
              )}



              {/* Time display */}
              <div className="px-5 py-2.5 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-lg shadow-sm self-end">
                <p className="text-sm font-semibold text-slate-700 tracking-wide">
                  {time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Action button */}
          {showButton && (
            <div className="flex justify-start">
              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 text-white rounded-2xl font-bold shadow-2xl shadow-violet-500/40 hover:shadow-violet-500/60 transition-all duration-300 hover:scale-105 overflow-hidden"
                onClick={() => setIsModalOpen && setIsModalOpen(true)}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-700 transform -skew-x-12 group-hover:translate-x-full" />

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />

                <div className="relative flex items-center gap-3">
                  <div className="p-1 bg-white/20 rounded-lg group-hover:rotate-90 transition-transform duration-300">
                    <Plus size={20} strokeWidth={3} />
                  </div>
                  <span className="text-base tracking-wide">{BtnText}</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Gradient border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-violet-300 to-transparent opacity-60" />
    </div>
  )
}
