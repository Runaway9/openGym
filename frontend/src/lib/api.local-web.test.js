// @vitest-environment happy-dom
import { expect, it, vi } from 'vitest'
vi.mock('./local-web.js', () => ({ LOCAL_WEB: true }))
import { api } from './api.js'

it('blocks accidental backend calls before any request leaves the local edition', async () => {
  const fetchSpy = vi.spyOn(globalThis, 'fetch')
  await expect(api('/api/data', { method: 'PUT', body: '{}' })).rejects.toMatchObject({ code: 'local-only', status: 0 })
  expect(fetchSpy).not.toHaveBeenCalled()
  fetchSpy.mockRestore()
})
