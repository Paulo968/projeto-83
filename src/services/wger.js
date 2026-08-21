const WGER_API_BASE = 'https://wger.de/api/v2'
const CACHE_PREFIX = 'project83-wger-v1'
const CACHE_TTL_MS = 12 * 60 * 60 * 1000
const REQUEST_TIMEOUT_MS = 10000

function cacheKey(name) {
  return `${CACHE_PREFIX}:${name}`
}

function readCache(name) {
  try {
    const raw = window.localStorage.getItem(cacheKey(name))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.savedAt || Date.now() - parsed.savedAt > CACHE_TTL_MS) return null
    return parsed.data ?? null
  } catch {
    return null
  }
}

function writeCache(name, data) {
  try {
    window.localStorage.setItem(cacheKey(name), JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // Cache é uma otimização. A integração deve continuar funcionando sem localStorage.
  }
}

function stripHtml(value = '') {
  return String(value)
    .replace(/<br\s*\/?\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function toArray(value) {
  return Array.isArray(value) ? value : []
}

async function request(path, params = {}) {
  const url = new URL(`${WGER_API_BASE}${path}`)
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    })

    if (!response.ok) {
      throw new Error(`Wger respondeu com HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    if (error?.name === 'AbortError') {
      throw new Error('A Wger demorou demais para responder.')
    }
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}

function chooseTranslation(item) {
  const translations = toArray(item?.translations)
  return (
    translations.find((translation) => Number(translation?.language) === 2 && translation?.name)
    ?? translations.find((translation) => translation?.name)
    ?? {}
  )
}

function normalizeNamedEntity(item, fallbackPrefix) {
  return {
    id: item?.id,
    name: item?.name_en || item?.name || `${fallbackPrefix} ${item?.id ?? ''}`.trim(),
  }
}

function normalizeExercise(item) {
  const translation = chooseTranslation(item)
  const muscles = toArray(item?.muscles).map((muscle) => normalizeNamedEntity(muscle, 'Músculo'))
  const secondaryMuscles = toArray(item?.muscles_secondary).map((muscle) => normalizeNamedEntity(muscle, 'Músculo'))
  const equipment = toArray(item?.equipment).map((entry) => normalizeNamedEntity(entry, 'Equipamento'))
  const images = toArray(item?.images)
    .map((image) => image?.image)
    .filter(Boolean)

  const category = typeof item?.category === 'object'
    ? item.category?.name
    : item?.category

  return {
    id: item?.id,
    uuid: item?.uuid,
    name: translation?.name || item?.name || `Exercício #${item?.id ?? '?'}`,
    description: stripHtml(translation?.description || item?.description || ''),
    category: category || 'Exercício',
    muscles,
    secondaryMuscles,
    equipment,
    images,
    license: item?.license,
    licenseAuthor: item?.license_author || '',
  }
}

async function cached(name, loader, { force = false } = {}) {
  if (!force) {
    const cachedValue = readCache(name)
    if (cachedValue) return cachedValue
  }

  const data = await loader()
  writeCache(name, data)
  return data
}

export async function getWgerExercises(options = {}) {
  return cached('exercises', async () => {
    const payload = await request('/exerciseinfo/', {
      limit: 80,
      status: 2,
    })
    return toArray(payload?.results).map(normalizeExercise)
  }, options)
}

export async function getWgerMuscles(options = {}) {
  return cached('muscles', async () => {
    const payload = await request('/muscle/', { limit: 100 })
    return toArray(payload?.results).map((item) => normalizeNamedEntity(item, 'Músculo'))
  }, options)
}

export async function getWgerEquipment(options = {}) {
  return cached('equipment', async () => {
    const payload = await request('/equipment/', { limit: 100 })
    return toArray(payload?.results).map((item) => normalizeNamedEntity(item, 'Equipamento'))
  }, options)
}

export async function loadWgerCatalog(options = {}) {
  const [exercises, muscles, equipment] = await Promise.all([
    getWgerExercises(options),
    getWgerMuscles(options),
    getWgerEquipment(options),
  ])

  return { exercises, muscles, equipment }
}
