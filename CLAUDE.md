# CLAUDE.md — Onda Website

## What This Repo Is

This is the **public marketing website** for Onda — Mozambique's event ticketing app. Think shotgun.live but for Mozambique, and better. It is a static React/Vite/Tailwind site, **not** the app itself.

Onda has two other products that this website markets. You won't have access to their codebases in normal development — the relevant outputs (app screenshots, dashboard screenshots) are already committed to `public/` as assets. This context is here so you understand what you're building for:

- **Onda attendee app** — mobile-first React/Tauri app. Ticket discovery, M-Pesa purchase, QR check-in. Brand source of truth: hot pink `hsl(338 80% 55%)`, near-black bg, Sora + DM Sans fonts.
- **Onda Command Center** — real-time organizer ops dashboard. Live crowd metrics, revenue, incident feeds. Used for the dashboard mockup screenshot in the Organizer Section.

---

## Repository Structure

```
onda-website/
├── public/
│   ├── content/          ← artist images (.webp)
│   ├── event-1..4.jpg    ← event card placeholder images
│   ├── hero-1..4.jpg     ← hero / feature card app screenshots
│   ├── onda-icon.svg     ← logo icon
│   └── onda-logo.png     ← full logo
├── src/
│   ├── components/
│   │   ├── layout/       ← Navbar, Footer → see layout/CONTEXT.md
│   │   └── sections/     ← all page sections → see sections/CONTEXT.md
│   ├── hooks/            ← animation helpers → see hooks/CONTEXT.md
│   ├── lib/
│   │   └── utils.ts      ← cn() helper (clsx + tailwind-merge)
│   ├── App.tsx           ← root: assembles all sections in order
│   ├── index.css         ← design tokens (CSS variables) + Tailwind layers
│   └── main.tsx          ← React root mount
├── index.html            ← Google Fonts loaded here (Sora + DM Sans)
├── tailwind.config.ts    ← Tailwind theme extension (tokens → utilities)
├── vite.config.ts        ← Vite config, port 8080, `@` alias → src/
├── BUILDPLAN.md          ← Section-by-section build specs + animation reference
├── INSTRUCTION.md        ← How to use ui-ux-pro-max skill + Magic MCP together
└── ui-ux-pro-max-skill/  ← Design intelligence skill (query before building)
```

---

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| React | 18 | UI framework |
| Vite | 7 | Build tool, dev server on port 8080 |
| TypeScript | 5.8 | Typed throughout |
| Tailwind CSS | 3.4 | Utility styling, extended with Onda tokens |
| Framer Motion | 12 | All animations |
| lucide-react | 0.577 | SVG icons only — no emoji icons |
| clsx + tailwind-merge | latest | Class merging via `cn()` |
| pnpm | 10 | Package manager — use `pnpm`, never `npm` |

**No router** — this is a single-page marketing site. No React Router.
**No shadcn/ui yet** — components are hand-built. If you add shadcn, run `npx shadcn@latest init` and place primitives in `src/components/ui/`.

---

## Commands

```bash
pnpm dev        # dev server → http://localhost:8080
pnpm build      # production build → dist/
pnpm preview    # preview production build
pnpm lint       # ESLint
pnpm test       # Vitest (run once)
pnpm test:watch # Vitest watch mode
```

---

## Design System

All design tokens live as CSS variables in `src/index.css` and are mapped to Tailwind utilities in `tailwind.config.ts`. **Never hardcode colors, fonts, or shadows.** Always use tokens.

### Color Tokens

| CSS Variable | Tailwind Class | Value | Use |
|---|---|---|---|
| `--bg-base` | `bg-background` | `hsl(250 12% 3%)` | Page background |
| `--bg-surface` | `bg-surface` | `hsl(250 10% 7%)` | Cards, modals |
| `--bg-elevated` | `bg-elevated` | `hsl(250 10% 10%)` | Hover states |
| `--text-primary` | `text-foreground` | `hsl(0 0% 98%)` | Primary text |
| `--text-muted` | `text-muted-foreground` | `hsl(250 4% 55%)` | Secondary text |
| `--accent` | `text-accent`, `bg-accent` | `hsl(338 80% 55%)` | Onda pink — CTAs, highlights |
| `--accent-glow` | `text-accent-glow`, `bg-accent-glow` | `hsl(338 80% 65%)` | Hover accent |
| `--border-subtle` | `border-border` | `hsl(250 8% 13%)` | Default borders |
| `--border-active` | `border-border-active` | `hsl(250 8% 22%)` | Hover/active borders |

### Typography

| Role | Font | Class | Size |
|---|---|---|---|
| Display / headings | Sora Bold/ExtraBold | `font-display` | `text-hero`, `text-section` |
| Body / UI text | DM Sans | `font-sans` (default) | `text-sm`, `text-base` |
| Tag labels | DM Sans | `text-tag tracking-editorial uppercase` | `11px` |

`font-display` is a Tailwind utility defined in `index.css` — it sets `font-family: 'Sora', system-ui, sans-serif`.

### Shape / Radius

| Token | Class | Value | Use |
|---|---|---|---|
| Card | `rounded-card` | `8px` | Event image cards |
| Feature | `rounded-feature` | `20px` | Feature/info cards |
| Pill | `rounded-pill` | `999px` | Buttons, tags |

### Shadows

| Class | Use |
|---|---|
| `shadow-card` | Default card shadow |
| `shadow-elevated` | Modals, floating elements |
| `shadow-glow` | Pink glow on CTAs and hero elements |

### Utility Classes (defined in `index.css`)

| Class | Effect |
|---|---|
| `.font-display` | Sora font |
| `.text-gradient` | Onda pink gradient on text |
| `.shadow-glow` | Pink box-shadow |
| `.glass` | Dark frosted glass (`backdrop-filter: blur(12px)`) |
| `.scrollbar-hide` | Hides scrollbar (used in horizontal scroll sections) |
| `.tracking-editorial` | `letter-spacing: 0.25em` (used on all-caps labels) |

---

## Animation Rules

All animations are handled by **Framer Motion**. The shared helpers live in `src/hooks/useScrollAnimation.ts`.

```ts
import { viewportOnce, useFadeUp, useSlideLeft } from "@/hooks/useScrollAnimation";
```

- `viewportOnce` — `{ once: true, margin: "-80px" }` — use as `viewport` prop on all `whileInView` animations.
- `useFadeUp(delay?)` — returns Framer Motion props for a fade-up entrance. Returns `{}` if user has `prefers-reduced-motion`.
- `useSlideLeft(delay?)` — returns props for a slide-in-from-left entrance. Returns `{}` if reduced motion.

**Always call `useReducedMotion()`** in components with complex animations (like the hero phone float loop) and skip or simplify if `true`.

**Easing standard:** `[0.16, 1, 0.3, 1]` (expo out) for all entrance animations.

---

## Page Structure

`App.tsx` assembles the page in this order — do not reorder sections:

```
Navbar
  HeroSection
  PopularEventsSection
  ArtistsMarquee
  AppCTASection
  FeatureCardsSection
  OrganizerSection
Footer
```

See `src/components/sections/CONTEXT.md` for per-section specs.

---

## Assets

All assets live in `public/` and are referenced with absolute paths (e.g. `/hero-1.jpg`).

| Asset | Used In |
|---|---|
| `/onda-icon.svg` | Navbar logo, Footer logo |
| `/onda-logo.png` | Full logo (use when more space is available) |
| `/hero-1.jpg` | FeatureCards — Discover card phone mockup |
| `/hero-2.jpg` | HeroSection — left phone |
| `/hero-3.jpg` | HeroSection — right phone |
| `/hero-4.jpg` | FeatureCards — Tickets card phone mockup |
| `/event-1..4.jpg` | PopularEventsSection — event card images |
| `/content/*.webp` | ArtistsMarquee — artist avatars |

**Phone mockup images** (hero-1..4.jpg) are screenshots from the Onda attendee app. If you need new screenshots, request them from the team — this repo does not include the app codebase.

**Dashboard screenshot** for OrganizerSection — `public/dashboard.png`. If missing, request a screenshot from the team who owns the Onda Command Center.

---

## How to Build New Sections or Components

Read `INSTRUCTION.md` before starting. The workflow is always:

1. **Query the design intelligence first:**
   ```bash
   python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<query>" --domain <domain> --stack react
   ```
   Available domains: `product`, `style`, `color`, `typography`, `ux`, `chart`, `landing`

2. **Use the Magic MCP to find a component:**
   ```
   Use the magic MCP to find a <description> component
   ```

3. **Adapt to Onda's design tokens** — replace any hardcoded colors/fonts with CSS variables and Tailwind token classes.

4. **Verify the checklist** (in INSTRUCTION.md) before marking done.

---

## Key Conventions

- **Package manager:** `pnpm` — never `npm install`, always `pnpm add`
- **Path alias:** `@/` maps to `src/` — use it for all non-relative imports
- **Icons:** `lucide-react` only — no emoji icons, no icon fonts
- **No inline styles for colors** — use Tailwind token classes. Inline styles are only acceptable for dynamic values (e.g. `clamp()` font sizes, generated gradient strings)
- **Responsive:** mobile-first. Design for 375px, test at 768px and 1280px. Max content width: `max-w-[1200px] mx-auto px-5 md:px-8`
- **Accessibility:** contrast ≥ 4.5:1, all interactive elements `min-h-[44px] min-w-[44px]`, visible `focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]` on every button and link, aria-labels on icon-only elements
- **Language:** UI copy is in **Portuguese (pt-MZ)** — Mozambican Portuguese. Match the existing copy style in the section files.
- **git:** never push directly to `main` — branch from `feat/` or `fix/`

---

## Repo Boundaries

`onda-website` is a standalone repo. It has no dependency on the attendee app or Command Center codebases. All cross-product assets (app screenshots, dashboard screenshots) are static files committed to `public/`. If you need updated screenshots or brand assets, coordinate with the team — do not assume sibling repo paths exist locally.

---

## What Onda Is (Product Context)

Onda is a live event discovery and ticketing platform for Mozambique. Key differentiators:

- **M-Pesa payments** — the dominant mobile money in Mozambique
- **Local cities** — Maputo, Beira, Nampula
- **Real-time check-in** — QR code on phone, instant validation
- **Organizer dashboard** — live crowd metrics, revenue, incident feeds (the Command Center)
- **Brand** — hot pink (`hsl(338 80% 55%)`) on near-black. Sora + DM Sans. Feels premium, young, local.
