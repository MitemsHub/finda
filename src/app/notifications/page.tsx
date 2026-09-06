"use client";

import { FaCalendarCheck, FaTag, FaCircleInfo, FaStar, FaCircleCheck } from 'react-icons/fa6';
import { PageShell, PageTitle } from '@/components/PageShell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import * as store from '@/lib/data/demo';
import { useStoreVersion } from '@/lib/hooks/useStore';

const ICONS: Record<string, React.ReactNode> = {
  booking: <FaCalendarCheck className="text-primary dark:text-primary-bright" aria-hidden />,
  review: <FaStar className="text-gold" aria-hidden />,
  promo: <FaTag className="text-accent dark:text-accent-bright" aria-hidden />,
  system: <FaCircleInfo className="text-ink-500 dark:text-ink-500-inv" aria-hidden />,
};

export default function NotificationsPage() {
  return (
    <AuthGuard>
      <NotificationsContent />
    </AuthGuard>
  );
}

function NotificationsContent() {
  useStoreVersion();
  const notifications = store.getNotifications();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <PageShell>
      <PageTitle
        title="Notifications"
        subtitle="Booking updates, replies, and offers from your saved spots."
        action={
          unread > 0 ? (
            <button
              onClick={() => store.markAllNotificationsRead()}
              className="btn-secondary btn-sm shrink-0"
            >
              <FaCircleCheck aria-hidden /> Mark all read ({unread})
            </button>
          ) : undefined
        }
      />

      {notifications.length === 0 ? (
        <div className="card p-14 text-center">
          <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
            All quiet
          </h3>
          <p className="text-muted">Notifications about your bookings will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`card p-5 flex gap-4 transition ${
                !n.read ? 'border-primary/40 dark:border-primary/40 bg-primary-soft/40 dark:bg-primary/5' : ''
              }`}
            >
              <span className="w-11 h-11 rounded-xl bg-white dark:bg-white/10 border border-line-light dark:border-line-dark flex items-center justify-center shrink-0 text-lg">
                {ICONS[n.type]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-0.5">
                  <h3 className={`font-semibold text-[15px] ${n.read ? 'text-ink-900 dark:text-ink-900-inv' : 'text-primary dark:text-primary-bright'}`}>
                    {n.title}
                  </h3>
                  <span className="text-xs text-ink-400 dark:text-ink-400-inv shrink-0">{n.time}</span>
                </div>
                <p className="text-sm text-ink-700 dark:text-ink-700-inv leading-relaxed">{n.message}</p>
              </div>
              {!n.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-primary-bright mt-1.5 shrink-0" aria-label="Unread" />
              )}
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
