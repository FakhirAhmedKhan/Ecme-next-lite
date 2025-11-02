'use client'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import React from 'react'

interface InputFieldProps {
  id: string
  label: string
  type?: string
  icon: React.ReactNode
  value: string
  placeholder?: string
  error?: string
  touched?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  required?: boolean
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  icon,
  value,
  placeholder,
  error,
  touched,
  onChange,
  onBlur,
  required = false,
}) => {
  const hasError = touched && !!error
  const isValid = touched && !error && value

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          id={id}
          type={type}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4
            ${hasError
              ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-100'
              : isValid
                ? 'border-emerald-400 bg-emerald-50 focus:border-emerald-500 focus:ring-emerald-100'
                : 'border-slate-300 bg-white focus:border-indigo-500 focus:ring-indigo-100'
            }`}
        />

        {isValid && (
          <CheckCircle2
            className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
            size={20}
          />
        )}

        {hasError && (
          <AlertCircle
            className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
            size={20}
          />
        )}
      </div>

      {hasError && (
        <p className="flex items-center gap-1.5 text-red-600 text-sm">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  )
}
