// Biblioteca de demonstrações do Projeto 83.
// Mantemos os vídeos separados da ficha para poder trocar uma demonstração
// sem mexer na lógica do treino.

export const VIDEO_DEMOS = {
  'supino-reto': { id: 'hWbUlkb5Ms4', format: 'short', label: 'Supino reto' },
  'supino-reto-b': { id: 'hWbUlkb5Ms4', format: 'short', label: 'Supino reto' },

  'puxada-pronada': { id: 'BOW9my4J_ek', format: 'landscape', label: 'Puxada pronada' },
  'remada-baixa': { id: '2YebbYuuBJQ', format: 'landscape', label: 'Remada baixa' },
  'elevacao-lateral-a': { id: 'X8tZOGFovj0', format: 'short', label: 'Elevação lateral' },
  'elevacao-lateral-b': { id: 'X8tZOGFovj0', format: 'short', label: 'Elevação lateral' },
  'elevacao-frontal': { id: 'Tt8m9zlvNx8', format: 'landscape', label: 'Elevação frontal' },
  'rosca-polia-a': { id: 'N6paU6TGFWU', format: 'short', label: 'Rosca direta' },
  'rosca-polia-b': { id: 'N6paU6TGFWU', format: 'short', label: 'Rosca direta' },
  'triceps-pulley-a': { id: 'LlJV9owrwX4', format: 'landscape', label: 'Tríceps pulley' },
  'triceps-pulley-b': { id: 'LlJV9owrwX4', format: 'landscape', label: 'Tríceps pulley' },
  'triceps-corda': { id: '8ZJ2EfAr1Eo', format: 'short', label: 'Tríceps corda' },

  'extensora': { id: 'pJZXbaF-MCM', format: 'landscape', label: 'Cadeira extensora' },
  'leg-press-a': { id: 'nDh_BlnLCGc', format: 'short', label: 'Leg Press 45°' },
  'leg-press-b': { id: 'nDh_BlnLCGc', format: 'short', label: 'Leg Press 45°' },
  'mesa-flexora-a': { id: 'Sle1Iow1Fww', format: 'landscape', label: 'Mesa flexora' },
  'mesa-flexora-b': { id: 'Sle1Iow1Fww', format: 'landscape', label: 'Mesa flexora' },
  'elevacao-pelvica-a': { id: 'np35bxrQqRI', format: 'landscape', label: 'Elevação pélvica' },
  'elevacao-pelvica-b': { id: 'np35bxrQqRI', format: 'landscape', label: 'Elevação pélvica' },
  'cadeira-flexora': { id: '402fta6y2yY', format: 'landscape', label: 'Cadeira flexora' },
  'abdutora': { id: '50qHGus1TZk', format: 'landscape', label: 'Cadeira abdutora' },
  'afundo': { id: 'GuhUjVehnWM', format: 'landscape', label: 'Afundo' },

  // Core: referências simples enquanto selecionamos demonstrações melhores.
  'elevacao-pernas': { id: '3TyYge-n3LE', format: 'landscape', label: 'Elevação de pernas' },
}

export function getVideoDemo(exerciseId) {
  return VIDEO_DEMOS[exerciseId] ?? null
}

export function getYoutubeEmbedUrl(video) {
  if (!video) return ''
  return `https://www.youtube.com/embed/${video.id}?playsinline=1&rel=0`
}

export function getYoutubeThumbnail(video) {
  if (!video) return ''
  return `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
}
