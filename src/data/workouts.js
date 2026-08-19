export const PROFILE = {
  startWeight: 97,
  goalMin: 80,
  goalMax: 83,
}

const e = (id, name, sets, reps, rest, muscleGroups, instructions, demoQuery, type = 'strength') => ({
  id,
  name,
  sets,
  reps,
  rest,
  muscleGroups,
  instructions,
  demoQuery,
  type,
})

export const WORKOUTS = [
  {
    id: 'upper-a',
    weekday: 1,
    shortDay: 'SEG',
    day: 'Segunda-feira',
    title: 'Superior A',
    subtitle: 'Peito, costas, ombros e braços',
    exercises: [
      e('crucifixo-maquina', 'Crucifixo reto na máquina', 3, '10–12', 60, ['Peito'], ['Ajuste o banco para manter os cotovelos alinhados ao peito.', 'Feche os braços sem bater as manoplas.', 'Volte devagar mantendo tensão no peitoral.'], 'crucifixo máquina peitoral execução correta'),
      e('supino-reto', 'Supino reto com barra', 3, '8–10', 90, ['Peito', 'Tríceps', 'Ombro'], ['Pés firmes no chão e escápulas apoiadas.', 'Desça a barra com controle até a linha média do peito.', 'Empurre sem perder a estabilidade dos ombros.'], 'supino reto barra execução correta'),
      e('puxada-pronada', 'Puxada pronada na frente', 3, '10–12', 75, ['Costas', 'Bíceps'], ['Mantenha o peito aberto.', 'Puxe a barra em direção à parte alta do peito.', 'Controle a subida sem deixar o peso puxar o tronco.'], 'puxada pronada frente execução correta'),
      e('remada-baixa', 'Remada baixa com triângulo', 3, '10–12', 75, ['Costas', 'Bíceps'], ['Mantenha a coluna neutra.', 'Puxe o triângulo em direção ao abdômen.', 'Aproxime as escápulas sem jogar o tronco para trás.'], 'remada baixa triângulo execução correta'),
      e('elevacao-lateral-a', 'Elevação lateral', 3, '10–12', 60, ['Ombros'], ['Suba os braços até aproximadamente a linha dos ombros.', 'Mantenha leve flexão nos cotovelos.', 'Evite embalo do tronco.'], 'elevação lateral halteres execução correta'),
      e('rosca-polia-a', 'Rosca direta na polia', 3, '10–12', 60, ['Bíceps'], ['Mantenha os cotovelos próximos ao corpo.', 'Flexione sem avançar os ombros.', 'Desça controlando o cabo.'], 'rosca direta polia barra execução correta'),
      e('triceps-pulley-a', 'Tríceps pulley barra reta', 3, '10–12', 60, ['Tríceps'], ['Fixe os cotovelos ao lado do corpo.', 'Estenda completamente sem inclinar demais o tronco.', 'Retorne com controle.'], 'tríceps pulley barra reta execução correta'),
      e('cardio-seg', 'Esteira', 1, '20–30 min', 0, ['Cardio'], ['Use ritmo sustentável.', 'A referência inicial é 5,5 km/h.', 'Aumente inclinação ou velocidade somente se estiver confortável.'], 'caminhada esteira técnica postura', 'cardio'),
    ],
  },
  {
    id: 'lower-a',
    weekday: 2,
    shortDay: 'TER',
    day: 'Terça-feira',
    title: 'Inferior A',
    subtitle: 'Quadríceps, posteriores, glúteos e panturrilhas',
    exercises: [
      e('extensora', 'Cadeira extensora', 3, '10–12', 60, ['Quadríceps'], ['Ajuste o eixo da máquina ao joelho.', 'Estenda sem tirar o quadril do banco.', 'Desça com controle.'], 'cadeira extensora execução correta'),
      e('leg-press-a', 'Leg Press 45°', 3, '10–12', 90, ['Quadríceps', 'Glúteos'], ['Mantenha lombar e quadril apoiados.', 'Desça até onde mantém controle e posição.', 'Empurre sem travar os joelhos.'], 'leg press 45 execução correta'),
      e('hack', 'Agachamento Hack', 3, '10–12', 90, ['Quadríceps', 'Glúteos'], ['Apoie bem costas e ombros.', 'Joelhos acompanham a direção dos pés.', 'Desça com amplitude confortável e suba sem perder a base.'], 'agachamento hack máquina execução correta'),
      e('mesa-flexora-a', 'Mesa flexora', 3, '10–12', 75, ['Posteriores'], ['Mantenha o quadril apoiado.', 'Flexione os joelhos sem levantar a lombar.', 'Retorne devagar.'], 'mesa flexora execução correta'),
      e('elevacao-pelvica-a', 'Elevação pélvica articulada', 3, '10–12', 90, ['Glúteos', 'Posteriores'], ['Apoie os pés com estabilidade.', 'Suba o quadril contraindo os glúteos.', 'Evite hiperestender a lombar no topo.'], 'elevação pélvica máquina articulada execução correta'),
      e('panturrilha-em-pe', 'Panturrilha articulada em pé', 3, '10–12', 60, ['Panturrilhas'], ['Desça o calcanhar controlando.', 'Suba até contrair a panturrilha.', 'Evite quicar na repetição.'], 'panturrilha máquina em pé execução correta'),
      e('cardio-ter', 'Esteira', 1, '20–30 min', 0, ['Cardio'], ['Use ritmo sustentável.', 'A referência inicial é 5,5 km/h.', 'Priorize consistência.'], 'caminhada esteira técnica postura', 'cardio'),
    ],
  },
  {
    id: 'core',
    weekday: 3,
    shortDay: 'QUA',
    day: 'Quarta-feira',
    title: 'Core + Cardio',
    subtitle: 'Recuperação ativa e abdômen',
    exercises: [
      e('abdominal-reto', 'Abdominal reto no solo', 4, '10–12', 45, ['Core'], ['Mantenha lombar estável.', 'Eleve o tronco usando o abdômen, sem puxar o pescoço.', 'Desça controlando.'], 'abdominal reto solo execução correta'),
      e('elevacao-pernas', 'Elevação de pernas no solo', 4, '10–12', 45, ['Core'], ['Mantenha a lombar apoiada.', 'Suba e desça as pernas com controle.', 'Reduza a amplitude se a lombar começar a arquear.'], 'elevação de pernas solo abdominal execução correta'),
      e('cardio-qua', 'Esteira', 1, '20–30 min', 0, ['Cardio'], ['Faça um cardio confortável.', 'Pode variar levemente velocidade ou inclinação.', 'O objetivo do dia é manter atividade sem destruir a recuperação.'], 'caminhada esteira técnica postura', 'cardio'),
    ],
  },
  {
    id: 'upper-b',
    weekday: 4,
    shortDay: 'QUI',
    day: 'Quinta-feira',
    title: 'Superior B',
    subtitle: 'Peito, costas, ombros e braços',
    exercises: [
      e('supino-reto-b', 'Supino reto com barra', 3, '8–10', 90, ['Peito', 'Tríceps', 'Ombro'], ['Pés firmes no chão e escápulas apoiadas.', 'Desça a barra com controle.', 'Empurre mantendo os ombros estáveis.'], 'supino reto barra execução correta'),
      e('puxada-neutra', 'Puxada neutra com triângulo', 3, '10–12', 75, ['Costas', 'Bíceps'], ['Mantenha o peito aberto.', 'Puxe o triângulo em direção à parte alta do peito.', 'Controle totalmente a volta.'], 'puxada neutra triângulo execução correta'),
      e('elevacao-frontal', 'Elevação frontal com halteres + rotação', 3, '10–12', 60, ['Ombros'], ['Use carga que permita controle.', 'Evite impulso do tronco.', 'Faça a rotação de forma suave e sem dor.'], 'elevação frontal halteres rotação execução correta'),
      e('elevacao-lateral-b', 'Elevação lateral', 3, '10–12', 60, ['Ombros'], ['Mantenha leve flexão dos cotovelos.', 'Suba controlando até a linha dos ombros.', 'Evite encolher os ombros.'], 'elevação lateral halteres execução correta'),
      e('rosca-polia-b', 'Rosca direta na polia', 3, '10–12', 60, ['Bíceps'], ['Cotovelos próximos ao corpo.', 'Flexione sem usar embalo.', 'Desça controlando.'], 'rosca direta polia barra execução correta'),
      e('triceps-pulley-b', 'Tríceps pulley barra reta', 3, '10–12', 60, ['Tríceps'], ['Mantenha os cotovelos fixos.', 'Estenda completamente.', 'Controle a subida.'], 'tríceps pulley barra reta execução correta'),
      e('triceps-corda', 'Tríceps pulley com corda', 3, '10–12', 60, ['Tríceps'], ['Cotovelos firmes ao lado do corpo.', 'Abra levemente a corda no final.', 'Não use o peso do tronco para empurrar.'], 'tríceps pulley corda execução correta'),
      e('cardio-qui', 'Esteira', 1, '20–30 min', 0, ['Cardio'], ['Ritmo sustentável.', 'Referência inicial de 5,5 km/h.', 'Priorize consistência.'], 'caminhada esteira técnica postura', 'cardio'),
    ],
  },
  {
    id: 'lower-b',
    weekday: 5,
    shortDay: 'SEX',
    day: 'Sexta-feira',
    title: 'Inferior B',
    subtitle: 'Posteriores, glúteos, pernas e panturrilhas',
    exercises: [
      e('mesa-flexora-b', 'Mesa flexora', 3, '10–12', 75, ['Posteriores'], ['Quadril apoiado.', 'Flexione os joelhos sem levantar a lombar.', 'Retorne devagar.'], 'mesa flexora execução correta'),
      e('cadeira-flexora', 'Cadeira flexora', 3, '10–12', 75, ['Posteriores'], ['Ajuste o encosto e o rolo.', 'Flexione mantendo o quadril no banco.', 'Controle a volta.'], 'cadeira flexora execução correta'),
      e('abdutora', 'Cadeira abdutora', 3, '10–12', 60, ['Glúteos'], ['Mantenha o tronco estável.', 'Abra as pernas com controle.', 'Retorne sem deixar as placas baterem.'], 'cadeira abdutora execução correta'),
      e('elevacao-pelvica-b', 'Elevação pélvica articulada', 3, '10–12', 90, ['Glúteos', 'Posteriores'], ['Pés firmes.', 'Suba contraindo glúteos.', 'Não compense com a lombar.'], 'elevação pélvica máquina articulada execução correta'),
      e('afundo', 'Afundo com halteres', 3, '10–12', 90, ['Quadríceps', 'Glúteos'], ['Comece sem peso se necessário.', 'Mantenha o tronco estável.', 'Desça controlando e empurre o chão para subir.'], 'afundo halteres execução correta'),
      e('leg-press-b', 'Leg Press 45°', 3, '10–12', 90, ['Quadríceps', 'Glúteos'], ['Lombar apoiada.', 'Joelhos acompanham a direção dos pés.', 'Empurre sem travar os joelhos.'], 'leg press 45 execução correta'),
      e('panturrilha-sentada', 'Panturrilha sentada', 3, '10–12', 60, ['Panturrilhas'], ['Use amplitude confortável.', 'Suba até contrair bem.', 'Desça lentamente.'], 'panturrilha sentada máquina execução correta'),
      e('cardio-sex', 'Esteira', 1, '20–30 min', 0, ['Cardio'], ['Finalize com ritmo sustentável.', 'A referência inicial é 5,5 km/h.', 'Aumente intensidade aos poucos.'], 'caminhada esteira técnica postura', 'cardio'),
    ],
  },
]

export const ALL_EXERCISES = WORKOUTS.flatMap((workout) =>
  workout.exercises.map((exercise) => ({ ...exercise, workout: workout.title })),
)

export function getTodayWorkout() {
  const weekday = new Date().getDay()
  return WORKOUTS.find((workout) => workout.weekday === weekday) ?? WORKOUTS[0]
}
