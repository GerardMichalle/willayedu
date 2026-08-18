import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

const databaseUrl = process.env.DATABASE_URL
const adminKey = process.env.SURVEY_ADMIN_KEY

function getDatabase() {
  if (!databaseUrl) throw new Error('DATABASE_URL is not configured')
  return neon(databaseUrl)
}

async function ensureTable() {
  const sql = getDatabase()
  await sql`
    CREATE TABLE IF NOT EXISTS experience_survey_responses (
      id BIGSERIAL PRIMARY KEY,
      visitor_id VARCHAR(80) UNIQUE NOT NULL,
      rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
      comment VARCHAR(280),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  return sql
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    if (request.method === 'POST') {
      const { visitorId, rating, comment } = request.body ?? {}
      const validRating = Number.isInteger(rating) && rating >= 1 && rating <= 5
      const validVisitor = typeof visitorId === 'string' && /^[a-zA-Z0-9-]{20,80}$/.test(visitorId)
      const safeComment = typeof comment === 'string' ? comment.trim().slice(0, 280) : ''
      if (!validRating || !validVisitor) return response.status(400).json({ error: 'Datos de encuesta inválidos.' })
      const sql = await ensureTable()
      await sql`INSERT INTO experience_survey_responses (visitor_id, rating, comment) VALUES (${visitorId}, ${rating}, ${safeComment || null}) ON CONFLICT (visitor_id) DO NOTHING`
      return response.status(201).json({ ok: true })
    }

    if (request.method === 'GET') {
      if (!adminKey || request.headers['x-survey-admin-key'] !== adminKey) return response.status(401).json({ error: 'No autorizado.' })
      const sql = await ensureTable()
      const [summary] = await sql`SELECT COUNT(*)::int AS total, COALESCE(ROUND(AVG(rating)::numeric, 1), 0) AS average FROM experience_survey_responses`
      const ratings = await sql`SELECT rating, COUNT(*)::int AS total FROM experience_survey_responses GROUP BY rating ORDER BY rating`
      const comments = await sql`SELECT rating, comment, created_at FROM experience_survey_responses WHERE comment IS NOT NULL AND comment <> '' ORDER BY created_at DESC LIMIT 50`
      return response.status(200).json({ summary, ratings, comments })
    }

    response.setHeader('Allow', 'GET, POST')
    return response.status(405).json({ error: 'Método no permitido.' })
  } catch (error) {
    console.error('Survey API error', error)
    return response.status(500).json({ error: 'No se pudo procesar la encuesta.' })
  }
}