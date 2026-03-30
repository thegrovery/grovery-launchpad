'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tile } from '@/types';

interface TileCardProps {
  tile: Tile;
  onOpen: (tile: Tile) => void;
  index?: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

export default function TileCard({ tile, onOpen, index = 0 }: TileCardProps) {
  const [r, g, b] = hexToRgb(tile.color);

  return (
    <motion.button
      onClick={() => onOpen(tile)}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.06 }}
      whileHover={{ y: -5, boxShadow: `0 8px 32px rgba(${r},${g},${b},0.2)` }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: tile.featured
          ? `rgba(${r},${g},${b},0.06)`
          : 'var(--color-surface)',
        borderTop: `4px solid ${tile.featured ? tile.color : 'transparent'}`,
        border: `1px solid var(--color-border)`,
        borderTopColor: tile.featured ? tile.color : 'var(--color-border)',
      }}
      className="relative flex flex-col gap-3 p-6 rounded-2xl text-left w-full h-full min-h-[160px]"
      aria-label={`Open ${tile.name} detail`}
    >
      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest"
          style={{
            background: `rgba(${r},${g},${b},0.15)`,
            color: tile.color,
          }}
        >
          {tile.badge}
        </span>
        {tile.featured && (
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full uppercase tracking-widest"
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
      <p className="text-xs font-bold uppercase tracking-wider" style={{ color: tile.color }}>
        SO WHAT →
      </p>
    </motion.button>
  );
}
