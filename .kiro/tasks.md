# FocusHaunt — Tasks

## M1 — accepted 2026-11-17 after independent review
- [x] Lesson phase machine: Predict → Observe → Choose → Explain → Feedback →
  Try, order required; Continue is gated, Back revisits, Restart resets.
- [x] Real non-native dialog fixture: opener opens; broken mode leaves focus
  behind on open (no initial focus, Tab not contained); repaired mode moves
  focus to the Name input, contains Tab/Shift+Tab at both boundaries, closes on
  Escape/close, restores focus to the opener; reset is safe and repeatable.
- [x] Real observed focus via `document.activeElement` (`describeElement`);
  separate from the authored expected target; no fake highlight or mode label.
- [x] Two bundled repairs: Repair A (correct, focus management) vs Repair B
  (ARIA-only distractor, fails opening focus). Feedback explains the
  difference; Repair A is applied to the fixture in Try (not external code edit).
- [x] Unscored reflection before feedback; answers confined to the Feedback
  stage; the prediction view exposes no answer.
- [x] Predict option labels the Name input (not "first focusable control");
  feedback justifies it for this dialog and distinguishes task focus from DOM
  tab order (close button precedes the input).
- [x] Missing Predict/Choose/Explain input produces accessible inline guidance;
  whitespace-only reflection cannot advance and remains unscored.
- [x] Feedback acknowledges the selected repair and offers Change my choice.
- [x] Apply the correct repair is explicit; the learner choice remains distinct.
- [x] Removed the inert Save control; restart focuses the first prediction radio.
- [x] Repaired open uses aria-modal with managed inert background; broken mode
  deliberately leaves its background available.

## M1 verification (run this work)
- `npm run typecheck` → exit 0.
- `npm run build` → exit 0; `dist/` produced (`index.html` ~0.60 kB,
  `assets/index-*.js` ~162.0 kB, `assets/index-*.css` ~10.0 kB).
- `node --test src/lessonState.test.mjs` → 4 passed (installed Node runner).
- Focused localhost smoke checks passed for the six bounded repairs. Native
  Tab/Shift+Tab wrap at both repaired boundaries was verified in a real browser
  on 2026-11-17.

## M1 acceptance tests (specified; require a runner + DOM not in the manifest)
- Predict before observe: the opener is disabled outside Observe/Try; Continue
  is gated until a prediction is made.
- Observe reads the real `document.activeElement` after opening the broken
  fixture (focus left on the opener); the readout is not faked.
- Repaired Tab wrap: from the last focusable, Tab moves to the first; from the
  first, Shift+Tab moves to the last (both wrap boundaries).
- Escape and the close button close the fixture; focus returns to the opener.
- Reset closes the fixture and is safe to repeat; the shell stays usable.
- Answers appear only in the Feedback stage (not in Predict/Observe/Choose/
  Explain).
- Use real Tab/Shift+Tab/Escape/close/reset; do NOT use `focus()` helpers as key
  tests; no mode-based PASS.

## M0.1 — Static mockup revision (prior milestone)
- [x] Compact progression indicator + one current-stage panel; initial state =
  prediction beside an unopened preview-only fixture.
- [x] State-preview selector labelled "Mockup state preview, not lesson
  progression"; prediction view exposed no answer; answers in a separate Feedback
  preview.
- [x] Darkened meaningful helper/step text (`--ink-mid`); measured contrast
  pairs in `design.md`; the Name input named/justified; honest status records.

## M0 — Static mockup (prior milestone)
- [x] Scaffold Vite + React + TS files; `.kiro` records; one visual direction;
  static broken dialog fixture (non-native, contained, labelled); report checks.

## Blocked / future
- [ ] Add a browser test runner + DOM library (separately approved) to execute the
  M1 acceptance tests above with existing tooling.
- [ ] No further lesson content (second case, transfer, recorder, scanner,
  editor, runtime AI, accounts/backend, export) — out of scope.
