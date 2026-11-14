# FocusHaunt — Tasks

## M0.1 — Static mockup revision (this milestone)
- [x] Replace five expanded panels with compact progression indicator +
  playground + one current-stage panel; initial state = prediction beside an
  unopened preview-only fixture.
- [x] Add state-preview `<select>` labelled exactly "Mockup state preview, not
  lesson progression"; inspects static states, controls no dialog behavior.
- [x] Prediction view exposes no expected target/correctness/explanation/answer
  (visible or accessible). Repair options renamed to neutral proposed-change
  descriptions. Answers moved to a separate explicit Feedback preview.
- [x] State the Name input is the intended initial target (edit immediately);
  distinguish from DOM Tab order (close button precedes it); no "first
  focusable control" claim; no universal rule.
- [x] Darken meaningful helper/status/placeholder text and step numerals
  (`--ink-mid`); record measured contrast pairs (design.md); keep visible focus.
- [x] Update footer/README/.kiro honestly; preserve one dialog and palette; add
  no interaction state machine or real behavior; keep reflection unscored.
- [x] Remove unused `StepRail.tsx` and `LessonPanel.tsx`.

## M0.1 verification (actually run this session)
- `npm run typecheck` → exit 0.
- `npm run build` → exit 0; `dist/index.html`, `dist/assets/index-*.js`
  (~155.6 kB), `dist/assets/index-*.css` (~9.4 kB).
- Browser acceptance tests: NOT run (future).

## M0 — Static mockup (prior milestone)
- [x] Scaffold Vite + React + TS files (no package install).
- [x] Concise `.kiro` records; one polished visual direction; placeholders for
  predicted target, expected/observed focus, two repairs, reflection, reset/
  close; static broken dialog fixture (non-native, contained, labelled).
- [x] Report blocked checks.

## Blocked / future (not done in M0.1)
- [ ] Coordinator review install path: `npm ci --ignore-scripts --no-audit
  --no-fund` (documented; not rerun needlessly).
- [ ] Lesson phase machine + real opening/focus/containment/Escape/restore/
  reset/repair behavior.
- [ ] Browser acceptance tests: real Tab/Shift+Tab/Escape/close/reset asserting
  real focus/DOM (no `focus()` helpers, no mode-based PASS); cover prediction/
  feedback ordering, both wrap boundaries, opener restoration, shell access.

## Status
M0.1 files written; typecheck and build pass. Browser tests remain future/unrun.
