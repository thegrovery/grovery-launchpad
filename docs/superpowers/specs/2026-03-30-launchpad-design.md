# Grovery Launchpad — UX/UI Design Spec
**Date:** 2026-03-30
**Version:** 1.0
**Status:** Approved for implementation

---

## 1. Overview

The Grovery Launchpad is a full-screen, single-page interactive showcase built in Next.js. It runs on 55–85" conference TV kiosks and as a public-facing web experience. The goal: answer "What exactly does The Grovery do?" in under 60 seconds.

---

## 2. Architecture

### Approach
Single-page application. Both modes (Grid, Journey) are mounted simultaneously and transitioned with Framer Motion `AnimatePresence mode="wait"`. No routing required for V1.

### Component Tree

```
<LaunchpadApp>                    — Root. Owns: mode, activeModal, tourActive, splashDone
  <IntroSplash>                   — Full-screen overlay. Auto-dismisses 2.5s. Skip at 0.5s.
  <Header>                        — Always mounted. Logo, tagline, mode toggle.
  <AnimatePresence mode="wait">
    <GridMode key="grid">         — 4×2 tile grid. Staggered mount animation.
      <TileCard × 8>              — Accent color via CSS custom prop. Tap → opens modal.
    <JourneyMode key="journey">   — S-curve SVG path (desktop) / vertical stack (mobile).
      <JourneyPath>               — SVG canvas, animated travel dot, gradient path segments.
      <JourneyNode × 5>           — Stop circle + label. Active: scale + glow ring.
      <StopDetailPanel>           — Slides up on stop select. Related tile mini-cards inside.
  <TileModal>                     — Root-level portal. AnimatePresence handles enter/exit.
```

### State Model

| State | Owner | Type |
|-------|-------|------|
| `mode` | LaunchpadApp | `'grid' \| 'journey'` |
| `activeModal` | LaunchpadApp | `Tile \| null` |
| `splashDone` | LaunchpadApp | `boolean` |
| `theme` | ThemeContext | `'dark' \| 'light'` |
| `activeStop` | JourneyMode | `1–5 \| null` |
| `tourActive` | JourneyMode | `boolean` |

---

## 3. Visual Design

### Brand Assets (sourced from tgwebsite3.0)
- **Fonts:** Degular (headings, tile names, stop numbers) via Adobe Typekit `lvc5ndd`. Inter (body, descriptions, labels) via `/public/fonts/` woff2 files.
- **Logo:** `Groverylogo_white.svg` in header. `logoGlyph.svg` as intro splash centerpiece.
- **Icons:** Existing SVGs from `tgwebsite3.0/public/icons/` where available (BrandPulse.svg, Greenhouse.svg, Strategy.svg, Alle.svg). Placeholder for missing tiles in V1.

### Theme System

- **Implementation:** React Context (`ThemeContext`) + `html.light` class toggle + localStorage persistence (key: `tg-launchpad-theme`)
- **Default:** Dark mode
- **Toggle:** Sun/moon icon button in header (right side, beside mode toggle pills)
- **Transition:** `background 0.2s ease, color 0.2s ease` on body
- **Pattern:** Identical to larry-sandbox and tgwebsite3.0

### Color Tokens

| Token | Dark | Light |
|-------|------|-------|
| `--color-bg` | `#06100C` | `#F5F3EF` |
| `--color-surface` | `#0C1B14` | `#FFFFFF` |
| `--color-surface-2` | `#122018` | `#EEECE8` |
| `--color-border` | `rgba(255,255,255,0.07)` | `rgba(0,0,0,0.07)` |
| `--color-text` | `#E0EDE7` | `#1B1B1C` |
| `--color-muted` | `rgba(224,237,231,0.55)` | `rgba(27,27,28,0.55)` |
| `--color-primary` | `#00C896` | `#00C896` |
| `--topbar-bg` | `rgba(6,16,12,0.85)` | `rgba(245,243,239,0.85)` |

Tile accent colors are the same in both modes.

### Tile Accent Colors (1-to-1 brand palette)

| Tile | Brand Color | Hex |
|------|-------------|-----|
| BrandPulse (Flagship) | teal | `#53C2B4` |
| BrandPulse Pro | blue | `#5869FC` |
| Personifi | purple | `#7E69AB` |
| Allē | orange | `#F97316` |
| Discovery Greenhouse | lime | `#89BC3E` |
| Workshops | darkBlue | `#004A61` |
| Strategy | mediumBlue | `#037B98` |
| Workshop Outputs | yellow | `#F2C10E` |

---

## 4. Layout

### Intro Splash
- Full-screen `#06100C`
- `logoGlyph.svg` centered, scales in
- Tagline below: *"What exactly does The Grovery do?"* in Degular
- Auto-dismisses at 2.5s with upward wipe
- Skip button appears at 0.5s (bottom-right, subtle)

### Header
- Height: ~80px
- Background: `rgba(6,16,12,0.85)` + `backdrop-filter: blur(12px)`
- Left: `Groverylogo_white.svg`
- Center: *"Tools. Process. Proof."* in Degular, muted
- Right: Mode toggle — two pill buttons (`Grid` / `Journey`). Active pill: `#00C896` fill. + Sun/moon theme toggle icon button.

### Grid Mode
- CSS Grid: 4 columns × 2 rows, 16px gap, fills viewport below header
- **TileCard anatomy:**
  - Background: `#0C1B14`, border `rgba(255,255,255,0.07)`, `border-radius: 1rem`
  - Top-left: category badge (pill, tile color at 15% opacity bg, tile color text)
  - Center: icon SVG in tile color
  - Bottom: tile name (Degular), tagline (Inter muted), "SO WHAT →" in tile color
  - Screenshot/image placeholder slot — reserved for V1.1
- **BrandPulse featured treatment:** brighter surface, colored top border strip (4px, tile color), "Flagship" badge variant
- **Responsive:** 2-column on tablet (≤1024px), 1-column on mobile (≤640px)

### Journey Mode
- **Desktop (>1024px):** S-curve SVG path occupies left 40% of screen. Detail panel fills right 60%. Angled separator divides columns (matching tgwebsite3.0 diagonal separator aesthetic).
- **Mobile (≤1024px):** Vertical stack, full width. Stop node left-aligned, chevron right. Detail panel expands inline below each node.
- **Path:** SVG gradient stroke. Each segment colored in that stop's accent color.
- **Active node:** `scale(1.08)` + glow ring (`box-shadow` in stop color at 40% opacity)

### Stop Detail Panel
- Stop number (large Degular, muted), name, subtitle, description, SO WHAT callout
- Related tile mini-cards below narrative — tap any to open Modal

### Modal
- Full-screen overlay: `backdrop-filter: blur(12px)` over `rgba(6,16,12,0.85)`
- Header strip: tile color at 15% opacity — badge, title (Degular), tagline (Inter italic)
- Body: description, detail copy
- SO WHAT block: pill label + body text in tile color
- Top-right: screenshot/image placeholder (reserved V1.1)
- Dismiss: tap outside, × button, or Escape key

---

## 5. Interactions & Animation

### Intro Splash
| Element | Animation | Spec |
|---------|-----------|------|
| Logo glyph | Scale + fade in | `scale(0.85→1) opacity(0→1)`, 0.6s ease-out |
| Tagline | Fade in | `opacity(0→1)`, delay 0.8s |
| Auto-dismiss | Upward wipe | `translateY(0→-100%)`, 0.4s ease-in at 2.5s |
| Skip button | Fade in | `opacity(0→1)` at 0.5s, triggers same exit |

### Mode Transition (AnimatePresence mode="wait")
| Direction | Exit | Enter |
|-----------|------|-------|
| Grid → Journey | `translateX(0→-60px) opacity(1→0)`, 0.25s | `translateX(60px→0) opacity(0→1)`, 0.25s |
| Journey → Grid | `translateX(0→60px) opacity(1→0)`, 0.25s | `translateX(-60px→0) opacity(0→1)`, 0.25s |

### Tile Cards
| Interaction | Animation |
|-------------|-----------|
| Mount | `translateY(14px→0) opacity(0→1)`, 0.45s ease, 60ms stagger per card |
| Hover (desktop) | `translateY(-5px)` + tile-color box-shadow 20% opacity, 0.18s |
| Press | `scale(0.97)`, 0.1s |

### Journey
| Interaction | Animation |
|-------------|-----------|
| Node mount | Stagger fade-in, 80ms delay per node |
| Node select | `scale(1→1.08)` + glow ring, 0.3s ease |
| Detail panel enter | `translateY(28px→0) opacity(0→1)`, 0.25s ease |
| Detail panel exit | Reverse, 0.15s |
| Related cards | Stagger fade-in inside panel, 50ms delay each |
| Travel dot | `stroke-dashoffset` animation along SVG path, synced to 3.2s dwell |

### Modal
| Event | Animation |
|-------|-----------|
| Enter | `translateY(28px) scale(0.97)→default`, 0.28s ease |
| Exit | Reverse, 0.2s |
| Backdrop | `opacity(0→1)`, 0.2s |

### Guided Tour
- Button always visible bottom of Journey Mode
- Activates at Stop 1, auto-advances every 3.2s
- Click any stop during tour: interrupts, pauses on that stop
- "Stop Tour" replaces button while active

### Accessibility
- `prefers-reduced-motion`: translate/scale animations disabled, opacity-only fades kept
- Minimum touch target: 48×48px
- All text meets WCAG AA contrast (4.5:1)
- Keyboard navigation: Tab to all tiles/stops, Enter/Space to activate
- Focus ring: `#00C896` outline, 2px offset

---

## 6. Content Schema (TypeScript)

```typescript
interface Tile {
  id: string;
  name: string;
  badge: 'Tool' | 'Process' | 'Output';
  tagline: string;
  description: string;
  detail: string;
  soWhat: string;
  color: string;         // hex — tile accent color
  icon: string;          // SVG path or component name
  row: 0 | 1;
  journeyStop: 1 | 2 | 3 | 4 | 5;
  featured?: boolean;    // BrandPulse only
  screenshot?: string;   // V1.1 — image path
  caseStudy?: CaseStudy; // V1.1
}

interface JourneyStop {
  id: number;            // 1–5
  name: string;
  subtitle: string;
  description: string;
  soWhat: string;
  color: string;
  relatedTiles: string[]; // Tile IDs
}
```

---

## 7. Brand Asset References (from tgwebsite3.0)

| Asset | Source Path |
|-------|-------------|
| White logo | `../tgwebsite3.0/public/Groverylogo_white.svg` |
| Logo glyph | `../tgwebsite3.0/public/logoGlyph.svg` |
| Degular font | Adobe Typekit: `https://use.typekit.net/lvc5ndd.css` |
| Inter font | `../tgwebsite3.0/public/fonts/Inter-Medium.woff2` |
| BrandPulse icon | `../tgwebsite3.0/public/icons/BrandPulse.svg` |
| Greenhouse icon | `../tgwebsite3.0/public/icons/Greenhouse.svg` |
| Strategy icon | `../tgwebsite3.0/public/icons/Strategy.svg` |
| Allē icon | `../tgwebsite3.0/public/icons/Alle.svg` |

---

## 8. Out of Scope (V1)

- Case studies in modals (V1.1)
- Screenshot/image slots in tiles and modals (V1.1)
- Voice narration for Guided Tour (V1.2)
- CMS integration (V2)
- QR code integration (V1.1)
- 9th "Our Work" tile (V1.1)
