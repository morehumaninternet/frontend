import React from 'react'
import { FormattedMessage } from 'react-intl'
import FooterRingsLink from './footer-rings-link'
import TwitterLink from './twitter-link'
import GithubLink from './github-link'

export default () => (
  <footer className="mhi-footer">
    <div className="footer-links">
      <GithubLink />
      <FooterRingsLink />
      <TwitterLink />
    </div>
    <a className="text-link" href="mailto:info@morehumaninternet.org">
      <FormattedMessage id="footer_get_in_touch" />
    </a>
    <p>
      <FormattedMessage id="footer_copyright" />
    </p>
  </footer>
)
