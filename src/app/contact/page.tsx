"use client";

import React, { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaEnvelope, FaLocationDot, FaPhone, FaPaperPlane, FaCheck } from 'react-icons/fa6';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-black text-charcoal dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Have questions about Finda? We&apos;re here to help. Reach out to our team and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-lg">
                <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-6">Contact Info</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0 text-teal text-xl">
                      <FaLocationDot />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal dark:text-white mb-1">Our Office</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        123 Innovation Drive<br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo/10 flex items-center justify-center flex-shrink-0 text-indigo text-xl">
                      <FaEnvelope />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal dark:text-white mb-1">Email Us</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        support@finda.com<br />
                        partners@finda.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0 text-purple-600 text-xl">
                      <FaPhone />
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal dark:text-white mb-1">Call Us</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        +1 (555) 123-4567<br />
                        Mon-Fri, 9am-6pm PST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-teal text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">FAQ</h3>
                  <p className="mb-6 opacity-90">Find answers to common questions about using Finda.</p>
                  <button className="px-6 py-3 bg-white text-teal font-bold rounded-xl hover:bg-gray-50 transition shadow-lg w-full">
                    Visit Help Center
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-white/5 rounded-3xl p-8 lg:p-12 border border-gray-100 dark:border-white/10 shadow-lg h-full">
                {isSent ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 animate-in zoom-in">
                      <FaCheck />
                    </div>
                    <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                      Thank you for contacting us. We&apos;ve received your message and will get back to you shortly.
                    </p>
                    <button 
                      type="button"
                      onClick={() => { setIsSent(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                      className="px-8 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-8">Send us a Message</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Your Name</label>
                          <input 
                            id="name"
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Email Address</label>
                          <input 
                            id="email"
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Subject</label>
                        <input 
                          id="subject"
                          type="text" 
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 transition"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Message</label>
                        <textarea 
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal/20 transition resize-none"
                          required
                        ></textarea>
                      </div>

                      <div className="flex justify-end">
                        <button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="px-8 py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg disabled:opacity-70 flex items-center gap-2"
                        >
                          {isSubmitting ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
