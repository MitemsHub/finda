"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaBell, FaTrash, FaCircleCheck } from 'react-icons/fa6';
import { PageShell, PageTitle } from '@/components/PageShell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useSession } from '@/lib/session/SessionProvider';
import * as store from '@/lib/data/demo';

type Tab = 'profile' | 'security' | 'notifications';

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  );
}

function SettingsContent() {
  const [tab, setTab] = useState<Tab>('profile');
  const [saved, setSaved] = useState(false);
  const router = useRouter();
  const { user, refresh, signOut } = useSession();

  const profile = {
    firstName: user?.firstName ?? store.currentUser.firstName,
    lastName: user?.lastName ?? store.currentUser.lastName,
    email: user?.email ?? store.currentUser.email,
    memberSince: store.currentUser.memberSince,
  };

  const saveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    store.updateSessionProfile({
      firstName: String(form.get('firstName') ?? '').trim() || profile.firstName,
      lastName: String(form.get('lastName') ?? '').trim() || profile.lastName,
    });
    refresh();
    // Demo mode: with Supabase this calls updateProfile(formData).
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <PageShell>
      <PageTitle
        title="Account settings"
        subtitle="Manage your profile, security, and notification preferences."
      />

      <div className="grid lg:grid-cols-[220px_1fr] gap-8">
        {/* Tabs */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto scrollbar-hide">
          {([
            { key: 'profile', label: 'Profile', icon: FaUser },
            { key: 'security', label: 'Security', icon: FaLock },
            { key: 'notifications', label: 'Notifications', icon: FaBell },
          ] as const).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              aria-pressed={tab === t.key}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition ${
                tab === t.key
                  ? 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright'
                  : 'text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5'
              }`}
            >
              <t.icon aria-hidden /> {t.label}
            </button>
          ))}
        </div>

        {/* Panels */}
        <div className="min-w-0">
          {tab === 'profile' && (
            <form onSubmit={saveProfile} className="card p-8 space-y-6">
              <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv">Personal information</h2>

              <div className="flex items-center gap-5">
                <span className="w-20 h-20 rounded-full bg-primary text-white font-display text-2xl font-bold flex items-center justify-center">
                  {profile.firstName[0]}{profile.lastName[0]}
                </span>
                <div className="text-sm">
                  <p className="font-semibold text-ink-900 dark:text-ink-900-inv">{profile.firstName} {profile.lastName}</p>
                  <p className="text-muted">Member since {profile.memberSince}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="field-label">First name</label>
                  <input id="firstName" name="firstName" type="text" defaultValue={profile.firstName} className="field" />
                </div>
                <div>
                  <label htmlFor="lastName" className="field-label">Last name</label>
                  <input id="lastName" type="text" defaultValue={profile.lastName} className="field" />
                </div>
              </div>                <div>
                  <label htmlFor="email" className="field-label">Email address</label>
                  <input id="email" type="email" defaultValue={profile.email} disabled className="field opacity-60 cursor-not-allowed" />
                </div>

              <div className="flex items-center justify-end gap-3">
                {saved && (
                  <span className="text-sm font-semibold text-success flex items-center gap-1.5" role="status">
                    <FaCircleCheck aria-hidden /> Saved
                  </span>
                )}
                <button type="submit" className="btn-primary">Save changes</button>
              </div>
            </form>
          )}

          {tab === 'security' && (
            <div className="space-y-6">
              <div className="card p-8">
                <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">Change password</h2>
                <p className="text-sm text-muted mb-6">
                  Use at least 8 characters with a mix of letters, numbers, and symbols.
                </p>
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="current" className="field-label">Current password</label>
                    <input id="current" type="password" autoComplete="current-password" className="field" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="new" className="field-label">New password</label>
                      <input id="new" type="password" autoComplete="new-password" className="field" />
                    </div>
                    <div>
                      <label htmlFor="confirm" className="field-label">Confirm new password</label>
                      <input id="confirm" type="password" autoComplete="new-password" className="field" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="btn-primary">Update password</button>
                  </div>
                </form>
              </div>

              <div className="card p-8">
                <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">Sign-in security</h2>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-ink-900 dark:text-ink-900-inv">Two-factor authentication</div>
                      <div className="text-muted">Add an extra layer of protection at sign-in</div>
                    </div>
                    <button className="btn-secondary btn-sm shrink-0">Enable</button>
                  </li>
                  <li className="flex items-center justify-between gap-4 pt-4 border-t border-line-light dark:border-line-dark">
                    <div>
                      <div className="font-semibold text-ink-900 dark:text-ink-900-inv">Active sessions</div>
                      <div className="text-muted">1 device · this browser, today</div>
                    </div>
                    <button className="btn-secondary btn-sm shrink-0">Sign out others</button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="card p-8">
              <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-6">Email preferences</h2>
              <div className="space-y-5">
                {[
                  { label: 'Booking updates', desc: 'Confirmations, reminders, and changes', on: true },
                  { label: 'Replies to my reviews', desc: 'When a business responds publicly', on: true },
                  { label: 'Offers from saved spots', desc: 'Occasional deals from businesses you favorited', on: false },
                  { label: 'Finda news', desc: 'New features and neighborhood highlights', on: false },
                ].map((pref) => (
                  <label key={pref.label} className="flex items-center justify-between gap-4 cursor-pointer select-none">
                    <div>
                      <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-[15px]">{pref.label}</div>
                      <div className="text-sm text-muted">{pref.desc}</div>
                    </div>
                    <input type="checkbox" defaultChecked={pref.on} className="w-9 h-5 appearance-none rounded-full bg-sunken-light dark:bg-white/10 checked:bg-primary transition-colors relative cursor-pointer before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Danger zone */}
          <div className="mt-8 card p-8 border-danger/25 dark:border-danger/25">
            <h2 className="font-display text-xl font-semibold text-danger mb-2">Danger zone</h2>
            <p className="text-sm text-muted mb-5">
              Deleting your account removes your bookings, reviews, and saved
              places. This cannot be undone.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  signOut();
                  router.push('/');
                }}
                className="btn-secondary"
              >
                Sign out of finda
              </button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-semibold text-danger border border-danger/40 hover:bg-danger-soft dark:hover:bg-danger/10 transition inline-flex items-center gap-2">
                <FaTrash aria-hidden /> Delete account
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
