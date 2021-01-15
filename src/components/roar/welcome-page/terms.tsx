import React from 'react'
import { Link } from 'gatsby'

type TermsLinkProps = {
  to: string
  children: React.ReactNode
}

const TermsLink = ({ to, children }: TermsLinkProps) => (
  <Link className="terms__link" rel="noopener noreferrer" to={to}>
    {children}
  </Link>
)

const Terms = () => (
  <div className="terms">
    <TermsLink to="/roar#learn-more">Why do I need Twitter?</TermsLink>
    <TermsLink to="/roar/privacy">Privacy Policy</TermsLink>
    <TermsLink to="/roar/tos">Terms of Service</TermsLink>
  </div>
)

export default Terms
