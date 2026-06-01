import { useEffect, useState } from 'react'
import { ArrowRight, BriefcaseBusiness, MapPin, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CompanyLayout } from '../../components/CompanyLayout'
import {
  getPerfilEmpresa,
  listarInteressados,
  listarVagasEmpresa,
  type Empresa,
} from '../../services/empresa'
import type { Vaga } from '../../services/vagas'
import { extractApiError } from '../../services/api'

function DashboardEmpresa() {
  const [perfil, setPerfil] = useState<Empresa | null>(null)
  const [vagas, setVagas] = useState<Vaga[]>([])
  const [totalInteressados, setTotalInteressados] = useState(0)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    let ativo = true

    Promise.all([getPerfilEmpresa(), listarVagasEmpresa()])
      .then(async ([dadosPerfil, dadosVagas]) => {
        if (!ativo) return
        setPerfil(dadosPerfil)
        setVagas(dadosVagas)
        const contagens = await Promise.all(
          dadosVagas.map((vaga) =>
            listarInteressados(vaga.id)
              .then((lista) => lista.length)
              .catch(() => 0),
          ),
        )
        if (ativo) setTotalInteressados(contagens.reduce((soma, n) => soma + n, 0))
      })
      .catch((error) => {
        if (ativo) setErro(extractApiError(error, 'Não foi possível carregar o painel.'))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [])

  const indicadores = [
    { label: 'Vagas publicadas', value: vagas.length, icon: BriefcaseBusiness },
    { label: 'Total de candidatos', value: totalInteressados, icon: UsersRound },
  ]

  return (
    <CompanyLayout activeTab="dashboard">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
                Painel corporativo
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
                {perfil ? `Ola, ${perfil.nome}` : 'Dashboard da empresa'}
              </h2>
              <p className="mt-3 max-w-2xl font-body text-slate-600">
                Acompanhe suas vagas e o volume de candidatos em uma visao unica.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/empresa/vagas"
                className="inline-flex items-center gap-2 rounded-xl bg-unp-orange px-5 py-2.5 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95"
              >
                Ver vagas
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/empresa/vagas/nova"
                className="inline-flex items-center gap-2 rounded-xl border border-unp-blue/20 bg-white px-5 py-2.5 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
              >
                Nova vaga
              </Link>
            </div>
          </div>

          {erro && (
            <p className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">
              {erro}
            </p>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {indicadores.map((item) => {
              const Icon = item.icon
              return (
                <article key={item.label} className="rounded-2xl border border-unp-blue/10 bg-unp-ice p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-body text-sm text-slate-600">{item.label}</p>
                      <p className="mt-2 font-heading text-3xl font-bold text-unp-blue">
                        {carregando ? '—' : item.value}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white p-3 text-unp-blue shadow-sm">
                      <Icon size={20} />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Vagas</p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-unp-blue">Suas vagas recentes</h3>
            </div>
            <Link
              to="/empresa/vagas"
              className="font-body text-sm font-semibold text-unp-blue transition hover:text-unp-blueDark"
            >
              Gerenciar todas
            </Link>
          </div>

          {carregando ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
              ))}
            </div>
          ) : vagas.length === 0 ? (
            <p className="mt-6 font-body text-slate-600">
              Você ainda nao publicou vagas.{' '}
              <Link to="/empresa/vagas/nova" className="font-semibold text-unp-blue">
                Criar a primeira
              </Link>
              .
            </p>
          ) : (
            <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
              {vagas.slice(0, 4).map((vaga) => (
                <article key={vaga.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <h4 className="font-heading text-lg font-bold text-unp-blue">{vaga.titulo}</h4>
                  <p className="mt-1 font-body text-sm text-slate-600">{vaga.empresa}</p>
                  {vaga.descricao && (
                    <p className="mt-2 line-clamp-2 font-body text-sm text-slate-700">{vaga.descricao}</p>
                  )}
                  {vaga.localizacao && (
                    <div className="mt-3 flex items-center gap-1.5 font-body text-xs text-slate-600">
                      <MapPin size={14} className="text-unp-blue" />
                      {vaga.localizacao}
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

export default DashboardEmpresa
