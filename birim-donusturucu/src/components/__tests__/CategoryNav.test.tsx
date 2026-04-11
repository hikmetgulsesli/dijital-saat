import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryNav, MobileNav } from '../CategoryNav';

describe('CategoryNav', () => {
  const mockOnChange = vi.fn();

  it('renders Kategoriler heading', () => {
    render(<CategoryNav activeCategory="length" onCategoryChange={mockOnChange} />);
    expect(screen.getByText('Kategoriler')).toBeInTheDocument();
  });

  it('renders Laboratuvar Modu subtitle', () => {
    render(<CategoryNav activeCategory="length" onCategoryChange={mockOnChange} />);
    expect(screen.getByText('Laboratuvar Modu')).toBeInTheDocument();
  });

  it('renders all category buttons', () => {
    render(<CategoryNav activeCategory="length" onCategoryChange={mockOnChange} />);
    expect(screen.getByText('Uzunluk')).toBeInTheDocument();
    expect(screen.getByText('Sıcaklık')).toBeInTheDocument();
    expect(screen.getByText('Ağırlık')).toBeInTheDocument();
  });

  it('highlights active category', () => {
    render(<CategoryNav activeCategory="temperature" onCategoryChange={mockOnChange} />);
    const tempButton = screen.getByText('Sıcaklık');
    expect(tempButton).toHaveClass('text-[#00E5FF]');
  });

  it('calls onCategoryChange when category clicked', () => {
    render(<CategoryNav activeCategory="length" onCategoryChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Ağırlık'));
    expect(mockOnChange).toHaveBeenCalledWith('weight');
  });

  it('renders AKTİF SİSTEM status', () => {
    render(<CategoryNav activeCategory="length" onCategoryChange={mockOnChange} />);
    expect(screen.getByText('AKTİF SİSTEM')).toBeInTheDocument();
  });

  it('renders DURUM label', () => {
    render(<CategoryNav activeCategory="length" onCategoryChange={mockOnChange} />);
    expect(screen.getByText('DURUM')).toBeInTheDocument();
  });
});

describe('MobileNav', () => {
  const mockOnChange = vi.fn();

  it('renders all category buttons', () => {
    render(<MobileNav activeCategory="length" onCategoryChange={mockOnChange} />);
    expect(screen.getByText('Uzunluk')).toBeInTheDocument();
    expect(screen.getByText('Sıcaklık')).toBeInTheDocument();
    expect(screen.getByText('Ağırlık')).toBeInTheDocument();
  });

  it('highlights active category on mobile', () => {
    render(<MobileNav activeCategory="weight" onCategoryChange={mockOnChange} />);
    const weightButton = screen.getByText('Ağırlık').parentElement;
    expect(weightButton).toHaveClass('text-[#00E5FF]');
  });

  it('calls onCategoryChange when mobile category clicked', () => {
    render(<MobileNav activeCategory="length" onCategoryChange={mockOnChange} />);
    fireEvent.click(screen.getByText('Sıcaklık'));
    expect(mockOnChange).toHaveBeenCalledWith('temperature');
  });
});
