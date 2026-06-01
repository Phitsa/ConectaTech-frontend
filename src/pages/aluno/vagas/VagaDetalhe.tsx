import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapPin, Building2, ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react'
import { StudentLayout } from '../../../components/StudentLayout'
import { buscarVaga, candidatar, type Vaga } from '../../../services/vagas'
import { extractApiError } from '../../../services/api'

function VagaDetalhe() {
  const { id } = useParams()
  const [vaga, setVaga] = useState<Vaga | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [candidaturaEnviada, setCandidaturaEnviada] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [erroCandidatura, setErroCandidatura] = useState('')

  useEffect(() => {
    if (!id) return
    let ativo = true
    setCarregando(true)
    setErro('')

    buscarVaga(id)
      .then((dados) => {
        if (ativo) setVaga(dados)
      })
      .catch((error) => {
        if (ativo) setErro(extractApiError(error, 'Vaga nao encontrada.'))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [id])

  async function handleCandidatar() {
    if (!vaga) return
    setEnviando(true)
    setErroCandidatura('')
    try {
      await candidatar(vaga.id)
      setCandidaturaEnviada(true)
    } catch (error) {
      setErroCandidatura(extractApiError(error, 'Não foi possível enviar a candidatura.'))
    } finally {
      setEnviando(false)
    }
  }

  if (carregando) {
    return (
      <StudentLayout activeTab="vagas">
        <div className="mx-auto w-full max-w-5xl space-y-6">
          <div className="h-40 animate-pulse rounded-2xl border border-unp-blue/10 bg-white/70" />
          <div className="h-64 animate-pulse rounded-2xl border border-unp-blue/10 bg-white/70" />
        </div>
      </StudentLayout>
    )
  }

  if (erro || !vaga) {
    return (
      <StudentLayout activeTab="vagas">
        <div className="mx-auto max-w-3xl rounded-2xl border border-unp-blue/10 bg-white p-8 shadow-soft">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
            Area do aluno
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue">Vaga nao encontrada</h2>
          <p className="mt-3 font-body text-slate-600">
            {erro || 'A vaga solicitada nao existe ou foi removida.'}
          </p>
          <Link
            to="/vagas"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-unp-blue/25 px-5 py-2.5 font-body font-semibold text-unp-blue transition hover:bg-unp-ice"
          >
            <ArrowLeft size={16} />
            Voltar para vagas
          </Link>
        </div>
      </StudentLayout>
    )
  }

  return (
    <StudentLayout activeTab="vagas">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <Link
          to="/vagas"
          className="inline-flex items-center gap-2 rounded-lg border border-unp-blue/25 bg-white px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
        >
          <ArrowLeft size={16} />
          Voltar para vagas
        </Link>

        <section className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          {vaga.fonte && (
            <span className="inline-flex rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-unp-blue">
              {vaga.fonte}
            </span>
          )}
          <h1 className="mt-4 font-heading text-3xl font-bold text-unp-blue md:text-4xl">{vaga.titulo}</h1>
          <p className="mt-2 font-body text-lg text-slate-700">{vaga.empresa}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {vaga.localizacao && (
              <div className="flex items-center gap-2 rounded-lg bg-unp-ice px-3 py-2 font-body text-sm text-slate-700">
                <MapPin size={16} className="text-unp-blue" />
                {vaga.localizacao}
              </div>
            )}
            {vaga.empresaNome && (
              <div className="flex items-center gap-2 rounded-lg bg-unp-ice px-3 py-2 font-body text-sm text-slate-700">
                <Building2 size={16} className="text-unp-blue" />
                {vaga.empresaNome}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <h2 className="font-heading text-2xl font-bold text-unp-blue">Descricao da vaga</h2>
          <p className="mt-3 whitespace-pre-line font-body text-slate-700">
            {vaga.descricao || 'Sem descricao informada.'}
          </p>

          {vaga.url && (
            <a
              href={vaga.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-body text-sm font-semibold text-unp-blue transition hover:text-unp-blueDark"
            >
              <ExternalLink size={16} />
              Ver vaga original
            </a>
          )}

          <div className="mt-8 border-t border-unp-blue/10 pt-6">
            <button
              type="button"
              onClick={handleCandidatar}
              disabled={candidaturaEnviada || enviando}
              className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 font-body font-semibold transition md:w-auto ${
                candidaturaEnviada
                  ? 'cursor-not-allowed bg-green-600 text-white'
                  : 'bg-unp-orange text-slate-900 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60'
              }`}
            >
              {candidaturaEnviada && <CheckCircle2 size={18} />}
              {candidaturaEnviada ? 'Candidatura enviada' : enviando ? 'Enviando…' : 'Candidatar-se agora'}
            </button>

            {erroCandidatura && (
              <p className="mt-3 font-body text-sm font-semibold text-red-600">{erroCandidatura}</p>
            )}
            {candidaturaEnviada && (
              <p className="mt-3 font-body text-sm font-semibold text-green-700">
                Sua candidatura foi registrada com sucesso.
              </p>
            )}
          </div>
        </section>
      </div>
    </StudentLayout>
  )
}

export default VagaDetalhe
