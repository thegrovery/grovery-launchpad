# Grovery Launchpad V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold and build the full Grovery Launchpad V1 — a full-screen interactive showcase with Grid Mode, Journey Mode, Guided Tour, Tile Modals, dark/light theme, and intro splash.

**Architecture:** Single-page Next.js App Router application. Grid and Journey modes both mount and transition via Framer Motion `AnimatePresence mode="wait"`. All state lives in the root `LaunchpadApp` page component and a `ThemeContext`. No routing, no CMS, no external data fetching.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion, React Testing Library + Jest

---

## File Map

```
src/
  app/
    layout.tsx                    — Root layout: ThemeProvider wrap, font meta, viewport
    page.tsx                      — LaunchpadApp: owns mode/activeModal/splashDone state
    globals.css                   — CSS custom properties (dark/light tokens), base typography
  components/
    IntroSplash.tsx               — Full-screen branded splash, auto-dismisses at 2.5s
    Header.tsx                    — Logo, tagline, mode toggle pills, theme toggle
    GridMode.tsx                  — 4×2 CSS grid, staggered tile mount animation
    TileCard.tsx                  — Individual tile: badge, icon, name, tagline, SO WHAT
    TileModal.tsx                 — Full-screen overlay modal for tile detail
    JourneyMode.tsx               — S-curve path + detail panel + guided tour controller
    JourneyPath.tsx               — SVG canvas: path line, stop nodes, travel dot animation
    JourneyNode.tsx               — Individual stop circle + label
    StopDetailPanel.tsx           — Animated detail area: stop narrative + related tile cards
    RelatedTileCard.tsx           — Compact tile card used inside stop detail panel
  context/
    ThemeContext.tsx              — Theme state (dark/light), toggle, localStorage persistence
  types/
    index.ts                      — Tile, JourneyStop, Mode, Theme interfaces
  data/
    tiles.ts                      — 8 tile data objects
    journey.ts                    — 5 journey stop data objects
  __tests__/
    ThemeContext.test.tsx
    TileCard.test.tsx
    GridMode.test.tsx
    TileModal.test.tsx
    JourneyMode.test.tsx
    data.test.ts
public/
  fonts/
    Inter-Medium.woff2            — copied from tgwebsite3.0
    Inter-Medium.woff             — copied from tgwebsite3.0
    Inter-MediumItalic.woff2      — copied from tgwebsite3.0
  icons/
    BrandPulse.svg                — copied from tgwebsite3.0
    Greenhouse.svg                — copied
    Strategy.svg                  — copied
    Alle.svg                      — copied
    Align.svg                     — copied
    Grow.svg                      — copied
    Fragment.svg                  — copied
  Groverylogo_white.svg           — copied from tgwebsite3.0
  logoGlyph.svg                   — copied from tgwebsite3.0
```

---

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`

- [ ] **Step 1: Initialize Next.js inside the existing directory**

```bash
cd /Users/sbjm4max/Sites/grovery-launchpad
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

When prompted:
- Would you like to use Turbopack? → **No**
- Accept all other defaults

- [ ] **Step 2: Install Framer Motion and testing libraries**

```bash
npm install framer-motion
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event ts-jest @types/jest
```

- [ ] **Step 3: Create jest.config.ts**

```typescript
// jest.config.ts
import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);
```

- [ ] **Step 4: Create jest.setup.ts**

```typescript
// jest.setup.ts
import '@testing-library/jest-dom';
```

- [ ] **Step 5: Add test script to package.json**

In `package.json`, add to the `"scripts"` block:
```json
"test": "jest",
"test:watch": "jest --watch"
```

- [ ] **Step 6: Verify dev server starts**

```bash
npm run dev
```

Expected: Next.js dev server running at http://localhost:3000 with default page. Stop with Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with Framer Motion and Jest"
```

---

## Task 2: Copy Brand Assets from tgwebsite3.0

**Files:**
- Create: `public/fonts/` (3 font files)
- Create: `public/icons/` (7 SVG files)
- Create: `public/Groverylogo_white.svg`
- Create: `public/logoGlyph.svg`

- [ ] **Step 1: Create public/icons directory and copy all needed icons**

```bash
mkdir -p public/icons public/fonts
cp ../tgwebsite3.0/public/icons/BrandPulse.svg public/icons/
cp ../tgwebsite3.0/public/icons/Greenhouse.svg public/icons/
cp ../tgwebsite3.0/public/icons/Strategy.svg public/icons/
cp ../tgwebsite3.0/public/icons/Alle.svg public/icons/
cp ../tgwebsite3.0/public/icons/Align.svg public/icons/
cp ../tgwebsite3.0/public/icons/Grow.svg public/icons/
cp ../tgwebsite3.0/public/icons/Fragment.svg public/icons/
```

- [ ] **Step 2: Copy logos**

```bash
cp ../tgwebsite3.0/public/Groverylogo_white.svg public/
cp ../tgwebsite3.0/public/logoGlyph.svg public/
```

- [ ] **Step 3: Copy fonts**

```bash
cp ../tgwebsite3.0/public/fonts/Inter-Medium.woff2 public/fonts/
cp ../tgwebsite3.0/public/fonts/Inter-Medium.woff public/fonts/
cp ../tgwebsite3.0/public/fonts/Inter-MediumItalic.woff2 public/fonts/
```

- [ ] **Step 4: Verify assets are in place**

```bash
ls public/ public/icons/ public/fonts/
```

Expected output includes: `Groverylogo_white.svg`, `logoGlyph.svg`, and all 7 icons, and 3 font files.

- [ ] **Step 5: Commit**

```bash
git add public/
git commit -m "feat: copy brand assets from tgwebsite3.0"
```

---

## Task 3: Types

**Files:**
- Create: `src/types/index.ts`
- Create: `src/__tests__/data.test.ts` (partial — data shape tests written here, data added in Task 5)

- [ ] **Step 1: Create src/types/index.ts**

```typescript
// src/types/index.ts

export type Mode = 'grid' | 'journey';
export type Theme = 'dark' | 'light';
export type StopId = 1 | 2 | 3 | 4 | 5;

export interface Tile {
  id: string;
  name: string;
  badge: 'Tool' | 'Process' | 'Output';
  tagline: string;
  description: string;
  detail: string;
  soWhat: string;
  color: string;
  icon: string;
  row: 0 | 1;
  journeyStop: StopId;
  featured?: boolean;
  screenshot?: string;
}

export interface JourneyStop {
  id: StopId;
  name: string;
  subtitle: string;
  description: string;
  soWhat: string;
  color: string;
  relatedTiles: string[];
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/
git commit -m "feat: add core TypeScript types"
```

---

## Task 4: Design Tokens & Global CSS

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace globals.css entirely**

```css
/* src/app/globals.css */
@import url("https://use.typekit.net/lvc5ndd.css");

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Medium.woff2') format('woff2'),
       url('/fonts/Inter-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-MediumItalic.woff2') format('woff2');
  font-weight: 500;
  font-style: italic;
  font-display: swap;
}

/* Dark mode (default) */
:root {
  --color-bg:       #06100C;
  --color-surface:  #0C1B14;
  --color-surface-2:#122018;
  --color-border:   rgba(255, 255, 255, 0.07);
  --color-text:     #E0EDE7;
  --color-muted:    rgba(224, 237, 231, 0.55);
  --color-primary:  #00C896;
  --topbar-bg:      rgba(6, 16, 12, 0.85);
}

/* Light mode */
html.light {
  --color-bg:       #F5F3EF;
  --color-surface:  #FFFFFF;
  --color-surface-2:#EEECE8;
  --color-border:   rgba(0, 0, 0, 0.07);
  --color-text:     #1B1B1C;
  --color-muted:    rgba(27, 27, 28, 0.55);
  --color-primary:  #00C896;
  --topbar-bg:      rgba(245, 243, 239, 0.85);
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

body {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
  transition: background 0.2s ease, color 0.2s ease;
  min-height: 100vh;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'degular', ui-sans-serif, system-ui, sans-serif;
  font-weight: 600;
}

img, svg {
  display: block;
  max-width: 100%;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}
```

- [ ] **Step 2: Update src/app/layout.tsx**

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grovery Launchpad',
  description: 'An interactive showcase of The Grovery\'s tools, process, and methodology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify dev server shows dark green-black background**

```bash
npm run dev
```

Open http://localhost:3000 — background should be `#06100C` (very dark green-black). Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: add design tokens and global CSS for dark/light mode"
```

---

## Task 5: ThemeContext

**Files:**
- Create: `src/context/ThemeContext.tsx`
- Create: `src/__tests__/ThemeContext.test.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// src/__tests__/ThemeContext.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';

function TestConsumer() {
  const { theme, toggle } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggle}>toggle</button>
    </div>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('light');
  });

  it('defaults to dark', () => {
    render(<ThemeProvider><TestConsumer /></ThemeProvider>);
    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('toggles to light on click', () => {
    render(<ThemeProvider><TestConsumer /></ThemeProvider>);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('theme')).toHaveTextContent('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('persists theme in localStorage', () => {
    render(<ThemeProvider><TestConsumer /></ThemeProvider>);
    fireEvent.click(screen.getByRole('button'));
    expect(localStorage.getItem('tg-launchpad-theme')).toBe('light');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest ThemeContext --no-coverage
```

Expected: FAIL — `Cannot find module '@/context/ThemeContext'`

- [ ] **Step 3: Create src/context/ThemeContext.tsx**

```typescript
// src/context/ThemeContext.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Theme } from '@/types';

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('tg-launchpad-theme') as Theme | null;
    if (saved === 'light') setTheme('light');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('tg-launchpad-theme', theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest ThemeContext --no-coverage
```

Expected: PASS — 3 tests passing

- [ ] **Step 5: Wrap layout.tsx with ThemeProvider**

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grovery Launchpad',
  description: 'An interactive showcase of The Grovery\'s tools, process, and methodology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add src/context/ src/__tests__/ThemeContext.test.tsx src/app/layout.tsx
git commit -m "feat: add ThemeContext with dark/light mode and localStorage persistence"
```

---

## Task 6: Content Data Files

**Files:**
- Create: `src/data/tiles.ts`
- Create: `src/data/journey.ts`
- Create: `src/__tests__/data.test.ts`

- [ ] **Step 1: Write the failing tests**

```typescript
// src/__tests__/data.test.ts
import { tiles } from '@/data/tiles';
import { journeyStops } from '@/data/journey';

describe('tiles data', () => {
  it('has exactly 8 tiles', () => {
    expect(tiles).toHaveLength(8);
  });

  it('each tile has required fields', () => {
    tiles.forEach((tile) => {
      expect(tile.id).toBeTruthy();
      expect(tile.name).toBeTruthy();
      expect(['Tool', 'Process', 'Output']).toContain(tile.badge);
      expect(tile.tagline).toBeTruthy();
      expect(tile.description).toBeTruthy();
      expect(tile.soWhat).toBeTruthy();
      expect(tile.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect([0, 1]).toContain(tile.row);
      expect([1, 2, 3, 4, 5]).toContain(tile.journeyStop);
    });
  });

  it('BrandPulse is marked as featured', () => {
    const bp = tiles.find((t) => t.id === 'brandpulse');
    expect(bp?.featured).toBe(true);
  });

  it('has 4 tiles in row 0 and 4 in row 1', () => {
    expect(tiles.filter((t) => t.row === 0)).toHaveLength(4);
    expect(tiles.filter((t) => t.row === 1)).toHaveLength(4);
  });
});

describe('journeyStops data', () => {
  it('has exactly 5 stops', () => {
    expect(journeyStops).toHaveLength(5);
  });

  it('stop IDs are 1 through 5', () => {
    const ids = journeyStops.map((s) => s.id);
    expect(ids).toEqual([1, 2, 3, 4, 5]);
  });

  it('each stop has required fields', () => {
    journeyStops.forEach((stop) => {
      expect(stop.name).toBeTruthy();
      expect(stop.subtitle).toBeTruthy();
      expect(stop.description).toBeTruthy();
      expect(stop.soWhat).toBeTruthy();
      expect(stop.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(Array.isArray(stop.relatedTiles)).toBe(true);
    });
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx jest data.test --no-coverage
```

Expected: FAIL — `Cannot find module '@/data/tiles'`

- [ ] **Step 3: Create src/data/tiles.ts**

```typescript
// src/data/tiles.ts
import { Tile } from '@/types';

export const tiles: Tile[] = [
  {
    id: 'brandpulse',
    name: 'BrandPulse',
    badge: 'Tool',
    tagline: "Your brand's vital signs, in real time.",
    description: "BrandPulse is The Grovery's flagship brand intelligence tool. It tracks how your brand is performing across key dimensions — awareness, sentiment, preference, and loyalty — and surfaces the signals that matter before they become trends.",
    detail: "Built for brands that need more than a one-time survey, BrandPulse delivers continuous monitoring with a dashboard designed for decision-makers, not data scientists.",
    soWhat: "Know where your brand stands before your competitors know you moved.",
    color: '#53C2B4',
    icon: '/icons/BrandPulse.svg',
    row: 0,
    journeyStop: 4,
    featured: true,
  },
  {
    id: 'brandpulse-pro',
    name: 'BrandPulse Pro',
    badge: 'Tool',
    tagline: 'Deeper intelligence. Sharper decisions.',
    description: "BrandPulse Pro extends the flagship platform with advanced segmentation, competitive benchmarking, and predictive modeling. Built for brands that need to see around corners.",
    detail: "Where BrandPulse shows you where you are, BrandPulse Pro shows you where you're headed — and what to do about it.",
    soWhat: "Built for brands that need to see around corners.",
    color: '#5869FC',
    icon: '/icons/BrandPulse.svg',
    row: 0,
    journeyStop: 4,
  },
  {
    id: 'personifi',
    name: 'Personifi',
    badge: 'Tool',
    tagline: 'Know your audience. Really know them.',
    description: "Personifi is The Grovery's audience intelligence platform. It builds rich, research-backed personas grounded in real behavioral and attitudinal data — not assumptions.",
    detail: "Stop guessing who you're talking to. Personifi turns data into people you can actually design for.",
    soWhat: "Stop guessing who you're talking to. Start building for the real human.",
    color: '#7E69AB',
    icon: '/icons/Fragment.svg',
    row: 0,
    journeyStop: 4,
  },
  {
    id: 'alle',
    name: 'Allē',
    badge: 'Tool',
    tagline: 'Onboarding, elevated.',
    description: "Allē is The Grovery's knowledge management and onboarding platform. It gives teams instant access to the information they need, in the format they can actually use.",
    detail: "When your team can find what they need, they can do what they do best.",
    soWhat: "When your team can find what they need, they can do what they do best.",
    color: '#F97316',
    icon: '/icons/Alle.svg',
    row: 0,
    journeyStop: 4,
  },
  {
    id: 'discovery-greenhouse',
    name: 'Discovery Greenhouse',
    badge: 'Process',
    tagline: 'Plant the right questions.',
    description: "The Discovery Greenhouse is The Grovery's structured research and insight-gathering process. It's where we surface what's really going on before prescribing what to do about it.",
    detail: "A great discovery process ends with better questions, not just more data. The Greenhouse ensures every engagement starts with the clarity it needs.",
    soWhat: "The right question is worth more than ten smart answers.",
    color: '#89BC3E',
    icon: '/icons/Greenhouse.svg',
    row: 1,
    journeyStop: 2,
  },
  {
    id: 'workshops',
    name: 'Workshops',
    badge: 'Process',
    tagline: 'Alignment in action.',
    description: "The Grovery's workshop methodology is built to turn diverse stakeholder groups into aligned teams with shared direction. No death-by-sticky-note — just structured thinking that leads to decisions.",
    detail: "Every workshop ends with a clear output: a decision made, a priority set, or a path forward agreed upon.",
    soWhat: "A great workshop ends with decisions, not more questions.",
    color: '#004A61',
    icon: '/icons/Align.svg',
    row: 1,
    journeyStop: 3,
  },
  {
    id: 'strategy',
    name: 'Strategy',
    badge: 'Process',
    tagline: 'Where vision meets direction.',
    description: "The Grovery's strategy process translates insight into action. We don't hand you a document — we build a direction your whole organization can understand, believe in, and execute against.",
    detail: "Strategy at The Grovery is collaborative by design. We bring the frameworks, you bring the knowledge of your business. Together, you get a strategy you believe in.",
    soWhat: "We don't hand you a strategy. We help you own it.",
    color: '#037B98',
    icon: '/icons/Strategy.svg',
    row: 1,
    journeyStop: 3,
  },
  {
    id: 'workshop-outputs',
    name: 'Workshop Outputs',
    badge: 'Output',
    tagline: 'The artifact of alignment.',
    description: "Every Grovery engagement produces tangible, actionable outputs — frameworks, playbooks, roadmaps, and tools your team can use on day one.",
    detail: "These aren't decks that collect dust. They're working documents designed to move your team forward.",
    soWhat: "Work that gets done. Impact that gets measured.",
    color: '#F2C10E',
    icon: '/icons/Grow.svg',
    row: 1,
    journeyStop: 5,
  },
];
```

- [ ] **Step 4: Create src/data/journey.ts**

```typescript
// src/data/journey.ts
import { JourneyStop } from '@/types';

export const journeyStops: JourneyStop[] = [
  {
    id: 1,
    name: 'Empathy',
    subtitle: 'Where everything begins.',
    description: "Before we build anything, we listen. Empathy is the foundation of every Grovery engagement — understanding the humans, the context, and the real problem before reaching for a solution.",
    soWhat: "The best solutions start with the best understanding.",
    color: '#53C2B4',
    relatedTiles: [],
  },
  {
    id: 2,
    name: 'Discovery',
    subtitle: 'Surface what matters.',
    description: "Discovery is where listening becomes learning. We bring structure to the chaos of competing priorities, unclear data, and organizational assumptions — and we surface what actually matters.",
    soWhat: "Clarity before direction. Always.",
    color: '#89BC3E',
    relatedTiles: ['discovery-greenhouse'],
  },
  {
    id: 3,
    name: 'Strategy',
    subtitle: 'Align on direction.',
    description: "Strategy is where insight becomes direction. We translate what we've learned into a clear path forward — one your whole organization can understand, believe in, and execute against.",
    soWhat: "Direction your team can actually own.",
    color: '#037B98',
    relatedTiles: ['strategy', 'workshops'],
  },
  {
    id: 4,
    name: 'Activate',
    subtitle: 'Build. Deploy. Move.',
    description: "Activate is where strategy meets execution. This is where The Grovery's proprietary tools come to life — powering the research, the intelligence, and the infrastructure your brand needs to move.",
    soWhat: "Tools that work as hard as your team.",
    color: '#5869FC',
    relatedTiles: ['brandpulse', 'brandpulse-pro', 'personifi', 'alle'],
  },
  {
    id: 5,
    name: 'Impact',
    subtitle: 'Outcomes, not deliverables.',
    description: "Impact is how we measure everything. Not outputs — outcomes. Did the brand move? Did the team align? Did the tool deliver? We close every engagement with proof, not promises.",
    soWhat: "Work that gets done. Impact that gets measured.",
    color: '#F2C10E',
    relatedTiles: ['workshop-outputs'],
  },
];
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npx jest data.test --no-coverage
```

Expected: PASS — 7 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/data/ src/__tests__/data.test.ts
git commit -m "feat: add tile and journey stop content data"
```

---

## Task 7: TileCard Component

**Files:**
- Create: `src/components/TileCard.tsx`
- Create: `src/__tests__/TileCard.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// src/__tests__/TileCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TileCard from '@/components/TileCard';
import { tiles } from '@/data/tiles';

const tile = tiles[0]; // BrandPulse

describe('TileCard', () => {
  it('renders tile name', () => {
    render(<TileCard tile={tile} onOpen={() => {}} />);
    expect(screen.getByText('BrandPulse')).toBeInTheDocument();
  });

  it('renders badge', () => {
    render(<TileCard tile={tile} onOpen={() => {}} />);
    expect(screen.getByText('Tool')).toBeInTheDocument();
  });

  it('renders tagline', () => {
    render(<TileCard tile={tile} onOpen={() => {}} />);
    expect(screen.getByText(/vital signs/i)).toBeInTheDocument();
  });

  it('calls onOpen when clicked', () => {
    const onOpen = jest.fn();
    render(<TileCard tile={tile} onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onOpen).toHaveBeenCalledWith(tile);
  });

  it('shows Flagship badge for featured tile', () => {
    render(<TileCard tile={tile} onOpen={() => {}} />);
    expect(screen.getByText('Flagship')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest TileCard --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/TileCard'`

- [ ] **Step 3: Create src/components/TileCard.tsx**

```typescript
// src/components/TileCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tile } from '@/types';

interface TileCardProps {
  tile: Tile;
  onOpen: (tile: Tile) => void;
  index?: number;
}

export default function TileCard({ tile, onOpen, index = 0 }: TileCardProps) {
  const hex = tile.color;
  // Convert hex to rgb for rgba usage
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return (
    <motion.button
      onClick={() => onOpen(tile)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.06 }}
      whileHover={{ y: -5, boxShadow: `0 8px 32px rgba(${r},${g},${b},0.2)` }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: tile.featured ? `rgba(${r},${g},${b},0.06)` : 'var(--color-surface)',
        borderTop: tile.featured ? `4px solid ${tile.color}` : '4px solid transparent',
        border: `1px solid var(--color-border)`,
        borderTopColor: tile.featured ? tile.color : 'var(--color-border)',
      }}
      className="relative flex flex-col gap-3 p-6 rounded-2xl text-left w-full h-full min-h-[160px] transition-colors"
      aria-label={`Open ${tile.name} detail`}
    >
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full uppercase tracking-widest"
          style={{
            background: `rgba(${r},${g},${b},0.15)`,
            color: tile.color,
          }}
        >
          {tile.badge}
        </span>
        {tile.featured && (
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full uppercase tracking-widest"
            style={{
              background: `rgba(${r},${g},${b},0.15)`,
              color: tile.color,
            }}
          >
            Flagship
          </span>
        )}
      </div>

      {/* Icon */}
      <div className="flex-1 flex items-center justify-center">
        <Image
          src={tile.icon}
          alt={tile.name}
          width={48}
          height={48}
          style={{ filter: `drop-shadow(0 0 8px rgba(${r},${g},${b},0.4))` }}
        />
      </div>

      {/* Name & tagline */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>
          {tile.name}
        </h3>
        <p className="text-sm leading-snug" style={{ color: 'var(--color-muted)' }}>
          {tile.tagline}
        </p>
      </div>

      {/* SO WHAT prompt */}
      <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: tile.color }}>
        SO WHAT →
      </p>
    </motion.button>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest TileCard --no-coverage
```

Expected: PASS — 5 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/components/TileCard.tsx src/__tests__/TileCard.test.tsx
git commit -m "feat: add TileCard component"
```

---

## Task 8: GridMode Component

**Files:**
- Create: `src/components/GridMode.tsx`
- Create: `src/__tests__/GridMode.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// src/__tests__/GridMode.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import GridMode from '@/components/GridMode';

// Framer Motion mocks (animations don't run in jsdom)
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) =>
      <button onClick={onClick} {...rest}>{children}</button>,
    div: ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) =>
      <div {...rest}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('GridMode', () => {
  it('renders 8 tile cards', () => {
    render(<GridMode onTileOpen={() => {}} />);
    expect(screen.getAllByRole('button')).toHaveLength(8);
  });

  it('calls onTileOpen with the correct tile when a tile is clicked', () => {
    const onTileOpen = jest.fn();
    render(<GridMode onTileOpen={onTileOpen} />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(onTileOpen).toHaveBeenCalledWith(expect.objectContaining({ id: 'brandpulse' }));
  });

  it('renders BrandPulse as first tile', () => {
    render(<GridMode onTileOpen={() => {}} />);
    expect(screen.getByText('BrandPulse')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest GridMode --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/GridMode'`

- [ ] **Step 3: Create src/components/GridMode.tsx**

```typescript
// src/components/GridMode.tsx
'use client';

import { Tile } from '@/types';
import { tiles } from '@/data/tiles';
import TileCard from './TileCard';

interface GridModeProps {
  onTileOpen: (tile: Tile) => void;
}

export default function GridMode({ onTileOpen }: GridModeProps) {
  return (
    <div className="w-full h-full p-4 grid grid-cols-4 grid-rows-2 gap-4">
      {tiles.map((tile, i) => (
        <TileCard key={tile.id} tile={tile} onOpen={onTileOpen} index={i} />
      ))}
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest GridMode --no-coverage
```

Expected: PASS — 3 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/components/GridMode.tsx src/__tests__/GridMode.test.tsx
git commit -m "feat: add GridMode component with 4x2 tile grid"
```

---

## Task 9: TileModal Component

**Files:**
- Create: `src/components/TileModal.tsx`
- Create: `src/__tests__/TileModal.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// src/__tests__/TileModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import TileModal from '@/components/TileModal';
import { tiles } from '@/data/tiles';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) =>
      <div {...rest}>{children}</div>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const tile = tiles[0]; // BrandPulse

describe('TileModal', () => {
  it('renders nothing when tile is null', () => {
    const { container } = render(<TileModal tile={null} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders tile name when tile is provided', () => {
    render(<TileModal tile={tile} onClose={() => {}} />);
    expect(screen.getByText('BrandPulse')).toBeInTheDocument();
  });

  it('renders soWhat text', () => {
    render(<TileModal tile={tile} onClose={() => {}} />);
    expect(screen.getByText(/before your competitors/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<TileModal tile={tile} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<TileModal tile={tile} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest TileModal --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/TileModal'`

- [ ] **Step 3: Create src/components/TileModal.tsx**

```typescript
// src/components/TileModal.tsx
'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Tile } from '@/types';

interface TileModalProps {
  tile: Tile | null;
  onClose: () => void;
}

export default function TileModal({ tile, onClose }: TileModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const r = tile ? parseInt(tile.color.slice(1, 3), 16) : 0;
  const g = tile ? parseInt(tile.color.slice(3, 5), 16) : 0;
  const b = tile ? parseInt(tile.color.slice(5, 7), 16) : 0;

  return (
    <AnimatePresence>
      {tile && (
        <>
          {/* Backdrop */}
          <motion.div
            data-testid="modal-backdrop"
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(6,16,12,0.85)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={tile.name}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header strip */}
              <div
                className="px-8 py-6"
                style={{ background: `rgba(${r},${g},${b},0.15)` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: `rgba(${r},${g},${b},0.2)`, color: tile.color }}
                  >
                    {tile.badge}
                  </span>
                  <button
                    aria-label="Close modal"
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full transition-colors"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    ✕
                  </button>
                </div>
                <h2 className="text-3xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                  {tile.name}
                </h2>
                <p className="text-base italic" style={{ color: 'var(--color-muted)' }}>
                  {tile.tagline}
                </p>
              </div>

              {/* Body */}
              <div className="px-8 py-6 space-y-5">
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
                  {tile.description}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {tile.detail}
                </p>

                {/* SO WHAT block */}
                <div
                  className="rounded-xl p-5 mt-4"
                  style={{ background: `rgba(${r},${g},${b},0.08)`, border: `1px solid rgba(${r},${g},${b},0.2)` }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 inline-block"
                    style={{ background: `rgba(${r},${g},${b},0.2)`, color: tile.color }}
                  >
                    So What
                  </span>
                  <p className="text-base font-medium leading-snug" style={{ color: tile.color }}>
                    {tile.soWhat}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest TileModal --no-coverage
```

Expected: PASS — 5 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/components/TileModal.tsx src/__tests__/TileModal.test.tsx
git commit -m "feat: add TileModal full-screen overlay component"
```

---

## Task 10: Header Component

**Files:**
- Create: `src/components/Header.tsx`

- [ ] **Step 1: Create src/components/Header.tsx**

```typescript
// src/components/Header.tsx
'use client';

import Image from 'next/image';
import { Mode } from '@/types';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Header({ mode, onModeChange }: HeaderProps) {
  const { theme, toggle } = useTheme();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 h-20"
      style={{
        background: 'var(--topbar-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Logo */}
      <Image
        src="/Groverylogo_white.svg"
        alt="The Grovery"
        width={140}
        height={36}
        priority
      />

      {/* Tagline */}
      <p
        className="hidden md:block text-sm font-semibold tracking-widest uppercase"
        style={{ color: 'var(--color-muted)', fontFamily: 'degular, sans-serif' }}
      >
        Tools. Process. Proof.
      </p>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Mode toggle */}
        <div
          className="flex rounded-full p-1 gap-1"
          style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
        >
          {(['grid', 'journey'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-200"
              style={{
                background: mode === m ? 'var(--color-primary)' : 'transparent',
                color: mode === m ? '#06100C' : 'var(--color-muted)',
              }}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
          }}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: add Header with mode toggle and theme toggle"
```

---

## Task 11: IntroSplash Component

**Files:**
- Create: `src/components/IntroSplash.tsx`

- [ ] **Step 1: Create src/components/IntroSplash.tsx**

```typescript
// src/components/IntroSplash.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface IntroSplashProps {
  onDone: () => void;
}

export default function IntroSplash({ onDone }: IntroSplashProps) {
  const [visible, setVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 500);
    const autoTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 2500);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoTimer);
    };
  }, [onDone]);

  const handleSkip = () => {
    setVisible(false);
    setTimeout(onDone, 400);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'var(--color-bg)' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: 'easeIn' }}
        >
          {/* Logo glyph */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src="/logoGlyph.svg"
              alt="The Grovery"
              width={120}
              height={120}
              priority
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-6 text-xl md:text-2xl text-center px-8"
            style={{ fontFamily: 'degular, sans-serif', color: 'var(--color-text)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            What exactly does The Grovery do?
          </motion.p>

          {/* Skip button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                onClick={handleSkip}
                className="absolute bottom-8 right-8 text-sm px-4 py-2 rounded-full"
                style={{
                  color: 'var(--color-muted)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Skip →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/IntroSplash.tsx
git commit -m "feat: add IntroSplash component with auto-dismiss and skip"
```

---

## Task 12: Journey Components (JourneyNode, JourneyPath, RelatedTileCard, StopDetailPanel)

**Files:**
- Create: `src/components/JourneyNode.tsx`
- Create: `src/components/JourneyPath.tsx`
- Create: `src/components/RelatedTileCard.tsx`
- Create: `src/components/StopDetailPanel.tsx`

- [ ] **Step 1: Create src/components/JourneyNode.tsx**

```typescript
// src/components/JourneyNode.tsx
'use client';

import { motion } from 'framer-motion';
import { JourneyStop, StopId } from '@/types';

interface JourneyNodeProps {
  stop: JourneyStop;
  isActive: boolean;
  index: number;
  onClick: (id: StopId) => void;
  // Position on the SVG canvas
  x: number;
  y: number;
}

export default function JourneyNode({ stop, isActive, index, onClick, x, y }: JourneyNodeProps) {
  const r = parseInt(stop.color.slice(1, 3), 16);
  const g = parseInt(stop.color.slice(3, 5), 16);
  const b = parseInt(stop.color.slice(5, 7), 16);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(stop.id)}
      role="button"
      aria-label={`Journey stop ${stop.id}: ${stop.name}`}
    >
      {/* Glow ring when active */}
      {isActive && (
        <motion.circle
          cx={x}
          cy={y}
          r={28}
          fill="none"
          stroke={stop.color}
          strokeWidth={2}
          opacity={0.4}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.08, opacity: 0.4 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Main circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={20}
        fill={isActive ? stop.color : `rgba(${r},${g},${b},0.15)`}
        stroke={stop.color}
        strokeWidth={2}
        animate={{ scale: isActive ? 1.08 : 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Stop number */}
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontSize="13"
        fontWeight="700"
        fontFamily="degular, sans-serif"
        fill={isActive ? '#06100C' : stop.color}
      >
        {stop.id}
      </text>

      {/* Label */}
      <text
        x={x + (x < 200 ? -36 : 36)}
        y={y + 5}
        textAnchor={x < 200 ? 'end' : 'start'}
        fontSize="13"
        fontFamily="degular, sans-serif"
        fill={isActive ? stop.color : 'var(--color-text)'}
        fontWeight={isActive ? '700' : '400'}
      >
        {stop.name}
      </text>
    </motion.g>
  );
}
```

- [ ] **Step 2: Create src/components/JourneyPath.tsx**

The path uses 5 node positions in an S-curve across a 380×680 SVG viewBox. Nodes alternate left (x=80) and right (x=300) at evenly spaced y positions.

```typescript
// src/components/JourneyPath.tsx
'use client';

import { motion } from 'framer-motion';
import { JourneyStop, StopId } from '@/types';
import JourneyNode from './JourneyNode';

// Fixed positions for each stop on the SVG canvas
export const NODE_POSITIONS = [
  { x: 80,  y: 80  }, // Stop 1 — left
  { x: 300, y: 210 }, // Stop 2 — right
  { x: 80,  y: 340 }, // Stop 3 — left
  { x: 300, y: 470 }, // Stop 4 — right
  { x: 80,  y: 600 }, // Stop 5 — left
] as const;

// SVG path connecting all 5 nodes with cubic bezier curves
const PATH_D = `
  M 80,80
  C 80,145 300,145 300,210
  C 300,275 80,275 80,340
  C 80,405 300,405 300,470
  C 300,535 80,535 80,600
`.trim();

interface JourneyPathProps {
  stops: JourneyStop[];
  activeStop: StopId | null;
  tourActive: boolean;
  onStopClick: (id: StopId) => void;
}

export default function JourneyPath({ stops, activeStop, tourActive, onStopClick }: JourneyPathProps) {
  return (
    <svg
      viewBox="0 0 380 680"
      className="w-full h-full"
      aria-label="Grovery methodology journey"
    >
      {/* Background path (muted) */}
      <path
        d={PATH_D}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Colored segment per stop pair */}
      {stops.slice(0, -1).map((stop, i) => {
        const next = stops[i + 1];
        const from = NODE_POSITIONS[i];
        const to = NODE_POSITIONS[i + 1];
        const segmentPath = `M ${from.x},${from.y} C ${from.x},${(from.y + to.y) / 2} ${to.x},${(from.y + to.y) / 2} ${to.x},${to.y}`;
        const isActive = activeStop !== null && (stop.id <= activeStop);

        return (
          <motion.path
            key={stop.id}
            d={segmentPath}
            fill="none"
            stroke={isActive ? stop.color : 'transparent'}
            strokeWidth={3}
            strokeLinecap="round"
            animate={{ opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        );
      })}

      {/* Travel dot (guided tour) */}
      {tourActive && activeStop && (
        <motion.circle
          cx={NODE_POSITIONS[(activeStop - 1)].x}
          cy={NODE_POSITIONS[(activeStop - 1)].y}
          r={8}
          fill="var(--color-primary)"
          animate={{
            cx: NODE_POSITIONS[(activeStop - 1)].x,
            cy: NODE_POSITIONS[(activeStop - 1)].y,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      )}

      {/* Stop nodes */}
      {stops.map((stop, i) => (
        <JourneyNode
          key={stop.id}
          stop={stop}
          isActive={activeStop === stop.id}
          index={i}
          onClick={onStopClick}
          x={NODE_POSITIONS[i].x}
          y={NODE_POSITIONS[i].y}
        />
      ))}
    </svg>
  );
}
```

- [ ] **Step 3: Create src/components/RelatedTileCard.tsx**

```typescript
// src/components/RelatedTileCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tile } from '@/types';

interface RelatedTileCardProps {
  tile: Tile;
  onOpen: (tile: Tile) => void;
  index: number;
}

export default function RelatedTileCard({ tile, onOpen, index }: RelatedTileCardProps) {
  const r = parseInt(tile.color.slice(1, 3), 16);
  const g = parseInt(tile.color.slice(3, 5), 16);
  const b = parseInt(tile.color.slice(5, 7), 16);

  return (
    <motion.button
      onClick={() => onOpen(tile)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 p-3 rounded-xl text-left w-full transition-colors"
      style={{
        background: `rgba(${r},${g},${b},0.08)`,
        border: `1px solid rgba(${r},${g},${b},0.2)`,
      }}
      aria-label={`Open ${tile.name}`}
    >
      <Image src={tile.icon} alt={tile.name} width={28} height={28} />
      <div>
        <p className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
          {tile.name}
        </p>
        <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
          {tile.badge}
        </p>
      </div>
    </motion.button>
  );
}
```

- [ ] **Step 4: Create src/components/StopDetailPanel.tsx**

```typescript
// src/components/StopDetailPanel.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { JourneyStop, Tile, StopId } from '@/types';
import { tiles } from '@/data/tiles';
import RelatedTileCard from './RelatedTileCard';

interface StopDetailPanelProps {
  stop: JourneyStop | null;
  onTileOpen: (tile: Tile) => void;
}

export default function StopDetailPanel({ stop, onTileOpen }: StopDetailPanelProps) {
  const relatedTiles = stop
    ? tiles.filter((t) => stop.relatedTiles.includes(t.id))
    : [];

  return (
    <AnimatePresence mode="wait">
      {stop && (
        <motion.div
          key={stop.id}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex-1 overflow-y-auto p-6 space-y-5"
        >
          {/* Stop number + name */}
          <div>
            <span
              className="text-5xl font-bold block mb-1"
              style={{ color: stop.color, fontFamily: 'degular, sans-serif', opacity: 0.3 }}
            >
              {String(stop.id).padStart(2, '0')}
            </span>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)', fontFamily: 'degular, sans-serif' }}>
              {stop.name}
            </h2>
            <p className="text-base mt-1" style={{ color: stop.color }}>
              {stop.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
            {stop.description}
          </p>

          {/* SO WHAT */}
          <div
            className="rounded-xl p-4"
            style={{
              background: `rgba(${parseInt(stop.color.slice(1,3),16)},${parseInt(stop.color.slice(3,5),16)},${parseInt(stop.color.slice(5,7),16)},0.08)`,
              border: `1px solid rgba(${parseInt(stop.color.slice(1,3),16)},${parseInt(stop.color.slice(3,5),16)},${parseInt(stop.color.slice(5,7),16)},0.2)`,
            }}
          >
            <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: stop.color }}>
              So What
            </span>
            <p className="text-sm font-medium" style={{ color: stop.color }}>
              {stop.soWhat}
            </p>
          </div>

          {/* Related tiles */}
          {relatedTiles.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--color-muted)' }}>
                Related Tools
              </p>
              <div className="flex flex-col gap-2">
                {relatedTiles.map((tile, i) => (
                  <RelatedTileCard key={tile.id} tile={tile} onOpen={onTileOpen} index={i} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 5: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/JourneyNode.tsx src/components/JourneyPath.tsx src/components/RelatedTileCard.tsx src/components/StopDetailPanel.tsx
git commit -m "feat: add journey path, nodes, stop detail panel, and related tile cards"
```

---

## Task 13: JourneyMode Component

**Files:**
- Create: `src/components/JourneyMode.tsx`
- Create: `src/__tests__/JourneyMode.test.tsx`

- [ ] **Step 1: Write the failing test**

```typescript
// src/__tests__/JourneyMode.test.tsx
import { render, screen, fireEvent, act } from '@testing-library/react';
import JourneyMode from '@/components/JourneyMode';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...rest }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) =>
      <div {...rest}>{children}</div>,
    g: ({ children, onClick, ...rest }: React.SVGProps<SVGGElement> & { children: React.ReactNode }) =>
      <g onClick={onClick} {...rest}>{children}</g>,
    circle: (props: React.SVGProps<SVGCircleElement>) => <circle {...props} />,
    path: (props: React.SVGProps<SVGPathElement>) => <path {...props} />,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('JourneyMode', () => {
  it('renders all 5 journey stops', () => {
    render(<JourneyMode onTileOpen={() => {}} />);
    expect(screen.getByLabelText(/stop 1/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/stop 5/i)).toBeInTheDocument();
  });

  it('shows Guided Tour button by default', () => {
    render(<JourneyMode onTileOpen={() => {}} />);
    expect(screen.getByText(/guided tour/i)).toBeInTheDocument();
  });

  it('shows stop detail when a stop node is clicked', () => {
    render(<JourneyMode onTileOpen={() => {}} />);
    fireEvent.click(screen.getByLabelText(/stop 1/i));
    expect(screen.getByText('Empathy')).toBeInTheDocument();
  });

  it('shows Stop Tour button when tour is activated', () => {
    render(<JourneyMode onTileOpen={() => {}} />);
    fireEvent.click(screen.getByText(/guided tour/i));
    expect(screen.getByText(/stop tour/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest JourneyMode --no-coverage
```

Expected: FAIL — `Cannot find module '@/components/JourneyMode'`

- [ ] **Step 3: Create src/components/JourneyMode.tsx**

```typescript
// src/components/JourneyMode.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tile, StopId } from '@/types';
import { journeyStops } from '@/data/journey';
import JourneyPath from './JourneyPath';
import StopDetailPanel from './StopDetailPanel';

interface JourneyModeProps {
  onTileOpen: (tile: Tile) => void;
}

const TOUR_DWELL_MS = 3200;

export default function JourneyMode({ onTileOpen }: JourneyModeProps) {
  const [activeStop, setActiveStop] = useState<StopId | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const tourRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTour = useCallback(() => {
    setTourActive(false);
    if (tourRef.current) {
      clearInterval(tourRef.current);
      tourRef.current = null;
    }
  }, []);

  const startTour = useCallback(() => {
    setTourActive(true);
    setActiveStop(1);
    let current = 1;
    tourRef.current = setInterval(() => {
      current += 1;
      if (current > 5) {
        stopTour();
        return;
      }
      setActiveStop(current as StopId);
    }, TOUR_DWELL_MS);
  }, [stopTour]);

  useEffect(() => {
    return () => {
      if (tourRef.current) clearInterval(tourRef.current);
    };
  }, []);

  const handleStopClick = (id: StopId) => {
    if (tourActive) stopTour();
    setActiveStop(id);
  };

  const activeStopData = journeyStops.find((s) => s.id === activeStop) ?? null;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* Path column */}
      <div className="relative lg:w-2/5 flex-shrink-0 flex items-center justify-center p-6">
        <div className="w-full max-w-xs h-full max-h-[680px]">
          <JourneyPath
            stops={journeyStops}
            activeStop={activeStop}
            tourActive={tourActive}
            onStopClick={handleStopClick}
          />
        </div>

        {/* Angled separator (desktop only) */}
        <div
          className="hidden lg:block absolute top-0 right-0 w-px h-full"
          style={{ background: 'var(--color-border)' }}
        />
      </div>

      {/* Detail column */}
      <div className="lg:w-3/5 flex flex-col overflow-hidden">
        {/* Placeholder when no stop selected */}
        <AnimatePresence>
          {!activeStop && (
            <motion.div
              className="flex-1 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-center text-lg" style={{ color: 'var(--color-muted)', fontFamily: 'degular, sans-serif' }}>
                Select a stop to explore the journey,<br />or start the Guided Tour.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <StopDetailPanel stop={activeStopData} onTileOpen={onTileOpen} />

        {/* Guided tour button */}
        <div className="p-6 flex justify-center">
          <button
            onClick={tourActive ? stopTour : startTour}
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: tourActive ? 'var(--color-surface-2)' : 'var(--color-primary)',
              color: tourActive ? 'var(--color-text)' : '#06100C',
              border: '1px solid var(--color-border)',
            }}
          >
            {tourActive ? 'Stop Tour' : '▶  Guided Tour'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx jest JourneyMode --no-coverage
```

Expected: PASS — 4 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/components/JourneyMode.tsx src/__tests__/JourneyMode.test.tsx
git commit -m "feat: add JourneyMode with guided tour and stop detail panel"
```

---

## Task 14: LaunchpadApp Root Page — Final Wiring

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace src/app/page.tsx with the wired root component**

```typescript
// src/app/page.tsx
'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mode, Tile } from '@/types';
import Header from '@/components/Header';
import IntroSplash from '@/components/IntroSplash';
import GridMode from '@/components/GridMode';
import JourneyMode from '@/components/JourneyMode';
import TileModal from '@/components/TileModal';

export default function LaunchpadApp() {
  const [splashDone, setSplashDone] = useState(false);
  const [mode, setMode] = useState<Mode>('grid');
  const [activeModal, setActiveModal] = useState<Tile | null>(null);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Intro splash */}
      {!splashDone && <IntroSplash onDone={() => setSplashDone(true)} />}

      {/* Header */}
      <Header mode={mode} onModeChange={setMode} />

      {/* Content area — below header */}
      <div className="pt-20 h-screen">
        <AnimatePresence mode="wait">
          {mode === 'grid' ? (
            <motion.div
              key="grid"
              className="h-full"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <GridMode onTileOpen={setActiveModal} />
            </motion.div>
          ) : (
            <motion.div
              key="journey"
              className="h-full"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <JourneyMode onTileOpen={setActiveModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal — root level, z-index safe */}
      <TileModal tile={activeModal} onClose={() => setActiveModal(null)} />
    </main>
  );
}
```

- [ ] **Step 2: Run full test suite**

```bash
npx jest --no-coverage
```

Expected: All tests passing.

- [ ] **Step 3: Start dev server and do a visual check**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Intro splash shows with logo glyph and tagline, auto-dismisses
- Skip button appears after ~0.5s
- Grid Mode shows 8 tiles after splash
- Mode toggle switches to Journey Mode with slide animation
- Clicking a tile opens the modal
- Modal closes on ✕, outside click, and Escape
- Theme toggle switches between dark and light
- Journey stops are clickable and show detail panel
- Guided Tour button starts auto-advance through stops

Stop server.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire LaunchpadApp root page — all modes and modal connected"
```

---

## Task 15: Responsive Polish

**Files:**
- Modify: `src/components/GridMode.tsx`
- Modify: `src/components/JourneyMode.tsx`
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Update GridMode for responsive grid**

In `src/components/GridMode.tsx`, update the grid container className:

```typescript
// Change this line:
<div className="w-full h-full p-4 grid grid-cols-4 grid-rows-2 gap-4">

// To this:
<div className="w-full h-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr gap-4 overflow-y-auto">
```

- [ ] **Step 2: Update Header to hide tagline on small screens**

The tagline already has `hidden md:block` — verify this is present in `src/components/Header.tsx`. If missing, add `hidden md:block` to the tagline `<p>` element.

- [ ] **Step 3: Verify JourneyMode mobile layout**

Open http://localhost:3000 and resize browser to mobile width (375px). Verify:
- Journey path column stacks above detail panel
- Both sections are scrollable
- Nodes are tappable at 48px+ target size

```bash
npm run dev
```

Manually resize browser and check all breakpoints: 375px, 768px, 1280px, 1920px. Stop server.

- [ ] **Step 4: Run full test suite to confirm no regressions**

```bash
npx jest --no-coverage
```

Expected: All tests passing.

- [ ] **Step 5: Commit**

```bash
git add src/components/GridMode.tsx src/components/Header.tsx
git commit -m "feat: responsive grid and header polish for mobile/tablet"
```

---

## Task 16: Build Check & Final Verification

**Files:** None — verification only.

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run ESLint**

```bash
npm run lint
```

Expected: No errors (warnings acceptable).

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build completes successfully. Note any warnings but do not fail on them.

- [ ] **Step 4: Run the built app and do final smoke test**

```bash
npm run start
```

Open http://localhost:3000 and verify:
- Splash intro shows and dismisses
- Grid Mode renders 8 tiles
- Each tile opens the correct modal
- Journey Mode shows all 5 stops with the S-curve path
- Guided Tour auto-advances and stops at step 5
- Light mode looks correct (warm off-white background, dark text)
- Dark mode looks correct (deep green-black background, light text)
- Theme persists on page refresh (localStorage)
- No console errors

Stop server.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "feat: Grovery Launchpad V1 complete — grid, journey, modal, guided tour, dark/light mode"
```

---

## Self-Review Notes

**Spec coverage check:**
- ✅ Intro splash with auto-dismiss and skip (Task 11)
- ✅ Dark/light mode with ThemeContext (Task 5)
- ✅ Branded header with logo, tagline, mode toggle, theme toggle (Task 10)
- ✅ 4×2 tile grid with staggered animation (Tasks 7-8)
- ✅ BrandPulse flagship treatment (Task 7)
- ✅ TileModal with SO WHAT block, Escape/click-outside dismiss (Task 9)
- ✅ Journey mode S-curve SVG path (Task 12)
- ✅ Journey nodes with active state glow (Task 12)
- ✅ Stop detail panel with slide-up animation (Task 12)
- ✅ Related tile mini-cards in stop panel (Task 12)
- ✅ Guided Tour auto-advance with travel dot (Task 13)
- ✅ AnimatePresence mode transitions (Task 14)
- ✅ Responsive grid: 1-col mobile, 2-col tablet, 4-col desktop (Task 15)
- ✅ All 8 tiles with correct brand colors (Task 6)
- ✅ All 5 journey stops with relatedTiles (Task 6)
- ✅ Brand fonts: Degular via Typekit, Inter via local woff2 (Task 4)
- ✅ Brand icons copied from tgwebsite3.0 (Task 2)
