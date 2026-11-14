import { steps } from '../lesson'

export function StepRail() {
  return (
    <nav className="steps" aria-label="Lesson progression">
      <ol className="steps__list">
        {steps.map((step, i) => (
          <li
            key={step.id}
            className="steps__item"
            aria-current={i === 0 ? 'step' : undefined}
          >
            <span className="steps__index" aria-hidden="true">
              {i + 1}
            </span>
            <span className="steps__text">
              <span className="steps__name">{step.label}</span>
              <span className="steps__detail">{step.detail}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="steps__hint">
        Intended progression. The highlighted step is a static placeholder, not
        live state.
      </p>
    </nav>
  )
}
