"use client";

import Image from 'next/image';
import Link from 'next/link';
import { FaUsers, FaHandshake, FaLightbulb, FaArrowRight } from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Reveal from '@/components/Reveal';

const STATS = [
  { label: 'Active users', value: '50K+' },
  { label: 'Verified businesses', value: '10K+' },
  { label: 'Neighborhoods', value: '15+' },
  { label: 'Bookings made', value: '120K+' },
];

const VALUES = [
  {
    icon: FaUsers,
    title: 'Community first',
    desc: 'We build for people, not for ad clicks. Every product decision starts with the question: does this make the neighborhood better?',
  },
  {
    icon: FaHandshake,
    title: 'Trust is the product',
    desc: 'We verify every business, tie reviews to real visits, and never sell placement. If we lose trust, we lose everything.',
  },
  {
    icon: FaLightbulb,
    title: 'Small teams, real craft',
    desc: 'We ship carefully and listen obsessively. Half our roadmap comes from messages that started with “wouldn’t it be cool if…”.',
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main>
        {/* Hero */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <div>
                <p className="eyebrow mb-4">Our mission</p>
                <h1 className="text-display-xl font-bold text-ink-900 dark:text-ink-900-inv leading-[1.08] mb-6">
                  The neighborhood is the{' '}
                  <span className="italic text-primary dark:text-primary-bright">original feed</span>.
                </h1>
                <p className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
                  Finda exists because the best recommendations were never
                  algorithms — they were the person at the counter who knew
                  every shop on the block. We&apos;re rebuilding that at scale:
                  verified businesses, honest reviews, and booking without the
                  phone tag.
                </p>
                <Link href="/search" className="btn-primary">
                  Explore the platform <FaArrowRight className="text-sm" aria-hidden />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-card-hover aspect-[4/3]">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                    alt="Neighbors and shop owners connecting at a local market"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 card px-5 py-4">
                  <div className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv">2024</div>
                  <div className="text-xs text-muted">Founded in a corner café</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Stats band */}
        <section className="py-14 bg-ink-900">
          <div className="max-w-7xl mx-auto px-6">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd className="font-display text-4xl font-bold text-primary-bright">{s.value}</dd>
                  <dt className="text-sm text-ink-400-inv mt-1">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 px-6 bg-white dark:bg-surface-dark border-y border-line-light dark:border-line-dark">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <div className="max-w-2xl mb-14">
                <p className="eyebrow mb-4">What we believe</p>
                <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv">
                  Three values, no compromise
                </h2>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 100}>
                  <div className="card card-hover p-8 h-full">
                    <div className="w-12 h-12 rounded-xl bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright flex items-center justify-center mb-5">
                      <v.icon className="text-xl" aria-hidden />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-3">{v.title}</h3>
                    <p className="text-[15px] text-muted leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-4">
                Come build the neighborhood guide with us
              </h2>
              <p className="text-lg text-muted mb-9">
                Whether you&apos;re searching or listing, there&apos;s a place
                for you on Finda.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/get-started" className="btn-primary">Join Finda</Link>
                <Link href="/for-business" className="btn-secondary">For business</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
