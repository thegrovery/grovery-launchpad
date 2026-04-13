import { JourneyStop } from '@/types';

export const journeyStops: JourneyStop[] = [
  {
    id: 1,
    name: 'Align',
    subtitle: 'Build the foundation.',
    description: "Before we create anything, we align. Brand health analysis, stakeholder workshops, competitive exploration, persona buildouts, journey mapping — we bring structure and shared understanding so your entire organization is moving in the same direction.",
    soWhat: "Alignment isn't a phase — it's the foundation everything else is built on.",
    color: '#53C2B4',
    relatedTiles: ['discovery-greenhouse', 'workshops', 'strategy', 'workshop-outputs'],
  },
  {
    id: 2,
    name: 'Advise',
    subtitle: 'Shape the strategy.',
    description: "Advise is where insight becomes action. Creative campaigns, content strategy, audience engagement, media planning, CRM development — we translate alignment into a clear, executable plan across every channel that matters.",
    soWhat: "Strategy without execution is a slide deck. We build plans that move.",
    color: '#037B98',
    relatedTiles: ['brandpulse', 'personifi'],
  },
  {
    id: 3,
    name: 'Activate',
    subtitle: 'Build. Deploy. Measure.',
    description: "Activate is where strategy meets technology. Software-powered experiences, websites, progressive web apps, platform integrations, analytics — The Grovery's proprietary tools and digital solutions bring your brand to life and keep it performing.",
    soWhat: "Tools that work as hard as your team — and prove it.",
    color: '#5869FC',
    relatedTiles: ['brandpulse', 'personifi', 'alle', 'our-work'],
  },
];
