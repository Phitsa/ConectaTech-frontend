import { useEffect, useState } from 'react'
import { ArrowRight, MapPin, Trash2, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CompanyLayout } from '../../components/CompanyLayout'
import {
  excluirVagaEmpresa,
  listarInteressados,
  listarVagasEmpresa,
  type Interessado,
} from '../../services/empresa'
import type { Vaga } from '../../services/vagas'
import { extractApiError } from '../../services/api'

function VagasEmpresa() {
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [removendo, setRemovendo] = useState<number | null>(null)
  const [vagaAberta, setVagaAberta] = useState<number | null>(null)
  const [interessados, setInteressados] = useState<Interessado[]>([])
  const [carregandoInteressados, setCarregandoInteressados] = useState(false)

  useEffect(() => {
    let ativo = true
    listarVagasEmpresa()
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
      await excluirVagaEmpresa(id)
      setVagas((atual) => atual.filter((vaga) => vaga.id !== id))
      if (vagaAberta === id) setVagaAberta(null)
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível excluir a vaga.'))
    } finally {
      setRemovendo(null)
    }
  }

  async function handleVerCandidatos(id: number) {
    if (vagaAberta === id) {
      setVagaAberta(null)
      return
    }
    setVagaAberta(id)
    setCarregandoInteressados(true)
    setInteressados([])
    try {
      const lista = await listarInteressados(id)
      setInteressados(lista)
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível carregar os candidatos.'))
    } finally {
      setCarregandoInteressados(false)
    }
  }

  return (
    <CompanyLayout activeTab="vagas">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Vagas</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">Vagas da empresa</h2>
              <p className="mt-3 max-w-2xl font-body text-slate-600">
                Gerencie suas oportunidades e acompanhe quem demonstrou interesse.
              </p>
            </div>

            <Link
              to="/empresa/vagas/nova"
              className="inline-flex items-center gap-2 rounded-xl bg-unp-orange px-5 py-2.5 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95"
            >
              Adicionar vaga
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-heading text-2xl font-bold text-unp-blue">Oportunidades cadastradas</h3>
            {!carregando && <span className="font-body text-sm text-slate-600">{vagas.length} registros</span>}
          </div>

          {erro && (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">
              {erro}
            </p>
          )}

          {carregando ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-44 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
              ))}
            </div>
          ) : vagas.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
              <p className="font-body text-slate-600">Nenhuma vaga cadastrada ainda.</p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {vagas.map((vaga) => (
                <article key={vaga.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <h4 className="font-heading text-xl font-bold text-unp-blue">{vaga.titulo}</h4>
                  <p className="mt-1 font-body text-sm text-slate-600">{vaga.empresa}</p>
                  {vaga.descricao && <p className="mt-3 font-body text-sm text-slate-700">{vaga.descricao}</p>}
                  {vaga.localizacao && (
                    <div className="mt-4 flex items-center gap-1.5 font-body text-xs text-slate-600">
                      <MapPin size={14} className="text-unp-blue" />
                      {vaga.localizacao}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      to={`/empresa/vagas/nova?id=${vaga.id}`}
                      className="rounded-xl border border-unp-blue/20 bg-white px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                    >
                      Editar
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleVerCandidatos(vaga.id)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-unp-blue/20 bg-white px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                    >
                      <Users size={15} />
                      {vagaAberta === vaga.id ? 'Ocultar candidatos' : 'Ver candidatos'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExcluir(vaga.id)}
                      disabled={removendo === vaga.id}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2 font-body text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                    >
                      <Trash2 size={15} />
                      {removendo === vaga.id ? 'Excluindo…' : 'Excluir'}
                    </button>
                  </div>

                  {vagaAberta === vaga.id && (
                    <div className="mt-5 border-t border-slate-200 pt-4">
                      {carregandoInteressados ? (
                        <p className="font-body text-sm text-slate-500">Carregando candidatos…</p>
                      ) : interessados.length === 0 ? (
                        <p className="font-body text-sm text-slate-500">Nenhum candidato ainda.</p>
                      ) : (
                        <ul className="space-y-2">
                          {interessados.map((candidato) => (
                            <li
                              key={candidato.alunoEmail}
                              className="rounded-lg bg-white px-3 py-2 font-body text-sm text-slate-700 shadow-sm"
                            >
                              <span className="font-semibold text-unp-blue">{candidato.alunoNome}</span>
                              {candidato.alunoCurso && <span> • {candidato.alunoCurso}</span>}
                              <span className="block text-xs text-slate-500">{candidato.alunoEmail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </CompanyLayout>
  )
}

export default VagasEmpresa
