import type { ReactNode } from 'react'
import { useState } from 'react'
import { Briefcase, User, CheckSquare, Menu, X } from 'lucide-react'
import BotaoLogout from './BotaoLogout'
import { SidebarLink } from './ui/SidebarLink'

type StudentLayoutProps = {
  children: ReactNode
  activeTab: 'vagas' | 'perfil' | 'candidaturas'
}

const navItems = [
  { to: '/vagas', icon: Briefcase, label: 'Vagas', tab: 'vagas' },
  { to: '/meu-perfil', icon: User, label: 'Meu Perfil', tab: 'perfil' },
  { to: '/minhas-candidaturas', icon: CheckSquare, label: 'Minhas Candidaturas', tab: 'candidaturas' },
] as const

export function StudentLayout({ children, activeTab }: StudentLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const fecharMenu = () => setIsMobileMenuOpen(false)

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-[linear-gradient(135deg,#eef3ff_0%,#ffffff_50%,#fff6f0_100%)]">
      <nav className="relative z-50 border-b border-unp-blue/10 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl px-6 py-4 md:px-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition"
              >
                {isMobileMenuOpen ? (
                  <X size={24} className="text-unp-blue" />
                ) : (
                  <Menu size={24} className="text-unp-blue" />
                )}
              </button>
              <h1 className="font-heading text-lg font-bold text-unp-blue">Conectatech</h1>
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
              <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-unp-blue">Versão</p>
              <p className="mt-1 font-body text-sm text-slate-600">1.0.0</p>
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
            className={`absolute left-0 top-0 bottom-0 w-64 bg-white shadow-lg overflow-y-auto transform transition-transform duration-300 ease-out ${
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
                <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-unp-blue">Versão</p>
                <p className="mt-1 font-body text-sm text-slate-600">1.0.0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-10">{children}</div>
      </div>
    </main>
  )
}
