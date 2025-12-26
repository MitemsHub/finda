'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FaLocationDot, FaMoon, FaSun } from 'react-icons/fa6';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div id="header" className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/30 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
            <FaLocationDot className="text-white text-lg" />
          </div>
          <span className="text-charcoal dark:text-white text-2xl font-bold">Finda</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/search" className="text-gray-700 dark:text-gray-300 hover:text-teal font-medium transition">Explore</Link>
          <Link href="/#features" className="text-gray-700 dark:text-gray-300 hover:text-teal font-medium transition">Features</Link>
          <Link href="/#how-it-works" className="text-gray-700 dark:text-gray-300 hover:text-teal font-medium transition">How It Works</Link>
          <Link href="/for-business" className="text-gray-700 dark:text-gray-300 hover:text-teal font-medium transition">For Businesses</Link>
          <Link href="/#testimonials" className="text-gray-700 dark:text-gray-300 hover:text-teal font-medium transition">Testimonials</Link>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-lg glass-effect border border-white/30 dark:border-white/10 flex items-center justify-center hover:border-teal/40 transition"
            aria-label="Toggle theme"
          >
            {mounted && theme === 'dark' ? (
              <FaSun className="text-gray-700 dark:text-gray-300" />
            ) : (
              <FaMoon className="text-gray-700 dark:text-gray-300" />
            )}
          </button>
          <Link href="/signin" className="hidden md:block px-6 py-2.5 text-charcoal dark:text-white font-semibold hover:text-teal transition">Sign In</Link>
          <Link href="/get-started" className="px-6 py-2.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal/90 transition">Get Started</Link>
        </div>
      </div>
    </div>
  );
}
