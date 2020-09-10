import React, { useState } from 'react'
import { CircularProgress } from '@material-ui/core'

export const ShoppingCart = () => {
  const [checkedOut, setCheckedOut] = useState(false)
  return (
    <div className="demo-content checkout">
      <div className="demo-content-inner">
        <h1>Shopping Cart</h1>
        <div className="checkout-grid">
          <div className="checkout-card description">
            <img src="/goalco-hero-sm.png" />
            <div className="text">
              <h3>$365</h3>
              <p>
                The GoalCo 10X
                <br />
                superpower suit
              </p>
            </div>
          </div>
          <div className="checkout-card total">
            <div className="text">
              <h3>Total</h3>
              <div className="line-item">
                <div className="key">Sub-total</div>
                <div className="value bold">$365</div>
              </div>
              <div className="line-item">
                <div className="key">Shipping</div>
                <div className="value bold">FREE</div>
              </div>
            </div>
          </div>
          <div className="free-delivery">
            <p>FREE 24 hour delivery anywhere on planet earth!</p>
          </div>
          <div className="checkout-container">
            <button
              className="checkout"
              onClick={() => setCheckedOut(true)}
              disabled={checkedOut}
            >
              {checkedOut ? (
                <>
                  <CircularProgress size="1rem" className="spinner" />
                  Checking out please wait
                </>
              ) : (
                'Checkout'
              )}
            </button>
            <div className="creditcards"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart
