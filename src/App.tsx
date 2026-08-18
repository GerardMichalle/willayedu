import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import Hero from './sections/Hero'
import TrustBar from './sections/TrustBar'
import ProblemSolution from './sections/ProblemSolution'
import Features from './sections/Features'
import InteractiveShowcase from './sections/InteractiveShowcase'
import HowItWorks from './sections/HowItWorks'
import Courses from './sections/Courses'
import Security from './sections/Security'
import CTA from './sections/CTA'
import FAQ from './sections/FAQ'
import Terms from './pages/Terms'
import SurveyDashboard from './pages/SurveyDashboard'
import ExperienceSurvey from './components/ExperienceSurvey'

export default function App() {
  if (window.location.pathname === '/admin/encuesta') {
    return <SurveyDashboard />
  }

  if (window.location.pathname === '/terminos-y-condiciones') {
    return <Terms />
  }

  return (
    <div className="flex min-h-screen flex-col select-none bg-warm">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <Features />
        <InteractiveShowcase />
        <HowItWorks />
        <Courses />
        <Security />
        <CTA />
        <FAQ />
      </main>
      <Footer />
      <ExperienceSurvey />
    </div>
  )
}