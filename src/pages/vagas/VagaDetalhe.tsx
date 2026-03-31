import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MapPin, Building2, Clock3, Wallet, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { StudentLayout } from '../../components/StudentLayout'
import { vagasData } from '../../data/vagas'

function VagaDetalhe() {
  const [candidaturaEnviada, setCandidaturaEnviada] = useState(false)
  const { id } = useParams()
  const vagaId = Number(id)
  const vaga = vagasData.find((item) => item.id === vagaId)

  if (!vaga) {
    return (
      <StudentLayout activeTab="vagas">
        <div className="mx-auto max-w-3xl rounded-2xl border border-unp-blue/10 bg-white p-8 shadow-soft">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
            Area do aluno
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue">Vaga nao encontrada</h2>
          <p className="mt-3 font-body text-slate-600">
            A vaga solicitada nao existe ou foi removida pela empresa.
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
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <Link
          to="/vagas"
          className="inline-flex items-center gap-2 rounded-lg border border-unp-blue/25 bg-white px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
        >
          <ArrowLeft size={16} />
          Voltar para vagas
        </Link>

        <section className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <span className="inline-flex rounded-full bg-unp-blue/10 px-3 py-1 font-body text-xs font-semibold uppercase tracking-wide text-unp-blue">
            {vaga.area}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold text-unp-blue md:text-4xl">{vaga.role}</h1>
          <p className="mt-2 font-body text-lg text-slate-700">{vaga.company}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2 rounded-lg bg-unp-ice px-3 py-2 font-body text-sm text-slate-700">
              <MapPin size={16} className="text-unp-blue" />
              {vaga.location}
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-unp-ice px-3 py-2 font-body text-sm text-slate-700">
              <Building2 size={16} className="text-unp-blue" />
              {vaga.model}
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-unp-ice px-3 py-2 font-body text-sm text-slate-700">
              <Clock3 size={16} className="text-unp-blue" />
              {vaga.workload}
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-unp-ice px-3 py-2 font-body text-sm text-slate-700">
              <Wallet size={16} className="text-unp-blue" />
              Bolsa: {vaga.stipend}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
            <h2 className="font-heading text-2xl font-bold text-unp-blue">Descricao da vaga</h2>
            <p className="mt-3 font-body text-slate-700">{vaga.description}</p>

            <h3 className="mt-6 font-heading text-xl font-bold text-unp-blue">Sobre a empresa</h3>
            <p className="mt-2 font-body text-slate-700">{vaga.aboutCompany}</p>

            <h3 className="mt-6 font-heading text-xl font-bold text-unp-blue">Requisitos</h3>
            <ul className="mt-2 space-y-2 font-body text-slate-700">
              {vaga.requirements.map((item) => (
                <li key={item} className="rounded-md bg-slate-50 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-6 font-heading text-xl font-bold text-unp-blue">Responsabilidades</h3>
            <ul className="mt-2 space-y-2 font-body text-slate-700">
              {vaga.responsibilities.map((item) => (
                <li key={item} className="rounded-md bg-slate-50 px-3 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft">
              <h3 className="font-heading text-xl font-bold text-unp-blue">Beneficios</h3>
              <ul className="mt-3 space-y-2 font-body text-slate-700">
                {vaga.benefits.map((item) => (
                  <li key={item} className="rounded-md bg-unp-ice px-3 py-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-unp-blue/10 bg-white p-6 shadow-soft">
              <h3 className="font-heading text-xl font-bold text-unp-blue">Etapas do processo</h3>
              <ol className="mt-3 space-y-2 font-body text-slate-700">
                {vaga.processSteps.map((item, index) => (
                  <li key={item} className="rounded-md bg-slate-50 px-3 py-2">
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>

              <button
                type="button"
                onClick={() => setCandidaturaEnviada(true)}
                disabled={candidaturaEnviada}
                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 font-body font-semibold transition ${
                  candidaturaEnviada
                    ? 'cursor-not-allowed bg-green-600 text-white'
                    : 'bg-unp-orange text-slate-900 hover:brightness-95'
                }`}
              >
                {candidaturaEnviada && <CheckCircle2 size={18} />}
                {candidaturaEnviada ? 'Candidatura enviada' : 'Candidatar-se agora'}
              </button>

              {candidaturaEnviada && (
                <p className="mt-3 text-center font-body text-sm font-semibold text-green-700">
                  Sua candidatura foi registrada com sucesso.
                </p>
              )}
            </div>
          </aside>
        </section>
      </div>
    </StudentLayout>
  )
}

export default VagaDetalhe
