import React from 'react'
import { 
  EmailShareButton, EmailIcon,
  FacebookShareButton, FacebookIcon,
  RedditShareButton, RedditIcon,
  TwitterShareButton, TwitterIcon } from "react-share"
import ProductHuntIcon from "./product-hunt-icon"

const RoarURL = "https://roar.morehumaninternet.org"
const PageTitle = "Roar"
const shortSummary = "See something broken online? Tell the world and get help with Roar from More Human Internet.";
const longSummary = `
  Roar is a free, non-profit web extension that automatically captures a snapshot of any online 
  issue and addresses a tweet to the site's maintainer. Turn a tweet into a Roar as experts and 
  maintainers see the issue and offer solutions.
  Checkout ${RoarURL}
  
`

const SocialMediaBar = () => {
  const iconProps = { size: 48, round:true }
  return (
    <div className="social-media-bar">
      <TwitterShareButton
        url={RoarURL}
        title={PageTitle}
      >
        <TwitterIcon {...iconProps} />
      </TwitterShareButton>

      <div className="social-link">
        <a href="#">
          <ProductHuntIcon />
        </a>
      </div>

      <RedditShareButton
        url={RoarURL}
        title={PageTitle}
      >
        <RedditIcon {...iconProps} />
      </RedditShareButton>  

      <FacebookShareButton
        url={RoarURL}
        quote={shortSummary}
      >
        <FacebookIcon {...iconProps} />
      </FacebookShareButton>

      <EmailShareButton
        url={RoarURL}
        subject={PageTitle}
        body={longSummary}
      >
        <EmailIcon {...iconProps} />
      </EmailShareButton>
    </div>
  )
}

export default SocialMediaBar;