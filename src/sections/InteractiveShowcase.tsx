import { Bell, BookOpen, ChevronLeft, ChevronRight, FileSpreadsheet, ScanLine } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import MockupFrame from '../components/MockupFrame'
import Reveal from '../components/Reveal'
import panelPrincipalScreenshot from '../assets/screenshots/panelprincipal.png'
import modoProfesorScreenshot from '../assets/screenshots/modo_profesor.png'
import modoLibretasScreenshot from '../assets/screenshots/modo_profesor3.png'
import modoEstudianteScreenshot from '../assets/screenshots/modoestudiante2.png'

const points = [
  { icon: ScanLine, text: 'Asistencia registrada en el momento en que el estudiante ingresa' },
  { icon: Bell, text: 'Alertas automáticas para la familia dentro de la plataforma' },
  { icon: BookOpen, text: 'Libretas y comunicados publicados en un par de clics' },
  { icon: FileSpreadsheet, text: 'Reportes listos para exportar cuando los necesites' },
]

const floatingBadges = [
  { text: 'Entrada registrada · 07:38', className: 'left-2 top-3 lg:left-[-2%] lg:top-[24%]', delay: '0s' },
  { text: 'Libreta publicada', className: 'right-2 top-3 lg:right-[-2%] lg:top-[46%]', delay: '1.2s' },
  { text: 'Comunicado enviado', className: 'left-2 bottom-3 lg:left-[1%] lg:bottom-[18%]', delay: '2.4s' },
  { text: '98% de asistencia hoy', className: 'right-2 bottom-16 lg:right-[3%] lg:bottom-[9%]', delay: '0.6s' },
]

const slides = [
  {
    src: panelPrincipalScreenshot,
    label: 'Vista de control en vivo',
    alt: 'Vista de control en vivo de Willay mostrando asistencia, comunicados y libretas del día',
  },
  {
    src: modoProfesorScreenshot,
    label: 'Vista del profesor',
    alt: 'Panel del profesor en Willay con asistencia en vivo y acciones rápidas del aula',
  },
  {
    src: modoLibretasScreenshot,
    label: 'Libretas y notas',
    alt: 'Carga de libretas digitales por el profesor en Willay',
  },
  {
    src: modoEstudianteScreenshot,
    label: 'Vista del estudiante',
    alt: 'Perfil del estudiante en Willay con tarjeta digital, código QR y asistencia',
  },
]

function ShowcaseCarousel() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused || !isInView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, 4500)
    return () => clearInterval(id)
  }, [isPaused, isInView])

  const goTo = (nextIndex: number) => {
    setIndex((nextIndex + slides.length) % slides.length)
  }

  const slide = slides[index]

  return (
    <div
      ref={containerRef}
      className="relative isolate"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div key={slide.label} className="animate-gallery-fade lg:pt-8">
        <MockupFrame
          src={slide.src}
          label={slide.label}
          alt={slide.alt}
          aspect="aspect-[1901/904]"
          zoomable
        />
      </div>

      {index === 0 &&
        floatingBadges.map((badge) => (
          <div
            key={badge.text}
            aria-hidden="true"
            className={`animate-float absolute z-40 rounded-xl border border-line bg-white px-3 py-2 text-[11px] font-medium text-ink shadow-lg shadow-ink/5 lg:px-4 lg:py-2.5 lg:text-xs ${badge.className}`}
            style={{ animationDelay: badge.delay }}
          >
            {badge.text}
          </div>
        ))}

      <div className="relative z-10 mt-5 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Captura anterior"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-brand-soft"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.label}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a ${s.label}`}
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
          aria-label="Siguiente captura"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-brand-soft"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default function InteractiveShowcase() {
  return (
    <section className="bg-brand-soft/40 py-24">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <h2 className="text-3xl font-medium text-ink sm:text-4xl">
            Una plataforma diseñada para simplificar tu día
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
            Desde el ingreso del estudiante hasta el reporte que llega a dirección, Willay conecta
            cada paso de la gestión diaria en una sola vista
          </p>

          <ul className="mt-8 flex flex-col gap-5">
            {points.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-sm">
                  <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="pt-1.5 text-ink-soft">{text}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="mx-auto w-full max-w-md lg:max-w-[720px]">
            <div className="lg:mx-auto lg:w-[80%]">
              <ShowcaseCarousel />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
