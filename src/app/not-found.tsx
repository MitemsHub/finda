import Link from 'next/link';
import { FaHouse, FaMagnifyingGlass } from 'react-icons/fa6';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark flex flex-col items-center justify-center text-center px-6">
      <div className="relative mb-8">
        <h1 className="font-display text-9xl font-bold text-sunken-light dark:text-white/5 select-none">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display text-2xl font-semibold text-primary dark:text-primary-bright">Page not found</div>
        </div>
      </div>

      <p className="text-lg text-muted max-w-md mb-10 leading-relaxed">
        This page seems to have moved, closed down, or never existed. The
        neighborhood is still here though.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-primary">
          <FaHouse aria-hidden /> Back home
        </Link>
        <Link href="/search" className="btn-secondary">
          <FaMagnifyingGlass aria-hidden /> Explore businesses
        </Link>
      </div>
    </div>
  );
}
