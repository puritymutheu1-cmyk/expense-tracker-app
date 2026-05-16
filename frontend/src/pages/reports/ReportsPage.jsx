import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer, Legend,
} from "recharts";
import { useExpense } from "../../context/ExpenseContext";
import { formatCurrency } from "../../utils/helpers";
import { EXPENSE_CATEGORIES, CHART_COLORS } from "../../utils/constants";

function ReportsPage() {
  const { incomes, expenses, totalIncome, totalExpense, balance } = useExpense();

  // Bar chart — income vs expense per month (mock monthly data)
  const barData = [
    { month: "Jan", income: 70000, expense: 38000 },
    { month: "Feb", income: 75000, expense: 42000 },
    { month: "Mar", income: 80000, expense: 35000 },
    { month: "Apr", income: 115000, expense: 45200 },
    { month: "May", income: totalIncome, expense: totalExpense },
  ];

  // Pie chart — expenses by category
  const categoryTotals = EXPENSE_CATEGORIES.map(cat => ({
    name: cat.label,
    value: expenses
      .filter(e => e.category === cat.value)
      .reduce((s, e) => s + e.amount, 0),
  })).filter(c => c.value > 0);

  const PIE_COLORS = [
    "#22c55e","#ef4444","#3b82f6","#f59e0b",
    "#8b5cf6","#ec4899","#14b8a6","#f97316",
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Income",  value: totalIncome,  color: "text-emerald-400" },
          { label: "Total Expense", value: totalExpense, color: "text-red-400"     },
          { label: "Net Balance",   value: balance,
            color: balance >= 0 ? "text-blue-400" : "text-orange-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="card">
            <p className="text-gray-500 text-sm">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>
              {formatCurrency(value)}
            </p>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="card">
        <h2 className="text-lg font-bold text-white mb-4">
          Monthly Overview
        </h2>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={barData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280"
                   tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={v => formatCurrency(v)}
            />
            <Legend />
            <Bar dataKey="income"  name="Income"  fill="#22c55e" radius={[4,4,0,0]} />
            <Bar dataKey="expense" name="Expense" fill="#ef4444" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-bold text-white mb-4">
            Expenses by Category
          </h2>
          {categoryTotals.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              No expense data yet.
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={categoryTotals}
                  cx="50%" cy="50%"
                  outerRadius={90}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryTotals.map((_, i) => (
                    <Cell
                      key={i}
                      fill={PIE_COLORS[i % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={v => formatCurrency(v)} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category Breakdown List */}
        <div className="card">
          <h2 className="text-lg font-bold text-white mb-4">
            Category Breakdown
          </h2>
          <div className="space-y-3">
            {categoryTotals.length === 0 && (
              <p className="text-gray-500 text-sm">No data yet.</p>
            )}
            {categoryTotals.map((cat, i) => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{cat.name}</span>
                  <span className="text-white font-medium">
                    {formatCurrency(cat.value)}
                  </span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.min(
                        (cat.value / totalExpense) * 100, 100
                      )}%`,
                      background: PIE_COLORS[i % PIE_COLORS.length],
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;