"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaStar, FaLocationDot, FaRegHeart, FaHeart, FaCircleCheck } from "react-icons/fa6";
import * as store from "@/lib/data/demo";

interface BusinessCardProps {
  business: store.Business;
  showNeighborhood?: boolean;
}

export default function BusinessCard({ business, showNeighborhood = true }: BusinessCardProps) {
  const [isFavorite, setIsFavorite] = useState(store.getFavorites().includes(business.id));

  const toggleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    store.toggleFavorite(business.id);
    setIsFavorite(store.getFavorites().includes(business.id));
  };

  return (
    <Link
      href={`/business/${business.id}`}
      className="group block bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-line-light dark:border-line-dark shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-sunken-light dark:bg-sunken-dark">
          <Image
            src={business.image}
            alt={business.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-500"
          />
        </div>

        <button
          onClick={toggleFav}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center transition hover:scale-110 shadow-sm"
          aria-label={isFavorite ? `Remove ${business.name} from favorites` : `Save ${business.name} to favorites`}
          aria-pressed={isFavorite}
        >
          {isFavorite ? (
            <FaHeart className="text-danger text-sm" />
          ) : (
            <FaRegHeart className="text-ink-700 dark:text-ink-700-inv text-sm" />
          )}
        </button>

        {business.verified && (
          <div className="absolute top-3 left-3">
            <span className="verified-badge">
              <FaCircleCheck aria-hidden className="text-[10px]" />
              Verified
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-bright">
            {business.category}
          </span>
          <span className="text-[11px] text-ink-400 dark:text-ink-400-inv font-medium">
            {"₦".repeat(business.priceLevel)}
          </span>
        </div>

        <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-900-inv mb-1.5 group-hover:text-primary dark:group-hover:text-primary-bright transition">
          {business.name}
        </h3>

        <div className="flex items-center gap-2 text-sm mb-2">
          <span className="flex items-center gap-1 text-gold" aria-hidden>
            <FaStar />
          </span>
          <span className="font-bold text-ink-900 dark:text-ink-900-inv">
            {business.rating.toFixed(1)}
          </span>
          <span className="text-ink-400 dark:text-ink-400-inv">
            ({business.reviewCount})
          </span>
          {showNeighborhood && (
            <>
              <span className="text-ink-300 dark:text-ink-300-inv" aria-hidden>·</span>
              <span className="flex items-center gap-1 text-ink-500 dark:text-ink-500-inv truncate">
                <FaLocationDot className="shrink-0" aria-hidden />
                {business.neighborhood}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {business.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-sunken-light dark:bg-white/5 text-[11px] font-semibold text-ink-500 dark:text-ink-500-inv"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
