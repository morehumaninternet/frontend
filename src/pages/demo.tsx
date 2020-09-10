import React, { useContext, useState, useEffect } from 'react'
import { ShepherdTour, ShepherdTourContext } from 'react-shepherd'
import Widget from '../components/widget'
import SEO from '../components/shared/seo'

import GoalCoLogo from '../components/demo-page/goalco-logo'
import CartButton from '../components/demo-page/cart-button'
import AddToCart from '../components/demo-page/add-to-cart'
import Checkout from '../components/demo-page/checkout'

const tourSteps = [
  {
    id: 'intro',
    attachTo: {
      element: 'header',
      on: 'bottom'
    },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel',
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back',
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next',
      },
    ],
    title: 'Welcome to React-Shepherd!',
    text: [
      'React-Shepherd is a JavaScript library for guiding users through your React app.',
    ],
  },
  {
    id: 'foo',
    attachTo: {
      element: '.more-human-internet-widget-boundary',
      on: 'left'
    },
    buttons: [
      {
        classes: 'shepherd-button-secondary',
        text: 'Exit',
        type: 'cancel',
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Back',
        type: 'back',
      },
      {
        classes: 'shepherd-button-primary',
        text: 'Next',
        type: 'next',
      },
    ],
    title: 'OK',
    text: [
      'GREAT',
    ],
  }
]

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
}

function DemoPageContents(props: any): JSX.Element {
  const [checkout, setCheckout] = useState(false)
  const tour = useContext(ShepherdTourContext)
  console.log('tour', tour)

  useEffect(() => {
    tour?.start()
  }, [])

  return (
    <>
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
    </>
  )
}

export default function DemoPage(props: any): JSX.Element {
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
          { rel: "stylesheet", type: 'text/css', href: "https://shepherdjs.dev/dist/css/shepherd.css" },
        ]}
        scripts={[{ type: 'text/javascript', src: '/trix.js' }]}
      />
      <ShepherdTour steps={tourSteps as any} tourOptions={{}}>
        <DemoPageContents props={props} />
      </ShepherdTour>
    </div>
  )
}
