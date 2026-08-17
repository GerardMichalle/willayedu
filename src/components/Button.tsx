import type { AnchorHTMLAttributes, ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  variant?: ButtonVariant
  icon?: LucideIcon
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white shadow-sm shadow-brand/20 hover:bg-brand-dark active:bg-brand-dark',
  secondary:
    'bg-white text-ink border border-line hover:border-brand-dark/30 hover:bg-brand-soft',
  ghost: 'text-ink-soft hover:text-ink',
}

export default function Button({
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
  ...anchorProps
}: ButtonProps) {
  return (
    <a
      {...anchorProps}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-200 ease-out ${variantClasses[variant]} ${className}`}
    >
      {children}
      {Icon && <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
    </a>
  )
}
