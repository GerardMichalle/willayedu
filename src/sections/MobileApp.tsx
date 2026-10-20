import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Megaphone,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  WifiOff,
} from 'lucide-react'
import Container from '../components/Container'
import Logo from '../components/Logo'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import StoreBadges from '../components/StoreBadges'

// `screen` enlaza cada punto con la pantalla del teléfono que lo ilustra
const points: { icon: typeof Bell; text: string; screen?: number }[] = [
  { icon: Bell, text: 'Avisos de ingreso, salida y comunicados directo en el celular de las familias', screen: 0 },
  { icon: ScanLine, text: 'El personal registra asistencia escaneando el código QR de la credencial con la cámara', screen: 1 },
  { icon: WifiOff, text: 'Si se cae el internet, las lecturas se guardan y se envían al volver la conexión', screen: 2 },
  { icon: ShieldCheck, text: 'Sin publicidad y con permisos mínimos: cámara solo para el QR, notificaciones opcionales' },
]

const screens = [
  { label: 'Avisos para las familias' },
  { label: 'Escáner de QR para el personal' },
  { label: 'Lecturas guardadas sin conexión' },
]

// En celular las etiquetas quedan sobre los bordes del teléfono (sobre zonas vacías);
// desde `sm` cuelgan hacia afuera, como en la demo. "Comunicado enviado" solo en pantallas grandes.
const floatingBadges = [
  { text: 'Entrada registrada · 07:38', className: 'left-[-5%] top-[16%] sm:left-[-30%]', delay: '0s' },
  { text: 'Comunicado enviado', className: 'hidden sm:block sm:right-[-40%] sm:top-[34%]', delay: '1.2s' },
  { text: 'Salida registrada · 13:05', className: 'left-[-5%] bottom-[6%] sm:left-[-30%] sm:bottom-[12%]', delay: '2.4s' },
  { text: 'Lectura sincronizada', className: 'right-[-5%] bottom-[8%] sm:right-[-32%]', delay: '0.6s' },
]

const notifications = [
  { icon: LogOut, title: 'Salida registrada', detail: 'Camila salió de la institución', time: '13:05' },
  { icon: Megaphone, title: 'Nuevo comunicado', detail: 'Reunión de padres de familia el viernes', time: '11:20' },
  { icon: Bell, title: 'Ingreso registrado', detail: 'Camila ingresó a la institución', time: '07:38' },
]

const pendingReadings = ['07:36', '07:38', '07:41']

// Código QR de ejemplo: tres esquinas fijas más módulos de relleno determinísticos
const QR_SIZE = 21
const finderOrigins = [
  [0, 0],
  [QR_SIZE - 7, 0],
  [0, QR_SIZE - 7],
]
const isFinderZone = (x: number, y: number) =>
  (x < 8 && y < 8) || (x > QR_SIZE - 9 && y < 8) || (x < 8 && y > QR_SIZE - 9)
const qrModules: string[] = []
for (let y = 0; y < QR_SIZE; y++) {
  for (let x = 0; x < QR_SIZE; x++) {
    if (!isFinderZone(x, y) && (x * 3 + y * 5 + x * y) % 7 < 3) qrModules.push(`M${x} ${y}h1v1h-1z`)
  }
}

function QrExample() {
  return (
    <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} className="h-full w-full" aria-hidden="true" shapeRendering="crispEdges">
      <rect width={QR_SIZE} height={QR_SIZE} fill="#fff" />
      <path d={qrModules.join('')} fill="#1f1b18" />
      {finderOrigins.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="#1f1b18" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#1f1b18" />
        </g>
      ))}
    </svg>
  )
}

function NotificationsScreen() {
  return (
    <div>
      <p className="px-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Hoy</p>
      <ul className="mt-3 flex flex-col gap-3">
        {notifications.map(({ icon: Icon, title, detail, time }) => (
          <li key={title} className="flex items-start gap-3 rounded-2xl border border-line bg-white p-3 shadow-sm">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
              <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-semibold text-ink">{title}</span>
                <span className="shrink-0 text-xs text-ink-faint">{time}</span>
              </span>
              <span className="mt-0.5 block text-xs leading-relaxed text-ink-soft">{detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ScannerScreen() {
  return (
    <div>
      <p className="px-1 text-sm font-semibold text-ink">Registrar asistencia</p>
      <div className="relative mx-auto mt-3 aspect-square w-full max-w-[12.5rem] overflow-hidden rounded-2xl bg-ink p-7">
        <div className="h-full w-full overflow-hidden rounded-md">
          <QrExample />
        </div>
        <span className="absolute left-3 top-3 h-6 w-6 rounded-tl-lg border-l-2 border-t-2 border-brand" />
        <span className="absolute right-3 top-3 h-6 w-6 rounded-tr-lg border-r-2 border-t-2 border-brand" />
        <span className="absolute bottom-3 left-3 h-6 w-6 rounded-bl-lg border-b-2 border-l-2 border-brand" />
        <span className="absolute bottom-3 right-3 h-6 w-6 rounded-br-lg border-b-2 border-r-2 border-brand" />
        <span className="animate-scan absolute inset-x-4 h-0.5 rounded-full bg-brand shadow-[0_0_12px_2px_rgba(224,45,45,0.55)] motion-reduce:hidden" />
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-sm">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-ink">Entrada registrada</span>
          <span className="mt-0.5 block text-xs text-ink-soft">Credencial leída · 07:38</span>
        </span>
      </div>
    </div>
  )
}

function OfflineScreen() {
  return (
    <div>
      <p className="px-1 text-sm font-semibold text-ink">Lecturas guardadas</p>
      <div className="mt-3 flex items-start gap-2.5 rounded-2xl border border-line-pink bg-brand-soft p-3">
        <WifiOff className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
        <span className="text-xs leading-relaxed text-ink-soft">
          <span className="font-semibold text-ink">Sin conexión.</span> Las lecturas se guardan en este teléfono.
        </span>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {pendingReadings.map((time) => (
          <li key={time} className="flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2.5 shadow-sm">
            <ScanLine className="h-4 w-4 shrink-0 text-ink-soft" strokeWidth={1.8} aria-hidden="true" />
            <span className="flex-1 whitespace-nowrap text-xs font-medium text-ink">Credencial · {time}</span>
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand-dark">Pendiente</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-soft">
        <RefreshCw className="h-3.5 w-3.5 text-brand" strokeWidth={2} aria-hidden="true" />
        Se enviarán solas al volver el internet
      </div>
    </div>
  )
}

const screenViews = [NotificationsScreen, ScannerScreen, OfflineScreen]

function PhoneCarousel({ index, setIndex }: { index: number; setIndex: (next: number) => void }) {
  const [isPaused, setIsPaused] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isPaused || !isInView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = setInterval(() => {
      setIndex((index + 1) % screens.length)
    }, 4500)
    return () => clearInterval(id)
  }, [isPaused, isInView, index, setIndex])

  const goTo = (next: number) => setIndex((next + screens.length) % screens.length)
  const Screen = screenViews[index]

  return (
    <div
      ref={containerRef}
      className="relative isolate"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="relative mx-auto w-full max-w-[19rem]">
        {/* Sombra neutra y suave detrás del teléfono (antes era un marco rosa) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-[2.5rem] shadow-[0_45px_80px_-35px_rgba(31,27,24,0.40),0_20px_40px_-25px_rgba(31,27,24,0.20)]"
        />
        <div
          role="img"
          aria-label={`Ejemplo de la app de Willay en un celular: ${screens[index].label}`}
          className="rounded-[2.5rem] border-[10px] border-ink bg-warm px-3 pb-5 pt-3 shadow-[0_40px_70px_-30px_rgba(31,27,24,0.45)]"
        >
          <div className="mx-auto h-1.5 w-16 rounded-full bg-ink/80" />
          <div className="mt-4 flex items-center justify-between px-1">
            <Logo className="h-6 w-6" withWordmark />
            <Bell className="h-4 w-4 text-ink-soft" strokeWidth={1.8} aria-hidden="true" />
          </div>
          <div key={index} className="animate-gallery-fade mt-5 h-[20.5rem] overflow-hidden">
            <Screen />
          </div>
        </div>

        {index === 0 &&
          floatingBadges.map((badge) => (
            <div
              key={badge.text}
              aria-hidden="true"
              className={`animate-float absolute z-40 whitespace-nowrap rounded-xl border border-line bg-white px-3 py-2 text-[11px] font-medium text-ink shadow-lg shadow-ink/5 lg:px-4 lg:py-2.5 lg:text-xs ${badge.className}`}
              style={{ animationDelay: badge.delay }}
            >
              {badge.text}
            </div>
          ))}
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Pantalla anterior"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-brand-soft"
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {screens.map((screen, i) => (
            <button
              key={screen.label}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a ${screen.label}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-brand' : 'w-2 bg-ink-faint/40 hover:bg-ink-faint/70'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Pantalla siguiente"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:bg-brand-soft"
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default function MobileApp() {
  const [index, setIndex] = useState(0)

  return (
    <section id="app" className="overflow-x-clip bg-brand-soft/40 py-24">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="App para Android"
            title="Willay también en el celular de las familias"
            subtitle="Los apoderados se enteran al momento y el personal puede registrar asistencia desde su teléfono"
          />

          <ul className="mt-8 flex flex-col gap-5">
            {points.map(({ icon: Icon, text, screen }, pointIndex) => {
              const active = screen === index
              return (
                <Reveal as="li" key={text} delay={pointIndex * 90} className="flex items-start gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-colors duration-300 ${
                      active ? 'border-brand bg-brand text-white' : 'border-line bg-white text-brand'
                    }`}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className={`pt-1.5 transition-colors duration-300 ${active ? 'text-ink' : 'text-ink-soft'}`}>{text}</span>
                </Reveal>
              )
            })}
          </ul>

          <StoreBadges heightClass="h-[27px]" className="mt-9" />
        </Reveal>

        <Reveal delay={120} className="lg:order-first">
          <PhoneCarousel index={index} setIndex={setIndex} />
        </Reveal>
      </Container>
    </section>
  )
}
