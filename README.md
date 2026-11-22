# FocusHaunt

A one-lesson interactive experiment about a real keyboard-focus bug.

**Live demo:** _TODO: add the hosted URL here once the project is deployed._

## The lesson

A modal dialog opens, but keyboard focus stays behind on the page. FocusHaunt walks you through:

1. **Predict** where focus should go when the dialog opens.
2. **Observe** a real, broken dialog and read the browser's actual `document.activeElement`.
3. **Choose** one of two bundled repairs.
4. **Explain** your choice in a sentence (unscored).
5. **Feedback** shows the answer, only at this stage.
6. **Try** the repaired dialog: focus moves in on open, Tab and Shift+Tab stay inside, Escape closes, and focus returns to the opener.

## Run it

```sh
npm ci
npm run dev        # local dev server
npm run build      # typecheck + production build into dist/
node --test src/lessonState.test.mjs   # lesson state tests
```

`npm run typecheck` runs the type check alone.

## Structure

- `src/lesson.ts`, `src/lessonState.ts`, `src/hooks/`: lesson content, the phase state machine, and the hook that drives it.
- `src/components/`: stage panels, the dialog fixture (broken and repaired), progress indicator, banner and footer.
- `src/lessonState.test.mjs`: tests for phase order, gating, and focus destinations.

## Specs

Requirements, design, and tasks are in [`.kiro/`](.kiro/).

## Scope

- One lesson only: no second case, accounts, backend, or runtime AI.
- Reflection is unscored. Nothing is graded.
- The observed focus is the browser's real `document.activeElement`, not a simulation.
- No claim is made that this lesson improves learning. It is an experiment, not a validated course.

## License

MIT - see [LICENSE](LICENSE).
