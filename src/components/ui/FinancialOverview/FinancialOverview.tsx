import React from "react";
import { Landmark, LucideIcon } from "lucide-react";

interface FinancialCard {
  title: string;
  value: number;
  icon: LucideIcon;
  bgColor: string;
  iconBg: string;
  showCurrency?: boolean;
}

interface FinancialOverviewProps {
  data: any;
  financialCards: FinancialCard[];
  H3tittle: string;
  paragraph: string;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  financialCards,
  paragraph,
  H3tittle,
}) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200/50 p-8 hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
            <Landmark className="text-white" size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{H3tittle}</h3>
            <p className="text-sm text-slate-500 mt-1">{paragraph}</p>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {financialCards.map((card, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl ${card.bgColor} border border-slate-200/50 p-5 hover:scale-[1.02] transition-all duration-300`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="absolute inset-0 rotate-45 bg-gradient-to-br from-white to-transparent rounded-full"></div>
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${card.iconBg} shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <card.icon className="text-white" size={22} />
                </div>
              </div>

              {/* Value */}
              <div>
                <p className="text-sm font-medium text-slate-600 mb-1">
                  {card.title}
                </p>
                <div className="flex items-center gap-2">
                  {/* Uncomment if you have CurrencyLogo component */}
                  {/* {card.showCurrency && <CurrencyLogo className='w-4 h-4' />} */}
                  <p className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300">
                    {card.showCurrency && "$"}
                    {card.value?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialOverview;