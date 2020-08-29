import React, { useState } from "react"
import Widget from "../components/widget"
import SEO from "../components/shared/seo"
import * as mockApi from "../clients/mockApi"

import GoalCoLogo from "../components/demo-page/GoalCoLogo"
import CartButton from "../components/demo-page/CartButton"
import ProductPage from "../components/demo-page/ProductPage"
import ShoppingCart from "../components/demo-page/ShoppingCart"

import useCurrentUser from "../effects/useCurrentUser"

export default function DemoPage(props: any): JSX.Element {
  const [checkout, setCheckout] = useState(false)
  const [numberItems, setNumberItems] = useState(0)
  const currentUser = useCurrentUser()

  const postIssue = async (widgetFormValues: {
    title: string
    initialCommentHtml: string
  }) => {
    if (!currentUser.loaded) {
      throw new Error(`Cannot post an issue for a nonexistent user`)
    }

    const issue = await mockApi.postIssue({
      site: "goalco.com",
      title: widgetFormValues.title,
      user: currentUser.user,
      initialCommentHtml: widgetFormValues.initialCommentHtml,
    })

    props.navigate(`/issue?site=${issue.site}&id=${issue.id}`)
  }

  const handleAddToCart = () => {
    setNumberItems(numberItems + 1)
  }

  return (
    <div className="demo-page">
      <SEO
        pageTitle="Demo"
        links={[
          {
            rel: "shortcut icon",
            type: "image/png",
            sizes: "32x32",
            href: "/goalco.ico",
          },
          { rel: "stylesheet", type: "text/css", href: "/trix.css" },
        ]}
        scripts={[{ type: "text/javascript", src: "/trix.js" }]}
      />
      <header >
        <GoalCoLogo />
        <div className="links">
          <a>Products</a>
          <a>About Us</a>
          <a>Contact</a>
          <CartButton numberItems={numberItems} onCheckout={()=>setCheckout(true)}/>
        </div>
      </header>
      <div className="demo-content flex">
        {checkout ? (
          <ShoppingCart />
        ) : (
          <ProductPage 
            allowAddToCart= {numberItems===0?true:false} 
            onAddToCart={handleAddToCart} 
          />
        )}
      </div>
      <Widget navigate={props.navigate} />
    </div>
  )
}
