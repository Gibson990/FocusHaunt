# FocusHaunt — Design (M1 real lesson)

## Stack & layout
Vite + React + TypeScript single page. The lesson is real: a `phase` value from
`useLesson` drives a required phase flow and the live fixture. One polished
visual direction.

## File layout (M1)
- `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`
- `src/lesson.ts` — static data: phase order/meta, predict options (neutral),
  two proposed changes (neutral), step list, and the `feedback` object (answers).
- `src/lib/focus.ts` — focus utilities: `getFocusable`, `firstFocusable`,
  `lastFocusable`, `describeElement` (an honest activeElement label).
- `src/hooks/useDialogFocus.ts` — real focus management: broken (focus left
  behind, no Tab containment) vs repaired (initial focus to the Name input, Tab
  wrap at both boundaries, Escape/close, opener restore); reports the real
  activeElement.
- `src/hooks/useLesson.ts` — phase machine + state; gated advancing;
  Back/Continue/Restart.
- `src/components/ProgressionIndicator.tsx` — compact order-only 5-step list
  with an unnumbered feedback node; highlights the current phase
  (`aria-current="step"`).
- `src/components/DialogFixture.tsx` — real opener + non-native dialog; uses
  `useDialogFocus`; broken in Observe, repaired in Try.
- `src/components/StagePanel.tsx` — one current-stage panel (predict/observe/
  choose/explain/feedback/try), bound to lesson state.
- `src/components/MockupBanner.tsx`, `src/components/Footer.tsx`.
- Removed in M1: `StateSelector.tsx`, `DialogPlayground.tsx` (M0.1 static mockup
  parts). Removed in M0.1: `StepRail.tsx`, `LessonPanel.tsx`.

## Layout
Header (title + banner) → progression indicator → workspace grid (fixture + one
panel) → phase controls (Back / Continue / Start over) → footer. Columns stack
under ~880px. Initial state: the prediction panel beside a closed fixture; the
opener is disabled until Observe.

## Visual direction
- Warm quiet background, dark ink, restrained ghost-green accent (CSS vars).
- System font stack; no external fonts; no invented installed fonts.
- No gradients, analytics chrome, excessive cards, or distracting animation.
- Visible `:focus-visible`, readable contrast, responsive grid, reduced-motion.

## Contrast (measured; not a full WCAG audit)
Tokens unchanged from M0.1: `--ink` on `--bg` ~12.95:1; `--ink-mid #4a4239` on
light tokens ~7.86–9.19:1; `--ghost-ink` on `--ghost-soft` ~5.89:1; `--danger`
on `--danger-soft` ~4.83:1. All meaningful pairs >= 4.5:1. Not a full audit.

## Answer isolation
- Predict/Observe/Choose/Explain expose no answer (visible or accessible). The
  opener is disabled in predict so the defect cannot be observed before
  predicting.
- Repairs use neutral names ("Repair A"/"Repair B") with a proposed-change
  description; correctness is shown only in the separate Feedback stage, which
  names the correct repair and why the ARIA-only distractor fails.

## Real focus behavior (M1)
- Broken (Observe): open does not move focus (stays on the opener — the defect);
  Tab/Shift+Tab are not contained; Escape/close work and restore focus to the
  opener; reset is safe.
- Repaired (Try, Repair A applied): open moves focus to the Name input; Tab wraps
  last→first and Shift+Tab wraps first→last; Escape/close restore focus to the
  opener.
- Observed focus is the real `document.activeElement`, reported via
  `describeElement`; never a fake highlight or mode label.

## Mocked vs functional (M1)
Functional: phase machine + real fixture focus management + observed-focus
readout + repair application + unscored reflection + feedback.
Not functional / future: browser acceptance test execution (no runner in the
manifest); the Save button is a fixture control and does not persist (no
backend).

## Checks
- M1: `npm run typecheck` → exit 0; `npm run build` → exit 0 (`dist/` produced).
- Browser acceptance tests: specified in `tasks.md`, not run (no runner/DOM
  library in the manifest; none added).
