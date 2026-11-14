import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { predictOptions, proposedChanges, feedback } from '../lesson'
import type { FocusTargetId, PreviewStage } from '../lesson'

interface StagePanelProps {
  stage: PreviewStage
}

// One current-stage panel, rendered from the selected preview state. No lesson
// logic: radios/textarea hold local form state only.
export function StagePanel({ stage }: StagePanelProps) {
  switch (stage) {
    case 'predict':
      return <PredictPanel />
    case 'observe':
      return <ObservePanel />
    case 'choose':
      return <ChoosePanel />
    case 'explain':
      return <ExplainPanel />
    case 'feedback':
      return <FeedbackPanel />
    case 'try':
      return <TryPanel />
    default:
      return null
  }
}

interface PanelProps {
  step?: string
  title: string
  note?: string
  answer?: boolean
  children: ReactNode
}

function Panel({ step, title, note, answer, children }: PanelProps) {
  const className = answer
    ? 'panel__section panel__section--answer'
    : 'panel__section'
  return (
    <section className={className}>
      <header className="panel__head">
        {step ? <p className="panel__step">{step}</p> : null}
        <h2 className="panel__title">{title}</h2>
      </header>
      {note ? <p className="panel__note">{note}</p> : null}
      <div className="panel__body">{children}</div>
    </section>
  )
}

function PredictPanel() {
  const name = useId()
  const [target, setTarget] = useState<FocusTargetId | ''>('')

  return (
    <Panel
      step="Predict"
      title="Where should focus go when the dialog opens?"
      note="Prediction only — no expected target, answer, or explanation is shown here. Your choice lives in this form only."
    >
      <fieldset className="predict">
        <legend className="predict__legend">Predicted target</legend>
        <div className="predict__options">
          {predictOptions.map((option) => (
            <label key={option.id} className="predict__option">
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={target === option.id}
                onChange={() => setTarget(option.id)}
              />
              <span className="predict__label">{option.label}</span>
              <span className="predict__hint">{option.hint}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </Panel>
  )
}

function ObservePanel() {
  return (
    <Panel
      step="Observe"
      title="Observed focus"
      note="Observed focus is read from the real DOM in the lesson. This is a placeholder — it is NOT faked with a highlight or a mode label. The expected target is shown only in the Feedback preview."
    >
      <div className="focus">
        <div className="focus__cell focus__cell--observed">
          <h3 className="focus__label">Observed focus (real activeElement)</h3>
          <p className="focus__value focus__value--placeholder">— awaiting real observation</p>
          <p className="focus__sub">
            In the real lesson this reads document.activeElement after the broken
            fixture opens; the defect leaves focus behind rather than moving it
            into the dialog.
          </p>
        </div>
      </div>
    </Panel>
  )
}

function ChoosePanel() {
  const name = useId()
  const [choice, setChoice] = useState<'changeOne' | 'changeTwo' | ''>('')

  return (
    <Panel
      step="Choose a repair"
      title="Pick a proposed change"
      note="Neutral descriptions only — which change is correct is shown only in the Feedback preview. Selection here is a placeholder."
    >
      <fieldset className="repair">
        <legend className="repair__legend">Proposed changes</legend>
        <div className="repair__options">
          {proposedChanges.map((option) => (
            <label
              key={option.id}
              className={
                choice === option.id
                  ? 'repair__option is-selected'
                  : 'repair__option'
              }
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={choice === option.id}
                onChange={() => setChoice(option.id)}
              />
              <span className="repair__name">{option.name}</span>
              <span className="repair__summary">{option.change}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </Panel>
  )
}

function ExplainPanel() {
  return (
    <Panel
      step="Explain"
      title="Reflection (unscored)"
      note="Self-explanation only. This text is NOT graded or semantically assessed. Feedback comes after this step."
    >
      <label className="reflection">
        <span className="reflection__label">Explain your choice before feedback</span>
        <textarea
          className="reflection__field"
          rows={4}
          placeholder="Why did focus fail on open, and why does your proposed change fix it?"
        />
      </label>
    </Panel>
  )
}

function FeedbackPanel() {
  return (
    <Panel
      step="Feedback"
      title="Feedback (answer preview)"
      answer
      note="This mockup contains the answers. It is separate from the prediction view."
    >
      <div className="feedback">
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
      </div>
    </Panel>
  )
}

function TryPanel() {
  return (
    <Panel
      step="Try the fix"
      title="Repaired behavior (static preview)"
      note="Static preview only — not an activeElement observation and not a working repaired dialog. The bundled repair is applied to the fixture in the real lesson, not by editing external code."
    >
      <p className="try__copy">
        After feedback, the corrected dialog would move focus to the Name input on
        open, contain Tab/Shift+Tab, close on Escape or the close button, and
        return focus to the opener.
      </p>
      <div className="try__actions">
        <button type="button" className="btn btn--ghost">
          Apply bundled repair
        </button>
        <button type="button" className="btn">
          Reset
        </button>
      </div>
      <p className="try__sub">Buttons are placeholders in this mockup.</p>
    </Panel>
  )
}
