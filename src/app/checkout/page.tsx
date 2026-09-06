'use client';

import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  FaLock, FaStore, FaTruckFast, FaCircleCheck, FaArrowLeft, FaMobileScreen,
} from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { useSession } from '@/lib/session/SessionProvider';
import { useStoreVersion } from '@/lib/hooks/useStore';
import * as store from '@/lib/data/demo';
import { naira, DELIVERY_FEE_NGN } from '@/lib/data/demo';

function CheckoutContent() {
  const router = useRouter();
  useStoreVersion();
  const { user } = useSession();
  const cart = store.getCart();
  const business = store.getCartBusiness();
  const [fulfilment, setFulfilment] = useState<'pickup' | 'delivery'>('pickup');
  const [payNow, setPayNow] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((s, c) => s + c.priceValue * c.quantity, 0);
  const deliveryFee = fulfilment === 'delivery' ? DELIVERY_FEE_NGN : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0 || !business) {
    return (
      <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
        <Header />
        <main className="pt-40 pb-24 px-6 text-center max-w-md mx-auto">
          <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-3">
            Your bag is empty
          </h1>
          <p className="text-muted mb-8">Add something from a storefront first.</p>
          <Link href="/search" className="btn-primary">Explore storefronts</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const form = new FormData(e.currentTarget);
    const name = String(form.get('customerName') ?? '').trim();
    const phone = String(form.get('customerPhone') ?? '').trim();
    const email = String(form.get('customerEmail') ?? '').trim();
    const address = String(form.get('address') ?? '').trim();
    const note = String(form.get('note') ?? '').trim();

    if (!name || !phone) {
      setError('Name and phone number are required.');
      return;
    }
    if (fulfilment === 'delivery' && !address) {
      setError('Add a delivery address so the rider finds you.');
      return;
    }

    setPlacing(true);
    // Live payments ask the server to init Flutterwave (secret key stays
    // server-side). Demo/pay-on-pickup completes locally.
    const completeLocally = () => {
      try {
        const order = store.placeOrder({
          fulfilment,
          customerName: name,
          customerPhone: phone,
          customerEmail: email || user?.email || '',
          address: fulfilment === 'delivery' ? address : undefined,
          note: note || undefined,
          payment: payNow ? 'paid' : 'on_pickup',
        });
        // Fire-and-forget transactional emails (buyer + owner).
        if (business.email) {
          fetch('/api/orders/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              kind: 'order_placed',
              orderId: order.id,
              customerName: name,
              customerEmail: email || user?.email || undefined,
              ownerEmail: business.email,
              businessName: business.name,
              items: order.items.map((i) => ({ name: i.name, quantity: i.quantity, price: i.price })),
              total: order.total,
              fulfilment: order.fulfilment,
            }),
          }).catch(() => {});
        }
        router.push(`/orders/${order.id}`);
      } catch {
        setError('Could not place the order — your bag may have changed. Try again.');
        setPlacing(false);
      }
    };

    if (payNow) {
      fetch('/api/checkout/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          orderId: `pending_${Date.now()}`,
          email: email || user?.email,
          name,
          phone,
          description: `Finda order from ${business.name}`,
        }),
      })
        .then((r) => r.json())
        .then((data: { mode?: string; checkoutUrl?: string }) => {
          if (data.mode === 'redirect' && data.checkoutUrl) {
            // Live mode: Flutterwave hosted checkout. Order is recorded by
            // the server flow on callback; here we keep the demo behavior.
            window.location.href = data.checkoutUrl;
          } else {
            completeLocally();
          }
        })
        .catch(() => completeLocally());
    } else {
      completeLocally();
    }
  };

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-28 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/store/${business.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-400 dark:text-ink-400-inv hover:text-primary dark:hover:text-primary-bright transition mb-6"
          >
            <FaArrowLeft className="text-xs" aria-hidden /> Back to {business.name}
          </Link>

          <h1 className="font-display text-display-md font-bold text-ink-900 dark:text-ink-900-inv mb-2">
            Checkout
          </h1>
          <p className="text-muted mb-8">
            Order from <strong className="text-ink-900 dark:text-ink-900-inv">{business.name}</strong> · pay securely, get updates by phone.
          </p>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit} className="card p-7 space-y-6">
              {/* Contact */}
              <div className="space-y-4">
                <h2 className="font-semibold text-ink-900 dark:text-ink-900-inv text-[15px]">Your details</h2>
                <div>
                  <label htmlFor="customerName" className="field-label">Full name</label>
                  <input
                    id="customerName" name="customerName" type="text" required
                    defaultValue={user ? `${user.firstName} ${user.lastName}` : ''}
                    placeholder="Adaeze Nwosu" className="field"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customerPhone" className="field-label">Phone (WhatsApp preferred)</label>
                    <input id="customerPhone" name="customerPhone" type="tel" required placeholder="0803 000 0000" className="field" />
                  </div>
                  <div>
                    <label htmlFor="customerEmail" className="field-label">Email <span className="font-normal text-ink-400">(for receipts)</span></label>
                    <input
                      id="customerEmail" name="customerEmail" type="email"
                      defaultValue={user?.email ?? ''} placeholder="you@example.com" className="field"
                    />
                  </div>
                </div>
              </div>

              {/* Fulfilment */}
              <div className="space-y-3">
                <h2 className="font-semibold text-ink-900 dark:text-ink-900-inv text-[15px]">How do you want it?</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {([
                    { key: 'pickup', icon: FaStore, title: 'Pickup', desc: business.address + ', ' + business.neighborhood, fee: 'Free' },
                    { key: 'delivery', icon: FaTruckFast, title: 'Lagos delivery', desc: 'Same-day if ordered before 2 PM', fee: naira(DELIVERY_FEE_NGN) },
                  ] as const).map((opt) => (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setFulfilment(opt.key)}
                      aria-pressed={fulfilment === opt.key}
                      className={`text-left p-4 rounded-xl border-2 transition ${
                        fulfilment === opt.key
                          ? 'border-primary bg-primary-soft/50 dark:bg-primary/10'
                          : 'border-line-light dark:border-line-dark hover:border-primary/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-ink-900 dark:text-ink-900-inv inline-flex items-center gap-2 text-sm">
                          <opt.icon className={fulfilment === opt.key ? 'text-primary dark:text-primary-bright' : 'text-ink-400'} aria-hidden />
                          {opt.title}
                        </span>
                        <span className="text-xs font-bold text-ink-500 dark:text-ink-500-inv">{opt.fee}</span>
                      </div>
                      <p className="text-xs text-muted">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                {fulfilment === 'delivery' && (
                  <div>
                    <label htmlFor="address" className="field-label">Delivery address</label>
                    <input id="address" name="address" type="text" placeholder="5 Fanibi Street, Yaba, Lagos" className="field" />
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="space-y-3">
                <h2 className="font-semibold text-ink-900 dark:text-ink-900-inv text-[15px]">Payment</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayNow(true)}
                    aria-pressed={payNow}
                    className={`text-left p-4 rounded-xl border-2 transition ${
                      payNow ? 'border-primary bg-primary-soft/50 dark:bg-primary/10' : 'border-line-light dark:border-line-dark hover:border-primary/40'
                    }`}
                  >
                    <div className="font-semibold text-ink-900 dark:text-ink-900-inv inline-flex items-center gap-2 text-sm mb-1">
                      <FaLock className={payNow ? 'text-primary dark:text-primary-bright' : 'text-ink-400'} aria-hidden /> Pay now
                    </div>
                    <p className="text-xs text-muted">Card or transfer · Flutterwave</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayNow(false)}
                    aria-pressed={!payNow}
                    className={`text-left p-4 rounded-xl border-2 transition ${
                      !payNow ? 'border-primary bg-primary-soft/50 dark:bg-primary/10' : 'border-line-light dark:border-line-dark hover:border-primary/40'
                    }`}
                  >
                    <div className="font-semibold text-ink-900 dark:text-ink-900-inv inline-flex items-center gap-2 text-sm mb-1">
                      <FaMobileScreen className={!payNow ? 'text-primary dark:text-primary-bright' : 'text-ink-400'} aria-hidden /> Pay on pickup
                    </div>
                    <p className="text-xs text-muted">Cash / POS at the counter</p>
                  </button>
                </div>
                <p className="text-xs text-muted flex items-center gap-1.5">
                  <FaLock className="text-[10px]" aria-hidden />
                  Demo mode: no real charge. Live mode uses Flutterwave (cards, transfer, USSD).
                </p>
              </div>

              <div>
                <label htmlFor="note" className="field-label">Note for the business <span className="font-normal text-ink-400">(optional)</span></label>
                <textarea id="note" name="note" rows={2} placeholder="Extra sauce, gift wrapping, landmark…" className="field resize-none" />
              </div>

              {error && <p className="text-sm font-semibold text-danger" role="alert">{error}</p>}

              <button type="submit" disabled={placing} className="btn-primary w-full">
                {placing ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Placing order" />
                ) : (
                  <>
                    {payNow ? `Pay ${naira(total)}` : `Place order · ${naira(total)}`}
                    <FaCircleCheck className="text-sm" aria-hidden />
                  </>
                )}
              </button>
            </form>

            {/* Summary */}
            <aside className="card p-6 lg:sticky lg:top-28">
              <h2 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-4 text-[15px]">Order summary</h2>
              <ul className="space-y-3 mb-5">
                {cart.map((item) => (
                  <li key={item.productId} className="flex justify-between gap-3 text-sm">
                    <span className="text-ink-700 dark:text-ink-700-inv min-w-0">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="font-semibold text-ink-900 dark:text-ink-900-inv shrink-0">
                      {naira(item.priceValue * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-line-light dark:border-line-dark pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-semibold text-ink-900 dark:text-ink-900-inv">{naira(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">{fulfilment === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                  <span className="font-semibold text-ink-900 dark:text-ink-900-inv">
                    {deliveryFee === 0 ? 'Free' : naira(deliveryFee)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-line-light dark:border-line-dark">
                  <span className="text-ink-900 dark:text-ink-900-inv">Total</span>
                  <span className="text-ink-900 dark:text-ink-900-inv">{naira(total)}</span>
                </div>
              </div>
              <div className="mt-5 p-3 bg-sunken-light/60 dark:bg-white/5 rounded-xl text-xs text-muted leading-relaxed">
                Finda never holds your money. Payments go to {business.name}; we take
                nothing from the order itself.
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper-light dark:bg-paper-dark" />}>
      <CheckoutContent />
    </Suspense>
  );
}
