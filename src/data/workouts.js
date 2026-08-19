export const PROFILE = {
  startWeight: 97,
  startWaist: 108,
  goalMin: 80,
  goalMax: 83,
}

const exercise = ({
  id,
  name,
  sets,
  reps,
  rest,
  muscleGroups,
  instructions,
  demoQuery,
  substitutions = [],
  progression = 'double-progression',
  type = 'strength',
  equipment = 'Máquina / academia',
  note = '',
}) => ({
  id,
  name,
  sets,
  reps,
  rest,
  muscleGroups,
  instructions,
  demoQuery,
  substitutions,
  progression,
  type,
  equipment,
  note,
})

export const EXERCISE_CATALOG = {
  'supino-reto-articulado': exercise({
    id: 'supino-reto-articulado', name: 'Supino reto articulado', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Peito', 'Tríceps', 'Ombro'], equipment: 'Máquina articulada',
    instructions: ['Ajuste o banco para as manoplas ficarem próximas da linha média do peito.', 'Mantenha escápulas apoiadas e pés firmes.', 'Empurre com controle sem perder a posição dos ombros.'],
    demoQuery: 'supino reto articulado máquina execução correta',
    substitutions: ['supino-inclinado-articulado', 'supino-reto-halteres'],
  }),
  'supino-inclinado-articulado': exercise({
    id: 'supino-inclinado-articulado', name: 'Supino inclinado articulado', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Peito', 'Tríceps', 'Ombro'], equipment: 'Máquina articulada',
    instructions: ['Ajuste o assento para empurrar em direção à parte alta do peito.', 'Mantenha ombros para baixo e para trás.', 'Controle a descida e não bata as placas.'],
    demoQuery: 'supino inclinado articulado máquina execução correta',
    substitutions: ['supino-reto-articulado', 'supino-inclinado-halteres'],
  }),
  'supino-reto-halteres': exercise({
    id: 'supino-reto-halteres', name: 'Supino reto com halteres', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Peito', 'Tríceps', 'Ombro'], equipment: 'Banco + halteres',
    instructions: ['Pés firmes e escápulas apoiadas.', 'Desça os halteres com controle ao lado do peito.', 'Suba mantendo punhos alinhados.'],
    demoQuery: 'supino reto halteres execução correta',
    substitutions: ['supino-reto-articulado', 'supino-inclinado-articulado'],
  }),
  'supino-inclinado-halteres': exercise({
    id: 'supino-inclinado-halteres', name: 'Supino inclinado com halteres', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Peito', 'Tríceps', 'Ombro'], equipment: 'Banco inclinado + halteres',
    instructions: ['Use inclinação moderada.', 'Mantenha pés firmes e escápulas apoiadas.', 'Desça e suba sem deixar os ombros avançarem.'],
    demoQuery: 'supino inclinado halteres execução correta', substitutions: ['supino-inclinado-articulado', 'supino-reto-articulado'],
  }),
  'puxador-aberto': exercise({
    id: 'puxador-aberto', name: 'Puxador aberto', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Costas', 'Bíceps'], equipment: 'Puxador / polia alta',
    instructions: ['Prenda as pernas e mantenha o peito aberto.', 'Puxe a barra em direção à parte alta do peito.', 'Controle a volta sem deixar o peso puxar seus ombros.'],
    demoQuery: 'puxador aberto frente execução correta', substitutions: ['puxador-articulado-circular', 'puxada-neutra-polia'],
  }),
  'puxador-articulado-circular': exercise({
    id: 'puxador-articulado-circular', name: 'Puxador articulado circular', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Costas', 'Bíceps'], equipment: 'Máquina articulada',
    instructions: ['Ajuste o banco para alcançar as pegadas sem elevar os ombros.', 'Puxe guiando os cotovelos para baixo.', 'Retorne controlando toda a amplitude.'],
    demoQuery: 'puxador articulado máquina circular costas execução', substitutions: ['puxador-aberto', 'puxada-neutra-polia'],
  }),
  'puxada-neutra-polia': exercise({
    id: 'puxada-neutra-polia', name: 'Puxada neutra na polia', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Costas', 'Bíceps'], equipment: 'Polia alta + triângulo',
    instructions: ['Mantenha o peito aberto.', 'Puxe o triângulo em direção ao peito.', 'Evite balançar o tronco.'],
    demoQuery: 'puxada neutra triângulo polia execução correta', substitutions: ['puxador-aberto', 'puxador-articulado-circular'],
  }),
  'remada-articulada-unilateral': exercise({
    id: 'remada-articulada-unilateral', name: 'Remada articulada unilateral', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Costas', 'Bíceps'], equipment: 'Máquina articulada',
    instructions: ['Apoie bem o peito ou tronco conforme a máquina.', 'Puxe o cotovelo para trás sem girar o corpo.', 'Retorne até alongar as costas mantendo controle.'],
    demoQuery: 'remada articulada unilateral máquina execução correta', substitutions: ['remada-cavalinho-pronada', 'remada-serrote-halter'],
  }),
  'remada-cavalinho-pronada': exercise({
    id: 'remada-cavalinho-pronada', name: 'Remada cavalinho pegada pronada', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Costas', 'Bíceps'], equipment: 'Máquina / cavalinho',
    instructions: ['Mantenha coluna neutra e tronco estável.', 'Puxe levando os cotovelos para trás.', 'Controle a descida sem perder a postura.'],
    demoQuery: 'remada cavalinho pegada pronada execução correta', substitutions: ['remada-articulada-unilateral', 'remada-serrote-halter'],
  }),
  'remada-serrote-halter': exercise({
    id: 'remada-serrote-halter', name: 'Remada serrote com halter', sets: 3, reps: '8–12', rest: 90,
    muscleGroups: ['Costas', 'Bíceps'], equipment: 'Banco + halter',
    instructions: ['Apoie uma mão no banco e mantenha a coluna neutra.', 'Puxe o halter em direção ao quadril.', 'Evite girar o tronco.'],
    demoQuery: 'remada serrote halter execução correta', substitutions: ['remada-articulada-unilateral', 'remada-cavalinho-pronada'],
  }),
  'crucifixo-fly': exercise({
    id: 'crucifixo-fly', name: 'Crucifixo no Fly / voador', sets: 2, reps: '10–15', rest: 75,
    muscleGroups: ['Peito'], equipment: 'Voador / peck deck',
    instructions: ['Ajuste o banco para braços alinhados ao peito.', 'Feche os braços sem bater as manoplas.', 'Volte devagar sentindo alongar o peitoral.'],
    demoQuery: 'crucifixo fly voador peck deck execução correta', substitutions: ['crossover-peito', 'supino-reto-articulado'],
  }),
  'crossover-peito': exercise({
    id: 'crossover-peito', name: 'Crossover para peito', sets: 2, reps: '10–15', rest: 75,
    muscleGroups: ['Peito'], equipment: 'Crossover / polias',
    instructions: ['Posicione uma perna à frente e tronco estável.', 'Traga as mãos à frente do peito com leve flexão dos cotovelos.', 'Controle a abertura sem exagerar a amplitude.'],
    demoQuery: 'crossover peito polia execução correta', substitutions: ['crucifixo-fly', 'supino-reto-articulado'],
  }),
  'elevacao-lateral': exercise({
    id: 'elevacao-lateral', name: 'Elevação lateral', sets: 2, reps: '12–15', rest: 75,
    muscleGroups: ['Ombros'], equipment: 'Halteres ou máquina',
    instructions: ['Use carga que permita controle total.', 'Suba até aproximadamente a linha dos ombros.', 'Evite embalo e encolher os ombros.'],
    demoQuery: 'elevação lateral halteres execução correta', substitutions: ['elevacao-lateral-polia', 'desenvolvimento-articulado-neutro'],
  }),
  'elevacao-lateral-polia': exercise({
    id: 'elevacao-lateral-polia', name: 'Elevação lateral na polia', sets: 2, reps: '12–15', rest: 75,
    muscleGroups: ['Ombros'], equipment: 'Polia baixa',
    instructions: ['Fique estável ao lado da polia.', 'Eleve o braço sem girar o tronco.', 'Desça devagar mantendo tensão.'],
    demoQuery: 'elevação lateral polia execução correta', substitutions: ['elevacao-lateral', 'desenvolvimento-articulado-neutro'],
  }),
  'desenvolvimento-articulado-neutro': exercise({
    id: 'desenvolvimento-articulado-neutro', name: 'Desenvolvimento articulado pegada neutra', sets: 2, reps: '8–12', rest: 90,
    muscleGroups: ['Ombros', 'Tríceps'], equipment: 'Máquina articulada',
    instructions: ['Ajuste o assento para as pegadas iniciarem perto dos ombros.', 'Mantenha costas apoiadas.', 'Empurre sem arquear a lombar.'],
    demoQuery: 'desenvolvimento articulado pegada neutra máquina execução', substitutions: ['elevacao-lateral', 'elevacao-lateral-polia'],
  }),
  'crucifixo-inverso-voador': exercise({
    id: 'crucifixo-inverso-voador', name: 'Crucifixo inverso no voador', sets: 2, reps: '12–15', rest: 75,
    muscleGroups: ['Ombro posterior', 'Costas'], equipment: 'Voador reverso',
    instructions: ['Ajuste o banco para braços ficarem na linha dos ombros.', 'Abra os braços levando cotovelos para trás.', 'Evite encolher os ombros.'],
    demoQuery: 'crucifixo inverso voador reverse pec deck execução correta', substitutions: ['remada-articulada-unilateral', 'face-pull-polia'],
  }),
  'face-pull-polia': exercise({
    id: 'face-pull-polia', name: 'Face pull na polia', sets: 2, reps: '12–15', rest: 75,
    muscleGroups: ['Ombro posterior', 'Costas'], equipment: 'Polia alta + corda',
    instructions: ['Ajuste a corda na altura do rosto.', 'Puxe separando as pontas da corda.', 'Mantenha o peito aberto e evite arquear a lombar.'],
    demoQuery: 'face pull corda polia execução correta', substitutions: ['crucifixo-inverso-voador', 'remada-articulada-unilateral'],
  }),
  'rosca-scott-maquina': exercise({
    id: 'rosca-scott-maquina', name: 'Rosca Scott máquina', sets: 2, reps: '10–12', rest: 75,
    muscleGroups: ['Bíceps'], equipment: 'Máquina Scott',
    instructions: ['Apoie completamente os braços no banco.', 'Flexione sem tirar os cotovelos do apoio.', 'Desça controlando sem travar os cotovelos.'],
    demoQuery: 'rosca scott máquina execução correta', substitutions: ['rosca-martelo-sentado', 'rosca-polia-barra'],
  }),
  'rosca-martelo-sentado': exercise({
    id: 'rosca-martelo-sentado', name: 'Rosca martelo sentado', sets: 2, reps: '10–12', rest: 75,
    muscleGroups: ['Bíceps', 'Antebraço'], equipment: 'Banco + halteres',
    instructions: ['Sente com tronco estável.', 'Mantenha pegada neutra e cotovelos próximos ao corpo.', 'Suba e desça sem embalo.'],
    demoQuery: 'rosca martelo sentado halteres execução correta', substitutions: ['rosca-scott-maquina', 'rosca-polia-barra'],
  }),
  'rosca-polia-barra': exercise({
    id: 'rosca-polia-barra', name: 'Rosca direta na polia com barra', sets: 2, reps: '10–12', rest: 75,
    muscleGroups: ['Bíceps'], equipment: 'Polia baixa + barra',
    instructions: ['Cotovelos próximos ao corpo.', 'Flexione sem avançar os ombros.', 'Desça controlando o cabo.'],
    demoQuery: 'rosca direta polia barra execução correta', substitutions: ['rosca-scott-maquina', 'rosca-martelo-sentado'],
  }),
  'triceps-pulley': exercise({
    id: 'triceps-pulley', name: 'Tríceps pulley na polia alta', sets: 2, reps: '10–12', rest: 75,
    muscleGroups: ['Tríceps'], equipment: 'Polia alta + barra',
    instructions: ['Fixe os cotovelos ao lado do corpo.', 'Estenda os cotovelos sem jogar o tronco sobre a barra.', 'Retorne devagar.'],
    demoQuery: 'tríceps pulley barra polia alta execução correta', substitutions: ['triceps-corda', 'triceps-unilateral-polia'],
  }),
  'triceps-corda': exercise({
    id: 'triceps-corda', name: 'Tríceps pulley com corda', sets: 2, reps: '10–12', rest: 75,
    muscleGroups: ['Tríceps'], equipment: 'Polia alta + corda',
    instructions: ['Mantenha cotovelos fixos.', 'Estenda e abra levemente a corda no final.', 'Controle a volta.'],
    demoQuery: 'tríceps corda polia execução correta', substitutions: ['triceps-pulley', 'triceps-unilateral-polia'],
  }),
  'triceps-unilateral-polia': exercise({
    id: 'triceps-unilateral-polia', name: 'Tríceps unilateral na polia', sets: 2, reps: '10–12', rest: 75,
    muscleGroups: ['Tríceps'], equipment: 'Polia alta',
    instructions: ['Posicione o cotovelo junto ao corpo.', 'Estenda sem girar o tronco.', 'Retorne controlando.'],
    demoQuery: 'triceps unilateral polia execução correta', substitutions: ['triceps-pulley', 'triceps-corda'],
  }),
  'leg-press-45': exercise({
    id: 'leg-press-45', name: 'Leg Press 45°', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Quadríceps', 'Glúteos'], equipment: 'Leg Press 45°',
    instructions: ['Mantenha quadril e lombar apoiados.', 'Desça até onde conserva controle e alinhamento.', 'Empurre sem travar os joelhos.'],
    demoQuery: 'leg press 45 execução correta', substitutions: ['leg-press-180', 'agachamento-hack'],
  }),
  'leg-press-180': exercise({
    id: 'leg-press-180', name: 'Leg Press 180°', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Quadríceps', 'Glúteos'], equipment: 'Leg Press horizontal',
    instructions: ['Ajuste o banco para boa amplitude sem levantar o quadril.', 'Joelhos acompanham a direção dos pés.', 'Empurre sem travar os joelhos.'],
    demoQuery: 'leg press horizontal 180 execução correta', substitutions: ['leg-press-45', 'agachamento-hack'],
  }),
  'agachamento-hack': exercise({
    id: 'agachamento-hack', name: 'Agachamento Hack', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Quadríceps', 'Glúteos'], equipment: 'Hack squat',
    instructions: ['Apoie costas e ombros.', 'Mantenha os joelhos acompanhando os pés.', 'Desça com amplitude confortável e controle.'],
    demoQuery: 'agachamento hack máquina execução correta', substitutions: ['leg-press-45', 'leg-press-180'],
  }),
  'cadeira-extensora': exercise({
    id: 'cadeira-extensora', name: 'Cadeira extensora', sets: 3, reps: '10–15', rest: 75,
    muscleGroups: ['Quadríceps'], equipment: 'Cadeira extensora',
    instructions: ['Alinhe o eixo da máquina com o joelho.', 'Estenda mantendo quadril e costas apoiados.', 'Desça devagar.'],
    demoQuery: 'cadeira extensora execução correta', substitutions: ['leg-press-180', 'agachamento-hack'],
  }),
  'mesa-flexora': exercise({
    id: 'mesa-flexora', name: 'Mesa flexora', sets: 3, reps: '10–15', rest: 90,
    muscleGroups: ['Posteriores'], equipment: 'Mesa flexora',
    instructions: ['Ajuste o rolo acima dos calcanhares.', 'Mantenha o quadril apoiado.', 'Flexione e retorne lentamente.'],
    demoQuery: 'mesa flexora execução correta', substitutions: ['cadeira-flexora', 'flexor-em-pe'],
  }),
  'cadeira-flexora': exercise({
    id: 'cadeira-flexora', name: 'Cadeira flexora', sets: 3, reps: '10–15', rest: 90,
    muscleGroups: ['Posteriores'], equipment: 'Cadeira flexora',
    instructions: ['Ajuste encosto e rolos.', 'Mantenha quadril no banco.', 'Flexione e controle a volta.'],
    demoQuery: 'cadeira flexora execução correta', substitutions: ['mesa-flexora', 'flexor-em-pe'],
  }),
  'flexor-em-pe': exercise({
    id: 'flexor-em-pe', name: 'Flexor em pé', sets: 2, reps: '10–12', rest: 75,
    muscleGroups: ['Posteriores'], equipment: 'Flexor em pé',
    instructions: ['Apoie o tronco e estabilize a perna de base.', 'Flexione o joelho sem girar o quadril.', 'Retorne devagar.'],
    demoQuery: 'flexor em pé máquina execução correta', substitutions: ['mesa-flexora', 'cadeira-flexora'],
  }),
  'cadeira-abdutora': exercise({
    id: 'cadeira-abdutora', name: 'Cadeira abdutora', sets: 2, reps: '12–15', rest: 75,
    muscleGroups: ['Glúteos'], equipment: 'Cadeira abdutora',
    instructions: ['Mantenha tronco estável.', 'Abra as pernas com controle.', 'Retorne sem deixar o peso bater.'],
    demoQuery: 'cadeira abdutora execução correta', substitutions: ['abducao-polia', 'agachamento-sumo-halter'],
  }),
  'abducao-polia': exercise({
    id: 'abducao-polia', name: 'Abdução de quadril na polia', sets: 2, reps: '12–15', rest: 75,
    muscleGroups: ['Glúteos'], equipment: 'Polia baixa + tornozeleira',
    instructions: ['Apoie-se para ficar estável.', 'Afaste a perna sem inclinar o tronco.', 'Retorne lentamente.'],
    demoQuery: 'abdução quadril polia execução correta', substitutions: ['cadeira-abdutora', 'agachamento-sumo-halter'],
  }),
  'adutor-sentado': exercise({
    id: 'adutor-sentado', name: 'Adutor sentado', sets: 2, reps: '12–15', rest: 75,
    muscleGroups: ['Adutores'], equipment: 'Máquina adutora',
    instructions: ['Ajuste a abertura sem forçar o quadril.', 'Feche as pernas controlando.', 'Retorne devagar mantendo tensão.'],
    demoQuery: 'máquina adutora sentado execução correta', substitutions: ['agachamento-sumo-halter', 'leg-press-180'],
  }),
  'agachamento-sumo-halter': exercise({
    id: 'agachamento-sumo-halter', name: 'Agachamento sumô com halter', sets: 2, reps: '10–15', rest: 90,
    muscleGroups: ['Glúteos', 'Adutores', 'Quadríceps'], equipment: 'Halter',
    instructions: ['Abra os pés de forma confortável.', 'Mantenha tronco estável e joelhos acompanhando os pés.', 'Desça até onde mantém boa postura.'],
    demoQuery: 'agachamento sumô halter execução correta', substitutions: ['adutor-sentado', 'leg-press-180'],
  }),
  'elevacao-pelvica-articulada': exercise({
    id: 'elevacao-pelvica-articulada', name: 'Elevação pélvica articulada', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Glúteos', 'Posteriores'], equipment: 'Máquina de elevação pélvica',
    instructions: ['Ajuste o apoio sobre o quadril e firme os pés.', 'Suba contraindo os glúteos.', 'Pare no topo sem hiperestender a lombar.'],
    demoQuery: 'elevação pélvica articulada máquina execução correta', substitutions: ['elevacao-pelvica-smith', 'agachamento-sumo-halter'],
  }),
  'elevacao-pelvica-smith': exercise({
    id: 'elevacao-pelvica-smith', name: 'Elevação pélvica no Smith', sets: 3, reps: '8–12', rest: 120,
    muscleGroups: ['Glúteos', 'Posteriores'], equipment: 'Smith + banco',
    instructions: ['Apoie a parte alta das costas no banco.', 'Posicione a barra protegida sobre o quadril.', 'Suba contraindo glúteos sem arquear a lombar.'],
    demoQuery: 'hip thrust smith execução correta', substitutions: ['elevacao-pelvica-articulada', 'agachamento-sumo-halter'],
  }),
  'panturrilha-maquina': exercise({
    id: 'panturrilha-maquina', name: 'Panturrilha na máquina', sets: 3, reps: '10–15', rest: 75,
    muscleGroups: ['Panturrilhas'], equipment: 'Máquina de panturrilha',
    instructions: ['Desça o calcanhar com controle.', 'Suba até contrair a panturrilha.', 'Evite quicar.'],
    demoQuery: 'panturrilha máquina execução correta', substitutions: ['panturrilha-em-pe', 'panturrilha-leg-press'],
  }),
  'panturrilha-em-pe': exercise({
    id: 'panturrilha-em-pe', name: 'Panturrilha em pé', sets: 3, reps: '10–15', rest: 75,
    muscleGroups: ['Panturrilhas'], equipment: 'Máquina em pé',
    instructions: ['Mantenha joelhos destravados.', 'Desça o calcanhar lentamente.', 'Suba até contrair bem.'],
    demoQuery: 'panturrilha em pé máquina execução correta', substitutions: ['panturrilha-maquina', 'panturrilha-leg-press'],
  }),
  'panturrilha-leg-press': exercise({
    id: 'panturrilha-leg-press', name: 'Panturrilha no Leg Press', sets: 3, reps: '10–15', rest: 75,
    muscleGroups: ['Panturrilhas'], equipment: 'Leg Press',
    instructions: ['Apoie apenas a parte da frente dos pés na plataforma.', 'Movimente o tornozelo sem flexionar os joelhos.', 'Controle toda a amplitude.'],
    demoQuery: 'panturrilha leg press execução correta', substitutions: ['panturrilha-maquina', 'panturrilha-em-pe'],
  }),
  'crunch-polia': exercise({
    id: 'crunch-polia', name: 'Crunch abdominal na polia alta', sets: 3, reps: '10–15', rest: 60,
    muscleGroups: ['Core'], equipment: 'Polia alta + corda',
    instructions: ['Segure a corda ao lado da cabeça.', 'Flexione o tronco aproximando costelas e quadril.', 'Evite puxar a carga apenas com os braços.'],
    demoQuery: 'crunch abdominal polia alta corda execução correta', substitutions: ['abdominal-maquina', 'elevacao-joelhos-cadeira-romana'],
  }),
  'abdominal-maquina': exercise({
    id: 'abdominal-maquina', name: 'Abdominal na máquina', sets: 3, reps: '10–15', rest: 60,
    muscleGroups: ['Core'], equipment: 'Máquina abdominal (se disponível)',
    instructions: ['Ajuste o banco e o apoio ao seu tronco.', 'Flexione o abdômen sem usar impulso.', 'Retorne lentamente.'],
    demoQuery: 'abdominal máquina execução correta', substitutions: ['crunch-polia', 'elevacao-joelhos-cadeira-romana'],
  }),
  'elevacao-joelhos-cadeira-romana': exercise({
    id: 'elevacao-joelhos-cadeira-romana', name: 'Elevação de joelhos na cadeira romana', sets: 3, reps: '10–15', rest: 60,
    muscleGroups: ['Core'], equipment: 'Cadeira romana (se disponível)',
    instructions: ['Apoie antebraços e costas.', 'Eleve os joelhos sem balançar.', 'Desça controlando.'],
    demoQuery: 'elevação joelhos cadeira romana execução correta', substitutions: ['crunch-polia', 'abdominal-maquina'],
  }),
  'pallof-press': exercise({
    id: 'pallof-press', name: 'Pallof Press na polia', sets: 3, reps: '10–15 por lado', rest: 60,
    muscleGroups: ['Core'], equipment: 'Polia',
    instructions: ['Fique de lado para a polia com base firme.', 'Empurre a alça à frente sem deixar o tronco girar.', 'Volte devagar mantendo o abdômen ativo.'],
    demoQuery: 'pallof press polia execução correta', substitutions: ['rotacao-polia', 'crunch-polia'],
  }),
  'rotacao-polia': exercise({
    id: 'rotacao-polia', name: 'Rotação de tronco na polia', sets: 3, reps: '10–15 por lado', rest: 60,
    muscleGroups: ['Core'], equipment: 'Polia',
    instructions: ['Use carga leve e base firme.', 'Gire o tronco de forma controlada.', 'Evite puxar apenas com os braços.'],
    demoQuery: 'rotação tronco polia core execução correta', substitutions: ['pallof-press', 'crunch-polia'],
  }),
  'farmer-carry': exercise({
    id: 'farmer-carry', name: 'Farmer Carry com halteres', sets: 3, reps: '30–45 s', rest: 60,
    muscleGroups: ['Core', 'Antebraço', 'Trapézio'], equipment: 'Halteres + espaço para caminhar',
    instructions: ['Segure halteres ao lado do corpo.', 'Caminhe com postura alta e abdômen firme.', 'Use carga que permita passos estáveis.'],
    demoQuery: 'farmer carry halteres execução correta', substitutions: ['suitcase-carry', 'encolhimento-halteres'],
  }),
  'suitcase-carry': exercise({
    id: 'suitcase-carry', name: 'Suitcase Carry', sets: 3, reps: '30–45 s por lado', rest: 60,
    muscleGroups: ['Core', 'Antebraço'], equipment: 'Halter',
    instructions: ['Segure um halter de um lado só.', 'Caminhe sem inclinar o tronco.', 'Troque o lado a cada série.'],
    demoQuery: 'suitcase carry dumbbell execução correta', substitutions: ['farmer-carry', 'pallof-press'],
  }),
  'encolhimento-halteres': exercise({
    id: 'encolhimento-halteres', name: 'Encolhimento com halteres', sets: 3, reps: '10–15', rest: 75,
    muscleGroups: ['Trapézio', 'Antebraço'], equipment: 'Halteres',
    instructions: ['Segure os halteres ao lado do corpo.', 'Eleve os ombros sem girá-los.', 'Desça controlando.'],
    demoQuery: 'encolhimento halteres execução correta', substitutions: ['farmer-carry', 'suitcase-carry'],
  }),
  'cardio-moderado': exercise({
    id: 'cardio-moderado', name: 'Cardio moderado', sets: 1, reps: '20–30 min', rest: 0,
    muscleGroups: ['Cardio'], equipment: 'Esteira, bicicleta ou elíptico', type: 'cardio', progression: 'cardio',
    instructions: ['Use ritmo em que consegue falar frases curtas.', 'Escolha esteira, bicicleta ou elíptico conforme conforto.', 'Aumente duração ou intensidade aos poucos.'],
    demoQuery: 'cardio moderado esteira postura caminhada', substitutions: ['cardio-bicicleta', 'cardio-eliptico'],
  }),
  'cardio-bicicleta': exercise({
    id: 'cardio-bicicleta', name: 'Bicicleta ergométrica', sets: 1, reps: '20–30 min', rest: 0,
    muscleGroups: ['Cardio'], equipment: 'Bicicleta', type: 'cardio', progression: 'cardio',
    instructions: ['Ajuste o banco para pedalar sem fechar demais o joelho.', 'Mantenha ritmo confortável.', 'Suba resistência gradualmente.'],
    demoQuery: 'bicicleta ergométrica ajuste postura', substitutions: ['cardio-moderado', 'cardio-eliptico'],
  }),
  'cardio-eliptico': exercise({
    id: 'cardio-eliptico', name: 'Elíptico', sets: 1, reps: '20–30 min', rest: 0,
    muscleGroups: ['Cardio'], equipment: 'Elíptico', type: 'cardio', progression: 'cardio',
    instructions: ['Mantenha postura alta.', 'Use ritmo contínuo e confortável.', 'Aumente resistência gradualmente.'],
    demoQuery: 'elíptico academia postura execução', substitutions: ['cardio-moderado', 'cardio-bicicleta'],
  }),
}

const pick = (...ids) => ids.map((id) => EXERCISE_CATALOG[id])

export const WORKOUTS = [
  {
    id: 'upper-a', weekday: 1, shortDay: 'SEG', day: 'Segunda-feira', title: 'Superior A',
    subtitle: 'Peito, costas, ombros e braços · foco em máquinas e progressão',
    exercises: pick('supino-reto-articulado', 'puxador-aberto', 'remada-articulada-unilateral', 'crucifixo-fly', 'elevacao-lateral', 'rosca-scott-maquina', 'triceps-pulley'),
  },
  {
    id: 'lower-a', weekday: 2, shortDay: 'TER', day: 'Terça-feira', title: 'Inferior A',
    subtitle: 'Quadríceps, posteriores, glúteos, adutores e panturrilhas',
    exercises: pick('leg-press-45', 'cadeira-extensora', 'mesa-flexora', 'cadeira-abdutora', 'adutor-sentado', 'panturrilha-maquina'),
  },
  {
    id: 'core', weekday: 3, shortDay: 'QUA', day: 'Quarta-feira', title: 'Core + Cardio',
    subtitle: 'Core sem chão + condicionamento moderado',
    exercises: pick('crunch-polia', 'pallof-press', 'farmer-carry', 'cardio-moderado'),
  },
  {
    id: 'upper-b', weekday: 4, shortDay: 'QUI', day: 'Quinta-feira', title: 'Superior B',
    subtitle: 'Ângulos diferentes, deltoide posterior e braços',
    exercises: pick('supino-inclinado-articulado', 'puxador-articulado-circular', 'remada-cavalinho-pronada', 'desenvolvimento-articulado-neutro', 'crucifixo-inverso-voador', 'rosca-martelo-sentado', 'triceps-corda'),
  },
  {
    id: 'lower-b', weekday: 5, shortDay: 'SEX', day: 'Sexta-feira', title: 'Inferior B',
    subtitle: 'Posteriores, glúteos, pernas e panturrilhas',
    exercises: pick('leg-press-180', 'mesa-flexora', 'elevacao-pelvica-articulada', 'flexor-em-pe', 'cadeira-abdutora', 'panturrilha-em-pe'),
  },
]

const planIds = new Set(WORKOUTS.flatMap((workout) => workout.exercises.map((item) => item.id)))

export const ALL_EXERCISES = Object.values(EXERCISE_CATALOG).map((item) => ({
  ...item,
  workout: WORKOUTS.find((workout) => workout.exercises.some((exerciseItem) => exerciseItem.id === item.id))?.title ?? 'Substituição',
  inPlan: planIds.has(item.id),
}))

export function getExerciseById(id) {
  return EXERCISE_CATALOG[id] ?? null
}

export function getSubstitutions(exerciseId) {
  const item = getExerciseById(exerciseId)
  return (item?.substitutions ?? []).slice(0, 2).map(getExerciseById).filter(Boolean)
}

export function getTodayWorkout() {
  const weekday = new Date().getDay()
  return WORKOUTS.find((workout) => workout.weekday === weekday) ?? WORKOUTS[0]
}
