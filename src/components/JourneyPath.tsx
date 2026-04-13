'use client';

import { motion } from 'framer-motion';
import { JourneyStop, StopId } from '@/types';
import JourneyNode from './JourneyNode';

// Fixed node positions on the 380x480 SVG canvas
export const NODE_POSITIONS: readonly { x: number; y: number }[] = [
  { x: 80,  y: 100 }, // Stop 1 — Align (left)
  { x: 300, y: 300 }, // Stop 2 — Advise (right)
  { x: 80,  y: 500 }, // Stop 3 — Activate (left)
];

// S-curve cubic bezier connecting all 3 nodes
const PATH_D = `
  M 80,100
  C 80,200 300,200 300,300
  C 300,400 80,400 80,500
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
      viewBox="-60 -20 500 620"
      className="w-full h-full"
      aria-label="Grovery methodology journey path"
    >
      {/* Background path (muted) */}
      <path
        d={PATH_D}
        fill="none"
        stroke="var(--color-border)"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Colored segment per stop pair (highlights visited path) */}
      {stops.slice(0, -1).map((stop, i) => {
        const from = NODE_POSITIONS[i];
        const to = NODE_POSITIONS[i + 1];
        const mid = (from.y + to.y) / 2;
        const segPath = `M ${from.x},${from.y} C ${from.x},${mid} ${to.x},${mid} ${to.x},${to.y}`;
        const isHighlighted = activeStop !== null && stop.id <= activeStop;

        return (
          <motion.path
            key={stop.id}
            d={segPath}
            fill="none"
            stroke={stop.color}
            strokeWidth={3}
            strokeLinecap="round"
            animate={{ opacity: isHighlighted ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        );
      })}

      {/* Travel dot — visible during guided tour */}
      {tourActive && activeStop && (
        <motion.circle
          r={8}
          fill="var(--color-primary)"
          animate={{
            cx: NODE_POSITIONS[activeStop - 1].x,
            cy: NODE_POSITIONS[activeStop - 1].y,
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
