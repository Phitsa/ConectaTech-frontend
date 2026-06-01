import { describe, expect, it } from 'vitest'
import {
  clearSession,
  getRole,
  getToken,
  getUser,
  isLoggedIn,
  setSession,
} from './session'

const usuario = { nome: 'Ana', email: 'ana@email.com', role: 'STUDENT' }

describe('session', () => {
  it('persiste token e usuario no localStorage', () => {
    setSession('jwt-123', usuario)
    expect(getToken()).toBe('jwt-123')
    expect(getUser()).toEqual(usuario)
    expect(getRole()).toBe('STUDENT')
    expect(isLoggedIn()).toBe(true)
  })

  it('limpa a sessao', () => {
    setSession('jwt-123', usuario)
    clearSession()
    expect(getToken()).toBeNull()
    expect(getUser()).toBeNull()
    expect(getRole()).toBeNull()
    expect(isLoggedIn()).toBe(false)
  })

  it('retorna null quando o usuario armazenado e invalido', () => {
    localStorage.setItem('user', 'nao-e-json')
    expect(getUser()).toBeNull()
    expect(getRole()).toBeNull()
  })

  it('nao esta logado sem token', () => {
    expect(isLoggedIn()).toBe(false)
  })
})
