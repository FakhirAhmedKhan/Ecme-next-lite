export const SummaryCard = ({
  icon: Icon,
  color,
  label,
  value
}: {
  icon: React.ElementType;
  color: string;
  label: string;
  value: string | number;
}) => {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200'
  };

  return (
    <div className="bg-white rounded-xl p-6 border-2 border-gray-100 hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-3 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};
