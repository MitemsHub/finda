'use client';

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import BusinessCard from '@/components/BusinessCard';
import Reveal from '@/components/Reveal';
import { getApprovedBusinesses } from '@/lib/data/demo';

export default function FeaturedStrip() {
  const businesses = getApprovedBusinesses().slice(0, 6);

  return (
    <section className="py-24 bg-paper-light dark:bg-paper-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-10 gap-6">
            <div className="max-w-xl">
              <p className="eyebrow mb-4">Fresh on Finda</p>
              <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-3">
                Spots your neighbors are talking about
              </h2>
              <p className="text-muted text-lg">
                A rotating pick of verified businesses, ranked by reviews from
                real visits — not ad spend.
              </p>
            </div>
            <Link
              href="/search"
              className="hidden sm:inline-flex items-center gap-2 font-semibold text-primary dark:text-primary-bright hover:gap-3 transition-all shrink-0"
            >
              Browse all <FaArrowRight className="text-sm" aria-hidden />
            </Link>
          </div>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-6 pb-4 snap-x snap-mandatory lg:px-[max(1.5rem,calc((100vw-80rem)/2))]">
          {businesses.map((business) => (
            <div key={business.id} className="w-[320px] shrink-0 snap-start">
              <BusinessCard business={business} />
            </div>
          ))}
        </div>
      </Reveal>

      <div className="max-w-7xl mx-auto px-6 mt-6">
        <Link
          href="/search"
          className="sm:hidden inline-flex items-center gap-2 font-semibold text-primary dark:text-primary-bright"
        >
          Browse all businesses <FaArrowRight className="text-sm" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
