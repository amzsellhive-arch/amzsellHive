import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/sections/Hero'
import TrustBar from '../components/sections/TrustBar'
import ResultsGrid from '../components/sections/ResultsGrid'
import Positioning from '../components/sections/Positioning'
import Portfolio from '../components/sections/Portfolio'
import Services from '../components/sections/Services'
import HowItWorks from '../components/sections/HowItWorks'
import Testimonials from '../components/sections/Testimonials'
import FounderLetter from '../components/sections/FounderLetter'
import QualificationForm from '../components/sections/QualificationForm'
import FAQ from '../components/sections/FAQ'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Hook */}
        <Hero />
        {/* 2. Borrowed trust */}
        <TrustBar />
        {/* 3. Proof #1 — results */}
        <ResultsGrid />
        {/* 4. Positioning */}
        <Positioning />
        {/* 5. Portfolio / proof of craft */}
        <Portfolio />
        {/* 6. Services as outcomes */}
        <Services />
        {/* 7. How it works */}
        <HowItWorks />
        {/* 8. Proof #2 — testimonials */}
        <Testimonials />
        {/* 9. Emotional close */}
        <FounderLetter />
        {/* 10. Qualify */}
        <QualificationForm />
        {/* 11. Objection handling */}
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
