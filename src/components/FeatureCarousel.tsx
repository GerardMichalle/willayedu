import { BookOpen, ChartNoAxesCombined, MessageSquare, ScanLine, ShieldCheck } from 'lucide-react'

const features = [
  { icon: ScanLine, label: 'Asistencia en tiempo real' },
  { icon: MessageSquare, label: 'Comunicados al instante' },
  { icon: BookOpen, label: 'Libretas digitales' },
  { icon: ChartNoAxesCombined, label: 'Reportes listos para decidir' },
  { icon: ShieldCheck, label: 'Accesos protegidos por rol' },
]

export default function FeatureCarousel() {
  return (
    <section className="overflow-hidden bg-ink py-5" aria-label="Funciones principales de Willay">
      <div className="flex w-max gap-3 animate-feature-carousel hover:[animation-play-state:paused] motion-reduce:animate-none">
        {features.map(({ icon: Icon, label }) => (
          <article key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/8 px-5 py-4 text-sm font-medium text-white">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
              <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </span>
            {label}
          </article>
        ))}
      </div>
    </section>
  )
}