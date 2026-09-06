"use client";

import { useState } from 'react';
import { FaMagnifyingGlass, FaStar, FaCircleCheck } from 'react-icons/fa6';
import { AdminShell } from '@/components/admin/AdminShell';
import { getAllVisibleBusinesses } from '@/lib/data/demo';

export default function AdminBusinesses() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const businesses = getAllVisibleBusinesses();

  const filtered = businesses.filter((b) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.neighborhood.toLowerCase().includes(q);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'verified' ? b.verified : !b.verified);
    return matchesQuery && matchesStatus;
  });

  return (
    <AdminShell
      title="Businesses"
      subtitle="Every listing on the platform, verified or not."
      active="/admin/businesses"
      action={
        <div className="relative w-full md:w-72">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search businesses…"
            aria-label="Search businesses"
            className="field !pl-11 !py-2.5"
          />
        </div>
      }
    >
      <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
        {[
          { key: 'all', label: `All (${businesses.length})` },
          { key: 'verified', label: `Verified (${businesses.filter((b) => b.verified).length})` },
          { key: 'unverified', label: `Unverified (${businesses.filter((b) => !b.verified).length})` },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setStatusFilter(f.key)}
            aria-pressed={statusFilter === f.key}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
              statusFilter === f.key
                ? 'bg-primary text-white'
                : 'bg-sunken-light dark:bg-white/5 text-ink-700 dark:text-ink-700-inv hover:bg-primary-soft dark:hover:bg-primary/15'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line-light dark:border-line-dark bg-sunken-light/50 dark:bg-white/5 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv">Business</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv hidden md:table-cell">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv hidden lg:table-cell">Neighborhood</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv">Rating</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 dark:text-ink-400-inv">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line-light dark:divide-line-dark">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-sunken-light/50 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-ink-900 dark:text-ink-900-inv flex items-center gap-1.5">
                      {b.name}
                      {b.verified && <FaCircleCheck className="text-primary dark:text-primary-bright text-xs" aria-label="Verified" />}
                    </div>
                    <div className="text-xs text-muted md:hidden">{b.category}</div>
                  </td>
                  <td className="px-6 py-4 text-ink-700 dark:text-ink-700-inv hidden md:table-cell">{b.category}</td>
                  <td className="px-6 py-4 text-ink-700 dark:text-ink-700-inv hidden lg:table-cell">{b.neighborhood}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-ink-900 dark:text-ink-900-inv">
                      <FaStar className="text-gold text-xs" aria-hidden />
                      {b.rating.toFixed(1)}
                      <span className="text-ink-400 font-normal">({b.reviewCount})</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`badge text-[10px] ${b.verified ? 'badge-success' : 'badge-neutral'}`}>
                      {b.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted">
                    No businesses match “{query}”.
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
