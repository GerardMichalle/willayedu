import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import {
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  CircleHelp,
  EllipsisVertical,
  ExternalLink,
  FileText,
  Mail,
  Minus,
  RotateCcw,
  Send,
  ShieldCheck,
  Tag,
  X,
} from 'lucide-react'
import Logo from './Logo'
import { EMAIL_URL } from '../lib/constants'
import {
  initialState,
  respond,
  type BotStep,
  type ChatIcon,
  type ChatLink,
  type ChatState,
  type QuickReply,
  type UserInput,
} from '../lib/chatbot'

const HINT_KEY = 'willay-chat-hint-seen'
const HINT_DELAY_MS = 7000
const HINT_VISIBLE_MS = 12000
// Sin actividad: al minuto el asistente avisa y, si pasa otro minuto, el chat se cierra y se borra
const IDLE_WARN_MS = 60000
const IDLE_END_MS = 120000
const MAX_LENGTH = 300
const MAX_QUEUE = 5

const CARD_ICONS: Record<ChatIcon, typeof Tag> = {
  calendar: CalendarDays,
  file: FileText,
  tag: Tag,
  help: CircleHelp,
}

interface ChatMessage {
  id: number
  from: 'bot' | 'user'
  text: string
  time: string
  links?: ChatLink[]
  quickReplies?: QuickReply[]
  persist?: boolean
  read?: boolean
}

interface QueueItem {
  input: UserInput
  /** Mensaje del usuario que originó este turno; se marca como "visto" antes de responder */
  msgId?: number
}

// Tiempos con algo de azar para que no se sienta mecánico: se lee, se escribe (más largo = más tarda) y se envía
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))
const jitter = (min: number, max: number) => min + Math.random() * (max - min)
const readDelay = () => jitter(500, 1100)
const gapDelay = () => jitter(300, 650)
const typingDelay = (text: string) => Math.min(3200, 650 + text.length * 22) * jitter(0.85, 1.15)
const clock = () => new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: false })

const hintAlreadySeen = () => {
  try {
    return sessionStorage.getItem(HINT_KEY) === '1'
  } catch {
    return false
  }
}
const rememberHint = () => {
  try {
    sessionStorage.setItem(HINT_KEY, '1')
  } catch {
    // modo privado o almacenamiento bloqueado: el aviso simplemente puede repetirse
  }
}

function BubbleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 4C9.4 4 4 8.5 4 14c0 3.2 1.6 6 4 7.8L6 27l5.6-2.4c1.4.4 2.9.7 4.4.7 6.6 0 12-4.9 12-11.3C28 8.5 22.6 4 16 4Z"
        fill="#fff"
      />
      <circle cx="10.5" cy="14.5" r="1.7" fill="#e02d2d" />
      <circle cx="16" cy="14.5" r="1.7" fill="#e02d2d" />
      <circle cx="21.5" cy="14.5" r="1.7" fill="#e02d2d" />
    </svg>
  )
}

function BotAvatar() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-white shadow-sm">
      <Logo className="h-5 w-5" />
    </span>
  )
}

function TypingBubble({ withAvatar }: { withAvatar: boolean }) {
  return (
    <div className="animate-chat-msg flex items-start gap-2.5" role="status">
      <div className="w-9 shrink-0">{withAvatar && <BotAvatar />}</div>
      <div className="flex h-11 items-center gap-1.5 rounded-2xl rounded-tl-md bg-[#f3f4f8] px-4">
        {[0, 160, 320].map((delay) => (
          <span
            key={delay}
            className="animate-chat-dot h-2 w-2 rounded-full bg-ink-soft/50"
            style={{ animationDelay: `${delay}ms` }}
          />
        ))}
      </div>
      <span className="sr-only">Willay está escribiendo</span>
    </div>
  )
}

function LinkPill({ link }: { link: ChatLink }) {
  const external = link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  const Icon = link.external ? ExternalLink : Mail
  return (
    <a
      href={link.href}
      {...external}
      className="inline-flex items-center gap-2 rounded-full bg-brand-soft-2 px-4 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:bg-brand-accent/60"
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
      {link.label}
    </a>
  )
}

function QuickReplies({ replies, onPick }: { replies: QuickReply[]; onPick: (reply: QuickReply) => void }) {
  const asCards = replies.every((reply) => reply.icon)

  if (asCards) {
    return (
      <div className="mt-3 grid grid-cols-2 gap-2">
        {replies.map((reply, index) => {
          const Icon = CARD_ICONS[reply.icon as ChatIcon]
          const primary = index === 0
          return (
            <button
              key={reply.id}
              type="button"
              onClick={() => onPick(reply)}
              className={`flex min-h-15 min-w-0 items-center gap-2 rounded-2xl border px-2.5 text-left text-[13px] font-medium leading-tight transition-colors max-[340px]:gap-1.5 max-[340px]:px-2 max-[340px]:text-xs sm:gap-2.5 sm:px-3 sm:text-sm ${
                primary
                  ? 'border-brand-accent bg-brand-soft-2 text-brand-dark'
                  : 'border-line bg-white text-ink hover:border-brand-accent hover:bg-brand-soft'
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 sm:h-5 sm:w-5 ${primary ? 'text-brand' : 'text-ink'}`} strokeWidth={1.7} aria-hidden="true" />
              <span className="min-w-0 flex-1 break-words">{reply.label}</span>
              <ChevronRight className="hidden h-4 w-4 shrink-0 text-ink-soft min-[400px]:block" strokeWidth={2} aria-hidden="true" />
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2 pl-11.5">
      {replies.map((reply) => (
        <button
          key={reply.id}
          type="button"
          onClick={() => onPick(reply)}
          className="rounded-full border border-brand-accent bg-white px-3.5 py-2 text-left text-sm font-medium text-brand-dark transition-colors hover:bg-brand-soft"
        >
          {reply.label}
        </button>
      ))}
    </div>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const [hint, setHint] = useState(false)
  const [attention, setAttention] = useState(false)
  const [unread, setUnread] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [typing, setTyping] = useState(false)
  const [draft, setDraft] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  // Estado que el bucle asíncrono de respuestas necesita leer sin depender de renders
  const openRef = useRef(false)
  const runRef = useRef(0)
  const busyRef = useRef(false)
  const queueRef = useRef<QueueItem[]>([])
  const stateRef = useRef<ChatState>(initialState())
  const idRef = useRef(0)
  const greetedRef = useRef(false)
  const idleWarnRef = useRef<number | undefined>(undefined)
  const idleEndRef = useRef<number | undefined>(undefined)
  const wasOpenRef = useRef(false)

  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // ---------------------------------------------------------------- conversación

  function pushBot(step: BotStep) {
    const message: ChatMessage = {
      id: ++idRef.current,
      from: 'bot',
      text: step.text,
      time: clock(),
      links: step.links,
      quickReplies: step.quickReplies,
      persist: step.persist,
    }
    setMessages((previous) => [...previous, message])
    if (!openRef.current) setUnread((count) => count + 1)
  }

  function pushUser(text: string) {
    const id = ++idRef.current
    setMessages((previous) => [...previous, { id, from: 'user', text, time: clock() }])
    return id
  }

  function markRead(id: number) {
    setMessages((previous) => previous.map((message) => (message.id === id ? { ...message, read: true } : message)))
  }

  function clearIdle() {
    window.clearTimeout(idleWarnRef.current)
    window.clearTimeout(idleEndRef.current)
  }

  // Cada gesto del usuario (y cada vez que el asistente termina de responder) reinicia la cuenta
  function touch() {
    clearIdle()
    idleWarnRef.current = window.setTimeout(() => {
      if (busyRef.current || !openRef.current) return
      // El cierre se vuelve a armar cuando el aviso ya se mostró, para que de verdad falte 1 minuto
      window.clearTimeout(idleEndRef.current)
      enqueue({ input: { kind: 'nudge' } })
    }, IDLE_WARN_MS)
    idleEndRef.current = window.setTimeout(endConversation, IDLE_END_MS)
  }

  // Nada se guarda: al terminar se borra toda la conversación y el siguiente chat empieza de cero
  function endConversation() {
    runRef.current++
    busyRef.current = false
    queueRef.current = []
    stateRef.current = initialState()
    greetedRef.current = false
    openRef.current = false
    clearIdle()
    setTyping(false)
    setMessages([])
    setUnread(0)
    setAttention(false)
    setMenuOpen(false)
    setDraft('')
    setOpen(false)
    setCompact(false)
  }

  // Procesa los turnos uno a uno: "visto" -> pausa -> "escribiendo…" -> mensaje (y así por cada burbuja)
  async function pump() {
    if (busyRef.current) return
    busyRef.current = true
    const run = runRef.current
    const alive = () => run === runRef.current
    let endedOnWarning = false

    try {
      while (alive() && queueRef.current.length > 0) {
        const item = queueRef.current.shift() as QueueItem
        endedOnWarning = item.input.kind === 'nudge'
        const turn = respond(item.input, stateRef.current)
        stateRef.current = turn.state

        for (let index = 0; index < turn.steps.length; index++) {
          const step = turn.steps[index]

          if (index === 0 && item.msgId !== undefined) {
            await sleep(readDelay())
            if (!alive()) return
            markRead(item.msgId)
            await sleep(jitter(250, 500))
          } else {
            await sleep(index === 0 ? 500 : gapDelay())
          }
          if (!alive()) return

          setTyping(true)
          await sleep(typingDelay(step.text))
          if (!alive()) return

          setTyping(false)
          pushBot(step)
        }
      }
    } catch (error) {
      console.error('Error en el chat', error)
      if (alive()) setTyping(false)
    } finally {
      if (alive()) {
        busyRef.current = false
        if (endedOnWarning) {
          // Tras el aviso no se reinicia la cuenta: quedan exactamente (cierre - aviso) para responder
          window.clearTimeout(idleEndRef.current)
          idleEndRef.current = window.setTimeout(endConversation, IDLE_END_MS - IDLE_WARN_MS)
        } else {
          touch()
        }
      }
    }
  }

  function enqueue(item: QueueItem) {
    queueRef.current.push(item)
    void pump()
  }

  function say(text: string, input: UserInput) {
    if (queueRef.current.length >= MAX_QUEUE) return false
    touch()
    enqueue({ input, msgId: pushUser(text) })
    return true
  }

  function reset() {
    runRef.current++
    busyRef.current = false
    queueRef.current = []
    stateRef.current = initialState()
    setTyping(false)
    setMessages([])
    setMenuOpen(false)
    setDraft('')
    touch()
    enqueue({ input: { kind: 'greet' } })
  }

  // ---------------------------------------------------------------- abrir / cerrar

  function openChat() {
    openRef.current = true
    setOpen(true)
    setCompact(false)
    setHint(false)
    setAttention(false)
    setUnread(0)
    rememberHint()
    touch()
    if (!greetedRef.current) {
      greetedRef.current = true
      enqueue({ input: { kind: 'greet' } })
    }
  }

  // Minimizar esconde el chat pero lo mantiene, mientras no pase el tiempo de inactividad
  function minimizeChat() {
    openRef.current = false
    setOpen(false)
    setMenuOpen(false)
    setCompact(true)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim().slice(0, MAX_LENGTH)
    if (!text) return
    if (say(text, { kind: 'text', text })) setDraft('')
  }

  function handlePick(reply: QuickReply) {
    say(reply.say ?? reply.label, { kind: 'choice', id: reply.id })
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return
    if (menuOpen) setMenuOpen(false)
    else minimizeChat()
  }

  // ---------------------------------------------------------------- efectos

  // Aviso "¿Necesitas ayuda?" una sola vez por sesión, pasados unos segundos
  useEffect(() => {
    if (open || hintAlreadySeen()) return
    const id = window.setTimeout(() => {
      setHint(true)
      setAttention(true)
      rememberHint()
    }, HINT_DELAY_MS)
    return () => window.clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (!hint) return
    const id = window.setTimeout(() => setHint(false), HINT_VISIBLE_MS)
    return () => window.clearTimeout(id)
  }, [hint])

  // Al salir de la página no queda ningún temporizador ni respuesta a medias
  useEffect(
    () => () => {
      runRef.current++
      window.clearTimeout(idleWarnRef.current)
      window.clearTimeout(idleEndRef.current)
    },
    [],
  )

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    list.scrollTo({ top: list.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
  }, [messages, typing, open])

  useEffect(() => {
    if (open) {
      // En celular no se enfoca solo: el teclado taparía la conversación
      if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus()
    } else if (wasOpenRef.current && (!document.activeElement || document.activeElement === document.body)) {
      // Solo si el foco estaba dentro del chat; así un cierre por inactividad no le quita el foco al usuario
      launcherRef.current?.focus()
    }
    wasOpenRef.current = open
  }, [open])

  useEffect(() => {
    if (!menuOpen) return
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsidePress)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress)
  }, [menuOpen])

  // ---------------------------------------------------------------- vista

  const showDot = attention || unread > 0
  const lastId = messages.length > 0 ? messages[messages.length - 1].id : -1

  if (!open) {
    return (
      // Misma columna y mismo ancho (48px) que el botón "volver arriba", que queda justo encima
      <div className="fixed bottom-5 right-5 z-45 flex h-12 w-12 items-center justify-center sm:bottom-7 sm:right-7">
        {hint && !compact && (
          <button
            type="button"
            onClick={openChat}
            className="animate-chat-hint absolute right-full top-1/2 mr-4 w-max max-w-56 -translate-y-1/2 rounded-2xl border border-line bg-white px-5 py-3 text-center text-sm font-medium leading-snug text-ink shadow-[0_14px_34px_-12px_rgba(31,27,24,0.35)]"
          >
            ¿Necesitas ayuda?
            <br />
            Estoy aquí para ayudarte
            <span
              aria-hidden="true"
              className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-line bg-white"
            />
          </button>
        )}

        <div className="group relative">
          {/* Halos del efecto hover */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-2.5 scale-75 rounded-full bg-brand/15 opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-5 scale-75 rounded-full bg-brand/[0.07] opacity-0 transition delay-75 duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-within:scale-100 group-focus-within:opacity-100"
          />

          <button
            ref={launcherRef}
            type="button"
            onClick={openChat}
            aria-label={unread > 0 ? `Abrir chat, ${unread} mensaje${unread > 1 ? 's' : ''} nuevo${unread > 1 ? 's' : ''}` : 'Abrir chat con el asistente de Willay'}
            className={`relative z-10 grid place-items-center rounded-full bg-linear-to-br from-[#f04646] to-brand-dark shadow-[0_14px_30px_-8px_rgba(224,45,45,0.65)] transition-all duration-300 group-hover:scale-105 active:scale-95 ${
              compact ? 'h-10 w-10' : 'h-12 w-12'
            }`}
          >
            <BubbleIcon className={compact ? 'h-5 w-5' : 'h-6 w-6'} />
            {showDot && (
              <span aria-hidden="true" className="absolute -right-0.5 -top-0.5 h-4 w-4">
                <span className="animate-chat-ping absolute inset-0 rounded-full bg-brand motion-reduce:hidden" />
                <span className="relative block h-4 w-4 rounded-full border-2 border-white bg-brand" />
              </span>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      role="dialog"
      aria-label="Chat con el asistente de Willay"
      onKeyDown={handleKeyDown}
      className="animate-chat-panel fixed inset-x-3 bottom-3 z-45 flex h-[min(37rem,calc(100dvh-7rem))] origin-bottom-right flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-[0_30px_80px_-20px_rgba(31,27,24,0.35)] sm:inset-x-auto sm:bottom-7 sm:right-7 sm:h-[min(37rem,calc(100dvh-9rem))] sm:w-100"
    >
      <header className="relative flex items-center gap-2.5 border-b border-line/70 px-4 py-4 sm:gap-3 sm:px-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 h-40 w-72 -rotate-12 rounded-full bg-linear-to-l from-brand-soft-2 to-transparent"
        />
        <Logo className="relative h-9 w-9 shrink-0 sm:h-10 sm:w-10" />
        <div className="relative min-w-0 flex-1">
          <p className="font-display text-xl font-semibold leading-tight text-ink">Willay</p>
          <p className="flex items-start gap-1.5 text-[13px] leading-tight text-ink-soft">
            <span aria-hidden="true" className="mt-[5px] h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
            <span>En línea · {typing ? 'escribiendo…' : 'Asistente virtual'}</span>
          </p>
        </div>

        <div className="relative flex items-center" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Más opciones"
            aria-expanded={menuOpen}
            className="grid h-8 w-8 place-items-center rounded-full text-ink-soft sm:h-9 sm:w-9 transition-colors hover:bg-brand-soft hover:text-brand"
          >
            <EllipsisVertical className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={minimizeChat}
            aria-label="Minimizar chat"
            className="grid h-8 w-8 place-items-center rounded-full text-ink-soft sm:h-9 sm:w-9 transition-colors hover:bg-brand-soft hover:text-brand"
          >
            <Minus className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={endConversation}
            aria-label="Cerrar chat y borrar la conversación"
            title="Cerrar y borrar la conversación"
            className="grid h-8 w-8 place-items-center rounded-full text-ink-soft sm:h-9 sm:w-9 transition-colors hover:bg-brand-soft hover:text-brand"
          >
            <X className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
          </button>

          {menuOpen && (
            <div className="animate-chat-hint absolute right-0 top-full z-10 mt-2 w-60 rounded-2xl border border-line bg-white p-1.5 shadow-[0_18px_40px_-16px_rgba(31,27,24,0.35)]">
              <button
                type="button"
                onClick={reset}
                className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-brand-soft"
              >
                <RotateCcw className="h-4 w-4 text-ink-soft" strokeWidth={1.8} aria-hidden="true" />
                Reiniciar conversación
              </button>
              <a
                href={EMAIL_URL}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-brand-soft"
              >
                <Mail className="h-4 w-4 text-ink-soft" strokeWidth={1.8} aria-hidden="true" />
                Escribir por correo
              </a>
              <a
                href="/politica-de-privacidad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm text-ink transition-colors hover:bg-brand-soft"
              >
                <ShieldCheck className="h-4 w-4 text-ink-soft" strokeWidth={1.8} aria-hidden="true" />
                Política de privacidad
              </a>
            </div>
          )}
        </div>
      </header>

      <div
        ref={listRef}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-4 py-4"
      >
        {messages.map((message, index) => {
          const previous = messages[index - 1]
          const next = messages[index + 1]
          const startsGroup = !previous || previous.from !== message.from
          const endsGroup = !next || next.from !== message.from
          const showReplies = message.quickReplies && (message.persist || message.id === lastId)

          if (message.from === 'user') {
            return (
              <div key={message.id} className="animate-chat-msg flex flex-col items-end">
                <div className="max-w-[85%] select-text whitespace-pre-line rounded-2xl rounded-br-md bg-brand px-4 py-3 text-[15px] leading-snug text-white">
                  {message.text}
                </div>
                {endsGroup && (
                  <p className="mt-1 flex items-center gap-1 px-1 text-xs text-ink-faint">
                    {message.time}
                    {message.read ? (
                      <CheckCheck className="h-3.5 w-3.5 text-brand" strokeWidth={2} aria-label="Visto" />
                    ) : (
                      <Check className="h-3.5 w-3.5" strokeWidth={2} aria-label="Enviado" />
                    )}
                  </p>
                )}
              </div>
            )
          }

          return (
            <div key={message.id} className="animate-chat-msg">
              <div className="flex items-start gap-2.5">
                <div className="w-9 shrink-0">{startsGroup && <BotAvatar />}</div>
                <div className="min-w-0 max-w-[85%]">
                  <div className="select-text whitespace-pre-line rounded-2xl rounded-tl-md bg-[#f3f4f8] px-4 py-3 text-[15px] leading-snug text-ink">
                    {message.text}
                  </div>
                  {message.links && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.links.map((link) => (
                        <LinkPill key={link.label} link={link} />
                      ))}
                    </div>
                  )}
                  {endsGroup && <p className="mt-1 px-1 text-xs text-ink-faint">{message.time}</p>}
                </div>
              </div>
              {showReplies && message.quickReplies && <QuickReplies replies={message.quickReplies} onPick={handlePick} />}
            </div>
          )
        })}

        {typing && <TypingBubble withAvatar={!messages.length || messages[messages.length - 1].from !== 'bot'} />}
      </div>

      <form onSubmit={handleSubmit} className="px-4 pb-2 pt-1">
        <div className="flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pl-5 pr-1.5 shadow-sm transition focus-within:border-brand-accent focus-within:ring-4 focus-within:ring-brand/10">
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value)
              touch()
            }}
            maxLength={MAX_LENGTH}
            placeholder="Escribe tu mensaje..."
            aria-label="Escribe tu mensaje"
            autoComplete="off"
            enterKeyHint="send"
            className="min-w-0 flex-1 select-text bg-transparent py-2 text-base text-ink outline-none placeholder:text-ink-faint sm:text-[15px]"
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            aria-label="Enviar mensaje"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white shadow-md shadow-brand/30 transition-colors hover:bg-brand-dark disabled:bg-brand-accent disabled:shadow-none"
          >
            <Send className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
          </button>
        </div>
      </form>

      <p className="flex items-center justify-center gap-1.5 pb-3 text-xs text-ink-faint">
        Asistente impulsado por Willay
        <ShieldCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
      </p>
    </div>
  )
}
