import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Pencil, Trash2 } from 'lucide-react'
import RedatorLayout from '../../../components/RedatorLayout'
import { excluirVagaRedator, listarVagasRedator } from '../../../services/redator'
import type { Vaga } from '../../../services/vagas'
import { extractApiError } from '../../../services/api'

function RedatorVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [removendo, setRemovendo] = useState<number | null>(null)

  useEffect(() => {
    let ativo = true
    listarVagasRedator()
      .then((dados) => {
        if (ativo) setVagas(dados)
      })
      .catch((error) => {
        if (ativo) setErro(extractApiError(error, 'Não foi possível carregar as vagas.'))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [])

  async function handleExcluir(id: number) {
    if (!window.confirm('Deseja excluir esta vaga?')) return
    setRemovendo(id)
    try {
      await excluirVagaRedator(id)
      setVagas((atual) => atual.filter((vaga) => vaga.id !== id))
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível excluir a vaga.'))
    } finally {
      setRemovendo(null)
    }
  }

  return (
    <RedatorLayout activeTab="vagas">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Redator</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Vagas</h1>
            <p className="mt-2 text-sm text-slate-600">Gerencie todas as vagas cadastradas na plataforma.</p>
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

      {erro && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">{erro}</div>
      )}

      {carregando ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-2xl border border-unp-blue/10 bg-white/70" />
          ))}
        </div>
      ) : vagas.length === 0 ? (
        <div className="rounded-2xl border border-unp-blue/10 bg-white p-12 text-center shadow-soft">
          <p className="font-body text-slate-600">Nenhuma vaga cadastrada.</p>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {vagas.map((vaga) => (
            <article
              key={vaga.id}
              className="flex flex-col rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft transition hover:shadow-lg"
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
              <div className="mt-5 flex gap-2 border-t border-unp-blue/10 pt-4">
                <Link
                  to={`/redator/vagas/nova?id=${vaga.id}`}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-unp-blue/20 px-3 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                >
                  <Pencil size={14} />
                  Editar
                </Link>
                <button
                  type="button"
                  onClick={() => handleExcluir(vaga.id)}
                  disabled={removendo === vaga.id}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 font-body text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                >
                  <Trash2 size={14} />
                  {removendo === vaga.id ? '…' : 'Excluir'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </RedatorLayout>
  )
}

export default RedatorVagas
