import React from 'react'
import BuiltWith from './built-with'
import { BuyMeACoffeeIcon, EmailIcon, GithubIcon, LinkedInIcon, TwitterIcon } from './social-icons'
import SocialLinks from './social-links'

const socialLinkData: ReadonlyArray<Link> = [
  {
    href: 'https://github.com/morehumaninternet',
    ariaLabel: 'Github',
    icon: <GithubIcon />,
  },
  {
    href: 'https://twitter.com/morehumaninter1',
    ariaLabel: 'Twitter',
    icon: <TwitterIcon />,
  },
  {
    href: 'https://www.linkedin.com/company/more-human-internet/',
    ariaLabel: 'LinkedIn',
    icon: <LinkedInIcon />,
  },
  {
    href: 'https://www.buymeacoffee.com/morehumaninter',
    ariaLabel: 'Buy Me A Coffee',
    icon: <BuyMeACoffeeIcon />,
  },
  {
    href: 'mailto:info@morehumaninternet.org',
    ariaLabel: 'Email',
    icon: <EmailIcon />,
  },
]

const Footer = (): JSX.Element => {
  return (
    <footer className="v2">
      <div className="mhi-footer">
        <BuiltWith />
        <div className="footer-banner">
          <div className="footer-links__container">
            <SocialLinks links={socialLinkData} />
          </div>
          <p className="copyright">© More Human Internet Foundation 2020, All rights reserved</p>
      </div>
      </div>
    </footer>
  )
}

export default Footer
