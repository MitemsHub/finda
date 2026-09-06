import { FaStore, FaCheck, FaChartLine, FaCalendarDays, FaStar } from 'react-icons/fa6';
import Reveal from '@/components/Reveal';
import Link from 'next/link';

const BENEFITS = [
  {
    icon: FaChartLine,
    title: 'Get discovered locally',
    desc: 'Show up for searches that matter — your category, your neighborhood — with a verified badge that earns clicks.',
  },
  {
    icon: FaCalendarDays,
    title: 'Fill your calendar',
    desc: 'Take bookings around the clock. Confirm, reschedule, and message customers from one clean dashboard.',
  },
  {
    icon: FaStar,
    title: 'Build your reputation',
    desc: 'Collect reviews from real visits and reply publicly. Your rating works for you even when you sleep.',
  },
];

export default function BusinessSection() {
  return (
    <section id="for-business" className="py-24 bg-ink-900 relative overflow-hidden">
      {/* subtle texture washes */}
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-primary-bright rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-bright rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div>
              <p className="text-accent-bright text-sm font-bold uppercase tracking-[0.14em] mb-4 flex items-center gap-2">
                <FaStore className="text-base" aria-hidden /> For business owners
              </p>
              <h2 className="text-display-lg font-bold text-ink-900-inv mb-5">
                Your regulars found you once.
                <br />
                <span className="italic text-primary-bright">Let Finda find you the rest.</span>
              </h2>
              <p className="text-lg text-ink-500-inv leading-relaxed mb-8 max-w-lg">
                List your business free, get verified, and start taking bookings
                from customers actively looking for what you do.
              </p>

              <ul className="space-y-5 mb-9">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex gap-4">
                    <span className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-primary-bright flex items-center justify-center shrink-0">
                      <b.icon aria-hidden />
                    </span>
                    <div>
                      <div className="font-semibold text-ink-900-inv mb-0.5">{b.title}</div>
                      <div className="text-sm text-ink-400-inv leading-relaxed max-w-md">{b.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Link href="/get-started?type=business" className="btn-accent">
                  List your business — free
                </Link>
                <Link
                  href="/for-business"
                  className="btn text-white/90 border border-white/20 hover:border-white/40 hover:text-white"
                >
                  See pricing
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Dashboard preview */}
          <Reveal delay={150}>
            <div className="relative" aria-hidden>
              <div className="card !bg-white p-6 shadow-2xl rotate-1 hover:rotate-0 transition duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center font-display font-bold">
                      R
                    </span>
                    <div>
                      <div className="font-semibold text-ink-900 text-sm">The Rustic Spoon</div>
                      <div className="text-xs text-success font-medium flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-dot" />
                        Open now · Verified
                      </div>
                    </div>
                  </div>
                  <span className="badge-gold">Premium</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Profile views', value: '2,847', delta: '+12%' },
                    { label: 'Bookings', value: '142', delta: '+8%' },
                    { label: 'Rating', value: '4.8', delta: '+0.1' },
                  ].map((s) => (
                    <div key={s.label} className="bg-sunken-light rounded-xl p-3.5">
                      <div className="text-[11px] font-semibold text-ink-500 mb-1">{s.label}</div>
                      <div className="font-display text-xl font-bold text-ink-900">{s.value}</div>
                      <div className="text-[11px] font-bold text-success mt-0.5">{s.delta}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5">
                  {[
                    { name: 'Sarah Johnson', action: 'booked Dinner Reservation', time: '2m' },
                    { name: 'Mike Chen', action: 'requested Chef’s Counter', time: '18m' },
                    { name: 'Emily Davis', action: 'left a 5★ review', time: '1h' },
                  ].map((row) => (
                    <div key={row.name} className="flex items-center justify-between px-3.5 py-3 bg-white border border-line-light rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-primary-soft text-primary text-[10px] font-bold flex items-center justify-center">
                          {row.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                        <div className="text-sm">
                          <span className="font-semibold text-ink-900">{row.name}</span>{' '}
                          <span className="text-ink-500">{row.action}</span>
                        </div>
                      </div>
                      <span className="text-xs text-ink-300">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* floating notification */}
              <div className="absolute -bottom-5 -left-5 card px-4 py-3 shadow-card-hover -rotate-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full bg-success-soft text-success flex items-center justify-center">
                    <FaCheck className="text-xs" />
                  </span>
                  <div className="text-sm">
                    <span className="font-bold text-ink-900">New booking</span>
                    <span className="text-ink-500"> · Saturday 7 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
