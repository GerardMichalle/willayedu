import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import Hero from './sections/Hero'
import TrustBar from './sections/TrustBar'
import ProblemSolution from './sections/ProblemSolution'
import Features from './sections/Features'
import InteractiveShowcase from './sections/InteractiveShowcase'
import HowItWorks from './sections/HowItWorks'
import Benefits from './sections/Benefits'
import Audience from './sections/Audience'
import Security from './sections/Security'
import CTA from './sections/CTA'
import FAQ from './sections/FAQ'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-warm">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <Features />
        <InteractiveShowcase />
        <HowItWorks />
        <Benefits />
        <Audience />
        <Security />
        <CTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
