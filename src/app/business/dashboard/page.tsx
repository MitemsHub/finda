"use client";

import { useState } from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import Image from 'next/image';
import { 
  FaChartPie, FaCalendarDays, FaUserGroup, FaStore, FaGear, FaBell, FaArrowUp, 
  FaStar, FaPen, FaPlus, FaBullhorn, FaImages, FaTrash, FaEnvelope, FaPhone, 
  FaMapPin, FaReply 
} from 'react-icons/fa6';

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);

  const stats = [
    { label: "Total Views", value: "2.4k", change: "+12%", icon: <FaUserGroup /> },
    { label: "Bookings", value: "148", change: "+8%", icon: <FaCalendarDays /> },
    { label: "Avg. Rating", value: "4.9", change: "+0.1", icon: <FaStar /> },
    { label: "Revenue", value: "$12.5k", change: "+15%", icon: <FaChartPie /> },
  ];

  const recentBookings = [
    { customer: "Sarah Johnson", service: "Dinner for 2", date: "Today, 7:00 PM", status: "Confirmed", amount: "$85" },
    { customer: "Mike Chen", service: "Private Event", date: "Tomorrow, 6:00 PM", status: "Pending", amount: "$450" },
    { customer: "Emily Davis", service: "Lunch Special", date: "Oct 24, 12:30 PM", status: "Completed", amount: "$45" },
    { customer: "David Wilson", service: "Dinner Reservation", date: "Oct 23, 8:00 PM", status: "Cancelled", amount: "$0" },
    { customer: "Jessica Taylor", service: "Catering", date: "Oct 28, 2:00 PM", status: "Confirmed", amount: "$1,200" },
  ];

  const customers = [
    { id: 1, name: "Sarah Johnson", email: "sarah.j@example.com", phone: "+1 234 567 8900", totalVisits: 12, totalSpend: "$1,240", lastVisit: "Oct 24, 2023" },
    { id: 2, name: "Mike Chen", email: "mike.c@example.com", phone: "+1 234 567 8901", totalVisits: 5, totalSpend: "$450", lastVisit: "Oct 22, 2023" },
    { id: 3, name: "Emily Davis", email: "emily.d@example.com", phone: "+1 234 567 8902", totalVisits: 8, totalSpend: "$890", lastVisit: "Oct 15, 2023" },
    { id: 4, name: "David Wilson", email: "david.w@example.com", phone: "+1 234 567 8903", totalVisits: 3, totalSpend: "$210", lastVisit: "Oct 10, 2023" },
    { id: 5, name: "Jessica Taylor", email: "jess.t@example.com", phone: "+1 234 567 8904", totalVisits: 1, totalSpend: "$1,200", lastVisit: "Oct 28, 2023" },
  ];

  const reviews = [
    { id: 1, user: "Alice Brown", rating: 5, date: "2 days ago", content: "Amazing food and great atmosphere! The staff was very attentive.", reply: "" },
    { id: 2, user: "John Smith", rating: 4, date: "1 week ago", content: "Good food but the service was a bit slow during peak hours.", reply: "Thank you for your feedback, John. We're working on improving our service speed." },
    { id: 3, user: "Karen White", rating: 5, date: "2 weeks ago", content: "Best pasta in town! Highly recommended.", reply: "" },
    { id: 4, user: "Tom Harris", rating: 3, date: "3 weeks ago", content: "It was okay, but a bit overpriced for the portion sizes.", reply: "" },
  ];

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 sticky top-28">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-indigo text-white flex items-center justify-center font-bold text-lg">
                  <FaStore />
                </div>
                <div>
                  <div className="font-bold text-charcoal dark:text-white text-sm">The Rustic Spoon</div>
                  <div className="text-xs text-green-500 font-bold">● Open Now</div>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${activeTab === 'overview' ? 'bg-indigo/10 text-indigo' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <FaChartPie /> Overview
                </button>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${activeTab === 'bookings' ? 'bg-indigo/10 text-indigo' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <FaCalendarDays /> Bookings
                </button>
                <button 
                  onClick={() => setActiveTab('customers')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${activeTab === 'customers' ? 'bg-indigo/10 text-indigo' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <FaUserGroup /> Customers
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${activeTab === 'reviews' ? 'bg-indigo/10 text-indigo' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <FaStar /> Reviews
                </button>
                <button 
                  onClick={() => setActiveTab('gallery')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${activeTab === 'gallery' ? 'bg-indigo/10 text-indigo' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <FaImages /> Gallery
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${activeTab === 'settings' ? 'bg-indigo/10 text-indigo' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                >
                  <FaGear /> Settings
                </button>
              </nav>

              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-white/10">
                <div className="bg-gradient-to-br from-indigo to-purple-600 rounded-xl p-4 text-white text-center">
                   <div className="font-bold mb-1">Go Premium</div>
                   <p className="text-xs opacity-80 mb-3">Unlock advanced analytics and more features.</p>
                   <button className="w-full py-2 bg-white text-indigo text-xs font-bold rounded-lg hover:bg-indigo-50 transition">Upgrade</button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-charcoal dark:text-white">Business Overview</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Track your performance and manage your business.</p>
                  </div>
                  <div className="flex gap-3">
                     <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 transition">
                       <FaBell /> <span className="hidden md:inline">Notifications</span>
                     </button>
                     <button 
                       onClick={() => setShowBookingModal(true)}
                       className="flex items-center gap-2 px-4 py-2 bg-indigo text-white rounded-xl text-sm font-bold hover:bg-indigo/90 transition shadow-lg shadow-indigo/20"
                     >
                       <FaPlus /> <span className="hidden md:inline">New Booking</span>
                     </button>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-5 hover:border-indigo/30 transition">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-500 dark:text-gray-400">
                          {stat.icon}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                          <FaArrowUp /> {stat.change}
                        </div>
                      </div>
                      <div className="text-2xl font-black text-charcoal dark:text-white mb-1">{stat.value}</div>
                      <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Recent Bookings */}
                  <div className="lg:col-span-2 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-bold text-charcoal dark:text-white">Recent Bookings</h2>
                      <button onClick={() => setActiveTab('bookings')} className="text-indigo font-semibold text-sm hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-gray-500 border-b border-gray-100 dark:border-white/10">
                            <th className="pb-3 font-semibold">Customer</th>
                            <th className="pb-3 font-semibold">Service</th>
                            <th className="pb-3 font-semibold">Date</th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 font-semibold text-right">Amount</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                          {recentBookings.slice(0, 3).map((booking, idx) => (
                            <tr key={idx} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition">
                              <td className="py-4 font-bold text-charcoal dark:text-white">{booking.customer}</td>
                              <td className="py-4 text-gray-600 dark:text-gray-300">{booking.service}</td>
                              <td className="py-4 text-gray-500">{booking.date}</td>
                              <td className="py-4">
                                <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${
                                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                                  booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                  booking.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="py-4 text-right font-bold text-charcoal dark:text-white">{booking.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6">
                      <h2 className="text-lg font-bold text-charcoal dark:text-white mb-4">Quick Actions</h2>
                      <div className="space-y-3">
                        <button className="w-full p-3 flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition text-left">
                          <div className="w-8 h-8 rounded-full bg-indigo/10 text-indigo flex items-center justify-center"><FaPen /></div>
                          <span className="font-semibold text-charcoal dark:text-white text-sm">Edit Business Profile</span>
                        </button>
                        <button className="w-full p-3 flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition text-left">
                          <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center"><FaPlus /></div>
                          <span className="font-semibold text-charcoal dark:text-white text-sm">Add New Service</span>
                        </button>
                        <button className="w-full p-3 flex items-center gap-3 bg-gray-50 dark:bg-white/5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition text-left">
                          <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center"><FaBullhorn /></div>
                          <span className="font-semibold text-charcoal dark:text-white text-sm">Promote Business</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-indigo text-white rounded-2xl p-6 relative overflow-hidden">
                       <div className="relative z-10">
                         <h3 className="font-bold text-lg mb-1">Tip of the Day</h3>
                         <p className="text-sm opacity-90 mb-4">Responding to reviews within 24 hours increases customer retention by 15%.</p>
                         <button className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition">Read More</button>
                       </div>
                       <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-8 -mt-8"></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex justify-between items-center">
                   <h2 className="text-2xl font-bold text-charcoal dark:text-white">All Bookings</h2>
                   <button 
                     onClick={() => setShowBookingModal(true)}
                     className="px-6 py-2 bg-indigo text-white font-bold rounded-lg hover:bg-indigo/90 transition"
                   >
                     Add Booking
                   </button>
                </div>
                <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6">
                   <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-gray-500 border-b border-gray-100 dark:border-white/10">
                            <th className="pb-3 font-semibold">Customer</th>
                            <th className="pb-3 font-semibold">Service</th>
                            <th className="pb-3 font-semibold">Date</th>
                            <th className="pb-3 font-semibold">Status</th>
                            <th className="pb-3 font-semibold text-right">Amount</th>
                            <th className="pb-3 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                          {recentBookings.map((booking, idx) => (
                            <tr key={idx} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition">
                              <td className="py-4 font-bold text-charcoal dark:text-white">{booking.customer}</td>
                              <td className="py-4 text-gray-600 dark:text-gray-300">{booking.service}</td>
                              <td className="py-4 text-gray-500">{booking.date}</td>
                              <td className="py-4">
                                <span className={`inline-block px-2 py-1 rounded-md text-xs font-bold ${
                                  booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
                                  booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                                  booking.status === 'Cancelled' ? 'bg-red-100 text-red-600' :
                                  'bg-gray-100 text-gray-600'
                                }`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td className="py-4 text-right font-bold text-charcoal dark:text-white">{booking.amount}</td>
                              <td className="py-4 text-right">
                                <button className="text-indigo hover:text-indigo/80 font-bold text-xs">Manage</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                 <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-charcoal dark:text-white">Customers</h2>
                    <button className="px-6 py-2 bg-indigo text-white font-bold rounded-lg hover:bg-indigo/90 transition flex items-center gap-2">
                       <FaPlus /> Add Customer
                    </button>
                 </div>
                 <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead>
                          <tr className="text-gray-500 border-b border-gray-100 dark:border-white/10">
                            <th className="pb-3 font-semibold">Name</th>
                            <th className="pb-3 font-semibold">Contact</th>
                            <th className="pb-3 font-semibold">Visits</th>
                            <th className="pb-3 font-semibold">Total Spend</th>
                            <th className="pb-3 font-semibold">Last Visit</th>
                            <th className="pb-3 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                          {customers.map((customer) => (
                            <tr key={customer.id} className="group hover:bg-gray-50 dark:hover:bg-white/5 transition">
                              <td className="py-4 font-bold text-charcoal dark:text-white">{customer.name}</td>
                              <td className="py-4 text-gray-600 dark:text-gray-300">
                                <div className="flex flex-col gap-1">
                                  <div className="flex items-center gap-2"><FaEnvelope className="text-xs text-gray-400" /> {customer.email}</div>
                                  <div className="flex items-center gap-2"><FaPhone className="text-xs text-gray-400" /> {customer.phone}</div>
                                </div>
                              </td>
                              <td className="py-4 text-gray-500">{customer.totalVisits}</td>
                              <td className="py-4 font-bold text-green-600">{customer.totalSpend}</td>
                              <td className="py-4 text-gray-500">{customer.lastVisit}</td>
                              <td className="py-4 text-right">
                                <button className="text-indigo hover:text-indigo/80 font-bold text-xs">View</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                 </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                 <h2 className="text-2xl font-bold text-charcoal dark:text-white">Reviews</h2>
                 <div className="grid gap-4">
                   {reviews.map((review) => (
                     <div key={review.id} className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6">
                       <div className="flex justify-between items-start mb-4">
                         <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center font-bold text-gray-500 dark:text-white">
                             {review.user.charAt(0)}
                           </div>
                           <div>
                             <div className="font-bold text-charcoal dark:text-white">{review.user}</div>
                             <div className="text-xs text-gray-500">{review.date}</div>
                           </div>
                         </div>
                         <div className="flex text-yellow-400 text-sm">
                           {[...Array(5)].map((_, i) => (
                             <FaStar key={i} className={i < review.rating ? "text-yellow-400" : "text-gray-300"} />
                           ))}
                         </div>
                       </div>
                       <p className="text-gray-600 dark:text-gray-300 mb-4">&quot;{review.content}&quot;</p>
                       
                       {review.reply ? (
                         <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 text-sm">
                           <div className="font-bold text-indigo mb-1 flex items-center gap-2"><FaReply /> Response from you</div>
                           <p className="text-gray-600 dark:text-gray-400">{review.reply}</p>
                         </div>
                       ) : (
                         <button className="text-indigo font-bold text-sm hover:underline flex items-center gap-2">
                           <FaReply /> Reply to Review
                         </button>
                       )}
                     </div>
                   ))}
                 </div>
              </div>
            )}

            {activeTab === 'gallery' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                 <div className="flex justify-between items-center">
                   <div>
                     <h2 className="text-2xl font-bold text-charcoal dark:text-white">Business Gallery</h2>
                     <p className="text-gray-600 dark:text-gray-400 text-sm">Showcase your business with high-quality photos.</p>
                   </div>
                   <button className="px-6 py-2 bg-indigo text-white font-bold rounded-lg hover:bg-indigo/90 transition flex items-center gap-2">
                     <FaPlus /> Add Photo
                   </button>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="group relative aspect-square bg-gray-100 dark:bg-white/5 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                        <Image 
                          src={`https://source.unsplash.com/random/400x400?business,${item}`} 
                          alt="Gallery item" 
                          fill
                          className="object-cover transition duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                           <button aria-label="Edit photo" className="w-10 h-10 rounded-full bg-white text-charcoal flex items-center justify-center hover:bg-gray-100 transition">
                             <FaPen />
                           </button>
                           <button aria-label="Delete photo" className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition">
                             <FaTrash />
                           </button>
                        </div>
                      </div>
                    ))}
                    <button className="aspect-square border-2 border-dashed border-gray-300 dark:border-white/20 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-indigo hover:border-indigo transition hover:bg-indigo/5">
                      <FaPlus className="text-3xl mb-2" />
                      <span className="font-bold text-sm">Upload Photo</span>
                    </button>
                 </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                 <h2 className="text-2xl font-bold text-charcoal dark:text-white">Business Settings</h2>
                 
                 <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-charcoal dark:text-white mb-4 border-b border-gray-100 dark:border-white/10 pb-2">Basic Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="business-name" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Business Name</label>
                          <input id="business-name" type="text" defaultValue="The Rustic Spoon" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo transition" />
                        </div>
                        <div>
                          <label htmlFor="category" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Category</label>
                          <select id="category" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo transition">
                            <option>Restaurant</option>
                            <option>Salon</option>
                            <option>Retail</option>
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="description" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Description</label>
                          <textarea id="description" rows={3} className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo transition" defaultValue="Experience the authentic taste of Italy right in the heart of the city..."></textarea>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-charcoal dark:text-white mb-4 border-b border-gray-100 dark:border-white/10 pb-2">Contact & Location</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Phone Number</label>
                          <div className="relative">
                            <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                            <input id="phone" type="text" defaultValue="(555) 123-4567" className="w-full pl-10 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo transition" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="website" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Website</label>
                          <input id="website" type="text" defaultValue="www.rusticspoon.com" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo transition" />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block text-sm font-bold text-charcoal dark:text-white mb-2">Address</label>
                          <div className="relative">
                            <FaMapPin className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                            <input id="address" type="text" defaultValue="123 Main St, Downtown, New York, NY 10001" className="w-full pl-10 p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo transition" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button className="px-8 py-3 bg-indigo text-white font-bold rounded-xl hover:bg-indigo/90 transition shadow-lg shadow-indigo/20">
                        Save Changes
                      </button>
                    </div>
                 </div>
              </div>
            )}

          </div>

          {/* New Booking Modal */}
          {showBookingModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white dark:bg-charcoal rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-4">Create New Booking</h3>
                <div className="space-y-4">
                  <input type="text" aria-label="Customer Name" placeholder="Customer Name" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo" />
                  <input type="datetime-local" aria-label="Booking date and time" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo" />
                  <select aria-label="Select Service" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-indigo">
                    <option>Select Service</option>
                    <option>Dinner for 2</option>
                    <option>Private Event</option>
                  </select>
                </div>
                <div className="flex gap-3 justify-end mt-6">
                  <button 
                    onClick={() => setShowBookingModal(false)}
                    className="px-4 py-2 font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => { setShowBookingModal(false); alert('Booking created!'); }}
                    className="px-4 py-2 bg-indigo text-white font-bold rounded-lg hover:bg-indigo/90 transition"
                  >
                    Create Booking
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
