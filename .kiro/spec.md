# FocusHaunt — One-Lesson Spec (preserved for the next milestone)

This is the single-lesson reasoning-and-repair specification. It is **not**
implemented in the M0 static mockup. It is preserved here verbatim-in-intent so
the next milestone can build against it without re-deriving it.

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
- Reliable Escape/close path, keyboard-reachable reset, usable teaching shell in
  all states.
- Do NOT use the native `<dialog>` API that silently fixes initial focus while
  claiming to show the opposite. Use a non-native container with manual focus
  management so the defect is real.
- Reset clears stale inertness and listeners; repeated open/close/reset must
  remain safe.

## Future acceptance tests (specified now, NOT executed in M0)
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
