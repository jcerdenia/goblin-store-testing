import React from "react"
import { CartWidget } from "./CartWidget"
import { fireEvent, getByRole } from "@testing-library/react"

// Cart Widget component displays the number of products in the cart.
// The whole component is a link; clicking on it takes you to the cart summary page.

describe("CartWidget", () => {

  // We can plan out tests to write by using it.todo.
  // This allows us to write the test case name without the callback.

  // it.todo("shows the amount of products in the cart")
  // it.todo("navigates to cart summary page on click")

  it("navigates to cart summary page on click", () => {
    // getByRole selector uses the aria-role attr to find the element.
    const { getByRole, history } = renderWithRouter(() => (<CartWidget />))
    // Click the element then check if we end up on the /cart route.
    fireEvent.click(getByRole("link"))
    expect(history.location.pathname).toEqual("/cart")
  })

  it("shows the amount of products in the cart", () => {
    const stubCartHook = () => ({
      products: [{ name: "Product foo", price: 0, image: "image.png" }]
    })

    const { container } = renderWithRouter(() => (<CartWidget useCartHook={stubCartHook} />))
    expect(container.innerHTML).toMatch("1")
  })
})