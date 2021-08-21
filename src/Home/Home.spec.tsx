import React from "react"
import { render } from "@testing-library/react"
import { Home } from "./index"
import { ProductCardProps } from "./ProductCard"
import { Category } from "../shared/types"

// Testing Home:
// [1] While products are being loaded, it should render the <Loader />
// [2] If error from useProducts, render the error message.
// [3] When products are loaded, render the product list.

// We mock the ProductCard component:
jest.mock("./ProductCard", () => ({
  ProductCard: ({ datum }: ProductCardProps) => {
    const { name, price, image } = datum
    return (
      <div>{name} {price} {image}</div>
    )
  }
}))

describe("Home", () => {
  describe("while loading", () => {
    it("renders loader", () => {
      const mockUseProducts = () => ({
        categories: [], isLoading: true, error: false
      })

      const { container } = render(<Home useProductsHook={mockUseProducts} />)
      expect(container.innerHTML).toMatch("Loading")
    })
  })

  describe("with error", () => {
    it("renders error message", () => {
      const mockUseProducts = () => ({
        categories: [], isLoading: false, error: true
      })

      const { container } = render(<Home useProductsHook={mockUseProducts} />)
      expect(container.innerHTML).toMatch("Error")
    })
  })

  describe("with data", () => {
    
    it("renders categories with products", () => {
      const category: Category = {
        name: "Category Foo",
        items: [{ name: "Product foo", price: 55, image: "/test.jpg" }]
      }

      // Verify that if we render the home page with the above data, we'll see the
      // category titled "Category foo", and it will contain the rendered product.
      const mockUseProducts = () => ({
        categories: [category], isLoading: false, error: false
      })

      const { container } = render(<Home useProductsHook={mockUseProducts} />)
      expect(container.innerHTML).toMatch("Category Foo")
      expect(container.innerHTML).toMatch("Product foo 55 /test.jpg")
      // We don't need to test that if we click on the product's "Add to cart" button
      // we'll add the product to the cart. We do it in the ProductCard tests.
    })
  })
})