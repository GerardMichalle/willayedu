import { Database, FileClock, KeyRound, Lock, QrCode, ShieldAlert, ShieldCheck, UserCheck } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'

const points = [
  { icon: Lock, title: 'Cifrado HTTPS', description: 'Toda la información viaja cifrada de extremo a extremo' },
  { icon: KeyRound, title: 'Contraseñas cifradas', description: 'Nadie, ni el administrador del sistema, puede verlas' },
  { icon: UserCheck, title: 'Cuentas verificadas', description: 'Ninguna cuenta se crea sin autorización del colegio: cada acceso nace de una matrícula o alta verificada' },
  { icon: ShieldCheck, title: 'Roles y permisos diferenciados', description: 'Cada persona ve únicamente lo que le corresponde' },
  { icon: Database, title: 'Datos aislados por colegio', description: 'La información de cada institución está completamente separada de las demás' },
  { icon: ShieldAlert, title: 'Protección contra accesos indebidos', description: 'El sistema detecta y bloquea intentos de acceso no autorizados' },
  { icon: FileClock, title: 'Registro de actividad', description: 'Cada acción queda registrada para fines de auditoría' },
  { icon: QrCode, title: 'Credenciales QR seguras', description: 'No exponen datos personales de los menores' },
]

export default function Security() {
  return (
    <section className="bg-white py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Seguridad"
            title="La información de tu institución protegida"
          />
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10">
          {points.map(({ icon: Icon, title, description }, index) => (
            <Reveal key={title} delay={(index % 4) * 70}>
              <div className="flex flex-col gap-3">
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="text-sm font-semibold text-ink">{title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mx-auto mt-14 max-w-2xl text-balance text-center text-sm leading-relaxed text-ink-faint">
            Willay cumple con la Ley N.° 29733 Ley de Protección de Datos Personales del Perú
            especialmente relevante al tratarse de información de menores de edad
          </p>
        </Reveal>
      </Container>
    </section>
  )
}
