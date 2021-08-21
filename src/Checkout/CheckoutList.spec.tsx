import React from "react"
import { CheckoutList } from "./CheckoutList"
import { Product } from "../shared/types"
import { render } from "@testing-library/react"

// Only one task! To render a list of products.

describe("CheckoutList", () => {
  it("renders list of products", () => {
    const products: Product[] = ["Product foo", "Product bar"]
      .map((name) => ({ name: name, price: 10, image: "/image.png" }))

    const { container } = render(<CheckoutList products={products} />)
    expect(container.innerHTML).toMatch("Product foo")
    expect(container.innerHTML).toMatch("Product bar")
  })
})