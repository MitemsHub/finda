"use client";

import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { FaUsers, FaHandshake, FaLightbulb, FaRocket } from 'react-icons/fa6';
import Image from 'next/image';

export default function AboutUs() {
  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Business Partners", value: "2,000+" },
    { label: "Cities Covered", value: "15+" },
    { label: "Bookings Made", value: "1M+" },
  ];

  const values = [
    {
      icon: <FaUsers />,
      title: "Community First",
      description: "We build for people. Our platform is designed to strengthen local connections and foster community growth."
    },
    {
      icon: <FaHandshake />,
      title: "Trust & Transparency",
      description: "We verify every business and ensure honest reviews, creating a safe environment for everyone."
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation",
      description: "We're constantly improving our technology to make discovering and booking local services effortless."
    },
  ];

  return (
    <div className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-teal/5 dark:bg-teal/10 -skew-x-12 transform translate-x-1/4"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-teal/10 text-teal px-4 py-2 rounded-full mb-6 font-semibold">
                  <FaRocket className="text-sm" />
                  <span>Our Mission</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-black text-charcoal dark:text-white leading-tight mb-6">
                  Connecting You with <span className="text-teal">Local Excellence</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  Finda is more than just a directory. We&apos;re on a mission to revolutionize how people discover, trust, and engage with local businesses, making quality services accessible to everyone.
                </p>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
                  <Image 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Team collaboration" 
                    width={800}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-charcoal p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 max-w-xs">
                  <p className="font-bold text-charcoal dark:text-white mb-2">&quot;Finda has transformed how we operate our local business.&quot;</p>
                  <p className="text-sm text-gray-500">- Sarah Jenkins, Owner of Glow Spa</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-white/5 border-y border-gray-100 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-teal mb-2">{stat.value}</div>
                  <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-charcoal dark:text-white mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                These principles guide every decision we make and every feature we build.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-gray-100 dark:border-white/10 hover:shadow-xl transition duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center text-teal text-2xl mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-charcoal dark:text-white mb-3">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-charcoal dark:text-white mb-4">Meet the Team</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                The passionate individuals working behind the scenes to make Finda possible.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div key={item} className="group relative overflow-hidden rounded-3xl">
                  <Image 
                    src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-${item + 2}.jpg`}
                    alt={`Team Member ${item}`}
                    width={400}
                    height={500}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-8">
                    <h3 className="text-white text-xl font-bold">Alex Morgan</h3>
                    <p className="text-gray-300">Co-Founder & CEO</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
