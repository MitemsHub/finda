"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaChartPie, FaCalendarDays, FaUserGroup, FaStar, FaGear, FaImages,
  FaCircleCheck, FaXmark, FaEnvelope, FaPhone, FaLocationDot, FaReply,
  FaPlus, FaStore, FaArrowUp, FaBoxOpen, FaClockRotateLeft, FaHourglassHalf,
  FaBagShopping, FaTruckFast, FaBullhorn, FaUsers, FaTrash,
} from 'react-icons/fa6';
import { PageShell, PageTitle } from '@/components/PageShell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useSession } from '@/lib/session/SessionProvider';
import * as store from '@/lib/data/demo';
import * as social from '@/lib/data/social';
import { useStoreVersion } from '@/lib/hooks/useStore';

type Tab = 'overview' | 'bookings' | 'orders' | 'products' | 'updates' | 'customers' | 'reviews' | 'gallery' | 'settings';

const TABS: { key: Tab; label: string; icon: React.ElementType }[] = [
  { key: 'overview', label: 'Overview', icon: FaChartPie },
  { key: 'bookings', label: 'Bookings', icon: FaCalendarDays },
  { key: 'orders', label: 'Orders', icon: FaBagShopping },
  { key: 'products', label: 'Products', icon: FaBoxOpen },
  { key: 'updates', label: 'Updates', icon: FaBullhorn },
  { key: 'customers', label: 'Customers', icon: FaUserGroup },
  { key: 'reviews', label: 'Reviews', icon: FaStar },
  { key: 'gallery', label: 'Gallery', icon: FaImages },
  { key: 'settings', label: 'Settings', icon: FaGear },
];

export default function BusinessDashboard() {
  return (
    <AuthGuard role="business">
      <BusinessDashboardContent />
    </AuthGuard>
  );
}

function BusinessDashboardContent() {
  useStoreVersion();
  const { user } = useSession();
  const [tab, setTab] = useState<Tab>('overview');
  const [replyTo, setReplyTo] = useState<string | null>(null);

  // The signed-in owner's business; falls back to the demo business.
  const business =
    (user?.ownedBusinessId && store.getBusinessById(user.ownedBusinessId)) ||
    store.getBusinessById('b_1')!;
  const allBookings = store.getBookings().filter((b) => b.businessId === business.id);
  const reviews = store.getReviewsForBusiness(business.id);
  const products = store.getProductsForBusiness(business.id);
  const orders = store.getOrdersForBusiness(business.id);
  const activeOrders = orders.filter((o) => o.status === 'pending' || o.status === 'confirmed' || o.status === 'ready');
  const orderRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);
  const isPending = business.status === 'pending';
  const followers = social.getFollowerCount(business.id);

  // Business-side demo metrics
  const stats = [
    { label: 'Profile views', value: '2,847', delta: '+12%' },
    { label: 'Total bookings', value: '142', delta: '+8%' },
    { label: 'Avg. rating', value: business.rating.toFixed(1), delta: '+0.1' },
    { label: 'Revenue (est.)', value: '₦4.2m', delta: '+15%' },
  ];

  const customers = [
    { name: 'Chiamaka Obi', email: 'chiamaka@example.com', visits: 12, spend: '₦340,000', last: 'Today' },
    { name: 'Tunde Bakare', email: 'tunde@example.com', visits: 5, spend: '₦125,000', last: 'Last week' },
    { name: 'Halima Bello', email: 'halima@example.com', visits: 8, spend: '₦245,000', last: '2 weeks ago' },
    { name: 'Emeka Duru', email: 'emeka@example.com', visits: 3, spend: '₦58,000', last: 'Last month' },
  ];

  const galleryImages = [business.image, ...business.gallery];

  return (
    <PageShell wide>
      <div className="grid lg:grid-cols-[250px_1fr] gap-10">
        {/* Sidebar */}
        <aside>
          <div className="card p-5 sticky top-28">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-11 h-11 rounded-xl bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright font-display font-bold flex items-center justify-center text-lg">
                {business.name[0]}
              </span>
              <div className="min-w-0">
                <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm truncate">{business.name}</div>
                <div className="text-xs font-medium flex items-center gap-1.5 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${business.isOpen ? 'bg-success' : 'bg-ink-300'}`} />
                  <span className={business.isOpen ? 'text-success' : 'text-ink-400'}>
                    {business.isOpen ? 'Open now' : 'Closed'}
                  </span>
                  {business.verified && (
                    <span className="text-primary dark:text-primary-bright">· Verified</span>
                  )}
                </div>
              </div>
            </div>

            <nav className="flex lg:flex-col gap-1.5 overflow-x-auto scrollbar-hide" aria-label="Business">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  aria-pressed={tab === t.key}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                    tab === t.key
                      ? 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright'
                      : 'text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5'
                  }`}
                >
                  <t.icon aria-hidden /> {t.label}
                </button>
              ))}
            </nav>

            <Link href={`/business/${business.id}`} className="btn-secondary btn-sm w-full mt-6">
              <FaStore aria-hidden /> View public page
            </Link>
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0">
          <PageTitle
            title="Business dashboard"
            subtitle="Your customers, bookings, and reputation at a glance."
          />

          {isPending && (
            <div className="mb-8 card p-5 border-accent/40 dark:border-accent/40 flex items-start gap-4">
              <span className="w-10 h-10 rounded-xl bg-accent-soft dark:bg-accent/15 text-accent dark:text-accent-bright flex items-center justify-center shrink-0">
                <FaHourglassHalf aria-hidden />
              </span>
              <div>
                <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm mb-0.5">
                  Your listing is under review
                </div>
                <p className="text-sm text-muted">
                  Finda verifies every business before it appears in search. You can
                  keep setting up services, products, and photos meanwhile —
                  everything goes live the moment you&apos;re approved.
                </p>
              </div>
            </div>
          )}

          {tab === 'overview' && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {stats.map((s) => (
                  <div key={s.label} className="card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv">{s.value}</span>
                      <span className="text-[11px] font-bold text-success flex items-center gap-0.5">
                        <FaArrowUp className="text-[9px]" aria-hidden /> {s.delta}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-ink-400 dark:text-ink-400-inv">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div className="card p-6 mb-8">
                <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-1">Bookings this week</h3>
                <p className="text-xs text-muted mb-6">Confirmations vs. last week</p>
                <div className="flex items-end gap-3 h-32">
                  {[35, 55, 40, 70, 62, 88, 74].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full bg-primary-soft dark:bg-primary/20 rounded-t-lg relative overflow-hidden" style={{ height: '100%' }}>
                        <div
                          className="absolute bottom-0 w-full bg-primary dark:bg-primary-bright rounded-t-lg transition-all duration-700"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-semibold text-ink-400">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv">Latest bookings</h3>
                  <button onClick={() => setTab('bookings')} className="text-sm font-semibold text-primary dark:text-primary-bright hover:underline">
                    Manage all
                  </button>
                </div>
                {allBookings.length === 0 ? (
                  <p className="text-sm text-muted">No customer bookings through Finda yet.</p>
                ) : (
                  <div className="space-y-3">
                    {allBookings.slice(0, 3).map((b) => (
                      <div key={b.id} className="flex items-center gap-3 p-3 bg-sunken-light/50 dark:bg-white/5 rounded-xl">
                        <span className="w-9 h-9 rounded-full bg-white dark:bg-white/10 text-xs font-bold flex items-center justify-center shrink-0 text-ink-700 dark:text-ink-700-inv">
                          MO
                        </span>
                        <div className="flex-1 min-w-0 text-sm">
                          <span className="font-semibold text-ink-900 dark:text-ink-900-inv">{b.serviceName}</span>
                          <span className="text-muted"> · {new Date(`${b.date}T00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {b.time}</span>
                        </div>
                        <span className={`badge text-[10px] capitalize ${b.status === 'confirmed' ? 'badge-success' : b.status === 'pending' ? 'badge-accent' : 'badge-neutral'}`}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {tab === 'bookings' && (
            <div className="space-y-4">
              {allBookings.length === 0 && (
                <div className="card p-12 text-center">
                  <p className="text-muted mb-4">No bookings yet. Share your Finda page to get discovered.</p>
                  <Link href={`/business/${business.id}`} className="btn-primary btn-sm">View public page</Link>
                </div>
              )}
              {allBookings.map((b) => (
                <div key={b.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-ink-900 dark:text-ink-900-inv">{b.serviceName}</div>
                    <div className="text-sm text-muted mt-0.5">
                      {new Date(`${b.date}T00:00`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · {b.time}
                    </div>
                    {b.notes && <div className="text-xs text-ink-400 mt-1 italic">“{b.notes}”</div>}
                  </div>
                  <span className={`badge capitalize ${b.status === 'confirmed' ? 'badge-success' : b.status === 'pending' ? 'badge-accent' : b.status === 'completed' ? 'badge-neutral' : 'badge-danger'}`}>
                    {b.status}
                  </span>
                  <div className="flex gap-2">
                    {b.status === 'pending' && (
                      <>
                        <button onClick={() => store.confirmBooking(b.id)} className="btn-primary btn-sm">
                          <FaCircleCheck aria-hidden /> Confirm
                        </button>
                        <button onClick={() => store.cancelBooking(b.id)} className="btn-secondary btn-sm !text-danger !border-danger/30">
                          <FaXmark aria-hidden />
                        </button>
                      </>
                    )}
                    {b.status === 'confirmed' && (
                      <button onClick={() => store.completeBooking(b.id)} className="btn-secondary btn-sm">
                        <FaCircleCheck className="text-success" aria-hidden /> Mark completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'products' && (
            <div className="space-y-4">
              <div className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv">Storefront products</h3>
                  <p className="text-sm text-muted mt-0.5">
                    What customers order from your Finda storefront. Keep stock counts honest.
                  </p>
                </div>
                <button
                  onClick={() =>
                    store.addProduct({
                      businessId: business.id,
                      name: 'New product',
                      price: '₦0',
                      stock: 0,
                    })
                  }
                  className="btn-primary btn-sm shrink-0"
                >
                  <FaPlus aria-hidden /> Add product
                </button>
              </div>

              {products.length === 0 ? (
                <div className="card p-12 text-center">
                  <span className="w-16 h-16 rounded-2xl bg-sunken-light dark:bg-white/5 flex items-center justify-center mx-auto mb-5">
                    <FaBoxOpen className="text-2xl text-ink-300 dark:text-ink-300-inv" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
                    No products yet
                  </h3>
                  <p className="text-muted mb-6 max-w-sm mx-auto">
                    Add what you sell — meals, goods, tickets — and customers will
                    order from your storefront with pickup or delivery.
                  </p>
                  <button
                    onClick={() =>
                      store.addProduct({
                        businessId: business.id,
                        name: 'New product',
                        price: '₦0',
                        stock: 0,
                      })
                    }
                    className="btn-primary btn-sm"
                  >
                    <FaPlus aria-hidden /> Add your first product
                  </button>
                </div>
              ) : (
                products.map((p) => {
                  const lowStock = p.stock !== null && p.stock > 0 && p.stock <= 3;
                  return (
                    <div key={p.id} className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-sunken-light dark:bg-white/5 flex items-center justify-center shrink-0 text-ink-400">
                        <FaBoxOpen aria-hidden />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-ink-900 dark:text-ink-900-inv">{p.name}</div>
                        <div className="text-sm text-muted">
                          {p.price}
                          {' · '}
                          {p.stock === null ? (
                            'Made to order'
                          ) : (
                            <span className={lowStock ? 'text-danger font-semibold' : ''}>
                              {p.stock <= 0 ? 'Out of stock' : `${p.stock} in stock${lowStock ? ' — low!' : ''}`}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {p.stock !== null && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => store.updateProductStock(p.id, Math.max(0, (p.stock ?? 0) - 1))}
                              className="w-8 h-8 rounded-lg border border-line-light dark:border-line-dark text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5 transition"
                              aria-label={`Decrease stock of ${p.name}`}
                            >
                              −
                            </button>
                            <button
                              onClick={() => store.updateProductStock(p.id, (p.stock ?? 0) + 1)}
                              className="w-8 h-8 rounded-lg border border-line-light dark:border-line-dark text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5 transition"
                              aria-label={`Increase stock of ${p.name}`}
                            >
                              +
                            </button>
                          </div>
                        )}
                        <button
                          onClick={() => store.toggleProductSoldOut(p.id)}
                          className={`btn-sm px-3 py-2 rounded-lg text-sm font-semibold border transition ${
                            p.soldOut
                              ? 'text-success border-success/30 hover:bg-success-soft dark:hover:bg-success/10'
                              : 'text-ink-500 dark:text-ink-500-inv border-line-light dark:border-line-dark hover:bg-sunken-light dark:hover:bg-white/5'
                          }`}
                        >
                          {p.soldOut ? 'Mark available' : 'Mark sold out'}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}

              <div className="card p-5 flex items-start gap-3 text-sm text-muted">
                <FaClockRotateLeft className="mt-0.5 shrink-0 text-ink-400" aria-hidden />
                Stock edits and sold-out toggles reflect instantly on your public
                profile and storefront — no republishing needed.
              </div>
            </div>
          )}

          {tab === 'orders' && (
            <div className="space-y-4">
              <div className="card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv">Storefront orders</h3>
                  <p className="text-sm text-muted mt-0.5">
                    {orders.length} order{orders.length !== 1 ? 's' : ''} · {activeOrders.length} active · {store.naira(orderRevenue)} revenue
                  </p>
                </div>
                <Link href={`/store/${business.slug}`} className="btn-secondary btn-sm shrink-0">
                  <FaStore aria-hidden /> View storefront
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="card p-12 text-center">
                  <span className="w-16 h-16 rounded-2xl bg-sunken-light dark:bg-white/5 flex items-center justify-center mx-auto mb-5">
                    <FaBagShopping className="text-2xl text-ink-300 dark:text-ink-300-inv" aria-hidden />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
                    No orders yet
                  </h3>
                  <p className="text-muted mb-6 max-w-sm mx-auto">
                    Orders from your storefront land here. Share your store link to
                    start selling — stock updates automatically.
                  </p>
                  <Link href={`/store/${business.slug}`} className="btn-primary btn-sm">
                    Open my storefront
                  </Link>
                </div>
              ) : (
                orders.map((order) => {
                  return (
                    <div key={order.id} className="card p-5">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h4 className="font-semibold text-ink-900 dark:text-ink-900-inv">
                              #{order.id.slice(-6).toUpperCase()} · {order.customerName}
                            </h4>
                            <span className={`badge capitalize text-[10px] ${
                              order.status === 'confirmed' ? 'badge-success' : order.status === 'ready' ? 'badge-accent' : order.status === 'completed' ? 'badge-neutral' : order.status === 'cancelled' ? 'badge-danger' : 'badge-accent'
                            }`}>
                              {order.status}
                            </span>
                            <span className="badge text-[10px] badge-neutral inline-flex items-center gap-1">
                              {order.fulfilment === 'delivery' ? <FaTruckFast className="text-[9px]" aria-hidden /> : <FaStore className="text-[9px]" aria-hidden />}
                              {order.fulfilment}
                            </span>
                            {order.payment === 'on_pickup' && order.status !== 'completed' && order.status !== 'cancelled' && (
                              <span className="badge-accent text-[10px]">Pay on pickup</span>
                            )}
                          </div>
                          <p className="text-sm text-ink-700 dark:text-ink-700-inv">
                            {order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')}
                          </p>
                          <p className="text-xs text-muted mt-1">
                            {order.customerPhone}
                            {order.fulfilment === 'delivery' && order.address ? ` · ${order.address}` : ' · Pickup at your location'}
                            {order.note ? ` · “${order.note}”` : ''}
                          </p>
                        </div>
                        <div className="flex lg:flex-col items-center lg:items-end gap-2 shrink-0">
                          <span className="font-display font-bold text-ink-900 dark:text-ink-900-inv">{store.naira(order.total)}</span>
                          <div className="flex gap-2">
                            {order.status === 'pending' && (
                              <>
                                <button onClick={() => store.setOrderStatus(order.id, 'confirmed')} className="btn-primary btn-sm">
                                  <FaCircleCheck aria-hidden /> Confirm
                                </button>
                                <button
                                  onClick={() => store.setOrderStatus(order.id, 'cancelled')}
                                  className="btn-secondary btn-sm !text-danger !border-danger/30"
                                  aria-label="Cancel order"
                                >
                                  <FaXmark aria-hidden />
                                </button>
                              </>
                            )}
                            {order.status === 'confirmed' && (
                              <button onClick={() => store.setOrderStatus(order.id, 'ready')} className="btn-primary btn-sm">
                                Mark ready
                              </button>
                            )}
                            {order.status === 'ready' && (
                              <button onClick={() => store.setOrderStatus(order.id, 'completed')} className="btn-primary btn-sm">
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {tab === 'updates' && (
            <UpdatesTab businessId={business.id} businessName={business.name} followers={followers} />
          )}

          {tab === 'customers' && (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line-light dark:border-line-dark bg-sunken-light/50 dark:bg-white/5 text-left">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 hidden md:table-cell">Contact</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400">Visits</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400">Spend</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-ink-400 hidden lg:table-cell">Last visit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line-light dark:divide-line-dark">
                    {customers.map((c) => (
                      <tr key={c.email} className="hover:bg-sunken-light/50 dark:hover:bg-white/5 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-full bg-primary-soft dark:bg-primary/20 text-primary dark:text-primary-bright text-xs font-bold flex items-center justify-center">
                              {c.name.split(' ').map((n) => n[0]).join('')}
                            </span>
                            <span className="font-semibold text-ink-900 dark:text-ink-900-inv">{c.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="flex items-center gap-1.5 text-ink-700 dark:text-ink-700-inv">
                            <FaEnvelope className="text-ink-400 text-xs" aria-hidden /> {c.email}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-ink-900 dark:text-ink-900-inv">{c.visits}</td>
                        <td className="px-6 py-4 font-semibold text-ink-900 dark:text-ink-900-inv">{c.spend}</td>
                        <td className="px-6 py-4 text-ink-700 dark:text-ink-700-inv hidden lg:table-cell">{c.last}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="space-y-4">
              {reviews.length === 0 && (
                <div className="card p-12 text-center">
                  <p className="text-muted">No reviews yet. Reviews from verified visits build your ranking.</p>
                </div>
              )}
              {reviews.map((r) => (
                <article key={r.id} className="card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full bg-primary-soft dark:bg-primary/20 text-primary dark:text-primary-bright text-xs font-bold flex items-center justify-center">
                      {r.initials}
                    </span>
                    <div className="flex-1">
                      <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm">{r.author}</div>
                      <div className="flex items-center gap-1.5 text-xs text-ink-400">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <FaStar key={i} className={i <= r.rating ? 'text-gold' : 'text-ink-300'} aria-hidden />
                        ))}
                        <span>{new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-ink-700 dark:text-ink-700-inv leading-relaxed mb-4">{r.text}</p>
                  {r.reply ? (
                    <div className="pl-4 border-l-2 border-primary/30">
                      <div className="text-xs font-bold text-primary dark:text-primary-bright mb-1 inline-flex items-center gap-1.5">
                        <FaReply aria-hidden /> Your public reply
                      </div>
                      <p className="text-sm text-ink-700 dark:text-ink-700-inv leading-relaxed">{r.reply.text}</p>
                      <button
                        onClick={() => setReplyTo(replyTo === r.id ? r.id : null)}
                        className="text-xs font-semibold text-muted hover:text-primary dark:hover:text-primary-bright mt-2"
                      >
                        Edit reply
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setReplyTo(replyTo === r.id ? null : r.id)}
                      className="text-sm font-semibold text-primary dark:text-primary-bright inline-flex items-center gap-1.5 hover:underline"
                    >
                      <FaReply className="text-xs" aria-hidden /> Reply publicly
                    </button>
                  )}
                  {replyTo === r.id && (
                    <div className="mt-4 flex gap-3">
                      <input
                        type="text"
                        defaultValue={r.reply?.text ?? ''}
                        placeholder={`Thank ${r.author.split(' ')[0]} for the feedback…`}
                        className="field flex-1"
                        aria-label="Public reply"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            store.replyToReview(r.id, (e.target as HTMLInputElement).value);
                            setReplyTo(null);
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                          store.replyToReview(r.id, input?.value ?? '');
                          setReplyTo(null);
                        }}
                        className="btn-primary btn-sm shrink-0"
                      >
                        Post
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {tab === 'gallery' && (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv">Photo gallery</h3>
                  <p className="text-xs text-muted mt-0.5">Great photos earn more bookings. Lead with your best.</p>
                </div>
                <button className="btn-secondary btn-sm">
                  <FaPlus aria-hidden /> Add photos
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((img, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-sunken-light group">
                    <Image src={img} alt={`${business.name} photo ${i + 1}`} fill sizes="300px" className="object-cover" />
                    {i === 0 && (
                      <span className="absolute top-2 left-2 badge-primary text-[10px]">Cover</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="card p-8 space-y-6 max-w-2xl">
              <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv">Business profile</h3>
              <div>
                <label htmlFor="bname" className="field-label">Business name</label>
                <input id="bname" defaultValue={business.name} className="field" />
              </div>
              <div>
                <label htmlFor="bdesc" className="field-label">Description</label>
                <textarea id="bdesc" rows={4} defaultValue={business.description} className="field resize-none" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="bphone" className="field-label">Phone</label>
                  <div className="relative">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
                    <input id="bphone" defaultValue={business.phone} className="field !pl-11" />
                  </div>
                </div>
                <div>
                  <label htmlFor="baddr" className="field-label">Address</label>
                  <div className="relative">
                    <FaLocationDot className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
                    <input id="baddr" defaultValue={business.address} className="field !pl-11" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="btn-primary">Save changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

const UPDATE_TYPES = [
  { key: 'offer', label: 'Offer' },
  { key: 'event', label: 'Event' },
  { key: 'product', label: 'New in store' },
  { key: 'news', label: 'Update' },
] as const;

function UpdatesTab({
  businessId,
  businessName,
  followers,
}: {
  businessId: string;
  businessName: string;
  followers: number;
}) {
  useStoreVersion();
  const [type, setType] = useState<string>('offer');
  const [text, setText] = useState('');
  const [scope, setScope] = useState<'public' | 'followers'>('public');
  const [expires, setExpires] = useState('');
  const [error, setError] = useState('');
  const [posted, setPosted] = useState(false);

  const updates = social.getUpdatesForBusiness(businessId);

  const handlePost = () => {
    if (text.trim().length < 10) {
      setError('Say a little more — at least 10 characters.');
      return;
    }
    social.addUpdate({
      businessId,
      type: type as Parameters<typeof social.addUpdate>[0]['type'],
      text,
      scope,
      expiresAt: expires || undefined,
    });
    setText('');
    setExpires('');
    setError('');
    setPosted(true);
    setTimeout(() => setPosted(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Composer */}
      <div className="card p-6">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv">Post an update</h3>
            <p className="text-sm text-muted mt-0.5 inline-flex items-center gap-1.5">
              <FaUsers className="text-ink-400" aria-hidden />
              {followers.toLocaleString()} followers see your posts in their feed
            </p>
          </div>
          {posted && (
            <span className="text-sm font-semibold text-success inline-flex items-center gap-1.5" role="status">
              <FaCircleCheck aria-hidden /> Posted
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {UPDATE_TYPES.map((t) => (
              <button
                key={t.key}
                onClick={() => setType(t.key)}
                aria-pressed={type === t.key}
                className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition ${
                  type === t.key
                    ? 'bg-primary text-white'
                    : 'bg-sunken-light dark:bg-white/5 text-ink-700 dark:text-ink-700-inv hover:bg-primary-soft dark:hover:bg-primary/15'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder={`What's happening at ${businessName}? An offer, an event, fresh stock…`}
            className="field resize-none"
            aria-label="Update text"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="upd-scope" className="field-label">Audience</label>
              <select
                id="upd-scope"
                value={scope}
                onChange={(e) => setScope(e.target.value as 'public' | 'followers')}
                className="field"
              >
                <option value="public">Everyone on Finda</option>
                <option value="followers">Followers only (reward)</option>
              </select>
            </div>
            <div>
              <label htmlFor="upd-exp" className="field-label">Ends on (optional — for offers)</label>
              <input
                id="upd-exp"
                type="date"
                value={expires}
                onChange={(e) => setExpires(e.target.value)}
                className="field"
              />
            </div>
          </div>
          {error && <p className="text-sm font-semibold text-danger" role="alert">{error}</p>}
          <div className="flex justify-end">
            <button onClick={handlePost} className="btn-primary btn-sm">
              <FaBullhorn aria-hidden /> Post update
            </button>
          </div>
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-4">Your updates</h3>
        {updates.length === 0 ? (
          <div className="card p-10 text-center">
            <p className="text-muted">
              No updates yet. Businesses that post weekly get more followers and orders.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {updates.map((u) => (
              <article key={u.id} className="card p-5 flex items-start gap-4">
                <span className="badge-accent text-[10px] capitalize shrink-0 mt-0.5">{u.type}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] text-ink-700 dark:text-ink-700-inv leading-relaxed">{u.text}</p>
                  <p className="text-xs text-muted mt-1.5">
                    {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {' · '}
                    {u.scope === 'followers' ? 'Followers only' : 'Public'}
                    {u.expiresAt && ` · ends ${new Date(u.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                  </p>
                </div>
                <button
                  onClick={() => social.deleteUpdate(u.id)}
                  className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-ink-400 hover:text-danger hover:bg-danger-soft dark:hover:bg-danger/10 transition"
                  aria-label="Delete update"
                >
                  <FaTrash className="text-xs" aria-hidden />
                </button>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
