export const LOGIN_URL = 'https://willay.app/login'

// Willay Academy: quien no tiene cuenta la crea y vuelve directo al curso; quien ya la tiene entra (si no hay sesión, Willay pide iniciarla y regresa)
export const ACADEMY_REGISTER_URL = 'https://willay.app/registro?volver=/academia/excel'
export const ACADEMY_COURSE_URL = 'https://willay.app/academia/excel'

// Número provisional: cambiarlo aquí actualiza todos los botones de WhatsApp (y el chat)
export const WHATSAPP_NUMBER = '51999999999'
export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
export const WHATSAPP_URL = whatsappLink('Hola, quiero solicitar una demostración de Willay')

export const EMAIL = 'willaysoporte@gmail.com'
export const EMAIL_URL = `mailto:${EMAIL}`
export const emailLink = (subject: string, body: string) =>
  `${EMAIL_URL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export const INSTAGRAM_URL = 'https://instagram.com/willayedu'
export const TIKTOK_URL = 'https://tiktok.com/@willayedu'

export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.willay.app'

export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Características', href: '#caracteristicas' },
  { label: 'Cómo funciona', href: '#como-funciona' },
  { label: 'Willay Academy', href: '#academy' },
  { label: 'Preguntas frecuentes', href: '#faq' },
] as const