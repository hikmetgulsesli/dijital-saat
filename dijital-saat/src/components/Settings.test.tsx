import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Settings, useClockTypePreference } from './Settings'

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
    
    const settingsButton = screen.getByLabelText('Ayarlar')
    fireEvent.click(settingsButton)
    
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
    
    const settingsButton = screen.getByLabelText('Ayarlar')
    fireEvent.click(settingsButton)
    
    const analogButton = screen.getByText('Analog Görünüm')
    fireEvent.click(analogButton)
    
    expect(mockChange).toHaveBeenCalledWith('analog')
  })

  it('closes panel when close button clicked', () => {
    render(
      <Settings 
        clockType="digital" 
        onClockTypeChange={() => {}} 
      />
    )
    
    const settingsButton = screen.getByLabelText('Ayarlar')
    fireEvent.click(settingsButton)
    
    const closeButton = screen.getByLabelText('Kapat')
    fireEvent.click(closeButton)
    
    expect(screen.queryByText('Ayarlar')).not.toBeInTheDocument()
  })
})

describe('useClockTypePreference', () => {
  it('returns digital as default', () => {
    const TestComponent = () => {
      const [clockType] = useClockTypePreference()
      return <div data-testid="clock-type">{clockType}</div>
    }
    
    render(<TestComponent />)
    expect(screen.getByTestId('clock-type').textContent).toBe('digital')
  })
})
