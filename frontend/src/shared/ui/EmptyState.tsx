import type { ReactNode } from 'react'

interface Props {
  icon?: ReactNode
  title: string
  /** Конкретно: что произошло и что делать дальше (без общих фраз). */
  description: string
  action?: ReactNode
}

/** Пустое/ошибочное состояние. Текст — от лица интерфейса, без извинений. */
export function EmptyState({ icon, title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
      {icon && <div className="mb-2 grid h-16 w-16 place-items-center rounded-2xl border border-brand/10 bg-brand/5 text-brand">{icon}</div>}
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      <p className="max-w-md text-sm leading-relaxed text-text-secondary">{description}</p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
