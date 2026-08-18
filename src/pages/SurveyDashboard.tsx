import { BarChart3, LockKeyhole, MessageSquare, RefreshCw, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

type Results = {
  summary: { total: number; average: string | number }
  ratings: { rating: number; total: number }[]
  comments: { rating: number; comment: string; created_at: string }[]
}

const ADMIN_KEY_STORAGE = 'willay-survey-admin-key'
const faces = ['😕', '😐', '🙂', '😊', '😍']

export default function SurveyDashboard() {
  const [key, setKey] = useState('')
  const [results, setResults] = useState<Results | null>(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loadResults = async (submittedKey = key) => {
    if (!submittedKey) return
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/survey', { headers: { 'x-survey-admin-key': submittedKey } })
      if (!response.ok) throw new Error(response.status === 401 ? 'La clave no es correcta.' : 'No se pudieron cargar los resultados.')
      const data = await response.json() as Results
      sessionStorage.setItem(ADMIN_KEY_STORAGE, submittedKey)
      setResults(data)
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Ocurrió un error.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const savedKey = sessionStorage.getItem(ADMIN_KEY_STORAGE)
    if (savedKey) {
      setKey(savedKey)
      void loadResults(savedKey)
    }
  }, [])

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void loadResults()
  }

  if (!results) {
    return (
      <main className="grid min-h-screen place-items-center bg-warm p-5">
        <form onSubmit={submit} className="w-full max-w-sm rounded-3xl border border-line bg-white p-7 shadow-xl shadow-brand/10">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white"><LockKeyhole size={22} /></div>
          <h1 className="mt-5 text-3xl text-ink">Resultados de encuesta</h1>
          <p className="mt-2 text-sm leading-6 text-ink-soft">Ingresa la clave privada configurada en Vercel para ver las respuestas.</p>
          <label className="mt-6 block text-sm font-semibold text-ink" htmlFor="admin-key">Clave de acceso</label>
          <input id="admin-key" type="password" value={key} onChange={(event) => setKey(event.target.value)} className="mt-2 w-full rounded-xl border border-line px-3 py-2.5 outline-none focus:border-brand" required />
          {error && <p className="mt-3 text-sm text-brand">{error}</p>}
          <button type="submit" disabled={isLoading} className="mt-5 flex w-full justify-center rounded-full bg-brand px-5 py-3 text-sm font-bold text-white disabled:bg-brand-accent">{isLoading ? 'Cargando...' : 'Ver resultados'}</button>
        </form>
      </main>
    )
  }

  const counts = new Map(results.ratings.map((item) => [item.rating, item.total]))
  const total = results.summary.total

  return (
    <main className="min-h-screen bg-warm px-4 py-10 sm:px-7">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-sm font-bold uppercase tracking-[0.15em] text-brand">Willay</p><h1 className="mt-1 text-4xl text-ink">Encuesta de experiencia</h1></div>
          <button type="button" onClick={() => void loadResults()} className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand"><RefreshCw size={16} />Actualizar</button>
        </div>
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <article className="rounded-3xl bg-ink p-6 text-white"><BarChart3 className="text-brand-accent" /><p className="mt-5 text-sm text-white/65">Respuestas recibidas</p><p className="mt-1 text-5xl font-semibold">{total}</p></article>
          <article className="rounded-3xl border border-brand-accent bg-brand-soft p-6"><Star className="text-brand" fill="currentColor" /><p className="mt-5 text-sm text-ink-soft">Calificación promedio</p><p className="mt-1 text-5xl font-semibold text-ink">{results.summary.average}<span className="text-xl text-ink-soft"> / 5</span></p></article>
        </section>
        <section className="mt-6 rounded-3xl border border-line bg-white p-5 sm:p-7"><h2 className="text-2xl text-ink">Calificaciones</h2><div className="mt-5 grid grid-cols-5 gap-2">{faces.map((face, index) => { const count = counts.get(index + 1) ?? 0; const percentage = total ? (count / total) * 100 : 0; return <div key={face} className="rounded-2xl bg-warm p-3 text-center"><span className="text-2xl">{face}</span><p className="mt-2 text-xl font-bold text-ink">{count}</p><div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-brand" style={{ width: `${percentage}%` }} /></div></div> })}</div></section>
        <section className="mt-6 rounded-3xl border border-line bg-white p-5 sm:p-7"><div className="flex items-center gap-2"><MessageSquare size={20} className="text-brand" /><h2 className="text-2xl text-ink">Comentarios</h2></div>{results.comments.length ? <div className="mt-5 space-y-3">{results.comments.map((item, index) => <article key={`${item.created_at}-${index}`} className="rounded-2xl bg-warm p-4"><span>{faces[item.rating - 1]}</span><p className="mt-2 text-sm leading-6 text-ink-soft">{item.comment}</p><time className="mt-2 block text-xs text-ink-faint">{new Date(item.created_at).toLocaleDateString('es-PE')}</time></article>)}</div> : <p className="mt-5 text-sm text-ink-soft">Aún no hay comentarios.</p>}</section>
      </div>
    </main>
  )
}