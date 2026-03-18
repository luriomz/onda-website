# src/CONTEXT.md

Top-level source directory overview. Read this for a fast map of the codebase before diving into any subdirectory.

---

## Directory Map

```
src/
├── components/
│   ├── layout/         ← Navbar + Footer (always rendered) → layout/CONTEXT.md
│   └── sections/       ← All page sections (HeroSection, etc.) → sections/CONTEXT.md
├── hooks/
│   └── useScrollAnimation.ts  ← Framer Motion helpers → hooks/CONTEXT.md
├── lib/
│   └── utils.ts        ← cn() — the only utility function
├── App.tsx             ← Root component — assembles the page
├── index.css           ← Design tokens + Tailwind layers
├── main.tsx            ← React DOM mount
└── vite-env.d.ts       ← Vite env type declarations
```

---

## App.tsx

The root component. Renders the page shell — no router, no providers (this is a static marketing site).

```tsx
<div className="min-h-screen bg-[hsl(var(--bg-base))]">
  <Navbar />
  <main>
    <HeroSection />
    <PopularEventsSection />
    <ArtistsMarquee />
    <AppCTASection />
    <FeatureCardsSection />
    <OrganizerSection />
  </main>
  <Footer />
</div>
```

If you add a new section, import it and add it here in the correct position. See `sections/CONTEXT.md` for the intended section order.

---

## index.css

Three responsibilities:

1. **Tailwind directives** — `@tailwind base/components/utilities`
2. **CSS custom properties** — all design tokens defined as HSL channel values (not full `hsl()` calls — this lets Tailwind's opacity modifier work):
   ```css
   --accent: 338 80% 55%;   ← stored as channels, not hsl(338 80% 55%)
   ```
   Consumed with: `hsl(var(--accent))` in inline styles, or `bg-accent` via Tailwind config.
3. **Utility layer** — `.font-display`, `.text-gradient`, `.shadow-glow`, `.glass`, `.scrollbar-hide`, `.tracking-editorial`

**Do not** add component styles here. All component styling goes in the component file via Tailwind classes.

---

## lib/utils.ts

Contains only the `cn()` helper:
```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Use `cn()` for all conditional class merging:
```tsx
className={cn("base-classes", condition && "conditional-class", props.className)}
```

---

## main.tsx

Standard React 18 root mount:
```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

No `StrictMode`, no providers at this level — add providers here if needed (e.g. `QueryClientProvider` when API hooks are added).

---

## Path Alias

`@/` resolves to `src/`. Configured in `vite.config.ts` and `tsconfig.json`.

```ts
import { cn } from "@/lib/utils";
import { viewportOnce } from "@/hooks/useScrollAnimation";
import Navbar from "@/components/layout/Navbar";
```

Always use `@/` for imports across directories. Only use relative imports within the same directory.

---

## What Lives Where (Quick Reference)

| I need to... | Go to |
|---|---|
| Understand the full page structure | `App.tsx` |
| Change design tokens (colors, spacing, shadows) | `index.css` → `tailwind.config.ts` |
| Work on a specific page section | `components/sections/<SectionName>.tsx` + `sections/CONTEXT.md` |
| Work on Navbar or Footer | `components/layout/<Component>.tsx` + `layout/CONTEXT.md` |
| Add or modify a scroll animation | `hooks/useScrollAnimation.ts` + `hooks/CONTEXT.md` |
| Add a data-fetching hook | `hooks/` (create a new file) |
| Add a shadcn/ui primitive | `components/ui/` (create this dir if it doesn't exist, run `npx shadcn@latest init`) |
| Find the design system rules | `CLAUDE.md` (design tokens table) |
| Find section-by-section build specs | `BUILDPLAN.md` |
| Understand how to use Magic MCP + ui-ux-pro-max together | `INSTRUCTION.md` |
