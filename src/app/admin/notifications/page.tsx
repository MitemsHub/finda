"use client";

import Header from '@/components/landing/Header';
import { FaPaperPlane, FaBullhorn } from 'react-icons/fa6';

export default function BroadcastNotification() {
  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-black text-charcoal dark:text-white mb-2">Broadcast Notification</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Send a system-wide message to users</p>

        <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10 shadow-lg">
          <div className="mb-8 p-4 bg-indigo/10 rounded-xl border border-indigo/20 flex items-start gap-3">
            <FaBullhorn className="text-indigo text-xl mt-1" />
            <div>
              <h3 className="font-bold text-indigo">Important Note</h3>
              <p className="text-sm text-indigo/80">This message will be visible to all users in their notification center and may be sent via email depending on user settings.</p>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-charcoal dark:text-white mb-2">Target Audience</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="audience" defaultChecked className="text-teal focus:ring-teal" />
                  <span className="text-gray-700 dark:text-gray-300">All Users</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="audience" className="text-teal focus:ring-teal" />
                  <span className="text-gray-700 dark:text-gray-300">Business Owners Only</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="audience" className="text-teal focus:ring-teal" />
                  <span className="text-gray-700 dark:text-gray-300">Standard Users Only</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal dark:text-white mb-2">Subject</label>
              <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo" placeholder="e.g., Scheduled Maintenance" />
            </div>

            <div>
              <label className="block text-sm font-bold text-charcoal dark:text-white mb-2">Message Content</label>
              <textarea rows={6} className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-indigo" placeholder="Type your message here..."></textarea>
            </div>

            <div className="flex items-center gap-2">
               <input type="checkbox" id="emailCopy" className="rounded text-indigo focus:ring-indigo" />
               <label htmlFor="emailCopy" className="text-sm text-gray-700 dark:text-gray-300">Send a copy via email</label>
            </div>

            <button type="button" className="w-full py-4 bg-indigo text-white font-bold rounded-xl hover:bg-indigo/90 transition shadow-lg flex items-center justify-center gap-2">
              <FaPaperPlane /> Send Broadcast
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
