import React from 'react'
import FooterRings from '../images/footer-rings.svg'
import GithubMark from '../images/github-mark.svg'
import TwitterMark from '../images/twitter-mark.svg'
import {  } from '@material-ui/icons'


export default () => (
  <footer>
    <div className="footer-links">
      <a className="footer-link" href="https://github.com/morehumaninternet"><img src={GithubMark}></img></a>
      <img className="footer-link" src={FooterRings} />
      <a className="footer-link" href="https://twitter.com/morehumaninter1"><img src={TwitterMark}></img></a>
    </div>
    <p>© More Human Internet 2020, All rights reserved.</p>
  </footer>
)
