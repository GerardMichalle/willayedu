import { Image as ImageIcon } from 'lucide-react'

interface MockupFrameProps {
  /** Import the screenshot from src/assets/screenshots and pass it here once available*/
  src?: string
  alt: string
  label: string
  dimensions?: string
  aspect?: string
  className?: string
}

export default function MockupFrame({
  src,
  alt,
  label,
  dimensions = '1600 × 1000 px',
  aspect = 'aspect-[16/10]',
  className = '',
}: MockupFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_60px_-25px_rgba(31,27,24,0.25)] ${className}`}
    >
      <div className="flex items-center gap-4 border-b border-line bg-[#F7F5F3] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E3E0DC]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E3E0DC]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E3E0DC]" />
        </div>
        <div className="flex-1 rounded-md bg-white/70 px-3 py-1 text-center text-xs text-ink-faint">
          app.willay.app
        </div>
      </div>

      <div className={`relative ${aspect} w-full bg-brand-soft`}>
        {src ? (
          <img src={src} alt={alt} className="h-full w-full object-cover object-top" loading="lazy" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-line-pink p-6 text-center">
            <ImageIcon className="h-8 w-8 text-brand-accent-2" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-sm font-medium text-ink-soft">Captura pendiente: {label}</p>
            <p className="text-xs text-ink-faint">Resolución sugerida: {dimensions}</p>
          </div>
        )}
      </div>
    </div>
  )
}
