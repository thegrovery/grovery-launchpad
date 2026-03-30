'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface IntroSplashProps {
  onDone: () => void;
}

export default function IntroSplash({ onDone }: IntroSplashProps) {
  const [visible, setVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const skipTimer = setTimeout(() => setShowSkip(true), 500);
    const autoTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 2500);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoTimer);
    };
  }, [onDone]);

  const handleSkip = () => {
    setVisible(false);
    setTimeout(onDone, 400);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'var(--color-bg)' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.4, ease: 'easeIn' }}
        >
          {/* Logo glyph */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <Image
              src="/logoGlyph.svg"
              alt="The Grovery"
              width={120}
              height={120}
              priority
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-6 text-xl md:text-2xl text-center px-8"
            style={{ fontFamily: 'degular, sans-serif', color: 'var(--color-text)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            What exactly does The Grovery do?
          </motion.p>

          {/* Skip button */}
          <AnimatePresence>
            {showSkip && (
              <motion.button
                onClick={handleSkip}
                className="absolute bottom-8 right-8 text-sm px-4 py-2 rounded-full"
                style={{
                  color: 'var(--color-muted)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface)',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                Skip →
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
