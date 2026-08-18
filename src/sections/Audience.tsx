import { Briefcase, Building2, ClipboardList, GraduationCap, Users } from 'lucide-react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'

const profiles = [
  { icon: Building2, title: 'Directores', description: 'Visión completa de la institución, sin depender de reportes de terceros' },
  { icon: Briefcase, title: 'Administradores', description: 'Gestión de matrícula, aulas y usuarios desde un solo panel' },
  { icon: ClipboardList, title: 'Docentes', description: 'Registro de asistencia, conducta y libretas sin papeleo adicional' },
  { icon: Users, title: 'Apoderados', description: 'Alertas y seguimiento del estudiante desde cualquier dispositivo' },
  { icon: GraduationCap, title: 'Estudiantes', description: 'Acceso a sus libretas y comunicados con su propia credencial digital' },
]

export default function Audience() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_2fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">Comunidad</span>
              <h2 className="mt-4 text-3xl font-medium leading-tight text-ink sm:text-4xl">Para quién está diseñado</h2>
              <p className="mt-5 max-w-sm leading-relaxed text-ink-soft">Una sola plataforma, con una vista clara para cada persona que forma parte del colegio.</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {profiles.map(({ icon: Icon, title, description }, index) => (
              <Reveal
                key={title}
                delay={(index % 2) * 90}
                className={index === profiles.length - 1 ? 'sm:col-span-2 sm:w-[calc(50%-0.5rem)] sm:justify-self-center' : ''}
              >
                <article className="group flex h-full gap-5 rounded-2xl border border-line bg-white p-6 transition-all duration-300 hover:border-brand-accent hover:shadow-[0_18px_35px_-30px_rgba(31,27,24,0.4)]">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-brand-accent-2">0{index + 1}</span>
                    <h3 className="mt-1 text-lg font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}