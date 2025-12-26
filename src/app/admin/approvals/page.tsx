"use client";

import Header from '@/components/landing/Header';
import { FaCheck, FaXmark, FaStore } from 'react-icons/fa6';

export default function AdminApprovals() {
  const pendingBusinesses = [
    { id: 1, name: "The Gourmet Kitchen", category: "Restaurant", owner: "James Oliver", date: "2024-10-24", description: "Authentic Italian cuisine in the heart of downtown." },
    { id: 2, name: "Zen Yoga Studio", category: "Health", owner: "Sarah Lee", date: "2024-10-23", description: "Peaceful yoga studio offering classes for all levels." },
    { id: 3, name: "Tech Solutions Inc", category: "Services", owner: "Mike Ross", date: "2024-10-22", description: "Professional IT support and computer repair services." },
    { id: 4, name: "Bloom Florist", category: "Retail", owner: "Emma Watson", date: "2024-10-21", description: "Fresh flowers for every occasion." },
    { id: 5, name: "City Gym", category: "Health", owner: "Dwayne Johnson", date: "2024-10-20", description: "24/7 fitness center with modern equipment." },
  ];

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-charcoal dark:text-white mb-2">Pending Approvals</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Review and approve new business listings</p>

        <div className="grid gap-6">
          {pendingBusinesses.map((business) => (
            <div key={business.id} className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="w-16 h-16 rounded-xl bg-indigo/10 flex items-center justify-center flex-shrink-0">
                <FaStore className="text-indigo text-2xl" />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-charcoal dark:text-white">{business.name}</h3>
                  <span className="px-2 py-0.5 rounded text-xs font-bold bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300 w-fit">
                    {business.category}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-2">Owned by {business.owner} • Submitted {business.date}</div>
                <p className="text-gray-600 dark:text-gray-300">{business.description}</p>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-3 bg-green-100 text-green-700 font-bold rounded-xl hover:bg-green-200 transition flex items-center justify-center gap-2">
                  <FaCheck /> Approve
                </button>
                <button className="flex-1 md:flex-none px-6 py-3 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition flex items-center justify-center gap-2">
                  <FaXmark /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
