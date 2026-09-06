'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaMagnifyingGlass, FaStar, FaCircleCheck, FaArrowRight } from 'react-icons/fa6';
import { getApprovedBusinesses } from '@/lib/data/demo';

const POPULAR = ['Coffee', 'Barbershop', 'Restaurants', 'Gyms', 'Bookstores'];

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const businesses = getApprovedBusinesses();
  const featured = businesses[0];
  const second = businesses[1];
  const third = businesses[5];

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search');
  };

  return (
    <section className="relative overflow-hidden">
      {/* warm radial washes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-primary-soft dark:bg-primary/10 blur-3xl opacity-70" />
        <div className="absolute top-64 -left-48 w-[460px] h-[460px] rounded-full bg-accent-soft dark:bg-accent/10 blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 relative">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-8 items-center">
          {/* ── Copy ── */}
          <div className="fade-in-up">
            <div className="badge-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-bright animate-pulse-dot" aria-hidden />
              Now live across Lagos 🇳🇬
            </div>

            <h1 className="text-display-xl font-bold text-ink-900 dark:text-ink-900-inv mb-6">
              Find the places your Lagos neighborhood is{' '}
              <span className="text-primary dark:text-primary-bright italic">quietly raving</span>{' '}
              about.
            </h1>

            <p className="text-lg text-ink-500 dark:text-ink-500-inv leading-relaxed mb-8 max-w-xl">
              Finda is Nigeria&apos;s trusted guide to local businesses — verified
              listings, honest reviews, instant booking, and WhatsApp ordering.
              No ads disguised as results.
            </p>

            {/* Search */}
            <form onSubmit={submitSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mb-5" role="search">
              <div className="relative flex-1">
                <FaMagnifyingGlass
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-400-inv"
                  aria-hidden
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Try “coffee”, “barber”, “dentist”…"
                  aria-label="Search businesses"
                  className="field !pl-11 h-14 !rounded-2xl shadow-card"
                />
              </div>
              <button type="submit" className="btn-primary h-14 !px-8 !rounded-2xl">
                Search
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 mb-10">
              <span className="text-sm text-ink-400 dark:text-ink-400-inv font-medium mr-1">Popular:</span>
              {POPULAR.map((tag) => (
                <Link
                  key={tag}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 rounded-full border border-line-light dark:border-line-dark text-sm font-medium text-ink-700 dark:text-ink-700-inv hover:border-primary hover:text-primary dark:hover:text-primary-bright transition"
                >
                  {tag}
                </Link>
              ))}
            </div>

            {/* Stats */}
            <dl className="flex items-center gap-8">
              {[
                { value: '10K+', label: 'Verified businesses' },
                { value: '50K+', label: 'Neighborhood reviews' },
                { value: '4.9', label: 'Average rating' },
              ].map((stat, i) => (
                <div key={stat.label} className={i > 0 ? 'pl-8 border-l border-line-light dark:border-line-dark' : ''}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv flex items-center gap-1">
                    {stat.value}
                    {i === 2 && <FaStar className="text-gold text-sm" aria-hidden />}
                  </dd>
                  <dd className="text-xs text-ink-400 dark:text-ink-400-inv font-medium mt-0.5">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Visual collage ── */}
          <div className="relative hidden lg:block fade-in-up delay-2" aria-hidden>
            {/* main card */}
            <div className="relative z-10 w-[400px] ml-auto card p-4 rotate-1 hover:rotate-0 transition duration-500">
              <div className="relative h-52 rounded-xl overflow-hidden bg-sunken-light">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={featured.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <span className="verified-badge absolute top-3 left-3">
                  <FaCircleCheck className="text-[10px]" /> Verified
                </span>
              </div>
              <div className="p-3">
                <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">{featured.category}</div>
                <div className="font-display text-xl font-semibold text-ink-900">{featured.name}</div>
                <div className="flex items-center gap-2 mt-1.5 text-sm">
                  <FaStar className="text-gold" />
                  <span className="font-bold text-ink-900">{featured.rating.toFixed(1)}</span>
                  <span className="text-ink-400">({featured.reviewCount} reviews)</span>
                  <span className="ml-auto badge-success">Open now</span>
                </div>
              </div>
            </div>

            {/* small card — top left */}
            <div className="absolute z-20 -left-2 top-6 w-60 card p-3 -rotate-2 hover:rotate-0 transition duration-500">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={second.image} alt="" className="w-14 h-14 rounded-lg object-cover" />
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-primary">{second.category}</div>
                  <div className="font-semibold text-ink-900 text-sm">{second.name}</div>
                  <div className="flex items-center gap-1 text-xs mt-0.5">
                    <FaStar className="text-gold" />
                    <span className="font-bold text-ink-900">{second.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* review chip — bottom left */}
            <div className="absolute z-30 left-10 -bottom-6 w-72 card p-4 rotate-2 hover:rotate-0 transition duration-500">
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-gold text-xs" />
                ))}
              </div>
              <p className="text-sm text-ink-700 italic leading-snug">
                “Asked for Nigerian sci-fi and something atmospheric — walked out with three perfect picks.”
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-7 h-7 rounded-full bg-primary-soft dark:bg-primary/20 text-primary dark:text-primary-bright text-[10px] font-bold flex items-center justify-center">
                  AM
                </span>
                <span className="text-xs font-semibold text-ink-700">
                  Aisha M. · {third.name}
                </span>
              </div>
            </div>

            {/* stat pill — top right */}
            <div className="absolute z-20 -right-4 -top-2 card px-4 py-3 rotate-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-success-soft text-success flex items-center justify-center">
                  <FaCircleCheck className="text-sm" />
                </span>
                <div>
                  <div className="text-sm font-bold text-ink-900 leading-tight">Booking confirmed</div>
                  <div className="text-xs text-ink-400">Tonight · 7:00 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only CTA under search */}
        <Link
          href="/search"
          className="lg:hidden mt-2 inline-flex items-center gap-2 text-primary dark:text-primary-bright font-semibold"
        >
          Or browse everything <FaArrowRight className="text-sm" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
