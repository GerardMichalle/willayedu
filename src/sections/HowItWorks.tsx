import { ChartNoAxesCombined, Radio, Upload } from 'lucide-react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'

const steps = [
  {
    number: '01',
    icon: Upload,
    title: 'Registra',
    description: 'Configura aulas, estudiantes, docentes y apoderados. La matrícula se puede importar masivamente desde Excel',
  },
  {
    number: '02',
    icon: Radio,
    title: 'Gestiona',
    description: 'El estudiante pasa su tarjeta al entrar; el sistema registra la asistencia y alerta a la familia automáticamente',
  },
  {
    number: '03',
    icon: ChartNoAxesCombined,
    title: 'Supervisa',
    description: 'Consulta indicadores en tiempo real, publica libretas y comunicados, y descarga reportes cuando los necesites',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr] lg:items-end">
          <Reveal>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">¿Cómo funciona?</span>
              <h2 className="mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">Tres pasos sin curva de aprendizaje</h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
              Una implementación clara para que tu institución empiece a trabajar con orden desde el primer día
            </p>
          </Reveal>
        </div>

        <div className="relative mt-14 grid gap-5 lg:grid-cols-3">
          <div aria-hidden="true" className="absolute left-[16%] right-[16%] top-10 hidden border-t border-dashed border-brand-accent lg:block" />
          {steps.map(({ number, icon: Icon, title, description }, index) => (
            <Reveal key={number} delay={index * 100}>
              <article className="relative h-full rounded-3xl border border-line bg-white p-7 shadow-[0_18px_35px_-30px_rgba(31,27,24,0.35)] transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="font-display text-3xl text-brand-accent">{number}</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold text-ink">{title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}