"use client";

import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaShieldHalved, FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa6';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-lg mx-auto">
          <div className="glass-effect dark:glass-dark rounded-3xl p-8 lg:p-12 border border-white/40 dark:border-white/10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-4">
                <FaShieldHalved className="text-teal text-2xl" />
              </div>
              <h1 className="text-3xl font-black text-charcoal dark:text-white mb-2">Forgot Password?</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isSent 
                  ? "Check your email for instructions to reset your password." 
                  : "Enter your email address and we'll send you a link to reset your password."}
              </p>
            </div>

            {isSent ? (
              <div className="text-center">
                 <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-4 rounded-xl mb-6">
                    <p className="font-semibold">Reset link sent to {email}</p>
                 </div>
                 <button 
                    onClick={() => setIsSent(false)}
                    className="text-teal font-bold hover:underline"
                 >
                    Try another email
                 </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Reset Link
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
              <Link href="/signin" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-charcoal dark:hover:text-white transition font-semibold">
                <FaArrowLeft /> Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
