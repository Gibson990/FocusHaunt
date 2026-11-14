import { MockupBanner } from './components/MockupBanner'
import { StepRail } from './components/StepRail'
import { DialogPlayground } from './components/DialogPlayground'
import { LessonPanel } from './components/LessonPanel'
import { Footer } from './components/Footer'

export function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__title">
          <h1>FocusHaunt</h1>
          <p className="app__subtitle">A guided keyboard-focus lesson</p>
        </div>
        <MockupBanner />
      </header>

      <StepRail />

      <main className="workspace">
        <DialogPlayground />
        <LessonPanel />
      </main>

      <Footer />
    </div>
  )
}
