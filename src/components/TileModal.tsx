'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tile } from '@/types';

interface TileModalProps {
  tile: Tile | null;
  onClose: () => void;
}

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

export default function TileModal({ tile, onClose }: TileModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const rgb = tile ? hexToRgb(tile.color) : [0, 0, 0];
  const [r, g, b] = rgb;

  return (
    <AnimatePresence>
      {tile && (
        <>
          {/* Backdrop */}
          <motion.div
            data-testid="modal-backdrop"
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(6,16,12,0.85)', backdropFilter: 'blur(12px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={tile.name}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header strip */}
              <div className="px-8 py-6" style={{ background: `rgba(${r},${g},${b},0.15)` }}>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: `rgba(${r},${g},${b},0.2)`, color: tile.color }}
                  >
                    {tile.badge}
                  </span>
                  <button
                    aria-label="Close modal"
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-sm"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    ✕
                  </button>
                </div>
                <h2 className="text-5xl font-medium tracking-tighter mb-1" style={{ color: 'var(--color-text)', fontFamily: 'degular, sans-serif' }}>
                  {tile.name}
                </h2>
                <p className="text-base italic" style={{ color: 'var(--color-muted)' }}>
                  {tile.tagline}
                </p>
              </div>

              {/* Body */}
              <div className="px-8 py-6 space-y-5">
                <p className="text-base leading-relaxed" style={{ color: 'var(--color-text)' }}>
                  {tile.description}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
                  {tile.detail}
                </p>

                {/* SO WHAT block */}
                <div
                  className="rounded-xl p-5"
                  style={{
                    background: `rgba(${r},${g},${b},0.08)`,
                    border: `1px solid rgba(${r},${g},${b},0.2)`,
                  }}
                >
                  <span
                    className="text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 inline-block"
                    style={{ background: `rgba(${r},${g},${b},0.2)`, color: tile.color }}
                  >
                    So What
                  </span>
                  <p className="text-base font-semibold leading-snug" style={{ color: tile.color }}>
                    {tile.soWhat}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
