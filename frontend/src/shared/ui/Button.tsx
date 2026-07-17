import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-hover active:bg-brand-navy font-medium shadow-sm',
  secondary:
    'bg-surface-card border border-border-strong text-text-primary hover:border-brand/40 hover:bg-surface-hover font-medium',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-hover',
  danger: 'bg-accent-red/5 text-accent-red border border-accent-red/20 hover:bg-accent-red/10',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-lg gap-2',
  lg: 'h-12 px-6 text-sm rounded-lg gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
