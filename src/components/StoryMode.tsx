'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { storySlides } from '@/data/story';
import StoryCard from './StoryCard';

const SWIPE_THRESHOLD = 80;
const VELOCITY_THRESHOLD = 500;

const slideVariants = {
  enter: (d: number) => ({ opacity: 0, x: d > 0 ? 200 : -200 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d > 0 ? -200 : 200 }),
};

export default function StoryMode() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback(
    (dir: number) => {
      const next = index + dir;
      if (next < 0 || next >= storySlides.length) return;
      setDirection(dir);
      setIndex(next);
    },
    [index],
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (
      Math.abs(info.offset.x) > SWIPE_THRESHOLD ||
      Math.abs(info.velocity.x) > VELOCITY_THRESHOLD
    ) {
      paginate(info.offset.x > 0 ? -1 : 1);
    }
  };

  const slide = storySlides[index];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 gap-6 overflow-hidden">
      {/* Card area */}
      <div className="relative w-full max-w-3xl flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <StoryCard slide={slide} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 flex-shrink-0 pb-2">
        {/* Prev */}
        <button
          onClick={() => paginate(-1)}
          disabled={index === 0}
          className="w-12 h-12 flex items-center justify-center rounded-full transition-all"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            color: index === 0 ? 'var(--color-border)' : 'var(--color-text)',
            opacity: index === 0 ? 0.4 : 1,
          }}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {storySlides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className="p-2"
              aria-label={`Go to slide ${i + 1}`}
            >
              <motion.div
                className="rounded-full"
                animate={{
                  width: i === index ? 24 : 10,
                  height: 10,
                  background: i === index ? slide.accent : 'var(--color-border)',
                }}
                transition={{ duration: 0.25 }}
              />
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => paginate(1)}
          disabled={index === storySlides.length - 1}
          className="w-12 h-12 flex items-center justify-center rounded-full transition-all"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            color: index === storySlides.length - 1 ? 'var(--color-border)' : 'var(--color-text)',
            opacity: index === storySlides.length - 1 ? 0.4 : 1,
          }}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
