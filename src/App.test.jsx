import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('GoRide App', () => {
  it('renders GoRide heading', () => {
    render(<App />)
    expect(screen.getByText(/GoRide/i)).toBeTruthy()
  })

  it('renders Book a Ride button', () => {
    render(<App />)
    expect(screen.getByText(/Book a Ride/i)).toBeTruthy()
  })
})
