import { useEffect, useRef } from 'react'
import { MockupBanner } from './components/MockupBanner'
import { ProgressionIndicator } from './components/ProgressionIndicator'
import { DialogFixture } from './components/DialogFixture'
import { StagePanel } from './components/StagePanel'
import { Footer } from './components/Footer'
import { useLesson } from './hooks/useLesson'
import { phaseMeta } from './lesson'

export function App() {
  const lesson = useLesson()
  const firstPredictionRef = useRef<HTMLInputElement>(null)
  const firstRepairRef = useRef<HTMLInputElement>(null)
  const feedbackActionRef = useRef<HTMLButtonElement>(null)
  const phaseHeadingRef = useRef<HTMLHeadingElement>(null)
  const { state } = lesson
  const canOpen = state.phase === 'observe' || state.phase === 'try'
  const meta = phaseMeta.find((m) => m.id === state.phase)
  const isLast = state.phase === 'try'
  const restart = () => {
    lesson.restart()
    requestAnimationFrame(() => firstPredictionRef.current?.focus())
  }

  useEffect(() => {
    const target = state.focusDestination === 'prediction'
      ? firstPredictionRef.current
      : state.focusDestination === 'repairChoice'
        ? firstRepairRef.current
        : state.focusDestination === 'feedbackAction'
          ? feedbackActionRef.current
          : state.focusDestination === 'phaseHeading'
            ? phaseHeadingRef.current
            : null
    if (!target) return
    target.focus()
    lesson.clearFocusDestination()
  }, [state.focusDestination, lesson.clearFocusDestination])

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title">
          <h1>FocusHaunt</h1>
          <p className="app__subtitle">A guided keyboard-focus lesson</p>
        </div>
        <MockupBanner />
      </header>

      <ProgressionIndicator current={state.phase} />

      <main className="workspace">
        <DialogFixture
          phase={state.phase}
          open={state.fixtureOpen}
          appliedRepair={state.appliedRepair}
          canOpen={canOpen}
          onOpen={lesson.openFixture}
          onClose={lesson.closeFixture}
          onObserved={lesson.setObservedFocus}
          restoreFocusToOpener={state.focusDestination === null}
        />
        <StagePanel
          phase={state.phase}
          predicted={state.predicted}
          chosenRepair={state.chosenRepair}
          reflection={state.reflection}
          observedFocus={state.observedFocus}
          fixtureOpen={state.fixtureOpen}
          appliedRepair={state.appliedRepair}
          advanceAttempted={state.advanceAttempted}
          predictionFocusRef={firstPredictionRef}
          repairFocusRef={firstRepairRef}
          feedbackActionRef={feedbackActionRef}
          phaseHeadingRef={phaseHeadingRef}
          onPredicted={lesson.setPredicted}
          onChosenRepair={lesson.setChosenRepair}
          onReflection={lesson.setReflection}
          onCloseFixture={lesson.closeFixture}
          onResetFixture={lesson.resetFixture}
          onChangeChoice={lesson.changeChoice}
          onApplyCorrectRepair={lesson.applyCorrectRepair}
        />
      </main>

      <div className="phase-controls" aria-label="Lesson phase controls">
        <span className="phase-controls__current">{meta?.label ?? state.phase}</span>
        <div className="phase-controls__buttons">
          <button
            type="button"
            className="btn"
            onClick={lesson.back}
            disabled={state.phase === 'predict'}
          >
            Back
          </button>
          {isLast ? (
            <button type="button" className="btn btn--ghost" onClick={restart}>
              Start over
            </button>
          ) : state.phase !== 'feedback' ? (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={lesson.next}
            >
              Continue
            </button>
          ) : null}
        </div>
      </div>

      <Footer />
    </div>
  )
}
