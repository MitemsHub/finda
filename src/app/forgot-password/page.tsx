"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaArrowLeft, FaPaperPlane, FaCircleCheck } from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Demo mode: simulate send. With Supabase this becomes
    // supabase.auth.resetPasswordForEmail(email).
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-36 pb-24 px-6">
        <div className="max-w-md mx-auto">
          <div className="card p-8 sm:p-10">
            {isSent ? (
              <div className="text-center py-4">
                <span className="w-14 h-14 rounded-full bg-success-soft text-success flex items-center justify-center mx-auto mb-5">
                  <FaCircleCheck className="text-2xl" aria-hidden />
                </span>
                <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-2">
                  Check your inbox
                </h1>
                <p className="text-muted mb-8 leading-relaxed">
                  We sent a reset link to <strong className="text-ink-900 dark:text-ink-900-inv">{email}</strong>.
                  It expires in 60 minutes.
                </p>
                <button onClick={() => setIsSent(false)} className="text-primary dark:text-primary-bright font-semibold hover:underline">
                  Use a different email
                </button>
              </div>
            ) : (
              <>
                <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-ink-900-inv mb-2">
                  Reset your password
                </h1>
                <p className="text-muted text-[15px] mb-8">
                  Enter the email you signed up with and we&apos;ll send you a
                  reset link.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="field-label">Email address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden />
                      <input
                        id="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="field !pl-11"
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={isLoading} className="btn-primary w-full">
                    {isLoading ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Sending" />
                    ) : (
                      <><FaPaperPlane aria-hidden /> Send reset link</>
                    )}
                  </button>
                </form>
              </>
            )}

            <div className="mt-8 pt-6 border-t border-line-light dark:border-line-dark">
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink-500 dark:text-ink-500-inv hover:text-ink-900 dark:hover:text-ink-900-inv transition"
              >
                <FaArrowLeft className="text-xs" aria-hidden /> Back to sign in
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
