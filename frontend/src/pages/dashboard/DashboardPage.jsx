import { useExpense } from "../../context/ExpenseContext";
import { formatCurrency, formatDate } from "../../utils/helpers";
import useAuth from "../../hooks/useAuth";

function StatCard({ title, amount, icon, color }) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl
                       ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-bold text-white mt-0.5">
          {formatCurrency(amount)}
        </p>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { user } = useAuth();
  const { incomes, expenses, totalIncome, totalExpense, balance } = useExpense();

  // Last 5 transactions combined and sorted
  const recent = [...incomes, ...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here's your financial summary
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Total Income"
          amount={totalIncome}
          icon="📈"
          color="bg-emerald-500/10"
        />
        <StatCard
          title="Total Expenses"
          amount={totalExpense}
          icon="📉"
          color="bg-red-500/10"
        />
        <StatCard
          title="Balance"
          amount={balance}
          icon="💰"
          color={balance >= 0 ? "bg-blue-500/10" : "bg-orange-500/10"}
        />
      </div>

      {/* Recent Transactions */}
      <div className="card">
        <h2 className="text-lg font-bold text-white mb-4">
          Recent Transactions
        </h2>

        <div className="space-y-3">
          {recent.map((item) => {
            const isIncome = incomes.some(i => i._id === item._id);
            return (
              <div
                key={item._id}
                className="flex items-center justify-between
                           py-3 border-b border-gray-800 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center
                                   justify-content text-lg
                                   ${isIncome
                                     ? "bg-emerald-500/10"
                                     : "bg-red-500/10"
                                   }`}>
                    {isIncome ? "💚" : "🔴"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(item.date)}
                    </p>
                  </div>
                </div>
                <span className={`text-sm font-semibold
                                  ${isIncome
                                    ? "text-emerald-400"
                                    : "text-red-400"
                                  }`}>
                  {isIncome ? "+" : "-"}{formatCurrency(item.amount)}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Income entries",  value: incomes.length,  color: "text-emerald-400" },
          { label: "Expense entries", value: expenses.length, color: "text-red-400"     },
          { label: "Savings rate",
            value: totalIncome > 0
              ? Math.round((balance / totalIncome) * 100) + "%"
              : "0%",
            color: "text-blue-400"
          },
          { label: "Biggest expense",
            value: expenses.length > 0
              ? formatCurrency(Math.max(...expenses.map(e => e.amount)))
              : "KES 0",
            color: "text-orange-400"
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="card text-center">
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;