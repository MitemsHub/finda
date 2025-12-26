"use client";

import Header from '@/components/landing/Header';
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa6';

export default function ManageCategories() {
  const categories = [
    { id: 1, name: "Restaurant", count: 145, icon: "🍽️" },
    { id: 2, name: "Health & Beauty", count: 89, icon: "💅" },
    { id: 3, name: "Automotive", count: 62, icon: "🚗" },
    { id: 4, name: "Home Services", count: 112, icon: "🏠" },
    { id: 5, name: "Professional Services", count: 45, icon: "💼" },
    { id: 6, name: "Shopping", count: 203, icon: "🛍️" },
  ];

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-charcoal dark:text-white mb-2">Manage Categories</h1>
            <p className="text-gray-600 dark:text-gray-400">Add, edit, or remove business categories</p>
          </div>
          <button className="px-6 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg flex items-center gap-2">
            <FaPlus /> Add Category
          </button>
        </div>

        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/10 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-white/5 text-left">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Icon</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Businesses</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 dark:hover:bg-white/5 transition">
                  <td className="px-6 py-4 text-2xl">{category.icon}</td>
                  <td className="px-6 py-4 font-bold text-charcoal dark:text-white">{category.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{category.count} listings</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-indigo hover:bg-indigo/10 rounded-lg transition" aria-label="Edit">
                        <FaPen />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition" aria-label="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
