import { Briefcase, Building2, ClipboardList, GraduationCap, Users } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
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
        <Reveal>
          <SectionHeading title="Para quién está diseñado" />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {profiles.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={index * 70}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6">
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden="true" />
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
