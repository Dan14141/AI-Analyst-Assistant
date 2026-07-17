import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Lock, UserRound, ChartNoAxesCombined } from 'lucide-react'
import { BankBrand } from '@/shared/ui/BankBrand'
import { AmbientBackground } from './AmbientBackground'
import { NAV } from './navigation'
import { cn } from '@/shared/lib/cn'
import { useSessionStore } from '@/shared/store/useSessionStore'
import { usePrefersReducedMotion } from '@/shared/hooks/usePrefersReducedMotion'
import { useDatasetStore } from '@/shared/store/useDatasetStore'
import { useGraphStore } from '@/domains/business-graph/store/useGraphStore'

export function AppLayout() {
    const location = useLocation()
    const reduced = usePrefersReducedMotion()
    const { user, logout } = useSessionStore()
    const { hasData } = useDatasetStore()
    const { graphViewed } = useGraphStore()

    const navEntries = NAV.filter((entry) => !entry.adminOnly || user?.role === 'admin')

    const isEntryDisabled = (entry: (typeof NAV)[0]) => {
        if (entry.to === '/scenarios' || entry.to === '/ai') {
            return !hasData
        }
        if (entry.to === '/export') {
            // ✅ Экспорт доступен только если есть данные И граф был просмотрен
            return !hasData || !graphViewed
        }
        return false
    }

    return (
        <div className="app-shell min-h-screen text-text-primary">
            <AmbientBackground />

            <aside className="app-sidebar">
                <div className="sidebar-brand">
                    <BankBrand />
                    <div className="sidebar-product">
                        <div>Планирование доходов</div>
                        <div className="sidebar-product-caption">интеллектуальный помощник</div>
                    </div>
                </div>

                <div className="sidebar-section-label">Рабочее пространство</div>
                <nav className="sidebar-nav" aria-label="Основная навигация">
                    {navEntries.map((entry) => {
                        const Icon = entry.icon
                        const disabled = isEntryDisabled(entry)
                        const isActive =
                            location.pathname === entry.to ||
                            (entry.to !== '/' && location.pathname.startsWith(entry.to))

                        return (
                            <div key={entry.to} className="relative group">
                                <NavLink
                                    to={disabled ? '#' : entry.to}
                                    end={entry.to === '/'}
                                    className={({ isActive: active }) =>
                                        cn(
                                            'sidebar-link',
                                            disabled && 'sidebar-link-disabled cursor-not-allowed pointer-events-none',
                                            active || isActive
                                                ? 'sidebar-link-active'
                                                : '',
                                        )
                                    }
                                    onClick={(e) => {
                                        if (disabled) {
                                            e.preventDefault()
                                        }
                                    }}
                                >
                                    <Icon
                                        className={cn(
                                            'h-[19px] w-[19px] shrink-0',
                                            isActive || location.pathname === entry.to ? 'sidebar-icon-active' : '',
                                        )}
                                        strokeWidth={1.75}
                                    />
                                    <span className="flex min-w-0 flex-col gap-1">
                                        <span className="font-medium">{entry.label}</span>
                                        <span className="sidebar-link-hint">
                                            {disabled ? 'Данные не загружены' : entry.hint}
                                        </span>
                                    </span>
                                    {disabled && <Lock className="h-3.5 w-3.5 shrink-0 ml-auto" />}
                                </NavLink>
                            </div>
                        )
                    })}
                </nav>

                {user && (
                    <div className="sidebar-user">
                        <div className="sidebar-avatar" aria-hidden="true"><UserRound className="h-4 w-4" /></div>
                        <div className="min-w-0 flex-1 leading-tight">
                            <div className="truncate text-sm font-medium">{user.login}</div>
                            <div className="sidebar-user-role">
                                {user.role === 'admin' ? 'Администратор' : 'Менеджер'}
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            aria-label="Выйти"
                            className="sidebar-logout"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </aside>

            <main className="min-w-0 flex-1">
                <div className="workspace-bar">
                    <div className="flex items-center gap-2.5">
                        <ChartNoAxesCombined className="h-4 w-4 text-brand" aria-hidden="true" />
                        <span>Планирование доходов</span>
                    </div>
                    <span className="workspace-bar-caption">Банковская аналитика</span>
                </div>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduced ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="workspace-content mx-auto max-w-[1600px] px-4 py-6 md:px-8 md:py-8"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    )
}
