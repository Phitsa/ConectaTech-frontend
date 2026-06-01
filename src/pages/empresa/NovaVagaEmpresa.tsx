import { useEffect, useState } from 'react'
import { ArrowLeft, PlusCircle } from 'lucide-react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CompanyLayout } from '../../components/CompanyLayout'
import { useAuth } from '../../context/useAuth'
import { atualizarVagaEmpresa, criarVagaEmpresa } from '../../services/empresa'
import { buscarVaga, type VagaInput } from '../../services/vagas'
import { extractApiError } from '../../services/api'

function NovaVagaEmpresa() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [params] = useSearchParams()
  const id = params.get('id')
  const edicao = Boolean(id)

  const [form, setForm] = useState<VagaInput>({
    titulo: '',
    empresa: user?.nome ?? '',
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
        await atualizarVagaEmpresa(Number(id), form)
      } else {
        await criarVagaEmpresa(form)
      }
      navigate('/empresa/vagas')
    } catch (error) {
      setErro(extractApiError(error, 'Não foi possível salvar a vaga.'))
    } finally {
      setSalvando(false)
    }
  }

  const inputClass =
    'rounded-xl border border-unp-blue/20 bg-unp-ice px-4 py-3 font-body text-slate-900 outline-none transition focus:border-unp-blue'

  return (
    <CompanyLayout activeTab="vagas">
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          to="/empresa/vagas"
          className="inline-flex items-center gap-2 rounded-lg border border-unp-blue/20 bg-white px-4 py-2 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
        >
          <ArrowLeft size={16} />
          Voltar para vagas
        </Link>

        <section className="rounded-3xl border border-unp-blue/10 bg-white p-6 shadow-soft md:p-8">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">Vagas</p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
            {edicao ? 'Editar vaga' : 'Adicionar nova vaga'}
          </h2>
          <p className="mt-3 max-w-2xl font-body text-slate-600">
            Preencha as informacoes da oportunidade.
          </p>

          {carregando ? (
            <div className="mt-8 h-80 animate-pulse rounded-2xl bg-slate-100" />
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="titulo">
                    Titulo da vaga
                  </label>
                  <input
                    id="titulo"
                    type="text"
                    value={form.titulo}
                    onChange={(e) => handleChange('titulo', e.target.value)}
                    placeholder="Ex: Estagio em Desenvolvimento Web"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="empresa">
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    type="text"
                    value={form.empresa}
                    onChange={(e) => handleChange('empresa', e.target.value)}
                    placeholder="Nome da empresa"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="local">
                    Localidade
                  </label>
                  <input
                    id="local"
                    type="text"
                    value={form.localizacao}
                    onChange={(e) => handleChange('localizacao', e.target.value)}
                    placeholder="Ex: Mossoro - RN"
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="url">
                    Link da vaga (opcional)
                  </label>
                  <input
                    id="url"
                    type="url"
                    value={form.url}
                    onChange={(e) => handleChange('url', e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <label className="font-body text-sm font-semibold text-unp-blue" htmlFor="descricao">
                  Descricao da vaga
                </label>
                <textarea
                  id="descricao"
                  rows={5}
                  value={form.descricao}
                  onChange={(e) => handleChange('descricao', e.target.value)}
                  placeholder="Descreva a oportunidade, atividades e o que a empresa espera do candidato"
                  className={inputClass}
                />
              </div>

              {erro && (
                <p className="rounded-xl border border-red-200 bg-red-50 p-4 font-body text-sm text-red-700">
                  {erro}
                </p>
              )}

              <div className="flex flex-wrap gap-3 border-t border-unp-blue/10 pt-6">
                <button
                  type="submit"
                  disabled={salvando}
                  className="inline-flex items-center gap-2 rounded-xl bg-unp-orange px-6 py-3 font-body text-sm font-semibold text-slate-900 transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <PlusCircle size={16} />
                  {salvando ? 'Salvando…' : 'Salvar vaga'}
                </button>
                <Link
                  to="/empresa/vagas"
                  className="rounded-xl border border-unp-blue/20 bg-white px-6 py-3 font-body text-sm font-semibold text-unp-blue transition hover:bg-unp-ice"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          )}
        </section>
      </div>
    </CompanyLayout>
  )
}

export default NovaVagaEmpresa
