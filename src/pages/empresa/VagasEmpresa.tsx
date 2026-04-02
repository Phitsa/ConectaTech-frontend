import { ArrowRight, BriefcaseBusiness, CalendarDays, FileText, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CompanyLayout } from '../../components/CompanyLayout'
import { vagasData } from '../../data/vagas'

function VagasEmpresa() {
  const vagasAtivas = vagasData.slice(0, 6)

  return (
    <CompanyLayout activeTab="vagas">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
                Vagas
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
                Vagas da empresa
              </h2>
              <p className="mt-3 max-w-2xl font-body text-slate-600">
                Centralize suas oportunidades em uma unica tela e abra o formulario de cadastro quando quiser.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/empresa/vagas/nova"
                className="inline-flex items-center gap-2 rounded-xl bg-unp-orange px-5 py-2.5 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95"
              >
                Adicionar vaga
                <ArrowRight size={16} />
              </Link>
              <button className="inline-flex items-center gap-2 rounded-xl border border-unp-blue/20 bg-white px-5 py-2.5 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice">
                <Search size={16} />
                Buscar vaga
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-unp-ice p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-body text-sm text-slate-600">Total ativas</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-unp-blue">14</p>
                </div>
                <BriefcaseBusiness className="text-unp-blue" size={22} />
              </div>
            </article>
            <article className="rounded-2xl bg-unp-ice p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-body text-sm text-slate-600">Em analise</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-unp-blue">38</p>
                </div>
                <FileText className="text-unp-blue" size={22} />
              </div>
            </article>
            <article className="rounded-2xl bg-unp-ice p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-body text-sm text-slate-600">Entrevistas hoje</p>
                  <p className="mt-2 font-heading text-3xl font-bold text-unp-blue">9</p>
                </div>
                <CalendarDays className="text-unp-blue" size={22} />
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
                Lista
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-unp-blue">
                Oportunidades cadastradas
              </h3>
            </div>
            <span className="font-body text-sm text-slate-600">{vagasAtivas.length} registros</span>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {vagasAtivas.map((vaga) => (
              <article key={vaga.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-unp-blue">
                    {vaga.area}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 font-body text-xs text-slate-600 shadow-sm">
                    {vaga.model}
                  </span>
                </div>
                <h4 className="mt-3 font-heading text-xl font-bold text-unp-blue">{vaga.role}</h4>
                <p className="mt-1 font-body text-sm text-slate-600">{vaga.company}</p>
                <p className="mt-3 font-body text-sm text-slate-700">{vaga.description}</p>

                <div className="mt-4 flex flex-wrap gap-2 font-body text-xs text-slate-600">
                  <span className="rounded-md bg-white px-2 py-1 shadow-sm">{vaga.location}</span>
                  <span className="rounded-md bg-white px-2 py-1 shadow-sm">{vaga.workload}</span>
                  <span className="rounded-md bg-white px-2 py-1 shadow-sm">{vaga.stipend}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button className="rounded-xl border border-unp-blue/20 bg-white px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice">
                    Editar
                  </button>
                  <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-body text-sm font-semibold text-slate-600 transition hover:bg-slate-100">
                    Arquivar
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </CompanyLayout>
  )
}

export default VagasEmpresa