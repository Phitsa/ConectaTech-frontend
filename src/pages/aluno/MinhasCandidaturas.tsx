import { StudentLayout } from '../../components/StudentLayout'

function MinhasCandidaturas() {
  const candidaturas = [
    {
      id: 1,
      role: 'Estagio em Desenvolvimento Web',
      company: 'TechNordeste Solucoes',
      status: 'Analise',
      dataCandidatura: '28/03/2026',
    },
    {
      id: 2,
      role: 'Estagio em Marketing Digital',
      company: 'Agencia Sertao Criativo',
      status: 'Desaprovado',
      dataCandidatura: '25/03/2026',
    },
    {
      id: 3,
      role: 'Estagio Administrativo',
      company: 'Grupo Potiguar Negocios',
      status: 'Aprovado',
      dataCandidatura: '20/03/2026',
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aprovado':
        return 'bg-green-100 text-green-700'
      case 'Desaprovado':
        return 'bg-red-100 text-red-700'
      case 'Analise':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-slate-100 text-slate-700'
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
                Acompanhe o status de todas as suas candidaturas.
              </p>
            </div>

            <div className="space-y-3">
              {candidaturas.map((candidatura) => (
                <div
                  key={candidatura.id}
                  className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft transition hover:shadow-lg"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-bold text-unp-blue">
                        {candidatura.role}
                      </h3>
                      <p className="mt-1 font-body text-slate-600">{candidatura.company}</p>
                      <p className="mt-2 font-body text-sm text-slate-500">
                        Candidatura em {candidatura.dataCandidatura}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex rounded-full px-4 py-1.5 font-body text-sm font-semibold ${getStatusColor(
                          candidatura.status
                        )}`}
                      >
                        {candidatura.status}
                      </span>
                      <button className="rounded-lg border border-unp-blue/25 px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice">
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {candidaturas.length === 0 && (
              <div className="rounded-2xl border border-unp-blue/10 bg-white p-12 text-center shadow-soft">
                <p className="font-body text-slate-600">
                  Você ainda nao se candidatou para nenhuma vaga.
                </p>
              </div>
            )}
        </div>
      </StudentLayout>
  )
}

export default MinhasCandidaturas
