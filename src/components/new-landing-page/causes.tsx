import { Link } from 'gatsby'
import React, { forwardRef } from 'react'

type CauseProps = { imgSrc: string, borderColor: string, heading: string, description: string, href: string }

const causes: ReadonlyArray<CauseProps> = [
  {
    imgSrc: '/causes/dsa_hero.png',
    borderColor: '#FADE60',
    heading: 'Developing African Leaders Through Sports',
    description: `More Human Internet helped redesign Dream Sports Africa's website, positioning it as the preeminent organization offering life skills education through sports in Africa`,
    href: 'https://dreamsportsafrica.org',
  },
  {
    imgSrc: '/causes/lhkh_hero.png',
    borderColor: '#FA759E',
    heading: 'Stewarding Hawaii Across Generations',
    description: `Through our partnership with Livable Hawaii Kai Hui, we are aiming to bring 1500 volunteers of all ages to care for Hawaii’s cultural and natural resources.`,
    href: '/partnering-with-livable-hawaii-kai-hui',
  },
  {
    imgSrc: '/causes/roar_hero.png',
    borderColor: '#164176',
    heading: 'Bringing attention to problems on the web',
    description: `Roar! by More Human Internet enables users of the web Turn a tweet into a Roar so experts and maintainers see the issue and offer solutions.`,
    href: '/roar',
  },
]

const CauseImage = ({ src, borderColor }: { src: string, borderColor: string }) => (
  <div className="cause__image">
    <img src={src} style={{ borderColor }} />
  </div>
)

const CauseTextContent = ({ heading, description, href }: { heading: string, description: string, href: string }) => (
  <div className="cause__text-content">
    <div>
      <h2 className="human-blue">{heading}</h2>
      <p>{description}</p>
      <Link className="link" to={href}>Learn More</Link>
    </div>
  </div>
)

const Cause = ({ imgSrc, borderColor, heading, description, href }: CauseProps) => (
  <>
    <CauseImage src={imgSrc} borderColor={borderColor}/>
    <CauseTextContent
      heading={heading}
      description={description}
      href={href}
    />
  </>
)

const Causes = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="causes" ref={ref as any}>
        <div className="causes__content">
          {causes.map((props) => (
            <Cause key={props.heading} {...props} />
          ))}
        </div>
      </section>
    )
  }
)

export default Causes
