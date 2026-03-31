'use client';

import { ComponentType, SVGProps } from 'react';
import { motion } from 'framer-motion';
import { Tile } from '@/types';
import {
  BrandPulseIcon,
  FragmentIcon,
  AlleIcon,
  GreenhouseIcon,
  AlignIcon,
  StrategyIcon,
  GrowIcon,
  AISparkleIcon,
  BrandHubIcon,
  AlignmentStrategyIcon,
} from '@/components/icons/TileIcons';

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

const ICON_MAP: Record<string, SvgIcon> = {
  '/icons/BrandPulse.svg': BrandPulseIcon,
  '/icons/Fragment.svg': FragmentIcon,
  '/icons/Alle.svg': AlleIcon,
  '/icons/Greenhouse.svg': GreenhouseIcon,
  '/icons/Align.svg': AlignIcon,
  '/icons/Strategy.svg': StrategyIcon,
  '/icons/Grow.svg': GrowIcon,
  '/icons/AISparkle.svg': AISparkleIcon,
  '/icons/BrandHub.svg': BrandHubIcon,
  '/icons/AlignmentStrategy.svg': AlignmentStrategyIcon,
};

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
    <motion.button
      onClick={() => onOpen(tile)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="flex items-center gap-3 p-3 rounded-xl text-left w-full"
      style={{
        background: `rgba(${r},${g},${b},0.08)`,
        border: `1px solid rgba(${r},${g},${b},0.2)`,
      }}
      aria-label={`Open ${tile.name}`}
    >
      {(() => {
        const Icon = ICON_MAP[tile.icon];
        return Icon ? (
          <Icon width={28} height={28} style={{ color: tile.color, flexShrink: 0 }} />
        ) : null;
      })()}
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
