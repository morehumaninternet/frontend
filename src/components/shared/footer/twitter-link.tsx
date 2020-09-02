import * as React from 'react'

type TwitterLinkState = { hover: boolean }

function TwitterIcon({ hover }: TwitterLinkState) {
  return (
    <svg
      className="twitter-icon"
      width="48px"
      height="48px"
      viewBox="0 0 48 48"
    >
      <g fillRule="nonzero" stroke="none" strokeWidth={1} fill="none">
        <circle cx={24} cy={24} r={24} fill={hover ? '#13ACF7' : '#979797'} />
        <path
          d="M10.046 25.32c11.706 0 18.107-9.62 18.107-17.958 0-.275 0-.55-.014-.812a12.979 12.979 0 003.181-3.272 13 13 0 01-3.656.995A6.317 6.317 0 0030.462.778a12.951 12.951 0 01-4.038 1.532A6.357 6.357 0 0021.778.32c-3.51 0-6.36 2.827-6.36 6.309 0 .497.052.982.171 1.44A18.102 18.102 0 012.471 1.472a6.27 6.27 0 001.98 8.416 6.29 6.29 0 01-2.877-.785v.078c0 3.063 2.19 5.602 5.107 6.191a6.393 6.393 0 01-1.676.223c-.41 0-.805-.04-1.201-.118a6.348 6.348 0 005.939 4.385 12.86 12.86 0 01-7.905 2.696c-.515 0-1.017-.026-1.518-.091a17.836 17.836 0 009.726 2.853"
          transform="translate(9 11)"
          fill="#FFF"
        />
      </g>
    </svg>
  )
}

class TwitterLink extends React.Component<{}, TwitterLinkState> {
  state: TwitterLinkState = { hover: false }

  render(): JSX.Element {
    return (
      <a
        className="footer-link"
        href="https://twitter.com/morehumaninter1"
        aria-label="Twitter"
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <TwitterIcon hover={this.state.hover} />
      </a>
    )
  }
}

export default TwitterLink
