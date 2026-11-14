# FocusHaunt

A small, single-lesson reasoning-and-repair learning experiment about keyboard
focus.

> **Milestone M0.1 — static mockup.** Visual direction only. Lesson interactions
> are not implemented. The state-preview selector inspects static stages; it does
> not open, close, or manage real focus. See `.kiro/` for requirements, design,
> tasks, and the preserved one-lesson spec.

## Stack
Vite + React + TypeScript. Dependencies are installed by the coordinator via the
documented review path (`npm ci --ignore-scripts --no-audit --no-fund`). No
packages were installed, committed, pushed, or deployed during this handoff.

## Scripts
```sh
npm run dev        # vite dev server
npm run build      # tsc --noEmit && vite build
npm run typecheck  # tsc --noEmit
npm run preview    # vite preview
```

## M0.1 verification (actually run this session)
- `npm run typecheck` → exit 0 (no type errors).
- `npm run build` → exit 0; `dist/` produced: `index.html`,
  `assets/index-*.js` (~155.6 kB), `assets/index-*.css` (~9.4 kB).
- Browser interaction acceptance tests: NOT run (future). Do not infer passing
  behavior from static previews.

## Static limitations (known)
- No lesson behavior: no real opening, focus movement, Tab/Shift+Tab containment,
  Escape/close, opener restoration, reset, or repair application.
- Static previews are not `document.activeElement` observations and not working
  repaired dialogs.
- The state-preview selector swaps static stages only; it is labelled exactly
  "Mockup state preview, not lesson progression".
- Prediction view exposes no answer; answers appear only in the separate
  Feedback preview.

## Scope
One lesson only. Excluded: second case, transfer task, recorder timeline,
editor, scanner, extension, arbitrary URLs/uploads, runtime AI, accounts/backend,
external-site access, user tracking, export generation, automatic grading. No
claim of validated learning transfer, uniqueness, compliance, production
readiness, or prize likelihood. See `.kiro/requirements.md`.
