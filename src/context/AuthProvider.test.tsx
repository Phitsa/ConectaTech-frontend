import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider } from './AuthProvider'
import { useAuth } from './useAuth'
import { getToken } from '../services/session'

vi.mock('../services/auth', () => ({
  login: vi.fn(async () => ({
    token: 'jwt-aluno',
    user: { nome: 'Ana', email: 'ana@email.com', role: 'STUDENT' },
  })),
  loginEmpresa: vi.fn(),
}))

function Consumer() {
  const { isLoggedIn, role, login, logout } = useAuth()
  return (
    <div>
      <span data-testid="status">{isLoggedIn ? 'logado' : 'deslogado'}</span>
      <span data-testid="role">{role ?? '-'}</span>
      <button onClick={() => login({ email: 'ana@email.com', senha: '123' })}>entrar</button>
      <button onClick={logout}>sair</button>
    </div>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('AuthProvider / useAuth', () => {
  it('comeca deslogado quando nao ha sessao', () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )
    expect(screen.getByTestId('status')).toHaveTextContent('deslogado')
    expect(screen.getByTestId('role')).toHaveTextContent('-')
  })

  it('fica logado de forma reativa apos o login e persiste o token', async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )

    await userEvent.click(screen.getByText('entrar'))

    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('logado'))
    expect(screen.getByTestId('role')).toHaveTextContent('STUDENT')
    expect(getToken()).toBe('jwt-aluno')
  })

  it('logout limpa o estado e a sessao', async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    )

    await userEvent.click(screen.getByText('entrar'))
    await waitFor(() => expect(screen.getByTestId('status')).toHaveTextContent('logado'))

    await userEvent.click(screen.getByText('sair'))

    expect(screen.getByTestId('status')).toHaveTextContent('deslogado')
    expect(getToken()).toBeNull()
  })
})
