import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DigitalClock } from './DigitalClock'

describe('DigitalClock', () => {
  it('renders without crashing', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<DigitalClock time={time} />)
    expect(screen.getByTestId('digital-clock')).toBeInTheDocument()
  })

  it('renders time in HH:MM:SS format', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<DigitalClock time={time} />)
    expect(screen.getByTestId('digital-clock')).toHaveTextContent('12:30:45')
  })

  it('renders midnight correctly', () => {
    const time = new Date('2024-01-01T00:00:00')
    render(<DigitalClock time={time} />)
    expect(screen.getByTestId('digital-clock')).toHaveTextContent('00:00:00')
  })

  it('renders single digit hours with leading zero', () => {
    const time = new Date('2024-01-01T09:05:08')
    render(<DigitalClock time={time} />)
    expect(screen.getByTestId('digital-clock')).toHaveTextContent('09:05:08')
  })
})
