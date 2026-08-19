import { useMemo, useState } from 'react'
import AppV2 from './AppV2.jsx'
import ExerciseDetail from './components/ExerciseDetail.jsx'
import { ALL_EXERCISES, PROFILE } from './data/workouts'

function normalize(value = '') {
  return value.trim().toLocaleLowerCase('pt-BR')
}

function readSetLogs() {
  try {
    return JSON.parse(window.localStorage.getItem('project83-set-logs') || '{}')
  } catch {
    return {}
  }
}

function isoToday() {
  return new Date().toISOString().slice(0, 10)
}

function migrateBaseline() {
  try {
    const key = 'project83-progress'
    const saved = window.localStorage.getItem(key)
    const current = saved ? JSON.parse(saved) : []

    if (!Array.isArray(current) || current.length === 0) {
      window.localStorage.setItem(key, JSON.stringify([
        { date: isoToday(), weight: PROFILE.startWeight, waist: PROFILE.startWaist },
      ]))
      return
    }

    if (current.length === 1) {
      const first = current[0]
      if (Number(first.weight) === PROFILE.startWeight && !Number(first.waist)) {
        window.localStorage.setItem(key, JSON.stringify([
          { ...first, waist: PROFILE.startWaist },
        ]))
      }
    }
  } catch {
    // Se houver dado antigo inválido, o app principal continua usando seu fallback normal.
  }
}

export default function AppV3() {
  useState(() => {
    migrateBaseline()
    return true
  })

  const [selectedExercise, setSelectedExercise] = useState(null)
  const [detailLogs, setDetailLogs] = useState({})

  const exerciseMap = useMemo(() => {
    const map = new Map()
    ALL_EXERCISES.forEach((exercise) => {
      if (!map.has(normalize(exercise.name))) map.set(normalize(exercise.name), exercise)
    })
    return map
  }, [])

  const openExercise = (exercise) => {
    if (!exercise) return
    setDetailLogs(readSetLogs())
    setSelectedExercise(exercise)
  }

  const handleClickCapture = (event) => {
    const target = event.target
    if (!(target instanceof Element)) return

    const trigger = target.closest(
      '.exercise-media-thumb, .watch-demo, .exercise-name-button, .library-card-v2',
    )
    if (!trigger) return

    const container = trigger.closest('.coach-card, .library-card-v2') ?? trigger.parentElement
    const title = container?.querySelector('h3')?.textContent
    const exercise = exerciseMap.get(normalize(title))
    if (!exercise) return

    event.preventDefault()
    event.stopPropagation()
    openExercise(exercise)
  }

  return (
    <div className="project83-v3" onClickCapture={handleClickCapture}>
      <AppV2 />
      <ExerciseDetail
        exercise={selectedExercise}
        onClose={() => setSelectedExercise(null)}
        onSelectExercise={openExercise}
        setLogs={detailLogs}
      />
    </div>
  )
}
