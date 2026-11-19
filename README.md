# FocusHaunt

A small, single-lesson reasoning-and-repair learning experiment about keyboard
focus.

> **Milestone M1 accepted 2026-11-17 after independent review.** Focus-loss repair verified 2026-11-18. The current WIP branch has a required phase
> flow (Predict → Observe → Choose → Explain → Feedback → Try), a real
> non-native dialog fixture that leaves focus behind on open, real Tab/Shift+Tab
> containment, Escape/close, opener restoration, and a real observed-focus
> readout (document.activeElement), accessible incomplete-step guidance,
> selection-specific feedback, explicit repair application, and restart focus.
> Answers appear only in the Feedback stage.
> See `.kiro/` for requirements, design, tasks, and the preserved one-lesson spec.

## Stack
Vite + React + TypeScript. Dependencies are present via the documented review
path (`npm ci --ignore-scripts --no-audit --no-fund`). No packages were
installed, committed, pushed, or deployed during this work.

## Scripts
```sh
npm run dev        # vite dev server
npm run build      # tsc --noEmit && vite build
npm run typecheck  # tsc --noEmit
npm run preview    # vite preview
```

## M1 verification (run this work)
- `npm run typecheck` → exit 0 (no type errors).
- `npm run build` → exit 0; `dist/` produced: `index.html` (~0.60 kB),
  `assets/index-*.js` (~162.0 kB), `assets/index-*.css` (~10.0 kB).
- `node --test src/lessonState.test.mjs` → 4 tests passed using Node's installed
  test runner; no package was added.
- Focused localhost browser smoke checks covered the six bounded repairs. Real-browser
  Tab/Shift+Tab wrap at both repaired boundaries was verified 2026-11-17.

## Real behavior (M1)
- Phase order is required and enforced; attempted incomplete steps show inline
  guidance and whitespace-only reflection cannot advance.
- Observe reads the real `document.activeElement`; no fake highlight or mode label.
- The broken fixture leaves focus behind on open; Tab is not contained.
- The repaired fixture (Repair A applied in Try) moves focus to the Name input on
  open, contains Tab/Shift+Tab at both boundaries, closes on Escape/close, and
  restores focus to the opener.
- Reflection is unscored and precedes selection-specific feedback. A labelled
  action applies the correct bundled repair; it is not described as editing code.

## Scope
One lesson only. Excluded: second case, transfer task, recorder timeline,
editor, scanner, extension, arbitrary URLs/uploads, runtime AI, accounts/backend,
external-site access, user tracking, export generation, automatic grading. No
claim of validated learning transfer, uniqueness, compliance, production
readiness, or prize likelihood. See `.kiro/requirements.md`.
