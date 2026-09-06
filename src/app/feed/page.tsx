'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaTags, FaCalendarDays, FaBoxOpen, FaBullhorn, FaUserPlus, FaCheck,
  FaArrowRight, FaCircleCheck, FaWhatsapp,
} from 'react-icons/fa6';
import { PageShell, PageTitle } from '@/components/PageShell';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useStoreVersion } from '@/lib/hooks/useStore';
import * as social from '@/lib/data/social';
import type { BusinessUpdate } from '@/lib/data/demo';

const TYPE_META: Record<BusinessUpdate['type'], { label: string; icon: React.ElementType; badge: string }> = {
  offer: { label: 'Offer', icon: FaTags, badge: 'badge-accent' },
  event: { label: 'Event', icon: FaCalendarDays, badge: 'badge-primary' },
  product: { label: 'New in store', icon: FaBoxOpen, badge: 'badge-gold' },
  news: { label: 'Update', icon: FaBullhorn, badge: 'badge-neutral' },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function FeedContent() {
  useStoreVersion();
  const updates = social.getFeedUpdates();
  const suggestions = social.getSuggestedBusinesses(3);
  const followingCount = social.getFollowingIds().length;

  return (
    <PageShell wide>
      <PageTitle
        title="Your feed"
        subtitle={`${followingCount} business${followingCount !== 1 ? 'es' : ''} you follow · offers, events, and news from your people.`}
      />

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        {/* Feed */}
        <div className="space-y-5 min-w-0">
          {updates.length === 0 ? (
            <div className="card p-14 text-center">
              <span className="w-16 h-16 rounded-2xl bg-sunken-light dark:bg-white/5 flex items-center justify-center mx-auto mb-5">
                <FaBullhorn className="text-2xl text-ink-300 dark:text-ink-300-inv" aria-hidden />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
                Your feed is quiet
              </h3>
              <p className="text-muted mb-6 max-w-sm mx-auto">
                Follow businesses you love — their offers and events land here first.
              </p>
              <Link href="/search" className="btn-primary btn-sm">Find businesses to follow</Link>
            </div>
          ) : (
            updates.map((update) => {
              const meta = TYPE_META[update.type];
              const b = update.business;
              return (
                <article key={update.id} className="card card-hover overflow-hidden">
                  {/* Business header */}
                  <div className="flex items-center gap-3 p-5 pb-4">
                    <Link href={`/business/${b.id}`} className="relative w-11 h-11 rounded-xl overflow-hidden bg-sunken-light shrink-0">
                      <Image src={b.image} alt={b.name} fill sizes="44px" className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/business/${b.id}`}
                        className="font-semibold text-ink-900 dark:text-ink-900-inv text-[15px] hover:text-primary dark:hover:text-primary-bright transition flex items-center gap-1.5"
                      >
                        {b.name}
                        {b.verified && <FaCircleCheck className="text-primary dark:text-primary-bright text-xs" aria-label="Verified" />}
                      </Link>
                      <p className="text-xs text-muted">
                        {b.neighborhood} · {timeAgo(update.createdAt)}
                      </p>
                    </div>
                    <span className={`badge ${meta.badge} text-[10px] shrink-0 inline-flex items-center gap-1`}>
                      <meta.icon className="text-[9px]" aria-hidden /> {meta.label}
                    </span>
                  </div>

                  {/* Body */}
                  <p className="px-5 pb-4 text-[15px] text-ink-700 dark:text-ink-700-inv leading-relaxed">
                    {update.text}
                  </p>
                  {update.expiresAt && (
                    <p className="px-5 pb-3 text-xs font-semibold text-accent dark:text-accent-bright">
                      Ends {new Date(update.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 px-5 pb-5">
                    <Link href={`/store/${b.slug}`} className="btn-primary btn-sm">
                      Shop now <FaArrowRight className="text-[10px]" aria-hidden />
                    </Link>
                    {b.whatsapp && (
                      <a
                        href={`https://wa.me/${b.whatsapp}?text=${encodeURIComponent(`Hello ${b.name}, I saw your update on Finda — "${update.text.slice(0, 60)}…"`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-[#128C4B] border border-[#1FA855]/40 hover:bg-[#1FA855]/10 transition"
                      >
                        <FaWhatsapp aria-hidden /> Ask
                      </a>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Suggestions rail */}
        <aside className="space-y-4 lg:sticky lg:top-28">
          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm mb-4">
              People also follow
            </h3>
            <div className="space-y-3">
              {suggestions.length === 0 ? (
                <p className="text-sm text-muted">You follow every business on Finda — impressive.</p>
              ) : (
                suggestions.map((b) => (
                  <div key={b.id} className="flex items-center gap-3">
                    <Link href={`/business/${b.id}`} className="relative w-10 h-10 rounded-lg overflow-hidden bg-sunken-light shrink-0">
                      <Image src={b.image} alt={b.name} fill sizes="40px" className="object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/business/${b.id}`} className="block text-sm font-semibold text-ink-900 dark:text-ink-900-inv truncate hover:text-primary dark:hover:text-primary-bright transition">
                        {b.name}
                      </Link>
                      <span className="text-xs text-muted">★ {b.rating.toFixed(1)} · {b.neighborhood}</span>
                    </div>
                    <FollowMiniButton businessId={b.id} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="card p-5 bg-primary-soft/50 dark:bg-primary/10 border-primary/20 dark:border-primary/20">
            <h3 className="font-semibold text-primary dark:text-primary-bright text-sm mb-2">
              How the feed works
            </h3>
            <ul className="text-xs text-ink-700 dark:text-ink-700-inv space-y-2 leading-relaxed">
              <li>· Public updates from every verified business</li>
              <li>· Followers-only drops from businesses you follow</li>
              <li>· Offers expire automatically — no stale deals</li>
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}

/** Small inline follow toggle used in the suggestions rail. */
function FollowMiniButton({ businessId }: { businessId: string }) {
  const following = social.isFollowing(businessId);
  return (
    <button
      onClick={() => social.toggleFollow(businessId)}
      aria-pressed={following}
      className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition ${
        following
          ? 'bg-success-soft dark:bg-success/15 text-success'
          : 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright hover:brightness-105'
      }`}
      aria-label={following ? 'Unfollow' : 'Follow'}
    >
      {following ? <FaCheck className="text-xs" aria-hidden /> : <FaUserPlus className="text-xs" aria-hidden />}
    </button>
  );
}

export default function FeedPage() {
  return (
    <AuthGuard>
      <FeedContent />
    </AuthGuard>
  );
}
