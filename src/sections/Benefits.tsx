import { Clock, LayoutGrid, Lock, MessageSquare, TrendingUp, Users } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const benefits = [
  { icon: Clock, title: 'Ahorro de tiempo', description: 'Menos tareas manuales y repetitivas para tu equipo administrativo' },
  { icon: LayoutGrid, title: 'Información organizada', description: 'Todo lo relevante del colegio en un solo lugar, siempre al día' },
  { icon: Lock, title: 'Mayor seguridad', description: 'Datos protegidos y accesos controlados por rol dentro de la institución' },
  { icon: MessageSquare, title: 'Comunicación eficiente', description: 'Familias y docentes informados en el momento, sin llamadas ni papeles' },
  { icon: Users, title: 'Mejor seguimiento de estudiantes', description: 'Asistencia, conducta y libretas conectadas en un mismo perfil' },
  { icon: TrendingUp, title: 'Decisiones basadas en información real', description: 'Reportes disponibles al instante para dirección y coordinación' },
]

export default function Benefits() {
  return (
    <section id="beneficios" className="bg-white py-24">
      <Container>
        <Reveal>
          <SectionHeading title="Beneficios que se sienten desde el primer día" />
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={(index % 3) * 80}>
              <div className="flex flex-col items-start gap-4 text-left">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold text-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
