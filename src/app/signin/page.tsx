"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaShieldHalved, FaBookmark, FaCalendarCheck, FaBell, FaStar, FaUser, FaGoogle, FaApple, FaEnvelope, FaLock, FaEye } from 'react-icons/fa6';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/business/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main id="signin-main" className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
            
            <div id="signin-left-content" className="fade-in-up hidden lg:block">
              <div className="max-w-lg">
                <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full mb-6">
                  <FaShieldHalved className="text-sm" />
                  <span className="text-sm font-semibold">Secure Sign In</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-black text-charcoal dark:text-white leading-tight mb-6">
                  Welcome Back to Finda
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-10">
                  Sign in to access your personalized dashboard, manage bookings, and connect with local businesses instantly.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <FaBookmark className="text-teal text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal dark:text-white mb-1">Saved Favorites</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Access your bookmarked businesses instantly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo/10 flex items-center justify-center flex-shrink-0">
                      <FaCalendarCheck className="text-indigo text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal dark:text-white mb-1">Booking History</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">View and manage all your appointments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                      <FaBell className="text-teal text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal dark:text-white mb-1">Smart Notifications</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Get reminders and updates on your bookings</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 glass-effect dark:glass-dark rounded-2xl p-6 border border-white/40 dark:border-white/10">
                  <div className="flex items-center gap-4 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg" alt="user testimonial" className="w-14 h-14 rounded-full object-cover border-2 border-teal"/>
                    <div>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm mb-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <p className="font-semibold text-charcoal dark:text-white">Sarah Mitchell</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm italic">&quot;Finda has transformed how I discover local businesses. The booking system is incredibly smooth!&quot;</p>
                </div>
              </div>
            </div>

            <div id="signin-form-container" className="fade-in-up w-full">
              <div className="glass-effect dark:glass-dark rounded-3xl p-8 lg:p-12 border border-white/40 dark:border-white/10 shadow-2xl max-w-xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-4 shadow-xl">
                    <FaUser className="text-white text-2xl" />
                  </div>
                  <h2 className="text-3xl font-black text-charcoal dark:text-white mb-2">Sign In</h2>
                  <p className="text-gray-600 dark:text-gray-400">Enter your credentials to continue</p>
                </div>

                <div id="social-signin" className="space-y-3 mb-8">
                  <button className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-charcoal dark:text-white hover:border-teal dark:hover:border-teal transition flex items-center justify-center gap-3 shadow-sm">
                    <FaGoogle className="text-xl text-red-500" />
                    Continue with Google
                  </button>
                  <button className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-semibold text-charcoal dark:text-white hover:border-indigo dark:hover:border-indigo transition flex items-center justify-center gap-3 shadow-sm">
                    <FaApple className="text-xl dark:text-white" />
                    Continue with Apple
                  </button>
                </div>

                <div className="relative mb-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-frost dark:bg-charcoal text-gray-500 font-medium">Or continue with email</span>
                  </div>
                </div>

                <form id="signin-form" className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-semibold text-charcoal dark:text-white mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input 
                        type="email" 
                        placeholder="you@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition text-charcoal dark:text-white font-medium" 
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-charcoal dark:text-white mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition text-charcoal dark:text-white font-medium" 
                        required
                      />
                      <button 
                        type="button" 
                        aria-label="Toggle password visibility" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? (
                          <FaEye className="text-teal transition" />
                        ) : (
                          <FaEye className="text-gray-400 hover:text-teal transition" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 rounded border-2 border-gray-300 dark:border-gray-600 text-teal focus:ring-teal focus:ring-2"/>
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm font-semibold text-teal hover:text-teal/80 transition">Forgot Password?</Link>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full px-6 py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account? 
                    <Link href="/get-started" className="font-bold text-teal hover:text-teal/80 transition ml-1">Sign Up</Link>
                  </p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <FaShieldHalved className="text-teal" />
                    <span>Protected by 256-bit SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
