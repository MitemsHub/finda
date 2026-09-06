"use client";

import { useState } from 'react';
import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6';
import { AdminShell } from '@/components/admin/AdminShell';

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminShell
      title="Platform settings"
      subtitle="Moderation defaults and integration health."
      active="/admin/settings"
    >
      <form onSubmit={save} className="space-y-6">
        {/* Moderation */}
        <div className="card p-7">
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-6">Moderation</h2>
          <div className="space-y-5">
            {[
              { label: 'Require approval for new listings', desc: 'Businesses go live only after an admin reviews them', on: true },
              { label: 'Auto-flag reviews with links', desc: 'Hold reviews containing URLs for manual review', on: true },
              { label: 'Allow review edits', desc: 'Users can edit a review within 48 hours of posting', on: false },
              { label: 'Verified badge required for homepage', desc: 'Only verified businesses appear in featured slots', on: true },
            ].map((pref) => (
              <label key={pref.label} className="flex items-center justify-between gap-4 cursor-pointer select-none">
                <div>
                  <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-[15px]">{pref.label}</div>
                  <div className="text-sm text-muted">{pref.desc}</div>
                </div>
                <input type="checkbox" defaultChecked={pref.on} className="w-9 h-5 appearance-none rounded-full bg-sunken-light dark:bg-white/10 checked:bg-primary transition-colors relative cursor-pointer shrink-0 before:absolute before:top-0.5 before:left-0.5 before:w-4 before:h-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4" />
              </label>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="card p-7">
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-6">Integrations</h2>
          <ul className="space-y-4 text-sm">
            {[
              { name: 'Supabase (database & auth)', status: 'not-configured', detail: 'Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to go live' },
              { name: 'Email delivery', status: 'demo', detail: 'Simulated in demo mode — wire a provider when ready' },
              { name: 'Payments', status: 'demo', detail: 'Simulated in demo mode — wire a provider when ready' },
            ].map((item) => (
              <li key={item.name} className="flex items-start gap-3 pb-4 border-b border-line-light dark:border-line-dark last:border-0 last:pb-0">
                <span className={`mt-0.5 shrink-0 ${item.status === 'not-configured' ? 'text-accent' : 'text-ink-400'}`}>
                  {item.status === 'not-configured'
                    ? <FaCircleExclamation aria-hidden />
                    : <FaCircleCheck aria-hidden />}
                </span>
                <div>
                  <div className="font-semibold text-ink-900 dark:text-ink-900-inv">{item.name}</div>
                  <div className="text-muted">{item.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3">
          {saved && (
            <span className="text-sm font-semibold text-success flex items-center gap-1.5" role="status">
              <FaCircleCheck aria-hidden /> Settings saved
            </span>
          )}
          <button type="submit" className="btn-primary">Save settings</button>
        </div>
      </form>
    </AdminShell>
  );
}
