import { AxiosError, AxiosHeaders } from 'axios'
import { describe, expect, it } from 'vitest'
import { api, extractApiError } from './api'
import { setSession } from './session'

type RequestHandler = {
  fulfilled: (config: { headers: AxiosHeaders }) => { headers: AxiosHeaders }
}

function runRequestInterceptor(headers: AxiosHeaders) {
  const handlers = (api.interceptors.request as unknown as { handlers: RequestHandler[] }).handlers
  return handlers[0].fulfilled({ headers })
}

describe('api request interceptor', () => {
  it('injeta o header Authorization quando ha token', () => {
    setSession('jwt-xyz', { nome: 'Ana', email: 'a@a.com', role: 'STUDENT' })
    const config = runRequestInterceptor(new AxiosHeaders())
    expect(config.headers.Authorization).toBe('Bearer jwt-xyz')
  })

  it('nao injeta Authorization sem token', () => {
    const config = runRequestInterceptor(new AxiosHeaders())
    expect(config.headers.Authorization).toBeUndefined()
  })
})

describe('extractApiError', () => {
  it('usa a mensagem da API quando disponivel', () => {
    const headers = new AxiosHeaders()
    const error = new AxiosError('falhou', 'ERR', { headers } as never, undefined, {
      data: { message: 'E-mail ja cadastrado' },
      status: 400,
      statusText: 'Bad Request',
      headers,
      config: { headers } as never,
    })
    expect(extractApiError(error)).toBe('E-mail ja cadastrado')
  })

  it('cai no fallback para erros desconhecidos', () => {
    expect(extractApiError(new Error('boom'), 'fallback')).toBe('fallback')
  })
})
