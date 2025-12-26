import { FaLightbulb, FaMagnifyingGlass, FaHandPointer, FaRocket } from 'react-icons/fa6';

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaMagnifyingGlass className="text-white text-3xl" />,
      number: "1",
      title: "Search & Discover",
      desc: "Browse the map or use smart search to find verified businesses near you.",
      delay: "delay-1"
    },
    {
      icon: <FaHandPointer className="text-white text-3xl" />,
      number: "2",
      title: "View Details",
      desc: "Check business profiles, ratings, location, and available services.",
      delay: "delay-2"
    },
    {
      icon: <FaRocket className="text-white text-3xl" />,
      number: "3",
      title: "Book & Connect",
      desc: "Instantly book services, call, or message businesses directly from the app.",
      delay: "delay-3"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-teal/5 to-indigo/5 dark:from-teal/5 dark:to-indigo/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center gap-2 bg-indigo/10 text-indigo px-4 py-2 rounded-full mb-4">
            <FaLightbulb className="text-sm" />
            <span className="text-sm font-semibold">Simple Process</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-charcoal dark:text-white mb-4">How Finda Works</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Get started in three simple steps</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className={`text-center fade-in-up ${step.delay}`}>
              <div className="relative inline-block mb-6">
                <div className="w-24 h-24 rounded-2xl hero-gradient flex items-center justify-center shadow-xl">
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-charcoal rounded-full flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-800">
                  <span className="text-teal font-black text-lg">{step.number}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-charcoal dark:text-white mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
