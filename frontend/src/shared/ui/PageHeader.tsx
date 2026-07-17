import type { ReactNode } from 'react'

interface Props {
  title: string
  subtitle?: string
  actions?: ReactNode
}

/** Единый заголовок экрана с нейтральной типографикой. */
export function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <header className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-text-primary md:text-[28px] md:leading-tight">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  )
}
