import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  atualizarVagaEmpresa,
  criarVagaEmpresa,
  excluirVagaEmpresa,
  listarInteressados,
  listarVagasEmpresa,
  registrarEmpresa,
} from './empresa'
import { api } from './api'

vi.mock('./api', () => ({
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}))

const mockedApi = vi.mocked(api)
const vaga = { titulo: 'Dev', empresa: 'TechCo' }

beforeEach(() => {
  vi.clearAllMocks()
})

describe('empresa service', () => {
  it('registrarEmpresa usa o endpoint de cadastro', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: {} })
    await registrarEmpresa({ nome: 'TechCo', email: 't@co.com', senha: '123' })
    expect(mockedApi.post).toHaveBeenCalledWith('/api/empresa/auth/register', expect.any(Object))
  })

  it('listarVagasEmpresa busca as vagas da empresa logada', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] })
    await listarVagasEmpresa()
    expect(mockedApi.get).toHaveBeenCalledWith('/api/empresa/jobs')
  })

  it('criarVagaEmpresa publica uma nova vaga', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: {} })
    await criarVagaEmpresa(vaga)
    expect(mockedApi.post).toHaveBeenCalledWith('/api/empresa/jobs', vaga)
  })

  it('atualizarVagaEmpresa edita pela rota com id', async () => {
    mockedApi.put.mockResolvedValueOnce({ data: {} })
    await atualizarVagaEmpresa(5, vaga)
    expect(mockedApi.put).toHaveBeenCalledWith('/api/empresa/jobs/5', vaga)
  })

  it('excluirVagaEmpresa remove pela rota com id', async () => {
    mockedApi.delete.mockResolvedValueOnce({ data: {} })
    await excluirVagaEmpresa(5)
    expect(mockedApi.delete).toHaveBeenCalledWith('/api/empresa/jobs/5')
  })

  it('listarInteressados busca os candidatos de uma vaga', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] })
    await listarInteressados(5)
    expect(mockedApi.get).toHaveBeenCalledWith('/api/empresa/jobs/5/interessados')
  })
})
