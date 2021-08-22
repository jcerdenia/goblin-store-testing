import React from "react"
import { Product } from "../shared/types"
import { renderHook } from "@testing-library/react-hooks"
import { useCart } from "./useCart"
import { act } from "@testing-library/react"

// useCart hook allows us to get the list of products in the cart,
// add new products, or clear the cart.

const localStorageMock = (() => {
  let store: { [key: string]: string } = {}
  return {
    clear: () => store = {},
    getItem: (key: string) => store[key] || null,
    removeItem: (key: string) => delete store[key],
    setItem: jest.fn((key: string, value: string) => store[key] = value ? value.toString() : "")
  }
})() // don't forget to call it

// Assign mock local storage on the window object:
Object.defineProperty(window, "localStorage", { value: localStorageMock })

describe("useCart", () => {
  afterEach(() => localStorageMock.clear())

  describe("on mount", () => {
    it("loads data from localStorage", () => {
      const products: Product[] = [{ name: "Product foo", price: 0, image: "image.jpg" }]
      localStorageMock.setItem("products", JSON.stringify(products))
      const { result } = renderHook(useCart)
      expect(result.current.products).toEqual(products)
    })
  })

  // NB: naming convention from RSpec to to call function tests with # prefix
  describe("#addToCart", () => {
    it("adds item to the cart", () => {
      const product: Product = { name: "Product foo", price: 0, image: "image.jpg" }
      const { result } = renderHook(useCart)
      act(() => result.current.addToCart(product)) // remember to use act because we alter the state of the hook
      expect(result.current.products).toEqual([product])
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", JSON.stringify([product]))
    })
  })

  describe("removeFromCart", () => {
    it("removes item from the cart", () => {
      const product: Product = { name: "Product foo", price: 0, image: "image.jpg" }
      localStorageMock.setItem("products", JSON.stringify([product]))
      const { result } = renderHook(useCart)
      act(() => result.current.removeFromCart(product))
      expect(result.current.products).toEqual([])
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", "[]")
    })
  })

  describe("#totalPrice", () => {
    it("returns total products price", () => {
      const product: Product = { name: "Product foo", price: 21, image: "image.jpg" }
      localStorageMock.setItem("products", JSON.stringify([product, product])) // we pass the product twice
      const { result } = renderHook(useCart)
      expect(result.current.totalPrice()).toEqual(42) // 21 * 2
    })
  })

  describe("#clearCart", () => {
    it("removes all the products from the cart", () => {
      const product: Product = { name: "Product foo", price: 21, image: "image.jpg" }
      localStorageMock.setItem("products", JSON.stringify([product, product]))
      const { result } = renderHook(useCart)
      act(() => result.current.clearCart())
      expect(result.current.products).toEqual([])
      expect(localStorageMock.setItem).toHaveBeenCalledWith("products", "[]")
    })
  })
})