'use client'
import { Users } from 'lucide-react'

interface StatusProps {
  isLoading: boolean
  filteredStatusPropsLength: number
  totalCount: number
  loadingText: string
  entityName: string
}

export const EmptyStatus: React.FC<StatusProps> = ({
  isLoading,
  filteredStatusPropsLength,
  totalCount,
  loadingText,
  entityName,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="flex items-center gap-2 text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
          <p>{loadingText}</p>
        </div>
      </div>
    )
  }

  if (filteredStatusPropsLength === 0) {
    const hasFiltersApplied = totalCount > 0
    const name = entityName || 'items'

    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
        <Users
          className="mx-auto mb-4 text-slate-300"
          size={64}
          aria-hidden="true"
        />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          {hasFiltersApplied
            ? `No ${name} on this page`
            : `No ${name} found`}
        </h3>
        <p className="text-slate-600">
          {hasFiltersApplied
            ? 'Try another page or adjust your filters'
            : 'Try adjusting your search or filters'}
        </p>
      </div>
    )
  }

  return null
}
