import { useEffect, useMemo, useState } from 'react'
import {
  Activity,
  ArrowDownRight,
  BarChart3,
  Check,
  ChevronRight,
  CirclePlay,
  Dumbbell,
  Flame,
  Gauge,
  Home,
  Library,
  Plus,
  Search,
  Target,
  TimerReset,
  TrendingDown,
  Trophy,
  Weight,
  X,
} from 'lucide-react'
import { ALL_EXERCISES, PROFILE, WORKOUTS, getTodayWorkout } from './data/workouts'
import { getVideoDemo, getYoutubeEmbedUrl, getYoutubeThumbnail } from './data/videos'
import { useLocalStorage } from './hooks/useLocalStorage'

const NAV = [
  { id: 'today', label: 'Hoje', icon: Home },
  { id: 'workouts', label: 'Treinos', icon: Dumbbell },
  { id: 'progress', label: 'Evolução', icon: BarChart3 },
  { id: 'exercises', label: 'Exercícios', icon: Library },
]

const isoToday = () => new Date().toISOString().slice(0, 10)

function formatKg(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark"><Activity size={20} /></div>
        <div>
          <strong>Projeto 83</strong>
          <span>mais forte, mais leve</span>
        </div>
      </div>

      <nav className="side-nav" aria-label="Navegação principal">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={activeView === id ? 'nav-item active' : 'nav-item'}
            onClick={() => onNavigate(id)}
          >
            <Icon size={19} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-goal">
        <div className="eyebrow"><Target size={14} /> OBJETIVO</div>
        <strong>80–83 kg</strong>
        <span>Partindo de 97,0 kg</span>
      </div>
    </aside>
  )
}

function MobileNav({ activeView, onNavigate }) {
  return (
    <nav className="mobile-nav" aria-label="Navegação mobile">
      {NAV.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          className={activeView === id ? 'active' : ''}
          onClick={() => onNavigate(id)}
        >
          <Icon size={21} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  )
}

function MetricCard({ icon: Icon, label, value, detail, accent = false }) {
  return (
    <article className={accent ? 'metric-card accent' : 'metric-card'}>
      <div className="metric-icon"><Icon size={20} /></div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {detail && <small>{detail}</small>}
      </div>
    </article>
  )
}

function ProgressLine({ entries }) {
  const valid = entries.filter((item) => Number(item.weight) > 0).slice(-8)
  const data = valid.length ? valid : [{ weight: PROFILE.startWeight }]
  const values = data.map((item) => Number(item.weight))
  const min = Math.min(...values, PROFILE.goalMax) - 1
  const max = Math.max(...values, PROFILE.startWeight) + 1
  const width = 680
  const height = 190
  const pad = 18
  const range = Math.max(max - min, 1)
  const points = values.map((value, index) => {
    const x = data.length === 1
      ? width / 2
      : pad + (index / (data.length - 1)) * (width - pad * 2)
    const y = pad + ((max - value) / range) * (height - pad * 2)
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="chart-wrap" aria-label="Gráfico de evolução do peso">
      <svg viewBox={`0 0 ${width} ${height}`} role="img">
        <line x1="0" x2={width} y1={height - 26} y2={height - 26} className="chart-grid" />
        <polyline points={points} className="chart-line" />
        {points.split(' ').map((point) => {
          const [cx, cy] = point.split(',')
          return <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" className="chart-dot" />
        })}
      </svg>
      <div className="chart-labels">
        <span>Início</span>
        <span>Meta 80–83 kg</span>
        <span>Agora</span>
      </div>
    </div>
  )
}

function ExerciseThumb({ exercise, size = 'small', onClick }) {
  const video = getVideoDemo(exercise.id)
  const className = `exercise-media-thumb ${size} ${video ? 'has-video' : 'no-video'}`

  const content = video ? (
    <>
      <img src={getYoutubeThumbnail(video)} alt="" loading="lazy" />
      <span className="thumb-play"><CirclePlay size={size === 'large' ? 30 : 22} /></span>
      {video.format === 'short' && <span className="short-chip">SHORT</span>}
    </>
  ) : (
    <>
      <Dumbbell size={22} />
      <span className="soon-chip">EM BREVE</span>
    </>
  )

  if (onClick) {
    return (
      <button className={className} onClick={onClick} aria-label={`Ver execução de ${exercise.name}`}>
        {content}
      </button>
    )
  }

  return <div className={className}>{content}</div>
}

function WeekStrip({ sessions, onOpenWorkout }) {
  const now = new Date()
  const monday = new Date(now)
  const day = now.getDay() || 7
  monday.setDate(now.getDate() - day + 1)
  monday.setHours(0, 0, 0, 0)
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)

  const doneIds = new Set(
    sessions
      .filter((item) => {
        const date = new Date(`${item.date}T12:00:00`)
        return date >= monday && date <= sunday
      })
      .map((item) => item.workoutId),
  )

  return (
    <div className="week-strip">
      {WORKOUTS.map((workout) => (
        <button
          key={workout.id}
          className={doneIds.has(workout.id) ? 'week-day done' : 'week-day'}
          onClick={() => onOpenWorkout(workout)}
        >
          <span>{workout.shortDay}</span>
          <div>{doneIds.has(workout.id) ? <Check size={17} /> : <Dumbbell size={16} />}</div>
          <small>{workout.title.replace('Superior ', 'Sup. ').replace('Inferior ', 'Inf. ').replace('Core + Cardio', 'Core')}</small>
        </button>
      ))}
    </div>
  )
}

function HomePage({ progress, sessions, onOpenWorkout, onNavigate }) {
  const today = getTodayWorkout()
  const latest = progress.at(-1) ?? { weight: PROFILE.startWeight, waist: '' }
  const currentWeight = Number(latest.weight || PROFILE.startWeight)
  const lost = Math.max(PROFILE.startWeight - currentWeight, 0)
  const remaining = Math.max(currentWeight - PROFILE.goalMax, 0)
  const completedThisWeek = new Set(sessions.slice(-10).map((item) => item.workoutId)).size

  return (
    <div className="page home-v2">
      <header className="page-header hero-header">
        <div>
          <span className="eyebrow">CICLO DE 30 DIAS</span>
          <h1>Bora construir uma versão mais forte.</h1>
          <p>Peso descendo, carga subindo e treino virando rotina.</p>
        </div>
        <div className="header-pill"><Flame size={17} /> {completedThisWeek}/5 esta semana</div>
      </header>

      <section className="metrics-grid">
        <MetricCard icon={Weight} label="Peso atual" value={`${formatKg(currentWeight)} kg`} detail="Início: 97,0 kg" accent />
        <MetricCard icon={TrendingDown} label="Já foram" value={`${formatKg(lost)} kg`} detail="desde o início" />
        <MetricCard icon={Target} label="Até 83 kg" value={`${formatKg(remaining)} kg`} detail="sem sacrificar força" />
        <MetricCard icon={Gauge} label="Cintura" value={latest.waist ? `${latest.waist} cm` : '—'} detail="check-in semanal" />
      </section>

      <section className="dashboard-grid">
        <article className="today-card today-card-v2">
          <div className="card-topline">
            <div>
              <span className="eyebrow">TREINO DE HOJE</span>
              <h2>{today.title}</h2>
              <p>{today.subtitle}</p>
            </div>
            <div className="workout-badge">{today.exercises.length} exercícios</div>
          </div>

          <div className="today-mobile-preview">
            {today.exercises.slice(0, 3).map((exercise) => (
              <button key={exercise.id} onClick={() => onOpenWorkout(today)}>
                <ExerciseThumb exercise={exercise} />
                <div>
                  <strong>{exercise.name}</strong>
                  <span>{exercise.type === 'cardio' ? exercise.reps : `${exercise.sets} × ${exercise.reps}`}</span>
                </div>
                <ChevronRight size={17} />
              </button>
            ))}
          </div>

          <div className="exercise-preview desktop-home-preview">
            {today.exercises.slice(0, 4).map((exercise, index) => (
              <div key={exercise.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{exercise.name}</p>
                <small>{exercise.type === 'cardio' ? exercise.reps : `${exercise.sets} × ${exercise.reps}`}</small>
              </div>
            ))}
          </div>

          <button className="primary-button" onClick={() => onOpenWorkout(today)}>
            <CirclePlay size={20} /> Iniciar treino <ChevronRight size={18} />
          </button>
        </article>

        <article className="progress-card">
          <div className="card-topline compact">
            <div>
              <span className="eyebrow">EVOLUÇÃO</span>
              <h2>{formatKg(currentWeight)} kg</h2>
            </div>
            <button className="icon-button" onClick={() => onNavigate('progress')} aria-label="Abrir evolução">
              <ChevronRight size={19} />
            </button>
          </div>
          <ProgressLine entries={progress} />
        </article>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div><span className="eyebrow">SUA SEMANA</span><h2>5 dias, uma direção</h2></div>
        </div>
        <WeekStrip sessions={sessions} onOpenWorkout={onOpenWorkout} />
      </section>
    </div>
  )
}

function SetRow({ workoutId, exercise, index, setLogs, setSetLogs, onStartRest }) {
  const key = `${workoutId}:${exercise.id}:${index}`
  const row = setLogs[key] ?? { load: '', reps: '', done: false }

  const update = (patch) => {
    const next = { ...row, ...patch }
    setSetLogs((current) => ({ ...current, [key]: next }))
    if (!row.done && next.done && exercise.rest > 0) onStartRest(exercise.rest, exercise.name)
  }

  return (
    <div className={row.done ? 'set-row done' : 'set-row'}>
      <span className="set-number">{index + 1}</span>
      <label>
        <span>kg</span>
        <input inputMode="decimal" value={row.load} onChange={(event) => update({ load: event.target.value })} placeholder="0" />
      </label>
      <label>
        <span>reps</span>
        <input inputMode="numeric" value={row.reps} onChange={(event) => update({ reps: event.target.value })} placeholder={exercise.reps.split('–')[0]} />
      </label>
      <button className="check-button" onClick={() => update({ done: !row.done })} aria-label={`Marcar série ${index + 1}`}>
        {row.done && <Check size={17} />}
      </button>
    </div>
  )
}

function WorkoutExercise({ workoutId, exercise, setLogs, setSetLogs, onOpenExercise, onStartRest }) {
  const isCardio = exercise.type === 'cardio'
  const cardioKey = `${workoutId}:${exercise.id}:0`
  const cardio = setLogs[cardioKey] ?? { done: false }
  const video = getVideoDemo(exercise.id)

  return (
    <article className="workout-exercise coach-card">
      <div className="coach-card-top">
        <ExerciseThumb exercise={exercise} size="large" onClick={() => onOpenExercise(exercise)} />

        <div className="coach-card-copy">
          <button className="exercise-name-button" onClick={() => onOpenExercise(exercise)}>
            <h3>{exercise.name}</h3>
          </button>
          <div className="mobile-prescription">
            <strong>{isCardio ? exercise.reps : `${exercise.sets}x ${exercise.reps}`}</strong>
            {!isCardio && <span>{exercise.rest}s de descanso</span>}
          </div>
          <p className="coach-note">{exercise.instructions.slice(0, 2).join(' ')}</p>
          <button className="watch-demo" onClick={() => onOpenExercise(exercise)}>
            <CirclePlay size={15} /> {video ? 'Ver demonstração' : 'Ver execução'}
          </button>
        </div>

        <div className="exercise-target desktop-exercise-target">
          <strong>{isCardio ? exercise.reps : `${exercise.sets} × ${exercise.reps}`}</strong>
          {!isCardio && <span>{exercise.rest}s descanso</span>}
        </div>
      </div>

      {isCardio ? (
        <button
          className={cardio.done ? 'cardio-complete done' : 'cardio-complete'}
          onClick={() => setSetLogs((current) => ({ ...current, [cardioKey]: { ...cardio, done: !cardio.done } }))}
        >
          <div><Activity size={19} /><span>Referência inicial: 5,5 km/h</span></div>
          <div className="check-button">{cardio.done && <Check size={17} />}</div>
        </button>
      ) : (
        <div className="sets-list coach-sets">
          <div className="sets-labels"><span>SÉRIE</span><span>CARGA</span><span>REPS</span><span>OK</span></div>
          {Array.from({ length: exercise.sets }, (_, index) => (
            <SetRow
              key={index}
              workoutId={workoutId}
              exercise={exercise}
              index={index}
              setLogs={setLogs}
              setSetLogs={setSetLogs}
              onStartRest={onStartRest}
            />
          ))}
        </div>
      )}
    </article>
  )
}

function RestTimer({ timer, onClose }) {
  if (!timer.active) return null
  const minutes = Math.floor(timer.left / 60)
  const seconds = timer.left % 60

  return (
    <div className="rest-timer">
      <div className="timer-ring"><TimerReset size={19} /></div>
      <div>
        <span>DESCANSO · {timer.exercise}</span>
        <strong>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</strong>
      </div>
      <button onClick={onClose}><X size={18} /></button>
    </div>
  )
}

function WorkoutsPage({ selectedWorkout, setSelectedWorkout, setLogs, setSetLogs, sessions, setSessions, onOpenExercise }) {
  const [timer, setTimer] = useState({ active: false, left: 0, exercise: '' })

  useEffect(() => {
    if (!timer.active || timer.left <= 0) return undefined
    const interval = window.setInterval(() => {
      setTimer((current) => current.left <= 1
        ? { ...current, active: false, left: 0 }
        : { ...current, left: current.left - 1 })
    }, 1000)
    return () => window.clearInterval(interval)
  }, [timer.active, timer.left])

  const totalSets = selectedWorkout.exercises.reduce(
    (sum, exercise) => sum + (exercise.type === 'cardio' ? 1 : exercise.sets),
    0,
  )

  const completedSets = selectedWorkout.exercises.reduce((sum, exercise) => {
    const count = exercise.type === 'cardio' ? 1 : exercise.sets
    const completed = Array.from({ length: count }, (_, index) => (
      setLogs[`${selectedWorkout.id}:${exercise.id}:${index}`]?.done ? 1 : 0
    )).reduce((a, b) => a + b, 0)
    return sum + completed
  }, 0)

  const percent = totalSets ? Math.round((completedSets / totalSets) * 100) : 0
  const completedToday = sessions.some(
    (session) => session.date === isoToday() && session.workoutId === selectedWorkout.id,
  )

  const finishWorkout = () => {
    if (completedToday) return
    setSessions((current) => [
      ...current,
      { date: isoToday(), workoutId: selectedWorkout.id, title: selectedWorkout.title },
    ])
  }

  return (
    <div className="page workout-page workout-v2">
      <RestTimer timer={timer} onClose={() => setTimer((current) => ({ ...current, active: false }))} />

      <header className="page-header workout-header-v2">
        <div>
          <span className="eyebrow">{selectedWorkout.day.toUpperCase()}</span>
          <h1>{selectedWorkout.title}</h1>
          <p>{selectedWorkout.subtitle}</p>
        </div>
        <div className="progress-ring-text"><strong>{percent}%</strong><span>concluído</span></div>
      </header>

      <div className="workout-tabs">
        {WORKOUTS.map((workout) => (
          <button
            key={workout.id}
            className={selectedWorkout.id === workout.id ? 'active' : ''}
            onClick={() => setSelectedWorkout(workout)}
          >
            <span>{workout.shortDay}</span>
            <strong>{workout.title}</strong>
          </button>
        ))}
      </div>

      <div className="workout-progress"><span style={{ width: `${percent}%` }} /></div>

      <div className="mobile-section-label">
        <span>EXERCÍCIOS</span>
        <small>Toque no vídeo para ver a execução</small>
      </div>

      <section className="workout-stack">
        {selectedWorkout.exercises.map((exercise) => (
          <WorkoutExercise
            key={exercise.id}
            workoutId={selectedWorkout.id}
            exercise={exercise}
            setLogs={setLogs}
            setSetLogs={setSetLogs}
            onOpenExercise={onOpenExercise}
            onStartRest={(seconds, name) => setTimer({ active: true, left: seconds, exercise: name })}
          />
        ))}
      </section>

      <button className={completedToday ? 'finish-button done' : 'finish-button'} onClick={finishWorkout}>
        {completedToday
          ? <><Check size={21} /> Treino registrado hoje</>
          : <><Trophy size={21} /> Concluir treino</>}
      </button>
    </div>
  )
}

function ProgressPage({ progress, setProgress }) {
  const latest = progress.at(-1) ?? { weight: PROFILE.startWeight, waist: '' }
  const [date, setDate] = useState(isoToday())
  const [weight, setWeight] = useState('')
  const [waist, setWaist] = useState('')
  const current = Number(latest.weight || PROFILE.startWeight)
  const lost = PROFILE.startWeight - current
  const percentTo83 = Math.min(
    Math.max(((PROFILE.startWeight - current) / (PROFILE.startWeight - PROFILE.goalMax)) * 100, 0),
    100,
  )

  const save = (event) => {
    event.preventDefault()
    if (!weight) return
    const entry = { date, weight: Number(weight), waist: waist ? Number(waist) : '' }
    setProgress((currentEntries) => [
      ...currentEntries.filter((item) => item.date !== date),
      entry,
    ].sort((a, b) => a.date.localeCompare(b.date)))
    setWeight('')
    setWaist('')
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">EVOLUÇÃO CORPORAL</span>
          <h1>O espelho é só parte dos dados.</h1>
          <p>Registre uma vez por semana, de preferência nas mesmas condições.</p>
        </div>
      </header>

      <section className="metrics-grid three">
        <MetricCard icon={Weight} label="Peso atual" value={`${formatKg(current)} kg`} detail="partida: 97,0 kg" accent />
        <MetricCard icon={ArrowDownRight} label="Diferença" value={`${lost >= 0 ? '−' : '+'}${formatKg(Math.abs(lost))} kg`} detail="desde o início" />
        <MetricCard icon={Target} label="Caminho até 83" value={`${Math.round(percentTo83)}%`} detail={`${formatKg(Math.max(current - 83, 0))} kg restantes`} />
      </section>

      <section className="progress-layout">
        <article className="progress-panel graph-panel">
          <div className="section-heading"><div><span className="eyebrow">PESO</span><h2>Trajetória</h2></div></div>
          <ProgressLine entries={progress} />
        </article>

        <form className="progress-panel log-form" onSubmit={save}>
          <span className="eyebrow">CHECK-IN SEMANAL</span>
          <h2>Novo registro</h2>
          <label>Data<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
          <div className="form-split">
            <label>Peso (kg)<input inputMode="decimal" value={weight} onChange={(event) => setWeight(event.target.value.replace(',', '.'))} placeholder="96.2" /></label>
            <label>Cintura (cm)<input inputMode="decimal" value={waist} onChange={(event) => setWaist(event.target.value.replace(',', '.'))} placeholder="opcional" /></label>
          </div>
          <button className="primary-button" type="submit"><Plus size={19} /> Salvar semana</button>
        </form>
      </section>

      <section className="section-block">
        <div className="section-heading"><div><span className="eyebrow">HISTÓRICO</span><h2>Seus registros</h2></div></div>
        <div className="history-list">
          {[...progress].reverse().map((entry, index) => {
            const originalIndex = progress.findIndex((item) => item.date === entry.date)
            const previous = originalIndex > 0 ? progress[originalIndex - 1] : null
            const delta = previous ? Number(entry.weight) - Number(previous.weight) : 0
            return (
              <div key={`${entry.date}-${index}`} className="history-row">
                <div className="history-date"><strong>{new Date(`${entry.date}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</strong><span>{originalIndex === 0 ? 'Início' : 'Check-in'}</span></div>
                <div><span>Peso</span><strong>{formatKg(entry.weight)} kg</strong></div>
                <div><span>Cintura</span><strong>{entry.waist ? `${entry.waist} cm` : '—'}</strong></div>
                <div className={delta < 0 ? 'delta down' : 'delta'}><span>Semana</span><strong>{previous ? `${delta > 0 ? '+' : ''}${formatKg(delta)} kg` : '—'}</strong></div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}

function ExercisesPage({ onOpenExercise }) {
  const [search, setSearch] = useState('')
  const unique = useMemo(() => {
    const map = new Map()
    ALL_EXERCISES.forEach((exercise) => {
      const normalizedName = exercise.name.toLowerCase()
      if (!map.has(normalizedName)) map.set(normalizedName, exercise)
    })
    return Array.from(map.values())
  }, [])

  const filtered = unique.filter((exercise) => {
    const haystack = `${exercise.name} ${exercise.muscleGroups.join(' ')} ${exercise.workout}`.toLowerCase()
    return haystack.includes(search.toLowerCase())
  })

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <span className="eyebrow">BIBLIOTECA</span>
          <h1>Veja. Entenda. Execute.</h1>
          <p>As demonstrações carregam dentro do app para você conferir a máquina e o movimento antes da série.</p>
        </div>
      </header>

      <label className="search-box"><Search size={20} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar exercício ou músculo..." /></label>

      <section className="exercise-library">
        {filtered.map((exercise) => (
          <button key={`${exercise.workout}-${exercise.id}`} className="library-card library-card-v2" onClick={() => onOpenExercise(exercise)}>
            <ExerciseThumb exercise={exercise} />
            <div className="library-copy">
              <span className="eyebrow">{exercise.workout}</span>
              <h3>{exercise.name}</h3>
              <div className="muscle-row">{exercise.muscleGroups.map((muscle) => <span key={muscle}>{muscle}</span>)}</div>
            </div>
            <ChevronRight size={19} />
          </button>
        ))}
      </section>
    </div>
  )
}

function ExerciseModal({ exercise, onClose }) {
  if (!exercise) return null
  const video = getVideoDemo(exercise.id)
  const queryUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.demoQuery)}`

  return (
    <div className="modal-backdrop video-modal-backdrop" onMouseDown={onClose}>
      <article className="exercise-modal exercise-modal-v2" onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar"><X size={19} /></button>

        <div className="video-stage">
          {video ? (
            <div className={video.format === 'short' ? 'youtube-player short-player' : 'youtube-player landscape-player'}>
              <iframe
                src={getYoutubeEmbedUrl(video)}
                title={`Demonstração: ${exercise.name}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="video-empty-state">
              <CirclePlay size={46} />
              <strong>Vídeo em seleção</strong>
              <span>Vamos escolher uma máquina o mais parecida possível com a da sua academia.</span>
            </div>
          )}
        </div>

        <div className="modal-content modal-content-v2">
          <span className="eyebrow">EXECUÇÃO</span>
          <h2>{exercise.name}</h2>
          <div className="modal-prescription">
            <strong>{exercise.type === 'cardio' ? exercise.reps : `${exercise.sets} × ${exercise.reps}`}</strong>
            {exercise.type !== 'cardio' && <span>{exercise.rest}s de descanso</span>}
          </div>
          <div className="muscle-row">{exercise.muscleGroups.map((muscle) => <span key={muscle}>{muscle}</span>)}</div>

          <div className="instruction-list">
            {exercise.instructions.map((instruction, index) => (
              <div key={instruction}><span>{index + 1}</span><p>{instruction}</p></div>
            ))}
          </div>

          {!video && (
            <a className="secondary-button" href={queryUrl} target="_blank" rel="noreferrer">
              <CirclePlay size={19} /> Procurar demonstração no YouTube
            </a>
          )}
        </div>
      </article>
    </div>
  )
}

export default function AppV2() {
  const [activeView, setActiveView] = useState('today')
  const [selectedWorkout, setSelectedWorkout] = useState(getTodayWorkout())
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [progress, setProgress] = useLocalStorage('project83-progress', [
    { date: isoToday(), weight: PROFILE.startWeight, waist: '' },
  ])
  const [setLogs, setSetLogs] = useLocalStorage('project83-set-logs', {})
  const [sessions, setSessions] = useLocalStorage('project83-sessions', [])

  const openWorkout = (workout) => {
    setSelectedWorkout(workout)
    setActiveView('workouts')
  }

  return (
    <div className="app-shell app-v2">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <main className="main-scroll">
        {activeView === 'today' && (
          <HomePage
            progress={progress}
            sessions={sessions}
            onOpenWorkout={openWorkout}
            onNavigate={setActiveView}
          />
        )}

        {activeView === 'workouts' && (
          <WorkoutsPage
            selectedWorkout={selectedWorkout}
            setSelectedWorkout={setSelectedWorkout}
            setLogs={setLogs}
            setSetLogs={setSetLogs}
            sessions={sessions}
            setSessions={setSessions}
            onOpenExercise={setSelectedExercise}
          />
        )}

        {activeView === 'progress' && <ProgressPage progress={progress} setProgress={setProgress} />}
        {activeView === 'exercises' && <ExercisesPage onOpenExercise={setSelectedExercise} />}
      </main>

      <MobileNav activeView={activeView} onNavigate={setActiveView} />
      <ExerciseModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
    </div>
  )
}
