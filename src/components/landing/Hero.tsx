import { FaWandMagicSparkles, FaApple, FaGooglePlay, FaStar } from 'react-icons/fa6';
import MobileMockup from './MobileMockup';

export default function Hero() {
  return (
    <section id="hero-section" className="relative pt-32 pb-20 overflow-hidden bg-frost dark:bg-charcoal transition-colors duration-300">
      <div className="absolute inset-0 hero-gradient opacity-10"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full mb-6">
              <FaWandMagicSparkles className="text-sm" />
              <span className="text-sm font-semibold">Trusted by 50,000+ users</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-charcoal dark:text-white leading-tight mb-6">
              Discover & Connect with Local Businesses
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              Find verified businesses near you, book services instantly, and enjoy seamless transactions—all in one premium app.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
              <button className="w-full sm:w-auto px-8 py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal/90 transition flex items-center justify-center gap-3 shadow-lg">
                <FaApple className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </button>
              <button className="w-full sm:w-auto px-8 py-4 glass-dark text-white font-bold rounded-xl hover:bg-charcoal transition flex items-center justify-center gap-3 shadow-lg">
                <FaGooglePlay className="text-2xl" />
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </button>
            </div>
            <div className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-black text-charcoal dark:text-white">4.9</div>
                <div className="flex items-center gap-1 text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">App Rating</div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div className="text-3xl font-black text-charcoal dark:text-white">10K+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Businesses</div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-700"></div>
              <div>
                <div className="text-3xl font-black text-charcoal dark:text-white">50K+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Active Users</div>
              </div>
            </div>
          </div>
          
          <div className="relative fade-in-up delay-1 flex justify-center lg:justify-end">
            <MobileMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
