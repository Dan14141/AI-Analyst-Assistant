import { useCallback } from 'react'
import { useDropzone, type FileRejection } from 'react-dropzone'
import { motion } from 'framer-motion'
import { UploadCloud, FileSpreadsheet } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

const ACCEPT = {
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
  'text/csv': ['.csv'],
}

/** Колонки требуемой структуры long-формата (раздел 3.2 ТЗ). */
const REQUIRED_COLUMNS = [
  'Отчётный период',
  'Федеральный округ РФ',
  'Субъект РФ',
  'Показатель',
  'Мера измерения',
  'Значение',
]

interface Props {
  onFile: (file: File) => void
}

export function Dropzone({ onFile }: Props) {
  const prefersReduced = usePrefersReducedMotion()

  const onDrop = useCallback(
    (accepted: File[]) => {
      const file = accepted[0]
      if (file) onFile(file)
    },
    [onFile],
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } =
    useDropzone({
      onDrop,
      accept: ACCEPT,
      multiple: false,
      maxFiles: 1,
    })

  const rejection: FileRejection | undefined = fileRejections[0]

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center gap-5 rounded-card border-2 border-dashed px-6 py-16 text-center transition-colors',
          'bg-surface-card shadow-card',
          isDragActive && !isDragReject
            ? 'border-brand bg-brand/5'
            : 'border-border-strong hover:border-brand/50 hover:bg-brand/5',
          isDragReject && 'border-accent-red bg-accent-red/5',
        )}
      >
        <input {...getInputProps()} aria-label="Файл для загрузки" />

        <motion.div
          animate={
            prefersReduced || !isDragActive ? { y: 0 } : { y: [-2, 2, -2] }
          }
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
          }
          className={cn(
            'flex h-16 w-16 items-center justify-center rounded-2xl',
            isDragActive && !isDragReject
              ? 'bg-brand/15 text-brand'
              : 'bg-brand/5 text-brand',
          )}
        >
          <UploadCloud className="h-7 w-7" />
        </motion.div>

        <div className="space-y-1">
          <p className="text-base font-semibold text-text-primary">
            {isDragActive
              ? 'Отпустите файл для загрузки'
              : 'Перетащите файл сюда или нажмите для выбора'}
          </p>
          <p className="text-sm text-text-secondary">
            Поддерживаются форматы <span className="text-text-primary">.xlsx</span>,{' '}
            <span className="text-text-primary">.xls</span>,{' '}
            <span className="text-text-primary">.csv</span>
          </p>
        </div>

        <div className="mt-2 flex max-w-xl flex-wrap items-center justify-center gap-1.5">
          <FileSpreadsheet className="mr-1 h-4 w-4 text-text-muted" />
          {REQUIRED_COLUMNS.map((col, i) => (
            <span key={col} className="flex items-center gap-1.5">
              <span className="rounded-md border border-border bg-bg-base px-2 py-1 text-xs text-text-secondary">
                {col}
              </span>
              {i < REQUIRED_COLUMNS.length - 1 && (
                <span className="text-text-muted" aria-hidden>
                  |
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      {rejection && (
        <p className="mt-3 text-sm text-accent-red">
          Файл «{rejection.file.name}» отклонён: ожидается .xlsx, .xls или .csv.
        </p>
      )}
    </div>
  )
}
