# FocusHaunt — Tasks

## M0 — Static mockup (this milestone)
- [x] Scaffold Vite + React + TS project files (no package install).
- [x] Concise `.kiro` records: requirements, design, tasks, one-lesson spec.
- [x] Single polished visual direction: warm bg, ink, ghost-green; typography and
  spacing; visible focus styles; responsive; reduced-motion; system fonts; no
  external requests.
- [x] Layout: header + mockup banner, step rail, playground center, lesson panel side.
- [x] Placeholders: predicted-target control, expected/observed focus display,
  two repair options, reflection field, reset/close affordances.
- [x] Dialog fixture static render (non-native), contained and labelled; mockup
  markings throughout.
- [x] Report blocked checks.

## Blocked (need dependency install by coordinator)
- [ ] `npm install` (react, react-dom, typescript, vite, @vitejs/plugin-react,
  @types/react, @types/react-dom).
- [ ] `npm run typecheck` and `npm run build` verification.
- [ ] Browser test runner + acceptance tests (separately approved; not in the M0
  manifest).

## Next milestone — DO NOT implement in M0
- [ ] Lesson phase machine: Predict → Observe → Choose → Explain → Try, with real
  ordering enforced.
- [ ] Real observed focus via `activeElement`; separate from authored expected;
  no fake highlight/mode label.
- [ ] Broken fixture: non-native container, real focus-left-behind, Tab/Shift+Tab
  containment at both boundaries, Escape/close, opener restore, safe reset.
- [ ] Bundled repairs: correct (initial focus + both wrap boundaries + escape +
  restore) vs ARIA-only distractor (fails opening focus; no "ARIA moves focus"
  myth); feedback explains the difference.
- [ ] Unscored reflection before feedback; honest bundled-repair application label.
- [ ] Browser acceptance tests: real Tab/Shift+Tab/Escape/close/reset; assert real
  focus/DOM (no `focus()` helpers, no mode-based PASS); cover prediction/feedback
  ordering, both wrap boundaries, opener restoration, shell access.

## Status
M0 files created. Build, typecheck, and tests are blocked pending dependency
install by the coordinator.
