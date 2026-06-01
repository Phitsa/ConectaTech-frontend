import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { atualizarVagaRedator, criarVagaRedator } from '../../../services/redator'
import { buscarVaga, type VagaInput } from '../../../services/vagas'
import { extractApiError } from '../../../services/api'

function NovaVaga() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const id = params.get('id')
  const edicao = Boolean(id)

  const [form, setForm] = useState<VagaInput>({
    titulo: '',
    empresa: '',
    localizacao: '',
    url: '',
    descricao: '',
  })
  const [carregando, setCarregando] = useState(edicao)
  const [salvando, setSalvando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (!id) return
    let ativo = true
    buscarVaga(id)
      .then((vaga) => {
        if (!ativo) return
        setForm({
          titulo: vaga.titulo,
          empresa: vaga.empresa,
          localizacao: vaga.localizacao ?? '',
          url: vaga.url ?? '',
          descricao: vaga.descricao ?? '',
        })
      })
      .catch((error) => {
        if (ativo) setErro(extractApiError(error, 'Não foi possível carregar a vaga.'))
      })
      .finally(() => {
        if (ativo) setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [id])

  function handleChange(campo: keyof VagaInput, valor: string) {
    setErro('')
    setForm((atual) => ({ ...atual, [campo]: valor }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    setErro('')
    try {
      if (edicao && id) {
        await atualizarVagaRedator(Number(id), form)
      } else {
        await criarVagaRedator(form)
      }
      navigate('/redator/vagas')
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível salvar a vaga.'))
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
                {edicao ? 'Editar vaga' : 'Adicionar vaga'}
              </h1>
              <p className="mt-2 text-sm text-slate-600">Preencha as informacoes da vaga.</p>
            </div>
            <Link
              to="/redator/vagas"
              className="inline-flex rounded-full border border-unp-blue/20 bg-unp-ice px-4 py-2 text-sm font-semibold text-unp-blue transition hover:bg-unp-blue/5"
            >
              Voltar às vagas
            </Link>
          </div>
        </div>

        {carregando ? (
          <div className="h-96 animate-pulse rounded-3xl bg-white shadow-sm" />
        ) : (
          <form className="space-y-6 rounded-3xl bg-white p-6 shadow-sm" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Título da vaga</span>
                <input
                  type="text"
                  value={form.titulo}
                  onChange={(e) => handleChange('titulo', e.target.value)}
                  placeholder="Ex: Estágio em Front-end"
                  required
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Empresa</span>
                <input
                  type="text"
                  value={form.empresa}
                  onChange={(e) => handleChange('empresa', e.target.value)}
                  placeholder="Nome da empresa"
                  required
                  className={inputClass}
                />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Localização</span>
                <input
                  type="text"
                  value={form.localizacao}
                  onChange={(e) => handleChange('localizacao', e.target.value)}
                  placeholder="Ex: Mossoró - RN"
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-900">Link da vaga (opcional)</span>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => handleChange('url', e.target.value)}
                  placeholder="https://..."
                  className={inputClass}
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-slate-900">Descrição</span>
              <textarea
                rows={5}
                value={form.descricao}
                onChange={(e) => handleChange('descricao', e.target.value)}
                placeholder="Descrição da vaga"
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
                {salvando ? 'Salvando…' : 'Salvar vaga'}
              </button>
              <Link
                to="/redator/vagas"
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

export default NovaVaga
