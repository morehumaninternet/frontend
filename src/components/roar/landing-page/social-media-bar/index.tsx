import React from 'react'
import { EmailShareButton, FacebookShareButton, FacebookIcon, RedditShareButton, RedditIcon, TwitterShareButton, TwitterIcon } from 'react-share'
import ProductHuntIcon from './product-hunt-icon'
import EmailAtIcon from './email-at-icon'

const RoarURL = 'https://morehumaninternet.org/roar'
const PageTitle = 'Roar!'
const shortSummary = `Check out Roar! - a free extension I'm using to easily and publicly report issues I encounter on the internet.`

const SocialMediaBar = () => {
  const iconProps = { size: 47, round: true }

  return (
    <div className="social-media-bar">
      <TwitterShareButton url={RoarURL} title={shortSummary}>
        <TwitterIcon {...iconProps} />
      </TwitterShareButton>

      <div className="social-link">
        <a href="https://www.producthunt.com/posts/roar-by-more-human-internet">
          <ProductHuntIcon />
        </a>
      </div>

      <RedditShareButton url={RoarURL} title={shortSummary}>
        <RedditIcon {...iconProps} />
      </RedditShareButton>

      <FacebookShareButton url={RoarURL} quote={shortSummary}>
        <FacebookIcon {...iconProps} />
      </FacebookShareButton>

      <EmailShareButton url={RoarURL} subject={PageTitle} body={shortSummary}>
        <EmailAtIcon />
      </EmailShareButton>
    </div>
  )
}

export default SocialMediaBar
