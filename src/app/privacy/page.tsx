"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaShieldHalved } from 'react-icons/fa6';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full mb-6">
            <FaShieldHalved className="text-sm" />
            <span className="text-sm font-semibold">Privacy & Security</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-charcoal dark:text-white mb-6">Privacy Policy</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Last updated: October 24, 2024</p>
        </div>

        <div className="glass-effect dark:glass-dark rounded-3xl p-8 md:p-12 border border-white/40 dark:border-white/10 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed fade-in-up delay-1">
          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information to provide better services to all our users. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Information you give us (e.g., name, email, phone number).</li>
              <li>Information we get from your use of our services (e.g., device information, location data).</li>
              <li>Transaction information when you make a booking.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">2. How We Use Information</h2>
            <p>
              We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect Finda and our users. We also use this information to offer you tailored content – like giving you more relevant search results and ads.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">3. Information Sharing</h2>
            <p>
              We do not share personal information with companies, organizations and individuals outside of Finda unless one of the following circumstances applies:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>With your consent.</li>
              <li>With business partners (e.g., when you book a service).</li>
              <li>For legal reasons.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">4. Data Security</h2>
            <p>
              We work hard to protect Finda and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold. In particular:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>We encrypt many of our services using SSL.</li>
              <li>We review our information collection, storage and processing practices, including physical security measures.</li>
              <li>We restrict access to personal information to Finda employees, contractors and agents who need to know that information in order to process it for us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-4">5. Your Controls</h2>
            <p>
              You can view and update your personal information in your Finda account dashboard. You may also request the deletion of your account at any time by contacting support.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
