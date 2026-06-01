import { api } from './api'
import type { Empresa, EmpresaRegistroInput } from './empresa'
import type { Vaga, VagaInput } from './vagas'

export async function listarVagasRedator() {
  const response = await api.get<Vaga[]>('/api/redator/jobs')
  return response.data
}

export async function criarVagaRedator(data: VagaInput) {
  const response = await api.post<Vaga>('/api/redator/jobs', data)
  return response.data
}

export async function atualizarVagaRedator(id: number, data: VagaInput) {
  const response = await api.put<Vaga>(`/api/redator/jobs/${id}`, data)
  return response.data
}

export async function excluirVagaRedator(id: number) {
  const response = await api.delete(`/api/redator/jobs/${id}`)
  return response.data
}

export async function listarEmpresasRedator() {
  const response = await api.get<Empresa[]>('/api/redator/empresas')
  return response.data
}

export async function buscarEmpresaRedator(id: number | string) {
  const response = await api.get<Empresa>(`/api/redator/empresas/${id}`)
  return response.data
}

export async function criarEmpresaRedator(data: EmpresaRegistroInput) {
  const response = await api.post<Empresa>('/api/redator/empresas', data)
  return response.data
}

export async function atualizarEmpresaRedator(id: number, data: Empresa) {
  const response = await api.put<Empresa>(`/api/redator/empresas/${id}`, data)
  return response.data
}

export async function excluirEmpresaRedator(id: number) {
  const response = await api.delete(`/api/redator/empresas/${id}`)
  return response.data
}
