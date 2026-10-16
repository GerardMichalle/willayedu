import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  as?: ElementType
  className?: string
  delay?: number
}

// Un solo IntersectionObserver compartido por todos los Reveal de la página
const revealCallbacks = new WeakMap<Element, () => void>()
let sharedObserver: IntersectionObserver | null = null

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          revealCallbacks.get(entry.target)?.()
          revealCallbacks.delete(entry.target)
          sharedObserver?.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -48px 0px' },
    )
  }
  return sharedObserver
}

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const observer = getObserver()
    revealCallbacks.set(node, () => setVisible(true))
    observer.observe(node)
    return () => {
      revealCallbacks.delete(node)
      observer.unobserve(node)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}
