import { FaHeart, FaStar } from 'react-icons/fa6';

export default function Testimonials() {
  const testimonials = [
    {
      text: "Finda made it so easy to discover local businesses I never knew existed. The booking feature is a game-changer!",
      name: "Emily Rodriguez",
      role: "Frequent User",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
      delay: "delay-1"
    },
    {
      text: "As a business owner, Finda helped us reach 300% more customers. The premium features are worth every penny.",
      name: "David Park",
      role: "Café Owner",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
      delay: "delay-2"
    },
    {
      text: "The map interface is brilliant! I can see all verified businesses around me and book instantly. Love this app!",
      name: "Jessica Taylor",
      role: "Professional",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg",
      delay: "delay-3"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-charcoal transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-indigo/10 text-indigo px-4 py-2 rounded-full mb-4">
            <FaHeart className="text-sm" />
            <span className="text-sm font-semibold">Testimonials</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-charcoal dark:text-white mb-4">Loved by Users & Businesses</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">See what our community has to say</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`glass-effect rounded-2xl p-8 border border-white/40 dark:border-white/10 fade-in-up ${testimonial.delay}`}>
              <div className="flex items-center gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">&quot;{testimonial.text}&quot;</p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-12 h-12 rounded-full object-cover" src={testimonial.avatar} alt="user avatar" />
                <div>
                  <div className="font-bold text-charcoal dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
