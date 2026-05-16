import { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { EXPENSE_CATEGORIES } from "../../utils/constants";

const EMPTY = {
  title: "", amount: "", category: "food",
  date: new Date().toISOString().split("T")[0], description: "",
};

function ExpensePage() {
  const { expenses, addExpense, deleteExpense } = useExpense();
  const [form,    setForm]    = useState(EMPTY);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({ ...form, amount: parseFloat(form.amount) });
    setForm(EMPTY);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Expenses</h1>
        <p className="text-gray-500 text-sm mt-1">
          Total: <span className="text-red-400 font-semibold">
            {formatCurrency(total)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Add Expense Form */}
        <div className="card">
          <h2 className="text-lg font-bold text-white mb-4">Add Expense</h2>

          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/20
                            text-emerald-400 rounded-lg px-4 py-3 text-sm mb-4">
              ✅ Expense added successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Title</label>
              <input
                className="input"
                placeholder="e.g. Grocery Shopping"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">Amount (KES)</label>
              <input
                type="number"
                className="input"
                placeholder="0.00"
                min="0"
                value={form.amount}
                onChange={e => setForm({ ...form, amount: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">Category</label>
              <select
                className="input"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                {EXPENSE_CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>
                    {c.icon} {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Date</label>
              <input
                type="date"
                className="input"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="label">Description (optional)</label>
              <input
                className="input"
                placeholder="Brief note…"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              + Add Expense
            </button>
          </form>
        </div>

        {/* Expense List */}
        <div className="card">
          <h2 className="text-lg font-bold text-white mb-4">
            Expense History ({expenses.length})
          </h2>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {expenses.length === 0 && (
              <p className="text-gray-500 text-sm text-center py-8">
                No expense records yet.
              </p>
            )}
            {expenses.map(item => {
              const cat = EXPENSE_CATEGORIES.find(c => c.value === item.category);
              return (
                <div key={item._id}
                     className="flex items-center justify-between p-3
                                bg-gray-800 rounded-lg group">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{cat?.icon || "💸"}</span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {cat?.label} • {formatDate(item.date)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-red-400 font-semibold text-sm">
                      -{formatCurrency(item.amount)}
                    </span>
                    <button
                      onClick={() => deleteExpense(item._id)}
                      className="opacity-0 group-hover:opacity-100 text-red-400
                                 hover:text-red-300 text-lg transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensePage;