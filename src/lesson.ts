// Static lesson data for the M1 implementation. The data is static; real
// behavior is driven by the lesson phase machine (useLesson) and real focus
// management (useDialogFocus). Answers live only in the `feedback` object and
// are shown only in the Feedback stage.

export type FocusTargetId =
  | 'opener'
  | 'title'
  | 'nameInput'
  | 'closeButton'
  | 'pageBehind'

export type RepairId = 'repairA' | 'repairB'

export interface PredictOption {
  id: FocusTargetId
  label: string
  /** Neutral, non-revealing description. Does not indicate correctness. */
  hint: string
}

export interface ProposedChange {
  id: RepairId
  /** Neutral visible name shown in the Choose stage. */
  name: 'Repair A' | 'Repair B'
  /** Concise proposed-change description. Reveals nothing about correctness. */
  change: string
  /** Correctness, shown only in the Feedback stage. */
  correct: boolean
}

/** Ordered lesson phases. Order is required by the spec. */
export type LessonPhase =
  | 'predict'
  | 'observe'
  | 'choose'
  | 'explain'
  | 'feedback'
  | 'try'

export const phaseOrder: readonly LessonPhase[] = [
  'predict',
  'observe',
  'choose',
  'explain',
  'feedback',
  'try',
]

export interface PhaseMeta {
  id: LessonPhase
  label: string
  detail: string
}

export const phaseMeta: readonly PhaseMeta[] = [
  { id: 'predict', label: 'Predict', detail: 'Where should focus go on open?' },
  { id: 'observe', label: 'Observe', detail: 'Open the broken fixture; read the real focus.' },
  { id: 'choose', label: 'Choose a repair', detail: 'Pick a bundled repair.' },
  { id: 'explain', label: 'Explain', detail: 'Unscored reflection before feedback.' },
  { id: 'feedback', label: 'Feedback', detail: 'See the answer and which repair is correct.' },
  { id: 'try', label: 'Try the fix', detail: 'Experience the repaired behavior.' },
]

/** Five numbered learner steps; feedback sits between Explain and Try. */
export interface Step {
  id: 'predict' | 'observe' | 'choose' | 'explain' | 'try'
  label: string
}

export const steps: readonly Step[] = [
  { id: 'predict', label: 'Predict' },
  { id: 'observe', label: 'Observe' },
  { id: 'choose', label: 'Choose a repair' },
  { id: 'explain', label: 'Explain' },
  { id: 'try', label: 'Try the fix' },
]

export const predictOptions: PredictOption[] = [
  { id: 'opener', label: 'The opener button', hint: 'The button that opened the dialog.' },
  { id: 'title', label: 'The dialog title', hint: 'The heading text of the dialog.' },
  { id: 'nameInput', label: 'The Name input', hint: 'The text field for editing the name.' },
  { id: 'closeButton', label: 'The close button', hint: 'The control that dismisses the dialog.' },
  { id: 'pageBehind', label: 'The page behind the dialog', hint: 'Content underneath the open dialog.' },
]

export const proposedChanges: ProposedChange[] = [
  {
    id: 'repairA',
    name: 'Repair A',
    change:
      'Move focus to the Name input on open; contain Tab/Shift+Tab; wire Escape/close; restore focus to the opener on close.',
    correct: true,
  },
  {
    id: 'repairB',
    name: 'Repair B',
    change:
      'Add role="dialog", aria-modal, and an accessible name (aria-label or aria-labelledby) to the dialog.',
    correct: false,
  },
]

// Feedback content — the only place answers appear.
export const feedback = {
  intendedTarget: 'The Name input',
  intendedReason:
    'It lets the user edit immediately. This is a design choice for this short edit-name dialog, not a DOM Tab-order rule: the close button is reachable before it in tab order.',
  observedBroken:
    'Focus is left behind on the opener — the dialog opens but the active element stays outside it.',
  correctChange: proposedChanges.find((c) => c.correct) as ProposedChange,
  distractorChange: proposedChanges.find((c) => !c.correct) as ProposedChange,
  whyCorrect:
    'It meets the opening-focus requirement: focus moves to the Name input on open, Tab/Shift+Tab stay contained, Escape/close work, and focus returns to the opener.',
  whyDistractorFails:
    'ARIA attributes describe the dialog to assistive technology but do not move focus by themselves, so the opening-focus requirement is unmet.',
  reflectionNote: 'Reflection is unscored self-explanation. It is not graded or assessed.',
}
