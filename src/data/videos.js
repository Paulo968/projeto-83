// Biblioteca de demonstrações do Projeto 83.
// Regra desta versão: só mantemos no app vídeos que correspondem ao movimento.
// Quando ainda não revisamos a máquina/variação, o exercício fica como "em revisão"
// em vez de mostrar um vídeo potencialmente errado.

export const VIDEO_DEMOS = {
  'puxador-aberto': { id: 'BOW9my4J_ek', format: 'landscape', label: 'Puxada aberta / pronada', status: 'movimento-revisado' },
  'elevacao-lateral': { id: 'X8tZOGFovj0', format: 'short', label: 'Elevação lateral', status: 'revisado' },
  'triceps-pulley': { id: 'LlJV9owrwX4', format: 'landscape', label: 'Tríceps pulley', status: 'revisado' },
  'triceps-corda': { id: '8ZJ2EfAr1Eo', format: 'short', label: 'Tríceps corda', status: 'revisado' },
  'cadeira-extensora': { id: 'pJZXbaF-MCM', format: 'landscape', label: 'Cadeira extensora', status: 'revisado' },
  'leg-press-45': { id: 'nDh_BlnLCGc', format: 'short', label: 'Leg Press 45°', status: 'revisado' },
  'mesa-flexora': { id: 'Sle1Iow1Fww', format: 'landscape', label: 'Mesa flexora', status: 'revisado' },
  'elevacao-pelvica-articulada': { id: 'np35bxrQqRI', format: 'landscape', label: 'Elevação pélvica', status: 'movimento-revisado' },
  'cadeira-flexora': { id: '402fta6y2yY', format: 'landscape', label: 'Cadeira flexora', status: 'revisado' },
  'cadeira-abdutora': { id: '50qHGus1TZk', format: 'landscape', label: 'Cadeira abdutora', status: 'revisado' },
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
