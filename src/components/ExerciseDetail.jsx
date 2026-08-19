import { useRef, useState } from 'react'
import {
  ArrowLeft,
  ChevronRight,
  CirclePlay,
  Dumbbell,
  History,
  Pencil,
  RefreshCw,
  Save,
  TrendingUp,
  Wrench,
  X,
} from 'lucide-react'
import { getSubstitutions } from '../data/workouts'
import { getVideoDemo, getVideoStatusLabel, getYoutubeEmbedUrl, getYoutubeThumbnail } from '../data/videos'
import { useLocalStorage } from '../hooks/useLocalStorage'

function buildDescription(exercise) {
  return exercise.instructions.join(' ')
}

function ExerciseHero({ exercise }) {
  const video = getVideoDemo(exercise.id)
  const [playing, setPlaying] = useState(false)

  if (!video) {
    return (
      <div className="exercise-detail-hero detail-no-video">
        <Dumbbell size={42} />
        <strong>Vídeo indisponível</strong>
        <span>Este exercício ainda não possui uma demonstração vinculada.</span>
      </div>
    )
  }

  if (playing) {
    return (
      <div className={video.format === 'short' ? 'exercise-detail-hero detail-video short' : 'exercise-detail-hero detail-video'}>
        <iframe
          src={`${getYoutubeEmbedUrl(video)}&autoplay=1`}
          title={`Demonstração: ${exercise.name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <button className="exercise-detail-hero detail-poster" onClick={() => setPlaying(true)} aria-label={`Reproduzir ${exercise.name}`}>
      <img src={getYoutubeThumbnail(video)} alt={`Demonstração de ${exercise.name}`} />
      <span className="detail-play"><CirclePlay size={42} /></span>
      <span className="detail-play-copy">Ver execução</span>
    </button>
  )
}

function ActionButton({ icon: Icon, label, active, onClick }) {
  return (
    <button className={active ? 'detail-action active' : 'detail-action'} onClick={onClick}>
      <span><Icon size={27} /></span>
      <strong>{label}</strong>
    </button>
  )
}

function CurrentHistory({ exercise, setLogs }) {
  const rows = Object.entries(setLogs)
    .filter(([key]) => key.includes(`:${exercise.id}:`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, value], index) => ({ index: index + 1, ...value }))

  return (
    <section className="detail-inline-panel">
      <div className="detail-inline-title">
        <History size={18} />
        <strong>Registro atual</strong>
      </div>
      {rows.length ? (
        <div className="detail-history-rows">
          {rows.map((row) => (
            <div key={row.index}>
              <span>Série {row.index}</span>
              <strong>{row.load || '—'} kg</strong>
              <strong>{row.reps || '—'} reps</strong>
              <span>{row.done ? '✓' : '—'}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>Ainda não há séries registradas para este exercício neste treino.</p>
      )}
    </section>
  )
}

function ProgressionCard({ exercise }) {
  const isCardio = exercise.type === 'cardio' || exercise.progression === 'cardio'
  return (
    <section className="detail-progression-card">
      <div className="detail-inline-title">
        <TrendingUp size={18} />
        <strong>Como progredir</strong>
      </div>
      {isCardio ? (
        <p>Primeiro complete o tempo proposto com conforto. Depois aumente aos poucos duração, inclinação ou resistência — uma variável por vez.</p>
      ) : (
        <p>Use uma carga que permita ficar dentro de <strong>{exercise.reps}</strong> com técnica limpa. Quando alcançar o topo da faixa em todas as séries, aumente o menor incremento disponível no próximo treino.</p>
      )}
    </section>
  )
}

export default function ExerciseDetail({ exercise, onClose, onSelectExercise, setLogs }) {
  const [notes, setNotes] = useLocalStorage('project83-exercise-notes', {})
  const [mode, setMode] = useState(null)
  const [draft, setDraft] = useState(notes[exercise?.id] ?? '')
  const substitutionRef = useRef(null)

  if (!exercise) return null

  const currentVideo = getVideoDemo(exercise.id)
  const substitutions = getSubstitutions(exercise.id)
  const videoFor = (item) => getVideoDemo(item.id)

  const openNotes = () => {
    setDraft(notes[exercise.id] ?? '')
    setMode(mode === 'note' ? null : 'note')
  }

  const saveNote = () => {
    setNotes((current) => ({ ...current, [exercise.id]: draft.trim() }))
    setMode(null)
  }

  const openSubstitution = () => {
    setMode(null)
    window.setTimeout(() => substitutionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 20)
  }

  return (
    <div className="exercise-detail-layer" role="dialog" aria-modal="true" aria-label={exercise.name}>
      <article className="exercise-detail-page">
        <button className="detail-back" onClick={onClose} aria-label="Voltar">
          <ArrowLeft size={28} />
        </button>
        <button className="detail-close-desktop" onClick={onClose} aria-label="Fechar">
          <X size={19} />
        </button>

        <ExerciseHero exercise={exercise} />
        {currentVideo?.status === 'equivalente' && (
          <div className="detail-video-status">{getVideoStatusLabel(currentVideo)}</div>
        )}

        <div className="exercise-detail-content">
          <div className="detail-title-block">
            <h1>{exercise.name}</h1>
            <div className="detail-prescription-row">
              <strong>{exercise.type === 'cardio' ? exercise.reps : `${exercise.sets} × ${exercise.reps}`}</strong>
              {exercise.type !== 'cardio' && <span>{exercise.rest}s descanso</span>}
              {exercise.muscleGroups.map((muscle) => <span key={muscle}>{muscle}</span>)}
            </div>
          </div>

          <section className="detail-equipment-row">
            <Wrench size={17} />
            <div><span>EQUIPAMENTO</span><strong>{exercise.equipment}</strong></div>
          </section>

          <section className="detail-description-card">
            <p>{buildDescription(exercise)}</p>
          </section>

          <ProgressionCard exercise={exercise} />

          <div className="detail-actions">
            <ActionButton icon={Pencil} label="Nova Nota" active={mode === 'note'} onClick={openNotes} />
            <ActionButton icon={RefreshCw} label="Substituição" onClick={openSubstitution} />
            <ActionButton icon={History} label="Histórico" active={mode === 'history'} onClick={() => setMode(mode === 'history' ? null : 'history')} />
          </div>

          {mode === 'note' && (
            <section className="detail-inline-panel note-panel">
              <label htmlFor="exercise-note">Sua nota para este exercício</label>
              <textarea
                id="exercise-note"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ex.: banco posição 4; próxima vez tentar 25 kg..."
              />
              <button onClick={saveNote}><Save size={17} /> Salvar nota</button>
            </section>
          )}

          {mode === 'history' && <CurrentHistory exercise={exercise} setLogs={setLogs} />}

          <section className="detail-substitutions" ref={substitutionRef}>
            <div className="detail-section-heading">
              <div>
                <span>SE A MÁQUINA ESTIVER OCUPADA</span>
                <h2>2 substituições escolhidas</h2>
              </div>
            </div>

            <div className="detail-sub-list">
              {substitutions.map((item, index) => {
                const video = videoFor(item)
                return (
                  <button key={item.id} onClick={() => onSelectExercise(item)}>
                    <div className="detail-sub-thumb">
                      {video ? <img src={getYoutubeThumbnail(video)} alt="" loading="lazy" /> : <Dumbbell size={20} />}
                      {video && <CirclePlay size={20} />}
                    </div>
                    <div>
                      <small>OPÇÃO {index + 1}</small>
                      <strong>{item.name}</strong>
                      <span>{item.equipment}</span>
                    </div>
                    <ChevronRight size={20} />
                  </button>
                )
              })}
            </div>
          </section>
        </div>
      </article>
    </div>
  )
}
