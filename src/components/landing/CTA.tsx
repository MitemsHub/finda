import Link from 'next/link';
import { FaUser, FaStore } from 'react-icons/fa6';
import Reveal from '@/components/Reveal';

export default function CTA() {
  return (
    <section className="py-24 bg-paper-light dark:bg-paper-dark">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal>
          <div className="card overflow-hidden relative">
            {/* accent panel */}
            <div className="absolute inset-y-0 left-0 w-1.5 bg-primary" aria-hidden />
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary-soft dark:bg-primary/10 blur-3xl" aria-hidden />

            <div className="p-10 md:p-14 relative">
              <p className="eyebrow mb-4">Join Finda</p>
              <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-4 max-w-xl">
                Your neighborhood is better than you think. Go prove it.
              </h2>
              <p className="text-lg text-muted leading-relaxed mb-9 max-w-xl">
                Free to join. Explore without an account, sign in when you find
                somewhere worth keeping.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
                <Link
                  href="/get-started"
                  className="group card card-hover p-5 !bg-primary !text-white border-transparent"
                >
                  <FaUser className="text-xl mb-3" aria-hidden />
                  <div className="font-display font-semibold text-lg">I&apos;m exploring</div>
                  <div className="text-sm text-white/70 mt-1 group-hover:text-white/90 transition">
                    Find and book local businesses →
                  </div>
                </Link>
                <Link
                  href="/get-started?type=business"
                  className="group card card-hover p-5 !bg-white dark:!bg-surface-dark"
                >
                  <FaStore className="text-xl mb-3 text-accent" aria-hidden />
                  <div className="font-display font-semibold text-lg text-ink-900 dark:text-ink-900-inv">I own a business</div>
                  <div className="text-sm text-muted mt-1">
                    List free, get verified, take bookings →
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
