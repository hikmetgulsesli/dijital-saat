import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ControlPanel } from '../ControlPanel';
import type { Unit } from '@/hooks/useConverter';

describe('ControlPanel', () => {
  const mockUnits: Unit[] = [
    { id: 'm', name: 'Metre', symbol: 'm', factor: 1 },
    { id: 'km', name: 'Kilometre', symbol: 'km', factor: 1000 },
    { id: 'cm', name: 'Santimetre', symbol: 'cm', factor: 0.01 },
  ];

  const mockFromUnit = mockUnits[0];
  const mockToUnit = mockUnits[1];
  const mockOnFromUnitChange = vi.fn();
  const mockOnToUnitChange = vi.fn();
  const mockOnSwapUnits = vi.fn();

  const defaultProps = {
    fromUnit: mockFromUnit,
    toUnit: mockToUnit,
    units: mockUnits,
    onFromUnitChange: mockOnFromUnitChange,
    onToUnitChange: mockOnToUnitChange,
    onSwapUnits: mockOnSwapUnits,
  };

  it('renders Birim Seçimi heading', () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText('Birim Seçimi')).toBeInTheDocument();
  });

  it('renders Kaynak label', () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText('Kaynak')).toBeInTheDocument();
  });

  it('renders Hedef label', () => {
    render(<ControlPanel {...defaultProps} />);
    expect(screen.getByText('Hedef')).toBeInTheDocument();
  });

  it('renders swap button', () => {
    render(<ControlPanel {...defaultProps} />);
    const swapButton = screen.getByLabelText('Birimleri Değiştir');
    expect(swapButton).toBeInTheDocument();
  });

  it('calls onSwapUnits when swap button clicked', () => {
    render(<ControlPanel {...defaultProps} />);
    const swapButton = screen.getByLabelText('Birimleri Değiştir');
    fireEvent.click(swapButton);
    expect(mockOnSwapUnits).toHaveBeenCalled();
  });

  it('renders source unit selector with current value', () => {
    render(<ControlPanel {...defaultProps} />);
    const select = screen.getAllByRole('combobox')[0];
    expect(select).toHaveValue('m');
  });

  it('renders target unit selector with current value', () => {
    render(<ControlPanel {...defaultProps} />);
    const select = screen.getAllByRole('combobox')[1];
    expect(select).toHaveValue('km');
  });

  it('calls onFromUnitChange when source unit changes', () => {
    render(<ControlPanel {...defaultProps} />);
    const select = screen.getAllByRole('combobox')[0];
    fireEvent.change(select, { target: { value: 'cm' } });
    expect(mockOnFromUnitChange).toHaveBeenCalledWith('cm');
  });

  it('calls onToUnitChange when target unit changes', () => {
    render(<ControlPanel {...defaultProps} />);
    const select = screen.getAllByRole('combobox')[1];
    fireEvent.change(select, { target: { value: 'cm' } });
    expect(mockOnToUnitChange).toHaveBeenCalledWith('cm');
  });

  it('renders all unit options in source select', () => {
    render(<ControlPanel {...defaultProps} />);
    const options = screen.getAllByRole('option');
    expect(options.length).toBeGreaterThanOrEqual(3);
  });
});
