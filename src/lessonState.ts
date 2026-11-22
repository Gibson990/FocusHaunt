import type { FocusTargetId, LessonPhase, RepairId } from './lesson'

export type FocusDestination = 'prediction' | 'repairChoice' | 'feedbackAction' | 'phaseHeading'

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
  focusDestination: FocusDestination | null
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
  focusDestination: null,
}

function focusDestinationFor(phase: LessonPhase): FocusDestination | null {
  switch (phase) {
    case 'predict': return 'prediction'
    case 'choose': return 'repairChoice'
    case 'feedback': return 'feedbackAction'
    default: return null
  }
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
    focusDestination: state.fixtureOpen
      ? focusDestinationFor(phase)
      : state.phase === 'explain' ? 'phaseHeading' : null,
  }
}

export function backLessonState(state: LessonState): LessonState {
  const order: LessonPhase[] = ['predict', 'observe', 'choose', 'explain', 'feedback', 'try']
  const index = order.indexOf(state.phase)
  if (index <= 0) return state
  const phase = order[index - 1]
  return {
    ...state,
    phase,
    fixtureOpen: false,
    observedFocus: null,
    advanceAttempted: false,
    focusDestination: state.fixtureOpen
      ? focusDestinationFor(phase)
      : phase === 'predict' ? 'prediction' : null,
  }
}

export function applyCorrectRepairState(state: LessonState): LessonState {
  if (state.phase !== 'feedback') return state
  return { ...state, phase: 'try', appliedRepair: 'repairA', fixtureOpen: false, observedFocus: null, focusDestination: 'phaseHeading' }
}

export function changeChoiceState(state: LessonState): LessonState {
  if (state.phase !== 'feedback') return state
  return { ...state, phase: 'choose', appliedRepair: null, fixtureOpen: false, observedFocus: null, advanceAttempted: false, focusDestination: 'repairChoice' }
}
