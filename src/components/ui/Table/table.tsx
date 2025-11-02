'use client'
import React from 'react'
import { CheckCircle2, XCircle, Edit2 } from 'lucide-react'

interface Entity {
  id: string
  Name: string
  email: string
  phoneNumber: string
  createdAt: string
  activeStatus: boolean
  totalOrders: number
  totalValue: number
}

interface TableProps {
  data: Entity[]          // renamed for clarity
  setIsModalOpen: (entity: Entity) => void
  isLoading?: boolean
}

export const Table: React.FC<TableProps> = ({ data, setIsModalOpen }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3">#</th>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Total Orders</th>
              <th className="text-left p-3">Total Value</th>
              <th className="text-left p-3">Created At</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entity, index) => (
              <tr
                key={entity.id}
                className="hover:bg-slate-50 transition-colors border-b border-slate-100"
              >
                <td className="px-6 py-4 text-sm font-medium">{index + 1}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {entity.Name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{entity.Name}</p>
                      <p className="text-xs text-slate-500">{entity.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{entity.phoneNumber}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{entity.totalOrders}</td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {entity.totalValue.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {new Date(entity.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${entity.activeStatus
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-600'
                      }`}
                  >
                    {entity.activeStatus ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                    {entity.activeStatus ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    // onClick={() => onEdit(entity)}
                    onClick={() => setIsModalOpen(true)}

                    className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group"
                  >
                    <Edit2 size={16} className="text-slate-400 group-hover:text-indigo-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
