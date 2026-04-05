import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Saat')).toBeInTheDocument();
  });

  it('shows digital clock by default', async () => {
    render(<App />);
    await waitFor(() => {
      const digitalClock = document.querySelector('[data-testid="digital-clock"]');
      expect(digitalClock).toBeInTheDocument();
    });
  });

  it('loads clock type from localStorage', async () => {
    localStorageMock.getItem.mockReturnValue('analog');
    render(<App />);
    await waitFor(() => {
      const analogClock = document.querySelector('.analog-clock');
      expect(analogClock).toBeInTheDocument();
    });
  });

  it('opens settings when settings button is clicked', async () => {
    render(<App />);
    const settingsButton = screen.getByLabelText('Ayarlar');
    fireEvent.click(settingsButton);
    
    await waitFor(() => {
      expect(screen.getByText('Ayarlar')).toBeInTheDocument();
    });
  });

  it('toggles between digital and analog clock', async () => {
    render(<App />);
    
    // Wait for digital clock to appear
    await waitFor(() => {
      expect(document.querySelector('[data-testid="digital-clock"]')).toBeInTheDocument();
    });
    
    // Open settings
    const settingsButton = screen.getByLabelText('Ayarlar');
    fireEvent.click(settingsButton);
    
    // Find and click the analog button
    await waitFor(() => {
      expect(screen.getByText('Analog Görünüm')).toBeInTheDocument();
    });
    
    const analogButton = screen.getByText('Analog Görünüm');
    fireEvent.click(analogButton);
    
    // Check that analog clock is now shown
    await waitFor(() => {
      expect(document.querySelector('.analog-clock')).toBeInTheDocument();
    });
  });

  it('saves clock type to localStorage when changed', async () => {
    render(<App />);
    
    // Open settings
    const settingsButton = screen.getByLabelText('Ayarlar');
    fireEvent.click(settingsButton);
    
    // Toggle to analog
    await waitFor(() => {
      expect(screen.getByText('Analog Görünüm')).toBeInTheDocument();
    });
    
    const analogButton = screen.getByText('Analog Görünüm');
    fireEvent.click(analogButton);
    
    // Verify localStorage was called with the correct key
    expect(localStorageMock.setItem).toHaveBeenCalledWith('clock-type-preference', 'analog');
  });

  it('renders time display', async () => {
    render(<App />);
    await waitFor(() => {
      const digitalClock = document.querySelector('[data-testid="digital-clock"]');
      expect(digitalClock).toBeInTheDocument();
    });
  });

  it('renders date display', () => {
    render(<App />);
    const dateElements = document.querySelectorAll('[class*="date"]');
    expect(dateElements.length).toBeGreaterThan(0);
  });
});
