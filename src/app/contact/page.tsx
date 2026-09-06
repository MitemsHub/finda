"use client";

import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaPaperPlane, FaCircleCheck, FaClock } from 'react-icons/fa6';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';

const CHANNELS = [
  {
    icon: FaEnvelope,
    title: 'Email us',
    detail: 'hello@finda.ng',
    sub: 'We reply within one business day',
  },
  {
    icon: FaPhone,
    title: 'Call or WhatsApp',
    detail: '+234 810 555 0134',
    sub: 'Mon–Sat, 8 AM – 7 PM WAT',
  },
  {
    icon: FaClock,
    title: 'Support hours',
    detail: '7 days a week',
    sub: 'Business owners get priority routing',
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', topic: 'General', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Demo mode: with Supabase + email service this creates a support ticket.
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-paper-light dark:bg-paper-dark">
      <Header />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="eyebrow mb-4">Contact</p>
            <h1 className="text-display-lg font-bold text-ink-900 dark:text-ink-900-inv mb-4">
              Talk to a real person
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Questions about your account, a business listing, or the platform?
              We&apos;re a small team that actually reads every message.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10">
            {/* Form */}
            <div className="card p-8">
              {isSent ? (
                <div className="text-center py-12">
                  <span className="w-16 h-16 rounded-full bg-success-soft dark:bg-success/15 text-success flex items-center justify-center mx-auto mb-5">
                    <FaCircleCheck className="text-2xl" aria-hidden />
                  </span>
                  <h2 className="font-display text-2xl font-semibold text-ink-900 dark:text-ink-900-inv mb-2">
                    Message sent
                  </h2>
                  <p className="text-muted mb-8 max-w-sm mx-auto">
                    Thanks, {form.name.split(' ')[0] || 'friend'} — we&apos;ll
                    get back to you at <strong>{form.email}</strong> within one
                    business day.
                  </p>
                  <button
                    onClick={() => {
                      setIsSent(false);
                      setForm({ name: '', email: '', topic: 'General', message: '' });
                    }}
                    className="btn-secondary btn-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="field-label">Your name</label>
                      <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Maya O." className="field" />
                    </div>
                    <div>
                      <label htmlFor="cemail" className="field-label">Email</label>
                      <input id="cemail" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="you@example.com" className="field" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="topic" className="field-label">Topic</label>
                    <select id="topic" name="topic" value={form.topic} onChange={handleChange} className="field">
                      <option>General question</option>
                      <option>My business listing</option>
                      <option>Report a problem</option>
                      <option>Press & partnerships</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="field-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="field resize-none"
                    />
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-label="Sending" />
                    ) : (
                      <><FaPaperPlane aria-hidden /> Send message</>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Channels */}
            <div className="space-y-4">
              {CHANNELS.map((c) => (
                <div key={c.title} className="card p-6 flex gap-4">
                  <span className="w-11 h-11 rounded-xl bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright flex items-center justify-center shrink-0">
                    <c.icon aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv text-[15px]">{c.title}</h3>
                    <p className="text-ink-700 dark:text-ink-700-inv font-medium text-sm">{c.detail}</p>
                    <p className="text-xs text-muted mt-0.5">{c.sub}</p>
                  </div>
                </div>
              ))}

              <div className="card p-6 bg-primary-soft dark:bg-primary/10 border-primary/20 dark:border-primary/20">
                <h3 className="font-semibold text-primary dark:text-primary-bright text-[15px] mb-1.5">Business owner?</h3>
                <p className="text-sm text-ink-700 dark:text-ink-700-inv leading-relaxed">
                  Check the <a href="/for-business" className="font-semibold underline">For Business</a> page first —
                  most listing questions are answered there.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
