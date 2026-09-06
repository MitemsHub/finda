'use client';

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import * as store from '@/lib/data/demo';

const PERKS = [
  { title: 'Your bookings, organized', desc: 'Upcoming appointments, confirmations, and history in one place.' },
  { title: 'Saved spots', desc: 'Keep favorite businesses handy and hear about their offers first.' },
  { title: 'Reviews that count', desc: 'Your reviews are marked as verified visits — the ones people trust.' },
  { title: 'Shop local storefronts', desc: 'Order products from businesses you trust, tracked in one place.' },
];

const DEMO_ACCOUNTS = [
  { email: 'adaeze@finda.ng', label: 'Neighborhood user' },
  { email: 'ifeanyi@nkwokitchen.ng', label: 'Business owner (Nkwo Kitchen)' },
  { email: 'ngozi@finda.ng', label: 'Platform admin' },
];

function safeReturnTo(raw: string | null): string {
  // Only allow same-origin relative paths (prevents open redirects).
  if (raw && raw.startsWith('/') && !raw.startsWith('//')) return raw;
  return '';
}

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const destinationFor = (user: store.SessionUser, rawReturnTo: string | null) => {
    const returnTo = safeReturnTo(rawReturnTo);
    if (returnTo) return returnTo;
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'business') return '/business/dashboard';
    return '/dashboard';
  };

  const doSignIn = (address: string) => {
    setIsLoading(true);
    // Demo mode: the session derives from the email. When Supabase auth is
    // wired, this becomes supabase.auth.signInWithPassword().
    setTimeout(() => {
      const user = store.signIn(address);
      router.push(destinationFor(user, searchParams.get('returnTo')));
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSignIn(email);
  };

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center min-h-[calc(100vh-16rem)]">
          {/* Editorial left panel */}
          <div className="hidden lg:block">
            <p className="eyebrow mb-4">Welcome back</p>
            <h1 className="text-display-xl font-bold text-ink-900 dark:text-ink-900-inv leading-[1.08] mb-5">
              Good to see you again, neighbor.
            </h1>
            <p className="text-lg text-muted leading-relaxed mb-10 max-w-md">
              Sign in to pick up where you left off — your saved spots, upcoming
              bookings, and the reviews only you can write.
            </p>

            <ul className="space-y-6 max-w-md">
              {PERKS.map((perk) => (
                <li key={perk.title} className="flex gap-4">
                  <span className="w-1 rounded-full bg-primary shrink-0" aria-hidden />
                  <div>
                    <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-0.5">{perk.title}</h3>
                    <p className="text-sm text-muted">{perk.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <figure className="mt-12 card p-6 max-w-md">
              <blockquote className="text-ink-700 dark:text-ink-700-inv italic leading-relaxed">
                &ldquo;Finda has quietly replaced three other apps for me. The verified
                reviews are the part I didn&rsquo;t know I needed.&rdquo;
              </blockquote>
              <figcaption className="flex items-center gap-3 mt-4">
                <span className="w-9 h-9 rounded-full bg-accent-soft dark:bg-accent/20 text-accent dark:text-accent-bright text-[11px] font-bold flex items-center justify-center">
                  SM
                </span>
                <span className="text-sm font-semibold text-ink-900 dark:text-ink-900-inv">
                  Sarah M. · Yaba
                </span>
              </figcaption>
            </figure>
          </div>

          {/* Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="card p-8 sm:p-10">
              <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-1.5">
                Sign in to Finda
              </h2>
              <p className="text-muted text-[15px] mb-8">
                New here?{' '}
                <Link href="/get-started" className="text-primary dark:text-primary-bright font-semibold hover:underline">
                  Create an account
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="email" className="field-label">Email address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="field !pl-11"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="field-label !mb-0">Password</label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-semibold text-primary dark:text-primary-bright hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      className="field !pl-11 !pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 dark:hover:text-ink-700-inv"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#1F5C45]" defaultChecked />
                  <span className="text-sm text-ink-700 dark:text-ink-700-inv">Keep me signed in</span>
                </label>

                <button type="submit" disabled={isLoading} className="btn-primary w-full">
                  {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Signing in" />
                  ) : (
                    <>Sign in <FaArrowRight className="text-sm" aria-hidden /></>
                  )}
                </button>
              </form>

              {/* Demo shortcuts: in live mode (Supabase auth) this block is removed */}
              <div className="mt-8 pt-6 border-t border-line-light dark:border-line-dark">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-ink-400 dark:text-ink-400-inv mb-3">
                  Demo shortcuts — try each role
                </p>
                <div className="grid gap-2">
                  {DEMO_ACCOUNTS.map((demo) => (
                    <button
                      key={demo.email}
                      type="button"
                      disabled={isLoading}
                      onClick={() => doSignIn(demo.email)}
                      className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-ink-700 dark:text-ink-700-inv bg-sunken-light dark:bg-white/5 hover:bg-primary-soft dark:hover:bg-primary/15 hover:text-primary dark:hover:text-primary-bright transition text-left disabled:opacity-50"
                    >
                      <span>{demo.label}</span>
                      <FaArrowRight className="text-xs text-ink-400" aria-hidden />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-line-light dark:border-line-dark flex items-center justify-center gap-2 text-xs text-ink-400 dark:text-ink-400-inv">
                <span className="w-1.5 h-1.5 rounded-full bg-success" aria-hidden />
                Protected connection · Your data is never sold
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper-light dark:bg-paper-dark" />}>
      <SignInContent />
    </Suspense>
  );
}
