# FocusHaunt — Requirements

## Product
FocusHaunt is a small, single-lesson reasoning-and-repair learning experiment
about keyboard focus. Not a general recorder, scanner, editor, or timeline.

## Core lesson requirements (M1 accepted 2026-11-17 after independent review; focus repair verified 2026-11-18)
- Learner predicts the correct focus target BEFORE observing the defect (the
  opener is disabled outside Observe/Try; Continue is gated).
- Learner opens and uses the intentionally broken dialog fixture (focus left
  behind on open).
- Observed focus = real `document.activeElement`, separate from the authored
  expected focus; never faked via highlight or mode label.
- Learner chooses between two bundled repairs:
  - Correct (Repair A): justified initial focus target + Tab/Shift+Tab
    containment (both boundaries) + Escape/close + opener restoration.
  - Distractor (Repair B): plausible, fails the opening-focus requirement, must
    NOT teach that ARIA alone moves focus.
- Learner writes an UNSCORED explanation BEFORE feedback.
- Learner then experiences the real repaired behavior via the bundled repair
  (Repair A), applied to the fixture (not automatic editing of external code).
- Broken fixture is contained and labelled; reliable Escape/close; keyboard-
  reachable reset; usable shell in all states.
- No native `<dialog>` API; a non-native container with manual focus management.
  Reset clears stale state; repeated open/close/reset stays safe. Normal page
  keyboard access is preserved (the dialog is closable; the broken fixture does
  not trap focus).

## Non-functional
- Warm quiet background, dark ink, restrained ghost-green accent; strong
  typography/spacing; no gradient/analytics/excessive cards/distracting
  animation.
- Local/system font stack; no external fonts; no invented installed fonts.
- Visible focus styles, readable contrast (meaningful text >= 4.5:1; measured
  pairs in `design.md`), narrow-screen layout, reduced-motion support.

## M1 milestone (this milestone)
Six bounded flow repairs are implemented on the WIP branch, and M1 was accepted
2026-11-17 after independent review. `tsc --noEmit` and `vite build` exited 0;
four dependency-free state tests passed; production-build browser review covered
the repaired flow and verified native Tab/Shift+Tab wrap at both boundaries.

## Remaining acceptance verification
Real-browser Tab/Shift+Tab asserting real focus/DOM (no `focus()` helpers and no
mode-based PASS) is met for both repaired wrap boundaries. Screen-reader audit,
exhaustive repeated-cycle stress, and browsers other than Chrome remain deferred.
See `tasks.md`.

## Out of scope (excluded)
Second case, transfer task, recorder timeline, editor, scanner, extension,
arbitrary URLs/uploads, runtime AI, accounts/backend, external-site access,
user tracking, export generation, automatic grading. No claim of validated
learning transfer, uniqueness, compliance, production readiness, or prize
likelihood.
