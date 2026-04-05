import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DigitalClock } from './DigitalClock'

describe('DigitalClock', () => {
  it('renders digital clock', () => {
    const testTime = new Date('2024-01-15T10:30:45')
    render(<DigitalClock time={testTime} />)
    
    expect(screen.getByTestId('digital-clock')).toBeInTheDocument()
  })

  it('displays time in Turkish format', () => {
    const testTime = new Date('2024-01-15T10:30:45')
    render(<DigitalClock time={testTime} />)
    
    expect(screen.getByText('10:30:45')).toBeInTheDocument()
  })

  it('displays midnight correctly', () => {
    const midnight = new Date('2024-01-15T00:00:00')
    render(<DigitalClock time={midnight} />)
    
    expect(screen.getByText('00:00:00')).toBeInTheDocument()
  })

  it('pads single digits with zeros', () => {
    const testTime = new Date('2024-01-15T01:02:03')
    render(<DigitalClock time={testTime} />)
    
    expect(screen.getByText('01:02:03')).toBeInTheDocument()
  })
})
