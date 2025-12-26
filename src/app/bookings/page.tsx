"use client";

import Header from '@/components/landing/Header';
import { FaCalendarCheck, FaLocationDot, FaFilter } from 'react-icons/fa6';
import Image from 'next/image';

export default function BookingsPage() {
  const bookings = [
    {
      id: 1,
      business: "The Rustic Spoon",
      service: "Dinner Reservation",
      date: "Today",
      time: "7:00 PM",
      status: "Confirmed",
      address: "123 Main St, Downtown",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: "Free"
    },
    {
      id: 2,
      business: "Glow Spa & Wellness",
      service: "Deep Tissue Massage",
      date: "Oct 26, 2024",
      time: "10:00 AM",
      status: "Pending",
      address: "456 Oak Ave, Westside",
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: "$85.00"
    },
    {
      id: 3,
      business: "Urban Fitness",
      service: "Personal Training Session",
      date: "Oct 20, 2024",
      time: "4:00 PM",
      status: "Completed",
      address: "789 Pine Rd, Uptown",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: "$60.00"
    },
    {
      id: 4,
      business: "Tech Fix Pro",
      service: "Laptop Repair Diagnostic",
      date: "Oct 15, 2024",
      time: "1:30 PM",
      status: "Cancelled",
      address: "321 Elm St, Tech District",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a783?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      price: "$0.00"
    }
  ];

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-charcoal dark:text-white">My Bookings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your upcoming and past appointments</p>
          </div>
          <div className="flex items-center gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-white/10 transition">
               <FaFilter /> Filter
             </button>
             <select className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-sm font-semibold outline-none cursor-pointer" aria-label="Filter by status">
               <option>All Status</option>
               <option>Confirmed</option>
               <option>Pending</option>
               <option>Completed</option>
             </select>
          </div>
        </div>

        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white dark:bg-white/5 rounded-2xl p-5 border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-md transition group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative w-full md:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                  <Image 
                    src={booking.image} 
                    alt={booking.business} 
                    fill 
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-bold text-white">
                    {booking.price}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-charcoal dark:text-white mb-1">{booking.business}</h3>
                      <div className="text-teal font-semibold text-sm mb-2">{booking.service}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-600 border-green-200' :
                      booking.status === 'Pending' ? 'bg-orange-100 text-orange-600 border-orange-200' :
                      booking.status === 'Completed' ? 'bg-gray-100 text-gray-600 border-gray-200' :
                      'bg-red-100 text-red-600 border-red-200'
                    }`}>
                      {booking.status}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarCheck className="text-indigo" />
                      <span>{booking.date} at {booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLocationDot className="text-indigo" />
                      <span className="truncate">{booking.address}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    {booking.status !== 'Cancelled' && (
                      <button className="px-4 py-2 bg-indigo text-white text-sm font-bold rounded-lg hover:bg-indigo/90 transition">
                        View Details
                      </button>
                    )}
                    {booking.status === 'Pending' && (
                      <button className="px-4 py-2 bg-white dark:bg-white/5 border border-red-200 text-red-500 text-sm font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition">
                        Cancel
                      </button>
                    )}
                    {booking.status === 'Completed' && (
                      <button className="px-4 py-2 bg-white dark:bg-white/5 border border-teal/30 text-teal text-sm font-bold rounded-lg hover:bg-teal/5 transition">
                        Write Review
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
