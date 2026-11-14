import type { PreviewStage } from '../lesson'

interface DialogPlaygroundProps {
  stage: PreviewStage
}

// Static center playground. The fixture is shown in one static state per
// preview stage (unopened / broken-open / repaired-open). No opener, close,
// reset, or focus behavior is wired — buttons are real focusable elements so
// normal page keyboard access is preserved, but they do not drive any dialog.
// The fixture uses a non-native container (no <dialog>) so a future milestone
// can show focus-left-behind without the native API silently fixing it.
export function DialogPlayground({ stage }: DialogPlaygroundProps) {
  const isOpen = stage !== 'predict'
  const isRepaired = stage === 'try'

  let pillClass: string
  let pillText: string
  if (stage === 'predict') {
    pillClass = 'pill'
    pillText = 'Unopened fixture · preview only'
  } else if (isRepaired) {
    pillClass = 'pill pill--repaired'
    pillText = 'Repaired · static preview'
  } else {
    pillClass = 'pill pill--broken'
    pillText = 'Broken fixture · focus left behind on open'
  }

  // Predict stays neutral: no broken outcome is revealed until Observe or later.
  const hint =
    stage === 'predict'
      ? 'The fixture is not open yet. This is a preview-only mockup; opening behavior is not implemented.'
      : isRepaired
        ? 'Repaired preview: the dialog is shown open as a static mockup — not a working dialog and not a real focus observation.'
        : 'The broken fixture is shown open. Focus is left behind on open; Tab, Shift+Tab and Escape are not yet contained or wired.'

  return (
    <section className="playground" aria-label="Dialog playground (mockup)">
      <div className="playground__chrome">
        <span className="playground__tag">Original dialog playground</span>
        <span className={pillClass}>{pillText}</span>
      </div>

      <div className="page-mock">
        <div className="page-mock__bar" aria-hidden="true">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="page-mock__url">example.com/account</span>
        </div>

        <div className="page-mock__body">
          <button type="button" className="page-mock__opener">
            Open “Edit name” dialog
          </button>
          <p className="page-mock__hint">{hint}</p>

          {isOpen && (
            <div className="dialog" role="dialog" aria-labelledby="fh-dlg-title">
              <div className="dialog__head">
                <h2 id="fh-dlg-title" className="dialog__title">
                  Edit name
                </h2>
                <button
                  type="button"
                  className="dialog__close"
                  aria-label="Close dialog"
                >
                  ×
                </button>
              </div>

              <div className="dialog__body">
                <label className="field">
                  <span className="field__label">Name</span>
                  <input
                    type="text"
                    className="field__input"
                    defaultValue="Ada Lovelace"
                  />
                </label>
                <p
                  className={
                    isRepaired
                      ? 'dialog__note dialog__note--repaired'
                      : 'dialog__note'
                  }
                >
                  {isRepaired
                    ? 'Repaired (static preview): focus would move to the Name input on open; Tab/Shift+Tab would be contained; Escape/close would work; focus would return to the opener.'
                    : 'Focus is left behind on open. Tab, Shift+Tab and Escape are not yet contained or wired.'}
                </p>
              </div>

              <div className="dialog__foot">
                <button type="button" className="btn btn--ghost">
                  Save
                </button>
                <button type="button" className="btn">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="playground__affordances"
          aria-label="Fixture controls (placeholders)"
        >
          <span className="affordance">
            Reset <span className="affordance__kbd">placeholder</span>
          </span>
          <span className="affordance">
            Close <span className="affordance__kbd">placeholder</span>
          </span>
          <span className="affordance">
            Escape <span className="affordance__kbd">placeholder</span>
          </span>
        </div>
      )}
    </section>
  )
}
