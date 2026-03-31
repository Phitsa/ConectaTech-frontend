import { Link } from 'react-router-dom'

function Home() {
  const highlights = [
    {
      title: '+120 vagas ativas',
      description:
        'Oportunidades atualizadas para alunos de diferentes cursos e semestres.',
    },
    {
      title: 'Empresas de Mossoro',
      description:
        'Conexao com negocios locais que buscam talentos em inicio de carreira.',
    },
    {
      title: 'Processo simplificado',
      description:
        'Cadastro rapido e candidatura com poucos cliques em qualquer dispositivo.',
    },
  ]

  const jobs = [
    {
      role: 'Estagio em Desenvolvimento Web',
      company: 'TechNordeste Solucoes',
      area: 'TI',
      model: 'Hibrido',
      workload: '30h/semana',
    },
    {
      role: 'Estagio em Marketing Digital',
      company: 'Agencia Sertao Criativo',
      area: 'Comunicacao',
      model: 'Presencial',
      workload: '20h/semana',
    },
    {
      role: 'Estagio Administrativo',
      company: 'Grupo Potiguar Negocios',
      area: 'Gestao',
      model: 'Presencial',
      workload: '25h/semana',
    },
  ]

  return (
    <main className="relative overflow-x-hidden bg-[radial-gradient(circle_at_top_right,_#f7941d2e,_transparent_35%),radial-gradient(circle_at_top_left,_#003b8e1f,_transparent_45%),linear-gradient(180deg,#f7f9ff_0%,#ffffff_45%,#eef3ff_100%)] text-slate-900">
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-unp-orange/20 blur-3xl" />
      <div className="absolute -right-16 top-16 h-64 w-64 rounded-full bg-unp-blue/20 blur-3xl" />

      <section className="mx-auto max-w-6xl px-6 pb-12 pt-10 md:px-10 md:pt-14">
        <nav className="mb-16 flex items-center justify-between rounded-2xl border border-unp-blue/15 bg-white/75 px-4 py-3 shadow-soft backdrop-blur md:px-6">
          <div className="font-heading text-lg font-bold text-unp-blue md:text-xl">
            UNP Mossoro Estagios
          </div>
          <Link className="rounded-full bg-unp-blue px-5 py-2 font-body text-sm font-semibold text-white transition hover:bg-unp-blueDark"
            to="/login"
          >
            Entrar
          </Link>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-unp-orange/40 bg-unp-orange/10 px-4 py-1 text-sm font-semibold text-unp-blue animate-rise">
              Conectatech Estagios - UNP Mossoro
            </span>
            <h1 className="font-heading text-4xl font-extrabold leading-tight text-unp-blue animate-rise [animation-delay:120ms] md:text-6xl">
              Conectando estudantes e empresas da regiao em uma so plataforma.
            </h1>
            <p className="max-w-xl font-body text-lg text-slate-700 animate-rise [animation-delay:220ms]">
              Descubra vagas alinhadas ao seu curso, candidate-se com rapidez e
              fortalece sua jornada profissional com oportunidades reais em Mossoro.
            </p>
            <div className="flex flex-wrap gap-4 animate-rise [animation-delay:320ms]">
              <Link to="/registro" className="rounded-xl bg-unp-orange px-6 py-3 font-body font-bold text-slate-900 transition hover:brightness-95">
                Quero me candidatar
              </Link>
              <Link
                to="/clientes"
                className="rounded-xl border border-unp-blue/30 bg-white px-6 py-3 font-body font-bold text-unp-blue transition hover:border-unp-blue hover:bg-unp-blue/5"
              >
                Sou empresa parceira
              </Link>
            </div>
          </div>

          <aside className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft animate-rise [animation-delay:420ms] md:p-8">
            <p className="mb-4 font-heading text-lg font-semibold text-unp-blue">
              Painel rapido
            </p>
            <div className="space-y-4">
              <article className="rounded-2xl border border-unp-blue/10 bg-unp-ice p-4">
                <p className="font-body text-sm text-slate-600">Vagas publicadas hoje</p>
                <p className="font-heading text-3xl font-bold text-unp-blue">18</p>
              </article>
              <article className="rounded-2xl border border-unp-orange/20 bg-orange-50 p-4">
                <p className="font-body text-sm text-slate-600">Empresas cadastradas</p>
                <p className="font-heading text-3xl font-bold text-unp-blue">74</p>
              </article>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft opacity-0 animate-rise"
              style={{ animationDelay: `${500 + index * 140}ms` }}
            >
              <h2 className="mb-2 font-heading text-2xl font-bold text-unp-blue">
                {item.title}
              </h2>
              <p className="font-body text-slate-700">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
              Oportunidades em destaque
            </p>
            <h3 className="font-heading text-3xl font-bold text-unp-blue md:text-4xl">
              Vagas abertas esta semana
            </h3>
          </div>
          <button className="self-start rounded-lg border border-unp-blue/25 bg-white px-5 py-2 font-body font-semibold text-unp-blue transition hover:bg-unp-blue/5 md:self-auto">
            Ver todas as vagas
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <article
              key={job.role}
              className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft opacity-0 animate-rise"
              style={{ animationDelay: `${620 + index * 120}ms` }}
            >
              <span className="mb-3 inline-flex rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-unp-blue">
                {job.area}
              </span>
              <h4 className="mb-2 font-heading text-xl font-bold text-unp-blue">
                {job.role}
              </h4>
              <p className="font-body text-slate-700">{job.company}</p>
              <div className="mt-4 flex gap-2 font-body text-sm text-slate-600">
                <span className="rounded-md bg-slate-100 px-2 py-1">{job.model}</span>
                <span className="rounded-md bg-slate-100 px-2 py-1">
                  {job.workload}
                </span>
              </div>
              <button className="mt-6 w-full rounded-xl bg-unp-blue px-4 py-2.5 font-body font-semibold text-white transition hover:bg-unp-blueDark">
                Candidatar-se
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <div className="rounded-3xl bg-unp-blue px-6 py-10 text-center shadow-soft md:px-10 md:py-14">
          <h5 className="font-heading text-3xl font-bold text-white md:text-4xl">
            Sua carreira comeca no campus e ganha o mercado.
          </h5>
          <p className="mx-auto mt-3 max-w-2xl font-body text-lg text-blue-100">
            Faca seu cadastro gratuitamente e receba alertas personalizados de estagio
            de acordo com o seu curso na UNP Mossoro.
          </p>
          <button className="mt-8 rounded-xl bg-unp-orange px-7 py-3 font-body text-base font-bold text-slate-900 transition hover:brightness-95">
            Criar conta agora
          </button>
        </div>
      </section>

      <footer className="border-t border-unp-blue/10 bg-white/80 py-6 text-center font-body text-sm text-slate-600">
        Conectatech Estagios - UNP Mossoro | ConectaTech 2026
      </footer>
    </main>
  )
}

export default Home
