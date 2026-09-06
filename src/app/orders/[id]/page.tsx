'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FaCircleCheck, FaClock, FaBoxOpen, FaTruckFast, FaWhatsapp, FaStore, FaReceipt,
  FaCircleInfo, FaHourglassHalf, FaLock,
} from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { useStoreVersion } from '@/lib/hooks/useStore';
import * as store from '@/lib/data/demo';
import { naira } from '@/lib/data/demo';

const TIMELINE = [
  { key: 'pending', label: 'Order placed', icon: FaHourglassHalf },
  { key: 'confirmed', label: 'Confirmed', icon: FaCircleCheck },
  { key: 'ready', label: 'Ready', icon: FaBoxOpen },
  { key: 'completed', label: 'Completed', icon: FaReceipt },
] as const;

function statusBadge(status: string) {
  switch (status) {
    case 'confirmed': return 'badge-success';
    case 'ready': return 'badge-accent';
    case 'completed': return 'badge-neutral';
    case 'cancelled': return 'badge-danger';
    default: return 'badge-accent';
  }
}

function OrderContent() {
  const { id } = useParams<{ id: string }>();
  useStoreVersion();
  const [paid, setPaid] = useState(false);
  const order = store.getOrderById(id);

  if (!order) {
    return (
      <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
        <Header />
        <main className="pt-40 pb-24 px-6 text-center max-w-md mx-auto">
          <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-3">Order not found</h1>
          <p className="text-muted mb-8">This order doesn&apos;t exist on this device.</p>
          <Link href="/orders" className="btn-primary">My orders</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const cancelled = order.status === 'cancelled';
  const currentStep = TIMELINE.findIndex((t) => t.key === order.status);
  const paidNow = paid || order.payment === 'paid';

  const handlePay = () => {
    // Demo payment. Live mode: Flutterwave inline checkout, then
    // markOrderPaid() on verified callback.
    store.markOrderPaid(order.id);
    setPaid(true);
  };

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Link href="/orders" className="inline-flex items-center gap-2 text-sm font-semibold text-ink-400 dark:text-ink-400-inv hover:text-primary dark:hover:text-primary-bright transition mb-6">
            ← My orders
          </Link>

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <h1 className="font-display text-display-md font-bold text-ink-900 dark:text-ink-900-inv">
                {cancelled ? 'Order cancelled' : paidNow ? 'Order confirmed' : 'Order placed'}
              </h1>
              <p className="text-muted mt-1">
                <Link href={`/store/${order.businessSlug}`} className="font-semibold text-primary dark:text-primary-bright hover:underline">
                  {order.businessName}
                </Link>{' '}
                · #{order.id.slice(-6).toUpperCase()}
              </p>
            </div>
            <span className={`badge ${statusBadge(order.status)} capitalize shrink-0 mt-2`}>{order.status}</span>
          </div>

          {/* Unpaid call-to-action */}
          {!paidNow && !cancelled && (
            <div className="card p-5 border-accent/40 dark:border-accent/40 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm mb-0.5">
                    Payment pending — {naira(order.total)}
                  </div>
                  <p className="text-xs text-muted">
                    The business prepares orders once payment lands. Demo mode: no real charge.
                  </p>
                </div>
                <button onClick={handlePay} className="btn-primary btn-sm shrink-0">
                  <FaLock aria-hidden /> Pay {naira(order.total)}
                </button>
              </div>
            </div>
          )}

          {/* Timeline */}
          {!cancelled && (
            <div className="card p-6 mb-6">
              <ol className="flex items-start">
                {TIMELINE.map((step, i) => {
                  const done = i <= currentStep;
                  const isLast = i === TIMELINE.length - 1;
                  return (
                    <li key={step.key} className="flex-1 flex flex-col items-center relative">
                      {!isLast && (
                        <span
                          className={`absolute top-5 left-1/2 w-full h-0.5 ${i < currentStep ? 'bg-primary' : 'bg-sunken-light dark:bg-white/10'}`}
                          aria-hidden
                        />
                      )}
                      <span
                        className={`relative w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                          done
                            ? 'bg-primary text-white'
                            : 'bg-sunken-light dark:bg-white/10 text-ink-400'
                        }`}
                      >
                        <step.icon className="text-sm" aria-hidden />
                      </span>
                      <span className={`text-[11px] font-semibold mt-2 text-center ${done ? 'text-ink-900 dark:text-ink-900-inv' : 'text-ink-400'}`}>
                        {step.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
              {order.status === 'pending' && (
                <p className="text-xs text-muted text-center mt-4 flex items-center justify-center gap-1.5">
                  <FaClock className="text-ink-400" aria-hidden />
                  {order.businessName} usually confirms within the hour.
                </p>
              )}
            </div>
          )}

          {/* Items */}
          <div className="card p-6 mb-6">
            <h2 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-4 text-[15px]">Items</h2>
            <ul className="space-y-3 mb-4">
              {order.items.map((item) => (
                <li key={item.productId} className="flex justify-between gap-3 text-sm">
                  <span className="text-ink-700 dark:text-ink-700-inv">
                    {item.quantity}× {item.name}
                  </span>
                  <span className="font-semibold text-ink-900 dark:text-ink-900-inv">
                    {naira(item.priceValue * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-line-light dark:border-line-dark pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="text-ink-900 dark:text-ink-900-inv">{naira(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">{order.fulfilment === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                <span className="text-ink-900 dark:text-ink-900-inv">{order.deliveryFee === 0 ? 'Free' : naira(order.deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-line-light dark:border-line-dark">
                <span className="text-ink-900 dark:text-ink-900-inv">Total</span>
                <span className="text-ink-900 dark:text-ink-900-inv">{naira(order.total)}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-muted">Payment</span>
                <span className={`font-semibold ${paidNow ? 'text-success' : 'text-accent dark:text-accent-bright'}`}>
                  {paidNow ? 'Paid' : 'On pickup'}
                </span>
              </div>
            </div>
          </div>

          {/* Fulfilment details */}
          <div className="card p-6 mb-6">
            <h2 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-4 text-[15px] inline-flex items-center gap-2">
              {order.fulfilment === 'delivery' ? <FaTruckFast aria-hidden /> : <FaStore aria-hidden />}
              {order.fulfilment === 'delivery' ? 'Delivery' : 'Pickup'}
            </h2>
            <ul className="space-y-2 text-sm text-ink-700 dark:text-ink-700-inv">
              <li><strong className="text-ink-900 dark:text-ink-900-inv">{order.customerName}</strong> · {order.customerPhone}</li>
              {order.fulfilment === 'delivery' && order.address && <li>{order.address}</li>}
              {order.note && <li className="italic text-muted">“{order.note}”</li>}
            </ul>
          </div>

          {/* Contact */}
          <div className="card p-5 bg-primary-soft/50 dark:bg-primary/10 border-primary/20 dark:border-primary/20 flex flex-col sm:flex-row items-center gap-4">
            <FaCircleInfo className="text-primary dark:text-primary-bright shrink-0" aria-hidden />
            <p className="text-sm text-ink-700 dark:text-ink-700-inv flex-1 text-center sm:text-left">
              Questions or changes? Message {order.businessName} — include your order
              number <strong>#{order.id.slice(-6).toUpperCase()}</strong>.
            </p>
            <a
              href={`https://wa.me/${order.businessWhatsapp}?text=${encodeURIComponent(`Hello ${order.businessName}, about my Finda order #${order.id.slice(-6).toUpperCase()} (${naira(order.total)}) —`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1FA855] hover:brightness-110 transition shrink-0"
            >
              <FaWhatsapp aria-hidden /> WhatsApp
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper-light dark:bg-paper-dark" />}>
      <OrderContent />
    </Suspense>
  );
}
