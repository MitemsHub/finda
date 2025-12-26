"use client";

import { useState } from 'react';
import Header from '@/components/landing/Header';
import { FaUsers, FaMagnifyingGlass, FaEllipsisVertical, FaUserShield, FaBan } from 'react-icons/fa6';

export default function AdminUsers() {
  const [users] = useState([
    { id: 1, name: "Alice Cooper", email: "alice@example.com", role: "User", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Bob Wilson", email: "bob@example.com", role: "Business", status: "Active", joinDate: "2024-02-20" },
    { id: 3, name: "Charlie Day", email: "charlie@example.com", role: "User", status: "Inactive", joinDate: "2024-03-10" },
    { id: 4, name: "Diana Prince", email: "diana@example.com", role: "Admin", status: "Active", joinDate: "2023-11-05" },
    { id: 5, name: "Evan Wright", email: "evan@example.com", role: "Business", status: "Suspended", joinDate: "2024-01-30" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-charcoal dark:text-white flex items-center gap-3">
              <FaUsers className="text-indigo" /> User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">View and manage all registered users</p>
          </div>
          <button className="px-6 py-3 bg-indigo text-white font-bold rounded-xl hover:bg-indigo/90 transition shadow-lg flex items-center gap-2">
            <FaUserShield /> Add New User
          </button>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="font-bold text-lg text-charcoal dark:text-white">All Users ({filteredUsers.length})</h3>
            <div className="relative w-full sm:w-auto">
              <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 pl-9 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo/20 text-charcoal dark:text-white"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5 text-left">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-charcoal dark:text-white text-sm">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold 
                        ${user.role === 'Admin' ? 'bg-red-100 text-red-600' : 
                          user.role === 'Business' ? 'bg-purple-100 text-purple-600' : 
                          'bg-blue-100 text-blue-600'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-semibold 
                        ${user.status === 'Active' ? 'text-green-600' : 
                          user.status === 'Suspended' ? 'text-red-600' : 
                          'text-gray-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full 
                          ${user.status === 'Active' ? 'bg-green-600' : 
                            user.status === 'Suspended' ? 'bg-red-600' : 
                            'bg-gray-400'}`}></span>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-indigo transition" title="Edit">
                          <FaEllipsisVertical />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition" title="Suspend">
                          <FaBan />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center text-sm text-gray-500">
            <span>Showing {filteredUsers.length} users</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 dark:border-white/10 rounded hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-gray-200 dark:border-white/10 rounded hover:bg-gray-50 dark:hover:bg-white/5">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
