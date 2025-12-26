'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaCheck, FaCrown, FaBuilding, FaChartLine, FaStar, FaArrowRight, FaUserShield, FaArrowTrendUp, FaCalendarCheck, FaHeadset } from 'react-icons/fa6';

export default function ForBusiness() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo/10 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-teal/30 mb-8">
              <span className="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
              <span className="text-teal font-semibold text-sm">For Business Owners</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight text-charcoal dark:text-white">
              Get Discovered by <br />
              <span className="text-transparent bg-clip-text hero-gradient">Thousands</span> of Local Customers
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed max-w-lg">
              Join Finda&apos;s premium business network and connect with customers actively searching for your services. Boost visibility, manage bookings, and grow your revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-started" className="px-8 py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg shadow-teal/20 text-center">
                Get Started Now
              </Link>
              <Link href="/demo" className="px-8 py-4 glass-effect text-charcoal dark:text-white font-bold rounded-xl hover:bg-white/40 dark:hover:bg-white/10 transition border border-gray-200 dark:border-white/10 flex items-center justify-center gap-2">
                View Demo <FaArrowRight />
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-8 text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <FaCheck className="text-teal" /> <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheck className="text-teal" /> <span>14-day free trial</span>
              </div>
            </div>
          </div>

          <div className="relative fade-in-up delay-2 hidden lg:block">
            {/* Dashboard Mockup */}
            <div className="relative z-10 glass-effect dark:glass-dark rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-2xl transform rotate-y-12 rotate-x-6 hover:rotate-0 transition duration-700">
              {/* Header Mock */}
              <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 w-20 bg-gray-100 dark:bg-gray-800 rounded"></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800"></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/50 dark:bg-white/5 rounded-xl p-4">
                  <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Profile Views</div>
                  <div className="text-2xl font-bold text-charcoal dark:text-white mb-2">2,543</div>
                  <div className="h-10 w-full flex items-end gap-1">
                    {[40, 60, 45, 70, 50, 80, 65].map((h, i) => (
                      <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-teal/20 rounded-t-sm relative group">
                         <div className="absolute bottom-0 w-full bg-teal rounded-t-sm transition-all duration-500" style={{ height: '100%' }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-xl p-4">
                  <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Bookings</div>
                  <div className="text-2xl font-bold text-charcoal dark:text-white mb-2">148</div>
                  <div className="h-10 w-full flex items-end gap-1">
                     {[30, 45, 35, 60, 40, 75, 55].map((h, i) => (
                      <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-indigo/20 rounded-t-sm relative group">
                         <div className="absolute bottom-0 w-full bg-indigo rounded-t-sm transition-all duration-500" style={{ height: '100%' }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity Mock */}
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-white/40 dark:hover:bg-white/5 rounded-lg transition">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-teal text-xs">
                        <FaStar />
                      </div>
                      <div>
                        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                        <div className="h-2 w-16 bg-gray-100 dark:bg-gray-800 rounded"></div>
                      </div>
                    </div>
                    <div className="h-6 w-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-xs flex items-center justify-center">New Review</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -right-10 top-20 glass-effect p-4 rounded-2xl shadow-xl float-animation">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                  <FaStar />
                </div>
                <div>
                  <div className="font-bold text-charcoal dark:text-white">4.9/5.0</div>
                  <div className="text-xs text-gray-500">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-white/50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-charcoal dark:text-white mb-6">Why Join Finda?</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">We provide the tools you need to manage your reputation, understand your customers, and grow your business.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: FaUserShield, title: "Verified Badge", desc: "Build trust with customers using our verified business badge.", color: "text-teal" },
              { icon: FaArrowTrendUp, title: "Smart Analytics", desc: "Track profile views, clicks, and customer engagement trends.", color: "text-indigo" },
              { icon: FaCalendarCheck, title: "Direct Booking", desc: "Let customers book appointments directly from your profile.", color: "text-purple-500" },
              { icon: FaHeadset, title: "Priority Support", desc: "Get 24/7 dedicated support to help you succeed.", color: "text-pink-500" }
            ].map((feature, i) => (
              <div key={i} className="glass-effect dark:glass-dark p-8 rounded-3xl border border-white/40 dark:border-white/10 hover:shadow-xl transition duration-300 group">
                <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition duration-300 ${feature.color}`}>
                  <feature.icon className="text-3xl" />
                </div>
                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-charcoal dark:text-white mb-6">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">Choose the plan that fits your business needs. Upgrade or cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Starter Plan */}
            <div className="glass-effect dark:glass-dark rounded-3xl p-8 border border-white/40 dark:border-white/10 hover:shadow-lg transition">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <FaBuilding className="text-gray-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-2">Starter</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">For new businesses</p>
                <div className="mb-6">
                  <span className="text-5xl font-black text-charcoal dark:text-white">Free</span>
                </div>
                <button className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-charcoal dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                <Link href="/get-started">Get Started</Link>
              </button>
              </div>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-3"><FaCheck className="text-green-500" /> Basic Profile</li>
                <li className="flex items-center gap-3"><FaCheck className="text-green-500" /> 10 Photos</li>
                <li className="flex items-center gap-3"><FaCheck className="text-green-500" /> Customer Reviews</li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="glass-effect dark:glass-dark rounded-3xl p-8 border-2 border-indigo shadow-2xl premium-glow relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-indigo text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">Most Popular</div>
              </div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center mx-auto mb-4">
                  <FaCrown className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-2">Premium</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">For growing businesses</p>
                <div className="mb-6">
                  <span className="text-5xl font-black text-charcoal dark:text-white">$49</span>
                  <span className="text-gray-600 dark:text-gray-400">/month</span>
                </div>
                <button className="w-full px-6 py-3 bg-indigo text-white font-bold rounded-xl hover:bg-indigo/90 transition shadow-lg">Start Premium Trial</button>
              </div>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-3"><FaCheck className="text-teal" /> <strong>Verified Badge</strong></li>
                <li className="flex items-center gap-3"><FaCheck className="text-teal" /> Unlimited Photos</li>
                <li className="flex items-center gap-3"><FaCheck className="text-teal" /> Priority Search Ranking</li>
                <li className="flex items-center gap-3"><FaCheck className="text-teal" /> Advanced Analytics</li>
                <li className="flex items-center gap-3"><FaCheck className="text-teal" /> 24/7 Support</li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-effect dark:glass-dark rounded-3xl p-8 border border-white/40 dark:border-white/10 hover:shadow-lg transition">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <FaChartLine className="text-gray-500 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-2">Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">For large chains</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-charcoal dark:text-white">Custom</span>
                </div>
                <button className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-charcoal dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                  <Link href="/get-started">Contact Sales</Link>
                </button>
              </div>
              <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-3"><FaCheck className="text-green-500" /> Multiple Locations</li>
                <li className="flex items-center gap-3"><FaCheck className="text-green-500" /> Dedicated Account Manager</li>
                <li className="flex items-center gap-3"><FaCheck className="text-green-500" /> API Access</li>
                <li className="flex items-center gap-3"><FaCheck className="text-green-500" /> Custom Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-6 bg-white/50 dark:bg-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-charcoal dark:text-white mb-16 text-center">Success Stories</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-effect dark:glass-dark p-8 rounded-3xl border border-white/40 dark:border-white/10">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map((i) => <FaStar key={i} />)}
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">&quot;Since joining Finda, our weekly bookings have increased by 40%. The analytics dashboard helps us understand exactly what our customers want.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <div className="font-bold text-charcoal dark:text-white">Sarah Jenkins</div>
                  <div className="text-sm text-gray-500">Owner, The Coffee House</div>
                </div>
              </div>
            </div>

            <div className="glass-effect dark:glass-dark p-8 rounded-3xl border border-white/40 dark:border-white/10">
              <div className="flex gap-1 text-yellow-400 mb-4">
                {[1, 2, 3, 4, 5].map((i) => <FaStar key={i} />)}
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">&quot;The verified badge instantly gave us more credibility. We&apos;ve seen a significant uptick in new customers finding us through the search.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                <div>
                  <div className="font-bold text-charcoal dark:text-white">Mike Ross</div>
                  <div className="text-sm text-gray-500">Manager, TechFix Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal/10 to-indigo/10 z-0"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-charcoal dark:text-white mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">Join thousands of businesses already succeeding on Finda.</p>
          <Link href="/get-started" className="inline-block px-10 py-5 bg-charcoal dark:bg-white text-white dark:text-charcoal font-bold rounded-xl hover:scale-105 transition duration-300 shadow-2xl">
            Create Your Business Profile
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
