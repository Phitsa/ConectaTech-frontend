import { Link } from 'react-router-dom'
import { Building2, Users2, Sparkles } from 'lucide-react'

function RegistroRedator() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0f172a24,_transparent_46%),radial-gradient(circle_at_bottom_right,_#003b8e24,_transparent_42%),linear-gradient(180deg,#f5f8ff_0%,#ffffff_52%,#edf3ff_100%)] p-0 text-slate-900 md:px-8 md:py-10">
      <section className="auth-shell">
        <div className="order-2 flex items-center px-6 py-10 md:order-1 md:px-14">
          <div className="w-full max-w-md">
            <div className="mb-4 flex justify-end">
              <Link
                to="/"
                className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 transition hover:text-unp-blue"
              >
                Voltar para landpage
              </Link>
            </div>
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-blue">
              Cadastro do redator
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-unp-orange md:text-4xl">
              Acesso restrito
            </h2>

            <div className="mt-8 space-y-4">
              <p className="font-body text-slate-600">
                As contas de redator sao criadas por um administrador da plataforma. Caso precise de
                acesso administrativo, entre em contato com a coordenacao do ConectaTech.
              </p>
              <p className="font-body text-slate-600">
                Ja possui credenciais? Faca login no painel administrativo.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/redator/login"
                  className="rounded-full bg-unp-blue px-7 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-unp-blueDark"
                >
                  Ir para login
                </Link>
                <Link
                  to="/registro"
                  className="rounded-full border border-unp-blue/25 px-7 py-2.5 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                >
                  Sou aluno
                </Link>
              </div>
            </div>
          </div>
        </div>

        <aside className="order-1 flex flex-col justify-center bg-slate-900 px-8 py-12 text-left text-white md:order-2 md:px-12">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 opacity-0 animate-rise">
            ConectaTech Empresas
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-white opacity-0 animate-rise [animation-delay:120ms] md:text-5xl">
            Escale contratacoes
          </h1>
          <p className="mt-3 max-w-xs font-body text-slate-200 opacity-0 animate-rise [animation-delay:220ms]">
            Cadastre sua empresa e transforme sua selecao de estagiarios em um processo mais rapido e assertivo.
          </p>

          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-body text-sm text-slate-200">
              <Building2 size={16} className="text-unp-orange" />
              Perfil empresarial validado
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-body text-sm text-slate-200">
              <Users2 size={16} className="text-unp-orange" />
              Banco de talentos universitarios
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-body text-sm text-slate-200">
              <Sparkles size={16} className="text-unp-orange" />
              Recomendacoes por curso e area
            </div>
          </div>

          <Link
            to="/redator/login"
            className="mt-8 inline-flex w-fit rounded-full border border-white px-8 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Ja tenho conta
          </Link>
        </aside>
      </section>
    </main>
  )
}

export default RegistroRedator
