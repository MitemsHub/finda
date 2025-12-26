"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Image from 'next/image';
import { FaCalendarCheck, FaHeart, FaUser, FaGear, FaBell, FaStar } from 'react-icons/fa6';
import Link from 'next/link';

export default function UserDashboard() {
  const upcomingBookings = [
    {
      id: 1,
      business: "The Rustic Spoon",
      service: "Dinner Reservation",
      date: "Today, 7:00 PM",
      status: "Confirmed",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      business: "Glow Spa & Wellness",
      service: "Deep Tissue Massage",
      date: "Tomorrow, 10:00 AM",
      status: "Pending",
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  const favorites = [
    {
      id: 1,
      name: "Urban Coffee Roasters",
      category: "Cafe",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Elite Fitness Gym",
      category: "Fitness",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 sticky top-28">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal to-teal/70 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  JD
                </div>
                <div>
                  <div className="font-bold text-charcoal dark:text-white">John Doe</div>
                  <div className="text-xs text-gray-500">Member since 2024</div>
                </div>
              </div>
              
              <nav className="space-y-2">
                <Link href="#" className="flex items-center gap-3 px-4 py-3 bg-teal/10 text-teal rounded-xl font-semibold transition">
                  <FaUser /> Dashboard
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl font-medium transition">
                  <FaCalendarCheck /> My Bookings
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl font-medium transition">
                  <FaHeart /> Favorites
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl font-medium transition">
                  <FaBell /> Notifications
                </Link>
                <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl font-medium transition">
                  <FaGear /> Settings
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-black text-charcoal dark:text-white">Welcome back, John! 👋</h1>
                <p className="text-gray-600 dark:text-gray-400">Here&apos;s what&apos;s happening with your account today.</p>
              </div>
              <button className="px-6 py-3 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg shadow-teal/20">
                Find New Places
              </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10">
                <div className="text-4xl font-bold text-teal mb-2">12</div>
                <div className="text-sm text-gray-500 font-bold">Total Bookings</div>
              </div>
              <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10">
                <div className="text-4xl font-bold text-purple-500 mb-2">5</div>
                <div className="text-sm text-gray-500 font-bold">Favorites</div>
              </div>
              <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-100 dark:border-white/10">
                <div className="text-4xl font-bold text-yellow-500 mb-2">3</div>
                <div className="text-sm text-gray-500 font-bold">Reviews</div>
              </div>
            </div>

            {/* Upcoming Bookings */}
            <div>
              <h2 className="text-xl font-bold text-charcoal dark:text-white mb-6">Upcoming Bookings</h2>
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-teal/30 transition group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 relative">
                      <Image src={booking.image} alt={booking.business} fill className="object-cover group-hover:scale-110 transition duration-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-charcoal dark:text-white">{booking.business}</h3>
                      <div className="text-sm text-gray-500">{booking.service}</div>
                      <div className="flex items-center gap-2 mt-2 text-xs font-bold">
                        <span className="px-2 py-1 bg-teal/10 text-teal rounded-lg">{booking.date}</span>
                        <span className={`px-2 py-1 rounded-lg ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-teal border border-gray-200 dark:border-white/10 rounded-lg hover:border-teal transition">
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Favorites */}
            <div>
              <h2 className="text-xl font-bold text-charcoal dark:text-white mb-6">Your Favorites</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {favorites.map((fav) => (
                  <div key={fav.id} className="bg-white dark:bg-white/5 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 hover:shadow-lg transition group">
                    <div className="h-32 overflow-hidden relative">
                      <Image src={fav.image} alt={fav.name} fill className="object-cover group-hover:scale-105 transition duration-500" />
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-red-500 shadow-sm z-10">
                        <FaHeart />
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-bold text-teal mb-1">{fav.category}</div>
                      <h3 className="font-bold text-charcoal dark:text-white mb-2">{fav.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <FaStar /> <span className="font-bold text-charcoal dark:text-white">{fav.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
