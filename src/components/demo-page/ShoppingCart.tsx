import React from "react"

export const ShoppingCart = () => (
  <div className="shopping-cart-container">
    <h1>Shopping Cart</h1>

    <div>
      <div className="cart-item-container">
        <div className="cart-item">
          <img src="/goalco-hero-sm.png" />
          <div>
            <div className="close">X</div>
            <div className="description">
              <h3>$365</h3>
              <p>The GoalCo 10X superpower suit</p>
            </div>
          </div>
        </div>
        <p>FREE 24 hour delivery anywhere on planet earth!</p>
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
        <button className="checkout">Checkout</button>
        <div className="creditcards"></div>
      </div>
    </div>
  </div>
)

export default ShoppingCart
