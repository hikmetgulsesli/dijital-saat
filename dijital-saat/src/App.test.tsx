import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByText('TEMPORAL')).toBeInTheDocument()
  })

  it('displays location as Istanbul', () => {
    render(<App />)
    expect(screen.getByText('İSTANBUL, TR')).toBeInTheDocument()
  })

  it('displays timezone information', () => {
    render(<App />)
    expect(screen.getByText('GMT+03:00')).toBeInTheDocument()
    expect(screen.getByText('DOĞU AVRUPA')).toBeInTheDocument()
  })

  it('displays date label', () => {
    render(<App />)
    expect(screen.getByText('TARİH')).toBeInTheDocument()
  })

  it('displays day label', () => {
    render(<App />)
    expect(screen.getByText('GÜN')).toBeInTheDocument()
  })

  it('displays system status', () => {
    render(<App />)
    expect(screen.getByText('SİSTEM DURUMU')).toBeInTheDocument()
    expect(screen.getByText('AKTİF')).toBeInTheDocument()
  })

  it('displays sidebar navigation items', () => {
    render(<App />)
    expect(screen.getByText('DİJİTAL')).toBeInTheDocument()
    expect(screen.getByText('ANALOG')).toBeInTheDocument()
    expect(screen.getByText('AYARLAR')).toBeInTheDocument()
  })

  it('displays footer status', () => {
    render(<App />)
    expect(screen.getByText('SİSTEM DURUMU: AKTİF')).toBeInTheDocument()
  })

  it('displays version info in footer', () => {
    render(<App />)
    expect(screen.getByText(/TEMPORAL MONOLITH/)).toBeInTheDocument()
  })
})
