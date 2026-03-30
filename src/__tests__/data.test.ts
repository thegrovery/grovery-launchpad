import { tiles } from '@/data/tiles';
import { journeyStops } from '@/data/journey';

describe('tiles data', () => {
  it('has exactly 8 tiles', () => {
    expect(tiles).toHaveLength(8);
  });

  it('each tile has required fields', () => {
    tiles.forEach((tile) => {
      expect(tile.id).toBeTruthy();
      expect(tile.name).toBeTruthy();
      expect(['Tool', 'Process', 'Output']).toContain(tile.badge);
      expect(tile.tagline).toBeTruthy();
      expect(tile.description).toBeTruthy();
      expect(tile.soWhat).toBeTruthy();
      expect(tile.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect([0, 1]).toContain(tile.row);
      expect([1, 2, 3, 4, 5]).toContain(tile.journeyStop);
    });
  });

  it('BrandPulse is marked as featured', () => {
    const bp = tiles.find((t) => t.id === 'brandpulse');
    expect(bp?.featured).toBe(true);
  });

  it('has 4 tiles in row 0 and 4 in row 1', () => {
    expect(tiles.filter((t) => t.row === 0)).toHaveLength(4);
    expect(tiles.filter((t) => t.row === 1)).toHaveLength(4);
  });
});

describe('journeyStops data', () => {
  it('has exactly 5 stops', () => {
    expect(journeyStops).toHaveLength(5);
  });

  it('stop IDs are 1 through 5', () => {
    const ids = journeyStops.map((s) => s.id);
    expect(ids).toEqual([1, 2, 3, 4, 5]);
  });

  it('each stop has required fields', () => {
    journeyStops.forEach((stop) => {
      expect(stop.name).toBeTruthy();
      expect(stop.subtitle).toBeTruthy();
      expect(stop.description).toBeTruthy();
      expect(stop.soWhat).toBeTruthy();
      expect(stop.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(Array.isArray(stop.relatedTiles)).toBe(true);
    });
  });
});
