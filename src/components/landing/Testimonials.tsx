import { FaStar } from 'react-icons/fa6';
import Reveal from '@/components/Reveal';

const TESTIMONIALS = [
  {
    text: 'The party jollof at Nkwo Kitchen tastes like a proper owambe. Finda’s verified reviews pointed us there — we’ve been regulars since.',
    name: 'Chiamaka Obi',
    role: 'Found Nkwo Kitchen, Yaba',
    initials: 'CO',
    tint: 'bg-primary-soft dark:bg-primary/20 text-primary dark:text-primary-bright',
  },
  {
    text: 'Asked the book concierge desk for Nigerian sci-fi and something atmospheric, and walked out with three perfect picks. This app knows Lagos.',
    name: 'Aisha Musa',
    role: 'Found Bookshelf Corner',
    initials: 'AM',
    tint: 'bg-accent-soft dark:bg-accent/20 text-accent dark:text-accent-bright',
  },
  {
    text: 'First dentist that explains costs before touching anything, and they accept my HMO. Same-week booking through Finda was real, not marketing.',
    name: 'Ifeoma Kalu',
    role: 'Found Bright Smile Dental, Gbagada',
    initials: 'IK',
    tint: 'bg-gold-soft dark:bg-gold/20 text-gold dark:text-gold-bright',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-surface-dark border-y border-line-light dark:border-line-dark">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-4 justify-center">Word of mouth</p>
            <h2 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-4">
              Reviews from people who actually went
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Every review on Finda is tied to a real visit. No bots, no
              revenge rants — just neighbors sharing what’s good.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <figure className="card card-hover p-7 h-full flex flex-col">
                <div className="flex gap-1 mb-4" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, j) => (
                    <FaStar key={j} className="text-gold text-sm" aria-hidden />
                  ))}
                </div>
                <blockquote className="text-ink-700 dark:text-ink-700-inv leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 mt-6 pt-6 border-t border-line-light dark:border-line-dark">
                  <span className={`w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold ${t.tint}`}>
                    {t.initials}
                  </span>
                  <div>
                    <div className="font-semibold text-ink-900 dark:text-ink-900-inv text-sm">{t.name}</div>
                    <div className="text-xs text-ink-400 dark:text-ink-400-inv">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
