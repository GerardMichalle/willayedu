import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const steps = [
  {
    number: '01',
    title: 'Registra',
    description:
      'Configura aulas, estudiantes, docentes y apoderados. La matrícula se puede importar masivamente desde Excel',
  },
  {
    number: '02',
    title: 'Gestiona',
    description:
      'El estudiante pasa su tarjeta al entrar; el sistema registra la asistencia y alerta a la familia automáticamente',
  },
  {
    number: '03',
    title: 'Supervisa',
    description:
      'Consulta indicadores en tiempo real, publica libretas y comunicados, y descarga reportes cuando los necesites',
  },
]

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24">
      <Container>
        <Reveal>
          <SectionHeading eyebrow="¿Cómo funciona?" title="Tres pasos, sin curva de aprendizaje" />
        </Reveal>

        <div className="relative mt-16 grid gap-10 lg:grid-cols-3 lg:gap-8">
          <div
            aria-hidden="true"
            className="absolute top-6 right-0 left-0 hidden h-px bg-line lg:block"
          />
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 100}>
              <div className="relative flex flex-col gap-4 bg-warm lg:pr-6">
                <span className="font-display text-4xl font-medium text-brand-accent-2">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
                <p className="leading-relaxed text-ink-soft">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
