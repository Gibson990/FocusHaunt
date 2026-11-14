export function Footer() {
  return (
    <footer className="footer">
      <p>FocusHaunt — one-lesson reasoning-and-repair experiment.</p>
      <p className="footer__muted">
        Milestone M1: real lesson. Available automated checks are tsc --noEmit and
        vite build; browser acceptance tests are specified, not run (no runner in
        the manifest). Observed focus is the real document.activeElement; answers
        appear only in Feedback.
      </p>
    </footer>
  )
}
