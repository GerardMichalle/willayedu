import { ArrowRight, Award, ListChecks, Smartphone, Sparkles } from 'lucide-react'
import AcademyCarousel, { type AcademySlide } from '../components/AcademyCarousel'
import Button from '../components/Button'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { ACADEMY_COURSE_URL, ACADEMY_REGISTER_URL } from '../lib/constants'
import maxFace from '../assets/academy/max-cara.svg'
import welcomeScene from '../assets/academy/bienvenida.svg'
import block00 from '../assets/academy/bloque-00.svg'
import block01 from '../assets/academy/bloque-01.svg'
import block02 from '../assets/academy/bloque-02.svg'
import block03 from '../assets/academy/bloque-03.svg'
import block04 from '../assets/academy/bloque-04.svg'
import block05 from '../assets/academy/bloque-05.svg'
import block06 from '../assets/academy/bloque-06.svg'
import block07 from '../assets/academy/bloque-07.svg'
import block08 from '../assets/academy/bloque-08.svg'
import block09 from '../assets/academy/bloque-09.svg'
import block10 from '../assets/academy/bloque-10.svg'
import block11 from '../assets/academy/bloque-11.svg'

// Las escenas son las mismas del curso (Max, tu guía de Willay, y Don Pepe, el dueño de la bodega de los ejemplos).
// Los títulos y las funciones de cada bloque salen del contenido real del curso Ruta Excel Analista.
const slides: AcademySlide[] = [
  { src: welcomeScene, tag: 'Para empezar', title: 'Guía de bienvenida con Max', detail: 'Qué es Excel, explicado paso a paso, con dibujos y juegos', alt: 'Max saluda con un ¡Hola! junto a Don Pepe' },
  { src: block00, tag: 'Bloque 0 · Intermedio', title: 'Tu base', detail: 'Tablas, SUMIF, COUNTIF, IF y XLOOKUP', alt: 'Don Pepe en su bodega junto a una tabla de productos y a Max' },
  { src: block01, tag: 'Bloque 1 · Intermedio', title: 'Agregación con condiciones', detail: 'SUMIFS, COUNTIFS, AVERAGEIFS, MAXIFS, SUMPRODUCT', alt: 'Max sostiene una moneda sobre tres cajones con monedas' },
  { src: block02, tag: 'Bloque 2 · Avanzado', title: 'Lógica y control de errores', detail: 'AND, OR, IFS, IFERROR, SWITCH', alt: 'Max piensa frente a un cartel con dos caminos, uno de sí y otro de no' },
  { src: block03, tag: 'Bloque 3 · Avanzado', title: 'Búsqueda y referencia', detail: 'XLOOKUP a fondo, INDEX + MATCH, VLOOKUP', alt: 'Max con una lupa busca una fila resaltada en una lista' },
  { src: block04, tag: 'Bloque 4 · Avanzado', title: 'Fechas', detail: 'YEAR, MONTH, EOMONTH, DATEDIF, NETWORKDAYS', alt: 'Max saluda junto a un calendario y un reloj' },
  { src: block05, tag: 'Bloque 5 · Avanzado', title: 'Texto y limpieza de datos', detail: 'TRIM, PROPER, LEFT/MID, FIND, SUBSTITUTE, TEXTJOIN', alt: 'Max con una escoba convierte textos desordenados en textos limpios' },
  { src: block06, tag: 'Bloque 6 · Avanzado+', title: 'Funciones dinámicas', detail: 'UNIQUE, FILTER, SORT, SORTBY, SEQUENCE, LET', alt: 'Max vestido de mago saca una lista de colores con su varita' },
  { src: block07, tag: 'Bloque 7 · Avanzado+', title: 'Estadística y ranking', detail: 'RANK, LARGE, PERCENTILE, STDEV, CORREL', alt: 'Max celebra en el primer lugar de un podio' },
  { src: block08, tag: 'Bloque 8 · Avanzado+', title: 'Tablas dinámicas y dashboards', detail: 'PivotTables, segmentaciones, gráficos y KPIs', alt: 'Max señala un tablero con gráficos de barras y de pastel' },
  { src: block09, tag: 'Bloque 9 · Experto', title: 'Power Query', detail: 'Importar, limpiar, combinar y automatizar', alt: 'Una máquina convierte datos desordenados en datos limpios y Max la mira' },
  { src: block10, tag: 'Bloque 10 · Experto', title: 'Macros y VBA', detail: 'Grabadora, editor, bucles y botones', alt: 'Un robot ayudante y Max celebran junto a un botón rojo' },
  { src: block11, tag: 'Bloque 11 · Experto', title: 'Proyecto final', detail: 'Sistema de reportes de Don Pepe', alt: 'Max con birrete de graduación junto a un trofeo y un certificado' },
]

const stats = [
  { value: '12', label: 'bloques' },
  { value: '49', label: 'lecciones' },
  { value: '180', label: 'ejercicios' },
]

const points = [
  { icon: Sparkles, text: 'Guía de bienvenida con Max, pensada para quien nunca usó Excel' },
  { icon: ListChecks, text: 'Ejercicios con corrección al instante, sin instalar nada' },
  { icon: Smartphone, text: 'Funciona en celular, tablet y computadora' },
  { icon: Award, text: 'Certificado al completar toda la ruta' },
]

export default function Academy() {
  return (
    <section id="academy" className="scroll-mt-6 py-24">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Willay Academy"
            title="Aprende con Max tu guía de Willay"
            subtitle="Cursos interactivos con ejercicios, juegos y dibujos para aprender a tu ritmo"
          />
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white">
                Curso disponible
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-3.5 text-sm font-medium text-ink-soft">
                <img src={maxFace} alt="" width={28} height={28} className="h-7 w-7 rounded-full" />
                Tu guía: Max
              </span>
            </div>

            <h3 className="mt-5 text-3xl font-medium text-ink sm:text-[2.1rem]">Ruta Excel Analista</h3>
            <p className="mt-4 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft">
              De las fórmulas básicas a las tablas dinámicas, Power Query y VBA, practicando con los datos de la bodega
              de Don Pepe. Max te explica cada paso, para todas las edades
            </p>

            <dl className="mt-7 grid max-w-md grid-cols-3 gap-3">
              {stats.map(({ value, label }) => (
                <div key={label} className="rounded-2xl border border-line bg-white px-4 py-3 text-center shadow-sm">
                  <dt className="sr-only">{label}</dt>
                  <dd className="text-2xl font-medium text-brand-dark">
                    {value}
                    <span className="mt-0.5 block text-xs font-medium text-ink-soft">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 flex flex-col gap-4">
              {points.map(({ icon: Icon, text }, index) => (
                <Reveal as="li" key={text} delay={index * 80} className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-brand shadow-sm">
                    <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="pt-1.5 text-ink-soft">{text}</span>
                </Reveal>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href={ACADEMY_REGISTER_URL} target="_blank" rel="noopener noreferrer" variant="primary" icon={ArrowRight} className="px-7 py-3.5">
                Crear cuenta
              </Button>
              <Button href={ACADEMY_COURSE_URL} target="_blank" rel="noopener noreferrer" variant="secondary" className="px-7 py-3.5">
                Ya tengo cuenta
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mx-auto w-full max-w-xl">
              <AcademyCarousel slides={slides} label="Escenas del curso Ruta Excel Analista" />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
