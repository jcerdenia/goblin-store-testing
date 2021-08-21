import { fireEvent } from "@testing-library/dom"
import React from "react"
import { Product } from "../shared/types"
import { CartItem } from "./CartItem"

// CartItem renders production information and also a 'Remove' button
// that allows removal of the product from the cart.

// We would first plan the tests like so:
/*
describe("CartItem", () => {
  it.todo("renders correctly")
  
  describe("on 'Remove' click", () => {
    it.todo("calls passed in function")
  })
})
*/

describe("CartItem", () => {
  const product: Product = { name: "Product Foo", price: 100, image: "/image/source.png" }

  it("renders correctly", () => {
    const { container, getByAltText } = renderWithRouter(() => {
      return <CartItem product={product} removeFromCart={() => {}} />
    })

    expect(container.innerHTML).toMatch("Product Foo")
    expect(container.innerHTML).toMatch("100 Zm")
    expect(getByAltText("Product Foo")).toHaveAttribute("src", "/image/source.png")
  })

  it("calls passed in function", () => {
    const removeFromCartMock = jest.fn()
    const { getByText } = renderWithRouter(() => <CartItem product={product} removeFromCart={removeFromCartMock} />)
    fireEvent.click(getByText("Remove"))
    expect(removeFromCartMock).toBeCalledWith(product)
  })
})