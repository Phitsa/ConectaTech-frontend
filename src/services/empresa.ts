import { api } from './api'
import type { Vaga, VagaInput } from './vagas'

export interface Empresa {
  id: number
  nome: string
  email: string
  cnpj?: string
  telefone?: string
  endereco?: string
  descricao?: string
  areaAtuacao?: string
  emailVerificado?: boolean
  criadoEm?: string
}

export interface EmpresaRegistroInput {
  nome: string
  email: string
  senha: string
  cnpj?: string
  telefone?: string
  endereco?: string
  descricao?: string
  areaAtuacao?: string
}

export interface Interessado {
  vagaId: number
  alunoNome: string
  alunoEmail: string
  alunoCurso?: string
  dataInteresse?: string
}

export async function registrarEmpresa(data: EmpresaRegistroInput) {
  const response = await api.post('/api/empresa/auth/register', data)
  return response.data
}

export async function listarVagasEmpresa() {
  const response = await api.get<Vaga[]>('/api/empresa/jobs')
  return response.data
}

export async function criarVagaEmpresa(data: VagaInput) {
  const response = await api.post<Vaga>('/api/empresa/jobs', data)
  return response.data
}

export async function atualizarVagaEmpresa(id: number, data: VagaInput) {
  const response = await api.put<Vaga>(`/api/empresa/jobs/${id}`, data)
  return response.data
}

export async function excluirVagaEmpresa(id: number) {
  const response = await api.delete(`/api/empresa/jobs/${id}`)
  return response.data
}

export async function getPerfilEmpresa() {
  const response = await api.get<Empresa>('/api/empresa/perfil')
  return response.data
}

export async function atualizarPerfilEmpresa(data: Empresa) {
  const response = await api.put<Empresa>('/api/empresa/perfil', data)
  return response.data
}

export async function listarInteressados(vagaId: number) {
  const response = await api.get<Interessado[]>(`/api/empresa/jobs/${vagaId}/interessados`)
  return response.data
}
