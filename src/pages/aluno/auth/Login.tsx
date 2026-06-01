import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: 'pedro@email.com',
        senha: 'minhasenha123',
    })
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setErro('')
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErro('')
        setCarregando(true)

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    senha: formData.senha,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                // Usa mensagem da API se disponível, senão mensagem genérica
                setErro(data?.message || data?.erro || 'E-mail ou senha inválidos.')
                return
            }

            // Salva o token JWT no localStorage
            const token = data?.token ?? data?.access_token ?? data?.jwt
            if (!token) {
                setErro('Resposta inválida do servidor. Tente novamente.')
                return
            }
            localStorage.setItem('token', token)

            // Salva dados do usuário se a API os retornar
            if (data?.user ?? data?.usuario) {
                localStorage.setItem('user', JSON.stringify(data.user ?? data.usuario))
            }

            navigate('/vagas')
        } catch {
            setErro('Não foi possível conectar ao servidor. Verifique sua conexão.')
        } finally {
            setCarregando(false)
        }
    }

    return (
        <main className="auth-page bg-[radial-gradient(circle_at_top_right,_#f7941d21,_transparent_34%),radial-gradient(circle_at_top_left,_#003b8e1a,_transparent_46%),linear-gradient(180deg,#f7f9ff_0%,#ffffff_52%,#eef3ff_100%)] p-0 text-slate-900 md:px-8 md:py-10">
            <section className="auth-shell">
                <aside className="flex flex-col justify-center bg-unp-blue px-8 py-12 text-center text-white md:px-12">
                    <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-white/80 opacity-0 animate-rise">
                        ConectaTech UNP
                    </p>
                    <h1 className="mt-4 font-heading text-4xl font-bold opacity-0 animate-rise [animation-delay:120ms] md:text-5xl">
                        Bem-vindo de volta!
                    </h1>
                    <p className="mx-auto mt-3 max-w-xs font-body text-white/90 opacity-0 animate-rise [animation-delay:220ms]">
                        Entre para continuar acompanhando suas candidaturas e vagas favoritas.
                    </p>
                    <Link
                        to="/registro"
                        className="mx-auto mt-8 inline-flex rounded-full border border-white/60 px-8 py-2.5 font-body text-sm font-semibold text-white transition hover:bg-white/15"
                    >
                        Ir para registro
                    </Link>
                </aside>

                <div className="flex items-center px-6 py-10 md:px-14">
                    <div className="w-full max-w-md">
                        <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
                            Login do aluno UNP
                        </p>
                        <h2 className="mt-3 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
                            Entrar na plataforma
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

                            {/* Mensagem de erro */}
                            {erro && (
                                <p className="rounded-lg bg-red-50 px-4 py-2.5 font-body text-sm text-red-600">
                                    {erro}
                                </p>
                            )}

                            <div className="flex justify-end pt-1">
                                <Link
                                    to="/recuperar-senha"
                                    className="font-body text-sm font-semibold text-unp-blue transition hover:text-unp-blueDark"
                                >
                                    Esqueci minha senha
                                </Link>
                            </div>

                            <div className="flex flex-wrap gap-3 pt-5">
                                <button
                                    type="submit"
                                    disabled={carregando}
                                    className="rounded-full bg-unp-orange px-7 py-2.5 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {carregando ? 'Entrando…' : 'Entrar'}
                                </button>
                                <Link
                                    to="/empresa/login"
                                    className="rounded-full border border-unp-orange/35 px-7 py-2.5 font-body text-sm font-semibold text-unp-orange transition hover:bg-orange-50"
                                >
                                    Sou uma empresa
                                </Link>
                                <Link
                                    to="/"
                                    className="rounded-full border border-unp-blue/25 px-7 py-2.5 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                                >
                                    Voltar para início
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