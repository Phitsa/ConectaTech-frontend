import { beforeEach, describe, expect, it, vi } from 'vitest'
import { login, loginEmpresa, recuperarSenha, registrarUsuario } from './auth'
import { api } from './api'

vi.mock('./api', () => ({
  api: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
}))

const mockedApi = vi.mocked(api)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('auth service', () => {
  it('login mapeia a resposta para token e usuario', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { token: 'jwt', nome: 'Ana', email: 'ana@email.com', role: 'STUDENT' },
    })

    const resultado = await login({ email: 'ana@email.com', senha: '123' })

    expect(mockedApi.post).toHaveBeenCalledWith('/api/auth/login', {
      email: 'ana@email.com',
      senha: '123',
    })
    expect(resultado).toEqual({
      token: 'jwt',
      user: { nome: 'Ana', email: 'ana@email.com', role: 'STUDENT' },
    })
  })

  it('loginEmpresa forca role EMPRESA e inclui cnpj', async () => {
    mockedApi.post.mockResolvedValueOnce({
      data: { token: 'jwt', nome: 'TechCo', email: 'tech@co.com', cnpj: '00.000' },
    })

    const resultado = await loginEmpresa({ email: 'tech@co.com', senha: '123' })

    expect(mockedApi.post).toHaveBeenCalledWith('/api/empresa/auth/login', {
      email: 'tech@co.com',
      senha: '123',
    })
    expect(resultado.user).toEqual({
      nome: 'TechCo',
      email: 'tech@co.com',
      role: 'EMPRESA',
      cnpj: '00.000',
    })
  })

  it('registrarUsuario envia os dados para o endpoint de registro', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: { ok: true } })
    await registrarUsuario({
      nome: 'Ana',
      email: 'ana@email.com',
      senha: '123',
      curso: 'CC',
      periodo: '6',
    })
    expect(mockedApi.post).toHaveBeenCalledWith('/api/auth/register', expect.objectContaining({ nome: 'Ana' }))
  })

  it('recuperarSenha envia o email para forgot-password', async () => {
    mockedApi.post.mockResolvedValueOnce({ data: {} })
    await recuperarSenha('ana@email.com')
    expect(mockedApi.post).toHaveBeenCalledWith('/api/auth/forgot-password', { email: 'ana@email.com' })
  })
})
