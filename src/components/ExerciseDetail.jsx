import { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ChevronRight,
  CirclePlay,
  Dumbbell,
  History,
  Pencil,
  RefreshCw,
  Save,
  X,
} from 'lucide-react'
import { ALL_EXERCISES } from '../data/workouts'
import { getVideoDemo, getYoutubeEmbedUrl, getYoutubeThumbnail } from '../data/videos'
import { useLocalStorage } from '../hooks/useLocalStorage'

function uniqueExercises() {
  const map = new Map()
  ALL_EXERCISES.forEach((item) => {
    const key = item.name.toLowerCase()
    if (!map.has(key)) map.set(key, item)
  })
  return Array.from(map.values())
}

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
        <strong>Demonstração em seleção</strong>
        <span>Vamos escolher a máquina mais parecida possível com a da sua academia.</span>
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

export default function ExerciseDetail({ exercise, onClose, onSelectExercise, setLogs }) {
  const [notes, setNotes] = useLocalStorage('project83-exercise-notes', {})
  const [mode, setMode] = useState(null)
  const [draft, setDraft] = useState(notes[exercise?.name] ?? '')
  const substitutionRef = useRef(null)

  const substitutions = useMemo(() => {
    if (!exercise) return []
    const all = uniqueExercises()
    const muscles = new Set(exercise.muscleGroups)
    return all
      .filter((item) => item.name !== exercise.name)
      .map((item) => ({
        item,
        score: item.muscleGroups.reduce((sum, muscle) => sum + (muscles.has(muscle) ? 1 : 0), 0),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ item }) => item)
  }, [exercise])

  if (!exercise) return null

  const videoFor = (item) => getVideoDemo(item.id)

  const openNotes = () => {
    setDraft(notes[exercise.name] ?? '')
    setMode(mode === 'note' ? null : 'note')
  }

  const saveNote = () => {
    setNotes((current) => ({ ...current, [exercise.name]: draft.trim() }))
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

        <div className="exercise-detail-content">
          <div className="detail-title-block">
            <h1>{exercise.name}</h1>
            <div className="detail-prescription-row">
              <strong>{exercise.type === 'cardio' ? exercise.reps : `${exercise.sets} × ${exercise.reps}`}</strong>
              {exercise.type !== 'cardio' && <span>{exercise.rest}s de descanso</span>}
              {exercise.muscleGroups.map((muscle) => <span key={muscle}>{muscle}</span>)}
            </div>
          </div>

          <section className="detail-description-card">
            <p>{buildDescription(exercise)}</p>
          </section>

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
                placeholder="Ex.: banco na posição 4, usar 20 kg na próxima semana..."
              />
              <button onClick={saveNote}><Save size={17} /> Salvar nota</button>
            </section>
          )}

          {mode === 'history' && <CurrentHistory exercise={exercise} setLogs={setLogs} />}

          <section className="detail-substitutions" ref={substitutionRef}>
            <div className="detail-section-heading">
              <div>
                <span>ALTERNATIVAS</span>
                <h2>Exercícios de Substituição</h2>
              </div>
            </div>

            <div className="detail-sub-list">
              {substitutions.map((item) => {
                const video = videoFor(item)
                return (
                  <button key={item.id} onClick={() => onSelectExercise(item)}>
                    <div className="detail-sub-thumb">
                      {video ? <img src={getYoutubeThumbnail(video)} alt="" loading="lazy" /> : <Dumbbell size={20} />}
                      {video && <CirclePlay size={20} />}
                    </div>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.muscleGroups.join(' · ')}</span>
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
