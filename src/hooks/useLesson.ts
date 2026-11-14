// The M1 lesson phase machine. Order is required: Predict → Observe → Choose →
// Explain → Feedback → Try. Advancing is gated so the learner cannot skip ahead
// of a prediction, an observation, or a repair choice. Reflection is unscored
// and never gates progress.

import { useCallback, useMemo, useState } from 'react'
import type { FocusTargetId, LessonPhase, RepairId } from '../lesson'
import { phaseOrder } from '../lesson'

export interface LessonState {
  phase: LessonPhase
  predicted: FocusTargetId | ''
  chosenRepair: RepairId | ''
  reflection: string
  /** Real observed focus (document.activeElement) or null while the fixture is closed. */
  observedFocus: string | null
  /** True once the learner has opened the fixture during Observe. */
  observedOnce: boolean
  fixtureOpen: boolean
  /** Which repair is applied to the fixture in Try (null until Try). */
  appliedRepair: RepairId | null
}

const initialState: LessonState = {
  phase: 'predict',
  predicted: '',
  chosenRepair: '',
  reflection: '',
  observedFocus: null,
  observedOnce: false,
  fixtureOpen: false,
  appliedRepair: null,
}

/** Whether `s` is complete enough to advance from its current phase. */
function canAdvanceFrom(s: LessonState): boolean {
  switch (s.phase) {
    case 'predict':
      return s.predicted !== ''
    case 'observe':
      return s.observedOnce
    case 'choose':
      return s.chosenRepair !== ''
    case 'explain':
      return true
    case 'feedback':
      return true
    case 'try':
      return false
  }
}

export function useLesson() {
  const [state, setState] = useState<LessonState>(initialState)

  const setPredicted = useCallback((predicted: FocusTargetId | '') => {
    setState((s) => ({ ...s, predicted }))
  }, [])

  const setChosenRepair = useCallback((chosenRepair: RepairId | '') => {
    setState((s) => ({ ...s, chosenRepair }))
  }, [])

  const setReflection = useCallback((reflection: string) => {
    setState((s) => ({ ...s, reflection }))
  }, [])

  const setObservedFocus = useCallback((observedFocus: string | null) => {
    setState((s) => ({ ...s, observedFocus }))
  }, [])

  const openFixture = useCallback(() => {
    setState((s) => ({ ...s, fixtureOpen: true, observedOnce: true }))
  }, [])

  const closeFixture = useCallback(() => {
    setState((s) => ({ ...s, fixtureOpen: false }))
  }, [])

  const resetFixture = useCallback(() => {
    setState((s) => ({ ...s, fixtureOpen: false, observedFocus: null }))
  }, [])

  const next = useCallback(() => {
    setState((s) => {
      const idx = phaseOrder.indexOf(s.phase)
      if (idx < 0 || idx >= phaseOrder.length - 1) return s
      if (!canAdvanceFrom(s)) return s
      const nextPhase = phaseOrder[idx + 1]
      if (nextPhase === 'try') {
        // Apply the correct bundled repair so the learner experiences the real
        // repaired behavior (per spec: experience the real repaired behavior).
        return { ...s, phase: 'try', appliedRepair: 'repairA', fixtureOpen: false, observedFocus: null, observedOnce: false }
      }
      if (nextPhase === 'observe') {
        return { ...s, phase: 'observe', fixtureOpen: false, observedFocus: null, observedOnce: false }
      }
      return { ...s, phase: nextPhase, fixtureOpen: false, observedFocus: null }
    })
  }, [])

  const back = useCallback(() => {
    setState((s) => {
      const idx = phaseOrder.indexOf(s.phase)
      if (idx <= 0) return s
      return { ...s, phase: phaseOrder[idx - 1], fixtureOpen: false, observedFocus: null }
    })
  }, [])

  const restart = useCallback(() => {
    setState({ ...initialState })
  }, [])

  const canAdvance = useMemo(() => canAdvanceFrom(state), [state])

  return {
    state,
    setPredicted,
    setChosenRepair,
    setReflection,
    setObservedFocus,
    openFixture,
    closeFixture,
    resetFixture,
    next,
    back,
    restart,
    canAdvance,
  }
}
