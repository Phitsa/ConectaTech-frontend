import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  buscarVaga,
  candidatar,
  listarVagas,
  minhasSelecoes,
  removerSelecao,
  selecionarVaga,
} from './vagas'
import { api } from './api'

vi.mock('./api', () => ({
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}))

const mockedApi = vi.mocked(api)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('vagas service', () => {
  it('listarVagas repassa os filtros como params', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] })
    await listarVagas({ busca: 'react' })
    expect(mockedApi.get).toHaveBeenCalledWith('/api/jobs', { params: { busca: 'react' } })
  })

  it('buscarVaga consulta a vaga por id', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: { id: 1 } })
    await buscarVaga(1)
    expect(mockedApi.get).toHaveBeenCalledWith('/api/jobs/1')
  })

  it('selecionarVaga envia o vagaId no corpo', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: {} })
    await selecionarVaga(7)
    expect(mockedApi.post).toHaveBeenCalledWith('/api/jobs/select', { vagaId: 7 })
  })

  it('minhasSelecoes busca as vagas selecionadas', async () => {
    mockedApi.get.mockResolvedValueOnce({ data: [] })
    await minhasSelecoes()
    expect(mockedApi.get).toHaveBeenCalledWith('/api/jobs/my-selections')
  })

  it('removerSelecao remove pela rota correta', async () => {
    mockedApi.delete.mockResolvedValueOnce({ data: {} })
    await removerSelecao(7)
    expect(mockedApi.delete).toHaveBeenCalledWith('/api/jobs/my-selections/7')
  })

  it('candidatar demonstra interesse e seleciona a vaga', async () => {
    mockedApi.post.mockResolvedValue({ data: {} })
    await candidatar(9)
    expect(mockedApi.post).toHaveBeenNthCalledWith(1, '/api/jobs/9/interesse')
    expect(mockedApi.post).toHaveBeenNthCalledWith(2, '/api/jobs/select', { vagaId: 9 })
  })
})
