import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout as logoutAction } from '../../store/slices/authSlice';
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const logout = () => dispatch(logoutAction());
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/transactions/expense", label: "Expenses" },
    { path: "/transactions/income", label: "Income" },
    { path: "/reports", label: "Reports" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#1e293b",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          gap: "8px",
        }}
      >
        <h2 style={{ color: "#38bdf8", marginBottom: "24px", fontSize: "1.25rem" }}>
          💰 SpendWise
        </h2>

        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              color: location.pathname === link.path ? "#38bdf8" : "#cbd5e1",
              background: location.pathname === link.path ? "#0f172a" : "transparent",
              textDecoration: "none",
              fontWeight: location.pathname === link.path ? "600" : "400",
              transition: "background 0.2s",
            }}
          >
            {link.label}
          </Link>
        ))}

        <div style={{ marginTop: "auto" }}>
          <p style={{ color: "#94a3b8", fontSize: "0.8rem", marginBottom: "8px" }}>
            {user?.email || user?.name || "User"}
          </p>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              background: "#ef4444",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, background: "#f1f5f9", padding: "32px", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;