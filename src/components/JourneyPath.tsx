'use client';

import { motion } from 'framer-motion';
import { JourneyStop, StopId } from '@/types';
import JourneyNode from './JourneyNode';

// Fixed node positions on the 380x680 SVG canvas
export const NODE_POSITIONS: readonly { x: number; y: number }[] = [
  { x: 80,  y: 80  }, // Stop 1 — left
  { x: 300, y: 210 }, // Stop 2 — right
  { x: 80,  y: 340 }, // Stop 3 — left
  { x: 300, y: 470 }, // Stop 4 — right
  { x: 80,  y: 600 }, // Stop 5 — left
];

// S-curve cubic bezier connecting all 5 nodes
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
