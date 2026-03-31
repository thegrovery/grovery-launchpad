'use client';

import { Tile } from '@/types';
import { tiles } from '@/data/tiles';
import TileCard from './TileCard';

interface GridModeProps {
  onTileOpen: (tile: Tile) => void;
}

export default function GridMode({ onTileOpen }: GridModeProps) {
  return (
    <div className="w-full h-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 auto-rows-fr gap-4 overflow-y-auto">
      {tiles.map((tile, i) => (
        <TileCard key={tile.id} tile={tile} onOpen={onTileOpen} index={i} />
      ))}
    </div>
  );
}
