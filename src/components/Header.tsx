'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Mode } from '@/types';
import { useTheme } from '@/context/ThemeContext';

const TAGLINES = [
  ['Tools.', 'Process.', 'Proof.'],
  ['Align.', 'Advise.', 'Activate.'],
  ['Internal Alignment.', 'External Impact.'],
  ['Turn Misalignment', 'into Momentum.'],
];

const wordVariants = {
  initial: { opacity: 0, y: 7, filter: 'blur(4px)' },
  enter: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.25, 0.1, 0.25, 1] as const } },
  exit: { opacity: 0, y: -5, filter: 'blur(2px)', transition: { duration: 0.18, ease: 'easeIn' as const } },
};

function AnimatedTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % TAGLINES.length), 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden md:flex items-center h-5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="flex gap-2 text-sm font-semibold tracking-widest uppercase whitespace-nowrap"
          style={{ color: 'var(--color-muted)', fontFamily: 'degular, sans-serif' }}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{ enter: { transition: { staggerChildren: 0.13 } }, exit: { transition: { staggerChildren: 0.07, staggerDirection: -1 } } }}
        >
          {TAGLINES[index].map((chunk, i) => (
            <motion.span key={i} variants={wordVariants}>
              {chunk}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

interface HeaderProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

export default function Header({ mode, onModeChange }: HeaderProps) {
  const { theme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-8 h-20"
      style={{
        background: 'var(--topbar-bg)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* Logo */}
      <Image
        src={mounted && theme === 'light' ? '/Groverylogo_fullcolor.svg' : '/Groverylogo_white.svg'}
        alt="The Grovery"
        width={140}
        height={36}
        priority
      />

      {/* Tagline */}
      <AnimatedTagline />

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Mode toggle */}
        <div
          className="flex rounded-full p-1 gap-1"
          style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}
        >
          {(['grid', 'journey'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-200"
              style={{
                background: mode === m ? 'var(--color-primary)' : 'transparent',
                color: mode === m ? '#06100C' : 'var(--color-muted)',
              }}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label="Toggle theme"
          className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
          style={{
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
          }}
        >
          {mounted && theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
}
