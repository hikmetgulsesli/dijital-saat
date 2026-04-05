import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { AnalogClock } from './AnalogClock'

describe('AnalogClock', () => {
  it('renders without crashing', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<AnalogClock time={time} />)
    expect(screen.getByTestId('analog-clock')).toBeInTheDocument()
  })

  it('renders SVG clock face', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<AnalogClock time={time} />)
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it('renders hour markers', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<AnalogClock time={time} />)
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('03')).toBeInTheDocument()
    expect(screen.getByText('06')).toBeInTheDocument()
    expect(screen.getByText('09')).toBeInTheDocument()
  })

  it('renders clock hands', () => {
    const time = new Date('2024-01-01T12:30:45')
    render(<AnalogClock time={time} />)
    const lines = document.querySelectorAll('line')
    expect(lines.length).toBeGreaterThanOrEqual(3) // hour, minute, second hands
  })
})
