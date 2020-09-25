import React, { useState, useEffect } from 'react'
import Widget from '../widget'

import GoalCoLogo from './goalco-logo'
import CartButton from './cart-button'
import AddToCart from './add-to-cart'
import Checkout from './checkout'
import * as tourArgs from './tour'
import { useTour } from '../../effects/useTour'
import * as mockApi from '../../clients/mockApi'
import { defaultSite } from '../../clients/util'

export default function DemoPageContents(props: any): JSX.Element {
  const [checkout, setCheckout] = useState(false)
  const [checkedOut, setCheckedOut] = useState(false)
  const [startTour, setStart] = useState(false)
  const tour = useTour(tourArgs, () => startTour, [startTour])
  const startVisibility = startTour ? 'hidden' : 'visible'

  // tslint:disable:no-expression-statement
  useEffect(() => {
    if (checkout) {
      tour.next()
    }
  }, [checkout])

  useEffect(() => {
    if (checkedOut) {
      tour.next()
    }
  }, [checkedOut])
  // tslint:enable:no-expression-statement

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
        {checkout ? <Checkout checkedOut={checkedOut} onCheckout={() => setCheckedOut(true)} /> : <AddToCart onAddToCart={() => setCheckout(true)} />}
      </div>
      <Widget tour={tour} navigate={props.navigate} siteOrigin={mockApi.defaultSite} api={mockApi} />
      <button className={`start-tour ${startVisibility}`} onClick={() => setStart(true)}>
        <img src="/post.svg" />
        <span className="text">Begin the tour</span>
      </button>
    </>
  )
}
