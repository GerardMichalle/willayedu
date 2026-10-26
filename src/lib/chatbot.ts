import {
  EMAIL,
  EMAIL_URL,
  INSTAGRAM_URL,
  LOGIN_URL,
  PLAY_STORE_URL,
  TIKTOK_URL,
  WHATSAPP_URL,
  emailLink,
  whatsappLink,
} from './constants'

// Motor del asistente: sin React ni red, solo "mensaje del usuario + estado -> respuestas + estado".
// El widget (components/ChatWidget.tsx) se encarga de mostrarlas con retardos y "escribiendo…".
// Todo lo que afirma el asistente sale de lo que ya dicen la web, los Términos y la Política de privacidad.

export type ChatIcon = 'calendar' | 'file' | 'tag' | 'help'

export interface QuickReply {
  id: string
  label: string
  /** Texto que aparece como mensaje del usuario al tocar el botón (por defecto, la etiqueta) */
  say?: string
  /** Si todos los botones de un mensaje traen ícono se muestran como tarjetas (menú principal) */
  icon?: ChatIcon
}

export interface ChatLink {
  label: string
  href: string
  external?: boolean
}

export interface BotStep {
  text: string
  links?: ChatLink[]
  quickReplies?: QuickReply[]
  /** Los botones se quedan visibles aunque el usuario ya haya respondido (menú del saludo) */
  persist?: boolean
}

export type UserInput =
  | { kind: 'greet' }
  | { kind: 'nudge' }
  | { kind: 'text'; text: string }
  | { kind: 'choice'; id: string }

type LeadPurpose = 'demo' | 'pricing'
type LeadStep = 'name' | 'institution' | 'size' | 'contact'

interface Lead {
  purpose: LeadPurpose
  step: LeadStep
  name?: string
  firstName?: string
  institution?: string
  size?: string
  contact?: string
  tries: number
}

export interface ChatState {
  lead: Lead | null
  /** Última solicitud completada, para "Ya lo envié" / "Corregir mis datos" */
  lastLead: Lead | null
  misses: number
  turns: number
  /** Ya se mostró el aviso de inactividad de este silencio */
  nudged: boolean
}

export interface Turn {
  steps: BotStep[]
  state: ChatState
  /** Qué entendió el motor; útil para depurar y para las pruebas */
  intent: string
}

export const initialState = (): ChatState => ({ lead: null, lastLead: null, misses: 0, turns: 0, nudged: false })

// ---------------------------------------------------------------- utilidades

const pick = <T,>(options: T[]): T => options[Math.floor(Math.random() * options.length)]

export const normalize = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9@+\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const q = (id: string, label: string, say?: string): QuickReply => ({ id, label, say })

const stripChips = (step: BotStep): BotStep => ({ ...step, quickReplies: undefined, persist: undefined })

const WHATSAPP_LINK: ChatLink = { label: 'Escribir por WhatsApp', href: WHATSAPP_URL, external: true }
const EMAIL_LINK: ChatLink = { label: 'Escribir por correo', href: EMAIL_URL }

// ---------------------------------------------------------------- reconocimiento de intención

type Pattern = [RegExp, number]

// Orden = prioridad en caso de empate. Los patrones se aplican sobre texto normalizado (sin tildes ni signos).
const INTENTS: { id: string; patterns: Pattern[] }[] = [
  {
    id: 'bot',
    patterns: [
      [/\beres (un |una )?(bot|robot|maquina|ia|real|humano|humana|persona)\b/, 3],
      [/\b(chatbot|chat bot|inteligencia artificial)\b/, 3],
    ],
  },
  {
    id: 'human',
    patterns: [
      [/\b(persona|humano|humana|asesor|asesora|agente|ejecutivo|ejecutiva|vendedor|vendedora)\b/, 2],
      [/\b(hablar|conversar|comunicarme|comunicarnos|contactar|contactarme|llamar|llamen|llamada) (con|a)\b/, 2],
      [/\b(whatsapp|wasap|watsap|correo|email|mail|numero|telefono|contacto|contactarlos)\b/, 1.5],
    ],
  },
  {
    id: 'pagos',
    patterns: [
      [/\b(pagos? en linea|pagar (la |las )?(pension|pensiones|mensualidad|mensualidades)|pension|pensiones|cobranza|cobranzas|yape|plin|pasarela)\b/, 3],
    ],
  },
  {
    id: 'quote',
    patterns: [[/\b(cotizacion|cotizar|presupuesto|propuesta)\b/, 3]],
  },
  {
    id: 'pricing',
    patterns: [
      [/\b(precio|precios|costo|costos|tarifa|tarifas|plan|planes|mensualidad|inversion)\b/, 2],
      [/\bcuanto (cuesta|cuestan|sale|salen|cobran|cobra|vale|valen|es|seria|pagar|pagaria|pagamos|debo pagar)\b/, 3],
      [/\b(suscripcion|licencia|descuento|oferta|promocion|gratis|gratuito|gratuitos)\b/, 1],
    ],
  },
  {
    id: 'demo',
    patterns: [
      [/\b(demo|demostracion|demostraciones|probar|probarlo|prueba|agendar|agenda|reunion|cita|visita|visitarnos)\b/, 2],
      [/\b(contratar|contratarlo|adquirir|me interesa|nos interesa|estoy interesad[oa]|estamos interesad[oa])\b/, 2.5],
      [/\b(solicitar|solicito|pedir|quiero) (una |la )?(demo|demostracion|reunion)\b/, 3],
    ],
  },
  {
    id: 'features',
    patterns: [
      [/\b(caracteristicas|funciones|funcionalidades|modulos|beneficios|ventajas)\b/, 2],
      [/\bque (hace|ofrece|incluye|tiene|puede hacer)\b/, 2],
      [/\b(para que sirve|que es willay|que es esto|de que trata|como funciona (willay|el sistema|la plataforma|esto))\b/, 2.5],
      [/^como funciona$/, 2],
    ],
  },
  {
    id: 'faq',
    patterns: [[/\b(preguntas frecuentes|faq|tengo (una )?(pregunta|duda|dudas)|otra (pregunta|duda)|mas dudas|dudas)\b/, 1.5]],
  },
  {
    id: 'start',
    patterns: [
      [/\b(que necesito|que necesitamos|requisitos|requerimientos|equipos|equipamiento|instalacion|instalar|implementacion|implementar|implementan|puesta en marcha|migrar|migracion|importar)\b/, 2.5],
      [/\bcomo (empiezo|empezamos|inicio|iniciamos|comenzamos|empezar|comenzar)\b/, 2.5],
      [/\bcuanto (demora|tarda|toma|tiempo)\b/, 2.5],
      [/\b(comprar|compra) (los |las |unos |equipos|lectores|tarjetas)/, 2.5],
    ],
  },
  {
    id: 'asistencia',
    patterns: [
      [/\b(asistencia|tardanza|tardanzas|puntualidad|puntual|rfid|nfc|carnet|credencial|credenciales|marcar|fotocheck)\b/, 2],
      [/\b(tarjeta|tarjetas|qr|lector|lectores)\b/, 1.5],
    ],
  },
  {
    id: 'alertas',
    patterns: [[/\b(alerta|alertas|aviso|avisos|avisan|avisar|notificacion|notificaciones|notifican|push|me entero|enterar|enteran)\b/, 2]],
  },
  {
    id: 'libretas',
    patterns: [[/\b(libreta|libretas|notas|boleta|boletas|calificacion|calificaciones|promedio|promedios|bimestre|bimestres|trimestre)\b/, 2]],
  },
  {
    id: 'comunicados',
    patterns: [[/\b(comunicado|comunicados|circular|circulares|anuncio|anuncios|mensajes? a (los )?(padres|familias|apoderados))\b/, 2]],
  },
  {
    id: 'reportes',
    patterns: [[/\b(reporte|reportes|informe|informes|excel|exportar|estadistica|estadisticas|indicador|indicadores|dashboard|panel)\b/, 2]],
  },
  {
    id: 'app',
    patterns: [[/\b(app|aplicacion|android|iphone|ios|apple|play store|google play|playstore|celular|movil|descargar|descarga)\b/, 2]],
  },
  {
    id: 'access',
    patterns: [
      [/\bsoy (un |una )?(padre|madre|papa|mama|apoderado|apoderada|familiar|familia|tutor|tutora|alumno|alumna|estudiante|profe|profesor|profesora|docente|maestro|maestra)\b/, 2.5],
      [/\bmi (hijo|hija|hijos|nino|nina|menor)\b/, 2],
      [/\b(como (ingreso|entro|accedo|me registro|creo (mi |una )?cuenta|inicio sesion)|registrarme|registrarse|crear (mi |una )?cuenta|iniciar sesion|login|contrasena|clave|usuario|olvide|no puedo (entrar|ingresar|acceder))\b/, 2.5],
    ],
  },
  {
    id: 'datos',
    patterns: [
      [/\b(datos|privacidad|seguridad|seguro|segura|proteccion|confidencial|confidencialidad|29733|menores|cifrado|cifrada|hackeo|hackear|filtracion|dueno|duenos|titular)\b/, 2],
      [/\bquien (ve|puede ver|tiene acceso|accede)\b/, 2.5],
      [/\bde quien son\b/, 3],
    ],
  },
  {
    id: 'offline',
    patterns: [
      [/\b(sin internet|sin conexion|offline|no hay internet|se cae (el )?internet|cae el internet|internet (falla|lento|malo|inestable)|corte de (luz|internet)|apagon)\b/, 3],
    ],
  },
  {
    id: 'cursos',
    patterns: [
      [/\b(curso|cursos|clases|capacitacion|aprender|cuentos|matematicas|economia|finanzas)\b/, 2],
      [/\b(gratis|gratuito|gratuitos)\b/, 1],
    ],
  },
  {
    id: 'soporte',
    patterns: [
      [/\b(soporte|ayuda tecnica|reclamo|queja|incidencia|falla|fallas|error|bug)\b/, 2],
      [/\b(no (me )?(funciona|carga|abre|deja)|ya (soy|somos) (cliente|clientes|usuario|usuarios)|tengo un problema|problema con)\b/, 2.5],
    ],
  },
  { id: 'despedida', patterns: [[/\b(adios|chau|chao|hasta luego|hasta pronto|nos vemos|bye|me voy)\b/, 0.8]] },
  { id: 'no', patterns: [[/^(no|nop|nada|no gracias|nada mas|eso es todo|eso seria todo)$/, 0.8]] },
  { id: 'yes', patterns: [[/^(si|sip|sii+|claro|ya|por favor|dale)$/, 0.8]] },
  {
    id: 'gracias',
    patterns: [[/\b(gracias|muchas gracias|te agradezco|muy amable|genial|excelente|perfecto|ok|okey|listo|entendido|vale)\b/, 0.6]],
  },
  {
    id: 'saludo',
    patterns: [[/^(hola|holi|holaa+|buenas|buen dia|buenos dias|buenas tardes|buenas noches|hey|ey|que tal|saludos)\b/, 0.6]],
  },
]

export function detect(normalized: string): { id: string; score: number } | null {
  let best: { id: string; score: number } | null = null
  for (const { id, patterns } of INTENTS) {
    let score = 0
    for (const [regex, weight] of patterns) if (regex.test(normalized)) score += weight
    if (score > 0 && (!best || score > best.score)) best = { id, score }
  }
  return best && best.score >= 0.6 ? best : null
}

// ---------------------------------------------------------------- respuestas

const MENU: QuickReply[] = [
  { id: 'demo', label: 'Solicitar una demostración', say: 'Quiero solicitar una demostración', icon: 'calendar' },
  { id: 'features', label: 'Conocer las características', say: 'Quiero conocer las características', icon: 'file' },
  { id: 'pricing', label: 'Planes y precios', say: 'Quiero más información sobre los planes', icon: 'tag' },
  { id: 'faq', label: 'Preguntas frecuentes', say: 'Tengo una pregunta', icon: 'help' },
]

const TOPICS: Record<string, () => BotStep[]> = {
  features: () => [
    {
      text: 'Con gusto 😊 Para no repetirte lo que ya ves en la página, dime qué parte te interesa y te la cuento con un ejemplo del día a día.',
      quickReplies: [
        q('asistencia', 'Asistencia', 'Cuéntame sobre la asistencia'),
        q('alertas', 'Avisos a las familias', 'Cuéntame sobre los avisos a las familias'),
        q('libretas', 'Libretas', 'Cuéntame sobre las libretas'),
        q('comunicados', 'Comunicados', 'Cuéntame sobre los comunicados'),
        q('reportes', 'Reportes', 'Cuéntame sobre los reportes'),
        q('app', 'La app', 'Cuéntame sobre la app'),
      ],
    },
  ],

  faq: () => [
    {
      text: 'Estas son las dudas que más nos hacen y que no siempre se ven en la página 👇',
      quickReplies: [
        q('access', 'Soy familia, ¿cómo ingreso?'),
        q('offline', '¿Y si se cae el internet?'),
        q('start', '¿Qué necesito para empezar?'),
        q('datos', '¿De quién son los datos?'),
        q('cursos', 'Cursos gratuitos'),
        q('soporte', 'Ya soy cliente y necesito ayuda'),
      ],
    },
  ],

  // PRECIOS: todavía no están definidos. Cuando existan planes, reemplaza este bloque por las cifras reales.
  pricing: () => [
    {
      text: 'Buena pregunta 😊 El costo depende del tamaño de tu institución y de lo que necesites (por ejemplo, las tarjetas y los lectores RFID), por eso lo calculamos caso por caso.',
    },
    {
      text: 'Si me cuentas un poco de tu institución, el equipo te prepara una propuesta a tu medida.',
      quickReplies: [
        q('quote', 'Pedir una propuesta', 'Quiero que me envíen una propuesta'),
        q('demo', 'Mejor ver una demostración', 'Prefiero ver una demostración'),
        q('start', '¿Qué necesito para empezar?'),
      ],
    },
  ],

  asistencia: () => [
    {
      text: 'Piensa en la entrada de las 7:30. El estudiante pasa su tarjeta por el lector (o el personal escanea el código QR de su credencial con el celular) y Willay registra la hora al instante.',
    },
    {
      text: 'Según el horario que defina tu institución, lo marca como puntual o tardanza, y la familia y tu equipo lo ven en la plataforma de inmediato. Sin planillas ni digitar después.',
      quickReplies: [
        q('alertas', 'Avisos a las familias', 'Cuéntame sobre los avisos a las familias'),
        q('start', '¿Qué necesito para empezar?'),
        q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
      ],
    },
  ],

  alertas: () => [
    {
      text: 'Cuando el estudiante ingresa o sale, el apoderado recibe el aviso dentro de Willay. Si usa la app Android y activa las notificaciones, le llega también al celular, como cualquier mensaje.',
    },
    {
      text: 'Lo mismo pasa cuando se publica una libreta o un comunicado nuevo.',
      quickReplies: [
        q('app', 'Sobre la app', 'Cuéntame sobre la app'),
        q('libretas', 'Libretas', 'Cuéntame sobre las libretas'),
        q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
      ],
    },
  ],

  libretas: () => [
    { text: 'El tutor de cada aula sube la libreta oficial de tu institución (escaneada o en PDF) cada bimestre.' },
    {
      text: 'La familia la consulta y la descarga cuando quiera, sin esperar la reunión presencial. Tú sigues usando tu formato de siempre.',
      quickReplies: [
        q('comunicados', 'Comunicados', 'Cuéntame sobre los comunicados'),
        q('reportes', 'Reportes', 'Cuéntame sobre los reportes'),
        q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
      ],
    },
  ],

  comunicados: () => [
    {
      text: 'Puedes enviar un comunicado a toda la institución o solo a un aula, y ver quién ya lo leyó y quién todavía no. Así no dependes de preguntar "¿les llegó el mensaje?".',
      quickReplies: [
        q('alertas', 'Avisos a las familias', 'Cuéntame sobre los avisos a las familias'),
        q('reportes', 'Reportes', 'Cuéntame sobre los reportes'),
        q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
      ],
    },
  ],

  reportes: () => [
    {
      text: 'El padrón de estudiantes y los registros de asistencia se exportan a Excel en segundos, listos para compartir con dirección. Además, en el panel ves indicadores en tiempo real, como la asistencia del día.',
      quickReplies: [
        q('asistencia', 'Asistencia', 'Cuéntame sobre la asistencia'),
        q('libretas', 'Libretas', 'Cuéntame sobre las libretas'),
        q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
      ],
    },
  ],

  app: () => [
    { text: 'La app de Willay ya está disponible en Google Play para Android. La versión para iPhone llegará próximamente.' },
    {
      text: 'Las familias reciben los avisos de ingreso y salida, y el personal puede registrar asistencia escaneando el código QR con la cámara.',
      links: [{ label: 'Ver en Google Play', href: PLAY_STORE_URL, external: true }],
      quickReplies: [
        q('offline', '¿Y si se cae el internet?'),
        q('access', 'Soy familia, ¿cómo ingreso?'),
        q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
      ],
    },
  ],

  access: () => [
    {
      text: 'En Willay no hay registro público: tu institución educativa es la que crea tu cuenta, sea de familia, docente o estudiante.',
    },
    {
      text: 'Si ya tienes tus datos, ingresa desde el navegador del celular, tablet o computadora, o con la app Android. Si todavía no los tienes, pídelos en tu institución.',
      links: [
        { label: 'Iniciar sesión', href: LOGIN_URL, external: true },
        { label: 'Descargar la app', href: PLAY_STORE_URL, external: true },
      ],
      quickReplies: [
        q('soporte', 'Necesito ayuda con mi cuenta'),
        q('demo', 'Quiero Willay en mi institución', 'Quiero Willay en mi institución'),
      ],
    },
  ],

  datos: () => [
    {
      text: 'Los datos son de tu institución: ella es la titular del banco de datos y Willay solo los procesa por encargo suyo, bajo la Ley N.° 29733. No se usan para publicidad ni se venden.',
    },
    {
      text: 'Y cada perfil (dirección, docentes, estudiantes, familias y administrativos) accede solo a lo que le corresponde.',
      links: [{ label: 'Política de privacidad', href: '/politica-de-privacidad', external: true }],
      quickReplies: [q('demo', 'Ver una demostración', 'Quiero ver una demostración'), q('human', 'Hablar con el equipo')],
    },
  ],

  offline: () => [
    {
      text: 'Si se cae el internet no se pierde la asistencia 👌 Cuando el personal registra con la app (escaneando el QR), las lecturas quedan guardadas en el teléfono y se envían solas al volver la conexión.',
    },
    {
      text: 'Eso aplica a la app; cómo se maneja con los lectores RFID en tu caso te lo explica el equipo en la demostración.',
      quickReplies: [
        q('app', 'Sobre la app', 'Cuéntame sobre la app'),
        q('start', '¿Qué necesito para empezar?'),
        q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
      ],
    },
  ],

  start: () => [
    {
      text: 'Primero cargamos tus aulas, estudiantes, docentes y apoderados; la matrícula se puede importar masivamente desde Excel, sin digitar uno por uno.',
    },
    {
      text: 'Después se coordina la parte física: las tarjetas de los estudiantes y los lectores RFID. También se puede registrar con el código QR de la credencial desde el celular del personal. Los tiempos los define el equipo contigo según tu institución.',
      quickReplies: [
        q('pricing', 'Planes y precios', 'Quiero más información sobre los planes'),
        q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
        q('human', 'Hablar con el equipo'),
      ],
    },
  ],

  cursos: () => [
    {
      text: 'Willay está preparando cursos gratuitos para sus usuarios: Economía y Finanzas y, para los más chicos, Matemáticas Divertidas y Cuentos para Crecer.',
    },
    {
      text: 'Todavía están en camino. Para enterarte apenas salgan, síguenos en Instagram o TikTok 👇',
      links: [
        { label: 'Instagram', href: INSTAGRAM_URL, external: true },
        { label: 'TikTok', href: TIKTOK_URL, external: true },
      ],
      quickReplies: [q('demo', 'Ver una demostración', 'Quiero ver una demostración'), q('faq', 'Otra pregunta', 'Tengo otra pregunta')],
    },
  ],

  soporte: () => [
    {
      text: `Si ya usas Willay y algo no va bien, escríbenos a ${EMAIL} contándonos tu institución y qué te pasa. Si puedes, adjunta una captura de pantalla.`,
      links: [{ label: 'Escribir a soporte', href: EMAIL_URL }],
      quickReplies: [q('access', 'No puedo ingresar'), q('faq', 'Otra pregunta', 'Tengo otra pregunta')],
    },
  ],

  pagos: () => [
    {
      text: 'Sí, los pagos en línea forman parte de lo que ofrece Willay. Cómo se configuran para tu institución lo ve el equipo contigo en la demostración.',
      quickReplies: [
        q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
        q('pricing', 'Planes y precios', 'Quiero más información sobre los planes'),
        q('human', 'Hablar con el equipo'),
      ],
    },
  ],

  human: () => [
    {
      text: 'Claro 😊 Soy un asistente virtual, pero el equipo de Willay puede atenderte directamente. Elige cómo prefieres:',
      links: [WHATSAPP_LINK, EMAIL_LINK],
      quickReplies: [q('demo', 'Prefiero dejar mis datos aquí', 'Prefiero dejar mis datos aquí')],
    },
  ],

  bot: () => [
    {
      text: 'Soy el asistente virtual de Willay 🤖 Te respondo al instante lo más común, y si prefieres a una persona del equipo, te conecto por WhatsApp o correo.',
      quickReplies: [q('human', 'Hablar con el equipo'), q('faq', 'Preguntas frecuentes', 'Tengo una pregunta')],
    },
  ],

  gracias: () => [
    {
      text: `${pick(['¡Con gusto! 😊', '¡Para eso estoy! 😊'])} ¿Te ayudo con algo más?`,
      quickReplies: [q('faq', 'Otra pregunta', 'Tengo otra pregunta'), q('demo', 'Ver una demostración', 'Quiero ver una demostración'), q('no', 'Eso es todo', 'Eso es todo, gracias')],
    },
  ],

  stay: () => [{ text: '¡Genial, aquí seguimos! 😊 ¿En qué te ayudo?', quickReplies: MENU }],
  despedida: () => [{ text: '¡Hasta pronto! Si necesitas algo más, aquí estaré 👋' }],
  no: () => [{ text: '¡Perfecto! Si más adelante te surge algo, aquí estaré 👋' }],
  yes: () => [{ text: '¡Genial! ¿Sobre qué te cuento?', quickReplies: MENU }],
  saludo: () => [{ text: '¡Hola de nuevo! 😊 ¿En qué te puedo ayudar?', quickReplies: MENU }],
}

export const greeting = (): BotStep[] => [
  { text: '¡Hola! 👋 Soy el asistente de Willay. ¿En qué puedo ayudarte hoy?', quickReplies: MENU, persist: true },
]

// ---------------------------------------------------------------- flujo de solicitud (demostración / propuesta)

const ASK: Record<LeadStep, string> = {
  name: '¿Cómo te llamas?',
  institution: '¿Cómo se llama tu institución educativa?',
  size: '¿Cuántos estudiantes tienen, aproximadamente?',
  contact: '¿A qué celular (WhatsApp) o correo te escribimos?',
}

const SIZE_CHOICES: Record<string, string> = {
  'size:xs': 'Menos de 200',
  'size:s': 'De 200 a 500',
  'size:m': 'De 500 a 1000',
  'size:l': 'Más de 1000',
  'size:unknown': 'Aún no lo sé',
}

const CANCEL = q('cancel', 'Mejor después', 'Mejor lo veo después')

const chipsFor = (step: LeadStep): QuickReply[] =>
  step === 'size' ? [...Object.entries(SIZE_CHOICES).map(([id, label]) => q(id, label)), CANCEL] : [CANCEL]

const CANCEL_RE = /\b(cancelar|cancela|olvidalo|olvidalo|mejor (despues|luego|otro dia)|no quiero|ya no|no gracias|dejalo)\b/

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()

function parseName(text: string): { full: string; first: string } | null {
  const trimmed = text
    .trim()
    .replace(/[.!,;:]+$/g, '')
    .replace(/^(?:(?:hola|buenas|buenos dias|buenas tardes|buenas noches)[,\s]+)?(?:soy|me llamo|mi nombre es|mi nombre|yo soy)\s+/i, '')
  if (!/^[\p{L}][\p{L}'’ .-]{1,39}$/u.test(trimmed)) return null
  const words = trimmed.split(/\s+/).slice(0, 4).map(capitalize)
  const full = words.join(' ')
  if (['no', 'si', 'nada', 'ok', 'hola', 'gracias'].includes(normalize(full))) return null
  return { full, first: words[0] }
}

function parseInstitution(text: string): string | null {
  const trimmed = text
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^(?:mi (?:institucion|colegio|cole|escuela) (?:es|se llama)|trabajo en|trabajamos en|estoy en|soy de|somos del?|se llama)\s+/i, '')
    .replace(/[.!]+$/g, '')
  if (trimmed.length < 3 || trimmed.length > 80 || !/\p{L}/u.test(trimmed)) return null
  return trimmed
}

function parseSize(text: string): string | null {
  const number = text.match(/\d[\d.,]*/)
  if (number) {
    const value = parseInt(number[0].replace(/[.,]/g, ''), 10)
    if (value >= 1 && value <= 100000) return `Aprox. ${value}`
  }
  return /\b(no se|no estoy segur[oa]|ni idea|aun no|todavia no)\b/.test(normalize(text)) ? 'Aún no lo sé' : null
}

function parseContact(text: string): string | null {
  const email = text.match(/[^\s@]+@[^\s@]+\.[^\s@]{2,}/)
  if (email && email[0].length <= 80) return email[0].toLowerCase()
  const phone = text.match(/(?:\+?\s?51[\s.-]?)?(9(?:[\s.-]?\d){8})/)
  if (!phone) return null
  const digits = phone[1].replace(/\D/g, '')
  return `+51 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
}

const purposeText = (purpose: LeadPurpose) =>
  purpose === 'demo' ? 'una demostración de Willay' : 'una propuesta (cotización) de Willay'

function startLead(purpose: LeadPurpose, state: ChatState): Turn {
  if (state.lead) {
    const step = state.lead.step
    return {
      steps: [{ text: `¡Eso mismo estamos haciendo! 😄 ${ASK[step]}`, quickReplies: chipsFor(step) }],
      state,
      intent: 'lead-resume',
    }
  }
  const intro =
    purpose === 'demo'
      ? '¡Con gusto! 😊 La demostración no tiene costo y la adaptamos a la realidad de tu institución.'
      : 'Perfecto 😊 Con unos datos de tu institución, el equipo te prepara una propuesta a tu medida.'
  return {
    steps: [
      { text: intro },
      { text: 'Te haré 4 preguntas rápidas para que lleguen preparados. Primero, ¿cómo te llamas?', quickReplies: chipsFor('name') },
    ],
    state: { ...state, misses: 0, lead: { purpose, step: 'name', tries: 0 } },
    intent: purpose === 'demo' ? 'demo' : 'quote',
  }
}

function cancelLead(state: ChatState): Turn {
  return {
    steps: [
      {
        text: '¡Sin problema! Cuando quieras lo retomamos 😊 ¿Te ayudo con otra cosa?',
        quickReplies: [q('faq', 'Preguntas frecuentes', 'Tengo una pregunta'), q('human', 'Hablar con el equipo')],
      },
    ],
    state: { ...state, lead: null },
    intent: 'lead-cancel',
  }
}

function leadSummary(lead: Lead): BotStep[] {
  const subject = lead.purpose === 'demo' ? `Solicitud de demostración - ${lead.institution}` : `Solicitud de propuesta - ${lead.institution}`
  const message = [
    `Hola, soy ${lead.name} de ${lead.institution}. Quiero ${purposeText(lead.purpose)}.`,
    `Estudiantes: ${lead.size}`,
    `Contacto: ${lead.contact}`,
  ].join('\n')
  return [
    {
      text: `Listo, ${lead.firstName} ✅ Esto es lo que va en tu solicitud:\n• Institución: ${lead.institution}\n• Estudiantes: ${lead.size}\n• Contacto: ${lead.contact}`,
    },
    {
      text: 'Para que le llegue al equipo, envíala por el medio que prefieras 👇',
      links: [
        { label: 'Enviar por WhatsApp', href: whatsappLink(message), external: true },
        { label: 'Enviar por correo', href: emailLink(subject, message) },
      ],
      quickReplies: [q('done', 'Ya la envié', 'Ya la envié'), q('fix', 'Corregir mis datos'), q('faq', 'Otra pregunta', 'Tengo otra pregunta')],
    },
  ]
}

/** Responde otra pregunta en medio de la solicitud y retoma donde se quedó */
function interrupt(id: string | null, state: ChatState): Turn {
  const lead = state.lead as Lead
  if (id === 'demo' || id === 'quote') return startLead(lead.purpose, state)
  const body: BotStep[] = id && TOPICS[id] ? TOPICS[id]().map(stripChips) : [{ text: 'Esa no la tengo a la mano 🤔 Te la responde el equipo cuando te contacte.' }]
  return {
    steps: [...body, { text: `Retomando tu solicitud: ${ASK[lead.step]}`, quickReplies: chipsFor(lead.step) }],
    state: { ...state, misses: 0 },
    intent: id ?? 'interrupt',
  }
}

function advance(lead: Lead, state: ChatState): Turn {
  switch (lead.step) {
    case 'name':
      return {
        steps: [{ text: `Mucho gusto, ${lead.firstName} 🙌 ${ASK.institution}`, quickReplies: chipsFor('institution') }],
        state: { ...state, lead: { ...lead, step: 'institution', tries: 0 } },
        intent: 'lead-name',
      }
    case 'institution':
      return {
        steps: [{ text: `${pick(['Excelente', 'Muy bien', 'Perfecto'])} 👌 ${ASK.size}`, quickReplies: chipsFor('size') }],
        state: { ...state, lead: { ...lead, step: 'size', tries: 0 } },
        intent: 'lead-institution',
      }
    case 'size':
      return {
        steps: [{ text: `Gracias. Última pregunta: ${ASK.contact}`, quickReplies: chipsFor('contact') }],
        state: { ...state, lead: { ...lead, step: 'contact', tries: 0 } },
        intent: 'lead-size',
      }
    case 'contact':
      return {
        steps: leadSummary(lead),
        state: { ...state, lead: null, lastLead: lead },
        intent: 'lead-done',
      }
  }
}

function reask(lead: Lead, state: ChatState, text: string): Turn {
  return {
    steps: [{ text, quickReplies: chipsFor(lead.step) }],
    state: { ...state, lead: { ...lead, tries: lead.tries + 1 } },
    intent: 'lead-reask',
  }
}

function leadText(text: string, state: ChatState): Turn {
  const lead = state.lead as Lead
  const normalized = normalize(text)
  if (CANCEL_RE.test(normalized)) return cancelLead(state)

  const hit = detect(normalized)
  const asksSomething = text.includes('?') || (hit !== null && hit.score >= 3)

  switch (lead.step) {
    case 'name': {
      if (asksSomething) return interrupt(hit?.id ?? null, state)
      const name = parseName(text)
      if (!name) return reask(lead, state, '¿Cómo te llamo? Con tu nombre basta 🙂')
      return advance({ ...lead, name: name.full, firstName: name.first }, state)
    }
    case 'institution': {
      if (asksSomething) return interrupt(hit?.id ?? null, state)
      const institution = parseInstitution(text)
      if (!institution) return reask(lead, state, 'Necesito el nombre de tu institución para armar la solicitud. ¿Cómo se llama?')
      return advance({ ...lead, institution }, state)
    }
    case 'size': {
      const size = parseSize(text)
      if (size) return advance({ ...lead, size }, state)
      if (text.includes('?') || (hit !== null && hit.score >= 2)) return interrupt(hit?.id ?? null, state)
      return reask(lead, state, 'Puedes elegir una opción o escribir un número aproximado, por ejemplo 350 👇')
    }
    case 'contact': {
      const contact = parseContact(text)
      if (contact) return advance({ ...lead, contact }, state)
      if (text.includes('?') || (hit !== null && hit.score >= 2)) return interrupt(hit?.id ?? null, state)
      if (lead.tries >= 1) {
        return {
          steps: [
            {
              text: 'Parece que no logro tomar bien ese dato 😅 Mejor escríbenos directo y el equipo te atiende:',
              links: [WHATSAPP_LINK, EMAIL_LINK],
              quickReplies: [q('faq', 'Preguntas frecuentes', 'Tengo una pregunta')],
            },
          ],
          state: { ...state, lead: null },
          intent: 'lead-handoff',
        }
      }
      return reask(lead, state, 'Para escribirte necesito un celular de 9 dígitos (como 987 654 321) o un correo válido. ¿Me lo compartes?')
    }
  }
}

function leadChoice(id: string, state: ChatState): Turn | null {
  const lead = state.lead as Lead
  if (id === 'cancel') return cancelLead(state)
  if (lead.step === 'size' && SIZE_CHOICES[id]) return advance({ ...lead, size: SIZE_CHOICES[id] }, state)
  return null
}

// ---------------------------------------------------------------- punto de entrada

function fallback(state: ChatState): Turn {
  const misses = state.misses + 1
  if (misses >= 2) {
    return {
      steps: [
        {
          text: 'Prefiero no inventarte una respuesta 🙏 Esto lo puede resolver mejor una persona del equipo:',
          links: [WHATSAPP_LINK, EMAIL_LINK],
          quickReplies: [q('demo', 'Solicitar una demostración', 'Quiero solicitar una demostración'), q('faq', 'Preguntas frecuentes', 'Tengo una pregunta')],
        },
      ],
      state: { ...state, misses: 0 },
      intent: 'handoff',
    }
  }
  return {
    steps: [
      {
        text: 'Mmm, no estoy seguro de haberte entendido 🤔 ¿Alguno de estos temas te ayuda?',
        quickReplies: [
          q('demo', 'Solicitar una demostración', 'Quiero solicitar una demostración'),
          q('pricing', 'Planes y precios', 'Quiero más información sobre los planes'),
          q('faq', 'Preguntas frecuentes', 'Tengo una pregunta'),
          q('human', 'Hablar con el equipo'),
        ],
      },
    ],
    state: { ...state, misses },
    intent: 'fallback',
  }
}

function answer(id: string, state: ChatState): Turn {
  if (id === 'demo') return startLead('demo', state)
  if (id === 'quote') return startLead('pricing', state)
  const make = TOPICS[id]
  if (!make) return fallback(state)
  return { steps: make(), state: { ...state, misses: 0 }, intent: id }
}

function byChoice(id: string, state: ChatState): Turn {
  if (state.lead) {
    const handled = leadChoice(id, state)
    if (handled) return handled
    return interrupt(id, state)
  }
  if (id === 'cancel') return cancelLead(state)
  if (id === 'fix' && state.lastLead) return startLead(state.lastLead.purpose, state)
  if (id === 'done') {
    const first = state.lastLead?.firstName
    return {
      steps: [
        {
          text: `¡Gracias${first ? `, ${first}` : ''}! 🙌 Con tu mensaje el equipo ya tiene lo necesario para coordinar contigo. Si te surge otra duda, aquí sigo.`,
          quickReplies: [q('faq', 'Preguntas frecuentes', 'Tengo una pregunta')],
        },
      ],
      state,
      intent: 'done',
    }
  }
  return answer(id, state)
}

// Aviso de inactividad: el widget lo pide al minuto de silencio y, si pasa otro minuto, cierra y borra el chat.
// Se avisa una sola vez por silencio; cualquier mensaje o botón del usuario vuelve a armarlo.
function idleWarning(state: ChatState): Turn {
  if (state.nudged) return { steps: [], state, intent: 'idle-skip' }
  const lead = state.lead
  const steps: BotStep[] = lead
    ? [
        { text: `¿Sigues por ahí${lead.firstName ? `, ${lead.firstName}` : ''}? Cuando quieras retomamos 😊 ${ASK[lead.step]}` },
        {
          text: 'Si no recibo respuesta, cerraré este chat en 1 minuto y tu solicitud quedará sin enviar.',
          quickReplies: [q('stay', 'Sigo aquí'), ...chipsFor(lead.step)],
        },
      ]
    : [
        {
          text:
            state.turns > 0
              ? '¿Te ayudo con algo más? Aquí sigo por si lo necesitas 😊'
              : '¿Sigues por ahí? Aquí sigo por si lo necesitas 😊',
        },
        {
          text: 'Si no recibo respuesta, cerraré este chat en 1 minuto.',
          quickReplies: [
            q('faq', 'Preguntas frecuentes', 'Tengo una pregunta'),
            q('demo', 'Ver una demostración', 'Quiero ver una demostración'),
            q('stay', 'Sigo aquí'),
          ],
        },
      ]
  return { steps, state: { ...state, nudged: true }, intent: 'idle-warning' }
}

export function respond(input: UserInput, state: ChatState): Turn {
  switch (input.kind) {
    case 'greet':
      return { steps: greeting(), state, intent: 'greet' }
    case 'nudge':
      return idleWarning(state)
    case 'choice':
      return byChoice(input.id, { ...state, turns: state.turns + 1, nudged: false })
    case 'text': {
      const counted = { ...state, turns: state.turns + 1, nudged: false }
      if (counted.lead) return leadText(input.text, counted)
      const hit = detect(normalize(input.text))
      return hit ? answer(hit.id, counted) : fallback(counted)
    }
  }
}
