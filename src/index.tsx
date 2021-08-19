import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { App } from "./App"
import { CartProvider } from "./CartContext"
import "./index.css"

// Application entry point. This is where
// where render our component tree into HTML.

// CartProvider: Manages cart state. It persists data in localStorage.
// BrowserRouter: Allows using routing across our app.

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
