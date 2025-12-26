"use client";

import Header from '@/components/landing/Header';
import { FaUsers, FaStore, FaChartLine, FaTriangleExclamation, FaCheck, FaXmark, FaMagnifyingGlass, FaEllipsisVertical } from 'react-icons/fa6';
import Link from 'next/link';

export default function AdminDashboard() {

  // Mock Data
  const stats = [
    { label: "Total Users", value: "12,345", change: "+12%", icon: <FaUsers />, color: "bg-blue-500" },
    { label: "Active Businesses", value: "843", change: "+5%", icon: <FaStore />, color: "bg-teal" },
    { label: "Total Revenue", value: "$45,200", change: "+18%", icon: <FaChartLine />, color: "bg-indigo" },
    { label: "Pending Approvals", value: "12", change: "Urgent", icon: <FaTriangleExclamation />, color: "bg-orange-500" },
  ];

  const pendingBusinesses = [
    { id: 1, name: "The Gourmet Kitchen", category: "Restaurant", owner: "James Oliver", date: "2024-10-24", status: "Pending" },
    { id: 2, name: "Zen Yoga Studio", category: "Health", owner: "Sarah Lee", date: "2024-10-23", status: "Pending" },
    { id: 3, name: "Tech Solutions Inc", category: "Services", owner: "Mike Ross", date: "2024-10-22", status: "Pending" },
  ];

  const recentUsers = [
    { id: 1, name: "Alice Cooper", email: "alice@example.com", role: "User", status: "Active" },
    { id: 2, name: "Bob Wilson", email: "bob@example.com", role: "Business", status: "Active" },
    { id: 3, name: "Charlie Day", email: "charlie@example.com", role: "User", status: "Inactive" },
  ];

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-charcoal dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Platform overview and management controls</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/10 transition">
               Download Report
             </button>
             <button className="px-4 py-2 bg-charcoal dark:bg-white text-white dark:text-charcoal rounded-lg text-sm font-bold hover:opacity-90 transition">
               Settings
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white text-xl shadow-lg`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change === 'Urgent' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-black text-charcoal dark:text-white mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Business Approvals */}
            <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
                <h3 className="font-bold text-lg text-charcoal dark:text-white">Pending Business Approvals</h3>
                <Link href="/admin/approvals" className="text-teal text-sm font-semibold hover:underline">View All</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-white/5 text-left">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Business</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                    {pendingBusinesses.map((business) => (
                      <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-charcoal dark:text-white">{business.name}</div>
                          <div className="text-xs text-gray-500">{business.category}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{business.owner}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{business.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition" aria-label="Approve">
                              <FaCheck />
                            </button>
                            <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition" aria-label="Reject">
                              <FaXmark />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Users */}
            <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <h3 className="font-bold text-lg text-charcoal dark:text-white">Recent Users</h3>
                  <Link href="/admin/users" className="text-indigo text-sm font-semibold hover:underline">View All</Link>
                </div>
                <div className="relative">
                  <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    className="pl-9 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/20"
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
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo/10 flex items-center justify-center text-indigo text-xs font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold text-charcoal dark:text-white text-sm">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'Business' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 text-xs font-semibold ${user.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-green-600' : 'bg-gray-400'}`}></span>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-gray-400 hover:text-charcoal dark:hover:text-white" aria-label="More options">
                            <FaEllipsisVertical />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            <div className="bg-indigo text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-2">System Status</h3>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-indigo-100 text-sm">All systems operational</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Server Load</span>
                    <span className="font-bold">24%</span>
                  </div>
                  <div className="w-full bg-black/20 rounded-full h-1.5">
                    <div className="bg-white rounded-full h-1.5 w-[24%]"></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-80">Database</span>
                    <span className="font-bold">Good</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10">
              <h3 className="font-bold text-lg text-charcoal dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Create New User
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Broadcast Notification
                </button>
                <button className="w-full text-left px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Manage Categories
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
