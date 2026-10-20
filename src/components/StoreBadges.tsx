import { PLAY_STORE_URL } from '../lib/constants'

interface StoreBadgesProps {
  /** Alto de los dos botones como clase de Tailwind; por defecto 40px */
  heightClass?: string
  className?: string
}

// El PNG oficial de Google Play (646x250) trae 41px de margen transparente por cada lado.
// Se recorta para que el botón mida lo mismo que el de App Store, que no trae margen.
const PLAY_BADGE = { width: 646, left: 41, top: 41, visibleWidth: 564, visibleHeight: 168 }

export default function StoreBadges({ heightClass = 'h-10', className = '' }: StoreBadgesProps) {
  const { width, left, top, visibleWidth, visibleHeight } = PLAY_BADGE

  return (
    <div className={`flex flex-wrap items-start gap-x-4 gap-y-3 ${className}`}>
      <div className="flex flex-col items-start gap-1.5">
        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative block shrink-0 overflow-hidden rounded-md transition-opacity hover:opacity-80 ${heightClass}`}
          style={{ aspectRatio: `${visibleWidth} / ${visibleHeight}` }}
        >
          <img
            src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
            alt="Descargar Willay en Google Play"
            draggable={false}
            loading="lazy"
            className="absolute max-w-none"
            style={{
              width: `${(width / visibleWidth) * 100}%`,
              left: `${(-left / visibleWidth) * 100}%`,
              top: `${(-top / visibleHeight) * 100}%`,
            }}
          />
        </a>
        <span className="text-xs text-ink-soft">Disponible</span>
      </div>

      <div className="flex flex-col items-start gap-1.5">
        <img
          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
          alt="App Store, próximamente"
          draggable={false}
          loading="lazy"
          className={`block w-auto opacity-50 ${heightClass}`}
        />
        <span className="text-xs text-ink-faint">Próximamente</span>
      </div>
    </div>
  )
}
