# Grovery Launchpad

Interactive, touchscreen-ready showcase of The Grovery's tools, process, and methodology. Built for conferences (55–85" TV kiosk), client presentations, and a guided web tour.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion |
| State | React useState / useReducer (no external store) |
| Content | Flat TypeScript data files (no CMS in V1) |
| Deployment | Vercel |

## Key Features (V1.0)

- **Launchpad Mode** — 4×2 grid of 8 interactive tile cards
- **Journey Mode** — Winding gameboard path (5 stops: Empathy → Discovery → Strategy → Activate → Impact)
- **Guided Tour** — Auto-advance every 3.2s with animated travel dot along SVG path
- **Modal Detail View** — Full-screen overlay per tile with SO WHAT callout

## Component Tree

```
<LaunchpadApp>          — Root: mode state, modal state
  <Header>              — Branding, mode toggle
  <GridMode>            — 4×2 tile grid
    <TileCard>
  <JourneyMode>         — Gameboard path + stop panel
    <JourneyPath>       — SVG canvas, travel animation
    <JourneyNode>       — Stop circle + label
    <StopDetailPanel>   — Animated detail area
    <RelatedTileCard>
  <TileModal>           — Full-screen overlay (root-level, z-index safe)
```

## Content

All tile and journey data lives in flat TypeScript data files. 8 tiles in V1:

**Row 1 — Tools:** BrandPulse (Flagship), BrandPulse Pro, Personifi, Allē
**Row 2 — Process/Output:** Discovery Greenhouse, Workshops, Strategy, Workshop Outputs

## Design Tokens

```css
--color-bg:        #06100C   /* App background */
--color-surface:   #0C1B14   /* Cards, modals */
--color-surface-2: #122018   /* Hover states */
--color-primary:   #00C896   /* Grovery green */
--color-text:      #E0EDE7   /* Primary text */
--color-muted:     rgba(224,237,231,0.55)
--color-border:    rgba(255,255,255,0.07)
```

Each tile has its own `--color-tile-*` accent used across badge, icon, glow, and modal header.

## Development

```bash
npm run dev     # Local dev server
```

Target resolution: 1920×1080 (16:9). Touch-first — minimum 48×48px tap targets.

## Deployment

- Production: `thegrovery.com/launchpad` or `launchpad.thegrovery.com` (TBD)
- Vercel preview deploys per PR
- Conference kiosk: Chrome fullscreen / PWA on Chromebox

## Open Items

- Official brand typefaces + web font licenses (TBD — currently system-UI stack)
- Final SO WHAT copy needs leadership sign-off
- Tile icons: existing brand assets vs. new icon set (TBD)
- Subdomain vs. path deployment (TBD)
- Target conference/event date for V1.0 debut (TBD)

## V1.1+ Roadmap

- Case studies in tile modals
- 9th "Our Work" tile
- Voice narration for Guided Tour
- CMS migration (Contentful/Sanity) in V2
