import { Plus, Users, TrendingUp } from 'lucide-react'

export const Header = ({ setIsModalOpen, H1Heading, Paragraph, BtnText }) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-slate-200">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Left section */}
          <div className="flex items-start gap-6">
            {/* Icon badge */}
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Users className="w-8 h-8 text-white" />
            </div>

            {/* Text content */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent tracking-tight">
                  {H1Heading}
                </h1>
              </div>
              <p className="text-slate-600 text-lg mb-3">
                {Paragraph}
              </p>

              {/* Stats row */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-semibold text-slate-700">Active Dashboard</span>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="hidden sm:inline text-sm text-slate-500">Real-time sync</span>
              </div>
            </div>
          </div>

          {/* Right section - Action button */}
          <div className="flex items-center gap-3">
            <button
              className="group relative flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:scale-105 overflow-hidden"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>

              <div className="relative flex items-center gap-2">
                <Plus size={20} strokeWidth={2.5} />
                <span>{BtnText}</span>
              </div>
            </button>
          </div>
        </div>

        {/* Decorative accent line */}
        <div className="mt-6 h-1 w-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"></div>
      </div>
    </div>
  )
}

export default Header