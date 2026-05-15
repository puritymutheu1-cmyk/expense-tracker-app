import { useState } from "react";
import { useExpense } from "../../context/ExpenseContext";
import { formatCurrency, formatDate } from "../../utils/helpers";
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from "../../utils/constants";

const MOCK_USERS = ["Joel Kirapash","Alice Wambui","Brian Otieno","Carol Muthoni"];

function AdminTransactions() {
  const { incomes, expenses } = useExpense();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Attach a random mock user to each transaction for display
  const all = [
    ...incomes.map((i, idx)  => ({
      ...i,  type: "income",
      user: MOCK_USERS[idx % MOCK_USERS.length],
    })),
    ...expenses.map((e, idx) => ({
      ...e, type: "expense",
      user: MOCK_USERS[idx % MOCK_USERS.length],
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(t => filter === "all" || t.type === filter)
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()) ||
                 t.user.toLowerCase().includes(search.toLowerCase()));

  const getIcon = (item) => {
    const list = item.type === "income"
      ? INCOME_CATEGORIES
      : EXPENSE_CATEGORIES;
    return list.find(c => c.value === item.category)?.icon || "💰";
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">All Transactions</h1>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          className="input max-w-xs"
          placeholder="🔍 Search by title or user…"
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

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-500 text-left">
              {["Title","User","Type","Date","Amount"].map(h => (
                <th key={h}
                    className="pb-3 pr-4 font-medium last:text-right">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {all.length === 0 && (
              <tr>
                <td colSpan={5}
                    className="text-center text-gray-500 py-10">
                  No transactions found.
                </td>
              </tr>
            )}
            {all.map(item => (
              <tr key={item._id + item.type}
                  className="border-b border-gray-800/50
                             hover:bg-gray-800/30 transition-colors">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    <span>{getIcon(item)}</span>
                    <p className="text-white font-medium">{item.title}</p>
                  </div>
                </td>
                <td className="py-3 pr-4 text-gray-400">{item.user}</td>
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
                                  : "text-red-400"}`}>
                  {item.type === "income" ? "+" : "-"}
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-600 text-center">
        Showing {all.length} transactions across all users
      </p>
    </div>
  );
}

export default AdminTransactions;