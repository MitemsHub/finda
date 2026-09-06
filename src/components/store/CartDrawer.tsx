'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaXmark, FaMinus, FaPlus, FaTrash, FaBagShopping } from 'react-icons/fa6';
import { useStoreVersion } from '@/lib/hooks/useStore';
import * as store from '@/lib/data/demo';
import { naira } from '@/lib/data/demo';

/**
 * Slide-in cart drawer. Single-business carts keep checkout simple;
 * adding from a different store replaces the cart (with a heads-up).
 */
export function useCartDrawer() {
  const [open, setOpen] = useState(false);
  return {
    open,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
  };
}

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useStoreVersion();
  const cart = store.getCart();
  const business = store.getCartBusiness();
  const [replacing, setReplacing] = useState<string | null>(null);
  const pendingProduct = useRef<{ product: store.Product; business: store.Business } | null>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ product: store.Product; business: store.Business }>).detail;
      const current = store.getCart();
      if (current.length > 0 && current[0].businessId !== detail.business.id) {
        pendingProduct.current = detail;
        setReplacing(detail.business.name);
      }
    };
    window.addEventListener('finda:cart-conflict', handler);
    return () => window.removeEventListener('finda:cart-conflict', handler);
  }, []);

  const subtotal = cart.reduce((sum, c) => sum + c.priceValue * c.quantity, 0);
  const itemCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-end bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div
        className="bg-paper-light dark:bg-paper-dark w-full max-w-md h-full shadow-2xl flex flex-col animate-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line-light dark:border-line-dark">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright flex items-center justify-center">
              <FaBagShopping aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold text-ink-900 dark:text-ink-900-inv">Your bag</h2>
              {business && (
                <p className="text-xs text-muted">
                  {itemCount} item{itemCount !== 1 ? 's' : ''} from{' '}
                  <Link href={`/store/${business.slug}`} className="font-semibold text-primary dark:text-primary-bright hover:underline">
                    {business.name}
                  </Link>
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-500 dark:text-ink-500-inv hover:bg-sunken-light dark:hover:bg-white/5"
            aria-label="Close cart"
          >
            <FaXmark />
          </button>
        </div>

        {/* Body */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <span className="w-16 h-16 rounded-2xl bg-sunken-light dark:bg-white/5 flex items-center justify-center mb-5">
              <FaBagShopping className="text-2xl text-ink-300 dark:text-ink-300-inv" aria-hidden />
            </span>
            <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-900-inv mb-1.5">
              Your bag is empty
            </h3>
            <p className="text-sm text-muted mb-6">
              Browse a storefront and tap “Add to bag” — orders go straight to the business.
            </p>
            <Link href="/search" onClick={onClose} className="btn-primary btn-sm">
              Explore storefronts
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-3 items-center card p-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-ink-900 dark:text-ink-900-inv truncate">{item.name}</div>
                    <div className="text-xs text-muted">
                      {item.price}
                      {item.stock !== null && ` · ${item.stock} left`}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => store.setCartQuantity(item.productId, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg border border-line-light dark:border-line-dark flex items-center justify-center text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5"
                        aria-label={`Reduce ${item.name}`}
                      >
                        <FaMinus className="text-[10px]" aria-hidden />
                      </button>
                      <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => store.setCartQuantity(item.productId, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg border border-line-light dark:border-line-dark flex items-center justify-center text-ink-700 dark:text-ink-700-inv hover:bg-sunken-light dark:hover:bg-white/5"
                        aria-label={`Add another ${item.name}`}
                      >
                        <FaPlus className="text-[10px]" aria-hidden />
                      </button>
                      <button
                        onClick={() => store.removeFromCart(item.productId)}
                        className="ml-auto text-xs font-semibold text-danger hover:underline inline-flex items-center gap-1"
                      >
                        <FaTrash className="text-[10px]" aria-hidden /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-ink-900 dark:text-ink-900-inv shrink-0">
                    {naira(item.priceValue * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-line-light dark:border-line-dark px-6 py-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-bold text-ink-900 dark:text-ink-900-inv">{naira(subtotal)}</span>
              </div>
              <div className="flex justify-between text-xs text-muted">
                <span>Delivery (Lagos)</span>
                <span>₦2,000 · chosen at checkout</span>
              </div>
              <Link href="/checkout" onClick={onClose} className="btn-primary w-full">
                Checkout <span aria-hidden>·</span> {naira(subtotal)}
              </Link>
              <button
                onClick={() => store.clearCart()}
                className="w-full text-xs font-semibold text-ink-400 dark:text-ink-400-inv hover:text-danger transition"
              >
                Empty bag
              </button>
            </div>
          </>
        )}
      </div>

      {/* Cart-conflict modal (different store) */}
      {replacing && pendingProduct.current && (
        <div className="absolute inset-0 z-[80] flex items-center justify-center bg-black/60 p-6">
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-7 max-w-sm w-full shadow-2xl">
            <h3 className="font-display text-xl font-bold text-ink-900 dark:text-ink-900-inv mb-2">
              Start a new bag?
            </h3>
            <p className="text-sm text-muted mb-6">
              Your bag has items from <strong>{store.getCartBusiness()?.name}</strong>. Ordering from{' '}
              <strong>{replacing}</strong> starts a fresh bag — one business per order keeps delivery simple.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setReplacing(null);
                  pendingProduct.current = null;
                }}
                className="btn-secondary flex-1"
              >
                Keep current bag
              </button>
              <button
                onClick={() => {
                  const { product, business } = pendingProduct.current!;
                  store.clearCart();
                  store.addToCart(product, business);
                  setReplacing(null);
                  pendingProduct.current = null;
                }}
                className="btn-primary flex-1"
              >
                Start new bag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
