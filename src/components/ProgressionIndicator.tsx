import { Fragment } from 'react'
import { steps } from '../lesson'

// Compact, order-only progression indicator. It does not track live lesson
// state and highlights no "current" step. Feedback is shown as an unnumbered
// node between Explain and Try the fix.
export function ProgressionIndicator() {
  return (
    <nav className="progression" aria-label="Lesson progression (order only)">
      <ol className="progression__list">
        {steps.map((step, i) => (
          <Fragment key={step.id}>
            <li className="progression__item">
              <span className="progression__index">{i + 1}</span>
              <span className="progression__label">{step.label}</span>
            </li>
            {i === 3 && (
              <li
                className="progression__item progression__item--feedback"
                aria-hidden="true"
              >
                <span className="progression__index progression__index--feedback">·</span>
                <span className="progression__label">feedback</span>
              </li>
            )}
          </Fragment>
        ))}
      </ol>
      <p className="progression__hint">
        Order only. Feedback previews the answer separately. This indicator does
        not track live lesson state.
      </p>
    </nav>
  )
}
