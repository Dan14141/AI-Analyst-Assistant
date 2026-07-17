import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/cn'

type Tone = 'lime' | 'green' | 'blue' | 'amber' | 'red' | 'neutral'

const tones: Record<Tone, string> = {
  lime: 'bg-accent-lime/5 text-accent-lime border-accent-lime/20',
  green: 'bg-accent-green/5 text-accent-green border-accent-green/20',
  blue: 'bg-accent-blue/5 text-accent-blue border-accent-blue/20',
  amber: 'bg-accent-amber/5 text-accent-amber border-accent-amber/20',
  red: 'bg-accent-red/5 text-accent-red border-accent-red/20',
  neutral: 'bg-bg-elevated text-text-secondary border-border',
}

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone
}

export function Tag({ tone = 'neutral', className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-pill border px-2.5 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
