import { render, screen, fireEvent, act } from '@testing-library/react';
import JourneyMode from '@/components/JourneyMode';

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, style, className }: any) => <div style={style} className={className}>{children}</div>,
    button: ({ children, onClick, style, className, 'aria-label': ariaLabel }: any) => (
      <button onClick={onClick} style={style} className={className} aria-label={ariaLabel}>{children}</button>
    ),
    g: ({ children, onClick, role, 'aria-label': ariaLabel, style }: any) => (
      <g onClick={onClick} role={role} aria-label={ariaLabel} style={style}>{children}</g>
    ),
    circle: ({ cx, cy, r, fill, stroke, strokeWidth, animate }: any) => (
      <circle cx={cx || animate?.cx} cy={cy || animate?.cy} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    ),
    path: ({ d, fill, stroke, strokeWidth, strokeLinecap }: any) => (
      <path d={d} fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} />
    ),
    p: ({ children, style, className }: any) => <p style={style} className={className}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

describe('JourneyMode', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all 5 journey stop nodes', () => {
    render(<JourneyMode onTileOpen={() => {}} />);
    expect(screen.getByRole('button', { name: /stop 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /stop 5/i })).toBeInTheDocument();
  });

  it('shows Guided Tour button by default', () => {
    render(<JourneyMode onTileOpen={() => {}} />);
    expect(screen.getByText(/guided tour/i)).toBeInTheDocument();
  });

  it('shows stop detail when a stop node is clicked', () => {
    render(<JourneyMode onTileOpen={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /stop 1/i }));
    // Stop name appears in both SVG label and detail panel heading — check detail panel subtitle
    expect(screen.getByText(/Where everything begins/i)).toBeInTheDocument();
  });

  it('shows Stop Tour button when tour is activated', () => {
    render(<JourneyMode onTileOpen={() => {}} />);
    fireEvent.click(screen.getByText(/guided tour/i));
    expect(screen.getByText(/stop tour/i)).toBeInTheDocument();
  });

  it('auto-advances to stop 2 after 3200ms when tour is active', () => {
    render(<JourneyMode onTileOpen={() => {}} />);
    fireEvent.click(screen.getByText(/guided tour/i));
    // After tour starts at stop 1, check its subtitle
    expect(screen.getByText(/Where everything begins/i)).toBeInTheDocument();
    act(() => { jest.advanceTimersByTime(3200); });
    // Stop 2 detail shows
    expect(screen.getByText(/Surface what matters/i)).toBeInTheDocument();
  });
});
