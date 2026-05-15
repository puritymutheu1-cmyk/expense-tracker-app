import { createContext, useState, useCallback } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]  = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );
  const [loading] = useState(false);

  const login = useCallback(async (email, password) => {
    // MOCK login — replace with real API call when backend ready
    const mockUser = {
      id: "1",
      name: "Joel Kirapash",
      email: email,
      role: email.includes("admin") ? "admin" : "user",
    };
    localStorage.setItem("token", "mock-token-123");
    localStorage.setItem("user", JSON.stringify(mockUser));
    setToken("mock-token-123");
    setUser(mockUser);
    return mockUser;
  }, []);

  const register = useCallback(async (name, email, password) => {
    // MOCK register — replace with real API call when backend ready
    const mockUser = { id: "2", name, email, role: "user" };
    localStorage.setItem("token", "mock-token-123");
    localStorage.setItem("user", JSON.stringify(mockUser));
    setToken("mock-token-123");
    setUser(mockUser);
    return mockUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user, token, loading,
      isAdmin: user?.role === "admin",
      isAuthenticated: !!token && !!user,
      login, register, logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}