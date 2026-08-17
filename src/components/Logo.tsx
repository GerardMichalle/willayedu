interface LogoProps {
  className?: string
  withWordmark?: boolean
}

export default function Logo({ className = 'h-8 w-8', withWordmark = false }: LogoProps) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
        <g fill="#E02D2D">
          <circle cx="16" cy="7" r="4.4" />
          <circle cx="16" cy="25" r="4.4" />
          <circle cx="7" cy="16" r="4.4" />
          <circle cx="25" cy="16" r="4.4" />
          <circle cx="16" cy="16" r="3.4" fill="#F3C4C0" />
        </g>
      </svg>
      {withWordmark && (
        <span className="font-display text-lg font-semibold tracking-tight text-ink">
          Willay
        </span>
      )}
    </span>
  )
}
