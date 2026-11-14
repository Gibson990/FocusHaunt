# FocusHaunt — Requirements

## Product
FocusHaunt is a small, single-lesson reasoning-and-repair learning experiment
about keyboard focus. It is **not** a general recorder, scanner, editor, or
timeline. One original dialog intentionally opens while leaving real focus
behind; the learner reasons about the defect and picks a bundled repair.

## Core lesson requirements (full app — NOT all implemented in M0)
- Learner predicts the correct focus target **before** observing the defect.
- Learner opens and uses the intentionally broken dialog fixture (focus left
  behind on open).
- Observed focus = real `document.activeElement`, kept **separate** from the
  authored expected focus; never faked via a highlight or a mode label.
- Learner chooses between two bundled repairs:
  - Correct: justified initial focus target + repaired Tab/Shift+Tab containment
    (both boundaries) + Escape/close + restoration of focus to the opener.
  - Distractor: plausible but fails the opening-focus requirement, and must NOT
    teach that ARIA attributes alone move focus.
- Learner writes an **unscored** explanation **before** feedback (self-explanation,
  not AI semantic grading; arbitrary text is never "assessed").
- Learner then experiences the real repaired behavior via the bundled repair,
  applied honestly to the fixture (not described as automatic editing of
  external/project code).
- Broken fixture is contained and clearly labelled; reliable Escape/close path;
  keyboard-reachable reset; usable teaching shell in all states.
- No native `<dialog>` API that silently fixes initial focus while claiming to
  demonstrate the opposite. Use a non-native container with manual focus
  management so the defect is real.
- Reset clears stale inertness/listeners; repeated open/close/reset stays safe.
- Normal page keyboard access preserved across all states.

## Non-functional
- Warm quiet background, dark ink, restrained ghost-green accent; strong
  typography and spacing matter more than decoration.
- No gradient dashboard, analytics chrome, excessive cards, or distracting
  animation.
- Intentional local/system font stack; no external font request; no invented
  installed font.
- Visible focus styles, readable contrast, narrow-screen layout, and
  `prefers-reduced-motion` support.

## This milestone (M0)
Static visual mockup only. No learning loop. See `design.md` for the
mocked-vs-functional record.

## Future tests (specified now, NOT executed in M0)
Real-browser Tab/Shift+Tab/Escape/close/reset asserting real focus/DOM behavior
(no `focus()` helpers masquerading as key tests, no mode-based PASS). Cover
prediction/feedback ordering, both repaired wrap boundaries, opener
restoration, and shell access.

## Out of scope (excluded)
Second case, transfer task, recorder timeline, editor, scanner, extension,
arbitrary URLs/uploads, runtime AI, accounts/backend, external-site access,
user tracking, export generation, automatic grading. No claim of validated
learning transfer, uniqueness, compliance, production readiness, or prize
likelihood.
