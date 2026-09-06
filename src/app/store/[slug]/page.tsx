'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FaWhatsapp, FaPhone, FaLocationDot, FaClock, FaCircleCheck, FaShareNodes,
  FaBagShopping, FaCircleInfo, FaBoxOpen, FaStar, FaShieldHalved, FaBolt,
} from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import CartDrawer, { useCartDrawer } from '@/components/store/CartDrawer';
import { useStoreVersion } from '@/lib/hooks/useStore';
import * as store from '@/lib/data/demo';

export default function StorefrontPage() {
  const { slug } = useParams<{ slug: string }>();
  useStoreVersion();
  const { open: cartOpen, openCart, closeCart } = useCartDrawer();
  const [added, setAdded] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  const business = store.getBusinessBySlug(slug);
  const products = useMemo(
    () => (business ? store.getProductsForBusiness(business.id) : []),
    [business]
  );
  const cartCount = store.getCart().reduce((s, c) => s + c.quantity, 0);

  const available = products.filter((p) => !p.soldOut);
  const soldOut = products.filter((p) => p.soldOut);

  const handleAdd = (product: store.Product) => {
    if (!business) return;
    const cart = store.getCart();
    if (cart.length > 0 && cart[0].businessId !== business.id) {
      // Ask before replacing a bag from a different store
      window.dispatchEvent(
        new CustomEvent('finda:cart-conflict', { detail: { product, business } })
      );
      openCart();
      return;
    }
    store.addToCart(product, business);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1600);
  };

  const share = () => {
    const url = `${window.location.origin}/store/${business?.slug ?? ''}`;
    if (navigator.share) {
      navigator.share({ title: business?.name, url }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
        <Header />
        <main className="pt-40 pb-24 px-6 text-center max-w-md mx-auto">
          <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-3">
            Store not found
          </h1>
          <p className="text-muted mb-8">
            This storefront doesn&apos;t exist or is no longer listed on Finda.
          </p>
          <Link href="/search" className="btn-primary">Explore businesses</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pb-24">
        {/* Store banner */}
        <section className="relative h-56 sm:h-72 bg-primary-strong">
          {business.image && (
            <Image
              src={business.image}
              alt={business.name}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-6 pb-8">
              <span className="badge-accent mb-3 inline-flex">Finda storefront</span>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-1">
                {business.name}
              </h1>
              <p className="text-white/85 text-sm flex items-center gap-2">
                <FaLocationDot aria-hidden /> {business.address}, {business.neighborhood}
                {business.verified && (
                  <span className="inline-flex items-center gap-1 text-white/90 font-semibold">
                    · <FaCircleCheck aria-hidden /> Verified
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Sticky action bar */}
        <div className="sticky top-[72px] z-40 glass-effect border-b border-line-light dark:border-line-dark">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <span className="text-sm font-semibold text-ink-900 dark:text-ink-900-inv truncate">
                {available.length > 0
                  ? `${available.length} item${available.length !== 1 ? 's' : ''} available`
                  : 'No items yet'}
              </span>
              <span className="hidden sm:inline text-xs text-muted truncate">
                Order pickup or Lagos delivery
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={share} className="btn-secondary btn-sm">
                <FaShareNodes aria-hidden /> {shared ? 'Copied!' : 'Share store'}
              </button>
              <button onClick={openCart} className="btn-primary btn-sm relative">
                <FaBagShopping aria-hidden /> Bag
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="max-w-7xl mx-auto px-6 pt-10">
          {products.length === 0 ? (
            <div className="card p-14 text-center max-w-lg mx-auto">
              <span className="w-16 h-16 rounded-2xl bg-sunken-light dark:bg-white/5 flex items-center justify-center mx-auto mb-5">
                <FaBoxOpen className="text-2xl text-ink-300 dark:text-ink-300-inv" aria-hidden />
              </span>
              <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
                This store is being stocked
              </h2>
              <p className="text-muted mb-6">
                {business.name} hasn&apos;t added products yet. Check their services,
                or reach out directly — businesses reply fastest on WhatsApp.
              </p>
              <div className="flex gap-3 justify-center">
                <Link href={`/business/${business.id}`} className="btn-secondary btn-sm">
                  View profile
                </Link>
                {business.whatsapp && (
                  <a
                    href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`Hello ${business.name}, I found you on Finda and I'd like to ask about your store.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1FA855] hover:brightness-110 transition"
                  >
                    <FaWhatsapp aria-hidden /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {available.map((product) => {
                  const lowStock = product.stock !== null && product.stock <= 3;
                  const justAdded = added === product.id;
                  return (
                    <article key={product.id} className="card card-hover overflow-hidden group flex flex-col">
                      <div className="relative aspect-[4/3] bg-sunken-light">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover group-hover:scale-105 transition duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaBoxOpen className="text-3xl text-ink-300" aria-hidden />
                          </div>
                        )}
                        {lowStock && (
                          <span className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white">
                            Only {product.stock} left
                          </span>
                        )}
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv text-[15px] leading-snug">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-xs text-muted mt-1 line-clamp-2">{product.description}</p>
                        )}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-line-light dark:border-line-dark mt-auto">
                          <span className="font-display font-bold text-ink-900 dark:text-ink-900-inv">
                            {product.price}
                          </span>
                          <button
                            onClick={() => handleAdd(product)}
                            className={`btn-sm px-3 py-2 rounded-lg text-xs font-bold transition inline-flex items-center gap-1.5 ${
                              justAdded
                                ? 'bg-success text-white'
                                : 'bg-primary text-white hover:brightness-110'
                            }`}
                            aria-label={`Add ${product.name} to bag`}
                          >
                            {justAdded ? (
                              <><FaCircleCheck aria-hidden /> Added</>
                            ) : (
                              <><FaBagShopping className="text-[11px]" aria-hidden /> Add</>
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {soldOut.length > 0 && (
                <section className="mt-12">
                  <h2 className="text-xs font-bold uppercase tracking-[0.1em] text-ink-400 dark:text-ink-400-inv mb-4">
                    Sold out — check back soon
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 opacity-60">
                    {soldOut.map((product) => (
                      <article key={product.id} className="card p-4 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-sm text-ink-900 dark:text-ink-900-inv truncate">{product.name}</h3>
                          <span className="text-xs text-muted">{product.price}</span>
                        </div>
                        <span className="badge-neutral text-[10px] shrink-0">Sold out</span>
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}

          {/* Store info row */}
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            <div className="card p-6">
              <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-3 flex items-center gap-2 text-sm">
                <FaClock className="text-primary dark:text-primary-bright" aria-hidden /> Pickup & delivery
              </h3>
              <ul className="text-sm text-ink-700 dark:text-ink-700-inv space-y-1.5">
                <li>Pickup: {business.address}, {business.neighborhood}</li>
                <li>Lagos delivery: flat ₦2,000, same-day before 2 PM</li>
                <li>Pay online or on pickup</li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-3 flex items-center gap-2 text-sm">
                <FaStar className="text-gold dark:text-gold-bright" aria-hidden /> Hours
              </h3>
              <dl className="space-y-1.5 text-sm">
                {business.hours.map((h) => (
                  <div key={h.day} className="flex justify-between">
                    <dt className="text-ink-500 dark:text-ink-500-inv">{h.day}</dt>
                    <dd className="font-semibold text-ink-900 dark:text-ink-900-inv">{h.open} – {h.close}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="card p-6">
              <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-3 flex items-center gap-2 text-sm">
                <FaPhone className="text-primary dark:text-primary-bright" aria-hidden /> Questions?
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href={`tel:${business.phone}`} className="text-ink-700 dark:text-ink-700-inv hover:text-primary dark:hover:text-primary-bright font-medium inline-flex items-center gap-2">
                    <FaPhone className="text-xs text-ink-400" aria-hidden /> {business.phone}
                  </a>
                </li>
                {business.whatsapp && (
                  <li>
                    <a
                      href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`Hello ${business.name}, I have a question about an order.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1FA855] hover:brightness-110 transition"
                    >
                      <FaWhatsapp aria-hidden /> Chat on WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-10 card p-5 bg-primary-soft/50 dark:bg-primary/10 border-primary/20 dark:border-primary/20 flex flex-wrap items-center gap-x-8 gap-y-3 justify-center">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary-bright">
              <FaShieldHalved aria-hidden /> Verified business on Finda
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary-bright">
              <FaBolt aria-hidden /> Business confirms in minutes
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary-bright">
              <FaCircleInfo aria-hidden /> No hidden fees — what you see is what you pay
            </span>
          </div>
        </div>
      </main>

      <CartDrawer open={cartOpen} onClose={closeCart} />
      <Footer />
    </div>
  );
}
