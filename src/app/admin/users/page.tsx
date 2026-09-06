"use client";

import { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { AdminShell } from '@/components/admin/AdminShell';

const USERS = [
  { name: 'Alice Cooper', email: 'alice@example.com', role: 'User', status: 'Active', joined: 'Aug 12, 2025', bookings: 14 },
  { name: 'Bob Wilson', email: 'bob@example.com', role: 'Business', status: 'Active', joined: 'Aug 8, 2025', bookings: 0 },
  { name: 'Charlie Day', email: 'charlie@example.com', role: 'User', status: 'Inactive', joined: 'Jul 30, 2025', bookings: 2 },
  { name: 'Dana Reeves', email: 'dana@example.com', role: 'Business', status: 'Active', joined: 'Jul 22, 2025', bookings: 0 },
  { name: 'Elena Foss', email: 'elena@example.com', role: 'Admin', status: 'Active', joined: 'Jul 15, 2025', bookings: 0 },
  { name: 'Frank Osei', email: 'frank@example.com', role: 'User', status: 'Active', joined: 'Jul 9, 2025', bookings: 7 },
  { name: 'Grace Liu', email: 'grace@example.com', role: 'User', status: 'Active', joined: 'Jun 28, 2025', bookings: 21 },
];

export default function AdminUsers() {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const users = USERS;

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    const matchesQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  return (
    <AdminShell
      title="Users"
      subtitle="Everyone with a Finda account — customers, owners, and staff."
      active="/admin/users"
      action={
        <div className="relative w-full md:w-72">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search users…"
            aria-label="Search users"
            className="field !pl-11 !py-2.5"
          />
        </div>
      }
    >
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {['all', 'User', 'Business', 'Admin'].map((role) => (
          <button
            key={role}
            onClick={() => setRoleFilter(role)}
            aria-pressed={roleFilter === role}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap capitalize transition ${
              roleFilter === role
                ? 'bg-primary text-white'
                : 'bg-sunken-light dark:bg-white/5 text-ink-700 dark:text-ink-700-inv hover:bg-primary-soft dark:hover:bg-primary/15'
            }`}
          >
            {role === 'all' ? `All (${users.length})` : role}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line-light dark:border-line-dark bg-sunken-light/50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv">User</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv hidden md:table-cell">Role</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv hidden lg:table-cell">Joined</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv">Bookings</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-light dark:divide-line-dark">
              {filtered.map((u) => (
                <tr key={u.email} className="hover:bg-sunken-light/50 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-sunken-light dark:bg-white/10 text-ink-700 dark:text-ink-700-inv text-xs font-bold flex items-center justify-center shrink-0">
                        {u.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                      <div>
                        <div className="font-semibold text-ink-900 dark:text-ink-900-inv">{u.name}</div>
                        <div className="text-xs text-muted">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className={`badge text-[10px] ${u.role === 'Admin' ? 'badge-danger' : u.role === 'Business' ? 'badge-accent' : 'badge-primary'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-ink-700 dark:text-ink-700-inv hidden lg:table-cell">{u.joined}</td>
                  <td className="px-6 py-4 font-semibold text-ink-900 dark:text-ink-900-inv">{u.bookings}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                      <span className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-success' : 'bg-ink-300'}`} aria-hidden />
                      <span className={u.status === 'Active' ? 'text-success' : 'text-ink-400'}>{u.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted">
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
