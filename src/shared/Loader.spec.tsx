import React from "react"
import { Loader } from "./Loader"
import { render } from "@testing-library/react"

// Loader component contains no logic, so we just make
// sure it renders correctly.

describe("Loader", () => {
  it("renders correctly", () => {
    const { container } = render(<Loader />)
    expect(container.innerHTML).toMatch("Loading")
  })
})
