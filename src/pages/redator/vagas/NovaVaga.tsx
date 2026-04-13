import { Link } from 'react-router-dom'

function NovaVaga() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Redator</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Adicionar vaga</h1>
              <p className="mt-2 text-sm text-slate-600">Preencha as informações abaixo para criar uma nova vaga.</p>
            </div>
            <Link
              to="/redator/vagas"
              className="inline-flex rounded-full border border-unp-blue/20 bg-unp-ice px-4 py-2 text-sm font-semibold text-unp-blue transition hover:bg-unp-blue/5"
            >
              Voltar às vagas
            </Link>
          </div>
        </div>

        <form className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Título da vaga</span>
              <input
                type="text"
                placeholder="Ex: Estágio em Front-end"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Empresa</span>
              <input
                type="text"
                placeholder="Nome da empresa"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Área</span>
              <input
                type="text"
                placeholder="Ex: TI, Marketing, RH"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Modelo</span>
              <input
                type="text"
                placeholder="Ex: Remoto, Presencial, Híbrido"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
              />
            </label>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Carga horária</span>
              <input
                type="text"
                placeholder="Ex: 30h/semana"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Localização</span>
              <input
                type="text"
                placeholder="Ex: Mossoró - RN"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-900">Descrição</span>
            <textarea
              rows={4}
              placeholder="Descrição da vaga"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-unp-orange px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95"
            >
              Salvar vaga
            </button>
            <Link
              to="/redator/vagas"
              className="rounded-full border border-unp-blue/25 px-6 py-3 text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default NovaVaga
