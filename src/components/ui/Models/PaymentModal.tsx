export const PaymentModal = ({
  isOpen,
  invoice,
  amount,
  setAmount,
  submitError,
  isSubmitting,
  onClose,
  onSubmit
}: {
  isOpen: boolean;
  invoice: CustomerInvoice | null;
  amount: string;
  setAmount: (val: string) => void;
  submitError: string | null;
  isSubmitting: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  if (!isOpen || !invoice) return null;

  const outstanding = Math.max(0, invoice.totalAmount - invoice.paidAmount);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Invoice</p>
            <p className="font-bold text-gray-900">{invoice.id}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Outstanding Balance</p>
            <p className="font-bold text-rose-700 text-xl">${outstanding.toLocaleString()}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0.00"
              step="0.01"
              min="0"
              max={outstanding}
            />
            {submitError && (
              <p className="mt-2 text-sm text-rose-600">{submitError}</p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Processing...' : 'Submit Payment'}
          </button>
        </div>
      </div>
    </div>
  );
};
