import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { AnalogClock } from './AnalogClock'

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
