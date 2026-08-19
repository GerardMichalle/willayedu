import { Clock } from 'lucide-react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import economyImage from '../assets/screenshots/economy.jpg'
import cognitiveImage from '../assets/screenshots/imagen1.png'
import kidsImage from '../assets/screenshots/kids.jpg'

const courses = [
  {
    tag: 'Finanzas',
    title: 'Economía y Finanzas',
    description: 'Fundamentos económicos y gestión financiera para el desarrollo profesional y personal.',
    image: economyImage,
    objectPosition: 'center',
  },
  {
    tag: 'Desarrollo Cognitivo',
    title: 'Matemáticas Divertidas',
    description: 'Aprende matemáticas a través de juegos y ejercicios prácticos para estimular el pensamiento lógico.',
    image: cognitiveImage,
    objectPosition: 'center 85%',
  },
  {
    tag: 'Lectura',
    title: 'Cuentos para Crecer',
    description: 'Colección de historias cautivadoras para fomentar la imaginación y el hábito de la lectura antes de dormir.',
    image: kidsImage,
    objectPosition: 'center 30%',
  },
]

export default function Courses() {
  return (
    <section id="cursos" className="py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Aprende con nosotros"
            title="Catálogo de cursos"
            subtitle="Explora nuestra selección de cursos diseñados para el desarrollo integral."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map(({ tag, title, description, image, objectPosition }, index) => (
            <Reveal key={title} delay={index * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_35px_-30px_rgba(31,27,24,0.35)] transition-transform duration-300 hover:-translate-y-1">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-brand-soft">
                  <img
                    src={image}
                    alt={title}
                    style={{ objectPosition }}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-dark shadow-sm backdrop-blur-sm">
                    {tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold text-ink">{title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{description}</p>
                  <span className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-soft px-6 py-3 text-[15px] font-medium text-brand-dark">
                    <Clock className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    Proximamente
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
