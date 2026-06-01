import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import RequireAuth from './RequireAuth'
import { AuthProvider } from '../context/AuthProvider'
import { setSession } from '../services/session'
import type { ReactNode } from 'react'

function renderRota(children: ReactNode, role?: string | string[]) {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={['/privado']}>
        <Routes>
          <Route path="/login" element={<p>pagina de login</p>} />
          <Route path="/redator/login" element={<p>login redator</p>} />
          <Route
            path="/privado"
            element={
              <RequireAuth redirectTo="/login" role={role}>
                {children}
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  )
}

describe('RequireAuth', () => {
  it('redireciona para o login quando nao ha sessao', () => {
    renderRota(<p>conteudo protegido</p>)
    expect(screen.getByText('pagina de login')).toBeInTheDocument()
    expect(screen.queryByText('conteudo protegido')).not.toBeInTheDocument()
  })

  it('renderiza o conteudo quando logado e sem exigencia de papel', () => {
    setSession('jwt', { nome: 'Ana', email: 'a@a.com', role: 'STUDENT' })
    renderRota(<p>conteudo protegido</p>)
    expect(screen.getByText('conteudo protegido')).toBeInTheDocument()
  })

  it('permite o acesso quando o papel corresponde', () => {
    setSession('jwt', { nome: 'Rita', email: 'r@r.com', role: 'REDATOR' })
    renderRota(<p>painel redator</p>, ['REDATOR', 'ADMIN'])
    expect(screen.getByText('painel redator')).toBeInTheDocument()
  })

  it('bloqueia quando o papel nao corresponde', () => {
    setSession('jwt', { nome: 'Ana', email: 'a@a.com', role: 'STUDENT' })
    renderRota(<p>painel redator</p>, 'REDATOR')
    expect(screen.queryByText('painel redator')).not.toBeInTheDocument()
    expect(screen.getByText('pagina de login')).toBeInTheDocument()
  })
})
