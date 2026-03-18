# layout/CONTEXT.md

Layout components wrap the page. They are always present regardless of which section is in view.

---

## Navbar.tsx

**Purpose:** Fixed top navigation bar. Present on all pages.

**Height:** `60px`, `position: fixed`, `top: 0`, `left: 0`, `right: 0`, `z-index: 50`.

**Scroll behavior:**
- Below `scrollY = 40`: background is `transparent`
- Above `scrollY = 40`: applies `.glass` class — `hsl(250 12% 3% / 0.85)` + `backdrop-filter: blur(12px)` + `border-b border-[hsl(var(--border-subtle))]`
- Transition is handled by `transition-all duration-300` Tailwind class
- Implemented via `useEffect` + `window.addEventListener('scroll', ...)` with `{ passive: true }`

**State:**
- `scrolled: boolean` — toggles glass background
- `mobileOpen: boolean` — toggles mobile menu drawer

**Desktop layout (≥`md:`):**
- Left: Onda icon SVG (`/onda-icon.svg`) + `"ONDA"` wordmark in Sora Bold
- Center: `"EXPLORAR"` button with `ChevronDown` icon — currently no dropdown implemented (TODO)
- Right: `"ENTRAR"` ghost button + `"BAIXAR A APP"` filled pink pill button

**Mobile layout (`<md:`):**
- Left: Onda logo (same)
- Right: `"BAIXAR A APP"` pink pill button (smaller) + hamburger/X toggle

**Mobile menu drawer:**
- Renders below the navbar bar when `mobileOpen === true`
- Uses `.glass` background, `border-t`, renders the `EXPLORAR` and `ENTRAR` items vertically
- No animation yet (TODO: add `AnimatePresence` slide-down)

**Entrance animation:**
- `motion.header` — `initial: { opacity: 0, y: -8 }` → `animate: { opacity: 1, y: 0 }` — `0.4s ease-out`

**Accessibility:**
- Logo link has `aria-label="Onda home"`
- Hamburger button has `aria-label` toggling between `"Abrir menu"` and `"Fechar menu"`
- All interactive elements have `focus-visible:ring-2 focus-visible:ring-[hsl(var(--accent))]`
- All buttons meet `min-h-[44px]` touch target requirement

**TODOs:**
- [ ] Implement `EXPLORAR` dropdown (city/category picker)
- [ ] Implement `ENTRAR` — link to `../onda/` login deep link or app store
- [ ] Add `AnimatePresence` slide animation to mobile menu drawer
- [ ] Add active-state highlighting for current section (scroll-spy)

---

## Footer.tsx

**Purpose:** Site footer with navigation links, app download buttons, social icons, and legal.

**Background:** `hsl(var(--bg-base))` — same as page. `border-t border-[hsl(var(--border-subtle))]` separates from content above.

**Structure (top → bottom):**

### Top row
- Left: Onda logo + wordmark (same as Navbar)
- Right: `"PUBLICAR O TEU EVENTO ↗"` — outlined rect button (`rounded-[6px]`), `border-border-active`. On hover: `border-white`. Links to organizer sign-up (currently `#`).

### Link columns grid
`grid-cols-2` → `grid-cols-3` → `grid-cols-5` at `lg:`

Three link sections:
- **SOBRE** — A Nossa História, Imprensa, Carreiras, Blog
- **EXPLORAR** — Maputo, Beira, Nampula, Todas as Cidades
- **SUPORTE** — Centro de Ajuda, Contacta-nos, Política de Reembolso, Acessibilidade

Two utility sections (take 2 cols each on small screens):
- **Junta-te à Comunidade** — App Store + Google Play dark pill buttons (same style as hero app buttons)
- **Somos Sociais :)** — TikTok, Instagram, Spotify, LinkedIn icons as `44×44px` circular icon buttons

### Social Icons
All implemented as inline SVG functions inside `Footer.tsx` (no external icon library for these brand logos — they are not in lucide-react):
- `TikTokIcon` — custom path SVG
- `InstagramIcon` — custom path SVG
- `SpotifyIcon` — custom path SVG
- `LinkedInIcon` — custom path SVG

### Legal bar
Separated by `border-t border-[hsl(var(--border-subtle))]`, `pt-6 mt-12`.
- Left: `"© 2026 Onda. Todos os direitos reservados."` — `text-[11px]`, muted
- Right: Termos · Privacidade · Cookies — inline links, `text-[11px]`, muted, `hover:text-white`

**No animations** on the footer — it appears statically.

**Accessibility:**
- Social icon links have `aria-label` (e.g. `aria-label="Instagram"`)
- Logo link has `aria-label="Onda home"`
- Legal nav has `aria-label="Legal"`
- All buttons/links meet `min-h-[44px]` where applicable

**TODOs:**
- [ ] Replace all `href="#"` with real URLs when available
- [ ] Language selector (pt/en) — optional
- [ ] Newsletter signup field in the community section
