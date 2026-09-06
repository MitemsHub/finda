"use client";

import { useState } from 'react';
import { FaLayerGroup, FaPlus, FaUtensils, FaMugHot, FaSpa, FaDumbbell, FaBagShopping, FaCar, FaScrewdriverWrench, FaMartiniGlass, FaBriefcaseMedical, FaPaw } from 'react-icons/fa6';
import { AdminShell } from '@/components/admin/AdminShell';
import { getApprovedBusinesses } from '@/lib/data/demo';

const ICONS: Record<string, React.ReactNode> = {
  Restaurants: <FaUtensils aria-hidden />,
  Cafés: <FaMugHot aria-hidden />,
  'Beauty & Spas': <FaSpa aria-hidden />,
  'Health & Fitness': <FaDumbbell aria-hidden />,
  Shopping: <FaBagShopping aria-hidden />,
  Automotive: <FaCar aria-hidden />,
  'Home Services': <FaScrewdriverWrench aria-hidden />,
  Nightlife: <FaMartiniGlass aria-hidden />,
  'Health & Medical': <FaBriefcaseMedical aria-hidden />,
};

export default function AdminCategories() {
  const [categories, setCategories] = useState(() => {
    const base = ['Restaurants', 'Cafés', 'Beauty & Spas', 'Health & Fitness', 'Shopping', 'Automotive', 'Home Services', 'Nightlife', 'Health & Medical'];
    return base.map((name) => ({
      name,
      icon: ICONS[name] ?? <FaPaw aria-hidden />,
      count: getApprovedBusinesses().filter((b) => b.category === name).length,
    }));
  });
  const [newCategory, setNewCategory] = useState('');

  const addCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCategory.trim();
    if (!name || categories.some((c) => c.name.toLowerCase() === name.toLowerCase())) return;
    setCategories([...categories, { name, icon: <FaLayerGroup aria-hidden />, count: 0 }]);
    setNewCategory('');
  };

  return (
    <AdminShell
      title="Categories"
      subtitle="The taxonomy behind search and discovery. Keep it small and meaningful."
      active="/admin/categories"
    >
      <form onSubmit={addCategory} className="card p-5 flex gap-3 mb-8">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name…"
          aria-label="New category name"
          className="field !py-2.5"
        />
        <button type="submit" className="btn-primary btn-sm shrink-0" disabled={!newCategory.trim()}>
          <FaPlus aria-hidden /> Add
        </button>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.name} className="card card-hover p-5">
            <div className="flex items-start justify-between mb-4">
              <span className="w-11 h-11 rounded-xl bg-primary-soft dark:bg-primary/15 text-primary dark:text-primary-bright flex items-center justify-center text-lg">
                {cat.icon}
              </span>
              <span className="badge-neutral text-[11px]">{cat.count} listed</span>
            </div>
            <h3 className="font-semibold text-ink-900 dark:text-ink-900-inv">{cat.name}</h3>
            <p className="text-xs text-muted mt-0.5">
              /{cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
            </p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
