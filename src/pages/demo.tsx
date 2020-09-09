import React, { useState } from 'react'
import Widget from '../components/widget'
import SEO from '../components/shared/seo'

import GoalCoLogo from '../components/demo-page/goalco-logo'
import CartButton from '../components/demo-page/cart-button'
import AddToCart from '../components/demo-page/add-to-cart'
import Checkout from '../components/demo-page/checkout'

export default function DemoPage(props: any): JSX.Element {
  const [checkout, setCheckout] = useState(false)

  return (
    <div className="demo-page">
      <SEO
        pageTitle="Demo"
        links={[
          {
            rel: 'shortcut icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/goalco.ico',
          },
          { rel: 'stylesheet', type: 'text/css', href: '/trix.css' },
        ]}
        scripts={[{ type: 'text/javascript', src: '/trix.js' }]}
      />
      <header>
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
    </div>
  )
}
