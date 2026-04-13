'use client';

import { StorySlide } from '@/types';

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
}

interface StoryCardProps {
  slide: StorySlide;
}

export default function StoryCard({ slide }: StoryCardProps) {
  const [r, g, b] = hexToRgb(slide.accent);

  return (
    <div
      className="w-full h-full rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.09)',
      }}
    >
      {/* Accent top bar */}
      <div className="h-1.5 w-full" style={{ background: slide.accent }} />

      {/* Content */}
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center gap-5 overflow-y-auto">
        {/* Title */}
        <div>
          <h2
            className="text-4xl md:text-5xl font-medium tracking-tight"
            style={{ color: 'var(--color-text)', fontFamily: 'degular, sans-serif' }}
          >
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p
              className="text-lg mt-2"
              style={{ color: slide.accent, fontFamily: 'degular, sans-serif' }}
            >
              {slide.subtitle}
            </p>
          )}
        </div>

        {/* Body */}
        <p
          className="text-base md:text-lg leading-relaxed max-w-2xl"
          style={{ color: 'var(--color-text)', opacity: 0.85 }}
        >
          {slide.body}
        </p>

        {/* Bullets */}
        {slide.bullets && slide.bullets.length > 0 && (
          <div
            className="rounded-xl p-5 mt-2 space-y-3"
            style={{
              background: `rgba(${r},${g},${b},0.06)`,
              border: `1px solid rgba(${r},${g},${b},0.15)`,
            }}
          >
            {slide.bullets.map((bullet, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ background: slide.accent }}
                />
                <p
                  className="text-sm md:text-base leading-relaxed"
                  style={{ color: 'var(--color-text)', opacity: 0.8 }}
                >
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
