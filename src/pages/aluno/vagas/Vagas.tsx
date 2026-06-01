import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Search } from 'lucide-react'
import { StudentLayout } from '../../../components/StudentLayout'
import { VagaCarousel } from '../../../components/ui/VagaCarousel'
import { listarVagas, type Vaga } from '../../../services/vagas'
import { extractApiError } from '../../../services/api'

function Vagas() {
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [busca, setBusca] = useState('')
  const [termo, setTermo] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [paginaAtual, setPaginaAtual] = useState(1)

  useEffect(() => {
    let ativo = true

    listarVagas(termo ? { busca: termo } : {})
      .then((dados) => {
        if (!ativo) return
        setVagas(dados)
        setErro('')
        setPaginaAtual(1)
      })
      .catch((error) => {
        if (!ativo) return
        setErro(extractApiError(error, 'Não foi possível carregar as vagas.'))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [termo])

  const vagasPorPagina = 8
  const totalPaginas = Math.max(1, Math.ceil(vagas.length / vagasPorPagina))
  const vagasDaPagina = useMemo(() => {
    const inicio = (paginaAtual - 1) * vagasPorPagina
    return vagas.slice(inicio, inicio + vagasPorPagina)
  }, [vagas, paginaAtual])

  function handleBuscar(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)
    setTermo(busca.trim())
  }

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

        <form onSubmit={handleBuscar} className="mb-6 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por titulo, empresa ou descricao"
              className="w-full rounded-xl border border-unp-blue/20 bg-white py-2.5 pl-10 pr-4 font-body text-sm text-slate-900 outline-none transition focus:border-unp-blue"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-unp-blue px-6 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-unp-blueDark"
          >
            Buscar
          </button>
        </form>

        {!carregando && !erro && !termo && vagas.length > 0 && (
          <div className="mb-10 opacity-0 animate-fadeIn">
            <h3 className="mb-4 font-heading text-lg font-bold text-unp-blue">Vagas em destaque</h3>
            <VagaCarousel vagas={vagas.slice(0, 8)} />
          </div>
        )}

        {carregando ? (
          <div className="grid flex-1 content-start gap-5 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl border border-unp-blue/10 bg-white/70" />
            ))}
          </div>
        ) : erro ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center font-body text-red-700">
            {erro}
          </div>
        ) : vagas.length === 0 ? (
          <div className="rounded-2xl border border-unp-blue/10 bg-white p-12 text-center shadow-soft">
            <p className="font-body text-slate-600">Nenhuma vaga encontrada.</p>
          </div>
        ) : (
          <div className="grid flex-1 content-start gap-5 md:grid-cols-2 lg:grid-cols-4">
            {vagasDaPagina.map((vaga) => (
              <article
                key={vaga.id}
                className="flex flex-col rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft transition hover:shadow-lg"
                style={{ animation: 'rise 0.35s ease-out both' }}
              >
                {vaga.fonte && (
                  <span className="inline-flex w-fit rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-unp-blue">
                    {vaga.fonte}
                  </span>
                )}
                <h3 className="mt-3 font-heading text-xl font-bold text-unp-blue">{vaga.titulo}</h3>
                <p className="mt-2 font-body text-slate-700">{vaga.empresa}</p>
                {vaga.descricao && (
                  <p className="mt-2 line-clamp-3 font-body text-sm text-slate-600">{vaga.descricao}</p>
                )}
                {vaga.localizacao && (
                  <div className="mt-4 flex items-center gap-1.5 font-body text-sm text-slate-600">
                    <MapPin size={15} className="text-unp-blue" />
                    {vaga.localizacao}
                  </div>
                )}
                <Link
                  to={`/vagas/${vaga.id}`}
                  className="mt-5 block w-full rounded-xl bg-unp-orange px-4 py-2.5 text-center font-body font-semibold text-slate-900 transition hover:brightness-95"
                >
                  Ver detalhes
                </Link>
              </article>
            ))}
          </div>
        )}

        {!carregando && !erro && totalPaginas > 1 && (
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

            <span className="font-body text-sm font-semibold text-unp-blue">
              {paginaAtual} de {totalPaginas}
            </span>

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
        )}
      </div>
    </StudentLayout>
  )
}

export default Vagas
