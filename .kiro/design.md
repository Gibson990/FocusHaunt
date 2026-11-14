# FocusHaunt — Design (M0.1 mockup)

## Stack & layout
Vite + React + TypeScript single page. No lesson state machine; a single `stage`
value drives a state-preview selector that swaps static content. One polished
visual direction (no A/B).

## File layout (M0.1)
- `index.html`, `src/main.tsx`, `src/App.tsx`, `src/styles.css`
- `src/lesson.ts` — static data: predict options (neutral), two proposed changes
  (neutral), step list, preview options, and the `feedback` object (answers).
- `src/components/ProgressionIndicator.tsx` — compact, order-only 5-step list
  with an unnumbered "feedback" node; tracks no live state.
- `src/components/StateSelector.tsx` — `<select>` labelled exactly "Mockup
  state preview, not lesson progression"; swaps static stages only.
- `src/components/DialogPlayground.tsx` — static fixture per stage (unopened /
  broken-open / repaired-open); non-native container; no behavior wired.
- `src/components/StagePanel.tsx` — one current-stage panel (predict/observe/
  choose/explain/feedback/try); radios/textarea are local form state only.
- `src/components/MockupBanner.tsx`, `src/components/Footer.tsx`
- Removed in M0.1: `StepRail.tsx`, `LessonPanel.tsx`.

## Layout
Header (title + mockup banner) → compact progression indicator → state-preview
selector → workspace grid (playground + one current-stage panel). Columns stack
under ~880px. Initial state: prediction panel beside/above an unopened
preview-only fixture (neutral wording; the broken outcome and failure details
appear only in Observe and later previews).

## Visual direction
- Warm quiet background, dark ink, restrained ghost-green accent (CSS vars).
- System font stack; no external fonts; no invented installed fonts.
- No gradients, analytics chrome, excessive cards, or distracting animation.
- Visible `:focus-visible`, readable contrast, responsive grid, reduced-motion.

## Contrast (measured; not a full WCAG audit)
Computed WCAG 2.x ratios for key text surfaces:
- `--ink #2a2622` on `--bg #f3eee4` → 12.98:1 (headings/body)
- `--ink-mid #4a4239` on `--bg #f3eee4` → 8.53:1 (subtitle/hints)
- `--ink-mid #4a4239` on `--bg-elev #faf6ee` → 9.15:1 (panel text)
- `--ink-mid #4a4239` on `--bg-sunken #ece5d7` → 7.87:1 (notes)
- `--ink-mid #4a4239` on `--ghost-soft #e7efe9` → 8.42:1 (selected option text)
- `--ink #2a2622` on `--ghost-soft #e7efe9` → 12.81:1 (selected labels)
- `--ghost-ink #3f6151` on `--ghost-soft #e7efe9` → 5.89:1 (banner/ghost btn/pill)
- `--danger #9a4b3a` on `--bg-elev #faf6ee` → 5.66:1 (broken note)
- `--danger #9a4b3a` on `--danger-soft #f0e2dc` → 4.83:1 (broken pill)
- `--ink-soft #6b6258` on `--bg-sunken #ece5d7` → 4.77:1 (decorative URL only)

All meaningful text pairs are >= 4.5:1. This is a manual computed check, not a
full accessibility audit.

## Answer isolation
- Prediction view shows only neutral candidate targets; no expected target,
  correctness, or explanation in visible or accessible text.
- The two repairs are shown with neutral names ("Repair A"/"Repair B") and a
  proposed-change description beneath; correctness is shown only in the separate
  Feedback preview, which names the correct repair and repeats its proposed
  change.
- Feedback preview states the intended initial target (Name input), observed
  broken focus, which change is correct and why, why the distractor fails (ARIA
  does not move focus by itself), and that reflection is unscored.

## Mocked vs functional (M0.1)
Mocked (no behavior): stage switching (static content swap), predicted-target
radios (form only), observed focus readout (placeholder, not faked), repair
radios (form only), reflection textarea (form only), fixture open/close/reset/
escape (static render), "Apply bundled repair"/Reset (placeholder buttons),
intended-target and repair correctness (Feedback preview text only).
Functional: page renders; real accessible elements with normal Tab order and
visible focus; responsive layout; reduced-motion; no external requests.
Not functional / future: real opening/focus movement/Tab-Shift+Tab
containment/Escape/close/opener restore/reset/repair; browser acceptance tests.

## Checks
- Baseline (M0) typecheck/build passed via the documented review install path
  (`npm ci --ignore-scripts --no-audit --no-fund`); not rerun needlessly.
- M0.1 rerun this session: `npm run typecheck` → exit 0; `npm run build` →
  exit 0 (`dist/` produced).
- Browser interaction acceptance tests: future, not run. Static previews are
  not `activeElement` observations or working repaired dialogs.
