'use client'
import React from 'react'
import { useModel } from '@/utils/hooks/useModel'
import {
  X,
  User,
  Phone,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
} from 'lucide-react'
import { InputField } from '../Inputs/InputField'

interface CustomerModalFormProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  fetchCustomer: () => void
  H2Tittle: string
  Paragraph: string
  ModelLabel: string
  Numberlabel: string
  showSuccessText: string
}

export const CustomerModalForm: React.FC<CustomerModalFormProps> = ({
  isOpen,
  onClose,
  onSave,
  fetchCustomer,
  H2Tittle,
  Paragraph,
  ModelLabel,
  Numberlabel,
  showSuccessText,
}) => {
  const {
    formData,
    errors,
    touched,
    isSubmitting,
    showSuccess,
    handleInputChange,
    handleBlur,
    handleSave,
  } = useModel({
    isOpen,
    onClose,
    onSave,
    fetchCustomer,
  })

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform animate-slideUp"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl">
                <Building2 className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{H2Tittle}</h2>
                <p className="text-sm text-slate-500">{Paragraph}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-lg hover:bg-slate-100 transition-colors group"
            >
              <X className="text-slate-400 group-hover:text-slate-600" size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="p-6 space-y-5">
            {/* Name Field */}
            <InputField
              id="name"
              label={ModelLabel}
              icon={<User size={18} />}
              value={formData.name}
              placeholder="Enter Customer name"
              error={errors.name}
              touched={touched.name}
              onChange={handleInputChange}
              onBlur={() => handleBlur('name')}
              required
            />

            {/* Phone Field */}
            <InputField
              id="phoneNumber"
              label={Numberlabel}
              icon={<Phone size={18} />}
              value={formData.phoneNumber}
              placeholder="+14155552671"
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
              onChange={handleInputChange}
              onBlur={() => handleBlur('phoneNumber')}
              required
            />

            {/* Submit Error */}
            {errors.submit && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle size={16} />
                <p>{errors.submit}</p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Saving...
                  </>
                ) : (
                  'Save Customer'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-[60] animate-slideInRight">
          <div className="flex items-center gap-3 bg-white border-2 border-emerald-500 rounded-xl shadow-2xl p-4 min-w-[300px]">
            <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="text-white" size={20} />
            </div>
            <div>
              <p className="font-bold text-slate-900">Success!</p>
              <p className="text-sm text-slate-600">{showSuccessText}</p>
            </div>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.4s ease-out; }
      `}</style>
    </>
  )
}

export default CustomerModalForm
