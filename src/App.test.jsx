import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

vi.mock('./lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({
          data: [
            {
              id: '1',
              name: 'Hafiz Rahman',
              vehicle_model: 'Perodua Myvi 2022',
              vehicle_plate: 'WXY1234',
              rating: 4.9,
              is_available: true,
            }
          ],
          error: null,
        })),
      })),
    })),
  },
}))

import App from './App'

describe('GoRide App', () => {
  it('renders GoRide title', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/GoRide/i)).toBeTruthy()
    })
  })

  it('renders Live Dashboard subtitle', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText(/Live Dashboard/i)).toBeTruthy()
    })
  })

  it('renders driver name after loading', async () => {
    render(<App />)
    await waitFor(() => {
      // getAllByText — sebab nama muncul dalam drivers dan riders section
      const elements = screen.getAllByText(/Hafiz Rahman/i)
      expect(elements.length).toBeGreaterThan(0)
    })
  })
})
