'use client';

import Image from 'next/image';
import { Mode } from '@/types';
import { useTheme } from '@/context/ThemeContext';

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
        src="/Groverylogo_white.svg"
        alt="The Grovery"
        width={140}
        height={36}
        priority
      />

      {/* Tagline */}
      <p
        className="hidden md:block text-sm font-semibold tracking-widest uppercase"
        style={{ color: 'var(--color-muted)', fontFamily: 'degular, sans-serif' }}
      >
        Tools. Process. Proof.
      </p>

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
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
}
