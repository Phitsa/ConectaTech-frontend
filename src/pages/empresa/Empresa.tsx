import { Link } from 'react-router-dom'
import { BriefcaseBusiness, UsersRound, TimerReset, Building2 } from 'lucide-react'

function Empresa() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0f172a26,_transparent_45%),radial-gradient(circle_at_bottom_right,_#003b8e24,_transparent_48%),linear-gradient(160deg,#f1f5ff_0%,#ffffff_55%,#eef4ff_100%)] px-6 py-12 text-slate-900 md:px-10">
      <div className="mx-auto mb-3 flex max-w-6xl justify-end">
        <Link
          to="/"
          className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/80 px-3 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 shadow-sm transition hover:border-unp-blue/40 hover:text-unp-blue"
        >
          Voltar para landpage
        </Link>
      </div>
      <section className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-10 md:p-12">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
            Area da empresa
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-unp-blue md:text-5xl">
            Recrutamento mais rapido
          </h1>
          <p className="mt-4 max-w-2xl font-body text-lg text-slate-700">
            Centralize publicacao de vagas, triagem de perfis e contato com estudantes
            em um fluxo empresarial mais claro e organizado.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <UsersRound size={18} className="text-unp-blue" />
              <p className="mt-2 font-heading text-xl font-bold text-unp-blue">420+</p>
              <p className="font-body text-sm text-slate-600">Alunos ativos</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <BriefcaseBusiness size={18} className="text-unp-blue" />
              <p className="mt-2 font-heading text-xl font-bold text-unp-blue">85</p>
              <p className="font-body text-sm text-slate-600">Empresas parceiras</p>
            </article>
            <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <TimerReset size={18} className="text-unp-blue" />
              <p className="mt-2 font-heading text-xl font-bold text-unp-blue">48h</p>
              <p className="font-body text-sm text-slate-600">Media de retorno</p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/empresa/registro"
              className="rounded-xl bg-unp-blue px-6 py-3 font-body font-semibold text-white transition hover:bg-unp-blueDark"
            >
              Cadastrar empresa
            </Link>
            <Link
              to="/empresa/login"
              className="rounded-xl border border-unp-orange/35 bg-white px-6 py-3 font-body font-semibold text-unp-orange transition hover:bg-orange-50"
            >
              Entrar como empresa
            </Link>
          </div>
        </div>

        <aside className="bg-slate-900 p-10 text-white md:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-1.5 font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
            <Building2 size={14} />
            Painel empresarial
          </div>
          <h2 className="mt-5 font-heading text-3xl font-bold leading-tight text-white">
            Diferencie seu processo seletivo com dados e velocidade.
          </h2>
          <ul className="mt-6 space-y-3 font-body text-sm text-slate-200">
            <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              Publicacao de vagas em minutos
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              Triagem por curso e periodo automaticamente
            </li>
            <li className="rounded-lg border border-white/10 bg-white/5 px-4 py-3">
              Historico completo de candidaturas por vaga
            </li>
          </ul>
        </aside>
      </section>
    </main>
  )
}

export default Empresa
