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
      <Widget tour={tour} navigate={props.navigate} siteOrigin={defaultSite} api={mockApi} />
      <button className={`start-tour ${startVisibility}`} onClick={() => setStart(true)}>
        <svg className="flag" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 0.925659C0.445312 0.925659 0 1.37097 0 1.92566V15.9257C0 16.4803 0.445312 16.9257 1 16.9257C1.55469 16.9257 2 16.4803 2 15.9257V1.92566C2 1.37097 1.55469 0.925659 1 0.925659ZM13.9688 8.72253C13.625 8.28503 13.625 7.56628 13.9688 7.12878L15.8281 4.72253C16.1719 4.28503 15.9844 3.92566 15.4141 3.92566H12.3125C11.7422 3.92566 10.9453 3.60535 10.5469 3.22253L9.9375 2.6366C9.53906 2.24597 8.74219 1.92566 8.17188 1.92566H3V9.92566H6.10156C6.67188 9.92566 7.46875 10.246 7.86719 10.6288L8.47656 11.2147C8.88281 11.6053 9.67188 11.9257 10.2422 11.9257H15.4141C15.9844 11.9257 16.1719 11.5663 15.8281 11.1288L13.9688 8.72253Z"
            fill="white"
          />
        </svg>
        <span className="text">Begin the tour</span>
      </button>
    </>
  )
}
