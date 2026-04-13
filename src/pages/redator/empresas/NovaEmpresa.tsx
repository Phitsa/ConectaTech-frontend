import { Link } from 'react-router-dom'

function NovaEmpresa() {
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Redator</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">Adicionar empresa</h1>
              <p className="mt-2 text-sm text-slate-600">Preencha os dados para cadastrar uma nova empresa parceira.</p>
            </div>
            <Link
              to="/redator/empresas"
              className="inline-flex rounded-full border border-unp-blue/20 bg-unp-ice px-4 py-2 text-sm font-semibold text-unp-blue transition hover:bg-unp-blue/5"
            >
              Voltar às empresas
            </Link>
          </div>
        </div>

        <form className="space-y-6 rounded-3xl bg-white p-6 shadow-sm">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Nome da empresa</span>
              <input
                type="text"
                placeholder="Ex: TechNordeste Solucoes"
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
              placeholder="Breve descrição sobre a empresa"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
            />
          </label>

          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Setor</span>
              <input
                type="text"
                placeholder="Ex: Tecnologia, Comunicação"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Status</span>
              <input
                type="text"
                placeholder="Ex: Ativa, Em revisão"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue"
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-full bg-unp-orange px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95"
            >
              Salvar empresa
            </button>
            <Link
              to="/redator/empresas"
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

export default NovaEmpresa
