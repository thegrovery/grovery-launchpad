'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { JourneyStop, Tile } from '@/types';
import { tiles } from '@/data/tiles';
import RelatedTileCard from './RelatedTileCard';

interface StopDetailPanelProps {
  stop: JourneyStop | null;
  onTileOpen: (tile: Tile) => void;
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export default function StopDetailPanel({ stop, onTileOpen }: StopDetailPanelProps) {
  const relatedTiles = stop
    ? tiles.filter((t) => stop.relatedTiles.includes(t.id))
    : [];

  return (
    <AnimatePresence mode="wait">
      {stop && (
        <motion.div
          key={stop.id}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="flex-1 overflow-y-auto p-6 space-y-5"
        >
          {/* Stop number + name */}
          <div>
            <span
              className="text-5xl font-bold block mb-1"
              style={{
                color: stop.color,
                fontFamily: 'degular, sans-serif',
                opacity: 0.3,
              }}
            >
              {String(stop.id).padStart(2, '0')}
            </span>
            <h2
              className="text-3xl font-bold"
              style={{ color: 'var(--color-text)', fontFamily: 'degular, sans-serif' }}
            >
              {stop.name}
            </h2>
            <p className="text-base mt-1" style={{ color: stop.color }}>
              {stop.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
            {stop.description}
          </p>

          {/* SO WHAT */}
          {(() => {
            const [r, g, b] = hexToRgb(stop.color);
            return (
              <div
                className="rounded-xl p-4"
                style={{
                  background: `rgba(${r},${g},${b},0.08)`,
                  border: `1px solid rgba(${r},${g},${b},0.2)`,
                }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest block mb-2"
                  style={{ color: stop.color }}
                >
                  So What
                </span>
                <p className="text-sm font-semibold" style={{ color: stop.color }}>
                  {stop.soWhat}
                </p>
              </div>
            );
          })()}

          {/* Related tiles */}
          {relatedTiles.length > 0 && (
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--color-muted)' }}
              >
                Related Tools
              </p>
              <div className="flex flex-col gap-2">
                {relatedTiles.map((tile, i) => (
                  <RelatedTileCard key={tile.id} tile={tile} onOpen={onTileOpen} index={i} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
