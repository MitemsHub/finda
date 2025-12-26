import { FaApple, FaGooglePlay } from 'react-icons/fa6';

export default function CTA() {
  return (
    <section id="cta-section" className="py-20 bg-gradient-to-br from-teal to-indigo relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-900 rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 fade-in-up">
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">Ready to Discover Amazing Businesses?</h2>
        <p className="text-xl text-white/90 mb-10 leading-relaxed">Join 50,000+ users finding and connecting with verified local businesses</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-teal font-bold rounded-xl hover:bg-gray-50 transition flex items-center justify-center gap-3 shadow-xl">
            <FaApple className="text-2xl" />
            <div className="text-left">
              <div className="text-xs opacity-70">Download on the</div>
              <div className="text-lg font-bold">App Store</div>
            </div>
          </button>
          <button className="w-full sm:w-auto px-8 py-4 glass-dark text-white font-bold rounded-xl hover:bg-charcoal transition flex items-center justify-center gap-3 shadow-xl border border-white/20">
            <FaGooglePlay className="text-2xl" />
            <div className="text-left">
              <div className="text-xs opacity-80">Get it on</div>
              <div className="text-lg font-bold">Google Play</div>
            </div>
          </button>
        </div>
        <p className="text-white/80 text-sm">Available for iOS 14+ and Android 10+</p>
      </div>
    </section>
  );
}
