// The M1 lesson phase machine. Order is required: Predict → Observe → Choose →
// Explain → Feedback → Try. Advancing is gated so the learner cannot skip ahead
// of a prediction, an observation, a repair choice, or a non-empty unscored
// reflection. Reflection content is never graded or semantically assessed.

import { useCallback, useMemo, useState } from 'react'
import type { FocusTargetId, RepairId } from '../lesson'
import {
  advanceLessonState,
  applyCorrectRepairState,
  backLessonState,
  canAdvanceFrom,
  changeChoiceState,
  initialLessonState,
} from '../lessonState'

export function useLesson() {
  const [state, setState] = useState(initialLessonState)

  const setPredicted = useCallback((predicted: FocusTargetId | '') => {
    setState((s) => ({ ...s, predicted, advanceAttempted: false }))
  }, [])

  const setChosenRepair = useCallback((chosenRepair: RepairId | '') => {
    setState((s) => ({ ...s, chosenRepair, advanceAttempted: false }))
  }, [])

  const setReflection = useCallback((reflection: string) => {
    setState((s) => ({ ...s, reflection, advanceAttempted: false }))
  }, [])

  const setObservedFocus = useCallback((observedFocus: string | null) => {
    setState((s) => ({ ...s, observedFocus }))
  }, [])

  const openFixture = useCallback(() => {
    setState((s) => ({ ...s, fixtureOpen: true, observedOnce: true }))
  }, [])

  const closeFixture = useCallback(() => {
    setState((s) => ({ ...s, fixtureOpen: false, focusDestination: null }))
  }, [])

  const resetFixture = useCallback(() => {
    setState((s) => ({ ...s, fixtureOpen: false, observedFocus: null, focusDestination: null }))
  }, [])

  const next = useCallback(() => {
    setState(advanceLessonState)
  }, [])

  const back = useCallback(() => {
    setState(backLessonState)
  }, [])

  const restart = useCallback(() => {
    setState({ ...initialLessonState })
  }, [])

  const changeChoice = useCallback(() => setState(changeChoiceState), [])
  const applyCorrectRepair = useCallback(() => setState(applyCorrectRepairState), [])
  const clearFocusDestination = useCallback(() => {
    setState((s) => ({ ...s, focusDestination: null }))
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
    changeChoice,
    applyCorrectRepair,
    clearFocusDestination,
    canAdvance,
  }
}
