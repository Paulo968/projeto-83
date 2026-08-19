// Biblioteca de demonstrações do Projeto 83.
// Todos os exercícios do catálogo possuem vídeo para permitir testar o fluxo completo.
// status: "revisado" = o movimento/variação corresponde ao exercício.
// status: "equivalente" = o padrão de movimento corresponde, mas a máquina/posição visual pode variar.

export const VIDEO_DEMOS = {
  // Peito
  'supino-reto-articulado': { id: 'sqNwDkUU_Ps', format: 'landscape', label: 'Chest press / supino reto em máquina', status: 'revisado' },
  'supino-inclinado-articulado': { id: 'ABj-r3_aepg', format: 'landscape', label: 'Supino inclinado em máquina', status: 'revisado' },
  'supino-reto-halteres': { id: 'AduT4Eq-iP0', format: 'landscape', label: 'Supino reto com halteres', status: 'revisado' },
  'supino-inclinado-halteres': { id: 'oZVCBM9f8Eo', format: 'landscape', label: 'Supino inclinado com halteres', status: 'revisado' },
  'crucifixo-fly': { id: 'eGjt4lk6g34', format: 'landscape', label: 'Machine fly / voador', status: 'revisado' },
  'crossover-peito': { id: 'QcTcWpkn_bw', format: 'landscape', label: 'Cable fly / crossover', status: 'revisado' },

  // Costas
  'puxador-aberto': { id: 'BOW9my4J_ek', format: 'landscape', label: 'Puxada aberta / pronada', status: 'revisado' },
  'puxador-articulado-circular': { id: 'IjoFCmLX7z0', format: 'landscape', label: 'Puxada neutra guiada', status: 'equivalente' },
  'puxada-neutra-polia': { id: 'IjoFCmLX7z0', format: 'landscape', label: 'Puxada neutra na polia', status: 'revisado' },
  'remada-articulada-unilateral': { id: 'glWqD2eS2Uo', format: 'landscape', label: 'Remada unilateral em máquina', status: 'revisado' },
  'remada-cavalinho-pronada': { id: 'hYo72r8Ivso', format: 'landscape', label: 'T-bar row / remada cavalinho', status: 'revisado' },
  'remada-serrote-halter': { id: 'ZRSGpBUVcNw', format: 'landscape', label: 'Remada unilateral com halter', status: 'revisado' },

  // Ombros
  'elevacao-lateral': { id: 'X8tZOGFovj0', format: 'short', label: 'Elevação lateral', status: 'revisado' },
  'elevacao-lateral-polia': { id: 'PPrzBWZDOhA', format: 'landscape', label: 'Elevação lateral na polia', status: 'revisado' },
  'desenvolvimento-articulado-neutro': { id: 'TnhIyp4kmO8', format: 'landscape', label: 'Shoulder press em máquina', status: 'revisado' },
  'crucifixo-inverso-voador': { id: 'hosMrtU1BA8', format: 'landscape', label: 'Reverse pec deck', status: 'revisado' },
  'face-pull-polia': { id: '0Po47vvj9g4', format: 'landscape', label: 'Face pull na polia', status: 'revisado' },

  // Bíceps e tríceps
  'rosca-scott-maquina': { id: 'gadb30aLEjk', format: 'landscape', label: 'Rosca Scott em máquina', status: 'revisado' },
  'rosca-martelo-sentado': { id: 'ab775I96_RI', format: 'landscape', label: 'Rosca martelo sentada', status: 'revisado' },
  'rosca-polia-barra': { id: 'GNlopToAZyg', format: 'landscape', label: 'Rosca direta na polia', status: 'revisado' },
  'triceps-pulley': { id: 'LlJV9owrwX4', format: 'landscape', label: 'Tríceps pulley', status: 'revisado' },
  'triceps-corda': { id: '8ZJ2EfAr1Eo', format: 'short', label: 'Tríceps com corda', status: 'revisado' },
  'triceps-unilateral-polia': { id: 'Cp_bShvMY4c', format: 'landscape', label: 'Tríceps unilateral na polia', status: 'revisado' },

  // Pernas e glúteos
  'leg-press-45': { id: 'nDh_BlnLCGc', format: 'short', label: 'Leg Press 45°', status: 'revisado' },
  'leg-press-180': { id: 'p5dCqF7wWUw', format: 'landscape', label: 'Leg press sentado / horizontal', status: 'revisado' },
  'agachamento-hack': { id: 'zN_JJoUyI3M', format: 'landscape', label: 'Hack squat em máquina', status: 'revisado' },
  'cadeira-extensora': { id: 'pJZXbaF-MCM', format: 'landscape', label: 'Cadeira extensora', status: 'revisado' },
  'mesa-flexora': { id: 'Sle1Iow1Fww', format: 'landscape', label: 'Mesa flexora', status: 'revisado' },
  'cadeira-flexora': { id: '402fta6y2yY', format: 'landscape', label: 'Cadeira flexora', status: 'revisado' },
  'flexor-em-pe': { id: 'CmtN7mqUkLQ', format: 'landscape', label: 'Flexor em pé na máquina', status: 'revisado' },
  'cadeira-abdutora': { id: '50qHGus1TZk', format: 'landscape', label: 'Cadeira abdutora', status: 'revisado' },
  'abducao-polia': { id: 'CP4LjhZ_Wq0', format: 'landscape', label: 'Abdução de quadril na polia', status: 'revisado' },
  'adutor-sentado': { id: 'HT1RDYJNFgk', format: 'landscape', label: 'Máquina adutora', status: 'revisado' },
  'agachamento-sumo-halter': { id: 'qiQAsB0x-7k', format: 'landscape', label: 'Agachamento sumô', status: 'equivalente' },
  'elevacao-pelvica-articulada': { id: 'np35bxrQqRI', format: 'landscape', label: 'Elevação pélvica em máquina', status: 'revisado' },
  'elevacao-pelvica-smith': { id: 'kzlGOcQWuN8', format: 'landscape', label: 'Hip thrust no Smith', status: 'revisado' },
  'panturrilha-maquina': { id: 'IsrWDhkUJyQ', format: 'landscape', label: 'Panturrilha em máquina', status: 'revisado' },
  'panturrilha-em-pe': { id: 'IsrWDhkUJyQ', format: 'landscape', label: 'Panturrilha em pé na máquina', status: 'revisado' },
  'panturrilha-leg-press': { id: 'gJ1wh5rBt-g', format: 'landscape', label: 'Panturrilha no leg press', status: 'revisado' },

  // Core sem chão
  'crunch-polia': { id: 'ToJeyhydUxU', format: 'landscape', label: 'Crunch na polia alta', status: 'revisado' },
  'abdominal-maquina': { id: 'JN4SXVZYy88', format: 'short', label: 'Abdominal em máquina', status: 'revisado' },
  'elevacao-joelhos-cadeira-romana': { id: 'O7iDA3ory-w', format: 'landscape', label: 'Elevação de joelhos', status: 'equivalente' },
  'pallof-press': { id: 'HXrLaqNIkTs', format: 'landscape', label: 'Pallof Press', status: 'revisado' },
  'rotacao-polia': { id: 'pAplQXk3dkU', format: 'landscape', label: 'Rotação de tronco na polia', status: 'revisado' },
  'farmer-carry': { id: 'p5MNNosenJc', format: 'landscape', label: 'Farmer Carry com halteres', status: 'revisado' },
  'suitcase-carry': { id: 'SPB3VE-zDUI', format: 'landscape', label: 'Suitcase Carry', status: 'revisado' },
  'encolhimento-halteres': { id: 'zfhBvlQRxyM', format: 'landscape', label: 'Encolhimento com halteres', status: 'revisado' },

  // Cardio
  'cardio-moderado': { id: 'HxsFneJFM2c', format: 'landscape', label: 'Esteira: uso e postura', status: 'revisado' },
  'cardio-bicicleta': { id: 'NwwDBARCGgo', format: 'landscape', label: 'Bicicleta ergométrica', status: 'revisado' },
  'cardio-eliptico': { id: 'yISC2qwdh9I', format: 'landscape', label: 'Elíptico / cross trainer', status: 'revisado' },
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

export function getVideoStatusLabel(video) {
  if (!video) return 'Sem vídeo'
  return video.status === 'equivalente'
    ? 'Movimento equivalente · a máquina/posição pode variar'
    : 'Demonstração revisada'
}
