import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnalogClock } from './AnalogClock'

describe('AnalogClock', () => {
  it('renders analog clock', () => {
    const testTime = new Date('2024-01-15T10:30:45')
    render(<AnalogClock time={testTime} />)
    
    expect(screen.getByTestId('analog-clock')).toBeInTheDocument()
  })

  it('renders clock face elements', () => {
    const testTime = new Date('2024-01-15T10:30:45')
    render(<AnalogClock time={testTime} />)
    
    const clockFace = document.querySelector('.clock-face')
    expect(clockFace).toBeInTheDocument()
    
    const hourHand = document.querySelector('.hour-hand')
    expect(hourHand).toBeInTheDocument()
    
    const minuteHand = document.querySelector('.minute-hand')
    expect(minuteHand).toBeInTheDocument()
    
    const secondHand = document.querySelector('.second-hand')
    expect(secondHand).toBeInTheDocument()
  })

  it('calculates correct rotation for 12:00:00', () => {
    const noon = new Date('2024-01-15T12:00:00')
    render(<AnalogClock time={noon} />)
    
    const hourHand = document.querySelector('.hour-hand') as HTMLElement
    const minuteHand = document.querySelector('.minute-hand') as HTMLElement
    const secondHand = document.querySelector('.second-hand') as HTMLElement
    
    expect(hourHand.style.transform).toBe('rotate(0deg)')
    expect(minuteHand.style.transform).toBe('rotate(0deg)')
    expect(secondHand.style.transform).toBe('rotate(0deg)')
  })

  it('calculates correct rotation for 3:15:30', () => {
    const time = new Date('2024-01-15T03:15:30')
    render(<AnalogClock time={time} />)
    
    const hourHand = document.querySelector('.hour-hand') as HTMLElement
    const minuteHand = document.querySelector('.minute-hand') as HTMLElement
    const secondHand = document.querySelector('.second-hand') as HTMLElement
    
    expect(hourHand.style.transform).toBe('rotate(97.5deg)')
    expect(minuteHand.style.transform).toBe('rotate(93deg)')
    expect(secondHand.style.transform).toBe('rotate(180deg)')
  })

  it('renders 12 hour markers', () => {
    const testTime = new Date('2024-01-15T10:30:45')
    render(<AnalogClock time={testTime} />)
    
    const hourMarkers = document.querySelectorAll('.hour-marker')
    expect(hourMarkers.length).toBe(12)
  })
})
