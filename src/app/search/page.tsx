"use client";

import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { FaMagnifyingGlass, FaSliders, FaXmark, FaMapLocationDot, FaListCheck } from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BusinessCard from '@/components/BusinessCard';
import { PageTitle } from '@/components/PageShell';
import { getApprovedBusinesses, type Business } from '@/lib/data/demo';

// Leaflet touches window at import time — load it client-side only.
const ResultsMap = dynamic(() => import('@/components/search/ResultsMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-sunken-light dark:bg-white/5 flex items-center justify-center">
      <span className="text-sm text-muted">Loading map…</span>
    </div>
  ),
});

type SortKey = 'rating' | 'reviews' | 'name';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [category, setCategory] = useState('All');
  const [neighborhood, setNeighborhood] = useState('All');
  const [openOnly, setOpenOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Keep the input in sync when the URL changes (e.g. popular tag links)
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setQuery(q);
  }, [searchParams]);

  const all = getApprovedBusinesses();

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(all.map((b) => b.category))).sort()],
    [all]
  );
  const neighborhoods = useMemo(
    () => ['All', ...Array.from(new Set(all.map((b) => b.neighborhood))).sort()],
    [all]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list: Business[] = all.filter((b) => {
      const matchesQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.neighborhood.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || b.category === category;
      const matchesHood = neighborhood === 'All' || b.neighborhood === neighborhood;
      const matchesOpen = !openOnly || b.isOpen;
      const matchesVerified = !verifiedOnly || b.verified;
      return matchesQuery && matchesCategory && matchesHood && matchesOpen && matchesVerified;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating || b.reviewCount - a.reviewCount;
      if (sort === 'reviews') return b.reviewCount - a.reviewCount;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [all, query, category, neighborhood, openOnly, verifiedOnly, sort]);

  const activeFilters =
    (category !== 'All' ? 1 : 0) +
    (neighborhood !== 'All' ? 1 : 0) +
    (openOnly ? 1 : 0) +
    (verifiedOnly ? 1 : 0);

  const clearFilters = () => {
    setCategory('All');
    setNeighborhood('All');
    setOpenOnly(false);
    setVerifiedOnly(false);
  };

  const filterPanel = (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400 dark:text-ink-400-inv mb-3">
          Category
        </h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                category === c
                  ? 'bg-primary text-white'
                  : 'bg-sunken-light dark:bg-white/5 text-ink-700 dark:text-ink-700-inv hover:bg-primary-soft dark:hover:bg-primary/15'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400 dark:text-ink-400-inv mb-3">
          Neighborhood
        </h3>
        <select
          value={neighborhood}
          onChange={(e) => setNeighborhood(e.target.value)}
          className="field !py-2.5"
          aria-label="Filter by neighborhood"
        >
          {neighborhoods.map((n) => (
            <option key={n} value={n}>{n === 'All' ? 'All neighborhoods' : n}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400 dark:text-ink-400-inv">
          Quick filters
        </h3>
        {[
          { label: 'Open now', value: openOnly, set: setOpenOnly },
          { label: 'Verified only', value: verifiedOnly, set: setVerifiedOnly },
        ].map((f) => (
          <label key={f.label} className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={f.value}
              onChange={(e) => f.set(e.target.checked)}
              className="w-4 h-4 rounded accent-[#1F5C45]"
            />
            <span className="text-[15px] text-ink-700 dark:text-ink-700-inv">{f.label}</span>
          </label>
        ))}
      </div>

      {activeFilters > 0 && (
        <button onClick={clearFilters} className="text-sm font-semibold text-danger hover:underline">
          Clear all filters ({activeFilters})
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-28 pb-24 px-6 max-w-7xl mx-auto">
        <PageTitle
          title="Explore local businesses"
          subtitle="Every listing is verified and every review comes from a real visit. Filter down to exactly what you need."
        />

        {/* Search bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-3 mb-8"
          role="search"
        >
          <div className="relative flex-1">
            <FaMagnifyingGlass
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 dark:text-ink-400-inv"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search businesses, services, or tags…"
              aria-label="Search businesses"
              className="field !pl-11 h-14 !py-3.5"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center text-ink-400 hover:bg-sunken-light dark:hover:bg-white/10"
                aria-label="Clear search"
              >
                <FaXmark className="text-sm" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary lg:hidden relative"
            aria-expanded={showFilters}
          >
            <FaSliders aria-hidden />
            Filters
            {activeFilters > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent text-white text-[10px] font-bold flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </button>
        </form>

        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block">
            <div className="card p-6 sticky top-28">{filterPanel}</div>
          </aside>

          {/* Mobile filter drawer */}
          {showFilters && (
            <div className="lg:hidden card p-6 mb-6">{filterPanel}</div>
          )}

          {/* Results */}
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-[15px] text-muted" aria-live="polite">
                <span className="font-bold text-ink-900 dark:text-ink-900-inv">{results.length}</span>{' '}
                {results.length === 1 ? 'business' : 'businesses'}
                {query && (
                  <>
                    {' '}for <span className="font-semibold text-ink-900 dark:text-ink-900-inv">“{query}”</span>
                  </>
                )}
              </p>
              <div className="flex items-center gap-3">
                {/* List / Map toggle */}
                <div className="flex p-1 bg-sunken-light dark:bg-white/5 rounded-xl" role="group" aria-label="Result view">
                  <button
                    onClick={() => setView('list')}
                    aria-pressed={view === 'list'}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                      view === 'list'
                        ? 'bg-white dark:bg-surface-dark text-ink-900 dark:text-ink-900-inv shadow-card'
                        : 'text-ink-500 dark:text-ink-500-inv hover:text-ink-900 dark:hover:text-ink-900-inv'
                    }`}
                  >
                    <FaListCheck className="text-xs" aria-hidden /> List
                  </button>
                  <button
                    onClick={() => setView('map')}
                    aria-pressed={view === 'map'}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                      view === 'map'
                        ? 'bg-white dark:bg-surface-dark text-ink-900 dark:text-ink-900-inv shadow-card'
                        : 'text-ink-500 dark:text-ink-500-inv hover:text-ink-900 dark:hover:text-ink-900-inv'
                    }`}
                  >
                    <FaMapLocationDot className="text-xs" aria-hidden /> Map
                  </button>
                </div>
                <label className="hidden sm:flex items-center gap-2 text-sm">
                  <span className="text-muted">Sort</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="field !py-2 !px-3 !w-auto text-sm font-semibold"
                    aria-label="Sort results"
                  >
                    <option value="rating">Top rated</option>
                    <option value="reviews">Most reviewed</option>
                    <option value="name">Name A–Z</option>
                  </select>
                </label>
              </div>
            </div>

            {view === 'map' && results.length > 0 && (
              <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start mb-8">
                <div className="card overflow-hidden h-[480px] lg:h-[560px] sticky top-28">
                  <ResultsMap
                    businesses={results}
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </div>
                <div className="space-y-4 lg:max-h-[560px] lg:overflow-y-auto lg:pr-1 scrollbar-hide">
                  {results.map((business) => (
                    <button
                      key={business.id}
                      onMouseEnter={() => setSelectedId(business.id)}
                      onFocus={() => setSelectedId(business.id)}
                      className="block w-full text-left"
                      aria-label={`Focus ${business.name} on the map`}
                    >
                      <span className={`block rounded-2xl transition ${selectedId === business.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-paper-light dark:ring-offset-paper-dark' : ''}`}>
                        <BusinessCard business={business} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {view === 'map' && results.length === 0 && (
              <div className="card p-14 text-center mb-8">
                <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
                  Nothing to map yet
                </h3>
                <p className="text-muted">Adjust your filters — mapped businesses appear here.</p>
              </div>
            )}

            {results.length === 0 ? (
              <div className="card p-14 text-center">
                <span className="w-16 h-16 rounded-2xl bg-sunken-light dark:bg-white/5 flex items-center justify-center mx-auto mb-5 text-3xl">
                  🔍
                </span>
                <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
                  Nothing matches that yet
                </h3>
                <p className="text-muted mb-6 max-w-sm mx-auto">
                  Try a broader search or clear some filters — new businesses
                  join Finda every week.
                </p>
                <button onClick={clearFilters} className="btn-primary btn-sm">
                  Clear filters
                </button>
              </div>
            ) : view === 'list' ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((business) => (
                  <BusinessCard key={business.id} business={business} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-paper-light dark:bg-paper-dark" />
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
