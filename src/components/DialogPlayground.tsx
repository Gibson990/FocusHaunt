// Static center playground: an original dialog fixture shown open, labelled as
// the intentional broken fixture. No opener/close/reset behavior is wired in
// M0 — buttons are real focusable elements so normal page keyboard access is
// preserved, but they do not drive the lesson loop. The fixture deliberately
// uses a non-native container (no <dialog> element) so the real milestone can
// demonstrate focus-left-behind without the native API silently fixing it.
export function DialogPlayground() {
  return (
    <section className="playground" aria-label="Dialog playground (mockup)">
      <div className="playground__chrome">
        <span className="playground__tag">Original dialog playground</span>
        <span className="pill pill--broken">Broken fixture · focus left behind on open</span>
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
          <p className="page-mock__hint">
            In the real lesson, activating this opener opens the dialog and leaves
            focus behind — the defect you will observe. Placeholder: not wired in
            this mockup.
          </p>

          {/* Broken fixture, shown open and static. Non-native dialog container. */}
          <div className="dialog" role="dialog" aria-labelledby="fh-dlg-title">
            <div className="dialog__head">
              <h2 id="fh-dlg-title" className="dialog__title">
                Edit name
              </h2>
              <button type="button" className="dialog__close" aria-label="Close dialog">
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
              <p className="dialog__note">
                Focus is left behind on open. Tab, Shift+Tab and Escape are not yet
                contained or wired.
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
        </div>
      </div>

      <div className="playground__affordances" aria-label="Fixture controls (placeholders)">
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
    </section>
  )
}
