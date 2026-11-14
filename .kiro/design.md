# FocusHaunt — Design (M0 mockup)

## Stack & layout
Vite + React + TypeScript single page. No lesson state machine in M0; every
section renders as a static placeholder. One polished visual direction (no A/B
exploration).

## File layout
- `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`
- `src/lesson.ts` — static lesson data (predict options, expected focus, two
  repairs, step list)
- `src/components/StepRail.tsx` — Predict → Observe → Choose a repair → Explain → Try the fix
- `src/components/DialogPlayground.tsx` — center original dialog fixture
  (static, broken-labelled, non-native)
- `src/components/LessonPanel.tsx` — predicted-target control, expected/observed
  focus, two repair options, reflection field, try-the-fix, reset/close
- `src/components/MockupBanner.tsx`, `src/components/Footer.tsx`

## Layout
Header (title + mockup banner) → step rail (top) → workspace grid: playground
(center) + lesson panel (side). Columns stack under ~880px; step rail wraps to
two columns then one.

## Visual direction
- Warm quiet background, dark ink, restrained ghost-green accent via CSS
  variables.
- Strong typography and spacing; system font stack; no external fonts; no
  invented installed font.
- No gradients, analytics chrome, excessive cards, or distracting animation.
- Visible `:focus-visible` rings, readable contrast, responsive grid, and
  `prefers-reduced-motion` support.

## Future focus handling (NOT in M0)
- Observed focus read from `document.activeElement` via real keyboard events;
  authored expected focus separate; never faked.
- Broken fixture: non-native dialog container with manual focus management so
  initial focus is genuinely left behind (no native `<dialog>` auto-focus).
  Tab/Shift+Tab wrap at both boundaries; Escape/close; restore focus to opener.
  Reset tears down listeners and inertness; safe to repeat.
- Correct repair vs ARIA-only distractor; reflection unscored before feedback;
  bundled repair applied to the fixture, not external code editing.

## Mocked vs functional (this milestone)

Mocked (no behavior):
- Step progression highlight (static; first step marked current as placeholder).
- Predicted-target radios (local form state only).
- Expected/observed focus readouts (placeholder text; observed explicitly NOT
  faked with a highlight or mode label).
- Repair option radios (local form state only; static descriptions).
- Reflection textarea (form only; unscored).
- Dialog fixture open/close/reset/escape (static render, not wired).
- "Apply bundled repair" / Reset / Close (placeholder buttons).

Functional:
- Page renders; all controls are real accessible elements with normal Tab
  order and visible focus.
- Responsive layout; reduced-motion; no external network/font requests.
- Page keyboard access preserved (no focus trap in M0).

## Blocked by missing dependencies (coordinator installs)
- `tsc --noEmit` typecheck (needs `typescript`, `@types/react`, `@types/react-dom`).
- `vite build` / `vite dev` (needs `vite`, `@vitejs/plugin-react`, `react`, `react-dom`).
- Any test execution (a browser-based runner is not part of the M0 manifest).
