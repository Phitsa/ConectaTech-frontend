import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StudentLayout } from '../../components/StudentLayout'
import { useAuth } from '../../context/useAuth'
import {
  alterarSenha,
  atualizarPerfil,
  excluirConta,
  getPerfil,
  type PerfilAluno,
} from '../../services/perfil'
import { extractApiError } from '../../services/api'

function MeuPerfil() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [perfil, setPerfil] = useState<PerfilAluno | null>(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  const [form, setForm] = useState({ nome: '', curso: '', periodo: '' })
  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  const [senhas, setSenhas] = useState({ senhaAtual: '', novaSenha: '' })
  const [salvandoSenha, setSalvandoSenha] = useState(false)
  const [mensagemSenha, setMensagemSenha] = useState('')
  const [erroSenha, setErroSenha] = useState('')

  useEffect(() => {
    let ativo = true
    getPerfil()
      .then((dados) => {
        if (!ativo) return
        setPerfil(dados)
        setForm({ nome: dados.nome, curso: dados.curso ?? '', periodo: dados.periodo ?? '' })
      })
      .catch((error) => {
        if (ativo) setErro(extractApiError(error, 'Não foi possível carregar o perfil.'))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [])

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    setMensagem('')
    setErro('')
    try {
      const atualizado = await atualizarPerfil(form)
      setPerfil(atualizado)
      setMensagem('Perfil atualizado com sucesso.')
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível salvar o perfil.'))
    } finally {
      setSalvando(false)
    }
  }

  async function handleAlterarSenha(e: React.FormEvent) {
    e.preventDefault()
    setSalvandoSenha(true)
    setMensagemSenha('')
    setErroSenha('')
    try {
      await alterarSenha(senhas)
      setSenhas({ senhaAtual: '', novaSenha: '' })
      setMensagemSenha('Senha alterada com sucesso.')
    } catch (error) {
      setErroSenha(extractApiError(error, 'Não foi possível alterar a senha.'))
    } finally {
      setSalvandoSenha(false)
    }
  }

  async function handleExcluir() {
    if (!window.confirm('Tem certeza que deseja excluir sua conta? Esta acao e irreversivel.')) return
    try {
      await excluirConta()
      logout()
      navigate('/')
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível excluir a conta.'))
    }
  }

  return (
    <StudentLayout activeTab="perfil">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
            Area do aluno
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">Meu Perfil</h2>
        </div>

        {carregando ? (
          <div className="h-96 animate-pulse rounded-2xl border border-unp-blue/10 bg-white/70" />
        ) : !perfil ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center font-body text-red-700">
            {erro || 'Perfil indisponivel.'}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-2xl border border-unp-blue/10 bg-white p-8 shadow-soft">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-unp-orange/20">
                  <span className="font-heading text-2xl font-bold text-unp-orange">
                    {perfil.nome.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-unp-blue">{perfil.nome}</h3>
                  <p className="font-body text-slate-600">{perfil.email}</p>
                </div>
              </div>

              <form onSubmit={handleSalvar} className="space-y-4 border-t border-unp-blue/10 pt-6">
                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue">Nome</label>
                  <input
                    type="text"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    required
                    className="rounded-lg border border-unp-blue/20 bg-white px-4 py-2.5 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue">Curso</label>
                  <input
                    type="text"
                    value={form.curso}
                    onChange={(e) => setForm({ ...form, curso: e.target.value })}
                    className="rounded-lg border border-unp-blue/20 bg-white px-4 py-2.5 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue">Periodo</label>
                  <input
                    type="text"
                    value={form.periodo}
                    onChange={(e) => setForm({ ...form, periodo: e.target.value })}
                    className="rounded-lg border border-unp-blue/20 bg-white px-4 py-2.5 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                  />
                </div>

                {mensagem && <p className="font-body text-sm font-semibold text-green-700">{mensagem}</p>}
                {erro && <p className="font-body text-sm font-semibold text-red-600">{erro}</p>}

                <button
                  type="submit"
                  disabled={salvando}
                  className="rounded-xl bg-unp-orange px-6 py-2.5 font-body font-semibold text-slate-900 transition hover:brightness-95 disabled:opacity-60"
                >
                  {salvando ? 'Salvando…' : 'Salvar alteracoes'}
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-unp-blue/10 bg-white p-8 shadow-soft">
              <h3 className="font-heading text-xl font-bold text-unp-blue">Alterar senha</h3>
              <form onSubmit={handleAlterarSenha} className="mt-4 space-y-4">
                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue">Senha atual</label>
                  <input
                    type="password"
                    value={senhas.senhaAtual}
                    onChange={(e) => setSenhas({ ...senhas, senhaAtual: e.target.value })}
                    required
                    className="rounded-lg border border-unp-blue/20 bg-white px-4 py-2.5 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue">Nova senha</label>
                  <input
                    type="password"
                    value={senhas.novaSenha}
                    onChange={(e) => setSenhas({ ...senhas, novaSenha: e.target.value })}
                    required
                    className="rounded-lg border border-unp-blue/20 bg-white px-4 py-2.5 font-body text-slate-900 outline-none transition focus:border-unp-blue"
                  />
                </div>

                {mensagemSenha && (
                  <p className="font-body text-sm font-semibold text-green-700">{mensagemSenha}</p>
                )}
                {erroSenha && <p className="font-body text-sm font-semibold text-red-600">{erroSenha}</p>}

                <button
                  type="submit"
                  disabled={salvandoSenha}
                  className="rounded-xl bg-unp-blue px-6 py-2.5 font-body font-semibold text-white transition hover:bg-unp-blueDark disabled:opacity-60"
                >
                  {salvandoSenha ? 'Alterando…' : 'Alterar senha'}
                </button>
              </form>
            </div>

            <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-soft">
              <h3 className="font-heading text-xl font-bold text-red-600">Excluir conta</h3>
              <p className="mt-2 font-body text-sm text-slate-600">
                Esta acao remove permanentemente sua conta e suas candidaturas.
              </p>
              <button
                type="button"
                onClick={handleExcluir}
                className="mt-4 rounded-xl border border-red-300 px-6 py-2.5 font-body font-semibold text-red-600 transition hover:bg-red-50"
              >
                Excluir minha conta
              </button>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  )
}

export default MeuPerfil
