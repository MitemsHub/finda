import { FaStore, FaCheck, FaCheckDouble } from 'react-icons/fa6';

export default function BusinessSection() {
  return (
    <section id="businesses" className="py-20 bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-teal rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-indigo rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-2 bg-teal/20 text-teal px-4 py-2 rounded-full mb-6">
              <FaStore className="text-sm" />
              <span className="text-sm font-semibold">For Business Owners</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Grow Your Business with Finda</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">Join thousands of businesses reaching more customers and increasing bookings through our premium platform.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center flex-shrink-0 mt-1">
                  <FaCheck className="text-white text-xs" />
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Premium Visibility</div>
                  <div className="text-gray-400">Get featured with verified badges and premium placement</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center flex-shrink-0 mt-1">
                  <FaCheck className="text-white text-xs" />
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Direct Customer Connection</div>
                  <div className="text-gray-400">Receive bookings and messages instantly from potential customers</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal flex items-center justify-center flex-shrink-0 mt-1">
                  <FaCheck className="text-white text-xs" />
                </div>
                <div>
                  <div className="text-white font-semibold mb-1">Analytics Dashboard</div>
                  <div className="text-gray-400">Track views, bookings, and customer engagement in real-time</div>
                </div>
              </li>
            </ul>
            <button className="px-8 py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition shadow-xl">List Your Business</button>
          </div>
          
          <div className="relative fade-in-up delay-1">
            <div className="glass-effect rounded-3xl p-6 shadow-2xl border border-white/20">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-charcoal dark:text-white">Business Dashboard</h3>
                  <div className="verified-badge rounded-full px-3 py-1 flex items-center gap-1">
                    <FaCheckDouble className="text-white text-xs" />
                    <span className="text-white text-xs font-semibold">Premium</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-teal/10 rounded-xl p-4">
                    <div className="text-3xl font-black text-teal mb-1">2,847</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Profile Views</div>
                  </div>
                  <div className="bg-indigo/10 rounded-xl p-4">
                    <div className="text-3xl font-black text-indigo mb-1">142</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Bookings</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-10 h-10 rounded-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="user avatar" />
                      <div>
                        <div className="text-sm font-semibold text-charcoal dark:text-white">Sarah Johnson</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Booked appointment</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">2m ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo/20 flex items-center justify-center text-indigo font-bold text-sm">MC</div>
                      <div>
                        <div className="text-sm font-semibold text-charcoal dark:text-white">Mike Chen</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Sent message</div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400">5m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
