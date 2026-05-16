import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../../store/slices/adminSlice'
import { fetchAllTransactions } from '../../store/slices/adminSlice'

export default function AdminDashboard() {
  const dispatch = useDispatch()
  const { users, allTransactions, loading } = useSelector((state) => state.admin)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(fetchAllUsers())
    dispatch(fetchAllTransactions())
  }, [dispatch])

  const totalIncome = allTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = allTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-emerald-400 text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-slate-400 mt-1">Welcome, {user?.name}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total Users</p>
            <p className="text-3xl font-bold text-emerald-400">{users.length}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total Transactions</p>
            <p className="text-3xl font-bold text-blue-400">{allTransactions.length}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total Income</p>
            <p className="text-3xl font-bold text-green-400">KES {totalIncome.toLocaleString()}</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <p className="text-slate-400 text-sm mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-red-400">KES {totalExpenses.toLocaleString()}</p>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Registered Users</h2>
          {users.length === 0 ? (
            <p className="text-slate-400">No users found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-700">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="py-3 px-4 text-white">{u.name}</td>
                      <td className="py-3 px-4 text-slate-300">{u.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          u.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Transactions</h2>
          {allTransactions.length === 0 ? (
            <p className="text-slate-400">No transactions yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-700">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Amount</th>
                    <th className="text-left py-3 px-4">Type</th>
                    <th className="text-left py-3 px-4">Category</th>
                    <th className="text-left py-3 px-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {allTransactions.slice(0, 10).map((t) => (
                    <tr key={t.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                      <td className="py-3 px-4 text-white">{t.title}</td>
                      <td className={`py-3 px-4 font-medium ${
                        t.type === 'income' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {t.type === 'income' ? '+' : '-'} KES {t.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-300 capitalize">{t.type}</td>
                      <td className="py-3 px-4 text-slate-300">{t.category}</td>
                      <td className="py-3 px-4 text-slate-300">{t.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}