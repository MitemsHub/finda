"use client";

import Header from '@/components/landing/Header';
import { FaUser, FaLock, FaBell, FaCreditCard, FaTrash } from 'react-icons/fa6';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-charcoal dark:text-white mb-2">Account Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Manage your profile and preferences</p>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1 space-y-2">
            <button type="button" className="w-full text-left px-4 py-3 rounded-xl bg-teal/10 text-teal font-bold flex items-center gap-3">
              <FaUser /> Profile
            </button>
            <button type="button" className="w-full text-left px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 font-medium flex items-center gap-3 transition">
              <FaLock /> Security
            </button>
            <button type="button" className="w-full text-left px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 font-medium flex items-center gap-3 transition">
              <FaBell /> Notifications
            </button>
            <button type="button" className="w-full text-left px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 font-medium flex items-center gap-3 transition">
              <FaCreditCard /> Billing
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Profile Section */}
            <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
              <h2 className="text-xl font-bold text-charcoal dark:text-white mb-6">Personal Information</h2>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div>
                  <button type="button" className="px-4 py-2 bg-indigo text-white font-bold rounded-lg text-sm hover:bg-indigo/90 transition mb-2">Upload New Picture</button>
                  <p className="text-xs text-gray-500">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-bold text-charcoal dark:text-white mb-2">First Name</label>
                  <input id="firstName" type="text" defaultValue="John" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Last Name</label>
                  <input id="lastName" type="text" defaultValue="Doe" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl" />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Email Address</label>
                <input id="email" type="email" defaultValue="john.doe@example.com" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl" />
              </div>

              <div className="flex justify-end">
                <button type="submit" className="px-6 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg">
                  Save Changes
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-8 border border-red-100 dark:border-red-900/20">
              <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">Once you delete your account, there is no going back. Please be certain.</p>
              <button type="button" className="px-6 py-3 bg-white dark:bg-transparent border border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center gap-2">
                <FaTrash /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
