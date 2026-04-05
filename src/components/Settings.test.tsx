import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Settings } from './Settings'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('Settings', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders settings button', () => {
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
        isOpen={false}
        onToggle={() => {}}
      />
    )
    
    const button = screen.getByLabelText('Ayarlar')
    expect(button).toBeInTheDocument()
  })

  it('opens settings panel when isOpen is true', () => {
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
        isOpen={true}
        onToggle={() => {}}
      />
    )
    
    expect(screen.getByText('Ayarlar')).toBeInTheDocument()
  })

  it('renders toggle buttons with correct text', () => {
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
        isOpen={true}
        onToggle={() => {}}
      />
    )
    
    expect(screen.getByText('Dijital')).toBeInTheDocument()
    expect(screen.getByText('Analog')).toBeInTheDocument()
  })

  it('calls onClockTypeChange when digital button clicked', () => {
    const mockChange = vi.fn()
    render(
      <Settings 
        clockType="analog" 
        onClockTypeChange={mockChange} 
        isOpen={true}
        onToggle={() => {}}
      />
    )
    
    const digitalButton = screen.getByText('Dijital')
    fireEvent.click(digitalButton)
    
    expect(mockChange).toHaveBeenCalledWith('digital')
  })

  it('calls onClockTypeChange when analog button clicked', () => {
    const mockChange = vi.fn()
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={mockChange} 
        isOpen={true}
        onToggle={() => {}}
      />
    )
    
    const analogButton = screen.getByText('Analog')
    fireEvent.click(analogButton)
    
    expect(mockChange).toHaveBeenCalledWith('analog')
  })

  it('calls onToggle when close button clicked', () => {
    const mockToggle = vi.fn()
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
        isOpen={true}
        onToggle={mockToggle}
      />
    )
    
    const closeButton = screen.getByText('close')
    fireEvent.click(closeButton)
    
    expect(mockToggle).toHaveBeenCalled()
  })
})
