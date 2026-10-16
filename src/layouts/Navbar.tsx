import { type MouseEvent, useEffect, useState } from 'react'
import { LogIn, Menu, X } from 'lucide-react'
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
  const [heroCtaPassed, setHeroCtaPassed] = useState(false)

  // El CTA del navbar solo aparece cuando el botón del Hero ya salió de pantalla,
  // para no mostrar dos "Solicitar demostración" a la vez.
  useEffect(() => {
    const heroCta = document.querySelector('[data-hero-cta]')
    if (!heroCta) {
      setHeroCtaPassed(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) =>
        setHeroCtaPassed(!entry.isIntersecting && entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? 0)),
      { rootMargin: '-96px 0px 0px 0px' },
    )
    observer.observe(heroCta)
    return () => observer.disconnect()
  }, [])

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

  // Con el menú abierto: Escape lo cierra, y si la pantalla crece hasta el menú de escritorio también
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1280px)')
    const onDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktopChange)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktopChange)
    }
  }, [menuOpen])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        menuOpen
          ? 'border-b border-line bg-warm'
          : scrolled
            ? 'border-b border-line bg-warm/85 shadow-[0_1px_0_rgba(31,27,24,0.04)] backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-20 items-center gap-8 py-4 lg:h-24">
        <a href="#inicio" onClick={(event) => scrollToSection(event, '#inicio')} className="flex shrink-0 items-center" aria-label="Willay Edu, ir al inicio">
          <Logo className="h-9 w-9 lg:h-10 lg:w-10" withWordmark />
        </a>

        <nav className="hidden items-center gap-6 xl:ml-2 xl:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => scrollToSection(event, link.href)}
              className="whitespace-nowrap text-[15px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center xl:ml-auto xl:flex">
          <Button href={LOGIN_URL} target="_blank" rel="noopener noreferrer" variant="ghost" icon={LogIn} className="whitespace-nowrap px-4 py-3.5 text-[15px]">
            Iniciar sesión
          </Button>
          <div
            inert={!heroCtaPassed}
            className={`-my-1 grid transition-[grid-template-columns,opacity] duration-300 ease-out ${
              heroCtaPassed ? 'grid-cols-[1fr] opacity-100' : 'grid-cols-[0fr] opacity-0'
            }`}
          >
            <div className="min-w-0 overflow-hidden py-1">
              <div className="pl-3">
                <Button href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="whitespace-nowrap px-6 py-3.5 text-[15px]">
                  Solicitar demostración
                </Button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-auto inline-flex items-center justify-center rounded-lg p-2 text-ink xl:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      {/* Fondo atenuado bajo la cabecera: tocar fuera del menú lo cierra */}
      <div
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`absolute inset-x-0 top-full h-dvh bg-ink/30 transition-[opacity,visibility] duration-300 xl:hidden ${
          menuOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`absolute inset-x-0 top-full grid overflow-hidden rounded-b-3xl border-b border-line bg-warm shadow-[0_24px_40px_-20px_rgba(31,27,24,0.28)] transition-[grid-template-rows,opacity,visibility] duration-300 ease-out xl:hidden ${
          menuOpen ? 'visible grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <Container className="flex flex-col gap-1 pb-6 pt-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  scrollToSection(event, link.href)
                  setMenuOpen(false)
                }}
                className="rounded-xl px-3 py-3.5 text-base font-medium text-ink-soft transition-colors hover:bg-brand-soft/50 hover:text-ink active:bg-brand-soft"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-line pt-5">
              <Button href={LOGIN_URL} target="_blank" rel="noopener noreferrer" variant="secondary" icon={LogIn} className="py-3.5 text-base">
                Iniciar sesión
              </Button>
              <Button href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" variant="primary" className="py-3.5 text-base">
                Solicitar demostración
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </header>
  )
}