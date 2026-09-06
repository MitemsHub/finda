"use client";

import Link from 'next/link';
import { FaUsers, FaStore, FaChartLine, FaTriangleExclamation, FaCheck, FaArrowRight } from 'react-icons/fa6';
import { AdminShell } from '@/components/admin/AdminShell';
import * as store from '@/lib/data/demo';
import { useStoreVersion } from '@/lib/hooks/useStore';

export default function AdminDashboard() {
  useStoreVersion();

  const pending = store.getPendingBusinesses();
  const businesses = store.getAllVisibleBusinesses();
  const notifications = store.getNotifications();

  const stats = [
    { label: 'Total users', value: '12,345', delta: '+12%', icon: FaUsers, tint: 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright' },
    { label: 'Active businesses', value: businesses.length.toLocaleString(), delta: '+5%', icon: FaStore, tint: 'bg-accent-soft dark:bg-accent/15 text-accent dark:text-accent-bright' },
    { label: 'Platform rating', value: '4.8', delta: '+0.1', icon: FaChartLine, tint: 'bg-gold-soft dark:bg-gold/15 text-gold dark:text-gold-bright' },
    { label: 'Pending approvals', value: String(pending.length), delta: pending.length > 0 ? 'Needs review' : 'Clear', icon: FaTriangleExclamation, tint: 'bg-danger-soft dark:bg-danger/15 text-danger dark:text-danger-bright' },
  ];

  const recentUsers = [
    { name: 'Alice Cooper', email: 'alice@example.com', role: 'User', status: 'Active' },
    { name: 'Bob Wilson', email: 'bob@example.com', role: 'Business', status: 'Active' },
    { name: 'Charlie Day', email: 'charlie@example.com', role: 'User', status: 'Inactive' },
    { name: 'Dana Reeves', email: 'dana@example.com', role: 'Business', status: 'Active' },
  ];

  return (
    <AdminShell
      title="Platform overview"
      subtitle="Health, growth, and what needs your attention."
      active="/admin/dashboard"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-start justify-between mb-4">
              <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.tint}`}>
                <s.icon aria-hidden />
              </span>
              <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                s.delta === 'Needs review'
                  ? 'bg-danger-soft dark:bg-danger/15 text-danger dark:text-danger-bright'
                  : s.delta === 'Clear'
                  ? 'bg-success-soft dark:bg-success/15 text-success dark:text-success-bright'
                  : 'bg-success-soft dark:bg-success/15 text-success dark:text-success-bright'
              }`}>
                {s.delta}
              </span>
            </div>
            <div className="font-display text-3xl font-bold text-ink-900 dark:text-ink-900-inv">{s.value}</div>
            <div className="text-xs font-semibold text-ink-400 dark:text-ink-400-inv mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Approvals queue */}
        <section className="card overflow-hidden">
          <div className="p-6 pb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-900-inv">
              Pending business approvals
            </h3>
            <Link href="/admin/approvals" className="text-sm font-semibold text-primary dark:text-primary-bright hover:underline">
              View all
            </Link>
          </div>

          {pending.length === 0 ? (
            <div className="px-6 pb-8 text-center">
              <span className="w-12 h-12 rounded-xl bg-success-soft dark:bg-success/15 text-success flex items-center justify-center mx-auto mb-3">
                <FaCheck aria-hidden />
              </span>
              <p className="text-sm text-muted">Queue is clear — no listings waiting.</p>
            </div>
          ) : (
            <div className="divide-y divide-line-light dark:divide-line-dark">
              {pending.slice(0, 4).map((b) => (
                <div key={b.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm truncate">{b.name}</div>
                    <div className="text-xs text-muted">{b.category} · {b.address}</div>
                  </div>
                  <Link
                    href="/admin/approvals"
                    className="btn-primary btn-sm shrink-0 inline-flex items-center gap-1.5"
                  >
                    Review <FaArrowRight className="text-[10px]" aria-hidden />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent users */}
        <section className="card overflow-hidden">
          <div className="p-6 pb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-900-inv">Recent users</h3>
            <Link href="/admin/users" className="text-sm font-semibold text-primary dark:text-primary-bright hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-line-light dark:divide-line-dark">
            {recentUsers.map((u) => (
              <div key={u.email} className="px-6 py-4 flex items-center gap-4">
                <span className="w-9 h-9 rounded-full bg-sunken-light dark:bg-white/10 text-ink-700 dark:text-ink-700-inv text-xs font-bold flex items-center justify-center shrink-0">
                  {u.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm">{u.name}</div>
                  <div className="text-xs text-muted truncate">{u.email}</div>
                </div>
                <span className={`badge text-[10px] shrink-0 ${
                  u.role === 'Business' ? 'badge-accent' : 'badge-primary'
                }`}>
                  {u.role}
                </span>
                <span className={`w-2 h-2 rounded-full shrink-0 ${u.status === 'Active' ? 'bg-success' : 'bg-ink-300'}`} aria-label={u.status} />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* System status strip */}
      <div className="mt-8 card p-6 flex flex-wrap items-center gap-x-8 gap-y-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse-dot" aria-hidden />
          <span className="font-semibold text-ink-900 dark:text-ink-900-inv">All systems operational</span>
        </div>
        <span className="text-sm text-muted">Notifications sent today: {notifications.length}</span>
        <span className="text-sm text-muted">Avg. approval time: 26 hrs</span>
        <span className="text-sm text-muted ml-auto">
          <Link href="/admin/settings" className="text-primary dark:text-primary-bright font-semibold hover:underline">
            Platform settings
          </Link>
        </span>
      </div>
    </AdminShell>
  );
}
