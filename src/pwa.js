const BASE_URL = import.meta.env.BASE_URL || '/'

function ensureLink(rel, href, extra = {}) {
  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.rel = rel
    document.head.appendChild(element)
  }
  element.href = href
  Object.entries(extra).forEach(([key, value]) => element.setAttribute(key, value))
  return element
}

function ensureMeta(name, content) {
  let element = document.head.querySelector(`meta[name="${name}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.name = name
    document.head.appendChild(element)
  }
  element.content = content
  return element
}

export function setupPWA() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  ensureLink('manifest', `${BASE_URL}manifest.webmanifest`)
  ensureLink('icon', `${BASE_URL}icons/projeto-83.svg`, { type: 'image/svg+xml' })
  ensureLink('apple-touch-icon', `${BASE_URL}icons/projeto-83.svg`)

  ensureMeta('theme-color', '#0b0b0c')
  ensureMeta('application-name', 'Projeto 83')
  ensureMeta('apple-mobile-web-app-capable', 'yes')
  ensureMeta('apple-mobile-web-app-status-bar-style', 'black-translucent')
  ensureMeta('apple-mobile-web-app-title', 'Projeto 83')
  ensureMeta('mobile-web-app-capable', 'yes')

  if (!('serviceWorker' in navigator)) return

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${BASE_URL}sw.js`, { scope: BASE_URL })
      .catch((error) => console.warn('[Projeto 83] Service worker não registrado:', error))
  }, { once: true })
}
