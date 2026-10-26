// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../lib/local-web.js', () => ({
  LOCAL_WEB: true,
  LOCAL_WEB_CONFIG: { allow_guest: true, invite_only: false, default_lang: 'zh', coach: null },
}))
vi.mock('../lib/api.js', () => ({ api: vi.fn(), setRemoteAuth: vi.fn() }))
vi.mock('./useUI.js', () => ({ useUI: { getState: () => ({ toast: vi.fn() }) } }))

import { api } from '../lib/api.js'
import { effectiveLang } from '../lib/default-lang.js'
import { useStore, freshState } from './useStore.js'

beforeEach(() => {
  localStorage.clear()
  api.mockReset()
  useStore.setState({ S: freshState(), user: null, ready: false, config: null })
})
afterEach(() => { localStorage.clear() })

describe('personal static website', () => {
  it('starts in Chinese with empty real records and no account or backend requests', async () => {
    localStorage.setItem('gym_user', JSON.stringify({ id: 'old-server-user' }))
    useStore.setState({ user: { id: 'old-server-user' } })
    await useStore.getState().boot()
    const st = useStore.getState()
    expect(st.ready).toBe(true)
    expect(st.isGuest()).toBe(true)
    expect(st.user).toBeNull()
    expect(localStorage.getItem('gym_user')).toBeNull()
    expect(effectiveLang(st.S, st.config)).toBe('zh')
    expect(st.S.workouts).toEqual([])
    expect(st.S.bodyweight).toEqual([])
    expect(st.S.routines).toEqual([])
    expect(st.config.coach).toBeNull()
    expect(api).not.toHaveBeenCalled()
  })

  it('preserves real records and the chosen language across repeated boots and demo reset calls', async () => {
    await useStore.getState().boot()
    useStore.getState().update(s => {
      s.bodyweight.push({ id: 'weight-1', d: '2026-10-26', w: 70 })
      s.lang = 'en'
      s.langAuto = false
    })
    const saved = JSON.parse(localStorage.getItem('gym_state_v1'))
    await useStore.getState().boot()
    await useStore.getState().resetDemo()
    expect(useStore.getState().S.bodyweight).toEqual(saved.bodyweight)
    expect(effectiveLang(useStore.getState().S, useStore.getState().config)).toBe('en')
    expect(api).not.toHaveBeenCalled()
  })

  it('restores an exported state through the existing backup import without contacting a server', async () => {
    await useStore.getState().boot()
    useStore.getState().update(s => { s.bodyweight.push({ id: 'weight-1', d: '2026-10-26', w: 70 }) })
    const backup = JSON.parse(localStorage.getItem('gym_state_v1'))
    await useStore.getState().resetEverything()
    expect(useStore.getState().S.bodyweight).toEqual([])
    useStore.getState().importBackup(backup)
    expect(useStore.getState().S.bodyweight).toEqual(backup.bodyweight)
    expect(api).not.toHaveBeenCalled()
  })
})
