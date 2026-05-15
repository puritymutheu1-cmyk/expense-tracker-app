import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Layout from './components/layout/Layout';
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import TransactionsPage from './pages/transactions/TransactionsPage'
import ExpensePage from './pages/transactions/ExpensePage'
import IncomePage from './pages/transactions/IncomePage'
import ReportsPage from './pages/reports/ReportsPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminTransactions from './pages/admin/AdminTransactions'
import ProtectedRoute from './routes/ProtectedRoute'
import AdminRoute from './routes/AdminRoute'

export default function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const role = user?.role

  return (
    <Router>
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to={role === 'admin' ? '/admin' : '/dashboard'} replace /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />

        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard"            element={<DashboardPage />} />
          <Route path="/transactions"         element={<TransactionsPage />} />
          <Route path="/transactions/expense" element={<ExpensePage />} />
          <Route path="/transactions/income"  element={<IncomePage />} />
          <Route path="/reports"             element={<ReportsPage />} />
        </Route>

        <Route element={<AdminRoute><Layout isAdmin /></AdminRoute>}>
          <Route path="/admin"              element={<AdminDashboard />} />
          <Route path="/admin/users"        element={<AdminUsers />} />
          <Route path="/admin/transactions" element={<AdminTransactions />} />
        </Route>

        <Route path="/" element={<Navigate to={isAuthenticated ? (role === 'admin' ? '/admin' : '/dashboard') : '/login'} replace />} />
        <Route path="*" element={
          <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-emerald-400 mb-4">404</h1>
              <p className="text-slate-400">Page not found</p>
            </div>
          </div>
        } />
      </Routes>
    </Router>
  )
}