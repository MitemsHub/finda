'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaLocationDot, FaMoon, FaSun, FaBars, FaXmark, FaChartLine, FaStore, FaArrowRightFromBracket, FaNewspaper } from 'react-icons/fa6';
import { useSession } from '@/lib/session/SessionProvider';

const NAV = [
  { href: '/search', label: 'Explore' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/for-business', label: 'For Business' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { user, signOut } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // close avatar menu on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const dashboardHref =
    user?.role === 'admin' ? '/admin/dashboard' : user?.role === 'business' ? '/business/dashboard' : '/dashboard';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Finda home">
          <span className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <FaLocationDot className="text-white text-base" aria-hidden />
          </span>
          <span className="font-display text-[1.35rem] font-semibold text-ink-900 dark:text-ink-900-inv tracking-tight">
            finda
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] font-medium text-ink-700 dark:text-ink-700-inv hover:text-primary dark:hover:text-primary-bright transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5 transition"
            aria-label="Toggle dark mode"
          >
            {mounted && theme === 'dark' ? <FaSun aria-hidden /> : <FaMoon aria-hidden />}
          </button>

          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                aria-label="Account menu"
                className="w-10 h-10 rounded-full bg-primary text-white font-display font-bold flex items-center justify-center hover:brightness-110 transition"
              >
                {user.firstName[0]}{user.lastName[0]}
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-12 w-60 card p-2 shadow-card-hover z-50"
                >
                  <div className="px-3 py-2.5 border-b border-line-light dark:border-line-dark mb-1">
                    <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-muted truncate">{user.email}</div>
                    <div className="mt-1.5">
                      <span className={`badge text-[10px] ${user.role === 'admin' ? 'badge-danger' : user.role === 'business' ? 'badge-accent' : 'badge-primary'}`}>
                        {user.role === 'business' ? 'Business owner' : user.role}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={dashboardHref}
                    role="menuitem"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5 transition"
                  >
                    {user.role === 'business' ? <FaStore className="text-ink-400" aria-hidden /> : <FaChartLine className="text-ink-400" aria-hidden />}
                    {user.role === 'business' ? 'Business dashboard' : 'My dashboard'}
                  </Link>
                  {user.role !== 'business' && (
                    <Link
                      href="/feed"
                      role="menuitem"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5 transition"
                    >
                      <FaNewspaper className="text-ink-400" aria-hidden /> My feed
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setMenuOpen(false);
                    }}
                    role="menuitem"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-danger hover:bg-danger-soft dark:hover:bg-danger/10 transition"
                  >
                    <FaArrowRightFromBracket className="text-ink-400" aria-hidden /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="hidden sm:inline-flex px-4 py-2 text-[15px] font-semibold text-ink-700 dark:text-ink-700-inv hover:text-primary dark:hover:text-primary-bright transition"
              >
                Sign in
              </Link>
              <Link href="/get-started" className="btn-primary btn-sm hidden sm:inline-flex">
                Get started
              </Link>
            </>
          )}

          <button
            className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-ink-900 dark:text-ink-900-inv"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? <FaXmark aria-hidden /> : <FaBars aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line-light dark:border-line-dark bg-paper-light dark:bg-paper-dark px-6 py-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-3 rounded-lg text-ink-700 dark:text-ink-700-inv font-medium hover:bg-sunken-light dark:hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-line-light dark:border-line-dark flex gap-3">
            {user ? (
              <Link href={dashboardHref} className="btn-primary btn-sm flex-1">
                My dashboard
              </Link>
            ) : (
              <>
                <Link href="/signin" className="btn-secondary btn-sm flex-1">Sign in</Link>
                <Link href="/get-started" className="btn-primary btn-sm flex-1">Get started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
