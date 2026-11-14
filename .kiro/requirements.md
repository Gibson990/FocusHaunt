# FocusHaunt — Requirements

## Product
FocusHaunt is a small, single-lesson reasoning-and-repair learning experiment
about keyboard focus. Not a general recorder, scanner, editor, or timeline.

## Core lesson requirements (full app — not implemented in the mockup)
- Learner predicts the correct focus target BEFORE observing the defect.
- Learner opens and uses the intentionally broken dialog fixture (focus left
  behind on open).
- Observed focus = real `document.activeElement`, separate from authored
  expected focus; never faked via highlight or mode label.
- Learner chooses between two bundled repairs:
  - Correct: justified initial focus target + Tab/Shift+Tab containment (both
    boundaries) + Escape/close + opener restoration.
  - Distractor: plausible, fails the opening-focus requirement, must NOT teach
    that ARIA alone moves focus.
- Learner writes an UNSCORED explanation BEFORE feedback.
- Learner then experiences the real repaired behavior via the bundled repair,
  applied to the fixture (not automatic editing of external code).
- Broken fixture contained and labelled; reliable Escape/close; keyboard-
  reachable reset; usable shell in all states.
- No native `<dialog>` API that silently fixes initial focus while claiming the
  opposite. Reset clears stale inertness/listeners; repeated open/close/reset
  stays safe. Normal page keyboard access preserved.

## Non-functional
- Warm quiet background, dark ink, restrained ghost-green accent; strong
  typography/spacing; no gradient/analytics/excessive cards/distracting
  animation.
- Local/system font stack; no external fonts; no invented installed fonts.
- Visible focus styles, readable contrast (meaningful text >= 4.5:1; measured
  pairs in `design.md`), narrow-screen layout, reduced-motion support.

## M0.1 mockup (this milestone)
- Static visual mockup only; no lesson behavior (no real opening/focus/
  containment/Escape/restore/reset/repair).
- Compact progression indicator + playground + ONE current-stage panel; initial
  state is prediction beside/above an unopened preview-only fixture. The Predict
  preview uses neutral unopened-preview wording; the broken outcome and failure
  details appear only in Observe and later previews.
- A static selector labelled exactly "Mockup state preview, not lesson
  progression" inspects static states without controlling dialog behavior.
- Prediction view exposes NO expected target, correctness, explanation, or
  answer (visible or accessible). Repairs are shown with neutral names
  ("Repair A"/"Repair B") and a proposed-change description beneath; correctness
  is shown only in the separate Feedback preview, which names the correct repair.
- Intended initial target is the Name input (lets the user edit immediately) — a
  design choice, not a DOM Tab-order rule; the close button precedes it. The
  input is not called "first focusable control"; no universal rule is stated.
- Reflection stays unscored. Static previews are not activeElement observations
  or working repaired dialogs.

## Future tests (specified, NOT executed in the mockup)
Real-browser Tab/Shift+Tab/Escape/close/reset asserting real focus/DOM (no
`focus()` helpers, no mode-based PASS); cover prediction/feedback ordering, both
wrap boundaries, opener restoration, shell access.

## Out of scope (excluded)
Second case, transfer task, recorder timeline, editor, scanner, extension,
arbitrary URLs/uploads, runtime AI, accounts/backend, external-site access,
user tracking, export generation, automatic grading. No claim of validated
learning transfer, uniqueness, compliance, production readiness, or prize
likelihood.
