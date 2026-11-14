// Static lesson data for the M0.1 mockup. It drives no behavior — the UI is a
// state-preview mockup. Answers live only in the `feedback` object, shown in
// the Feedback preview (never in the prediction view).

export type FocusTargetId =
  | 'opener'
  | 'title'
  | 'nameInput'
  | 'closeButton'
  | 'pageBehind'

export interface PredictOption {
  id: FocusTargetId
  label: string
  /** Neutral, non-revealing description. Does not indicate correctness. */
  hint: string
}

export interface ProposedChange {
  id: 'changeOne' | 'changeTwo'
  /** Neutral visible name shown in the Choose stage. */
  name: 'Repair A' | 'Repair B'
  /** Concise proposed-change description shown beneath the neutral name. Reveals
   * nothing about correctness; which change is correct is shown only in the
   * Feedback preview. */
  change: string
  /** Reserved for the Feedback preview; not shown in the Choose stage. */
  correct: boolean
}

export interface Step {
  id: 'predict' | 'observe' | 'choose' | 'explain' | 'try'
  label: string
}

export type PreviewStage =
  | 'predict'
  | 'observe'
  | 'choose'
  | 'explain'
  | 'feedback'
  | 'try'

export interface PreviewOption {
  id: PreviewStage
  label: string
}

export const predictOptions: PredictOption[] = [
  { id: 'opener', label: 'The opener button', hint: 'The button that opened the dialog.' },
  { id: 'title', label: 'The dialog title', hint: 'The heading text of the dialog.' },
  { id: 'nameInput', label: 'The Name input', hint: 'The text field for editing the name.' },
  { id: 'closeButton', label: 'The close button', hint: 'The control that dismisses the dialog.' },
  { id: 'pageBehind', label: 'The page behind the dialog', hint: 'Content underneath the open dialog.' },
]

export const proposedChanges: ProposedChange[] = [
  {
    id: 'changeOne',
    name: 'Repair A',
    change:
      'Move focus to the Name input on open; contain Tab/Shift+Tab; wire Escape/close; restore focus to the opener on close.',
    correct: true,
  },
  {
    id: 'changeTwo',
    name: 'Repair B',
    change:
      'Add role="dialog", aria-modal, and an accessible name (aria-label or aria-labelledby) to the dialog.',
    correct: false,
  },
]

export const steps: readonly Step[] = [
  { id: 'predict', label: 'Predict' },
  { id: 'observe', label: 'Observe' },
  { id: 'choose', label: 'Choose a repair' },
  { id: 'explain', label: 'Explain' },
  { id: 'try', label: 'Try the fix' },
]

export const previewOptions: PreviewOption[] = [
  { id: 'predict', label: 'Predict' },
  { id: 'observe', label: 'Observe' },
  { id: 'choose', label: 'Choose a repair' },
  { id: 'explain', label: 'Explain' },
  { id: 'feedback', label: 'Feedback (answer preview)' },
  { id: 'try', label: 'Try the fix' },
]

// Feedback mockup content — the only place answers appear.
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
