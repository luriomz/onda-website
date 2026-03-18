# UI Build Instructions — Design Intelligence + Component Library

This file instructs Claude Code on how to combine the **UI/UX Pro Max skill** (design intelligence) with the **Magic MCP** (`@21st-dev/magic`) component library when building any UI.

---

## The Two-Tool Combo

| Tool | Role | When |
|------|------|-------|
| `ui-ux-pro-max` skill | Design decisions — style, color, typography, layout, UX rules | Before and during building |
| Magic MCP (`@21st-dev/magic`) | Component search & generation from 21st.dev | When scaffolding or adding components |

**Always use both together.** The skill sets the design direction; Magic delivers the component.

---

## Workflow — Follow This Order Every Time

### Step 1 — Query design intelligence first

Before writing any component code, run the `ui-ux-pro-max` search script to get the right design context:

```bash
# Get style recommendation for the product type
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<product type>" --domain product

# Get the right UI style
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<style>" --domain style

# Get color palette
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<product type>" --domain color

# Get font pairing
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<style or mood>" --domain typography

# Get UX rules for the component type
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<component or pattern>" --domain ux
```

**Use the results to define:** visual style, color tokens, font choices, spacing rules, and interaction patterns before touching any component.

### Step 2 — Use Magic MCP to find or generate the component

With the design context from Step 1 in hand, use the Magic MCP to pull a production-ready component:

```
Use the magic MCP to find a <component name> component
```

Or with more specificity:

```
Use @21st-dev/magic to search for a <glassmorphism / minimalist / brutalist> <navbar / card / modal / form> component
```

Magic will search 21st.dev and return a component that matches. Pick the closest match to the design direction from Step 1.

### Step 3 — Adapt the component to the design spec

After Magic returns the component:

1. Apply the **color palette** from the `ui-ux-pro-max` color query (replace hardcoded colors with your design tokens)
2. Apply the **font pairing** from the typography query
3. Apply **spacing and layout rules** from the UX query
4. Verify against the **priority checklist** below

---

## Priority Checklist (Apply to Every Component)

Run through these before marking a component done — in order of priority:

- [ ] **Accessibility** — contrast ≥ 4.5:1, aria-labels on icon buttons, visible focus rings, keyboard navigable
- [ ] **Touch targets** — interactive elements ≥ 44×44px with ≥ 8px spacing between them
- [ ] **Responsive** — mobile-first, no horizontal scroll, no fixed px widths on containers
- [ ] **Style consistency** — matches the chosen style (e.g. don't mix glassmorphism and skeuomorphism)
- [ ] **Typography** — body text ≥ 16px, line-height ≥ 1.5, semantic color tokens (no raw hex in components)
- [ ] **Animation** — duration 150–300ms, respect `prefers-reduced-motion`
- [ ] **Forms** — visible labels (not placeholder-only), inline error messages, helper text
- [ ] **No emoji icons** — use SVG icons only

---

## Stack-Specific Search

When working on a specific stack, add `--stack` to get tailored recommendations:

```bash
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<query>" --stack react
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<query>" --stack nextjs
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<query>" --stack shadcn
python3 ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py "<query>" --stack tailwind
```

This project uses **React + Tailwind + shadcn/ui** — default to `--stack shadcn` unless otherwise specified.

---

## Example Prompts to Use in Claude Code

```
Build a pricing section. First query ui-ux-pro-max for SaaS color palette and style,
then use the magic MCP to find a pricing card component, then adapt it to the design spec.
```

```
Add a navbar. Query ui-ux-pro-max for navigation UX rules and typography,
use @21st-dev/magic to find a responsive navbar, then apply our design tokens.
```

```
Create a dashboard with charts. Query ui-ux-pro-max for chart type recommendations
and dashboard product style, use magic MCP for the chart and card components,
then wire it together following the UX priority checklist.
```

---

## When to Skip Magic MCP

Use Magic MCP for: navbars, cards, modals, forms, tables, pricing sections, hero sections, dashboards, sidebars, and any self-contained UI component.

Skip Magic MCP and build from scratch when: the component is highly custom to this specific product, requires complex local state that won't transfer from a generic component, or Magic returns nothing close to the design spec.

---

## Available Skill Domains (Quick Reference)

| Domain | Query for |
|--------|-----------|
| `product` | Product type → recommended style, layout, and UX patterns |
| `style` | UI style details, CSS keywords, AI prompts for a style |
| `color` | Color palette by product type |
| `typography` | Font pairings with Google Fonts import |
| `ux` | Best practices and anti-patterns for components and interactions |
| `chart` | Chart type selection and library recommendations |
| `landing` | Page structure and CTA strategy |
