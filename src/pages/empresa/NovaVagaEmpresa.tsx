import { ArrowLeft, PlusCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CompanyLayout } from '../../components/CompanyLayout'

function NovaVagaEmpresa() {
  return (
    <CompanyLayout activeTab="vagas">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          to="/empresa/vagas"
          className="inline-flex items-center gap-2 rounded-lg border border-unp-blue/20 bg-white px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
        >
          <ArrowLeft size={16} />
          Voltar para vagas
        </Link>

        <section className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <div>
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
              Vagas
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
              Adicionar nova vaga
            </h2>
            <p className="mt-3 max-w-2xl font-body text-slate-600">
              Preencha as informações da oportunidade. Esta tela ainda não está conectada ao back-end.
            </p>
          </div>

          <form className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="titulo">
                  Titulo da vaga
                </label>
                <input
                  id="titulo"
                  type="text"
                  placeholder="Ex: Estagio em Desenvolvimento Web"
                  className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="area">
                  Area
                </label>
                <input
                  id="area"
                  type="text"
                  placeholder="Ex: TI, Marketing, RH"
                  className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="modelo">
                  Modelo de trabalho
                </label>
                <input
                  id="modelo"
                  type="text"
                  placeholder="Presencial, hibrido ou remoto"
                  className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="carga">
                  Carga horaria
                </label>
                <input
                  id="carga"
                  type="text"
                  placeholder="Ex: 20h/semana"
                  className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="bolsa">
                  Bolsa ou salario
                </label>
                <input
                  id="bolsa"
                  type="text"
                  placeholder="Ex: R$ 1.200,00"
                  className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="local">
                  Localidade
                </label>
                <input
                  id="local"
                  type="text"
                  placeholder="Ex: Mossoro - RN"
                  className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="descricao">
                Descricao da vaga
              </label>
              <textarea
                id="descricao"
                rows={4}
                placeholder="Descreva a oportunidade, atividades e o que a empresa espera do candidato"
                className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
              />
            </div>

            <div className="grid gap-2">
              <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="requisitos">
                Requisitos
              </label>
              <textarea
                id="requisitos"
                rows={3}
                placeholder="Liste os requisitos separados por linha ou virgula"
                className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
              />
            </div>

            <div className="grid gap-2">
              <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="beneficios">
                Beneficios
              </label>
              <textarea
                id="beneficios"
                rows={3}
                placeholder="Liste os beneficios da vaga"
                className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
              />
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="responsabilidades">
                  Responsabilidades
                </label>
                <textarea
                  id="responsabilidades"
                  rows={4}
                  placeholder="Liste as principais atividades"
                  className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                />
              </div>

              <div className="grid gap-2">
                <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="etapas">
                  Etapas do processo
                </label>
                <textarea
                  id="etapas"
                  rows={4}
                  placeholder="Ex: Inscricao, entrevista, teste pratico"
                  className="rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-unp-blue/10 pt-2">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-unp-orange px-6 py-3 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95"
              >
                <PlusCircle size={16} />
                Salvar vaga
              </button>
              <button
                type="button"
                className="rounded-xl border border-unp-blue/20 bg-white px-6 py-3 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
              >
                Rascunho
              </button>
            </div>
          </form>
        </section>
      </div>
    </CompanyLayout>
  )
}

export default NovaVagaEmpresa