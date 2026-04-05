import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DateDisplay } from './DateDisplay'

describe('DateDisplay', () => {
  it('renders without crashing', () => {
    render(<DateDisplay />)
    expect(screen.getByTestId('date-display')).toBeInTheDocument()
  })

  it('renders date in Turkish format with day month year weekday', () => {
    // April 5, 2026 is a Sunday (Pazar)
    const testDate = new Date('2026-04-05T14:30:45')
    render(<DateDisplay date={testDate} />)
    expect(screen.getByTestId('date-display')).toHaveTextContent('5 Nisan 2026, Pazar')
  })

  it('renders January correctly', () => {
    const testDate = new Date('2026-01-15T10:00:00')
    render(<DateDisplay date={testDate} />)
    expect(screen.getByTestId('date-display')).toHaveTextContent('15 Ocak 2026')
  })

  it('renders December correctly', () => {
    const testDate = new Date('2026-12-25T10:00:00')
    render(<DateDisplay date={testDate} />)
    expect(screen.getByTestId('date-display')).toHaveTextContent('25 Aralık 2026')
  })

  it('renders Monday correctly', () => {
    // April 6, 2026 is a Monday (Pazartesi)
    const testDate = new Date('2026-04-06T10:00:00')
    render(<DateDisplay date={testDate} />)
    expect(screen.getByTestId('date-display')).toHaveTextContent('Pazartesi')
  })

  it('renders all Turkish months correctly', () => {
    const months = [
      { date: '2026-01-15', expected: 'Ocak' },
      { date: '2026-02-15', expected: 'Şubat' },
      { date: '2026-03-15', expected: 'Mart' },
      { date: '2026-04-15', expected: 'Nisan' },
      { date: '2026-05-15', expected: 'Mayıs' },
      { date: '2026-06-15', expected: 'Haziran' },
      { date: '2026-07-15', expected: 'Temmuz' },
      { date: '2026-08-15', expected: 'Ağustos' },
      { date: '2026-09-15', expected: 'Eylül' },
      { date: '2026-10-15', expected: 'Ekim' },
      { date: '2026-11-15', expected: 'Kasım' },
      { date: '2026-12-15', expected: 'Aralık' },
    ]

    months.forEach(({ date, expected }) => {
      const { unmount } = render(<DateDisplay date={new Date(date)} />)
      expect(screen.getByTestId('date-display')).toHaveTextContent(expected)
      unmount()
    })
  })

  it('renders all Turkish days correctly', () => {
    // April 5, 2026 is Sunday
    const baseDate = new Date('2026-04-05')
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi']

    days.forEach((expectedDay, index) => {
      const testDate = new Date(baseDate)
      testDate.setDate(baseDate.getDate() + index)
      const { unmount } = render(<DateDisplay date={testDate} />)
      expect(screen.getByTestId('date-display')).toHaveTextContent(expectedDay)
      unmount()
    })
  })
})
