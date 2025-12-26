import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import BusinessSection from '@/components/landing/BusinessSection';
import Testimonials from '@/components/landing/Testimonials';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-frost dark:bg-charcoal transition-colors duration-300">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <BusinessSection />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
