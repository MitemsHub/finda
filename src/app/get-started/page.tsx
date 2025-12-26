"use client";

import { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaRocket, FaUser, FaCircleCheck, FaStore, FaUserPlus, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaGoogle, FaApple, FaFacebook, FaEnvelopeOpen, FaUserGear, FaStar, FaBriefcase, FaList } from 'react-icons/fa6';
import Link from 'next/link';

export default function GetStarted() {
  const [accountType, setAccountType] = useState<'user' | 'business'>('user');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length > 5) strength += 20;
    if (pass.length > 7) strength += 20;
    if (/[A-Z]/.test(pass)) strength += 20;
    if (/[0-9]/.test(pass)) strength += 20;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 20;
    return strength;
  };

  const strength = getPasswordStrength(password);

  const getStrengthColor = (strength: number) => {
    if (strength <= 20) return 'bg-red-500';
    if (strength <= 40) return 'bg-orange-500';
    if (strength <= 60) return 'bg-yellow-500';
    if (strength <= 80) return 'bg-green-500';
    return 'bg-teal';
  };

  const getStrengthLabel = (strength: number) => {
    if (strength === 0) return 'Weak';
    if (strength <= 20) return 'Very Weak';
    if (strength <= 40) return 'Weak';
    if (strength <= 60) return 'Medium';
    if (strength <= 80) return 'Strong';
    return 'Very Strong';
  };

  const scrollToForm = (type: 'user' | 'business') => {
    setAccountType(type);
    const element = document.getElementById('signup-form-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <section id="hero-section" className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-teal/10 via-white dark:via-charcoal to-indigo/10">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-teal rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto fade-in-up">
            <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full mb-6">
              <FaRocket className="text-sm" />
              <span className="text-sm font-semibold">Quick Setup</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-charcoal dark:text-white leading-tight mb-6">
              Get Started with Finda
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Choose your path and start discovering or listing businesses in minutes
            </p>
          </div>
        </div>
      </section>

      <section id="user-type-selection" className="py-20 bg-white dark:bg-charcoal">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-black text-charcoal dark:text-white mb-4">I Want To...</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Select your account type to get started</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div id="user-card" 
              onClick={() => scrollToForm('user')}
              className={`glass-effect dark:glass-dark rounded-3xl p-10 border-2 transition duration-300 transform hover:-translate-y-1 cursor-pointer fade-in-up delay-1 ${accountType === 'user' ? 'border-teal ring-2 ring-teal/20' : 'border-white/40 dark:border-white/10 hover:border-teal'}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl hero-gradient flex items-center justify-center shadow-xl">
                  <FaUser className="text-white text-2xl" />
                </div>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${accountType === 'user' ? 'border-teal' : 'border-gray-300 dark:border-gray-600'}`}>
                  <div className={`w-5 h-5 rounded-full bg-teal transition-transform ${accountType === 'user' ? 'scale-100' : 'scale-0'}`}></div>
                </div>
              </div>
              <h3 className="text-3xl font-black text-charcoal dark:text-white mb-4">Discover Businesses</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">Find and connect with verified local businesses, book services, and manage everything in one place.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCircleCheck className="text-teal" />
                  <span>Browse thousands of businesses</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCircleCheck className="text-teal" />
                  <span>Book appointments instantly</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCircleCheck className="text-teal" />
                  <span>Read verified reviews</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCircleCheck className="text-teal" />
                  <span>Save your favorites</span>
                </li>
              </ul>
              <button className="w-full px-8 py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg">
                Continue as User
              </button>
            </div>

            <div id="business-card" 
              onClick={() => scrollToForm('business')}
              className={`glass-effect dark:glass-dark rounded-3xl p-10 border-2 transition duration-300 transform hover:-translate-y-1 cursor-pointer fade-in-up delay-2 ${accountType === 'business' ? 'border-indigo ring-2 ring-indigo/20' : 'border-white/40 dark:border-white/10 hover:border-indigo'}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo to-purple-600 flex items-center justify-center shadow-xl">
                  <FaStore className="text-white text-2xl" />
                </div>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${accountType === 'business' ? 'border-indigo' : 'border-gray-300 dark:border-gray-600'}`}>
                  <div className={`w-5 h-5 rounded-full bg-indigo transition-transform ${accountType === 'business' ? 'scale-100' : 'scale-0'}`}></div>
                </div>
              </div>
              <h3 className="text-3xl font-black text-charcoal dark:text-white mb-4">List My Business</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">Grow your customer base, manage bookings, and showcase your business to thousands of potential customers.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCircleCheck className="text-indigo" />
                  <span>Get verified badge</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCircleCheck className="text-indigo" />
                  <span>Receive instant bookings</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCircleCheck className="text-indigo" />
                  <span>Access analytics dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <FaCircleCheck className="text-indigo" />
                  <span>Engage with customers</span>
                </li>
              </ul>
              <button type="button" className="w-full px-8 py-4 bg-indigo text-white font-bold rounded-xl hover:bg-indigo/90 transition shadow-lg">
                List Your Business
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="signup-form-section" className="py-20 bg-gradient-to-br from-teal/5 to-indigo/5 dark:from-teal/10 dark:to-indigo/10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-effect dark:glass-dark rounded-3xl p-8 lg:p-12 border border-white/40 dark:border-white/10 shadow-2xl fade-in-up">
            <div className="text-center mb-10">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl transition-colors duration-300 ${accountType === 'user' ? 'hero-gradient' : 'bg-gradient-to-br from-indigo to-purple-600'}`}>
                {accountType === 'user' ? <FaUserPlus className="text-white text-3xl" /> : <FaStore className="text-white text-3xl" />}
              </div>
              <h2 className="text-4xl font-black text-charcoal dark:text-white mb-3">
                {accountType === 'user' ? 'Create User Account' : 'Create Business Account'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {accountType === 'user' ? 'Join thousands of users discovering local businesses' : 'List your business and reach more customers'}
              </p>
            </div>

            <form className="space-y-6">
              {accountType === 'user' ? (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-charcoal dark:text-white mb-2">First Name</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaUser />
                      </div>
                      <input id="firstName" type="text" className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition text-charcoal dark:text-white font-medium" placeholder="John" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-charcoal dark:text-white mb-2">Last Name</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaUser />
                      </div>
                      <input id="lastName" type="text" className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition text-charcoal dark:text-white font-medium" placeholder="Doe" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-semibold text-charcoal dark:text-white mb-2">Business Name</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaBriefcase />
                      </div>
                      <input id="businessName" type="text" className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10 transition text-charcoal dark:text-white font-medium" placeholder="My Awesome Business" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-charcoal dark:text-white mb-2">Category</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaList />
                      </div>
                      <select id="category" className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-indigo focus:ring-2 focus:ring-indigo/10 transition text-charcoal dark:text-white font-medium appearance-none">
                        <option value="">Select a category</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="retail">Retail</option>
                        <option value="service">Service</option>
                        <option value="health">Health & Beauty</option>
                      </select>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        <FaArrowRight className="rotate-90 text-xs" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-charcoal dark:text-white mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </div>
                  <input id="email" type="email" className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition text-charcoal dark:text-white font-medium" placeholder="john.doe@example.com" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-charcoal dark:text-white mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaPhone />
                  </div>
                  <input id="phone" type="tel" className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition text-charcoal dark:text-white font-medium" placeholder="+1 (555) 123-4567" />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-charcoal dark:text-white mb-2">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </div>
                  <input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition text-charcoal dark:text-white font-medium" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    aria-label="Toggle password visibility" 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${getStrengthColor(strength)}`} 
                      style={{ width: `${strength}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 min-w-[70px] text-right">{getStrengthLabel(strength)}</span>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-charcoal dark:text-white mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaLock />
                  </div>
                  <input id="confirmPassword" type="password" className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/10 transition text-charcoal dark:text-white font-medium" placeholder="••••••••" />
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="terms" className="w-5 h-5 mt-0.5 rounded border-2 border-gray-300 dark:border-gray-600 text-teal focus:ring-teal" />
                <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the <a href="#" className="text-teal font-semibold hover:underline">Terms of Service</a> and <a href="#" className="text-teal font-semibold hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button type="submit" className={`w-full px-8 py-4 text-white font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2 ${accountType === 'user' ? 'bg-teal hover:bg-teal/90' : 'bg-indigo hover:bg-indigo/90'}`}>
                <span>{accountType === 'user' ? 'Create User Account' : 'Create Business Account'}</span>
                <FaArrowRight />
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-frost dark:bg-charcoal text-gray-500 font-medium">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button type="button" aria-label="Sign up with Google" className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-teal transition flex items-center justify-center gap-2">
                  <FaGoogle className="text-xl text-red-500" />
                </button>
                <button type="button" aria-label="Sign up with Apple" className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-teal transition flex items-center justify-center gap-2">
                  <FaApple className="text-xl text-charcoal dark:text-white" />
                </button>
                <button type="button" aria-label="Sign up with Facebook" className="px-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-teal transition flex items-center justify-center gap-2">
                  <FaFacebook className="text-xl text-blue-600" />
                </button>
              </div>

              <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
                Already have an account? <Link href="/signin" className="text-teal font-semibold hover:underline">Sign In</Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      <section id="onboarding-steps" className="py-20 bg-white dark:bg-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-black text-charcoal dark:text-white mb-4">What Happens Next?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Your journey to discovering amazing businesses</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center fade-in-up delay-1">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal to-teal/80 flex items-center justify-center shadow-xl">
                  <FaEnvelopeOpen className="text-white text-3xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-teal">
                  <span className="text-teal font-black text-lg">1</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">Verify Email</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Check your inbox for a verification link to activate your account</p>
            </div>

            <div className="text-center fade-in-up delay-2">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo to-indigo/80 flex items-center justify-center shadow-xl">
                  <FaUserGear className="text-white text-3xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-indigo">
                  <span className="text-indigo font-black text-lg">2</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">Complete Profile</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Add your details and preferences to get personalized recommendations</p>
            </div>
             <div className="text-center fade-in-up delay-3">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-teal to-teal/80 flex items-center justify-center shadow-xl">
                  <FaRocket className="text-white text-3xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-teal">
                  <span className="text-teal font-black text-lg">3</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">Start Exploring</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Browse thousands of businesses and book your first appointment</p>
            </div>
             <div className="text-center fade-in-up delay-4">
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo to-indigo/80 flex items-center justify-center shadow-xl">
                  <FaStar className="text-white text-3xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-indigo">
                  <span className="text-indigo font-black text-lg">4</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">Earn Rewards</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">Collect points with every booking and unlock exclusive perks</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
