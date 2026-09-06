"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { FaCalendarCheck, FaLocationDot, FaXmark, FaCircleCheck } from 'react-icons/fa6';
import { PageShell, PageTitle } from '@/components/PageShell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import * as store from '@/lib/data/demo';
import { useStoreVersion } from '@/lib/hooks/useStore';

type Filter = 'all' | 'upcoming' | 'completed' | 'cancelled';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

function statusBadge(status: string) {
  switch (status) {
    case 'confirmed':
      return 'badge-success';
    case 'pending':
      return 'badge-accent';
    case 'completed':
      return 'badge-neutral';
    default:
      return 'badge-danger';
  }
}

export default function BookingsPage() {
  return (
    <AuthGuard>
      <BookingsContent />
    </AuthGuard>
  );
}

function BookingsContent() {
  useStoreVersion();
  const [filter, setFilter] = useState<Filter>('all');

  const bookings = store.getBookings();
  const filtered = bookings.filter((b) => {
    if (filter === 'all') return true;
    if (filter === 'upcoming') return b.status === 'confirmed' || b.status === 'pending';
    return b.status === filter;
  });

  return (
    <PageShell wide>
      <PageTitle
        title="My bookings"
        subtitle="Manage your upcoming appointments and revisit where you've been."
      />

      {/* Filter tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Filter bookings">
        {FILTERS.map((f) => {
          const count =
            f.key === 'all'
              ? bookings.length
              : f.key === 'upcoming'
              ? bookings.filter((b) => b.status === 'confirmed' || b.status === 'pending').length
              : bookings.filter((b) => b.status === f.key).length;
          return (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${
                filter === f.key
                  ? 'bg-primary text-white'
                  : 'bg-sunken-light dark:bg-white/5 text-ink-700 dark:text-ink-700-inv hover:bg-primary-soft dark:hover:bg-primary/15'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-xs ${filter === f.key ? 'text-white/70' : 'text-ink-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-14 text-center">
          <span className="w-16 h-16 rounded-2xl bg-sunken-light dark:bg-white/5 flex items-center justify-center mx-auto mb-5">
            <FaCalendarCheck className="text-2xl text-ink-300 dark:text-ink-300-inv" aria-hidden />
          </span>
          <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
            No bookings here yet
          </h3>
          <p className="text-muted mb-6">
            {filter === 'all'
              ? 'When you book a service, it shows up here.'
              : `You have no ${filter} bookings.`}
          </p>
          <Link href="/search" className="btn-primary btn-sm">Find something to book</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => (
            <div key={booking.id} className="card p-5 hover:shadow-card-hover transition">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="relative w-full md:w-44 h-36 rounded-xl overflow-hidden bg-sunken-light shrink-0">
                  <Image
                    src={booking.businessImage}
                    alt={booking.businessName}
                    fill
                    sizes="(max-width: 768px) 100vw, 176px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-xs font-bold text-white">
                    {booking.price}
                  </div>
                </div>

                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-900-inv">
                        {booking.businessName}
                      </h3>
                      <p className="text-sm text-primary dark:text-primary-bright font-semibold">{booking.serviceName}</p>
                    </div>
                    <span className={`badge ${statusBadge(booking.status)} capitalize shrink-0`}>
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-500 dark:text-ink-500-inv mb-4">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarCheck className="text-ink-400" aria-hidden />
                      {new Date(`${booking.date}T00:00`).toLocaleDateString('en-US', {
                        weekday: 'short', month: 'short', day: 'numeric',
                      })}{' '}
                      at {booking.time}
                    </span>
                    <span className="flex items-center gap-1.5 truncate">
                      <FaLocationDot className="text-ink-400" aria-hidden />
                      {booking.address}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    <Link href={`/business/${booking.businessId}`} className="btn-secondary btn-sm">
                      View business
                    </Link>
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => store.cancelBooking(booking.id)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-danger border border-danger/30 hover:bg-danger-soft dark:hover:bg-danger/10 transition inline-flex items-center gap-1.5"
                      >
                        <FaXmark className="text-xs" aria-hidden /> Cancel
                      </button>
                    )}
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => store.completeBooking(booking.id)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold text-success border border-success/30 hover:bg-success-soft dark:hover:bg-success/10 transition inline-flex items-center gap-1.5"
                      >
                        <FaCircleCheck className="text-xs" aria-hidden /> Mark attended
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
