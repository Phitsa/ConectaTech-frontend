import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import RedatorLayout from '../../../components/RedatorLayout'

const empresasData = [
  { id: 1, name: 'TechNordeste Solucoes', sector: 'Tecnologia', location: 'Mossoró - RN', status: 'Ativa' },
  { id: 2, name: 'Agencia Sertao Criativo', sector: 'Comunicação', location: 'Mossoró - RN', status: 'Ativa' },
  { id: 3, name: 'Grupo Potiguar Negocios', sector: 'Gestão', location: 'Natal - RN', status: 'Em revisão' },
  { id: 4, name: 'Lab Criativo RN', sector: 'Design', location: 'Natal - RN', status: 'Ativa' },
  { id: 5, name: 'Norte Analytics', sector: 'Dados', location: 'Remoto', status: 'Ativa' },
  { id: 6, name: 'Conecta Solutions', sector: 'TI', location: 'Mossoró - RN', status: 'Ativa' },
  { id: 7, name: 'Quality Hub', sector: 'TI', location: 'Remoto', status: 'Ativa' },
  { id: 8, name: 'Potiguar People', sector: 'RH', location: 'Mossoró - RN', status: 'Ativa' },
  { id: 9, name: 'Blue Pixel', sector: 'TI', location: 'Natal - RN', status: 'Em revisão' },
  { id: 10, name: 'Midia Nordeste', sector: 'Comunicação', location: 'Remoto', status: 'Ativa' },
  { id: 11, name: 'Nexa Contabil', sector: 'Financeiro', location: 'Mossoró - RN', status: 'Ativa' },
  { id: 12, name: 'Inova Lab', sector: 'Produto', location: 'Natal - RN', status: 'Ativa' },
]

function RedatorEmpresas() {
  const [paginaAtual, setPaginaAtual] = useState(1)

  const empresasPorPagina = 8
  const totalPaginas = Math.ceil(empresasData.length / empresasPorPagina)
  const inicio = (paginaAtual - 1) * empresasPorPagina
  const fim = inicio + empresasPorPagina
  const empresasDaPagina = empresasData.slice(inicio, fim)

  return (
    <RedatorLayout activeTab="empresas">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Redator</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Empresas</h1>
            <p className="mt-2 text-sm text-slate-600">Veja as empresas cadastradas e navegue entre as páginas.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/redator/empresas/nova"
              className="inline-flex rounded-full bg-unp-orange px-5 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95"
            >
              Adicionar empresa
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
        {empresasDaPagina.map((empresa) => (
          <article key={empresa.id} className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft transition hover:shadow-lg">
            <h3 className="font-heading text-xl font-bold text-unp-blue">{empresa.name}</h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{empresa.sector}</p>
            <p className="mt-3 text-sm text-slate-600">{empresa.location}</p>
            <p className="mt-3 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              {empresa.status}
            </p>
          </article>
        ))}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-600">
          Mostrando {inicio + 1}–{Math.min(fim, empresasData.length)} de {empresasData.length} empresas
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

export default RedatorEmpresas
