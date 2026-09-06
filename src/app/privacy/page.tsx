"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaShieldHalved } from 'react-icons/fa6';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-32 pb-24 px-6 max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="eyebrow mb-4">
            <FaShieldHalved className="text-sm" aria-hidden /> Privacy &amp; security
          </p>
          <h1 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-3">Privacy Policy</h1>
          <p className="text-muted">Last updated: September 2025</p>
        </div>

        <div className="card p-8 md:p-12 space-y-9 text-ink-700 dark:text-ink-700-inv leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">1. Information we collect</h2>
            <p className="mb-3">We collect information to provide better service to everyone who uses Finda. This includes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Information you give us (name, email, phone number).</li>
              <li>Information from your use of our services (device information, approximate location data).</li>
              <li>Transaction information when you book a service.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">2. How we use information</h2>
            <p>
              We use the information we collect to provide, maintain, protect, and improve Finda — and to make
              search results more relevant, like surfacing businesses near your neighborhood. We do not sell
              your personal information, and we do not use it for third-party ad targeting.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">3. Information sharing</h2>
            <p className="mb-3">We do not share personal information outside Finda except in these cases:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>With your consent.</li>
              <li>With the business you book — limited to what&apos;s needed to fulfill the booking.</li>
              <li>For legal reasons, when required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">4. Data security</h2>
            <p className="mb-3">We work hard to protect Finda and our users from unauthorized access or disclosure:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All traffic is encrypted in transit with TLS.</li>
              <li>Access to personal data is restricted to people who need it to do their jobs.</li>
              <li>We review our collection, storage, and processing practices regularly.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">5. Your controls</h2>
            <p>
              You can view and update your personal information any time in your account settings. You can
              export your data or delete your account entirely — no hoops, no dark patterns. Deleting your
              account removes your bookings, reviews, and saved places.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
