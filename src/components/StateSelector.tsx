import { previewOptions } from '../lesson'
import type { PreviewStage } from '../lesson'

interface StateSelectorProps {
  stage: PreviewStage
  onChange: (stage: PreviewStage) => void
}

// The static state-preview selector. Its accessible label is fixed to the
// exact required phrase. It only swaps which static stage is inspected; it does
// not open, close, or manage real focus.
export function StateSelector({ stage, onChange }: StateSelectorProps) {
  return (
    <div className="selector">
      <label className="selector__label" htmlFor="fh-stage">
        Mockup state preview, not lesson progression
      </label>
      <select
        id="fh-stage"
        className="selector__select"
        value={stage}
        onChange={(e) => onChange(e.target.value as PreviewStage)}
      >
        {previewOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <p className="selector__note">
        Inspects static states only; does not open, close, or manage real focus.
      </p>
    </div>
  )
}
