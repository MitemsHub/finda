"use client";

import Header from '@/components/landing/Header';
import { FaCalendarCheck, FaTag, FaCircleInfo } from 'react-icons/fa6';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "Booking Confirmed",
      message: "Your dinner reservation at The Rustic Spoon has been confirmed for tonight at 7:00 PM.",
      time: "2 hours ago",
      read: false,
      icon: <FaCalendarCheck className="text-green-500" />
    },
    {
      id: 2,
      type: "promo",
      title: "Special Offer",
      message: "Get 20% off your next massage at Glow Spa & Wellness! Valid until Sunday.",
      time: "1 day ago",
      read: true,
      icon: <FaTag className="text-indigo" />
    },
    {
      id: 3,
      type: "system",
      title: "Welcome to Finda",
      message: "Thanks for joining! Complete your profile to get the most out of your experience.",
      time: "3 days ago",
      read: true,
      icon: <FaCircleInfo className="text-teal" />
    }
  ];

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-charcoal dark:text-white mb-2">Notifications</h1>
            <p className="text-gray-600 dark:text-gray-400">Stay updated with your activities</p>
          </div>
          <button className="text-teal font-bold hover:underline">Mark all as read</button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`bg-white dark:bg-white/5 p-6 rounded-2xl border ${notification.read ? 'border-gray-100 dark:border-white/10' : 'border-teal/30 bg-teal/5 dark:bg-teal/5'} transition hover:shadow-md flex gap-4`}>
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center flex-shrink-0 shadow-sm">
                {notification.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold ${notification.read ? 'text-charcoal dark:text-white' : 'text-teal'}`}>{notification.title}</h3>
                  <span className="text-xs text-gray-500">{notification.time}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{notification.message}</p>
              </div>
              {!notification.read && (
                <div className="w-3 h-3 bg-teal rounded-full mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
