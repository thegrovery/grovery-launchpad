'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mode, Tile } from '@/types';
import Header from '@/components/Header';
import IntroSplash from '@/components/IntroSplash';
import GridMode from '@/components/GridMode';
import JourneyMode from '@/components/JourneyMode';
import TileModal from '@/components/TileModal';

export default function LaunchpadApp() {
  const [splashDone, setSplashDone] = useState(false);
  const [mode, setMode] = useState<Mode>('grid');
  const [activeModal, setActiveModal] = useState<Tile | null>(null);

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Intro splash — shown until dismissed */}
      {!splashDone && <IntroSplash onDone={() => setSplashDone(true)} />}

      {/* Header — always visible */}
      <Header mode={mode} onModeChange={setMode} />

      {/* Content area — starts below fixed header, fills exact remaining viewport */}
      <div className="mt-20" style={{ height: 'calc(100vh - 5rem)' }}>
        <AnimatePresence mode="wait">
          {mode === 'grid' ? (
            <motion.div
              key="grid"
              className="h-full"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <GridMode onTileOpen={setActiveModal} />
            </motion.div>
          ) : (
            <motion.div
              key="journey"
              className="h-full"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            >
              <JourneyMode onTileOpen={setActiveModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal — root level, z-index safe */}
      <TileModal tile={activeModal} onClose={() => setActiveModal(null)} />
    </main>
  );
}
