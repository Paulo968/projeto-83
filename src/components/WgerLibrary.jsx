import { useEffect, useMemo, useState } from 'react'
import { Activity, Database, Dumbbell, LoaderCircle, RefreshCw, Search, Wrench, X } from 'lucide-react'
import { loadWgerCatalog } from '../services/wger'

const TABS = [
  { id: 'exercises', label: 'Exercícios', icon: Dumbbell },
  { id: 'muscles', label: 'Músculos', icon: Activity },
  { id: 'equipment', label: 'Equipamentos', icon: Wrench },
]

function normalize(value = '') {
  return String(value).toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function ExerciseCard({ exercise }) {
  const muscles = [...exercise.muscles, ...exercise.secondaryMuscles]

  return (
    <article className="wger-exercise-card">
      <div className="wger-exercise-top">
        {exercise.images?.[0]
          ? <img src={exercise.images[0]} alt="" loading="lazy" />
          : <div className="wger-image-fallback"><Dumbbell size={22} /></div>}
        <div>
          <span className="wger-source-chip">WGER · {exercise.category}</span>
          <h3>{exercise.name}</h3>
        </div>
      </div>
      {exercise.description && <p>{exercise.description}</p>}
      <div className="wger-tag-group">
        {muscles.slice(0, 4).map((item) => <span key={`m-${exercise.id}-${item.id}`}>{item.name}</span>)}
        {exercise.equipment.slice(0, 3).map((item) => <span className="equipment" key={`e-${exercise.id}-${item.id}`}>{item.name}</span>)}
      </div>
    </article>
  )
}

function EntityCard({ item, type }) {
  const Icon = type === 'muscles' ? Activity : Wrench
  return <article className="wger-entity-card"><div><Icon size={19} /></div><strong>{item.name}</strong><span>ID {item.id}</span></article>
}

export default function WgerLibrary() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('exercises')
  const [search, setSearch] = useState('')
  const [catalog, setCatalog] = useState({ exercises: [], muscles: [], equipment: [] })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const load = async ({ force = false } = {}) => {
    setStatus('loading')
    setError('')
    try {
      setCatalog(await loadWgerCatalog({ force }))
      setStatus('ready')
    } catch (loadError) {
      setStatus('error')
      setError(loadError?.message || 'Não foi possível consultar a Wger agora.')
    }
  }

  useEffect(() => {
    if (open && status === 'idle') load()
  }, [open, status])

  useEffect(() => {
    if (!open) setSearch('')
  }, [open])

  const query = normalize(search.trim())
  const filtered = useMemo(() => {
    if (tab === 'exercises') {
      return catalog.exercises.filter((exercise) => {
        const haystack = normalize([
          exercise.name,
          exercise.category,
          exercise.description,
          ...exercise.muscles.map((item) => item.name),
          ...exercise.secondaryMuscles.map((item) => item.name),
          ...exercise.equipment.map((item) => item.name),
        ].join(' '))
        return !query || haystack.includes(query)
      })
    }
    return catalog[tab].filter((item) => !query || normalize(item.name).includes(query))
  }, [catalog, query, tab])

  return (
    <>
      <button className="wger-launcher" onClick={() => setOpen(true)} aria-label="Abrir biblioteca Wger">
        <Database size={18} /><span>Biblioteca Wger</span>
      </button>

      {open && (
        <div className="wger-backdrop" onMouseDown={() => setOpen(false)}>
          <section className="wger-panel" onMouseDown={(event) => event.stopPropagation()} aria-label="Biblioteca Wger">
            <header className="wger-header">
              <div><span className="wger-eyebrow">FONTE EXTERNA</span><h2>Biblioteca Wger</h2><p>Consulta de exercícios, músculos e equipamentos sem alterar seus treinos salvos.</p></div>
              <button className="wger-close" onClick={() => setOpen(false)} aria-label="Fechar"><X size={20} /></button>
            </header>

            <div className="wger-tabs" role="tablist">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
                  <Icon size={17} /><span>{label}</span><small>{catalog[id].length}</small>
                </button>
              ))}
            </div>

            <div className="wger-toolbar">
              <label className="wger-search"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar na Wger..." /></label>
              <button className="wger-refresh" onClick={() => load({ force: true })} disabled={status === 'loading'}><RefreshCw size={17} /> Atualizar</button>
            </div>

            <div className="wger-content">
              {status === 'loading' && <div className="wger-state"><LoaderCircle className="wger-spin" size={30} /><strong>Consultando a Wger...</strong></div>}
              {status === 'error' && <div className="wger-state error"><Database size={30} /><strong>Wger indisponível</strong><span>{error}</span><button onClick={() => load({ force: true })}>Tentar novamente</button></div>}
              {status === 'ready' && tab === 'exercises' && <div className="wger-exercise-grid">{filtered.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} />)}{!filtered.length && <div className="wger-empty">Nenhum exercício encontrado.</div>}</div>}
              {status === 'ready' && tab !== 'exercises' && <div className="wger-entity-grid">{filtered.map((item) => <EntityCard key={item.id} item={item} type={tab} />)}{!filtered.length && <div className="wger-empty">Nenhum item encontrado.</div>}</div>}
            </div>

            <footer className="wger-footer">Dados externos: <a href="https://wger.de" target="_blank" rel="noreferrer">wger.de</a></footer>
          </section>
        </div>
      )}
    </>
  )
}
