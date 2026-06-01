import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Users } from 'lucide-react'
import BotaoLogout from './BotaoLogout'

type RedatorLayoutProps = {
  children: ReactNode
  activeTab: 'dashboard' | 'vagas' | 'empresas'
}

function RedatorLayout({ children, activeTab }: RedatorLayoutProps) {
  const linkClass = (tab: 'dashboard' | 'vagas' | 'empresas') =>
    `flex items-center gap-3 rounded-2xl px-4 py-4 font-semibold transition ${
      activeTab === tab ? 'bg-unp-blue/10 text-unp-blue shadow-sm' : 'text-slate-700 hover:bg-slate-100'
    }`

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eef3ff_0%,#ffffff_46%,#f7f5ff_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row">
        <aside className="rounded-3xl bg-white p-6 shadow-sm md:w-80">
          <div className="pb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-unp-orange">Painel do redator</p>
            <h1 className="mt-3 font-heading text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-3 text-sm text-slate-600">Navegue entre as seções do painel administrativo.</p>
          </div>

          <nav className="space-y-3">
            <Link to="/redator" className={linkClass('dashboard')}>
              <Briefcase size={20} />
              Dashboard
            </Link>
            <Link to="/redator/vagas" className={linkClass('vagas')}>
              <Briefcase size={20} />
              Vagas
            </Link>
            <Link to="/redator/empresas" className={linkClass('empresas')}>
              <Users size={20} />
              Empresas
            </Link>
          </nav>

          <div className="mt-6 border-t border-unp-blue/10 pt-6">
            <BotaoLogout />
          </div>
        </aside>

        <section className="flex-1 space-y-6">{children}</section>
      </div>
    </main>
  )
}

export default RedatorLayout
