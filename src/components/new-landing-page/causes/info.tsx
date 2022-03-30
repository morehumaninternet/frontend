import React from 'react'

const ExtensionLink = ({ children }: { children: React.ReactNode }) => (
  <a
    className="extension-link"
    rel="noopener noreferrer"
    href="https://chrome.google.com/webstore/detail/roar/jfcmnmgckhjcflmljjgjjilmjhbgdfkc"
  >
    {children}
  </a>
)

const SlackLink = ({ children }: { children: React.ReactNode }) => (
  <a
    className="extension-link"
    target="_blank"
    rel="noopener noreferrer"
    href="https://join.slack.com/t/morehumaninternet/shared_invite/zt-kkbdraz8-XT5~cViVQTJlzaklWgj7Dg"
  >
    {children}
  </a>
)

const Info = () => {
  return (
    <div className="learn-more__info">
      <h3>What is Roar?</h3>
      <p>
        <ExtensionLink>Roar!</ExtensionLink> is a free, open source, non-profit web extension that automatically captures a snapshot of any online issue and
        addresses a tweet to the site's maintainer. Turn a tweet into a Roar so experts and maintainers see the issue and offer solutions.
      </p>
      <h3>Why Roar?</h3>
      <p>
        More Human Internet is a community of digital activists working to make the internet a more civil and transparent place, and{' '}
        <ExtensionLink>Roar!</ExtensionLink> is our first product. We want to make the simple act of asking for help a more seamless process, and we want to
        encourage human solutions.
      </p>
      <h3>Why Twitter?</h3>
      <p>Twitter is where the people are! Issues posted on Twitter get high visibility and rapid solutions from maintainers.</p>
      <h3>What's next?</h3>
      <p>
        The extension is just the beginning. As more people use <ExtensionLink>Roar!</ExtensionLink> to find solutions online, we hope to build a network of
        human-centric web citizens identifying, documenting and solving issues online. We like to think of this group as the internet's helpdesk, and with more
        reported issues, that group can start to identify similar issues and surface solutions to further streamline the process of getting an answer.
      </p>
      <h3>I'm a bit of a digital activist myself...</h3>
      <p>
        We're building a community of technologists creating a more human internet. <ExtensionLink>Roar!</ExtensionLink> is this group's first product, and your
        idea could be next! Join our <SlackLink>Slack channel</SlackLink> to get involved or stay in the loop by joining our mailing list.
      </p>
    </div>
  )
}

export default Info
