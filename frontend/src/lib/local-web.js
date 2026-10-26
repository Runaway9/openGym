// Personal browser edition for static hosting. It never seeds demo records or
// connects to an API; the existing backup tools are its way between devices.
export const LOCAL_WEB = import.meta.env.VITE_LOCAL_WEB === '1'
export const LOCAL_WEB_CONFIG = Object.freeze({
  allow_guest: true,
  invite_only: false,
  default_lang: 'zh',
  coach: null,
})
export const LOCAL_WEB_SOURCE = 'https://github.com/Runaway9/openGym'
