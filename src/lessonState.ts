import type { FocusTargetId, LessonPhase, RepairId } from './lesson'

export interface LessonState {
  phase: LessonPhase
  predicted: FocusTargetId | ''
  chosenRepair: RepairId | ''
  reflection: string
  observedFocus: string | null
  observedOnce: boolean
  fixtureOpen: boolean
  appliedRepair: RepairId | null
  advanceAttempted: boolean
}

export const initialLessonState: LessonState = {
  phase: 'predict',
  predicted: '',
  chosenRepair: '',
  reflection: '',
  observedFocus: null,
  observedOnce: false,
  fixtureOpen: false,
  appliedRepair: null,
  advanceAttempted: false,
}

export function canAdvanceFrom(state: LessonState): boolean {
  switch (state.phase) {
    case 'predict': return state.predicted !== ''
    case 'observe': return state.observedOnce
    case 'choose': return state.chosenRepair !== ''
    case 'explain': return state.reflection.trim() !== ''
    case 'feedback':
    case 'try': return false
  }
}

export function advanceLessonState(state: LessonState): LessonState {
  if (!canAdvanceFrom(state)) return { ...state, advanceAttempted: true }
  const order: LessonPhase[] = ['predict', 'observe', 'choose', 'explain', 'feedback', 'try']
  const index = order.indexOf(state.phase)
  if (index < 0 || index >= order.length - 1) return state
  const phase = order[index + 1]
  return {
    ...state,
    phase,
    fixtureOpen: false,
    observedFocus: null,
    observedOnce: phase === 'observe' ? false : state.observedOnce,
    advanceAttempted: false,
  }
}

export function applyCorrectRepairState(state: LessonState): LessonState {
  if (state.phase !== 'feedback') return state
  return { ...state, phase: 'try', appliedRepair: 'repairA', fixtureOpen: false, observedFocus: null }
}

export function changeChoiceState(state: LessonState): LessonState {
  if (state.phase !== 'feedback') return state
  return { ...state, phase: 'choose', appliedRepair: null, fixtureOpen: false, observedFocus: null, advanceAttempted: false }
}
