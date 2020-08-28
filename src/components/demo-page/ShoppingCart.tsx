import React, { useState } from "react"
import { Button } from "@material-ui/core"

export const ShoppingCart = () => (
  <div className="shopping-cart">
    <h1>Shopping Cart</h1>
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <div className="cart-item-container">
        <div className="cart-item">
          <img src="/goalco-hero-sm.png" />
          <div style={{ flex: 1 }}>
            <div className="close">X</div>
            <div className="description">
              <p className="price">$365</p>
              <p>The GoalCo 10X superpower suit</p>
            </div>
          </div>
        </div>
        <div className="extra">
          FREE 24 hour delivery anywhere on planet earth!
        </div>
      </div>

      <div className="checkout-container">
        <div className="total-container">
          <div className="cart-total">Total</div>
          <div className="line-item">
            <div className="text">Sub-total</div>
            <div className="text bold">$365</div>
          </div>
          <div className="line-item">
            <div className="text">Shipping</div>
            <div className="text bold">FREE</div>
          </div>
        </div>
        <Button className="checkout">Checkout</Button>
        <div className="creditcards"></div>
      </div>
    </div>
  </div>
)

export default ShoppingCart
