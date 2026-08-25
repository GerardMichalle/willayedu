import { type KeyboardEvent, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Image as ImageIcon, Minus, Plus, X, ZoomIn } from 'lucide-react'

interface MockupFrameProps {
  /** Import the screenshot from src/assets/screenshots and pass it here once available */
  src?: string
  /** Import a video from src/assets/videos and pass it here to render it instead of the image */
  videoSrc?: string
  alt: string
  label: string
  dimensions?: string
  aspect?: string
  className?: string
  showBrowserChrome?: boolean
  zoomable?: boolean
}

const MIN_ZOOM = 100
const MAX_ZOOM = 250
const ZOOM_STEP = 25

export default function MockupFrame({
  src,
  videoSrc,
  alt,
  label,
  dimensions = '1600 × 1000 px',
  aspect = 'aspect-[16/10]',
  className = '',
  showBrowserChrome = true,
  zoomable = false,
}: MockupFrameProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(MIN_ZOOM)
  const zoomViewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isZoomed) return

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setIsZoomed(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isZoomed])

  useEffect(() => {
    if (zoomLevel === MIN_ZOOM || !zoomViewportRef.current) return

    const viewport = zoomViewportRef.current
    viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2
    viewport.scrollTop = (viewport.scrollHeight - viewport.clientHeight) / 2
  }, [zoomLevel])

  const openZoom = () => {
    if (!zoomable || !src) return
    setZoomLevel(MIN_ZOOM)
    setIsZoomed(true)
  }

  const closeZoom = () => setIsZoomed(false)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!zoomable || !src || (event.key !== 'Enter' && event.key !== ' ')) return
    event.preventDefault()
    openZoom()
  }

  const changeZoom = (amount: number) => {
    setZoomLevel((currentZoom) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, currentZoom + amount)))
  }

  return (
    <>
      <div
        className={`group overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_60px_-25px_rgba(31,27,24,0.25)] ${zoomable && src ? 'cursor-zoom-in' : ''} ${className}`}
        role={zoomable && src ? 'button' : undefined}
        tabIndex={zoomable && src ? 0 : undefined}
        aria-label={zoomable && src ? `Ampliar imagen: ${alt}` : undefined}
        onClick={openZoom}
        onKeyDown={handleKeyDown}
      >
        {showBrowserChrome && (
          <div className="flex items-center gap-4 border-b border-line bg-[#F7F5F3] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#E3E0DC]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E3E0DC]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#E3E0DC]" />
            </div>
            <div className="flex-1 rounded-md bg-white/70 px-3 py-1 text-center text-xs text-ink-faint">
              willay.app
            </div>
          </div>
        )}

        <div className={`relative ${aspect} w-full bg-brand-soft`}>
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              aria-label={alt}
              className="h-full w-full object-cover"
            />
          ) : src ? (
            <>
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-cover object-top transition-transform duration-1000 ease-out motion-reduce:transition-none group-hover:scale-[1.035]"
                loading="lazy"
              />
              {zoomable && (
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-white/95 px-3 py-1.5 text-xs font-medium text-ink shadow-sm backdrop-blur-sm">
                  <ZoomIn className="h-3.5 w-3.5 text-brand" strokeWidth={2} aria-hidden="true" />
                  Ver en detalle
                </span>
              )}
            </>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 border-2 border-dashed border-line-pink p-6 text-center">
              <ImageIcon className="h-8 w-8 text-brand-accent-2" strokeWidth={1.5} aria-hidden="true" />
              <p className="text-sm font-medium text-ink-soft">Captura pendiente: {label}</p>
              <p className="text-xs text-ink-faint">Resolución sugerida: {dimensions}</p>
            </div>
          )}
        </div>
      </div>

      {zoomable && src && isZoomed && createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/45 p-3 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada: ${label}`}
          onClick={closeZoom}
        >
          <div
            className="relative flex max-h-full w-[min(96vw,1500px)] flex-col rounded-2xl border border-white/50 bg-white p-2 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute left-4 top-4 z-10 flex items-center rounded-full border border-line bg-white/95 p-1 shadow-md backdrop-blur-sm">
              <button
                type="button"
                onClick={() => changeZoom(-ZOOM_STEP)}
                disabled={zoomLevel === MIN_ZOOM}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:text-ink-faint"
                aria-label="Alejar imagen"
              >
                <Minus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>
              <span className="min-w-12 text-center text-xs font-semibold text-ink" aria-live="polite">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => changeZoom(ZOOM_STEP)}
                disabled={zoomLevel === MAX_ZOOM}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:text-ink-faint"
                aria-label="Acercar imagen"
              >
                <Plus className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </button>
            </div>
            <button
              type="button"
              onClick={closeZoom}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink shadow-md transition-colors hover:bg-brand-soft"
              aria-label="Cerrar vista ampliada"
            >
              <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </button>
            <div
              ref={zoomViewportRef}
              className="max-h-[82vh] overflow-auto rounded-xl bg-brand-soft/30 pt-12 [touch-action:pan-x_pan-y]"
            >
              <img
                src={src}
                alt={alt}
                draggable={false}
                style={{ maxWidth: 'none', minWidth: '100%', width: `${zoomLevel}%` }}
                className="block h-auto"
                onDoubleClick={() => setZoomLevel((currentZoom) => currentZoom === MIN_ZOOM ? 175 : MIN_ZOOM)}
              />
            </div>
            <p className="px-2 pt-2 text-center text-xs text-ink-faint">
              Usa + o − para acercar. En celular, desliza la imagen ampliada para recorrerla.
            </p>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}