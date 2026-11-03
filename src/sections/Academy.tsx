import { ArrowRight, Library, ListChecks, Smartphone } from 'lucide-react'
import Button from '../components/Button'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { ACADEMY_COURSE_URL, ACADEMY_REGISTER_URL } from '../lib/constants'
import maxStudying from '../assets/academy/max-estudia.svg'

// Lo que vale para toda la Academia, sea cual sea el curso
const points = [
  { icon: Library, text: 'Cursos de distintas materias que se van sumando' },
  { icon: ListChecks, text: 'Ejercicios con corrección al instante, sin instalar nada' },
  { icon: Smartphone, text: 'Aprende a tu ritmo en celular, tablet o computadora' },
]

// Datos reales del primer curso disponible (Ruta Excel Analista)
const courseStats = '12 bloques · 49 lecciones · 180 ejercicios'

export default function Academy() {
  return (
    <section id="academy" className="scroll-mt-6 py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Willay Academy"
            title="Aprende con Max tu guía de Willay"
            subtitle="Cursos interactivos con ejercicios, juegos y dibujos para todas las edades"
          />
        </Reveal>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <Reveal>
            <ul className="flex flex-col gap-4">
              {points.map(({ icon: Icon, text }, index) => (
                <Reveal as="li" key={text} delay={index * 80} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-brand shadow-sm">
                    <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="pt-1.5 text-ink-soft">{text}</span>
                </Reveal>
              ))}
            </ul>

            {/* El primer curso, resumido: lo que hay disponible hoy */}
            <div className="mt-8 max-w-lg rounded-2xl border border-line bg-white p-5 shadow-sm">
              <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-white">
                Curso disponible
              </span>
              <h3 className="mt-3 text-2xl font-medium text-ink">Ruta Excel Analista</h3>
              <p className="mt-2 text-pretty leading-relaxed text-ink-soft">
                De las fórmulas básicas a Power Query y VBA, practicando con los datos de la bodega de Don Pepe
              </p>
              <p className="mt-3 text-sm font-medium text-brand-dark">{courseStats}</p>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href={ACADEMY_REGISTER_URL} target="_blank" rel="noopener noreferrer" variant="primary" icon={ArrowRight} className="px-7 py-3.5">
                Crear cuenta
              </Button>
              <Button href={ACADEMY_COURSE_URL} target="_blank" rel="noopener noreferrer" variant="secondary" className="px-7 py-3.5">
                Ya tengo cuenta
              </Button>
            </div>
          </Reveal>

          {/* En celular la ilustración va primero (gancho visual) y los botones cierran la sección */}
          <Reveal delay={120} className="order-first lg:order-none">
            <div className="mx-auto w-full max-w-xl overflow-hidden rounded-3xl border border-line bg-[#fcfbf8] shadow-[0_18px_50px_-24px_rgba(23,24,26,0.35)]">
              <img
                src={maxStudying}
                alt="Max, tu guía de Willay, estudia en su escritorio junto a una repisa con libros de distintas materias"
                width={1200}
                height={1200}
                loading="lazy"
                decoding="async"
                className="aspect-[5/4] w-full object-cover object-[50%_18%]"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
