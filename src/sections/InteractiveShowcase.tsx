import { Bell, BookOpen, FileSpreadsheet, ScanLine } from 'lucide-react'
import Container from '../components/Container'
import MockupFrame from '../components/MockupFrame'
import Reveal from '../components/Reveal'

const points = [
  { icon: ScanLine, text: 'Asistencia registrada en el momento en que el estudiante ingresa' },
  { icon: Bell, text: 'Alertas automáticas para la familia dentro de la plataforma' },
  { icon: BookOpen, text: 'Libretas y comunicados publicados en un par de clics' },
  { icon: FileSpreadsheet, text: 'Reportes listos para exportar cuando los necesites' },
]

const floatingBadges = [
  { text: 'Entrada registrada · 07:38', className: 'left-[-8%] top-10', delay: '0s' },
  { text: 'Libreta publicada', className: 'right-[-6%] top-[38%]', delay: '1.2s' },
  { text: 'Comunicado enviado', className: 'left-[-4%] bottom-24', delay: '2.4s' },
  { text: '98% de asistencia hoy', className: 'right-[2%] bottom-[-4%]', delay: '0.6s' },
]

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
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <MockupFrame
              label="Vista de control en vivo"
              alt="Vista de control en vivo de Willay mostrando asistencia, comunicados y libretas del día"
              dimensions="1400 × 1000 px"
            />

            {floatingBadges.map((badge) => (
              <div
                key={badge.text}
                aria-hidden="true"
                className={`animate-float absolute hidden rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-medium text-ink shadow-lg shadow-ink/5 lg:block ${badge.className}`}
                style={{ animationDelay: badge.delay }}
              >
                {badge.text}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
