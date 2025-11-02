import { useState } from 'react'

export const usePagination = (initialPageSize = 10) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [totalPages, setTotalPages] = useState(1)
  const getPageNumbers = () => {
    const pages = []
    const showEllipsis = totalPages > 7

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (pageNumber <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (pageNumber >= totalPages - 3) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = pageNumber - 1; i <= pageNumber + 1; i++) pages.push(i)
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return pages
  }
  const handlePageJump = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value >= 1 && value <= totalPages) setPageNumber(value)
  }
  return {
    getPageNumbers,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
    totalPages,
    setTotalPages,
    handlePageJump,
  }
}
