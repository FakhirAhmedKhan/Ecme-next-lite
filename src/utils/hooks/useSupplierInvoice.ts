"use client"
import { useCallback, useEffect, useState, useMemo } from 'react';


// ==================== TYPES ====================
interface supplierInvoice {
  id: string;
  supplierName: string;
  email?: string;
  totalAmount: number;
  paidAmount: number;
  createdAt: string;
  status: 'Paid' | 'Partial' | 'Unpaid' | 'Pending' | 'Overdue';
  payments?: Payment[];
  returns?: Return[];
}

interface Payment {
  id: string;
  amount: number;
  paidAt: string;
}

interface Return {
  id: string;
  amount: number;
  narration?: string;
  createdAt: string;
}

interface supplierSummary {
  totalReceivable: number;
  totalInvoices: number;
}

// ==================== MOCK DATA ====================
const mockInvoices: supplierInvoice[] = [
  {
    id: 'INV-001',
    supplierName: 'John Doe',
    email: 'john.doe@example.com',
    totalAmount: 5000,
    paidAmount: 2000,
    createdAt: '2024-11-06T10:30:00',
    status: 'Partial',
    payments: [
      { id: 'pay-1', amount: 1000, paidAt: '2024-11-02T14:20:00' },
      { id: 'pay-2', amount: 1000, paidAt: '2024-11-04T09:15:00' }
    ]
  },
  {
    id: 'INV-002',
    supplierName: 'Jane Smith',
    email: 'jane.smith@example.com',
    totalAmount: 3500,
    paidAmount: 3500,
    createdAt: '2024-11-05T15:45:00',
    status: 'Paid',
    payments: [
      { id: 'pay-3', amount: 3500, paidAt: '2024-11-05T16:00:00' }
    ]
  },
  {
    id: 'INV-003',
    supplierName: 'Bob Johnson',
    email: 'bob.j@example.com',
    totalAmount: 8200,
    paidAmount: 0,
    createdAt: '2024-10-15T08:20:00',
    status: 'Overdue',
    returns: [
      { id: 'ret-1', amount: 500, narration: 'Damaged goods', createdAt: '2024-10-20T11:30:00' }
    ]
  },
  {
    id: 'INV-004',
    supplierName: 'Alice Williams',
    email: 'alice.w@example.com',
    totalAmount: 2800,
    paidAmount: 0,
    createdAt: '2024-11-01T12:00:00',
    status: 'Pending'
  },
  {
    id: 'INV-005',
    supplierName: 'Charlie Brown',
    email: 'charlie.b@example.com',
    totalAmount: 6500,
    paidAmount: 6500,
    createdAt: '2024-10-28T09:30:00',
    status: 'Paid',
    payments: [
      { id: 'pay-4', amount: 3000, paidAt: '2024-10-29T10:00:00' },
      { id: 'pay-5', amount: 3500, paidAt: '2024-10-30T14:30:00' }
    ]
  }
];

// ==================== CUSTOM HOOK ====================
export function useSupplierInvoice({ useMock = true }: { useMock?: boolean } = {}) {
  const [expandedInvoices, setExpandedInvoices] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [invoices, setInvoices] = useState<supplierInvoice[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<supplierInvoice | null>(null);
  const [amount, setAmount] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch invoices
  const fetchInvoices = useCallback(async () => {
    setIsLoading(true);
    try {
      if (useMock) {
        await new Promise(res => setTimeout(res, 500));
        setInvoices(mockInvoices);
        setTotalPages(1);
        return;
      }
      // Real API call would go here
    } catch (error) {
      console.error('Error fetching invoices:', error);
      setInvoices([]);
    } finally {
      setIsLoading(false);
    }
  }, [useMock, pageNumber, pageSize]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  // Calculate summary
  const summary = useMemo(() => {
    const totalReceivable = invoices.reduce(
      (sum, inv) => sum + Math.max(0, inv.totalAmount - inv.paidAmount),
      0
    );
    return {
      totalReceivable,
      totalInvoices: invoices.length
    };
  }, [invoices]);

  // Toggle expand
  const toggleExpand = useCallback((invoiceId: string) => {
    setExpandedInvoices(prev => {
      const next = new Set(prev);
      next.has(invoiceId) ? next.delete(invoiceId) : next.add(invoiceId);
      return next;
    });
  }, []);

  // Payment modal
  const openPaymentModal = useCallback((invoice: supplierInvoice) => {
    setSelectedInvoice(invoice);
    const outstanding = Math.max(0, invoice.totalAmount - invoice.paidAmount);
    setAmount(outstanding > 0 ? String(outstanding) : '');
    setSubmitError(null);
    setIsModalOpen(true);
  }, []);

  const closePaymentModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedInvoice(null);
    setAmount('');
    setSubmitError(null);
    setIsSubmitting(false);
  }, []);

  const handleSubmitPayment = useCallback(async () => {
    if (!selectedInvoice) return;

    const outstanding = Math.max(0, selectedInvoice.totalAmount - selectedInvoice.paidAmount);
    const parsed = Number(amount);

    if (Number.isNaN(parsed)) return setSubmitError('Please enter a valid number.');
    if (parsed <= 0) return setSubmitError('Amount must be greater than 0.');
    if (parsed > outstanding) return setSubmitError('Amount cannot exceed outstanding balance.');

    setIsSubmitting(true);

    if (useMock) {
      await new Promise(res => setTimeout(res, 800));
      setInvoices(prev =>
        prev.map(inv =>
          inv.id === selectedInvoice.id
            ? {
              ...inv,
              paidAmount: inv.paidAmount + parsed,
              status: inv.paidAmount + parsed >= inv.totalAmount ? 'Paid' : 'Partial',
              payments: [
                ...(inv.payments || []),
                { id: `pay-${Date.now()}`, amount: parsed, paidAt: new Date().toISOString() }
              ]
            }
            : inv
        )
      );
      closePaymentModal();
      return;
    }

    setIsSubmitting(false);
  }, [selectedInvoice, amount, useMock, closePaymentModal]);

  // Download handler
  const handleDownload = useCallback((invoice: supplierInvoice) => {
    console.log('Downloading invoice:', invoice.id);
    alert(`Downloading invoice ${invoice.id} as PDF`);
  }, []);

  // Print handler
  const handlePrint = useCallback((invoice: supplierInvoice) => {
    console.log('Printing invoice:', invoice.id);
    alert(`Printing invoice ${invoice.id}`);
  }, []);

  return {
    expandedInvoices,
    isLoading,
    summary,
    invoices,
    isModalOpen,
    selectedInvoice,
    amount,
    submitError,
    isSubmitting,
    pageNumber,
    pageSize,
    totalPages,
    setAmount,
    setPageNumber,
    setPageSize,
    toggleExpand,
    openPaymentModal,
    closePaymentModal,
    handleSubmitPayment,
    handleDownload,
    handlePrint,
  };
}

