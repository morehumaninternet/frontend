import React from 'react'

type TermsLinkProps = {
    href: string
    children: React.ReactNode
}

const TermsLink = ({ href, children }: TermsLinkProps) => (
    <a
        className="terms__link"
        target="_blank"
        rel="noopener noreferrer"
        href={href}
    >
        {children}
    </a>
)

const Terms = () => (
    <div className="terms">
        <TermsLink href="/roar#learn-more">Why do I need Twitter?</TermsLink>
        <TermsLink href="/roar/privacy">Privacy Policy</TermsLink>
        <TermsLink href="/roar/tos">Terms of Service</TermsLink>
    </div>
)

export default Terms
