// Real interactive dialog fixture for M1. The opener opens a non-native
// dialog container. Broken mode (Observe) leaves focus behind on the opener and
// does not contain Tab. Repaired mode (Try, correct repair applied) moves focus
// to the Name input on open, contains Tab/Shift+Tab at both boundaries, and
// restores focus to the opener on close. Observed focus is the real
// document.activeElement reported by useDialogFocus — never a fake highlight.

import { useRef } from 'react'
import { useDialogFocus } from '../hooks/useDialogFocus'
import type { LessonPhase, RepairId } from '../lesson'

interface DialogFixtureProps {
  phase: LessonPhase
  open: boolean
  appliedRepair: RepairId | null
  /** The opener is only active where observing/trying is allowed. */
  canOpen: boolean
  onOpen: () => void
  onClose: () => void
  onObserved: (description: string | null) => void
  restoreFocusToOpener: boolean
}

export function DialogFixture({
  phase,
  open,
  appliedRepair,
  canOpen,
  onOpen,
  onClose,
  onObserved,
  restoreFocusToOpener,
}: DialogFixtureProps) {
  const openerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const repaired = phase === 'try' && appliedRepair === 'repairA'

  useDialogFocus({
    open,
    containerRef: dialogRef,
    openerRef,
    repaired,
    onClose,
    onObserved,
    restoreFocusToOpener,
  })

  const pillClass = repaired
    ? 'pill pill--repaired'
    : open
      ? 'pill pill--broken'
      : 'pill pill--preview'
  const pillText = repaired
    ? 'Repaired · real behavior'
    : open
      ? 'Broken · focus left behind on open'
      : 'Fixture closed'

  return (
    <section className="playground" aria-label="Dialog fixture">
      <div className="playground__chrome">
        <span className="playground__tag">Original dialog fixture</span>
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
          <button
            type="button"
            ref={openerRef}
            className="page-mock__opener"
            disabled={!canOpen}
            onClick={onOpen}
          >
            Open “Edit name” dialog
          </button>
          <p className="page-mock__hint">
            {canOpen
              ? 'Activating the opener opens the dialog. Focus behavior is real — observe it with Tab, Shift+Tab, and Escape.'
              : 'The opener is available in the Observe and Try stages.'}
          </p>

          {open && (
            <div
              className="dialog"
              role="dialog"
              aria-labelledby="fh-dlg-title"
              aria-modal={repaired ? true : undefined}
              ref={dialogRef}
            >
              <div className="dialog__head">
                <h2 id="fh-dlg-title" className="dialog__title">
                  Edit name
                </h2>
                <button
                  type="button"
                  className="dialog__close"
                  aria-label="Close dialog"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>

              <div className="dialog__body">
                <label className="field">
                  <span className="field__label">Name</span>
                  <input
                    type="text"
                    name="name"
                    className="field__input"
                    defaultValue="Ada Lovelace"
                  />
                </label>
                <p
                  className={
                    repaired ? 'dialog__note dialog__note--repaired' : 'dialog__note'
                  }
                >
                  {repaired
                    ? 'Repaired: focus moves to the Name input on open; Tab/Shift+Tab are contained; Escape/close work; focus returns to the opener.'
                    : 'Broken: focus is left behind on open. Tab and Shift+Tab are not contained; Escape closes and restores focus to the opener.'}
                </p>
              </div>

              <div className="dialog__foot">
                <button type="button" className="btn" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
