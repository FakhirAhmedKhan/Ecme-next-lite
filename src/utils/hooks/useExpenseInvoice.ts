"use client" 
import { useState, useEffect } from "react";
// ===== Types =====
interface Expense {
  id: string;
  categoryId: string;
  category: string;
  supplierId?: string;
  supplier?: string;
  amount: number;
  paymentMethod: string;
  expenseDate: string;
  description: string;
  createdAt: string;
}

interface ExpenseForm {
  categoryId: string;
  supplierId?: string;
  amount: string;
  paymentMethod: string;
  expenseDate: string;
  description: string;
}

interface Category {
  id?: string;
  categoryId?: string;
  name?: string;
  categoryName?: string;
}

interface Supplier {
  id: string;
  name: string;
}

interface Invoice {
  id: string;
  totalAmount: number;
  paidAmount: number;
  status: string;
}

// ===== Hook =====
export default function useExpenseInvoice() {
  const [form, setForm] = useState<ExpenseForm>({
    categoryId: "",
    supplierId: "",
    amount: "",
    paymentMethod: "Cash",
    expenseDate: new Date().toISOString().split("T")[0],
    description: "",
  });

  const [categories] = useState<Category[]>([
    { id: "1", name: "Office Supplies" },
    { id: "2", name: "Travel" },
    { id: "3", name: "Utilities" },
    { id: "4", name: "Marketing" },
    { id: "5", name: "Equipment" },
  ]);

  const [suppliers] = useState<Supplier[]>([
    { id: "1", name: "Supplier A" },
    { id: "2", name: "Supplier B" },
    { id: "3", name: "Supplier C" },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      categoryId: "1",
      category: "Office Supplies",
      supplierId: "1",
      supplier: "Supplier A",
      amount: 1250.0,
      paymentMethod: "Card",
      expenseDate: "2024-11-01",
      description: "Monthly office supplies purchase",
      createdAt: "2024-11-01T10:00:00Z",
    },
    {
      id: "2",
      categoryId: "2",
      category: "Travel",
      amount: 3500.0,
      paymentMethod: "Bank",
      expenseDate: "2024-11-03",
      description: "Business trip to Dubai",
      createdAt: "2024-11-03T14:30:00Z",
    },
    {
      id: "3",
      categoryId: "3",
      category: "Utilities",
      supplierId: "2",
      supplier: "Supplier B",
      amount: 850.0,
      paymentMethod: "Cash",
      expenseDate: "2024-11-05",
      description: "Electricity and water bills",
      createdAt: "2024-11-05T09:15:00Z",
    },
  ]);

  const [invoices] = useState<Invoice[]>([
    { id: "1", totalAmount: 5000, paidAmount: 5000, status: "paid" },
    { id: "2", totalAmount: 3000, paidAmount: 1500, status: "partial" },
    { id: "3", totalAmount: 2000, paidAmount: 0, status: "pending" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editExpense, setEditExpense] = useState<Expense | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // ===== Derived Values =====
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !filterCategory || expense.categoryId === filterCategory;

    return matchesSearch && matchesCategory;
  });

  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const totalReceivable = 3500;

  // ===== Handlers =====
  useEffect(() => {
    if (editExpense) {
      setForm({
        categoryId: editExpense.categoryId,
        supplierId: editExpense.supplierId || "",
        amount: editExpense.amount.toString(),
        paymentMethod: editExpense.paymentMethod,
        expenseDate: editExpense.expenseDate,
        description: editExpense.description,
      });
    } else {
      resetForm();
    }
  }, [editExpense]);

  const resetForm = () => {
    setForm({
      categoryId: "",
      supplierId: "",
      amount: "",
      paymentMethod: "Cash",
      expenseDate: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  const handleSubmit = async (onSaved?: () => void, onClose?: () => void) => {
    if (!form.categoryId || !form.amount || !form.expenseDate) {
      setError("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saving expense:", { ...form, amount: parseFloat(form.amount) });

      onSaved?.();
      onClose?.();
      resetForm();
    } catch {
      setError("Failed to save expense. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditExpense(expense);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses(expenses.filter((exp) => exp.id !== id));
    }
  };

  const handleSaved = () => {
    console.log("Expense saved successfully");
    setEditExpense(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditExpense(null);
  };

  // ===== Return Everything =====
  return {
    form,
    setForm,
    categories,
    suppliers,
    isSubmitting,
    error,
    expenses,
    setExpenses,
    invoices,
    showModal,
    setShowModal,
    editExpense,
    setEditExpense,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filteredExpenses,
    totalAmount,
    totalReceivable,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleSaved,
    handleCloseModal,
  };
}
