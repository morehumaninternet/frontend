import React from 'react'

type SocialLinksProps = {
  links: ReadonlyArray<Link>
}

const SocialLink = ({ href, ariaLabel, icon }: Link): JSX.Element => {
  return (
    <a className="footer-link" href={href} title={ariaLabel} aria-label={ariaLabel}>
      {icon}
    </a>
  )
}

const SocialLinks = ({ links }: SocialLinksProps): JSX.Element => {
  return (
    <div className="footer-links">
      {links.map(link => (
        <SocialLink key={link.href} {...link} />
      ))}
    </div>
  )
}

export default SocialLinks
