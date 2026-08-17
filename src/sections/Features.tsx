import { Bell, BookOpen, FileSpreadsheet, Megaphone, QrCode, ScanLine, ShieldCheck, Users } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const features = [
  {
    icon: ScanLine,
    title: 'Asistencia por RFID',
    description:
      'Cada estudiante pasa su tarjeta al ingresar. El sistema registra la hora y clasifica automáticamente puntualidad y tardanza según el horario del colegio',
  },
  {
    icon: Bell,
    title: 'Alertas en la plataforma',
    description:
      'Apoderados y docentes reciben avisos dentro de Willay ante un ingreso, un comunicado nuevo, una libreta publicada o un registro de conducta',
  },
  {
    icon: BookOpen,
    title: 'Libretas de notas digitales',
    description:
      'El tutor sube la libreta oficial cada bimestre. Las familias la consultan y descargan cuando quieran, sin esperar la reunión presencial',
  },
  {
    icon: Megaphone,
    title: 'Comunicados con seguimiento',
    description:
      'Envía comunicados institucionales o por aula, y verifica quién los ha leído y quién todavía no',
  },
  {
    icon: Users,
    title: 'Matrícula flexible',
    description:
      'Registra estudiantes uno por uno o importa el padrón completo desde Excel, con validación de errores antes de guardar',
  },
  {
    icon: QrCode,
    title: 'Credenciales con código QR',
    description:
      'Identificación digital que no expone datos personales del menor, pensada para el uso diario dentro del colegio',
  },
  {
    icon: FileSpreadsheet,
    title: 'Reportes en segundos',
    description:
      'Exporta el padrón de estudiantes y los registros de asistencia en Excel, listos para compartir con dirección',
  },
  {
    icon: ShieldCheck,
    title: 'Perfiles con permisos diferenciados',
    description:
      'Dirección, docentes, estudiantes, apoderados y personal administrativo: cada uno accede solo a lo que le corresponde',
  },
]

export default function Features() {
  return (
    <section id="caracteristicas" className="py-24">
      <Container>
        <Reveal>
          <SectionHeading title="Todo lo que necesitas para gestionar tu institución" />
        </Reveal>

        <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={(index % 3) * 80}>
              <div className="flex h-full flex-col gap-3 border-t-2 border-line pt-6">
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
