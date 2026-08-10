# AGENTS.md

This project is a personal portfolio site. These rules are for Codex and other agents working in this repo.

## Scope

- Keep changes focused on the user's request.
- Do not refactor unrelated files.
- Do not revert user changes unless explicitly asked.
- Before editing, inspect the relevant files and current git status.
- If a change touches performance, UI behavior, assets, or animations, record it in `BUG_FIX_LOG.md`.

## Tech Stack

- React 19 + Vite + TypeScript.
- Tailwind CSS v4 and Shadcn UI style `radix-nova`.
- Local state: `useState`, `useReducer`, refs.
- Global state: Zustand only when truly shared.
- Animation: GSAP and `@gsap/react`.

## Code Rules

- Prefer existing project patterns over new abstractions.
- Keep components small, readable, and typed.
- Use refs for high-frequency interaction state such as pointer, drag, scroll, and canvas movement.
- Avoid state updates in hot paths unless UI rendering actually depends on them.
- Clean up all effects: event listeners, timers, GSAP timelines, ScrollTriggers, observers, and animation frames.
- Avoid unused dependencies, unused imports, and dead files.
- Do not add large packages for small utilities.
- Keep comments minimal and only for non-obvious logic.

## Animation Rules

- Use `useGSAP` for GSAP work in React components.
- Use ScrollTrigger for scroll-triggered feature animations.
- Do not mix GSAP and Motion/Framer Motion in the same active component tree unless the Motion component is an accepted third-party UI primitive and no GSAP touches the same element.
- For pointer, drag, canvas, and scroll hot paths, avoid creating new tweens on every raw event; use `quickTo`, refs, batching, or requestAnimationFrame.

## Performance Rules

- Avoid putting off-route pages and heavy libraries in the initial route graph.
- Use dynamic import/lazy loading for heavy routes and below-fold features.
- Do not import original large photos for thumbnails or canvas previews.
- Use compressed image variants for UI display; load full-size media only when needed.
- Keep canvas resize/backing-store updates separate from drag or wheel redraw paths.
- Avoid always-mounted animated backgrounds with many DOM/Motion nodes.
- Fonts should be limited to used families, weights, and character ranges.

## Logging

- Record bug fixes, performance fixes, and optimization decisions in `BUG_FIX_LOG.md`.
- Keep entries short: date, type, file/module, issue, fix, verification if any, status.
- If verification is skipped, write `not verified` instead of inventing a result.

## Git

- Check `git status --short` before and after edits.
- Stage only files related to the task.
- Do not include unrelated user changes in commits.
- Commit messages should be concise and specific, for example:
  - `fix: optimize gallery canvas redraw`
  - `perf: lazy load photo route`
  - `docs: update agent workflow`

<!-- openwolf:begin -->
# OpenWolf

@.wolf/OPENWOLF.md

This project uses OpenWolf for context management. Read and follow .wolf/OPENWOLF.md every session. Check .wolf/cerebrum.md before generating code. Check .wolf/anatomy.md before reading files.
<!-- openwolf:end -->
