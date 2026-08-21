import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import ResultsGrid from '@/components/sections/ResultsGrid';
import Positioning from '@/components/sections/Positioning';
import ServicesSection from '@/components/sections/Services';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import FounderLetter from '@/components/sections/FounderLetter';
import FAQ from '@/components/sections/FAQ';
import CTABand from '@/components/sections/CTABand';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <ResultsGrid />
        <Positioning />
        <ServicesSection />
        <HowItWorks />
        <Testimonials />
        <FounderLetter />
        <FAQ />
        <CTABand />
      </main>
      <Footer />
    </div>
  );
}
