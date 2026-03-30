import { render, screen, fireEvent } from '@testing-library/react';
import TileModal from '@/components/TileModal';
import { tiles } from '@/data/tiles';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, className, onClick, role, 'aria-modal': ariaModal, 'aria-label': ariaLabel, 'data-testid': testId }: any) => (
      <div style={style} className={className} onClick={onClick} role={role} aria-modal={ariaModal} aria-label={ariaLabel} data-testid={testId}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

const tile = tiles[0]; // BrandPulse

describe('TileModal', () => {
  it('renders nothing when tile is null', () => {
    const { container } = render(<TileModal tile={null} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders tile name when tile is provided', () => {
    render(<TileModal tile={tile} onClose={() => {}} />);
    expect(screen.getByText('BrandPulse')).toBeInTheDocument();
  });

  it('renders soWhat text', () => {
    render(<TileModal tile={tile} onClose={() => {}} />);
    expect(screen.getByText(/before your competitors/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<TileModal tile={tile} onClose={onClose} />);
    fireEvent.click(screen.getByLabelText('Close modal'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<TileModal tile={tile} onClose={onClose} />);
    fireEvent.click(screen.getByTestId('modal-backdrop'));
    expect(onClose).toHaveBeenCalled();
  });
});
