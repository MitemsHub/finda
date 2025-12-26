"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaStar, FaLocationDot, FaRegHeart, FaHeart } from 'react-icons/fa6';
import { useState } from 'react';

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  imageUrl: string;
  isOpen: boolean;
  tags: string[];
}

export default function BusinessCard({ 
  id, 
  name, 
  category, 
  rating, 
  reviewCount, 
  address, 
  imageUrl, 
  isOpen,
  tags 
}: BusinessCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="group bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl hover:border-teal/30 dark:hover:border-teal/30 transition duration-300">
      <div className="relative h-48 overflow-hidden">
        {/* Image Placeholder using CSS gradient if no image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 animate-pulse group-hover:scale-105 transition duration-500">
             {/* In a real app, use Next.js Image here */}
             {imageUrl && (
                <Image 
                  src={imageUrl} 
                  alt={name} 
                  fill
                  className="object-cover"
                />
             )}
        </div>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center transition hover:scale-110"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-sm" />
          ) : (
            <FaRegHeart className="text-gray-600 dark:text-gray-300 text-sm hover:text-red-500" />
          )}
        </button>

        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-sm text-xs font-bold text-charcoal dark:text-white">
          {category}
        </div>
        
        <div className={`absolute bottom-3 right-3 px-2 py-1 rounded-md text-xs font-bold ${isOpen ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'}`}>
          {isOpen ? 'Open Now' : 'Closed'}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/business/${id}`} className="group-hover:text-teal transition">
            <h3 className="text-lg font-bold text-charcoal dark:text-white line-clamp-1">{name}</h3>
          </Link>
          <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-lg">
            <FaStar className="text-yellow-500 text-xs" />
            <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">{rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">({reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-4">
          <FaLocationDot className="text-teal/70" />
          <span className="line-clamp-1">{address}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-xs text-gray-600 dark:text-gray-300">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 rounded-md bg-gray-100 dark:bg-white/5 text-xs text-gray-600 dark:text-gray-300">
              +{tags.length - 3} more
            </span>
          )}
        </div>

        <Link 
          href={`/business/${id}`}
          className="block w-full py-2.5 text-center rounded-xl border-2 border-teal text-teal font-bold hover:bg-teal hover:text-white transition duration-300"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
}