// Static lesson data for the M0 mockup. No behavior is driven from this yet;
// it describes the single lesson and the two bundled repairs so the next
// milestone can wire real interactions against a stable shape.

export type FocusTargetId =
  | 'opener'
  | 'title'
  | 'firstControl'
  | 'closeButton'
  | 'background'

export interface PredictOption {
  id: FocusTargetId
  label: string
  hint: string
}

export interface RepairOption {
  id: 'repairA' | 'repairB'
  name: string
  summary: string
  points: string[]
  /** Reserved for the next milestone; not surfaced in the M0 mockup. */
  correct: boolean
}

export interface Step {
  id: 'predict' | 'observe' | 'choose' | 'explain' | 'try'
  label: string
  detail: string
}

export const predictOptions: PredictOption[] = [
  { id: 'opener', label: 'The opener button', hint: 'The element that opened the dialog.' },
  { id: 'title', label: 'The dialog title', hint: 'A static label — not focusable by default.' },
  {
    id: 'firstControl',
    label: 'The first focusable control inside the dialog',
    hint: 'For example, the name input.',
  },
  { id: 'closeButton', label: 'The close button', hint: 'Present, but is it the best first target?' },
  { id: 'background', label: 'The page background', hint: 'No focusable target behind the dialog.' },
]

export const expectedFocus = 'First focusable control inside the dialog (the name input).'

export const repairOptions: RepairOption[] = [
  {
    id: 'repairA',
    name: 'Bundled repair — focus, containment, restore',
    summary:
      'Sets a justified initial focus target on open, repairs Tab/Shift+Tab wrap inside the dialog, wires Escape/close, and restores focus to the opener.',
    points: [
      'Initial focus to the first control on open',
      'Tab / Shift+Tab contained within the dialog (both wrap boundaries)',
      'Escape closes; the close button closes',
      'Focus returns to the opener on close',
    ],
    correct: true,
  },
  {
    id: 'repairB',
    name: 'Distractor — ARIA attributes only',
    summary:
      'Adds role/aria-modal/aria-label and a roving tabindex, but does not move focus on open.',
    points: [
      'Adds role="dialog" and aria-modal="true"',
      'Adds aria-label / aria-labelledby',
      'Does NOT set initial focus on open',
      'ARIA does not move focus by itself',
    ],
    correct: false,
  },
]

export const steps: readonly Step[] = [
  { id: 'predict', label: 'Predict', detail: 'Choose where focus SHOULD go when the dialog opens.' },
  { id: 'observe', label: 'Observe', detail: 'Open the broken fixture and read the real observed focus.' },
  { id: 'choose', label: 'Choose a repair', detail: 'Pick between the two bundled repairs.' },
  { id: 'explain', label: 'Explain', detail: 'Write an unscored reflection before feedback.' },
  { id: 'try', label: 'Try the fix', detail: 'Experience the real repaired behavior.' },
]
