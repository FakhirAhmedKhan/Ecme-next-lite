"use client"
import SearchBar from "../ui/searchbar/searchbar";
import { ExpenseTable } from "../ui/Table/ExpenseTable";
import { ExpenseFormModal } from "../ui/Models/ExpenseFormModal";
import useExpenseInvoice from "@/utils/hooks/useExpenseInvoice";
import { InvoiceStats } from "../ui/Table/InvoiceStats";
import Header from "../ui/Head/head";
import useDashboard from "@/utils/hooks/useDashboard";
import { Users } from "lucide-react";

const ExpenseInvoiceManager = () => {
  const {
    form,
    setForm,
    categories,
    suppliers,
    expenses,
    filteredExpenses,
    totalAmount,
    totalReceivable,
    showModal,
    handleEdit,
    handleDelete,
    handleSubmit,
    handleCloseModal,
    handleSaved,
    editExpense,
    error,
    isSubmitting,
    searchTerm,
    setSearchTerm,
  } = useExpenseInvoice();
  const { data, chartData, isVisible, time, greeting } = useDashboard()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <Header
          H1Heading="Expense Management"
          Paragraph="Manage your Expenses and track performance"
          BtnText="Add Expense"
          Updates="3 New Updates"
          StutsUpdates="All Systems Operational"
          setChartData={chartData}
          setData={data}
          isVisible={isVisible}
          time={time}
          greeting={greeting}
          showRangePicker={false}
          Icon={<Users className="text-white" size={28} />}
          showButton={false}
        />

        <InvoiceStats invoices={expenses} totalReceivable={totalReceivable} />

        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <ExpenseTable
          expenses={filteredExpenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ExpenseFormModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSaved={handleSaved}
          editExpense={editExpense}
          form={form}
          setForm={setForm}
          categories={categories}
          suppliers={suppliers}
          error={error}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ExpenseInvoiceManager;
