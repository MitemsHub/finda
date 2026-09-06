"use client";

import { useState } from 'react';
import { FaPaperPlane, FaUsers, FaStore, FaUserGroup, FaCircleCheck } from 'react-icons/fa6';
import { AdminShell } from '@/components/admin/AdminShell';
import * as store from '@/lib/data/demo';
import { useStoreVersion } from '@/lib/hooks/useStore';

export default function AdminNotifications() {
  useStoreVersion();
  const [audience, setAudience] = useState<'all' | 'users' | 'businesses'>('all');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const recent = store.getNotifications();

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;
    // Demo mode: with Supabase this fans out via the email service.
    setSent(true);
    setTitle('');
    setMessage('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <AdminShell
      title="Notifications"
      subtitle="Broadcast updates to your platform audience."
      active="/admin/notifications"
    >
      <div className="grid lg:grid-cols-[1fr_360px] gap-8">
        {/* Composer */}
        <form onSubmit={send} className="card p-7 space-y-5 h-fit">
          <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv">New broadcast</h2>

          <div>
            <span className="field-label">Audience</span>
            <div className="grid grid-cols-3 gap-2">
              {([
                { key: 'all', label: 'Everyone', icon: FaUserGroup },
                { key: 'users', label: 'Customers', icon: FaUsers },
                { key: 'businesses', label: 'Businesses', icon: FaStore },
              ] as const).map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setAudience(opt.key)}
                  aria-pressed={audience === opt.key}
                  className={`flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-xl border text-xs font-semibold transition ${
                    audience === opt.key
                      ? 'border-primary bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright'
                      : 'border-line-light dark:border-line-dark text-ink-500 dark:text-ink-500-inv hover:border-primary/40'
                  }`}
                >
                  <opt.icon className="text-lg" aria-hidden />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="nTitle" className="field-label">Title</label>
            <input
              id="nTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. New weekend hours"
              className="field"
              required
            />
          </div>

          <div>
            <label htmlFor="nMessage" className="field-label">Message</label>
            <textarea
              id="nMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Keep it short and useful…"
              className="field resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            {sent && (
              <span className="text-sm font-semibold text-success flex items-center gap-1.5" role="status">
                <FaCircleCheck aria-hidden /> Broadcast queued
              </span>
            )}
            <button type="submit" className="btn-primary">
              <FaPaperPlane aria-hidden /> Send broadcast
            </button>
          </div>
        </form>

        {/* Delivery log */}
        <div className="card p-6 h-fit">
          <h2 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-900-inv mb-5">Recent activity</h2>
          <div className="space-y-4">
            {recent.slice(0, 5).map((n) => (
              <div key={n.id} className="flex gap-3 text-sm">
                <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-bright mt-1.5 shrink-0" aria-hidden />
                <div className="min-w-0">
                  <div className="font-semibold text-ink-900 dark:text-ink-900-inv truncate">{n.title}</div>
                  <div className="text-xs text-muted line-clamp-2">{n.message}</div>
                  <div className="text-[11px] text-ink-400 dark:text-ink-400-inv mt-0.5">{n.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
