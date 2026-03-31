# Grovery Launchpad

**An interactive showcase of The Grovery's tools, process, and methodology.**

Built for conference kiosks (55–85" displays), client presentations, and guided web tours. The Launchpad turns how we work into something you can feel — not just read about.

---

## What It Does

The Launchpad runs in two modes:

**Launchpad Mode** — A 4×2 grid of interactive tile cards, each representing a tool or deliverable from The Grovery's practice. Tap any card to open a full-screen detail view with context, so-what clarity, and the thinking behind it.

**Journey Mode** — A winding gameboard path through five stops: Empathy → Discovery → Strategy → Activate → Impact. Each stop connects to the tools that live there. A built-in Guided Tour auto-advances through all five stops so you can let it run hands-free.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Animation | Framer Motion |
| State | React `useState` / `useReducer` |
| Content | Flat TypeScript data files |
| Deployment | Vercel |

No CMS, no external state library, no backend. Content lives in TypeScript data files — fast to edit, easy to version.

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app is optimized for **1920×1080 (16:9)** displays. Touch targets are a minimum of 48×48px throughout.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, font loading
│   ├── page.tsx            # LaunchpadApp root — mode + modal state
│   └── globals.css         # Design tokens, Tailwind base layer
├── components/
│   ├── Header.tsx          # Branding, mode toggle, theme switch
│   ├── GridMode.tsx        # 4×2 tile grid
│   ├── TileCard.tsx        # Glassmorphism card with icon, badge, SO WHAT
│   ├── JourneyMode.tsx     # Path + detail panel layout
│   ├── JourneyPath.tsx     # SVG gameboard canvas + travel animation
│   ├── JourneyNode.tsx     # Individual stop circle + label
│   ├── StopDetailPanel.tsx # Animated stop detail area
│   ├── TileModal.tsx       # Full-screen overlay (root-level, z-safe)
│   ├── IntroSplash.tsx     # Entry animation
│   └── icons/
│       └── TileIcons.tsx   # SVG icon components (currentColor)
├── data/
│   ├── tiles.ts            # 8 tile definitions
│   └── journey.ts          # 5 journey stop definitions
└── types/
    └── index.ts            # Shared TypeScript types
```

---

## Design Tokens

The visual language is defined in `globals.css` and threaded through every component via CSS custom properties:

```css
--color-bg:        #06100C   /* App background — near black, forest-tinted */
--color-surface:   #0C1B14   /* Cards + modals */
--color-surface-2: #122018   /* Hover states */
--color-primary:   #00C896   /* Grovery green */
--color-text:      #E0EDE7   /* Primary text */
--color-muted:     rgba(224,237,231,0.55)
--color-border:    rgba(255,255,255,0.07)
```

Each tile carries its own accent color used across its badge, icon glow, card border, and modal header — so every card has a distinct, on-brand identity.

---

## The 8 Tiles (V1)

| Row | Tile | Badge |
|---|---|---|
| Tools | BrandPulse *(Flagship)* | Tool |
| Tools | BrandPulse Pro | Tool |
| Tools | Personifi | Tool |
| Tools | Allē | Tool |
| Process | Discovery Greenhouse | Process |
| Process | Workshops | Process |
| Process | Strategy | Output |
| Process | Workshop Outputs | Output |

---

## The Journey (5 Stops)

| # | Stop | What Happens Here |
|---|---|---|
| 1 | Empathy | We listen first. Always. |
| 2 | Discovery | Patterns become insights. |
| 3 | Strategy | Insights become decisions. |
| 4 | Activate | Decisions become work. |
| 5 | Impact | Work becomes proof. |

---

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run start      # Serve production build locally
npm run lint       # ESLint
npm run test       # Jest
npm run test:watch # Jest in watch mode
```

---

## Deployment

Deployed to Vercel. Every PR generates a preview URL automatically.

Target deployment: `thegrovery.com/launchpad` or `launchpad.thegrovery.com` (TBD).

Conference kiosk setup: Chrome fullscreen mode on a Chromebox. No installation required — it's a URL.

---

## V1.1+ Roadmap

- Case studies inside tile modals
- 9th tile: "Our Work"
- Voice narration for the Guided Tour
- CMS migration (Contentful or Sanity) in V2

---

## Contributing

This is an internal Grovery project. If you're on the team and want to update tile content, edit `src/data/tiles.ts` or `src/data/journey.ts` — no component changes needed for copy updates.

For visual or structural changes, open a branch and a PR against `main`.

---

*Built by [The Grovery](https://thegrovery.com) — a creative consultancy that creates shared understanding so teams can align and deliver real-world impact.*
