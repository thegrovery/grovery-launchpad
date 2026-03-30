// src/types/index.ts

export type Mode = 'grid' | 'journey';
export type Theme = 'dark' | 'light';
export type StopId = 1 | 2 | 3 | 4 | 5;

export interface Tile {
  id: string;
  name: string;
  badge: 'Tool' | 'Process' | 'Output';
  tagline: string;
  description: string;
  detail: string;
  soWhat: string;
  color: string;
  icon: string;
  row: 0 | 1;
  journeyStop: StopId;
  featured?: boolean;
  screenshot?: string;
}

export interface JourneyStop {
  id: StopId;
  name: string;
  subtitle: string;
  description: string;
  soWhat: string;
  color: string;
  relatedTiles: string[];
}
