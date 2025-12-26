import Link from 'next/link';
import { FaHouse, FaMagnifyingGlass } from 'react-icons/fa6';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal flex flex-col items-center justify-center text-center px-6 transition-colors duration-300">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-gray-200 dark:text-gray-800">404</h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl font-bold text-teal">Page Not Found</div>
        </div>
      </div>
      
      <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg mb-10">
        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          href="/"
          className="px-8 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition flex items-center gap-2 justify-center"
        >
          <FaHouse /> Back Home
        </Link>
        <Link 
          href="/search"
          className="px-8 py-3 bg-white dark:bg-white/5 text-charcoal dark:text-white border border-gray-200 dark:border-white/10 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-white/10 transition flex items-center gap-2 justify-center"
        >
          <FaMagnifyingGlass /> Search Finda
        </Link>
      </div>
    </div>
  );
}
