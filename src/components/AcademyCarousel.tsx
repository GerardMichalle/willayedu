import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type TouchEvent } from 'react'

export interface AcademySlide {
  src: string
  tag: string
  title: string
  detail: string
  alt: string
}

interface AcademyCarouselProps {
  slides: AcademySlide[]
  label: string
}

// Carrusel de las escenas del curso. Mismo comportamiento que el de la plataforma: avanza solo mientras se ve en pantalla,
// se detiene al pasar el mouse o enfocar, y no se mueve solo si la persona pidió menos movimiento.
export default function AcademyCarousel({ slides, label }: AcademyCarouselProps) {
  const total = slides.length
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback((next: number) => setIndex(((next % total) + total) % total), [total])

  useEffect(() => {
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused || !isInView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((current) => (current + 1) % total), 4500)
    return () => clearInterval(id)
  }, [isPaused, isInView, total])

  // La siguiente escena se descarga con anticipación para que el cambio sea instantáneo
  useEffect(() => {
    const image = new Image()
    image.src = slides[(index + 1) % total].src
  }, [index, slides, total])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goTo(index - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      goTo(index + 1)
    }
  }

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX
  }

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return
    const delta = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) > 40) goTo(delta < 0 ? index + 1 : index - 1)
  }

  const slide = slides[index]

  return (
    <div
      ref={containerRef}
      role="group"
      aria-roledescription="carrusel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className="relative isolate rounded-3xl outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand"
    >
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_28px_50px_-34px_rgba(31,27,24,0.45)]">
        <div className="aspect-[3/2] w-full bg-brand-soft">
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            width={240}
            height={160}
            decoding="async"
            className="animate-gallery-fade h-full w-full object-cover"
          />
        </div>

        <div className="border-t border-line px-5 py-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">{slide.tag}</p>
          <p className="mt-1 text-lg font-semibold text-ink">{slide.title}</p>
          <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{slide.detail}</p>
        </div>
      </div>

      <div className="relative z-10 mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Escena anterior"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-brand-soft"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a ${s.tag}: ${s.title}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-brand' : 'w-2 bg-ink-faint/40 hover:bg-ink-faint/70'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Escena siguiente"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-brand-soft"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>

      {/* Solo avisa a los lectores de pantalla cuando la persona cambia de escena (no con el avance automático) */}
      <p className="sr-only" aria-live={isPaused ? 'polite' : 'off'}>
        {`Escena ${index + 1} de ${total}: ${slide.tag}, ${slide.title}`}
      </p>
    </div>
  )
}
