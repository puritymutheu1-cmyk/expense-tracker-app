
import { NavLink } from "react-router-dom"
import { LayoutDashboard, TrendingUp, TrendingDown, List, BarChart2, Users, ShieldCheck, X } from "lucide-react"

const userLinks = [
  { to: "/dashboard",            icon: LayoutDashboard, label: "Dashboard"    },
  { to: "/transactions/income",  icon: TrendingUp,      label: "Income"       },
  { to: "/transactions/expense", icon: TrendingDown,    label: "Expenses"     },
  { to: "/transactions",         icon: List,            label: "Transactions" },
  { to: "/reports",              icon: BarChart2,       label: "Reports"      },
]

const adminLinks = [
  { to: "/admin",              icon: ShieldCheck, label: "Admin Home"   },
  { to: "/admin/users",        icon: Users,       label: "Users"        },
  { to: "/admin/transactions", icon: List,        label: "Transactions" },
]

function Sidebar({ isAdmin, open, onClose }) {
  const links = isAdmin ? adminLinks : userLinks
  return (
    <aside className={`fixed md:relative inset-y-0 left-0 z-30 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transform transition-transform duration-200 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white md:hidden"><X size={18} /></button>
      <div className="h-16 flex items-center px-6 border-b border-gray-800">
        <span className="text-emerald-400 font-bold">💰 ExpenseIQ</span>
      </div>
      <nav className="flex-1 py-4 px-3 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} end={to === "/dashboard" || to === "/admin"} onClick={onClose}
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar