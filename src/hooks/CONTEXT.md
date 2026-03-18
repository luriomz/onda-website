# hooks/CONTEXT.md

Shared React hooks. Currently only animation helpers. Add data-fetching hooks here when the API is wired up.

---

## useScrollAnimation.ts

**Purpose:** Centralizes Framer Motion animation prop patterns so sections don't duplicate them. Also ensures `prefers-reduced-motion` is respected everywhere.

**Exports:**

### `viewportOnce`
```ts
export const viewportOnce = { once: true, margin: "-80px" };
```
A Framer Motion `viewport` prop value. Use on every `whileInView` animation:
```tsx
<motion.div whileInView={{ y: 0, opacity: 1 }} viewport={viewportOnce} />
```
- `once: true` — fires only the first time the element enters view, not on re-scroll
- `margin: "-80px"` — triggers when the element is 80px into the viewport, not at the very edge

---

### `useFadeUp(delay?: number)`
```ts
export function useFadeUp(delay = 0) { ... }
```
Returns Framer Motion props for a **fade-up entrance** tied to scroll position.

**Returns** (when `prefers-reduced-motion` is false):
```ts
{
  initial: { y: 28, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }
}
```

**Returns** `{}` when `prefers-reduced-motion` is true — component renders statically with no animation.

**Usage:**
```tsx
import { useFadeUp } from "@/hooks/useScrollAnimation";

const fadeProps = useFadeUp(0.1); // 100ms delay
return <motion.div {...fadeProps}>content</motion.div>;
```

**Used in:** HeroSection (headline/subtitle), PopularEventsSection (section heading), AppCTASection (H2 + button), OrganizerSection (heading stack).

---

### `useSlideLeft(delay?: number)`
```ts
export function useSlideLeft(delay = 0) { ... }
```
Returns Framer Motion props for a **slide-in from left** entrance.

**Returns** (when motion is allowed):
```ts
{
  initial: { x: -32, opacity: 0 },
  whileInView: { x: 0, opacity: 1 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] }
}
```

**Returns** `{}` when `prefers-reduced-motion` is true.

**Usage:**
```tsx
import { useSlideLeft } from "@/hooks/useScrollAnimation";

const slideProps = useSlideLeft(index * 0.07);
return <motion.div {...slideProps}>artist row</motion.div>;
```

**Used in:** ArtistsMarquee (each artist row, staggered by index).

---

## Animation Pattern Reference

For animations that can't use these helpers (e.g. hero entrance on mount, phone float loop, parallax), use Framer Motion directly. Standard patterns:

### Mount entrance (hero elements)
```tsx
const reduced = useReducedMotion();
const entrance = (delay = 0) => reduced ? {} : {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }
};
// Usage: <motion.div {...entrance(0.15)}>
```

### Continuous float loop (phone mockups)
```tsx
const reduced = useReducedMotion();
// Only apply if !reduced
animate={{ y: [0, -10, 0] }}
transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
// Use a different `delay` per phone for organic stagger
```

### Parallax on scroll
```tsx
const containerRef = useRef<HTMLElement>(null);
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end start"], // or ["start end", "end start"] for contained sections
});
const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
// Apply: <motion.div style={{ y: reduced ? 0 : y }}>
```

### Staggered children
```tsx
// Pass delay based on index — do not use Framer Motion staggerChildren for simple cases
{items.map((item, index) => (
  <motion.div key={item.id} {...useFadeUp(index * 0.08)}>
))}
```

---

## Adding New Hooks

When wiring up the API, add data-fetching hooks here:

- `useEvents(city?: string)` — fetch public event list from `VITE_API_BASE_URL/events`
- `useArtists()` — fetch featured artists
- `useFeaturedEvent()` — fetch the hero featured event

Define a `PublicEvent` type in `src/types/api.ts` — coordinate with the backend team for the exact response shape. This repo has no dependency on the app codebase.
