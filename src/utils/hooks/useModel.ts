'use client'

import { useEffect, useState } from 'react'
import { Supplier } from './useSuppliers'
// import { Supplier } from '@/types' // adjust import path if needed

// Define phone regex
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/

interface UseModelProps {
  isOpen: boolean
  onClose: () => void
  onSave: (supplier: Supplier) => void
  fetchSuppliers: () => void
  createSupplier: (supplier: Supplier) => Promise<void>
}

export const useModel = ({
  isOpen,
  onClose,
  onSave,
  fetchSuppliers,
  createSupplier,
}: UseModelProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: 'supplier@example.com',
    phoneNumber: '',
    activeStatus: true,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        email: 'supplier@example.com',
        phoneNumber: '',
        activeStatus: true,
      })
      setErrors({})
      setTouched({})
    }
  }, [isOpen])

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'phoneNumber'
          ? value.replace(/\D/g, '')
          : type === 'checkbox'
            ? checked
            : value,
    }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  // Field blur
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    validateField(field)
  }

  // Field validation
  const validateField = (field: string) => {
    const newErrors = { ...errors }

    if (field === 'name') {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      else if (formData.name.trim().length < 2)
        newErrors.name = 'Name must be at least 2 characters'
      else delete newErrors.name
    }

    if (field === 'phoneNumber') {
      if (!formData.phoneNumber.trim())
        newErrors.phoneNumber = 'Phone number is required'
      else if (!PHONE_REGEX.test(formData.phoneNumber))
        newErrors.phoneNumber = 'Enter a valid phone number (e.g., +14155552671)'
      else delete newErrors.phoneNumber
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Full form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    else if (formData.name.trim().length < 2)
      newErrors.name = 'Name must be at least 2 characters'

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = 'Phone number is required'
    else if (!PHONE_REGEX.test(formData.phoneNumber))
      newErrors.phoneNumber = 'Enter a valid phone number (e.g., +14155552671)'

    setErrors(newErrors)
    setTouched({ name: true, phoneNumber: true })
    return Object.keys(newErrors).length === 0
  }

  // Save handler
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setIsSubmitting(true)
      const newSupplier: Supplier = { ...formData }

      await createSupplier(newSupplier)
      fetchSuppliers()
      onSave(newSupplier)
      setShowSuccess(true)

      setTimeout(() => onClose(), 500)
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to create supplier:', err)
      setErrors({ submit: 'Failed to save supplier. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    formData,
    errors,
    touched,
    isSubmitting,
    showSuccess,
    handleInputChange,
    handleBlur,
    handleSave,
  }
}
