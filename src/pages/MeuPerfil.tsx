import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { FileText, Upload, X } from 'lucide-react'
import { StudentLayout } from '../components/StudentLayout'

function MeuPerfil() {
  const [curriculoNome, setCurriculoNome] = useState<string | null>(null)

  const aluno = {
    nome: 'Joao Silva',
    email: 'joao.silva@email.com',
    curso: 'Ciencia da Computacao',
    periodo: '6',
    telefone: '(84) 99999-9999',
    bio: 'Estudante apaixonado por desenvolvimento web e tecnologia.',
  }

  const handleCurriculoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const arquivo = event.target.files?.[0]

    if (!arquivo) {
      return
    }

    const extensoesPermitidas = ['pdf', 'doc', 'docx']
    const extensao = arquivo.name.split('.').pop()?.toLowerCase()

    if (!extensao || !extensoesPermitidas.includes(extensao)) {
      alert('Formato invalido. Envie PDF, DOC ou DOCX.')
      event.target.value = ''
      return
    }

    setCurriculoNome(arquivo.name)
  }

  const removerCurriculo = () => {
    setCurriculoNome(null)
  }

  return (
    <StudentLayout activeTab="perfil">
      <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-unp-orange">
                Area do aluno
              </p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-unp-blue md:text-4xl">
                Meu Perfil
              </h2>
            </div>

            <div className="rounded-2xl border border-unp-blue/10 bg-white p-8 shadow-soft">
              <div className="mb-6 flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-unp-orange/20 flex items-center justify-center">
                  <span className="font-heading text-2xl font-bold text-unp-orange">
                    {aluno.nome.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-unp-blue">
                    {aluno.nome}
                  </h3>
                  <p className="font-body text-slate-600">{aluno.email}</p>
                </div>
              </div>

              <div className="space-y-4 border-t border-unp-blue/10 pt-6">
                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue">
                    Curso
                  </label>
                  <input
                    type="text"
                    value={aluno.curso}
                    readOnly
                    className="rounded-lg border border-unp-blue/20 bg-unp-ice px-4 py-2.5 font-body text-slate-900"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue">
                    Periodo
                  </label>
                  <input
                    type="text"
                    value={aluno.periodo}
                    readOnly
                    className="rounded-lg border border-unp-blue/20 bg-unp-ice px-4 py-2.5 font-body text-slate-900"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue">
                    Telefone
                  </label>
                  <input
                    type="text"
                    value={aluno.telefone}
                    readOnly
                    className="rounded-lg border border-unp-blue/20 bg-unp-ice px-4 py-2.5 font-body text-slate-900"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="font-body text-sm font-semibold text-unp-blue">
                    Bio
                  </label>
                  <textarea
                    value={aluno.bio}
                    readOnly
                    className="rounded-lg border border-unp-blue/20 bg-unp-ice px-4 py-2.5 font-body text-slate-900"
                    rows={3}
                  />
                </div>

                <div className="grid gap-3">
                  <label className="font-body text-sm font-semibold text-unp-blue">
                    Curriculo
                  </label>

                  <div className="rounded-lg border border-unp-blue/20 bg-unp-ice/60 p-4">
                    <input
                      id="curriculo"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleCurriculoUpload}
                    />

                    <div className="flex flex-wrap items-center gap-3">
                      <label
                        htmlFor="curriculo"
                        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-unp-blue px-4 py-2 font-body text-sm font-semibold text-white transition hover:bg-unp-blueDark"
                      >
                        <Upload size={16} />
                        {curriculoNome ? 'Substituir curriculo' : 'Enviar curriculo'}
                      </label>

                      {curriculoNome ? (
                        <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 font-body text-sm text-slate-700">
                          <FileText size={16} className="text-unp-blue" />
                          <span className="max-w-[220px] truncate">{curriculoNome}</span>
                          <button
                            type="button"
                            onClick={removerCurriculo}
                            className="rounded p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                            aria-label="Remover curriculo"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <p className="font-body text-sm text-slate-600">
                          Nenhum arquivo enviado (PDF, DOC ou DOCX)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button className="rounded-xl bg-unp-orange px-6 py-2.5 font-body font-semibold text-slate-900 transition hover:brightness-95">
                  Editar Perfil
                </button>
                <button className="rounded-xl border border-unp-blue/25 px-6 py-2.5 font-body font-semibold text-unp-blue transition hover:bg-unp-ice">
                  Cancelar
                </button>
              </div>
            </div>
        </div>
      </StudentLayout>
  )
}

export default MeuPerfil
