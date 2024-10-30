import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import App from '../App'
import { act } from 'react'

describe('App', () => {
    it("should render App", async () => {
        render(<App />)
        const items = await screen.findAllByRole('button');
        expect(items).toHaveLength(11);

        const appleElement = screen.getByText("Apple")

        expect(screen.getByTestId('main-list')).toContainElement(appleElement)
        expect(screen.getByTestId('Fruit-column')).not.toContainElement(appleElement)
        expect(screen.getByTestId('Vegetable-column')).not.toContainElement(appleElement)

        expect(screen.getByText("Fruit")).toBeInTheDocument()
        expect(screen.getByText("Vegetable")).toBeInTheDocument()
    })

    it("moves item to correct column when clicked", async () => {
        render(<App />)

        fireEvent.click(screen.getByText("Apple"))
        fireEvent.click(screen.getByText("Broccoli"))

        const items = await screen.findAllByRole('button');
        expect(items).toHaveLength(9);

        expect(screen.getByTestId('main-list')).not.toContainElement(screen.getByText("Apple"))
        expect(screen.getByTestId('Fruit-column')).toContainElement(screen.getByText("Apple"))

        expect(screen.getByTestId('main-list')).not.toContainElement(screen.getByText("Broccoli"))
        expect(screen.getByTestId('Vegetable-column')).toContainElement(screen.getByText("Broccoli"))
    })

    it('returns item to main list after 5 seconds', () => {
        vi.useFakeTimers()

        render(<App />)

        const appleElement = screen.getByText("Apple")

        // Click on Apple
        fireEvent.click(appleElement)
        
        // Fast-forward 5 seconds
        act(() => {
          vi.advanceTimersByTime(5000)
        })
    
        expect(screen.getByTestId('main-list')).toContainElement(appleElement)
        expect(screen.getByTestId('Fruit-column')).not.toContainElement(appleElement)

        vi.useRealTimers()
      })
})