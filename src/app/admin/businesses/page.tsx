"use client";

import { useState } from 'react';
import Header from '@/components/landing/Header';
import { FaStore, FaMagnifyingGlass, FaEllipsisVertical, FaPlus, FaBan, FaLocationDot } from 'react-icons/fa6';

export default function AdminBusinesses() {
  const [businesses] = useState([
    { id: 1, name: "The Gourmet Kitchen", category: "Restaurant", owner: "James Oliver", status: "Active", location: "New York, NY", rating: 4.8 },
    { id: 2, name: "Zen Yoga Studio", category: "Health & Wellness", owner: "Sarah Lee", status: "Active", location: "Los Angeles, CA", rating: 4.9 },
    { id: 3, name: "Tech Solutions Inc", category: "Professional Services", owner: "Mike Ross", status: "Pending", location: "San Francisco, CA", rating: 0 },
    { id: 4, name: "City Barber Shop", category: "Beauty & Spa", owner: "David Kim", status: "Suspended", location: "Chicago, IL", rating: 4.5 },
    { id: 5, name: "Green Earth Cafe", category: "Restaurant", owner: "Emily Chen", status: "Active", location: "Austin, TX", rating: 4.7 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredBusinesses = businesses.filter(business => 
    business.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    business.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-charcoal dark:text-white flex items-center gap-3">
              <FaStore className="text-teal" /> Business Directory
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Manage all listed businesses on the platform</p>
          </div>
          <button className="px-6 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg flex items-center gap-2">
            <FaPlus /> Add New Business
          </button>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
          <div className="p-6 border-b border-gray-100 dark:border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="font-bold text-lg text-charcoal dark:text-white">All Businesses ({filteredBusinesses.length})</h3>
            <div className="relative w-full sm:w-auto">
              <FaMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input 
                type="text" 
                placeholder="Search businesses..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-80 pl-9 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal/20 text-charcoal dark:text-white"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-white/5 text-left">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Business</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-white/10">
                {filteredBusinesses.map((business) => (
                  <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-white/10 overflow-hidden relative flex-shrink-0">
                           {/* Placeholder for business image */}
                           <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-500">
                             {business.name.charAt(0)}
                           </div>
                        </div>
                        <div>
                          <div className="font-bold text-charcoal dark:text-white text-sm">{business.name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                             <FaLocationDot className="text-[10px]" /> {business.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-xs font-semibold text-gray-600 dark:text-gray-300">
                        {business.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {business.owner}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1.5 text-xs font-semibold 
                        ${business.status === 'Active' ? 'text-green-600' : 
                          business.status === 'Suspended' ? 'text-red-600' : 
                          'text-orange-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full 
                          ${business.status === 'Active' ? 'bg-green-600' : 
                            business.status === 'Suspended' ? 'bg-red-600' : 
                            'bg-orange-600'}`}></span>
                        {business.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 text-gray-400 hover:text-teal transition" title="Edit">
                          <FaEllipsisVertical />
                        </button>
                        {business.status !== 'Suspended' && (
                           <button className="p-2 text-gray-400 hover:text-red-500 transition" title="Suspend">
                             <FaBan />
                           </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-gray-100 dark:border-white/10 flex justify-between items-center text-sm text-gray-500">
            <span>Showing {filteredBusinesses.length} businesses</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-200 dark:border-white/10 rounded hover:bg-gray-50 dark:hover:bg-white/5 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 border border-gray-200 dark:border-white/10 rounded hover:bg-gray-50 dark:hover:bg-white/5">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
