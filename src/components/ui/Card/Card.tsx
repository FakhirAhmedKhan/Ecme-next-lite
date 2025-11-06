// import React from 'react'
// import { CurrencyLogo } from '../CurrencyLogo/CurrencyLogo'

// export const StatCard = ({
//   label,
//   value,
//   icon: Icon,
//   gradient,
//   valueColor = 'text-slate-900',
// }) => {
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 ease-in-out">
//       <div className="flex items-center justify-between">
//         {/* Left side (Value + Label) */}
//         <div className="flex flex-col">
//           <div className="flex items-center gap-2">
//             <div className="flex items-center gap-1">
//               {/* <CurrencyLogo className='w-4 h-4' /> 🪙 Currency Icon */}
//               <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
//             </div>
//             {/* {trend && (
//               <span
//                 className={`text-sm font-semibold ${trend > 0 ? 'text-emerald-600' : 'text-rose-500'
//                   }`}
//               >
//                 {trend > 0 ? `+${trend}%` : `${trend}%`}
//               </span>
//             )} */}
//           </div>
//           <p className="text-gray-500 text-sm font-medium mt-1">{label}</p>
//         </div>

//         {/* Right side (Icon Box) */}
//         <div
//           className={`w-12 h-12 ${gradient} rounded-xl flex items-center justify-center`}
//         >
//           <Icon size={26} className="text-white" />
//         </div>
//       </div>
//     </div>
//   )
// }
