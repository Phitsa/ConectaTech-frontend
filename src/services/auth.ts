import { api } from './api'
import type { AuthUser } from './session'

export interface RegistroData {
  nome: string
  email: string
  senha: string
  curso: string
  periodo: string
}

export interface LoginData {
  email: string
  senha: string
}

interface LoginResponse {
  token: string
  nome: string
  email: string
  role: string
  cnpj?: string
}

export interface AuthResult {
  token: string
  user: AuthUser
}

export async function registrarUsuario(data: RegistroData) {
  const response = await api.post('/api/auth/register', data)
  return response.data
}

export async function login(data: LoginData): Promise<AuthResult> {
  const response = await api.post<LoginResponse>('/api/auth/login', data)
  const { token, nome, email, role } = response.data
  return { token, user: { nome, email, role } }
}

export async function loginEmpresa(data: LoginData): Promise<AuthResult> {
  const response = await api.post<LoginResponse>('/api/empresa/auth/login', data)
  const { token, nome, email, cnpj } = response.data
  return { token, user: { nome, email, role: 'EMPRESA', cnpj } }
}

export async function recuperarSenha(email: string) {
  const response = await api.post('/api/auth/forgot-password', { email })
  return response.data
}
