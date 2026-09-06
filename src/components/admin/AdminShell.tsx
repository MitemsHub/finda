import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  FaChartLine, FaStore, FaUsers, FaLayerGroup, FaBell, FaGear, FaArrowLeft,
} from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import { AuthGuard } from '@/components/auth/AuthGuard';

const ADMIN_NAV = [
  { href: '/admin/dashboard', label: 'Overview', icon: FaChartLine },
  { href: '/admin/approvals', label: 'Approvals', icon: FaStore },
  { href: '/admin/businesses', label: 'Businesses', icon: FaStore },
  { href: '/admin/users', label: 'Users', icon: FaUsers },
  { href: '/admin/categories', label: 'Categories', icon: FaLayerGroup },
  { href: '/admin/notifications', label: 'Notifications', icon: FaBell },
  { href: '/admin/settings', label: 'Settings', icon: FaGear },
];

export function AdminShell({
  title,
  subtitle,
  action,
  children,
  active = '/admin/dashboard',
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  active?: string;
}) {
  return (
    <AuthGuard role="admin">
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-28 pb-24 px-6 max-w-7xl mx-auto">
        {/* Breadcrumb back to site */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-semibold text-ink-400 dark:text-ink-400-inv hover:text-primary dark:hover:text-primary-bright transition mb-6"
        >
          <FaArrowLeft className="text-xs" aria-hidden /> Exit admin
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="badge-accent">Admin</span>
            </div>
            <h1 className="text-display-md font-bold text-ink-900 dark:text-ink-900-inv">{title}</h1>
            {subtitle && <p className="text-muted mt-1.5">{subtitle}</p>}
          </div>
          {action}
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-8">
          <aside>
            <nav className="card p-3 flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide sticky top-28" aria-label="Admin">
              {ADMIN_NAV.map((item) => {
                const isActive = active === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                      isActive
                        ? 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright'
                        : 'text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5'
                    }`}
                  >
                    <item.icon className={item.label === 'Businesses' || item.label === 'Approvals' ? 'shrink-0' : ''} aria-hidden />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </main>
    </div>
    </AuthGuard>
  );
}
