"use client";

import { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import BusinessCard from '@/components/BusinessCard';
import { FaMagnifyingGlass, FaLocationDot, FaSliders, FaMapLocationDot } from 'react-icons/fa6';

// Mock Data
const MOCK_BUSINESSES = [
  {
    id: '1',
    name: 'The Rustic Spoon',
    category: 'Restaurant',
    rating: 4.8,
    reviewCount: 124,
    address: '123 Main St, Downtown',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isOpen: true,
    tags: ['Italian', 'Fine Dining', 'Wine Bar']
  },
  {
    id: '2',
    name: 'Urban Fitness',
    category: 'Health',
    rating: 4.9,
    reviewCount: 89,
    address: '456 Oak Ave, Westside',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isOpen: true,
    tags: ['Gym', 'Personal Training', 'Yoga']
  },
  {
    id: '3',
    name: 'Luxe Salon & Spa',
    category: 'Beauty',
    rating: 4.7,
    reviewCount: 215,
    address: '789 Pine Rd, Uptown',
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isOpen: true,
    tags: ['Haircut', 'Massage', 'Facial']
  },
  {
    id: '4',
    name: 'Tech Fix Pro',
    category: 'Services',
    rating: 4.6,
    reviewCount: 56,
    address: '321 Elm St, Tech District',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isOpen: false,
    tags: ['Computer Repair', 'Phone Repair', 'IT Support']
  },
  {
    id: '5',
    name: 'Green Leaf Cafe',
    category: 'Restaurant',
    rating: 4.5,
    reviewCount: 178,
    address: '555 Maple Dr, Suburbs',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isOpen: true,
    tags: ['Coffee', 'Vegan', 'Bakery']
  },
  {
    id: '6',
    name: 'AutoWorks',
    category: 'Automotive',
    rating: 4.8,
    reviewCount: 92,
    address: '999 Industrial Pkwy',
    imageUrl: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isOpen: true,
    tags: ['Mechanic', 'Tires', 'Oil Change']
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Restaurant', 'Health', 'Beauty', 'Services', 'Automotive'];

  const filteredBusinesses = MOCK_BUSINESSES.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          business.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || business.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />

      {/* Search Header */}
      <div className="pt-28 pb-10 bg-white dark:bg-charcoal border-b border-gray-200 dark:border-white/10 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-1 w-full">
              <FaMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search for businesses, services, or tags..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-teal rounded-xl outline-none transition text-charcoal dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative w-full md:w-auto">
              <FaLocationDot className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Location" 
                className="w-full md:w-64 pl-12 pr-4 py-3 bg-gray-100 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-black focus:border-teal rounded-xl outline-none transition text-charcoal dark:text-white"
                defaultValue="New York, NY"
              />
            </div>
            <button className="w-full md:w-auto px-6 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition flex items-center justify-center gap-2">
              <FaMagnifyingGlass />
              <span>Search</span>
            </button>
          </div>

          <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                    selectedCategory === cat 
                      ? 'bg-teal text-white' 
                      : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 ml-4">
               <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-teal text-gray-600 dark:text-gray-300 text-sm font-semibold transition">
                 <FaSliders />
                 <span>Filters</span>
               </button>
               <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-white/10 hover:border-teal text-gray-600 dark:text-gray-300 text-sm font-semibold transition">
                 <FaMapLocationDot />
                 <span>Map View</span>
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-charcoal dark:text-white">
            {filteredBusinesses.length} Results found for &quot;{selectedCategory}&quot;
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
            <select aria-label="Sort by" className="bg-transparent font-semibold text-charcoal dark:text-white outline-none cursor-pointer">
              <option>Recommended</option>
              <option>Highest Rated</option>
              <option>Most Reviewed</option>
              <option>Distance</option>
            </select>
          </div>
        </div>

        {filteredBusinesses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaMagnifyingGlass className="text-3xl text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-charcoal dark:text-white mb-2">No businesses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters to find what you&apos;re looking for.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
