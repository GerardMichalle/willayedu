import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react'
import Container from '../components/Container'
import Footer from '../layouts/Footer'
import Logo from '../components/Logo'

export default function Privacy() {
  return (
    <div className="flex min-h-screen flex-col bg-warm">
      <header className="border-b border-line bg-white/90 backdrop-blur-md">
        <Container className="flex h-20 items-center justify-between py-4 lg:h-24">
          <a href="/" className="flex items-center" aria-label="Willay Edu, volver al inicio">
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
              Política de privacidad
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
              Willay es la plataforma tecnológica que un colegio contrata para gestionar su
              asistencia, comunicación y registro académico. En términos de la Ley N.º 29733, Ley
              de Protección de Datos Personales del Perú, y su Reglamento (D.S. N.º 016-2024-JUS):{' '}
              <strong className="text-ink">el colegio es el titular del banco de datos
              personales</strong> de sus alumnos, apoderados y docentes, y{' '}
              <strong className="text-ink">Willay actúa como encargado del tratamiento</strong>,
              procesando esos datos únicamente por cuenta e instrucción del colegio, bajo un
              acuerdo escrito de encargo de tratamiento.
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
                <h2 className="text-xl font-medium text-ink sm:text-2xl">1. Alcance</h2>
                <p className="mt-3">
                  Esta política aplica al sitio web de Willay y a la aplicación móvil Willay para
                  Android, usados por personal administrativo, docentes, alumnos y apoderados de
                  los colegios que contratan la plataforma. Describe qué datos personales
                  tratamos, con qué fin, por cuánto tiempo, con quién los compartimos y cómo
                  puedes ejercer tus derechos sobre ellos.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">2. Qué datos recopilamos</h2>
                <p className="mt-3">Los datos que trata el sistema dependen del rol de cada persona:</p>
                <div className="mt-4 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[480px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-brand-soft/40">
                        <th className="border-b border-line px-4 py-3 font-semibold text-ink">Perfil</th>
                        <th className="border-b border-line px-4 py-3 font-semibold text-ink">Datos</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b border-line px-4 py-3 align-top font-medium text-ink">Alumno</td>
                        <td className="border-b border-line px-4 py-3 align-top">
                          Nombres y apellidos, DNI, fecha de nacimiento, fotografía de perfil,
                          grado y sección, código de estudiante, código de tarjeta RFID/QR de su
                          credencial, registros de asistencia (hora y punto de acceso de
                          entrada/salida), notas de conducta (méritos y observaciones), libretas y
                          notas académicas.
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-line px-4 py-3 align-top font-medium text-ink">Apoderado (padre/madre/tutor)</td>
                        <td className="border-b border-line px-4 py-3 align-top">
                          Nombres y apellidos, DNI, teléfono, correo electrónico, vínculo con el/los
                          alumno(s) a su cargo, notificaciones de ingreso/salida de sus hijos.
                        </td>
                      </tr>
                      <tr>
                        <td className="border-b border-line px-4 py-3 align-top font-medium text-ink">Docente / personal administrativo</td>
                        <td className="border-b border-line px-4 py-3 align-top">
                          Nombres y apellidos, correo electrónico, rol dentro del colegio, aulas o
                          cursos asignados, registros de actividad relevantes a su función (por
                          ejemplo, quién registró una nota de conducta o publicó un comunicado).
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 align-top font-medium text-ink">Cualquier usuario con cuenta</td>
                        <td className="px-4 py-3 align-top">
                          Correo y contraseña (la contraseña se guarda cifrada, nunca en texto
                          plano), fotografía de perfil opcional, historial de inicios de sesión,
                          preferencias de notificación.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="mt-6 text-base font-semibold text-ink">Datos específicos de la aplicación móvil</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>
                    <strong className="text-ink">Cámara:</strong> se usa únicamente para escanear
                    el código QR de la credencial de un estudiante al registrar asistencia. La app
                    no guarda fotos ni video de la cámara — solo lee el texto del código QR en el
                    momento del escaneo.
                  </li>
                  <li>
                    <strong className="text-ink">Notificaciones push:</strong> si el usuario las
                    activa, el dispositivo recibe un identificador de Firebase Cloud Messaging
                    (FCM), usado exclusivamente para enviarle avisos del colegio (ingreso/salida
                    de un hijo, comunicados). Este identificador no se usa para publicidad ni se
                    comparte con anunciantes — Willay no muestra publicidad.
                  </li>
                  <li>
                    <strong className="text-ink">Almacenamiento local del dispositivo:</strong> la
                    sesión iniciada y, en el caso del personal que usa el celular como lector de
                    asistencia, la credencial del lector configurada y las lecturas de asistencia
                    pendientes de sincronizar si el dispositivo se quedó sin conexión — todo esto
                    se guarda solo en el propio dispositivo, no se envía a ningún tercero.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">3. Para qué usamos estos datos</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Registrar y consultar la asistencia diaria (entrada/salida) de cada alumno.</li>
                  <li>Notificar a los apoderados cuando su hijo ingresa o sale del colegio.</li>
                  <li>Gestionar matrículas, aulas, cursos y el registro de conducta y libretas.</li>
                  <li>Emitir la credencial digital/física del estudiante (código QR).</li>
                  <li>Publicar y distribuir comunicados del colegio.</li>
                  <li>Administrar cuentas de usuario, autenticación y control de acceso por rol.</li>
                  <li>Generar reportes y estadísticas agregadas para la dirección del colegio.</li>
                  <li>Mantener un registro de auditoría de acciones administrativas sensibles.</li>
                </ul>
                <p className="mt-3">
                  Willay no usa estos datos con fines publicitarios ni los vende ni los cede a
                  terceros para marketing.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">4. Base legal</h2>
                <p className="mt-3">
                  El tratamiento se sustenta en el consentimiento otorgado por el colegio (como
                  titular del banco de datos) al momento de la matrícula, conforme al Artículo 13
                  de la Ley N.º 29733, así como en la ejecución de la relación contractual entre
                  el colegio y las familias, y en el cumplimiento de obligaciones vinculadas a la
                  prestación del servicio educativo.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">5. Datos de niñas, niños y adolescentes</h2>
                <p className="mt-3">
                  De acuerdo con el Artículo 22 del Reglamento de la Ley N.º 29733, el tratamiento
                  de datos personales de menores de edad requiere el consentimiento de quien
                  ejerce su patria potestad o tutela. Este consentimiento lo recaba el colegio
                  directamente con el padre, madre o apoderado al momento de la matrícula — Willay
                  no solicita ni recibe consentimiento directamente de los alumnos menores de
                  edad, y no permite que un alumno cree su propia cuenta sin que el colegio la
                  haya dado de alta primero.
                </p>
                <p className="mt-3">
                  Los derechos sobre los datos de un menor (acceso, rectificación, cancelación,
                  oposición) los ejerce su padre, madre o apoderado, directamente ante el colegio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">6. Conservación de los datos</h2>
                <p className="mt-3">
                  Los datos se conservan mientras el alumno, apoderado o docente mantenga vínculo
                  activo con el colegio, y durante el plazo adicional que exija la normativa
                  educativa o tributaria aplicable para la conservación de registros escolares.
                  Cuando el colegio instruye la eliminación de un registro (por ejemplo, al
                  retirarse un estudiante), Willay la ejecuta sobre los sistemas que administra.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">7. Con quién compartimos los datos</h2>
                <p className="mt-3">
                  Willay no vende ni cede datos personales a terceros con fines comerciales. Para
                  poder operar el servicio, sí se apoya en los siguientes encargados
                  subcontratados, cada uno tratando datos únicamente para la función indicada:
                </p>
                <div className="mt-4 overflow-x-auto rounded-xl border border-line">
                  <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-brand-soft/40">
                        <th className="border-b border-line px-4 py-3 font-semibold text-ink">Proveedor</th>
                        <th className="border-b border-line px-4 py-3 font-semibold text-ink">Función</th>
                        <th className="border-b border-line px-4 py-3 font-semibold text-ink">Datos involucrados</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-b border-line px-4 py-3 align-top">Servidor de alojamiento (infraestructura en la nube)</td>
                        <td className="border-b border-line px-4 py-3 align-top">Alojar la base de datos y el backend del sistema</td>
                        <td className="border-b border-line px-4 py-3 align-top">Todos los datos descritos en la sección 2</td>
                      </tr>
                      <tr>
                        <td className="border-b border-line px-4 py-3 align-top">Google Firebase Cloud Messaging</td>
                        <td className="border-b border-line px-4 py-3 align-top">Entregar notificaciones push a la app Android</td>
                        <td className="border-b border-line px-4 py-3 align-top">Identificador del dispositivo (token FCM), título y texto del aviso</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 align-top">Resend</td>
                        <td className="px-4 py-3 align-top">Envío de correos transaccionales (activación de cuenta, recuperación de contraseña)</td>
                        <td className="px-4 py-3 align-top">Correo electrónico, nombre</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">
                  Algunos de estos proveedores procesan datos en servidores fuera del Perú
                  (transferencia internacional de datos personales), lo cual se realiza conforme
                  al Artículo 15 de la Ley N.º 29733, exigiendo a cada proveedor garantías
                  contractuales de protección adecuadas para los datos que procesa.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">8. Seguridad</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Las contraseñas se almacenan cifradas (nunca en texto plano).</li>
                  <li>Toda comunicación entre la app/web y el servidor viaja cifrada (HTTPS/TLS).</li>
                  <li>El acceso a cada dato está limitado según el rol del usuario (un docente no ve lo mismo que un administrador; un apoderado solo ve a sus propios hijos).</li>
                  <li>Las fotografías y documentos se sirven mediante enlaces firmados de corta duración, no URLs públicas permanentes.</li>
                  <li>El código QR de la credencial no contiene datos personales — solo un identificador que únicamente tiene sentido dentro del sistema del colegio.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">9. Tus derechos (ARCO)</h2>
                <p className="mt-3">
                  Como titular de tus datos personales (o, si eres el padre/madre/apoderado de un
                  menor, en representación de este), tienes derecho a solicitar en cualquier
                  momento:
                </p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li><strong className="text-ink">Acceso:</strong> conocer qué datos tuyos (o de tu hijo/a) están registrados.</li>
                  <li><strong className="text-ink">Rectificación:</strong> corregir datos inexactos o incompletos.</li>
                  <li><strong className="text-ink">Cancelación:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios para la finalidad que los originó.</li>
                  <li><strong className="text-ink">Oposición:</strong> oponerte a un tratamiento específico de tus datos.</li>
                </ul>
                <p className="mt-3">
                  Para ejercer estos derechos, contacta primero a tu colegio (titular del banco de
                  datos), o escríbenos directamente a{' '}
                  <a href="mailto:willaysoporte@gmail.com" className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                    willaysoporte@gmail.com
                  </a>{' '}
                  y coordinaremos con el colegio correspondiente. Responderemos dentro de los
                  plazos establecidos por la Ley N.º 29733 y su Reglamento.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">10. Cambios a esta política</h2>
                <p className="mt-3">
                  Podemos actualizar esta política para reflejar cambios en el sistema o en la
                  normativa aplicable. La fecha de "Última actualización" en la parte superior
                  indica la versión vigente. Cambios significativos se comunicarán a los colegios
                  clientes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">11. Contacto</h2>
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
