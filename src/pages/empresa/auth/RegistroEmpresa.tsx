import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Users2, Sparkles } from 'lucide-react'
import { registrarEmpresa } from '../../../services/empresa'
import { extractApiError } from '../../../services/api'

function RegistroEmpresa() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ nome: '', cnpj: '', email: '', senha: '' })
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErro('')
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')
    setSucesso('')
    setCarregando(true)
    try {
      await registrarEmpresa(formData)
      setSucesso('Conta criada! Confirme seu e-mail e faça login.')
      setTimeout(() => navigate('/empresa/login'), 1500)
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível criar a conta.'))
    } finally {
      setCarregando(false)
    }
  }

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
              Cadastro da empresa
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-unp-orange md:text-4xl">
              Criar conta empresarial
            </h2>

            <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
              <input
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome da empresa"
                required
                disabled={carregando}
                className="w-full border-b border-unp-orange/35 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-orange disabled:opacity-50"
              />
              <input
                id="cnpj"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                placeholder="CNPJ"
                disabled={carregando}
                className="w-full border-b border-unp-orange/35 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-orange disabled:opacity-50"
              />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email corporativo"
                required
                disabled={carregando}
                className="w-full border-b border-unp-orange/35 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-orange disabled:opacity-50"
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
                className="w-full border-b border-unp-orange/35 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-orange disabled:opacity-50"
              />

              {erro && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 font-body text-sm text-red-600">{erro}</p>
              )}
              {sucesso && (
                <p className="rounded-lg bg-green-50 px-4 py-2.5 font-body text-sm text-green-700">{sucesso}</p>
              )}

              <div className="flex flex-wrap gap-3 pt-5">
                <button
                  type="submit"
                  disabled={carregando}
                  className="rounded-full bg-unp-blue px-7 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-unp-blueDark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {carregando ? 'Criando…' : 'Criar conta'}
                </button>
                <Link
                  to="/registro"
                  className="rounded-full border border-unp-blue/25 px-7 py-2.5 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                >
                  Sou aluno
                </Link>
              </div>
            </form>
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
            to="/empresa/login"
            className="mt-8 inline-flex w-fit rounded-full border border-white px-8 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Ja tenho conta
          </Link>
        </aside>
      </section>
    </main>
  )
}

export default RegistroEmpresa
