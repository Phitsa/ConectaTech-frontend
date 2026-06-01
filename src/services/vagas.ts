import { api } from './api'

export interface Vaga {
  id: number
  titulo: string
  empresa: string
  descricao?: string
  localizacao?: string
  url?: string
  fonte?: string
  empresaNome?: string
  dataPublicacao?: string
}

export interface VagaInput {
  titulo: string
  empresa: string
  descricao?: string
  localizacao?: string
  url?: string
}

export interface FiltroVagas {
  busca?: string
  localizacao?: string
}

export async function listarVagas(filtros: FiltroVagas = {}) {
  const response = await api.get<Vaga[]>('/api/jobs', { params: filtros })
  return response.data
}

export async function buscarVaga(id: number | string) {
  const response = await api.get<Vaga>(`/api/jobs/${id}`)
  return response.data
}

export async function selecionarVaga(vagaId: number) {
  const response = await api.post('/api/jobs/select', { vagaId })
  return response.data
}

export async function minhasSelecoes() {
  const response = await api.get<Vaga[]>('/api/jobs/my-selections')
  return response.data
}

export async function removerSelecao(vagaId: number) {
  const response = await api.delete(`/api/jobs/my-selections/${vagaId}`)
  return response.data
}

export async function demonstrarInteresse(vagaId: number) {
  const response = await api.post(`/api/jobs/${vagaId}/interesse`)
  return response.data
}

export async function removerInteresse(vagaId: number) {
  const response = await api.delete(`/api/jobs/${vagaId}/interesse`)
  return response.data
}

export async function candidatar(vagaId: number) {
  await demonstrarInteresse(vagaId)
  await selecionarVaga(vagaId)
}
