"use client";

import Link from 'next/link';
import { FaCheck, FaBuilding, FaChartLine, FaStar, FaArrowRight, FaUserShield, FaArrowTrendUp, FaCalendarCheck, FaHeadset, FaCrown } from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Reveal from '@/components/Reveal';

const BENEFITS = [
  { icon: FaUserShield, title: 'Verified badge', desc: 'Pass our verification checklist and earn the badge customers look for before they book.' },
  { icon: FaArrowTrendUp, title: 'Smart analytics', desc: 'Track profile views, booking conversion, and what services are trending in your neighborhood.' },
  { icon: FaCalendarCheck, title: 'Direct booking', desc: 'Take bookings around the clock and manage them from a dashboard built for busy owners.' },
  { icon: FaHeadset, title: 'Priority support', desc: 'Real humans on chat and email, with same-day responses for verified businesses.' },
];

const PLANS = [
  {
    name: 'Starter',
    tagline: 'For new businesses',
    price: 'Free',
    period: '',
    icon: FaBuilding,
    cta: 'List for free',
    href: '/get-started?type=business',
    featured: false,
    features: [
      'Public business profile',
      'Up to 10 photos',
      'Customer reviews & replies',
      'Basic booking requests',
    ],
  },
  {
    name: 'Premium',
    tagline: 'For growing businesses',
    price: '₦25,000',
    period: '/month',
    icon: FaCrown,
    cta: 'Start 14-day trial',
    href: '/get-started?type=business',
    featured: true,
    features: [
      'Verified badge eligibility',
      'Unlimited photos & gallery',
      'Priority placement in search',
      'Advanced analytics',
      'Offer announcements to fans',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    tagline: 'For chains & franchises',
    price: 'Custom',
    period: '',
    icon: FaChartLine,
    cta: 'Talk to us',
    href: '/contact',
    featured: false,
    features: [
      'Multiple locations, one dashboard',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
    ],
  },
];

const STORIES = [
  {
    quote: 'Since joining Finda, our weekly bookings are up 40%. The analytics dashboard shows exactly which services are pulling people in.',
    name: 'Sarah Jenkins',
    role: 'Owner, The Coffee House',
    initials: 'SJ',
  },
  {
    quote: 'The verified badge changed how strangers see us. People who find us through Finda arrive already trusting the shop.',
    name: 'Mike Ross',
    role: 'Manager, TechFix Solutions',
    initials: 'MR',
  },
];

export default function ForBusiness() {
  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main>
        {/* ── Hero ── */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full bg-primary-soft dark:bg-primary/10 blur-3xl opacity-70" />
            <div className="absolute bottom-0 -left-32 w-[380px] h-[380px] rounded-full bg-accent-soft dark:bg-accent/10 blur-3xl opacity-60" />
          </div>

          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center relative">
            <Reveal>
              <div>
                <div className="badge-primary mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-bright animate-pulse-dot" aria-hidden />
                  For business owners
                </div>
                <h1 className="text-display-xl font-bold text-ink-900 dark:text-ink-900-inv leading-[1.06] mb-6">
                  Get discovered by neighbors who are{' '}
                  <span className="italic text-primary dark:text-primary-bright">ready to book</span>.
                </h1>
                <p className="text-lg text-muted leading-relaxed mb-9 max-w-lg">
                  Join Finda&apos;s verified network. Your profile, your services,
                  your prices — in front of customers actively searching for
                  what you do.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/get-started?type=business" className="btn-primary">
                    List your business — free <FaArrowRight className="text-sm" aria-hidden />
                  </Link>
                  <Link href="#pricing" className="btn-secondary">See pricing</Link>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500 dark:text-ink-500-inv">
                  <span className="flex items-center gap-2">
                    <FaCheck className="text-primary dark:text-primary-bright" aria-hidden /> Free to list
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCheck className="text-primary dark:text-primary-bright" aria-hidden /> No card required
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCheck className="text-primary dark:text-primary-bright" aria-hidden /> Cancel anytime
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCheck className="text-primary dark:text-primary-bright" aria-hidden /> Pay in Naira via Flutterwave
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Dashboard preview */}
            <Reveal delay={150}>
              <div className="relative hidden lg:block" aria-hidden>
                <div className="card p-6 rotate-1 hover:rotate-0 transition duration-500">
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-sunken-light dark:bg-white/5 rounded-xl p-4">
                      <div className="text-ink-500 dark:text-ink-500-inv text-xs font-semibold mb-1">Profile views</div>
                      <div className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv">2,543</div>
                      <div className="flex items-end gap-1 h-10 mt-3" >
                        {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                          <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-primary/25 dark:bg-primary/40 rounded-t-sm" />
                        ))}
                      </div>
                    </div>
                    <div className="bg-sunken-light dark:bg-white/5 rounded-xl p-4">
                      <div className="text-ink-500 dark:text-ink-500-inv text-xs font-semibold mb-1">Bookings</div>
                      <div className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv">148</div>
                      <div className="flex items-end gap-1 h-10 mt-3">
                        {[30, 45, 35, 60, 40, 75, 55].map((h, i) => (
                          <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-accent/25 dark:bg-accent/40 rounded-t-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {['New booking · Dinner for 2', 'New review · ★★★★★', 'New follower · Sarah J.'].map((row, i) => (
                      <div key={row} className="flex items-center gap-3 p-3 border border-line-light dark:border-line-dark rounded-xl">
                        <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-bright" />
                        <span className="text-sm text-ink-700 dark:text-ink-700-inv">{row}</span>
                        <span className="ml-auto text-xs text-ink-300">{['now', '1h', '2h'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute -right-6 top-16 card px-4 py-3 float-animation">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-gold-soft dark:bg-gold/20 text-gold flex items-center justify-center">
                      <FaStar aria-hidden />
                    </span>
                    <div>
                      <div className="font-bold text-ink-900 dark:text-ink-900-inv text-sm">4.9 / 5.0</div>
                      <div className="text-[11px] text-ink-400">Average rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-24 bg-white dark:bg-surface-dark border-y border-line-light dark:border-line-dark">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="max-w-2xl mb-14">
                <p className="eyebrow mb-4">Why Finda works</p>
                <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-4">
                  Tools that fill your calendar, not just your inbox
                </h2>
                <p className="text-lg text-muted leading-relaxed">
                  Everything is built around one loop: get found, earn trust,
                  take bookings, get reviewed.
                </p>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((f, i) => (
                <Reveal key={f.title} delay={i * 90}>
                  <div className="card card-hover p-7 h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright flex items-center justify-center mb-5">
                      <f.icon className="text-xl" aria-hidden />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-ink-900 dark:text-ink-900-inv mb-2">{f.title}</h3>
                    <p className="text-[15px] text-muted leading-relaxed">{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <p className="eyebrow mb-4 justify-center">Pricing</p>
                <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-4">
                  Start free. Upgrade when it pays for itself.
                </h2>
                <p className="text-lg text-muted leading-relaxed">
                  No commissions on bookings. No lock-in. One flat monthly rate in Naira, paid via card or transfer.
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              {PLANS.map((plan, i) => (
                <Reveal key={plan.name} delay={i * 100}>
                  <div className={`card p-8 h-full flex flex-col relative ${plan.featured ? '!border-primary ring-2 ring-primary/20 shadow-card-hover' : ''}`}>
                    {plan.featured && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lift whitespace-nowrap">
                        Most popular
                      </span>
                    )}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${plan.featured ? 'bg-primary text-white' : 'bg-sunken-light dark:bg-white/5 text-ink-700 dark:text-ink-700-inv'}`}>
                      <plan.icon className="text-xl" aria-hidden />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv">{plan.name}</h3>
                    <p className="text-sm text-muted mb-5">{plan.tagline}</p>
                    <div className="mb-6">
                      <span className="font-display text-4xl font-bold text-ink-900 dark:text-ink-900-inv">{plan.price}</span>
                      {plan.period && <span className="text-muted">{plan.period}</span>}
                    </div>
                    <Link
                      href={plan.href}
                      className={`w-full mb-7 ${plan.featured ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      {plan.cta}
                    </Link>
                    <ul className="space-y-3 text-[15px] flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-ink-700 dark:text-ink-700-inv">
                          <FaCheck className="text-primary dark:text-primary-bright mt-1 text-xs shrink-0" aria-hidden />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stories ── */}
        <section className="py-24 bg-white dark:bg-surface-dark border-y border-line-light dark:border-line-dark">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal>
              <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-12 text-center">
                Owners who made the switch
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {STORIES.map((s, i) => (
                <Reveal key={s.name} delay={i * 100}>
                  <figure className="card p-8 h-full flex flex-col">
                    <div className="flex gap-1 mb-4" aria-label="5 stars">
                      {[1, 2, 3, 4, 5].map((n) => <FaStar key={n} className="text-gold" aria-hidden />)}
                    </div>
                    <blockquote className="text-ink-700 dark:text-ink-700-inv leading-relaxed flex-1">
                      &ldquo;{s.quote}&rdquo;
                    </blockquote>
                    <figcaption className="flex items-center gap-3 mt-6">
                      <span className="w-11 h-11 rounded-full bg-accent-soft dark:bg-accent/20 text-accent dark:text-accent-bright text-xs font-bold flex items-center justify-center">
                        {s.initials}
                      </span>
                      <div>
                        <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm">{s.name}</div>
                        <div className="text-xs text-muted">{s.role}</div>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-4">
                Ready to grow your business?
              </h2>
              <p className="text-lg text-muted mb-9 max-w-xl mx-auto">
                Listing takes ten minutes. Verification usually takes one to two
                days. Your first booking could come this week.
              </p>
              <Link href="/get-started?type=business" className="btn-primary !px-10 !py-4 text-lg">
                Create your business profile <FaArrowRight aria-hidden />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
