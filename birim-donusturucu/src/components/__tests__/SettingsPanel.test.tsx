import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsPanel, PrecisionSelector, Toggle } from '../SettingsPanel';

describe('PrecisionSelector', () => {
  const mockOnChange = vi.fn();

  it('renders all precision options', () => {
    render(<PrecisionSelector precision={4} onPrecisionChange={mockOnChange} />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('highlights selected precision', () => {
    render(<PrecisionSelector precision={4} onPrecisionChange={mockOnChange} />);
    const selectedButton = screen.getByText('4');
    expect(selectedButton).toHaveClass('bg-[#11505a]');
  });

  it('calls onPrecisionChange when precision button clicked', () => {
    render(<PrecisionSelector precision={4} onPrecisionChange={mockOnChange} />);
    fireEvent.click(screen.getByText('8'));
    expect(mockOnChange).toHaveBeenCalledWith(8);
  });
});

describe('Toggle', () => {
  const mockOnChange = vi.fn();

  it('renders label', () => {
    render(<Toggle label="Test Toggle" checked={false} onChange={mockOnChange} />);
    expect(screen.getByText('Test Toggle')).toBeInTheDocument();
  });

  it('shows checked state', () => {
    render(<Toggle label="Test Toggle" checked={true} onChange={mockOnChange} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('shows unchecked state', () => {
    render(<Toggle label="Test Toggle" checked={false} onChange={mockOnChange} />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('calls onChange when clicked', () => {
    render(<Toggle label="Test Toggle" checked={false} onChange={mockOnChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });
});

describe('SettingsPanel', () => {
  const mockOnPrecisionChange = vi.fn();
  const mockOnAutoCopyChange = vi.fn();

  const defaultProps = {
    precision: 4,
    onPrecisionChange: mockOnPrecisionChange,
    autoCopy: true,
    onAutoCopyChange: mockOnAutoCopyChange,
  };

  it('renders Ayarlar heading', () => {
    render(<SettingsPanel {...defaultProps} />);
    expect(screen.getByText('Ayarlar')).toBeInTheDocument();
  });

  it('renders Hassasiyet Kademesi label', () => {
    render(<SettingsPanel {...defaultProps} />);
    expect(screen.getByText('Hassasiyet Kademesi')).toBeInTheDocument();
  });

  it('renders Bilimsel Gösterim toggle', () => {
    render(<SettingsPanel {...defaultProps} />);
    expect(screen.getByText('Bilimsel Gösterim')).toBeInTheDocument();
  });

  it('renders Otomatik Kopyala toggle', () => {
    render(<SettingsPanel {...defaultProps} />);
    expect(screen.getByText('Otomatik Kopyala')).toBeInTheDocument();
  });

  it('reflects autoCopy state in toggle', () => {
    render(<SettingsPanel {...defaultProps} />);
    const toggle = screen.getAllByRole('switch').find(
      el => el.parentElement?.textContent?.includes('Otomatik Kopyala')
    );
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });
});
