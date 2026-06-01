import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { recuperarSenha } from '../../../services/auth'
import { extractApiError } from '../../../services/api'

function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErro('')
    setEmail(e.target.value)
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro('')
    setSucesso('')
    setCarregando(true)

    try {
      await recuperarSenha(email)
      setSucesso('Se o e-mail existir, enviamos um link de redefinição.')
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível enviar o link.'))
    } finally {
      setCarregando(false)
    }
  }

  return (
    <main className="auth-page bg-[radial-gradient(circle_at_top_right,_#003b8e1f,_transparent_34%),radial-gradient(circle_at_top_left,_#f7941d1e,_transparent_44%),linear-gradient(180deg,#f7f9ff_0%,#ffffff_52%,#eef3ff_100%)] p-0 text-slate-900 md:px-8 md:py-10">
      <section className="auth-shell">
        <div className="flex items-center px-6 py-10 md:px-14">
          <div className="w-full max-w-md">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
              Acesso do aluno UNP
            </p>
            <h1 className="mt-3 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
              Recuperar senha
            </h1>
            <p className="mt-3 font-body text-sm text-slate-600">
              Informe seu email institucional para receber um link de redefinicao de senha.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                placeholder="Email"
                required
                disabled={carregando}
                className="w-full border-b border-unp-blue/25 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue disabled:opacity-50"
              />

              {erro && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 font-body text-sm text-red-600">
                  {erro}
                </p>
              )}
              {sucesso && (
                <p className="rounded-lg bg-green-50 px-4 py-2.5 font-body text-sm text-green-700">
                  {sucesso}
                </p>
              )}

              <div className="flex flex-wrap gap-3 pt-4">
                <button
                  type="submit"
                  disabled={carregando}
                  className="rounded-full bg-unp-orange px-7 py-2.5 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {carregando ? 'Enviando…' : 'Enviar link'}
                </button>
                <Link
                  to="/login"
                  className="rounded-full border border-unp-blue/25 px-7 py-2.5 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                >
                  Voltar para login
                </Link>
              </div>
            </form>
          </div>
        </div>

        <aside className="flex flex-col justify-center bg-unp-blue px-8 py-12 text-center text-white md:px-12">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/80 opacity-0 animate-rise">
            ConectaTech UNP
          </p>
          <h2 className="mt-4 font-heading text-4xl font-bold opacity-0 animate-rise [animation-delay:120ms] md:text-5xl">
            Sem estresse
          </h2>
          <p className="mx-auto mt-3 max-w-xs font-body text-white/90 opacity-0 animate-rise [animation-delay:220ms]">
            A gente te ajuda a recuperar o acesso para continuar acompanhando as vagas.
          </p>
          <Link
            to="/registro"
            className="mx-auto mt-8 inline-flex rounded-full border border-white/60 px-8 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-white/15"
          >
            Criar conta nova
          </Link>
        </aside>
      </section>
    </main>
  )
}

export default RecuperarSenha
