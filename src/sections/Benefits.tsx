import { Clock, LayoutGrid, Lock, MessageSquare, TrendingUp, Users } from 'lucide-react'
import FeatureCarousel from '../components/FeatureCarousel'
import Container from '../components/Container'
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
    <section id="beneficios" className="bg-brand-soft/40 py-24">
      <Container>
        <Reveal>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Beneficios</span>
              <h2 className="mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">Beneficios que se sienten desde el primer día</h2>
            </div>
            <p className="max-w-sm leading-relaxed text-ink-soft">Menos fricción para el equipo y más claridad para toda la institución.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={(index % 4) * 80}>
              <article className={`group h-full rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 ${index === 0 ? 'border-brand bg-brand text-white sm:col-span-2 lg:row-span-2 lg:flex lg:min-h-[315px] lg:flex-col lg:justify-end' : 'border-line bg-white hover:border-brand-accent'}`}>
                <span className={`flex h-11 w-11 items-center justify-center rounded-2xl ${index === 0 ? 'bg-white/15 text-white' : 'bg-brand-soft text-brand'}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <h3 className={`mt-7 text-base font-semibold ${index === 0 ? 'text-white sm:text-2xl' : 'text-ink'}`}>{title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${index === 0 ? 'max-w-md text-white/80 sm:text-base' : 'text-ink-soft'}`}>{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>

      <div className="mt-16">
        <FeatureCarousel />
      </div>
    </section>
  )
}