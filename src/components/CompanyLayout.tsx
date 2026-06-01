import type { ReactNode } from 'react'
import { useState } from 'react'
import { LayoutDashboard, BriefcaseBusiness, Menu, X } from 'lucide-react'
import BotaoLogout from './BotaoLogout'
import { SidebarLink } from './ui/SidebarLink'

type CompanyLayoutProps = {
  children: ReactNode
  activeTab: 'dashboard' | 'vagas'
}

const navItems = [
  { to: '/empresa/dashboard', icon: LayoutDashboard, label: 'Dashboard', tab: 'dashboard' },
  { to: '/empresa/vagas', icon: BriefcaseBusiness, label: 'Vagas', tab: 'vagas' },
] as const

export function CompanyLayout({ children, activeTab }: CompanyLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const fecharMenu = () => setIsMobileMenuOpen(false)

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[linear-gradient(135deg,#eff4ff_0%,#ffffff_52%,#fff4eb_100%)]">
      <nav className="relative z-50 border-b border-unp-blue/10 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 md:px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="rounded-lg p-2 transition hover:bg-slate-100 md:hidden"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-unp-blue" />
                ) : (
                  <Menu size={24} className="text-unp-blue" />
                )}
              </button>
              <div>
                <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-unp-orange">
                  Area da empresa
                </p>
                <h1 className="font-heading text-lg font-bold text-unp-blue">ConectaTech Empresas</h1>
              </div>
            </div>

            <BotaoLogout />
          </div>
        </div>
      </nav>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden h-full w-64 overflow-y-auto border-r border-unp-blue/10 bg-white p-6 md:block">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <SidebarLink
                key={item.tab}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.tab}
                onNavigate={fecharMenu}
              />
            ))}
          </nav>

          <div className="mt-8 border-t border-unp-blue/10 pt-6">
            <div className="rounded-lg bg-unp-ice p-4">
              <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-unp-blue">Status</p>
              <p className="mt-1 font-body text-sm text-slate-600">Painel ativo</p>
            </div>
          </div>
        </aside>

        <div
          className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
              isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={fecharMenu}
          />
          <div
            className={`absolute left-0 top-0 bottom-0 w-64 overflow-y-auto bg-white shadow-lg transform transition-transform duration-300 ease-out ${
              isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <nav className="space-y-1 px-6 pb-6 pt-24">
              {navItems.map((item) => (
                <SidebarLink
                  key={item.tab}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  active={activeTab === item.tab}
                  onNavigate={fecharMenu}
                />
              ))}
            </nav>

            <div className="border-t border-unp-blue/10 p-6">
              <div className="rounded-lg bg-unp-ice p-4">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-unp-blue">Status</p>
                <p className="mt-1 font-body text-sm text-slate-600">Painel ativo</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6 md:p-10">{children}</div>
      </div>
    </main>
  )
}
