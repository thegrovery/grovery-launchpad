import { render, screen, fireEvent } from '@testing-library/react';
import TileCard from '@/components/TileCard';
import { tiles } from '@/data/tiles';

// Mock framer-motion to avoid animation issues in jsdom
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, whileHover, whileTap, initial, animate, transition, style, className, 'aria-label': ariaLabel }: any) => (
      <button onClick={onClick} style={style} className={className} aria-label={ariaLabel}>{children}</button>
    ),
  },
}));

const tile = tiles[0]; // BrandPulse — featured tile

describe('TileCard', () => {
  it('renders tile name', () => {
    render(<TileCard tile={tile} onOpen={() => {}} />);
    expect(screen.getByText('BrandPulse')).toBeInTheDocument();
  });

  it('renders badge', () => {
    render(<TileCard tile={tile} onOpen={() => {}} />);
    expect(screen.getByText('Tool')).toBeInTheDocument();
  });

  it('renders tagline', () => {
    render(<TileCard tile={tile} onOpen={() => {}} />);
    expect(screen.getByText(/vital signs/i)).toBeInTheDocument();
  });

  it('calls onOpen with the tile when clicked', () => {
    const onOpen = jest.fn();
    render(<TileCard tile={tile} onOpen={onOpen} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onOpen).toHaveBeenCalledWith(tile);
  });

  it('shows Flagship badge for featured tile', () => {
    render(<TileCard tile={tile} onOpen={() => {}} />);
    expect(screen.getByText('Flagship')).toBeInTheDocument();
  });

  it('does not show Flagship badge for non-featured tile', () => {
    render(<TileCard tile={tiles[1]} onOpen={() => {}} />); // BrandPulse Pro
    expect(screen.queryByText('Flagship')).not.toBeInTheDocument();
  });
});
