import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Settings } from './Settings'

describe('Settings', () => {
  it('renders settings button', () => {
    render(<Settings clockType="digital" onClockTypeChange={() => {}} />)
    expect(screen.getByLabelText('Ayarlar')).toBeInTheDocument()
  })

  it('opens panel when button clicked', () => {
    render(<Settings clockType="digital" onClockTypeChange={() => {}} />)
    fireEvent.click(screen.getByLabelText('Ayarlar'))
    expect(screen.getByText('Saat Görünümü')).toBeInTheDocument()
  })

  it('renders toggle buttons', () => {
    render(<Settings clockType="digital" onClockTypeChange={() => {}} />)
    fireEvent.click(screen.getByLabelText('Ayarlar'))
    expect(screen.getByText('Dijital Görünüm')).toBeInTheDocument()
    expect(screen.getByText('Analog Görünüm')).toBeInTheDocument()
  })

  it('calls onClockTypeChange when digital clicked', () => {
    const mockChange = vi.fn()
    render(<Settings clockType="analog" onClockTypeChange={mockChange} />)
    fireEvent.click(screen.getByLabelText('Ayarlar'))
    fireEvent.click(screen.getByText('Dijital Görünüm'))
    expect(mockChange).toHaveBeenCalledWith('digital')
  })

  it('calls onClockTypeChange when analog clicked', () => {
    const mockChange = vi.fn()
    render(<Settings clockType="digital" onClockTypeChange={mockChange} />)
    fireEvent.click(screen.getByLabelText('Ayarlar'))
    fireEvent.click(screen.getByText('Analog Görünüm'))
    expect(mockChange).toHaveBeenCalledWith('analog')
  })
})
