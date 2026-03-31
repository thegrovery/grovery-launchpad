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
    relatedTiles: ['discovery-greenhouse', 'brandpulse', 'brandpulse-pro', 'personagen'],
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
    relatedTiles: ['brandpulse', 'brandpulse-pro', 'personifi', 'personagen', 'alle'],
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
