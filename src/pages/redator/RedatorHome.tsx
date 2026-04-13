import { Link } from 'react-router-dom'
import { Briefcase, Users } from 'lucide-react'
import RedatorLayout from './RedatorLayout'

function RedatorHome() {
  return (
    <RedatorLayout activeTab="dashboard">
      <section className="flex-1 space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Resumo do dashboard</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Bem-vindo, redator</h2>
              </div>
              <Link
                to="/"
                className="inline-flex rounded-full border border-unp-blue/20 bg-unp-ice px-4 py-2 text-sm font-semibold text-unp-blue transition hover:bg-unp-blue/5"
              >
                Voltar à landing
              </Link>
            </div>
            <p className="mt-4 text-slate-600">
              Aqui estão métricas de exemplo para você começar. Os dados ainda são mockados, mas já mostram o fluxo de vagas e empresas administradas.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Total de vagas</p>
              <p className="mt-4 text-4xl font-bold text-unp-blue">18</p>
              <p className="mt-3 text-sm text-slate-600">Vagas ativas no painel administrativo.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Empresas cadastradas</p>
              <p className="mt-4 text-4xl font-bold text-unp-blue">12</p>
              <p className="mt-3 text-sm text-slate-600">Empresas com vagas vinculadas ao sistema.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Novas vagas</p>
              <p className="mt-4 text-4xl font-bold text-unp-orange">5</p>
              <p className="mt-3 text-sm text-slate-600">Vagas criadas esta semana.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Candidatos</p>
              <p className="mt-4 text-4xl font-bold text-unp-blue">128</p>
              <p className="mt-3 text-sm text-slate-600">Candidatos participantes nas vagas divulgadas.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Aprovações</p>
              <p className="mt-4 text-4xl font-bold text-unp-orange">7</p>
              <p className="mt-3 text-sm text-slate-600">Vagas aprovadas e prontas para publicação.</p>
            </div>
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Pendências</p>
              <p className="mt-4 text-4xl font-bold text-unp-orange">3</p>
              <p className="mt-3 text-sm text-slate-600">Itens para revisão antes da publicação final.</p>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Atividades recentes</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Nova vaga publicada para Desenvolvedor Front-end.</li>
              <li>Empresa Alfa adicionada e aguardando revisão.</li>
              <li>5 candidatos inscritos nas vagas da última semana.</li>
              <li>2 vagas pendentes de aprovação editorial.</li>
            </ul>
          </div>
        </section>
    </RedatorLayout>
  )
}

export default RedatorHome
