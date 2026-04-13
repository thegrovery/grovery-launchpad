'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tile, StopId } from '@/types';
import { journeyStops } from '@/data/journey';
import JourneyPath from './JourneyPath';
import StopDetailPanel from './StopDetailPanel';

interface JourneyModeProps {
  onTileOpen: (tile: Tile) => void;
}

const TOUR_DWELL_MS = 3200;

export default function JourneyMode({ onTileOpen }: JourneyModeProps) {
  const [activeStop, setActiveStop] = useState<StopId | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const tourRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTour = useCallback(() => {
    setTourActive(false);
    if (tourRef.current) {
      clearInterval(tourRef.current);
      tourRef.current = null;
    }
  }, []);

  const startTour = useCallback(() => {
    setTourActive(true);
    setActiveStop(1);
    let current = 1;
    tourRef.current = setInterval(() => {
      current += 1;
      if (current > 3) {
        stopTour();
        return;
      }
      setActiveStop(current as StopId);
    }, TOUR_DWELL_MS);
  }, [stopTour]);

  useEffect(() => {
    return () => {
      if (tourRef.current) clearInterval(tourRef.current);
    };
  }, []);

  const handleStopClick = (id: StopId) => {
    if (tourActive) stopTour();
    setActiveStop(id);
  };

  const activeStopData = journeyStops.find((s) => s.id === activeStop) ?? null;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row">
      {/* Path column */}
      <div
        className="relative lg:w-1/2 flex-shrink-0 flex items-center justify-center p-6"
        style={{ borderRight: '1px solid var(--color-border)' }}
      >
        <div className="w-full h-full">
          <JourneyPath
            stops={journeyStops}
            activeStop={activeStop}
            tourActive={tourActive}
            onStopClick={handleStopClick}
          />
        </div>
      </div>

      {/* Detail column */}
      <div className="lg:w-1/2 flex flex-col overflow-hidden">
        {/* Placeholder when no stop selected */}
        <AnimatePresence>
          {!activeStop && (
            <motion.p
              className="flex-1 flex items-center justify-center p-8 text-center text-lg"
              style={{ color: 'var(--color-muted)', fontFamily: 'degular, sans-serif' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Select a stop to explore the journey,<br />or launch the tour below.
            </motion.p>
          )}
        </AnimatePresence>

        <StopDetailPanel stop={activeStopData} onTileOpen={onTileOpen} />

        {/* Guided Tour button */}
        <div className="p-6 flex justify-center flex-shrink-0">
          <button
            onClick={tourActive ? stopTour : startTour}
            className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{
              background: tourActive ? 'var(--color-surface-2)' : 'var(--color-primary)',
              color: tourActive ? 'var(--color-text)' : '#06100C',
              border: '1px solid var(--color-border)',
            }}
          >
            {tourActive ? 'Stop Tour' : '▶  Guided Tour'}
          </button>
        </div>
      </div>
    </div>
  );
}
