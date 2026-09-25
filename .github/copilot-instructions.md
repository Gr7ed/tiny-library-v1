# Copilot Instructions

## Project overview

- This is a Next.js 16 App Router application using React 19, TypeScript, and Tailwind CSS v4.
- The application shell is defined in `app/layout.tsx`: it loads the Lato and Nunito Sans Google fonts, applies global styles, and renders the shared `Header` and `Footer` around every route.
- Routes are filesystem-based under `app/`: `/`, `/books`, `/books/[id]`, `/about`, and `/about/contact`.
- Book data is stored in `app/data/books.json`. `app/lib/books.ts` validates the imported JSON at module load time and exposes `getBooks`, `getBookById`, and `getBooksByCategory`, returning copies of records. Keep the `Book` and `BookCategory` definitions in `app/types/index.ts` aligned with that data shape.
- The current `/books` and `/books/[id]` pages still use simple route-local rendering; when replacing that placeholder behavior, use the shared helpers in `app/lib/books.ts` rather than duplicating data parsing or validation.
- Static images and illustrations belong in `public/` and should be rendered with `next/image` where applicable.

## Commands

Run commands from the repository root with npm:

```bash
npm run dev       # Start the development server at http://localhost:3000
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Serve the production build
```

There is no test script, test framework, or test-file convention configured in `package.json`. There is therefore no repository-supported single-test command; add the relevant test tooling and script before documenting one.

## Implementation conventions

- Prefer Server Components. Add `"use client"` only for components that require client-side state, effects, event handlers, or browser APIs.
- Use `next/link` for internal navigation and `next/image` for images. Preserve meaningful image `alt` text and explicit image dimensions.
- Dynamic route props follow the current Next.js pattern in this repository: `params` is a `Promise`, so await it before reading route parameters.
- Use the `@/*` TypeScript path alias for root-relative imports when it improves clarity; keep imports consistent with the surrounding file.
- Keep book data access in `app/lib/books.ts`. Its runtime validation is intentional: invalid records should throw an explicit error rather than being silently accepted.
- Shared navigation and site-wide layout belong in `app/components/Header.tsx`, `app/components/Footer.tsx`, and `app/layout.tsx`; avoid duplicating those elements in individual pages.

## Styling rules

- Follow `app/STYLING.md` for all UI work. It is the repository's design-system source of truth.
- Tailwind CSS v4 is configured through `app/globals.css` with `@import "tailwindcss"` and an inline `@theme` block. Extend the existing CSS variables/font setup instead of introducing a second styling system.
- Use responsive max-width containers and the existing spacing rhythm (`px-4 sm:px-6 lg:px-8`, `py-8 md:py-16`, and tight gaps such as `gap-2`/`gap-3` for related controls).
- Explicitly align flex and grid containers, keep normal body text left-aligned, and preserve WCAG AA contrast.
- All interactive elements need visible high-contrast `focus-visible` outlines. Preserve the existing focus-ring pattern when adding links, buttons, or controls.
- Keep the visual system to the configured Lato primary font and Nunito Sans supporting font; do not add additional typefaces without updating the shared font configuration.
