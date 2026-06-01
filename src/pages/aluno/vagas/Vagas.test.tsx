import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Vagas from './Vagas'
import { AuthProvider } from '../../../context/AuthProvider'
import { listarVagas } from '../../../services/vagas'

vi.mock('../../../services/vagas', () => ({
  listarVagas: vi.fn(),
}))

const mockedListar = vi.mocked(listarVagas)

function renderPagina() {
  return render(
    <AuthProvider>
      <MemoryRouter>
        <Vagas />
      </MemoryRouter>
    </AuthProvider>,
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('pagina de Vagas (aluno)', () => {
  it('carrega e exibe as vagas vindas da API', async () => {
    mockedListar.mockResolvedValueOnce([
      { id: 1, titulo: 'Estagio Front-end', empresa: 'TechCo', localizacao: 'Mossoro - RN' },
      { id: 2, titulo: 'Estagio Dados', empresa: 'DataCo' },
    ])

    renderPagina()

    expect(await screen.findByText('Estagio Front-end')).toBeInTheDocument()
    expect(screen.getByText('Estagio Dados')).toBeInTheDocument()
    expect(mockedListar).toHaveBeenCalled()
  })

  it('mostra estado vazio quando nao ha vagas', async () => {
    mockedListar.mockResolvedValueOnce([])
    renderPagina()
    expect(await screen.findByText('Nenhuma vaga encontrada.')).toBeInTheDocument()
  })

  it('mostra mensagem de erro quando a API falha', async () => {
    mockedListar.mockRejectedValueOnce(new Error('falha'))
    renderPagina()
    await waitFor(() =>
      expect(screen.getByText('Não foi possível carregar as vagas.')).toBeInTheDocument(),
    )
  })
})
