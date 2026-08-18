import { Laptop, Lock, MapPinned, Database } from 'lucide-react'
import Reveal from '../components/Reveal'

const items = [
  { icon: MapPinned, label: 'Para instituciones públicas y privadas' },
  { icon: Database, label: 'Información centralizada' },
  { icon: Lock, label: 'Acceso seguro' },
  { icon: Laptop, label: 'Disponible desde cualquier dispositivo' },
]

export default function TrustBar() {
  return (
    <section className="overflow-hidden border-y border-line bg-white/60 py-8">
      <Reveal>
        <ul className="flex w-max gap-12 animate-trust-carousel hover:[animation-play-state:paused] motion-reduce:animate-none">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex shrink-0 items-center gap-2.5 text-sm text-ink-soft">
              <Icon className="h-4 w-4 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
              <span className="font-medium">{label}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}