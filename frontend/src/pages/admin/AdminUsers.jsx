import { useState } from "react";

const MOCK_USERS = [
  { id:1, name:"Bravin Nevile", email:"Bravin@test.com",    role:"admin", joined:"2025-01-10", status:"active"   },
  { id:2, name:"Purity Mutheu",  email:"Purity@test.com",   role:"user",  joined:"2025-02-14", status:"active"   },
  { id:3, name:"Nabill Hassan",  email:"Nabil@test.com",   role:"user",  joined:"2025-03-05", status:"active"   },
  { id:4, name:"Isabel Nyawira", email:"Isabel@test.com",   role:"user",  joined:"2025-04-20", status:"inactive" },

];

function AdminUsers() {
  const [users,  setUsers]  = useState(MOCK_USERS);
  const [search, setSearch] = useState("");

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleRole = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id
        ? { ...u, role: u.role === "admin" ? "user" : "admin" }
        : u
    ));
  };

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u =>
      u.id === id
        ? { ...u, status: u.status === "active" ? "inactive" : "active" }
        : u
    ));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Manage Users</h1>

      <input
        className="input max-w-xs"
        placeholder="🔍 Search users…"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-500 text-left">
              <th className="pb-3 pr-4 font-medium">User</th>
              <th className="pb-3 pr-4 font-medium">Role</th>
              <th className="pb-3 pr-4 font-medium">Status</th>
              <th className="pb-3 pr-4 font-medium">Joined</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}
                  className="border-b border-gray-800/50 hover:bg-gray-800/30">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20
                                    flex items-center justify-center
                                    text-emerald-400 font-bold text-sm">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className={u.role === "admin"
                    ? "badge-expense"
                    : "badge-income"}>
                    {u.role}
                  </span>
                </td>
                <td className="py-3 pr-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full border
                    ${u.status === "active"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-gray-500/10 text-gray-400 border-gray-500/20"
                    }`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-400">{u.joined}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleRole(u.id)}
                      className="text-xs px-2 py-1 bg-blue-500/10 text-blue-400
                                 border border-blue-500/20 rounded-lg
                                 hover:bg-blue-500/20 transition-colors"
                    >
                      Toggle Role
                    </button>
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className="text-xs px-2 py-1 bg-gray-700 text-gray-300
                                 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      {u.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;