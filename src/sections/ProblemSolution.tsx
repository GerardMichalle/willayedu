import { Check, Minus } from 'lucide-react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'

const traditional = [
  'Registros manuales en cuaderno',
  'Información dispersa',
  'Seguimiento difícil',
  'Comunicación lenta con las familias',
  'Reportes que toman horas',
  'Libretas que se entregan solo en reunión presencial',
]

const withWillay = [
  'Asistencia automatizada por RFID',
  'Información centralizada',
  'Alertas inmediatas dentro de la plataforma',
  'Reportes en segundos',
  'Libretas disponibles en línea en cualquier momento',
]

export default function ProblemSolution() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-xl text-balance text-center text-3xl font-medium text-ink sm:text-4xl">
            De los registros en papel a la gestión en tiempo real
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-white p-8">
              <span className="text-sm font-semibold uppercase tracking-wide text-ink-faint">
                Gestión tradicional
              </span>
              <ul className="mt-6 flex flex-col gap-4">
                {traditional.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-soft">
                    <Minus className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="h-full rounded-2xl border border-line-pink bg-brand-soft p-8 shadow-[0_20px_45px_-30px_rgba(224,45,45,0.35)]">
              <span className="text-sm font-semibold uppercase tracking-wide text-brand-dark">
                Con Willay
              </span>
              <ul className="mt-6 flex flex-col gap-4">
                {withWillay.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
