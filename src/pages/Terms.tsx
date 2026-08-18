import { ArrowLeft, FileText, ShieldCheck } from 'lucide-react'
import Container from '../components/Container'
import Footer from '../layouts/Footer'
import Logo from '../components/Logo'

const sections = [
  {
    title: '1. Alcance y aceptación',
    body: 'Estos Términos regulan el acceso y uso de Willay, plataforma de gestión educativa. Al crear una cuenta, contratar una suscripción, utilizar una demostración o continuar usando el servicio, la institución y sus usuarios autorizados aceptan estos Términos. Si actúas en nombre de una institución, declaras contar con facultades suficientes para vincularla.',
  },
  {
    title: '2. Servicio y cuentas institucionales',
    body: 'Willay ofrece herramientas digitales para la gestión académica y administrativa. Cada colegio administra sus propios usuarios, permisos, contraseñas y contenidos después de la configuración inicial. La institución es responsable de designar administradores autorizados, mantener sus credenciales seguras y comunicar oportunamente altas, bajas o cambios de acceso.',
  },
  {
    title: '3. Datos de estudiantes, familias y personal',
    body: 'La institución determina qué datos incorpora en la plataforma y es responsable de contar con la base legal, autorizaciones e información necesarias para su tratamiento, especialmente cuando involucre menores de edad. Willay no revisa ni accede de forma ordinaria a las cuentas, mensajes o información de estudiantes, docentes o dirección. Cualquier acceso excepcional por soporte, seguridad, instrucción de la institución o exigencia legal deberá limitarse a lo necesario y gestionarse bajo controles de seguridad.',
  },
  {
    title: '4. Uso permitido',
    body: 'El servicio debe utilizarse únicamente para fines educativos y administrativos legítimos. Está prohibido vulnerar la seguridad de la plataforma, compartir credenciales sin autorización, cargar contenido ilícito o infractor, intentar obtener acceso no autorizado, interferir con el servicio o usarlo de forma que afecte a otros usuarios. Willay puede suspender accesos ante riesgos de seguridad, incumplimientos o requerimientos legales.',
  },
  {
    title: '5. Demo, suscripción, pagos y ausencia de reembolsos',
    body: 'Las demostraciones tienen carácter informativo y no generan obligación de contratación, salvo acuerdo escrito. Las suscripciones, precios, periodos de vigencia, impuestos y condiciones de pago se informarán en la cotización, orden o contrato aplicable. Los pagos realizados no son reembolsables, salvo cuando la ley aplicable lo exija, cuando exista un acuerdo escrito distinto o cuando corresponda por una falla atribuible a Willay que no haya sido razonablemente subsanada.',
  },
  {
    title: '6. Disponibilidad, soporte y continuidad',
    body: 'Willay procurará mantener el servicio disponible y aplicar medidas razonables de seguridad y continuidad. Pueden existir mantenimientos, actualizaciones, fallas de terceros, casos fortuitos o eventos fuera de control razonable. La institución debe conservar respaldos y procedimientos internos proporcionales a la importancia de su información. Los niveles de soporte y canales de atención serán los contratados o comunicados por Willay.',
  },
  {
    title: '7. Propiedad intelectual',
    body: 'La plataforma, su código, diseño, marcas, documentación y contenidos propios de Willay están protegidos por la normativa aplicable. Se concede a la institución una licencia limitada, no exclusiva, no transferible y revocable para usar el servicio durante la vigencia de su suscripción. La información que la institución ingrese sigue perteneciendo a ella o a sus titulares legítimos.',
  },
  {
    title: '8. Responsabilidad',
    body: 'En la máxima medida permitida por la ley, Willay no responderá por daños indirectos, lucro cesante, pérdida de oportunidad o daños derivados del uso indebido de credenciales, decisiones tomadas exclusivamente con base en información ingresada por la institución o actos de terceros. Nada de estos Términos limita responsabilidades que no puedan excluirse por ley, incluidos los derechos irrenunciables de consumidores, ni daños causados por dolo o culpa inexcusable cuando corresponda.',
  },
  {
    title: '9. Vigencia, cambios y terminación',
    body: 'Estos Términos se aplican mientras la institución o sus usuarios utilicen Willay. Willay podrá actualizar el servicio o estos Términos por razones operativas, de seguridad o legales; los cambios materiales se comunicarán con antelación razonable. La institución puede dejar de usar el servicio conforme a su contrato. Al terminar la relación, las partes atenderán la entrega, conservación o eliminación de datos según el acuerdo aplicable y la normativa vigente.',
  },
  {
    title: '10. Ley aplicable y solución de controversias',
    body: 'Estos Términos se rigen por las leyes de la República del Perú. Las controversias se procurarán resolver primero mediante comunicación directa y de buena fe. Si no hubiera solución, serán competentes las autoridades y tribunales peruanos que correspondan, sin perjuicio de los derechos imperativos que la ley del lugar de residencia del consumidor pueda reconocer.',
  },
  {
    title: '11. Comunicaciones y aceptación electrónica',
    body: 'Las comunicaciones relacionadas con el servicio podrán realizarse por medios electrónicos. La aceptación electrónica de estos Términos y de documentos vinculados producirá los efectos permitidos por la normativa aplicable. Cuando una operación requiera una firma digital o formalidad especial, se aplicarán los requisitos legales correspondientes.',
  },
]

export default function Terms() {
  return (
    <div className="flex min-h-screen flex-col bg-warm">
      <header className="border-b border-line bg-white/90 backdrop-blur-md">
        <Container className="flex h-18 items-center justify-between py-4">
          <a href="/" className="flex items-center" aria-label="Willay, volver al inicio">
            <Logo className="h-8 w-8" withWordmark />
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
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
              Condiciones de uso de Willay para instituciones educativas y sus usuarios autorizados.
            </p>

            <div className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
              <div className="flex gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
                <div className="text-sm leading-relaxed text-ink-soft">
                  <p className="font-medium text-ink">Información del proveedor</p>
                  <p className="mt-1">Willay es operada por un CEO, con atención a través de soportewillay@gmail.com.</p>
                  <p className="mt-2 text-ink-faint">Última actualización: 17 de agosto de 2026.</p>
                </div>
              </div>
            </div>

            <article className="mt-10 select-text space-y-9 text-[15px] leading-7 text-ink-soft sm:text-base">
              {sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-xl font-medium text-ink sm:text-2xl">{section.title}</h2>
                  <p className="mt-3">{section.body}</p>
                </section>
              ))}

              <section>
                <h2 className="text-xl font-medium text-ink sm:text-2xl">12. Contacto</h2>
                <p className="mt-3">
                  Para consultas sobre estos Términos, soporte o el tratamiento de información, escribe a{' '}
                  <a href="mailto:soportewillay@gmail.com" className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand">
                    soportewillay@gmail.com
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