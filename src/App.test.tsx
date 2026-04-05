import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.body).toBeInTheDocument()
  })

  it('displays time', () => {
    render(<App />)
    // Time should be displayed in Turkish format
    const timeRegex = /\d{1,2}:\d{2}:\d{2}/
    expect(document.body.textContent).toMatch(timeRegex)
  })
})
