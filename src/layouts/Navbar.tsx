import { type MouseEvent, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from '../components/Logo'
import Button from '../components/Button'
import Container from '../components/Container'
import { LOGIN_URL, NAV_LINKS, WHATSAPP_URL } from '../lib/constants'

const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
  event.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-line bg-warm/85 shadow-[0_1px_0_rgba(31,27,24,0.04)] backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-20 items-center justify-between py-4 lg:h-24">
        <a href="#inicio" onClick={(event) => scrollToSection(event, '#inicio')} className="flex items-center" aria-label="Willay, ir al inicio">
          <Logo className="h-9 w-9 lg:h-10 lg:w-10" withWordmark />
        </a>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => scrollToSection(event, link.href)}
              className="text-base font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Button href={LOGIN_URL} target="_blank" rel="noopener noreferrer" variant="ghost" className="px-4 py-3.5 text-base">
            Iniciar sesión
          </Button>
          <Button href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="px-7 py-3.5 text-base">
            Solicitar demostración
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-t border-line bg-warm transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] border-transparent'
        }`}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  scrollToSection(event, link.href)
                  setMenuOpen(false)
                }}
                className="rounded-lg px-3 py-3 text-sm font-medium text-ink-soft hover:bg-brand-soft/50 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-4">
              <Button href={LOGIN_URL} target="_blank" rel="noopener noreferrer" variant="secondary">
                Iniciar sesión
              </Button>
              <Button href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" variant="primary">
                Solicitar demostración
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </header>
  )
}