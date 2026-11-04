import { useEffect, useRef } from 'react'
import Container from '../components/Container'
import SectionHeading from '../components/SectionHeading'
import Accordion from '../components/Accordion'
import Reveal from '../components/Reveal'
import createAccountVideo from '../assets/videos/crear-cuenta-academy.mp4'
import createAccountPoster from '../assets/videos/crear-cuenta-academy.jpg'

// El video no se descarga hasta que la persona le da reproducir (preload="none" con portada) y se detiene al cerrar la pregunta
function CreateAccountVideo({ isOpen }: { isOpen: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!isOpen) videoRef.current?.pause()
  }, [isOpen])

  return (
    <div inert={!isOpen} className="mt-4 max-w-xl overflow-hidden rounded-xl border border-line bg-ink shadow-sm">
      <video
        ref={videoRef}
        src={createAccountVideo}
        poster={createAccountPoster}
        controls
        playsInline
        preload="none"
        aria-label="Video: cómo crear tu cuenta en Willay Academy, paso a paso"
        className="aspect-video w-full"
      />
    </div>
  )
}

const faqs = [
  {
    question: '¿Qué tipo de instituciones pueden usar el sistema?',
    answer:
      'Willay está pensado para instituciones educativas peruanas de cualquier tamaño que quieran digitalizar el control de asistencia, la comunicación con las familias y la gestión académica básica.',
  },
  {
    question: '¿Funciona desde celulares?',
    answer:
      'Sí. Puedes usar Willay desde el navegador de cualquier dispositivo (computadora, tablet o celular) sin instalar nada. Además, hay una app para Android disponible en Google Play; la versión para iPhone llegará próximamente.',
  },
  {
    question: '¿Cómo funciona el control de asistencia?',
    answer:
      'Cada estudiante cuenta con una tarjeta RFID. Al ingresar, la pasa por el lector y el sistema registra la hora automáticamente, clasificando la asistencia según el horario configurado por la institución.',
  },
  {
    question: '¿Los apoderados reciben alertas?',
    answer:
      'Sí, dentro de la plataforma, en el momento en que ocurre el ingreso del estudiante o cualquier otro evento relevante como una libreta publicada o un comunicado nuevo.',
  },
  {
    question: '¿Cómo funcionan las libretas de notas?',
    answer:
      'El tutor de cada aula sube la libreta oficial de la institución, escaneada o en PDF, cada bimestre. Las familias pueden consultarla y descargarla desde la plataforma en cualquier momento.',
  },
  {
    question: '¿La información está protegida?',
    answer:
      'Sí. Toda la información viaja cifrada mediante HTTPS, las contraseñas están cifradas, los datos de cada institución están completamente aislados de los demás y el sistema cumple con la Ley N.° 29733 de Protección de Datos Personales del Perú.',
  },
  {
    question: '¿Se necesita comprar equipos especiales?',
    answer:
      'Sí, se requieren lectores RFID y tarjetas para los estudiantes. Esto se coordina durante el proceso de implementación con tu institución.',
  },
  {
    question: '¿Puedo solicitar una demostración?',
    answer:
      'Claro. Escríbenos por WhatsApp o correo y coordinamos una demostración sin costo, adaptada a la realidad de tu institución.',
  },
  {
    question: '¿Cómo creo mi cuenta en Willay Academy?',
    answer: (isOpen: boolean) => (
      <>
        Entra a la sección Academia de esta página, toca Crear cuenta, completa tus datos y escribe el código de
        verificación que te llega a tu correo. Mira el paso a paso en este video de 44 segundos
        <CreateAccountVideo isOpen={isOpen} />
      </>
    ),
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading eyebrow="Preguntas frecuentes" title="Todo lo que quieres saber antes de empezar" />
          </Reveal>

          <Reveal delay={100} className="mt-12">
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
