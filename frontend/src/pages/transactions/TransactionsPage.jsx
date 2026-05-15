import { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../../utils/constants";

function TransactionsPage() {
  const { incomes, expenses } = useExpense();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const allTransactions = [
    ...incomes.map(i  => ({ ...i,  type: "income"  })),
    ...expenses.map(e => ({ ...e, type: "expense" })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(t => filter === "all" || t.type === filter)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const getCategoryLabel = (item) => {
    const list = item.type === "income"
      ? INCOME_CATEGORIES
      : EXPENSE_CATEGORIES;
    return list.find(c => c.value === item.category)?.label || item.category;
  };

  const getCategoryIcon = (item) => {
    const list = item.type === "income"
      ? INCOME_CATEGORIES
      : EXPENSE_CATEGORIES;
    return list.find(c => c.value === item.category)?.icon || "💰";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">All Transactions</h1>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="input max-w-xs"
          placeholder="🔍 Search transactions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {["all", "income", "expense"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize
                          transition-colors
                          ${filter === f
                            ? "bg-emerald-500 text-gray-950"
                            : "bg-gray-800 text-gray-400 hover:text-white"
                          }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              {["Title", "Category", "Type", "Date", "Amount"].map(h => (
                <th key={h}
                    className="text-left text-gray-500 font-medium
                               pb-3 pr-4 last:text-right">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allTransactions.length === 0 && (
              <tr>
                <td colSpan={5}
                    className="text-center text-gray-500 py-10">
                  No transactions found.
                </td>
              </tr>
            )}
            {allTransactions.map(item => (
              <tr key={item._id + item.type}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30
                             transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <span>{getCategoryIcon(item)}</span>
                    <div>
                      <p className="text-white font-medium">{item.title}</p>
                      {item.description && (
                        <p className="text-xs text-gray-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-400">
                  {getCategoryLabel(item)}
                </td>
                <td className="py-3 pr-4">
                  <span className={item.type === "income"
                    ? "badge-income"
                    : "badge-expense"}>
                    {item.type}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-400">
                  {formatDate(item.date)}
                </td>
                <td className={`py-3 text-right font-semibold
                                ${item.type === "income"
                                  ? "text-emerald-400"
                                  : "text-red-400"
                                }`}>
                  {item.type === "income" ? "+" : "-"}
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="card">
          <p className="text-xs text-gray-500">Showing</p>
          <p className="text-lg font-bold text-white">
            {allTransactions.length}
          </p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500">Total In</p>
          <p className="text-lg font-bold text-emerald-400">
            {formatCurrency(
              allTransactions
                .filter(t => t.type === "income")
                .reduce((s, t) => s + t.amount, 0)
            )}
          </p>
        </div>
        <div className="card">
          <p className="text-xs text-gray-500">Total Out</p>
          <p className="text-lg font-bold text-red-400">
            {formatCurrency(
              allTransactions
                .filter(t => t.type === "expense")
                .reduce((s, t) => s + t.amount, 0)
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TransactionsPage;