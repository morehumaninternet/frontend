import React, { useContext, useState, useEffect } from 'react'
import { ShepherdTourContext } from 'react-shepherd'
import Widget from '../widget'

import GoalCoLogo from './goalco-logo'
import CartButton from './cart-button'
import AddToCart from './add-to-cart'
import Checkout from './checkout'

export default function DemoPageContents(props: any): JSX.Element {
  const [checkout, setCheckout] = useState(false)
  const tour = useContext(ShepherdTourContext)

  useEffect(() => {
    tour!.start()
    tour!.once('complete', () => {
      console.log('complete foo')
      const postButton = document.querySelector(
        'button.post'
      ) as HTMLButtonElement
      postButton.click() // tslint:disable-line:no-expression-statement
    })
  }, [])

  return (
    <>
      <header className="layout-header">
        <GoalCoLogo />
        <div className="links">
          <a>Products</a>
          <a>About Us</a>
          <a>Contact</a>
          <CartButton numberItems={checkout ? 1 : 0} />
        </div>
      </header>
      <div className="demo-content-container">
        {checkout ? (
          <Checkout />
        ) : (
          <AddToCart onAddToCart={() => setCheckout(true)} />
        )}
      </div>
      <Widget navigate={props.navigate} />
    </>
  )
}
