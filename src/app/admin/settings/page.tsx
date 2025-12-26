"use client";

import Header from '@/components/landing/Header';
import { FaFloppyDisk, FaGlobe, FaShieldHalved } from 'react-icons/fa6';

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-charcoal dark:text-white mb-2">Platform Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Configure global application settings</p>

        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-bold text-charcoal dark:text-white mb-6 flex items-center gap-2">
              <FaGlobe className="text-teal" /> General
            </h2>
            <div className="grid gap-6">
              <div>
                <label htmlFor="siteName" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Site Name</label>
                <input id="siteName" type="text" defaultValue="Finda" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl" />
              </div>
              <div>
                <label htmlFor="supportEmail" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Support Email</label>
                <input id="supportEmail" type="email" defaultValue="support@finda.com" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10">
            <h2 className="text-xl font-bold text-charcoal dark:text-white mb-6 flex items-center gap-2">
              <FaShieldHalved className="text-indigo" /> Security & Maintenance
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/20 rounded-xl">
                <div>
                  <div className="font-bold text-charcoal dark:text-white">Maintenance Mode</div>
                  <div className="text-xs text-gray-500">Disable access for non-admins</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" aria-label="Maintenance Mode" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-black/20 rounded-xl">
                <div>
                  <div className="font-bold text-charcoal dark:text-white">New User Registration</div>
                  <div className="text-xs text-gray-500">Allow new users to sign up</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" aria-label="New User Registration" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
             <button className="flex items-center gap-2 px-8 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg">
               <FaFloppyDisk /> Save Changes
             </button>
          </div>
        </div>
      </main>
    </div>
  );
}
