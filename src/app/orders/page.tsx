'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBagShopping, FaTruckFast, FaStore, FaArrowRight } from 'react-icons/fa6';
import { PageShell, PageTitle } from '@/components/PageShell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useStoreVersion } from '@/lib/hooks/useStore';
import * as store from '@/lib/data/demo';
import { naira } from '@/lib/data/demo';

type Filter = 'all' | 'active' | 'completed' | 'cancelled';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

function statusBadge(status: string) {
  switch (status) {
    case 'confirmed': return 'badge-success';
    case 'ready': return 'badge-accent';
    case 'completed': return 'badge-neutral';
    case 'cancelled': return 'badge-danger';
    default: return 'badge-accent';
  }
}

function OrdersContent() {
  useStoreVersion();
  const [filter, setFilter] = useState<Filter>('all');

  const orders = store.getOrders();
  const filtered = orders.filter((o) => {
    if (filter === 'all') return true;
    if (filter === 'active') return o.status === 'pending' || o.status === 'confirmed' || o.status === 'ready';
    return o.status === filter;
  });

  return (
    <PageShell wide>
      <PageTitle
        title="My orders"
        subtitle="Storefront purchases — pickup and delivery, all in one place."
      />

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide" role="tablist" aria-label="Filter orders">
        {FILTERS.map((f) => {
          const count =
            f.key === 'all'
              ? orders.length
              : f.key === 'active'
              ? orders.filter((o) => o.status === 'pending' || o.status === 'confirmed' || o.status === 'ready').length
              : orders.filter((o) => o.status === f.key).length;
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
              <span className={`ml-1.5 text-xs ${filter === f.key ? 'text-white/70' : 'text-ink-400'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="card p-14 text-center">
          <span className="w-16 h-16 rounded-2xl bg-sunken-light dark:bg-white/5 flex items-center justify-center mx-auto mb-5">
            <FaBagShopping className="text-2xl text-ink-300 dark:text-ink-300-inv" aria-hidden />
          </span>
          <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
            No orders here yet
          </h3>
          <p className="text-muted mb-6">
            {filter === 'all'
              ? 'When you order from a storefront, it shows up here.'
              : `You have no ${filter} orders.`}
          </p>
          <Link href="/search" className="btn-primary btn-sm">Explore storefronts</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => {
            const active = order.status === 'pending' || order.status === 'confirmed' || order.status === 'ready';
            return (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="card card-hover p-5 flex items-center gap-4 group"
              >
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  active
                    ? 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright'
                    : 'bg-sunken-light dark:bg-white/5 text-ink-400'
                }`}>
                  {order.fulfilment === 'delivery' ? <FaTruckFast aria-hidden /> : <FaStore aria-hidden />}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv truncate">{order.businessName}</h3>
                    <span className={`badge ${statusBadge(order.status)} text-[10px] capitalize`}>{order.status}</span>
                    {order.payment === 'on_pickup' && order.status !== 'completed' && order.status !== 'cancelled' && (
                      <span className="badge-accent text-[10px]">Pay on pickup</span>
                    )}
                  </div>
                  <p className="text-sm text-muted truncate mt-0.5">
                    {order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                  </p>
                  <p className="text-xs text-ink-400 dark:text-ink-400-inv mt-1">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {' · '}
                    {naira(order.total)}
                    {' · '}
                    {order.fulfilment === 'delivery' ? 'Delivery' : 'Pickup'}
                  </p>
                </div>
                <FaArrowRight className="text-ink-300 group-hover:text-primary transition shrink-0" aria-hidden />
              </Link>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}

export default function OrdersPage() {
  return (
    <AuthGuard>
      <OrdersContent />
    </AuthGuard>
  );
}
