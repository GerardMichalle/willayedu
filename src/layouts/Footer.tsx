import { type MouseEvent } from 'react'
import { Mail } from 'lucide-react'
import Logo from '../components/Logo'
import Container from '../components/Container'
import { EMAIL, EMAIL_URL, INSTAGRAM_URL, NAV_LINKS, TIKTOK_URL, WHATSAPP_URL } from '../lib/constants'

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.6 5.82c-.9-.88-1.42-2.07-1.46-3.32h-3.14v13.6a2.7 2.7 0 1 1-1.9-2.58V10.4a5.86 5.86 0 0 0-1.06-.1A5.9 5.9 0 1 0 15 16.1a5.85 5.85 0 0 0 .1-1.08V9.28a8.9 8.9 0 0 0 4.9 1.47V7.62a5.9 5.9 0 0 1-3.4-1.8z" />
  </svg>
)

const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
  event.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.2" />
    <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo className="h-8 w-8" withWordmark />
            <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
              Gestión escolar con control de asistencia por RFID. Todo el control de tu
              institución educativa en un solo lugar
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Willay en Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand-dark/30 hover:text-brand"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Willay en TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-brand-dark/30 hover:text-brand"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
            </div>

          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-ink">Producto</span>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => scrollToSection(event, link.href)}
                className="text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-ink">Contacto</span>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex select-text items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
            </a>
            <a
              href={EMAIL_URL}
              className="flex select-text items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <Mail className="h-4 w-4" strokeWidth={1.8} />
              {EMAIL}
            </a>

            <div className="mt-2">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-faint">
                Muy pronto en estas plataformas
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Google Play — próximamente"
                  draggable={false}
                  className="h-10 w-auto"
                />
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store — próximamente"
                  draggable={false}
                  className="h-10 w-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} Willay. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-ink-faint">Política de privacidad</span>
            <a href="/terminos-y-condiciones" className="text-xs text-ink-faint transition-colors hover:text-ink-soft">Términos y condiciones</a>
          </div>
        </div>
      </Container>
    </footer>
  )
}