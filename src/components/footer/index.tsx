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
    <p>© More Human Internet 2020, All rights reserved.</p>
  </footer>
)
