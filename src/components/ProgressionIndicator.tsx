// Compact, order-only progression indicator. Highlights the current phase and
// marks it with aria-current="step". It does not drive navigation — the phase
// controls (Back/Continue) do. Feedback is shown as an unnumbered node between
// Explain and Try the fix.

import { Fragment } from 'react'
import { steps } from '../lesson'
import type { LessonPhase } from '../lesson'

interface ProgressionIndicatorProps {
  current: LessonPhase
}

export function ProgressionIndicator({ current }: ProgressionIndicatorProps) {
  return (
    <nav className="progression" aria-label="Lesson progression">
      <ol className="progression__list">
        {steps.map((step, i) => (
          <Fragment key={step.id}>
            <li
              className={`progression__item${current === step.id ? ' is-current' : ''}`}
              aria-current={current === step.id ? 'step' : undefined}
            >
              <span className="progression__index">{i + 1}</span>
              <span className="progression__label">{step.label}</span>
            </li>
            {i === 3 && (
              <li
                className={`progression__item progression__item--feedback${
                  current === 'feedback' ? ' is-current' : ''
                }`}
                aria-current={current === 'feedback' ? 'step' : undefined}
              >
                <span className="progression__index progression__index--feedback">·</span>
                <span className="progression__label">feedback</span>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
      <p className="progression__hint">
        Order is required. The current stage is highlighted; you cannot skip ahead.
      </p>
    </nav>
  )
}
