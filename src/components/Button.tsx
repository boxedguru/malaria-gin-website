import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = {
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit'
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-plum text-white border border-brand-plum hover:bg-brand-plum/80',
  secondary:
    'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/5',
  ghost:
    'bg-transparent text-brand-gold border border-brand-gold/40 hover:border-brand-gold hover:bg-brand-gold/5',
}

const base =
  'inline-block font-label text-xs tracking-widest uppercase px-6 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-plum focus:ring-offset-2 focus:ring-offset-black'

export default function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
