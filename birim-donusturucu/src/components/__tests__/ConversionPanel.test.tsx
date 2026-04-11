import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConversionPanel } from '../ConversionPanel';
import type { Unit, UnitCategory } from '@/hooks/useConverter';

describe('ConversionPanel', () => {
  const mockFromUnit: Unit = { id: 'm', name: 'Metre', symbol: 'm', factor: 1 };
  const mockToUnit: Unit = { id: 'km', name: 'Kilometre', symbol: 'km', factor: 1000 };
  const mockOnInputChange = vi.fn();
  const mockOnCopyResult = vi.fn();

  const defaultProps = {
    category: 'length' as UnitCategory,
    categoryName: 'Uzunluk',
    fromUnit: mockFromUnit,
    toUnit: mockToUnit,
    inputValue: '1284.5',
    formattedResult: '1.2845',
    precision: 4,
    onInputChange: mockOnInputChange,
    onCopyResult: mockOnCopyResult,
  };

  it('renders category name', () => {
    render(<ConversionPanel {...defaultProps} />);
    expect(screen.getByText('Uzunluk Analizi')).toBeInTheDocument();
  });

  it('renders input value', () => {
    render(<ConversionPanel {...defaultProps} />);
    const input = screen.getByDisplayValue('1284.5');
    expect(input).toBeInTheDocument();
  });

  it('renders formatted result', () => {
    render(<ConversionPanel {...defaultProps} />);
    expect(screen.getByText('1.2845')).toBeInTheDocument();
  });

  it('renders from unit name', () => {
    render(<ConversionPanel {...defaultProps} />);
    expect(screen.getByText('Metre')).toBeInTheDocument();
  });

  it('renders to unit name', () => {
    render(<ConversionPanel {...defaultProps} />);
    expect(screen.getByText('Kilometre')).toBeInTheDocument();
  });

  it('calls onInputChange when input changes', () => {
    render(<ConversionPanel {...defaultProps} />);
    const input = screen.getByDisplayValue('1284.5');
    fireEvent.change(input, { target: { value: '100' } });
    expect(mockOnInputChange).toHaveBeenCalledWith('100');
  });

  it('renders precision info', () => {
    render(<ConversionPanel {...defaultProps} />);
    expect(screen.getByText('4 Ondalık Basamak')).toBeInTheDocument();
  });

  it('renders copy button', () => {
    render(<ConversionPanel {...defaultProps} />);
    expect(screen.getByText('Veriyi Kopyala')).toBeInTheDocument();
  });

  it('calls onCopyResult when copy button clicked', async () => {
    mockOnCopyResult.mockResolvedValue(true);
    render(<ConversionPanel {...defaultProps} />);
    const button = screen.getByText('Veriyi Kopyala');
    fireEvent.click(button);
    expect(mockOnCopyResult).toHaveBeenCalled();
  });

  it('renders algorithm version', () => {
    render(<ConversionPanel {...defaultProps} />);
    expect(screen.getByText('Algoritma V2.4')).toBeInTheDocument();
  });

  it('renders input label', () => {
    render(<ConversionPanel {...defaultProps} />);
    expect(screen.getByText('Değer Girin')).toBeInTheDocument();
  });

  it('renders result label', () => {
    render(<ConversionPanel {...defaultProps} />);
    expect(screen.getByText('Hesaplanan Sonuç')).toBeInTheDocument();
  });
});
