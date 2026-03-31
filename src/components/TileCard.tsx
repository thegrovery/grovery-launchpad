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
};

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
      whileHover={{
        y: -6,
        boxShadow: tile.featured
          ? `0 0 0 1px rgba(${r},${g},${b},0.6), 0 12px 48px rgba(${r},${g},${b},0.28), 0 0 80px rgba(${r},${g},${b},0.12)`
          : `0 8px 32px rgba(${r},${g},${b},0.18), 0 0 0 1px rgba(255,255,255,0.1)`,
      }}
      whileTap={{ scale: 0.97 }}
      style={{
        background: tile.featured
          ? `rgba(${r},${g},${b},0.07)`
          : 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: tile.featured
          ? `1px solid rgba(${r},${g},${b},0.45)`
          : '1px solid rgba(255,255,255,0.09)',
        boxShadow: tile.featured
          ? `0 0 0 1px rgba(${r},${g},${b},0.2), inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 24px rgba(${r},${g},${b},0.15)`
          : 'inset 0 1px 0 rgba(255,255,255,0.07), 0 2px 12px rgba(0,0,0,0.3)',
      }}
      className="relative flex flex-col gap-3 p-6 rounded-2xl text-left w-full h-full min-h-[160px] overflow-hidden"
      aria-label={`Open ${tile.name} detail`}
    >
      {/* Flagship ambient bloom */}
      {tile.featured && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, rgba(${r},${g},${b},0.14) 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Inner top highlight */}
      <div
        className="absolute top-0 left-4 right-4 h-px pointer-events-none"
        style={{
          background: tile.featured
            ? `linear-gradient(90deg, transparent, rgba(${r},${g},${b},0.7), transparent)`
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
        }}
      />

      {/* Badges */}
      <div className="relative flex items-center gap-2 flex-wrap">
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
      <div className="relative flex-1 flex items-center justify-center">
        {(() => {
          const Icon = ICON_MAP[tile.icon];
          return Icon ? (
            <Icon
              width={100}
              height={100}
              style={{
                color: tile.color,
                filter: `drop-shadow(0 0 10px rgba(${r},${g},${b},0.5))`,
              }}
            />
          ) : null;
        })()}
      </div>

      {/* Name & tagline */}
      <div className="relative space-y-1">
        <h3 className="text-2xl font-medium tracking-tighter" style={{ color: 'var(--color-text)', fontFamily: 'degular, sans-serif' }}>
          {tile.name}
        </h3>
        <p className="text-sm leading-snug" style={{ color: 'var(--color-muted)' }}>
          {tile.tagline}
        </p>
      </div>

      {/* SO WHAT prompt */}
      <p className="relative text-xs font-bold uppercase tracking-wider" style={{ color: tile.color }}>
        SO WHAT →
      </p>
    </motion.button>
  );
}
