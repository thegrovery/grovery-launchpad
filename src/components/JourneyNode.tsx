'use client';

import { motion } from 'framer-motion';
import { JourneyStop, StopId } from '@/types';

interface JourneyNodeProps {
  stop: JourneyStop;
  isActive: boolean;
  index: number;
  onClick: (id: StopId) => void;
  x: number;
  y: number;
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export default function JourneyNode({ stop, isActive, index, onClick, x, y }: JourneyNodeProps) {
  const [r, g, b] = hexToRgb(stop.color);

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1.08 }}
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

      {/* Label — positioned left or right based on x position */}
      <text
        x={x < 200 ? x - 30 : x + 30}
        y={y + 5}
        textAnchor={x < 200 ? 'end' : 'start'}
        fontSize="13"
        fontFamily="degular, sans-serif"
        fill={isActive ? stop.color : 'currentColor'}
        fontWeight={isActive ? '700' : '400'}
      >
        {stop.name}
      </text>
    </motion.g>
  );
}
