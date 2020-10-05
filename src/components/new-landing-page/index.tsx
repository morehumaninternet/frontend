// tslint:disable:no-expression-statement
import React from 'react'
import { find, forEach, maxBy } from 'lodash'
import { LocalizedLink } from 'gatsby-theme-i18n'
import { FormattedMessage } from 'react-intl'
import { Button } from '@material-ui/core'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'
import { Layout } from '../shared/layout'
import Stars from './svgs/stars'
import { MountainBackground1, MountainBackground2 } from './svgs/mountain-background'
import MountainMidground from './svgs/mountain-midground'
import MountainForeground from './svgs/mountain-foreground'
import Astronaut from './svgs/astronaut'
import AstronautStarGroup from './svgs/astronaut-star-group'
import SEO from '../../components/shared/seo'
import ApplicationForm from '../../components/shared/application-form'
import SimpleFeedbackWidget from '../../components/simple-feedback-widget'
import Team from './team'

function CenteredLogo(props: any): JSX.Element {
  return (
    <svg width={71} height={109} viewBox="0 0 71 109" fill="none" {...props}>
      <path d="M21.99 13.937a4.74 4.74 0 004.734-4.736 4.74 4.74 0 00-4.734-4.733A4.74 4.74 0 0017.255 9.2a4.74 4.74 0 004.735 4.736z" fill="#fff" />
      <path d="M33.581 5.09a5.095 5.095 0 005.09 5.09 5.095 5.095 0 005.09-5.09A5.095 5.095 0 0038.67 0a5.095 5.095 0 00-5.09 5.09z" fill="#FA759E" />
      <path
        d="M57.397 33.74c-.525-.446-1.135-.538-1.901-.41-.046-.744-.278-1.44-.709-1.975-.596-.74-1.494-1.145-2.535-1.145h-.05c-.505.007-1.06.123-1.659.292V19.846a5.698 5.698 0 00-5.692-5.692H32.493a5.696 5.696 0 00-5.223 3.438H16.326a5.293 5.293 0 00-5.287 5.288c-.052 11.656-.052 18.412 0 20.266.024.86 1.924 2.49 2.583 2.663 3.307.873 8.824 2 15.292 2 8.478-.002 18.586-1.935 27.464-8.905.2-.137 1.955-1.381 2.04-3.026.03-.557-.125-1.378-1.021-2.139zm-5.175-1.856h.03c.536 0 .949.175 1.226.52.284.353.407.858.365 1.406-.545.207-1.152.46-1.838.748-2.228.935-5.397 2.264-9.828 3.35.094-.274.14-.537.156-.78.052-.775-.024-1.459-.215-2.057 2.57-.635 4.66-1.417 6.355-2.07 1.61-.619 2.88-1.107 3.749-1.117zm-19.73-16.057h12.36a4.021 4.021 0 014.016 4.018v11.216c-.32.12-.645.243-.993.378-.659.252-1.402.529-2.186.807v-11.56a.838.838 0 00-1.675 0v12.115c-.875.271-1.795.54-2.81.774-1.15-1.103-2.71-1.035-2.746-1.037-2.182.026-3.83-.018-5.127-.113V20.687a.838.838 0 00-1.675 0v11.56c-1.636-.242-2.457-.609-3.18-1.021v-11.38a4.02 4.02 0 014.017-4.019zm-19.778 7.051a3.617 3.617 0 013.612-3.613H26.86c-.02.193-.059.382-.059.58v10.456c-1.495-.7-3.902-1.355-9.635-1.627V23.65a.838.838 0 00-1.675 0v4.96c-.232-.007-.45-.019-.691-.023a3.875 3.875 0 00-2.085.533v-6.242zM55.39 37.553c-15.108 11.855-33.942 8.59-41.341 6.635a2.355 2.355 0 01-1.755-2.292l.045-9.289c.004-.64.258-1.237.72-1.683a2.338 2.338 0 011.696-.664c9.197.234 10.922 1.258 12.446 2.163 1.705 1.012 3.193 1.898 11.304 1.789.011-.003.96-.031 1.581.605.451.463.646 1.203.579 2.198-.016.245-.067.981-1.525 1.56-.014.004-.023.013-.035.018-.007.002-.013 0-.018.002-1.552.6-4.967 1.098-12.447.095a.836.836 0 10-.222 1.658c2.922.393 5.45.59 7.573.59 2.393 0 4.263-.255 5.608-.752h.006c6.152-1.19 10.302-2.93 13.051-4.084 1.702-.71 3.304-1.383 3.657-1.084.406.345.443.603.434.77-.032.647-.9 1.446-1.357 1.765z"
        fill="#fff"
        stroke="#fff"
      />
      <path
        d="M15.39 77.49V66.928h.038l2.348 10.562h2.072l2.349-10.562h.037V77.49h2.441V64.26h-3.94l-1.904 9.339h-.037l-1.887-9.34H12.95V77.49h2.442zm15.407.204c1 0 1.794-.16 2.386-.482a3.248 3.248 0 001.36-1.39c.314-.605.518-1.327.61-2.168.093-.84.139-1.766.139-2.78 0-1-.047-1.923-.139-2.77-.092-.846-.296-1.572-.61-2.177a3.42 3.42 0 00-1.36-1.417c-.592-.34-1.387-.51-2.386-.51-.998 0-1.794.17-2.386.51a3.42 3.42 0 00-1.359 1.417c-.314.605-.518 1.331-.61 2.178-.093.846-.139 1.77-.139 2.77 0 1.013.046 1.94.139 2.78.092.84.296 1.562.61 2.168a3.248 3.248 0 001.36 1.39c.591.32 1.387.481 2.385.481zm0-1.909c-.394 0-.712-.089-.952-.268-.24-.18-.425-.463-.555-.853-.13-.389-.216-.895-.259-1.52a33.617 33.617 0 01-.065-2.27c0-.889.022-1.642.065-2.26.043-.618.13-1.124.259-1.52.13-.395.314-.682.555-.861.24-.18.558-.269.952-.269.395 0 .712.09.953.269.24.18.425.466.555.862.13.395.215.901.259 1.52.043.617.064 1.37.064 2.26 0 .89-.021 1.646-.064 2.27-.044.624-.13 1.13-.26 1.52-.129.389-.314.673-.554.852-.24.179-.558.269-.953.269zm8.73 1.705v-5.596h1.424c.555 0 .95.148 1.184.445.234.296.364.704.389 1.223l.073 2.539c.013.259.038.51.075.75.037.241.123.454.258.64h2.886v-.112c-.247-.136-.407-.389-.481-.76a17.89 17.89 0 01-.111-1.612c-.012-.358-.025-.682-.037-.973-.012-.29-.031-.559-.056-.806-.074-.74-.265-1.278-.573-1.612-.308-.333-.795-.55-1.461-.648v-.038c.752-.16 1.307-.522 1.664-1.084.358-.562.537-1.287.537-2.177 0-1.149-.308-2.004-.925-2.566-.616-.563-1.48-.844-2.59-.844h-4.92V77.49h2.664zm1.11-7.449h-1.11v-3.817h1.258c1.233 0 1.85.611 1.85 1.834 0 .717-.173 1.226-.518 1.529-.346.303-.839.454-1.48.454zm14.075 7.45v-2.187h-4.901v-3.558h4.439v-2.187h-4.44v-3.113h4.717V64.26h-7.38V77.49h7.565z"
        fill="#fff"
      />
      <path
        d="M10.038 93.146v-5.773h3.113v5.773h2.668V80.142H13.15v4.972h-3.113v-4.972H7.37v13.004h2.668zm11.691.2c.544 0 1.069-.054 1.575-.163.506-.11.957-.322 1.353-.638.395-.315.71-.743.944-1.284.235-.54.352-1.223.352-2.049v-9.07h-2.668v9.07c0 .328-.021.629-.064.902-.044.273-.124.51-.241.71-.118.2-.275.358-.473.474-.197.115-.457.173-.778.173-.309 0-.565-.058-.769-.173a1.278 1.278 0 01-.482-.474 2.016 2.016 0 01-.24-.71 5.794 5.794 0 01-.065-.902v-9.07h-2.668v9.07c0 .874.117 1.585.352 2.131.235.547.55.969.945 1.266.395.298.846.495 1.352.592a8.34 8.34 0 001.575.146zm8.412-.2V82.764h.037l2.353 10.382h2.075l2.353-10.382h.037v10.382h2.446V80.142h-3.947l-1.908 9.18h-.037l-1.89-9.18h-3.965v13.004h2.446zm13.062 0l.611-2.75h3.52l.612 2.75h2.779l-3.502-13.004h-3.298l-3.501 13.004h2.779zm3.668-4.9h-2.594l1.279-5.846h.037l1.278 5.847zm7.226 4.9V84.04h.037l3.26 9.107h3.04V80.142h-2.446v8.906h-.037l-3.224-8.906H51.65v13.004h2.446z"
        fill="#FA759E"
      />
      <path
        d="M2.652 109V95.795H0V109h2.652zm4.402 0v-9.247h.036L10.332 109h3.02V95.795h-2.43v9.044h-.038L7.68 95.795H4.623V109h2.43zm12.965 0V97.977h2.873v-2.182h-8.398v2.182h2.873V109h2.652zm11.547 0v-2.182h-4.88v-3.551h4.42v-2.183h-4.42v-3.107h4.696v-2.182h-7.348V109h7.532zm3.978 0v-5.585h1.418c.553 0 .946.148 1.179.444.233.295.362.702.387 1.22l.074 2.534c.012.259.036.509.073.749s.123.453.258.638h2.873v-.111c-.246-.136-.405-.388-.479-.758-.049-.37-.086-.906-.11-1.609l-.037-.971a14.34 14.34 0 00-.055-.805c-.074-.739-.264-1.276-.571-1.609-.307-.333-.792-.548-1.455-.647v-.037c.749-.16 1.301-.521 1.657-1.082.356-.561.534-1.285.534-2.173 0-1.147-.307-2-.92-2.562-.614-.56-1.474-.841-2.579-.841h-4.899V109h2.652zm1.105-7.435h-1.105v-3.81h1.253c1.227 0 1.841.61 1.841 1.831 0 .715-.172 1.224-.515 1.526-.344.302-.835.453-1.474.453zM45.563 109v-9.247h.037L48.84 109h3.02V95.795h-2.43v9.044h-.037l-3.205-9.044h-3.057V109h2.431zm15.673 0v-2.182h-4.88v-3.551h4.42v-2.183h-4.42v-3.107h4.695v-2.182h-7.348V109h7.533zm6.15 0V97.977h2.874v-2.182h-8.398v2.182h2.873V109h2.652z"
        fill="#fff"
      />
    </svg>
  )
}

export default function NewLandingPage(props: any): JSX.Element {
  // User availability
  const [availability, setAvailability] = React.useState<string>('signup')

  const refsToTrack: React.MutableRefObject<HTMLElement>[] = [] // tslint:disable-line:readonly-array
  const makeAndTrackRef = (): React.MutableRefObject<any> => {
    const ref = React.useRef()
    refsToTrack.push(ref as any) // tslint:disable-line:no-expression-statement
    return ref as any
  }

  const internalSectionRefs = {
    start: React.useRef<HTMLElement>(),
    about: React.useRef<HTMLElement>(),
    why: React.useRef<HTMLElement>(),
    join: React.useRef<HTMLElement>(),
  }

  const internalLinkRefs = {
    start: React.useRef<HTMLElement>(),
    about: React.useRef<HTMLElement>(),
    why: React.useRef<HTMLElement>(),
    join: React.useRef<HTMLElement>(),
  }

  function InternalLink({ to }: { to: keyof typeof internalSectionRefs }): JSX.Element {
    return (
      <a
        className="foo"
        ref={internalLinkRefs[to] as any}
        onClick={() => {
          const sectionTop = internalSectionRefs[to].current!.getBoundingClientRect().top
          window.scroll(0, scrollY + sectionTop - 0.3 * screen.availHeight)
        }}
      >
        {to}
      </a>
    )
  }

  const headerRef = React.useRef<HTMLDivElement>()

  React.useEffect(
    () => {
      const headerElement = headerRef.current!

      function onScroll(): void {
        const headerBottom = headerElement.getBoundingClientRect().bottom

        refsToTrack.forEach(ref => {
          if (!ref.current) return
          const rect = ref.current.getBoundingClientRect()
          if (!rect.height && !rect.width) return
          const elementTop = rect.top
          const elementDistance = elementTop - headerBottom
          const elementOpacity = Math.max(0, Math.min(1, (elementDistance + 10) / 150))
          ref.current.style.opacity = String(elementOpacity) // tslint:disable-line:no-expression-statement
        })

        const screenMidpoint = screen.availHeight / 2

        const sectionKey = Object.keys(internalSectionRefs).find((sectionKey: keyof typeof internalSectionRefs) => {
          const ref = internalSectionRefs[sectionKey]
          const { top, bottom } = ref.current!.getBoundingClientRect()
          return top <= screenMidpoint && bottom >= screenMidpoint
        })!

        forEach(internalLinkRefs, (ref, key) => {
          if (key === sectionKey) {
            ref.current!.classList.add('active')
          } else {
            ref.current!.classList.remove('active')
          }
        })
      }

      onScroll()
      addEventListener('scroll', onScroll, { passive: true })
      addEventListener('resize', onScroll)

      return () => {
        removeEventListener('scroll', onScroll)
        removeEventListener('resize', onScroll)
      }
    },
    refsToTrack.map(ref => ref.current)
  )

  // We do this to "lock in" the 100vh before any
  React.useEffect(() => {
    const isIPhone = navigator.userAgent.search('iPhone') >= 0
    if (isIPhone) {
      const sky = document.querySelector('.sky') as any
      sky.style.height = getComputedStyle(sky).height
    }
  }, [])

  return (
    <ParallaxProvider>
      <Layout
        additionalClassNames="new-landing-page has-new-header"
        header={
          <header className="layout-new-header" ref={headerRef as any}>
            <InternalLink to="start" />
            <InternalLink to="about" />
            <InternalLink to="why" />
            <LocalizedLink className="logo" to="/">
              <CenteredLogo />
            </LocalizedLink>
            <InternalLink to="join" />
            <LocalizedLink className="foo" to="/demo">
              Demo
            </LocalizedLink>
            <LocalizedLink className="foo" to="/donate">
              Donate
            </LocalizedLink>
          </header>
        }
      >
        <SEO />
        <article className="sky start" ref={internalSectionRefs.start as any}>
          <div className="new-hero">
            <h1 className="mhi-heading" ref={makeAndTrackRef()}>
              The time has come for a<br />
              more human internet
            </h1>
            <p ref={makeAndTrackRef()}>
              We're on a quest to make the web more transparent
              <br />
              and better aligned with the interests of all people
            </p>
            <div className="container" ref={makeAndTrackRef()}>
              <Button className="mhi-button" component={LocalizedLink} to="/demo">
                See the demo
              </Button>
            </div>
          </div>
          <Stars x={10000} y={1000} starCount={300} />

          <div className="mountain-background">
            <Parallax
              styleOuter={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }}
              styleInner={{ width: '100%', height: '100%' }}
              y={['-5%', '60%']}
            >
              <MountainBackground1 />
            </Parallax>
            <Parallax
              styleOuter={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }}
              styleInner={{ width: '100%', height: '100%' }}
              y={['-5%', '60%']}
            >
              <MountainBackground2 />
            </Parallax>
            <Parallax
              styleOuter={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }}
              styleInner={{ width: '100%', height: '100%' }}
              y={['2%', '40%']}
            >
              <MountainMidground />
            </Parallax>
          </div>
          <MountainForeground />
        </article>
        <div className="post-sky">
          <div className="manifesto">
            <div className="astronaut-container">
              <AstronautStarGroup />
              <Parallax styleOuter={{ position: 'absolute', width: '100%', top: '0', left: '0' }} y={['100%', '-5%']}>
                <Astronaut />
              </Parallax>
            </div>
            <div className="text-container">
              <div className="about" ref={internalSectionRefs.about as any}>
                <h2 className="mhi-heading" ref={makeAndTrackRef()}>
                  About
                </h2>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_aboutus1" />
                </p>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_aboutus2" />
                </p>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_aboutus3" />
                </p>
              </div>

              <div className="why" ref={internalSectionRefs.why as any}>
                <h2 className="mhi-heading" ref={makeAndTrackRef()}>
                  Why
                </h2>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_why1" />
                </p>
                <p ref={makeAndTrackRef()}>
                  <FormattedMessage id="index_why2" />
                </p>
                <p ref={makeAndTrackRef()}>
                  <strong>
                    <FormattedMessage id="index_why3" />
                  </strong>
                </p>
              </div>
            </div>
          </div>
          <div className="join" ref={internalSectionRefs.join as any}>
            <h1 className="mhi-heading" ref={makeAndTrackRef()}>
              Be a part of our community
            </h1>
            <ApplicationForm availability={availability} setAvailability={setAvailability} makeAndTrackRef={makeAndTrackRef} />
          </div>
          <div className="team-container">
            <Team makeAndTrackRef={makeAndTrackRef} availability={availability} setAvailability={setAvailability} />
          </div>
        </div>
        <SimpleFeedbackWidget />
      </Layout>
    </ParallaxProvider>
  )
}
