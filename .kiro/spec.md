# FocusHaunt — One-Lesson Spec (implemented in M1)

This is the single-lesson reasoning-and-repair specification. It is preserved
here verbatim-in-intent. M1 implements it: a required phase flow, real focus
observation, a broken/repaired non-native fixture, two bundled repairs, unscored
reflection before feedback, the feedback, and the repaired experience. See
`design.md` and `tasks.md` for architecture, verification, and acceptance criteria.

## What FocusHaunt is (and is not)
- A small, single guided lesson about keyboard focus. NOT a general recorder
  or scanner.
- One original dialog intentionally opens while leaving real focus behind.

## Learner flow (order is required)
1. **Predict** — choose the correct focus target BEFORE observing the defect.
2. **Observe** — open and use the broken fixture; read the REAL observed focus.
3. **Choose a repair** — pick between two bundled repairs.
4. **Explain** — write an UNSCORED reflection BEFORE any feedback.
5. **Try the fix** — experience the REAL repaired behavior AFTER feedback.

## Focus observation
- Observed focus is the real `document.activeElement`, measured from the DOM
  via real keyboard events.
- Authored expected focus is separate from observed focus.
- NEVER fake observation with a highlight or a mode label.

## Bundled repairs (two options)
- Correct repair:
  - justified initial focus target on open,
  - repaired Tab/Shift+Tab containment (both wrap boundaries),
  - Escape/close,
  - restoration of focus to the opener on close.
- Distractor (plausible but wrong):
  - fails the opening-focus requirement,
  - must NOT teach that ARIA attributes alone move focus.
- Feedback must explain the difference between the two.

## Reflection
- Self-explanation only — NOT graded, NOT semantically assessed by AI.
- Do not claim arbitrary text was "assessed".
- Reflection happens BEFORE feedback.

## Repair application honesty
- The bundled repair is applied to the fixture. It is NOT described as
  automatic editing of external/project code.

## Broken fixture rules
- Contained and clearly labelled.
- Reliable Escape/close path, keyboard-reachable reset, usable teaching shell
  in all states.
- Do NOT use the native `<dialog>` API that silently fixes initial focus while
  claiming to show the opposite. Use a non-native container with manual focus
  management so the defect is real.
- Reset clears stale inertness and listeners; repeated open/close/reset must
  remain safe.

## Future acceptance tests (specified now, NOT executed in the mockup)
- Use REAL browser Tab/Shift+Tab/Escape/close/reset; assert real focus/DOM
  behavior.
- Do NOT use direct `focus()` helpers masquerading as key tests. Do NOT use
  mode-based PASS.
- Assert: prediction/feedback ordering, both repaired Tab/Shift+Tab wrap
  boundaries, opener restoration, and that shell access remains usable.

## Out of scope (excluded)
Second case, transfer task, recorder timeline, editor, scanner, extension,
arbitrary URLs/uploads, runtime AI, accounts/backend, external-site access, user
tracking, export generation, automatic grading. No claim of validated learning
transfer, uniqueness, compliance, production readiness, or prize likelihood.

---

## M0.1 mockup addendum (does not alter the spec above)
- The M0.1 mockup is static only; it does not implement this spec's real
  behavior.
- The prediction view exposes no expected target, correctness, explanation, or
  answer (visible or accessible text). Answers appear only in a separate,
  explicit Feedback preview.
- The Predict preview shows neutral unopened-preview wording; the broken
  outcome and failure details appear only in Observe and later previews.
- The two repairs are presented with neutral names ("Repair A"/"Repair B") and
  a proposed-change description beneath, not labeled correct/distractor in
  Choose. Feedback names the correct repair and repeats its proposed change;
  the distractor is the ARIA-only change, which fails the opening-focus
  requirement (ARIA does not move focus by itself).
- The intended initial target is the Name input because it lets the user edit
  immediately — a design choice for this short edit-name dialog, not a DOM
  Tab-order rule. The close button is reachable first in tab order. The input is
  not claimed to be the "first focusable control", and no universal rule is
  stated.
- Layout is a compact progression indicator + playground + one current-stage
  panel. A static selector labelled exactly "Mockup state preview, not lesson
  progression" inspects static states without controlling dialog behavior.
- Reflection stays unscored.
