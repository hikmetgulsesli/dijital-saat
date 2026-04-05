import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DigitalClock } from './DigitalClock'

describe('DigitalClock', () => {
  it('renders digital clock', () => {
    const testTime = new Date('2024-01-15T10:30:45')
    render(<DigitalClock time={testTime} />)
    expect(screen.getByTestId('digital-clock')).toBeInTheDocument()
  })

  it('displays time with colons', () => {
    const testTime = new Date('2024-01-15T10:30:45')
    render(<DigitalClock time={testTime} />)
    const el = screen.getByTestId('digital-clock')
    expect(el.textContent).toMatch(/10.*30.*45/)
  })

  it('displays midnight correctly', () => {
    const midnight = new Date('2024-01-15T00:00:00')
    render(<DigitalClock time={midnight} />)
    const el = screen.getByTestId('digital-clock')
    expect(el.textContent).toMatch(/00.*00.*00/)
  })
})
