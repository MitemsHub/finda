'use client';

import Image from 'next/image';
import { FaMagnifyingGlass, FaStar, FaCircleCheck, FaCalendarCheck, FaLocationDot } from 'react-icons/fa6';
import { getApprovedBusinesses } from '@/lib/data/demo';

export default function MobileMockup() {
  const featured = getApprovedBusinesses()[0];
  const second = getApprovedBusinesses()[1];

  return (
    <div className="relative z-10 float-animation w-[300px]" aria-hidden>
      <div className="rounded-[2.6rem] bg-ink-900 p-2.5 shadow-2xl border border-line-light">
        <div className="rounded-[2.1rem] overflow-hidden bg-paper-light dark:bg-paper-dark relative h-[600px]">
          {/* status bar */}
          <div className="flex justify-between items-center px-6 pt-3 pb-2 text-[10px] font-semibold text-ink-500">
            <span>9:41</span>
            <div className="flex gap-1">
              <span className="w-3 h-2 bg-ink-300 rounded-[1px]" />
              <span className="w-4 h-2 bg-ink-300 rounded-[1px]" />
            </div>
          </div>

          {/* search bar */}
          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 bg-white dark:bg-surface-dark border border-line-light dark:border-line-dark rounded-full px-4 py-2.5 shadow-card">
              <FaMagnifyingGlass className="text-ink-400 text-xs" />
              <span className="text-xs text-ink-400">Search your neighborhood…</span>
            </div>
          </div>

          {/* map area */}
          <div className="relative h-44 mx-4 rounded-2xl overflow-hidden bg-sunken-light">
            <Image src="/map-bg.svg" alt="" fill className="object-cover" />
            {/* pins */}
            <span className="absolute top-8 left-10 w-7 h-7 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center">
              <FaLocationDot className="text-white text-[10px]" />
            </span>
            <span className="absolute top-20 right-12 w-5 h-5 rounded-full bg-accent border-2 border-white shadow-lg flex items-center justify-center">
              <FaLocationDot className="text-white text-[7px]" />
            </span>
            <span className="absolute bottom-6 left-1/3 w-5 h-5 rounded-full bg-primary/70 border-2 border-white shadow" />
            {/* bottom card on map */}
            <div className="absolute bottom-2 left-2 right-2 bg-white dark:bg-surface-dark rounded-xl p-2.5 shadow-card flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.image} alt="" className="w-10 h-10 rounded-lg object-cover" />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-ink-900 truncate">{featured.name}</span>
                  <FaCircleCheck className="text-primary text-[9px]" />
                </div>
                <div className="flex items-center gap-1 text-[10px]">
                  <FaStar className="text-gold" />
                  <span className="font-bold text-ink-900">{featured.rating.toFixed(1)}</span>
                  <span className="text-ink-400">· 1.2 km</span>
                </div>
              </div>
            </div>
          </div>

          {/* list */}
          <div className="px-4 mt-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-sm font-display font-semibold text-ink-900 dark:text-ink-900-inv">Near you</span>
              <span className="text-[11px] font-semibold text-primary">See all</span>
            </div>

            <div className="card p-3 flex items-center gap-3 mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={second.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-ink-900 dark:text-ink-900-inv truncate">{second.name}</div>
                <div className="flex items-center gap-1 text-[10px] text-ink-400 mt-0.5">
                  <FaStar className="text-gold" />
                  <span className="font-bold text-ink-900 dark:text-ink-900-inv">{second.rating.toFixed(1)}</span>
                  <span>· Café · Open now</span>
                </div>
              </div>
              <span className="px-2.5 py-1.5 rounded-lg bg-primary text-white text-[10px] font-bold flex items-center gap-1">
                <FaCalendarCheck /> Book
              </span>
            </div>

            <div className="card p-3 flex items-center gap-3 opacity-70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={featured.gallery[1]} alt="" className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="h-2.5 w-20 bg-sunken-light rounded-full" />
                <div className="h-2 w-14 bg-sunken-light rounded-full mt-1.5" />
              </div>
            </div>
          </div>

          {/* home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-ink-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
