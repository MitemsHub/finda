"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaFileContract } from 'react-icons/fa6';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="eyebrow mb-4">
            <FaFileContract className="text-sm" aria-hidden /> Legal
          </p>
          <h1 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-3">Terms of Service</h1>
          <p className="text-muted">Last updated: September 2025</p>
        </div>

        <div className="card p-8 md:p-12 space-y-9 text-ink-700 dark:text-ink-700-inv leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">1. Acceptance of terms</h2>
            <p>
              By accessing and using Finda (&quot;the Service&quot;), you accept and agree to be bound by
              these terms. When using particular services, you are also subject to any posted guidelines
              applicable to those services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">2. Description of service</h2>
            <p>
              Finda provides a directory of local businesses with verified profiles, reviews, and direct
              booking. Finda is a platform that connects users with businesses — it is not a party to any
              transaction between users and businesses.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">3. Your account</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account and password, and for
              all activity that happens under your account. You must be at least 16 years old to use Finda.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">4. Business listings</h2>
            <p>
              Business owners are responsible for the accuracy of their listings. Finda verifies listings
              before they go live and may remove any listing that violates our policies or contains false
              information. Verification does not constitute an endorsement.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">5. Bookings &amp; cancellations</h2>
            <p>
              Bookings made through Finda are subject to each business&apos;s cancellation policy. Finda
              facilitates communication and keeps a record of every booking, but is not responsible for
              refunds or disputes arising from missed appointments.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">6. Reviews</h2>
            <p>
              Reviews must be based on genuine experiences. We remove reviews that are fake, abusive, or
              paid for. Reviews may be marked as from a &ldquo;verified visit&rdquo; when tied to a booking
              made through Finda.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">7. Changes to service</h2>
            <p>
              Finda may modify or discontinue the Service (or any part of it) with or without notice. We
              will always give reasonable notice before removing core features that you rely on.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
