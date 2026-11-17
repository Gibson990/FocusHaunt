M1 ACCEPTED 2026-11-17 after independent review. Main remains the M0.1 checkpoint until an approved merge.

On 2026-11-17, independent production-build browser review verified typecheck,
build, and all four state tests; native Tab/Shift+Tab wrap at both repaired
boundaries; Escape, Close, and Cancel opener restoration; repaired aria-modal
with inert background; incomplete-step and whitespace gating; selection-specific
feedback and choice changes; explicit repair application; restart focus; no
horizontal overflow at 1440/390/320; and reduced-motion load. Still unverified:
screen-reader and full accessibility audits, exhaustive repeated-cycle stress,
and browsers other than Chrome.

## 2026-11-15 bounded Codex repair run

Codex (not Kiro) implemented six approved repairs on this WIP branch: accessible
incomplete-step guidance and whitespace gating; selected-repair feedback with a
Change my choice route; explicit correct-repair application; removal of inert
Save; useful restart focus; and repaired aria-modal/inert background management.
`npm run typecheck` and `npm run build` exited 0, four Node state tests passed,
and focused localhost browser smoke checks verified those flows. Native
Tab/Shift+Tab boundary traversal remains unverified because the available browser
control could not produce trustworthy native traversal. No acceptance, commit,
push, deployment, or submission occurred; independent review remains next.

The remainder of this file is the original 2026-11-14 checkpoint retained as
history. Its blocker list describes the pre-repair state; the current status
above governs.

# FocusHaunt M1 restart checkpoint

Accepted base: `e01757ddf19bbd9f4fc0c2a2b5682b3bbfdc6782` on `main`
Checkpoint date: 2026-11-14

This branch stores a partial Kiro-led M1 working tree so it can be reviewed and
resumed without treating it as an accepted lesson. The actual source and diff
were inspected during checkpointing. Older README and `.kiro` statements that
say M1 is implemented or complete are superseded by this checkpoint status
until the implementation and records are corrected.

## What exists in source

- One typed phase flow: Predict, Observe, Choose, Explain, Feedback, Try.
- The M0.1 designer state selector and URL/query/hash shortcut patterns are
  absent from the learner source inspected at checkpoint time.
- A real non-native dialog fixture, a real `document.activeElement` description,
  and separate broken/repaired focus-management branches exist.
- Broken open is intended to leave focus on the opener while Escape remains a
  document-level escape route.
- Repaired open attempts to focus the Name input, contain Tab/Shift+Tab at the
  first and last focusable controls, close on Escape, and restore the opener.
- Prediction, repair choice, reflection, observed focus, fixture-open state,
  and applied-repair state are held in the lesson hook.
- Progress is status markup rather than later-step navigation.

These are source-review observations, not browser acceptance proof.

## Confirmed blockers

1. Blank or whitespace-only reflection can advance to Feedback because the
   Explain phase currently advances unconditionally. No accessible inline
   reflection guidance exists.
2. Missing prediction and repair choice only disable Continue. The required
   clear inline guidance for an attempted incomplete step is absent.
3. Feedback does not receive or explain the learner's selected repair and lacks
   a clearly labelled retry/change route.
4. Generic Continue automatically sets `appliedRepair` to Repair A. There is no
   explicit labelled action to apply the correct bundled repair after feedback.
5. The retained Save button has no behavior.
6. Full restart clears React state but does not explicitly restore focus to a
   useful surviving starting control.
7. The repaired dialog's semantics and background/focus strategy are incomplete
   or insufficiently documented. This requires lifecycle review, not a blind
   `aria-modal` addition.
8. No maintainable executable test source or test script exists.
9. README and `.kiro` records overstate M1 completion and must be corrected only
   after the implementation is corrected and checks are honestly classified.

## Uncertain and open verification

- Real broken-open `activeElement` behavior and live readout accuracy.
- Real Tab and Shift+Tab traversal at both repaired wrap boundaries and beyond
  one cycle.
- Escape, close, Cancel, any retained Save behavior, and opener restoration.
- Background availability in broken mode and the repaired modal strategy.
- Reset from observation, feedback, and repaired completion, including repeated
  open/close/reset cycles and listener cleanup.
- Text editing without interruption from global key handlers.
- Initial answer isolation in the rendered accessibility tree.
- Desktop 1440x1000, phone 390x844, small 320x740, reduced-motion, visible-focus,
  overflow, clipping, feedback, and error-state rendering.
- Browser console/runtime errors and representative screenshots.

No browser/key/visual acceptance is claimed.

## Checks run in this checkpoint session

- `git diff --check` -> exit 0 (line-ending warnings only).
- `npm run typecheck` -> exit 0.
- `npm run build` -> exit 0; Vite 5.4.11 transformed 40 modules and produced
  ignored `dist/` output (`index.html` 0.60 kB, CSS 9.90 kB, JS 159.61 kB).
- Repository boundary, accepted base, remote `main`, private destination, and
  repo-local author/committer were verified before checkpointing.

## Earlier/report-only evidence

The ignored local partial report recorded source inspection, no discovered
selector/query/hash bypass pattern, no test file, and unavailable browser-control
runtime assets. Those observations are useful leads, but neither that report nor
a passing build is interaction acceptance. No browser tooling was repaired or
downloaded during checkpoint closeout.

## Ordered restart plan

1. Recover this WIP branch/tree and read this checkpoint before trusting older
   completion claims.
2. Check actual free Kiro availability through existing account status/UI only;
   do not spend a model smoke-test request and do not use a paid route.
3. Resume the existing Kiro-led FocusHaunt task in the verified project.
4. Fix incomplete-step gates and guidance, selected-choice feedback and retry,
   explicit bundled-repair application, reset focus, Save handling/removal, and
   the repaired modal/background lifecycle; then correct README/`.kiro` status.
5. Create maintainable executable tests using only approved existing tooling, or
   request narrow approval before adding any dependency.
6. Run real keyboard tests and inspect desktop, narrow, and reduced-motion
   rendering without substituting synthetic PASS claims.
7. Seek independent review and acceptance before merging or calling M1 complete.

## Scope and safeguards

Resume only this one dialog lesson. Do not add a second case, transfer task,
scanner, recorder, editor, extension, backend, accounts, uploads, runtime AI,
automatic grading, telemetry, export, deployment, or public repository. Use no
paid credits or upgrade route. Make no claims of learning gains, compliance,
novelty, production readiness, or prize likelihood.
