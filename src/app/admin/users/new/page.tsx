"use client";

import Header from '@/components/landing/Header';
import { FaUserPlus } from 'react-icons/fa6';

export default function CreateUser() {
  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-charcoal dark:text-white mb-2">Create New User</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Add a new administrator or support user</p>

        <div className="bg-white dark:bg-white/5 rounded-2xl p-8 border border-gray-100 dark:border-white/10 shadow-lg">
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-charcoal dark:text-white mb-2">First Name</label>
                <input id="firstName" type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-teal" placeholder="John" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Last Name</label>
                <input id="lastName" type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-teal" placeholder="Doe" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Email Address</label>
              <input id="email" type="email" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-teal" placeholder="john@example.com" />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Role</label>
              <select id="role" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-teal">
                <option value="user">Standard User</option>
                <option value="business">Business Owner</option>
                <option value="admin">Administrator</option>
                <option value="support">Support Agent</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Temporary Password</label>
              <input id="password" type="password" className="w-full px-4 py-3 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-teal" placeholder="••••••••" />
            </div>

            <button type="submit" className="w-full py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg flex items-center justify-center gap-2">
              <FaUserPlus /> Create User
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
