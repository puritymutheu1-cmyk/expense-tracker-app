import { Menu, Bell, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-gray-900 border-b border-gray-800
                       flex items-center justify-between px-4 md:px-6">

      {/* Left: hamburger (mobile) + logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-800 md:hidden"
        >
          <Menu size={20} />
        </button>
        <Link to="/dashboard" className="text-emerald-400 text-xl font-bold">
          💰 ExpenseIQ
        </Link>
      </div>

      {/* Right: bell + user name + logout */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-gray-800">
          <Bell size={18} className="text-gray-400" />
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-gray-700">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20
                          border border-emerald-500/40 flex items-center justify-center">
            <User size={16} className="text-emerald-400" />
          </div>
          <span className="hidden sm:block text-sm text-gray-300">
            {user?.name}
          </span>
        </div>

        <button
          onClick={logout}
          className="p-2 rounded-lg hover:bg-red-500/10
                     text-gray-400 hover:text-red-400 ml-1"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;