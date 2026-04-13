import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { StudentLayout } from '../../../components/StudentLayout'
import { vagasData } from '../../../data/vagas'

function Vagas() {
  const [paginaAtual, setPaginaAtual] = useState(1)

  const vagasPorPagina = 8
  const totalPaginas = Math.ceil(vagasData.length / vagasPorPagina)
  const inicio = (paginaAtual - 1) * vagasPorPagina
  const fim = inicio + vagasPorPagina
  const vagasDaPagina = vagasData.slice(inicio, fim)

  return (
    <StudentLayout activeTab="vagas">
      <div className="flex min-h-[calc(100vh-11rem)] w-full flex-col">
        <div className="mb-8">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
            Area do aluno
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
            Vagas disponíveis
          </h2>
          <p className="mt-2 font-body text-slate-600">
            Encontre oportunidades de estagio alinhadas com seu curso e perfil.
          </p>
        </div>

        <div className="grid flex-1 content-start gap-5 md:grid-cols-2 lg:grid-cols-4">
          {vagasDaPagina.map((vaga) => (
            <article
              key={vaga.id}
              className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft transition hover:shadow-lg"
              style={{ animation: 'rise 0.35s ease-out both' }}
            >
              <span className="inline-flex rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-unp-blue">
                {vaga.area}
              </span>
              <h3 className="mt-3 font-heading text-xl font-bold text-unp-blue">
                {vaga.role}
              </h3>
              <p className="mt-2 font-body text-slate-700">{vaga.company}</p>
              <p className="mt-2 font-body text-sm text-slate-600">
                {vaga.description}
              </p>
              <div className="mt-4 flex gap-2 font-body text-sm text-slate-600">
                <span className="rounded-md bg-slate-100 px-2 py-1">{vaga.model}</span>
                <span className="rounded-md bg-slate-100 px-2 py-1">{vaga.workload}</span>
              </div>
              <Link
                to={`/vagas/${vaga.id}`}
                className="mt-5 block w-full rounded-xl bg-unp-orange px-4 py-2.5 text-center font-body font-semibold text-slate-900 transition hover:brightness-95"
              >
                Candidatar-se
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
            Proxima
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </StudentLayout>
  )
}

export default Vagas
