import { Link } from 'react-router-dom'
import { registrarUsuario } from '../../../services/auth'
import { useState } from 'react'

function Registro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    curso: '',
    periodo: ''
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    try {
      const response = await registrarUsuario(formData)

      console.log(response)

      alert("Usuário criado com sucesso!")

    } catch (error: any) {
      console.error(error)

      console.log(error.response)

      alert(JSON.stringify(error.response?.data))
    }
  }
  return (
    <main className="auth-page bg-[radial-gradient(circle_at_top_right,_#f7941d2b,_transparent_34%),radial-gradient(circle_at_top_left,_#003b8e16,_transparent_46%),linear-gradient(180deg,#fff9f0_0%,#ffffff_52%,#fff3df_100%)] p-0 text-slate-900 md:px-8 md:py-10">
      <section className="auth-shell">
        <div className="order-2 flex items-center px-6 py-10 md:order-1 md:px-14">
          <div className="w-full max-w-md">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-blue">
              Registro do aluno UNP
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-unp-orange md:text-4xl">
              Criar conta
            </h2>

            <form className="mt-8 space-y-3" onSubmit={handleSubmit}  >
              <input
                id="nome"
                name="nome"
                value={formData.nome}
                placeholder="Nome"
                onChange={handleChange}
                className="w-full border-b border-unp-orange/35 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-orange"
              />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                placeholder="Email"
                onChange={handleChange}
                className="w-full border-b border-unp-orange/35 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-orange"
              />
              <input
                id="senha"
                name="senha"
                type="password"
                value={formData.senha}
                placeholder="Senha"
                onChange={handleChange}
                className="w-full border-b border-unp-orange/35 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-orange"
              />
              <input
                id="curso"
                name="curso"
                value={formData.curso}
                placeholder="Curso"
                onChange={handleChange}
                className="w-full border-b border-unp-orange/35 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-orange"
              />
              <input
                id="periodo"
                name="periodo"
                value={formData.periodo}
                placeholder="Periodo"
                onChange={handleChange} 
                className="w-full border-b border-unp-orange/35 bg-transparent px-1 py-3 font-body text-slate-900 outline-none transition focus:border-unp-orange"
              />

              <div className="flex flex-wrap gap-3 pt-5">
                <button
                  type="submit"
                  className="rounded-full bg-unp-blue px-7 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-unp-blueDark"
                >
                  Criar conta
                </button>
                <Link
                  to="/empresa/registro"
                  className="rounded-full border border-unp-blue/25 px-7 py-2.5 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                >
                  Sou uma empresa
                </Link>
                <Link
                  to="/"
                  className="rounded-full border border-unp-orange/35 px-7 py-2.5 font-body text-sm font-semibold text-unp-orange transition hover:bg-orange-50"
                >
                  Voltar para inicio
                </Link>
              </div>
            </form>
          </div>
        </div>

        <aside className="order-1 flex flex-col justify-center bg-unp-orange px-8 py-12 text-center text-slate-900 md:order-2 md:px-12">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white opacity-0 animate-rise">
            ConectaTech UNP
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold text-white opacity-0 animate-rise [animation-delay:120ms] md:text-5xl">Junte-se a nos</h1>
          <p className="mx-auto mt-3 max-w-xs font-body text-white opacity-0 animate-rise [animation-delay:220ms]">
            Crie seu perfil para receber vagas de estagio personalizadas por curso e periodo.
          </p>
          <Link
            to="/login"
            className="mx-auto mt-8 inline-flex rounded-full border border-white px-8 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-white/20"
          >
            Ja tenho conta
          </Link>
        </aside>
      </section>
    </main>
  )
}

export default Registro

