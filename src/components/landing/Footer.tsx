import { FaLocationDot, FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import Link from 'next/link';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Explore',
    links: [
      { label: 'Find businesses', href: '/search' },
      { label: 'How it works', href: '/#how-it-works' },
      { label: 'Categories', href: '/search' },
      { label: 'For business', href: '/for-business' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/about' },
      { label: 'Blog', href: '/about' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Cookie policy', href: '/privacy' },
      { label: 'Security', href: '/privacy' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 dark:bg-surface-dark text-ink-700-inv pt-16 pb-8 border-t border-line-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-12 mb-14">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5" aria-label="Finda home">
              <span className="w-9 h-9 rounded-lg bg-primary-bright flex items-center justify-center">
                <FaLocationDot className="text-ink-900 text-base" aria-hidden />
              </span>
              <span className="font-display text-[1.35rem] font-semibold tracking-tight">
                finda
              </span>
            </Link>
            <p className="text-ink-500-inv leading-relaxed max-w-sm mb-6">
              The neighborhood guide to trusted local businesses — discover,
              book, and review the places worth knowing.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF aria-hidden />, label: 'Facebook' },
                { icon: <FaXTwitter aria-hidden />, label: 'X (Twitter)' },
                { icon: <FaInstagram aria-hidden />, label: 'Instagram' },
                { icon: <FaLinkedinIn aria-hidden />, label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-primary-bright hover:text-ink-900 transition"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-sans text-sm font-bold uppercase tracking-[0.12em] text-ink-900-inv mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-ink-500-inv hover:text-primary-bright transition text-[15px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-ink-400-inv text-sm">
            © {new Date().getFullYear()} Finda. All rights reserved.
          </p>
          <p className="text-ink-400-inv text-sm">
            Made for neighborhoods, everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
