import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Trash2 } from 'lucide-react'
import { StudentLayout } from '../../components/StudentLayout'
import { minhasSelecoes, removerSelecao, type Vaga } from '../../services/vagas'
import { extractApiError } from '../../services/api'

function MinhasCandidaturas() {
  const [candidaturas, setCandidaturas] = useState<Vaga[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [removendo, setRemovendo] = useState<number | null>(null)

  useEffect(() => {
    let ativo = true
    minhasSelecoes()
      .then((dados) => {
        if (ativo) setCandidaturas(dados)
      })
      .catch((error) => {
        if (ativo) setErro(extractApiError(error, 'Não foi possível carregar suas candidaturas.'))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [])

  async function handleRemover(vagaId: number) {
    setRemovendo(vagaId)
    try {
      await removerSelecao(vagaId)
      setCandidaturas((atual) => atual.filter((vaga) => vaga.id !== vagaId))
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível remover a candidatura.'))
    } finally {
      setRemovendo(null)
    }
  }

  return (
    <StudentLayout activeTab="candidaturas">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
            Area do aluno
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
            Minhas Candidaturas
          </h2>
          <p className="mt-2 font-body text-slate-600">
            Acompanhe as vagas para as quais você se candidatou.
          </p>
        </div>

        {erro && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">
            {erro}
          </div>
        )}

        {carregando ? (
          <div className="space-y-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl border border-unp-blue/10 bg-white/70" />
            ))}
          </div>
        ) : candidaturas.length === 0 ? (
          <div className="rounded-2xl border border-unp-blue/10 bg-white p-12 text-center shadow-soft">
            <p className="font-body text-slate-600">Você ainda nao se candidatou para nenhuma vaga.</p>
            <Link
              to="/vagas"
              className="mt-4 inline-flex rounded-xl bg-unp-orange px-6 py-2.5 font-body font-semibold text-slate-900 transition hover:brightness-95"
            >
              Explorar vagas
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {candidaturas.map((vaga) => (
              <div
                key={vaga.id}
                className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft transition hover:shadow-lg"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-bold text-unp-blue">{vaga.titulo}</h3>
                    <p className="mt-1 font-body text-slate-600">{vaga.empresa}</p>
                    {vaga.localizacao && (
                      <p className="mt-2 flex items-center gap-1.5 font-body text-sm text-slate-500">
                        <MapPin size={14} className="text-unp-blue" />
                        {vaga.localizacao}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Link
                      to={`/vagas/${vaga.id}`}
                      className="rounded-lg border border-unp-blue/25 px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                    >
                      Ver detalhes
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleRemover(vaga.id)}
                      disabled={removendo === vaga.id}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 font-body text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 size={15} />
                      {removendo === vaga.id ? 'Removendo…' : 'Remover'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  )
}

export default MinhasCandidaturas
