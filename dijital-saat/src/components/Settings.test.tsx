import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Settings, type ClockType } from './Settings'

describe('Settings', () => {
  it('renders without crashing', () => {
    render(<Settings clockType="digital" onClockTypeChange={() => {}} />)
    expect(screen.getByTestId('settings-panel')).toBeInTheDocument()
  })

  it('renders digital button', () => {
    render(<Settings clockType="digital" onClockTypeChange={() => {}} />)
    expect(screen.getByTestId('digital-btn')).toBeInTheDocument()
    expect(screen.getByTestId('digital-btn')).toHaveTextContent('Dijital')
  })

  it('renders analog button', () => {
    render(<Settings clockType="digital" onClockTypeChange={() => {}} />)
    expect(screen.getByTestId('analog-btn')).toBeInTheDocument()
    expect(screen.getByTestId('analog-btn')).toHaveTextContent('Analog')
  })

  it('calls onClockTypeChange when digital button clicked', () => {
    const mockChange = vi.fn()
    render(<Settings clockType="analog" onClockTypeChange={mockChange} />)
    fireEvent.click(screen.getByTestId('digital-btn'))
    expect(mockChange).toHaveBeenCalledWith('digital')
  })

  it('calls onClockTypeChange when analog button clicked', () => {
    const mockChange = vi.fn()
    render(<Settings clockType="digital" onClockTypeChange={mockChange} />)
    fireEvent.click(screen.getByTestId('analog-btn'))
    expect(mockChange).toHaveBeenCalledWith('analog')
  })

  it('shows digital button as active when clockType is digital', () => {
    render(<Settings clockType="digital" onClockTypeChange={() => {}} />)
    expect(screen.getByTestId('digital-btn')).toHaveClass('active')
  })

  it('shows analog button as active when clockType is analog', () => {
    render(<Settings clockType="analog" onClockTypeChange={() => {}} />)
    expect(screen.getByTestId('analog-btn')).toHaveClass('active')
  })
})
