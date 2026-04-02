import { ArrowRight, BellRing, BriefcaseBusiness, CalendarDays, CheckCircle2, Clock3, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CompanyLayout } from '../../components/CompanyLayout'
import { vagasData } from '../../data/vagas'

function DashboardEmpresa() {
  const vagasAtivas = 14
  const candidaturasNovas = 38
  const entrevistasAgendadas = 9
  const tempoMedio = '42h'

  const candidaturasRecentes = [
    {
      nome: 'Ana Clara Pereira',
      vaga: 'Estagio em Desenvolvimento Web',
      curso: 'Ciencia da Computacao',
      status: 'Em analise',
      tempo: 'hoje',
    },
    {
      nome: 'Pedro Henrique Lima',
      vaga: 'Estagio Administrativo',
      curso: 'Administracao',
      status: 'Entrevista agendada',
      tempo: 'ontem',
    },
    {
      nome: 'Mariana Souza',
      vaga: 'Estagio em UX/UI Design',
      curso: 'Design',
      status: 'Selecionada para teste',
      tempo: '2 dias',
    },
  ]

  const pipeline = [
    { label: 'Novas candidaturas', value: 38, accent: 'bg-unp-orange' },
    { label: 'Triagem concluida', value: 21, accent: 'bg-unp-blue' },
    { label: 'Entrevistas', value: 9, accent: 'bg-green-600' },
    { label: 'Contratacoes', value: 4, accent: 'bg-slate-900' },
  ]

  const vagasEmDestaque = vagasData.slice(0, 4)

  return (
    <CompanyLayout activeTab="dashboard">
      <div className="mx-auto max-w-6xl space-y-8" id="dashboard">
        <section className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
                Painel corporativo
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
                Dashboard da empresa
              </h2>
              <p className="mt-3 max-w-2xl font-body text-slate-600">
                Acompanhe vagas, candidaturas e etapas do processo seletivo em uma visao unica e objetiva.
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
              <button className="inline-flex items-center gap-2 rounded-xl border border-unp-blue/20 bg-white px-5 py-2.5 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice">
                <BellRing size={16} />
                Ver alertas
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: 'Vagas ativas', value: vagasAtivas, icon: BriefcaseBusiness },
              { label: 'Novas candidaturas', value: candidaturasNovas, icon: UsersRound },
              { label: 'Entrevistas agendadas', value: entrevistasAgendadas, icon: CalendarDays },
              { label: 'Tempo medio de resposta', value: tempoMedio, icon: Clock3 },
            ].map((item) => {
              const Icon = item.icon

              return (
                <article key={item.label} className="rounded-2xl border border-unp-blue/10 bg-unp-ice p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-body text-sm text-slate-600">{item.label}</p>
                      <p className="mt-2 font-heading text-3xl font-bold text-unp-blue">{item.value}</p>
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

        <section id="candidatos" className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
                  Candidatos
                </p>
                <h3 className="mt-2 font-heading text-2xl font-bold text-unp-blue">
                  Candidaturas recentes
                </h3>
              </div>

              <button className="rounded-xl border border-unp-blue/20 px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice">
                Ver fila completa
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {candidaturasRecentes.map((candidatura) => (
                <div key={candidatura.nome} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h4 className="font-heading text-lg font-bold text-unp-blue">{candidatura.nome}</h4>
                      <p className="mt-1 font-body text-sm text-slate-600">
                        {candidatura.vaga} • {candidatura.curso}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold text-unp-blue">
                        {candidatura.status}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 font-body text-xs text-slate-500 shadow-sm">
                        {candidatura.tempo}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
                    Pipeline
                  </p>
                  <h3 className="mt-2 font-heading text-2xl font-bold text-unp-blue">
                    Fase das candidaturas
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {pipeline.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-body text-sm text-slate-700">{item.label}</span>
                      <span className="font-body text-sm font-semibold text-slate-900">{item.value}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-100">
                      <div className={`h-2 rounded-full ${item.accent}`} style={{ width: `${Math.min(100, item.value * 2.2)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-unp-blue/10 bg-slate-900 p-6 text-white shadow-soft md:p-8">
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Proximo passo
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-white">
                Publique novas vagas com mais velocidade.
              </h3>
              <p className="mt-3 font-body text-sm text-slate-200">
                Centralize a abertura de oportunidades e reduza o tempo entre a publicacao e a triagem.
              </p>
              <Link
                to="/empresa/vagas/nova"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-unp-orange px-5 py-2.5 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95"
              >
                Nova vaga
                <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </section>

        <section id="vagas" className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
                Vagas
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-unp-blue">
                Vagas em destaque
              </h3>
            </div>
            <p className="font-body text-sm text-slate-600">
              Priorize as oportunidades com maior volume de candidatos.
            </p>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            {vagasEmDestaque.map((vaga) => (
              <article key={vaga.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="inline-flex rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-unp-blue">
                  {vaga.area}
                </span>
                <h4 className="mt-3 font-heading text-xl font-bold text-unp-blue">{vaga.role}</h4>
                <p className="mt-2 font-body text-sm text-slate-600">{vaga.company}</p>
                <p className="mt-2 font-body text-sm text-slate-700">{vaga.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 font-body text-xs text-slate-600">
                  <span className="rounded-md bg-white px-2 py-1 shadow-sm">{vaga.model}</span>
                  <span className="rounded-md bg-white px-2 py-1 shadow-sm">{vaga.workload}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="perfil" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
              Perfil da empresa
            </p>
            <h3 className="mt-2 font-heading text-2xl font-bold text-unp-blue">
              TechNordeste Solucoes
            </h3>
            <p className="mt-3 font-body text-slate-600">
              Empresa de tecnologia focada em sistemas de gestao e produtos digitais para o mercado regional.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-unp-ice p-4">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-unp-blue">Segmento</p>
                <p className="mt-1 font-heading text-lg font-bold text-unp-blue">Tecnologia</p>
              </div>
              <div className="rounded-2xl bg-unp-ice p-4">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-unp-blue">Cidades</p>
                <p className="mt-1 font-heading text-lg font-bold text-unp-blue">Mossoro e Natal</p>
              </div>
              <div className="rounded-2xl bg-unp-ice p-4">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-unp-blue">Candidatos</p>
                <p className="mt-1 font-heading text-lg font-bold text-unp-blue">126</p>
              </div>
              <div className="rounded-2xl bg-unp-ice p-4">
                <p className="font-body text-xs font-semibold uppercase tracking-[0.15em] text-unp-blue">Retorno medio</p>
                <p className="mt-1 font-heading text-lg font-bold text-unp-blue">42h</p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
              Metas
            </p>
            <h3 className="mt-2 font-heading text-2xl font-bold text-unp-blue">
              Indicadores do periodo
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-body text-sm text-slate-600">Taxa de resposta</p>
                <p className="mt-2 font-heading text-3xl font-bold text-unp-blue">84%</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-body text-sm text-slate-600">Vagas preenchidas</p>
                <p className="mt-2 font-heading text-3xl font-bold text-unp-blue">6</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="font-body text-sm text-slate-600">Processos ativos</p>
                <p className="mt-2 font-heading text-3xl font-bold text-unp-blue">11</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-unp-blue p-5 text-white">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="mt-0.5 text-unp-orange" />
                <div>
                  <p className="font-heading text-lg font-bold">Fluxo pronto para escala</p>
                  <p className="mt-2 font-body text-sm text-blue-100">
                    Estruture publicacao, triagem e retorno aos candidatos sem sair do painel.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </CompanyLayout>
  )
}

export default DashboardEmpresa