import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LockKeyhole, ShieldCheck, ArrowRight, ChartNoAxesCombined } from 'lucide-react'
import { Button, Card, Field, Input } from '@/shared/ui'
import { useSessionStore, type Role } from '@/shared/store/useSessionStore'
import { BankBrand } from '@/shared/ui/BankBrand'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'

/** Экран входа в единой банковской палитре. */
export function LoginPage() {
  const navigate = useNavigate()
  const reduced = usePrefersReducedMotion()
  const loginAction = useSessionStore((s) => s.login)
  const [login, setLogin] = useState('admin')
  const [role, setRole] = useState<Role>('admin')
  const [error, setError] = useState<string | null>(null)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!login.trim()) {
      setError('Введите логин, чтобы продолжить.')
      return
    }
    loginAction(login.trim(), role)
    navigate('/')
  }

  return (
    <div className="login-page">
      <section className="login-intro">
        <BankBrand />
        <div className="login-intro-content">
          <div className="login-eyebrow"><ChartNoAxesCombined className="h-4 w-4" /> Банковская аналитика</div>
          <h1>Планирование<br /> доходов</h1>
          <p>Данные, бизнес-модели и сценарии<br className="hidden xl:block" /> в едином рабочем пространстве.</p>
          <div className="login-illustration" aria-hidden="true">
            <div className="login-chart-grid" />
            <div className="login-chart-bars">
              <span /><span /><span /><span /><span /><span /><span />
            </div>
            <svg viewBox="0 0 440 180" fill="none" preserveAspectRatio="none">
              <path d="M0 149L73 125L146 138L220 83L293 92L366 38L440 10" stroke="currentColor" strokeWidth="2.5" />
              <circle cx="220" cy="83" r="5" fill="currentColor" />
              <circle cx="366" cy="38" r="5" fill="currentColor" />
            </svg>
          </div>
        </div>
        <p className="login-intro-footer">Помощник по планированию доходов</p>
      </section>
      <div className="login-form-area">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[420px]"
      >
        <div className="mb-8">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-brand/10 bg-brand/5 text-brand">
            <LockKeyhole className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <h2 className="text-[28px] font-semibold tracking-tight text-text-primary">Вход в систему</h2>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">Укажите логин и выберите роль для работы.</p>
        </div>

        <Card className="login-form-card p-6 sm:p-8">
          <form onSubmit={submit} className="space-y-6">
            <Field label="Логин" htmlFor="login">
              <Input
                id="login"
                value={login}
                onChange={(e) => {
                  setLogin(e.target.value)
                  setError(null)
                }}
                placeholder="admin"
                autoFocus
              />
            </Field>

            <Field label="Роль" htmlFor="role" hint="Админ загружает данные, менеджер — только аналитика">
              <div className="grid grid-cols-2 gap-2" id="role">
                {(['admin', 'manager'] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={
                      'flex items-center justify-center gap-2 rounded-lg border px-2 py-3 text-[13px] transition-colors ' +
                      (role === r
                        ? 'border-brand/50 bg-brand/5 text-brand font-medium'
                        : 'border-border text-text-secondary hover:bg-surface-hover')
                    }
                  >
                    {r === 'admin' ? <LockKeyhole className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
                    {r === 'admin' ? 'Администратор' : 'Менеджер'}
                  </button>
                ))}
              </div>
            </Field>

            {error && <p className="text-xs text-accent-red">{error}</p>}

            <Button type="submit" size="lg" className="w-full">
              Войти
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        </Card>
      </motion.div>
      </div>
    </div>
  )
}
