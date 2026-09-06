"use client";

import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { PageShell, PageTitle } from '@/components/PageShell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import BusinessCard from '@/components/BusinessCard';
import * as store from '@/lib/data/demo';
import { useStoreVersion } from '@/lib/hooks/useStore';

export default function FavoritesPage() {
  return (
    <AuthGuard>
      <FavoritesContent />
    </AuthGuard>
  );
}

function FavoritesContent() {
  useStoreVersion();
  const favorites = store.getFavoriteBusinesses();

  return (
    <PageShell wide>
      <PageTitle
        title="My favorites"
        subtitle="The spots you've saved — one tap from booking again."
        action={
          <span className="badge-neutral text-sm py-2 px-4">
            <FaHeart className="text-danger" aria-hidden />
            {favorites.length} saved
          </span>
        }
      />

      {favorites.length === 0 ? (
        <div className="card p-14 text-center">
          <span className="w-16 h-16 rounded-2xl bg-sunken-light dark:bg-white/5 flex items-center justify-center mx-auto mb-5">
            <FaRegHeart className="text-2xl text-ink-300 dark:text-ink-300-inv" aria-hidden />
          </span>
          <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
            Nothing saved yet
          </h3>
          <p className="text-muted mb-6 max-w-sm mx-auto">
            Tap the heart on any business to keep it here for quick booking.
          </p>
          <Link href="/search" className="btn-primary btn-sm">Explore businesses</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
