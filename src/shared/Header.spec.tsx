import React from "react"
import { Header } from "./Header"
import { fireEvent } from "@testing-library/react"

// Test for the header component, which renders the title of the store
// and also the cart widget. The cart widget is defined in a separate component,
// so we mock it and test Header in isolation.

jest.mock("./CartWidget", () => ({ CartWidget: () => <div>Cart widget</div> }))

describe("Header", () => {
  it("renders correctly", () => {
    const { container } = renderWithRouter(() => <Header />)
    expect(container.innerHTML).toMatch("Goblin Store")
    expect(container.innerHTML).toMatch("Cart widget")
  })

  it("navigates to root url on header title click", () => {
    const { getByText, history } = renderWithRouter(() => <Header />)
    fireEvent.click(getByText("Goblin Store"))
    expect(history.location.pathname).toEqual("/")
  })
})