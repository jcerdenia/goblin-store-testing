import React from "react"
import { Switch, Route } from "react-router-dom"
import { Checkout } from "./Checkout"
import { Home } from "./Home"
import { Cart } from "./Cart"
import { Header } from "./shared/Header"
import { OrderSummary } from "./OrderSummary"

// App accepts no props and contains no business logic.
// The only thing it does is render the layout.

// Most of our components will output some layout -
// this is the first thing we can test.

export const App = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/order">
            <OrderSummary />
          </Route>
          <Route>Page not found</Route>
        </Switch>
      </div>
    </>
  )
}
