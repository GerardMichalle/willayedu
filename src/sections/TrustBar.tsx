import { Laptop, Lock, MapPinned, Database } from 'lucide-react'
import Container from '../components/Container'
import Reveal from '../components/Reveal'

const items = [
  { icon: MapPinned, label: 'Pensado para colegios peruanos' },
  { icon: Database, label: 'Información centralizada' },
  { icon: Lock, label: 'Acceso seguro' },
  { icon: Laptop, label: 'Disponible desde cualquier dispositivo' },
]

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-white/60 py-8">
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 gap-y-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-12">
            {items.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2.5 text-sm text-ink-soft">
                <Icon className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
