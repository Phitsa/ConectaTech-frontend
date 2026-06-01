import { api } from './api'

export interface PerfilAluno {
  id: number
  nome: string
  email: string
  curso?: string
  periodo?: string
  role: string
  emailVerificado?: boolean
  criadoEm?: string
}

export interface AtualizarPerfilInput {
  nome: string
  curso?: string
  periodo?: string
}

export interface AlterarSenhaInput {
  senhaAtual: string
  novaSenha: string
}

export async function getPerfil() {
  const response = await api.get<PerfilAluno>('/api/profile')
  return response.data
}

export async function atualizarPerfil(data: AtualizarPerfilInput) {
  const response = await api.put<PerfilAluno>('/api/profile', data)
  return response.data
}

export async function alterarSenha(data: AlterarSenhaInput) {
  const response = await api.put('/api/profile/change-password', data)
  return response.data
}

export async function excluirConta() {
  const response = await api.delete('/api/profile')
  return response.data
}
