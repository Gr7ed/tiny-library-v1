---
name: refactor-next-app
description: "Refactor Next.js App Router pages and UI into reusable, modular components with shared layouts. Use for page composition, component extraction, route organization, React 19 patterns, accessibility, and validation in this project."
argument-hint: "Describe the pages, UI, or duplicated behavior to refactor."
user-invocable: true
---

# Refactor Next.js App

Refactor the requested pages and UI while preserving behavior, route contracts, visual conventions, and data boundaries. Prefer small, verifiable changes over a broad rewrite.

## Use When

- Several pages duplicate markup, layout, loading, empty, or error states.
- A route is difficult to scan because it mixes data access, composition, and presentation.
- Shared navigation, page chrome, filters, cards, or controls should become reusable components.
- A page needs to follow Next.js App Router or React documentation more closely.
- A refactor needs an explicit accessibility, responsive, or regression check.

## Working Rules

- Read the nearest route, layout, component, data helper, and neighboring test before editing.
- State one local hypothesis about the duplication or ownership problem and one cheap check that could disconfirm it.
- Preserve the public behavior first: URL paths, params, search params, links, metadata, loading/error behavior, and visible content.
- Keep route-specific composition in `app/`; put genuinely shared UI in `components/`; keep domain access in `lib/` and domain types in `types/`.
- Prefer Server Components. Add `"use client"` only for state, effects, event handlers, or browser APIs, and keep the client boundary as small as possible.
- Pass serializable props across Server/Client Component boundaries. Do not move database or filesystem access into client components.
- Reuse existing helpers such as `lib/books.ts` instead of parsing or validating data in pages.
- Extract a component when it has a clear responsibility, repeated structure, or a stable domain API. Do not extract one-off wrappers or create a generic component whose props merely rename local details.
- Keep components composable: use explicit props, sensible defaults, and slots/children where that improves reuse. Avoid hidden route coupling and duplicated business rules.
- Use `next/link` for internal navigation and `next/image` for images. Preserve meaningful alt text, stable dimensions, and keyboard/focus behavior.
- Follow `app/STYLING.md`, existing Tailwind tokens, responsive container conventions, and the established focus-ring pattern. Avoid unrelated visual redesign.
- Follow current Next.js App Router and React reference guidance for async route params, layouts, metadata, rendering, and state/effect usage. Verify framework-specific behavior against the official docs when uncertain.

## Procedure

1. **Map the local ownership.** Read the target route and its nearest layout, then inspect only the shared components, helpers, types, and tests they use. Identify what decides behavior versus what only forwards props.
2. **Write the refactor boundary.** List the duplicated or overloaded responsibility, the proposed owner, the props/data contract, and behavior that must remain unchanged. Keep the first edit to one coherent slice.
3. **Extract from the inside out.** Start with stable presentational pieces, then shared page sections, then route composition. Keep data fetching and route-specific decisions at the highest sensible Server Component level.
4. **Unify shared layout carefully.** Put site-wide chrome in the existing shared layout/components. Put section-wide books navigation or shells in the books layout. Do not duplicate headers, footers, or locale attributes in pages.
5. **Make states explicit.** Account for loading, empty, error, not-found, disabled, focus, narrow viewport, and long-content states where the refactored surface can encounter them. Preserve existing semantics and accessible names.
6. **Update tests with the contract.** Extend nearby unit tests for changed helpers or pure logic. For UI changes, verify rendered behavior through the project’s available checks or add focused coverage only when the behavior is not otherwise testable.
7. **Validate immediately.** After each substantive slice, run the narrowest relevant check. Finish with `npm run lint`, `npm run test`, and `npm run build` from the repository root unless a command is unavailable; report failures that predate the change separately.
8. **Review the diff.** Confirm no unrelated formatting or dependency churn, no accidental clientification, no duplicated data access, no broken links/params, and no component whose API is less clear than the code it replaced.

## Decision Points

- **Shared or local?** Share only when the structure and behavior are stable across two or more consumers or the abstraction is an established layout boundary. Otherwise keep it local.
- **Server or client?** Default to Server Component. Use a client component for interactive behavior and pass it only the data and callbacks it needs; do not make a parent client component merely to render a child control.
- **Layout or component?** Use a layout for persistent route-segment chrome and shared loading/error boundaries. Use a component for reusable content that participates in a page.
- **Prop or context?** Prefer explicit props for local data flow. Use context only for genuinely cross-cutting state with multiple descendants and an existing project pattern.
- **Refactor or redesign?** Refactor structure without changing styling or copy unless the request explicitly includes a design change. Record any necessary visual change as a separate decision.
- **Docs uncertainty?** Check the official [Next.js App Router documentation](https://nextjs.org/docs/app) and [React Reference](https://react.dev/reference/react) before relying on memory for framework behavior.

## Completion Checklist

- Routes, locale behavior, params, search params, links, metadata, and not-found behavior remain correct.
- Shared components have focused names, minimal props, stable dimensions, semantic HTML, and visible keyboard focus.
- Server/client boundaries are intentional and no server-only data leaks into the browser.
- Data parsing and validation remain in the existing domain helpers.
- Responsive layout, contrast, alt text, and interactive states follow `app/STYLING.md`.
- Tests cover changed logic and all available project checks pass, or failures are documented with their cause.
- The final diff is narrow, understandable, and free of unrelated changes.

## Project Commands

Run from the repository root:

```bash
npm run lint
npm run test
npm run build
```