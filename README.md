# FocusHaunt

A small, single-lesson reasoning-and-repair learning experiment about keyboard
focus.

> **Milestone M0 — static mockup.** Visual direction only. Lesson interactions
> are not implemented. See `.kiro/` for requirements, design, tasks, and the
> preserved one-lesson spec.

## Stack
Vite + React + TypeScript. No dependencies are installed during this handoff;
the coordinator installs the approved dependencies after inspecting
`package.json`.

## Run (after the coordinator installs deps)
```sh
npm install      # performed by the coordinator
npm run dev      # local dev server
npm run build    # tsc --noEmit && vite build
npm run typecheck # tsc --noEmit
```

## Status
- Project files and manifest created.
- `tsc --noEmit` typecheck, `vite build`/`vite dev`, and any tests are **blocked**
  until dependencies are installed.
- Scope is intentionally one lesson only. See `.kiro/requirements.md` for the
  exclusions list.
