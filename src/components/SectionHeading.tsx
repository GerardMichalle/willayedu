import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-dark">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-medium text-ink sm:text-4xl">{title}</h2>
      {subtitle && <p className="text-balance text-lg leading-relaxed text-ink-soft">{subtitle}</p>}
    </div>
  )
}
