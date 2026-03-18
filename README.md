# Onda Website

Public marketing website for Onda — Mozambique's live event ticketing app. Built with React, Vite, and Tailwind CSS.

---

## Getting Started

Prerequisites: Node.js ≥ 20, pnpm.

```bash
pnpm install
pnpm dev        # http://localhost:8080
pnpm build      # production build → dist/
pnpm preview    # preview production build
pnpm lint
pnpm test
```

---

## Stack

- **React 18** + **TypeScript 5**
- **Vite 7** — dev server on port 8080, `@/` alias for `src/`
- **Tailwind CSS 3** — extended with Onda design tokens
- **Framer Motion 12** — all animations
- **lucide-react** — icons
- **pnpm** — package manager (not npm)

---

## Project Docs

The repo is fully documented for AI-assisted development. Read these before making changes:

| File                                                                         | What it covers                                                    |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| [`CLAUDE.md`](./CLAUDE.md)                                                   | Full project guide — stack, design tokens, conventions, asset map |
| [`INSTRUCTION.md`](./INSTRUCTION.md)                                         | How to use the ui-ux-pro-max design skill + Magic MCP together    |
| [`src/CONTEXT.md`](./src/CONTEXT.md)                                         | Source directory map and quick-reference                          |
| [`src/components/sections/CONTEXT.md`](./src/components/sections/CONTEXT.md) | Per-section specs, data shapes, animation details                 |
| [`src/components/layout/CONTEXT.md`](./src/components/layout/CONTEXT.md)     | Navbar and Footer specs                                           |
| [`src/hooks/CONTEXT.md`](./src/hooks/CONTEXT.md)                             | Animation hook usage and patterns                                 |

Start with `CLAUDE.md` if you're new to the repo.

---

## Contributing

Branch off `main` using `feat/` or `fix/` prefixes. Never push directly to `main`.
