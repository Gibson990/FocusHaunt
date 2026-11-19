// One current-stage panel for the M1 real lesson. Renders the panel for the
// active phase, bound to real lesson state. Radios and the reflection field
// hold state in the lesson hook (not local form state), so choices persist
// across Back navigation.

import { useId } from 'react'
import type { ReactNode, RefObject } from 'react'
import { predictOptions, proposedChanges, feedback, phaseMeta } from '../lesson'
import type { FocusTargetId, LessonPhase, RepairId } from '../lesson'

interface StagePanelProps {
  phase: LessonPhase
  predicted: FocusTargetId | ''
  chosenRepair: RepairId | ''
  reflection: string
  observedFocus: string | null
  fixtureOpen: boolean
  appliedRepair: RepairId | null
  advanceAttempted: boolean
  predictionFocusRef: RefObject<HTMLInputElement>
  repairFocusRef: RefObject<HTMLInputElement>
  feedbackActionRef: RefObject<HTMLButtonElement>
  onPredicted: (value: FocusTargetId | '') => void
  onChosenRepair: (value: RepairId | '') => void
  onReflection: (value: string) => void
  onCloseFixture: () => void
  onResetFixture: () => void
  onChangeChoice: () => void
  onApplyCorrectRepair: () => void
}

export function StagePanel(props: StagePanelProps) {
  switch (props.phase) {
    case 'predict':
      return <PredictPanel {...props} />
    case 'observe':
      return <ObservePanel {...props} />
    case 'choose':
      return <ChoosePanel {...props} />
    case 'explain':
      return <ExplainPanel {...props} />
    case 'feedback':
      return <FeedbackPanel {...props} />
    case 'try':
      return <TryPanel {...props} />
  }
}

interface PanelProps {
  phase: LessonPhase
  title: string
  note?: string
  answer?: boolean
  children: ReactNode
}

function Panel({ phase, title, note, answer, children }: PanelProps) {
  const meta = phaseMeta.find((m) => m.id === phase)
  const className = answer
    ? 'panel__section panel__section--answer'
    : 'panel__section'
  return (
    <section className={className}>
      <header className="panel__head">
        <p className="panel__step">{meta?.label ?? phase}</p>
        <h2 className="panel__title">{title}</h2>
      </header>
      {note ? <p className="panel__note">{note}</p> : null}
      <div className="panel__body">{children}</div>
    </section>
  )
}

function PredictPanel({ predicted, onPredicted, advanceAttempted, predictionFocusRef }: StagePanelProps) {
  const name = useId()
  const errorId = useId()
  const showError = advanceAttempted && predicted === ''
  return (
    <Panel
      phase="predict"
      title="Where should focus go when the dialog opens?"
      note="Predict before observing. No expected target or answer is shown here."
    >
      <fieldset className="predict" aria-describedby={showError ? errorId : undefined}>
        <legend className="predict__legend">Predicted target</legend>
        <div className="predict__options">
          {predictOptions.map((option, index) => (
            <label key={option.id} className="predict__option">
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={predicted === option.id}
                onChange={() => onPredicted(option.id)}
                ref={index === 0 ? predictionFocusRef : undefined}
              />
              <span className="predict__label">{option.label}</span>
              <span className="predict__hint">{option.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {showError ? <p id={errorId} className="inline-guidance" role="alert">Choose a prediction before continuing.</p> : null}
    </Panel>
  )
}

function ObservePanel({ observedFocus, fixtureOpen, onCloseFixture }: StagePanelProps) {
  return (
    <Panel
      phase="observe"
      title="Observe the real focus"
      note="Open the broken fixture with the opener button above. The observed focus is the real document.activeElement — not a fake highlight or mode label."
    >
      <div className="focus">
        <div className="focus__cell focus__cell--observed">
          <h3 className="focus__label">Observed focus (real activeElement)</h3>
          {observedFocus ? (
            <p className="focus__value">{observedFocus}</p>
          ) : (
            <p className="focus__value focus__value--placeholder">
              — open the fixture to observe focus
            </p>
          )}
          <p className="focus__sub">
            Tab and Shift+Tab are not contained in the broken fixture; press Escape
            or the close button to close.
          </p>
        </div>
      </div>
      {fixtureOpen && (
        <div className="try__actions">
          <button type="button" className="btn" onClick={onCloseFixture}>
            Close fixture
          </button>
        </div>
      )}
    </Panel>
  )
}

function ChoosePanel({ chosenRepair, onChosenRepair, advanceAttempted, repairFocusRef }: StagePanelProps) {
  const name = useId()
  const errorId = useId()
  const showError = advanceAttempted && chosenRepair === ''
  return (
    <Panel
      phase="choose"
      title="Pick a bundled repair"
      note="Neutral descriptions only — which repair is correct is shown only in the Feedback stage."
    >
      <fieldset className="repair" aria-describedby={showError ? errorId : undefined}>
        <legend className="repair__legend">Proposed changes</legend>
        <div className="repair__options">
          {proposedChanges.map((option, index) => (
            <label
              key={option.id}
              className={
                chosenRepair === option.id
                  ? 'repair__option is-selected'
                  : 'repair__option'
              }
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={chosenRepair === option.id}
                onChange={() => onChosenRepair(option.id)}
                ref={index === 0 ? repairFocusRef : undefined}
              />
              <span className="repair__name">{option.name}</span>
              <span className="repair__summary">{option.change}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {showError ? <p id={errorId} className="inline-guidance" role="alert">Choose a repair before continuing.</p> : null}
    </Panel>
  )
}

function ExplainPanel({ reflection, onReflection, advanceAttempted }: StagePanelProps) {
  const errorId = useId()
  const showError = advanceAttempted && reflection.trim() === ''
  return (
    <Panel
      phase="explain"
      title="Reflection (unscored)"
      note="Self-explanation only — NOT graded or assessed. Feedback comes after this step."
    >
      <label className="reflection">
        <span className="reflection__label">Explain your choice before feedback</span>
        <textarea
          className="reflection__field"
          rows={4}
          value={reflection}
          onChange={(e) => onReflection(e.target.value)}
          placeholder="Why did focus fail on open, and why does your proposed change fix it?"
          aria-invalid={showError || undefined}
          aria-describedby={showError ? errorId : undefined}
        />
      </label>
      {showError ? <p id={errorId} className="inline-guidance" role="alert">Add a brief self-explanation before continuing. It is not graded.</p> : null}
    </Panel>
  )
}

function FeedbackPanel({ chosenRepair, onChangeChoice, onApplyCorrectRepair, feedbackActionRef }: StagePanelProps) {
  const selected = proposedChanges.find((change) => change.id === chosenRepair)
  const selectedExplanation = selected?.correct ? feedback.whyCorrect : feedback.whyDistractorFails
  return (
    <Panel
      phase="feedback"
      title="Feedback"
      answer
      note="The answers. Separate from the prediction view."
    >
      <div className="feedback">
        <div className="feedback__block">
          <h3 className="feedback__label">Your choice</h3>
          <p className="feedback__value">{selected?.name ?? 'No repair selected'}</p>
          {selected ? <p className="feedback__sub">{selected.change}</p> : null}
          {selectedExplanation ? <p className="feedback__sub">{selectedExplanation}</p> : null}
        </div>
        <div className="feedback__block">
          <h3 className="feedback__label">Intended initial target</h3>
          <p className="feedback__value">{feedback.intendedTarget}</p>
          <p className="feedback__sub">{feedback.intendedReason}</p>
        </div>
        <div className="feedback__block">
          <h3 className="feedback__label">Observed (broken)</h3>
          <p className="feedback__value">{feedback.observedBroken}</p>
        </div>
        <div className="feedback__block">
          <h3 className="feedback__label">Correct repair</h3>
          <p className="feedback__value">
            {feedback.correctChange.name} — {feedback.correctChange.change}
          </p>
          <p className="feedback__sub">{feedback.whyCorrect}</p>
        </div>
        <div className="feedback__block">
          <h3 className="feedback__label">Distractor</h3>
          <p className="feedback__value">
            {feedback.distractorChange.name} — {feedback.distractorChange.change}
          </p>
          <p className="feedback__sub">{feedback.whyDistractorFails}</p>
        </div>
        <p className="feedback__note">{feedback.reflectionNote}</p>
        <div className="try__actions">
          <button type="button" className="btn" onClick={onChangeChoice} ref={feedbackActionRef}>Change my choice</button>
          <button type="button" className="btn btn--ghost" onClick={onApplyCorrectRepair}>Apply the correct repair</button>
        </div>
      </div>
    </Panel>
  )
}

function TryPanel({ appliedRepair, onResetFixture }: StagePanelProps) {
  return (
    <Panel
      phase="try"
      title="Experience the repaired behavior"
      note="The correct bundled repair (Repair A) is applied to the fixture above. Open it to experience the real repaired behavior — not an edited copy of your code."
    >
      <p className="try__copy">
        After feedback, the corrected dialog moves focus to the Name input on open,
        contains Tab/Shift+Tab, closes on Escape or the close button, and returns
        focus to the opener.
      </p>
      <div className="try__actions">
        <button type="button" className="btn" onClick={onResetFixture}>
          Reset fixture
        </button>
      </div>
      <p className="try__sub">Applied repair: {appliedRepair ?? 'none'}.</p>
    </Panel>
  )
}
