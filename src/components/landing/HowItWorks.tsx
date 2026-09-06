import { FaMagnifyingGlass, FaCircleCheck, FaCalendarCheck } from 'react-icons/fa6';
import Reveal from '@/components/Reveal';

const STEPS = [
  {
    icon: FaMagnifyingGlass,
    title: 'Search your neighborhood',
    desc: 'Type what you need or browse the map. Every result is verified, rated, and sortable by what matters to you.',
  },
  {
    icon: FaCircleCheck,
    title: 'Check the real picture',
    desc: 'Photos, services with prices, opening hours, and reviews tied to actual visits — everything you need to decide, on one page.',
  },
  {
    icon: FaCalendarCheck,
    title: 'Book it on the spot',
    desc: 'Pick a service and time, get instant confirmation, and manage everything from your dashboard. Reminders included.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-paper-light dark:bg-paper-dark">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-4">
              From “I need a…” to booked, in minutes
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              No accounts required to explore. Sign in when you&apos;re ready to
              book, save, and review.
            </p>
          </div>
        </Reveal>

        <ol className="relative grid md:grid-cols-3 gap-10 md:gap-6">
          {/* connecting line */}
          <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-px bg-line-light dark:bg-line-dark" aria-hidden />

          {STEPS.map((step, i) => (
            <li key={step.title} className="relative">
              <Reveal delay={i * 120}>
                <div className="flex flex-col items-start">
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lift mb-6">
                    <step.icon className="text-xl" aria-hidden />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center border-2 border-paper-light dark:border-paper-dark">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-muted leading-relaxed max-w-xs">
                    {step.desc}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
