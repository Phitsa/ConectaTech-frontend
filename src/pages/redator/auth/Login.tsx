import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck, Users, BriefcaseBusiness } from 'lucide-react'
import { useAuth } from '../../../context/useAuth'
import { extractApiError } from '../../../services/api'

function Login() {
  const navigate = useNavigate()
  const { login, logout } = useAuth()
  const [formData, setFormData] = useState({ email: '', senha: '' })
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErro('')
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      const usuario = await login(formData)
      if (usuario.role !== 'REDATOR' && usuario.role !== 'ADMIN') {
        logout()
        setErro('Esta conta nao tem acesso administrativo.')
        return
      }
      navigate('/redator/vagas')
    } catch (error) {
      setErro(extractApiError(error, 'E-mail ou senha inválidos.'))
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0f172a24,_transparent_46%),radial-gradient(circle_at_bottom_right,_#003b8e24,_transparent_42%),linear-gradient(180deg,#f5f8ff_0%,#ffffff_52%,#edf3ff_100%)] p-0 text-slate-900 md:px-8 md:py-10">
      <section className="auth-shell">
        <aside className="flex flex-col justify-center bg-slate-900 px-8 py-12 text-left text-white md:px-12">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-slate-300 opacity-0 animate-rise">
            ConectaTech Redator
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold opacity-0 animate-rise [animation-delay:120ms] md:text-5xl">
            Painel do administrador
          </h1>
          <p className="mt-3 max-w-xs font-body text-slate-200 opacity-0 animate-rise [animation-delay:220ms]">
            Cadastre e gerencie vagas com acesso administrativo.
          </p>
          <div className="mt-7 space-y-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-body text-sm text-slate-200">
              <ShieldCheck size={16} className="text-unp-orange" />
              Acesso administrativo seguro
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-body text-sm text-slate-200">
              <Users size={16} className="text-unp-orange" />
              Gerenciamento de vagas e candidatos
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 font-body text-sm text-slate-200">
              <BriefcaseBusiness size={16} className="text-unp-orange" />
              Publicação rápida de novas oportunidades
            </div>
          </div>
          <Link
            to="/redator/registro"
            className="mt-8 inline-flex w-fit rounded-full border border-white/40 px-8 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Registro do redator
          </Link>
        </aside>

        <div className="flex items-center px-6 py-10 md:px-14">
          <div className="w-full max-w-md">
            <div className="mb-4 flex justify-end">
              <Link
                to="/"
                className="font-body text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 transition hover:text-unp-blue"
              >
                Voltar para landpage
              </Link>
            </div>
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
              Login do redator
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
              Acessar painel administrativo
            </h2>

            <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                disabled={carregando}
                className="w-full border-b border-unp-blue/25 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue disabled:opacity-50"
              />
              <input
                id="senha"
                name="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                placeholder="Senha"
                required
                disabled={carregando}
                className="w-full border-b border-unp-blue/25 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue disabled:opacity-50"
              />

              {erro && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 font-body text-sm text-red-600">{erro}</p>
              )}

              <div className="flex flex-wrap gap-3 pt-5">
                <button
                  type="submit"
                  disabled={carregando}
                  className="rounded-full bg-unp-orange px-7 py-2.5 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {carregando ? 'Entrando…' : 'Entrar'}
                </button>
                <Link
                  to="/login"
                  className="rounded-full border border-unp-blue/25 px-7 py-2.5 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                >
                  Sou aluno
                </Link>
                
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login
