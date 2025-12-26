import { FaMagnifyingGlass, FaSliders, FaPhoneVolume, FaLocationDot, FaMessage, FaCheck } from 'react-icons/fa6';

export default function MobileMockup() {
  return (
    <div className="relative z-10 float-animation">
      <div className="glass-effect rounded-[3rem] p-8 shadow-2xl border border-white/40 dark:border-white/10">
        <div id="mobile-mockup" className="bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-xl w-[375px] h-[750px] relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            className="absolute inset-0 w-full h-full object-cover" 
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/11d7535d88-f3f2e4696cf15da66ff2.png" 
            alt="a stylized, dark mode map of a city with glowing teal location pins, minimalist design, for a business discovery app" 
          />
          
          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 z-20">
            <div className="glass-dark border border-white/10 rounded-full px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaMagnifyingGlass className="text-gray-400" />
                <span className="text-gray-300">Search businesses...</span>
              </div>
              <FaSliders className="text-teal" />
            </div>
          </div>

          {/* Bottom Sheet */}
          <div id="bottom-sheet" className="absolute bottom-0 left-0 right-0 z-10 p-2">
            <div className="glass-dark border border-white/10 rounded-t-3xl p-4">
              <div className="w-10 h-1.5 bg-gray-600 rounded-full mx-auto mb-4"></div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-white text-lg">Top Recommended</h3>
                <a href="#" className="text-teal text-sm font-semibold">See All</a>
              </div>
              <div className="space-y-3">
                
                {/* Card 1 */}
                <div className="bg-gray-800/50 border border-indigo-500/50 rounded-xl p-3 shadow-lg premium-glow">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/c007ccc27d-d395eaa8381ae2973019.png" alt="modern, vibrant cafe interior" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-white">Artisan Roast</h4>
                            <div className="verified-badge px-2 py-0.5 rounded-full flex items-center gap-1">
                              <FaCheck className="text-white text-[10px]" />
                            </div>
                          </div>
                          <span className="text-xs bg-teal/20 text-teal px-2 py-0.5 rounded-full font-medium">Café</span>
                        </div>
                        <button aria-label="Call Business" className="w-8 h-8 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white hover:bg-teal transition">
                          <FaPhoneVolume className="text-xs" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-gray-400 flex items-center gap-1.5"><FaLocationDot className="text-gray-500" /> 1.2km away</p>
                        <button className="text-xs bg-teal text-white font-bold py-1.5 px-3 rounded-md hover:bg-teal/80 transition">Quick Book</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gray-800/50 border border-white/10 rounded-xl p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img className="w-full h-full object-cover" src="https://storage.googleapis.com/uxpilot-auth.appspot.com/bb905df910-4a1484767a9542fd5a01.png" alt="cozy bookstore" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-white">The Book Nook</h4>
                          <span className="text-xs bg-indigo/20 text-indigo px-2 py-0.5 rounded-full font-medium">Bookstore</span>
                        </div>
                        <button aria-label="Message Business" className="w-8 h-8 rounded-full glass-dark border border-white/10 flex items-center justify-center text-white hover:bg-teal transition">
                          <FaMessage className="text-xs" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-xs text-gray-400 flex items-center gap-1.5"><FaLocationDot className="text-gray-500" /> 2.5km away</p>
                        <button className="text-xs bg-gray-600 text-white font-bold py-1.5 px-3 rounded-md hover:bg-gray-500 transition">Message</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Blobs */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-teal/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-indigo/20 rounded-full blur-3xl"></div>
    </div>
  );
}
