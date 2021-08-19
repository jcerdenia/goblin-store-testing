import React, { Component, ReactElement } from "react"
import { App } from "./App"
import { createMemoryHistory, History } from "history"
import { render, RenderResult } from "@testing-library/react"
import { Router } from "react-router-dom"
import "./testHelpers"

// Note that tests run in the Node environment (not a browser), and we use a 
// simulated DOM API. Some functionality can be missing or work differently.
// e.g., we need a package to provide the History API functionality.

jest.mock("./Home", () => ({ Home: () => <div>Home</div>}))
jest.mock("./Cart", () => ({ Cart: () => <div>Cart</div>}))
jest.mock("./Checkout", () => ({ Checkout: () => <div>Checkout</div>}))
jest.mock("./OrderSummary", () => ({ OrderSummary: () => <div>Order Summary</div>}))

describe("App", () => {

  // By wrapping the whole testing code into describe('App'),
  // we specify that all the 'it' blocks containing specific test cases
  // are related to testing the App component.
  // Use describe blocks wisely to improve readability of tests.

  // "it" blocks contain individual tests. Optimally, each block
  // should test one aspect of the tested entity.
  // Use present simple tense for names and keep them short.

  it("renders successfully", () => {
    // [1] Create the history object to pass to the Router component. 
    // [2] Render App and get the container instance.
    // [3] Check if it contains the string 'Goblin Store'.
    const history = createMemoryHistory()
    const { container } = renderWithRouter(() => <App />)
    expect(container.innerHTML).toMatch("Goblin Store")
  })
})

describe("Routing", () => {
  it("renders home page on '/'", () => {
    const { container } = renderWithRouter(() => <App />, "/")
    expect(container.innerHTML).toMatch("Home")
  })

  it("renders checkout page on '/cart'", () => {
    const { container } = renderWithRouter(() => <App/>, "/cart")
    expect(container.innerHTML).toMatch("Cart")
  })

  it("renders checkout page on '/cart'", () => {
    const { container } = renderWithRouter(() => <App/>, "/cart")
    expect(container.innerHTML).toMatch("Cart")
  })

  it("renders checkout page on '/checkout'", () => {
    const { container } = renderWithRouter(() => <App/>, "/checkout")
    expect(container.innerHTML).toMatch("Checkout")
  })

  it("renders checkout page on '/order'", () => {
    const { container } = renderWithRouter(() => <App/>, "/order")
    expect(container.innerHTML).toMatch("Order Summary")
  })
})