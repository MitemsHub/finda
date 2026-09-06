"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarCheck, FaHeart, FaUser, FaGear, FaBell, FaStar, FaArrowRight, FaBagShopping, FaNewspaper } from 'react-icons/fa6';
import { PageShell, PageTitle, SideNavItem } from '@/components/PageShell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useSession } from '@/lib/session/SessionProvider';
import * as store from '@/lib/data/demo';
import { useStoreVersion } from '@/lib/hooks/useStore';

export default function UserDashboard() {
  return (
    <AuthGuard>
      <UserDashboardContent />
    </AuthGuard>
  );
}

function UserDashboardContent() {
  useStoreVersion();
  const { user: sessionUser } = useSession();

  const bookings = store.getBookings();
  const favorites = store.getFavoriteBusinesses();
  const notifications = store.getNotifications();
  const user = sessionUser
    ? {
        firstName: sessionUser.firstName,
        lastName: sessionUser.lastName,
        email: sessionUser.email,
        memberSince: store.currentUser.memberSince,
      }
    : store.currentUser;

  const upcoming = bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending');
  const completed = bookings.filter((b) => b.status === 'completed');
  const unread = notifications.filter((n) => !n.read).length;

  const stats = [
    { label: 'Upcoming bookings', value: upcoming.length, icon: FaCalendarCheck, tint: 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright' },
    { label: 'Saved places', value: favorites.length, icon: FaHeart, tint: 'bg-danger-soft dark:bg-danger/15 text-danger dark:text-danger-bright' },
    { label: 'Completed visits', value: completed.length, icon: FaStar, tint: 'bg-gold-soft dark:bg-gold/15 text-gold dark:text-gold-bright' },
  ];

  return (
    <PageShell wide>
      <div className="grid lg:grid-cols-[250px_1fr] gap-10">
        {/* Sidebar */}
        <aside>
          <div className="card p-5 sticky top-28">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-11 h-11 rounded-full bg-primary text-white font-display font-bold flex items-center justify-center">
                {user.firstName[0]}{user.lastName[0]}
              </span>
              <div>
                <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs text-ink-400 dark:text-ink-400-inv">Member since {user.memberSince}</div>
              </div>
            </div>
            <nav className="space-y-1.5" aria-label="Account">
              <SideNavItem href="/dashboard" icon={<FaUser />} label="Dashboard" active />
              <SideNavItem href="/feed" icon={<FaNewspaper />} label="My feed" />
              <SideNavItem href="/bookings" icon={<FaCalendarCheck />} label="My bookings" />
              <SideNavItem href="/orders" icon={<FaBagShopping />} label="My orders" />
              <SideNavItem href="/notifications" icon={<FaBell />} label="Notifications" />
              <SideNavItem href="/settings" icon={<FaGear />} label="Settings" />
            </nav>
          </div>
        </aside>

        {/* Main */}
        <div className="min-w-0">
          <PageTitle
            title={`Welcome back, ${user.firstName}`}
            subtitle="Here's what's happening in your neighborhood."
            action={
              <Link href="/search" className="btn-primary btn-sm shrink-0">
                Find new places <FaArrowRight className="text-xs" aria-hidden />
              </Link>
            }
          />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {stats.map((s) => (
              <div key={s.label} className="card p-5">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.tint}`}>
                  <s.icon aria-hidden />
                </span>
                <div className="font-display text-3xl font-bold text-ink-900 dark:text-ink-900-inv">{s.value}</div>
                <div className="text-xs font-semibold text-ink-400 dark:text-ink-400-inv mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Upcoming bookings */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv">Upcoming bookings</h2>
              <Link href="/bookings" className="text-sm font-semibold text-primary dark:text-primary-bright hover:underline">
                View all
              </Link>
            </div>

            {upcoming.length === 0 ? (
              <div className="card p-10 text-center">
                <p className="text-muted mb-5">No upcoming bookings yet.</p>
                <Link href="/search" className="btn-primary btn-sm">Explore businesses</Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcoming.map((booking) => (
                  <div key={booking.id} className="card card-hover p-4 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-sunken-light shrink-0">
                      <Image src={booking.businessImage} alt={booking.businessName} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv truncate">{booking.businessName}</h3>
                      <p className="text-sm text-muted truncate">{booking.serviceName}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs font-semibold text-ink-500 dark:text-ink-500-inv">
                          {new Date(`${booking.date}T00:00`).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} · {booking.time}
                        </span>
                        <span className={`badge text-[10px] ${booking.status === 'confirmed' ? 'badge-success' : 'badge-accent'}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <Link href={`/business/${booking.businessId}`} className="btn-secondary btn-sm shrink-0 hidden sm:inline-flex">
                      View
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Favorites */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv">Your favorites</h2>
              <Link href="/favorites" className="text-sm font-semibold text-primary dark:text-primary-bright hover:underline">
                View all
              </Link>
            </div>

            {favorites.length === 0 ? (
              <div className="card p-10 text-center">
                <p className="text-muted mb-5">You haven&apos;t saved any spots yet — tap the heart on any business.</p>
                <Link href="/search" className="btn-primary btn-sm">Start exploring</Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {favorites.slice(0, 4).map((business) => (
                  <Link
                    key={business.id}
                    href={`/business/${business.id}`}
                    className="card card-hover p-4 flex items-center gap-4 group"
                  >
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-sunken-light shrink-0">
                      <Image src={business.image} alt={business.name} fill sizes="64px" className="object-cover group-hover:scale-105 transition duration-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wide text-primary dark:text-primary-bright">{business.category}</div>
                      <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv truncate">{business.name}</h3>
                      <div className="flex items-center gap-1 text-xs mt-0.5">
                        <FaStar className="text-gold" aria-hidden />
                        <span className="font-bold text-ink-900 dark:text-ink-900-inv">{business.rating.toFixed(1)}</span>
                        <span className="text-ink-400 dark:text-ink-400-inv">({business.reviewCount})</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Notification nudge */}
          {unread > 0 && (
            <Link
              href="/notifications"
              className="mt-10 card p-5 flex items-center gap-4 border-primary/30 dark:border-primary/30 hover:border-primary/60 transition group"
            >
              <span className="w-10 h-10 rounded-xl bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright flex items-center justify-center shrink-0">
                <FaBell aria-hidden />
              </span>
              <div className="flex-1">
                <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm">
                  {unread} unread notification{unread > 1 ? 's' : ''}
                </div>
                <div className="text-xs text-muted">Booking updates and replies are waiting</div>
              </div>
              <FaArrowRight className="text-ink-300 group-hover:text-primary transition" aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </PageShell>
  );
}
