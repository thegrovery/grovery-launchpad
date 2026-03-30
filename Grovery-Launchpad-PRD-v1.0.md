

**THE GROVERY**

Product Requirements Document

**Grovery Launchpad**

An interactive, touchscreen-ready experience for showcasing The Grovery’s tools, process, and methodology — built for conferences, client presentations, and a guided web tour.

| VERSION 1.0 — Initial Draft DATE March 2026 | PRODUCT OWNER Scott Johnson, The Grovery PLATFORM Next.js — Web \+ Touchscreen TV |
| :---- | :---- |

**CONFIDENTIAL — INTERNAL USE ONLY**

**01  VISION & OPPORTUNITY**

## **The Problem We’re Solving**

The Grovery does work that is genuinely hard to explain in a 30-second elevator pitch. We’re not a traditional agency. We’re not a software company. We sit at the intersection of strategy, creative, and proprietary tooling — and that’s exactly where the explanation gets fuzzy.

The “So what?” question is the most important and the least answered. People want to know not just what we do, but what difference it makes. The Grovery Launchpad is built to answer that question — dynamically, engagingly, and unforgettably.

## **The Opportunity**

Conferences, partner onboarding sessions, new business pitches, and web discovery moments all share the same challenge: we have 60–120 seconds to make someone “get it.” The Launchpad is designed to use every second of that window.

## **Product Vision**

| VISION | *The Grovery Launchpad is a living, interactive showcase of how The Grovery works — our methodology, our tools, our process, and our proof. It lives on a large-screen touchscreen TV at conferences and as a guided web experience online. It’s the best answer we’ve ever given to the question: “So, what exactly does The Grovery do?”* |
| :---: | :---- |

## **Design Principles (Governing This Product)**

These principles govern every design and build decision for the Launchpad:

1. **Empathy first, features second —** Design for the person standing in front of a 75-inch screen who has 90 seconds of attention.

2. **SO WHAT over WHAT —** Every tile, every stop, every modal must answer the “So what?” before the meeting ends.

3. **Confidence without complexity —** The experience should feel impressive and effortless simultaneously.

4. **Touch-native, not touch-adapted —** Build for fingers on glass first. Mouse is a nice-to-have.

5. **Motion with meaning —** Animations communicate state and direction. No animation for decoration alone.

6. **The brand IS the product —** Every visual choice should feel unmistakably Grovery.

## **Success Metrics**

The Launchpad succeeds when:

* A new visitor can articulate what The Grovery does in one sentence after 60 seconds of exploration.

* A conference attendee engages with at least 3 tiles or journey stops per interaction.

* The Guided Tour completes without a user abandoning midway.

* Internal team members feel proud to pull it up in any room, with any audience.

* Prospects who interact with it can name at least one specific Grovery tool or phase by name.

**02  USE CASES & AUDIENCES**

## **Primary Use Cases**

### **01 — Conference & Event Touchscreen**

Deployed on a large-screen TV (55–85”) in a conference booth or exhibit space. Visitors can tap tiles to explore The Grovery’s tools and process. The Guided Tour auto-walks through the journey when unattended.

**Primary audience:** Conference attendees, prospects, partners at events like CX Summit.

**Key interaction:** Self-directed tile tapping \+ attended walk-through by a Grovery team member.

**Success state:** Visitor leaves knowing one specific tool or process by name and understands The Grovery’s “So what.”

### **02 — Web Experience with Guided Tour**

Hosted as a public-facing or link-accessible web experience. Visitors arrive from a QR code, email, or direct link. The Guided Tour mode provides a structured walk-through of The Grovery’s methodology.

**Primary audience:** Prospects exploring after a conversation, LinkedIn referrals, pre-meeting research.

**Key interaction:** Guided Tour auto-advance with optional manual exploration.

**Success state:** Visitor arrives at a scheduled discovery call already knowing the language of The Grovery.

### **03 — New Business & Pitch Support**

Used by Grovery team members in live meetings or on a shared screen to walk a prospective partner through the methodology and tools in a dynamic, non-linear way.

**Primary audience:** Prospective brand partners in discovery or pitch meetings.

**Key interaction:** Facilitated walk-through led by Grovery presenter.

**Success state:** Prospect sees the full picture of how The Grovery works, not just a static slide deck.

### **04 — Partner Onboarding Reference**

A living reference for new partners in the first 30–60 days of an engagement, helping them understand what phase they’re in and what tools are relevant to their current work.

**Primary audience:** New brand partners in onboarding phases 1–3.

**Key interaction:** Journey Mode navigation, linking to relevant tool deep-dives.

**Success state:** Partner can confidently orient themselves in the Grovery process without needing to ask.

**03  PRODUCT OVERVIEW**

## **What It Is**

The Grovery Launchpad is a full-screen, single-page web application built in Next.js. It operates in two primary modes that can be toggled at any time from the persistent header:

| ⊞  LAUNCHPAD MODE A grid of interactive tiles, one for each Grovery tool, process, and output. Tap any tile to open a full-detail modal with description, context, and SO WHAT. | ◎  JOURNEY MODE A winding gameboard-style path through The Grovery’s methodology: Empathy → Discovery → Strategy → Activate → Impact. Each stop expands with narrative and links to related tools. |
| :---- | :---- |

## **The Tile System**

Each tile represents one Grovery product, process, or output. The tile system is the core content architecture of the experience. Every tile has the following data structure:

| FIELD | TYPE | PURPOSE |
| :---- | :---- | :---- |
| **name** | *string* | Display name of the tile (e.g., “BrandPulse”) |
| **badge** | *string* | Category label (Tool / Process / Output) |
| **tagline** | *string* | One-line descriptor shown on the tile face |
| **description** | *string (short)* | 2–3 sentence overview in the modal |
| **detail** | *string (long)* | Deeper explanation for the modal |
| **soWhat** | *string* | The core value proposition — the “So what?” answer |
| **color** | *hex string* | Accent color for this tile’s visual identity |
| **journeyStop** | *number* | Which journey stop (1–5) this tile belongs to |
| **caseStudy** | *object (optional)* | Linked case study or proof point |

## **Current Tile Inventory**

The following tiles are defined for V1.0. Copy is placeholder-ready and should be refined with real Grovery messaging before launch.

| TILE | TAGLINE | SO WHAT |
| :---- | :---- | :---- |
| **BrandPulse** **Flagship Tool** | *Your brand’s vital signs, in real time.* | Know where your brand stands before your competitors know you moved. |
| **BrandPulse Pro** **Tool** | *Deeper intelligence. Sharper decisions.* | Built for brands that need to see around corners. |
| **Personifi** **Tool** | *Know your audience. Really know them.* | Stop guessing who you’re talking to. Start building for the real human. |
| **Allē** **Tool** | *Onboarding, elevated.* | When your team can find what they need, they can do what they do best. |
| **Discovery Greenhouse** **Process** | *Plant the right questions.* | The right question is worth more than ten smart answers. |
| **Workshops** **Process** | *Alignment in action.* | A great workshop ends with decisions, not more questions. |
| **Strategy** **Process** | *Where vision meets direction.* | We don’t hand you a strategy. We help you own it. |
| **Workshop Outputs** **Output** | *The artifact of alignment.* | Work that gets done. Impact that gets measured. |

OPEN: Add a “Our Work” or Case Studies tile in V1.1 as a 9th tile (see Section 7 — Future Phases).

**04  FEATURE REQUIREMENTS**

## **4.1 — Launchpad Mode (Grid View)**

### **Layout**

* 4-column, 2-row grid. All tiles equal size. Optimized for 16:9 aspect ratio at 1920×1080.

* Row 1 (Tools): BrandPulse, BrandPulse Pro, Personifi, Allē.

* Row 2 (Process/Output): Discovery Greenhouse, Workshops, Strategy, Workshop Outputs.

* Responsive: Collapses to 2-column on tablet, single-column on mobile.

* BrandPulse receives “Flagship” visual treatment: brighter gradient, featured accent corner.

### **Tile Interactions**

* Tap/click any tile → opens Modal Detail View (see 4.3).

* Hover state (desktop): tile lifts 5px with shadow and subtle border brightening.

* Active/press state: tile scales down to 0.97 for tactile feel on touchscreen.

* Tiles animate in on mount: staggered fade-up, 60ms delay between each tile.

* Each tile displays: category badge, icon, name, tagline, and “SO WHAT →” prompt.

### **Category Visual Identity**

* Tools row: cool tones (emerald, cyan, amber, violet).

* Process row: warm/vibrant tones (lime, pink, orange, indigo).

* Each tile’s color is used consistently across its badge, icon, accent glow, and modal header.

## **4.2 — Journey Mode (Gameboard View)**

### **The Path**

* 5 stops arranged in a winding arc path (not a linear row). Zigzag pattern with alternating heights creates a gameboard feel without the Candyland aesthetic.

* Stops connected by an SVG gradient path line using each stop’s color.

* An animated travel dot moves along the path during Guided Tour mode.

* Active stop’s connector segment is highlighted in that stop’s color.

### **Journey Stops**

| \# | STOP | SUBTITLE | RELATED TILES |
| :---- | :---- | :---- | :---- |
| **1** | Empathy | Where everything begins. | — |
| **2** | Discovery | Surface what matters. | Discovery Greenhouse |
| **3** | Strategy | Align on direction. | Strategy, Workshops |
| **4** | Activate | Build. Deploy. Move. | BrandPulse, BrandPulse Pro, Personifi, Allē |
| **5** | Impact | Outcomes, not deliverables. | Workshop Outputs |

### **Stop Detail Panel**

* Clicking a stop opens a detail panel below the gameboard path.

* Panel contains: stop number, name, subtitle, description, and SO WHAT callout.

* Related tiles appear as mini-cards below the stop narrative. Tapping any related tile opens its Modal Detail View.

* Panel animates in from below (slide-up, 0.25s ease).

## **4.3 — Guided Tour Mode**

Guided Tour is the auto-advance mode available in Journey view. It is the primary experience for unmanned conference booths and web-page introductions.

* A “Guided Tour” button is visible at the bottom of Journey Mode at all times.

* On activation: the tour starts at Stop 1 (Empathy) and auto-advances every 3.2 seconds.

* Each stop’s detail panel opens, reads, and closes as the tour moves forward.

* A travel animation dot traverses the gameboard path in sync with each advance.

* Tour stops can be clicked during touring to interrupt and stay on that stop.

* A “Stop Tour” button replaces the Guided Tour button while touring is active.

* V1.1: Add narration/voice-over support as an optional layer.

## **4.4 — Modal Detail View**

Triggered by tapping any tile (from Grid Mode or from a related tile in Journey Mode).

* Full-screen overlay with blur backdrop.

* Contains: category badge, title, tagline (italicized), description, detail copy, and SO WHAT callout block.

* Dismisses on: tap outside modal, tap ‘×’ close button, or Escape key.

* Entrance animation: slide-up scale-in, 0.28s ease.

* SO WHAT block uses a dedicated visual treatment: pill label \+ styled body text in tile’s color palette.

* V1.1: Add “Case Study” section to modals for tools with linked proof points.

**05  DESIGN SYSTEM**

## **Color Palette**

All colors are drawn from or inspired by The Grovery’s brand identity. The dark background palette signals sophistication and positions The Grovery as a premium, modern consultancy.

| TOKEN | VALUE | USAGE |
| :---- | :---- | :---- |
| \--color-bg | *\#06100C* | App background (very dark green-black) |
| \--color-surface | *\#0C1B14* | Card and modal surfaces |
| \--color-surface-2 | *\#122018* | Hover/active states on surfaces |
| \--color-primary | *\#00C896* | Grovery green — BrandPulse, CTA, headings |
| \--color-text | *\#E0EDE7* | Primary text (off-white green tint) |
| \--color-muted | *rgba(224,237,231,0.55)* | Secondary descriptive text |
| \--color-border | *rgba(255,255,255,0.07)* | Subtle borders on surfaces |
| \--color-tile-\* | *Per-tile hex* | Each tile has a unique accent color |

## **Typography**

Typography defaults to the system stack for performance, but the design should be refined with The Grovery’s brand typefaces during production build.

* Display / Hero: \[TBD — Grovery brand typeface\] — Headings, tile names, stop numbers

* Body: System-UI stack (SF Pro / Segoe UI) — Descriptions, modal copy, labels

* Mono: Used sparingly for version numbers, codes, technical identifiers

* Letter-spacing: ‒0.02em on large headings. \+0.08–0.14em on uppercase labels.

## **Motion & Animation**

All animation follows The Grovery’s principle of motion with meaning: every animation communicates state, not decoration.

| ANIMATION | SPEC |
| :---- | :---- |
| Tile mount | fadeIn: translateY(14px) → 0, opacity 0 → 1\. 0.45s ease. 60ms stagger. |
| Tile hover | translateY(−5px) \+ box-shadow. 0.18s ease. |
| Modal entrance | slideUp: translateY(28px) scale(0.97) → default. 0.28s ease. |
| Journey stop select | Node scale 1 → 1.08 \+ glow ring. 0.3s ease. |
| Detail panel | slideUp: translateY(28px) → 0\. 0.25s ease. |
| Tour travel dot | Stroke-dashoffset animation along SVG path. 3s linear infinite. |
| Guided tour advance | 3.2s dwell per stop. Immediate transition to next. |

## **Touch & Accessibility**

* Minimum touch target: 48px × 48px on all interactive elements.

* No hover-only states: all interactions must also work on tap.

* Color contrast: all text meets WCAG AA minimum (4.5:1) against its background.

* Keyboard navigation: all tiles and stops must be reachable by Tab and activatable by Enter/Space.

* Focus indicators: visible, branded (green ring), and present on all interactive elements.

* Reduced-motion: respect prefers-reduced-motion by disabling non-essential animations.

**06  TECHNICAL ARCHITECTURE**

## **Technology Stack**

| LAYER | TECHNOLOGY | RATIONALE |
| :---- | :---- | :---- |
| Framework | **Next.js 14+ (App Router)** | SEO-ready, SSR for fast first paint, Vercel-native deployment |
| Language | **TypeScript** | Type safety across content schema, component props, and state |
| Styling | **Tailwind CSS \+ CSS custom properties** | Utility-first \+ design token system for Grovery brand consistency |
| State | **React useState / useReducer** | Lightweight — no external store needed for V1 |
| Animation | **Framer Motion** | Production-grade animation with accessibility respects (useReducedMotion) |
| Content | **Flat TypeScript data files** | Content can be updated without a CMS for V1; upgrade to Contentful/Sanity in V2 |
| Deployment | **Vercel** | Instant preview deploys, edge CDN, zero-config with Next.js |
| Analytics | **Vercel Analytics or Plausible** | Privacy-friendly, lightweight interaction tracking |

## **Component Architecture**

The Launchpad is built as a single-page application with a shallow, component-based architecture. No routing is required for V1 — all state is managed in the root component.

### **Component Tree**

* \<LaunchpadApp\> — Root. Owns mode state, modal state.

*   \<Header\> — Branding, mode toggle, tagline.

*   \<GridMode\> — Renders tile grid. Receives onTileClick.

*     \<TileCard\> — Individual tile. Accepts tile data as props.

*   \<JourneyMode\> — Renders gameboard path \+ detail panel. Owns active stop and tour state.

*     \<JourneyPath\> — SVG canvas for path line and travel animation.

*     \<JourneyNode\> — Individual stop circle \+ label.

*     \<StopDetailPanel\> — Animated detail area below the path.

*     \<RelatedTileCard\> — Compact tile card used inside journey stop details.

*   \<TileModal\> — Full-screen overlay. Rendered at root level to avoid z-index issues.

## **Content Schema (TypeScript)**

All tile and journey data is typed. The content schema is defined once and reused across components:

interface Tile {    id: string;    name: string;    badge: 'Tool' | 'Process' | 'Output';    tagline: string;    description: string;    detail: string;    soWhat: string;    color: string;    dim: string;    border: string;    icon: string;    row: 0 | 1;    journeyStop: 1 | 2 | 3 | 4 | 5;    featured?: boolean;    caseStudy?: CaseStudy;  }

## **Performance Requirements**

* First Contentful Paint (FCP): \< 1.2s on a standard conference wi-fi connection.

* Time to Interactive (TTI): \< 2.0s.

* All tile content and journey data should be bundled (no lazy-loaded critical data).

* Animations must not cause layout shift or jank on the target TV hardware.

* Target hardware: Any modern Chromebox, Apple TV web browser, or laptop HDMI to TV at 1080p or 4K.

## **Deployment & Environments**

* Production: thegrovery.com/launchpad (or standalone subdomain: launchpad.thegrovery.com)

* Conference mode: Can be loaded as a PWA or Chrome fullscreen kiosk on a Chromebox.

* Preview: Vercel preview URL for each PR. Share links with team before any public deployment.

* Local dev: npm run dev — standard Next.js local development.

**07  FUTURE PHASES**

## **V1.0 — Conference MVP (Build Now)**

* Grid Mode (8 tiles)

* Journey Mode (5 stops, gameboard path)

* Guided Tour (auto-advance, travel animation)

* Modal Detail View for all tiles

* Touch-optimized for large-screen TV

* Responsive for desktop web

* Deployed on Vercel

## **V1.1 — Content Depth**

* Case Studies linked from relevant tile modals (BrandPulse, Personifi, Allē)

* “Our Work” 9th tile with curated proof points

* Real Grovery brand typefaces \+ finalized design tokens

* Micro-copy review and approval from leadership

* QR code integration — single tap to pull up web version on phone from conference TV

## **V1.2 — Narration & Rich Media**

* Optional voice narration track for Guided Tour (text-to-speech or recorded)

* Short motion video or animated loop per tile (15–20s hero moment)

* Subtle ambient background animation on the gameboard path (living terrain feel)

## **V2.0 — CMS & Personalization**

* Move tile \+ journey content to a headless CMS (Contentful or Sanity)

* Partner-specific versions: custom tiles and journey stops for specific client contexts

* Analytics dashboard: heatmap of most-tapped tiles, most-completed tours

* Session-based personalization: return visitor sees “continue where you left off”

* Embed mode: Single-tile or single-stop embed for use in proposal decks or email

## **V3.0 — Full Digital Experience Platform**

* Expand into a full The Grovery digital brand hub

* Partner portal integration: logged-in view shows partner’s current Grovery journey stage

* Integration with BrandPulse data: live brand health preview in the tile

* Conference mode with real-time interaction capture: “47 people engaged with BrandPulse today”

**08  OPEN QUESTIONS & NEXT STEPS**

## **Open Questions**

### **Content & Messaging**

* What is the approved SO WHAT copy for each tile? (Current copy is placeholder — needs leadership sign-off)

* Does “Allē” refer to the product name as-is, or is there a preferred brand treatment?

* Which case studies are cleared for inclusion in tile modals in V1.1?

* Is “Discovery Greenhouse” the approved name, or is it “Greenhouse Discovery”?

### **Design**

* What are The Grovery’s official brand typefaces? Do we have web font licenses?

* Are there existing approved icon sets or should we define new ones for each tile?

* Is the dark background palette approved? Some use cases (e.g., printed materials) may need a light variant.

* Does each tool have existing visual identity (logos, icons) that should be used on tiles?

### **Technical**

* Should the Launchpad live at thegrovery.com/launchpad or a standalone subdomain?

* Is there a preferred Grovery web infrastructure (hosting, CI/CD, CMS) the build should plug into?

* Should this be open-source / public repo or private?

### **Launch**

* What is the target conference or event for V1.0 debut?

* Who is the internal team responsible for maintaining tile copy after launch?

* Is there a QA/review process we should build into the timeline?

## **Recommended Next Steps**

7. Design kickoff: Align on brand typefaces, finalize color tokens, define official icon set.

8. Copy sprint: Workshop to finalize taglines, descriptions, and SO WHAT copy for all 8 tiles.

9. Tech setup: Scaffold Next.js 14 project with Tailwind, TypeScript, Framer Motion, and Vercel connection.

10. Component build: Build TileCard, GridMode, JourneyNode, StopDetailPanel, and TileModal in Storybook or similar.

11. Content integration: Wire live copy into components and review on target TV hardware.

12. Internal review: Full team walk-through on a conference TV before any public deployment.

13. Soft launch: Deploy to Vercel preview, share with leadership for feedback.

14. V1.0 production deploy: Target event date — TBD.

| TIMELINE NOTE | *The HTML prototype already exists and demonstrates the full V1.0 feature set with placeholder content. The Next.js build is primarily a production-quality rebuild with Grovery design tokens, real copy, brand fonts, and deployment infrastructure. Estimated build time: 2–3 weeks for a focused Next.js developer with this PRD.* |
| :---: | :---- |

