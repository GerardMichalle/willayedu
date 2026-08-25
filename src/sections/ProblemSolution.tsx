import { Check, Minus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Container from '../components/Container'
import MockupFrame from '../components/MockupFrame'
import Reveal from '../components/Reveal'
import comparisonVideo from '../assets/videos/dos.mp4'

const traditional = [
  'Registros fisicos de asistencia',
  'Información dispersa',
  'Seguimiento difícil',
  'Comunicación lenta con las familias',
  'Reportes que toman horas',
  'Libretas que se entregan solo en reunión presencial',
]

const withWillay = [
  'Asistencia automatizada por RFID',
  'Información centralizada, cursos gratuitos y pagos en línea',
  'Alertas inmediatas dentro de la plataforma',
  'Reportes en segundos',
  'Libretas disponibles en línea en cualquier momento',
]

type Tab = 'tradicional' | 'willay'

const AUTO_ROTATE_MS = 6000

export default function ProblemSolution() {
  const [tab, setTab] = useState<Tab>('tradicional')
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = cardRef.current
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
      setTab((current) => (current === 'tradicional' ? 'willay' : 'tradicional'))
    }, AUTO_ROTATE_MS)
    return () => clearInterval(id)
  }, [isPaused, isInView, tab])

  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-xl text-balance text-center text-3xl font-medium text-ink sm:text-4xl">
            De los registros fisicos a la gestión digital en tiempo real
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div className="relative min-h-80 lg:h-full">
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-brand-soft to-transparent"
              />
              <MockupFrame
                videoSrc={comparisonVideo}
                label="Gestión de Willay en video"
                alt="Video demostrativo de la plataforma Willay"
                aspect="h-full"
                className="h-full"
                showBrowserChrome={false}
              />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div
              ref={cardRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              className={`flex h-full flex-col rounded-2xl border p-8 transition-colors duration-300 ${
                tab === 'willay'
                  ? 'border-line-pink bg-brand-soft shadow-[0_20px_45px_-30px_rgba(224,45,45,0.35)]'
                  : 'border-line bg-white'
              }`}
            >
              <div className="inline-flex w-fit rounded-full border border-line bg-[#F7F5F3] p-1">
                <button
                  type="button"
                  onClick={() => setTab('tradicional')}
                  aria-pressed={tab === 'tradicional'}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    tab === 'tradicional' ? 'bg-white text-ink shadow-sm' : 'text-ink-faint hover:text-ink-soft'
                  }`}
                >
                  Gestión tradicional
                </button>
                <button
                  type="button"
                  onClick={() => setTab('willay')}
                  aria-pressed={tab === 'willay'}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    tab === 'willay' ? 'bg-brand text-white shadow-sm' : 'text-ink-faint hover:text-ink-soft'
                  }`}
                >
                  Con Willay
                </button>
              </div>

              <div className="mt-3 h-1 w-40 max-w-full overflow-hidden rounded-full bg-line" aria-hidden="true">
                <div
                  key={tab}
                  className={`h-full origin-left rounded-full animate-tab-progress ${
                    tab === 'willay' ? 'bg-brand' : 'bg-ink-faint'
                  }`}
                  style={{ animationPlayState: isPaused || !isInView ? 'paused' : 'running' }}
                />
              </div>

              <div key={tab} className="animate-gallery-fade mt-6 flex flex-1 flex-col justify-center">
                {tab === 'tradicional' ? (
                  <ul className="flex flex-col gap-4">
                    {traditional.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-soft">
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {withWillay.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand">
                          <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
