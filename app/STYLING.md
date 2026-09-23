# Styling & Design System Instructions (Tailwind CSS v4)

Follow these non-negotiable rules for all UI components, layouts, and styling code.

## 1. Core Principles of Design

### Whitespace & Spacing Rhythm

- **Padding & Margins:** Use consistent spacing scales. Group related elements using tight gaps (`gap-2`, `gap-3`), separate distinct sections with generous padding (`py-8 md:py-16`, `px-4 sm:px-6 lg:px-8`).
- **Whitespace Priority:** Whitespace is an active layout element. Avoid cramped UI; allow high-importance cards and containers to breathing room (`p-6 md:p-8`).

### Alignment & Flow

- **Grid & Flex Alignment:** Enforce explicit alignment for every flex/grid container (`items-center`, `items-start`, `justify-between`).
- **Text Alignment:** Default all body text to `text-left` (or `text-right` for RTL). Avoid justified text (`text-justify`). Center heading text only inside isolated hero sections or callout cards.

### Contrast & WCAG Compliance

- **Accessibility:** All text-to-background combinations MUST strictly meet WCAG 2.1 AA guidelines (minimum 4.5:1 ratio for normal text, 3:1 for large text/headings).
- **Interactive States:** High-contrast focus rings are required on all interactive elements (`focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black dark:focus-visible:outline-white`).

### Scale & Adaptive Layouts

- **Fluid Sizing:** Use dynamic relative units (`rem`, `em`, percentages) for components to scale fluidly with browser settings.
- **Responsive Widths:** Apply max-width containers with automatic horizontal margins for centered content (`max-w-7xl mx-auto`).

## 2. Typography & Visual Hierarchy

### Font Configuration (Max 2 Typefaces)

- **Primary (Sans-Serif):** Body text, interface controls, and subheadings.
- **Secondary (Display/Serif - Optional):** Main section titles or hero headers only.
- Configure primary fonts inside CSS using Tailwind v4 `@theme` directive:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-lato);
  --font-mono: var(--font-nunito-sans);
}
```
