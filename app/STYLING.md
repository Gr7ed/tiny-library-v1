# Styling and Design System

This document is the visual source of truth for the Tiny Library. Follow these
rules for pages, components, and styling changes. Use Tailwind CSS utilities and
the tokens in `app/globals.css`; do not introduce a second design system.

## 1. Visual Direction

Tiny Library should feel warm, calm, literary, and easy to browse. Favor clear
hierarchy, generous whitespace, and useful color accents over decoration. The
design should feel editorial without becoming difficult to scan.

- Use the existing warm background, green brand, orange accent, surface, border,
  and muted text tokens.
- Keep surfaces visually distinct with spacing, border, or elevation. Do not
  nest cards inside cards or turn every section into a floating panel.
- Use the configured Lato font for interface and body text. Use Nunito Sans only
  where the existing font configuration assigns it; do not add fonts casually.
- Use a maximum of two typefaces and keep letter spacing at its default value.

## 2. Tokens and Tailwind

Use semantic theme utilities so light and dark mode remain consistent:

| Purpose | Tailwind token |
| --- | --- |
| Page background | `bg-background` |
| Primary text | `text-foreground` |
| Raised surface | `bg-surface` |
| Subtle surface | `bg-surface-muted` |
| Borders | `border-border` |
| Secondary text | `text-muted` |
| Primary action | `bg-accent` / `text-accent` |
| Strong accent state | `bg-accent-dark` / `text-accent-dark` |
| Library brand | `text-brand-green` / `bg-brand-green` |

Do not hard-code replacement colors in components. If a new semantic color is
needed, add its light and dark values to `app/globals.css` and expose it through
the existing `@theme inline` block first.

## 3. Layout and Responsive Behavior

Build mobile-first. Every view must work from 320px wide through large desktop
screens without horizontal scrolling or overlapping content.

- Use the shared container pattern: `mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8`.
- Use `py-8 md:py-16` for major page sections and `gap-2` or `gap-3` for related
  controls. Use `gap-6` or more to separate distinct content groups.
- Prefer responsive grids such as `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
  and let cards stretch to equal grid heights when appropriate.
- Keep controls usable on narrow screens. Toolbars may wrap with `flex-wrap`,
  while long navigation or filter rows should scroll horizontally rather than
  force a cramped layout.
- Use `min-w-0` on flexible children, `break-words` for user content, and stable
  dimensions or aspect ratios for covers, thumbnails, buttons, and icons.
- Do not use viewport-scaled font sizes. Use responsive steps such as
  `text-2xl md:text-4xl`, with headings kept to a readable line length.
- Keep the main content readable with `max-w-prose` or an appropriate max-width;
  do not stretch paragraphs across the full desktop viewport.
- Check both portrait mobile and wide desktop layouts after changing shared
  components. A desktop arrangement must not be assumed to collapse correctly.

## 4. Spacing, Alignment, and Shape

- Give primary content room to breathe with `p-6 md:p-8`; use smaller padding for
  compact controls and metadata.
- Explicitly align every flex and grid container with `items-*`, `justify-*`, or
  an intentional text alignment class.
- Keep body copy left-aligned, or right-aligned for RTL content. Center text only
  for isolated hero content, empty states, or callouts where it improves focus.
- Use restrained corner radii. Cards and framed tools should be `rounded-md` or
  smaller unless an existing component establishes another pattern.
- Avoid decorative blobs, excessive shadows, large gradients, and arbitrary
  one-off spacing values.

## 5. Typography

- Use a clear hierarchy: one page title, section headings, then supporting copy.
- Page titles should generally use `text-3xl md:text-5xl`; section headings should
  generally use `text-xl md:text-2xl`. Adjust for context rather than escalating
  every heading.
- Body text should be comfortable to read, usually `text-base` with a relaxed
  line height. Metadata can use `text-sm`, but must remain readable and high
  contrast.
- Keep labels and buttons concise. Do not rely on uppercase text or letter
  spacing alone to create hierarchy.
- Preserve meaningful heading order. Do not choose a heading level for visual
  size alone.

## 6. Components and Interaction

- Reuse shared components and existing `components/ui` primitives before adding
  local variants. Keep repeated patterns visually identical across routes.
- Use `next/link` for navigation and `next/image` for book covers and other
  images. Give every meaningful image descriptive `alt` text; use empty alt text
  only for purely decorative images.
- Buttons need an explicit purpose and a visible state for hover, focus, active,
  disabled, and loading where applicable. Use icons from the installed icon
  library for icon-only actions and provide an accessible label or tooltip.
- Use familiar controls for their job: links for navigation, buttons for actions,
  inputs for entry, tabs for views, and menus for option sets.
- Preserve stable control dimensions so labels, icons, and loading states do not
  shift surrounding content.
- Keep keyboard focus visible on every interactive element:
  `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`
  and the equivalent high-contrast treatment in dark mode.
- Respect `prefers-reduced-motion`. Use short, purposeful transitions for state
  changes and avoid animation that is required to understand or complete a task.

## 7. Accessibility and Content

- Meet WCAG 2.1 AA contrast: at least 4.5:1 for normal text and 3:1 for large
  text and meaningful graphical boundaries.
- Never communicate state through color alone. Pair color with text, an icon,
  shape, or an accessible status message.
- Keep touch targets around 44px or larger and ensure controls have descriptive
  names. Form fields need visible labels, useful input types, and clear errors.
- Support keyboard navigation, logical focus order, screen-reader text where
  needed, and RTL content without clipping or reversed meaning.
- Write interface text that is direct and useful. Do not add visible copy whose
  only purpose is to explain the UI or its implementation.

## 8. Responsive Review Checklist

Before considering UI work complete, verify:

- At 320px, content fits without horizontal page scrolling.
- At mobile widths, headings wrap cleanly and controls remain tappable.
- At tablet widths, grids and navigation use the available space without awkward
  single-item rows or excessive empty columns.
- At desktop widths, content is constrained and does not become too wide.
- Dark mode preserves contrast for text, borders, surfaces, focus rings, and
  disabled states.
- Hover, focus-visible, active, disabled, empty, loading, and error states are
  intentional wherever the component supports them.
- Images have stable aspect ratios, load without layout shift, and remain useful
  at every breakpoint.
