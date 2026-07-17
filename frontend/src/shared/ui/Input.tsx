import { forwardRef, type InputHTMLAttributes, type SelectHTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'h-10 w-full rounded-lg border border-border-strong bg-surface-card px-3 text-sm text-text-primary',
        'placeholder:text-text-muted transition-colors hover:border-brand/40 focus:border-brand disabled:bg-bg-elevated disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  ),
)
Input.displayName = 'Input'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'h-10 w-full rounded-lg border border-border-strong bg-surface-card px-3 text-sm text-text-primary transition-colors hover:border-brand/40 focus:border-brand disabled:bg-bg-elevated disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  ),
)
Select.displayName = 'Select'

interface FieldProps {
  label: string
  htmlFor?: string
  hint?: string
  error?: string
  children: React.ReactNode
}

export function Field({ label, htmlFor, hint, error, children }: FieldProps) {
  return (
    <label htmlFor={htmlFor} className="block space-y-1.5">
      <span className="block text-xs font-medium text-text-secondary">
        {label}
      </span>
      {children}
      {hint && !error && <span className="block text-xs text-text-muted">{hint}</span>}
      {error && <span className="block text-xs text-accent-red">{error}</span>}
    </label>
  )
}
