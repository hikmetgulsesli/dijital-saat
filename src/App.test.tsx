import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders time display', () => {
    render(<App />);
    const timeElements = document.querySelectorAll('[class*="time"]');
    expect(timeElements.length).toBeGreaterThan(0);
  });

  it('renders date display', () => {
    render(<App />);
    const dateElements = document.querySelectorAll('[class*="date"]');
    expect(dateElements.length).toBeGreaterThan(0);
  });
});
