import { Link } from 'react-router-dom'

function Clientes() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eef3ff_0%,#ffffff_45%,#fff6e9_100%)] px-6 py-12 text-slate-900 md:px-10">
      <section className="mx-auto max-w-4xl rounded-3xl border border-unp-blue/10 bg-white/90 p-10 shadow-soft backdrop-blur md:p-12">
        <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
          Area de clientes
        </p>
        <h1 className="mt-3 font-heading text-4xl font-bold text-unp-blue md:text-5xl">
          Portal para empresas parceiras
        </h1>
        <p className="mt-4 max-w-2xl font-body text-lg text-slate-700">
          Cadastre sua empresa, publique vagas de estagio e encontre estudantes
          alinhados com o perfil da sua equipe.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="rounded-xl bg-unp-blue px-6 py-3 font-body font-semibold text-white transition hover:bg-unp-blueDark">
            Cadastrar empresa
          </button>
          <Link
            to="/"
            className="rounded-xl border border-unp-blue/25 bg-white px-6 py-3 font-body font-semibold text-unp-blue transition hover:bg-unp-blue/5"
          >
            Voltar para inicio
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Clientes
