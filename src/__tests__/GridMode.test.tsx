import { render, screen, fireEvent } from '@testing-library/react';
import GridMode from '@/components/GridMode';

jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, style, className, 'aria-label': ariaLabel }: any) => (
      <button onClick={onClick} style={style} className={className} aria-label={ariaLabel}>{children}</button>
    ),
    div: ({ children, style, className }: any) => <div style={style} className={className}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe('GridMode', () => {
  it('renders 8 tile cards', () => {
    render(<GridMode onTileOpen={() => {}} />);
    // Each TileCard renders a button with aria-label "Open X detail"
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(8);
  });

  it('calls onTileOpen with the correct tile when first tile is clicked', () => {
    const onTileOpen = jest.fn();
    render(<GridMode onTileOpen={onTileOpen} />);
    fireEvent.click(screen.getByLabelText('Open BrandPulse detail'));
    expect(onTileOpen).toHaveBeenCalledWith(expect.objectContaining({ id: 'brandpulse' }));
  });

  it('renders BrandPulse as first tile', () => {
    render(<GridMode onTileOpen={() => {}} />);
    expect(screen.getByText('BrandPulse')).toBeInTheDocument();
  });

  it('renders all 8 tile names', () => {
    render(<GridMode onTileOpen={() => {}} />);
    expect(screen.getByText('BrandPulse Pro')).toBeInTheDocument();
    expect(screen.getByText('Personifi')).toBeInTheDocument();
    expect(screen.getByText('Allē')).toBeInTheDocument();
    expect(screen.getByText('Discovery Greenhouse')).toBeInTheDocument();
    expect(screen.getByText('Workshops')).toBeInTheDocument();
    expect(screen.getByText('Strategy')).toBeInTheDocument();
    expect(screen.getByText('Workshop Outputs')).toBeInTheDocument();
  });
});
