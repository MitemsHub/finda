import { FaBolt, FaMapLocationDot, FaCheck, FaCalendarCheck, FaMessage, FaFilter, FaBookmark } from 'react-icons/fa6';

export default function Features() {
  const features = [
    {
      icon: <FaMapLocationDot className="text-teal text-2xl" />,
      bg: "bg-teal/10",
      title: "Map-First Discovery",
      desc: "Interactive map view with custom pins showing verified businesses in your area with real-time updates.",
      delay: "delay-1"
    },
    {
      icon: <FaCheck className="text-indigo text-2xl" />,
      bg: "bg-indigo/10",
      title: "Verified Businesses",
      desc: "Only trusted, verified businesses with premium badges ensuring quality and reliability.",
      delay: "delay-2"
    },
    {
      icon: <FaCalendarCheck className="text-teal text-2xl" />,
      bg: "bg-teal/10",
      title: "Instant Booking",
      desc: "Book appointments, reserve tables, or schedule services directly within the app in seconds.",
      delay: "delay-3"
    },
    {
      icon: <FaMessage className="text-indigo text-2xl" />,
      bg: "bg-indigo/10",
      title: "In-App Messaging",
      desc: "Chat directly with businesses, ask questions, and get instant responses without leaving the app.",
      delay: "delay-1"
    },
    {
      icon: <FaFilter className="text-teal text-2xl" />,
      bg: "bg-teal/10",
      title: "Smart Filters",
      desc: "Advanced filtering by category, distance, rating, and availability to find exactly what you need.",
      delay: "delay-2"
    },
    {
      icon: <FaBookmark className="text-indigo text-2xl" />,
      bg: "bg-indigo/10",
      title: "Save Favorites",
      desc: "Bookmark your favorite businesses and access them quickly for future visits and bookings.",
      delay: "delay-3"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white dark:bg-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full mb-4">
            <FaBolt className="text-sm" />
            <span className="text-sm font-semibold">Powerful Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-charcoal dark:text-white mb-4">Everything You Need in One App</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Discover, connect, and transact with local businesses effortlessly</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className={`glass-effect rounded-2xl p-8 border border-white/40 dark:border-white/10 hover:border-teal/40 transition fade-in-up ${feature.delay}`}>
              <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
