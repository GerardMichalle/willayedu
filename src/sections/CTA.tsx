import { ArrowRight } from 'lucide-react'
import Container from '../components/Container'
import Button from '../components/Button'
import Reveal from '../components/Reveal'
import { EMAIL_URL, WHATSAPP_URL } from '../lib/constants'

export default function CTA() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center sm:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-brand/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-brand/15 blur-3xl"
            />

            <h2 className="relative text-balance text-3xl font-medium text-white sm:text-4xl">
              Empieza a transformar la gestión de tu institución
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-balance text-white/70">
              Agenda una demostración sin costo y descubre cómo Willay simplifica la asistencia,
              la comunicación y el seguimiento de tus estudiantes
            </p>

            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                icon={ArrowRight}
                className="px-7 py-3.5"
              >
                Solicitar una demostración
              </Button>
              <Button
                href={EMAIL_URL}
                variant="secondary"
                className="border-white/15 bg-white/5 px-7 py-3.5 text-white hover:bg-white/10"
              >
                Contactarnos
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
