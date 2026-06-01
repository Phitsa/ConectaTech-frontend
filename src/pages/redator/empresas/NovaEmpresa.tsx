import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  atualizarEmpresaRedator,
  buscarEmpresaRedator,
  criarEmpresaRedator,
} from '../../../services/redator'
import { extractApiError } from '../../../services/api'

function NovaEmpresa() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const id = params.get('id')
  const edicao = Boolean(id)

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    cnpj: '',
    telefone: '',
    endereco: '',
    areaAtuacao: '',
    descricao: '',
  })
  const [carregando, setCarregando] = useState(edicao)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!id) return
    let ativo = true
    buscarEmpresaRedator(id)
      .then((empresa) => {
        if (!ativo) return
        setForm({
          nome: empresa.nome,
          email: empresa.email,
          senha: '',
          cnpj: empresa.cnpj ?? '',
          telefone: empresa.telefone ?? '',
          endereco: empresa.endereco ?? '',
          areaAtuacao: empresa.areaAtuacao ?? '',
          descricao: empresa.descricao ?? '',
        })
      })
      .catch((error) => {
        if (ativo) setErro(extractApiError(error, 'Não foi possível carregar a empresa.'))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [id])

  function handleChange(campo: keyof typeof form, valor: string) {
    setErro('')
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    setErro('')
    try {
      if (edicao && id) {
        await atualizarEmpresaRedator(Number(id), {
          id: Number(id),
          nome: form.nome,
          email: form.email,
          cnpj: form.cnpj,
          telefone: form.telefone,
          endereco: form.endereco,
          areaAtuacao: form.areaAtuacao,
          descricao: form.descricao,
        })
      } else {
        await criarEmpresaRedator(form)
      }
      navigate('/redator/empresas')
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível salvar a empresa.'))
    } finally {
      setSalvando(false)
    }
  }

  const inputClass =
    'mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-unp-blue'

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Redator</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                {edicao ? 'Editar empresa' : 'Adicionar empresa'}
              </h1>
              <p className="mt-2 text-sm text-slate-600">Preencha os dados da empresa parceira.</p>
            </div>
            <Link
              to="/redator/empresas"
              className="inline-flex rounded-full border border-unp-blue/20 bg-unp-ice px-4 py-2 text-sm font-semibold text-unp-blue transition hover:bg-unp-blue/5"
            >
              Voltar às empresas
            </Link>
          </div>
        </div>

        {carregando ? (
          <div className="h-[28rem] animate-pulse rounded-3xl bg-white shadow-sm" />
        ) : (
          <form className="space-y-6 rounded-3xl bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Nome da empresa</span>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Ex: TechNordeste Solucoes"
                  required
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="contato@empresa.com"
                  required
                  className={inputClass}
                />
              </label>
            </div>

            {!edicao && (
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Senha de acesso</span>
                <input
                  type="password"
                  value={form.senha}
                  onChange={(e) => handleChange('senha', e.target.value)}
                  placeholder="Senha inicial da empresa"
                  required
                  className={inputClass}
                />
              </label>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">CNPJ</span>
                <input
                  type="text"
                  value={form.cnpj}
                  onChange={(e) => handleChange('cnpj', e.target.value)}
                  placeholder="00.000.000/0000-00"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Telefone</span>
                <input
                  type="text"
                  value={form.telefone}
                  onChange={(e) => handleChange('telefone', e.target.value)}
                  placeholder="(84) 99999-9999"
                  className={inputClass}
                />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Endereço</span>
                <input
                  type="text"
                  value={form.endereco}
                  onChange={(e) => handleChange('endereco', e.target.value)}
                  placeholder="Ex: Mossoró - RN"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Area de atuacao</span>
                <input
                  type="text"
                  value={form.areaAtuacao}
                  onChange={(e) => handleChange('areaAtuacao', e.target.value)}
                  placeholder="Ex: Tecnologia, Comunicação"
                  className={inputClass}
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Descrição</span>
              <textarea
                rows={4}
                value={form.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                placeholder="Breve descrição sobre a empresa"
                className={inputClass}
              />
            </label>

            {erro && (
              <p className="rounded-xl border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">{erro}</p>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={salvando}
                className="rounded-full bg-unp-orange px-6 py-3 text-sm font-semibold text-slate-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {salvando ? 'Salvando…' : 'Salvar empresa'}
              </button>
              <Link
                to="/redator/empresas"
                className="rounded-full border border-unp-blue/25 px-6 py-3 text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
              >
                Cancelar
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  )
}

export default NovaEmpresa
