'use client'
import { useState, useCallback } from 'react'

export const usePagination = (initialPageSize = 10) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [totalPages, setTotalPages] = useState(1)

  // Jump to a specific page
  const handlePageJump = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setPageNumber(page)
    }
  }, [totalPages])

  // Generate array of visible page numbers
  const getPageNumbers = useCallback(() => {
    const maxVisible = 5
    const half = Math.floor(maxVisible / 2)
    let start = Math.max(1, pageNumber - half)
    let end = Math.min(totalPages, start + maxVisible - 1)

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i)
  }, [pageNumber, totalPages])

  return {
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    totalPages,
    setTotalPages,
    handlePageJump,
    getPageNumbers,
  }
}
