import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { vagasData } from '../../../data/vagas'
import RedatorLayout from '../../../components/RedatorLayout'

function RedatorVagas() {
  const [paginaAtual, setPaginaAtual] = useState(1)

  const vagasPorPagina = 8
  const totalPaginas = Math.ceil(vagasData.length / vagasPorPagina)
  const inicio = (paginaAtual - 1) * vagasPorPagina
  const fim = inicio + vagasPorPagina
  const vagasDaPagina = vagasData.slice(inicio, fim)

  return (
    <RedatorLayout activeTab="vagas">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Redator</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Vagas</h1>
            <p className="mt-2 text-sm text-slate-600">Veja todas as vagas cadastradas e navegue entre as páginas.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/redator/vagas/nova"
              className="inline-flex rounded-full bg-unp-orange px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95"
            >
              Adicionar vaga
            </Link>
            <Link
              to="/redator"
              className="inline-flex rounded-full border border-unp-blue/20 bg-unp-ice px-4 py-3 text-sm font-semibold text-unp-blue transition hover:bg-unp-blue/5"
            >
              Voltar ao dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {vagasDaPagina.map((vaga) => (
          <article
            key={vaga.id}
            className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft transition hover:shadow-lg"
            style={{ animation: 'rise 0.35s ease-out both' }}
          >
            <span className="inline-flex rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-unp-blue">
              {vaga.area}
            </span>
            <h3 className="mt-3 font-heading text-xl font-bold text-unp-blue">{vaga.role}</h3>
            <p className="mt-2 font-body text-slate-700">{vaga.company}</p>
            <p className="mt-2 font-body text-sm text-slate-600">{vaga.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 font-body text-sm text-slate-600">
              <span className="rounded-md bg-slate-100 px-2 py-1">{vaga.model}</span>
              <span className="rounded-md bg-slate-100 px-2 py-1">{vaga.workload}</span>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-600">
          Mostrando {inicio + 1}–{Math.min(fim, vagasData.length)} de {vagasData.length} vagas
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPaginaAtual((pagina) => Math.max(1, pagina - 1))}
            disabled={paginaAtual === 1}
            className="inline-flex items-center gap-1 rounded-lg border border-unp-blue/25 bg-white px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={16} />
            Anterior
          </button>

          <div className="relative flex w-48 overflow-hidden rounded-lg border border-unp-blue/20 bg-unp-ice">
            <div
              className="absolute inset-y-0 left-0 rounded-md bg-unp-blue transition-transform duration-300 ease-out"
              style={{
                width: `${100 / totalPaginas}%`,
                transform: `translateX(${(paginaAtual - 1) * 100}%)`,
              }}
            />

            {Array.from({ length: totalPaginas }, (_, index) => {
              const pagina = index + 1

              return (
                <button
                  key={pagina}
                  type="button"
                  onClick={() => setPaginaAtual(pagina)}
                  className={`relative z-10 flex-1 px-3 py-2 font-body text-sm font-semibold transition ${
                    paginaAtual === pagina ? 'text-white' : 'text-unp-blue hover:bg-unp-blue/10'
                  }`}
                >
                  {pagina}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setPaginaAtual((pagina) => Math.min(totalPaginas, pagina + 1))}
            disabled={paginaAtual === totalPaginas}
            className="inline-flex items-center gap-1 rounded-lg border border-unp-blue/25 bg-white px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice disabled:cursor-not-allowed disabled:opacity-50"
          >
            Próxima
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </RedatorLayout>
  )
}

export default RedatorVagas
