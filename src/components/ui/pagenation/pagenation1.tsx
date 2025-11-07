export const Pagination1 = ({
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
  totalPages
}: {
  pageNumber: number;
  setPageNumber: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600">Show:</label>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
          disabled={pageNumber === 1}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {pageNumber} of {totalPages}
        </span>
        <button
          onClick={() => setPageNumber(Math.min(totalPages, pageNumber + 1))}
          disabled={pageNumber === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};
