import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { predictOptions, repairOptions, expectedFocus } from '../lesson'
import type { FocusTargetId } from '../lesson'

export function LessonPanel() {
  return (
    <aside className="panel" aria-label="Lesson controls (mockup)">
      <PredictSection />
      <FocusSection />
      <RepairSection />
      <ReflectionSection />
      <TrySection />
    </aside>
  )
}

interface SectionProps {
  index: number
  step: string
  title: string
  note?: string
  children: ReactNode
}

function Section({ index, step, title, note, children }: SectionProps) {
  return (
    <section className="panel__section">
      <header className="panel__head">
        <span className="panel__index" aria-hidden="true">
          {index}
        </span>
        <div>
          <h2 className="panel__title">{title}</h2>
          <p className="panel__step">{step}</p>
        </div>
      </header>
      {note ? <p className="panel__note">{note}</p> : null}
      <div className="panel__body">{children}</div>
    </section>
  )
}

function PredictSection() {
  const name = useId()
  const [target, setTarget] = useState<FocusTargetId | ''>('')

  return (
    <Section
      index={1}
      step="Predict"
      title="Where should focus go when the dialog opens?"
      note="Placeholder — your choice lives in this form only; it does not drive the fixture."
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
    </Section>
  )
}

function FocusSection() {
  return (
    <Section
      index={2}
      step="Observe"
      title="Expected vs observed focus"
      note="Observed focus is read from the real DOM in the lesson. Here it is a placeholder — it is NOT faked with a highlight or a mode label."
    >
      <div className="focus">
        <div className="focus__cell">
          <h3 className="focus__label">Expected focus (authored)</h3>
          <p className="focus__value">{expectedFocus}</p>
        </div>
        <div className="focus__cell focus__cell--observed">
          <h3 className="focus__label">Observed focus (real activeElement)</h3>
          <p className="focus__value focus__value--placeholder">— awaiting real observation</p>
          <p className="focus__sub">Will reflect document.activeElement after you open the fixture.</p>
        </div>
      </div>
    </Section>
  )
}

function RepairSection() {
  const name = useId()
  const [choice, setChoice] = useState<'repairA' | 'repairB' | ''>('')

  return (
    <Section
      index={3}
      step="Choose a repair"
      title="Pick a bundled repair"
      note="Placeholder — selection does not apply a repair. In the lesson, only the correct repair passes the opening-focus requirement. ARIA alone does not move focus."
    >
      <fieldset className="repair">
        <legend className="repair__legend">Repair options</legend>
        <div className="repair__options">
          {repairOptions.map((option) => (
            <label
              key={option.id}
              className={`repair__option${choice === option.id ? ' is-selected' : ''}`}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={choice === option.id}
                onChange={() => setChoice(option.id)}
              />
              <span className="repair__name">{option.name}</span>
              <span className="repair__summary">{option.summary}</span>
              <ul className="repair__points">
                {option.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </label>
          ))}
        </div>
      </fieldset>
    </Section>
  )
}

function ReflectionSection() {
  return (
    <Section
      index={4}
      step="Explain"
      title="Reflection (unscored)"
      note="Self-explanation only. This text is NOT graded or semantically assessed."
    >
      <label className="reflection">
        <span className="reflection__label">Explain your choice before feedback</span>
        <textarea
          className="reflection__field"
          rows={4}
          placeholder="Why did focus fail on open, and why does your repair fix it?"
        />
      </label>
    </Section>
  )
}

function TrySection() {
  return (
    <Section
      index={5}
      step="Try the fix"
      title="Experience the repaired behavior"
      note="Placeholder — the bundled repair is applied to the fixture in the lesson, not by editing external code."
    >
      <p className="try__copy">
        After feedback, the corrected dialog moves focus to the first control on
        open, contains Tab/Shift+Tab, closes on Escape or the close button, and
        returns focus to the opener.
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
    </Section>
  )
}
