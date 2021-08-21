import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { CheckoutForm } from "./CheckoutForm"
import { act } from "react-dom/test-utils"

// Here we want to verify the following:
// [1] When input values are invalid, the form renders an error message.
// [2] When valid, clicking the 'Order' button calls the submit function.

describe("CheckoutForm", () => {
  it("renders correctly", () => {
    const { container } = render(<CheckoutForm />)
    for (const item of ["Cardholders Name", "Card Number", "Expiration Date", "CVV"]) {
      expect(container.innerHTML).toMatch(item)
    }
  })

  describe("with invalid inputs", () => {
    it("shows errors", async () => {
      const { container, getByText } = render(<CheckoutForm />)
      await act(async () => {fireEvent.click(getByText("Place order"))})
      expect(container.innerHTML).toMatch("Error:")
    })
  })

  describe("with valid inputs", () => {
    describe("on place order button click", () => {
      it("calls submit function with form data", async () => {
        const mockSubmit = jest.fn()
        const { getByLabelText, getByText } = render(<CheckoutForm submit={mockSubmit} />)
        // Now we fill in the form inputs. It will trigger state updates in form.
        // When we have test code that triggers state updates, wrap it into act.
        await act(async () => {
          fireEvent.change(getByLabelText("Cardholders Name:"), { target: { value: "Vladimir Lossky" } })
          fireEvent.change(getByLabelText("Card Number:"), { target: { value: "0000 0000 0000 0000" } })
          fireEvent.change(getByLabelText("Expiration Date:"), { target: { value: "3020-05" } })
          fireEvent.change(getByLabelText("CVV:"), { target: { value: "123" } })
          await act(async () => {fireEvent.click(getByText("Place order"))})
        })

        expect(mockSubmit).toHaveBeenCalled()
      })
    })
  })
})