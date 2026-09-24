import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 400)

    updateVisibility()
    window.addEventListener('scroll', updateVisibility, { passive: true })
    return () => window.removeEventListener('scroll', updateVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      title="Volver al inicio"
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand/15 bg-brand text-white shadow-lg shadow-brand/25 transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 focus-visible:outline-offset-4 sm:bottom-7 sm:right-7 ${
        isVisible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
    </button>
  )
}
