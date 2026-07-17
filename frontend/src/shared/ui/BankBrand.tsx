import { cn } from '@/shared/lib/cn'

/** Компактная марка для навигации и экрана входа. Цвет наследуется. */
export function BankBrand({ className }: { className?: string }) {
  return (
    <div className={cn('bank-brand', className)} role="img" aria-label="ВТБ">
      <svg width="30" height="26" viewBox="0 0 30 26" fill="currentColor" aria-hidden="true">
        <path d="M8 2h22l-2.5 5H5.5L8 2ZM4.5 9.5h22L24 14.5H2l2.5-5ZM1 17h22l-2.5 5H-1.5L1 17Z" />
      </svg>
      <span aria-hidden="true">ВТБ</span>
    </div>
  )
}
