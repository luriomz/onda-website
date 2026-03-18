# sections/CONTEXT.md

All page sections live here. Each is a self-contained component imported in `src/App.tsx`. They render in this order (do not change):

```
HeroSection → PopularEventsSection → ArtistsMarquee → AppCTASection → FeatureCardsSection → OrganizerSection
```

---

## HeroSection.tsx

**Purpose:** Full-viewport opening section. First impression of the brand.

**Layout:** Centered column, `min-height: 580px`, `pt-28 pb-20` (clears the 60px navbar).

**Background:** `hsl(var(--bg-base))` + a radial gradient pink glow positioned at the top-center:
```css
radial-gradient(ellipse at 50% -10%, hsl(338 80% 30% / 0.3), transparent 60%)
```
This is the key visual difference from Shotgun (which uses purple). The glow color is Onda's accent pink.

**Content stack (top → bottom):**
1. Label pill — `"MOZAMBIQUE'S #1 EVENT APP"` — small uppercase tag
2. `H1` — Sora Bold, `text-hero` (`clamp(56px, 8vw, 96px)`), uppercase, `line-height: 0.95`
3. Subtitle — DM Sans, `17px`, `text-muted-foreground`
4. App store buttons — App Store + Play Store, dark pill style
5. Rating row — `"4.9"` + star icons (pink) + ratings count
6. Phone mockups — 3 phones, center phone foregrounded, side phones smaller and offset

**Phone mockups:**
- Center: `/hero-1.jpg` — `520px` tall on desktop, `360px` on mobile
- Left: `/hero-2.jpg` — `400px`, `rotate(-12deg)`, `translateX(-60px)`, `z-index: 0`
- Right: `/hero-3.jpg` — `400px`, `rotate(12deg)`, `translateX(60px)`, `z-index: 0`
- All phones overflow below section bottom: `mb-[-80px]` on container

**Animations (Framer Motion):**
- Content enters on mount with `useFadeUp()` pattern — `y: 60 → 0`, `opacity: 0 → 1`, `0.7s`
- Side phones delayed by `150ms` each
- All phones float continuously: `y: [0, -10, 0]`, `4s infinite ease-in-out`. Each offset by `1s` delay for organic feel.
- Phones have parallax on scroll: `useScroll` + `useTransform(scrollYProgress, [0,1], [0, -120])`
- Always call `useReducedMotion()` — skip float loop and use static entrance if `true`

**State:** None — purely presentational.

---

## PopularEventsSection.tsx

**Purpose:** Shows a grid of upcoming events with a city selector.

**Layout:** Max-width container, `py-20`.

**Header row:**
- `"EVENTOS POPULARES EM"` (condensed bold) + city name with flag + chevron dropdown
- City switcher is local state (`useState`) — cycles between Maputo, Beira, Nampula
- No actual API call yet — data is hardcoded in `EVENTS` const

**Event grid:**
- `grid-cols-1` mobile → `grid-cols-2` desktop, `gap-5`
- Shows 4 events (2×2). `"MAIS EVENTOS →"` link below grid.

**Event card anatomy (no card background — text stacks under image):**
```
[Image — aspect-ratio 3/4, rounded-card, overflow-hidden]
  └─ on hover: image scale(1.03), transition 0.25s ease
[Title — font-display, text-card (18px), white, 2-line clamp]
[Venue — text-meta (13px), text-muted-foreground]
[Date row — accent color date | "·" separator | time | price white]
[Tags — small rounded-pill tags, border-border-active, text-muted-foreground, text-tag]
```

**Data shape (each event in `EVENTS` array):**
```ts
{
  id: string
  name: string
  venue: string
  date: string       // e.g. "SÁB 22 MAR"
  time: string       // e.g. "20:00"
  price: string      // e.g. "500 MZN"
  tags: string[]
  image: string      // public path e.g. "/event-1.jpg"
}
```

**Animations:** Each card fades up with `whileInView`, staggered by `index * 0.08` delay.

**TODO:** Wire to real API via `VITE_API_BASE_URL` when backend is ready. Define a local `PublicEvent` type in `src/types/api.ts` — coordinate with the backend team for the exact response shape.

---

## ArtistsMarquee.tsx

**Purpose:** Full-width editorial list of featured artists. Creates a "who plays here" feel.

**Layout:** Full-width (no max-width container), `py-16`.

**Row anatomy:**
```
[Artist name — font-display, clamp(48px, 6vw, 80px), white, left-anchored, ~70% width]
[Genre pill — small, border-border, text-muted-foreground, rounded-pill, right side]
[Avatar — circular img, 52px, right-anchored, ml-4]
```
- Rows separated by `1px solid hsl(var(--border-subtle))`
- `padding: 20px 24px` per row, `cursor: pointer`
- On hover: `background: hsl(var(--bg-surface))`, artist name shifts to `text-accent`
- `ArrowUpRight` icon appears on hover (opacity 0 → 1, `transition 0.2s`)

**Data:** `ARTISTS` const array — `{ name, genre, image }`. Images reference `/content/*.webp`.

**Animations:** Each row uses `useSlideLeft(index * 0.07)` from `useScrollAnimation.ts` — slides in from left, staggered.

---

## AppCTASection.tsx

**Purpose:** Mid-page conversion prompt. Gets the visitor to download the app.

**Layout:** Full-width, `py-24`, `text-center`, centered column.

**Background:** Subtle pink radial glow centered in the section (not at top/bottom — centered):
```css
radial-gradient(ellipse at 50% 50%, hsl(338 80% 30% / 0.12), transparent 65%)
```

**Content:**
1. `H2` — Portuguese copy, `clamp(28px, 4vw, 52px)`, Sora Bold, uppercase, white, `max-w-[680px]`
2. CTA button — `"BAIXA A APP ONDA"` — pill button with pink border + pink text. On hover: fills with `bg-accent`, white text.

**Modal (opened by CTA button):**
- `AnimatePresence` + Framer Motion for enter/exit
- Dark overlay `hsl(var(--bg-base) / 0.85)` + `backdrop-blur`
- Modal card: `bg-surface`, `rounded-feature`, `p-8`
- Contains: App Store button + Google Play button (same style as hero)
- `X` button to close, `Escape` key to close
- `aria-modal="true"` + `role="dialog"` + `aria-labelledby`

**State:** `modalOpen: boolean` — local state.

**Animations:** H2 and button fade up with `whileInView`.

---

## FeatureCardsSection.tsx

**Purpose:** Side-by-side feature showcase. Two app capabilities with phone mockups.

**Layout:** Max-width container, `py-20`. `grid-cols-1` → `grid-cols-2` on `md:`, `gap-5`.

**Card anatomy:**
```
[Card container — rounded-feature, bg-gradient dark, border subtle, overflow-hidden]
  ├─ [Accent shimmer stripe — 2px top edge, accent gradient]
  ├─ [Eyebrow — small uppercase label, text-accent]
  ├─ [Heading — font-display, clamp(22px, 3vw, 36px), white, centered, px-8 pt-8]
  ├─ [Body — DM Sans, 15px, text-muted-foreground, centered, px-8 pb-6, max-w-[340px]]
  └─ [Phone image — centered, max-h ~400px, overflow visible at bottom (cropped by card)]
```

**Cards data (`CARDS` const):**
- Card 0 — Discover: heading in Portuguese, image `/hero-1.jpg`
- Card 1 — Your Tickets: heading in Portuguese, image `/hero-4.jpg`

**Background gradient per card:**
```css
linear-gradient(160deg, hsl(250 10% 9%) 0%, hsl(250 10% 6%) 100%)
```

**Animations:** Cards fade up with `whileInView`, `delay: index * 0.12`.

---

## OrganizerSection.tsx

**Purpose:** B2B pitch to event organizers. Last major content section before the footer.

**Layout:** Full-width, `py-24`, `text-center`. Has a top ambient pink glow (same as AppCTA but `opacity 0.2` and at top edge).

**Content:**
1. Eyebrow — `"PARA ORGANIZADORES"` — `text-accent`, small uppercase, `tracking-editorial`
2. `H2` — Portuguese copy, `clamp(32px, 5vw, 64px)`, Sora Bold, uppercase, white
3. Subtitle — DM Sans, `16px`, `text-muted-foreground`, `max-w-[560px]`
4. CTA button — `"PUBLICAR O TEU EVENTO"` — outlined rect button (`rounded-[6px]`, NOT pill). White border + white text. On hover: `bg-white`, `text-[hsl(var(--bg-base))]` (inverts to black text on white).
5. Dashboard mockup image — `public/dashboard.png`. `max-w-[900px]`, centered, `mt-16`. **This asset still needs to be added** — request a screenshot of the Onda Command Center overview page from the team.

**Parallax animation on dashboard image:**
```tsx
const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
const dashboardY = useTransform(scrollYProgress, [0, 1], [40, -40])
// Apply as: <motion.div style={{ y: reduced ? 0 : dashboardY }}>
```

**State:** None — purely presentational.

---

## Adding a New Section

1. Create `src/components/sections/NewSection.tsx`
2. Import and add to `App.tsx` in the correct position
3. Query `ui-ux-pro-max` first, then use Magic MCP, then adapt
4. Export a default function — no required props
5. Update this CONTEXT.md with the new section's spec
