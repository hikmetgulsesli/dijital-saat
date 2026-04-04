import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DigitalClock } from './DigitalClock';

describe('DigitalClock', () => {
  it('renders without crashing', () => {
    render(<DigitalClock />);
    expect(screen.getByTestId('digital-clock')).toBeInTheDocument();
  });

  it('renders time in HH:MM:SS format', () => {
    const testDate = new Date('2026-04-05T14:30:45');
    render(<DigitalClock time={testDate} />);
    expect(screen.getByTestId('digital-clock')).toHaveTextContent('14:30:45');
  });

  it('renders midnight correctly', () => {
    const testDate = new Date('2026-04-05T00:00:00');
    render(<DigitalClock time={testDate} />);
    expect(screen.getByTestId('digital-clock')).toHaveTextContent('00:00:00');
  });

  it('renders single digit hours with leading zero', () => {
    const testDate = new Date('2026-04-05T09:05:08');
    render(<DigitalClock time={testDate} />);
    expect(screen.getByTestId('digital-clock')).toHaveTextContent('09:05:08');
  });

  it('renders late night time correctly', () => {
    const testDate = new Date('2026-04-05T23:59:59');
    render(<DigitalClock time={testDate} />);
    expect(screen.getByTestId('digital-clock')).toHaveTextContent('23:59:59');
  });
});