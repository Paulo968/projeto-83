const WGER_API_BASE = 'https://wger.de/api/v2'
const WGER_PORTUGUESE_LANGUAGE_ID = 7
const WGER_ENGLISH_LANGUAGE_ID = 2
const CACHE_PREFIX = 'project83-wger-v2-pt'
const CACHE_TTL_MS = 12 * 60 * 60 * 1000
const REQUEST_TIMEOUT_MS = 10000

const MUSCLE_PT = {
  1: 'Bíceps',
  2: 'Ombros',
  3: 'Serrátil anterior',
  4: 'Peitoral',
  5: 'Tríceps',
  6: 'Abdômen',
  7: 'Panturrilhas',
  8: 'Glúteos',
  9: 'Trapézio',
  10: 'Quadríceps',
  11: 'Posteriores de coxa',
  12: 'Dorsais',
  13: 'Braquial',
  14: 'Oblíquos',
  15: 'Sóleo',
  16: 'Lombar',
}

const EQUIPMENT_PT = {
  1: 'Barra',
  2: 'Barra EZ',
  3: 'Halteres',
  4: 'Colchonete',
  5: 'Bola suíça',
  6: 'Barra fixa',
  7: 'Peso corporal',
  8: 'Banco',
  9: 'Banco inclinado',
  10: 'Kettlebell',
  11: 'Faixa elástica',
  12: 'Máquina de cabos / polia',
}

const CATEGORY_PT = {
  abs: 'Abdômen',
  arms: 'Braços',
  back: 'Costas',
  calves: 'Panturrilhas',
  cardio: 'Cardio',
  chest: 'Peito',
  legs: 'Pernas',
  shoulders: 'Ombros',
}

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
    // Cache é uma otimização. A integração continua funcionando sem localStorage.
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

function translateCategory(value) {
  const name = String(value || '').trim()
  return CATEGORY_PT[name.toLowerCase()] || name || 'Exercício'
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
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.6',
      },
      signal: controller.signal,
    })

    if (!response.ok) throw new Error(`Wger respondeu com HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    if (error?.name === 'AbortError') throw new Error('A Wger demorou demais para responder.')
    throw error
  } finally {
    window.clearTimeout(timeout)
  }
}

function chooseTranslation(item) {
  const translations = toArray(item?.translations)
  return (
    translations.find((translation) => Number(translation?.language) === WGER_PORTUGUESE_LANGUAGE_ID && translation?.name)
    ?? translations.find((translation) => Number(translation?.language) === WGER_ENGLISH_LANGUAGE_ID && translation?.name)
    ?? translations.find((translation) => translation?.name)
    ?? {}
  )
}

function normalizeMuscle(item) {
  return {
    id: item?.id,
    name: MUSCLE_PT[item?.id] || item?.name_en || item?.name || `Músculo ${item?.id ?? ''}`.trim(),
  }
}

function normalizeEquipment(item) {
  return {
    id: item?.id,
    name: EQUIPMENT_PT[item?.id] || item?.name || `Equipamento ${item?.id ?? ''}`.trim(),
  }
}

function normalizeExercise(item) {
  const translation = chooseTranslation(item)
  const muscles = toArray(item?.muscles).map(normalizeMuscle)
  const secondaryMuscles = toArray(item?.muscles_secondary).map(normalizeMuscle)
  const equipment = toArray(item?.equipment).map(normalizeEquipment)
  const images = toArray(item?.images).map((image) => image?.image).filter(Boolean)
  const rawCategory = typeof item?.category === 'object' ? item.category?.name : item?.category

  return {
    id: item?.id,
    uuid: item?.uuid,
    name: translation?.name || item?.name || `Exercício #${item?.id ?? '?'}`,
    description: stripHtml(translation?.description || item?.description || ''),
    category: translateCategory(rawCategory),
    muscles,
    secondaryMuscles,
    equipment,
    images,
    license: item?.license,
    licenseAuthor: item?.license_author || '',
    language: Number(translation?.language) === WGER_PORTUGUESE_LANGUAGE_ID ? 'pt' : 'fallback',
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
    const payload = await request('/exerciseinfo/', { limit: 80, status: 2 })
    return toArray(payload?.results).map(normalizeExercise)
  }, options)
}

export async function getWgerMuscles(options = {}) {
  return cached('muscles', async () => {
    const payload = await request('/muscle/', { limit: 100 })
    return toArray(payload?.results).map(normalizeMuscle)
  }, options)
}

export async function getWgerEquipment(options = {}) {
  return cached('equipment', async () => {
    const payload = await request('/equipment/', { limit: 100 })
    return toArray(payload?.results).map(normalizeEquipment)
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
