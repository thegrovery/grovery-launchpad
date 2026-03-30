'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tile } from '@/types';

interface RelatedTileCardProps {
  tile: Tile;
  onOpen: (tile: Tile) => void;
  index: number;
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export default function RelatedTileCard({ tile, onOpen, index }: RelatedTileCardProps) {
  const [r, g, b] = hexToRgb(tile.color);

  return (
    <motion.div
      onClick={() => onOpen(tile)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(tile); }}
      className="flex items-center gap-3 p-3 rounded-xl text-left w-full cursor-pointer"
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
    </motion.div>
  );
}
