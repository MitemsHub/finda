"use client";

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaStar, FaLocationDot, FaMapLocationDot, FaPhone, FaShareNodes, FaHeart, FaRegHeart, FaClock } from 'react-icons/fa6';

export default function BusinessProfile({ params }: { params: { id: string } }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('services');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // Mock Data (In a real app, fetch based on params.id)
  // Ensure icons are correctly imported before usage
  const business = {
    id: params.id,
    name: "The Rustic Spoon",
    category: "Restaurant",
    rating: 4.8,
    reviewCount: 124,
    address: "123 Main St, Downtown, New York, NY 10001",
    phone: "(555) 123-4567",
    website: "www.rusticspoon.com",
    description: "Experience the authentic taste of Italy right in the heart of the city. We serve handmade pasta, wood-fired pizzas, and a curated selection of fine wines. Our cozy atmosphere is perfect for romantic dinners or family gatherings.",
    hours: "Open • Closes 10 PM",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    ],
    services: [
      { name: "Dinner Reservation", price: "Free", duration: "2 hrs" },
      { name: "Private Event Hosting", price: "From $500", duration: "4 hrs" },
      { name: "Catering Service", price: "Custom", duration: "Varies" }
    ],
    reviews: [
      { user: "Sarah J.", rating: 5, date: "2 days ago", text: "Absolutely delicious! The carbonara is to die for." },
      { user: "Mike T.", rating: 4, date: "1 week ago", text: "Great atmosphere, but the service was a bit slow on a busy night." }
    ]
  };

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />

      <main className="pt-20 pb-20">
        {/* Hero Gallery */}
        <div className="h-[40vh] md:h-[50vh] relative group">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-1">
            <div className="col-span-2 row-span-2 relative overflow-hidden">
               <Image src={business.images[0]} alt="Main" fill className="object-cover" />
               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition"></div>
            </div>
            <div className="col-span-1 row-span-2 relative overflow-hidden hidden md:block">
               <Image src={business.images[1]} alt="Side 1" fill className="object-cover" />
            </div>
            <div className="col-span-1 row-span-2 relative overflow-hidden hidden md:block">
               <Image src={business.images[2]} alt="Side 2" fill className="object-cover" />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-10 flex items-end justify-between">
            <div className="text-white">
              <div className="inline-block px-3 py-1 bg-teal rounded-full text-xs font-bold mb-3">{business.category}</div>
              <h1 className="text-3xl md:text-5xl font-bold mb-2">{business.name}</h1>
              <div className="flex items-center gap-4 text-sm md:text-base">
                <div className="flex items-center gap-1 text-yellow-400">
                  <FaStar /> <span className="font-bold">{business.rating}</span> ({business.reviewCount} reviews)
                </div>
                <div className="flex items-center gap-1">
                  <FaLocationDot /> {business.address}
                </div>
                <div className="flex items-center gap-1 text-green-400 font-bold">
                  <FaClock /> {business.hours}
                </div>
              </div>
            </div>
            <div className="flex gap-3">
               <button 
                 type="button"
                 aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                 onClick={() => setIsFavorite(!isFavorite)}
                 className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition"
               >
                 {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
               </button>
               <button type="button" aria-label="Share business" className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-teal transition">
                 <FaShareNodes />
               </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-white/10">
              {['Services', 'About', 'Reviews'].map((tab) => (
                <button
                  type="button"
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`px-6 py-3 font-semibold text-sm transition relative ${
                    activeTab === tab.toLowerCase() 
                      ? 'text-teal' 
                      : 'text-gray-500 hover:text-charcoal dark:hover:text-white'
                  }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-teal rounded-t-full"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Content Sections */}
            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-white/10">
              {activeTab === 'about' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-2xl font-bold text-charcoal dark:text-white">About {business.name}</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {business.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                        <FaLocationDot />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase text-gray-400">Address</div>
                        <div>{business.address}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                      <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal">
                        <FaPhone />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase text-gray-400">Phone</div>
                        <div>{business.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'services' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                  <h2 className="text-2xl font-bold text-charcoal dark:text-white">Services & Pricing</h2>
                  <div className="space-y-4">
                    {business.services.map((service, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-gray-100 dark:border-white/10 rounded-xl hover:border-teal/30 transition group cursor-pointer">
                        <div>
                          <h3 className="font-bold text-charcoal dark:text-white group-hover:text-teal transition">{service.name}</h3>
                          <div className="text-sm text-gray-500">{service.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-charcoal dark:text-white">{service.price}</div>
                          <button type="button" className="text-xs font-bold text-teal hover:underline">Book Now</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                   <div className="flex items-center justify-between">
                     <h2 className="text-2xl font-bold text-charcoal dark:text-white">Customer Reviews</h2>
                     <button className="px-4 py-2 text-sm font-bold text-teal border border-teal rounded-lg hover:bg-teal hover:text-white transition">Write a Review</button>
                   </div>
                   
                   <div className="space-y-6">
                     {business.reviews.map((review, idx) => (
                       <div key={idx} className="border-b border-gray-100 dark:border-white/10 pb-6 last:border-0 last:pb-0">
                         <div className="flex justify-between items-start mb-2">
                           <div className="flex items-center gap-2">
                             <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
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
                         <p className="text-gray-600 dark:text-gray-300 italic">&quot;{review.text}&quot;</p>
                       </div>
                     ))}
                   </div>
                </div>
              )}
            </div>

            {/* Location Map Section */}
            <div className="bg-white dark:bg-white/5 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-white/10">
              <h2 className="text-2xl font-bold text-charcoal dark:text-white mb-6 flex items-center gap-2">
                <FaMapLocationDot className="text-teal" /> Location
              </h2>
              <div className="aspect-video w-full bg-gray-200 dark:bg-white/5 rounded-xl overflow-hidden relative group">
                {/* Placeholder Map Image */}
                <Image 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Map Location" 
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="px-6 py-3 bg-white text-charcoal font-bold rounded-xl shadow-lg hover:bg-gray-50 transition flex items-center gap-2 transform hover:scale-105 duration-200">
                    <FaLocationDot className="text-teal" />
                    Get Directions
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm p-3 rounded-lg text-sm font-medium shadow-sm">
                  {business.address}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar (Booking/Contact) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/10 shadow-xl shadow-teal/5">
                <h3 className="text-xl font-bold text-charcoal dark:text-white mb-4">Book an Appointment</h3>
                <div className="space-y-4">
                  <input type="date" aria-label="Select booking date" className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-teal transition" />
                  <select 
                    aria-label="Select Service" 
                    className="w-full p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl outline-none focus:border-teal transition"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Select Service</option>
                    {business.services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                  </select>
                  <button 
                    type="button" 
                    onClick={() => setShowBookingModal(true)}
                    className="w-full py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-lg shadow-teal/20"
                  >
                    Check Availability
                  </button>
                  <div className="text-center text-xs text-gray-400">
                    No payment required to book
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo to-purple p-6 rounded-2xl text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-2">Claim This Business?</h3>
                  <p className="text-sm text-white/80 mb-4">Manage this profile, respond to reviews, and track booking analytics.</p>
                  <button type="button" className="px-4 py-2 bg-white text-indigo font-bold rounded-lg text-sm hover:bg-indigo-50 transition">
                    Claim Now
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-charcoal rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-4">Book Appointment</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Booking functionality coming soon.
              </p>
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 py-2 bg-teal text-white font-bold rounded-lg hover:bg-teal/90 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
