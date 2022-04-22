import React, { forwardRef } from 'react'
import { Link } from 'gatsby'

type CauseProps = { imgSrc: string, borderColor: string, heading: string, description: string, href: string }

export const dsa = {
  cause: 'dsa',
  imgSrc: '/causes/dsa_hero.png',
  borderColor: '#FADE60',
  heading: 'Developing African Leaders Through Sports',
  description: `More Human Internet helped redesign Dream Sports Africa's website, positioning it as the preeminent organization offering life skills education through sports in Africa`,
  href: 'https://dreamsportsafrica.org',
}

export const lhkh = {
  cause: 'lhkh',
  imgSrc: '/causes/lhkh_hero.png',
  borderColor: '#FA759E',
  heading: 'Stewarding Hawaii Across Generations',
  description: `Through our partnership with Livable Hawaii Kai Hui, we are aiming to bring 1500 volunteers of all ages to care for Hawaii’s cultural and natural resources.`,
  href: '/partnering-with-livable-hawaii-kai-hui',
}

export const roar = {
  cause: 'roar',
  imgSrc: '/causes/roar_hero.png',
  borderColor: '#164176',
  heading: 'Bringing attention to problems on the web',
  description: `Roar! by More Human Internet enables users of the web Turn a tweet into a Roar so experts and maintainers see the issue and offer solutions.`,
  href: '/roar',
}

export const causes: ReadonlyArray<any> = [
  dsa,
  lhkh,
  roar,
]

export const CauseImage = ({ src, borderColor }: { src: string, borderColor: string }) => (
  <div className="cause__image">
    <img src={src} style={{ borderColor }} />
  </div>
)

export const CauseTextContent = ({ heading, description, href }: Pick<CauseProps, 'heading' | 'description' | 'href'>) => (
  <div className="cause__text-content">
    <div>
      <h2 className="human-blue">{heading}</h2>
      <p>{description}</p>
      <Link className="link" to={href}>Learn More</Link>
    </div>
  </div>
)

export const Cause = ({ imgSrc, borderColor, heading, description, href }: CauseProps) => (
  <>
    <CauseImage src={imgSrc} borderColor={borderColor}/>
    <CauseTextContent
      heading={heading}
      description={description}
      href={href}
    />
  </>
)

export const CausesSection = forwardRef(
  (props: { causes: readonly CauseProps[] }, ref): JSX.Element => {
    return (
      <section className="causes" ref={ref as any}>
        <div className="causes__content">
          {props.causes.map((props) => (
            <Cause key={props.heading} {...props} />
          ))}
        </div>
      </section>
    )
  }
)

export default forwardRef(
  (_, ref): JSX.Element => {
    return (
      <CausesSection
        ref={ref}
        causes={causes}
      />
    )
  }
)
