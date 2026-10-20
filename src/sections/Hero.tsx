import { type MouseEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import Container from '../components/Container'
import Button from '../components/Button'
import MockupFrame from '../components/MockupFrame'
import Reveal from '../components/Reveal'
import { WHATSAPP_URL } from '../lib/constants'
import loginScreenshot from '../assets/screenshots/login.png'

const scrollToFeatures = (event: MouseEvent<HTMLAnchorElement>) => {
  event.preventDefault()
  document.querySelector('#caracteristicas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-brand-soft-2 blur-3xl"
      />

      <Container className="relative grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div>
          <Reveal>
            <h1 className="mt-6 text-4xl font-medium leading-[1.08] text-ink sm:text-5xl lg:text-[3.4rem]">
              Todo el control de tu institución educativa en un solo lugar
            </h1>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
              Willay gestiona asistencia, estudiantes, comunicación con las familias, libretas de
              notas y reportes desde una sola plataforma moderna, con cursos gratuitos para todos nuestros usuarios y soporte en línea
            </p>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                icon={ArrowRight}
                className="px-7 py-3.5"
                data-hero-cta
              >
                Solicitar demostración
              </Button>
              <Button href="#caracteristicas" onClick={scrollToFeatures} variant="secondary" className="px-7 py-3.5">
                Conocer el sistema
              </Button>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-10 max-w-md text-sm leading-relaxed text-ink-faint">
              <span className="font-medium text-ink-soft">Willay</span> viene del quechua:{' '}
              <em className="not-italic text-ink-soft">avisar, contar, hacer saber</em>. Gestiona tu centro educativo y mantén a las familias informadas al instante
            </p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="relative lg:origin-left lg:scale-[1.08]">
            {/* Sombra neutra y suave detrás de la imagen (antes era un marco rosa) */}
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-2xl shadow-[0_45px_80px_-35px_rgba(31,27,24,0.40),0_20px_40px_-25px_rgba(31,27,24,0.20)]"
            />
            <MockupFrame
              src={loginScreenshot}
              label="Inicio de sesión del sistema"
              alt="Pantalla de inicio de sesión de Willay"
              aspect="aspect-[1672/941]"
              showBrowserChrome={false}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}