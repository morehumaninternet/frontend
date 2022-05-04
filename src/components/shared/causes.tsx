import React, { forwardRef } from 'react'
import cls from 'classnames'
import { repeat } from 'lodash'
import { Link } from 'gatsby'

type CauseProps = { cause: string, imgSrc: string, borderColor: string, heading?: string, description: string, href?: string }

export const dsa = {
  cause: 'dsa',
  imgSrc: '/causes/dsa_hero.png',
  borderColor: '#FADE60',
  heading: 'Dream Sports Africa',
  description: `More Human Internet helped redesign Dream Sports Africa's website, positioning it as the preeminent organization offering life skills education and leadership development through sports through sports in Africa`,
  href: 'https://dreamsportsafrica.org',
}

export const lhkh = {
  cause: 'lhkh',
  imgSrc: '/causes/lhkh_hero.png',
  borderColor: '#FA759E',
  heading: 'Livable Hawaii Kai Hui',
  description: `We are excited to be advancing an online strategy to bring 1500 volunteers of all ages to steward the irreplaceable cultural and natural resources of East Honolulu`,
  href: '/partnering-with-livable-hawaii-kai-hui',
}

export const roar = {
  cause: 'roar',
  imgSrc: '/causes/roar_hero.png',
  borderColor: '#164176',
  heading: 'Roar!',
  description: `Our free, open source browser extension enables users of the web report technical issues to website maintainers.`,
  href: '/roar',
}

export const homePageCauses: ReadonlyArray<any> = [
  dsa,
  lhkh,
  roar,
]

export const CauseImage = ({ src, borderColor }: { src: string, borderColor: string }) => (
  <div className="cause__image">
    <img src={src} style={{ borderColor }} />
  </div>
)

interface CauseTextContentProps extends React.ComponentProps<any> {
  heading?: string,
  description: string
  href?: string
}

export const CauseTextContent = ({ heading, description, href, ...rest }: CauseTextContentProps) => (
  <div className="cause__content" {...rest}>
    <div>
      {heading && (<h2 className="human-blue">{heading}</h2>)}
      <p>{description}</p>
      {href && (<Link className="link" to={href}>Learn More</Link>)}
    </div>
  </div>
)

export const Cause = ({ imgSrc, borderColor, heading, description, href }: CauseProps) => (
  <>
    <CauseImage src={imgSrc} borderColor={borderColor} />
    <CauseTextContent
      heading={heading}
      description={description}
      href={href}
    />
  </>
)

export const CausesSection = forwardRef(
  ({ children, rightToLeft }: { children: React.ReactNode, rightToLeft?: boolean }, ref): JSX.Element => {
    const numRows = Array.isArray(children) ? children.length : 1
    return (
      <section className={cls('causes', { rightToLeft })} ref={ref as any}>
        <div className="causes__content" style={{ gridTemplateRows: repeat('1fr 5.5fr ', numRows) + ' 1fr' }}>
          {children}
        </div>
      </section>
    )
  }
)



export default forwardRef(
  ({ causes = homePageCauses }: { causes?: ReadonlyArray<CauseProps> } = {}, ref): JSX.Element => {
    return (
      <CausesSection ref={ref}>
        {causes.map((props) => (
          <Cause key={props.heading} {...props} />
        ))}
      </CausesSection>
    )
  }
)
