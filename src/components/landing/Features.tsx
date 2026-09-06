import { FaLocationDot, FaCircleCheck, FaCalendarCheck, FaStar, FaSliders, FaBookmark } from 'react-icons/fa6';
import Reveal from '@/components/Reveal';

const FEATURES = [
  {
    icon: FaLocationDot,
    title: 'Map-first discovery',
    desc: 'Browse a live map of your area with verified pins, or filter a curated list by what matters — category, distance, rating, open now.',
    tint: 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright',
  },
  {
    icon: FaCircleCheck,
    title: 'Every listing verified',
    desc: 'Our team checks licenses, hours, and locations before a business goes live. The badge means someone actually looked.',
    tint: 'bg-accent-soft dark:bg-accent/15 text-accent dark:text-accent-bright',
  },
  {
    icon: FaCalendarCheck,
    title: 'Book in two taps',
    desc: 'Real availability, instant confirmation, and reminders — reservations, appointments, and classes without the phone tag.',
    tint: 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright',
  },
  {
    icon: FaStar,
    title: 'Reviews from real visits',
    desc: 'Reviews are tied to bookings and visits, not bots and grudges. See the good and the honest bad, side by side.',
    tint: 'bg-gold-soft dark:bg-gold/15 text-gold dark:text-gold-bright',
  },
  {
    icon: FaSliders,
    title: 'Smart filters',
    desc: 'Open now, price level, neighborhood, accessibility, and tags. Find the exact fit in seconds, not screens.',
    tint: 'bg-accent-soft dark:bg-accent/15 text-accent dark:text-accent-bright',
  },
  {
    icon: FaBookmark,
    title: 'Saved lists',
    desc: 'Keep favorite spots handy and get notified when they run offers or open up last-minute slots.',
    tint: 'bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-surface-dark border-y border-line-light dark:border-line-dark">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">Why Finda</p>
            <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-4">
              Built on trust, not on ad slots
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Most directories rank whoever pays. We rank on verification,
              proximity, and reviews from real visits — so the best local
              business actually surfaces first.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 90}>
              <div className="card card-hover p-7 h-full">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${f.tint}`}>
                  <f.icon className="text-xl" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-ink-900 dark:text-ink-900-inv mb-2 font-display">
                  {f.title}
                </h3>
                <p className="text-[15px] text-muted leading-relaxed">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
