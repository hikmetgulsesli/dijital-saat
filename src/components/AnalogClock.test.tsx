import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AnalogClock } from './AnalogClock'
import { Settings } from './Settings'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('AnalogClock', () => {
  it('renders SVG clock face', () => {
    const time = new Date('2024-01-01T12:00:00')
    render(<AnalogClock time={time} />)
    
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders clock face circle', () => {
    const time = new Date('2024-01-01T12:00:00')
    render(<AnalogClock time={time} />)
    
    const circles = document.querySelectorAll('circle')
    expect(circles.length).toBeGreaterThanOrEqual(2)
  })

  it('renders hour markers', () => {
    const time = new Date('2024-01-01T12:00:00')
    render(<AnalogClock time={time} />)
    
    const lines = document.querySelectorAll('line')
    expect(lines.length).toBeGreaterThanOrEqual(12)
  })

  it('renders hour, minute, and second hands', () => {
    const time = new Date('2024-01-01T12:00:00')
    render(<AnalogClock time={time} />)
    
    const lines = document.querySelectorAll('line')
    expect(lines.length).toBeGreaterThanOrEqual(3)
  })

  it('renders center dot', () => {
    const time = new Date('2024-01-01T12:00:00')
    render(<AnalogClock time={time} />)
    
    const circles = document.querySelectorAll('circle')
    expect(circles.length).toBeGreaterThanOrEqual(1)
  })
})

describe('Settings', () => {
  it('renders settings button', () => {
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
      />
    )
    
    const button = screen.getByLabelText('Ayarlar')
    expect(button).toBeInTheDocument()
  })

  it('opens settings panel when button clicked', () => {
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
      />
    )
    
    const button = screen.getByLabelText('Ayarlar')
    fireEvent.click(button)
    
    expect(screen.getByText('Ayarlar')).toBeInTheDocument()
  })

  it('renders toggle buttons with correct text', () => {
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
      />
    )
    
    const button = screen.getByLabelText('Ayarlar')
    fireEvent.click(button)
    
    expect(screen.getByText('Dijital Görünüm')).toBeInTheDocument()
    expect(screen.getByText('Analog Görünüm')).toBeInTheDocument()
  })

  it('calls onClockTypeChange when digital button clicked', () => {
    const mockChange = vi.fn()
    render(
      <Settings 
        clockType="analog" 
        onClockTypeChange={mockChange} 
      />
    )
    
    const button = screen.getByLabelText('Ayarlar')
    fireEvent.click(button)
    
    const digitalButton = screen.getByText('Dijital Görünüm')
    fireEvent.click(digitalButton)
    
    expect(mockChange).toHaveBeenCalledWith('digital')
  })

  it('calls onClockTypeChange when analog button clicked', () => {
    const mockChange = vi.fn()
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={mockChange} 
      />
    )
    
    const button = screen.getByLabelText('Ayarlar')
    fireEvent.click(button)
    
    const analogButton = screen.getByText('Analog Görünüm')
    fireEvent.click(analogButton)
    
    expect(mockChange).toHaveBeenCalledWith('analog')
  })

  it('highlights active clock type', () => {
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
      />
    )
    
    const button = screen.getByLabelText('Ayarlar')
    fireEvent.click(button)
    
    const digitalButton = screen.getByText('Dijital Görünüm')
    expect(digitalButton.classList.contains('active')).toBe(true)
  })

  it('closes panel when close button clicked', () => {
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
      />
    )
    
    const button = screen.getByLabelText('Ayarlar')
    fireEvent.click(button)
    
    const closeButton = screen.getByLabelText('Kapat')
    fireEvent.click(closeButton)
    
    expect(screen.queryByText('Saat Görünümü')).not.toBeInTheDocument()
  })
})
