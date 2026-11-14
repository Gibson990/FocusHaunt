import { useState } from 'react'
import { MockupBanner } from './components/MockupBanner'
import { ProgressionIndicator } from './components/ProgressionIndicator'
import { StateSelector } from './components/StateSelector'
import { DialogPlayground } from './components/DialogPlayground'
import { StagePanel } from './components/StagePanel'
import { Footer } from './components/Footer'
import type { PreviewStage } from './lesson'

export function App() {
  // Mockup state-preview only. This is NOT a lesson state machine: it only
  // swaps which static stage is inspected and does not open/close/manage focus.
  const [stage, setStage] = useState<PreviewStage>('predict')

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title">
          <h1>FocusHaunt</h1>
          <p className="app__subtitle">A guided keyboard-focus lesson</p>
        </div>
        <MockupBanner />
      </header>

      <ProgressionIndicator />
      <StateSelector stage={stage} onChange={setStage} />

      <main className="workspace">
        <DialogPlayground stage={stage} />
        <StagePanel stage={stage} />
      </main>

      <Footer />
    </div>
  )
}
