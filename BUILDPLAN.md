# Onda Website — Build Plan
> Marketing website for the Onda event ticketing app. Inspired by Shotgun (shotgun.live) — but better. Built with React + Vite + Tailwind inside `onda-website/`. The attendee app lives in `onda/` and the organizer dashboard in `onda-command-center-main/` — use those as the source of truth for brand, features, and real UI screenshots.

---

## Context: What Onda Is

**Onda** is a live event ticketing platform for Mozambique. Two products already exist:

- **Attendee app** (`onda/`) — mobile-first React/Tauri app. Ticket discovery, purchase (M-Pesa wallet), QR check-in, saved events, order history. Primary color: hot pink `hsl(338 80% 55%)` on near-black `hsl(250 12% 3%)`. Fonts: `Sora` (display) + `DM Sans` (body).
- **Organizer dashboard** (`onda-command-center-main/`) — real-time ops dashboard with live SSE crowd metrics, revenue, incident feeds, chart panels.

**This repo** (`onda-website/`) is the public marketing website — the equivalent of shotgun.live. Currently a clean-slate placeholder. Build it here.

---

## Design Direction

### Step 1 — Query the design intelligence before writing any code

Run these commands first. Feed the outputs into every design decision below.

```bash
# Product type → layout, style, UX pattern recommendations
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "event ticketing SaaS dark" --domain product

# Style system
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "dark mode minimalist condensed bold" --domain style

# Color palette
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "event nightlife dark" --domain color

# Typography
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "condensed bold uppercase editorial" --domain typography

# UX rules for landing pages
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "landing page CTA hero" --domain landing

# UX rules for navbars, cards, animations
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "navbar card scroll animation" --domain ux
```

### Design Tokens (baseline — refine after queries above)

These match the attendee app's existing brand. Keep consistency.

```css
/* Colors */
--bg-base:        hsl(250 12% 3%);     /* near-black, warm dark — NOT pure #000 */
--bg-surface:     hsl(250 10% 7%);     /* card backgrounds */
--bg-elevated:    hsl(250 10% 10%);    /* hover states, modals */
--text-primary:   hsl(0 0% 98%);       /* off-white */
--text-muted:     hsl(250 4% 55%);     /* secondary text */
--accent:         hsl(338 80% 55%);    /* Onda pink — primary CTA, highlights */
--accent-glow:    hsl(338 80% 65%);
--border-subtle:  hsl(250 8% 13%);     /* card borders */
--border-active:  hsl(250 8% 22%);

/* Typography */
--font-display:   'Sora', sans-serif;       /* headings — existing app font */
--font-body:      'DM Sans', sans-serif;    /* body — existing app font */

/* Font scale */
--text-hero:      clamp(56px, 8vw, 96px);  /* H1 */
--text-section:   clamp(32px, 5vw, 56px);  /* H2 */
--text-card:      18px;
--text-meta:      13px;
--text-tag:       11px;

/* Shape */
--radius-card:    8px;       /* event image cards */
--radius-feature: 20px;     /* feature/info cards */
--radius-pill:    999px;    /* buttons, tags */
```

> **Onda's edge over Shotgun:** Replace Shotgun's neutral white CTAs with Onda's hot pink accent on key CTAs. The pink glow (`--shadow-glow`) should appear on the hero and section headings to make it feel more alive. The rest stays dark and editorial.

---

## Tech Stack

| Tool | Role |
|------|------|
| React + Vite | Already configured in `onda-website/` |
| Tailwind CSS | Already configured — extend with Onda tokens |
| Framer Motion | Animations (install: `pnpm add framer-motion`) |
| shadcn/ui | Component primitives (run `npx shadcn@latest init`) |
| Magic MCP (`@21st-dev/magic`) | Component search and generation |
| `ui-ux-pro-max` skill | Design intelligence — query before building each section |

---

## Page Structure

Build these sections in order, top to bottom. Each section has its own build instructions.

```
[NAVBAR]
[HERO]
[POPULAR EVENTS — live data grid]
[ARTISTS MARQUEE]
[APP CTA — "Looking to go out?"]
[FEATURE CARDS — Discover + Tickets]
[ORGANIZER SECTION — "Launching an event?"]
[ORGANIZER DASHBOARD MOCKUP]
[FOOTER]
```

---

## Section Build Instructions

### 0. Foundation — Do This First

```bash
# 1. Install dependencies
pnpm add framer-motion @tanstack/react-query

# 2. Init shadcn (choose dark theme, CSS variables ON)
npx shadcn@latest init

# 3. Add Google Fonts to index.html
# Sora (700, 800) + DM Sans (400, 500, 600)

# 4. Set up Tailwind design tokens
# Extend tailwind.config.ts with the colors, fonts, and shadows above

# 5. Replace index.css with Onda dark theme CSS variables (match onda/ app's index.css)
```

**File structure to create:**
```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── PopularEventsSection.tsx
│   │   ├── ArtistsMarquee.tsx
│   │   ├── AppCTASection.tsx
│   │   ├── FeatureCardsSection.tsx
│   │   └── OrganizerSection.tsx
│   └── ui/          ← shadcn primitives go here
├── hooks/
│   └── useScrollAnimation.ts
├── lib/
│   └── utils.ts
├── App.tsx           ← replace placeholder
└── index.css         ← replace with Onda dark theme
```

---

### 1. NAVBAR

**Design query:**
```bash
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "sticky navbar dark transparent blur" --domain ux --stack react
```

**Magic MCP prompt:**
```
Use the magic MCP to find a sticky dark navbar component with logo left, nav links center, and CTA button right. Dark background with blur on scroll.
```

**Specs:**
- Height: `60px`, `position: sticky`, `top: 0`, `z-index: 50`
- Background: `transparent` → `hsl(250 12% 3% / 0.9)` + `backdrop-filter: blur(12px)` on scroll (add class when `scrollY > 40`)
- Left: Onda logo SVG + wordmark "ONDA" in `font-display`, bold, white
- Center: `EXPLORE` text button with chevron dropdown (cities/categories)
- Right: `LOGIN` ghost button + `GET THE APP` filled pill button in Onda pink (`bg-accent`)
- Mobile: hamburger menu collapses center; right shows only `GET THE APP`

**Animation:**
- Entrance: `opacity: 0 → 1` + `translateY(-8px) → 0` on mount, `0.4s ease-out`
- On scroll past 40px: smooth background transition `0.3s`

---

### 2. HERO SECTION

**Design query:**
```bash
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "hero landing dark gradient phone mockup" --domain style
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "hero CTA app download" --domain landing
```

**Magic MCP prompt:**
```
Use the magic MCP to find a full-width dark hero section with large bold headline, subtitle, app store download buttons, and phone mockup imagery. Dark background.
```

**Specs:**
- Background: `hsl(250 12% 3%)` + radial gradient glow: `radial-gradient(ellipse at 50% 0%, hsl(338 80% 30% / 0.3), transparent 60%)` — the pink glow differentiates Onda from Shotgun's purple
- Min-height: `580px`, flex column, centered
- Content stack:
  1. Small label pill: `"MOZAMBIQUE'S #1 EVENT APP"` — uppercase, `11px`, muted, pill border
  2. `H1` — `"GRAB YOUR TICKET, MAKE MEMORIES"` — Sora Bold, `clamp(56px, 8vw, 96px)`, white, tight `line-height: 0.95`, uppercase. **2 lines max.**
  3. Subtitle — `"Find the best events in Maputo. Download Onda."` — DM Sans, `17px`, muted grey
  4. App store buttons — two dark pill buttons (App Store + Play Store) with SVG icons. On hover: `bg-elevated` lift.
  5. Rating row — `"4.9"` + 5 stars (pink `hsl(338 80% 55%)`) + `"50K+ ratings"` muted. Flex centered.
  6. **3 phone mockups** — use screenshots from `onda/` app. Center phone is `520px` tall, side phones `400px`, rotated `±12deg`, offset horizontally. All 3 slightly overflow into next section (`margin-bottom: -80px`)

**Animations (Framer Motion):**
```tsx
// Center phone: entrance
initial={{ y: 60, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}

// Side phones: entrance with delay
transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}

// All phones: continuous float loop
animate={{ y: [0, -10, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
// Offset each phone's float by 1s delay for organic feel

// Parallax on scroll (useScroll + useTransform):
const { scrollYProgress } = useScroll()
const y = useTransform(scrollYProgress, [0, 1], [0, -120])
// Apply to phone mockup container
```

---

### 3. POPULAR EVENTS SECTION

**Design query:**
```bash
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "event card grid dark" --domain style --stack react
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "image card hover animation" --domain ux
```

**Magic MCP prompt:**
```
Use the magic MCP to find a dark event card grid component with image, title, venue, date/time metadata, and genre tag pills. 2-column layout.
```

**Specs:**
- Section heading row: `"POPULAR EVENTS IN"` (bold condensed) + city selector with flag emoji + chevron dropdown (Maputo, Beira, Nampula)
- Grid: `grid-cols-2` desktop, `grid-cols-1` mobile, `gap-5`
- Show 4 events max (2×2 grid). `"MORE EVENTS →"` link below.
- **Event card anatomy:**
  ```
  [Image — aspect-ratio 3/4, border-radius 8px, overflow hidden]
  [Title — Sora SemiBold 18px, white, 2-line clamp]
  [Venue — DM Sans 13px, muted]
  [Date row — pink accent date | separator | time | price in white]
  [Tags row — small pill tags, border hsl(250 8% 22%), text muted]
  ```
- Card background: none — text is stacked directly below image
- **Hover:** image `scale(1.03)`, `transition: transform 0.25s ease`. Wrap in `overflow: hidden`.

**Animations (scroll-triggered via Framer Motion `whileInView`):**
```tsx
initial={{ y: 28, opacity: 0 }}
whileInView={{ y: 0, opacity: 1 }}
viewport={{ once: true, margin: "-80px" }}
transition={{ duration: 0.5, delay: index * 0.08 }}
// Stagger each card by 80ms
```

> **Data:** For now use static placeholder events (4 items) matching real Onda event structure from `onda/src/types/api.ts` — `PublicEvent` type. Wire to real API later via `VITE_API_BASE_URL`.

---

### 4. ARTISTS MARQUEE SECTION

**Design query:**
```bash
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "artist list row scroll marquee" --domain style
```

**Magic MCP prompt:**
```
Use the magic MCP to find a full-width artist list with large bold names, separator lines between rows, and a small artist thumbnail on the right. Dark editorial style.
```

**Specs:**
- Full-width, dark bg
- Each row: `1px solid hsl(250 8% 13%)` separator, `padding: 20px 0`
- Row layout: Artist name left (Sora Bold, `clamp(48px, 6vw, 80px)`, white) + circular avatar right (`52px`) + small brand pill
- On hover row: `background: hsl(250 10% 7%)` subtle lift. Artist name: `color: hsl(338 80% 65%)` pink tint.

**Animations:**
```tsx
// Each row slides in from left on scroll
initial={{ x: -32, opacity: 0 }}
whileInView={{ x: 0, opacity: 1 }}
viewport={{ once: true, margin: "-60px" }}
transition={{ duration: 0.45, delay: index * 0.07 }}
```

---

### 5. APP CTA SECTION — "LOOKING TO GO OUT?"

**Design query:**
```bash
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "CTA banner full width app download dark" --domain landing
```

**Magic MCP prompt:**
```
Use the magic MCP to find a full-width dark CTA banner with large centered headline and a single prominent outlined pill button.
```

**Specs:**
- Full-width, `min-height: 240px`, flex col, centered, `text-align: center`
- `H2` — `"LOOKING TO GO OUT? ALL THE EVENTS YOU LOVE ARE RIGHT THERE!"` — Sora Bold, `clamp(28px, 4vw, 52px)`, white, max-width `680px`
- CTA button: `"GET THE ONDA APP"` — pill button, `border: 2px solid hsl(338 80% 55%)`, text `hsl(338 80% 65%)`, `height: 48px`, `padding: 0 32px`. On hover: `background: hsl(338 80% 55%)`, text white, `transition: 0.15s`.
- On click: opens modal with QR code for app download + App Store / Play Store links

**Animation:**
```tsx
// Headline: fade-up on scroll
initial={{ y: 24, opacity: 0 }}
whileInView={{ y: 0, opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.5 }}
```

---

### 6. FEATURE CARDS SECTION — "Discover" + "Get Your Tickets"

**Design query:**
```bash
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "feature card dark rounded app mockup" --domain style --stack react
```

**Magic MCP prompt:**
```
Use the magic MCP to find a 2-column feature card layout with dark rounded cards, a large heading, and a phone/app screenshot overflowing at the bottom of each card.
```

**Specs:**
- Grid: `grid-cols-2` desktop, `grid-cols-1` mobile, `gap-5`
- Each card: `background: hsl(250 10% 7%)`, `border: 1px solid hsl(250 8% 13%)`, `border-radius: 20px`, `padding: 32px 32px 0`
- Card 1 — **DISCOVER**: heading `"DISCOVER EVENTS NEAR YOU"` + body text describing the feed. Phone mockup of the `onda/` Index/feed screen overflows at card bottom. Use an actual screenshot.
- Card 2 — **YOUR TICKETS**: heading `"YOUR TICKETS, ALWAYS READY"` + body text about QR check-in. Phone mockup of `onda/` TicketsPage / QR screen. Use an actual screenshot.
- Card heading: Sora Bold, `clamp(22px, 3vw, 36px)`, white, centered
- Card body: DM Sans, `15px`, `hsl(250 4% 55%)`

**Animations:**
```tsx
// Cards animate in from bottom, left first then right
initial={{ y: 40, opacity: 0 }}
whileInView={{ y: 0, opacity: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.5, delay: index * 0.12 }}
```

---

### 7. ORGANIZER SECTION — "LAUNCHING AN EVENT?"

**Design query:**
```bash
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "organizer event management B2B CTA dark" --domain product
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "dashboard mockup parallax browser frame" --domain style
```

**Magic MCP prompt:**
```
Use the magic MCP to find a full-width dark section with a large centered headline, subtitle, CTA button, and a large browser/dashboard screenshot below it with a parallax scroll effect.
```

**Specs:**
- Full-width, dark bg, centered
- `H2` — `"LAUNCHING AN EVENT? YOUR EVENT DESERVES THE BEST CROWD."` — Sora Bold, largest headline on page outside hero, white, centered
- Subtitle: `"Real-time crowd analytics, M-Pesa ticket sales, and zero-friction check-in. All in one dashboard."` — DM Sans, `16px`, muted, `max-width: 560px`, centered
- CTA: `"LIST MY EVENT"` — outlined rect button (not pill), `border: 2px solid hsl(0 0% 98%)`, white text, sharp `border-radius: 6px`. On hover: white fill, dark text.
- **Dashboard mockup:** Use a screenshot of `onda-command-center-main/` overview or live dashboard. Display as a large centered image (`max-width: 900px`), no frame/border needed. Overflows slightly into footer.

**Parallax animation (Framer Motion):**
```tsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
const y = useTransform(scrollYProgress, [0, 1], [40, -40])
// Apply to dashboard image — it scrolls at 0.7x speed
```

---

### 8. FOOTER

**Magic MCP prompt:**
```
Use the magic MCP to find a dark multi-column footer with logo, link columns, app store buttons, social icons, and a legal bar at the bottom.
```

**Specs:**
- Background: `hsl(250 12% 3%)` — same as page
- Top: `1px solid hsl(250 8% 13%)` divider
- Top row: Onda logo left + `"LIST YOUR EVENT ↗"` outlined button right
- Link columns (3 cols): `ABOUT` | `EXPLORE` (cities: Maputo, Beira, Nampula) | `SUPPORT`
- App row left: `"JOIN THE COMMUNITY"` + App Store + Play Store dark pill buttons
- Social row right: `"WE ARE SOCIAL :)"` + TikTok, Instagram, Spotify, LinkedIn icons (white SVGs, `32px`)
- Legal bar: terms · privacy · cookies — `11px`, muted. `© 2026 Onda. All rights reserved.`

---

## Animations Master Reference

| Element | Animation | Trigger | Duration |
|---------|-----------|---------|----------|
| Navbar | `translateY(-8px) → 0`, `opacity 0→1` | Mount | `0.4s ease-out` |
| Hero H1 | `translateY(24px) → 0`, `opacity 0→1` | Mount | `0.6s ease-out` |
| Hero phone (center) | `translateY(60px) → 0`, `opacity 0→1` | Mount | `0.7s` |
| Hero phones (sides) | same + `150ms` delay each | Mount | `0.7s` |
| Phone float loop | `translateY 0 → -10px → 0` | Continuous | `4s infinite`, offset per phone |
| Phone parallax | `translateY(scrollY * 0.3)` | Scroll | `useTransform` |
| Section H2s | `translateY(20px) → 0`, `opacity 0→1` | Scroll (20% in view) | `0.5s ease-out` |
| Event cards | `translateY(28px) → 0`, staggered `80ms` | Scroll | `0.5s` |
| Artist rows | `translateX(-32px) → 0`, staggered `70ms` | Scroll | `0.45s` |
| Feature cards | `translateY(40px) → 0`, staggered `120ms` | Scroll | `0.5s` |
| Dashboard mockup | parallax `40px → -40px` | Scroll | `useTransform` |
| All CTAs | `background/color` fill on hover | Hover | `0.15s` |

**Global rule:** All scroll animations use `whileInView` with `once: true` and `viewport={{ margin: "-80px" }}`. This fires once when 80px into view — not too eager, not too late.

---

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| `≥1280px` | Full layout, max-width `1200px` centered |
| `1024–1279px` | Event grid 2-col; feature cards 2-col; hero phones at 90% size |
| `768–1023px` | Event grid 2-col tighter; artist names `48px`; footer 2-col |
| `<768px` | All single column; nav collapses; hero phones stack vertically; feature cards stack |
| `<480px` | H1 `40–48px`; artist names `36px`; CTA buttons full-width |

---

## How to Use the Combo (Magic MCP + UI Skill) Per Section

For every section:

1. **Query first** — run the `ui-ux-pro-max` search commands listed under that section. Read the output carefully. Note the style, spacing, and UX rules it returns.
2. **Magic MCP second** — use the prompt listed under that section. Pick the closest component match.
3. **Adapt** — apply Onda's design tokens (colors, fonts, spacing) to the Magic component. Replace any hardcoded values.
4. **Verify** — run through the priority checklist:
   - [ ] Contrast ≥ 4.5:1 (off-white text on dark bg — ✓ by default)
   - [ ] Interactive elements ≥ 44×44px touch targets
   - [ ] Mobile-first responsive — test at 375px first
   - [ ] Animations respect `prefers-reduced-motion` — wrap Framer Motion in `useReducedMotion()`
   - [ ] No emoji icons — use lucide-react SVGs
   - [ ] Focus rings visible — `ring-2 ring-accent` on keyboard focus

---

## What Makes Onda Better Than Shotgun

| Shotgun | Onda improvement |
|---------|-----------------|
| Neutral purple glow in hero | Onda pink glow (`hsl(338 80% 30% / 0.3)`) — more distinctive and on-brand |
| White/neutral CTAs | Primary CTAs in Onda pink — higher visual hierarchy |
| Generic condensed font | Sora Bold — same font as the actual app — feels native |
| No brand differentiation in cards | Subtle pink accent on event date metadata — consistent brand touch |
| Static organizer section | Real screenshot of Onda Command Center dashboard — proves the product |
| Generic copy | Mozambique-specific copy (Maputo, M-Pesa, local cities) — feels local and real |

---

## Build Order Checklist

```
[ ] 0. Foundation — deps, shadcn, tokens, index.css, file structure
[ ] 1. Navbar — sticky, blur on scroll, pink CTA
[ ] 2. Hero — headline, phones, float + parallax animations
[ ] 3. Popular Events — card grid, city selector, stagger animation
[ ] 4. Artists Marquee — full-width list, slide-in animation
[ ] 5. App CTA banner — centered, pink-outlined button, modal
[ ] 6. Feature Cards — Discover + Tickets, phone mockups
[ ] 7. Organizer Section — dashboard screenshot, parallax
[ ] 8. Footer — links, app buttons, socials, legal
[ ] 9. Responsive pass — test every section at 375px, 768px, 1280px
[ ] 10. Animation audit — verify all transitions, check prefers-reduced-motion
[ ] 11. Accessibility pass — contrast, focus rings, aria-labels, keyboard nav
```
