import * as React from 'react'
// @ts-ignore
import { LocalizedLink } from 'gatsby-theme-i18n'

type FooterRingsLinkState = { hover: boolean }

function FooterRingsIcon({ hover }: FooterRingsLinkState): JSX.Element {
  const ref: React.MutableRefObject<SVGSVGElement> = React.useRef() as any

  // tslint:disable-next-line:no-expression-statement
  React.useEffect(() => {
    function onResize(): void {
      const nextHeight = getComputedStyle(ref.current!).width
      ref.current.style.height = nextHeight // tslint:disable-line:no-expression-statement
    }

    window.addEventListener('resize', onResize) // tslint:disable-line:no-expression-statement

    return () => window.removeEventListener('resize', onResize)
  })

  return (
    <svg ref={ref} className="footer-rings" height="302px" width="302px" viewBox="0 0 302 302">
      <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <g fillRule="nonzero">
          <path
            d="M19.139 23.424c4.318 0 7.829-3.512 7.829-7.83 0-4.316-3.513-7.827-7.829-7.827s-7.829 3.513-7.829 7.827c0 4.318 3.513 7.83 7.829 7.83z"
            fill="#FA759E"
            transform="translate(13 13) translate(97 98)"
          />
          <path
            d="M38.305 8.796c0 4.64 3.773 8.415 8.415 8.415 4.64 0 8.415-3.775 8.415-8.415 0-4.64-3.775-8.415-8.415-8.415-4.642 0-8.415 3.775-8.415 8.415z"
            fill="#164176"
            transform="translate(13 13) translate(97 98)"
          />
          <path
            d="M77.682 56.167c-.867-.737-1.876-.89-3.143-.676-.076-1.23-.459-2.38-1.171-3.267-.987-1.224-2.47-1.893-4.193-1.893h-.082c-.834.012-1.754.204-2.743.484v-17.62c0-5.19-4.222-9.41-9.411-9.41H36.505c-3.865 0-7.187 2.342-8.635 5.683H9.775c-4.82 0-8.743 3.922-8.743 8.743-.085 19.274-.085 30.443 0 33.51.04 1.422 3.181 4.117 4.27 4.402 5.47 1.444 14.591 3.307 25.287 3.307 14.017-.004 30.73-3.2 45.41-14.724.33-.226 3.231-2.283 3.372-5.003.048-.92-.207-2.279-1.69-3.536zM69.126 53.1h.05c.887 0 1.569.29 2.028.859.468.585.672 1.42.602 2.325-.901.343-1.905.762-3.038 1.239-3.684 1.544-8.924 3.742-16.25 5.539.154-.454.23-.89.257-1.292.086-1.28-.04-2.411-.356-3.4 4.25-1.05 7.707-2.343 10.509-3.423 2.662-1.023 4.762-1.83 6.198-1.847zM36.505 26.55h20.434a6.65 6.65 0 016.642 6.644v18.545c-.53.198-1.067.402-1.642.624-1.09.418-2.318.875-3.615 1.336V34.584a1.386 1.386 0 00-2.77 0v20.03c-1.445.45-2.967.894-4.645 1.28-1.901-1.822-4.48-1.71-4.541-1.713-3.608.043-6.334-.03-8.477-.187V34.586a1.386 1.386 0 00-2.77 0v19.115c-2.704-.402-4.062-1.008-5.258-1.69V33.194a6.647 6.647 0 016.642-6.644zM3.802 38.21a5.981 5.981 0 015.973-5.976H27.19c-.032.32-.097.632-.097.96v17.288c-2.472-1.157-6.453-2.24-15.931-2.69v-8.307a1.385 1.385 0 00-2.77 0v8.2c-.384-.011-.742-.03-1.142-.038a6.406 6.406 0 00-3.448.882V38.21zm70.562 24.262C49.384 82.074 18.244 76.676 6.01 73.443a3.893 3.893 0 01-2.901-3.79l.074-15.358a3.871 3.871 0 011.188-2.783 3.866 3.866 0 012.806-1.097c15.206.387 18.06 2.08 20.58 3.575 2.818 1.674 5.277 3.14 18.689 2.958.019-.004 1.588-.051 2.615 1 .745.766 1.067 1.99.956 3.635-.027.405-.11 1.622-2.522 2.579-.023.007-.038.022-.057.03-.011.004-.02 0-.03.004-2.566.99-8.212 1.815-20.58.156a1.382 1.382 0 10-.368 2.741c4.831.651 9.012.975 12.523.975 3.956 0 7.047-.42 9.272-1.242h.01c10.171-1.967 17.034-4.843 21.579-6.752 2.813-1.175 5.463-2.288 6.046-1.792.672.57.733.996.718 1.272-.054 1.07-1.488 2.39-2.244 2.918z"
            stroke="#164176"
            fill="#164176"
            transform="translate(13 13) translate(97 98)"
          />
        </g>
        <path
          d="M137.5 219c45.011 0 81.5-36.489 81.5-81.5S182.511 56 137.5 56c-18.634 0-35.807 6.253-49.535 16.776C68.53 87.672 56 111.122 56 137.5c0 45.011 36.489 81.5 81.5 81.5z"
          stroke={hover ? '#164176' : '#E2E2E2'}
          strokeWidth={5}
          opacity={hover ? 1 : 0.598400298}
          transform="translate(13 13)"
        />
        <path
          d="M138 276c76.215 0 138-61.785 138-138S214.215 0 138 0c-31.551 0-60.63 10.588-83.875 28.406C21.218 53.628 0 93.336 0 138c0 76.215 61.785 138 138 138z"
          stroke={hover ? '#FA759E' : '#E2E2E2'}
          strokeWidth={26}
          opacity={hover ? 1 : 0.774158296}
          transform="translate(13 13)"
        />
      </g>
    </svg>
  )
}

export default () => {
  const [hover, setHover] = React.useState(false)

  return (
    <LocalizedLink
      aria-label="More Human Internet Home"
      className="footer-link footer-rings-container"
      to="/"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FooterRingsIcon hover={hover} />
    </LocalizedLink>
  )
}
