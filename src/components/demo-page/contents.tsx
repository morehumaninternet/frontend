import React, { useEffect } from 'react'
import Widget from './widget'

import GoalCoLogo from './goalco-logo'
import CartButton from './cart-button'
import AddToCart from './add-to-cart'
import Checkout from './checkout'
import { steps } from './tour'
import { useTour } from '../../effects/useTour'
import { DemoStore } from './store'

export default function DemoPageContents({ store, navigate }: { store: DemoStore; navigate(href: string): void }): JSX.Element {
  const tour = useTour({ steps, onCancel: () => navigate('/') })
  const [state, setState] = React.useState(store.getState())

  useEffect(() => {
    return store.subscribe(() => {
      setState(store.getState())
    })
  }, [])

  // tslint:disable:no-expression-statement
  useEffect(() => {
    if (state.checkout) {
      tour.next()
    }
  }, [state.checkout])

  useEffect(() => {
    if (state.checkedOut) {
      tour.next()
    }
  }, [state.checkedOut])
  // tslint:enable:no-expression-statement

  return (
    <>
      <header className="layout-header">
        <GoalCoLogo />
        <div className="links">
          <a>Products</a>
          <a>About Us</a>
          <a>Contact</a>
          <CartButton numberItems={state.checkout ? 1 : 0} />
        </div>
      </header>
      <div className="demo-content-container">
        {state.checkout ? (
          <Checkout checkedOut={state.checkedOut} onCheckout={() => store.dispatch({ type: 'CHECKOUT' })} />
        ) : (
          <AddToCart onAddToCart={() => store.dispatch({ type: 'ADD_TO_CART' })} />
        )}
      </div>
      <Widget tour={tour} store={store} />
    </>
  )
}
