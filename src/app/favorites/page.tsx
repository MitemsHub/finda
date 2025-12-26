"use client";

import Header from '@/components/landing/Header';
import { FaHeart, FaLocationDot, FaStar } from 'react-icons/fa6';
import Image from 'next/image';
import Link from 'next/link';

export default function FavoritesPage() {
  const favorites = [
    {
      id: 1,
      name: "The Rustic Spoon",
      category: "Restaurant",
      rating: 4.8,
      reviewCount: 124,
      address: "123 Main St, Downtown",
      imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isOpen: true
    },
    {
      id: 2,
      name: "Urban Fitness",
      category: "Health",
      rating: 4.9,
      reviewCount: 89,
      address: "456 Oak Ave, Westside",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isOpen: true
    },
    {
      id: 3,
      name: "Luxe Salon & Spa",
      category: "Beauty",
      rating: 4.7,
      reviewCount: 215,
      address: "789 Pine Rd, Uptown",
      imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      isOpen: true
    }
  ];

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-black text-charcoal dark:text-white mb-2">My Favorites</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Businesses you&apos;ve saved for later</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((business) => (
            <div key={business.id} className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl transition duration-300 group">
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={business.imageUrl} 
                  alt={business.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-red-500 cursor-pointer hover:bg-red-50 transition">
                  <FaHeart />
                </div>
                <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {business.isOpen ? 'Open Now' : 'Closed'}
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-teal text-sm font-bold mb-1">{business.category}</div>
                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-2">{business.name}</h3>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="font-bold text-charcoal dark:text-white">{business.rating}</span>
                    <span>({business.reviewCount})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <FaLocationDot /> {business.address}
                </div>

                <Link href={`/business/${business.id}`} className="block w-full py-3 bg-gray-50 dark:bg-white/10 text-charcoal dark:text-white text-center font-bold rounded-xl hover:bg-teal hover:text-white transition">
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
