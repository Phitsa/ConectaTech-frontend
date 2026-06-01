import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  atualizarVagaRedator,
  criarEmpresaRedator,
  criarVagaRedator,
  excluirEmpresaRedator,
  excluirVagaRedator,
  listarEmpresasRedator,
  listarVagasRedator,
} from './redator'
import { api } from './api'

vi.mock('./api', () => ({
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}))

const mockedApi = vi.mocked(api)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('redator service', () => {
  it('listarVagasRedator usa a rota administrativa de vagas', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] })
    await listarVagasRedator()
    expect(mockedApi.get).toHaveBeenCalledWith('/api/redator/jobs')
  })

  it('criarVagaRedator publica via rota administrativa', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: {} })
    await criarVagaRedator({ titulo: 'Dev', empresa: 'TechCo' })
    expect(mockedApi.post).toHaveBeenCalledWith('/api/redator/jobs', { titulo: 'Dev', empresa: 'TechCo' })
  })

  it('atualizarVagaRedator edita pela rota com id', async () => {
    mockedApi.put.mockResolvedValueOnce({ data: {} })
    await atualizarVagaRedator(3, { titulo: 'Dev', empresa: 'TechCo' })
    expect(mockedApi.put).toHaveBeenCalledWith('/api/redator/jobs/3', { titulo: 'Dev', empresa: 'TechCo' })
  })

  it('excluirVagaRedator remove pela rota com id', async () => {
    mockedApi.delete.mockResolvedValueOnce({ data: {} })
    await excluirVagaRedator(3)
    expect(mockedApi.delete).toHaveBeenCalledWith('/api/redator/jobs/3')
  })

  it('listarEmpresasRedator usa a rota administrativa de empresas', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] })
    await listarEmpresasRedator()
    expect(mockedApi.get).toHaveBeenCalledWith('/api/redator/empresas')
  })

  it('criarEmpresaRedator cadastra uma empresa', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: {} })
    await criarEmpresaRedator({ nome: 'TechCo', email: 't@co.com', senha: '123' })
    expect(mockedApi.post).toHaveBeenCalledWith('/api/redator/empresas', expect.any(Object))
  })

  it('excluirEmpresaRedator remove pela rota com id', async () => {
    mockedApi.delete.mockResolvedValueOnce({ data: {} })
    await excluirEmpresaRedator(8)
    expect(mockedApi.delete).toHaveBeenCalledWith('/api/redator/empresas/8')
  })
})
