import { Heart, Send, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const SURVEY_SEEN_KEY = 'willay-experience-survey-seen-v2'
const SURVEY_RESPONSE_KEY = 'willay-experience-survey-response'
const SURVEY_VISITOR_KEY = 'willay-survey-visitor-id'

const ratings = [
  { value: 1, label: 'No me gustó', emoji: '😕' },
  { value: 2, label: 'Podría mejorar', emoji: '😐' },
  { value: 3, label: 'Está bien', emoji: '🙂' },
  { value: 4, label: 'Muy buena', emoji: '😊' },
  { value: 5, label: 'Me encantó', emoji: '😍' },
]

export default function ExperienceSurvey() {
  const [isOpen, setIsOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (localStorage.getItem(SURVEY_SEEN_KEY)) return

    const showWhenAtEnd = () => {
      const distanceToEnd = document.documentElement.scrollHeight - window.innerHeight - window.scrollY
      if (distanceToEnd <= 120) {
        setIsOpen(true)
        localStorage.setItem(SURVEY_SEEN_KEY, 'true')
        window.removeEventListener('scroll', showWhenAtEnd)
      }
    }

    window.addEventListener('scroll', showWhenAtEnd, { passive: true })
    const initialCheck = window.setTimeout(showWhenAtEnd, 350)
    return () => {
      window.removeEventListener('scroll', showWhenAtEnd)
      window.clearTimeout(initialCheck)
    }
  }, [])

  const submitSurvey = async () => {
    if (!rating || isSubmitting) return
    setIsSubmitting(true)
    setSubmitError('')
    const visitorId = localStorage.getItem(SURVEY_VISITOR_KEY) ?? crypto.randomUUID()

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId, rating, comment: comment.trim() }),
      })
      if (!response.ok) throw new Error()
      localStorage.setItem(SURVEY_VISITOR_KEY, visitorId)
      localStorage.setItem(SURVEY_RESPONSE_KEY, JSON.stringify({ rating, comment: comment.trim(), answeredAt: new Date().toISOString() }))
      setIsComplete(true)
    } catch {
      setSubmitError('No pudimos enviar tu respuesta. Inténtalo nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/35 p-3 backdrop-blur-[2px] sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="experience-survey-title">
      <div className="animate-[survey-enter_.45s_cubic-bezier(.16,1,.3,1)_both] relative w-full max-w-md overflow-hidden rounded-[1.75rem] border border-brand-accent/70 bg-warm shadow-[0_24px_80px_rgba(53,32,28,.28)]">
        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-brand-soft-2" />
        <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#f8e3cf]" />
        <button type="button" onClick={() => setIsOpen(false)} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-ink-soft transition hover:bg-brand-soft hover:text-brand" aria-label="Cerrar encuesta"><X size={19} /></button>

        {isComplete ? (
          <div className="relative flex min-h-80 flex-col items-center justify-center px-7 py-10 text-center">
            <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25"><Heart size={30} fill="currentColor" /></div>
            <h2 id="experience-survey-title" className="text-3xl text-ink">¡Gracias por contarnos!</h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-ink-soft">Tu opinión nos ayuda a hacer de Willay una experiencia aún mejor para las familias.</p>
            <button type="button" onClick={() => setIsOpen(false)} className="mt-7 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand">Continuar navegando</button>
          </div>
        ) : (
          <div className="relative px-5 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-9">
            <h2 id="experience-survey-title" className="max-w-sm text-3xl leading-tight text-ink sm:text-[2.05rem]">¿Qué tal fue tu experiencia en la web?</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">Te tomará solo unos segundos.</p>
            <div className="mt-6 grid grid-cols-5 gap-1.5 sm:gap-2" aria-label="Califica tu experiencia">
              {ratings.map(({ value, label, emoji }) => (
                <button key={value} type="button" onClick={() => setRating(value)} className={`group flex min-h-16 flex-col items-center justify-center rounded-2xl border px-1 text-center transition sm:min-h-18 ${rating === value ? 'border-brand bg-brand-soft-2 shadow-sm' : 'border-line bg-white hover:-translate-y-0.5 hover:border-brand-accent hover:bg-brand-soft'}`} aria-label={label} aria-pressed={rating === value}>
                  <span className="text-xl transition group-hover:scale-110 sm:text-2xl">{emoji}</span><span className="mt-1 text-[9px] font-semibold leading-3 text-ink-soft sm:text-[10px]">{label}</span>
                </button>
              ))}
            </div>
            <label className="mt-5 block text-xs font-semibold text-ink-soft" htmlFor="survey-comment">¿Quieres dejarnos un comentario? <span className="font-normal">(opcional)</span></label>
            <textarea id="survey-comment" value={comment} onChange={(event) => setComment(event.target.value)} maxLength={280} placeholder="Cuéntanos qué podríamos mejorar..." className="mt-2 min-h-20 w-full resize-none rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand" />
            {submitError && <p className="mt-3 text-center text-xs font-medium text-brand">{submitError}</p>}
            <button type="button" disabled={!rating || isSubmitting} onClick={submitSurvey} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-brand-accent disabled:shadow-none">{isSubmitting ? 'Enviando...' : 'Enviar mi opinión'} <Send size={16} /></button>
          </div>
        )}
      </div>
    </div>
  )
}