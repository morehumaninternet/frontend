import React from 'react'
import FooterRingsLink from './footer-rings-link'
import TwitterLink from './twitter-link'
import GithubLink from './github-link'


export default () => (
  <footer>
    <div className="footer-links">
      <GithubLink />
      <FooterRingsLink />
      <TwitterLink />
    </div>
    <span>Get in touch with us: <a className="text-link" href="mailto:info@morehumaninternet.org">info@morehumaninternet.org</a></span>
    <p>© More Human Internet Foundation 2020, All rights reserved</p>
  </footer>
)
