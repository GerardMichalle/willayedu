import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react'
import Container from '../components/Container'
import Footer from '../layouts/Footer'
import Logo from '../components/Logo'

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col bg-warm">
      <header className="border-b border-line bg-white/90 backdrop-blur-md">
        <Container className="flex h-20 items-center justify-between py-4 lg:h-24">
          <a href="/" className="flex items-center" aria-label="Willay, volver al inicio">
            <Logo className="h-9 w-9 lg:h-10 lg:w-10" withWordmark />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-base font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Volver al inicio
          </a>
        </Container>
      </header>

      <main className="flex-1 py-16 sm:py-20">
        <Container className="max-w-4xl">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2 text-brand">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">Información legal</span>
            </div>

            <h1 className="mt-6 text-4xl font-medium leading-tight text-ink sm:text-5xl">
              Términos y condiciones
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Willay es una herramienta que tu colegio contrata para su gestión interna. Si eres
              alumno o apoderado, tu acceso a la plataforma depende de que el colegio te haya dado
              de alta — no existe un registro público ni autoservicio para crear una cuenta.
            </p>

            <div className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
                <div className="text-sm leading-relaxed text-ink-soft">
                  <p className="font-medium text-ink">Información del proveedor</p>
                  <p className="mt-1">Willay es operada por un CEO, con atención a través de willaysoporte@gmail.com.</p>
                  <p className="mt-2 text-ink-faint">Última actualización: 13 de septiembre de 2026.</p>
                </div>
              </div>
            </div>

            <article className="mt-10 select-text space-y-9 text-[15px] leading-7 text-ink-soft sm:text-base">
              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">1. Quién ofrece el servicio</h2>
                <p className="mt-3">
                  Willay es un sistema de gestión escolar (control de asistencia por tarjeta
                  RFID/NFC o código QR, libreta virtual, comunicados y reportes) contratado por
                  colegios para su uso interno. Estos Términos rigen el uso del sitio web y de la
                  aplicación móvil Willay para Android por parte del personal del colegio,
                  docentes, alumnos y apoderados.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">2. Cuentas de usuario</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Las cuentas las crea el colegio (o un administrador autorizado por este) — no hay registro abierto al público.</li>
                  <li>Cada usuario es responsable de mantener la confidencialidad de su contraseña y de toda actividad realizada desde su cuenta.</li>
                  <li>Un alumno menor de edad accede a la plataforma únicamente con el conocimiento y autorización de su padre, madre o apoderado, otorgada al colegio al momento de la matrícula.</li>
                  <li>El colegio puede solicitar la suspensión o eliminación de una cuenta en cualquier momento (por ejemplo, al retirarse un estudiante o egresar un docente).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">3. Uso aceptable</h2>
                <p className="mt-3">Al usar Willay, te comprometes a:</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Usar la plataforma únicamente para los fines de gestión escolar para los que fue provista.</li>
                  <li>No intentar acceder a información de otros alumnos, familias o colegios distintos a los que tu rol permite ver.</li>
                  <li>No compartir tu credencial de acceso (usuario/contraseña) con terceros.</li>
                  <li>No usar el escáner de QR ni ninguna función de la app para registrar asistencia falsa o suplantar a otro estudiante.</li>
                  <li>
                    Reportar de inmediato cualquier uso indebido o vulnerabilidad detectada,
                    escribiendo a{' '}
                    <a href="mailto:willaysoporte@gmail.com" className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                      willaysoporte@gmail.com
                    </a>.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">4. Permisos de la aplicación móvil</h2>
                <p className="mt-3">
                  La app Android solicita los siguientes permisos, cada uno con un propósito
                  específico y sin uso alternativo:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li><strong className="text-ink">Cámara:</strong> exclusivamente para escanear el código QR de una credencial y registrar una entrada/salida.</li>
                  <li><strong className="text-ink">Notificaciones:</strong> para avisos de asistencia y comunicados del colegio, si el usuario decide activarlas.</li>
                  <li><strong className="text-ink">Internet:</strong> para comunicarse con el sistema del colegio.</li>
                </ul>
                <p className="mt-3">
                  Ningún permiso se usa para publicidad, rastreo entre apps, ni se vende a
                  terceros. Ver el detalle completo en nuestra{' '}
                  <a href="/politica-de-privacidad" className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                    Política de Privacidad
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">5. Disponibilidad del servicio</h2>
                <p className="mt-3">
                  Hacemos nuestro mejor esfuerzo para mantener la plataforma disponible, pero no
                  garantizamos un funcionamiento ininterrumpido. La app móvil está diseñada para
                  conservar localmente una lectura de asistencia que no pudo enviarse por falta de
                  conexión, y sincronizarla automáticamente en cuanto la conexión se restablece.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">6. Propiedad del contenido</h2>
                <p className="mt-3">
                  Los datos académicos y de asistencia que se registran en la plataforma
                  pertenecen al colegio que los generó, en su calidad de titular del banco de
                  datos personales correspondiente. Willay conserva la propiedad del software,
                  marca y diseño de la plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">7. Limitación de responsabilidad</h2>
                <p className="mt-3">
                  Willay es una herramienta de apoyo a la gestión escolar. El colegio mantiene la
                  responsabilidad final sobre las decisiones académicas y administrativas que
                  tome usando la información del sistema. Willay no se hace responsable por
                  decisiones tomadas exclusivamente en base a la plataforma sin la verificación
                  correspondiente del colegio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">8. Cambios a estos Términos</h2>
                <p className="mt-3">
                  Podemos actualizar estos Términos para reflejar cambios en el servicio o en la
                  normativa aplicable. La fecha de "Última actualización" en la parte superior
                  indica la versión vigente.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">9. Contacto</h2>
                <p className="mt-3">
                  Correo:{' '}
                  <a href="mailto:willaysoporte@gmail.com" className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                    willaysoporte@gmail.com
                  </a>.
                </p>
              </section>
            </article>
          </div>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
