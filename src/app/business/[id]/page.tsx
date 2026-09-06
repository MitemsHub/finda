"use client";

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  FaStar, FaLocationDot, FaPhone, FaGlobe, FaClock, FaShareNodes,
  FaHeart, FaRegHeart, FaCalendarCheck, FaCircleCheck, FaXmark,
  FaCircleInfo, FaWhatsapp, FaBagShopping, FaPenToSquare, FaReply, FaBell,
} from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BusinessCard from '@/components/BusinessCard';
import { useSession } from '@/lib/session/SessionProvider';
import { useStoreVersion } from '@/lib/hooks/useStore';
import * as store from '@/lib/data/demo';
import * as social from '@/lib/data/social';

function Stars({ value, className = '' }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <FaStar key={i} className={i <= Math.round(value) ? 'text-gold' : 'text-ink-300 dark:text-ink-300-inv'} aria-hidden />
      ))}
    </span>
  );
}

export default function BusinessProfile() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? '';
  const business = store.getBusinessById(id);
  useStoreVersion();
  const { user } = useSession();

  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [booked, setBooked] = useState(false);

  const [isFavorite, setIsFavorite] = useState(store.getFavorites().includes(id));
  const [showShare, setShowShare] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Social state
  const following = social.isFollowing(id);
  const followers = social.getFollowerCount(id);
  const updates = social.getUpdatesForBusiness(id);

  // Review composer state
  const [showComposer, setShowComposer] = useState(false);
  const [composerRating, setComposerRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [composerText, setComposerText] = useState('');
  const [composerError, setComposerError] = useState('');
  const [justPosted, setJustPosted] = useState(false);

  const reviews = useMemo(
    () => (business ? store.getReviewsForBusiness(business.id) : []),
    [business]
  );

  const ratingBuckets = useMemo(() => {
    if (reviews.length === 0) return null;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    const avg = total / reviews.length;
    return {
      avg,
      count: reviews.length,
      dist: [5, 4, 3, 2, 1].map(
        (star) => reviews.filter((r) => r.rating === star).length
      ),
    };
  }, [reviews]);

  const similar = useMemo(() => {
    if (!business) return [];
    return store
      .getApprovedBusinesses()
      .filter((b) => b.category === business.category && b.id !== business.id)
      .slice(0, 3);
  }, [business]);

  const products = useMemo(
    () => (business ? store.getProductsForBusiness(business.id) : []),
    [business]
  );

  const myReview = business ? store.getMyReview(business.id) : undefined;
  const verifiedVisit = business ? store.hasCompletedBooking(business.id) : false;

  const submitReview = () => {
    if (!business) return;
    if (composerRating === 0) {
      setComposerError('Pick a star rating first.');
      return;
    }
    if (composerText.trim().length < 10) {
      setComposerError('Tell people a bit more — at least 10 characters.');
      return;
    }
    store.addReview(business.id, composerRating, composerText.trim());
    setComposerError('');
    setShowComposer(false);
    setComposerText('');
    setComposerRating(0);
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 2500);
  };

  if (!business) {
    return (
      <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
        <Header />
        <main className="pt-40 pb-24 px-6 max-w-xl mx-auto text-center">
          <h1 className="text-display-md font-bold text-ink-900 dark:text-ink-900-inv mb-3">
            Business not found
          </h1>
          <p className="text-muted mb-8">
            This listing may have been removed or is still pending verification.
          </p>
          <Link href="/search" className="btn-primary">Browse businesses</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const gallery = [business.image, ...business.gallery].filter(Boolean);

  const openBooking = (serviceName?: string) => {
    setSelectedService(serviceName ?? business.services[0]?.name ?? '');
    setShowBooking(true);
    setBooked(false);
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !bookingDate || !bookingTime) return;
    store.addBooking({
      businessId: business.id,
      serviceName: selectedService,
      date: bookingDate,
      time: bookingTime,
      notes: bookingNotes,
    });
    setBooked(true);
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowShare(true);
      setTimeout(() => setShowShare(false), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-24 pb-24">
        {/* ── Gallery ── */}
        <div className="relative h-[38vh] min-h-[280px] md:h-[46vh]">
          <Image
            src={gallery[activeImage] ?? business.image}
            alt={business.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />

          {/* thumbnail switcher */}
          {gallery.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              {gallery.map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-11 rounded-lg overflow-hidden border-2 transition ${
                    activeImage === i ? 'border-white' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${i + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* hero info */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-7xl mx-auto px-6 pb-6">
              <div className="badge bg-white/90 text-ink-900 mb-3">{business.category}</div>
              <h1 className="text-display-lg font-bold text-white mb-2">{business.name}</h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/90">
                <span className="flex items-center gap-1.5">
                  <Stars value={business.rating} />
                  <span className="font-bold">{business.rating.toFixed(1)}</span>
                  <span className="text-white/70">({business.reviewCount} reviews)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <FaLocationDot aria-hidden /> {business.address}, {business.neighborhood}
                </span>
                <span className={`flex items-center gap-1.5 font-semibold ${business.isOpen ? 'text-emerald-300' : 'text-red-300'}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${business.isOpen ? 'bg-emerald-300' : 'bg-red-300'}`} />
                  {business.isOpen ? 'Open now' : 'Closed'}
                </span>
                {business.verified && (
                  <span className="verified-badge"><FaCircleCheck className="text-[10px]" /> Verified</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-10 grid lg:grid-cols-[1fr_360px] gap-10">
          {/* ── Main column ── */}
          <div className="space-y-12 min-w-0">
            {/* About */}
            <section>
              <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">About</h2>
              <p className="text-ink-700 dark:text-ink-700-inv leading-relaxed">{business.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {business.tags.map((tag) => (
                  <span key={tag} className="badge-neutral">{tag}</span>
                ))}
              </div>
            </section>

            {/* Services */}
            <section id="services">
              <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-5">
                Services &amp; booking
              </h2>
              <div className="space-y-3">
                {business.services.map((service) => (
                  <div
                    key={service.name}
                    className="card card-hover p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv">{service.name}</h3>
                      <p className="text-sm text-muted mt-0.5">{service.description}</p>
                      <p className="text-xs text-ink-400 dark:text-ink-400-inv mt-1.5 font-medium">
                        {service.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
                      <span className="font-display font-bold text-lg text-ink-900 dark:text-ink-900-inv">
                        {service.price}
                      </span>
                      <button onClick={() => openBooking(service.name)} className="btn-primary btn-sm">
                        Book
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What's new */}
            {updates.length > 0 && (
              <section id="updates">
                <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-6">
                  What&apos;s new
                </h2>
                <div className="space-y-4 mb-12">
                  {updates.slice(0, 3).map((update) => (
                    <article key={update.id} className="card p-5 border-l-4 border-accent/60 dark:border-accent/60">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="badge-accent text-[10px] capitalize inline-flex items-center gap-1">
                          {update.type === 'offer' && '🎟 Offer'}
                          {update.type === 'event' && '📅 Event'}
                          {update.type === 'product' && '🆕 New in store'}
                          {update.type === 'news' && '📣 Update'}
                        </span>
                        <span className="text-xs text-muted">
                          {new Date(update.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          {update.expiresAt && ` · ends ${new Date(update.expiresAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                        </span>
                        {update.scope === 'followers' && (
                          <span className="text-[10px] font-bold text-primary dark:text-primary-bright ml-auto inline-flex items-center gap-1">
                            <FaBell aria-hidden /> Followers first
                          </span>
                        )}
                      </div>
                      <p className="text-[15px] text-ink-700 dark:text-ink-700-inv leading-relaxed">{update.text}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews */}
            <section id="reviews">
              <div className="flex items-baseline justify-between gap-4 mb-6">
                <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv">
                  Reviews{ratingBuckets ? ` (${ratingBuckets.count})` : ''}
                </h2>
                <button
                  onClick={() => {
                    if (!user) {
                      window.location.href = `/signin?returnTo=${encodeURIComponent(`/business/${business?.id ?? ''}`)}`;
                      return;
                    }
                    if (myReview) {
                      setComposerRating(myReview.rating);
                      setComposerText(myReview.text);
                    }
                    setShowComposer(!showComposer);
                  }}
                  className="btn-secondary btn-sm shrink-0"
                >
                  <FaPenToSquare aria-hidden /> {myReview ? 'Edit your review' : 'Write a review'}
                </button>
              </div>

              {justPosted && (
                <div className="card p-4 mb-6 bg-success-soft dark:bg-success/10 border-success/30 dark:border-success/30 flex items-center gap-3" role="status">
                  <FaCircleCheck className="text-success shrink-0" aria-hidden />
                  <p className="text-sm font-semibold text-ink-900 dark:text-ink-900-inv">
                    {verifiedVisit ? 'Thanks! Your verified-visit review is live.' : 'Thanks! Your review is live.'}
                  </p>
                </div>
              )}

              {showComposer && (
                <div className="card p-6 mb-6 border-primary/30 dark:border-primary/30">
                  <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-900-inv mb-1">
                    {myReview ? 'Update your review' : `Review ${business?.name ?? 'this business'}`}
                  </h3>
                  {verifiedVisit && (
                    <p className="text-xs font-semibold text-success mb-3 inline-flex items-center gap-1.5">
                      <FaCircleCheck aria-hidden /> Your completed booking earns this review a verified-visit badge.
                    </p>
                  )}
                  {/* Star picker */}
                  <div className="flex items-center gap-1 mb-4" role="radiogroup" aria-label="Star rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        role="radio"
                        aria-checked={composerRating === star}
                        aria-label={`${star} star${star > 1 ? 's' : ''}`}
                        onClick={() => setComposerRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-2xl leading-none transition hover:scale-110"
                      >
                        <FaStar className={(hoverRating || composerRating) >= star ? 'text-gold' : 'text-ink-300 dark:text-ink-300-inv'} aria-hidden />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={composerText}
                    onChange={(e) => setComposerText(e.target.value)}
                    rows={4}
                    placeholder="What stood out? The service, the price, the vibe…"
                    className="field resize-none mb-3"
                    aria-label="Your review"
                  />
                  {composerError && (
                    <p className="text-sm font-semibold text-danger mb-3" role="alert">{composerError}</p>
                  )}
                  <div className="flex gap-3">
                    <button onClick={submitReview} className="btn-primary btn-sm">
                      {myReview ? 'Update review' : 'Post review'}
                    </button>
                    <button
                      onClick={() => {
                        setShowComposer(false);
                        setComposerError('');
                      }}
                      className="btn-secondary btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {ratingBuckets ? (
                <div className="card p-6 mb-6 grid sm:grid-cols-[auto_1fr] gap-6 items-center">
                  <div className="text-center sm:pr-6 sm:border-r border-line-light dark:border-line-dark">
                    <div className="font-display text-5xl font-bold text-ink-900 dark:text-ink-900-inv">
                      {ratingBuckets.avg.toFixed(1)}
                    </div>
                    <Stars value={ratingBuckets.avg} className="mt-1.5 justify-center" />
                    <div className="text-xs text-muted mt-1">{ratingBuckets.count} verified visits</div>
                  </div>
                  <div className="space-y-1.5">
                    {ratingBuckets.dist.map((count, i) => {
                      const star = 5 - i;
                      const pct = ratingBuckets.count ? (count / ratingBuckets.count) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-2.5 text-xs">
                          <span className="w-8 text-ink-500 dark:text-ink-500-inv font-semibold">{star} ★</span>
                          <div className="flex-1 h-2 bg-sunken-light dark:bg-white/5 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gold rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-6 text-right text-ink-400">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}

              <div className="space-y-4">
                {reviews.length === 0 && (
                  <p className="text-muted">No reviews yet — be the first after your visit.</p>
                )}
                {reviews.map((review) => (
                  <article key={review.id} className="card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-10 h-10 rounded-full bg-primary-soft dark:bg-primary/20 text-primary dark:text-primary-bright text-xs font-bold flex items-center justify-center">
                        {review.initials}
                      </span>
                      <div className="flex-1">
                        <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm">
                          {review.author}
                          {myReview?.id === review.id && (
                            <span className="text-xs font-normal text-muted"> (you)</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-ink-400">
                          <Stars value={review.rating} />
                          <span>
                            {new Date(review.date).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                      {review.verifiedVisit ? (
                        <span className="badge-success text-[10px] shrink-0">Verified visit</span>
                      ) : (
                        <span className="badge-neutral text-[10px] shrink-0">Member review</span>
                      )}
                    </div>
                    <p className="text-ink-700 dark:text-ink-700-inv leading-relaxed">{review.text}</p>
                    {review.reply && (
                      <div className="mt-4 ml-6 pl-4 border-l-2 border-primary/30">
                        <div className="text-xs font-bold text-primary dark:text-primary-bright mb-1 inline-flex items-center gap-1.5">
                          <FaReply aria-hidden /> Reply from {business?.name}
                        </div>
                        <p className="text-sm text-ink-700 dark:text-ink-700-inv leading-relaxed">{review.reply.text}</p>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6 lg:sticky lg:top-28 self-start">
            <div className="card p-6">
              <div className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-1">
                {business.rating.toFixed(1)}
                <span className="text-base text-ink-400 dark:text-ink-400-inv font-sans font-medium"> / 5</span>
              </div>
              <Stars value={business.rating} className="mb-1" />
              <p className="text-xs text-muted mb-5">{business.reviewCount} reviews · {business.priceLevel > 1 ? '$$' : '$'} price level</p>

              <button onClick={() => openBooking()} className="btn-primary w-full mb-3">
                <FaCalendarCheck aria-hidden /> Book a service
              </button>
              {products.length > 0 && (
                <Link href={`/store/${business.slug}`} className="btn-accent w-full mb-3">
                  <FaBagShopping aria-hidden /> Shop the storefront
                </Link>
              )}
              <button
                onClick={() => social.toggleFollow(id)}
                aria-pressed={following}
                className={`w-full mb-3 ${following ? 'btn-secondary' : 'btn-primary'}`}
              >
                {following ? <FaCircleCheck aria-hidden /> : <FaBell aria-hidden />}
                {following ? `Following · ${followers.toLocaleString()}` : `Follow · ${followers.toLocaleString()}`}
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setIsFavorite(!isFavorite)} className="btn-secondary btn-sm">
                  {isFavorite ? <FaHeart className="text-danger" /> : <FaRegHeart />}
                  {isFavorite ? 'Saved' : 'Save'}
                </button>
                <button onClick={share} className="btn-secondary btn-sm">
                  <FaShareNodes /> Share
                </button>
              </div>
              {showShare && (
                <p className="text-xs text-success font-semibold mt-3 text-center" role="status">
                  Link copied to clipboard
                </p>
              )}
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-4 flex items-center gap-2">
                <FaClock className="text-primary dark:text-primary-bright" aria-hidden /> Hours
              </h3>
              <dl className="space-y-2 text-sm">
                {business.hours.map((h) => (
                  <div key={h.day} className="flex justify-between">
                    <dt className="text-ink-500 dark:text-ink-500-inv">{h.day}</dt>
                    <dd className="font-semibold text-ink-900 dark:text-ink-900-inv">
                      {h.open} – {h.close}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv mb-4">Contact</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <FaLocationDot className="text-primary dark:text-primary-bright shrink-0" aria-hidden />
                  <span className="text-ink-700 dark:text-ink-700-inv">{business.address}, {business.neighborhood}</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaPhone className="text-primary dark:text-primary-bright shrink-0" aria-hidden />
                  <a href={`tel:${business.phone}`} className="text-ink-700 dark:text-ink-700-inv hover:text-primary dark:hover:text-primary-bright">
                    {business.phone}
                  </a>
                </li>
                {business.website && (
                  <li className="flex items-center gap-3">
                    <FaGlobe className="text-primary dark:text-primary-bright shrink-0" aria-hidden />
                    <span className="text-ink-700 dark:text-ink-700-inv">{business.website}</span>
                  </li>
                )}
              </ul>
              {business.whatsapp && (
                <a
                  href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(`Hello ${business.name}, I found you on Finda and I'd like to make an enquiry.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-[#1FA855] hover:brightness-110 transition"
                >
                  <FaWhatsapp className="text-lg" aria-hidden /> Chat on WhatsApp
                </a>
              )}
            </div>

            <div className="card p-5 bg-accent-soft dark:bg-accent/10 border-accent/20 dark:border-accent/20">
              <div className="flex gap-3">
                <FaCircleInfo className="text-accent shrink-0 mt-0.5" aria-hidden />
                <p className="text-sm text-ink-700 dark:text-ink-700-inv leading-relaxed">
                  Bookings on Finda are confirmed by the business, usually within
                  an hour. You&apos;ll get a notification either way.
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Similar businesses ── */}
        {similar.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mt-16">
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-6">
              More {business.category.toLowerCase()} nearby
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((b) => (
                <BusinessCard key={b.id} business={b} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* ── Booking modal ── */}
      {showBooking && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-6"
          onClick={() => setShowBooking(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Book a service"
        >
          <div
            className="bg-white dark:bg-surface-dark w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl p-7 max-h-[92vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {booked ? (
              <div className="text-center py-8">
                <span className="w-16 h-16 rounded-full bg-success-soft text-success flex items-center justify-center mx-auto mb-5">
                  <FaCircleCheck className="text-3xl" aria-hidden />
                </span>
                <h3 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
                  Request sent!
                </h3>
                <p className="text-muted mb-2">
                  {business.name} will confirm your{' '}
                  <strong>{selectedService}</strong> shortly.
                </p>
                <p className="text-sm text-ink-400 dark:text-ink-400-inv mb-7">
                  {new Date(`${bookingDate}T00:00`).toLocaleDateString('en-US', {
                    weekday: 'long', month: 'long', day: 'numeric',
                  })}{' '}
                  at {bookingTime}
                </p>
                <div className="flex gap-3 justify-center">
                  <Link href="/bookings" className="btn-primary btn-sm">View my bookings</Link>
                  <button onClick={() => setShowBooking(false)} className="btn-secondary btn-sm">
                    Keep browsing
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv">
                      Book at {business.name}
                    </h3>
                    <p className="text-sm text-muted mt-0.5">Instant request, confirmed by the business</p>
                  </div>
                  <button
                    onClick={() => setShowBooking(false)}
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-400 hover:bg-sunken-light dark:hover:bg-white/10"
                    aria-label="Close booking dialog"
                  >
                    <FaXmark />
                  </button>
                </div>

                <form onSubmit={submitBooking} className="space-y-4">
                  <div>
                    <label htmlFor="svc" className="field-label">Service</label>
                    <select
                      id="svc"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="field"
                      required
                    >
                      {business.services.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name} — {s.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="bdate" className="field-label">Date</label>
                      <input
                        id="bdate"
                        type="date"
                        value={bookingDate}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="btime" className="field-label">Time</label>
                      <input
                        id="btime"
                        type="time"
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bnotes" className="field-label">
                      Notes <span className="font-normal text-ink-400">(optional)</span>
                    </label>
                    <textarea
                      id="bnotes"
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      rows={2}
                      placeholder="Anything the business should know?"
                      className="field resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full">
                    Request booking
                  </button>
                  <p className="text-xs text-center text-ink-400 dark:text-ink-400-inv">
                    Free to request · Cancel anytime before confirmation
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
