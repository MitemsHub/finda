"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaFileContract } from 'react-icons/fa6';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-indigo/10 text-indigo px-4 py-2 rounded-full mb-6">
            <FaFileContract className="text-sm" />
            <span className="text-sm font-semibold">Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-charcoal dark:text-white mb-6">Terms of Service</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Last updated: October 24, 2024</p>
        </div>

        <div className="glass-effect dark:glass-dark rounded-3xl p-8 md:p-12 border border-white/40 dark:border-white/10 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed fade-in-up delay-1">
          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Finda (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">2. Description of Service</h2>
            <p>
              Finda provides users with access to a rich collection of resources, including various communications tools, search services, and personalized content through its network of properties. You understand and agree that the Service may include advertisements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">3. User Account</h2>
            <p>
              If you use this site, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your account or password.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">4. Business Listings</h2>
            <p>
              Business owners are responsible for the accuracy of their listings. Finda reserves the right to remove any listing that violates our policies or contains false information. We do not endorse any specific business listed on our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">5. Booking and Cancellations</h2>
            <p>
              Bookings made through Finda are subject to the specific cancellation policies of the respective business. Finda is not responsible for refunds or disputes arising from missed appointments, though we will facilitate communication where possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">6. Modifications to Service</h2>
            <p>
              Finda reserves the right at any time and from time to time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice. You agree that Finda shall not be liable to you or to any third party for any modification, suspension or discontinuance of the Service.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
